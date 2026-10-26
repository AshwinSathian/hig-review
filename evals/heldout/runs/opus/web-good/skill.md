<!-- model: claude-opus; skill commit: 7559367 -->

# Split the check: design review (loupe)

## 1. Summary

**What was reviewed:** the whole single-screen web app `splitcheck/index.html` ("Split the check"). It was driven in headless Chromium in its empty, populated and stressed states at 390, 820, 1440 and 2560 px, in light, dark, forced colours and increased contrast, with the source read alongside. No `.loupe.md` exists, so the review ran on the default profile below.

**Verdict:** a careful, accessible build. Contrast, target size, labels, error wiring and reduced motion all pass when measured, and the voice and the "= Each person pays" equation layout are its own. Its weak points are the money rule for unassigned items and the recovery paths: Undo, focus after a list rebuilds, and editing what was entered.

**Do first:**
- **#1:** with any item unassigned, the whole receipt's tax is charged to the people who are assigned, and the sum is labelled "Check total". In the test, Ana paid $60.00, including the full $10.00 tax, on a $110.00 receipt.
- **#2:** Undo is 30 Tab presses from where focus lands, and any other edit removes it.

**Assumptions** (the owner was unavailable, so nothing here was confirmed):
- `platforms: web`, phone-first. The app has a 390 px layout, `inputmode="decimal"` and 44 px targets.
- `release_stage: development`, as stated in the request.
- `audience`: US diners at the table, splitting one restaurant check on one phone, occasionally. Inferred from the hard-coded `$` and the `en-US` `toLocaleString`.
- `register: utilitarian`, inferred because this is a money task people check and act on.
- `voice`: sentence case (as the existing strings use), US spelling, `humor: none`, `we_policy: avoid`. Contractions are not used now, so `contractions: per-voice`.
- `density: comfortable`, measured against the 16 px web body size.
- `category`: bill splitting. `peers`: none given. `direction`: none. The distinctiveness pass therefore proposes directions (section 5).
- `.loupe.md` was not written.

**Questions I would have asked** (unanswered, so the defaults above were used):
1. In one sentence, what is the product for, and what should it leave people feeling?
2. Who uses it, on what device, and is anyone outside the US or using another currency?
3. Should an unassigned item block the result, be shared by everyone, or be held aside as "unassigned"?
4. Which products do you measure yourselves against?
5. Is it deliberate that last session's dinner is restored from `localStorage` on the next visit?
6. Is there a brand direction or brand asset to work from?

**Run notes**
- **Tools:** the Playwright MCP was not available. I drove Chromium with Node Playwright scripts in `work`:
  - `run.js` ran `measure-runner.js`, passed unchanged with `page`, and `type-eval.js`.
  - `stress.js`, `toast.js` and `fc.js` drove the stress states, keyboard paths and forced colours.
  - `spec.js` ran the candidate-face specimen.
- **Raw output:** `…/work/measure.json` and `…/work/type-candidates.json`.
- **Screenshots** are in `…/work/shots/`:
  - Populated state: `full-{390,820,1440}-{light,dark}.png`, `fold-*.png`.
  - Empty state: `empty-*.png`.
  - Long strings: `long-390.png`. Pseudo-localised: `pseudo-390.png`. Right-to-left: `rtl-390.png`.
  - 200% text: `text200-390.png`, `text200-1440.png`, `text200-item.png`.
  - Forced colours: `forced-1440.png`, `forced-presets.png`. Increased contrast: `contrastmore-1440.png`. Wide window: `wide-2560.png`.
  - Many diners: `sticky-12people-1440*.png`. Undo toast: `toast-{390,1440}.png`. Candidate faces: `type-candidates.png`.
- **Measurement summary** (12 combinations of width, colour scheme and reduced motion, populated state; none sampled):
  - Contrast: 92 text rows, 0 fail, 0 unmeasurable, in every combination. The empty state gave 27 rows, also with no failures.
  - Targets: 16 rows under 24 px, all the custom checkboxes at 22×22, with `spacingOk: true`. Each sits inside a `label.pick` that is at least 44 px tall and is the real hit area, so this is not a finding.
  - Motion: no `transition: all`, nothing animates on load, and a reduced-motion rule is present. No unreadable stylesheets.
  - Template tells (`defaults`): none.
  - Text sizes: 8 distinct sizes, smallest 13 px (the "Group dinner" kicker).
  - CSS direction: 3 physical inline-axis declarations, 0 logical.
  - No iframes and no shadow roots.
