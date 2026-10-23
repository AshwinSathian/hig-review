Covers GOV.UK Design System and Service Manual (with NHS content guidance), IBM Carbon, Shopify Polaris, GitHub Primer, Atlassian, Adobe Spectrum: forms, validation, errors, feedback, density, motion registers, data viz, copy rules, contrast-generated palettes.
Loaded by passes: structure, interaction and motion, content, accessibility, visual, slop scan, distinctiveness, platform fit.
Snapshot: 2026-10-23

Tags: [MUST]/[SHOULD]/[CONSIDER] follow the source's strength (hard rule with evidence or an accessibility basis, strong default, context-dependent). Every check carries `adds to Apple`, `Apple silent`, or a conflict with its resolution. These sources only augment Apple; none replaces an Apple rule. Many resolutions turn on the profile's `audience` field (occasional-public vs daily-professional). Ask for it before flagging either side. Items marked `(unverified)` came from memory or a snippet: weight them lower and never make them a Blocker on their own. Carbon, Polaris and Atlassian numbers are system specs, not research findings; label them as specs so nobody treats 40px rows as law. Overused patterns from these sources: see references/slop-catalog.md.

## Question pages and form architecture (GOV.UK)
- **Why it matters**: The most evidence-driven public form guidance, tested with very wide populations (low literacy, assistive tech users, people under stress). Apple says little about multi-step data entry on the web.
- **Checks**:
  - [SHOULD] Start with one question per page; group questions only when research supports it (internal services where staff switch tasks quickly). `CONFLICT: Apple's single scrolling, grouped form (iOS Settings style) vs GOV.UK one question per page; resolution: one question per page for occasional-public, high-stakes flows; grouped forms for daily-professional use, settings and frequent edits. Read the profile's audience before flagging either way; flag a 9-screen signup for a free app as low-stakes friction.`
  - [MUST] Make the `<label>`/`<legend>` the page heading so screen reader users hear it once. (Apple silent)
  - [SHOULD] Don't repeat the same page heading across pages; show the section name as a caption above the h1 (e.g. "About you"). (Apple silent)
  - [MUST] Don't break the browser back button: it returns users to the previous page in the state they last saw it. One-time actions (payments) still allow back but show a sensible message instead of repeating the action. (Apple silent)
  - [SHOULD] Add a Back link at the top of every question page, because "some users do not trust browser back buttons when entering data." (Apple silent)
  - [SHOULD] Label the button "Continue", not "Next"; left-align it so it isn't missed. (adds to Apple)
  - [SHOULD] No asterisks to mark mandatory fields. (Apple silent)
  - [MUST] Don't ask for the same information twice in a journey; pre-populate or show carried-forward answers. (Apple silent)
  - [SHOULD] No links in hint text (screen readers don't announce that the text contains a link). Keep hints to one short sentence without full stops. (Apple silent)
  - [MUST] Range sliders need a method that doesn't rely on dragging (WCAG 2.5.1 Pointer Gestures). (adds to Apple)
  - [CONSIDER] Progress indicators: test without one first. If you add one, show only the current step ("Question 3 of 9"), and include the total only if you can calculate it reliably. (Apple silent)
  - [SHOULD] Question protocol before adding any question: know that you need it, why, what you'll do with it, which users must provide it, how you'll check it's accurate, and how you'll keep it up to date and secure. It "forces you (and your organisation) to question why you're asking users for each item of information." (Apple silent)
  - [SHOULD] Order questions so ineligible users find out first; branch so people only see what's relevant. (Apple silent)
  - [CONSIDER] Date of birth as 3 text fields (the manual says so; no evidence given on the page). (Apple silent)
- **Research evidence**: The Carer's Allowance team removed a 12-step progress indicator and saw no effect on completion rates or times (cited on the question pages page; the original blog post wasn't fetched). NHS cites research that "most people prefer to read plain English" and "the more specialist a person's knowledge is, the greater their preference" (via a 2014 GDS blog post), which answers the objection that expert users want jargon.
- **Web/native**: Web: applies directly. Flag React/Next/Vue/Angular form libraries that default to live validation on change and native `required` bubbles.
- **Slop tells (ours)**: Placeholder-only fields; asterisks on every field; forms asking for fields nobody uses (phone number "for security", job title on a consumer signup); stepper bars across the top of multi-step flows, which GOV.UK's own evidence says often add nothing.

