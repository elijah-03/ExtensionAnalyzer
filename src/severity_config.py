"""
Centralized severity configuration for consistent color mapping and severity handling.
Single source of truth for all severity-related configuration.
"""

# Severity configuration with colors, backgrounds, and weights
SEVERITY_CONFIG = {
    "Critical": {
        "color": "#dc2626",  # Red-600
        "bg": "#fef2f2",  # Red-50
        "borderColor": "#fecaca",  # Red-200
        "weight": 1,  # Highest priority
        "threshold_range": (200, float("inf")),
    },
    "High": {
        "color": "#ea580c",  # Orange-600
        "bg": "#fff7ed",  # Orange-50
        "borderColor": "#fed7aa",  # Orange-200
        "weight": 2,
        "threshold_range": (100, 200),
    },
    "Medium": {
        "color": "#ca8a04",  # Yellow-600
        "bg": "#fefce8",  # Yellow-50
        "borderColor": "#fef08a",  # Yellow-200
        "weight": 3,
        "threshold_range": (50, 100),
    },
    "Low": {
        "color": "#65a30d",  # Green-600
        "bg": "#f7fee7",  # Green-50
        "borderColor": "#d9f99d",  # Green-200
        "weight": 4,
        "threshold_range": (0, 50),
    },
}

# Ordered list of severities (highest to lowest)
SEVERITY_ORDER = ["Critical", "High", "Medium", "Low"]


def get_severity_config(severity):
    """Get configuration for a specific severity level."""
    return SEVERITY_CONFIG.get(severity, SEVERITY_CONFIG["Medium"])


def get_severity_by_score(score):
    """Determine severity level based on threat score."""
    for severity in SEVERITY_ORDER:
        min_score, max_score = SEVERITY_CONFIG[severity]["threshold_range"]
        if min_score <= score < max_score:
            return severity
    return "Low"  # Default fallback
