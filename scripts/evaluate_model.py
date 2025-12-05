#!/usr/bin/env python3
"""
Comprehensive evaluation script for Chrome Extension Security Analyzer.
Analyzes performance of both rule-based and ML-based approaches.
"""

import os
import sys
import pandas as pd
import numpy as np
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
)
import json

# Check if comparison results exist
RESULTS_FILE = "comparison_results.csv"

if not os.path.exists(RESULTS_FILE):
    print(f"Error: {RESULTS_FILE} not found.")
    print("Run compare_results.py first to generate comparison data.")
    sys.exit(1)

# Load results
df = pd.read_csv(RESULTS_FILE)

print("=" * 70)
print("CHROME EXTENSION SECURITY ANALYZER - EVALUATION REPORT")
print("=" * 70)
print()

# Dataset Statistics
print("[DATA] DATASET STATISTICS")
print("-" * 70)
print(f"Total Extensions Analyzed: {len(df)}")
print(f"  - Benign: {(df['label'] == 'Benign').sum()}")
print(f"  - Malicious: {(df['label'] == 'Malicious').sum()}")
print()

# Rule-Based Analysis
print("[RULES] RULE-BASED SYSTEM PERFORMANCE")
print("-" * 70)

# Define threshold for rule-based classification
RULE_THRESHOLD = 50
df["rule_pred"] = df["rule_score"].apply(
    lambda x: "Malicious" if x > RULE_THRESHOLD else "Benign"
)

# Filter out "Unknown" ML predictions for fair comparison
df_valid = df[df["ml_label"] != "Unknown"].copy()

if len(df_valid) < len(df):
    print(
        f"[!] Note: {len(df) - len(df_valid)} extensions had ML errors, excluded from ML metrics"
    )
    print()

# Rule-based metrics (on all data)
rule_acc = accuracy_score(df["label"], df["rule_pred"])
rule_prec = precision_score(
    df["label"], df["rule_pred"], pos_label="Malicious", zero_division=0
)
rule_rec = recall_score(
    df["label"], df["rule_pred"], pos_label="Malicious", zero_division=0
)
rule_f1 = f1_score(df["label"], df["rule_pred"], pos_label="Malicious", zero_division=0)

print(f"Threshold: score > {RULE_THRESHOLD} = Malicious")
print(f"Accuracy:  {rule_acc:.2%}")
print(
    f"Precision: {rule_prec:.2%} (of predicted malicious, how many are actually malicious)"
)
print(f"Recall:    {rule_rec:.2%} (of actual malicious, how many were detected)")
print(f"F1-Score:  {rule_f1:.2%}")
print()

# Confusion Matrix
print("Confusion Matrix:")
cm_rule = confusion_matrix(df["label"], df["rule_pred"], labels=["Benign", "Malicious"])
print(f"                Predicted")
print(f"                Benign  Malicious")
print(f"Actual Benign     {cm_rule[0][0]:3d}      {cm_rule[0][1]:3d}")
print(f"       Malicious  {cm_rule[1][0]:3d}      {cm_rule[1][1]:3d}")
print()

# False Positive/Negative Rates
tn_rule, fp_rule, fn_rule, tp_rule = cm_rule.ravel()
fpr_rule = fp_rule / (fp_rule + tn_rule) if (fp_rule + tn_rule) > 0 else 0
fnr_rule = fn_rule / (fn_rule + tp_rule) if (fn_rule + tp_rule) > 0 else 0

print(f"False Positive Rate: {fpr_rule:.2%} ({fp_rule} benign flagged as malicious)")
print(f"False Negative Rate: {fnr_rule:.2%} ({fn_rule} malicious missed)")
print()

# ML-Based Analysis
print("[ML] MACHINE LEARNING SYSTEM PERFORMANCE")
print("-" * 70)

if len(df_valid) > 0:
    ml_acc = accuracy_score(df_valid["label"], df_valid["ml_label"])
    ml_prec = precision_score(
        df_valid["label"], df_valid["ml_label"], pos_label="Malicious", zero_division=0
    )
    ml_rec = recall_score(
        df_valid["label"], df_valid["ml_label"], pos_label="Malicious", zero_division=0
    )
    ml_f1 = f1_score(
        df_valid["label"], df_valid["ml_label"], pos_label="Malicious", zero_division=0
    )

    print(f"Model: Random Forest (100 trees, TF-IDF features)")
    print(f"Accuracy:  {ml_acc:.2%}")
    print(f"Precision: {ml_prec:.2%}")
    print(f"Recall:    {ml_rec:.2%}")
    print(f"F1-Score:  {ml_f1:.2%}")
    print()

    # Confusion Matrix
    print("Confusion Matrix:")
    cm_ml = confusion_matrix(
        df_valid["label"], df_valid["ml_label"], labels=["Benign", "Malicious"]
    )
    print(f"                Predicted")
    print(f"                Benign  Malicious")
    print(f"Actual Benign     {cm_ml[0][0]:3d}      {cm_ml[0][1]:3d}")
    print(f"       Malicious  {cm_ml[1][0]:3d}      {cm_ml[1][1]:3d}")
    print()

    # False Positive/Negative Rates
    tn_ml, fp_ml, fn_ml, tp_ml = cm_ml.ravel()
    fpr_ml = fp_ml / (fp_ml + tn_ml) if (fp_ml + tn_ml) > 0 else 0
    fnr_ml = fn_ml / (fn_ml + tp_ml) if (fn_ml + tp_ml) > 0 else 0

    print(f"False Positive Rate: {fpr_ml:.2%} ({fp_ml} benign flagged as malicious)")
    print(f"False Negative Rate: {fnr_ml:.2%} ({fn_ml} malicious missed)")
    print()
