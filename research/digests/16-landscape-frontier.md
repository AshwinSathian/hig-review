# 16 — Landscape and frontier: platform capabilities, category playbooks, AI-native UX, identity mechanisms

Scope: what best-in-class looks like right now, so hig-review can (1) research a product's category and peers before judging it and (2) propose enhancements and reworks, not only fixes. Covers Apple 26/27 platform capabilities, web Baseline 2025–2026, eleven category playbooks, AI-native UX patterns, and brand/identity mechanisms. Compiled 2026-10-26.

**Framing rule:** Apple HIG stays the base. This file is a lever list, not a rule list. A frontier move earns a recommendation only when it serves the product's job and its users. "Everyone in the category does X" is evidence of a convention to keep or a cliché to avoid, never a reason on its own. On Apple platforms, HIG rules win over category fashion.

**Provenance:** [F] = I read the page during this session (fetched, or its live JSON/API). [S] = seen only in a search-result snippet or a secondary write-up. "(unverified)" = could not be confirmed from either; treat it as a lead. Dates are the page's date; where a page is undated, the access date 2026-10-26 is given. Most 2026 product facts come from trade press [S]. Primary pages [F] include: Apple newsroom ADA 2026, WWDC26 topic guides (SwiftUI, Design, Apple Intelligence, iOS, iPadOS, macOS), WWDC26 sessions 250 and 251, HIG Materials, Adopting Liquid Glass, HIG Generative AI, webstatus.dev API, web.dev Baseline digests Jan–Jul 2026, Linear design-refresh post and changelog, Stripe Sessions 2026, Baymard checkout 2025, OpenAI Apps SDK UI guidelines, MCP Apps announcement, several NN/g articles.

Tags: [EXPECTED] = users or reviewers now assume it in this context; missing it is a finding. [LEVER] = a frontier move worth proposing when it fits. [AVOID] = convergence or slop; flag it if the product leans on it.

---

## 0. How the skill should use this file

- Landscape step: name the category (Section B), list 3–5 leaders/challengers, then check the product against that category's [EXPECTED] and [AVOID] lists before judging craft.
- Enhancement step: draw proposals from Section A (platform capabilities the product isn't using), the category's frontier moves, Section C (if AI is involved) and Section D (if identity is weak or generic). Every proposal names the peer that does it and why it fits this product.
- Dates matter. Anything here is a snapshot as of 2026-10-26. A reviewer should re-check fast-moving facts (AI features, Baseline status) before stating them as current.
- Strongest single signal from 2025–2026: decent UI is now cheap, so taste, restraint and context set products apart. NN/g *State of UX 2026* predicts "AI fatigue", says teams that let AI "fade into the background" will win, and names trust as the major design problem — https://www.nngroup.com/articles/state-of-ux-2026/ (2026-01-16) [F, via subagent].

---

## A. Platform capabilities a 2026 app should consider

### A1. Apple — the 26 baseline (shipped Sep 2025) and what 27 adds (WWDC26, 2026-06-08)

Release context: iOS/iPadOS/watchOS/tvOS/visionOS 27 and macOS 27 ("macOS Golden Gate") announced 2026-06-08; developer betas same day — https://macrumors.com/2026/06/08/wwdc-2026-recap (2026-06-08) [F]. Public release was expected in September 2026 [S]. Apple's WWDC26 guides call these the "2027 releases" — https://developer.apple.com/wwdc26/guides/swiftui/ [F].

**Liquid Glass (26) and its refinements (27)**
- What it is: a dynamic material that forms "a distinct functional layer for controls and navigation", floating above content. Two variants: regular (blurs and adjusts luminosity; for text-heavy parts such as alerts, sidebars, popovers) and clear (highly translucent; only over visually rich media, with a ~35% dark dimming layer when the content behind is bright). Four standard materials (ultraThin, thin, regular, thick) stay for the content layer — https://developer.apple.com/design/human-interface-guidelines/materials (accessed 2026-10-26) [F].
- HIG rules a reviewer can quote: "Don't use Liquid Glass in the content layer" (exception: transient interactive parts like a slider knob while dragged); "Use Liquid Glass effects sparingly"; pick a material for its meaning, not the colour it imparts; use vibrant colours on materials — same page [F].
- Adoption guidance: rebuild with the current SDK to inherit the look; remove custom backgrounds on NavigationStack/NavigationSplitView/toolbars/UITabBar/UINavigationBar/NSToolbar etc.; use `glassEffect(_:in:)` / `UIGlassEffect` / `NSGlassEffectView` only on the most important custom controls; prefer button styles `.glass` / `.glassProminent`; register custom bars for the scroll edge effect via `safeAreaBar(edge:alignment:spacing:content:)` or `UIScrollEdgeElementContainerInteraction`; use concentric shapes (`ConcentricRectangle`, `rect(corners:isUniform:)`); group toolbar items, separate with `ToolbarSpacer`; give every icon an accessibility label; don't mix text and icons in one toolbar group; hide the toolbar item, not the view inside it; set the source of action sheets so they originate from the control; section headers now use title case, not all caps; `backgroundExtensionEffect()` stretches hero content under sidebars; tab bars can minimise on scroll and adapt into sidebars (`sidebarAdaptable`) — https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass (accessed 2026-10-26) [F].
- Settings to test: people can pick a preferred Liquid Glass look in Settings, and Reduce Transparency / Increase Contrast / Reduce Motion change the effect — both Apple pages above [F]. iOS 27 adds a transparency slider — https://macrumors.com/2026/06/08/wwdc-2026-recap [F]. WWDC26 describes "refreshed materials, refined typography, and updated tab and navigation bars" without naming APIs — https://developer.apple.com/wwdc26/guides/ios/ [F].
- Opt-out is ending: apps built with the Xcode 27 SDK ignore `UIDesignRequiresCompatibility` (Apple forum answer) — https://developer.apple.com/forums/thread/832543 [S]. An "April 2027 App Store deadline" is unconfirmed — https://www.baytechconsulting.com/blog/liquid-glass-app-store-deadline-misunderstood [S].
- Field signal: apps that adopted glass over media then added opacity back (Pocket Casts made the mini-player larger and more opaque) — https://macmagazine.com.br/post/2026/07/07/app-pocket-casts-recebe-ajustes-na-interface-apos-adotar-o-liquid-glass/ (2026-07-07) [S]. Moonlitt won the 2026 ADA for Interaction partly for "strong Liquid Glass integration" — https://www.apple.com/newsroom/2026/06/apple-reveals-winners-of-the-2026-apple-design-awards/ (2026-06-02) [F].
- Earns its place: always on Apple platforms (it comes free with standard components). The review question is whether the app fights it.
- Review questions: Is any custom bar background or blur still drawn under system bars? Is glass used in the content layer or stacked glass-on-glass? Does every glass control stay legible with Reduce Transparency, Increase Contrast and the 27 transparency slider at both ends? Is brand colour in the content, not painted on the bars?

**Brand within the system (WWDC26 session 251)**
- Apple's own position: treat the app as two layers; "the content layer is the best opportunity to express your brand identity"; "move color into the content area of your app, into the scroll view"; use colour "sparingly and with intention"; custom fonts must support Dynamic Type; custom icons must stay recognisable and keep platform meanings (NYT Cooking's Share icon); "forcing your brand can compromise the user experience". Examples: Crumbl, Moonlitt, NYT Cooking, Gentler Streak (identity from SF width variants and SF Rounded only), Slack — https://developer.apple.com/videos/play/wwdc2026/251/ (2026-06) [F].
- Review question: Does identity live in content (imagery, type, motion, voice) while chrome stays native?

