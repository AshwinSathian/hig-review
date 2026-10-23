# Content and foundations: accessibility, inclusion, icons, app icons, branding, privacy, RTL, VoiceOver
Loaded by these passes: slop scan, distinctiveness, structure, visual, interaction and motion, content, accessibility, platform fit.
HIG snapshot: 2026-10-23

Tags: [MUST] Apple writes must/never/always/don't, or App Review enforces it. [SHOULD] avoid/prefer/use/important and plain imperatives. [CONSIDER] consider/can/may. "Web" lines are our translation, "Slop tells" lines are ours. `(26+)` marks checks that apply only when the deployment target is iOS/iPadOS/macOS 26 or later.

Writing and microcopy: see references/writing.md.

Foundations (index page only, no guidance of its own): Accessibility, App icons, Branding, Color, Dark Mode, Icons, Images, Immersive experiences, Inclusion, Layout, Materials, Motion, Privacy, Right to left, SF Symbols, Spatial layout, Typography, Writing. Use it as the checklist of top-level review areas.

## Accessibility
- **Intent**: Interfaces should be intuitive, perceivable (no single channel carries information) and adaptable (they respect system settings and personalization). Apple's audit and disclosure tools are Accessibility Inspector and the App Store Accessibility Nutrition Labels.
- **Checks**:
  - Vision
    - [SHOULD] Text grows to at least 200% (watchOS 140%), through Dynamic Type or custom UI. Check that the layout reflows at the largest sizes with no truncation or overlap.
    - [SHOULD] Custom type styles respect default and minimum sizes: iOS/iPadOS 17 pt default / 11 pt min; macOS 13 / 10; tvOS 29 / 23; visionOS 17 / 12; watchOS 16 / 12.
    - [SHOULD] Thin or light custom font weights run larger than those minimums.
    - [SHOULD] Contrast meets WCAG AA as Accessibility Inspector measures it: 17 pt or smaller at any weight needs 4.5:1; 18 pt at any weight needs 3:1; bold at any size needs 3:1. This covers icons as well as text. Check light and dark appearances.
    - [SHOULD] If the default palette falls below those ratios, supply at least a higher-contrast scheme when Increase Contrast is on.
    - [SHOULD] Use system colors, which have built-in accessible variants. Flag hard-coded hex values on semantic surfaces.
    - [SHOULD] Never carry information by color alone. State and function changes also use shape, icon or text. Watch red/green and blue/orange pairs.
    - [CONSIDER] Let people customize colors in charts and game characters.
    - [SHOULD] Every element has a VoiceOver description (see VoiceOver).
  - Hearing
    - [SHOULD] Dialogue and crucial information are never audio-only. Pick the right text format: captions (synced), subtitles (translated dialogue), audio descriptions (narration of visual-only info in natural pauses), transcripts (full text of audio and visuals, for long-form media). Let people style caption text.
    - [CONSIDER] Audio cues such as success chimes and error sounds get matching haptics.
    - [SHOULD] Audio cues that guide people to an action also get a visual pointer, especially for off-screen content.
  - Mobility
    - [SHOULD] Control sizes: iOS/iPadOS 44×44 pt default / 28×28 pt min; macOS 28×28 / 20×20; tvOS 66×66 / 56×56; visionOS 60×60 / 28×28; watchOS 44×44 / 28×28.
    - [SHOULD] Spacing matters as much as size: about 12 pt of padding around bezeled elements and about 24 pt around the visible edges of non-bezeled elements.
    - [SHOULD] Frequent actions use the simplest gesture. Avoid custom multi-finger and multi-hand gestures.
    - [SHOULD] Every gesture has an on-screen alternative, for example swipe-to-dismiss paired with a button.
    - [SHOULD] Label elements so Voice Control works ("Tap <name>").
    - [CONSIDER] Expose key repetitive tasks to Siri and Shortcuts (Action button, Control Center).
    - [SHOULD] Test with VoiceOver, AssistiveTouch, Full Keyboard Access, Pointer Control and Switch Control.
  - Speech and keyboard
    - [SHOULD] The whole app works with the keyboard alone (Full Keyboard Access).
    - [MUST] Never override system-defined keyboard shortcuts.
    - [SHOULD] Switch Control navigation reaches every action.
  - Cognitive
    - [SHOULD] Use system gestures and behaviors rather than custom ones people have to learn.
    - [SHOULD] Keep timed elements (toasts, banners, auto-advancing carousels) to a minimum. Prefer dismissal through an explicit action.
    - [SHOULD] No autoplaying audio or video without discoverable start and stop controls. [CONSIDER] a global "no autoplay" setting.
    - [SHOULD] Video playback respects Dim Flashing Lights.
    - [SHOULD] With Reduce Motion on, reduce automatic and repeating animations (zoom, scale, peripheral motion). Tactics: tighter springs with less bounce, animation tracked directly to the gesture, no animated z-depth changes, fades instead of x/y/z translation, no animating into or out of blur.
    - [SHOULD] (iOS/iPadOS) Under Assistive Access: strip non-critical flows, one interaction per screen, and ask for confirmation twice before hard-to-undo actions such as delete.
    - [CONSIDER] Games offer difficulty, reaction-time and control-assist options.
