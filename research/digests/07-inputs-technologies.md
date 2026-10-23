# 07 — Inputs & Technologies (HIG digest)

Severity key: [MUST] = Apple says must/never/always/don't, or it's an App Review/legal requirement. [SHOULD] = imperative guideline ("Use…", "Avoid…", "Prefer…"). [CONSIDER] = "Consider…"/"might". "Web translation" lines and "Slop tells" are **our inference** unless noted.

---

## Generative AI (source: generative-ai) — PRIORITY
- **Intent**: Generative features must earn their place with specific value, keep people in charge of decisions, disclose AI use, and degrade gracefully. Changelog June 2026 added refine/feedback-during-generation guidance.
- **Checks**:
  - [MUST] Never let people believe they're talking to, or reading content written by, a human when it's AI. Disclosure must also satisfy regional regulation.
  - [SHOULD] Mark clearly *where and when* AI is used. Don't rely on one global "AI-powered" badge; label each surface where output appears.
  - [SHOULD] Each AI feature names a specific benefit (time saved, better communication, creativity). "AI because AI" fails.
  - [SHOULD] Non-AI fallback exists where possible. Core task completes with AI off, unavailable (device, network, battery), or declined. Examples: Genmoji next to regular emoji; notification summaries vs. raw notifications.
  - [SHOULD] Controls next to generated content: **Edit, Undo, Retry, Adjust**. Dismiss unwanted new content; revert/retry transformations.
  - [SHOULD] Acknowledge refinements visibly: when a person adjusts output, show a clear signal that the change took effect.
  - [SHOULD] Loading copy says what's actually happening ("Finding substitutions for ingredients", "Summarizing key themes from your notes"), not "Processing…". Errors: plain language plus a clear next step.
  - [SHOULD] Design for latency. Use a loading experience or generate in the background while the person uses another part of the app; don't block the whole UI.
  - [SHOULD] Blocked/refused output coaches people (Image Playground: "Unable to use that description") and offers example requests that work better.
  - [SHOULD] Open-ended inputs (prompt box, search) come with **curated, diverse example inputs** that show range. An empty prompt box with no examples fails.
  - [SHOULD] State known limitations up front, show how to get good results, explain *why* a result came out poor.
  - [SHOULD] Hallucination: say that output may contain errors; scope generation away from facts the model can't verify; don't use generated content where an error could misinform and harm someone.
  - [SHOULD] Ask for confirmation before significant actions taken on someone's behalf. Don't automate destructive actions (deleting photos) or hard-to-undo ones (purchases).
  - [CONSIDER] Offer several *meaningfully different* results to pick from (Image Playground). Near-duplicates don't count.
  - [SHOULD] Feedback is voluntary, placed where it doesn't interrupt; quick thumbs up/down plus an optional detailed path.
  - [SHOULD] Privacy: tell people if data leaves the device, show *what* is shared, say whether it's stored off-device or used for training. Ask permission before using personal or usage data; give an opt-out. Kids' apps have stricter rules.
  - [SHOULD] Inclusion: when generating images or descriptions of people, ask for attributes instead of inferring gender, culture or relationship type.
  - [SHOULD] Copyright: build on models with protections, curate inputs, consider pre-approved prompts.
  - [CONSIDER] Keep the model separable from the UX so it can be swapped later.
- **Platform deltas**: None stated (identical guidance for iOS/iPadOS/macOS). Foundation Models needs a compatible device with Apple Intelligence on, so the UI must handle "feature not available here" on supported OS versions.
- **Web translation** (inference): Same rules. Disclose server processing explicitly (web AI is nearly always server-side). Stream tokens to cut perceived latency, keep Retry/Edit/Copy anchored to each output block, and make sure the core flow works when the AI endpoint returns errors or hits rate limits.
- **Slop tells** (inference):
  - Sparkle ✨ icon as the only label on an AI button, with no verb or stated outcome. Apple wants the *benefit* named.
  - A chat box bolted onto every screen whether or not conversation suits the task. Apple's own examples are task-scoped (rewrite, summarize, Genmoji), not general chat.
  - "Thinking…" / "Generating…" spinner with no specifics.
  - Output with no Undo/Retry/Edit next to it; regenerate replaces the old result with no way back.
  - An empty "Ask anything…" field with no curated examples.
  - Three near-identical variants presented as "options".
  - Feedback modal popping up after each generation (Apple: voluntary, non-interrupting).
  - Agent features that buy, send, or delete without a confirmation step.
  - Footer-only "AI can make mistakes" disclaimer while the output is styled as authoritative fact.

