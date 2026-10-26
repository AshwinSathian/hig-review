import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { cases } from '@/lib/cases'
import { breadcrumb, social } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Cases',
  description: 'Full loupe reports on three held-out fixtures (a flawed web page, a well-built control, a SwiftUI app), each next to the review written without the skill, and loupe’s review of this site.',
  alternates: { canonical: '/cases' },
  ...social('Cases', 'Full loupe reports on three held-out fixtures and on this site, next to reviews written without the skill.', '/cases'),
}

export default function Cases() {
  return (
    <>
      <header className="page-head">
        <h1>Unedited reports</h1>
        <p className="lede">
          The first three cases are fixtures from the blind round. You can read loupe&rsquo;s report from each model next to the
          review the same model wrote without the skill, and see what the judges made of the pair. The fourth is loupe&rsquo;s review of this site.
        </p>
      </header>
      <ol className="case-list">
        {cases().map((c) => (
          <li key={c.slug} className="frame">
            <h2>
              <Link href={`/cases/${c.slug}`}>{c.title}</Link>
            </h2>
            <p className="frame-label">{c.kind}</p>
            <p>{c.summary}</p>
          </li>
        ))}
        <li className="frame">
          <h2>
            <Link href="/specimen#second-h">This website</Link>
          </h2>
          <p className="frame-label">loupe&rsquo;s review of its own site</p>
          <p>Two reviews of the site you are reading: one before launch, and one asking whether it looks AI-made. Each comes with the fixes that followed.</p>
        </li>
      </ol>
      <JsonLd data={breadcrumb('Cases', '/cases')} />
    </>
  )
}