- **Platform deltas**: Beyond the size tables the page lists nothing specific for iOS, iPadOS or macOS. macOS has smaller targets (28 pt default, 20 pt min) and a 13 pt base text size. Transferable visionOS principles: keep UI in the field of view, prefer horizontal over vertical layouts, slow down peripheral motion, never head-lock content (it breaks Pointer Control), avoid large repetitive gestures.
- **Web (our translation)**: WCAG ratios are the pass/fail floor: 4.5:1 body, 3:1 large text and non-text (WCAG 1.4.3, 1.4.11); APCA is an extra check. Apple's 18 pt is points; use roughly 24 px regular or 18.66 px bold as the WCAG large-text threshold. Minimum text is 12 px on desktop and web, 16 px body on mobile web (11 pt applies to native iOS). 200% text maps to 1.4.4 (Resize Text) plus 1.4.10 (Reflow) with `rem` units. Target size: 44 px is the goal (2.5.5, 44×44 CSS px, AAA) and 24 px is the minimum (2.5.8, 24×24 px, AA, with its spacing exception); use 48 px for shared cross-platform code. Color-only maps to 1.4.1. Reduce Motion maps to `@media (prefers-reduced-motion: reduce)`. Increase Contrast maps to `prefers-contrast: more` and `forced-colors`. Timed UI maps to 2.2.1, autoplay to 1.4.2, flashing to 2.3.1, keyboard-only to 2.1.1, "don't override shortcuts" to 2.1.4, gesture alternatives to 2.5.1, Voice Control labels to 2.5.3 (Label in Name). Honor `prefers-color-scheme` and user font size.
- **Slop tells (ours)**: light-gray-on-white placeholder or body text (`#9CA3AF` on white is about 2.5:1); 11-12 px muted captions as the main secondary text; icon-only ghost buttons at 24-32 px with 4-8 px gaps; status shown only by a colored dot (green active, red failed); toasts that vanish after 3 s carrying an Undo action; hero autoplay video with no pause control; parallax, scale-on-scroll and blur-in reveals that ignore reduced-motion; swipe-only card dismissal; dark mode added late without re-checking contrast; fixed `px` font sizes that break at 200% zoom.