- **Side effects:**
  - `localStorage` was cleared and reseeded, only inside a throwaway headless browser profile.
  - DOM edits made for the stress states (pseudo-localisation, `dir=rtl`, 200% root font size) were undone by reloading.
  - The review made web requests: web searches and fetches for the landscape, and Google Fonts for the candidate-face specimen.
  - No `.playwright-mcp/` folder was created. No project files were edited.

## 2. Findings

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | **Unassigned items distort the money.**<br>• `compute()` drops an unassigned item from the subtotal but still spreads the full tax (`allocate(st.taxCents, base)`) over the assigned items.<br>• The total of the assigned items is labelled "Check total".<br>• Test with two diners: Steak $50 assigned to Ana, Salad $50 unassigned, tax $10. Ana is shown "$60.00" (items $50 + tax $10) and "Check total $60.00", on a $110.00 receipt.<br>• In the seeded state (`fold-1440-light.png`), Tiramisu ($9.00) is unassigned and "Check total $88.71" is shown beside "Copy summary".<br>• The red "Not included" note is easy to read past, and Copy works anyway.<br>• This breaks the product's own lede promise ("Every share adds up to the exact total"). | Result panel `.bill`; `compute()` lines 279–309; `renderResult()` | Major | Research | • Split tax in proportion to the assigned share of the full item subtotal, and hold the rest as an "Unassigned" row with its amount.<br>• While anything is unassigned, title the sum "Assigned so far, $X of $Y". Use "Check total" only once every item has someone.<br>• Have Copy add a first line: "Not final: Tiramisu ($9.00) has nobody yet."<br>• Which policy to adopt (block, share among everyone, or hold aside) is a design decision. |
| 2 | **Undo is hard to reach, fragile and silent.**<br>• After Delete, Remove or Start over, focus goes to the Item or Name field. The toast's Undo is the last element in the DOM: 30 Tab presses away with 5 people and 4 items, measured at both 390 and 1440.<br>• `save()` clears `undoSnap` and the toast on any other edit (typing tax, ticking a box), so Undo disappears when you start correcting.<br>• After Undo, focus falls to `<body>` and the restored row is not shown. The only feedback is a screen-reader-only "Restored." | `#toast`, `destructive()`, `save()`, `undoBtn` handler, lines 333, 354–357, 426–428 | Major | SHOULD | • Keep focus on the control nearest the removed row (see #3), and make Undo reachable from there. One way: move focus to the toast's Undo, labelled "Undo remove Wine", with Escape to dismiss.<br>• Also support Ctrl/Cmd-Z.<br>• Don't clear the undo snapshot on unrelated edits. Keep a short stack.<br>• After Undo, focus the restored row and scroll to it.<br>• Apple's Undo pattern: "Show the result of an undo or redo." |
| 3 | **Focus is lost when the item list is rebuilt.**<br>• Pressing Enter on "Everyone" re-renders `#items` with `innerHTML`. Only checkboxes carry `data-key` for restoring focus, so focus drops to `<body>`, measured (`afterEveryoneKey: BODY`).<br>• A screen-reader user loses their place in the item list. | Item card "Everyone" button, `renderItems()` / `refresh()` lines 384, 424 | Major | SHOULD | • Give the Everyone, Delete and Remove buttons a stable `data-key` so `refresh()` restores focus to them.<br>• When the focused element is removed, focus its neighbour.<br>• Apple's Focus and selection rule: "if the focused item disappears, move focus to an item one step away." |
| 4 | **Rows collapse at 200% text on a phone.**<br>• At 390 px with a 200% root font size, `.item-head` keeps name, price and Delete on one row. The item name is squeezed to 65 px wide and 192 px tall, one word per line (`text200-item.png`).<br>• Share rows break names mid-word ("Max / imili / an-…", `text200-390.png`).<br>• Nothing is lost, so WCAG 1.4.4 passes, but it is barely readable. | `.item-head`, `.share`, at 390 px with 200% text | Major | SHOULD | • Let `.item-head` wrap: `flex-wrap: wrap`, with the name taking the full width on its own line once it would fall under about 12em.<br>• Stack `.share` (name above amount) at large `rem` sizes.<br>• Apple: make sure the layout adapts to all sizes, including accessibility sizes. |
| 5 | **Nothing can be edited after it is added.** (Reviewer judgement.)<br>• Item name, item price and person name cannot be changed.<br>• Fixing a mistyped price means Delete, re-type name and price, then re-tick every diner for that item.<br>• Price typos are the commonest error when copying a receipt. | Item cards, people chips | Major | Taste | • Make the item name and price editable in place: tap the price to edit it, keeping the same validation and keeping who is assigned.<br>• Rename a person from their chip. |
| 6 | **One action, two words.** "Delete" for items and "Remove" for people, with toasts "Deleted Wine." and "Removed Ana." | Item cards, people chips, toast | Minor | SHOULD | Use one verb. Rewrite: buttons "Remove" on both; toasts "Removed Wine." and "Removed Ana." |
| 7 | **Placeholders use the abbreviation "e.g."**: "e.g. Ana", "e.g. Margherita pizza". Screen readers may read it as "egg". | `#pName`, `#iName` placeholders | Minor | SHOULD | Rewrite the placeholders as "Ana" and "Margherita pizza". The visible labels already carry the meaning. |
| 8 | **The spare-cents explanation is one 45-word sentence** and uses the jargon "largest leftover fraction". | Result, `.rounding` | Minor | SHOULD | Rewrite: "3 cents didn't divide evenly. Ana gets +1¢ (tip) and Chloé +2¢ (tax, tip)." Move the rule ("the cent goes to whoever's share was closest to the next cent; ties go to whoever is listed first") into a "How spare cents work" disclosure. |
| 9 | **Tax accepts any amount up to 99,999.99, whatever the items cost.** Tax of 99,999.99 on $1,234.56 of items was accepted without comment, and each diner was shown $33,744.85 (`long-390.png`). | `#tax`, `parseMoney` | Minor | SHOULD | Show a non-blocking inline note when tax exceeds about 25% of the items: "Tax is $99,999.99, more than the items ($1,234.56). Check the receipt." Apple's error guidance: prevent the error first. |
| 10 | **Comma decimals are rejected with an unhelpful message.** A comma-decimal price ("12,50") gets the generic "Use numbers only, with up to 2 decimals, like 12.50." | `#iPrice`, `#tax`, `parseMoney` | Minor | Research | Detect the `\d+,\d{1,2}$` pattern and say "Use a period for cents, like 12.50." Or accept it as a decimal when it is unambiguous. |
| 11 | **The selected tip preset is invisible in forced colours.** The pressed preset (18%) looks the same as the others: border `rgba(5,0,73,.8)` against black, same background (`forced-presets.png`). | Tip presets, `button[aria-pressed=true]` | Minor | Web | Add `@media (forced-colors: active) { button[aria-pressed=true] { background: Highlight; color: HighlightText; } }` |
| 12 | **Capital I and lowercase l render identically** in `system-ui` at 14–16 px (type-eval `px: 0`). The affected text is the names people type in chips, share rows and the copied summary. | People chips, `.share .who` | Minor | Taste | Low cost. Duplicate-name checking is already case-insensitive. Showing the copied summary in the preview's monospace face covers the moment where names get compared. |
| 13 | **The undo toast partly covers a focused button.** While it shows, Tab reaches "Delete Salad" partly under it, at 390 and 1440. WCAG 2.4.11 passes (only partly covered); 2.4.12 does not. | `#toast` | Minor | Web | Set `scroll-padding-bottom` on `html` to the toast's height while it is shown. |
| 14 | **+5 polish items:**<br>• Rewrite the item note "Split 1 way: $11.25" as "Chloé: $11.25".<br>• Rewrite "Restored." as "Wine restored."<br>• "Start over" does nothing, silently, when there is nothing to clear. Hide it or disable it with a reason.<br>• `.person { padding-left }` and `.pick` padding are physical, so RTL chips are lopsided (`rtl-390.png`). Use `padding-inline-start`.<br>• Pressing the already-pressed tip preset does nothing. Either unpress it to clear, or make the group a radio group. | Various | Polish | Taste | As listed. |

