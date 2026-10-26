# 04 — Patterns (behavior & flow) digest

Sources: Apple Human Interface Guidelines, developer.apple.com/design/human-interface-guidelines, snapshot 2026-10-23 (the Patterns pages).
Paraphrased digest for review purposes. Short quotations are attributed; consult the sources for the authoritative text.

Severity key: [MUST] = Apple says must/never/always/essential/crucial; [SHOULD] = bold imperative / "avoid" / "prefer"; [CONSIDER] = "consider"/"when it makes sense". "Inference" lines are ours, not Apple's.
Scope: iOS, iPadOS, macOS (+ web translation). tvOS/visionOS/watchOS noted only when the rule carries over.
`patterns` (index page) only lists topics; it adds no guidance.

---

## Charting data (source: charting-data)
- **Intent**: Charts pull the eye, so use one only when it shows something about the data. Otherwise a sortable or searchable list/table is better.
- **Checks**:
  - [SHOULD] Each chart answers a question or highlights an insight. Raw data that people only need to look up goes in a list/table they can scroll, search, and sort.
  - [SHOULD] Keep the default chart simple. Reveal detail progressively (levels of detail, subsets, or a ladder of more interactive versions).
  - [MUST] Every chart has accessibility labels for its values and components, plus elements people can interact with. A visible headline does not replace the labels.
  - [SHOULD] Use common chart types (bar, line). A novel type has to teach itself, e.g. animate each component in turn the way Activity introduces its rings.
  - [SHOULD] Show macro (totals/averages), mid (useful subsets), and micro (callouts on specific points) views of the data.
  - [SHOULD] Add a title, subtitle, annotations, and a plain-language headline that states the takeaway ("Chance of light rain in the next hour"), not just the metric name.
  - [SHOULD] Size the chart to its job: small for a glance or preview, large when it is interactive or exploratory.
  - [SHOULD] Charts with similar purposes look alike. Change type or style only to signal a real difference.
  - [MUST] (Apple: "important") When a small chart expands to a detail view of the same data, keep the type, colors, marks, annotations, and layout (as in Health Trends).
- **Platform deltas**: Apple lists no platform-specific considerations. Web translation (inference): the same rules apply. Use SVG/ARIA (`role="img"` + `aria-label` summary, or a data table fallback) for accessibility.
- **Slop tells (inference)**: dashboard "hero" stat cards with sparklines that tell you nothing; donut charts for 2 values; a different chart style per card; gradient-filled area charts with no axis labels or takeaway text; a chart where a sorted list would serve better; a small chart that expands into a visually unrelated detail chart.

## Collaboration and sharing (source: collaboration-and-sharing)
- **Intent**: Sharing should feel like part of the system (share sheet, Messages), not a separate admin console.
- **Checks**:
  - [SHOULD] Put the Share button in a toolbar or another always-reachable spot. Use the system share sheet/popover (ShareLink).
  - [SHOULD] Describe the permission state in one short phrase ("Only invited people can edit", "Everyone can make changes"). The system turns it into the button that opens the options.
  - [SHOULD] Keep custom sharing options to a minimum (who can access, edit vs. read, can collaborators invite others) and group them so they read at a glance.
  - [SHOULD] Show the Collaboration button prominently as soon as sharing starts, next to Share. It reminds people the content is shared and shows who shares it.
  - [MUST] (Apple: "crucial") The collaboration popover holds only essential custom items. Its structure: collaborators + Messages/FaceTime / custom items / "Manage Shared File".
  - [CONSIDER] Rename "Manage Shared File" to fit your domain.
  - [CONSIDER] Post collaboration events (edits, joins, mentions) to Messages with a universal link that opens the exact view.
  - [SHOULD] A share flow can also "send a copy", not only invite people to collaborate.
- **Platform deltas**: iOS uses a share sheet; iPadOS 16+ and macOS 13+ use a sharing popover anchored to the button. Not on tvOS. Web translation (inference): use `navigator.share` on mobile web, and an anchored popover (not a full-page modal) on desktop. Keep a persistent "shared with N people" avatar chip next to Share, and make deep links in notifications land on the exact object.
- **Slop tells (inference)**: a "Share" modal with 8 permission toggles and role dropdowns; no indicator that a doc is shared once the modal closes; email-invite-only sharing with no copy-link option; vague permission text ("Viewer access").