## Inclusion
- **Intent**: Put people first through respectful, plain communication and content anyone can understand. An inoffensive app is not automatically inclusive. Inclusive work also makes localization easier.
- **Checks**:
  - [SHOULD] Address the reader as "you/your". Flag "the user" and "the player" in UI copy. The "we/our" question is settled in references/writing.md (the newer Dec 2025 writing guidance avoids "we"); do not apply the older "reserve we/our for the company" wording here.
  - [SHOULD] Check tone from several perspectives. An academic tone signals the app is only for highly educated people. Aim for clear, direct and respectful.
  - [SHOULD] Define every technical or specialized term before using it, and make the definition easy to find. Prefer plain language even when the term is known, because it reads and translates better.
  - [SHOULD] Replace idioms and colloquialisms with plain language. Some carry exclusionary history ("peanut gallery", "grandfathered in"). All translate badly.
  - [CONSIDER] Use humor sparingly. It confuses, irritates on repeat viewing and insults when misread.
  - [SHOULD] Avoid unnecessary gendered references ("his or her": rewrite with a plural noun). This also helps languages with gendered pronouns.
  - [SHOULD] Show generic people as non-gendered figures (SF Symbols `person`, `figure`). Let people customize avatars, emoji and characters.
  - [CONSIDER] If gender is truly needed (health or legal reasons), offer nonbinary, self-identify and decline to state, plus a pronoun field.
  - [SHOULD] Imagery shows varied race, body type, age and ability. No stereotyped occupations (male doctor, female nurse). Avoid showing affluence unless the context calls for it.
  - [SHOULD] Copy and flows don't assume shared experiences: nuclear family, college, a first car. Security questions should be universal ("name of your first friend").
  - [SHOULD] Use people-first disability language. Don't use disability words to mean something negative ("crippled", "blind to", "lame"). Include people with disabilities in representative imagery.
  - [SHOULD] Internationalize: locale-aware date, time and money formats. Check that color meanings hold in every locale (white means death or grief in some cultures and purity in others).
  - [CONSIDER] Onboarding teaches step by step and can be skipped.
- **Platform deltas**: None per platform.
- **Web (our translation)**: `Intl.DateTimeFormat`, `Intl.NumberFormat` and `Intl.PluralRules` instead of string concatenation. Use `lang` and `dir` attributes. Gender fields are optional, free text plus options, never a required binary `<select>`.
- **Slop tells (ours)**: "Oops! Something went wrong", "Uh-oh!", "Whoops!", "Hang tight!" and other cutesy idioms; "Let's get you set up!" and "We're so excited to have you!" (unwanted "we" intimacy); "Hey there" greetings with a wave emoji; "Supercharge / Unleash / Level up / Seamlessly / Effortlessly / Empower" filler; stock-photo hero of a uniform group of young professionals; "Welcome back, user!"; a required Male/Female dropdown; jokes in empty states that wear thin by the tenth view.

## Icons
- **Intent**: An interface icon expresses one concept people recognize instantly. Unlike app icons, glyphs are streamlined shapes in black and clear that the system can tint.
- **Checks**:
  - [SHOULD] Each icon is highly simplified and uses a familiar metaphor tied directly to its action or content.
  - [SHOULD] All icons share one size, level of detail, stroke weight and perspective, including when custom icons and SF Symbols are mixed. Adjust the size of heavy icons so they look consistent.
  - [SHOULD] Icon weight matches adjacent text weight unless one is meant to stand out.
  - [CONSIDER] Optically center asymmetric icons (download arrow, play triangle). Bake the offset into the asset's padding so geometric centering then works.
  - [SHOULD] Don't hand-make selected/unselected pairs for toolbar, tab bar or button icons. The system handles selection.
  - [SHOULD] Human figures are gender-neutral and metaphors are culture-neutral.
  - [SHOULD] Put text in an icon only when essential (a formatting "B"). Localize the characters. Abstract "lines of text" icons need an RTL-flipped version.
  - [SHOULD] Custom icons are vector (PDF/SVG), or a custom SF Symbol with a scale that matches text. PNG means providing multiple resolutions.
  - [SHOULD] Every custom icon has an accessibility label.
  - [SHOULD] No replicas of Apple hardware. Use Apple Design Resources or the product SF Symbols.
  - [SHOULD] Use the standard symbol for each common action: Copy `document.on.document`, Paste `document.on.clipboard`, Done `checkmark`, Cancel/Close `xmark`, Delete `trash`, Undo/Redo `arrow.uturn.backward/forward`, Compose `square.and.pencil`, Duplicate `plus.square.on.square`, Rename `pencil`, Move `folder`, Attach `paperclip`, Add `plus`, More `ellipsis`, Select `checkmark.circle`, Search `magnifyingglass`, Find `text.page.badge.magnifyingglass`, Filter `line.3.horizontal.decrease`, Share/Export `square.and.arrow.up`, Print `printer`, Account `person.crop.circle`, Like/Dislike `hand.thumbsup/down`, layer order `square.{2,3}.layers.3d.{top,bottom}.filled`, Archive `archivebox`. Share is `square.and.arrow.up`, not a three-node graph. Filter is `line.3.horizontal.decrease`, not a funnel.
