# Eval cases

Each case runs in a fresh subagent. Run a baseline first (skill not available), then with the skill. Fixtures and answer keys live in evals/fixtures/. Answer keys (ANSWER-KEY.md) are for the scorer only and must never be shown or mentioned to the reviewer.

## Setup

Serve sloppy-app (cases A, B):

```
python3 -m http.server 8765 --directory evals/fixtures/sloppy-app
```

Reviewer URL: `http://localhost:8765/index.html`. The planted problems and expected findings are in evals/fixtures/sloppy-app/ANSWER-KEY.md (10 planted problems P1-P10, plus 3 bonus items).

Case C setup: copy sloppy-app to a temp directory containing no `.hig-review.md` and no brand docs (no README, DESIGN.md, tokens), and run the reviewer from that directory:

```
T=$(mktemp -d) && cp evals/fixtures/sloppy-app/index.html "$T"/ && cd "$T"
```

## Case A: whole-page review via Playwright

- Input: "Review the whole page at http://localhost:8765/index.html." Reviewer has Playwright.
- Run: baseline without the skill, then with the skill.
- Pass: catches at least 80% (8 of 10) of the planted problems with specific locations; distinctiveness verdict is "default-assembled"; zero findings a reviewer would call generic; Elevate ideas tie to the page's subject (surf, tide, swell, buoys), and none match the slop catalog.

## Case B: one screenshot only

- Input: one screenshot of sloppy-app (full page, 1280 px wide), no URL, no code.
- Run: baseline, then with the skill.
- Pass: findings plus an Unverified list naming states and behaviours it could not check (toast, skeleton, hover, focus, dark mode, accessible names, targets); no request for code.

## Case C: no profile, no brand docs

- Input: "Review this page and tell me if it looks generic", run from the temp copy created in Setup (no `.hig-review.md`, no brand docs).
- Run: baseline, then with the skill.
- Pass: asks only the gaps, in one batch; then proposes 2 to 3 directions that differ on at least 2 channels (accent color, neutrals, typeface treatment, shape and radius, icon style, imagery, motion, copy voice, layout idiom, signature interaction).

## Case D: SwiftUI snippet set

- Input: review evals/fixtures/swiftui/ContentView.swift and AppTabView.swift (project settings in project.pbxproj). Do not show ANSWER-KEY.md.
- Run: baseline, then with the skill.
- Pass: no Playwright attempt; flags glass in content, the "+" action tab, and the hard-coded color; gates Liquid Glass checks on the target read from the fixture (26.0).

## Scoring

For each run record:

- Recall: planted problems found / 10 (case A; SwiftUI items 1-4 for D). A problem counts only if the finding names the element and the screen/file.
- Specificity: findings that name element plus screen (or file) / total findings.
- Generic-noise count: findings with no element-level evidence, or generic principle names (e.g. "improve hierarchy"). Target 0.
- Elevate guardrail: every Elevate idea and direction checked against references/slop-catalog.md; any match fails. Also check each ties to the subject.
- Case C only: proposed directions differ on at least 2 channels pairwise, and the questions came in a single batch limited to real gaps.
- Case B only: Unverified list present and specific; zero requests for code.
- Case D only: any Playwright/browser call is an automatic fail; Liquid Glass findings cite the target read from the fixture.
