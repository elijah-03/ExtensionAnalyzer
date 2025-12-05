"""
Manifest Analyzer Module for Chrome Extension Security Analyzer.

Handles parsing and analysis of extension manifest.json files.
Extracted from analyze_extension.py for better modularity.
"""

import sys

# Risky permissions that warrant security attention
RISKY_PERMISSIONS = {
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

# Host patterns indicating broad access
BROAD_HOST_PATTERNS = {"<all_urls>", "http://*/*", "https://*/*"}


def analyze_manifest(manifest_data):
    """
    Analyzes the manifest.json data for security risks.

    Args:
        manifest_data: Parsed manifest.json dictionary

    Returns:
        dict: Findings including risky permissions, broad hosts, CSP issues
    """
    print(
        f"Analyzing manifest (v{manifest_data.get('manifest_version', 'N/A')})...",
        file=sys.stderr,
    )

    findings = {}

    # 1. Risky Permissions
    permissions = set(manifest_data.get("permissions", []))
    findings["risky_permissions"] = sorted(
        list(RISKY_PERMISSIONS.intersection(permissions))
    )

    # 2. Broad Host Permissions
    host_permissions = set(manifest_data.get("host_permissions", []))
    findings["broad_hosts"] = sorted(
        list(BROAD_HOST_PATTERNS.intersection(host_permissions))
    )

    # 3. Check for insecure CSP
    csp_data = manifest_data.get("content_security_policy")
    csp_string = ""
    if isinstance(csp_data, dict):
        csp_string = csp_data.get("extension_pages", "")
    elif isinstance(csp_data, str):
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


def get_manifest_metadata(manifest_data):
    """
    Extracts basic metadata from the manifest.

    Args:
        manifest_data: Parsed manifest.json dictionary

    Returns:
        dict: Extension name, version, description, manifest version
    """
    return {
        "name": manifest_data.get("name", "Unknown"),
        "version": manifest_data.get("version", "Unknown"),
        "description": manifest_data.get("description", ""),
        "manifest_version": manifest_data.get("manifest_version", 2),
    }


def get_content_scripts(manifest_data):
    """
    Extracts content script configurations.

    Args:
        manifest_data: Parsed manifest.json dictionary

    Returns:
        list: Content script configurations with matches and js files
    """
    scripts = []
    for cs in manifest_data.get("content_scripts", []):
        scripts.append(
            {
                "matches": cs.get("matches", []),
                "js": cs.get("js", []),
                "css": cs.get("css", []),
                "run_at": cs.get("run_at", "document_idle"),
            }
        )
    return scripts


def get_web_accessible_resources(manifest_data):
    """
    Extracts web accessible resources.

    Args:
        manifest_data: Parsed manifest.json dictionary

    Returns:
        list: Web accessible resource patterns
    """
    resources = manifest_data.get("web_accessible_resources", [])

    # Handle MV3 format (list of objects with resources key)
    if resources and isinstance(resources[0], dict):
        all_resources = []
        for entry in resources:
            all_resources.extend(entry.get("resources", []))
        return all_resources

    # Handle MV2 format (list of strings)
    return resources