## Machine learning (source: machine-learning) — PRIORITY
- **Intent**: Design depends on the ML role (critical/complementary, private/public, proactive/reactive, visible/invisible, dynamic/static). Patterns cover feedback, calibration, mistakes, corrections, multiple options, confidence, attribution, limitations.
- **Checks**:
  - *Role classification* (reviewer should ask for each AI feature):
    - [SHOULD] Critical features and sensitive-data features (health, money) need higher accuracy, so present more conservatively. Complementary features get more tolerance.
    - [SHOULD] **Proactive** features (unrequested suggestions) get the least tolerance for errors. Use a confidence threshold *below which nothing is shown*. Mistakes here also make people feel less in control.
    - [CONSIDER] Invisible features can't easily signal how reliable they are or collect feedback. Expose them somewhere people can inspect.
  - *Explicit feedback*:
    - [SHOULD] Ask only when necessary; prefer implicit signals. Always voluntary.
    - [SHOULD] Option labels state the **consequence**: "Suggest less pop music", "Mute politics for a week". Avoid vague words like "Dislike" (no stated consequence, hard to translate).
    - [SHOULD] An icon never stands alone as a feedback option (it can't convey granularity).
    - [CONSIDER] Options that get more specific step by step.
    - [SHOULD] Act on feedback **immediately** and persist it: hidden content disappears everywhere in the app, not just in this list.
    - Note: favorites and social reactions count as *implicit* feedback, not explicit.
  - *Implicit feedback*:
    - [SHOULD] Tell people how data flows across apps and let them restrict it.
    - [SHOULD] Don't narrow exploration (filter bubble); beware confirmation bias.
    - [SHOULD] Withhold suggestions on private or sensitive topics (devices are shared).
    - [SHOULD] Weight recent signals over older ones.
    - [SHOULD] Update cadence matches the mental model: typing suggestions update instantly; song recommendations should not reshuffle continuously.
    - [SHOULD] Moving a button changes implicit-feedback data; account for that when reading it.
  - *Calibration (onboarding data collection)*:
    - [SHOULD] Calibrate only if the feature can't work without it. Do it once, early.
    - [SHOULD] Ask for the minimum; nothing people would have to look up; no difficult actions.
    - [SHOULD] Show an explicit goal and a progress indicator (Face ID tick marks).
    - [SHOULD] If progress stalls, help immediately, never blame the person, always offer a next step.
    - [SHOULD] Confirm success. Cancel available at any point, with no judgment and no "you cancelled" message.
    - [SHOULD] Calibration data stays editable and deletable outside the flow.
  - *Mistakes/corrections*:
    - [SHOULD] Size the correction tool to the cost of the mistake (a bad keyboard suggestion vs. a missed flight).
    - [SHOULD] Familiar correction controls; show the steps the automation took (Photos auto-crop highlights the crop controls it used, so people refine with those same controls).
    - [SHOULD] Apply corrections instantly and persist them; let people correct their corrections.
    - [SHOULD] Prefer **guided** corrections (list of alternatives) over freeform.
    - [MUST-ish] "Never rely on corrections to make up for low-quality results."
    - [SHOULD] If correcting takes more effort than doing the task manually, people abandon the feature.
    - [SHOULD] A wrong attribution makes the original mistake worse.
  - *Multiple options*:
    - [SHOULD] Diverse over near-duplicate (Maps: no-toll / scenic / highway routes).
    - [SHOULD] Few options, fitting on one screen without scrolling.
    - [SHOULD] Most likely option first, optionally preselected.
    - [SHOULD] When options look alike, add a short description that highlights the *differences*.
  - *Confidence*:
    - [SHOULD] Don't display confidence unless you've verified it tracks quality.
    - [SHOULD] Turn raw scores into concepts people understand. "97% match" is bad; "Because you listen to pop music" is good. Or use semantic bands ("high chance"), or an actionable phrase ("Good time to buy" / "Consider waiting").
    - [SHOULD] Numeric intervals/percentages only in domains where people expect statistics (weather, sports, polls, science).
    - [CONSIDER] Change presentation by confidence threshold: at high confidence, show results; at lower confidence, ask people to confirm (Photos faces).
  - *Attribution*:
    - [SHOULD] Factual, not emotional: "Because you've read nonfiction", never "Because you love nonfiction". Don't imply you understand people's feelings or beliefs.
    - [SHOULD] Neither too specific (feels like surveillance) nor too generic (feels impersonal). No jargon or statistics.
  - *Limitations*:
    - [SHOULD] Set expectations through placeholder text ("Photos, People, Places…").
    - [SHOULD] Give live coaching (Memoji: "move closer", lighting).
    - [SHOULD] Suggest alternatives instead of an empty "no results".
    - [SHOULD] Explain the cause of poor results ("doesn't work well in the dark").
    - [CONSIDER] Tell people when a limitation is fixed so they retry interactions they had learned to avoid.
- **Platform deltas**: None stated.
- **Web translation** (inference): Applies directly to recommendation feeds, search ranking, "For you" rails, autocomplete. Implicit-feedback privacy controls map to a visible "Why am I seeing this?" plus history/preference management.
- **Slop tells** (inference):
  - "98% match" / confidence bars on recommendations.
  - "Because you love X" copy.
  - Thumbs-down that has no visible effect and lets the item come back.
  - Proactive "AI suggestions" panels that always render, even when the results are weak.
  - Freeform-only correction ("tell the AI what's wrong") when a list of alternatives would do.
  - Onboarding quizzes asking for data the feature doesn't need.
  - "Dislike" as the only feedback verb.

## Keyboards (source: keyboards) — PRIORITY
- **Intent**: Respect system shortcuts. Add custom shortcuts only for the most frequent app-specific commands, with predictable modifiers. Support Full Keyboard Access (FKA).
- **Checks**:
  - [SHOULD] Support Full Keyboard Access (iOS, iPadOS, macOS, visionOS). Test with FKA on in Settings > Accessibility.
  - [SHOULD] **iPadOS gotcha**: support arrow/Tab keyboard navigation for text fields, text views, sidebars, collections. *Don't* add custom keyboard navigation to buttons, segmented controls, switches; FKA handles those.
  - [SHOULD] Don't repurpose standard shortcuts. The only allowed exception is when the original action makes no sense in your app (no text editing → ⌘I can mean Get Info).
  - Standard map to audit against (macOS):
    - ⌘N new, ⌘O open, ⌘S save, ⇧⌘S duplicate/Save As
    - ⌘W close window, ⇧⌘W close file, ⌥⌘W close all, ⌘Q quit, ⌘H hide, ⌘M minimize
    - ⌘, settings, ⌘? Help menu, ⌘. cancel operation, Esc cancel
    - ⌘F find, ⌥⌘F jump to search field, ⌘G / ⇧⌘G next/previous match, ⌘E use selection for find, ⌘J scroll to selection
    - ⌘Z undo, ⇧⌘Z redo, ⌘A select all, ⇧⌘A deselect all, ⌘C/⌘X/⌘V, ⇧⌘V paste as, ⌥⇧⌘V paste and match style
    - ⌘B/⌘I/⌘U text styles, ⌘T fonts, ⌥⌘T show/hide toolbar, ⌃⌘F full screen, ⌥⌘I inspector
    - ⌘` cycle windows, ⌘[ / ⌘] / ⌘| align left/right/center
    - ⇧⌘- / ⇧⌘= decrease/increase selection size
    - ⌥⇧←/→ word-wise selection, ⇧⌘←/→ to line ends, ⌥⇧↑/↓ paragraph-wise, ⌃Tab next control group
  - [SHOULD] Custom shortcuts only for the most frequent app-specific commands; too many makes the app seem hard to learn.
  - [SHOULD] Modifier hierarchy:
    - **Command** is the primary modifier.
    - **Shift** is secondary, for a related shortcut.
    - **Option** sparingly, for power or less-common commands.
    - **Avoid Control** (the system uses it).
  - [SHOULD] Display order: **Control, Option, Shift, Command** (⌃⌥⇧⌘).
  - [SHOULD] Don't write Shift for the upper character of a two-character key: "⌘?" not "⇧⌘/".
  - [SHOULD] Don't add a modifier to an existing shortcut to make an *unrelated* command (⇧⌘Z must relate to undo/redo).
  - [SHOULD] International layouts: beyond ⌘, use extra modifiers only with letters (on French layouts ⌥5 types "{").
  - [SHOULD] Let the system localize and mirror shortcuts (RTL).
  - [SHOULD] Modifier semantics while manipulating:
    - ⌘-drag moves a group.
    - ⇧-resize constrains aspect ratio.
    - Holding an arrow key nudges by the smallest unit.
    - ⌥-drag duplicates (from pointing-devices); must behave the same with touch.
  - [SHOULD] visionOS / iPad ⌘-hold shortcut overlay is a *flat list* per category, so shortcut titles must make sense without their submenu context (discoverabilityTitle).
- **Platform deltas**: macOS: people have a physical keyboard almost always and expect everything in the menu bar with shortcuts. iPadOS: often has a keyboard; holding ⌘ shows the shortcut interface. iOS: FKA. watchOS: not supported.
- **Web translation** (inference):
  - Don't hijack browser and OS shortcuts: ⌘L/T/W/R/F (⌘F only if you provide a better in-app find *and* the default still makes sense), ⌘K is fine.
  - Show shortcuts in menus and tooltips with macOS glyphs in ⌃⌥⇧⌘ order on Mac and "Ctrl+" on Windows.
  - Tab and arrow keys must reach every interactive element.
  - Esc closes the topmost layer.
  - Single-key shortcuts must not fire while focus is in a text field.
- **Slop tells** (inference):
  - A ⌘K command palette as the only way in, with no menus.
  - Shortcuts in non-canonical modifier order ("⌘⇧P").
  - Shortcut hints shown as "Ctrl" on Mac.
  - Custom shortcuts for rare actions while ⌘, (settings) and ⌘? (help) do nothing.
  - Modals Esc can't close.
  - Arrow-key handling on buttons in an iPad app.

## Pointing devices (source: pointing-devices) — PRIORITY
- **Intent**: Pointer adds precision without replacing touch. Behavior is consistent across touch, pointer, keyboard and eyes; effects are functional, never decorative.
- **Checks**:
  - [SHOULD] Don't redefine systemwide trackpad gestures (Mission Control, Dock, swipe between pages). Users can customize them.
  - [SHOULD] Same result across input modes (⌥-drag duplicates via touch *and* pointer).
  - [SHOULD] Hovering the pointer reveals controls that auto-minimize or fade out (Safari toolbar, video playback controls).
  - [SHOULD] **Hit-region padding: ~12pt around bezeled elements, ~24pt around borderless elements.** Too small feels fiddly; too large feels "sticky".
  - [SHOULD] Contiguous hit regions across bar buttons. No gaps, or the pointer flickers back to its default shape between them.
  - [SHOULD] iPadOS effect choice:
    - **highlight** for small, transparent-background elements (bar buttons, tab bars, segmented controls).
    - **lift** for small, opaque elements (icons).
    - **hover** (custom scale/tint/shadow) for large elements.
  - [SHOULD] Magnetism applies to lift and highlight, *not* hover. Don't add magnetism to hover elements; it feels like losing control.
  - [SHOULD] Provide the corner radius for custom lift elements so the pointer morphs cleanly (e.g., circles).
  - [SHOULD] Custom elements that behave like standard ones get the standard effects; without them they look broken.
  - [SHOULD] No gratuitous or decorative pointer effects; keep custom pointer shapes simple.
  - [SHOULD] **No instructional text attached to the pointer.**
  - [CONSIDER] Useful pointer annotations (X/Y values over a graph; W×H while resizing, as in Keynote).
  - [SHOULD] Hover-effect physics:
    - Scale only when there's room (not table rows).
    - In tight spaces use tint only.
    - **Never shadow without scale.** An unscaled element with a shadow reads as falsely elevated.
  - [SHOULD] Distinguish pointer from finger only when it adds value (precise click-to-seek on a scrubber).
  - [SHOULD] iPadOS 15+: band (rectangle) multi-select in custom views where it makes sense.
  - [CONSIDER] Pointer accessories (resize arrows); animate accessory transitions for state changes (plus → circle.slash when an action becomes unavailable).
  - [SHOULD] macOS cursor semantics are fixed:
    - pointingHand = link only
    - open/closed hand = pan content
    - crosshair = precise rectangular selection
    - dragCopy = ⌥ during drag; dragLink = ⌥⌘
    - operationNotAllowed = invalid drop target
    - resize-* = edges
    - I-beam = text
  - [SHOULD] macOS: secondary click opens context menu; force click opens Quick Look/lookup; smart zoom; swipe between pages.
- **Platform deltas**: iOS: no extra considerations. iPadOS: adaptive circle pointer, content effects, magnetism. macOS: classic cursors plus customizable gestures. visionOS: gaze sets pointer context; pointer hides while gesturing.
- **Web translation** (inference):
  - `cursor: pointer` only on links and link-like navigation, not every clickable div (Apple: pointingHand = URL link). Native-style buttons keep the arrow on macOS conventions.
  - Use `grab`/`grabbing` for pannable canvases, `not-allowed` on invalid drop targets, `crosshair` for marquee selection.
  - Pad hit areas (~12/24pt equivalents) and keep toolbar hit areas contiguous.
  - Every hover affordance needs a touch and keyboard equivalent.
- **Slop tells** (inference):
  - Hover lifts with a drop shadow on every card, including dense list rows.
  - Hover `scale(1.05)` that overlaps neighbors.
  - Shadow-on-hover with no scale.
  - Custom cursors or cursor-follower blobs.
  - Tooltips that are instructions ("Click here to…").
  - `cursor: pointer` on everything.
  - 2–4px gaps between toolbar buttons that kill hover continuity.

## Gestures (source: gestures) — PRIORITY
- **Intent**: Standard gestures mean the same thing everywhere. Custom gestures supplement, never replace, visible controls.
- **Checks**:
  - [SHOULD] Every gesture action also has a non-gesture path (voice, keyboard, Switch Control, visible button).
  - [SHOULD] Don't give tap or swipe a unique app meaning; don't invent a gesture for a standard action (activate, scroll).
  - [SHOULD] Live feedback during the gesture that predicts the result and shows how far to go.
  - [SHOULD] **Indicate when a gesture isn't available** (locked object, disabled button clearly distinct), or people think the app froze.
  - [SHOULD] Custom gestures must be discoverable, easy to perform, distinct, and *not the only way* to do something important. If it's hard to describe in simple words and graphics, it's too hard.
  - [SHOULD] Shortcut gestures sit on top of visible controls (edge-swipe back *plus* a Back button).
  - [SHOULD] Don't conflict with system-UI gestures (screen edges, watchOS edge swipe, visionOS hand roll).
  - Standard map:
    - Tap = activate/select. Swipe = reveal actions / dismiss / scroll. Drag = move.
    - Touch-and-hold = more options. Double-tap = zoom toggle. Pinch = zoom. Rotate = rotate.
    - iOS/iPadOS extras: 3-finger swipe left = undo, right = redo; 3-finger pinch in = copy, out = paste; shake = undo; 4-finger swipe = app switch (iPad).
  - [CONSIDER] Simultaneous gestures mainly suit games (joystick plus fire).
  - visionOS:
    - [SHOULD] Prefer indirect gestures for UI; use direct gestures sparingly (arm fatigue).
    - [SHOULD] No required body positions; avoid requiring a specific hand.
    - [SHOULD] Keep content away from the palm/wrist area (system overlays).
  - watchOS:
    - [SHOULD] Don't set a double-tap primary action in views with lists, scroll views or vertical tabs.
- **Platform deltas**: macOS is keyboard and mouse first; gestures come via trackpad or Magic Mouse. tvOS uses remote swipes. iPadOS adds the 4-finger app switch.
- **Web translation** (inference):
  - Swipe-to-delete or swipe-to-archive in a web list must have a visible or menu alternative.
  - Don't capture horizontal swipes at the viewport edge (browser back) or pinch (zoom).
  - Long-press menus need a right-click and a keyboard (Shift+F10 / context-menu key) equivalent.
- **Slop tells** (inference):
  - "Swipe to discover" as the only nav.
  - Hidden gesture-only actions with no affordance.
  - Disabled states that look the same as enabled ones.
  - Custom pull/drag interactions replacing native scroll.

## Focus and selection (source: focus-and-selection)
- **Intent**: Focus shows what input will act on. Use system effects; never move focus without user action.
- **Checks**:
  - [SHOULD] Use system focus effects; build custom ones only if absolutely necessary.
  - [SHOULD] Never move focus programmatically without user action. Exception: with directional input (keyboard, remote), if the focused item disappears, move focus to an item one step away. Otherwise hide the indicator.
  - [SHOULD] iPadOS/macOS: give focus support to *content* (list items, text fields, search fields), not controls (FKA covers those). tvOS: every element must be focusable.
  - [SHOULD] **Focus ring for text/search fields; full-row highlight for lists/collections.** Focused list row = white text on an accent-color background; unfocused selection = standard text on gray.
  - [SHOULD] iPadOS: Tab moves between *focus groups* in reading order (leading→trailing, top→bottom); arrow keys move within a group. Define custom groups so order makes sense, and set a *primary item* priority per group.
  - [SHOULD] Customize the halo to follow contours (rounded corners, Bézier paths); keep badges above it and don't let a parent clip it.
  - [SHOULD] tvOS: 5 states (unfocused, focused, highlighted/pressed, selected, unavailable). Supply assets at the larger focused size; no free pointer for menu navigation.
  - visionOS: gaze hover ≠ focus.
- **Platform deltas**: Not supported in iOS or watchOS (FKA aside). iPadOS uses focus groups; tvOS uses directional focus.
- **Web translation** (inference):
  - Visible `:focus-visible` ring on inputs.
  - Roving tabindex plus arrow keys inside lists, grids and toolbars (one Tab stop per group).
  - Never `outline: none` without a replacement.
  - Never autofocus-jump after async loads.
  - When a focused row is deleted, focus the neighbor.
- **Slop tells** (inference):
  - Focus rings removed globally.
  - Tab stopping at every card in a grid.
  - Focus ring on list rows instead of a row highlight.
  - Modals that don't trap or return focus.

## Apple Pencil and Scribble (source: apple-pencil-and-scribble)
- **Intent**: Pencil acts like a real marking tool: marks on contact, no modes. Scribble works in every text entry spot.
- **Checks**:
  - [SHOULD] Mark the instant the Pencil touches. No "enter draw mode" button.
  - [SHOULD] Every control also responds to Pencil (otherwise it seems broken or the battery seems dead).
  - [SHOULD] Pressure maps to continuous properties (opacity, size); use tilt, azimuth and barrel roll for stroke character.
  - [SHOULD] Place controls so neither the left nor right hand covers them; allow repositioning.
  - Hover:
    - [SHOULD] Preview the mark (size, color) at a *mid-range* value; don't vary the preview with height.
    - [SHOULD] **Never trigger actions on hover.**
    - [SHOULD] Hover previews for Pencil only, not the pointer.
  - Double-tap and squeeze:
    - [SHOULD] Respect the user's system setting.
    - [SHOULD] Custom modes are opt-in and the current mode is visible.
    - [SHOULD] Never modify content or do anything destructive (accidental triggers happen).
    - [SHOULD] Squeeze is a discrete action; show its UI near the Pencil tip.
  - [SHOULD] Barrel roll modifies marking only, never navigation.
  - Scribble:
    - [SHOULD] Works in all text inputs except passwords; custom fields shouldn't need a tap first.
    - [SHOULD] Writable blank areas where text is natural (Reminders: blank space below the last item).
    - [SHOULD] While writing: hide autocomplete and placeholder text; the field doesn't move, resize or autoscroll.
    - [SHOULD] Enlarge the field *before* writing or during pauses.
  - PencilKit:
    - [SHOULD] Turn off dynamic Dark Mode color adjustment when marking up PDFs or photos.
    - [CONSIDER] Add undo/redo buttons in compact width (the tool picker lacks them there); support 3-finger undo.
- **Platform deltas**: iPadOS only.
- **Web translation** (inference): Pointer Events `pressure`/`tiltX`; `pointerType === 'pen'` gets instant ink. Don't reflow inputs on focus for pen users.
- **Slop tells** (inference): A draw-mode toggle before inking; toolbars pinned to the right edge where a right hand covers them.

## Action button (source: action-button)
- **Intent**: A hardware button that runs one of your App Shortcuts.
- **Checks**:
  - [SHOULD] Expose essential tasks ("Start Egg Timer"), not "Open App" (the system already provides that).
  - [SHOULD] Labels: Title Case, verb first, present tense, no articles or prepositions, **max 3 words** ("Start Race").
  - [SHOULD] Don't duplicate the system's setup tips.
  - [SHOULD] iOS: run without leaving context (Live Activity, snippet).
  - watchOS:
    - [SHOULD] Secondary presses advance the task rather than stop it.
    - [SHOULD] Action plus side button together = pause (except diving).
- **Platform deltas**: iOS and watchOS only.
- **Web translation** (inference): The 3-word, verb-first label rule works for any quick-action, PWA shortcut, or command list.
- **Slop tells** (inference): "Open [App]" shortcuts; marketing-y action names.

## Camera Control (source: camera-control)
- **Intent**: iPhone 16 hardware control that overlays sliders and pickers on your viewfinder.
- **Checks**:
  - [MUST] SF Symbols only (custom symbols unsupported); symbols don't show state.
  - [SHOULD] Short labels (they follow Dynamic Type).
  - [SHOULD] Units on values (EV, %).
  - [SHOULD] Define prominent (snap) values.
  - [SHOULD] Keep your UI out of the overlay area; don't duplicate controls while the overlay shows.
  - [SHOULD] Disable controls that don't apply to the mode (you can't add or remove controls at runtime).
  - [SHOULD] Common controls in the middle.
  - [CONSIDER] Locked-camera extension.
- **Platform deltas**: iPhone only.
- **Web translation** (inference): Slider readouts always show units; snap points at common values.
- **Slop tells**: N/A.

## Gyroscope and accelerometer (source: gyro-and-accelerometer)
- **Checks**:
  - [MUST] Write purpose copy for the permission prompt.
  - [SHOULD] Use motion only for tangible benefit; don't collect it "to have the data".
  - [SHOULD] **Outside gameplay, don't drive UI with motion** (hard to repeat precisely, hard for some people to perform, costs battery).
- **Web translation** (inference): Avoid tilt/parallax UI driven by `deviceorientation`; iOS Safari requires a permission prompt anyway.
- **Slop tells** (inference): Gyro-parallax hero cards; shake-to-do-something as the only path.

## Sign in with Apple (source: sign-in-with-apple) — PRIORITY
- **Intent**: Ask for sign-in only in exchange for value, as late as possible. Respect privacy choices. Strict button branding.
- **Checks**:
  - [SHOULD] Tell people what they get from signing in (personalize, sync, unlock).
  - [SHOULD] **Delay sign-in as long as possible**; let people explore first.
  - [SHOULD] If an account is required, explain why *before* showing sign-in options.
  - [SHOULD] Commerce: sign-up comes *after* purchase (guest checkout; create account on the confirmation page, prefilled).
  - [SHOULD] After sign-in, welcome people right away; don't ask for non-required data.
  - [SHOULD] Mark optional fields as optional; never gate features on optional data. Show the data you received (greet by the shared name or relay email).
  - [MUST] Don't ask for a password; don't ask for a personal email when the person chose a private relay address.
  - [SHOULD] Show "Using Sign in with Apple" in account settings.
  - [CONSIDER] Account linking when the email matches.
  - [MUST] Button no smaller than other sign-in buttons; never require scrolling to reach it.
  - Sizes: min **140×30pt**, margin ≥ **1/10 of button height**. Custom: title-to-right-edge margin ≥ **8% of width**; title font ≈ **43%** of button height; PNG logos only at **44pt** height (44×44 for logo-only); logo-only is 1:1.
  - [MUST] Titles only "Sign in with / Sign up with / Continue with Apple".
  - [MUST] Logo and text both black or both white; no custom colors; text buttons are rectangular.
  - [MUST] Never crop the logo, add vertical padding, or use the logo as the button. App Review checks custom buttons.
  - Styles: white on dark; white-outline on light backgrounds that lack contrast; black on light. Never black on dark. Corner radius may match your other buttons (square to capsule).
- **Platform deltas**: Works on the web and non-Apple platforms. watchOS has the single "Sign in" title and a dark-gray (not black) fill.
- **Web translation** (inference): Use Apple's JS button. Keep the social sign-in buttons the same size, Apple's not smaller, and visible without scrolling. Never put a login wall on the landing page.
- **Slop tells** (inference):
  - A splash → "Create account" wall before any value is shown.
  - Social buttons in brand colors, with Apple's restyled to match a gradient theme.
  - Apple button smaller or tucked under "More options".
  - "Enter your email to continue" right after the person picked Hide My Email.

## Apple In-App Purchase / paywalls (source: apple-in-app-purchase) — PRIORITY
- **Intent**: Value first, honest pricing, effortless sign-up, *easy cancel*. IAP is for digital goods; Apple Pay for physical goods. (Rebranded Sept 2026.)
- **Checks**:
  - [SHOULD] Let people experience the app before purchase; consider limited free access (freemium, metered paywall, or free trial).
  - [SHOULD] The store looks like your app, not a separate app.
  - [SHOULD] Product names short enough not to truncate or wrap.
  - [MUST] Show the **total billing price** for every purchase. The billed amount is most prominent; per-month breakdowns are subordinate ("Forest Explorer" example).
  - [SHOULD] Hide the store or explain why it's unavailable when `canMakePayments` is false.
  - [MUST] Don't modify or replicate the system confirmation sheet.
  - [MUST] Sign-up screen contents:
    - Subscription name, duration, and what each period includes.
    - Localized billing amount.
    - **Restore/sign-in for existing subscribers.**
    - Links to Terms and Privacy.
  - [MUST] Intro offers show intro price, offer duration, *and* the standard price after the offer ends.
  - [SHOULD] Free trial copy says that payment starts automatically when the trial ends, and how much.
  - [SHOULD] Don't pitch subscriptions to existing subscribers (they'll think it lapsed). Offer sign-in for cross-platform subscriptions.
  - [SHOULD] Prompt at relevant moments (near the free limit), not randomly.
  - [SHOULD] Put a subscribe entry point in Settings.
  - [SHOULD] Ask only for necessary info at sign-up.
  - [SHOULD] Subscription summary in account screens shows the renewal date.
  - [SHOULD] **Make cancel easy.** A buried manage-subscription link reads as obstruction. A retention offer on cancel is allowed.
  - Refund help:
    - [SHOULD] Simple "Refund" / "Request a Refund" label.
    - [SHOULD] The refund button needs no scrolling or extra screen.
    - [SHOULD] Show product image, name and date so people can find the purchase.
    - [MUST] Don't characterize or speculate on Apple's refund policy.
  - [SHOULD] Family Sharing: put "Family" or "Shareable" in the name; write copy that works for both the buyer and family members.
  - Offer codes: custom codes are alphanumeric ASCII only; tell people where to redeem them (not App Store settings); "Redeem Code" on paywall or settings; welcome people after redemption, including those who subscribed before first launch.
- **Platform deltas**: watchOS shows the same required info, often in a modal sheet with Close; options easy to compare. tvOS sends sign-up to another device by code.
- **Web translation** (inference): For web/Stripe paywalls, apply the same honesty rules: total price prominent, renewal terms, trial auto-charge disclosure, restore/sign-in link, one-click cancel in account settings. (Web is outside IAP, but the same rules apply as baseline UX ethics and match FTC "click to cancel".)
- **Slop tells** (inference):
  - Paywall on first launch before any value.
  - Close "X" faded to 20% opacity or delayed.
  - "$0.99/week" shown big while the $51.48/yr actually billed is tiny.
  - Pre-toggled "Free trial enabled" switch with no auto-charge date.
  - Three-tier cards with the middle one "MOST POPULAR" and none showing billing totals.
  - No Restore button.
  - Fake countdown timers.
  - Cancel only via email support.

## Apple Pay (source: apple-pay)
- **Intent**: Physical goods, services, donations. Apple Pay is primary when available; system buttons; essential info only.
- **Checks**:
  - [MUST] If you check for an active Wallet card, Apple Pay must be the **primary** (not sole) option everywhere; don't push it into a separate step.
  - [SHOULD] Pre-select it, show it first or larger, separate it with a line.
  - [MUST] Use only Apple's API buttons; never draw your own.
  - [MUST] A custom button can't say "Apple Pay" or show the logo; show the mark elsewhere on the page instead.
  - [MUST] The mark is not a button.
  - [MUST] **Don't hide or disable the Apple Pay button.** If size or color is missing, tap → explain → auto-navigate to the missing field.
  - [SHOULD] Collect options, multi-shipping and pickup location *before* the sheet; optional data (gift notes) before or after.
  - [SHOULD] No account required before purchase (offer it on the confirmation page, prefilled).
  - [SHOULD] Payment sheet:
    - Essential fields only (no shipping address for e-gift cards).
    - Line items for fees, discounts, pending amounts and recurring charges, *not* a product list.
    - "Pay [Business]" uses the statement name; "Pay [End merchant] (via [You])" for marketplaces.
    - "Amount Pending" when the final total isn't known yet.
  - [SHOULD] Let the sheet show progress; no extra spinners.
  - [SHOULD] Show an order confirmation page; "1234 (Apple Pay)" format if you mention it.
  - [SHOULD] Validation:
    - Lenient parsing: drop Zip+4 extra digits; accept phones with or without dashes or country code.
    - Specific errors ("Zip code doesn't match city"): noun phrase, sentence case, no final period, **≤128 characters**.
  - [SHOULD] Subscriptions: show trial amount ($0), regular amount, and start date as line items; show the sheet only when a change adds cost.
  - Donations: preset $25/$50/$100 plus Other.
  - Sizes: Apple Pay button min **100×30pt**; captioned buttons (Buy/Book/Check Out/Donate/Subscribe/Set Up) min **140×30pt**; margins **1/10 height**; mark clear space 1/10 height; mark height ≥ other payment marks.
  - [SHOULD] Placement: right of "Add to Cart" side by side, above it when stacked; no smaller than other payment buttons; no scrolling needed.
  - Website icon 60×60pt (120px @2x, 180px @3x).
  - Text: "Apple Pay", never plural, possessive or translated; ® on first US body-text mention; text-only listing only if every payment option is text-only.
- **Platform deltas**: Same on iOS, macOS, visionOS, watchOS and the web; not on tvOS. On the web it can be paid via a nearby iPhone/Watch or a QR code.
- **Web translation** (Apple-stated for web): Same rules; privacy statement required; list Apple Pay in schema.org product markup; don't open new windows during checkout.
- **Slop tells** (inference): A greyed-out "Buy" button until the form is valid; a generic "Something went wrong"; checkout that pops a new tab.

## Mac Catalyst (source: mac-catalyst)
- **Intent**: A Mac version of an iPad app must feel like a Mac app, not an iPad layout in a window.
- **Checks**:
  - iPad idiom scales to **77%** (17pt → 13pt). Mac idiom renders at 100%, so audit layout, fonts and assets (use a separate asset catalog).
  - [SHOULD] Tab bar → sidebar split view (preferred) or segmented control; list top-level items in the **View menu**.
  - [SHOULD] Offer Next/Previous buttons as well as swipe gestures.
  - [SHOULD] Top-down flow: important actions go in the window toolbar. Move bottom- and side-edge buttons (an iPad reach convenience) into the toolbar.
  - [SHOULD] Every command lives in the menu bar.
  - [SHOULD] Multi-column layouts; an inspector beside content instead of a popover.
  - [SHOULD] **Every object has a context menu.**
  - [SHOULD] Make a Mac-style app icon.
- **Platform deltas**: Mac users expect keyboard navigation, shortcuts, free window resizing and multiple windows.
- **Web translation** (inference):
  - A desktop web app shouldn't be a stretched mobile layout: no bottom tab bar on desktop, toolbar at the top.
  - Right-click menus on objects; inspector side panels instead of popovers at wide widths.
  - Desktop shortcuts.
- **Slop tells** (inference):
  - Responsive sites that keep the mobile bottom-nav and FAB on a 1440px screen.
  - A single centered 400px column on desktop.
  - Hamburger menu on desktop.

## iCloud (source: icloud)
- **Checks**:
  - [SHOULD] Sync is invisible; don't ask which documents to keep in iCloud. At most, offer a one-time all-or-nothing choice.
  - [SHOULD] No alert when iCloud is off; show an unobtrusive note that changes won't sync.
  - [SHOULD] Subtle feedback if a download takes longer than a few seconds.
  - [SHOULD] Don't store regenerable data (it costs people storage).
  - [SHOULD] Sync state such as last page read. Sync only settings people want on all devices.
  - [SHOULD] **Warn that deletes apply on every device.**
  - [SHOULD] Resolve conflicts automatically when possible, otherwise with an unobtrusive prompt, early.
  - [SHOULD] Include cloud content in search results.
- **Web translation** (inference): Cross-device sync with no "Sync now" button; delete confirmation says "from all your devices"; offline banner instead of an error modal.
- **Slop tells** (inference): Sync status spinners everywhere; a "Sync" button.

## Siri / App Intents (source: siri)
- **Intent**: Expose actions and entities so Siri, Spotlight and Shortcuts can act. Responses are terse, voice-safe, and device-independent.
- **Checks**:
  - [SHOULD] Expose the most popular actions; use people's terms ("song" vs "track").
  - [SHOULD] Donate relevant content (recents, favorites), not everything.
  - [MUST] **No ads, marketing or IAP pitches in Siri content.**
  - [SHOULD] Specific follow-ups ("Which soup?" not "Which one?").
  - [SHOULD] Succinct responses with no humor (repeated responses get grating).
  - [SHOULD] The voice response stands alone without visuals; no device-specific wording.
  - [SHOULD] Leave your app name out of responses (the system attributes it).
  - [SHOULD] Pronoun-neutral ("Who should I send it to?").
  - [SHOULD] When the list is too long, ask an open question instead.
  - [SHOULD] Specific errors ("out of chicken noodle soup").
  - [MUST] Don't impersonate Siri or Apple; don't use reserved phrases ("Hey Siri", "Call 911"); call Siri by name, never "she"; translate only "Hey" in "Hey Siri".
- **Web translation** (inference): For any assistant or agent replies in your app: terse, no jokes, no self-naming, specific clarifying questions, specific errors.
- **Slop tells** (inference): A chatty assistant persona with jokes and emoji; "Sure! I'd be happy to help with that!" preambles; "Which one?" clarifiers.

## Maps (source: maps)
- **Checks**:
  - [SHOULD] Maps are interactive; don't cover them with non-interactive overlays.
  - [SHOULD] Muted emphasis style when your content is dense; default style otherwise.
  - [SHOULD] Search plus category filters.
  - [SHOULD] Distinct outline and color on selected elements.
  - [SHOULD] Cluster overlapping POIs.
  - [MUST] Apple logo and legal link not permanently covered: ~**7pt side / 10pt top-bottom** padding; fixed to the map; placed **10pt above a bottom card's lowest resting position**. Hidden on maps < 200×100px.
  - [SHOULD] Annotation glyph text: **2–3 characters**.
  - [SHOULD] Contrast for controls over the map (thin stroke or light shadow).
  - [MUST] Place cards: a place card shown outside a map must include a map. Keep the location visible next to the card; don't duplicate info.
  - Indoor maps:
    - [SHOULD] Detail scales with zoom.
    - [SHOULD] Floor picker uses numbers.
    - [SHOULD] Dim surrounding context areas.
    - [SHOULD] Limit scrolling outside the venue.
    - [SHOULD] Don't imitate the Apple Maps look.
  - watchOS: static map, ≤5 annotations, smallest region that fits.
- **Web translation** (inference): Same for Mapbox/Google embeds: muted base map under rich data, clustering, keep attribution visible.
- **Slop tells** (inference): A decorative non-interactive map screenshot as a hero background; a saturated base map under colorful data pins.

## Live Photos (source: live-photos)
- **Checks**:
  - [SHOULD] Apply edits to all frames, or offer conversion to a still.
  - [MUST-ish] Don't split a Live Photo into separate frames or audio.
  - [SHOULD] Preview before sharing; offer sharing as a still.
  - [SHOULD] Show download progress and when it's playable.
  - [SHOULD] Mark a Live Photo with a hint of motion or the system badge, in a consistent corner.
  - [MUST] **Never use a play-button glyph** (it reads as video).
- **Slop tells** (inference): A ▶️ overlay on animated thumbnails that aren't videos.

## Photo editing (source: photo-editing)
- **Checks**:
  - [SHOULD] Confirm Cancel only if edits exist.
  - [SHOULD] No second toolbar inside the host modal.
  - [SHOULD] Preview before commit.
  - [SHOULD] Extension uses your app icon.
- **Web translation** (inference): Embedded editors: confirm a discard only when the document is dirty; never stack toolbars.

## SharePlay (source: shareplay)
- **Checks**:
  - [SHOULD] Real-time only; provide save/share for async afterward.
  - [SHOULD] Start button uses the SharePlay symbol.
  - [SHOULD] Join with minimal friction; defer setup steps (profiles after joining).
  - [SHOULD] Show who changed what (initials next to contributions, as in Freeform).
  - [SHOULD] Comfort settings (volume, subtitles) are per participant.
  - [SHOULD] Easy leave and rejoin.
  - [MUST] "SharePlay" never takes an adjective or inflection (no "SharePlaying").
  - [SHOULD] PiP for shared video (iOS, iPadOS, macOS).
  - visionOS:
    - [SHOULD] Up to **5** spatial Personas; seats ≥ **1m** apart.
    - [SHOULD] Keep seats in place when people leave.
    - [SHOULD] Template changes happen only on explicit user action, with a fade.
    - [SHOULD] Roles are independent of seats.
    - [SHOULD] Last change wins for conflicts; no take-control UI.
- **Web translation** (inference): Multiplayer/collab web apps: presence avatars plus attribution on edits, per-user view prefs, join links that land directly in the session.
- **Slop tells** (inference): A "Join" flow with an onboarding carousel before the shared content.

## Augmented reality (source: augmented-reality)
- **Checks**:
  - [SHOULD] Hide AR features on unsupported devices; don't show an error.
  - [SHOULD] Full-screen camera with minimal UI.
  - [SHOULD] **60 fps** scene updates.
  - [SHOULD] Prefer small or coarse reflective surfaces.
  - [SHOULD] Persistent controls in screen space, translucent, reachable without changing grip.
  - [SHOULD] Comfort and safety: introduce movement gradually; avoid sweeping motions.
  - [SHOULD] Coaching: use the system coaching view and hide other UI during it.
  - Placement:
    - [SHOULD] Place instantly, then refine; nudge objects onto the detected plane.
    - [SHOULD] Guide people to offscreen objects with edge indicators.
    - [SHOULD] Use plane classification (floor, table).
    - [SHOULD] Don't snap precisely to plane edges.
  - Manipulation:
    - [SHOULD] Direct manipulation with standard gestures (1-finger drag moves, 2-finger rotates).
    - [SHOULD] Generous hit tolerance near objects.
    - [SHOULD] Don't scale real-product objects (furniture); never use scaling to fake distance.
    - [SHOULD] Test pinch vs rotate conflicts.
  - Image anchors:
    - [SHOULD] Wait up to **1s** before removing content when an image is lost.
    - [SHOULD] Keep ≤ **100** reference images active.
  - Interruptions and errors:
    - [SHOULD] Hide objects during relocalization; allow reset or cancel.
    - [SHOULD] Indicate face-tracking loss after ~**0.5s**.
  - [SHOULD] Copy avoids jargon: "Try moving your phone more slowly", not "Excessive motion detected". 3D hints (rotation ring) beat text overlays. 3D text faces the viewer at a constant size.
  - [MUST] AR glyph and badges: unaltered (size and color only for the glyph); **10%** clear space; badge only when the catalog mixes AR and non-AR items; same corner every time.
- **Platform deltas**: iOS/iPadOS (this page); visionOS is separate; no macOS.
- **Web translation** (inference): WebXR / `<model>` / Quick Look links: feature-detect and hide when unsupported; badge only the AR-capable products.
- **Slop tells** (inference): Error copy that leaks tech terms ("tracking lost", "insufficient features").

---

## Skimmed pages — transferable principles

- **digital-crown**: Rotary input drives the main navigation. UI updates at the speed people turn it. Every rotation gets visual feedback; use default haptics. *Web*: the same applies to scroll-wheel-driven value controls.
- **eyes** (visionOS):
  - Interactive targets ≥ **16pt margin** or **60pt center-to-center**.
  - Rounded shapes; one containing shape for compound controls.
  - No full-field repeating patterns.
  - Hover delay chosen to fit the interaction; a primary view stays unchanged across hover states.
  - *Transferable*: spacing so near-misses don't hit neighbors.
- **game-controls**:
  - Touch controls **44×44pt** (frequent) / **28×28pt** (menus).
  - Visible plus tactile press state that stays visible under a finger (e.g., glow).
  - Symbols over text for controller buttons.
  - Auto-detect a controller and switch on-screen glyphs to match.
  - Single-key bindings, remappable.
- **nearby-interactions**: Continuous feedback; never the only way to do a task; physical-world metaphors.
- **remotes**: Back = parent screen; tell press from tap; ignore accidental taps.
- **airplay**:
  - Prefer the system player.
  - Don't stop playback on background or lock; don't interrupt other audio unless your content is immersive.
  - Keep the app usable during playback.
  - Never use the AirPlay icon or name in a custom button; emphasize your app over the tech brand.
- **always-on**:
  - Hide sensitive info when dimmed.
  - Dim secondary content; keep the layout stable.
  - Ease motion to rest instead of stopping it abruptly.
  - *Transferable*: low-power and idle states.
- **app-clips**:
  - Finish the task without an account (offer Sign in with Apple and Apple Pay).
  - Linear, focused UI; no web views.
  - Recommend the full app politely and only after the task.
  - Not for marketing only.
  - Header images without text (not localizable).
  - *Transferable*: lightweight entry flows (landing deep links) skip install and sign-up walls.
- **carekit**:
  - Task styles matched to the task (simple, instructions, log, checklist, grid).
  - Charts: clear labels, distinct colors, legend, explicit time units, consolidate large data sets.
  - Minimize notifications; refined, unobtrusive branding.
- **carplay**:
  - Glanceable layout with limited colors.
  - **Interactive and non-interactive elements never share a color.**
  - Test in real lighting; report errors on the surface the person is using.
- **game-center**: Keep controls away from system overlay points; succinct achievement copy; show progress.
- **healthkit**:
  - Activity rings only for Move/Exercise/Stand; never as decoration or branding; other ring charts must look clearly different.
  - Health icon never used as a button; 1/10 clear space.
  - Ask for health data only when it's needed.
  - *Transferable*: don't borrow system visual idioms for other meanings.
- **homekit**:
  - Use the system setup flow; no account or personal info required.
  - Don't duplicate system settings; honor setup choices.
  - Tech icons non-interactive; don't imply the platform performs your action.
- **id-verifier**: Ask only for the data you need; explicit button to start verification.
- **imessage-apps-and-stickers**: One primary experience; essentials in compact view; edit text only in expanded view; localized alt text for stickers.
- **nfc**: Say "scan" / "hold near", not "tap" / "touch". Approachable terms; succinct instructions.
- **researchkit**: Consent split into digestible sections plus an optional comprehension quiz; check eligibility early; a dashboard shows progress.
- **shazamkit**: **Stop recording the moment you have enough**; storing to the library is opt-in. *Transferable*: shortest possible use of mic or camera, with a clear indicator.
- **tap-to-pay-on-iphone**:
  - Option visible even before setup is done; setup continues in the background.
  - Final amount fixed before the payment UI.
  - Progress shown while authorizing, then a clear declined/approved result.
  - Errors give an actionable fix plus a path to help.
  - Admin-only terms.
- **wallet**:
  - Get permission before deleting passes.
  - Change messages only for time-critical updates.
  - Uncluttered pass front; ask for ID data at the exact moment it's needed and say how long it's kept.
  - No duplicate notifications.
  - Order status descriptions direct and thorough on Issue/Canceled.

---

## Cross-cutting principles
1. **Never one input only.** Every gesture, hover, motion, Pencil, hardware-button or voice action has a visible, keyboard-reachable, accessible equivalent (gestures, pointing-devices, eyes, nearby-interactions, gyro, AR).
2. **System conventions are a contract.** Standard shortcuts, gestures, cursors, focus effects, payment and sign-in buttons, and system sheets are not yours to restyle or repurpose. Apple says "don't replicate/modify" for the IAP confirmation sheet, Apple Pay buttons, the AR glyph, Activity rings and Live Photo badges.
3. **Accidental-trigger safety.** Imprecise inputs (hover, double-tap, squeeze, motion, proactive AI) must never do destructive or content-changing things.
4. **Earn the ask.** Sign-in, paywalls, calibration, permissions and feedback requests come after people see value and are minimal, voluntary, and explained in terms of benefit (sign-in, IAP, ML calibration, App Clips, HealthKit).
5. **Specific > generic copy.** "Finding substitutions for ingredients" > "Processing…"; "Zip code doesn't match city" > "Address is invalid"; "Which soup?" > "Which one?"; "Try moving your phone more slowly" > "Excessive motion detected"; "Suggest less pop music" > "Dislike". This is the single most testable anti-slop rule in this batch.
6. **Reversibility and visible effect.** Undo/Retry/Edit near outputs; corrections apply instantly and persist; feedback visibly changes the result.
7. **Translate numbers into meaning.** Confidence becomes rank, semantic bands or actionable advice; raw percentages only in statistical domains.
8. **Honest money UI.** Total billed amount most prominent; trial auto-charge disclosed; Restore present; cancel easy; Apple Pay never hidden or disabled (validate after tap instead).
9. **Functional, not decorative, feedback.** Pointer effects, hover, focus and motion must carry information. Apple explicitly rejects decorative pointer effects, shadow-without-scale and instructional pointer text.
10. **Platform-idiom translation.** iPad → Mac means bottom/side controls move to the toolbar and menu bar, tab bar becomes a sidebar, and every object gets a context menu. The same applies to mobile → desktop web.

## Open questions for skill design
1. Severity calibration: the HIG uses "must" rarely. Should the skill escalate SHOULDs into blocking findings when they are App Review–enforced (IAP disclosures, Sign in with Apple button parity, Apple Pay button rules)? We need an "App Review risk" flag separate from HIG severity.
2. Web paywalls are outside IAP. Do we apply IAP disclosure rules as the baseline for web (our inference, plus FTC/EU rules), or keep them as advisory?
3. AI disclosure granularity: per-surface labels vs. a feature-level disclosure. Apple says "when and where" but gives no visual spec. Should the skill propose a pattern (e.g., inline provenance tag next to the Retry/Edit cluster)?
4. Can the reviewer check hit-region padding (12/24pt) and Sign in with Apple/Apple Pay minimums (140×30, 100×30) from screenshots alone, or do we need code/DOM access? Consider a mode that measures from the DOM for web.
5. Keyboard audit: should the skill ship the standard macOS shortcut table as a lookup to flag conflicts in a web app's shortcut map, including browser-reserved keys (our addition)?
6. Proactive-AI threshold: Apple says to suppress low-confidence proactive results, but a screenshot can't show model confidence. Do we ask the designer for the empty/low-confidence state as a required artifact?
7. Should "sparkle icon without a verb label" be a hard slop finding? HIG doesn't ban the glyph; it requires a specific benefit and clear disclosure. Frame it as a "missing benefit/label" finding, not an icon ban.
8. How much visionOS and tvOS content to carry? These are mostly out of scope (iOS/iPadOS/macOS/web), but numbers like the 60pt eye-target spacing transfer to dense touch UIs. Keep them as optional references?
