<!-- model: claude-opus; skill commit: 7559367 -->

# Dosewise: design review (loupe)

## 1. Summary

**Reviewed:** the whole app (4 tabs: Today, Medicines, Add, History; 7 Swift files), from native SwiftUI source only, with no simulator. There was no `.loupe.md`, so I worked from an inferred profile (assumptions below) and did not write the file.

**Verdict:** The screens are built from correct stock SwiftUI parts, but the app doesn't yet do its one job. It asks for notification permission, then never schedules a reminder. Doses exist only for the day a medicine was added. Nothing survives a relaunch. Two status colours fail text contrast.

**Most important:** Rework 1, make the schedule a persistent first-class object that generates each day's doses and reminders. It clears findings 4, 5, 12 and 17. Separately, fix the two contrast Blockers (1, 2), which are small token changes.

**Assumptions (owner unavailable, so I proceeded on defaults):**
- `purpose`: "Remind a person to take their medicines on schedule and keep an honest record of what was taken or skipped." Inferred from the empty-state copy, `TodayView.swift:12` and `HistoryView.swift:12`.
- `feeling`: calm and certain ("I know whether I took it"). Inferred.
- `audience`: occasional-public. A consumer who uses it daily, but not a professional.
- `register`: utilitarian. It's a frequent check-and-act task.
- `motion_personality`: serious, relaxed.
- `platforms`: ios (iPhone only: `TARGETED_DEVICE_FAMILY = 1`, portrait only in `Info.plist`).
- `build_sdk`: unknown. There's no `LastUpgradeCheck`, `.xcode-version`, CI config or Xcode-26-only API, and `SDKROOT = iphoneos` has no version.
- `deployment_targets.ios`: 17.0 (`project.pbxproj`). `design_compatibility_opt_out`: false (key absent).
- `release_stage`: development (as the request states).
- `density`: comfortable.
- `brand`: none. There's no asset catalog, AccentColor, custom font or app icon.
- `voice`:
  - Traits inferred as "plain but not clinical".
  - Casing follows Apple's native defaults (Title Case buttons). The app's current strings are mixed, see finding 22.
  - `spelling`: undetermined (no -our/-or or -ise/-ize words), so nothing is flagged.
  - `humor`: none. `we_policy`: avoid.
- `category`: medication reminders and adherence. `peers`: none given; the landscape step chose them.
- `direction`: empty, so section 5 proposes directions.
- `waivers`: none.

**Questions I'd have asked in one batch (no answers, defaults above):**
1. Purpose and feeling in one sentence each.
2. Who is the user: the patient, a caregiver, or both?
3. Which apps do you measure yourselves against?
4. Which Xcode/SDK do you build with?
5. Are persistence and notification scheduling planned but not yet written? This decides whether findings 4 to 6 are bugs or unfinished work.
6. Spelling preference.
7. Humor: none or light?
8. Which direction in section 5 do you prefer?
9. Saving `.loupe.md`: not done, per the instructions.

**Run notes:**
- **Tools:**
  - Read the source in `dosewise/` and the skill references.
  - Ran `scripts/contrast.py` on source-known colour pairs. Apple's published system colour values were used for `.green` and the grouped-cell backgrounds (light `#FFFFFF`, dark `#1C1C1E`), and `#4B5563` comes from `Models.swift:68`.
  - Computed OKLCH for the sketch values with an inline Python conversion.
  - Web research for the landscape (WebSearch and WebFetch, 2026-10-26). These requests went to third-party sites.
- **Not used:**
  - No simulator was available, so there are no screenshots and no appearance or content-size changes were made.
  - Playwright, `measure-runner.js` and `type-eval.js` were not run. The target is native, and no specimen page was built because the app ships only the system face.
- **Side effects:** none. No files were edited apart from this report, and no `.loupe.md` was written.
- **Measured results:**
  - "Taken" label: `.green` (`#34C759`) on a white cell is **2.22:1**. With Increase Contrast (`#248A3D`) it's 4.40:1, which still fails for 17 pt text.
  - `doseTakenText` `#4B5563` on a dark cell (`#1C1C1E`) is **2.25:1**. On white it's 7.56:1.
- **Whole-app split:** none. The app has 4 screens and 7 view and model files, under the split threshold, so every pass ran inline.
- **26 gate:** the SDK is unknown, so I gated on the iOS 17.0 deployment target and skipped the `(26+)` checks (see Unverified).

