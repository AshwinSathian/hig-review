<!-- contents -->
Contents: Design principles overview · Purpose · Agency · Responsibility · Familiarity · Flexibility · Simplicity · Craft · Delight · Designing for iOS · Designing for iPadOS · Designing for macOS · Designing for iPhone Duo · Transferable from visionOS · Transferable from watchOS · Transferable from tvOS · Transferable from games · Cross-cutting principles · Review setup notes
<!-- /contents -->


Covers: Apple's eight design principles, per-platform guidance for iOS, iPadOS, macOS and iPhone Duo, and the principles from visionOS, watchOS, tvOS and games that transfer to phone, desktop and web.
Loaded by: platform fit, distinctiveness
Snapshot: 2026-10-23

Strength tags follow the global rule. Web and Slop tells lines are ours, not Apple text. Liquid Glass checks carry `(26+)` and apply only when the deployment target is iOS, iPadOS or macOS 26 or later. Design principles were reintroduced on June 8, 2026. The iPhone Duo page is new as of Sept 9, 2026, so older model knowledge will not cover either.

## Design principles overview
**Intent**: Eight principles: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight. Apple frames them as tools for weighing competing priorities, not rules. There is no one right way. Older framings (clarity, deference, depth; hierarchy, harmony, consistency) are history only.
**Checks**
- [SHOULD] Weigh the principles against each other per finding instead of treating one as absolute. Judge Purpose and Delight against the product purpose and target feeling in the project profile, not a guess.
**Platform deltas**: none; applies to all platforms.
**Web (our translation)**: Same principles, same weighing. Apple-specific patterns are not required on web; breaking the principle behind one is the finding.
**Slop tells (ours)**: Findings phrased as generic principle names with no screen-specific evidence.

## Purpose
**Intent**: Make something meaningful. Design starts from what matters most to the people using it. Make those few things great and avoid rebuilding solutions that already exist.
**Checks**
- [SHOULD] The product's purpose fits in one sentence, and every screen visibly serves it.
- [SHOULD] The most important features are prioritized by placement, size and number of taps, with secondary features kept out of the way.
- [SHOULD] There is a specific point of difference. Flag a design that copies a category leader's layout without saying what sets it apart.
**Platform deltas**: none.
**Web (our translation)**: The landing view or dashboard answers "what is this for" without scrolling. A feature grid that gives every feature equal weight means the product has no focus.
**Slop tells (ours)**: Equal-weight 3- or 4-column feature cards. Generic heroes ("Supercharge your workflow"). Dashboard tiles that are whatever metrics the database has, not what the user came to do.

## Agency
**Intent**: Let people do things their own way. The interface serves their goals: freedom, status, and cheap recovery so exploring feels safe.
**Checks**
- [SHOULD] The primary task or content is reachable right away, with no interstitials, splash marketing or forced tours.
- [SHOULD] The user is never locked into a flow or mode. Every guided flow (onboarding, wizard) can be skipped or escaped.
- [SHOULD] Every destructive or consequential action is reversible (undo, or a return to the previous state). Recovery costs no time or work: no lost form input, no redoing steps.
- [SHOULD] The system shows status, meaning what is happening now.
**Platform deltas**: macOS expects Undo/Redo in the Edit menu and via ⌘Z. iOS supports shake and three-finger undo, but swipe-back and cancel are the main ways out.
**Web (our translation)**: Undo toasts instead of "Are you sure?" modals. Wizards need a visible exit and saved drafts. Back-button and URL state survive refresh.
**Slop tells (ours)**: Unskippable multi-step onboarding carousels. A confirm dialog on every delete instead of undo. Modals that wipe input when dismissed. Paywall or signup walls in front of the core value.

