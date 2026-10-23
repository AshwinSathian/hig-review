# 08 — Beyond the HIG: Apple's other first-party design literature

Compiled 2026-10-23. Scope: WWDC design sessions (2017–2026), App Store Connect Accessibility Nutrition Label criteria, App Review Guidelines §4 (and nearby rules), Apple Design Awards 2026 category criteria, Apple Style Guide, and WebKit/Safari guidance for web.

**Provenance.** Unless marked otherwise, everything below was read from first-party text fetched today:
- WWDC: the full transcripts embedded in `developer.apple.com/videos/play/wwdcYYYY/ID/` (server-rendered `<section id="transcript-content">`). 75+ transcripts pulled; the ones digested are listed per section.
- App Store Connect Help pages (`developer.apple.com/help/app-store-connect/manage-app-accessibility/*`), App Review Guidelines (page says "Last Updated: October 16, 2026"), ADA page (`developer.apple.com/design/awards/`, 2026 winners), Apple Style Guide (`support.apple.com/guide/applestyleguide/*`, all 52 pages), WebKit blog posts.
- Anything recalled rather than read is tagged **(unverified, from memory)**.

Tag legend: **[MUST]** = Apple says "always/never/must", or it's a pass/fail criterion. **[SHOULD]** = Apple recommends it. **[CONSIDER]** = context-dependent advice, or a pattern Apple holds up as good. "Web translation" and "Slop tells" sections are our inference, not Apple's words.

---

## Cross-cutting takeaways (read this first)

1. **Apple's 2026 principle set** (WWDC26 "Principles of great design"): Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight. Two lines in it work as anti-slop rules: *"simple doesn't mean minimal"*, and *delight "isn't by adding confetti or tacking on extra flourishes at the end."* The HIG also has a new "design principles" page; this session is the long-form version of it.
2. **Motion is behavior, not timelines.** Interruptible, velocity-preserving springs; gesture-to-animation velocity handoff; momentum projection to choose endpoints; bounce 0 by default, bounce only when the gesture carried momentum. (WWDC18 Fluid, WWDC23 Springs, WWDC24 transitions.)
3. **Brand lives in the content layer, never in the navigation layer.** Liquid Glass splits UI into a floating control/navigation layer and a content layer. Apple says outright: move color into the content and scroll view, keep bars native, don't put logos in chrome, tint only the primary action. (WWDC25 Liquid Glass and design system, WWDC26 brand identity.)
4. **Writing is design.** PACE (Purpose, Anticipation, Context, Empathy); cut filler adverbs, interjections and pleasantries; lead with the why; keep a word list; button labels name the action (never Yes/No); name features by what they do for the person, not by the technology. (WWDC22/24/25/26 writing sessions, Apple Style Guide.)
5. **Accessibility has pass/fail criteria now.** The Accessibility Nutrition Labels define per-feature evaluation criteria over "common tasks", which must include onboarding, login, purchase and settings. Text has to reach 200%. Contrast is 4.5:1 for text and 3:1 for non-text state. The Dark Interface criterion explicitly fails "temporary flashes of bright content." These map directly onto review checks.
6. **Web has first-party hooks:** `color-scheme`, `prefers-color-scheme`, `theme-color` with media queries, `viewport-fit=cover` plus `env(safe-area-inset-*)` combined via `max()`, `system-ui`/`ui-rounded`/`ui-serif`/`ui-monospace`, `font: -apple-system-body` (Dynamic Type), and customizable `<select>` (`appearance: base-select`, Safari 27). Since iOS 26, every site added to the Home Screen opens as a web app by default.

---

## Essential Design Principles (https://developer.apple.com/videos/play/wwdc2017/802/, 2017) — fetched transcript

**Why it matters:** Apple's canonical "why" behind the HIG. Each principle comes with a review question you can apply to every screen, which makes it the best source for structured critique.

**Key principles/checks**
- **Wayfinding.** [MUST] Every screen answers: *Where am I? Where can I go? What will I find there? What's nearby? How do I get out?* Apple's own phrasing: "every screen in your app should answer all of these questions, or else people will feel lost." The nav bar title and selected tab say where you are; the tab bar and content say where you can go; the back button is the exit.
- **Feedback** comes in four kinds: status, completion, warning, error. [MUST] "Every action taken in your app should provide some form of confirmation feedback." [SHOULD] Prevent errors before they happen with inline validation, and infer intent instead of erroring (Things 3 corrects June 31 to July 1). Feedback answers *What can I do? What just happened? What is happening? What will happen?*
- **Critique technique** [CONSIDER]: watch a new user, explain the app to them out loud, then compare what you said with what the UI communicates. "When someone needs to explain their design to me, it is usually so much more clear than the design itself."
- **Visibility.** [SHOULD] Surface key status at higher levels (Mail badges). Hiding Clock's navigation in a hamburger menu is given as the anti-example. Weigh this against density.
- **Consistency.** [SHOULD] Match *platform* conventions over your cross-platform brand. The iOS share glyph (the "sharrow") beats a web or Android share icon in an iOS app. Internal consistency: "a limited number of font faces and sizes and colors."
- **Mental models.** [MUST] Don't make something that looks conventional behave unconventionally (the "Morty faucet"). Labels are "remedies to a deeper issue." Redesigns of long-lived apps need to be "100 percent positive" wins.
- **Proximity and grouping.** Controls sit near the thing they affect, and related controls cluster together. An odd one out (the shade switch among light switches) gets separated.
- **Mapping.** A control's shape and arrangement mirror its effect: horizontal slider for a horizontal property, dial for rotation, direct manipulation best of all. "You will often find labels when mapping is unclear. It is a telltale sign."
- **Affordance.** Minimal cues are enough (rounded corners, a subtle knob shadow). Animation can teach affordance; Weather nudges up to hint that it scrolls.
- **Progressive disclosure with 80/20.** Hide the less-used 80% (the Print dialog pattern), but beware of burying things.
- **Symmetry.** Reflectional symmetry for balance (Weather, Camera, Clock); translational symmetry, meaning even repetition, for order.
- [SHOULD] Balance the principles: "Too much feedback is annoying. Too much visibility is distracting. Too much progressive disclosure can make work flows inefficient."

**Web translation:** The wayfinding questions apply per route: page title, active nav state, breadcrumbs or back, visible exits. The "sharrow" rule becomes: on Apple devices, use the platform share affordance (`navigator.share`) rather than a custom share-network menu.

**Slop tells:** A hamburger menu hiding 3–5 top-level destinations. Toasts on some actions and nothing on others. Clever custom icons for standard actions. Every list item given equal weight, so nothing is grouped. Three or more font sizes or colors per screen for no reason.

---

## Designing Fluid Interfaces (https://developer.apple.com/videos/play/wwdc2018/803/, 2018) — fetched transcript

**Why it matters:** The deepest first-party source on interaction feel. It explains why gestural UIs "feel off" even at 60fps.

