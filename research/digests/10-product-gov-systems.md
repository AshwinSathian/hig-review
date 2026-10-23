# 10 — Research-backed product and government design systems

Scope: GOV.UK Design System + Service Manual (with NHS content guidance), IBM Carbon, Shopify Polaris, GitHub Primer, Atlassian, Adobe Spectrum.
Fetched 2026-10-23. Everything below was fetched from the URL given unless marked "(unverified, from memory)". Figures are copied as published. Where the fetch summarised instead of quoting, the wording here is close paraphrase; numbers were not changed.

**How to use this file (per coordinator):** Apple HIG is the base of the skill. Everything here *adds to* Apple: it fills gaps where Apple says nothing, adds evidence, or adds rigor for dense or web-first contexts. Where a source actually conflicts with Apple, it's flagged as **CONFLICT** with the context in which each side applies. The skill should not recommend against Apple by default. Each source also gets an **Overused / now-generic** note, because the popular patterns from these systems are a large part of what today's AI slop is made of.

Tags: [MUST] = hard rule with evidence or an accessibility basis. [SHOULD] = strong default. [CONSIDER] = context-dependent.

---

## GOV.UK Design System: question pages, validation, errors, check answers (https://design-system.service.gov.uk, components/patterns updated through 2025)

Pages fetched: `/patterns/question-pages/`, `/patterns/validation/`, `/components/error-summary/`, `/components/error-message/`, `/patterns/check-answers/`, `/components/text-input/`, `/components/button/`, `/components/notification-banner/`, `/styles/type-scale/`.

**Why it matters.** It's the most evidence-driven public form guidance there is, tested with very wide populations (low literacy, assistive tech users, people using services under stress). It covers transactional forms, validation and error recovery in far more depth than Apple, which says little about multi-step data entry on the web.

### Key principles / checks

Question pages
- [SHOULD] "Start by asking one question per page." Group questions only when research supports it (e.g. internal services where staff switch tasks quickly).
- [MUST] Make the `<label>`/`<legend>` the page heading, so screen reader users hear it once.
- [SHOULD] "Do not use the same page heading across multiple pages." Show the section name as a caption above the h1 (e.g. "About you").
- [MUST] "Do not break the browser back button." It should return users to the previous page in the state they last saw it. One-time actions (payments) still allow back, but show a sensible message instead of repeating the action.
- [SHOULD] Add a Back link at the top of every question page, because "some users do not trust browser back buttons when entering data."
- [SHOULD] Label the button "Continue", not "Next". Left-align it so it isn't missed.
- [SHOULD] No asterisks to mark mandatory fields.
- [MUST] Don't ask for the same information twice in a journey. Pre-populate, or show carried-forward answers.
- [SHOULD] No links in hint text, because screen readers don't announce that the text contains a link. Keep hints to one short sentence without full stops.
- [MUST] Range sliders need a method that doesn't rely on dragging (WCAG 2.5.1 Pointer Gestures).
- [CONSIDER] Progress indicators: test without one first. If you add one, show only the current step ("Question 3 of 9"), and include the total only if you can calculate it reliably.

Validation (`/patterns/validation/`)
- [SHOULD] Validate on submit: wait until the user tries to move on, "usually by clicking the 'continue' or 'submit' button."
- [SHOULD] "Generally speaking, avoid validating the information in a field before the user has finished entering it." Live inline validation only when research shows "on balance, it solves more problems for users than it causes" (Character count is the sanctioned example).
- [MUST] Add "Error: " to the start of the page `<title>` on error, so screen readers announce it early.
- [SHOULD] Turn off browser HTML5 validation with `novalidate` on the form, and don't add `required` to inputs, because native bubbles can't be styled, placed or worded consistently.
- [MUST] Always validate on the server too.
- [MUST] Re-show the page with the user's entries kept. "Don't clear any form fields", passing or failing.

Error summary
- [MUST] "Always show an error summary when there is a validation error, even if there's only one", plus an error message next to each field.
- [MUST] Place it at the top of `main`, below breadcrumbs or back link and above the h1. Move keyboard focus to it.
- [MUST] Heading: "There is a problem". Each item links to its field and uses the same wording as the inline message. Multi-field questions (date) link to the first field with an error; radios/checkboxes link to the first option.
- [MUST] (implementation detail with evidence) `role="alert"` sits on an element *inside* the summary, not the root. Changed in v4.4.0 because JAWS wouldn't read the whole summary.

Error message writing
- [MUST] Specific message per failure type: empty, too long, too short, disallowed characters, wrong format.
- [SHOULD] Reuse the question's language: "How many hours do you work a week?" pairs with "Enter how many hours you work a week".
- [SHOULD] Instructions for empty fields ("Enter your name"); descriptions for invalid ones ("Name must be 35 characters or less").
- [MUST] Banned: "please", "sorry", "valid"/"invalid", "oops", "forbidden", "illegal", "you forgot", "prohibited", and generic messages like "An error occurred", "Select an option", "This field is required".
- [MUST] Don't use error messages for things the user can't fix (eligibility, permission, service down). Send them to a separate page explaining what to do next.
- [MUST] Add a visually hidden "Error:" prefix to inline messages for screen reader users.
- [CONSIDER] Track how often each error appears and use that to redesign the journey.

Check answers
- [SHOULD] A single check-answers page right before confirmation for small to medium transactions. For very large ones, consider one at the end of each section.
- [MUST] A "Change" link per row, with visually hidden text naming what it changes.
- [MUST] After a change, "Continue" returns the user to the check page; "They should not need to go through the rest of the transaction again." If the change triggers new questions, ask those first. Show skipped optional questions as "Not provided".

Text input
- [MUST] Don't use placeholder text as a label, hint or example. Reasons: "it vanishes when the user starts typing", which hurts users with memory conditions and anyone reviewing answers; "not all screen readers read it out"; and browser default placeholder styles can fail WCAG 1.4.3.
- [SHOULD] Size inputs to the expected content: "Postcode inputs should be postcode-sized, phone number inputs should be phone number-sized."
- [MUST] `autocomplete` on fields with a known purpose (WCAG 1.3.5, AA).
- [SHOULD] `spellcheck="false"` for reference numbers, names, emails, NI numbers.
- [MUST] Avoid `type="number"`. Use `type="text" inputmode="numeric"` (whole numbers) or `inputmode="decimal"`, and plain `type="text"` if negatives are allowed, since some keypads can't enter a minus sign.
- [SHOULD] Prefixes/suffixes (£, kg) sit outside the input, aren't the only carrier of meaning (screen readers don't read them), and validation must accept the user typing the symbol themselves.

