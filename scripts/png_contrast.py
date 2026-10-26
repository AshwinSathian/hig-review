"""WCAG 2 contrast from a screenshot region. Python 3 stdlib only.

Usage: python3 -I scripts/png_contrast.py <png> <x1> <y1> <x2> <y2>

The box is in image pixels, x2/y2 exclusive. Screenshots are often taken at the
device pixel ratio, so CSS coordinates must be multiplied by devicePixelRatio
(e.g. a CSS box at 10,20 on a 2x screenshot starts at 20,40).

Prints JSON {fg, bg, ratio, pixels}: bg is the most common colour in the box,
fg the colour covering >= 1% of the box that is furthest in luminance from bg.
Anti-aliased edges blend fg and bg, so pick a box that includes solid glyph strokes.
Supports 8-bit RGB/RGBA, non-interlaced PNGs; RGBA is composited over white.
"""
import json, math, struct, sys, zlib
from collections import Counter


def decode(path, stop=None):
    """Unfilter rows 0..stop-1 only; rows below the box are never decoded."""
    with open(path, "rb") as f:
        data = f.read()
    if data[:8] != b"\x89PNG\r\n\x1a\n":
        sys.exit("not a PNG")
    pos, idat, w = 8, b"", None
    while pos < len(data):
        n, kind = struct.unpack(">I4s", data[pos:pos + 8])
        body = data[pos + 8:pos + 8 + n]
        pos += 12 + n
        if kind == b"IHDR":
            w, h, depth, ctype, _, _, interlace = struct.unpack(">IIBBBBB", body)
            if depth != 8 or ctype not in (2, 6):
                sys.exit(f"unsupported PNG: bit depth {depth}, colour type {ctype} (need 8-bit RGB or RGBA)")
            if interlace:
                sys.exit("unsupported PNG: interlaced (re-save without interlace)")
        elif kind == b"IDAT":
            idat += body
        elif kind == b"IEND":
            break
    if w is None:
        sys.exit("PNG has no IHDR")
    bpp = 3 if ctype == 2 else 4
    raw, stride = zlib.decompress(idat), w * bpp
    rows, prev = [], bytearray(stride)
    for y in range(h if stop is None else min(h, stop)):
        ft, line = raw[y * (stride + 1)], bytearray(raw[y * (stride + 1) + 1:(y + 1) * (stride + 1)])
        if ft > 4:
            sys.exit(f"corrupt PNG: filter type {ft} on row {y}")
        for i in range(stride):
            a = line[i - bpp] if i >= bpp else 0
            b, c = prev[i], prev[i - bpp] if i >= bpp else 0
            if ft == 1:
                line[i] = (line[i] + a) & 255
            elif ft == 2:
                line[i] = (line[i] + b) & 255
            elif ft == 3:
                line[i] = (line[i] + (a + b) // 2) & 255
            elif ft == 4:
                p = a + b - c
                pa, pb, pc = abs(p - a), abs(p - b), abs(p - c)
                line[i] = (line[i] + (a if pa <= pb and pa <= pc else b if pb <= pc else c)) & 255
        rows.append(line)
        prev = line
    return w, h, bpp, rows


def lum(c):
    f = lambda v: v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (v / 255 for v in c)
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b)


def main(argv):
    if len(argv) != 6:
        sys.exit(__doc__)
    try:
        x1, y1, x2, y2 = map(int, argv[2:])
    except ValueError:
        sys.exit(f"x1 y1 x2 y2 must be integers (image pixels), got {' '.join(argv[2:])}")
    w, h, bpp, rows = decode(argv[1], max(y2, 0))
    x1, y1, x2, y2 = max(x1, 0), max(y1, 0), min(x2, w), min(y2, h)
    if x1 >= x2 or y1 >= y2:
        sys.exit(f"empty box for a {w}x{h} image")
    counts = Counter()
    for y in range(y1, y2):
        row = rows[y]
        for x in range(x1, x2):
            px = row[x * bpp:x * bpp + bpp]
            if bpp == 4:  # composite over white
                al = px[3] / 255
                px = [round(v * al + 255 * (1 - al)) for v in px[:3]]
            counts[tuple(px)] += 1
    total = (x2 - x1) * (y2 - y1)
    bg = counts.most_common(1)[0][0]
    cands = [c for c, n in counts.items() if n >= 0.01 * total and c != bg] or [bg]
    fg = max(cands, key=lambda c: abs(lum(c) - lum(bg)))
    hi, lo = sorted((lum(fg), lum(bg)), reverse=True)
    hexc = lambda c: "#%02x%02x%02x" % c
    ratio = (hi + 0.05) / (lo + 0.05)
    shown = round(ratio, 2)
    if any(shown >= t > ratio for t in (3, 4.5, 7)):  # never round up onto a threshold the pair misses
        shown = math.floor(ratio * 100) / 100
    print(json.dumps({"fg": hexc(fg), "bg": hexc(bg), "ratio": shown, "pixels": total}))


if __name__ == "__main__":
    main(sys.argv)
