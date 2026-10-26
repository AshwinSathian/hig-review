<!-- model: claude-sonnet; skill commit: 7559367 -->

# Loupe review: Dosewise (SwiftUI, iPhone)

Loupe is independent and not affiliated with Apple.

## 1. Summary

Reviewed: the whole app (4 screens, 7 Swift files, inline, no subagents), from source only (no simulator, no running build), against an inferred profile.

Verdict: the interface is tidy stock SwiftUI, but the product does not yet do its job. It is a medication reminder that sends no reminders, loses everything on relaunch, stops showing doses after the day they were added, and can silently erase a person's dose history.

Do first: the schedule-first model rework (Rework 1), then findings 1 to 4 (data loss and two measured contrast failures), then 5 to 9 (the Today screen cannot be trusted for a medicine you take twice a day).

### Assumptions (no owner, so defaults)
- `purpose`: log and be reminded of daily medicine doses (inferred from the code and the empty-state copy). Audience: adults managing one or more regular medicines, glanced at several times a day, some older or low-vision (inferred from the category; unconfirmed).
- `platforms`: iOS, iPhone only (`TARGETED_DEVICE_FAMILY = 1`). `release_stage: development` (user said not yet released). So App Review 2.1/4.2 checks are not run, and dead controls are Major plus an Unverified line.
- `register`: utilitarian (frequent check-and-act task). Motion personality: quiet. Humor: none. Casing: sentence case in body strings, Apple title case on tab labels and titles (as inferred). Voice: plain, second person, no "we".
- Build SDK: Xcode 26 / iOS 26 SDK (`project.pbxproj` header comment and `XCODE_VERSION_ACTUAL = 2600`). `UIDesignRequiresCompatibility` is absent from `Info.plist`, so the (26+) gate passes and (26+) checks were run. Deployment target 17.0.
- `direction`: none, so section 5 proposes two. `waived: 0` (no profile).
- `.loupe.md` was not written (per instruction). Questions I would have asked, recorded here, answered by the defaults above:
  1. Is the purpose "reminders plus logging", or logging only? 2. Who is the audience (self, caregiver, older adults)? 3. Is this going to App Review soon, and is a medical-device or clinical claim intended? 4. Should data sync (iCloud) or stay on device? 5. Any brand assets (icon, colors, typeface) that exist outside the repo? 6. Peers the team measures itself against? 7. iPad or Apple Watch intended?

### Run notes
- Tools: file reads, `scripts/contrast.py` on source colors, WebSearch (2 queries) for the landscape. No Playwright (native source, no web). No simulator was booted or touched, so no global appearance or content-size changes were made. No files in the reviewed folder were edited. Only this report was written.
- Evidence: source files in `dosewise/` (line numbers below). Contrast results: `4B5563` on `FFFFFF` 7.56:1; `4B5563` on `1C1C1E` 2.25:1 (fail); `4B5563` on `000000` 2.78:1 (fail); `34C759` on `FFFFFF` 2.22:1 (fail); `30D158` on `1C1C1E` 8.42:1; secondary label `rgba(60,60,67,.6)` on white 3.44:1. System color values are from Apple's published iOS palette, not rendered; row backgrounds assumed to be the standard inset-grouped fills (white light, `1C1C1E` dark).
- Landscape step used the web (third-party sites); see section 4.

## 2. Findings