waived: 0

## 3. Trust

No deceptive patterns found in what was seen. #1 misstates a total, but it is a calculation and labelling defect with no persuasive intent, so it sits in Findings.

## 4. Landscape

**Category:** splitting a restaurant check by item. It sits between the consumer-utility and finance playbooks. Researched 2026-10-26.

| Product | Why chosen | Source |
|---|---|---|
| Splitwise Itemize | Category leader | thepaypers.com, 2026-10-16: https://thepaypers.com/payments/news/splitwise-launches-itemize-receipt-splitting-feature-in-the-us-and-uk |
| Apple Wallet bill splitting (iOS 27) | Platform owner entering the category | Tom's Guide (excerpt only) https://www.tomsguide.com/phones/iphones/ios-27-will-reportedly-offer-bill-splitting-in-apple-wallet-heres-how-it-will-work ; 9to5Mac, Engadget and Gadget Hacks coverage via search [S] |
| Tab, "the simple bill splitter" | Long-running item-claim splitter | App Store https://apps.apple.com/app/id595068606 ; Laughing Squid review https://laughingsquid.com/tab-an-app-for-splitting-restaurant-bills-with-friends/ [S] |
| Soulver 4 | Adjacent exemplar: the same arithmetic as a calculator notepad | Six Colors, 2026-08: https://sixcolors.com/post/2026/08/soulver-4-casts-a-wider-calculating-net/ ; https://documentation.soulver.app/documentation/variables |

