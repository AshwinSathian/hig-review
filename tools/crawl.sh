#!/usr/bin/env bash
# Usage: bash tools/crawl.sh <out_dir>
# Fetches the HIG index and every page JSON into <out_dir>/raw, converts to <out_dir>/md.
set -euo pipefail
out=${1:?usage: crawl.sh <out_dir>}
here=$(cd "$(dirname "$0")" && pwd)
base=https://developer.apple.com/tutorials/data
mkdir -p "$out/raw" "$out/md"

fetch() { # url dest; 3 tries
  for _ in 1 2 3; do
    curl -fsS --max-time 60 "$1" -o "$2.tmp" && python3 -I -c 'import json,sys;json.load(open(sys.argv[1]))' "$2.tmp" \
      && mv "$2.tmp" "$2" && return 0
    sleep 2
  done
  rm -f "$2.tmp"; return 1
}

fetch "$base/index/design--human-interface-guidelines" "$out/index.json" || { echo "index fetch failed" >&2; exit 1; }
python3 -I -c '
import json, sys
paths = set()
def walk(n):
    if isinstance(n, dict):
        p = n.get("path")
        if isinstance(p, str) and "human-interface-guidelines" in p: paths.add(p.rstrip("/"))
        for v in n.values(): walk(v)
    elif isinstance(n, list):
        for v in n: walk(v)
walk(json.load(open(sys.argv[1])))
print("\n".join(sorted(paths)))
' "$out/index.json" > "$out/paths.txt"

fail=0
while read -r p; do
  slug=${p##*human-interface-guidelines}; slug=${slug#/}; slug=${slug:-index}; slug=${slug//\//--}
  fetch "$base$p.json" "$out/raw/$slug.json" || { echo "FAILED: $p" >&2; fail=1; }
done < "$out/paths.txt"
[ "$fail" = 0 ] || { echo "some pages missing after retries" >&2; exit 1; }

python3 -I "$here/docc2md.py" "$out/raw" "$out/md"
echo "pages: $(wc -l < "$out/paths.txt")"
