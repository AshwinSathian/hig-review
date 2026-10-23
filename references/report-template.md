# Report template

Sections, in this order. Nothing is edited before the Offer is accepted.

## 1. Summary

Three lines: what was reviewed (unit, input, profile used), the verdict in one sentence, the one or two findings that matter most.

## 2. Findings

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|

- A finding names the element and the screen (or route/file). "Improve hierarchy" is not a finding.
- Fix is concrete and, for copy findings, includes a rewrite in the product's voice.
- Sort by Impact (Blocker, Major, Minor, Polish), then the Apple column in this order: MUST, SHOULD, CONSIDER, Research, Taste, Web.
- Caps per unit: screen 15, flow 25, whole app 40, design system 30. Polish beyond the cap is grouped into one row ("+N polish: ..."). Do not drop higher-impact findings to fit; merge duplicates first.
- Under the table: `waived: N` (findings matched by profile waivers, not listed).

**Impact**
- Blocker: task fails, data loss, accessibility failure, App Review rejection risk, or deceptive design.
- Major: feels wrong, non-native, or generic.
- Minor: noticeable roughness that does not hurt the task.
- Polish: refinement; first to be grouped.

**Apple**
- MUST: Apple writes must/never/always/don't, or App Review enforces it.
- SHOULD: avoid/prefer/use/important/crucial/essential and plain imperatives.
- CONSIDER: consider/can/may/if appropriate.
- Research: from non-Apple literature where Apple is silent.
- Taste: our own anti-slop rule, not Apple's.
- Web: our translation of an Apple rule to the web.

A check labelled "adds to Apple" shows the tag of the Apple rule it adds to. A check labelled "Apple silent" shows Research (or Taste, if it is our own synthesis). A CONFLICT shows the Apple tag, with the resolution named in Fix.

Examples (illustrative only, fictional "Trailhead" hiking app):

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 (example) | "Delete route" confirm button sits exactly under the trigger and the sheet has no Cancel; one tap deletes a saved route with no undo | Route detail, overflow menu | Blocker | MUST | Move the destructive confirm away from the trigger, add Cancel, offer Undo for 8 s |
| 2 (example) | First tab is a "Home" feed repeating Routes and Saved as cards | Tab bar, Home | Major | SHOULD | Remove Home; make Routes the first tab, surface recent items there |
| 3 (example) | Two spellings in one screen: "Colour" label, "Favorite" button | Settings, Appearance | Minor | Web | Pick profile spelling (british): "Favourite" |
| 4 (example) | Section footers at 11 px on desktop web | Settings, footers | Polish | Web | Raise to 12 px, set in rem |

## 3. Trust

Deceptive design, Blockers only: confirmshaming, fake urgency or scarcity, fake social proof, hidden costs, dark-pattern consent, invented counts or durations in copy. Each entry names element, screen, and the honest rewrite. If none: "No deceptive patterns found in what was seen."

## 4. Distinctiveness verdict

One of: authored / partly authored / default-assembled. Then evidence: the channels classified as platform default, library default, trend default, or authored (need at least two authored), the counted slop-catalog tells that support the verdict, the profile `direction` if set, and the logo-hidden and competitor-swap test results. If the profile has no direction, propose 2 to 3 here, each differing on at least two channels and derived from the product's subject. No numeric score.

## 5. Elevate

3 to 5 concrete moves toward craft, each tied to a HIG principle (Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight) and pointing at something in this product. Mechanism, never a borrowed look. No house style, palette, font list or motion preset.

## 6. Unverified

States and behaviors not seen: stress states not driven, platforms not run, flows not reached, items recalled rather than measured. One line each, with what would verify it.

## 7. Offer

Which findings can be fixed in code now, grouped (for example "all copy rewrites", "contrast tokens", "target sizes"), and ask before editing. Say which need design decisions first.
