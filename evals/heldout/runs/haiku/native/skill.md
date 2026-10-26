<!-- model: claude-haiku; skill commit: 7559367 -->

# Loupe review: Dosewise (SwiftUI, iPhone, development build)

## 1. Summary

- **Reviewed:** whole app, inline (5 screens, 7 Swift files). Input: native source only (`dosewise/*.swift`, `Info.plist`, `project.pbxproj`). No simulator, no running build, so every rendered check is Unverified or judged from code.
- **Verdict:** a functional prototype built almost entirely from stock SwiftUI parts. Two Blockers: dark-mode text contrast on taken doses, and swipe-delete that silently erases a medicine's dose history. The main gaps are missing features the screens imply (reminders, editing, persistence) and an Add flow with no feedback or proper time entry.
- **Most important:** fix the two Blockers, then decide whether reminders are in scope for this build, since the Today empty state promises them.
- **Rework:** No rework warranted. The defects are fixable per row, and the missing pieces are features (enhancements), not a structural cluster or a wrong core flow.

**Assumptions (no owner answers; no `.loupe.md`, not written):**
- `release_stage`: `development` (default). App Review checks (4.2, 2.1) are not gated; placeholder-like copy is noted in Unverified.
- Build SDK: Xcode 26 / iOS 26 SDK (`project.pbxproj` line 2 comment `Toolchain: Xcode 26 (iOS 26 SDK)`). `UIDesignRequiresCompatibility` absent from `Info.plist`, so the (26+) gate passes and (26+) checks were considered. The app uses stock components, so there is no custom Liquid Glass to flag.
- Deployment target iOS 17.0; `TARGETED_DEVICE_FAMILY = 1` (iPhone only); portrait only.
- `purpose`: personal medication dose tracker (inferred from `MedicinesView`, `TodayView`, `HistoryView`).
- `register`: utilitarian (frequent check-and-act health task).
- `humor`: none. `voice`: plain, sentence case, second person. `direction`: empty, so distinctiveness gives a verdict and offers directions.
- `density`: comfortable (iOS 17 pt body).
- `audience`: an individual managing their own medicines, several times a day.
- `platforms`: iPhone.

**Run notes**
- Tools used: Bash (file listing, reading, contrast arithmetic in Python with `-I`), WebSearch (1 query). No Playwright or simulator (native source only). No `scripts/measure*.js` or `scripts/png_contrast.py` runs, since there is no rendered page or screenshot.
- Contrast figures were computed from the hex values in source (WCAG relative luminance formula) against assumed backgrounds. They are not measured on a device.
- Landscape web research was done. Skill files read: `SKILL.md`, `references/report-template.md`, `workflow-intake.md`, `workflow-passes.md`, `augment/red-team.md`, `augment/landscape.md`, plus targeted greps of `references/apple/*.md`.
- Side effects: none on the user's files. Nothing edited. The only file written is this report.

