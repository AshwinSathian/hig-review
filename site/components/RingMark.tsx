// The wordmark's ring: a loupe seen from above, crosshair at the centre.
// Drawn in the text colour: the redline is kept for measured values.
export function RingMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M12 7v3M12 14v3M7 12h3M14 12h3" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
