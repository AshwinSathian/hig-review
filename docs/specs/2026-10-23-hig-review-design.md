# hig-review: design

Status: draft for approval, 2026-10-23
HIG snapshot: full crawl of developer.apple.com/design/human-interface-guidelines (174 pages) on 2026-10-23, plus Apple first-party literature beyond the HIG (WWDC design sessions, Apple Style Guide, Apple Design Awards criteria, App Store design rules, WebKit guidance).

## Intent

AI-generated and template-built UI converges on the same look: centered hero, three feature cards, gradient blobs, glass cards, sparkle buttons, "Oops! Something went wrong", a spinner for everything. It is correct-ish and forgettable. Apple's design literature is the most detailed public record of *why* good interfaces work: hierarchy, deference to content, restraint with emphasis, honest feedback, motion that follows the hand, copy that names outcomes.

hig-review is a Claude Code skill that runs a UI/UX pass on our apps using that reasoning, finds what is wrong or generic, and proposes how to raise it. It applies Apple's principles to our brand. It does not make our products look like Apple's.

## Goals

- Review any unit: one screen or component, one flow, a whole app, or a design system on its own.
- Accept any input: a running web app (driven through Playwright), screenshots or mockups, source code, design system specs (tokens, DESIGN.md, Figma variable exports).
- Cover iOS, iPadOS, macOS (including the new iPhone Duo) and web, across stacks: SwiftUI/UIKit, React/Next.js, React Native/Expo, Angular, Vue, plain HTML/CSS/JS/TS.
- Go past basics. Checks are specific and testable (numbers, limits, decision rules), drawn from the full HIG rather than a top-10 list.
- Every finding carries two ratings: user impact, and strength of Apple's guidance.
- After violations, give a separate set of elevation ideas: what would make this feel crafted.
- Report first, then offer fixes. Never edit without asking.

## Non-goals

- Exact HIG quotations or citation links. Detailed digests are enough.
- Making web or Android look like iOS. No forced SF Pro, Liquid Glass, or iOS chrome outside native Apple targets.
- visionOS, watchOS, tvOS reviews. Only principles from those pages that transfer to phone, desktop and web are kept.
- Visual regression testing, pixel diffing, or CI gating.

## Anti-goals (failure even if it "works")

- A reviewer that produces generic advice ("improve visual hierarchy", "consider accessibility") that could apply to any screen.
- Inventing Apple authority. Our own taste rules and web translations must stay labelled as ours.
- Pushing a new slop pattern, such as glassmorphism everywhere because "Apple does glass".
- Loud reports where 40 low-value nits bury the 3 findings that matter.

## Decisions made with the user

| Topic | Decision |
|---|---|
| Inputs | All four: running app, screenshots, source, design system. Running app via Playwright and screenshots are the minimum that must work well. |
| Stacks | SwiftUI/UIKit, React/Next.js, React Native/Expo, Angular, Vue, HTML/CSS/JS/TS. |
| Apple-ness | Principles, keep our brand. |
| After findings | Report, then offer fixes. |
| Packaging | Own git repo as a Claude Code plugin at ~/Documents/Personal/hig-review. |
| Severity | Two columns: user impact, and Apple's guidance strength. |
| Corpus | Detailed digests only. No raw HIG text, no citations required. |
| Review unit | All: screen/component, flow, whole app, design system. |
| Elevation | Yes, as a separate section after violations. |
| Liquid Glass | Gate on deployment target detected per project (iOS/iPadOS/macOS 26+). |
| Project profile | Created on first run, stored in the reviewed repo, reused after. |
| Source hierarchy | Apple HIG and Apple's other literature are the core. Other literature only augments: it fills gaps Apple leaves or adds evidence and detail. It never replaces an Apple rule. |
| Conflicts | Native Apple target: Apple wins on platform conventions. Web: Apple's principle is the default; research evidence (NN/g, Baymard, GOV.UK) may sharpen how it applies, and any conflict is shown, not silently resolved. Brand expression: the project profile wins. Accessibility: the strictest source wins everywhere. |
| Writing | The humanizing-writing skill's rules (specific claims, no fabrication, plain verbs, no significance inflation, structure follows content, AI-tell table) apply to all UI copy, layered on Apple's writing guidance. Voice is defined per product in its profile; the author's personal voice traits apply only if a product opts in. Spelling (British or American) is set per product; mixing is flagged. |
| No brand direction | Distinctiveness pass proposes 2 to 3 directions from the product's purpose and audience. The user picks one, it is saved to the profile, and later runs judge against it. |
| Brand vs HIG | Split by surface. Apple wins in task flows (forms, lists, navigation, settings). Brand may win on display-only surfaces (hero, empty states, marketing, onboarding splash), only if accessibility still passes. |
| "Make it feel like X" | Translate to mechanism: extract why X works (hierarchy discipline, speed, keyboard-first) and apply that. Decline to copy the look, and say why. |
| Popular patterns | Today's AI slop is the result of popular patterns copied at scale, including from widely praised products. The skill extracts the reasons behind good details and never proposes a trending look as a target. |