**Key principles/checks**
- **Response.** [MUST] No perceptible latency on *any* interaction, including taps and presses as well as swipes. "Look for delays everywhere." Watch for timers that creep in.
- **Redirection and interruption.** [MUST] Every gesture or animation can be interrupted or reversed mid-flight. Thought and gesture should run in parallel. Detect a pause from the acceleration spike, never a dwell timer.
- **Spatial consistency.** [MUST] Things leave and return along symmetric paths. Push from the right, pop to the right. Anti-example: slide in from the right, then dismiss downward.
- **Hint in the direction of the gesture.** [SHOULD] Intermediate states grow toward the final state (Control Center modules expand toward the finger).
- **Lightweight input, amplified output.** [SHOULD] Short flicks carry momentum: scrolling, swipe to go home.
- **Rubber-banding at boundaries.** [MUST] Indicate edges softly and keep tracking past them; a hard stop is indistinguishable from a frozen device. Handoffs between tracked objects (dock to app) use smooth curves.
- **Smooth frames.** It's what's in the frames that matters, not just the frame rate. Large position deltas between frames strobe. Mitigations: higher frame rate, motion blur, motion stretching (the app-launch icon stretch).
- **Behavior over animation.** Give heavier objects more mass (apps) and lighter ones less (photos).
- **Springs, design-friendly parameters:** *damping* (100% = no overshoot, 0% = oscillates forever) and *response* (speed). "We actually like to avoid using duration." [SHOULD] **Start at 100% damping.** Add overshoot only "if the gesture that's driving the motion itself has momentum." Example: tapping Now Playing open uses 100% damping; swipe-dismissing it uses **80% damping**.
- **Bounce as a functional hint**: the flashlight button bounces on tap to teach "press harder."
- **Stay in character.** Treat behaviors as a family, so scrolling and scroll-to-top feel like the same object.
- **Momentum projection.** [MUST for thrown or flicked objects] Choose the endpoint from the projected position (velocity combined with `UIScrollView.DecelerationRate`), not the nearest position. This applies to position, scale and rotation.
- **Taps.** [MUST] Highlight immediately on touch-down; confirm on touch-up; add an extra hit margin; dragging off cancels; dragging back re-arms.
- **Swipes.** Hysteresis is **"usually 10 points in iOS"** before a swipe begins. Keep the touch's relative offset (never snap content to its center under the finger). Use touch *history* for release velocity. [MUST] One-to-one tracking while dragging.
- [MUST] Continuous feedback during the gesture. Avoid end-only recognizers such as `UISwipeGestureRecognizer`.
- [SHOULD] Detect competing gestures in parallel from touch-down and cancel the losers once intent is clear. Double-tap delays single taps by about **0.5 s**, so avoid it where you can.
- **Teaching gestures**: visual cues (clipped content at a scroll edge, page dots, grabbers, elevated knobs), a discrete animation that mirrors the gesture (Safari's close-tab slides left), and explanation only for gestures reused widely.
- [SHOULD] Design interaction together with the visuals. "The interactive demo we think is really worth a million static designs."

**Web translation:** Use Pointer Events with `setPointerCapture`. Track velocity from the last ~100 ms of samples. Drive drags 1:1 with `transform` and never with CSS transitions. On release, hand off to a spring (Motion/Framer Motion, or a hand-rolled spring) seeded with the release velocity. Use `overscroll-behavior` and rubber-band on custom scrollers. Interrupt in-flight animations by retargeting from the current value; never wait for `transitionend` before accepting input. Give buttons an `:active` state on pointerdown, and cancel on `pointerleave` while pressed.

**Slop tells:** Tweened ease-in-out animations that can't be interrupted. Drag-to-dismiss sheets that jump when released. Carousels that snap to the nearest card regardless of flick velocity. Bouncy springs on taps. Hover-only feedback with no pressed state. Sheets that enter from the bottom but exit by fading.

---

## Animate with springs (https://developer.apple.com/videos/play/wwdc2023/10158/, 2023) — fetched transcript

**Why it matters:** It updates the 2018 vocabulary to **duration + bounce**, which Apple now uses "universally across Apple's design and engineering," and it gives numeric bounce guidance.

**Key principles/checks**
- [MUST] Animations keep **position *and* velocity continuous**. Linear motion has velocity jumps at start and end; keep it for things like repeating spinners. Ease-in-out can't take an initial velocity, so a knob "jerks to a halt" when a gesture hands off to it. "Springs are the only type of animation that maintains continuity both for static cases and cases with an initial velocity."
- [MUST] On retarget mid-flight, carry the current velocity into the new spring.
- Different properties may settle at different times; that's desirable. App launch layers multiple springs with staggered starts and ends.
- Bounce > 0 is bouncy (underdamped). Bounce 0 is smooth (critically damped). Bounce < 0 is flattened (overdamped, useful for decaying velocity such as scrolling). The range is −1.0 to 1.0.
- **Tuning order:** [SHOULD] pick the duration (pacing) first, then the bounce.
- **Numbers:** bounce **0** = "smooth, gradual" and the default. **~0.15** = "doesn't feel very bouncy yet… a little more brisk." **~0.30** = "noticeable bounciness." [SHOULD] "Be cautious about using values higher than around **0.4**."
- [SHOULD] Use bounce when it's meant to feel physical, as at the end of a gesture. Stay consistent with the app's character (serious or playful, relaxed or fast-paced).
- Duration is *perceptual*. Settling duration is unpredictable, so don't gate user-facing changes on settle; use the completion handler that fires at the perceptual duration.
- Conversion (Apple shows "three equations" on a slide; the transcript doesn't speak them): mass = 1; stiffness = (2π / duration)²; damping = 4π(1 − bounce) / duration for bounce ≥ 0 **(unverified, from memory)**.

**Web translation:** CSS has no true springs. `linear()` easing can *approximate* the curve of a non-interrupted spring, but it can't carry an initial velocity or retarget mid-flight. For gesture-driven or interruptible motion, use a JS spring (Motion's `type: "spring", bounce, visualDuration` matches Apple's model) or the Web Animations API retargeted from the computed current value. Default to bounce 0 and cap at about 0.3.

**Slop tells:** `transition: all 0.3s ease` everywhere. `cubic-bezier` "back" overshoot on every modal. Uniform 300 ms on every property. Bounce on content-heavy panels. Staggered entrance animations on every list load.

---

## Enhance your UI animations and transitions (https://developer.apple.com/videos/play/wwdc2024/10145/, 2024) — fetched transcript (skimmed)

**Key checks:** The zoom transition ties the source element to the destination, and it's interactive and interruptible. [MUST] Interrupting a push mid-flight converts it into a pop ("the system never cancels an interrupted push"), so the lifecycle stays consistent. [SHOULD] Use SwiftUI.Animation for UIKit/AppKit views "where maintaining continuous velocity is important." The zoom closure needs a *stable identifier* because cells get reused.

**Web translation:** View Transitions API with a shared `view-transition-name` per item, using stable IDs rather than indexes. Make back navigation during a transition reverse it rather than snapping.

**Slop tells:** A detail page that fades in with no spatial link to the tapped card.

---

## Meet Liquid Glass (https://developer.apple.com/videos/play/wwdc2025/219/, 2025) — fetched transcript

**Why it matters:** The rules for using (and *not* using) the 2025+ material across every Apple platform. Liquid Glass is also the most misused aesthetic in AI-generated "Apple-like" UI.

**Key principles/checks**
- The material is defined by **lensing** (bending and concentrating light), not scattering blur. Objects materialize by modulating lensing rather than fading.
- Visuals and motion were designed together. On touch it flexes and "energizes with light," glowing from under the fingertip and spreading to nearby glass. Controls can lift into glass only while being touched, which keeps the resting state "visually quiet."
- Glass **morphs between controls** across states (one floating plane). Menus "pop open" from their button.
- Adaptivity: shadows strengthen over text and weaken over light solids. Tint and dynamic range shift for legibility. *Small* elements (nav and tab bars) flip light/dark with the background; *large* ones (menus, sidebars) don't, because a flip would be distracting. Larger glass gets thicker optics.
- [MUST] **Reserve glass for the navigation layer** floating above content. Don't make a table view glass.
- [MUST] **Never glass on glass.** Put fills, transparency or vibrancy on top of glass instead.
- Variants: **Regular** (adaptive, works anywhere) and **Clear** (permanently transparent, needs a dimming layer). [MUST] Never mix them. [MUST] Use Clear only when all three hold: it sits over media-rich content, a dimming layer won't hurt the content, and the content on top is bold and bright.
- [MUST] Tint only primary actions ("View Bag" in red). "When every element is tinted, nothing stands out." Put brand color in the content layer. Use glass's own tinting, not opaque solid fills, which "break the visual character."
- [SHOULD] In steady states such as first launch, avoid content intersecting glass; reposition or scale the content.
- Scroll edge effects: soft by default; **hard** for pinned accessories such as column headers.
- Accessibility comes free: Reduce Transparency makes it frostier, Increase Contrast goes mostly black or white with a border, Reduce Motion disables elastic properties.

**Web translation:** `backdrop-filter: blur()` is *scattering*, not lensing. Don't fake Liquid Glass on the web; frosted bars are fine for a floating nav layer only. Honor `prefers-reduced-transparency` (Safari supports it **(unverified, from memory)**) and `prefers-contrast: more` by making bars opaque. Never stack translucent panels.

**Slop tells:** Glassmorphism cards in the content area. Glass on glass (a frosted modal over a frosted bar). Every button tinted with the brand color. Glass without a dimming layer over busy photos. Gradient blobs behind glass to make it "look like glass."

---

## Get to know the new design system (https://developer.apple.com/videos/play/wwdc2025/356/, 2025) — fetched transcript

**Key principles/checks**
- Typography is now "bolder and left-aligned" in alerts and onboarding.
- **Concentricity.** Three shape types: *fixed* (constant radius), *capsule* (radius = height/2), *concentric* (child radius = parent radius − padding). [SHOULD] Watch for corners that are "too pinched or flared." Nested containers, such as artwork in a card, should be concentric. Use a concentric shape with a *fallback radius* for components that also stand alone. Near device edges on phone: capsule plus extra margin. On iPad and Mac: concentric with the window.
- Capsules suit touch. In dense desktop layouts they're "best used for standout actions." Mac mini, small and medium controls stay rounded rectangles; large and the new X-Large are capsules.
- [MUST] Material goes on the control itself, not its inner views. Action sheets now spring from their source element.
- Modality: an interrupting task gets glass plus a dimming layer; a parallel task gets glass alone. Dragging a sheet up makes it more opaque and larger.
- [MUST] **Remove custom bar backgrounds and borders.** "Hierarchy should be expressed through layout and grouping," not decoration.
- Bars: group items by function and frequency. Move secondary actions into a "more" menu. [MUST] **Don't group a symbol with a text button** (they read as one button). The primary action (Done) sits alone and tinted.
- Tab bar: a dedicated Search tab at the bottom. Accessory views only for *persistent* features such as playback. [MUST] No screen-specific actions in the tab bar accessory (checkout belongs with its content).
- [MUST] Scroll edge effects only where floating UI overlaps content, one per view. Don't mix soft and hard. In split views, match heights across panes.
- Sidebars are inset glass. Use background extension effects for hero imagery.
- Continuity: design the app's anatomy once, and keep grouped content together across sizes. [SHOULD] Use the same symbol for the same action everywhere. "When there's no clear shorthand, a text label is always the better choice" (pencil vs. Edit, checkmark vs. Select). In menus, use one symbol to introduce a group of related actions and let text do the rest. The HIG Icons page now lists preferred glyphs for common actions.
- **WWDC26 update (SOTU, 102):** Liquid Glass was retuned to diffuse complex content more, with a darkened edge and brighter specular highlights. Users get a slider from ultra clear to fully tinted. Mac sidebar icons regain the accent color. Every macOS window uses the same tighter corner radius. A uniform toolbar appears when content scrolls under floating bars. **Menu icons are hidden by default on macOS and iPadOS menu bars, with an API to show icons for key actions.** This partly reverses the 2025 "populate menus with symbols" advice for menu bars.

**Web translation:** Compute nested radii as `inner = outer − padding` (CSS custom properties). Pill buttons for touch-first and primary CTAs only; small rounded rectangles in dense desktop toolbars. Remove the boxed toolbar backgrounds behind icon buttons. Give the primary action its own visual group.

**Slop tells:** The same 12px radius on every nested container, so inner corners look bloated. Pills everywhere in a dense admin UI. An icon and a text button jammed together in one group. Decorative dividers and borders between bar items. A "Home" catch-all tab.

---

## Elevate the design of your iPad app (https://developer.apple.com/videos/play/wwdc2025/208/, 2025) + Modernize your UIKit / AppKit app (WWDC26 278, 289) — fetched transcripts

**Key checks**
- [MUST] Resizing is **non-destructive**: "Resizing an app should not permanently alter its layout."
- [SHOULD] Wrap toolbars around window controls instead of reserving a safe area. Open each document in its own window, with descriptive window names.
- **Menu bar** (iPad and Mac): [SHOULD] populate menus with every relevant action, **ordered by frequency, not alphabetically**, grouped into sections. [MUST] **"Never hide any menus or items depending on the context"**; disable them instead, so spatial memory keeps working.
- The new iPad pointer tracks 1:1 with no magnetism.
- **WWDC26:** iOS apps must handle *arbitrary* scene sizes. [MUST] No layout logic based on interface orientation; use size classes and the available view size, never the main screen. The prominent tab stays visible even when the tab bar collapses.
- **WWDC26 AppKit:** [SHOULD] View corners near a container corner should follow its curve ("the closer the view is to the container's corner, the more its radius should match"), with a minimum radius so every corner stays rounded. [MUST] Everything works from the keyboard as well as the mouse. Apps quit without pushback unless data would be lost, and restore state as if never quit. Don't overlap invisible sibling views on top of buttons.

**Web translation:** Container queries over viewport breakpoints. No layout logic from `screen.orientation`. Menus show disabled items rather than removing them. Full keyboard operability. Persist UI state across reloads.

**Slop tells:** Menus whose items appear and disappear by context. A layout that breaks or reorders permanently after a resize. A desktop web app with no keyboard paths.

---

## Explore navigation design for iOS (https://developer.apple.com/videos/play/wwdc2022/10001/, 2022) — fetched transcript

**Key principles/checks**
- Tabs reflect the information hierarchy; the labels alone should tell the app's story. [SHOULD] Balance features across tabs; the first tab tends to get overloaded.
- [SHOULD] **Avoid a "Home" tab that duplicates functionality from other tabs** ("consider removing the Home tab altogether"). Duplicating *content* in different organizations is fine; duplicating *actions* is not.
- [MUST] "Never force someone to change tabs automatically." [MUST] Keep the tab bar persistent; don't hide it while drilling in. Preserve each tab's state.
- Push is for hierarchy. [MUST] A chevron (disclosure indicator) means push. Back labels show the previous title. Use push for frequently toggled flows such as Messages threads. RTL locales flip the push direction.
- Modal is for self-contained tasks: simple, multi-step, or full-screen content. On iOS, present from the bottom; it covers the tab bar on purpose.
- Modal nav bar: title; right = preferred action, a bold affirmative verb, inactive until there's input; left = Cancel. [MUST] If Cancel would discard input, confirm with an action sheet; if nothing was entered, dismiss silently.
- [SHOULD] Use an "X" close button only for modals with minimal interaction and *no input*. In a filter sheet, "X" leaves people unsure whether the change applies or cancels.
- [SHOULD] Limit modals over modals.

**Web translation:** The same rules apply to SPAs. Don't auto-switch top-level nav on click. Keep the nav bar persistent across drill-down. Chevron rows navigate, they don't open dialogs. Dialogs with form input use Cancel plus a verb, never a lone X. Confirm before discarding a dirty form.

**Slop tells:** A dashboard "Home" duplicating every feature as cards. An X-only filter sheet with no Apply. A chevron that opens a modal. A tab bar that disappears on detail pages.

---

## Design intuitive search experiences (https://developer.apple.com/videos/play/wwdc2026/292/, 2026) — fetched transcript

**Key checks**
- Keep the core search field anatomy: leading magnifier, placeholder text, a clear button once text is entered, and Cancel when focused (iOS). [MUST] Custom icons "should closely resemble the symbols they are replacing."
- Placement decides where the active field animates to, and it sets the perceived *scope*. Ask two questions: how do people navigate the app, and what does search cover?
- iOS: bottom toolbar is preferred (it moves up over the keyboard for reachability), as in Mail. Top toolbar when a sheet occupies the bottom (Stocks). A Search tab for global search in tabbed apps: either a standard tab with a landing page of suggestions (TV) or a prominent button tab that opens the keyboard immediately (Phone). Inline under the title for scoped search, and say the scope in the placeholder (Music Library).
- iPad and Mac: [SHOULD] keep them aligned. Trailing toolbar position for split views and for results shown in the detail view. Sidebar position when filtering sidebar content (Settings, Stocks).
- Recents: inline on focus (iOS) or in a menu (toolbar or sidebar). [MUST] Let people remove recents individually (swipe) and all at once (Clear).
- Suggestions: [SHOULD] visually distinguish typed input from the predicted completion, and limit the number shown.
- Start broad, then narrow: scope bars for lightweight filtering, contextual filters (Maps), tokens. [MUST] Don't let tokens replace visible filter UI; they're less discoverable.
- [MUST] No-results state: a search symbol, title and subtitle, plus [SHOULD] echo the query so people can spot typos. "A completely blank view can leave someone wondering if their search even went through."

**Web translation:** `<search>` element plus `type="search"`. Show recents on focus with per-item remove. Highlight the predicted part of a suggestion with `<mark>` or a weight difference. Echo the query in the empty state.

**Slop tells:** A search icon that expands into a field with no clear button. A blank result list. Ten or more suggestions pushing results below the fold. Search hidden behind a "Filters" drawer.

---

## The details of UI typography (https://developer.apple.com/videos/play/wwdc2020/10175/, 2020) — fetched transcript

**Key principles/checks**
- **Optical sizes:** SF Text was for sizes below 20 pt and SF Display for 20 pt and up. Since the variable SF Pro, Text **transitions into Display between 17 and 28 pt**. Smaller sizes need looser spacing, sturdier thin strokes and bigger gaps (the dot on the "i"). [SHOULD] In design tools, sync the optical-size slider with the point size, or pin it at the nearest value when out of range.
- **Tracking ≠ kerning.** [SHOULD] Use size-specific tracking and Apple's tracking tables (Apple Design Resources); the 17–28 pt values changed in 2020. [MUST] "If you have to work with custom tracking… it should be size specific." [SHOULD] To fit a string, prefer automatic *tightening* (a tight tracking table, bounded for legibility) over manual kerning, which breaks ligatures. "There is such a thing as too much tracking… it's just better to let things truncate."
- Leading: line height includes leading. Apple adds leading for Arabic and other tall scripts and tightens it on watchOS.
- **Text styles** = weight + size + leading. Emphasized variants come via the bold trait, and the actual weight varies by style (medium, semibold, bold, heavy). **Tight leading = −2 pt, loose = +2 pt** on iOS and macOS (±1 pt on watchOS). Example: body line height 22 → 20 (tight) / 24 (loose). [SHOULD] Use loose for long reading, tight for dense dashboards (Fitness).
- macOS text styles are built around a **13 pt** body (from WWDC20 10104). Catalyst "scale to iPad" = iOS sizes × **77%**.
- [MUST] Custom fonts scale with Dynamic Type through `UIFontMetrics` or `.custom(_:size:relativeTo:)`. Scale spacing too (`ScaledMetric`).
- Web: `-apple-system` became the standard `system-ui`. Also `ui-rounded`, `ui-serif`, `ui-monospace`.

**Web translation:** Prefer `font-family: system-ui` (or `-apple-system`) on Apple-targeted UIs. If you set `letter-spacing`, make it size-dependent: slightly positive at caption sizes, negative at display sizes, close to zero around 17 px. Use `font-optical-sizing: auto` for variable fonts. Body `line-height` around 1.3 for UI, looser for reading. `text-wrap: balance` for headings rather than manual tracking.

**Slop tells:** One letter-spacing value (often `-0.02em` or `tracking-tight`) applied at every size. Tight tracking on small body text. Squeezing a label with negative letter-spacing instead of wrapping or truncating. Fixed `px` font sizes with no response to user text size.

---

## SF Symbols (https://developer.apple.com/videos/play/wwdc2019/206/ 2019; wwdc2020/10207 2020; wwdc2025/337 2025) — fetched transcripts (skimmed)

**Key checks**
- Symbols come in nine weights matched to SF and three scales. **Small ≈ 20% smaller, large ≈ 30% larger than medium.** Scales are optically centered to cap height, and stroke thickness is adjusted per scale rather than linearly scaled. [SHOULD] Match the symbol's weight and point size to adjacent text.
- [MUST] A symbol's point size is not a frame size. Don't force square width and height. Use center alignment, not aspect-fit or scale-to-fit. Don't rasterize. Don't rely on the default black (it breaks Dark Mode).
- Custom symbols: provide at least Regular-Medium, keep the template structure, and center optically.
- SF Symbols 7 (2025): Draw animations (on/off, along path), variable draw; a symbol supports variable color *or* draw at render time, not both. SF Symbols now has **over 7,000 symbols** (WWDC26 brand session).

**Web translation:** Size icons in `em` and align them to the text's cap height. Match icon stroke weight to the text weight (thin icons next to semibold labels look off). Use one icon set with consistent stroke and corner style.

**Slop tells:** Mixed icon libraries (Lucide next to Heroicons next to emoji). Icons at a fixed 24px beside 13px text. Icons bolder or lighter than their labels.

---

## Writing for interfaces (https://developer.apple.com/videos/play/wwdc2022/10037/, 2022) — fetched transcript

**Key principles/checks** — the **PACE** framework (Purpose, Anticipation, Context, Empathy):
- Purpose: every screen has one; people don't read in order, so headers and buttons must stand alone. Know what to leave out ("Temperature" plus an image, instead of a paragraph). Say *why* a feature exists.
- Anticipation: put the likely choice first ("Change Next Alarm Only"). Develop the voice first, then vary the tone by situation. [SHOULD] Use exclamation points sparingly ("they can look silly when they're frequent"). Answer "what comes next?"
- Context: where the person is (walking means one big button). Put instructions where the eyes are (the Panorama arrow). Request permissions at the moment they're relevant, and explain them.
- **Alerts:** title as a question naming the object ("Remove iPhone?"). [MUST] Buttons say the specific action, never Yes/No. [MUST] Readable from the button labels alone ("Cancel Subscription" / "Keep Subscription", not "Cancel"/"Confirm"). Destructive is red; Cancel dismisses without acting. [MUST] No "Oops!" or error codes, no "Sorry, bad input". Interjections "can sound patronizing"; "please" and "sorry" can sound insincere. A good error names the problem, gives the fix as the primary button ("Add Payment Method") and offers "Not Now."
- **Empty states:** educate or celebrate, and say how content will appear ("Save episodes… and they'll show up here"). Avoid idioms such as "Nothing strike your fancy?"
- Empathy: plain language, no idioms, room for localization (Dutch is longer, Thai needs more height; Catalan has no single-letter weekday abbreviations and Arabic doesn't abbreviate them). VoiceOver labels describe intent as well as appearance ("as if sharing a secret"); say "person," not "man/woman."
- [SHOULD] Read your writing out loud.

## Add personality to your app through UX writing (wwdc2024/10140, 2024) + Make a big impact with small writing changes (wwdc2025/404, 2025) — fetched transcripts

- Voice is constant; tone changes. Rank qualities per moment: clarity can outrank simplicity (repeat "data" if that's clearer), and friendliness gets dialed back when someone is blocked. [SHOULD] Never trade usefulness for voice.
- **Four small changes (2025):**
  1. [MUST] **Remove filler**: adverbs and adjectives ("Simply enter… to quickly pay" becomes "Enter your license plate number to pay for parking"), interjections ("Uh oh"), pleasantries ("We're sorry"), and minimizing phrases ("10 short minutes!"). Keep a descriptor only when it carries meaning ("automatically").
  2. [MUST] **No repetition**: "We're running late" plus "won't make it on time" plus "in 10 minutes" becomes "Delivery delayed 10 minutes."
  3. [SHOULD] **Lead with the why**: "To get reservation updates, enter your phone number."
  4. [SHOULD] Keep a **word list**: use/avoid/definition (alias, not handle or username). The same button name for the same action ("Next" on every step).
- Headlines without filler: "Test Your Hearing," not "Take a quick and simple hearing test."

## Craft clear names for features and labels (https://developer.apple.com/videos/play/wwdc2026/290/, 2026) — fetched transcript

- Criteria: **Belongs** (fits the app and its other names), **Sets expectations** (delivers what it predicts, which builds trust), **Works everywhere** (languages, markets, platforms). Trade-offs are yours, but in financial and trust contexts clarity beats brand ("Balance," not "Spending Power" or "Current Funds").
- [SHOULD] Watch for names that pass judgment at edge values (a "Spending Power" of 0 reads as a verdict). Run the out-loud test ("let me check my Current Funds" sounds wrong).
- Name for what it does *for the person*, not the technology ("Enhance Dialogue," not "Vocal Isolation"). Use a verb when it's something you *do*. Invented compounds can work when the parts explain themselves (AutoMix). Emotion can carry clarity (Memories).
- Exercise: think, feel and do sticky notes, then group by theme, then drop candidates into natural sentences.

**Web translation (all writing sources):** These apply to web copy unchanged. Make them lint rules (see the Style Guide section).

**Slop tells:** "Oops! Something went wrong." "Simply/easily/seamlessly/effortlessly." "Unlock the power of…" Yes/No or OK/Cancel buttons on consequential dialogs. Feature names built on jargon or brand puns ("SmartSync Pro™"). "Welcome back! 👋" headers. Exclamation points in error states. Empty states saying only "No data."

---

## Apple Style Guide (https://support.apple.com/guide/applestyleguide/welcome/web, current) — fetched all 52 pages

**Why it matters:** Word-level rules for UI copy and help text. These can be checked mechanically.

**Key checks (UI-relevant entries, quoted or condensed)**
- [MUST] Use **choose** for menu items and **select** for objects, checkboxes and radio buttons ("Select the text… then choose Edit > Copy").
- [MUST] **tap**, not "tap on"; **click**, not "click on"; **touch and hold**, not "tap and hold" or "long press" (fine in developer docs); **press** for physical keys and buttons, never "hit."
- [MUST] Don't say *click* a checkbox (its state is ambiguous); say **select/deselect**, and "selected/unselected," not "checked/unchecked."
- [MUST] Switches: describe the action ("Tap to turn on Location Services"). Don't "slide" a switch. **Toggle** is for developer materials only; users "turn on/off."
- [MUST] **turn on**, not **enable**, for starting something immediately. "Enabled" doesn't mean selected or available.
- [MUST] **dimmed**, not "grayed/hollow." No "dimmed (unavailable)."
- [MUST] **enter** for input, **type** for keystrokes.
- [SHOULD] Avoid **please** in instructional text. Don't use **we** (first person); write in terms of the reader or product. Address the reader as **you**, not "users."
- [SHOULD] Use contractions ("part of Apple's informal voice"), keeping localization in mind.
- [SHOULD] Exclamation points only occasionally in promotional text; avoid them in documentation.
- Terms: **error message** only in developer materials (users see an alert or message). **Dialog**, not "dialog box." **Help tag**, not "tooltip." **Pointer**, not "cursor." "Hold the pointer over," not "hover over." **Log in** (Mac account) vs. sign in. **OK**, not "okay."
- Don't use e.g., etc., via (except when space is tight), and/or, abort, kill, hang, master/slave, whitelist/blacklist, sanity check.
- Ellipsis: use the single character (…). Drop a menu item's ellipsis in running text.
- Capitalization: sentence-style vs title-style. Reproduce UI element names exactly as shown; quote sentence-case button names in instructions.
- Numbers: spell out one through nine in prose, but use numerals for counts shown as numbers and for units.
- Inclusive writing: avoid idioms; don't use color to convey good or bad; avoid violent or ableist terms. Disability: ask about identity-first vs person-first; don't call nondisabled people "normal/healthy"; don't frame people as "brave/inspiring."
- Dark Mode: "turn on Dark Mode"; "light appearance," not "Light Mode."

**Web translation:** Identical rules for web copy. On the web, "click" for pointer and "tap" for touch, or neutral verbs ("Select," "Choose," "Open") when the input type is unknown.

**Slop tells:** "Click here." "Please note…" "We've got you covered." "Toggle dark mode." "Enable notifications" on a button that turns them on immediately. "Hover over." "Oops." "e.g." in UI strings.

---

## The practice of inclusive design (wwdc2021/10275, 2021) + Principles of inclusive app design (https://developer.apple.com/videos/play/wwdc2025/316/, 2025) — fetched transcripts

**Key principles/checks**
- 2025: about **1 in 7** people have a disability. Think in five spectra: vision, hearing, motor, speech, cognitive ("some vision"). Disability is born in the **inclusion gap** between what people can do and what the environment assumes. "Nothing about us without us."
- Four practices: [SHOULD] **support multiple senses** (visual, audio and haptic paths; Crouton's import from camera, image or text plus a hands-free mode); [SHOULD] **provide customization** (Carrot Weather goes from dense to minimal); [MUST] **adopt accessibility APIs**; [SHOULD] **track inclusion debt** as a known backlog.
- 2021: [MUST] Gender-neutral copy ("they"); don't assume family roles ("family member"). [MUST] Name fields accept hyphens, accents, and very short or very long names; ask for the preferred name. Don't ask for gender unless needed. Avoid ableist idioms ("insanely fast"). Bold Text should also thicken non-text glyphs. Check VoiceOver order. Color blindness affects about 5% of people.

**Web translation:** Name inputs without restrictive regex. No required gender field. A reading or minimal mode as customization. `prefers-reduced-motion`, `prefers-contrast` and `forced-colors` all honored.

**Slop tells:** "First name / Last name" required with `[A-Za-z]` validation. Avatars defaulting to a gender. Status shown only by a red or green dot.

---

## Accessibility Nutrition Labels — evaluation criteria (https://developer.apple.com/help/app-store-connect/manage-app-accessibility/overview-of-accessibility-nutrition-labels; session https://developer.apple.com/videos/play/wwdc2025/224/, 2025) — fetched pages and transcript

**Why it matters:** These are concrete, testable criteria from Apple. The labels show on product pages on OS 26+. The overview page says they're voluntary for now, and that "over time, you'll be required to share accessibility support details to submit new apps and app updates." App Review can challenge misleading labels (Guideline 2.3).

**Scope rule:** [MUST] A feature counts as supported only if *all common tasks* can be completed with it, on *each* device. Common tasks = primary functionality (what you market) **plus first launch/onboarding, login, purchase and settings**. Suggested evaluation order: VoiceOver first, since that work carries over to Voice Control and others.

**Per-feature criteria (condensed from the criteria pages)**
- **Sufficient Contrast** [MUST]: **4.5:1** for most text by default. If the defaults fail, Increase Contrast must fix it (Apple frameworks) or multiple compliant schemes must be offered (custom UI). **3:1 for non-text and state contrast** (for example checked vs unchecked). Test light *and* dark. "Many developers use gray-on-black for dark mode", and that fails low-vision users. Account for translucency and blur. Test with Bold Text, Increase Contrast and Reduce Transparency on, plus Increase Contrast on with Reduce Transparency off.
- **Larger Text** [MUST]: text enlarges to **at least 200%** (on iOS, AX3 passes 200% and AX5 puts body text above 300%; Apple Watch's largest size is >140%). No overlapping and no "severe truncation." Wrap instead of truncating; if you truncate in a list, the full text must be reachable elsewhere. Prioritize scaling main content over repeated navigation (Back and Edit stay small). Reflow side-by-side elements into a vertical stack. Elements that can't grow (tab bars) use the Large Content Viewer. Zoom or Hover Text don't count. Test RTL and scripts with tall ascenders or diacritics. Text fields must grow. (Lisa in the session needs **310%**.)
- **Dark Interface** [MUST]: dark by default or via a setting for all common tasks. "The goal isn't only to make the interface dark, but to keep it that way. Even temporary flashes of bright content may cause discomfort." Smart Invert is a last resort; don't let red Delete invert to green, and don't invert media.
- **Differentiate Without Color Alone** [MUST]: test in Grayscale ("If you can't use your own app in grayscale, rethink your app's design"). Use shape, placement, order, icons or text. Order chart colors the same as the legend, or label series directly. A setting toggle is a "last resort." Color blindness affects up to 10% in some populations.
- **Reduced Motion** [MUST]: when the setting is on, disable or replace depth simulation (parallax, animated blur, depth of field), multi-axis or multi-speed motion, spinning and vortex effects. Stop auto-advancing carousels or ongoing motion, or give a control. [SHOULD] Don't remove *meaningful* animation; replace it with a dissolve, highlight fade or color shift.
- **VoiceOver** [MUST]: everything tappable is reachable and operable. Labels are concise ("New Message," not "Press to compose…") and meaningful out of context (no "Learn more," and identify *which* cart item "Delete" removes). No control types or states in labels; use traits. Decorative images are hidden. Charts need a chart API or a text alternative. All text is speakable, including custom keyboards and PIN pads. Banners and alerts are announced non-disruptively. Order is logical with no skips or loops. Groups expose custom actions.
- **Voice Control** [MUST]: "Show numbers" and "Show names" reveal every interactive element. **Voice labels must match the visible text.** Hidden UI (hover or swipe) needs a speech path (custom actions or a context menu). Scrolling, panning and zooming work. Dictation and editing work in every field. [SHOULD] Let people extend or cancel auto-hide timers.
- **Captions / Audio Descriptions**: claim them only if you have media. Make captions toggleable and AD findable (an AD badge).

**Web translation (direct WCAG mapping):** 4.5:1 / 3:1 match WCAG 1.4.3 / 1.4.11. 200% text matches 1.4.4; test with browser text-only zoom *and* iOS Safari's per-site text size. The Dark Interface "no flash" rule means `color-scheme` on `:root` (so no white flash before CSS loads), dark iframes and dark embeds. Reduced Motion means `@media (prefers-reduced-motion: reduce)` swapping parallax and scale for opacity. Voice Control's "label matches visible text" is WCAG 2.5.3 Label in Name. The "common tasks incl. login/purchase/settings" scope is a good default audit scope for web too.

**Slop tells:** Gray-500 on near-black body text in dark mode. Status chips that differ only by hue. Auto-playing hero carousels with no pause. Parallax heroes that ignore reduced-motion. A white flash between dark pages. Icon-only buttons with no accessible name. `aria-label="button"`. "Learn more ×6" on one page.

---

## Refine accessibility for custom controls (https://developer.apple.com/videos/play/wwdc2026/220/, 2026) — fetched transcript (skimmed)

- Custom controls need assistive-tech parity. Passthrough gestures start at the current value. [SHOULD] Give feedback during adjustment, but throttle announcements: announce only when the value has actually changed **and ≥ 0.3 s** have passed.

**Web translation:** For custom sliders use `role="slider"`, `aria-valuenow/min/max`, `aria-valuetext` and arrow-key handling (VoiceOver on iOS swipe up/down sends arrow keys, per WWDC22 "What's new in web accessibility" 10153). Throttle `aria-live` updates.

---

## Principles of great design (https://developer.apple.com/videos/play/wwdc2026/250/, 2026) — fetched transcript

**Why it matters:** WWDC26's statement of principles, which now backs the HIG's new design-principles page. Several lines work directly as anti-slop rules.

**Key principles/checks**
- **Purpose**: "Every feature… asks for their time, their attention, and their trust." Choosing what to build "is often a matter of deciding what not to include."
- **Agency**: let people dive in rather than following a predetermined path. **Forgiveness**: undo for everything, confirmation before destructive actions, interruptions only "when someone is about to make a big mistake."
- **Responsibility**: [MUST] no permission prompts at launch, before the app's value is clear. Ask at the right moment, only for what's necessary, and say what it's for. Ask "How could this feature be misused? Who would be harmed?" **AI**: anticipate wrong output (the recipe-allergy example). Add previews, confirmations and disclaimers, or remove the feature if the safety risk outweighs its value.
- **Familiarity**: metaphors neither too literal nor too abstract. [MUST] Don't repurpose the trash icon or restyle the delete icon. "Things that look the same should behave the same." Keep placement consistent.
- **Flexibility**: per-device strengths (iPhone for quick touch, Mac for deep workflows and pointer precision). Range of abilities. Personalization (rearrange or hide controls).
- **Simplicity**: "When we say simple, we don't mean minimal. If you bury all your functionality inside a single place, that might make your interface look more minimal, but it doesn't make it simple." Hierarchy through order, spacing and contrast, so "the most important item on the screen is always the most obvious one." Sometimes simple means *adding* context: a scrubber with elapsed and remaining time beats a bare play/pause.
- **Craft**: cheapness shows as a button you tap and then wait on, jittery scrolling, misaligned icons, a layout that breaks on rotation. Ingredients: good fonts, colors that adapt to light and dark, clear iconography, responsive animation. Keep evolving the design after launch.
- **Delight**: "isn't by adding confetti or tacking on extra flourishes at the end of your process." Identify the target emotion (relaxed, confident, excited) and reinforce it. Delight is "the natural result of getting all the design principles right."

**Web translation:** Apply as written. Permission prompts (notifications, location) only after a user gesture with context. This is also *required* for Web Push on iOS: the request must come from direct user interaction.

**Slop tells:** Confetti on signup. A notification prompt on first load. A minimal UI that hides everything in a ⋯ menu. AI output with no preview or undo. Onboarding carousels gating the product.

---

## Design foundations from idea to interface (https://developer.apple.com/videos/play/wwdc2025/359/, 2025) — fetched transcript (skimmed)

- Per-screen questions: *Where am I? What can I do? Where can I go from here?* (a restatement of 2017's wayfinding). The toolbar carries the screen title, "instead of a menu, or branding as before," plus screen-specific actions, which don't go in the tab bar. Use a collection for many images. Create a "visual anchor" by making the most important item larger or higher in contrast. "Design is never really finished."

**Slop tells:** A logo in the top bar on every screen. Every card the same size, so nothing anchors the eye.

---

## Communicate your brand identity on iOS (https://developer.apple.com/videos/play/wwdc2026/251/, 2026) — fetched transcript

**Why it matters:** Apple's most explicit statement on how far brand can go. It's the clearest guard against both generic sameness *and* over-branded chrome.

**Key principles/checks**
- Don't copy your web or Android brand system verbatim; each placement should consider its context. iPhone users expect iOS patterns.
- Two layers: **UI layer** (tab bars, toolbars) [SHOULD] stays native; **content layer** is "the best opportunity to express your brand identity." Example apps: Gentler Streak (native navigation plus distinctive illustration and data visualization), Slack (a custom toolbar that still feels iOS), Moonlitt (a custom calendar on glass with concentric edges).
- [SHOULD] Spend custom-component effort where it has the biggest impact. Utilitarian custom components "don't usually reinforce a brand… can make the product appear less native — or even dated." Use the standard context menu and similar components.
- Content: full-bleed media with purpose (Crumbl's weekly videos). Voice and tone are brand too. Motion: zoom transitions connect the tap target to the destination. Dropped frames hurt perception "even if they couldn't pinpoint exactly why."
- **Color**: [SHOULD] move the brand color out of solid bars and into the scroll content so it scrolls away (Slack did this). Use color for meaning: hierarchy, grouping, interaction, status. Tint primary actions, badges and selection. "Exercise restraint." [MUST] Support Dark Mode with a refined low-light palette.
- **Type**: custom display fonts belong in memorable moments (Crumbl Sans headers). [MUST] Custom fonts must support Dynamic Type; layouts wrap instead of truncating at large sizes. SF supports 150+ languages. System-only fonts can still be distinctive through widths and Rounded (Gentler Streak).
- **Icons**: custom icons are fine if recognizable, consistent and legible at small sizes (NYT Cooking's sharper, lighter strokes), and they keep platform metaphors (an iOS-style share glyph on iOS). Otherwise use SF Symbols.
- **Logos**: [SHOULD] keep them out of chrome. "People don't need to be reminded which app they're using." NYT Cooking shows its logo only on Home, and it fades on scroll.

**Web translation:** For a web app shown on iOS, keep navigation conventional and let brand show in content and illustration. Avoid a full-width colored app bar (or make it scroll away). Logo only on the landing view.

**Slop tells:** A brand-colored header bar on every page. A logo in every toolbar. A custom-drawn dropdown or date picker that looks like 2015 Bootstrap. Brand color on every icon. No dark theme.

---

## Design for Arabic (https://developer.apple.com/videos/play/wwdc2022/10034/, 2022) — fetched transcript (skimmed)

- [MUST] In RTL, titles, buttons and nav bar positions flip; paragraphs right-align; carousels, swipeable elements and page dots flow right to left; toggles and segmented controls mirror. Don't flip content with real-world direction (the sun rises in the east).
- Arabic letters connect, so [MUST] use **0 tracking** unless the typeface is optimized for spacing. Add vertical space for heavy vocalization marks to avoid clipping. Numerals: support both Western and Arabic-Indic forms per locale. Stay culturally relevant.

**Web translation:** Use logical properties (`margin-inline-start`) and `dir="rtl"`. Mirror directional icons only. `letter-spacing: 0` for `:lang(ar)`. Increase `line-height` for Arabic. `Intl.NumberFormat` for numerals.

**Slop tells:** `letter-spacing` applied globally and breaking Arabic joins. Left/right physical CSS. Back chevrons not mirrored.

---

## Design great widgets (https://developer.apple.com/videos/play/wwdc2020/10103/, 2020) — fetched transcript (skimmed)

- Glanceable and relevant: show the single most important item and adapt over time (show tomorrow's events instead of going blank). [SHOULD] At most **four pieces of information** in the small size. Don't just scale a small widget up to make a large one. **16 pt** layout margins. Corners concentric with the widget radius.
- [SHOULD] Use SF variants; custom fonts only if they still feel at home. Support light and dark. Placeholder (redacted) state. A logo only for aggregators, top-right.
- [MUST] No app icon, wordmark or app name inside the widget. No instructional text talking to the user. No "last updated/last checked" language. Taps deep-link to the content shown.

**Web translation:** The same rules suit dashboard tiles and cards: one primary datum, at most four facts, uniform internal padding, no "Last updated 3m ago" chatter unless freshness is the point.

---

## Design with iOS pickers, menus and actions (https://developer.apple.com/videos/play/wwdc2020/10205/, 2020) — fetched transcript (skimmed)

- Menus hold secondary actions; keep primary and frequent actions visible (Compose in Messages). [MUST] Destructive actions always need confirmation, and the confirm button sits in a *different place* from the trigger, so the extra finger travel acts as friction. Use action sheets on iPhone and popovers on iPad, even outside menus. Compact date pickers allow typing the time instead of spinning wheels.

**Web translation:** Confirm destructive actions in a dialog whose confirm button isn't under the original click point. Prefer native `<input type="date|time">`.

---

## Adopt the new look of macOS (https://developer.apple.com/videos/play/wwdc2020/10104/, 2020) + Build an AppKit app with the new design (wwdc2025/310) — fetched transcripts (skimmed)

- 2020 (Big Sur): full-height sidebars; toolbar unified with the content; sidebar icon colors follow the accent with `preferredColor`, `fixedColor` only for semantic items (the yellow VIP star) or monochrome to de-emphasize; [SHOULD] use named system colors, never a hard-coded accent; macOS body text is **13 pt**; large controls became standard.
- 2025: [SHOULD] keep non-interactive toolbar items (titles, status) *off* glass. Use the prominent style for state or the key action. Remove legacy visual-effect views. Don't hard-code control heights. Limit glass to top-level controls, and don't place glass behind content.

**Web translation:** Mac-like web apps: 13px base UI text in dense tool UIs, accent from a single variable, sidebar icons monochrome.

---

## Principles of spatial design (https://developer.apple.com/videos/play/wwdc2023/10072/, 2023) — transfer only — fetched transcript (skimmed)

Transferable ideas: keep windows smaller when possible so they don't block the view; place important content in the center of the field of view; let objects that emit light tint their surroundings and let others cast shadows (lighting consistency); during large repositioning, fade out content while it moves and fade it back once settled; always provide a clear way in and out of immersive modes.

**Web translation:** Fullscreen or immersive takeovers need an obvious exit. Large layout jumps should crossfade rather than slide whole-screen content.

---

## Intelligence-related design (no session titled "Designing for Intelligence" exists; nearest sources) — fetched transcripts

- **WWDC26 250** (Responsibility, see above): plan for wrong model output; use previews, confirmations and disclaimers; remove the feature if the risk outweighs the value.
- **WWDC24 10176 "Design App Intents for system experiences"**: anything the app does should be an intent. [SHOULD] Make one flexible intent with a parameter rather than many near-duplicates. [MUST] No intents for UI gestures ("tap cancel"); model the underlying task. Parameter summaries must read as a sentence for every value. Two-state intents support "toggle" by default.
- **WWDC25 281 "Design interactive snippets"**: larger type for the key fact; [SHOULD] **avoid content taller than 340 pt** (no scrolling); check contrast beyond the standard ratios because snippets are viewed from a distance; convey purpose without relying on dialog.
- **WWDC26 227 "Create UI prototypes using agents in Xcode"**: "Because it's never been easier to produce an app, designing with intention is critical to standing out." Ask agents for *multiple named variations*, plausible domain sample content (no lorem ipsum), blank-slate and account states, and tunable-parameter panels for feel (perceived weight while dragging).

**Web translation / slop tells:** AI features shown as a sparkle button with no preview, undo or provenance. Generated content written directly into user data. Agents producing a single, lorem-filled happy-path screen.

---

## Apple Design Awards — category criteria (https://developer.apple.com/design/awards/, 2026 winners) — fetched page

Category definitions as published:
- **Delight and Fun**: "memorable, engaging, and satisfying experiences enhanced by Apple technologies."
- **Inclusivity**: "a great experience for all by reflecting a variety of backgrounds, abilities, and languages."
- **Innovation**: "a state-of-the-art experience through a novel use of Apple technologies that sets them apart in their genre."
- **Interaction**: "intuitive interfaces and effortless controls that are perfectly tailored to their platform."
- **Social Impact**: "improve lives in a meaningful way and shine a light on crucial issues."
- **Visuals and Graphics**: "stunning imagery, skillfully drawn interfaces, and high-quality animations with a distinctive and cohesive theme."

What the 2026 citations praise (use as positive exemplars):
- grug: "no login, no cloud syncing, nothing extraneous"; a hand-drawn status bar; "clever simplicity."
- Guitar Wiz: VoiceOver guidance down to finger placement, plus Dynamic Type, Increase Contrast and Differentiate Without Color.
- Pine Hearts: inclusivity options shown "even before play begins."
- Sago Mini: "interactions that require no reading," "no timer, no to-do lists."
- Moonlitt: "best-in-class Liquid Glass integration, and easy onboarding."
- Tide Guide: a palette "designed to match the color of the sky throughout the day"; crisp full-screen charts; widgets.
- (Not Boring) Camera: big, bold design, with the secret being to "ensure the products excel in all other areas too."
- Grand Mountain Adventure 2: gestures "smooth, quick to pick up, and immediately responsive."

**Key checks for the skill:** [CONSIDER] Score against these six lenses. Note the recurring pattern: *distinctive theme + platform-native interaction + accessibility done fully*. Expressiveness is rewarded only when the basics are flawless.

**Slop tells:** "Distinctive" as decoration without a cohesive theme. Bold visuals over broken basics (the (Not Boring) citation says this outright).

---

## App Store Review Guidelines — design-bearing sections (https://developer.apple.com/app-store/review/guidelines/, last updated 2026-10-16) — fetched page

- **4 Design** (preamble): customers value products that are "simple, refined, innovative, and easy to use"; the section sets "minimum standards for approval." Apps that "offer a degraded experience may be removed."
- **4.1 Copycats**: don't copy a popular app or make "minor changes to another app's name or UI."
- **4.2 Minimum Functionality**: [MUST] "features, content, and UI that elevate it beyond a repackaged website"; it must be "useful, unique, or 'app-like.'" 4.2.2: not primarily marketing, ads, web clippings, aggregators or link collections. 4.2.3(ii): disclose the size of any download needed on first launch and prompt before downloading. **4.2.6**: apps from commercial templates or app-generation services are rejected unless the content provider submits them.
- **4.3 Spam**: [MUST] don't submit apps "indistinguishable from what's already widely available." Saturated categories (flashlight, wallpaper, simple timers, etc.) need a "meaningfully different or improved experience."
- Nearby rules that shape UX: **2.5.9** don't alter or disable standard switches or native UI behaviors (for example, blocking links out). **4.5.4** push isn't required for function; marketing pushes need opt-in plus an in-app opt-out. **5.1.1** let people use non-account features without login; [MUST] if accounts can be created, *in-app account deletion* is required; purpose strings must clearly describe data use; paid functionality can't depend on granting data access. **2.3.7** app names are limited to 30 characters. **2.4.1** iPhone apps should run on iPad whenever possible.

**Web translation:** For PWAs and web wrappers, 4.2 is the bar: a WKWebView wrapper of a website gets rejected. For the review skill, a "repackaged website" smell (web-style nav, no native gestures, hamburger menu, pull-to-refresh missing) is a store risk as well as a UX issue.

**Slop tells:** Template-generated apps with an interchangeable brand skin (4.2.6 / 4.3 risk). A login wall before any value. No account-deletion path.

---

## WebKit / Safari guidance for web design (webkit.org blog + WWDC web sessions) — fetched

Sources: "Designing Websites for iPhone X" (https://webkit.org/blog/7929/, 2017), "Dark Mode Support in WebKit" (https://webkit.org/blog/8840/, 2019), "Using the System Font in Web Content" (https://webkit.org/blog/3709/, 2015), "Web Push for Web Apps on iOS and iPadOS" (https://webkit.org/blog/13878/, 2023), WWDC21 "Design for Safari 15" (10029), WWDC26 "What's new in WebKit for Safari 27" (204), "Rediscover the HTML select element" (315), "Learn CSS Grid Lanes" (314), WWDC22 "What's new in web accessibility" (10153). The iOS 26 Home Screen change is from secondary coverage quoting WebKit (heise.de, mjtsai.com); the WebKit post itself wasn't fetched.

**Key principles/checks**
- **Safe areas** [MUST when using `viewport-fit=cover`]: `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`, then pad important content with `env(safe-area-inset-*)`. "Safe area insets are not a replacement for margins": use `padding-left: max(12px, env(safe-area-inset-left))`. The inset areas fill with the `<body>`/`<html>` background-color by default, so set it deliberately. Bottom-fixed UI must clear `env(safe-area-inset-bottom)` (the iOS Safari bottom tab bar; Safari 15 notes the value changes as the bar minimizes). [SHOULD] Don't size app shells with `100vh` (it ignores the browser chrome); use `dvh`/`svh` (our inference; Safari 15 shows the `vh` problem).
- **Dark mode** [MUST]: WebKit never auto-darkens, so opt in with `:root { color-scheme: light dark; }` (or `<meta name="color-scheme">`) so form controls, scrollbars and default colors adapt. Then `@media (prefers-color-scheme: dark)` with CSS variables; `<picture><source media="(prefers-color-scheme: dark)">` for imagery; SVG icons use `currentColor`; avoid a broad `filter: invert()` over sections (memory and performance cost). Don't hard-code the system's default colors; they change under high contrast.
- **Theme color** [SHOULD]: `<meta name="theme-color" content="…" media="(prefers-color-scheme: light|dark)">`. Safari blends its tab bar or toolbar into the page; "the color of the tab bar, the favicon, and the page title are all parts of a site to design with intention." Watch for horizontal banners at the top that break the color flow.
- **System font and Dynamic Type**: `font-family: system-ui` (formerly `-apple-system`), plus `ui-rounded`, `ui-serif`, `ui-monospace`. `font: -apple-system-body | -apple-system-headline | -apple-system-subheadline | -apple-system-caption1 | -apple-system-caption2 | -apple-system-footnote | -apple-system-short-* | -apple-system-tall-body` sets *size, weight and family as a text style* that follows the user's iOS text-size setting. The pattern `html { font: -apple-system-body } body { font-family: <brand>, system-ui }` with rem-based sizing makes a site honor Dynamic Type **(unverified, from memory, as a community pattern; the keyword list is verified)**. Safari also offers per-site text size, which the Larger Text criterion calls out ("If your app uses a web view… provide a font size controller or let Safari handle this").
- **Home Screen web apps**: a manifest with `display: standalone|fullscreen` makes a web app with its own App Switcher entry. Icons come from the manifest or `apple-touch-icon` (which takes precedence); without one, iOS 16.4+ generates a monogram. Web Push permission must be requested "in response to direct user interaction." The Badging API is supported. **Since iOS/iPadOS 26, every site added to the Home Screen opens as a web app by default**, and users can turn off "Open as Web App." So *every* site must look right with no browser chrome: a visible back affordance, safe-area handling and a theme color.
- **Native controls first**: Safari 27 adds **customizable `<select>`** (`appearance: base-select` on the select and on `::picker(select)`, plus `::picker-icon`, `::checkmark` and rich `<option>` content via `<button>`/`<selectedcontent>`). It keeps native accessibility, and browsers without support fall back to the native picker. [SHOULD] Don't build div-based dropdowns. Safari 15 added a native `<input type="color">` picker with an eyedropper on iOS.
- **CSS Grid Lanes** (Safari 26.4): native masonry via `display: grid-lanes`. Check tab order with Web Inspector's order numbers and tune `flow-tolerance` (the transcript writes it as "flowtolerance") so keyboard order stays sane.
- **Text in images**: "content on the web that consists mostly of text really should be put on the web as text in HTML" (Live Text works on images, but that's no excuse).
- **Custom controls**: `role="slider"`, `tabindex="0"`, `aria-valuemin/max/now/valuetext`. VoiceOver on iOS maps swipe up/down to arrow-key events (WWDC22).
- Legacy meta tags `apple-mobile-web-app-capable` and `apple-mobile-web-app-status-bar-style` (default | black | black-translucent) still exist **(unverified, from memory; manifest is now the primary path)**.

**Web translation (summary checklist for the skill):** color-scheme declared; dark palette via variables; theme-color for light and dark; viewport-fit + `max(pad, env())` on fixed bars; `dvh` not `vh`; system-ui or a deliberate brand font that scales with user text size; native select, date and color controls; manifest plus apple-touch-icon; standalone mode has its own back navigation; reduced-motion, reduced-transparency and contrast media queries.

**Slop tells:** A fixed bottom CTA hidden behind the iOS home indicator. White flash on load in dark mode. `height: 100vh` hero clipped by Safari's toolbar. A div-soup custom select. A generic Inter-on-white with no `theme-color`, so Safari's chrome clashes. Standalone mode with no back button.

---

## Sources not reachable

- **"Design for iPhone Duo" (WWDC26)**: a web-search summary named it, but it is **not** in the official 138-video WWDC26 list on developer.apple.com. Treat it as fabricated by the search summarizer.
- No first-party sessions found under these exact titles: **"Designing for Intelligence / Design for intelligent experiences"**, **"Create accessible UX / Design accessible experiences"**, **"Make your UI look great with Liquid Glass."** Closest equivalents were digested instead (WWDC26 250, WWDC24 10176, WWDC25 281/224/316, WWDC26 220; WWDC25 323/284/310 for adopting the new design).
- **"Designing for macOS" (Big Sur era)**: the design talk wasn't located by that name; used WWDC20 10104 "Adopt the new look of macOS" (engineering plus design).
- **Spring conversion equations** (WWDC23) appear only on slides, so the formulas above are from memory.
- **Apple Design Resources tracking tables** (per-size tracking numbers) weren't fetched. They're downloadable assets; the HIG Typography page may already include them (check digest 0x).
- **WebKit "Safari 26" Home Screen web app post**: content confirmed via secondary sources quoting it; the original webkit.org post wasn't fetched.
- **Archived Safari Web Content Guide** ("Configuring Web Applications") wasn't fetched; legacy meta-tag details are from memory.
- Transcripts fetched but **not digested** (available in scratchpad `wwdc/` if needed): WWDC25 248 prompt design & safety, 220 app icons, 361 Icon Composer, 255/303 visionOS; WWDC24 10086/10096 visionOS, 10112 CarPlay, 10098 Watch Live Activities, 10151 visual effects; WWDC26 234 immersive environments, 321/322 SwiftUI, 8012 Icon Composer lab, 382 special presentation.

## Open questions for skill design

1. **Severity mapping:** Should Nutrition-Label criteria (4.5:1, 3:1, 200% text, no bright flash, the reduced-motion trigger list) be hard **blockers** in the review while principle-level items stay advisory? Proposed: blockers = ANL criteria + App Review 4.2/5.1.1 + Style Guide verb misuse in buttons; advisory = everything else.
2. **Platform mode switch:** iOS, iPadOS and macOS diverge (capsules vs rounded rectangles in dense Mac UI; menu icons hidden by default on Mac/iPad menu bars as of WWDC26 but encouraged in iOS context menus; 13 pt Mac body vs 17 pt iOS body). Should the skill ask for the target platform first, or infer it from the artifact?
3. **Web parity level:** For web apps, do we judge "native feel on Apple devices" (system-ui, theme-color, safe areas, Home Screen standalone) by default, or only when the brief says "iOS-targeted PWA"? Since iOS 26 opens every Home-Screened site as a web app, a lightweight standalone check is probably always worth running.
4. **Motion review needs a running artifact.** Interruptibility, velocity handoff and momentum projection can't be judged from screenshots. Should the skill drive Playwright to flick, interrupt and re-target gestures, or ask for a screen recording?
5. **Liquid Glass on web:** recommend avoiding fake glass on the web entirely, or allow frosted bars in the navigation layer only, with `prefers-reduced-transparency`/contrast fallbacks? (Apple's rules imply the latter is the ceiling.)
6. **Copy linting:** encode the Style Guide plus the "small writing changes" filler list (simply, easily, quickly, oops, uh oh, sorry, please, exclamation points in errors, Yes/No buttons, "click here," "learn more" without context) as a deterministic lint pass before the LLM critique?
7. **Brand vs native tension:** The WWDC26 brand session gives a crisp rule (brand in the content layer, native chrome). Do we flag *any* colored app bar or logo in chrome as an issue, or only when combined with other non-native signals?
8. **Scoring rubric:** use the WWDC26 eight principles (Purpose → Delight) as the top-level report structure, with ADA's six categories as an optional "excellence" lens? That gives a "basics vs beyond-basics" split that matches the goal of beating AI slop.
9. **Version drift:** WWDC26 already reversed one WWDC25 recommendation (menu icons). Should the skill date-stamp each rule and prefer the newest source when they conflict?
