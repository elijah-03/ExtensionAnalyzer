#!/usr/bin/env python3
"""
Proper train/test split evaluation to validate model on truly unseen data.
Uses 70% train, 30% test split with stratification.
"""

import os
import sys
import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report,
)

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from feature_extraction import FeatureExtractor

DATASET_DIR = "dataset"
BENIGN_DIR = os.path.join(DATASET_DIR, "benign")
MALICIOUS_DIR = os.path.join(DATASET_DIR, "malicious")


def load_data():
    paths = []
    labels = []

    # Load Benign
    if os.path.exists(BENIGN_DIR):
        for d in os.listdir(BENIGN_DIR):
            path = os.path.join(BENIGN_DIR, d)
            if os.path.isdir(path):
                paths.append(path)
                labels.append(0)  # 0 for Benign

    # Load Malicious
    if os.path.exists(MALICIOUS_DIR):
        for d in os.listdir(MALICIOUS_DIR):
            path = os.path.join(MALICIOUS_DIR, d)
            if os.path.isdir(path):
                paths.append(path)
                labels.append(1)  # 1 for Malicious

    return paths, np.array(labels)


def main():
    print("=" * 70)
    print("TRAIN/TEST SPLIT EVALUATION")
    print("=" * 70)
    print()

    print("Loading data...")
    paths, y = load_data()
    print(
        f"Loaded {len(paths)} extensions ({sum(y == 0)} benign, {sum(y == 1)} malicious)."
    )
    print()

    # Train/Test Split (70/30)
    print("Splitting data (70% train, 30% test, stratified)...")
    train_paths, test_paths, y_train, y_test = train_test_split(
        paths, y, test_size=0.3, random_state=42, stratify=y
    )

    print(f"Training set: {len(train_paths)} extensions")
    print(f"  - Benign: {sum(y_train == 0)}")
    print(f"  - Malicious: {sum(y_train == 1)}")
    print(f"Test set: {len(test_paths)} extensions")
    print(f"  - Benign: {sum(y_test == 0)}")
    print(f"  - Malicious: {sum(y_test == 1)}")
    print()

    # Extract features
    print("Extracting features from training set...")
    extractor = FeatureExtractor(max_features=1000)
    X_train = extractor.fit_transform(train_paths)
    print(f"Training feature matrix shape: {X_train.shape}")

    print("Extracting features from test set...")
    X_test = extractor.transform(test_paths)
    print(f"Test feature matrix shape: {X_test.shape}")
    print()

    # Train model
    print("Training Random Forest model...")
    clf = RandomForestClassifier(
        n_estimators=100, random_state=42, class_weight="balanced"
    )
    clf.fit(X_train, y_train)
    print("Training complete.")
    print()

    # Evaluate on TEST set
    print("=" * 70)
    print("TEST SET PERFORMANCE (Held-Out Data)")
    print("=" * 70)

    y_pred = clf.predict(X_test)
    y_pred_proba = clf.predict_proba(X_test)[:, 1]

    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred, zero_division=0)
    recall = recall_score(y_test, y_pred, zero_division=0)
    f1 = f1_score(y_test, y_pred, zero_division=0)

    print(f"Accuracy:  {accuracy:.2%}")
    print(f"Precision: {precision:.2%}")
    print(f"Recall:    {recall:.2%}")
    print(f"F1-Score:  {f1:.2%}")
    print()

    # Confusion Matrix
    cm = confusion_matrix(y_test, y_pred)
    print("Confusion Matrix:")
    print(f"                Predicted")
    print(f"                Benign  Malicious")
    print(f"Actual Benign     {cm[0][0]:3d}      {cm[0][1]:3d}")
    print(f"       Malicious  {cm[1][0]:3d}      {cm[1][1]:3d}")
    print()

    # False positive/negative rates
    tn, fp, fn, tp = cm.ravel()
    fpr = fp / (fp + tn) if (fp + tn) > 0 else 0
    fnr = fn / (fn + tp) if (fn + tp) > 0 else 0

    print(f"False Positive Rate: {fpr:.2%} ({fp} benign misclassified)")
    print(f"False Negative Rate: {fnr:.2%} ({fn} malicious missed)")
    print()

    # Detailed classification report
    print("Detailed Classification Report:")
    print(classification_report(y_test, y_pred, target_names=["Benign", "Malicious"]))

    # Also evaluate on TRAINING set to show overfitting
    print("=" * 70)
    print("TRAINING SET PERFORMANCE (For Comparison)")
    print("=" * 70)
    print("Note: Training accuracy shows how well model fits training data.")
    print("      It should be higher than test accuracy (some overfitting is normal).")
    print()

    y_train_pred = clf.predict(X_train)
    train_accuracy = accuracy_score(y_train, y_train_pred)
    train_precision = precision_score(y_train, y_train_pred, zero_division=0)
    train_recall = recall_score(y_train, y_train_pred, zero_division=0)
    train_f1 = f1_score(y_train, y_train_pred, zero_division=0)

    print(f"Training Accuracy:  {train_accuracy:.2%}")
    print(f"Training Precision: {train_precision:.2%}")
    print(f"Training Recall:    {train_recall:.2%}")
    print(f"Training F1-Score:  {train_f1:.2%}")
    print()

    # Summary
    print("=" * 70)
    print("SUMMARY")
    print("=" * 70)
    print(f"[+] Test Accuracy:  {accuracy:.2%} (performance on unseen data)")
    print(f"[+] Train Accuracy: {train_accuracy:.2%} (performance on training data)")

    gap = (train_accuracy - accuracy) * 100
    if gap > 10:
        print(f"[!] Overfitting detected: {gap:.1f}pp gap between train and test")
    elif gap > 0:
        print(f"[+] Mild overfitting: {gap:.1f}pp gap (acceptable)")
    else:
        print(f"[+] No overfitting detected")

    print()
    print(
        "RECOMMENDATION: Use test accuracy ({:.2%}) when reporting model performance.".format(
            accuracy
        )
    )
    print("=" * 70)


if __name__ == "__main__":
    main()
