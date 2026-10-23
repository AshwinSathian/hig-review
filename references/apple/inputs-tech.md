Covers: generative AI, machine learning, keyboards (with the standard macOS shortcut table), pointing devices, gestures, focus and selection, Pencil and Scribble, hardware controls, sign-in, purchases and paywalls, Apple Pay, Mac Catalyst, sync, Siri, maps, media and collaboration features, plus skim-only technologies.
Loaded by: interaction and motion, platform fit, content
Snapshot: 2026-10-23

Tags: MUST = Apple says must/never/always/don't, or App Review enforces it. SHOULD = avoid/prefer/use and plain imperatives. CONSIDER = consider/can/may. "Web" lines are our translation, not Apple's, unless marked Apple-stated. "Slop tells" are ours.

## Generative AI
**Intent**: Generative features earn their place with a specific value, keep people in charge, disclose AI use, and degrade gracefully. The June 2026 changelog added guidance on refining output and collecting feedback during generation.

**Checks**
- [MUST] Never let people believe they are talking to a human, or reading human-written content, when it is AI. Disclosure must also satisfy regional regulation.
- [SHOULD] Mark where and when AI is used. Label each surface where output appears; one global "AI-powered" badge is not enough.
- [SHOULD] Each AI feature names a specific benefit (time saved, better communication, creativity). "AI because AI" fails.
- [SHOULD] A non-AI fallback exists where possible. The core task completes with AI off, unavailable (device, network, battery) or declined. Examples: Genmoji next to regular emoji; notification summaries next to raw notifications.
- [SHOULD] Controls sit next to generated content: Edit, Undo, Retry, Adjust. People can dismiss unwanted new content and revert or retry transformations.
- [SHOULD] Acknowledge refinements: when someone adjusts output, show a clear signal that the change took effect.
- [SHOULD] Loading copy says what is happening ("Finding substitutions for ingredients", "Summarizing key themes from your notes"), not "Processing...". Errors use plain language and a clear next step.
- [SHOULD] Design for latency: show a loading experience, or generate in the background while the person uses another part of the app. Do not block the whole UI.
- [SHOULD] Blocked or refused output coaches people (Image Playground: "Unable to use that description") and offers example requests that work better.
- [SHOULD] Open-ended inputs (prompt box, search) come with curated, diverse example inputs that show range. An empty prompt box with no examples fails.
- [SHOULD] State known limitations up front, show how to get good results, and explain why a result came out poor.
- [SHOULD] Hallucination: say that output may contain errors; scope generation away from facts the model cannot verify; do not use generated content where an error could misinform and harm someone.
- [SHOULD] Ask for confirmation before significant actions taken on someone's behalf. Do not automate destructive actions (deleting photos) or hard-to-undo ones (purchases).
- [CONSIDER] Offer several meaningfully different results to pick from (Image Playground). Near-duplicates do not count.
- [SHOULD] Feedback is voluntary, placed where it does not interrupt: a quick thumbs up/down plus an optional detailed path.
- [SHOULD] Privacy: tell people if data leaves the device, show what is shared, say whether it is stored off-device or used for training. Ask permission before using personal or usage data and give an opt-out. Kids' apps have stricter rules.
- [SHOULD] Inclusion: when generating images or descriptions of people, ask for attributes instead of inferring gender, culture or relationship type.
- [SHOULD] Copyright: build on models with protections, curate inputs, consider pre-approved prompts.
- [CONSIDER] Keep the model separable from the UX so it can be swapped later.
**Platform deltas**: None stated; identical guidance for iOS, iPadOS and macOS. Foundation Models needs a compatible device with Apple Intelligence on, so the UI must handle "feature not available here" on supported OS versions.

**Web (our translation)**: Same rules. Disclose server processing explicitly, since web AI is nearly always server-side. Stream tokens to cut perceived latency, keep Retry/Edit/Copy anchored to each output block, and make sure the core flow works when the AI endpoint errors or hits rate limits.

**Slop tells (ours)**
- A sparkle icon as the only label on an AI button, with no verb or stated outcome. File it as a missing benefit/label finding, not an icon ban: the HIG does not ban the glyph, it requires a named benefit and clear disclosure.
- A chat box bolted onto every screen whether or not conversation suits the task. Apple's own examples are task-scoped (rewrite, summarize, Genmoji), not general chat.
- A "Thinking..." or "Generating..." spinner with no specifics.
- Output with no Undo/Retry/Edit beside it; regenerate replaces the old result with no way back.
- An empty "Ask anything..." field with no curated examples.
- Three near-identical variants presented as "options".
- A feedback modal after each generation (Apple: voluntary, non-interrupting).
- Agent features that buy, send or delete without a confirmation step.
- A footer-only "AI can make mistakes" disclaimer while the output is styled as authoritative fact.

## Machine learning
**Intent**: Design depends on the ML role: critical or complementary, private or public, proactive or reactive, visible or invisible, dynamic or static. Patterns cover feedback, calibration, mistakes, corrections, multiple options, confidence, attribution and limitations.

