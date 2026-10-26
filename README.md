# loupe

[![CI](https://github.com/AshwinSathian/loupe/actions/workflows/ci.yml/badge.svg)](https://github.com/AshwinSathian/loupe/actions/workflows/ci.yml) [![License: MIT](https://img.shields.io/github/license/AshwinSathian/loupe)](LICENSE) [![Release](https://img.shields.io/github/v/release/AshwinSathian/loupe)](https://github.com/AshwinSathian/loupe/releases)

loupe is a Claude Code skill that reviews UI and UX against Apple's Human Interface Guidelines and the research around them. It measures what it can in the running app, says how strongly Apple states each rule it cites, and flags interfaces that look like every other template. It covers iOS, iPadOS, macOS, iPhone Duo and the web, in SwiftUI, UIKit, React, Next.js, React Native, Expo, Angular, Vue or plain HTML.

**[loupe.ashwinsathian.com](https://loupe.ashwinsathian.com)** · [Method](https://loupe.ashwinsathian.com/method) · [Cases](https://loupe.ashwinsathian.com/cases) · [How it was tested](https://loupe.ashwinsathian.com/testing) · [Contrast checker and bookmarklet](https://loupe.ashwinsathian.com/tools)

> loupe is an independent project. It is not affiliated with, endorsed by, or sponsored by Apple Inc. See [NOTICE](NOTICE).

## Install

```bash
npx skills add AshwinSathian/loupe
```

Or inside Claude Code:

```
/plugin marketplace add AshwinSathian/loupe
/plugin install loupe@loupe
```

Or clone and symlink it, so `git pull` updates the skill:

```bash
git clone https://github.com/AshwinSathian/loupe.git
mkdir -p ~/.claude/skills
ln -s "$(pwd)/loupe" ~/.claude/skills/loupe
```

To try it without installing: `claude --plugin-dir /path/to/loupe`. As a plugin the skill is named `loupe:loupe`; it also loads on its own when you ask for a design review.

Measuring a running web app needs the Playwright MCP server (the `playwright` plugin, or any server exposing `browser_*` tools). Without it, loupe works from source and screenshots and lists the measured checks as unverified. Native screenshots use `xcrun simctl` when a simulator is booted. The bundled scripts need Python 3.9 or later; Node is only needed to run the tests.

## Using it

Ask from the repo you want reviewed:

- "Review the checkout flow at http://localhost:3000/cart through to the confirmation page."
- "Do a design review of SettingsView.swift and the screens it pushes."
- "Audit our design system: tokens in src/styles/tokens.json and the components in src/ui."
- "Whole-app review of this Expo app. A simulator is running it."
- "Does this landing page look AI-made?" (with a screenshot)

The first time, loupe drafts a `.loupe.md` profile from your design docs, tokens and manifests (purpose, audience, platforms, build SDK, density, brand, voice, waivers), asks about the gaps in one batch, and writes the file only after you confirm it. Edit it whenever you like; [references/profile-template.md](references/profile-template.md) documents every key.

## What a review contains

Each finding names the element and the screen (or file and line) and carries two tags. Impact is Blocker, Major, Minor or Polish, and a Blocker needs evidence of one of these: a measured or source-confirmed WCAG A/AA failure; an Apple MUST on a native app whose breach stops the task, blocks an accessibility need or risks App Review rejection; data loss; deceptive design; or a task that can't be finished in a release build. The Apple column says how strongly Apple states the rule (MUST, SHOULD or CONSIDER, copied from Apple's wording), or marks the check as Web, Research or Taste.

After the findings: the category landscape (3 to 6 peers, with sources), a distinctiveness verdict with theming sketches when the product has no direction yet, a measured verdict for each typeface, up to three reworks (only when the evidence clears a stated bar; "no rework warranted" is the usual answer for a well-built product), up to 8 enhancements, and a list of what it couldn't verify. loupe edits nothing until you pick findings to fix, and then measures again.

## What a review touches

Before you pick fixes, loupe writes only the `.loupe.md` you confirm. It does have side effects, listed in each report's run notes: Playwright saves screenshots to `.playwright-mcp/`; simulator appearance and text size are changed while capturing and then restored; error and offline states are simulated in the browser and undone; clearing app data for empty states needs your OK first. The landscape step searches the web; say "no web" to skip it.

Text that loupe reads from your pages and from the web reaches the model as evidence. The skill treats it as data and never as instructions, but don't point it at pages you wouldn't paste into a chat.

## Testing

`npm install && npx playwright install chromium && npm test` runs the measurement scripts against fixtures in Chromium, plus the contrast scripts and the maintenance tools. CI runs the same on every pull request.

The review itself was tested in a pre-registered blind round on three fixtures written by model instances that never saw loupe's rules: a flawed web page, a well-built web app, and a SwiftUI app. Claude Haiku, Sonnet and Opus each reviewed every fixture with and without loupe, and three Claude judges compared the pairs without being told which was which.

- Judges preferred loupe's review in 6 of 9 pairs.
- Both conditions found nearly every planted defect. loupe did not find more; the round's recall rule failed by half a defect with Haiku, so the round failed one of its four rules.
- loupe's reviews had fewer findings judged wrong (24 against 38) or inflated (40 against 52), and no Blockers on the well-built app, where the reviews without it put 10 findings in their top severity tier.

Everything is in [evals/heldout/](evals/heldout/): the pre-registration, fixtures, all 18 reports, the judges' answers, the keys, and [notes on the result](evals/heldout/notes.md). The `evals/cases.md` cases are earlier development tests on fixtures the rules were tuned against.

## What's in here

```
SKILL.md                   the workflow and the rules (under 5,000 tokens)
references/workflow-*.md   detail for each step, loaded when the step runs
references/apple/          paraphrased digests of Apple's guidance, tagged MUST / SHOULD / CONSIDER
references/augment/        outside research, each check labelled against Apple; red team, landscape, typography
references/slop-catalog.md dated catalog of template tells, kept apart from Apple's rules
references/writing.md      interface copy rules
scripts/                   measure.js and its runner, type-eval.js, contrast.py, png_contrast.py
research/digests/          the source digests the references were built from, with their sources
evals/                     review evals: development cases and the held-out blind round
tools/                     snapshot diff, number check, contents check
site/                      the website (not part of the skill)
```

## Keeping the Apple digests current

The digests paraphrase a snapshot of the HIG taken on 23 October 2026, with short attributed quotations. The maintainer refreshes them by hand against developer.apple.com; the repo does not ship a crawler. To check that no number was lost when a reference file is edited: `python3 -I tools/check_numbers.py research/digests/<digest>.md references/<file>.md --allow tools/allow/<file>.txt`. After editing a reference file, run `python3 -I tools/toc.py` to refresh its contents line.

If a rule is wrong or out of date, [open an issue](https://github.com/AshwinSathian/loupe/issues/new/choose) with the Apple page and what it says now.

## License

MIT for the code and the original text. Quoted and summarised material from Apple and other sources stays with its owners; see [NOTICE](NOTICE).