## Responsibility
**Intent**: Act in people's best interest. Earn trust through safety, privacy, and transparency about what the product does and why.
**Checks**
- [SHOULD] Every permission request is preceded or accompanied by a clear rationale, in context.
- [SHOULD] Data collection is disclosed (what is collected, how it is used) and limited to what the product needs to work.
- [SHOULD] Misuse and abuse are anticipated (sharing, public profiles, messaging), with protections designed in.
**Platform deltas**: none here; see the privacy reference.
**Web (our translation)**: Ask for browser permissions (location, notifications, camera) only on a user gesture, with an explanation first. Never on page load. Dark patterns in consent flows fall under the deceptive-design gate: Blocker.
**Slop tells (ours)**: "Allow notifications?" on first load. Cookie walls with dark patterns. Signup forms asking for phone, company size and role before showing anything.

## Familiarity
**Intent**: Build on what people know. Real-world and established digital patterns make an app feel at home; consistency speeds learning and builds confidence.
**Checks**
- [SHOULD] Established metaphors and platform patterns are used rather than invented ones.
- [SHOULD] Internal consistency: once an element's look or behavior is set, it is the same everywhere. Audit buttons, row styles and icon meanings across screens.
- [SHOULD] Clear feedback: control availability (enabled or disabled), signals when content changes, and system patterns for alerts and choices rather than custom ones.
**Platform deltas**: Each platform has its own known patterns: the menu bar on macOS, tab bar plus swipe-back on iOS, sidebar plus multitasking on iPadOS.
**Web (our translation)**: Native `<dialog>`, `<select>` and form semantics, plus the conventions of the user's OS (⌘ vs Ctrl shortcuts). Web is not flagged for lacking an Apple-specific pattern, only for breaking the principle behind it.
**Slop tells (ours)**: Three different button styles for the same action across pages. Custom toast or alert components that replace native confirmation. Icons reused with different meanings. Hover effects on non-interactive cards, a false availability signal.

## Flexibility
**Intent**: Adapt to diverse contexts and needs. Support as many people, devices, inputs and perspectives as possible. Accessibility is a priority from the start, not a retrofit.
**Checks**
- [SHOULD] Accessibility was part of the initial design: text scaling, contrast and screen-reader labels are present from the first pass, not deferred.
- [SHOULD] Preserve context: content and controls keep consistent, predictable positions as the layout adapts (rotation, resize, platform), and transitions are eased with natural animation.
- [SHOULD] Each available input is supported: touch, keyboard, voice, pointer and more.
- [SHOULD] Every supported platform gets the same level of care. Flag a strong primary platform paired with a neglected port.
**Platform deltas**: covered per platform below.
**Web (our translation)**: Full keyboard operability. Respect `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast` and user font size (rem, not px). Mobile web is designed, not a squished desktop.
**Slop tells (ours)**: A desktop-first layout that collapses to a hamburger plus stacked cards on mobile with no rethinking. Hover-only affordances. Focus outlines removed.

## Simplicity
**Intent**: Be clear and direct. Every element earns its place. Simplicity isn't minimalism: keep important things close and let the rest fall away.
**Checks**
- [SHOULD] Each element can justify its presence. Flag decorative or duplicate elements.
- [SHOULD] Important things are close by, not hidden behind minimalism. Over-hiding is also a failure.
- [SHOULD] Copy is concise: the exact words needed for each label or concept.
- [SHOULD] A clear hierarchy (recognizable controls, consistent structure) tells people where they are and what comes next.
**Platform deltas**: none.
**Web (our translation)**: Same tests. The web trap is aesthetic minimalism that hides navigation or primary actions behind icons or menus.
**Slop tells (ours)**: Huge whitespace with tiny gray text (minimalism mistaken for simplicity). Icon-only toolbars with no labels. Wordy microcopy ("Click here to get started on your journey"). Breadcrumbs and page titles that repeat each other.

