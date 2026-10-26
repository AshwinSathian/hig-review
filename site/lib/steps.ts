import { readRepo } from './repo'

// Step names and numbers are read from SKILL.md's "### N. Name" headings, so
// they can't drift; the one-line descriptions are written for people. The build
// fails if the skill gains, loses or renames a step without this file changing.
const bodies: Record<string, string> = {
  '0': 'Settles what is under review (a screen, a flow, the whole app or a design system) and what it has to work from.',
  '1': 'Reads your design docs, tokens and manifests, asks what it can’t find in one batch, and saves a .loupe.md once you confirm it.',
  '1b': 'Researches your category and 3 to 6 peers, with sources and dates, so proposals reflect what the best products do now.',
  '2': 'On the web: contrast, targets, type and motion at three widths, light and dark, reduced motion on and off. On Apple platforms: the source, and the simulator if one is running.',
  '3': 'Tries the states demos skip: empty, error, offline, long text, the largest text size, right-to-left.',
  '4': 'Nine passes against Apple’s guidance, ending with a red team that attacks the premise, the flows and its own draft.',
  '5': 'Splits a large app across subagents, then merges the results with a fresh red team.',
  '6': 'Findings with two tags, the landscape, a distinctiveness verdict, up to three reworks, and what it couldn’t verify.',
  '7': 'Edits nothing until you pick findings by number. Then fixes those and measures again.',
}

export const steps = () => {
  const found = [...readRepo('SKILL.md').matchAll(/^### (\w+)\. (.+)$/gm)].map(([, n, name]) => ({ n, name }))
  const missing = found.filter((s) => !bodies[s.n]).map((s) => s.n)
  const extra = Object.keys(bodies).filter((n) => !found.some((s) => s.n === n))
  if (missing.length || extra.length) throw new Error(`lib/steps.ts is out of step with SKILL.md: ${[...missing, ...extra].join(', ')}`)
  return found.map((s) => ({ ...s, body: bodies[s.n] }))
}
