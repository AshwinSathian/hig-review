# Workflow: the nine passes

Covers: step 4 of SKILL.md: what each pass loads and checks, the design-system-only variant, Trust, and the rework bar as applied.
Loaded by: the main thread at step 4; pass subagents in a whole-app split (`references/whole-app-split.md`).

## Loading

Run the passes in order. Each loads only its files, plus the "Stance" section of `references/augment/red-team.md`. Reference files are long: read the headings first (`grep -n '^## '`), then load only the sections that apply to the unit, never whole files.

| Pass | Load |
|---|---|
| 1. Slop scan | `references/slop-catalog.md`, `references/apple/beyond-hig.md` (App Review 4.2.6, 4.3) |
| 2. Structure | `references/apple/components-structure.md`, `references/apple/components-presentation.md`, `references/apple/patterns.md` |
| 3. Visual | `references/apple/visual.md`, `references/apple/content-a11y.md` (icons, SF Symbols, app icons, branding), `references/augment/typography.md`, `references/augment/craft.md`, `references/apple/beyond-hig.md`, `references/augment/platform-systems.md` |
| 4. Interaction and motion | `references/apple/inputs-tech.md`, the Motion section of `references/apple/visual.md`, `references/apple/patterns.md` (feedback, undo, loading), `references/apple/components-presentation.md`, `references/augment/craft.md`, `references/apple/beyond-hig.md`, `references/augment/platform-systems.md`, the motion and preferences section of `references/augment/a11y-cognition-ethics-i18n.md` |
| 5. Content | `references/writing.md`, `references/apple/patterns.md` (onboarding, notifications, help), `references/apple/inputs-tech.md` (AI features, sign-in, paywalls), `references/apple/beyond-hig.md` (Writing and the Apple Style Guide), `references/augment/a11y-cognition-ethics-i18n.md` (localization, ethical design) |
| 6. Accessibility | `references/apple/content-a11y.md`, `references/augment/a11y-cognition-ethics-i18n.md`, `references/augment/typography.md` (Legibility), `references/apple/beyond-hig.md` (Accessibility, Nutrition Label criteria) |
| 7. Platform fit | `references/apple/principles-platforms.md`, `references/apple/components-structure.md`, `references/apple/inputs-tech.md`, `references/augment/platform-systems.md`, `references/augment/a11y-cognition-ethics-i18n.md` (platform accessibility beyond Apple) |
| 8. Distinctiveness | `references/augment/distinctiveness.md`, `references/augment/landscape.md`, `references/augment/typography.md` (Distinctiveness, Procedure step 5), `references/apple/principles-platforms.md`, `references/augment/craft.md`, `references/augment/platform-systems.md` |
| 9. Red team | `references/augment/red-team.md`, `references/augment/landscape.md`, plus whatever the attack needs from the files above |

Conditional loads:

- Target is web: `references/web-mapping.md` in every pass.
- Target is web, or the screen has forms or dense data: `references/augment/ux-research.md` in passes 2, 4, 5 and 6, and `references/augment/product-gov-systems.md` in passes 2, 5 and 6.
- Any product with sign-up, paywall, subscription or consent flows, native included: passes 2 and 5 load the "Trust gate" section of `references/augment/ux-research.md`.

**Slop-cluster threshold** (passes 1 and 8): 6 or more tells spanning at least 3 of the nine channels. The distinctiveness procedure (`references/augment/distinctiveness.md` step 10) sets the verdict; meeting this threshold forces `default-assembled`.

## Design system only

The distinctiveness brand tests (logo-off, competitor swap) need rendered screens; with tokens only, put them in Unverified. The landscape step is optional (seed playbooks unless the profile names peers), and the red team attacks the system layer only (ladder layer 5, plus root-cause clustering). Run the slop scan, visual, accessibility and distinctiveness passes, plus content for component specs and their copy. Skip structure, interaction and platform fit, except the component choice rules in `references/apple/components-structure.md` and `references/apple/components-presentation.md`, applied to the component inventory.

## Passes 1 to 9

**1. Slop scan.** Fast, before the deep work. Walk `references/slop-catalog.md` section by section (AI-template, Apple-clone, Material-clone, shadcn/Tailwind-default, praised-product clone, research-blessed patterns gone generic, AI-microcopy) against the screenshots, source and measure.js `defaults`. Count tells per section and per channel, with the element each sits on, and apply the slop-cluster threshold. App Review 4.2.6 applies only with evidence that the app comes from a commercialised template or app-generation service and was submitted by someone other than the content provider (generator or template-vendor boilerplate, identifiers, shared bundle structure). A generic look alone cites 4.3 at most, as Taste, Major, never Blocker.

