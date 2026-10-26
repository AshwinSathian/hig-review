# Answer key: Lendwell (web-sloppy)

| id | defect | where | why | standard | severity |
|----|--------|-------|-----|----------|----------|
| D1 | Tool category/notes text is #a9b0ab on white (2.21:1 measured) | `.meta` (--faint) | Real content (accessories, "bring own fuel", return date) is hard to read | WCAG 2.2 SC 1.4.3 Contrast (Minimum) | Blocker |
| D2 | Star "save" button is icon-only (glyph character), no aria-label; announced as "white star"/"star", state not exposed | `.save` buttons in cards | No accessible name for purpose or state | WCAG 4.1.2 Name, Role, Value (toggle state not exposed; name is the glyph); 1.1.1 | Blocker |
| D3 | Changing "Loan length" re-renders the dialog and clears the chosen pickup date | `renderDlg()` / `#n` onchange | User must re-enter data they already gave; silent state loss | WCAG 3.3.7 Redundant Entry (adjacent); Nielsen: user control and freedom | Major |
| D4 | "Cancel" on a reservation deletes instantly, no confirmation, no undo; toast just says "Done" | `cancelR()` | Destructive action with a single tap and no recovery path | Apple HIG Alerts/Destructive actions; Nielsen error prevention; WCAG 3.3.4 (spirit) | Major |
| D5 | Premise: an ~88vh marketing hero (origin story, member stats) precedes the actual task; browsing tools is below the fold, esp. at 390px | `.hero` | Primary task buried behind brand content for returning members | Task-first hierarchy; HIG Designing for iOS (focus on primary content); NN/g F-pattern / above-the-fold studies | Major |
| D6 | No empty states: search with no matches shows blank grid; zero reservations shows blank section under heading | `renderTools()`, `renderResv()` | User cannot tell empty from broken, no next step | Nielsen visibility of system status; Material/HIG empty-state guidance | Major |
| D7 | Reservations table has `min-width:640px` and no scroll wrapper, so the whole page scrolls horizontally at 390px | `table` | Content cut off, page-level horizontal scroll | WCAG 1.4.10 Reflow (AA), but data tables are named in its 2-D-layout exception and the rest of the page still reflows (measured: document scrollWidth 664 px at 390; all other content fits), so this is a fix-the-container issue, not a clean AA failure | Major |
| D8 | `outline:none` on buttons, inputs, selects, links with no replacement focus style | `button,input,select,a{outline:none}` | Keyboard focus is invisible | WCAG 2.4.7 Focus Visible (AA) (measured: outline-style none, no box-shadow on focused link/button) | Blocker |
| D9 | Auto-scrolling ticker runs forever, no pause control, ignores prefers-reduced-motion | `.ticker span` animation | Moving content >5s with no way to stop; vestibular risk; also unreadable as it moves | WCAG 2.2.2 Pause, Stop, Hide (A); also no prefers-reduced-motion handling | Blocker |
| D10 | Vague copy: dialog confirm button "Submit", toast "Success", cancel toast "Done", pickup column "Collect from the usual place" (no address/time) | `#go`, `toast()` calls, `renderResv()` | Doesn't say what happened or where/when to collect; outcome and instructions unclear | Apple HIG Writing; NN/g microcopy; WCAG 3.3.2 Labels or Instructions | Minor |

Note: the dialog "Close" label vs. the "Cancel" used for reservations is intentional-ish and not a planted defect.

## Deliberate FINE items (do not flag)
1. Availability uses a coloured dot plus text ("3 available" / "Out on loan"), and the dot is decorative; colour is not the only cue. The secondary text there is `--muted` #5f6b64 (about 5.5:1), which passes AA.
2. The reservation dialog uses native `<dialog>.showModal()` (focus trap, Esc to close, backdrop) and labelled inputs with `<label for>`; the toast is `role="status"`. These are correct.
3. The search field has only a placeholder plus an `aria-label` and no visible label, and the page has a normal sans-serif system font stack and a green gradient hero. A visible label would be nicer, but a labelled search landmark with `role="search"` is acceptable, and the system font/gradient are style choices, not defects.

## Checker notes
- Verified in Chromium (Playwright) at 390 and 1440 px: no console errors; browse, search/filter, reserve (with date), cancel all work apart from the planted defects. D3 reproduced (date value "" after changing loan length). D7 reproduced at 390 only (scrollWidth 664). Hero text over the gradient measured from pixels: worst 4.55:1 (18 px lede, 390 px), so the hero passes AA; not a defect.
- Severity changes: D7 Blocker -> Major (1.4.10 data-table exception). Standards trimmed: D2 dropped 2.5.3 (no visible label, so Label in Name does not apply), D8 dropped 2.4.11 (that is Focus Not Obscured), D9 dropped 2.3.3 (AAA, interaction-triggered animation only).
- Final planted counts: Blocker 4 (D1, D2, D8, D9), Major 5 (D3, D4, D5, D6, D7), Minor 1 (D10).

## Unplanted real defects (found by checker)
| id | defect | where | evidence | standard | severity |
|----|--------|-------|----------|----------|----------|
| U1 | Disabled "Reserve" on an out-of-loan card looks identical to an enabled one (same #1f6b4a fill, white text 6.44:1, pointer cursor); only the "Out on loan" text hints it will not work | `.btn` has no `:disabled` style | Measured computed colours equal for enabled and disabled | Nielsen visibility of system status; HIG buttons (show unavailable state). Not a WCAG failure (inactive controls exempt) | Minor |
| U2 | Cancelling a reservation re-renders the table, so keyboard focus drops to `<body>` | `cancelR()` -> `renderResv()` innerHTML | Focused Cancel button is destroyed; no focus management | WCAG 2.4.3 Focus Order (spirit) | Minor |
| U3 | Availability never changes: reserving does not decrement "3 available", and the same tool can be reserved any number of times beyond stock | `#f` onsubmit | Reserved Cordless drill 1x, card still "3 available" | Nielsen visibility of system status / error prevention | Minor |
| U4 | Reservation `<dialog>` has no accessible name (its `<h2>` is not referenced by `aria-labelledby`) | `#dlg` | Screen readers announce just "dialog" | WCAG 4.1.2 (best practice) | Polish |
| U5 | Pickup dates shown as raw ISO strings ("2026-11-02") rather than a readable, localised date | `renderResv()` | | HIG Writing / formatting dates | Polish |
