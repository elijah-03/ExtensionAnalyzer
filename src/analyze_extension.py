#!/usr/bin/env python3

"""
Analyzes an unpacked browser extension directory for specific properties.

Requires:
- esprima: (pip install esprima)
"""

import os
import json
import argparse
import sys
import math

# Set recursion limit before importing esprima if needed, but usually imports should be top.
sys.setrecursionlimit(5000)
import esprima  # Imported for future JavaScript AST analysis


def calculate_entropy(text):
    """
    Calculates the Shannon entropy of a given string.
    """
    if not text:
        return 0
    entropy = 0
    for x in range(256):
        p_x = float(text.count(chr(x))) / len(text)
        if p_x > 0:
            entropy += -p_x * math.log(p_x, 2)
    return entropy


def analyze_manifest(manifest_data):
    """
    Analyzes the manifest.json data for security risks.

    Args:
        manifest_data (dict): The loaded JSON data from manifest.json.

    Returns:
        dict: A dictionary of security-related findings.
    """
    # Print to stderr to avoid polluting stdout
    print(
        f"Analyzing manifest (v{manifest_data.get('manifest_version', 'N/A')})...",
        file=sys.stderr,
    )

    findings = {}

    # 1. Risky Permissions
    risky_permissions_to_check = {
        "scripting",
        "tabs",
        "webRequest",
        "webRequestBlocking",
        "cookies",
        "debugger",
        "management",
        "proxy",
        "privacy",
        "downloads",
        "nativeMessaging",
    }
    permissions = set(manifest_data.get("permissions", []))
    findings["risky_permissions"] = sorted(
        list(risky_permissions_to_check.intersection(permissions))
    )

    # 2. Broad Host Permissions
    # Checking for <all_urls> or http://*/* or https://*/*
    broad_hosts_to_check = {"<all_urls>", "http://*/*", "https://*/*"}
    host_permissions = set(manifest_data.get("host_permissions", []))
    findings["broad_hosts"] = sorted(
        list(broad_hosts_to_check.intersection(host_permissions))
    )

    # 3. Check for insecure CSP (handles Manifest V2 strings and V3 objects)
    csp_data = manifest_data.get("content_security_policy")
    csp_string = ""
    if isinstance(csp_data, dict):
        # Manifest V3 style
        csp_string = csp_data.get("extension_pages", "")
    elif isinstance(csp_data, str):
        # Manifest V2 style
        csp_string = csp_data

    findings["has_unsafe_eval"] = "unsafe-eval" in csp_string
    findings["has_unsafe_inline"] = "unsafe-inline" in csp_string

    # 4. External Connectivity
    connectable_matches = manifest_data.get("externally_connectable", {}).get(
        "matches", []
    )
    findings["externally_connectable_all"] = any(
        match == "*" for match in connectable_matches
    )

    # 5. Service Worker
    findings["has_service_worker"] = "service_worker" in manifest_data.get(
        "background", {}
    )

    return findings


def ast_to_dict(node):
    """
    Recursively converts an esprima AST node (and its children) to a dictionary.
    """
    if isinstance(node, list):
        return [ast_to_dict(x) for x in node]
    if hasattr(node, "__dict__"):
        d = {}
        for k, v in vars(node).items():
            d[k] = ast_to_dict(v)
        return d
    return node