- **Platform deltas**: macOS document icons use a folded top-right corner. The system composites the app icon and extension if you don't supply one. Background fill sizes are 512/256/128/32/16 px @1x (and @2x). The center image is half the canvas with a ~10% margin, so content fills ~80% (205×205 inside 256). Keep the top-right corner of the fill clear because the fold covers it. Sizes go down to 16×16 px, so simplify or remove detail at small sizes. A custom extension label can be short (for example "scene" instead of "scn"); the system uppercases it.
- **Web (our translation)**: Inline SVG with `currentColor`. A decorative icon next to text gets `aria-hidden="true"`; an icon-only button gets `aria-label`. Pick one icon library and a single `stroke-width`; don't mix Lucide, Heroicons and Font Awesome. Use logical CSS properties, and `:dir(rtl)` `transform: scaleX(-1)` only for directional glyphs. Icon-only buttons still meet the 44 px goal / 24 px minimum target rule.
- **Slop tells (ours)**: icons from several libraries at different stroke widths (1.5 vs 2 vs filled); a sparkle icon for "AI" on everything; icons in tinted rounded-square "feature chips" on every card; geometrically centered play and download glyphs that look off; decorative icons beside every heading and list item; a funnel for filter, a gear for anything vaguely "settings"; Android/Material share glyph in an Apple-platform app; icon buttons without labels.

## SF Symbols
- **Intent**: Symbols are built to sit with San Francisco text, matching weight and aligning to cap height. They give consistent, tintable, animatable icons with built-in RTL and script variants.
- **Checks**:
  - [MUST] Never use SF Symbols, or anything confusingly similar, in app icons, logos or trademarks. Apple product and feature symbols can be displayed but not customized.
  - [SHOULD] Check that symbols exist on the minimum OS you target. New symbols don't back-deploy.
  - [SHOULD] Choose the rendering mode on purpose: monochrome (one color), hierarchical (one color at different opacities by layer, for depth), palette (2+ colors, one per layer; with 2 colors on a 3-layer symbol, layers 2 and 3 share a color), multicolor (intrinsic meaning colors, such as red `trash.slash` for data loss). Check legibility of the chosen mode at the actual size and background, even when using "automatic".
  - [SHOULD] Use system colors so symbols adapt to Dark Mode, vibrancy and Increase Contrast.
  - [CONSIDER] Gradients (SF Symbols 7+) are a linear gradient from one color and look best large.
  - [SHOULD] Variable color means change (capacity, strength, progress), never depth. Use hierarchical for depth. Layers that don't change (the speaker body) opt out.
  - [SHOULD] Match symbol weight to the adjacent text weight. There are 9 weights, ultralight to black, mapped to SF font weights. Use scale (small / medium default / large, relative to SF cap height) to change emphasis without breaking that match. Don't resize by point size.
  - [SHOULD] Pick variants by context: outline next to text (toolbars, lists); fill for iOS tab bars, swipe actions and accent-color selection; enclosed (circle/square) for legibility at small sizes; slash for unavailable. Let the container choose where it can (the tab bar picks fill automatically).
  - [SHOULD] Language and script variants exist (Latin, Arabic, Hebrew, Hindi, Thai, CJK, Cyrillic, Devanagari, Indic numerals) and switch automatically. Don't hard-code a Latin glyph.
  - [SHOULD] Use animations sparingly, each with a clear meaning. Map intent to effect: Bounce = an action happened or needs to happen (one-shot); Scale = persistent emphasis or selection; Pulse = ongoing activity (opacity only); Breathe = live status such as recording (opacity and size); Variable color = progress or connecting (cumulative vs iterative; open vs closed loop); Replace down-up = state change, up-up = forward progress, off-up = emphasize the next state; Magic Replace = related shapes (slash or badge on/off), the default; Wiggle = a call to action someone might miss; Rotate = in progress (by-layer for fan blades); Draw On/Off (SF7+) = progress or directional emphasis. Match the animation's tone to the brand.
  - [SHOULD] Custom symbols start from the template of a similar symbol and match its detail, optical weight, alignment and perspective. Keep them simple, recognizable, inclusive and directly related to their meaning.
  - [CONSIDER] Use negative side margins (named like "left-margin-Regular-M") so badged symbols align in stacks.
  - [SHOULD] Draw custom symbols as whole shapes plus erase layers, not cutouts, so animations work. Annotate layers and Z-order for variable color. Test every animation preset.
  - [SHOULD] Don't bake enclosures or badges into custom symbols. Use the component library.
  - [SHOULD] Custom symbols have accessibility labels.
