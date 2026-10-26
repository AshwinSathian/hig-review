<!-- model: claude-haiku; skill commit: 7559367 -->

# Lendwell design review (development build, single page)

Scope: `lendwell/index.html` only (one file, inline CSS and JS, six sample tools, one sample reservation). Reviewed at 1440x900 desktop and 375x812 phone in Chromium via Playwright. Screenshots and the probe script are in `work/`.

## Defaults I assumed (the owner was unavailable)

- Audience: UK neighbourhood members (copy uses £, "neighbours", "Bank Holiday"). Desktop and phone are both real use.
- Primary job: find a tool and request it for a pickup date. Everything else is secondary.
- A reservation is a request. Nothing in the page says it is confirmed, so I treated the missing confirmation as a gap, not a choice.
- No account system exists. "My reservations" is a global list. I judged this acceptable for a prototype but flagged it.
- Severity: **Blocker** = stops the core task or breaks trust in it. **High** = clear user harm or an accessibility failure. **Medium** = friction or unclear state. **Low** = polish.

## Summary

The page has a sound core: a clean palette, a readable type scale, native date input and `<dialog>`, a role=status toast, and availability shown as text as well as a colour dot. But the core task is undermined by functional bugs (reservations do not reduce stock, a loan-length change wipes the chosen date), the first screen hides the tools, and there is a serious accessibility problem (focus outlines removed globally). Fix the Blocker and High items before anyone uses this.

## Findings, most serious first

### Blocker / High

1. **Reservations do not reduce availability (overbooking).** Verified: "Orbital sander" showed "1 available" before a reservation and still "1 available" after; its Reserve button stayed enabled. `qty` is never decremented and no date-range check exists. Users can book stock that does not exist.
   Fix: decrement or check availability per tool and per date window before accepting, show "Fully booked on that date" in the dialog, and disable Submit when the pickup date is unavailable.

2. **Changing the loan length clears the pickup date.** Verified: set date to 2026-11-05, change length to "3 days", and the date field is empty. The dialog re-renders via `innerHTML`, and the `date` variable is never updated from the input. Submit is then blocked with "Please fill out this field." and focus is lost.
   Fix: keep state in JS and update it on input, or render the dialog once and only update the summary text. Add a live summary line: "Pickup Fri 6 Nov, back Mon 9 Nov (3 days)".

3. **Out-of-stock Reserve buttons look enabled.** There is no `:disabled` style. The disabled "Wallpaper steamer" button has the same green background, opacity 1, and `cursor: pointer` as the enabled ones. The state is only conveyed by the small grey "Out on loan" line.
   Fix: style `.btn:disabled` (muted fill, `cursor: not-allowed`), and move the reason next to the button: "Out on loan, back 14 Nov". Offer "Notify me" if the product wants demand capture.

4. **Focus indicators are removed globally.** `button,input,select,a{outline:none}` removes the focus ring for keyboard users. Verified: the focused nav link has `outline-style: none` and `box-shadow: none`.
   Fix: delete that rule. If a custom ring is wanted, use `:focus-visible { outline: 3px solid <brand>; outline-offset: 2px }`.

5. **The first screen is a marketing hero, and the tools sit below the fold.** The hero is `min-height: 88vh`. At 1440x900 it is 792px tall and the first tool card starts at y = 1040. The hero has no call to action, not even "Browse tools", so the search is never introduced. The story copy ("started in a garage on Alder Street") and the stats come before the task.
   Fix: make the first viewport the task. Put a short line and the search field in the top 300px, and keep the stats smaller or move them under the grid. If a hero stays, give it a real CTA that anchors to `#tools`.

6. **The page scrolls sideways on phones.** The reservations table has `min-width: 640px`, and the page measured 664px wide on a 375px viewport. The "Pickup" column is cut off in the screenshot.
   Fix: wrap the table in `overflow-x: auto` with a scroll cue, or (better) render each reservation as a stacked card below 600px with tool, date, length, and Cancel visible.

7. **Text contrast fails WCAG AA in several places.** Measured:
   - `.meta` (category, notes) and the search placeholder use `#a9b0ab` on white: **2.21:1** (needs 4.5:1). This is the notes text users need to choose a tool ("18V, two batteries", "Back 14 Nov").
   - Hero paragraph, white on `#2f8f65` (gradient end): **4.01:1**. At 18px regular it needs 4.5:1.
   Fix: use `--muted` (`#5f6b64`, 5.56:1) for meta and placeholder text, and darken the gradient end (or drop the gradient) so white body text reaches 4.5:1.

8. **Autoplaying ticker ignores reduced motion and cannot be paused.** The `tick` animation runs infinitely at 14s. Verified: the animation is still `tick` with `prefers-reduced-motion: reduce`. This fails WCAG 2.2.2 (pause, stop, hide) and the reduced-motion expectation.
   Fix: wrap the animation in `@media (prefers-reduced-motion: no-preference)`, add a pause control, or replace it with a static line that rotates on click. Ticker content (closures, new stock) is also what users most need, so a static strip is better.

9. **The product's membership and sign-in story is missing.** "Membership £12 a year" appears only in the footer. There is no Join, no Sign in, and no indication that reserving requires membership. "My reservations" lists everything without identity. For a members-only service this is the first question a new visitor has.
   Fix: put "Join for £12 a year" in the header and on the reserve flow. Add a sign-in or "Use my membership number" step, or state clearly that this is a demo.