## Drag and drop (source: drag-and-drop)
- **Intent**: People try drag everywhere. Clear, continuous feedback keeps them in control of a gesture that can have several outcomes.
- **Checks**:
  - [SHOULD] Support drag and drop wherever content can move (list reorder, file in, image out, text). Do not limit it to one "drop zone".
  - [MUST] (Apple: "important") Every drag action also has a non-drag path (menu command: copy/move to, plus accessibility drag descriptors).
  - [SHOULD] Same container = move. Different container = copy. Between apps = always copy. Deviate only toward less data loss.
  - [SHOULD] Support dragging several items at once. On iPadOS, people can add items mid-drag (flocking).
  - [SHOULD] Dropping can be undone. A drop that cannot be undone asks for confirmation first (as Finder does for a write-only folder) or offers a reversal afterward (Photos lets you cancel sharing).
  - [CONSIDER] The source provides several representations, highest fidelity first (native object → PDF → PNG → JPEG). The destination takes the richest one it understands.
  - [CONSIDER] Spring loading: dragging over a tab or segmented control activates it (Calendar's day/week/month).
  - [MUST] (Apple: "crucial") Show a translucent drag image once the pointer moves **about 3 points**, and keep it until the drop.
  - [SHOULD] The drag image can preview the result (expands to the inserted size) but must not flicker or change radically.
  - [SHOULD] Highlight a destination only while the item hovers over it and only if it accepts the item. Otherwise show nothing or `circle.slash`. With several candidate targets, cue one at a time.
  - [SHOULD] A failed or invalid drop animates the item back to its source, or scales up and fades out.
  - [SHOULD] Auto-scroll long scrolling destinations, and stop once the drag leaves the container.
  - [SHOULD] Take only the relevant part of a drop (a contact dropped on a To field becomes name + email only).
  - [SHOULD] Holding Option at drop time forces a copy within the same container. Check the modifier at drop time, not at drag start.
  - [SHOULD] Slow transfers show progress plus a placeholder at the drop location. A drop that starts a task (e.g. Print) confirms the task began and shows its progress.
  - [SHOULD] Dropped text keeps its styles if the destination supports them. Otherwise it takes the destination's style.
  - [SHOULD] After a drop, the content stays selected at the destination and is deselected at the source.
- **Platform deltas**: iOS/iPadOS: touch, pointer, and full keyboard access. iPadOS supports several simultaneous drags. macOS: drag into Finder in a format the app can reopen (.ics, clippings). Dragging a background selection from an inactive window must not activate that window or clear its selection. Show a count badge for multi-item drags and update it when only some items are accepted. Use the copy/link/disappearing/not-allowed pointers. Selecting and dragging is one motion. Universal Control works across Mac and iPad. Web translation (inference): HTML5 DnD/pointer events with `dropEffect` to set the cursor, a keyboard-operable reorder (e.g., "Move up/down" menu items or space-to-grab), `aria-live` announcements, a translucent drag preview, and snap-back on an invalid drop.
- **Slop tells (inference)**: a dashed "Drag files here" box that is the only upload path, with no click-to-browse; drag-to-reorder lists with no keyboard alternative; drop targets that light up the moment any drag starts; the dragged item vanishes on an invalid drop; no undo after reordering; selection lost after the drop.

## Entering data (source: entering-data)
- **Intent**: Ask for as little as possible. Make what you do ask for hard to get wrong.
- **Checks**:
  - [MUST] ("Don't") Do not ask for anything you can get from the system or through a permission (location, calendar, settings).
  - [SHOULD] Say what format is expected: a placeholder such as "username@company.com" or a label such as "Email". Prefill sensible defaults.
  - [SHOULD] Sensitive fields use secure entry.
  - [MUST] Never prefill a password field. Use biometrics or keychain/passkeys instead.
  - [SHOULD] Offer choices (picker, menu) instead of free text where possible, even when a keyboard is present.
  - [SHOULD] Accept pasted and dropped data in fields.
  - [SHOULD] Validate each field as it is filled in and give immediate feedback. Do not save all errors for submit. Numeric fields use formatters (decimals, %, currency).
  - [SHOULD] Make required data obvious. Enable Next/Continue only once required fields are valid.
- **Platform deltas**: macOS: an expansion tooltip shows the full value of a truncated field on hover (this also applies to iOS apps running on Mac). Web translation (inference): `autocomplete` attributes, the right `inputmode` and `type`, `<select>`/radios over free text, inline validation on blur, a disabled primary button with a clear reason, and `title` or tooltip text for truncated values. Whether to disable the CTA or validate on submit is a known accessibility debate; see open questions.
- **Slop tells (inference)**: signup forms asking for country/timezone the browser already knows; every field marked "*"; errors shown only after submit as a red toast at the top; free-text "State" fields; placeholder-only labels that disappear while typing; password fields that block paste.

## Feedback (source: feedback)
- **Intent**: How loud the feedback is should match how much the information matters. Status is passive; irreversible loss interrupts.
- **Checks**:
  - [MUST] Feedback is accessible through more than one channel (color + text + sound + haptics), so it works when muted, when the user looks away, and with VoiceOver.
  - [CONSIDER] Show status inline near the thing it describes (Mail puts "Updated just now · 3 unread" in the toolbar) instead of in a banner or modal.
  - [SHOULD] Alerts are for critical, ideally actionable information only. Overuse kills their impact.
  - [SHOULD] Warn only before data loss that is **unexpected and irreversible**. Do not warn when loss is the expected result (Finder does not confirm Move to Trash).
  - [SHOULD] Confirm success only for significant actions (a payment). People expect success, so they need to hear about failure.
  - [SHOULD] When a command cannot run, say why in domain terms (Maps: "can't route from and to the same location"), not with a generic error.
- **Platform deltas**: watchOS: avoid indeterminate spinners and promise a notification instead. The other platforms have no extra deltas. Web translation (inference): inline status text and `aria-live="polite"` beats toasts. Reserve `role="alertdialog"` for destructive or irreversible actions.
- **Slop tells (inference)**: a "Success!" toast on every save or toggle; "Are you sure?" on routine deletes that undo could cover; "Something went wrong" with no cause or fix; color-only red/green status dots; a toast library used as the only feedback channel.

## File management (source: file-management)
- **Intent**: People's documents should feel like real files that are always safe, in a file system they already understand.
- **Checks**:
  - [SHOULD] New/Open live in menus with standard shortcuts (iPadOS Command-hold overlay; macOS File menu). There is always a visible Add (+) button as well.
  - [SHOULD] A custom file browser can open at the most relevant spot (Documents, iCloud, last-used location) but must let people navigate the whole file system.
  - [SHOULD] Autosave periodically and when the file closes or the user switches apps. Do not make Save an explicit chore.
  - [SHOULD] Hide file extensions by default, let people show them, and reflect the choice in every open/save UI.
  - [SHOULD] Use Quick Look to preview files the app cannot open. Ship a Quick Look generator for custom file types so Finder, Files, and Spotlight can preview them.
  - [SHOULD] macOS: use the default open/save panels unless there is a strong reason not to. Offer Open Recent and filters, and allow multi-select. Rename the Open button to the task ("Insert").
  - [SHOULD] macOS: a save UI lets people set name, format, and location. New documents start as "Untitled". The panel defaults to a logical location. An accessory view can hold task options (Mail: "Include attachments").
  - [MUST] macOS with autosave OFF: show unsaved state (a dot in the close button and in the Window menu) and prompt to save on close, quit, logout, or restart. With autosave ON, do NOT show the dot. An "Edited" title suffix is fine but clears after save or autosave.
  - [SHOULD] Document launcher (iOS/iPadOS 18): primary button = create new; secondary = alternate (e.g. Choose a Template). The background stays clearly separate from the title card and accessories. Animations are sparse and gentle ("breathe or sway"). Test across sizes and orientations.
  - [SHOULD] File provider extension: list only file types relevant to the context, let people pick a destination when exporting or moving, and add no second top toolbar.
  - [CONSIDER] macOS Finder Sync: sync badges, context-menu items, a toolbar sync button.
- **Platform deltas**: iOS/iPadOS: Files app, document launcher, file provider. macOS: Finder, panels, close-button dot, Finder Sync. Web translation (inference): autosave with a quiet "Saved" or timestamp indicator, never a Save button as the only way to keep work; a `beforeunload` guard only when there really are unsaved changes; recent files first; the File System Access API or download/upload with sensible default names.
- **Slop tells (inference)**: a big blue "Save" button in an editor that could autosave; a "You have unsaved changes" modal in an app that autosaves; "Untitled-1 (copy) (2)"-style names; a custom file browser that traps people in an app-only folder; a launcher with a busy hero illustration competing with the CTA.

## Going full screen (source: going-full-screen)
- **Intent**: Full screen removes distractions for focused or immersive work. It must never take control away from the user.
- **Checks**:
  - [SHOULD] Offer full screen for games, media, slideshows, and deep-focus tasks.
  - [SHOULD] In full screen, adjust proportions subtly, keep the same set of items, and never resize the window programmatically.
  - [SHOULD] Essential controls stay available or are easy to reveal (playback controls).
  - [SHOULD] Except in games, the Dock stays reachable (iPadOS/macOS).
  - [SHOULD] When the user switches away, pause and resume in place (games, slideshows).
  - [SHOULD] The user decides when to exit. Do not exit automatically when content ends.
  - [SHOULD] Hidden chrome comes back with a familiar action (tap, swipe down, pointer to the top edge). Controls needed for navigation never hide.
  - [MUST] (Apple: "Always") macOS: the user decides when to enter: green button, View menu, **Control-Command-F**. No custom window-mode menu (a game toggle is fine).
  - [SHOULD] macOS: use the system full screen, which handles the camera housing. Games do not change the display mode.
  - [CONSIDER] iOS/iPadOS: keep the default single swipe on the auto-hiding Home indicator. Defer to two swipes only if accidental exits actually happen.
- **Platform deltas**: listed in the checks. Web translation (inference): the Fullscreen API only after a user gesture, Esc always exits, F or a visible button to enter, autohidden controls that return on mouse move or tap, and no `requestFullscreen` on page load.
- **Slop tells (inference)**: auto-entering full screen on video play or on load; immersive reading modes with no way back to the chrome; exiting full screen when a video ends; "focus mode" that hides the only navigation.

## Launching (source: launching)
- **Intent**: Launch should feel instant and land where the user left off. Branding belongs elsewhere.
- **Checks**:
  - [SHOULD] Launch instantly. People may not wait "more than a couple of seconds".
  - [SHOULD] iOS/iPadOS/tvOS launch screen is nearly identical to the first screen, with no flash. If the first screen starts as a solid color, the launch screen is that solid color only. It matches current orientation and light/dark mode.
  - [SHOULD] No text on the launch screen (it cannot be localized). No logos or branding unless they are fixed parts of the first screen. It must not look like a splash or About window.
  - [CONSIDER] A splash screen (brand graphic) belongs at the start of onboarding, or right after launch if there is no onboarding, never in the launch screen.
  - [SHOULD] Restore previous state in detail: scroll position, window positions and states, navigation depth.
  - [SHOULD] iOS/iPadOS: launch in the device's current orientation. A landscape-only app handles both left and right landscape.
- **Platform deltas**: macOS/visionOS/watchOS have no launch screen. macOS restores windows. Web translation (inference): the app shell renders immediately with the skeleton matching the real layout; no full-screen logo loader; restore route, scroll, and open panels (URL state + storage); `prefers-color-scheme` honored on the first paint to avoid a white flash.
- **Slop tells (inference)**: a centered logo on a brand-gradient "splash" with a spinner on every cold load; animated Lottie intro; a dark-mode user getting a white flash; always opening on Home instead of the last context.

## Live-viewing apps (source: live-viewing-apps)
- **Intent**: Shorten the time from app start to live content. Make live content visibly different from on-demand.
- **Checks**:
  - [SHOULD] Live content goes in the first tab: one tap or zero to playback. A "Watch Now" button disappears on tap and goes straight to full screen.
  - [SHOULD] Mark live items (badge, symbol, sash, "Live" row). Optionally show progress through the in-progress program.
  - [SHOULD] Playback is always the primary action. Secondary actions keep the same order everywhere (Watch, Start Over, Record, Favorite). Show when the content airs again.
  - [CONSIDER] A content footer for browsing during playback: darkened backing, the current item badged, categories that match the EPG, symmetric invoke/dismiss (swipe up/down).
  - [MUST] (Apple: "essential") Give instant visual feedback on channel change. It confirms the switch and hides buffering.
  - [SHOULD] Audio continues while browsing within the live context and stops when the user leaves the live tab.
  - [SHOULD] EPG: current program, channel, and time are obvious on open with a quick return to playback; paging and jumping are easy; Favorites/My Channels; familiar categories; browsing keeps content playing (PiP or background).
  - [SHOULD] Cloud DVR: record from the info panel; future recording from a detail view (one episode / series / new only / team-specific); play and delete in the DVR area; auto storage management (overwrite the oldest or already-watched).
- **Platform deltas**: Apple lists none (tvOS-centric, applies everywhere). tvOS can auto-start playback after a few idle seconds (from Launching). Web translation (inference): a LIVE pill plus a "behind live" indicator, keep playing in a mini-player while browsing, consistent action order across cards.
- **Slop tells (inference)**: Netflix-clone home pages where live and VOD tiles look identical; detail page → play button → pre-roll interstitial; a red "LIVE" badge on everything.

## Loading (source: loading)
- **Intent**: Ideally loading is done before people notice it is happening. An empty screen looks broken.
- **Checks**:
  - [SHOULD] Show something right away: placeholder text, graphics, or animation, replaced as content arrives.
  - [SHOULD] Let people keep using other parts of the app while content loads in the background.
  - [SHOULD] For unavoidably long loads, show something worth looking at (tips, hints, new features), sized to the real remaining time so it does not run short or repeat.
  - [SHOULD] Download large assets in the background (Background Assets), at install, update, or idle times.
  - [SHOULD] If a load takes "more than a moment or two", use system progress indicators: **determinate when duration is known, indeterminate only when not**.
  - [CONSIDER] Games: a custom, on-brand loading view.
- **Platform deltas**: watchOS: avoid indicators but prefer one over a blank screen for 1–2 s. Video (from playing-video): if a load exceeds **2 seconds**, use a black screen with a centered spinner, nothing else. Web translation (inference): skeletons shaped like the real content, optimistic UI, a determinate bar for uploads/exports, `aria-busy`, no full-page blocking spinner when only one region is loading.
- **Slop tells (inference)**: a centered spinner over a blank page for every fetch; an indeterminate spinner for an upload whose size is known; generic gray shimmer bars that do not match the final layout (layout shift); the whole app blocked while a sidebar loads.

## Managing accounts (source: managing-accounts)
- **Intent**: An account is a barrier. Require one only when core functionality needs it, as late as possible, with the least friction possible. Deleting it must be as easy as creating it.
- **Checks**:
  - [SHOULD] Require an account only if core functionality needs one. Otherwise the full app works without it.
  - [SHOULD] The sign-in view briefly and warmly explains why an account is needed and what it gives the user.
  - [SHOULD] Delay sign-in as long as possible (browse freely; sign in at purchase).
  - [SHOULD] Prefer Sign in with Apple, then passkeys. If passwords stay, require 2FA.
  - [MUST] (Apple: "Always") Name the auth method on the button: "Sign In with Face ID", not "Sign In".
  - [SHOULD] Only mention auth methods the device has (no Face ID copy on a Touch ID device).
  - [SHOULD] No in-app "Enable Face ID" opt-in toggle. Biometrics are a system-level choice.
  - [SHOULD] Do not say "passcode" for app auth. It implies reusing the device passcode.
  - [MUST] If the app lets people create an account, it lets them **delete** it (not just deactivate), from within the app or through a direct, easy-to-find web link (not buried in Privacy Policy or Terms).
  - [SHOULD] In-app and web deletion flows are equally short.
  - [CONSIDER] Scheduled deletion (use up remaining service) alongside immediate deletion.
  - [MUST] (Apple: "essential") Say when deletion will finish and notify people when it is done.
  - [SHOULD] Explain that billing for an auto-renewable subscription continues through Apple until the user cancels, even after deleting the account. Link to manage or cancel. If law requires keeping some data, say what and why.
  - [MUST] Never tell people to sign out of a TV provider through privacy controls. Avoid an in-app sign-out when signed in at system level.
- **Platform deltas**: tvOS: authenticate on another device and avoid asking a shared account to pick a profile every time. watchOS: Keychain via iCloud. Web translation (inference): guest checkout or browsing; WebAuthn passkeys; button labels that name the method ("Continue with passkey"); a self-serve "Delete account" in account settings with a stated completion date.
- **Slop tells (inference)**: a full-screen login wall on first load of an app that could be browsed; "Sign up free" with 6 fields; a generic "Sign In" button above three OAuth buttons; "Contact support to delete your account"; an in-app "Use Face ID" toggle in Settings.

## Managing notifications (source: managing-notifications)
- **Intent**: Notifications cost trust. Set urgency honestly or people turn off everything.
- **Checks**:
  - [MUST] Get permission before sending any notification.
  - [MUST] Give each non-communication notification an honest interruption level: Passive (read later), Active (default), Time Sensitive (affects the user now), Critical (health/safety; needs an entitlement).
  - Behavior matrix: Passive/Active neither override scheduled summary nor break Focus. Time Sensitive does both but **not** the Ring/Silent switch. Critical does all three.
  - [SHOULD] Time Sensitive only for events happening now or **within an hour**. The system will ask the user whether it is earning that level.
  - [MUST] No marketing or promotional notifications without explicit opt-in, through a UI that describes the content types and offers clear opt-in/out.
  - [MUST] Never send marketing as Time Sensitive.
  - [MUST] An in-app settings screen lets people change their notification choices (informational and marketing).
  - [SHOULD] Direct communications (calls, messages) use communication notifications (SiriKit intents) so people can manage them per sender.
  - From multitasking: [SHOULD] notify on completion of an important user-started task done in the background; do not notify for routine or secondary tasks.
- **Platform deltas**: watchOS inherits iPhone settings and has swipe actions (Mute 1 Hour, Turn off Time Sensitive). macOS notification sounds mix with other audio. Web translation (inference): ask for Push permission only after a user action that shows the value (never on page load); an in-app notification-preferences page with per-category toggles; marketing off by default.
- **Slop tells (inference)**: the browser "Allow notifications?" prompt on first page view; "We miss you!" re-engagement pushes; every push treated as urgent; no in-app notification settings, only "go to system settings".

## Modality (source: modality)
- **Intent**: A modal takes people out of their context and needs an explicit dismiss. Use it only when focus or a consequential choice justifies that cost.
- **Checks**:
  - [SHOULD] Present modally only when there is a clear benefit: critical info, confirming or modifying the last action, a narrowly scoped task, or immersive or complex focus.
  - [SHOULD] Modal tasks are simple, short, and streamlined.
  - [SHOULD] No "app within an app". If subviews are unavoidable, there is one linear path, and no button looks like the dismiss button.
  - [CONSIDER] Use a full-screen modal for in-depth media or a multistep editor (markup, photo edit).
  - [MUST] (Apple: "Always") The dismiss is obvious and follows platform convention: iOS/iPadOS top toolbar button + swipe down; macOS/tvOS button in the content area.
  - [SHOULD] If dismissing (by gesture or button) would lose user content, explain and offer a resolution (iOS: an action sheet with Save).
  - [SHOULD] The title names the task, plus a short guidance line if needed.
  - [SHOULD] Dismiss one modal before presenting another. No stacked modals. Never more than one alert at a time (an alert may sit above a modal).
- **Platform deltas**: iOS/iPadOS/macOS use sheets and popovers. iPadOS/macOS/visionOS can use a separate window instead. Web translation (inference): `<dialog>` with focus trap and return; Esc + an X/Cancel in the header; a dirty-state confirm only when there is unsaved input; no dialog-from-dialog; use a route or page, not a modal, for anything with navigation.
- **Slop tells (inference)**: modal for every create/edit form, including 15-field ones with tabs; a confirm dialog launched from inside a modal; tapping the backdrop silently discards a half-filled form; a "Close" and a "Cancel" and an X all in one modal; untitled modals.

## Multitasking (source: multitasking)
- **Intent**: People can leave at any moment, so the app must always be ready to save, pause, and restore context.
- **Checks**:
  - [SHOULD] Pause attention-dependent activity (games, media) when the user switches away, and resume exactly in place.
  - [SHOULD] Audio interruptions: pause indefinitely for primary interruptions (music, podcasts); duck or pause and then resume for short ones (navigation prompts).
  - [SHOULD] Finish user-started tasks that need no input (download, export) in the background.
  - [SHOULD] Notifications sparingly: only for important completions.
  - [MUST] (Apple: "every app needs to work well with multitasking") Rare exceptions only (some games).
  - [SHOULD] iPadOS: adapt gracefully to any window size. Windowed mode is resizable like macOS. The app is never told which configuration the user chose.
  - [SHOULD] macOS and visionOS: video started in one window keeps playing when focus moves elsewhere. Do not pause on blur.
- **Platform deltas**: iOS = PiP/FaceTime overlay. iPadOS = full-screen or windowed, multiple windows per app, PiP. macOS = multitasking by default, window states. Web translation (inference): treat `visibilitychange` like app switching (pause games/autoplay, keep background downloads and exports going); fully responsive layout down to narrow split widths; multi-tab safe (sync state, no "open in one tab only" error).
- **Slop tells (inference)**: layouts that break below 1024px "desktop-only" widths; losing form state on tab switch or refresh; a "Your session is open in another tab" blocker; an export that dies when the user navigates away.

## Offering help (source: offering-help)
- **Intent**: Help should be contextual, small, and easy to skip. Do not explain standard UI.
- **Checks**:
  - [SHOULD] Match the help format to the task: an inline view for 1–2-step tasks, a tutorial for complex goals. It relates to what the user is doing now and is easy to dismiss.
  - [SHOULD] Wording and images match the platform and input device ("tap" on iPhone, "click" on Mac; Siri Remote art, not a controller).
  - [SHOULD] Do not explain how standard components work. Explain what they do in your app. Teach a unique control or input with animation or graphics, not paragraphs.
  - Tips (TipKit):
    - [SHOULD] A popover tip keeps the flow; an inline tip keeps surroundings visible. Annotation-style tips point at UI; hint-style tips are not tied to an element.
    - [SHOULD] Tips are for simple features only: **more than 3 actions = too complex for a tip**.
    - [SHOULD] **1–2 sentences**, action-oriented, no promotion and nothing about other flows.
    - [SHOULD] Use eligibility rules (do not show a tip for a feature already used). Space multiple tips out, e.g. **once every 24 hours**.
    - [CONSIDER] Include the feature's symbol (filled variant). Do not repeat the symbol if the tip points at it.
    - [CONSIDER] A button in a tip can link to the relevant settings or a setup flow.
  - Tooltips (macOS/visionOS):
    - [SHOULD] Describe only the hovered control. Start with a verb ("Restore default settings"). Do not repeat the control name.
    - [SHOULD] Max **60–75 characters** (plan for localization growth). Fragments are fine; drop articles. If it needs more, simplify the UI.
    - [SHOULD] Sentence case, no ending punctuation unless the app's style requires it.
    - [CONSIDER] State-specific tooltip text.
- **Platform deltas**: tooltips on macOS, including iPhone/iPad apps running on Mac. Web translation (inference): native `title` or an accessible tooltip on icon-only buttons; a dismissible inline hint card that stays dismissed and is gated on feature-not-used; no coach-mark tour.
- **Slop tells (inference)**: a 6-step "product tour" coach-mark overlay on first login; "?" icons everywhere opening paragraphs; tooltips that repeat the label ("Settings: Opens settings"); tips that upsell Pro; showing all tips at once on day one.

## Onboarding (source: onboarding)
- **Intent**: Ideally the app teaches itself by being used. If onboarding exists, it is fast, fun, optional, and comes after launch.
- **Checks**:
  - [SHOULD] Teach through interaction: let people safely try the real action instead of reading slides.
  - [CONSIDER] Prefer context-specific tips near the relevant UI over one upfront flow.
  - [SHOULD] If a prerequisite flow is required: brief, enjoyable, nothing to memorize.
  - [CONSIDER] Tutorials are optional and skippable. Once skipped, never re-shown automatically, and still easy to find later (Help/Account/Settings).
  - [SHOULD] Teach the app, not the OS or device.
  - [SHOULD] A splash, if any, shows only long enough to absorb at a glance.
  - [SHOULD] Large downloads do not block onboarding. Bundle enough to start.
  - [SHOULD] No licensing or legal text in onboarding (the App Store shows it). If it is unavoidable, integrate it lightly.
  - [SHOULD] Postpone nonessential setup and customization. Ship good defaults.
  - [CONSIDER] Ask for a permission during onboarding only if the app cannot work without it. Otherwise ask at first use of the feature that needs it.
  - [SHOULD] No rating or purchase prompts before people have engaged.
- **Platform deltas**: Apple lists none. Web translation (inference): land on a usable product with sample or empty-state content that teaches; progressive "first-run" hints; no multi-step "tell us about yourself" wizard before value; permission prompts (camera, location, notifications) at the moment of use.
- **Slop tells (inference)**: the 3-screen swipeable illustration carousel ("Welcome to X / Track everything / Get started") with page dots; a "Tell us about your role / team size / goals" questionnaire before the product; asking for notifications, location, and contacts back to back on first launch; a ToS checkbox screen; a tour replayed on every login.

## Playing audio (source: playing-audio)
- **Intent**: Audio must follow the user's device-level intent (silent, volume, route) and treat other apps' audio politely.
- **Checks**:
  - [SHOULD] In silent mode, play only audio the user explicitly started (media, alarms, calls). Mute UI clicks, effects, and game soundtracks.
  - [SHOULD] System volume governs all output. Mix relative levels internally but never change overall volume.
  - [SHOULD] Headphones connected: reroute seamlessly. Disconnected: **pause immediately**.
  - [SHOULD] Allow rerouting (AirPlay/Bluetooth). Use the system volume view (slider + route picker).
  - [SHOULD] Pick the right audio session category (Solo ambient / Ambient / Playback / Record / Play and record). Do not stop other apps' music unless you must.
  - [SHOULD] Respond to remote and headphone controls only when actively playing or in a clear audio context. Never repurpose a control. Ignore unsupported ones.
  - [CONSIDER] Custom player controls only for commands the system lacks (custom skip intervals, related content).
  - [SHOULD] Notify other apps when temporary audio ends (`notifyOthersOnDeactivation`).
  - [SHOULD] Interruptions: media apps auto-resume only if the interruption is resumable; games can always resume. Never silently reactivate the mic after an interruption (privacy: the Smart Folio example).
  - [MUST] Never convey important info by sound alone.
- **Platform deltas**: iOS/iPadOS: system sound services for short sounds and vibrations. macOS: notification sounds mix by default. Web translation (inference): no autoplay with sound; respect user gesture rules; Media Session API so hardware keys and lock screen work; pause on `devicechange`/headphone removal where detectable; sound effects off by default or tied to an in-app mute.
- **Slop tells (inference)**: UI "pop" sounds on every click with no mute; a custom audio player that ignores the Space key and media keys; background music that kills the user's Spotify.

## Playing haptics (source: playing-haptics)
- **Intent**: Haptics only work if each one means one thing consistently. The best are barely noticed and missed when gone.
- **Checks**:
  - [SHOULD] Use system haptic patterns only for their documented meaning. Otherwise use a generic or custom one.
  - [MUST] (Apple: "important") Keep cause and effect consistent: never reuse a "failure" haptic for success.
  - [SHOULD] Pair haptics with matching visual and audio feedback (intensity and sharpness match the animation).
  - [SHOULD] Do not overuse. In most apps, short haptics for discrete events, not long continuous ones (especially on Apple Pencil Pro).
  - [SHOULD] Haptics are optional (a mute toggle), and the app is fully usable without them.
  - [SHOULD] Haptics must not disrupt camera, gyro, or mic use.
  - iOS generators: Notification (task outcome), Impact (physical metaphor: snap or collision), Selection (value changing). Standard toggles, sliders, and pickers already play haptics.
  - macOS Force Touch: Alignment (snap or guide, scrubber ends), Level change (pressure steps), Generic.
- **Platform deltas**: iOS has generators. macOS only with a Force Touch trackpad during drag or force click. watchOS has a named set (Notification, Up, Down, Success, Failure, Retry, Start, Stop, Click) and Digital Crown detents. Web translation (inference): `navigator.vibrate` is Android-only, so do not rely on it. Treat "haptic intent" as visual micro-feedback (snap, settle) and keep it consistent.
- **Slop tells (inference)**: vibrate on every tap; a success buzz on errors; a long rumble during loading.

## Playing video (source: playing-video)
- **Intent**: Use the system player so habits carry over. Get people to content with no barriers.
- **Checks**:
  - [SHOULD] Use the system player. A custom player mirrors its behavior closely, because near-misses frustrate.
  - [MUST] (Apple: "Always") Show video at its original aspect ratio. No baked-in letterbox or pillarbox padding, which breaks fill/fit and PiP.
  - Defaults: aspect-fill for **2:1–2.40:1**; aspect-fit for ≤2:1 (4:3, 16:9) and **>2.40:1**.
  - [SHOULD] Metadata (image, title, description) must not obscure playback.
  - [SHOULD] Support expected input: **Space = play/pause** on any keyboard and platform.
  - [SHOULD] Avoid mixing audio across modes (PiP, game music). Handle secondary-audio silencing.
  - TV app handoff: [SHOULD] go to black immediately → content; no splash, detail page, or intro; auto-resume **without asking**; resume from the previous end time; switch to the requested profile (or ask once if none was given).
  - Loading: [SHOULD] no loading screen if fast. If **>2 s**, a black screen with a centered spinner. Start playback once enough has buffered.
  - Exit: [SHOULD] land on the content's detail view with Resume. Prepare the exit view early in case of an immediate exit.
  - tvOS overlays: small and translucent; interactive overlays pause with **≥0.5 s** delay and are clearly dismissable.
  - visionOS: no auto-start of immersive video; scrub thumbnails **160 px** wide; inline player does not fill the window.
  - watchOS: clips **≤30 s**; H.264 High, 160 kbps ≤30 fps, 208×260 / 320×180 px, 64 kbps HE-AAC; poster images must not look like controls.
- **Platform deltas**: iOS/iPadOS/macOS have no extras beyond the above. Web translation (inference): native `<video controls>` or a player that keeps native keybindings (Space, ←/→, F, M); `object-fit` respects intrinsic ratio; resume position remembered; no "Resume from 12:34?" dialog, just resume with a "Start over" affordance.
- **Slop tells (inference)**: custom glassy controls that drop keyboard shortcuts; hover-autoplay previews with sound; a "Continue watching?" dialog; a branded intro bumper before user-requested content; 16:9 frames with baked black bars.

## Printing (source: printing)
- **Intent**: Printing lives in standard places and appears only when it can work.
- **Checks**:
  - [SHOULD] Make Print discoverable: macOS File menu (+ an optional toolbar item, opt-in through customization); iOS/iPadOS toolbar → action sheet.
  - [SHOULD] When nothing is printable or no printer is available, macOS dims the menu item and iOS removes the action. Custom buttons dim or hide.
  - [SHOULD] Use the system panel for page range, copies, and duplex.
  - macOS: [CONSIDER] a custom print-panel category named after the app (Keynote: presenter notes, skipped slides); [CONSIDER] Page Setup for per-document settings without duplicating system ones; [SHOULD] make dependencies between options clear; [SHOULD] put advanced options behind a disclosure labeled "Advanced Options"; [CONSIDER] a live preview thumbnail; [CONSIDER] store print settings with the document (at least until it closes).
- **Platform deltas**: not on tvOS/watchOS. Web translation (inference): a print stylesheet (`@media print`) instead of a custom print UI; only offer "Print" where there is printable content.
- **Slop tells (inference)**: a print button in the main toolbar of an app nobody prints from; "Export to PDF" modals that rebuild the OS print dialog.

## Ratings and reviews (source: ratings-and-reviews)
- **Intent**: The best way to get ratings is a great experience. Ask at the right moment, rarely, through the system.
- **Checks**:
  - [SHOULD] Ask only after real engagement (a finished level or significant task). Never on first launch or during onboarding.
  - [SHOULD] Do not interrupt a task. Ask at natural stopping points.
  - [SHOULD] Do not pester: at least **a week or two** between requests, re-ask only after more engagement.
  - [SHOULD] Use the system prompt. The system caps it at **3 times per app per 365 days**, and users can opt out globally.
  - [CONSIDER] Weigh fresh ratings against fewer total ratings before resetting the summary on release.
- **Platform deltas**: system prompt on iOS/iPadOS/macOS. Web translation (inference): NPS or feedback prompts follow the same timing rules: after a success moment, rate-limited, one tap to dismiss permanently.
- **Slop tells (inference)**: a "Enjoying the app? ★★★★★" custom pre-prompt that gates on happy vs. unhappy; a review ask after the first action; an NPS modal on page 2 of the first session.

## Searching (source: searching)
- **Intent**: There is one obvious place to search, with a clear scope, suggestions that save typing, and respect for privacy.
- **Checks**:
  - [SHOULD] If search matters, put it in a primary position: a toolbar (Notes, bottom toolbar) or a dedicated tab (Photos, TV).
  - [SHOULD] One location searches everything. Local filter-search only for clearly separate sections (Music library).
  - [SHOULD] Always show the current scope: placeholder ("Search Inbox"), scope bar or tokens, or title.
  - [SHOULD] Show recent searches before typing and predictive suggestions while typing.
  - [SHOULD] Consider privacy before showing search history. If shown, people can clear it.
  - [SHOULD] Index content in Spotlight with rich metadata. Add a Spotlight importer for custom file types and a Quick Look generator.
  - [CONSIDER] Search buttons inside the app that run Spotlight for the current selection.
  - [SHOULD] Prefer the system open/save panels (they include built-in search).
  - Also: provide find-in-page/document for document apps (iOS/iPadOS/macOS).
- **Platform deltas**: iOS uses a search tab or toolbar field. macOS uses a toolbar search field, Spotlight, and the panels. Web translation (inference): a single global search (⌘K or `/` shortcut) with scope chips, recent searches with "Clear", a placeholder naming the scope, results that keep the query in the URL.
- **Slop tells (inference)**: a search icon that opens an empty overlay with no recent searches or suggestions; separate search boxes per page searching different things; a placeholder that just says "Search..." with no scope; history shown with no way to clear it.

## Settings (source: settings)
- **Intent**: Good defaults make settings mostly unnecessary. Settings that remain go where people expect: global ones in Settings, task-specific ones next to the task.
- **Checks**:
  - [SHOULD] Defaults give the best experience to most people (auto-detect performance, devices, Dark Mode).
  - [SHOULD] Minimize the number of settings.
  - [SHOULD] Open with the shortcuts people expect: **Command-Comma** in apps, **Esc** in games.
  - [SHOULD] Do not ask for setup info you can detect (a connected controller, appearance mode).
  - [SHOULD] Do not duplicate system-wide settings (accessibility, scrolling, auth/biometrics, appearance). A copy implies the system setting does not apply.
  - [SHOULD] The settings area holds general, infrequently changed options (window configuration, save behavior, key mappings, account).
  - [SHOULD] Task-specific options (show/hide parts of the view, sort, reorder, filter) live **on the screen they affect**, not in Settings.
  - [SHOULD] Only the most rarely changed options go in the system Settings app. Add a button that deep-links there.
  - macOS:
    - [SHOULD] The Settings item is in the App menu, not a toolbar button. Document-level options go in the File menu.
    - [SHOULD] Dim minimize/zoom on the settings window. The window sizes to the current pane.
    - [SHOULD] A noncustomizable, always-visible toolbar of panes with the active one indicated.
    - [SHOULD] The title shows the current pane name. A single-pane window is titled "*App Name* Settings".
    - [SHOULD] Reopen to the last viewed pane.
  - watchOS: no custom entries in system Settings. Put a few essential options at the bottom of the main view.
- **Platform deltas**: iOS/iPadOS: in-app settings and/or the Settings app deep link. macOS: the conventions above. Web translation (inference): ⌘, opens settings in web apps where reasonable; sort, filter, and density controls on the list itself; no in-app "theme" toggle that fights `prefers-color-scheme` without offering "System" as the default; settings route remembers the last tab.
- **Slop tells (inference)**: a giant Settings page with 40 toggles; list sort order configured in Settings instead of on the list; a Light/Dark toggle with no "System" option; an in-app "Reduce motion" that duplicates the OS; a settings gear in the main toolbar of a Mac app.

## Undo and redo (source: undo-and-redo)
- **Intent**: Undo makes exploration safe. People need to predict what an undo will do and see that it worked.
- **Checks**:
  - [SHOULD] Make outcomes predictable: name the action ("Undo Typing", "Redo Bold"). The iOS shake alert has a title prefix "Undo "/"Redo " + 1–2 words ("Undo Address Change").
  - [MUST] (Apple: "crucial") Show the result of an undo or redo. If the change is offscreen, scroll to it, so people do not undo repeatedly thinking nothing happened.
  - [SHOULD] Multi-level undo with no arbitrary limit, back to the last logical point (open or save).
  - [CONSIDER] Batch-undo related micro-changes (a slider drag counts as one step). Offer "revert all since open or save".
  - [SHOULD] Dedicated undo/redo buttons only when necessary. Use the system symbols, in a toolbar.
  - [SHOULD] iOS/iPadOS: do not redefine shake or three-finger swipe.
  - [SHOULD] macOS: Undo/Redo at the top of the Edit menu, **⌘Z / ⇧⌘Z**.
- **Platform deltas**: iOS uses shake and three-finger swipe; iPadOS adds keyboard shortcuts; macOS uses the Edit menu and shortcuts. Not on tvOS/watchOS. Web translation (inference): ⌘/Ctrl+Z works in custom editors and canvases (not only in native inputs); "Undo" in the toast after destructive actions instead of a confirm dialog; scroll to and highlight the restored item.
- **Slop tells (inference)**: an "Are you sure you want to delete?" dialog where an undo toast would do; undo that only covers the last action; custom canvas/kanban apps where ⌘Z does nothing; undo with no visible effect.

## Workouts (source: workouts) — brief
- **Intent**: During activity, show only live, relevant metrics with large, easy controls. Afterward, give a summary.
- **Checks**: [SHOULD] only relevant data and controls during a session (time, calories, distance, lap); [SHOULD] a distinct look for an active session (live-updating metrics page); [SHOULD] easy pause/resume/stop with clear start/stop feedback; [SHOULD] explain missing sensor data in Workout-app-style language; [SHOULD] an end-of-session summary (+ Activity rings); [SHOULD] discard or ask about sessions only a few seconds long; [SHOULD] large, high-contrast text for reading in motion; [MUST-ish] use Activity rings only for their documented meaning.
- **Platform deltas**: watchOS/iOS/iPadOS only; not on macOS. Web translation (inference): any "live session" UI (recording, timer, live call) needs a visually distinct active state, big stop/pause controls, and a summary on end.
- **Slop tells (inference)**: a live-tracking screen with nav tabs and promo cards; tiny gray metric labels; no summary at the end, just a dump back to the list.

---

## Cross-cutting principles
1. **Match interruption to consequence.** Passive inline status → toast → alert → modal is a ladder. Alerts only for critical/actionable; confirmations only for *unexpected and irreversible* loss; success confirmation only for significant actions. Undo beats confirm. (feedback, modality, undo, notifications, drag-and-drop)
2. **Don't ask what you can know.** Detect instead of asking (location, Dark Mode, controller, device performance). Defaults beat settings, and setup comes later. (entering-data, settings, onboarding)
3. **Defer commitment.** Sign-in, permissions, ratings, purchases, setup, and tutorials all come *after* value, at the moment they matter. (accounts, onboarding, ratings, notifications)
4. **Continuity of context.** Restore state at a fine grain (scroll, windows, last settings pane, video end time). Pause on leave, resume in place. Finish user-started work in the background. (launching, multitasking, full-screen, settings, video)
5. **Options live next to what they affect.** Task options in the task, scope in the search field, status near its object. Global settings in Settings. Never duplicate system settings. (settings, feedback, searching)
6. **Use the platform's affordances; don't rebuild them.** System share sheet, player, file panels, print panel, rating prompt, undo shortcuts, ⌘, / ⌘Z / Space / ⌃⌘F. A near-miss custom version is worse than either the system one or something clearly different. (video, file-mgmt, printing, ratings, undo)
7. **Feedback is continuous, multi-channel, and consistent.** Drag feedback starts at ~3pt. Undo shows its result. A haptic means one thing. Never rely on sound or color alone. (drag-and-drop, haptics, audio, feedback)
8. **Name things precisely.** "Undo Bold", "Sign In with Face ID", "Only invited people can edit", verb-first tooltips, scope-naming placeholders, chart headlines that state the takeaway. Generic labels are a defect. (undo, accounts, collaboration, help, search, charts)
9. **The user controls mode changes.** Entering and exiting full screen, starting immersive video, unmuting the mic, exiting after content ends: never automatic. (full-screen, video, audio)
10. **Absence of loading is the goal.** Show something immediately, keep the app usable, use determinate progress when you can, and don't brand the wait. (loading, launching, video)

## Open questions for skill design
- **Empty states**: none of these pages covers them directly. Loading ("show something"), onboarding ("teach through interactivity"), and Help (contextual tips) are the nearest guidance. Should the skill derive empty-state checks from these, or pull them from other HIG pages (e.g. collections/lists, writing)?
- **Error recovery**: Apple's guidance is thin: "say why" (feedback) and "show failed drop" (DnD). Error-message wording probably lives in the Writing/Alerts digests. We need a cross-reference.
- **Disabled-CTA-until-valid** (entering-data) conflicts with common web a11y advice (disabled buttons aren't focusable and don't explain why). Should the web translation flag a [CONSIDER] variant: an enabled button plus inline errors on submit?
- **Severity calibration**: Apple uses "crucial/essential/important" in prose without "must". We mapped these to [MUST]. Should the skill keep that, or reserve [MUST] for literal must/never/always?
- **Web translation authority**: all web lines are our inference. Should the skill label them as lower-confidence findings, or pair them with WCAG/platform-web sources?
- **Static designs vs. flows**: many checks (drag feedback, undo result, state restore, interruptions) can only be checked in a prototype or running app. Should the skill ask for flow descriptions or recordings, or emit these as "ask the designer" questions when it only has screenshots?
- **Slop heuristics as a separate pass**: the slop tells cluster: carousel onboarding, spinner/skeleton misuse, modal-for-everything, toast-for-everything, confirm-instead-of-undo, login wall, notification-prompt-on-load, generic labels. Should these become a dedicated fast "slop scan" checklist ahead of the full HIG pass?
- **Out-of-scope platforms**: tvOS/visionOS/watchOS specifics (live-viewing, video encodings, workouts) are kept brief. Should the skill load them only when the target platform matches?
