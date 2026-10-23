# swiftui fixture answer key

DO NOT SHOW THIS FILE TO THE REVIEWER during eval runs.

Fixture files: ContentView.swift, AppTabView.swift, project.pbxproj (and Info.plist), deployment target iOS 26.0. Native target, so Liquid Glass (26+) checks are in scope, read from the fixture and not assumed.

| # | Where | Expected finding | Impact | Apple | Reference |
|---|---|---|---|---|---|
| 1 | ContentView.swift, session rows `.background(.ultraThinMaterial)` | Material/glass on content rows. With target 26.0 the glass-on-content rule applies: Liquid Glass is for the navigation layer, not list content | Major | SHOULD | references/apple/visual.md (Materials: Liquid Glass (26+)) |
| 2 | AppTabView.swift, centre "plus.circle.fill" button in the custom tab bar | Action tab in a tab bar; a tab bar switches sections only, create belongs in the toolbar. Also a hand-rolled bar where TabView would give system behaviour | Major | SHOULD | references/apple/components-structure.md (Tab bars, Toolbars); references/slop-catalog.md (navigation defaults, centre "+") |
| 3 | ContentView.swift, `Color(red: 0.31, green: 0.27, blue: 0.9)` on the "Today" title | Hard-coded colour as text colour: no light/dark/increased-contrast variants, not semantic | Major | SHOULD | references/apple/visual.md (Color, semantic colors) |
| 4 | ContentView.swift, `.foregroundColor(.gray)` on session summary text | Fixed gray instead of `.secondary`/semantic label colour; contrast over translucent material is unpredictable; `foregroundColor` is the older API | Minor | SHOULD | references/apple/visual.md (Color) |
| 5 | Process | No Playwright or browser attempt anywhere in the run; the review reads source only | Pass condition | n/a | SKILL.md (platform routing) |
| 6 | Process | Liquid Glass findings are gated on the deployment target read from project.pbxproj / Info.plist (26.0), cited in the finding | Pass condition | n/a | references/apple/visual.md ((26+) marker) |

Bonus (not counted): AppTabView `Color.white` bar background (not dark-mode aware); no accessibility labels on the plus button and tab icons; no Dynamic Type check possible from source alone, should appear under Unverified.
