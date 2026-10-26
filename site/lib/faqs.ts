export const faqs: { q: string; a: string }[] = [
  {
    q: 'Is this Apple’s tool, or endorsed by Apple?',
    a: 'No. loupe is an independent open-source project. It paraphrases Apple’s published Human Interface Guidelines and links to them; Apple has nothing to do with it.',
  },
  {
    q: 'Does it work for web apps that aren’t trying to look like Apple’s?',
    a: 'Yes. On the web it uses Apple’s reasoning (hierarchy, feedback, restraint, accessibility) as the default and translates platform rules where they apply, but it never asks a site to look like Apple’s. A web rule that comes only from Apple and has no WCAG criterion behind it can be Major at most, never a Blocker.',
  },
  {
    q: 'What does it need to measure a web app?',
    a: 'The Playwright MCP server, so Claude can open the page. Without it loupe still reviews source and screenshots, and lists every measured check it couldn’t run under Unverified.',
  },
  {
    q: 'Does it change my code?',
    a: 'Not until you ask. Before then the only file it writes is .loupe.md, the project profile, and only after you confirm it. It writes a report, and after you pick findings by number it edits only those, then measures again. It never commits unless you ask.',
  },
  {
    q: 'Can it review a native app without a simulator?',
    a: 'Yes, from source. With a booted simulator it also captures screens in light and dark and at large text sizes, and restores the simulator settings afterwards.',
  },
  {
    q: 'Why does it say “no rework warranted” so often?',
    a: 'Because a structural rework has to clear a stated bar: three or more findings with one root cause that row-by-row fixes can’t remove, a primary screen that doesn’t serve the product’s purpose, a measured gap against a named peer, a template identity, or fixes that can’t be made consistent without a token layer. A well-built product usually clears none of them.',
  },
  {
    q: 'Which models does it work with?',
    a: 'It was tested with Claude Haiku, Sonnet and Opus. The testing page has the results for each. The skill format is an open standard, so other agents that read SKILL.md files can load it, but only Claude Code was tested.',
  },
  {
    q: 'Is the HIG content up to date?',
    a: 'The digests paraphrase a snapshot of the HIG from 23 October 2026, including the iOS 26 Liquid Glass guidance and iPhone Duo. Each reference file says its snapshot date. If you find a rule that has changed, open an issue with the Apple page.',
  },
  {
    q: 'Does it send my code or pages anywhere?',
    a: 'Only to the model you are already using in Claude Code. The landscape step searches the web for your product’s category; say “no web” to skip it. The tools on this site run entirely in your browser.',
  },
]
