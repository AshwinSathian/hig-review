"""Compare two directories of Markdown snapshots; prints added/removed/changed slugs (file names without .md)."""
import argparse, sys
from pathlib import Path


def load(ap, d):
    p = Path(d)
    if not p.is_dir():
        ap.exit(2, f"diff_snapshot.py: not a directory: {d}\n")
    # iterdir, not glob: directory names may contain glob characters such as '['.
    return {f.name[:-3]: f.read_text(encoding="utf-8") for f in p.iterdir() if f.name.endswith(".md") and f.is_file()}


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("old_md_dir")
    ap.add_argument("new_md_dir")
    a = ap.parse_args(argv)
    old, new = load(ap, a.old_md_dir), load(ap, a.new_md_dir)
    for label, slugs in (("added", new.keys() - old.keys()), ("removed", old.keys() - new.keys()),
                         ("changed", {s for s in old.keys() & new.keys() if old[s] != new[s]})):
        for s in sorted(slugs): print(f"{label}: {s}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