def traverse_ast(node, file_path, findings):
    """
    Recursively traverses the AST to find suspicious patterns.

    Args:
        node (dict or list or None): The current AST node (or list of nodes).
        file_path (str): The path to the file being analyzed.
        findings (list): The list to append findings to.
    """
    if node is None:
        return

    if isinstance(node, list):
        for item in node:
            traverse_ast(item, file_path, findings)
        return

    if isinstance(node, dict):
        # --- Check for suspicious patterns on the current node ---

        node_type = node.get("type")
        line = node.get("loc", {}).get("start", {}).get("line", 0)

        # check: eval()
        if (
            node_type == "CallExpression"
            and node.get("callee", {}).get("name") == "eval"
        ):
            findings.append(
                {
                    "file": file_path,
                    "line": line,
                    "type": "suspicious_call",
                    "value": "eval",
                }
            )

        # check: new Function()
        if (
            node_type == "NewExpression"
            and node.get("callee", {}).get("name") == "Function"
        ):
            findings.append(
                {
                    "file": file_path,
                    "line": line,
                    "type": "suspicious_call",
                    "value": "new Function",
                }
            )

        # check: .executeScript
        if (
            node_type == "MemberExpression"
            and node.get("property", {}).get("name") == "executeScript"
        ):
            findings.append(
                {
                    "file": file_path,
                    "line": line,
                    "type": "suspicious_api",
                    "value": "executeScript",
                }
            )

        # check: Data Exfiltration (fetch, XMLHttpRequest)
        if node_type == "CallExpression":
            callee_name = node.get("callee", {}).get("name")
            if callee_name == "fetch":
                findings.append(
                    {
                        "file": file_path,
                        "line": line,
                        "type": "exfiltration_risk",
                        "value": "fetch",
                    }
                )

        if (
            node_type == "NewExpression"
            and node.get("callee", {}).get("name") == "XMLHttpRequest"
        ):
            findings.append(
                {
                    "file": file_path,
                    "line": line,
                    "type": "exfiltration_risk",
                    "value": "XMLHttpRequest",
                }
            )

        # check: Dangerous DOM writes
        if node_type == "AssignmentExpression":
            left = node.get("left", {})
            if (
                left.get("type") == "MemberExpression"
                and left.get("property", {}).get("name") == "innerHTML"
            ):
                findings.append(
                    {
                        "file": file_path,
                        "line": line,
                        "type": "dangerous_dom",
                        "value": "innerHTML",
                    }
                )

        if (
            node_type == "CallExpression"
            and node.get("callee", {}).get("type") == "MemberExpression"
            and node.get("callee", {}).get("object", {}).get("name") == "document"
            and node.get("callee", {}).get("property", {}).get("name") == "write"
        ):
            findings.append(
                {
                    "file": file_path,
                    "line": line,
                    "type": "dangerous_dom",
                    "value": "document.write",
                }
            )

        # check: Literals (strings)
        if node_type == "Literal" and isinstance(node.get("value"), str):
            str_val = node["value"]

            # check: hardcoded URLs
            if "http://" in str_val or "https://" in str_val:
                findings.append(
                    {
                        "file": file_path,
                        "line": line,
                        "type": "hardcoded_url",
                        "value": str_val[:100],  # Truncate
                    }
                )

            # check: long strings (potential packed/obfuscated code)
            if len(str_val) > 500:
                findings.append(
                    {
                        "file": file_path,
                        "line": line,
                        "type": "long_string",
                        "value": "Potential packed code (string > 500 chars)",
                    }
                )

            # check: High Entropy Strings (Obfuscation)
            entropy = calculate_entropy(str_val)
            if len(str_val) > 50 and entropy > 4.5:  # Thresholds can be tuned
                findings.append(
                    {
                        "file": file_path,
                        "line": line,
                        "type": "high_entropy_string",
                        "value": f"Entropy: {entropy:.2f}",
                    }
                )

        # --- Recurse into all children of the node ---
        for key, value in node.items():
            # 'loc' is metadata, no need to traverse it
            if key != "loc":
                traverse_ast(value, file_path, findings)


def analyze_javascript_files(extension_path):
    """
    Finds and analyzes all JavaScript files in the extension path using AST.

    Args:
        extension_path (str): The root path of the extension.

    Returns:
        list: A list of finding dictionaries.
    """
    # Print to stderr
    print(f"Analyzing JavaScript files in {extension_path}...", file=sys.stderr)
    findings = []

    for root, dirs, files in os.walk(extension_path):
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)

                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                except UnicodeDecodeError:
                    # Skip binary files or files with weird encoding
                    findings.append(
                        {
                            "file": file_path,
                            "line": 0,
                            "type": "read_error",
                            "value": "Could not read file (UnicodeDecodeError)",
                        }
                    )
                    continue
                except Exception as e:
                    findings.append(
                        {
                            "file": file_path,
                            "line": 0,
                            "type": "read_error",
                            "value": f"Unexpected read error: {e}",
                        }
                    )
                    continue

                # Parse the file into an Abstract Syntax Tree (AST)
                try:
                    # 'loc': True adds line number information to nodes
                    ast = esprima.parseScript(content, options={"loc": True})

                    # Convert AST to dict for easier traversal
                    ast = ast_to_dict(ast)

                    # Traverse the AST to find patterns
                    traverse_ast(ast, file_path, findings)

                except esprima.Error as e:
                    # This often happens with minified or obfuscated code
                    findings.append(
                        {
                            "file": file_path,
                            "line": e.lineNumber or 0,
                            "type": "parsing_error",
                            "value": "File is obfuscated or unparseable",
                        }
                    )
                except Exception as e:
                    # Catch other potential errors (e.g., recursion depth)
                    findings.append(
                        {
                            "file": file_path,
                            "line": 0,
                            "type": "parsing_error",
                            "value": f"Unexpected parsing error: {e}",
                        }
                    )

    return findings


