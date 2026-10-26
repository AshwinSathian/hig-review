'use client'

import { useEffect, useRef, useState } from 'react'

export type Spot = {
  // centre of the finding in screenshot pixels
  x: number
  y: number
  impact: string
  apple: string
  title: string
  evidence: string
}

const ZOOM = 2.5
const R = 84 // ring radius in CSS px
const VIEW = 640 // stage height in screenshot px

// A screenshot under a loupe. The findings are a tab list (arrow keys move
// between them); the ring is decoration (aria-hidden) and follows the selected tab.
export function Loupe({
  src,
  alt,
  width,
  height,
  spots,
  caption,
}: {
  src: string
  alt: string
  width: number
  height: number
  spots: Spot[]
  caption: string
}) {
  const [i, setI] = useState(0)
  const stage = useRef<HTMLDivElement>(null)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const [k, setK] = useState(1) // displayed width / screenshot width
  const [resizing, setResizing] = useState(false)
  useEffect(() => {
    const el = stage.current
    if (!el) return
    let t: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      // Snap, don't glide, while the window is resized, so the zoom stays registered.
      setResizing(true)
      setK(el.clientWidth / width)
      clearTimeout(t)
      t = setTimeout(() => setResizing(false), 150)
    })
    ro.observe(el)
    return () => {
      ro.disconnect()
      clearTimeout(t)
    }
  }, [width])

  const select = (n: number) => {
    const next = (n + spots.length) % spots.length
    setI(next)
    tabs.current[next]?.focus()
  }
  const onKey = (e: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: i + 1,
      ArrowRight: i + 1,
      ArrowUp: i - 1,
      ArrowLeft: i - 1,
      Home: 0,
      End: spots.length - 1,
    }
    if (e.key in keys) {
      e.preventDefault()
      select(keys[e.key])
    }
  }

  const s = spots[i]
  // The stage is a window onto the sheet; the sheet pans so the finding sits
  // mid-window, like sliding a contact sheet under a loupe.
  const view = Math.min(VIEW, height) * k
  const off = Math.max(0, Math.min(s.y * k - view / 2, height * k - view))
  const rx = s.x * k - R
  const ry = s.y * k - off - R
  return (
    <figure className={`loupe${resizing ? ' still' : ''}`}>
      <div className="stage-marks">
        <div className="loupe-stage" ref={stage} style={{ height: view || undefined }}>
          <div className="loupe-sheet" style={{ transform: `translateY(${-off}px)` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt={alt} width={width} height={height} />
          </div>
          <div
            className="loupe-ring ring"
            aria-hidden="true"
            style={{
              transform: `translate(${rx}px, ${ry}px)`,
              backgroundImage: `url(${src})`,
              backgroundSize: `${width * k * ZOOM}px ${height * k * ZOOM}px`,
              backgroundPosition: `${R - s.x * k * ZOOM}px ${R - s.y * k * ZOOM}px`,
            }}
          >
            <svg className="loupe-cross" viewBox="0 0 168 168">
              <path d="M84 75v18M75 84h18" />
            </svg>
          </div>
        </div>
      </div>
      <div className="loupe-panel">
        <div className="loupe-list" role="tablist" aria-label="Findings" aria-orientation="vertical" onKeyDown={onKey}>
          {spots.map((sp, n) => (
            <button
              key={n}
              ref={(el) => {
                tabs.current[n] = el
              }}
              type="button"
              role="tab"
              id={`loupe-tab-${n}`}
              aria-selected={n === i}
              aria-controls="loupe-detail"
              tabIndex={n === i ? 0 : -1}
              onClick={() => setI(n)}
            >
              <span className="loupe-n">{n + 1}</span>
              {sp.title}
            </button>
          ))}
        </div>
        <div className="loupe-detail" id="loupe-detail" role="tabpanel" aria-labelledby={`loupe-tab-${i}`}>
          <h3>{s.title}</h3>
          <p>
            <span className={`tag${s.impact === 'Blocker' ? ' blocker' : ''}`}>{s.impact}</span>{' '}
            <span className="tag">{s.apple}</span>
          </p>
          <p>{s.evidence}</p>
        </div>
      </div>
      <figcaption className="muted">{caption}</figcaption>
    </figure>
  )
}
