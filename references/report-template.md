# Report template

Sections, in this order. Nothing is edited before the Offer is accepted.

## 1. Summary

Three lines: what was reviewed (unit, input, profile used), the verdict in one sentence, and the most important thing to do: the top rework if one cleared the bar, else the one or two findings that matter most.

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
- Blocker: needs one of: a measured or source-confirmed WCAG A/AA failure (1.4.3 text contrast; 1.4.11 non-text contrast 3:1 for component boundaries, counted only when the boundary is the component's sole visual identifier, with no fill, visible label or other cue marking the field; 2.5.8 targets after the spacing exception; 4.1.2 name/role/value, such as an icon button with no accessible name; a name that exists but is unhelpful, like a glyph read as "white star", is Major), an Apple MUST on a native Apple target whose breach makes the task fail, blocks an accessibility need, or risks App Review rejection, data loss, a Trust-gate item, or a task that cannot be completed in a release-stage build. Every other MUST caps at Major. On web, a native Apple rule with no WCAG criterion behind it shows Web in the Apple column and caps at Major. Judged issues (such as placeholder-only labels where an accessible name still exists) cap at Major. With `release_stage: development`, a dead control (no handler, no visible effect) is Major plus an Unverified line saying it may be unfinished; Blocker only when `release_stage` is `release`.
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
| 1 (example) | "Delete route" is the sheet's primary (default) button, sits exactly under the trigger, and the sheet has no Cancel; one tap deletes a saved route with no undo. Breaks Apple's Buttons rule "Don't assign the primary role to a button that performs a destructive action" | Route detail, overflow menu | Blocker | MUST | Give "Delete route" the destructive role, not primary; move it away from the trigger; add Cancel; offer Undo after the delete |
| 2 (example) | First tab is a "Home" feed repeating Routes and Saved as cards | Tab bar, Home | Major | SHOULD | Remove Home; make Routes the first tab, surface recent items there |
| 3 (example) | Section footers at 11 px on desktop web | Settings, footers | Minor | Web | Raise to 12 px, set in rem |
| 4 (example) | Two spellings in one screen: "Colour" label, "Favorite" button | Settings, Appearance | Minor | Taste | Pick profile spelling (british): "Favourite" |

## 3. Trust

Deceptive design, Blockers only: confirmshaming, fake urgency or scarcity, fake social proof, hidden costs, dark-pattern consent, invented counts or durations in copy. Placeholder or sample figures in a development build are not deceptive design: list them in Unverified. Each entry names element, screen, and the honest rewrite. If none: "No deceptive patterns found in what was seen."

## 4. Landscape

The category and the 3 to 6 products studied (name, why chosen, URL, date checked). Then four short lists, each item sourced: conventions to keep (users expect them; breaking them costs learnability), convergence to avoid (what every peer does that would make this product one more of them), frontier moves (what the best do now that this product lacks), and openings (what no peer does that this product's subject or audience would justify). Include the best peer's step count for the core task when the red team used it. Mark claims from memory `(unverified)`. If the landscape came from the profile cache, give its date.

## 5. Distinctiveness verdict

One of: authored / partly authored / default-assembled. Then evidence: the channels classified as platform default, library default, trend default, or authored (need at least two authored), the counted slop-catalog tells that support the verdict, the profile `direction` if set, and the logo-off and competitor-swap test results. If the profile has no direction, propose 2 to 3 here, each differing on at least two channels, derived from the product's subject and landscape, each with a theming sketch (color roles with candidate OKLCH values and computed contrast, type role map with open-licensed candidates, shape, motion tokens, iconography, signature element and moments, three voice samples) and one line per peer saying how it differs. No numeric score.

## 6. Type

One verdict block per face the product ships, in the format at the end of `references/augment/typography.md`, from `scripts/type-eval.js` and magnified specimens at the working sizes. Candidate faces in a theming sketch get the same block. Defects found here also go in the Findings table.

## 7. Reworks

Up to three structural changes, ranked by what they unlock. Each:

- **What changes**: the screen, flow, model or system, before and after in one or two sentences each.
- **Bar**: which rework-bar condition it clears (cluster, premise, peer gap, identity, system).
- **Evidence**: finding numbers, step counts against the named peer, measurements.
- **Cost**: screens and components touched, migration and learnability risk.
- **Unlocks**: what gets better for the user and what later work gets cheaper.
- **Smallest experiment**: how to test it before committing.

If none clears the bar: "No rework warranted:" and the reason in one line.

## 8. Enhancements

Up to 8 improvements with no defect behind them (fewer when the evidence is thin; say so), grouped by area (experience and flows, information architecture, visual design and theming, brand and identity, motion and feedback, content and voice, platform capabilities); only areas with evidence appear. Each names something in this product (a screen, its core action, its content, a landscape gap), its HIG principle (Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight), the mechanism, and what it unlocks. A theming or identity enhancement may carry a theming sketch. No house style; every concrete value carries its trace.

## 9. Unverified

States and behaviors not seen: stress states not driven, platforms not run, flows not reached, items recalled rather than measured, landscape claims not confirmed. One line each, with what would verify it. For screenshot-only input, name transient feedback and timing states by kind (toasts, loading and skeleton states, hover, focus, animation, error states), never one generic line.

## 10. Offer

Which findings can be fixed in code now, grouped (for example "all copy rewrites", "contrast tokens", "target sizes"), and ask before editing. Say which need design decisions first. Enhancements and reworks need the user's call: offer to build an enhancement, or a throwaway prototype of a rework's smallest experiment. Never ask for code: list, as optional, what more input (source, a running URL, a booted simulator) would let the skill verify.
