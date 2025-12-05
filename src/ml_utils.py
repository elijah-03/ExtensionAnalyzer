"""
Utility functions extracted from analyze_extension.py for better modularity.
These functions handle feature detail mapping and category processing for ML explanations.
"""


def get_feature_details(feature):
    """
    Converts raw feature names to human-readable info with descriptions.

    Args:
        feature: Feature name (e.g., 'perm_webRequest', 'eval', etc.)

    Returns:
        dict with name, category, type, and description
    """
    # Permission features
    if feature.startswith("perm_"):
        perm_name = feature[5:]  # Remove 'perm_' prefix
        permission_descriptions = {
            "tabs": "Access to browser tabs",
            "webRequest": "Intercept and modify network requests",
            "webRequestBlocking": "Block network requests before they happen",
            "cookies": "Read and modify cookies",
            "storage": "Store persistent data",
            "unlimitedStorage": "Store unlimited data (no quota)",
            "notifications": "Show desktop notifications",
            "contextMenus": "Add items to right-click menus",
            "debugger": "Attach to pages with debugging APIs",
            "management": "Manage other extensions (install/uninstall)",
            "proxy": "Control browser's proxy settings",
            "privacy": "Access and modify privacy settings",
            "downloads": "Initiate and monitor downloads",
            "nativeMessaging": "Communicate with native applications",
            "scripting": "Execute arbitrary JavaScript in pages",
            "alarms": "Schedule code to run periodically",
            "background": "Run  background scripts persistently",
        }
        # Severity mapping for permissions
        severity_map = {
            "scripting": "critical",
            "webRequest": "critical",
            "management": "critical",
            "debugger": "critical",
            "proxy": "critical",
            "nativeMessaging": "critical",
            "tabs": "high",
            "cookies": "high",
            "privacy": "high",
            "downloads": "medium",
            "webRequestBlocking": "high",
            "storage": "low",
            "unlimitedStorage": "medium",
            "notifications": "low",
            "contextMenus": "low",
            "alarms": "low",
            "background": "medium",
        }

        return {
            "name": perm_name,
            "category": "Permissions",
            "type": "manifest",
            "description": permission_descriptions.get(
                perm_name, f"Permission: {perm_name}"
            ),
            "severity": severity_map.get(perm_name, "medium"),
        }

    # Host permission features
    if feature == "has_all_urls":
        return {
            "name": "All URLs Access",
            "category": "Permissions",
            "type": "manifest",
            "description": "Can access all websites (very broad permission)",
            "severity": "critical",
        }

    # CSP features
    if feature == "unsafe_eval":
        return {
            "name": "Unsafe Eval Allowed",
            "category": "Security",
            "type": "manifest",
            "description": "Content Security Policy allows dangerous eval() execution",
            "severity": "high",
        }

    # Code pattern features (TF-IDF)
    code_patterns = {
        "eval": {
            "category": "Behavior",
            "description": "Uses eval() for dynamic code execution (risky)",
            "severity": "high",
        },
        "atob": {
            "category": "Behavior",
            "description": "Uses base64 decoding (potential obfuscation)",
            "severity": "low",
        },
        "btoa": {
            "category": "Behavior",
            "description": "Uses base64 encoding (potential obfuscation)",
            "severity": "low",
        },
        "document": {
            "category": "Behavior",
            "description": "Accesses the DOM (document object)",
            "severity": "low",
        },
        "window": {
            "category": "Behavior",
            "description": "Accesses the window object",
            "severity": "low",
        },
        "chrome": {
            "category": "Behavior",
            "description": "Uses Chrome extension APIs",
            "severity": "medium",
        },
        "browser": {
            "category": "Behavior",
            "description": "Uses WebExtensions browser APIs",
            "severity": "medium",
        },
        "innerhtml": {
            "category": "Behavior",
            "description": "Modifies HTML content dynamically (XSS risk if unsanitized)",
            "severity": "medium",
        },
        "xmlhttprequest": {
            "category": "Behavior",
            "description": "Makes HTTP requests (network communication)",
            "severity": "medium",
        },
        "fetch": {
            "category": "Behavior",
            "description": "Makes modern HTTP requests (network communication)",
            "severity": "medium",
        },
        "websocket": {
            "category": "Behavior",
            "description": "Establishes persistent network connections",
            "severity": "medium",
        },
        "localstorage": {
            "category": "Behavior",
            "description": "Stores data in browser's local storage",
            "severity": "low",
        },
        "sessionstorage": {
            "category": "Behavior",
            "description": "Stores data in browser's session storage",
            "severity": "low",
        },
        "indexeddb": {
            "category": "Behavior",
            "description": "Uses browser's indexed database",
            "severity": "low",
        },
        "postmessage": {
            "category": "Behavior",
            "description": "Sends messages between windows/frames",
            "severity": "medium",
        },
        "addeventlistener": {
            "category": "Behavior",
            "description": "Listens for DOM events",
            "severity": "low",
        },
        "settimeout": {
            "category": "Behavior",
            "description": "Schedules code to run later",
            "severity": "low",
        },
        "setinterval": {
            "category": "Behavior",
            "description": "Schedules code to run repeatedly",
            "severity": "low",
        },
    }

    feature_lower = feature.lower()
    if feature_lower in code_patterns:
        pattern_info = code_patterns[feature_lower]
        return {
            "name": feature,
            "category": pattern_info["category"],
            "type": "code_pattern",
            "description": pattern_info["description"],
            "severity": pattern_info.get("severity", "medium"),
        }

    # Unknown/generic TF-IDF feature - categorize based on common patterns
    feature_lower = feature.lower()

    # Try to categorize by pattern recognition
    if any(kw in feature_lower for kw in ["http", "url", "request", "ajax", "xhr"]):
        return {
            "name": feature,
            "category": "Network",
            "type": "code_pattern",
            "description": f"Network-related code pattern: {feature}",
            "severity": "medium",
        }
    elif any(kw in feature_lower for kw in ["dom", "element", "node", "html", "css"]):
        return {
            "name": feature,
            "category": "DOM",
            "type": "code_pattern",
            "description": f"DOM manipulation pattern: {feature}",
            "severity": "low",
        }
    elif any(
        kw in feature_lower for kw in ["storage", "cookie", "cache", "local", "session"]
    ):
        return {
            "name": feature,
            "category": "Storage",
            "type": "code_pattern",
            "description": f"Data storage pattern: {feature}",
            "severity": "low",
        }

    # Truly unknown pattern
    return {
        "name": feature,
        "category": "Code Patterns",
        "type": "code_pattern",
        "description": f"JavaScript code pattern: {feature}",
        "severity": "low",
    }


def process_categories(categories_dict):
    """
    Processes aggregated SHAP categories into a sorted list with features.

    Args:
        categories_dict: Dictionary of {category: {"impact": float, "features": [...]}}

    Returns:
        List of dicts with name, impact, and sorted features
    """
    sorted_cats = []
    for cat, data in categories_dict.items():
        if data["impact"] > 0:
            # Sort features by absolute importance
            data["features"].sort(key=lambda x: abs(x["importance"]), reverse=True)
            sorted_cats.append(
                {
                    "name": cat,
                    "impact": data["impact"],
                    "features": data["features"],
                }
            )
    sorted_cats.sort(key=lambda x: x["impact"], reverse=True)
    return sorted_cats
