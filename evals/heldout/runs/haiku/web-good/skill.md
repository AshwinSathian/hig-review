<!-- model: claude-haiku; skill commit: 7559367 -->

# Loupe review: Split the check (splitcheck/index.html)

## 1. Summary

- **Reviewed:** single-page web app "Split the check" (`splitcheck/index.html`), whole app (one screen, inline pass, no split). Input: running app via file://, driven in Chromium through Node Playwright. Seeded state: 4 people, 5 items, tax 4.87, tip 18%. Plus empty state.
- **Verdict:** a careful, well-built utility. Contrast, targets, reduced-motion and 320 px reflow all pass measurement, and the split arithmetic is sound. The defects sit in the money path: an invalid tax or tip is silently treated as zero in the total and in "Copy summary", and on a phone the total sits about 1,600 px below the fold.
- **Most important to do:** make invalid tax and tip block or visibly flag the total and the copied summary (F1). Then bring the total into view on phones (F2).
- **Rework:** No rework warranted. The rework bar is not met: no cluster of 3+ findings shares one root cause, the premise serves the core job, and no peer step count was sourced (landscape not run). Three enhancements are listed below.
- **waived:** 0 (no profile waivers).

**Assumptions (no owner answers; proceeded on defaults, no `.loupe.md` written):**
- Platform: web only. Release stage: `development`, so dead controls would be Major with an Unverified note (none found).
- Density: comfortable. Register: utilitarian (a frequent check-and-act tool). Voice: en-US, sentence case, no humour.
- Direction: none set, so distinctiveness gives a verdict only and offers directions (see section 5).
- Audience: a small group at a restaurant, on a phone at the table, and on a laptop when splitting later.
- Category and peers: not confirmed. Landscape research was **not run** (see Unverified). Peer claims are absent, so no peer-gap rework is possible.
- Questions that would have been asked (recorded, not answered): what is the primary device; which bill-splitting apps are the peers; is this a release build or a prototype; whether tip should apply before or after tax (the app uses before tax, as its hint says).

