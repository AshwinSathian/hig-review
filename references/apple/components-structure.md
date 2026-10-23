Covers: components that structure content, actions and navigation: charts, image/text/web views, boxes, collections, column/outline/split/tab views, disclosure, labels, lists and tables, share sheet, buttons, all menu types, menu bar, toolbars, path controls, search fields, sidebars, tab bars, token fields.
Loaded by: structure, platform fit
Snapshot: 2026-10-23

Tags: [MUST] [SHOULD] [CONSIDER] follow the Apple strength rule in global constraints. Web lines are our translation of the principle, not Apple text; web is never flagged for lacking an Apple-only idiom, only for breaking the principle behind it. Slop tells are ours. `(26+)` marks Liquid Glass-era checks: apply only when the deployment target is iOS/iPadOS/macOS 26 or later.
Note: parity checks (context menu vs main UI, toolbar vs menu bar, menu bar completeness) need a command inventory built first; do not judge them from one screen.
Presentation components (sheets, alerts, popovers) and inputs (segmented controls, toggles), standard icons and shortcut tables live in the sibling reference files; this file points to them rather than repeating.

## Component selection decision guide
- Switch top-level app sections (iPhone) -> tab bar (labels, 5 or fewer filled icons), not a sidebar, hamburger or segmented control.
- Switch top-level sections on iPad -> tab bar at top, sidebar-adaptable. Sidebar-only -> NavigationSplitView.
- Hierarchy deeper than 2 levels (iPad/Mac) -> split view with a content-list column, not a deeper sidebar.
- Very deep hierarchy with frequent back-and-forth, no sorting (Mac) -> column view. Hierarchy plus attribute columns -> outline view. Flat data -> table.
- Text items -> list/table. Image-heavy or varied-size items -> collection.
- Act on the current view -> toolbar, not tab bar items.
- Mutually exclusive related panes inside a window -> tab view (macOS, 6 or fewer) or segmented control (iOS), not a pop-up button.
- Choose one value from a set -> pop-up button. Actions related to a button -> pull-down (3 or more items). 1-2 actions -> plain buttons.
- Item-specific shortcuts -> context menu (also exposed in the main UI). Text/content editing -> the system edit menu. Not both on one iOS item.
- Drill into a row -> disclosure indicator (chevron). More info about a row -> info button. A few options for a row in a popover -> pop-up button.
- Hide advanced options -> disclosure triangle with a label. Expand one control's options -> one disclosure button.
- Short read-only text -> label. Short editable -> text field. Long or styled -> text view.
- Clickable image -> button/image button, not an image view. Icon -> SF Symbol, not an image or emoji.
- Share -> the Share button opening the activity view, not a custom social grid.
- Every macOS command -> the menu bar (toolbar and context menu are shortcuts to it).
- Search across split-view columns -> trailing toolbar field. Filter one list -> inline field above it. Discovery -> search tab or sidebar item.
- Status-item utility on Mac -> menu bar extra that opens a menu, not a popover.

## Charts
**Intent**: A chart surfaces a few key insights, not a dataset dump. Data is most prominent; axes and descriptions support it.
**Checks**:
- [SHOULD] Mark type matches the message: bar = compare categories, part-to-whole, or per-period sums (steps per day); line = change over time; point = relation between two properties, outliers, clusters. Line plus point is fine when it adds clarity.
- [SHOULD] Axis range is fixed when the bounds mean something (battery 0-100%), dynamic when values vary widely (Health Steps scales so the max sits near the top).
- [SHOULD] Lower bound fits the mark: bars start at zero. Lines need not (heart rate from 0 hides resting-vs-active differences).
- [SHOULD] Tick sequences use familiar steps (0, 5, 10), not odd ones (1, 6, 11).
- [SHOULD] Grid density fits the task: interactive charts get fewer, lighter grid lines.
- [SHOULD] Title or subtitle states the takeaway (Weather: a "rain stopping in 20 min"-style summary), so no one must read the plot to get the point.
- [SHOULD] Every chart is accessible: per-element labels (or grouped labels when the purpose is a summary, e.g. Maps elevation), and Audio Graphs or an equivalent overview (chart type, what each axis means, bounds).
- [SHOULD] Interaction is optional. Critical info must not need hover or scrub to appear.
- [CONSIDER] For small marks, make the whole plot area the hit target, with scrub-to-inspect.
- [SHOULD] Keyboard and Switch Control get a logical path (along X, or by subsets for big datasets), not file order.
- [SHOULD] Changes to marks or axes are animated and announced, so Reduce Motion and VoiceOver users still notice.
- [SHOULD] Leading edge aligns with surrounding views; put Y-axis labels on the trailing side so they do not stick out past it.
- [SHOULD] Color is never the only encoding. Add shape or pattern (Health blood pressure uses two point shapes). Put separators between stacked segments.
- [SHOULD] Accessibility labels use real values, no subjective words ("rapidly", "almost"), no ambiguous formats ("June 6", not "6/6"; "60 minutes", not "60m"), describe what a series means rather than its color, and refer to axes in a consistent order. Hide visible axis/tick labels from assistive tech.
- [SHOULD] Compact width: widen the plot area, keep Y labels short, move units into the title.
**Platform deltas**: Same on iOS, iPadOS, macOS. Watch charts are glanceable only (transfers as a principle: no complex interaction on small glanceable surfaces).
**Web (our translation)**: `role="img"` plus an `aria-label` summary, or a data-table fallback; takeaway in the heading; key numbers never only in tooltips; check with forced-colors and grayscale.
**Slop tells (ours)**: Gradient area chart with no summary title. Every KPI card with a decorative sparkline that has no axis or meaning. Bars not starting at zero. Rainbow categorical palette with color as the only encoding. Values visible only on hover. Full-contrast gridlines.

