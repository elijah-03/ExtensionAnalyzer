import os
import requests
import zipfile
import io
import time
import argparse

API_BASE_URL = "https://chrome-stats.com"


def advanced_search(api_key, query_name, conditions, limit=40):
    """
    Performs an advanced search to find extensions matching criteria.
    Handles pagination to reach the desired limit.
    """
    url = f"{API_BASE_URL}/api/chrome/advanced-search"
    headers = {"x-api-key": api_key, "content-type": "application/json"}

    all_items = []
    page = 1

    while len(all_items) < limit:
        payload = {
            "sorting": "userCount",
            "sortDirection": "desc",
            "index": "extension",
            "fields": {"operator": "AND", "conditions": conditions},
            "page": page,
        }

        print(f"Searching for '{query_name}' extensions (Page {page})...")
        try:
            response = requests.post(url, headers=headers, json=payload)

            if response.status_code == 429:
                print("Error: Rate limit exceeded while searching.")
                break
            if response.status_code != 200:
                print(f"Error searching: {response.status_code} - {response.text}")
                break

            data = response.json()
            items = data.get("items", [])

            if not items:
                print("No more items found.")
                break

            # Filter out items that don't have an ID or version
            valid_items = [
                item for item in items if item.get("id") and item.get("version")
            ]

            print(f"Found {len(valid_items)} valid extensions on page {page}.")
            all_items.extend(valid_items)

            page += 1

        except Exception as e:
            print(f"Exception while searching: {e}")
            break

    return all_items[:limit]


def download_extension(api_key, ext_id, version, output_dir):
    """
    Downloads an extension zip and extracts it.
    """
    url = f"{API_BASE_URL}/api/download"
    headers = {"x-api-key": api_key}
    params = {"id": ext_id, "version": version, "type": "ZIP"}

    print(f"Downloading {ext_id} (v{version})....")
    try:
        response = requests.get(url, headers=headers, params=params)

        if response.status_code == 429:
            print("Error: Rate limit exceeded while downloading.")
            return False
        if response.status_code != 200:
            print(
                f"Error downloading {ext_id}: {response.status_code} - {response.text}"
            )
            return False

        # Create directory for this extension
        ext_dir = os.path.join(output_dir, ext_id)
        if os.path.exists(ext_dir):
            print(f"Skipping {ext_id}, already exists.")
            return True

        os.makedirs(ext_dir, exist_ok=True)

        # Extract zip
        with zipfile.ZipFile(io.BytesIO(response.content)) as z:
            z.extractall(ext_dir)

        return True

    except Exception as e:
        print(f"Exception while downloading {ext_id}: {e}")
        return False


def main():
    parser = argparse.ArgumentParser(
        description="Gather balanced dataset from Chrome-Stats API"
    )
    parser.add_argument("--api-key", help="Chrome-Stats API Key", required=True)
    parser.add_argument(
        "--count", type=int, default=40, help="Number of extensions per category"
    )

    args = parser.parse_args()

    # Define the two categories
    categories = [
        {
            "name": "malicious",
            "output_dir": "dataset/malicious",
            "conditions": [
                {"column": "obsolete", "operator": "Exists", "value": ""},
                {"column": "obsoleteReason", "operator": "=", "value": "malware"},
            ],
        },
        {
            "name": "benign",
            "output_dir": "dataset/benign",
            "conditions": [
                {"column": "obsolete", "operator": "Not exists", "value": ""},
                {"column": "isTrustedPublisher", "operator": "Exists", "value": ""},
            ],
        },
    ]

    total_requests_est = 2 + (args.count * 2)  # 2 searches + downloads
    print(f"Estimated API requests: {total_requests_est}")
    if total_requests_est > 100:
        print("Warning: This might exceed the 100 request quota.")
        if input("Continue? (y/n): ").lower() != "y":
            return

    for cat in categories:
        print(f"\n--- Processing {cat['name']} extensions ---")
        os.makedirs(cat["output_dir"], exist_ok=True)

        # 1. Search
        items = advanced_search(
            args.api_key, cat["name"], cat["conditions"], args.count
        )

        if not items:
            print(f"No items found for {cat['name']}.")
            continue

        # 2. Download
        success_count = 0
        for i, item in enumerate(items):
            print(f"[{i + 1}/{len(items)}] Downloading {item['name']}...")
            if download_extension(
                args.api_key, item["id"], item["version"], cat["output_dir"]
            ):
                success_count += 1
            time.sleep(1)  # Be nice

        print(f"Completed {cat['name']}: {success_count}/{len(items)} downloaded.")


if __name__ == "__main__":
    main()