## 2. Findings

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | Taken doses show their scheduled time in a hard-coded `#4B5563` text color. In dark mode this is 2.25:1 on the inset cell (about #1C1C1E), and 2.78:1 on pure black. Text is 13 pt regular, so 4.5:1 is required (WCAG 1.4.3). The light-mode ratio is 7.56:1, so it only fails in dark mode. | `TodayView.swift` `DoseRow` (`.foregroundStyle(dose.status == .taken ? Color.doseTakenText : .secondary)`); `Models.swift` `Color.doseTakenText` | Blocker (source-confirmed WCAG 1.4.3) | SHOULD (`content-a11y.md:22` "Contrast meets WCAG AA"; `content-a11y.md:24` "Flag hard-coded hex values on semantic surfaces"; `visual.md:211` "no hard-coded values") | Drop the hex. Use `.secondary`, or an asset-catalog color with light and dark variants that both pass 4.5:1. Re-check in dark mode with Accessibility Inspector. |
| 2 | Swipe-delete on a medicine silently removes every dose for it, including taken and skipped history. No confirmation. The History "Removed medicine" fallback can never show, because the doses are deleted with the medicine. | `MedicinesView.swift:10` `.onDelete { store.delete(at: $0) }`; `Models.swift` `delete(at:)` (`doses.removeAll { ids.contains($0.medicineID) }`) | Blocker (data loss) | SHOULD (`components-presentation.md:67` "Reserve alerts for uncommon and irreversible destructive actions"). Confirmation dialog needed because the loss is irreversible. | Keep the history: stop deleting doses, or archive the medicine and keep its name for History. If deletion stays, add a `confirmationDialog` stating that history will be lost. Then the "Removed medicine" branch becomes reachable. |
| 3 | "Taken" label uses `.green` (system green) on the light background. About 2.2:1 for body-size text, which fails 1.4.3. Dark mode passes (about 8.4:1). | `TodayView.swift` `DoseRow` `case .taken` (`Label("Taken", …).foregroundStyle(.green)`) | Major, Blocker candidate. Upgrade to Blocker once measured on a device in light mode. The system green RGB (#34C759) is recalled, not confirmed in-session. | SHOULD (`content-a11y.md:22`) | Use a darker text tone for the "Taken" label, or keep green only on the icon and make the text `.primary`. Measure in light mode with Accessibility Inspector. |
| 4 | Nothing persists. `MedStore` is an in-memory `@Observable`. Medicines and doses are lost on every relaunch. No `UserDefaults`, SwiftData or file storage in the eight source files. | `Models.swift` `MedStore`; `DosewiseApp.swift` `@State private var store = MedStore()` | Major in this development build. Becomes a Blocker (data loss) before release. | Taste (reviewer judgement; Apple silent on persistence) | Persist to SwiftData or a Codable file. Add a relaunch test before any release. |
| 5 | The Today empty state promises reminders ("Add a medicine to start getting reminders"). No `UNNotificationRequest` is scheduled anywhere. The app requests notification permission at launch, before any value is shown. | `TodayView.swift` `ContentUnavailableView` description; `DosewiseApp.swift` `init()` calls `requestAuthorization` | Major (false capability claim; dead promise). Not a dark pattern. | SHOULD (`content-a11y.md:154` "No permission prompts at launch unless the app cannot work without that permission") | Either schedule local notifications for each dose and request permission in context (e.g. after the first medicine is saved), or change the copy to what the app does. Honest copy: "Add a medicine to see today's doses." |
| 6 | The Skip control is an icon-only button (`forward.circle`) with no visible label. VoiceOver reads only the symbol name, which is not a description of the action. | `TodayView.swift` `DoseRow` `Button { store.resolve(dose, as: .skipped) } label: { Image(systemName: "forward.circle") }` | Major (judged, not an accessibility failure: a name exists) | SHOULD (`content-a11y.md:192` "Every key element has a label that describes function") | Use `Button("Skip", systemImage: "forward")` or add `.accessibilityLabel("Skip dose")`. Keep the text visible if space allows at AX sizes. |
| 7 | Take and Skip are final on tap. There is no undo, and a skipped dose cannot go back to pending. Accidental taps are permanent. | `Models.swift` `resolve(_:as:)`; `TodayView.swift` buttons | Major | Research (`components-presentation.md:12` offers undo for a common undoable action; that line is untagged, so Research shows) | Add a short undo affordance after each Take or Skip (a row action or a toast with Undo), or allow reverting a dose to pending from the row. |
| 8 | Dose time uses a fixed `.system(size: 13)` font. It does not scale with Dynamic Type, so users' text-size settings are ignored on this line. | `TodayView.swift` `DoseRow` (`.font(.system(size: 13))`) | Major (accessibility need; cannot be measured without a device) | SHOULD (`visual.md:68` "Prefer built-in text styles (Dynamic Type comes free)") | Use `.font(.subheadline)` or `.footnote`. |
| 9 | "Add" is a tab. It is an action, not a destination. | `RootView.swift` `Label("Add", systemImage: "plus.circle.fill")` tab | Major | SHOULD (`components-structure.md:429` "Navigation only, never actions (… actions go in a toolbar)") | Move the add action to a `+` toolbar button on the Today and Medicines screens. Keep three tabs (Today, Medicines, History). |
| 10 | The Medicines screen has no add button, no empty state, and does not show a medicine's times or notes. A blank list is shown when there are no medicines. The times and notes the user enters on Add are saved but never displayed anywhere. | `MedicinesView.swift` (rows show `name` and `strength` only; no toolbar; no `ContentUnavailableView`); `AddMedicineView.swift` saves `times` and `notes` | Major | SHOULD (`components-structure.md:429`, for the toolbar add button). Empty-state guidance is CONSIDER (`patterns.md:240`). Showing schedule and notes is Taste (reviewer judgement). | Show a schedule summary under each medicine name (e.g. "08:00, 20:00") and the notes if present. Add a `+` toolbar button and a `ContentUnavailableView` with the add action. |
| 11 | Saving a medicine gives no confirmation. The form clears silently and the user stays on the Add tab. | `AddMedicineView.swift` `Save medicine` action (`name = ""; strength = ""; times = []; notes = ""`) | Major | SHOULD (`beyond-hig.md:30` "Every action gives some confirmation feedback") | Navigate to Today or Medicines after save, or show a brief confirmation. Dismiss the form if it is presented as a sheet. |
| 12 | Dose times are typed as free text ("HH:MM", `.numbersAndPunctuation` keyboard) instead of a time picker. The format is hard-coded 24-hour (`String(format: "%02d:%02d")`), while Today uses the locale time style. Users cannot see the 12/24-hour setting they chose. | `AddMedicineView.swift` `TextField("HH:MM", …)`, `parsedTime`, `Text(String(format: "%02d:%02d", …))`; `TodayView.swift` `Text(dose.scheduled, style: .time)` | Major | SHOULD (`components-presentation.md:206` "iOS date picker: … Use compact when space is tight") | Use `DatePicker("Time", selection:, displayedComponents: .hourAndMinute)` and format with `.time` style everywhere. |
| 13 | A dose scheduled earlier today stays Pending forever once its time passes. There is no Missed state. A medicine added after its time today gets a dose in the past. | `Models.swift` `add(_:)` (schedules `cal.date(bySettingHour:…, of: .now)`); `TodayView.swift` shows any pending dose | Major | Taste (reviewer judgement; Apple silent on missed-dose state) | Mark past-due pending doses as Missed (or Overdue) with a distinct style, and skip creating doses before the current time for a newly added medicine. |
| 14 | Times cannot be removed from the Add form once added, and duplicates are allowed. A wrong time means clearing the whole form. | `AddMedicineView.swift` `ForEach(times.indices)` (display only); `Button("Add time")` appends with no duplicate check | Minor | Taste | Add `.onDelete` on the times list and ignore duplicate times. |
| 15 | `Save medicine` is disabled until a name and a time exist, with no reason shown. The `Add time` button is disabled on invalid HH:MM with no message. | `AddMedicineView.swift` `.disabled(name.isEmpty || times.isEmpty)`, `.disabled(parsedTime == nil)` | Minor | SHOULD (`patterns.md:102` "Validate each field as it is filled in and give immediate feedback") | Show a footer under the form explaining what is missing ("Add a name and at least one time"). Show an inline error for invalid times. |
| 16 | History rows show taken or skipped only as an icon (`checkmark.circle` or `forward.circle`). No text says "Taken" or "Skipped". | `HistoryView.swift` `Label { … } icon: { Image(systemName: …) }` | Minor | Taste | Add a status line such as "Taken" or "Skipped" under the time, or use the same `Label` style as Today. |

**Trust:** No deceptive patterns found in what was seen. Finding 5 is a false capability claim, not a dark pattern. It is listed as Major, not as a Trust-gate Blocker.

**waived: 0** (no profile waivers).

## 3. Trust

No deceptive patterns found in what was seen. The reminders copy in finding 5 is an inaccurate description of a feature that does not exist yet. Rewrite: "Add a medicine to see today's doses."

## 4. Landscape

Category: personal medication reminder and dose tracking, iOS.

Studied (sources checked 2026-10-26; from search snippets, not full page fetches, so landscape claims are not fully verified):
- **Medisafe Pill Reminder** (medication reminders, drug-interaction database). Source: https://apps.apple.com/th/app/id573916946 (store page, checked 2026-10-26). A 2026 roundup calls it the largest name in pure medication reminders: https://digitalhealth.folio3.com/blog/?p=15182 (checked 2026-10-26; secondary, third-party roundup).
- **MyTherapy Medication Reminder** (reminders plus a health diary to share with a doctor). Source: https://apple.co/2FB72Zp (App Store, checked 2026-10-26). Reviews praise its reminders; a recurring complaint is that family members cannot see which medicines were taken or missed (secondary roundup and reviews, `(unverified)` detail).
- **Apple Health** (adjacent exemplar: no-cost health log). Source: https://digitalhealth.folio3.com/blog/?p=15182 (same roundup; secondary).
- Round Health: not found in search. Not studied.
- Caveat: https://bearable.app/?p=19925 is a comparison by Bearable's own team, disclosed as such; not used for ranking.

Four lists (landscape step, `(unverified)` where marked):
- **Conventions to keep:** a dose list ordered by time with Take and Skip actions (`(unverified)` from roundups); a history log of taken and skipped doses.
- **Convergence to avoid:** none measured. The product is already the stock template, which is itself the risk in the Distinctiveness verdict.
- **Frontier moves:** reminders delivered as notifications with Take and Skip actions (Apple notifications allow up to four actions, `components-presentation.md:419`); an adherence summary.
- **Openings:** sharing a schedule and taken status with a caregiver. MyTherapy's reviews name the caregiver gap as a complaint (`(unverified)`); this fits the product's audience of people managing other people's medicines. Do not add it without a product decision.
- **Core-task step count (peer):** not sourced. The rework bar's peer-gap condition is not met.

## 5. Distinctiveness verdict

**default-assembled.** Evidence:
- Channels: platform default (stock `TabView`, `NavigationStack`, `List` with `.insetGrouped`, `ContentUnavailableView`, `.borderedProminent`, SF Symbols throughout). Library default: none. Trend default: none. Authored: only the hard-coded `#4B5563` (`Models.swift`), which is the one custom color and breaks dark mode (finding 1).
- The slop-catalog was not counted tell by tell (no rendering), so no numeric tell count is given. The verdict rests on the channel review: one authored choice, and it is a defect.
- Logo-off and competitor-swap tests need rendered screens: Unverified.
- No `direction` is set in the profile, so directions are offered below.

**Directions (2, for the user to pick; none adopted):**
- **A. Calm clinical:** neutral system palette, one accent (a teal or blue) used only for the due dose and the Take action, system text styles, minimal chrome. Differs from default on: accent role, density of the Today screen (grouped Due / Done sections).
- **B. Quiet routine:** schedule-first layout where the day reads as a timeline with dose ticks; accent reserved for taken. Differs on: layout idiom (timeline vs list) and motion (one restrained tick animation on Take).
- Neither is a look to copy from a peer. Both must be checked against the product's audience and the Blocker fixes first.

## 6. Type

System font only (no `UIAppFonts` in `Info.plist`). One fixed size: `.system(size: 13)` in `TodayView.swift` (finding 8). Other text uses built-in styles (`.headline`, `.subheadline`, `.caption`, default). The type-eval script was not run (no rendered page). Unverified.

## 7. Reworks

No rework warranted. Reason: the defects are fixable per row (findings 1 to 16), and the largest gaps (reminders, persistence, editing) are missing features, which are enhancements under the rework bar's premise rule. No root cause is shared by three or more findings that per-row fixes cannot remove.

## 8. Enhancements

Up to 8. Fewer than that, because the evidence is thin without a rendered build.

**Experience and flows**
1. **Reminders as notifications with Take and Skip actions.** Principle: Responsibility. Product hook: the Today empty state already promises reminders; the Take and Skip actions match the existing row actions. Mechanism: one `UNNotificationRequest` per dose with two actions; request permission in context after the first medicine is saved. Unlocks: the app does what its copy says, and doses can be taken without opening the app. Peers: frontier move (roundup sources above, `(unverified)`).
2. **Due and Done grouping on Today.** Principle: Simplicity. Product hook: today's list mixes pending, taken and skipped doses sorted only by time (`TodayView.swift`). Mechanism: two sections, "Due" (pending, sorted by time) and "Done" (taken or skipped). Unlocks: the next dose is the first thing seen.
3. **Haptic on Take.** Principle: Craft. Product hook: the Take button gives no feedback beyond the row changing. Mechanism: `.sensoryFeedback(.success, trigger:)` on the taken state. Unlocks: confirms the action without another screen.

**Information architecture**
4. **Adherence summary at the top of History.** Principle: Purpose. Product hook: History lists rows with no totals. Mechanism: a single line such as "This week: 12 taken, 2 skipped" above the list. Unlocks: the question "am I on track" is answered without scanning rows.

**Content and voice**
5. **Dose time shown as a single, locale-aware string everywhere** (see finding 12). Principle: Familiarity. Mechanism: `.time` style in Add and Medicines as well as Today. Unlocks: consistent time format with the user's system setting.

**Platform capabilities**
6. **Home Screen or Lock Screen widget for today's next dose.** Principle: Flexibility. Only once finding 5 is done and persistence exists. Unlocks: a glance at the next dose without opening the app. Landscape: not checked beyond the roundups.
7. **Editable medicines** (tap a row to edit name, strength, times, notes). Principle: Agency. Product hook: the only way to correct a medicine is to delete it, which loses history (finding 2). Unlocks: corrections without data loss.
8. **Caregiver view of today's doses.** Principle: Responsibility. Opening only; needs a product decision and a privacy review before any design. Not proposed as a build item.

## 9. Unverified

- **Dark-mode contrast of finding 1:** the background (#1C1C1E) is assumed. Verify with Accessibility Inspector on a dark-mode device or simulator; ratios would change if the cell background differs.
- **Light-mode contrast of finding 3:** system green RGB recalled from memory. Verify on a device; if it fails, upgrade finding 3 to Blocker.
- **Skip and Take hit area:** the `.borderless` icon buttons have no explicit frame, so they may be smaller than the 44x44 pt control size (`content-a11y.md:31`). Verify with Accessibility Inspector frames.
- **Dynamic Type at AX5:** `TodayView` `DoseRow` uses an `HStack` with two buttons and a long medicine name. Truncation or overlap is unseen. Verify by setting the largest accessibility text size on a device.
- **Empty, error, loading and offline states:** no loading or error state exists in source (synchronous in-memory store). Empty states for Today and History were read from code and not seen rendered. Verify by launching with no medicines.
- **Dark mode, increased contrast, reduced motion, RTL, pseudo-localized text, narrow and very wide widths:** not seen (no simulator). Verify by running the app.
- **Transient feedback:** none in source for Save, Take or Skip (no toast, haptic or animation). Verify by taking a dose on a device and watching for a visible change.
- **Notification delivery:** no scheduling code exists, so delivery cannot be verified from source. Verify once finding 5 is implemented.
- **Past-due behavior (finding 13):** read from `add(_:)` and the Today filter; not exercised. Verify by adding a medicine with a time earlier than now.
- **App Review (4.2, 2.1):** not gated (`release_stage: development`). The reminders copy would be a placeholder-like issue at release. Re-check before submission.
- **Landscape:** based on search snippets and roundups (some from a vendor's own comparison, disclosed). Step counts for peers were not sourced, so the peer-gap rework condition is not met.
- **Localization:** no `.strings` or `.xcstrings` in the project. Localization not reviewed.

## 10. Offer

**Fixable in code now, if the user picks findings:**
- Contrast tokens: findings 1 and 3.
- Copy rewrites: findings 5 (empty-state line), 15 (validation footer text), 16 (status text).
- Accessibility labels and text styles: findings 6 and 8.
- Add flow and navigation: findings 9, 10 (add button, empty state, schedule summary), 11 (confirmation after save), 12 (time picker), 14 (remove times).
- Data loss fix: finding 2 (choice needed: keep history on delete, or confirm the loss).

**Design decisions needed first:**
- Finding 2: keep history after deleting a medicine, or confirm the loss? (Affects the data model.)
- Finding 4 and enhancement 1: persistence and notifications are scope decisions, not bug fixes.
- Finding 13: Missed state wording and visual treatment.
- The two directions in section 5.

**Enhancements and reworks:** the user decides. Enhancements 1 to 8 are offered as options. No reworks.

**Optional input that would let the skill verify more:** a simulator build or a booted device (for dark mode, Dynamic Type and hit areas), and the Xcode project's `.xcassets` color sets if any exist (none were in the source provided).

**Not written:** no `.loupe.md`. No files in the user's project were edited.