## Craft
**Intent**: Care about every detail. Quality sets the tone: deliberate visuals, motion, wording and audio, kept current with the platform.
**Checks**
- [SHOULD] Every visual, animation, word and sound is a deliberate decision, not a default.
- [SHOULD] The design was tested in real-world settings: real data lengths, slow networks, outdoors, one-handed.
- [SHOULD] (26+) Maintain craft: the design uses current platform capabilities and patterns, which now means Liquid Glass and the new design system that the iOS, iPadOS and macOS pages all point to. Flag outdated idioms. Gate on the detected deployment target.
**Platform deltas**: The macOS resources call out building an AppKit app with the new design. The new material system is cross-platform.
**Web (our translation)**: Check with real content (long names, empty, error, loading states), not lorem ipsum. Stale framework-default styling counts as failing "maintain craft". Web has no equivalent of Liquid Glass. Enforce the layering principle (chrome distinct from content); emulating the material is optional and needs a reduced-transparency fallback. Never propose glass as a target on its own.
**Slop tells (ours)**: Mock data that is suspiciously perfect (all names 8 characters, all avatars present). No empty, error or loading states. Default component-library theming left unchanged. Generic stock-illustration error pages. Glassmorphism applied everywhere because "Apple does glass".

## Delight
**Intent**: Make it human. Choose the emotion the product should evoke (energize, calm, thrill) and let it shape the design. Delight is the sum of the care taken, not decoration.
**Checks**
- [SHOULD] The team can name the target emotion, and the visual and motion language expresses it. Read it from the profile.
- [CONSIDER] Defining moments exist, places where character shows, including small moments like a button press or an error message.
- [SHOULD] No delight element (animation, illustration, whimsy) slows down or blocks the core task.
- [SHOULD] Whimsy versus practical restraint is a deliberate choice for this product.
**Platform deltas**: none.
**Web (our translation)**: Micro-interactions that confirm actions; no scroll-jacking showpieces. Humor never appears in errors, destructive confirmations, money or permission requests.
**Slop tells (ours)**: Gratuitous gradient blobs, glassmorphism and confetti with no emotional thesis. Every product feels the same (purple-blue gradient, rounded cards). Lottie animations that delay content. Error messages with no voice ("Something went wrong").

## Designing for iOS
**Intent**: iPhone is a medium-size, hand-held, on-the-go device viewed at no more than a foot or two. Sessions range from 1–2 minutes of checking to an hour or more of immersion, with frequent app switching.
**Checks**
- [SHOULD] Onscreen controls are limited so the primary task and content dominate; secondary details and actions are discoverable with minimal interaction (menus, context menus, swipe).
- [SHOULD] The layout adapts cleanly to orientation, Dark Mode and Dynamic Type. Test each, including the largest accessibility text sizes.
- [SHOULD] Reachability: frequent controls sit in the middle or bottom of the display. Flag primary actions placed only top-right.
- [SHOULD] Swipe to navigate back is supported, plus swipe actions on list rows. Apple calls this especially important for reachability.
- [SHOULD] Where the user permits, device data replaces manual entry (Apple Pay, Face ID/Touch ID, location). Flag forms that ask for what the device already knows.
- [SHOULD] Glance sessions (1–2 minutes) are served without forcing a deep path.
- [CONSIDER] System integration points where relevant: Widgets, Home Screen quick actions, Spotlight, Shortcuts, activity views (share sheet).
**Platform deltas**: Touch-first, one- or two-handed, portrait-dominant but rotates. Compared with iPad, fewer simultaneous views and more push navigation.
**Web (our translation)**: Mobile web puts primary actions in a bottom bar or thumb zone, with targets at the 44 px goal (24 px minimum, 48 for shared cross-platform code) and a 16 px body minimum. Support `autocomplete` attributes, WebAuthn/passkeys and Payment Request instead of manual entry. Respect user font scaling (rem). Minimum text is 12 px on web. Use the project's own breakpoints for popover versus full sheet on narrow screens.
**Slop tells (ours)**: Top-right "+" as the only create action. Desktop-style top nav squeezed onto phones. Native iOS: a hamburger menu hiding 4–5 primary destinations that should be a tab bar. Fixed px type that ignores user text size. No dark mode, or dark mode as inverted colors.

