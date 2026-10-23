Covers Apple's non-HIG design literature: WWDC design sessions (2017 to 2026), Apple Style Guide, Apple Design Awards criteria, Accessibility Nutrition Label criteria, App Review design rules, WebKit guidance.
Loaded by passes: slop scan, distinctiveness, structure, visual, interaction and motion, content, accessibility, platform fit.
Snapshot: 2026-10-23

Strength tags follow the global rule. Items recalled rather than read are marked "(unverified)" and carry lower weight. Web lines are our translation. Slop tells are ours. Liquid Glass checks are tagged (26+) so the skill can gate them on deployment target. Sessions are cited by title, year and number; no Apple text is quoted at length.

## Cross-cutting takeaways

- Principle set (WWDC26 "Principles of great design", session 250): Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight. Two lines work as anti-slop rules: simple does not mean minimal, and delight does not come from confetti or flourishes added at the end.
- Motion is behavior, not timelines: interruptible, velocity-preserving springs, momentum projection, bounce 0 unless the gesture carried momentum.
- Brand lives in the content layer, never the navigation layer (Liquid Glass and WWDC26 brand sessions).
- Writing is design: PACE, cut filler, lead with the why, keep a word list, button labels name the action.
- Accessibility now has pass/fail criteria (Nutrition Labels): 4.5:1 text, 3:1 non-text, text to 200%, no bright flashes in dark interfaces.
- Web has first-party hooks (see the Web (WebKit) section). Since iOS 26 every site added to the Home Screen opens as a web app by default.
- Version drift: WWDC26 already reversed one WWDC25 recommendation (menu icons, below). When sources conflict the newer one wins and the conflict is noted. Date-stamp rules where it matters.

## Wayfinding, feedback and consistency

Source: Essential Design Principles, WWDC17 (802); Design foundations from idea to interface, WWDC25 (359).

Intent: Apple's canonical "why" behind the HIG, as review questions to ask of every screen.

Checks
- [MUST] Every screen answers: where am I, where can I go, what will I find there, what is nearby, how do I get out. Nav bar title and selected tab say where; tab bar and content say where next; back is the exit. The 2025 restatement: where am I, what can I do, where can I go from here.
- [MUST] Every action gives some confirmation feedback. Four kinds: status, completion, warning, error. Feedback answers what can I do, what just happened, what is happening, what will happen.
- [SHOULD] Prevent errors with inline validation and infer intent instead of erroring (Things 3 corrects June 31 to July 1).
- [MUST] Do not make something that looks conventional behave unconventionally (mental models). Redesigns of long-lived apps need to be clear wins.
- [SHOULD] Match platform conventions over cross-platform brand; the iOS share glyph beats a web or Android share icon in an iOS app. Internally, use a limited number of font faces, sizes and colors.
- [SHOULD] Surface key status at higher levels (Mail badges); hiding Clock navigation in a hamburger is the anti-example. Weigh against density.
- [SHOULD] Controls sit near what they affect and related controls cluster. Control shape mirrors effect (horizontal slider for a horizontal property). Labels appearing where mapping is unclear are a telltale sign.
- [SHOULD] Use progressive disclosure on the less-used 80% (Print dialog), but do not bury things.
- [SHOULD] Balance the principles: too much feedback annoys, too much visibility distracts, too much disclosure slows workflows.
- [SHOULD] Make the most important item larger or higher-contrast as a visual anchor. The toolbar carries the screen title and screen-specific actions (not the tab bar), instead of a menu or branding.
- [CONSIDER] Critique technique: watch a new user, explain the app aloud, compare what you said with what the UI communicates.
- [CONSIDER] Symmetry: reflectional for balance, translational (even repetition) for order.

Web (our translation): wayfinding questions apply per route: page title, active nav state, breadcrumb or back, visible exits. On Apple devices prefer the platform share affordance (`navigator.share`) over a custom share-network menu.

Slop tells (ours): hamburger hiding 3 to 5 top-level destinations; toasts on some actions and nothing on others; clever custom icons for standard actions; equal weight on every list item; three or more font sizes or colors per screen for no reason; logo in the top bar on every screen; every card the same size.

## Motion and fluid interfaces

Source: Designing Fluid Interfaces, WWDC18 (803); Animate with springs, WWDC23 (10158); Enhance your UI animations and transitions, WWDC24 (10145).

Intent: why gestural UI feels off even at 60fps. Motion is behavior: mass, momentum, interruption.

