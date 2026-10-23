# 03 — Content & Foundations digest

Scope: accessibility, inclusion, writing, icons, sf-symbols, app-icons, branding, privacy, right-to-left, voiceover, foundations.

Coverage notes:
- `foundations.md` is only an index page (lists Accessibility … Writing). It has no guidance of its own.
- `writing.md` (crawled later) is the primary source for the Writing section, merged with component-page rules (source slug cited per check).
- Severity tags follow Apple's verbs: "must/never/always/don't" → [MUST]; "prefer/avoid/use/make sure" → [SHOULD]; "consider/can/it works well" → [CONSIDER].

---

## Accessibility (source: accessibility)
- **Intent**: Interfaces should be intuitive, perceivable (no single channel carries information) and adaptable (they respect system settings and personalization). Apple frames this as reaching more people, with Accessibility Inspector and App Store Accessibility Nutrition Labels as the audit and disclosure tools.
- **Checks**:
  - Vision
    - [SHOULD] Text can grow to **at least 200%** (watchOS **140%**), through Dynamic Type or custom UI. Check that the layout reflows at the largest sizes and nothing truncates or overlaps.
    - [SHOULD] Custom type styles respect the default and minimum sizes: **iOS/iPadOS 17 pt default / 11 pt min; macOS 13 / 10; tvOS 29 / 23; visionOS 17 / 12; watchOS 16 / 12**.
    - [SHOULD] Thin or light custom font weights run *larger* than those minimums.
    - [SHOULD] Contrast meets WCAG AA as used by Accessibility Inspector: **≤17 pt any weight → 4.5:1; 18 pt any weight → 3:1; bold at any size → 3:1**. This applies to icons as well as text. Check both light and dark appearances.
    - [SHOULD] If the default palette falls below these ratios, there is at least a higher-contrast scheme when **Increase Contrast** is on.
    - [SHOULD] Use system colors, which have built-in accessible variants. Flag hard-coded hex values on semantic surfaces.
    - [SHOULD] Information is never carried by color alone. State and function changes also use shape, icon or text. Watch red/green and blue/orange pairs specifically.
    - [CONSIDER] People can customize colors in charts and game characters.
    - [SHOULD] Every element has a VoiceOver description (see the VoiceOver section).
  - Hearing
    - [SHOULD] Dialogue and crucial information are never audio-only. Pick the right text format: captions (synced), subtitles (translated dialogue), audio descriptions (narration of visual-only info placed in natural pauses), transcripts (full text of audio and visuals, for long-form media). Let people style caption text.
    - [CONSIDER] Audio cues such as success chimes and error sounds have matching haptics.
    - [SHOULD] Audio cues that guide people to an action also have a visual pointer, especially for off-screen content.
  - Mobility
    - [SHOULD] Control sizes: **iOS/iPadOS 44×44 pt default / 28×28 pt min; macOS 28×28 / 20×20; tvOS 66×66 / 56×56; visionOS 60×60 / 28×28; watchOS 44×44 / 28×28**.
    - [SHOULD] Spacing matters as much as size: about **12 pt padding around bezeled elements** and about **24 pt around the visible edges of non-bezeled elements**.
    - [SHOULD] Frequent actions use the simplest gesture. Avoid custom multi-finger and multi-hand gestures.
    - [MUST-ish "make sure"] Every gesture has an on-screen alternative, for example a swipe-to-dismiss paired with a button.
    - [SHOULD] Elements are labeled so Voice Control works ("Tap <name>").
    - [CONSIDER] Key repetitive tasks are exposed to Siri and Shortcuts (Action button, Control Center).
    - [SHOULD] Test with VoiceOver, AssistiveTouch, Full Keyboard Access, Pointer Control and Switch Control.
  - Speech / keyboard
    - [SHOULD] The whole app works with the keyboard alone (Full Keyboard Access). **Never override system-defined keyboard shortcuts.**
    - [SHOULD] Switch Control navigation reaches every action.
  - Cognitive
    - [SHOULD] Use system gestures and behaviors rather than custom ones people have to learn.
    - [SHOULD] Keep timed elements (toasts, banners, auto-advancing carousels) to a minimum. Prefer dismissal through an explicit action.
    - [SHOULD] No autoplaying audio or video without discoverable start and stop controls. [CONSIDER] a global "no autoplay" setting.
    - [SHOULD] Video playback respects **Dim Flashing Lights**.
    - [SHOULD] When **Reduce Motion** is on, automatic and repeating animations (zoom, scale, peripheral motion) are reduced. Specific tactics: tighter springs with less bounce, animation tracked directly to the gesture, no animated z-depth changes, fades instead of x/y/z translation, no animating into or out of blur.
    - [SHOULD] (iOS/iPadOS) Under **Assistive Access**: strip non-critical flows, one interaction per screen, and **ask for confirmation twice** before hard-to-undo actions such as delete.
    - [CONSIDER] Games offer difficulty, reaction-time and control-assist options.
