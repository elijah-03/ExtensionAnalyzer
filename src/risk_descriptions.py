#!/usr/bin/env python3
"""
Comprehensive risk descriptions for browser extension security analysis.
Provides severity levels and natural language impact statements for all findings.
"""

# Permission Risk Descriptions
PERMISSION_RISKS = {
    "tabs": {
        "severity": "Critical",
        "impact": "Grants access to browser tabs, which can be used to track user browsing habits and history, presenting a privacy concern.",
        "technical": "Can read URLs, titles, and favicons from all tabs. Enables tracking browsing behavior across all websites.",
    },
    "webRequest": {
        "severity": "High",
        "impact": "Allows the extension to observe and analyze traffic in flight for the selected hosts.",
        "technical": "Can intercept, modify, or block all HTTP/HTTPS requests. Combined with blocking, can redirect traffic or inject content.",
    },
    "webRequestBlocking": {
        "severity": "Critical",
        "impact": "Can intercept and modify network requests, potentially redirecting users to malicious sites or stealing credentials.",
        "technical": "Enables blocking and modifying web requests before they're sent, allowing man-in-the-middle attacks.",
    },
    "cookies": {
        "severity": "High",
        "impact": "Can access and modify browser cookies, potentially stealing session tokens or tracking data across sites.",
        "technical": "Full access to read, write, and delete cookies for all sites, enabling session hijacking.",
    },
    "scripting": {
        "severity": "Critical",
        "impact": "Injects scripts into web pages, which may alter or extract site contents, resulting in a substantial risk.",
        "technical": "Can execute arbitrary JavaScript in the context of any webpage, enabling data theft and content manipulation.",
    },
    "debugger": {
        "severity": "Critical",
        "impact": "Grants debugging access to browser internals, allowing deep inspection and modification of running pages.",
        "technical": "Can attach to tabs, set break points, and inspect/modify runtime state of web pages.",
    },
    "management": {
        "severity": "High",
        "impact": "Can control other browser extensions, potentially disabling security extensions or installing malicious ones.",
        "technical": "Allows listing, enabling, disabling, and uninstalling other extensions.",
    },
    "proxy": {
        "severity": "Critical",
        "impact": "Can control browser proxy settings, potentially routing all traffic through attacker-controlled servers.",
        "technical": "Full control over proxy configuration, enabling traffic interception and redirection.",
    },
    "privacy": {
        "severity": "High",
        "impact": "Can access and modify browser privacy settings, potentially weakening security protections.",
        "technical": "Control over privacy-related browser settings like tracking protection and safe browsing.",
    },
    "downloads": {
        "severity": "Medium",
        "impact": "Allows management of download operations but generally doesn't severely affect security unless misused.",
        "technical": "Can initiate, pause, resume, cancel downloads and access download history.",
    },
    "nativeMessaging": {
        "severity": "Medium",
        "impact": "Facilitates communication between extensions and native applications, usually low risk if managed correctly.",
        "technical": "Enables bidirectional communication with native applications installed on the system.",
    },
    "history": {
        "severity": "High",
        "impact": "Allows retrieval of a user's browsing history, presenting a notable privacy risk.",
        "technical": "Full access to read and search browsing history, including URLs and visit times.",
    },
    "notifications": {
        "severity": "Low",
        "impact": "Enables sending notifications which can be spammed but have minimal direct security impact.",
        "technical": "Can display desktop notifications to the user.",
    },
}

