"""Write or check the Contents block in reference files longer than 100 lines.

Usage: python3 -I tools/toc.py [--check] [files...]   (default: references/**/*.md)
The block sits after the H1 and lists the file's H2 headings, so Claude can see
what a file holds from its first lines before deciding which section to read.
--check exits 1 if any block is missing or stale.
"""
import argparse, pathlib, re, sys

START, END = "<!-- contents -->", "<!-- /contents -->"


def block(lines):
    heads = [l[3:].strip() for l in lines if l.startswith("## ")]
    return [START, "Contents: " + " · ".join(heads), END]


def render(text):
    lines = text.split("\n")
    if START in lines:
        a, b = lines.index(START), lines.index(END)
        a -= 1 if a > 1 and lines[a - 1] == "" else 0
        lines = lines[:a] + lines[b + 1:]
    if len(lines) <= 100 or not any(l.startswith("## ") for l in lines):
        return "\n".join(lines)
    h1 = next((i for i, l in enumerate(lines) if l.startswith("# ")), -1)
    at = h1 + 1
    gap = [""] if at < len(lines) and lines[at] != "" else []
    return "\n".join(lines[:at] + ([""] if at else []) + block(lines) + gap + lines[at:])


def main():
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--check", action="store_true", help="exit 1 if any Contents block is missing or stale")
    ap.add_argument("files", nargs="*")
    a = ap.parse_args()
    files = [pathlib.Path(f) for f in a.files] or sorted(pathlib.Path("references").rglob("*.md"))
    stale = []
    for f in files:
        old = f.read_text(encoding="utf-8")
        new = render(old)
        if new != old:
            stale.append(str(f))
            if not a.check:
                f.write_text(new, encoding="utf-8")
    if a.check and stale:
        print("Contents block missing or stale (run python3 -I tools/toc.py):\n  " + "\n  ".join(stale))
        sys.exit(1)
    if not a.check:
        print(f"updated {len(stale)} file(s)")


if __name__ == "__main__":
    main()