Whole-app cap 40; 23 findings, none grouped; `waived: 0`.

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | Nothing is persisted. `MedStore` keeps `medicines` and `doses` in memory only; the models are `Codable` but never encoded. Quitting the app deletes every medicine, schedule and the whole adherence history. Reviewer judgement. | `Models.swift:22-69` (`MedStore`); whole app | Blocker (data loss) | Taste | Persist with SwiftData, or JSON in Application Support as the smallest step; load on launch; save on every mutation. |
| 2 | Swiping a medicine away in the list deletes it and all of its doses, including taken and skipped history, with no confirmation and no undo. History's "Removed medicine" fallback can never be reached because the doses are gone. A typo in a name has no edit path (finding 14), so deleting is the only correction. | `MedicinesView.swift:15`; `Models.swift:53-58` | Blocker (data loss) | SHOULD | Keep history: mark the medicine archived instead of removing its doses, and show "Removed medicine" rows honestly. Confirm with a count ("Delete Metformin? 14 logged doses stay in History."), or offer an Undo toast. Add an Edit button as the on-screen alternative to the swipe. |
| 3 | Taken-dose time uses a hard-coded hex `Color(hex: 0x4B5563)` with no dark or increased-contrast variant. In dark mode it is 2.25:1 on the row (needs 4.5:1; 13 pt). WCAG 1.4.3 fails, measured from source colors. In light mode it is darker than the pending times' `.secondary`, so a finished dose looks more prominent than a pending one. | `Models.swift:68`; `TodayView.swift:37` | Blocker (1.4.3) | SHOULD | Use `.secondary` (or a named asset color with light, dark and increased-contrast values) for the taken time; let the "Taken" label carry the state. |
| 4 | "Taken" label and its `checkmark.circle.fill` glyph are `Color.green` (system green `#34C759` in light mode): 2.22:1 on white for 17 pt text, and below 3:1 for the icon. Fails 1.4.3 and 1.4.11. Assumes standard row fill and system value; not rendered. | `TodayView.swift:53-54` | Blocker (1.4.3) | SHOULD | Use an asset color with an AA variant per appearance (for example `#1D6B4F` on white 6.43:1, `#4FD1A0` on `#1C1C1E` 8.88:1), or keep `.primary` text with a green glyph only. Keep the word "Taken". |
| 5 | The app promises reminders and sends none. `DosewiseApp.init` requests notification permission at launch (before the person has added anything), ignores the result, and no `UNNotificationRequest` is scheduled anywhere. The empty state says "Add a medicine to start getting reminders". Denial is never surfaced. Copy claims a capability that does not exist. | `DosewiseApp.swift:9`; `TodayView.swift:10-12`; whole project (no scheduling) | Major | SHOULD | Schedule a repeating local notification per medicine time when it is saved; ask for permission at that moment with one plain sentence of why; show an inline "Reminders are off" row (link to Settings) when denied. Until built, change the empty state to "Add a medicine to log your doses." |
| 6 | Doses exist only for the day the medicine was added. `add` creates today's `Dose`s once; nothing creates tomorrow's. From day 2, Today says "No doses today" for a medicine taken daily. Also, a time earlier than now (add at 15:00 an 08:00 dose) appears as a normal pending dose. | `Models.swift:43-52`, `:28` | Major | Taste | Generate doses from `Medicine.times` for each day (see Rework 1). |
| 7 | Today cannot tell due, overdue and upcoming apart. Rows are one flat list sorted by time, all identical when pending, with no "now" cue, no "Missed" state and no sections. Someone who cannot remember whether they took the 08:00 dose must read every row. Reviewer judgement; double-dose risk. | `TodayView.swift:12-14`; `Models.swift:12-17` (`DoseStatus` has no missed) | Major | Taste | Group as Overdue, Next, Later, Done; add a `missed` state set when a dose passes by a grace window; give the next due row the only filled button. |
| 8 | A dose row never shows the medicine's strength, only the name. Two entries "Metformin 500 mg" and "Metformin 850 mg" are indistinguishable on Today and History, though strength is the field the Add form asks for. | `TodayView.swift:33`; `HistoryView.swift:17` | Major | Taste | Show `name` then `strength` as the secondary line: "500 mg · 08:00". |
| 9 | Take and Skip are one tap each, final, and unreadable afterward: no undo, no way to change a mistaken "Taken" back to pending, and `resolvedAt` is stored but never shown, so the log cannot say when a dose was actually taken. | `Models.swift:37-42`; `TodayView.swift:39-50` | Major | SHOULD | Add Undo (a toast or the row's swipe action "Mark as not taken"); show "Taken 08:12" on the row and in History. |
| 10 | The Skip control is an unlabeled SF Symbol button (`forward.circle`, about 22 pt glyph, `.borderless`): under Apple's 44 pt goal, and its default name is the symbol's description, not "Skip". VoiceOver and Voice Control also hear the same "Take" on every row with no medicine name, so "Tap Take" is ambiguous. WCAG 2.5.8 passes on spacing; 4.1.2 passes with a weak name, so judged. | `TodayView.swift:43-48` | Major | SHOULD | `Button("Skip", systemImage: "forward.circle")` with `.labelStyle(.titleAndIcon)` or a swipe action plus a menu; `.accessibilityLabel("Take \(name)")` and `"Skip \(name)"`; `.contentShape` to 44 pt; `.accessibilityElement(children: .combine)` on the row. |
| 11 | Dose time is `.font(.system(size: 13))`, a fixed size that ignores Dynamic Type, and it is the key data on the row. The row is a horizontal `HStack` of name, spacer, icon and filled button with no layout change at accessibility sizes (not seen; no simulator). | `TodayView.swift:36`, `:23-50` | Major | SHOULD | `.font(.subheadline)` (or `.footnote`); at `isAccessibilityCategory` stack buttons under the text (`ViewThatFits` or `dynamicTypeSize` branch). |
| 12 | "Add" is a tab with an action icon (`plus.circle.fill`) holding a form that clears itself on save with no confirmation and no navigation. After "Save medicine" the fields empty silently; the person cannot tell it worked until they open Medicines or Today. "Save medicine" is a form row that looks like a list item, not a button or toolbar action. | `RootView.swift:10-11`; `AddMedicineView.swift:40-46` | Major | SHOULD | Remove the tab; add "+" in the Medicines toolbar that opens the form as a sheet with Cancel and Save in the toolbar; on save, dismiss and show the new medicine (and today's doses). Tabs left: Today, Medicines, History. |
| 13 | Adding a time is a trap. The field is prefilled "08:00" but only counts after tapping the separate "Add time" button; "Save medicine" stays disabled with no reason shown. Time is typed free text on a punctuation keyboard, shown as hard-coded 24-hour `%02d:%02d` (Today uses the locale format, so the two disagree for 12-hour users), and added times cannot be edited, removed or de-duplicated. | `AddMedicineView.swift:5-6`, `:11-14`, `:24-35`, `:45` | Major | SHOULD | `DatePicker("Time", selection:, displayedComponents: .hourAndMinute)` in a "Times" section with swipe to remove; format with `Date.FormatStyle`; show a footer "Add at least one time" while Save is disabled; a medicine with the default time already visible counts without an extra step. |
| 14 | Medicines list is read-only and thin. It shows name and strength only: no times, no notes (the Notes field is stored and never displayed anywhere), no detail screen, no edit. First run shows a blank list (no empty state), and the Today empty state has no button to add a first medicine. | `MedicinesView.swift:7-16`; `TodayView.swift:10-12`; `AddMedicineView.swift:37-39` | Major | SHOULD | Add `ContentUnavailableView` with an "Add medicine" button; make rows navigate to a detail with times, notes, edit and delete (delete with the safeguards in finding 2); or delete the Notes field until it is shown. |
| 15 | Eight or more pending doses show eight filled "Take" buttons; Apple allows at most one or two prominent buttons per view, and the filled style no longer marks the likely action. | `TodayView.swift:48-49` | Minor | SHOULD | `.bordered` for later doses; filled only on the next due dose. |
| 16 | History says Taken or Skipped with a glyph only (`checkmark.circle`, `forward.circle`), no word and no grouping by day; each row repeats a full date. | `HistoryView.swift:19-25` | Minor | SHOULD | Group by day (`Section`), put "Taken 08:12" / "Skipped" text in the row, keep the glyph as support. |
| 17 | "Clear" in History erases all adherence data after a dialog that states no count ("Clear all history? This can't be undone."). | `HistoryView.swift:30-41` | Minor | Research | "Delete 42 logged doses? This can't be undone." and name the button "Delete 42 Doses". |
| 18 | Fields rely on placeholders as labels ("Name", "Strength, e.g. 500 mg", "Optional"): the label vanishes while typing. No capitalization or return-key behavior set on Name. | `AddMedicineView.swift:19-20`, `:38` | Minor | CONSIDER | `TextField("Name", text:)` inside `LabeledContent` or a visible label; `.textInputAutocapitalization(.words)`; `.submitLabel(.next)`. |
| 19 | "No doses today" uses `checkmark.seal`, a completion symbol, for a state that means nothing is scheduled (and, from finding 6, also for a broken schedule). | `TodayView.swift:10-12` | Minor | Taste | Use a neutral symbol; write two states: nothing added, all done. |
| 20 | The Add tab symbol is filled (`plus.circle.fill`) while Today, Medicines and History are outline symbols, so the tab bar reads unevenly. Largely moot once finding 12 removes the tab. | `RootView.swift:6-11` | Minor | CONSIDER | Consistent symbol weight (system fills the selected one). |
| 21 | Orientation is locked to portrait. | `Info.plist:5` | Polish | SHOULD | Allow landscape for iPhone unless a reason is recorded. |
| 22 | No haptic and no row animation when a dose is taken; the row just swaps. Feedback is single-channel. | `TodayView.swift:48-57` | Polish | SHOULD | `.sensoryFeedback(.success, trigger:)` and `withAnimation` on `resolve` (fade under Reduce Motion). |
| 23 | Unreachable fallbacks "Unknown" and "Removed medicine" signal a model that allows orphan doses. | `TodayView.swift:33`; `HistoryView.swift:17` | Polish | Taste | Resolved by finding 2's archive approach. |

(26+) checks run: standard `TabView`, `List` and `NavigationStack` adopt the system look; no custom glass, no colored tab labels, no custom bar backgrounds. No hits.

## 3. Trust

No deceptive design patterns found in what was seen (no confirmshaming, urgency, pre-selection, hidden costs or fake social proof). The unsupported reminder promise is reported as finding 5 (an accuracy defect, not a dark pattern).

## 4. Landscape

Category: personal medication reminder and dose log. Web used; sources are partly secondhand, marked [S].
- Apple Health, Medications. Why: the platform baseline for this job. Logging: Health, Browse, Medications, "+", Taken or Skipped, Done; forgotten doses can be added later; optional follow-up reminder if not logged after 30 minutes; optional Critical Alerts. Source: https://support.apple.com/en-gb/HT213351 and https://tidbits.com/?p=59847 (search results, 2026-10-26; page text not fully fetched).
- Medisafe. Why: leading dedicated app. Reminder lock-screen actions "Take All" and "Snooze All" with the medicine name withheld for privacy; wrong choice can be undone from the pill box. [S] https://www.techenhancedlife.com/research_content/how-use-medisafe-app/ (page updated 2023, checked 2026-10-26).
- MyTherapy. Why: challenger. Pop-up to take, skip or snooze 30 minutes; re-sends until answered. [S] https://healthify.nz/apps/m/mytherapy-meds-pill-reminder-app (not iOS-specific, 2026-10-26).
- Adjacent exemplar: not researched. Seed playbook only (Health): "rest treated as valid", AVOID guilt-based streak notifications `(unverified)`.

Conventions to keep: Taken / Skipped vocabulary (Apple's own); a way to log late; reminder actions that do not need opening the app (Medisafe, MyTherapy [S]); undo of a wrong log (Medisafe [S]; Apple allows editing).
Convergence to avoid: a pill-icon health-blue app with a progress ring and streak score; guilt copy `(unverified)`.
Frontier moves: follow-up reminder 30 minutes later (Apple); critical alerts for must-not-miss doses (Apple); snooze (MyTherapy [S]).
Openings (from the subject): medicine is physically organised by day-part in a weekly pill organiser (dosette); no studied app (from what I read) structures Today that way. `(unverified: only three products, none opened)`.
Best peer step count for the core task "log a dose": Apple Health from Health open: Browse, Medications, "+", Taken, Done (5 steps). Dosewise: 1 tap on Today once the app is open (it has no reminder to open it). Peer gap: none; the rework bar's peer-gap condition is not met.

## 5. Distinctiveness verdict

Verdict: default-assembled. Platform default on every one of the nine channels (type: SF Pro text styles plus one fixed 13 pt size; color: system blue, system green and one stray hex; shape, motion, iconography, imagery, sound and haptics, layout idiom: stock inset-grouped lists and tab bar; voice: generic "Add a medicine to start getting reminders"). Authored: 0 of 9. Signature element: none (the one-tap Take is a candidate behavioural element but is not carried through). Signature moments: 0. Slop-catalog tells: below the cluster threshold (platform conventions are never counted). Logo-off: nothing identifies the product. Competitor swap: renaming the screens "Medisafe" looks no more wrong. For a utilitarian product, platform default controls are correct; the verdict flags only that identity is not carried by any channel yet. Gate: Blockers and Majors are open on every flow, so the directions below are held until after the fixes.

`direction` is empty, so two directions. Default check: the generic theme for this category is a teal or blue gradient, pill icon, progress ring. Both avoid it.

**Direction A: Dosette (day-part compartments).**
- Trace: the weekly pill organiser's morning, noon, evening, night compartments; amber pharmacy dispensing glass.
- Color roles: accent amber `#9A4D00` (oklch .51 .126 55) light, `#FFB547` (oklch .82 .149 73) dark: 6.11:1 on white and 9.68:1 on `#1C1C1E`. Taken: `#1D6B4F` (oklch .47 .088 165) light 6.43:1, `#4FD1A0` (oklch .78 .135 165) dark 8.88:1; state also carried by word and glyph. Overdue: `#B3261E` (oklch .50 .178 29) 6.54:1 on white. Neutrals: system backgrounds. Derives from two inputs: amber hue and green hue.
- Type: system SF Pro for all text; candidate display face for the next-dose time only: Atkinson Hyperlegible Next (open license; trace: legibility for older or low-vision users). Not yet measured with `type-eval.js`; measure before adoption. Dynamic Type kept.
- Layout idiom (signature element): Today as four compartments; a taken dose fills its slot. Moment: Take fills the compartment (brief fade under Reduce Motion).
- Shape and motion: continuous-corner compartments, productive motion only.
- Voice samples: button "Take Metformin"; empty state "Nothing scheduled today. Add a medicine to see its doses here."; error "Reminders are off. Turn them on in Settings so Dosewise can alert you."
- Landscape position: differs from Apple Health's per-medicine log and from Medisafe and MyTherapy's reminder-list model by structuring the day.

**Direction B: Label (prescription-label vernacular).**
- Trace: the dispensing label on the box: name, strength, instructions.
- Color: warm paper `#F6EFE2` (oklch .95 .019 83) in light with the same amber accent `#9A4D00` (5.35:1 on paper); dark mode derived from the system dark set with `#FFB547`. Differs from A on color use and layout.
- Type: system text; tabular figures for times and strengths (`.monospacedDigit()`), no brand face.
- Layout idiom (signature element): every row prints "name, strength, time" as one label block; strength is never omitted (also fixes finding 8).
- Moment: a stamped "Taken 08:12" line appears in place of the Take button.
- Voice samples: button "Take"; empty "No medicines yet. Add one to start your list."; error as above.
- Landscape position: the most plainly documentary of the studied peers.
Pick one, or keep platform defaults and adopt only the behavioural signature (strength always shown, one-tap Take).

## 6. Type

```
Face: SF Pro (system) via text styles. Roles: UI, reading, data (times)
Legibility: PASS (system face); fixed 13 pt time is a CONCERN for scaling, not shape
Figures and features: tabular available (.monospacedDigit); distinct zero n/a
Coverage: system; locale issues none seen; times hard-coded %02d:%02d in Add (finding 13)
Scaling: Dynamic Type issue: TodayView.swift:36 fixed size; Bold Text not seen (no simulator)
Distinctiveness: default tier yes; identity carried by nothing
Verdict: Tune (replace .system(size: 13) with .subheadline; use monospacedDigit for times)
Evidence: source only; type-eval.js not run (no web target)
```
Candidate face Atkinson Hyperlegible Next: not measured (offline from fonts); verdict deferred.

## 7. Reworks

**Rework 1: Schedule-first model (persisted schedule generates doses and reminders).**
- What changes: before, `add` writes one day's `Dose` objects into memory and nothing else. After, a persisted `Medicine` schedule generates each day's doses on demand (and their reminders), and logged doses are the only stored history, kept when a medicine is archived.
- Bar: Cluster. Findings 1, 2, 5, 6 and 7 share one cause: dose records are one-day, in-memory snapshots rather than the product of a stored schedule.
- Evidence: findings 1, 2, 5, 6, 7; `Models.swift:43-52`; no scheduling or storage code in the project.
- Cost: `Models.swift`, `TodayView`, `MedicinesView`, `HistoryView`, `DosewiseApp`; no new screen. Risk: store schema decision (SwiftData vs file) before any user data exists, which is the cheapest moment.
- Unlocks: Today is correct on day 2; reminders; missed state; history survives deletes; later widgets and Siri can read one source of truth.
- Smallest experiment: persist `medicines` plus a computed `dosesFor(day:)` and run it for a simulated week.

No other rework clears the bar. Moving Add off the tab bar (finding 12) is a fix. Peer gap not met (section 4).

## 8. Enhancements

Fewer than eight; evidence is thin without a running build.

Experience and flows
1. Take and Skip from the reminder itself (notification actions). Principle: Agency. Mechanism: a notification category with "Take" and "Skip" actions that call `resolve`; the name can be withheld on the lock screen like Medisafe [S]. Unlocks: the core job without opening the app; builds on finding 5 and Rework 1.
2. Today ordered around "what is due next". Principle: Simplicity. Mechanism: Overdue, Next, Later, Done sections; the next dose carries the one filled button. Traced to the 2-to-4-times-a-day pattern of the data model (`times: [DateComponents]`).

Platform capabilities
3. A Lock Screen or Control Center control that logs the next dose. Principle: Flexibility. Mechanism: App Intent "Take next dose" (the noun is Dose, the verb is Take). Source: seed platform capabilities in landscape.md (unverified for this app's OS target).
4. Offer a late log: "I took this earlier" with a time picker. Principle: Responsibility. Mechanism: Apple's Medications supports adding forgotten doses (source above). Unlocks an honest log, because `resolvedAt` already exists.

Motion and feedback
5. Success haptic plus a short fill on Take. Principle: Craft. Mechanism: `sensoryFeedback`; fade only under Reduce Motion.

Brand and identity
6. Carry one behavioural signature: strength and time always visible, one tap to log. Principle: Purpose. Traced to the label and dosette directions in section 5. Held until the Blockers and Majors above are closed.

## 9. Unverified

- Everything rendered: layout, Dynamic Type up to AX5 (finding 11 is from source), dark mode and Increased Contrast, Reduce Motion, tab bar and large-title behavior. Verify by booting the app in a simulator.
- Contrast for findings 3 and 4 is computed from known system and literal colors on assumed standard row fills; confirm with a screenshot and `scripts/png_contrast.py`.
- Notification delivery, denial and re-prompt behavior: nothing is scheduled (finding 5, possibly unfinished given `development`); verify after scheduling is built.
- The "Add time" button inside the form row (tap behavior next to a text field), the swipe-delete gesture, Voice Control and VoiceOver reading order: need a device or simulator.
- Pseudo-localization, long names and RTL: not run. The code has no `String(localized:)` and no localization resources. Long medicine names are only limited by default wrapping.
- Midnight rollover, time-zone and daylight-saving changes for scheduled doses.
- Pending doses and the Today empty/loading states over time (no loading states exist; storage is in memory).
- Landscape: step counts for Medisafe and MyTherapy [S], and the adjacent exemplar, were not confirmed from primary sources. iPad and Apple Watch were not reviewed (not targeted).
- App Review (2.1, 4.2, and medical-app expectations) not assessed (development).
- Fonts in section 5 not measured.

## 10. Offer

Fixable in code now, grouped:
- Data safety: 1 (needs the storage choice), 2, 9, 17.
- Contrast and accessibility tokens: 3, 4, 10, 11, 16.
- Today row content and layout: 7, 8, 15, 22 (7 needs a decision on the grace window for "missed").
- Add flow: 12, 13, 18, 20 (12 needs a design call: sheet from Medicines).
- Empty states and copy rewrites: 5 (copy only), 14, 19.
- Larger: 5, 6 (scheduling) need Rework 1 first. 21, 23 are trivial.

Enhancements and reworks need your call: say if you want Rework 1's smallest experiment prototyped, or any enhancement built. Which should I do?

Optional extra input that would let me verify more: a booted simulator with the app (for screenshots, AX5, dark mode, Increased Contrast), the app icon and any brand assets, and answers to the seven questions in section 1.