## Image views
**Intent**: Display-only image container. Not interactive.
**Checks**:
- [SHOULD] A clickable image uses a button that shows the image (macOS: image button), not an image view with tap handlers bolted on.
- [SHOULD] Icons use SF Symbols or template icons (they take the accent color), not raster images.
- [SHOULD] Text over an image gets contrast help (shadow or background layer).
- [SHOULD] Frames of an animated sequence share one size.
- [SHOULD] macOS editable image: use an image well (copy, paste, drag, Delete to clear).
**Platform deltas**: macOS adds image wells and image buttons. iOS/iPadOS: nothing extra.
**Web (our translation)**: `<img>` is for display; a clickable image goes inside `<button>` or `<a>`, not `div onClick`. Inline SVG icons use `currentColor`. SF Symbols are licensed for Apple platforms only; flag them on web.
**Slop tells (ours)**: PNG icons that ignore theme/accent. Hero text over a photo with no scrim. Clickable thumbnails with no focus or press state.

## Text views
**Intent**: Multiline, styled, optionally editable text. For short text use a label or text field.
**Checks**:
- [SHOULD] Choose by size: label = short and read-only; text field = short and editable; text view = long, editable, or specially formatted.
- [SHOULD] Support Dynamic Type. Test with Bold Text and other accessibility settings.
- [CONSIDER] Make useful text selectable: error messages, serial numbers, IP addresses.
- [SHOULD] iOS/iPadOS: show the keyboard type that matches the content.
**Web (our translation)**: Do not disable `user-select` on error text or IDs. Set `inputmode`/`type` on inputs. Use `rem`-based type that honors browser zoom.
**Slop tells (ours)**: Toast errors that cannot be copied. `user-select:none` everywhere. A textarea for a one-line value.