**Design principles page (WWDC26 session 250)**
- Eight principles: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity ("we don't mean minimal… every element earns its place"), Craft, Delight ("not adding confetti"). Responsibility explicitly covers AI harm: "consider removing features entirely, if the risks… outweigh the value" — https://developer.apple.com/videos/play/wwdc2026/250/ (2026-06) [F]. Useful as named criteria for enhancement proposals.

**App Intents, Siri, Spotlight, Apple Intelligence**
- 27 adds: App Intents schemas (task management, photo editing, communication and more); entity schemas that feed the Spotlight semantic index with attribution to the app; intent schemas so people act on content in natural language with no custom phrases; View Annotations API that maps on-screen views to entities so Siri can act on "this"; `AppIntentsTesting` to validate Siri/Shortcuts/Spotlight paths without UI automation; Core Spotlight LLM search (session 246). Sessions 240, 343, 344, 345, 295 — https://developer.apple.com/wwdc26/guides/apple-intelligence/ [F].
- System context: new Siri ("Siri AI") with a Siri app on iOS 27 and macOS; Shortcuts can be created in natural language; rich Siri conversations start from Spotlight on macOS; Siri AI reportedly runs on Google Gemini models, needs a waitlist, and isn't in the EU this year — https://macrumors.com/2026/06/08/wwdc-2026-recap [F; the Gemini claim is MacRumors' reporting].
- NN/g's read of the new Siri: its strength is context, not intelligence; show which sources were searched; carry confirmed details forward; confirm before sending — https://www.nngroup.com/articles/ai-assistant-context/ (2026-10-09) [F, via subagent].
- Earns its place: any app with nouns people would name aloud (tasks, notes, orders, trips, playlists, accounts). Low value for pure games or one-screen tools.
- Review questions: Are the app's core objects exposed as entities (so Spotlight and Siri can find them) and core verbs as intents adopting a schema? Can a person say "add this to…" about what is on screen? Are intent results shown as snippets that follow HIG "Snippets"? Is the integration tested with AppIntentsTesting?

**Foundation Models framework (on-device LLM; new in 26, much extended in 27)**
- 27 adds: a Language Model protocol so the same Swift API drives Apple's models or cloud models (Claude and Gemini named); multimodal prompts; Vision tools (OCR, barcodes) callable by the model; Dynamic Profiles to swap model/tools/instructions mid-session; free Private Cloud Compute access for Small Business Program apps under 2M first-time downloads; Evaluations framework; fm CLI and Python SDK; Instruments for agent debugging. Sessions 241, 242, 243, 298, 299, 319, 334, 335, 339 — https://developer.apple.com/wwdc26/guides/apple-intelligence/ [F].
- New Core AI framework for running your own models on-device (replaces bespoke Core ML plumbing for many cases; sessions 324–326) — https://developer.apple.com/wwdc26/guides/ios/ [F].
- Earns its place: summarising, classifying, extracting or rewriting the user's own data privately and offline; small agentic flows over the app's own tools. Not for facts the model can't verify (HIG Generative AI).
- Review questions: Is AI used where on-device would avoid sending personal data to a server? Is there an Evaluations suite, or is quality judged by vibes? Does every generated result have edit/undo/retry and a non-AI path (Section C)?

**Widgets, controls, Live Activities**
- 27: widgets customisable through App Intents and "dynamic styling" (session 277) — https://developer.apple.com/wwdc26/guides/ios/ [F]. Apple Weather added an extra-large iPhone widget size in 27 — https://9to5mac.com/2026/06/17/apple-weather-gets-two-brand-new-features-in-ios-27/ (2026-06-17) [S].
- 26 background: AlarmKit lets third-party alarms/timers break through Silent and Focus, with system alert UI and custom Live Activity states — https://developer.apple.com/videos/play/wwdc2025/230/ (2025-06) [S]. Live Activities on CarPlay (Flighty uses this) — https://www.executivetraveller.com/news/flighty-ios-26-update (2025-09) [S]. Interactive widgets (17) and Control Center / Lock Screen controls (18) are background; Live Activities on the Mac menu bar in macOS 26 (unverified).
- NowPlaying framework (27) connects playback to Lock Screen, Control Center, Dynamic Island and CarPlay — https://developer.apple.com/wwdc26/guides/ios/ [F].
- Earns its place: anything with a time-bound state (delivery, ride, flight, timer, game score, workout, build) → Live Activity; anything glanceable → widget; one-tap toggles → control.
- Review questions: Does a time-bound task have a Live Activity with a sensible end state? Are widgets interactive where a tap would otherwise open the app? Is there a control for the single most frequent action?

**iPadOS 26/27**
- 26: freely resizable windows with close/minimise/tile controls, Exposé, a menu bar revealed by swiping down or moving the pointer to the top, menu-bar search, "developers can now customize the menu bar in their own apps", Background Tasks API with Live Activity progress — https://www.apple.com/newsroom/2025/06/ipados-26-introduces-powerful-new-features-that-push-ipad-even-further/ (2025-06-09) [F]. Adoption doc: "Support arbitrary window sizes", use split views for fluid column reflow — Adopting Liquid Glass [F].
- 27: PencilKit handwriting recognition across alphabets with APIs beyond canvases; PaperKit low-latency writing surface (sessions 203, 372) — https://developer.apple.com/wwdc26/guides/ipados/ [F]. The guide names no new windowing APIs.
- Review questions: Does the iPad app reflow at every window width, or snap between a phone layout and a stretched one? Are all commands in the menu bar with keyboard shortcuts? Do long exports use the Background Tasks API with a Live Activity?

**SwiftUI 27 specifics worth checking**
- `visibilityPriority`, `toolbarOverflowMenu`, `topBarPinnedTrailing`, `toolbarMinimizeBehavior`; `WritableDocument`/`ReadableDocument` with progress, `DocumentCreationSource` + `NewDocumentButton`; reorderable containers beyond List; `swipeActionsContainer` for any ScrollView; item-binding alerts and confirmation dialogs; AsyncImage HTTP caching; lazy `@State` — https://developer.apple.com/wwdc26/guides/swiftui/ (2026-06) [F].
- Review question: When the window narrows, do the right toolbar actions survive (pinned/priority) or do they vanish arbitrarily?

**macOS Golden Gate (27)**
- Same AI and App Intents stack as iOS; Spatial Preview framework links a Mac app to Quick Look on Vision Pro; Safari 27 web features (below) — https://developer.apple.com/wwdc26/guides/macos/ [F]. macOS 26 Tahoe background: Liquid Glass, a transparent menu bar, Spotlight actions (unverified details).

**Other WWDC26 design tools**
- Icon Composer: layered icons, adjustable glass properties, light/dark/clear/tinted appearances; SF Symbols 8 (7,000+ symbols); Pass Designer; sessions 290 "Craft clear names for features and labels", 292 "Design intuitive search experiences", 227 "Create UI prototypes using agents in Xcode" — https://developer.apple.com/wwdc26/guides/design/ [F].
- Review question: Does the app icon hold up in dark, clear and tinted variants?

**2026 Apple Design Award app winners (calibration for "best")** — https://www.apple.com/newsroom/2026/06/apple-reveals-winners-of-the-2026-apple-design-awards/ (2026-06-02) [F]
- grug (Delight and Fun): Stone Age grunts as a daily reflection prompt. Guitar Wiz (Inclusivity): spoken guidance and built-in accessibility. NBA (Innovation, Vision Pro): several live games at once. Moonlitt (Interaction): simple celestial tracking, strong Liquid Glass. Primary: News in Depth (Social Impact, Vision Pro). Tide Guide (Visuals and Graphics): hour-by-hour tide charts with custom animation.
- Pattern: small, focused apps with a strong point of view; no productivity, finance or commerce app won. Game winners include Blue Prince, Is This Seat Taken?, Pine Hearts, Sago Mini Jinja's Garden, Consume Me, Cyberpunk 2077 (Mac).

