import os
import sys
import tempfile
import zipfile
from flask import Flask, render_template, request, jsonify

# Add src to path to import analyzer
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))
from analyze_extension import analyze_extension

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "uploads"
app.config["MAX_CONTENT_LENGTH"] = 50 * 1024 * 1024  # 50MB max upload

# Ensure upload directory exists
os.makedirs(app.config["UPLOAD_FOLDER"], exist_ok=True)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():
    preset_id = request.form.get("preset_id")
    file = request.files.get("extension_file")

    if preset_id:
        # Define presets mapping
        presets = {
            "benign_adguard": "dataset/benign/bgnkhhnnamicmpeenaelnjfhikgbkllg",
            "benign_wappalyzer": "dataset/benign/gppongmhjkpfnbhagpmjfkannfbllamg",
            "malicious_fake_adblock": "dataset/malicious/lklmhefoneonjalpjcnhaidnodopinib",
            "malicious_shopping": "dataset/malicious/mbacbcfdfaapbcnlnbmciiaakomhkbkb",
        }

        if preset_id in presets:
            base_dir = os.path.dirname(os.path.abspath(__file__))
            target_dir = os.path.join(base_dir, presets[preset_id])

            if not os.path.exists(target_dir):
                return jsonify({"error": f"Preset path not found: {target_dir}"}), 500

            result = analyze_extension(target_dir)
            if result:
                return jsonify(result)
            else:
                return jsonify({"error": "Analysis failed"}), 500
        else:
            return jsonify({"error": "Invalid preset ID"}), 400

    if not file or file.filename == "":
        return jsonify({"error": "No selected file or preset"}), 400

    if file:
        # Create a temporary directory for extraction
        with tempfile.TemporaryDirectory() as temp_dir:
            file_path = os.path.join(temp_dir, "extension.zip")
            file.save(file_path)

            extract_path = os.path.join(temp_dir, "extracted")
            os.makedirs(extract_path, exist_ok=True)

            try:
                with zipfile.ZipFile(file_path, "r") as zip_ref:
                    zip_ref.extractall(extract_path)

                # Analyze the extracted extension
                # We need to find the directory containing manifest.json
                # Sometimes zip files have a top-level folder
                target_dir = extract_path
                if "manifest.json" not in os.listdir(extract_path):
                    # Check subdirectories
                    for item in os.listdir(extract_path):
                        item_path = os.path.join(extract_path, item)
                        if os.path.isdir(item_path) and "manifest.json" in os.listdir(
                            item_path
                        ):
                            target_dir = item_path
                            break

                if "manifest.json" not in os.listdir(target_dir):
                    return jsonify(
                        {"error": "Invalid extension: manifest.json not found"}
                    ), 400

                # Run analysis
                # Capture stdout/stderr to avoid cluttering server logs if needed,
                # but analyze_extension returns a dict now, so we are good.
                result = analyze_extension(target_dir)

                if result:
                    return jsonify(result)
                else:
                    return jsonify({"error": "Analysis failed"}), 500

            except zipfile.BadZipFile:
                return jsonify({"error": "Invalid zip file"}), 400
            except Exception as e:
                return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True, port=5001)
