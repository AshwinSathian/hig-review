<!-- contents -->
Contents: M3 Expressive research (Google UX research) · M3 Expressive tactics and the hero-moment budget · M3 motion physics · M3 shape system · M3 color: HCT and contrast levels · M3 type scale · M3 adaptive layout and window size classes · Fluent 2 principles · Fluent 2 motion, layout and color · Windows 11 app design · Microsoft Inclusive Design · Cross-system synthesis (what Apple does not give) · Not reached in this pass
<!-- /contents -->


Covers: Material 3 and M3 Expressive, Fluent 2, Windows 11 app design, and the Microsoft Inclusive Design toolkit. Non-Apple; augments the HIG and never replaces it.
Loaded by: visual, interaction and motion, distinctiveness, platform fit
Snapshot: 2026-10-23
Tags: [MUST]/[SHOULD]/[CONSIDER] = the source's own strength; [Taste] = our rule. In reports, a check labelled 'adds to Apple' shows the Apple file's tag; 'Apple silent' shows 'Research'; [Taste] shows 'Taste'. [Taste] always shows 'Taste' in reports, whatever its label.


Conflicts follow the policy: native Apple target, Apple wins on platform conventions; web, Apple's principle is the default and research may sharpen it, with the conflict shown; brand, split by surface; accessibility, strictest wins. Items marked `(unverified)` were recalled from memory or seen only as a snippet; they carry lower weight and never make a Blocker alone. Android-only implementation details are cut to what transfers to iOS, macOS and web. Overused patterns from these sources: see references/slop-catalog.md.

## M3 Expressive research (Google UX research)

**Intent**: The largest published body of evidence on whether expressive UI helps or hurts usability (Google, research from 2022, published with the May 2025 launch). Apple publishes nothing comparable.

