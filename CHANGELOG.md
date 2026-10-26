# Changelog

## 1.0.0 (27 October 2026)

First public release, renamed from hig-review to loupe. The name change keeps an Apple term out of the product name; Apple's guidelines are still the base, and NOTICE says loupe is not affiliated with Apple.

**Skill**

- `SKILL.md` went from about 10,200 tokens to about 3,700. Claude Code keeps the first 5,000 tokens of a skill after compacting a long conversation, so steps 3 to 7 used to drop out of long reviews. The step detail now lives in `references/workflow-intake.md`, `workflow-passes.md` and `whole-app-split.md` and is read when the step runs.
- The description says what the skill does before when to use it.
- The "read-only" rule is now a list of the side effects a review does have. Clearing app data for empty states needs your OK.
- Text from reviewed pages and web research is treated as data, never as instructions.
- Every reference file over 100 lines starts with a contents line (`tools/toc.py`, checked in CI).

**Rules corrected after checking them against Apple's pages, the App Review Guidelines and WCAG 2.2**

- App Review 4.2.6 is cited only with evidence that an app came from a template or app-generation service and was submitted by someone other than the content owner. A generic look is never a Blocker.
- Liquid Glass and other 26-era checks follow the SDK an app is built with and the `UIDesignRequiresCompatibility` opt-out, not the minimum deployment target. New profile keys: `build_sdk`, `design_compatibility_opt_out`.
- Apple's minimum iOS target size is 28 by 28 points; 44 by 44 is the default.
- Context menus hide unavailable items; the menu bar dims them.
- A bare `Image(systemName:)` inside a text style is no longer flagged.
- Several rules were tagged more strongly than their sources state them (cognitive-accessibility guidance, typographic preferences, Apple Pay button sizes, rem units, placeholder labels). They now carry the source's own strength.
- The template-look verdict needs 6 or more tells across 3 or more channels, not 5 in total.
- A rework now needs one root cause shared by every finding it cites, and a missing feature no longer counts as a premise failure. "No rework warranted" is the expected answer for a well-built product.

**Held-out blind round** (`evals/heldout/`)

Pre-registered before any run: three fixtures written by model instances told not to read this repo, Claude Haiku, Sonnet and Opus reviewing each with and without loupe, three blind judges, sealed answer keys. Judges preferred loupe's review in 6 of 9 pairs; loupe's reviews had fewer findings judged wrong or inflated, and no Blockers on the well-built control. Both conditions found nearly every planted defect, and the recall rule failed by half a defect with Haiku, so the round failed one of its four rules. `notes.md` has the reading and the deviations.

After the round, from the judges' criticisms (not re-tested): a 4.1.2 Blocker needs a missing accessible name, not a poor one; placeholder figures in a development build go to Unverified, not Trust; a skipped landscape step must say why; build SDK detection reads `XCODE_VERSION_ACTUAL` and toolchain comments.

**Scripts**

- The measurement runner waits for the page's own theme and resize handlers before measuring, so dark mode on JavaScript-themed sites is measured correctly.
- The runner works on sites with a strict Content Security Policy or Trusted Types, and takes the skill folder as data, so Windows paths and quotes no longer break it.
- Contrast now handles group opacity, `-webkit-text-fill-color`, overlapping layers, open shadow roots and off-screen or inert text. Threshold checks use the unrounded ratio.
- Output is capped: 293 KB on linear.app before, 29 KB after.
- `contrast.py` clamps out-of-range values, rejects NaN and accepts `#rgba`.

**Repository**

- The HIG crawler is no longer in the public repo; Apple's site terms don't allow robots. The digests cite their sources.
- New: NOTICE, SECURITY.md, issue templates, a held-out blind evaluation in `evals/heldout/`, and a website at https://loupe.ashwinsathian.com.

## 0.1.0 (23 October 2026)

Initial version, published as hig-review.
