"""Self-check for scripts/png_contrast.py. Run: python3 -I test/test_png_contrast.py"""
import json, os, struct, subprocess, sys, tempfile, zlib

HERE = os.path.dirname(os.path.abspath(__file__))
SCRIPT = os.path.join(HERE, "..", "scripts", "png_contrast.py")


def png(path, w, h, pixel, channels=3):
    """Write an 8-bit RGB/RGBA PNG; rows use filter type 1 (Sub) to exercise unfiltering."""
    raw = b""
    for y in range(h):
        row = [pixel(x, y)[:channels] for x in range(w)]
        flat = [v for p in row for v in p]
        sub = [(flat[i] - (flat[i - channels] if i >= channels else 0)) % 256 for i in range(len(flat))]
        raw += b"\x01" + bytes(sub)
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

print("png_contrast: ok")