### A2. Web — Baseline status as of 2026-10-26

Status from the webstatus.dev API, read 2026-10-26 [F] (https://api.webstatus.dev/v1/features/{id}). "Newly" = Baseline Newly available since the date shown. "Limited" = not yet in all core browsers; ship only as progressive enhancement with a fallback.

| Feature | Status (date) | Use it for | Review question |
|---|---|---|---|
| Same-document View Transitions | Newly (2025-10-14, Firefox 144) | Animated state changes in SPAs, list → detail morphs | Do route/state changes cut abruptly where a shared-element transition would keep orientation? Is `prefers-reduced-motion` honoured? |
| `view-transition-class` | Newly (2025-10-14) | Styling groups of transitions | — |
| `:active-view-transition` | Newly (Jan 2026) — https://web.dev/blog/baseline-digest-jan-2026 [F] | Styling the root during a transition | — |
| Cross-document View Transitions (`@view-transition`) | Limited (Chrome 126, Safari 18.2; no Firefox) | MPA page-to-page continuity | Is it used as enhancement, with nothing broken in Firefox? |
| Navigation API | Newly (2026-01-13) | Reliable SPA routing, intercepting navigations | Does back/forward behave like the platform? |
| Scroll-driven animations | Limited (Chrome 115, Safari 26; no Firefox) | Scroll progress, reveal effects | Does content stay usable without the animation? |
| Anchor positioning | Limited per webstatus (Safari 26/27 listed; Chrome shipped core in 125 — web.dev "What's new" [S]; Firefox unverified) | Tooltips, menus tethered to triggers | Is there a JS/fallback position, and does it flip at viewport edges? |
| Popover API | Newly (2025-01-27) | Menus, toasts, pickers without JS focus/escape plumbing | Are home-made popovers re-implementing light-dismiss and top layer badly? |
| Invoker commands (`command`/`commandfor`) | Newly (2025-12-12) | Declarative open/close of dialogs and popovers | Is JS wiring a button to a dialog that HTML can now do? |
| Interest invokers (`interestfor`) | Limited (Chromium only, Oct 2025) | Hover/focus-triggered previews | Treat as enhancement only. |
| `dialog closedby` | Limited (Chromium, Firefox) | Light-dismiss control for dialogs | — |
| Customizable `<select>` (`appearance: base-select`, `::picker(select)`) | Limited (Chrome 135, Safari 27 on 2026-09-14; no Firefox) — Safari 27 session 315, https://webkit.org/blog/17974/web-technology-sessions-at-wwdc26/ (2026-06-08) [F] | Branded selects that keep native keyboard and accessibility | Is a custom JS dropdown replacing a select that could now be styled natively? |
| `@starting-style` | Newly (2024-08-06) | Entry animations for popovers/dialogs | — |
| `interpolate-size` / `calc-size()` | Limited (Chromium) | Animating to `auto` height | — |
| Container size queries | Widely (background) | Components that adapt to their slot | — |
| Container style queries | Newly (2026-05-19) — https://web.dev/blog/baseline-digest-may-2026 [F] | Theme variants driven by custom properties | — |
| Scroll-state container queries | Limited (Chromium) | Styling stuck/snapped states | — |
| `text-wrap: balance` | Newly (2024-05-13) | Headings without ragged single-word lines | Do headings end in one-word orphans? |
| `text-wrap: pretty` | Limited (Chrome, Safari 26) | Body-text orphan control | — |
| `text-box` (trim) | Limited (Chrome, Safari) | Optical vertical centring of text in buttons | — |
| `light-dark()` | Newly (2024-05-13) | One-line light/dark tokens | Is dark mode a separate hand-maintained stylesheet? |
| Relative color syntax | Newly (2024-09-16) | Derived hover/disabled/tint states from one token | Are hover colours hard-coded hexes? |
| `contrast-color()` | Newly (2026-04-10) — https://web.dev/blog/baseline-digest-apr-2026 [F] | Auto black/white text on brand fills | — |
| `field-sizing: content` | Newly (2026-06-16) — https://web.dev/blog/baseline-digest-jun-2026 [F] | Auto-growing textareas/inputs without JS | Is a JS autosize library still shipped? |
| `:open`, `ToggleEvent.source` | Newly (May 2026) [F] | Styling open details/dialog/select | — |
| `shape()` | Newly (Feb 2026) — https://web.dev/blog/baseline-digest-feb-2026 [F] | Responsive clip shapes | — |
| Speculation Rules (prerender/prefetch) | Limited (Chromium only) | Near-instant next navigation | Used as enhancement for likely next pages? |
| `overscroll-behavior` (newer values) | Limited (Chrome, Firefox) | Stopping scroll chaining in sheets | — |
| `if()`, typed `attr()` | Limited | — | Don't rely on them yet. |
| Grid Lanes (CSS masonry) | Safari 26.4+; status not on webstatus | Pinterest-style layouts in CSS | — |

- Widely available since mid-2026 (safe without thought): `:has()`, nesting `&`, `mask`, `:dir()`, `@media (scripting)` (June 2026), subgrid, `hyphens`, `image-set()`, `contain-intrinsic-size` (March 2026), `<search>`, ARIA attribute reflection (April 2026), `lh`/`rlh`, `:user-invalid` (May 2026) — web.dev digests listed above [F].
- Lighthouse now has a Baseline Features audit — https://web.dev/blog/baseline-digest-jul-2026 (2026-08-10) [F]. Web Platform Status has Baseline Alerts — June 2026 digest [F].
- Safari 27 (shipped 2026-09-14 per webstatus): 58 new features in beta including customizable select, scroll anchoring, transform-aware anchor positioning, `:heading` — https://webkit.org/blog/17967/news-from-wwdc26-webkit-in-safari-27-beta/ (2026-06-08) [S]. Final release also includes a local Safari MCP server so coding agents can see rendering — https://www.technobezz.com/news/safari-27-safari-mcp-844-fixes (2026-09-18) [S].
- Agents as users: semantic HTML, real labels (no icon-only buttons), and markup that matches visual structure now serve AI agents as well as assistive tech — https://www.nngroup.com/articles/ai-agents-as-users/ (2026-04-10) [F, via subagent].

---

## B. Category playbooks

Leaders lists are as of 2026-10-26. Bullets marked (synthesis) are pattern judgement, not sourced claims.

### B1. Productivity / notes / tasks
- Leaders/challengers: Notion 3.0 Agents (2025-09-18) — https://www.notion.com/es/releases/2025-09-18 [S]; Notion Mail + Calendar connected to agents — https://www.notion.com/en-gb/releases/2026-04-17 (2026-04) [S]; Todoist Ramble voice-to-tasks in 38 languages (GA 2026-01-21) [S]; Obsidian Bases (1.9/1.10) — https://obsidian.md/blog/2025-obsidian-october/ (2025-10) [S]; Craft pivoted to "Craft Agents" (2026-01) [S]; Superhuman (Grammarly renamed, Oct 2025) [S]; Apple Reminders in 27 with natural-language entry — https://9to5mac.com/2026/06/12/heres-everything-new-for-reminders-in-ios-27/ (2026-06-12) [S]. No 2026 primary news found for Things, Sunsama, Amie.
- [EXPECTED] Natural-language and voice capture that parses dates/projects inline; ⌘K palette and keyboard-first navigation; several views over one dataset (list/board/table/calendar); fast sync and offline.
- [AVOID] Sparkle "Ask AI" on every surface and an empty chat sidebar; grey sidebar + emoji page icons + blank-doc hero (the Notion-era default look); colourful icons on every nav item (synthesis).
- [LEVER] Capture first, structure after: talk, then get project/date/priority/duration — Todoist Ramble [S].
- [LEVER] Agents as assignable teammates with visible status and history, not a chat box — Linear for Agents — https://linear.app/changelog/2025-05-20-linear-for-agents (2025-05-20) [S].
- [LEVER] Calm density: navigation dims once you've arrived, fewer/smaller icons, softer borders, warmer greys; "Don't compete for attention you haven't earned", "Structure should be felt not seen" — Linear — https://linear.app/now/behind-the-latest-design-refresh (2026-03-12) [F].
- [LEVER] Agent edits marked with author and highlighted separately; version history with agent attribution and one-click restore — Linear changelog (2026-07-23) [F]; Notion — https://www.notion.com/releases/2026-10-13 (2026-10-13) [S].
- [LEVER] Expose tasks/notes as App Intents entities so Siri and Spotlight can find and act on them (A1).

### B2. Developer tools
- Leaders/challengers: Cursor 3.0 Agents Window, parallel local/worktree/cloud agents, `/best-of-n`, Design Mode — https://cursor.com/changelog/3-0 (2026-04-02) [F, via subagent]; Xcode 27 agents (Anthropic/Google/OpenAI), planning, canvas for diffs and previews, self-verification via tests/previews/simulator — https://developer.apple.com/videos/play/wwdc2026/259/ (2026-06) [S]; Zed 1.0 with Agent Client Protocol (2026-04-29) [S]; Warp open-sourced its agent environment — https://www.warp.dev/newsroom/2026/4/28/warp-open-sources-its-agentic-development-environment (2026-04-28) [S]; GitHub Agent HQ — https://github.blog/news-insights/company-news/welcome-home-agents/ (2025-10-28) [S]; Raycast for Windows 2.0 (2026-08-21) [S]; Vercel Agent Stack / Connect (2026-06-17) [S].
- [EXPECTED] Command palette; shortcuts for everything; fast, readable diffs; see the plan before the agent acts (Xcode 27, GitHub Plan Mode); agent changes isolated in worktrees/sandboxes; bring your own model.
- [AVOID] A chat sidebar bolted onto a classic editor as the whole AI story; dark neon gradient marketing with "10x" copy; agents acting with no permission tiers or audit trail.
- [LEVER] Supervising parallel agents in a grid or tabs, with handoff to a phone — Cursor 3 [F].
- [LEVER] Agents that verify their own work visually (previews, simulator, tests in the loop) — Xcode 27 [S].
- [LEVER] Point-and-say UI targeting — Cursor Design Mode [F].
- [LEVER] Open protocols over lock-in (ACP, MCP) — Zed, GitHub Agent HQ [S].
- [LEVER] Scoped, expiring credentials for agents — Vercel Connect [S]; sandbox boundaries instead of per-action prompts (Anthropic, Section C).

### B3. Finance / banking / fintech
- Leaders/challengers: Revolut AIR assistant (swipe down from Home; sees only what the user can see; zero retention; biometric approval for sensitive actions) — https://www.revolut.com/news/revolut_enters_new_era_of_money_intelligence_with_launch_of_ai_assistant/ (2026-04-09) [S]; Cash App Moneybot plus redesign (Cash Sans, 650+ icons, explicit confirmation of every money movement) — https://www.techcrunch.com/2025/11/13/cash-app-debuts-a-new-ai-assistant-that-answers-questions-about-your-finances (2025-11-13) [S]; Robinhood Agents, "Loops", foldable Dual Display (HOOD Summit 2026-09-29) [S]; Mercury Command, MCP server and CLI (2026-05) [S]; Ramp agent card (2026-06) [S]; Copilot Money web + Liquid Glass [S]; Apple Wallet in 27 (receipt-photo bill splitting, Create a Pass, Apple Pay sheet that swipes between cards with rewards/balances inline) — https://www.digitaltrends.com/phones/everything-new-coming-to-apple-wallet-with-ios-27/ (2026-06) [S]; Wise UK current account (2026-03-30) [S].
- [EXPECTED] Instant push per transaction with merchant logo and category; one-tap card freeze; biometric step-up before risky actions; clear upcoming bills/subscriptions; explicit confirmation before any money moves, above all when AI starts it.
- [AVOID] An "AI money assistant" chatbot as the headline (every major app shipped one late 2025–2026); giant hero balance + gradient card render + sparkline; confetti on trades or spending (regulatory and ethical risk).
- [LEVER] Assistant with privacy parity: sees only what the user sees, zero retention, biometric confirmation — Revolut AIR [S].
- [LEVER] Agent spending guardrails: single-use cards, standing instructions, limits — Ramp, Robinhood Loops [S].
- [LEVER] Camera-to-transaction: receipt photo → itemised split → payment request — Apple Wallet 27 [S].
- [LEVER] Decision support at the payment sheet (rewards and balance while choosing a card) — Apple Pay 27 [S].
- [LEVER] Banking through developer surfaces (MCP/CLI) for business accounts — Mercury [S].

### B4. Health & fitness
- Leaders/challengers: Apple Workout Buddy (watchOS 26 spoken generative coaching; watchOS 27 adds Spanish, more updates, HealthKit HR-zone APIs) — https://www.apple.com/newsroom/2025/06/watchos-26-delivers-more-personalized-ways-to-stay-active-and-connected (2025-06-09) [S], https://macrumors.com/2026/06/08/watchos-27-workout-buddy-upgrades-better-sleep-tracking (2026-06-08) [S]; Apple Health AI coach reportedly delayed — https://9to5mac.com/2026/08/29/apple-health-revamp-ai-coach-new-apple-watch-next-month/ (2026-08-29) [S]; Oura redesign (Today/Vitals/My Health, "One Big Thing") — https://9to5google.com/2025/10/20/oura-app-redesign/ (2025-10-20) [S]; Whoop Advanced Labs (blood biomarkers + wearable) [S]; Strava strength log with muscle maps (2026-05-21) [S]; Bevel (2025-10-30) [S]; Gentler Streak (ADA 2024 background; WWDC26 brand example); Headspace Ebb AI companion with explicit non-diagnosis — https://www.figma.com/blog/headspace-ebb-ai-companion/ [S].
- [EXPECTED] One daily readiness/recovery score with a plain-language "why"; rings/streaks with rest days that don't punish; HealthKit sync; auto-detected workouts; shareable workout cards; medical disclaimers and an escalation path.
- [AVOID] An "AI coach" chat tab on a dashboard of a dozen score rings; red-to-green gauges for every metric; guilt-based streak-loss notifications; coaching copy that reads like a diagnosis.
- [LEVER] In-the-moment spoken coaching instead of after-the-fact chat — Apple Workout Buddy [S].
- [LEVER] One focus a day instead of a dashboard — Oura "One Big Thing" [S].
- [LEVER] Guidance that adapts to how the user feels and treats rest as valid — Gentler Streak [S].
- [LEVER] Honest, scoped AI persona with stated limits — Headspace Ebb [S].
- [LEVER] Auto-generated visuals of effort (muscle maps from logs) — Strava [S].

### B5. Commerce / checkout
- Evidence base: Baymard *Checkout UX 2025* — https://baymard.com/research-articles/current-state-of-checkout-ux (updated 2025-11-25) [F, via subagent]: ~70% cart abandonment; 62% of sites don't make guest checkout most prominent; 48% show shipping speed not a delivery date; 83% lack a live order-cutoff countdown; 94% lack adaptive error messages; 61% don't mark both required and optional fields; 18% abandon over forced account creation; up to 35% conversion gain from checkout fixes.
- Leaders/protocols: OpenAI + Stripe Agentic Commerce Protocol / ChatGPT Instant Checkout (scoped Shared Payment Token, merchant stays merchant of record) — https://stripe.com/newsroom/news/stripe-openai-instant-checkout (2025-09) [S]; Google Universal Commerce Protocol (NRF, 2026-01-11) [S]; Stripe Sessions 2026 (Link agent wallet with spending approvals, Embedded Checkout in chat/sidebars, Checkout Studio) — https://stripe.com/blog/everything-we-announced-at-sessions-2026 (2026-04-29) [F]; Shopify Catalog and Shop Pay in Copilot (2026-06-17) [S]; Amazon Rufus Auto Buy (target price, explicit opt-in, 24-hour cancel window) — https://www.modernretail.co/technology/marketplace-briefing-amazons-shopping-bot-rufus-can-now-automatically-buy-products-for-you-when-prices-drop/ (2026-05) [S].
- [EXPECTED] Express wallets (Apple Pay, Shop Pay, Link) as distinct labelled buttons above the card form; guest checkout first, account creation on the confirmation page; delivery date, not speed; all costs before payment; inline adaptive validation; say why a phone number is needed.
- [AVOID] Forced account creation; fake scarcity timers (a real cutoff countdown is good, a fake one is a dark pattern); a wall of seven payment logos; a shopping-assistant chat bubble that can't complete a purchase.
- [LEVER] Delegated purchasing with hard limits (scoped token, approval thresholds, cancel window) — Stripe Link agent wallet, ACP, Rufus Auto Buy [F/S].
- [LEVER] Checkout embedded where the decision happens (chat, ads, sidebars) — Stripe Embedded Checkout [F].
- [LEVER] Agent-readable catalogues: structured product data treated as UX — Shopify Catalog [S]; NN/g agents-as-users.
- [LEVER] Rewards and balances shown at the moment of choosing how to pay — Apple Pay 27 [S].

### B6. Social / messaging / community
- Leaders/challengers: iMessage in 27 (configurable mic button, automatic resend of failed messages, merged repeat tapback alerts, RCS inline replies) — https://www.macrumors.com/2026/06/10/everything-new-messages-ios-27/ (2026-06-10) [S]; WhatsApp usernames without a public directory (2026-06-29) [S]; Threads Communities, 500M monthly users — https://techcrunch.com/2026/06/16/threads-adds-new-personalization-and-community-features-as-it-reaches-500m-monthly-users/ (2026-06-16) [S]; Bluesky communities and group chats (2026-06-12) [S]; Discord mobile refresh restoring the original dark theme, teen-safe defaults — https://discord.com/blog/discord-update-august-11-2026-changelog (2026-08-11) [S]; Telegram full Liquid Glass with a power-saving opt-down (2026-01) [S]; Slackbot rebuilt as a personal agent with MCP and skills (2026-03-31) [S].
- [EXPECTED] Thread replies, reactions, edit/unsend, controllable read receipts and typing indicators; private identifiers instead of phone numbers; fine notification control; smaller interest-scoped spaces.
- [AVOID] Infinite algorithmic For You as the default home; "summarise this chat" bolted on everywhere; Stories/ephemeral copycat formats; mic placement that causes accidental sends (iOS 27 had to fix this).
- [LEVER] Calmer notifications and resilience (merged reaction alerts, auto-resend) — iMessage 27 [S].
- [LEVER] Users shape their own algorithm (custom feeds, AI feed builder) — Bluesky [S; feed builder unverified].
- [LEVER] Visible community formation — Threads "Community Progress" [S].
- [LEVER] Visual effects users can turn down (glass under Power Saving) — Telegram [S].
- [LEVER] A constraint as identity, relaxed only for live events — BeReal World Cup mode (2026-06) [S].

### B7. Media / streaming / reading
- Leaders/challengers: Netflix's first full TV homepage redesign since 2013 (top nav, live-updating rows, vertical clip feed test) — https://techcrunch.com/2025/05/07/netflix-is-getting-into-short-videos-with-a-new-vertical-feed-for-mobile (2025-05-07) [S]; Spotify control update (Smart Shuffle/Autoplay fully switchable off) — https://techcrunch.com/2025/05/07/spotifys-latest-update-gives-users-more-control-over-their-listening-experience (2025-05-07) [S] and lossless (2025-09-10) [S]; Apple Music AutoMix and lyrics translation (26), more pairs and AutoMix on tvOS/HomePod (27) [S]; Apple TV back to vertical posters (26) [S]; YouTube bubble-style player with mixed reception (2025) [S]; Kindle "Ask this Book", spoiler-safe to reading position (2025-12) [S]; Readwise Reader Global Ghostreader with cited passages and actions — https://readwise.io/reader/update-aug2026 (2026-08-06) [S]; NYT human-curated Watch tab (2025) [S].
- [EXPECTED] Persistent mini-player; Now Playing with queue, sleep timer and shuffle one tap away; resume/continue at the top; Lock Screen and Live Activity playback (NowPlaying framework in 27); offline downloads; synced lyrics; switches for algorithmic features.
- [AVOID] TikTok-style vertical feed bolted onto every app (Netflix, NYT, WaPo, CNN, Economist all did it in 2025); endless carousels of identical tiles; glass over video controls without a legibility fix; an AI DJ/chat with no grounding in what the user is reading or playing.
- [LEVER] AI bounded to what the user has consumed (no spoilers) — Kindle Ask this Book [S].
- [LEVER] Library-wide chat that cites passages and can act (tag, move) — Readwise Reader [S].
- [LEVER] AI used for craft, not chat; declines when it can't do it well — Apple Music AutoMix skips transitions it can't make seamless [S].
- [LEVER] Editorial curation as a differentiator against algorithmic sameness — NYT Watch [S].
- [LEVER] Ergonomic follow-through after a visual refresh — Pocket Casts' larger, more opaque mini-player [S].

### B8. Travel / maps / local
- Leaders/challengers: Google Maps "Ask Maps" (Gemini, act from the conversation) and Immersive Navigation (3D route view, voice that explains trade-offs) — https://www.techcrunch.com/2026/03/12/google-maps-is-getting-an-ai-ask-maps-feature-and-upgraded-immersive-navigation/ (2026-03-12) [S]; Apple Maps 26 (on-device Preferred Routes, Visited Places) and 27 (AI Flyover, Local Lists, Parked Car widget) — https://9to5mac.com/2026/06/09/heres-everything-new-for-apple-maps-in-ios-27/ (2026-06-09) [S]; Airbnb 2025 redesign (Stays + Experiences + Services, Trips as living itinerary, animated 3D icons) — https://www.macstories.net/news/airbnbs-redesigned-app-combines-stays-with-services-and-unique-experiences/ (2025-05) [S]; Flighty Connection Assistant (step-by-step transfer guide tailored to passport) and Gate Predictions — https://9to5mac.com/2026/07/07/flighty-update-adds-powerful-new-connection-assistant-feature/ (2026-07-07) [S]; Citymapper AI route trade-off summaries (2026-03-04) [S]. No confirmed 2026 redesigns for Uber, Booking, Expedia.
- [EXPECTED] Live Activities and Dynamic Island for rides, trips, flights; Lock Screen gate/boarding info (Wallet does it natively); offline maps; saved/predicted places; route comparison with ETA, cost and transfers; one itinerary hub; CarPlay/Android Auto parity.
- [AVOID] "Plan my trip" chat that dumps listings; AI summaries that restate the ETA; bottom-sheet-over-map with an unconsidered default detent (synthesis).
- [LEVER] AI that explains trade-offs, not just ranks — Citymapper, Google conversational guidance [S].
- [LEVER] Procedure-aware help through the messy middle of a journey — Flighty Connection Assistant [S].
- [LEVER] On-device personalisation as a privacy story — Apple Maps Preferred Routes [S].
- [LEVER] Generated 3D context at the decision point — Google Immersive Navigation, Apple AI Flyover [S].

### B9. AI assistants & AI-native apps
- Leaders/challengers: ChatGPT apps via Apps SDK (MCP-based in-chat UI; launch partners Booking, Expedia, Spotify, Figma, Canva, Zillow) — https://techcrunch.com/2025/10/06/openai-launches-apps-inside-of-chatgpt/ (2025-10-06) [S]; Claude interactive connectors/charts/apps, editable categorised memory — https://support.claude.com/en/articles/12138966-release-notes (accessed 2026-10) [S]; Gemini app redesign (pill composer, model picker top-left, Live on main screen) (2026-05-20) [S] and generative "dynamic view" [S]; Perplexity Comet sidecar browser (2025-07-09; iPhone 2026-03) [S]; ChatGPT Atlas agent mode with progress and Stop (unverified); Granola (no bot; user's shorthand expanded from transcript) (2025-05-14) [S]; Siri app in iOS 27 (shipped design details unverified).
- [EXPECTED] Streaming with a visible, real Stop; searchable history; attachments; voice with transcript; citations for web answers; editable, inspectable memory; explicit permission before acting with the user's credentials; a few follow-up chips that disappear once used.
- [AVOID] Centred greeting + pill composer + four prompt chips as the whole identity; pulsing gradient glow orbs; sparkle icons; walls of markdown where a table or widget would do; chat as the answer to everything (NN/g "AI Chat Is Not (Always) the Answer", 2024-03-01 [F]); embedded app UIs that duplicate the host's input box.
- [LEVER] Interactive UI with strict limits instead of prose — OpenAI Apps SDK display modes (inline card, carousel 3–8, fullscreen, PiP; max two actions per card; no nested scroll; brand colour on accents only) — https://developers.openai.com/apps-sdk/concepts/ui-guidelines (undated, accessed 2026-10-26) [F].
- [LEVER] The user stays the author; AI fills in — Granola [S].
- [LEVER] Ambient help next to the work with visible control (progress, Stop, permission gates) — Comet sidecar [S].
- [LEVER] Generated choice widgets (checkboxes, chips) instead of numbered text questions — NN/g (2026-03-06) [F] (Section C).

### B10. B2B SaaS dashboards / admin
- Leaders/challengers: Linear (design refresh 2026-03-12 [F]; agent author indicators 2026-07-23, Priority inbox 2026-09-03, live agent diffs and AI-credit explorer 2026-10-08 — https://linear.app/changelog [F]); Stripe Dashboard (assistant for payments analytics, Console with confirmation) — Sessions 2026 [F]; Stripe two-column customer page (dynamic data main, static details right) — https://support.stripe.com/questions/updates-to-the-customer-detail-page (undated) [S]; Vercel resizable, hideable sidebar replacing tabs, default from 2026-02-26 — https://vercel.com/changelog/dashboard-navigation-redesign-rollout [S]; PostHog AI that drives the UI (edits filters, builds dashboards) — https://posthog.com/docs/posthog-ai/platform-and-chat-ui [S]; Datadog Bits AI SRE (GA by 2026-02) [S]; Notion agent admin and credits dashboard (2026) [S]; Figma Config 2026 Motion mode (2026-06-24) [S]; Attio, Retool (vendor-sourced, unverified details).
- [EXPECTED] ⌘K command menu and keyboard navigation; collapsible left sidebar; dense tables with saved views and filters; two-column detail pages; predictable header actions; tabular, right-aligned numbers; test/live separation; audit logs; admin approval for third-party apps and agents.
- [AVOID] A row of four KPI cards with sparklines and green/red deltas atop every page; Linear-clone dark UI (blue-grey palette, colourful nav icons, borders everywhere — Linear itself removed all three); an "Ask AI" button that can't act on the page it's on (synthesis).
- [LEVER] Make chrome recede while keeping density — Linear [F].
- [LEVER] AI that operates the product's own UI and objects — PostHog AI, Stripe Console [F/S].
- [LEVER] Visible provenance of AI edits — Linear author indicators [F].
- [LEVER] Governance as a first-class surface (agent inventory, scopes, spend limits) — Notion admin, Linear AI-credit explorer [F/S].
- [LEVER] Triage that separates urgent from ambient — Linear Priority inbox [F].

### B11. Consumer utilities (weather, calculators, timers, trackers)
- Leaders/challengers: ADA 2026 winners Tide Guide (full-screen animated charts, palette matched to the sky) and Moonlitt (focused scope, glass used for interaction) — ADA page (2026-06-02) [F]; Apple Weather 27 ("Highlights" for notable weather; hourly/daily switch between Conditions/Precipitation/Wind; extra-large widget; complaint about small low-contrast text) — https://9to5mac.com/2026/06/17/apple-weather-gets-two-brand-new-features-in-ios-27/ (2026-06-17) [S]; CARROT Weather (fewer tabs, featured in Apple's Liquid Glass gallery 2026-04-06 [S]; personality you can switch off, choice of data source, on-device-model chatbot [S]); Mercury Weather (colour gradients encode temperature; hurricane cones) [S, partly unverified]; Weather Strip (one horizontal timeline, no ads or tracking) — App Store listing [S]; Soulver as calculator benchmark [S]; Flighty as the utility flagship (B8).
- [EXPECTED] The answer in the first viewport (current state + one-line summary); widgets in every size; Live Activities for time-bound states; alerts that escalate correctly (AlarmKit); free core value before any paywall; localisation incl. right-to-left; Dynamic Type that doesn't break charts.
- [AVOID] A tall stack of identical one-metric cards; animated backgrounds that hurt legibility; glass on glass without contrast fallback; "AI summary" text that repeats the numbers below it; a paywall before first value (synthesis).
- [LEVER] The chart is the interface — Tide Guide, Weather Strip [F/S].
- [LEVER] Colour carries data, not decoration — Tide Guide, Mercury [F/S].
- [LEVER] Re-sort the same data by what the user cares about — Apple Weather 27 view switcher [S].
- [LEVER] Personality as an option, not a tax — CARROT [S].

---

## C. AI-native UX patterns, 2025–2026

### C1. Good practice [EXPECTED when AI is present]
- Control and fallback: let people dismiss, revert and retry any AI transformation; say clearly where AI is used; offer a non-AI path where you can (Genmoji beside emoji; summaries beside raw notifications) — Apple HIG Generative AI — https://developer.apple.com/design/human-interface-guidelines/generative-ai (new 2025-06-09, updated 2026-06-08) [F, via subagent].
- Irreversible actions: confirm before significant actions on someone's behalf; don't automate destructive or hard-to-undo actions such as deleting photos or purchases — same page [F].
- Refine in place (added 2026): Edit/Undo/Retry/Adjust next to generated content, with a clear signal that the correction took effect — same page [F].
- Specific waiting copy ("Finding substitutions for ingredients", not "Processing…"); plain-language failure with a next step; coach blocked requests with example prompts — same page [F].
- Don't ask a model for facts unless it has verified, current data; prefer on-device; show what goes to a server; feedback voluntary and non-interrupting — same page [F].
- Citations: next to the claim, visually distinct, deep-linked to the passage, labelled with the source title (not "Source"); disclaimers in plain language, placed near the input with an action, not in the footer — NN/g "Explainable AI in Chat Interfaces" — https://www.nngroup.com/articles/explainable-ai/ (2025-12-12) [F].
- Prompt checking, not just continuing: follow-ups like "How sure are you?" / "Why might this be wrong?"; select part of a response to question it; build work up in steps — NN/g — https://www.nngroup.com/articles/ai-chatbots-discourage-error-checking/ (2025-05-16) [F].
- Calibrated trust: categorical confidence (high/medium/low) with an action per level, or N-best alternatives; raw percentages are risky; skip confidence if it doesn't change decisions — Google PAIR — https://pair.withgoogle.com/chapter/explainability-trust/ (living doc) [F].
- Uncertainty highlighting works only when it flags tokens likely to need editing, not low-probability tokens; keep highlights sparse — Vasconcelos et al., ACM TOCHI 2024 — https://arxiv.org/abs/2302.07248 [S].
- Agent behaviour: disclose it's an agent; work through the product's own UI and actions; acknowledge instantly; expose state (pending/active/awaitingInput/error/complete) and inspectable reasoning and tool calls; stop immediately when asked; a human stays accountable — Linear Agent Interaction Guidelines — https://linear.app/developers/aig (2025-07-30) [F].
- Fewer, higher-stakes approvals: per-action prompts cause "approval fatigue"; predefined filesystem/network boundaries cut prompts by 84% internally (no method given) — Anthropic — https://www.anthropic.com/engineering/claude-code-sandboxing (2025-10-20) [F].
- Checkpoints that state their limits: auto-checkpoint before each edit, rewind code/conversation/both; Bash side-effects not tracked, and the docs say so — https://code.claude.com/docs/en/agent-sdk/file-checkpointing [S].
- Audit trail linked to output: "View session" from the PR timeline shows reasoning and tool calls, with a live Stop — GitHub Copilot coding agent [S]; row-level diffs with agent attribution and restore — Notion (2026-10-13) [S].
- Decision gates and evidence: pause before submitting a form; screenshots as evidence build trust; ask clarifying questions up front (ChatGPT agent didn't, and an 11-minute run for a 2-minute form timed out a reservation) — NN/g — https://www.nngroup.com/articles/impressions-chatgpt-agent/ (2025-08-08) [F].
- Show searched sources so "couldn't find" isn't read as "doesn't exist"; carry confirmed details forward — NN/g (2026-10-09) [F].
- Stream pacing: buffer and release by word or line (`smoothStream`, ~10ms; `Intl.Segmenter` for CJK/Thai) instead of jittery bursts — https://ai-sdk.dev/docs/reference/ai-sdk-core/smooth-stream [F]. Stop must abort on the server and keep the partial output marked "stopped" [S].
- Disclosure: decide by Policy, Audience, Context, Expectations, Degree (PACED); disclose proactively — trust drops most when a third party exposes AI use; EU transparency obligations began Aug 2026 — https://www.nngroup.com/articles/disclose-ai-paced/ (2026-09-25) [F].
- Prompt controls: standard icons with labels and plain names, not branded mode names — NN/g (2024-08-02) [F].

### C2. Generative UI and intent-based UI
- Generated buttons, checkboxes and chips beat numbered text follow-ups (Google AI Mode hotel filters; Claude's question widget); cap the number of questions; always keep an open-text fallback — NN/g — https://www.nngroup.com/articles/genui-buttons-and-checkboxes/ (2026-03-06) [F].
- MCP Apps (first official MCP extension): UI in sandboxed iframes, JSON-RPC over postMessage that hosts can log; hosts can review HTML before rendering and require approval for UI-initiated tool calls; good for data exploration, config wizards, document review, live monitoring; clients at launch Claude, Goose, VS Code Insiders, ChatGPT rolling out — https://blog.modelcontextprotocol.io/posts/2026-01-26-mcp-apps/ (2026-01-26) [F].
- Vercel AI SDK: typed tool parts rendered by state (input-available → loading, output-available → component, output-error → error); every generated component needs designed loading and error states — https://ai-sdk.dev/docs/ai-sdk-ui/generative-user-interfaces [F].
- Host-native embedded UI: system font and colours, brand on accents only, host draws the logo, follow-up text must not repeat the card — OpenAI Apps SDK guidelines [F].
- Intent-based outcome specification: users state the outcome, the system picks the procedure; a good intent has outcome, constraints and a delegation boundary; the "articulation barrier" is the new usability problem — Jakob Nielsen — https://jakobnielsenphd.substack.com/p/intent-ux [S, date unclear]; NN/g on outcome-oriented generative UI and its risks to learnability and predictability — https://www.nngroup.com/articles/generative-ui/ (2024-03-22) [F].
- Model-coded pages per prompt (Gemini "dynamic view") — https://research.google/blog/generative-ui-a-rich-custom-visual-interactive-user-experience-for-any-prompt/ (~2025-11) [S]. Frontier, not settled.
- Apple's agent primitives: Foundation Models Dynamic Profiles, Evaluations, View Annotations (A1); agent-built spring tuning panels for prototyping (session 227) [F, via subagent].
- Vocabulary for review: Shape of AI pattern families — Wayfinders, Inputs, Tuners, Governors, Trust builders, Identifiers (action plan, branches, citations, cost estimates, draft mode, memory, verification, consent, footprints, incognito, watermark) — https://www.shapeof.ai/ (2025) [F]. Microsoft HAX 18 guidelines (2019) remain the reference; no 2025–26 revision found [S].

### C3. Slop [AVOID]
- ✨ as the AI label: participants didn't link it to AI; use only with a text label — https://www.nngroup.com/articles/ai-sparkles-icon-problem/ (2024-09-20) [F]; "when everything gets an AI sparkle" it "becomes noise" — State of UX 2026 [F].
- Chat bolted on because competitors have it; "Powered by AI" as the value proposition; chat as the default answer (LinkedIn example) — NN/g (2024-03-01, 2026-01-16) [F].
- Fake reasoning transcripts presented as transparency; anthropomorphic "I thought about your problem" — NN/g (2025-12-12) [F].
- Citations as decoration (links that don't support the claim; a non-existent paper in Google AI Mode) — NN/g [S].
- Generic "Want me to…?" chips that push forward instead of prompting a check; tiny footer disclaimers — NN/g (2025) [F].
- Raw percentage confidence; highlights everywhere — PAIR [F]; Vasconcelos [S].
- Vague status ("Processing…", unexplained "Searching websites") — Apple HIG 2026 [F]; NN/g (2026-10) [F].
- A permission prompt for every action (rubber-stamping) — Anthropic [F].
- Embedded widgets that recreate host chrome (duplicate input, nested scroll, tabs inside cards, own logo, custom gradients) — OpenAI guidelines [F].
- Proactive suggestions with poor precision (Pixel 10 Magic Cue "very hit-or-miss" a month in) — https://www.androidauthority.com/google-pixel-10-magic-cue-one-month-later-3598684 (2025) [S].
- Personality that promises more than capability delivers — NN/g (2026-10-09) [F].
- Undo that silently misses side-effects; multi-minute agent loops with no progress — Claude Code docs [S]; NN/g [F].
- Visual clichés: glow orbs, iridescent gradients, centred greeting + four chips (synthesis; see B9).

### C4. Review questions for AI features
1. Can the user see, undo or restore every AI and agent action, including side-effects outside the canvas? Is the undo scope stated?
2. Are approvals reserved for irreversible or costly actions, with the rest bounded by scope, sandbox or plan approval?
3. Does each factual claim link to the exact supporting passage? Are searched sources and gaps visible?
4. While generating, does the UI say specifically what is happening? Is Stop real, with partial output kept? Is the stream paced?
5. Is the AI feature justified by a user need, with a non-AI path and a text label instead of ✨?
6. Do generated components use host tokens, keep to two actions or fewer, have loading/error states and an open-text fallback?
7. Is AI use disclosed proactively and in proportion (PACED)? Is personal data kept on-device where possible?

---

## D. Distinctive brand and identity mechanisms, 2024–2026

Look at the mechanism, not the look. A copied look turns into a template within a year (Vercel/Geist, Linear dark, Airbnb 3D icons are all now widely imitated).

### D1. Platform layer
- Apple Liquid Glass (2025-06-09): colour comes from surrounding content; layered icons with light/dark/tinted/clear variants exported from Icon Composer. Lesson: a mark must survive monochrome tint and clear rendering — https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/ [F, via subagent].
- Apple session 251 (2026): identity in content, native chrome; tint used for meaning (Slack: primary actions, unread badges, selected tab); understated logo (NYT Cooking shows it on Home only and fades it on scroll) — [F] (A1).
- Google Material 3 Expressive (2025-05): 46 studies, 18,000+ participants; key elements found up to 4× faster; age gap in visual search largely disappeared; caveat: breaking familiar patterns (unlabelled actions) hurt usability and a strong minority preferred calmer designs — https://design.google/library/expressive-material-design-google-research [F, via subagent]. Lesson: expressiveness is testable; keep labels and familiar structure.
- M3 Expressive motion: springs (stiffness, damping) in spatial vs effects categories, fast/default/slow, expressive vs standard schemes; specific token values third-party only (unverified) [S]. Lesson: motion identity = a few named spring tokens.
- Material dynamic colour (HCT): one key colour → tonal palettes; contrast enforced by tone difference with a contrast level −1…1 — https://github.com/material-foundation/material-color-utilities [S]. Lesson: brand colour can't break legibility when contrast is enforced at token level.

### D2. Parametric colour (OKLCH / LCH)
- Linear 2024 redesign: theme generator moved from HSL to LCH; a theme is 3 inputs (base, accent, contrast) instead of 98 variables; contrast input auto-generates high-contrast themes; elevation derived — https://linear.app/now/how-we-redesigned-the-linear-ui (2024-03-28) [F, via subagent].
- Linear 2026 refresh: distinctiveness by subtraction (dimmed sidebar, warmer less-saturated greys, fewer icons, softer borders); built with an HCL token tool in the dev toolbar, exported to Figma as JSON; shipped behind flags with one-click old/new comparison — https://linear.app/now/behind-the-latest-design-refresh (2026-03-12) [F].
- Tailwind v4: default palette in `oklch` (P3), gradients interpolate in OKLAB, tokens in `@theme` emitted as CSS variables — https://tailwindcss.com/blog/tailwindcss-v4 (2025-01-22) [F, via subagent]. Lesson: stock `blue-500` now reads as template; derive your own ramp.
- Evil Martians: perceptual L makes lightness predictable across hues; palettes generated from a formula; Harmony palette equalises APCA contrast per lightness step — https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl (updated 2025-09-17) [F]; https://github.com/evilmartians/harmony [S].
- Radix Colors 12-step scale with fixed jobs (1–2 backgrounds, 3–5 component states, 6–8 borders/focus, 9–10 solid fills, 11–12 text; 11/12 guaranteed APCA Lc 60/90 on step 2) — https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale [F]. Lesson: a random step on text is a smell.
- GitHub Primer: base → functional → component tokens; nine themes incl. colour-blind, tritanopia, high-contrast, dark-dimmed; contrast checks in CI — https://github.com/primer/primitives [S]. Lesson: accessibility themes come almost free once semantics are tokenised.
- Web enablers now Baseline: relative color syntax, `light-dark()`, `contrast-color()`, container style queries (A2).

### D3. Type as identity (variable axes)
- Figma Sans (Grilli Type): weight, width and optical-size axes; width tightened in translated text to avoid bad breaks; the wordmark is a variable font; "Fonts are software" — https://www.figma.com/blog/the-story-of-creating-figma-sans/ (2024-09-05) [F, via subagent].
- Google Sans Flex, open-sourced: six axes incl. grade and roundedness; roundness tunes tone; optical size from watch to billboard — https://design.google/library/google-sans-flex-font (~2025-11) [F, via subagent]. Lesson: tokenise axis values, not just weights.
- Atlassian: Atlassian Sans/Mono; icons rebuilt as a 16px core with 1.5px stroke to match the lighter type, 12px variants for metadata, rolled out via an "Icon Facade" and flags — https://atlassian.design/whats-new/building-atlassians-new-icon-system (2025-09-08) [F, via subagent]. Lesson: icon stroke and size should derive from the typeface.
- Cash App Cash Sans and 650+ icons with the Moneybot launch — https://designcompass.org/en/2025/12/03/cash-apps-new-design-language-and-ai-moneybot/ (2025-12-03) [S].
- Apple's counterpoint: Gentler Streak gets a distinct identity from SF width variants and SF Rounded alone (session 251) [F]. A custom face is optional; a deliberate type system is not.
- Mozilla (JKR, 2024-09): one flag symbol generates the icon family; custom semi-slab type — https://www.itsnicethat.com/articles/jkr-mozilla-rebrand-graphic-design-project-240924 [S].

### D4. Motion, character, texture
- Airbnb 2025: in-house dimensional, animated icons kept to top-level navigation; brief "Fun, alive, and simple"; animation prototyping moved earlier — https://www.itsnicethat.com/articles/airbnb-app-redesign-140525 (2025-05-14) [F, via subagent]; delivered in an internal alpha-video format "Lava" (unverified detail).
- Duolingo: Rive state machine drives 20+ visemes per character from phoneme timing across 40+ languages; idle blinks and reactions; Lily file under 1MB — https://blog.duolingo.com/world-character-visemes (2022-11-10, background) [F, via subagent]. Lesson: character identity is a runtime system (states and inputs), not canned animation.
- Apple prototyping (session 227): tune springs by stiffness, damping, mass; describe animations in phases; expose parameters in a tuning panel; consider haptics — [F, via subagent]. Lesson: keep a named, tunable motion spec instead of magic numbers.
- Figma Motion mode (timeline, keyframes) and WebGPU shader fills (Config, 2026-06-24) [S] — motion specs are moving into the design tool.

### D5. Sound and haptics
- Apple HIG "Playing haptics": use system patterns for their documented meanings; custom only when none fits; keep a consistent cause-and-effect link; Core Haptics AHAP files combine transient/continuous events and audio — https://developer.apple.com/design/human-interface-guidelines/playing-haptics [S].
- Slack's "Knock Brush" used as both notification sound and sonic logo in ads — critique: separate the brand signature from functional alerts and build a priority hierarchy — https://beastoftraal.com/2021/07/29/triggered-by-brand-sounds/ (background) [S].
- No primary 2025–26 sources found for Duolingo sound design or Teenage-Engineering-style sound identity (unverified).

### D6. Identity review checklist
1. Is colour generated from a few inputs in a perceptual space (OKLCH/LCH/HCT) with a contrast parameter, and do ramp steps have fixed jobs? Or is it a hand-picked hex list or stock Tailwind?
2. Does brand live in the content layer, with tint used for meaning (action, selection, status)?
3. Is type a deliberate system (variable axes tokenised, or system-font variants used on purpose)? Do icon strokes and sizes derive from it?
4. Is motion a small set of named springs (spatial vs effects; standard vs expressive) with reduced-motion handled?
5. Is distinctiveness earned by restraint, and are expressive moves checked against familiarity (M3E caveats)?
6. Does the app icon survive light, dark, tinted and clear?
7. Are sound and haptics sparse, causal and tiered, with the brand signature separate from alerts?

---

## E. Gaps and caveats
- Not confirmed from Apple's own pages: shipped iOS 27 Siri app design, the Gemini model claim (MacRumors reporting), exact names of iOS 27 widget "dynamic styling" APIs, macOS 26/27 Live Activity details, iPadOS 27 windowing changes (the guide names none).
- Webstatus.dev lists anchor positioning as limited with only Safari implementations under the top-level feature, although Chrome shipped core support in 125; recheck before stating status.
- Most 2026 category facts are trade-press snippets [S]. No 2026 primary sources found for Things, Sunsama, Amie, Ghostty, Windsurf, MacroFactor, Calm, Monzo, Uber, Booking, Expedia, Overcast.
- Baymard 2026 checkout data is paywalled; numbers are from the Nov 2025 update.
- OpenAI Apps SDK guidelines page is undated and gives inconsistent metadata line limits.
- No web.dev Baseline digests for Aug–Oct 2026 were found; statuses above come from webstatus.dev directly.
