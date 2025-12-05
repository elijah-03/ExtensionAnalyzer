#!/usr/bin/env python3
"""
Visualization script for evaluation results.
Creates plots comparing ML vs Rule-based performance.
"""

import os
import sys
import json
import matplotlib.pyplot as plt
import seaborn as sns
import numpy as np

# Set style
sns.set_style("whitegrid")
plt.rcParams["figure.figsize"] = (12, 8)
plt.rcParams["font.size"] = 10

# Load metrics
METRICS_FILE = os.path.join("data", "evaluation_metrics.json")

if not os.path.exists(METRICS_FILE):
    print(f"Error: {METRICS_FILE} not found.")
    print("Run evaluate_model.py first to generate metrics.")
    sys.exit(1)

with open(METRICS_FILE, "r") as f:
    metrics = json.load(f)

# Create output directory
os.makedirs("evaluation_plots", exist_ok=True)

# 1. Accuracy Comparison Bar Chart
fig, ax = plt.subplots(figsize=(10, 6))

models = ["Rule-Based", "Machine Learning"]
accuracies = [
    metrics["rule_based"]["accuracy"] * 100,
    metrics["machine_learning"]["accuracy"] * 100,
]
colors = ["#3b82f6", "#10b981"]

bars = ax.bar(
    models, accuracies, color=colors, alpha=0.8, edgecolor="black", linewidth=1.5
)

# Add value labels on bars
for bar, acc in zip(bars, accuracies):
    height = bar.get_height()
    ax.text(
        bar.get_x() + bar.get_width() / 2.0,
        height,
        f"{acc:.1f}%",
        ha="center",
        va="bottom",
        fontsize=14,
        fontweight="bold",
    )

ax.set_ylabel("Accuracy (%)", fontsize=12, fontweight="bold")
ax.set_title(
    "Classification Accuracy: Rule-Based vs Machine Learning",
    fontsize=14,
    fontweight="bold",
)
ax.set_ylim(0, 105)
ax.grid(axis="y", alpha=0.3)

plt.tight_layout()
plt.savefig("evaluation_plots/accuracy_comparison.png", dpi=300, bbox_inches="tight")
print("[OK] Saved: evaluation_plots/accuracy_comparison.png")
plt.close()

# 2. Comprehensive Metrics Comparison
fig, ax = plt.subplots(figsize=(12, 6))

metrics_names = ["Accuracy", "Precision", "Recall", "F1-Score"]
rule_metrics = [
    metrics["rule_based"]["accuracy"] * 100,
    metrics["rule_based"]["precision"] * 100,
    metrics["rule_based"]["recall"] * 100,
    metrics["rule_based"]["f1_score"] * 100,
]
ml_metrics = [
    metrics["machine_learning"]["accuracy"] * 100,
    metrics["machine_learning"]["precision"] * 100,
    metrics["machine_learning"]["recall"] * 100,
    metrics["machine_learning"]["f1_score"] * 100,
]

x = np.arange(len(metrics_names))
width = 0.35

bars1 = ax.bar(
    x - width / 2, rule_metrics, width, label="Rule-Based", color="#3b82f6", alpha=0.8
)
bars2 = ax.bar(
    x + width / 2,
    ml_metrics,
    width,
    label="Machine Learning",
    color="#10b981",
    alpha=0.8,
)

# Add value labels
for bars in [bars1, bars2]:
    for bar in bars:
        height = bar.get_height()
        ax.text(
            bar.get_x() + bar.get_width() / 2.0,
            height,
            f"{height:.1f}%",
            ha="center",
            va="bottom",
            fontsize=9,
        )

ax.set_ylabel("Score (%)", fontsize=12, fontweight="bold")
ax.set_title("Performance Metrics Comparison", fontsize=14, fontweight="bold")
ax.set_xticks(x)
ax.set_xticklabels(metrics_names, fontsize=11)
ax.legend(fontsize=11)
ax.set_ylim(0, 105)
ax.grid(axis="y", alpha=0.3)

plt.tight_layout()
plt.savefig("evaluation_plots/metrics_comparison.png", dpi=300, bbox_inches="tight")
print("[OK] Saved: evaluation_plots/metrics_comparison.png")
plt.close()

# 3. False Positive Rate Comparison
fig, ax = plt.subplots(figsize=(10, 6))

fpr_rule = metrics["rule_based"]["false_positive_rate"] * 100
fpr_ml = metrics["machine_learning"]["false_positive_rate"] * 100

bars = ax.bar(
    models,
    [fpr_rule, fpr_ml],
    color=["#ef4444", "#f97316"],
    alpha=0.8,
    edgecolor="black",
    linewidth=1.5,
)