## How it works

### 1. Profile (first run per project)

The skill looks for `.hig-review.md` at the reviewed repo root. If missing, it infers what it can and asks only for the rest:

- Product purpose in one sentence, and the feeling it should leave (used to judge "delight" and "purpose" checks instead of guessing).
- Audience and usage frequency: one-off or occasional public use vs daily professional use, per product and, where it differs, per area. Many source conflicts turn on this (one question per page vs grouped forms, compact vs comfortable rows, autosave vs explicit save, toasts vs inline confirmation).
- Platforms and form factors (inferred from code: Xcode project, app.json, package.json, framework).
- Deployment targets (read from project files; gates Liquid Glass checks).
- Brand: typefaces, accent color(s), tone of voice.
- House rules: capitalization style per element type, pronoun policy, density preference (comfortable vs dense).
- Waived findings: rules the team has consciously decided to break, with a reason. Later runs skip them.

### 2. Intake

Determine the review unit and gather evidence for it:

- **Running web app**: navigate with Playwright, screenshot at phone / tablet / desktop widths, in light and dark, with `prefers-reduced-motion` and forced larger text. Tab through for focus order and visibility. Hover key controls. Run a bundled measurement script in the page that returns contrast ratios, hit-target sizes and spacing, font sizes, and use of logical properties, so those checks are measured, not guessed.
- **Native (Apple)**: read SwiftUI/UIKit source. When a simulator is available, capture screenshots and switch appearance and Dynamic Type through `xcrun simctl` (dark mode, largest accessibility size).
- **React Native / Expo**: source plus simulator screenshots the same way.
- **Screenshots only**: review what is visible, and list the states and behaviors that could not be verified.
- **Design system only**: audit tokens and component specs: type scale, color roles and their light/dark/high-contrast variants, spacing, elevation, radii, motion tokens, component inventory and states.

### 3. Stress states

A screen in its happy state hides most problems. The skill asks for, or generates when it can drive the app, these states: empty, loading, error, offline, very long strings and names, pseudo-localized text (+40% length), right-to-left, largest text size, dark mode and increased contrast, reduced motion, narrow and very wide windows. Anything it cannot see goes into an "unverified" list in the report.

### 4. Passes

Run in this order. The first pass is fast and catches the obvious template tells before the deep work.

1. **Slop scan**: the anti-pattern catalog (see below), covering AI-template tells and clone tells (Apple-clone, Material-clone, shadcn/Tailwind-default, praised-product clones).
1b. **Distinctiveness**: does the product have its own point of view on Apple's base, or is it a default? Judged against the brand direction in the profile; if none exists, propose 2 to 3 directions first.
2. **Structure**: navigation architecture, information hierarchy, component choice (tab bar vs sidebar vs split view; alert vs sheet vs popover vs inline), modality, action hierarchy and prominence.
3. **Visual**: layout and adaptivity, typography, color and contrast, materials and depth, iconography, imagery.
4. **Interaction and motion**: feedback, gestures, pointer/hover, keyboard and shortcuts, motion purpose and interruptibility, undo.
5. **Content**: writing and microcopy, error messages, empty states, onboarding, permission requests.
6. **Accessibility and inclusion**: measured checks plus judgment.
7. **Platform fit**: per-platform rules (iOS, iPadOS, macOS, iPhone Duo, web), and technology rules where used (AI features, payments and paywalls, sign-in, notifications, widgets).

For a whole-app audit the skill splits passes across subagents, then merges and de-duplicates. For one screen it runs inline.

### 5. Report

Findings, ranked by impact, then by Apple strength:

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|

