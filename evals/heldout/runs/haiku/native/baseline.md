<!-- model: claude-haiku; skill commit: 7559367 -->

# Dosewise UI/UX Design Review (development build)

Scope: the 8 Swift/plist files in `dosewise` (about 277 lines of Swift). Source only, no simulator, so nothing was seen rendered. Findings come from reading the code; visual claims (contrast, layout) are inferred and should be confirmed on device.

## Defaults assumed (owner unavailable)

- iPhone only, portrait only (per `Info.plist`). iPad and landscape not reviewed.
- Minimum iOS 17, inferred from `@Observable` (Observation framework). The `.pbxproj` was not in the folder, so this is not confirmed.
- The product promise is a medication reminder app. The app copy says "Add a medicine to start getting reminders", so reminders are treated as a core feature, not a nice-to-have.
- English only. Light and dark mode both matter.
- Single user on a single device. No sync, no caregivers.
- Medication-adherence data is treated as sensitive, so loss or silent corruption is rated high severity.

## Summary

The screens are built from standard SwiftUI parts (TabView, List, Form, ContentUnavailableView, confirmationDialog), which is a good base. The app does not yet do its main job. Reminders are never scheduled, nothing is saved, and today's doses are generated once and never again. Any one of these makes the build unfit for a real user taking medication. Fix the blockers before any further UI polish.

Severity scale: **Blocker** (the app fails its core promise or can cause a patient to miss or double a dose), **High** (a common task goes wrong or a HIG rule is clearly broken), **Medium** (friction, inconsistency, or weak accessibility), **Low** (polish).

---

## 1. Blockers

### B1. No reminders are ever scheduled
- Evidence: `DosewiseApp.swift:9` requests notification authorization. Nothing in the project calls `UNUserNotificationCenter.add(...)` or creates a `UNCalendarNotificationTrigger`. `MedStore.add` (`Models.swift:43-51`) only appends `Dose` rows to memory.
- Impact: the app's whole reason to exist does nothing. The user sets up a medicine, gets no alert, and misses doses. The empty state ("Add a medicine to start getting reminders", `TodayView.swift:12`) promises something the app does not do.
- Change: on save, schedule one repeating `UNCalendarNotificationTrigger` per medicine time (hour/minute, repeats daily). Use a notification category with "Take" and "Skip" actions, handle the response in a `UNUserNotificationCenterDelegate`, and remove or reschedule the requests on edit or delete. Add a test or manual checklist for the notification path.

### B2. Nothing is persisted
- Evidence: `MedStore` (`Models.swift:22-60`) holds `medicines` and `doses` as in-memory arrays. There is no file, SwiftData, or UserDefaults code.
- Impact: every force-quit, crash, or reboot erases all medicines and all adherence history. For a medication tracker this is a safety failure, not an edge case.
- Change: `Medicine`, `Dose` and `DoseStatus` already conform to `Codable`. Save the store as JSON in Application Support, using atomic writes, and load on launch. Save after every mutation (`add`, `resolve`, `delete`, `clearHistory`). SwiftData is a reasonable alternative, but the JSON route is the smaller change.

### B3. Doses are generated once, on the day the medicine is added
- Evidence: `MedStore.add` uses `cal.date(bySettingHour:..., of: .now)` (`Models.swift:47`). No code creates doses for any other day.
- Impact: after midnight, `today` is empty for every medicine. Tomorrow's doses never appear. The Today screen shows "No doses today" with the copy "Add a medicine to start getting reminders" even though the user already has medicines, which is wrong and confusing.
- Change: generate doses for today (and a short horizon) whenever the app becomes active and whenever the day changes. Make generation idempotent, keyed on medicine ID, time, and calendar day, so it never duplicates rows.

### B4. Missed doses disappear without a record
- Evidence: `today` filters to `isDateInToday` (`Models.swift:27-30`). `history` only includes doses that are not `.pending` (`Models.swift:31-33`). A dose still `.pending` when the day ends is in neither list.
- Impact: adherence history is silently wrong. The app can never show the user or a clinician that a dose was missed, which is the most important thing such a log can record.
- Change: add a `.missed` status. When a day rolls over (see B3), mark any still-pending past dose as missed, and include missed doses in History.