- **Platform deltas**: None listed. Weight matching ties to SF on every platform.
- **Web (our translation)**: Flag SF Symbols (and SF Pro) in a web build. The license limits them to Apple platforms; treat use on web as a legal issue and recommend an open-licensed icon set instead. Web equivalent of weight matching: an icon set whose stroke width tracks font weight (variable icon fonts such as Material Symbols `wght`, or stroke matched to `font-weight`), sized in `em` so icons scale with text, `vertical-align` set to cap height (`1cap`). The animation-to-meaning mapping still applies, gated by `prefers-reduced-motion`.
- **Slop tells (ours)**: 2 px stroke icons beside 300-weight text; icons sized in px that don't scale with Dynamic Type or zoom; perpetual pulse, bounce or shimmer on idle UI; a spinning icon used decoratively; multicolor "illustrative" icons mixed with monochrome glyphs; filled icons in a toolbar next to outline icons; variable-color "signal bars" used decoratively.

## App icons
- **Intent**: One simple, memorable concept that identifies the app everywhere: Home Screen, Spotlight, notifications, Settings, share sheets. The system adds Liquid Glass depth, highlights and masking, and the icon must survive every appearance.
- **Checks**:
  - [SHOULD] (26+) Layered: a background plus one or more foreground layers, built in Icon Composer (iOS, iPadOS, macOS; watchOS too). tvOS uses 2-5 parallax layers; visionOS uses a background plus 1-2 layers.
  - [SHOULD] (26+) Foreground layers have crisp, non-feathered edges. Vary opacity for depth. Import opaque layers and set transparency in Icon Composer.
  - [SHOULD] (26+) Background is a solid color or gradient (Icon Composer native). Imported backgrounds are full-bleed and opaque.
  - [SHOULD] Vector (SVG/PDF) layers with text outlined. PNG only for mesh gradients and raster art.
  - [MUST] Supply square, unmasked layers (tvOS: rectangular). Never pre-round corners; that breaks specular highlights and causes jagged edges.
  - [SHOULD] Center the primary content so it survives masking, especially the circular masks on watchOS and visionOS. Use the Apple Design Resources grids.
  - [SHOULD] Minimal shapes and one core idea. The canvas doesn't need to be filled. [CONSIDER] filled, overlapping shapes with transparency for depth.
  - [SHOULD] Use the same design across all platforms the app ships on.
  - [SHOULD] No text unless essential to the brand. A single-letter mnemonic is fine. Never "Watch", "Play", "New" or "For visionOS". tvOS text sits on the top layer.
  - [SHOULD] Illustration over photo. No UI screenshots or replicated standard components. No hairline strokes or sharp corners that fall apart at small sizes.
  - [MUST] No Apple hardware replicas (copyright).
  - [SHOULD] (26+) Don't bake in highlights, drop shadows, bevels, blurs or glows; the system applies dynamic ones. If you do, test in Icon Composer and on device. Group layers to apply Liquid Glass at group level.
  - [SHOULD] (26+) Appearances: default, dark, clear light, clear dark, tinted light, tinted dark (iOS/iPadOS/macOS). Core features stay the same across them, with no swapped elements. Dark is derived from light and not overly bright; color backgrounds often give the most contrast. The system generates any variant you don't supply.
  - [CONSIDER] Alternate icons (iOS, iPadOS, tvOS, visionOS-compatible) each need their own dark, clear and tinted variants, must stay recognizably the same app, and go through App Review.
