'use client'

import { useState } from 'react'

// React refuses javascript: URLs in href, so the link is written as HTML.
// The text is fixed and the href is percent-encoded, so nothing here is user input.
export function Bookmarklet({ href, bytes }: { href: string; bytes: number }) {
  const [state, setState] = useState('')
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href)
      setState('Copied. Now bookmark any page, edit that bookmark, and paste this in place of its address.')
    } catch {
      setState('Couldn’t copy. Long-press or right-click the button above and copy the link address instead.')
    }
  }
  const a = `<a class="button secondary" href="${href.replace(/"/g, '%22')}">loupe: measure</a>`
  return (
    <div className="bookmarklet">
      <span dangerouslySetInnerHTML={{ __html: a }} />
      <button type="button" className="button" onClick={copy}>
        Copy bookmarklet
      </button>
      <p className="hint">
        Drag the first button to your bookmarks bar, or copy it and paste it as a bookmark&rsquo;s address, which also
        works on a phone. Clicking it here measures this page. <span className="m">{Math.round(bytes / 1024)} KB</span>,
        built from the skill&rsquo;s own script.
      </p>
      <p className="hint" role="status">
        {state}
      </p>
    </div>
  )
}