## Designing for iPadOS
**Intent**: A large display used hand-held, on a surface, or on a stand, at up to about 3 feet. Touch, keyboard, trackpad, Pencil and voice mix and combine. Sessions run from quick to hours long, with multiple apps onscreen at once.
**Checks**
- [SHOULD] The large display elevates content, with modal interfaces and full-screen transitions kept to a minimum. Flag phone-style push-everything navigation on iPad.
- [SHOULD] Controls are easy to reach but not in the way of content.
- [SHOULD] Size and density follow viewing distance and the current input mode (touch vs pointer).
- [SHOULD] Multi-Touch, physical keyboard and trackpad, and Apple Pencil all work.
- [CONSIDER] Interactions that combine input modes, such as Pencil plus touch, or a keyboard modifier plus drag.
- [SHOULD] The layout adapts to orientation, multitasking modes (Split View, windows), Dark Mode and Dynamic Type.
- [SHOULD] The app transitions effortlessly to running in macOS.
- [SHOULD] Drag and drop between apps, widgets and multitasking are supported.
**Platform deltas**: Between iPhone and Mac. It shows more hierarchy at once (sidebar plus detail) and must handle pointer and keyboard, but stays touch-first and controls remain finger-sized.
**Web (our translation)**: Tablet and medium breakpoints get their own layout (sidebar plus content), not a stretched phone layout or a cramped desktop one. Switch density with `@media (pointer: coarse/fine)` and `(hover: hover)`. Support native HTML5 drag and drop for files.
**Slop tells (ours)**: A tablet view that is a phone layout with huge side margins. Every tap opening a full-screen modal. Hover-dependent UI on touch tablets.

## Designing for macOS
**Intent**: Stationary use at about 1 to 3 feet, with large and often multiple displays. Keyboard and pointer are primary. Sessions run from minutes to hours of deep focus with many apps open, so active and inactive transitions matter.
**Checks**
- [SHOULD] Large displays show more content in fewer nested levels and with less modality, while density stays comfortable. Both too sparse and too dense fail.
- [SHOULD] Windows can be resized, hidden, shown and moved. Full-screen mode is supported for distraction-free work.
- [SHOULD] Every command is reachable from the menu bar. Flag commands that exist only as toolbar icons or context menus.
- [SHOULD] High-precision input allows pixel-perfect selection and editing.
- [SHOULD] Keyboard shortcuts are handled and keyboard-only workflows are fully supported.
- [SHOULD] Personalization is supported: customizable toolbars, configurable windows and views, user-chosen colors and fonts.
- [SHOULD] The inactive-window state is handled (de-emphasized chrome, preserved selection) for smooth app switching.
- [CONSIDER] Dock menus and file management (documents, Finder integration) where relevant.
- [SHOULD] Default text is 13 pt and the minimum is 10 pt; default button size is 28x28 pt and the minimum is 20x20 pt.
**Platform deltas**: The densest of the three: smaller default text (13 vs 17 pt) and controls (28 vs 44 pt), the menu bar as the command inventory, multiple windows, and user customization expected. iOS hides secondary actions; macOS exposes all of them via menus.
**Web (our translation)**: Dense desktop tools (dashboards, editors) measure against the macOS scale when the profile says dense: 13 pt body maps to 13–14 px. Offer a command palette or full menu as the complete command inventory, keyboard shortcuts with discoverable hints, resizable or collapsible sidebar and panes, denser tables. Use 16 px for reading content. Show which pane or window is active (focus rings). Minimum text on desktop web is 12 px. No numeric density heuristic exists in Apple text; judge density against the profile setting.
**Slop tells (ours)**: A desktop app built as a mobile app in a big window (44 px everything, huge padding, one column of cards). No keyboard shortcuts. Fixed-width centered content on a 27" display. Settings that don't persist. Right-click doing nothing.

