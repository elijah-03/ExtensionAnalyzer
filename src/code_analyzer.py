import os
import sys
import re
import math
import esprima

"""
Code Analyzer Module for Chrome Extension Security Analyzer.

Handles JavaScript AST parsing, pattern detection, and code analysis.
Extracted from analyze_extension.py for better modularity.
"""

sys.setrecursionlimit(5000)


def calculate_entropy(s):
    """
    Calculates Shannon entropy of a string.
    High entropy suggests obfuscation or encoded data.

    Args:
        s: Input string

    Returns:
        float: Shannon entropy value (0-8 for ASCII)
    """
    if not s:
        return 0.0
    freq = {}
    for c in s:
        freq[c] = freq.get(c, 0) + 1
    length = len(s)
    entropy = -sum(
        (count / length) * math.log2(count / length) for count in freq.values()
    )
    return entropy


def ast_to_dict(node):
    """
    Recursively converts an esprima AST node to a dictionary.

    Args:
        node: AST node from esprima

    Returns:
        dict: Dictionary representation of AST node
    """
    if isinstance(node, list):
        return [ast_to_dict(x) for x in node]
    if hasattr(node, "__dict__"):
        d = {}
        for k, v in vars(node).items():
            d[k] = ast_to_dict(v)
        return d
    return node


def get_code_snippet(file_path, line_number, context_lines=3):
    """
    Extracts a code snippet from a file around a specific line.

    Args:
        file_path: Path to the source file
        line_number: Target line number
        context_lines: Number of lines before/after to include

    Returns:
        dict: Snippet info with lines and error status
    """
    try:
        with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
            lines = f.readlines()

        total_lines = len(lines)
        start_line = max(1, line_number - context_lines)
        end_line = min(total_lines, line_number + context_lines)

        snippet_lines = []
        for i in range(start_line - 1, end_line):
            line_num = i + 1
            prefix = ">>> " if line_num == line_number else "    "
            snippet_lines.append(f"{prefix}{line_num}: {lines[i].rstrip()}")

        return {
            "snippet": "\n".join(snippet_lines),
            "start_line": start_line,
            "end_line": end_line,
            "target_line": line_number,
        }
    except Exception as e:
        return {"snippet": f"Error extracting code: {str(e)}", "error": True}


# Risky Chrome APIs to detect
RISKY_CHROME_APIS = [
    "tabs",
    "webRequest",
    "cookies",
    "management",
    "proxy",
    "privacy",
    "downloads",
    "nativeMessaging",
]


