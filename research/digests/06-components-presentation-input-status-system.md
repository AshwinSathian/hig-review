# 06 — Components: Presentation, Selection & Input, Status, System Experiences

Source: Apple HIG crawl (md/<slug>.md). Severity follows Apple's wording: **[MUST]** = "always / never / don't / must"; **[SHOULD]** = "avoid / prefer / use X — not Y / make sure"; **[CONSIDER]** = "consider / if it helps / when possible". Lines tagged *(inference)* are our additions, not Apple text.

Index pages `presentation`, `selection-and-input`, `status`, `system-experiences` are TOC stubs only (no guidance).

---

# A. PRESENTATION

## Action sheets (source: action-sheets)
- **Intent**: Modal list of choices tied to an action the person *just deliberately started* (e.g. cancel a draft → Delete Draft / Save Draft).
- **Checks**:
  - [SHOULD] Use an action sheet, not an alert, when the person started the action and needs to pick *among* outcomes. An alert is for the unexpected.
  - [SHOULD] iOS/iPadOS: use an action sheet, not a menu, for choices that follow from an action. People open menus themselves; action sheets appear in response to an action.
  - [SHOULD] Use them sparingly. Each one interrupts.
  - [SHOULD] Title fits on one line. Add a message only if title + context aren't enough.
  - [SHOULD] Where data could be destroyed, include Cancel at the **bottom** (watchOS: upper-left). SwiftUI confirmationDialog adds it automatically.
  - [SHOULD] Destructive buttons get destructive style and go at the **top**.
  - [SHOULD] iOS: the sheet must not scroll. Scrolling is slow and causes mis-taps.
  - [SHOULD] watchOS: ≤4 buttons including Cancel (so ≤3 real choices).
- **Platform deltas**: iOS/iPadOS/tvOS = UIAlertController.actionSheet / confirmationDialog; macOS has no extra rules; not in visionOS.
- **Web translation** *(inference)*: bottom sheet on mobile / anchored menu-dialog on desktop, with destructive item first and Cancel last. Do not reuse the centered "confirm" modal for multi-choice outcomes.
- **Slop tells** *(inference)*: a centered modal with "Are you sure?" + Yes/No when the real choice is Save vs Discard vs Keep Editing; destructive item placed last and styled like the rest; 6+ options in a scrolling sheet.