**Checks**
- [SHOULD] Role classification: Critical features and sensitive-data features (health, money) need higher accuracy, so present them more conservatively. Complementary features get more tolerance.
- [SHOULD] Role classification: Proactive features (unrequested suggestions) get the least tolerance for errors. Use a confidence threshold below which nothing is shown. Mistakes here also make people feel less in control.
- [SHOULD] Role classification: A proactive feature must come with its empty or low-confidence state as a design artifact. A screenshot cannot show model confidence, so if the artifact is missing, list the behavior as Unverified.
- [CONSIDER] Role classification: Invisible features cannot easily signal how reliable they are or collect feedback. Expose them somewhere people can inspect.
- [SHOULD] Explicit feedback: Ask only when necessary; prefer implicit signals. Always voluntary.
- [SHOULD] Explicit feedback: Option labels state the consequence: "Suggest less pop music", "Mute politics for a week". Avoid vague words like "Dislike" (no stated consequence, hard to translate).
- [SHOULD] Explicit feedback: An icon never stands alone as a feedback option; it cannot convey granularity.
- [CONSIDER] Explicit feedback: Options that get more specific step by step.
- [SHOULD] Explicit feedback: Act on feedback immediately and persist it: hidden content disappears everywhere in the app, not just in this list.
- [SHOULD] Explicit feedback: Favorites and social reactions count as implicit feedback, not explicit.
- [SHOULD] Implicit feedback: Tell people how data flows across apps and let them restrict it.
- [MUST] Implicit feedback: Do not let it narrow exploration (filter bubble); beware confirmation bias.
- [SHOULD] Implicit feedback: Withhold suggestions on private or sensitive topics, because devices are shared.
- [SHOULD] Implicit feedback: Weight recent signals over older ones.
- [SHOULD] Implicit feedback: Update cadence matches the mental model: typing suggestions update instantly; song recommendations should not reshuffle continuously.
- [SHOULD] Implicit feedback: Moving a button changes implicit-feedback data; account for that when reading it.
- [SHOULD] Calibration: Calibrate only if the feature cannot work without it. Do it once, early.
- [SHOULD] Calibration: Ask for the minimum; nothing people would have to look up; no difficult actions.
- [SHOULD] Calibration: Show an explicit goal and a progress indicator (Face ID tick marks).
- [SHOULD] Calibration: If progress stalls, help immediately, never blame the person, always offer a next step.
- [SHOULD] Calibration: Confirm success. Cancel is available at any point, with no judgment and no "you cancelled" message.
- [SHOULD] Calibration: Calibration data stays editable and deletable outside the flow.
- [SHOULD] Mistakes and corrections: Size the correction tool to the cost of the mistake (a bad keyboard suggestion versus a missed flight).
- [SHOULD] Mistakes and corrections: Use familiar correction controls and show the steps the automation took (Photos auto-crop highlights the crop controls it used, so people refine with those same controls).
- [SHOULD] Mistakes and corrections: Apply corrections instantly and persist them; let people correct their corrections.
- [SHOULD] Mistakes and corrections: Prefer guided corrections (a list of alternatives) over freeform.
- [MUST] Mistakes and corrections: Never rely on corrections to make up for low-quality results.
- [SHOULD] Mistakes and corrections: If correcting takes more effort than doing the task manually, people abandon the feature.
- [SHOULD] Mistakes and corrections: A wrong attribution makes the original mistake worse.
- [SHOULD] Multiple options: Diverse over near-duplicate (Maps: no-toll, scenic and highway routes).
- [SHOULD] Multiple options: Few options, fitting on one screen without scrolling.
- [SHOULD] Multiple options: Most likely option first, optionally preselected.
- [SHOULD] Multiple options: When options look alike, add a short description that highlights the differences.
- [SHOULD] Confidence: Do not display confidence unless you have verified it tracks quality.
- [SHOULD] Confidence: Turn raw scores into concepts people understand. "97% match" is bad; "Because you listen to pop music" is good. Or use semantic bands ("high chance"), or an actionable phrase ("Good time to buy" / "Consider waiting").
- [SHOULD] Confidence: Numeric intervals and percentages only in domains where people expect statistics (weather, sports, polls, science).
- [CONSIDER] Confidence: Change presentation by confidence threshold: at high confidence, show results; at lower confidence, ask people to confirm (Photos faces).
- [SHOULD] Attribution: Factual, not emotional: "Because you've read nonfiction", never "Because you love nonfiction". Do not imply you understand people's feelings or beliefs.
- [SHOULD] Attribution: Neither too specific (feels like surveillance) nor too generic (feels impersonal). No jargon or statistics.
- [SHOULD] Limitations: Set expectations through placeholder text ("Photos, People, Places...").
- [SHOULD] Limitations: Give live coaching (Memoji: "move closer", lighting).
- [SHOULD] Limitations: Suggest alternatives instead of an empty "no results".
- [SHOULD] Limitations: Explain the cause of poor results ("doesn't work well in the dark").
- [CONSIDER] Limitations: Tell people when a limitation is fixed so they retry interactions they had learned to avoid.
**Platform deltas**: None stated.

**Web (our translation)**: Applies directly to recommendation feeds, search ranking, "For you" rails and autocomplete. Implicit-feedback privacy controls map to a visible "Why am I seeing this?" plus history and preference management.

**Slop tells (ours)**
- "98% match" or confidence bars on recommendations.
- "Because you love X" copy.
- A thumbs-down with no visible effect that lets the item come back.
- Proactive "AI suggestions" panels that always render, even when the results are weak.
- Freeform-only correction ("tell the AI what's wrong") when a list of alternatives would do.
- Onboarding quizzes asking for data the feature does not need.
- "Dislike" as the only feedback verb.

## Keyboards
**Intent**: Respect system shortcuts. Add custom shortcuts only for the most frequent app-specific commands, with predictable modifiers. Support Full Keyboard Access (FKA).

