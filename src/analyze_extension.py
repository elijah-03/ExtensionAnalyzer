#!/usr/bin/env python3
import os
import json
import argparse
import sys
import math
import numpy as np
from datetime import datetime
import hashlib
from manifest_analyzer import analyze_manifest
from code_analyzer import analyze_javascript_files
from risk_descriptions import (
    get_permission_risk,
    get_host_risk,
    get_code_pattern_risk,
    get_csp_risk,
    SPECIAL_RISKS,
)
from ml_utils import get_feature_details, process_categories
import pickle

"""
Analyzes an unpacked browser extension directory for specific properties.

This is the main orchestrator that coordinates analysis from various modules:
- manifest_analyzer: Parses and analyzes manifest.json
- code_analyzer: Performs JavaScript AST analysis
- ml_utils: Feature detail mapping for ML explanations
- risk_descriptions: Human-readable risk descriptions

Requires:
- esprima: (pip install esprima)
"""


# Set recursion limit for deep AST traversal
sys.setrecursionlimit(5000)

# Version for reproducibility
ANALYZER_VERSION = "2.1.0"

# ====== FALSE POSITIVE REDUCTION CONFIGURATION ======

# Paths that typically contain safe/test code (reduce confidence)
SAFE_PATH_PATTERNS = [
    "test/",
    "tests/",
    "__tests__/",
    "spec/",
    "specs/",
    "pytest/",
    "vendor/",
    "node_modules/",
    "lib/",
    "libs/",
    "dist/",
    "build/",
    "mock/",
    "mocks/",
    "fixtures/",
    "examples/",
    "demo/",
    "demos/",
    ".test.",
    ".spec.",
    "_test.",
    "_spec.",
]

# Minimum confidence thresholds by severity
MIN_CONFIDENCE_THRESHOLDS = {
    "Critical": 0.4,  # Lower threshold for critical findings
    "High": 0.5,
    "Medium": 0.6,
    "Low": 0.7,
}


def get_path_confidence_multiplier(file_path):
    """
    Calculate confidence multiplier based on file path.
    Returns value between 0.1 (test file) and 1.0 (normal file).

    Args:
        file_path: Path to the file being analyzed

    Returns:
        float: Confidence multiplier (0.1-1.0)
    """
    if not file_path:
        return 1.0

    path_lower = file_path.lower()

    # Check for safe path patterns
    for pattern in SAFE_PATH_PATTERNS:
        if pattern in path_lower:
            # Test files get very low confidence (likely safe)
            if any(test in pattern for test in ["test", "spec", "mock", "fixture"]):
                return 0.1
            # Vendor/deps get low confidence (not extension code)
            elif any(
                vendor in pattern
                for vendor in ["vendor", "node_modules", "lib", "dist"]
            ):
                return 0.2
            # Examples/demos get medium-low confidence
            elif any(example in pattern for example in ["example", "demo"]):
                return 0.3

    # Normal file - full confidence
    return 1.0


def calculate_finding_confidence(finding_type, pattern, file_path=None, context=None):
    """
    Calculate confidence score for a finding (0.0 to 1.0).

    Args:
        finding_type: Type of finding ('code_pattern', 'permission', 'host', 'csp')
        pattern: The specific pattern/permission/host found
        file_path: Path to the file where finding was detected
        context: Additional context (surrounding code, etc.)

    Returns:
        float: Confidence score (0.0-1.0)
    """
    # Start with base confidence by finding type
    if finding_type == "permission":
        base_confidence = 0.9  # Permissions are explicit
    elif finding_type == "host":
        base_confidence = 0.85  # Hosts are explicit
    elif finding_type == "csp":
        base_confidence = 0.8  # CSP is explicit
    elif finding_type == "code_pattern":
        # Code patterns vary in confidence
        high_confidence_patterns = ["chrome.debugger", "chrome.desktopCapture"]
        medium_confidence_patterns = ["eval(", "Function(", "setTimeout("]

        if pattern in high_confidence_patterns:
            base_confidence = 0.9
        elif pattern in medium_confidence_patterns:
            base_confidence = 0.7
        else:
            base_confidence = 0.6
    else:
        base_confidence = 0.5

    # Apply path-based confidence multiplier
    path_multiplier = get_path_confidence_multiplier(file_path) if file_path else 1.0

    # Check for safety indicators in context
    safety_multiplier = 1.0
    if context and isinstance(context, str):
        context_lower = context.lower()
        # Reduce confidence if common safety patterns detected
        if any(
            safe in context_lower
            for safe in ["sanitize", "dompurify", "escape", "validate"]
        ):
            safety_multiplier = 0.5
        if "try" in context_lower and "catch" in context_lower:
            safety_multiplier *= 0.8

    # Calculate final confidence
    final_confidence = base_confidence * path_multiplier * safety_multiplier

    # Clamp to valid range
    return max(0.0, min(1.0, final_confidence))