## Designing for iPhone Duo
**Intent**: New in Sept 2026. Two displays (outer, used when closed; inner, used when open), each with a front camera, plus a center hinge. Poses: partially folded like a book, flat on a surface, standing on its edges. It is still an iPhone: all iOS guidance applies. Many sizes and poses make adaptive layout more important than ever; apps built with system components and resizing support adapt with little adjustment. Run Duo checks when an iOS app uses custom bars, fixed widths or odd-column grids, or when the profile lists Duo.
**Checks** (anatomy and poses)
- [SHOULD] No per-pose custom layouts. Use size classes: compact width is the outer display, regular width is the inner display. They give the fundamentals for every pose.
- [SHOULD] Don't reinvent the app when it resizes: let the existing layout expand into the available space (wording unverified).
- [SHOULD] On the outer display (and the inner display in landscape), toolbars and tab bars sit on the side to maximize vertical space. This is the system default.
- [SHOULD] The outer camera (in the corner, always visible, vertically aligned with side controls) is a reserved region and is accounted for (wording unverified).
**Checks** (best practices)
- [SHOULD] Build to resize with size classes, layout margins and safe area insets. No fixed widths, no display-specific dependencies.
- [SHOULD] Consistent experience across displays: same functionality and element state, information hierarchy intact. The inner display may add one more hierarchy level (Mail: list or message when closed, list and message when open).
- [SHOULD] Same functionality in every pose: controls may overflow and content may move, but every control and all content stays reachable.
- [SHOULD] Follow the system vertical layout for toolbars, tab bars and nav controls.
- [SHOULD] Games are playable in every pose. Portrait or landscape lock is allowed, but fill the screen. Keep text and control sizes consistent when resizing. Change aspect ratio rather than letterbox or pillarbox; if letterboxing is unavoidable, fill the padding with artwork.
**Checks** (dynamic layouts and reserved regions). Space is shaped by safe areas plus reserved regions, areas content avoids or components adapt to, analogous to the iPad window controls. There are three: (1) the outer camera, always present, which expands into the Dynamic Island for Live Activities; (2) the inner camera, present only when active, with the UI moving aside to signal it; (3) the folding region, conditional, which splits the inner display into usable regions when partially open and excludes the center strip.
- [SHOULD] Custom components avoid reserved regions (`ReservedRegion` in SwiftUI, `UIView.ReservedRegion` in UIKit). System alerts, context menus and sheets move automatically; split views adjust column widths and margins to the inner display's symmetry.
- [SHOULD] When folded, prefer self-adapting containers (the Notes split view keeps each pane clearly visible).
- [SHOULD] Grids use an even number of columns so content divides cleanly at the fold.
- [SHOULD] Important content stays clear of the center fold.
- [SHOULD] Avoid extreme layout changes when folding: move only what is needed to stay visible and tappable. Small adjustments beat rearrangement; controls that vanish or jump are hard to track.
- [CONSIDER] Arrangement views (new container, primary plus secondary view) when the layout already resembles one: HStack/VStack maps to split, ZStack to overlay. Split divides horizontally if wider than tall, vertically if taller than wide, and allowed axes can be limited. Overlay stacks views, which move to occupy each side when partially folded, and the secondary view can be collapsed.
- [SHOULD] Keep navigation outside arrangement views: wrap them in navigation split views or tab views, never the other way round.
Split views expand on the inner display and collapse to one pane on the outer, same as regular to compact on other iPhones.
**Checks** (vertical controls). Top and bottom bars move to the side edge to save vertical space and stay within reach. Exception: the inner display in portrait keeps horizontal bars. The side bar holds the Dynamic Island, status bar, toolbar (with nav buttons) and tab bar. In Split View on the inner display, each app puts its controls on its outer edge (left app on the left). Vertical controls stay aligned to the hardware, in the same position relative to the camera, and do not flip in RTL languages.
- [SHOULD] Asymmetry: safe areas keep side controls, including the other app's controls in Split View, off the content.
- [SHOULD] Controls' relative positions stay as similar as possible across poses so people don't relearn them.
- [SHOULD] Placement order on the vertical axis: the top is reserved for primary navigation (Back, Close), followed by prominent actions (Done). Remaining items keep their original groupings; the system adds space between items from the former top and bottom bars.
- [SHOULD] Overflow priority: items overflow bottom to top by default. Set visibility priority (groups first, then individual items) so frequent actions (Compose, New Note) and status-bearing items such as badges stay visible longest.
- [SHOULD] In general, don't override default bar placement; vertical controls are a core platform pattern.
- [CONSIDER] Full-width layouts for visual, non-scrolling, bar-less UIs (Calculator) if nothing conflicts with the Dynamic Island or status bar. A hybrid is allowed: a full-bleed background or header with inset scrollable content.
- [SHOULD] Group toolbar items (`ToolbarItemGroup` / `UIBarButtonItemGroup`) and avoid adding manual fixed spacing.
- [SHOULD] Controls stay near the content they affect: pane-specific controls stay with that pane rather than moving to the side (Mail's list controls stay above the leading pane).
- [SHOULD] Every non-text toolbar item has both a title and a symbol. The title is still required when only the symbol shows, because overflow menus and expanded forms use it.
- [SHOULD] Keep text-only buttons to a minimum: text labels stay in a horizontal bar, so prefer symbols.
- [SHOULD] Space-constrained bar compression: navigation-focused views push toolbar items into overflow and keep the tab bar (the default). Task-focused views minimize the tab bar and keep the toolbar.
- [SHOULD] Use the system overflow menu: merge custom overflow menus into it. Reserve the ellipsis symbol for overflow; other menus get a distinct symbol.
**Platform deltas**: Duo outer is close to a compact iPhone but wider and shorter. Duo inner is iPad-like regular width, but bars sit on the side in landscape. RTL does not mirror the side bars, unlike normal leading/trailing logic.
**Web (our translation)**: Closest analogues are foldables (CSS `env(viewport-segment-*)`, `@media (horizontal-viewport-segments: 2)`) and short-wide viewports. Transferable rules: no fixed widths; container-query layouts that expand rather than reshuffle; even-column grids; keep content off a center seam; a side rail instead of top and bottom bars when height is scarce (`max-aspect-ratio`); one overflow menu, with "⋯" used only for overflow; icon buttons with accessible names (`aria-label`, i.e. title plus symbol).
**Slop tells (ours)**: Hard-coded `max-width: 390px` mobile shells. A custom kebab menu next to the system overflow. "⋯" used for both overflow and a filter menu. Icon-only buttons with no accessible label. Breakpoint jumps that rearrange the whole page instead of reflowing. Odd-column (3-up) card grids split by a fold.

## Transferable from visionOS
**Intent**: Comfort is paramount. Content comes to people; people don't move to the content.
**Checks**
- [SHOULD] For each key moment, choose the minimum level of immersion that suits it. On phone and web, don't make every step full-screen, takeover or animated.
- [SHOULD] Prefer standard windowed UI with familiar controls for standard tasks; save novel presentation for distinctive moments.
- [SHOULD] Avoid motion that is overwhelming, jarring, too fast, or missing a stationary frame of reference.
- [SHOULD] Use system components, which come with accessibility built in.
**Platform deltas**: Default text 17 pt, minimum 12 pt; button 60x60 pt default, 28x28 pt minimum. For reference only; not a review target.
**Web (our translation)**: Keep a fixed anchor (header or nav) during transitions. Parallax and scroll-driven motion need a stable frame and must honor reduced motion.
**Slop tells (ours)**: Every section with a full-viewport animated reveal. Background motion with nothing stationary.

## Transferable from watchOS
**Intent**: Glanceable interactions under a minute. Related surfaces (complications, notifications) get used more than the app itself.
**Checks**
- [SHOULD] The most critical information shows on a single screen at a glance, with targeted actions taking a gesture or two. This applies to mobile home and summary views.
- [SHOULD] Hierarchy depth is minimized.
- [SHOULD] The experience is proactive, using on-device data to show what is relevant now or soon.
- [SHOULD] Notifications deliver timely, high-value information and allow actions without opening the app.
- [SHOULD] Background color conveys supporting information, and materials show hierarchy and a sense of place, not decoration.
**Platform deltas**: Default text 16 pt, minimum 12 pt; button 44x44 pt default, 28x28 pt minimum. For reference only.
**Web (our translation)**: Actionable notification and email CTAs. Dashboards lead with "what needs attention now", not static KPIs.
**Slop tells (ours)**: Notifications that just say "You have an update". Color used decoratively with no meaning.

## Transferable from tvOS
**Intent**: Very large display viewed from 8 feet or more, with remote or controller input and long immersive sessions.
**Checks**
- [SHOULD] A focus system gently highlights and expands the current item so people always know where they are. This maps to keyboard focus on web and desktop.
- [SHOULD] Sign-in is easy and infrequent, with shared and multi-profile accounts handled and profiles switched automatically.
**Platform deltas**: Default text 29 pt, minimum 23 pt; button 66x66 pt default, 56x56 pt minimum. For reference only.
**Web (our translation)**: A visible, styled `:focus-visible` (scale or highlight, not just the browser default ring). Avoid forced re-logins.
**Slop tells (ours)**: `outline: none` with no replacement. Session expiry that loses work.

## Transferable from games
**Intent**: Get people into the experience immediately. Pick smart defaults, teach in context, defer asks.
**Checks**
- [SHOULD] Time to value: the core is usable as soon as install or signup completes. Games: initial download of 30 minutes or less, with the rest fetched in the background.
- [SHOULD] Great defaults come from the device (resolution, paired accessories, the user's accessibility settings) so nothing needs configuring first.
- [SHOULD] Onboarding teaches in context ("teach through play"); written tutorials are an optional reference, not a prerequisite.
- [MUST] Get the player's permission before sensor or personal data access (Apple: "you must first get the player's permission").
- [SHOULD] Defer permission and rating requests to the moment the feature needs them and integrate the request into that scenario. Ask for a review only after quality time in the product.
- [SHOULD] Text contrasts with the background and meets platform minimums. Default/minimum text: iOS/iPadOS 17 pt / 11 pt, macOS 13 pt / 10 pt.
- [MUST] Buttons in iOS are at least 28x28 pt; 44x44 pt is the default to aim for. The games page says "must be at least 44x44 pt", but its own table and the Accessibility and Buttons pages give 44x44 pt as the default and 28x28 pt as the minimum, so a 32 pt control is a [SHOULD] miss against the 44 pt default, not a MUST breach. Default/minimum buttons: iOS/iPadOS 44x44 pt default, 28x28 pt minimum; macOS 28x28/20x20 (default/minimum).
- [SHOULD] Prefer resolution-independent (vector) assets.
- [SHOULD] Respect device features (rounded corners, camera housing) using safe areas.
- [SHOULD] Menus adapt to aspect ratios 16:10, 19.5:9 and 4:3 with relative constraints. Device-specific layouts only when necessary.
- [SHOULD] When moving from pointer to touch, pay special attention to control sizing and menu behavior.
- [SHOULD] Every physical-controller-dependent path has an alternative input.
- [SHOULD] Don't rely solely on color. Cutscenes and video need subtitles or a readable alternative.
- [SHOULD] Users can personalize type size, control mapping, motion intensity and sound balance.
- [SHOULD] Identity inputs (avatars, names) support the spectrum of self-identity. Avoid stereotypes.
**Platform deltas**: Default interaction per platform: iOS touch; iPadOS touch plus keyboard, mouse, trackpad and Pencil; macOS keyboard plus mouse and trackpad; tvOS remote. Sizes below are reference only, not review targets: min/default text tvOS 23/29 pt, visionOS 12/17 pt, watchOS 12/16 pt; default/min button tvOS 66x66/56x56, visionOS 60x60/28x28, watchOS 44x44/28x28 pt.
**Web (our translation)**: Show product value before asking for an account. Interactive empty states instead of tour overlays. Request permissions just in time. Captions on product videos. Vector icons and SVG. `env(safe-area-inset-*)` for notched devices in PWAs.
**Slop tells (ours)**: 5-step coachmark tours on first load. "Rate us!" prompts on day one. Raster icons blurry at 2x. Mobile layouts ignoring `safe-area-inset`, so content sits under the home indicator.

## Cross-cutting principles
1. **Adapt, don't reinvent.** iPhone Duo, iPadOS, games and Flexibility all say one layout that expands or reflows via size classes, margins and safe areas; no fixed widths; no per-device custom layouts unless necessary. Small adjustments beat rearrangement.
2. **Preserve context and position.** Controls keep predictable relative positions across sizes, poses and platforms. Checkable as a diff: render at two sizes and confirm controls did not jump.
3. **Less modality as space grows.** iPad minimizes modals and full-screen transitions. Mac has fewer nested levels and less modality. The Duo inner display adds one hierarchy level. Show more at once rather than pushing.
4. **Density follows viewing distance and input.** iPhone at most 1–2 ft, iPad about 3 ft, Mac 1–3 ft, TV 8 ft or more, Watch at most 1 ft. Text defaults 17/13/29/16 pt, button defaults 44/28/66/60 pt.
5. **Surface primary, make secondary discoverable.** Limit visible controls, but simplicity isn't minimalism. Secondary actions sit one interaction away. The overflow menu is singular and owns the ellipsis.
6. **Use system components and patterns.** Alerts, overflow menus, bar placement, split views and toolbar grouping adapt automatically, including to reserved regions and accessibility. Custom versions are a liability.
7. **Forgiveness and escape.** Every flow is skippable, every action reversible, recovery never costs work.
8. **Just-in-time asks with rationale.** Permissions, data and ratings are requested in the scenario that needs them, with a reason.
9. **Every input, every platform, same care.** Touch, keyboard, pointer, voice, Pencil, controller. Mac adds the menu bar as the full command inventory plus keyboard-only operation.
10. **Labels exist even when hidden.** Toolbar items carry a title plus a symbol; the title shows in overflow and accessibility. "Every icon has a name" is a hard check.
11. **Delight is the emotional thesis plus craft, not decoration.** Name the target emotion, then check that motion, color and copy express it without slowing the task.
12. **Stay current.** "Maintain your craft" and the Liquid Glass references on every Apple platform page make outdated idioms a craft defect (26+, gated by deployment target).

## Review setup notes
- **Platforms**: Infer the platform set from the project profile and code (Xcode project, app.json, package.json); ask only if missing. Checks differ sharply between platforms (44 vs 28 pt targets, menu bar vs tab bar).
- **Strictness on web**: Do not apply Apple point values literally. Use the web mapping: 44 px goal, 24 px minimum (WCAG 2.2), 16 px body (17 px for comfortable apps measured against the iOS scale), WCAG 2 ratios as the floor. Apple-native feel is not a goal for web.
- **Severity**: Apple's wording sets the strength tag. User impact sets the sort, so a SHOULD on reachability, undo, permission timing or missing labels can still be Major; it reaches Blocker only through a WCAG criterion or a Trust-gate item.
- **Evidence**: Resizing, Dynamic Type, Dark Mode and fold checks need multiple renders or code inspection. List what a single static image could not verify.
- **Stress content**: Check with long strings, empty, error, loading, RTL and the largest Dynamic Type.
