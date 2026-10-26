<!-- model: claude-sonnet; skill commit: 7559367 -->

# Dosewise design review (UI and UX)

Scope: 7 Swift files (about 277 lines), iPhone only, iOS 17+, portrait only. Source read only; nothing was run, so contrast and layout claims are computed or inferred, not seen on a device.

Assumptions (owner unavailable): this is a daily medication reminder and dose log for an individual adult, possibly also used by a carer. It is pre-release, so I treat "not built yet" gaps as findings only where the UI already promises the behaviour. Severity: Critical = breaks the core job or can cause harm; High = likely user failure; Medium = clear friction; Low = polish.

## Summary

The structure is sensible (4 tabs, native List/Form, ContentUnavailableView empty states). But the core promise, reliable reminders, is not delivered. The app asks for notification permission and never schedules anything. Data is lost on every launch. Doses exist only for the day a medicine was added. In a medication app these are product-safety issues, not polish. Below that sit accessibility problems (an unlabeled icon button, hard-coded font size and colours, colour-only status) and a weak Add flow (typed "HH:MM" text, no validation feedback, no confirmation after saving).

## Critical

**C1. Reminders are never scheduled.** `DosewiseApp.init` requests notification authorization, but nothing creates a `UNNotificationRequest`. The Today empty state says "Add a medicine to start getting reminders", which is false. A user who relies on this will miss doses.
Change: schedule a repeating calendar notification per medicine time on save, cancel on delete, and add actionable Take/Skip notification buttons. Move the permission request from app launch to the first successful save, with a one-line explanation shown first. If permission is denied, show an inline banner on Today with a link to Settings.

**C2. Nothing persists.** `medicines` and `doses` are in-memory arrays. Force-quitting or a reboot erases the medicine list and the dose history. History is a medical record the user may show a clinician.
Change: persist (SwiftData, or Codable to file). Until then do not ship.

**C3. The schedule does not roll over.** `add()` creates doses only for today, using today's date. Tomorrow `today` is empty and the screen says "No doses today" even though medicines exist, so the daily schedule silently stops. Times already past at the moment of adding create instantly "overdue" pending doses. Medicine rows have no link to their dose times.
Change: generate doses lazily for each day from the medicine's times (on launch, on foreground and at midnight), and decide a rule for times earlier than "now" on the day of adding (e.g. start tomorrow, or ask).

## High

**H1. Unlabeled icon-only Skip button.** In `DoseRow` the skip control is `Image(systemName: "forward.circle")` with no label. VoiceOver reads the symbol name; sighted users must guess that a skip icon means "I'm not taking this". It sits 16 pt from the primary Take button, a mis-tap risk for a dose log, and the glyph is under 44 pt tall.
Change: use a text button "Skip" (secondary, `.bordered`), or a swipe action plus a labelled `Menu`. Add `.accessibilityLabel("Skip \(name) dose")` and on Take `.accessibilityLabel("Mark \(name) taken")`. Ensure 44 pt hit targets.

**H2. No undo or correction for Taken/Skipped.** `resolve` is one-way. A mis-tap on Take (adjacent to Skip) is permanent and there is no way to change it, and the History row is not tappable. The user can neither fix the log nor see when they actually took it (`resolvedAt` is stored and never shown).
Change: show a brief undo toast, make the resolved row tappable to "Change to Taken/Skipped/Pending", and show "Taken at 8:12" in the row.

**H3. Status relies on colour and weak contrast.** Taken is green text (`.green` on white is about 2.3:1, fails WCAG AA 4.5:1 for small text); the label text is the same size as the secondary text. `doseTakenText` 0x4B5563 is a fixed grey that does not adapt to dark mode: on a near-black background it is roughly 2.3:1. The name "doseTaken" colour is also darker than `.secondary` on light, so "taken" rows look more prominent than pending ones, the opposite of the intent. History distinguishes taken/skipped only by two similar outline glyphs, no colour or text.
Change: use semantic/adaptive colours (`.secondary`, asset-catalog colours with dark variants, or `Color.green` darkened variant), keep the text label, and add distinct fills (checkmark.circle.fill vs minus.circle) plus a text status in History ("Taken"/"Skipped").

**H4. Time entry is free text.** Add Medicine asks the user to type "HH:MM" in a numbers-and-punctuation keyboard. 12/24-hour locale is ignored, "8:5" parses, "8.00" silently fails, and the only feedback is the disabled "Add time" button with no explanation. Typed "8:00" becomes a time of day with no AM/PM.
Change: use `DatePicker("Time", selection:, displayedComponents: .hourAndMinute)` (compact style) and an "Add time" button. This removes `parsedTime` entirely.

**H5. Entered times can be lost or can't be fixed.** Typed times in the list cannot be deleted or edited (`ForEach` has no `onDelete`), are not sorted, and duplicates are accepted. A wrong time forces the user to restart the form.
Change: `.onDelete`/EditButton, sort ascending, ignore duplicates.