### Medium

10. **Unlabelled repeated controls.** Every card has a "Reserve" button with no tool name in its accessible name, and the star button has no `aria-label` or `title`. The star toggles a glyph only: it stores nothing and there is no favourites view. Fix: `aria-label="Reserve Cordless drill"`, `aria-pressed` on a real "Save" toggle, or remove the star until favourites exist.

11. **Cancel is immediate and vague.** Cancel removes the row with no confirmation or undo, and the toast says only "Done". Fix: confirm inline ("Cancel this reservation? Yes, cancel / Keep it") or offer "Undo" in the toast for about 5s, and name the tool in the toast.

12. **The success message does not say what happened.** "Success" appears after a request, but the page does not say the request is pending or confirmed, what the pickup time is, or when the tool is due back. Fix: "Requested: Socket set, pickup Mon 2 Nov, back Wed 4 Nov. We will confirm by email." (the confirmation mechanism is an assumption to check with the owner).

13. **The reserve dialog is missing information and has weak labels.** It has no return date, no summary, and no link between the `<h2>` and the `<dialog>` (no `aria-labelledby`). The buttons say "Close" and "Submit", which is generic: use "Cancel" and "Request reservation". Fix as above.

14. **Dates and plurals are not UK-formatted.** Dates show as "2026-11-02" in the table and the date input uses the browser's locale. Length reads "1 days". Fix: format as "Mon 2 Nov 2026", use `Intl.DateTimeFormat('en-GB')`, and handle singular "1 day".

15. **Hard-coded minimum date and no closed-day logic.** `min="2026-10-27"` is written into the markup and will go stale. The ticker mentions a Bank Holiday closure, but the date picker does not block it. Fix: compute `min` from today, and block closed days from the same data source as the ticker.

16. **Missing empty states.** Searching for "zzz" leaves the grid blank with no message. An empty reservations list shows only the heading. Fix: "No tools match 'zzz'. Try a shorter word or clear the category." and "No reservations yet. Browse tools to request one."

17. **Pickup location is vague.** "Collect from the usual place" appears on every row. Users need an address or the opening hours of the collection point. Fix: a real location line with opening times, or a link to a map.

18. **Tap targets in the header are too small on phones.** The nav links measure 18px tall and 33 to 115px wide. This is below the 44pt minimum in Apple's HIG and below WCAG 2.5.8. The header also has no sticky behaviour and no active-state for the current section. Fix: 44px hit areas (padding) and an active underline with `aria-current` on the matching section.

### Low

19. **Hero stats contradict the catalogue.** The hero says "181 tools" and "over 180 tools". The catalogue shows six tool types with 13 units. This is probably placeholder data, but it will be noticed. Fix: compute the counts from the data or remove them until the numbers are real.

20. **Hero and gradient look templated.** A full-height 135° green gradient with a centred-left headline is a common template pattern. There are no tool images, and every card is the same shape. Fix: use a flat brand colour with a real photo or illustration of the tool library, and let the catalogue carry the visual interest.

21. **Search has no visible labels and no feedback.** The search and category controls rely on `aria-label` and placeholder text alone. There is no result count, and the filter is not debounced (fine at six items, not at 180). Fix: visible labels or a result count ("4 of 6 tools").

22. **Help email is plain text.** `hello@lendwell.example` is not a `mailto:` link. Fix: link it.

23. **Footer and copy.** The footer is one line with the membership fee. The `lang="en"` attribute is correct, but the page would read better with `en-GB`. There is no favicon or meta description.

24. **Toast timer can clear a newer message.** `toast()` sets a 3s timeout that clears the text, even if a newer toast has replaced it. Fix: keep a timer handle and clear it on each new toast.

25. **Inline handlers and `innerHTML` rendering.** The `onclick` attributes and template-string rendering are fine at this size but will make the page hard to change. Note for when the build grows, not a user-facing issue.

## What already works (keep these)

- One clear palette (green brand, warm off-white, muted text) and a readable type scale.
- Native `<input type="date">` and `<dialog>` with `showModal()`, which gives a focus trap and Escape-to-close for free.
- Availability is shown as text ("3 available", "Out on loan") and not by colour alone.
- The toast uses `role="status"`, and the search uses `role="search"`.
- The cards are compact, with the key information (category, note, availability) in a predictable order.

## Suggested order of work

1. Fix the functional bugs: stock decrement and date-window check (1), date reset (2), disabled state (3).
2. Restore focus rings (4) and fix contrast (7), both are one-line CSS changes.
3. Move the tools above the fold and fix the mobile table (5, 6).
4. Fix the ticker motion (8) and the labels and empty states (10, 16).
5. Rework the reserve dialog and success message (11 to 15).
6. Decide the membership and sign-in story (9) with the owner before polishing the header (18).

## Verification

- Probe script: `work/probe.js` (Playwright, Chromium, run with node).
- Screenshots: `work/desktop-fold.png`, `work/desktop-dialog.png`, `work/desktop-noresults.png`, `work/desktop-focus-nav.png`, `work/mobile-fold.png`, `work/mobile-resv.png`.
- Measured values quoted above come from `work/probe.js` output. Contrast ratios were computed from the computed colours with the WCAG formula.
- Not checked: real-device touch behaviour, screen-reader output, Firefox or Safari, and the other breakpoints between 375 and 1440. The mobile table screenshot shows two rows because the probe added a reservation for the test; the overflow measurement is independent of that.
