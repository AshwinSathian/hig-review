// WCAG 2.x relative luminance and contrast, the same math as scripts/contrast.py.
export type RGBA = [number, number, number, number]

const channel = (v: number) => {
  const c = v / 255
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export const luminance = ([r, g, b]: RGBA) => 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)

// Composite a translucent foreground over an opaque background.
export const over = ([r, g, b, a]: RGBA, [R, G, B]: RGBA): RGBA => [
  r * a + R * (1 - a),
  g * a + G * (1 - a),
  b * a + B * (1 - a),
  1,
]

export const ratio = (fg: RGBA, bg: RGBA) => {
  const f = luminance(fg[3] < 1 ? over(fg, bg) : fg)
  const b = luminance(bg)
  const [hi, lo] = f > b ? [f, b] : [b, f]
  return (hi + 0.05) / (lo + 0.05)
}

export const hex = (h: string): RGBA => {
  let s = h.replace('#', '')
  if (s.length === 3 || s.length === 4) s = [...s].map((c) => c + c).join('')
  const n = (i: number) => parseInt(s.slice(i, i + 2), 16)
  return [n(0), n(2), n(4), s.length === 8 ? n(6) / 255 : 1]
}

// Ratios are floored to two places before comparing, so 4.499 never passes as 4.5.
export const floor2 = (x: number) => Math.floor(x * 100) / 100

export const verdicts = (r: number) => {
  const x = floor2(r)
  return {
    text: x >= 4.5,
    large: x >= 3,
    ui: x >= 3,
    aaa: x >= 7,
  }
}
