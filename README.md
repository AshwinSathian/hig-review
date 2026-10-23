# hig-review

hig-review is a Claude Code skill that reviews UI and UX against Apple's Human Interface Guidelines and Apple's other design literature (WWDC sessions, the Apple Style Guide, App Review rules, WebKit guidance). Other research (NN/g, Baymard, GOV.UK, WCAG, Material, Fluent and the craft canon) only adds to Apple's position, and each such check says whether it adds to an Apple rule, covers ground Apple leaves open, or conflicts with Apple.

It reviews a screen, a flow, a whole app, or a design system, for iOS, iPadOS, macOS, iPhone Duo and the web, in SwiftUI, UIKit, React, Next.js, React Native, Expo, Angular, Vue or plain HTML/CSS/JS. It looks hardest for the template look that AI-built and copied UI converges on, and it does not push any look in its place, Apple's included. Findings carry two tags: user impact, and how strongly Apple states the rule. After the findings come 3 to 5 moves that would make the work feel crafted, a list of what it could not verify, and an offer to fix chosen findings in code. It edits nothing until you pick.

## Install

Inside Claude Code:

```
/plugin marketplace add AshwinSathian/hig-review
/plugin install hig-review@hig-review
```

The repo is private, so this needs GitHub access to it.

Or clone and symlink it into your skills folder, so pulling the repo updates the live skill:

```bash
git clone https://github.com/AshwinSathian/hig-review.git
ln -s "$(pwd)/hig-review" ~/.claude/skills/hig-review
```

To try it without installing: `claude --plugin-dir /path/to/hig-review`.

Running web apps are measured through the Playwright MCP server (the `playwright` plugin, or any server exposing `browser_*` tools). Without it, the skill works from screenshots and source and marks measured checks as unverified. Native screenshots use `xcrun simctl` when a simulator is booted.

## Running it

Ask in plain words, from the repo you want reviewed:

- "Review the checkout flow at http://localhost:3000/cart through to the confirmation page."
- "Do a HIG review of SettingsView.swift and the screens it pushes."
- "Audit our design system: tokens in src/styles/tokens.json and the components in src/ui."
- "Whole-app design review of this Expo app. A simulator is running it."
- "Does this landing page look AI-made?" (with a screenshot)

On the first run in a repo, the skill drafts a `.hig-review.md` profile from your design docs, tokens and manifests (purpose, audience, platforms, deployment targets, density, brand, voice, waivers), asks about the gaps in one batch, and writes the file only after you confirm it. Later runs reuse it. Edit it by hand whenever you like; `references/profile-template.md` documents every key.

## Refreshing the HIG snapshot

The reference files are paraphrased digests of a crawl taken on 2026-10-23. Raw HIG text is Apple's and stays out of the repo. To refresh:

1. Crawl into a dated folder outside the repo: `bash tools/crawl.sh ~/hig-snapshots/2027-04-23`. This fetches every page as JSON and converts it to markdown under `md/`.
2. Diff against the last snapshot: `python3 tools/diff_snapshot.py ~/hig-snapshots/2026-10-23/md ~/hig-snapshots/2027-04-23/md`. It prints added, removed and changed page slugs.
3. Update the affected digests in `research/digests/` and the matching files in `references/` by hand (with Claude's help), keeping the strength tags and the `(26+)` and `(unverified)` markers.
4. Check that no number was lost: `python3 tools/check_numbers.py research/digests/<digest>.md references/<file>.md --allow tools/allow/<file>.txt`. It exits 1 and prints any number in the digest that is missing from the reference.
5. Bump the `Snapshot:` line in each reference file you changed, and `catalog-date` in `references/slop-catalog.md` if you revised the catalog.

`python3 tools/test_tools.py` tests the tools. To test the scripts (`measure.js` and the runner against fixtures in Playwright, plus both contrast scripts): `npm install && npx playwright install chromium && npm test`.

## What's in here

```
.claude-plugin/         plugin manifest and self-hosted marketplace
SKILL.md                the workflow: profile, intake, stress states, passes, report, fixes
references/apple/       Apple digests: principles and platforms, visual, content and accessibility,
                        patterns, structural and presentation components, inputs and technologies,
                        literature beyond the HIG
references/augment/     non-Apple literature, one file per area, each check labelled against Apple
references/slop-catalog.md     anti-pattern catalog, dated, separate from Apple-derived rules
references/writing.md   UI copy rules, voice method, string checks
references/web-mapping.md      how Apple rules translate to the web
references/profile-template.md the .hig-review.md profile and how each key is used
references/report-template.md  report sections, tags, caps
scripts/measure.js      in-page measurement (contrast, targets, type, motion, template tells)
scripts/measure-runner.js  one Playwright call measuring every width, color scheme and motion setting
scripts/png_contrast.py   contrast from a screenshot region
scripts/contrast.py       contrast for color pairs (tokens, native color values)
evals/                  review evals and their results
research/digests/       source digests the references were built from
tools/                  HIG crawl, DocC-to-markdown converter, snapshot diff, number check
test/                   script tests and fixtures
docs/specs/             design spec
```

## License

MIT. See `LICENSE`.