### B5. A dose can be taken or skipped early, with no confirmation and no undo
- Evidence: `TodayView.swift:40-51` enables "Take" and "forward" on every pending dose, including doses scheduled hours in the future. `resolve` (`Models.swift:37-41`) is final: there is no way to change a status back.
- Impact: a mis-tap marks a dose taken and the record is wrong. Taking a dose early on a schedule can lead to a double dose. There is no path to correct the record in the UI.
- Change: allow "Take" only from a window around the scheduled time, or ask "Take early?" when it is outside that window. Show an undo toast for a few seconds after Take or Skip. Allow a status change later from the row (context menu or swipe) so a wrong record can be fixed.

---

## 2. High

### H1. Deleting a medicine silently erases its history
- Evidence: `MedStore.delete(at:)` (`Models.swift:53-57`) runs `doses.removeAll { ids.contains($0.medicineID) }`. This deletes taken and skipped history too, and no confirmation is shown. Swipe-to-delete is the only path (`MedicinesView.swift:15`).
- Also: the code path for a missing medicine (`TodayView.swift:33` "Unknown", `HistoryView.swift:17` "Removed medicine") can never be reached in a meaningful way, because the doses are deleted with the medicine. The design and the implementation disagree about what should happen to history.
- Change: confirm the delete ("Delete Ben's medicine? Its history will be kept as 'Removed medicine'" or similar). Decide the rule and implement it: keep history with the name snapshotted onto each dose, or delete everything and say so. Do not do both.

### H2. Reminder permission is asked on cold launch with no context
- Evidence: `DosewiseApp.swift:8-10` requests notifications in `App.init`, before the user has done anything. The result is ignored (`{ _, _ in }`), so a denial is never handled and the Today screen never explains that reminders are off.
- HIG reference: request permission in context, at the moment the user needs the feature, and explain the value first. Handle denial with a visible state and a way to open Settings.
- Change: move the request to the first successful medicine save, with a short explanation. Show a banner on Today when notifications are denied, with a button to open Settings.

### H3. Medicine time entry is free text
- Evidence: `AddMedicineView.swift:28-35` takes "HH:MM" as typed text with `.numbersAndPunctuation`. Invalid input just leaves the button disabled, with no message. The same time can be added twice (no duplicate check). The times list has no delete (`AddMedicineView.swift:25-27`), so a wrong entry means starting over.
- Change: use a `DatePicker` with `.hourAndMinute` (native, always valid, locale-aware 12/24h). Add a "Add time" button that appends the picked time, and dedupe and sort the list. Give each time a swipe-to-delete. Show why "Save" is disabled (for example, a footer: "Add at least one time").

### H4. The Add tab is an action, not a destination
- Evidence: `RootView.swift:10-11` makes "Add" its own tab with `plus.circle.fill`.
- HIG reference: tab bars are for switching between sections. An action such as "add" belongs in the content it acts on, usually a `+` in the navigation bar of Medicines, presented as a sheet.
- Impact: the tab is almost empty the rest of the time, takes a permanent slot in the tab bar, and gives no feedback after saving (the form just clears, `AddMedicineView.swift:43`). The user stays on the Add tab, with no confirmation that anything happened.
- Change: move the form into a sheet from the Medicines `+` button, with Cancel and Save. On save, dismiss and show the new medicine in the list (or a short confirmation). Reduce the tabs to Today, Medicines, History.

### H5. Icon-only Skip control and ambiguous symbol
- Evidence: `TodayView.swift:43-47` is an icon-only button (`forward.circle`) with no label. `forward.circle` is a generic "next" symbol, not a clear "skip dose". History uses the same icon for skipped doses (`HistoryView.swift:23`).
- Impact: VoiceOver gets an unlabeled or unclear control. Sighted users can't tell "skip" from "next" or "fast forward".
- Change: use a text button "Skip" with a secondary style, or at minimum add `.accessibilityLabel("Skip dose")` and a visible label. Use the same wording everywhere.