**Figures** (Google's own claims, not independently replicated): 46 separate research studies with hundreds of designs; more than 18,000 participants; three years of work starting in 2022. Preference up to 87% among 18-24-year-olds, net-positive across all age groups (no percentages for other groups). Desirability lifts: +32% subculture perception, +34% modernity, +30% rebelliousness. Key UI elements spotted up to four times faster; the email Send button was found 4× faster after being made larger, placed just above the keyboard and given a secondary color (eye-tracking over 10 apps). Users 45+ performed on par with younger users. Tap time on key actions decreased by seconds (no exact figure).

**Caveats on the page**: a strong minority preferred calmer, less intense versions; no amount of emotion compensates for a lack of clarity; breaking basic interaction paradigms leads to poor usability or negative sentiment. Negative results: scattered album art replacing a vertical song list felt modern but usability dropped; removing text labels from email actions reduced usability; lower familiarity reduced both preference and usability.

**Checks**
- [MUST] The screen's single most important action is identifiable in a 1-2 s squint or blur test (position near the thumb or keyboard, distinct color role). (hierarchy guidance, now with a measured effect) — adds to Apple
- [SHOULD] Salience by size: the primary action is made larger than its neighbours (the email Send button found 4× faster). — CONFLICT: Apple marks the preferred option with style, not size, and allows 1-2 prominent buttons per view (components-structure.md) vs M3E size-based salience; resolution: native Apple target, Apple wins, so prominence comes from style and role, not size; web and display-only surfaces may use size only within the product's 1-2 signature-moment budget.
- [MUST] Don't trade labels for looks; icon-only actions measurably reduced usability. (agrees with labelling ambiguous icons) — adds to Apple
- [MUST] Don't break basic interaction paradigms (lists, back, tap targets) in the name of expression. — adds to Apple
- [SHOULD] Make expressiveness depend on context; the page names banking as a place where media-app tactics may not fit. — Apple silent
- [SHOULD] Offer, or at least design for, a calmer variant; pairs with Reduce Motion and Increase Contrast. — adds to Apple
- [CONSIDER] Usability-test any expressive hero treatment against a plain baseline, to ensure it hasn't gone too far. — Apple silent
- [CONSIDER] Treat the press report (Business Insider via search snippet; the original Google post was reportedly deleted) that expressive design was strongly preferred over iOS-HIG-conformant design as Google's unreplicated claim, not evidence. (unverified) — CONFLICT: Apple's HIG-conformant restraint vs Google's claim that expressive beats it on preference; resolution: native Apple target keeps Apple; on web the principle stays default and the supported reading is narrower, since uniform restrained emphasis can bury the primary action and the HIG does not prevent strong emphasis on that action. Do not conclude "be less Apple".

**Distinctiveness**: Expressiveness comes from five levers (color, shape, size, motion, containment) applied unevenly so one thing wins. Concentrated contrast, not decoration spread everywhere, is what produces distinctiveness.

**Web**: Give the primary CTA a distinct color role, not another shade of the same blue; at least 44px tall on touch (the web mapping: 44px goal, 24px minimum; 48px only for shared cross-platform code, and M3's own 48dp is not a web requirement); place it at the end of the user's flow (above the keyboard on mobile, bottom of a sticky composer). Run a blur test (`filter: blur(6px)` screenshot) in review.

## M3 Expressive tactics and the hero-moment budget

**Intent**: The official list of tactics (M3 blog, May 13 2025) and the most portable "how to make a system-based UI not look stock" moves from any platform owner. M3 Expressive is not a new version and not "M4"; 14 new or updated components (secondary sources say 15; the official post says fourteen), 35 shapes, the most researched update since 2014.

**Checks**
- [SHOULD] The primary element's shape differs from its neighbors' (square-ish inside a field of pills, or the reverse); smaller shapes can make essential actions look less important. — CONFLICT: Apple keeps one consistent shape per control role and same-size buttons as a coherent set (beyond-hig.md, components-structure.md) vs M3E shape contrast on the primary; resolution: native Apple target, Apple wins; web and display-only surfaces allow it only within the product's 1-2 signature-moment budget.
- [SHOULD] At least two accent roles exist and do different jobs; without contrast, elements blend together. — CONFLICT: Apple's "accent color sparingly" (content-a11y.md, brand and accent guidance; the one-meaning count is our heuristic) vs M3E's two or more accent roles; resolution: native Apple target, Apple wins (accent used sparingly, one meaning); web and display-only surfaces may add a second role only within the product's 1-2 signature-moment budget.
- [CONSIDER] An editorial-scale type moment (heavier weight, larger size, color, spacing). — CONFLICT: Apple lets style, not size, carry hierarchy (components-structure.md, visual.md) vs M3E editorial-scale type; resolution: native Apple target, Apple wins; web and display-only surfaces allow one such moment only within the product's 1-2 signature-moment budget.
- [SHOULD] Contain the most important content for emphasis (ample space, brightest surface); ungrouped information blends together. — adds to Apple
- [SHOULD] Components shift depending on the environment. — adds to Apple
- [Taste] Stick to one or two hero moments per product; too many are overwhelming or distracting. Count the moments that combine several tactics; zero reads as generic, more than two as noise. Selection test: is the interaction emotionally impactful, and is it a key interaction in the product? (visual.md: emphasis is scarce; Apple sets no count) — adds to Apple
- [CONSIDER] Keep Apple's deference and restraint as the default, with the hero moments as the budgeted exception. — CONFLICT: Apple's restraint everywhere (visual.md: emphasis is scarce) vs M3E "restrained almost everywhere, loud in one or two places"; resolution: not a true clash. Apple's restraint stays the default on every target; the exception is a budget of one or two per product, and in task flows (forms, lists, navigation, settings) Apple wins outright. Hero moments live on display-only surfaces (first run, empty states, success moments, marketing) and only if accessibility passes.

**Distinctiveness**: A product is recognized by its one or two signature interactions, not its button style. Fluent says the same (see Fluent 2 principles).

**Web**: Pick 1-2 flows (checkout success, first-run "aha", the core create action) and give them a custom shape, motion and type treatment; everything else stays on the system.

## M3 motion physics

**Intent**: The only platform system that publishes spring parameters as named tokens, plus a cubic-bezier and duration table for the web, so motion review is checkable. The physics system replaces the older easing-and-duration system.

**Spec points**: Two schemes. Expressive overshoots the final value to add bounce and is meant for hero moments and key interactions; Standard has minimal bounce for utilitarian products. Spatial springs move something on screen (x, y, rotation, size, rounded corners) and overshoot. Effects springs animate color and opacity and never overshoot (an alpha cannot exceed 100%). Most motion uses default speed; small elements fast, large elements slow (fast = switches and buttons, default = bottom sheet and expanded nav rail, slow = full-screen). All component motion is driven by two tokens, expressive fast spatial and expressive fast effects; 21 components use it by default in Compose. Exact values differ for wearable, phone and tablet. Example: a pressed button that changes shape and color uses fast spatial for the shape and fast effects for the color.

**Spring tokens (damping ratio / stiffness)**:

| Token | Expressive | Standard |
|---|---|---|
| Fast spatial | 0.6 / 800 | 0.9 / 1400 |
| Default spatial | 0.8 / 380 | 0.9 / 700 |
| Slow spatial | 0.8 / 200 | 0.9 / 300 |
| Fast effects | 1.0 / 3800 | 1.0 / 3800 |
| Default effects | 1.0 / 1600 | 1.0 / 1600 |
| Slow effects | 1.0 / 800 | 1.0 / 800 |

**Web conversion (cubic-bezier, duration)**:

| Spring | cubic-bezier | Duration |
|---|---|---|
| Expressive fast spatial | 0.42, 1.67, 0.21, 0.90 | 350ms |
| Expressive default spatial | 0.38, 1.21, 0.22, 1.00 | 500ms |
| Expressive slow spatial | 0.39, 1.29, 0.35, 0.98 | 650ms |
| Expressive fast effects | 0.31, 0.94, 0.34, 1.00 | 150ms |
| Expressive default effects | 0.34, 0.80, 0.34, 1.00 | 200ms |
| Expressive slow effects | 0.34, 0.88, 0.34, 1.00 | 300ms |
| Standard fast spatial | 0.27, 1.06, 0.18, 1.00 | 350ms |
| Standard default spatial | 0.27, 1.06, 0.18, 1.00 | 500ms |
| Standard slow spatial | 0.27, 1.06, 0.18, 1.00 | 750ms |
| Standard fast/default/slow effects | same as Expressive effects | 150/200/300ms |

Use springs when possible, otherwise curves that mimic springs for animations without interruptions or gestures. Legacy easing fallback: standard `cubic-bezier(0.2, 0, 0, 1)`; emphasized decelerate `(0.05, 0.7, 0.1, 1)`; emphasized accelerate `(0.3, 0, 0.8, 0.15)`. Durations run 50-1000 ms in 16 steps (Short1 = 50 to ExtraLong4 = 1000).

**Checks**
- [MUST] Color and opacity animations never overshoot: a critically damped spring (damping 1.0) or a non-overshooting curve. A bezier with y > 1 on opacity or color is a defect. (beyond-hig.md: springs start at 100% damping and add overshoot only when the gesture carries momentum; Apple does not separate spatial from effects springs) — adds to Apple
- [MUST] Gesture-driven and interruptible motion uses springs, not fixed-duration curves; beziers are a fallback only for uninterrupted, gesture-free animation. (beyond-hig.md: ease-in-out cannot take an initial velocity, so gesture handoff needs springs) — adds to Apple
- [SHOULD] Speed scales with element size or travel distance: fast for small controls, default for partial-screen, slow for full-screen. Fluent and Windows agree. — adds to Apple
- [SHOULD] One motion scheme product-wide; swap per element only on purpose. — Apple silent
- [CONSIDER] Evidence, not a target: M3 pairs Standard (about 0.9 damping) with utilitarian or pro tools and Expressive (0.6-0.8 damping) with consumer hero moments. Do not copy; derive damping and bounce from the product's motion_personality tokens. (beyond-hig.md: stay consistent with app character) — adds to Apple
- [CONSIDER] Use M3's spatial-vs-effects split as a review lens on Apple-platform code without importing M3's values. SwiftUI presets `.smooth`, `.snappy`, `.bouncy` take duration and bounce rather than damping and stiffness (beyond-hig.md); damping ratio is roughly 1 minus bounce (the conversion there is itself unverified). — adds to Apple
- [SHOULD] M3 calls bouncy Expressive the default "for most situations". — CONFLICT: Apple's default bounce of 0, with bounce kept for physical gesture endings and app character (beyond-hig.md), vs M3 bounce as the default; resolution: on native Apple targets Apple wins and bounce is the hero-moment exception only; on web, the Apple principle is the default and bounce is allowed on hero moments, always gated behind prefers-reduced-motion: no-preference, and absent from enterprise data tables.

**Distinctiveness**: Motion feel is a brand signature that tokens can set. A product can define its own damping/stiffness pair (M3 "Level 2: Create a custom motion scheme", Level 3 = swap per element) instead of a platform default or a generic curve. The skill checks that the product states its own choice; it never supplies one.

**Web**: CSS `linear()` can approximate a spring with real overshoot. Opacity and color transitions use the effects curves (no y > 1). Gate spatial bounce behind `@media (prefers-reduced-motion: no-preference)`.

## M3 shape system

**Intent**: Radius is one of the most visible brand fingerprints, and the mix of shapes can carry hierarchy.

**Corner scale (dp)**: None 0, ExtraSmall 4, Small 8, Medium 12, Large 16, LargeIncreased 20, ExtraLarge 28, ExtraLargeIncreased 32, ExtraExtraLarge 48, Full = circle. May 2025 added 20, 32 and 48, and fully rounded now uses full instead of 50% of component size.

**Notable lines**: Sharp shapes add tension and are more memorable; shapes without clear meaning add more clutter than delight; abstract shapes are for photography cropping, avatar masking and other non-interactive elements; morph shapes to communicate interaction states, actions in progress and changes in environment; shape should echo the typeface's roundness; shape can be 2.5D.

**Checks**
- [SHOULD] Corner radii come from a small named scale and each radius has a reason (container vs control vs decorative). Arbitrary mixed radii (7px, 10px, 14px) are a defect. — adds to Apple
- [SHOULD] Abstract or decorative shapes go on non-interactive elements only; interactive controls keep recognizable affordances. — Apple silent
- [CONSIDER] Deliberate shape tension, sharp beside round, to mark the primary element. — Apple silent
- [CONSIDER] The shape language matches the typeface geometry (round type, round shapes; sharp terminals, tighter radii). — Apple silent
- [CONSIDER] The mix of shapes carries hierarchy. Apple's nested radii are concentric, inner = outer minus padding (beyond-hig.md). — adds to Apple

**Distinctiveness**: A product should choose its radius scale on purpose, tied to its typeface.

**Web**: Define `--radius-*` tokens from the product's own scale (M3's 4/8/12/16/28/full is evidence only: do not copy; derive from the product's own tokens) and lint for raw px radii. Use `border-radius: 9999px` rather than 50% on non-square elements. `clip-path` or SVG masks for decorative shapes on imagery only.

## M3 color: HCT and contrast levels

**Intent**: The most rigorous public method for turning brand color into an accessible, themeable palette. Apple supplies semantic system colors but no method for custom palettes. Source: O'Leary, "The Science of Color & Design" (Feb 17 2022) and material-color-utilities.

**Facts**: HSL is inaccurate; at HSL lightness 50, measured lightness ranges from 33 to 96. HCT = CAM16 hue (0-360) + CAM16 chroma (tops out at roughly 120) + tone (L*, 0 black to 100 white). A tone difference of 40 guarantees WCAG contrast of at least 3.0; a difference of 50 guarantees at least 4.5 (elements smaller than a quarter inch or 40 dp need 50, larger need 40). Contrast levels: Default = 4.5:1 for all text and icons, 3:1 required non-text, discretionary 7:1 for higher-emphasis text; Medium = 4.5:1 text and 3:1 all non-text, discretionary 7:1 text and 11:1 high-emphasis; High = 7:1 text and icons, 4.5:1 non-text, discretionary 11:1 text and 21:1 high-emphasis. A good UI stays functional in grayscale. Schemes: 5 key colors, each a tonal palette of 13 tones; primary is Tone 40 in light and Tone 80 in dark; tertiary hue example is shifted by 30. FIDELITY and CONTENT variants keep the source chroma so brand colors stay recognizable. A disliked-colors rule lightens an offending tertiaryContainer.

**Checks**
- [MUST] Every text/background and icon/background pair meets 4.5:1 (3:1 for large text and required non-text). Audit heuristic: an L* difference of at least 50 passes 4.5:1, at least 40 passes 3:1; real WCAG computation is the gate. — adds to Apple
- [MUST] The UI stays usable in grayscale; this catches color-only state. — adds to Apple
- [SHOULD] Palettes are built in a perceptual space (HCT, OKLCH or CIELAB), not HSL; equal-lightness HSL ramps across hues are a defect. — Apple silent
- [SHOULD] Support a higher-contrast variant, mapped to Increase Contrast and `prefers-contrast: more`. — adds to Apple
- [CONSIDER] When deriving a theme from brand color, use a fidelity-style approach so the brand hue survives at real chroma. — Apple silent
- [CONSIDER] Wallpaper-driven dynamic color can dilute brand identity and cause contrast issues without clear intent (secondary summary); rarely applies on Apple platforms. (unverified) — Apple silent

**Distinctiveness**: Lock tone for contrast and spend identity on hue and chroma, which are open to any values.

**Web**: Use `oklch()` or `@material/material-color-utilities` to generate ramps. Keep a token per role pair (`--primary` / `--on-primary`) and check pairs in CI. The OKLCH-L stand-in for the 40/50 rule is approximate and needs validation before it is trusted. (unverified)

## M3 type scale

**Intent**: The Brand/Plain slot split gives identity a sanctioned home without hurting legibility.

**Baseline scale (sp, size/line height/tracking)**: Display L 57/64/-0.2 (as fetched; the web spec has long listed -0.25, unverified, from memory), Display M 45/52/0, Display S 36/44/0, Headline L 32/40/0, Headline M 28/36/0, Headline S 24/32/0, Title L 22/28/0, Title M 16/24/0.2 Medium (as fetched; commonly 0.15), Title S 14/20/0.1 Medium, Body L 16/24/0.5, Body M 14/20/0.2 (as fetched; commonly 0.25), Body S 12/16/0.4, Label L 14/20/0.1 Medium, Label M 12/16/0.5 Medium, Label S 11/16/0.5 Medium. The Emphasized scale keeps the sizes and moves one weight step heavier (Regular to Medium, Medium to Bold); the source marks those values provisional.

**Two slots**: "Brand" (Display, Headline, Title L) and "Plain" (Title M/S, Body, Label).

**Checks**
- [SHOULD] Separate brand and UI typefaces by role; a brand face in body text at 12-14 is a legibility risk. (Apple allows custom fonts with Dynamic Type support, and frames no brand slot) — adds to Apple
- [SHOULD] Emphasis uses a weight step within the same size before adding a new size. — adds to Apple
- [CONSIDER] Variable fonts with optical size for display moments. (variable SF Pro moves from Text to Display between 17 and 28 pt, beyond-hig.md) — adds to Apple
- [SHOULD] Text under 12 is flagged on desktop and web. — CONFLICT: M3 smallest label 11sp and Apple's iOS 11 pt minimum (content-a11y.md) vs Windows floor of 12px Regular / 14px Semibold; resolution: native iOS minimum is 11 pt (Apple wins); desktop and web minimum is 12 px (the stricter source, per the accessibility rule).

**Distinctiveness**: Products that use one system font for everything converge on that system's look; the Brand slot is where identity lives.

**Web**: `--font-brand` for display and headline, `--font-ui` for body and label; `font-optical-sizing: auto`; `clamp()` for display sizes only.

## M3 adaptive layout and window size classes

**Intent**: Measured breakpoints, pane ratios and state-preservation rules where Apple's two size classes are coarser.

**Width classes**: Compact under 600dp (99.96% of phones in portrait), Medium 600-839dp (93.73% of tablets in portrait), Expanded 840-1199dp (97.22% of tablets in landscape), Large 1200-1599dp (new), Extra-large 1600dp and up (new, desktop). Height classes: Compact under 480dp (99.78% of phones in landscape), Medium 480-899dp, Expanded 900dp and up. Size classes are determined by the window, not the screen, can change during the app's life, are not for isTablet-type logic, and width usually matters more than height.

**Canonical layouts**: List-detail shows both panes at Expanded and one at a time at Medium/Compact; going Compact to Expanded with only the list visible shows the list plus a placeholder detail pane. Supporting pane: Compact puts it below main content or in a bottom sheet, Medium splits 50/50, Expanded is 70% main and 30% supporting. Feed grid columns follow a minimum item width (example 180dp). List-detail when the detail is meaningful on its own; supporting pane when secondary content only makes sense alongside the primary.

**Checks**
- [MUST] Layout keys off window size, not device type or UA sniffing, and handles runtime resizing (split view, Stage Manager, desktop windows). (matches Apple's size-class rule) — adds to Apple
- [MUST] State survives a size-class change; the selected item stays selected when list-detail collapses or expands. — Apple silent
- [SHOULD] Expanded list-detail with nothing selected shows a deliberate placeholder pane, not a blank one. — Apple silent
- [SHOULD] Supporting pane is about 70/30 at expanded width. — Apple silent
- [CONSIDER] Treat 1200 and 1600 as separate tiers; don't stretch a tablet layout across a 27" desktop window. — Apple silent
- [CONSIDER] Apple's compact/regular size classes (visual.md) and `NavigationSplitView` are coarser; M3's five tiers are evidence of a finer split, not a web default. — adds to Apple

**Distinctiveness**: The Large and XL tiers push products to design a real desktop composition instead of a centered phone column.

**Web**: Container queries (`@container`) for pane logic, not viewport-only media queries. Use the project's own breakpoints (M3's 600/840/1200/1600 are evidence only: do not copy; derive from the product's own tokens and content). Feed pattern: `repeat(auto-fill, minmax(180px, 1fr))`.

## Fluent 2 principles

**Intent**: A second platform owner reaching the same emphasis budget as M3E, independently. Principles: Natural on every platform, Built for focus, One for all all for one, Unmistakably Microsoft. Platform-aware layout reuses native components and patterns 80% of the time and spends effort on signature experiences ("a little personality goes a long way").

**Checks**
- [SHOULD] Roughly 80/20: native platform components and patterns for most of the product, custom effort on a few signature experiences. Review for both failures: custom chrome where native would do, and no signature anywhere. (Apple asks for platform conventions; Fluent gives the ratio) — adds to Apple
- [SHOULD] Each product names its signature experiences explicitly (a color, a sound, an illustration style, an icon set). — Apple silent
- [CONSIDER] Read literally, "natural on every platform" defers to the host platform's conventions, which on Apple platforms are Apple's. This is our reading, not a quote. — adds to Apple

**Distinctiveness**: Identity comes from a small set of owned, repeated signature assets, not from restyling every control. Together with M3E's one or two hero moments this yields the skill's budget: signature moments at 1 or 2 per product.

**Web**: Use real platform elements (`<select>`, `<dialog>`, native date input). Spend effort on a signature illustration and icon style, a distinctive brand color role, sound or haptic where relevant, and 1-2 signature flows.

## Fluent 2 motion, layout and color

**Intent**: Choreography rules and a duration ramp that Apple does not publish.

**Motion**: Principles Functional, Natural, Consistent, Appealing. Larger elements get more time; linear easing only for consistent-rate cases like rotation; top-level navigation uses a quick fade instead of sliding, to avoid unintended hierarchy and disorientation. Staggered animation is preferred for most scenarios, non-staggered only for very large groups; use short offsets; on reload consider different offsets, starting with larger gaps and shortening them. Important elements get more prominent movement and longer durations; less significant ones are grouped with synchronized timing (moving elements together can create ambiguity). Include a "no motion" setting, keep motion constrained to the element in focus, use ARIA live regions for information conveyed only by animation. Durations: UltraFast 50ms, Faster 100, Fast 150, Normal 200, Gentle 250, Slow 300, Slower 400, UltraSlow 500. Curves: DecelerateMax `(0.1,0.9,0.2,1)`, DecelerateMid `(0,0,0,1)`, DecelerateMin `(0.33,0,0.1,1)`, AccelerateMax `(0.9,0.1,1,0.2)`, AccelerateMid `(1,0,1,1)`, AccelerateMin `(0.8,0,0.78,1)`, EasyEaseMax `(0.8,0,0.2,1)`, EasyEase `(0.33,0,0.67,1)`, Linear.

**Layout**: Base unit four pixels; off-grid 2, 6 and 10 exist for icon padding. Spacing ramp: 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 48, 52, 56. Use spacers for consistency, not blindly (align text left, icons centered; don't reuse a spacer if it breaks a pattern). Touch targets: iOS and Web 44 x 44, Android 48 x 48. Spacing makes sections without divider lines; elements set too close may be overlooked. Breakpoints: small 320-479, medium 480-639, large 640-1023, x-large 1024-1365, xx-large 1366-1919, xxx-large 1920 and up. Grid types: baseline, 12-column, manuscript, modular; no one-size-fits-all grid behavior.

**Color**: Three palettes (neutral, shared, brand). Avoid overusing brand colors or using them on large surfaces as they dilute hierarchy. Semantic colors for important messages, not decoration. Components get darker on interaction; for focus the control color does not change, the container gets a thicker stroke so mouse and keyboard states differ. Windows interaction states run in reverse (lighter). In dark mode shared colors shift in saturation and brightness to reduce eye strain.

**Checks**
- [MUST] Status colors (red, amber, green) are used only for status, never decoration. — adds to Apple
- [MUST] Keyboard focus shows a distinct indicator (thicker stroke) that differs from hover. (Apple covers focus rings on macOS; Fluent states the separation) — adds to Apple
- [SHOULD] Lists stagger with short offsets; synchronized motion only for groups of less-important elements; very large sets skip staggering (beyond-hig.md: app launch layers springs with staggered starts and ends). — adds to Apple
- [SHOULD] Brand color isn't used on large surfaces. — adds to Apple
- [SHOULD] Larger elements get longer durations on the 50-500 ms ramp. (Apple gives no duration numbers by element size) — Apple silent
- [CONSIDER] Use whitespace before divider lines to separate groups. — adds to Apple
- [SHOULD] Top-level destination switches (tab or route) use a quick fade. — CONFLICT: Apple's push for hierarchical navigation (beyond-hig.md) vs Fluent's fade instead of sliding; resolution: native iOS keeps Apple's push for hierarchical navigation, and the fade applies only to switching top-level destinations; on web, fade for tab and route switches.
- [SHOULD] State direction (darker vs lighter on interaction) follows the platform: Fluent web/M365 goes darker, Windows lighter. Apple (beyond-hig.md, Taps: "highlight on touch-down") requires a pressed highlight but gives no darker or lighter direction, so native Apple targets use the system highlight and web picks one direction and applies it consistently. — adds to Apple

**Distinctiveness**: Fluent separates shared colors (suite-wide recognition) from brand colors (per product); a family can share a system and be told apart by one sparingly applied brand color.

**Web**: 4px spacing scale with 2/6/10 nudges reserved for icon alignment. Separate `:focus-visible` from `:hover`. Stagger offsets of about 20-40 ms (our inference; Fluent gives no number). (unverified)

## Windows 11 app design

**Intent**: Exact rules for when not to round, where translucency is allowed, and how long exits take. Principles: Effortless, Calm, Personal, Familiar, Complete + Coherent.

**Geometry**: 8px for top-level containers (app windows, flyouts, dialogs); 4px for in-page elements (buttons, list backplates), bars (ProgressBar, ScrollBar, Slider) and ToolTip; 0px where straight edges meet other straight edges, when windows are snapped or maximized, where SplitButton parts touch, and on the side where a flyout attaches. Globals: `ControlCornerRadius` 4px, `OverlayCornerRadius` 8px.

**Motion** (evidence only: do not copy; derive from the product's own motion tokens):

| Purpose | Ease | Timing |
|---|---|---|
| Direct Entrance | cubic-bezier(0,0,0,1) | 167, 250, 333ms |
| Existing Elements (point to point) | cubic-bezier(0.55,0.55,0,1) | 167, 250, 333ms |
| Direct Exit | cubic-bezier(0,0,0,1) | 167ms, always combine with fade out |
| Gentle Exit | cubic-bezier(1,0,1,1) | 167ms |
| Bare Minimum (opacity) | Linear | 83ms |
| Strong Entrance (elastic, 3 keyframes) | (0.85,0,0,1) / (0.85,0,0.75,1) / (0.85,0,0,1) | 167 / 167 / 333ms |

Principles: Connected, Consistent (surfaces sharing an entry point invoke and dismiss the same way), Responsive, Delightful (brief and fleeting), Resourceful (avoid custom animations where possible).

**Materials**: Mica is opaque, subtly tinted with the desktop background, and shows window focus. Acrylic is for transient, light-dismiss surfaces only (flyouts, context menus). Smoke signals blocking interaction under a modal and is always translucent black in light and dark.

**Typography (epx)**: Caption 12/16, Body 14/20, Body Strong 14/20 semibold, Body Large 18/24, Subtitle 20/28, Title 28/36, Title Large 40/52, Display 68/92. Minimum 14px Semibold and 12px Regular (smaller is illegible in some languages). Sentence case for all UI text including titles. Bold and Italic are not in the ramp; Semibold replaces Bold, and italic is excluded for dyslexia readability. 50-60 letters per line, never fewer than 20 characters or more than 60 characters. Segoe UI Variable optical-size axis runs 8pt to 36pt.

**Checks**
- [MUST] Two-tier radius: overlays and windows get the larger radius, in-page controls the smaller, touching edges and maximized windows get 0, and nested radii must not match. (echoes concentricity, beyond-hig.md, with exact rules for when not to round) — adds to Apple
- [SHOULD] Exits are shorter than entrances, and positional exits are combined with a fade (evidence only, do not copy: Windows uses 167ms exits against entrances up to 333ms; derive durations from the product's own tokens). — Apple silent
- [SHOULD] Surfaces opened from the same entry point open and dismiss the same way. — adds to Apple
- [SHOULD] Minimum UI text on desktop is 12 Regular / 14 Semibold. (see the type-scale conflict above for the cross-platform floor) — adds to Apple
- [CONSIDER] Evidence only: do not copy; derive from the product's own motion tokens. Windows gives an 83ms opacity-only fallback for the bare-minimum case. — Apple silent
- [CONSIDER] Avoid italic for emphasis in UI; Windows excludes it for dyslexia readability, so reading-heavy or accessibility-focused products avoid it, and no product is flagged on native Apple targets for using it. — Apple silent
- [SHOULD] Translucent "glass" material only on transient, light-dismiss surfaces; base surfaces stay opaque. — CONFLICT: Apple's Liquid Glass puts translucent glass on persistent chrome (tab bars, toolbars, sidebars) vs Windows limiting Acrylic to transient surfaces with opaque Mica elsewhere; resolution: native iOS/iPadOS/macOS 26+ follows Apple (glass on controls and navigation, never in the content layer, visual.md); web enforces the layering principle (chrome distinct from content, no glass in content) and treats transient-only glass as the safer default, with any persistent-chrome glass needing a reduced-transparency fallback.
- [CONSIDER] Line length of 50-60 characters for UI copy blocks. — CONFLICT: Apple's readable width of about 65-75ch for prose (visual.md) and the common 45-75 character range vs Windows 50-60 and never above 60 for UI text; resolution: reading text follows Apple's 65-75ch; UI copy blocks are judged by their own length limits, with 60 as the practical ceiling.

**Distinctiveness**: Windows restraint (4px controls, opaque Mica, sentence case, semibold not bold) is a deliberately different look from Apple's, which shows calm does not have to mean Apple-like.

**Web**: Two radius tokens (control smaller, overlay larger), values from the product's own scale; Windows uses 4px and 8px (evidence only: do not copy; derive from the product's own tokens). `backdrop-filter` only on menus and popovers. Exits shorter than entrances, with opacity. Text floor of 12px; `max-width: 60ch` for UI prose.

## Microsoft Inclusive Design

**Intent**: Turns accessibility from a compliance list into a scenario generator for situations (one hand, glare, noise) that HIG reviewers usually skip. Source: inclusive.microsoft.design, 2016 manual.

**Principles**: Recognize exclusion; Learn from diversity; Solve for one, extend to many. Disability equals mismatched human interactions; increased mobility of technology equals increased moments of disability. Accessibility is an attribute, inclusive design is a method and not a way to meet all standards. Simulating abilities with blindfolds and earplugs alone is misleading. Benefits: increased access, reduced friction, more emotional context.

**Persona Spectrum** (Permanent / Temporary / Situational): Touch = one arm / arm injury / new parent. See = blind / cataract / distracted driver. Hear = deaf / ear infection / bartender. Speak = non-verbal / laryngitis / heavy accent. US figures: 26,000 people a year lose upper extremities, but with temporary and situational impairments the number exceeds 20M (Permanent 26K, Temporary 13M, Situational 8M, total 21M+).

**Checks**
- [MUST] One-handed pass: the primary flow can be completed one-handed on a phone (reachability, no required two-finger gestures, no hold-and-tap). — adds to Apple
- [MUST] Glare and distraction pass: state survives grayscale and low contrast, and critical info reads at a glance. — adds to Apple
- [MUST] Sound-off pass: every audio cue is mirrored visually or by haptic. — adds to Apple
- [SHOULD] Voice and input pass: voice or dictation tolerates accents and errors are forgiving. — Apple silent
- [SHOULD] Sensory-overload pass: motion, sound and notifications can be reduced; pairs with the calmer-variant finding. — adds to Apple
- [CONSIDER] Persona Network: shared and observed use (screen visible to others, handing the device over). — Apple silent
- [CONSIDER] Use the 26K vs 21M+ framing as the business argument for situational impairment. (Apple does not quantify it) — Apple silent

**Distinctiveness**: Solve for one, extend to many yields non-generic solutions; constraint-driven designs (captions, one-handed layouts) differ from template defaults.

**Web**: Add review scenarios: phone in one hand, outdoors at full sun, sound off, keyboard only, voice only, slow network while distracted.

## Cross-system synthesis (what Apple does not give)

**Emphasis budget**: count hero or signature moments; 0 is generic, more than 2 is noisy.

**Evidence**: Google's 46 studies, 18,000+ participants, "up to four times faster", plus the negative results (label removal, paradigm-breaking layouts).

**Checkable motion**: compare the product's motion against its own tokens (the M3, Fluent and Windows figures above are evidence only: do not copy); never overshoot opacity or color.

**Custom accessible color**: tone deltas 40 and 50, three contrast levels, grayscale test.

**Where glass is allowed**: see the Windows conflict above.

**Adaptive state rules**: selection survives size-class changes, placeholder pane, 70/30, 1200/1600 tiers.

The register question (utilitarian vs consumer) is settled in the profile: motion and emphasis expectations follow it, and the skill requires the product to state its own signature choices and checks consistency rather than prescribing them.

## Not reached in this pass

Original Google post with the "iOS HIG" comparison (reportedly deleted; only a search snippet seen). androidauthority M3E article (HTTP 403). M3 color roles page, typography page body and component-specific usage pages. Fluent 2 iOS guidance and elevation ramp. Inclusive Activities PDF and cognition guides. No 2026 revisions to M3 Expressive or Fluent 2 were found; treat that as provisional. (unverified)