## Validation and error recovery (GOV.UK, Primer, Polaris, Carbon)
- **Why it matters**: Validation timing has a cross-system consensus with one outlier, and error recovery is where public forms fail.
- **Checks**:
  - [SHOULD] GOV.UK: validate on submit, "usually by clicking the 'continue' or 'submit' button". "Generally speaking, avoid validating the information in a field before the user has finished entering it." Live inline validation only when research shows "on balance, it solves more problems for users than it causes" (character count is the sanctioned example). (adds to Apple)
  - [SHOULD] Primer: default on submit. For a field, validate only after the user has changed it and "removed focus from the input". Once invalid, re-validate as they type so the error clears early. After a failed submit, inline is OK. (adds to Apple)
  - [SHOULD] Polaris: "Validate input as soon as merchants have finished interacting with a field (but not before). If a field already has an error, validate and remove errors as merchants type." (adds to Apple)
  - [CONSIDER] Carbon validates client-side "as soon as the field loses focus" (on blur). This is a known disagreement between sources, not with Apple; Carbon is the outlier. Default for web: Primer's middle position (on blur after change, live once in error, summary after submit); GOV.UK's submit-only for public high-stakes forms. (adds to Apple)
  - [SHOULD] Show a loading indicator if validation may take more than 1 second. (Primer; adds to Apple)
  - [MUST] Add "Error: " to the start of the page `<title>` on error so screen readers announce it early. (Apple silent)
  - [SHOULD] Turn off browser HTML5 validation with `novalidate` and don't add `required` to inputs, because native bubbles can't be styled, placed or worded consistently. (GOV.UK; Apple silent)
  - [MUST] Primer instead: required fields visibly marked and set required in code (login-style forms excepted). The two systems disagree; GOV.UK asks openly for evidence on whether omitting `required` hurts screen reader users, so treat that point as unsettled. (adds to Apple)
  - [MUST] Always validate on the server too. (Apple silent)
  - [MUST] Re-show the page with the user's entries kept: "Don't clear any form fields", passing or failing. (Apple silent)
  - [MUST] Always show an error summary on a validation error, even with one error, plus a message next to each field. Place it at the top of `main`, below breadcrumbs or back link and above the h1, and move keyboard focus to it. (GOV.UK; Apple silent)
  - [MUST] Summary heading "There is a problem". Each item links to its field and uses the same wording as the inline message. Multi-field questions (date) link to the first field with an error; radios/checkboxes link to the first option. (Apple silent)
  - [MUST] `role="alert"` sits on an element inside the summary, not the root (changed in v4.4.0 because JAWS wouldn't read the whole summary). (Apple silent)
  - [SHOULD] Primer: three or more errors, an interactive summary in a banner at the top linking to each field; fewer, focus the first invalid input and scroll it into view. (Apple silent)
  - [MUST] `aria-describedby` for errors and `aria-invalid=true` on invalid inputs. "Don't use live regions for form validation; use focus management instead." (Primer; Apple silent)
  - [MUST] Polaris: don't programmatically move focus to new content without user input, except when the user can't continue their workflow. On submit error move focus to the error message; don't move focus for background updates. (Apple silent)
  - [CONSIDER] Track how often each error appears and use that to redesign the journey. (Apple silent)
- **Research evidence**: GOV.UK error-message guidance was "tested with all types of users in live services, including tax credits": users understood what went wrong, knew how to fix it, and recovered. Submit-time validation is long-proven (e.g. passport renewal). Primer frames positions through WCAG criteria and AT behaviour rather than usability studies.
- **Web/native**: SwiftUI: the "Error:" title prefix maps to an accessibility announcement or moving VoiceOver focus (`AccessibilityFocusState`) to the first error; the error summary maps to a top-of-form error section that receives focus. React Native/Expo: `AccessibilityInfo.announceForAccessibility` or setting accessibility focus on the summary. Polaris `aria-describedby` for inline errors maps to SwiftUI `.accessibilityHint` or grouping the error with the field.
- **Slop tells (ours)**: Red "This field is required" under every empty field; errors that fire on first keystroke; errors that wipe the form.

## Disabled submit and buttons (GOV.UK, Primer, Carbon)
- **Why it matters**: A disabled button can't be focused and doesn't say what is missing.
- **Checks**:
  - [SHOULD] On web, keep submit enabled and show inline errors on submit. GOV.UK: "Disabled buttons have poor contrast and can confuse some users, so avoid them if possible. Only use disabled buttons if research shows it makes the user interface easier to understand." Primer: they "don't show users what they need to do"; if the form can't save, keep it enabled with a read-only notice and show a dialog on submit. `CONFLICT: Apple's disabled-until-valid Done/Save pattern vs GOV.UK and Primer avoid-disabled; resolution: on web, enabled button plus inline errors (spec); on native Apple targets, disabled-until-valid is fine for one or two obvious fields, and for longer forms flag a disabled submit with no hint why. Carbon's allowance (disable primary on short forms, never on long ones) is a native-style exception, not the web default.`
  - [SHOULD] Carbon: always disable during submission. (adds to Apple)
  - [MUST] Prevent double submission client-side (`data-prevent-double-click`) and on the server; rationale includes users with hand tremors and slow connections. (GOV.UK; Apple silent)
  - [SHOULD] One default (primary) button per page: "Having more than one main call to action reduces their impact." (adds to Apple)
  - [SHOULD] Sentence case labels that describe the action ("Save and continue", "Add another address"). (see Copy rules for the casing conflict) `adds to Apple`
- **Research evidence**: "Testing on GOV.UK has shown that using green as the colour of start buttons improved click-through rates."
- **Slop tells (ours)**: Disabled "Submit" with no hint why.

## Text inputs and placeholders (GOV.UK, Primer, Polaris, Carbon)
- **Why it matters**: Placeholder-as-label is banned by GOV.UK, Primer, Polaris and Carbon.
- **Checks**:
  - [MUST] Don't use placeholder text as a label, hint or example. Reasons: "it vanishes when the user starts typing" (hurts users with memory conditions and anyone reviewing answers), "not all screen readers read it out", and browser default placeholder styles can fail WCAG 1.4.3. Primer: "never an acceptable substitute for a label". `CONFLICT: Apple's text field guidance allowing placeholder hints vs GOV.UK/Primer/Polaris/Carbon placeholder ban as a label; resolution: keep Apple's short example hint (Carbon and Polaris allow short non-essential examples such as a date format) on every audience, and flag placeholder-only labelling as a Blocker-class accessibility concern only when it is the sole label; strictest source wins for accessibility.`
  - [SHOULD] Primer: avoid placeholders where possible. Darkening placeholder text to pass contrast makes it look pre-filled; width truncates it at large font sizes; it can't hold links; without a label, AT falls back to it as the name. Control placeholder colour with a token so it works in every theme. (adds to Apple)
  - [SHOULD] Size inputs to the expected content: "Postcode inputs should be postcode-sized, phone number inputs should be phone number-sized." (Apple silent)
  - [MUST] `autocomplete` on fields with a known purpose (WCAG 1.3.5, AA). (adds to Apple)
  - [SHOULD] `spellcheck="false"` for reference numbers, names, emails, NI numbers. (Apple silent)
  - [MUST] Avoid `type="number"`. Use `type="text" inputmode="numeric"` (whole numbers) or `inputmode="decimal"`, and plain `type="text"` if negatives are allowed, since some keypads can't enter a minus sign. (Apple silent)
  - [SHOULD] Prefixes/suffixes (£, kg) sit outside the input, aren't the only carrier of meaning (screen readers don't read them), and validation must accept the user typing the symbol themselves. (Apple silent)
  - [SHOULD] Carbon: mark the minority; if most fields are required, mark only optional ones "(optional)", and vice versa. Polaris: label optional fields "Optional". (Apple silent)
  - [SHOULD] Stack controls vertically; "Don't use multi-column layouts just to reduce vertical space" (Primer). Carbon cites NN/g: multicolumn forms "are more prone to misinterpretation". (adds to Apple)
  - [SHOULD] Carbon spec: input height 40px default; 32px between fields on full pages, 24 or 16px in contained forms; 48px before the buttons. Buttons left-aligned on in-page forms, right-aligned in multi-step forms (primary right of secondary), full-width bleed in dialogs and side panels. (Apple silent)
  - [SHOULD] Carbon: dialog for fewer than five inputs; side panel for more than five; no accordions or tabs inside dialogs or side panels. (Apple silent)