**Checks**
- [SHOULD] Support Full Keyboard Access (iOS, iPadOS, macOS). Test with FKA on in Settings > Accessibility.
- [SHOULD] iPadOS: support arrow and Tab keyboard navigation for text fields, text views, sidebars and collections. Do not add custom keyboard navigation to buttons, segmented controls or switches; FKA handles those.
- [SHOULD] In general, do not repurpose standard shortcuts. The only allowed exception is when the original action makes no sense in your app (no text editing, so ⌘I can mean Get Info).
- [SHOULD] Custom shortcuts only for the most frequent app-specific commands; too many makes the app seem hard to learn.
- [SHOULD] Modifier hierarchy: Command is the primary modifier. Shift is secondary, for a related shortcut. Option sparingly, for power or less-common commands. Avoid Control (the system uses it).
- [SHOULD] Display order is Control, Option, Shift, Command (⌃⌥⇧⌘).
- [SHOULD] Do not write Shift for the upper character of a two-character key: "⌘?" not "⇧⌘/".
- [SHOULD] Do not add a modifier to an existing shortcut to make an unrelated command (⇧⌘Z must relate to undo/redo).
- [SHOULD] International layouts: beyond ⌘, use extra modifiers only with letters (on French layouts ⌥5 types "{").
- [SHOULD] Let the system localize and mirror shortcuts (right-to-left).
- [SHOULD] Modifier semantics while manipulating: ⌘-drag moves a group; ⇧-resize constrains aspect ratio; holding an arrow key nudges by the smallest unit; ⌥-drag duplicates (from pointing devices) and must behave the same with touch.
- [SHOULD] The ⌘-hold shortcut overlay on iPad is a flat list per category, so shortcut titles must make sense without their submenu context (discoverabilityTitle).
**Standard macOS shortcut table** (audit custom shortcuts against this for conflicts)
- File and app: ⌘N new, ⌘O open, ⌘S save, ⇧⌘S duplicate/Save As, ⌘W close window, ⇧⌘W close file, ⌥⌘W close all, ⌘Q quit, ⌘H hide, ⌘M minimize.
- App and help: ⌘, settings, ⌘? Help menu, ⌘. cancel operation, Esc cancel.
- Find: ⌘F find, ⌥⌘F jump to search field, ⌘G / ⇧⌘G next/previous match, ⌘E use selection for find, ⌘J scroll to selection.
- Edit: ⌘Z undo, ⇧⌘Z redo, ⌘A select all, ⇧⌘A deselect all, ⌘C/⌘X/⌘V, ⇧⌘V paste as, ⌥⇧⌘V paste and match style.
- Text and window: ⌘B/⌘I/⌘U text styles, ⌘T fonts, ⌥⌘T show/hide toolbar, ⌃⌘F full screen, ⌥⌘I inspector.
- Windows and alignment: ⌘` cycle windows, ⌘[ / ⌘] / ⌘| align left/right/center.
- Size: ⇧⌘- / ⇧⌘= decrease/increase selection size.
- Selection and navigation: ⌥⇧←/→ word-wise selection, ⇧⌘←/→ to line ends, ⌥⇧↑/↓ paragraph-wise, ⌃Tab next control group.
**Platform deltas**: macOS users nearly always have a physical keyboard and expect everything in the menu bar with shortcuts. iPadOS often has a keyboard; holding ⌘ shows the shortcut interface. iOS relies on FKA.

**Web (our translation)**
- Check the app's shortcut map against the table above and also against browser-reserved shortcuts. Do not hijack ⌘L/T/W/R/F (⌘F only if you provide a better in-app find and the default still makes sense); ⌘K is fine.
- Show shortcuts in menus and tooltips with macOS glyphs in ⌃⌥⇧⌘ order on Mac and "Ctrl+" on Windows.
- Tab and arrow keys must reach every interactive element.
- Esc closes the topmost layer.
- Single-key shortcuts must not fire while focus is in a text field.

**Slop tells (ours)**
- A ⌘K command palette as the only way in, with no menus.
- Shortcuts in non-canonical modifier order ("⌘⇧P").
- Shortcut hints shown as "Ctrl" on Mac.
- Custom shortcuts for rare actions while ⌘, (settings) and ⌘? (help) do nothing.
- Modals Esc cannot close.
- Arrow-key handling on buttons in an iPad app.

## Pointing devices
**Intent**: Pointer adds precision without replacing touch. Behavior is consistent across touch, pointer, keyboard and eyes; effects are functional, never decorative.

**Checks**
- [SHOULD] Avoid redefining systemwide trackpad gestures (Mission Control, Dock, swipe between pages). Users can customize them.
- [SHOULD] Same result across input modes (⌥-drag duplicates via touch and pointer).
- [SHOULD] Hovering the pointer reveals controls that auto-minimize or fade out (Safari toolbar, video playback controls).
- [SHOULD] Hit-region padding: about 12pt around bezeled elements, about 24pt around borderless elements. Too small feels fiddly; too large feels "sticky".
- [SHOULD] Hit regions are contiguous across bar buttons. No gaps, or the pointer flickers back to its default shape between them.
- [SHOULD] iPadOS effect choice: highlight for small, transparent-background elements (bar buttons, tab bars, segmented controls); lift for small, opaque elements (icons); hover (custom scale, tint, shadow) for large elements.
- [SHOULD] Magnetism applies to lift and highlight, not hover. Do not add magnetism to hover elements; it feels like losing control.
- [SHOULD] Provide the corner radius for custom lift elements so the pointer morphs cleanly (circles, for example).
- [SHOULD] Custom elements that behave like standard ones get the standard effects; without them they look broken.
- [SHOULD] No gratuitous or decorative pointer effects; keep custom pointer shapes simple.
- [SHOULD] Avoid displaying instructional text with the pointer.
- [CONSIDER] Useful pointer annotations (X/Y values over a graph; W×H while resizing, as in Keynote).
- [SHOULD] Hover-effect physics: scale only when there is room (not table rows); in tight spaces use tint only.
- [SHOULD] Shadow without scale does not work well: an unscaled element with a shadow reads as falsely elevated.
- [SHOULD] Distinguish pointer from finger only when it adds value (precise click-to-seek on a scrubber).
- [SHOULD] iPadOS 15+: band (rectangle) multi-select in custom views where it makes sense.
- [CONSIDER] Pointer accessories (resize arrows); animate accessory transitions for state changes (plus to circle.slash when an action becomes unavailable).
- [SHOULD] macOS cursor semantics are fixed: pointingHand = link only; open/closed hand = pan content; crosshair = precise rectangular selection; dragCopy = ⌥ during drag; dragLink = ⌥⌘; operationNotAllowed = invalid drop target; resize-* = edges; I-beam = text.
- [SHOULD] macOS: secondary click opens the context menu; force click opens Quick Look or lookup; smart zoom; swipe between pages.
**Platform deltas**: iOS has no extra considerations. iPadOS has the adaptive circle pointer, content effects and magnetism. macOS has classic cursors plus customizable gestures.

**Web (our translation)**
- `cursor: pointer` only on links and link-like navigation, not every clickable div (Apple: pointingHand = URL link). Native-style buttons keep the arrow under macOS conventions.
- Use `grab`/`grabbing` for pannable canvases, `not-allowed` on invalid drop targets, `crosshair` for marquee selection.
- Pad hit areas (about 12/24pt equivalents) and keep toolbar hit areas contiguous.
- Every hover affordance needs a touch and keyboard equivalent.

**Slop tells (ours)**
- Hover lifts with a drop shadow on every card, including dense list rows.
- Hover `scale(1.05)` that overlaps neighbors.
- Shadow-on-hover with no scale.
- Custom cursors or cursor-follower blobs.
- Tooltips that are instructions ("Click here to...").
- `cursor: pointer` on everything.
- 2 to 4px gaps between toolbar buttons that kill hover continuity.

## Gestures
**Intent**: Standard gestures mean the same thing everywhere. Custom gestures supplement visible controls, never replace them.

**Checks**
- [SHOULD] Every gesture action also has a non-gesture path (voice, keyboard, Switch Control, visible button).
- [SHOULD] Do not give tap or swipe a unique app meaning; do not invent a gesture for a standard action (activate, scroll).
- [SHOULD] Live feedback during the gesture that predicts the result and shows how far to go.
- [SHOULD] Indicate when a gesture is not available (locked object, a disabled button clearly distinct), or people think the app froze.
- [SHOULD] Custom gestures are discoverable, easy to perform, distinct, and not the only way to do something important. If it is hard to describe in simple words and graphics, it is too hard.
- [SHOULD] Shortcut gestures sit on top of visible controls (edge-swipe back plus a Back button).
- [SHOULD] Do not conflict with system-UI gestures (screen edges).
- [SHOULD] Standard map: tap = activate/select; swipe = reveal actions, dismiss or scroll; drag = move; touch-and-hold = more options; double-tap = zoom toggle; pinch = zoom; rotate = rotate. iOS/iPadOS extras: 3-finger swipe left = undo, right = redo; 3-finger pinch in = copy, out = paste; shake = undo; 4-finger swipe = app switch (iPad).
- [CONSIDER] Simultaneous gestures mainly suit games (joystick plus fire).
- [SHOULD] Transfers from visionOS: avoid requiring a specific hand or body position; keep content away from system overlay areas.
**Platform deltas**: macOS is keyboard and mouse first; gestures come via trackpad or Magic Mouse. iPadOS adds the 4-finger app switch.

**Web (our translation)**
- Swipe-to-delete or swipe-to-archive in a web list needs a visible or menu alternative.
- Do not capture horizontal swipes at the viewport edge (browser back) or pinch (zoom).
- Long-press menus need a right-click and a keyboard (Shift+F10 or the context-menu key) equivalent.

**Slop tells (ours)**
- "Swipe to discover" as the only nav.
- Hidden gesture-only actions with no affordance.
- Disabled states that look the same as enabled ones.
- Custom pull/drag interactions replacing native scroll.

## Focus and selection
**Intent**: Focus shows what input will act on. Use system effects; never move focus without user action.

**Checks**
- [SHOULD] Use system focus effects; build custom ones only if absolutely necessary.
- [SHOULD] Avoid changing focus without user interaction. Exception: with directional input (keyboard), if the focused item disappears, move focus to an item one step away. Otherwise hide the indicator.
- [SHOULD] iPadOS/macOS: give focus support to content (list items, text fields, search fields), not controls (FKA covers those).
- [SHOULD] Focus ring for text and search fields; full-row highlight for lists and collections. A focused list row is white text on an accent-color background; an unfocused selection is standard text on gray.
- [SHOULD] iPadOS: Tab moves between focus groups in reading order (leading to trailing, top to bottom); arrow keys move within a group. Define custom groups so order makes sense, and set a primary item priority per group.
- [SHOULD] Customize the halo to follow contours (rounded corners, Bezier paths); keep badges above it and do not let a parent clip it.
- [SHOULD] Transferable from tvOS: a focusable element has several distinct states (unfocused, focused, pressed, selected, unavailable); there are 5 in all. Supply assets at the larger focused size.
**Platform deltas**: Not supported in iOS beyond FKA. iPadOS uses focus groups.

**Web (our translation)**
- Visible `:focus-visible` ring on inputs.
- Roving tabindex plus arrow keys inside lists, grids and toolbars (one Tab stop per group).
- Never `outline: none` without a replacement.
- Never autofocus-jump after async loads.
- When a focused row is deleted, focus the neighbor.

**Slop tells (ours)**
- Focus rings removed globally.
- Tab stopping at every card in a grid.
- A focus ring on list rows instead of a row highlight.
- Modals that do not trap or return focus.

## Apple Pencil and Scribble
**Intent**: Pencil acts like a real marking tool: marks on contact, no modes. Scribble works in every text entry spot.

**Checks**
- [SHOULD] Mark the instant the Pencil touches. No "enter draw mode" button.
- [SHOULD] Every control also responds to Pencil (otherwise it seems broken or the battery seems dead).
- [SHOULD] Pressure maps to continuous properties (opacity, size); use tilt, azimuth and barrel roll for stroke character.
- [SHOULD] Place controls so neither the left nor right hand covers them; allow repositioning.
- [SHOULD] Hover: Preview the mark (size, color) at a mid-range value; do not vary the preview with height.
- [SHOULD] Hover: Avoid using hover to initiate an action.
- [SHOULD] Hover: Hover previews are for Pencil only, not the pointer.
- [SHOULD] Double-tap and squeeze: Respect the user's system setting.
- [SHOULD] Double-tap and squeeze: Custom modes are opt-in and the current mode is visible.
- [SHOULD] Double-tap and squeeze: Avoid using double tap to modify content. Define squeeze actions that are nondestructive and easy to undo (accidental triggers happen).
- [SHOULD] Double-tap and squeeze: Squeeze is a discrete action; show its UI near the Pencil tip.
- [SHOULD] Barrel roll modifies marking only, never navigation.
- [SHOULD] Scribble: Works in all text inputs except passwords; custom fields should not need a tap first.
- [SHOULD] Scribble: Writable blank areas where text is natural (Reminders: blank space below the last item).
- [SHOULD] Scribble: While writing, hide autocomplete and placeholder text; the field does not move, resize or autoscroll.
- [SHOULD] Scribble: Enlarge the field before writing or during pauses.
- [SHOULD] PencilKit: Turn off dynamic Dark Mode color adjustment when marking up PDFs or photos.
- [CONSIDER] PencilKit: Add undo/redo buttons in compact width (the tool picker lacks them there); support 3-finger undo.
**Platform deltas**: iPadOS only.

**Web (our translation)**: Pointer Events `pressure` and `tiltX`; `pointerType === 'pen'` gets instant ink. Do not reflow inputs on focus for pen users.

**Slop tells (ours)**: A draw-mode toggle before inking; toolbars pinned to the right edge where a right hand covers them.

## Action button
**Intent**: A hardware button that runs one of your App Shortcuts.

**Checks**
- [SHOULD] Expose essential tasks ("Start Egg Timer"), not "Open App" (the system already provides that).
- [SHOULD] Labels: Title Case, verb first, present tense, no articles or prepositions, max 3 words ("Start Race").
- [SHOULD] Do not duplicate the system's setup tips.
- [SHOULD] iOS: run without leaving context (Live Activity, snippet).
**Platform deltas**: iOS only for our purposes.

**Web (our translation)**: The 3-word, verb-first label rule works for any quick-action, PWA shortcut or command list.

**Slop tells (ours)**: "Open [App]" shortcuts; marketing-style action names.

## Camera Control
**Intent**: An iPhone 16 hardware control that overlays sliders and pickers on your viewfinder.

**Checks**
- [SHOULD] Use SF Symbols only (the system does not support custom symbols); symbols do not show state.
- [SHOULD] Short labels (they follow Dynamic Type).
- [SHOULD] Units on values (EV, %).
- [SHOULD] Define prominent (snap) values.
- [SHOULD] Keep your UI out of the overlay area; do not duplicate controls while the overlay shows.
- [SHOULD] Disable controls that do not apply to the mode (you cannot add or remove controls at runtime).
- [SHOULD] Common controls in the middle.
- [CONSIDER] A locked-camera extension.
**Platform deltas**: iPhone only.

**Web (our translation)**: Slider readouts always show units; snap points at common values.

**Slop tells (ours)**: None.

## Gyroscope and accelerometer
**Intent**: Motion input only where it brings a tangible benefit.

**Checks**
- [MUST] Write purpose copy for the permission prompt.
- [SHOULD] Use motion only for tangible benefit; do not collect it "to have the data".
- [SHOULD] Outside gameplay, do not drive UI with motion: it is hard to repeat precisely, hard for some people to perform, and costs battery.
**Platform deltas**: None stated.

**Web (our translation)**: Avoid tilt or parallax UI driven by `deviceorientation`; iOS Safari requires a permission prompt anyway.

**Slop tells (ours)**: Gyro-parallax hero cards; shake-to-do-something as the only path.

## Sign in with Apple
**Intent**: Ask for sign-in only in exchange for value, as late as possible. Respect privacy choices. Strict button branding, which App Review checks.

**Checks**
- [SHOULD] Tell people what they get from signing in (personalize, sync, unlock).
- [SHOULD] Delay sign-in as long as possible; let people explore first.
- [SHOULD] If an account is required, explain why before showing sign-in options.
- [SHOULD] Commerce: sign-up comes after purchase (guest checkout; create the account on the confirmation page, prefilled).
- [SHOULD] After sign-in, welcome people right away; do not ask for non-required data.
- [SHOULD] Mark optional fields as optional; never gate features on optional data. Show the data you received (greet by the shared name or relay email).
- [MUST] Do not ask for a password.
- [SHOULD] Avoid asking for a personal email when the person chose a private relay address.
- [SHOULD] Show "Using Sign in with Apple" in account settings.
- [CONSIDER] Account linking when the email matches.
- [MUST] The button is no smaller than other sign-in buttons and never requires scrolling to reach it.
- [SHOULD] Sizes: minimum 140×30pt; margin at least 1/10 of button height. Custom buttons: title-to-right-edge margin at least 8% of width; title font about 43% of button height; PNG logos only at 44pt height (44×44 for logo-only); logo-only is 1:1.
- [MUST] Titles are only "Sign in with Apple", "Sign up with Apple" or "Continue with Apple".
- [MUST] Logo and text are both black or both white; no custom colors; text buttons are rectangular.
- [MUST] Never crop the logo, add vertical padding, or use the logo as the button.
- [MUST] Never use the black style on black or dark backgrounds.
- [SHOULD] Styles: white on dark; white-outline on light backgrounds that lack contrast; black on light. Corner radius may match your other buttons (square to capsule).
**Platform deltas**: Works on the web and non-Apple platforms.

**Web (our translation)**: Use Apple's JS button. Keep the social sign-in buttons the same size, Apple's not smaller, and visible without scrolling. Never put a login wall on the landing page.

**Slop tells (ours)**
- A splash followed by a "Create account" wall before any value is shown.
- Social buttons in brand colors, with Apple's restyled to match a gradient theme.
- The Apple button smaller or tucked under "More options".
- "Enter your email to continue" right after the person picked Hide My Email.

## Apple In-App Purchase and paywalls
**Intent**: Value first, honest pricing, effortless sign-up, easy cancel. In-App Purchase is for digital goods; Apple Pay is for physical goods. Rebranded September 2026.

**Checks**
- [SHOULD] Let people experience the app before purchase; consider limited free access (freemium, metered paywall or free trial).
- [SHOULD] The store looks like your app, not a separate app.
- [SHOULD] Product names are short enough not to truncate or wrap.
- [MUST] Show the total billing price for every purchase. The billed amount is most prominent; per-month breakdowns are subordinate.
- [SHOULD] Hide the store or explain why it is unavailable when `canMakePayments` is false.
- [MUST] Do not modify or replicate the system confirmation sheet.
- [MUST] The sign-up screen shows the subscription name, duration and what each period includes; the localized billing amount; restore or sign-in for existing subscribers; and links to Terms and Privacy.
- [MUST] Intro offers show the intro price, the offer duration, and the standard price after the offer ends.
- [MUST] Free-trial copy says that payment starts automatically when the trial ends, and how much.
- [SHOULD] Do not pitch subscriptions to existing subscribers (they will think it lapsed). Offer sign-in for cross-platform subscriptions.
- [SHOULD] Prompt at relevant moments (near the free limit), not randomly.
- [SHOULD] Put a subscribe entry point in Settings.
- [SHOULD] Ask only for necessary info at sign-up.
- [SHOULD] The subscription summary in account screens shows the renewal date.
- [SHOULD] Make cancel easy. A buried manage-subscription link reads as obstruction. A retention offer on cancel is allowed.
- [SHOULD] Refund help: A simple "Refund" or "Request a Refund" label.
- [SHOULD] Refund help: The refund button needs no scrolling or extra screen.
- [SHOULD] Refund help: Show product image, name and date so people can find the purchase.
- [MUST] Refund help: Do not characterize or speculate on Apple's refund policy.
- [SHOULD] Family Sharing: put "Family" or "Shareable" in the name; write copy that works for both the buyer and family members.
- [SHOULD] Offer codes: custom codes are alphanumeric ASCII only; tell people where to redeem them (not App Store settings); "Redeem Code" on the paywall or settings; welcome people after redemption, including those who subscribed before first launch.
**Platform deltas**: Transferable from watchOS and tvOS: the same required info appears on small or remote surfaces, in a compact modal with a clear Close, and options stay easy to compare.

**Web (our translation)**: For web or Stripe paywalls, apply the IAP disclosure rules as an advisory baseline (tag Web, not MUST, because web sits outside IAP and App Review): total price prominent, renewal terms, trial auto-charge disclosure, restore/sign-in link, one-click cancel in account settings. They match baseline UX ethics and the FTC "click to cancel" rule. Deceptive patterns (fake timers, hidden cancel) still go to the Trust section as Blockers.

**Slop tells (ours)**
- A paywall on first launch before any value.
- A close "X" faded to 20% opacity or delayed.
- "$0.99/week" shown big while the $51.48/yr actually billed is tiny.
- A pre-toggled "Free trial enabled" switch with no auto-charge date.
- Three-tier cards with the middle one "MOST POPULAR" and none showing billing totals.
- No Restore button.
- Fake countdown timers.
- Cancel only via email support.

## Apple Pay
**Intent**: Physical goods, services and donations. Apple Pay is primary when available; use system buttons; collect essential info only.

**Checks**
- [MUST] If you check for an active Wallet card, Apple Pay must be the primary (not sole) option everywhere; do not push it into a separate step.
- [SHOULD] Pre-select it, show it first or larger, separate it with a line.
- [MUST] Use only Apple's API buttons; never draw your own.
- [MUST] A custom button cannot say "Apple Pay" or show the logo; show the mark elsewhere on the page instead.
- [MUST] The mark is not a button.
- [MUST] Do not hide or disable the Apple Pay button. If size or color is missing, tap, explain, then auto-navigate to the missing field.
- [SHOULD] Collect options, multi-shipping and pickup location before the sheet; optional data (gift notes) before or after.
- [SHOULD] No account required before purchase (offer it on the confirmation page, prefilled).
- [SHOULD] Payment sheet: essential fields only (no shipping address for e-gift cards); line items for fees, discounts, pending amounts and recurring charges, not a product list; "Pay [Business]" uses the statement name; "Pay [End merchant] (via [You])" for marketplaces; "Amount Pending" when the final total is not known yet.
- [SHOULD] Let the sheet show progress; no extra spinners.
- [SHOULD] Show an order confirmation page; use the "1234 (Apple Pay)" format if you mention it.
- [SHOULD] Validation: lenient parsing (drop Zip+4 extra digits; accept phones with or without dashes or country code). Specific errors ("Zip code doesn't match city"): noun phrase, sentence case, no final period, 128 characters or fewer.
- [SHOULD] Subscriptions: show trial amount ($0), regular amount and start date as line items; show the sheet only when a change adds cost.
- [SHOULD] Donations: preset $25/$50/$100 plus Other.
- [MUST] Sizes: Apple Pay button minimum 100×30pt; captioned buttons (Buy, Book, Check Out, Donate, Subscribe, Set Up) minimum 140×30pt; margins 1/10 of height; mark clear space 1/10 of height; mark height at least that of other payment marks.
- [SHOULD] Placement: right of "Add to Cart" side by side, above it when stacked; no smaller than other payment buttons; no scrolling needed.
- [SHOULD] Website icon 60×60pt (120px @2x, 180px @3x).
- [MUST] Text: "Apple Pay", never plural, possessive or translated; never use the Apple logo to stand for the name; a text-only listing only if every payment option is text-only.
- [SHOULD] ® on the first US body-text mention, not in a checkout selection option.
**Platform deltas**: Same on iOS, macOS and the web. On the web it can be paid via a nearby iPhone or Watch or a QR code.

**Web (our translation)**: Apple-stated for web: same rules; a privacy statement is required; list Apple Pay in schema.org product markup; do not open new windows during checkout.

**Slop tells (ours)**: A greyed-out "Buy" button until the form is valid; a generic "Something went wrong"; checkout that pops a new tab.

## Mac Catalyst
**Intent**: A Mac version of an iPad app must feel like a Mac app, not an iPad layout in a window.

**Checks**
- [SHOULD] The iPad idiom scales to 77% (17pt becomes 13pt). The Mac idiom renders at 100%, so audit layout, fonts and assets (use a separate asset catalog).
- [SHOULD] Tab bar becomes a sidebar split view (preferred) or a segmented control; list top-level items in the View menu.
- [SHOULD] Offer Next/Previous buttons as well as swipe gestures.
- [SHOULD] Top-down flow: important actions go in the window toolbar. Move bottom- and side-edge buttons (an iPad reach convenience) into the toolbar.
- [SHOULD] Every command lives in the menu bar.
- [SHOULD] Multi-column layouts; an inspector beside content instead of a popover.
- [SHOULD] Every object has a context menu.
- [SHOULD] Make a Mac-style app icon.
**Platform deltas**: Mac users expect keyboard navigation, shortcuts, free window resizing and multiple windows.

**Web (our translation)**
- A desktop web app should not be a stretched mobile layout: no bottom tab bar on desktop, toolbar at the top.
- Right-click menus on objects; inspector side panels instead of popovers at wide widths.
- Desktop shortcuts.

**Slop tells (ours)**
- Responsive sites that keep the mobile bottom-nav and FAB on a 1440px screen.
- A single centered 400px column on desktop.
- A hamburger menu on desktop.

## iCloud
**Intent**: Sync is invisible and safe.

**Checks**
- [SHOULD] Sync is invisible; do not ask which documents to keep in iCloud. At most, offer a one-time all-or-nothing choice.
- [SHOULD] No alert when iCloud is off; show an unobtrusive note that changes will not sync.
- [SHOULD] Subtle feedback if a download takes longer than a few seconds.
- [SHOULD] Do not store regenerable data (it costs people storage).
- [SHOULD] Sync state such as last page read. Sync only settings people want on all devices.
- [SHOULD] Warn that deletes apply on every device.
- [SHOULD] Resolve conflicts automatically when possible, otherwise with an unobtrusive prompt, early.
- [SHOULD] Include cloud content in search results.
**Platform deltas**: None stated.

**Web (our translation)**: Cross-device sync with no "Sync now" button; the delete confirmation says "from all your devices"; an offline banner instead of an error modal.

**Slop tells (ours)**: Sync status spinners everywhere; a "Sync" button.

## Siri and App Intents
**Intent**: Expose actions and entities so Siri, Spotlight and Shortcuts can act. Responses are terse, voice-safe and device-independent.

**Checks**
- [SHOULD] Expose the most popular actions; use people's terms ("song" versus "track").
- [SHOULD] Donate relevant content (recents, favorites), not everything.
- [MUST] No ads, marketing or IAP pitches in Siri content.
- [SHOULD] Specific follow-ups ("Which soup?" not "Which one?").
- [SHOULD] Succinct responses with no humor (repeated responses get grating).
- [SHOULD] The voice response stands alone without visuals; no device-specific wording.
- [SHOULD] Leave your app name out of responses (the system attributes it).
- [SHOULD] Pronoun-neutral wording ("Who should I send it to?").
- [SHOULD] When the list is too long, ask an open question instead.
- [SHOULD] Specific errors ("out of chicken noodle soup").
- [MUST] Do not impersonate Siri or Apple; do not use reserved phrases ("Hey Siri", "Call 911"); call Siri by name, never "she"; translate only "Hey" in "Hey Siri".
**Platform deltas**: None stated.

**Web (our translation)**: For any assistant or agent replies in your app: terse, no jokes, no self-naming, specific clarifying questions, specific errors.

**Slop tells (ours)**: A chatty assistant persona with jokes and emoji; "Sure! I'd be happy to help with that!" preambles; "Which one?" clarifiers.

## Maps
**Intent**: Maps stay interactive, legible under your data, and carry required attribution.

**Checks**
- [SHOULD] Maps are interactive; do not cover them with non-interactive overlays.
- [SHOULD] Muted emphasis style when your content is dense; default style otherwise.
- [SHOULD] Search plus category filters.
- [SHOULD] Distinct outline and color on selected elements.
- [SHOULD] Cluster overlapping points of interest.
- [MUST] The Apple logo and legal link are not permanently covered: about 7pt side and 10pt top-bottom padding; fixed to the map; placed 10pt above a bottom card's lowest resting position. Hidden on maps smaller than 200×100px.
- [SHOULD] Annotation glyph text is 2 to 3 characters.
- [SHOULD] Contrast for controls over the map (thin stroke or light shadow).
- [MUST] A place card shown outside a map must include a map. Keep the location visible next to the card; do not duplicate info.
- [SHOULD] Indoor maps: Detail scales with zoom.
- [SHOULD] Indoor maps: The floor picker uses numbers.
- [SHOULD] Indoor maps: Dim surrounding context areas.
- [SHOULD] Indoor maps: Limit scrolling outside the venue.
- [SHOULD] Indoor maps: Do not imitate the Apple Maps look.
- [SHOULD] Transfers from watchOS: a static map with 5 annotations or fewer, in the smallest region that fits.
**Platform deltas**: None stated.

**Web (our translation)**: Same for Mapbox and Google embeds: muted base map under rich data, clustering, attribution kept visible.

**Slop tells (ours)**: A decorative non-interactive map screenshot as a hero background; a saturated base map under colorful data pins.

## Live Photos
**Intent**: Treat a Live Photo as one unit of motion plus still.

**Checks**
- [SHOULD] Apply edits to all frames, or offer conversion to a still.
- [MUST] Do not split a Live Photo into separate frames or audio.
- [SHOULD] Preview before sharing; offer sharing as a still.
- [SHOULD] Show download progress and when it is playable.
- [SHOULD] Mark a Live Photo with a hint of motion or the system badge, in a consistent corner.
- [MUST] Never use a play-button glyph (it reads as video).
**Platform deltas**: None stated.

**Web (our translation)**: Do not badge animated thumbnails as video unless they are.

**Slop tells (ours)**: A play-button overlay on animated thumbnails that are not videos.

## Photo editing
**Intent**: Editing extensions behave like part of the host.

**Checks**
- [SHOULD] Confirm Cancel only if edits exist.
- [MUST] Do not provide a custom top toolbar; the host modal already has one.
- [SHOULD] Preview before commit.
- [SHOULD] The extension uses your app icon.
**Platform deltas**: None stated.

**Web (our translation)**: Embedded editors confirm a discard only when the document is dirty, and never stack toolbars.

**Slop tells (ours)**: None.

## SharePlay
**Intent**: Shared real-time experiences with low friction.

**Checks**
- [SHOULD] Real-time only; provide save/share for async afterward.
- [SHOULD] The start button uses the SharePlay symbol.
- [SHOULD] Join with minimal friction; defer setup steps (profiles after joining).
- [SHOULD] Show who changed what (initials next to contributions, as in Freeform).
- [SHOULD] Comfort settings (volume, subtitles) are per participant.
- [SHOULD] Easy leave and rejoin.
- [MUST] "SharePlay" never takes an adjective or inflection (no "SharePlaying").
- [SHOULD] Picture-in-picture for shared video (iOS, iPadOS, macOS).
- [SHOULD] Transfers from visionOS: when people leave, keep seats in place; last change wins for conflicts, with no take-control UI; roles are independent of seats. Spatial seating (up to 5 Personas, seats at least 1m apart) is dropped as spatial-only.
**Platform deltas**: None for phone and desktop.

**Web (our translation)**: Multiplayer and collaboration web apps: presence avatars plus attribution on edits, per-user view prefs, join links that land directly in the session.

**Slop tells (ours)**: A "Join" flow with an onboarding carousel before the shared content.

## Augmented reality
**Intent**: Camera-first, comfortable, and honest about tracking limits.

**Checks**
- [SHOULD] Hide AR features on unsupported devices; do not show an error.
- [SHOULD] Full-screen camera with minimal UI.
- [SHOULD] 60 fps scene updates.
- [SHOULD] Prefer small or coarse reflective surfaces.
- [SHOULD] Persistent controls in screen space, translucent, reachable without changing grip.
- [SHOULD] Comfort and safety: introduce movement gradually; avoid sweeping motions.
- [SHOULD] Coaching: use the system coaching view and hide other UI during it.
- [SHOULD] Placement: Place instantly, then refine; nudge objects onto the detected plane.
- [SHOULD] Placement: Guide people to offscreen objects with edge indicators.
- [SHOULD] Placement: Use plane classification (floor, table).
- [SHOULD] Placement: Do not snap precisely to plane edges.
- [SHOULD] Manipulation: Direct manipulation with standard gestures (1-finger drag moves, 2-finger rotates).
- [SHOULD] Manipulation: Generous hit tolerance near objects.
- [SHOULD] Manipulation: Do not scale real-product objects (furniture); never use scaling to fake distance.
- [SHOULD] Manipulation: Test pinch versus rotate conflicts.
- [SHOULD] Image anchors: Wait up to 1s before removing content when an image is lost.
- [SHOULD] Image anchors: Keep 100 or fewer reference images active.
- [SHOULD] Interruptions and errors: Hide objects during relocalization; allow reset or cancel.
- [SHOULD] Interruptions and errors: Indicate face-tracking loss after about 0.5s.
- [SHOULD] Copy avoids jargon: "Try moving your phone more slowly", not "Excessive motion detected". 3D hints (a rotation ring) beat text overlays. 3D text faces the viewer at a constant size.
- [MUST] The AR glyph and badges stay unaltered (size and color only for the glyph); 10% clear space; badge only when the catalog mixes AR and non-AR items; same corner every time.
**Platform deltas**: iOS and iPadOS; no macOS.

**Web (our translation)**: WebXR, `<model>` and Quick Look links: feature-detect and hide when unsupported; badge only the AR-capable products.

**Slop tells (ours)**: Error copy that leaks tech terms ("tracking lost", "insufficient features").

## Skimmed technologies
Skim-only. Principles that transfer to phone, desktop and web.

- **Digital Crown**: Rotary input drives the main navigation; UI updates at the speed people turn it; every rotation gets visual feedback. Web: the same applies to scroll-wheel-driven value controls.
- **Eyes (visionOS)**: Targets need at least a 16pt margin or 60pt center-to-center spacing. Transferable: space targets so near-misses do not hit neighbors. Other eye-tracking detail is dropped as spatial-only.
- **Game controls**: Touch controls 44×44pt (frequent) or 28×28pt (menus); a visible plus tactile press state that stays visible under a finger (a glow, say); symbols over text for controller buttons; auto-detect a controller and switch on-screen glyphs to match; single-key bindings, remappable.
- **Nearby Interactions and remotes**: Continuous feedback; never the only way to do a task; Back goes to the parent screen; tell press from tap and ignore accidental taps.
- **AirPlay**: Prefer the system player; do not stop playback on background or lock; do not interrupt other audio unless your content is immersive; keep the app usable during playback; never use the AirPlay icon or name in a custom button.
- **Always-on**: Hide sensitive info when dimmed; dim secondary content and keep the layout stable; ease motion to rest instead of stopping it abruptly.
- **App Clips**: Finish the task without an account (offer Sign in with Apple and Apple Pay); linear, focused UI with no web views; recommend the full app politely and only after the task; not for marketing only; header images without text. Transferable: lightweight entry flows skip install and sign-up walls.
- **CareKit**: Task styles matched to the task (simple, instructions, log, checklist, grid); charts with clear labels, distinct colors, a legend and explicit time units; minimize notifications.
- **CarPlay**: Glanceable layout with limited colors; interactive and non-interactive elements never share a color; test in real lighting; report errors on the surface the person is using.
- **Game Center**: Keep controls away from system overlay points; succinct achievement copy; show progress.
- **HealthKit**: Activity rings only for Move, Exercise and Stand; never as decoration or branding; the Health icon is never a button (1/10 clear space); ask for health data only when needed. Transferable: do not borrow system visual idioms for other meanings.
- **HomeKit**: Use the system setup flow with no account or personal info required; do not duplicate system settings; tech icons are non-interactive.
- **ID Verifier**: Ask only for the data you need; an explicit button to start verification.
- **iMessage apps and stickers**: One primary experience; essentials in compact view; edit text only in expanded view; localized alt text for stickers.
- **NFC**: Say "scan" or "hold near", not "tap" or "touch"; succinct instructions.
- **ResearchKit**: Consent split into digestible sections plus an optional comprehension quiz; check eligibility early; a dashboard shows progress.
- **ShazamKit**: Stop recording the moment you have enough; storing to the library is opt-in. Transferable: the shortest possible use of mic or camera, with a clear indicator.
- **Tap to Pay on iPhone**: The option is visible even before setup is done; final amount fixed before the payment UI; progress while authorizing, then a clear declined or approved result; errors give an actionable fix plus a path to help.
- **Wallet**: Get permission before deleting passes; change messages only for time-critical updates; an uncluttered pass front; ask for ID data at the exact moment it is needed and say how long it is kept; no duplicate notifications.

## Cross-cutting principles
1. Never one input only. Every gesture, hover, motion, Pencil, hardware-button or voice action has a visible, keyboard-reachable, accessible equivalent.
2. System conventions are a contract. Standard shortcuts, gestures, cursors, focus effects, payment and sign-in buttons, and system sheets are not yours to restyle or repurpose. Apple says "don't replicate/modify" for the IAP confirmation sheet, Apple Pay buttons, the AR glyph, Activity rings and Live Photo badges.
3. Accidental-trigger safety. Imprecise inputs (hover, double-tap, squeeze, motion, proactive AI) must never do destructive or content-changing things.
4. Earn the ask. Sign-in, paywalls, calibration, permissions and feedback requests come after people see value and are minimal, voluntary, and explained in terms of benefit.
5. Specific beats generic copy. "Finding substitutions for ingredients" over "Processing..."; "Zip code doesn't match city" over "Address is invalid"; "Which soup?" over "Which one?"; "Try moving your phone more slowly" over "Excessive motion detected"; "Suggest less pop music" over "Dislike". This is the most testable anti-slop rule in this file.
6. Reversibility and visible effect. Undo/Retry/Edit near outputs; corrections apply instantly and persist; feedback visibly changes the result.
7. Translate numbers into meaning. Confidence becomes rank, semantic bands or actionable advice; raw percentages only in statistical domains.
8. Honest money UI. Total billed amount most prominent; trial auto-charge disclosed; Restore present; cancel easy; Apple Pay never hidden or disabled (validate after the tap instead).
9. Functional, not decorative, feedback. Pointer effects, hover, focus and motion carry information. Apple rejects decorative pointer effects, shadow-without-scale and instructional pointer text.
10. Platform-idiom translation. iPad to Mac means bottom and side controls move to the toolbar and menu bar, the tab bar becomes a sidebar, and every object gets a context menu. The same applies to mobile to desktop web.
