import os
import sys
import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score, StratifiedKFold
from sklearn.metrics import classification_report, confusion_matrix

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from feature_extraction import FeatureExtractor

DATASET_DIR = "dataset"
BENIGN_DIR = os.path.join(DATASET_DIR, "benign")
MALICIOUS_DIR = os.path.join(DATASET_DIR, "malicious")
MODEL_PATH = "model.pkl"
VECTORIZER_PATH = "vectorizer.pkl"


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


def train():
    print("Loading data...")
    paths, y = load_data()
    print(
        f"Loaded {len(paths)} extensions ({sum(y == 0)} benign, {sum(y == 1)} malicious)."
    )

    print("Extracting features (this may take a moment)...")
    extractor = FeatureExtractor(max_features=1000)
    X = extractor.fit_transform(paths)

    print(f"Feature matrix shape: {X.shape}")

    # Initialize Model
    clf = RandomForestClassifier(
        n_estimators=100, random_state=42, class_weight="balanced"
    )

    # ====== CROSS-VALIDATION (PROPER EVALUATION) ======
    print("\n" + "=" * 70)
    print("CROSS-VALIDATION EVALUATION (5-Fold)")
    print("=" * 70)
    print("Note: This evaluates on held-out data to give honest performance estimates.")
    print()

    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    # Calculate multiple metrics
    cv_accuracy = cross_val_score(clf, X, y, cv=skf, scoring="accuracy")
    cv_precision = cross_val_score(clf, X, y, cv=skf, scoring="precision")
    cv_recall = cross_val_score(clf, X, y, cv=skf, scoring="recall")
    cv_f1 = cross_val_score(clf, X, y, cv=skf, scoring="f1")

    print(f"Cross-Validation Results (mean ± 2*std):")
    print(f"  Accuracy:  {cv_accuracy.mean():.2%} ± {cv_accuracy.std() * 2:.2%}")
    print(f"  Precision: {cv_precision.mean():.2%} ± {cv_precision.std() * 2:.2%}")
    print(f"  Recall:    {cv_recall.mean():.2%} ± {cv_recall.std() * 2:.2%}")
    print(f"  F1-Score:  {cv_f1.mean():.2%} ± {cv_f1.std() * 2:.2%}")
    print()
    print(f"Per-Fold Accuracy: {[f'{score:.2%}' for score in cv_accuracy]}")
    print("=" * 70)

    # Train on full dataset for deployment
    print("\nTraining final model on FULL dataset (for deployment)...")
    print("WARNING: This model will be used in production, but CV scores above")
    print("         represent its expected performance on unseen data.")
    clf.fit(X, y)

    # Save artifacts
    print(f"Saving model to {MODEL_PATH}...")
    with open(MODEL_PATH, "wb") as f:
        pickle.dump(clf, f)

    print(f"Saving vectorizer to {VECTORIZER_PATH}...")
    with open(VECTORIZER_PATH, "wb") as f:
        pickle.dump(extractor, f)

    # Save background data for SHAP
    print("Generating SHAP background data...")
    import shap

    # Use a random sample of 50 instances as background data
    # This avoids the DenseData type issue with kmeans in newer shap versions
    background_data = shap.utils.sample(X, 50)

    BACKGROUND_PATH = "background_data.pkl"
    print(f"Saving background data to {BACKGROUND_PATH}...")
    with open(BACKGROUND_PATH, "wb") as f:
        pickle.dump(background_data, f)

    print("Done!")


if __name__ == "__main__":
    train()
