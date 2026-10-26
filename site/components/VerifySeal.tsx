'use client'

import { useState } from 'react'

// Fetches keys.sha256 as committed before any review ran, and each answer key as
// published now, both from GitHub, hashes the keys with Web Crypto, and compares.
// Nothing comes from this site, so the check doesn't depend on trusting it.
const RAW = 'https://raw.githubusercontent.com/AshwinSathian/loupe'

type Row = { file: string; sealed: string; now: string; ok: boolean }

const sha256 = async (bytes: ArrayBuffer) => {
  const buf = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export function VerifySeal({ commit }: { commit: string }) {
  const [rows, setRows] = useState<Row[] | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const run = async () => {
    setBusy(true)
    setError('')
    try {
      const sealed = await (await fetch(`${RAW}/${commit}/evals/heldout/keys.sha256`)).text()
      const lines = sealed
        .trim()
        .split('\n')
        .map((l) => l.trim().split(/\s+/))
      const out: Row[] = []
      for (const [hash, file] of lines) {
        const res = await fetch(`${RAW}/main/evals/heldout/keys/${file}`)
        if (!res.ok) throw new Error(`${file}: ${res.status}`)
        // Hash the bytes as published; text() would drop a byte-order mark.
        const now = await sha256(await res.arrayBuffer())
        out.push({ file, sealed: hash, now, ok: now === hash })
      }
      setRows(out)
    } catch (e) {
      setError(`Couldn’t fetch from GitHub (${(e as Error).message}). The files are in evals/heldout/ in the repository.`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="seal">
      <button type="button" className="button" onClick={run} disabled={busy}>
        {busy ? 'Checking…' : 'Check the seal'}
      </button>
      <div role="status">
        {error && <p className="hint">{error}</p>}
        {rows && (
          <div className="table-wrap" tabIndex={0}>
            <table>
              <thead>
                <tr>
                  <th scope="col">Key</th>
                  <th scope="col">Sealed before the runs</th>
                  <th scope="col">Hash of the key now</th>
                  <th scope="col">Match</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.file}>
                    <th scope="row">
                      <code>{r.file}</code>
                    </th>
                    <td>
                      <code className="m">{r.sealed.slice(0, 12)}…</code>
                    </td>
                    <td>
                      <code className="m">{r.now.slice(0, 12)}…</code>
                    </td>
                    <td>{r.ok ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
