'use client'

import { useEffect, useRef, useState } from 'react'
import { floor2, ratio, type RGBA } from '@/lib/contrast'

type Spec = { textEnd: number; height: number; size: number; large: boolean; contrast: number | null }

// Computed colours come back as rgb()/rgba(); anything else (color(), oklch) is left unmeasured.
const rgb = (s: string): RGBA | null => {
  const m = /^rgba?\(([^)]+)\)$/.exec(s)
  if (!m) return null
  const [r, g, b, a = 1] = m[1].split(/[\s,/]+/).filter(Boolean).map(Number)
  return [r, g, b, a]
}

// The hero headline, measured in the visitor's browser and judged the way a review judges it.
// The block is rendered empty and hidden on the server so it holds its place; the numbers appear
// once they are real, and update with width, zoom, fonts and colour scheme.
export function MeasuredHeading({ children }: { children: React.ReactNode }) {
  const box = useRef<HTMLDivElement>(null)
  const h1 = useRef<HTMLHeadingElement>(null)
  const [spec, setSpec] = useState<Spec | null>(null)

  useEffect(() => {
    const el = h1.current
    const wrap = box.current
    if (!el || !wrap) return
    const forced = matchMedia('(forced-colors: active)')
    const measure = () => {
      const s = getComputedStyle(el)
      const size = parseFloat(s.fontSize)
      const weight = parseFloat(s.fontWeight)
      const fg = rgb(s.color)
      const bg = rgb(getComputedStyle(document.body).backgroundColor)
      // Where the set text ends, not where the h1 box ends.
      const range = document.createRange()
      range.selectNodeContents(el)
      const right = Math.max(...[...range.getClientRects()].map((r) => r.right))
      setSpec({
        textEnd: right - wrap.getBoundingClientRect().left,
        height: el.getBoundingClientRect().height,
        size,
        // WCAG large text: 24 px, or 18.66 px at weight 700 or more.
        large: size >= 24 || (size >= 18.66 && weight >= 700),
        // In forced colours the system palette is drawn, not the page's, so there is nothing to report.
        contrast: !forced.matches && fg && bg && bg[3] === 1 ? ratio(fg, bg) : null,
      })
    }
    measure()
    document.fonts?.ready.then(measure)
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    const queries = ['(prefers-color-scheme: dark)', '(prefers-contrast: more)', '(forced-colors: active)'].map((q) =>
      matchMedia(q),
    )
    queries.forEach((q) => q.addEventListener('change', measure))
    return () => {
      ro.disconnect()
      queries.forEach((q) => q.removeEventListener('change', measure))
    }
  }, [])

  const needs = spec?.large ? 3 : 4.5
  const style = spec ? ({ '--text-end': `${spec.textEnd}px` } as React.CSSProperties) : undefined
  return (
    <div className="measured" ref={box} style={style} data-ready={spec ? '' : undefined}>
      <h1 ref={h1}>{children}</h1>
      <div className="vdim" aria-hidden="true">
        <i />
        <span dir="ltr">{spec ? `${Math.round(spec.height)} px` : ' '}</span>
        <i />
      </div>
      <figure className="spec">
        <dl>
          <div>
            <dt>Size</dt>
            <dd>
              {spec ? (
                <>
                  <span className="m" dir="ltr">
                    {spec.size.toFixed(1)} px
                  </span>
                  , {spec.large ? 'large text' : 'body text'} under WCAG
                </>
              ) : (
                ' '
              )}
            </dd>
          </div>
          {spec?.contrast !== null && (
            <div>
              <dt>Contrast</dt>
              <dd>
                {spec ? (
                  <>
                    <span className="m" dir="ltr">
                      {floor2(spec.contrast!).toFixed(2)}:1
                    </span>
                    {floor2(spec.contrast!) >= needs ? ', passes' : ', fails'} 1.4.3, which needs {needs}:1
                  </>
                ) : (
                  ' '
                )}
              </dd>
            </div>
          )}
        </dl>
        <figcaption>This headline, measured in your browser.</figcaption>
      </figure>
    </div>
  )
}
