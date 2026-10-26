<!-- model: claude-opus; skill commit: 7559367 -->

# Dosewise design review (UI and UX)

**Scope:** every file in `dosewise/`: `DosewiseApp.swift`, `RootView.swift`, `Models.swift`, `TodayView.swift`, `MedicinesView.swift`, `AddMedicineView.swift`, `HistoryView.swift`, `Info.plist` and the `project.pbxproj` fragment. That is about 300 lines in all.
**Method:** I read the source only. There was no simulator, so everything about rendering is inferred from SwiftUI's default behaviour.
**Build context:** in development. It builds with Xcode 26 against the iOS 26 SDK and targets iOS 17.0. It is iPhone only and locked to portrait.

## Assumptions (the owner was not available)

1. Dosewise is a personal medication reminder and adherence log for one person on a few recurring daily medicines. Its main promise is "remind me, and let me record that I took it." The empty-state copy says "start getting reminders", which supports this reading.
2. The intended audience includes older users and people managing chronic conditions. Large Dynamic Type sizes, VoiceOver and low-vision use are therefore core cases, not edge cases.
3. Mistakes have consequences. A wrong "taken" record, or a missing reminder, can lead to a missed or double dose. I rate severity with that in mind.
4. Data stays on the device for now. There is no account and no sync.
5. The iOS 17 deployment target is deliberate. Recommendations either work on iOS 17 or are marked as needing a newer OS.

## Severity scale

- **Critical:** the core promise fails, or the user's data is lost or wrong. Must fix before any external testing.
- **High:** a frequent task is broken or misleading, or a common group of users (accessibility users) is excluded. Fix before release.
- **Medium:** a noticeable friction or a convention break. Fix before release if possible.
- **Low:** polish.

## Summary

Visually, the app is a clean, conventional SwiftUI scaffold: `NavigationStack`, inset-grouped lists, `ContentUnavailableView` empty states, and a confirmation before history is cleared. Those parts are fine.

The product underneath does not yet work:

- **It never sends a reminder.** Notification permission is requested at launch, but no notification is ever scheduled.
- **The schedule lasts one day.** Doses are created only for the day a medicine is added, so from the next morning Today says "No doses today".
- **Nothing is saved.** The store lives in memory, so every medicine and every history entry is lost when iOS terminates the app.
- **Missed doses disappear.** They never reach History, and deleting a medicine erases its taken-dose records.

Beyond those, the main problems are:

- time entry is a free-text "HH:MM" field instead of a time picker
- "Add" is a tab rather than an action
- dose actions cannot be undone, and Skip is an unlabeled icon
- medicines cannot be edited
- some text uses a fixed font size and some a hard-coded colour that fails contrast in dark mode

The four Critical issues are product logic, but they are also UX: the screens currently promise behaviour the app does not deliver.

---

## Critical

### C1. No reminders are ever scheduled, but the UI promises them
- **Where:** `DosewiseApp.swift:9`, `TodayView.swift:12`
- **What:** `requestAuthorization` runs in `App.init`, but nothing in the codebase creates a `UNNotificationRequest`. The Today empty state says "Add a medicine to start getting reminders." A user who follows that advice gets no reminders and gets no sign that anything is wrong.
- **Also wrong:** the permission prompt appears on a cold first launch, before the user has seen the app or added anything. Apple's guidance is to ask in context, when the benefit is clear. Asked out of context, the prompt is more likely to be declined, and for a reminder app a declined prompt is close to fatal. The completion handler ignores the result, so a denial is never shown in the UI either.
- **Fix:**
  - Schedule a repeating `UNCalendarNotificationTrigger(dateMatching: [hour, minute], repeats: true)` for each time of each medicine. Reschedule when a medicine is added, edited or deleted.
  - Request authorization when the first medicine is saved, with one line explaining why ("Dosewise will remind you at 8:00 AM").
  - If permission is denied, show a persistent banner on Today ("Reminders are off. Turn on in Settings") that opens the app's page in Settings.
  - Add a notification category with "Taken" and "Skip" actions so a dose can be logged from the notification. This is the most-used flow in competing apps.
  - Consider `.timeSensitive` interruption for dose reminders. It needs the Time Sensitive entitlement, and the user can still turn it off.

