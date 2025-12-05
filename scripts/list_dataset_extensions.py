#!/usr/bin/env python3
"""
Extract extension names from the dataset for documentation.
"""

import os
import json

BENIGN_DIR = "dataset/benign"
MALICIOUS_DIR = "dataset/malicious"


def get_extension_info(path):
    """Get extension ID and name from manifest."""
    ext_id = os.path.basename(path)
    manifest_path = os.path.join(path, "manifest.json")

    try:
        with open(manifest_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)
            name = manifest.get("name", "Unknown")
            version = manifest.get("version", "Unknown")
            return {"id": ext_id, "name": name, "version": version}
    except Exception as e:
        return {"id": ext_id, "name": f"Error: {str(e)}", "version": "Unknown"}


print("=" * 80)
print("CHROME EXTENSION DATASET - EXTENSION LIST")
print("=" * 80)
print()

# Benign extensions
print("BENIGN EXTENSIONS (n=50)")
print("-" * 80)
benign_extensions = []
for ext_dir in sorted(os.listdir(BENIGN_DIR)):
    path = os.path.join(BENIGN_DIR, ext_dir)
    if os.path.isdir(path):
        info = get_extension_info(path)
        benign_extensions.append(info)
        print(f"{len(benign_extensions):2d}. {info['name']}")
        print(f"    ID: {info['id']}, Version: {info['version']}")

print(f"\nTotal Benign: {len(benign_extensions)}")
print()

# Malicious extensions
print("MALICIOUS EXTENSIONS (n=50)")
print("-" * 80)
malicious_extensions = []
for ext_dir in sorted(os.listdir(MALICIOUS_DIR)):
    path = os.path.join(MALICIOUS_DIR, ext_dir)
    if os.path.isdir(path):
        info = get_extension_info(path)
        malicious_extensions.append(info)
        print(f"{len(malicious_extensions):2d}. {info['name']}")
        print(f"    ID: {info['id']}, Version: {info['version']}")

print(f"\nTotal Malicious: {len(malicious_extensions)}")
print()
print("=" * 80)
print(f"GRAND TOTAL: {len(benign_extensions) + len(malicious_extensions)} extensions")
print("=" * 80)

# Save to file for documentation
output_file = "dataset_extension_list.txt"
with open(output_file, "w") as f:
    f.write("# Chrome Extension Dataset - Complete Extension List\n\n")

    f.write("## Benign Extensions (n={})\n\n".format(len(benign_extensions)))
    for i, ext in enumerate(benign_extensions, 1):
        f.write(f"{i}. **{ext['name']}**\n")
        f.write(f"   - ID: `{ext['id']}`\n")
        f.write(f"   - Version: {ext['version']}\n\n")

    f.write(f"\n## Malicious Extensions (n={len(malicious_extensions)})\n\n")
    for i, ext in enumerate(malicious_extensions, 1):
        f.write(f"{i}. **{ext['name']}**\n")
        f.write(f"   - ID: `{ext['id']}`\n")
        f.write(f"   - Version: {ext['version']}\n\n")

print(f"\n[OK] Extension list saved to: {output_file}")
