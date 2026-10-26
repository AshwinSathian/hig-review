'use client'

import { useRef, useState } from 'react'

export function Command({ text, label, quiet = false }: { text: string; label: string; quiet?: boolean }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const pre = useRef<HTMLPreElement>(null)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setState('copied')
      setTimeout(() => setState('idle'), 2000)
    } catch {
      // Select the command so the visitor can copy it by hand.
      const r = document.createRange()
      if (pre.current) r.selectNodeContents(pre.current)
      getSelection()?.removeAllRanges()
      getSelection()?.addRange(r)
      setState('failed')
    }
  }
  return (
    <div className="cmd-wrap">
      <div className="cmd">
        <pre ref={pre} role="region" tabIndex={0} aria-label={label}>
          <code>{text}</code>
        </pre>
        <button type="button" className={quiet ? 'quiet' : undefined} onClick={copy}>
          {state === 'copied' ? 'Copied' : state === 'failed' ? 'Couldn’t copy' : 'Copy'}
          <span className="visually-hidden"> {label}</span>
        </button>
      </div>
      <p className="hint" role="status">
        {state === 'failed' ? 'The command is selected. Press Ctrl+C or ⌘C to copy it.' : ''}
      </p>
    </div>
  )
}
