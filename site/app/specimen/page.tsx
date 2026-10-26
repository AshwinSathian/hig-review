import type { Metadata } from 'next'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { html } from '@/lib/md'
import { colorRoles, contrastTable, themes } from '@/lib/tokens'
import { breadcrumb, tree, social } from '@/lib/site'
import { readFileSync } from 'node:fs'

const description =
  'The design system of this site, traced to its subject the way loupe asks: colour roles with measured contrast, type, spacing, motion, user journeys, and loupe’s own review of the site with what was fixed.'

export const metadata: Metadata = {
  title: 'Specimen',
  description,
  alternates: { canonical: '/specimen' },
  ...social('Specimen', description, '/specimen'),
}

const space = [
  ['s1', 4],
  ['s2', 8],
  ['s3', 12],
  ['s4', 16],
  ['s6', 24],
  ['s8', 32],
  ['s12', 48],
  ['s16', 64],
  ['s24', 96],
] as const

const principles = [
  ['Purpose', 'Every page answers one question a visitor brings: what it is, how it works, whether it works, how to try it.'],
  ['Agency', 'Nothing moves on its own. The loupe moves when you pick a finding; the tools run only when you type or click.'],
  ['Responsibility', 'The tools send nothing anywhere. The testing page shows losses next to wins, and every claim links to the file behind it.'],
  ['Familiarity', 'A plain top navigation, underlined links, native form controls, a plain 2-pixel focus outline in the text colour, the browser’s own scrolling.'],
  ['Flexibility', 'Light and dark from the system setting, an increased-contrast variant, text in rem so it scales, layouts that reflow from 320 pixels and at 200% text, reduced motion honoured.'],
  ['Simplicity', 'One accent, used for one thing. Two typefaces from one family. No cards inside cards.'],
  ['Craft', 'Contrast on this page is computed from the stylesheet at build time, so the numbers below are the ones that ship.'],
  ['Delight', 'One moment, on the core idea: the ring gliding to a finding and magnifying it.'],
]

const journeys = [
  {
    who: 'A developer deciding whether to install it',
    steps: ['Home: what it does, one specimen, the install command', 'Cases: a full report on something like their app', 'Install from the home page or README'],
  },
  {
    who: 'A designer or accessibility lead who doubts AI reviews',
    steps: ['Testing: the pre-registered rules, every pair, the losses', 'Cases: the control fixture, where loupe should find little', 'Method: the Blocker rule and the rework bar, quoted from the skill'],
  },
  {
    who: 'Someone who wants a number now',
    steps: ['Tools: the contrast checker', 'Tools: the bookmarklet on their own page', 'Method, if the numbers raise questions'],
  },
]