- **Platform deltas**: The page lists no iOS/iPadOS/macOS-specific guidance beyond the size tables. macOS has smaller targets (28 pt default, 20 pt min) and a 13 pt base text size. visionOS: keep UI in the field of view, prefer horizontal over vertical layouts, slow down peripheral motion, never head-lock content (it breaks Pointer Control), avoid large repetitive gestures.
- **Web translation (our inference)**: 4.5:1 / 3:1 maps directly to WCAG 1.4.3. Apple's "18 pt" is in points; use roughly 24 px regular or 18.66 px bold as the WCAG large-text threshold. The 200% text requirement maps to WCAG 1.4.4 (Resize Text) plus 1.4.10 (Reflow) with `rem` units. The 44 pt target maps to WCAG 2.5.5 (44×44 CSS px, AAA); the 28 pt minimum sits just above 2.5.8 (24×24 px, AA). Spacing maps to 2.5.8's spacing exception. Color-only maps to 1.4.1. Reduce Motion maps to `@media (prefers-reduced-motion: reduce)`. Increase Contrast maps to `prefers-contrast: more` and `forced-colors`. Timed UI maps to 2.2.1. Autoplay maps to 1.4.2. Flashing maps to 2.3.1. Keyboard-only maps to 2.1.1, and "don't override shortcuts" maps to 2.1.4. Gesture alternatives map to 2.5.1. Voice Control labels map to 2.5.3 (Label in Name).
- **Slop tells (our inference)**: light-gray-on-white placeholder or body text (`#9CA3AF` on white is about 2.5:1); 11–12 px muted captions as the main secondary text; icon-only ghost buttons at 24–32 px with 4–8 px gaps; status shown only by a colored dot (green for active, red for failed); toasts that vanish after 3 s carrying an Undo action; hero autoplay video with no pause control; parallax, scale-on-scroll and blur-in reveal animations that ignore reduced-motion; swipe-only card dismissal; dark mode added late without re-checking contrast; fixed `px` font sizes that break at 200% zoom.

## Inclusion (source: inclusion)
- **Intent**: Put people first through respectful, plain communication and content anyone can understand. An *inoffensive* app is not automatically an *inclusive* one. Inclusive work also makes localization easier.
- **Checks**:
  - [SHOULD] Address the reader as **"you/your"**. Flag "the user" and "the player" in UI copy. Reserve **"we/our"** for the company or software; don't use them to imply a personal relationship.
  - [SHOULD] Check tone from several perspectives. An academic tone signals the app is only for highly educated people. Aim for clear, direct and respectful.
  - [SHOULD] Define every technical or specialized term before using it, and make the definition easy to find. Prefer plain language even when the term is known, because it reads and translates better.
  - [SHOULD] Replace idioms and colloquialisms with plain language. Some carry exclusionary history ("peanut gallery", "grandfathered in"). All of them translate badly.
  - [CONSIDER, cautious] Use humor sparingly. It confuses, irritates on repeat viewing and insults when misread.
  - [SHOULD] No unnecessary gendered references ("his or her" → rewrite with a plural noun). This also helps languages with gendered pronouns.
  - [SHOULD] Generic people are shown as non-gendered figures (SF Symbols `person`, `figure`). Let people customize avatars, emoji and characters.
  - [CONSIDER] If gender is truly needed (health or legal reasons), offer *nonbinary*, *self-identify* and *decline to state*, plus a pronoun field.
  - [SHOULD] Imagery shows varied race, body type, age and ability. No stereotyped occupations (male doctor, female nurse). Avoid showing affluence unless the context calls for it.
  - [SHOULD] Copy and flows don't assume experiences everyone shares: nuclear family, college, a first car. Security questions should be universal ("name of your first friend").
  - [SHOULD] People-first disability language. Don't use disability words to mean something negative ("crippled", "blind to", "lame"). Include people with disabilities in representative imagery.
  - [SHOULD] Internationalize: locale-aware date, time and money formats. Check that color meanings hold in every locale (white means death or grief in some cultures and purity in others).
  - [CONSIDER] Onboarding teaches step by step and can be skipped.
- **Platform deltas**: None per platform.
- **Web translation (our inference)**: `Intl.DateTimeFormat`, `Intl.NumberFormat` and `Intl.PluralRules` instead of string concatenation. Use `lang` and `dir` attributes. Gender fields should be optional, free text plus options, never a required binary `<select>`.
- **Slop tells (our inference)**: "Oops! Something went wrong 🙈", "Uh-oh!", "Whoops!", "Hang tight!" and other cutesy idioms; "Let's get you set up!" and "We're so excited to have you!" (unwanted *we* intimacy); "Hey there 👋" greetings; "Supercharge / Unleash / Level up / Seamlessly / Effortlessly / Empower" filler; stock-photo hero of a uniform group of young professionals; "Welcome back, user!"; a required Male/Female dropdown; jokes in empty states that wear thin by the tenth view.

## Writing (source: writing — primary; merged with alerts, menus, buttons, the-menu-bar, offering-help, notifications, widgets, toolbars, segmented-controls, text-fields, entering-data, privacy, inclusion, branding)
- **Intent**: Words are part of the UX. Set one consistent voice (a fixed vocabulary list), vary tone with the situation (serious for a payment error, light for a reached goal), be clear and brief, and write for everyone, including screen-reader users and localization (writing).
- **Checks — voice, tone, structure**:
  - [SHOULD] The app has a defined voice and a glossary of common terms. The same concept uses the same word everywhere, e.g. not "Delete" in one place and "Remove" in another (writing).
  - [SHOULD] Tone matches context. Errors and money flows are plain and direct; celebration is reserved for real achievements (writing).
  - [SHOULD] Cut every word that isn't needed. Read it aloud (writing).
  - [SHOULD] Plain language with no jargon or gendered terms. Define technical terms; no idioms; be careful with humor (writing, inclusion).
  - [SHOULD] Most important information comes first on each screen. One idea per screen; split multi-idea text across screens and plan the flow (writing).
  - [SHOULD] Use the right delivery channel for the urgency (inline vs notification vs alert vs action sheet), with a tone to match (writing).
  - [CONSIDER] Brand voice may use *occasional* exclamation marks and emoji (branding).