**Run notes**
- Tools: Node Playwright 1.64.1 from `[local path]`, Chromium. The Playwright MCP was not used. `measure-runner.js` logic was reproduced in Node (the runner's file-input trick is MCP-specific), calling `scripts/measure.js` directly on the page for 3 widths x light/dark x reduced motion (12 combinations). `type-eval.js` was run with sizes 12, 13, 16.
- Scripts and evidence (all in `work/`): `measure.js`, `states.js`, `probe.js`, `probe2.js`, `reflow.js`; results in `measure-seeded-full.json`, `measure-summary.json`, `type-eval.json`, `states.json`; screenshots in `shots/`.
- Side effects: localStorage on the file:// origin was written for the test states only. The reviewed file was not edited. No simulator or native change. The `.playwright-mcp/` folder was not used.
- Not done because the user said "proceed on defaults" but the step needs input: no `AskUserQuestion`; questions recorded above.

## 2. Findings

Measured results: contrast, 102 rows in the seeded state, 0 fail and 0 unmeasurable at 390, 820 and 1440, light and dark, with and without reduced motion. Targets: all controls are 44 px high. The 20 checkboxes are 22 px inside 44 px label pills; spacing passes (spacingOk true), so they are not findings. `transition: all` count 0. Reduced-motion rule present. No horizontal overflow at 320, 360, 390, 820 or 1440 with normal text. At 200% root font size at 390 px there is no overflow.

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | Invalid tax is silently counted as $0.00. Typing `abc` in Tax shows an inline error, but the results still show "Check total $1,234.50" and "tax $0.00", and the Copy summary text reads "Items $1,234.50 + tax $0.00 + tip $0.00 (0%) = $1,234.50". An invalid tip (`150`) is likewise silently 0%. `model()` falls back to 0 on parse error. | Tax and Tip fields; Each person pays (`#result`); Copy summary | Major | Taste (reviewer judgement: a wrong total is shown and copyable) | Keep the last valid total and mark it "Not final: fix tax" (or hide the total); disable Copy summary while tax or tip is invalid, and say why. Example text: "Tax is not counted until it is a valid amount." |
| 2 | On a phone (390 x 844, seeded), the Each person pays result starts at y=2420 px, after all items (items start at y=813). The total is about 1,600 px below the first screen of work, and the result is the payoff of the whole task. | `aside.out` at under 900 px; `.grid` single column | Major | Taste (reviewer judgement; no Apple rule covers this layout) | Make the total a compact bar pinned to the bottom (above the safe area) on narrow widths, showing "Check total $62.40" and a tap-to-expand share list. Keep the full result in place on wide screens. |
| 3 | Clicking "Everyone" (and so any button that re-renders the list) leaves focus on `<body>`. Measured: `document.activeElement` = BODY after the click. The keyboard user loses position in a list of 5 items. Checkbox toggles do restore focus (they have `data-key`); the Everyone button does not. | Items list, Everyone button (`data-all`); `refresh()` re-renders the whole list | Major | Web (WCAG 2.4.3 focus order: judged, not a measured failure; caps at Major) | After re-render, restore focus to the same `[data-all]` button, or give buttons a `data-key` as checkboxes already have. |
| 4 | Pseudo-localised text (+40%, unbroken runs) at 390 px makes the page scroll horizontally: `scrollWidth` 683 against 390. The grid track `.grid` / `main` grows to about 667 px because of some min-content child; `header` also overflows to 452 px. Normal text does not overflow. | `main.grid`, `header.top` | Minor | Web (reflow is judged here; 1.4.10 holds at 320 with normal text) | Add `min-width: 0` on the grid children and `overflow-wrap: anywhere` on labels and hints; re-run the +40% test at 390. |
| 5 | Tip presets: when the tip field is blank, the effective tip is 0%, but no preset is pressed ("No tip" has `aria-pressed=false`). Typing `0` presses "No tip". | `renderTip()` requires `st.tipText.trim() !== ""` | Minor | Taste | Treat blank as 0: press "No tip" when the field is blank, or show "0%" in the field value. |
| 6 | The spare-cents paragraph uses jargon: "handed out, one at a time, to whoever had the largest leftover fraction (ties go to the person listed first)". For a group at dinner this is hard to parse. | Each person pays, `.rounding` | Minor | Taste (reviewer judgement; voice rule) | "The bill did not divide evenly, so 4 cents went to: Ana +3¢ on Carbonara, tax, tip; Dev +1¢ on tax." |
| 7 | "12." (a trailing point) is rejected with "Use numbers only, with up to 2 decimals, like 12.50." That message does not describe the problem: the user typed a valid prefix of 12.50. | Item Price and Tax fields, `parseMoney` | Minor | Taste | Accept a trailing point as 12.00, or say "Add the cents, like 12.50 or 12." |
| 8 | Undo disappears silently. The undo toast is cleared by `save()` on any later change, including typing in Tax or Tip (each keystroke calls `refresh()` then `save()`). A user who removes Ben, then edits tax, loses the undo with no trace. | `save()` clears `toast("")`; `refresh()` on tax and tip input | Minor | Taste | Keep the undo until a new destructive action, or for a fixed time (about 8 s), and don't clear it on field edits. |
| 9 | Visual check (screenshots, 390 and 1440, light and dark): hierarchy is clear, the serif headings and terracotta primary action read well, and the dark theme keeps the same roles. Nothing else found on the screens reviewed. | All screens | Polish | Taste | None required. |

**Trust:** No deceptive patterns found in what was seen. No fake urgency, no hidden costs, no pre-selected options, no invented counts. The copy does not claim anything it does not compute.

**waived:** 0

## 3. Trust

No deceptive patterns found in what was seen. Finding 1 is an accuracy failure (a wrong total presented as final), not a dark pattern, so it stays in Findings at Major.

## 4. Landscape

**Not run.** The landscape step (web research of 3 to 6 peers, such as Splitwise, Tab and Settle Up) was not done in this pass. Without it there is no sourced peer step count, so the rework peer-gap condition cannot be tested, and the enhancements below rest on the product's own evidence only. Run this before any rework decision.

## 5. Distinctiveness verdict

**Partly authored.** Evidence:
- Authored: the editorial type pairing (serif Iowan/Palatino/Georgia headings, system sans body), the numbered sections with a "=" marker on the result, the cream surface with a single terracotta accent, and the copy voice (plain, specific: "Nobody assigned yet, so this is not counted").
- Platform default: system-ui body text, native controls for tip presets and checkboxes, 44 px controls.
- Library/trend defaults: none observed. No gradients, no shadow cards, no glass.
- Slop-cluster threshold not met (no more than 2 tells in the scan).
- Logo-off and competitor-swap tests: not applicable (no logo; no rendered peer to swap against).
- Direction: none in profile. Options (not required for the verdict): (a) keep the current editorial direction and tighten the result as the centre of the screen; (b) a utilitarian receipt direction (monospace figures, ruled table) that fits the "check" metaphor. Both differ on at least two channels. No theming values proposed beyond what exists.

## 6. Type

Type evaluation (`type-eval.json`, sizes 12, 13, 16):
- System-ui: loaded, 4 sizes in use (13, 14, 15, 16), tabular figures available. Confusables at 12 px: `I/l` not separated (d 0), an acceptable risk for the money column since figures use tabular numerals.
- Iowan Old Style / Palatino fallback to Georgia: serif headings, Latin only, rendered via the local face (coverage Latin only). Serif only at headings, so the readable confusable risk is low.
- Smallest text: 13 px (a single usage). Helper text at 14 px. Acceptable under the 12 px desktop floor; the 16 px mobile body is met for inputs and body.

Defects found here: none beyond the sizes above.

## 7. Reworks

No rework warranted: none of the five bar conditions holds. Cluster: findings 1 and 2 share a cause only loosely (a result shown in the wrong place versus a validity rule), and no third finding shares it. Premise: the core job is served. Peer gap: not measured (no landscape). Identity: not default-assembled. System: no token problem seen.

## 8. Enhancements

Up to 3, fewer because the evidence is thin and no landscape was run.

1. **Experience and flows: a bottom total bar on phones.** Traces to finding 2 and to the core job of seeing "what do I pay" at the table. Mechanism: a pinned bar with the check total and a tap target that opens the share list; on wide screens the existing sticky column stays. HIG principle: Purpose (the result is the point of the screen). Unlocks: the answer is visible while items are being ticked.
2. **Experience and flows: "Split evenly among" for large groups.** Traces to this app's core task (groups of 4 or more, with checkboxes repeated per item). Each item shows one checkbox per person, so 10 items and 6 people means 60 checkboxes. Mechanism: a "Everyone" plus "Choose" pattern already exists; extend it so a user can select the group once and reuse it for other items. HIG principle: Flexibility. Unlocks: fewer taps for a common case. Needs the landscape check before committing.
3. **Content and voice: say what counts.** Traces to findings 1, 6 and 8. Mechanism: a single status line under the total that reads "All 5 items and tax counted" or "Tax is missing, so this total is not final", updated on every change, in the same place as the total. HIG principle: Responsibility (the app says what it counted). Unlocks: a trustworthy total without reading the fine print.

## 9. Unverified

- Dark mode with the full seeded state at 390 and 1440: measured (contrast 0 fail), screenshot reviewed for the empty state only.
- Forced colours and `prefers-contrast: more`: screenshots captured (`shots/forced-1440.png`, `shots/contrastmore-1440.png`) but not reviewed by eye. The CSS has a `forced-colors` block; there is no `prefers-contrast` rule. Verify by looking at the two screenshots.
- RTL (`shots/rtl-390.png`) captured, not reviewed by eye; `logicalProps` was not run for this page (the runner's output was not summarised for RTL).
- Offline and error states: the app uses localStorage only, so no network error state exists. Storage-unavailable state (private window with storage blocked) not tested.
- Transient states: undo toast (seen in text, not by eye), focus rings (checked by computed outline only), the 200 ms rise animation (reduced-motion removes it; measured rule present).
- Other browsers: Firefox and WebKit not run. Safari/iOS behaviour of `viewport-fit`, `dvh` and the sticky column not checked (the page has no `viewport-fit=cover`, so safe areas do not apply; the bottom toast uses `bottom: 16px` without `env(safe-area-inset-bottom)`, which matters on iPhone once finding 2's bar is added).
- Landscape claims: none made; not researched.
- Keyboard walk: 45 tab stops recorded in `states.json`; all visible stops had a 3 px focus outline. Full screen-reader pass not run (no VoiceOver).
- Money edge cases: the arithmetic was spot-checked (shares add to the total, $62.40 on the seeded state), not exhaustively tested.

## 10. Offer

Fixable in code now, on your word:
- Copy and status text: findings 6, 7 and enhancement 3 (the total status line).
- Logic and feedback: findings 1 (block or flag an invalid tax or tip in the total and in Copy summary), 5, 8.
- Focus and layout: findings 3 and 4.
- Layout decision first: finding 2 and enhancement 1 (a bottom total bar on phones).
- Design decision first: enhancement 2 (group reuse) and the direction choice in section 5.

Optional input that would let the review verify more: a running URL on another device or browser for the bottom-bar check, the real device width, and a landscape decision (run the peer research or not). I will not edit any file until you pick findings to fix.
