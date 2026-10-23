Covers WCAG 2.2 new success criteria, WCAG 3 status, APCA, COGA, EAA and EN 301 549, ARIA APG, Android/React Native/Angular accessibility, motion and forced colours, ethical design, and localization beyond RTL.
Loaded by passes: accessibility (primary), content, platform fit, interaction and motion.
Snapshot: 2026-10-23

Framing: Apple HIG is the base. Each check is labelled `adds to Apple` (stricter or more specific), `Apple silent` (Apple has no rule), or `CONFLICT: ...; resolution: ...`. In accessibility the strictest source wins. Elsewhere Apple wins unless a conflict says otherwise. Test tags: `(DOM)` automatable against the rendered DOM or accessibility tree, `(screenshot)` judgeable from a screenshot, `(manual)` needs a human or a scripted interaction (keyboard, assistive tech, settings toggles). `(unverified)` marks items recalled from memory or seen only in snippets; they carry lower weight and never make a Blocker on their own. Apple numbers (44×44 pt etc.) come from our earlier HIG digest and were not re-fetched. Slop tells: see references/slop-catalog.md.

## WCAG 2.2: newer success criteria
- **Why it matters**: WCAG 2.2 AA is the reference for EN 301 549 V4.1.1 (see the legal topic), so it is what EU law will measure against. Source: https://www.w3.org/TR/WCAG22/ (Rec. 5 Oct 2023; the TR page now shows an updated edition dated 12 December 2024). Most new criteria target failures typical of modern app UIs: sticky chrome, drag-only interactions, tiny icon buttons, OTP boxes. 4.1.1 Parsing is obsolete and removed from WCAG 2.2.
- **Checks**:
  - 2.4.11 Focus Not Obscured (Minimum), AA. The focused component "is not entirely hidden due to author-created content." The AAA version (2.4.12) requires that "no part of the component is hidden by author-created content."
    - [MUST] Tab through every page with sticky header, sticky footer, cookie banner, chat bubble and toast all present. No focused element may be fully covered. (manual) Playwright can script it: after each Tab, compare `document.activeElement.getBoundingClientRect()` with every `position:fixed|sticky` element's rect. `Apple silent`
    - [MUST] Cookie banner: per the Understanding doc, a sticky cookie banner "will fail this success criterion if it entirely obscures a component receiving focus." Fix by making it modal or by using scroll padding. (manual) `Apple silent`
    - [SHOULD] Use `scroll-padding-top/bottom` equal to the sticky bar height (technique C43). (DOM) A sticky element exists and `html` has no scroll-padding. `Apple silent`
    - [SHOULD] Non-modal overlays that don't take focus and don't close on focus leaving are "at risk of failing". (manual) `Apple silent`
    - [CONSIDER] Hold to 2.4.12 (no part hidden) for primary flows. For user-movable panels "only the initial positions … are considered". (manual) `Apple silent`
  - 2.4.13 Focus Appearance, AAA (context for 2.4.11). The indicator area must be "at least as large as the area of a 2 CSS pixel thick perimeter of the unfocused component" and must have "a contrast ratio of at least 3:1 between the same pixels in the focused and unfocused states."
    - [SHOULD] Custom focus rings: at least 2px perimeter and at least 3:1 change. (screenshot) Screenshot each focused/unfocused pair and diff the pixels. `adds to Apple`
    - [MUST] `outline: none` with no replacement fails 2.4.7. (DOM) `adds to Apple`
  - 2.5.7 Dragging Movements, AA. "All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging," unless dragging is essential.
    - [MUST] Every drag-to-reorder list, kanban, slider, range picker, map pan and swipe-to-delete needs a tap/click alternative, such as up/down buttons, a "Move to…" menu, tapping a slider track, or +/- steppers. (manual) Keyboard support alone does not satisfy this criterion; it is about pointer users who can't drag. `adds to Apple` (Apple encourages gestures but doesn't require a single-pointer non-drag path.)
    - [MUST] Native `<input type=range>` passes because the user agent supplies it. A custom div slider has to supply its own alternative. (DOM) An element with `role=slider` that isn't a native input: check for a click-on-track handler or steppers. `adds to Apple`
  - 2.5.8 Target Size (Minimum), AA. "The size of the target for pointer inputs is at least 24 by 24 CSS pixels". Exceptions: Spacing, Equivalent, Inline, User agent control, Essential. Spacing test: draw a 24px-diameter circle centred on the bounding box of each undersized target. It fails if a circle "intersect[s] another target or the circle for another undersized target." Overlapping areas don't count toward a target's size.
    - [MUST] Compute `getBoundingClientRect()` for every interactive element, flag any under 24×24 CSS px, then run the circle test. Also test targets that appear after interaction (menus, modals, banners). (DOM) Measured by measure.js for the 24px size check. `adds to Apple`
    - [SHOULD] Primary actions on web aim for 44px (the AAA 2.5.5 figure, from memory: 44×44; unverified). (DOM) Measured by measure.js. `Apple silent` (on web Apple has no rule; 24px is the legal floor)
    - [MUST] CONFLICT: target size across platforms. Apple's iOS minimum is 44×44 pt, Android/Material is 48dp, and WCAG on web is 24px; resolution: each platform keeps its own floor (44 pt on iOS, 48dp on Android, 24px minimum with a 44px goal on web), and shared cross-platform code (React Native, Flutter) uses 48 as the single floor. Apple wins on iOS visual conventions; the size floor follows the strictest rule.
    - [MUST] CONFLICT: Apple's macOS control sizes are close to the 24px floor, while dense toolbars with 16-20px icon targets can fail 2.5.8 when built in web tech (Electron/Catalyst web views); resolution: strictest wins, so apply 24px plus the spacing test to any web-rendered macOS UI. (DOM)
  - 3.2.6 Consistent Help, A. If help (human contact details, contact mechanism, self-help, chatbot) repeats across pages, "they occur in the same relative order to other page content".
    - [MUST] The help link or chat entry sits in the same relative slot on every screen of the flow, not in the footer on one page and the header on another. (screenshot) Across at least 3 screens, or (DOM) same DOM order relative to landmarks. It doesn't require help to exist; COGA does. `Apple silent`
  - 3.3.7 Redundant Entry, A. Information entered earlier in the same process must be "auto-populated or available for the user to select". Exceptions: essential, security, or no longer valid.
    - [MUST] Checkout has a "Billing same as shipping" checkbox or prefill. Multi-step signup doesn't re-ask for email. (manual) `Apple silent`
    - [MUST] "Confirm email" and "confirm password" fields count as re-entry. Re-entering a password is allowed under the security exception, but confirm-email has no such cover. (manual) Inference from the SC text; verify against the Understanding doc before making it a hard fail. `Apple silent`
    - [SHOULD] Correct `autocomplete` tokens so browsers fill across sessions too (1.3.5). (DOM) `Apple silent`
  - 3.3.8 Accessible Authentication (Minimum), AA. A cognitive function test "is not required for any step in an authentication process" unless there is an alternative, a mechanism that assists, object recognition, or personal content. At AAA (3.3.9) object recognition and personal content no longer qualify. The Understanding doc: transcription ("typing in characters") is a cognitive function test, and "Copy and paste can be relied on to avoid transcription."
    - [MUST] No `onpaste` preventDefault and no `autocomplete="off"` on password, OTP or username fields. Blocking paste fails "unless another method is available." Scripts that block password-manager autofill also fail. (DOM) `adds to Apple` (Apple promotes passkeys and Password AutoFill; WCAG makes paste-blocking and non-pastable OTP a hard fail, which Apple doesn't spell out.)
    - [MUST] OTP split into 6 boxes must accept a full paste of the code and support `autocomplete="one-time-code"`. The Understanding doc's Figure 3 calls out boxes that reject paste. (manual) Paste "123456" into box 1. `adds to Apple`
    - [MUST] Text CAPTCHA or math CAPTCHA with no non-cognitive alternative fails. An audio CAPTCHA that requires transcription doesn't count as the alternative. Image "pick the cars" passes AA but fails AAA. (manual) `adds to Apple`
    - [SHOULD] Offer passkeys/WebAuthn, email magic link (technique G218), or OS biometrics. These are not cognitive function tests. (manual) `adds to Apple`

## WCAG 3 status, October 2026
- **Why it matters**: People cite WCAG 3 as if it were settled. It isn't. Sources: https://www.w3.org/WAI/WCAG3/ (returned 403), news item https://www.w3.org/WAI/news/2026-03-03/wcag3.
- **Checks**:
  - Status as of 2026-10-23: the latest Working Draft is 3 March 2026 (W3C news). It is still a Working Draft, not a Candidate Recommendation.
  - Timeline: third-party estimates (AbilityNet) put CR around Q4 2027 and Rec "not earlier than 2028". These are not W3C commitments. The W3C says WCAG 2 won't be deprecated for years after WCAG 3 ships (via search summary; primary page unreachable) (unverified).
  - Conformance model and contrast algorithm in the 2026 draft: not verified. Earlier drafts proposed Bronze/Silver/Gold tiers and an APCA-like contrast method (unverified, from memory). Don't encode WCAG 3 as checks.
  - [CONSIDER] Use WCAG 3 only as directional input. Never cite it as a pass/fail authority. (manual) `Apple silent`

## Contrast: APCA
- **Why it matters**: WCAG 2's ratio, per the APCA docs, "overstates contrast for dark colors, so 4.5:1 can be functionally unreadable when one color is near black". That makes it a weak guide for dark mode. APCA's Lc is perceptually uniform and depends on polarity: text on background is not symmetric. Source: https://git.apcacontrast.com/documentation/APCA_in_a_Nutshell.html (fetched 2026).
- **Lc thresholds** (Bronze/Silver; sizes at Helvetica/Arial reference weights; px = CSS px):

  | Lc | Use |
  |---|---|
  | 90 | Preferred for body text at 18px/300 or 14px/400. Also non-body text at 12px/400+. Suggested max for very large bold (>36px bold) and big colour areas |
  | 75 | Minimum for body text at 24px/300, 18px/400, 16px/500, 14px/700. Also non-body text at 15px/400+ |
  | 60 | Minimum for non-body content text at 48px/200, 36px/300, 24px/400, 21px/500, 18px/600, 16px/700. Add Lc 15 to use these as body text |
  | 45 | Headlines: 36px normal or 24px bold. Fine-detail pictograms, outline icons |
  | 30 | Absolute minimum for placeholder, disabled, "spot readable" text, and solid icons (at least ~5.5px) |
  | 15 | Absolute minimum for dividers and thick focus outlines (at least 5px solid). Below 15, treat as invisible |
  | +15 | AAA-equivalent: add 15 to each |
- **Checks**:
  - [MUST] Legal compliance still uses WCAG 2 ratios (4.5:1 body, 3:1 large and non-text). APCA is not a substitute for compliance. Contrast ratios are measured by measure.js. (DOM) `adds to Apple`
  - [SHOULD] Run APCA in addition for dark mode, thin weights (300 and below) and small text, and fail anything that passes WCAG 2 but sits below the APCA row for its size and weight. (screenshot) or (DOM) using computed colour plus font-size and weight. `adds to Apple` (Apple specifies ratios, Dynamic Type and Increase Contrast, but gives no weight-aware contrast; APCA covers thin SF weights.)
  - [SHOULD] Light grey text at 300 weight on white ("elegant" UI) can pass 4.5:1 and still fall below Lc 75 for body text. Flag it. (DOM) `adds to Apple`
  - [CONSIDER] Use the Lc 90 maximum for large bold: pure white on pure black at headline size is over-contrasted and causes halation in dark mode. (screenshot) `adds to Apple`
  - No conflict with Apple: run both and keep the stricter result.

## Cognitive accessibility (COGA)
- **Why it matters**: WCAG covers cognition thinly. COGA's 8 objectives turn into concrete design checks, and slop is usually cognitively noisy. Source: https://www.w3.org/TR/coga-usable/ (W3C WG Note 29 Apr 2021). People with impaired working memory "may only be able to hold one to three items in their memory at the same time." Only parts of the 470k-char doc were read (0-100k, 200-300k); the full "Ensure Controls and Content Do Not Move Unexpectedly" and "Notify Users of Fees" text was not seen.
- **Checks** (all `Apple silent`: Apple covers clarity in general terms but sets no numbers on choices per screen, contact-form fields, timeout disclosure or fee disclosure, and treats cognitive load as no accessibility requirement; no conflicts):
  - [MUST] Critical features findable: the primary task is reachable from home or root in one obvious step (4.3.1). (screenshot) `Apple silent`
  - [SHOULD] "five or less main choices" per screen (4.6.3, Avoid Too Much Content). (screenshot) or (DOM) count top-level actions or nav items in the main region. `Apple silent`
  - [SHOULD] Content per screen limited to "a few short bullet points and one or two images related to the main topic". No long dense paragraphs. (screenshot) `Apple silent`
  - [MUST] Human help is easy to find on every page and every step. Contact form required fields "no more than 3". Voice menus' first option is "to wait for a person who can help you press 0". (DOM) Count required fields on the contact form. `Apple silent`
  - [MUST] Login without memory: users must not need to "memorize character strings", do calculations, copy content, solve puzzles, reproduce gestures, or read distorted characters. Don't block paste. Avoid making users copy 2FA codes. Stricter than WCAG 3.3.8, which allows object recognition. (manual) `Apple silent`
  - [MUST] Avoid data loss and timeouts: autosave. If a timeout is unavoidable, say at the start how long and whether data will be lost. Ask for card details at the last step. (manual) `Apple silent`
  - [SHOULD] Short critical paths: minimum steps, with optional steps separated so users don't have to pass through them (for example "Add a profile photo" isn't a required step of onboarding). (manual) `Apple silent`
  - [SHOULD] Let users go back: clickable breadcrumbs or step indicator, and going back must not wipe data. Don't show a review summary that can't be edited without data loss. (manual) `Apple silent`
  - [MUST] Clear visible labels, visible and adjacent to the control. Don't rely only on ARIA or `title` for names (COGA says so explicitly). Placeholder-as-label fails. Instructions go before or next to the field. (DOM) Input without visible `<label>` text. `Apple silent`
  - [SHOULD] Limit interruptions: users control reminders, popups and content changes unless they started the change or it's an emergency. Ads, motion and sound get a pause control. (manual) `Apple silent`
  - [SHOULD] Fees up front: state costs and consequences at the start of a task. Name the "features that may affect the user's finances". (manual) `Apple silent`
  - [SHOULD] Clear words and literal language, no double negatives (for example "Don't not notify me"), no nested clauses, a simple tense. Explain implied content. Provide alternatives for numerical concepts. (DOM) Text scan for double negatives and idioms. `Apple silent`
  - [SHOULD] Icons that help: familiar icons, with a text label for anything non-universal. (screenshot) `Apple silent`
  - [SHOULD] Familiar hierarchy, for example search in the conventional location. The doc's web example is search in the "top right hand corner". Link convention example: "underlined and blue for unvisited; purple for visited". (screenshot) `Apple silent`
  - [CONSIDER] Support simplification and personalisation (objective 8): a "simple mode", hiding non-essential features, and support for user stylesheets and extensions. (manual) `Apple silent`