- **Checks — pronouns**:
  - [SHOULD] **Use possessives sparingly**: "Favorites", not "Your Favorites". If you do use them, keep one perspective; don't mix "my" and "your" (writing, Dec 2025).
  - [SHOULD] **Avoid "we" altogether.** It's unclear who "we" is, especially in errors. "Unable to load content", not "We're having trouble loading this content" (writing). This supersedes inclusion's softer "reserve we/our for the company".
  - [SHOULD] Address the reader as "you"; never "the user" or "the player" (inclusion).
- **Checks — capitalization (English)**:
  - [SHOULD] **The rule is consistency per element type.** Pick title case (more formal) or sentence case (more casual) for each UI element type, e.g. "title case for all alerts" or "sentence case for all headlines", and apply it everywhere. Component pages with specific rules take precedence (writing).
  - Component-specific defaults:
    - Title-style for menu items and menu bar titles (menus, the-menu-bar), push-button labels ("Add to Cart", buttons), segment labels (segmented-controls), notification titles (notifications), and alert titles that are fragments (alerts).
    - Sentence-style for alert titles that are full sentences, alert body text, notification body text, hidden-preview text, widget descriptions and tooltips (alerts, notifications, widgets, offering-help).
    - Title-style means capitalize every word except articles, coordinating conjunctions and short prepositions, and always capitalize the last word (menus).
  - [SHOULD] No ending punctuation on fragments. Full sentences are punctuated. Purpose strings end with a period (privacy). Full-sentence tooltips skip the period unless the house style says otherwise (offering-help).
  - **Alert button capitalization (resolved)**: writing.md makes capitalization a house-style choice per element type, with "title case for all alerts" as its own example. The alerts page's "sentence-style" for buttons is a default, not a hard rule. Review check: alert buttons share one case across the app and match the other buttons. Flag mixed casing; don't flag the choice of case itself.
- **Checks — buttons, links, flows**:
  - [SHOULD] Buttons and links are **verbs**. Don't be cute: "Send", not "Let's do it!" (writing). Alert buttons are 1–2 words naming the result ("View All", "Reply", "Erase") (alerts).
  - [SHOULD] **Never "Click here".** Link text describes where it goes ("Learn more about UX Writing"), because screen readers list links out of context (writing).
  - [SHOULD] Multi-step flows use consistent labels: start with "Get Started", pick *either* "Continue" *or* "Next" (or a label hinting at the next step) and keep it, and end with "Done" (writing).
  - [SHOULD] "OK" only for purely informational alerts; never "Yes"/"No". [MUST/"always"] Cancel buttons are titled "Cancel", and Cancel is never the default. A single default button is "Done" (alerts).
  - [SHOULD] Use the destructive style only for destruction the person didn't deliberately choose (alerts).
  - [SHOULD] Don't explain alert buttons in the body. If unavoidable, say "choose" and use the exact title without quotes (alerts).
  - [SHOULD] Ellipsis (…) only when more input is needed or the action opens another view, window or app (menus, buttons).
  - [SHOULD] No articles in menu items. Add a verb to ambiguous toggles ("Turn HDR On"). Segment labels are nouns (menus, segmented-controls).
- **Checks — device wording**:
  - [SHOULD] Gesture words fit the device: "tap" on iPhone and iPad, never "click" there (writing). In cross-device alert copy, prefer the neutral "choose" (alerts).
  - [SHOULD] Small screens (iPhone, Watch) need brevity. TV is a shared screen viewed from far away, so keep it brief and think about who is being addressed (writing).
- **Checks — errors**:
  - [SHOULD] Prevent errors first. If language can't fix a common error, redesign the interaction (writing).
  - [SHOULD] Place the error **next to the problem** (beside the field), without blame, and say how to fix it: "Choose a password with at least 8 characters" beats "That password is too short". "Use only letters for your name" beats "Don't use numbers or symbols". **No robotic "Invalid name"** (writing).
  - [SHOULD] **No "oops!" or "uh-oh"**, which sound insincere (writing).
  - [SHOULD] Alert titles say what happened, where and why. Never "Error" or "Error 329347 occurred". Two lines max. Neutral tone: not oblique, accusatory or downplaying severity (alerts).
  - [SHOULD] Validate inline as soon as a value is entered (entering-data).
  - [SHOULD] Use the caution symbol only for unexpected data loss (alerts).
- **Checks — empty states, settings, fields**:
  - [SHOULD] **Every empty state gives a next step**, with a button or link to take it if possible. Voice is allowed but must be useful. Never put crucial information in an empty state, because it disappears once there is content (writing).
  - [SHOULD] Settings labels are practical. Descriptions explain the *on* state only, and people infer off. Point people to a setting with a direct link or button, not a path like "Go to Settings > Privacy > …" (writing).
  - [SHOULD] Every field has a clear label, and hint text shows the format ("name@example.com") or describes the content ("Your name") (writing). Keep a persistent label, since placeholders disappear (text-fields).
- **Checks — microcopy surfaces**:
  - [SHOULD] Tooltips: 60–75 characters max, start with a verb, don't repeat the control name, sentence case (offering-help).
  - [SHOULD] Toolbar and window titles under 15 characters (toolbars).
  - [SHOULD] Notification body text is full sentences, not self-truncated, without the app name. Drop generic titles. Hidden-preview text reads like "Friend request" or "Shipment" (notifications).
  - [SHOULD] Widget descriptions start with a verb. Never "This widget shows…" (widgets).
  - [SHOULD] Purpose strings are one active, specific sentence ending in a period. ✅ "The app records during the night to detect snoring sounds." ❌ "Microphone access is needed for a better experience." ❌ "Turn on microphone access." (privacy)