# Note: The following functions have been extracted to separate modules:
# - calculate_entropy -> code_analyzer.py
# - analyze_manifest -> manifest_analyzer.py
# - ast_to_dict, traverse_ast, get_code_snippet -> code_analyzer.py
# - analyze_javascript_files -> code_analyzer.py


def calculate_directory_hash(path, max_files=50):
    """
    Calculate a hash of the extension directory for reproducibility.
    Only hashes manifest and up to max_files JS files for performance.

    Args:
        path: Extension directory path
        max_files: Maximum number of JS files to include in hash

    Returns:
        SHA256 hash hex string
    """
    try:
        hasher = hashlib.sha256()

        # Always include manifest
        manifest_path = os.path.join(path, "manifest.json")
        if os.path.exists(manifest_path):
            with open(manifest_path, "rb") as f:
                hasher.update(f.read())

        # Include up to max_files JS files
        js_files = []
        for root, dirs, files in os.walk(path):
            for file in files:
                if file.endswith(".js"):
                    js_files.append(os.path.join(root, file))
                    if len(js_files) >= max_files:
                        break
            if len(js_files) >= max_files:
                break

        # Sort for deterministic ordering
        js_files.sort()

        for js_file in js_files:
            try:
                with open(js_file, "rb") as f:
                    hasher.update(f.read())
            except Exception:
                pass  # Skip files that can't be read

        return hasher.hexdigest()
    except Exception as e:
        return f"error: {str(e)}"


def analyze_network_rules(extension_path, manifest_data):
    """
    Analyzes network-related rules (e.g., declarative_net_request).
    """
    findings = []
    if "declarative_net_request" not in manifest_data:
        return findings

    rule_files_data = manifest_data["declarative_net_request"].get("rule_resources", [])
    for rule_file_entry in rule_files_data:
        rule_file_path = rule_file_entry.get("path")
        if not rule_file_path:
            continue

        full_rule_path = os.path.join(extension_path, rule_file_path)
        try:
            with open(full_rule_path, "r", encoding="utf-8") as f:
                rules_data = json.load(f)

            for rule in rules_data:
                action_type = rule.get("action", {}).get("type")
                condition = rule.get("condition", {})
                if action_type in ("redirect", "block"):
                    url_filter = condition.get("urlFilter")
                    regex_filter = condition.get("regexFilter")
                    if url_filter == "*" or (
                        regex_filter and regex_filter in (".*", ".*?", "^.*$")
                    ):
                        findings.append(
                            {
                                "file": rule_file_path,
                                "id": rule.get("id"),
                                "action": action_type,
                                "filter": url_filter or regex_filter,
                            }
                        )
        except Exception as e:
            print(
                f"Warning: Error processing rule file {full_rule_path}: {e}",
                file=sys.stderr,
            )

    return findings


