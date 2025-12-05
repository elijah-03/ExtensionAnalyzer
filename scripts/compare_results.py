import os
import sys
import csv
import pandas as pd
from concurrent.futures import ProcessPoolExecutor, as_completed

# Add src to path
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), "src"))
from analyze_extension import analyze_extension

DATASET_DIR = "dataset"
BENIGN_DIR = os.path.join(DATASET_DIR, "benign")
MALICIOUS_DIR = os.path.join(DATASET_DIR, "malicious")


def process_extension(path, label):
    try:
        result = analyze_extension(path)
        if result:
            return {
                "id": result["extension_id"],
                "label": label,
                "rule_score": result["threat_score"],
                "ml_prob": result["ml_analysis"]["probability"],
                "ml_label": result["ml_analysis"]["label"],
            }
    except Exception as e:
        print(f"Error processing {path}: {e}")
    return None


def main():
    extensions = []
    if os.path.exists(BENIGN_DIR):
        for d in os.listdir(BENIGN_DIR):
            extensions.append((os.path.join(BENIGN_DIR, d), "Benign"))
    if os.path.exists(MALICIOUS_DIR):
        for d in os.listdir(MALICIOUS_DIR):
            extensions.append((os.path.join(MALICIOUS_DIR, d), "Malicious"))

    print(f"Processing {len(extensions)} extensions...")

    output_file = "comparison_results.csv"
    fieldnames = ["id", "label", "rule_score", "ml_prob", "ml_label"]

    # Initialize CSV
    with open(output_file, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()

    results = []

    # Use ProcessPoolExecutor with 1 worker for stability
    with ProcessPoolExecutor(max_workers=1) as executor:
        futures = {
            executor.submit(process_extension, path, label): (path, label)
            for path, label in extensions
        }

        for future in as_completed(futures):
            res = future.result()
            if res:
                results.append(res)
                # Write incrementally
                with open(output_file, "a", newline="") as f:
                    writer = csv.DictWriter(f, fieldnames=fieldnames)
                    writer.writerow(res)

    if not results:
        print("No results collected.")
        return

    df = pd.DataFrame(results)

    print("\n--- Comparison Summary ---")
    print(f"Total Processed: {len(df)}")

    # Correlation
    corr = df["rule_score"].corr(df["ml_prob"])
    print(f"Correlation between Rule Score and ML Probability: {corr:.2f}")

    # Accuracy Analysis
    # Assume Rule Threshold > 50 is Malicious
    df["rule_pred"] = df["rule_score"].apply(
        lambda x: "Malicious" if x > 50 else "Benign"
    )

    rule_acc = (df["rule_pred"] == df["label"]).mean()
    ml_acc = (df["ml_label"] == df["label"]).mean()

    print(f"Rule-Based Accuracy: {rule_acc:.2%}")
    print(f"ML Model Accuracy:   {ml_acc:.2%}")

    # Discrepancies
    print("\n--- Discrepancies (Where ML is correct and Rules are wrong) ---")
    # ML Correct, Rules Wrong
    ml_wins = df[(df["ml_label"] == df["label"]) & (df["rule_pred"] != df["label"])]
    print(f"ML Wins: {len(ml_wins)}")
    if not ml_wins.empty:
        print(ml_wins[["id", "label", "rule_score", "ml_prob"]].head())

    print("\n--- Discrepancies (Where Rules are correct and ML is wrong) ---")
    # Rules Correct, ML Wrong
    rule_wins = df[(df["rule_pred"] == df["label"]) & (df["ml_label"] != df["label"])]
    print(f"Rule Wins: {len(rule_wins)}")
    if not rule_wins.empty:
        print(rule_wins[["id", "label", "rule_score", "ml_prob"]].head())


if __name__ == "__main__":
    main()
