# Digest 05: Components (content, layout/organization, menus/actions, navigation/search)

Sources: Apple Human Interface Guidelines, developer.apple.com/design/human-interface-guidelines, snapshot 2026-10-23 (the Components pages for content, layout and organization, menus and actions, navigation and search).
Paraphrased digest for review purposes. Short quotations are attributed; consult the sources for the authoritative text.

Severity mapping (how Apple phrases it): **[MUST]** = "Don't / Always / essential / never / reserve"; **[SHOULD]** = plain imperative "Use / Avoid / Prefer / Make sure"; **[CONSIDER]** = "Consider / When possible / If it makes sense".
"Web translation" and "Slop tells" lines are **our inference**, not HIG text.
Index pages (components, content, layout-and-organization, menus-and-actions, navigation-and-search) are table-of-contents only; no guidance. Not repeated below.

---

## Charts (source: charts)
- **Intent**: A chart should surface a few key insights, not dump a dataset. Data most prominent; axes and descriptions support it.
- **Checks**:
  - [SHOULD] Mark type matches the message: bar = compare categories, part-to-whole, or per-period sums (e.g., steps/day); line = change/trend over time; point = relation between two properties, outliers, clusters. Combining line+point is fine when it adds clarity.
  - [SHOULD] Axis range: fixed when bounds mean something (battery 0–100%); dynamic when values vary widely (Health Steps scales so the max sits near the top).
  - [SHOULD] Lower bound fits the mark: bars start at zero. Lines don't have to (heart rate starting at 0 hides resting-vs-active differences).
  - [SHOULD] Tick sequences use familiar steps (0, 5, 10), not odd ones (1, 6, 11).
  - [SHOULD] Grid density fits the task: interactive charts get fewer, lighter grid lines.
  - [MUST-ish "essential"] Title/subtitle states the takeaway (Weather: "rain stopping in 20 min"-style summary), so no one has to read the plot to get the point.
  - [MUST "essential"] Every chart is accessible: per-element accessibility labels (or grouped labels when the chart's purpose is a summary, e.g. Maps elevation), Audio Graphs or an equivalent overview (chart type, what each axis means, bounds).
  - [SHOULD] Interaction is optional. Critical info must not need a hover or scrub to show up.
  - [CONSIDER] Small marks: make the whole plot area the hit target, with scrub-to-inspect.
  - [SHOULD] Keyboard/Switch Control get a logical path (along X, or by subsets for big datasets), not file order.
  - [SHOULD] Changes to marks or axes are animated *and* announced (accessibility notification), so users with Reduce Motion or VoiceOver still notice.
  - [SHOULD] Leading edge aligns with surrounding views. Put Y-axis labels on the trailing side so they don't stick out past the leading edge.
  - [SHOULD] Color is never the only encoding. Add shape or pattern (Health blood pressure uses two point shapes). Put separators between stacked segments.
  - [SHOULD] Accessibility labels: real values, no subjective words ("rapidly", "almost"), no ambiguous formats ("June 6", not "6/6"; "60 minutes", not "60m"), describe what a series *means*, not its color, refer to axes in a consistent order. Hide visible axis/tick labels from assistive tech.
  - [SHOULD] Compact width: make the plot area as wide as possible, keep Y labels short, move units into the title.
- **Platform deltas**: Same on iOS, iPadOS, macOS. watchOS: glanceable only, no complex interaction.
- **Web translation (inference)**: Use `role="img"` + an `aria-label` summary or a data table fallback, show the takeaway in the heading, never put key numbers only in tooltips, and check with forced-colors and grayscale.
- **Slop tells (inference)**: Gradient-filled area chart with no summary title. Dashboards where every KPI card has a decorative sparkline with no axis or meaning. Bars not starting at zero. Rainbow categorical palette with color as the only encoding. Values only visible on hover. Gridlines at full contrast.

## Image views (source: image-views)
- **Intent**: Display-only image container. Not interactive.
- **Checks**:
  - [SHOULD] Clickable image → use a button that shows the image (macOS: an *image button*), not an image view with tap handlers bolted on.
  - [SHOULD] Icons → SF Symbols or template icons (they take the accent color), not raster images.
  - [SHOULD] Text over an image needs contrast help (shadow or background layer).
  - [SHOULD] Frames of an animated sequence all share one size.
  - macOS: editable image → *image well* (copy, paste, drag, Delete to clear).
- **Platform deltas**: macOS adds image wells and image buttons. iOS/iPadOS: nothing extra.
- **Web translation (inference)**: `<img>` is for display. A clickable image belongs inside a `<button>` or `<a>`, not a `div onClick`. Inline SVG icons should use `currentColor`.
- **Slop tells (inference)**: PNG icons that ignore theme/accent. Hero text over a photo with no scrim. Clickable thumbnails with no focus or press state.

## Text views (source: text-views)
- **Intent**: Multiline, styled, optionally editable text. For short text use a label or text field.
- **Checks**:
  - [SHOULD] Choose by size: label = short and read-only; text field = short and editable; text view = long, editable, or specially formatted.
  - [SHOULD] Support Dynamic Type. Test with Bold Text and other accessibility settings.
  - [CONSIDER] Make useful text selectable: error messages, serial numbers, IP addresses.
  - iOS/iPadOS [SHOULD]: show the keyboard type that matches the content.
- **Web translation (inference)**: Don't disable `user-select` on error text or IDs. Set `inputmode`/`type` on inputs. Use `rem`-based type that honors browser zoom.
- **Slop tells (inference)**: Toast error messages that can't be copied. `user-select:none` everywhere. A textarea used for a one-line value.

## Web views (source: web-views)
- **Intent**: Embedded web content in an app (e.g., Mail's HTML).
- **Checks**:
  - [SHOULD] If users can follow links across several pages, provide back/forward controls. They're not on by default.
  - [SHOULD] Don't rebuild a browser. Brief in-context visits only; Safari is for browsing.
- **Web translation (inference)**: Same for iframes and embedded help: open external links out, or give in-pane back navigation.
- **Slop tells (inference)**: Wrapper apps that are just a web view with a fake browser chrome.

## Boxes (source: boxes)
- **Intent**: Visually group related controls and info (GroupBox/NSBox).
- **Checks**:
  - [SHOULD] Keep a box small relative to its container. A box close to window size stops reading as a grouping.
  - [CONSIDER] Show subgroups inside a box with padding and alignment, **not nested boxes** (they make the UI feel busy and cramped).
  - [CONSIDER] Short title only if it clarifies; sentence case; no ending punctuation (exception: a settings pane adds a colon).
- **Platform deltas**: iOS/iPadOS default to secondary/tertiary background fills. macOS puts the title above the box.
- **Web translation (inference)**: Use a `<fieldset>`/card for real groupings only. Show sub-structure with spacing, not borders.
- **Slop tells (inference)**: **Cards inside cards inside cards**. A full-page card wrapper around everything. Every section in a bordered rounded rect with a Title Case heading.

## Collections (source: collections)
- **Intent**: Ordered, visual (usually image-based) content in a row or grid.
- **Checks**:
  - [SHOULD] Use the standard row/grid. Avoid custom layouts that draw attention to themselves.
  - [CONSIDER] Text content → use a table/list, not a grid of cards.
  - [SHOULD] Leave enough padding that focus/hover effects show and items don't overlap.
  - [CONSIDER] Animate insert, delete, and reorder.
  - iOS/iPadOS [SHOULD]: don't change the layout while someone is interacting, unless they asked for it.
- **Web translation (inference)**: CSS grid with consistent tracks. Use a list/table for text-heavy items. Respect `prefers-reduced-motion` on reorder animations.
- **Slop tells (inference)**: Text-only "feature cards" laid out in a 3-column grid. Masonry layouts for uniform content. Grid reflows on hover.

## Column views (source: column-views)
- **Intent**: macOS-only browser (Finder columns) for deep hierarchies with frequent back-and-forth between levels and no need for sorting.
- **Checks**:
  - [SHOULD] Root level in the first column.
  - [CONSIDER] At a leaf, show a preview/info pane (Finder shows file metadata).
  - [SHOULD] Columns are resizable.
  - Use a list/table instead if sorting matters. iPadOS/visionOS: use a split view.
- **Platform deltas**: macOS only.
- **Web translation (inference)**: Miller columns suit file or taxonomy browsers. Columns need resize handles and keyboard arrow navigation.
- **Slop tells (inference)**: Nested accordions 4+ deep where a column browser or split view belongs.

## Disclosure controls (source: disclosure-controls)
- **Intent**: Progressive disclosure: common controls visible, advanced ones hidden.
- **Checks**:
  - [SHOULD] Most-used controls sit at the top level. Advanced options are collapsed by default.
  - Two kinds:
    - **Triangle**: for a view or a list hierarchy. Points toward the leading edge when collapsed and down when expanded. [SHOULD] Needs a descriptive label ("Advanced Options").
    - **Disclosure button**: tied to one specific control (Save sheet). Points down when collapsed and up when expanded. [SHOULD] Place it next to the content it reveals. [SHOULD] **No more than one disclosure button per view.**
- **Platform deltas**: iOS/iPadOS use the SwiftUI DisclosureGroup. Same concept everywhere.
- **Web translation (inference)**: Use `<details>/<summary>` or a button with `aria-expanded`. The chevron's direction should match its state.
- **Slop tells (inference)**: "Show more" toggles with no label of what's revealed. Several "Advanced" expanders in one form. Chevron direction that doesn't flip.

## Labels (source: labels)
- **Intent**: Static, readable, often copyable text.
- **Checks**:
  - [SHOULD] Use system fonts. Custom styling must stay legible and support Dynamic Type.
  - [SHOULD] Show importance with the **four semantic label colors**: label (primary), secondaryLabel (subheads, supplementary text), tertiaryLabel (unavailable items), quaternaryLabel (watermark). Don't invent gray hex values.
  - [CONSIDER] Make useful label text (errors, locations, IPs) selectable.
- **Web translation (inference)**: Define four text-color tokens (primary/secondary/tertiary/quaternary) with dark-mode values, and use only those.
- **Slop tells (inference)**: Six ad-hoc grays (`#666`, `#888`, `#999`, `text-gray-400/500/600`) used inconsistently. Low-contrast "muted" text everywhere.

## Lists and tables (source: lists-and-tables)
- **Intent**: Rows of text-centric data, optionally grouped or hierarchical. The backbone of navigation (Settings) and of productivity data.
- **Checks**:
  - [SHOULD] Text goes in lists/tables. Items that vary widely in size, or many images, go in a collection.
  - [CONSIDER] Allow reordering even when adding/removing isn't allowed. On iOS, selecting items requires edit mode.
  - [SHOULD] Selection feedback by role: **navigation lists keep the selected row highlighted**; option lists flash the highlight, then show a checkmark.
  - [SHOULD] Short row text. Long content → title-only rows plus a detail view.
  - [CONSIDER] **Middle truncation** when both ends identify the item (file names).
  - [SHOULD] Column headings are nouns, Title Case, no punctuation. A single-column table without a header needs a label for context.
  - [SHOULD] Pick a style that fits the platform: iOS grouped (headers, footers, spacing); macOS bordered with alternating rows.
  - iOS [SHOULD]: the info (detail disclosure) button reveals info only. **Drilling down uses the disclosure indicator (chevron).**
  - iOS [SHOULD]: no alphabet index on a table that has trailing chevrons or controls (they collide).
  - macOS: [CONSIDER] click a header to sort, click again to reverse. [SHOULD] resizable columns. [CONSIDER] alternating row colors in wide tables. [SHOULD] hierarchical data → outline view, not a table.
- **Web translation (inference)**: Use `<table>` for tabular data, with `aria-sort` and sortable headers that reverse on a second click. Navigation lists keep `aria-current` styling. Don't put an ⓘ icon on a row that navigates.
- **Slop tells (inference)**: Data tables rendered as card grids. Sortable-looking headers that don't sort. Chevrons on rows that don't navigate. End-truncated file names that all read "Screenshot 2026-…". "Name:" headers with colons.

## Lockups (source: lockups)
- **Intent**: tvOS-only focusable composites (cards, caption buttons, monograms, posters).
- **Checks**: [SHOULD] leave room for the focus expansion; [SHOULD] keep sizes consistent within a row; [SHOULD] monograms use photos over initials.
- **Platform deltas**: tvOS only. Not in our target platforms.
- **Web translation (inference)**: Hover-scale cards need gap room so neighbors don't overlap or shift. Keep tile sizes uniform in a row.
- **Slop tells (inference)**: Hover `scale(1.05)` that overlaps neighbors. Initials avatars everywhere when photos exist.

## Outline views (source: outline-views)
- **Intent**: macOS hierarchical table (Finder list view). Often the leading pane of a split view.
- **Checks**:
  - [SHOULD] Non-hierarchical data → table instead.
  - [SHOULD] Hierarchy shows in the **first column only**. Other columns hold attributes.
  - [MUST "Always"] Multi-column outline views have column headings. Nouns, Title Case, **no trailing colon**.
  - [CONSIDER] Sortable headers. Sorting the primary column sorts within each level.
  - [SHOULD] Resizable columns.
  - [SHOULD] Easy expand/collapse. Option-click expands all descendants.
  - [SHOULD] **Remember expansion state** across sessions.
  - [CONSIDER] Alternating rows, a centered ellipsis instead of clipping, and a search field in the toolbar for long outlines.
  - [CONSIDER] Single-click a name to edit, double-click to open.
- **Platform deltas**: macOS only (SwiftUI OutlineGroup exists cross-platform).
- **Web translation (inference)**: Use the ARIA `treegrid`. Persist expanded nodes in storage. Alt/Option-click expands all.
- **Slop tells (inference)**: Tree view that collapses everything on reload. Indentation repeated across every column.

## Split views (source: split-views)
- **Intent**: Adjacent panes showing several levels of hierarchy (sidebar → list → detail), or supplementary panes (Keynote navigator, notes, inspector).
- **Checks**:
  - [SHOULD] **Persistently highlight the current selection in every pane that leads to the detail view.**
  - [CONSIDER] Drag and drop between panes.
  - iOS [SHOULD]: use only in regular width, not compact (iPhone portrait).
  - iPadOS: 2 panes (Mail) or 3 (Keynote). [SHOULD] Design for narrow, compact, and intermediate widths, since windows resize fluidly. Navigation between panes must still make sense when collapsed.
  - macOS: panes can split vertically, horizontally, or both. [SHOULD] Set min/max pane sizes so the divider never disappears. [CONSIDER] Let people hide panes. [SHOULD] **Give several ways to bring back a hidden pane** (toolbar button + menu command + keyboard shortcut). [SHOULD] **Thin divider (1 pt)** by default. Use thick only when strong row lines would hide a thin one.
  - visionOS: prefer a split view over a new window for supplementary info; a sheet for small tasks.
  - tvOS: the default split is 1/3 primary to 2/3 secondary, or 1/2 to 1/2. Use one title over the whole split view, not per pane.
- **Web translation (inference)**: Use a resizable 2–3 pane layout with min-width clamps. At narrow widths, collapse to a stack/push navigation that keeps the selection path. Use a 1px divider. Collapsed panes come back through a button and a shortcut.
- **Slop tells (inference)**: A list-detail layout where the selected list row isn't highlighted. Thick 8px gutters as dividers. A collapsed sidebar with no way back except a tiny hover zone. Per-pane headings saying "List" or "Details".

## Tab views (source: tab-views)
- **Intent**: macOS NSTabView. Mutually exclusive panes of closely related content inside a window (as in settings). **Not** app-level navigation; that's the tab bar.
- **Checks**:
  - [SHOULD] Tabs hold closely related content. Controls inside a pane only affect that pane.
  - [SHOULD] Tab labels are nouns or short noun phrases (a verb is sometimes OK), Title Case.
  - [SHOULD] **Don't use a pop-up button to switch tabs** (two clicks and hidden options). Exception: too many panes.
  - [SHOULD] **Max 6 tabs.** More than that → a pop-up menu of view options.
  - [SHOULD] Inset the tab view with a margin on all sides. Extending it to the window edges is unusual.
- **Platform deltas**: macOS only. iOS/iPadOS: use a **segmented control** for the same job. watchOS: page controls.
- **Web translation (inference)**: In-page tabs (`role="tablist"`) for related panes, at most 6, and no `<select>` acting as a tab switcher unless there are many panes. Controls inside a tab panel don't affect other panels.
- **Slop tells (inference)**: 9-tab settings pages. Tabs whose panels share one Save button that affects all of them. Tabs labeled with verbs ("Configure", "Manage").

## Activity views / share sheet (source: activity-views)
- **Intent**: System share sheet (iOS/iPadOS/visionOS). App-specific actions appear before system ones.
- **Checks**:
  - [SHOULD] Don't duplicate system actions (Print, Copy). If yours is similar, give it a specific title ("Print Transaction").
  - [CONSIDER] SF Symbol for custom activities. A custom icon is centered in about 70×70 px.
  - [SHOULD] Title is a verb or short verb phrase. **No company or product name** in action titles. (Share activities do show a company name under the icon.)
  - [SHOULD] Exclude activities that don't apply (e.g., Print).
  - [SHOULD] **Open the share sheet from the standard Share button**, not some other trigger.
  - Extensions: [SHOULD] keep interaction short (one tap ideal). [SHOULD] No modal stacked on the extension (alerts are OK). [SHOULD] Long tasks continue in the main app. **Don't notify just because a task finished.**
- **Platform deltas**: macOS has no activity view. Sharing goes through the toolbar Share button or a context-menu Share item, plus extensions.
- **Web translation (inference)**: Use `navigator.share()` where available, triggered by a standard share icon (square with an up arrow on Apple-centric UIs). Don't build a custom grid of social icons that duplicates the OS.
- **Slop tells (inference)**: Row of colored social-network logo buttons. A "Share" button that only copies a link without saying so. "Copied!" notifications for background tasks.

## Buttons (source: buttons)
- **Intent**: Instant action. Defined by style, content, and role. Prominence encodes the action hierarchy.
- **Checks**:
  - [SHOULD "essential"] Hit region **≥ 44×44 pt** (visionOS 60×60 pt), with visual space around it.
  - [MUST "Always"] **Custom buttons have a press state.**
  - [SHOULD] The prominent (accent-filled) style goes on the most likely action. **At most 1–2 prominent buttons per view.**
  - [SHOULD] **Mark the preferred option with style, not size.** Buttons of the same size form a coherent set. Mixed sizes side by side look inconsistent.
  - [SHOULD] (Liquid Glass) Don't tint button labels the same color as a colorful content layer. Use the default monochrome.
  - [SHOULD] Familiar icons for familiar actions (`square.and.arrow.up` = share). Text labels are Title Case and start with a verb ("Add to Cart").
  - Roles: normal / primary / cancel / destructive. Primary = accent color + Return key. In a sheet or alert, Return dismisses through primary.
  - [MUST "Don't"] **Never give the primary role to a destructive button**, even when it's the likely choice (people hit primary without reading). Destructive = system red.
  - iOS/iPadOS [SHOULD]: async actions show an activity indicator inside the button, optionally with a changed label ("Checkout" → "Checking out…").
  - macOS:
    - The push button is standard. Use flexible-height only for 2-line or tall content.
    - [SHOULD] **Trailing ellipsis when the button opens another window, view, or app** ("Edit…").
    - Square/gradient buttons (+/− under a table): symbols only, inside the view, never in the toolbar or status bar, no introductory label.
    - Help button (?): system-provided, **max one per window**, opens context-specific help, in the view not the window frame, no intro text. Placement: a dialog with OK/Cancel puts it in the lower corner opposite them and aligned with them; otherwise lower-left or lower-right.
    - Image button: in the view, not the toolbar. About **10 px padding** between the image and the button edge. No system border. Label goes below.
  - visionOS (reference): sizes are mini 28 / small 32 / regular 44 / large 52 / XL 64 pt. Centers ≥ 60 pt apart. Prefer circle/capsule. White fill with black content is reserved for the toggled state. Rounded-rect in vertical stacks, capsule in horizontal rows.
  - watchOS: full-width primary buttons. Stacked buttons all get the same height.
- **Platform deltas**: iOS uses filled/tinted/gray/plain styles and in-button spinners. macOS uses push buttons with ellipsis semantics, Return = default button, and Esc = cancel (implied by the cancel role).
- **Web translation (inference)**: Exactly one `btn-primary` per view region. Destructive actions are never the primary/Enter-default; use a red secondary style plus confirmation. Use `:active` states. Min target 44×44 CSS px. "…" on buttons that open dialogs. Show a spinner and a progressive label inside the button while submitting.
- **Slop tells (inference)**: Three gradient-filled CTAs side by side. "Primary" signaled by a bigger button. A red primary "Delete" that Enter triggers. Ghost buttons with no hover or press state. Icon-only buttons with no tooltip or aria-label. Brand-colored button labels on brand-colored hero backgrounds.

## Context menus (source: context-menus)
- **Intent**: Hidden shortcut to the most relevant commands for a specific item.
- **Checks**:
  - [SHOULD] Relevant, frequent commands only. Nothing advanced or rare (Mail inbox: reply and move, not mailbox management).
  - [SHOULD] Keep item count small. **About three groups max** (separators).
  - [SHOULD] Support context menus **consistently** across all similar items.
  - [MUST "Always"] **Every context-menu item is also available in the main UI** (toolbar; on macOS, the menu bar).
  - [SHOULD] Submenus go **one level deep** at most, with predictive titles.
  - [SHOULD] **Hide unavailable items, don't dim them.** This is the opposite of regular and menu-bar menus. (macOS exception: Cut/Copy/Paste may appear dimmed.)
  - [SHOULD] Most-used items sit nearest the pointer or finger. Reverse the order when the menu opens upward.
  - [SHOULD] **No keyboard shortcuts shown in context menus.** Those belong in the main menus.
  - [SHOULD] iOS/iPadOS/visionOS: destructive items go **at the end**, marked destructive (red).
  - [CONSIDER] A title only when it clarifies scope (e.g., "3 Messages").
  - [SHOULD] Use the system's standard icons for Copy/Share/Delete.
  - iOS/iPadOS [MUST "but not both"]: give an item **either** a context menu **or** an edit menu, not both.
  - iPadOS [CONSIDER]: a context menu on empty space to create objects (Files → New Folder).
  - iOS [SHOULD]: a graphical preview that confirms the target. The preview's clipping path matches its corners so they don't change shape during the animation.
- **Web translation (inference)**: A right-click/long-press menu is a shortcut layer only. Every action must also exist as a visible control. A kebab ⋯ menu is fine as the visible equivalent.
- **Slop tells (inference)**: Custom right-click menus that replace browser defaults with 15 items. Actions that exist *only* in a kebab or right-click menu. ⌘-shortcut hints cluttering context menus. Dimmed rows in a context menu.

## Dock menus (source: dock-menus)
- **Intent**: macOS right-click on the Dock icon.
- **Checks**: [SHOULD] custom items also exist elsewhere; [SHOULD] high-value items only (open windows list, "New Message", "Get Mail"), useful when the app isn't frontmost.
- **Platform deltas**: macOS only. iOS equivalent = Home Screen quick actions.
- **Web translation (inference)**: PWA `shortcuts` in the manifest serve a similar purpose.
- **Slop tells (inference)**: N/A.

## Edit menus (source: edit-menus)
- **Intent**: System Cut/Copy/Paste/Look Up/Translate menu for selected content. Data detectors add items like "Get Directions".
- **Checks**:
  - [SHOULD] Use the system edit menu. Don't recreate it.
  - [SHOULD] Open it with the standard gestures (touch-and-hold, secondary click). No custom gestures.
  - [SHOULD] Only show applicable commands (no Copy without a selection, no Paste with an empty clipboard).
  - [SHOULD] Custom commands go next to related system ones (formatting after the system format group). Keep them few.
  - [CONSIDER] Let people copy non-editable content text (captions, statuses), **but not control labels**.
  - [SHOULD] Support undo/redo, since edit actions don't ask for confirmation.
  - [SHOULD] **Don't add on-screen buttons that duplicate edit menu functions.**
  - [SHOULD] Tell Delete (no clipboard) apart from Cut (clipboard).
  - iOS/iPadOS: works in both the compact horizontal style (touch) and the vertical context-menu style (pointer/keyboard). Reposition it to avoid covering key content.
- **Web translation (inference)**: Don't hijack native selection or the clipboard. Don't add "Copy" buttons next to plainly selectable text unless the value is hard to select (tokens, keys).
- **Slop tells (inference)**: Custom floating "Copy / Share / Tweet" bars on text selection. Copy icons next to every paragraph.

## Home Screen quick actions (source: home-screen-quick-actions)
- **Intent**: Long-press the app icon for app-specific shortcuts.
- **Checks**:
  - [SHOULD] High-value tasks. **At least one expected, up to 4 total.**
  - [SHOULD] Dynamic actions change predictably (location, recents, time).
  - [SHOULD] Titles state the result ("Directions Home", "New Message"). Optional subtitle (Mail: unread counts). **No app name**. Short and localizable.
  - [SHOULD] SF Symbol icons. [MUST "Don't"] **No emoji as icons** (they're full color and don't adapt to Dark Mode).
- **Platform deltas**: iOS/iPadOS only.
- **Web translation (inference)**: The PWA manifest's `shortcuts` (4 max is a reasonable cap). Use monochrome icons.
- **Slop tells (inference)**: Emoji used as UI icons anywhere (🚀 Get Started).

## Menus (source: menus)
- **Intent**: Shared rules for labeling and organizing all menu types.
- **Checks**:
  - Labels: [SHOULD] verbs for actions (View, Close, Select). **Title-style capitalization.** **Drop articles** ("View Settings", not "View the Settings").
  - [SHOULD] Show unavailable items **dimmed** (in regular menus). If all items are unavailable, the menu itself stays openable.
  - [SHOULD] **Ellipsis (…)** when the item needs more input before it completes.
  - Icons: [SHOULD] standard icons for standard actions. [SHOULD] **use them sparingly and with purpose**: key actions, file locations, devices, visual concepts (rotate/flip), user content. **No icon if none clearly fits.** [SHOULD] **All or none within a group.**
  - Organization: [SHOULD] important/frequent items first. [CONSIDER] group related items with separators. [SHOULD] **Keep related commands together even when usage differs** (Paste and Match Style stays with Copy/Cut/Paste). [SHOULD] Watch the length: split into separate menus or use a submenu. Long is fine for user-generated content (History, Bookmarks).
  - Submenus: [SHOULD] use sparingly. **Create one when a term repeats in more than 2 items in a group** ("Sort by" → Date/Score/Time). [SHOULD] **One level deep. If it has more than about 5 items, consider a new menu instead.** [SHOULD] A submenu stays openable even when its children are disabled. [SHOULD] **Use a submenu, never indentation.**
  - Toggled items: [CONSIDER] one item whose label changes (Show Map ↔ Hide Map). Add a verb if the state is ambiguous ("Turn HDR On"). Checkmarks for attributes in effect. A "Plain"-style item to clear several attributes at once.
  - iOS/iPadOS layouts: **small** = top row of 4 icon-only items (closely related, like B/I/U/S); **medium** = top row of 3 icons with short labels (Notes: Scan/Lock/Pin); **large** = full list (the default).
  - visionOS: show the menu near the content it controls. Breakthrough effect "subtle" by default.
- **Web translation (inference)**: Dropdown items in Title Case with no articles, "…" on items that open dialogs, icons on all items in a group or none, flat structure or one submenu level, dimmed (not hidden) items in app/menubar-style menus.
- **Slop tells (inference)**: Every dropdown item with a random Lucide icon, or icons on half the items. Sentence-case menu items mixed with Title Case. "Open the settings". Three-level flyout menus. Indented pseudo-hierarchy. Destructive "Delete" sitting mid-list.

## Ornaments (source: ornaments)
- **Intent**: visionOS floating controls attached to a window edge. The system draws toolbars and tab bars as ornaments.
- **Checks**: [CONSIDER] for persistent controls (Now Playing); [SHOULD] usually keep visible; [SHOULD] limit how many; [SHOULD] width ≤ the window's; [CONSIDER] borderless buttons on the glass; [SHOULD] use the system toolbar/tab bar rather than custom ornaments.
- **Platform deltas**: visionOS only.
- **Web translation (inference)**: Floating control docks (a media mini-player) should stay within the content width and stay visible.
- **Slop tells (inference)**: Several floating action pills competing for attention.

## Pop-up buttons (source: pop-up-buttons)
- **Intent**: Choose one of several **mutually exclusive options or states**. The button shows the current value.
- **Checks**:
  - [SHOULD] Flat list only. **Use a pull-down instead for actions, multi-select, or submenus.**
  - [SHOULD] A useful default selection (the most likely choice).
  - [SHOULD] Make the options predictable before opening (an introductory label or a descriptive value).
  - [CONSIDER] when space is tight and the options needn't always be visible.
  - [CONSIDER] A "Custom…" option for rare needs, with explanatory text below.
  - iPadOS [CONSIDER]: inside a popover or modal, use a pop-up button instead of a chevron drill-down for a small set of options per row.
- **Web translation (inference)**: `<select>` or a listbox with a visible label and a sensible preselected value. Never a select that triggers actions.
- **Slop tells (inference)**: "Select an option…" placeholder as the default when an obvious default exists. A select with no label. A select whose items are actions ("Export", "Delete").

## Pull-down buttons (source: pull-down-buttons)
- **Intent**: A menu of **actions/items related to the button's purpose** (Add ▾, Sort ▾, long-press Back for history).
- **Checks**:
  - [SHOULD] Use for commands. Mutually exclusive non-command choices → pop-up button.
  - [SHOULD] **Don't hide all of a view's actions in one pull-down.** Primary actions must stay discoverable.
  - [SHOULD] **At least 3 items.** With 1–2, use buttons or toggles instead. Too many slows people down.
  - [SHOULD] Menu title only if it adds meaning.
  - [SHOULD] Destructive items are red **and confirmed** (action sheet on iOS, popover on iPadOS).
  - [CONSIDER] An icon after the label when it clarifies.
  - iOS/iPadOS [CONSIDER]: a "More" (⋯) pull-down for low-priority items, weighed against its poor discoverability (the ellipsis icon doesn't predict contents).
- **Web translation (inference)**: A split-button or dropdown with 3 or more actions. A kebab menu holds secondary actions only.
- **Slop tells (inference)**: A ⋯ menu holding the page's primary action. A dropdown with 1 item. A chevron button that opens a 2-item menu instead of 2 buttons.

## The menu bar (source: the-menu-bar)
- **Intent**: macOS (and iPadOS) catalog of *every* command. People learn what an app does by reading it.
- **Checks**:
  - [SHOULD] **Fixed menu order**: AppName, File, Edit, Format, View, *app-specific*, Window, Help. (The Apple menu comes before them; menu bar extras sit on the trailing end.)
  - [SHOULD] **Always show the same items. Disable, don't hide.** (Contrast: context menus hide.)
  - [SHOULD] Support the standard shortcuts for standard items. Add custom shortcuts only when needed.
  - [SHOULD] Short, one-word menu titles.
  - App menu order: About (in its own group; app name ≤ 16 chars, no version) | **Settings…** (app-level only; document settings go in File) + custom config items | Services | Hide App, Hide Others, Show All | Quit (Option → Quit and Keep Windows).
  - File: New *Item* (name the type: "New Event"), Open…, Open Recent (no paths; most recent first; Clear Menu), Close (Option → Close All; Close Tab in tabbed windows), Close File, Save (autosave; formats via a pop-up in the Save sheet), Save All, **Duplicate (prefer over Save As/Export/Copy To)**, Rename…, Move To…, Export As… (only for formats you don't natively handle), Revert To, Page Setup…, Print….
  - Edit: Undo/Redo **name the target** ("Undo Paste and Match Style", "Undo Typing"), Cut, Copy, Paste, Paste and Match Style, **Delete (not Erase/Clear)**, Select All, Find ▸, Spelling and Grammar ▸, Substitutions ▸, Transformations ▸, Speech ▸. The system appends Start Dictation and Emoji & Symbols. [SHOULD] Find for objects or files might belong in File instead.
  - Format: Font ▸, Text ▸. Omit the menu if there's no rich text.
  - View: [SHOULD] **always provide one**, even if it only holds Enter/Exit Full Screen. Show/Hide labels reflect the current state. Order: Tab Bar, All Tabs, Toolbar, Customize Toolbar, Sidebar, Full Screen. Never window navigation (that's Window).
  - App-specific menus: [SHOULD] **every custom command appears in the menu bar**, even if it also lives elsewhere (discoverability, shortcuts, Full Keyboard Access). Order them to mirror the hierarchy (Mailbox → Message → Format), general to specific.
  - Window: [SHOULD] **always provide one, even for single-window apps** (Minimize, Zoom for Full Keyboard Access). Don't use Zoom for full screen. Open windows listed alphabetically, no panels.
  - Help: last. Feedback item, AppName Help, then a separator and a few extras.
  - Dynamic (Option-modified) items: [SHOULD] never the only path to a task; menu bar only; **one modifier key only**.
  - Menu bar extras: [CONSIDER] a template symbol (menu bar height is 24 pt). [SHOULD] **open a menu, not a popover** (unless the content is complex). [SHOULD] The user opts in to adding the extra. Don't depend on it being visible. Also offer the same functions through a Dock menu.
  - iPadOS: the menu bar is hidden until revealed, centered, with no extras or Apple menu. [SHOULD] **Every function also reachable in the UI.** Don't make it a catch-all. Settings opens the app's page in iPadOS Settings; an internal preferences item sits below it. [CONSIDER] tabs as View-menu items with key bindings. [CONSIDER] more submenus (taller rows).
- **Web translation (inference)**: Desktop-class web apps (Electron/PWA/Tauri) can put the full command set in a command palette or menubar. Each toolbar action should be reachable there with a shortcut. Name undo targets in toasts ("Undo Delete 3 Items").
- **Slop tells (inference)**: Mac apps (Electron/Catalyst) with a default File/Edit/View/Window/Help menu bar left unchanged, Help that goes nowhere, missing custom commands, "Preferences" vs "Settings…" inconsistencies, "Save As" instead of Duplicate. A menu bar extra that opens a giant web popover. "Clear" instead of "Delete".

## Toolbars (source: toolbars)
- **Intent**: Title + navigation + frequent actions for the current view. (A tab bar is only for switching sections.) Liquid Glass-era: controls float on glass, color comes from content.
- **Checks**:
  - [SHOULD] Don't overcrowd. Decide which items overflow as the width shrinks. [MUST-ish "Don't"] **Never add a manual overflow menu on macOS/iPadOS** (the system adds one), and don't build a layout that overflows by default.
  - [SHOULD] A More menu only if really needed, holding the less important actions.
  - [CONSIDER] Customizable toolbar on iPadOS/macOS for pro or long-session apps.
  - [SHOULD] **(Liquid Glass) Use fewer custom toolbar backgrounds and tinted controls.** Let the content layer drive color. Use a ScrollEdgeEffectStyle to separate bar from content.
  - [SHOULD] Don't color item labels like a colorful content layer. Use the monochrome default.
  - [SHOULD] Standard components, whose corner radii are **concentric with the bar corners**. Custom items must match.
  - [CONSIDER] Hide toolbars contextually for distraction-free modes, with a reliable way to restore them.
  - Titles: [SHOULD] a useful title per window (it can be empty if content makes it obvious, as in Notes). [MUST "Don't"] **Don't use the app name as the title.** [SHOULD] **Under 15 characters.**
  - Navigation: [SHOULD] **standard Back and Close buttons using symbols. No "Back"/"Close" text labels.** Custom versions must look and behave the same.
  - Actions: [SHOULD] prioritize the main tasks, with clear meaning. Symbols over text, except for actions symbols can't show well (Edit). [SHOULD] **System symbols without borders** (no circled-outline symbols; the group already provides a container).
  - [SHOULD] **`.prominent` style for the key action (Done/Submit). Only one, on the trailing side.**
  - Groupings: **leading** = back, sidebar toggle, title, document menu (Duplicate/Rename/Move/Export), not customizable. **Center** = common controls, customizable, collapses into overflow. **Trailing** = must-stay items, inspector toggles, search, More menu, primary action; visible at every size.
  - [SHOULD] Group by function and frequency. Nav controls and Done/Close/Save get their own distinct groups. **Max 3 groups.** Keep groupings the same across platforms.
  - [SHOULD] **Separate text-labeled items** with fixed space. Text next to an icon reads as one combined button, and adjacent text buttons run together.
  - iOS: [SHOULD] only the essentials, plus a More menu. [SHOULD] Large title that collapses on scroll.
  - iPadOS: [CONSIDER] the toolbar and tab bar can share the top row.
  - macOS: the toolbar sits in the title-bar frame, items have no bezel. [MUST-ish "Make every"] **Every toolbar item is also a menu-bar command** (the toolbar can be hidden or customized). Not every menu item needs a toolbar slot.
  - visionOS: bottom ornament, no vertical toolbars (tab bars are vertical there), window min width ≥ toolbar width, no pull-downs in the toolbar.
- **Web translation (inference)**: Top app bar: back/nav and title on the leading side, ≤3 groups, one filled primary on the trailing end, borderless icon buttons with tooltips, no "← Back" text links, a page title that isn't the product name, and a translucent bar instead of a solid brand-colored header.
- **Slop tells (inference)**: Solid brand-color header bar with white icons. Circled-outline icons in a bar. "Back" text plus arrow. Two filled primaries in a header. App logo or name as the page title on every screen. A hand-made ⋯ overflow that shows up at desktop widths. Icon and text buttons jammed together. Square buttons inside a pill-shaped bar (non-concentric radii).

## Path controls (source: path-controls)
- **Intent**: macOS file path display (standard breadcrumb or pop-up style). Editable versions accept drops; the pop-up adds a Choose… item.
- **Checks**: [SHOULD] **Put it in the window body, not the toolbar or status bar** (Finder's path bar is at the bottom of the body). Long paths hide the middle names.
- **Platform deltas**: macOS only.
- **Web translation (inference)**: Breadcrumbs that are long collapse in the middle ("Root › … › Parent › Item"), keeping the first and last items.
- **Slop tells (inference)**: Breadcrumbs on a 2-level-deep site. Breadcrumbs duplicating the back button and the title.

## Search fields (source: search-fields)
- **Intent**: Search within a collection. Placement depends on the app's architecture.
- **Checks**:
  - [SHOULD] Placeholder text describes the scope ("Search Messages"), not just "Search".
  - [CONSIDER-when possible] **Search as you type.**
  - [CONSIDER] Recent searches before typing, predictive suggestions while typing.
  - [SHOULD] Most relevant results first. [CONSIDER] Group them by category.
  - [CONSIDER] A scope bar for clearly defined categories. **Default to the broader scope.**
  - [SHOULD] Tokens for common filters (a contact, "Photos"). [CONSIDER] Pair tokens with suggestions so people discover them.
  - **iOS placement**:
    - In the tab bar (trailing search tab): **standard tab style** = a landing page with suggestions and browsing (TV app); **button style** = jumps straight into the field and keyboard for quick lookups, returning to the previous tab afterward.
    - Toolbar: [SHOULD] **at the bottom if there's room** (Settings, Mail, Notes). Top (nav bar button) when bottom content matters (Wallet) or there's no bottom toolbar.
    - Inline: [SHOULD] when searching within one view's content (Music library filter). Put it above the list and pin it to the top toolbar on scroll.
  - **iPadOS/macOS**: [SHOULD] **trailing side of the toolbar** for split-view apps searching across columns (Mail, Notes, Voice Memos) or filtering the detail view (Freeform). [SHOULD] At the top of the sidebar when filtering the sidebar or navigation (Settings). [SHOULD] As a sidebar or tab item for discovery-heavy apps (Music, TV). [CONSIDER] Auto-focus the field in a dedicated search area, **except on iPad with only a virtual keyboard** (the keyboard would cover the view). [SHOULD] Handle resizing: in compact width, put search above the content list. Keep iPad and Mac consistent.
- **Platform deltas**: As above. macOS adds token fields.
- **Web translation (inference)**: Global search goes in the header on the trailing side (or ⌘K). Filtering a list → an inline field above the list, sticky on scroll. Mobile web → search reachable at the bottom if the layout allows. Debounced live results. Scope chips default to "All".
- **Slop tells (inference)**: A hero-sized centered search bar on an app that isn't search-centric. Placeholder "Search…" with no scope. A search that needs Enter for a small local list. Filter chips that default to a narrow scope. Auto-focusing search on mobile and popping the keyboard on load.

## Sidebars (source: sidebars)
- **Intent**: Leading-edge navigation between top-level areas and collections (folders, playlists). Needs a lot of space. A tab bar is the default, and on iPad it can adapt into a sidebar.
- **Checks**:
  - [SHOULD] (Liquid Glass) Sidebars float on glass. **Extend rich content under the sidebar** (horizontal scroll or a background extension effect that mirrors adjacent content).
  - [CONSIDER] Let people customize sidebar contents and order.
  - [SHOULD] Large content → group with disclosure controls.
  - [CONSIDER] SF Symbols or custom symbols, not bitmaps.
  - [CONSIDER] Hideable sidebar using platform gestures (iPad edge swipe; macOS button + View > Show/Hide Sidebar). [SHOULD] **Not hidden by default.**
  - [SHOULD] **≤ 2 hierarchy levels.** Deeper → a split view with a content-list column between the sidebar and the detail.
  - [SHOULD] Two levels → short group titles, no unnecessary words.
  - [SHOULD] Sidebar icon colors: by default the **accent color**, and on macOS they follow the user's system accent. Use fixed colors **sparingly, only with meaning** (Mail VIP = yellow).
  - iOS/iPadOS: [SHOULD] **Consider a tab bar first.** The sidebarAdaptable tab view gives a tab bar ↔ sidebar toggle, and NavigationSplitView gives a sidebar-only layout.
  - macOS: row and icon size follow the user's sidebar icon-size setting (small/medium/large). [CONSIDER] Auto-collapse when the window narrows. [SHOULD] **No critical items or actions at the bottom of the sidebar** (windows often get dragged so their bottom edge is hidden).
  - visionOS: a sidebar inside a tab for deep hierarchies. Sidebar selections must not switch tabs.
- **Web translation (inference)**: Sidebar nav at 2 levels max, accent-tinted monochrome icons, collapsible but expanded by default, no "Settings / Log out / Upgrade" stuck at the very bottom as the only path, collapses into a drawer or tab bar on mobile.
- **Slop tells (inference)**: **Every sidebar item with a different rainbow icon color.** A sidebar with 3+ nested levels. A sidebar on a 4-section app that should use tabs. The user avatar and settings menu pinned at the sidebar bottom as the only way in. A collapsed-by-default icon rail with no labels.

## Tab bars (source: tab-bars)
- **Intent**: Top-level section navigation that preserves each section's navigation state. Liquid Glass: floats over content.
- **Checks**:
  - [SHOULD] **Navigation only, never actions** (no center "+" compose tab; actions go in a toolbar).
  - [SHOULD] Keep the tab bar visible in every section. The only exception is a modal covering it.
  - [SHOULD] As few tabs as needed. For complex IA → a sidebar or a tab bar that adapts to one.
  - [SHOULD] **Avoid overflow (the "More" tab).**
  - [MUST "Don't"] **Never disable or hide tab buttons.** An empty section explains why it's empty.
  - [SHOULD] Labels on every tab, **one word** where possible.
  - [CONSIDER] SF Symbols. **Prefer filled symbols.** Compact width puts icons above labels; regular width puts them side by side.
  - [SHOULD] **Badges (red oval, white number or "!") only for critical info.**
  - [SHOULD] Don't color tab labels like a colorful content layer. Use monochrome or a clearly different accent.
  - iOS: floats at the bottom on Liquid Glass. [CONSIDER] **Minimize on scroll with an accessory** (Music MiniPlayer moves inline). [CONSIDER] A dedicated **search tab at the trailing end**.
  - iPadOS: the tab bar sits **near the top**, fixed or convertible to a sidebar (tabBarOnly / sidebarAdaptable). [SHOULD] Prefer it for navigation. [CONSIDER] User-customizable tabs, **default ≤ 5** to keep compact and regular widths consistent. Can share a row with the toolbar.
  - macOS: no extra considerations (macOS app navigation leans on sidebars and window tabs).
  - tvOS: 68 pt tall, 46 pt from the top. visionOS: vertical on the leading side, symbol + short label each.
- **Web translation (inference)**: Mobile web bottom tab bar with 3–5 labeled, filled icons, all destinations, persistent. Desktop moves the same IA into a sidebar or top nav. Badges only for actionable counts.
- **Slop tells (inference)**: A center floating "+" FAB inside the tab bar. Icon-only tab bars. 6+ tabs. Tabs that disappear when logged out. A badge dot on every tab. A tab bar that hides on detail screens. Brand-color solid tab bar background.

## Token fields (source: token-fields)
- **Intent**: macOS text field that turns entries into tokens (Mail recipients) you can select and reorder.
- **Checks**: [CONSIDER] a context menu per token; [CONSIDER] more delimiters (Return) besides the default comma; [CONSIDER] tune the suggestion delay (default immediate, which can distract).
- **Platform deltas**: macOS only (search tokens exist on iOS/iPadOS through search fields).
- **Web translation (inference)**: Chip inputs commit on comma and Enter, chips are draggable and keyboard-deletable, suggestions are debounced.
- **Slop tells (inference)**: Tag inputs that only commit on Enter and lose text on blur.

---

## Component selection decision guide
- Switch top-level app sections (iPhone) → **tab bar** (labels, ≤5 filled icons), not a sidebar, hamburger, or segmented control.
- Switch top-level sections on iPad → **tab bar at top, sidebar-adaptable**. Sidebar-only → NavigationSplitView.
- Hierarchy deeper than 2 levels (iPad/Mac) → **split view with a content-list column**, not a deeper sidebar.
- Very deep hierarchy with frequent back-and-forth, no sorting (Mac) → **column view**. Hierarchy plus attribute columns → **outline view**. Flat data → **table**.
- Text items → **list/table**. Image-heavy or varied-size items → **collection**.
- Act on the current view → **toolbar**, not tab bar items.
- Mutually exclusive related panes inside a window → **tab view (macOS, ≤6)** / **segmented control (iOS)**, not a pop-up button.
- Choose one value from a set → **pop-up button**. Actions related to a button → **pull-down (≥3 items)**. 1–2 actions → plain buttons.
- Item-specific shortcuts → **context menu** (also exposed in the main UI). Text/content editing → the **system edit menu**. Never both on one iOS item.
- Drill into a row → **disclosure indicator (chevron)**. More info about a row → **info button**. A few options for a row in a popover → **pop-up button**.
- Hide advanced options → **disclosure triangle with a label**. Expand one control's options → **one disclosure button**.
- Short read-only text → **label**. Short editable → **text field**. Long or styled → **text view**.
- Clickable image → **button/image button**, not an image view. Icon → **SF Symbol**, not an image or emoji.
- Share → the **Share button → activity view**, not a custom social grid.
- Every macOS command → the **menu bar** (toolbar and context menu are shortcuts to it).
- Search across split-view columns → **trailing toolbar field**. Filter one list → **inline field above it**. Discovery → **search tab/sidebar item**.
- Status-item utility on Mac → **menu bar extra that opens a menu**, not a popover.

## Cross-cutting principles
1. **Prominence is scarce**: 1–2 prominent buttons per view, one `.prominent` toolbar action (trailing), badges only for critical info, fixed icon colors used sparingly.
2. **Style, not size, carries hierarchy.**
3. **Destructive ≠ primary.** Destructive items go last in menus, in red, and get confirmed (pull-down → action sheet).
4. **Redundancy is required where things hide**: context-menu, Dock-menu, toolbar, and dynamic-menu items all need a visible or menu-bar equivalent. On iPad, menu-bar functions must also be in the UI.
5. **Availability rules differ by surface**: menu bar and regular menus **dim**, context menus **hide**, tab bar buttons **never disable or hide**, submenus stay openable.
6. **Persistent selection = orientation**: navigation lists and every split-view pane keep the selection highlighted. Option lists use checkmarks.
7. **Liquid Glass**: controls float on glass, color comes from content, avoid custom bar backgrounds and tints, use monochrome labels over colorful content, concentric corner radii, extend content under sidebars and bars.
8. **Consistency of grammar**: Title Case for menus, buttons, tabs, and column headers; sentence case for box titles; verbs for actions, nouns for tabs and headers; no articles; ellipsis = more input needed; no app name in titles or actions.
9. **Depth limits**: submenus 1 level (≤~5 items), sidebar ≤2 levels, context menu ≤~3 groups, toolbar ≤3 groups, tab view ≤6, quick actions ≤4, iPad custom tabs default ≤5.
10. **Standard over custom**: system Back/Close symbols, edit menu, share sheet, help button, and menu order. Custom versions must look and behave the same.
11. **Remember user state**: outline expansion, sidebar customization, toolbar customization, per-tab navigation state.

### Key numbers
44×44 pt min hit target (visionOS 60×60; centers ≥60 pt apart) · visionOS button heights 28/32/44/52/64 pt · 1–2 prominent buttons/view · 1 primary toolbar action · toolbar title <15 chars · ≤3 toolbar groups · ≤6 tab-view tabs · iPad tab customization default ≤5 · ≤4 quick actions · pull-down ≥3 items · submenu 1 level, >~5 items → new menu · submenu when a term repeats in >2 items · context menu ~3 groups max · sidebar ≤2 levels · macOS split divider 1 pt · image button ~10 px padding · activity icon ~70×70 px · About app name ≤16 chars · menu bar 24 pt tall · tvOS tab bar 68 pt / 46 pt from top · tvOS split 1/3–2/3 · max 1 help button/window · max 1 disclosure button/view.

## Open questions for skill design
1. **Severity calibration**: should Apple's plain imperatives ("Use/Avoid") count as SHOULD, as here, or as MUST? This choice decides how loud the reviewer is.
2. **Web scope**: should the web review pass apply Apple-native idioms (bottom tab bar, trailing Done, Title Case menus), or only universal principles? Maybe a "target: Apple-like web" vs "generic web" switch.
3. **Input format**: will the skill review screenshots, Figma, or code (SwiftUI/HTML)? Checks like "persistent selection highlight" or "context menu items also in the main UI" need several screens or the code.
4. **Liquid Glass era**: apply the Liquid Glass rules (no custom bar backgrounds, monochrome labels) only to iOS/macOS 26+ targets? Older-OS designs could get false positives.
5. **Cross-artifact checks** (menu-bar completeness, toolbar ↔ menu parity, context ↔ main UI parity) need an inventory pass first. Should the skill build a command inventory before reviewing?
6. **Slop scoring**: report slop tells as a separate "genericness" score, or as normal findings with severity?
7. **Gaps outside this scope**: presentation (sheets, alerts, popovers), selection and input (segmented controls, toggles), and Standard icons/keyboard shortcuts are referenced heavily here. Those digests should be cross-linked.