### C2. The schedule covers only the day a medicine is added
- **Where:** `Models.swift:43-51`
- **What:** `add(_:)` creates one `Dose` per time, using `of: .now`, and only for today. Nothing generates doses for later days. From the second day on, Today shows "No doses today" even though the Medicines tab lists active medicines. Adding a medicine at 3 PM with an 8 AM time also creates an 8 AM dose that is already overdue, with no explanation.
- **Fix:**
  - Treat `Medicine.times` as the source of truth and build "today's doses" from it, starting from the medicine's start date. Store a `Dose` record only once the user acts on it (taken or skipped).
  - Recompute when the date changes: refresh on `scenePhase` becoming active and on `.NSCalendarDayChanged` / `UIApplication.significantTimeChangeNotification`. Otherwise a Today screen left open past midnight goes stale.
  - Let the user choose whether a time already past today counts: "First dose: today / tomorrow".

### C3. Nothing persists
- **Where:** `Models.swift:22-25`, `DosewiseApp.swift:6`
- **What:** `MedStore` is a plain in-memory `@Observable` class. When iOS terminates the app, which happens routinely in the background, every medicine and every history entry is gone. For an adherence log, that is silent data loss.
- **Fix:** use SwiftData. It is available on the iOS 17 target and fits these models. Alternatively, write Codable JSON to Application Support after each change; the models are already `Codable`. Either way, data must survive termination, and file protection should be on, because this is health information.

### C4. Missed doses vanish, and deleting a medicine erases its history
- **Where:** `Models.swift:31-33`, `Models.swift:53-57`, `MedicinesView.swift:15`
- **What:**
  - `history` includes only `.taken` and `.skipped` doses. A dose the user never acted on stays `pending` forever and never appears in History. The log therefore overstates adherence: the one fact a clinician most needs, that a dose was missed, is never recorded.
  - `delete(at:)` removes all of a medicine's doses, including taken ones, after a single swipe with no confirmation and no undo. History has a "Removed medicine" fallback (`HistoryView.swift:17`), but it can never trigger, because the records are deleted along with the medicine.
- **Fix:**
  - Add a `missed` state. A pending dose becomes missed after a grace window (for example 2 hours, or at end of day) and appears in History, marked differently from skipped.
  - Replace delete with "Stop taking" (archive). Archived medicines move to an "Archived" section and their history is kept. Keep a true delete behind a confirmation that says what will be lost ("Delete Metformin and 42 history entries?").

---

## High

### H1. Time entry is a free-text "HH:MM" field
- **Where:** `AddMedicineView.swift:7-15, 25-35`
- **What:**
  - The user types a time on a `.numbersAndPunctuation` keyboard. The field is prefilled with "08:00", but that time has not been added. Save stays disabled until the user finds and taps "Add time", and nothing explains why.
  - Added times are shown as `%02d:%02d`, which ignores the user's 12/24-hour setting. A US user sees "20:00".
  - An added time cannot be removed: there is no `onDelete` and no edit mode.
  - Duplicate times are accepted, and times are not sorted.
- **Fix:**
  - Replace the field with `DatePicker("Time", selection:, displayedComponents: .hourAndMinute)` rows.
  - Start new medicines with one default row (8:00 AM) that already counts as added, plus a "+ Add Time" row.
  - Make rows swipe-deletable, de-duplicate and sort them, and format times with `Date.FormatStyle(time: .shortened)`.
  - Offer quick presets ("Once daily", "Twice daily", "Morning / Evening") so the common case takes one tap.