- **Platform deltas**: iOS/iPadOS/macOS use 1024×1024 px square, masked to a rounded rect. tvOS is 800×480 px (rounded rect) with a safe zone, because focus scaling crops the edges (foreground layers crop more). visionOS is 1024×1024 (circular, 3D) with no fake "hole/concave" shapes, since system shadows make them pop out. watchOS is 1088×1088 (circular) with no pure-black background. Color spaces: sRGB, Gray Gamma 2.2, Display P3 (not visionOS). macOS now uses the same square-masked layered system as iOS, so the old free-form macOS silhouettes are no longer the target.
- **Web (our translation)**: Favicon and PWA icons. Supply a `maskable` purpose icon with a safe zone (about 80% center), an SVG favicon with a `prefers-color-scheme` variant, and `apple-touch-icon` 180×180 without pre-rounded corners or transparency.
- **Slop tells (ours)**: a generic gradient squircle with a white glyph (often an SF Symbol or Lucide icon, which is a license violation for SF); a pre-rounded PNG with a baked drop shadow; the app name in tiny text; a lightning bolt, sparkle or rocket on a purple-blue gradient; a dark variant that is just the inverted image; a different motif per appearance.

## Branding
- **Intent**: Be recognizable while feeling at home on the platform. Brand comes through voice, restrained accent color, typography and content, not chrome, logos or custom components.
- **Checks**:
  - [SHOULD] All copy uses one consistent brand voice. Plain words. Exclamation marks and emoji only occasionally.
  - [SHOULD] Use the accent color sparingly. Limit it on controls and reserve it for primary actions and status (unread badges, selected tab icon). [CONSIDER] (26+) Put brand color in the content layer so it scrolls under Liquid Glass controls and is picked up dynamically (Sept 2026 guidance).
  - [CONSIDER] Custom font for headlines and subheads, system font for body and captions. The custom font must support Bold Text and Dynamic Type and be legible at every size.
  - [SHOULD] Brand standard components (keep sizing, placement and behavior) instead of inventing new ones.
  - [SHOULD] Branding defers to content. No screen space spent purely on a brand asset.
  - [SHOULD] Use standard patterns: UI in expected places, standard symbols for common actions, conventional navigation and modality.
  - [SHOULD] Don't repeat the logo throughout the app (nav bars, headers, empty states) unless it adds context.
  - [SHOULD] The launch screen is not a brand moment. Put branding on a welcome or onboarding screen instead.
  - [MUST] No Apple trademarks in the app name or images.
- **Platform deltas**: None listed.
- **Web (our translation)**: A single `--accent` token used on at most one primary CTA per view plus selection and status states. Brand display font via `font-display: swap`, body in `system-ui` or a well-hinted text face, sized in `rem`. No splash or loader screens showing a logo. Brand may win on display-only surfaces (hero, marketing, onboarding splash) if accessibility still passes; task flows follow the platform patterns.
- **Slop tells (ours)**: brand gradient on every button, card border and heading; logo in the nav bar and hero and footer and empty state; full-screen animated logo splash; custom-styled toggles, selects and date pickers that break native behavior; display font used for body copy at 14 px; accent-colored icons on every list row.

## Privacy
- **Intent**: Be transparent, ask for the minimum, ask in context, and never manipulate consent. Trust is the product, and App Review enforces this.
- **Checks**:
  - [SHOULD] Request only the data a feature needs, as narrowly as possible, and only once the person shows interest in that feature.
  - [SHOULD] No permission prompts at launch unless the app cannot work without that permission (navigation needing location, AR needing surroundings).
  - [SHOULD] Purpose strings follow the rules in references/writing.md.
  - Pre-permission screens (camera, mic, location, contacts, calendar, tracking):
    - [SHOULD] Exactly one button, labeled "Continue" or "Next", never "Allow" (which mimics the system button). It must open the system alert.
    - [SHOULD] No close, cancel, skip or "maybe later" on that screen, unless needed for legal consent.
    - [MUST] Tracking (ATT): no incentives, no fake request UI, no image of the alert, no arrows or annotations pointing at the alert. These get the app rejected. The system alert must appear before any tracking data is collected. Legal-consent screens before or after are allowed.
  - [CONSIDER] Use the Location button for one-off location needs. Customizable: system title ("Current Location" / "Share My Current Location"), filled or outline glyph, background and foreground colors, corner radius. Nothing else can change. [MUST] It must fit without truncation at all accessibility text sizes and in all localizations, keep sufficient contrast and avoid too much translucency, or the system disables location access through it.
  - [SHOULD] Prefer passkeys. If passwords are used, add 2FA. Use Face ID, Touch ID or Optic ID for re-entry. Use Keychain for secrets; [MUST] never plain-text files. No custom auth schemes (use Sign in with Apple or Password AutoFill).
  - [SHOULD] Process on device where possible. Respect Hide My Email and Mail Privacy Protection.
