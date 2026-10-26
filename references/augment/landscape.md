Covers: the landscape step: how to research a product's category and peers, what to record, and a seed of current category playbooks, platform capabilities, AI-feature practice and identity mechanisms to check the product against.
Loaded by: landscape (step 1b), distinctiveness, red team
Snapshot: 2026-10-26. Sources for every seed line: research/digests/16-landscape-frontier.md (section given in brackets). Seed facts age fast; re-check anything you state as current.
Tags: [EXPECTED] = users now assume it in this category; missing it is evidence for a finding or enhancement. [LEVER] = a frontier move worth proposing when it fits this product's job. [AVOID] = category convergence or slop; leaning on it is evidence for a distinctiveness finding. In reports, landscape-based items show 'Research' in the Apple column unless an Apple line is cited. `(unverified)` items never back a Blocker.

Apple HIG stays the base. The landscape is evidence about the category, not a rule set: "every peer does X" makes X a convention to keep or a cliché to avoid, never a reason on its own. A peer's mechanism can be proposed; a peer's look cannot.

## Procedure
**Intent**: know what best-in-class looks like in this category today before judging the product, so enhancements and reworks are grounded in the field rather than in the model's own taste.

1. **Name the category** in a few words from the profile's `purpose` (or `category` if set). Map it to the nearest seed playbook below; a product can sit in two (a finance app with an AI assistant: finance plus AI-native).
2. **Pick 3 to 6 products to study**: the category leader; one or two challengers praised for UX in the last 18 months; every product in the profile's `peers`; and one exemplar from an adjacent domain that solves the same job differently (a tide app studies a flight tracker's live-state handling; an API client studies a database GUI). Say why each was picked.
3. **Research live** with WebSearch and WebFetch. Prefer primary sources: the product's own changelog, release notes and design blog; Apple and platform docs; App Store listings; WWDC and conference talks; NN/g and Baymard. Trade press is second-hand: mark it `[S]`. For each claim keep the URL and the page date (or access date).
4. **For each studied product, record**: the core task's step count (from first screen to job done, as far as public material shows it), the navigation model, the one mechanism it is praised for, and its identity-carrying combination (accent hue, typeface, layout idiom), so the peer check in references/augment/distinctiveness.md has something to compare against.
5. **Write the landscape block**: conventions to keep, convergence to avoid, frontier moves (each with the peer that does it and its source), openings (what no studied product does that this product's subject or audience would justify), the best peer's core-task step count, and the platform capabilities from "Platform capabilities" that fit the product's nouns and verbs.
6. **Without web tools**: use the seed playbooks below and memory, mark every claim `(unverified)`, and say so in the report's Run notes. The source checks below then apply only to what was sourced, and `(unverified)` landscape data cannot satisfy the peer-gap condition of the rework bar.

**Checks**
- [Taste] At least three studied products, each with a source; at least one is not in the product's own category (the adjacent exemplar). — Apple silent
- [Taste] Every frontier move and opening names its source and why it fits this product's job. A move that only fits "any product" is dropped. — Apple silent
- [Taste] Openings come from the product's subject, data or audience, not from inverting a peer ("they are dark, so go light" is substitution, not an opening). — Apple silent
- [Taste] Landscape claims never raise Impact. They support enhancements, reworks (the peer-gap bar condition in references/augment/red-team.md) and directions. — Apple silent

## Platform capabilities
**Intent**: capabilities a product in 2026 should consider when its nouns and verbs fit. Missing ones become enhancements, never defects, unless an Apple MUST is cited. [A1, A2]

Apple (iOS/iPadOS/macOS 26 shipped Sep 2025; the 27 releases were announced at WWDC26 on 2026-06-08):
- Liquid Glass comes free with standard components. Apps built with the Xcode 27 SDK reportedly ignore the `UIDesignRequiresCompatibility` opt-out (`[S]`), so every rebuilt app gets it. Review question: does the app fight it (custom bar backgrounds, glass in content, glass on glass), and does it stay legible with Reduce Transparency, Increase Contrast and the 27 transparency slider at both ends?
- Brand in content, chrome native (WWDC26 session 251): "the content layer is the best opportunity to express your brand identity"; "move color into the content area"; use color "sparingly and with intention"; tint for meaning (primary action, unread, selection). Cite this when an identity proposal would paint bars.
- App Intents, Siri and Spotlight: entity and intent schemas (27), View Annotations so Siri can act on what is on screen, `AppIntentsTesting`. Fits any product whose objects people would name aloud (tasks, trips, orders, requests, collections). Question: are core objects entities and core verbs intents?
- Foundation Models (on-device, extended in 27 to drive cloud models through one protocol, with an Evaluations framework). Fits summarising, classifying or extracting the user's own data privately. Question: is AI used where on-device would avoid sending personal data, and is there an evaluation suite?
- Widgets, controls, Live Activities: time-bound state gets a Live Activity; glanceable state a widget; the single most frequent action a control.
- iPadOS 26: free window resizing and an app-customisable menu bar. Question: does the layout reflow at every width, and is every command in the menu bar with a shortcut?
- Icon: does it survive light, dark, tinted and clear (Icon Composer)?

Web (Baseline status read 2026-10-26; "Limited" ships only as enhancement with a fallback):
- Baseline now: same-document View Transitions, Popover API, invoker commands (`command`/`commandfor`), Navigation API, `@starting-style`, container style queries, `light-dark()`, relative color syntax, `contrast-color()`, `field-sizing: content`, `text-wrap: balance`.
- Limited: cross-document View Transitions, scroll-driven animations, anchor positioning (status inconsistent; recheck), `interestfor`, customizable `<select>` (no Firefox), Speculation Rules, `text-wrap: pretty`.
- Questions: do state changes cut abruptly where a view transition would keep orientation? Are home-made popovers, dropdowns or autosize scripts re-implementing what the platform now does with better keyboard and accessibility behavior? Is dark mode hand-maintained where `light-dark()` and relative colors would derive it?
- Agents are users too: semantic HTML, real labels and markup that matches visual structure serve AI agents as well as assistive tech (NN/g, 2026-04).

## Category seed playbooks
**Intent**: a starting point for step 1 of the procedure, not a substitute for live research. Each line is short; sources are in the digest section named. [B1-B11]

**Productivity, notes, tasks** [B1]. EXPECTED: natural-language and voice capture parsed inline; command palette and keyboard-first navigation; several views over one dataset; fast sync and offline. AVOID: "Ask AI" sparkle on every surface; grey sidebar plus emoji page icons plus blank-doc hero; colorful icon on every nav item. LEVER: capture first, structure after (Todoist Ramble); agents as assignable teammates with visible status (Linear); calm density, chrome that dims once you arrive (Linear 2026); agent edits attributed and restorable.

**Developer tools** [B2]. EXPECTED: command palette; shortcuts for everything; fast readable diffs; see the plan before an agent acts; changes isolated (worktrees, sandboxes); bring your own model. AVOID: chat sidebar bolted onto a classic editor as the whole AI story; dark neon gradient marketing with "10x" copy; agents acting with no permission tiers or audit trail. LEVER: supervising parallel agents; agents that verify their own work (tests, previews); open protocols (MCP, ACP); scoped, expiring credentials.

**Finance, banking** [B3]. EXPECTED: instant push per transaction with merchant and category; one-tap card freeze; biometric step-up before risky actions; upcoming bills visible; explicit confirmation before any money moves, above all when AI starts it. AVOID: an "AI money assistant" chatbot as the headline; giant hero balance plus gradient card plus sparkline; confetti on trades or spending. LEVER: assistant that sees only what the user sees, with biometric confirmation (Revolut); agent spending limits (Ramp); receipt photo to itemised split (Apple Wallet 27); decision support at the payment sheet.

**Health, fitness** [B4]. EXPECTED: one daily score with a plain-language why; streaks with rest days that don't punish; HealthKit sync; auto-detected workouts; disclaimers and an escalation path. AVOID: AI coach chat tab over a dozen score rings; red-to-green gauges for every metric; guilt-based streak-loss notifications. LEVER: in-the-moment spoken coaching (Workout Buddy); one focus a day (Oura); rest treated as valid (Gentler Streak); AI persona with stated limits.

**Commerce, checkout** [B5]. EXPECTED: express wallets as labelled buttons above the card form; guest checkout first; delivery date, not speed; all costs before payment; inline adaptive validation (Baymard 2025: 62% of sites don't make guest checkout most prominent, 94% lack adaptive errors). AVOID: forced account creation; fake scarcity timers; a wall of payment logos; a shopping chat that cannot complete a purchase. LEVER: delegated purchasing with hard limits (Stripe Link agent wallet, Rufus Auto Buy with a cancel window); checkout where the decision happens; agent-readable catalogues.

**Social, messaging, community** [B6]. EXPECTED: threads, reactions, edit and unsend, controllable read receipts; private identifiers instead of phone numbers; fine notification control. AVOID: infinite algorithmic feed as the default home; "summarise this chat" everywhere; Stories copycats. LEVER: calmer, merged notifications and auto-resend (iMessage 27); users shaping their own feed (Bluesky); a constraint as identity (BeReal).

**Media, streaming, reading** [B7]. EXPECTED: persistent mini-player; queue and sleep timer one tap away; resume at the top; Lock Screen playback; offline; switches for algorithmic features. AVOID: vertical clip feed bolted onto every app; endless carousels of identical tiles; glass over video controls without a legibility fix. LEVER: AI bounded to what the user has consumed (Kindle, spoiler-safe); library chat that cites passages and acts (Readwise); AI that declines when it cannot do the job well (AutoMix); editorial curation against algorithmic sameness.

**Travel, maps, local** [B8]. EXPECTED: Live Activities for rides, trips and flights; offline maps; route comparison with ETA, cost and transfers; one itinerary hub. AVOID: "plan my trip" chat that dumps listings; AI summaries that restate the ETA. LEVER: AI that explains trade-offs, not just ranks (Citymapper); procedure-aware help through the messy middle (Flighty Connection Assistant); on-device personalisation as a privacy story.

**AI assistants, AI-native** [B9]. EXPECTED: streaming with a real Stop that keeps partial output; searchable history; citations for web answers; editable, inspectable memory; permission before acting with the user's credentials. AVOID: centred greeting plus pill composer plus four prompt chips as the whole identity; glow orbs; sparkle icons; walls of markdown where a table would do; chat as the answer to everything. LEVER: interactive UI with strict limits instead of prose (OpenAI Apps SDK: at most two actions per card, no nested scroll); the user stays the author (Granola); generated choice widgets instead of numbered text questions.

**B2B SaaS, dashboards, admin** [B10]. EXPECTED: command menu and keyboard navigation; collapsible sidebar; dense tables with saved views; two-column detail pages; tabular right-aligned numbers; test/live separation; audit logs. AVOID: four KPI cards with sparklines atop every page; Linear-clone dark UI (blue-grey, colorful nav icons, borders everywhere, all three of which Linear itself removed); an "Ask AI" button that cannot act on its page. LEVER: chrome that recedes while density stays (Linear); AI that operates the product's own objects (PostHog, Stripe); visible provenance of AI edits; triage that separates urgent from ambient.

**Consumer utilities (weather, timers, trackers)** [B11]. EXPECTED: the answer in the first viewport; widgets in every size; Live Activities for time-bound states; free core value before any paywall; Dynamic Type that doesn't break charts. AVOID: a tall stack of identical one-metric cards; animated backgrounds that hurt legibility; AI summary text that repeats the numbers below it. LEVER: the chart is the interface (Tide Guide, a 2026 Apple Design Award winner); color carries data, not decoration; re-sorting the same data by what the user cares about (Apple Weather 27).

Calibration: the 2026 Apple Design Award app winners (grug, Guitar Wiz, Moonlitt, Tide Guide, and two Vision Pro apps) are small, focused apps with a strong point of view; none is a productivity, finance or commerce app. Best-in-class in 2026 reads as restraint, context and a committed point of view, not more features. NN/g's State of UX 2026 names trust as the major design problem and predicts "AI fatigue". [A1, 0]

## AI features
**Intent**: when the product has AI features, these are the current review questions. Apple's Generative AI HIG (updated 2026-06-08) is the base. [C1-C4]

- [SHOULD] Every generated result offers edit, undo or revert, and retry next to it, with a clear signal the correction took effect; a non-AI path exists where possible. — adds to Apple
- [SHOULD] No automated destructive or hard-to-undo actions (deletes, purchases); confirm significant actions taken on someone's behalf. — adds to Apple
- [SHOULD] Waiting copy names the work ("Finding substitutions for ingredients"), not "Processing…"; failures say what happened and what to do next. — adds to Apple
- [SHOULD] Citations sit next to the claim, deep-link to the passage and carry the source title; searched sources are shown so "couldn't find" is not read as "doesn't exist" (NN/g 2025-12, 2026-10). — Apple silent
- [SHOULD] Approvals are reserved for irreversible or costly actions; the rest is bounded by scope or sandbox, because a prompt per action causes approval fatigue (Anthropic, 2025-10). — Apple silent
- [SHOULD] Agent state is visible (pending, active, awaiting input, error, complete), Stop is immediate and real, and agent edits are attributed and restorable (Linear agent guidelines). — Apple silent
- [CONSIDER] Confidence shown as categories with an action per level, never raw percentages; skip it if it changes no decision (Google PAIR). — Apple silent
- [Taste] AVOID: ✨ as the only AI label (NN/g: people did not link it to AI); chat bolted on because peers have it; fake reasoning transcripts; decorative citations; generic "Want me to…?" chips; glow orbs and iridescent gradients. — Apple silent

## Identity mechanisms
**Intent**: what distinctive products do in 2024-2026, as mechanisms to check for and propose. Each look below is already imitated at scale; only the mechanism transfers. Feeds "Theming and identity proposals" in references/augment/distinctiveness.md. [D1-D6]

- Parametric color: themes generated in a perceptual space (OKLCH, LCH, HCT) from a few inputs with a contrast parameter, so high-contrast and dark themes come almost free (Linear: 3 inputs instead of 98 variables; Material HCT with contrast levels). Question: is color generated, or a hand-picked hex list or stock library ramp? Stock Tailwind v4 OKLCH values now read as template.
- Ramp steps with fixed jobs (Radix: backgrounds, component states, borders, solid fills, text). Question: does any text use a random ramp step?
- Type as a system: variable axes stored as tokens (Figma Sans, Google Sans Flex), or system-font variants used on purpose (Gentler Streak: SF width variants and SF Rounded only). A custom face is optional; a deliberate type system is not.
- Icons derived from the type: stroke and size matched to the typeface (Atlassian: 1.5 px stroke on a 16 px core to match lighter type).
- Motion as a few named, tunable tokens (springs or curves, productive versus expressive), with Reduce Motion handled (M3 Expressive; Apple session 227).
- Character as a runtime system that reacts to state, not canned animation (Duolingo's Rive state machines).
- Sound and haptics: sparse, causal, tiered, with the brand signature kept separate from functional alerts.
- Distinctiveness by subtraction: Linear's 2026 refresh dimmed navigation, removed icons and softened borders, and shipped behind flags with an old/new comparison.
