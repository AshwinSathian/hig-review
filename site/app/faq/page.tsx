import type { Metadata } from 'next'
import { JsonLd } from '@/components/JsonLd'
import { faqs } from '@/lib/faqs'
import { breadcrumb, social } from '@/lib/site'

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Questions about loupe: Apple affiliation, web apps, measurement, code changes, native apps, models, and privacy.',
  alternates: { canonical: '/faq' },
  ...social('FAQ', 'Questions about loupe: Apple affiliation, web apps, measurement, code changes, native apps, models, and privacy.', '/faq'),
}

export default function Faq() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">FAQ</p>
        <h1>Questions</h1>
      </header>
      <div className="prose">
        {faqs.map((f) => (
          <details key={f.q}>
            <summary>{f.q}</summary>
            <div>
              <p>{f.a}</p>
            </div>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
        }}
      />
      <JsonLd data={breadcrumb('FAQ', '/faq')} />
    </>
  )
}
