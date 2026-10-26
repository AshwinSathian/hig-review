'use client'

import { useEffect } from 'react'

// Opens a <details> when the URL's #hash points at it, so "without" links land on an open report.
export function OpenOnHash() {
  useEffect(() => {
    const open = () => {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (el instanceof HTMLDetailsElement) el.open = true
    }
    open()
    addEventListener('hashchange', open)
    return () => removeEventListener('hashchange', open)
  }, [])
  return null
}
