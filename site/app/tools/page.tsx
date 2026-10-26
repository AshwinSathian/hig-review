import type { Metadata } from 'next'
import { Bookmarklet } from '@/components/Bookmarklet'
import { ContrastChecker } from '@/components/ContrastChecker'
import { JsonLd } from '@/components/JsonLd'
import { bookmarklet } from '@/lib/bookmarklet'
import { blob, breadcrumb, social } from '@/lib/site'

const description =
  'A WCAG contrast checker that composites translucent colours the way a browser does, and a bookmarklet that runs loupe’s measurement script on any page.'

export const metadata: Metadata = {
  title: 'Tools',
  description,
  alternates: { canonical: '/tools' },
  ...social('Tools', description, '/tools'),
}

export default function Tools() {
  const b = bookmarklet()
  return (
    <>
      <header className="page-head">
        <h1>Measure it yourself</h1>
        <p className="lede">
          Two pieces of loupe that work without Claude. Both run in your browser and send nothing anywhere.
        </p>
      </header>

      <section className="section" aria-labelledby="contrast-h">
        <header>
          <h2 id="contrast-h">Contrast checker</h2>
          <p>
            Type any colour your browser understands, including <code>oklch()</code> and colours with transparency. The
            foreground is drawn over the background before measuring, as on a page. The ratio is cut, not rounded, to
            two places, so 4.499 shows as 4.49 and fails.
          </p>
        </header>
        <ContrastChecker />
      </section>

      <section className="section" aria-labelledby="bm-h">
        <header>
          <h2 id="bm-h">Measure any page</h2>
          <p>
            Add it as a bookmark, open any page, and click the bookmark. It runs{' '}
            <a href={blob('scripts/measure.js')}>scripts/measure.js</a>, the script loupe runs during a review, on the
            page as you see it now, and opens a panel with the results: text that fails contrast, targets under 24
            pixels, type sizes, motion that ignores reduced motion, and template defaults. Press Escape to close it.
          </p>
        </header>
        <Bookmarklet href={b.href} bytes={b.bytes} />
        <p className="hint">
          It measures one width, one colour scheme and one motion setting: whatever your browser has now. A review
          measures twelve combinations. Some sites block bookmarklets with a Content Security Policy. If nothing happens
          when you click it, that is the likely reason; the browser console shows the block.
        </p>
      </section>
      <JsonLd data={breadcrumb('Tools', '/tools')} />
    </>
  )
}