# Host Permission Risk Descriptions
HOST_RISKS = {
    "<all_urls>": {
        "severity": "Critical",
        "impact": "Allows access to all websites, posing a significant security risk as it can monitor and modify data from any visited site.",
        "technical": "Grants permission to inject scripts and access data on all HTTP/HTTPS URLs without restriction.",
    },
    "http://*/*": {
        "severity": "Critical",
        "impact": "Allows access to all HTTP websites, enabling monitoring and modification of unencrypted traffic.",
        "technical": "Pattern matches all HTTP URLs, allowing content script injection and data access.",
    },
    "https://*/*": {
        "severity": "Critical",
        "impact": "Allows access to all HTTPS websites, enabling monitoring and modification of all encrypted traffic.",
        "technical": "Pattern matches all HTTPS URLs, allowing content script injection and data access.",
    },
    "localhost": {
        "severity": "Low",
        "impact": "Request access to the following domains: localhost",
        "technical": "Access to local development server. Generally low risk unless accessing sensitive local services.",
    },
    "127.0.0.1": {
        "severity": "Low",
        "impact": "Request access to the following domains: 127.0.0.1 (localhost)",
        "technical": "Access to local loopback interface. Similar to localhost access.",
    },
}

# Code Pattern Risk Descriptions
CODE_PATTERN_RISKS = {
    "eval": {
        "severity": "Critical",
        "impact": "Uses eval() which can execute arbitrary code strings at runtime, potentially allowing attackers to inject and run malicious scripts. This is a major security risk.",
        "technical": "Evaluates JavaScript code from strings, creating code injection vulnerabilities if input is not sanitized.",
    },
    "Function": {
        "severity": "Critical",
        "impact": "Uses Function() constructor to create functions from strings, similar to eval() and equally dangerous.",
        "technical": "Dynamically creates functions from string code, enabling code injection attacks.",
    },
    "innerHTML": {
        "severity": "High",
        "impact": "Directly manipulates page HTML which can lead to cross-site scripting (XSS) vulnerabilities if user input is involved.",
        "technical": "Sets HTML content directly, potentially executing embedded scripts if content is not sanitized.",
    },
    "outerHTML": {
        "severity": "High",
        "impact": "Modifies entire element HTML including the element itself, risking XSS if not properly sanitized.",
        "technical": "Replaces entire elements with HTML strings, similar XSS risks as innerHTML.",
    },
    "document.write": {
        "severity": "High",
        "impact": "Uses document.write() which can overwrite page content and inject malicious scripts.",
        "technical": "Writes directly to document stream, can inject scripts and alter page structure.",
    },
    "fetch": {
        "severity": "Medium",
        "impact": "Makes network requests that could be used to send user data to external servers.",
        "technical": "Modern API for making HTTP requests, can exfiltrate data to remote servers.",
    },
    "XMLHttpRequest": {
        "severity": "Medium",
        "impact": "Makes network requests via XHR, potentially sending sensitive user information to external servers.",
        "technical": "Legacy API for HTTP requests, commonly used for data exfiltration.",
    },
    "chrome.storage": {
        "severity": "Low",
        "impact": "Accesses browser storage APIs to save or retrieve data locally.",
        "technical": "Uses Chrome storage API for persisting extension data.",
    },
    "chrome.runtime.sendMessage": {
        "severity": "Low",
        "impact": "Sends messages between extension components, generally benign functionality.",
        "technical": "Internal extension messaging for communication between scripts.",
    },
    "atob": {
        "severity": "Low",
        "impact": "Decodes base64-encoded data, sometimes used to hide malicious strings or URLs.",
        "technical": "Base64 decoding function, can obscure malicious content.",
    },
    "btoa": {
        "severity": "Low",
        "impact": "Encodes data to base64, which may be used to obfuscate network requests.",
        "technical": "Base64 encoding function, can hide data being exfiltrated.",
    },
}

# CSP Violation Risk Descriptions
CSP_RISKS = {
    "unsafe-eval": {
        "severity": "Critical",
        "impact": "Content Security Policy allows unsafe eval, permitting dynamic code execution which significantly weakens security.",
        "technical": "CSP directive 'unsafe-eval' enables eval() and Function(), creating code injection risks.",
    },
    "unsafe-inline": {
        "severity": "High",
        "impact": "Content Security Policy allows inline scripts, potentially enabling injection of malicious code into pages.",
        "technical": "CSP directive 'unsafe-inline' permits inline JavaScript, reducing XSS protection.",
    },
}

