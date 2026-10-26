import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { VerifySeal } from '@/components/VerifySeal'
import { html, section } from '@/lib/md'
import { pairs, ready, resultMd } from '@/lib/round'
import { check, results } from '@/lib/results'
import { readRepo } from '@/lib/repo'
import { article, blob, breadcrumb, site, tree, social } from '@/lib/site'

// The commit that added keys.sha256 and the pre-registration, before any run.
const SEAL = '98a41da7deea7a01fcd89100a27b2fd26751c5c8'

const description =
  'How loupe was tested: a pre-registered blind round on three fixtures it was never tuned against, three Claude models, three judges, sealed answer keys, and every result including the losses.'

export const metadata: Metadata = {
  title: 'Testing',
  description,
  alternates: { canonical: '/testing' },
  ...social('Testing', description, '/testing'),
}

const fixtureName: Record<string, string> = {
  'web-sloppy': 'Lendwell (flawed web page)',
  'web-good': 'Split the check (control)',
  native: 'Dosewise (SwiftUI)',
}

export default function Testing() {
  if (!ready()) return <p>PENDING</p>
  const P = 'evals/heldout/preregistration.md'
  check()
  const rows = pairs()
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Testing</p>
        <h1>{results.headline}</h1>
        <p className="lede">{results.summary}</p>
      </header>

      <section className="section" aria-labelledby="design-h">
        <header>
          <h2 id="design-h">How the round worked</h2>
          <p>
            The rules below were written and committed before any review ran (
            <a href={blob(P)}>preregistration.md</a>). The answer keys were sealed by hash in the same commit.
          </p>
        </header>
        <div className="prose quoted" dangerouslySetInnerHTML={{ __html: html(section(P, 'Fixtures')) }} />
        <div className="prose quoted" dangerouslySetInnerHTML={{ __html: html(section(P, 'Conditions and runs')) }} />
        <div className="prose quoted" dangerouslySetInnerHTML={{ __html: html(section(P, 'Decision rules')) }} />
        <div className="prose">
          <h3>Check the seal yourself</h3>
          <p>
            This fetches the key hashes as committed before any review ran (commit{' '}
            <a href={`${site.repo}/commit/${SEAL}`}>
              <code>{SEAL.slice(0, 7)}</code>
            </a>
            ) and the keys as published now, both from GitHub, and hashes the keys in your browser.
          </p>
        </div>
        <VerifySeal commit={SEAL} />
      </section>

      <section className="section" aria-labelledby="result-h">
        <header>
          <h2 id="result-h">Results against the four rules</h2>
          <p>
            Produced by <a href={blob('evals/heldout/tally.py')}>tally.py</a> from the judges&rsquo; and scorer&rsquo;s
            files. Unedited.
          </p>
        </header>
        <div className="prose report" dangerouslySetInnerHTML={{ __html: html(resultMd().replace(/^# .*\n/, ''), 1) }} />
      </section>

      <section className="section" aria-labelledby="reading-h">
        <header>
          <h2 id="reading-h">Reading the result, and what we changed</h2>
          <p>
            From <a href={blob('evals/heldout/notes.md')}>notes.md</a>, written after the tally.
          </p>
        </header>
        <div className="prose" dangerouslySetInnerHTML={{ __html: html(readRepo('evals/heldout/notes.md').replace(/^# .*\n/, '').replace(/^Written[^\n]*\n/m, ''), 1) }} />
      </section>

      <section className="section" aria-labelledby="pairs-h">
        <header>
          <h2 id="pairs-h">Every pair, every judge</h2>
          <p>
            Each judge saw the two reports as A and B and was not told which used loupe. &ldquo;Flagged&rdquo; counts the
            findings that judge called wrong or inflated.
          </p>
        </header>
        {rows.map((p) => (
          <details key={p.name}>
            <summary>
              {p.name}: {fixtureName[p.fixture]}, written by Claude {p.model}
            </summary>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Judge</th>
                    <th scope="col">Preferred</th>
                    <th scope="col" className="num">
                      Flagged, loupe
                    </th>
                    <th scope="col" className="num">
                      Flagged, no skill
                    </th>
                    <th scope="col">Reason given</th>
                  </tr>
                </thead>
                <tbody>
                  {p.votes.map((v) => (
                    <tr key={v.judge}>
                      <th scope="row">{v.judge}</th>
                      <td>{v.prefer}</td>
                      <td className="num">
                        <span className="m">{v.flaggedSkill}</span>
                      </td>
                      <td className="num">
                        <span className="m">{v.flaggedBase}</span>
                      </td>
                      <td>{v.reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="hint">
              <Link href={`/cases/${{ 'web-sloppy': 'lendwell', 'web-good': 'split-the-check', native: 'dosewise' }[p.fixture]}#${p.model}-h`}>
                Read both reports
              </Link>
            </p>
          </details>
        ))}
      </section>

      <section className="section" aria-labelledby="limits-h">
        <header>
          <h2 id="limits-h">What this does not show</h2>
        </header>
        <div className="prose quoted" dangerouslySetInnerHTML={{ __html: html(section(P, 'Known limits, stated in advance')) }} />
        <p>
          Everything is in <a href={tree('evals/heldout')}>evals/heldout/</a>: fixtures, prompts, all 18 reports, the
          judges&rsquo; answers, the scorer&rsquo;s marks, and the keys, which you can check against{' '}
          <a href={blob('evals/heldout/keys.sha256')}>keys.sha256</a>.
        </p>
      </section>
      <JsonLd data={breadcrumb('Testing', '/testing')} />
      <JsonLd data={article('How loupe was tested', description, '/testing')} />
    </>
  )
}
