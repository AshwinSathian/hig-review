import { join } from 'node:path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // The site reads the skill's files (plugin.json, SKILL.md, references) from the repo root.
  turbopack: { root: join(__dirname, '..') },
}

export default nextConfig