def generate_risk_impact_analysis(analysis_results, manifest_data):
    """
    Generates enhanced natural language risk impact analysis from raw findings.
    Returns a list of structured risk findings with severity, impact, and details.
    """
    risk_findings = []

    # --- 1. Permission Risks ---
    manifest_findings = analysis_results.get("manifest", {})
    risky_perms = manifest_findings.get("risky_permissions", [])

    for perm in risky_perms:
        risk_info = get_permission_risk(perm)
        confidence = calculate_finding_confidence("permission", perm)
        risk_findings.append(
            {
                "severity": risk_info["severity"],
                "title": f"Permission: {perm}",
                "impact": risk_info["impact"],
                "confidence": round(confidence, 2),
                "details": {
                    "technical": risk_info["technical"],
                    "category": "permissions",
                },
            }
        )

    # --- 2. Host Permission Risks ---
    broad_hosts = manifest_findings.get("broad_hosts", [])

    # Also check host_permissions from manifest
    host_permissions = manifest_data.get("host_permissions", [])
    all_hosts = list(set(broad_hosts + host_permissions))

    for host in all_hosts:
        risk_info = get_host_risk(host)
        confidence = calculate_finding_confidence("host", host)
        risk_findings.append(
            {
                "severity": risk_info["severity"],
                "title": f"Host Access: {host}",
                "impact": risk_info["impact"],
                "confidence": round(confidence, 2),
                "details": {
                    "technical": risk_info["technical"],
                    "category": "host_permissions",
                },
            }
        )

    # --- 3. CSP Violations ---
    if manifest_findings.get("has_unsafe_eval"):
        risk_info = get_csp_risk("unsafe-eval")
        confidence = calculate_finding_confidence("csp", "unsafe-eval")
        risk_findings.append(
            {
                "severity": risk_info["severity"],
                "title": "Unsafe CSP: eval Allowed",
                "impact": risk_info["impact"],
                "confidence": round(confidence, 2),
                "details": {"technical": risk_info["technical"], "category": "csp"},
            }
        )

    if manifest_findings.get("has_unsafe_inline"):
        risk_info = get_csp_risk("unsafe-inline")
        risk_findings.append(
            {
                "severity": risk_info["severity"],
                "title": "Unsafe CSP: Inline Scripts Allowed",
                "impact": risk_info["impact"],
                "details": {"technical": risk_info["technical"], "category": "csp"},
            }
        )

    # --- 4. Code Pattern Risks ---
    js_findings = analysis_results.get("javascript", [])

    # Group findings by type for deduplic ation
    code_patterns = {}

    for finding in js_findings:
        ftype = finding.get("type")
        fvalue = finding.get("value")
        flocation = f"{finding.get('file', 'unknown')}:{finding.get('line', 0)}"

        # Map finding types to risk patterns
        if ftype == "suspicious_call":
            pattern_key = fvalue  # "eval", "new Function", etc.
            if pattern_key not in code_patterns:
                code_patterns[pattern_key] = []
            code_patterns[pattern_key].append(flocation)

        elif ftype == "dangerous_dom":
            pattern_key = fvalue  # "innerHTML", "outerHTML", etc.
            if pattern_key not in code_patterns:
                code_patterns[pattern_key] = []
            code_patterns[pattern_key].append(flocation)

        elif ftype == "exfiltration_risk":
            # Extract pattern (fetch, XMLHttpRequest, etc.)
            if "fetch" in fvalue:
                pattern_key = "fetch"
            elif "XMLHttpRequest" in fvalue:
                pattern_key = "XMLHttpRequest"
            else:
                pattern_key = "network_request"

            if pattern_key not in code_patterns:
                code_patterns[pattern_key] = []
            code_patterns[pattern_key].append(f"{flocation}: {fvalue}")

        elif ftype == "suspicious_string":
            # High entropy strings
            if "high_entropy_string" not in code_patterns:
                code_patterns["high_entropy_string"] = []
            code_patterns["high_entropy_string"].append(flocation)

        elif ftype == "suspicious_url":
            # IP-based URLs
            if "suspicious_url_ip" not in code_patterns:
                code_patterns["suspicious_url_ip"] = []
            code_patterns["suspicious_url_ip"].append(f"{flocation}: {fvalue}")

    # Convert code patterns to risk findings
    for pattern, locations in code_patterns.items():
        # Get risk info from code patterns or special risks
        risk_info = get_code_pattern_risk(pattern)

        # Override with special risks if applicable
        if pattern in SPECIAL_RISKS:
            risk_info = SPECIAL_RISKS[pattern]

        # Calculate confidence based on first location's file path
        first_file = locations[0].split(":")[0] if locations else None
        confidence = calculate_finding_confidence(
            "code_pattern", pattern, file_path=first_file
        )

        risk_findings.append(
            {
                "severity": risk_info.get("severity", "Medium"),
                "title": f"Code Pattern: {pattern}",
                "impact": risk_info.get("impact", f"Uses {pattern}"),
                "confidence": round(confidence, 2),
                "details": {
                    "technical": risk_info.get("technical", ""),
                    "locations": locations[:5],  # Limit to first 5 locations
                    "count": len(locations),
                    "category": "code_behavior",
                },
            }
        )

    # --- 5. Network Rules ---
    net_findings = analysis_results.get("network", [])
    if net_findings:
        risk_info = SPECIAL_RISKS["broad_network_rule"]
        locations = [f"{r.get('file')}: rule {r.get('id')}" for r in net_findings[:3]]
        confidence = 0.85  # Network rules are explicit in manifest
        risk_findings.append(
            {
                "severity": risk_info["severity"],
                "title": "Broad Network Modification Rules",
                "impact": risk_info["impact"],
                "confidence": confidence,
                "details": {
                    "technical": risk_info["technical"],
                    "locations": locations,
                    "count": len(net_findings),
                    "category": "network",
                },
            }
        )

    # --- 6. External Connectivity ---
    if manifest_findings.get("externally_connectable_all"):
        risk_info = SPECIAL_RISKS["externally_connectable"]
        confidence = 0.9  # Manifest declarations are explicit
        risk_findings.append(
            {
                "severity": risk_info["severity"],
                "title": "Externally Connectable (All Sites)",
                "impact": risk_info["impact"],
                "confidence": confidence,
                "details": {
                    "technical": risk_info["technical"],
                    "category": "manifest",
                },
            }
        )

    # Deduplicate findings
    unique_findings = {}
    for finding in risk_findings:
        key = (finding["severity"], finding["title"])
        if key not in unique_findings:
            unique_findings[key] = finding
        else:
            # Merge locations if same finding appears multiple times
            if "locations" in finding.get("details", {}):
                existing = unique_findings[key]
                if "locations" not in existing.get("details", {}):
                    existing["details"]["locations"] = []
                existing["details"]["locations"].extend(finding["details"]["locations"])

    risk_findings = list(unique_findings.values())

    # ====== FALSE POSITIVE FILTERING ======
    # Filter out low-confidence findings based on severity thresholds
    filtered_findings = []
    for finding in risk_findings:
        severity = finding.get("severity", "Medium")
        confidence = finding.get("confidence", 1.0)
        threshold = MIN_CONFIDENCE_THRESHOLDS.get(severity, 0.5)

        if confidence >= threshold:
            filtered_findings.append(finding)
        else:
            # Log filtered findings for debugging
            print(
                f"  Filtered low-confidence finding: {finding['title']} (confidence={confidence:.2f}, threshold={threshold})",
                file=sys.stderr,
            )

    risk_findings = filtered_findings

    # ====== DETERMINISTIC ORDERING for reproducibility ======
    # Sort by severity (Critical > High > Medium > Low), then alphabetically by title
    severity_order = {"Critical": 0, "High": 1, "Medium": 2, "Low": 3}
    risk_findings.sort(
        key=lambda x: (
            severity_order.get(x.get("severity", "Medium"), 2),  # Severity priority
            x.get("title", ""),  # Alphabetical within same severity
        )
    )

    return risk_findings


