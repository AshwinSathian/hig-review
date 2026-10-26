# 12 — Craft canon: typography, grids, visual principles, interaction, motion

Scope: non-Apple craft literature that can give a product its own typographic, spatial and motion character. Compiled 2026-10-23.

**Framing rule (per coordinator):** Apple HIG is the base of loupe. Everything below either **adds to Apple** (more detail, evidence or numbers where the HIG agrees in spirit), covers ground where **Apple is silent**, or is a **conflict** with Apple. Conflicts are flagged, not resolved against Apple. On Apple platforms the HIG rule wins unless the skill has a stated reason to deviate.

**Provenance:** "(fetched)" means the text or number was read from the live page during this session. "(unverified, from memory)" means recalled, not confirmed. Quotes are verbatim only when marked as quotes. Raw page dumps are in `scratchpad/hig/raw12/`.

Tags: [MUST] = a review should fail without it. [SHOULD] = strong default. [CONSIDER] = a lever for character, applied with judgement.

---

## 1. Robert Bringhurst — *The Elements of Typographic Style* (book, 1992; later editions to v4.x). Web adaptation: Richard Rutter, webtypography.net (https://webtypography.net/2.1.2)

**Why it matters.** The standard reference for text typography. Most "measure", "rhythm" and "scale" rules used on the web trace back to it.

