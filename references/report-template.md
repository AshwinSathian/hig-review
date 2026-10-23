# Report template

Sections, in this order. Nothing is edited before the Offer is accepted.

## 1. Summary

Three lines: what was reviewed (unit, input, profile used), the verdict in one sentence, the one or two findings that matter most.

Then any assumptions (inferred profile keys, including `register`), and Run notes: tools used, evidence paths, and a summary of the measurement results, citing the file path if the harness saved the output to one.

## 2. Findings

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|

- A finding names the element and the screen (or route/file). "Improve hierarchy" is not a finding.
- Fix is concrete and, for copy findings, includes a rewrite in the product's voice.
- Sort by Impact (Blocker, Major, Minor, Polish), then the Apple column in this order: MUST, SHOULD, CONSIDER, Web, Research, Taste.
- Caps per unit: screen 15, flow 25, whole app 40, design system 30. Polish beyond the cap is grouped into one row ("+N polish: ..."). Do not drop higher-impact findings to fit; merge duplicates first.
- Under the table: `waived: N` (findings matched by profile waivers, not listed).

**Impact**
- Blocker: needs one of: a measured or source-confirmed WCAG A/AA failure (1.4.3 text contrast; 1.4.11 non-text contrast 3:1 for component boundaries, counted only when the boundary is the component's sole visual identifier, with no fill, visible label or other cue marking the field; 2.5.8 targets after the spacing exception; 4.1.2 name/role/value, such as an icon button with no accessible name), an Apple MUST on a native Apple target whose breach makes the task fail, blocks an accessibility need, or risks App Review rejection, data loss, a Trust-gate item, or a task that cannot be completed in a release-stage build. Every other MUST caps at Major. On web, a native Apple rule with no WCAG criterion behind it shows Web in the Apple column and caps at Major. Judged issues (such as placeholder-only labels where an accessible name still exists) cap at Major. With `release_stage: development`, a dead control (no handler, no visible effect) is Major plus an Unverified line saying it may be unfinished; Blocker only when `release_stage` is `release`.
- Major: feels wrong, non-native, or generic.
- Minor: noticeable roughness that does not hurt the task.
- Polish: refinement; first to be grouped.

**Apple**
- MUST: Apple writes must/never/always/don't, or App Review enforces it.
- SHOULD: avoid/prefer/use/important/crucial/essential and plain imperatives.
- CONSIDER: consider/can/may/if appropriate.
- Web: our translation of an Apple rule to the web.
- Research: from non-Apple literature where Apple is silent.
- Taste: our own anti-slop rule, not Apple's.

A check labelled "adds to Apple" shows the tag of the Apple line you cite from `references/apple/`; if you cannot cite one, it shows Research. An augment line's own [MUST] never counts as an Apple MUST (Trust-gate Blockers keep their own basis). A check labelled "Apple silent" shows Research (or Taste, if it is our own synthesis). A WCAG-backed web rule shows Web. A CONFLICT resolved toward Apple shows the Apple tag; resolved toward the outside source, Research; either way Fix names the resolution. A slop-cluster finding shows Taste with impact Major and sorts with the rest. A finding no rule covers shows Taste and says "reviewer judgement" in the Finding text. Copy the Apple tag verbatim from the cited reference line; never upgrade it.

Examples (illustrative only, fictional "Trailhead" hiking app):

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 (example) | "Delete route" confirm button sits exactly under the trigger and the sheet has no Cancel; one tap deletes a saved route with no undo | Route detail, overflow menu | Blocker | MUST | Move the destructive confirm away from the trigger, add Cancel, offer Undo for 8 s |
| 2 (example) | First tab is a "Home" feed repeating Routes and Saved as cards | Tab bar, Home | Major | SHOULD | Remove Home; make Routes the first tab, surface recent items there |
| 3 (example) | Section footers at 11 px on desktop web | Settings, footers | Minor | Web | Raise to 12 px, set in rem |
| 4 (example) | Two spellings in one screen: "Colour" label, "Favorite" button | Settings, Appearance | Minor | Taste | Pick profile spelling (british): "Favourite" |

## 3. Trust

Deceptive design, Blockers only: confirmshaming, fake urgency or scarcity, fake social proof, hidden costs, dark-pattern consent, invented counts or durations in copy. Each entry names element, screen, and the honest rewrite. If none: "No deceptive patterns found in what was seen."

## 4. Distinctiveness verdict

One of: authored / partly authored / default-assembled. Then evidence: the channels classified as platform default, library default, trend default, or authored (need at least two authored), the counted slop-catalog tells that support the verdict, the profile `direction` if set, and the logo-hidden and competitor-swap test results. If the profile has no direction, propose 2 to 3 here, each differing on at least two channels and derived from the product's subject. No numeric score.

## 5. Elevate

3 to 5 concrete moves toward craft, each tied to a HIG principle (Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight) and pointing at something in this product. Mechanism, never a borrowed look. No house style, palette, font list or motion preset.

## 6. Unverified

States and behaviors not seen: stress states not driven, platforms not run, flows not reached, items recalled rather than measured. One line each, with what would verify it. For screenshot-only input, name transient feedback and timing states by kind (toasts, loading and skeleton states, hover, focus, animation, error states), never one generic line.

## 7. Offer

Which findings can be fixed in code now, grouped (for example "all copy rewrites", "contrast tokens", "target sizes"), and ask before editing. Say which need design decisions first. Never ask for code: list, as optional, what more input (source, a running URL, a booted simulator) would let the skill verify.
