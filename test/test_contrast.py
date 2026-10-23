"""Self-check for scripts/contrast.py. Run: python3 -I test/test_contrast.py"""
import json, os, subprocess, sys

SCRIPT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "scripts", "contrast.py")


def run(*args):
    p = subprocess.run([sys.executable, "-I", SCRIPT, *args], capture_output=True, text=True)
    return p.returncode, p.stdout, p.stderr


code, out, _ = run("#777", "#fff", "#595959", "#ffffff", "rgb(0 0 0)", "rgba(255,255,255,1)", "#00000080", "#fff")
assert code == 0, code
rows = [json.loads(l) for l in out.splitlines()]
assert [r["ratio"] for r in rows] == [4.48, 7.0, 21.0, 4.0]  # #00000080 = alpha 128/255 over white -> grey 127, rows
assert [(r["aa_text"], r["aa_large"]) for r in rows] == [(False, True), (True, True), (True, True), (False, True)], rows

code, _, err = run("oklch(50% 0.1 250)", "#fff")
assert code == 2 and "oklch" in err and "browser" in err, (code, err)

code, _, err = run("#fff")
assert code == 2 and "pairs" in err, (code, err)

code, _, err = run("#ggg", "#fff")
assert code == 2 and "#ggg" in err, (code, err)
print("ok")
