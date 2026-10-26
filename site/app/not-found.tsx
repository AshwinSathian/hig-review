import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Page not found', robots: { index: false } }

export default function NotFound() {
  return (
    <header className="page-head">
      <p className="eyebrow">404</p>
      <h1>Nothing under the loupe here</h1>
      <p className="lede">
        There&rsquo;s no page at this address. Go to the <Link href="/">home page</Link> or the{' '}
        <Link href="/cases">cases</Link>.
      </p>
    </header>
  )
}