- **Platform deltas**: The writing page lists none per platform, apart from device-wording guidance (tap vs click; brevity on Watch, iPhone and TV). macOS adds menu bar one-word titles, help tags and ellipsis conventions on push buttons (the-menu-bar, offering-help, buttons).
- **Web translation (our inference)**: Descriptive link text (WCAG 2.4.4). Errors tied to fields with `aria-describedby` plus `aria-invalid`, announced via `aria-live="polite"`, and naming the fix (3.3.1/3.3.3). A visible `<label>` in addition to the placeholder (3.3.2). "Tap/click" becomes device-neutral "select/choose", or detect pointer type with `@media (pointer: coarse)`. Use `…` (U+2026). Deep-link to settings routes instead of describing a menu path. Enforce consistent casing per component with a copy lint rule.
- **Slop tells (our inference)**: "Oops! Something went wrong 🙈" / "Uh-oh!" / "Whoops!"; "We're having trouble…" and "We couldn't find…" (*we* in errors); "Something went wrong. Please try again." with no cause or fix; "Invalid input" or "Invalid email" with no guidance; error banners at the top of the page far from the field; "Let's do it!", "Let's go! 🚀" or "Yay!" as CTAs; "Click here" or "Learn more" repeated without context; "Submit" everywhere; "Next" on step 2 and "Continue" on step 3 in the same flow; "Your Dashboard", "My Projects" and "Your Settings" mixed together; empty states that say only "No items yet" or show a cute illustration with no CTA; tips shown only in empty states; "Click" in a mobile build; Title Case Body Copy, or random mixed casing across buttons; "Seamlessly / effortlessly / supercharge" filler; settings descriptions like "When enabled, X happens. When disabled, X does not happen."; "Go to Settings > Account > Privacy to change this" with no link.

## Icons — interface icons/glyphs (source: icons)
- **Intent**: An interface icon expresses one concept people recognize instantly. Unlike app icons, glyphs are streamlined shapes in black and clear that the system can tint.
- **Checks**:
  - [SHOULD] Each icon is highly simplified and uses a familiar metaphor tied directly to its action or content.
  - [SHOULD] All icons share one **size, level of detail, stroke weight and perspective**, including when custom and SF Symbols are mixed. Adjust the size of heavy icons so they *look* consistent.
  - [SHOULD] Icon weight matches adjacent text weight unless one is meant to stand out.
  - [CONSIDER] Asymmetric icons (download arrow, play triangle) are **optically centered**. Bake the offset into the asset's padding so geometric centering then works.
  - [SHOULD] Don't hand-make selected/unselected pairs for toolbar, tab bar or button icons. The system handles selection.
  - [SHOULD] Human figures are gender-neutral and metaphors are culture-neutral.
  - [SHOULD] Put text in an icon only when essential (a formatting "B"). Localize the characters. Abstract "lines of text" icons need an RTL-flipped version.
  - [SHOULD] Custom icons are **vector (PDF/SVG)**, or a custom SF Symbol with a scale that matches text. PNG means providing multiple resolutions.
  - [SHOULD] Every custom icon has an accessibility label.
  - [SHOULD] No replicas of Apple hardware. Use Apple Design Resources or the product SF Symbols.
  - [SHOULD] Use the standard symbol for each common action: Copy `document.on.document`, Paste `document.on.clipboard`, Done `checkmark`, Cancel/Close `xmark`, Delete `trash`, Undo/Redo `arrow.uturn.backward/forward`, Compose `square.and.pencil`, Duplicate `plus.square.on.square`, Rename `pencil`, Move `folder`, Attach `paperclip`, Add `plus`, More `ellipsis`, Select `checkmark.circle`, Search `magnifyingglass`, Find `text.page.badge.magnifyingglass`, Filter `line.3.horizontal.decrease`, Share/Export `square.and.arrow.up`, Print `printer`, Account `person.crop.circle`, Like/Dislike `hand.thumbsup/down`, layer order `square.{2,3}.layers.3d.{top,bottom}.filled`, Archive `archivebox`. **Share is `square.and.arrow.up`, not a three-node graph. Filter is `line.3.horizontal.decrease`, not a funnel.**
- **Platform deltas**: macOS document icons use a folded top-right corner. The system composites the app icon and extension if you don't supply one. Background fill sizes are 512/256/128/32/16 px @1x (and @2x). The center image is **half the canvas**, with a **~10% margin** so content fills **~80%** (205×205 inside 256). Keep the top-right corner of the fill clear because the fold covers it. Sizes go down to 16×16 px, so simplify or remove detail at small sizes. A custom extension label can be short (e.g. "scene" instead of "scn"); the system uppercases it.
- **Web translation (our inference)**: Inline SVG with `currentColor`. A decorative icon next to text gets `aria-hidden="true"`; an icon-only button gets `aria-label`. Pick one icon library and a single `stroke-width`, and don't mix Lucide, Heroicons and Font Awesome. Logical CSS properties plus `:dir(rtl)` `transform: scaleX(-1)` only for directional glyphs.
- **Slop tells (our inference)**: icons from several libraries at different stroke widths (1.5 vs 2 vs filled); a sparkle ✨ icon for "AI" on everything; icons in tinted rounded-square "feature chips" on every card; geometrically centered play and download glyphs that look off; decorative icons beside every heading and list item; a funnel for filter, a gear for anything vaguely "settings"; Android/Material share glyph in an Apple-platform app; icon buttons without labels.

