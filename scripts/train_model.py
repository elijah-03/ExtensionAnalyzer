import os
import sys
import pickle
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
import json

# Add src to path
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(__file__)), "src"))
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

    # ====== SPLIT PATHS FIRST (BEFORE FEATURE EXTRACTION) ======
    print("Splitting data into Training (70%) and Test (30%) sets...")
    paths = np.array(paths)  # Convert to numpy array for indexing
    indices = np.arange(len(paths))

    idx_train, idx_test, y_train, y_test = train_test_split(
        indices, y, test_size=0.30, stratify=y, random_state=42
    )

    train_paths = paths[idx_train].tolist()
    test_paths = paths[idx_test].tolist()

    print(f"Training set: {len(train_paths)} samples")
    print(f"Test set:     {len(test_paths)} samples")

    # Save Test Set IDs for later evaluation
    test_ids = [os.path.basename(p) for p in test_paths]
    test_set_path = os.path.join("data", "test_set_ids.json")
    os.makedirs("data", exist_ok=True)
    print(f"Saving {len(test_ids)} test set IDs to {test_set_path}...")
    with open(test_set_path, "w") as f:
        json.dump(test_ids, f, indent=2)

    # ====== FEATURE EXTRACTION (FIT ONLY ON TRAINING DATA) ======
    print("\nExtracting features...")
    print("  Fitting vectorizer on TRAINING data only (no data leakage)...")
    extractor = FeatureExtractor(max_features=1000)
    extractor.fit(train_paths)  # FIT ONLY ON TRAINING PATHS

    X_train = extractor.transform(train_paths)
    X_test = extractor.transform(test_paths)

    print(f"  Training feature matrix shape: {X_train.shape}")
    print(f"  Test feature matrix shape:     {X_test.shape}")

    # Initialize Model
    clf = RandomForestClassifier(
        n_estimators=100, random_state=42, class_weight="balanced"
    )

    # ====== CROSS-VALIDATION (ON TRAINING SET ONLY) ======
    print("\n" + "=" * 70)
    print("CROSS-VALIDATION EVALUATION (5-Fold on Training Set)")
    print("=" * 70)

    skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

    # Calculate multiple metrics
    cv_accuracy = cross_val_score(clf, X_train, y_train, cv=skf, scoring="accuracy")
    cv_precision = cross_val_score(clf, X_train, y_train, cv=skf, scoring="precision")
    cv_recall = cross_val_score(clf, X_train, y_train, cv=skf, scoring="recall")
    cv_f1 = cross_val_score(clf, X_train, y_train, cv=skf, scoring="f1")

    print("Cross-Validation Results (mean ± 2*std):")
    print(f"  Accuracy:  {cv_accuracy.mean():.2%} ± {cv_accuracy.std() * 2:.2%}")
    print(f"  Precision: {cv_precision.mean():.2%} ± {cv_precision.std() * 2:.2%}")
    print(f"  Recall:    {cv_recall.mean():.2%} ± {cv_recall.std() * 2:.2%}")
    print(f"  F1-Score:  {cv_f1.mean():.2%} ± {cv_f1.std() * 2:.2%}")
    print()
    print(f"Per-Fold Accuracy: {[f'{score:.2%}' for score in cv_accuracy]}")
    print("=" * 70)

    # Train on TRAINING dataset only
    print("\nTraining final model on TRAINING dataset...")
    clf.fit(X_train, y_train)

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
    background_data = shap.utils.sample(X_train, min(50, len(X_train)))

    BACKGROUND_PATH = "background_data.pkl"
    print(f"Saving background data to {BACKGROUND_PATH}...")
    with open(BACKGROUND_PATH, "wb") as f:
        pickle.dump(background_data, f)

    print("Done!")


if __name__ == "__main__":
    train()