**Key principles/checks**
- [MUST] Measure. Quote (fetched, via Rutter): "Anything from 45 to 75 characters is widely regarded as a satisfactory length of line for a single-column page set in a serifed text face in a text size. The 66-character line (counting both letters and spaces) is widely regarded as ideal. For multiple column work, a better average is 40 to 50 characters." **Adds to Apple:** the HIG gives no character-count measure.
- [SHOULD] Size the measure in font-relative units so it holds when the user changes text size. Rutter (fetched): "Column 3 has an elastic width: it has been set to 33 em wide. On average one character takes up 0.5 em so this box will have a measure of 66 characters per line." He also notes that a liquid (%) layout gives up exact control but lets readers adjust.
- [SHOULD] Vertical rhythm: space between blocks comes from multiples of the body leading (unverified, from memory, as Bringhurst's framing; Every Layout encodes the same idea, see §6).
- [CONSIDER] A traditional size scale with musical intervals. The classic sequence 6, 7, 8, 9, 10, 11, 12, 14, 16, 18, 21, 24, 36, 48, 60, 72 is (unverified, from memory). Bringhurst also ties scales to musical ratios (unverified, from memory).
- [SHOULD] Use real typographic characters: true small caps, old-style figures in running text, lining or tabular figures in tables, hanging punctuation where possible (unverified, from memory, as Bringhurst's wording; the techniques are confirmed by MDN and Butterick below).

**Where it disagrees with or goes beyond Apple.** Apple ships tuned type (SF with optical sizes, Dynamic Type ramps) but says little about line length or paragraph craft in long reading views. Bringhurst fills that gap for reader views, docs, settings explanations, onboarding copy and web marketing.

**Distinctiveness lessons.** Text-face choice, old-style figures, real small caps for labels and asymmetric margins give character without fighting platform chrome.

**Web/native implementation**
- Web: `max-inline-size: 66ch` (or 60ch, see Every Layout) on text elements. `font-variant-numeric: oldstyle-nums proportional-nums` for prose and `lining-nums tabular-nums` for tables. `font-variant-caps: small-caps` only when the font has real small caps (Butterick: "If you don't have real small caps, don't use them at all.").
- SwiftUI: `.monospacedDigit()` for tabular figures; `Font.custom(_:size:relativeTo:)` keeps custom faces on Dynamic Type; `.frame(maxWidth:)` on reading columns. Measure in points has to be derived from the face (unverified, from memory: SwiftUI has no `ch` unit).

**Slop tells (our inference).** Body text running full-width across a 1440px desktop; every number in proportional lining figures, so columns jitter; "small caps" faked by scaling capitals.

---

## 2. Matthew Butterick — *Practical Typography* (https://practicaltypography.com, online book, continuously updated) (fetched)

**Why it matters.** Short, numeric rules that a reviewer can check. Openly hostile to default and system fonts, which makes it the strongest single counterweight to "everything looks like SF / Inter".

**Key principles/checks (all fetched, quotes verbatim)**
- [MUST] "Point size should be 10–12 points in printed documents, 15–25 pixels on the web."
- [MUST] "Line spacing should be 120–145% of the point size." CSS: unitless `line-height`.
- [MUST] "The average line length should be 45–90 characters (including spaces)." Alphabet test: "You should be able to fit between two and three alphabets on a line."
- [SHOULD] "Use bold or italic as little as possible, and not together."
- [SHOULD] "All caps are fine for less than one line of text." and "Use 5–12% extra letterspacing with all caps and small caps." CSS: "Set the letter-spacing property in the range 0.05em to 0.12em". He also notes typographers "will often remove letterspacing from lowercase text used at larger sizes (e.g., headlines)."
- [SHOULD] "Use centered text sparingly." Quote: "Centered text is overused. It's the typographic equivalent of vanilla ice cream—safe but boring… Asymmetry is nothing to fear." "Whole text blocks should not be centered."
- [SHOULD] Headings: "Limit yourself to three levels of headings. Two is better." "The best way to emphasize a heading is by putting space above and below." For size: "Use the smallest increment necessary to make a visible difference. If your text is set in 12 point, you needn't go up to 14 or 15 point. Try a smaller increase—to 12.5 or 13 point." Also: "And Always Avoid Title Case, Because Your Headings Aren't Titles."
- [SHOULD] "Use first-line indents that are one to four times the point size of the text, or use 4–10 points of space between paragraphs." Not both.
- [MUST] Curly quotes, real ellipsis character, real dashes, one space between sentences, kerning on.
- [SHOULD] "Avoid goofy fonts, monospaced fonts, most free fonts, and system fonts—especially Times New Roman and Arial."

**Where it disagrees with or goes beyond Apple**
- **CONFLICT (system fonts):** Butterick says avoid system fonts. Apple's HIG steers toward SF / New York and Dynamic Type. Resolution for the skill: system UI chrome stays on the system font (Apple wins). Butterick's rule applies to brand and editorial surfaces such as marketing pages, reading views, headlines and the web app's identity, where a custom face carried through Dynamic Type is a legitimate choice. Report it as a [CONSIDER] for character, never as a failure of SF.
- **CONFLICT (Title Case):** Butterick rejects Title Case in headings. Apple uses title-style capitalization for many control labels (unverified, from memory, for HIG specifics), and Vercel's own guidelines prescribe Title Case for headings and buttons. Treat capitalization as a house style the skill checks for *consistency*, not correctness.
- **CONFLICT (modular scales):** Butterick (fetched): "Certain web-design pundits claim that modular scale … is a useful method of sizing web headings. I disagree… When your headings look right, they are right. The ratio is irrelevant. (FWIW, I've never used a modular scale to size type. And never will.)" This cuts against Every Layout and Utopia (below). The skill should not require a ratio, only a small and intentional set of sizes.
- **Adds to Apple:** numeric line-length and leading ranges. Apple's Dynamic Type sets leading per style; Butterick gives the check for custom text settings.

**Distinctiveness lessons.** From the "websites" chapter (fetched): template systems "have simply accelerated the adoption of a new cargo cult of design habits… We swapped ugly for boring." His remedy: "let's infuse the web with visual ideas from elsewhere. Books. Posters. Art. Software. Other designed objects… Steal from better sources… Anything but another hamburger button." This is the core anti-slop principle for this digest. Look outside current software for references.

**Web/native implementation.** `font-size: clamp(…)` within 15–25px for body; `line-height: 1.2–1.45`; `letter-spacing: 0.05em–0.12em` only on `text-transform: uppercase` or small caps; `font-kerning: normal`; `text-align: start` for blocks. SwiftUI: `.tracking()` / `.kerning()` on caps labels; `.lineSpacing()` to bring custom fonts into range.

**Slop tells (our inference).** Centered hero plus centered paragraph plus centered card grid; uppercase eyebrow labels with no added tracking, or tracking far above 12%; four heading levels separated by big size jumps; heading sizes generated from a 1.5 ratio with no visual check; straight quotes and "..." in UI copy.

---

## 3. Jan Tschichold — *Die neue Typographie* (1928) / *The Form of the Book* (essays, 1975 English) (unverified, from memory; not fetched)

**Why it matters.** He made the case for asymmetric, function-led layout (1928) and later went back to classical symmetric book canons. Both positions are useful.
- [CONSIDER] Asymmetric composition: hierarchy from position, weight and white space rather than centering and ornament (unverified, from memory).
- [CONSIDER] For reading surfaces, classical page proportions (2:3 page, margins growing inner < top < outer < bottom, the "Van de Graaf canon") (unverified, from memory).

**Beyond Apple.** Apple's layouts are mostly centered or leading-aligned system containers. Tschichold offers a reasoned alternative for editorial and marketing surfaces. **Apple silent** on page canons.

**Slop tells (our inference).** Symmetry by default, with no content reason for it.

---

## 4. Ellen Lupton — *Thinking with Type* (3rd ed., 2024; site thinkingwithtype.com — fetch timed out) (unverified, from memory)

**Why it matters.** A teaching text that connects letter, text and grid. Its value here is vocabulary for critique: scale contrast, typographic color (the gray value of a text block), hierarchy built from few variables.
- [SHOULD] Build hierarchy by changing one variable at a time (size *or* weight *or* color *or* spacing), not all at once (unverified, from memory, as a Lupton paraphrase).
- [CONSIDER] Pair faces by contrast of structure (e.g. a humanist serif with a geometric sans) rather than near-duplicates (unverified, from memory).

**Beyond Apple.** Apple specifies one family with weights. Lupton covers multi-family pairing, which **Apple is silent** on.

**Slop tells (our inference).** Two sans-serifs that are nearly identical (e.g. Inter headings with Geist body), so the pairing adds noise and no contrast.

---

## 5. Josef Müller-Brockmann — *Grid Systems in Graphic Design* (1981) and Swiss/International style (unverified, from memory; not fetched)

**Why it matters.** The grid as a system derived from the type: module height = whole lines of body leading; gutters = one line or a fraction of one; fields that images and text snap to (unverified, from memory).
- [SHOULD] Derive grid rows and gutters from the body line-height, so text baselines and image edges share one rhythm (unverified, from memory).
- [CONSIDER] Asymmetric column use (e.g. text on 4 of 6 columns, captions in the narrow remainder) creates tension and direction; a centered 12-column template produces neither (unverified, from memory; our wording).
- [CONSIDER] Flush-left, ragged-right text, grotesk faces, objective photography (unverified, from memory: Swiss style traits).

**Where it disagrees with or goes beyond Apple.** Apple's layout guidance is about margins, safe areas, readable content guides and adaptivity. It does not teach constructing a grid from type. **Adds to Apple** on iPad, macOS and web, where wide canvases expose a lack of structure.

**Distinctiveness lessons.** Character comes from *which* columns content occupies and from deliberate empty fields, not from the grid existing at all.

**Web/native implementation.** CSS Grid with named lines (`grid-template-columns: [full-start] 1fr [content-start] … `), `row-gap` = `1lh` or a multiple of the leading; `subgrid` to align nested cards to the parent rhythm. SwiftUI: `Grid`/`GridRow`, custom `Layout` for asymmetric splits; `ViewThatFits` to collapse.

**Slop tells (our inference).** Everything spans the full container or sits in a centered max-width column; equal 3-up feature cards; a bento grid with no content-driven reason for its cell sizes.

---

## 6. Heydon Pickering & Andy Bell — *Every Layout* (https://every-layout.dev, 2nd edition) (fetched: Axioms, Modular scale, Stack, Sidebar, Switcher)

**Why it matters.** Turns typographic rules into algorithmic CSS that holds in any context, which is the web counterpart to Apple's adaptivity.

**Key principles/checks (fetched)**
- [SHOULD] The measure as an axiom. They quote Bringhurst's 45–75 range and set "the measure should never exceed 60ch". Implementation: `:root { --measure: 60ch }`, `* { max-inline-size: var(--measure) }`, with exceptions for `html, body, div, header, nav, main, footer { max-inline-size: none }`. Rationale: "1ch is based on the width of the font's 0 character… changing the font-size changes the value of 1ch, thereby adapting the measure."
- [SHOULD] "Fundamentally, designing for the web is designing without seeing." Design axioms and let the browser compose. "Think of yourself as the browser's mentor, rather than its micro-manager."
- [SHOULD] Space from line-height. "A font-size of (implicitly) 1rem, and a line-height of 1.5 creates a default value of 1.5rem. A harmoniously larger space might be 3rem (2 ⨉ 1.5) or 4.5rem (3 ⨉ 1.5)." Modular scale: `--ratio: 1.5; --s1: calc(var(--s0) * var(--ratio))`…
- [SHOULD] Stack (the owl): `.stack > * + * { margin-block-start: 1.5rem }`. Spacing belongs to the parent context, not the component.
- [CONSIDER] Sidebar: the sidebar has `flex-basis: 20rem`; the main area has `flex-grow: 999; flex-basis: 0; min-inline-size: 50%`. Quote: "a sidebar ceases to be a sidebar when it is no longer the narrower of the two elements."
- [CONSIDER] Switcher: `flex-basis: calc((var(--threshold) - 100%) * 999)` with `--threshold: 30rem`. It switches between row and column based on the container, with no media query.

**Where it disagrees with or goes beyond Apple.** Mostly **adds to Apple**: SwiftUI's `ViewThatFits`, size classes and `Layout` play a similar role natively. Conflict with Butterick on modular scales, noted in §2.

**Distinctiveness lessons.** Intrinsic layouts free you to set unusual proportions (a wide sidebar, an off-center measure), because they degrade safely.

**Slop tells (our inference).** Breakpoint soup (`md:`, `lg:`, `xl:` overrides on every element); JS measuring widths; margins on components rather than gaps on parents, which gives double spacing at edges.

---

## 7. Utopia — fluid type and space (James Gilyead & Trys Mudford, https://utopia.fyi; "Designing with fluid type scales", 1 Feb 2020) (fetched)

**Key principles/checks**
- [CONSIDER] Quote: "Define a type scale for a small screen. Define a type scale for a large screen. Tell the browser to interpolate between the two scales, based on the current viewport width." Example in the post: "a typographic scale of 1.2x at 320px (mobile-ish) and 1.333x at 1500px (desktop-ish)".
- Calculator default output (fetched; config `360,18,1.2,1240,20,1.25`): `--step-0: clamp(1.125rem, 1.0739rem + 0.2273vw, 1.25rem)`, `--step-5: clamp(2.7994rem, 2.384rem + 1.8461vw, 3.8147rem)`. Body 18→20px, ratio 1.2→1.25.
- [SHOULD] Space tokens on the same fluid basis, with pairs ("s-l") for gaps that should grow faster than type.

**Beyond Apple.** **Apple silent** on fluid web type. Native Dynamic Type is user-driven, not viewport-driven. **Possible conflict:** viewport-driven sizing must not block user zoom. Keep a `rem` term in `clamp()` (Utopia does) so browser text-size settings still apply (our inference; WCAG 1.4.4 resize text).

**Distinctiveness lessons.** A steeper large-screen ratio (1.333+) gives a dramatic, editorial desktop hierarchy while mobile stays calm. That is a deliberate brand lever.

**Slop tells (our inference).** `text-7xl` hero headlines that are the same absolute size on a phone and on a 27-inch display, or that jump at a single breakpoint.

---

## 8. Dieter Rams — Ten principles for good design (Vitsœ, https://www.vitsoe.com/us/about/good-design; principles late 1970s) (fetched)

**Principles (verbatim titles, fetched):** Good design is innovative; makes a product useful; is aesthetic; makes a product understandable; is unobtrusive; is honest; is long-lasting; is thorough down to the last detail; is environmentally-friendly; is as little design as possible.

**Checkable translations**
- [SHOULD] *Honest*: "It does not make a product more innovative, powerful or valuable than it really is." UI check: no fake activity animations, fake scarcity, or "AI" sparkle on deterministic features.
- [SHOULD] *Long-lasting*: "It avoids being fashionable and therefore never appears antiquated." UI check: flag trend effects (glassy gradients, glow borders, noise overlays) that carry no information.
- [SHOULD] *Thorough*: "Nothing must be arbitrary or left to chance." UI check: every spacing, radius or color value maps to a token.
- [SHOULD] *Unobtrusive*: "neutral and restrained, to leave room for the user's self-expression." For tools, the content should be the loudest thing.
- [CONSIDER] *As little design as possible*: "Less, but better."

**Where it disagrees with or goes beyond Apple.** Apple's design values (clarity, deference) descend partly from this lineage (unverified, from memory). So Rams mostly reinforces Apple and does not differentiate. **Caution:** "less, but better" read naively produces the same gray minimalism that slop converges on. Rams's *thorough* and *honest* principles are the useful review checks; *as little design as possible* is not a style recommendation.

**Slop tells (our inference).** Decoration with no use: gradient orbs, glow-on-hover cards, fake terminal windows, purposeless sparkles.

---

## 9. Edward Tufte — data-ink, chartjunk, small multiples, sparklines (*The Visual Display of Quantitative Information*, 1983; *Beautiful Evidence*, 2006; sparkline page https://www.edwardtufte.com/notebook/sparkline-theory-and-practice-edward-tufte/) (sparklines fetched; data-ink and chartjunk from memory)

**Key principles/checks**
- [SHOULD] Data-ink ratio: maximize the share of ink that shows data; erase non-data ink and redundant data ink (unverified, from memory, wording).
- [MUST] No chartjunk: 3D bars, heavy gridlines, decorative fills, moiré (unverified, from memory, for definition).
- [SHOULD] Sparklines (fetched): "A sparkline is a small intense, simple, word-sized graphic with typographic resolution." "Data graphics should have the resolution of typography." Example: a sparkline "consuming a horizontal length of only 14 letterspaces". "The idea is to be approximately right rather than exactly wrong."
- [SHOULD] Aspect ratio (fetched): "for judging slopes and velocities… best is an aspect ratio that yields hill-slopes averaging 45°" (Cleveland's banking to 45°); "make sparklines lumpy, not spikey and not flat". "In general, statistical graphics should be moderately greater in length than in height."
- [SHOULD] Context against recency bias (fetched): "sparklines improve the attention span of tables." Show the year-long history next to the current value.
- [CONSIDER] Small multiples: same scale and axes repeated for comparison (unverified, from memory). Fetched: "By showing vast amounts of data within the eyespan, spatial adjacency assists comparison… adjacent in space rather than stacked in time."
- Density fact (fetched): "Tables of numbers attain maximum densities of only 300 characters per square inch… the resolving power of the eye enables it to differentiate to 0.1 mm".

**Where it disagrees with or goes beyond Apple.** Swift Charts and the HIG Charts pages cover chart types and accessibility. Tufte adds density and honesty checks. **Possible conflict:** Tufte's very high density can clash with Apple's touch-target and legibility minimums on iOS. Apple wins for interactive marks; Tufte applies to static or read-only marks.

**Distinctiveness lessons.** A dashboard full of dense inline sparklines, set in the same type as the numbers, looks unlike the KPI-tile template.

**Web/native implementation.** Inline SVG sparklines sized in `em`/`lh` to sit in text; `font-variant-numeric: tabular-nums` next to them. Swift Charts: `.chartXAxis(.hidden)`, `.chartYAxis(.hidden)` for sparklines; `.frame(height:)` tied to the font's line height.

**Slop tells (our inference).** Four big KPI cards with a percent-change pill and a decorative area chart with gradient fill, no axes and no comparison baseline; donut charts for a single value.

---

## 10. Refactoring UI — Adam Wathan & Steve Schoger (book, 2018, https://www.refactoringui.com) (landing page fetched; book text not reachable, specifics via secondary sources)

**Key principles/checks**
- [SHOULD] Fetched from the landing page: "Borders are a great way to distinguish two elements from one another, but using too many of them can make your design feel busy and cluttered. Instead, try adding a box shadow, using contrasting background colors, or simply adding more space between elements."
- [SHOULD] "Start with too much white space", then remove. Section title confirmed only by secondary sources (unverified wording). Reported idea: it is more obvious when you need to remove space than when you need to add it.
- [SHOULD] "Establish a spacing and sizing system": a limited scale, built from a practical base (16px is reported), where no two adjacent values sit closer than about 25% (secondary source, unverified).
- [SHOULD] Hierarchy through weight and color, not only size; de-emphasize secondary text with lighter color rather than shrinking it (unverified, from memory).
- [SHOULD] Hand-built palettes with 9–10 shades per hue; avoid pure gray on colored backgrounds (unverified, from memory).

**Where it disagrees with or goes beyond Apple.** Mostly **adds to Apple** for the web. Apple's semantic label colors (primary/secondary/tertiary) already encode "hierarchy through color". Refactoring UI generalizes that for custom web UI.

**Convergence warning.** This book and Tailwind's default scales shaped the 2019–2025 SaaS look (our inference). Use its *reasons* (fewer borders, systematic spacing), not its sample palettes or card styles.

---

## 11. Gestalt principles (various; e.g. NN/g, https://www.nngroup.com/articles/gestalt-proximity/) (page fetched, content not extracted in detail; principles from memory)

- [MUST] Proximity: space within a group is clearly smaller than space between groups (unverified, from memory). A checkable ratio is our inference: inner gap no more than about half the outer gap.
- [SHOULD] Similarity, common region, continuity, closure, figure/ground (unverified, from memory).
- **Apple:** the HIG uses these implicitly (grouped lists, sections). Adds a vocabulary for review comments.
- **Slop tells (our inference).** Uniform `gap-4` everywhere, so labels sit as far from their fields as from the next group; cards inside cards, where a common region is added on top of proximity that already groups the content.

---

## 12. Vercel — Web Interface Guidelines (https://github.com/vercel-labs/web-interface-guidelines, living document) (fetched, README)

**Why it matters.** The densest checkable list of web interaction craft available. Many items translate directly into review checks.

**Key checks (verbatim numbers, fetched)**
- [MUST] Hit targets: "if the visual target is < 24px, expand its hit target to ≥ 24px. On mobile, the minimum size is 44px." Agrees with Apple's 44pt.
- [MUST] "`<input>` font size is ≥ 16px on mobile to prevent iOS Safari auto-zoom/pan on focus." "Never disable browser zoom."
- [SHOULD] Loading states: "add a short show-delay (~150–300 ms) & a minimum visible time (~300–500 ms) to avoid flicker".
- [SHOULD] "Network latency budgets. `POST/PATCH/DELETE` complete in <500ms."
- [SHOULD] "Tooltip timing. Delay the first tooltip in a group; subsequent peers have no delay."
- [MUST] Animation: honor `prefers-reduced-motion`; "Prefer CSS… Preference: CSS > Web Animations API > JavaScript libraries"; animate `transform`/`opacity`; "Never `transition: all`"; "Interruptible"; "Correct transform origin. Anchor motion to where it 'physically' starts."; "Necessity check. Only animate when it clarifies cause & effect or when it adds deliberate delight"; auto-playing motion ">5 seconds" needs pause/stop/hide.
- [SHOULD] Layout: "Optical alignment. Adjust ±1px when perception beats geometry." "Every element aligns with something intentionally." "Balance contrast in lockups… a thin-stroke icon may need a bolder stroke next to medium-weight text." "For ultra-wide, zoom out to 50% to simulate."
- [SHOULD] Content: curly quotes, `…`, `font-variant-numeric: tabular-nums` for comparisons, "Avoid widows/orphans", non-breaking spaces (`10&nbsp;MB`, `⌘&nbsp;+&nbsp;K`), `scroll-margin-top` on anchored headings, "All states designed. Empty, sparse, dense, & error states."
- [SHOULD] Design: "Layered shadows. Mimic ambient + direct light with at least two layers." "Crisp borders. Combine borders & shadows; semi-transparent borders improve edge clarity." "Nested radii. Child radius ≤ parent radius & concentric." "Hue consistency. On non-neutral backgrounds, tint borders/shadows/text toward the same hue." "Interactions increase contrast." `color-scheme: dark`; `<meta name="theme-color">`.
- [SHOULD] Forms: "Don't pre-disable submit." "Don't block typing." Errors next to fields; focus the first error on submit; ⌘/Ctrl+Enter submits a textarea.

**Where it disagrees with or goes beyond Apple**
- **Adds to Apple:** most of the list is web-specific and Apple is silent on it (hydration, URL-as-state, `overscroll-behavior`, Windows `<select>` colors).
- **CONFLICT (contrast):** "Prefer APCA over WCAG 2". Apple's HIG and accessibility guidance cite WCAG-style ratios (4.5:1, unverified, from memory, for HIG wording). The skill should keep WCAG 2 as the pass/fail floor (it is the legal and Apple-aligned standard) and treat APCA as advisory.
- **Not universal:** Vercel marks its copy rules ("Title Case", "& over and", numerals for counts) as "Vercel-specific… They aren't universal guidelines." The skill must not import them.

**Slop tells (our inference).** `transition: all 0.3s`; spinners that flash for 50ms; disabled submit buttons with no explanation; "..." made of three periods; fake focus rings removed with `outline: none`.

---

## 13. Rauno Freiberg — "Invisible Details of Interaction Design" (https://rauno.me/craft/interaction-design; year unverified, ~2023) (fetched via summarizer, so phrasing is paraphrase unless quoted)

**Key principles/checks**
- [SHOULD] Preserve momentum: gesture-driven motion keeps the gesture's velocity and angle.
- [SHOULD] Interruptibility. He criticizes iOS Settings, where a reverse swipe during the animation is ignored until the animation ends. **This is a critique of Apple's own behavior. Flag as a conflict with Apple's shipped behavior, not with the HIG text.**
- [SHOULD] Lightweight actions can fire mid-gesture; destructive ones commit only on release (App Switcher example).
- [SHOULD] Apply the delta immediately: pinch and drag respond 1:1 from the first frame; a threshold-only zoom gives "zero affordance or confidence that the card is even pinchable" (quoted via summarizer).
- [SHOULD] Spatial consistency: a view enters from where it lives.
- [MUST for frequent actions] Skip motion on actions used "hundreds" or "thousands of times a day" (command menus, context menus). Keyboard and mouse input tolerates less animation than touch.
- [CONSIDER] Fitts's law: screen edges and corners behave as infinite targets; radial menus put every option at equal distance.

**Beyond Apple.** Much of this restates Apple's fluid-interface thinking (WWDC18 "Designing Fluid Interfaces", unverified, from memory), applied to the web. **Adds to Apple** for web, where none of it is built in.

---

## 14. Emil Kowalski — animation writing (https://emilkowal.ski/ui/great-animations, /you-dont-need-animations, /7-practical-animation-tips, /building-a-toast-component, /building-a-drawer-component; years unverified) (fetched)

**Key principles/checks (verbatim numbers, fetched)**
- [MUST] Frequency test. Quote: "How often users will see an animation is a key factor in deciding whether to animate or not." "never animate keyboard initiated actions." Raycast example: "I can't imagine how frustrating it would be if every time I opened it, I was greeted with a 500ms enter animation."
- [SHOULD] Duration: "As a rule of thumb, UI animations should generally stay under 300ms." "A 180ms dropdown animation feels more responsive than a 400ms one". Marketing sites are the exception.
- [SHOULD] Easing: "If you are animating something that is entering or exiting the screen, use ease-out." ease-in "is just not made for UI animations." "The built-in easing curves in CSS are usually not strong enough". Use custom curves.
- [SHOULD] Press feedback: "A scale of 0.97 on the :active pseudo-class".
- [SHOULD] Never from zero: "Elements that animate from scale(0) can make an animation feel off. Try animating from a higher initial scale instead (0.9+)." He uses 0.93.
- [SHOULD] Origin-aware popovers: `transform-origin` from the trigger (Radix/Base UI expose `--radix-…-transform-origin` / `--transform-origin`); the default `center` "is wrong in most cases".
- [CONSIDER] Blur bridge: add about "2px of blur" to a crossfade to merge two states.
- [SHOULD] Tooltips: delay the first; then "no delay and no animation".
- [MUST] Interruptible: CSS transitions retarget; keyframes do not.
- [MUST] Reduced motion: swap movement for opacity, not remove feedback.
- **Sonner lessons (fetched):** `transition: transform 400ms ease`; stacked toasts scale by `0.05 * index`; swipe dismisses by distance threshold *or* velocity ("velocity > 0.11… a number that I ended up on through trial and error"). The animation is "a bit slower than usual and uses ease as the easing type rather than ease-out to make it feel more elegant. It's in line with the toast design, page design, its name etc." (from great-animations).
- **Vaul lessons (fetched):** `transition: transform 0.5s cubic-bezier(0.32, 0.72, 0, 1)`; "The curve used in Vaul closely matches the one used in iOS; it's from the Ionic Framework. Duration of 500ms is also supposed to mimic iOS's Sheet." A 100ms lock after scrolling to the top prevents accidental drag-to-close. Ignore extra touches after the first. Updating a CSS variable on every drag frame forced style recalc for all children (lag past ~20 list items); setting `transform` directly fixed it.

**Where it disagrees with or goes beyond Apple**
- **Adds to Apple:** the frequency rule and the keyboard rule. Apple's HIG says to avoid gratuitous motion but does not give the frequency test this sharply (unverified, from memory, on HIG wording).
- **Tension with Apple:** Emil's "<300ms" rule versus Apple's sheet (Vaul copies ~500ms) and Apple springs, whose perceptual durations are often 0.35–0.6s in examples (WWDC23 code uses 0.4–0.6). Resolution: for native, use Apple springs. The 300ms rule applies to web micro-interactions (dropdowns, popovers), not to full-screen spatial transitions.

**Distinctiveness lessons (most useful item in this digest).** Sonner's quote shows motion as *brand*: easing and duration "fits the vibe of the whole library… in line with the toast design, page design, its name." Motion character should come from the product's personality, not from a borrowed curve. Copying Vaul's iOS curve onto everything makes the web feel like an iOS imitation.

---

## 15. Josh W. Comeau — "Designing Beautiful Shadows in CSS" (2021, updated Apr 2026), "A Friendly Introduction to Spring Physics" (2020, updated Nov 2025), "Springs and Bounces in Native CSS" (`linear()`) (https://www.joshwcomeau.com) (fetched)

**Shadows (fetched)**
- [SHOULD] One light source. "every shadow on the page should share the same ratio." In his demo "The vertical offset is always 2x the horizontal one."
- [SHOULD] Elevation: "As an element gets closer to the user, the offset should increase, the blur radius should increase, and the shadow's opacity should decrease."
- [SHOULD] Layering: five stacked shadows `0 1px 1px / 0 2px 2px / 0 4px 4px / 0 8px 8px / 0 16px 16px` at `hsl(0deg 0% 0% / 0.075)` each. Caveat: "it's probably a bad idea to try animating a layered shadow."
- [SHOULD] Color-matched shadows: black "desaturates it quite a bit". Match hue, lower saturation and lightness (`hsl(220deg 60% 50%)` on an `hsl(220deg 100% 80%)` background).
- Tokens: small `0.5px 1px 1px hsl(var(--shadow-color) / 0.7)`; medium 3 layers at 0.333; large 5 layers at 0.2.

**Springs (fetched)**
- [SHOULD] Springs are defined by mass, tension (stiffness), friction (damping). "most of the time when I use spring physics in my animations, they're not bouncy at all." "I wouldn't use them for color or opacity changes."
- [CONSIDER] CSS `linear()` can approximate springs ("not uncommon for my springs to have 40+ data points"; no measurable framerate cost in his test). Limits: "It's still time-based", and it does not handle interrupts like a real spring, because retargeting does not carry velocity.

**Beyond Apple.** **Apple silent** on CSS shadows. Apple materials use blur and vibrancy rather than drop shadows, so on native Apple platforms Comeau's shadow system is a [CONSIDER] for custom surfaces only. Springs agree with Apple (WWDC23, §18).

**Slop tells (our inference).** `shadow-lg` gray shadows on colored backgrounds; shadows with different light directions on the same page; shadows on every card *and* a border *and* a background.

---

## 16. Paco Coursey — "Disable transitions on theme toggle" (https://paco.me/writing/disable-theme-transitions, 19 Mar 2020) (fetched)

- [SHOULD] Theme switches should be instant: inject a stylesheet that disables transitions, toggle the theme, force a reflow with `window.getComputedStyle(css).opacity`, then remove the stylesheet. Quote: "Adding a CSS transition to every element negatively impacts rendering performance, and it also won't work for images, icons, and CSS properties that don't support transitions." "Calling requestAnimationFrame before removing the stylesheet seemed to work at first, but it was unreliable".
- **Apple:** system appearance changes are instant natively. This brings the web to parity. Apple is silent on the web mechanism.
- **Slop tell (our inference).** A half-second color fade across the whole page on dark-mode toggle, with icons snapping and text fading out of sync.

---

## 17. Linear — "How we redesigned the Linear UI (part Ⅱ)" (https://linear.app/now/how-we-redesigned-the-linear-ui, 2024 — date inferred from "explorations made in November 2023") (fetched). Part I and a "quality" essay URL returned 404.

**Key principles (fetched)**
- [CONSIDER] Theme generation in a perceptual space: "using the LCH color space instead of HSL… a red and a yellow color with lightness 50 will appear roughly equally light to the human eye." "instead of having to define 98 specific variables for each theme, we defined three: base color, accent color, and contrast." A contrast variable lets them "automatically include super high-contrast themes for users who need it for accessibility reasons."
- [SHOULD] Restrain the accent color: "return to a more neutral and timeless appearance… by limiting how much chrome (blue in our case) was used in the calculations applied to our color system."
- [SHOULD] Alignment that you "feel after a few minutes of using the app" (labels, icons, buttons in the sidebar).
- [CONSIDER] "We started using Inter Display to add more expression to our headings while maintaining their readability and kept using regular Inter for the rest". This is an optical-size split.
- Process: stress-test a direction across all main views before implementation; "I often relied on Apple standards, which also helped get close to the feeling of a native app."

**Beyond Apple.** Linear's own team leaned on Apple standards. The parts that **add to Apple** are the perceptual theme generator and the contrast parameter (Apple has Increase Contrast as a system setting, but no generator for custom themes).

**Convergence warning.** See the dedicated section. The Linear *look* (dark, low-chroma, Inter, glow gradients on marketing) is the most-copied SaaS aesthetic of 2021–2025 (our inference, supported by third-party "Linear style" articles found in search). Take the method, not the look.

---

## 18. Stripe — "Designing accessible color systems" (https://stripe.com/blog/accessible-color-systems, 2019, unverified year) (fetched)

- [MUST] Contrast floor: "minimum contrast ratio of 4.5 for small text, and 3.0 for large text." Their audit found "none of the default text colors we were using for small text (except for black) met the contrast threshold."
- [SHOULD] Don't darken brand hues until they turn muddy. "Once we got to a shade with sufficient contrast… we lost a lot of the brightness and vibrancy of our colors."
- [SHOULD] Work in a perceptually uniform space (CIELAB): "at the same level of mathematical lightness, yellow appears lighter than blue."
- [SHOULD] Goals worth adopting as checks: "Predictable accessibility… Clear, vibrant hues… Consistent visual weight: At each level, no single color appears to take priority over another."
- [SHOULD] Level-distance rule: "Any two colors are guaranteed to have sufficient contrast for small text if they are at least five levels apart, and at least four levels apart for icons and large text." Text colors also pass "atop the lightest color value in any hue."
- Limits: "there's no such thing as 'very colorful dark yellow' or 'vibrant light royal blue'."

**Beyond Apple.** Apple's system colors are already tuned per appearance and contrast mode. Stripe's method **adds to Apple** when building a *brand* palette. It is the main way to get a non-Apple color identity without failing accessibility.

**Web/native.** CSS `oklch()` / `color-mix(in oklch, …)` for scales; check with WCAG 2 contrast at the floor. Native: asset-catalog colors with Any/Dark and High Contrast variants.

---

## 19. Motion canon: Disney's 12 principles, Material motion, Apple springs

### 19a. Disney — Thomas & Johnston, *The Illusion of Life* (1981) (unverified, from memory; UI mappings from secondary articles found in search, not fetched)
The 12: squash and stretch, anticipation, staging, straight-ahead vs pose-to-pose, follow-through and overlapping action, slow in and slow out, arcs, secondary action, timing, exaggeration, solid drawing, appeal (unverified, from memory).
UI mappings that are checkable:
- [SHOULD] Slow in/out → easing; nothing moves linearly except progress and spinners (our mapping).
- [CONSIDER] Follow-through / overlapping → stagger children by small offsets; Apple's app-launch example (WWDC23, fetched) uses "different springs, different start times, and different end times."
- [CONSIDER] Arcs → large travels move on a curve, not a straight diagonal (our mapping).
- [CONSIDER] Squash → press-state scale (Emil's 0.97; secondary sources map "pressed state" to squash).
- [SHOULD] Staging → one moving thing at a time draws attention; simultaneous unrelated motion is noise (our mapping).
- [CONSIDER] Exaggeration → only for rare, celebratory moments (our mapping, consistent with Emil's frequency rule).

### 19b. Material Design 3 motion (official tokens from https://github.com/material-components/material-components-android/blob/master/docs/theming/Motion.md) (fetched; m3.material.io is JS-rendered and did not extract)
- Easing (verbatim): Standard `cubic-bezier(0.2, 0, 0, 1)`; Standard Decelerate `0, 0, 0, 1`; Standard Accelerate `0.3, 0, 1, 1`; Emphasized is a path `M 0,0 C 0.05, 0, 0.133333, 0.06, 0.166666, 0.4 C 0.208333, 0.82, 0.25, 1, 1, 1`; Emphasized Decelerate `0.05, 0.7, 0.1, 1`; Emphasized Accelerate `0.3, 0, 0.8, 0.15`.
- Durations: Short1–4 = 50/100/150/200ms; Medium1–4 = 250/300/350/400ms; Long1–4 = 450/500/550/600ms; ExtraLong1–4 = 700/800/900/1000ms.
- Springs (verbatim): FastSpatial `damping 0.9, stiffness 1400`; DefaultSpatial `0.9, 700`; SlowSpatial `0.9, 300`; FastEffects `1, 3800`; DefaultEffects `1, 1600`; SlowEffects `1, 800`. Spatial springs (position, size) may overshoot slightly; effects springs (color, opacity) are critically damped. Small components use fast, partial-screen (sheets, drawers) default, full-screen slow.
- The M3 Expressive spring numbers in third-party packages (e.g. spatial default stiffness 380, damping 0.8) are unverified against Google's spec.

### 19c. Apple springs — WWDC23 "Animate with springs" (https://developer.apple.com/videos/play/wwdc2023/10158/) (fetched transcript)
- Two parameters, duration and bounce, "adopting these universally across Apple's design and engineering efforts." Bounce > 0 = bouncy, 0 = smooth, < 0 = flattened. Range -1.0 to 1.0.
- Guidance (verbatim): "A bounce of 0 feels like a smooth, gradual change. A small bounce, like around 15%… the long tail feels a little more brisk… for larger bounce values like 30%, you do start to feel some noticeable bounciness." "you should be cautious about using values higher than around 0.4". "When you're not sure, use a spring with bounce 0". "Think about what kind of character your app has. Is it serious or playful? Should it feel relaxed or fast-paced?"
- Velocity: springs carry gesture velocity and retargeting velocity; "springs are the only type of animation that maintains continuity both for static cases and cases with an initial velocity."
- Conversion: `stiffness = (2π ÷ duration)^2`; `damping = 1 - 4π × bounce ÷ duration` (bounce ≥ 0).
- Code: `.snappy`, `.snappy(duration: 0.4)`, `.snappy(extraBounce: 0.1)`, `.spring(duration: 0.6, bounce: 0.2)`, `CASpringAnimation(perceptualDuration:bounce:)`.

### What makes motion feel branded (synthesis; our inference unless cited)
- **Material** brands motion through *time-based tokens and a signature emphasized curve*: a fast start and long deceleration, with durations scaled to travel and area.
- **Apple** brands motion through *velocity-preserving, mostly non-bouncy springs* and staggered multi-property choreography (fetched app-launch example).
- **A product's own motion** = choose a personality on Apple's own axes ("serious or playful… relaxed or fast-paced", fetched) and encode it as 3–5 named motion tokens (micro / small-spatial / sheet / full-screen / celebratory) used everywhere. Sonner shows the same idea on the web (fetched: easing "in line with the toast design, page design, its name").
- [MUST] On Apple platforms, motion *system* stays Apple's (springs, interruptible, velocity-preserving). Character comes from token choices *within* it (duration, bounce, stagger, which things move at all), not from importing Material curves.
- [SHOULD] On web, pick curves deliberately; don't default to Vaul's iOS curve, Material's emphasized curve or Tailwind's `ease-in-out` for everything.

---

## 20. Typography implementation details (MDN, fetched)

- [SHOULD] `text-wrap: balance` for headings, captions, blockquotes. MDN: "only supported for blocks of text spanning a limited number of lines (six or less for Chromium and ten or less for Firefox)."
- [SHOULD] `text-wrap: pretty` for longer paragraphs. MDN: "pretty has a negative effect on performance, so it should be only used for longer blocks of text when the layout is more important than speed." Prevents orphans (single-word last lines).
- [CONSIDER] `hanging-punctuation: first allow-end last;` MDN: "This feature is not Baseline because it does not work in some of the most widely-used browsers." Safari supports it (unverified, from memory). Treat as progressive enhancement.
- [SHOULD] `font-optical-sizing: auto` is the default for fonts with an `opsz` axis; "small text sizes are often rendered with thicker strokes and larger serifs, whereas larger text is often rendered more delicately". Check that a custom variable font with `opsz` is not forced off by `font-variation-settings`. Native: SF does this automatically (unverified, from memory, for exact switch points).
- [SHOULD] Prefer `font-variant-*` over low-level `font-feature-settings` (`"tnum"`, `"ss01"`, `"cv11"`), because `font-feature-settings` overrides wholesale and isn't inherited cleanly (unverified, from memory).
- Native equivalents: `.monospacedDigit()`; SwiftUI `Text` line-break strategy via `UIFont`/`NSParagraphStyle` `lineBreakStrategy` (unverified, from memory, as to SwiftUI exposure).

---

## Synthesis: what Apple misses

Each item is something Apple's HIG is silent on or thin on, which these sources supply. None of them overrides an Apple rule.

1. **Line length.** Apple gives readable-width layout guides but no character count. Add: 45–75 (Bringhurst) / 45–90 (Butterick) characters; cap at about 60–66ch.
2. **Custom-text settings.** Leading 120–145%, caps tracking 5–12%, small heading increments, at most 3 heading levels (Butterick). Apple's Dynamic Type handles this only for system styles.
3. **Grid from type.** Grid rows and gutters derived from leading; asymmetric column use (Müller-Brockmann, Every Layout). Apple specifies margins, not compositional grids.
4. **Fluid web type.** Interpolated scales with rem-anchored `clamp()` (Utopia).
5. **Brand color in a perceptual space.** LCH/OKLCH/Lab scales, level-distance contrast rules (Stripe), parametric themes with a contrast knob (Linear).
6. **Data density and honesty.** Data-ink, sparklines with "typographic resolution", banking to 45° (Tufte).
7. **Frequency-gated motion.** No animation for keyboard-initiated or very frequent actions; under 300ms for web micro-interactions (Emil, Rauno). Apple implies this but has no explicit test.
8. **Web interaction hygiene.** Spinner show-delay and minimum time, tooltip group timing, `transition` property lists, theme-toggle without transitions, optimistic UI, URL state (Vercel, Paco).
9. **Shadow physics for custom surfaces.** One light source, layered, hue-matched shadows (Comeau). Apple uses materials instead.
10. **Motion personality as tokens.** Apple offers the axes (serious vs playful, relaxed vs fast-paced) but leaves the per-product token set to the team.

**True conflicts to flag (not resolve against Apple):** system fonts (Butterick vs Apple); Title Case (Butterick vs Apple/Vercel); APCA vs WCAG 2 (Vercel vs Apple/WCAG); <300ms (Emil) vs ~0.4–0.6s springs for spatial transitions (Apple); Tufte density vs Apple touch-target minimums; modular scale yes (Every Layout/Utopia) vs no (Butterick).

---

## Popular-pattern convergence risk

Today's AI slop is largely these sources' *surface looks*, copied without their reasons. The skill should take the reasons and actively avoid steering toward the looks. For each item: what became generic, then how the skill should handle it.

| Pattern (source) | Generic form now | How loupe should handle it |
|---|---|---|
| Inter / Geist + tight negative tracking on headlines (Linear, Vercel) | Default "modern SaaS" headline | Never recommend a specific face. Check *fit*: does the face's character match the product? Flag Inter/Geist/system-sans-only stacks as **convergence risk [CONSIDER]**, not as errors. Butterick: "Steal from better sources." |
| Dark, low-chroma UI with one violet/blue accent and glow gradients (Linear marketing look) | The "Linear style" landing page | Take the method (perceptual theme generation, restrained chrome, contrast param). Flag glow borders, radial-gradient orbs and noise overlays as decoration without information (Rams *honest* / *long-lasting*). |
| Bento grids | Asymmetric-looking but content-agnostic tiles | Require a content reason for every cell size (Müller-Brockmann). Flag bento layouts where swapping tiles changes nothing. |
| shadcn/Radix default components (border + `rounded-lg` + `shadow-sm` + muted-foreground) | Identical cards, dialogs and forms everywhere | Check that radius, border, shadow and spacing tokens are *chosen* for the product. Unchanged library defaults count as a convergence finding. |
| Micro-interactions à la Emil/Rauno (scale 0.97 on press, blur crossfade, origin-aware popovers, staggered fade-up on scroll) | Every button squishes, every section fades up | Apply the *frequency test* first. Flag motion on frequent or keyboard actions. Flag scroll-reveal on content the user came to read. The 0.97 number is a reason (immediate feedback), not a mandate. |
| Vaul's iOS sheet curve `cubic-bezier(0.32, 0.72, 0, 1)` on everything | Web apps imitating iOS timing | On web, motion tokens should come from a stated product personality (Apple's axes: serious/playful, relaxed/fast). |
| Layered, hue-matched shadows (Comeau) | Soft floating cards on every surface | Shadows only where elevation means something (modal over page). Flag uniform elevation everywhere. |
| Refactoring UI / Tailwind scales (gray-500 secondary text, 4/8px spacing, `text-sm text-muted`) | Tailwind-default hierarchy | Check spacing *rhythm* derived from type (Every Layout) over default scales. Default Tailwind gray ramps unchanged = finding. |
| Centered hero + three feature cards + logo strip + CTA | The template page | Butterick: "Centered text is overused… Asymmetry is nothing to fear." Ask for one compositional decision that a template would not make. |
| Rams "less, but better" read as gray minimalism | Empty, characterless "clean" UI | Use Rams for *honest* and *thorough* checks. Minimalism is not a target. |
| Vercel guideline list as a style guide | Vercel-flavored copy (Title Case, "&") | Import the universal checks only. Vercel itself says its copy rules "aren't universal guidelines." |
| Modular-scale type with a fixed ratio | Mechanical, evenly stepped headings | Accept any small intentional set. Butterick: "When your headings look right, they are right." |

**Steering rule for the skill (our proposal):** findings may say *why* a detail works (feedback latency, spatial continuity, perceptual lightness, measure) and may say a choice is *convergent*, but must not prescribe a named product's look as the fix. Fix suggestions should offer two or three directions drawn from outside current SaaS (editorial print, signage, instrument panels, posters, the product's own domain), in the spirit of Butterick's "infuse the web with visual ideas from elsewhere."

---

## Sources not reachable

- Bringhurst's book text (only Rutter's web adaptation of §2.1.2 fetched). Scale values and rhythm wording are from memory.
- Müller-Brockmann, *Grid Systems*; Tschichold; Lupton (thinkingwithtype.com timed out). All content in §3–5 is from memory.
- Refactoring UI book and Medium "7 practical tips" (403). Only the landing-page quote is verified; the rest is secondary or memory.
- Tufte's data-ink and chartjunk definitions (VDQI text not online). Only the sparkline page was fetched.
- m3.material.io (JS-rendered). Used the official material-components-android Motion.md instead.
- Linear part I and any "quality" essay (404 at guessed URLs). linear.app/method returned headings only.
- uxdesign.cc Disney-in-UX article (403). Disney mappings are our own plus search snippets.
- Rauno's essay was read through a summarizer, so its phrasing is paraphrase; the essay's year is unverified.
- Emil Kowalski post dates are not shown on the pages; years unverified.
- NN/g Gestalt page: fetched, but principles were stated from memory.
- Apple HIG wording on contrast ratios and Title Case was not re-fetched here; cross-check against the HIG digest.

Additional fetched source used: NN/g "Executing UX Animations: Duration and Motion Characteristics" (https://www.nngroup.com/articles/animation-duration/): "the duration of most animations should be in the range of 100–500 ms"; simple feedback "roughly 100 ms"; modals "200–300 ms"; "At 500ms, animations start to feel like a real drag"; entering animations take longer than exits ("a popup window may take 300ms to appear, but only 200 or 250ms to disappear"). This independently supports Emil's ranges.

---

## Open questions for skill design

1. **Conflict policy output.** When a craft source conflicts with Apple (system fonts, APCA, <300ms), should the finding be shown as "Apple rule (pass) + craft note (consider)", or suppressed on native and shown only on web?
2. **Measuring "convergence".** Can the skill detect library defaults mechanically (Tailwind gray ramp values, shadcn radius/shadow tokens, Inter/Geist in the font stack, `cubic-bezier(0.32,0.72,0,1)`), and how many convergence flags trigger a "generic" verdict?
3. **Character brief.** Should the review start by asking for, or inferring, a product personality on Apple's motion axes (serious/playful, relaxed/fast) plus a typographic reference outside software, so that "distinctiveness" findings have something to measure against?
4. **Checkable typography on native.** SwiftUI has no `ch` unit. Does the skill estimate measure from font metrics (average character width × point size) to apply the 45–75 check on iPad and macOS reading views?
5. **Data-density threshold.** Where should Tufte-style density yield to Apple's 44pt targets (read-only vs interactive marks), and does the skill check chart aspect ratios (banking to 45°)?
6. **Motion audit method.** Static code review can catch `transition: all`, missing `prefers-reduced-motion` and keyboard-triggered animation. Should the skill also record and time real interactions (Playwright traces, simulator) to verify durations and interruptibility?
7. **Modular scale stance.** Every Layout and Utopia want ratios; Butterick rejects them. Does the skill require a type *system* (any small set) and stay neutral on ratios?
8. **Font licensing.** Butterick's "professional fonts" advice implies paid faces. Should suggestions be limited to faces the project can license, and who supplies that list?
