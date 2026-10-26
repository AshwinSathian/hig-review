import type { Metadata, Viewport } from 'next'
import { Atkinson_Hyperlegible_Mono, Atkinson_Hyperlegible_Next } from 'next/font/google'
import Link from 'next/link'
import { JsonLd } from '@/components/JsonLd'
import { Nav } from '@/components/Nav'
import { RingMark } from '@/components/RingMark'
import { baseGraph, blob, ogImage, site } from '@/lib/site'
import './globals.css'

// A tool that measures legibility is set in a face drawn for it: Atkinson
// Hyperlegible separates I, l and 1, and O and 0, which type-eval.js checks.
const sans = Atkinson_Hyperlegible_Next({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-sans',
})

const mono = Atkinson_Hyperlegible_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
})

const title = 'loupe: design review for Claude Code, grounded in Apple’s Human Interface Guidelines'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author, url: site.authorUrl }],
  creator: site.author,
  keywords: [
    'Claude Code skill',
    'design review',
    'UI review',
    'UX audit',
    'Human Interface Guidelines',
    'accessibility audit',
    'WCAG contrast',
    'AI slop design',
    'SwiftUI review',
    'Agent Skills',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title,
    description: site.description,
    locale: 'en_GB',
    images: [ogImage],
  },
  twitter: { card: 'summary_large_image', title, description: site.description, images: [ogImage.url] },
  robots: { index: true, follow: true, 'max-snippet': -1, 'max-image-preview': 'large' },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eae9e6' },
    { media: '(prefers-color-scheme: dark)', color: '#120d0c' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${mono.variable}`}>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="wrap">
          <header className="masthead">
            <Link className="wordmark" href="/">
              <RingMark />
              {site.name}
            </Link>
            <Nav />
          </header>
          <main id="main">{children}</main>
          <footer className="colophon">
            <ul>
              <li>
                <a href={site.repo}>Source on GitHub</a>
              </li>
              <li>
                <a href={blob('SKILL.md')}>SKILL.md</a>
              </li>
              <li>
                <a href={blob('CHANGELOG.md')}>Changelog</a>
              </li>
              <li>
                <a href={`${site.repo}/issues/new/choose`}>Report a wrong finding</a>
              </li>
              <li>
                <a href="/llms.txt">llms.txt</a>
              </li>
            </ul>
            <p>
              Version {site.version}, MIT licence. Built by <a href={site.authorUrl}>{site.author}</a>. This site has been
              reviewed with loupe twice; <Link href="/specimen">the reviews and their fixes</Link> are public.
            </p>
            <p className="disclaimer">{site.disclaimer}</p>
          </footer>
        </div>
        <JsonLd data={baseGraph} />
      </body>
    </html>
  )
}