def calculate_threat_score(analysis_results):
    """
    Calculates an enhanced threat score with size normalization and detailed breakdown.

    Phase 2 Enhancements:
    - Size-normalized scoring (avoid penalizing large extensions)
    - Explained score breakdown (track each component)
    - Capability vs. Behavior split

    Returns:
        dict with keys: score, normalized_score, capability_score, behavior_score,
                       breakdown, report
    """
    # Weights for different findings
    weights = {
        "manifest_permission": 10,
        "manifest_csp": 20,
        "risky_api_call": 15,
        "suspicious_string": 10,
        "data_exfiltration": 10,
        "dangerous_dom": 15,
        "obfuscation": 25,
        "parsing_error": 5,
        "suspicious_url": 20,
    }

    # Saturation limits (max score contribution per category)
    saturation_limits = {
        "manifest_permission": 100,
        "manifest_csp": 40,
        "risky_api_call": 100,
        "suspicious_string": 50,
        "data_exfiltration": 50,
        "dangerous_dom": 60,
        "obfuscation": 100,
        "parsing_error": 20,
        "suspicious_url": 100,
    }

    # Track scores by category
    category_scores = {k: 0 for k in weights}
    category_counts = {k: 0 for k in weights}

    # Split into capability (what it CAN do) vs behavior (what it DOES)
    capability_categories = ["manifest_permission", "manifest_csp"]

    capability_score = 0
    behavior_score = 0
    threat_report = []
    breakdown_components = []

    # --- Manifest Analysis ---
    manifest_findings = analysis_results.get("manifest", {})

    # Helper to add score with breakdown tracking
    def add_score(category, description, is_capability=None):
        nonlocal capability_score, behavior_score
        weight = weights.get(category, 5)

        if category_scores[category] < saturation_limits[category]:
            category_scores[category] += weight
            category_counts[category] += 1
            threat_report.append(description)

            # Track capability vs behavior
            if is_capability is None:
                is_capability = category in capability_categories

            if is_capability:
                capability_score += weight
            else:
                behavior_score += weight

            # Add to breakdown
            breakdown_components.append(
                {
                    "category": category,
                    "weight": weight,
                    "description": description,
                    "type": "capability" if is_capability else "behavior",
                }
            )

    # Broad host permissions
    if "<all_urls>" in manifest_findings.get("broad_hosts", []):
        add_score(
            "manifest_permission", "Uses broad host permission '<all_urls>'", True
        )

    # Risky permissions
    if "scripting" in manifest_findings.get("risky_permissions", []):
        add_score(
            "manifest_permission",
            "Requests 'scripting' permission (can execute arbitrary code)",
            True,
        )

    for perm in ["management", "proxy", "privacy", "downloads", "nativeMessaging"]:
        if perm in manifest_findings.get("risky_permissions", []):
            add_score(
                "manifest_permission", f"Requests '{perm}' permission (high risk)", True
            )

    # CSP violations
    if manifest_findings.get("has_unsafe_eval", False):
        add_score(
            "manifest_csp",
            "Manifest CSP allows 'unsafe-eval' (dangerous script execution)",
            True,
        )

    # --- JavaScript Analysis ---
    js_findings = analysis_results.get("javascript", [])

    for finding in js_findings:
        ftype = finding["type"]
        val = finding["value"]
        # Get just the filename, not the full path
        file_path = finding.get("file", "unknown")
        filename = os.path.basename(file_path) if file_path else "unknown"
        loc = f"{filename} (line {finding['line']})"

        if ftype == "suspicious_call" and val == "eval":
            add_score("obfuscation", f"Uses eval() in {loc}", False)
        elif ftype == "suspicious_call" and val == "new Function":
            add_score("obfuscation", f"Uses new Function() in {loc}", False)
        elif ftype == "parsing_error":
            add_score(
                "parsing_error",
                f"Failed to parse {loc}, likely minified or obfuscated",
                False,
            )
        elif ftype == "long_string":
            add_score(
                "suspicious_string",
                f"Found potential packed code (long string) in {loc}",
                False,
            )
        elif ftype == "high_entropy_string":
            add_score(
                "obfuscation",
                f"Found high entropy string (potential obfuscation) in {loc}",
                False,
            )
        elif ftype == "exfiltration_risk":
            add_score(
                "data_exfiltration",
                f"Potential data exfiltration using {val} in {loc}",
                False,
            )
        elif ftype == "dangerous_dom":
            add_score("dangerous_dom", f"Dangerous DOM operation {val} in {loc}", False)
        elif ftype == "risky_api_call":
            add_score("risky_api_call", f"Uses risky API {val} in {loc}", False)
        elif ftype == "suspicious_url":
            add_score(
                "suspicious_url", f"Found suspicious URL (IP) '{val}' in {loc}", False
            )

    # --- Network Analysis ---
    net_findings = analysis_results.get("network", [])
    for rule in net_findings:
        add_score(
            "risky_api_call",
            f"Found a broad network redirect rule in {rule['file']} (ID: {rule['id']})",
            False,
        )

    # Calculate raw score
    raw_score = capability_score + behavior_score

    # ====== PHASE 2: SIZE NORMALIZATION ======
    # Normalize by extension size to avoid penalizing large extensions
    total_js_files = len([f for f in js_findings if f.get("type") != "parsing_error"])

    # Logarithmic normalization factor
    # Small extensions (1-10 files): factor ~1.0
    # Medium extensions (10-50 files): factor ~0.7-0.9
    # Large extensions (50+ files): factor ~0.5-0.7
    if total_js_files > 0:
        size_factor = 1.0 / math.log(1 + total_js_files, 10)  # log base 10
    else:
        size_factor = 1.0

    normalized_score = int(raw_score * size_factor)

    # ====== PHASE 2: EXPLAINED BREAKDOWN ======
    # Aggregate breakdown by category
    category_breakdown = {}
    for cat in weights:
        if category_scores[cat] > 0:
            category_breakdown[cat] = {
                "score": category_scores[cat],
                "count": category_counts[cat],
                "max_possible": saturation_limits[cat],
                "percentage": round((category_scores[cat] / raw_score * 100), 1)
                if raw_score > 0
                else 0,
            }

    return {
        "score": normalized_score,  # Primary score (size-normalized)
        "raw_score": raw_score,  # Before normalization
        "capability_score": capability_score,  # What it CAN do
        "behavior_score": behavior_score,  # What it DOES
        "size_factor": round(size_factor, 3),
        "total_js_files": total_js_files,
        "breakdown": category_breakdown,
        "components": breakdown_components,  # Detailed list
        "report": threat_report,
    }


