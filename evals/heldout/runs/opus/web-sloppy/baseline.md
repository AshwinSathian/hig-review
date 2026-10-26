<!-- model: claude-opus; skill commit: 7559367 -->

# Lendwell: UI/UX design review

**Scope:** `lendwell/index.html`, a single 7 KB file with inline CSS and JS. I read the source and drove it in Chromium with Playwright at 1280×800 and 375×740. The script and screenshots are in `work/`.

**Assumptions (no owner was available):**
- The primary users are existing members who come back to find a tool, reserve it and manage their bookings. Recruiting new members is a secondary goal.
- The product is UK-based (£, "Bank Holiday", "neighbours"), so dates should be shown in UK format.
- It is a prototype. The data is hard-coded, there is no backend or login, and "today" is 2026-10-26. I judged the interaction design as if the data were real.
- The target is WCAG 2.2 AA on desktop and mobile web.

**Severity scale:** **Critical** means a user loses data, can't finish a task, or is blocked by an accessibility failure. **High** means the user is likely to be confused or make an error, or there is a clear AA failure. **Medium** means friction or a missing state. **Low** means polish.

---

## Summary

The visual base is calm and suitable: a warm off-white page, one green brand colour, readable system type and simple cards. The problems are in behaviour and states, not in looks. The core flow, reserving a tool, has a bug that loses data. Keyboard users get no focus indicator at all. Unavailable tools look reservable. Inventory never changes after a booking. The reservations table breaks the layout on phones. Every feedback message says only "Success" or "Done". The landing hero also fills 88% of the first screen with marketing that returning members have to scroll past every visit.

Fix the four Critical items before anyone outside the team uses this.

| # | Issue | Severity |
|---|---|---|
| 1 | Changing the loan length wipes the chosen pickup date and drops keyboard focus | Critical |
| 2 | All focus outlines removed (`outline:none`) | Critical |
| 3 | Reserving doesn't reduce stock, and you can double-book without limit | Critical |
| 4 | Reservations table forces horizontal scroll on mobile and hides "Cancel" | Critical |
| 5 | Disabled "Reserve" looks identical to the enabled button | High |
| 6 | Cancel has no confirmation or undo, and the feedback is just "Done" | High |
| 7 | Auto-scrolling ticker can't be paused and ignores reduced-motion | High |
| 8 | Card metadata text is 2.2:1 contrast | High |
| 9 | Save/star button has no name, no state and doesn't persist | High |
| 10 | 88vh marketing hero pushes the actual product below the fold | High |
| 11 | Vague copy: "Submit", "Success", "Done", "Collect from the usual place" | Medium |
| 12 | Nothing is shown when there are no results or no reservations | Medium |
| 13 | Dialog doesn't show the return date or a summary, and the date limit is hard-coded | Medium |
| 14 | ISO dates and "1 days" in the reservations table | Medium |
| 15 | Out-of-stock tools are a dead end (no "notify me" or next free date) | Medium |
| 16 | Hero body text on the light end of the gradient is about 4.0:1 | Low |
| 17 | Heading structure, landmarks and the stats-vs-catalogue mismatch | Low |
| 18 | Generic template look in the hero | Low |

---

## Critical

### 1. Changing the loan length erases the pickup date and loses focus
**Where:** `renderDlg()`, line 117: `$("#n").onchange = e => { days = +e.target.value; renderDlg() }`

**What happens:** changing the loan length re-renders the whole dialog. The date the user typed is never saved to the `date` variable, so it comes back empty. I confirmed this in the browser: I set the date to 2026‑11‑05, changed the length to 3 days, and the date read back as `""`. Focus also jumped to `<body>`, so a keyboard or screen-reader user is thrown out of the modal's flow. Most people pick the date first and the length second, which is exactly the order that triggers the bug. They then see "Please fill out this field" on a field they had already filled in.