Checks
- [MUST] No perceptible latency on any interaction, taps and presses included. Look for creeping timers.
- [MUST] Every gesture or animation can be interrupted or reversed mid-flight. Detect a pause from the acceleration spike, never a dwell timer.
- [MUST] Spatial consistency: things leave and return along symmetric paths (push from the right, pop to the right; slide in from the right then dismiss downward is the anti-example).
- [MUST] Indicate edges with rubber-banding and keep tracking past them; a hard stop reads as a frozen device.
- [MUST] One-to-one tracking while dragging, continuous feedback during the gesture. Avoid end-only recognizers such as `UISwipeGestureRecognizer`. Keep the touch's relative offset; never snap content to its center under the finger. Use touch history for release velocity.
- [MUST] For thrown or flicked objects choose the endpoint from the projected position (velocity combined with `UIScrollView.DecelerationRate`), not the nearest position. Applies to position, scale and rotation.
- [MUST] Taps: highlight on touch-down, confirm on touch-up, extra hit margin, dragging off cancels, dragging back re-arms.
- [MUST] Animations keep position and velocity continuous. Linear has velocity jumps (keep it for repeating spinners). Ease-in-out cannot take an initial velocity, so a gesture handoff jerks to a halt. On retarget mid-flight, carry the current velocity into the new spring.
- [MUST] Interrupting a push mid-flight converts it into a pop; the system never cancels an interrupted push, so the lifecycle stays consistent.
- [SHOULD] Springs: Apple now uses duration plus bounce universally. Pick duration (pacing) first, then bounce. Bounce range is -1.0 to 1.0: 0 is smooth and the default, about 0.15 is brisk, about 0.30 is noticeably bouncy, be cautious above about 0.4. Below 0 is flattened (overdamped), useful for decaying velocity such as scrolling.
- [SHOULD] 2018 vocabulary: damping (100% = no overshoot, 0% = oscillates forever) and response (speed); avoid duration. Start at 100% damping and add overshoot only if the driving gesture has momentum. Example: tapping Now Playing open uses 100% damping; swipe-dismissing it uses 80%.
- [SHOULD] Use bounce when it should feel physical, such as the end of a gesture, and stay consistent with app character (serious or playful, relaxed or fast). A bounce can also be a functional hint (flashlight button bounces on tap to teach press harder).
- [SHOULD] Hint in the direction of the gesture (Control Center modules expand toward the finger). Light input, amplified output: short flicks carry momentum. Treat behaviors as a family so scrolling and scroll-to-top feel like one object; heavier things get more mass.
- [SHOULD] Swipe hysteresis is usually 10 points on iOS before a swipe begins. Detect competing gestures in parallel from touch-down and cancel losers once intent is clear. Double-tap delays single taps by about 0.5 s, so avoid it where possible.
- [SHOULD] Large frame-to-frame deltas strobe; mitigate with higher frame rate, motion blur or stretching. What is in the frames matters, not only the rate.
- [SHOULD] Teach gestures with visual cues (clipped content at a scroll edge, page dots, grabbers), a discrete animation that mirrors the gesture (Safari close-tab slides left), explanation only for widely reused gestures.
- [SHOULD] Design interaction together with visuals; prototype it.
- [SHOULD] Use SwiftUI.Animation for UIKit/AppKit views where continuous velocity matters. Zoom transitions need a stable identifier because cells are reused.
- [CONSIDER] Different properties may settle at different times; app launch layers springs with staggered starts and ends. Duration is perceptual and settle time unpredictable, so do not gate user-facing changes on settle; use the completion handler that fires at the perceptual duration.
- [CONSIDER] Conversion (the slide shows three equations, the transcript does not speak them): mass = 1; stiffness = (2π / duration)²; damping = 4π(1 − bounce) / duration for bounce ≥ 0 (unverified).

