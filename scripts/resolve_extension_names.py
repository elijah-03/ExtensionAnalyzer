#!/usr/bin/env python3
"""
Resolve extension names from _locales/en/messages.json files in the dataset.
"""

import os
import json
import re


def get_name_from_locales(ext_path, manifest_name):
    """Try to resolve __MSG_ name from _locales directory."""
    # Extract the message key
    if not manifest_name.startswith("__MSG_"):
        return manifest_name

    msg_key = manifest_name.replace("__MSG_", "").replace("__", "")

    # Check for _locales/en/messages.json
    locales_path = os.path.join(ext_path, "_locales", "en", "messages.json")
    if not os.path.exists(locales_path):
        # Try en_US
        locales_path = os.path.join(ext_path, "_locales", "en_US", "messages.json")

    if os.path.exists(locales_path):
        try:
            with open(locales_path, "r", encoding="utf-8") as f:
                messages = json.load(f)

                # Look for the key
                if msg_key in messages:
                    return messages[msg_key].get("message", manifest_name)

                # Try lowercase
                if msg_key.lower() in messages:
                    return messages[msg_key.lower()].get("message", manifest_name)

                # Try common variations
                for key in messages:
                    if key.lower() == msg_key.lower():
                        return messages[key].get("message", manifest_name)
        except Exception as e:
            print(f"  Error reading locales for {os.path.basename(ext_path)}: {e}")

    return None


# Process extensions
BENIGN_DIR = "dataset/benign"
MALICIOUS_DIR = "dataset/malicious"

print("Resolving extension names from _locales files...")
print("=" * 70)

resolved = {}

for category, directory in [("benign", BENIGN_DIR), ("malicious", MALICIOUS_DIR)]:
    if not os.path.exists(directory):
        continue

    for ext_dir in sorted(os.listdir(directory)):
        ext_path = os.path.join(directory, ext_dir)
        if not os.path.isdir(ext_path):
            continue

        # Read manifest
        manifest_path = os.path.join(ext_path, "manifest.json")
        try:
            with open(manifest_path, "r", encoding="utf-8") as f:
                manifest = json.load(f)
                manifest_name = manifest.get("name", "Unknown")

                if manifest_name.startswith("__MSG_"):
                    real_name = get_name_from_locales(ext_path, manifest_name)
                    if real_name and real_name != manifest_name:
                        resolved[ext_dir] = real_name
                        print(f"[+] {ext_dir}: {manifest_name} -> {real_name}")
                    else:
                        print(f"[-] {ext_dir}: Could not resolve {manifest_name}")
        except Exception as e:
            print(f"  Error reading manifest for {ext_dir}: {e}")

print("=" * 70)
print(f"Resolved {len(resolved)} extension names")

# Update the dataset_extension_list.txt
print("\nUpdating dataset_extension_list.txt...")

with open("dataset_extension_list.txt", "r") as f:
    content = f.read()

# Replace names
for ext_id, real_name in resolved.items():
    # Escape special characters in the real name for regex
    safe_name = re.escape(real_name)

    # Find and replace the __MSG_ pattern for this extension ID
    pattern = rf"(\d+\. \*\*__MSG_[^*]+\*\*\n   - ID: `{ext_id}`)"

    def replacer(match):
        num_match = re.match(r"^(\d+)\.", match.group(1))
        if num_match:
            num = num_match.group(1)
            return f"{num}. **{real_name}**\n   - ID: `{ext_id}`"
        return match.group(1)

    content = re.sub(pattern, replacer, content)

# Save updated file
with open("dataset_extension_list.txt", "w") as f:
    f.write(content)

print(f"[OK] Updated dataset_extension_list.txt with {len(resolved)} resolved names")
