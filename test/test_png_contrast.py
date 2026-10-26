"""Self-check for scripts/png_contrast.py. Run: python3 -I test/test_png_contrast.py"""
import json, os, struct, subprocess, sys, tempfile, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(HERE, "..", "scripts", "png_contrast.py")


def paeth(a, b, c):
    p = a + b - c
    pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
    return a if pa <= pb and pa <= pc else b if pb <= pc else c


def png(path, w, h, pixel, channels=3, ft=1):
    """Write an 8-bit RGB/RGBA PNG; rows use filter type ft (1 Sub, 4 Paeth) to exercise unfiltering."""
    raw, prev = b"", [0] * (w * channels)
    for y in range(h):
        f = ft(y) if callable(ft) else ft
        row = [pixel(x, y)[:channels] for x in range(w)]
        flat = [v for p in row for v in p]
        a = lambda i: flat[i - channels] if i >= channels else 0
        c = lambda i: prev[i - channels] if i >= channels else 0
        pred = (lambda i: a(i)) if f != 4 else (lambda i: paeth(a(i), prev[i], c(i)))
        raw += bytes([f]) + bytes((flat[i] - pred(i)) % 256 for i in range(len(flat)))
        prev = flat
    chunk = lambda t, d: struct.pack(">I", len(d)) + t + d + struct.pack(">I", zlib.crc32(t + d))
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2 if channels == 3 else 6, 0, 0, 0)
    with open(path, "wb") as f:
        f.write(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", ihdr) + chunk(b"IDAT", zlib.compress(raw)) + chunk(b"IEND", b""))


def run(path, *box):
    out = subprocess.run([sys.executable, "-I", SCRIPT, path, *map(str, box)], capture_output=True, text=True)
    return out.returncode, out.stdout, out.stderr


with tempfile.TemporaryDirectory() as d:
    white = (255, 255, 255, 255)
    block = lambda fg: lambda x, y: fg if 4 <= x < 10 and 4 <= y < 8 else white
    p = os.path.join(d, "black.png")
    png(p, 20, 12, block((0, 0, 0, 255)))
    code, out, err = run(p, 0, 0, 20, 12)
    r = json.loads(out)
    assert code == 0, err
    assert (r["fg"], r["bg"], r["ratio"], r["pixels"]) == ("#000000", "#ffffff", 21.0, 240), r

    p = os.path.join(d, "grey.png")
    png(p, 20, 12, block((0x77, 0x77, 0x77, 255)), channels=4)
    r = json.loads(run(p, 0, 0, 20, 12)[1])
    assert (r["fg"], r["ratio"]) == ("#777777", 4.48), r

    # Paeth-filtered rows decode to the same pixels.
    p = os.path.join(d, "paeth.png")
    png(p, 20, 12, block((0x77, 0x77, 0x77, 255)), ft=4)
    r = json.loads(run(p, 0, 0, 20, 12)[1])
    assert (r["fg"], r["bg"], r["ratio"]) == ("#777777", "#ffffff", 4.48), r

    # A filter byte above 4 is corrupt data, rejected.
    p = os.path.join(d, "badfilter.png")
    png(p, 20, 12, block((0, 0, 0, 255)), ft=5)
    code, _, err = run(p, 0, 0, 20, 12)
    assert code != 0 and "filter" in err.lower(), err

    # A colour under 1% of the box is noise, not text.
    p = os.path.join(d, "speck.png")
    png(p, 20, 12, lambda x, y: (0, 0, 0) if (x, y) == (0, 0) else (0x77, 0x77, 0x77) if x < 6 else white)
    assert json.loads(run(p, 0, 0, 20, 12)[1])["fg"] == "#777777"

    # Interlaced PNGs are rejected with a clear message.
    with open(p, "rb") as f:
        data = bytearray(f.read())
    data[28] = 1  # IHDR interlace byte (CRC left stale; the decoder does not check CRCs)
    with open(p, "wb") as f:
        f.write(data)
    code, _, err = run(p, 0, 0, 20, 12)
    assert code != 0 and "interlace" in err.lower(), err

    # Decoding stops after the box: a corrupt row below it is never read.
    p = os.path.join(d, "tail.png")
    png(p, 20, 12, block((0, 0, 0, 255)), ft=lambda y: 5 if y >= 9 else 1)
    code, out, err = run(p, 0, 0, 20, 9)
    assert code == 0 and json.loads(out)["ratio"] == 21.0, (code, out, err)

    # Non-integer coordinates get a usage message, not a traceback.
    code, _, err = run(p, 0, 0, "1.5", 9)
    assert code != 0 and "integer" in err and "Traceback" not in err, err

    # 4.496:1 is shown as 4.49, not rounded up to the 4.5 threshold.
    p = os.path.join(d, "edge.png")
    png(p, 20, 12, block((0x63, 0x63, 0xF8, 255)))
    assert json.loads(run(p, 0, 0, 20, 12)[1])["ratio"] == 4.49

print("png_contrast: ok")
