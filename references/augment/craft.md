Covers non-Apple craft literature: typography canon, grids, Rams, Tufte, Refactoring UI, Vercel web guidelines, Rauno, Emil, shadows, color systems, motion canon.
Loaded by: visual, interaction and motion, distinctiveness
Snapshot: 2026-10-23
Tags: [MUST]/[SHOULD]/[CONSIDER] = the source's own strength; [Taste] = our rule. In reports, a check labelled 'adds to Apple' shows the Apple file's tag; 'Apple silent' shows 'Research'; [Taste] shows 'Taste'. [Taste] always shows 'Taste' in reports, whatever its label. Labels: `adds to Apple`, `Apple silent`, or `CONFLICT` with its resolution. This file only augments Apple; on Apple platforms the HIG rule wins unless a stated reason says otherwise. `(unverified)` means recalled from memory or a secondary source: weight it lower and never make it a Blocker on its own. Named products appear as evidence of a reason, never as a look to copy. Overused patterns (slop tells) live in references/slop-catalog.md.

## Measure and text settings (Bringhurst, Butterick, Every Layout)
**Intent**: Most measure, leading and rhythm rules on the web trace to Bringhurst. Apple gives readable-width guides but no character count, and its Dynamic Type sets leading only for system styles.
**Checks**
- [MUST] Reading text runs 45 to 75 characters per line in a single column; 66 is the classic ideal (counting spaces); multi-column work averages 40 to 50. (Bringhurst via Rutter; Butterick allows 45 to 90, two to three alphabets per line.) — adds to Apple
- [SHOULD] Cap measure at about 60ch (Every Layout: `--measure: 60ch`, `max-inline-size`; Rutter's elastic example: a column 33em wide at about 0.5em per character gives 66 characters). Size it in font-relative units so it holds when the user changes text size; `1ch` tracks the font's `0` width. Exempt `html, body, div, header, nav, main, footer` (`max-inline-size: none`). — adds to Apple
- [MUST] Body size is 15 to 25 px on the web (Butterick; 10 to 12 pt in print) — CONFLICT: Butterick's 15 to 25 px body vs the dense-tool web scale of 13 to 14 px (and the 16 px mobile web floor); resolution: Butterick's range applies to reading text; on web, comfortable products take 16 to 17 px body per the profile's density measure, dense tools 13 to 14 px, and the 16 px mobile-input floor still governs; native Apple targets follow Apple's type styles
- [MUST] Line spacing is 120 to 145% of point size, set as a unitless `line-height` (about 1.2 to 1.45). (custom text settings) — adds to Apple
- [SHOULD] Use bold or italic as little as possible, and not together. — adds to Apple
- [SHOULD] All caps only for less than one line, with 5 to 12% extra letterspacing (`letter-spacing` 0.05em to 0.12em) on caps and small caps. Lowercase at large sizes (headlines) often has its letterspacing removed. — adds to Apple
- [SHOULD] Use centered text sparingly; whole text blocks should not be centered. Butterick: "Centered text is overused. It's the typographic equivalent of vanilla ice cream: safe but boring." — adds to Apple
- [SHOULD] Headings: at most three levels (two is better). Emphasize by space above and below. Use the smallest size increment that shows a difference (12 pt body, try 12.5 or 13, not 14 or 15). — adds to Apple
- [SHOULD] Headings avoid Title Case ("Always Avoid Title Case, Because Your Headings Aren't Titles") — CONFLICT: Butterick rejects Title Case in headings vs Apple's title-style capitalization on control labels (references/apple/components-structure.md); resolution: capitalization is a house choice per element type, checked for consistency not correctness; native Apple targets follow Apple's fixed rules, web defaults to sentence case when the profile is silent.
- [SHOULD] Paragraph separation by first-line indent of one to four times the point size, or 4 to 10 points of space between paragraphs; not both. — adds to Apple
- [MUST] Curly quotes, a real ellipsis character, real dashes, one space between sentences, kerning on (`font-kerning: normal`). — adds to Apple
- [SHOULD] Space between blocks comes from multiples of the body leading (Bringhurst, Every Layout: 1rem at line-height 1.5 gives 1.5rem; larger harmonious gaps 3rem or 4.5rem). Spacing belongs to the parent context (`.stack > * + * { margin-block-start: 1.5rem }`), not to each component. (unverified for Bringhurst's own wording.) — Apple silent
- [SHOULD] Real typographic features: true small caps (use `font-variant-caps: small-caps` only when the font has them; Butterick: "If you don't have real small caps, don't use them at all."), old-style figures in running text, lining or tabular figures in tables, hanging punctuation where possible (unverified for Bringhurst's wording). — Apple silent
- [SHOULD] `font-variant-numeric: oldstyle-nums proportional-nums` for prose, `lining-nums tabular-nums` for tables. SwiftUI `.monospacedDigit()`; keep custom faces on Dynamic Type with `Font.custom(_:size:relativeTo:)`; reading columns via `.frame(maxWidth:)`. SwiftUI has no `ch` unit, so derive the point measure from the face (unverified). — Apple silent
- [SHOULD] `text-wrap: balance` for headings, captions and blockquotes (MDN: limited to six lines or less in Chromium, ten or less in Firefox). `text-wrap: pretty` for longer paragraphs to avoid orphans (it costs performance, so use it where layout matters more than speed). — Apple silent
- [CONSIDER] `hanging-punctuation: first allow-end last` as progressive enhancement (not Baseline; Safari supports it (unverified)). — Apple silent
- [SHOULD] `font-optical-sizing: auto` stays on for fonts with an `opsz` axis (small sizes get thicker strokes and larger serifs, large sizes get delicacy). Check `font-variation-settings` does not force it off. SF does this natively (Text transitions into Display between 17 and 28 pt). — adds to Apple
- [SHOULD] Prefer `font-variant-*` over low-level `font-feature-settings` (`"tnum"`, `"ss01"`, `"cv11"`), which overrides wholesale and inherits poorly (unverified). — Apple silent
- [CONSIDER] SwiftUI: `.tracking()` / `.kerning()` on caps labels, `.lineSpacing()` to bring custom fonts into range. — Apple silent

## Typeface choice and the type system (Butterick, Lupton, Tschichold, Every Layout, Utopia)
**Intent**: Butterick is the strongest counterweight to "everything looks like the default sans". The reason is fit between face and product, not a verdict on any one face.
**Checks**
- [SHOULD] Avoid goofy fonts and monospaced fonts for body text (Butterick: "especially Times New Roman and Arial"). — adds to Apple
- [SHOULD] Avoid system fonts as a default — CONFLICT: Butterick says avoid system fonts vs Apple steering toward SF / New York and Dynamic Type; resolution: system fonts are fine as Apple-native, so UI chrome and task flows stay on the system font, and a brand face is a [CONSIDER] for character on display surfaces only (marketing, reading views, headlines, identity) per split-by-surface, carried through Dynamic Type; never report SF as a failure
- [SHOULD] Avoid most free fonts — CONFLICT: Butterick's "avoid most free fonts" vs the spec's free and open-licensed faces by default; resolution: suggest free or open-licensed faces unless the profile lists licensed ones, judge fit and craft of the face, not its price
- [CONSIDER] Check face fit: does the character of the face match the product's subject and audience? Flag a default sans-only stack as a convergence risk [CONSIDER], not an error, and never name a replacement face by substitution; candidate faces come only through the Candidates step of references/augment/typography.md, each measured and traced. Suggested faces are free or open-licensed unless the profile lists licensed ones. — adds to Apple
- [SHOULD] Build hierarchy by changing one variable at a time (size or weight or color or spacing), not all at once (Lupton, unverified). — adds to Apple
- [CONSIDER] Pair faces by contrast of structure (a humanist serif with a geometric sans), not near-duplicates (Lupton, unverified). Apple is silent on multi-family pairing. — Apple silent
- [SHOULD] Require a small, consistent type system: a limited set of sizes used everywhere — CONFLICT: Every Layout and Utopia want a modular ratio (e.g. `--ratio: 1.5`) vs Butterick ("When your headings look right, they are right. The ratio is irrelevant."); resolution: stay neutral on ratios, require only a small, intentional, consistent set of sizes, and accept any ratio or none.
- [CONSIDER] Fluid web type (Utopia): define a small-screen scale and a large-screen scale and interpolate by viewport width (example: 1.2x at 320 px, 1.333x at 1500 px; calculator config `360,18,1.2,1240,20,1.25` gives `--step-0: clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem)` and `--step-5: clamp(2.7994rem, 2.384rem + 1.8461vw, 3.8147rem)`). Keep a `rem` term in `clamp()` so browser text-size settings still apply (our inference; WCAG 1.4.4). Do not copy these numbers; derive from the product. — Apple silent
- [SHOULD] Space tokens on the same fluid basis, with pairs (such as "s-l") for gaps that should grow faster than type. — Apple silent
- [CONSIDER] A traditional size scale (6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 21, 24, 36, 48, 60, 72) is evidence of how print scales were built, not a target (unverified). — Apple silent
- [CONSIDER] Asymmetric composition: hierarchy from position, weight and white space rather than centering and ornament; for reading surfaces, classical page proportions (2:3 page, margins growing inner < top < outer < bottom, the "Van de Graaf canon") (Tschichold, unverified). — Apple silent
- [CONSIDER] A steeper large-screen ratio (1.333+) gives a dramatic desktop hierarchy while mobile stays calm: a deliberate brand lever. — Apple silent
- [CONSIDER] Optical-size split: one family in a display cut for headings and the regular cut for the rest adds expression while keeping readability (Linear's reason for using a display cut). (SF Text/Display optical sizes, references/apple/beyond-hig.md) — adds to Apple
- [Taste] Distinctiveness lesson (Butterick): Template systems "have simply accelerated the adoption of a new cargo cult of design habits... We swapped ugly for boring." Remedy: "infuse the web with visual ideas from elsewhere. Books. Posters. Art. Software. Other designed objects... Anything but another hamburger button." Take references from outside current software. — Apple silent

## Grids and intrinsic layout (Müller-Brockmann, Every Layout)
**Intent**: Apple specifies margins, safe areas and adaptivity, not how to build a compositional grid. Wide canvases (iPad, macOS, web) expose a lack of structure.
**Checks**
- [SHOULD] Derive grid rows and gutters from the body line-height (module height = whole lines of leading; gutter = one line or a fraction) so baselines and image edges share one rhythm (Müller-Brockmann, unverified). Web: `row-gap` of `1lh` or a multiple; `subgrid` to align nested cards. — adds to Apple
- [CONSIDER] Asymmetric column use (text on 4 of 6 columns, captions in the narrow remainder) creates direction; a centered 12-column template produces none. Character comes from which columns content occupies and from deliberate empty fields, not from the grid existing (unverified; our wording). — adds to Apple
- [CONSIDER] Flush-left ragged-right text and grotesk faces are Swiss-style traits, not requirements (unverified). — Apple silent
- [SHOULD] Compose with intrinsic layout and let the browser do the work: Every Layout's "Think of yourself as the browser's mentor, rather than its micro-manager." Native counterparts are `ViewThatFits`, size classes, `Layout`, `Grid`/`GridRow`. — adds to Apple
- [CONSIDER] Sidebar: `flex-basis: 20rem` on the sidebar, main area `flex-grow: 999; flex-basis: 0; min-inline-size: 50%`; "a sidebar ceases to be a sidebar when it is no longer the narrower of the two elements." — adds to Apple
- [CONSIDER] Switcher: `flex-basis: calc((var(--threshold) - 100%) * 999)` with `--threshold: 30rem` switches row to column by container, with no media query. — adds to Apple
- [CONSIDER] CSS Grid named lines (`[full-start] 1fr [content-start] ...`) for full-bleed plus content columns; `Layout` for asymmetric splits in SwiftUI. — Apple silent
- [SHOULD] Intrinsic layouts free you to set unusual proportions (a wide sidebar, an off-center measure) because they degrade safely. — adds to Apple

## Rams: honesty and thoroughness checks
**Intent**: The ten principles (good design is innovative, useful, aesthetic, understandable, unobtrusive, honest, long-lasting, thorough down to the last detail, environmentally friendly, as little design as possible) mostly reinforce Apple's own values. Use the checkable ones; "less, but better" read naively yields the gray minimalism slop converges on.
**Checks**
- [SHOULD] Honest: "It does not make a product more innovative, powerful or valuable than it really is." No fake activity animations, fake scarcity, or "AI" sparkle on deterministic features. — adds to Apple
- [SHOULD] Long-lasting: "It avoids being fashionable and therefore never appears antiquated." Flag trend effects (glassy gradients, glow borders, noise overlays) that carry no information. — adds to Apple
- [SHOULD] Thorough: "Nothing must be arbitrary or left to chance." Every spacing, radius or color value maps to a token. — adds to Apple
- [SHOULD] Unobtrusive: "neutral and restrained, to leave room for the user's self-expression." For tools, content is the loudest thing. — adds to Apple
- [CONSIDER] "As little design as possible" is not a style recommendation and minimalism is not a target. — adds to Apple

## Tufte: density and honesty in data marks
**Intent**: Swift Charts and the HIG Charts pages cover chart types and accessibility. Tufte adds density and honesty checks. (Sparkline page fetched; data-ink and chartjunk definitions unverified.)
**Checks**
- [SHOULD] Maximize the share of ink that shows data; erase non-data and redundant ink (unverified). — adds to Apple
- [MUST] No chartjunk: 3D bars, heavy gridlines, decorative fills, moire (unverified). — adds to Apple
- [SHOULD] Sparklines: "small intense, simple, word-sized graphic with typographic resolution." Example: a sparkline "consuming a horizontal length of only 14 letterspaces". "The idea is to be approximately right rather than exactly wrong." — adds to Apple
- [SHOULD] Aspect ratio: for judging slopes, aim for hill-slopes averaging 45 degrees (Cleveland's banking to 45); "make sparklines lumpy, not spikey and not flat"; graphics "moderately greater in length than in height." — adds to Apple
- [SHOULD] Show history next to the current value: "sparklines improve the attention span of tables" and counter recency bias. — adds to Apple
- [CONSIDER] Small multiples: same scale and axes repeated, "adjacent in space rather than stacked in time" (the repeated-axes definition is unverified). — adds to Apple
- [SHOULD] Tabular figures beside sparklines (`font-variant-numeric: tabular-nums`); inline SVG sized in `em`/`lh`. Swift Charts: `.chartXAxis(.hidden)`, `.chartYAxis(.hidden)`, `.frame(height:)` tied to the line height. — Apple silent
- [SHOULD] Density fact for context: tables of numbers attain maximum densities of only 300 characters per square inch; the eye resolves to 0.1 mm. — adds to Apple
- [SHOULD] Density applies to read-only marks, not interactive ones — CONFLICT: Tufte's very high density vs Apple's touch-target and legibility minimums (44 pt targets, 11 pt text on iOS); resolution: density applies to read-only marks, while interactive marks keep Apple's target sizes and 44 pt goal (24 px minimum on web).
- [Taste] Distinctiveness lesson: A dashboard of dense inline sparklines set in the same type as the numbers looks unlike the KPI-tile template. — Apple silent

## Gestalt vocabulary for grouping
**Intent**: The HIG uses these implicitly (grouped lists, sections). They give review comments a shared vocabulary. Principles stated from memory.
**Checks**
- [MUST] Proximity: space within a group is clearly smaller than space between groups (unverified). Checkable ratio (ours): inner gap no more than about half the outer gap. — adds to Apple
- [SHOULD] Similarity, common region, continuity, closure, figure/ground (unverified). — adds to Apple

## Refactoring UI: borders, space, hierarchy
**Intent**: Mostly adds to Apple for custom web UI. Only the landing-page quote was verified; the rest is secondary or memory. Use its reasons (fewer borders, systematic spacing), not its sample palettes or card styles.
**Checks**
- [SHOULD] "Borders are a great way to distinguish two elements from one another, but using too many of them can make your design feel busy and cluttered. Instead, try adding a box shadow, using contrasting background colors, or simply adding more space between elements." — adds to Apple
- [SHOULD] Start with too much white space, then remove (section wording unverified). — Apple silent
- [SHOULD] Establish a spacing and sizing system: a limited scale from a practical base (16 px reported) where no two adjacent values sit closer than about 25% (secondary source, unverified). — Apple silent
- [SHOULD] Hierarchy through weight and color, not only size; de-emphasize secondary text with lighter color rather than shrinking it (unverified). Apple's semantic label colors (primary, secondary, tertiary) encode the same idea. — adds to Apple
- [SHOULD] Hand-built palettes with 9 to 10 shades per hue; avoid pure gray on colored backgrounds (unverified). — Apple silent
- [Taste] Convergence warning: This book and Tailwind's default scales shaped the 2019 to 2025 SaaS look (our inference). Unchanged default gray ramps and spacing scales are a finding; check spacing rhythm derived from type instead. — Apple silent

## Web interaction hygiene (Vercel Web Interface Guidelines)
**Intent**: The densest checkable list of web interaction craft. Take the universal checks only: Vercel marks its copy rules (Title Case, "&" over "and", numerals for counts) as Vercel-specific, "They aren't universal guidelines", so do not import them.
**Checks**
- [MUST] Hit targets: if the visual target is under 24 px, expand its hit target to 24 px or more; on mobile the minimum is 44 px. Agrees with Apple's 44 pt. (the 24 px minimum) — adds to Apple
- [MUST] `<input>` font size is 16 px or more on mobile to prevent iOS Safari auto-zoom on focus. Never disable browser zoom. — Apple silent
- [SHOULD] Loading states get a short show-delay (about 150 to 300 ms) and a minimum visible time (about 300 to 500 ms) to avoid flicker. — adds to Apple
- [SHOULD] Network latency budget: `POST`/`PATCH`/`DELETE` complete in under 500 ms. (no perceptible latency on any interaction) — adds to Apple
- [SHOULD] Tooltip timing: delay the first tooltip in a group; subsequent peers have no delay. — Apple silent
- [MUST] Animation: honor `prefers-reduced-motion`; prefer CSS, then Web Animations API, then JavaScript libraries; animate `transform`/`opacity`; never `transition: all`; keep animations interruptible; anchor transform origin where motion physically starts; animate only when it clarifies cause and effect or adds deliberate delight; auto-playing motion over 5 seconds needs pause, stop or hide. — adds to Apple
- [SHOULD] Optical alignment: adjust 1 px when perception beats geometry; every element aligns with something intentionally; balance contrast in lockups (a thin-stroke icon may need a bolder stroke next to medium-weight text); for ultra-wide, zoom out to 50% to simulate. — Apple silent
- [SHOULD] Content: curly quotes, `…`, `tabular-nums` for comparisons, avoid widows and orphans, non-breaking spaces (`10&nbsp;MB`, `⌘&nbsp;+&nbsp;K`), `scroll-margin-top` on anchored headings, all states designed (empty, sparse, dense, error). — Apple silent
- [SHOULD] Layered shadows (at least two layers mimicking ambient plus direct light); crisp borders (combine borders and shadows, semi-transparent borders improve edge clarity); hue consistency (tint borders, shadows and text toward the background hue on non-neutral backgrounds); interactions increase contrast; `color-scheme: dark`; `<meta name="theme-color">`. — Apple silent
- [SHOULD] Nested radii are concentric: child radius no larger than the parent's (parent radius minus padding). (concentricity, references/apple/beyond-hig.md) — adds to Apple
- [SHOULD] Forms: do not pre-disable submit; do not block typing; errors next to fields; focus the first error on submit; Cmd/Ctrl+Enter submits a textarea. (matches the web mapping on disabled buttons) — adds to Apple
- [SHOULD] Contrast method — CONFLICT: Vercel's "Prefer APCA over WCAG 2" vs Apple and WCAG-style ratios (4.5:1 body, 3:1 large and non-text); resolution: WCAG 2 ratios are the pass/fail floor, APCA is an extra check for dark mode and thin weights, and where the two disagree the stricter source wins.

## Interaction craft (Rauno Freiberg)
**Intent**: Mostly restates Apple's fluid-interface thinking (WWDC18 "Designing Fluid Interfaces", covered in references/apple/beyond-hig.md) for the web, where none of it is built in. Read via a summarizer, so phrasing is paraphrase; the essay's year is unverified.
**Checks**
- [SHOULD] Preserve momentum: gesture-driven motion keeps the gesture's velocity and angle. — adds to Apple
- [SHOULD] Interruptibility: a reverse input during an animation takes effect at once. Rauno criticizes iOS Settings, where a reverse swipe is ignored until the animation ends — CONFLICT: Rauno's interruptibility critique vs Apple's shipped behavior in system apps (not the HIG text); resolution: on native, system-owned screens follow the platform and are not flagged, while our own screens must be interruptible per Apple's fluid-interface guidance; on web, interruptibility is a requirement.
- [SHOULD] Lightweight actions can fire mid-gesture; destructive ones commit only on release (App Switcher example). — adds to Apple
- [SHOULD] Apply the delta immediately: pinch and drag respond 1:1 from the first frame; a threshold-only zoom gives "zero affordance or confidence that the card is even pinchable". — adds to Apple
- [SHOULD] Spatial consistency: a view enters from where it lives. — adds to Apple
- [MUST] Skip motion on actions used hundreds or thousands of times a day (command menus, context menus); keyboard and mouse input tolerates less animation than touch. — adds to Apple
- [CONSIDER] Fitts's law: screen edges and corners behave as infinite targets; radial menus put every option at equal distance. — Apple silent

## Motion rules of thumb (Emil Kowalski, NN/g, Paco Coursey)
**Intent**: Gives the frequency test Apple implies but does not state sharply. Post dates are not shown on the pages (unverified years). Numbers here are evidence of reasons, not presets.
**Checks**
- [MUST] Frequency test: "How often users will see an animation is a key factor in deciding whether to animate or not." "never animate keyboard initiated actions." Example: nobody wants a 500 ms enter animation every time a launcher opens. — adds to Apple
- [SHOULD] Web UI animations generally stay under 300 ms; a 180 ms dropdown feels more responsive than a 400 ms one. Marketing sites are the exception. NN/g agrees independently: most animations 100 to 500 ms, simple feedback about 100 ms, modals 200 to 300 ms, "At 500ms, animations start to feel like a real drag"; entering takes longer than exiting (a popup may take 300 ms to appear and 200 or 250 ms to disappear) — CONFLICT: Emil's under-300 ms rule vs Apple springs and sheets with perceptual durations often 0.35 to 0.6 s (WWDC23 code uses 0.4 to 0.6); resolution: Apple's springs on native full-screen and spatial transitions, short durations for small web UI feedback (dropdowns, popovers, tooltips).
- [SHOULD] Small native transitions (menus, popovers, tooltips) keep Apple's system animations; the short-duration rule above applies to custom web UI feedback, and native custom UI keeps Apple springs. — adds to Apple
- [SHOULD] Entering or exiting elements use ease-out; ease-in "is just not made for UI animations"; the built-in CSS curves are usually not strong enough, so use custom curves derived from the product's motion personality. — adds to Apple
- [SHOULD] Press feedback is immediate: Emil uses `scale(0.97)` on `:active`. The reason is instant acknowledgement; the number is not a mandate. — adds to Apple
- [SHOULD] Never animate from `scale(0)`; start from a higher scale (0.9 or more; Emil uses 0.93). — adds to Apple
- [SHOULD] Origin-aware popovers: set `transform-origin` from the trigger (Radix and Base UI expose a transform-origin variable); the default `center` "is wrong in most cases". — adds to Apple
- [CONSIDER] About 2px of blur on a crossfade can merge two states. — Apple silent
- [SHOULD] Tooltips: delay the first; then no delay and no animation. — adds to Apple
- [MUST] Interruptible: CSS transitions retarget, keyframes do not, so prefer transitions for state-driven motion. — adds to Apple
- [MUST] Reduced motion: swap movement for opacity; do not remove feedback. — adds to Apple
- [SHOULD] Theme switches are instant: inject a stylesheet that disables transitions, toggle the theme, force a reflow with `window.getComputedStyle(css).opacity`, then remove it. Transitions on every element hurt rendering performance and do not work for images, icons or non-transitionable properties; `requestAnimationFrame` before removal "seemed to work at first, but it was unreliable" (Paco Coursey). Native appearance changes are already instant. Apple is silent on the web mechanism. — Apple silent
- [SHOULD] Update `transform` directly during drag instead of a CSS variable per frame: a per-frame variable forced style recalculation for all children and lagged past about 20 list items (Vaul lesson). — Apple silent
- [SHOULD] Guard against accidental dismissal: a 100 ms lock after scrolling to the top prevents drag-to-close; ignore extra touches after the first. Swipe dismissal by distance threshold or velocity (Sonner used a velocity above 0.11, found by trial and error, so tune to your own gesture). — adds to Apple
**Evidence only (do not copy; derive from the product's motion personality)**: Vaul uses `transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)`, a curve and duration that mimic iOS sheets, taken from the Ionic Framework. Sonner uses `transition: transform 400ms ease` and stacked toasts scale by `0.05 * index`, deliberately slower and softer "in line with the toast design, page design, its name". The lesson is that motion is brand: the easing fits the whole product's character. Copying an iOS curve onto everything makes the web feel like an iOS imitation.

## Shadows and elevation on custom surfaces (Josh Comeau)
**Intent**: Apple materials use blur and vibrancy rather than drop shadows, so on native Apple platforms this is a [CONSIDER] for custom surfaces only.
**Checks**
- [SHOULD] One light source: every shadow on the page shares the same ratio (his demo: vertical offset always 2x the horizontal). — Apple silent
- [SHOULD] Elevation: as an element gets closer to the user, offset and blur radius increase and shadow opacity decreases. — Apple silent
- [SHOULD] Layering example: five stacked shadows `0 1px 1px`, `0 2px 2px`, `0 4px 4px`, `0 8px 8px`, `0 16px 16px` at `hsl(0deg 0% 0% / 0.075)` each. Do not animate a layered shadow. Illustrative, not a preset. — Apple silent
- [SHOULD] Color-matched shadows: black "desaturates it quite a bit". Match hue, lower saturation and lightness (`hsl(220deg 60% 50%)` on an `hsl(220deg 100% 80%)` background). Token shapes in the source: small `0.5px 1px 1px hsl(var(--shadow-color) / 0.7)`, medium 3 layers at 0.333, large 5 layers at 0.2. — Apple silent

## Color systems (Stripe, Linear)
**Intent**: Apple's system colors are tuned per appearance and contrast mode. These methods add to Apple when building a brand palette without failing accessibility. Take the method, not either company's look.
**Checks**
- [MUST] Contrast floor: 4.5 for small text, 3.0 for large text. Stripe's audit found none of its default small-text colors (except black) met it. — adds to Apple
- [SHOULD] Do not darken brand hues until they turn muddy; reaching sufficient contrast lost "a lot of the brightness and vibrancy". — adds to Apple
- [SHOULD] Work in a perceptually uniform space (CIELAB; "at the same level of mathematical lightness, yellow appears lighter than blue"). Linear used LCH rather than HSL for the same reason. Web: `oklch()` / `color-mix(in oklch, ...)`. Native: asset-catalog colors with Any/Dark and High Contrast variants. — adds to Apple
- [SHOULD] Goals worth checking: predictable accessibility, clear vibrant hues, consistent visual weight (at each level no single color takes priority). — adds to Apple
- [SHOULD] Level-distance rule: any two colors are guaranteed enough contrast for small text if at least five levels apart, and four levels apart for icons and large text; text colors also pass atop the lightest value in any hue. Limit: no "very colorful dark yellow" or "vibrant light royal blue". — adds to Apple
- [CONSIDER] Parametric themes: Linear defined three variables (base color, accent color, contrast) instead of 98 per theme, and the contrast variable produced high-contrast themes for accessibility. Apple has Increase Contrast as a system setting but no generator for custom themes. — adds to Apple
- [SHOULD] Restrain the accent: limit how much chrome color enters the calculations for a more neutral, timeless look. — adds to Apple
- [SHOULD] Alignment you "feel after a few minutes of using the app" (labels, icons, buttons in the sidebar). Process: stress-test a direction across all main views before implementation. — adds to Apple

## Motion canon: Disney, Material, Apple springs
**Intent**: Motion character is a product decision. Apple supplies the axes; the team supplies the tokens.
**Checks**
- [SHOULD] Slow in and slow out maps to easing; nothing moves linearly except progress and spinners (our mapping of Disney; the 12 principles are from memory, unverified: squash and stretch, anticipation, staging, straight-ahead vs pose-to-pose, follow-through and overlapping action, slow in and slow out, arcs, secondary action, timing, exaggeration, solid drawing, appeal). — Apple silent
- [SHOULD] Staging: one moving thing at a time draws attention; simultaneous unrelated motion is noise (our mapping). — Apple silent
- [CONSIDER] Follow-through and overlap: stagger children by small offsets. Apple's app-launch example uses "different springs, different start times, and different end times" (WWDC23). — adds to Apple
- [CONSIDER] Arcs: large travels move on a curve (our mapping). Squash: press-state scale. Exaggeration: only for rare celebratory moments, consistent with the frequency test (our mappings). — Apple silent
- [SHOULD] Apple springs (WWDC23 "Animate with springs"): two parameters, duration and bounce (range -1.0 to 1.0; above 0 bouncy, 0 smooth, below 0 flattened). A bounce of about 15% feels brisk; around 30% is noticeably bouncy; "be cautious about using values higher than around 0.4"; "When you're not sure, use a spring with bounce 0". Ask whether the app's character is serious or playful, relaxed or fast-paced. Springs carry gesture and retargeting velocity. Conversion: `stiffness = (2π ÷ duration)^2`; `damping = 4π(1 − bounce) ÷ duration` (mass = 1, bounce ≥ 0; same formula as references/apple/beyond-hig.md) (unverified). Code: `.snappy`, `.snappy(duration: 0.4)`, `.snappy(extraBounce: 0.1)`, `.spring(duration: 0.6, bounce: 0.2)`, `CASpringAnimation(perceptualDuration:bounce:)`. — adds to Apple
- [SHOULD] On the web, do not use springs for color or opacity changes; most spring use is not bouncy (Comeau). Define springs by mass, tension and friction. CSS `linear()` approximates springs (40+ data points is not unusual, no measurable frame-rate cost in his test) but is still time-based and does not carry velocity on interrupt. — Apple silent
- [CONSIDER] Material 3 evidence of how a system tokenizes motion (do not copy; derive from the product's motion personality): easing Standard `cubic-bezier(0.2, 0, 0, 1)`, Standard Decelerate `0, 0, 0, 1`, Standard Accelerate `0.3, 0, 1, 1`, Emphasized Decelerate `0.05, 0.7, 0.1, 1`, Emphasized Accelerate `0.3, 0, 0.8, 0.15`, Emphasized as the path `M 0,0 C 0.05, 0, 0.133333, 0.06, 0.166666, 0.4 C 0.208333, 0.82, 0.25, 1, 1, 1`. Durations Short1 to 4 = 50/100/150/200 ms, Medium1 to 4 = 250/300/350/400 ms, Long1 to 4 = 450/500/550/600 ms, ExtraLong1 to 4 = 700/800/900/1000 ms. Springs: FastSpatial damping 0.9 stiffness 1400, DefaultSpatial 0.9 and 700, SlowSpatial 0.9 and 300, FastEffects 1 and 3800, DefaultEffects 1 and 1600, SlowEffects 1 and 800. Spatial springs (position, size) may overshoot slightly; effects springs (color, opacity) are critically damped; small components use fast, partial-screen default, full-screen slow. Third-party M3 Expressive numbers (spatial default stiffness 380, damping 0.8) are unverified. — Apple silent
- [MUST] On Apple platforms the motion system stays Apple's (springs, interruptible, velocity-preserving); character comes from token choices within it (duration, bounce, stagger, which things move at all), not from imported Material curves. — adds to Apple
- [SHOULD] A product's motion = a personality on Apple's axes (serious to playful, relaxed to fast) encoded as 3 to 5 named motion tokens (micro, small-spatial, sheet, full-screen, celebratory) used everywhere. On web, pick curves deliberately from that personality; do not default to a borrowed iOS curve, Material's emphasized curve or `ease-in-out` for everything. — adds to Apple
- [SHOULD] Register: record whether the product is utilitarian/professional or consumer/expressive; motion and emphasis expectations follow it. — adds to Apple

## What Apple misses (synthesis)
- [Taste] Line length (45 to 75 / 45 to 90 characters; cap about 60 to 66ch), custom-text settings (leading 120 to 145%, caps tracking 5 to 12%, at most 3 heading levels), grids derived from type, fluid web type with rem-anchored `clamp()`, brand color in perceptual spaces, data-density honesty, frequency-gated motion, web interaction hygiene, shadow physics for custom surfaces, and motion personality as tokens. Each adds to Apple and none overrides an Apple rule. — adds to Apple
- [Taste] Steering rule: findings may say why a detail works (feedback latency, spatial continuity, perceptual lightness, measure) and may say a choice is convergent, but must not prescribe a named product's look as the fix. Offer two or three directions drawn only from the product's own subject, audience and domain (see distinctiveness.md), never from a fixed pool of sources or styles.
**Unverified list**: Bringhurst book text (only Rutter's web adaptation fetched); Müller-Brockmann, Tschichold, Lupton; Refactoring UI book text; Tufte data-ink and chartjunk definitions; Disney principles and UI mappings; Gestalt principles; Rauno's essay (summarized, year unverified); Emil Kowalski post dates.
