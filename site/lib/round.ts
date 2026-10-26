import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { REPO_ROOT, readRepo } from './repo'

// The held-out blind round, read from evals/heldout/ at build time.
type Judge = { prefer: 'A' | 'B' | 'tie'; reason: string; wrong: Record<'A' | 'B', string[]>; inflated: Record<'A' | 'B', string[]>; unbacked_blockers: Record<'A' | 'B', string[]> }
type PairKey = { model: string; fixture: string; A: string; B: string }

const H = 'evals/heldout'
const has = (p: string) => existsSync(join(REPO_ROOT, H, p))
const json = <T,>(p: string): T => JSON.parse(readRepo(`${H}/${p}`))

export const JUDGES = ['opus', 'sonnet', 'haiku'] as const
export const ready = () => has('result.md') && JUDGES.every((j) => has(`judge-${j}.json`))

export const pairs = () => {
  const key = json<{ pairs: Record<string, PairKey> }>('pairs.json').pairs
  const judges = Object.fromEntries(JUDGES.map((j) => [j, json<Record<string, Judge>>(`judge-${j}.json`)]))
  return Object.entries(key)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, k]) => {
      const side = (s: 'A' | 'B') => (k[s] === 'skill' ? 'loupe' : 'no skill')
      const votes = JUDGES.map((j) => {
        const a = judges[j][name]
        const flagged = (s: 'A' | 'B') => a.wrong[s].length + a.inflated[s].length
        const skillSide = k.A === 'skill' ? 'A' : 'B'
        const baseSide = skillSide === 'A' ? 'B' : 'A'
        return {
          judge: j,
          prefer: a.prefer === 'tie' ? 'tie' : side(a.prefer),
          reason: a.reason,
          flaggedSkill: flagged(skillSide),
          flaggedBase: flagged(baseSide),
        }
      })
      return { name, ...k, votes }
    })
}

export const resultMd = () => readRepo(`${H}/result.md`)
export const preregMd = () => readRepo(`${H}/preregistration.md`)