def traverse_ast(node, file_path, findings):
    """
    Recursively traverses the AST to find suspicious patterns.

    Args:
        node: AST node dictionary
        file_path: Source file path for reporting
        findings: List to append findings to (modified in place)
    """
    if not isinstance(node, dict):
        return

    node_type = node.get("type")
    line = node.get("loc", {}).get("start", {}).get("line", 0)

    # Check for suspicious function calls
    if node_type == "CallExpression":
        callee = node.get("callee", {})

        # Check for eval()
        if callee.get("name") == "eval":
            finding = {
                "file": file_path,
                "line": line,
                "type": "suspicious_call",
                "value": "eval",
            }
            if line > 0:
                finding["code_snippet"] = get_code_snippet(file_path, line)
            findings.append(finding)

        # Check for new Function()
        if (
            callee.get("type") == "NewExpression"
            and callee.get("callee", {}).get("name") == "Function"
        ):
            findings.append(
                {
                    "file": file_path,
                    "line": line,
                    "type": "suspicious_call",
                    "value": "new Function",
                }
            )

        # Check for data exfiltration (fetch, XMLHttpRequest)
        if callee.get("name") == "fetch":
            args = node.get("arguments", [])
            is_suspicious = False
            url_val = "fetch (dynamic)"
            if args and args[0].get("type") == "Literal":
                url = args[0].get("value", "")
                if isinstance(url, str):
                    if url.startswith("http") or "//" in url:
                        is_suspicious = True
                        url_val = f"fetch('{url}')"
            else:
                is_suspicious = True

            if is_suspicious:
                findings.append(
                    {
                        "file": file_path,
                        "line": line,
                        "type": "exfiltration_risk",
                        "value": url_val,
                    }
                )

        if callee.get("name") == "XMLHttpRequest":
            findings.append(
                {
                    "file": file_path,
                    "line": line,
                    "type": "exfiltration_risk",
                    "value": "XMLHttpRequest",
                }
            )

        # Check for chrome.* API calls
        if callee.get("type") == "MemberExpression":
            obj = callee.get("object", {})
            prop = callee.get("property", {})
            if obj.get("name") == "chrome":
                api_name = prop.get("name")
                if api_name in RISKY_CHROME_APIS:
                    findings.append(
                        {
                            "file": file_path,
                            "line": line,
                            "type": "risky_api_call",
                            "value": f"chrome.{api_name}",
                        }
                    )

    # Check for assignment to innerHTML/outerHTML
    if node_type == "AssignmentExpression":
        left = node.get("left", {})
        right = node.get("right", {})
        prop_name = left.get("property", {}).get("name")

        if prop_name in ["innerHTML", "outerHTML"]:
            is_dangerous = False
            if right.get("type") == "Literal":
                val = str(right.get("value", "")).lower()
                if any(
                    tag in val
                    for tag in ["<script", "<iframe", "<object", "javascript:"]
                ):
                    is_dangerous = True
            else:
                is_dangerous = True

            if is_dangerous:
                finding = {
                    "file": file_path,
                    "line": line,
                    "type": "dangerous_dom",
                    "value": prop_name,
                }
                if line > 0:
                    finding["code_snippet"] = get_code_snippet(file_path, line)
                findings.append(finding)

    # Check for high entropy strings and suspicious URLs
    if node_type == "Literal":
        value = node.get("value")
        if isinstance(value, str):
            # Check for suspicious URLs (IP addresses)
            ip_pattern = r"http://\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}"
            if re.search(ip_pattern, value):
                findings.append(
                    {
                        "file": file_path,
                        "line": line,
                        "type": "suspicious_url",
                        "value": value,
                    }
                )

            if len(value) > 1000:  # Long string - potential packed code
                findings.append(
                    {
                        "file": file_path,
                        "line": line,
                        "type": "long_string",
                        "value": "Potential packed code (>1000 chars)",
                    }
                )
            elif len(value) > 50:  # Check entropy for medium strings
                entropy = calculate_entropy(value)
                if entropy > 5.8:
                    findings.append(
                        {
                            "file": file_path,
                            "line": line,
                            "type": "high_entropy_string",
                            "value": f"Entropy: {entropy:.2f}",
                        }
                    )

    # Recursively traverse children
    for key, value in node.items():
        if isinstance(value, dict):
            traverse_ast(value, file_path, findings)
        elif isinstance(value, list):
            for item in value:
                if isinstance(item, dict):
                    traverse_ast(item, file_path, findings)


def analyze_javascript_files(extension_path):
    """
    Finds and analyzes all JavaScript files in the extension path using AST.

    Args:
        extension_path: Root path of the extension

    Returns:
        list: Deduplicated list of findings
    """
    print(f"Analyzing JavaScript files in {extension_path}...", file=sys.stderr)
    findings = []

    for root, dirs, files in os.walk(extension_path):
        for file in files:
            if file.endswith(".js"):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                except Exception as e:
                    findings.append(
                        {
                            "file": file_path,
                            "line": 0,
                            "type": "read_error",
                            "value": str(e),
                        }
                    )
                    continue

                try:
                    ast = esprima.parseScript(content, options={"loc": True})
                    ast = ast_to_dict(ast)
                    traverse_ast(ast, file_path, findings)
                except esprima.Error as e:
                    findings.append(
                        {
                            "file": file_path,
                            "line": e.lineNumber or 0,
                            "type": "parsing_error",
                            "value": "Obfuscated/Unparseable",
                        }
                    )
                except Exception as e:
                    findings.append(
                        {
                            "file": file_path,
                            "line": 0,
                            "type": "parsing_error",
                            "value": str(e),
                        }
                    )

    # Deduplicate findings
    unique_findings = []
    seen = set()
    for f in findings:
        key = (f["file"], f["line"], f["type"], f["value"])
        if key not in seen:
            seen.add(key)
            unique_findings.append(f)

    return unique_findings