def analyze_network_rules(extension_path, manifest_data):
    """
    Analyzes network-related rules (e.g., declarative_net_request).

    Args:
        extension_path (str): The root path of the extension.
        manifest_data (dict): The loaded JSON data from manifest.json.

    Returns:
        list: A list of suspicious network rule findings.
    """
    findings = []

    # Check for declarative_net_request
    if "declarative_net_request" not in manifest_data:
        return findings

    rule_files_data = manifest_data["declarative_net_request"].get("rule_resources", [])

    for rule_file_entry in rule_files_data:
        # In Manifest V3, this is an object, e.g., {"id": "ruleset_1", "path": "rules.json"}
        rule_file_path = rule_file_entry.get("path")
        if not rule_file_path:
            continue  # Skip if no path is specified

        full_rule_path = os.path.join(extension_path, rule_file_path)

        try:
            with open(full_rule_path, "r", encoding="utf-8") as f:
                rules_data = json.load(f)

            # Iterate through the list of rules in the file
            for rule in rules_data:
                action_type = rule.get("action", {}).get("type")
                condition = rule.get("condition", {})

                # Check for 'redirect' or 'block'
                if action_type in ("redirect", "block"):
                    url_filter = condition.get("urlFilter")
                    regex_filter = condition.get("regexFilter")

                    # Check for broad filters
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

        except FileNotFoundError:
            # Print warnings to stderr
            print(
                f"  -> Warning: Rule file not found: {full_rule_path}", file=sys.stderr
            )
        except json.JSONDecodeError:
            # Print warnings to stderr
            print(
                f"  -> Warning: Could not parse rule file: {full_rule_path}",
                file=sys.stderr,
            )
        except Exception as e:
            # Print warnings to stderr
            print(
                f"  -> Warning: Error processing rule file {full_rule_path}: {e}",
                file=sys.stderr,
            )

    return findings


def calculate_threat_score(analysis_results):
    """
    Calculates a heuristic threat score based on the analysis results.

    Args:
        analysis_results (dict): The complete findings from all analysis functions.

    Returns:
        dict: A dictionary containing the 'score' (int) and 'report' (list).
    """
    score = 0
    threat_report = []

    # --- Manifest Analysis ---
    manifest_findings = analysis_results.get("manifest", {})

    if "<all_urls>" in manifest_findings.get("broad_hosts", []):
        score += 20
        threat_report.append("Uses broad host permission '<all_urls>'")

    if "scripting" in manifest_findings.get("risky_permissions", []):
        score += 15
        threat_report.append(
            "Requests 'scripting' permission (can execute arbitrary code)"
        )

    if "cookies" in manifest_findings.get("risky_permissions", []):
        score += 10
        threat_report.append(
            "Requests 'cookies' permission (can read/write cookies for allowed sites)"
        )

    # New permissions
    for perm in ["management", "proxy", "privacy", "downloads", "nativeMessaging"]:
        if perm in manifest_findings.get("risky_permissions", []):
            score += 15
            threat_report.append(f"Requests '{perm}' permission (high risk)")

    if manifest_findings.get("has_unsafe_eval", False):
        score += 40
        threat_report.append(
            "Manifest CSP allows 'unsafe-eval' (dangerous script execution)"
        )

    # --- JavaScript Analysis ---
    js_findings = analysis_results.get("javascript", [])

    # Track counts for saturation
    counts = {
        "eval": 0,
        "new_func": 0,
        "parsing_error": 0,
        "long_string": 0,
        "high_entropy": 0,
        "exfiltration": 0,
        "dangerous_dom": 0,
    }

    for finding in js_findings:
        if finding["type"] == "suspicious_call" and finding["value"] == "eval":
            counts["eval"] += 1
            if counts["eval"] <= 1:  # Only report first few to avoid spam
                threat_report.append(
                    f"Uses eval() in {finding['file']} (line {finding['line']})"
                )

        if finding["type"] == "suspicious_call" and finding["value"] == "new Function":
            counts["new_func"] += 1
            if counts["new_func"] <= 1:
                threat_report.append(
                    f"Uses new Function() in {finding['file']} (line {finding['line']})"
                )

        if finding["type"] == "parsing_error":
            counts["parsing_error"] += 1
            if counts["parsing_error"] <= 1:
                threat_report.append(
                    f"Failed to parse {finding['file']}, (line {finding['line']}), likely minified or obfuscated"
                )

        if finding["type"] == "long_string":
            counts["long_string"] += 1
            if counts["long_string"] <= 1:
                threat_report.append(
                    f"Found potential packed code (long string) in {finding['file']} (line {finding['line']})"
                )

        if finding["type"] == "high_entropy_string":
            counts["high_entropy"] += 1
            if counts["high_entropy"] <= 1:
                threat_report.append(
                    f"Found high entropy string (potential obfuscation) in {finding['file']} (line {finding['line']})"
                )

        if finding["type"] == "exfiltration_risk":
            counts["exfiltration"] += 1
            if counts["exfiltration"] <= 5:
                threat_report.append(
                    f"Potential data exfiltration using {finding['value']} in {finding['file']} (line {finding['line']})"
                )

        if finding["type"] == "dangerous_dom":
            counts["dangerous_dom"] += 1
            if counts["dangerous_dom"] <= 5:
                threat_report.append(
                    f"Dangerous DOM operation {finding['value']} in {finding['file']} (line {finding['line']})"
                )

    # Apply scores with saturation (caps)
    score += min(
        counts["eval"] * 40, 40
    )  # Max 40 for eval (it's bad, but 10 evals isn't 10x worse than 1)
    score += min(counts["new_func"] * 30, 30)  # Max 30
    score += min(
        counts["parsing_error"] * 10, 20
    )  # Max 20 (a few errors ok, many is suspicious but capped)
    score += min(counts["long_string"] * 10, 30)  # Max 30 (minified code has many)
    score += min(counts["high_entropy"] * 15, 45)  # Max 45
    score += min(counts["exfiltration"] * 10, 50)  # Max 50
    score += min(counts["dangerous_dom"] * 20, 60)  # Max 60

    # --- Network Analysis ---
    net_findings = analysis_results.get("network", [])

    for rule in net_findings:
        # Note: The original prompt had a small error in accessing rule['condition']
        # This implementation is more robust.
        is_broad_redirect = rule["action"] == "redirect" and (
            rule.get("filter") == "*" or "*" in rule.get("filter", "")
        )
        if is_broad_redirect:
            score += 30
            threat_report.append(
                f"Found a broad network redirect rule in {rule['file']} (ID: {rule['id']})"
            )

    return {"score": score, "report": threat_report}