## Web views
**Intent**: Embedded web content in an app (Mail's HTML).
**Checks**:
- [SHOULD] If users can follow links across several pages, provide back/forward controls; they are off by default.
- [SHOULD] Do not rebuild a browser. Brief in-context visits only; Safari is for browsing.
**Web (our translation)**: Same for iframes and embedded help: open external links out, or give in-pane back navigation.
**Slop tells (ours)**: Wrapper apps that are a web view with fake browser chrome.

## Boxes
**Intent**: Visually group related controls and info (GroupBox/NSBox).
**Checks**:
- [SHOULD] Keep a box small relative to its container; one close to window size stops reading as a grouping.
- [CONSIDER] Show subgroups inside a box with padding and alignment, not nested boxes (busy, cramped).
- [CONSIDER] Short title only if it clarifies; sentence case; no ending punctuation (a settings pane adds a colon).
**Platform deltas**: iOS/iPadOS default to secondary/tertiary background fills. macOS puts the title above the box.
**Web (our translation)**: `<fieldset>` or a card for real groupings only. Show sub-structure with spacing, not borders.
**Slop tells (ours)**: Cards inside cards inside cards. A full-page card wrapper around everything. Every section in a bordered rounded rect with a Title Case heading.

## Collections
**Intent**: Ordered, visual (usually image-based) content in a row or grid.
**Checks**:
- [SHOULD] Use the standard row/grid. Avoid custom layouts that draw attention to themselves.
- [CONSIDER] Text content goes in a table/list, not a grid of cards.
- [SHOULD] Leave enough padding that focus/hover effects show and items do not overlap.
- [CONSIDER] Animate insert, delete and reorder.
- [SHOULD] iOS/iPadOS: do not change the layout while someone is interacting, unless they asked.
**Web (our translation)**: CSS grid with consistent tracks. Text-heavy items go in a list/table. Respect `prefers-reduced-motion` on reorder animations. Hover-scale cards need gap room so neighbors do not overlap or shift; keep tile sizes uniform in a row (carried over from tvOS lockups).
**Slop tells (ours)**: Text-only "feature cards" in a 3-column grid. Masonry for uniform content. Grid reflow on hover. Hover `scale(1.05)` that overlaps neighbors. Initials avatars everywhere when photos exist.

## Column views
**Intent**: macOS-only browser (Finder columns) for deep hierarchies with frequent back-and-forth between levels and no need for sorting.
**Checks**:
- [SHOULD] Root level in the first column.
- [CONSIDER] At a leaf, show a preview/info pane (Finder shows file metadata).
- [SHOULD] Columns are resizable.
- [SHOULD] If sorting matters, use a list/table instead. On iPadOS use a split view.
**Platform deltas**: macOS only.
**Web (our translation)**: Miller columns suit file or taxonomy browsers; they need resize handles and arrow-key navigation.
**Slop tells (ours)**: Nested accordions 4+ deep where a column browser or split view belongs.

## Disclosure controls
**Intent**: Progressive disclosure: common controls visible, advanced ones hidden.
**Checks**:
- [SHOULD] Most-used controls sit at the top level; advanced options are collapsed by default.
- [SHOULD] Triangle (for a view or list hierarchy): points toward the leading edge when collapsed and down when expanded; needs a descriptive label ("Advanced Options").
- [SHOULD] Disclosure button (tied to one specific control, as in a Save sheet): points down when collapsed and up when expanded; place it next to the content it reveals.
- [SHOULD] No more than one disclosure button per view.
**Platform deltas**: iOS/iPadOS use SwiftUI DisclosureGroup. Same concept everywhere.
**Web (our translation)**: `<details>/<summary>` or a button with `aria-expanded`; chevron direction matches state.
**Slop tells (ours)**: "Show more" with no label of what is revealed. Several "Advanced" expanders in one form. Chevron that does not flip.

## Labels
**Intent**: Static, readable, often copyable text.
**Checks**:
- [SHOULD] Use system fonts. Custom styling must stay legible and support Dynamic Type.
- [SHOULD] Show importance with the four semantic label colors: label (primary), secondaryLabel (subheads, supplementary), tertiaryLabel (unavailable items), quaternaryLabel (watermark). Do not invent gray hex values.
- [CONSIDER] Make useful label text (errors, locations, IPs) selectable.
**Web (our translation)**: Define four text-color tokens (primary/secondary/tertiary/quaternary) with dark-mode values and use only those. SF Pro is licensed for Apple platforms only; flag it on web.
**Slop tells (ours)**: Six ad-hoc grays (`#666`, `#888`, `#999`, `text-gray-400/500/600`) used inconsistently. Low-contrast "muted" text everywhere.

## Lists and tables
**Intent**: Rows of text-centric data, optionally grouped or hierarchical. The backbone of navigation (Settings) and productivity data.
**Checks**:
- [SHOULD] Text goes in lists/tables. Items that vary widely in size, or many images, go in a collection.
- [CONSIDER] Allow reordering even when adding/removing is not allowed. On iOS, selecting items requires edit mode.
- [SHOULD] Selection feedback by role: navigation lists keep the selected row highlighted; option lists flash the highlight, then show a checkmark.
- [SHOULD] Short row text. Long content gets title-only rows plus a detail view.
- [CONSIDER] Middle truncation when both ends identify the item (file names).
- [SHOULD] Column headings are nouns, Title Case, no punctuation. A single-column table without a header needs a label for context.
- [SHOULD] Pick a style that fits the platform: iOS grouped (headers, footers, spacing); macOS bordered with alternating rows.
- [SHOULD] iOS: the info (detail disclosure) button reveals info only. Drilling down uses the disclosure indicator (chevron).
- [SHOULD] iOS: no alphabet index on a table that has trailing chevrons or controls (they collide).
- [CONSIDER] macOS: click a header to sort, click again to reverse; alternating row colors in wide tables.
- [SHOULD] macOS: resizable columns; hierarchical data uses an outline view, not a table.
**Web (our translation)**: `<table>` for tabular data, with `aria-sort` and sortable headers that reverse on a second click. Navigation lists keep `aria-current` styling. No info icon on a row that navigates. Column-header casing is consistent with the rest of the product (Title Case is Apple's native rule, not a web requirement).
**Slop tells (ours)**: Data tables rendered as card grids. Sortable-looking headers that do not sort. Chevrons on rows that do not navigate. End-truncated file names that all read "Screenshot 2026-...". "Name:" headers with colons.

## Outline views
**Intent**: macOS hierarchical table (Finder list view), often the leading pane of a split view.
**Checks**:
- [SHOULD] Non-hierarchical data uses a table instead.
- [SHOULD] Hierarchy shows in the first column only; other columns hold attributes.
- [MUST] Multi-column outline views have column headings: nouns, Title Case, no trailing colon.
- [CONSIDER] Sortable headers. Sorting the primary column sorts within each level.
- [SHOULD] Resizable columns.
- [SHOULD] Easy expand/collapse; Option-click expands all descendants.
- [SHOULD] Remember expansion state across sessions.
- [CONSIDER] Alternating rows, a centered ellipsis instead of clipping, and a toolbar search field for long outlines.
- [CONSIDER] Single-click a name to edit, double-click to open.
**Platform deltas**: macOS only (SwiftUI OutlineGroup exists cross-platform).
**Web (our translation)**: ARIA `treegrid`. Persist expanded nodes in storage. Alt/Option-click expands all.
**Slop tells (ours)**: Tree view that collapses everything on reload. Indentation repeated across every column.

## Split views
**Intent**: Adjacent panes showing several levels of hierarchy (sidebar, list, detail), or supplementary panes (Keynote navigator, notes, inspector).
**Checks**:
- [SHOULD] Persistently highlight the current selection in every pane that leads to the detail view.
- [CONSIDER] Drag and drop between panes.
- [SHOULD] iOS: use only in regular width, not compact (iPhone portrait).
- [SHOULD] iPadOS: 2 panes (Mail) or 3 (Keynote). Design for narrow, compact and intermediate widths, since windows resize fluidly; navigation between panes must still make sense when collapsed.
- [SHOULD] macOS: panes can split vertically, horizontally or both. Set min/max pane sizes so the divider never disappears.
- [CONSIDER] macOS: let people hide panes.
- [SHOULD] macOS: give several ways to bring back a hidden pane (toolbar button, menu command, keyboard shortcut).
- [SHOULD] macOS: thin divider (1 pt) by default; thick only when strong row lines would hide a thin one.
- [SHOULD] Use one title over a whole split view rather than one per pane (carried over from tvOS; the 1/3-2/3 or 1/2-1/2 default split there is reference only).
**Web (our translation)**: Resizable 2-3 pane layout with min-width clamps. At narrow widths collapse to stack/push navigation that keeps the selection path. 1px divider. Collapsed panes come back through a button and a shortcut.
**Slop tells (ours)**: List-detail where the selected list row is not highlighted. Thick 8px gutters as dividers. Collapsed sidebar with no way back except a tiny hover zone. Per-pane headings saying "List" or "Details".

## Tab views
**Intent**: macOS NSTabView. Mutually exclusive panes of closely related content inside a window (as in settings). Not app-level navigation; that is the tab bar.
**Checks**:
- [SHOULD] Tabs hold closely related content. Controls inside a pane affect only that pane.
- [SHOULD] Tab labels are nouns or short noun phrases (a verb is sometimes OK), Title Case.
- [SHOULD] Do not use a pop-up button to switch tabs (two clicks, hidden options). Exception: too many panes.
- [SHOULD] Max 6 tabs. More than that: a pop-up menu of view options.
- [SHOULD] Inset the tab view with a margin on all sides; extending to the window edges is unusual.
**Platform deltas**: macOS only. iOS/iPadOS use a segmented control for the same job.
**Web (our translation)**: In-page tabs (`role="tablist"`) for related panes, at most 6; no `<select>` acting as a tab switcher unless there are many panes. Controls in one panel do not affect other panels.
**Slop tells (ours)**: 9-tab settings pages. Tabs whose panels share one Save button affecting all of them. Tabs labeled with verbs ("Configure", "Manage").

## Activity views
**Intent**: System share sheet (iOS/iPadOS). App-specific actions appear before system ones.
**Checks**:
- [SHOULD] Do not duplicate system actions (Print, Copy). If yours is similar, give it a specific title ("Print Transaction").
- [CONSIDER] SF Symbol for custom activities. A custom icon is centered in about 70×70 px.
- [SHOULD] Title is a verb or short verb phrase, with no company or product name in action titles. (Share activities do show a company name under the icon.)
- [SHOULD] Exclude activities that do not apply (e.g., Print).
- [SHOULD] Open the share sheet from the standard Share button, not another trigger.
- [SHOULD] Extensions: keep interaction short (one tap ideal); no modal stacked on the extension (alerts are OK); long tasks continue in the main app.
- [MUST] Do not notify just because a task finished (extensions).
**Platform deltas**: macOS has no activity view. Sharing goes through the toolbar Share button or a context-menu Share item, plus extensions.
**Web (our translation)**: `navigator.share()` where available, triggered by a clear share control. Do not build a custom grid of social icons that duplicates the OS.
**Slop tells (ours)**: Row of colored social-network logo buttons. A "Share" button that only copies a link without saying so. "Copied!" notifications for background tasks.

## Buttons
**Intent**: Instant action. Defined by style, content and role. Prominence encodes the action hierarchy.
**Checks**:
- [SHOULD] Hit region at least 44×44 pt, with visual space around it. (Web: 44 px goal, 24 px minimum; 48 for shared cross-platform code.)
- [MUST] Custom buttons have a press state.
- [SHOULD] The prominent (accent-filled) style goes on the most likely action. At most 1-2 prominent buttons per view.
- [SHOULD] Mark the preferred option with style, not size. Same-size buttons form a coherent set; mixed sizes side by side look inconsistent.
- [SHOULD] (26+) Do not tint button labels the same color as a colorful content layer; use the default monochrome.
- [SHOULD] Familiar icons for familiar actions (`square.and.arrow.up` = share). Text labels are Title Case and start with a verb ("Add to Cart").
- [MUST] Don't give the primary role to a destructive button, even when it is the likely choice (people hit primary without reading). Destructive = system red.
- [SHOULD] Roles: normal / primary / cancel / destructive. Primary = accent color + Return key. In a sheet or alert, Return dismisses through primary.
- [SHOULD] iOS/iPadOS: async actions show an activity indicator inside the button, optionally with a changed label ("Checkout" to "Checking out...").
- [SHOULD] macOS: trailing ellipsis when the button opens another window, view or app ("Edit...").
- [SHOULD] macOS push button is the standard; flexible-height only for 2-line or tall content.
- [SHOULD] macOS square/gradient buttons (+/- under a table): symbols only, inside the view, never in the toolbar or status bar, no introductory label.
- [SHOULD] macOS help button (?): system-provided, max one per window, opens context-specific help, in the view not the window frame, no intro text. In a dialog with OK/Cancel put it in the lower corner opposite them and aligned with them; otherwise lower-left or lower-right.
- [SHOULD] macOS image button: in the view, not the toolbar; about 10 px padding between image and button edge; no system border; label below.
**Platform deltas**: iOS uses filled/tinted/gray/plain styles and in-button spinners. macOS push buttons carry ellipsis semantics, Return = default button, Esc = cancel (implied by the cancel role). Transferable from other platforms: full-width primary buttons and equal heights for stacked buttons (watchOS); circle/capsule shapes, with filled-white reserved for toggled state (visionOS).
**Web (our translation)**: One primary-styled button per view region. Keep destructive actions off the primary and Enter-default; use a red secondary style plus confirmation. Provide `:active` states. "..." on buttons that open dialogs. Show a spinner and progressive label inside the button while submitting.
**Slop tells (ours)**: Three gradient-filled CTAs side by side. "Primary" signaled by a bigger button. A red primary "Delete" that Enter triggers. Ghost buttons with no hover or press state. Icon-only buttons with no tooltip or aria-label. Brand-colored button labels on brand-colored hero backgrounds.

## Context menus
**Intent**: Hidden shortcut to the most relevant commands for a specific item.
**Checks**:
- [SHOULD] Relevant, frequent commands only; nothing advanced or rare (Mail inbox: reply and move, not mailbox management).
- [SHOULD] Keep item count small: about three groups max (separators).
- [SHOULD] Support context menus consistently across all similar items.
- [MUST] Every context-menu item is also available in the main UI (toolbar; on macOS, the menu bar). Needs the command inventory first.
- [SHOULD] Submenus one level deep at most, with predictive titles.
- [SHOULD] Hide unavailable items, do not dim them. This is the opposite of regular and menu-bar menus. (macOS exception: Cut/Copy/Paste may appear dimmed.)
- [SHOULD] Most-used items sit nearest the pointer or finger; reverse the order when the menu opens upward.
- [SHOULD] No keyboard shortcuts shown in context menus; they belong in the main menus.
- [SHOULD] iOS/iPadOS: destructive items go at the end, marked destructive (red).
- [CONSIDER] A title only when it clarifies scope (e.g., "3 Messages").
- [SHOULD] Use the system's standard icons for Copy/Share/Delete.
- [SHOULD] iOS/iPadOS: give an item either a context menu or an edit menu, not both.
- [CONSIDER] iPadOS: a context menu on empty space to create objects (Files, New Folder).
- [SHOULD] iOS: a graphical preview that confirms the target; its clipping path matches its corners so they do not change shape during the animation.
**Web (our translation)**: A right-click/long-press menu is a shortcut layer only. Every action also exists as a visible control. A kebab menu is fine as the visible equivalent.
**Slop tells (ours)**: Custom right-click menus that replace browser defaults with 15 items. Actions that exist only in a kebab or right-click menu. Shortcut hints cluttering context menus. Dimmed rows in a context menu.

## Dock menus
**Intent**: macOS right-click on the Dock icon.
**Checks**:
- [SHOULD] Custom items also exist elsewhere.
- [SHOULD] High-value items only (open windows list, "New Message", "Get Mail"); useful when the app is not frontmost.
**Platform deltas**: macOS only. iOS equivalent is Home Screen quick actions.
**Web (our translation)**: PWA manifest `shortcuts` serve a similar purpose.
**Slop tells (ours)**: none.

## Edit menus
**Intent**: System Cut/Copy/Paste/Look Up/Translate menu for selected content. Data detectors add items like "Get Directions".
**Checks**:
- [SHOULD] Use the system edit menu; do not recreate it.
- [SHOULD] Open it with the standard gestures (touch-and-hold, secondary click). No custom gestures.
- [SHOULD] Only show applicable commands (no Copy without a selection, no Paste with an empty clipboard).
- [SHOULD] Custom commands go next to related system ones (formatting after the system format group). Keep them few.
- [CONSIDER] Let people copy non-editable content text (captions, statuses), but not control labels.
- [SHOULD] Support undo/redo, since edit actions do not ask for confirmation.
- [SHOULD] Do not add on-screen buttons that duplicate edit menu functions.
- [SHOULD] Tell Delete (no clipboard) apart from Cut (clipboard).
- [SHOULD] iOS/iPadOS: works in the compact horizontal style (touch) and the vertical context-menu style (pointer/keyboard). Reposition it to avoid covering key content.
**Web (our translation)**: Do not hijack native selection or the clipboard. No "Copy" button next to plainly selectable text unless the value is hard to select (tokens, keys).
**Slop tells (ours)**: Custom floating "Copy / Share / Tweet" bars on text selection. Copy icons next to every paragraph.

## Home Screen quick actions
**Intent**: Long-press the app icon for app-specific shortcuts.
**Checks**:
- [SHOULD] High-value tasks. At least one expected, up to 4 total.
- [SHOULD] Dynamic actions change predictably (location, recents, time).
- [SHOULD] Titles state the result ("Directions Home", "New Message"); optional subtitle (Mail: unread counts); no app name; short and localizable.
- [SHOULD] SF Symbol icons.
- [MUST] No emoji as icons (full color, they do not adapt to Dark Mode).
**Platform deltas**: iOS/iPadOS only.
**Web (our translation)**: PWA manifest `shortcuts` (4 max is a reasonable cap) with monochrome icons.
**Slop tells (ours)**: Emoji used as UI icons anywhere.

## Menus
**Intent**: Shared rules for labeling and organizing all menu types.
**Checks**:
- [SHOULD] Labels: verbs for actions (View, Close, Select). Title-style capitalization. Drop articles ("View Settings", not "View the Settings").
- [SHOULD] Show unavailable items dimmed (in regular menus). If all items are unavailable, the menu itself stays openable.
- [SHOULD] Ellipsis (...) when the item needs more input before it completes.
- [SHOULD] Icons: standard icons for standard actions; use them sparingly and with purpose (key actions, file locations, devices, visual concepts like rotate/flip, user content); no icon if none clearly fits; all or none within a group.
- [CONSIDER] Newer-wins note: WWDC26 hides menu-bar icons by default on macOS and iPadOS, partly reversing the 2025 advice to use symbols in menus. Do not flag a menu-bar menu for lacking icons; check icon consistency within a group only where icons are shown.
- [SHOULD] Important/frequent items first. Keep related commands together even when usage differs (Paste and Match Style stays with Copy/Cut/Paste). Watch length: split into separate menus or use a submenu. Long is fine for user-generated content (History, Bookmarks).
- [CONSIDER] Group related items with separators.
- [SHOULD] Submenus sparingly. Create one when a term repeats in more than 2 items in a group ("Sort by": Date/Score/Time). One level deep; with more than about 5 items, consider a new menu instead. A submenu stays openable even when its children are disabled. Use a submenu, never indentation.
- [CONSIDER] Toggled items: one item whose label changes (Show Map / Hide Map). Add a verb if the state is ambiguous ("Turn HDR On"). Checkmarks for attributes in effect. A "Plain"-style item clears several attributes at once.
- [SHOULD] iOS/iPadOS layouts: small = top row of 4 icon-only items (closely related, like B/I/U/S); medium = top row of 3 icons with short labels (Notes: Scan/Lock/Pin); large = full list (the default).
**Web (our translation)**: Dropdown items use one casing style consistently (Apple's native rule is Title Case; web without a profile setting defaults to sentence case), no articles, "..." on items that open dialogs, icons on all items in a group or none, flat structure or one submenu level, dimmed (not hidden) items in app-style menus.
**Slop tells (ours)**: Every dropdown item with a random Lucide icon, or icons on half the items. Mixed casing in one menu. "Open the settings". Three-level flyouts. Indented pseudo-hierarchy. Destructive "Delete" mid-list.

## Pop-up buttons
**Intent**: Choose one of several mutually exclusive options or states. The button shows the current value.
**Checks**:
- [SHOULD] Flat list only. Use a pull-down instead for actions, multi-select or submenus.
- [SHOULD] A useful default selection (the most likely choice).
- [SHOULD] Make the options predictable before opening (an introductory label or descriptive value).
- [CONSIDER] When space is tight and options need not always be visible.
- [CONSIDER] A "Custom..." option for rare needs, with explanatory text below.
- [CONSIDER] iPadOS: inside a popover or modal, use a pop-up button instead of a chevron drill-down for a small set of options per row.
**Web (our translation)**: `<select>` or listbox with a visible label and sensible preselected value. Never a select that triggers actions.
**Slop tells (ours)**: "Select an option..." as the default when an obvious default exists. A select with no label. A select whose items are actions ("Export", "Delete").

## Pull-down buttons
**Intent**: A menu of actions/items related to the button's purpose (Add, Sort, long-press Back for history).
**Checks**:
- [SHOULD] Use for commands. Mutually exclusive non-command choices use a pop-up button.
- [SHOULD] Do not hide all of a view's actions in one pull-down; primary actions stay discoverable.
- [SHOULD] At least 3 items. With 1-2, use buttons or toggles. Too many slows people down.
- [SHOULD] Menu title only if it adds meaning.
- [SHOULD] Destructive items are red and confirmed (action sheet on iOS, popover on iPadOS).
- [CONSIDER] An icon after the label when it clarifies.
- [CONSIDER] iOS/iPadOS: a "More" pull-down for low-priority items, weighed against poor discoverability (the ellipsis icon does not predict contents).
**Web (our translation)**: Split-button or dropdown with 3 or more actions. A kebab menu holds secondary actions only.
**Slop tells (ours)**: A kebab menu holding the page's primary action. A dropdown with 1 item. A chevron button opening a 2-item menu instead of 2 buttons.

## The menu bar
**Intent**: macOS (and iPadOS) catalog of every command. People learn what an app does by reading it.
**Checks**:
- [SHOULD] Fixed menu order: AppName, File, Edit, Format, View, app-specific, Window, Help. (The Apple menu comes before them; menu bar extras sit on the trailing end.)
- [MUST] Always show the same set of items. Disable, do not hide. (Contrast: context menus hide.)
- [SHOULD] Support the standard shortcuts for standard items. Add custom shortcuts only when needed.
- [SHOULD] Short, one-word menu titles.
- [SHOULD] App menu order: About (own group; app name 16 chars or fewer, no version) | Settings... (app-level only; document settings go in File) plus custom config items | Services | Hide App, Hide Others, Show All | Quit (Option: Quit and Keep Windows).
- [SHOULD] File: New Item (name the type: "New Event"), Open..., Open Recent (no paths; most recent first; Clear Menu), Close (Option: Close All; Close Tab in tabbed windows), Close File, Save (autosave; formats via a pop-up in the Save sheet), Save All, Duplicate (prefer over Save As/Export/Copy To), Rename..., Move To..., Export As... (only for formats you do not natively handle), Revert To, Page Setup..., Print....
- [SHOULD] Edit: Undo/Redo name the target ("Undo Paste and Match Style", "Undo Typing"), Cut, Copy, Paste, Paste and Match Style, Delete (not Erase/Clear), Select All, Find, Spelling and Grammar, Substitutions, Transformations, Speech. The system appends Start Dictation and Emoji & Symbols. Find for objects or files might belong in File instead.
- [SHOULD] Format: Font, Text. Omit the menu if there is no rich text.
- [SHOULD] View: always provide one, even if it only holds Enter/Exit Full Screen. Show/Hide labels reflect current state. Order: Tab Bar, All Tabs, Toolbar, Customize Toolbar, Sidebar, Full Screen. Never window navigation (that is Window).
- [SHOULD] App-specific menus: every custom command appears in the menu bar, even if it also lives elsewhere (discoverability, shortcuts, Full Keyboard Access). Order them to mirror the hierarchy (Mailbox, Message, Format), general to specific.
- [SHOULD] Window: always provide one, even for single-window apps (Minimize, Zoom for Full Keyboard Access). Do not use Zoom for full screen. Open windows listed alphabetically, no panels.
- [SHOULD] Help is last: Feedback item, AppName Help, then a separator and a few extras.
- [SHOULD] Dynamic (Option-modified) items: never the only path to a task; menu bar only; one modifier key only.
- [CONSIDER] Menu bar extras: a template symbol (menu bar height is 24 pt).
- [SHOULD] Menu bar extras open a menu, not a popover (unless the content is complex); the user opts in to adding the extra; do not depend on it being visible; also offer the same functions through a Dock menu.
- [SHOULD] iPadOS: the menu bar is hidden until revealed, centered, with no extras or Apple menu. Every function also reachable in the UI; do not make it a catch-all. Settings opens the app's page in iPadOS Settings; an internal preferences item sits below it.
- [CONSIDER] iPadOS: tabs as View-menu items with key bindings; more submenus (taller rows).
**Web (our translation)**: Desktop-class web apps (Electron/PWA/Tauri) can put the full command set in a command palette or menubar; each toolbar action should be reachable there with a shortcut. Name undo targets in toasts ("Undo Delete 3 Items"). Ordinary websites are not flagged for lacking a menu bar.
**Slop tells (ours)**: Mac apps (Electron/Catalyst) with a default File/Edit/View/Window/Help menu bar left unchanged, Help that goes nowhere, missing custom commands, "Preferences" vs "Settings..." inconsistency, "Save As" instead of Duplicate. A menu bar extra that opens a giant web popover. "Clear" instead of "Delete".

## Toolbars
**Intent**: Title, navigation and frequent actions for the current view. (A tab bar is only for switching sections.) Liquid Glass era: controls float on glass, color comes from content.
**Checks**:
- [SHOULD] Do not overcrowd. Decide which items overflow as width shrinks.
- [MUST] Don't add a manual overflow menu on macOS/iPadOS (the system adds one), and do not build a layout that overflows by default.
- [SHOULD] A More menu only if really needed, holding the less important actions.
- [CONSIDER] Customizable toolbar on iPadOS/macOS for pro or long-session apps.
- [SHOULD] (26+) Use fewer custom toolbar backgrounds and tinted controls; let the content layer drive color. Use a ScrollEdgeEffectStyle to separate bar from content.
- [SHOULD] (26+) Do not color item labels like a colorful content layer; use the monochrome default.
- [SHOULD] (26+) Use standard components, whose corner radii are concentric with the bar corners; custom items must match.
- [CONSIDER] Hide toolbars contextually for distraction-free modes, with a reliable way to restore them.
- [SHOULD] A useful title per window (it can be empty if content makes it obvious, as in Notes). Under 15 characters.
- [MUST] Do not use the app name as the title.
- [SHOULD] Navigation: standard Back and Close buttons using symbols, no "Back"/"Close" text labels. Custom versions must look and behave the same.
- [SHOULD] Actions: prioritize main tasks with clear meaning. Symbols over text, except for actions symbols cannot show well (Edit). System symbols without borders (no circled-outline symbols; the group already provides a container).
- [SHOULD] (26+) `.prominent` style for the key action (Done/Submit). Only one, on the trailing side.
- [SHOULD] Groupings: leading = back, sidebar toggle, title, document menu (Duplicate/Rename/Move/Export), not customizable. Center = common controls, customizable, collapses into overflow. Trailing = must-stay items, inspector toggles, search, More menu, primary action; visible at every size.
- [SHOULD] Group by function and frequency. Navigation controls and Done/Close/Save get their own distinct groups. Max 3 groups. Keep groupings the same across platforms.
- [SHOULD] Separate text-labeled items with fixed space: text next to an icon reads as one combined button, and adjacent text buttons run together.
- [SHOULD] iOS: only the essentials, plus a More menu. Large title that collapses on scroll.
- [CONSIDER] iPadOS: the toolbar and tab bar can share the top row.
- [SHOULD] macOS: toolbar sits in the title-bar frame; items have no bezel. Every toolbar item is also a menu-bar command (the toolbar can be hidden or customized). Not every menu item needs a toolbar slot. Needs the command inventory first.
**Platform deltas**: Transferable from visionOS: ornament-style toolbars stay within the window width and are limited in number.
**Web (our translation)**: Top app bar with back/nav and title on the leading side, 3 groups or fewer, one filled primary on the trailing end, borderless icon buttons with tooltips, no "<- Back" text links, a page title that is not the product name, and a bar that stays distinct from content (translucency optional, with a reduced-transparency fallback). Not flagged for lacking an Apple toolbar; flagged for crowding, two competing primaries, or a hand-made overflow showing at desktop widths.
**Slop tells (ours)**: Solid brand-color header bar with white icons. Circled-outline icons in a bar. "Back" text plus arrow. Two filled primaries in a header. App logo or name as the page title on every screen. Hand-made overflow at desktop widths. Icon and text buttons jammed together. Square buttons inside a pill-shaped bar (non-concentric radii). Several floating action pills competing for attention.

## Path controls
**Intent**: macOS file path display (breadcrumb or pop-up style). Editable versions accept drops; the pop-up adds a Choose... item.
**Checks**:
- [SHOULD] Put it in the window body, not the toolbar or status bar (Finder's path bar is at the bottom of the body). Long paths hide the middle names.
**Platform deltas**: macOS only.
**Web (our translation)**: Long breadcrumbs collapse in the middle ("Root > ... > Parent > Item"), keeping first and last items.
**Slop tells (ours)**: Breadcrumbs on a 2-level-deep site. Breadcrumbs duplicating the back button and the title.

## Search fields
**Intent**: Search within a collection. Placement depends on the app's architecture.
**Checks**:
- [SHOULD] Placeholder describes the scope ("Search Messages"), not just "Search".
- [CONSIDER] Search as you type, when possible.
- [CONSIDER] Recent searches before typing, predictive suggestions while typing.
- [SHOULD] Most relevant results first.
- [CONSIDER] Group by category.
- [CONSIDER] A scope bar for clearly defined categories; default to the broader scope.
- [SHOULD] Tokens for common filters (a contact, "Photos").
- [CONSIDER] Pair tokens with suggestions so people discover them.
- [CONSIDER] (26+) iOS search in the tab bar (trailing search tab): standard tab style = a landing page with suggestions and browsing (TV app); button style = jumps straight into the field and keyboard for quick lookups, returning to the previous tab afterward.
- [SHOULD] iOS toolbar search: at the bottom if there is room (Settings, Mail, Notes). Top (nav bar button) when bottom content matters (Wallet) or there is no bottom toolbar.
- [SHOULD] iOS inline search when searching within one view's content (Music library filter): above the list, pinned to the top toolbar on scroll.
- [SHOULD] iPadOS/macOS: trailing side of the toolbar for split-view apps searching across columns (Mail, Notes, Voice Memos) or filtering the detail view (Freeform). At the top of the sidebar when filtering the sidebar or navigation (Settings). As a sidebar or tab item for discovery-heavy apps (Music, TV).
- [CONSIDER] iPadOS/macOS: auto-focus the field in a dedicated search area, except on iPad with only a virtual keyboard (it would cover the view).
- [SHOULD] iPadOS/macOS: handle resizing: in compact width put search above the content list. Keep iPad and Mac consistent.
**Platform deltas**: As above. macOS adds token fields.
**Web (our translation)**: Global search in the header on the trailing side (or a command key). Filtering a list: inline field above the list, sticky on scroll. Mobile web: search reachable near the bottom if the layout allows. Debounced live results. Scope chips default to "All".
**Slop tells (ours)**: Hero-sized centered search bar on an app that is not search-centric. Placeholder "Search..." with no scope. Search that needs Enter for a small local list. Filter chips that default to a narrow scope. Auto-focusing search on mobile and popping the keyboard on load.

## Sidebars
**Intent**: Leading-edge navigation between top-level areas and collections (folders, playlists). Needs a lot of space. A tab bar is the default, and on iPad it can adapt into a sidebar.
**Checks**:
- [SHOULD] (26+) Sidebars float on glass. Extend rich content under the sidebar (horizontal scroll, or a background extension effect that mirrors adjacent content).
- [CONSIDER] Let people customize sidebar contents and order.
- [SHOULD] Large content: group with disclosure controls.
- [CONSIDER] SF Symbols or custom symbols, not bitmaps.
- [CONSIDER] Hideable sidebar using platform gestures (iPad edge swipe; macOS button plus View > Show/Hide Sidebar).
- [SHOULD] Sidebar is not hidden by default.
- [SHOULD] 2 hierarchy levels or fewer. Deeper: a split view with a content-list column between sidebar and detail.
- [SHOULD] Two levels: short group titles, no unnecessary words.
- [SHOULD] Sidebar icon colors default to the accent color (on macOS they follow the user's system accent). Fixed colors sparingly, only with meaning (Mail VIP = yellow).
- [SHOULD] iOS/iPadOS: consider a tab bar first. The sidebarAdaptable tab view gives a tab bar to sidebar toggle; NavigationSplitView gives a sidebar-only layout.
- [CONSIDER] macOS: row and icon size follow the user's sidebar icon-size setting (small/medium/large); auto-collapse when the window narrows.
- [SHOULD] macOS: no critical items or actions at the bottom of the sidebar (windows often get dragged so the bottom edge is hidden).
- [SHOULD] Transferable from visionOS: for deep hierarchies, selections in a sidebar must not switch top-level tabs.
**Web (our translation)**: Sidebar nav at 2 levels max, accent-tinted monochrome icons, collapsible but expanded by default, no "Settings / Log out / Upgrade" stuck at the very bottom as the only path; collapses into a drawer or tab bar on mobile. Not flagged for lacking an Apple sidebar.
**Slop tells (ours)**: Every sidebar item with a different rainbow icon color. A sidebar with 3+ nested levels. A sidebar on a 4-section app that should use tabs. User avatar and settings pinned at the sidebar bottom as the only way in. Collapsed-by-default icon rail with no labels.

## Tab bars
**Intent**: Top-level section navigation that preserves each section's navigation state. Liquid Glass: floats over content.
**Checks**:
- [SHOULD] Navigation only, never actions (no center "+" compose tab; actions go in a toolbar).
- [SHOULD] Keep the tab bar visible in every section. The only exception is a modal covering it.
- [SHOULD] As few tabs as needed. Complex IA: a sidebar or a tab bar that adapts to one.
- [SHOULD] Avoid overflow (the "More" tab).
- [MUST] Don't disable or hide tab buttons. An empty section explains why it is empty.
- [SHOULD] Labels on every tab, one word where possible.
- [CONSIDER] SF Symbols; prefer filled symbols. Compact width puts icons above labels; regular width puts them side by side.
- [SHOULD] Badges (red oval, white number or "!") only for critical info.
- [SHOULD] (26+) Do not color tab labels like a colorful content layer; use monochrome or a clearly different accent.
- [CONSIDER] (26+) iOS: tab bar floats at the bottom; minimize on scroll with an accessory (Music MiniPlayer moves inline); a dedicated search tab at the trailing end.
- [SHOULD] (26+) iPadOS: tab bar sits near the top, fixed or convertible to a sidebar (tabBarOnly / sidebarAdaptable). Prefer it for navigation.
- [CONSIDER] iPadOS: user-customizable tabs, default 5 or fewer, to keep compact and regular widths consistent. It can share a row with the toolbar.
**Platform deltas**: macOS: no extra tab bar considerations (app navigation leans on sidebars and window tabs). visionOS and tvOS tab bars are vertical or top-of-screen with symbol plus short label (reference only; sizes dropped).
**Web (our translation)**: The principle is primary navigation that is persistent, labeled and within thumb reach on mobile. A bottom tab bar with 3-5 labeled, filled icons is one way to meet it, not a requirement; flag primary nav out of thumb reach, hidden on detail screens, or icon-only. Desktop moves the same IA into a sidebar or top nav. Badges only for actionable counts.
**Slop tells (ours)**: A center floating "+" FAB inside the tab bar. Icon-only tab bars. 6+ tabs. Tabs that disappear when logged out. A badge dot on every tab. A tab bar that hides on detail screens. Brand-color solid tab bar background.

## Token fields
**Intent**: macOS text field that turns entries into tokens (Mail recipients) you can select and reorder.
**Checks**:
- [CONSIDER] A context menu per token.
- [CONSIDER] More delimiters (Return) besides the default comma.
- [CONSIDER] Tune the suggestion delay (default immediate, which can distract).
**Platform deltas**: macOS only (search tokens exist on iOS/iPadOS through search fields).
**Web (our translation)**: Chip inputs commit on comma and Enter; chips are draggable and keyboard-deletable; suggestions are debounced.
**Slop tells (ours)**: Tag inputs that only commit on Enter and lose text on blur.

## Cross-cutting rules
- Prominence is scarce: 1-2 prominent buttons per view, one `.prominent` toolbar action (trailing), badges only for critical info, fixed icon colors sparingly. Style, not size, carries hierarchy.
- Destructive is never primary. Destructive items go last in menus, in red, and get confirmed (pull-down to action sheet).
- Redundancy is required where things hide: context-menu, Dock-menu, toolbar and dynamic-menu items need a visible or menu-bar equivalent. On iPad, menu-bar functions must also be in the UI.
- Availability differs by surface: menu bar and regular menus dim, context menus hide, tab bar buttons never disable or hide, submenus stay openable.
- Persistent selection is orientation: navigation lists and every split-view pane keep the selection highlighted; option lists use checkmarks.
- (26+) Liquid Glass: controls float on glass, color comes from content, avoid custom bar backgrounds and tints, monochrome labels over colorful content, concentric corner radii, extend content under sidebars and bars. On web the layering principle applies (chrome distinct from content, no glass in content); emulating the look is optional.
- Grammar: Apple's native rule is Title Case for menus, buttons, tabs and column headers, sentence case for box titles; verbs for actions, nouns for tabs and headers; no articles; ellipsis = more input needed; no app name in titles or actions. On web, consistency matters more than the specific casing.
- Depth limits: submenus 1 level (about 5 items), sidebar 2 levels, context menu about 3 groups, toolbar 3 groups and title under 15 chars, tab view 6, quick actions 4, iPad custom tabs default 5.
- Standard over custom: system Back/Close symbols, edit menu, share sheet, help button, menu order. Custom versions must look and behave the same.
- Remember user state: outline expansion, sidebar customization, toolbar customization, per-tab navigation state.