Web (our translation): Pointer Events with `setPointerCapture`; velocity from the last ~100 ms of samples; drive drags 1:1 with `transform`, never CSS transitions; on release hand off to a spring seeded with release velocity (Motion/Framer Motion or hand-rolled). Use `overscroll-behavior` and rubber-band on custom scrollers. Retarget in-flight animations from the current value; never wait for `transitionend` before accepting input. `:active` on pointerdown, cancel on `pointerleave`. CSS `linear()` can approximate an uninterrupted spring but cannot carry initial velocity or retarget; for gesture-driven motion use a JS spring (Motion `type: "spring", bounce, visualDuration` matches Apple's model) or Web Animations API retargeted from the computed value. Default bounce 0, cap about 0.3. View Transitions API with a shared `view-transition-name` per item using stable IDs, and make back during a transition reverse it.

Slop tells (ours): tweened ease-in-out that cannot be interrupted; drag-to-dismiss that jumps on release; carousels snapping to nearest card regardless of velocity; bouncy springs on taps; hover-only feedback with no pressed state; sheets entering from the bottom but exiting by fade; `transition: all 0.3s ease` everywhere; back-overshoot cubic-bezier on every modal; uniform 300 ms on every property; bounce on content-heavy panels; staggered entrances on every list load; detail page that fades in with no spatial link to the tapped card.

## Typography and symbols

Source: The details of UI typography, WWDC20 (10175); Adopt the new look of macOS, WWDC20 (10104); SF Symbols, WWDC19 (206), WWDC20 (10207), WWDC25 (337).

Intent: optical sizes, tracking and leading rules, and symbol sizing that make type look right.

Checks
- [SHOULD] Optical sizes: SF Text was for sizes below 20 pt and SF Display for 20 pt and up. In variable SF Pro, Text transitions into Display between 17 and 28 pt. Smaller sizes need looser spacing, sturdier thin strokes, bigger gaps. In design tools sync the optical-size slider with point size, or pin to the nearest value when out of range.
- [SHOULD] Use size-specific tracking and Apple's tracking tables (the 17 to 28 pt values changed in 2020). [MUST] Custom tracking must be size specific. To fit a string prefer automatic tightening (bounded, tight tracking table) over manual kerning, which breaks ligatures. Too much tracking is a thing; let text truncate.
- [SHOULD] Text styles are weight + size + leading. Emphasized variants come via the bold trait and the actual weight varies by style (medium, semibold, bold, heavy). Tight leading is -2 pt and loose is +2 pt on iOS and macOS (±1 pt on watchOS); body line height 22 becomes 20 tight or 24 loose. Loose for long reading, tight for dense dashboards (Fitness). Line height includes leading; Arabic and other tall scripts get more.
- [MUST] Custom fonts scale with Dynamic Type via `UIFontMetrics` or `.custom(_:size:relativeTo:)`; scale spacing too (`ScaledMetric`).
- [SHOULD] macOS text styles are built around a 13 pt body. Catalyst "scale to iPad" is iOS sizes × 77%.
- [SHOULD] Symbols come in nine weights matched to SF and three scales; small is about 20% smaller and large about 30% larger than medium. Scales are optically centered to cap height with stroke adjusted per scale. Match symbol weight and point size to adjacent text.
- [MUST] A symbol's point size is not a frame size: no forced square width and height, center alignment (not aspect-fit or scale-to-fit), no rasterizing, no reliance on default black (breaks Dark Mode).
- [SHOULD] Custom symbols: at least Regular-Medium, keep template structure, center optically.
- [CONSIDER] SF Symbols 7 (2025): Draw animations (on/off, along path), variable draw; a symbol supports variable color or draw at render time, not both. Over 7,000 symbols (WWDC26 brand session).
- [SHOULD] macOS 2020 (Big Sur): full-height sidebars; sidebar icon colors follow the accent with `preferredColor`, `fixedColor` only for semantic items (yellow VIP star) or monochrome to de-emphasize; use named system colors, never a hard-coded accent; large controls standard.

Web (our translation): `font-family: system-ui` (or `-apple-system`) on Apple-targeted UIs; `ui-rounded`, `ui-serif`, `ui-monospace` exist. Make `letter-spacing` size-dependent: slightly positive at captions, negative at display, near zero around 17 px. `font-optical-sizing: auto` for variable fonts. Body `line-height` about 1.3 for UI, looser for reading. `text-wrap: balance` for headings. Size icons in `em`, align to cap height, match stroke weight to text weight, one icon set with consistent stroke and corner style. Mac-like dense tools: 13px base UI text, accent from one variable, monochrome sidebar icons. SF Pro and SF Symbols are Apple-platform-only licensed; flag on web.

Slop tells (ours): one letter-spacing value (often `-0.02em` or `tracking-tight`) at every size; tight tracking on small body text; negative letter-spacing to squeeze a label instead of wrapping or truncating; fixed `px` sizes with no response to user text size; mixed icon libraries (Lucide next to Heroicons next to emoji); icons fixed at 24px beside 13px text; icons bolder or lighter than their labels.

## Liquid Glass and design system (26+)

Source: Meet Liquid Glass, WWDC25 (219); Get to know the new design system, WWDC25 (356); State of the Union, WWDC26 (102); Build an AppKit app with the new design, WWDC25 (310).

Intent: rules for using, and not using, the 2025+ material. It is also the most misused aesthetic in AI "Apple-like" UI.

Checks
- [MUST] (26+) Reserve glass for the navigation layer floating above content. Do not make a table view glass.
- [MUST] (26+) Never glass on glass; put fills, transparency or vibrancy on top of glass.
- [MUST] (26+) Two variants, Regular (adaptive) and Clear (permanently transparent, needs dimming). Never mix them. Use Clear only when all hold: over media-rich content, a dimming layer will not hurt the content, and the content on top is bold and bright.
- [MUST] (26+) Tint only primary actions; when everything is tinted nothing stands out. Brand color goes in the content layer. Use glass's own tinting, not opaque solid fills.
- [MUST] (26+) Material goes on the control itself, not its inner views. Remove custom bar backgrounds and borders; hierarchy comes from layout and grouping.
- [MUST] (26+) Do not group a symbol with a text button (they read as one button). Primary action (Done) sits alone and tinted. Group bar items by function and frequency; secondary actions go to a "more" menu.
- [MUST] (26+) Scroll edge effects only where floating UI overlaps content, one per view, no mixing soft and hard. Soft by default, hard for pinned accessories such as column headers. In split views match heights across panes.
- [MUST] (26+) No screen-specific actions in the tab bar accessory (checkout belongs with its content). Accessory views only for persistent features such as playback. A dedicated Search tab sits at the bottom.
- [SHOULD] (26+) In steady states avoid content intersecting glass; reposition or scale content. Limit glass to top-level controls and none behind content. Keep non-interactive toolbar items (titles, status) off glass; use the prominent style for state or the key action. Remove legacy visual-effect views; do not hard-code control heights.
- [SHOULD] (26+) Concentricity: three shape types, fixed, capsule (radius = height/2), concentric (child radius = parent radius − padding). Nested containers should be concentric, with a fallback radius for components that also stand alone. Watch for corners that are too pinched or flared. Near device edges on phone use capsule plus extra margin; on iPad and Mac concentric with the window. Capsules suit touch; in dense desktop they are for standout actions. Mac mini, small and medium controls stay rounded rectangles; large and the new X-Large are capsules.
- [SHOULD] Use the same symbol for the same action everywhere. When no clear shorthand exists a text label is better (pencil vs Edit, checkmark vs Select). In menus, one symbol introduces a group of related actions and text does the rest.
- [CONSIDER] (26+) Modality: an interrupting task gets glass plus a dimming layer; a parallel task glass alone. Dragging a sheet up makes it more opaque and larger. Action sheets spring from their source. Sidebars are inset glass; use background extension for hero imagery.
- [CONSIDER] (26+) How it behaves: defined by lensing (bending and concentrating light), not scattering blur. It flexes and glows under touch, morphs between controls, menus pop open from their button. Shadows strengthen over text and weaken over light solids. Small elements (nav and tab bars) flip light/dark with the background; large ones (menus, sidebars) do not. Accessibility is built in: Reduce Transparency frostier, Increase Contrast near black or white with a border, Reduce Motion disables elastic properties.
- [CONSIDER] (26+) Typography is bolder and left-aligned in alerts and onboarding.
- [CONSIDER] WWDC26 update: Liquid Glass retuned to diffuse complex content more, darkened edge, brighter specular highlights; a user slider from ultra clear to fully tinted; Mac sidebar icons regain accent color; every macOS window uses the same tighter corner radius; a uniform toolbar appears when content scrolls under floating bars.
- [SHOULD] Menu icons (CONFLICT, newer wins): WWDC26 hides menu icons by default on macOS and iPadOS menu bars, with an API to show icons for key actions. This partly reverses the 2025 advice to populate menus with symbols. iOS context menus still use them.

Web (our translation): compute nested radii as `inner = outer − padding` with CSS custom properties. Pill buttons for touch-first and primary CTAs only; small rounded rectangles in dense desktop toolbars. Remove boxed toolbar backgrounds behind icon buttons; give the primary action its own group. `backdrop-filter: blur()` is scattering, not lensing: do not fake Liquid Glass; frosted bars for a floating nav layer only, with `prefers-reduced-transparency` (Safari support unverified) and `prefers-contrast: more` making bars opaque. Never stack translucent panels.

Slop tells (ours): glassmorphism cards in the content area; glass on glass (frosted modal over frosted bar); every button brand-tinted; glass without dimming over busy photos; gradient blobs behind glass; the same 12px radius on every nested container; pills everywhere in dense admin UI; icon and text button jammed in one group; decorative dividers and borders between bar items; a "Home" catch-all tab.

## Navigation, menus and search

Source: Explore navigation design for iOS, WWDC22 (10001); Elevate the design of your iPad app, WWDC25 (208); Modernize your UIKit app and AppKit app, WWDC26 (278, 289); Design intuitive search experiences, WWDC26 (292); Design with iOS pickers, menus and actions, WWDC20 (10205).

Checks
- [SHOULD] Tabs reflect information hierarchy; balance features across tabs (the first gets overloaded). Avoid a Home tab duplicating other tabs' functionality; duplicating content in different organizations is fine, duplicating actions is not.
- [MUST] Never force a tab change automatically. Keep the tab bar persistent while drilling in; preserve each tab's state.
- [MUST] A chevron means push. Back labels show the previous title. RTL flips push direction. Push is for hierarchy and frequently toggled flows (Messages threads).
- [SHOULD] Modal is for self-contained tasks. Modal nav bar: title, right = preferred action as a bold affirmative verb inactive until there is input, left = Cancel. [MUST] If Cancel would discard input, confirm with an action sheet; if nothing was entered, dismiss silently. Use "X" only for minimal-interaction modals with no input (in a filter sheet it is ambiguous). Limit modals over modals.
- [MUST] Resizing is non-destructive: it must not permanently alter layout.
- [SHOULD] Wrap toolbars around window controls rather than reserving a safe area. Each document gets its own window with a descriptive name.
- [SHOULD] Menu bar (iPad and Mac): populate with every relevant action ordered by frequency, not alphabetically, in sections. [MUST] Never hide menus or items by context; disable them so spatial memory works.
- [MUST] (WWDC26) iOS apps handle arbitrary scene sizes: no layout from interface orientation, use size classes and available view size, never the main screen. The prominent tab stays visible when the tab bar collapses.
- [SHOULD] (WWDC26 AppKit) View corners near a container corner follow its curve, with a minimum radius so every corner stays rounded. [MUST] Everything works from keyboard as well as mouse. Apps quit without pushback unless data would be lost and restore state as if never quit. No invisible sibling views over buttons.
- [CONSIDER] New iPad pointer tracks 1:1 with no magnetism.
- [SHOULD] Search anatomy: leading magnifier, placeholder, clear button once text is entered, Cancel when focused (iOS). [MUST] Custom icons closely resemble the symbols they replace.
- [SHOULD] Placement sets perceived scope: bottom toolbar preferred on iOS (rises over the keyboard), top toolbar when a sheet occupies the bottom; Search tab for global search (standard tab with suggestions landing, or prominent button tab opening the keyboard); inline under the title for scoped search, naming the scope in the placeholder. iPad and Mac aligned: trailing toolbar for split views and detail results, sidebar position when filtering sidebar content.
- [MUST] Recents: inline on focus or in a menu; removable individually (swipe) and all at once (Clear).
- [SHOULD] Distinguish typed input from predicted completion and limit suggestions. Start broad, then narrow (scope bars, contextual filters, tokens). [MUST] Tokens must not replace visible filter UI.
- [MUST] No-results state: search symbol, title and subtitle; [SHOULD] echo the query so typos are visible.
- [MUST] Menus hold secondary actions; keep primary and frequent actions visible. Destructive actions always need confirmation, with the confirm button in a different place from the trigger (finger travel as friction). Action sheets on iPhone, popovers on iPad. Compact date pickers allow typing the time.

Web (our translation): same rules for SPAs: no auto-switching top-level nav, persistent nav through drill-down, chevron rows navigate (not open dialogs), form dialogs use Cancel plus a verb never a lone X, confirm before discarding a dirty form. Container queries over viewport breakpoints; no layout from `screen.orientation`; show disabled menu items rather than removing them; full keyboard operability; persist UI state across reloads. `<search>` and `type="search"`, recents with per-item remove, `<mark>` or weight for the predicted part, echo the query in the empty state. Confirm destructive actions in a dialog whose confirm button is not under the click point. Prefer native `<input type="date|time">`.

Slop tells (ours): dashboard "Home" duplicating every feature as cards; X-only filter sheet with no Apply; chevron that opens a modal; tab bar vanishing on detail pages; menus whose items appear and disappear by context; layout permanently reordered after resize; desktop web app with no keyboard paths; search icon expanding to a field with no clear button; blank result list; ten or more suggestions pushing results below the fold; search hidden behind a Filters drawer.

## Brand, widgets, AI and platform surfaces

Source: Communicate your brand identity on iOS, WWDC26 (251); Design great widgets, WWDC20 (10103); Design App Intents for system experiences, WWDC24 (10176); Design interactive snippets, WWDC25 (281); Create UI prototypes using agents in Xcode, WWDC26 (227); Principles of spatial design, WWDC23 (10072, transfer only); Principles of great design, WWDC26 (250).

Checks
- [SHOULD] Do not copy a web or Android brand system verbatim. UI layer (tab bars, toolbars) stays native; the content layer is the best place for brand. Spend custom-component effort where it has most impact; utilitarian custom components can look less native or dated.
- [SHOULD] Move brand color out of solid bars and into scroll content so it scrolls away. Use color for meaning (hierarchy, grouping, interaction, status); tint primary actions, badges, selection; show restraint. [MUST] Support Dark Mode with a refined low-light palette.
- [MUST] Custom fonts support Dynamic Type and layouts wrap instead of truncating at large sizes. Custom display fonts belong in memorable moments. SF supports 150+ languages; system-only type can still be distinctive via widths and Rounded.
- [SHOULD] Keep logos out of chrome; show only on Home and fade on scroll. Custom icons are fine if recognizable, consistent and legible small, and keep platform metaphors; otherwise SF Symbols.
- [CONSIDER] Full-bleed media with purpose; voice and tone are brand too; zoom transitions connect target to destination; dropped frames hurt perception.
- [MUST] Responsibility: no permission prompts at launch before value is clear; ask at the right moment, only for what is needed, say what it is for. Ask how the feature could be misused and who would be harmed. AI: anticipate wrong output, add previews, confirmations and disclaimers, or remove the feature if the risk outweighs its value.
- [MUST] Familiarity: do not repurpose the trash icon or restyle delete. Things that look the same behave the same.
- [SHOULD] Agency and forgiveness: undo for everything, confirmation before destructive actions, interrupt only when someone is about to make a big mistake. Simplicity through order, spacing and contrast so the most important item is the most obvious; sometimes simple means adding context (scrubber with elapsed and remaining time). Craft shows in tap-then-wait buttons, jittery scrolling, misaligned icons, layouts that break on rotation. Delight: name the target emotion and reinforce it.
- [SHOULD] Widgets: glanceable, one most important item, adapt over time; at most four pieces of information in the small size; do not scale a small widget up to make a large one; 16 pt layout margins; corners concentric with the widget radius; SF variants, light and dark, placeholder (redacted) state; logo only for aggregators, top-right.
- [MUST] Widgets: no app icon, wordmark or app name inside; no instructional text; no "last updated" language; taps deep-link to the content shown.
- [SHOULD] App Intents: anything the app does is an intent; one flexible intent with a parameter instead of near-duplicates. [MUST] No intents for UI gestures ("tap cancel"); model the task. Parameter summaries read as a sentence for every value.
- [SHOULD] Interactive snippets: larger type for the key fact; avoid content taller than 340 pt (no scrolling); check contrast beyond standard ratios because snippets are viewed from a distance; convey purpose without relying on dialog.
- [SHOULD] Prototyping with agents: ask for multiple named variations, plausible domain sample content (no lorem ipsum), blank-slate and account states, tunable-parameter panels for feel.
- [CONSIDER] Spatial transfer: keep windows smaller so they do not block the view; important content central; consistent lighting (emitters tint surroundings, others cast shadows); fade content during large repositioning and back once settled; always a clear way in and out of immersive modes.

Web (our translation): for a web app on iOS keep navigation conventional and let brand show in content and illustration; avoid a full-width colored app bar (or let it scroll away); logo only on the landing view. Permission prompts (notifications, location) only after a user gesture with context; Web Push on iOS requires direct user interaction anyway. Dashboard tiles: one primary datum, at most four facts, uniform padding, no "Last updated 3m ago" unless freshness is the point. Fullscreen takeovers need an obvious exit; large layout jumps crossfade.

Slop tells (ours): brand-colored header bar on every page; logo in every toolbar; custom dropdown or date picker that looks like 2015 Bootstrap; brand color on every icon; no dark theme; confetti on signup; notification prompt on first load; minimal UI hiding everything in a ⋯ menu; AI output with no preview or undo; AI as a sparkle button with no provenance; generated content written straight into user data; onboarding carousels gating the product; agents producing one lorem-filled happy-path screen.

## Writing and the Apple Style Guide

Source: Writing for interfaces, WWDC22 (10037); Add personality through UX writing, WWDC24 (10140); Make a big impact with small writing changes, WWDC25 (404); Craft clear names for features and labels, WWDC26 (290); Apple Style Guide (all 52 pages).

Merged copy rules live in references/writing.md; this section keeps the Apple-source rules only.

Checks
- [SHOULD] PACE: Purpose (headers and buttons stand alone; say why a feature exists), Anticipation (likely choice first; exclamation points sparingly), Context (instructions where the eyes are; ask permissions at the relevant moment and explain), Empathy (plain language, no idioms, room for localization, VoiceOver labels describe intent). Read your writing aloud.
- [MUST] Alert buttons name the specific action, never Yes/No, and read correctly from labels alone ("Cancel Subscription" / "Keep Subscription"). Alert title as a question naming the object ("Remove iPhone?"). Destructive red; Cancel dismisses without acting.
- [MUST] No "Oops!", no error codes, no "Sorry, bad input". A good error names the problem, gives the fix as the primary button ("Add Payment Method") and offers "Not Now."
- [SHOULD] Empty states educate or celebrate and say how content will appear; avoid idioms.
- [SHOULD] Voice is constant, tone changes. Rank qualities per moment (clarity can outrank simplicity; dial friendliness back when someone is blocked). Never trade usefulness for voice.
- [MUST] Remove filler: adverbs and adjectives, interjections ("Uh oh"), pleasantries ("We're sorry"), minimizing phrases ("10 short minutes!"). Keep a descriptor only when it carries meaning. "Test Your Hearing," not "Take a quick and simple hearing test."
- [MUST] No repetition ("Delivery delayed 10 minutes").
- [SHOULD] Lead with the why. Keep a word list (use/avoid/definition); same button name for the same action.
- [SHOULD] Naming: Belongs, Sets expectations, Works everywhere. In financial and trust contexts clarity beats brand ("Balance"). Avoid names that pass judgment at edge values; run the out-loud test. Name for what it does for the person ("Enhance Dialogue", not "Vocal Isolation"); verb for things you do.
- [MUST] Style Guide verbs: choose for menu items, select for objects, checkboxes and radio buttons; tap not "tap on"; click not "click on"; touch and hold not "tap and hold" or "long press" (fine in developer docs); press for physical keys, never "hit".
- [MUST] Checkboxes: select/deselect, "selected/unselected", not "checked/unchecked". Switches: describe the action ("Tap to turn on Location Services"); do not "slide"; toggle is developer-only, users turn on/off. Turn on, not enable, for immediate start. Dimmed, not "grayed/hollow". Enter for input, type for keystrokes.
- [SHOULD] Avoid "please" in instructions; no "we" (first person), address the reader as "you" not "users". Contractions are fine. Exclamation points occasionally in promotional text, avoided in documentation.
- [SHOULD] Terms: error message developer-only (users see an alert or message); dialog not "dialog box"; help tag not "tooltip"; pointer not "cursor"; "hold the pointer over" not "hover over"; log in (Mac account) vs sign in; OK not "okay"; "turn on Dark Mode", "light appearance" not "Light Mode".
- [SHOULD] Avoid e.g., etc., via (except when tight), and/or, abort, kill, hang, master/slave, whitelist/blacklist, sanity check. Use the single ellipsis character (…). Reproduce UI element names exactly; numerals for counts and units, spell out one through nine in prose.
- [SHOULD] Inclusive writing: no idioms; do not use color to convey good or bad; avoid violent or ableist terms; do not call nondisabled people "normal/healthy" or frame people as brave/inspiring. Ask about identity-first vs person-first.
- [CONSIDER] "we/our" CONFLICT: the Style Guide and newer writing guidance say avoid "we"; the spec resolves toward writing.md.

Web (our translation): identical rules for web copy; "click" for pointer and "tap" for touch, or neutral verbs (Select, Choose, Open) when input type is unknown. Make them lint rules.

Slop tells (ours): "Oops! Something went wrong." "Simply/easily/seamlessly/effortlessly." "Unlock the power of…" Yes/No or OK/Cancel on consequential dialogs; jargon or brand-pun feature names ("SmartSync Pro™"); "Welcome back! 👋"; exclamation points in errors; empty states saying only "No data."; "Click here"; "Please note…"; "We've got you covered"; "Toggle dark mode"; "Enable notifications" on a button that acts immediately; "Hover over"; "e.g." in UI strings.

## Accessibility and inclusion

Source: Accessibility Nutrition Labels criteria (App Store Connect Help) and WWDC25 (224); The practice of inclusive design, WWDC21 (10275); Principles of inclusive app design, WWDC25 (316); Refine accessibility for custom controls, WWDC26 (220); Design for Arabic, WWDC22 (10034).

Intent: concrete pass/fail criteria. Labels show on product pages on OS 26+, are voluntary for now, and are expected to become required for new apps and updates. App Review can challenge misleading labels (Guideline 2.3).

Scope rule
- [MUST] A feature counts as supported only if all common tasks can be completed with it, on each device. Common tasks = primary functionality plus first launch/onboarding, login, purchase and settings. Evaluate VoiceOver first; the work carries over to Voice Control and others.

Accessibility Nutrition Label checklist (pass/fail)
- [MUST] Sufficient Contrast: 4.5:1 for most text by default. If defaults fail, Increase Contrast must fix it (Apple frameworks) or offer multiple compliant schemes (custom UI). 3:1 for non-text and state contrast (checked vs unchecked). Test light and dark; gray-on-black dark modes fail low-vision users. Account for translucency and blur. Test with Bold Text, Increase Contrast and Reduce Transparency on, plus Increase Contrast on with Reduce Transparency off.
- [MUST] Larger Text: text enlarges to at least 200% (on iOS AX3 passes 200% and AX5 puts body text above 300%; Apple Watch's largest size is above 140%). No overlap, no severe truncation. Wrap instead of truncating; if a list truncates, the full text is reachable elsewhere. Prioritize scaling main content over repeated navigation (Back and Edit stay small). Reflow side-by-side elements to a vertical stack. Elements that cannot grow (tab bars) use the Large Content Viewer. Zoom or Hover Text do not count. Test RTL and tall-ascender or diacritic scripts. Text fields grow. (One person in the session needs 310%.)
- [MUST] Dark Interface: dark by default or via setting for all common tasks, and it stays dark; even temporary flashes of bright content fail. Smart Invert is a last resort; red Delete must not invert to green; do not invert media.
- [MUST] Differentiate Without Color Alone: test in Grayscale. Use shape, placement, order, icons or text. Order chart colors as the legend or label series directly. A setting toggle is a last resort. Color blindness affects up to 10% in some populations (about 5% in the 2021 session).
- [MUST] Reduced Motion: when on, disable or replace depth simulation (parallax, animated blur, depth of field), multi-axis or multi-speed motion, spinning and vortex effects. Stop auto-advancing carousels and ongoing motion or give a control. [SHOULD] Keep meaningful animation, replaced by a dissolve, highlight fade or color shift.
- [MUST] VoiceOver: everything tappable is reachable and operable. Labels concise ("New Message", not "Press to compose…") and meaningful out of context (no "Learn more"; identify which cart item "Delete" removes). No control types or states in labels (use traits). Decorative images hidden. Charts get a chart API or text alternative. All text speakable, including custom keyboards and PIN pads. Banners and alerts announced non-disruptively. Logical order, no skips or loops. Groups expose custom actions.
- [MUST] Voice Control: Show numbers and Show names reveal every interactive element. Voice labels match visible text. Hidden UI (hover or swipe) needs a speech path (custom actions or context menu). Scrolling, panning and zooming work. Dictation and editing work in every field. [SHOULD] Let people extend or cancel auto-hide timers.
- [CONSIDER] Captions and Audio Descriptions: claim only if you have media; captions toggleable, AD findable (AD badge).

More checks
- [SHOULD] Custom controls need assistive-tech parity; passthrough gestures start at the current value. Give feedback during adjustment but announce only when the value changed and at least 0.3 s have passed.
- [SHOULD] Inclusive practice: support multiple senses, provide customization, track inclusion debt. [MUST] Adopt accessibility APIs. About 1 in 7 people have a disability; think in five spectra (vision, hearing, motor, speech, cognitive); disability lives in the gap between ability and what the environment assumes.
- [MUST] Gender-neutral copy ("they"); do not assume family roles. Name fields accept hyphens, accents, very short and very long names; ask for preferred name; no gender field unless needed. Avoid ableist idioms. Bold Text also thickens non-text glyphs. Check VoiceOver order.
- [MUST] RTL: titles, buttons and nav bar positions flip; paragraphs right-align; carousels, swipeables and page dots flow right to left; toggles and segmented controls mirror. Do not flip content with real-world direction. Arabic letters connect, so use 0 tracking unless the typeface is optimized. Add vertical space for vocalization marks. Support Western and Arabic-Indic numerals per locale.

Web (our translation): 4.5:1 and 3:1 match WCAG 1.4.3 and 1.4.11; 200% text matches 1.4.4 (test browser text-only zoom and iOS Safari per-site text size). Dark Interface means `color-scheme` on `:root` (no white flash before CSS loads), dark iframes and embeds. Reduced Motion: `@media (prefers-reduced-motion: reduce)` swapping parallax and scale for opacity. Voice Control label rule is WCAG 2.5.3 Label in Name. Use the common-tasks scope as a default web audit scope. Custom sliders: `role="slider"`, `aria-valuenow/min/max`, `aria-valuetext`, arrow keys (VoiceOver on iOS maps swipe up/down to arrow keys, per WWDC22 10153); throttle `aria-live`. Name inputs without restrictive regex; honor `prefers-reduced-motion`, `prefers-contrast` and `forced-colors`. RTL: logical properties (`margin-inline-start`), `dir="rtl"`, mirror directional icons only, `letter-spacing: 0` for `:lang(ar)`, more `line-height` for Arabic, `Intl.NumberFormat`.

Slop tells (ours): gray-500 on near-black body text; status chips differing only by hue; auto-playing hero carousels with no pause; parallax heroes ignoring reduced motion; white flash between dark pages; icon-only buttons with no accessible name; `aria-label="button"`; "Learn more" six times on a page; required First/Last name with `[A-Za-z]` validation; gendered avatar defaults; status by red or green dot only; global `letter-spacing` breaking Arabic joins; physical left/right CSS; unmirrored back chevrons.

## App Review design rules

Source: App Store Review Guidelines, section 4 and nearby (last updated 2026-10-16).

Pass/fail list (App Review enforces these, so they are MUST and Blocker candidates)
- [MUST] 4 Design: products should be simple, refined, innovative, easy to use; this sets minimum standards. A degraded experience may be removed.
- [MUST] 4.1 Copycats: do not copy a popular app or make minor changes to another app's name or UI.
- [MUST] 4.2 Minimum Functionality: features, content and UI that elevate beyond a repackaged website; useful, unique or app-like. 4.2.2: not primarily marketing, ads, web clippings, aggregators or link collections. 4.2.3(ii): disclose the size of any first-launch download and prompt before downloading.
- [MUST] 4.2.6 template apps: apps from commercial templates or app-generation services are rejected unless the content provider submits them. This anchors the slop scan in something Apple enforces.
- [MUST] 4.3 Spam: not indistinguishable from what is widely available. Saturated categories (flashlight, wallpaper, simple timers) need a meaningfully different or improved experience.
- [MUST] 2.5.9: do not alter or disable standard switches or native UI behaviors (for example blocking links out).
- [MUST] 4.5.4: push is not required for function; marketing pushes need opt-in plus an in-app opt-out.
- [MUST] 5.1.1: non-account features usable without login; if accounts can be created, in-app account deletion is required; purpose strings clearly describe data use; paid functionality cannot depend on granting data access.
- [SHOULD] 2.3.7: app names limited to 30 characters. 2.4.1: iPhone apps should run on iPad whenever possible.

Web (our translation): for PWAs and web wrappers 4.2 is the bar; a WKWebView wrapper of a website gets rejected. A repackaged-website smell (web-style nav, no native gestures, hamburger, no pull-to-refresh) is a store risk as well as a UX issue.

Slop tells (ours): template-generated apps with an interchangeable brand skin (4.2.6 and 4.3 risk); login wall before any value; no account-deletion path.

## Apple Design Awards criteria

Source: Apple Design Awards, 2026 winners page.

Category definitions
- [CONSIDER] Delight and Fun: memorable, engaging, satisfying experiences enhanced by Apple technologies.
- [CONSIDER] Inclusivity: a great experience for all, reflecting a variety of backgrounds, abilities and languages.
- [CONSIDER] Innovation: state-of-the-art through novel use of Apple technologies that sets the app apart in its genre.
- [CONSIDER] Interaction: intuitive interfaces and effortless controls tailored to the platform.
- [CONSIDER] Social Impact: improving lives meaningfully and shining a light on crucial issues.
- [CONSIDER] Visuals and Graphics: stunning imagery, skillfully drawn interfaces, high-quality animation with a distinctive and cohesive theme.

What the 2026 citations praise (positive exemplars)
- grug: no login, no cloud syncing, nothing extraneous; hand-drawn status bar; clever simplicity.
- Guitar Wiz: VoiceOver guidance down to finger placement, plus Dynamic Type, Increase Contrast and Differentiate Without Color.
- Pine Hearts: inclusivity options shown even before play begins.
- Sago Mini: interactions requiring no reading; no timer, no to-do lists.
- Moonlitt: best-in-class Liquid Glass integration and easy onboarding.
- Tide Guide: a palette designed to match the sky through the day; crisp full-screen charts; widgets.
- (Not Boring) Camera: big, bold design; the secret is to make sure the products excel in all other areas too.
- Grand Mountain Adventure 2: gestures smooth, quick to pick up, immediately responsive.

Check
- [CONSIDER] Score against the six lenses. Recurring pattern: distinctive theme + platform-native interaction + accessibility done fully. Expressiveness is rewarded only when the basics are flawless. Spec note: the skill's top-level structure uses the eight principles; the six lenses are an optional excellence lens.

Slop tells (ours): "distinctive" as decoration without a cohesive theme; bold visuals over broken basics.

## Web (WebKit)

Source: WebKit blog posts (Designing Websites for iPhone X, 2017; Dark Mode Support in WebKit, 2019; Using the System Font in Web Content, 2015; Web Push for Web Apps on iOS and iPadOS, 2023); WWDC21 Design for Safari 15 (10029); WWDC26 What's new in WebKit for Safari 27 (204), Rediscover the HTML select element (315), Learn CSS Grid Lanes (314); WWDC22 What's new in web accessibility (10153). The iOS 26 Home Screen change comes from secondary coverage quoting WebKit; the post itself was not fetched.

All lines here are our translation of Apple guidance to the web, with WebKit as the source of the mechanisms.

- [MUST] Web: with `viewport-fit=cover`, use `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">` and pad important content with `env(safe-area-inset-*)`. Insets are not a replacement for margins: `padding-left: max(12px, env(safe-area-inset-left))`. Inset areas fill with the body or html background-color, so set it deliberately. Bottom-fixed UI clears `env(safe-area-inset-bottom)` (the value changes as Safari's bar minimizes).
- [SHOULD] Web: do not size app shells with `100vh`; use `dvh` or `svh` (our inference from the Safari 15 `vh` problem).
- [MUST] Web: WebKit never auto-darkens. Opt in with `:root { color-scheme: light dark; }` (or `<meta name="color-scheme">`) so controls, scrollbars and defaults adapt; then `@media (prefers-color-scheme: dark)` with CSS variables, `<picture><source media="(prefers-color-scheme: dark)">` for imagery, SVG icons on `currentColor`, no broad `filter: invert()` over sections. Do not hard-code system default colors; they change under high contrast.
- [SHOULD] Web: `<meta name="theme-color" content="…" media="(prefers-color-scheme: light|dark)">`. Safari blends its tab bar into the page; tab bar color, favicon and page title are parts of a site to design intentionally. Watch for top horizontal banners breaking the color flow.
- [SHOULD] Web: `font-family: system-ui` plus `ui-rounded`, `ui-serif`, `ui-monospace`. `font: -apple-system-body | -headline | -subheadline | -caption1 | -caption2 | -footnote | -short-* | -tall-body` sets size, weight and family as a text style following the iOS text-size setting. The pattern `html { font: -apple-system-body } body { font-family: <brand>, system-ui }` with rem sizing honors Dynamic Type (unverified, community pattern; the keyword list is verified). Safari also offers per-site text size, which the Larger Text criterion names.
- [SHOULD] Web: Home Screen web apps: a manifest with `display: standalone|fullscreen` gives its own App Switcher entry. Icons from the manifest or `apple-touch-icon` (takes precedence); without one iOS 16.4+ generates a monogram. Web Push permission must be requested in response to direct user interaction. Badging API supported. Since iOS/iPadOS 26 every Home Screen site opens as a web app by default (user can turn off "Open as Web App"), so every site must look right with no browser chrome: a visible back affordance, safe-area handling and a theme color. Run a lightweight standalone check always.
- [SHOULD] Web: native controls first. Safari 27 adds customizable `<select>` (`appearance: base-select` on the select and `::picker(select)`, plus `::picker-icon`, `::checkmark`, rich `<option>` via `<button>`/`<selectedcontent>`), keeping native accessibility with fallback to the native picker. Do not build div-based dropdowns. Safari 15 added a native `<input type="color">` with eyedropper on iOS.
- [CONSIDER] Web: CSS Grid Lanes (Safari 26.4), native masonry via `display: grid-lanes`; check tab order with Web Inspector order numbers and tune `flow-tolerance`.
- [SHOULD] Web: content that is mostly text belongs in HTML as text, not images (Live Text on images is no excuse).
- [SHOULD] Web: custom controls: `role="slider"`, `tabindex="0"`, `aria-valuemin/max/now/valuetext`.
- [CONSIDER] Web: legacy meta tags `apple-mobile-web-app-capable` and `apple-mobile-web-app-status-bar-style` (default | black | black-translucent) still exist (unverified; the manifest is the primary path).

Web summary checklist: color-scheme declared; dark palette via variables; theme-color for light and dark; viewport-fit plus `max(pad, env())` on fixed bars; `dvh` not `vh`; system-ui or a deliberate brand font that scales with user text size; native select, date and color controls; manifest plus apple-touch-icon; standalone mode with its own back navigation; reduced-motion, reduced-transparency and contrast media queries.

Slop tells (ours): fixed bottom CTA hidden behind the home indicator; white flash on load in dark mode; `height: 100vh` hero clipped by Safari's toolbar; div-soup custom select; generic Inter-on-white with no `theme-color`; standalone mode with no back button.

## Source gaps

- iPhone Duo: the HIG has an official iPhone Duo page, covered in the platforms file. The source's doubt applied only to a WWDC26 session titled "Design for iPhone Duo", which is absent from the official 138-video WWDC26 list; treat that session as nonexistent.
- No first-party sessions under the exact titles "Designing for Intelligence", "Create accessible UX" or "Make your UI look great with Liquid Glass"; the nearest sessions were digested instead (WWDC26 250, WWDC24 10176, WWDC25 281/224/316, WWDC26 220; WWDC25 323/284/310).
- "Designing for macOS" (Big Sur era) not located; WWDC20 10104 used.
- Spring conversion equations appear only on slides; the formulas above are from memory (unverified).
- Apple Design Resources tracking tables (per-size numbers) were not fetched; the typography reference may carry them.
- WebKit's Safari 26 Home Screen post and the archived Safari Web Content Guide were not fetched; legacy meta-tag details are from memory (unverified).
- Fetched but not digested: WWDC25 248, 220, 361, 255/303; WWDC24 10086/10096, 10112, 10098, 10151; WWDC26 234, 321/322, 8012, 382.
