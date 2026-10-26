import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <header className="page-head">
      <h1>No page at this address</h1>
      <p className="lede">
        Go to the <Link href="/">home page</Link> or the{' '}
        <Link href="/cases">cases</Link>.
      </p>
    </header>
  )
}