## Alerts (source: alerts)
- **Intent**: Critical information needed *right now*: a problem, a warning before unrecoverable data loss, or confirming a purchase/important action.
- **Checks — when**:
  - [SHOULD] Use sparingly. Every alert must carry essential info *and* a useful action.
  - [SHOULD] Don't use an alert just to inform. If it's info only, put it in context (Mail's offline indicator that you can tap for details).
  - [SHOULD] No alert for common, undoable actions, even destructive ones (deleting an email/file). Reserve alerts for **uncommon + irreversible** destructive actions.
  - [SHOULD] Never alert on app launch. For startup problems (e.g. offline), show cached/placeholder data plus a quiet label.
  - [SHOULD] Don't use a popover for warnings (popovers get missed or dismissed); don't use a notification for errors (use an alert).
- **Checks — copy**:
  - [SHOULD] Title states what happened, where, and why. Never "Error" or "Error 329347 occurred". At most 2 lines.
  - [SHOULD] Full-sentence title → sentence case + ending punctuation. Fragment → title case, no punctuation.
  - [SHOULD] Body text only if it adds value: short, complete sentences.
  - [SHOULD] Don't explain the buttons. If you must, say "choose", and quote the exact button title without quote marks.
  - [SHOULD] Direct, neutral tone. Not oblique, not accusatory, and don't play down severity.
  - [SHOULD] Text field only when input is needed to resolve the situation (e.g. a secure password field).
- **Checks — buttons** (max **3**):
  - [SHOULD] 1–2 word verb titles tied to the alert text ("Erase", "Convert", "Reply"). Sentence case, no punctuation.
  - [SHOULD] "OK" only in purely informational alerts. Never "Yes"/"No".
  - [MUST] The cancel button's title is always exactly "Cancel".
  - [MUST] Default/likeliest button goes on the **trailing** side of a row or the **top** of a stack. Cancel goes leading/bottom.
  - [SHOULD] Destructive style **only** for destructive actions the person *didn't* deliberately choose. If they clicked "Empty Trash", the confirm button stays default style so Return still confirms. This is counter-intuitive and checkable.
  - [SHOULD] Any destructive alert also has Cancel. Cancel is never the default button.
  - [CONSIDER] To make people actually read: set **no** default button at all.
  - [SHOULD] A single-button alert whose button is the default → title it "Done", not "Cancel".
  - [SHOULD] Support Esc / Cmd-. (iOS, iPadOS, macOS, visionOS), Home exit (iOS), Menu (tvOS).
- **Platform deltas**: iOS = avoid alert scrolling at large text sizes; use an action sheet for choices about an intentional action. macOS = shows the app icon automatically; supports suppression checkbox, accessory view, Help button; use the caution symbol (`exclamationmark.triangle`) **sparingly**, only for unexpected data loss, never for routine save/empty-trash. visionOS: accessory view ≤154pt tall, 16pt corner radius.
- **Web translation** *(inference)*: `<dialog>`/role="alertdialog"; Esc closes; primary on the right in LTR; never `window.alert` on page load; use inline banners for offline/info; "Delete 3 files?" + [Cancel][Delete].
- **Slop tells** *(inference)*: "Oops! Something went wrong" + [OK]; "Are you sure?" + [Yes][No]; red destructive styling on the button the person just asked for; a welcome/what's-new modal on first load; alerting on every delete instead of offering undo; alerts with 4+ buttons; toasts used for errors that block progress.

## Page controls (source: page-controls)
- **Intent**: Row of dots for moving through a flat, *ordered* set of peer pages.
- **Checks**:
  - [SHOULD] Ordered sequences only. Not for hierarchies or random-access content (use a sidebar/split view).
  - [SHOULD] Center horizontally near the bottom.
  - [SHOULD] At most ~**10** dots. Beyond that, use a grid.
  - [SHOULD] At most **2** indicator image types (e.g. default + one special, like Weather's `location.fill`). Custom images must be simple: no text, inner lines, or negative space.
  - [SHOULD] Don't color the indicators; let the system color them.
  - [SHOULD] iOS: don't animate page transitions while scrubbing; animate only on tap.
  - [SHOULD] iOS background styles: *prominent* only when it's the primary nav; *automatic* otherwise; no scrubbing with *minimal* (it gives no feedback).
  - [SHOULD] With a paged scroll view, hide that axis's scroll indicator (it's redundant).
- **Platform deltas**: not on macOS; visionOS shows them but they're not interactive; watchOS prefers vertical pagination via Crown with pages ≤1 screen tall.
- **Web translation** *(inference)*: carousel dots must reflect real order, be ≤10, be keyboard reachable, and use aria-current. Don't use dots as the only nav on desktop.
- **Slop tells** *(inference)*: brand-colored dots; 15-dot onboarding carousels; dots for non-sequential tabs; auto-advancing hero carousels with dots as the only control.

## Panels (source: panels) — macOS only
- **Intent**: Floating supplementary window (inspector, Fonts, Colors) tied to the active window or selection.
- **Checks**:
  - [CONSIDER] Inspector (follows the selection) → panel or split-view pane. Info window (fixed content) → regular window.
  - [SHOULD] Prefer direct adjustment controls (sliders, steppers) over typing or select-then-act.
  - [SHOULD] Short noun title in title case ("Inspector", "Fonts"). Menus say "Show Fonts", never "Show Fonts Panel".
  - [SHOULD] Show all panels when the app activates and hide them when it's inactive. No minimize button. Not listed in the Window menu's document list.
  - [SHOULD] HUD style only for media apps, only when a standard panel would hide content, and with few controls. Keep it small, use little color, and keep the same style across mode switches.
- **Web translation** *(inference)*: a docked or floating inspector that updates live with the selection. Don't open a modal per edit.
- **Slop tells** *(inference)*: a property editor as a blocking modal with Save; dark glass "HUD" panels in a productivity app for looks.

## Popovers (source: popovers)
- **Intent**: Transient, anchored view for a little info or a few related actions.
- **Checks**:
  - [SHOULD] Small scope: a few related tasks.
  - [SHOULD] Arrow points straight at its source. Don't cover the source or essential content.
  - [SHOULD] Close/Cancel/Done only when it clarifies (save vs discard). Otherwise dismiss on outside tap or on selection. Multi-select → stay open until dismissed.
  - [MUST-ish] On auto-close, **always save work**. Discard only on an explicit Cancel.
  - [MUST] One popover at a time. Never cascade popovers.
  - [SHOULD] Nothing on top of a popover except an alert.
  - [SHOULD] One click/tap closes the current popover and opens another (sibling bar buttons).
  - [SHOULD] Size it to its content. Animate size changes so it doesn't look like a new popover.
  - [SHOULD] Never use for warnings.
  - [SHOULD] Don't write "popover" in help copy.
- **Platform deltas**: iOS/iPadOS: **no popovers in compact width**; use a sheet. macOS: consider making them detachable into a panel with minimal visual change. Not on tvOS/watchOS.
- **Web translation** *(inference)*: below ~600px, popovers become bottom sheets. Light-dismiss popovers must persist edits. Never nest popover → popover.
- **Slop tells** *(inference)*: nested dropdown-in-popover-in-popover; popover forms that lose input on outside click; giant popovers holding full settings pages; tooltips used for warnings.

## Scroll views (source: scroll-views)
- **Intent**: Content bigger than its frame. No visible chrome of its own beyond an indicator.
- **Checks**:
  - [SHOULD] Support system scroll gestures and keys. Custom scrolling must keep elastic behavior.
  - [SHOULD] Make overflow obvious, e.g. a partial item cut off at the edge.
  - [SHOULD] Never nest same-axis scroll views. Cross-axis nesting is fine.
  - [CONSIDER] Page-by-page scrolling with an overlap unit (a line of text, etc.).
  - [CONSIDER] Auto-scroll only as much as needed: to a found selection, back to the caret when typing resumes, following a drag selection.
  - [SHOULD] Set sensible zoom min/max.
  - [SHOULD] Scroll edge effect: prefer *automatic*. Use only behind floating UI (it's not decoration). One per view. In split panes, keep heights consistent. Test *soft* for legibility.
- **Platform deltas**: macOS = small/mini scroll bars allowed in tight panels, with all controls the same size. visionOS = Look to Scroll: enable for reading/browsing views only, consistently across similar views; remove parallax/scroll-linked effects first. watchOS = vertical, Crown-driven.
- **Web translation** *(inference)*: no scroll-jacking; no inner `overflow:auto` in the same axis as the page; fade/peek edges on horizontal rails; sticky header blur only where content actually passes under it.
- **Slop tells** *(inference)*: scroll-jacked parallax landing pages; a vertically scrolling card inside a vertically scrolling page; decorative gradient "edge effects" with nothing floating above them; horizontal rails with no peek.

## Sheets (source: sheets)
- **Intent**: Scoped task tightly related to the current context (attach a file, pick a save location), then return to the parent.
- **Checks**:
  - [CONSIDER] Complex/long flows → full-screen modal (iOS), new window or full screen (macOS), Full Space (visionOS) instead of a sheet.
  - [SHOULD] One sheet at a time. If a sheet triggers another, close the first, then (optionally) reopen it after.
  - [SHOULD] Supplementary controls that affect the parent → nonmodal: iOS nonmodal sheet (Notes formatting), macOS panel, visionOS split view.
  - [SHOULD] Done is always paired with Cancel (or Back for multi-step). Never show Cancel + Done + Back together. Back navigates and never dismisses.
  - iOS/iPadOS: [SHOULD] Cancel on **leading** edge of top toolbar, Done **trailing**. [CONSIDER] medium detent (≈half height) for progressive disclosure (share sheet); compose UIs are large-only. [SHOULD] Grabber on resizable sheets (also VoiceOver-operable; tap cycles detents). [SHOULD] Support swipe-down to dismiss; with unsaved changes, confirm via **action sheet**. [SHOULD] iPad: page or form sheet styles.
  - macOS: [SHOULD] Sensible default size (resizable optional). Other app windows stay usable while a sheet is up. Repeated input/observe loops (find & replace) → panel, not sheet.
  - visionOS: [SHOULD] Centered, not rising from the bottom edge. Don't cover most of the window.
  - watchOS: only for a custom title or custom content; keep brief; SF Symbol dismiss label that doesn't look like a nav title.
- **Web translation** *(inference)*: modal dialog/drawer for one scoped task. Mobile bottom sheet with a drag handle and snap points. Dirty-state guard on swipe/Esc/backdrop. Cancel left, primary right in the header.
- **Slop tells** *(inference)*: a modal wizard of 6 steps; modal-over-modal; sheets with only a "Save" button and no Cancel; an X plus Cancel plus Back all visible; a bottom sheet with no handle that can't be dragged; backdrop click silently discarding a filled form.

## Windows (source: windows) — iPadOS, macOS, visionOS
- **Intent**: Primary window (main nav + content) vs auxiliary window (one task, no nav elsewhere, has a close action).
- **Checks**:
  - [SHOULD] Adapt fluidly to any size.
  - [SHOULD] Don't open new windows by default (Compose in Mail is the justified case). [CONSIDER] offer "Open in New Window" via context menu/File menu; iPad pinch-to-window.
  - [SHOULD] No custom window frames or controls. Imperfect imitations feel broken.
  - [SHOULD] User-facing term is "window", never "scene".
  - iPadOS: [SHOULD] leading toolbar items shift inward when window controls appear (windowed mode).
  - macOS: [SHOULD] custom windows honor main/key/inactive appearances (key = colored traffic lights; inactive = no materials, looks subdued). [SHOULD] nothing critical in the bottom bar (people drag windows so the bottom edge goes offscreen); bottom bar for small status only (Finder item counts).
  - visionOS: keep glass background; default 1280x720pt, opens ~2m away, ~3m apparent width; minimize empty area; shape follows content (Keynote wide, Safari tall); set min/max size; deep 3D → volume.
- **Web translation** *(inference)*: support opening in a new tab via real links (`<a href>`, middle-click). No fake OS chrome or traffic-light dots in web apps. Keep critical actions out of footers that can scroll away.
- **Slop tells** *(inference)*: faux macOS traffic lights on a web app's cards/terminal mockups; `target=_blank` everywhere; buttons that should be links (can't open in a new tab).

---

# B. SELECTION & INPUT

## Color wells (source: color-wells)
- **Intent**: A swatch that opens a color picker.
- **Checks**: [CONSIDER] the system picker (saved colors carry across apps). macOS: the well highlights when active and supports drag-and-drop between wells and the picker.
- **Web translation** *(inference)*: `<input type="color">` or a picker that keeps recent/saved swatches. Show the current value as a swatch, not only a hex string.
- **Slop tells** *(inference)*: a custom 12-swatch palette with no custom/hex option and no recents.

## Combo boxes (source: combo-boxes) — macOS
- **Intent**: Text field + pull-down of suggested values. Custom entries aren't added to the list.
- **Checks**: [SHOULD] meaningful default from the list (needn't be the first item); title-case intro label ending in a colon; relevant choices; list items no wider than the field.
- **Web translation** *(inference)*: `<input list>` + `<datalist>` or an ARIA combobox. Free text allowed.

## Digit entry views (source: digit-entry-views) — tvOS only
- Full-screen PIN entry. [MUST] secure digits for sensitive data. [SHOULD] title + prompt that say *why*.

## Image wells (source: image-wells) — macOS
- Editable image view. [SHOULD] revert to the default image if a required image is cleared; standard Copy/Paste menu items + shortcuts; drag-in without selecting first.
- **Web translation** *(inference)*: avatar/upload drop zone that accepts paste and drag, with a delete action that restores the placeholder.

## Pickers (source: pickers)
- **Intent**: Scrollable lists of distinct values (single or multipart). Date pickers add calendar/keypad entry.
- **Checks**:
  - [CONSIDER] Short list → pull-down button. Medium-long → picker. Very large → list/table (with index).
  - [SHOULD] Predictable, logically ordered values (alphabetized countries), so hidden values can be guessed.
  - [SHOULD] Show the picker in context (below the field or in a popover). Don't switch views to show it.
  - [CONSIDER] Coarser minute intervals that divide 60 evenly (0/15/30/45).
  - iOS date picker: styles compact / inline / wheels / automatic; modes date / time / date+time / countdown (max **23h 59m**, not in inline/compact). [SHOULD] compact when space is tight (shows the value in accent color, opens modal editor).
  - macOS: textual (tight space, specific values) vs graphical (browse a calendar, ranges, clock face).
- **Web translation** *(inference)*: native `<select>`/`<input type="date|time">` first. Custom date pickers must allow typed entry and honor locale order.
- **Slop tells** *(inference)*: a 3-option choice rendered as a wheel or a giant dropdown; a full-page route just to pick a date; minute pickers with 60 entries for appointment booking; unordered option lists.

## Segmented controls (source: segmented-controls)
- **Intent**: Linear group of equal segments for closely related choices on one object/state/view. Single select (macOS also multi or momentary actions).
- **Checks**:
  - [SHOULD] Don't mix action segments and selection segments in one control.
  - [SHOULD] ≤ ~5–7 segments wide; ≤ ~**5** on iPhone.
  - [SHOULD] Equal widths; similar content length across segments.
  - [SHOULD] Text *or* icons, never mixed. Labels are nouns in title case. No intro label needed with text labels.
  - iOS: [CONSIDER] for switching closely related subviews (Calendar's Event/Reminder). Separate app sections → tab bar.
  - macOS: [SHOULD] main-window view switching → tab view, not a segmented control (segmented is OK in toolbar/inspector). Tooltips per segment; labels under icon segments; consider spring loading.
  - tvOS: keep other focusable items away (focus = select).
- **Web translation** *(inference)*: radio group styled as segments (role=radiogroup) for filters/views. Not a replacement for top-level nav tabs.
- **Slop tells** *(inference)*: pill "segmented" toggles used as primary site nav; 8-segment controls that wrap; one segment with an icon and others with text; segments that sometimes navigate and sometimes act.

## Sliders (source: sliders)
- **Intent**: Continuous value between min and max via a thumb.
- **Checks**:
  - [SHOULD] Min on the leading side, max trailing (vertical: min bottom).
  - [CONSIDER] Pair with a text field + stepper for wide ranges or exact values.
  - [CONSIDER] Min/max icons that illustrate meaning (small image → large image).
  - iOS: [SHOULD] never a plain slider for audio volume; use the system volume view (includes output-device picker).
  - macOS: live feedback while dragging; linear for bounded ranges, circular for repeating values (rotation 0–360°, spins); tick marks + label min/max (periodic labels if nonlinear); tooltip with the current value; intro label in sentence case with a colon.
  - visionOS: prefer horizontal.
- **Web translation** *(inference)*: `<input type="range">` with a visible numeric value and an editable field for precision. Apply live, without an Apply button.
- **Slop tells** *(inference)*: sliders for exact values (age, price) with no numeric entry; reversed direction; sliders with no value readout; a "volume" slider that ignores system output.

## Steppers (source: steppers)
- [SHOULD] Make the affected value obvious (the stepper shows no value itself). [CONSIDER] pair with a text field when large jumps are likely (print copies). macOS: Shift-click for ~10x increments.
- **Slop tells** *(inference)*: a +/− control for values ranging 1–1000; steppers floating far from their value.

## Text fields (source: text-fields)
- **Intent**: Short, specific text (name, email). Long text → text view.
- **Checks**:
  - [SHOULD] Placeholder hints, plus a **separate persistent label**, because the placeholder disappears on input.
  - [MUST] Secure field for passwords and other sensitive data.
  - [SHOULD] Field width matches the expected length of input.
  - [SHOULD] Even spacing; stack vertically; consistent widths per field group (first/last name one width, address/city another).
  - [SHOULD] Logical tab order.
  - [SHOULD] Validation timing depends on the field: **email → validate on leaving the field; username/password → validate before leaving it**. Digit-only fields flag non-digits.
  - [SHOULD] Number formatter for numeric/currency/percent input. Never hard-code locale formatting.
  - [CONSIDER] Choose line break/truncation mode (head/middle/tail); expansion tooltip for clipped text.
  - [SHOULD] iOS/iPadOS/tvOS/visionOS: right keyboard type. Minimize text entry on tvOS/watchOS (use buttons/lists).
  - iOS: [SHOULD] Clear button at the trailing end. Leading image = purpose, trailing = extra function.
  - macOS: text + list of choices → combo box.
- **Web translation** *(inference)*: `<label>` always visible (no placeholder-only labels); correct `type`/`inputmode`/`autocomplete`; validate email on blur and password rules live; `Intl.NumberFormat`; field widths sized to content (ZIP narrow, street wide).
- **Slop tells** *(inference)*: placeholder-as-label "floating label" forms where every field is full width and the same length; validation that shouts red on the first keystroke; generic "Invalid input"; a number field typed as text; uniform 48px fields for a 2-digit CVV and a street address alike.

## Toggles (source: toggles)
- **Intent**: Choose between two opposing states.
- **Checks**:
  - [SHOULD] Only for on/off state. Choosing from items → pop-up button.
  - [SHOULD] State difference must not rely on color alone (fill, shape, checkmark).
  - iOS: [SHOULD] **switch style only inside a list row** (no label needed; the row provides it). **Outside lists use a toggle-button** (icon + background change, e.g. Phone's filter button) with no explanatory label. [SHOULD] change the default green only if necessary (accent color is OK) and keep enough contrast against off.
  - macOS: [SHOULD] switches/checkboxes/radios in the window body, never in toolbar/status bar. Switch = emphasized or group-level setting; mini switch in grouped-form rows; regular switch for parent + mini for children. [SHOULD] don't replace existing checkboxes with switches. Checkbox for hierarchies (leading-edge alignment + indent), with a **mixed** state when children differ. Radios: groups of 2–5; more than ~5 → pop-up button; a single on/off → checkbox, not a lone radio; consistent horizontal spacing sized to the longest label.
- **Web translation** *(inference)*: switch = immediate-effect setting in a settings row; checkbox = form value submitted later; tri-state "select all" checkbox; never a switch floating in a toolbar.
- **Slop tells** *(inference)*: iOS-style switches for every boolean, including in forms that need a Submit; switches as standalone toolbar buttons; on/off conveyed only by green vs gray; a "select all" box with no indeterminate state.

## Virtual keyboards (source: virtual-keyboards)
- **Intent**: Task-matched on-screen keyboards.
- **Checks**:
  - [SHOULD] Keyboard type matches content (email, URL, number pad, decimal pad, phone pad, web search, etc.); set the semantic content type so autofill and corrections work.
  - [CONSIDER] Return key type matching the action (Search, Go, Send).
  - Custom input views: [SHOULD] obviously beneficial; play the standard click sound (respect user setting).
  - Custom keyboards (extension): [SHOULD] obvious keyboard switching (Globe); don't duplicate system Emoji/Dictation keys; tutorial in the app, not inside the keyboard. Not available in secure or phone fields.
  - iOS: [SHOULD] use the keyboard layout guide so key UI stays visible. Accessory bar above the keyboard: task-relevant only; Liquid Glass if the rest of the app uses it (standard toolbar adopts it automatically).
- **Web translation** *(inference)*: `inputmode`, `enterkeyhint`, `autocomplete`; keep the focused field and primary action above the keyboard (visualViewport).
- **Slop tells** *(inference)*: OTP/phone fields bringing up the full QWERTY keyboard; Submit button hidden under the keyboard; Return key labeled "return" on a search box.

---

# C. STATUS

## Progress indicators (source: progress-indicators)
- **Intent**: Show the app isn't stalled. Determinate (known duration: bar or clockwise ring) vs indeterminate (spinner; macOS also has an indeterminate bar).
- **Checks**:
  - [SHOULD] **Prefer determinate.** It lets people decide whether to wait, come back later, or abandon.
  - [SHOULD] Report honestly and at an even pace. 90% in 5s then the last 10% in 5 min "can feel deceptive".
  - [SHOULD] Keep it moving. A stationary indicator reads as frozen. On a stall, explain what's wrong and what to do.
  - [SHOULD] Switch indeterminate → determinate once the duration becomes known…
  - [SHOULD] …but **never morph a spinner into a bar** (different shape and size disrupts the layout). Use a bar in its indeterminate state from the start if it may become determinate.
  - [SHOULD] Description only if it's specific. Avoid "Loading…" / "Authenticating…" (they "seldom add value").
  - [SHOULD] Consistent location across the app.
  - [CONSIDER] Cancel if interruption is harmless. Add Pause if cancel loses progress (partial download). If cancel loses progress, confirm via an alert offering confirm/resume.
  - iOS refresh control: [SHOULD] auto-refresh periodically (don't make the user drive all updates); title only if valuable (e.g. "Last updated…"), never "Pull to refresh" instructions.
  - macOS: spinner for background or confined spots (in a field, next to a button); **don't label spinners**.
- **Web translation** *(inference)*: `<progress value max>` for uploads/exports with bytes/ETA; skeletons for content loads; one spinner location; Cancel/Pause on long jobs; stale-while-revalidate instead of pull-to-refresh only.
- **Slop tells** *(inference)*: full-screen spinner + "Loading…" for every fetch; fake progress bars that sprint to 90% and hang; a spinner that swaps into a bar; "Pull down to refresh" hint text; multiple spinners in different places for one operation; no cancel on a 2-minute export.

## Gauges (source: gauges)
- **Intent**: A value within a range (circular/linear; standard indicator vs capacity fill; *accessory* variant echoes complications for Lock Screen widgets).
- **Checks**: [SHOULD] succinct labels for current value + both endpoints (VoiceOver reads them). [CONSIDER] gradient fill that encodes meaning (hot→cold).
- **Platform deltas**: macOS level indicators: capacity *continuous* (use for large ranges) vs *discrete* (segments fill fully, never partially; segment count = capacity); default fill green; [CONSIDER] tiered colors at thresholds; rating style; rarely relevance style.
- **Web translation** *(inference)*: `<meter min max low high optimum>` for gauges, `<progress>` for task progress. Don't conflate them.
- **Slop tells** *(inference)*: decorative donut "gauges" with no endpoint labels; rainbow gradients that mean nothing; using a progress bar for disk usage.

## Rating indicators (source: rating-indicators) — macOS
- Whole symbols only (rounds; no half stars), fixed spacing. [SHOULD] edit ratings inline in lists. [SHOULD] a custom symbol must clearly read as a rating (stars are the recognizable default).
- **Slop tells** *(inference)*: 4.5-star partial fills in an editable control; hearts/flames as rating symbols with no context.

## Activity rings (source: activity-rings) — iOS/watchOS, HealthKit
- **Checks** (mostly [MUST]): only Move/Exercise/Stand data; never other data in rings and never these metrics in a lookalike; one person only, identified by label/photo/avatar; never recolor or change opacity; always on **black**, ideally in a circle made with corner radius (not a mask); outer margin ≥ the inter-ring gap; nothing crops or encroaches; labels use the ring colors; don't put rings in notifications or duplicate Activity app notifications; never decorative, branding, app icon, or marketing. iOS shows Move only without a paired Watch.
- **Slop tells** *(inference)*: concentric "progress rings" in brand colors for non-fitness KPIs. They read as an Apple Fitness rip-off and Apple prohibits lookalikes for these metrics.

---

# D. SYSTEM EXPERIENCES

## Widgets (source: widgets)
- **Intent**: Glanceable, timely content plus focused interactions outside the app. Not a mini app and not an app-launch icon.
- **Sizes/contexts**: system small/medium/large/XL (iPad, Mac, visionOS)/XL portrait (visionOS only); accessory circular/rectangular/inline (Lock Screen; Watch) and corner (Watch only). Rendering modes: **full-color**, **accented** (background removed, views split into accent + primary groups, each tinted solid), **vibrant** (Lock Screen / StandBy night: desaturated, brightness = vibrancy).
- **Checks — content**:
  - [SHOULD] One simple idea tied to the app's main purpose. Never just a replicated app icon.
  - [SHOULD] Dynamic content that changes during the day. Static widgets get removed.
  - [SHOULD] Multiple sizes only when each adds value. **Don't stretch small content to fill large.** One great size beats all sizes.
  - [SHOULD] Balance density: not sparse, not dense. Too dense → go bigger or swap text for graphics.
  - [SHOULD] Brand subtly. Logo rarely needed; if multi-source, a small logo **top-right**.
  - [SHOULD] Don't mirror the widget's look inside the app.
  - [SHOULD] Signed-out state says what signing in unlocks ("Sign in to view reservations").
  - [CONSIDER] Surprise and delight on meaningful occasions (birthdays).
- **Checks — updates**:
  - [SHOULD] Choose update cadence from data volatility vs viewing frequency. If people look more often than you can update, show "last updated".
  - [SHOULD] Use system date/time text that refreshes itself, to save update budget. **Don't hide stale data behind placeholders.**
  - [SHOULD] Animate updates, ≤ **2s**.
- **Checks — interaction**:
  - [SHOULD] Simple actions only (Reminders' checkbox toggles). No app-like layouts. Targets big enough for confident taps. Inline accessory = 1 target.
  - [SHOULD] Taps deep-link to the exact relevant screen.
- **Checks — layout/text/color**:
  - [SHOULD] Standard margin **16pt**; tighter **11pt** for grouped graphics/buttons; smaller on Mac desktop and Lock Screen.
  - [SHOULD] Content corners concentric via ContainerRelativeShape (no hard-coded radius).
  - [SHOULD] System font, text styles, SF Symbols. Custom font sparingly (e.g. big numerals custom, small text SF Pro). Text ≥ **11pt**. Never rasterize text. Dynamic Type Large → AX5.
  - [SHOULD] Meaning never by color alone (monochrome/tinted/inverted on watch).
  - [SHOULD] Full-color images judiciously in tinted/clear modes (reserve for media like album art, smaller than the widget).
  - [SHOULD] Full-color: light bg in light, dark bg in dark; semantic colors. Accented: deliberately assign widgetAccentable groups. Vibrant: full-opacity content, white/light gray for primary, darker grays for secondary, opaque grays rather than white-with-opacity.
- **Checks — gallery**:
  - [SHOULD] Realistic preview (simulated data if real data is slow).
  - [SHOULD] Placeholder = static chrome + semi-opaque shapes (varied-width bars for text lines).
  - [SHOULD] Description starts with a verb ("See the current weather…"). Never "This widget shows…". Sentence case. One description per widget group, sizes grouped.
  - [CONSIDER] Brand-tint the Add button.
- **Platform deltas**: iOS/iPadOS Lock Screen widgets follow complication rules: provide info, not a launcher; support Always-On reduced luminance. Real-time → Live Activity instead. StandBy/CarPlay: small widget, background removed + scaled; mark the background removable; rely on large text, not rich images/color; red tint at night. HomeView: small family; Modular face ≤4 widgets, shared per household (privacy *(inference)*). visionOS: 3D objects at real-world scale (75–125% user scaling); two distance thresholds (far = simplified, larger type, **no buttons**; near = detail); mounting elevated (default) vs recessed (vertical only); treatment paper (print-like, reacts to light) vs glass (info-rich, foreground stays bright); test all frame widths and tint palettes. watchOS Smart Stack: black default bg; [CONSIDER] meaningful bg color (Stocks red/green); relevance via RelevanceKit.
- **Key dims (iOS, pt)**: 430x932 screen → small 170, medium 364x170, large 364x382, circular 76, rect 172x76, inline 257x26. 393x852 → 158 / 338x158 / 338x354 / 72 / 160x72 / 234x26. iPad 1024x1366 device: 160 / 356x160 / 356 / XL 748x356. visionOS small 158pt = 268mm. Watch Smart Stack 40mm 152x69.5 … 46mm 194x80.5, 49mm Ultra 3/4 198x81.5.
- **Web translation** *(inference)*: for dashboard "cards" — one purpose per card, freshness timestamps, skeletons shaped like real content, a whole-card link to the exact detail, ≤1–2 inline actions, nothing stretched just to fill a grid cell.
- **Slop tells** *(inference)*: a widget that is a logo + "Open App"; the same 3 stats stretched across small/medium/large; gradient-backed widgets that turn into gray mush in tinted mode; spinners/placeholder shimmer instead of last-known data; a "This widget shows your…" description; meaning carried by red/green only; a 6-button mini-app grid.

## Live Activities (source: live-activities)
- **Intent**: Track a bounded task/event (≤ **8 hours**) with frequent updates across Lock Screen, Dynamic Island, StandBy, Mac menu bar, Watch Smart Stack, CarPlay.
- **Required presentations**: compact (leading + trailing around TrueDepth camera, when only one is active), minimal (multiple active; up to 3, attached/detached circle or oval), expanded (touch & hold), Lock Screen (banner; also briefly over Home Screen on non-Island devices). StandBy = minimal → tap → Lock Screen layout at **2x**.
- **Checks — scope/content**:
  - [SHOULD] Defined start and end, short-to-medium duration. **No ads or promos.**
  - [SHOULD] Only what's needed at a glance; deep detail lives in the app.
  - [SHOULD] Sensitive info → innocuous summary or redaction, user-configurable.
  - [SHOULD] Match app personality in light and dark. Logo mark without a container, **never the full app icon**.
  - [SHOULD] Don't add in-app elements that point at the Dynamic Island.
  - [SHOULD] Text medium weight or heavier; small text rarely.
- **Checks — layout**:
  - [SHOULD] Limited-width (Island in landscape): compact/minimal fit a **28pt-diameter circle**; abbreviate or use a graphic; may show leading only (system hides trailing).
  - [SHOULD] Concentric margins; ContainerRelativeShape for corner elements; separate blocks with an inset container or a thick line; never draw to the Island edge.
  - [SHOULD] Height adapts to available info (rideshare grows when the driver is assigned).
  - Compact: [SHOULD] leading + trailing read as **one** unit (same color/type); hug the camera with **no padding** next to it; balanced widths (shorten units); both sides deep-link to the same screen.
  - Minimal: [SHOULD] live data over a static logo (Timer shows the remaining time).
  - Expanded: [SHOULD] keep the relative placement from compact; wrap tightly around the camera.
  - Lock Screen: [SHOULD] **don't copy notification layout**; custom bg/tint sparingly (personalized wallpapers); verify Dark Mode + Always-On reduced luminance; check the auto-generated dismiss-button color; **14pt** standard margin.
  - StandBy: custom layout for the extra space; prefer the default bg (blends with the bezel, scales larger); standard margins; verify **Night Mode red tint** contrast.
- **Checks — color/motion**:
  - Compact/minimal/expanded bg is fixed **black**; only Lock Screen bg is customizable (check contrast on Always-On). [CONSIDER] bold brand colors for text/objects. Tint the Dark Mode key line to match.
  - Animations ≤ **2s**; none on Always-On reduced luminance. Use numeric content transitions for scores; animate existing elements to new positions rather than removing and re-adding them; avoid overlap (fade the non-moving list items).
- **Checks — interaction & lifecycle**:
  - [SHOULD] Tap opens the exact related screen.
  - [SHOULD] Interactivity only for essential, directly related toggles (playback, workout, recording). **Prefer a single control.** [CONSIDER] respond-to-update actions (contact driver).
  - [SHOULD] Start at expected moments (order placed, match starts). Provide an in-app off switch next to the related content, otherwise people kill all Live Activities in Settings.
  - [CONSIDER] App Shortcut to start it (Action button).
  - [SHOULD] Update only on real change. Alert (lights screen + sound) only for essential updates. **Never also push a notification for the same update.**
  - [SHOULD] One Live Activity that rotates through multiple events, not many separate ones.
  - [MUST-ish "Always"] End immediately when the event ends. After ending it stays up to **4h** on Lock Screen/Mac/Watch, so set a custom dismissal of ~**15–30 min** (rideshare: 30 min for receipt + tip).
- **Platform deltas**: Start with the iPhone design, then refine. CarPlay: compact merged; **interactive elements disabled**; custom `ActivityFamily.small`; sizes 240x78 / 240x100 / 170x78. The custom watchOS layout also applies in CarPlay, so skip buttons if likely used while driving. Mac menu bar: click → iPhone Mirroring. iOS dims: 430x932 → compact 62.33x36.67, minimal 36.67–45 x 36.67, expanded/Lock 408 x 84–160; 393x852 → 52.33 compact, 371 x 84–160. iPad Lock Screen 500 or 425 x 84–160.
- **Web translation** *(inference)*: persistent in-page status chip/toast for an ongoing order/job: one compact line, live data rather than a logo, removed shortly after completion, plus an "unfollow" control. Never pair it with duplicate push/email for the same tick.
- **Slop tells** *(inference)*: the app icon in a rounded container in the Island; a Lock Screen layout that looks like a notification (icon + title + body); padding gap next to the camera; leading/trailing in mismatched styles; 3 buttons; promo copy; activity lingering 4h after delivery; a ping on every minor status change.

## Notifications (source: notifications)
- **Intent**: Timely, high-value, glanceable info. Requires consent.
- **Checks**:
  - [SHOULD] Concise. **One notification per thing.** No re-nagging if ignored.
  - [SHOULD] Don't instruct people to go do tasks in the app; offer actions or nothing.
  - [SHOULD] Errors → alert, not notification.
  - [SHOULD] Foreground: no banner. Insert data quietly or bump the badge (Mail adds to the list).
  - [SHOULD] No sensitive or private data.
  - Content: [SHOULD] title only if it adds context (headline, event, subject); if only generic ("New Document"), omit it and let the app name show; title case, no punctuation. Body: full sentences, sentence case, don't pre-truncate. [SHOULD] provide a hidden-preview placeholder body ("New comment", "Shipment"). [SHOULD] no app name or icon in content (the system adds them). [CONSIDER] short, distinctive custom sound; never rely on sound for meaning.
  - Actions: up to **4**; title-case short labels describing the result; no app name; [SHOULD] no action that just opens the app; prefer nondestructive; an SF Symbol per action (shown trailing).
  - Badges: [MUST-ish] unread notification count only (never weather/scores/dates); not the only channel for essential info; update immediately on read (badge 0 clears Notification Center); [SHOULD] never fake a badge with custom UI.
- **watchOS (brief)**: short look is brief and private (no sensitive titles); long look always has a static interface, ideally dynamic too; sash color/blur; content bg default transparent or white at **18%** opacity to match system; ≤4 custom actions + system Dismiss; double tap fires the **first nondestructive** action, so order the most-used first.
- **Web translation** *(inference)*: web push only after a contextual opt-in (never on load); dedupe; in-tab updates go inline, not via a toast + push; an unread-count badge only for unread items.
- **Slop tells** *(inference)*: "Don't forget to check out our new features!"; "MyApp: You have a new message from MyApp"; an "Open" action button; red dot badges on nav items for non-notification "new" features; reminder spam every 4h.

## Controls (source: controls) — Control Center / Lock Screen / Action button (iOS, iPadOS, macOS)
- **Intent**: Button (action, deep link, locked-camera launch) or toggle (two states). Anatomy: symbol + title + optional value. Lock Screen shows the symbol only.
- **Checks**: [SHOULD] actions most useful without launching the app (e.g. start a Live Activity); reflect state immediately, including in-progress; symbol must carry the meaning alone, with distinct on/off symbols (`door.garage.open`/`.closed`); animate toggle transitions, animate indefinitely during long actions; brand tint (applied to the on state and Island); prompt for configuration on add; Action-button hint text written as a verb; placeholder title/value if situational; redact on lock (symbol shown in off state); [SHOULD] require auth for security-affecting actions (locks, car). Locked camera (iOS 18+): same camera UI as the app; explain how to add the control.
- **Slop tells** *(inference)*: one generic glyph for both states; an app logo as the control symbol.

## App Shortcuts (source: app-shortcuts)
- **Intent**: Expose key tasks to Siri/Spotlight/Shortcuts/Action button/Pencil squeeze; available immediately after install; max **10** per app.
- **Checks**: [CONSIDER] app schemas (Apple Intelligence) for common domains first; shortcuts for unique features. [SHOULD] most common tasks; ≤1 optional parameter with predictable values; ask a follow-up for missing info with a smart default (last used, time of day); phrases short and speakable, containing the app name; put all critical info in full dialogue for audio-only devices; surface via in-app tips (SiriTipUIView); order by importance (Spotlight/Shortcuts order). Copy: "App Shortcuts"/"Shortcuts" in title case and plural; a generic "shortcut" lowercase. Not on macOS (intents are supported).

## Snippets (source: snippets)
- **Intent**: Compact view showing a Siri/App Shortcut result, or asking for confirmation.
- **Checks**: [SHOULD] contrast vs the system bg in light and dark; consistent margins; max height **400pt** (watch Dynamic Type); deep-link for more detail; confirmation primary button gets a specific verb ("Order", not "OK"/"Proceed"; default is "Continue"); convey purpose visually, don't depend on dialogue text. Confirmation = Cancel + primary; result = Done.

## Status bars (source: status-bars) — iOS/iPadOS
- [SHOULD] Keep the status bar legible over content (scroll edge effect / blur) and don't place interactive-looking controls under it. [CONSIDER] hide temporarily for full-screen media. [SHOULD] never hide permanently; restore with a simple gesture (tap).
- **Web translation** *(inference)*: respect `env(safe-area-inset-top)`; no tappable controls under the notch.

## Complications (source: complications) — watchOS, brief
- Dynamic glanceable data, not a launcher. Support all families (app-icon fallback). Several per family, each with its own deep link. Privacy on Always-On. Plan timeline update budget. Gauge style: closed = % of whole, open = arbitrary range, segmented = fast-changing. Tinted mode desaturates: never color-only meaning; supply tinted image variants. Lines ≥ **2pt**. Static placeholders per complication. Rectangular can appear in the Smart Stack (watchOS 10+). Default text is SF Rounded (e.g. circular 12–14.5pt Medium; rectangular 16.5–19.5pt). Full size tables in source.

## Watch faces (source: watch-faces) — brief
- Shareable faces featuring several of your complications; show a preview (bezel art from Apple Design Resources); offer configs for older devices (Series 3) and label compatibility; on an incompatible face, offer an alternative configuration rather than an error.

## Top Shelf (source: top-shelf) — tvOS, brief
- Feature new or personalized content (resume playback); never content already watched or bought; no ads or prices. Static fallback 2320x720pt, not implying interactivity. Carousel actions/details: Play + More Info, with a title. Sectioned row: fill the full width, ≥1 label; poster 404x608, square 608x608, 16:9 908x512 actual. Scrolling inset banner: **3–8** images, text baked into the image + accessibility label; 1940x692 actual.

---

## Presentation & input decision guide
- Unexpected problem / irreversible uncommon destructive action → **alert** (≤3 buttons, verb titles), not a popover, toast, or notification.
- Person deliberately did something and must pick among outcomes (Save / Discard) → **action sheet** (destructive at top, Cancel at bottom), not an alert or menu.
- Common destructive action that can be undone (delete email) → **no confirmation, offer undo**, not an alert.
- Info only, not actionable (offline, sync paused) → **inline indicator/label** in context, not an alert.
- Small set of related quick edits anchored to a control, regular width → **popover**; compact width → **sheet**. Never stack popovers.
- Scoped task that returns to the parent (attach, choose location, short form) → **sheet** (Cancel leading / Done trailing), not a new screen push.
- Long, multi-step, or immersive task → **full-screen modal / new window**, not a sheet.
- Controls that tweak the current selection while you keep working → **nonmodal**: macOS panel/inspector, iOS nonmodal sheet (medium detent), visionOS split view; not a modal.
- Repeated input + observe results (find/replace) → **panel**, not a sheet.
- Content the person wants side-by-side → offer "Open in New Window", not auto-open.
- Short list (≈2–5) of mutually exclusive options → segmented control (view/filter) or radios (macOS) or pull-down; medium-long → picker; huge → list/table with index.
- Binary setting in an iOS list row → switch; binary outside a list → toggle-styled button; macOS form value → checkbox; parent/child settings → checkboxes with mixed state.
- Bounded continuous value → slider (+ text field/stepper for precision); repeating value → circular slider (macOS); small integer increments → stepper next to its visible value; audio volume → system volume view.
- Text with suggestions → combo box (macOS) / datalist; free short text → text field with persistent label + correct keyboard type; long text → text view.
- Known duration → determinate bar/ring; unknown → spinner (or indeterminate *bar* if it may become determinate). Never morph spinner → bar.
- Value within a range (capacity, temperature) → gauge/level indicator, not a progress indicator.
- Glanceable, periodically updated info outside the app → widget; real-time bounded event (≤8h) → Live Activity; one-shot timely message → notification; quick action from system UI → control; voice/Spotlight task → App Shortcut + snippet.

## Cross-cutting principles
1. **Interruptions are a budget.** Alerts, action sheets, notifications, and Live Activity alerts all say "sparingly". Every one must be actionable, not just informative.
2. **Intent changes styling.** A destructive action the person explicitly chose is *not* styled destructive in its confirming alert. Destructive styling flags danger the person didn't ask for.
3. **Labels are specific verbs/nouns.** Alert buttons, snippet confirm buttons, notification actions, and Action-button hints all ban "OK/Yes/No/Proceed" in favor of the result verb. "Cancel" is always literally "Cancel". Copy that *explains* buttons is a smell.
4. **No stacking.** One sheet, one popover, nothing over a popover except an alert, never nested same-axis scroll views.
5. **Dismissal never silently loses work.** Auto-closing popovers save. Swipe-to-dismiss with edits → action sheet. Cancel that loses progress → alert with Resume. Done always has a Cancel/Back alternative.
6. **Honesty in status.** Determinate over indeterminate, even pacing, keep it moving, explain stalls, show "last updated" instead of hiding stale data, no vague "Loading…".
7. **Never color alone.** Toggles, widgets (tinted/vibrant/accented), complications, Activity-ring labels, StandBy night red: state and meaning must survive desaturation.
8. **System chrome isn't yours to fake.** No custom window frames, fake badges, Activity-ring lookalikes, widget lookalikes inside the app, or UI pointing at the Dynamic Island.
9. **Glanceables are data, not launchers.** Widgets, complications, Lock Screen widgets, minimal Live Activities: show live values, not a logo/app icon. Deep-link to the *exact* screen.
10. **Concentric geometry.** Use ContainerRelativeShape for corners; standard margins (widgets 16pt / 11pt tight; Live Activity Lock Screen 14pt); motion ≤2s for widgets and Live Activities.
11. **Fit size to content.** Text field width ≈ expected input; popover only as big as its content; widget sizes only when they add meaning; visionOS window shape follows content.
12. **Restraint in branding.** A logo without a container, small logo top-right only if multi-source, tinted Add button, brand tint on control on-state. Brand shouldn't overpower info.

## Open questions for skill design
- How to weight [SHOULD] when Apple says "avoid" and the web context differs (e.g. switches in web forms)? Proposal: report as SHOULD with a "web caveat" line.
- Do we review copy (alert titles, button labels, widget descriptions) as part of the UI pass, or hand off to a UX-writing check? These rules are highly checkable and are the strongest anti-slop signal here.
- Static mockups can't show dismissal/stacking/progress pacing behavior. Should the skill ask for flow/state screenshots (loading, error, empty, dirty-dismiss) or prompt for them explicitly?
- Widgets/Live Activities need multi-mode review (light, dark, tinted, clear, vibrant, Always-On, StandBy night). Require a mode checklist, or flag "unverified modes" by default?
- Web translation of the compact-width popover→sheet rule: pick a concrete breakpoint (e.g. <600px) or leave it to the project's breakpoints?
- Should "Slop tells" findings be a separate severity tier (e.g. TASTE) so they don't dilute HIG-backed MUST/SHOULD findings?
- watchOS/tvOS specs (complication/top-shelf sizes) are huge. Keep them in a lookup reference file rather than inline in the skill prompt?
- Spec tables carry 2026 dates (Live Activities limited-width, HomeView, 49mm Ultra 3/4). Pin a HIG snapshot date in the skill so reviews cite a version.