- **Research evidence**: The GOV.UK team's `type="number"` findings (technology.blog.gov.uk, 2020-02-24): Dragon users couldn't dictate into or select the field (reproduced in Dragon 13 and 15); NVDA announced it as unlabelled with unlabelled spin buttons; Chrome silently discards letters except "e"; Chrome 79 shows very large numbers in exponential form; older Safari rounds values of 16+ digits; scroll wheel and arrow keys change values by accident. Fix: `<input type="text" inputmode="numeric" pattern="[0-9]*">`, with `pattern` kept for older iOS. Prefix/suffix design "has tested well", but "some users have been observed clicking on prefixes."
- **Web/native**: SwiftUI: `inputmode` maps to `.keyboardType(.numberPad/.decimalPad)` plus `.textContentType` (the `autocomplete` equivalent). React Native/Expo: `keyboardType`, `textContentType`/`autoComplete`.
- **Slop tells (ours)**: `type="number"` for card, phone or ID fields.

## Check answers (GOV.UK)
- **Why it matters**: Transactional journeys need a review step that lets people fix one answer without redoing the rest.
- **Checks**:
  - [SHOULD] A single check-answers page right before confirmation for small to medium transactions; for very large ones, one at the end of each section. (Apple silent)
  - [MUST] A "Change" link per row, with visually hidden text naming what it changes. (Apple silent)
  - [MUST] After a change, "Continue" returns the user to the check page: "They should not need to go through the rest of the transaction again." If the change triggers new questions, ask those first. Show skipped optional questions as "Not provided". (Apple silent)

## Error message writing (GOV.UK, Polaris, Atlassian, Carbon)
- **Why it matters**: Specific, fixable errors are what users recover from; banned words and generic wording are lintable.
- **Checks**:
  - [MUST] A specific message per failure type: empty, too long, too short, disallowed characters, wrong format. (adds to Apple)
  - [SHOULD] Reuse the question's language: "How many hours do you work a week?" pairs with "Enter how many hours you work a week". Instructions for empty fields ("Enter your name"); descriptions for invalid ones ("Name must be 35 characters or less"). (Apple silent)
  - [MUST] Banned in GOV.UK errors: "please", "sorry", "valid"/"invalid", "oops", "forbidden", "illegal", "you forgot", "prohibited", and generic messages like "An error occurred", "Select an option", "This field is required". Atlassian agrees on "sorry" (makes errors seem more severe) and "please" (makes required steps sound optional), and bans "OK" as a CTA. (adds to Apple)
  - [MUST] Don't use error messages for things the user can't fix (eligibility, permission, service down). Send them to a separate page explaining what to do next. (Apple silent)
  - [MUST] Add a visually hidden "Error:" prefix to inline messages for screen reader users. (Apple silent)
  - [MUST] Polaris: be specific ("exact numbers and dates, or even the merchant's own data"); avoid "invalid"; don't use "us"/"we" unless Shopify caused the problem. Atlassian: use "you" rather than "we". (adds to Apple)
  - [SHOULD] Polaris examples. Do: "To save this product, make 2 changes: Enter title / Add weight"; don't: "There are 2 errors on this page. Invalid title...". Do: "Couldn't deposit payout / The bank account we have on file was closed. Update your details, and we'll retry automatically. / Update bank account"; don't: "Invalid bank account ... Next". Do: "Connection timed out"; don't: "Sorry, the connection time out. Try again later." Errors without solutions, do: "Something went wrong. Refresh your browser to try again."; don't: "Sorry, something went wrong. Learn more." `adds to Apple`
  - [SHOULD] Polaris: red for critical issues needing immediate action; yellow for errors that are part of daily workflow, or warnings. (Apple silent)
  - [SHOULD] Atlassian: title three to four words (not counting articles), no instructions in the title. Body: reason, action, consequence of not acting; one or two sentences; don't repeat the title; if the cause is unknown, don't guess. Several possible causes: most likely cause or simplest fix first, backup (contact support) second. CTA: one or two words, an imperative verb describing the outcome, plus a dismiss/cancel option. (adds to Apple)