## Legal layer: EAA and EN 301 549
- **Why it matters**: The European Accessibility Act (Directive (EU) 2019/882) is enforceable law with market surveillance. Status as of 2026-10-23. Sources: https://commission.europa.eu/…/european-accessibility-act_en; Deque on V4.1.1, 2026. Directive 2019/882 on EUR-Lex was not fetched.
- **Facts**:
  - Requirements apply from 28 June 2025 (search-confirmed across sources; the Commission page gives only the transposition deadline, June 2022).
  - Covered (Commission page): computers and OSes, ATMs, smartphones, telephony, passenger transport (air, bus, rail, waterborne), banking services, e-books, e-commerce. Consumer apps in those sectors are in scope.
  - Microenterprise exemption: services only, not products. Threshold reported as fewer than 10 employees and no more than EUR 2M turnover or balance sheet. Sources differ on the AND/OR wording. Verify against Art. 3/4 of the Directive (unverified).
  - Transition: service contracts concluded before 28 June 2025 can continue until 28 June 2030 (secondary source; verify Art. 32) (unverified).
  - EN 301 549 V4.1.1 was published 2 September 2026. It moves from WCAG 2.1 to WCAG 2.2 AA (adds the six A/AA SCs in the WCAG 2.2 topic), substantially reworks User Preferences requirements, revises real-time text and communication into a "Total Conversation" model (voice, RTT, video), and adds Annexes mapping to the EAA. OJEU citation (which gives presumption of conformity) is expected around 30 Nov 2026 (Deque), with another source saying 16 Dec 2026. Until then V3.2.1 (WCAG 2.1 AA) is the presumption-of-conformity version.
