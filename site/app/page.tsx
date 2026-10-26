import Link from 'next/link'
import { Command } from '@/components/Command'
import { Loupe } from '@/components/Loupe'
import { steps } from '@/lib/steps'
import { specimen } from '@/lib/specimen'
import { results } from '@/lib/results'
import type { Metadata } from 'next'
import { blob, install, site, social } from '@/lib/site'

export const metadata: Metadata = social(
  'loupe: design review for Claude Code, grounded in Apple’s Human Interface Guidelines',
  site.description,
  '/',
)

export default function Home() {
  return (
    <>
      <section className="page-head hero">
        <p className="eyebrow">A Claude Code skill, version {site.version}</p>
        <h1>A design review that shows its measurements.</h1>
        <p className="lede">
          loupe reviews an interface against Apple&rsquo;s Human Interface Guidelines and the research around them. It
          measures what it can in the running app, says how strongly Apple states each rule it cites, and tells you
          when a screen looks like every other template. It works on iOS, iPadOS and macOS apps and on the web.
        </p>
        <Command text={install.skills} label="install command" />
        <p className="muted">
          Run it in a terminal. Free and MIT-licensed.{' '}
          <a href="#install">Other ways to install, including the Claude Code plugin</a>.
        </p>
      </section>

      <section className="section" aria-labelledby="specimen-h">
        <header>
          <p className="eyebrow">Specimen</p>
          <h2 id="specimen-h">One page, under the loupe</h2>
          <p>
            A tool-lending library page, written for our tests by a separate model that was told not to read
            loupe&rsquo;s rules. These are findings loupe returned in a blind run. Pick one to move the ring.
          </p>
        </header>
        <Loupe {...specimen} />
        <p>
          <Link href="/cases/lendwell">The whole report, next to the review written without loupe</Link>
        </p>
      </section>

      <section className="section" aria-labelledby="tags-h">
        <header>
          <p className="eyebrow">Two tags on every finding</p>
          <h2 id="tags-h">How bad it is, and how sure Apple is</h2>
        </header>
        <div className="sheet-grid">
          <div className="frame">
            <div className="frame-label">
              <span>Impact</span>
              <span>harm to the user</span>
            </div>
            <dl className="tag-defs">
              <dt>
                <span className="tag blocker">Blocker</span>
              </dt>
              <dd>
                Needs evidence of one of these: a measured or source-confirmed WCAG A or AA failure; an Apple MUST on an
                iPhone, iPad or Mac app whose breach stops the task, blocks an accessibility need or risks App Review
                rejection; data loss; deceptive design; or a task that can&rsquo;t be finished in a release build.
              </dd>
              <dt>
                <span className="tag">Major</span>
              </dt>
              <dd>Feels wrong, non-native or generic. Judged issues stop here.</dd>
              <dt>
                <span className="tag">Minor</span> <span className="tag">Polish</span>
              </dt>
              <dd>Small costs, and finish.</dd>
            </dl>
          </div>
          <div className="frame">
            <div className="frame-label">
              <span>Apple column</span>
              <span>how strongly it is stated</span>
            </div>
            <dl className="tag-defs">
              <dt>
                <span className="tag">MUST</span> <span className="tag">SHOULD</span>{' '}
                <span className="tag">CONSIDER</span>
              </dt>
              <dd>Copied from Apple&rsquo;s wording. Never upgraded.</dd>
              <dt>
                <span className="tag">Web</span>
              </dt>
              <dd>An Apple rule translated to the web, or a WCAG-backed web rule.</dd>
              <dt>
                <span className="tag">Research</span> <span className="tag">Taste</span>
              </dt>
              <dd>Outside research where Apple is silent, and reviewer judgement, labelled as such.</dd>
            </dl>
          </div>
        </div>
        <p>
          <Link href="/method#rules-h">The full rules, quoted from the skill</Link>
        </p>
      </section>

      <section className="section" aria-labelledby="steps-h">
        <header>
          <p className="eyebrow">Method</p>
          <h2 id="steps-h">The steps of a review, report before edits</h2>
          <p>Numbered as in the skill.</p>
        </header>
        <ol className="steps">
          {steps().map((s) => (
            <li key={s.n}>
              <span className="step-n">{s.n}</span>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
        <p>
          <Link href="/method">How it reads and measures, and the rules it won&rsquo;t bend</Link>
        </p>
      </section>

      <section className="section" aria-labelledby="results-h">
        <header>
          <p className="eyebrow">Testing</p>
          <h2 id="results-h">{results.headline}</h2>
          <p>{results.summary}</p>
        </header>
        <p>
          <Link href="/testing">Method, every pair, and the losses</Link>
        </p>
      </section>

      <section className="section" id="install" aria-labelledby="install-h">
        <header>
          <p className="eyebrow">Install</p>
          <h2 id="install-h">Three ways in</h2>
        </header>
        <div className="install-list">
          <div className="field">
            <h3>Inside Claude Code, as a plugin</h3>
            <Command text={install.plugin} label="plugin install commands" quiet />
          </div>
          <div className="field">
            <h3>In a terminal, for any agent that reads skills</h3>
            <Command text={install.skills} label="skills CLI install command" quiet />
          </div>
          <div className="field">
            <h3>Clone and link, so git pull updates it</h3>
            <Command text={install.symlink} label="clone and link commands" quiet />
          </div>
        </div>
        <p className="muted">
          Then ask in plain words: &ldquo;review the checkout flow at localhost:3000&rdquo;, &ldquo;does this screen look
          AI-made?&rdquo;, &ldquo;audit our tokens&rdquo;. Measuring a web app live needs the Playwright MCP server;
          without it loupe works from source and screenshots and lists the measured checks as unverified.{' '}
          <a href={blob('README.md')}>README</a>.
        </p>
      </section>
    </>
  )
}