- **Slop tells (ours)**: "Oops! Something went wrong"; "Learn more" links on errors; exclamation marks in error copy.

## Feedback, toasts and notifications (Primer, Polaris, Atlassian, Carbon, GOV.UK)
- **Why it matters**: Apple has no toast on iOS and generally favours in-place feedback, so Primer and Apple agree; the systems here give the reasoning for reviewing React Native or web apps that bolt on toast libraries.
- **Checks**:
  - [MUST] No auto-dismissing toast for errors or anything with an action. Primer: "Toasts pose significant accessibility concerns and are not recommended for use." "Toasts are an over-used interaction pattern on the web." Polaris and Atlassian say never for critical information. Atlassian: "Never use auto dismiss flags for any critical warning or error messages." (adds to Apple)
  - [SHOULD] Prefer the result itself as feedback. By audience: simple successful action, the result is the feedback (the new issue appears in the list; a toast "may ironically lessen a sense of trust"); for daily-professional bulk work, a banner summarising what was done, or content appearing progressively; for occasional-public flows, a confirmation page in linear journeys. On native Apple targets, prefer inline confirmation or the result itself, and flag a toast library as non-native. (adds to Apple)
  - [SHOULD] Primer alternatives: failure, a persistent banner or a dialog when the user must be interrupted; long-running tasks, a banner on completion or failure (consider email, notifications or push); out-of-sync state, a banner or dialog prompting refresh. Feedback: no page refresh, InlineMessage; refresh/redirect, Banner. (adds to Apple)
  - [CONSIDER] Where a toast is accepted anyway (web or React Native snackbar, non-critical): Carbon toasts persist by default and may auto-dismiss "after five seconds". Polaris: noun + verb ("Product updated", "Collection added", "Connection timed out", not "Your product has been successfully updated" or "Discount: Saved successfully"); with an action it persists at least 10,000 ms, and the action is one verb ("Undo", "Retry", "View"), never "OK", "Got it", "Dismiss", "Cancel". Polaris implements toasts with `aria-live="assertive"` and notes they can't easily be reached by keyboard and may appear far from the user's focus. Atlassian flag auto-dismiss is about 8 seconds (unverified, from memory). (Apple silent)
  - [SHOULD] Atlassian message types: information (explain), error (fix), success (celebrate), warning (anticipate), feature discovery (introduce). Component choice: banner = critical system-level (data loss, lost function), top of screen, pushes content down; flag = event-driven confirmations, bottom left; section message = above the affected area; inline message = required action or important info; modal = short task; spotlight = teach a feature. (Apple silent)
  - [MUST] Atlassian flags: never mix dismissible and non-dismissible flags in one stack; flags stay visible above an open modal; max two links per flag; "Learn more" link text discouraged. (Apple silent)
  - [SHOULD] Carbon notification kinds: inline (task flow, near the item or "just above the submission and cancel buttons"), toast (non-modal, time-based, short non-critical feedback), actionable (needs resolution; one action only), callout (loads with the page, info needed before acting; no success/error). Inline doesn't auto-dismiss. Body "one or two short sentences"; toast/inline two lines or fewer; titles without periods; body doesn't repeat the title. Actionable notifications take focus, action first, Esc closes. "When in doubt, use low-contrast notifications." (Apple silent)
  - [SHOULD] GOV.UK notification banner: use sparingly ("people often ignore them"); not for validation errors; never a banner and an error summary on the same page; at most one banner per page (combine messages or show the highest priority), placed immediately before the h1. The green "Success" banner confirms something the user expected and is removed on a new page; in linear journeys use a confirmation page. (Apple silent)
  - [SHOULD] Polaris banner: sparingly; don't use a banner to tell people what to do when the UI itself could make the action clear; dismissible unless critical. Page banners sit below the page header; section banners inside the section. (Apple silent)
- **Research evidence**: Primer lists the problems with toasts: large displays, distraction, blocking UI, screen magnification, working memory, banner blindness, disconnection from the action, accidental dismissal; WCAG 2.2.1 (must be extendable indefinitely), 1.3.2, 2.1.1, 4.1.3. Banner blindness is cited from Nielsen Norman Group; GOV.UK says more research is needed on AT users skipping straight to the h1. Atlassian and Carbon give no published research on these pages.
- **Web/native**: Atlassian flag placement (bottom left, from the nav) is Atlassian-specific; on iOS don't copy it. The taxonomy of which component for which message type transfers everywhere.
- **Slop tells (ours)**: "Saved!" and "Successfully saved!" toasts after editing a single field; a toast for every save.

