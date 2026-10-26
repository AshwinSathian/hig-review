# Answer key: Split the check (web-good, CONTROL)

Checked in Chromium (Playwright) at 320, 390 and 1440 px, light and dark (`colorScheme` emulation), reduced motion on. No console errors. Scenario: Ana, Ben, Cy; Pizza $10.00 shared by all, Wine $7.99 Ana only, tax $1.73, tip 18%. Result 14.46 + 4.25 + 4.25 = 22.96 = 17.99 + 1.73 + 3.24 (hand-checked, largest remainder correct). Every visible text node in every state measured >= 4.5:1 (computed colour vs nearest opaque background); 0 targets under 44x44 at 390 (24x24 is the AA floor); no horizontal scroll at 320; focus ring 3 px solid #0b5cad light / #8ab8ff dark, visible on custom checkboxes via `:has()`.

## Defects

| id | defect | where | evidence | standard | severity |
|----|--------|-------|----------|----------|----------|
| G1 | Keyboard focus drops to `<body>` after activating "Everyone", "Undo" or "Dismiss": the focused button is destroyed by a re-render and focus is not restored (focus restoration only covers checkboxes via `data-key`) | `refresh()`, `renderAll()`, `toast()` handlers | `document.activeElement` = BODY after each, measured | WCAG 2.4.3 Focus Order (spirit); keyboard/SR users lose their place | Minor |
| G2 | Validation errors submitted with Enter are not announced to screen readers: focus is already in the field so `.focus()` is a no-op, and the error `<p>` is not a live region (changing aria-describedby content is not re-read) | `personForm` / `itemForm` onsubmit, `setErr()` | Enter in Name with a duplicate name: focus stays on #pName, error text + aria-invalid set, nothing live | WCAG 4.1.3 Status Messages (arguable; 3.3.1 itself passes) | Minor |
| G3 | (author #3, agreed) Undo toast is a fixed overlay that can partly cover focused controls near the viewport bottom (no `scroll-padding-bottom`), and it sits last in the DOM, so after a delete (focus moved to the input) a keyboard user must tab through the whole page to reach Undo | `#toast`, `destructive()` | Bar ~56 px tall, 16 px from bottom; partial, never full, cover, so 2.4.11 (AA) passes | WCAG 2.4.12 (AAA); HIG undo discoverability | Minor |
| G4 | Result panel re-renders on every edit: an open "Preview summary" `<details>` collapses and the "Summary copied" status is wiped; share totals update silently (no polite summary for SR users) | `renderResult()` via `refresh()` | From code: `#result` innerHTML replaced on every refresh | Nielsen visibility of system status | Polish |
| G5 | While any item is unassigned, the row labelled "Check total" is not the check total, and the whole receipt tax is spread over the assigned items only | `compute()`, `renderResult()` | Warning text is shown, so it is transient and disclosed | Labels match content | Polish |
| G6 | Assignment checkboxes are named only by the person ("Ana") inside a legend "Who had it?" that does not include the item name; in forms mode every item sounds the same | `renderItems()` fieldset/legend | | WCAG 2.4.6 (best practice) | Polish |
| G7 | (author #1, agreed) Currency hard-coded to USD / en-US | `fmt()` | | i18n | Polish |
| G8 | (author #2, agreed) Tip is on pre-tax items only, no toggle; only the hint says so | tip field | | Clarity | Polish |

Counts: Blocker 0, Major 0, Minor 3, Polish 5. Still a valid control.

## Checker fixes
None. No Blocker and no Major found, so index.html is unchanged.

## Looks unusual but is fine (do not flag)
1. Custom `appearance:none` checkboxes in pill labels: still native inputs (Space toggles, checked state exposed), border 3.78:1 light / 4.47:1 dark, focus ring drawn on the label via `:has(input:focus-visible)`, forced-colors handled.
2. Delete person/item and "Start over" have no confirmation dialog: each gives a persistent Undo toast that is cleared only by a later edit, which is the better pattern for reversible actions.
3. `--rule` hairlines (#d9d1c1, about 1.4:1) and the muted step numerals: the hairlines are decorative separators (1.4.11 does not apply), the numerals are `aria-hidden` decoration, and the checked chip also gets an ink border. "Remove" buttons with `aria-label="Remove Ana"` pass 2.5.3 because the visible word is contained in the name.