def analyze_extension(path):
    """
    Analyzes a single extension and returns the results dict.

    Args:
        path (str): The file path to the unpacked extension directory.

    Returns:
        dict: The analysis results, or None if analysis failed.
    """
    extension_id = os.path.basename(os.path.normpath(path))
    # Print to stderr
    print(f"--- Starting analysis for extension: {extension_id} ---", file=sys.stderr)

    results = {}

    # Find the manifest.json file
    manifest_path = os.path.join(path, "manifest.json")

    # Try to load the manifest.json file
    manifest_data = None
    try:
        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest_data = json.load(f)
    except FileNotFoundError:
        # Print errors to stderr
        print(f"Error: 'manifest.json' not found at {manifest_path}", file=sys.stderr)
        return None
    except json.JSONDecodeError:
        # Print errors to stderr
        print(
            f"Error: Could not decode 'manifest.json' at {manifest_path}. Invalid JSON.",
            file=sys.stderr,
        )
        return None
    except Exception as e:
        # Print errors to stderr
        print(
            f"An unexpected error occurred while reading the manifest: {e}",
            file=sys.stderr,
        )
        return None

    # Call placeholder analysis functions
    results["manifest"] = analyze_manifest(manifest_data)
    results["javascript"] = analyze_javascript_files(path)
    results["network"] = analyze_network_rules(path, manifest_data)

    # Calculate threat score based on all other results
    score_data = calculate_threat_score(results)

    # Create the final, structured output
    final_output = {
        "extension_id": extension_id,
        "threat_score": score_data["score"],
        "threat_report": score_data["report"],
        "detailed_findings": results,
    }

    # Print status to stderr
    print(f"\n--- Analysis Complete for {extension_id} ---", file=sys.stderr)
    return final_output


def main(path):
    """
    Main function to orchestrate the extension analysis.

    Args:
        path (str): The file path to the unpacked extension directory.
    """
    result = analyze_extension(path)
    if result:
        # *** THIS IS THE ONLY PRINT TO STDOUT ***
        print(json.dumps(result, indent=2))

    # Print status to stderr
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
        # Print errors to stderr
        print(f"Error: Path '{args.path}' is not a valid directory.", file=sys.stderr)
    else:
        main(args.path)