**Conventions to keep**
- People claim items; several people can share one item; tax and tip are spread in proportion to what each person ordered. Splitwise, Tab and Apple Wallet all describe this, and SplitCheck already does it.
- Tip presets.

**Convergence to avoid**
- "AI receipt splitter" App Store clones (Tabify AI, SplitBill AI, SplitScan, TabScan), branded on the AI rather than on the task. Seen in search results 2026-10-26 [S].

**Frontier moves**
- A receipt photo becomes the item list, with quantities read off the receipt. Splitwise Itemize does this (thepaypers, 2026-10-16), and Apple Wallet on iOS 27 reportedly reads items and quantities [S].
- Each diner claims their own items on their own phone: a QR join with no account in Splitwise, a live-synced shared bill in Tab.
- A payment request at the end: Splitwise Pay, Apple Cash.

**Openings**
- None of the sourced peer material explains what happens to unclaimed items or odd cents; the Splitwise article is silent on both. SplitCheck's cent-exact, explained spare-cent ledger is an opening it already half-owns. #1 currently undercuts it.
- No account, no network, nothing leaves the device. Every sourced peer needs an app, an account or a payment network.

**Step counts:** the peers' core-task step counts are not published in what was fetched. SplitCheck's core task for 4 diners and 4 items is about 29 inputs: 4 names, 4 items with prices, about 7 ticks, tax and tip. The peer-gap condition of the rework bar therefore cannot be tested.

## 5. Distinctiveness verdict

**Verdict: authored** (utilitarian register).

**Channels:** 3 of the 9 are authored.

| Channel | Classification and evidence |
|---|---|
| Layout idiom | **Authored.** Numbered steps 1, 2, 3 lead to an "=" result column: the split read as an equation (index.html:175, 189, 209, 235). The result "sheet" has dotted rules and a heavy rule above the total, like a check stub. |
| Voice | **Authored.** Plain and exact: "to the cent", "Nobody assigned yet, so this is not counted.", and errors that say how to fix the problem ("Use a positive amount, without a minus sign."). |
| Type | **Partly authored.** A serif (Iowan Old Style stack) for headings and money amounts with tabular figures, and `system-ui` for the controls. The serif is not traced to anything in the subject. |
| Color | **Trend default.** A cream base (`#f5f0e6`) with a terracotta or oxblood accent (`#8c2f1c`) and a serif display face. This matches the slop catalog's "second-layer defaults" row. |
| Shape | Library default: 6 px radius, pill chips. |
| Motion | Platform default: one 180 ms toast rise, removed under reduced motion. |
| Iconography, imagery, sound and haptics | None. |

- **Signature element:** behavioural. Every split is exact to the cent, and the spare-cent ledger says who got which cent and why.
- **Signature moment:** behavioural. "Shares add up to $88.71" under the total, a reliability cue shown the same way every time.
- **Catalog tells:** 4 in 3 channels, below the cluster threshold (6 or more tells across 3 or more channels):
  - AI-template: second-layer default palette (color).
  - AI-template: a single tracked uppercase kicker, "GROUP DINNER" (type). Weak: it appears once and carries context.
  - AI-microcopy: "e.g." in placeholders (voice).
  - AI-microcopy: Delete/Remove synonyms (voice).