# Special Findings
SPECIAL_RISKS = {
    "high_entropy_string": {
        "severity": "Medium",
        "impact": "Contains long strings with high randomness (entropy), potentially indicating obfuscated or packed malicious code.",
        "technical": "High Shannon entropy suggests encrypted, encoded, or obfuscated content.",
    },
    "suspicious_url_ip": {
        "severity": "High",
        "impact": "Contains direct IP address URLs which may indicate attempts to bypass DNS-based security controls.",
        "technical": "Hard-coded IP addresses in code can evade domain blacklists and tracking.",
    },
    "broad_network_rule": {
        "severity": "High",
        "impact": "Defines overly broad network request modification rules that could affect many websites.",
        "technical": "Declarative net request rules with wildcards affecting multiple domains.",
    },
    "externally_connectable": {
        "severity": "High",
        "impact": "Allows external websites to communicate with this extension, potentially enabling unauthorized control.",
        "technical": "externally_connectable manifest field permits web pages to send messages to extension.",
    },
}


def get_permission_risk(permission_name):
    """Get risk description for a permission."""
    return PERMISSION_RISKS.get(
        permission_name,
        {
            "severity": "Medium",
            "impact": f"Requests {permission_name} permission, which may affect user privacy or security.",
            "technical": f"Permission: {permission_name}",
        },
    )


def get_host_risk(host_pattern):
    """Get risk description for a host permission pattern."""
    # Check exact matches first
    if host_pattern in HOST_RISKS:
        return HOST_RISKS[host_pattern]

    # Check if it's an IP address
    import re

    if re.match(r"^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", host_pattern):
        return {
            "severity": "High",
            "impact": f"Request access to IP address: {host_pattern}, which may indicate communication with unlisted or suspicious servers.",
            "technical": f"Direct IP access bypasses domain-based security controls: {host_pattern}",
        }

    # Check for localhost variants
    if "localhost" in host_pattern or "127.0.0.1" in host_pattern:
        return {
            "severity": "Low",
            "impact": f"Request access to the following domains: {host_pattern}",
            "technical": f"Local development access: {host_pattern}",
        }

    # Extract domain for well-known sites
    domain = extract_domain(host_pattern)
    if domain in ["google.com", "facebook.com", "microsoft.com", "apple.com"]:
        return {
            "severity": "Critical",
            "impact": f"Request access to the following domains: {domain}",
            "technical": f"Access to major service domain: {host_pattern}",
        }

    # Generic domain access
    return {
        "severity": "Medium",
        "impact": f"Request access to the following domains: {domain or host_pattern}",
        "technical": f"Domain pattern: {host_pattern}",
    }


def get_code_pattern_risk(pattern_name):
    """Get risk description for a code pattern."""
    return CODE_PATTERN_RISKS.get(
        pattern_name,
        {
            "severity": "Medium",
            "impact": f"Uses {pattern_name} which may present security or privacy risks depending on context.",
            "technical": f"Code pattern: {pattern_name}",
        },
    )


def get_csp_risk(violation_type):
    """Get risk description for CSP violations."""
    return CSP_RISKS.get(
        violation_type,
        {
            "severity": "Medium",
            "impact": f"Content Security Policy contains {violation_type}, which may weaken security protections.",
            "technical": f"CSP directive: {violation_type}",
        },
    )


def extract_domain(host_pattern):
    """Extract domain from host permission pattern."""
    import re

    # Remove protocol
    pattern = re.sub(r"^https?://", "", host_pattern)
    # Remove path
    pattern = pattern.split("/")[0]
    # Remove wildcards
    pattern = pattern.replace("*", "")
    # Remove port
    pattern = pattern.split(":")[0]
    return pattern.strip(".") if pattern else host_pattern


def format_risk_finding(severity, title, impact, technical_details=None, location=None):
    """Format a risk finding into standardized structure."""
    finding = {
        "severity": severity,
        "title": title,
        "impact": impact,
    }

    if technical_details or location:
        finding["details"] = {}
        if technical_details:
            finding["details"]["technical"] = technical_details
        if location:
            finding["details"]["location"] = location

    return finding
