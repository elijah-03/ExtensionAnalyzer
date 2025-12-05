import os
import sys
import pickle

"""
SHAP Explainer Module for Chrome Extension Security Analyzer.

Extracted from analyze_extension.py for better modularity and testability.
Handles SHAP-based model explainability including:
- Model loading and SHAP explainer initialization
- Feature importance extraction
- Category aggregation for risk factor analysis
"""

# Global model/vectorizer/explainer (loaded lazily)
ML_MODEL = None
ML_VECTORIZER = None
SHAP_EXPLAINER = None

# Paths to model files (updated for models/ directory)
MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "models", "model.pkl")
VECTORIZER_PATH = os.path.join(
    os.path.dirname(__file__), "..", "models", "vectorizer.pkl"
)
BACKGROUND_PATH = os.path.join(
    os.path.dirname(__file__), "..", "models", "background_data.pkl"
)


def load_model_and_explainer():
    """
    Loads the ML model, vectorizer, and initializes SHAP explainer.
    Called once at module import time.

    Returns:
        tuple: (model, vectorizer, shap_explainer) or (None, None, None) on failure
    """
    global ML_MODEL, ML_VECTORIZER, SHAP_EXPLAINER

    try:
        with open(MODEL_PATH, "rb") as f:
            ML_MODEL = pickle.load(f)
        with open(VECTORIZER_PATH, "rb") as f:
            ML_VECTORIZER = pickle.load(f)

        # Initialize SHAP Explainer
        try:
            import shap

            with open(BACKGROUND_PATH, "rb") as f:
                background_data = pickle.load(f)
            SHAP_EXPLAINER = shap.TreeExplainer(ML_MODEL, data=background_data)
            print("SHAP Explainer initialized successfully.", file=sys.stderr)
        except Exception as e:
            print(f"Warning: Could not initialize SHAP explainer: {e}", file=sys.stderr)
            SHAP_EXPLAINER = None

    except Exception as e:
        print(f"Error loading model/vectorizer: {e}", file=sys.stderr)
        ML_MODEL = None
        ML_VECTORIZER = None
        SHAP_EXPLAINER = None

    return ML_MODEL, ML_VECTORIZER, SHAP_EXPLAINER


def get_shap_values(features):
    """
    Calculates SHAP values for the given features.

    Args:
        features: Feature matrix/array for prediction

    Returns:
        numpy array of SHAP values or None if explainer not available
    """
    if SHAP_EXPLAINER is None:
        return None

    try:
        shap_values = SHAP_EXPLAINER.shap_values(features, check_additivity=False)
        # For binary classification, get values for positive class (malicious)
        if isinstance(shap_values, list) and len(shap_values) == 2:
            return shap_values[1]
        return shap_values
    except Exception as e:
        print(f"Error calculating SHAP values: {e}", file=sys.stderr)
        return None


def get_feature_importance_simple(features, feature_names):
    """
    Fallback method to get feature importance when SHAP is unavailable.
    Uses simple feature value * model importance weighting.

    Args:
        features: Feature array
        feature_names: List of feature names

    Returns:
        List of (feature_name, importance) tuples sorted by importance
    """
    if ML_MODEL is None:
        return []

    try:
        # Get model's feature importances
        importances = ML_MODEL.feature_importances_

        # Weight by feature values
        weighted = features.flatten() * importances

        # Create sorted list
        importance_list = [
            (feature_names[i], float(weighted[i]))
            for i in range(len(feature_names))
            if abs(weighted[i]) > 0.001  # Filter very small values
        ]

        return sorted(importance_list, key=lambda x: abs(x[1]), reverse=True)
    except Exception as e:
        print(f"Error calculating feature importance: {e}", file=sys.stderr)
        return []


# Category mappings for feature aggregation
FEATURE_CATEGORIES = {
    "Permissions": ["perm_", "has_all_urls"],
    "Security": ["unsafe_eval", "csp"],
    "Network": ["fetch", "xmlhttprequest", "websocket", "ajax"],
    "Code Execution": ["eval", "function", "setTimeout", "setInterval"],
    "Data Access": ["storage", "cookie", "localStorage", "sessionStorage"],
    "DOM Manipulation": ["document", "innerHTML", "outerHTML", "textContent"],
}


def categorize_feature(feature_name):
    """
    Maps a feature name to its category.

    Args:
        feature_name: Raw feature name

    Returns:
        str: Category name
    """
    feature_lower = feature_name.lower()

    for category, patterns in FEATURE_CATEGORIES.items():
        for pattern in patterns:
            if pattern.lower() in feature_lower:
                return category

    return "Other"


def aggregate_shap_by_category(feature_names, shap_values):
    """
    Aggregates SHAP values by category for cleaner explanations.

    Args:
        feature_names: List of feature names
        shap_values: Corresponding SHAP values

    Returns:
        dict: {category: total_shap_value}
    """
    category_totals = {}

    for i, name in enumerate(feature_names):
        category = categorize_feature(name)
        if category not in category_totals:
            category_totals[category] = 0.0
        category_totals[category] += float(shap_values[i])

    return category_totals


# Initialize on import
load_model_and_explainer()