Buttons
- [SHOULD] "Disabled buttons have poor contrast and can confuse some users, so avoid them if possible. Only use disabled buttons if research shows it makes the user interface easier to understand."
- [MUST] Prevent double submission client-side (`data-prevent-double-click`) *and* on the server. Rationale includes users with hand tremors and slow connections.
- [SHOULD] One default (primary) button per page: "Having more than one main call to action reduces their impact."
- [SHOULD] Sentence case labels that describe the action ("Save and continue", "Add another address").

Notification banner
- [SHOULD] Use sparingly ("people often ignore them"). Not for validation errors. Never show a banner and an error summary on the same page.
- [SHOULD] At most one banner per page; combine messages or show only the highest priority. Place it immediately before the h1.
- [SHOULD] The green "Success" banner confirms something the user expected, and is removed when they move to a new page. In linear journeys, use a confirmation page instead.

Type
- [CONSIDER] Body text is 19px / 25px line height on all screen sizes. Every line height is a multiple of 5px for vertical rhythm. Headings shrink on screens ≤640px (48→32, 36→27, 24→21).

### Research evidence
- The Carer's Allowance team removed a 12-step progress indicator and saw no effect on completion rates or times (cited on the question pages page; the original blog post wasn't fetched).
- Error-message guidance "tested with all types of users in live services, including tax credits". Users understood what went wrong, knew how to fix it, and recovered.
- `type="number"` problems found by the team (technology.blog.gov.uk, 2020-02-24): Dragon users couldn't dictate into or select the field (reproduced in Dragon 13 and 15); NVDA announced it as unlabelled with unlabelled spin buttons; Chrome silently discards letters except "e"; Chrome 79 shows very large numbers in exponential form; older Safari rounds values of 16+ digits; scroll wheel and arrow keys change values by accident. Fix: `<input type="text" inputmode="numeric" pattern="[0-9]*">`, with `pattern` kept for older iOS.
- Prefix/suffix design "has tested well", but "some users have been observed clicking on prefixes."
- "Testing on GOV.UK has shown that using green as the colour of start buttons improved click-through rates."
- Banner blindness cited from Nielsen Norman Group; GOV.UK says more research is needed on AT users skipping straight to the h1.
- Submit-time validation is long-proven (e.g. passport renewal). GOV.UK openly asks for evidence on whether omitting `required` causes problems for screen reader users, so treat that point as unsettled.

### Where it goes beyond Apple / conflicts
- **Apple silent here:** multi-page form architecture, error summaries, check-answers, back-button integrity, page `<title>` error prefix, `inputmode`, `autocomplete`, double-submit protection, which error words to ban. Add these as web-form checks layered on Apple's input guidance.
- **CONFLICT (soft): one-thing-per-page vs. Apple's single scrolling form.** iOS Settings-style grouped forms put many fields on one screen. GOV.UK wins for infrequent, high-stakes transactions done by the general public; Apple's grouped forms win for settings and frequent edits by people who know the domain. The skill should ask which one the screen is before flagging either way.
- **CONFLICT (soft): disabled buttons.** Apple's patterns commonly disable "Done"/"Save" until input is valid. GOV.UK (and Primer, below) say avoid it because it doesn't tell users what's missing. Suggested resolution: on native, Apple's disabled-until-valid is fine for one or two obvious fields; for longer forms, flag a disabled submit as a GOV.UK/Primer concern.
- **Adds to Apple:** placeholder-as-label is banned by GOV.UK, Primer and Polaris alike. Apple's text field guidance allows placeholder hints; the skill can keep that but flag placeholder-only labelling.

### Distinctiveness lessons
- GOV.UK has a strong identity with almost no decoration: big 19px body, heavy black headings, left-aligned everything, a green start button, a thick yellow focus ring. Identity comes from conviction about type size and plain language, not from gradients or cards. A useful prompt for reviewers: "What would this product look like if it committed to one typographic decision as hard as GOV.UK commits to 19px body?"
- Content voice ("There is a problem", "Enter your name") is part of the brand. Products can get identity from consistent, opinionated copy rules.

### Web/native translation
- Web: everything above applies directly. React/Next/Vue/Angular form libraries often default to live validation on change and native `required` bubbles; flag both.
- Native (SwiftUI): the "Error:" title prefix maps to posting an accessibility announcement or moving VoiceOver focus (`AccessibilityFocusState`) to the first error. The error summary maps to a top-of-form error section that receives focus. `inputmode` maps to `.keyboardType(.numberPad/.decimalPad)` plus `.textContentType` (the `autocomplete` equivalent).
- React Native/Expo: `keyboardType`, `textContentType`/`autoComplete`, `AccessibilityInfo.announceForAccessibility` or setting accessibility focus on the summary.

### Overused / now-generic
- Not much of GOV.UK's look has been copied into AI output, but "one question per page" wizards have spread into onboarding flows where they add taps without helping (e.g. a 9-screen signup for a free app). Flag wizards for low-stakes, frequent tasks.
- Stepper/progress bars across the top of multi-step flows are a slop tell; GOV.UK's own evidence says they often add nothing.

### Slop tells (our inference)
- Placeholder-only fields; red "This field is required" under every empty field; errors that fire on first keystroke; "Oops! Something went wrong"; `type="number"` for card, phone or ID fields; asterisks on every field; disabled "Submit" with no hint why; errors that wipe the form.

---

## GOV.UK Service Manual + Government Design Principles + NHS content (https://www.gov.uk/service-manual, https://www.gov.uk/guidance/government-design-principles, https://service-manual.nhs.uk/content/how-we-write)

**Why it matters.** It's the process side: how to decide what to ask, and how to test with assistive tech. Apple's HIG gives principles; this gives a testing matrix and a question-by-question justification method.

