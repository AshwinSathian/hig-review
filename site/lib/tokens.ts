import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { floor2, hex, ratio } from './contrast'

// Reads the colour tokens straight from globals.css, so /specimen shows and
// measures what ships.
const css = () => readFileSync(join(process.cwd(), 'app/globals.css'), 'utf8')

const vars = (block: string) => {
  const out: Record<string, { value: string; note: string }> = {}
  for (const m of block.matchAll(/--([a-z0-9-]+):\s*([^;]+);(?:\s*\/\*\s*([^*]*?)\s*\*\/)?/g)) {
    out[m[1]] = { value: m[2].trim(), note: m[3] ?? '' }
  }
  return out
}

export const themes = () => {
  const s = css()
  const light = vars(s.slice(s.indexOf(':root {'), s.indexOf('}', s.indexOf(':root {'))))
  const darkStart = s.indexOf(':root {', s.indexOf('prefers-color-scheme: dark'))
  const dark = vars(s.slice(darkStart, s.indexOf('}', darkStart)))
  return { light, dark }
}

export const colorRoles = ['paper', 'sheet', 'ink', 'muted', 'rule', 'hair', 'measure'] as const

// Every pair the site actually uses, and the threshold that applies to it.
export const pairs: { fg: string; bg: string; use: string; need: number }[] = [
  { fg: 'ink', bg: 'paper', use: 'Body text', need: 4.5 },
  { fg: 'ink', bg: 'sheet', use: 'Text in frames', need: 4.5 },
  { fg: 'muted', bg: 'paper', use: 'Secondary text', need: 4.5 },
  { fg: 'muted', bg: 'sheet', use: 'Secondary text in frames', need: 4.5 },
  { fg: 'measure', bg: 'paper', use: 'Measured values', need: 4.5 },
  { fg: 'measure', bg: 'sheet', use: 'Measured values in frames', need: 4.5 },
  { fg: 'paper', bg: 'ink', use: 'Button label', need: 4.5 },
  { fg: 'paper', bg: 'muted', use: 'Button label, hover', need: 4.5 },
  { fg: 'rule', bg: 'paper', use: 'Input and button borders', need: 3 },
  { fg: 'rule', bg: 'sheet', use: 'Borders in frames', need: 3 },
  { fg: 'ink', bg: 'sheet', use: 'Hovered or selected finding row', need: 4.5 },
  { fg: 'muted', bg: 'sheet', use: 'Finding number, hovered or selected', need: 4.5 },
  { fg: 'paper', bg: 'muted', use: 'Button label, pressed', need: 4.5 },
  { fg: 'ink', bg: 'paper', use: 'Focus outline on the page', need: 3 },
  { fg: 'ink', bg: 'sheet', use: 'Focus outline in frames', need: 3 },
]

export const contrastTable = () => {
  const t = themes()
  const rows = pairs.map((p) => {
    const row = (theme: typeof t.light) => {
      const r = floor2(ratio(hex(theme[p.fg].value), hex(theme[p.bg].value)))
      return { r, pass: r >= p.need }
    }
    return { ...p, light: row(t.light), dark: row(t.dark) }
  })
  const bad = rows.filter((r) => !r.light.pass || !r.dark.pass)
  if (bad.length) throw new Error(`Contrast below threshold: ${bad.map((r) => `${r.fg} on ${r.bg}`).join(', ')}`)
  return rows
}
