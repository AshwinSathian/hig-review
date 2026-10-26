<!-- model: claude-haiku; skill commit: 7559367 -->

# Design review: Split the check (splitcheck/index.html)

## Scope and defaults

- Reviewed: the single file `splitcheck/index.html` (HTML, CSS and JS, about 500 lines), driven in Chromium through Playwright.
- No product owner was available, so these defaults were used:
  - Audience: a group at a restaurant table, usually on a phone, splitting one bill.
  - Target: WCAG 2.2 AA, phone widths (320 to 430 px) and desktop, light and dark system themes.
  - Build status: development. Findings are ranked for pre-release fixing.
- Evidence: scripts and screenshots are in `work` (`run.js`, `invalid.js`, `contrast.js`, and PNGs of desktop, mobile, empty and 320 px states).
- Math check: I worked a 4-item, 3-person, tax and tip example by hand. The displayed shares ($19.63, $16.79, $8.87) and the spare-cent allocation are correct, and shares sum exactly to the $45.29 total. The core calculation is sound.

## Summary

The core product works and looks deliberate: clear three-step flow, exact-cent allocation, a receipt-like result sheet, correct math, and good baseline accessibility. The most serious problem is that invalid tax or tip input silently removes tax and tip from every share and from the copied summary. The second group is mobile layout (the answer is far from the inputs) and screen-reader and focus behaviour.

## Findings

Severity: **High** = wrong money, blocked task, or a11y failure for a common path. **Medium** = friction or real confusion. **Low** = polish.

### High

**H1. Invalid tax or tip silently zeroes them in every share.** (Verified.)
- `model()` uses `t.cents || 0` and `p.pct || 0`. When the field shows an error, the result still computes, with tax or tip set to 0.
- Repro: items $20.00, tax 2.00, tip 20 gives a bill of $26.00. Typing "20." in tip shows "Use a number like 18 or 17.5." and the bill drops to $22.00. Typing "2." in tax drops the bill to $20.00.
- "Copy summary" stays enabled and copies the wrong totals.
- Change: when tax or tip is invalid, show the last valid values with a visible warning in the result ("Tax is not counted until fixed"), or disable Copy and mark the result as incomplete. Never show a total that silently omits a field.

**H2. Live validation fires on half-typed numbers.**
- Tax and tip validate on every `input` event. "3." and "17." produce errors while the user is still typing, and `aria-invalid` flips on and off.
- Change: validate on blur and on submit, or accept a trailing decimal point as a valid partial state. Keep the H1 fix so the total still reflects the last valid value.

**H3. Focus is lost after "Everyone" and after "Undo".** (Verified.)
- After clicking "Everyone", `document.activeElement` is `BODY`. `refresh()` re-renders the item list, and only checkboxes carry `data-key`, so focus restoration skips these buttons.
- After "Undo", focus is also `BODY`, because the toast (and its button) is removed.
- Keyboard and switch users lose their place in the list.
- Change: restore focus to the same control after re-render (give "Everyone" a `data-key` too), and after Undo move focus to the restored item or to the heading of its section.

**H4. Screen-reader users get no feedback on the result, and the item legend is ambiguous.** (Verified: the legend is the same text on every item.)
- The result panel and per-item splits update through `innerHTML` with no live region. Ticking a checkbox changes the totals silently.
- Every item's fieldset has the legend "Who had it?", so the checkboxes for "Ana", "Ben" and "Cy" are announced without the item name.
- Change: use `<legend>Who had the Margherita pizza?</legend>` (or `aria-label` on the fieldset). Add a polite live region that announces a short message after a change ("Each share updated. Total $45.29."), not the whole panel.

**H5. On mobile, the answer is two screens below the inputs.** (Verified: on a 390 px viewport the result starts at y=2171 px, document height is 2895 px, with only 4 items.)
- With more items the result recedes further. While editing, nobody sees the running total.
- Change: on narrow screens, add a sticky bottom bar ("Check total $45.29 · See shares") that opens or jumps to the result, or show a compact total under the step 2 heading. The bar must not cover the Undo toast (the toast is already at the bottom).

### Medium

**M1. The undo toast vanishes on the next tick and never times out.** (Confirmed in code.)
- `save()` calls `toast("")`, so ticking any checkbox or typing in tax or tip removes Undo. Undo therefore survives only until the next action of any kind.
- The bar stays visible indefinitely and sits over the bottom of the page.
- Change: keep Undo for about 6 to 8 seconds, or until another destructive action, and do not clear it on checkbox changes. Provide a visible dismiss (already present).

**M2. The assignment UI does not scale.**
- Each item repeats one pill per person plus an "Everyone" button. With 8 people and 10 items that is 80 pills. The people limit is 30, so one item could show 30 pills.
- On a phone, "Everyone" wraps to its own line in every card (seen in the 390 px screenshot).
- Change: on desktop, a matrix (items as rows, people as columns, one checkbox per cell, sticky headers). On phone, either keep the cards but use a "Who had it?" disclosure, or a per-person view ("What did Ana have?"). At minimum, put "Everyone" in the same row as the pills at a fixed width.