- **Platform deltas**: macOS: sign with Developer ID outside the App Store; sandboxing is required for the Mac App Store; don't assume who is signed in (fast user switching). iOS/iPadOS/watchOS have the Location button. visionOS (transferable principle): gaze is private, so rely on system hover only.
- **Web (our translation)**: Call `navigator.permissions`, `getUserMedia` and `geolocation` only from a user gesture inside the feature. Cookie and consent banners give Reject the same weight as Accept, with no preselected toggles (GDPR/ePrivacy, and the same anti-dark-pattern spirit); fake urgency or confirmshaming here is a deceptive-design Blocker. Use WebAuthn passkeys and `autocomplete="current-password"` / `one-time-code`.
- **Slop tells (ours)**: an onboarding carousel that asks for notifications, location and contacts on slides 2-4; an "Enable notifications to get the most out of App!" screen with a big "Allow" button and a tiny "Not now"; "We value your privacy" banners with an accept-only primary button; a rolled-your-own email+password login with no passkey or AutoFill support; vague "to improve your experience" justifications.

## Right to left
- **Intent**: Mirror the interface to match the reading direction of Arabic and Hebrew, but mirror meaning, not pixels. Numbers, logos, real-world objects and true directions stay as they are.
- **Checks**:
  - [SHOULD] Text alignment follows the interface direction. Paragraphs of 3+ lines align to their own language, not the UI direction. 1-2 line blocks follow the UI direction.
  - [SHOULD] Every item in a list uses the same alignment, including items in another script.
  - [MUST] Never reverse the digits inside a number (541, phone numbers, card numbers).
  - [SHOULD] Do reverse the order of numerals in progress, counting and rating sequences. Never mirror the numeral glyphs themselves. Know the locale's numeral system (Hebrew uses Western Arabic numerals; Arabic varies by region between Western and Eastern) for number-centric apps.
  - [SHOULD] Flip progress controls (sliders, progress bars) and their min/max end glyphs.
  - [MUST] Flip fixed-order navigation: Back points right, and next/previous flip.
  - [SHOULD] Don't flip controls that point to a real direction or an on-screen area.
  - [CONSIDER] Arabic and Hebrew next to ALL-CAPS Latin: increase RTL text by about 2 pt to balance them (these scripts have no capitals).
  - [SHOULD] Don't flip photos, illustrations or artwork (it can change meaning or infringe copyright). Make a new version if direction matters. Do reverse the order of image sequences that are chronological, alphabetical or ranked.
  - [SHOULD] Flip icons showing text, reading direction or forward/back motion (for example speaker waves). Localize icons containing letters (signature, rich text, I-beam). Use text-free alternatives where the letters aren't about writing.
  - [SHOULD] Don't flip logos (legal risk), universal marks (checkmark) or real-world objects (clocks, right-handed tools).
  - [SHOULD] Adjust complex icons per component: keep the negation slash in the same orientation; flip a badge if it represents the UI; reposition a badge for visual balance (cart badge); keep the tool's handedness while flipping the base.