### H6. Status in History is conveyed by icon alone
- Evidence: `HistoryView.swift:15-24` shows taken vs skipped only through a `checkmark.circle` or `forward.circle` icon. The subtitle is a date and time, not the status.
- Impact: status is not readable by VoiceOver in a meaningful way, and icons alone are weak for a record like this. The `resolvedAt` value is stored (`Models.swift:19`, `resolve` sets it) but never shown.
- Change: add a text status ("Taken at 08:14", "Skipped", "Missed") as the subtitle. Show the time it was actually taken, not only the scheduled time.

### H7. Fixed font size breaks Dynamic Type
- Evidence: `TodayView.swift:36` uses `.font(.system(size: 13))`. Fixed sizes ignore the user's text size setting.
- Change: use a text style (`.subheadline` or `.footnote`). Check the layout at the largest accessibility sizes. Rows with a two-button HStack will need to wrap or stack at those sizes.

### H8. Today has no notion of time or order
- Evidence: `TodayView.swift:14-16` lists all of today's doses in one flat list sorted by time. Past-due pending doses look identical to doses due later. "Take" is available for all of them.
- Impact: the user cannot see at a glance what is overdue, what is next, or what is finished. This is the screen used most.
- Change: group into sections: Overdue (pending, past time), Upcoming, Done. Show a "Next: 08:00 Ibuprofen" summary at the top when there is one. Use a clearly distinct style for overdue.

---

## 3. Medium

### M1. Hard-coded gray breaks dark mode and is used inconsistently
- Evidence: `Models.swift:68` defines `Color.doseTakenText = Color(hex: 0x4B5563)`, a fixed value. `TodayView.swift:37` uses it for the time of a taken dose, while the status label next to it is green (`TodayView.swift:53-54`).
- Impact: a fixed dark gray on a dark background has poor contrast. The color is also applied only to the time text, so the row mixes two color treatments for one state.
- Change: use `.secondary` (adaptive) or define the color in the asset catalog with light and dark variants, and check 4.5:1 contrast for text. Remove the one-off hex extension, or move it out of the model file (`Models.swift` is not a place for UI colors).

### M2. "Taken" and "Skipped" rows lose the action affordance without explanation
- Evidence: `TodayView.swift:52-57` replaces the buttons with a plain label. There is no way to reverse it (see B5).
- Change: covered by the undo and status-change fix in B5. Here, keep the status label but make it tappable to change.

### M3. Medicines list shows too little and offers no way forward
- Evidence: `MedicinesView.swift:9-14` shows name and strength only. Schedule times, notes, and the reason a medicine exists are not shown. There is no empty state (a new user sees a blank screen with a title) and no add action on this screen. There is no edit at all.
- Change: show the times under each name ("08:00, 20:00"). Add an empty state with an "Add medicine" button. Add a `+` in the nav bar and make rows tappable to edit.

### M4. Save feedback and form state
- Evidence: `AddMedicineView.swift:40-46` clears the form on save with no message. Strength is optional, but for a medicine it is normally part of the dose; there is no "dose amount" (for example "1 tablet"), and no "days of week" or "as needed" option.
- Change: confirm on save (covered by H4). Decide with the owner whether dose amount and days are in scope for v1; if yes, add them now because they change the model.

### M5. Button labels and roles
- Evidence: "Take" (`TodayView.swift:48`) and "Save medicine" (`AddMedicineView.swift:41`) are fine, but "Take" alone is a bit vague for a medication action. The Clear button in History is a destructive nav-bar item with a confirmation (`HistoryView.swift:29-39`), which is correct.
- Change: "Mark taken" is clearer than "Take" for a record-keeping action. Keep the destructive confirmation pattern as is.

### M6. Row accessibility is not structured
- Evidence: `DoseRow` (`TodayView.swift:25-60`) has no `accessibilityElement` or `accessibilityLabel`. VoiceOver reads each text and button separately in the order they appear.
- Change: group the text into one element with a label like "Ibuprofen 400 mg, due 08:00, pending", and expose Take and Skip as accessibility actions or keep them as clearly labeled buttons.