for bar, fpr in zip(bars, [fpr_rule, fpr_ml]):
    height = bar.get_height()
    ax.text(
        bar.get_x() + bar.get_width() / 2.0,
        height,
        f"{fpr:.1f}%",
        ha="center",
        va="bottom",
        fontsize=14,
        fontweight="bold",
    )

ax.set_ylabel("False Positive Rate (%)", fontsize=12, fontweight="bold")
ax.set_title("False Positive Rate: Lower is Better", fontsize=14, fontweight="bold")
ax.set_ylim(0, max(fpr_rule, fpr_ml) * 1.3)
ax.grid(axis="y", alpha=0.3)

# Add note
reduction = fpr_rule - fpr_ml
ax.text(
    0.5,
    0.95,
    f"ML reduces FPR by {reduction:.1f} percentage points",
    transform=ax.transAxes,
    ha="center",
    va="top",
    fontsize=11,
    bbox=dict(boxstyle="round", facecolor="wheat", alpha=0.5),
)

plt.tight_layout()
plt.savefig(
    "evaluation_plots/false_positive_comparison.png", dpi=300, bbox_inches="tight"
)
print("[OK] Saved: evaluation_plots/false_positive_comparison.png")
plt.close()

# 4. Confusion Matrices (side by side)
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 6))

# Rule-based confusion matrix
cm_rule = np.array(metrics["rule_based"]["confusion_matrix"])
sns.heatmap(
    cm_rule,
    annot=True,
    fmt="d",
    cmap="Blues",
    ax=ax1,
    xticklabels=["Benign", "Malicious"],
    yticklabels=["Benign", "Malicious"],
    cbar_kws={"label": "Count"},
)
ax1.set_title("Rule-Based System", fontsize=13, fontweight="bold")
ax1.set_ylabel("Actual Label", fontsize=11)
ax1.set_xlabel("Predicted Label", fontsize=11)

# ML confusion matrix
cm_ml = np.array(metrics["machine_learning"]["confusion_matrix"])
sns.heatmap(
    cm_ml,
    annot=True,
    fmt="d",
    cmap="Greens",
    ax=ax2,
    xticklabels=["Benign", "Malicious"],
    yticklabels=["Benign", "Malicious"],
    cbar_kws={"label": "Count"},
)
ax2.set_title("Machine Learning System", fontsize=13, fontweight="bold")
ax2.set_ylabel("Actual Label", fontsize=11)
ax2.set_xlabel("Predicted Label", fontsize=11)

plt.tight_layout()
plt.savefig("evaluation_plots/confusion_matrices.png", dpi=300, bbox_inches="tight")
print("[OK] Saved: evaluation_plots/confusion_matrices.png")
plt.close()

# 5. Summary Statistics
fig, ax = plt.subplots(figsize=(10, 6))
ax.axis("off")

summary_text = f"""
CHROME EXTENSION SECURITY ANALYZER - EVALUATION SUMMARY

Dataset:
  • Total Extensions: {metrics["dataset"]["total"]} (50 benign, 50 malicious)
  • Class Balance: Perfect 50/50 split

Rule-Based System (Threshold: {metrics["rule_based"]["threshold"]}):
  • Accuracy: {metrics["rule_based"]["accuracy"] * 100:.1f}%
  • Precision: {metrics["rule_based"]["precision"] * 100:.1f}%
  • Recall: {metrics["rule_based"]["recall"] * 100:.1f}%
  • False Positive Rate: {metrics["rule_based"]["false_positive_rate"] * 100:.1f}%

Machine Learning System (Random Forest + TF-IDF):
  • Accuracy: {metrics["machine_learning"]["accuracy"] * 100:.1f}%
  • Precision: {metrics["machine_learning"]["precision"] * 100:.1f}%
  • Recall: {metrics["machine_learning"]["recall"] * 100:.1f}%
  • False Positive Rate: {metrics["machine_learning"]["false_positive_rate"] * 100:.1f}%

Key Findings:
  • Accuracy Improvement: {metrics["comparison"]["accuracy_improvement"] * 100:+.1f} percentage points
  • FPR Reduction: {metrics["comparison"]["fpr_reduction"] * 100:.1f} percentage points
  • ML Wins (correct when rules wrong): {metrics["comparison"]["ml_wins"]} cases
  • Rule Wins (correct when ML wrong): {metrics["comparison"]["rule_wins"]} cases
"""

ax.text(
    0.1,
    0.98,
    summary_text,
    transform=ax.transAxes,
    fontsize=11,
    verticalalignment="top",
    fontfamily="monospace",
    bbox=dict(boxstyle="round", facecolor="lightgray", alpha=0.5),
)

plt.tight_layout()
plt.savefig("evaluation_plots/summary.png", dpi=300, bbox_inches="tight")
print("[OK] Saved: evaluation_plots/summary.png")
plt.close()

print("\n[OK] All visualizations generated successfully!")
print("Output directory: evaluation_plots/")
