#!/usr/bin/env python3
"""
Horizon Extension Packager
--------------------------
Packages the Horizon extension into a production-ready ZIP archive for
Chrome Web Store publication, GitHub Releases, and local distribution.

Usage:
    python package.py
"""

import os
import sys
import json
import zipfile
import fnmatch
from pathlib import Path

# Paths relative to project root
ROOT_DIR = Path(__file__).resolve().parent.parent
EXTENSION_DIR = ROOT_DIR / "extension"
MANIFEST_PATH = EXTENSION_DIR / "manifest.json"
RELEASES_DIR = ROOT_DIR / "releases"

# Patterns / filenames to strictly ignore
IGNORE_PATTERNS = [
    ".git",
    ".github",
    "releases",
    "artifacts",
    "docs",
    "screenshots",
    "__pycache__",
    ".DS_Store",
    "Thumbs.db",
    "desktop.ini",
    "*.zip",
    "*_old.*",
]


def load_version():
    """Reads extension version and name from manifest.json."""
    if not MANIFEST_PATH.exists():
        print(f"[ERROR] manifest.json not found at {MANIFEST_PATH}")
        sys.exit(1)

    with open(MANIFEST_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)

    version = data.get("version", "1.0.0")
    name = data.get("name", "Horizon")
    return version, name



def should_ignore(path: Path) -> bool:
    """Checks if a file or directory matches ignore rules."""
    name = path.name
    for pattern in IGNORE_PATTERNS:
        if fnmatch.fnmatch(name, pattern):
            return True
    return False


def build_package():
    """Creates the release zip package from the extension directory."""
    if not EXTENSION_DIR.exists():
        print(f"[ERROR] Extension directory not found at {EXTENSION_DIR}")
        sys.exit(1)

    version, name = load_version()
    RELEASES_DIR.mkdir(parents=True, exist_ok=True)

    zip_filename = f"Horizon-v{version}.zip"
    zip_path = RELEASES_DIR / zip_filename

    print(f"Packaging {name} v{version}...")
    print(f"  Source:      {EXTENSION_DIR}")
    print(f"  Destination: {zip_path}\n")

    if zip_path.exists():
        zip_path.unlink()

    files_added = []

    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for root, _, files in os.walk(EXTENSION_DIR):
            for file in files:
                full_path = Path(root) / file
                if not should_ignore(full_path):
                    rel_path = full_path.relative_to(EXTENSION_DIR)
                    arc_name = str(rel_path).replace("\\", "/")
                    zf.write(full_path, arcname=arc_name)
                    files_added.append(arc_name)

    size_bytes = zip_path.stat().st_size
    size_kb = size_bytes / 1024

    print("Build complete!")
    print(f"  Total entries: {len(files_added)}")
    print(f"  Archive size:  {size_kb:.2f} KB ({size_bytes:,} bytes)")
    print(f"  Archive path:  {zip_path}\n")

    return zip_path


if __name__ == "__main__":
    build_package()