**Fix:** don't re-render on change. Nothing in the dialog depends on `days` yet. Delete the `onchange` handler and read both fields on submit. If you later add a live return-date line (see #13), update only that text node.

### 2. No focus indicator anywhere
**Where:** line 27: `button,input,select,a{outline:none}`

**What happens:** in the browser, tabbing to the nav link gave `outline-style: none` and no box-shadow. Keyboard users can't see where they are on any link, input, card button, star, dialog control or Cancel button. This fails WCAG 2.4.7 (Focus Visible), and also 2.4.11/2.4.13 in 2.2.

**Fix:** delete line 27 and add a visible ring that only shows for keyboard focus:
```css
:focus-visible{outline:3px solid #1f6b4a;outline-offset:2px}
.hero :focus-visible,.btn:focus-visible{outline-color:#0b3d27}
```

### 3. Inventory never changes, so double-booking is unlimited
**Where:** the `#f.onsubmit` handler (line 118) adds to `resv` but never decrements `qty`, never re-renders the grid, and doesn't check for conflicts.

**What happens:** after reserving a Cordless drill, the card still said "3 available". I then reserved it again with no warning, so the same member held two overlapping drill bookings. Cancelling doesn't put stock back either. For a lending library, the availability count is the whole promise. If it's wrong, members turn up and leave empty-handed.

**Fix:**
- Decrement `qty` when a booking is made and increment it on cancel.
- Re-render the cards after both.
- Availability really depends on dates (a tool can be free on the 5th and out on the 9th), so model it per day. Disable or flag dates that are already taken in the picker.
- Warn when the member already holds that tool for overlapping days.

### 4. The reservations table breaks the mobile layout
**Where:** line 38: `table{min-width:640px}` with no scroll container.

**What happens:** at 375 px wide, `document.scrollWidth` is 664 px, so the whole page scrolls sideways. The Pickup column and the **Cancel** button are off-screen (see `work/mobile-resv.png`). A member on their phone, which is the likely device on pickup day, can't cancel a booking without first discovering that the page scrolls horizontally.

**Fix:** remove `min-width`. Below about 600 px, show each reservation as a stacked card ("Socket set · Mon 2 Nov · 2 days · Cancel"). If you keep the table, wrap it in `<div style="overflow-x:auto">` so only the table scrolls.

---

## High

### 5. Unavailable tools look reservable
The disabled "Reserve" on the Wallpaper steamer has the same computed style as the enabled buttons: green background `rgb(31,107,74)`, opacity 1 and `cursor:pointer`. The only clue is a small red dot (status shown by colour alone, WCAG 1.4.1) and the faint text "Back 14 Nov". Users will click it and get no response.

