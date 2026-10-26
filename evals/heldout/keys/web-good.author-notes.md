# Split the check: control fixture notes

## Design decisions
- Identity: a printed restaurant check. Warm paper background, near-black ink, one brick-red accent, serif headings and totals (system serif stack), dotted leader rules between shares, a heavy rule above the check total. No gradients, icons, or hero.
- Purpose and first action are above the fold at 390 and 1440 px: title, one-sentence lede, "Start over", then step 1 form. Desktop is two columns with a sticky result panel; mobile is one column.
- Every input has a visible persistent label, a persistent hint, and an error slot; all are linked with aria-describedby (hint + error ids), and aria-invalid toggles on error. Failed submit moves focus to the offending field.
- Targets: all buttons, inputs, and assignment chips are at least 44 px tall (checked in the browser: 0 undersized).
- Focus: 3 px outline with offset in a dedicated token; forced-colors block uses Highlight/HighlightText for focus and the custom checkbox.
- Motion: only a 180 ms toast rise; disabled under prefers-reduced-motion.
- Money: tabular-nums everywhere amounts appear; integer cents internally (BigInt in allocation).
- Rounding: largest-remainder method. Each item is split among its assigned people, then tax and tip are split in proportion to each person's item subtotal. Spare cents go to whoever has the largest leftover fraction, ties to the person listed first. The result panel names who got each spare cent and on what (item, tax, tip); the copied summary repeats it. Shares always sum to the check total, and the panel prints that sum.
- Tip is a percentage of items before tax. Tax is the receipt's total tax amount.
- Items with nobody assigned are excluded from totals, flagged on the item and in the result.
- Persistence: localStorage (try/catch), restored on load. "Start over" is in the masthead. Deleting an item or person, and Start over, show a persistent toast with Undo and Dismiss (no timeout). Any later edit clears the undo, so Undo can never overwrite newer work.
- Empty states for no people, no items, and nothing assigned. Copy uses navigator.clipboard, confirms in a role=status region, and on failure opens the visible summary preview to select manually.

## Measured contrast (contrast.js, tokens parsed from index.html; full output in contrast-output.txt)
Light: ink/bg 15.26, ink/surface 17.05, muted/bg 6.58, muted/surface 7.35, button text 8.14, error/surface 7.43, toast 15.26; borders line/surface 3.78, line/bg 3.38; focus/bg 5.87, focus/surface 6.56, focus/chip fill 4.40.
Dark: ink/bg 15.05, ink/surface 13.73, muted/bg 7.91, muted/surface 7.22, button text 7.61, error/surface 8.18, toast 15.05; borders line/surface 4.47, line/bg 4.90; focus/bg 9.07, focus/surface 8.28.
All 38 checked pairs pass (text 4.5, UI 3). Lowest margin: light page-level border 3.38.

## Logic tests (test-logic.js; output in test-output.txt)
14 of 14 pass: 0 people, 0 items, unassigned item, 1 person, 3-way split of 10.00 (3.34/3.33/3.33, spare cent to first listed), tip 0 and tax 0, 2000 randomized cases where shares sum exactly to the total, allocate edge cases, parseMoney and parsePct rejecting blank, negative, garbage, zero price, over-limit, and more than 2 decimals, and summary text.
Browser smoke test at 390 px (Playwright over http): no console errors, no targets under 44 px, delete then Undo restores the item.

## Known residual imperfections
1. Polish: currency is hard-coded to USD with en-US formatting; no currency or locale setting.
2. Polish: tip is computed on items only (not after-tax) with no toggle, and the result copy does not say that apart from the hint under the field.
3. Minor: the Undo toast is a fixed overlay that can cover the lower part of the page while open; body has bottom padding to compensate, but it does not announce its action buttons beyond the status text. Also not verified in a real screen reader or Windows high-contrast mode (forced-colors CSS written but untested).