### H2. "Add" is a tab
- **Where:** `RootView.swift:10-11`
- **What:** Tab bars are for moving between sections, not for actions; Apple's HIG says so directly. An "Add" tab also keeps its half-filled form when the user switches away and comes back. After Save, the fields clear with no confirmation, no haptic and no navigation, so the user cannot tell whether it worked. The icon is `plus.circle.fill`, a filled variant in a bar where the other icons are outlined. The tab bar applies its own fill rules, so the hand-picked variant is inconsistent.
- **Fix:**
  - Remove the tab and leave three tabs: Today, Medicines, History.
  - Put a `+` toolbar button on Medicines, and in the empty states of Medicines and Today. The button presents `AddMedicineView` as a sheet with Cancel and Add buttons in the toolbar (`.cancellationAction` / `.confirmationAction`). The sheet dismisses on save, which is the confirmation.
  - Add `.interactiveDismissDisabled` when the form has unsaved input.
  - Move Save out of the bottom of the form, where the keyboard can hide it.

### H3. Dose actions are instant, permanent and partly unlabeled
- **Where:** `TodayView.swift:40-58`
- **What:**
  - **No undo:** "Take" and Skip resolve the dose at once and remove the buttons. A mistaken tap cannot be undone or corrected. A wrong "Taken" record is exactly how someone ends up skipping a dose they needed, or taking a second one.
  - **Skip is unlabeled:** Skip is a bare `forward.circle` image with no text and no `accessibilityLabel`. VoiceOver reads the symbol name ("Forward"), and sighted users have to guess what it does. The glyph usually means "next" or "fast-forward", not "skip this dose".
  - **Small target:** the borderless icon is about 22 pt, under the 44 × 44 pt minimum. It sits 16 pt from the prominent Take button, which raises the chance of hitting the wrong one.
  - **Wrong time recorded:** the time shown is the scheduled time. When a dose was actually taken (`resolvedAt`) is stored but never displayed. A user cannot record a dose taken earlier (for example "took it at 7:40, logging now").
- **Fix:**
  - Make a tap on a taken or skipped row open a small menu: "Mark as not taken", "Change time taken", "Mark skipped".
  - Show a 5-second "Undo" snackbar or toolbar banner after each action.
  - Give Skip a text label, or move it into a swipe action (`.swipeActions { Button("Skip") }`) and the row's context menu, so the row has one clear primary button.
  - Show "Taken at 8:12 AM" on resolved rows.
  - Add `.sensoryFeedback(.success, trigger:)` when a dose is marked taken.

### H4. The Today screen does not show what is due
- **Where:** `TodayView.swift`
- **What:** Every pending dose looks the same, whether it is three hours overdue or due tonight. There is no overdue state, no "next dose", no progress for the day and no date. The rows do not show strength ("Metformin" without "500 mg"), even though two strengths of one drug at different times is common. Notes, such as "take with food", are collected but shown nowhere in the app.
- **Fix:**
  - Group doses into sections by time slot ("8:00 AM", "8:00 PM"), or into Overdue / Due now / Later / Done.
  - Mark overdue doses with an icon and text label ("Overdue · 2h"), not colour alone.
  - Add a header with the date and a "2 of 4 taken" count.
  - Show strength and the first line of notes in the row.
  - For a single tap in the morning, consider "Take all 8:00 AM doses" on each time section.

### H5. Fixed font size and a hard-coded colour break Dynamic Type and dark mode
- **Where:** `TodayView.swift:36-37`, `Models.swift:62-68`
- **What:**
  - `.font(.system(size: 13))` does not scale with Dynamic Type. Dose times, the most important detail in the row, stay small at accessibility sizes while the medicine name grows around them.
  - `Color.doseTakenText` is a fixed sRGB `#4B5563` with no dark-mode variant. In dark mode, on the inset-grouped cell background (about `#1C1C1E`), it measures roughly 2.3:1 contrast, below the 4.5:1 WCAG AA minimum for text of this size. In light mode it is fine (about 7.5:1).
  - Emphasis is also reversed: taken doses get darker text than pending ones (`.secondary`), so finished items stand out more than the ones still to do.
  - The hex value is Tailwind's `gray-600`, which reads as a web template carried into a native app.
