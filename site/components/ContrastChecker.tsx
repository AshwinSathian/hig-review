'use client'

import { useEffect, useMemo, useState } from 'react'
import { floor2, ratio, type RGBA } from '@/lib/contrast'

// The browser parses the colour (any CSS syntax it supports) and composites it
// on a canvas: white, then the background, then the foreground. That is what
// a page shows, and what scripts/measure.js reads. Out-of-gamut colours are
// clamped to sRGB by the canvas.
function useCanvas() {
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  useEffect(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 1
    setCtx(c.getContext('2d', { willReadFrequently: true }))
  }, [])
  return ctx
}

const valid = (ctx: CanvasRenderingContext2D, s: string) => {
  ctx.fillStyle = '#000'
  ctx.fillStyle = s
  const a = ctx.fillStyle
  ctx.fillStyle = '#fff'
  ctx.fillStyle = s
  return s.trim() !== '' && a === ctx.fillStyle
}

const pixel = (ctx: CanvasRenderingContext2D, layers: string[]): RGBA => {
  ctx.globalCompositeOperation = 'source-over'
  for (const l of ['#fff', ...layers]) {
    ctx.fillStyle = l
    ctx.fillRect(0, 0, 1, 1)
  }
  const d = ctx.getImageData(0, 0, 1, 1).data
  return [d[0] ?? 0, d[1] ?? 0, d[2] ?? 0, 1]
}

const toHex = ([r, g, b]: RGBA) => '#' + [r, g, b].map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')

const checks = [
  { label: 'Body text', need: 4.5, sc: '1.4.3' },
  { label: 'Large text (24 px, or 18.66 px bold)', need: 3, sc: '1.4.3' },
  { label: 'Icons, borders and focus rings', need: 3, sc: '1.4.11' },
  { label: 'Enhanced, body text', need: 7, sc: '1.4.6' },
]

export function ContrastChecker() {
  const ctx = useCanvas()
  const [fg, setFg] = useState('#575b62')
  const [bg, setBg] = useState('#eae9e6')

  const out = useMemo(() => {
    if (!ctx) return null
    const okF = valid(ctx, fg)
    const okB = valid(ctx, bg)
    if (!okF || !okB) return { error: !okF ? 'fg' : 'bg' }
    const b = pixel(ctx, [bg])
    const f = pixel(ctx, [bg, fg])
    return { r: ratio(f, b), f: toHex(f), b: toHex(b) }
  }, [ctx, fg, bg])

  const r = out && 'r' in out && out.r !== undefined ? out.r : null

  // One short announcement after typing pauses, not the whole panel on every key.
  const [said, setSaid] = useState('')
  useEffect(() => {
    if (r === null) return
    const t = setTimeout(() => {
      const x = floor2(r)
      setSaid(`${x.toFixed(2)} to 1, ${x >= 4.5 ? 'passes' : 'fails'} body text`)
    }, 500)
    return () => clearTimeout(t)
  }, [r])

  return (
    <div className="checker frame">
      <div className="checker-inputs">
        <ColorField id="fg" label="Text or foreground" value={fg} onChange={setFg} invalid={out?.error === 'fg'} hex={out && 'f' in out ? out.f : undefined} />
        <ColorField id="bg" label="Background" value={bg} onChange={setBg} invalid={out?.error === 'bg'} hex={out && 'b' in out ? out.b : undefined} />
      </div>

      <div className="checker-result">
        {r === null ? (
          <p>Enter two colours the browser understands: hex, rgb(), hsl(), oklch(), a named colour.</p>
        ) : (
          <>
            <p className="checker-ratio">
              <span className="m">{floor2(r).toFixed(2)}</span>
              <span className="muted">: 1</span>
            </p>
            <ul className="checker-verdicts">
              {checks.map((c) => {
                const pass = floor2(r) >= c.need
                return (
                  <li key={c.label}>
                    <span className={`tag${pass ? '' : ' blocker'}`}>{pass ? 'Pass' : 'Fail'}</span> {c.label}{' '}
                    <span className="muted">
                      needs {c.need}:1, WCAG {c.sc}
                    </span>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </div>

      <p className="visually-hidden" role="status">
        {said}
      </p>

      {r !== null && (
        <div className="checker-sample" style={{ background: bg, color: fg }} aria-hidden="true">
          <p style={{ fontSize: '1rem' }}>Reserve the drill for Saturday</p>
          <p style={{ fontSize: '0.8125rem' }}>Pickup from 9:00, side door, bring your card</p>
        </div>
      )}
    </div>
  )
}

function ColorField({
  id,
  label,
  value,
  onChange,
  invalid,
  hex,
}: {
  id: string
  label: string
  value: string
  onChange: (v: string) => void
  invalid: boolean
  hex?: string
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="checker-row">
        <input
          type="color"
          aria-label={`${label}, colour picker`}
          value={hex ?? '#000000'}
          onChange={(e) => onChange(e.target.value)}
        />
        <input
          id={id}
          type="text"
          spellCheck={false}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid}
          aria-describedby={`${id}-hint`}
        />
      </div>
      <p id={`${id}-hint`} className="hint">
        {invalid ? 'Enter a colour the browser can read, such as #1a1d23, rgb(26 29 35) or oklch(0.23 0.01 260).' : hex ? `Renders as ${hex} in sRGB.` : ' '}
      </p>
    </div>
  )
}