export default function Specimen() {
  const t = themes()
  const rows = contrastTable()
  const reviewPath = join(process.cwd(), 'review/report.md')
  const reviewMd = existsSync(reviewPath) ? readFileSync(reviewPath, 'utf8') : ''
  const review = reviewMd ? html(reviewMd, 2) : null
  const fixes = html(readFileSync(join(process.cwd(), 'review/fixes.md'), 'utf8'))
  // Counted from the report's own findings table, so the numbers match it.
  const impacts = [...reviewMd.matchAll(/^\| \d+ \|.*?\| (Blocker|Major|Minor|Polish) \|/gm)].map((m) => m[1])
  const counts = {
    blocker: impacts.filter((x) => x === 'Blocker').length,
    major: impacts.filter((x) => x === 'Major').length,
    minor: impacts.filter((x) => x === 'Minor').length,
  }
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Specimen</p>
        <h1>This site, under its own loupe</h1>
        <p className="lede">
          loupe tells products to trace every design value to their subject, their audience or a gap among their
          peers, and to measure instead of estimating. This page applies that to the site you are reading.
        </p>
      </header>

      <section className="section" aria-labelledby="trace-h">
        <header>
          <h2 id="trace-h">Where the look comes from</h2>
        </header>
        <div className="prose">
          <p>
            <strong>Subject material.</strong> A loupe is the magnifier photographers and printers hold over a contact
            sheet on a lightbox, and engineers hold over a drawing. The site borrows that bench: a viewing-booth grey
            for the page, lit white frames with crop marks for anything under inspection, and a darkroom with a
            safelight when your system is in dark mode.
          </p>
          <p>
            <strong>One accent, one job.</strong> The redline colour marks measured values and nothing else: a ratio, a
            size, a count. If it isn&rsquo;t a measurement, it isn&rsquo;t red.
          </p>
          <p>
            <strong>Type.</strong> Atkinson Hyperlegible Next for text and headings, Atkinson Hyperlegible Mono for
            numbers and code. The Braille Institute drew the family so that I, l and 1, and O and 0, can&rsquo;t be
            confused, which is one of the things loupe&rsquo;s type script measures.
          </p>
          <p>
            <strong>Against the landscape.</strong> The closest peer, <a href="https://impeccable.style">Impeccable</a>{' '}
            (checked October 2026), also uses a grey paper ground, one saturated accent and a mono face. So the
            difference has to come from mechanism rather than palette: the accent marks only measured values, frames carry
            crop marks, and the loupe ring does the inspecting. The slop catalogue was checked
            against it in the review below.
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="color-h">
        <header>
          <h2 id="color-h">Colour roles</h2>
          <p>Read from the stylesheet at build time.</p>
        </header>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Light</th>
                <th scope="col">Dark</th>
                <th scope="col">Note</th>
              </tr>
            </thead>
            <tbody>
              {colorRoles.map((role) => (
                <tr key={role}>
                  <th scope="row">
                    <code>--{role}</code>
                  </th>
                  <td>
                    <span className="swatch" style={{ background: t.light[role].value }} /> <code>{t.light[role].value}</code>
                  </td>
                  <td>
                    <span className="swatch" style={{ background: t.dark[role].value }} /> <code>{t.dark[role].value}</code>
                  </td>
                  <td className="muted">{t.light[role].note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="contrast-h">
        <header>
          <h2 id="contrast-h">The pairs the build checks</h2>
          <p>
            Ratios are cut to two places, not rounded. The build checks these pairs, including hover and selected states, and fails if any drops
            below its threshold.
          </p>
        </header>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th scope="col">Use</th>
                <th scope="col">Pair</th>
                <th scope="col" className="num">Needs</th>
                <th scope="col" className="num">Light</th>
                <th scope="col" className="num">Dark</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.use}>
                  <td>{r.use}</td>
                  <td>
                    <code>
                      {r.fg} on {r.bg}
                    </code>
                  </td>
                  <td className="num">{r.need}</td>
                  <td className="num">
                    <span className="m">{r.light.r.toFixed(2)}</span>
                  </td>
                  <td className="num">
                    <span className="m">{r.dark.r.toFixed(2)}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="space-h">
        <header>
          <h2 id="space-h">Space</h2>
          <p>A 4-pixel base. Every gap between elements is one of these nine; tag padding and list indents are in em so they follow the text.</p>
        </header>
        <ul className="space-scale">
          {space.map(([name, px]) => (
            <li key={name}>
              <code>--{name}</code>
              <span className="dim" style={{ width: `${px}px` }}>
                <i />
                <span />
                <i />
              </span>
              <span className="m">{px}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="motion-h">
        <header>
          <h2 id="motion-h">Motion</h2>
        </header>
        <dl className="facts">
          <div>
            <dt>Productive</dt>
            <dd>
              <span className="m">120 ms</span>, <code>cubic-bezier(0.3, 0, 0.2, 1)</code>. Link underlines and button
              fills.
            </dd>
          </div>
          <div>
            <dt>Expressive</dt>
            <dd>
              <span className="m">360 ms</span>, <code>cubic-bezier(0.2, 0.8, 0.2, 1)</code>. The loupe settling on a
              finding, and nothing else.
            </dd>
          </div>
          <div>
            <dt>Reduced motion</dt>
            <dd>
              Both become <span className="m">0 ms</span>. The ring jumps instead of gliding.
            </dd>
          </div>
        </dl>
      </section>

      <section className="section" aria-labelledby="principles-h">
        <header>
          <h2 id="principles-h">Apple&rsquo;s eight principles, applied here</h2>
        </header>
        <dl className="facts">
          {principles.map(([p, body]) => (
            <div key={p}>
              <dt>{p}</dt>
              <dd>{body}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section" aria-labelledby="journeys-h">
        <header>
          <h2 id="journeys-h">Who comes here, and the path each takes</h2>
        </header>
        <div className="sheet-grid">
          {journeys.map((j) => (
            <div className="frame" key={j.who}>
              <h3>{j.who}</h3>
              <ol className="journey">
                {j.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="review-h">
        <header>
          <h2 id="review-h">loupe&rsquo;s review of this site</h2>
          <p>
            Run with the skill on the built site before launch, by a separate Claude Opus instance. The report is
            unedited. Source:{' '}
            <a href={tree('site/review')}>site/review/</a>.
          </p>
        </header>
        {review ? (
          <>
            <p>
              <span className="m">{counts.blocker}</span> Blockers, <span className="m">{counts.major}</span> Major,{' '}
              <span className="m">{counts.minor}</span> Minor and one grouped Polish row, plus one rework. What happened to
              each:
            </p>
            <div className="prose report" dangerouslySetInnerHTML={{ __html: fixes }} />
            <details className="prose">
              <summary>loupe&rsquo;s report on this site, unedited</summary>
              <div className="report" dangerouslySetInnerHTML={{ __html: review }} />
            </details>
          </>
        ) : (
          <p>PENDING</p>
        )}
        <p>
          <Link href="/cases">More reviews on the cases page</Link>
        </p>
      </section>
      <JsonLd data={breadcrumb('Specimen', '/specimen')} />
    </>
  )
}
