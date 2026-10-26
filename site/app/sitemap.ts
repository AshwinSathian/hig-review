import type { MetadataRoute } from 'next'
import { cases } from '@/lib/cases'
import { nav, site } from '@/lib/site'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return ['', ...nav.map((n) => n.href), ...cases().map((c) => `/cases/${c.slug}`)].map((path) => ({
    url: site.url + path,
    lastModified: site.updated,
    priority: path ? 0.8 : 1,
  }))
}
