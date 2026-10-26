<!-- model: claude-opus; skill commit: 7559367 -->

# Design review: "Split the check" (splitcheck/index.html)

## Scope, method, defaults

- **Product:** a single-page web app for splitting a restaurant bill. You add people, add items, tick who had each item, enter tax and tip, and get per-person totals with cent-exact rounding. It saves to localStorage, has undo for destructive actions and has a copyable text summary.
- **Method:** I read the whole source and drove it in Chromium with Playwright at 1280×800 (light), and at 390×844 in light and dark. I scripted probes for focus, validation, undo, sticky layout and contrast. Scripts and screenshots are in `work/`.
- **Defaults I assumed, since the owner was unavailable:**
  1. The main use is on a phone at the table, right after the check arrives. Desktop is secondary.
  2. The app is US-centric: dollars, tax entered as an amount, tip as a percentage before tax.
  3. "Exact to the cent" is the product's core promise. So anything that makes the total disagree with the paper receipt counts as a serious problem.
  4. It is in development, so missing features are listed as recommendations, not defects.

**Overall:** the build is well made. Every control is at least 44 px. Labels, hints, `aria-describedby`, `aria-invalid`, focus rings and forced-colors support are all there. Reduced motion is respected and dark mode is solid. The calculation is a correct largest-remainder method on integer cents. The warm "receipt paper" look with serif headings is distinctive, not template-generic. The problems are mostly about **trusting the numbers**, **phone ergonomics**, and a few **keyboard focus bugs**.

Severity scale: **Critical** (breaks the core promise) · **High** (common task is hurt) · **Medium** (friction or an a11y defect with a workaround) · **Low** (polish).

---

## Critical

