#!/usr/bin/env python3

"""
Runs the extension analyzer over a dataset of malicious and benign extensions
and compiles the results into a single CSV.

Assumes a directory structure like:
dataset/
    malicious/
        ext_id_1/
        ext_id_2/
        ...
    benign/
        ext_id_3/
        ext_id_4/
        ...
"""

import os
import subprocess
import json
import csv

# --- Configuration ---
# Get the directory where this script (run_evaluation.py) is located
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
# Get the parent directory (e.g., /.../ExtensionAnalyzer)
BASE_DIR = os.path.dirname(SCRIPT_DIR)

# Path to your analyzer script
ANALYZER_SCRIPT = os.path.join(SCRIPT_DIR, 'analyze_extension.py')

# Path to your dataset directory
DATASET_PATH = os.path.join(BASE_DIR, 'dataset')

# Output CSV file
OUTPUT_CSV = os.path.join(BASE_DIR, 'results.csv')
# ---------------------

def find_extension_dirs(dataset_path, label):
    """Finds all extension subdirectories in a given path."""
    label_path = os.path.join(dataset_path, label)
    if not os.path.isdir(label_path):
        print(f"Warning: Directory not found, skipping: {label_path}")
        return []
        
    paths = []
    for d in os.listdir(label_path):
        full_path = os.path.join(label_path, d)
        if os.path.isdir(full_path):
            paths.append((full_path, label))
    return paths

def main():
    """Main function to run the evaluation."""
    
    # 1. Find all extension paths to analyze
    print(f"Looking for extensions in '{DATASET_PATH}'...")
    malicious_paths = find_extension_dirs(DATASET_PATH, 'malicious')
    benign_paths = find_extension_dirs(DATASET_PATH, 'benign')
    all_paths_with_labels = malicious_paths + benign_paths
    
    if not all_paths_with_labels:
        print(f"Error: No extensions found in {DATASET_PATH}. Check your paths.")
        return

    print(f"Found {len(malicious_paths)} malicious and {len(benign_paths)} benign extensions.")

    # 2. Open the CSV file for writing
    print(f"Opening '{OUTPUT_CSV}' for writing results...")
    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        # Write the header row
        writer.writerow(['extension_id', 'threat_score', 'label', 'threat_report'])
        
        # 3. Loop through all paths and run the analyzer
        total = len(all_paths_with_labels)
        for i, (path, label) in enumerate(all_paths_with_labels):
            extension_name = os.path.basename(path)
            print(f"Analyzing ({i+1}/{total}): {extension_name} ({label})")
            
            try:
                # Run the analyzer script as a subprocess
                result = subprocess.run(
                    ['python3', ANALYZER_SCRIPT, '--path', path],
                    capture_output=True,
                    text=True,
                    encoding='utf-8',
                    timeout=30  # Add a timeout for safety
                )
                
                # *** FIX HERE ***
                # Only check for a non-zero return code, not for any stderr output,
                # as we use stderr for status messages.
                if result.returncode != 0:
                    print(f"  -> Error running analyzer on {extension_name} (return code: {result.returncode}):")
                    print(f"  -> STDOUT: {result.stdout}")
                    print(f"  -> STDERR: {result.stderr}")
                    continue

                # Parse the JSON output from stdout
                try:
                    output_data = json.loads(result.stdout)
                    
                    # Get the required fields
                    extension_id = output_data.get('extension_id', extension_name)
                    threat_score = output_data.get('threat_score', 0)
                    threat_report_list = output_data.get('threat_report', [])
                    
                    # Join the report list into a single string
                    threat_report_string = " | ".join(threat_report_list)
                    
                    # Write the row to the CSV
                    writer.writerow([extension_id, threat_score, label, threat_report_string])
                    
                except json.JSONDecodeError:
                    print(f"  -> Error: Could not decode JSON output for {extension_name}.")
                    # Find where the JSON output actually starts
                    json_start_index = result.stdout.find('{')
                    if json_start_index != -1:
                        print(f"  -> Raw STDOUT (from start of JSON): {result.stdout[json_start_index:json_start_index+200]}...")
                    else:
                        print(f"  -> Raw STDOUT (no JSON object found): {result.stdout[:200]}...")
                    print(f"  -> Raw STDERR: {result.stderr[:500]}...") # Also print stderr for context
                    
            except subprocess.TimeoutExpired:
                print(f"  -> Error: Analysis for {extension_name} timed out.")
            except Exception as e:
                print(f"  -> An unexpected error occurred for {extension_name}: {e}")

    print("\n" + "="*30)
    print(f"Evaluation complete. Results saved to {OUTPUT_CSV}")
    print("="*30)

if __name__ == "__main__":
    
    if not os.path.isfile(ANALYZER_SCRIPT):
        print(f"Error: Analyzer script not found at '{ANALYZER_SCRIPT}'")
        print("Please check the ANALYZER_SCRIPT path in run_evaluation.py")
    else:
        main()


