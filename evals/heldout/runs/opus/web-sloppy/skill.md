<!-- model: claude-opus; skill commit: 7559367 -->

# Lendwell: design review (loupe)

## 1. Summary

**What was reviewed:** the whole app, which is one page (`lendwell/index.html`) plus the Reserve dialog. I walked the core flow (browse, reserve, check My reservations, cancel). I had the running page and its source. There was no `.loupe.md`, so the profile below is inferred and was not written to disk.

**Verdict:** the reserve flow works on the happy path. But a keyboard user can't see where they are, the page has a marquee that never stops, the card notes are unreadable grey, and the dialog wipes the chosen date. The page leads with an 88vh marketing hero, and the tools don't start until y=933 px, below the fold at every width.

**Do first:** fix the four accessibility Blockers (#1 to #4) and the dialog that loses the date (#5). Then take Rework R1: open on the tools, and book by date.

**Assumptions (no owner available; questions recorded, defaults used):**
- `purpose`: members of a volunteer-run neighbourhood tool library find a tool and reserve it for a pickup day. Inferred from the title, hero and footer.
- `audience`: occasional-public. People reserve a tool a few times a year.
- `register`: utilitarian. Browsing and reserving is a check-and-act task.
- `motion_personality`: serious, relaxed.
- `platforms`: web. `release_stage`: development, as the brief says. `density`: comfortable, from the 16 px body.
- `voice`: inferred traits are neighbourly but not cute, practical but not curt. Spelling is British ("Neighbourhood", "neighbours"). Casing is sentence case for buttons and headings. `humor: none`. `we_policy: avoid`.
- `brand.accents`: `--brand #1f6b4a` (index.html:8). `brand.typefaces`: system-ui stack.
- `category`: community tool library / library of things. `peers`: none given. `direction`: empty, so I propose directions in §5.
- `waivers`: none. The 26+ gate doesn't apply (web only).
- Questions I would have asked: Is membership (£12) needed before reserving? Where and when is pickup? Do reservations need to block stock by date? Do saved stars need to persist? Is the hero meant for logged-out visitors only?

**Run notes:**
- **Tools:** Playwright (Chromium) driven from Node scripts, in place of the MCP tools.
- **Measurement:** `skill/scripts/measure-runner.js` ran unchanged through `work/measure.js` (12 combinations: 390/820/1440 × light/dark × motion on/reduce). Output: `work/measure.json`.
- **Type:** `skill/scripts/type-eval.js` at sizes 13/14/16/18. Output: `work/type-eval.json`.
- **Flows and stress states:** `work/drive.js` covered screenshots, a Tab walk, the dialog flow, cancel, empty states, 200% text, RTL, pseudo-localisation, forced colours and contrast:more, a 2560 px width, and reduced motion. Screenshots are in `work/shots/`.
- **Contrast sampling:** `scripts/png_contrast.py` on the hero, and `scripts/contrast.py` on proposed tokens.
- **Paths:** all evidence is under `…/runs/[run]/work/`. Nothing in `lendwell/` was modified.
- **Contrast results:** 57 text pairs per combination. Results were identical in all 12 combinations because the page has no `prefers-color-scheme` rule.
  - 6 fail: `.meta` #a9b0ab on #fff is 2.21:1 at 14 px.
  - 8 unmeasurable: hero text over the gradient. Pixel sampling shows white on #257854 to #2a835c at 4.67 to 5.39:1, which passes.
- **Targets:** nav links are 33.6–115×18 px (`spacingOk` true). Star buttons are 31.9×32. The select is 42 px tall at 390.
- **Type:** 8 distinct sizes, minimum 13 px, all in px.
- **Motion:** 1 element animated on load (the ticker), no reduced-motion rule, 0 unreadable sheets.
- **Layout:** `logicalProps` physical 5 / logical 0.
- **Coverage:** no iframes or shadow roots. Nothing was sampled or skipped.
- **Landscape:** the web searches went to third-party sites (cited in §4).

## 2. Findings

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | Focus is invisible on every control. `button,input,select,a{outline:none}` has no replacement style. The Tab walk shows `outline: none`, `box-shadow: none` at all 16 stops (nav links, search, category, stars, Reserve). This fails WCAG 2.4.7 (AA). | Whole page, index.html:27 | Blocker | Web | Delete line 27. Add `:focus-visible{outline:2px solid var(--brand);outline-offset:2px}`, and a white ring on the hero and toast. |
| 2 | The ticker scrolls forever with no pause, stop or hide control. Under `prefers-reduced-motion: reduce` it still reports `running` (measured). It also carries the "Library closed Bank Holiday Monday" notice, which members need. This fails WCAG 2.2.2 (A), and Apple's Reduce Motion SHOULD on repeating animation (content-a11y.md:45). | Ticker under the header, index.html:14–16, 53 | Blocker | Web | Replace the marquee with a static notice line. Put closures first: "Closed Monday 31 Aug (bank holiday)". At minimum, stop the animation under `prefers-reduced-motion` and add a pause button. |
| 3 | Card meta text (category · note) is #a9b0ab on #fff at 2.21:1, 14 px, on all 6 cards. That includes "Back 14 Nov", the only explanation of why a tool can't be reserved. This fails WCAG 1.4.3 (needs 4.5:1). | Browse tools, every card `.meta`, index.html:33 | Blocker | Web | Use `--muted` #5f6b64 (5.56:1 on #fff, measured) and drop `--faint` for text. |
| 4 | The save star has the accessible name "☆" ("white star") and no `aria-pressed`. Toggling only swaps the glyph to ★, so screen readers get neither its purpose nor its state. This fails WCAG 4.1.2. The star also saves nowhere (nothing persists, there is no saved list); see Unverified. | Every card, top-right `.save`, index.html:98 | Blocker | Web | `<button aria-pressed="false" aria-label="Save Cordless drill">`, and toggle `aria-pressed`. Remove the star if "saved tools" isn't a planned feature. |
| 5 | Changing **Loan length** rebuilds the whole dialog (`renderDlg()` on change). The chosen pickup date is cleared (measured: `2026-11-05` became `""`) and focus drops to `<body>`. Submit then fails with "Please fill out this field." The member loses input and keyboard position mid-task. This breaks Apple's "Avoid changing focus without user interaction" (inputs-tech.md, Focus and selection). | Reserve dialog, index.html:117 | Major | SHOULD | Don't re-render on change. Read both fields on submit, or store `date` from the input's `change` event and keep focus on the select. |
| 6 | **Cancel** deletes a reservation on one click, with no confirm and no undo. The toast says "Done" for 3 s and focus falls to `<body>` (measured). Apple: undo makes exploration safe; on the web, put "Undo" in the toast after a destructive action (patterns.md, Undo and redo). | My reservations, Cancel button, index.html:106–108 | Major | SHOULD | Remove the row, then show a toast with an Undo button for at least 6 s: "Socket set reservation cancelled. Undo". Move focus to the next row's Cancel button, or to the heading. |
| 7 | The first screen answers a visitor's question, not a member's. The 88vh hero, stats and slogan push "Browse tools" to y=933 at 390, 820 and 1440 wide (viewport 900, measured). No tool, search or reservation is in the first viewport. This breaks Apple's Purpose principle: every screen serves the one-sentence purpose (red-team.md, attack ladder 1). | Hero, index.html:17, 55–59 | Major | SHOULD | Cut the hero to one line plus search, or move it below My reservations for returning members. See R1. |
| 8 | No dark appearance and no increased-contrast variant. There is no `prefers-color-scheme` or `prefers-contrast` rule and no `color-scheme`. Literal hex values are used for UI and text (`header #fff`, ticker `#e7efe9`, star `#444`, toast `#1f2a24`, dot `#b3472f`). The page renders identically in light and dark (measured). This breaks Apple's "use semantic/adaptive colors… no hard-coded values" (visual.md, Dark Mode). | `:root` tokens and inline literals, index.html:8–48 | Major | SHOULD | Move every literal into `:root` roles and add a `@media (prefers-color-scheme: dark)` set: bg #151a17, text #e6ebe7 (14.6:1), muted #9aa59f (6.93:1), accent #7fd1a6 (9.71:1), all computed. Declare `color-scheme: light dark`. |
| 9 | Empty states are blank. With no reservations, `#resv` is `""` and only the heading remains. A search for "chainsaw" gives an empty grid with no message (measured). Apple: every empty state gives a next step (writing.md, Empty states). | My reservations; Browse tools search | Major | SHOULD | Reservations: "No reservations yet. Pick a tool above and choose a pickup day." Search: "No tools match ‘chainsaw’. Try another word or show all categories" (link that resets the filter). |
| 10 | Confirmations say nothing. Reserving shows "Success" and cancelling shows "Done", both gone in 3 s. Neither names the tool, the date or where to collect it. Apple: for routine success, state the result (writing.md, Success and feedback). | Toast, index.html:108, 118 | Major | SHOULD | "Cordless drill reserved: collect Thu 5 Nov, back Sun 8 Nov." Keep it in My reservations as the lasting record, and highlight the new row. |
| 11 | The disabled **Reserve** on Wallpaper steamer looks the same as the enabled ones (same fill and colour, no `:disabled` style; see `work/shots/full-1440.png`). It gives no reason. The return date sits in the 2.21:1 meta line. Disabled buttons can't take focus or explain themselves (web-mapping.md, Forms). | Wallpaper steamer card | Major | Web | Replace the button with the text "Out on loan, back Sat 14 Nov", or an enabled "Reserve from 14 Nov". Give `.btn:disabled` a distinct style. |
| 12 | At 390 px the page scrolls sideways. `scrollWidth` is 664 because the reservations table has `min-width:640px` and no scroll wrapper. The header, ticker and hero stop at 390 while the table runs off-screen (`work/shots/full-390.png`). This breaks WCAG 1.4.10 Reflow; the data-table exemption is arguable for a 4-field list, so this is judged Major. | My reservations table, index.html:38 | Major | Web | Below about 600 px, render each reservation as a stacked row (tool, date, length, Cancel), or wrap the table in `overflow-x:auto`. |
| 13 | All type is in px (body 16px, h2 22px, meta 14px…). Setting the root font size to 200% left body text at 16 px (measured). Browser zoom still works, so WCAG 1.4.4 passes, but the user's font-size setting is ignored. | index.html:10–48 | Major | Web | Convert sizes to rem (16→1rem, 14→0.875rem, 13→0.8125rem…). |
| 14 | "N available" never changes. After reserving a Cordless drill it still says "3 available" (measured). You can reserve the same tool again for the same day, and the count isn't tied to the pickup date you pick. The model promises availability it can't check. Reviewer judgement. | Card `.avail`; Reserve dialog | Major | Taste | Show availability for the chosen date ("2 of 3 free on Thu 5 Nov"), block dates when none are free, and decrement on reserve. See R1. |
| 15 | Pickup says "Collect from the usual place" on every row. A first-time member has no "usual place", and no address or opening time appears anywhere. The cognitive walkthrough fails at step 4 (seeing what happens next). Reviewer judgement. | My reservations, Pickup column; dialog | Major | Taste | Name the place and slot, e.g. "Alder Street garage, Sat 10:00–13:00". If it's the same for every row, show it once above the table and delete the column. |
| 16 | The slop-cluster threshold is met: 7 tells across the layout, motion and colour channels. They are a hero metric row (412 / 181 / 3,960), a decorative 135° gradient hero that encodes nothing, a near-viewport-height hero (88vh), a perpetual marquee, no reduced-motion branch, disabled buttons that look enabled, and a blank search result. See §5. | Hero, ticker, cards | Major | Taste | See R2. Swapping tells one at a time would only produce the next default. |
| 17 | The dialog buttons "Close" and "Submit" don't say what happens. Apple: dialog buttons name the specific action (writing.md, Labels and buttons). | Reserve dialog, index.html:115 | Minor | SHOULD | "Cancel" and "Reserve drill" (use the tool name). |
| 18 | Targets are small. Nav links are 18 px tall (`spacingOk` true, so WCAG passes), and star buttons are 31.9×32, against a 44 px goal on touch. | Header nav; card stars | Minor | Web | Pad nav links to 44 px high and make the star 44×44. |
| 19 | Filtering by search or category isn't announced, and no result count is shown. Screen-reader users get no feedback that the grid changed (content-a11y.md web translation: `aria-live` for async changes). | Browse tools | Minor | Web | Add a visible "6 tools" / "1 tool" line with `aria-live="polite"`. |
| 20 | The `<dialog>` has no accessible name (no `aria-labelledby` pointing to "Reserve Cordless drill"). | Reserve dialog, index.html:79, 112 | Minor | Web | Add an `id` to the h2 and `aria-labelledby` on the dialog. |
| 21 | In RTL, the star sits on top of the tool name (`position:absolute; right:10px`) and the status dot uses `margin-right`. Measured: 5 physical properties, 0 logical (`work/shots/rtl-390.png`). | Cards | Minor | Web | Use `inset-inline-end:10px` and `margin-inline-end:6px`, and reserve padding for the star. |
| 22 | Dates are shown three ways. The table shows ISO "2026-11-02", the date picker shows dd/mm/yyyy, and the notes say "14 Nov". None gives a weekday, and pickup depends on weekday (the help line says Saturday volunteers). Reviewer judgement. | My reservations; dialog; card note | Minor | Taste | Format with `Intl.DateTimeFormat('en-GB',{weekday:'short',day:'numeric',month:'short'})`, e.g. "Mon 2 Nov". |
| 23 | The pickup date has `min="2026-10-27"` hard-coded, so it goes stale tomorrow. It doesn't limit dates to collection days. Reviewer judgement. | Reserve dialog, index.html:113 | Minor | Taste | Compute `min` from today, and limit choices to real collection days once they're known. |
| 24 | The hero claims "keeping hundreds of drills out of landfill and a lot of money in your pocket". This is an unsourced figure beside real counts, and the catalogue holds 3 drills. Anti-fabrication. | Hero paragraph | Minor | Taste | Use the real figure: "Since 2019, neighbours have borrowed tools 3,960 times instead of buying them." |
| 25 | +4 polish: <br>1. The h1 "Share more. Own less." breaks with "less." alone at 1440 (`max-width:14ch`).<br>2. 8 type sizes on one page (13, 14, 16, 18, 20, 22, 28, 64) where 5 would do.<br>3. The last table header is empty, so the action column has no name for screen readers.<br>4. The search has no visible label (placeholder only; `aria-label` exists). | Hero; type scale; table; search | Polish | Taste | 1. Balance the headline with `text-wrap: balance`.<br>2. Merge 13/14 and 20/22.<br>3. Add a visually hidden "Actions" header.<br>4. Add a visible "Search tools" label. |

waived: 0

## 3. Trust

I found no deceptive patterns in what I could see. Note two things:

- **The hero claim (#24):** "hundreds of drills out of landfill" is unsourced. It stays Minor because I can't show it is invented. If the team has no figure behind it, it becomes fabricated social proof.
- **The membership fee:** the £12 a year appears only in the footer. If membership is required before a reservation is honoured, the Reserve flow hides a cost. This is unverified; see §9.

## 4. Landscape

**Category:** community tool library / library of things. I did a short study, scaled to a single-page app, checked 2026-10-26.

**Products studied:**
- **myTurn**, the reservation platform many tool libraries use (category leader). Members reserve a specific period instead of joining a hold queue, and can filter by what's free in a date range. Sources: [JCLS](https://jcls.org/2022/08/17/library-of-things-and-myturn/), [Indiana Humanities guide](https://indianahumanities.org/wp-content/uploads/2025/07/IH-Novel-Conversations-MyTurn-User-Guide.pdf), [KDLA training](https://kdla.ky.gov/Library-Support/Library-Staff-Development/Documents/Webinar-Attachments/Mastering%20myTurn-A%20New%20Chapter%20for%20KDLA%20Kit%20Scheduling%20-%20Slides.pdf).
- **Lend Engine**, a challenger built for small volunteer libraries. Its member site shows availability and online reservation, has a waiting list for unavailable items with an automatic email when an item comes back, and can mark items as in repair. Sources: [lend-engine.com](https://www.lend-engine.com/), [for tool libraries](https://www.lend-engine.com/software-for-tool-libraries), [pricing](https://www.lend-engine.com/pricing).
- **Library of Things (UK)**, a peer with self-service kiosks. You reserve online and collect from a named kiosk or locker; if the item is available you can collect it right away. Source: [How borrowing works](https://libraryofthings.co.uk/how-it-works).
- **Brunswick Tool Library**, a volunteer-run peer. Members pick a date, add tools and submit, with a confirmation email; pickup is limited to certain weekdays. Source: [how to reserve tools](https://www.brunswicktoollibrary.org/how-to-reserve-tools).
- **Adjacent exemplar: car clubs such as Zipcar** (unverified, from memory). Search starts with "when", and every result shows availability for that time slot.

**Conventions to keep:**
- Reserve a specific date range, not a queue (myTurn).
- Show the pickup location next to the booking (Indianapolis PL via myTurn; Library of Things kiosks).
- Confirm by email (Brunswick).

**Convergence to avoid:**
- Generic catalogue grids with a stock "Reserve" button and no date context. Every myTurn and Lend Engine embed looks the same.

**Frontier moves:**
- Date-first availability filtering (myTurn, KDLA).
- A waitlist with an automatic "back in" email for out-on-loan items (Lend Engine pricing page).
- Collection from a named locker (Library of Things).

**Openings** (things no studied product does that Lendwell's material justifies):
- Lendwell's practical handling notes ("Heavy, bring a trolley", "Petrol, bring own fuel") are its own content. No peer brings this kind of note into the booking confirmation.
- Volunteer-staffed Saturday collection could become the pickup slot itself, instead of an "usual place".

**Step counts** (none sourced as a count, so not used for the peer-gap bar):
- Lendwell's core task, as measured: scroll past the hero → Reserve → pick a date → pick a length → Submit. That is 4 inputs plus a scroll of 933 px.
- myTurn: pick dates → add items → submit, per the public guides; the count is unverified.

## 5. Distinctiveness verdict

**Verdict: default-assembled.** The slop-cluster threshold is met, which forces this verdict.

**Channels:**
- Type: platform default (system-ui, untouched).
- Colour: trend default. A sustainability green and a decorative 135° gradient hero, where the gradient encodes nothing. The green itself traces to the brand token and is kept as an asset.
- Shape: library-style default (8/12 px radii, 1 px hairline cards).
- Motion: trend default (perpetual marquee).
- Iconography: default (a Unicode ☆ glyph and coloured dots).
- Imagery: none (gradient only).
- Sound and haptics: n/a.
- Layout idiom: trend default (hero, then a 3-number metric row, then a card grid).
- Voice: **authored**. "Started in a garage on Alder Street in 2019", "bring a trolley", "ask a volunteer on Saturday" trace to the subject.

**Counts:**
- 1 of 9 channels authored.
- No signature element; 0 signature moments.
- Catalog tells, AI-template section: 1 hero metric row, 2 perpetual idle motion, 3 motion that ignores Reduce Motion, 4 decorative gradient, 5 a disabled state that looks enabled, 6 a blank search result list, 7 a vh-sized hero.

**Tests:**
- Logo-off: nothing in the layout or colour identifies Lendwell. Only the copy does.
- Competitor swap: you could drop in any myTurn or Lend Engine catalogue embed and nobody would notice.

**Proposed directions (no `direction` set; pick one):**

**A. "On the calendar": time is the material.** A loan is a slot of days, so the identity lives in dates.
- Colour roles:
  - light: bg #faf8f4, text #1f2a24, muted #5f6b64 (5.25:1 on bg), free-day accent #1f6b4a (6.44:1 on #fff), booked/out #a8432a (6.0:1)
  - dark: bg #151a17, text #e6ebe7 (14.6:1), muted #9aa59f (6.93:1), accent #7fd1a6 (9.71:1), out #e8836b (6.62:1)
  - All computed with `contrast.py`. The green is kept from the brand token.
- Type: system-ui for UI, with tabular figures (`font-variant-numeric: tabular-nums`; available per type-eval) for every date and count.
- Shape: a square-cornered day cell, 4 px radius.
- Motion: none on idle. A 150 ms fade when the date changes (reduced motion: instant).
- Icons: none beyond a calendar glyph from one open set.
- Signature element: a 7-day strip on each card showing free and booked days.
- Signature moment (behavioural): pick a day once and the whole grid re-sorts to what's free that day.
- Voice samples:
  - "Free Thu 5 to Sun 8 Nov."
  - "Back Sat 14 Nov. Tell me when it's back?"
  - "Cordless drill reserved for Thu 5 Nov."
- Against peers: myTurn filters by date range but shows the same tiles. Library of Things leads with lockers. Lendwell would show time on every card.

**B. "The Saturday table": volunteers and handling notes are the material.** The library is people at a table in a garage.
- Colour roles:
  - light: paper #ffffff, ink #1f2a24, green #1f6b4a for one primary action per view, note text #5f6b64 (5.56:1)
  - dark: as in A
- Type: Atkinson Hyperlegible (OFL) for UI and notes. It needs a type-eval run before adoption; system-ui has I/l rendering identically at 14 and 16 px. System-ui is the fallback.
- Shape: notes set as small handwritten-style labels is ruled out (kitsch). Plain inset note blocks instead.
- Motion: none.
- Icons: one stroke family at 1.5 px, used only for handling notes (weight, fuel, safety).
- Signature element: a "Before you collect" block on each tool and in the confirmation, carrying its handling note.
- Signature moment (verbal): the confirmation names the volunteer slot.
- Voice samples:
  - "Heavy. Bring a trolley or a friend."
  - "Collect Saturday 10:00–13:00 at the Alder Street garage."
  - "Back 14 Nov. We'll email you."
- Against peers: Lend Engine and myTurn treat notes as metadata. Library of Things removes people (lockers). Lendwell would put its people and its practical knowledge in front.

## 6. Type

```
Face: system-ui (SF Pro on this macOS run) 400/700. Roles: UI, reading, data, display
Legibility: CONCERN. x-height ratio 0.72; confusables failing I/l @14px and 16px (identical render, Chromium); weights 400, 700; Bold Text n/a
Figures and features: tabular available, not by default; distinct zero n/a (no zero-heavy data); alternates used none
Coverage: system font, Latin assumed; other scripts unchecked
Scaling: rem issue. All sizes in px, so root 200% has no effect (#13); 1.4.12 not tested
Delivery (web): no font files (0 KB), system stack with Segoe UI and sans-serif fallback
Distinctiveness: default tier yes; identity carried by nothing
Verdict: Tune (rem sizes; tabular-nums on counts and dates; 5 sizes instead of 8). Replace only if direction B is chosen (constraint: I/l distinction for tool names and model numbers; candidate Atkinson Hyperlegible, not yet measured)
Evidence: work/type-eval.json, work/shots/full-1440.png
```

## 7. Reworks

**R1. Open on the tools, and book by date** (bar: Premise)
- **What changes:**
  - Before: an 88vh marketing hero and ticker sit above a catalogue whose counts ignore dates. Reservations are a separate table below.
  - After: the first viewport holds "When do you need it?" (a day picker defaulting to the next collection day), search, and the grid filtered to what's free that day. An upcoming reservation shows as one line above the grid. The story and stats move to a short About section below the catalogue.
- **Evidence:**
  - #7: tools start at y=933 at every width.
  - #14: availability is not tied to the date.
  - #15: pickup place and time are unknown.
  - #10: the confirmation carries no date or place.
  - The core question for a member is "can I get X on Y?". The first screen answers neither.
  - Peers book by date (myTurn, per the JCLS and KDLA sources).
- **Cost:** one page. The hero, the cards (date-aware availability) and the dialog (the date moves out of it, leaving only length) change. It needs a per-date stock model and some learnability work for members used to scrolling.
- **Unlocks:**
  - The dialog shrinks to one decision.
  - Out-on-loan tools can offer "Reserve from 14 Nov".
  - Double-booking stops.
  - A waitlist email becomes possible.
- **Smallest experiment:** a throwaway prototype of the top 900 px with a date chip and a filtered grid. Five members try to "get a hedge trimmer for next Saturday"; compare time and errors with the current page.

**R2. Identity from Lendwell's own material** (bar: Identity)
- **What changes:**
  - Before: gradient hero, metric row and marquee, with the voice as the only authored channel.
  - After: one direction from §5 (A or B) carried through the colour roles, the signature element and the confirmation copy.
- **Evidence:** #16 and the §5 counts. Removing the gradient or the ticker alone would leave a plain card grid, the next default.
- **Cost:** a token layer (all literals are currently inline; #8), card and confirmation templates, no new screens.
- **Unlocks:** dark mode and increased contrast from the same roles, and a page a neighbour would recognise as Lendwell's.
- **Smallest experiment:** mock one card and one confirmation in each direction, then run a five-second recall test with members.

## 8. Enhancements

Evidence is moderate, so there are three, not eight.

**Experience and flows: "Tell me when it's back" on out-on-loan tools** (Agency)
- **Where:** the Wallpaper steamer card shows "Back 14 Nov" behind a dead-looking button.
- **What:** a one-tap request that emails the member on return. Lend Engine offers this on every plan (pricing page).
- **Unlocks:** fewer volunteer emails asking "is it back?".

**Content and voice: put handling notes in the confirmation** (Responsibility)
- **Where:** "Heavy, bring a trolley" and "Petrol, bring own fuel" sit in the 14 px meta line and vanish after booking.
- **What:** repeat the note in the reservation row and the confirmation ("Lawn aerator, Sat 7 Nov. Heavy: bring a trolley").
- **Unlocks:** fewer wasted trips. This is the opening in §4.

**Information architecture: replace the ticker with pinned notices** (Simplicity)
- **Where:** closures, new tools and volunteer calls are three different kinds of message in one moving line.
- **What:**
  - Closures go into the date picker as unavailable days.
  - "New this week" becomes a sort or filter in the grid.
  - Volunteer calls go in the footer.
- **Unlocks:** each message appears where the member acts on it.

## 9. Unverified

- **Save star:** has no persistence and no saved list. It may be unfinished; dead controls are Major in development. Check whether stars should persist and where saved tools appear.
- **Membership:** whether members must pay or sign in before reserving (footer £12). Owner confirmation and a sign-in flow would verify.
- **Loading, error and offline states:** not exercised. The data is hard-coded, with no network requests. Verify once an API exists, using `page.route` aborts and `setOffline`.
- **Validation:** only the browser's native "Please fill out this field." was seen. Past dates, closure days and overlapping reservations were not tested beyond `min`.
- **Toast:** has `role="status"`, but whether screen readers announce it was not confirmed. Test with VoiceOver and NVDA.
- **Forced colours and `contrast: more`:** screenshot taken (`work/shots/forced-1440.png`) but not judged in detail. Availability dots lose colour there; the text still carries the meaning.
- **Pseudo-localisation (+40%):** captured (`work/shots/pseudo-390.png`, `pseudo-1440.png`) but not examined row by row. Check card and button wrapping by eye.
- **Very wide (2560):** captured (`work/shots/wide-2560.png`) and not judged beyond the 980 px max-width.
- **Browsers:** Firefox and WebKit were not run. Repeat the measurement and type-eval in those engines.
- **Landscape:** step counts are not sourced as counts, so R1 does not claim the peer-gap bar. The Zipcar exemplar is from memory (unverified).

## 10. Offer

**Fixable in code now:**
- Focus and keyboard: 1, 5 (focus part), 6 (focus part), 20
- Motion: 2
- Contrast and tokens: 3, 8, 11 (styling)
- Accessible names and states: 4, 19, 20, 25.3
- Dialog bug: 5
- Undo on cancel: 6
- Copy rewrites: 9, 10, 17, 22, 24, 25.4
- Layout: 12, 13, 18, 21, 25.1, 25.2
- Dates: 22, 23

**Need a design decision first:**
- 7 (hero placement), 14 (per-date stock model), 15 (the real pickup place and time), 16 (direction A or B).
- Whether the star (4) stays, and the membership question.

I can build an enhancement (the waitlist, or handling notes in the confirmation) or a throwaway prototype of R1's top viewport. Which would you like?

Optional input that would let me verify more: the real pickup rules and location, and an API or backend so I can test loading, error and offline states.
