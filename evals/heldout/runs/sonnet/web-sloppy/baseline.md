<!-- model: claude-sonnet; skill commit: 7559367 -->

# Lendwell design review (index.html, pre-release build)

Method: read the source; drove it in Chromium at 1280 and 375 px with Playwright (screenshots, a reserve flow, search with no results). No HIG skill used.
Assumed defaults: audience is neighbours of mixed age and tech comfort; mostly phone use, some desktop; UK English/dates; no real backend yet (reservations are in memory); no account system yet.

## Severity key
Critical = blocks a task or excludes users. High = frequent, harmful friction. Medium = noticeable. Low = polish.

## Critical

1. **Focus indicators removed everywhere.** `button,input,select,a{outline:none}` and no replacement. Keyboard and switch users cannot see where they are (nav, Reserve, star, dialog buttons). Fix: delete the rule; add `:focus-visible{outline:3px solid var(--brand);outline-offset:2px}`.

2. **The reserve dialog wipes the chosen date when the loan length changes (verified).** `onchange` calls `renderDlg()`, which rebuilds the form from `date=""` and never stores the date. Pick a date, change length, date is gone; the user also loses focus on the select. Fix: do not re-render; or store date on `input`. Better, delete the re-render and just read values on submit.

3. **No validation or feedback that fits the task.** Date `min` is hard-coded to 2026-10-27 (will be wrong tomorrow; compute from today). Nothing checks the tool is still available, that the pickup day is an opening day (library is Saturday-staffed, closed on bank holidays per the ticker), or that return date is shown. Submitting closes the dialog with a toast reading "Success" and nothing else. Users cannot tell what was reserved, when to return it, or where to collect it. Fix: confirmation message such as "Socket set reserved. Collect Mon 2 Nov, return by Wed 4 Nov", show the return date live in the dialog, and restrict dates to opening days.

4. **Cancel deletes immediately with a toast saying "Done".** No confirmation, no undo, and the toast does not say what was done. Destructive and ambiguous. Fix: confirm, or offer "Cancelled Socket set. Undo" for ~8 s. Name the item in the button's accessible label ("Cancel reservation for Socket set").

## High

5. **Hero consumes the whole first screen (88vh) and holds no task.** On both desktop and phone, the tool search is below the fold, while the right half of the desktop hero is empty gradient. The core job (find and reserve a tool) is hidden behind a slogan and stats. Fix: shrink the hero to a short header, or put search and the tool grid directly under it; drop the generic "Share more. Own less." gradient banner or make it a compact strip. The hero copy is a story paragraph, not a decision aid.

6. **Auto-scrolling ticker with no pause control.** Constant motion (WCAG 2.2.2 requires a pause/stop for >5 s), ignores `prefers-reduced-motion`, and the text is mostly off screen, so "Library closed Bank Holiday Monday" is hard to read. Important notices like closures should be a static banner. Fix: static text, or at minimum pause on hover/focus and disable under reduced motion.

7. **Low-contrast and tiny meta text.** `.meta` uses `--faint #a9b0ab` on white, roughly 2.2:1 (needs 4.5:1), and it carries the tool category and notes ("Petrol, bring own fuel", "Heavy, bring a trolley") which matter for the decision. `th` at 13px muted is marginal. Fix: use `--muted` or darker for all informative text.

8. **Empty states are blank.** Searching for something not stocked leaves an empty grid (verified, zero HTML). "My reservations" shows only a heading when there are none, and after cancelling the last one. Fix: "No tools match 'xyz'. Clear search" and "You have no reservations. Browse tools".

9. **Search results are not announced and the search is partial.** The grid updates silently (no live region), no result count, and search matches name only, not category or notes (typing "petrol" or "garden" finds nothing). Add a polite live count and widen matching.

10. **Mobile: table overflows and navigation is cramped.** The reservations table has `min-width:640px` with no scroll wrapper, so at 375 px the page itself scrolls sideways or the table is clipped. The "Pickup" column repeats "Collect from the usual place" on every row (noise, and vague). Fix: render reservations as cards on narrow screens, or wrap in `overflow-x:auto`; show pickup location once. The nav's three links fit at 375 px but have no touch spacing beyond 16 px margins and no 44 px targets.

## Medium