**M3. Per-item split text does not say who pays the extra cent.** (Verified: the note reads "Split 2 ways: $6.25 / $6.25", without names.)
- With an odd split, for example $6.26 and $6.25, the reader cannot tell who got the extra cent.
- Change: name the amounts ("Ana $6.26 · Ben $6.25"), or show the note only when the split is uneven.

**M4. The spare-cent explanation is jargon.** (Seen in the result panel.)
- "Splitting does not always divide evenly, so 3 spare cents were handed out, one at a time, to whoever had the largest leftover fraction (ties go to the person listed first)" is accurate but hard to scan.
- Change: "3¢ went to Ben and Cy so the shares add up exactly." Move the detail into the preview or a disclosure.

**M5. Persistence is silent.** (Verified: the state survives a reload.)
- Names, items and prices are saved to `localStorage` under `splitcheck.v1`, and reloading restores them. Nothing on the page says this, and a second person on a shared device sees the previous bill.
- Change: a small "Saved on this device" note near "Start over", and keep Start over as the clear action.

**M6. Focus after deleting an item jumps to the top form.** (Verified: focus moves to `#iName`.)
- Deleting item 6 moves focus to the "Item" field at the top of the page.
- Change: move focus to the next item's delete button, or to the list heading when the list becomes empty.

**M7. Tax is a dollar amount but tip is a percentage.** This is a defensible choice, but the two fields use different units and a user with a receipt that shows "8.25%" must convert by hand.
- Change: accept a percent for tax as well, or label the tax hint "Dollar amount from the receipt, not a percentage".

### Low

**L1. Placeholders look like values.** The empty tax field shows "0.00" and the empty tip field shows "0" as placeholders (seen in the empty-state screenshot). Make the placeholder visibly different (for example "none") or use an empty field with the hint carrying the default.

**L2. Blank tip and "No tip" disagree.** A blank tip counts as 0%, but no preset is highlighted (`aria-pressed` is false for "No tip" when the field is empty). Either highlight "No tip" when blank or state "Blank means no tip" in the hint.

**L3. The sticky result panel is not capped.** On a short laptop screen (height under about 700 px) a tall result sheet with many people can be taller than the viewport and cannot be fully read. Add `max-height: calc(100vh - 32px); overflow: auto` to `.out`.

**L4. Control shapes are mixed.** Person and item checkboxes are pills, while "Everyone", "Delete" and "Remove" are rectangles. "Everyone" reads like a fourth person. Give it a distinct treatment (outline text button or a different row position).

**L5. The step marker "=" for the result is unclear.** It reads as a glyph, not a step. Use "4", or drop the number and keep the heading.

**L6. Tax hint wraps to three lines in the narrow field.** At desktop width the tax hint ("Total tax on the receipt. Blank means none.") wraps awkwardly under a 140 px field. Shorten it or let the two fields share a row with the hints below.

**L7. Undo after Start over is the only recovery path.** This is fine, but the "Everything cleared" toast should say what was cleared ("Cleared 3 people and 4 items.") so the user knows what Undo will restore.

## What works (keep)

- Math: largest-remainder allocation, exact to the cent, and the sum of shares equals the bill. Tested by hand.
- Contrast (computed, WCAG): muted text 6.6:1 on the light background and 7.9:1 on dark; input and control borders 3.4:1 light and 4.9:1 dark (passes the 3:1 non-text rule); error text 7.4:1 and 8.2:1; focus ring 5.9:1 and 9.1:1; accent button text 8.1:1 and 7.6:1. The divider colour (`--rule`, 1.5:1) is decorative only and is labelled as such in the CSS.
- Touch targets: every button, checkbox pill and summary is at least 44 px (no violations found by script).
- No horizontal overflow at 320, 390 or desktop widths. No console errors or page errors in the flow.
- Escapes user text in every `innerHTML` path, and guards `localStorage` in try/catch.
- Honours `prefers-reduced-motion`, `forced-colors` and `prefers-color-scheme`. The dark palette reads well in the rendered check.
- Visual hierarchy: serif step headings, a receipt-like result sheet, and restrained colour make the result the strongest element on desktop.

## Priority order for the fix

1. H1 (invalid tax or tip zeroes totals and copy) and H2 (validate on blur), as one change.
2. H3 and H4 (focus restoration, legends, live region).
3. H5 (mobile total bar).
4. M1, M3, M5 (undo lifetime, uneven-split names, saved-on-device note).
5. M2 (matrix or per-person view), then the remaining medium and low items.

## Caveats

- Playwright was run against Chromium only. Safari and Firefox were not tested, so the `:has()` pill styling and the forced-colors behaviour are unverified outside Chromium.
- Screen-reader output was inferred from the DOM and ARIA attributes, not tested with VoiceOver or NVDA.
- The contrast figures were computed from the hex values in the stylesheet.
