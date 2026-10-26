import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Repo root is one level above site/. Everything the site quotes from the
// skill is read from there at build time so it cannot drift.
export const REPO_ROOT = join(process.cwd(), '..')
export const readRepo = (path: string) => readFileSync(join(REPO_ROOT, path), 'utf8')