- **Platform deltas**: None. System frameworks flip standard components automatically, so custom layout is where the risk is.
- **Web (our translation)**: `dir="rtl"` / `dir="auto"` on user content. CSS logical properties (`margin-inline-start`, `inset-inline-end`, `text-align: start`). Flip only directional icons via `[dir=rtl] .icon-directional { transform: scaleX(-1) }`. Wrap numbers and phone numbers in `<bdi>` or `unicode-bidi: isolate`. `Intl.NumberFormat('ar-EG')` vs `'ar-SA'` for numeral systems. Flexbox `row` mirrors automatically; `left`/`right` absolute positioning does not. Include right-to-left and +40% pseudo-localized text among the stress states.
- **Slop tells (ours)**: `margin-left`/`padding-right` hard-coded everywhere; chevrons and arrow characters in CTA buttons that don't flip; the whole UI flipped with `scaleX(-1)` including logos, checkmarks and photos; right-aligned English paragraphs in an RTL build; "Get started" with a baked-in arrow character.

## VoiceOver
- **Intent**: Screen-reader users get the same information and structure through labels, order, grouping and change announcements. Respect their time by skipping decoration.
- **Checks**:
  - [SHOULD] Every key element has a label that describes function, not the generic system default. Custom elements must have one. Labels stay current as UI and content change.
  - [SHOULD] Describe meaningful images, covering only what the image conveys. Don't repeat nearby captions.
  - [SHOULD] Charts and infographics have a concise summary of what they show. Interactive drill-downs are also reachable through VoiceOver (custom accessibility elements / Audio Graphs).
  - [SHOULD] Hide purely decorative images from VoiceOver.
  - [SHOULD] Each screen has a unique, succinct title stating its content and purpose, plus accurate section headings. The title is the first thing announced.
  - [SHOULD] Express visual-only relationships (proximity, alignment) through grouping. For example, group image and caption so they're read together. Reading order follows the locale (US English: top-to-bottom, left-to-right).
  - [SHOULD] Announce visible content and layout changes (AccessibilityNotification).
  - [CONSIDER] Expose headings, links and custom content types to the rotor.
- **Platform deltas**: None for iOS, iPadOS or macOS. visionOS (transferable): with VoiceOver on, custom gestures receive no hand input unless Direct Gesture mode is on, so features reachable only by custom gesture break.
- **Web (our translation)**: Unique `<title>` and one `<h1>` per route, with a real heading hierarchy (maps to the rotor's heading navigation). Labels via `aria-label`, `aria-labelledby` or visible text. `alt=""` on decorative images. `<figure>`/`<figcaption>` or a grouping `role` for image plus caption. `aria-live` regions for async content changes, and focus management on SPA route change. Landmarks (`nav`, `main`) for rotor-like navigation. Charts get a text summary plus a data table fallback.
- **Slop tells (ours)**: `<div onclick>` cards with no role or name; every route titled "App" or "Dashboard"; decorative blobs, gradient orbs and illustrations with `alt="image"` or a filename; headings chosen for size instead of hierarchy (h4 used for style); SPA navigation with no announcement or focus move; chart canvases with no text alternative; icon buttons announced as "button".

## Cross-cutting principles
1. **System first, custom only when it earns its place.** System colors, fonts, components, symbols, gestures and auth carry accessibility variants, RTL flipping, Dynamic Type and Increase Contrast for free. Most violations here come from replacing system pieces and losing those adaptations.
2. **Never one channel.** Color plus shape or text; audio plus haptic plus visual; gesture plus button; image plus label.
3. **Restraint is the brand signal.** Accent color only on primary actions and status, the logo almost never, animation only when it carries meaning, caution icons only for unexpected data loss, badges only for critical items, humor rarely.
4. **Copy names outcomes.** Verbs on buttons, specific causes in errors, active purpose strings. Generic copy is the most reliable slop signal (rules in references/writing.md).
5. **Respect the person's time and agency.** No launch-time permission walls, no timed auto-dismiss, no autoplay, no manipulative pre-prompts, no decorative noise for screen readers, a second confirmation for irreversible actions in Assistive Access.
6. **Mirror meaning, not pixels.** RTL, optical centering, symbol scale versus point size: perceived correctness is the goal.
7. **Consistency is measurable.** One icon stroke weight that matches text weight, the same app-icon features across 6 appearances, the same icon across platforms.
8. **Check under stress, not only in the default state.** 200% text, dark mode, Increase Contrast, Reduce Motion, RTL, longest localization, VoiceOver order.
