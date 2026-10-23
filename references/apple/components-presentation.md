Covers: alerts, action sheets, sheets, popovers, panels, windows, page controls, scroll views, pickers and other selection/input controls, text fields, toggles, keyboards, progress/status indicators, widgets, Live Activities, notifications, controls, App Shortcuts, snippets, status bars.
Loaded by: structure, interaction and motion
Snapshot: 2026-10-23

Strength tags follow the global rule (MUST = must/never/always/don't or App Review; SHOULD = avoid/prefer/use and plain imperatives; CONSIDER = consider/can/may). "Web" lines are our translation; "Slop tells" are ours. Copy rules here (alert titles, button labels, widget descriptions) stay as component rules; the full copy ruleset is in references/writing.md.

Unverified by default: static mockups cannot show dismissal, stacking, or progress pacing. Ask for dirty-dismiss, loading, error and empty states, or list them as unverified. For widgets and Live Activities, any mode not seen (light, dark, tinted, clear, vibrant, Always-On, StandBy night) goes to the report's Unverified list.

## Presentation & input decision guide
- Unexpected problem or uncommon irreversible destructive action: alert (at most 3 buttons, verb titles). Not a popover, toast, or notification.
- Person deliberately started something and must pick among outcomes (Save / Discard): action sheet (destructive at top, Cancel at bottom). Not an alert or menu.
- Common destructive action that can be undone (delete an email): no confirmation, offer undo. Not an alert.
- Information only, not actionable (offline, sync paused): inline indicator or label in context. Not an alert.
- Small set of related quick edits anchored to a control, regular width: popover. Compact width: sheet. Never stack popovers.
- Scoped task that returns to the parent (attach, choose location, short form): sheet (Cancel leading, Done trailing). Not a pushed screen.
- Long, multi-step, or immersive task: full-screen modal or new window. Not a sheet.
- Controls that tweak the current selection while the person keeps working: nonmodal. macOS panel or inspector, iOS nonmodal sheet (medium detent). Not a modal.
- Repeated input plus observing results (find and replace): panel, not a sheet.
- Content the person wants side by side: offer "Open in New Window", do not auto-open.
- Short list (about 2 to 5) of mutually exclusive options: segmented control (view or filter), radios (macOS), or pull-down. Medium to long: picker. Huge: list or table with index.
- Binary setting in an iOS list row: switch. Binary outside a list: toggle-styled button. macOS form value: checkbox. Parent/child settings: checkboxes with a mixed state.
- Bounded continuous value: slider (plus text field or stepper for precision). Repeating value: circular slider (macOS). Small integer steps: stepper next to its visible value. Audio volume: system volume view.
- Text with suggestions: combo box (macOS) or datalist. Free short text: text field with a persistent label and the right keyboard type. Long text: text view.
- Known duration: determinate bar or ring. Unknown: spinner, or an indeterminate bar if it may become determinate. Never morph a spinner into a bar.
- A value within a range (capacity, temperature): gauge or level indicator, not a progress indicator.
- Glanceable, periodically updated info outside the app: widget. Real-time bounded event (up to 8 hours): Live Activity. One-shot timely message: notification. Quick action from system UI: control. Voice or Spotlight task: App Shortcut plus snippet.

## Cross-cutting rules
1. Interruptions are a budget. Alerts, action sheets, notifications and Live Activity alerts all say "sparingly". Each must be actionable, not just informative.
2. Intent changes styling. A destructive action the person explicitly chose is not styled destructive in its confirming alert; destructive styling flags danger they did not ask for.
3. Labels are specific verbs or nouns. Alert buttons, snippet confirm buttons, notification actions and Action-button hints avoid OK/Yes/No/Proceed. "Cancel" is always literally "Cancel". Copy that explains the buttons is a smell.
4. No stacking. One sheet, one popover, nothing over a popover except an alert, no nested same-axis scroll views.
5. Dismissal never silently loses work. Auto-closing popovers save. Swipe-to-dismiss with edits goes through an action sheet. A cancel that loses progress gets an alert with Resume. Done always has a Cancel or Back alternative.
6. Honesty in status. Determinate over indeterminate, even pacing, keep it moving, explain stalls, show "last updated" instead of hiding stale data, no vague "Loading...".
7. Never color alone. Toggles, widgets (tinted, vibrant, accented), Activity-ring labels, StandBy night red: state and meaning must survive desaturation.
8. System chrome is not yours to fake. No custom window frames, fake badges, Activity-ring lookalikes, widget lookalikes inside the app, or UI pointing at the Dynamic Island.
9. Glanceables are data, not launchers. Widgets, Lock Screen widgets and minimal Live Activities show live values, not a logo or app icon, and deep-link to the exact screen.
10. Concentric geometry. ContainerRelativeShape for corners; standard margins (widgets 16pt, 11pt tight; Live Activity Lock Screen 14pt); motion up to 2s for widgets and Live Activities.
11. Fit size to content. Text field width tracks expected input, a popover is only as big as its content, widget sizes exist only when they add meaning.
12. Restraint in branding. A logo without a container, a small logo top-right only if multi-source, a tinted Add button, brand tint on a control's on state. Brand must not overpower the information.

# A. Presentation

## Action sheets
- **Intent**: Modal list of choices tied to an action the person just deliberately started (cancel a draft: Delete Draft / Save Draft).
**Checks**:
- [SHOULD] Use an action sheet, not an alert, when the person started the action and must pick among outcomes. An alert is for the unexpected.
- [SHOULD] On iOS/iPadOS, use an action sheet, not a menu, for choices that follow from an action. People open menus themselves; action sheets appear in response to an action.
- [SHOULD] Use them sparingly; each one interrupts.
- [SHOULD] Title fits on one line. Add a message only if title and context are not enough.
- [SHOULD] Where data could be destroyed, put Cancel at the bottom. SwiftUI confirmationDialog adds it automatically.
- [SHOULD] Destructive buttons get destructive style and go at the top.
- [SHOULD] On iOS the sheet must not scroll; scrolling is slow and causes mis-taps.
- **Platform deltas**: iOS/iPadOS use UIAlertController.actionSheet or confirmationDialog; macOS has no extra rules. (Watch limits the sheet to 4 buttons including Cancel; the principle is few real choices.)
- **Web (our translation)**: bottom sheet on mobile, anchored menu-dialog on desktop, destructive item first and Cancel last. Do not reuse the centered confirm modal for multi-choice outcomes.
- **Slop tells (ours)**: centered modal with "Are you sure?" plus Yes/No when the real choice is Save vs Discard vs Keep Editing; destructive item placed last and styled like the rest; 6+ options in a scrolling sheet.

## Alerts
- **Intent**: Critical information needed right now: a problem, a warning before unrecoverable data loss, or confirmation of a purchase or important action.
**Checks (when)**:
- [SHOULD] Use sparingly. Every alert carries essential info and a useful action.
- [SHOULD] Avoid using an alert merely to inform. Info-only goes in context (Mail's offline indicator you can tap for details).
- [SHOULD] No alert for common, undoable actions, even destructive ones (deleting an email or file). Reserve alerts for uncommon and irreversible destructive actions.
- [SHOULD] Avoid showing an alert on app launch. For startup problems (offline), show cached or placeholder data plus a quiet label.
- [SHOULD] Do not use a popover for warnings (they get missed or dismissed); do not use a notification for errors (use an alert).
**Checks (copy; see references/writing.md)**:
- [SHOULD] Title states what happened, where, and why. Never "Error" or "Error 329347 occurred". At most 2 lines.
- [SHOULD] A full-sentence title gets sentence case and ending punctuation. A fragment gets title case, no punctuation.
- [SHOULD] Body text only if it adds value: short, complete sentences.
- [SHOULD] Do not explain the buttons. If you must, say "choose" and quote the exact button title without quote marks.
- [SHOULD] Direct, neutral tone. Not oblique, not accusatory, and do not play down severity.
- [SHOULD] Text field only when input is needed to resolve the situation (a secure password field).
**Checks (buttons, at most 3)**:
- [SHOULD] 1 to 2 word verb titles tied to the alert text ("Erase", "Convert", "Reply"). Sentence case, no punctuation.
- [SHOULD] "OK" only in purely informational alerts. Never "Yes"/"No".
- [MUST] The cancel button's title is always exactly "Cancel".
- [MUST] The default (likeliest) button goes on the trailing side of a row or the top of a stack. Cancel goes leading or bottom.
- [SHOULD] Destructive style only for destructive actions the person did not deliberately choose. If they clicked "Empty Trash", the confirm button stays default style so Return still confirms.
- [SHOULD] Any destructive alert also has Cancel. Cancel is never the default button.
- [CONSIDER] To make people read, set no default button at all.
- [SHOULD] A single-button alert whose button is the default is titled "Done", not "Cancel".
- [SHOULD] Support Esc / Cmd-. (iOS, iPadOS, macOS) and Home exit (iOS).
- **Platform deltas**: iOS avoids alert scrolling at large text sizes and uses an action sheet for choices about an intentional action. macOS shows the app icon automatically; supports a suppression checkbox, accessory view and Help button; use the caution symbol (`exclamationmark.triangle`) sparingly, only for unexpected data loss, never for routine save or empty-trash.
- **Web (our translation)**: `<dialog>` / role="alertdialog"; Esc closes; primary on the right in LTR; never `window.alert` on page load; inline banners for offline or info; "Delete 3 files?" with [Cancel][Delete].
- **Slop tells (ours)**: "Oops! Something went wrong" + [OK]; "Are you sure?" + [Yes][No]; red destructive styling on the button the person just asked for; welcome or what's-new modal on first load; alerting on every delete instead of offering undo; alerts with 4+ buttons; toasts for errors that block progress.

## Page controls
- **Intent**: Row of dots for moving through a flat, ordered set of peer pages.
**Checks**:
- [SHOULD] Ordered sequences only. Not hierarchies or random-access content (use a sidebar or split view).
- [SHOULD] Center horizontally near the bottom.
- [SHOULD] At most about 10 dots; beyond that, use a grid.
- [SHOULD] At most 2 indicator image types (default plus one special, like Weather's `location.fill`). Custom images stay simple: no text, inner lines, or negative space.
- [SHOULD] Do not color the indicators; let the system color them.
- [SHOULD] On iOS, do not animate page transitions while scrubbing; animate only on tap.
- [SHOULD] iOS background styles: prominent only when it is the primary navigation; automatic otherwise; no scrubbing with minimal (it gives no feedback).
- [SHOULD] With a paged scroll view, hide that axis's scroll indicator (redundant).
- **Platform deltas**: not on macOS.
- **Web (our translation)**: carousel dots reflect real order, stay at 10 or fewer, are keyboard reachable, and use aria-current. Dots are not the only navigation on desktop.
- **Slop tells (ours)**: brand-colored dots; 15-dot onboarding carousels; dots for non-sequential tabs; auto-advancing hero carousels with dots as the only control.

## Panels
- **Intent**: macOS floating supplementary window (inspector, Fonts, Colors) tied to the active window or selection.
**Checks**:
- [CONSIDER] Inspector (follows the selection): panel or split-view pane. Info window (fixed content): regular window.
- [SHOULD] Prefer direct adjustment controls (sliders, steppers) over typing or select-then-act.
- [SHOULD] Short noun title in title case ("Inspector", "Fonts"). Menus say "Show Fonts", never "Show Fonts Panel".
- [SHOULD] Show all panels when the app activates and hide them when inactive. No minimize button. Not listed in the Window menu's document list.
- [SHOULD] HUD style only for media apps, only when a standard panel would hide content, with few controls, small, little color, same style across mode switches.
- **Web (our translation)**: docked or floating inspector that updates live with the selection. No modal per edit.
- **Slop tells (ours)**: property editor as a blocking modal with Save; dark glass HUD panels in a productivity app for looks.

## Popovers
- **Intent**: Transient, anchored view for a little info or a few related actions.
**Checks**:
- [SHOULD] Small scope: a few related tasks.
- [SHOULD] Arrow points straight at its source. Do not cover the source or essential content.
- [SHOULD] Close/Cancel/Done only when it clarifies (save vs discard). Otherwise dismiss on outside tap or selection. Multi-select stays open until dismissed.
- [MUST] On auto-close, always save work. Discard only on an explicit Cancel.
- [SHOULD] Show one popover at a time. Avoid cascading popovers.
- [MUST] Do not show another view over a popover except an alert (wording of exception unverified).
- [SHOULD] One click or tap closes the current popover and opens another (sibling bar buttons).
- [SHOULD] Size to content. Animate size changes so it does not look like a new popover.
- [SHOULD] Avoid using a popover for warnings.
- [SHOULD] Do not write "popover" in help copy.
- **Platform deltas**: iOS/iPadOS: no popovers in compact width; use a sheet. macOS: consider making them detachable into a panel with minimal visual change.
- **Web (our translation)**: at the project's compact-width breakpoint, popovers become bottom sheets (use the project's own breakpoints, no fixed number). Light-dismiss popovers must persist edits. Never nest popover in popover.
- **Slop tells (ours)**: nested dropdown-in-popover-in-popover; popover forms that lose input on outside click; giant popovers holding full settings pages; tooltips used for warnings.

## Scroll views
- **Intent**: Content bigger than its frame, with no chrome beyond an indicator.
**Checks**:
- [SHOULD] Support system scroll gestures and keys. Custom scrolling keeps elastic behavior.
- [SHOULD] Make overflow obvious, for example a partial item cut off at the edge.
- [SHOULD] Avoid nesting same-axis scroll views. Cross-axis nesting is fine.
- [CONSIDER] Page-by-page scrolling with an overlap unit (a line of text).
- [CONSIDER] Auto-scroll only as much as needed: to a found selection, back to the caret when typing resumes, following a drag selection.
- [SHOULD] Set sensible zoom min and max.
- [SHOULD] (26+) Scroll edge effect: prefer automatic. Use only behind floating UI (not decoration). One per view. In split panes, keep heights consistent. Test soft for legibility.
- **Platform deltas**: macOS allows small/mini scroll bars in tight panels, with all controls the same size.
- **Web (our translation)**: no scroll-jacking; no inner `overflow:auto` on the same axis as the page; fade or peek edges on horizontal rails; sticky header blur only where content actually passes under it.
- **Slop tells (ours)**: scroll-jacked parallax landing pages; a vertically scrolling card inside a vertically scrolling page; decorative gradient "edge effects" with nothing floating above; horizontal rails with no peek.

## Sheets
- **Intent**: Scoped task tightly related to the current context (attach a file, pick a save location), then return to the parent.
**Checks**:
- [CONSIDER] Complex or long flows: full-screen modal (iOS) or new window or full screen (macOS) instead of a sheet.
- [SHOULD] One sheet at a time. If a sheet triggers another, close the first, then optionally reopen it after.
- [SHOULD] Supplementary controls that affect the parent are nonmodal: iOS nonmodal sheet (Notes formatting), macOS panel.
- [SHOULD] Done is always paired with Cancel (or Back for multi-step). Never show Cancel, Done and Back together. Back navigates and never dismisses.
- [SHOULD] iOS/iPadOS: Cancel on the leading edge of the top toolbar, Done trailing.
- [CONSIDER] iOS: medium detent (about half height) for progressive disclosure (share sheet); compose UIs are large-only.
- [SHOULD] iOS: grabber on resizable sheets (also VoiceOver-operable; tap cycles detents).
- [SHOULD] iOS: support swipe-down to dismiss; with unsaved changes, confirm via an action sheet.
- [SHOULD] iPad: page or form sheet styles.
- [SHOULD] macOS: sensible default size (resizable optional). Other app windows stay usable while a sheet is up. Repeated input/observe loops (find and replace) use a panel, not a sheet.
- **Web (our translation)**: modal dialog or drawer for one scoped task. Mobile bottom sheet with a drag handle and snap points. Dirty-state guard on swipe, Esc and backdrop. Cancel left, primary right in the header.
- **Slop tells (ours)**: a modal wizard of 6 steps; modal over modal; sheets with only Save and no Cancel; X plus Cancel plus Back all visible; bottom sheet with no handle that cannot be dragged; backdrop click silently discarding a filled form.

## Windows
- **Intent**: iPadOS/macOS. Primary window (main navigation plus content) vs auxiliary window (one task, no navigation elsewhere, has a close action).
**Checks**:
- [SHOULD] Adapt fluidly to any size.
- [SHOULD] Do not open new windows by default (Compose in Mail is the justified case).
- [CONSIDER] Offer "Open in New Window" via context menu or File menu; iPad pinch-to-window.
- [SHOULD] No custom window frames or controls; imperfect imitations feel broken.
- [SHOULD] User-facing term is "window", never "scene".
- [SHOULD] iPadOS: leading toolbar items shift inward when window controls appear (windowed mode).
- [SHOULD] macOS: custom windows honor main, key and inactive appearances (key = colored traffic lights; inactive = no materials, subdued).
- [SHOULD] macOS: nothing critical in the bottom bar (people drag windows so the bottom edge goes offscreen); bottom bar for small status only (Finder item counts).
- **Web (our translation)**: support opening in a new tab via real links (`<a href>`, middle-click). No fake OS chrome or traffic-light dots in web apps. Keep critical actions out of footers that can scroll away.
- **Slop tells (ours)**: faux macOS traffic lights on cards or terminal mockups; `target=_blank` everywhere; buttons that should be links (cannot open in a new tab).

# B. Selection and input

## Color wells
- **Intent**: A swatch that opens a color picker.
**Checks**:
- [CONSIDER] the system picker (saved colors carry across apps). macOS: the well highlights when active and supports drag and drop between wells and the picker.
- **Web (our translation)**: `<input type="color">` or a picker that keeps recent and saved swatches. Show the current value as a swatch, not only a hex string.
- **Slop tells (ours)**: a custom 12-swatch palette with no custom/hex option and no recents.

## Combo boxes
- **Intent**: macOS text field plus pull-down of suggested values. Custom entries are not added to the list.
**Checks**:
- [SHOULD] meaningful default from the list (need not be first); title-case intro label ending in a colon; relevant choices; list items no wider than the field.
- **Web (our translation)**: `<input list>` plus `<datalist>` or an ARIA combobox. Free text allowed.

## Image wells
- **Intent**: macOS editable image view.
**Checks**:
- [SHOULD] revert to the default image if a required image is cleared; standard Copy/Paste menu items and shortcuts; drag-in without selecting first.
- **Web (our translation)**: avatar or upload drop zone that accepts paste and drag, with a delete action that restores the placeholder.

## Pickers
- **Intent**: Scrollable lists of distinct values (single or multipart). Date pickers add calendar or keypad entry.
**Checks**:
- [CONSIDER] Short list: pull-down button. Medium to long: picker. Very large: list or table with index.
- [SHOULD] Predictable, logically ordered values (alphabetized countries) so hidden values can be guessed.
- [SHOULD] Show the picker in context (below the field or in a popover). Do not switch views to show it.
- [CONSIDER] Coarser minute intervals that divide 60 evenly (0/15/30/45).
- [SHOULD] iOS date picker: styles compact, inline, wheels, automatic; modes date, time, date+time, countdown (max 23h 59m, not in inline or compact). Use compact when space is tight (value shown in accent color, opens a modal editor).
- macOS: textual (tight space, specific values) vs graphical (browse a calendar, ranges, clock face).
- **Web (our translation)**: native `<select>` / `<input type="date|time">` first. Custom date pickers allow typed entry and honor locale order.
- **Slop tells (ours)**: a 3-option choice rendered as a wheel or giant dropdown; a full-page route just to pick a date; minute pickers with 60 entries for appointment booking; unordered option lists.

## Segmented controls
- **Intent**: Linear group of equal segments for closely related choices on one object, state or view. Single select (macOS also multi-select or momentary actions).
**Checks**:
- [SHOULD] Do not mix action segments and selection segments in one control.
- [SHOULD] About 5 to 7 segments wide at most; about 5 at most on iPhone.
- [SHOULD] Equal widths; similar content length across segments.
- [SHOULD] Text or icons, never mixed. Labels are nouns in title case. No intro label with text labels.
- [CONSIDER] iOS: switching closely related subviews (Calendar's Event/Reminder). Separate app sections use a tab bar.
- [SHOULD] macOS: main-window view switching uses a tab view, not a segmented control (segmented is fine in toolbar or inspector). Tooltips per segment; labels under icon segments; consider spring loading.
- **Web (our translation)**: radio group styled as segments (role=radiogroup) for filters and views. Not a replacement for top-level navigation tabs.
- **Slop tells (ours)**: pill "segmented" toggles as primary site nav; 8-segment controls that wrap; one segment with an icon and others text; segments that sometimes navigate and sometimes act.

## Sliders
- **Intent**: Continuous value between min and max via a thumb.
**Checks**:
- [SHOULD] Min on the leading side, max trailing (vertical: min at bottom).
- [CONSIDER] Pair with a text field and stepper for wide ranges or exact values.
- [CONSIDER] Min/max icons that illustrate meaning (small image to large image).
- [MUST] iOS: do not use a plain slider for audio volume; use the system volume view (includes the output-device picker).
- [SHOULD] macOS: live feedback while dragging; linear for bounded ranges, circular for repeating values (rotation 0 to 360 degrees, spins); tick marks and min/max labels (periodic labels if nonlinear); tooltip with the current value; intro label in sentence case with a colon.
- **Web (our translation)**: `<input type="range">` with a visible numeric value and an editable field for precision. Apply live, with no Apply button.
- **Slop tells (ours)**: sliders for exact values (age, price) with no numeric entry; reversed direction; no value readout; a "volume" slider that ignores system output.

## Steppers
- **Intent**: Small increments of a value shown elsewhere.
**Checks**:
- [SHOULD] Make the affected value obvious (the stepper shows no value itself).
- [CONSIDER] Pair with a text field when large jumps are likely (print copies). macOS: Shift-click for about 10x increments.
- **Slop tells (ours)**: a +/- control for values ranging 1 to 1000; steppers floating far from their value.

## Text fields
- **Intent**: Short, specific text (name, email). Long text uses a text view.
**Checks**:
- [SHOULD] Placeholder hints plus a separate persistent label, because the placeholder disappears on input.
- [SHOULD] Use a secure field for passwords and other sensitive data.
- [SHOULD] Field width matches the expected length of input.
- [SHOULD] Even spacing; stack vertically; consistent widths per field group (first/last name one width, address/city another).
- [SHOULD] Logical tab order.
- [SHOULD] Validation timing depends on the field: email validates on leaving the field; username/password validate before leaving it. Digit-only fields flag non-digits.
- [SHOULD] Number formatter for numeric, currency and percent input. Never hard-code locale formatting.
- [CONSIDER] Choose line break or truncation mode (head/middle/tail); expansion tooltip for clipped text.
- [SHOULD] iOS/iPadOS: right keyboard type.
- [SHOULD] iOS: clear button at the trailing end. Leading image = purpose, trailing = extra function.
- macOS: text plus a list of choices uses a combo box.
- **Web (our translation)**: `<label>` always visible (no placeholder-only labels); correct `type`, `inputmode`, `autocomplete`; validate email on blur and password rules live; `Intl.NumberFormat`; field widths sized to content (ZIP narrow, street wide).
- **Slop tells (ours)**: placeholder-as-label floating-label forms where every field is full width and the same length; validation that shouts red on the first keystroke; generic "Invalid input"; a number field typed as text; uniform 48px fields for a 2-digit CVV and a street address alike.

## Toggles
- **Intent**: Choose between two opposing states.
**Checks**:
- [SHOULD] Only for on/off state. Choosing from items uses a pop-up button.
- [SHOULD] State difference must not rely on color alone (fill, shape, checkmark).
- [SHOULD] iOS: switch style only inside a list row (no label needed; the row provides it). Outside lists, use a toggle-button (icon plus background change, like Phone's filter button) with no explanatory label.
- [SHOULD] iOS: change the default green only if necessary (accent color is fine) and keep enough contrast against off.
- [SHOULD] macOS: switches, checkboxes and radios live in the window body, never in toolbar or status bar. Switch = emphasized or group-level setting; mini switch in grouped-form rows; regular switch for parent plus mini for children. Do not replace existing checkboxes with switches.
- [SHOULD] macOS: checkbox for hierarchies (leading-edge alignment plus indent), with a mixed state when children differ. Radios: groups of 2 to 5; more than about 5 becomes a pop-up button; a single on/off is a checkbox, not a lone radio; consistent horizontal spacing sized to the longest label.
- **Web (our translation)**: switch = immediate-effect setting in a settings row; checkbox = form value submitted later; tri-state "select all" checkbox; never a switch floating in a toolbar. A switch in a web form that needs Submit is reported as SHOULD with a web caveat: Apple's "avoid" rule is for iOS lists, and web forms with an explicit submit step are better served by a checkbox.
- **Slop tells (ours)**: iOS-style switches for every boolean, including forms that need Submit; switches as standalone toolbar buttons; on/off shown only by green vs gray; a "select all" box with no indeterminate state.

## Virtual keyboards
- **Intent**: Task-matched on-screen keyboards.
**Checks**:
- [SHOULD] Keyboard type matches content (email, URL, number pad, decimal pad, phone pad, web search); set the semantic content type so autofill and corrections work.
- [CONSIDER] Return key type matching the action (Search, Go, Send).
- [SHOULD] Custom input views: obviously beneficial; play the standard click sound (respect the user setting).
- [SHOULD] Custom keyboards (extension): obvious keyboard switching (Globe); do not duplicate system Emoji/Dictation keys; tutorial in the app, not in the keyboard. Not available in secure or phone fields.
- [SHOULD] iOS: use the keyboard layout guide so key UI stays visible. Accessory bar above the keyboard: task-relevant only; (26+) Liquid Glass if the rest of the app uses it (a standard toolbar adopts it automatically).
- **Web (our translation)**: `inputmode`, `enterkeyhint`, `autocomplete`; keep the focused field and primary action above the keyboard (visualViewport).
- **Slop tells (ours)**: OTP or phone fields bringing up the full QWERTY keyboard; Submit hidden under the keyboard; Return key labeled "return" on a search box.

# C. Status

## Progress indicators
- **Intent**: Show the app is not stalled. Determinate (known duration: bar or clockwise ring) vs indeterminate (spinner; macOS also has an indeterminate bar).
**Checks**:
- [SHOULD] Prefer determinate. It lets people decide whether to wait, come back later, or abandon.
- [SHOULD] Report honestly and at an even pace. 90% in 5s then the last 10% in 5 min can feel deceptive.
- [SHOULD] Keep it moving; a stationary indicator reads as frozen. On a stall, explain what is wrong and what to do.
- [SHOULD] Switch indeterminate to determinate once the duration is known.
- [MUST] Do not switch a spinner into a bar (different shape and size disrupts layout). If it may become determinate, use a bar in its indeterminate state from the start.
- [SHOULD] Description only if specific. Avoid "Loading..." / "Authenticating..." (they seldom add value).
- [SHOULD] Consistent location across the app.
- [CONSIDER] Cancel if interruption is harmless. Add Pause if cancel loses progress (partial download). If cancel loses progress, confirm via an alert offering confirm or resume.
- [SHOULD] iOS refresh control: auto-refresh periodically (do not make the person drive all updates); title only if valuable ("Last updated..."), never "Pull to refresh" instructions.
- [SHOULD] macOS: spinner for background or confined spots (in a field, next to a button); avoid labeling spinners.
- **Web (our translation)**: `<progress value max>` for uploads and exports with bytes or ETA; skeletons for content loads; one spinner location; Cancel/Pause on long jobs; stale-while-revalidate instead of pull-to-refresh only.
- **Slop tells (ours)**: full-screen spinner plus "Loading..." for every fetch; fake progress bars that sprint to 90% and hang; a spinner that swaps into a bar; "Pull down to refresh" hint text; multiple spinners in different places for one operation; no cancel on a 2-minute export.

## Gauges
- **Intent**: A value within a range (circular or linear; standard indicator vs capacity fill; the accessory variant echoes complications for Lock Screen widgets).
**Checks**:
- [SHOULD] succinct labels for current value and both endpoints (VoiceOver reads them).
- [CONSIDER] gradient fill that encodes meaning (hot to cold).
- **Platform deltas**: macOS level indicators: capacity continuous (large ranges) vs discrete (segments fill fully, never partially; segment count = capacity); default fill green; [CONSIDER] tiered colors at thresholds; rating style; rarely relevance style.
- **Web (our translation)**: `<meter min max low high optimum>` for gauges, `<progress>` for task progress. Do not conflate them.
- **Slop tells (ours)**: decorative donut "gauges" with no endpoint labels; rainbow gradients that mean nothing; a progress bar for disk usage.

## Rating indicators
- **Intent**: macOS rating display and edit.
**Checks**:
- [SHOULD] whole symbols only (rounds; no half stars), fixed spacing.
- [SHOULD] edit ratings inline in lists.
- [SHOULD] a custom symbol must clearly read as a rating (stars are the recognizable default).
- **Slop tells (ours)**: 4.5-star partial fills in an editable control; hearts or flames as rating symbols with no context.

## Activity rings
- **Intent**: iOS/watchOS HealthKit Move/Exercise/Stand rings.
**Checks**:
- [SHOULD] Use rings only for Move/Exercise/Stand data; no other data in rings and no lookalike for these metrics.
- [SHOULD] Rings show one person only, identified by label, photo or avatar.
- [MUST] Always keep ring appearance the same: never recolor or change opacity. Always on black, ideally in a circle made with corner radius (not a mask).
- [SHOULD] Outer margin at least the inter-ring gap; nothing crops or encroaches. Labels use the ring colors.
- [MUST] Do not show rings in notifications or repeat Activity app notifications. Never decorative, branding, app icon, or marketing.
- iOS shows Move only without a paired Watch.
- **Slop tells (ours)**: concentric "progress rings" in brand colors for non-fitness KPIs. They read as an Apple Fitness copy and Apple prohibits lookalikes for these metrics.

# D. System experiences

## Widgets
- **Intent**: Glanceable, timely content plus focused interactions outside the app. Not a mini app and not an app-launch icon.
- **Sizes and modes**: system small, medium, large, XL (iPad, Mac); accessory circular, rectangular, inline (Lock Screen). Rendering modes: full-color, accented (background removed, views split into accent and primary groups, each tinted solid), vibrant (Lock Screen and StandBy night: desaturated, brightness = vibrancy). Modes not seen go to Unverified.
**Checks (content)**:
- [SHOULD] Avoid a widget that just replicates the app icon.
- [SHOULD] One simple idea tied to the app's main purpose.
- [SHOULD] Dynamic content that changes during the day. Static widgets get removed.
- [SHOULD] Multiple sizes only when each adds value. Do not stretch small content to fill large. One great size beats all sizes.
- [SHOULD] Balance density: not sparse, not dense. Too dense: go bigger or swap text for graphics.
- [SHOULD] Brand subtly. A logo is rarely needed; if multi-source, a small logo top-right.
- [SHOULD] Do not mirror the widget's look inside the app.
- [SHOULD] Signed-out state says what signing in unlocks ("Sign in to view reservations").
- [CONSIDER] Surprise and delight on meaningful occasions (birthdays).
**Checks (updates)**:
- [SHOULD] Choose update cadence from data volatility vs viewing frequency. If people look more often than you can update, show "last updated".
- [SHOULD] Use system date/time text that refreshes itself, to save update budget. Do not hide stale data behind placeholders.
- [SHOULD] Animate updates, up to 2s.
**Checks (interaction)**:
- [SHOULD] Simple actions only (Reminders' checkbox toggles). No app-like layouts. Targets big enough for confident taps. Inline accessory = 1 target.
- [SHOULD] Taps deep-link to the exact relevant screen.
**Checks (layout, text, color)**:
- [SHOULD] Standard margin 16pt; tighter 11pt for grouped graphics or buttons; smaller on Mac desktop and Lock Screen.
- [SHOULD] Content corners concentric via ContainerRelativeShape (no hard-coded radius).
- [SHOULD] System font, text styles, SF Symbols. Custom font sparingly (big numerals custom, small text SF Pro). Text at least 11pt.
- [SHOULD] Avoid rasterizing text. Dynamic Type Large to AX5.
- [SHOULD] Meaning never by color alone.
- [SHOULD] Full-color images judiciously in tinted or clear modes (reserve for media like album art, smaller than the widget).
- [SHOULD] Full-color: light background in light, dark in dark; semantic colors. Accented: deliberately assign widgetAccentable groups. Vibrant: full-opacity content, white or light gray for primary, darker grays for secondary, opaque grays rather than white-with-opacity.
**Checks (gallery; description copy see references/writing.md)**:
- [SHOULD] Realistic preview (simulated data if real data is slow).
- [SHOULD] Placeholder = static chrome plus semi-opaque shapes (varied-width bars for text lines).
- [SHOULD] Description starts with a verb ("See the current weather..."). Never "This widget shows...". Sentence case. One description per widget group, sizes grouped.
- [CONSIDER] Brand-tint the Add button.
- **Platform deltas**: iOS/iPadOS Lock Screen widgets provide info, not a launcher; support Always-On reduced luminance. Real-time needs a Live Activity instead. StandBy/CarPlay: small widget, background removed and scaled; mark the background removable; rely on large text, not rich images or color; red tint at night.
- **Key dimensions (iOS, pt)**: 430x932 screen: small 170, medium 364x170, large 364x382, circular 76, rectangular 172x76, inline 257x26. 393x852: small 158, medium 338x158, large 338x354, circular 72, rectangular 160x72, inline 234x26. iPad 1024x1366 device: small 160, medium 356x160, large 356, XL 748x356.
- **Web (our translation)**: for dashboard cards, one purpose per card, freshness timestamps, skeletons shaped like real content, a whole-card link to the exact detail, 1 to 2 inline actions at most, nothing stretched just to fill a grid cell.
- **Slop tells (ours)**: a widget that is a logo plus "Open App"; the same 3 stats stretched across small, medium and large; gradient-backed widgets that turn gray in tinted mode; spinners or placeholder shimmer instead of last-known data; a "This widget shows your..." description; meaning carried by red/green only; a 6-button mini-app grid.

## Live Activities
- **Intent**: Track a bounded task or event (up to 8 hours) with frequent updates across Lock Screen, Dynamic Island, StandBy, Mac menu bar and CarPlay.
- **Required presentations**: compact (leading plus trailing around the TrueDepth camera, when only one is active), minimal (multiple active; up to 3, attached or detached circle or oval), expanded (touch and hold), Lock Screen (banner; also briefly over the Home Screen on non-Island devices). StandBy = minimal, tap, then Lock Screen layout at 2x. Presentations or modes not seen go to Unverified.
**Checks (scope and content)**:
- [SHOULD] Defined start and end, short to medium duration.
- [MUST] No ads or promos.
- [SHOULD] Only what is needed at a glance; deep detail lives in the app.
- [SHOULD] Sensitive info becomes an innocuous summary or redaction, user-configurable.
- [SHOULD] Match app personality in light and dark. Logo mark without a container;
- [MUST] Do not use the entire app icon.
- [MUST] Do not add in-app elements that draw attention to the Dynamic Island.
- [SHOULD] Text medium weight or heavier; small text rarely.
**Checks (layout)**:
- [SHOULD] Limited-width (Island in landscape): compact and minimal fit a 28pt-diameter circle; abbreviate or use a graphic; may show leading only (system hides trailing).
- [SHOULD] Concentric margins; ContainerRelativeShape for corner elements; separate blocks with an inset container or a thick line; never draw to the Island edge.
- [SHOULD] Height adapts to available info (rideshare grows when the driver is assigned).
- [SHOULD] Compact: leading and trailing read as one unit (same color and type); hug the camera with no padding next to it; balanced widths (shorten units); both sides deep-link to the same screen.
- [SHOULD] Minimal: live data over a static logo (Timer shows remaining time).
- [SHOULD] Expanded: keep the relative placement from compact; wrap tightly around the camera.
- [MUST] Lock Screen: do not replicate notification layouts.
- [SHOULD] Lock Screen: custom background or tint sparingly (personalized wallpapers); verify Dark Mode and Always-On reduced luminance; check the auto-generated dismiss-button color; 14pt standard margin.
- [SHOULD] StandBy: custom layout for the extra space; prefer the default background (blends with the bezel, scales larger); standard margins; verify Night Mode red tint contrast.
**Checks (color and motion)**:
- Compact, minimal and expanded backgrounds are fixed black; only the Lock Screen background is customizable (check contrast on Always-On).
- [CONSIDER] Bold brand colors for text and objects. Tint the Dark Mode key line to match.
- [SHOULD] Animations up to 2s; none on Always-On reduced luminance. Use numeric content transitions for scores; animate existing elements to new positions rather than removing and re-adding them; avoid overlap (fade the non-moving list items).
**Checks (interaction and lifecycle)**:
- [SHOULD] Tap opens the exact related screen.
- [SHOULD] Interactivity only for essential, directly related toggles (playback, workout, recording). Prefer a single control.
- [CONSIDER] Respond-to-update actions (contact driver).
- [SHOULD] Start at expected moments (order placed, match starts). Provide an in-app off switch next to the related content, otherwise people kill all Live Activities in Settings.
- [CONSIDER] App Shortcut to start it (Action button).
- [SHOULD] Update only on real change. Alert (lights screen plus sound) only for essential updates.
- [SHOULD] Do not also push a notification for the same update (wording unverified).
- [SHOULD] One Live Activity that rotates through multiple events, not many separate ones.
- [MUST] End immediately when the event ends. After ending it stays up to 4h on Lock Screen and Mac, so set a custom dismissal of about 15 to 30 min (rideshare: 30 min for receipt and tip).
- **Platform deltas**: Start with the iPhone design, then refine. CarPlay: compact merged; interactive elements disabled; custom `ActivityFamily.small`; sizes 240x78 / 240x100 / 170x78. Mac menu bar: click opens iPhone Mirroring. iOS dims: 430x932 gives compact 62.33x36.67, minimal 36.67 to 45 x 36.67, expanded and Lock Screen 408 x 84 to 160; 393x852 gives 52.33 compact, 371 x 84 to 160. iPad Lock Screen 500 or 425 x 84 to 160.
- **Web (our translation)**: persistent in-page status chip or toast for an ongoing order or job: one compact line, live data rather than a logo, removed shortly after completion, plus an "unfollow" control. Never pair it with duplicate push or email for the same tick.
- **Slop tells (ours)**: the app icon in a rounded container in the Island; a Lock Screen layout that looks like a notification (icon, title, body); padding gap next to the camera; leading and trailing in mismatched styles; 3 buttons; promo copy; activity lingering 4h after delivery; a ping on every minor status change.

## Notifications
- **Intent**: Timely, high-value, glanceable info. Requires consent.
**Checks**:
- [SHOULD] Concise. One notification per thing. No re-nagging if ignored.
- [SHOULD] Do not instruct people to go do tasks in the app; offer actions or nothing.
- [SHOULD] Errors use an alert, not a notification.
- [SHOULD] Foreground: no banner. Insert data quietly or bump the badge (Mail adds to the list).
- [SHOULD] Avoid sensitive, personal or confidential data in a notification.
- [SHOULD] Title only if it adds context (headline, event, subject); if only generic ("New Document"), omit it and let the app name show; title case, no punctuation. Body: full sentences, sentence case, do not pre-truncate. (Copy: references/writing.md.)
- [SHOULD] Provide a hidden-preview placeholder body ("New comment", "Shipment").
- [SHOULD] No app name or icon in content (the system adds them).
- [CONSIDER] Short, distinctive custom sound; never rely on sound for meaning.
- [SHOULD] Actions: up to 4; title-case short labels describing the result; no app name; no action that just opens the app; prefer nondestructive; an SF Symbol per action (shown trailing).
- [MUST] Badges: do not use for anything but the unread notification count (not weather, scores, dates).
- [SHOULD] Badge is not the only channel for essential info; update immediately on read (badge 0 clears Notification Center); avoid custom UI that mimics a badge.
- **Web (our translation)**: web push only after a contextual opt-in (never on load); dedupe; in-tab updates go inline, not via a toast plus push; an unread-count badge only for unread items.
- **Slop tells (ours)**: "Don't forget to check out our new features!"; "MyApp: You have a new message from MyApp"; an "Open" action button; red dot badges on nav items for non-notification "new" features; reminder spam every 4h.

## Controls
- **Intent**: Control Center, Lock Screen and Action button (iOS, iPadOS, macOS). Button (action, deep link, locked-camera launch) or toggle (two states). Anatomy: symbol, title, optional value. Lock Screen shows the symbol only.
**Checks**:
- [SHOULD] Actions most useful without launching the app (start a Live Activity); reflect state immediately, including in-progress.
- [SHOULD] The symbol carries the meaning alone, with distinct on and off symbols (`door.garage.open` / `.closed`).
- [SHOULD] Animate toggle transitions; animate indefinitely during long actions.
- [SHOULD] Brand tint (applied to the on state and Island); prompt for configuration on add; Action-button hint text written as a verb; placeholder title or value if situational; redact on lock (symbol shown in off state).
- [SHOULD] Require auth for security-affecting actions (locks, car).
- [SHOULD] Locked camera (iOS 18+): same camera UI as the app; explain how to add the control.
- **Slop tells (ours)**: one generic glyph for both states; an app logo as the control symbol.

## App Shortcuts
- **Intent**: Expose key tasks to Siri, Spotlight, Shortcuts, Action button and Pencil squeeze; available immediately after install; max 10 per app.
**Checks**:
- [CONSIDER] App schemas (Apple Intelligence) for common domains first; shortcuts for unique features.
- [SHOULD] Most common tasks; at most 1 optional parameter with predictable values; ask a follow-up for missing info with a smart default (last used, time of day).
- [SHOULD] Phrases short and speakable, containing the app name; all critical info in full dialogue for audio-only devices; surface via in-app tips (SiriTipUIView); order by importance (Spotlight and Shortcuts order).
- [SHOULD] Copy: "App Shortcuts" / "Shortcuts" in title case and plural; a generic "shortcut" lowercase.
- **Platform deltas**: not on macOS (intents are supported).

## Snippets
- **Intent**: Compact view showing a Siri or App Shortcut result, or asking for confirmation.
**Checks**:
- [SHOULD] contrast against the system background in light and dark; consistent margins; max height 400pt (watch Dynamic Type); deep-link for more detail; confirmation primary button gets a specific verb ("Order", not "OK" or "Proceed"; default is "Continue"); convey purpose visually, not only through dialogue text. Confirmation = Cancel plus primary; result = Done.

## Status bars
- **Intent**: iOS/iPadOS system status bar.
**Checks**:
- [SHOULD] Keep it legible over content (scroll edge effect or blur) and do not place interactive-looking controls under it.
- [CONSIDER] Hide temporarily for full-screen media.
- [SHOULD] Avoid hiding permanently; restore with a simple gesture (tap).
- **Web (our translation)**: respect `env(safe-area-inset-top)`; no tappable controls under the notch.

## Transferable principles from watch and TV surfaces
- Complications and Top Shelf follow the same glanceable-data rule as widgets: live values, not a launcher; never color-only meaning in tinted modes; static placeholders; privacy on always-on surfaces; no ads or prices on promotional surfaces.
- Watch faces: on an incompatible face, offer an alternative configuration rather than an error.
- Digit entry: secure digits for sensitive data, with a title and prompt that say why.