- **Fix:**
  - Use `.font(.subheadline)` or `.footnote`, or `@ScaledMetric` if a custom size is truly needed.
  - Delete `Color(hex:)` and `doseTakenText`. Use `.secondary` or `.tertiary` for resolved rows, or an Asset Catalog colour with light, dark and high-contrast variants.
  - Check the layout at AX5: at accessibility sizes, switch the row from `HStack` to `VStack` using `ViewThatFits` or `dynamicTypeSize.isAccessibilitySize`.

### H6. Medicines cannot be viewed or edited
- **Where:** `MedicinesView.swift`
- **What:**
  - Rows are not tappable. A dose change, which is common, can only be made by deleting the medicine (which also wipes its history, see C4) and adding it again.
  - The list does not show times, so the user cannot check the schedule.
  - There is no empty state. A new user sees a blank grouped list with only a title.
  - If strength is left empty, the row shows an empty second line, because `Text("")` still takes up space.
- **Fix:**
  - Wrap rows in a `NavigationLink` to a detail and edit screen that reuses the add form and shows recent history for that medicine.
  - Show the times in the row ("500 mg · 8:00 AM, 8:00 PM").
  - Add a `ContentUnavailableView` with an "Add Medicine" button.
  - Hide the strength line when it is empty.

---

## Medium

### M1. History is a flat, hard-to-scan list, and the Clear button is risky
- **Where:** `HistoryView.swift`
- **What:**
  - Entries are not grouped by day, which is how people check ("did I take it Tuesday?"). There is no per-medicine filter.
  - Status is shown only by glyph: `checkmark.circle` vs `forward.circle`, both in the same colour, with no text. VoiceOver users may hear only the name and date, or a symbol name.
  - Entries show the scheduled time, not when the dose was actually taken.
  - A destructive "Clear" for the whole health log sits permanently in the navigation bar. The confirmation dialog is correctly in place, but one swipe-able tab away is a lot of exposure for an action this rare and this destructive.
- **Fix:**
  - Use sections by day (`Section(header: Text(day, format: .dateTime.weekday().month().day()))`).
  - Give each row a status label ("Taken 8:12 AM" / "Skipped" / "Missed") with icon and colour, and a combined `accessibilityElement(children: .combine)`.
  - Add a medicine filter through a toolbar `Menu`.
  - Move "Clear History" into a settings screen, or into an overflow `Menu` with the destructive role.
  - Add an Export / Share option, such as PDF or CSV for a doctor. This is a common reason to keep a log at all.

### M2. Accessibility labels and grouping in rows
- **Where:** `TodayView.swift:31-58`, `HistoryView.swift:15-24`
- **What:** Dose rows are not combined into one element, so VoiceOver steps through name, time, Skip and Take as separate stops. The Taken and Skipped status labels rely partly on colour.
- **Fix:**
  - Use `.accessibilityElement(children: .combine)` on the text block, with an `accessibilityLabel` such as "Metformin 500 mg, 8:00 AM, overdue".
  - Expose Take and Skip as `.accessibilityAction(named:)` so VoiceOver users can act from the row.
  - Add `.accessibilityInputLabels` for Voice Control ("Take", "Skip").

### M3. Form validation is permissive and silent
- **Where:** `AddMedicineView.swift:41-45`
- **What:** `name.isEmpty` accepts a name made only of spaces. Save is disabled with no hint about what is missing. The keyboard has no submit flow from Name to Strength.
- **Fix:**
  - Trim whitespace before validating.
  - Show a footer under the Schedule section ("Add at least one time") while it is empty.
  - Use `.submitLabel(.next)` and `@FocusState` to move between fields.
  - Turn off autocorrection on Name (`.autocorrectionDisabled()`), because drug names get "corrected" into ordinary words.
  - Use `.textInputAutocapitalization(.words)`.

