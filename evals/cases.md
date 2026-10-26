# Eval cases

Each case runs in a fresh subagent. Run a baseline first (skill not available), then with the skill. Fixtures live in evals/fixtures/; answer keys live in evals/keys/. Run reviewers on a temp copy of the fixture; never give them the repo path. Answer keys (evals/keys/*.md) are for the scorer only and must never be shown or mentioned to the reviewer.

## Setup

Serve sloppy-app (cases A, B):

```
python3 -m http.server 8765 --directory evals/fixtures/sloppy-app
```

Reviewer URL: `http://localhost:8765/index.html`. The planted problems and expected findings are in evals/keys/sloppy-app.md (10 planted problems P1-P10, plus 3 bonus items).

Case C setup: copy sloppy-app to a temp directory containing no `.loupe.md` and no brand docs (no README, DESIGN.md, tokens), and run the reviewer from that directory:

```
T=$(mktemp -d) && cp evals/fixtures/sloppy-app/index.html "$T"/ && cd "$T"
```

## Case A: whole-page review via Playwright

- Input: "Review the whole page at http://localhost:8765/index.html." Reviewer has Playwright.
- Run: baseline without the skill, then with the skill.
- Pass: catches at least 80% (8 of 10) of the planted problems with specific locations; distinctiveness verdict is "default-assembled"; zero findings a reviewer would call generic; enhancements, reworks and directions tie to the page's subject (surf, tide, swell, buoys), and none match the slop catalog.

## Case B: one screenshot only

- Input: one screenshot of sloppy-app (full page, 1280 px wide), no URL, no code.
- Run: baseline, then with the skill.
- Pass: findings plus an Unverified list naming states and behaviours it could not check (toast, skeleton, hover, focus, dark mode, accessible names, targets); no request for code.

## Case C: no profile, no brand docs

- Input: "Review this page and tell me if it looks generic", run from the temp copy created in Setup (no `.loupe.md`, no brand docs).
- Run: baseline, then with the skill.
- Pass: asks only the gaps, in one batch; then proposes 2 to 3 directions that differ on at least 2 channels (accent color, neutrals, typeface treatment, shape and radius, icon style, imagery, motion, copy voice, layout idiom, signature interaction).

## Case D: SwiftUI snippet set

- Input: review evals/fixtures/swiftui/ContentView.swift and AppTabView.swift (project settings in project.pbxproj). Do not show evals/keys/swiftui.md.
- Run: baseline, then with the skill.
- Pass: no Playwright attempt; flags gray, non-vibrant text on material (not as Liquid Glass in content), the "+" action tab, and the hard-coded color; gates Liquid Glass checks on the target read from the fixture (26.0).

## Scoring

For each run record:

- Recall: planted problems found / 10 (case A; SwiftUI items 1-4 for D). A problem counts only if the finding names the element and the screen/file.
- Specificity: findings that name element plus screen (or file) / total findings.
- Generic-noise count: findings with no element-level evidence, or generic principle names (e.g. "improve hierarchy"). Target 0.
- Proposal guardrail: every enhancement, rework and direction checked against references/slop-catalog.md; any match fails. Also check each ties to the subject.
- Case C only: proposed directions differ on at least 2 channels pairwise, and the questions came in a single batch limited to real gaps.
- Case B only: Unverified list present and specific; zero requests for code.
- Case D only: any Playwright/browser call against the reviewed app is an automatic fail (a specimen page built to measure fonts or colors is allowed); Liquid Glass findings cite the target read from the fixture.

## Case E: red team, landscape and proposals (sloppy-app)

- Input: "Review this page and tell me if it looks generic, and tell me what it would take to make it best-in-class.", run from a temp copy as in case C. Reviewer has web tools.
- Run: baseline (skill at the commit before this case was added), then with the skill.
- Pass: a Landscape section studies at least 3 real products with URLs and dates, one from an adjacent domain; at least one rework clears a named rework-bar condition (expected: premise, since a marketing-template shell wraps a forecast tool, or cluster) and gives finding numbers, cost and a smallest experiment; up to 8 enhancements (fewer when the evidence is thin, said so), each naming something in Swell (tide, swell period, buoys, breaks) or a landscape gap; directions carry a theming sketch (color roles with OKLCH candidates and computed contrast, type role map with open-licensed faces, motion tokens) plus one line per studied peer; nothing in a sketch matches references/slop-catalog.md; a Type section gives a verdict block for the page's face (its stack starts with Inter, which is never loaded: the block must say what actually rendered); recall on the 10 planted problems does not drop below case C's.

## Case F: restraint (SwiftUI)

- Input: as case D, with web tools available.
- Run: baseline, then with the skill.
- Pass: case D's pass conditions still hold; any rework names its bar condition and finding numbers (the custom tab bar cluster, findings sharing one root cause, is the expected candidate); no rework proposed without a bar condition; no app-wide visual overhaul proposed on a two-file input; enhancements trace to the surf subject or the landscape. A report that writes "No rework warranted" with a reason also passes.

Scoring for E and F: count reworks with and without a valid bar condition (target: 0 without), enhancements that would fit any product (target: 0), landscape claims without a source (target: 0), and hedged rows ("consider", "may want to") left after the softness audit (target: 0).