- **Logo-off test:** with the name hidden, the "= Each person pays" column and the spare-cents line still identify the product.
- **Competitor-swap test:** putting "Splitwise" on these screens, the cent ledger and the equation layout look wrong for it. The colors do not.
- **Gate:** the core flow has open Majors (#1 to #5), so expression changes are held until those fixes land. The directions below are for when that happens.

**No profile direction, so two directions are proposed.** Both keep the authored layout and voice and re-derive only the colour and type, the channels that are currently defaults.

**Default check:** a generic "bill splitter app" prompt would produce white cards, a mint or teal "money" accent, Inter, and a receipt icon. Both directions were checked against that and against the slop catalog.

**Direction A: Guest check pad.** Trace: the pale-green, ruled waiter's guest-check pad, the actual object a restaurant check starts on.
- **Color, light** (contrast measured with `contrast.py`):

  | Role | Value | Contrast |
  |---|---|---|
  | base | `#e9f0e4`, oklch(0.947 0.018 132) | ink on base 12.81:1 |
  | surface | `#f7faf4`, oklch(0.981 0.008 129) | ink on surface 14.15:1 |
  | ink | `#1f2a1f`, oklch(0.271 0.025 145) | n/a |
  | muted | `#4a5a49` | 6.99:1 |
  | ruling and boundary | `#6f8a6d`, oklch(0.604 0.053 143) | 3.6:1, passes the 3:1 non-text minimum |
  | accent (pad ink) | `#2f6b3a`, oklch(0.475 0.100 148) | white on accent 6.39:1; accent text 6.07:1 |
  | error | `#a3201a` | 7.17:1 |

- **Color, dark:**

  | Role | Value | Contrast |
  |---|---|---|
  | base | `#121813` | ink 14.89:1 |
  | surface | `#1b231c` | ink 13.32:1 |
  | ink | `#e4ecdf` | n/a |
  | muted | `#a9b8a6` | 7.74:1 |
  | boundary | `#6f8a6d` | 4.24:1 |
  | accent | `#8cc79a` | on-accent `#10180f` 9.27:1; accent text 8.25:1 |
  | error | `#ff9a8d` | 7.87:1 |

- **Color inputs:** derived from one hue (about 145) plus lightness steps, which also gives the increased-contrast variant.
- **Risk:** green is near the generic "money" default. That is acceptable only because it is the paper colour, not a button accent on white.
- **Type:** display role Barlow Semi Condensed 600/700 (OFL), from the condensed sans printed on check-pad headers. Text and controls stay `system-ui`.
- **Shape:** 4 px radius. Ruled hairlines under item rows, like the pad's lines.
- **Motion:** productive only, 120 ms ease-out. With reduced motion, no movement.
- **Signature:** the cent ledger, printed as pad-style line items.
- **Voice samples:**
  - Button: "Add item".
  - Empty state: "No items yet. Copy each line from the receipt."
  - Error: "Use numbers only, like 12.50."
- **How it differs from each peer:** Splitwise and Tab use a single-colour accent on white with no paper material. Apple Wallet uses system chrome. Soulver is a monochrome notepad.

**Direction B: Thermal receipt.** Trace: the thermal-paper itemised receipt the numbers are copied from. Its print is a purplish black, and its figures are monospaced.
- **Color, light:**

  | Role | Value | Contrast |
  |---|---|---|
  | base | `#f4f3ef`, oklch(0.964 0.005 95) | print on base 13.13:1 |
  | surface | `#ffffff` | print on surface 14.58:1 |
  | print | `#2b2733`, oklch(0.282 0.022 300) | n/a |
  | faded print | `#5d5866` | 6.88:1 |
  | boundary | `#8a8494` | 3.62:1 |
  | primary button | print `#2b2733` fill with white text | 14.58:1 |
  | error | `#b3261e`, oklch(0.501 0.178 29) | 6.54:1 |

- **Color, dark:**

  | Role | Value | Contrast |
  |---|---|---|
  | base | `#141317` | text 15.59:1 |
  | surface | `#1d1c21` | text 14.27:1 |
  | text | `#ecebef` | n/a |
  | faded print | `#aeaab6` | 7.44:1 |
  | boundary | `#77727f` | 3.63:1 |
  | error | `#ff9a8d` | 8.27:1 |

- **Color:** no decorative hue. The only colour is the error state.
- **Type:** data and numerals role IBM Plex Mono 400/600 (OFL), used only for amounts and the copied summary. Headings and text stay `system-ui`. This deliberately avoids a geometric sans with its mono sibling, a slop-catalog combination.
- **Shape:** 2 px radius on fields. No grid lines, which would also be a catalogued tell.
- **Motion:** none beyond the toast. With reduced motion, the same.
- **Signature:** amounts set exactly as the receipt prints them, so a diner can match each line to the paper.
- **Voice samples:**
  - Button: "Add item".
  - Empty state: "No items yet. Type each line as it's printed."
  - Error: "That price has 3 decimals. Use 2, like 12.50."
- **How it differs from each peer:** none of Splitwise, Tab or Apple Wallet sets amounts in monospace. Soulver does, but as a free-form notepad, not as a per-person ledger.

**A and B differ on 3 channels:** color (tinted paper versus neutral print), type (condensed display face versus mono numerals), and shape (ruled rows versus none). Pick one, or keep the current palette knowing it reads as a 2026 default.

## 6. Type

```
Face: system-ui (SF Pro on this macOS run; Segoe UI or Roboto elsewhere) 400/600/700. Roles: UI, reading
Legibility: CONCERN. x-height ratio 0.721; confusables failing I/l @14, 15, 16 px (Chromium, px 0); weights 400/600/700; Bold Text n/a
Figures and features: tabular available, applied via .num/.money; distinct zero n/a
Coverage: OS font (not measurable); names like "Ïñgríð Þórsdóttir" rendered without fallback jumps (long-390.png)
Scaling: rem ok; 1.4.12 not tested; layout collapse at 200% on 390 px (#4)
Delivery (web): local system font, 0 KB
Distinctiveness: default tier yes; identity carried by nothing (correct for controls)
Verdict: Keep (UI and text roles)
Evidence: work/measure.json (type), shots/fold-1440-light.png
```

```
Face: Iowan Old Style stack ("Palatino Linotype", Palatino, Georgia fallbacks) 400/700. Roles: display, data (share amounts)
Legibility: PASS. x-height ratio 0.687; confusables not failing at 18–40 px display sizes; weights 400/700
Figures and features: tabular by default (good for amounts)
Coverage: Latin only (local); fallback faces on Windows and Android differ in width, unverified
Scaling: rem ok
Delivery (web): local only, no web font; Iowan exists on Apple platforms only
Distinctiveness: default tier no; identity carried by treatment, but untraced (part of the cream + terracotta + serif second-layer combination)
Verdict: Tune (keep it for amounts and headings only if a direction keeps a serif; otherwise Replace per direction A or B)
Evidence: work/measure.json (type)
```

```
Face (candidate, A): Barlow Semi Condensed 600/700. Roles: display
Legibility: PASS for display. x-height 0.779; l/1 d 0.19 @16 px (small mark, display sizes only)
Figures: tabular by default. Coverage: Latin, Latin Ext, Vietnamese
Verdict: candidate for display only. Evidence: work/type-candidates.json, shots/type-candidates.png
```

```
Face (candidate, B): IBM Plex Mono 400/600. Roles: data (amounts, summary)
Legibility: PASS. x-height 0.739; I/l d 0.16, 0/O d 0.10 @16 px (dotted zero, small marks; check by eye at 1×)
Figures: tabular. Coverage: Latin, Latin Ext, Vietnamese, Cyrillic
Verdict: candidate for amounts only. Evidence: work/type-candidates.json, shots/type-candidates.png
```

## 7. Reworks

**No rework warranted.**
- **Premise holds:** the first screen starts the core task.
- **No cluster:** no root cause shared by three or more findings survives per-row fixes. #2 and #3 share "list rebuilt with `innerHTML`", but stable keys fix each one.
- **No identity case:** the distinctiveness verdict is `authored`.
- **Peer gap not testable:** peer step counts are unsourced.
- **No system case:** the app is a single file.

## 8. Enhancements

Six enhancements, kept few because the evidence is one screen and no user data.

**Experience and flows**
1. **Claim by person** (Simplicity).
   - Today, 4 diners and 4 items mean a 16-checkbox grid ticked item by item, but at the table people say "I had the salad and the wine."
   - Add a person-first mode: pick Ana, see every item as a list, and tick hers.
   - It writes to the same `who[]` model, so the result is identical.
   - Unlocks: fewer steps for the most common way people report what they ate.
2. **Paste or photograph the receipt** (Purpose).
   - Turn pasted receipt text ("Margherita pizza 16.50" per line) into items, and optionally a photo through `<input type="file" accept="image/*" capture>`.
   - This is the category frontier (Splitwise Itemize, Apple Wallet 27).
   - Name it for the task, "Add items from receipt", not "AI", to avoid the clone convergence.
   - Unlocks: removes most of the roughly 12 typed inputs in step 2.
3. **Quantities on items** (Simplicity).
   - "2 × Beer at $7.00" splits by unit, so one diner can take one beer.
   - Receipts print quantities, and Apple Wallet 27 reportedly reads them.

**Information architecture**

4. **Live totals on a phone** (Flexibility).
   - At 390 px, "Each person pays" starts about 1,850 px below the first item card (`full-390-light.png`).
   - Add a slim sticky strip during step 2 ("Ana $23.85 · Ben $23.84 · …" in tabular figures) that opens the full sheet.
   - The per-item "Split N ways" notes already give partial feedback; this extends it to totals.

**Platform capabilities**

5. **Share the summary** (Agency).
   - Next to "Copy summary", offer `navigator.share({ text })` where it is supported, so the summary goes straight into the group chat.
   - The web mapping prefers `navigator.share` on Apple devices.

**Content and voice**

6. **Put the spare cent where it lands** (Craft).
   - Show "+1¢" in muted text beside the amount it went to, in that person's row.
   - The cent ledger is the product's signature and the opening no sourced peer documents (Landscape). Today it lives in a paragraph under the total.

## 9. Unverified

- **Safari and Firefox:** not run. `type-eval` and all measurements are Chromium-only. A WebKit run would verify Iowan, `:has()` focus rings, `inputmode` keyboards and the clipboard.
- **Real touch devices:** not run (iOS Safari keyboard, viewport and toolbar behaviour). A physical iPhone or Simulator Safari would verify it.
- **Screen readers:** VoiceOver and NVDA output for the toast's live region (`role=status` holding buttons) and the "Restored." announcement was not heard. A VoiceOver pass would verify it.
- **Clipboard failure:** the "Could not copy automatically" branch was not driven. Verify by denying clipboard permission.
- **Storage blocked:** `localStorage` unavailable (private mode or blocked storage) was not driven. `save()` swallows the error silently, so a refresh would lose the dinner with no message. Verify with storage disabled.
- **Restoring last session:** returning after a week restores the previous dinner. Whether that is intended is unknown (question 5).
- **Error, offline and loading states:** the app makes no network requests (file:// and local only), so these do not apply. Verified by reading the source; no fetch calls exist.
- **Increased contrast:** `prefers-contrast: more` has no rule in the CSS. The screenshot looked the same as the default and every pair already passes, so there is no finding. A Windows high-contrast pass beyond the emulated forced colours would verify it.
- **Windows and Android fonts:** with the Palatino, Georgia, Segoe UI or Roboto fallbacks, metrics and wrapping were not seen. Verify on those systems.
- **Text spacing:** the WCAG 1.4.12 overrides (line height, letter and word spacing) were not applied.
- **30-person and 200-item limits:** the limits themselves were not reached; only 12 diners were tested.
- **Landscape claims:**
  - Apple Wallet bill splitting is known from press summaries [S]; the Apple primary page was not fetched.
  - Tab's current state is from its App Store listing and a 2013 review [S].
  - Peer step counts are unknown.

## 10. Offer

**Fixable in code now:**
- Copy rewrites: 6, 7, 8, and the polish copy in 14.
- Focus and Undo mechanics: 2, 3, 13.
- Layout at large text: 4.
- Input guidance: 9, 10.
- Forced colours: 11.
- Polish: 14 (RTL padding, Start over).

**Need a design decision first:**
- #1: the unassigned-item policy (block, share among everyone, or hold aside), plus the label wording.
- #5: the editing model (edit in place, or an edit sheet).
- #12: worth fixing at all.

Enhancements 1 to 6 and the two theme directions need your call. I can build any one enhancement, or a throwaway prototype of Direction A or B applied to the current page.

Optional, to verify more: a WebKit or iPhone run, a VoiceOver pass, and confirmation of the profile answers above.

Which findings should I fix?
