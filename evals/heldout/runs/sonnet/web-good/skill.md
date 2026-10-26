<!-- model: claude-sonnet; skill commit: 7559367 -->

# Review: "Split the check" (splitcheck/index.html)

## 1. Summary

Reviewed: one screen (single-page web app, all states on one route), running file in Chromium, no source repo or `.loupe.md`. Profile inferred, not written.

Verdict: a careful, accessible, well-copywritten build with correct money maths. Its weak points are layout at scale (result panel and mobile distance to the result) and a few places where the screen does not tell the user the number is incomplete or wrong.

Do first: findings 1, 2 and 3.

**Questions I would have asked (no answers; defaults used):** purpose and audience; target platforms; release stage; voice; peers; whether the "split everything evenly" case matters; currency/locale scope.

**Assumptions (defaults):**
- platforms: web only (desktop and phone browsers). No Apple-native rules applied; Apple principles are used as reasoning only, so no finding is an Apple MUST Blocker.
- release_stage: development (dead-control rule: none found anyway).
- register: utilitarian (frequent check-and-act task, money).
- density: comfortable. voice: plain, sentence case, US spelling, no humor (inferred from existing strings).
- direction: none set, so distinctiveness gives a verdict and options only.
- Category: bill-splitting / group-expense calculators. Peers (from memory, unverified): Splitwise, Tab-style receipt claim apps, Settle Up, the iOS Calculator-plus-tip pattern.

**Run notes:**
- Tools: Node + Playwright Chromium scripts in `work/`; screenshots there (`pop-*`, `empty-*`, `errors.png`, `zoom200-*`, `rtl-390.png`, `long-390.png`, `many-*.png`, `forced.png`, `morecontrast.png`); full measurement JSON `work/measure-out.json`.
- measure-runner.js ran on a populated state (3 people, 4 items) across 390/820/1440 x light/dark x reduced-motion (12 combinations, none sampled). Contrast: 74 text pairs per combination, 0 failures, 0 unmeasurable. Targets: only the 9 custom 22 px checkboxes are under 44 px; each sits inside a 44 px-tall `<label>` pill that is the real click target, so they pass (spacingOk true, parent target >= 44). Motion: no `transition: all`, no animation on load, reduced-motion rule present, 0 unreadable sheets. Defaults (template tells): none. logicalProps: 3 physical, 0 logical. No iframes or shadow roots. Hidden elements skipped: 5.
- type-eval.js: not run (only system fonts, Iowan Old Style falls back per OS; verdict by eye, see Type).
- Side effects: localStorage seeded and cleared per fresh browser context; text-size and `dir=rtl` edits on the live DOM in throwaway pages. No user files touched.
- Landscape: no web research done (time-boxed); everything in section 4 is from memory and marked (unverified). Not used for any Blocker.

