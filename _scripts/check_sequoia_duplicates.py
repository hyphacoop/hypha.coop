#!/usr/bin/env python3

import json
import sys
import urllib.error
import urllib.parse
import urllib.request
from collections import defaultdict
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parent.parent
SEQUOIA_CONFIG = REPO_ROOT / "sequoia.json"


def load_json(path: Path):
    with path.open() as f:
        return json.load(f)


def fetch_json(url: str):
    with urllib.request.urlopen(url) as response:
        return json.load(response)


def parse_at_uri(uri: str):
    if not uri.startswith("at://"):
        raise ValueError(f"Invalid AT URI: {uri}")
    parts = uri[5:].split("/")
    if len(parts) != 3:
        raise ValueError(f"Invalid AT URI: {uri}")
    return parts[0], parts[1], parts[2]


def resolve_post_path(post_file: Path, path_prefix: str):
    name = post_file.stem
    if len(name) > 11 and name[4] == "-" and name[7] == "-":
        slug = name[11:]
    else:
        slug = name
    path_prefix = path_prefix.rstrip("/")
    return f"{path_prefix}/{slug}" if path_prefix else f"/{slug}"


def list_documents(pds_url: str, did: str):
    records = []
    cursor = None
    while True:
        params = {
            "repo": did,
            "collection": "site.standard.document",
            "limit": 100,
        }
        if cursor:
            params["cursor"] = cursor
        url = f"{pds_url}/xrpc/com.atproto.repo.listRecords?{urllib.parse.urlencode(params)}"
        payload = fetch_json(url)
        records.extend(payload.get("records", []))
        cursor = payload.get("cursor")
        if not cursor:
            break
    return records


def main():
    config = load_json(SEQUOIA_CONFIG)
    did, _, _ = parse_at_uri(config["publicationUri"])
    did_doc = fetch_json(f"https://plc.directory/{did}")
    services = did_doc.get("service", [])
    pds_url = None
    for service in services:
        if service.get("type") == "AtprotoPersonalDataServer":
            pds_url = service.get("serviceEndpoint")
            break
    if not pds_url:
        print("Could not determine PDS endpoint from DID document.", file=sys.stderr)
        return 2

    records = list_documents(pds_url.rstrip("/"), did)
    publication_uri = config["publicationUri"]

    local_paths = {}
    content_dir = REPO_ROOT / config["contentDir"]
    for post_file in sorted(content_dir.glob("*.md")):
        local_paths[resolve_post_path(post_file, config.get("pathPrefix", ""))] = post_file

    duplicates = defaultdict(list)
    for record in records:
        value = record.get("value", {})
        if value.get("$type") != "site.standard.document":
            continue
        if value.get("site") != publication_uri:
            continue
        path = value.get("path")
        if path in local_paths:
            duplicates[path].append(record)

    duplicate_paths = {path: items for path, items in duplicates.items() if len(items) > 1}
    if not duplicate_paths:
        print("No duplicate Sequoia document paths found.")
        return 0

    print("Duplicate Sequoia document paths found:", file=sys.stderr)
    for path, items in sorted(duplicate_paths.items()):
        print(f"- {path} ({len(items)} records)", file=sys.stderr)
        print(f"  local file: {local_paths[path]}", file=sys.stderr)
        for item in items:
            uri = item.get("uri", "<missing-uri>")
            value = item.get("value", {})
            has_text = "textContent" in value
            print(f"  - {uri} textContent={str(has_text).lower()}", file=sys.stderr)
    return 1


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except urllib.error.URLError as exc:
        print(f"Failed to query ATProto data: {exc}", file=sys.stderr)
        raise SystemExit(2)