### Key principles / checks
- [SHOULD] **Question protocol** (`/service-manual/design/form-structure`): before adding any question, know that you need it, why, what you'll do with it, which users must provide it, how you'll check it's accurate, and how you'll keep it up to date and secure. The protocol "forces you (and your organisation) to question why you're asking users for each item of information."
- [SHOULD] Order questions so ineligible users find out first. Use branching so people only see what's relevant.
- [CONSIDER] Date of birth is best captured as 3 text fields (the manual says so; no evidence given on the page).
- [MUST] **Assistive tech test matrix** (`/service-manual/technology/testing-with-assistive-technologies`, updated 24 May 2022), minimum before public beta:
  - JAWS 2019 or later + Chrome or Edge
  - NVDA latest + Chrome, Firefox or Edge
  - VoiceOver iOS + Safari
  - TalkBack + Chrome
  - Windows Magnifier or Apple Zoom + any browser
  - Dragon 15 or later + Chrome
  - Also recommended: Firefox with JAWS, NVDA, Dragon; VoiceOver macOS + Safari; ZoomText; Windows High Contrast mode.
- [MUST] Magnifier tests: "at least 4 times magnification"; check label–field spacing and that users are told about changes outside the viewport (modals, errors).
- [SHOULD] Speech recognition tests: reach every feature by voice, activate every control, dictate into every field.
- [SHOULD] Issue logging: confirm you're using the AT correctly, rule out known AT/browser bugs, record versions, rate severity.
- **Government Design Principles** (11): Start with user needs; Do less; Design with data; Do the hard work to make it simple; Iterate. Then iterate again; This is for everyone; Understand context; Build digital services, not websites; Be consistent, not uniform; Make things open; Minimise environmental impact.
- [SHOULD] NHS writing: "We aim for a reading age of 9 to 11 years old"; fallback "make sure that an 11 to 14-year old will understand." Sentences up to 20 words; paragraphs up to 3 sentences. No metaphors. Plain term first, medical term in brackets: "piles (haemorrhoids)". Replace vague timeframes ("a long time") with specific figures.

### Research evidence
- NHS cites research that "most people prefer to read plain English" and "the more specialist a person's knowledge is, the greater their preference" (via a 2014 GDS blog post). This answers the common objection that expert users want jargon.
- The AT page cites a 2016 GOV.UK AT survey and WebAIM survey 9 but publishes no percentages.

### Where it goes beyond Apple / conflicts
- **Apple silent here:** a named AT/browser matrix, speech-recognition testing (Dragon/Voice Control), magnifier testing at 4x, and a reading-age target. Apple covers VoiceOver and Voice Control capabilities but not a release-gating test protocol.
- No real conflicts. "Be consistent, not uniform" is a good frame for the skill's own aim of not making everything look Apple.

### Distinctiveness lessons
- "Be consistent, not uniform" means consistency of behaviour and language, not identical visuals. That's the line the skill should hold: Apple consistency for behaviour, freedom for visual identity.

### Web/native translation
- For native iOS/macOS, swap the matrix to VoiceOver (iOS, macOS), Voice Control, Switch Control, Zoom at 4x+, Dynamic Type at the largest accessibility sizes. For web, keep the matrix as written. React Native needs both TalkBack and VoiceOver.

### Overused / now-generic
- Nothing visual. "Reading age" targets get misused as a reason for condescending, chatty copy; the NHS rules are about short, specific words, not friendliness.

### Slop tells (our inference)
- Forms asking for fields nobody uses (phone number "for security", job title on a consumer signup). Accessibility claims based only on an automated linter run.

---

## IBM Carbon (https://carbondesignsystem.com, current site 2026)

Pages fetched: `/elements/motion/overview/`, `/elements/typography/overview/`, `/elements/2x-grid/overview/`, `/components/data-table/usage/`, `/components/notification/usage/`, `/patterns/empty-states-pattern/`, `/patterns/forms-pattern/`, `/data-visualization/color-palettes/`, `/data-visualization/dashboards/`.

**Why it matters.** It's the most complete guidance for dense enterprise UI, and it formalises a split Apple only implies: **productive** (task, quiet, fast) vs **expressive** (moments, brand, larger). That split is a ready-made tool for distinctiveness: a product can be calm in its working surfaces and loud in a few chosen places.

### Key principles / checks

Motion
- [SHOULD] Two modes. Productive: "creates a sense of efficiency and responsiveness", subtle, used while users complete tasks. Expressive: "enthusiastic, vibrant, and highly visible movement", reserved for significant moments like opening a new page or pressing the primary action.
- Easing (verbatim cubic-bezier):

| | Productive | Expressive | Use |
|---|---|---|---|
| Standard | (0.2, 0, 0.38, 0.9) | (0.4, 0.14, 0.3, 1) | element visible throughout (expanding tiles, sorting rows) |
| Entrance | (0, 0, 0.38, 0.9) | (0, 0, 0.3, 1) | entering |
| Exit | (0.2, 0, 1, 0.9) | (0.4, 0.14, 1, 1) | leaving view (closing modal, toast) |

- [SHOULD] Exception: if an element leaves but stays nearby to be recalled (side panel), use *standard* easing, not exit.
- Duration tokens: fast-01 70ms (buttons, toggles); fast-02 110ms (fades); moderate-01 150ms (small expansions, short moves); moderate-02 240ms (expansion, system communication, toasts); slow-01 400ms (large expansions, important notifications); slow-02 700ms (background dimming).
- [SHOULD] Duration scales with distance or size change, on a non-linear scale. Productive is "significantly faster" than expressive.

Typography
- [SHOULD] Productive type set (`-01` suffix) for product UI uses **fixed** headings. Expressive set (`-02`) for editorial/marketing uses **fluid** headings that change per breakpoint.
- Scale formula, from 12px: `Xn = Xn-1 + {INT[(n-2)/4] + 1} * 2` → 12, 14, 16, 18, 20, 24, 28, 32, 36, 42, 48, 54, 60, 68, 76, 84, 92. Steps grow by 2px, then 4, then 6, then 8: tight at small sizes, wider at display sizes.
- [CONSIDER] Plex Light, Regular, SemiBold for digital; SemiBold for section headers, not long text; italics for emphasis only.

2x Grid
- "The basic unit of 2x Grid geometry is the 8-pixel square mini unit." Everything divides or multiplies by two.
- Breakpoints: sm 320 (4 cols, 0 margin), md 672 (8 cols), lg 1056 (16 cols), xlg 1312 (16), max 1584 (16, 24px margin). Padding 16px everywhere, total gutter 32px.
- [SHOULD] "Always place type against the padding." "Never place type on the padding."
- [CONSIDER] Constrain boxes to 1:1, 2:1, 2:3, 3:2, 4:3, 16:9 when possible. Fixed sizes: 8, 16, 24, 32, 48, 64, 80.

