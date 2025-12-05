import os
import json
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd


class FeatureExtractor:
    def __init__(self, max_features=1000):
        self.max_features = max_features
        # Custom stop words for code analysis
        custom_stop_words = [
            "var",
            "let",
            "const",
            "function",
            "return",
            "this",
            "true",
            "false",
            "null",
            "undefined",
            "if",
            "else",
            "for",
            "while",
            "do",
            "switch",
            "case",
            "break",
            "continue",
            "try",
            "catch",
            "finally",
            "throw",
            "new",
            "typeof",
            "instanceof",
            "void",
            "delete",
            "in",
            "of",
            "class",
            "extends",
            "super",
            "import",
            "export",
            "default",
            "from",
            "as",
            "width",
            "height",
            "style",
            "color",
            "background",
            "border",
            "margin",
            "padding",
            "font",
            "text",
            "align",
            "center",
            "left",
            "right",
            "top",
            "bottom",
            "position",
            "absolute",
            "relative",
            "display",
            "block",
            "inline",
            "flex",
            "grid",
            "svg",
            "path",
            "viewbox",
            "xmlns",
            "version",
            "href",
            "src",
            "div",
            "span",
            "img",
            "input",
            "button",
            "form",
            "body",
            "html",
            "head",
            "meta",
            "link",
            "script",
            "title",
            "id",
            "class",
            "name",
            "value",
            "type",
            "data",
            "aria",
            "role",
            "tabindex",
            "target",
            "rel",
            "http",
            "https",
            "www",
            "com",
            "org",
            "net",
            "io",
            "js",
            "json",
            "css",
            "10",
            "100",
            "0px",
            "1px",
            "2px",
            "20",
            "24",
            "25",
            "50",
        ]

        from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS

        stop_words = list(ENGLISH_STOP_WORDS) + custom_stop_words

        self.vectorizer = TfidfVectorizer(
            max_features=self.max_features,
            stop_words=stop_words,
            token_pattern=r"(?u)\b\w\w+\b",  # Default
        )
        self.permission_list = [
            "scripting",
            "tabs",
            "webRequest",
            "webRequestBlocking",
            "cookies",
            "debugger",
            "management",
            "proxy",
            "privacy",
            "downloads",
            "nativeMessaging",
            "storage",
            "unlimitedStorage",
            "notifications",
            "contextMenus",
            "alarms",
            "background",
        ]
        self.is_fitted = False

    def _get_manifest_features(self, path):
        """Extracts boolean features from manifest.json."""
        features = {f"perm_{p}": 0 for p in self.permission_list}
        features["has_all_urls"] = 0
        features["unsafe_eval"] = 0

        manifest_path = os.path.join(path, "manifest.json")
        try:
            with open(manifest_path, "r", encoding="utf-8") as f:
                data = json.load(f)

            perms = set(data.get("permissions", []))
            for p in self.permission_list:
                if p in perms:
                    features[f"perm_{p}"] = 1

            host_perms = set(data.get("host_permissions", []))
            if (
                "<all_urls>" in host_perms
                or "http://*/*" in host_perms
                or "https://*/*" in host_perms
            ):
                features["has_all_urls"] = 1

            csp = data.get("content_security_policy", "")
            if isinstance(csp, dict):
                csp = csp.get("extension_pages", "")
            if "unsafe-eval" in str(csp):
                features["unsafe_eval"] = 1

        except Exception:
            pass  # Fail silently, features remain 0

        return features

    def _get_code_text(self, path):
        """Aggregates all JS code into a single string."""
        code_text = []
        for root, _, files in os.walk(path):
            for file in files:
                if file.endswith(".js"):
                    try:
                        with open(
                            os.path.join(root, file),
                            "r",
                            encoding="utf-8",
                            errors="ignore",
                        ) as f:
                            code_text.append(f.read())
                    except Exception:
                        pass
        return " ".join(code_text)

    def fit(self, extension_paths):
        """Fits the TF-IDF vectorizer on a list of extension paths."""
        corpus = [self._get_code_text(path) for path in extension_paths]
        self.vectorizer.fit(corpus)
        self.is_fitted = True

    def transform(self, extension_paths):
        """Transforms extensions into a feature matrix."""
        if not self.is_fitted:
            raise RuntimeError("FeatureExtractor must be fitted before transform.")

        # 1. Manifest Features
        manifest_data = [self._get_manifest_features(path) for path in extension_paths]
        df_manifest = pd.DataFrame(manifest_data)

        # 2. Code Features (TF-IDF)
        corpus = [self._get_code_text(path) for path in extension_paths]
        tfidf_matrix = self.vectorizer.transform(corpus)
        df_tfidf = pd.DataFrame(
            tfidf_matrix.toarray(), columns=self.vectorizer.get_feature_names_out()
        )

        # Combine
        return pd.concat([df_manifest, df_tfidf], axis=1)

    def fit_transform(self, extension_paths):
        self.fit(extension_paths)
        return self.transform(extension_paths)
