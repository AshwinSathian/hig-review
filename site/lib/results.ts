import { pairs, resultMd } from './round'

// Summary of evals/heldout/result.md and notes.md. The numbers below are
// checked against the round's files at build time (see check()).
export const results = {
  headline: 'Blind judges preferred loupe’s review in 6 of 9 pairs',
  summary:
    'In a pre-registered blind round, three Claude judges preferred loupe’s review to one the same model wrote without it in 6 of 9 pairs. Both found nearly every planted defect; loupe’s had fewer findings judged wrong or inflated, and no Blockers on a well-built app. The round failed one of its four rules: recall, by half a defect with Haiku.',
}


const count = () => pairs().filter((p) => p.votes.filter((v) => v.prefer === 'loupe').length >= 2).length

// Fails the build if the headline, the summary, result.md and the judges' files disagree.
export const check = () => {
  const n = count()
  const said = (s: string) => Number(/(\d+) of 9/.exec(s)?.[1])
  const fromResult = Number(/\*\*(\d+) of 9\*\*/.exec(resultMd())?.[1])
  for (const [where, x] of [['headline', said(results.headline)], ['summary', said(results.summary)], ['result.md', fromResult]] as const) {
    if (x !== n) throw new Error(`${where} says ${x} of 9; the judges' files say ${n} of 9`)
  }
}

export const verdictFor = (model: string, fixture: string): string | null => {
  const p = pairs().find((x) => x.model === model && x.fixture === fixture)
  if (!p) return null
  const forLoupe = p.votes.filter((v) => v.prefer === 'loupe').length
  const against = p.votes.filter((v) => v.prefer === 'no skill').length
  return `Blind judges: ${forLoupe} of 3 preferred this report, ${against} preferred the one written without loupe.`
}
