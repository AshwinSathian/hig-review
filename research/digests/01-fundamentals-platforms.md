# HIG Digest 01: Fundamentals & Platforms

Sources: Apple Human Interface Guidelines, developer.apple.com/design/human-interface-guidelines, snapshot 2026-10-23 (design principles and the iOS, iPadOS, macOS, iPhone Duo, visionOS, watchOS, tvOS and games pages).
Paraphrased digest for review purposes. Short quotations are attributed; consult the sources for the authoritative text.

Scope: human-interface-guidelines, getting-started, design-principles, designing-for-{ios, ipados, macos, iphone-duo, visionos, watchos, tvos, games}.
Severity key: [MUST] = Apple says must / don't / be sure; [SHOULD] = imperative best practice or "prioritize"; [CONSIDER] = "consider", "can", "might".
"Web translation" and "Slop tells" are **our inference**, not Apple text.

Note on source: the index (`human-interface-guidelines`) and `getting-started` are navigation-only pages. Their one useful signal is that Apple currently lists **iPhone Duo** under "Design fundamentals" and "New and updated" next to Layout and Branding. Design principles were reintroduced June 8, 2026, and the iPhone Duo page is new as of Sept 9, 2026. Both are recent, so older model knowledge won't cover them.

---

## Design principles (source: design-principles)

Eight principles: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight. Apple frames them as **tools for weighing competing priorities**, not rules. "There's no one right way."

### Purpose: "Make something meaningful"
- **Intent**: Design starts from what matters most to the people using it. Make those few things great and avoid rebuilding solutions that already exist.
- **Checks**:
  - Can the reviewer say in one sentence what the product is for, and does every screen visibly serve that purpose? [SHOULD]
  - Are the most important features clearly prioritized (placement, size, number of taps), with secondary features kept out of the way? [SHOULD]
  - Is there a specific point of difference? Flag a design that copies an existing category leader's layout without saying what sets it apart. [SHOULD]
- **Platform deltas**: none; applies to all platforms.
- **Web translation (inference)**: The landing view or dashboard should answer "what is this for" without scrolling. If a feature grid gives every feature equal weight, the product has no focus.
- **Slop tells (inference)**: Equal-weight 3- or 4-column feature cards. Generic heroes ("Supercharge your workflow"). Dashboards whose tiles are "whatever metrics the DB has" rather than what the user came to do.