else:
    print("[!] No valid ML predictions found. Run compare_results.py to regenerate.")
    ml_acc = ml_prec = ml_rec = ml_f1 = 0
    fpr_ml = fnr_ml = 0
    print()

# Comparative Analysis
print("[COMPARE] COMPARATIVE ANALYSIS")
print("-" * 70)

if len(df_valid) > 0:
    acc_improvement = (ml_acc - rule_acc) * 100
    fpr_reduction = (fpr_rule - fpr_ml) * 100

    print(
        f"Accuracy Improvement:    ML is {acc_improvement:+.1f} percentage points better"
    )
    print(
        f"False Positive Reduction: ML reduces FPR by {fpr_reduction:.1f} percentage points"
    )
    print()

    # Cases where ML wins
    ml_wins = df_valid[
        (df_valid["ml_label"] == df_valid["label"])
        & (df_valid["rule_pred"] != df_valid["label"])
    ]
    rule_wins = df_valid[
        (df_valid["rule_pred"] == df_valid["label"])
        & (df_valid["ml_label"] != df_valid["label"])
    ]

    print(f"Extensions where ML correct, Rules wrong: {len(ml_wins)}")
    print(f"Extensions where Rules correct, ML wrong: {len(rule_wins)}")
    print()

    # Correlation
    correlation = df_valid["rule_score"].corr(df_valid["ml_prob"])
    print(f"Correlation between Rule Score and ML Probability: {correlation:.3f}")
    print()

# Export metrics to JSON
metrics = {
    "dataset": {
        "total": len(df),
        "benign": int((df["label"] == "Benign").sum()),
        "malicious": int((df["label"] == "Malicious").sum()),
        "valid_ml_predictions": len(df_valid),
    },
    "rule_based": {
        "threshold": RULE_THRESHOLD,
        "accuracy": float(rule_acc),
        "precision": float(rule_prec),
        "recall": float(rule_rec),
        "f1_score": float(rule_f1),
        "false_positive_rate": float(fpr_rule),
        "false_negative_rate": float(fnr_rule),
        "confusion_matrix": cm_rule.tolist(),
    },
    "machine_learning": {
        "accuracy": float(ml_acc),
        "precision": float(ml_prec),
        "recall": float(ml_rec),
        "f1_score": float(ml_f1),
        "false_positive_rate": float(fpr_ml),
        "false_negative_rate": float(fnr_ml),
        "confusion_matrix": cm_ml.tolist() if len(df_valid) > 0 else [],
    },
    "comparison": {
        "accuracy_improvement": float(ml_acc - rule_acc) if len(df_valid) > 0 else 0,
        "fpr_reduction": float(fpr_rule - fpr_ml) if len(df_valid) > 0 else 0,
        "ml_wins": len(ml_wins) if len(df_valid) > 0 else 0,
        "rule_wins": len(rule_wins) if len(df_valid) > 0 else 0,
    },
}

output_file = "evaluation_metrics.json"
with open(output_file, "w") as f:
    json.dump(metrics, f, indent=2)

print(f"[OK] Metrics exported to {output_file}")
print()

# Recommendations
print("[KEY] KEY FINDINGS")
print("-" * 70)

if len(df_valid) > 0:
    if ml_acc > rule_acc:
        print("[+] Machine Learning provides higher overall accuracy")
    if fpr_ml < fpr_rule:
        print("[+] Machine Learning reduces false positives (fewer benign flagged)")
    if ml_rec > rule_rec:
        print("[+] Machine Learning detects more actual malware (better recall)")

    if ml_acc > 0.85:
        print(f"[+] ML model achieves strong performance ({ml_acc:.1%} accuracy)")
    elif ml_acc > 0.7:
        print(f"[!] ML model has moderate performance ({ml_acc:.1%} accuracy)")
    else:
        print(f"[!] ML model needs improvement ({ml_acc:.1%} accuracy)")

print()
print("=" * 70)
