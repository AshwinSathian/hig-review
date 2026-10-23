"""Usage: diff_snapshot.py <old_md_dir> <new_md_dir>  -> prints added/removed/changed slugs."""
import os, sys
def load(d):
    return {f[:-3]: open(os.path.join(d, f)).read() for f in os.listdir(d) if f.endswith(".md")}
old, new = load(sys.argv[1]), load(sys.argv[2])
for label, slugs in (("added", new.keys() - old.keys()), ("removed", old.keys() - new.keys()),
                     ("changed", {s for s in old.keys() & new.keys() if old[s] != new[s]})):
    for s in sorted(slugs): print(f"{label}: {s}")
