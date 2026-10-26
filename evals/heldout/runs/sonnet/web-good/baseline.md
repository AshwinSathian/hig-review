<!-- model: claude-sonnet; skill commit: 7559367 -->

# Design review: "Split the check" (index.html, in development)

Assumptions (owner unavailable): audience is a group at a restaurant table, mostly on phones, US dollars, pre-release so no analytics or user research. I read the source and drove it in Chromium at 1280x800, 375x740 and dark mode, with real data (3 people, 4 items, tax, 18% tip, then 17 people). Screenshots are in the work/ folder.

## Verdict
This is a solid, restrained build. It has real labels, 44px targets, visible focus, error text tied to inputs, undo for destructive actions, dark mode, reduced-motion and forced-colors support, and no horizontal scroll at 375px. The arithmetic is exact: shares sum to the total, and spare cents are tracked. Problems are mostly in workflow gaps, focus handling and the results panel on small or crowded screens. I found no crash and no console errors.

## Findings

### High
1. **Invalid tax or tip is silently treated as 0 in the results.** Typing `4.1x` in Tax shows an error under the field, but the "Each person pays" panel keeps showing totals computed with $0 tax (`model()` uses `t.cents || 0`). The panel is far from the error on both desktop and mobile, so someone can read and share wrong amounts. Fix: when tax or tip is invalid, replace the totals with "Fix the tax amount to see totals" (or mark them "tax not included"), and make Copy summary disabled.
2. **Cannot edit an item or person.** A mistyped price or name means Delete, re-add, and re-tick every checkbox. This is the most likely mistake when copying a receipt. Fix: make name and price editable inline (tap to edit) or add an Edit button; renaming a person especially should keep assignments.
3. **Sticky results panel breaks with larger groups (desktop).** At 17 people the aside is 1902px tall in an 800px window and is `position: sticky; top: 16px`. Its lower part, including the check total, Copy button and spare-cent notes, can never scroll into view while the left column is shorter or the panel is pinned. Fix: add `max-height: calc(100vh - 32px); overflow: auto` to `.out`, or sticky only when it fits (put the total and Copy at the top of the panel).

### Medium
4. **Results are at the bottom of the page on mobile.** The headline answer ("what do I owe") is below four sections and every item card. Users must scroll past all items after each tick to see the effect. Fix: a compact sticky bottom bar on narrow screens showing the check total and a "See shares" link/anchor, or place a collapsed results summary right under the header.
5. **Focus is lost after "Everyone".** Pressing it re-renders the list and focus moves to `<body>` (confirmed: `BODY` is the active element). Keyboard and screen-reader users lose their place in a long list. Checkboxes restore focus via `data-key`; buttons (Everyone, tip presets after refresh) do not. Fix: give those buttons a `data-key` too. Also make Everyone a toggle (second press clears), since there is no quick "clear" and it is not clear which state it is in.
6. **Per-item "Split 3 ways: $10.34 / $10.33 / $10.33" does not say who pays which.** The amounts are in checkbox order but unlabeled. Fix: name them ("Ana $10.34, Ben $10.33...") or drop the per-person list and keep "3 ways, about $10.33 each".
7. **Spare-cent explanation is jargon and shown prominently.** "largest leftover fraction (ties go to the person listed first)... Ana +3¢ on Wine, tax, tip" is a long, dense paragraph in a small muted style, and it is displayed for almost every bill. Fix: one line ("5 cents didn't divide evenly and went to Ana, Ben and Cleo") and put the detail behind a disclosure, like the existing Preview.
8. **Red warning on every new item.** Each item added shows a bold red "Nobody assigned yet, so this is not counted" immediately, though that is the normal next step and the user has not made an error. Red also competes with real errors. Fix: neutral note until the user has moved on, or show it only in the results panel (where it already appears).
9. **Add button alignment relies on a magic number** (`margin-top: 28px` to sit beside the input). It aligns to the input only when no error/hint wraps; in the empty-submit screenshot the button floats at the input's height while the error text grows below, and on desktop the layout shifts when errors appear and disappear. Fix: use `align-items: end` on a wrapper that excludes the hint/error, or put hints below the row.
10. **Persistence is invisible.** State is saved to localStorage and reloaded next visit with no cue. A returning user, or the next person on a shared device, sees the old dinner. Start over exists but is in the header, far from the items and with an undo toast that disappears on the next change. Fix: a quiet "Saved on this device" note, and consider confirming or at least keeping undo longer; place Start over near the results.
11. **Undo toast vanishes on any state change** (`save()` clears it) and is not announced reliably: it is replaced via innerHTML in a `role=status` region, and undo then writes a separate sr-only "Restored." message. Screen-reader users may not hear "Removed Ana". Fix: keep a persistent live region and update its text; do not clear the toast on unrelated edits for a few seconds.

### Low
12. **Always-visible hints add noise.** "Up to 24 characters. Each name must be different." is shown permanently on a field everyone fills in without trouble; hints under the Tax/Tip fields wrap to three lines. Show length/uniqueness rules only when violated, keep the tax/tip hints short ("From the receipt. Blank = none").
13. **Tip semantics hidden in small text.** Tip is calculated on items before tax, which differs from many receipts' suggested tips; the only mention is a muted hint. Offer a "tip on pre-tax / post-tax" toggle or state it next to the presets.
14. **Tip presets and the Tip field don't read as one control.** The preset row sits below both inputs, and "No tip" sets "0" while a blank field also means no tip; the pressed state of "No tip" is only shown after typing. Place presets directly under the Tip field.
15. **Currency hard-coded to $** and `en-US` formatting; the label "Price ($)" and `$` stripping will confuse non-US users. Acceptable if US-only; otherwise detect locale or add a currency setting.
16. **Copy status disappears** whenever any input changes, because the results panel re-renders (and the status is rendered next to the button, easy to miss). Keep the "copied" note for a few seconds or on the button label itself ("Copied").
17. **Preview summary is collapsed** inside the sheet; summary text does not include the per-person item breakdown, which people usually want when sending to the group.
18. **Step markers** "1/2/3/=" are decoration (aria-hidden) and the "=" reads oddly; the order is also not enforced, so people may add items before people, and the "Add people above to assign" note covers that. Consider dropping the numerals or showing progress.
19. **Generic structure.** Visually the product is distinctive (warm paper palette, serif headings), so no template concerns; the small "GROUP DINNER" kicker adds little and could go.

## What works, keep it
- Contrast and focus rings are strong in light and dark.
- Touch targets are at least 44px; chips and checkboxes are generous.
- Clear empty states for every panel and plain-language validation messages.
- Money parsing is forgiving ($, commas) and results explain "Shares add up to".
- Keyboard flow: Enter submits and returns focus to the first field of the form.

## Priority order
1 (invalid tax/tip silently ignored), 3 (sticky panel overflow), 2 (no editing), 4 (results below fold on mobile), 5 (focus loss), then 6-11.
