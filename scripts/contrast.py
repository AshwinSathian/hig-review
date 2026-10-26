"""WCAG 2 contrast for colour pairs, e.g. design tokens or native colour values. Python 3 stdlib only.

Usage: python3 -I scripts/contrast.py <fg> <bg> [<fg> <bg> ...]

Colours: #rgb, #rgba, #rrggbb, #rrggbbaa, rgb()/rgba() (comma or space separated, optional / alpha).
Channels are clamped to 0..255 and alpha to 0..1; nan and inf are rejected.
An alpha background is composited over white, then an alpha foreground over that background.
Prints one JSON line per pair: {fg, bg, ratio, aa_text (>= 4.5), aa_large (>= 3, also non-text)}.
The thresholds are compared on the unrounded ratio (4.499:1 fails); ratio is shown to 2 places,
rounded down when rounding would reach a threshold the pair misses.
oklch, lab, hsl and named colours are rejected: measure those in the browser (scripts/measure.js),
which converts any CSS colour to sRGB.
"""
import json, math, re, sys


def fail(msg):
    print(msg, file=sys.stderr)
    sys.exit(2)


def parse(s):
    t = s.strip().lower()
    m = re.fullmatch(r"#([0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})", t)
    if m:
        h = m.group(1)
        if len(h) <= 4:
            h = "".join(c * 2 for c in h)
        rgb = [int(h[i:i + 2], 16) for i in (0, 2, 4)]
        return rgb + [int(h[6:8], 16) / 255 if len(h) == 8 else 1.0]
    m = re.fullmatch(r"rgba?\(([^)]*)\)", t)
    if m:
        parts = [p for p in re.split(r"[\s,/]+", m.group(1)) if p]
        if len(parts) in (3, 4):
            try:
                v = [float(p[:-1]) * (2.55 if i < 3 else 0.01) if p.endswith("%") else float(p) for i, p in enumerate(parts)]
            except ValueError:
                v = None
            if v is not None:
                if not all(math.isfinite(x) for x in v):
                    fail(f"{s}: channels must be finite numbers")
                clamp = lambda x, hi: min(max(x, 0.0), hi)
                return [clamp(x, 255.0) for x in v[:3]] + [clamp(v[3], 1.0) if len(v) == 4 else 1.0]
    if re.match(r"(oklch|oklab|lab|lch|hsla?|hwb|color)\(", t):
        fail(f"{s}: this script reads hex and rgb() only; measure {t.split('(')[0]}() colours in the browser path (scripts/measure.js), which converts them to sRGB")
    fail(f"{s}: not a colour this script reads (#rgb, #rgba, #rrggbb, #rrggbbaa, rgb())")


def over(top, under):
    a = top[3]
    return [top[i] * a + under[i] * (1 - a) for i in range(3)] + [1.0]


def lum(c):
    f = lambda v: v / 12.92 if v <= 0.04045 else ((v + 0.055) / 1.055) ** 2.4
    r, g, b = (f(v / 255) for v in c[:3])
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def shown(ratio):
    r = round(ratio, 2)
    if any(r >= t > ratio for t in (3, 4.5, 7)):
        r = math.floor(ratio * 100) / 100
    return r


def main(args):
    if not args or len(args) % 2:
        fail("usage: contrast.py <fg> <bg> [<fg> <bg> ...] (colours come in fg/bg pairs)")
    for fg_s, bg_s in zip(args[::2], args[1::2]):
        bg = over(parse(bg_s), [255, 255, 255, 1.0])
        fg = over(parse(fg_s), bg)
        hi, lo = sorted((lum(fg), lum(bg)), reverse=True)
        ratio = (hi + 0.05) / (lo + 0.05)
        print(json.dumps({"fg": fg_s, "bg": bg_s, "ratio": shown(ratio), "aa_text": ratio >= 4.5, "aa_large": ratio >= 3}))


if __name__ == "__main__":
    main(sys.argv[1:])