**H6. No edit for existing medicines.** The Medicines list rows are not tappable, so a change of dose or time requires deleting the medicine, which also deletes all its dose history (`delete` removes every dose, including taken ones). Swipe-to-delete has no confirmation. The result is silent loss of medical history,; the "Removed medicine" fallback in History is therefore dead code.
Change: tap to edit (reuse the Add form), confirm destructive deletes, and keep history by archiving instead of deleting.

## Medium

**M1. "Add" as a peer tab.** Adding a medicine is an action, not a destination. Using `plus.circle.fill` as a tab item mixes iconography with the tab bar's outline style, and the form stays populated state-wise as a screen you can leave half-filled. Apple's tab guidance is for navigation between sections.
Change: three tabs (Today, Medicines, History) and a `+` toolbar button on Medicines (and Today's empty state) opening the form as a sheet with Cancel/Save in the navigation bar.

**M2. Saving gives no feedback.** "Save medicine" clears the fields and stays on the tab. Nothing confirms it worked, and the user cannot tell whether it saved. The Save button is a plain row in the form, far from the nav bar convention, and its disabled state has no explanation (needs a name and at least one time).
Change: dismiss the sheet and show the new medicine in the list; mark required fields; put Save in the toolbar.

**M3. No validation or safety affordances.** Name and strength are free text, no duplicate check, no dose amount or unit field ("Strength" and "dose" are conflated: strength 500 mg is not the quantity per intake), no frequency options beyond daily times (no days of the week, as-needed, end date), notes never appear anywhere after saving (not on Medicines, not on Today).
Change: add "Dose" (e.g. 1 tablet), days of the week, and show notes and dose on Today rows.

**M4. Today screen lacks hierarchy for the core question "what do I take next?"** Rows are a flat time-sorted list. There is no overdue state (a 08:00 pending dose at 15:00 looks identical to a future one), no grouping (Morning/Afternoon/Evening or Upcoming/Done), no progress summary, and the time is 13 pt secondary text, lower than the medicine name, though time is what the user scans for.
Change: section "Overdue / Upcoming / Done", highlight the next dose, show "2 of 4 taken", and make the time larger and primary-ish.

**M5. Hard-coded type.** `.font(.system(size: 13))` in DoseRow does not scale with Dynamic Type; at larger text sizes the time stays tiny while the name grows. The row's HStack with a name plus two buttons has no layout fallback, so at accessibility sizes the name will truncate against "Take".
Change: `.font(.footnote)`, and switch to a vertical layout via `ViewThatFits` or `dynamicTypeSize.isAccessibilitySize`.

**M6. Row interaction pitfalls.** Buttons inside a List row with `.borderless` is the correct workaround, but the outer `.buttonStyle(.borderless)` also overrides the intended `.borderedProminent` on Take in a way that depends on modifier order; verify on device that Take renders as prominent. Prefer swipe actions (Take leading, Skip trailing) as an additional route.

**M7. Notification permission asked cold at launch.** The system prompt appears before the user knows why (see C1).

## Low

- **L1.** History "Clear" is a red destructive text button in the nav bar, always visible; fine as it is confirmed with a dialog, but "Clear" next to a medical log is easy to hit. Move it into a "..." menu. Add grouping by day headers and filters; there is no way to see adherence over time.
- **L2.** History row shows the scheduled time but not the actual action time or outcome in words.
- **L3.** Empty state on Today uses `checkmark.seal`, which suggests "all done" rather than "nothing set up"; with no medicines it needs a button "Add medicine". Medicines tab has no empty state at all (blank list).
- **L4.** Tab icons: `pills`, `cross.vial`, `clock.arrow.circlepath` are fine; the first two are visually close. Consider `list.bullet`/`pills` for Medicines.
- **L5.** `UILaunchScreen` is an empty dict (white flash in dark mode); there is no app icon or accent colour defined, so the app uses default system blue and looks like a template. Choose a brand accent and verify contrast in both modes.
- **L6.** Portrait-only and iPhone-only is acceptable for v1, but it disables landscape for users with mounted devices and removes iPad. State this as a decision.
- **L7.** Copy: "Doses you take or skip will appear here" is good; "Unknown" and "Removed medicine" labels will confuse; use consistent terms (medicine vs medication, "dose" vs "time").
- **L8.** No haptic or animation on Take (`.sensoryFeedback(.success, trigger:)`), no animated row transition when a dose is resolved.
- **L9.** No localisation (strings hard-coded), no accessibility audit of VoiceOver order in rows (name, time, then buttons; fine once labelled).

## Not assessed

Rendering, real contrast in the final palette, Dynamic Type behaviour, VoiceOver, and performance were not tested (no simulator). Medical or regulatory review (clinical safety of dose logging) is out of scope but C1-C3 and H6 should be handled before any user test with real medication.

## Suggested order of work

1. C1-C3 (reminders, persistence, daily generation).
2. H1-H3 (accessible Take/Skip, undo, contrast and status).
3. H4-H6 and M1-M2 (DatePicker, edit and delete flow, Add as a sheet).
4. M3-M5, then Low items.