## 2. Findings

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | The "Taken" status label and its checkmark use `.green`. That's `#34C759` on a white inset-grouped cell: **2.22:1** for 17 pt text (WCAG 1.4.3 needs 4.5:1), and the icon also fails 1.4.11's 3:1. Even with Increase Contrast it's 4.40:1. It's the confirmation the user scans for. | Today, `DoseRow`, `TodayView.swift:53-54` | Blocker | SHOULD | Keep the text in `.primary` or `.secondary` and put colour only on the symbol, at a value of at least 3:1 in both appearances. Or define a "taken" colour set with light/dark/IC values of at least 4.5:1 (for example `#1E7A35`-class greens in light; check with `contrast.py`). |
| 2 | The time text of a taken dose uses the literal `Color(hex: 0x4B5563)`, which has no dark or increased-contrast variant. On the dark cell `#1C1C1E` it's **2.25:1** at 13 pt, and on `#2C2C2E` (elevated) it's 1.84:1. | Today, `TodayView.swift:37`; token at `Models.swift:68` | Blocker | SHOULD | Delete `doseTakenText` and use `.secondary`. That already marks the row as done and adapts to dark mode and Increase Contrast. If a distinct role is wanted, add a Color Set with four values. |
| 3 | The Medicines tab has no empty state. A new user sees a blank list under "Medicines" with no explanation and no way to add one from there. Apple says an empty tab section explains why it is empty. | Medicines, `MedicinesView.swift:8-16` | Major | MUST | Add `ContentUnavailableView("No Medicines", systemImage: "pills", description: Text("Add a medicine and its times to get reminders."))` with an "Add Medicine" button (see Rework 2). |
| 4 | Reminders are never scheduled. The app requests `.alert/.sound/.badge` permission (`DosewiseApp.swift:9`) and the Today empty state promises "Add a medicine to start getting reminders", but no `UNNotificationRequest` exists anywhere in the source. The product's purpose (reminding) doesn't happen. | App-wide; `Models.swift:43-51` | Major | SHOULD | When a medicine is saved, schedule one repeating `UNCalendarNotificationTrigger` per dose time. Set `interruptionLevel = .timeSensitive` and add Taken and Skip actions. Remove or update the requests on edit and delete. Until then, remove the "reminders" promise from the copy. |
| 5 | Doses exist only for the day a medicine is added. `add()` creates today's instances once and nothing creates tomorrow's, so from day 2 Today shows "No doses today. Add a medicine to start getting reminders." to someone who has medicines. Adding a medicine at 20:00 with an 08:00 time also creates an already-overdue pending 08:00 dose. | Today; `Models.swift:27-30, 43-51` | Major | SHOULD | Derive each day's doses from the medicine's times (Rework 1). Don't create instances for times already past on the day of adding, or mark them as not due. |
| 6 | Nothing persists. `MedStore` is an in-memory `@Observable` (`Models.swift:22-25`). The types are `Codable` but are never encoded, so medicines and history vanish when iOS ends the process. | App-wide | Major | SHOULD | Persist with SwiftData or a JSON file (encode on change, load at launch). In development this may be unfinished (see Unverified); in a release build it is data loss and a Blocker. |
| 7 | "Add" is a tab (`plus.circle.fill`) that performs an action. Apple: tab bars are "navigation only, never actions (no center '+' compose tab)". It also leaves the Add form living as a permanent destination. | Tab bar, `RootView.swift:10-11` | Major | SHOULD | Remove the Add tab. Put an "Add Medicine" (`plus`) toolbar button on Medicines that opens a sheet with Cancel and Add (Rework 2). |
| 8 | Dose times are typed as free text "HH:MM" with a `.numbersAndPunctuation` keyboard instead of a time picker. The list renders times with hard-coded `%02d:%02d` 24-hour formatting, which ignores the user's 12-hour locale, and an added time can't be removed. | Add, `AddMedicineView.swift:25-35` | Major | SHOULD | Use `DatePicker("Time", selection:, displayedComponents: .hourAndMinute)` (compact). Show the added times as `Text(date, style: .time)` rows with `.onDelete`. Store the hour and minute. |
| 9 | Save stays disabled with no reason given. The time field is prefilled "08:00", so it reads as already set, but the time only counts after tapping "Add time". A user who types a name and looks for Save finds it dimmed. Fails the cognitive walkthrough at "notice the correct action". | Add, `AddMedicineView.swift:7, 29-34, 45` | Major | SHOULD | With a picker (finding 8), seed `times` with one default time so the form starts valid. Otherwise put a footer under Schedule: "Add at least one time." |
| 10 | Saving gives no feedback. The form silently clears and stays on the Add tab, so the user can't tell whether the medicine was saved, or saves it twice. | Add, `AddMedicineView.swift:41-44` | Major | SHOULD | Dismiss the add sheet and show the new row in Medicines and the new dose in Today (Rework 2). In the interim, switch to Today after saving. |
| 11 | Taken and Skip are one-tap and permanent. There's no undo, and no way to change a logged dose on Today or History. A mis-tap records a dose that wasn't taken (risking a missed dose) or a skip that was taken (risking a double dose). | Today, `TodayView.swift:43-48`; `Models.swift:37-41` | Major | SHOULD | Make a resolved row's status tappable: a menu with "Mark as Taken", "Mark as Skipped" and "Mark as Not Taken" (back to pending). Also add swipe actions in History. Support shake-to-undo through `UndoManager` for the last resolve. |
| 12 | Deleting a medicine is swipe-only, with no Edit button, confirmation or undo. It also deletes every dose ever logged for it (`doses.removeAll`, `Models.swift:56`), erasing the adherence history. The "Removed medicine" fallback in History (`HistoryView.swift:17`) can therefore never appear. | Medicines, `MedicinesView.swift:15`; `Models.swift:53-57` | Major | SHOULD | Add an `EditButton`. Keep the history and archive the medicine instead of deleting it. Confirm with "Delete Metformin? Its reminders stop. Your history stays." Buttons: "Delete Medicine" and Cancel. |
| 13 | The dose time is set in `.system(size: 13)`, which ignores Dynamic Type. The one fact the row exists to show stays at 13 pt while the name grows to 53 pt at AX5. | Today, `TodayView.swift:36` | Major | SHOULD | Use `.font(.subheadline)` (or `.footnote`) with `.monospacedDigit()`. |
| 14 | Skip is an icon-only `forward.circle` button with no label. VoiceOver reads the symbol's derived name, not "Skip". Voice Control can't match "Tap Skip". The glyph-sized hit area is under the 44 pt goal (estimated from source). | Today, `TodayView.swift:43-47` | Major | SHOULD | Use `Button("Skip", systemImage: "forward")` with `.labelStyle(.titleAndIcon)`, or at least add `.accessibilityLabel("Skip")`. Pad the hit area to 44×44 pt with `.contentShape`. |
| 15 | History shows taken versus skipped only by the icon shape (`checkmark.circle` versus `forward.circle`). The `Label` icon isn't announced, so VoiceOver users hear the name and time but not the outcome. | History, `HistoryView.swift:15-24` | Major | SHOULD | Add the outcome as text, for example "Taken at 8:04 AM" or "Skipped" in the subtitle, which also surfaces `resolvedAt` (finding 25). Or set `.accessibilityValue(dose.status == .taken ? "Taken" : "Skipped")`. |
| 16 | Notification permission is requested in `App.init` on first launch, before any medicine exists and without saying why. The result is ignored, so if the user declines, nothing in the app ever says reminders are off. | First launch, `DosewiseApp.swift:8-10` | Major | SHOULD | Ask after the first medicine is saved, with context: "Get a reminder at each dose time." If permission is denied, show an inline row on Today, "Reminders are off", with a button that opens Settings. |
| 17 | Medicine rows are dead ends: no detail and no edit. The schedule times and the Notes field are never shown anywhere, so Notes is write-only. Changing a time means deleting the medicine, which also deletes its history (finding 12). Reviewer judgement. | Medicines, `MedicinesView.swift:9-14`; `AddMedicineView.swift:37-39` | Major | SHOULD | Make rows navigate to a detail screen showing strength, times, notes, the last 7 days and an Edit button (Rework 1 and 2). Apple Purpose: "every screen visibly serves" the purpose. |
| 18 | Overdue doses look the same as upcoming ones. A pending 08:00 dose at 15:00 has the same style, the same prominent "Take" button and no "late" cue, so Today doesn't answer "did I miss one?". | Today, `DoseRow`, `TodayView.swift:31-58` | Major | SHOULD | Split Today into "Due / Missed" and "Later", or add a "Due 7 h ago" subtitle with an icon and text (not colour alone). Agency: "The system shows status, meaning what is happening now." |
| 19 | Slop cluster: 7 catalogued tells across 3 or more channels (layout idiom, iconography, sound and haptics): an action "+" tab (7), a disabled Save with no hint (9), a swipe-only destructive gesture (12), an icon-only control (14), a permission ask on first launch (16), placeholder-only form labels (24), and no haptic or other character on the core Take moment. Three of them sit in "Components and feedback". Nothing in the UI is traceable to medication. | App-wide | Major | Taste | Fix the individual rows first. Then choose a direction from section 5 (Rework 3) instead of swapping tells one by one. |
| 20 | Every pending row carries its own `.borderedProminent` "Take", so five doses means five prominent buttons and no single primary action. | Today, `TodayView.swift:48-49` | Minor | SHOULD | Make "Take" prominent only on doses that are due now. Use `.bordered` for later doses (this pairs with finding 18). |
| 21 | Today's empty state has no action, and its icon (`checkmark.seal`) reads as "all done". The same copy shows on first run and on a day whose doses are finished. Apple: an empty state "gives a next step, with a button". | Today, `TodayView.swift:10-12` | Minor | SHOULD | First run: title "No Medicines Yet", body "Add a medicine and its times. Doses appear here each day.", button "Add Medicine". Day done: title "All Done for Today", body "Next dose: Metformin at 8:00 AM." |
| 22 | Button casing is mixed: "Save medicine" and "Add time" (sentence case) versus "Clear History" and the "Add Medicine" title (Title Case). Apple's native push-button labels are Title Case. | Add, `AddMedicineView.swift:31, 41`; History, `HistoryView.swift:36` | Minor | SHOULD | "Save Medicine", "Add Time". |
| 23 | Form fields use placeholders as their only labels: "Name", "Strength, e.g. 500 mg", "HH:MM", "Optional". Once text is typed, the example and the field's meaning disappear. | Add, `AddMedicineView.swift:21-22, 29, 38` | Minor | CONSIDER | Use `LabeledContent` or a leading label ("Strength" plus placeholder "500 mg"). Rename the Notes placeholder to "Taken with food, etc." |
| 24 | The dose row is one fixed `HStack` (name/time, Spacer, Skip, Take). At accessibility sizes the name gets squeezed beside two buttons. Judged from source. | Today, `TodayView.swift:31-59` | Minor | CONSIDER | Use `ViewThatFits`, or switch to a `VStack` when `dynamicTypeSize.isAccessibilitySize` is true, with the buttons on their own line. |
| 25 | History is one flat list with no date sections and shows only the scheduled time. `resolvedAt` is recorded but never shown, so "taken 3 hours late" is invisible. Reviewer judgement. | History, `HistoryView.swift:14-25` | Minor | Taste | Add a `Section` per day (header "Today", "Yesterday", date) and a subtitle "Taken 10:42 AM · due 8:00 AM". |
| 26 | +2 polish: (a) the tab symbols read oddly: `pills` marks Today and `cross.vial` (a lab test) marks Medicines, so `pills` belongs on Medicines and Today wants a day or checklist symbol; (b) an empty `strength` leaves a blank secondary line in Medicines rows (`MedicinesView.swift:12`). | Tab bar, Medicines | Polish | Taste | (a) Swap to `pills` for Medicines and `checklist` for Today. (b) Hide the line when empty. |