- **Impact**: Blocker (task fails, data loss, accessibility failure, App Review rejection risk) / Major (feels wrong, non-native, generic) / Minor / Polish.
- **Apple**: MUST / SHOULD / CONSIDER taken from Apple's wording, or **Taste** for our own anti-slop rules, or **Web** for our translation of an Apple rule to the web.
- Hard cap on report length per unit; low-value polish items are grouped, not listed one by one.

Then:

- **Elevate**: 3 to 5 concrete moves that would make the work feel crafted, each tied to a principle (for example: motion that continues gesture velocity, one prominent action per view, type hierarchy by weight instead of size).
- **Unverified**: states and behaviors not seen.
- **Offer**: which findings it can fix in code, asking before editing.

## Knowledge files

Bundled in the skill as reference files, loaded only for the passes that need them:

| File | From |
|---|---|
| principles | Design principles, cross-cutting themes |
| platforms | iOS, iPadOS, macOS, iPhone Duo; transferable bits of visionOS/watchOS/tvOS/games |
| visual | Layout, typography (full type tables), color, Dark Mode, materials/Liquid Glass, motion, images |
| content-a11y | Writing, accessibility, inclusion, icons, SF Symbols, app icons, branding, privacy, right-to-left, VoiceOver |
| patterns | Loading, onboarding, feedback, modality, settings, undo, search, data entry, sharing, help, ratings, notifications |
| components-structure | Buttons, menus, toolbars, tab bars, sidebars, split views, lists, collections, search, plus a component choice guide |
| components-presentation | Alerts, sheets, popovers, windows, inputs, pickers, toggles, progress, widgets, Live Activities, plus a presentation choice guide |
| inputs-tech | Gestures, pointer, keyboard shortcut table, generative AI and ML, payments and paywalls, sign-in |
| beyond-hig | WWDC craft sessions (fluid interfaces, typography details, writing), Apple Style Guide, Design Awards criteria, App Store design rules, WebKit guidance |
| web-mapping | How Apple rules map to web (see below) |
| slop-catalog | Our anti-pattern list, editable, separate from Apple-derived rules |
| augment-* | Non-Apple literature, one file per area: other platform systems, product and government design systems, UX research, craft canon, distinctiveness, accessibility/cognition/ethics/i18n. Each item marked "adds to Apple" or "Apple silent here", with conflicts called out |
| writing | Merged UI-copy rules (Apple + humanizing-writing + interface-writing literature), AI-microcopy tells, product voice method, lintable string checks |

The existing digests (about 51,000 words) are the base for these files. The beyond-hig file comes from a separate research pass over Apple's non-HIG literature; anything in it that could not be fetched and was recalled from memory is marked unverified and carries lower weight.

