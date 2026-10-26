import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { REPO_ROOT, readRepo } from './repo'

export type Case = {
  slug: string
  fixture: string // folder under evals/heldout/fixtures and runs/<model>/
  title: string
  kind: string
  summary: string
  input: string
}

const all: Case[] = [
  {
    slug: 'lendwell',
    fixture: 'web-sloppy',
    title: 'Lendwell, a tool-lending library',
    kind: 'Web page with planted defects',
    summary:
      'A one-page app for borrowing tools from a neighbourhood library, with ten defects planted by a model that was told not to read loupe’s rules and five more found by a checker.',
    input: 'Running page in Chromium (HTML, CSS and JavaScript source available)',
  },
  {
    slug: 'split-the-check',
    fixture: 'web-good',
    title: 'Split the check',
    kind: 'Control: a well-built web app',
    summary:
      'A bill-splitting calculator built to be good, checked by a second model that found no Blocker and no Major. The question here is whether loupe invents problems.',
    input: 'Running page in Chromium (HTML, CSS and JavaScript source available)',
  },
  {
    slug: 'dosewise',
    fixture: 'native',
    title: 'Dosewise, a medication reminder',
    kind: 'SwiftUI app, source only',
    summary:
      'A small iPhone app with eight planted defects and six more found by the checker, built against the iOS 26 SDK with an iOS 17 minimum. No simulator: loupe read the Swift source.',
    input: 'SwiftUI source, Info.plist and project file',
  },
]

export const MODELS = ['opus', 'sonnet', 'haiku'] as const

const runPath = (model: string, fixture: string, cond: 'skill' | 'baseline') =>
  `evals/heldout/runs/${model}/${fixture}/${cond}.md`

export const report = (model: string, fixture: string, cond: 'skill' | 'baseline') => {
  const p = runPath(model, fixture, cond)
  return existsSync(join(REPO_ROOT, p)) ? { path: p, md: readRepo(p) } : null
}

export const cases = () => all
export const getCase = (slug: string) => all.find((c) => c.slug === slug)