## SF Symbols (source: sf-symbols)
- **Intent**: Symbols are built to sit with San Francisco text, matching weight and aligning to cap height. They give consistent, tintable, animatable icons with built-in RTL and script variants.
- **Checks**:
  - [MUST] Never use SF Symbols, or anything confusingly similar, in app icons, logos or trademarks. Apple product and feature symbols can be displayed but **not customized**.
  - [SHOULD] Check that symbols exist on the minimum OS you target. New symbols don't back-deploy.
  - [SHOULD] Choose the rendering mode on purpose: **monochrome** (one color), **hierarchical** (one color at different opacities by layer, for depth), **palette** (2+ colors, one per layer; with 2 colors on a 3-layer symbol, layers 2 and 3 share a color), **multicolor** (intrinsic meaning colors, e.g. red `trash.slash` = data loss). Check legibility of the chosen mode at the actual size and against the actual background, even when using "automatic".
  - [SHOULD] Use system colors so symbols adapt to Dark Mode, vibrancy and Increase Contrast.
  - [CONSIDER] Gradients (SF Symbols 7+) are a linear gradient from one color and look best large.
  - [SHOULD] **Variable color means change (capacity, strength, progress), never depth.** Use hierarchical for depth. Layers that don't change (the speaker body) opt out.
  - [SHOULD] Match symbol **weight** to the adjacent text weight. There are **9 weights, ultralight to black**, mapped to SF font weights. Use **scale** (small / medium default / large, relative to SF cap height) to change emphasis without breaking that weight match. Don't resize by point size.
  - [SHOULD] Variants by context: **outline** next to text (toolbars, lists); **fill** for iOS tab bars, swipe actions and accent-color selection; **enclosed** (circle/square) for legibility at small sizes; **slash** for unavailable. Let the container choose where it can (the tab bar picks fill automatically).
  - [SHOULD] Language and script variants exist (Latin, Arabic, Hebrew, Hindi, Thai, CJK, Cyrillic, Devanagari, Indic numerals) and switch automatically. Don't hard-code a Latin glyph.
  - [SHOULD] Animations are used sparingly and each has a clear meaning. Map intent to effect: **Bounce** = an action happened or needs to happen (one-shot); **Scale** = persistent emphasis or selection; **Pulse** = ongoing activity (opacity only); **Breathe** = live status such as recording (opacity and size); **Variable color** = progress or connecting (cumulative vs iterative; open vs closed loop); **Replace** down-up = state change, up-up = forward progress, off-up = emphasize the next state; **Magic Replace** = related shapes (slash or badge on/off), the default; **Wiggle** = a call to action someone might miss; **Rotate** = in progress (by-layer for fan blades); **Draw On/Off** (SF7+) = progress or directional emphasis. Match the animation's tone to the brand.
  - [SHOULD] Custom symbols start from the template of a similar symbol and match its detail, optical weight, alignment and perspective. They should be simple, recognizable, inclusive and directly related to their meaning.
  - [CONSIDER] Use negative side margins (named e.g. "left-margin-Regular-M") so badged symbols align in stacks.
  - [SHOULD] Draw custom symbols as whole shapes plus erase layers, not cutouts, so animations work. Annotate layers and Z-order for variable color. Test every animation preset.
  - [SHOULD] Don't bake enclosures or badges into custom symbols. Use the component library.
  - [SHOULD] Custom symbols have accessibility labels.
- **Platform deltas**: None listed. Weight matching ties to SF on every platform.
- **Web translation (our inference)**: SF Symbols can't legally be shipped on the web (the license limits them to Apple platforms; confirm this). The web equivalents: an icon set whose stroke width tracks font weight (variable icon fonts like Material Symbols `wght`, or matching stroke to `font-weight`), sized in `em` so icons scale with text, `vertical-align` set to cap height (`1cap` unit). Animation-to-meaning mapping still applies, gated by `prefers-reduced-motion`.
- **Slop tells (our inference)**: 2 px stroke icons beside 300-weight text; icons sized in px that don't scale with Dynamic Type or zoom; perpetual pulse, bounce or shimmer on idle UI; a spinning icon used decoratively; multicolor "illustrative" icons mixed with monochrome glyphs; filled icons in a toolbar next to outline icons; variable-color "signal bars" used decoratively.

