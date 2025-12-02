import os
import sys
import json
import statistics
from concurrent.futures import ProcessPoolExecutor, as_completed

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from analyze_extension import analyze_extension

DATASET_DIR = "dataset"
BENIGN_DIR = os.path.join(DATASET_DIR, "benign")
MALICIOUS_DIR = os.path.join(DATASET_DIR, "malicious")


def process_extension(path, label):
    try:
        # Suppress stderr for cleaner output
        # sys.stderr = open(os.devnull, 'w')
        result = analyze_extension(path)
        if result:
            return {
                "id": result["extension_id"],
                "score": result["threat_score"],
                "label": label,
                "report": result["threat_report"],
            }
    except Exception as e:
        return None
    return None


def evaluate():
    results = []

    extensions_to_process = []

    # Collect all paths
    if os.path.exists(BENIGN_DIR):
        for d in os.listdir(BENIGN_DIR):
            path = os.path.join(BENIGN_DIR, d)
            if os.path.isdir(path):
                extensions_to_process.append((path, "benign"))

    if os.path.exists(MALICIOUS_DIR):
        for d in os.listdir(MALICIOUS_DIR):
            path = os.path.join(MALICIOUS_DIR, d)
            if os.path.isdir(path):
                extensions_to_process.append((path, "malicious"))

    print(f"Found {len(extensions_to_process)} extensions to process.")

    # Limit for quick testing if needed, but user asked to test on dataset.
    # Let's process a subset first to be safe on time, or parallelize.
    # Parallelize is better.

    benign_scores = []
    malicious_scores = []

    # Use a smaller subset for this interactive session to avoid timeout
    # e.g. 50 of each
    # extensions_to_process = extensions_to_process[:100]

    # Actually, let's try to do a reasonable amount, maybe 20 of each to start and see speed.
    # If it's fast, we can do more.

    benign_subset = [x for x in extensions_to_process if x[1] == "benign"][:50]
    malicious_subset = [x for x in extensions_to_process if x[1] == "malicious"][:50]
    subset = benign_subset + malicious_subset

    print(f"Processing subset of {len(subset)} extensions...")

    import csv

    with open("results.csv", "w", newline="") as csvfile:
        fieldnames = ["extension_id", "threat_score", "label", "threat_report"]
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()

        with ProcessPoolExecutor(max_workers=4) as executor:
            futures = {
                executor.submit(process_extension, path, label): (path, label)
                for path, label in subset
            }

            for future in as_completed(futures):
                res = future.result()
                if res:
                    results.append(res)
                    if res["label"] == "benign":
                        benign_scores.append(res["score"])
                    else:
                        malicious_scores.append(res["score"])

                    # Write to CSV
                    writer.writerow(
                        {
                            "extension_id": res["id"],
                            "threat_score": res["score"],
                            "label": res["label"],
                            "threat_report": " | ".join(res["report"]),
                        }
                    )

    print("\n--- Evaluation Results ---")
    if benign_scores:
        print(f"Benign Extensions ({len(benign_scores)}):")
        print(f"  Avg Score: {statistics.mean(benign_scores):.2f}")
        print(f"  Max Score: {max(benign_scores)}")
        print(f"  Min Score: {min(benign_scores)}")

    if malicious_scores:
        print(f"Malicious Extensions ({len(malicious_scores)}):")
        print(f"  Avg Score: {statistics.mean(malicious_scores):.2f}")
        print(f"  Max Score: {max(malicious_scores)}")
        print(f"  Min Score: {min(malicious_scores)}")

    # Simple threshold analysis
    thresholds = [0, 10, 20, 30, 40, 50, 100]
    print("\n--- Threshold Analysis ---")
    print(
        f"{'Threshold':<10} | {'Benign Pass':<12} | {'Malicious Catch':<15} | {'Accuracy':<10}"
    )
    for t in thresholds:
        benign_pass = sum(1 for s in benign_scores if s < t)
        malicious_catch = sum(1 for s in malicious_scores if s >= t)

        benign_acc = benign_pass / len(benign_scores) if benign_scores else 0
        malicious_acc = (
            malicious_catch / len(malicious_scores) if malicious_scores else 0
        )
        total_acc = (
            (benign_pass + malicious_catch)
            / (len(benign_scores) + len(malicious_scores))
            if results
            else 0
        )

        print(
            f"{t:<10} | {benign_acc:.2%}     | {malicious_acc:.2%}        | {total_acc:.2%}"
        )


if __name__ == "__main__":
    evaluate()
