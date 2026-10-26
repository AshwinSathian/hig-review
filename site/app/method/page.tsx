import type { Metadata } from 'next'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { html, section } from '@/lib/md'
import { article, blob, breadcrumb, social } from '@/lib/site'

const description =
  'How loupe reviews an interface: the profile, category research, measurement, stress states, nine passes, the red team, and the rules that decide what counts as a Blocker.'

export const metadata: Metadata = {
  title: 'Method',
  description,
  alternates: { canonical: '/method' },
  ...social('Method', description, '/method'),
}

export default function Method() {
  const rules = html(section('SKILL.md', 'Rules'))
  const bar = html(section('references/augment/red-team.md', 'The rework bar'))
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">Method</p>
        <h1>Apple first, evidence always</h1>
        <p className="lede">
          loupe treats Apple&rsquo;s Human Interface Guidelines as the base and lets other research add to it, never
          replace it. Each outside check says whether it adds to an Apple rule, covers ground Apple leaves open, or
          conflicts with Apple, and a conflict is shown in the finding rather than settled quietly.
        </p>
      </header>

      <div className="prose">
        <h2>What it reads</h2>
        <p>
          The rules come from paraphrased digests of the HIG (snapshot 23 October 2026), Apple&rsquo;s other design
          literature (WWDC sessions, the Apple Style Guide, the App Review Guidelines, WebKit guidance), and outside
          research: WCAG 2.2, Nielsen Norman Group, Baymard, GOV.UK, Material, Fluent, Carbon and the typography canon.
          A separate catalogue of template tells is dated and kept apart from anything Apple says.
        </p>
        <p>
          A review loads only the files its current pass needs. The skill&rsquo;s instructions stay under five thousand
          tokens so they survive context compaction in long reviews.
        </p>

        <h2>What it measures</h2>
        <p>
          On a running web app, one call measures the page at 390, 820 and 1440 pixels wide, in light and dark, with and
          without reduced motion: text contrast after compositing every translucent layer, target sizes with the WCAG
          2.5.8 spacing exception, type sizes, motion that ignores the reduced-motion setting, and the defaults that
          template-built pages share. A second script measures the typefaces themselves: whether capital I and
          lowercase l can be told apart at 12 pixels, x-height, tabular figures, and script coverage.
        </p>
        <p>
          Anything it can&rsquo;t measure, it lists under Unverified with what would verify it. You can run the
          measurement script in your own browser on the <Link href="/tools">tools page</Link>.
        </p>

        <h2 id="rules-h">The rules it won&rsquo;t bend</h2>
        <p>
          Quoted from <a href={blob('SKILL.md')}>SKILL.md</a> at build time, so this section can&rsquo;t drift from
          the skill. It is written for the agent, so a few terms need a key:
        </p>
        <dl className="key">
          <dt>[Taste]</dt>
          <dd>reviewer judgement, labelled as such.</dd>
          <dt>Apple silent</dt>
          <dd>Apple has no rule on it; the check comes from outside research.</dd>
          <dt>release_stage</dt>
          <dd>development or release, from the project&rsquo;s profile file.</dd>
          <dt>(26+)</dt>
          <dd>checks that apply only to apps built with the iOS, iPadOS or macOS 26 SDK.</dd>
          <dt>step 7</dt>
          <dd>the last step, where it fixes the findings you pick.</dd>
        </dl>
      </div>
      <details className="prose">
        <summary>The whole Rules section, as the agent reads it</summary>
        <div className="quoted" dangerouslySetInnerHTML={{ __html: rules }} />
      </details>

      <div className="prose">
        <h2>When it proposes a rework</h2>
        <p>
          A red team that always finds a structural problem is noise. A rework has to clear this bar, from{' '}
          <a href={blob('references/augment/red-team.md')}>red-team.md</a>, and &ldquo;no rework warranted&rdquo; is the
          expected answer for a well-built product.
        </p>
      </div>
      <details className="prose">
        <summary>The rework bar, as the agent reads it</summary>
        <div className="quoted" dangerouslySetInnerHTML={{ __html: bar }} />
      </details>
      <JsonLd data={breadcrumb('Method', '/method')} />
      <JsonLd data={article('How loupe reviews an interface', description, '/method')} />
    </>
  )
}