11. **Touch targets too small.** The save star is a ~20px glyph button with no size or accessible name (screen readers read "white star" or nothing); it is also coloured `#444`. Needs `aria-label="Save Cordless drill"`, `aria-pressed`, min 44x44. Nav links are text-height only. The save state also resets on every filter/search render (innerHTML rebuilt) and is not persisted or listed anywhere, so "saved" does nothing useful. Either build a Saved view or remove it.

12. **Disabled "Reserve" for out-of-stock tools gives no path forward.** The wallpaper steamer is "Out on loan", with "Back 14 Nov" buried in grey meta text. Make it the visible availability line ("Back 14 Nov") and offer "Reserve from 14 Nov" or "Notify me". Disabled buttons are also skipped by keyboard and may be low contrast (browser default).

13. **Availability relies on a colour dot plus text.** Text is present, which is good, but dot colours are red/green only and the dot is decorative; mark it `aria-hidden`. Minor.

14. **Dialog semantics and polish.** Dialog has no accessible name link (`aria-labelledby` to its heading), the heading is an `h2` inside the dialog, the primary button says "Submit" (use "Reserve Cordless drill"), "Close" should be "Cancel", Escape works natively but there is no initial focus choice (first field is fine). Date field `required` gives only the browser tooltip; add inline error text. No keyboard hint that length 7 = "1 week". Dialog re-render (issue 2) breaks screen-reader context too.

15. **Raw dates and unclear units.** The table shows ISO "2026-11-02" and "2 days"; show "Mon 2 Nov" and a return date. "Length" should read "Loan length" and show "Return by".

16. **No indication of who or what the user is.** "My reservations" is a nav link with no sign-in, member number, or note that membership (£12/year) is needed to reserve. The £12 fee appears only in the footer. Surface membership requirement before the Reserve step, and say what happens if you are not a member.

17. **Navigation is in-page anchors only; header is not sticky.** On a long page the user must scroll back to switch sections; "Help" is one line of text, not a destination (contact email is not a link, `mailto:` missing). No visible current-section state. Make email a link; consider a sticky header.

18. **Toast is not reliably accessible.** `role=status` is good, but a 3 s fixed timeout is short for screen-reader and low-vision users, and the generic words "Success"/"Done" carry no information. Also a second toast within 3 s is cleared early by the first timer (no clearTimeout).

## Low

19. **Generic styling.** Green gradient hero, white rounded cards, stat triple (412 / 181 / 3,960) is a common template look and says little about a tool library. Real tool photography or simple illustrated icons per tool, and a warmer neighbourhood voice would give the product identity. Stats also conflict with copy ("over 180" vs 181) and the demo lists only six tools while claiming 181.
20. **Hero h1 wraps awkwardly** ("Share more. Own / less.") due to `max-width:14ch`. Use `text-wrap:balance`.
21. **Copy and consistency.** "Save" is a star with no label; "Reserve" vs "Submit" vs "Cancel" inconsistently name the action; "Pickup date" column header and "Pickup" column both exist. Mixed "neighbours/neighbourhood" is fine (UK) but dates are ISO.
22. **Fonts and spacing.** System font stack is fine; no type scale beyond ad hoc sizes; section headings (22px) are weak against the 64px hero. Cards have no image area so the grid is text-heavy and cards of different note lengths vary in height.
23. **Safe handling of data.** Tool names are injected via innerHTML (fine for the static list, a risk once data comes from users). Reservations vanish on reload (no persistence), which a user will read as lost bookings.
24. **Dark mode and zoom.** No `color-scheme` or dark styles; the header and table use hard-coded `#fff`. Low priority for v1.

## What works
- Clear single-purpose layout, readable body size (16px), good contrast on primary buttons and body text.
- Native `<dialog>`, native date input and select reduce custom code; the search input has an accessible label; toast uses `role=status`.
- Viewport meta set, grid reflows by `auto-fill`, text includes status alongside the colour dot.

## Suggested order of work
1. Restore focus styles; fix the dialog date reset; real confirmation and return date; undo on cancel (items 1-4).
2. Compact the hero so search is visible on first load; make the ticker static (5-6).
3. Contrast, empty states, mobile reservations layout, labels for icon buttons (7-11).
4. Out-of-stock path, membership clarity, copy and date formats (12-18).
5. Identity and polish (19-24).
