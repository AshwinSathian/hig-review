import json, os, subprocess, sys, tempfile
T = os.path.dirname(os.path.abspath(__file__))
def run(*a):
    return subprocess.run([sys.executable, "-I", *a], capture_output=True, text=True, encoding="utf-8")
def w(d, name, s):
    p = os.path.join(d, name)
    with open(p, "w", encoding="utf-8") as f: f.write(s)
    return p

def test_check_numbers_flags_missing(tmp):
    r = run(f"{T}/check_numbers.py", w(tmp, "d.md", "44x44 pt and 4.5:1"), w(tmp, "r.md", "44x44 pt"))
    assert r.returncode == 1 and "4.5:1" in r.stdout, (r.returncode, r.stdout, r.stderr)
def test_check_numbers_passes_when_present(tmp):
    s = "44x44 pt and 4.5:1"
    assert run(f"{T}/check_numbers.py", w(tmp, "d.md", s), w(tmp, "r.md", s)).returncode == 0
def test_check_numbers_ignores_small_bare_ints(tmp):
    assert run(f"{T}/check_numbers.py", w(tmp, "d.md", "step 3"), w(tmp, "r.md", "")).returncode == 0
def test_diff_snapshot(tmp):
    o, n = os.path.join(tmp, "o"), os.path.join(tmp, "n"); os.makedirs(o); os.makedirs(n)
    w(o, "a.md", "a"); w(o, "b.md", "b"); w(n, "b.md", "b2"); w(n, "c.md", "c")
    out = run(f"{T}/diff_snapshot.py", o, n).stdout
    assert "added: c" in out and "removed: a" in out and "changed: b" in out, out
def test_check_numbers_allow_and_utf8(tmp):
    allow = w(tmp, "a.txt", "4.5:1")
    r = run(f"{T}/check_numbers.py", w(tmp, "d.md", "44×44 pt — 4.5:1"), w(tmp, "r.md", "44×44 pt"), "--allow", allow)
    assert r.returncode == 0, (r.stdout, r.stderr)
def test_check_numbers_help_and_errors(tmp):
    assert run(f"{T}/check_numbers.py", "--help").returncode == 0
    r = run(f"{T}/check_numbers.py")
    assert r.returncode == 2 and "usage" in r.stderr, r.stderr
    r = run(f"{T}/check_numbers.py", os.path.join(tmp, "nope.md"), w(tmp, "r.md", ""))
    assert r.returncode == 2 and "cannot read" in r.stderr and "Traceback" not in r.stderr, r.stderr
def test_diff_snapshot_help_errors_and_brackets(tmp):
    assert run(f"{T}/diff_snapshot.py", "--help").returncode == 0
    r = run(f"{T}/diff_snapshot.py", os.path.join(tmp, "missing"), tmp)
    assert r.returncode == 2 and "not a directory" in r.stderr and "Traceback" not in r.stderr, r.stderr
    o, n = os.path.join(tmp, "[o]"), os.path.join(tmp, "[n]"); os.makedirs(o); os.makedirs(n)
    w(o, "é.md", "ü"); w(n, "é.md", "ü2")
    assert "changed: é" in run(f"{T}/diff_snapshot.py", o, n).stdout

if __name__ == "__main__":
    tests = [v for k, v in sorted(globals().items()) if k.startswith("test_")]
    ok = 0
    for f in tests:
        with tempfile.TemporaryDirectory() as d:
            try: f(d); ok += 1
            except Exception as e: print("FAIL", f.__name__, repr(e))
    print(f"{ok} passed"); sys.exit(ok != len(tests))