## Saving model (Primer)
- **Why it matters**: Mixed explicit and automatic saving leaves users unsure what saved.
- **Checks**:
  - [SHOULD] Start with explicit saving. Don't mix explicit and automatic saving in one form, and avoid mixing on one page. `CONFLICT: Apple's Settings and macOS preferences apply changes immediately, including some text fields and pickers vs Primer explicit save for text inputs and selects; resolution: native Apple targets follow Apple's immediate-apply convention for preferences; web uses explicit save for text inputs, checkbox groups, radio groups, native selects and multi-selects, especially sensitive fields; for daily-professional settings screens autosave is acceptable on imperative controls only.`
  - [MUST] Text inputs, checkbox groups, radio groups, native selects and multi-selects use explicit save on web. Reasons: autosave can submit sensitive input by accident, leaves users unsure whether a choice saved, and applies choices screen reader users didn't mean (arrow keys in a native select change the value). (Apple silent)
  - [SHOULD] Autosave only for imperative controls: toggle switches, segmented controls, custom single-select menus. Saved state must be clear without relying only on visuals that could be mistaken for validation. (adds to Apple)
  - [SHOULD] A menu that only lists options has no save button; once it gains search, filters or tabs, treat it like a dialog with submit/cancel. (Apple silent)
- **Web/native**: Explicit vs auto save maps to iOS sheets with Cancel/Done (explicit) vs Settings toggles (auto).
- **Slop tells (ours)**: Save buttons on dropdown menus; mixed autosave and a Save button in one settings form.

## Loading states (Primer, Carbon, Polaris)
- **Why it matters**: Concrete thresholds Apple doesn't give.
- **Checks**:
  - [SHOULD] Under 1 second: "Don't show a loading state" (a flash makes it feel slower). 1 to 3 s: indeterminate. 3 to 10 s: determinate where possible. Over 10 s: determinate, and run it as a background task if possible. (Primer; adds to Apple)
  - [SHOULD] Skeleton for large areas of content; spinner elsewhere. Carbon: skeletons over spinners when extra load time is expected. (adds to Apple)
  - [MUST] Status messages via `role="status"`/`aria-live` on an element that is always in the DOM; one announcement per group of skeletons; announce result counts after filtering ("5 items match the filter"); `aria-busy` during partial updates. (Primer; adds to Apple)
  - [SHOULD] Polaris: no static loading indicators (they "make the system seem unresponsive"). (Apple silent)
- **Web/native**: Thresholds apply everywhere. SwiftUI: delay showing `ProgressView` until about 1 s; use `.redacted(reason: .placeholder)` for skeletons.
- **Slop tells (ours)**: Skeleton shimmer that flashes for 200ms; skeletons for content that loads in under a second.

## Motion registers (Carbon, Polaris)
- **Why it matters**: A named split between quiet task motion and rare expressive motion, with numbers, as a rule for where boldness goes.
- **Checks**:
  - [SHOULD] Two modes. Productive: "creates a sense of efficiency and responsiveness", subtle, used while users complete tasks. Expressive: "enthusiastic, vibrant, and highly visible movement", reserved for significant moments like opening a new page or pressing the primary action. Sits on top of Apple's springs as a decision rule for which moments get expressive treatment; keep springs for direct manipulation. (adds to Apple)
  - [SHOULD] Carbon easing, cubic-bezier. Standard: productive (0.2, 0, 0.38, 0.9), expressive (0.4, 0.14, 0.3, 1), for an element visible throughout (expanding tiles, sorting rows). Entrance: productive (0, 0, 0.38, 0.9), expressive (0, 0, 0.3, 1). Exit: productive (0.2, 0, 1, 0.9), expressive (0.4, 0.14, 1, 1), for leaving view (closing modal, toast). Exception: if an element leaves but stays nearby to be recalled (side panel), use standard easing, not exit. These are specs to adapt to the profile's motion personality, not presets to copy. (adds to Apple)
  - [SHOULD] Carbon duration tokens: fast-01 70ms (buttons, toggles); fast-02 110ms (fades); moderate-01 150ms (small expansions, short moves); moderate-02 240ms (expansion, system communication, toasts); slow-01 400ms (large expansions, important notifications); slow-02 700ms (background dimming). Duration scales with distance or size change, on a non-linear scale; productive is "significantly faster" than expressive. (Apple silent)
  - [SHOULD] Polaris: don't animate all elements at once ("Animating a single element is often enough"); don't stagger items in navigation transitions; motion direction matches navigation direction (right-to-left going deeper). (adds to Apple)
  - [CONSIDER] Polaris "juicy" interactions: hover "smooth and unobtrusive", click feedback "feels more dramatic and visceral" (position and lighting shift like a physical button). `CONFLICT: Apple's restrained system highlight states vs Polaris dramatic click feedback on primary buttons; resolution: native Apple targets keep system button feedback unless the product has a deliberate reason; on web, dramatic feedback is allowed for the brand's primary action in an expressive-register product and kept out of utilitarian, daily-professional task flows.`
  - [CONSIDER] Polaris sound: short sounds 250ms or less, long sounds 1 second or less; two versions (louder desktop, quieter mobile); always allow turning off; never the only channel. A sound pleasant once "may become irritating after ten, and unbearable after a hundred." (Apple silent)
- **Web/native**: Easing values drop into CSS `transition-timing-function`. SwiftUI: `.timingCurve(0.2, 0, 0.38, 0.9, duration: 0.24)` reproduces productive standard.
- **Slop tells (ours)**: Every animation the same 300ms ease-in-out; uniform medium-intensity animation everywhere.