## 2. Findings

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | The result panel is `position: sticky; top: 16px` but is taller than the viewport once there are many people. Measured with 12 guests at 1440x800: aside is 1462 px tall; after scrolling 600 px "Copy summary" is at y=1361, off screen. The summary cannot be copied until the left column has been scrolled almost to its end. | Each person pays, >= 900 px wide | Major | Web | Give `.out` `max-height: calc(100vh - 32px); overflow: auto`, or keep only the total sticky and put Copy summary beside the heading |
| 2 | On phones the result sits after all three input sections. With 12 people x 10 items the page is 8,792 px tall (390 px wide). Ticking boxes gives no visible total or share anywhere nearby; the only feedback is the per-item "Split N ways" line. Step 3 (tax/tip) is also below the whole item list. | Whole page at 390 px | Major | Taste (reviewer judgement; Apple's Simplicity/Agency reasoning) | A compact sticky bar at the bottom: "Check total $X" plus a link to "See shares"; or put tax and tip before the item list |
| 3 | A tax or tip that fails validation is silently counted as 0 in the result. Typing `abc` in Tax leaves "Check total $14.50" with no mention of tax; the only cue is the red message at the field, which on desktop is far from the result and on phones off screen. After a reload the invalid text is restored with no error message (errors are only set on input). | Tax and tip; Each person pays | Major | Web | Show "Tax not counted: fix the amount above" in the result when an error exists; run validation on load; or hide the result until valid |
| 4 | After Undo or Dismiss the focused button is removed and focus drops to `<body>` (measured: `BODY`). Keyboard and screen-reader users lose their place. Separately, the undo toast is cleared by the next unrelated edit (ticking a box after deleting an item returned an empty toast), so the Undo window closes silently. | Undo toast, bottom of screen | Major | Web | After Undo, focus the restored item's control or the section heading; do not clear the toast on `save()` unless the user acts on the same data, or give it a visible timeout |
| 5 | People and items cannot be edited. A mistyped price means Delete and re-add, losing the item's assignments (Undo only restores the delete). A misspelled name means Remove, which also strips that person from every item. | Item rows, person chips | Major | Taste (reviewer judgement) | Tap-to-edit name and price inline, keeping `who` |
| 6 | "Check total" excludes unassigned items, so it can differ from the receipt, and the lede promises "the exact total". Example: Tiramisu $9.00 unassigned, "Check total $47.35" while the receipt is $56.35+. The warning line is separate and far smaller. | Each person pays, "Check total" row | Major | Taste (reviewer judgement; anti-ambiguity on money) | Rename to "Total assigned" while anything is unassigned and add a row "Not assigned $9.00"; reword lede: "Every share adds up to what you assign, to the cent." |
| 7 | "Everyone" only adds everybody; once pressed there is no way to clear an item except un-ticking each person. With 12 people that is 12 taps. | Item row, "Everyone" button | Minor | Taste | Make it a toggle ("Everyone" / "No one") using `aria-pressed`, or add a "Clear" |
| 8 | Price rejects a decimal comma: `12,50` shows "Use numbers only, with up to 2 decimals, like 12.50." and `$` is hard-coded in label, placeholder and output. Users with comma-decimal keyboards get a message that does not say what is wrong. | Price and Tax fields | Minor | Research | Message: "Use a period for cents, like 12.50." If non-US is in scope, read `navigator.language` |
| 9 | The "Spare cents" paragraph explains the algorithm ("largest leftover fraction (ties go to the person listed first)") in a 4-line block that is always open under the totals. Most users need one sentence. | Result sheet | Minor | Taste | "5 spare cents went to Ana (+3¢) and Chidi (+2¢) so the shares add up exactly." Put the where-detail in a `<details>` |
| 10 | "Split 3 ways: $3.34 / $3.33 / $3.33" shows amounts without names; with 12 people it is a long unlabelled run of numbers. | Item rows, note line | Minor | Taste | "Ana $3.34, Ben $3.33, Chidi $3.33" (or show the amount inside each person pill) |
| 11 | Tax and tip errors are not announced: no live region, and the message is only referenced by `aria-describedby`, which is read on focus, not while typing. Per-item "Nobody assigned yet" warning is also not announced. | Tax, Tip, item warnings | Minor | Web (WCAG 3.3.1, 4.1.3) | Put the error `<p>`s in `role="status"` (or `aria-live="polite"`) |
| 12 | Name and item inputs lack `autocapitalize="words"`/`"sentences"` and `enterkeyhint`; phone keyboards will show lowercase "ana". | Name, Item fields | Polish | Web | Add the attributes |
| 13 | The ">= 900 px" two-column layout leaves the "Each person pays" panel empty-looking until at least one item is assigned: on first run the right column shows only "Add at least one person and one item" (seen in `empty-1440.png`). Acceptable, but the panel could state the next step. | Each person pays, empty | Polish | Taste | "Start with step 1: add who is at the table." (sequential cue instead of the generic line) |

waived: 0 (no profile).

Positive checks (nothing to fix): contrast passes in all 12 combinations; text sizes in rem, no overflow at 200% root font size (390 and 1440), long names wrap without horizontal scroll; focus ring is a 3 px outline on every control, Tab order follows reading order (reset, name, add, removes, item fields, assign checkboxes, tax, tip, presets, copy); forced-colors rules exist; reduced motion honored; destructive actions are undoable and Start over is guarded by Undo; Remove/Delete have names that include the object; hit areas are 44 px.

## 3. Trust

No deceptive patterns found in what was seen. (No accounts, payments, consent, urgency or invented counts. Data stays in localStorage and is not disclosed on screen; see enhancement 6.)

## 4. Landscape (from memory, unverified; no web research run)

- Category: group bill-splitting. Products named for study: Splitwise (ledger over time), receipt-claim apps where each diner taps their items, Settle Up, a plain calculator + tip. None fetched; no URLs or dates.
- Conventions to keep: items listed with a per-person claim; tip presets; "who owes what" in one list (unverified).
- Convergence to avoid: sign-up before first value and invites/accounts; this product has none, which is its advantage.
- Frontier moves: scan or paste a receipt; tap your own name to claim items; send a per-person payment link (unverified).
- Openings: zero-account, works offline, exact-cent allocation with an explanation of the rounding, which most peers hide.
- Step count for the core task: in this app, an even split of one amount among 4 = 4 names (8 actions incl. submit) + 1 item (3) + Everyone (1) + tip preset (1) = about 13 actions. The best peer's count was not measured.

## 5. Distinctiveness verdict

**Partly authored.**
- Channels: type = platform default (system sans body, Iowan/Palatino stack for headings and amounts); color = trend default (cream background + oxblood/clay accent is the catalog's "second-layer default" combination, one tell, `--accent: #8c2f1c` on `#f5f0e6`); shape = library/platform default (6 px radii, pills); layout = default two-column form + side panel; motion = none (appropriate); copy = authored (plain, specific, no AI-microcopy tells); iconography = none. Authored: the receipt sheet (dotted leaders, double rule above "Check total", tabular figures, amounts set in the serif) and the copy.
- Slop tell count: 1 of the catalog's tells, far below the 6-tell, 3-channel cluster threshold; no cluster.
- Logo-off test: the sheet and wording identify it; the header and form do not. Competitor swap: putting another calculator's header on it would barely change the form.
- Direction: none in a profile. Options (traced to subject, not applied): (a) Receipt paper: the sheet extends to the whole page, thermal-paper off-white and ink black, perforated section dividers, monospaced figures only where money appears (subject: a paper check). (b) Table-talk: names are the visual anchor, each person gets a colour from a small role set so the claim chips and the result row match (subject: who had what). Both are proposals; no values committed.

## 6. Type

- **Heading/amount face: "Iowan Old Style" then Palatino, Georgia (`--serif`).** Role: h1, h2, share amounts, bill total. Fit: suits the paper-receipt tone; amounts carry `tabular-nums` (`.money`). Whether the fallback faces (Georgia has old-style figures) keep `$13.38` aligned on Windows/Android was not verified (type-eval not run); Unverified.
- **UI/body face: system-ui.** Role: labels, body, controls. Fit: right for a utilitarian tool; sizes 13 to 16 px with 8 distinct sizes in use; min size 13 px (kicker, uppercase with 1.04 px tracking) which passes for desktop and is slightly small for phone (> 12 px threshold, below 16 px body). No finding.

## 7. Reworks

No rework warranted: no cluster shares one root cause (findings 1 to 3 are layout and feedback fixes), the premise is right for the job, and the missing receipt/claim mode is a feature, so it is an Enhancement.

## 8. Enhancements

**Experience and flows**
1. (Simplicity, Flexibility) Even-split shortcut. The core object is a bill with N diners; the most common case is "everyone shared everything". A first-screen option "Split evenly" that takes only the total, tax, tip and head count removes about 9 of the 13 actions measured above. Unlocks: first-value in under 30 seconds.
2. (Agency) Bulk assignment: "Select a person, then tap items" as a second view (rows by person), so a diner's whole order is claimed in one pass; the N x M matrix stays as the detail view.
3. (Craft) Live "Your share" strip on mobile: sticky bar with Check total and number of unassigned items, tapping scrolls to the sheet. Ties to findings 2 and 6.

**Visual design and theming**
4. (Delight, Craft) Lean into the receipt: extend the sheet metaphor (it is the one authored element) to totals and the Copy summary preview, so the copied text matches what is on screen.

**Content and voice**
5. (Responsibility) Show the rule once, near step 3: "Tax and tip are shared in proportion to what each person ordered." Currently only inferable from per-person lines.

**Platform capabilities**
6. (Responsibility, Familiarity) Say the data is kept: a small "Saved on this device" note, and a clear-data affordance (Start over exists). Optionally use `navigator.share` for the summary on phones where available.

Evidence is thin on peers (no research), so these are limited to six.

## 9. Unverified

- Landscape and peer step counts: web research not run; verify with a short study of 3 peers.
- `type-eval.js` not run; serif figure style (old-style vs lining) of the fallback stack on Windows/Android: verify by running it there.
- Screen reader behaviour (VoiceOver/NVDA) for the toast, live regions and checkbox pills: not driven.
- Offline/slow-network and error states: not applicable (no network calls) except `localStorage` blocked: `try/catch` present, not exercised.
- Pseudo-localized text (+40%): only long-string test done; RTL screenshot taken (`rtl-390.png`) but 3 physical-only declarations (e.g. margin/padding, `padding-left` on `.person`) mean mirroring is likely partial; not scored.
- Increased contrast (`contrast: more`) and forced colors: screenshots captured, rendered without errors; not inspected in detail.
- Firefox/WebKit rendering (notably `:has()` checked-state styling in older Safari): not run.
- Pointer hover/pressed feedback timing: not timed.

## 10. Offer

Fixable in code now: layout (1, 2 sticky bar part), validation/result messaging (3, 6, 11), focus and toast (4), small copy rewrites (6 lede, 8, 9, 10), attribute polish (12), Everyone toggle (7). Need a design decision first: 2 (placement of tax/tip and the mobile bar), 5 (inline edit pattern), and enhancements 1 to 4. Which would you like? Optional input that would let me verify more: the source repo (to write `.loupe.md` and check tokens), a peer list, and a Windows or iOS Safari capture.
