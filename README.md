# Chrome Extension Security Analyzer

## Overview

An advanced security analysis tool for Chrome browser extensions that combines **rule-based static analysis** with **interpretable machine learning** to detect malicious behavior. Unlike traditional approaches that rely solely on heuristic rules (high false positives) or black-box ML models (unexplainable), this tool provides both **accurate threat detection** AND **human-understandable explanations**.

## Novel Contributions

### 1. Hybrid Interpretable ML System
This project introduces a **novel hybrid interpretable approach** that bridges the gap between accuracy and transparency:

- **Dual-Layer Analysis**: Combines rule-based static analysis (for transparency) with ML classification (for accuracy)
- **SHAP-Based Explainability**: Uses SHAP values to explain predictions, aggregated into semantic risk categories
- **Category-Level Insights**: Groups features into human-understandable categories:
  - **Permissions Risk**: Dangerous permissions (scripting, webRequest, cookies, etc.)
  - **Security Issues**: Unsafe CSP, broad host permissions
  - **Behavioral Patterns**: Dynamic code execution (eval), network requests
  - **Code Patterns**: Suspicious keywords, obfuscation indicators
- **Natural Language Generation**: Automatically synthesizes explanations into readable paragraphs

**Key Innovation**: Unlike pure ML systems (black box) or pure rule-based systems (high false positives), our hybrid approach maintains interpretability while improving accuracy by aggregating SHAP values into domain-specific categories that security practitioners can understand and act upon.