### C1. "Check total" doesn't match the receipt while any item is unassigned, and the full tax is pushed onto everyone else
- **What happens:** Unassigned items are left out of the subtotal, but the tax amount you typed (the receipt's whole tax) is still spread across only the assigned items.
- **Reproduced:**
  - Pizza costs $20 and is shared by Ana and Ben. Wine costs $30 and is unassigned. Tax is $5 and tip is 20%.
  - The result says **"Check total $29.00"** with each person at $14.50, including $2.50 tax.
  - The real bill is $50 + $5 tax. The pizza's fair share of tax is $2.00, not $5.00.
- **Why it matters:**
  - The label "Check total" invites people to compare it with the receipt, and it won't match.
  - Anyone who copies the summary early sends overcharged amounts. The red "Not included…" line is small and sits below the fold on a phone.
- **Fix:**
  - Don't show any shares (or the Copy button) as final while items are unassigned. Change the panel to "2 items still need someone. Shares so far:" with the totals visibly marked provisional. Or disable **Copy summary** until everything is assigned.
  - Prorate tax over the *receipt* subtotal (all items), so assigned people only carry their own tax share. Report the unassigned remainder ("$3.00 tax belongs to unassigned items") instead of reallocating it.
  - Rename the total "Assigned so far" until everything is assigned, and use "Check total" only after that.

### C2. An invalid tax or tip value silently counts as $0 / 0% in the results
- **What happens:** `model()` uses `t.cents || 0`. While the Tax field shows an error, the shares are recalculated with **tax $0.00** and still look final. I confirmed this: typing "12." gives the error *and* the result "items $40.00 + tax $0.00 + tip $0.00".
- **Why it matters:** A user can glance at the results panel (on desktop it's beside the form, and the error may be off-screen) and copy wrong totals.
- **Fix:** If tax or tip is invalid, replace the results with "Fix the tax amount to see each share", or dim them and disable Copy. Never compute with an assumed value the user didn't enter.

---

## High

### H1. Live validation shows errors in the middle of normal typing
- **What happens:** Tax and Tip are validated on every keystroke, and the patterns reject a trailing decimal point. Typing "12.50" shows "Use numbers only, with up to 2 decimals" at "12.". Typing "17.5" in Tip shows "Use a number like 18 or 17.5" at "17.". Typing "1,000" shows an error at "1,0".
- **Why it matters:** Users are told they're wrong while doing exactly what the hint asks. Combined with C2, the totals also jump to $0 tax for a moment.
- **Fix:**
  - Accept partial input while typing (a trailing `.` or an incomplete thousands group) and only show errors on blur or Enter.
  - Better still, reject impossible characters as they're typed and validate fully on blur.

### H2. On a phone, the answer is ~3,000 px down the page
- **What happens:** Below 900 px, "Each person pays" comes after every item card and the tax section. With 4 people and 4 items the page is about 3,040 px tall at 390 px wide. Every checkbox tap changes the totals out of sight.
- **Why it matters:** This is the main context (assumption 1). The user can't see the effect of a tap and has to scroll down to check and back up to edit.
- **Fix:**
  - Add a compact sticky bottom bar on small screens, such as "Ana $26.27 · Ben $26.26 · … ▸ See split". Tapping it jumps to (or opens a sheet with) the full result.
  - At minimum, show a running "Assigned $71.50 of $78.75 · 1 item unassigned" status near the top.
  - Also consider a step-by-step flow on phones (People → Items → Tax/Tip → Result), since the sections are already numbered 1–3 and "=".

### H3. You can't edit people or items, only delete them
- **What happens:** Fixing a typo in a price ($18.00 → $16.00) or a name means deleting and re-adding, which **throws away all of that item's assignments**.
- **Why it matters:** Receipt entry is error-prone, so this will happen on almost every bill.
- **Fix:** Make the item name and price editable in place (tap to edit, Enter to save, Escape to cancel), and the same for person chips. Keep the assignments.

### H4. On desktop, the sticky result panel hides its own bottom half
- **What happens:** `.out` is `position: sticky; top: 16px` with no height limit. With 8 people and 12 items, the panel is taller than the viewport. **Copy summary** stayed off-screen at scroll positions 0, 1000 and 2000 px, and only appeared near the end of a 4,000 px page (verified by script).
- **Fix:** Add `max-height: calc(100vh - 32px); overflow: auto` to `.out`, or keep only the totals list sticky and let the details scroll. Also put Copy summary above the long spare-cents explanation.

---

## Medium

### M1. Keyboard focus is lost after "Everyone" and after "Undo"
- **Everyone:** It re-renders the items list, but this button has no `data-key`, so focus falls to `<body>` (verified). A keyboard or screen-reader user is sent back to the top of the page after each use.
  - **Fix:** Give it `data-key="all-<itemId>"`.
- **Undo:** It removes the toast that contained the focused button, so focus lands on `<body>` (verified).
  - **Fix:** After undo, focus the restored element (the restored item's Delete button or person chip), or at least the related input.

### M2. Undo is hard to reach by keyboard and disappears without warning
- **Hard to reach:** After a delete, focus moves to the Item field. The Undo button sits in a fixed toast at the end of the DOM, and it took **15 Tabs** from the Item field to reach it.
- **Disappears:** Any later edit, such as typing one character in Tax or ticking a box, calls `save()` and silently removes the undo option (verified).
- **Fix:**
  - Support Ctrl/⌘+Z for the last destructive action.
  - Keep the undo available until the next *destructive* action, not until any edit.
  - Consider moving focus to the Undo button for "Start over", which wipes everything.

### M3. Placeholders look like real values
- **What happens:** The placeholder colour is `--muted` (#5b544a, 7.3:1). That's good for hints but too strong for placeholders. In the screenshots, "0.00" in Price and "e.g. Ana" look like entered text, and an empty Price field reads as "0.00 already filled".
- **Fix:**
  - Drop the "0.00" and "0" placeholders. The labels and hints already say what to enter.
  - Or use a lighter placeholder tone that still passes 4.5:1. The current one is far above that, so there's room.

### M4. Only equal splits, percentage-only tip, pre-tax-only tip
- **Missing split options:** Real bills include "I had 2 of the 3 beers", a discount or comp, an automatic service charge, or a tip in dollars. The engine already supports weighted shares (`allocate(total, weights)`), but the UI only offers equal ticks.
- **Recommendations (in priority order):**
  1. A quantity or weight per person on an item, e.g. long-press a chip to show "×2".
  2. A "Tip $ / %" switch.
  3. A "tip on total after tax" option.
  4. A discount line.
  These are feature gaps for a build in development, not defects.

### M5. The spare-cents explanation is long and technical
- **What happens:** "…handed out, one at a time, to whoever had the largest leftover fraction (ties go to the person listed first): Ana +2¢ on tax, tip; Ben +1¢ on tax…". It's four lines of text for differences of a few cents, and it appears on almost every bill.
- **Why it matters:** It is honest, but it pushes the Copy button down and reads as alarming.
- **Fix:** Shorten it to "Shares differ by up to 1¢ so they add up exactly. Details" and put the full explanation behind a disclosure. Do the same in the copied summary.

### M6. Tip presets are announced as independent toggle buttons, not one choice
- **What happens:** They're `aria-pressed` buttons, but they behave as single-select, and pressing the active one doesn't un-press it.
- **Fix:** Use a radio group (`role="radiogroup"` with `role="radio"` and `aria-checked`, plus arrow-key movement), or real radio inputs styled as segments. Also consider showing the tip amount in dollars next to the selection ("18% = $12.87").

---

## Low

- **L1. Inconsistent verbs:** People use "Remove" and items use "Delete" for the same kind of action. Pick one. "Remove" fits both, and undo exists.
- **L2. Person chips are wordy:** Every chip reads "Ana Remove". With 8 or more people, that's a wall of the word "Remove". Use an × icon with the existing `aria-label="Remove Ana"` and a visible hover/focus state.
- **L3. "Everyone" doesn't show its state:** It stays the same when everyone is already ticked, and there is no "Clear". Make it a toggle ("Everyone" ↔ "Clear"), or disable it when everyone is already ticked.
- **L4. Hints are always visible:** "Up to 24 characters. Each name must be different." and "Total tax on the receipt. Blank means none." add clutter on every visit.
  - Shorten them, or keep only the validation messages. `maxlength` already enforces the length.
  - `maxlength` silently cuts off pasted text, so a counter near the limit would help.
- **L5. Duplicate item names are allowed:** "Beer", "Beer" makes the per-item notes and the spare-cents line ambiguous ("on Beer, Beer"). Either allow it but add a number automatically ("Beer (2)"), or warn.
- **L6. "Start over" sits right next to the title:** On mobile it's a full-size button directly under the intro. It is undoable, which softens this. Consider moving it to the end of the results, or making it a quieter text button.
- **L7. The restored bill isn't flagged:** Coming back the next day silently shows the previous bill. A one-line "Continuing your last split · Start over" makes it clear the data is saved.
- **L8. The copied summary only has totals:** Friends often ask "what's in my $26.27?". Add each person's breakdown (items + tax + tip) to the summary, and offer `navigator.share` on mobile next to Copy.
- **L9. Currency and locale are fixed:** "$" and en-US formatting are hard-coded, and "12,50" is rejected (the message is clear). This is fine under assumption 2, but note it before any non-US release.
- **L10. Contrast is borderline in light mode:** Input and checkbox borders are `--line` #8a8173, which is 3.38:1 on the page background and 3.78:1 on the card surface. That passes the 3:1 minimum for UI components but is close to it. Darkening slightly would give more margin in glare at a restaurant table. Everything else measured well: muted text 7.35:1, accent 7.28:1, error text 7.43:1, focus ring 5.87:1, and dark mode is comfortable.

---

## What's working (keep it)

- **Exact cents, explained:** It's cent-exact and says so. Each person's line shows items + tax + tip, and "Shares add up to $X" acts as a self-check.
- **Undo instead of confirm dialogs:** Destructive actions use undo. Error messages are specific and suggest a fix.
- **Input basics:** `inputmode="decimal"`, Enter submits each add form, and focus returns to the input for fast repeated entry.
- **Accessibility:** Strong overall, with real labels, fieldset/legend for "Who had it?", status regions, forced colors, reduced motion and 44 px targets.
- **Visual identity:** It's coherent and suits the subject. The receipt-like result sheet with a serif total is a nice touch.

---

## Suggested fix order

1. **C1 and C2:** Never show or copy totals that don't reconcile with the receipt or the inputs.
2. **H1:** Validate as the user types without false errors.
3. **H2:** A sticky totals bar on mobile.
4. **H3:** Inline editing of items and people.
5. **H4 and M1:** Fix the sticky panel overflow and the focus bugs (both small CSS/JS changes).
6. **M2–M6:** Then the remaining Medium items.
7. **Low items:** Polish as time allows.