**Fix:** add `.btn:disabled{background:#e4e2dc;color:#5f6b64;cursor:not-allowed}`. Better still, swap the button for an action that does something (see #15), and make the status text explicit, for example "Out on loan · back Sat 14 Nov".

### 6. Cancel is instant and permanent, with no meaningful feedback
`cancelR` deletes the row straight away and shows the toast "Done". A mis-tap on mobile, where Cancel sits next to the row, silently loses a booking. Once the stock fix in #3 is in, someone else could take that tool in the meantime.

**Fix:** make the toast say what happened and offer undo: "Reservation for Socket set (Mon 2 Nov) cancelled. **Undo**". Keep the toast up for about 6 seconds and pause the timer on hover or focus. Name the button for screen readers too: `aria-label="Cancel Socket set reservation"`. If you prefer a confirm step instead of undo, use a small `<dialog>`, not `confirm()`.

### 7. The ticker moves constantly and can't be stopped
`.ticker span` loops every 14 seconds forever. The browser test showed the animation still running under `prefers-reduced-motion: reduce`. This fails WCAG 2.2.2 (Pause, Stop, Hide) and is a known trigger for people with vestibular or attention conditions. The format also hurts the content. "Library closed Bank Holiday Monday" is operational information that matters, and a scrolling ticker is the hardest place to read it, because users have to wait for it to come round.

**Fix:** replace the ticker with a static notice bar showing the single most urgent item (the closure), plus a "News" link for the rest. If you keep the motion, wrap it in `@media (prefers-reduced-motion: no-preference)` and add a pause control.

### 8. Card metadata is too faint to read
`.meta` uses `--faint #a9b0ab` on white, which is about **2.2:1**; AA needs 4.5:1. This text carries real decision information: category, "Petrol, bring own fuel", "Heavy, bring a trolley" and "Back 14 Nov". The Help section already overrides it inline with `style="color:var(--muted)"`, which suggests the faint value was known to be a problem.

**Fix:** use `--muted #5f6b64` (about 5.5:1) for `.meta`. Keep `--faint` only for borders and other decoration.

### 9. The star (save) button doesn't work as a control
- It has no accessible name, so screen readers announce "☆ button".
- It has no `aria-pressed`, so the state is never announced.
- It doesn't persist: I starred a card, typed in search, cleared it, and the star was empty again because `renderTools()` rebuilds the HTML.
- Nothing in the app uses saved items. There is no "Saved" filter or list.
- The hit area is about 20 × 24 px, below the 24 px minimum in WCAG 2.5.8 and well below the roughly 44 px touch guidance from Apple and Google.

**Fix:** either remove it until saving has a purpose, or do it properly. Doing it properly means storing saved IDs in state (or `localStorage`), rendering `aria-pressed` and `aria-label="Save Cordless drill"`, giving it a 44 × 44 px target, and adding a "Saved" chip next to the category filter.

### 10. The hero hides the product
The hero is `min-height:88vh`. On a 1280 × 800 desktop, "Browse tools" starts at y = 845, below the fold. On a 375 × 740 phone it starts at y = 792. Every visit, a returning member scrolls past a mission statement and three vanity numbers before reaching search. The page's main job is reserving tools, not persuading people to join.

**Fix:**
- Shrink the hero to a slim band (about 160–220 px). Put search inside it, so the first thing on screen is "What do you need to borrow?" with a search field and category filter.
- Move the origin story and stats to an "About" section further down, or show them only to logged-out visitors.
- Make the header sticky so "My reservations" is always one tap away.

---

## Medium

### 11. Vague copy at the important moments
| Now | Problem | Suggested |
|---|---|---|
| Dialog button "Submit" | Says nothing about what happens | "Reserve drill" or "Confirm reservation" |
| Dialog "Close" | Unclear whether it saves anything | "Cancel" (and rename the table action to "Cancel booking" so the two don't clash) |
| Toast "Success" | Doesn't say what succeeded | "Cordless drill reserved for Thu 5 Nov–Sat 7 Nov. Pick up at the Alder St garage, Sat 10–1." |
| Toast "Done" | See #6 | "Reservation cancelled. Undo" |
| "Collect from the usual place" | New members don't know the usual place, and every row repeats it | Give a real address and opening hours once, above the table, with a map link |
| "Out on loan" | "Back 14 Nov" is in the faint meta line | "Out on loan · back 14 Nov" in the status line |
| "Help" section | One sentence, and the email isn't a link | Make it `mailto:`, add hours, the pickup location, and the late-return and damage policy |

### 12. Missing empty states
- **No reservations:** `#resv` renders an empty string, leaving just a heading with nothing under it (confirmed). Show "You have no reservations. Browse tools ↑" instead.
- **No search results:** searching "zzz" leaves the grid blank with no message. Show "No tools match 'zzz'. Try another word, or ask us to add it" and a clear-filters button.
- **No results count:** add "6 tools" or "2 of 6 tools" next to the filters, in an `aria-live="polite"` region so screen-reader users hear the results change.

### 13. The reservation dialog doesn't give enough information to decide
- It never shows the return date. "3 days" from a Thursday means… what, exactly? Show "Return by Sun 8 Nov" and update it live.
- It never shows pickup hours. If the library only hands tools out on Saturdays (the Help copy hints at volunteers on Saturdays), the date picker should only allow valid days.
- `min="2026-10-27"` is hard-coded and will be wrong from tomorrow. Compute it from today.
- The item note ("Petrol, bring own fuel") isn't repeated in the dialog, which is where it matters.
- A "1 week" option in a library open some days only raises questions about the return day. State the rule.

### 14. Date and pluralisation formatting
The table shows raw ISO dates ("2026-11-02") on a UK site, and a 1-day loan shows as "**1 days**" (confirmed). Use `toLocaleDateString('en-GB',{weekday:'short',day:'numeric',month:'short'})`, which gives "Mon 2 Nov", and pluralise properly with `Intl.PluralRules` or a simple ternary.

### 15. Out-of-stock tools are a dead end
When a tool is out, the only response is a disabled button. Tool libraries live on hand-offs, so give users a next step:
- "Reserve from 14 Nov", which opens the dialog with the date pre-set
- "Notify me when it's back"
- "Similar: Steam cleaner (2 available)"

---

## Low

### 16. Hero text contrast at the gradient's light end
White on `#2f8f65` is about 4.0:1. That's fine for the 64 px headline, but the 18 px paragraph and the 16 px stat labels fall just under AA where they cross the lighter half. Use a darker second stop (for example `#246f4f`), or keep the text over the left, darker side, which is what happens on desktop today.

### 17. Structure and semantics
- The only `<h1>` is the slogan, and the product name is a `<b>`. Make "Lendwell" a home link. Consider using the hero `<h1>` for the page's purpose ("Borrow tools from your neighbours").
- Each card's "Reserve" button has the same name. Add `aria-label="Reserve Cordless drill"`, or use `aria-describedby` pointing at the `h3`.
- The status dot needs a text equivalent. It has one ("3 available"), so just mark the dot `aria-hidden="true"`.
- The hero says "over 180 tools", the stats say 181, and the catalogue lists 6. Placeholder data is fine for a prototype, but don't let the numbers contradict each other once real data is in.
- Rendering with `innerHTML` and string-built `onclick` attributes will become an injection risk once tool names come from a backend or volunteer input. Escape the values or build nodes with DOM APIs.
- The toast's `setTimeout` timers aren't cleared, so two actions within 3 seconds make the first timer blank the second message early.

### 18. Generic look
A full-bleed diagonal green gradient, a two-beat slogan ("Share more. Own less.") and a row of three big stats is the default SaaS-landing template. It says nothing about a volunteer-run library in a garage on Alder Street, which is Lendwell's most distinctive asset. Lean into that story:
- a real photo of the shelf or the volunteers
- tool cards with photos or simple line icons, so people can scan by shape
- a "how it works" strip (Reserve → Pick up Saturday → Return)
- tone that sounds like a neighbour, not a startup

---

## What's working
- The palette is restrained and the type is legible, with a sensible 980 px content width and a responsive card grid.
- It uses native `<dialog>` with `showModal()` (built-in focus trap, Esc to close, backdrop), native `type="date"` and `type="search"`, and labelled form controls.
- The toast has `role="status"`, so screen readers announce it.
- Search filters live as you type, with no submit step.
- Useful practical notes on cards ("bring a trolley") show real knowledge of the domain.

## Suggested order of work
1. Fix the dialog re-render bug (#1), restore focus rings (#2) and make the reservations table work on mobile (#4). Each is a one-line or few-line change.
2. Make stock real and add undo on cancel (#3, #6), and style disabled buttons (#5).
3. Shrink the hero and bring search up (#10), replace the ticker (#7), and fix the meta contrast (#8).
4. Fix the copy, empty states, dialog details and dates (#11–#14).
5. Add out-of-stock paths (#15), sort out the star (#9) and do the brand pass (#18).
