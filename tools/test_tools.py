import json, os, subprocess, sys, tempfile
T = os.path.dirname(os.path.abspath(__file__))
def run(*a):
    return subprocess.run([sys.executable, "-I", *a], capture_output=True, text=True)
def w(d, name, s):
    p = os.path.join(d, name); open(p, "w").write(s); return p

def test_check_numbers_flags_missing(tmp):
    r = run(f"{T}/check_numbers.py", w(tmp, "d.md", "44x44 pt and 4.5:1"), w(tmp, "r.md", "44x44 pt"))
    assert r.returncode == 1 and "4.5:1" in r.stdout, (r.returncode, r.stdout, r.stderr)
def test_check_numbers_passes_when_present(tmp):
    s = "44x44 pt and 4.5:1"
    assert run(f"{T}/check_numbers.py", w(tmp, "d.md", s), w(tmp, "r.md", s)).returncode == 0
def test_check_numbers_ignores_small_bare_ints(tmp):
    assert run(f"{T}/check_numbers.py", w(tmp, "d.md", "step 3"), w(tmp, "r.md", "")).returncode == 0
def test_docc2md_paragraph_and_list(tmp):
    src, dst = os.path.join(tmp, "s"), os.path.join(tmp, "d"); os.makedirs(src)
    t = lambda x: {"type": "text", "text": x}
    doc = {"metadata": {"title": "Title"}, "abstract": [t("Abs")], "primaryContentSections": [{"content": [
        {"type": "heading", "level": 2, "text": "H"},
        {"type": "paragraph", "inlineContent": [t("para")]},
        {"type": "unorderedList", "items": [{"content": [{"type": "paragraph", "inlineContent": [t("item")]}]}]}]}]}
    w(src, "x.json", json.dumps(doc))
    r = run(f"{T}/docc2md.py", src, dst); assert r.returncode == 0, r.stderr
    md = open(os.path.join(dst, "x.md")).read()
    for k in ("# Title", "## H", "- item"): assert k in md, md
def test_diff_snapshot(tmp):
    o, n = os.path.join(tmp, "o"), os.path.join(tmp, "n"); os.makedirs(o); os.makedirs(n)
    w(o, "a.md", "a"); w(o, "b.md", "b"); w(n, "b.md", "b2"); w(n, "c.md", "c")
    out = run(f"{T}/diff_snapshot.py", o, n).stdout
    assert "added: c" in out and "removed: a" in out and "changed: b" in out, out

if __name__ == "__main__":
    tests = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    ok = 0
    for f in tests:
        with tempfile.TemporaryDirectory() as d:
            try: f(d); ok += 1
            except Exception as e: print("FAIL", f.__name__, repr(e))
    print(f"{ok} passed"); sys.exit(ok != len(tests))
