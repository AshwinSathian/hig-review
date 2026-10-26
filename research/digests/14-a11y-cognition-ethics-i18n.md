# 14: Accessibility (beyond Apple), cognition, ethics, i18n

Sources: W3C WCAG 2.2, w3.org/TR/WCAG22; W3C COGA, Making Content Usable for People with Cognitive and Learning Disabilities, w3.org/TR/coga-usable; WAI-ARIA Authoring Practices; APCA, git.apcacontrast.com; European Commission (European Accessibility Act) and EN 301 549; Android, React Native and Angular Material accessibility docs; MDN; Center for Humane Technology; Calm Technology. Fetched 2026-10-23.
Paraphrased digest for review purposes. Short quotations are attributed; consult the sources for the authoritative text.

Fetched 2026-10-23. Framing: **Apple HIG is the base.** Everything here either **adds to Apple** (stricter or more specific), covers ground where **Apple is silent**, or is a **CONFLICT** (flagged explicitly). In accessibility the strictest source wins. In everything else Apple wins unless a conflict is called out.

Test tags: `[DOM]` automatable against the rendered DOM/accessibility tree, `[SHOT]` judgeable from a screenshot, `[MANUAL]` needs a human or a scripted interaction (keyboard, AT, settings toggles).

Apple numbers referenced below (44×44 pt etc.) come from our earlier HIG digest and were not re-fetched for this file.

---

## 1. WCAG 2.2: the newer success criteria (https://www.w3.org/TR/WCAG22/, Rec. 5 Oct 2023; the TR page now shows an updated edition dated 12 December 2024)

**Why it matters.** WCAG 2.2 AA is now the reference for EN 301 549 V4.1.1 (see §3), so it is what EU law will measure against. Most of the new criteria target failures typical of modern app UIs: sticky chrome, drag-only interactions, tiny icon buttons, OTP boxes. `4.1.1 Parsing is obsolete and removed from WCAG 2.2.`