waived: 0

## 3. Trust

I found no deceptive patterns in the source: no confirmshaming, fake urgency, preselection or invented counts. The notification request at launch (finding 16) is a timing and rationale problem, not a deceptive one, because it uses the system alert with nothing pre-selected.

## 4. Landscape

**Category:** medication reminders and adherence (nearest seed playbooks: Health, and Consumer utilities). Checked 2026-10-26.

| Product | Why | Source |
|---|---|---|
| Apple Health, Medications | Platform leader, built in; the expectation every iPhone user brings | https://support.apple.com/en-ca/105064 ; https://www.macworld.com/article/2521302/how-to-adjust-medications-reminders-on-your-iphone-ipad-and-apple-watch.html |
| Medisafe | Category leader among third-party apps | https://help-center.medisafe.com/en/articles/8097804-my-medfriend-is-not-receiving-reminders-for-my-missed-doses ; https://help-center.medisafe.com/en/articles/8097801-what-is-a-medriend-and-how-does-the-feature-work ; https://intuitionlabs.ai/software/patient-education-engagement/medication-adherence-apps/medisafe `[S]` |
| MyTherapy | Challenger, praised for reliability | https://techguide.parkinsons.org.uk/catalogue/my-therapy/review `[S]` ; https://healthify.nz/apps/m/mytherapy-meds-pill-reminder-app `[S]` ; https://mytherapyapp.com |
| Hero Health | Adjacent exemplar: a hardware dispenser that solves the same job with escalation, not an app UI | https://herohealth.com/caregivers/ ; https://support.herohealth.com/en/articles/14655324-notifications-reminders |

