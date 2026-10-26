<!-- model: claude-haiku; skill commit: 7559367 -->

# Loupe review: Lendwell (single-page web prototype)

## 1. Summary

- **Reviewed:** `lendwell/index.html` (one file, 124 lines: CSS, markup, inline script). Unit: whole app (6 tools, one reservation flow, one table). Input: running page in local Chromium (file://), measured at 390, 820 and 1440 px, light and dark, reduced motion on and off, plus interaction probes.
- **Verdict:** Not ready for anyone beyond the team. Two WCAG A/AA failures are source-confirmed (focus rings removed; auto-moving ticker with no pause), contrast on card metadata measures 2.21:1, and the reservation flow loses typed input and never reduces availability. The page also presents invented membership and stock numbers as fact.
- **Most important to do:** Fix the Blockers first (focus ring, ticker pause, metadata contrast), then the reservation flow (date wipe, availability, cancel with no undo). Reworks: none warranted (see section 7).

**Assumptions (no owner answers; safe defaults, nothing written to `.loupe.md`):**
- `platforms: web`. Native rules not applied.
- `release_stage: development`, so dead controls are Major, not Blocker, and App Review checks (4.2, 2.1) are not applied.
- `voice`: sentence case; British spelling (the copy uses "neighbours" and £). Inferred, not confirmed.
- `register: utilitarian` (inferred: a frequent check-and-reserve task).
- `density: comfortable`. `humor: none`. `direction`: empty, so the distinctiveness pass gives a verdict only and proposes no theming.
- Landscape (1b): not run. No web research was done in this pass, so no peer claims are made.

**Run notes**
- Tools: Node scripts with the local Playwright install in `work/`. Playwright MCP was not used. Scripts: `work/measure.cjs` (ran the skill's `measure.js` over 12 combinations, which is the same loop as `measure-runner.js`), `work/probe.cjs` (keyboard walk, reservation flow, search, mobile), `work/stress.cjs` (320 px reflow, 200% root font, dark, RTL), `work/long.cjs` (long names at 390 px).
- Evidence: `work/measure-full.json`, `work/type-eval.json`, screenshots in `work/` (`desk-1440-top.png`, `mob-390-top.png`, `dialog-after-length.png`, `long-strings-390.png`, `reflow-320.png`). Full paths are under `work/`.
- Measurement results: contrast and target results were identical in all 12 combinations. Contrast failures: card metadata only (2.21:1). Hero text is over a gradient (unmeasurable by the script); pixel-sampled text areas measured 5.2 to 5.6:1. Targets: 18 under 44 px, none under 24 px without spacing; all 18 pass 2.5.8. Motion: one infinite animation (ticker), `reducedMotionRule: false`. Type: system-ui; sizes 13 to 36 px, all in px. Physical CSS properties: 5, logical: 0. Coverage: no iframes or shadow roots.

## 2. Findings

Impact sort, then Apple column. Line numbers refer to `lendwell/index.html`.

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | Focus ring removed on every control: `button,input,select,a{outline:none}`. Computed outline is `none` on every tab stop (tested: links, search, select, all buttons). Keyboard users cannot see where they are. WCAG 2.4.7 (AA), source-confirmed. | Line 27; all pages | Blocker | Web | Delete `outline:none`. Add `:focus-visible{outline:3px solid var(--brand);outline-offset:2px}`. Check it against 3:1 on white and on the #faf8f4 background. |
| 2 | Ticker scrolls forever (`animation: tick 14s linear infinite`) with no pause control and no reduced-motion rule. WCAG 2.2.2 (A), source-confirmed; measured `reducedMotionRule: false` in all 12 combinations. | Lines 14-16, 53 (header ticker) | Blocker | SHOULD (content-a11y.md:45, reduce repeating animation) | Add a visible Pause/Play button. Under `@media (prefers-reduced-motion: reduce)` stop the animation and show the text statically. |
| 3 | Card metadata (category and note, e.g. "Power · 18V, two batteries") is `#a9b0ab` on white: 2.21:1 at 14 px, failing 4.5:1. Measured on all 6 cards, every width and mode. | Line 33 (`.meta`), every card | Blocker | Web | Use `#5f6b64` (5.56:1 on white, already used for "3 available"). |
| 4 | Invented or unsupported figures in copy: hero says "412 members", "181 tools", "3,960 loans", "over 180 tools", and the browse grid shows 6 tools. Ticker names "pressure washer, tile saw, 3 hedge trimmers", none of which are in the grid. The hero also says "hundreds of drills out of landfill", which is unsupported. | Lines 53, 57-58 | Blocker | Taste (Trust gate) | See Trust. Replace with figures from the real library, or label them as placeholders before any release. |
| 5 | Save (☆) button only swaps its glyph. Nothing is stored, no list uses it, and its accessible name is the symbol "☆" (no label, no state). Dead control. | Line 37, 98; each card | Major (dead control, dev stage; Unverified: may be unfinished) | Taste (reviewer judgement) | `aria-label="Save Cordless drill"` and `aria-pressed`. Persist it and show a Saved list, or remove the button. |
| 6 | Disabled Reserve on Wallpaper steamer looks identical to enabled buttons: `.btn` has no `:disabled` style, the button has the same brand background, and no reason is given beyond "Out on loan". | Line 28, 101; "Wallpaper steamer" card | Major | Taste (inputs-tech.md:217 slop tell); Web (web-mapping: disabled buttons cannot explain themselves) | Style `:disabled` (muted, `cursor:not-allowed`). Show "Back 14 Nov" next to Reserve, or offer "Notify me". |
| 7 | Reserving does not change availability. Reserving the drill (qty 3) leaves "3 available"; repeated reservations are unlimited. Measured in probe. | Line 118 (submit), 100 (avail text) | Major | reviewer judgement (no Apple line covers inventory) | Count reservations per date range against qty; show availability for the chosen date. |
| 8 | Changing "Loan length" wipes the pickup date. `renderDlg()` re-renders with `value="${date}"`, but `date` is never updated, so a typed "2026-11-05" becomes empty. Reproduced and screenshot-confirmed. | Line 117 (onchange), 113 | Major | SHOULD (principles-platforms.md:35, no lost form input) | Save the date on `input`, or update only the length without re-rendering the dialog. |
| 9 | Search with no matches shows a blank grid (`#grid` empty for "xyzzy"); no message, no clear action. | Line 96-101, 120 | Major | SHOULD (inputs-tech.md:95, suggest alternatives instead of empty "no results") | Render "No tools match 'xyzzy'" with a Clear search button. |
| 10 | Cancel reservation is immediate: no confirmation and no undo; toast says "Done". Losing a booking is irreversible here. | Line 108 | Major | SHOULD (components-presentation.md:67; beyond-hig.md:176, undo for everything) | Show "Reservation cancelled. Undo" in the toast for about 5 s; keep the booking until it expires. |
| 11 | Browse starts at y = 933 px on a 1440x900 screen. The hero is `min-height:88vh`, so the primary task sits below the fold. | Line 17 (`.hero`), 22, 62 | Major | Taste (structure, reviewer judgement) | Cap the hero (for example `min-height: 0`, padding about 48 px) so the search and first row show above the fold. |
| 12 | Reservations table has `min-width:640px` with no scroll container. The page scrolls sideways: scrollWidth 664 px at both 390 and 320 px. Data tables may be exempt from WCAG 1.4.10, but the whole page still scrolls. | Line 38; `#resv` | Major | Web | Wrap the table in `overflow-x:auto`, or stack rows as cards below about 600 px. |
| 13 | No dark mode. No `prefers-color-scheme` rule and literal hex values everywhere; with dark emulated the page is identical (bg `rgb(250,248,244)`). Pass 3 rule: a literal color with no dark variant is Major. | Lines 8, whole CSS | Major | Web (visual.md Dark Mode; web-mapping colour section) | Move colors to `:root` tokens and add `@media (prefers-color-scheme: dark)` values. Recheck contrast in dark. |
| 14 | All type is in px (`font:16px`, `.meta 14px`, `th 13px`, etc.). At a root font size of 200%, body stays 16 px and `.meta` stays 14 px. Browser zoom still works, so WCAG 1.4.4 passes, but user font settings are ignored. | Lines 10, 22-48 | Major | Web (web-mapping Text, Major not Blocker) | Use `rem` for font sizes and spacing that should follow user settings. |
| 15 | Save button and header nav targets are small: star 32x32 px (under 44 px goal, over 24 px minimum); header links 18 px tall. Both pass 2.5.8 through spacing (`spacingOk: true`). | Line 37; lines 13, 52 | Minor | Web (44 px goal) | Use 44 px hit areas for star and header links. |
| 16 | Star button overlaps long card titles at 390 px (tested with "Àçcéntéd extra longer name"). The title runs under the star. | Line 37, 99 (`.card h3`) | Minor | Taste | Add right padding on `h3` equal to the star's width. |
| 17 | Empty "My reservations" shows only its heading when there are no bookings. No explanation or link to browse. | Line 105-106 (`renderResv`) | Minor | SHOULD (beyond-hig.md:200, empty states say how content will appear) | Add "No reservations yet. Browse tools to book one." with a link to #tools. |
| 18 | Dialog cancel button says "Close" and the form has no label association for the dialog heading. Web idiom is Cancel plus a verb. | Line 115 | Minor | Web (web-mapping, Forms) | Rename to "Cancel". Add `aria-labelledby` from the dialog to its h2. |
| 19 | Pickup date `min="2026-10-27"` is hard-coded and will go stale; the table shows raw ISO dates ("2026-11-02") with no weekday or return date. | Lines 105, 113 | Minor | Taste | Compute `min` from today; show "Mon 2 Nov, back Wed 4 Nov". |
| 20 | Pickup info is "Collect from the usual place": no address, no hours. | Line 105 | Minor | Taste (content) | Show the real pickup address and hours (needs a fact from the owner). |
| 21 | Generic toasts: "Success" (line 118), "Done" (line 108). Say what happened: "Reserved: Cordless drill, collect 2 Nov." | Lines 108, 118 | Minor | Taste (writing.md) | Use the rewrites shown. |
| 22 | Layout template tells: full-bleed green gradient hero, centred stats row, marquee ticker, uniform card grid with a star corner. Provisional: the full slop catalog was not counted in this pass. | Lines 14-17, 55-59, 62-68 | Minor | Taste | Replace the hero with a product-specific first screen (the search and tools). Not a Blocker. |
| 23 | Five physical CSS margins/insets (`margin-left`, `right`) and zero logical ones; RTL would not mirror. Only matters if RTL is a goal. | Lines 13, 37, 45 | Polish | Web (web-mapping, logical properties) | Use `margin-inline-start` and `inset-inline-end`. |

**waived: 0**

## 3. Trust

- **Element:** hero stats (`412 members`, `181 tools`, `3,960 loans`), hero paragraph ("Today 412 neighbours share over 180 tools"), and the ticker ("New this week: pressure washer, tile saw, 3 hedge trimmers").
- **Screen:** top of the page.
- **Why:** the browse grid shows 6 tools, not 181, and none of the ticker's new items appear. These are invented counts presented as fact.
- **Honest rewrite:** use the library's real counts, or mark them as placeholders until they are real. Take the ticker items from the real catalogue.
- Caveat: this is a development build. If the numbers are placeholders, the Blocker still stands until they are replaced or flagged, because the copy reads as fact.
- Also check the hero claim "keeping hundreds of drills out of landfill", which has no source.

## 4. Landscape

Not run. No web research or peer study was done in this pass, so no conventions or openings are claimed.

## 5. Distinctiveness verdict

**Provisional: default-assembled.** Evidence: the green gradient hero, centred stats row, marquee ticker and uniform card grid with a corner star are common template choices. The full slop-catalog count was not done, so treat the verdict as provisional. No `direction` is set, so no theming is proposed. Logo-off and competitor-swap tests were not run (no peers researched).

## 6. Type

- Face: system-ui only (no custom face). Sizes measured: 13, 14, 16, 18, 20, 22, 28, 36 px. Smallest text 13 px (table headers), under the 16 px body rule on mobile web but not a defect on its own.
- Heading scale is clear (h1 36-64 px, h2 22 px, card h3 18 px). Hierarchy is fine.
- Defects: finding 14 (px sizing), finding 3 (contrast of metadata text).

## 7. Reworks

**No rework warranted.** The defects are local (CSS, a few handlers, copy). The reservation model (finding 7) lacks a per-date inventory, but that is a fix plus an enhancement, not a rework: no single structural change clears the rework bar for this one-page prototype.

## 8. Enhancements

Evidence is thin (one screen, no peers researched). Three only:

- **Experience and flows:** the reservation sheet should show availability for the chosen dates and the return date before Submit (Simplicity, Agency). Ties to finding 7 and the existing "1 day to 1 week" options.
- **Experience and flows:** for out-of-stock tools, offer "Notify me when back" next to the "Back 14 Nov" note in the Wallpaper steamer card (Agency, Flexibility).
- **Content and voice:** write the pickup line as a real place and time, not "the usual place" (Purpose, Familiarity).

## 9. Unverified

- Error, offline and loading states: the app is static and has no network code, so none exist to test. Verify by adding a data source and driving `route.abort`.
- Empty catalogue and very long strings at 1440 px: long names were tested at 390 px only.
- Hero gradient end stop `#2f8f65` gives 4.01:1 with white text. Pixel sampling of the text blocks gave 5.2 to 5.6:1, so it passes as shipped. Recheck if the gradient or text changes.
- Keyboard walk, focus and dialog behaviour were tested in Chromium only. Firefox, WebKit and screen-reader order were not tested.
- Reduced motion beyond the ticker, RTL rendering (only the CSS property count was checked), and `prefers-contrast: more`.
- Dead-control findings (5) may be unfinished development work. Confirm with the team.
- Landscape: not run.

## 10. Offer

Fixable in code now (no design decision needed):
- **Accessibility tokens and CSS:** 1 (focus ring), 2 (reduced motion for ticker, plus Pause), 3 (`.meta` colour), 14 (rem sizing), 15 (targets), 16 (title padding), 12 (table scroll wrapper), 13 (dark tokens).
- **Copy rewrites:** 4 (after the owner confirms the figures), 18 ("Cancel"), 19, 20 (needs the address), 21, 17, 9.
- **Behaviour fixes:** 6 (disabled style and reason), 8 (keep the date when the length changes), 9 (empty search), 10 (undo toast), 7 (availability from reservations).

Needs a design decision first: 11 (hero height and first-screen content), 5 (keep favourites or remove the button), 22 (visual direction).

Optional inputs that would let the review verify more: the real library figures and pickup details, the intended release stage and voice, and a running backend for error and offline states.