## Density, tables and rows (Carbon, Polaris)
- **Why it matters**: Dense professional UI needs explicit density modes chosen per task. Apple's `Table` guidance on macOS is thin and iPad tables barely covered.
- **Checks**:
  - [SHOULD] Polaris: the admin is "high density by default, but the level of density can range depending on the merchant's task". High density for index pages, tables and action components ("Always offer the most condensed option possible" in action components; don't suddenly change density inside one). Low density for focused editing: larger targets, wordier buttons, top-to-bottom rhythm. Split contexts into separate cards; don't mix a low-density block with a high-density component in one card. In dense components, separate zones with surface color instead of lines; grid/vertical divisions only for selection or data viz. (Apple silent)
  - [SHOULD] Carbon row heights: xs 24px (highly dense), sm 32px (compact), md 40px (default), lg 48px (spacious), xl 64px (multi-line rows). Header, toolbar, batch-action bar and pagination heights match row height (xl tables use lg for batch bar and pagination). `CONFLICT: Apple's 44pt minimum hit target on iOS/iPadOS vs Carbon 24px and 32px rows; resolution: accept xs/sm density only on pointer-first platforms (macOS and pointer-driven web) and only for daily-professional profiles; keep 44pt on touch; occasional-public flows use the comfortable rows. The macOS floor is Apple's own compact list rows.`
  - [SHOULD] Carbon toolbar: global actions only, no more than five; the rest in overflow. Selecting a row reveals a batch-action bar; while active, disable per-row actions and overflow menus. Only the sorted column shows a sort icon (unsorted icons on hover). Column titles one or two words, sentence case; wrap to two lines then truncate with tooltip. Fewer than three row actions, inline icon buttons; otherwise overflow. Row hover always on. (adds to Apple)
  - [MUST] Polaris data table: numbers right-aligned, text left-aligned, headers aligned with their data, "Don't center align." (adds to Apple)
  - [SHOULD] Polaris: "Wrap instead of truncate content. This is because if row titles start with the same word, they'll all appear the same when truncated." A stronger stance than Apple's frequent tail truncation in lists; apply to data tables where rows share prefixes. Atlassian agrees: "Avoid truncation. Shorten or wrap the text instead"; if unavoidable, full text in a tooltip. (adds to Apple)
  - [SHOULD] Polaris: summary row for column totals, but no calculations in it. Index table headings say when the list is partial ("Popular products this week", not "Products"). Bulk actions follow verb + noun. (Apple silent)
- **Research evidence**: Carbon is mostly expert opinion; its cited evidence is borrowed (NN/g on multicolumn forms and tooltips; Wroblewski on accordion forms; HFI on white space). The density and copy rules in Polaris come from internal practice. Treat these numbers as system specs.
- **Web/native**: Map Carbon's sizes to `controlSize`/list row insets on macOS; on iOS stay at or above 44pt.
- **Slop tells (ours)**: Table rows at 56 to 64px with one line of text; sort arrows shown on every column; centred numbers in tables; truncated row titles that all start "Summer collection..."; zebra striping plus hover plus borders all at once.

## Type scale and grid (GOV.UK, Carbon, Atlassian)
- **Why it matters**: Examples of a system with its own scale logic instead of the default steps.
- **Checks**:
  - [SHOULD] Carbon: productive type set (`-01` suffix) for product UI uses fixed headings; the expressive set (`-02`) for editorial/marketing uses fluid headings that change per breakpoint. (adds to Apple)
  - [CONSIDER] Carbon scale from 12px: `Xn = Xn-1 + {INT[(n-2)/4] + 1} * 2`, giving 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92. Steps grow by 2px, then 4, then 6, then 8. Ask whether the product has its own scale logic or the default Tailwind steps. (Apple silent)
  - [CONSIDER] Carbon: Plex Light, Regular, SemiBold for digital; SemiBold for section headers, not long text; italics for emphasis only. A font choice of that system; do not recommend it as a default. (Apple silent)
  - [CONSIDER] GOV.UK: body 19px / 25px line height on all screen sizes; every line height a multiple of 5px for vertical rhythm; headings shrink on screens 640px and under (48 to 32, 36 to 27, 24 to 21). Compare against the web mapping floor of 16px body. (adds to Apple)
  - [CONSIDER] Carbon 2x grid: the basic unit is the 8-pixel square mini unit. Breakpoints: sm 320 (4 cols, 0 margin), md 672 (8 cols), lg 1056 (16 cols), xlg 1312 (16), max 1584 (16, 24px margin). Padding 16px everywhere, total gutter 32px. "Always place type against the padding." "Never place type on the padding." Constrain boxes to 1:1, 2:1, 2:3, 3:2, 4:3, 16:9 when possible; fixed sizes 8, 16, 24, 32, 48, 64, 80. (Apple silent)
  - [CONSIDER] Atlassian spacing: 8px base, tokens 0/2/4/6/8/12/16/20/24/32/40/48/64/80. Small 0 to 8 (badges, table cells, input padding), medium 12 to 24 (buttons, avatars), large 32 to 80 (layout). Make optical adjustments rather than apply values mechanically. (adds to Apple)
  - [CONSIDER] Carbon: white space increases comprehension "by almost 20 percent" (citing Human Factors International; original study not fetched). (Apple silent)

## Empty states (Carbon, Polaris, Atlassian)
- **Why it matters**: Empty states are a first-impression and a trust moment. Which tone fits depends on how often the state appears.
- **Checks**:
  - [SHOULD] Carbon types: no data (first use), user action (no search results, process complete), error management (permissions, config). Positive title ("Start by adding data assets", not "You don't have any data assets"); say what will appear; one main action; no dead ends; no jokes, "especially in error states". (adds to Apple)
  - [SHOULD] Carbon: left-align the block (except small tiles). Drop illustrations when space is limited or when several empty states may appear together (e.g. multiple failed widgets). Illustrations are decorative: empty alt. (Apple silent)
  - [SHOULD] Polaris: full-page empty state only (not for individual widgets); one primary CTA; "never make merchants feel unsuccessful or guilty." (Apple silent)
  - [SHOULD] Atlassian: empty state = after the user completed or cleared something (empty inbox); blank slate = feature not yet used. Different copy for each. "Delight with restraint": messages that appear often should be shorter and less playful; use several concise variants for repeated ones; humour only lightly and where appropriate. Playfulness belongs in rare, big moments; frequent states stay plain for daily-professional users. (Apple silent)
- **Slop tells (ours)**: Centred line illustration plus "No items yet" plus a button; playful empty-state jokes ("Nothing to see here!") everywhere; the same illustration on every screen.

## Data visualization (Carbon, Polaris)
- **Why it matters**: Swift Charts guidance covers marks, not palettes or dashboard composition.
- **Checks**:
  - [SHOULD] Carbon categorical palette applied "in sequence strictly": 14 colors ordered to maximise contrast between neighbours (01 Purple 70 #6929c4, 02 Cyan 50 #1192e8, 03 Teal 70 #005d5d, 04 Magenta 70 #9f1853, 05 Red 50 #fa4d56 ...). Colors stay consistent across charts on one dashboard. These are examples of method, not a palette to adopt. (adds to Apple)
  - [SHOULD] Sequential: "In light themes, the darkest color denotes the largest values"; dark themes reverse it. Diverging palettes don't change between themes. "Never use a gradient in place of a sequential palette." Alert colors kept separate from data: Red 60 danger, Orange 40 serious warning, Yellow 30 warning, Green 60 success. (adds to Apple)
  - [SHOULD] Carbon dashboards split into presentation (status at a glance: rank data by importance, the most important gets highest contrast and largest area, limit metrics, F-pattern) and exploration (shared layout and legend position across charts, linked charts mirror filter and zoom, don't switch units). (Apple silent)
  - [SHOULD] Polaris: one question per chart ("What are my sales over time?"). Test with 1 to 2 data points and with 100+; check sparse (mostly zero) and spiky data. (Apple silent)
  - [SHOULD] Polaris thresholds: horizontal bars not when data points can exceed 6 (use a table); column charts fewer than 30 points, over 31 use a line chart. One color for all bars; negative bars at 60% opacity; bar width about twice the gap. (Apple silent)
  - [SHOULD] Polaris axes: axis lines only where data appears; skip labels at regular intervals, don't slant them. Y-axis labels: no more than 3 numeric characters, 1 decimal or 1 letter ("k", "b"). Time "12am, 6pm"; days "Sun"; months "Feb"; "10 Apr"; "Apr 2011". Comparison to past: current period purple, past period grey. (Apple silent)
- **Slop tells (ours)**: A 10-color rainbow chart; random categorical colors that change between charts on one dashboard; charts with slanted x-axis labels; 12-bar horizontal charts that should be tables; four equal KPI tiles with no hierarchy.

## Assistive tech testing and plain language (GOV.UK Service Manual, NHS)
- **Why it matters**: Apple covers VoiceOver and Voice Control capabilities but not a release-gating test protocol.
- **Checks**:
  - [MUST] Minimum matrix before public beta (updated 24 May 2022): JAWS 2019 or later + Chrome or Edge; NVDA latest + Chrome, Firefox or Edge; VoiceOver iOS + Safari; TalkBack + Chrome; Windows Magnifier or Apple Zoom + any browser; Dragon 15 or later + Chrome. Also recommended: Firefox with JAWS, NVDA, Dragon; VoiceOver macOS + Safari; ZoomText; Windows High Contrast mode. (Apple silent)
  - [MUST] Magnifier tests "at least 4 times magnification"; check label-field spacing and that users are told about changes outside the viewport (modals, errors). (Apple silent)
  - [SHOULD] Speech recognition tests: reach every feature by voice, activate every control, dictate into every field. (Apple silent)
  - [SHOULD] Issue logging: confirm you're using the AT correctly, rule out known AT/browser bugs, record versions, rate severity. (Apple silent)
  - [SHOULD] NHS writing: "We aim for a reading age of 9 to 11 years old"; fallback "make sure that an 11 to 14-year old will understand." Sentences up to 20 words; paragraphs up to 3 sentences. No metaphors. Plain term first, medical term in brackets: "piles (haemorrhoids)". Replace vague timeframes ("a long time") with specific figures. The rules are about short, specific words, not chatty friendliness. Report reading level; enforce only if the profile sets a target. (Apple silent)
  - [CONSIDER] Government Design Principles (11): Start with user needs; Do less; Design with data; Do the hard work to make it simple; Iterate. Then iterate again; This is for everyone; Understand context; Build digital services, not websites; Be consistent, not uniform; Make things open; Minimise environmental impact. (Apple silent)
- **Research evidence**: The AT page cites a 2016 GOV.UK AT survey and WebAIM survey 9 but publishes no percentages. Polaris cites external disability figures (CDC: in the US "as many as 1 in 4 adults has at least 1 disability"; Canada 22%; worldwide closer to 1 in 7).
- **Web/native**: For native iOS/macOS, swap the matrix to VoiceOver (iOS, macOS), Voice Control, Switch Control, Zoom at 4x+, Dynamic Type at the largest accessibility sizes. For web, keep the matrix as written. React Native needs both TalkBack and VoiceOver.
- **Slop tells (ours)**: Accessibility claims based only on an automated linter run.

## Copy rules that can be linted (Atlassian, GOV.UK, Carbon)
- **Why it matters**: Cheap to automate and catches a lot of slop.
- **Checks**:
  - [SHOULD] Sentence case for titles, headings, menu items, labels, buttons; no articles in buttons ("Create password", not "Create a password"). `CONFLICT: Apple's title case for menu items and buttons on macOS vs Atlassian, GOV.UK and Carbon sentence case; resolution: native Apple targets keep Apple's convention; web follows the profile's house casing per element type (default sentence case) and either works; flag mixed casing, not the choice itself.`
  - [SHOULD] Avoid "e.g.", "i.e.", "etc.", "&" (localisation and AT). Use "then", not ">", between UI steps. (adds to Apple)
  - [SHOULD] Digits for numbers; "to" for ranges; "Step 1 of 2", not "1/2"; commas from 1,000. (adds to Apple)
  - [SHOULD] No exclamation marks in UI copy, never more than one per page. No question marks in headings (rephrase as a statement); no gerunds in UI copy. (adds to Apple)
  - [SHOULD] Lists six items or fewer. (Apple silent)
- **Slop tells (ours)**: Title Case Headings On Web Mixed With sentence case; "e.g." in helper text.

## Contrast-generated palettes (Spectrum)
- **Why it matters**: Spectrum generates its palette from target contrast ratios instead of picking hex values by eye. Apple doesn't publish that method, and it is the cleanest route to a non-Apple palette that still passes in every theme.
- **Checks**:
  - [SHOULD] Generate brand colors by contrast target: Spectrum colors are generated with the Leonardo color tool, "by plugging in hues and hue ranges through key colors", "combined with target contrast ratios for each color", with lightness stops set to produce aliased tokens. Use when a product wants its own palette instead of system blue. (adds to Apple)
  - [CONSIDER] Scales indexed 100 to 1600; 15 hue rows x 16 steps. The blue scale's stops run from 1.06:1 to 19.5:1 contrast. Light theme: icons/illustrations use the 900 index; two-tone backgrounds use 100. Dark themes: pick 700 to 1200 by desired lightness/saturation. (Apple silent)
  - [MUST] Yellow, orange, chartreuse and celery backgrounds take black text, not white. (adds to Apple)
  - [MUST] "Do not use color alone as a method of communication"; feedback colors need "an accompanying label and/or icon". (adds to Apple)
  - [CONSIDER] Platform scale: a "medium" scale for desktop and a "large" scale for touch, large components about 1.25× medium. (unverified, from memory; couldn't be confirmed on the current site) (Apple silent)
- **Research evidence**: None on these pages; the rigour is in the method (contrast-targeted generation).
- **Web/native**: Web: CSS custom properties per theme. SwiftUI: asset catalog colors with light/dark/high-contrast variants generated from the same contrast targets.
- **Slop tells (ours)**: One brand hex plus Tailwind opacity steps, which breaks contrast in dark mode; white text on yellow/orange badges; status shown only by color dots; dark mode made by inverting the light palette.

## Distinctiveness lessons from these systems
- **Why it matters**: Each system shows identity coming from a committed decision, not decoration. These inform the distinctiveness pass; none is a style to copy.
- **Checks**:
  - [CONSIDER] GOV.UK: identity from conviction about type size and plain language (19px body, heavy black headings, left-aligned everything, a green start button, a thick yellow focus ring). Ask: what would this product look like if it committed to one typographic decision as hard as GOV.UK commits to 19px body? Consistent, opinionated copy rules ("There is a problem", "Enter your name") are part of the brand. (adds to Apple)
  - [CONSIDER] "Be consistent, not uniform": consistency of behavior and language, not identical visuals. Apple consistency for behavior, freedom for visual identity. (adds to Apple)
  - [CONSIDER] Carbon: let working surfaces be calm and fast, and spend boldness only on two or three moments (first run, primary action, completion). Square corners, 2x grid, flat tiles and no shadows show a large system with strong identity without rounded cards. (adds to Apple)
  - [CONSIDER] Polaris: v12 chose a tactile, slightly skeuomorphic button with lighting and depth. Ask whether the product has a material idea at all; don't copy the bevels. Density can be an identity decision where users are professionals. (adds to Apple)
  - [CONSIDER] Primer: restraint (monospace touches, small type, few colors, feedback that sits in the content); "no toast, the result is the feedback" can itself feel like a confident product voice. (adds to Apple)
  - [CONSIDER] Atlassian: copy rules give identity cheaply; playfulness belongs in rare, big moments. Spectrum: your own key colors generated by contrast target. (adds to Apple)

## Where these sources go beyond Apple
- Form architecture and error recovery on web, validation timing consensus (Carbon the outlier), placeholder ban, toast restraint, loading thresholds, per-task density with the 44pt floor on touch, two motion registers, data-viz discipline, AT test matrix, contrast-generated palettes, lintable copy rules: all `adds to Apple` or `Apple silent`, as labelled above.
- Skipped on purpose: Salesforce Lightning (not covered). Not reachable: the GOV.UK Design Notes post on removing placeholder text (404; reasoning taken from the live text input page); the Carer's Allowance blog post (finding cited from the question pages page); polaris.shopify.com (redirects to shopify.dev, so the archived `Shopify/polaris-react-archive` repo, Polaris v12 era, about 2024, was used; its toast is deprecated in favour of App Bridge Toast); Spectrum `/page/platform-scale/` and `/page/toast/`.
