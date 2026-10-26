# Answer key: Dosewise (household medication reminder, SwiftUI, iOS 17+, Xcode 26)

| id | what | file:line | why | standard | severity |
|----|------|-----------|-----|----------|----------|
| N1 | Notification permission requested in App.init at launch, no context or pre-prompt | DosewiseApp.swift:9 | User sees a system prompt before knowing what the app does or having added a medicine; denial is hard to recover from and this is the app's core value | HIG Notifications / Privacy: request permission "when it makes sense", "should" explain benefit in context (ask after the user adds a first scheduled medicine) | Major |
| N2 | "Add" is a tab in the tab bar | RootView.swift:11 | A tab bar is for navigating peer sections, not for performing an action; adding belongs behind a "+" toolbar button presenting a sheet (Cancel/Save) from Medicines | HIG Tab bars: use tabs for navigation, "avoid" using a tab for an action | Major |
| N3 | Swipe-to-delete a medicine immediately deletes it and cascades deletion of all its dose history, no confirmation or undo | MedicinesView.swift:15 (store side: Models.swift `delete(at:)`) | Irreversible loss of health records from an easy-to-trigger swipe | HIG Managing destructive actions / Alerts: confirm destructive actions that cannot be undone; provide undo where possible | Major |
| N4 | No empty state when the medicine list is empty (blank List on first launch) | MedicinesView.swift:8-14 | New users see an empty screen with no guidance (Today and History do have ContentUnavailableView) | HIG Empty states / Onboarding: explain what to do next; use ContentUnavailableView | Minor |
| N5 | Hard-coded `.font(.system(size: 13))` for dose time | TodayView.swift:36 | Does not scale with Dynamic Type; the time of a dose is critical info, likely older users | HIG Typography / Accessibility: support Dynamic Type, use text styles ("should"); WCAG 1.4.4 Resize Text (AA) | Major |
| N6 | Custom fixed color 0x4B5563 used for "taken" time text, same in light and dark | Models.swift:68 (used TodayView.swift:37) | On dark it is 2.25:1 on the inset-grouped cell (#1C1C1E) and 2.78:1 on black (7.56:1 on white), below 4.5:1 for 13 pt text; not adaptive | HIG Color / Accessibility: sufficient contrast, support dark mode; WCAG 1.4.3 Contrast Minimum (4.5:1, AA) | Major |
| N7 | Icon-only "skip" button with no accessibility label (just `Image(systemName: "forward.circle")`) | TodayView.swift:43-47 | VoiceOver announces a generic symbol name, not "Skip dose"; also small tap target with an ambiguous icon next to "Take" | HIG Accessibility / VoiceOver: provide labels for all controls; WCAG 4.1.2 Name, Role, Value; 2.5.8 target size | Major |
| N8 | Time entered as free text "HH:MM" parsed by hand instead of DatePicker | AddMedicineView.swift:29 | Non-standard control where a system one fits: no locale/12-24h handling, error-prone, wrong keyboard, invalid input only signalled by a disabled button | HIG Pickers / Date pickers: use DatePicker (.hourAndMinute) for times; "use standard controls" | Major |

No Blocker: every task remains completable and no accessibility need is fully blocked.

## Deliberately FINE (should not be flagged)

- F1. SF Symbols inside `Label(...)` with no explicit weight/size modifiers (RootView.swift tab items, TodayView.swift:53-58, HistoryView.swift:15-24). Symbols inherit weight and scale from text style; this is idiomatic. (Checker: the old claim that HistoryView's icon needs no label was wrong; see U1.)
- F2. Destructive "Clear" in History uses `Button(role: .destructive)` plus a `confirmationDialog` with a message (HistoryView.swift:31-39), the correct HIG pattern.
- F3. Today and History use `ContentUnavailableView` for empty states, `.insetGrouped` List, semantic colors (`.secondary`, `.green`) and text styles (`.headline`, `.caption`); each tab owns its own NavigationStack with large titles.

## Checker notes
All N1-N8 confirmed at the stated lines (N4 widened to 8-14; N6 contrast recomputed). Severities stand. F1 and F2 line ranges corrected.

## Unplanted real defects (found by checker)
| id | what | file:line | why | standard | severity |
|----|------|-----------|-----|----------|----------|
| U1 | History rows show taken vs skipped only by the icon (checkmark.circle vs forward.circle); the row text is name + time. In a `Label` VoiceOver reads the title, so the status is not exposed at all, and sighted users must decode two similar outline glyphs | HistoryView.swift:15-24 | A medication history that does not say whether a dose was taken | WCAG 1.1.1 / 1.3.1; HIG Accessibility (labels), don't rely on symbol shape alone | Major |
| U2 | Reminders never fire: notification permission is requested but no `UNNotificationRequest` is ever scheduled, and doses are generated only for the day a medicine is added, so Today is empty from tomorrow; nothing is persisted either (Codable models never saved) | Models.swift:43-51; DosewiseApp.swift:9 | Core value of the app does not work. Functional, outside most UI reviews' scope: credit if found, do not penalise a miss | n/a (functional) | Major (optional for scoring) |
| U3 | No way to edit a medicine (rows are not navigable); changing a dose time means delete + re-add, which also wipes its history (amplifies N3) | MedicinesView.swift:9-14 | | HIG Lists (support editing); Nielsen user control | Minor |
| U4 | Add form: added times cannot be removed and duplicates are allowed; "Save medicine" stays disabled while a valid 08:00 sits in the field until "Add time" is tapped, with no reason shown; after Save the form silently clears with no confirmation | AddMedicineView.swift:25-45 | Users think Save is broken, and get no feedback when it works | HIG Feedback; Nielsen visibility of status | Minor |
| U5 | Take and skip are final: no undo or edit, so a mis-tap on "Take" (16 pt from the skip icon) permanently records a dose as taken | TodayView.swift:42-50; Models.swift:37-41 | Wrong health record, no recovery | HIG Undo; Nielsen user control and freedom | Minor |
| U6 | An empty strength renders a blank secondary line; past-due pending doses look the same as upcoming ones | MedicinesView.swift:12; TodayView.swift:35-37 | | HIG Lists / status | Polish |

Final counts: Blocker 0, Major 8 planted + 2 unplanted (U2 optional), Minor 1 + 3, Polish 1.
