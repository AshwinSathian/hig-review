import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { JsonLd } from '@/components/JsonLd'
import { cases, getCase, MODELS, report } from '@/lib/cases'
import { html } from '@/lib/md'
import { verdictFor } from '@/lib/results'
import { blob, install, site, social } from '@/lib/site'

export const dynamicParams = false
export const generateStaticParams = () => cases().map((c) => ({ slug: c.slug }))

const Model = (m: string) => `Claude ${m[0].toUpperCase()}${m.slice(1)}`

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCase((await params).slug)
  if (!c) return {}
  const url = `/cases/${c.slug}`
  return { title: c.title, description: c.summary, alternates: { canonical: url }, ...social(c.title, c.summary, url) }
}

export default async function CasePage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCase((await params).slug)
  if (!c) notFound()
  const all = cases()
  const next = all[(all.findIndex((x) => x.slug === c.slug) + 1) % all.length]
  const present = MODELS.filter((m) => report(m, c.fixture, 'skill'))
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">{c.kind}</p>
        <h1>{c.title}</h1>
        <p className="lede">{c.summary}</p>
        <dl className="facts">
          <div>
            <dt>Input</dt>
            <dd>{c.input}</dd>
          </div>
          <div>
            <dt>Fixture</dt>
            <dd>
              <a href={blob(`evals/heldout/fixtures/${c.fixture}`)}>evals/heldout/fixtures/{c.fixture}</a>
            </dd>
          </div>
        </dl>
        <nav aria-label="Reports on this page" className="jump">
          <ul>
            {present.map((m) => (
              <li key={m}>
                <a href={`#${m}-h`}>{Model(m)} with loupe</a> · <a href={`#${m}-base`}>without</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {present.map((m) => {
        const skill = report(m, c.fixture, 'skill')!
        const base = report(m, c.fixture, 'baseline')
        const v = verdictFor(m, c.fixture)
        return (
          <article className="section" key={m} aria-labelledby={`${m}-h`}>
            <header>
              <h2 id={`${m}-h`}>{Model(m)}: loupe&rsquo;s report</h2>
              {v && <p>{v}</p>}
            </header>
            <div className="frame report-frame">
              <div className="prose report" dangerouslySetInnerHTML={{ __html: html(skill.md, 2) }} />
            </div>
            {base && (
              <details id={`${m}-base`}>
                <summary>{Model(m)} without loupe: the review it wrote with no skill</summary>
                <div className="prose report" dangerouslySetInnerHTML={{ __html: html(base.md, 2) }} />
              </details>
            )}
          </article>
        )
      })}
      <nav aria-label="Next" className="section next-steps">
        <ul>
          <li>
            <Link href={`/cases/${next.slug}`}>Next case: {next.title}</Link>
          </li>
          <li>
            <Link href="/cases">All cases</Link>
          </li>
          <li>
            <Link href="/testing">How the judging worked</Link>
          </li>
          <li>
            <Link href="/#install">Install</Link> <code>{install.skills}</code>
          </li>
        </ul>
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
            { '@type': 'ListItem', position: 2, name: 'Cases', item: `${site.url}/cases` },
            { '@type': 'ListItem', position: 3, name: c.title, item: `${site.url}/cases/${c.slug}` },
          ],
        }}
      />
    </>
  )
}