### Agency: "Let people do things their own way"
- **Intent**: The interface serves people's goals. Give them freedom, keep them informed, and make recovery cheap so they feel safe exploring.
- **Checks**:
  - Is the primary task or content reachable right away, with no interstitials, splash marketing, or forced tours? [SHOULD]
  - Is the user never locked into a flow or mode? Can every guided flow (onboarding, wizard) be **skipped or escaped**? [SHOULD]
  - Is every destructive or consequential action reversible (undo, or a return to the previous state)? Recovery must not cost time or work: no lost form input, no re-doing steps. [SHOULD]
  - Does the system show status (what's happening now)? [SHOULD]
- **Platform deltas**: macOS expects Undo/Redo in the Edit menu and via ⌘Z. iOS supports shake/three-finger undo, but swipe-back and cancel are the main ways out.
- **Web translation (inference)**: Use undo toasts instead of "Are you sure?" modals. Wizards need a visible exit and saved drafts. Back-button and URL state should survive refresh.
- **Slop tells (inference)**: Unskippable multi-step onboarding carousels. Confirm dialogs on every delete instead of undo. Modals that wipe input when dismissed. Paywall or signup walls in front of the core value.

### Responsibility: "Act in people's best interest"
- **Intent**: Earn trust through safety, privacy, and transparency about what the product does and why.
- **Checks**:
  - Is every permission request preceded or accompanied by a **clear rationale** in context? [SHOULD]
  - Is data collection disclosed (what is collected and how it's used) and limited to what the product needs to work? [SHOULD]
  - Has misuse or abuse been anticipated (sharing, public profiles, messaging), with protections designed in? [SHOULD]
- **Platform deltas**: none in this page; see the Privacy digest.
- **Web translation (inference)**: Ask for browser permissions (location, notifications, camera) only on a user gesture, with an explanation first. Never request on page load.
- **Slop tells (inference)**: "Allow notifications?" on first load. Cookie walls with dark patterns. Signup forms asking for phone, company size, and role before showing anything.

### Familiarity: "Build on what people know"
- **Intent**: Real-world and established digital patterns make an app feel immediately at home. Consistency speeds learning and builds confidence.
- **Checks**:
  - Are established metaphors and platform patterns used rather than invented ones? [SHOULD]
  - **Internal consistency**: once an element's look or behavior is set, is it the same everywhere? Audit buttons, row styles, and icon meanings across screens. [SHOULD]
  - Is there clear feedback: control availability (enabled/disabled), signals when content changes, and **system patterns for alerts and choices** rather than custom ones? [SHOULD]
- **Platform deltas**: Each platform has its own "known patterns": the menu bar on macOS, tab bar plus swipe-back on iOS, sidebar plus multitasking on iPadOS.
- **Web translation (inference)**: Use native `<dialog>`, `<select>`, and form semantics, plus the conventions users expect from the OS they're on (e.g. ⌘ vs Ctrl shortcuts).
- **Slop tells (inference)**: Three different button styles for the same action across pages. Custom toast/alert components that replace native confirmation. Icons reused with different meanings. Hover effects on non-interactive cards (a false availability signal).

### Flexibility: "Adapt to diverse contexts and needs"
- **Intent**: Support as many people, devices, inputs, and perspectives as possible. Accessibility is a priority from the start, not a retrofit.
- **Checks**:
  - Was accessibility part of the design from the start, not deferred? Check for text scaling, contrast, and screen-reader labels in the initial design. [SHOULD]
  - **Preserve context**: do content and controls keep **consistent, predictable positions** as the layout adapts (rotation, resize, platform)? Are transitions eased with natural animation? [SHOULD]
  - Is each available input supported: touch, keyboard, voice, pointer, and more? [SHOULD]
  - Does every supported platform get **the same level of care**? Flag a strong primary platform paired with a neglected port. [SHOULD]
- **Platform deltas**: covered per platform below.
- **Web translation (inference)**: Full keyboard operability. Respect `prefers-reduced-motion`, `prefers-color-scheme`, and user font size. Mobile web should be designed, not just a squished desktop.
- **Slop tells (inference)**: A desktop-first layout that collapses to a hamburger plus stacked cards on mobile with no rethinking. Hover-only affordances. Focus outlines removed.

### Simplicity: "Be clear and direct"
- **Intent**: Every element earns its place. **"Simplicity isn't minimalism"**: keep important things close and let the rest fall away.
- **Checks**:
  - Can each element justify its presence? Flag decorative or duplicate elements. [SHOULD]
  - Are important things close by rather than hidden behind minimalism? Over-hiding is also a failure. [SHOULD]
  - Is copy concise: the exact words needed for each label or concept? [SHOULD]
  - Is there a clear hierarchy (recognizable controls, consistent structure) that tells people where they are and what comes next? [SHOULD]
- **Platform deltas**: none.
- **Web translation (inference)**: Use the same tests; the trap on the web is aesthetic minimalism that hides navigation or primary actions behind icons or menus.
- **Slop tells (inference)**: Huge whitespace with tiny gray text (minimalism mistaken for simplicity). Icon-only toolbars with no labels. Wordy microcopy ("Click here to get started on your journey"). Breadcrumbs and page titles that repeat each other.

### Craft: "Care about every detail"
- **Intent**: Quality sets the tone. Deliberate visuals, motion, wording, and audio, kept current with the platform.
- **Checks**:
  - Is every visual, animation, word, and sound a deliberate decision rather than a default? [SHOULD]
  - Has the design been tested in **real-world settings** (real data lengths, slow networks, outdoors, one-handed)? [SHOULD]
  - **Maintain craft**: does the design use current platform capabilities and patterns? Currently that means Liquid Glass and the new design system, which the iOS, iPadOS, and macOS pages all point to. Flag outdated idioms. [SHOULD]
- **Platform deltas**: The macOS resources call out "Build an AppKit app with the new design". The new material system is cross-platform.
- **Web translation (inference)**: Check with real content (long names, empty, error, loading states), not lorem ipsum. Stale framework-default styling counts as failing "maintain craft".
- **Slop tells (inference)**: Mock data that's suspiciously perfect (all names 8 characters, all avatars present). No empty, error, or loading states. Default component-library theming left unchanged. Generic stock-illustration error pages.

### Delight: "Make it human"
- **Intent**: Choose the emotion the product should evoke (energize, calm, thrill) and let it shape the design. Delight is the sum of the care taken, **not decoration**.
- **Checks**:
  - Can the team name the target emotion, and does the visual and motion language express it? [SHOULD]
  - Are there **defining moments**, places where character shows, including in small moments like a button press or **an error message**? [CONSIDER]
  - Does no delight element (animation, illustration, whimsy) slow down or block the core task? [SHOULD]
  - Is whimsy vs. practical restraint a deliberate choice for this product? [SHOULD]
- **Platform deltas**: none.
- **Web translation (inference)**: Use micro-interactions that confirm actions; avoid scroll-jacking showpieces.
- **Slop tells (inference)**: Gratuitous gradient blobs, glassmorphism, and confetti with no emotional thesis. Every product "feels" the same (purple-blue gradient, rounded cards). Lottie animations that delay content. Error messages with no voice ("Something went wrong").

---

## Designing for iOS (source: designing-for-ios)
- **Intent**: iPhone is a medium-size, hand-held, on-the-go device at a viewing distance of **no more than a foot or two**. Sessions range from 1–2 minutes of checking to an hour or more of immersion, with frequent app switching.
- **Checks**:
  - Is the number of **onscreen controls limited** so the primary task and content dominate, with secondary details and actions **discoverable with minimal interaction** (menus, context menus, swipe)? [SHOULD]
  - Does the layout adapt cleanly to **orientation, Dark Mode, and Dynamic Type**? Test each, including the largest accessibility text sizes. [SHOULD]
  - **Reachability**: are frequent controls in the **middle or bottom** of the display? Flag primary actions placed only top-right. [SHOULD]
  - Is **swipe to navigate back** supported, plus **swipe actions on list rows**? Apple calls this especially important for reachability. [SHOULD]
  - Where the user permits, is device data used instead of manual entry (Apple Pay, Face ID/Touch ID, location)? Flag forms that ask for what the device already knows. [SHOULD]
  - Does the app use system integration points where relevant: Widgets, Home Screen quick actions, Spotlight, Shortcuts, activity views (share sheet)? [CONSIDER]
  - Are glance sessions (1–2 minutes) served without forcing a deep path? [SHOULD]
  - Default/minimum text size **17 pt / 11 pt**; default/minimum button size **44x44 pt / 28x28 pt** ("buttons in iOS must be at least 44x44 pt", from the games page). [MUST for 44x44 touch targets]
- **Platform deltas**: iOS is touch-first, one- or two-handed, and portrait-dominant but rotates. Compared with iPad, it has fewer simultaneous views and more push navigation.
- **Web translation (inference)**: On mobile web, put primary actions in a bottom bar or thumb zone and use touch targets of at least 44 CSS px. Support `autocomplete` attributes, WebAuthn/passkeys, and Payment Request instead of manual entry. Respect user font scaling (rem-based type).
- **Slop tells (inference)**: Top-right "+" as the only create action. Desktop-style top nav squeezed onto phones. Hamburger menu hiding 4–5 primary destinations that should be a tab bar. Fixed px type that ignores user text size. No dark mode, or dark mode as inverted colors.

## Designing for iPadOS (source: designing-for-ipados)
- **Intent**: A large display used hand-held, on a surface, or on a stand, at up to **about 3 feet**. Mixed and combined inputs (touch, keyboard, trackpad, Pencil, voice). Sessions run from quick to hours long, with multiple apps onscreen at once.
- **Checks**:
  - Does the large display **elevate content**, with modal interfaces and full-screen transitions kept to a minimum? Flag phone-style push-everything navigation on iPad. [SHOULD]
  - Are controls easy to reach but **not in the way** of content? [SHOULD]
  - Is **size and density** chosen based on viewing distance and the current input mode (touch vs. pointer)? [SHOULD]
  - Do Multi-Touch, physical keyboard and trackpad, and Apple Pencil all work? Consider interactions that **combine input modes** (e.g. Pencil plus touch, keyboard modifier plus drag). [SHOULD / CONSIDER for combined]
  - Does the layout adapt to **orientation, multitasking modes (Split View, windows), Dark Mode, and Dynamic Type**? [SHOULD]
  - Does the app **transition effortlessly to running in macOS**? [SHOULD]
  - Are drag and drop between apps, widgets, and multitasking supported? [SHOULD]
- **Platform deltas**: iPad sits between iPhone and Mac. Unlike iPhone it shows more hierarchy at once (sidebar plus detail) and must handle pointer and keyboard. Unlike Mac it stays touch-first and controls must remain finger-sized.
- **Web translation (inference)**: Tablet and medium breakpoints need their own layout (sidebar plus content), not a stretched phone layout or a cramped desktop one. Use pointer media queries (`@media (pointer: coarse/fine)`, `(hover: hover)`) to switch density. Support native HTML5 drag and drop for files.
- **Slop tells (inference)**: Tablet view as a phone layout with huge side margins. Every tap opening a full-screen modal. Hover-dependent UI on touch tablets.

## Designing for macOS (source: designing-for-macos)
- **Intent**: Stationary use at **about 1 to 3 feet**, with large and often multiple displays. Keyboard and pointer are primary. Sessions run from minutes to hours of deep focus with many apps open, so active/inactive transitions matter.
- **Checks**:
  - Are large displays used to show **more content in fewer nested levels** and **with less modality**, while keeping density **comfortable** (no straining)? Both too sparse and too dense fail. [SHOULD]
  - Can windows be **resized, hidden, shown, and moved**? Is **full-screen mode** supported for distraction-free work? [SHOULD]
  - Is **every command** reachable from the **menu bar**? Flag commands that exist only as toolbar icons or context menus. [SHOULD]
  - Does high-precision input allow **pixel-perfect selection and editing**? [SHOULD]
  - Are keyboard shortcuts handled and **keyboard-only workflows** fully supported? [SHOULD]
  - Is personalization supported: **customizable toolbars**, configurable windows/views, user-chosen **colors and fonts**? [SHOULD]
  - Is the inactive-window state handled (de-emphasized chrome, preserved selection) for smooth app switching? [SHOULD]
  - Are Dock menus and file management (documents, Finder integration) used where relevant? [CONSIDER]
  - Default/minimum text size **13 pt / 10 pt**; default/minimum button size **28x28 pt / 20x20 pt**. [SHOULD]
- **Platform deltas**: Mac is the densest of the three: smaller default text (13 vs. 17 pt) and controls (28 vs. 44 pt), the menu bar as the command inventory, multiple windows, and user customization expected. iOS hides secondary actions; macOS exposes all of them via menus.
- **Web translation (inference)**: Desktop web apps (dashboards, editors) should offer a command palette or full menu as the complete command inventory, keyboard shortcuts with discoverable hints, a resizable/collapsible sidebar and panes, and denser tables. 13–14 px base text is acceptable in tool UIs; 16 px is better for reading content. Show which window is active (e.g. focus rings).
- **Slop tells (inference)**: A desktop app built as a mobile app in a big window (44 px everything, huge padding, one column of cards). No keyboard shortcuts. Fixed-width centered content on a 27" display. Settings that don't persist. Right-click doing nothing.

## Designing for iPhone Duo (source: designing-for-iphone-duo) — NEW, Sept 2026
Device: two displays (outer, used when closed; inner, used when open), each with a front camera, plus a center hinge. Poses: partially folded like a book, flat on a surface, standing on its edges. **It's still an iPhone: all iOS guidance applies.**

### Anatomy & poses
- **Intent**: Many sizes and poses make adaptive layout more important than ever. Apps built with system components and resizing support adapt "with little adjustment".
- **Checks**:
  - Are there **no per-pose custom layouts**? Use size classes: **compact width = outer display, regular width = inner display**, which "give you the fundamentals for every pose". [SHOULD]
  - **Don't reinvent the app when it resizes**: let the existing layout expand into the available space. [SHOULD]
  - On the outer display (and the inner display in landscape), do **toolbars and tab bars sit on the side** to maximize vertical space? [SHOULD, system default]
  - Is the outer camera (in the corner, always visible, vertically aligned with side controls) accounted for? [MUST, it is a reserved region]

### Best practices
- **Checks**:
  - **Build to resize**: use size classes, layout margins, and safe area insets. **No fixed widths, no display-specific dependencies.** [SHOULD]
  - **Consistent experience across displays**: keep functionality and element state the same between displays and the information hierarchy intact. The inner display **may add one more hierarchy level** (Mail: list *or* message when closed, list *and* message when open). [SHOULD]
  - **Same functionality in every pose**: controls may overflow and content may move, but every control and all content stays reachable. [SHOULD]
  - **Follow the system vertical layout** for toolbars, tab bars, and nav controls. [SHOULD]
  - Games: **playable in every pose**. Portrait or landscape lock is allowed, but fill the screen. Keep text and control sizes consistent when resizing. **Change aspect ratio rather than letterbox or pillarbox**; if letterboxing is unavoidable, **fill the padding with artwork**. [SHOULD]

### Dynamic layouts & reserved regions
- **Intent**: Space is shaped by safe areas *plus* **reserved regions**, areas content avoids or components adapt to (analogous to the iPad window controls).
- **Reserved regions**: (1) the **outer camera**, always present, which expands into the Dynamic Island for Live Activities; (2) the **inner camera**, present only when active, with the UI moving aside to signal it; (3) the **folding region**, conditional, which splits the inner display into usable regions when partially open and excludes the center strip.
- **Checks**:
  - Do custom components avoid reserved regions (`ReservedRegion` in SwiftUI, `UIView.ReservedRegion` in UIKit)? System alerts, context menus, and sheets move automatically; split views adjust column widths and margins to the inner display's symmetry. [SHOULD]
  - When folded, prefer **self-adapting containers** (the Notes split view keeps each pane clearly visible). [SHOULD]
  - **Grids: prefer an even number of columns** so content divides cleanly at the fold. [SHOULD]
  - Is important content kept clear of the center fold? [SHOULD]
  - **Avoid extreme layout changes when folding**: move only what's needed to stay visible and tappable. Prefer small adjustments over rearrangement; controls that vanish or jump are hard to track. [SHOULD]
- **Split views**: expand on the inner display and collapse to one pane on the outer, same as regular↔compact on other iPhones.
- **Arrangement views** (new container: primary plus secondary view):
  - *Split*: splits horizontally if wider than tall, vertically if taller than wide. Allowed axes can be limited.
  - *Overlay*: views stack, and when partially folded they move to occupy each side. The secondary view can be collapsed.
  - Use one when the layout already resembles one: HStack/VStack → split, ZStack → overlay. [CONSIDER]
  - **Keep navigation outside arrangement views**: wrap them in navigation split views or tab views, never the other way round. [SHOULD]

### Vertical controls
- **Intent**: Top and bottom bars move to the side edge to save vertical space and stay within reach. **Exception: the inner display in portrait keeps horizontal bars.** The side bar holds the Dynamic Island, status bar, toolbar (with nav buttons), and tab bar.
- Facts: In Split View on the inner display, each app puts its controls on **its outer edge** (left app on the left). Vertical controls stay aligned to the hardware, holding the same position relative to the camera, and **do not flip in RTL languages**.
- **Checks**:
  - **Asymmetry**: do safe areas keep side controls, including the *other* app's controls in Split View, off the content? [SHOULD]
  - Are controls' **relative positions** kept as similar as possible across poses so people don't relearn them? [SHOULD]
  - **Placement order on the vertical axis**: the top is reserved for primary navigation (Back, Close), followed by prominent actions (Done). Remaining items keep their original groupings; the system adds space between items from the former top and bottom bars. [SHOULD]
  - **Overflow priority**: items overflow **bottom to top** by default. Set visibility priority (groups first, then individual items) so frequent actions (Compose, New Note) and **status-bearing items such as badges** stay visible longest. [SHOULD]
  - **Don't override default bar placement** in general; vertical controls are a core platform pattern. [SHOULD (stated "in general, don't")]
  - **Full-width layouts** are OK for visual, non-scrolling, bar-less UIs (Calculator) if nothing conflicts with the Dynamic Island or status bar. A hybrid is allowed: a full-bleed background or header with inset scrollable content. [CONSIDER]
  - **Group toolbar items** (`ToolbarItemGroup` / `UIBarButtonItemGroup`) and **don't add manual fixed spacing**. [SHOULD]
  - **Controls stay near the content they affect**: pane-specific controls stay with that pane rather than moving to the side (Mail's list controls stay above the leading pane). [SHOULD]
  - **Every non-text toolbar item has both a title and a symbol**. The title is still required when only the symbol shows, because overflow menus and expanded forms use it. [SHOULD]
  - **Keep text-only buttons to a minimum**: text labels stay in a horizontal bar, so prefer symbols. [SHOULD]
  - **Space-constrained bar compression**: navigation-focused views push toolbar items into overflow and keep the tab bar (the default). Task-focused views minimize the tab bar and keep the toolbar. [SHOULD]
  - **Use the system overflow menu**: merge custom overflow menus into it. **Reserve the ellipsis symbol for overflow**; other menus get a distinct symbol. [SHOULD]
- **Platform deltas**: Duo outer ≈ compact iPhone but **wider and shorter**. Duo inner ≈ iPad-like regular width, but bars sit on the side in landscape. RTL does not mirror the side bars, unlike normal leading/trailing logic.
- **Web translation (inference)**: Closest web analogues are foldables (CSS `env(viewport-segment-*)`, `@media (horizontal-viewport-segments: 2)`) and short-wide viewports. Transferable rules: no fixed widths; container-query layouts that expand rather than reshuffle; even-column grids; keep content off a center seam; a side rail instead of top and bottom bars when height is scarce (`max-aspect-ratio`); one overflow menu, with "⋯" used only for overflow; icon buttons with accessible names (`aria-label`, i.e. title plus symbol).
- **Slop tells (inference)**: Hard-coded `max-width: 390px` mobile shells. A custom kebab menu next to the system overflow. "⋯" used for both overflow and a filter menu. Icon-only buttons with no accessible label. Breakpoint jumps that rearrange the whole page instead of reflowing. Odd-column (3-up) card grids split by a fold.

---

## Brief: visionOS (source: designing-for-visionos) — transferable only
- **Intent**: Comfort is paramount. Content comes to people; people don't move to the content.
- **Checks (transferable)**:
  - For each key moment, choose the **minimum level of immersion** that suits it, and don't assume every moment needs to be immersive. On phone and web this means not making every step full-screen, takeover, or animated. [SHOULD]
  - Prefer **standard windowed UI with familiar controls** for standard tasks; save novel presentation for distinctive moments. [SHOULD]
  - Avoid motion that is **overwhelming, jarring, too fast, or missing a stationary frame of reference**. [SHOULD]
  - Use system components, which come with accessibility built in. [SHOULD]
  - Default/minimum text **17 pt / 12 pt**; button **60x60 / 28x28 pt**.
- **Web translation (inference)**: Keep a fixed anchor (header or nav) during transitions. Parallax and scroll-driven motion need a stable frame and must honor reduced motion.
- **Slop tells (inference)**: Every section with a full-viewport animated reveal. Background motion with nothing stationary.

## Brief: watchOS (source: designing-for-watchos) — transferable only
- **Intent**: Glanceable interactions under a minute. Related surfaces (complications, notifications) get used more than the app itself.
- **Checks (transferable)**:
  - Does the most critical information show **on a single screen, at a glance**, with targeted actions taking **a gesture or two**? This applies to mobile home and summary views. [SHOULD]
  - Is **hierarchy depth** minimized? [SHOULD]
  - Is the experience **proactive**, using on-device data to show what's relevant now or soon? [SHOULD]
  - Do notifications deliver **timely, high-value** information and allow **actions without opening the app**? [SHOULD]
  - Is **background color** used to convey supporting information and **materials** to show hierarchy and a sense of place (not decoration)? [SHOULD]
  - Default/minimum text **16 pt / 12 pt**; button **44x44 / 28x28 pt**.
- **Web translation (inference)**: Actionable notification and email CTAs. Dashboards should lead with "what needs attention now", not static KPIs.
- **Slop tells (inference)**: Notifications that just say "You have an update". Color used decoratively with no meaning.

## Brief: tvOS (source: designing-for-tvos) — transferable only
- **Intent**: Very large display viewed from **8 feet or more**, with remote or controller input and long immersive sessions.
- **Checks (transferable)**:
  - Does a **focus system** gently highlight and expand the current item so people always know where they are? This maps to keyboard focus on the web and desktop. [SHOULD]
  - Is sign-in **easy and infrequent**, with shared and multi-profile accounts handled and profiles switched automatically? [SHOULD]
  - Default/minimum text **29 pt / 23 pt**; button **66x66 / 56x56 pt**.
- **Web translation (inference)**: A visible, styled `:focus-visible` (scale or highlight, not just the browser default ring). Avoid forced re-logins.
- **Slop tells (inference)**: `outline: none` with no replacement. Session expiry that loses work.

## Brief: Games (source: designing-for-games) — transferable only
- **Intent**: Get people into the experience immediately. Pick smart defaults, teach in context, defer asks.
- **Checks (transferable)**:
  - **Time to value**: is the core usable as soon as install or signup completes? (Games: initial download **30 minutes or less**; fetch the rest in the background.) [SHOULD]
  - Are **great defaults** derived from the device (resolution, paired accessories, **the user's accessibility settings**) so nothing needs configuring first? [SHOULD]
  - Does onboarding **teach in context** ("teach through play"), with written tutorials as an optional reference rather than a prerequisite? [SHOULD]
  - **Defer permission and rating requests** to the moment the feature needs them, and integrate the request into that scenario. Ask for a review only after quality time in the product. [MUST get permission before sensor or personal data access; SHOULD on timing]
  - **Text must contrast** with the background and meet platform minimums. Min/default sizes: iOS/iPadOS 11/17 pt, macOS 10/13 pt, tvOS 23/29 pt, visionOS 12/17 pt, watchOS 12/16 pt. [MUST in spirit: "make sure"]
  - Button default/min: iOS/iPadOS 44x44/28x28, macOS 28x28/20x20, tvOS 66x66/56x56, visionOS 60x60/28x28, watchOS 44x44/28x28 pt. [MUST for iOS 44x44]
  - Prefer **resolution-independent** (vector) assets. [SHOULD]
  - Respect device features (rounded corners, camera housing) using **safe areas**. [SHOULD]
  - Menus adapt to aspect ratios **16:10, 19.5:9, 4:3** with relative constraints. Device-specific layouts **only when necessary**. [SHOULD]
  - When moving from pointer to touch, pay special attention to **control sizing and menu behavior**. [SHOULD]
  - Every physical-controller-dependent path needs an **alternative input**. [SHOULD]
  - **Don't rely solely on color**. Cutscenes and video need **subtitles** or a readable alternative. [SHOULD]
  - Let users personalize **type size, control mapping, motion intensity, sound balance**. [SHOULD]
  - Identity inputs (avatars, names) support the **spectrum of self-identity**. Avoid stereotypes. [SHOULD]
  - Default interaction per platform: iOS touch; iPadOS touch plus keyboard/mouse/trackpad/Pencil; macOS keyboard plus mouse/trackpad; tvOS remote.
- **Web translation (inference)**: Show product value before asking for an account. Use interactive empty states instead of tour overlays. Request permissions just in time. Captions on product videos. Vector icons and SVG. `env(safe-area-inset-*)` for notched devices in PWAs.
- **Slop tells (inference)**: 5-step coachmark tours on first load. "Rate us!" prompts on day one. Raster icons blurry at 2x. Mobile layouts ignoring `safe-area-inset`, so content sits under the home indicator.

---

## Cross-cutting principles
1. **Adapt, don't reinvent.** iPhone Duo, iPadOS, games, and the Flexibility principle all say: one layout that expands or reflows via size classes, margins, and safe areas; no fixed widths; no per-device custom layouts unless necessary. Small adjustments beat rearrangement.
2. **Preserve context and position.** Controls keep predictable relative positions across sizes, poses, and platforms (Flexibility, Duo vertical controls, Duo fold behavior). This is a checkable diff: compare the screen at two sizes and confirm controls didn't jump.
3. **Less modality as space grows.** iPad: minimize modals and full-screen transitions. Mac: fewer nested levels, less modality. Duo inner display: one extra hierarchy level. Show more at once rather than pushing.
4. **Density follows viewing distance and input.** Distances are stated explicitly (iPhone ≤1–2 ft, iPad ~3 ft, Mac 1–3 ft, TV ≥8 ft, Watch ≤1 ft), with the sizing numbers tied to them (text 17/13/29/16 pt, buttons 44/28/66/60 pt).
5. **Surface primary, make secondary discoverable.** Limit visible controls (iOS), but "simplicity isn't minimalism". Important things stay close, and secondary actions sit one interaction away. The overflow menu is singular and owns the ellipsis.
6. **Use system components and system patterns.** Alerts, overflow menus, bar placement, split views, and toolbar grouping adapt automatically, including to reserved regions and accessibility. Custom versions are a liability.
7. **Forgiveness and escape.** Every flow is skippable, every action reversible, and recovery never costs work.
8. **Just-in-time asks with rationale.** Permissions, data, and ratings are requested in the scenario that needs them, with a reason given.
9. **Every input, every platform, same care.** Touch, keyboard, pointer, voice, Pencil, controller. Mac adds the menu bar as the full command inventory plus keyboard-only operation.
10. **Labels always exist even when hidden.** Toolbar items carry a title plus a symbol, and the title shows up in overflow and accessibility. This makes "every icon has a name" a hard check.
11. **Delight is the emotional thesis plus craft, not decoration.** Name the target emotion, then check that motion, color, and copy express it without slowing the task.
12. **Stay current.** "Maintain your craft" plus Liquid Glass references on every Apple platform page: outdated idioms are a craft defect.

## Open questions for skill design
1. **Target platform set per review.** Should the skill require the user to declare platforms (iOS / iPadOS / macOS / Duo / web), or infer them from the artifact? The checks differ sharply (44 vs. 28 pt targets, menu bar vs. tab bar).
2. **How strict for web?** Apply Apple point values literally to web (44 CSS px targets, 17 px body), or map them to WCAG and platform norms (24 px WCAG 2.2 AA minimum target, 16 px body)? Should Apple-native-feel be a goal for web apps at all?
3. **Severity calibration.** Apple uses "must" rarely; nearly everything is SHOULD. Should the skill promote some SHOULDs to blockers (reachability, undo, permission timing, missing labels) based on impact rather than Apple's wording?
4. **iPhone Duo coverage.** It's brand new (Sept 2026) and largely automatic with system components. Run Duo checks only when the user opts in, or whenever an iOS app uses custom bars, fixed widths, or odd-column grids?
5. **Input artifacts.** Will reviews run on screenshots, Figma, live web (Playwright), or SwiftUI code? Several checks (resizing behavior, Dynamic Type, Dark Mode, fold behavior) require multiple renders or code inspection, not one static image.
6. **"Delight" and "Purpose" are subjective.** Should the skill ask the user up front for the product's one-sentence purpose and target emotion so it can judge alignment, rather than guessing?
7. **Liquid Glass / current design system.** Treat adopting the new material system as a check (craft currency) or out of scope? Web has no equivalent, and copying it risks a new slop pattern (glassmorphism everywhere).
8. **Slop-tell list ownership.** Our slop tells are inference. Does the user want them as a separate, editable list (versioned taste rules) kept apart from HIG-derived checks so they don't gain false Apple authority?
9. **Real-data testing.** Should the skill demand or generate stress content (long strings, empty, error, loading, RTL, largest Dynamic Type) as part of every review?
10. **Mac density bar.** What counts as "comfortable density" for a web dashboard? Do we need a numeric heuristic (e.g. row height or base font ranges) since Apple gives none beyond the 13 pt default?
