Covers the distinctiveness procedure: whether a product has its own point of view on Apple's base, the brand tests, the no-brand direction path, "make it feel like X", and how to detect defaults in code.
Loaded by passes: distinctiveness (primary), and the Elevate section of the report.
Snapshot: 2026-10-23

Tags: [MUST]/[SHOULD]/[CONSIDER] carry the source's strength. Each check is labelled `adds to Apple`, `Apple silent`, or `CONFLICT: <Apple rule> vs <source>; resolution: <policy>`. `(unverified)` items were recalled or came from search snippets; weight them lower and never make them Blockers on their own. Apple HIG stays the base: no finding here may ask a product to break HIG clarity, hierarchy, platform conventions or accessibility. Identity is a layer on top of a correct base, not a license to replace system controls or trade legibility for mood.

Convergence tells: see references/slop-catalog.md.

## Why this pass exists
- **Homogenization is measured.** Goree, Doosti, Crandall and Su (CHI 2021) ran computer vision over website images from 2003-2019: sites grew "significantly more similar since 2007", and for page layouts the average distance between sites fell by over 30%. Interviews with 11 web professionals blamed shared code and libraries, standardized color schemes and mobile support. Layout is the most converged channel, so a product distinctive only in color and type still reads as generic at a glance. Unmodified library defaults, not library use, are the vector.
- **LLM output is narrower still.** Design Creativity Bench (Rusia, Bhole, Gupta, Dey; arXiv:2610.11539, Oct 2026): same-prompt pairs from different models scored 0.592 on originality against 0.764 for human-vs-model pairs; creative range 0.581 across models against 0.902 for human designs; appropriateness above 90% for every model (best 99.2%) against 98.0% for humans. Generated UI passes acceptance criteria and fails on range. Related work reports mode collapse within and across models (Jiang et al., "Artificial Hivemind", NeurIPS 2025), chat templates reducing variety of form (Yun et al., Findings of EMNLP 2025) and a Nature model-collapse paper; all known only from search summaries (unverified). Consequence for the skill: its own taste is the median, so recommendations come from the product's inputs, never from what looks good to the model.
- **Some sameness is correct.** Matt Ström's "Sameification" argues convergence is rational: competitors cluster, stretched teams pick minimum-risk options, and minimizing pattern variation raises task success (Jakob's law). Interaction convention should converge; expression should not.
- **Brand science gives a non-taste vocabulary.** Jenni Romaniuk, *Building Distinctive Brand Assets* (2018): an element is an asset only if it is **famous** (category buyers link it to the brand without the name) and **unique** (most links to it point to this brand). The Ehrenberg-Bass grid: *use or lose* (famous and unique), *investment potential* (unique, not yet famous), *avoid solo use* (famous, not unique; it evokes competitors), *ignore or test* (neither). A claim that assets above 50% uniqueness give dominant recall is unverified. Byron Sharp, *How Brands Grow* (2010, via secondary summaries): growth comes from recognizability built by assets used consistently, not from being different in kind. That fits HIG: standard navigation and instant recognition can coexist.
- **Emotion sits on top of usability.** Aarron Walter, *Designing for Emotion* (2011): functional, then reliable, then usable, then pleasurable; pleasure counts only once the lower tiers hold. Tuch, Roth, Hornbæk, Opwis and Bargas-Avila (2012, *Computers in Human Behavior* 28(5), 80 participants, 2×2 aesthetics × usability shop): aesthetics did not change perceived usability, but poor usability lowered post-use beauty ratings, through frustration. Earlier work found perceived beauty tracks perceived usability before use (Kurosu & Kashimura 1995, 26 ATM layouts, 252 participants, r = 0.589 per a secondary summary; Tractinsky, CHI '97; Tractinsky, Shoval-Katz & Ikar 2000, *Interacting with Computers* 13(2), persistence after use unverified); Cyr et al. 2006 found no link in Canada. Don Norman's visceral, behavioral and reflective levels (2004, unverified) frame where identity can live; behavioral pleasure is HIG territory, so it is the safest place for identity on Apple platforms.
- **Expression aimed at hierarchy pays.** Google's Material 3 Expressive research (first-party, not peer-reviewed): 46 studies, more than 18,000 participants, about three years. Expressive designs were preferred across ages, up to 87% among 18-24-year-olds; key elements were found up to 4× faster (a larger Send button in the email case); users 45+ matched younger users' fixation times; subculture perception +32%, modernity +34%, rebelliousness +30%. Caveats on the same page: banking may need established patterns, a scattered album-art list scored lower on usability, removing labels from email actions hurt, a strong minority preferred calmer designs, and "No amount of emotion can compensate for a lack of clarity."

## The procedure
Runs after every Apple-grounded pass. It cannot override an Apple finding, and every fix it proposes must be buildable with HIG-conformant components. The profile's `direction` is the yardstick; if there is none, run the no-brand path first.

1. **Gate.** For any flow with an unresolved Blocker or Major from the Apple passes, hold all pleasure-tier findings for that flow and list them after the fix.
   - [MUST] No pleasure-tier finding on a flow that still has a functional, reliable or usable defect. Report order follows Walter's pyramid. `Apple silent`
   - [MUST] Never accept aesthetics as compensation for a usability defect; when a team defends an expressive choice that costs legibility, target size or contrast, cite Tuch 2012 and require the Apple fix first. `adds to Apple`
2. **Find the authored point of view.** Read the profile, then look for design principles, brand guidelines, a voice and tone doc, DESIGN.md, a token file with named brand tokens, custom fonts, custom symbols, alternate app icons, sound files, Rive or Lottie files. Ask the user only for what is missing.
   - [SHOULD] No principles, persona or brand doc: finding "No authored point of view". Infer 3 candidate principles from subject, audience and content, each phrased so a competitor would not sign it and each ruling something out ("dense over spacious", "calm over exciting"). "Simple", "intuitive" and "delightful" are not principles. `Apple silent`
   - [SHOULD] A written persona with "X but not Y" bounds exists (Mailchimp's published shape: "weird but not inappropriate, smart but not snobbish"; voice constant, tone flexing with the reader's state). Without one, expressive choices drift to defaults. `adds to Apple`
   - [MUST] A DESIGN.md or token file named after, or matching the token values of, a famous product is borrowed identity. Flag it. `adds to Apple`
   - [SHOULD] If principles exist, check whether the UI obeys them, screen by screen. `Apple silent`
   - [CONSIDER] When the team wants its own principles, point to Ström's workshop: the people accountable for outcomes in the room, a facilitator and a scribe, about 60 minutes (check-in, align 10, diverge and write 15 with one principle per note, converge and theme 15, dot vote 10, check-out), then publish them where everyone sees them. "Good design principles are written as a team." `Apple silent`
3. **Classify every expressive channel.** Channels: type, color use, shape, motion, iconography, imagery, sound and haptics, layout idiom, voice. Give each exactly one source, with the evidence that decided it (file:line or screenshot region):
   - `platform default`: unchanged SwiftUI, UIKit or AppKit behavior (system tint, SF at stock text styles, stock symbols at default weight and scale, stock springs). Evidence: no override in code or asset catalog.
   - `library default`: unchanged shadcn, Tailwind, Radix, Chakra or MUI values. Evidence: config files and token values identical to the library's shipped ones (see detection signals below).
   - `trend default`: matches an entry in references/slop-catalog.md, including praised-product clones and second-layer defaults. Evidence: the catalog entry it matches.
   - `authored`: traceable to the subject, the core action, an existing brand asset or a stated principle. Evidence: the trace, written as one sentence ("green appears only on completion, in-app, in notifications and on the icon, because the product is about finishing").
   - [MUST] At least two channels are `authored`, and at least one of them is visible on the primary screen. `Apple silent`
   - [SHOULD] Platform default on controls is often correct and is never a finding by itself; it simply doesn't count toward identity. Before raising any "generic" flag, state its layer: a flag on a standard tab bar, sidebar or settings list is a false positive. `adds to Apple`
   - [SHOULD] Judge layout separately, since it is the most converged channel. Downsample a screenshot to about 64px wide and compare its block silhouette with the median for that page type (centered hero plus 3 cards plus logo row; sidebar plus table; large title over inset grouped list). Median silhouette with nothing else carrying identity is a finding. `Apple silent`
   - [SHOULD] Domain-swap question: "if this were a banking app, a kids' app or a dev tool, what on this screen would change?" "Only the copy and the logo" means the expression layer is empty. `Apple silent`
4. **Split by surface.** Map where expression appears. Task flows (forms, lists, navigation, settings, checkout, dense data) stay plain and standard. Expressive zones are first run, onboarding splash, empty states, success and milestone moments, the app icon, widgets, share surfaces and marketing.
   - [MUST] No expression in a task flow that reduces legibility, contrast, target size, label presence or standard control behavior. M3 Expressive measured label removal and scattered lists as harmful. `adds to Apple`
   - [SHOULD] Put expression where it serves hierarchy: the primary action (size, contrast, containment) and key state changes. This is the best-evidenced use and is plain HIG hierarchy. `adds to Apple`
   - [SHOULD] Expression on chrome and decoration while the primary action is a default button is misplaced expression. `adds to Apple`
   - [SHOULD] A brand or display typeface stays in display roles; body, controls and dense data use the system face or a highly legible text face, with Dynamic Type either way. CONFLICT: Apple's Dynamic Type and legibility rules vs a brand display face set everywhere; resolution: split by surface, Apple wins in task flows, the brand face may run on display-only surfaces if text still scales and contrast passes. `adds to Apple`
   - [SHOULD] A brand color meets contrast in both appearances wherever it carries text or state. CONFLICT: Apple contrast and appearance rules vs a brand color that fails in light or dark; resolution: accessibility, strictest source wins; the brand hue may stay on non-text display surfaces only. `adds to Apple`
   - [SHOULD] Two motion registers: productive (quiet, out of the way) for repeated actions and expressive for significant moments (IBM Carbon's split; its productive standard easing is quoted secondhand as `cubic-bezier(0.2, 0, 0.38, 0.9)`, unverified). One curve and duration everywhere means motion has no hierarchy; everything expressive fights Apple's restraint. Both registers honor Reduce Motion. CONFLICT: Apple's brief, purposeful motion vs M3 calling its bouncy Expressive scheme the default for most situations; resolution: native Apple target, Apple wins; bounce is a signature-moment exception, never the baseline. `adds to Apple`
5. **One signature element.** Name the single visual or behavioral element the product owns (a color used one specific way, a shape motif, an icon drawing style, a character, a sound). Used sparingly and repeated across surfaces.
   - [SHOULD] Exactly one signature element, rationed to where it defines character (Nothing OS keeps its dot-matrix face for display and gives reading to a neutral face). `Apple silent`
   - [SHOULD] It recurs across onboarding, empty states, notifications, icon, widgets, website and App Store screenshots. An asset on one screen is not an asset; repetition is the reviewer's only proxy for fame. `Apple silent`
   - [SHOULD] Meaningful but category-shared metaphors (shield for security, rocket for launch, sparkle for AI) aid comprehension; credit them for usability, never for identity. Any category-shared element is at best "avoid solo use". `Apple silent`
   - [CONSIDER] Invest in a unique-but-underused element the product already has rather than inventing a new one; on redesigns, diff old against new and flag recognized assets dropped without reason. `Apple silent`
6. **One or two signature moments.** A signature moment is a microinteraction raised to brand status (Saffer, *Microinteractions*, 2013: the Like button, Windows Start, "I'm Feeling Lucky"). Count moments that combine several expressive tactics.
   - [SHOULD] One or two per product. Zero reads as generic; more than two reads as noise. M3 Expressive caps hero moments at "one or two", and Fluent reuses native patterns "80% of the time" to spend effort on signature experiences; two platform owners reached the same budget independently. (Saffer's source text allows 1-3; the skill uses the tighter shared budget.) `Apple silent`
   - [SHOULD] Each sits on the core action or a milestone, uses a standard trigger, gives informative feedback and holds up under VoiceOver and Reduce Motion. `adds to Apple`
   - [MUST] A signature moment never blocks or slows a repeated task; it is brief or skippable on repeat. `adds to Apple`
   - [SHOULD] Test: "name the moment a user would describe to a friend." No answer is a finding. If none exists, [CONSIDER] propose one derived from the core action (the Things Magic Plus pattern), never from the catalog. `Apple silent`
7. **Trace identity to the subject.** For each authored channel, the signature element and each signature moment, write where it came from: the product's content, material, audience or core action. "Looks premium", "modern", or a mood board is not a source.
   - [SHOULD] An identity element with no trace is a trend default in waiting; reclassify it. `Apple silent`
8. **Brand tests.** Take 3 screenshots: primary screen, an empty state, a success or completion state.
   - [SHOULD] Logo-off: hide the name, wordmark and icon. Record verbatim what still identifies the product. `Apple silent`
   - [SHOULD] Competitor-name swap: put the nearest competitor's name on the same screens. Record whether anything looks wrong. Nothing wrong means nothing is owned. `Apple silent`
   - [CONSIDER] Asset grid: candidate asset, unique in category (yes, or shared with whom), repeated on N of M surfaces, quadrant. `Apple silent`
   - [CONSIDER] Three emotion questions, one per Norman level: what the first screenshot makes you feel and whether that is on-brief; which interaction is a pleasure to repeat; what a user would show a friend. Missing answers are findings. (unverified framing) `Apple silent`
9. **Voice.** Sample 20+ user-facing strings across onboarding, errors, empty states and notifications. One voice; tone flexes with the reader's state; errors, destructive confirmations, money and permissions get the plainest tone. Writing detail lives in the writing reference. `adds to Apple`
10. **Verdict.** One of `authored`, `partly authored`, `default-assembled`, followed by the counts that back it: channels authored of 9, signature element present or not, signature moments counted, matched catalog tells per catalog section, logo-off answer. No numeric score. Rough guide: `authored` = at least two authored channels including one on the primary screen, a signature element, one or two moments, and a logo-off answer that names something owned; `default-assembled` = fewer than two authored channels and an empty logo-off answer; anything between is `partly authored`.

## No brand direction
When the profile has no `direction` and the team has no brand doc, the pass proposes directions before judging. The user picks one; it is saved to the profile's `direction` field, and later runs judge against it.

- [MUST] Propose 2-3 directions, each derived from the product's purpose, audience and subject (content, material, core action). The source sentence for each is written out. `Apple silent`
- [MUST] Directions differ from each other on at least two channels, so they are real alternatives and two products reviewed by the skill don't converge. `Apple silent`
- [MUST] Each direction states: its signature element, its one or two signature moments, and a stance on type, color use and motion, written as reasons and constraints ("one hue reserved for state, never decoration, because users scan for status"; "type does the hierarchy, weight before size, because the screens are dense"). Never named fonts, hex palettes or easing curves, and never values copied from a product. `Apple silent`
- [MUST] Check each direction against references/slop-catalog.md, including praised-product clones and second-layer defaults. A direction that matches is discarded, not softened. `Apple silent`
- [SHOULD] Each direction is buildable on HIG components, keeps task flows plain, and names which surfaces are expressive zones. `adds to Apple`
- [SHOULD] Each direction states the register it implies (utilitarian or expressive) and a motion personality on Apple's axes (serious to playful, relaxed to fast), so the motion pass can follow it. `adds to Apple`

## "Make it feel like X"
Translate to mechanism, decline the look, and say why in one line: the look of a praised product is already copied at scale and is catalogued as a tell, and copying it adds the product to the clone group rather than giving it identity. Then apply the mechanism to this product's subject.

- **Linear** → hierarchy discipline and calm density: chrome recedes so content leads ("Structure should be felt not seen"; dimmed sidebar, fewer separators), a parametric theme system (its 2024 redesign moved to LCH and derived light and dark themes from three variables, base, accent and contrast, instead of 98, which also gave high-contrast themes), speed and keyboard-first operation, and evolution over reinvention ("A redesign should not completely disassemble the product to its atomic parts"). Not the dark UI, indigo glow, glass or tilted screenshots; Daryl Ginn's "The Linear effect" (Rectangle, Jan 2023) showed four such sites failing a squint test.
- **Things 3** → one interaction that answers the core action better than the platform default, built from standard mechanics: Magic Plus is tap to create or drag to create exactly where it belongs, using ordinary drag and drop. Not a white, airy checklist with a blue accent.
- **Stripe** → one typographic voice and one well-executed signature surface, kept for years. Not the gradient mesh hero or skewed sections; "Stripe DESIGN.md" files sold online show the look is being mass-distributed to agents.
- **Teenage Engineering** → a strict mapping (one color means one control, everywhere) plus a deliberate limit that shapes behavior. HIG-compatible when color is redundant with labels or position. Not orange accents and mono labels that encode nothing.
- **Nothing OS** → ration the signature asset to display moments and give reading to a neutral face. Not dot-matrix type on a dashboard.
- [MUST] Never copy palette, type, shapes or curves from the named product. State the declined look and the reason in the report. `Apple silent`
- [SHOULD] If X has no clear mechanism that fits this product, say so and fall back to the no-brand path. `Apple silent`

## Case-study principles
Six mechanisms recur across the case studies. They are principles; none of the looks below is a target.
1. **Derived from the subject.** Identity comes from the content, material or core action. Things (capture in place), CapWords, a 2025 Apple Design Award winner (photos of objects become interactive stickers for language learning), Playdate (a crank as input).
2. **One committed constraint or signature, rationed.** Nothing OS limits its dot-matrix face to display roles; Linear's restraint; Playdate's 1-bit screen applied to every piece of content, not only the hero; Teenage Engineering's OP-1 limits (four tracks, limited recording time, no undo, per a retailer blog).
3. **A system, not a skin.** Linear's parametric color; Duolingo's characters run as Rive state machines that react to correct, wrong and streak states, so expression doubles as feedback; Teenage Engineering's color-equals-control mapping (unverified).
4. **Consistency over time.** Assets repeated on every surface and kept across redesigns (Linear's evolve-don't-replace; Stripe's years of one voice).
5. **Convention where the task is.** Airbnb's 2025 redesign put in-house 3D icons and motion in browse and delight surfaces while booking stayed conventional ("not get in the way of it", design VP Teo Connor via It's Nice That). Panic's Mac apps keep native controls and put character in icons, illustrations, release notes and small delights (unverified). Apple's own Design Awards (2025: 36 finalists across Delight and Fun, Innovation, Interaction, Inclusivity, Social Impact, Visuals and Graphics) reward character inside platform rules.
6. **Authored by a person.** Airbnb's in-house icon family, Roman Muradov's illustration for Notion, a founder's concept. Stock and library assets carry no authorship.

Checks drawn from them:
- [SHOULD] Is the color system parametric (few inputs, derived tokens), and does chrome recede relative to content? `adds to Apple`
- [SHOULD] What is the core action, and is there one interaction that makes it better than the platform default? `Apple silent`
- [CONSIDER] Does any color have a single consistent meaning across the product? `adds to Apple`
- [CONSIDER] Is there a constraint the product commits to everywhere, or only in the hero? `Apple silent`
- [SHOULD] For Mac apps, personality appears in the icon, empty states, onboarding and copy while controls stay native. `adds to Apple`
- [SHOULD] Expressive assets (icons, illustration) are in-house or customized and stop at transactional steps; a recognizable stock or AI style is not authored. `Apple silent`
- [CONSIDER] A mascot responds to state and appears across the journey, not once in an empty state. `Apple silent`
- [SHOULD] A novel model of the core object (Arc's sidebar of tabs as a workspace) costs learnability; on Apple platforms it must still meet HIG discoverability and standard shortcuts. `adds to Apple`

## Guardrail: the skill is not a recipe
- [MUST] The skill never ships a house style, palette, font list or motion preset, in a finding, an Elevate move or a proposed direction. `Apple silent`
- [MUST] Every Elevate move and direction cites its source in this product (subject, user, content, an existing asset or a stated principle) and is checked against references/slop-catalog.md before it is written. A match is discarded. `Apple silent`
- [MUST] Ask of every suggestion: "would this fit any product?" If yes, it is generic; rewrite it until it names something only this product has, or drop it. `Apple silent`
- [MUST] Don't fix slop by substitution (Inter to Geist, indigo to terracotta, Lucide to Phosphor). The replacement is already a catalogued second-layer default. `Apple silent`
- [SHOULD] Phrase fixes as mechanisms ("use the existing green only for completion, everywhere, including the icon and notifications"), not looks ("add a gradient mesh"). Recommend the decision and its constraints; the team picks the asset. When a face must be named because the profile asks, suggest free and open-licensed faces unless the profile lists licensed ones. `Apple silent`
- [SHOULD] Assume any distinctive feature gets copied. Durable identity is the consistent execution of a system of assets, not one novel widget. `Apple silent`

## Taste skills: process only
Use from frontend-design only its process rules: ground every choice in the subject's industry, materials and vernacular; plan tokens first, then check the plan against the default you'd produce for a similar prompt anyway and revise whatever matches; spend boldness in one place; visual structure is information (numbering only for real sequences). Combination-based detection (pixelslop: single patterns are legitimate, flag combinations, scale confidence to page size; "did a human make this choice, or did the AI fall back to a default?") also stays.

Do not use high-end-visual-design or minimalist-ui looks: the first aims at praised-product looks and several of its prescriptions are catalogued tells; the second's fixed palette and illustration style is a Notion clone recipe. Treat both as tell sources. Drop name-based font and icon bans and swap pools from any taste skill.

- [SHOULD] On native Apple targets, SF Pro and SF Symbols are correct; identity comes from how type and symbols are used (weight, scale, rendering mode, custom symbols, a display face rationed to display roles). CONFLICT: Apple's system fonts and SF Symbols vs taste skills' font and icon bans; resolution: native Apple target, Apple wins; on web SF Pro and SF Symbols are flagged per the web mapping, and the fix is a decision process, not a swapped name. `adds to Apple`
- [SHOULD] The "never pure black" rule is dropped. CONFLICT: Apple dark mode, whose base system background is true black (unverified) vs taste skills' pure-black ban; resolution: Apple wins on native targets and is the web default; black backgrounds are not a distinctiveness issue. `adds to Apple`
- [SHOULD] Sidebars on iPadOS and macOS are convention, not genericness. CONFLICT: Apple's sidebar convention vs redesign-existing-projects' "replace the left sidebar with top nav or a floating command menu"; resolution: native Apple target, Apple wins on platform conventions. `adds to Apple`

## Detection signals
Signals decide channel sources in step 3. One signal is evidence, not a verdict.

Native (SwiftUI, UIKit, AppKit):
- Asset catalog: `AccentColor.colorset` absent or empty, or tint set to `.blue`, means platform-default color. Named brand colorsets used for one consistent role point to authored color.
- `.tint(` / `.accentColor(` absent across the app, on a product whose icon or website has a brand color.
- `Font.custom(` or `UIFont(name:` plus fonts listed under `UIAppFonts` in Info.plist mean a custom face; check it stays in display roles and still scales with Dynamic Type. No custom font is fine; it moves type identity onto weight and hierarchy.
- `Image(systemName:)` everywhere at default weight and scale, never matched to adjacent text weight, and no `.symbolset` custom symbols for product-specific concepts, means platform-default iconography.
- Motion: count distinct `withAnimation(` / `.animation(` springs and durations and map each to a register; one curve everywhere or bounce on productive actions is a finding; check Reduce Motion handling.
- Sound and haptics: bundled sound files, `.sensoryFeedback(` or feedback generators on the signature moment; none at all on a product whose core moment would benefit is a gap, not a defect.
- Characters and motion assets: `.riv` or Lottie JSON files, and whether they bind to app state.
- App icon: a gradient squircle with a centered white SF Symbol is a catalog tell.

Web (`scripts/measure.js` returns these in `defaults`):
- `Font stack starts with Inter` / `Font stack starts with Geist`.
- `Tailwind default slate ramp`, `Tailwind default gray ramp`, `Tailwind default zinc ramp` (3 or more stock ramp values in use).
- `cubic-bezier(0.32, 0.72, 0, 1) easing`.
- `shadcn default card (8px radius + shadow-sm)` (60% or more of cards).
- `backdrop-filter in the content layer (main)`.
- `indigo/violet gradient background`.
- Also from measure.js `motion`: `transitionAll` (any `transition: all`) and missing `reducedMotionRule`.
- Source greps that add to these: `components.json` with untouched `globals.css` variables and `--radius: 0.5rem`; `bg-indigo-500` or `bg-indigo-600` primaries; `lucide-react` at one size everywhere; one `transition-all duration-300` everywhere.
- Combination rule: one tell is noise; three or more in one catalog section, or any praised-product clone signature, is a finding.
