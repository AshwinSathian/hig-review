# Held-out blind round: pre-registration

Written 2026-10-26, before any review in this round was run. The decision rules below are fixed; results are published whether they pass or fail.

## Question

Does a review written with loupe 1.0.0 help more than a review written by the same model with no skill, on fixtures the skill's rules were never tuned against? And does loupe over-report on a well-built interface?

## Fixtures

Three fixtures in `fixtures/`, written for this round by separate model instances (Claude Sonnet) that were told not to read this repository, any design-review rule set, or any skill. A fourth instance, with the same restriction, checked each fixture in a browser, corrected the answer keys, and added real defects the authors had not planted. None of the domains appears in loupe's references or earlier fixtures.

| Fixture | What it is | Key |
|---|---|---|
| `web-sloppy` | Lendwell, a neighbourhood tool-lending library page (HTML, CSS, JS) | 10 planted defects plus 5 found by the checker |
| `web-good` | Split the check, a bill-splitting calculator built to be good (the control) | 0 Blocker, 0 Major, 3 Minor, 5 Polish, per the checker |
| `native` | Dosewise, a SwiftUI medication-reminder app (iOS 17 minimum, Xcode 26 toolchain), source only | 8 planted defects plus 6 found by the checker |

The keys are sealed: only their SHA-256 hashes are in `keys.sha256`. They are added to this folder after the tally, and anyone can check them against the hashes. After the keys were sealed, comments in `web-sloppy/index.html` that named the planted defects ("D1: ~2.2:1 on white") were removed; no code changed.

## Conditions and runs

Each fixture is reviewed under two conditions by three models (Claude Haiku, Sonnet and Opus): 3 × 3 × 2 = 18 reviews.

- **Baseline:** the model is asked for a thorough UI/UX and accessibility design review of the fixture and is told not to use any installed skill.
- **Skill:** the same request, with loupe's `SKILL.md`, `references/` and `scripts/` copied to a temporary folder (no `evals/`, no `research/`, no site) and the instruction to follow that SKILL.md.

Both conditions get the same tools: file reading, a shell, web search, and Playwright through a Node script (the Playwright MCP server cannot be shared by parallel runs). Neither gets the keys, this file, or the path of this repository. The user-facing questions loupe would normally ask are answered with "no answers; proceed on defaults", and web fixtures are reviewed as `release_stage: development`.

Every report is kept in `runs/<model>/<fixture>/<condition>.md`, with the model ID and the commit of the skill.

## Judging

For each model and fixture, the two reports are shown to judges as Report A and Report B, with the side chosen by a seeded shuffle (`make_pairs.py`, seed in `pairs.json`). Judges are three fresh instances: Claude Opus, Sonnet and Haiku. They see the fixture source, the two reports, and a neutral rubric; they do not see loupe's rules, the keys, or which report used the skill. Each answers:

1. Which report would you act on if you owned this product? A, B or tie, with a reason.
2. For each report, list the findings you judge wrong (the problem is not there) or inflated (rated more severe than the evidence supports).
3. For each report, list any Blocker (or equivalent "critical") that is not backed by a measured WCAG A/AA failure, a task that cannot be completed, or likely App Review rejection.

Separately, a scorer instance with the keys marks, for each report, which key items it found (recall) and, on `web-good`, which of its findings are not in the key and are wrong. The scorer does not see which condition wrote a report.

## Decision rules

1. **Preference.** Across the 9 pairs, loupe's report is preferred in at least 6 by at least 2 of the 3 judges.
2. **No over-reporting on the control.** On `web-good`, for each model, the number of loupe's findings judged wrong or inflated by at least 2 judges is no higher than the baseline's.
3. **Recall.** For each model, loupe's recall summed over `web-sloppy` and `native` is at least the baseline's.
4. **Restraint.** On `web-good`, loupe reports no Blocker and "No rework warranted" for at least 2 of the 3 models.

The round passes if all four hold. Each rule's result is reported separately, and a failed rule is reported as a loss with the pairs that caused it.

## Known limits, stated in advance

- Every author, checker, reviewer and judge is a Claude model. A human designer's judgement is not part of this round.
- loupe's reports have a recognisable structure (two tags per finding, fixed sections), so a judge may guess which report used the skill even though it is not told.
- One sample per cell. Model variance is not measured.
- The native fixture is source only: no simulator, no screenshots.
- The rules in loupe were revised during the audit that preceded this round. The fixtures were written after those revisions and were not used to tune them.