- **Checks**:
  - [MUST] For any app sold in the EU in a covered sector, review against WCAG 2.2 AA now. V4.1.1 makes it the bar, and it is a superset of 2.1. (manual) `adds to Apple`
  - [MUST] Native apps are covered too. EN 301 549 Clause 11 applies WCAG-derived criteria to non-web software (unverified, from memory). Native iOS/macOS apps aren't exempt because "WCAG is for web." (manual) `adds to Apple`
  - [SHOULD] Calling, messaging, video or support-chat features: the real-time text requirements in Clause 6 go beyond WCAG. Deque: "testing only to WCAG 2.2 AA won't be enough" there. (manual) `Apple silent`
  - [SHOULD] "User Preferences" (V4 reworked): honour platform settings such as text size, contrast and reduced motion, and don't override them. On Apple this maps to Dynamic Type, Increase Contrast and Reduce Motion. (manual) `adds to Apple` (Apple's Accessibility Nutrition Labels are self-declared; where a label claims support such as "Larger Text", the EN 301 549 user-preference clauses make that a testable obligation.)
  - [SHOULD] EAA also requires an accessibility statement or information about the service (Annex V) (unverified, from memory). Check for one in the app or web footer. (DOM) `Apple silent`

## ARIA Authoring Practices (custom widgets)
- **Why it matters**: Custom components are where AI-generated UI breaks accessibility. APG: "Incorrect ARIA misrepresents visual experiences, with potentially devastating effects." A role "is a promise" that the author "has also incorporated JavaScript" providing the expected keyboard behaviour. "ARIA roles do not cause browsers to provide keyboard behaviors or styling." Source: https://www.w3.org/WAI/ARIA/apg/ (fetched 2026).
- **Checks**:
  - [MUST] Any `role=` on a non-native element: verify that the role's full keyboard contract is implemented. (DOM) lists the roles; (manual) tests keys. `Apple silent`
  - [MUST] Prefer native: `<button>`, `<dialog>`, `<details>/<summary>`, `<select>`, `<input type=range>`. (DOM) `div[role=button]`, `div[onclick]` without a role or tabindex. `Apple silent`
  - [MUST] Forced-colour rendering follows native semantics, not ARIA. MDN: adding `role="button"` to a `div` doesn't change its forced colour (see the forced colours topic). One more argument for native elements. (manual) `Apple silent`
  - Combobox:
    - [MUST] `role=combobox` on the input, `aria-expanded` true/false, `aria-controls` pointing to the popup, and `aria-activedescendant` pointing to the highlighted option. DOM focus stays on the input for listbox/grid/tree popups. `aria-autocomplete` is none/list/both. The selected option gets `aria-selected=true`. (DOM) `Apple silent`
    - [MUST] Keys: Down Arrow opens or moves into the popup. Escape closes it (and optionally clears the input). Enter accepts. Alt+Down/Alt+Up are optional. The popup and its toggle button stay out of the Tab sequence. (manual) `Apple silent`
    - [SHOULD] The ARIA 1.0 `aria-owns` pattern is legacy; `aria-controls` is current. (DOM) Flag `aria-owns` on a combobox. `Apple silent`
  - Modal dialog:
    - [MUST] On open, focus moves inside the dialog: "Generally … the first focusable element". For long content, focus a static heading with `tabindex=-1`. Tab and Shift+Tab wrap within the dialog. Escape closes it. On close, "focus returns to the element that invoked the dialog". `aria-modal=true`. The dialog is named by `aria-labelledby` pointing to the visible title, or by `aria-label`. (manual) `Apple silent`
    - [SHOULD] Set `aria-modal` only when outside content really is inert and visually obscured. (DOM) `Apple silent`
    - [SHOULD] Prefer native `<dialog>` with `showModal()`, which provides inertness and Escape handling (from memory; the APG page doesn't discuss it) (unverified). (DOM) `Apple silent`
  - Menus for navigation:
    - APG's menubar keyboard contract: arrows move between items, Tab leaves the menu and closes it, Escape closes it and returns focus, Home/End, and typeahead is optional.
    - [MUST] CONFLICT: APG includes a navigation menubar example, while practitioner consensus (Adrian Roselli, https://adrianroselli.com/2017/10/dont-use-aria-menu-roles-for-site-nav.html, 2017) says menu roles are for "replicat[ing] an application menu" and "A properly-coded web page navigation menu needs no ARIA."; resolution: strictest wins, so site navigation uses `<nav>` with lists of `<a href>` and submenus use the disclosure pattern (a `<button aria-expanded>` toggling a list of links), not `role=menu`. (DOM) `nav [role=menu|menubar|menuitem]` is flagged.
    - [SHOULD] `role=menu` only for app-style command menus (for example a "…" actions menu), and then with the full arrow-key contract. (DOM) `Apple silent`
    - [SHOULD] On macOS, real app menus belong in the system menu bar (HIG). A web-rendered fake "menubar" inside a Mac app breaks both Apple conventions and APG. (screenshot) `adds to Apple`
  - Tabs:
    - [MUST] `tablist` > `tab` (`aria-selected`, `aria-controls`) > `tabpanel`. Arrow keys move between tabs and wrap. Tab moves into the panel. When focus enters the tablist it lands on the active tab. A panel without focusable content gets `tabindex=0`. (DOM) and (manual) `Apple silent`
    - [SHOULD] Automatic activation on focus only if the panel shows "without noticeable delay". Use manual activation (Enter/Space) for panels that fetch data. (manual) `Apple silent`
    - [SHOULD] Segmented controls that are really filters should be radio groups or toggle buttons, not tabs. (DOM) `Apple silent`
  - Disclosure (accordion, show more):
    - [MUST] Native `<details>/<summary>`, or a `<button aria-expanded>` controlling the region. The heading wraps the button for accordions (from memory) (unverified). (DOM) `Apple silent`

## Platform accessibility beyond Apple
- **Why it matters**: Apple says nothing about cross-platform frameworks. These are the places where an iOS-only accessibility review misses Android regressions.
- **Checks**:
  - Android / Material (https://developer.android.com/guide/topics/ui/accessibility/apps, 2026):
    - [MUST] Touch target 48dp × 48dp ("Larger is even better"). Material `Button`, `IconButton` and `ListItem` enforce it; custom composables need `sizeIn(minWidth=48.dp, minHeight=48.dp)`. (DOM) equivalent in a Compose test or Accessibility Scanner. `adds to Apple` (see the target-size resolution in the WCAG 2.2 topic: 48 for shared cross-platform code)
    - Contrast: 4.5:1 for text under 18sp (or bold text under 14sp), 3:1 otherwise. `adds to Apple`
    - [MUST] `contentDescription` states purpose, not appearance. No role words ("Submit", not "Submit button"). Unique per list item. Decorative icons get `null`. `Text` doesn't need one. (DOM) `Apple silent`
    - [SHOULD] Test with Accessibility Scanner, Lint and Compose tests. (manual) `Apple silent`
  - React Native (https://reactnative.dev/docs/accessibility, 2026). Pitfalls a reviewer can grep for:
    - [MUST] `accessible={true}` groups children into one element (iOS `isAccessibilityElement`, Android `focusable`). Nested accessible elements are not reachable on VoiceOver. Grep for `accessible` on a parent whose children contain buttons, because that makes the inner buttons unreachable. (DOM) static grep. `Apple silent`
    - [MUST] Platform-only props silently do nothing on the other OS. (DOM) static grep. `Apple silent`
      - `importantForAccessibility` (including `no-hide-descendants`): Android only.
      - `accessibilityLiveRegion` / `aria-live`: Android only. iOS needs `AccessibilityInfo.announceForAccessibility` (from memory) (unverified).
      - `accessibilityViewIsModal` / `aria-modal`: iOS only, and it must be on the view whose siblings should be ignored. Set on a child, it doesn't hide them.
      - `accessibilityElementsHidden`: iOS only.
      - Actions: `magicTap` and `escape` are iOS only. `longpress`, `expand` and `collapse` are Android only.
      - Check: every modal hides background content on both platforms, and every live update is announced on both.
    - [SHOULD] `role` takes precedence over `accessibilityRole`, and the value names differ (`heading` vs `header`, `img` vs `image`). Mixed usage is a smell. (DOM) `Apple silent`
    - [MUST] Custom actions need both `accessibilityActions` and `onAccessibilityAction`. (DOM) `Apple silent`
    - [SHOULD] Small icon `Pressable`s: enlarge with `hitSlop` (not covered on the a11y page; check the Pressable docs) (unverified). (DOM) `Apple silent`
  - Angular CDK a11y (https://github.com/angular/components/blob/main/src/cdk/a11y/a11y.md):
    - `ListKeyManager` / `FocusKeyManager` / `ActiveDescendantKeyManager` handle menu and listbox keyboard behaviour. `TreeKeyManager`: "Only the HTML node corresponding to the active item should have a `tabindex` set to `0`".
    - `cdkTrapFocus` "will not prevent focus from moving out of the trapped region due to mouse interaction". `cdkFocusInitial` needs `cdkTrapFocusAutoCapture`, otherwise nothing happens.
    - `FocusMonitor` reports the focus origin (mouse, keyboard, touch, program). Use it to show focus rings on keyboard focus only, and require `stopMonitoring` on destroy.
    - `LiveAnnouncer` handles aria-live. `cdk-visually-hidden` (or the `a11y-visually-hidden` mixin) gives sr-only text.
    - [SHOULD] In Angular code, flag hand-rolled keyboard managers or focus traps when a CDK primitive exists (also a reuse check). (DOM) `Apple silent`

## Motion, forced colours, contrast and transparency preferences
- **Why it matters**: Motion can cause dizziness, nausea and migraines, and in some cases bed rest. Shadow- and gradient-only affordances vanish in forced colours. Safari does not expose reduced transparency to the web.
- **Checks**:
  - 2.3.3 Animation from Interactions, AAA (https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html). "Motion animation triggered by interaction can be disabled, unless the animation is essential". Motion includes moving into place and changing size while appearing. Parallax is a named example. Colour and opacity changes are excluded. An erratum stops excluding blur, so blur transitions may count.
    - [MUST] (strictest wins, though AAA) `@media (prefers-reduced-motion: reduce)` removes parallax, scroll-linked transforms, zoom/scale page transitions and auto-scrolling carousels (C39/SCR40). (DOM) CSS contains animations and transforms but no `prefers-reduced-motion` block; the reduced-motion rule is measured by measure.js. (manual) Toggle Reduce Motion and walk the app. `adds to Apple` (Apple honours Reduce Motion; WCAG adds blur to the list.)
    - [SHOULD] Under reduced motion, replace motion with a crossfade instead of deleting the transition, so the state change is still communicated. (manual) `adds to Apple`
    - [SHOULD] Val Head (*Designing Interface Animation*, 2016; A List Apart "Designing Safer Web Animation for Motion Sensitivity", 2015) (unverified, from memory): the riskiest motions are large-area movement, scaling or zooming across the viewport, spinning, parallax and multi-speed movement, and motion that doesn't match the user's scroll direction. Small, slow, user-initiated motion is lower risk. (manual) `adds to Apple` (a risk ranking Apple doesn't have)
  - Forced colours / Windows High Contrast (https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors). Overridden: `color`, `background-color`, `border-color`, `outline-color`, `text-decoration-color`, and SVG `fill`/`stroke`. `box-shadow` and `text-shadow` become none. Non-`url()` `background-image` becomes none, so gradients disappear. `color-scheme` is forced to `light dark`.
    - [MUST] Buttons, cards and inputs defined only by shadow or background colour lose their edges. They need a real `border` (it can be `transparent` in normal mode, since forced mode recolours it). The same goes for focus rings built from `box-shadow`; use `outline: 2px solid transparent` as a backup. (manual) Chrome DevTools, Rendering, emulate `forced-colors: active`, then (screenshot). `Apple silent`
    - [MUST] Icons as CSS `background-image` gradients or masks vanish. Inline SVG should use `currentColor`. (DOM) `Apple silent`
    - [SHOULD] Use system colours (`CanvasText`, `LinkText`, `ButtonText`) in `@media (forced-colors: active)` fixes. Don't build a separate theme. Use `forced-color-adjust: none` sparingly (it "removes the contrast protections"). (manual) `Apple silent`
    - Safari supports `forced-colors` from 16, but macOS has no Windows-style forced palette (from memory) (unverified). Any web app with Windows users needs this check.
  - Browser status (MDN browser-compat-data, fetched 2026-10; status as of 2026-10-23):

    | Feature | Chrome/Edge | Firefox | Safari / iOS |
    |---|---|---|---|
    | `prefers-reduced-motion` | 74 | 63 | 10.1 |
    | `prefers-contrast` | 96 | 101 | 14.1 |
    | `forced-colors` | 89 / 79 | 89 | 16 |
    | `prefers-reduced-transparency` | 118 | 113 behind flag `layout.css.prefers-reduced-transparency.enabled` | Not supported |
    | `inverted-colors` | no | 114 behind flag | 9.1 / iOS 10 |
    - MDN: `prefers-reduced-transparency` is "experimental", not Baseline.
  - [SHOULD] `@media (prefers-contrast: more)`: thicken borders, drop translucency, raise secondary-text contrast. Maps to Apple's Increase Contrast on Safari. (manual) `adds to Apple`
  - [MUST] CONFLICT: the HIG (Liquid Glass era) leans on translucency and trusts the OS Reduce Transparency setting to fix it, but that setting doesn't reach web content in Safari/WebKit, which doesn't expose `prefers-reduced-transparency`; resolution: strictest wins, so glass and blur surfaces (`backdrop-filter`) on web must meet contrast by default, legible with full transparency, without relying on the media query. (screenshot) Check text over the busiest background.

## Ethical and humane design
- **Why it matters**: Engagement mechanics are design choices a review can name. Apple covers notification etiquette but is silent on streaks and feeds.
- **Checks**:
  - Calm Technology, Amber Case (https://calmtech.com/; Calm Tech Institute "Launched May 2024", runs "Calm Tech Certified®"). The 8 principles (verbatim): (1) "Technology should require the smallest possible amount of attention"; (2) "Technology should inform and create calm"; (3) "Technology should make use of the periphery"; (4) "Technology should amplify the best of technology and the best of humanity"; (5) "Technology can communicate, but doesn't need to speak"; (6) "Technology should work even when it fails"; (7) "The right amount of technology is the minimum needed to solve the problem"; (8) "Technology should respect social norms".
    - [SHOULD] Status uses the periphery (badge, subtle indicator, haptic) before a modal or push notification (P3, P5). (screenshot) `Apple silent`
    - [SHOULD] Degraded mode: offline or error states keep core function and cached content, not a blank screen (P6). (manual) Airplane mode. `Apple silent`
    - [SHOULD] Each notification type maps to a user-meaningful event. No "We miss you" re-engagement pushes (P1, P2). (manual) `Apple silent`
    - [CONSIDER] Feature count audit (P7): flag features that exist only to raise engagement. (manual) `Apple silent`
  - Center for Humane Technology (https://www.humanetech.com/youth/persuasive-technology). Named persuasive techniques: red-dot notifications ("we instinctively respond with urgency to red"), social cues and tags, like monitoring, infinite scroll, autoplay, engagement-optimised feeds, streaks, loot boxes, ads disguised as results. Framing: tools serve your goals, persuasive tech serves the company's.
    - [MUST] No autoplay of next content without an opt-in setting. (manual) `Apple silent`
    - [SHOULD] Infinite feeds have a natural stopping point ("You're caught up") or pagination. (screenshot) `Apple silent`
    - [SHOULD] Red badge counts only for items needing the user's action, not for promotions. (screenshot) `Apple silent`
    - [SHOULD] Streak mechanics have forgiveness (freeze, grace) and an off switch. (manual) `Apple silent`
    - [MUST] Sponsored items are labelled and visually distinct from organic results. (screenshot) `Apple silent`
  - Notification ethics (synthesis; our inference from Calm Tech, CHT and COGA "Limit Interruptions"):
    - [MUST] Don't ask for notification permission on first launch. Ask in context, after the user takes an action that implies they want it. (manual) `adds to Apple` (Apple's HIG also advises asking in context; here it is a must.)
    - [MUST] Per-category notification controls inside the app, with marketing pushes off by default. (manual) `adds to Apple`
    - [SHOULD] Time-sensitive or interruption level is reserved for events the user would agree are urgent (maps to Apple Focus interruption levels). (manual) `adds to Apple`

## Localization and internationalization beyond RTL
- **Why it matters**: Layouts that fit English break in other languages. Expansion, line breaking, `lang`, plural rules and names are the usual failures.
- **Checks**:
  - Text expansion (W3C i18n, https://www.w3.org/International/articles/article-text-size, data from IBM's "Guidelines to design global solutions"):

    | English source chars | Avg expansion |
    |---|---|
    | Up to 10 | 200-300% |
    | 11-20 | 180-200% |
    | 21-30 | 160-180% |
    | 31-50 | 140-160% |
    | 51-70 | 151-170% (sic, as published) |
    | Over 70 | 130% |

    Per-language example, "views" (EN=1): Korean 0.8, Chinese 1.2, Portuguese 2.6, French 2.6, German 2.8, Italian 3. "Each Chinese and Korean character is counted as two English characters in width." Non-Latin scripts often have "much taller characters" and need more line spacing.
    - [MUST] Short labels (buttons, tabs, badges of 10 chars or fewer) must handle 3× width. No fixed-width buttons, no `white-space:nowrap` with `overflow:hidden` on labels. (manual) Pseudo-localise (for example "[Ŝéţţîñĝš ~~~~~~]") then (screenshot). `adds to Apple`
    - [MUST] No fixed `height` on text containers. CJK, Thai and Devanagari need taller line boxes. (DOM) `adds to Apple`
    - [SHOULD] Tab bars and segmented controls have a defined behaviour when labels overflow (wrap, scroll, or shrink to icon). Never truncate silently. (manual) `adds to Apple`
  - CJK line breaking (W3C clreq, Group Note Draft 7 Oct 2026; MDN word-break):
    - Ellipses and two-em dashes must not split across lines. Recommended code points are U+2E3A and paired U+2026. Punctuation position differs between Mainland China and TW/HK.
    - [SHOULD] Korean: `word-break: keep-all` stops mid-word breaks in Hangul. `word-break: auto-phrase` (experimental) avoids breaking natural phrases. (DOM) For `lang=ko` content. `Apple silent`
    - [SHOULD] Don't apply `word-break: break-all` globally (a common "fix" for overflow). It breaks Latin words mid-word and ignores CJK prohibition rules. (DOM) `Apple silent`
    - [SHOULD] `line-break: strict` for Japanese/Chinese body text controls line-start punctuation (from memory; MDN page not fetched) (unverified). (DOM) `Apple silent`
  - `lang` attributes (from memory: WCAG 3.1.1 Language of Page A, 3.1.2 Language of Parts AA) (unverified):
    - [MUST] `<html lang>` set to the actual UI language and updated on runtime language switch (SPAs often keep `en`). (DOM) `Apple silent`
    - [MUST] Inline foreign-language content (language picker entries, user names, quotes) gets `lang`. Language-picker options should each carry their own `lang` and be written in their own language ("Deutsch", not "German"). (DOM) `Apple silent`
    - Why: screen reader voice selection, CJK font selection (Han unification: the same code point renders as different glyphs for ja/zh/ko depending on `lang`), hyphenation (`hyphens:auto` needs `lang`), and `:lang()` styling.
  - Numbers, dates, units (from memory, ECMA-402 `Intl`) (unverified):
    - [MUST] Format with `Intl.NumberFormat`, `Intl.DateTimeFormat`, `Intl.RelativeTimeFormat`, `Intl.PluralRules`, `Intl.ListFormat` (or `Foundation` formatters on Apple). No string-concatenated "1 items", no hard-coded `MM/DD/YYYY`, no `toFixed(2) + "$"`. (DOM) Grep for date and number template literals. `adds to Apple`
    - [MUST] Plurals use CLDR categories, not `n === 1 ? '' : 's'` (Arabic has 6 forms, Russian 3-4). (DOM) `adds to Apple`
    - [SHOULD] Unambiguous dates in UI ("23 Oct 2026") over numeric ones. Week start, 12/24h and first day follow locale. Matches COGA "Use Familiar Metrics and Units". (manual) `adds to Apple`
    - [SHOULD] Inputs accept locale decimal separators ("3,5" in de-DE) and different input formats (COGA "Accept different input formats"). (manual) `adds to Apple`
  - Personal names (W3C, https://www.w3.org/International/questions/qa-personal-names):
    - [MUST] CONFLICT: W3C prefers a single full-name field, while Apple's own forms (Contacts) use given/family split fields with `PersonNameComponents` formatting (Apple's treatment is unverified); resolution: default to a single full-name field; on Apple platforms split fields are allowed only when the family name is optional and order follows locale. If split, don't label fields "first/last". Ask "What should we call you?" separately for a preferred form of address. (DOM)
    - [MUST] Don't require a family name (forced entries produce "." or "Mr."). Allow single-letter names, hyphens, apostrophes and spaces. Preserve case (McNamara, van der Waals). Don't force uppercase. (DOM) Check `pattern`, `minlength` and `required` on name fields. `Apple silent`
    - [MUST] UTF-8 end to end. Size fields generously: a 4-character Japanese name is ~12 bytes in UTF-8. (DOM) `Apple silent`
    - [SHOULD] Title is optional. Use "Previous name", not "Maiden name". Don't assume family members share a surname. For Japanese, add a pronunciation (furigana) field if you sort by name. Ask for native script and Latin in separate fields if you need both. (manual) `Apple silent`
  - Apple covers RTL and `Foundation` formatters at a high level (unverified); the checks above add depth where Apple is brief.

## What Apple misses
- Weight-aware contrast and dark mode (APCA): Apple's ratios pass thin grey text that's unreadable. Run APCA as an extra gate.
- Cognitive load as accessibility (COGA): numeric limits (5 main choices at most, 3 contact-form fields at most), timeout disclosure, fees up front, no memory-based login. Apple has nothing comparable.
- Authentication specifics (WCAG 3.3.8): paste must work, OTP boxes must accept a paste, no transcription CAPTCHAs.
- Obscured focus from sticky chrome, plus redundant entry: both common in web and hybrid apps. Apple doesn't cover them.
- Drag alternatives (2.5.7): Apple encourages gestures but doesn't require a single-pointer non-drag path.
- Forced colours / Windows High Contrast: Apple is silent. Shadow- or gradient-only affordances vanish.
- Web reach of Apple's own settings: Safari doesn't expose `prefers-reduced-transparency`, so Liquid-Glass-style web UI must be legible without it.
- Custom-widget semantics (APG): menu-for-navigation, combobox focus model, tabs keyboard contract. Apple's native controls hide these problems, but web and RN rebuild them.
- Cross-platform props that silently no-op (RN Android-only/iOS-only props), plus the 48dp vs 44pt vs 24px target floors.
- Legal layer: EAA in force since 28 Jun 2025. EN 301 549 V4.1.1 (WCAG 2.2 AA) published 2 Sep 2026, with OJEU citation pending (~30 Nov 2026).
- Engagement ethics: streaks, infinite scroll, autoplay and red-dot badges as review findings.
- i18n depth: 3× expansion for short labels, CJK line breaking, `lang` for Han glyph selection, CLDR plurals, W3C names guidance.

## Sources not reachable
- https://www.w3.org/WAI/WCAG3/ (403). The WCAG 3 conformance model and contrast method in the March 2026 draft are unverified.
- WCAG 2.2 TR page: only the first 100k chars read. 2.5.7/2.5.8/3.2.6/3.3.7/3.3.8 wording comes from the W3C "What's new in 2.2" page and Understanding docs, not the TR text.
- https://material.angular.dev/cdk/a11y/overview returned only a title. The GitHub source markdown was used instead.
- Directive 2019/882 on EUR-Lex: not fetched. Microenterprise AND/OR wording and the Art. 32 transition are from secondary sources.
- Val Head articles, WCAG 2.5.5 (44px AAA), 3.1.1/3.1.2, ECMA-402, CSS `line-break`, EN 301 549 Clause 11, EAA Annex V accessibility-information requirement: all from memory, marked unverified.
- COGA: only parts of a 470k-char doc were read (0-100k, 200-300k).
- Android `getRecommendedTimeoutMillis` and Compose semantics merging: not on the fetched page.