**Conventions to keep:**
- The reminder is a notification that carries the decision. In Apple Health you "tap the notification, then tap Skipped or Taken", and on Apple Watch "Remind Me in 10 Minutes" is also offered (Apple Support 105064).
- Both taken and skipped are recorded (Apple; MyTherapy: "documents every intake, whether taken or skipped").
- Doses recur daily from a schedule, and the record persists.

**Frontier moves:**
- Follow-up reminders when a dose isn't logged 30 minutes after it's due. Apple offers optional Critical Alerts per medication that sound through Focus and mute (Apple Support 105064, Macworld).
- Resending until resolved (MyTherapy, Healthify `[S]`).
- Escalation to a caregiver about 1 hour after an unlogged dose (Medisafe "Medfriend", help center), or 15 minutes after (Hero).
- Adherence reports shared with clinicians as PDF (Medisafe, `[S]`).

**Convergence to avoid:**
- A caregiver feature as the headline when the core reminder isn't reliable.
- Stock health teal or blue with a pill glyph as the whole identity (unverified: peers' identity combinations weren't checked visually).

**Openings** (unverified: no peer was confirmed to lack these):
- Show taken time against due time as a plain, judgement-free record ("taken 2 h late"). Dosewise already stores `resolvedAt`.
- A day modelled as the physical artefact people already use to organise doses, a weekly pill box or blister card (Direction A).

