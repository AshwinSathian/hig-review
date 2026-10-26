import { pairs } from './round'

// Summary of evals/heldout/result.md and notes.md. The numbers below are
// checked against the round's files at build time (see check()).
export const results = {
  headline: 'Preferred in 6 of 9 blind pairs. No more defects found.',
  summary:
    'In a pre-registered blind round, three Claude judges preferred loupe’s review to one the same model wrote without it in 6 of 9 pairs. Both found nearly every planted defect; loupe’s had fewer findings judged wrong or inflated, and no Blockers on a well-built app. The round failed one of its four rules: recall, by half a defect with Haiku.',
}

const count = () => pairs().filter((p) => p.votes.filter((v) => v.prefer === 'loupe').length >= 2).length

// Fails the build if the headline and the files disagree.
export const check = () => {
  const n = count()
  if (n !== 6) throw new Error(`results.ts says 6 of 9; the round's files say ${n} of 9`)
}

export const verdictFor = (model: string, fixture: string): string | null => {
  const p = pairs().find((x) => x.model === model && x.fixture === fixture)
  if (!p) return null
  const forLoupe = p.votes.filter((v) => v.prefer === 'loupe').length
  const against = p.votes.filter((v) => v.prefer === 'no skill').length
  return `Blind judges: ${forLoupe} of 3 preferred this report, ${against} preferred the one written without loupe.`
}