## App icons (source: app-icons)
- **Intent**: One simple, memorable concept that identifies the app everywhere: Home Screen, Spotlight, notifications, Settings, share sheets. The system adds Liquid Glass depth, highlights and masking, and the icon must survive every appearance.
- **Checks**:
  - [SHOULD] Layered: a background plus 1+ foreground layers, built in **Icon Composer** (iOS, iPadOS, macOS, watchOS). tvOS uses **2–5 parallax layers**; visionOS uses a background plus **1–2** layers.
  - [SHOULD] Foreground layers have crisp, non-feathered edges. Vary opacity for depth. Import opaque layers and set transparency in Icon Composer.
  - [SHOULD] Background is a solid color or gradient (Icon Composer native). Imported backgrounds are **full-bleed and opaque**.
  - [SHOULD] Vector (SVG/PDF) layers with text outlined. PNG only for mesh gradients and raster art.
  - [MUST-ish] Supply **square, unmasked** layers (tvOS: rectangular). Never pre-round corners, since that breaks specular highlights and causes jagged edges.
  - [SHOULD] Primary content is centered so it survives masking, especially the circular masks on watchOS and visionOS. Use the Apple Design Resources grids.
  - [SHOULD] Minimal shapes and one core idea. The canvas doesn't need to be filled. [CONSIDER] filled, overlapping shapes with transparency for depth.
  - [SHOULD] The same design across all platforms the app ships on.
  - [SHOULD] No text unless essential to the brand. A single-letter mnemonic is OK. **Never "Watch", "Play", "New" or "For visionOS".** tvOS text sits on the top layer.
  - [SHOULD] Illustration over photo. No UI screenshots or replicated standard components. No hairline strokes or sharp corners that fall apart at small sizes.
  - [MUST] No Apple hardware replicas (copyright).
  - [SHOULD] Don't bake in highlights, drop shadows, bevels, blurs or glows, because the system applies dynamic ones. If you do, test in Icon Composer and on device. Group layers to apply Liquid Glass at group level.
  - [SHOULD] Appearances: **default, dark, clear light, clear dark, tinted light, tinted dark** (iOS/iPadOS/macOS). Core features stay the *same* across them, with no swapped elements. Dark is derived from light, not overly bright, and color backgrounds often give the most contrast. The system generates any variant you don't supply.
  - [CONSIDER] Alternate icons (iOS, iPadOS, tvOS, visionOS-compatible) must each have their own dark, clear and tinted variants, must stay recognizably the same app, and go through App Review.
- **Platform deltas**: **iOS/iPadOS/macOS 1024×1024 px square → rounded-rect mask**; **tvOS 800×480 px → rounded rect**, with a safe zone because focus scaling crops the edges (foreground layers crop more); **visionOS 1024×1024 → circular, 3D**, no fake "hole/concave" shapes since system shadows make them pop out; **watchOS 1088×1088 → circular**, no pure-black background. Color spaces: sRGB, Gray Gamma 2.2, Display P3 (not visionOS). macOS now uses the same square-masked layered system as iOS, so the old free-form macOS silhouettes are no longer the target.
- **Web translation (our inference)**: favicon and PWA icons. Supply a `maskable` purpose icon with a safe zone (about 80% center), an SVG favicon with a `prefers-color-scheme` variant, and `apple-touch-icon` 180×180 without pre-rounded corners or transparency.
- **Slop tells (our inference)**: a generic gradient squircle with a white glyph (often an SF Symbol or Lucide icon, which is a license violation for SF); a pre-rounded PNG with a baked drop shadow; the app name in tiny text; a lightning bolt, sparkle or rocket on a purple-blue gradient; a dark variant that is just the inverted image; a different motif per appearance.

## Branding (source: branding)
- **Intent**: Be recognizable *while feeling at home on the platform*. Brand comes through voice, restrained accent color, typography and content, not chrome, logos or custom components.
- **Checks**:
  - [SHOULD] All copy uses one consistent brand voice. Plain words. Exclamation marks and emoji only *occasionally*.
  - [SHOULD] **Use the accent color sparingly.** Limit it on controls and reserve it for primary actions and status (unread badges, selected tab icon). [CONSIDER] putting brand color in the *content layer* so it scrolls under Liquid Glass controls and is picked up dynamically (Sept 2026 guidance).
  - [CONSIDER] Custom font for headlines and subheads, system font for body and captions. The custom font must support **Bold Text and Dynamic Type** and be legible at every size.
  - [SHOULD] Brand standard components (keep sizing, placement and behavior) instead of inventing new ones.
  - [SHOULD] Branding defers to content. No screen space spent purely on a brand asset.
  - [SHOULD] Standard patterns: UI in expected places, standard symbols for common actions, conventional navigation and modality.
  - [SHOULD] **Don't repeat the logo throughout the app** (nav bars, headers, empty states) unless it adds context.
  - [SHOULD] **The launch screen is not a brand moment.** Put branding on a welcome or onboarding screen instead.
  - [MUST] No Apple trademarks in the app name or images.
- **Platform deltas**: None listed.
- **Web translation (our inference)**: a single `--accent` token used on ≤1 primary CTA per view plus selection and status states. Brand display font via `font-display: swap`, body in `system-ui` or a well-hinted text face, sized in `rem`. No splash or loader screens showing a logo.
- **Slop tells (our inference)**: brand gradient on every button, card border and heading; logo in the nav bar *and* hero *and* footer *and* empty state; full-screen animated logo splash; custom-styled toggles, selects and date pickers that break native behavior; display font used for body copy at 14 px; accent-colored icons on every list row.

## Privacy (source: privacy)
- **Intent**: Be transparent, ask for the minimum, ask in context, and never manipulate consent. Trust is the product, and App Review enforces this.
- **Checks**:
  - [SHOULD] Request only the data a feature needs, as narrowly as possible, and **only once the person shows interest** in that feature.
  - [SHOULD] **No permission prompts at launch** unless the app cannot work without that permission (navigation needing location, AR needing surroundings).
  - [SHOULD] Purpose strings follow the Writing rules above.
  - Pre-permission screens (camera, mic, location, contacts, calendar, tracking):
    - [SHOULD] **Exactly one button**, labeled **"Continue" or "Next"**, never "Allow" (which mimics the system button). It must open the system alert.
    - [SHOULD] **No close, cancel, skip or "maybe later"** on that screen, unless needed for legal consent.
    - [MUST] Tracking (ATT): **no incentives, no fake request UI, no image of the alert, no arrows or annotations pointing at the alert**. These get the app rejected. The system alert must appear before any tracking data is collected. Legal-consent screens before or after are allowed.
  - [CONSIDER] Use the **Location button** for one-off location needs. Customizable: system title ("Current Location" / "Share My Current Location"), filled or outline glyph, background and foreground colors, corner radius. Nothing else can change. [MUST] It must fit without truncation at all accessibility text sizes and in all localizations, keep sufficient contrast and avoid too much translucency, or **the system disables location access through it**.
  - [SHOULD] Prefer passkeys. If passwords are used, add 2FA. Use Face ID, Touch ID or Optic ID for re-entry. Use Keychain for secrets, [MUST] never plain-text files. No custom auth schemes (use Sign in with Apple or Password AutoFill).
  - [SHOULD] Process on device where possible. Respect Hide My Email and Mail Privacy Protection.