**Core-task step count (log a due dose):**
- Apple Health: 2 inputs (tap notification, tap Taken). Sourced, Apple Support 105064.
- Dosewise: 2 inputs (open app, tap Take), but only if the person remembers unprompted, because no reminder ever fires (finding 4).

The input counts are equal, so the peer-gap bar isn't met. The gap is reliability, not steps.

## 5. Distinctiveness verdict

**default-assembled.**

**Channels** (none authored):

| Channel | Source | Evidence |
|---|---|---|
| Type | Platform default | Stock text styles, plus one literal 13 pt (`TodayView.swift:36`) |
| Color | Platform default | System tint, `.green`, `.secondary`, one hex (`Models.swift:68`); no AccentColor |
| Shape | Platform default | Inset grouped and Form |
| Motion | Platform default | None authored |
| Iconography | Platform default | Stock SF Symbols |
| Imagery | None | |
| Sound and haptics | Platform default | None. This is a slop-catalog tell (Apple-clone, "Restraint copied as emptiness"): the core Take moment would benefit from character. |
| Layout idiom | Trend or platform default | Includes the catalogued "+" action tab |
| Voice | Platform default | Plain and serviceable, but nothing a competitor wouldn't sign, e.g. "No history yet" |

- **Authored channels:** 0 of 9. **Signature element:** none. **Signature moments:** 0, visual or behavioural.
- **Catalogued tells:** 7, across layout idiom, iconography and sound and haptics (finding 19). That meets the slop-cluster threshold, which forces this verdict.
- **Logo-off test** (judged from source; no screenshots): nothing identifies the product.
- **Competitor-swap test:** with "Medisafe" or "MyTherapy" on these screens, nothing looks wrong.
- **Gate:** every flow has open Majors, so pleasure-tier work waits for the fixes. Directions are proposed now so the team can choose.
- **Default check** (the theme I'd generate for "medication reminder app"): a teal or health-blue accent, white rounded cards, a pill glyph, green checkmarks, and SF Rounded. Both directions below avoid it on colour and on layout idiom.

**Inferred candidate principles** (no brand doc; finding "No authored point of view" is folded into 19):
1. Certain over cheerful: state is always explicit.
2. The record is honest: late is shown as late, never hidden or scolded.
3. Quiet until due: nothing competes with the next dose.

### Direction A: "Blister card"
**Source sentence:** many people organise doses in a pill box or blister card, where each pocket is one dose and an empty pocket is unmistakable.

**Register:** utilitarian, with one behavioural moment. **Motion:** serious, relaxed.

**Color:**

| Role | Value | Trace | Contrast |
|---|---|---|---|
| Surface | System grouped backgrounds | Task flows stay system | n/a |
| Taken fill (pocket emptied, non-text) | Amber `oklch(78.7% 0.147 73)` `#F2A93B` | Amber prescription vials, US pharmacy vernacular | Glyph `#1C1C1E` on it: 8.52:1. Never used as text on white (2.0:1). |
| Taken text, light | `oklch(49.4% 0.109 67)` `#8A5300` | Same amber | 6.33:1 on white |
| Taken text, dark | `oklch(81.4% 0.143 77)` `#F5B547` | Same amber | 9.38:1 on `#1C1C1E` |

The three values derive from one input (hue around 70); the increased-contrast variant uses the light-text value on both fills.

**Type:** system face in every role, plus `.monospacedDigit()` on times. No new face, so nothing to license or measure.

**Shape:** each day row shows a strip of round "pockets", one per dose. Each pocket is filled while pending and emptied (outline) when taken. Skipped is marked with a slash and the text "Skipped". Radius is circular for pockets only; everything else stays system.

**Motion:**
- Productive: system defaults.
- Expressive: the pocket empties with a short scale-down and fade (about 0.2 s, ease-out) plus `.sensoryFeedback(.success)`.
- Reduce Motion: fade only.

**Iconography:** custom pocket symbols drawn from an SF template, with accessibility labels.

**Signature element:** the pocket strip, which recurs on Today, the widget, notifications (as a thumbnail) and the icon.
**Signature moment:** emptying the pocket on Take.

**Voice samples:**
- Button: "Take"
- Empty state: "No doses left today. Next: Metformin at 8:00 AM."
- Error: "Reminders are off. Turn them on in Settings to get a reminder at each dose time."

**Landscape position:**
- vs Apple Health: a physical-artefact day model instead of a list (Apple Health's look was not checked visually, unverified).
- vs Medisafe and MyTherapy: amber vial vernacular instead of their brand hues (unverified).
- vs Hero: borrows its "one dose, one slot" idea as UI, not hardware.

### Direction B: "Administration record"
**Source sentence:** care homes and wards track this exact job on a medication administration record (MAR), a grid of times against days, initialled per dose, with exceptions marked in red.

**Register:** utilitarian, dense. **Motion:** serious, fast.

**Color:** monochrome ink, with one hue reserved for one meaning.

| Role | Value | Trace | Contrast |
|---|---|---|---|
| Text | System label | Ink | n/a |
| Missed or late, light | `oklch(50.1% 0.178 29)` `#B3261E` | Red pen for exceptions on paper MARs | 6.54:1 on white |
| Missed or late, dark | `oklch(75.9% 0.144 26)` `#FF8A80` | Same red pen | 7.45:1 on `#1C1C1E` |

There's no accent for "taken": a tick plus the time in the label colour. Red never appears without text ("Missed", "Late").

**Type:** system face. Weight does the hierarchy, and tabular digits make the time column the spine.

**Shape:** square-cornered grid cells in History (days × dose times). Today remains a list.

**Motion:**
- Productive only. Taking a dose ticks instantly with `.sensoryFeedback(.impact(weight: .light))`.
- Reduce Motion needs nothing to change.

**Signature element:** the week grid in History, also in the PDF export (Enhancement 6).
**Signature moment** (behavioural): every dose is ticked with its real time, the same way, every time.

**Voice samples:**
- Button: "Take"
- Empty state: "Nothing due today."
- Error: "Reminders are off. Turn them on in Settings."

**Landscape position:**
- vs Apple Health: a clinical-record grid instead of a consumer list (unverified).
- vs Medisafe: an honest record without a caregiver-first framing.
- vs MyTherapy: no brand hue at all.
- vs Hero: a record-first model, not device-first.

**How A and B differ:** colour (amber state fill versus red exceptions only), shape (pockets versus grid), motion (expressive moment versus productive only), and layout idiom.

## 6. Type

```
Face: SF Pro (system), stock weights via text styles. Roles: UI, data (times)
Legibility: PASS. x-height n/a (not measured); confusables not measured (native, no specimen run); weights Regular, Semibold (headline); Bold Text yes for text styles, the literal .system(size: 13) also follows Bold Text but not Dynamic Type
Figures and features: tabular available (.monospacedDigit()), not used on dose times; distinct zero n/a (no codes shown)
Coverage: system, all scripts; locale issues: hard-coded 24-hour "%02d:%02d" times (finding 8)
Scaling: Dynamic Type ok except TodayView.swift:36 (finding 13); 1.4.12 n/a native
Delivery (web): n/a
Distinctiveness: default tier yes; identity carried by nothing
Verdict: Keep (system face is right for a utilitarian task flow). Tune: .monospacedDigit() on times, a text style instead of size 13
Evidence: source only; type-eval.js not run (native target, system face only)
```

## 7. Reworks

### Rework 1: The schedule as a first-class, persistent object
- **What changes:**
  - Before: `Medicine.times` is copied once into today's `Dose` instances at add time. Nothing recurs, nothing reminds, nothing can be edited without orphaning doses, and deletion takes history with it.
  - After: a persisted `Schedule` (per medicine: times and active days) is the single source. Today's doses and the repeating notification triggers are derived from it. Logged doses are an append-only record keyed to the medicine, which is archived rather than deleted.
- **Bar:** Cluster. Findings 4, 5, 12 and 17 share one cause: there's no schedule entity, only one-shot dose instances. Per-row fixes (for example regenerating doses at midnight) leave the cause in place, and editing a time would still orphan doses.
- **Evidence:** findings 4, 5, 12 and 17; `Models.swift:43-57`. Apple Health and MyTherapy both treat recurrence plus notification as baseline (section 4).
- **Cost:**
  - `Models.swift` (new `Schedule` and persistence), plus `TodayView`, `HistoryView`, `MedicinesView` and the add/edit form.
  - A notification scheduler.
  - No learnability risk (the UI shape barely changes). There's no user-data migration, because nothing persists today.
- **Unlocks:** reminders, a second day that works, editing, honest history, and the widget, intents and PDF enhancements, which all read from the schedule.
- **Smallest experiment:** build the `Schedule` plus derived-today in a branch. Run it on a device for 3 days with 2 medicines and confirm that Today, notifications and History agree each morning.

### Rework 2: Medicines becomes the medicine's home (remove the Add tab)
- **What changes:**
  - Before: four tabs, one of which is an action. The list rows are inert, and saving silently resets a form.
  - After: three tabs (Today, Medicines, History). Medicines has a `+` toolbar button that opens an "Add Medicine" sheet (Cancel / Add), an empty state with "Add Medicine", and rows that open a detail screen with Edit.
- **Bar:** Cluster. Findings 3, 7 and 10 share one cause: creating a medicine was split into its own tab instead of being an action on the Medicines collection. So the collection has no create path or empty-state action, and the form has nowhere to return to.
- **Evidence:** findings 3, 7 and 10 (and 17, which this rework's detail screen also resolves). Apple tab bar rule (SHOULD).
- **Cost:** `RootView` (drop one tab), `MedicinesView` (toolbar, empty state, navigation), `AddMedicineView` (becomes a sheet with dismiss), plus one new detail view. Learnability risk is low, because this is the standard iOS pattern.
- **Unlocks:** save feedback for free (the sheet dismisses onto the new row), an edit path, and a tab bar that maps to the product's three nouns.
- **Smallest experiment:** a throwaway prototype of the sheet flow. Ask 5 people to "add your evening tablet, then check it's there" and count hesitations against the current build.

### Rework 3: Identity from the subject (after Reworks 1 and 2)
- **What changes:**
  - Before: platform defaults throughout, with nothing owned.
  - After: one direction from section 5 applied to Today, History, the empty states, notifications and the icon. Task flows stay standard.
- **Bar:** Identity. The verdict is `default-assembled` with 7 tells, and fixing tells one by one would only swap in the next default.
- **Evidence:** finding 19; section 5's channel table; the logo-off and swap tests are both empty.
- **Cost:** Today's row component, History's layout, one colour set, custom symbols, a haptic, and the app icon. It's held behind the gate until the Majors are fixed.
- **Unlocks:** a reason to choose Dosewise over the free built-in Apple Health medications feature, and a defence against 4.3 "indistinguishable" risk in a saturated category.
- **Smallest experiment:** mock Today in Direction A and Direction B with the same 3 doses. Show both to 5 people who take daily medication, and ask which tells them faster what's left today.

## 8. Enhancements

Evidence was strong enough for 6 of the 8 allowed.

**Platform capabilities**
1. **Act from the reminder** (Agency). Give the dose notification "Taken", "Skip" and "Remind in 10 Min" actions, mirroring Apple Health's watch actions (section 4). Logging then takes two inputs without opening the app, which matches the best peer.
2. **Follow up once if unlogged** (Responsibility). Send one follow-up reminder 30 minutes after an unresolved dose, as Apple Health does. Offer it per medicine, honestly labelled, and never repeated beyond that. Critical alerts need an entitlement, so treat that as a later decision.
3. **Next dose at a glance** (Flexibility). Add a Lock Screen and Home Screen widget showing the next dose and how many are left today, plus a Control or App Intent "Log Next Dose". The Today list is exactly the glanceable, time-bound state these surfaces exist for.

**Experience and flows**
4. **Take a whole time slot at once** (Simplicity). People on several medicines take them together at 08:00. Group Today by dose time with one "Take All" per group (and individual overrides), which cuts N taps to 1. Apple Health has a comparable bulk log (unverified).

**Motion and feedback**
5. **A felt "taken"** (Craft). Add `.sensoryFeedback(.success, trigger: dose.status)` on Take, a distinct lighter haptic on Skip, and an animated status change that respects Reduce Motion. Today, Take is the core moment and it's silent. This is the seed of either direction's signature moment.

**Information architecture**
6. **A record worth showing a clinician** (Purpose). Turn History into a per-day record of due time versus taken time (from `resolvedAt`, already stored) with a "Share Report" PDF via the share sheet. Medisafe offers PDF adherence reports (section 4, `[S]`). Dosewise's honest late-or-taken record is the version no studied peer was confirmed to show (unverified).

## 9. Unverified

- **Rendering:** no screens were rendered (no simulator). Light and dark appearance, layout, truncation and real tap-target sizes weren't seen. To verify, boot a simulator, run the app, and capture each tab in light, dark and AX5 with `xcrun simctl`.
- **Contrast on iOS 26:** the ratios use Apple's published system colour values for iOS 17/18 (`#34C759`, `#248A3D`, `#1C1C1E`). If the app is built with the iOS 26 SDK, re-measure on device screenshots with `scripts/png_contrast.py`.
- **`(26+)` checks:** Liquid Glass tab bar behaviour, tab label tint and icon appearances were skipped. The build SDK is unknown and the gate fell back to the iOS 17.0 deployment target. To verify, confirm the Xcode version or CI image.
- **Possibly unfinished:**
  - Findings 4, 5 and 6 (no reminders, no recurrence, no persistence) may be unfinished development rather than design decisions. They're rated Major under `release_stage: development`; data loss (finding 6) becomes a Blocker in a release build.
  - No app icon or asset catalog exists. That's a placeholder note in development, not a finding.
- **Stress states:**
  - The dose row at AX5, with long medicine names, under pseudo-localisation (+40%) and in RTL, was judged from source only.
  - Increased Contrast and Reduce Motion weren't seen. Reduce Motion is irrelevant today, because the app has no custom motion.
- **Loading, error and offline:** none exist for local data. Notification-permission denial has no UI path (finding 16). To verify, deny permission on a fresh install.
- **VoiceOver:** the actual name read for the `forward.circle` Skip button wasn't heard (finding 14). To verify, use VoiceOver on a device or Accessibility Inspector.
- **Peer visuals:** peer identity combinations (accent hue, typeface, layout) weren't checked visually. Section 5's landscape positions are `(unverified)`.
- **Third-party sources:** the MyTherapy and Medisafe report claims come from third-party reviews `[S]`, not from the products themselves.

## 10. Offer

I can fix these in code now, if you want (nothing has been edited):
- **Contrast and colour tokens:** 1, 2
- **Dynamic Type and accessibility labels:** 13, 14, 15, 24
- **Copy and casing rewrites:** 21, 22, 23
- **Small structural fixes that don't need Rework 1:** 3 (empty state), 8 (time picker), 9 (valid default time), 16 (move the permission request), 20 (prominence on due doses only), 25, 26

These need a design decision first:
- 11: undo versus editable status.
- 12: archive versus delete.
- 18: due/missed sections versus a subtitle.
- Rework 1 covers 4, 5, 6 and 17; Rework 2 covers 7 and 10; Rework 3 needs a direction pick (A or B).

Enhancements and reworks are your call. I can build an enhancement (Enhancement 1 or 5 are the cheapest), or a throwaway prototype of a rework's smallest experiment (Rework 2's sheet flow, or Rework 3's two Today mocks).

Optional input that would let me verify more:
- A booted simulator with the app running, to capture light, dark and AX5 and re-measure contrast from pixels.
- The Xcode version, to run or rule out the `(26+)` checks.
- Answers to the profile questions in the Summary.

Which would you like me to do?
