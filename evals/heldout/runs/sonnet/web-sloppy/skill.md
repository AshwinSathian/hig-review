<!-- model: claude-sonnet; skill commit: 7559367 -->

# Lendwell review (loupe)

Loupe is independent and not affiliated with Apple.

## 1. Summary

Reviewed: whole app (single page, 6 tools, 1 reservation dialog), input a running web app (file:///.../lendwell/index.html) plus its source (one file, 7455 bytes). Profile: none on disk; none written. The owner was unavailable, so the draft profile ran on defaults.

Verdict: the product is a small, working reservation tool wrapped in a marketing page. Several defects block keyboard users and mobile users, and the reserve flow loses input and gives no real confirmation.

Do first: restore a visible focus indicator (findings 1, 2), stop the reserve dialog wiping the date (3), and lead with the tool list instead of an 88vh hero (4).

Assumptions (questions recorded, not answered):
- Questions for the owner: purpose in one sentence; audience and visit frequency; peers; any brand assets (logo, colours); target browsers; is a hold or a loan record created on submit; real release date.
- Platform: web only (desktop and mobile browsers). No native Apple rules applied.
- release_stage: development. Dead controls are Major, not Blocker; App Review checks not run.
- Register: utilitarian (a frequent check-and-act task: find a tool, reserve it).
- Voice: sentence case, British spelling (neighbours, Membership £, "Bank Holiday"), humor none.
- Density: comfortable. No direction set. No waivers.
- Build SDK and 26-gate: not applicable (web).

Run notes:
- Tools: Node and Playwright Chromium (scripts and screenshots in `work/`). measure-runner.js was run (widths 390, 820, 1440 x light, dark x reduced motion), saved in `work/measure.json`. type-eval.js in `work/type.json`. Probe script `work/probe.js`. Screenshots: `full-390.png`, `full-820.png`, `full-1440.png`, `dark.png`, `dlg.png`, `dlg-390.png`, `t200-390.png`, `rtl.png`, `forced.png`, `empty-resv.png`.
- Measurements: 57 text nodes checked per combination, 6 contrast failures, 8 unmeasurable (the hero, over a gradient), 18 targets, 3 under 24 px, 9 to 10 under 44 px. Results were identical across light and dark and across reduced motion (the page has no dark or reduced-motion CSS). The 1 animated-on-load element is the ticker; reducedMotionRule false, unreadable sheets 0 (so it is a true absence).
- Side effects: in-page DOM edits (200% root size, dir=rtl) were done in throwaway pages and reloaded. No offline or error routes were driven (the app has no network calls).
- Landscape: no web research was done (an unattended run; claims below come from memory and are marked unverified).

## 2. Findings

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | Focus indicator removed everywhere: `button,input,select,a{outline:none}` (style block) and no replacement. Tab walk of 22 stops shows `outline-style: none` and no box-shadow on every stop (links, search, select, stars, Reserve, Cancel). A keyboard user cannot see where they are. WCAG 2.4.7 fails (AA) | Whole page, CSS rule `button,input,select,a{outline:none}` | Blocker | Web | Delete the rule; add `:focus-visible{outline:3px solid var(--brand);outline-offset:2px}` (check 3:1 against both the white cards and the green hero) |
| 2 | Same cause hits the dialog: after `showModal()` focus lands on the date input with no ring, and Close/Submit have none. Merged under the root cause of 1 for the fix, but listed because the dialog is the money step | Reserve dialog | Blocker | Web | Fixed by 1; also return focus to the invoking Reserve button on close (not currently done) |
| 3 | Changing "Loan length" re-renders the whole dialog and clears the chosen date (`renderDlg()` in the `#n` onchange; `date` is never updated from the input). Measured: date set to 2026-11-05, select to 3 days, date input reads empty. Anyone who picks the date first (the natural order) loses it, and no message says so | Reserve dialog, Loan length | Blocker | Web | Do not re-render on change; just set `days`. Data loss in a task flow (user-entered input discarded). Retain `date` on input |
| 4 | Hero takes 88vh (792 px of 900) and pushes the actual tool list to y=1040 at 1440 and y=1090 at 390, below the first screen on both. A returning member's frequent question is "is the drill free?"; the first screen answers "how did Lendwell start?". Premise attack with evidence: the core object is below the fold | Top of page, `.hero` | Major | Taste | Cut hero to a compact strip (or move the story and stats under the list); put the search and tool grid in the first viewport. Reviewer judgement (red-team layer 1) |
| 5 | Hero body text and stat labels are white on a gradient from #1f6b4a to #2f8f65. White on #2f8f65 is 4.01:1 (computed from the source colours), under 4.5 for the 18 px paragraph and 16 px labels on the right-hand end; the runner marks the rows unmeasurable (background image). Over a gradient this is by eye, so capped at Major | Hero paragraph, "members/tools/loans" | Major | Web | Darken the light stop to about #25805a or lower so every pixel is 4.5:1; confirm with png_contrast.py on `hero.png` |
| 6 | Secondary text is #a9b0ab on white (2.21:1, measured, fail) for the card meta line ("Power · 18V, two batteries") on all 6 cards. It carries real information (battery count, "bring own fuel", "Back 14 Nov"). WCAG 1.4.3 fails | `.meta` on tool cards | Blocker | Web | Use `--muted` #5f6b64 (about 5.5:1 on white) or darker |
| 7 | Mobile (390 px): the reservations table has `min-width:640px` with no scroll wrapper (parent overflow visible). Page `scrollWidth` is 664 at a 390 viewport, so the whole page scrolls sideways, the header ticker is cut, and the Cancel button sits off-screen at about x=420 (see `full-390.png`) | My reservations table | Major | Web | Wrap the table in an `overflow-x:auto` container, or below 600 px render each reservation as a stacked card with its Cancel button |
| 8 | "Cancel" deletes the reservation instantly with no confirmation and no undo; the only feedback is a 3 s toast reading "Done". On a phone the Cancel sits next to the row text, easy to hit. (Verified: click removes the row, toast "Done".) | My reservations | Major | Web | Offer "Undo" in the toast for about 8 s ("Reservation for Socket set cancelled. Undo"), or confirm first |
| 9 | Submit gives toast "Success" and nothing else. The tool's availability does not change (drill stays "3 available" after reserving it), and the same tool and date can be reserved again (3 rows after a duplicate). The product cannot be trusted to hold the tool. Dead-state or unfinished backend: Unverified line below | Cards `.avail`, reservations | Major | Taste | Decrement or show "Reserved for you", block duplicates, and say what happened: "Cordless drill reserved for Thu 5 Nov, 3 days. Collect from the usual place." |
| 10 | Copy is generic: toasts "Success" and "Done"; button "Submit"; "Close" (it abandons the reservation, so it should say Cancel); "Collect from the usual place" repeats on every row and names no place; dialog title "Reserve Cordless drill" lacks "a/the". Writing rule: say what happened | Toast, dialog, table | Major | Research | "Reserved: Cordless drill, 5 to 8 Nov." / "Reservation cancelled." Primary "Reserve", secondary "Cancel". Show the real pickup address or a link to Help |
| 11 | Favourite star buttons ("☆"/"★") have no accessible name and no pressed state (aria-label null, text is the glyph). A screen reader says "white star", and the toggle is by glyph only. 4.1.2 name/role/value fails; the stars also do nothing else (no favourites list), so they may be unfinished | Each card, `.save` | Blocker | Web | `aria-label="Save Cordless drill"` and `aria-pressed`; either build a Saved view or remove the stars (dead-control note in Unverified) |
| 12 | Star buttons are 32 x 32 px and sit above Reserve with a 10 px offset; Reserve itself is about 44 px high (OK). Three nav links are 18 px tall (38 to 115 px wide), at 24 px spacingOk true so WCAG 2.5.8 passes | Nav "Tools / My reservations / Help"; `.save` | Minor | Web | Min 44 x 44 hit areas on stars and nav links (padding), more gap between nav links |
| 13 | Ticker marquee scrolls forever (`animation:tick 14s linear infinite`), cannot be paused, no reduced-motion rule (measured `reducedMotionRule:false`), text starts off-screen at 100% padding and is unreadable as a sentence ("Library closed Bank Holiday Monday" is the one piece of operational news). WCAG 2.2.2 (A) needs pause/stop for moving content over 5 s | Ticker under the header | Blocker | Web | Replace with a static line (or 1 to 3 visible notices); if it must move, add a pause control and `@media (prefers-reduced-motion:reduce){animation:none}` |
| 14 | Out-of-stock "Wallpaper steamer" shows a disabled Reserve button and "Out on loan" while the note "Back 14 Nov" sits in the pale meta line (finding 6). The disabled button offers no route (join a waitlist, reserve from 14 Nov), a dead end for a member. Disabled colour is the browser default | Wallpaper steamer card | Major | Research | Keep it enabled as "Reserve from 14 Nov" opening the dialog with min date 2026-11-14; or "Tell me when back" |
| 15 | Dialog date `min="2026-10-27"` is hard-coded (the review date is 2026-10-26); it will be wrong tomorrow. Browser validation blocked 2020-01-01 only because of this min, with a native tooltip and no inline message; no max or "closed on" days (library closed Bank Holiday Monday) | Reserve dialog | Major | Web | Compute min from today's date; list closed days; show an inline error with `aria-describedby` |
| 16 | Both empty states are blank: with zero reservations `#resv` is an empty string (heading "My reservations" over nothing), and a no-match search leaves `#grid` empty with no message | My reservations; Browse tools search | Major | Research | "No reservations yet. Pick a tool above." / "No tools match 'zzz'. Clear the search." |
| 17 | No dark-mode or increased-contrast support: `dark.png` is identical to light (measured, no `prefers-color-scheme` rule), hex literals everywhere (#fff, #444, #b3472f). The page is a light-only design; also hard-coded literals (not tokenised) in 10+ places | CSS | Minor | Web | Add dark token set under `prefers-color-scheme:dark`; move #fff/#444 into variables |
| 18 | Availability is carried by a small coloured dot plus text ("3 available" / "Out on loan"); the text is present so colour is not the only cue, but the red/green dots at 8 px are weak. Quantity wording "1 available" reads as ambiguous when a cordless drill's batteries are separate | `.avail` | Polish | Taste | Keep the text, enlarge or drop the dot |
| 19 | Main navigation: "Tools", "My reservations", "Help" are in-page anchors with no `aria-current`, no skip link, and the header is not sticky, so after scrolling to reservations there is no way back without scrolling (hero is 792 px); the page is also a single scroll, so "My reservations" is a section, not a destination | Header nav | Minor | Web | Add skip link, sticky header, `aria-current`; consider a real reservations view |
| 20 | Search runs on every keystroke with no label visible (placeholder plus aria-label only, so a name exists, judged Major max): the placeholder disappears as soon as the user types, and the category select has no visible label either | Search form | Minor | Web | Visible labels or a clear search button; add result count in an `aria-live` region |
| 21 | Loan length offers 1, 2, 3 days or "1 week" with no return date shown and no limit explained; Pickup date row in the table shows ISO "2026-11-02" while everything else is British prose; mixed formats | Dialog, table | Minor | Research | Show "Mon 2 Nov, back by Wed 4 Nov"; one date format everywhere |
| 22 | Dialog has no labelled title association (`aria-labelledby`), the Escape and backdrop paths work natively (checked), but the success toast `role="status"` is added only after the dialog closes; there is no confirmation inside the flow, and the toast auto-dismisses at 3 s (too short for screen reader users, WCAG 2.2.1 AA) | Toast | Minor | Web | Keep toast 6 to 8 s, pause on hover/focus |
| 23 | +polish: `h1` max-width 14ch makes "Share more. Own less." wrap to two lines on desktop, leaving the right 55% of the hero empty; the hero slogan is a template line (Taste); footer "Membership £12 a year" is the only price, with no way to join; physical `margin-left` in nav (5 physical inline declarations, 0 logical) so RTL does not mirror (checked `rtl.png`); table header text 13 px | Hero, nav, footer | Polish | Taste | Use logical properties; show how to join |

waived: 0

Notes on impact: Blockers 1, 2 (same cause), 6, 11 are WCAG A/AA failures measured or confirmed in source (2.4.7, 1.4.3, 4.1.2). 13 is WCAG 2.2.2 (A) confirmed in source. 3 is data loss in the core flow.

## 3. Trust

No deceptive patterns found in what was seen. One adjacent honesty issue: the hero says "412 neighbours", "181 tools", "over 180 tools" and "3,960 loans" while the page lists 6 tools (finding 9 and Unverified). Not fake urgency or social proof by itself, but the numbers cannot be confirmed from the build; if they are placeholders, replace them before release.

## 4. Landscape

Not researched live (unattended run; no web research was performed). From memory and marked (unverified): category is community tool and equipment libraries and rental/booking tools. Likely peers to check: Peerby, Library of Things (UK), Sharetribe-based marketplaces, and a library-catalogue pattern (Libby/Overdrive hold-and-waitlist) as the adjacent exemplar. (unverified)
- Conventions to keep: availability shown on the card, one primary action per card, date picker with a clear return date. (unverified)
- Convergence to avoid: green "sustainability" hero plus three stat counters; an anonymous "Share more. Own less." slogan. (unverified)
- Frontier moves: waitlist or "next available" on out-of-stock items, return-by date and late reminders, a "ready for pickup" status. (unverified)
- Openings: Lendwell is volunteer-run and local; the product could show who is on duty Saturday, the library's address and opening hours on the card, and the lender's note (battery count, fuel). (unverified)
No peer step counts were sourced, so no rework can cite the peer-gap condition.

## 5. Distinctiveness verdict

Partly authored, leaning default-assembled. Channels: colour is a single green brand with a cream background (#faf8f4) and warm line colour (slightly authored); type is `system-ui` (platform default); layout is hero, stat counters, card grid (template default); shape (12 px cards, 8 px radius) library default; motion is an infinite marquee (trend default); imagery none; iconography is Unicode stars (default); voice has real specifics ("garage on Alder Street in 2019", "bring a trolley", "bring own fuel"), which is the authored part; the tool notes are the best content on the page. Fewer than two channels authored, so the verdict is not "authored". Slop tells: green gradient hero, big-number stat row, tagline "Share more. Own less.", generic "Success / Done" microcopy, uniform card grid, `system-ui` only. That is 5 tells over 4 channels, below the 6-tell threshold, so default-assembled is not forced. Logo-off test: the page without the word "Lendwell" could be any local-sharing site (fails). Competitor swap: another tool library could drop in its name and keep the layout (fails).

Directions (no profile direction set; sketched from the product's own subject, tool-library materials, no house style):
- A. Workshop ledger: the library's lending card index. Traced to the subject (a physical loan system run by volunteers). Cream paper #faf8f4 (existing token), ink #1f2a24 (existing), brand green #1f6b4a (existing); stamp-red #b3472f (the existing "out" colour) as the single accent for "out on loan"/due dates. Type: a free slab or mono for dates and item numbers (candidates: Zilla Slab, JetBrains Mono, both OFL), system-ui for body. Signature moment: a "stamped" return-by date on a confirmed reservation. Contrast: #b3472f on #faf8f4 about 5.0:1 (computed from tokens, check with contrast.py).
- B. Street-level noticeboard: the Alder Street garage story. Photo-led cards (each tool photographed on a workbench), hand-lettered "Saturday volunteers" note; colour from the photographs.
- Both differ from peers by being about this place and its volunteers; neither borrows another product's look. These are sketches, to be verified against the landscape before adoption.

## 6. Type

Single face: `system-ui` (resolves to SF Pro on macOS in this run; loaded: true, no font files shipped, so it is the platform face).
- Role: all (display, body, UI, table). Fit: good for a utilitarian tool at body 16 px; x-height ratio 0.72 (high, legible at 14 px). Confusables at 14/16/18: l/1 and I/1 differ by only about 0.93 share of differing ink pixels (fine), `I/l` differ 0 at 14 and 16 px (identical glyphs in this system face), which matters little here (no IDs or codes).
- Scale: 8 distinct sizes (13, 14, 16, 18, 20, 22, 28, 36 to 64 clamp); min 13 px (table header), 14 px for meta. Too many near sizes (18, 20, 22) for a page this small. Weights 400 and 700 only. Numerics in tables are not tabular (`numericInTables: normal`) which matters for dates and counts.
- Defects also in table: sizes in px not rem (does not follow root font size; 200% root size test did scale rem-less text? the 200% screenshot kept layout without page overflow at 390 px, scrollWidth 390). Minor, not logged separately.
- If the identity direction A is chosen, candidate faces need their own verdict block from type-eval.js on a specimen page (Unverified).

## 7. Reworks

No rework warranted. Findings 1, 2, 6, 11 and 13 share a cause ("controls styled from scratch with no accessibility defaults") but per-row fixes remove it and it is a two-line CSS change, so it does not clear the cluster bar. The hero premise (finding 4) is a layout change on one screen, not a model change. No sourced peer step count exists, so the peer-gap condition cannot be met. Identity condition: the verdict is not default-assembled.

## 8. Enhancements

Experience and flows
- Waitlist or "Reserve from 14 Nov" on out-of-stock tools (Agency). Mechanism: the Wallpaper steamer's own "Back 14 Nov" note becomes a bookable date. Unlocks: members stop checking back by hand.
- Return-by date and calendar view in the dialog (Simplicity). Mechanism: a start-and-length picker that shows the end date and which days the library is closed (the ticker already mentions Bank Holiday). Unlocks: fewer wrong pickups.
Information architecture
- Make "My reservations" a persistent entry (a header badge showing the count) instead of a section at the bottom (Familiarity). Unlocks: returning members reach their loan in one tap.
Visual design and brand
- Put each tool's practical note (battery count, fuel, trolley) in the card body in the primary text colour, since that is the useful content (Purpose). Unlocks: the "is this what I need" decision on the card.
- Direction A or B from section 5 as the theming base, one sketch to be tested, not applied wholesale (Craft).
Motion and feedback
- A reserved-state change on the card ("Reserved for you") with an Undo toast (Responsibility). Unlocks: confidence that something happened.
Content and voice
- Rewrite the generic strings in the library's volunteer voice, sentence case, specific (Delight, within humor none). See finding 10.
Platform capabilities
- Add the date's `.ics` download for the pickup (Flexibility). Unlocks: reminders without building notifications.
Evidence for further enhancements is thin: there is no live landscape research.

## 9. Unverified

- Landscape claims: not researched live; verify with web research on 3 to 6 peers.
- Real behaviour of Submit and Cancel with a backend: the app is client-only (array `resv`), so availability, duplicates and holds (finding 9), and the favourite stars (finding 11), may be unfinished; confirm with the owner.
- Hero stats (412 / 181 / 3,960) against real data: cannot verify.
- Error and offline states: the app makes no network requests, so none exist; behaviour with a real API unseen.
- Loading and skeleton states: none exist; unseen.
- Pseudo-localised +40% text and very long tool names: not driven (cards use `h3` with no truncation rule; a long name will wrap, unverified).
- RTL: `dir=rtl` screenshot taken (`rtl.png`); the nav spacing does not mirror (5 physical vs 0 logical properties); fuller RTL review not done.
- Increased contrast and forced colours: emulated once (`forced.png`), not inspected closely.
- Hero contrast across the whole gradient: computed only at the stop colours; pixel sampling (png_contrast.py) not run.
- Screen reader output (VoiceOver, NVDA): not run; names inferred from source.
- Firefox and WebKit: only Chromium run.
- Touch behaviour and the date picker's native UI on iOS and Android: not seen.
- Font files: none shipped, type-eval ran on the system face only.
- Hover states: not captured (no custom hover styles in the source).

## 10. Offer

Fixable in code now (no design decision first):
- Focus ring and dialog focus return: 1, 2
- Contrast tokens: 5, 6, 17
- Dialog date bug and min date: 3, 15
- Accessible names and targets: 11, 12, 20, 22
- Ticker (static or pausable, reduced motion): 13
- Mobile table overflow: 7
- Empty states and copy rewrites: 10, 16, 21
- Undo and confirm for Cancel: 8

Need a design or product decision first: 4 (hero versus tool list), 9 (what Reserve actually does), 14 (out-of-stock behaviour), 11 (build favourites or drop them), and any enhancement or theming direction in sections 5 and 8. Enhancements and reworks need your call; I can build any enhancement or a throwaway prototype of one.

Which should I do? Optional extra input that would let me verify more: the real backend or data, a profile (purpose, audience, peers, brand assets), and a screen reader run.

Not written: `.loupe.md` (no answers were available, and the run was told not to write it).