# Global model/vectorizer (loaded lazily)
ML_MODEL = None
ML_VECTORIZER = None


SHAP_EXPLAINER = None  # New global for SHAP

# Load Model and Vectorizer (paths updated for new models/ directory)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "model.pkl")
VECTORIZER_PATH = os.path.join(
    os.path.dirname(__file__), "..", "models", "vectorizer.pkl"
)
BACKGROUND_PATH = os.path.join(
    os.path.dirname(__file__), "..", "models", "background_data.pkl"
)

try:
    with open(MODEL_PATH, "rb") as f:
        ML_MODEL = pickle.load(f)
    with open(VECTORIZER_PATH, "rb") as f:
        ML_VECTORIZER = pickle.load(f)

    # Initialize SHAP Explainer
    import shap

    try:
        with open(BACKGROUND_PATH, "rb") as f:
            background_data = pickle.load(f)
        # Use TreeExplainer for Random Forest
        # check_additivity=False is not supported in init for this version, pass to shap_values if needed
        SHAP_EXPLAINER = shap.TreeExplainer(ML_MODEL, data=background_data)
        print("SHAP Explainer initialized successfully.", file=sys.stderr)
    except Exception as e:
        print(f"Warning: Could not initialize SHAP explainer: {e}", file=sys.stderr)
        SHAP_EXPLAINER = None