### 2. Curated Security Dataset
- **142 labeled Chrome extensions** (balanced malicious/benign split)
- Systematically collected from [Chrome-Stats API](https://chrome-stats.com)
- Ground-truth labels based on Chrome Web Store removal flags (malware) and trusted publisher status

## Features

### Web Interface
- **Drag-and-drop upload** for extension analysis
- **Preset examples** for quick demonstration
- **Dual scoring**: Heuristic threat score + ML probability
- **Interactive explanations**: Click on risk factors for detailed descriptions
- **Visual risk breakdown**: Collapsible categories with severity indicators

### Technical Analysis
- **Static Code Analysis**: AST-based JavaScript parsing for suspicious patterns
- **Manifest Inspection**: Permission analysis, CSP validation
- **ML Classification**: Random Forest with TF-IDF on code + manifest features
- **Explainability**: SHAP-based feature importance with category aggregation

## Performance

**Evaluation Results** (5-Fold Cross-Validation + 70/30 Train/Test Split on **142-extension dataset**)

### Cross-Validation (5-Fold, Stratified)
| Metric | Mean | Confidence Interval (±2σ) |
|--------|------|---------------------------|
| **Accuracy** | 82.36% | ±12.57% |
| **Precision** | 82.24% | ±13.10% |
| **Recall** | 83.33% | ±13.68% |
| **F1-Score** | 82.70% | ±12.43% |

### Hold-Out Test Set (30% of data, n=43)
| Metric | Score |
|--------|-------|
| **Accuracy** | 76.74% |
| **Precision** | 75.00% |
| **Recall** | 81.82% |
| **F1-Score** | 78.26% |
| **False Positive Rate** | 28.57% |

### Comparison with Rule-Based System
| Metric | Rule-Based | ML (Test) | Improvement |
|--------|------------|-----------|-------------|
| **Accuracy** | 57.43% | **76.74%** | +19.3 pp |
| **Precision** | 56.52% | **75.00%** | +18.5 pp |
| **Recall** | 75.00% | **81.82%** | +6.8 pp |
| **False Positive Rate** | 61.22% | **28.57%** | -32.7 pp |

**Key Findings**: 
- Machine Learning achieves **76-82% accuracy** on unseen data
- Reduces false positive rate by **32.7 percentage points** (61.2% → 28.6%)
- Properly validated with cross-validation and hold-out test set
- Model generalizes well across different extension samples

## Installation

### Prerequisites
- Python 3.8+
- pip

### Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ExtensionAnalyzer
   ```

2. Create a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Usage

### 1. Running the Web Interface
Start the Flask application:
```bash
./venv/bin/python app.py
```
Open your browser and navigate to `http://127.0.0.1:5001`.

### 2. Training the Model (Optional)
If you want to retrain the ML model on the dataset:
```bash
./venv/bin/python scripts/train_model.py
```

### 3. Running Evaluation
To evaluate performance and generate metrics:
```bash
# Step 1: Run comparison analysis
./venv/bin/python scripts/compare_results.py

# Step 2: Calculate metrics
./venv/bin/python scripts/evaluate_model.py

# Step 3: Generate visualizations
./venv/bin/python scripts/visualize_results.py
```

## Project Structure

```
ExtensionAnalyzer/
├── app.py                          # Flask web application
├── requirements.txt                # Python dependencies
│
├── src/                            # Core analysis modules
│   ├── __init__.py                 # Package init
│   ├── analyze_extension.py        # Main analysis orchestrator
│   ├── code_analyzer.py            # AST-based JavaScript analysis
│   ├── feature_extraction.py       # ML feature extraction (TF-IDF)
│   ├── manifest_analyzer.py        # Manifest.json parsing
│   ├── ml_utils.py                 # ML utility functions
│   ├── risk_descriptions.py        # Human-readable risk explanations
│   ├── severity_config.py          # Risk severity configurations
│   ├── shap_explainer.py           # SHAP value computation
│   ├── evaluate_results.py         # Evaluation utilities
│   └── run_evaluation.py           # Batch evaluation runner
│
├── scripts/                        # Utility and training scripts
│   ├── train_model.py              # Train Random Forest classifier
│   ├── compare_results.py          # Rule vs ML comparison
│   ├── evaluate_model.py           # Performance metrics
│   ├── evaluate_rules.py           # Rule-based system evaluation
│   ├── evaluate_train_test.py      # Train/test split evaluation
│   ├── visualize_results.py        # Generate plots and figures
│   ├── gather_dataset.py           # Dataset collection from API
│   ├── list_dataset_extensions.py  # List extensions in dataset
│   └── resolve_extension_names.py  # Resolve extension names
│
├── dataset/                        # Extension dataset
│   ├── benign/                     # Benign extension samples
│   └── malicious/                  # Malicious extension samples
│
├── models/                         # Trained model artifacts
│   ├── model.pkl                   # Random Forest classifier
│   ├── vectorizer.pkl              # TF-IDF vectorizer
│   └── background_data.pkl         # SHAP background data
│
├── data/                           # Analysis results and metrics
│   ├── comparison_results.csv      # Rule vs ML comparison
│   ├── evaluation_metrics.json     # Performance metrics
│   └── results.csv                 # Full analysis results
│
├── static/                         # Frontend assets
│   ├── script.js                   # Interactive UI logic
│   └── style.css                   # Styling
│
├── templates/                      # HTML templates
│   └── index.html                  # Main web interface
│
├── tests/                          # Test suite
│   ├── test_confidence.py          # Confidence scoring tests
│   ├── test_feature_extraction.py  # Feature extraction tests
│   ├── test_phase2.py              # Integration tests
│   └── test_rules.py               # Rule-based system tests
│
├── paper/                          # Research paper and documentation
├── references/                     # Academic references
└── logs/                           # Application logs
```

## How It Works

1. **Upload**: User uploads a Chrome extension (.zip) or selects a preset
2. **Feature Extraction**: System extracts permissions, code patterns, and TF-IDF features
3. **Dual Analysis**:
   - **Rule-Based**: Calculates threat score based on suspicious patterns
   - **ML-Based**: Random Forest predicts malicious probability
4. **Explainability**: SHAP values identify top contributing features
5. **Category Aggregation**: Features grouped into risk categories
6. **Natural Language**: Generates readable explanation
7. **Display**: Interactive dashboard shows scores, risk factors, and detailed findings

## Technical Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Flask Web Application                        │
│                         (app.py)                                 │
└────────────────────────────┬────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                   Analysis Orchestrator                          │
│                 (src/analyze_extension.py)                       │
└──────────┬───────────────────┬──────────────────┬───────────────┘
           │                   │                  │
           ▼                   ▼                  ▼
┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
│ Manifest Analyzer│ │  Code Analyzer   │ │ Feature Extractor│
│ (manifest_       │ │ (code_analyzer.  │ │ (feature_        │
│  analyzer.py)    │ │  py)             │ │  extraction.py)  │
└────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
         │                    │                    │
         │   Permission &     │  AST Parsing &     │   TF-IDF
         │   CSP Analysis     │  Pattern Detection │   Vectorization
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                              ▼
         ┌────────────────────┴────────────────────┐
         │                                         │
         ▼                                         ▼
┌──────────────────┐                    ┌─────────────────────┐
│  Rule-Based      │                    │  ML Classification  │
│  Threat Scoring  │                    │  (Random Forest)    │
│                  │                    │  + SHAP Explanations│
└────────┬─────────┘                    └──────────┬──────────┘
         │                                         │
         └────────────────────┬────────────────────┘
                              │
                              ▼
                 ┌────────────────────────┐
                 │  Risk Report Generator │
                 │  (Natural Language     │
                 │   Explanations)        │
                 └────────────────────────┘
```


## Running Tests

```bash
# Run all tests
./venv/bin/python -m pytest tests/

# Run specific test file
./venv/bin/python -m pytest tests/test_rules.py -v
```

