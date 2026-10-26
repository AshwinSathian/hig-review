"""Exit 0 if every number-with-unit token in the digest appears in the reference
(or the allow file); else exit 1 and print the missing tokens. Exit 2 on bad arguments or paths."""
import argparse, re, sys
TOK = re.compile(r"\d+(?:[.,]\d+)?(?:\s?(?:pt|px|dp|ms|s|%|:1|em|ch|rem|x|×|Hz|fps|characters|chars)(?![A-Za-z]))?")


def tokens(text):
    out = set()
    for m in TOK.finditer(text):
        t = re.sub(r"\s", "", m.group())
        if t.isdigit() and int(t) < 10: continue  # bare small ints are noise
        out.add(t)
    return out


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("digest", help="Markdown digest whose numbers are checked")
    ap.add_argument("reference", help="Markdown reference the numbers must come from")
    ap.add_argument("--allow", help="file of extra allowed tokens")
    a = ap.parse_args(argv)

    def read(p):
        try:
            with open(p, encoding="utf-8") as f:
                return f.read()
        except OSError as e:
            ap.exit(2, f"check_numbers.py: cannot read {p}: {e.strerror}\n")

    known = tokens(read(a.reference)) | tokens(read(a.allow) if a.allow else "")
    missing = sorted(tokens(read(a.digest)) - known)
    for t in missing: print(t)
    return 1 if missing else 0


if __name__ == "__main__":
    sys.exit(main())