Data tables
- Row heights: xs 24px (highly dense), sm 32px (compact), md 40px (default), lg 48px (spacious), xl 64px (multi-line rows).
- [SHOULD] Header, toolbar, batch-action bar and pagination heights match row height (xl tables use lg for batch bar and pagination).
- [SHOULD] Toolbar: global actions only, no more than five; rest in overflow.
- [SHOULD] Selecting a row reveals a batch-action bar; while active, disable per-row actions and overflow menus.
- [SHOULD] Only the sorted column shows a sort icon; unsorted icons appear on hover.
- [SHOULD] Column titles one or two words, sentence case; wrap to two lines then truncate with tooltip.
- [SHOULD] Fewer than three row actions → inline icon buttons; otherwise overflow.
- [SHOULD] Skeletons over spinners when extra load time is expected. Row hover always on.

Forms (Carbon's pattern)
- Validate client-side "as soon as the field loses focus" (on blur).
- Mark the minority: if most fields are required, mark only optional ones "(optional)", and vice versa.
- Placeholder allowed for short, non-essential examples (e.g. date format), never as label; complex rules (passwords) go in an infotip.
- Single column (cites NN/g: multicolumn forms "are more prone to misinterpretation").
- Input height 40px default; 32px between fields on full pages, 24 or 16px in contained forms; 48px before the buttons.
- Buttons: left-align on in-page forms; right-align in multi-step forms (primary right of secondary); full-width bleed in dialogs and side panels.
- Disable primary on *short* forms until requirements are met, not on long forms; always disable during submission.
- Dialog for fewer than five inputs; side panel for more than five. No accordions or tabs inside dialogs/side panels.

Notifications
- Four kinds: inline (task flow, near the item or "just above the submission and cancel buttons"), toast (non-modal, time-based, short non-critical feedback), actionable (needs resolution; one action only), callout (loads with the page, info needed before acting; no success/error).
- [SHOULD] Toasts persist by default; can auto-dismiss "after five seconds". Inline doesn't auto-dismiss.
- [SHOULD] Body "one or two short sentences"; toast/inline two lines or fewer. Titles without periods; body doesn't repeat the title.
- [SHOULD] Actionable notifications take focus, action first, Esc closes. "When in doubt, use low-contrast notifications."

Empty states
- Types: no data (first use), user action (no search results, process complete), error management (permissions, config). Richer options: inline documentation, onboarding, starter content.
- [SHOULD] Positive title ("Start by adding data assets", not "You don't have any data assets"); say what will appear; one main action; no dead ends; no jokes, "especially in error states".
- [SHOULD] Left-align the block (except small tiles). Drop illustrations when space is limited or when several empty states may appear together (e.g. multiple failed widgets). Illustrations are decorative: empty alt.

Data viz and dashboards
- [SHOULD] Categorical palette applied "in sequence strictly": 14 colors ordered to maximise contrast between neighbours (01 Purple 70 #6929c4, 02 Cyan 50 #1192e8, 03 Teal 70 #005d5d, 04 Magenta 70 #9f1853, 05 Red 50 #fa4d56 ...).
- [SHOULD] Sequential: "In light themes, the darkest color denotes the largest values"; dark themes reverse it. Diverging palettes don't change between themes. "Never use a gradient in place of a sequential palette."
- Alert colors kept separate from data: Red 60 danger, Orange 40 serious warning, Yellow 30 warning, Green 60 success.
- Dashboards split into **presentation** (status at a glance: rank data by importance, most important gets highest contrast and largest area, limit metrics, F-pattern) and **exploration** (shared layout and legend position across charts, linked charts mirror filter and zoom, don't switch units).
- White space increases comprehension "by almost 20 percent" (Carbon citing Human Factors International; original study not fetched).

### Research evidence
- Carbon is mostly expert opinion; its cited evidence is borrowed (NN/g on multicolumn forms and tooltips; Wroblewski on accordion forms; HFI on white space). Treat Carbon numbers as system specs, not findings.

### Where it goes beyond Apple / conflicts
- **Adds to Apple:** named productive/expressive split with exact easing and durations. Apple favours spring animations and says little about two registers; Carbon's split can sit on top of Apple's springs as a decision rule (which moments get the expressive treatment).
- **Adds to Apple:** dense table spec (five row heights, toolbar/batch bar rules). Apple's `Table` guidance on macOS is thin and iPad tables barely covered.
- **Adds to Apple:** data-viz palette ordering and dashboard types; Swift Charts guidance covers marks, not palettes or dashboard composition.
- **CONFLICT: row heights below Apple's touch target.** Carbon's 24px and 32px rows go below Apple's 44pt minimum hit target on iOS/iPadOS. On macOS and pointer-driven web, compact rows are fine (macOS itself uses compact rows). The skill should only accept xs/sm density on pointer-first platforms, and keep 44pt on touch.
- **CONFLICT between sources (not with Apple):** Carbon validates on blur and allows example placeholders; GOV.UK validates on submit and bans placeholders. Note as a known disagreement. Primer's middle position (below) is a sensible default.

### Distinctiveness lessons
- The productive/expressive split is the most useful single idea here for identity: let the working surfaces be calm and fast, and spend boldness only on two or three moments (first run, primary action, completion). AI slop does the opposite: uniform medium-intensity animation and gradients everywhere.
- Carbon's own look (square corners, 2x grid, Plex, flat tiles, no shadows) shows that a large system can have a strong identity without rounded cards. It is distinctly not Apple, and still very usable.
- An irregular type scale (the +2/+4/+6/+8 formula) gives a different rhythm from a modular ratio. Reviewers can ask: does this product have its own scale logic, or the default Tailwind steps?

### Web/native translation
- Web: easing values drop straight into CSS `transition-timing-function`. SwiftUI: `.timingCurve(0.2, 0, 0.38, 0.9, duration: 0.24)` reproduces productive standard; keep springs for direct manipulation per Apple.
- Density: map Carbon's sizes to `controlSize`/list row insets on macOS; on iOS stay at or above 44pt.

### Overused / now-generic
- Carbon-style KPI tiles across the top of a dashboard (four big numbers with sparklines) are now the default AI dashboard. Carbon itself says limit metrics and rank by importance; flag "four equal KPI cards" with no hierarchy.
- Zebra striping plus hover plus borders all at once.
- Generic empty state with a centred line illustration, "No items yet", and a button: Carbon explicitly prefers left-aligned blocks and text-only in tight spaces.

### Slop tells (our inference)
- Every animation the same 300ms ease-in-out; table rows at 56–64px with one line of text; a 10-color rainbow chart; random categorical colors that change between charts on the same dashboard; sort arrows shown on every column.

---

## Shopify Polaris (archived docs: https://github.com/Shopify/polaris-react-archive, `polaris.shopify.com/content/`; live site now redirects to https://shopify.dev/docs/api/polaris)

Note: polaris.shopify.com style-guide URLs now 301 to shopify.dev, which is component API docs only. The guidance below comes from the archived repo's MDX (Polaris v12 era, ~2024). Treat it as the last published Polaris guidance; the toast component is marked deprecated in favour of App Bridge Toast.

**Why it matters.** Polaris documents a "pro" admin language for people who use the tool all day, with explicit density modes, concrete microcopy rules and chart thresholds. It's useful where Apple's guidance leans consumer.

### Key principles / checks

Density and the "pro" language (`design/pro-design-language.mdx`, `design/layout/density.mdx`)
- "The admin is high density by default, but the level of density can range depending on the merchant's task."
- [SHOULD] High density for index pages, tables and action components (option lists, popovers): "Always offer the most condensed option possible" in action components; don't suddenly change density inside one.
- [SHOULD] Low density for focused editing (product detail): larger targets, wordier buttons, top-to-bottom rhythm. Split contexts into separate cards; don't mix a low-density block with a high-density component in the same card.
- [SHOULD] In dense components, separate zones with surface color instead of lines where possible. Use grid/vertical divisions only for selection or data viz, not for focused editing.
- "Craft juicy interactions": hover is "smooth and unobtrusive", while click feedback "feels more dramatic and visceral" (position and lighting shift like a physical button).

Motion (`design/motion/*`)
- [SHOULD] Don't animate all elements at once: "Animating a single element is often enough." Don't stagger items in navigation transitions. Motion direction must match navigation direction (right-to-left going deeper).
- [SHOULD] No static loading indicators (they "make the system seem unresponsive").

Error messages (`content/error-messages.mdx`)
- [MUST] Be specific ("exact numbers and dates, or even the merchant's own data"). Avoid "invalid". Don't bring in "us"/"we" unless Shopify caused the problem.
- [SHOULD] Red for critical issues needing immediate action; yellow for errors that are part of daily workflow or warnings.
- Examples (verbatim):
  - Do: "To save this product, make 2 changes: Enter title / Add weight". Don't: "There are 2 errors on this page. Invalid title..."
  - Do: "Couldn't deposit payout / The bank account we have on file was closed. Update your details, and we'll retry automatically. / Update bank account". Don't: "Invalid bank account ... Next".
  - Do: "Connection timed out". Don't: "Sorry, the connection time out. Try again later."
  - Errors without solutions — Do: "Something went wrong. Refresh your browser to try again." Don't: "Sorry, something went wrong. Learn more."

Toast (deprecated component docs)
- [SHOULD] Message pattern noun + verb: "Product updated", "Collection added", "Connection timed out". Don't: "Your product has been successfully updated", "Discount: Saved successfully".
- [MUST] Toast with action persists at least 10,000 ms. Action is one verb ("Undo", "Retry", "View"), never "OK", "Got it", "Dismiss", "Cancel".
- [MUST] Not for critical information: toasts disappear automatically, can't easily be reached by keyboard, and may appear far from the user's focus. Implemented with `aria-live="assertive"`.

Banner
- [SHOULD] Sparingly; don't use a banner to tell people what to do when the UI itself could make the action clear; dismissible unless critical. Page banners sit below the page header; section banners inside the section.

Empty state
- [SHOULD] Full-page empty state only (not for individual widgets); one primary CTA; "never make merchants feel unsuccessful or guilty."

Tables
- [MUST] Data table: numbers right-aligned, text left-aligned, headers aligned with their data, "Don't center align."
- [SHOULD] "Wrap instead of truncate content. This is because if row titles start with the same word, they'll all appear the same when truncated."
- [SHOULD] Summary row for column totals, but no calculations in it.
- [SHOULD] Index table headings say when the list is partial ("Popular products this week", not "Products"). Bulk actions follow verb + noun.

Forms
- [SHOULD] "Validate input as soon as merchants have finished interacting with a field (but not before). If a field already has an error, validate and remove errors as merchants type."
- [SHOULD] Placeholder only for a "short, non-essential hint"; label optional fields "Optional".

Data viz (`design/data-visualizations.mdx`)
- [SHOULD] One question per chart ("What are my sales over time?"). Test with 1–2 data points and with 100+; check sparse (mostly zero) and spiky data.
- [SHOULD] Horizontal bars: don't use when data points can exceed 6 (use a table). Column charts: fewer than 30 points; over 31, use a line chart.
- [SHOULD] One color for all bars; negative bars at 60% opacity. Bar width about twice the gap.
- [SHOULD] Axis lines only where data appears; skip labels at regular intervals, don't slant them. Y-axis labels: no more than 3 numeric characters, 1 decimal or 1 letter ("k", "b"). Time "12am, 6pm"; days "Sun"; months "Feb"; "10 Apr"; "Apr 2011".
- [SHOULD] Comparison to past: current period purple, past period grey.

Sound (`design/sounds.mdx`)
- [SHOULD] Short sounds ≤250ms, long sounds ≤1 second; two versions (louder desktop, quieter mobile); always allow turning off; never the only channel. A sound pleasant once "may become irritating after ten, and unbearable after a hundred."

Accessibility and focus (`foundations/accessibility.mdx`)
- [MUST] "Don't programmatically move focus to new content without merchant input", except when the merchant can't continue their current workflow. Move focus on submit error to the error message; don't move focus for background updates.
- Cites: in the US "as many as 1 in 4 adults has at least 1 disability" (CDC); Canada 22%; worldwide closer to 1 in 7.

### Research evidence
- Little published research in the docs. The density and copy rules come from internal practice. The disability figures are external (CDC, Statistics Canada, World Bank).

### Where it goes beyond Apple / conflicts
- **Adds to Apple:** explicit density modes chosen per task, chart thresholds (6 bars, 30 columns), y-axis label limits, toast copy grammar and the 10-second minimum for actionable toasts. Apple doesn't have a toast component on iOS at all, so this fills a web/React Native gap.
- **Adds to Apple:** "wrap, don't truncate" in tables is a stronger stance than Apple's frequent tail truncation in lists; worth applying to data tables where rows share prefixes.
- **CONFLICT (minor):** "juicy", dramatic click feedback on primary buttons is more theatrical than Apple's restrained highlight states. Fine for a brand's primary action on web; on native, prefer Apple's system button feedback unless the product has a deliberate reason.

### Distinctiveness lessons
- Polaris v12 made a deliberate turn to a tactile, slightly skeuomorphic button with lighting and depth. It shows a big system choosing a recognisable material quality instead of flat defaults. The lesson for the skill is to ask whether the product has a material idea at all, not to copy Shopify's bevels.
- Density as an identity decision: a product can be confidently dense where users are professionals.

### Web/native translation
- Toast rules apply to React Native/Expo and web snackbars. On iOS, prefer inline confirmation or the result itself over a toast (see Primer below).
- `aria-describedby` for inline errors ↔ SwiftUI `.accessibilityHint` or grouping the error with the field.

### Overused / now-generic
- The Polaris-style admin (left nav, page title with primary button top right, stacked white cards on grey) is the template behind countless SaaS dashboards and a large share of AI-generated admin UI. Flag "cards on grey with a top-right primary button" as generic unless the product's content calls for it.
- Bevelled "3D" buttons copied from Polaris v12 are becoming a trend tell.
- Noun + verb toasts ("Product updated") are fine copy, but toasts for every save are overused.

### Slop tells (our inference)
- Centred numbers in tables; truncated row titles that all start "Summer collection…"; charts with slanted x-axis labels; 12-bar horizontal charts that should be tables; "Successfully saved!" toasts.

---

## GitHub Primer (https://primer.style, 2025–2026)

Pages fetched: `/accessibility` (index), `/accessibility/patterns/placeholders/`, `/accessibility/patterns/accessible-notifications-and-messages/`, `/product/ui-patterns/forms/`, `/product/ui-patterns/saving/`, `/product/ui-patterns/loading/`.

**Why it matters.** Primer is the most explicit about accessibility trade-offs in app-like web UI, and it takes positions against popular patterns (toasts, disabled buttons, live-region validation). It also gives concrete loading-time thresholds.

### Key principles / checks

Toasts
- [MUST] "Toasts pose significant accessibility concerns and are not recommended for use." "Toasts are an over-used interaction pattern on the web."
- Problems listed: large displays, distraction, blocking UI, screen magnification, working memory, banner blindness, disconnection from the action, accidental dismissal; WCAG 2.2.1 (must be extendable indefinitely), 1.3.2, 2.1.1, 4.1.3.
- [SHOULD] Alternatives by case:
  - Simple successful action: the result itself is the feedback (the new issue appears in the list). A toast "may ironically lessen a sense of trust."
  - Complex success (bulk create): a banner summarising what was done, or content appearing progressively.
  - Failure: a persistent banner, or a dialog when the user must be interrupted.
  - Long-running tasks: banner on completion or failure; consider email, notifications or push.
  - Out-of-sync state: banner or dialog prompting refresh.

Forms
- [SHOULD] Validation: default on submit. For a field, validate only after the user has changed it and "removed focus from the input". Once invalid, re-validate as they type so the error clears early. After a failed submit, switching to inline is OK.
- [SHOULD] Show a loading indicator if validation may take more than 1 second.
- [MUST] Required fields visibly marked *and* set required in code. Login-style forms are the exception.
- [SHOULD] Three or more errors → interactive summary in a banner at the top linking to each field. Fewer → focus the first invalid input and scroll it into view.
- [MUST] `aria-describedby` for errors, `aria-invalid=true` on invalid inputs. "Don't use live regions for form validation; use focus management instead."
- [SHOULD] Don't disable submit buttons: they "don't show users what they need to do". If the form can't save, keep it enabled with a read-only notice, and show a dialog on submit.
- [MUST] Placeholder is "never an acceptable substitute for a label".
- [SHOULD] Stack controls vertically; "Don't use multi-column layouts just to reduce vertical space." Size inputs to expected length.

Placeholders (a11y pattern)
- [SHOULD] "Avoid using placeholders" where possible. Reasons beyond GOV.UK's: darkening placeholder text to pass contrast makes it look like pre-filled input; width truncates it at large font sizes; it can't hold links; without a label, AT falls back to it as the name. Control placeholder colour with a token so it works in every theme.

Saving
- [SHOULD] Start with explicit saving. Don't mix explicit and automatic saving in one form, and avoid mixing on one page.
- [MUST] Text inputs, checkbox groups, radio groups, native selects and multi-selects use explicit save. Reasons: autosave can submit sensitive input by accident, leaves users unsure whether a choice saved, and applies choices screen reader users didn't mean (arrow keys in a native select change the value).
- [SHOULD] Autosave only for imperative controls: toggle switches, segmented controls, custom single-select menus. Saved state must be clear without relying only on visuals that could be mistaken for validation.
- [SHOULD] A menu that only lists options has no save button; once it gains search, filters or tabs, treat it like a dialog with submit/cancel.
- Feedback: no page refresh → InlineMessage; refresh/redirect → Banner; "avoid toasts".

Loading
- [SHOULD] Under 1 second: "Don't show a loading state" (a flash makes it feel slower). 1–3 s: indeterminate. 3–10 s: determinate where possible. Over 10 s: determinate, and run it as a background task if possible.
- [SHOULD] Skeleton for large areas of content; spinner elsewhere.
- [MUST] Status messages via `role="status"`/`aria-live` on an element that is *always in the DOM*; one announcement per group of skeletons; announce result counts after filtering ("5 items match the filter"); `aria-busy` during partial updates.

### Research evidence
- Primer frames positions through WCAG criteria and AT behaviour rather than usability studies. The page index includes a "Scenarios Framework" and an annotation toolkit for design→engineering handoff (not fetched in detail).

### Where it goes beyond Apple / conflicts
- **Adds to Apple:** concrete loading thresholds (1/3/10 s), explicit vs automatic saving rules per control type, and a reasoned case against toasts. Apple doesn't ship toasts on iOS and generally favours in-place feedback, so Primer and Apple agree here; Primer gives the reasoning the skill can cite when reviewing React Native or web apps that bolt on toast libraries.
- **CONFLICT (soft): autosave.** Apple's Settings and macOS preferences apply changes immediately, including for some text fields and pickers. Primer says text inputs and selects should be explicitly saved on the web. Resolution: on Apple platforms, follow Apple's immediate-apply convention for preferences; on web, follow Primer, especially for sensitive fields.
- **CONFLICT (soft): disabled submit buttons**, same as GOV.UK above.
- **Agrees with GOV.UK against Carbon:** no early validation; no placeholder-as-label.

### Distinctiveness lessons
- Primer's identity is restraint: monospace touches, small type, few colours, feedback that sits in the content. It shows that "no toast, the result is the feedback" can itself feel like a confident product voice.

### Web/native translation
- Loading thresholds apply everywhere. SwiftUI: delay showing `ProgressView` until ~1 s; use `.redacted(reason: .placeholder)` for skeletons.
- Explicit vs auto save maps to iOS sheets with Cancel/Done (explicit) vs Settings toggles (auto).

### Overused / now-generic
- Toast libraries (react-hot-toast, sonner) on every action are one of the strongest AI slop tells today; Primer gives the formal reason to flag them.
- Skeleton loaders for content that loads in under a second.

### Slop tells (our inference)
- "Saved!" toast after editing a single field; skeleton shimmer that flashes for 200ms; save buttons on dropdown menus; mixed autosave and Save button in one settings form.

---

## Atlassian Design System (https://atlassian.design, 2025–2026)

Pages fetched: `/foundations/content/designing-messages/`, `.../error-messages`, `.../empty-state`, `/foundations/content/language-and-grammar`, `/components/flag/usage`, `/foundations/spacing`.

**Why it matters.** The most detailed content standards of the product systems: message taxonomy, grammar rules you can lint, and a distinction between empty state and blank slate.

### Key principles / checks
- Five message types, each tied to a purpose: information (explain), error (fix), success (celebrate), warning (anticipate), feature discovery (introduce).
- Component choice: banner = critical system-level (data loss, lost function), top of screen, pushes content down; flag = event-driven confirmations, bottom left; section message = above the affected area; inline message = required action or important info; modal = short task; spotlight = teach a feature.
- [MUST] "Never use auto dismiss flags for any critical warning or error messages." Never mix dismissible and non-dismissible flags in one stack. Flags stay visible above an open modal. Max two links per flag. "Learn more" link text discouraged.
- Error messages:
  - [SHOULD] Title three to four words (not counting articles); no instructions in the title.
  - [SHOULD] Body: reason, action, consequence of not acting; one or two sentences; don't repeat the title; if cause unknown, don't guess.
  - [SHOULD] Multiple possible causes: most likely cause or simplest fix first, backup (contact support) second.
  - [MUST] Avoid "sorry" (makes errors seem more severe), "please" (makes required steps sound optional), "OK" as a CTA. Use "you" rather than "we".
  - [SHOULD] CTA: one or two words, imperative verb describing the outcome, plus a dismiss/cancel option.
- Empty states:
  - **Empty state** = after the user completed or cleared something (empty inbox). **Blank slate** = feature not yet used. Different copy for each.
  - [SHOULD] "Delight with restraint": messages that appear often should be shorter and less playful; use several concise variants for repeated ones. Humour only lightly, and only where appropriate.
- Grammar (lintable):
  - [SHOULD] Sentence case for titles, headings, menu items, labels, buttons. No articles in buttons ("Create password", not "Create a password").
  - [SHOULD] Avoid "e.g.", "i.e.", "etc.", "&" (localisation and AT). Use "then", not ">", between UI steps.
  - [SHOULD] Digits for numbers; "to" for ranges; "Step 1 of 2", not "1/2"; commas from 1,000.
  - [SHOULD] No exclamation marks in UI copy, "never more than one per page". No question marks in headings (rephrase as a statement); no gerunds in UI copy.
  - [SHOULD] Lists six items or fewer.
  - [SHOULD] "Avoid truncation. Shorten or wrap the text instead"; if unavoidable, full text in a tooltip.
- Spacing: 8px base, tokens 0/2/4/6/8/12/16/20/24/32/40/48/64/80. Small 0–8 (badges, table cells, input padding), medium 12–24 (buttons, avatars), large 32–80 (layout). [SHOULD] Make optical adjustments rather than apply values mechanically.

### Research evidence
- Not published on these pages; it's practice-based guidance.

### Where it goes beyond Apple / conflicts
- **Adds to Apple:** a full message taxonomy across components, lintable grammar rules, title word limits, and the empty-state/blank-slate split. Apple's writing guidance is shorter and less prescriptive.
- **CONFLICT (minor): capitalisation.** Apple uses title case for many UI labels (menu items, buttons on macOS) per its own style. Atlassian, GOV.UK and Carbon use sentence case. On Apple platforms keep Apple's convention; on web, either works but must be consistent. Flag mixed casing, not the choice itself.

### Distinctiveness lessons
- Copy rules give identity cheaply. "Delight with restraint" is a good rule against slop: playfulness belongs in rare, big moments.

### Web/native translation
- Flag placement (bottom left, from the nav) is Atlassian-specific; on iOS, don't copy it. The taxonomy (which component for which message type) transfers everywhere.

### Overused / now-generic
- Spotlight/coach-mark tours for new features are overused in AI-built onboarding. Atlassian limits them to key features; flag multi-step tours on first launch.
- Playful empty states with jokes ("Nothing to see here! 🎉") everywhere; Atlassian says the opposite for frequent states.

### Slop tells (our inference)
- "Oops!" and exclamation marks in error copy; "Learn more" links; Title Case Headings On Web Mixed With sentence case; "e.g." in helper text; empty state that's the same illustration on every screen.

---

## Adobe Spectrum (https://spectrum.adobe.com, 2025–2026)

Pages fetched: `/page/color-system/`, `/page/color-fundamentals/`. `/page/platform-scale/` now returns the Spectrum hub landing page; `/page/toast/` returned 404 (site reorganised for Spectrum 2).

**Why it matters.** Spectrum generates its palette from **target contrast ratios** rather than picking hex values by eye. That is a rigorous method Apple doesn't publish, and it's a way to build a custom, non-Apple palette that still passes contrast in every theme.

### Key principles / checks
- "Spectrum colors are generated using the Leonardo color tool, by plugging in hues and hue ranges through key colors", "combined with target contrast ratios for each color". Lightness stops are then set to produce aliased tokens.
- Scales indexed 100–1600; 15 hue rows × 16 steps. The blue scale's stops run from 1.06:1 to 19.5:1 contrast.
- [SHOULD] Light theme: icons/illustrations use the 900 index; two-tone backgrounds use 100. Dark themes: pick 700–1200 by desired lightness/saturation.
- [MUST] Yellow, orange, chartreuse and celery backgrounds take black text, not white.
- [MUST] "do not use color alone as a method of communication"; feedback colours need "an accompanying label and/or icon".
- Platform scale (unverified, from memory): Spectrum defines a "medium" scale for desktop and a "large" scale for touch, with large components about 1.25× medium. Couldn't confirm on the current site.

### Research evidence
- None on these pages; the rigour is in the method (contrast-targeted generation).

### Where it goes beyond Apple / conflicts
- **Adds to Apple:** Apple gives system colours and says to check contrast; Spectrum gives a method for generating a brand palette where each step's contrast is fixed in advance, so every theme stays compliant. Use this when a product wants its own palette instead of system blue.
- No conflict.

### Distinctiveness lessons
- This is the cleanest route to "not looking Apple" without losing accessibility: pick your own key colours, generate by contrast target (Leonardo is open source), and map tokens by role.

### Web/native translation
- Web: CSS custom properties per theme. SwiftUI: asset catalog colours with light/dark/high-contrast variants generated from the same contrast targets.

### Overused / now-generic
- Not visually copied much. The common slop failure is the opposite of Spectrum: one brand hex plus Tailwind opacity steps, which breaks contrast in dark mode.

### Slop tells (our inference)
- White text on yellow/orange badges; status shown only by colour dots; dark mode made by inverting the light palette.

---

## Synthesis: what Apple misses

These add to Apple; none replace it.

1. **Form architecture and error recovery (web).** Error summary with focus, "Error:" title prefix, kept input, check-answers with return, back-button integrity, question protocol. Apple is silent.
2. **Validation timing has a real cross-system consensus (except Carbon):** don't validate before the user finishes a field; validate on submit (GOV.UK) or on blur after a change (Primer, Polaris); once a field is in error, re-validate as they type. Carbon's on-blur-always is the outlier.
3. **Placeholder-as-label is banned by GOV.UK, Primer, Polaris and Carbon.** Apple allows placeholder hints; keep that, but flag placeholder-only labelling.
4. **Toasts:** Primer says don't; Polaris and Atlassian say never for critical info, 10 s minimum when actionable; Carbon allows 5 s auto-dismiss for non-critical only. Apple has no toast on iOS. Consensus check: no auto-dismissing toast for errors or anything with an action; prefer the result itself as feedback.
5. **Disabled submit buttons:** GOV.UK and Primer say avoid; Carbon allows on short forms. Apple commonly uses them. Flag as context-dependent.
6. **Loading thresholds:** <1 s nothing, 1–3 s indeterminate, 3–10 s determinate, >10 s background task (Primer).
7. **Density as a per-task decision** (Polaris high/low; Carbon 24/32/40/48/64 rows) with a hard floor of 44pt on touch per Apple.
8. **Two motion registers** (Carbon productive vs expressive, with numbers) as a rule for where boldness goes.
9. **Data-viz discipline:** one question per chart, bar/column count thresholds, axis label limits, palette ordered for neighbour contrast, presentation vs exploration dashboards.
10. **Process:** AT test matrix with versions, 4x magnification, speech recognition, reading age 9–11, sentence ≤20 words.
11. **Contrast-generated palettes** (Spectrum/Leonardo) for brand colour that isn't system blue.
12. **Copy rules that can be linted:** banned words ("please", "sorry", "invalid", "oops"), noun + verb toasts, 3–4 word error titles, ≤6 list items, one exclamation mark per page maximum.

**Conflicts to surface explicitly in the skill (not to resolve against Apple):** one-thing-per-page vs grouped forms; disabled-until-valid; autosave of text fields; compact row heights vs 44pt; title case vs sentence case; dramatic button feedback vs restrained system highlight.

**Distinctiveness, in one line per system:** GOV.UK (type conviction, plain voice), Carbon (productive/expressive split, square geometry), Polaris (material/tactile idea, density as identity), Primer (feedback lives in the content), Atlassian (copy taxonomy), Spectrum (own palette by contrast target).

**Patterns from these systems that are now generic slop:** left-nav + grey canvas + white cards + top-right primary button (Polaris admin); four equal KPI tiles with sparklines (Carbon dashboards); centred illustration + "No items yet" + button empty states; toasts for every save; skeleton shimmer for fast loads; top stepper bars on multi-step flows; first-run coach-mark tours; bevelled 3D buttons (Polaris v12 copycats).

## Sources not reachable
- GOV.UK Design Notes post on removing placeholder text (`designnotes.blog.gov.uk/2017/04/04/...`): 404; search didn't find it. Placeholder reasoning above comes from the live text input page instead.
- Carer's Allowance progress-indicator blog post: not found by search. The finding is cited from the GOV.UK question pages page; the original wasn't read.
- polaris.shopify.com style guide: now redirects to shopify.dev API docs. Used the archived GitHub repo (`Shopify/polaris-react-archive`).
- Spectrum `/page/platform-scale/` (now lands on the hub) and `/page/toast/` (404). Platform-scale figures are marked unverified.
- Atlassian flag auto-dismiss duration: on a separate `/components/flag/auto-dismiss-flag` page, not fetched. (Unverified, from memory: about 8 seconds.)
- Salesforce Lightning: not covered; the three chosen (Primer, Atlassian, Spectrum) had deeper non-obvious guidance for this scope.

## Open questions for skill design
1. Validation timing: adopt Primer's middle position (on blur after change, live once in error, summary after submit) as the web default, with GOV.UK's submit-only for public high-stakes forms? It needs a "form type" input to choose.
2. Should the skill ask up front for **audience/frequency** (public one-off vs daily professional)? Several conflicts (one-thing-per-page, density, disabled buttons, autosave) only resolve with that.
3. How hard should the toast rule be? Proposal: [MUST] no auto-dismiss for errors/actions; [SHOULD] prefer in-place feedback; on iOS flag any toast library as non-native.
4. Density: should the skill enforce "pointer-first only" for rows under 44pt, and what's the macOS floor (Apple's own compact list rows are smaller)?
5. Do we want a lintable copy checklist (banned words, casing consistency, exclamation count) as a separate automated pass? It's cheap and catches a lot of slop.
6. Productive/expressive: should the skill ask the product to name its 2–3 "expressive moments" and flag motion intensity outside them?
7. Carbon's numbers are specs, not research. Should the skill label specs vs evidence in its output so reviewers don't treat 40px rows as a law?
