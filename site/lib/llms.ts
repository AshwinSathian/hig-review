import { faqs } from './faqs'
import { readRepo } from './repo'
import { results } from './results'
import { install, site } from './site'

const pages = [
  ['/', 'Overview', 'What loupe is, a finding under the loupe, the two tags, the steps of a review, install.'],
  ['/method', 'Method', 'Apple first, outside research labelled against Apple, what it measures, the rules quoted from SKILL.md, the rework bar.'],
  ['/cases', 'Cases', 'Full reports on three held-out fixtures from three Claude models, next to reviews written without the skill.'],
  ['/testing', 'Testing', 'The pre-registered blind round: method, every pair, results and losses.'],
  ['/tools', 'Tools', 'A WCAG contrast checker and a bookmarklet that runs loupe’s measurement script on any page.'],
  ['/specimen', 'Specimen', 'This site’s own design system, measured, and loupe’s review of the site.'],
  ['/faq', 'FAQ', 'Apple affiliation, web apps, measurement, code changes, models, privacy.'],
]

const summary = () => `# ${site.name}

> ${site.description}

- Version: ${site.version} (released ${site.released})
- Licence: MIT, free
- Author: ${site.author} (${site.authorUrl})
- Source: ${site.repo}
- Install: \`${install.skills}\`
- ${site.disclaimer}
- Testing: ${results.summary}`

export const llmsTxt = () => `${summary()}

## Pages

${pages.map(([path, name, about]) => `- [${name}](${site.url}${path}): ${about}`).join('\n')}

## Source files

- [SKILL.md](${site.repo}/blob/main/SKILL.md): the skill itself
- [Pre-registration](${site.repo}/blob/main/evals/heldout/preregistration.md) and [results](${site.repo}/blob/main/evals/heldout/result.md) of the blind round
- [Changelog](${site.repo}/blob/main/CHANGELOG.md)

## Full text

- [llms-full.txt](${site.url}/llms-full.txt): the summary, install, FAQ and SKILL.md in one file
`

export const llmsFullTxt = () => `${summary()}

## Install

\`\`\`
${install.skills}
\`\`\`

Or inside Claude Code:

\`\`\`
${install.plugin}
\`\`\`

## Questions and answers

${faqs.map((f) => `### ${f.q}\n\n${f.a}`).join('\n\n')}

## The skill, verbatim (SKILL.md)

${readRepo('SKILL.md').replace(/^---[\s\S]*?---\n/, '')}`