### 2.4.11 Focus Not Obscured (Minimum), AA
Normative text: the focused component "is not entirely hidden due to author-created content." The AAA version (2.4.12) requires that "no part of the component is hidden by author-created content."
- [MUST] Tab through every page with sticky header, sticky footer, cookie banner, chat bubble, and toast all present. No focused element may be fully covered. `[MANUAL]` (Playwright can script it: after each Tab, compare `document.activeElement.getBoundingClientRect()` with every `position:fixed|sticky` element's rect.)
- [MUST] Cookie banner: per Understanding doc, a sticky cookie banner "will fail this success criterion if it entirely obscures a component receiving focus." Fix by making it modal or by using scroll padding.
- [SHOULD] Use `scroll-padding-top/bottom` equal to the sticky bar height (technique C43). `[DOM]`: sticky element exists, `html` has no scroll-padding.
- [SHOULD] Non-modal overlays that don't take focus and don't close on focus leaving are "at risk of failing". `[MANUAL]`
- Note: for user-movable panels "only the initial positions … are considered".
- [CONSIDER] Hold to 2.4.12 (no part hidden) for primary flows.

### 2.4.13 Focus Appearance, AAA (context for 2.4.11)
The indicator area must be "at least as large as the area of a 2 CSS pixel thick perimeter of the unfocused component" and must have "a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states."
- [SHOULD] Custom focus rings: ≥2px perimeter and ≥3:1 change. `[SHOT]` (screenshot each focused/unfocused pair and diff the pixels).
- [MUST] `outline: none` with no replacement fails 2.4.7. `[DOM]`

### 2.5.7 Dragging Movements, AA
"All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging," unless dragging is essential.
- [MUST] Every drag-to-reorder list, kanban, slider, range picker, map pan, and swipe-to-delete needs a tap/click alternative, e.g. up/down buttons, a "Move to…" menu, tapping a slider track, or +/- steppers. `[MANUAL]`
- [MUST] Native `<input type=range>` passes because the user agent supplies it. A custom div slider has to supply its own alternative. `[DOM]`: element with `role=slider` that isn't a native input → check for a click-on-track handler or steppers.
- Note: keyboard support alone does not satisfy this criterion. It is about pointer users who can't drag.

### 2.5.8 Target Size (Minimum), AA
"The size of the target for pointer inputs is at least 24 by 24 CSS pixels". Exceptions: Spacing, Equivalent, Inline, User agent control, Essential.
- Spacing test (verbatim method): draw a 24px-diameter circle centred on the bounding box of each undersized target. It fails if a circle "intersect[s] another target or the circle for another undersized target."
- Overlapping areas don't count toward a target's size.
- [MUST] `[DOM]`: compute `getBoundingClientRect()` for every interactive element, flag any under 24×24 CSS px, then run the circle test. Also test targets that appear after interaction (menus, modals, banners).
- **Adds to Apple / mostly weaker than Apple.** Apple's iOS minimum of 44×44 pt is stricter, so on iOS Apple wins. On **web**, Apple is silent and 24px is the legal floor. For primary actions on web, aim for 44px (the AAA 2.5.5 figure, from memory: 44×44, unverified here). **Android/Material: 48dp** (fetched, §5).
- **CONFLICT (macOS):** Apple's macOS control sizes (from the HIG digest) are close to the 24px floor, and dense toolbars with 16–20px icon targets can fail 2.5.8 when built in web tech (Electron/Catalyst web views). Strictest wins: apply 24px plus spacing to any web-rendered macOS UI.

### 3.2.6 Consistent Help, A
If help (human contact details, contact mechanism, self-help, chatbot) repeats across pages, "they occur in the same relative order to other page content".
- [MUST] The help link/chat entry sits in the same relative slot on every screen of the flow, not in the footer on one page and the header on another. `[SHOT]` across ≥3 screens, or `[DOM]`: same DOM order relative to landmarks.
- Note: it doesn't require help to exist. COGA (§2) does.

### 3.3.7 Redundant Entry, A
Information entered earlier in the same process must be "auto-populated or available for the user to select". Exceptions: essential, security, or no longer valid.
- [MUST] Checkout: "Billing same as shipping" checkbox or prefill. Multi-step signup doesn't re-ask for email. `[MANUAL]`
- [MUST] "Confirm email" and "confirm password" fields count as re-entry. Re-entering a password is allowed under the security exception, but confirm-email has no such cover. (Inference from the SC text. Verify against the Understanding doc before making it a hard fail.)
- [SHOULD] Correct `autocomplete` tokens so browsers fill across sessions too (1.3.5). `[DOM]`

### 3.3.8 Accessible Authentication (Minimum), AA
A cognitive function test "is not required for any step in an authentication process" unless there is an alternative, a mechanism that assists, object recognition, or personal content. At AAA (3.3.9) object recognition and personal content no longer qualify.
- Understanding doc: transcription ("typing in characters") **is** a cognitive function test. "Copy and paste can be relied on to avoid transcription."
- [MUST] `[DOM]`: no `onpaste` preventDefault and no `autocomplete="off"` on password, OTP, or username fields. Blocking paste fails "unless another method is available." Scripts that block password-manager autofill also fail.
- [MUST] OTP split into 6 boxes must accept a full paste of the code and support `autocomplete="one-time-code"`. Figure 3 in the doc calls out boxes that reject paste. `[MANUAL]`: paste "123456" into box 1.
- [MUST] Text CAPTCHA or math CAPTCHA with no non-cognitive alternative fails. An audio CAPTCHA that requires transcription doesn't count as the alternative. Image "pick the cars" passes AA but fails AAA.
- [SHOULD] Offer passkeys/WebAuthn, email magic link (technique G218), or OS biometrics. These are not cognitive function tests.
- **Adds to Apple:** Apple promotes passkeys and Password AutoFill. WCAG makes paste-blocking and non-pastable OTP a hard fail, which Apple doesn't spell out.

**Slop tells (inference).** Sticky "Chat with us" bubble covering the last form field. Drag-only kanban. Icon-only 16px ghost buttons in table rows. 6-box OTP that ignores paste. "Confirm your email" field. Help link that moves between steps.

---

## 1b. WCAG 3 status, Oct 2026 (https://www.w3.org/WAI/WCAG3/; page returned 403, news item https://www.w3.org/WAI/news/2026-03-03/wcag3)

- Latest Working Draft: **3 March 2026** (W3C news). Still a Working Draft, not a Candidate Recommendation.
- Timeline: third-party estimates (AbilityNet) put CR around Q4 2027 and Rec "not earlier than 2028". These are not W3C commitments. The W3C says WCAG 2 won't be deprecated for years after WCAG 3 ships (via search summary; primary page unreachable).
- Conformance model and contrast algorithm in the 2026 draft: **not verified.** Earlier drafts proposed Bronze/Silver/Gold tiers and an APCA-like contrast method (unverified, from memory). Don't encode WCAG 3 as checks.
- [CONSIDER] Use WCAG 3 only as directional input. Never cite it as a pass/fail authority.

## 1c. APCA contrast (https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html, fetched 2026)

**Why it matters.** WCAG 2's ratio, per APCA docs, "overstates contrast for dark colors, so 4.5:1 can be functionally unreadable when one color is near black". That makes it a weak guide for dark mode. APCA's Lc is perceptually uniform and depends on polarity: text on background is not symmetric.

**Lc thresholds (Bronze/Silver, sizes at Helvetica/Arial reference weights; px = CSS px):**
| Lc | Use (verbatim-derived) |
|---|---|
| 90 | Preferred for body text at 18px/300 or 14px/400. Also non-body text at 12px/400+. Suggested *max* for very large bold (>36px bold) and big colour areas |
| 75 | Minimum for body text at 24px/300, 18px/400, 16px/500, 14px/700. Also non-body text at 15px/400+ |
| 60 | Minimum for non-body content text at 48px/200, 36px/300, 24px/400, 21px/500, 18px/600, 16px/700. Add Lc 15 to use these as body text |
| 45 | Headlines: 36px normal or 24px bold. Fine-detail pictograms, outline icons |
| 30 | Absolute minimum for placeholder, disabled, "spot readable" text, and solid icons (≥ ~5.5px) |
| 15 | Absolute minimum for dividers and thick focus outlines (≥5px solid). Below 15, treat as invisible |
| +15 | AAA-equivalent: add 15 to each |

- [MUST] Legal compliance still uses WCAG 2 ratios (4.5:1 / 3:1). APCA is **not** a substitute for compliance.
- [SHOULD] Run APCA in addition for dark mode, thin weights (≤300), and small text, and fail anything that passes WCAG 2 but sits below the APCA row for its size and weight. `[SHOT]` or `[DOM]` (computed colour plus font-size/weight).
- [SHOULD] Light grey text at 300 weight on white ("elegant" UI) can pass 4.5:1 and still fall below Lc 75 for body text. Flag it.
- [CONSIDER] Use the Lc 90 *maximum* for large bold: pure white on pure black at headline size is over-contrasted and causes halation in dark mode.
- **Adds to Apple:** Apple specifies ratios, Dynamic Type, and Increase Contrast, but gives no weight-aware contrast. APCA covers thin SF weights. **No conflict:** run both and keep the stricter result.

**Slop tells.** `text-gray-400` body copy on white. Font-weight 300 everywhere for "premium" feel. Dark mode made by inverting light tokens (#FFF on #000 headlines, mid-grey secondary text that fails Lc 60).

---

## 2. W3C COGA: Making Content Usable for People with Cognitive and Learning Disabilities (https://www.w3.org/TR/coga-usable/, W3C WG Note 29 Apr 2021)

**Why it matters.** WCAG covers cognition thinly. COGA's 8 objectives turn into concrete design checks, and they double as anti-slop checks because slop is usually cognitively noisy. Background figure from the doc: people with impaired working memory "may only be able to hold one to three items in their memory at the same time."

**Checks (patterns → checks; numbers verbatim where the doc gives them):**
- [MUST] **Critical features findable:** primary task reachable from home or root in one obvious step (4.3.1). `[SHOT]`
- [SHOULD] **"five or less main choices"** per screen (4.6.3, Avoid Too Much Content). `[SHOT]`/`[DOM]`: count top-level actions or nav items in the main region.
- [SHOULD] Content per screen limited to "a few short bullet points and one or two images related to the main topic". No long dense paragraphs. `[SHOT]`
- [MUST] **Human help:** easy to find on every page and every step. Contact form required fields "no more than 3". Voice menus' first option is "to wait for a person who can help you press 0". `[DOM]` count required fields on contact form.
- [MUST] **Login without memory:** users must not need to "memorize character strings", do calculations, copy content, solve puzzles, reproduce gestures, or read distorted characters. Don't block paste. Avoid making users copy 2FA codes. (Stricter than WCAG 3.3.8, which allows object recognition.) `[MANUAL]`
- [MUST] **Avoid data loss and timeouts:** autosave. If a timeout is unavoidable, say at the **start** how long and whether data will be lost. Ask for card details at the *last* step. `[MANUAL]`
- [SHOULD] **Short critical paths:** minimum steps, with optional steps separated so users don't have to pass through them (e.g. "Add a profile photo" isn't a required step of onboarding). `[MANUAL]`
- [SHOULD] **Let users go back:** clickable breadcrumbs or step indicator, and going back must not wipe data. Don't show a review summary that can't be edited without data loss.
- [MUST] **Clear visible labels:** visible and adjacent to the control. Don't rely only on ARIA or `title` for names (COGA explicitly says this). Placeholder-as-label fails. Instructions go before or next to the field. `[DOM]`: input without visible `<label>` text.
- [SHOULD] **Limit interruptions:** users control reminders, popups, and content changes unless they started the change or it's an emergency. Ads, motion, and sound get a pause control. `[MANUAL]`
- [SHOULD] **Fees up front:** state costs and consequences at the start of a task. Name the "features that may affect the user's finances". `[MANUAL]`
- [SHOULD] **Clear words, literal language,** no double negatives (e.g. "Don't not notify me"), no nested clauses, a simple tense. Explain implied content. Provide alternatives for numerical concepts. `[DOM]` text scan for double negatives and idioms.
- [SHOULD] **Icons that help:** familiar icons, with a text label for anything non-universal. `[SHOT]`
- [SHOULD] **Familiar hierarchy:** for example, search in the conventional location. The doc's web example is search in the "top right hand corner". Link convention example: "underlined and blue for unvisited; purple for visited". `[SHOT]`
- [CONSIDER] **Support simplification / personalisation** (objective 8): a "simple mode", hiding non-essential features, and support for user stylesheets/extensions.

**Adds to Apple.** Apple's HIG covers clarity in general terms but sets no numbers on choices per screen, contact-form fields, timeout disclosure, or fee disclosure. Apple is **silent** on cognitive load as an accessibility requirement. No conflicts.

**Slop tells.** Hero with 3 CTAs plus a nav with 8 items. Clever-copy headlines ("Unleash your workflow"), which are figurative, not literal. Icon-only bottom bar with abstract glyphs. Placeholder-only inputs. Session timeout that silently drops form data. Price revealed at the last step.

---

## 3. European Accessibility Act + EN 301 549 (Directive (EU) 2019/882; https://commission.europa.eu/…/european-accessibility-act_en; Deque on V4.1.1, 2026)

**Facts:**
- Requirements apply from **28 June 2025** (search-confirmed across sources; the Commission page gives only the transposition deadline, June 2022).
- Covered (Commission page): computers and OSes, ATMs, smartphones, telephony, passenger transport (air, bus, rail, waterborne), **banking services, e-books, e-commerce**. Consumer apps in those sectors are in scope.
- Microenterprise exemption: **services only**, not products. Threshold reported as <10 employees and ≤€2M turnover or balance sheet. Sources differ on the AND/OR wording. Verify against Art. 3/4 of the Directive (unverified).
- Transition: service contracts concluded before 28 June 2025 can continue until **28 June 2030** (secondary source; verify Art. 32).
- **EN 301 549 V4.1.1 published 2 September 2026**. It moves from WCAG 2.1 to **WCAG 2.2 AA** (adds the six A/AA SCs in §1), substantially reworks User Preferences requirements, revises real-time text and communication into a "Total Conversation" model (voice, RTT, video), and adds Annexes mapping to the EAA. OJEU citation (which gives presumption of conformity) is expected around **30 Nov 2026** (Deque), with another source saying 16 Dec 2026. Until then **V3.2.1 (WCAG 2.1 AA)** is the presumption-of-conformity version.

**Checks:**
- [MUST] For any app sold in the EU in a covered sector, review against WCAG 2.2 AA now. V4.1.1 makes it the bar, and it's a superset of 2.1.
- [MUST] Native apps are covered too. EN 301 549 Clause 11 applies WCAG-derived criteria to non-web software (from memory, unverified). Native iOS/macOS apps aren't exempt because "WCAG is for web."
- [SHOULD] Calling, messaging, video, or support-chat features: the real-time text requirements in Clause 6 go beyond WCAG. Deque: "testing only to WCAG 2.2 AA won't be enough" there.
- [SHOULD] "User Preferences" (V4 reworked): honour platform settings such as text size, contrast, and reduced motion, and don't override them. On Apple this maps to Dynamic Type, Increase Contrast, and Reduce Motion. `[MANUAL]`
- [SHOULD] EAA also requires an accessibility statement or information about the service (unverified, from memory, Annex V). Check for one in app or web footer.

**Adds to Apple.** Apple's Accessibility Nutrition Labels are self-declared marketing. EAA is enforceable law with market surveillance. Where a nutrition label claims support (e.g. "Larger Text"), EN 301 549 user-preference clauses make that a testable obligation. No conflict.

**Slop tells.** Accessibility overlay widget presented as compliance. "Accessibility statement" that is boilerplate with no date, no known issues, and no contact.

---

## 4. ARIA Authoring Practices Guide (https://www.w3.org/WAI/ARIA/apg/, fetched 2026)

**Why it matters.** Custom components are where AI-generated UI breaks accessibility. APG: "Incorrect ARIA misrepresents visual experiences, with potentially devastating effects." A role "is a promise" that the author "has also incorporated JavaScript" providing the expected keyboard behaviour. "ARIA roles do not cause browsers to provide keyboard behaviors or styling."

**General checks:**
- [MUST] Any `role=` on a non-native element → verify that the role's full keyboard contract is implemented. `[DOM]` lists the roles. `[MANUAL]` tests keys.
- [MUST] Prefer native: `<button>`, `<dialog>`, `<details>/<summary>`, `<select>`, `<input type=range>`. `[DOM]`: `div[role=button]`, `div[onclick]` without a role or tabindex.
- [MUST] Forced-colour rendering follows **native semantics, not ARIA**. MDN: adding `role="button"` to a `div` doesn't change its forced colour (see §6). This is one more argument for native elements.

**Combobox (APG):**
- [MUST] `role=combobox` on the input, `aria-expanded` true/false, `aria-controls` → popup, and `aria-activedescendant` → highlighted option. **DOM focus stays on the input** for listbox/grid/tree popups. `aria-autocomplete` is none/list/both. The selected option gets `aria-selected=true`.
- [MUST] Keys: Down Arrow opens or moves into the popup. Escape closes it (and optionally clears the input). Enter accepts. Alt+Down/Alt+Up are optional. The popup and its toggle button stay out of the Tab sequence.
- Note: the ARIA 1.0 `aria-owns` pattern is legacy. `aria-controls` is current. `[DOM]` flag `aria-owns` on a combobox.
- Slop tell: a "searchable select" that moves real focus onto list items, or that traps Tab inside the list.

**Modal dialog (APG):**
- [MUST] On open, focus moves inside the dialog: "Generally … the first focusable element". For long content, focus a static heading with `tabindex=-1`. Tab and Shift+Tab wrap within the dialog. Escape closes it. On close, "focus returns to the element that invoked the dialog". `aria-modal=true`. The dialog is named by `aria-labelledby` pointing to the visible title, or by `aria-label`.
- [SHOULD] Set `aria-modal` only when outside content really is inert and visually obscured.
- [SHOULD] Prefer native `<dialog>` with `showModal()`, which provides inertness and Escape handling (from memory; APG page doesn't discuss it).
- Slop tell: a toast-style "modal" with no focus move, or a close button whose only label is an "×" glyph.

**Menu vs menubar misuse:**
- APG's menubar keyboard contract: arrows move between items, Tab leaves the menu and closes it, Escape closes it and returns focus, Home/End, and typeahead is optional.
- APG includes a navigation menubar example, but **Adrian Roselli** (https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html, 2017): menu roles are for "replicat[ing] an application menu"; "A properly-coded web page navigation menu needs no ARIA."
- [MUST] Site navigation uses `<nav>` with lists of `<a href>`. Submenus use the **disclosure** pattern (a `<button aria-expanded>` toggling a list of links), not `role=menu`. `[DOM]`: `nav [role=menu|menubar|menuitem]` → flag.
- [SHOULD] `role=menu` only for app-style command menus (e.g. a "…" actions menu), and then with the full arrow-key contract.
- **CONFLICT:** APG offers a navigation menubar example, while practitioner consensus (Roselli) says not to use menu roles for navigation. Skill position: strictest wins, so use disclosure for navigation.
- **Adds to Apple:** on macOS, real app menus belong in the system menu bar (HIG). A web-rendered fake "menubar" inside a Mac app breaks both Apple conventions and APG.

**Tabs (APG):**
- [MUST] `tablist` > `tab` (`aria-selected`, `aria-controls`) > `tabpanel`. Arrow keys move between tabs and wrap. Tab moves into the panel. When focus enters the tablist it lands on the **active** tab. A panel without focusable content gets `tabindex=0`.
- [SHOULD] Automatic activation on focus only if the panel shows "without noticeable delay". Use manual activation (Enter/Space) for panels that fetch data.
- Slop tell: "tabs" built as buttons with every tab in the Tab order. Or segmented controls marked as tabs when they're really filters (those should be radio groups or toggle buttons).

**Disclosure (accordion, show more):**
- [MUST] Native `<details>/<summary>`, or a `<button aria-expanded>` controlling the region. The heading wraps the button for accordions (from memory, unverified). `[DOM]`

---

## 5. Platform a11y beyond Apple

### Android / Material (https://developer.android.com/guide/topics/ui/accessibility/apps, 2026)
- [MUST] Touch target **48dp × 48dp** ("Larger is even better"). Material `Button`, `IconButton`, and `ListItem` enforce it; custom composables need `sizeIn(minWidth=48.dp, minHeight=48.dp)`. `[DOM]` equivalent in Compose test or Accessibility Scanner.
- Contrast: 4.5:1 for text under 18sp (or bold text under 14sp), 3:1 otherwise.
- [MUST] contentDescription states purpose, not appearance. No role words ("Submit", not "Submit button"). Unique per list item. Decorative icons get `null`. `Text` doesn't need one.
- [SHOULD] Test with Accessibility Scanner, Lint, and Compose tests.
- **Cross-platform conflict:** iOS 44pt vs Android 48dp vs web 24px. In a cross-platform (RN/Flutter) codebase apply **48** as the shared floor (strictest). Apple wins on iOS visual conventions; the size floor follows the strictest rule.

### React Native (https://reactnative.dev/docs/accessibility, 2026)
Pitfalls a reviewer can grep for:
- [MUST] `accessible={true}` groups children into one element (iOS `isAccessibilityElement`, Android `focusable`). Nested accessible elements are not reachable on VoiceOver. Grep for `accessible` on a parent whose children contain buttons, because that makes the inner buttons unreachable. `[DOM]` (static grep)
- [MUST] Platform-only props that silently do nothing on the other OS:
  - `importantForAccessibility` (incl. `no-hide-descendants`): **Android only**
  - `accessibilityLiveRegion` / `aria-live`: **Android only**. iOS needs `AccessibilityInfo.announceForAccessibility` (from memory).
  - `accessibilityViewIsModal` / `aria-modal`: **iOS only**, and it must be on the view whose *siblings* should be ignored. Set on a child, it doesn't hide them.
  - `accessibilityElementsHidden`: **iOS only**
  - Actions: `magicTap` and `escape` are iOS only. `longpress`, `expand`, and `collapse` are Android only.
  Check: every modal hides background content on both platforms, and every live update is announced on both.
- [SHOULD] `role` takes precedence over `accessibilityRole`, and the value names differ (`heading` vs `header`, `img` vs `image`). Mixed usage is a smell.
- [MUST] Custom actions need both `accessibilityActions` **and** `onAccessibilityAction`.
- [SHOULD] Small icon `Pressable`s: enlarge with `hitSlop` (not covered on the a11y page; check the Pressable docs).

### Angular CDK a11y (https://github.com/angular/components/blob/main/src/cdk/a11y/a11y.md)
- `ListKeyManager` / `FocusKeyManager` / `ActiveDescendantKeyManager` for menu and listbox keyboard handling. `TreeKeyManager` ("Only the HTML node corresponding to the active item should have a `tabindex` set to `0`").
- `cdkTrapFocus`: "will not prevent focus from moving out of the trapped region due to mouse interaction". `cdkFocusInitial` needs `cdkTrapFocusAutoCapture`, otherwise nothing happens.
- `FocusMonitor` reports the focus origin (mouse, keyboard, touch, program). Use it to show focus rings on keyboard focus only, and require `stopMonitoring` on destroy.
- `LiveAnnouncer` handles aria-live. `cdk-visually-hidden` (or the `a11y-visually-hidden` mixin) gives sr-only text.
- [SHOULD] In Angular code, flag hand-rolled keyboard managers or focus traps when a CDK primitive exists (also a ponytail/reuse check).

**Adds to Apple.** Apple says nothing about cross-platform frameworks. These are the places where an iOS-only accessibility review misses Android regressions.

---

## 6. Motion, vestibular, forced colours, contrast and transparency preferences

### 2.3.3 Animation from Interactions, AAA (https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html)
- "Motion animation triggered by interaction can be disabled, unless the animation is essential". Motion includes moving into place and changing size while appearing. Parallax is a named example. Colour and opacity changes are excluded. An erratum stops excluding **blur**, so blur transitions may count. Effects reported: dizziness, nausea, migraines, in some cases bed rest.
- [MUST] (strictest wins, though AAA) `@media (prefers-reduced-motion: reduce)` removes parallax, scroll-linked transforms, zoom/scale page transitions, and auto-scrolling carousels (C39/SCR40). `[DOM]`: CSS contains animations and transforms but no `prefers-reduced-motion` block. `[MANUAL]`: toggle Reduce Motion and walk the app.
- [SHOULD] Under reduced motion, replace motion with a crossfade instead of deleting the transition, so state change is still communicated.
- Val Head (*Designing Interface Animation*, 2016; A List Apart "Designing Safer Web Animation for Motion Sensitivity", 2015; unverified, from memory): the riskiest motions are large-area movement, scaling or zooming across the viewport, spinning, parallax and multi-speed movement, and motion that doesn't match the user's scroll direction. Small, slow, user-initiated motion is lower risk.
- **Apple alignment:** Apple honours Reduce Motion. WCAG adds blur to the list, and Val Head's risk taxonomy gives a ranking Apple doesn't have.

### Forced colours / Windows High Contrast (https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
- Overridden: `color`, `background-color`, `border-color`, `outline-color`, `text-decoration-color`, and SVG `fill`/`stroke`. **`box-shadow` and `text-shadow` → none.** Non-`url()` `background-image` → none, so **gradients disappear**. `color-scheme` is forced to `light dark`.
- [MUST] Buttons, cards, and inputs that are defined only by shadow or background colour lose their edges. They need a real `border` (it can be `transparent` in normal mode, since forced mode recolours it). The same goes for focus rings built from `box-shadow`, so use `outline: 2px solid transparent` as a backup. `[MANUAL]`: Chrome DevTools → Rendering → emulate `forced-colors: active`, then screenshot `[SHOT]`.
- [MUST] Icons as CSS `background-image` gradients or masks vanish. Inline SVG should use `currentColor`. `[DOM]`
- [SHOULD] Use system colours (`CanvasText`, `LinkText`, `ButtonText`) in `@media (forced-colors: active)` fixes. Don't build a separate theme. Use `forced-color-adjust: none` sparingly (it "removes the contrast protections").
- Apple is **silent** here. Safari supports `forced-colors` from 16, but macOS has no Windows-style forced palette (from memory). Any web app with Windows users needs this check.

### prefers-contrast, prefers-reduced-transparency: browser status (MDN browser-compat-data, fetched 2026-10)
| Feature | Chrome/Edge | Firefox | Safari / iOS |
|---|---|---|---|
| `prefers-reduced-motion` | 74 | 63 | 10.1 |
| `prefers-contrast` | 96 | 101 | 14.1 |
| `forced-colors` | 89 / 79 | 89 | 16 |
| `prefers-reduced-transparency` | 118 | 113 **behind flag** `layout.css.prefers-reduced-transparency.enabled` | **Not supported** |
| `inverted-colors` | no | 114 behind flag | 9.1 / iOS 10 |
- MDN: `prefers-reduced-transparency` is "experimental", **not Baseline**.
- [MUST] Glass and blur surfaces (backdrop-filter): default styling must meet contrast **without** relying on `prefers-reduced-transparency`, because Safari/WebKit (the browser behind Apple's own Reduce Transparency setting) doesn't expose it to the web. `[SHOT]`: check text over the busiest background.
- [SHOULD] `@media (prefers-contrast: more)`: thicken borders, drop translucency, raise secondary-text contrast. Maps to Apple's Increase Contrast on Safari.
- **CONFLICT / gap with Apple:** HIG (Liquid Glass era) leans on translucency and trusts the OS Reduce Transparency setting to fix it. That fix doesn't reach web content in Safari, so web builds of Apple-styled UI must be legible with full translucency. Strictest wins.

**Slop tells.** Glassmorphism cards defined only by `backdrop-filter` and `box-shadow`. Gradient-text headings (they vanish in forced colours). Scroll-jacked parallax hero with no reduced-motion branch. Focus ring done as a `box-shadow`.

---

## 7. Ethical and humane design

### Calm Technology, Amber Case (https://calmtech.com/; Calm Tech Institute "Launched May 2024", runs "Calm Tech Certified®")
The 8 principles (verbatim):
1. "Technology should require the smallest possible amount of attention"
2. "Technology should inform and create calm"
3. "Technology should make use of the periphery"
4. "Technology should amplify the best of technology and the best of humanity"
5. "Technology can communicate, but doesn't need to speak"
6. "Technology should work even when it fails"
7. "The right amount of technology is the minimum needed to solve the problem"
8. "Technology should respect social norms"

Checks:
- [SHOULD] Status uses the periphery (badge, subtle indicator, haptic) before a modal or push notification (P3, P5). `[SHOT]`
- [SHOULD] Degraded mode: offline or error states keep core function and cached content, not a blank screen (P6). `[MANUAL]`: airplane mode.
- [SHOULD] Each notification type maps to a user-meaningful event. No "We miss you" re-engagement pushes (P1, P2).
- [CONSIDER] Feature count audit (P7): flag features that exist only to raise engagement.

### Center for Humane Technology (https://www.humanetech.com/youth/persuasive-technology)
Named persuasive techniques: red-dot notifications ("we instinctively respond with urgency to red"), social cues and tags, like monitoring, **infinite scroll, autoplay**, engagement-optimised feeds, **streaks**, loot boxes, ads disguised as results. Framing: tools serve your goals, persuasive tech serves the company's.
- [MUST] No autoplay of next content without an opt-in setting. `[MANUAL]`
- [SHOULD] Infinite feeds have a natural stopping point ("You're caught up") or pagination. `[SHOT]`
- [SHOULD] Red badge counts only for items needing the user's action, not for promotions. `[SHOT]`
- [SHOULD] Streak mechanics have forgiveness (freeze, grace) and an off switch. `[MANUAL]`
- [MUST] Sponsored items are labelled and visually distinct from organic results. `[SHOT]`

### Notification ethics (synthesis; our inference from Calm Tech, CHT, and COGA "Limit Interruptions")
- [MUST] Don't ask for notification permission on first launch. Ask in context, after the user takes an action that implies they want it. (Apple's HIG also advises asking in context. Here it's stricter: it's a must.)
- [MUST] Per-category notification controls inside the app, with marketing pushes off by default.
- [SHOULD] Time-sensitive or interruption level is reserved for events the user would agree are urgent (maps to Apple Focus interruption levels).

**Adds to Apple.** Apple's HIG covers notification etiquette and asking permission in context. CHT and Calm Tech add the stance that engagement mechanics themselves (streaks, infinite scroll, autoplay, red dots) are review findings. Apple is silent on streaks and feeds. No conflict.

**Slop tells.** Red badge on a "What's new" tab. Confetti and streak counters on a utility app. Notification prompt before onboarding. "Don't miss out!" re-engagement push copy. Endless feed with skeleton loaders forever.

---

## 8. Localization and internationalization UX beyond RTL

### Text expansion (W3C i18n, https://www.w3.org/International/articles/article-text-size, data from IBM's "Guidelines to design global solutions")
| English source chars | Avg expansion |
|---|---|
| Up to 10 | 200–300% |
| 11–20 | 180–200% |
| 21–30 | 160–180% |
| 31–50 | 140–160% |
| 51–70 | 151-170% (sic, as published) |
| Over 70 | 130% |
Per-language example, "views" (EN=1): Korean 0.8, Chinese 1.2, Portuguese 2.6, French 2.6, German 2.8, Italian 3. "Each Chinese and Korean character is counted as two English characters in width." Non-Latin scripts often have "much taller characters" and need more line spacing.
- [MUST] Short labels (buttons, tabs, badges ≤10 chars) must handle **3×** width. No fixed-width buttons, no `white-space:nowrap` with `overflow:hidden` on labels. `[MANUAL]` pseudo-localise (e.g. "[Ŝéţţîñĝš ~~~~~~]") then `[SHOT]`.
- [MUST] No fixed `height` on text containers. CJK, Thai, and Devanagari need taller line boxes. `[DOM]`
- [SHOULD] Tab bars and segmented controls have a defined behaviour when labels overflow (wrap, scroll, or shrink to icon). Never truncate silently.

### CJK line breaking (W3C clreq, Group Note Draft 7 Oct 2026; MDN word-break)
- Ellipses and two-em dashes must not split across lines. Recommended code points are U+2E3A (⸺) and paired U+2026. Punctuation position differs between Mainland China and TW/HK.
- [SHOULD] Korean: `word-break: keep-all` stops mid-word breaks in Hangul. `word-break: auto-phrase` (experimental) avoids breaking natural phrases. `[DOM]` for `lang=ko` content.
- [SHOULD] Don't apply `word-break: break-all` globally (common "fix" for overflow). It breaks Latin words mid-word and ignores CJK prohibition rules. `[DOM]`
- [SHOULD] `line-break: strict` for Japanese/Chinese body text controls line-start punctuation (from memory; MDN page not fetched).

### `lang` attributes (unverified, from memory: WCAG 3.1.1 Language of Page A, 3.1.2 Language of Parts AA)
- [MUST] `<html lang>` set to the actual UI language and updated on runtime language switch (SPAs often keep `en`). `[DOM]`
- [MUST] Inline foreign-language content (language picker entries, user names, quotes) gets `lang`. Language-picker options should each carry their own `lang` and be written in their own language ("Deutsch", not "German"). `[DOM]`
- Why it matters: screen reader voice selection, CJK font selection (Han unification: the same code point renders as different glyphs for ja/zh/ko depending on `lang`), hyphenation (`hyphens:auto` needs `lang`), and `:lang()` styling.

### Numbers, dates, units (unverified, from memory, ECMA-402 `Intl`)
- [MUST] Format with `Intl.NumberFormat`, `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, `Intl.PluralRules`, `Intl.ListFormat` (or `Foundation` formatters on Apple). No string-concatenated "1 items", no hard-coded `MM/DD/YYYY`, no `toFixed(2) + "$"`. `[DOM]` grep for date and number template literals.
- [MUST] Plurals use CLDR categories, not `n === 1 ? '' : 's'` (Arabic has 6 forms, Russian 3–4). `[DOM]`
- [SHOULD] Unambiguous dates in UI ("23 Oct 2026") over numeric ones. Week start, 12/24h, and first day follow locale. Matches COGA "Use Familiar Metrics and Units".
- [SHOULD] Inputs accept locale decimal separators ("3,5" in de-DE) and different input formats (COGA "Accept different input formats"). `[MANUAL]`

### Personal names (W3C, https://www.w3.org/International/questions/qa-personal-names)
- [MUST] Prefer a single full-name field. If split, don't label fields "first/last". Ask "What should we call you?" separately for a preferred form of address. `[DOM]`
- [MUST] Don't require a family name (forced entries produce "." or "Mr."). Allow single-letter names, hyphens, apostrophes, and spaces. Preserve case (McNamara, van der Waals). Don't force uppercase. `[DOM]` check `pattern`, `minlength`, `required` on name fields.
- [MUST] UTF-8 end to end. Size fields generously: a 4-character Japanese name is ~12 bytes in UTF-8.
- [SHOULD] Title is optional. Use "Previous name", not "Maiden name". Don't assume family members share a surname. For Japanese, add a pronunciation (furigana) field if you sort by name. Ask for native script and Latin in separate fields if you need both.

**Adds to Apple.** Apple's HIG covers RTL and `Foundation` formatters at a high level (unverified). Its own forms (Contacts) use given/family split fields, which conflicts with W3C's single-field preference. **CONFLICT (soft):** on Apple platforms, given/family fields with `PersonNameComponents` formatting are acceptable *if* family name is optional and order follows locale. Elsewhere use a single field.

**Slop tells.** "First name / Last name", both required, regex `^[A-Za-z]+$`. Fixed-width pill buttons. `toLocaleString()` missing from prices. `lang="en"` on a localized build. `break-all` everywhere. Hard-coded "Mon" as week start.

---

## Synthesis: what Apple misses

1. **Weight-aware contrast and dark mode** (APCA). Apple's ratios pass thin grey text that's unreadable. Run APCA as an extra gate.
2. **Cognitive load as accessibility** (COGA): numeric limits (≤5 main choices, ≤3 contact-form fields), timeout disclosure, fees up front, no memory-based login. Apple has nothing comparable.
3. **Authentication specifics** (WCAG 3.3.8): paste must work, OTP boxes must accept a paste, no transcription CAPTCHAs.
4. **Obscured focus from sticky chrome, plus redundant entry**, both common in web and hybrid apps. Apple doesn't cover them.
5. **Drag alternatives** (2.5.7): Apple encourages gestures but doesn't require a single-pointer non-drag path.
6. **Forced colours / Windows High Contrast**: Apple is silent. Shadow- or gradient-only affordances vanish.
7. **Web reach of Apple's own settings:** Safari doesn't expose `prefers-reduced-transparency`, so Liquid-Glass-style web UI must be legible without it.
8. **Custom-widget semantics** (APG): menu-for-navigation, combobox focus model, tabs keyboard contract. Apple's native controls hide these problems, but web and RN rebuild them.
9. **Cross-platform props that silently no-op** (RN Android-only/iOS-only props), plus the 48dp vs 44pt vs 24px target floors.
10. **Legal layer:** EAA in force since 28 Jun 2025. EN 301 549 V4.1.1 (WCAG 2.2 AA) published 2 Sep 2026, with OJEU citation pending (~30 Nov 2026).
11. **Engagement ethics:** streaks, infinite scroll, autoplay, and red-dot badges as review findings.
12. **i18n depth:** 3× expansion for short labels, CJK line breaking, `lang` for Han glyph selection, CLDR plurals, W3C names guidance.

**Explicit conflicts to encode:** (a) target size floor: platform-specific, strictest across shared code (48dp). (b) menu roles for navigation: APG example vs practitioner rule → use disclosure. (c) translucency: Apple trusts the OS setting, the web can't see it → design legible by default. (d) name fields: W3C single field vs Apple given/family → allowed on Apple only with optional family name.

## Sources not reachable
- https://www.w3.org/WAI/WCAG3/ (403). The WCAG 3 conformance model and contrast method in the March 2026 draft are unverified.
- WCAG 2.2 TR page: only the first 100k chars read. 2.5.7/2.5.8/3.2.6/3.3.7/3.3.8 wording comes from the W3C "What's new in 2.2" page and Understanding docs, not the TR text.
- https://material.angular.dev/cdk/a11y/overview returned only a title. Used the GitHub source markdown instead.
- Directive 2019/882 on EUR-Lex: not fetched. Microenterprise AND/OR wording and the Art. 32 transition are from secondary sources.
- Val Head articles, WCAG 2.5.5 (44px AAA), 3.1.1/3.1.2, ECMA-402, CSS `line-break`, EN 301 549 Clause 11, EAA Annex V accessibility-information requirement: all from memory, marked unverified.
- COGA: only parts of a 470k-char doc read (0–100k, 200–300k). The full "Ensure Controls and Content Do Not Move Unexpectedly" and "Notify Users of Fees" text was not seen.
- Android `getRecommendedTimeoutMillis` and Compose semantics merging: not on the fetched page.

## Open questions for skill design
1. Should APCA be a **blocking** check or advisory? Proposal: advisory, but blocking for dark mode body text below Lc 60.
2. Should the skill run WCAG AAA items (2.3.3, 2.4.12, 2.4.13) as MUST under "strictest wins", or cap at AA for MUST and put AAA under SHOULD?
3. Cross-platform target floor: always 48 for shared RN/Flutter code, or per-platform rendering checks?
4. EAA applicability: should the skill ask "sold in the EU? sector?" up front, and switch the legal tier to EN 301 549 V4.1.1 after OJEU citation (~Nov/Dec 2026)?
5. Ethics checks (streaks, infinite scroll) are a values judgement. Should they be a separate "humane" lens the user can toggle, so utility apps aren't over-flagged?
6. Automation budget: which `[DOM]` checks get a Playwright script (target-size circle test, sticky-obscures-focus, forced-colors screenshot, paste-blocking) vs reviewer judgement?
7. Pseudo-localisation: should the skill generate a 3× pseudo-locale string set automatically for screenshot review?