Refresh (builder's call): `tools/` holds the crawl and DocC-to-markdown converter that already exist. Refresh means re-crawl, diff the markdown against the last snapshot, and list changed pages. Updating the digests from that diff is a manual, model-assisted step, not an automated pipeline.

Repo contents (builder's call): commit the digests and tools only. Raw crawled HIG text stays out of the repo (Apple copyright); the tools fetch it on demand. Repo is private on GitHub, installable by teammates as a plugin.

## Apple strength mapping (builder's call)

One rule, applied when normalizing all digests:

- **MUST**: Apple writes must, never, always, don't, or the rule is enforced by App Review.
- **SHOULD**: avoid, prefer, use, important, crucial, essential, and plain imperatives.
- **CONSIDER**: consider, can, may, if appropriate.

This keeps MUST rare, which keeps reports quiet. Impact, not Apple strength, drives the sort.

## Web mapping (fixed once, applied everywhere)

- Targets: 44 px goal, 24 px minimum (WCAG 2.2), spacing between targets from Apple's 12/24 pt guidance.
- Text: 16 px body minimum on mobile web; contrast by WCAG (4.5:1 body, 3:1 large), aim 7:1 for small text.
- Respect `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`, user font size (rem, not px).
- An in-app theme toggle is allowed only with "System" as its default.
- SF Pro and SF Symbols are licensed for Apple platforms only. Flag their use on web.
- Glass on web: the layering principle is enforced (chrome distinct from content, no glass in content). Emulating Liquid Glass is optional and needs a reduced-transparency fallback.
- Disabled-until-valid buttons: on web, prefer an enabled button with inline errors on submit, because disabled buttons cannot be focused or explain themselves.
- Apple idioms on web (from "principles, keep our brand"): web is never flagged for lacking an Apple-specific pattern (bottom tab bar, Title Case menus, trailing Done). It is flagged when it breaks the principle behind one: for example, primary navigation out of thumb reach on mobile, inconsistent casing, a popover-style overlay on a narrow phone screen where a full sheet works better (use the project's own breakpoints).
- Type scale on web: chosen by the profile's density setting. Comfortable apps measure against the iOS scale (17 pt body, mapped to 16–17 px); dense tools measure against the macOS scale (13 pt body, mapped to 13–14 px). Hierarchy rules (weight before size, few sizes) apply to both.

## Writing pass (builder's calls, from the writing research)

- Anti-fabrication is the one writing rule that never yields: no invented causes, counts, durations, or social proof in UI copy.
- Every copy finding includes a proposed rewrite, in the product's voice.
- Casing: a house choice per element type that must be consistent. Native Apple targets follow Apple's fixed rules (menus title case). Web products with no profile setting default to sentence case.
- Humor: set per product in the voice profile. Never in errors, destructive confirmations, money, or permission requests, whatever the profile says.
- Reading level is reported, not enforced, unless the profile sets a target.
- Long-form in-app prose (help articles, onboarding paragraphs, emails) is in scope and gets the full humanizing-writing rules.
- Relationship to humanizing-writing: the UI-scale rules and tells are adapted into hig-review's own writing reference, so the plugin works for teammates who don't have that skill. For long-form prose, hig-review invokes humanizing-writing when it is installed. Its `measure.py` is used only on joined longer strings, to compare builds, never on single labels.
- The AI-microcopy tells catalog is dated and versioned on its own, since trends move faster than rules.
- Confirmshaming, fake urgency and fake social proof belong to the deceptive-design gate: Blocker impact, in a Trust section of the report.

## Craft calls (builder's calls, from the augment research)

- Register: the profile records whether the product is utilitarian/professional or consumer/expressive, plus a motion personality on Apple's own axes (serious to playful, relaxed to fast). Motion and emphasis expectations follow it. Motion character comes from a few motion tokens tuned to that personality, never from borrowed curves.
- Type: the skill requires a small, consistent type system and stays neutral on modular ratios. Minimum text 11 pt on native iOS, 12 px on desktop and web. Line length 45 to 75 characters for reading text; UI copy is judged by its own length limits.
- Font suggestions: free and open-licensed faces by default, unless the profile lists faces the project has licensed.
- Contrast: WCAG 2 ratios are the pass/fail floor; APCA is an extra check for dark mode and thin weights.
- Convergence scoring: a qualitative verdict (authored, partly authored, default-assembled) backed by the counted tells that support it. No numeric score to game.
- Motion verification on web: static checks (no `transition: all`, reduced-motion handling, no animation on keyboard-triggered actions) plus timing real interactions through Playwright where the app runs.
- Native detection of defaults: inspect asset catalogs, tint and custom font use, and SF Symbol usage in SwiftUI/UIKit code, alongside simulator screenshots.

## Principle names

The skill uses the HIG's current design principles (reintroduced June 2026): Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight. Older framings (clarity, deference, depth; WWDC25's hierarchy, harmony, consistency) appear only as history.

## Distinctiveness pass

Runs only after the Apple-grounded passes, because usability problems lower how attractive people find a product (Walter's ordering; Tuch et al. 2012). Steps, in short:

- Classify each expressive channel (type, color use, shape, motion, iconography, imagery, sound/haptics, layout idiom, voice) as platform default, library default, trend default, or authored. At least two must be authored.
- Expression lives in expressive zones (first run, empty states, success moments, marketing surfaces). Task flows stay plain and standard.
- One signature element, used sparingly, and one or two signature moments per product. Zero reads as generic; more than two reads as noise. (M3 Expressive's "one or two hero moments" and Fluent's "native patterns 80% of the time" reach the same budget independently.)
- Identity must trace to the product's subject or core action, not to a mood board.
- Brand tests from Romaniuk's distinctive-assets work: hide the logo and ask if the screen is still recognizable; swap in a competitor's name and ask if anything feels wrong.
- Every recommendation must point at something in this product and must not match the convergence catalog.
- The skill must not become the next recipe. It never ships a house style, palette, font list, or motion preset. Proposed directions differ from each other on at least two channels, and each is derived from the product's own subject, so two products reviewed by the skill should not end up alike.

Convergence catalog, kept separate per source: Apple-clone, Material-clone, shadcn/Tailwind-default, AI-template, praised-product clone (Linear-style dark glow, Stripe-style gradient mesh, and similar).

The installed taste skills are used only for process rules (ground choices in the subject, check a plan against the default you'd produce anyway). Their look prescriptions and font swap lists are not used: several are now convergence tells themselves. Their "never pure black" rule conflicts with Apple's dark mode and is dropped.

## Highest-value sources beyond the HIG

The beyond-hig research (about 30 WWDC sessions with transcripts, including WWDC26; all 52 Apple Style Guide pages; 2026 Design Awards categories; App Review 4.1–4.3 and 5.1.1; WebKit posts) adds three things the skill leans on:

- **Accessibility Nutrition Label criteria** (App Store Connect): pass/fail checks such as 4.5:1 text and 3:1 non-text contrast, text scaling to at least 200%, no bright flashes in dark mode, Voice Control labels matching visible text, evaluated across common tasks (onboarding, login, purchase, settings). These become the accessibility pass's measured checklist.
- **App Review 4.2.6** (template-generated apps): Apple's own rule against cookie-cutter apps. Anchors the slop scan in something Apple enforces.
- **Craft numbers from WWDC**: fluid-interface and spring values (gesture hysteresis, damping with momentum, bounce ranges), typography optical-size and leading rules, widget content limits. These feed the motion and visual passes and the Elevate section.

## Conflicts in Apple's own guidance

When sources disagree, the newer one wins and the conflict is noted in the digest. Known:
- "we/our": writing.md (Dec 2025) says avoid "we"; inclusion.md keeps it for the company.
- Alert button capitalization: a house choice that must be consistent.
- Menu icons: WWDC26 hides menu icons by default in the macOS and iPadOS menu bar, partly reversing the 2025 advice to use symbols in menus.

## Repo layout

Mirrors the user's humanize-writing-skill plugin: SKILL.md at the root, marketplace with `"source": "."`, symlinked into `~/.claude/skills`.

```
hig-review/
  .claude-plugin/plugin.json, marketplace.json
  SKILL.md
  references/          knowledge files listed above, plus report and profile templates
  scripts/measure.js   in-page measurement for Playwright runs
  research/digests/    source digests from the research pass
  tools/               HIG crawl, convert, diff, number check
  evals/               eval cases and results
  docs/specs/, docs/plans/
  README.md
```

## Left to the builder

- Exact wording and length of SKILL.md (target under 500 lines, details pushed to references).
- How the digests are reshaped into reference files: merge, trim duplicates, keep numbers.
- The measurement script's implementation.
- Report length cap per review unit.
- Subagent split for whole-app audits.
- Test plan details, within the acceptance test below.

## Acceptance test: Wayfarer

Wayfarer (~/Documents/Personal/wayfarer) is the first real use, chosen by the user. It is an Angular, local-first API client in the middle of a design overhaul (PLAN-design.md, locked 2026-10-16). It already has a hand-run design audit (docs/design/audit.md, U-0xx), voice and direction docs, a component catalogue build, and Playwright screen captures.

The user asked for this to be a review and improvement exercise on Wayfarer as it is now, not a verification of the skill:

- **Profile bootstrap**: the first run builds `.hig-review.md` largely from Wayfarer's existing docs (voice.md, directions, tokens) and asks only what they don't answer.
- **Full review**: whole-app audit of the current build, plus the design system (tokens, components, catalogue) and the overhaul's direction itself.
- **Roll into the plan**: findings, changes and amendments go into PLAN-design.md and the docs it points to. Any part of the plan may be reworked. Changes follow the plan's own rules (a section 14 row for every change after lock; binary acceptance criteria on tasks).
- **Skill quality, as a by-product**: compare against the existing audit as a sanity check. Note where the skill missed what the audit found, or produced generic findings, and fix the skill.
- **Dense tool fit**: Wayfarer exercises the dense, professional profile path.
- **Care with work in progress**: Wayfarer has uncommitted changes from ongoing work. The review reads the running app and code without touching that work; plan edits are made so they don't collide with it (see the build plan).