### M4. Tab icons do not match their tabs
- **Where:** `RootView.swift`
- **What:** "Today" uses `pills`, which describes Medicines better. "Medicines" uses `cross.vial`, a lab or test glyph.
- **Fix:** Today → `checklist` or `calendar`. Medicines → `pills`. History → `clock.arrow.circlepath` (keep). Once Add moves out, the tab bar has three clear sections.

### M5. Schedule model only supports "every day"
- **Where:** `Models.swift:4-10`
- **What:** There are no options for specific weekdays, every N days, as-needed (PRN), start or end dates for a short course (for example a 7-day antibiotic), or tapering. Many real regimens cannot be entered at all. This matters for the user experience because the user then has to fake the schedule or keep a second tracker.
- **Fix:** Add, at minimum:
  - a frequency choice (Every day / Specific days / As needed)
  - an optional end date
  - for as-needed medicines, a "Log a dose" button instead of scheduled rows

---

## Low

- **L1. Portrait lock** (`Info.plist:6`). This is acceptable for a utility, but it gives up landscape for people who mount their phone sideways or use a large keyboard. Low cost to allow, once the layouts adapt.
- **L2. No visual identity.** There is no asset catalog, AccentColor or app icon in the bundle, and the default blue tint is used throughout. Pick an accent colour that does not suggest an alert (not red or orange) and use it consistently on the Take button and progress display.
- **L3. "Unknown" fallback** (`TodayView.swift:33`). This name should never appear. Fix the data model so a dose cannot lose its medicine.
- **L4. iOS 26 look.** The app is built with the iOS 26 SDK, so on iOS 26 devices system bars and controls automatically pick up the new Liquid Glass appearance. Avoid custom backgrounds behind the tab and navigation bars, and test the `.borderedProminent` Take button inside list rows on iOS 26 as well as iOS 17–18.
- **L5. Placeholder bundle ID** (`com.example.dosewise`). This is not a UX issue, but it blocks TestFlight, and notification categories and any future App Group (needed for widgets) depend on it.

---

## Opportunities after the fixes

These are not defects. They are the platform features that make a medication app reliable in daily use.

1. **Actionable notifications.** "Taken" and "Snooze 10 min" directly in the notification (see C1). This is the highest-value addition.
2. **Widgets and Lock Screen.** A "Next dose" widget and a Lock Screen accessory showing the next time and how many doses are left today. An interactive widget (iOS 17+) with a Take button.
3. **App Intents and Siri.** "Log my morning meds" and "What's my next dose?" Shortcuts.
4. **Apple Health.** iOS 26 adds a HealthKit Medications API (`HKUserAnnotatedMedication`, `HKMedicationDoseEvent`). Users already track medicines in the Health app, and Dosewise competes with that built-in feature. On iOS 26 and later, reading the user's existing medication list could replace manual entry. Check the current write and authorization rules against Apple's documentation before designing around them; developer reports suggest third-party write access is limited.
5. **Refills.** Track pill count and warn when supply is low. This is a common feature in this category.
6. **Safety copy.** Add a short line in onboarding or settings that the app is a reminder aid and not medical advice. This also needs reviewing for App Store guideline 1.4.1 (medical apps).

---

## Fix order

1. Make it work: C3 persistence → C2 recurring schedule → C1 scheduled notifications with in-context permission → C4 missed state and archive.
2. Make the main flows safe and clear: H3 undo and labelled Skip → H1 time picker → H2 Add as a sheet → H6 edit medicine.
3. Make it readable for everyone: H5 Dynamic Type and colour → M2 VoiceOver → H4 Today structure.
4. The remaining Medium and Low items, then the opportunities (actionable notifications first).

## Sources

- [Apple: HKUserAnnotatedMedication](https://developer.apple.com/documentation/healthkit/hkuserannotatedmedication)
- [WWDC25 session 321: Meet the HealthKit Medications API](https://developer.apple.com/videos/play/wwdc2025/321/)
- [Apple Developer Forums: Medication data insert from third party app](https://developer.apple.com/forums/thread/803954)
