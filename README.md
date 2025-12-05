# Chrome Extension Security Analyzer

## Overview

An advanced security analysis tool for Chrome browser extensions that combines rule-based static analysis with interpretable machine learning to detect malicious behavior. Unlike traditional approaches that rely solely on heuristic rules (high false positives) or black-box ML models (unexplainable), this tool provides both accurate threat detection and human-understandable explanations.

## Novel Contributions

### 1. Hybrid Interpretable ML System
This project introduces a novel hybrid interpretable approach that bridges the gap between accuracy and transparency:

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

### Hold-Out Test Set (30% of data, n=42)
| Metric | Score |
|--------|-------|
| **Accuracy** | 78.57% |
| **Precision** | 78.26% |
| **Recall** | 81.82% |
| **F1-Score** | 80.00% |
| **False Positive Rate** | 25.00% |

### Comparison with Rule-Based System
| Metric | Rule-Based | ML (Test) | Improvement |
|--------|------------|-----------|-------------|
| **Accuracy** | 54.76% | **78.57%** | +23.8 pp |
| **Precision** | 54.05% | **78.26%** | +24.2 pp |
| **Recall** | 90.91% | **81.82%** | -9.1 pp |
| **False Positive Rate** | 85.00% | **25.00%** | -60.0 pp |

**Key Findings**: 
- Machine Learning achieves **78.57% accuracy** on unseen data
- Reduces false positive rate by **60 percentage points** (85% → 25%)
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

## Feature Extraction

The `FeatureExtractor` class ([src/feature_extraction.py](file:///home/elijah/Documents/CPS475/ExtensionAnalyzer/src/feature_extraction.py)) implements a hybrid feature extraction system that combines explicit permission analysis with statistical code analysis to convert raw Chrome extension files into numerical vectors compatible with machine learning models.

### Two-Layer Feature Design

#### 1. Manifest Features (Static Analysis)
Extracts binary features from `manifest.json` to capture high-risk capabilities:

- **API Permissions** (17 tracked permissions):
  - `scripting`, `tabs`, `webRequest`, `webRequestBlocking`, `cookies`
  - `debugger`, `management`, `proxy`, `privacy`, `downloads`
  - `nativeMessaging`, `storage`, `unlimitedStorage`, `notifications`
  - `contextMenus`, `alarms`, `background`
  - Each permission becomes a binary feature: `perm_<name>: 0|1`

- **Host Permissions**:
  - `has_all_urls`: Flags extensions requesting access to all websites
  - Triggers on: `<all_urls>`, `http://*/*`, `https://*/*`

- **Content Security Policy (CSP)**:
  - `unsafe_eval`: Detects permissive CSP allowing `eval()` execution
  - Critical security indicator for dynamic code execution

**Output**: ~19 binary features (0 or 1)

#### 2. Code Features (Text Analysis)
Applies TF-IDF vectorization to JavaScript code to capture behavioral patterns:

**Process:**
1. **Code Aggregation**: Walks through all `.js` files and concatenates code into a single string
2. **Stop Word Filtering**: Removes 114 custom stop words including:
   - JavaScript keywords (`var`, `let`, `const`, `function`, `return`, `if`, `else`, etc.)
   - HTML tags (`div`, `span`, `img`, `button`, `script`, etc.)
   - CSS properties (`width`, `height`, `color`, `margin`, `padding`, etc.)
   - Common web terms (`http`, `https`, `www`, `com`, `json`, etc.)
3. **TF-IDF Transformation**:
   - **Term Frequency (TF)**: How often a word appears in *this* extension
   - **Inverse Document Frequency (IDF)**: How rare the word is across *all* extensions
   - Rare words that appear frequently in a specific extension receive high scores
4. **Dimensionality**: Keeps top 1000 features (configurable via `max_features`)

**Why This Works**: By filtering out common syntax, the model focuses on *unique identifiers*-specific variable names, unusual API calls, obfuscated strings, or domain-specific patterns that distinguish malicious from benign extensions.

**Output**: 1000 continuous features (TF-IDF scores)

### Complete Pipeline

The `FeatureExtractor` follows the Scikit-Learn API pattern:

```python
from src.feature_extraction import FeatureExtractor

# Initialize
extractor = FeatureExtractor(max_features=1000)

# Training phase: Learn vocabulary from training extensions
extractor.fit(train_extension_paths)

# Transform phase: Convert extensions to feature vectors
train_features = extractor.transform(train_extension_paths)
test_features = extractor.transform(test_extension_paths)

# Or combined
features = extractor.fit_transform(extension_paths)
```

**Output Format**: Each extension becomes a single row with ~1019 columns:
- Columns 1-19: Binary manifest features (permissions, CSP, host permissions)
- Columns 20-1019: TF-IDF scores for the 1000 most significant code tokens

### Example Feature Vector

For a hypothetical malicious extension:
```
perm_cookies: 1
perm_webRequest: 1
perm_tabs: 1
has_all_urls: 1
unsafe_eval: 1
tfidf_tracker: 0.87
tfidf_analytics: 0.65
tfidf_sendData: 0.92
tfidf_obfuscated_var_x23: 0.71
...
```

This combination allows the ML model to learn correlations like: *"Extensions requesting `cookies` + `webRequest` AND containing unusual tracking-related terms are likely malicious."*

### Key Design Decisions

1. **Custom Stop Words**: Filtering (114 terms) ensures the model focuses on semantically meaningful code, not syntax
2. **Hybrid Approach**: Combines explicit rules (permissions) with learned patterns (code analysis)
3. **TF-IDF over Bag-of-Words**: Emphasizes distinctive terms rather than just frequency
4. **High Dimensionality**: 1000 code features capture nuanced behavioral patterns
5. **Graceful Failures**: Missing files or malformed JSON fail silently (features default to 0)


## Running Tests

```bash
# Run all tests
./venv/bin/python -m pytest tests/

# Run specific test file
./venv/bin/python -m pytest tests/test_rules.py -v
```