- **Platform deltas**: **macOS**: sign with Developer ID outside the App Store; sandboxing is required for the Mac App Store; **don't assume who is signed in** (fast user switching). iOS/iPadOS/watchOS have the Location button. visionOS: ARKit data needs a Full Space plus permission; gaze is private (system hover only); the back camera is blank, so replace camera features with import.
- **Web translation (our inference)**: Call `navigator.permissions` and `getUserMedia` / `geolocation` only from a user gesture inside the feature. Cookie and consent banners must give Reject the same weight as Accept, with no preselected toggles (GDPR/ePrivacy, and the same anti-dark-pattern spirit). Use WebAuthn passkeys and `autocomplete="current-password"` / `one-time-code`.
- **Slop tells (our inference)**: an onboarding carousel that asks for notifications, location and contacts on slides 2–4; an "Enable notifications to get the most out of App!" screen with a big "Allow" button and a tiny "Not now"; "We value your privacy" banners with an accept-only primary button; a rolled-your-own email+password login with no passkey or AutoFill support; vague "to improve your experience" justifications.

## Right to left (source: right-to-left)
- **Intent**: Mirror the interface to match the reading direction of Arabic and Hebrew, but mirror *meaning*, not pixels. Numbers, logos, real-world objects and true directions stay as they are.
- **Checks**:
  - [SHOULD] Text alignment follows the interface direction. **Paragraphs (3+ lines) align to their own language**, not the UI direction. 1–2 line blocks follow the UI direction.
  - [SHOULD] Every item in a list uses the same alignment, including items in another script.
  - [MUST "always"] **Never reverse the digits inside a number** (541, phone numbers, card numbers).
  - [SHOULD] *Do* reverse the order of numerals in progress, counting and rating sequences. Never mirror the numeral glyphs themselves. Know the locale's numeral system (Hebrew uses Western Arabic numerals; Arabic varies by region between Western and Eastern) for number-centric apps.
  - [SHOULD] Flip progress controls (sliders, progress bars) and their min/max end glyphs. [MUST] Flip fixed-order navigation: **Back points right**, and next/previous flip.
  - [SHOULD] Don't flip controls that point to a real direction or an on-screen area.
  - [CONSIDER] Arabic and Hebrew next to ALL-CAPS Latin: increase RTL text by **~2 pt** to balance them (these scripts have no capitals).
  - [SHOULD] Don't flip photos, illustrations or artwork (it can change meaning or infringe copyright). Make a new version if direction matters. *Do* reverse the order of image sequences that are chronological, alphabetical or ranked.
  - [SHOULD] Flip icons showing text, reading direction or forward/back motion (e.g. speaker waves). Localize icons containing letters (signature, rich text, I-beam). Use text-free alternatives where the letters aren't about writing.
  - [SHOULD] Don't flip logos (legal risk), universal marks (checkmark) or real-world objects (clocks, right-handed tools).
  - [SHOULD] Complex icons are adjusted per component: keep the negation slash in the same orientation; flip a badge if it represents the UI; reposition a badge for visual balance (cart badge); keep the tool's handedness while flipping the base.
- **Platform deltas**: None. System frameworks flip standard components automatically, so custom layout is where the risk is.
- **Web translation (our inference)**: `dir="rtl"` / `dir="auto"` on user content. CSS logical properties (`margin-inline-start`, `inset-inline-end`, `text-align: start`). Flip only directional icons via `[dir=rtl] .icon-directional { transform: scaleX(-1) }`. Wrap numbers and phone numbers in `<bdi>` or `unicode-bidi: isolate`. `Intl.NumberFormat('ar-EG')` vs `'ar-SA'` for numeral systems. Flexbox `row` mirrors automatically; `left`/`right` absolute positioning does not.
- **Slop tells (our inference)**: `margin-left`/`padding-right` hard-coded everywhere; chevrons and "→" arrows in CTA buttons that don't flip; the whole UI flipped with `scaleX(-1)` including logos, checkmarks and photos; right-aligned English paragraphs in an RTL build; "Get started →" with a baked-in arrow character.

## VoiceOver (source: voiceover)
- **Intent**: Screen-reader users get the same information and structure through labels, order, grouping and change announcements. Respect their time by skipping decoration.
- **Checks**:
  - [SHOULD] Every key element has a label that describes *function*, not the generic system default. Custom elements must have one. Labels stay current as UI and content change.
  - [SHOULD] Meaningful images are described, covering only what the image conveys. Nearby captions shouldn't be repeated.
  - [SHOULD] Charts and infographics have a concise summary of what they show. Interactive drill-downs are also reachable through VoiceOver (custom accessibility elements / Audio Graphs).
  - [SHOULD] Purely decorative images are hidden from VoiceOver.
  - [SHOULD] Each screen has a **unique, succinct title** stating its content and purpose, plus accurate section headings. The title is the first thing announced.
  - [SHOULD] Relationships that are only visual (proximity, alignment) are expressed through grouping. For example, image and caption are grouped so they're read together. Reading order follows the locale (US English: top-to-bottom, left-to-right).
  - [SHOULD] Announce visible content and layout changes (AccessibilityNotification).
  - [CONSIDER] Expose headings, links and custom content types to the **rotor**.