**2. Structure.** Navigation architecture (tab bar, sidebar, split view, or the web equivalent for the project's breakpoints), information hierarchy, component choice (alert vs sheet vs popover vs inline), modality, action hierarchy (one prominent action per view), destructive-action placement. Check the Trust gate: obstruction (cancel harder than sign-up), forced action, preselection, hidden costs in flows ("Trust gate" in `references/augment/ux-research.md`).

**3. Visual.** Layout and adaptivity at each captured width; type system (few sizes, weight before size, scale chosen by `density`, minimum sizes) and each typeface's fit for its role (one verdict block per face, `references/augment/typography.md`); color roles and contrast in both appearances; materials and depth (chrome distinct from content); iconography; imagery. Use measure.js numbers wherever they exist. On native targets, standard materials (`.ultraThinMaterial` and the rest) are allowed in content per Apple; the `(26+)` "no Liquid Glass in the content layer" MUST covers Liquid Glass (`glassEffect`, glass button styles), not standard materials. On web, see "Materials and glass" in `references/web-mapping.md` (translucency in content is flagged). A dark-mode issue takes the same Impact as its light-mode equivalent. A literal color (hex, RGB, `Color(red:…)`) used for text or UI with no dark-mode and increased-contrast variant is Major, whatever its current contrast ratio (Color: best practices in `references/apple/visual.md`).

**4. Interaction and motion.** Feedback for every action, gestures, pointer and hover, keyboard access and shortcuts (the macOS shortcut table in `references/apple/inputs-tech.md`), focus order and visibility from the Tab walk, motion purpose and interruptibility, reduced-motion handling, undo. Judge motion against the profile's `register` and `motion_personality`: a serious, relaxed tool is flagged for bouncy springs, a playful one is not. Flag `transition: all`, animation on keyboard-triggered actions, and missing reduced-motion rules from measure.js.

**5. Content.** Every visible string by message type (labels, buttons, titles, errors, empty states, confirmations, success, onboarding, permissions, notifications, AI features, settings, tooltips, loading) against `references/writing.md`, judged by the profile's `voice`. Every copy finding includes a rewrite in that voice. Anti-fabrication never yields: no invented causes, counts, durations, or social proof. Placeholder or sample figures in a development build go in Unverified, not Trust. Humor never appears in errors, destructive confirmations, money, or permission requests, whatever the profile says. Flag mixed spelling against `voice.spelling` and inconsistent casing against `voice.casing`. Check the Trust gate: confirmshaming, fake urgency or scarcity, fake social proof, trick questions, unlabelled ads. For long-form in-app prose (help articles, onboarding paragraphs, emails), invoke the humanizing-writing skill if installed; otherwise apply the long-form rules in `references/writing.md`.

**6. Accessibility.** Measured checks first (contrast, targets, text scaling to 200%, focus visibility, reduced motion), then judgment: labels that match visible text (Voice Control), VoiceOver or screen-reader order and names, meaning carried by color alone, flashing content, cognitive load, RTL and localization. The Accessibility Nutrition Label criteria in `references/apple/beyond-hig.md` are the checklist for common tasks (onboarding, login, purchase, settings). A measured or source-confirmed WCAG A/AA failure, or an Apple MUST that meets the Blocker bar in SKILL.md Rules, is a Blocker; judged issues cap at Major. Text sized in px that ignores the root font size while browser zoom still works passes WCAG 1.4.4: Major (respect the user's font size and Dynamic Type), not Blocker.

**7. Platform fit.** Per-platform rules for the profile's platforms only; a web-only profile never gets native rules. On web, never flag a missing Apple idiom (bottom tab bar, Title Case menus, trailing Done); flag the broken principle behind one ("Apple idioms on web" in `references/web-mapping.md`). Flag SF Pro or SF Symbols on web (licensed for Apple platforms only). Technology rules where used: AI features, payments and paywalls, sign-in, notifications, widgets. A speculative finding for a platform or pose the profile does not target (iPhone Duo with no `iphone-duo` in `platforms`) is at most Minor, or goes to Unverified.

**8. Distinctiveness.** Runs after passes 2 to 7, following `references/augment/distinctiveness.md`. Gate first: for any flow with an open Blocker or Major from the Apple passes, hold pleasure-tier and expression findings for that flow and list them after the fixes. Then classify the nine expressive channels (platform default, library default, trend default, authored; at least two authored), check where expression sits by surface, count signature elements and moments against the budget for the profile's `register`, trace identity to the product's subject, and run the logo-off and competitor-swap tests. Step 10 of the procedure sets the verdict; the slop-cluster threshold forces `default-assembled` when met. Judge against the profile's `direction`. If it is empty, propose 2 or 3 directions derived from the product's subject, audience and landscape, differing from each other on at least two channels, each with a theming sketch and a landscape position ("Theming and identity proposals" in `references/augment/distinctiveness.md`), and ask the user to pick one; save the pick to the profile once they confirm. If a direction is set, check the current theme against it and propose a theming sketch only where the product drifts from it.

**9. Red team.** Runs last, after the findings are drafted. Follow `references/augment/red-team.md`: walk the attack ladder from premise down, counting steps on the core task and first run against the best peer's from the landscape; cluster all findings by root cause; test each candidate rework against the rework bar (see below); write the enhancements (each traced to this product and to the landscape, covering only the areas where the evidence points: flows, information architecture, visual design and theming, brand and identity, motion and feedback, content and voice, platform capabilities); then run the softness audit on the whole draft and revise it. New defects found here go into the Findings table under the normal Impact rules.

## Trust

Deceptive-design hits from passes 2 and 5 are Blockers and go in the report's own Trust section, each with the element, the screen, and the honest rewrite. In a whole-app split, subagent D owns them.

## Rework bar in practice

"No rework warranted", with the reason, is the expected result for a well-built product; a good single-screen app rarely needs one. When applying the bar in `references/augment/red-team.md`:

- **Cluster** needs one stated root cause shared by every cited finding. Findings that merely sit on the same screen, or share a cause only loosely, do not count.
- **Premise** is not met by a missing feature. A feature the product lacks is an enhancement candidate.
- A rework that adds a feature and costs one screen or less is an Enhancement, not a Rework, whatever condition it cites.