except Exception as e:
    print(f"Error loading model/vectorizer: {e}", file=sys.stderr)
    ML_MODEL = None
    ML_VECTORIZER = None
    SHAP_EXPLAINER = None


def analyze_extension(path):
    """
    Analyzes a single extension and returns the results dict.
    """
    extension_id = os.path.basename(os.path.normpath(path))
    print(f"--- Starting analysis for extension: {extension_id} ---", file=sys.stderr)

    # Track analysis metadata for reproducibility
    analysis_start_time = datetime.now()
    analysis_timestamp = analysis_start_time.isoformat()

    results = {}
    manifest_path = os.path.join(path, "manifest.json")

    try:
        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest_data = json.load(f)
    except Exception as e:
        error_msg = f"Error reading manifest: {e}"
        print(error_msg, file=sys.stderr)
        # Return minimal error response for failed analyses
        return {
            "extension_id": extension_id,
            "name": "Unknown Extension",
            "error": error_msg,
            "analysis_metadata": {
                "timestamp": analysis_timestamp,
                "analyzer_version": ANALYZER_VERSION,
                "status": "failed",
                "error": str(e),
            },
        }

    results["manifest"] = analyze_manifest(manifest_data)
    results["javascript"] = analyze_javascript_files(path)
    results["network"] = analyze_network_rules(path, manifest_data)

    score_data = calculate_threat_score(results)

    # --- ML Prediction ---
    ml_result = {"probability": 0.0, "label": "Unknown", "error": None}

    if ML_MODEL and ML_VECTORIZER:
        try:
            # ML_VECTORIZER is the FeatureExtractor object itself
            extractor = ML_VECTORIZER

            # Extract features (returns DataFrame)
            features = extractor.transform([path])

            # Predict
            prob = ML_MODEL.predict_proba(features)[0][
                1
            ]  # Probability of class 1 (Malicious)
            ml_result["probability"] = float(prob)
            ml_result["label"] = "Malicious" if prob > 0.5 else "Benign"

            # Use get_feature_details from ml_utils (imported at top)
            # Function removed from here - now in ml_utils.py module

            # Explainability: Top contributing features
            # Use SHAP values if available, otherwise fall back to simple multiplication
            feature_names = features.columns
            feature_values = features.values[0]

            if SHAP_EXPLAINER:
                try:
                    # Calculate SHAP values for this single instance
                    shap_values = SHAP_EXPLAINER.shap_values(features)

                    # For binary classification, shap_values might be a list or an array
                    # We want class 1 (Malicious)
                    if isinstance(shap_values, list):
                        shap_vals = shap_values[1][0]
                    elif len(shap_values.shape) == 3:
                        # Shape: (n_samples, n_features, n_classes) -> (1, 1019, 2)
                        shap_vals = shap_values[0, :, 1]
                    elif len(shap_values.shape) == 2:
                        # Shape: (n_samples, n_features) -> (1, 1019)
                        shap_vals = shap_values[0]
                    else:
                        # Shape: (n_features,) -> (1019,)
                        shap_vals = shap_values

                    contributions = shap_vals

                    # Get Base Value (Expected Value)
                    if isinstance(SHAP_EXPLAINER.expected_value, list) or isinstance(
                        SHAP_EXPLAINER.expected_value, np.ndarray
                    ):
                        # For binary classification, it might be an array/list [class0_base, class1_base]
                        if len(SHAP_EXPLAINER.expected_value) > 1:
                            base_value = float(SHAP_EXPLAINER.expected_value[1])
                        else:
                            base_value = float(SHAP_EXPLAINER.expected_value[0])
                    else:
                        base_value = float(SHAP_EXPLAINER.expected_value)

                    ml_result["base_value"] = base_value

                except Exception as e:
                    print(f"Error calculating SHAP values: {e}", file=sys.stderr)
                    # Fallback
                    importances = ML_MODEL.feature_importances_
                    contributions = feature_values * importances
                    ml_result["base_value"] = 0.0
            else:
                # Fallback to simple importance * value
                importances = ML_MODEL.feature_importances_
                contributions = feature_values * importances
                ml_result["base_value"] = 0.0

            # Group features by category (Risk and Benign)
            # Category names should be capitalized to match frontend display
            risk_categories = {
                "Permissions": {"impact": 0.0, "features": []},
                "Security": {"impact": 0.0, "features": []},
                "Behavior": {"impact": 0.0, "features": []},
                "Network": {"impact": 0.0, "features": []},
                "DOM": {"impact": 0.0, "features": []},
                "Storage": {"impact": 0.0, "features": []},
                "Code Patterns": {"impact": 0.0, "features": []},
            }

            benign_categories = {
                "Permissions": {"impact": 0.0, "features": []},
                "Security": {"impact": 0.0, "features": []},
                "Behavior": {"impact": 0.0, "features": []},
                "Network": {"impact": 0.0, "features": []},
                "DOM": {"impact": 0.0, "features": []},
                "Storage": {"impact": 0.0, "features": []},
                "Code Patterns": {"impact": 0.0, "features": []},
            }

            # Process all contributors
            # Get indices of all features
            all_indices = range(len(contributions))

            for idx in all_indices:
                contribution = float(contributions[idx])
                if contribution == 0:
                    continue

                raw_name = feature_names[idx]
                feat_details = get_feature_details(raw_name)
                cat = feat_details.get("category", "Code Patterns")

                if contribution > 0:
                    # Risk Factor
                    if cat not in risk_categories:
                        cat = "Code Patterns"
                    risk_categories[cat]["impact"] += contribution
                    risk_categories[cat]["features"].append(
                        {
                            "feature": feat_details["name"],
                            "raw_feature": raw_name,
                            "importance": contribution,
                            "value": float(feature_values[idx]),
                            "description": feat_details["description"],
                            "severity": feat_details["severity"],
                            "category": cat,
                        }
                    )
                else:
                    # Benign Factor (Mitigating)
                    if cat not in benign_categories:
                        cat = "Code Patterns"
                    benign_categories[cat]["impact"] += abs(
                        contribution
                    )  # Store absolute impact
                    benign_categories[cat]["features"].append(
                        {
                            "feature": feat_details["name"],
                            "raw_feature": raw_name,
                            "importance": contribution,  # Keep original negative value
                            "value": float(feature_values[idx]),
                            "description": feat_details["description"],
                            "severity": "safe",  # Mark as safe
                            "category": cat,
                        }
                    )

            # Use process_categories from ml_utils (imported at top)
            # Function removed from here - now in ml_utils.py module

            ml_result["risk_categories"] = process_categories(risk_categories)
            ml_result["benign_categories"] = process_categories(benign_categories)

            # Keep top_features for backward compatibility (top 5 risk)
            ml_result["top_features"] = []
            count = 0
            for cat in ml_result["risk_categories"]:
                for feat in cat["features"]:
                    ml_result["top_features"].append(feat)
                    count += 1
                    if count >= 5:
                        break
                if count >= 5:
                    break

            # Explanation generation removed - rely on categorized risk factors

        except Exception as e:
            print(f"ML Error for {extension_id}: {e}", file=sys.stderr)
            ml_result["error"] = str(e)
    else:
        print(f"ML Model not loaded for {extension_id}", file=sys.stderr)
        ml_result["error"] = "Model not loaded"

    # Generate Enhanced Risk Impact Analysis
    risk_impact_analysis = generate_risk_impact_analysis(results, manifest_data)

    # Better name handling - fallback if __MSG_ placeholder
    extension_name = manifest_data.get("name", "Unknown Extension")
    if extension_name.startswith("__MSG_"):
        extension_name = (
            f"Extension {extension_id[:12]}..."  # Use truncated ID as fallback
        )

    # Count findings by severity for summary
    severity_counts = {"Critical": 0, "High": 0, "Medium": 0, "Low": 0}
    for risk in risk_impact_analysis:
        severity = risk.get("severity", "Medium")
        if severity in severity_counts:
            severity_counts[severity] += 1

    # Calculate analysis duration
    analysis_end_time = datetime.now()
    analysis_duration_seconds = (
        analysis_end_time - analysis_start_time
    ).total_seconds()

    # Calculate content hash for reproducibility
    content_hash = calculate_directory_hash(path)

    # Count errors for quality metrics
    error_count = len(
        [f for f in results.get("javascript", []) if f.get("type") == "parsing_error"]
    )

    # Enhanced analysis metadata for transparency and reproducibility
    analysis_metadata = {
        # Extension info
        "version": manifest_data.get("version", "Unknown"),
        "manifest_version": manifest_data.get("manifest_version", "Unknown"),
        # Analysis statistics
        "total_js_files": len(
            [
                f
                for f in results.get("javascript", [])
                if f.get("type") != "parsing_error"
            ]
        ),
        "total_findings": len(results.get("javascript", [])),
        "error_count": error_count,
        "risk_finding_count": len(risk_impact_analysis),
        "severity_summary": severity_counts,
        # Reproducibility metadata
        "timestamp": analysis_timestamp,
        "analyzer_version": ANALYZER_VERSION,
        "analysis_duration_seconds": round(analysis_duration_seconds, 3),
        "content_hash": content_hash,
        "status": "completed",
    }

    final_output = {
        "extension_id": extension_id,
        "name": extension_name,
        "analysis_metadata": analysis_metadata,  # Enhanced metadata
        "threat_score": score_data["score"],
        "raw_score": score_data["raw_score"],
        "capability_score": score_data["capability_score"],
        "behavior_score": score_data["behavior_score"],
        "size_factor": score_data["size_factor"],
        "breakdown": score_data["breakdown"],
        "total_js_files": score_data["total_js_files"],
        "threat_report": score_data["report"],
        "ml_analysis": ml_result,
        "risk_impact_analysis": risk_impact_analysis,
        "detailed_findings": results,
    }

    print(f"\n--- Analysis Complete for {extension_id} ---", file=sys.stderr)
    return final_output


def main(path):
    result = analyze_extension(path)
    if result:
        print(json.dumps(result, indent=2))
    print("-------------------------------------------------", file=sys.stderr)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Analyze an unpacked browser extension directory."
    )
    parser.add_argument(
        "--path",
        required=True,
        help="The path to the single unpacked extension's directory.",
    )
    args = parser.parse_args()

    if not os.path.isdir(args.path):
        print(f"Error: Path '{args.path}' is not a valid directory.", file=sys.stderr)
    else:
        main(args.path)
