"""Usage: check_numbers.py <digest.md> <reference.md> [--allow <file>]
Exit 0 if every number-with-unit token in the digest appears in the reference
(or the allow file); else exit 1 and print the missing tokens."""
import re, sys
TOK = re.compile(r"\d+(?:[.,]\d+)?(?:\s?(?:pt|px|dp|ms|s|%|:1|em|ch|rem|x|×|Hz|fps|characters|chars)(?![A-Za-z]))?")
def tokens(text):
    out = set()
    for m in TOK.finditer(text):
        t = re.sub(r"\s", "", m.group())
        if t.isdigit() and int(t) < 10: continue  # bare small ints are noise
        out.add(t)
    return out
if __name__ == "__main__":
    a = sys.argv[1:]
    allow = ""
    if "--allow" in a:
        i = a.index("--allow"); allow = open(a[i + 1]).read(); del a[i:i + 2]
    known = tokens(open(a[1]).read()) | tokens(allow)
    missing = sorted(tokens(open(a[0]).read()) - known)
    for t in missing: print(t)
    sys.exit(1 if missing else 0)
