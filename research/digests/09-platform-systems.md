# 09 — Other platform design systems (Material 3 / M3 Expressive, Fluent 2, Windows, Microsoft Inclusive)

Scope: Google Material Design 3 including M3 Expressive (May 2025), Microsoft Fluent 2, Windows 11 app design, and the Microsoft Inclusive Design toolkit. Fetched 2026-10-23.

**How to read this.** Apple's HIG is the base of hig-review. Nothing here replaces it. Each item is tagged with how it relates to Apple:
- **ADDS** = Apple says something similar; this source supplies the number, the mechanism, or the evidence.
- **SILENT** = Apple doesn't address this; the source fills the gap.
- **CONFLICT** = a real disagreement. The skill should flag it to the reviewer, not pick a winner over Apple.

Apple-side claims marked "(unverified, from memory)" were not fetched in this pass. Check them against our HIG digest.

Severity tags: [MUST] = treat as a defect, [SHOULD] = strong default, [CONSIDER] = judgment call.

---

## 1. M3 Expressive research — "Expressive Design: Google's UX Research" (https://design.google/library/expressive-material-design-google-research, research from 2022; published with the May 2025 launch; no date on page)

**Why it matters.** This is the largest published body of evidence on whether "expressive" UI helps or hurts usability. Apple publishes nothing comparable. It is also the source of the one direct shot at Apple: press coverage says Google compared expressive designs against designs that followed the iOS HIG.

**Figures (verbatim from the page unless noted):**
- "46 separate research studies with hundreds of designs"; "more than 18,000 participants from around the world"; the work spanned "the past three years", starting in 2022.
- Preference: "up to 87%" among 18–24-year-olds, and "a net-positive indication across all age groups." No percentages are given for other age groups.
- Desirability lifts: +32% subculture perception, +34% modernity, +30% rebelliousness.
- Time-to-locate: participants spotted key UI elements "up to four times faster". The email Send button was found 4× faster after being made larger, placed "just above the keyboard", and given a secondary color. The eye-tracking work covered 10 apps.
- Age: "a dramatic erasure of age effects". Users 45+ performed "on par with their younger counterparts."
- Tap time on key actions "decreased by seconds". No exact figure is given.
- Caveats on the page: "a strong minority of users preferred calmer, less intense versions"; "No amount of emotion can compensate for a lack of clarity"; "When basic interaction paradigms are broken, expressive design can lead to poor usability or negative sentiment."
- Negative results reported: (a) a music playlist that swapped the vertical song list for scattered album art felt modern, but usability dropped; (b) removing text labels from email actions reduced usability; (c) lower familiarity reduced both preference and usability.
- Secondary source only (Business Insider via search snippet; the original Google post was reportedly deleted): expressive design was "strongly preferred by people of all ages over non-expressive design that followed the iOS Human Interface Guidelines." Treat this as a press report of Google's own unreplicated claim, not as evidence.

