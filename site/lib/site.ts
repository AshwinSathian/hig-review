// Safe for client components: no filesystem access here. Build-time reads of
// the repo live in lib/repo.ts.
import plugin from '../../.claude-plugin/plugin.json'

export const site = {
  name: 'loupe',
  url: 'https://loupe.ashwinsathian.com',
  repo: 'https://github.com/AshwinSathian/loupe',
  version: plugin.version,
  released: '2026-10-26',
  updated: '2026-10-26',
  author: 'Ashwin Sathian',
  authorUrl: 'https://ashwinsathian.com/',
  description:
    'A Claude Code skill that reviews UI and UX against Apple’s Human Interface Guidelines, measures what it can, flags interfaces that look template-made, and proposes fixes and reworks with evidence. iOS, iPadOS, macOS and the web.',
  disclaimer:
    'loupe is an independent project. It is not affiliated with, endorsed by, or sponsored by Apple Inc. Apple, Human Interface Guidelines, Liquid Glass, SF Pro, SF Symbols, iOS, iPadOS and macOS are trademarks of Apple Inc.',
}

export const blob = (path: string) => `${site.repo}/blob/main/${path}`
export const tree = (path: string) => `${site.repo}/tree/main/${path}`

export const nav = [
  { href: '/method', label: 'Method' },
  { href: '/cases', label: 'Cases' },
  { href: '/testing', label: 'Testing' },
  { href: '/tools', label: 'Tools' },
  { href: '/specimen', label: 'Specimen' },
  { href: '/faq', label: 'FAQ' },
]

export const install = {
  skills: 'npx skills add AshwinSathian/loupe',
  plugin: '/plugin marketplace add AshwinSathian/loupe\n/plugin install loupe@loupe',
  symlink:
    'git clone https://github.com/AshwinSathian/loupe.git\nmkdir -p ~/.claude/skills\nln -s "$(pwd)/loupe" ~/.claude/skills/loupe',
}

const ids = {
  site: `${site.url}/#website`,
  person: `${site.url}/#author`,
  software: `${site.url}/#software`,
}

export const ogImage = {
  url: '/og.png',
  width: 1200,
  height: 630,
  alt: 'A loupe ring over an app screen, with measured contrast and target sizes marked in red.',
}

export const baseGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': ids.site,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: 'en-GB',
      publisher: { '@id': ids.person },
    },
    {
      '@type': 'Person',
      '@id': ids.person,
      name: site.author,
      url: site.authorUrl,
      sameAs: ['https://github.com/AshwinSathian'],
    },
    {
      '@type': ['SoftwareApplication', 'SoftwareSourceCode'],
      '@id': ids.software,
      name: site.name,
      alternateName: ['loupe skill'],
      description: site.description,
      url: site.url,
      codeRepository: site.repo,
      softwareVersion: site.version,
      dateModified: site.released,
      license: 'https://opensource.org/licenses/MIT',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'macOS, Linux, Windows',
      softwareRequirements: 'Claude Code',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      author: { '@id': ids.person },
    },
  ],
}

export const breadcrumb = (name: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: site.name, item: site.url },
    { '@type': 'ListItem', position: 2, name, item: site.url + path },
  ],
})

export const article = (headline: string, description: string, path: string) => ({
  '@context': 'https://schema.org',
  '@type': 'TechArticle',
  '@id': `${site.url}${path}#article`,
  headline,
  description,
  url: site.url + path,
  datePublished: site.released,
  dateModified: site.updated,
  inLanguage: 'en-GB',
  author: { '@id': ids.person },
  publisher: { '@id': ids.person },
  about: { '@id': ids.software },
  isPartOf: { '@id': ids.site },
})

// Per-page social metadata. Next replaces, not merges, a parent's openGraph, so
// each page carries the whole object.
export const social = (title: string, description: string, path: string) => ({
  openGraph: { type: 'website' as const, siteName: site.name, locale: 'en_GB', title, description, url: path, images: [ogImage] },
  twitter: { card: 'summary_large_image' as const, title, description, images: [ogImage.url] },
})