- **Platform deltas**: None for iOS, iPadOS or macOS. visionOS: with VoiceOver on, custom gestures receive no hand input unless Direct Gesture mode is on, so custom-gesture-only features break.
- **Web translation (our inference)**: Unique `<title>` and one `<h1>` per route, with a real heading hierarchy (maps to the rotor's heading navigation). Labels via `aria-label`, `aria-labelledby` or visible text. `alt=""` on decorative images. `<figure>`/`<figcaption>` or a grouping `role` for image+caption. `aria-live` regions for async content changes, and focus management on SPA route change. Landmarks (`nav`, `main`) for rotor-like navigation. Charts get a text summary plus a data table fallback.
- **Slop tells (our inference)**: `<div onclick>` cards with no role or name; every route titled "App" or "Dashboard"; decorative blobs, gradient orbs and illustrations with `alt="image"` or a filename; headings chosen for size instead of hierarchy (h4 used for style); SPA navigation with no announcement or focus move; chart.js canvases with no text alternative; icon buttons announced as "button".

## Foundations (source: foundations)
- **Intent**: Index only. It names the foundation topics: Accessibility, App icons, Branding, Color, Dark Mode, Icons, Images, Immersive experiences, Inclusion, Layout, Materials, Motion, Privacy, Right to left, SF Symbols, Spatial layout, Typography, Writing.
- **Checks**: none of its own. Use it as the skill's checklist of top-level review areas.
- **Platform deltas**: n/a.
- **Slop tells**: n/a.

---

## Cross-cutting principles
1. **System first, custom only when it earns its place.** System colors, fonts, components, symbols, gestures and auth carry accessibility variants, RTL flipping, Dynamic Type and Increase Contrast for free. Most HIG violations in this scope come from replacing system pieces with custom ones and losing those adaptations.
2. **Never one channel.** Color + shape/text; audio + haptic + visual; gesture + button; image + label. Every piece of information or action needs at least two ways to reach it.
3. **Restraint is the brand signal.** Accent color only on primary actions and status, the logo almost never, animations only when they carry meaning, caution icons only for unexpected data loss, badges only for critical items, humor rarely. Using something less often makes it carry more meaning.
4. **Copy names outcomes.** Verbs on buttons ("Erase", not "OK"), specific causes in errors (never "Error"), active purpose strings, verb-led tooltips and widget descriptions. Generic copy is the most reliable slop signal.
5. **Respect the person's time and agency.** No launch-time permission walls, no timed auto-dismiss, no autoplay, no manipulative pre-prompts, no decorative noise for screen readers, a second confirmation for irreversible actions in Assistive Access.
6. **Mirror meaning, not pixels.** RTL, optical centering, symbol scale versus point size: geometric correctness isn't the goal; perceived correctness is.
7. **Consistency is measurable.** One icon stroke weight that matches text weight, one capitalization scheme per element type, the same app-icon features across 6 appearances, the same icon across platforms.
8. **Check under stress, not only in the default state.** 200% text, dark mode, Increase Contrast, Reduce Motion, RTL, longest localization, VoiceOver order. Designs that look fine only in the default state should fail review.

## Open questions for skill design
1. **Pronoun conflict**: inclusion says "reserve we/our for the company"; writing (Dec 2025, newer) says avoid "we" altogether. The digest follows writing.md. Confirm the skill treats the newer page as authoritative when pages conflict.
2. **Capitalization (resolved by writing.md)**: case is a per-element-type house choice that must be consistent, so the skill should flag *inconsistency*, not a particular case, except on components with fixed rules (menus are title-style).
3. **Severity mapping**: Apple rarely says "must". Should [MUST] be reserved for App Review-enforced rules (ATT screens, trademarks, SF Symbols licensing, Location button fit, sandboxing) and law-adjacent items (contrast), with everything else at [SHOULD]? A three-tier score keyed to "rejection risk / accessibility failure / polish" may be more useful to users than Apple's wording.
4. **Web points versus pixels**: Apple's 17 pt / 18 pt contrast thresholds and 44 pt targets don't map 1:1 to CSS px. Pick one canonical web mapping (suggest: WCAG thresholds plus a 44 px target goal and 24 px minimum) and state it once.
5. **How much can the skill verify statically?** Contrast, target size, `alt`/labels, logical CSS properties, `prefers-reduced-motion` and capitalization can be linted from code or screenshots. Tone, inclusion, stereotype imagery and "branding defers to content" need judgment. Should the skill split output into "automated checks" and "reviewer judgment"?
6. **SF Symbols on the web**: the license forbids non-Apple-platform use. Should the skill flag SF Symbols in web builds as a legal issue, and which equivalent icon set should it recommend?
7. **Liquid Glass and app-icon guidance is from 2025–2026** (Icon Composer, clear/tinted appearances, brand color in the content layer). Should the skill gate these checks on target OS version?
8. **Slop-tell lists are our inference.** Should they be kept as a separate, versioned "anti-pattern catalog" so they can change without touching the HIG-grounded checks?
9. **Localization depth**: should the review include a pseudo-localization pass (+40% string length, RTL, Arabic numerals) as a standard stress state?