**Key principles / checks**
- [MUST] Primary-action findability. The screen's single most important action should be the most salient element: size, position near the thumb or keyboard, and a distinct color role. Test: in a 1–2 s squint or blur test, can you name the primary action? (ADDS: Apple's hierarchy guidance, now with a measured effect.)
- [MUST] Don't trade labels for looks. Icon-only actions measurably reduced usability in Google's own studies. (ADDS: agrees with Apple's advice to label ambiguous icons.)
- [MUST] Don't break basic interaction paradigms such as lists, back, or tap targets in the name of expression. The scattered-album-art result is the cautionary example.
- [SHOULD] Make expressiveness depend on context. The page names banking as a place where media-app tactics may not fit.
- [SHOULD] Offer, or at least design for, a calmer variant. A "strong minority" prefers it. Pairs with Reduce Motion and Increase Contrast.
- [CONSIDER] Usability-test any expressive "hero" treatment against a plain baseline. Google's own advice is to research "to ensure you haven't gone too far."

**Where it goes beyond / conflicts with Apple**
- ADDS: an effect size (4× faster to locate) for emphasis through size, placement, and color.
- SILENT: Apple publishes no research on emotional response by age group.
- CONFLICT (soft, and only reported in the press): Google claims expressive beats HIG-conformant design on preference. The skill should NOT conclude "be less Apple." The supported reading is narrower. Uniform, restrained emphasis can bury the primary action, and the HIG doesn't prevent strong emphasis on that action.

**Distinctiveness lessons.** Expressiveness comes from five levers: color, shape, size, motion, containment. They are applied unevenly so that one thing wins. The tactic that produces distinctiveness is concentrated contrast, not decoration spread everywhere.

**Web translation.** The primary CTA gets a distinct color role, not just a different shade of the same blue. Make it larger (≥48px tall on touch) and place it at the end of the user's flow: above the keyboard on mobile, at the bottom of a sticky composer. Run a blur test (`filter: blur(6px)` screenshot) during review.

**Slop tells (our inference).** Every card, button, and badge gets the same corner radius, the same weight, and the same accent color, so nothing wins. Or the reverse: random "expressive" blobs and tilted cards with no hierarchy purpose (the scattered-album-art failure). Icon-only toolbars that look clean but test worse.

---

## 2. "Start building with Material 3 Expressive" (https://m3.material.io/blog/building-with-m3-expressive, May 13 2025)

**Why it matters.** This is the official list of tactics. It is the most portable set of "how to make a system-based UI not look stock" moves published by any of the three platform owners.

**Facts (verbatim):** "M3 Expressive isn't a new version of the system. We're not deprecating M3, and this isn't 'M4.'" "Fourteen new or updated components": App bars, Button groups (new), Common buttons, Extended FAB, FAB menu (new), FABs, Icon buttons, Loading indicator (new), Navigation bar, Navigation rail, Progress indicators, Sliders, Split button (new), Toolbars (new). Secondary sources say "15". The official post says fourteen. Also "35 shapes"; "our most researched update to the design system since its launch in 2014."

**The seven tactics (verbatim headings) and checks**
1. "Use a variety of shapes." Caution: "Smaller shapes can result in essential actions looking less important." Do: "Break from the surrounding shape style to draw attention to a particular element." → [SHOULD] The primary element's shape should differ from its neighbors' (e.g., square-ish inside a field of pills, or the reverse).
2. "Apply rich and nuanced colors." "Use contrast between primary, secondary, and tertiary color roles to prioritize actions." Caution: "Without contrast, elements can blend together." → [SHOULD] At least two accent roles exist and do different jobs.
3. "Guide attention with typography." "Create editorial-like moments in your app… Heavier weights, larger sizes, color, and spacing." → [CONSIDER] One editorial-scale type moment per key screen.
4. "Contain content for emphasis." "Give the most important content… visual prominence through ample space and the brightest surface mapping." Caution: "Ungrouped information can blend together."
5. "Add fluid and natural motion."
6. "Leverage component flexibility." "Shift components or controls depending on the environment."
7. "Combine tactics to create hero moments." "Stick to one or two hero moments in your product; too many moments can be overwhelming or distracting." Selection test: "Is this interaction emotionally impactful?" / "Is this a key interaction in your product?"

**Where it goes beyond / conflicts with Apple**
- SILENT: Apple has no "hero moment budget". Google caps hero moments at **1–2 per product**. That gives the skill a checkable rule: count the moments that combine several tactics.
- ADDS: Apple's "deference / let content shine" ethos (unverified, from memory, as phrased in older HIG editions) pushes toward restraint everywhere. M3E says to be restrained almost everywhere and loud in one or two places. These fit together: keep Apple's restraint as the default and allow a budgeted exception.

**Distinctiveness lessons.** The hero-moment budget is the strongest anti-cookie-cutter rule found in this scope. A product is recognized by its one or two signature interactions, not by its button style. Fluent says the same thing (§6, "signature experiences").

**Web translation.** Pick 1–2 flows (e.g., checkout success, the first-run "aha", the core create action) and give them a custom shape, motion, and type treatment. Everything else stays on the system.

**Slop tells (our inference).** "Hero moments" everywhere: confetti on every save, gradient headline on every section, a bouncing card on every hover. Or none at all: a templated SaaS dashboard with no single memorable interaction.

---

## 3. M3 motion physics system (https://m3.material.io/styles/motion/overview/how-it-works and /specs; androidx source `ExpressiveMotionTokens.kt`, `StandardMotionTokens.kt`; MDC-Android `docs/theming/Motion.md`; May 2025)

**Why it matters.** It is the only platform system that publishes spring parameters as named tokens, plus a cubic-bezier + duration conversion table for the web. That makes motion review checkable.

**Verbatim spec points**
- "The physics system is replacing the previous system based on easing and duration."
- Two schemes. "Expressive is Material's opinionated motion scheme, and should be used for most situations, particularly hero moments and key interactions. The expressive motion scheme overshoots the final values to add bounce." "Standard feels more functional with minimal bounce, and should be used for utilitarian products."
- "Spatial spring tokens are used for animations that move something on screen, for example the x and y position, rotation, size, rounded corners. This spring overshoots." "Effects spring tokens are used to animate properties such as color and opacity animations, where there shouldn't be any overshoot."
- Speeds: "Most motion should use the default speed, while smaller elements may use fast and larger elements may use slow." Fast = switches and buttons; Default = bottom sheet, expanded nav rail; Slow = full-screen.
- "All component motion is driven by two tokens: expressive fast spatial and expressive fast effects." "21 Material components use the motion physics system by default" (Compose).
- "Spring tokens work across devices… the exact values of each token differ depending on if the device is a wearable, phone, or tablet."
- MDC doc example: for a pressed button that changes shape and color, use fast spatial for the shape and fast effects for the color. A background's alpha must never go above 100%, which is why effects springs don't overshoot.

**Spring tokens (dampingRatio / stiffness), from androidx source:**

| Token | Expressive | Standard |
|---|---|---|
| Fast spatial | 0.6 / 800 | 0.9 / 1400 |
| Default spatial | 0.8 / 380 | 0.9 / 700 |
| Slow spatial | 0.8 / 200 | 0.9 / 300 |
| Fast effects | 1.0 / 3800 | 1.0 / 3800 |
| Default effects | 1.0 / 1600 | 1.0 / 1600 |
| Slow effects | 1.0 / 800 | 1.0 / 800 |

**Web conversion table (verbatim, m3 specs page):**

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

Web guidance: "Use springs when possible, otherwise use curves that mimic the springs for animations without interruptions or gestures."

Legacy easing (still a fallback, MDC doc): standard `cubic-bezier(0.2, 0, 0, 1)`; emphasized decelerate `(0.05, 0.7, 0.1, 1)`; emphasized accelerate `(0.3, 0, 0.8, 0.15)`. Durations run 50–1000 ms in 16 steps (Short1 = 50 … ExtraLong4 = 1000).

**Checks**
- [MUST] Color and opacity animations never overshoot. Use a critically damped spring (damping 1.0) or a non-overshooting curve. An overshooting bezier (y > 1) on opacity or color is a defect. (SILENT in Apple: Apple doesn't separate spatial springs from effects springs.)
- [MUST] Gesture-driven and interruptible motion uses springs, not fixed-duration curves. Bezier curves are a fallback only for "animations without interruptions or gestures." (ADDS: Apple's SwiftUI defaults to springs (unverified, from memory); M3 states the rule explicitly.)
- [SHOULD] Speed scales with element size or travel distance: fast for small controls, default for partial-screen, slow for full-screen. Fluent and Windows say the same (§6, §7).
- [SHOULD] One motion scheme product-wide; swap schemes only per element and on purpose (M3 "Level 3").
- [CONSIDER] Utilitarian or pro tools use the Standard (≈0.9 damping) scheme. Consumer and emotional products use Expressive (0.6–0.8 damping) on hero moments only.

**Where it goes beyond / conflicts with Apple**
- ADDS: Apple's SwiftUI spring presets (`.smooth`, `.snappy`, `.bouncy`) are parameterized by duration and bounce rather than damping and stiffness (unverified, from memory). M3 numbers can be converted (damping ratio ≈ 1 − bounce, roughly). The skill can use M3's spatial-vs-effects split as a review lens on Apple-platform code without importing M3's values.
- CONFLICT (stylistic): M3 calls the bouncy Expressive scheme the default "for most situations." Apple's guidance stresses brief, purposeful motion that doesn't distract (unverified, from memory). On Apple platforms, keep Apple's restraint and treat M3's bounce as the hero-moment exception, not the baseline.

**Distinctiveness lessons.** Motion "feel" is a brand signature that tokens can set. A product can define its own damping/stiffness pair (M3 "Level 2: Create a custom motion scheme") rather than shipping a platform default or a generic `ease-in-out 300ms`.

**Web translation.** CSS `linear()` can approximate a spring with real overshoot. Otherwise use the table above. Opacity and color transitions use the effects curves (no y > 1). Always gate spatial bounce behind `@media (prefers-reduced-motion: no-preference)`.

**Slop tells (our inference).** `transition: all 0.3s ease-in-out` on everything. Identical durations regardless of element size. Bounce on opacity fades. Framer Motion's default spring on every element, including fades. Springy overshoot on enterprise data tables.

---

## 4. M3 shape system (https://m3.material.io/styles/shape/overview-principles; androidx `ShapeTokens.kt`; May 2025 update)

**Corner scale (dp, from source):** None 0 · ExtraSmall 4 · Small 8 · Medium 12 · Large 16 · LargeIncreased 20 · ExtraLarge 28 · ExtraLargeIncreased 32 · ExtraExtraLarge 48 · Full = circle. May 2025 added LargeIncreased (20), ExtraLargeIncreased (32), and ExtraExtraLarge (48), and "Updated fully rounded corners to use full. Previously, this was defined using 50% of the component size."

**Principles (verbatim headings):** "Use shapes and text in harmony" · "Morph shapes to connect function and feeling" · "Be bold and dare to embrace tension" · "Shape is versatile, not semantic" · "Use abstract shapes sparingly" · "Emphasize aesthetic moments with shape" · "Shape can be 2.5D".

**Notable lines**
- "Material historically focused on rounded shapes. However, using sharp shapes, thereby adding tension, creates more dynamic design, one that's more memorable and expressive."
- "Shapes without clear meaning behind why they're different can add more visual clutter than delight."
- Abstract shapes are for "photography cropping, personalized avatar masking, and other non-interactive elements." "Decorative moments offer the most flexible and creative uses of shape."
- Morph to communicate "Interaction states… Actions in progress… Changes in the environment."
- "M3 shapes and Google Sans Flex share roundness visual attributes." Shape language should echo the typeface.

**Checks**
- [SHOULD] Corner radii come from a small, named scale, and each radius has a reason (container vs control vs decorative). Arbitrary radii (7px, 10px, 14px mixed) are a defect.
- [SHOULD] Abstract or decorative shapes go on non-interactive elements only (imagery, avatars, illustrations). Interactive controls keep recognizable affordances.
- [CONSIDER] Use deliberate shape tension, sharp beside round, to mark the primary element.
- [CONSIDER] The shape language matches the typeface's geometry (round type gets round shapes, a grotesk with sharp terminals gets tighter radii).

**Where it goes beyond / conflicts with Apple**
- ADDS: Apple uses continuous ("squircle") corners and concentric radii, where inner radius = outer radius − padding (unverified, from memory; check our HIG digest for the Liquid Glass-era wording). M3 adds the idea that the *mix* of shapes carries hierarchy, and that shape should match the type.
- SILENT: Apple doesn't encourage "tension" or abstract shapes.
- Distinctiveness lesson: radius is one of the most visible brand fingerprints. All-pill-everything reads as M3. Large continuous corners plus glass reads as Apple. A product should choose its radius scale on purpose, tied to its typeface.

**Web translation.** Define `--radius-*` tokens (e.g., 4/8/12/16/28/full) and lint for raw px radii. Use `border-radius: 9999px` (or M3's "full") rather than 50% on non-square elements. Use `clip-path` or SVG masks for decorative shapes on imagery only.

**Slop tells (our inference).** Every element at `rounded-2xl` (16px) regardless of size. Nested cards with the same radius inside and out, which breaks concentricity. Blob shapes on buttons.

---

## 5. M3 color: HCT and dynamic color (James O'Leary, "The Science of Color & Design", https://m3.material.io/blog/science-of-color-design, Feb 17 2022; material-color-utilities `concepts/*.md`, https://github.com/material-foundation/material-color-utilities)

**Why it matters.** This is the most rigorous public treatment of turning brand color into an accessible, themeable palette. Apple gives semantic system colors but no method for building your own accessible palette.

**Verbatim facts**
- "HSL isn't remotely accurate… it was built to make computing colors fast on 1970s computers." "At HSL 'lightness' 50, accurately measured lightness ranges from 33 to 96!"
- HCT = hue (CAM16) + chroma (CAM16) + tone (= L* from L\*a\*b\*). Hue runs 0–360. "chroma values in HCT top out at roughly 120". Tone runs 0 (black) to 100 (white).
- "a difference of 40 in tone guarantees a WCAG contrast ratio ≥ 3.0; a difference of 50 in tone guarantees a contrast ratio ≥ 4.5." The blog states it as: "smaller elements (less than ¼" or 40 dp) require a tone difference of 50 with their background, larger elements require a tone difference of 40."
- Contrast levels in MCU schemes. Default: guaranteed 4.5:1 for all text and icons and 3:1 for required non-text; discretionary 7:1 for higher-emphasis text. Medium: 4.5:1 text and 3:1 all non-text; discretionary 7:1 text and 11:1 high-emphasis. High: 7:1 text and icons, 4.5:1 non-text; discretionary 11:1 text and 21:1 high-emphasis.
- "A helpful way to think about a user interface with good contrast ratios is that it remains functional even in its gray-scale format."
- Scheme generation: the source color yields 5 key colors, and each becomes a tonal palette of "13 tones". Primary uses Tone 40 in light theme and Tone 80 in dark. Example: tertiary hue is shifted by 30 from the source.
- Variants (enum in source): MONOCHROME, NEUTRAL, TONAL_SPOT, VIBRANT, EXPRESSIVE, FIDELITY, CONTENT, RAINBOW, FRUIT_SALAD, CMF. FIDELITY/CONTENT schemes adjust tone to keep the source color's chroma, which keeps brand colors recognizable.
- Hard constraints include: "tertiaryContainer should not be disliked, otherwise it would be lightened." MCU has an explicit "disliked colors" rule.

**Checks**
- [MUST] Every text/background and icon/background pair meets 4.5:1 (3:1 for large text and required non-text). A quick heuristic for audits: an L* (tone) difference of ≥ 50 passes 4.5:1, and ≥ 40 passes 3:1.
- [MUST] Grayscale test: the UI stays usable in grayscale (MCU's own framing). This catches color-only state.
- [SHOULD] Palettes are built in a perceptual space (HCT, OKLCH, or CIELAB), not HSL. Equal-"lightness" HSL ramps across hues are a defect.
- [SHOULD] Support a higher-contrast variant. MCU defines three levels. Map them to Apple's Increase Contrast and CSS `prefers-contrast: more`.
- [CONSIDER] When deriving a theme from brand color, use a fidelity-style approach so the brand hue survives at its real chroma, instead of tonal-spot pastel washing.

**Where it goes beyond / conflicts with Apple**
- SILENT: Apple has no published method for custom accessible palettes (it supplies system colors with built-in variants).
- ADDS: the tone-delta rule gives reviewers a fast mental check. Apple only says to meet contrast minimums (unverified, from memory, for the exact HIG wording).
- Note: Material You's wallpaper-driven dynamic color makes the app look like the user's OS rather than the brand. The supercharge.design summary warns that dynamic color "without clear intent can cause contrast issues and dilute brand identity." On Apple platforms this rarely applies.

**Distinctiveness lessons.** HCT separates *tone* (which accessibility constrains) from *hue and chroma* (which brand is free to set). The blog says it directly: "hue and chroma, are open to any values, enabling more creativity." That is the key move: lock tones for contrast and spend your identity on hue and chroma.

**Web translation.** Use `oklch()` in CSS (perceptual, widely supported) or MCU's TypeScript package (`@material/material-color-utilities`) to generate ramps. Keep a token for each role pair (e.g., `--primary` / `--on-primary`) and check pairs in CI.

**Slop tells (our inference).** HSL-generated ramps where yellow-500 is far lighter than blue-500. Tailwind default indigo/violet as "brand". Purple-to-blue gradients. Tonal-spot-style pastel containers that make every Android-ish app look identical.

---

## 6. M3 type scale (androidx `TypeScaleTokens.kt`; https://m3.material.io/styles/typography)

**Baseline scale (sp, size/line height/tracking/weight):** Display L 57/64/−0.2 (as fetched; the M3 web spec has long listed −0.25, unverified, from memory) · Display M 45/52/0 · Display S 36/44/0 · Headline L 32/40/0 · Headline M 28/36/0 · Headline S 24/32/0 · Title L 22/28/0 · Title M 16/24/0.2 Medium (as fetched; commonly listed as 0.15) · Title S 14/20/0.1 Medium · Body L 16/24/0.5 · Body M 14/20/0.2 (as fetched; commonly 0.25) · Body S 12/16/0.4 · Label L 14/20/0.1 Medium · Label M 12/16/0.5 Medium · Label S 11/16/0.5 Medium.

**Emphasized scale (M3E).** Same sizes, one weight step heavier: Regular→Medium, Medium→Bold. The source file marks these values "TODO update with the generated tokens once available," so treat them as provisional.

**Two typeface slots: "Brand" (Display/Headline/Title L) and "Plain" (Title M/S, Body, Label).** The system is designed so a product can swap in a brand face for display roles while keeping a legible UI face for the rest.

**Checks**
- [SHOULD] Separate brand and UI typefaces by role (display vs body/label). A brand typeface in body text at 12–14 is a legibility risk.
- [SHOULD] Emphasis uses a weight step within the same size before adding a new size. This keeps the scale tight.
- [CONSIDER] Use variable fonts with optical size for display moments (M3E: "New type styles for variable and static fonts").

**Where it goes beyond / conflicts with Apple**
- ADDS: Apple's Dynamic Type styles (Large Title … Caption 2) and SF's automatic optical sizing (unverified, from memory) are the Apple equivalent. M3 adds the explicit **Brand/Plain slot split**. Apple encourages custom fonts only with Dynamic Type support and doesn't frame a brand slot.
- CONFLICT (minor): M3's smallest label is 11sp, the same as Apple's Caption 2 at 11pt (unverified, from memory). Windows sets a higher floor (§7: 12px Regular / 14px Semibold minimum). Flag text under 12 on desktop and web.

**Distinctiveness lessons.** The Brand slot is where identity lives. Products that use one system font for everything converge on that system's look.

**Web translation.** `--font-brand` for display/headline, `--font-ui` for body/label. Use `font-optical-sizing: auto`. Use `clamp()` for display sizes only.

**Slop tells (our inference).** Inter for everything at weights 400/600. A 6xl gradient hero headline paired with tiny gray 14px body. No brand face anywhere.

---

## 7. M3 adaptive layout: window size classes and canonical layouts (https://developer.android.com/develop/ui/compose/layouts/adaptive/use-window-size-classes ; …/canonical-layouts)

**Breakpoints (verbatim)**

| Width class | Range | Coverage |
|---|---|---|
| Compact | < 600dp | 99.96% of phones in portrait |
| Medium | 600–839dp | 93.73% of tablets in portrait |
| Expanded | 840–1199dp | 97.22% of tablets in landscape |
| Large (new) | 1200–1599dp | Large tablet displays |
| Extra-large (new) | ≥ 1600dp | Desktop displays |

Height classes: Compact < 480dp (99.78% of phones in landscape) · Medium 480–899dp · Expanded ≥ 900dp.

Verbatim rules: "window size classes are explicitly not determined by the size of the device screen." "Window size classes are not intended for *isTablet*‑type logic." "The window size class can change throughout the lifetime of your app." "Available width is usually more important than available height due to the ubiquity of vertical scrolling."

**Canonical layouts**
- List-detail: in Expanded, both panes are shown together. In Medium/Compact, one pane is shown at a time. When going from Expanded to Compact, the detail stays visible. When going from Compact to Expanded with only the list visible, show "the list and a placeholder detail pane."
- Supporting pane: Compact puts the supporting content "below the main content or inside a bottom sheet." Medium uses an even 50/50 split. Expanded is "70% … main content, 30% … supporting."
- Feed: grid columns are driven by minimum item width (example `GridCells.Adaptive(minSize = 180.dp)`).
- Choosing: list-detail when "the detail is meaningful on its own"; supporting pane when secondary content "only makes sense alongside the primary content."

**Checks**
- [MUST] Layout logic keys off window size, not device type or UA sniffing. It must handle resizing at runtime (split view, Stage Manager, desktop windows).
- [MUST] State survives a size-class change. The selected item stays selected when list-detail collapses or expands.
- [SHOULD] Expanded-width list-detail with nothing selected shows a deliberate placeholder pane, not a blank one.
- [SHOULD] Supporting-pane ratio ≈ 70/30 at expanded width.
- [CONSIDER] Treat ≥ 1200 and ≥ 1600 as separate tiers. Don't stretch a tablet layout across a 27" desktop window.

**Where it goes beyond / conflicts with Apple**
- ADDS: Apple uses horizontal/vertical size classes (compact/regular) and `NavigationSplitView` (unverified, from memory). Apple's two classes are coarser. M3 adds measured coverage percentages, five width tiers, explicit pane ratios, and state-preservation rules on transitions.
- SILENT: the placeholder-detail rule and the 70/30 supporting split.

**Distinctiveness lessons.** Not much, since these are structural. But the "Large/XL" tiers push products to design a real desktop composition instead of a centered phone column, and that is where many products look generic.

**Web translation.** Use container queries (`@container`) for pane logic, not viewport-only media queries. Breakpoints of 600/840/1200/1600 work as defaults. CSS grid `repeat(auto-fill, minmax(180px, 1fr))` is the feed pattern.

**Slop tells (our inference).** A single `max-w-7xl mx-auto` column at every width. A list-detail that turns into two equal 50/50 columns on desktop with an empty right side. Hiding the sidebar below 768px and calling it responsive.

---

## 8. Fluent 2 design principles (https://fluent2.microsoft.design/design-principles; Fluent 2 launched 2023)

**Principles (verbatim headings):** "Natural on every platform" · "Built for focus" · "One for all, all for one" · "Unmistakably Microsoft".

**The key line:** a platform-aware layout "allows us to reuse native platform components and patterns 80% of the time, focusing our energy on signature experiences instead." And: "We focus our energy on signature experiences that connect our products together and give them a distinctively Microsoft feel. From color to sound, illustration to icons… A little personality goes a long way."

**Checks**
- [SHOULD] Roughly 80/20: native platform components and patterns for most of the product, and custom design effort concentrated on a few signature experiences. Review for both failure modes: custom chrome where native would do, and zero signature anywhere.
- [SHOULD] Each product names its signature experiences explicitly (e.g., a color, a sound, an illustration style, an icon set).

**Where it goes beyond / conflicts with Apple**
- ADDS: Apple asks for platform conventions. Fluent gives a ratio (80%) and names where the remaining effort goes. That is the same idea as M3E's 1–2 hero moments, reached independently. Two platform owners converging on "mostly native, a few signature moments" is the strongest cross-system guidance in this scope.
- Fluent's "Natural on every platform" ("adapt to the device you're on and should build off the familiar") means that, read literally, Microsoft's own system defers to the host platform's conventions, which on Apple platforms are Apple's. That's our reading of the principle, not a quote. It supports keeping HIG as the base.

**Distinctiveness lessons.** Identity comes from a small set of owned, repeated signature assets (color, sound, illustration, iconography), not from restyling every control.

**Web translation.** Use the platform's real elements (`<select>`, `<dialog>`, native date input, system font stack where appropriate). Spend effort on a signature illustration and icon style, a distinctive brand color role, sound or haptic where relevant, and 1–2 signature flows.

**Slop tells (our inference).** Custom-styled everything (dropdowns, scrollbars, checkboxes) with nothing memorable. Or a stock shadcn/ui install with no signature asset at all. Both fail the 80/20 test in opposite directions.

---

## 9. Fluent 2 motion, layout, color (https://fluent2.microsoft.design/motion, /layout, /color; tokens from https://github.com/microsoft/fluentui `packages/tokens/src/global/*.ts`)

**Motion (verbatim)**
- Principles: Functional, Natural, Consistent, Appealing.
- "Give larger elements more time to animate than smaller elements."
- Linear easing: "use it only in cases that need a consistent rate, like rotations."
- Top-level navigation: "use a quick fade transition instead of moving or sliding UI elements around… avoiding unintentional hierarchy and disorientation."
- Choreography: "Poor choreography can result in an animation that appears cheap." "For most scenarios, a staggered animation is preferred. Non-staggered animation should only be used for very large groups." "use short offsets"; when content reloads, "consider using different animation offsets… starting with larger gaps and gradually shortening them."
- Hierarchy: "Give important elements more emphasis through more prominent movements and longer durations. Conversely, less significant elements should be grouped together with synchronized timing." Caption on example: "Moving elements together can create ambiguity."
- Accessibility: include a "no motion" setting; "Keep the motion constrained to the element in focus"; use ARIA live regions for information otherwise conveyed only by animation.
- Duration tokens: UltraFast 50ms · Faster 100 · Fast 150 · Normal 200 · Gentle 250 · Slow 300 · Slower 400 · UltraSlow 500.
- Curves: DecelerateMax `(0.1,0.9,0.2,1)` · DecelerateMid `(0,0,0,1)` · DecelerateMin `(0.33,0,0.1,1)` · AccelerateMax `(0.9,0.1,1,0.2)` · AccelerateMid `(1,0,1,1)` · AccelerateMin `(0.8,0,0.78,1)` · EasyEaseMax `(0.8,0,0.2,1)` · EasyEase `(0.33,0,0.67,1)` · Linear.

**Layout (verbatim)**
- "The base unit is four pixels." Off-grid values 2, 6, and 10 exist "to account for extra padding in the Fluent icons." Spacing ramp: 0, 2, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32, 36, 40, 48, 52, 56.
- "use spacers as a tool for creating consistency, rather than blindly using consistent spacers… adjust spacers to left align text and center align icons." Do/Don't caption: "Don't use the same spacers if it breaks a pattern."
- Touch targets: "iOS & Web [44 x 44], Android [48 x 48]."
- "spacing creates logical sections of content on a page without having to use lines or other graphical elements as a divider."
- "UI elements that are set close to each other might be overlooked. People may notice the grouping but not process each individual item."
- Breakpoints: small 320–479 · medium 480–639 · large 640–1023 · x-large 1024–1365 · xx-large 1366–1919 · xxx-large ≥ 1920.
- Grid types named: baseline, column (12-col), manuscript, modular. "There is no one-size-fits-all grid behavior."

**Color (verbatim)**
- Three palettes: neutral, shared, brand. Brand: "Avoid overusing brand colors or using them on large surfaces as they can dilute a hierarchy."
- Semantic colors: "Use semantic colors for important messages. Don't use them for decoration."
- Interaction states: "a component will get darker as someone interacts with it… For focus states, the color of the control does not change, but the container gets a thicker stroke to create clear visual distinctions between mouse and keyboard interactions." "Windows interaction states currently treat color in reverse; controls will get lighter."
- In dark mode, shared colors "shift in saturation and brightness to reduce eye strain."

**Checks**
- [MUST] Status colors (red, amber, green) are used only for status, never as decoration. (ADDS: Apple's guidance on consistent meaning for color.)
- [MUST] Keyboard focus is shown with a distinct indicator (thicker stroke) that differs from hover. (ADDS: Apple covers focus rings on macOS; Fluent states the hover-vs-focus separation explicitly.)
- [SHOULD] Lists stagger with short offsets. Synchronized motion is reserved for groups of less-important elements. Very large sets skip staggering.
- [SHOULD] Top-level navigation transitions use a quick fade, not a slide. Note the possible CONFLICT with Apple's push/slide navigation hierarchy on iOS (unverified, from memory). On iOS, keep Apple's push for hierarchical navigation; Fluent's fade applies to switching *top-level* destinations (e.g., tab switches), where Apple also doesn't slide.
- [SHOULD] Brand color isn't used on large surfaces.
- [CONSIDER] Use whitespace before divider lines to separate groups.

**Where it goes beyond / conflicts with Apple**
- SILENT: choreography rules (stagger, offset tapering, hierarchy by duration). Apple has little on multi-element choreography.
- ADDS: a published duration ramp (50–500 ms). Apple gives no duration numbers (unverified, from memory).
- CONFLICT (platform-specific): "darker on interaction" (web/M365) vs "lighter on interaction" (Windows). This is a reminder that state direction is a platform convention. On Apple platforms, follow Apple's highlight behavior.

**Distinctiveness lessons.** Fluent separates *shared* colors (suite-wide recognition: avatars, calendars) from *brand* colors (per product). A product family can share a system and still tell its members apart by one brand color applied sparingly.

**Web translation.** Use a 4px spacing scale with 2/6/10 nudges reserved for icon alignment. Separate `:focus-visible` styling from `:hover`. Stagger offsets of about 20–40 ms (our inference; Fluent gives no number). Fade for tab or route switches.

**Slop tells (our inference).** Brand-colored full-bleed headers and sidebars. Red/green used as decorative accents. Every list item fading in with identical timing (or the same stagger every reload). Divider lines between every row instead of spacing.

---

## 10. Windows 11 app design (https://learn.microsoft.com/en-us/windows/apps/design/design-principles, /signature-experiences/geometry, /motion, /materials, /typography; pages updated 2026-02 to 2026-07)

**Principles (verbatim headings):** Effortless · Calm · Personal · Familiar · Complete + Coherent.

**Geometry (verbatim):** 8px for top-level containers ("app windows, flyouts and dialogs"). 4px for in-page elements ("buttons and list backplates"), bars ("ProgressBar, ScrollBar, and Slider"), and ToolTip ("due to its small size"). 0px where "Straight edges that intersect with other straight edges", when "windows are snapped or maximized", where parts of a SplitButton touch, and on the side where a flyout attaches to its invoking UI. Globals: `ControlCornerRadius` 4px, `OverlayCornerRadius` 8px.

**Motion (verbatim table)**

| Purpose | Ease | Timing |
|---|---|---|
| Direct Entrance | cubic-bezier(0,0,0,1) | 167, 250, 333ms |
| Existing Elements (point to point) | cubic-bezier(0.55,0.55,0,1) | 167, 250, 333ms |
| Direct Exit | cubic-bezier(0,0,0,1) | 167ms, "ALWAYS combine with fade out" |
| Gentle Exit | cubic-bezier(1,0,1,1) | 167ms |
| Bare Minimum (opacity) | Linear | 83ms |
| Strong Entrance (elastic, 3 keyframes) | (0.85,0,0,1) / (0.85,0,0.75,1) / (0.85,0,0,1) | 167 / 167 / 333ms |

Motion principles: Connected, Consistent ("Surfaces that share the same UI entry point should invoke and dismiss the same way"), Responsive, Delightful ("always brief and fleeting"), Resourceful ("Avoid custom animations where possible").

**Materials (verbatim).** Mica is opaque and "subtly tinted with the user's desktop background color", and "indicates window focus with active and inactive states." Acrylic "is used only for transient, light-dismiss surfaces such as flyouts and context menus." Smoke "is used to signal blocking interaction below a modal UI," and "is always translucent black in both light and dark mode."

**Typography (verbatim).** Ramp in epx: Caption 12/16 · Body 14/20 · Body Strong 14/20 semibold · Body Large 18/24 · Subtitle 20/28 · Title 28/36 · Title Large 40/52 · Display 68/92. "Minimum values: 14px Semibold, 12px Regular — Text smaller than these sizes and weights are illegible in some languages." "Use sentence casing for all UI text, including titles." "Bold and Italic styles are not part of the Windows type ramp. Use Semibold instead of Bold for emphasis. Italic is excluded because it can reduce readability and legibility, particularly for people with dyslexia." "Keep to 50–60 letters per line"; "Don't use fewer than 20 characters or more than 60 characters per line." Segoe UI Variable's optical-size axis runs "from 8pt to 36pt."

**Checks**
- [MUST] Two-tier radius rule: overlays and windows get the larger radius, in-page controls the smaller, and touching edges or maximized windows get 0. Nested radii must not match. (ADDS: echoes Apple's concentricity idea (unverified, from memory) with exact rules for *when not to round*, which Apple doesn't spell out.)
- [MUST] Exits are shorter than entrances (167ms exit vs up to 333ms entrance), and positional exits are combined with a fade.
- [SHOULD] Surfaces opened from the same entry point open and dismiss the same way (e.g., all toolbar popovers drop from the toolbar).
- [SHOULD] Translucent "glass" material only on transient, light-dismiss surfaces. Base surfaces stay opaque (Mica). See the CONFLICT note below.
- [SHOULD] Minimum UI text: 12 Regular / 14 Semibold on desktop.
- [SHOULD] Line length of 50–60 characters for UI copy blocks (Windows) vs the common 45–75 for long reading (our note; reconcile in the skill).
- [CONSIDER] Avoid italic for emphasis in UI (dyslexia rationale).

**Where it goes beyond / conflicts with Apple**
- **CONFLICT, flag it:** Apple's 2025 Liquid Glass direction puts translucent glass on persistent chrome such as tab bars, toolbars, and sidebars (unverified, from memory; check our HIG digest). Windows limits translucency (Acrylic) to *transient* surfaces and keeps base and persistent surfaces opaque (Mica). On Apple platforms follow Apple. On web and Windows, prefer the Windows rule. Glass on persistent chrome is also a major source of cross-platform "looks like Apple" slop.
- CONFLICT (minor): italic exclusion. Apple doesn't ban italic. Treat it as [CONSIDER] for reading-heavy or accessibility-focused products.
- SILENT: explicit exit-vs-entrance timing numbers; the 83ms opacity-only "bare minimum" fallback; zero-radius rules for touching edges.

**Distinctiveness lessons.** Windows's restraint (4px controls, opaque Mica, sentence case, semibold not bold) is a deliberately *different* look from Apple's. That shows "calm" doesn't have to mean "Apple-like."

**Web translation.** `--radius-control: 4px; --radius-overlay: 8px`. Use `backdrop-filter` only on menus and popovers. Exit animations around 167ms with opacity. Text floor of 12px; `max-width: 60ch` for UI prose.

**Slop tells (our inference).** `backdrop-blur` glass on the nav bar, cards, and modals all at once (the "glassmorphism"/faux-Liquid-Glass look). Title Case Headings On Every Button. Bold everywhere for emphasis.

---

## 11. Microsoft Inclusive Design toolkit (https://inclusive.microsoft.design/ ; manual PDF https://download.microsoft.com/download/b/0/d/b0d4bf87-09ce-4417-8f28-d60703d672ed/inclusive_toolkit_manual_final.pdf, © 2016, CC BY-NC-ND)

**Why it matters.** It turns accessibility from a compliance list into a design generator, and gives a structured way to test against situations (one hand, glare, noise) that HIG reviewers usually skip.

**Verbatim content**
- Principles: "Recognize exclusion" · "Learn from diversity" · "Solve for one, extend to many."
- "Disability is not equal to Personal Health Condition. Disability equals Mismatched Human Interactions."
- "Increased Mobility of Technology equals Increased Moments of Disability."
- "accessibility is an attribute, while inclusive design is a method… it's not a process for meeting all accessibility standards."
- "it's misleading to rely only on simulating different abilities through blindfolds and earplugs."
- Persona Spectrum (Permanent / Temporary / Situational): **Touch** = One arm / Arm injury / New parent. **See** = Blind / Cataract / Distracted driver. **Hear** = Deaf / Ear infection / Bartender. **Speak** = Non-verbal / Laryngitis / Heavy accent.
- US figures: "26,000 people a year suffer from loss of upper extremities. But when we include people with temporary and situational impairments, the number is greater than 20M." Breakdown: Permanent 26K · Temporary 13M · Situational 8M · Total 21M+ (sources cited: US Census Bureau, Limbs for Life, Amputee Coalition, MedicineHealth.com, CDC.gov, UCSF Disability Statistics Center).
- Situational examples: "In a loud crowd, they can't hear well. In a car, they're visually impaired. New parents spend much of their day doing tasks one-handed. An overwhelming day can cause sensory overload."
- Persona Network: "friends, coworkers, family members or even strangers."
- Benefits: "1. Increased access 2. Reduced friction 3. More emotional context."

**Checks (applied to UI review)**
- [MUST] One-handed pass: can the primary flow be completed one-handed on a phone (reachability, no required two-finger gestures, no hold + tap)? (Touch row.)
- [MUST] Glare and distraction pass: does state survive grayscale and low contrast, and is critical info readable at a glance? (See row.)
- [MUST] Sound-off pass: is every audio cue mirrored visually or haptically? (Hear row; captions example.)
- [SHOULD] Voice and input pass: does voice or dictation input tolerate accents? Are errors forgiving? (Speak row.)
- [SHOULD] Sensory-overload pass: can motion, sound, and notifications be reduced? Pairs with M3E's "calmer variant" finding.
- [CONSIDER] Persona Network: shared and observed use (screen visible to others, handing the device over).

**Where it goes beyond / conflicts with Apple**
- ADDS: Apple's accessibility guidance is feature-centric (VoiceOver, Dynamic Type, Reduce Motion, and so on). The persona spectrum is a *scenario generator* that turns those features into situational test cases.
- SILENT: Apple doesn't quantify situational impairment. The 26K → 21M+ figure is the business argument.

**Distinctiveness lessons.** "Solve for one, extend to many" produces non-generic solutions, because constraint-driven designs (captions, one-handed layouts) differ from template defaults. Products built from a specific constraint tend to look specific.

**Web translation.** Add review scenarios to the skill's checklist: phone in one hand, outdoors at full sun, sound off, keyboard only, voice only, slow network while distracted.

**Slop tells (our inference).** Hover-only affordances. Primary actions in the top corners of tall phone screens. Audio or video with no captions. Gesture-only features with no visible alternative.

---

## Synthesis: what Apple misses

All of these augment the HIG. None is a reason to override it on Apple platforms.

1. **An emphasis budget.** M3E caps hero moments at "one or two" per product. Fluent reuses native patterns "80% of the time" and spends the rest on signature experiences. Apple's restraint has no named exception budget. Skill rule: count hero/signature moments; 0 = generic, more than 2 = noisy.
2. **Evidence for concentrated emphasis.** Google's 46 studies / 18,000+ participants: key elements found "up to four times faster," age gaps erased for 45+. Also negative results: label removal and paradigm-breaking layouts hurt. Apple publishes no such data.
3. **Motion as checkable tokens.** M3 springs (damping/stiffness), web bezier equivalents, Fluent durations of 50–500 ms, Windows exits at 167ms. The spatial-vs-effects split (never overshoot opacity or color) is a crisp, Apple-compatible lint.
4. **Choreography.** Fluent's stagger rules, offset tapering, and "importance gets longer, more prominent motion." Apple is mostly silent on multi-element sequencing.
5. **A method for custom accessible color.** HCT/tone deltas (40 → 3:1, 50 → 4.5:1), three contrast levels, grayscale test, and the separation of tone (locked by accessibility) from hue and chroma (free for brand). Apple gives system colors but no recipe for a brand palette.
6. **Brand/Plain type slots.** A sanctioned place for a brand typeface (display roles) while UI text stays legible.
7. **Rules for when NOT to round, and where glass is allowed.** Windows: 0px on touching edges and maximized windows; translucency only on transient surfaces. This is the one place to **flag a genuine conflict** with Apple's Liquid Glass-era chrome (unverified, from memory).
8. **Adaptive-layout state rules.** Selection survives size-class changes; placeholder detail pane; 70/30 supporting pane; ≥1200/≥1600 desktop tiers; "not for isTablet logic."
9. **Situational accessibility as a scenario generator.** The persona spectrum (one arm / arm injury / new parent, etc.) and the 26K vs 21M+ framing.
10. **Overused patterns that came from these systems themselves, so the skill must not push them:** M3's pill-everything + tonal pastel containers + FAB; Fluent/Windows acrylic and glass blur; the generic `ease-in-out 300ms`; Material elevation drop shadows on every card; Inter/Roboto as the only typeface; bottom app bar + FAB (M3E itself now deprecates the bottom app bar: "still available but not recommended," per supercharge.design). Copying any one system wholesale yields that system's cookie.

## Sources not reachable

- Original Google Keyword / blog post with the "iOS HIG" comparison: reportedly deleted. Only the Business Insider summary was seen, via search snippet. The BI page redirected and was not fetched.
- androidauthority.com M3E details article: HTTP 403. Component details came from supercharge.design (secondary) and the official m3 blog (primary, fetched with a headless browser).
- m3.material.io pages without a JS render returned nothing to WebFetch. They were read through Playwright (blog, motion, motion specs, shape, color science blog). Not read: M3 color roles page, typography page body, M3E component-specific usage pages (loading indicator, button groups, toolbars).
- No 2026-dated update to M3 Expressive or Fluent 2 was found in search. Windows Learn pages show `updated_at` 2026-02 to 2026-10, but the content excerpts fetched were unchanged in substance from 2021–2024 originals. Treat "no major 2026 revisions found" as provisional.
- Fluent 2 iOS-specific guidance and the Fluent elevation/shadow ramp: not fetched.
- Microsoft Inclusive "Activities" PDF and the cognition/neurodiversity guides on inclusive.microsoft.design: not fetched.

## Open questions for skill design

1. **Hero-moment counting.** How does the skill detect a "hero moment" in code? Candidate heuristic: a screen or component using ≥3 of {custom shape, non-default motion spring, brand type slot, distinct color role, containment change}. Needs testing on real repos.
2. **Expressive vs Standard per product.** Should the skill ask the product's register up front (utilitarian / pro vs consumer / emotional) and adjust motion and emphasis expectations, as M3's two schemes do?
3. **The glass conflict.** For web and cross-platform stacks (React Native/Expo, Next) targeting iOS users, follow Apple's glass chrome or Windows's transient-only rule? Proposal: native iOS follows Apple; web defaults to the Windows rule; flag either way.
4. **Tone-delta lint.** Implement the 40/50 tone rule as a fast pre-check, with real WCAG computation as the gate? Use OKLCH L as a proxy on the web (approximate; needs validation that the guarantee holds for OKLCH as it does for L*).
5. **Line length.** Windows says 50–60 (and "never >60") for UI text. Typography literature commonly says 45–75 for reading. The skill needs one per-context rule (UI copy vs long-form).
6. **Minimum text size.** 11 (Apple Caption 2 / M3 Label S) vs 12 Regular / 14 Semibold (Windows). Use 11 for native iOS and 12 for desktop and web?
7. **Avoiding a new cookie.** If the skill recommends "one signature shape + one signature motion + brand type slot," every reviewed app may converge on *that* recipe. Should the skill require the product to state its signature choices and then check consistency, rather than prescribing them?