### M7. Empty states are inconsistent
- Evidence: Today's empty state uses `checkmark.seal` with "No doses today" (`TodayView.swift:10-12`). The same icon could read as "all done", and the description is wrong when medicines exist (see B3). History's empty state is fine (`HistoryView.swift:11-12`). Medicines has none.
- Change: differentiate "no medicines yet" (show onboarding and an add action) from "all doses done today" (show a positive message). Fix the copy so it matches the state.

### M8. Permission-free tab labels and icons
- Evidence: "Medicines" uses `cross.vial`, a lab glyph rather than a medicine glyph. "Today" uses `pills`, which is clear.
- Change: consider `pills.fill` or a custom glyph for Medicines, or keep "cross.vial" if the owner likes it. Low priority.

---

## 4. Low

- L1. `List(...).listStyle(.insetGrouped)` on Today (`TodayView.swift:17`) is already the default for a plain List on iOS 14+. Harmless, but it can be removed.
- L2. The name field is not set to capitalize words and has no return key or focus chain. Add `.textInputAutocapitalization(.words)` and `.submitLabel`.
- L3. No haptic on Take or Skip. A light `UIImpactFeedbackGenerator` or `.sensoryFeedback` on iOS 17 adds confirmation without UI cost.
- L4. Strings are hard-coded in English. Fine for a development build; move to a String Catalog before any translation work.
- L5. Notification authorization result is discarded (`DosewiseApp.swift:9`). Even before B1 is fixed, log or surface the result (see H2).
- L6. `Color(hex:)` extension and the doseTakenText constant live in `Models.swift`, mixing UI and model code. Move to a separate file or the asset catalog (see M1).

---

## 5. What is working

- Native structure: `TabView`, `NavigationStack` per tab, `List` with swipe-to-delete, `Form` for entry, `ContentUnavailableView` for empty states, `confirmationDialog` for the destructive Clear action. These are the right platform components and should stay.
- Destructive clear in History is confirmed and labeled "This can't be undone." Good.
- The Take button is the prominent, bordered action and Skip is borderless, so the primary action is visually dominant.
- Time display uses `Text(date, style: .time)` and `formatted(date:time:)`, which follow the user's locale and 12/24-hour setting.
- The Add form validates time ranges (0-23, 0-59) before accepting input.
- The app is portrait-only and has a plain Info.plist with a display name. Nothing wrong there for a v1.

---

## 6. Recommended order

1. Persist data (B2) and generate doses per day with midnight rollover and missed status (B3, B4). Without these, nothing else can be trusted.
2. Schedule real notifications with Take and Skip actions, and handle denial (B1, H2).
3. Add a confirmation and undo for Take and Skip, a window for early taking, and the ability to correct a status (B5, M2).
4. Fix the Add flow: sheet from Medicines, real time picker, time list editing, save feedback (H3, H4, M4).
5. Make Today time-aware with sections for overdue, upcoming, and done (H8).
6. Accessibility pass: labels on icon-only controls, text status in History, Dynamic Type, adaptive colors, grouped row elements (H5, H6, H7, M1, M6).
7. Medicine delete with a confirmation and a decided rule for history (H1), and a richer Medicines list (M3).
8. Low items as time allows.

## 7. Open questions for the owner (answered with defaults above)

- Should history of a deleted medicine be kept? Default assumed: kept, labeled "Removed medicine", which the code already expects.
- Is dose amount ("1 tablet") in scope for v1? Default assumed: not in scope, but flagged in M4.
- Early-taking window: default assumed 60 minutes before to 2 hours after scheduled time, with a confirmation outside it.
- Minimum iOS version: default assumed iOS 17.

## 8. Not verified

- No rendering, so contrast, Dynamic Type layout, and tab bar appearance are inferred from code.
- The Xcode project file was not in the folder, so deployment target, device family, and capabilities (notifications entitlement, background modes) are unknown.
- No testing of the reminder path, since there is no code for it yet.
