---
name: hig-review
description: Use when asked for a UI or UX review, design review, design pass, or design critique; to audit a screen, component, flow, whole app, or design system (tokens, components, DESIGN.md); to check work against Apple's Human Interface Guidelines; when someone asks whether an interface looks generic, templated, or AI-made; or before shipping UI. Covers iOS, iPadOS, macOS, iPhone Duo and web, in SwiftUI, UIKit, React, Next.js, React Native, Expo, Angular, Vue, or plain HTML/CSS/JS. Not for building new UI from scratch unless a review is also asked, and not for visionOS, watchOS, tvOS, visual regression, or pixel diffing.
---

# hig-review

Review an interface against Apple's Human Interface Guidelines and Apple's other design literature, find what is wrong or generic, and propose how to raise it. Other literature only augments Apple. The skill applies Apple's reasoning to the product's own brand; it never makes the product look like Apple's, or like anything else.

Report first. Edit nothing until the user picks findings to fix (step 7).

## Rules

- **Apple is the core.** Every augment check in `references/augment/` is labelled "adds to Apple", "Apple silent", or "CONFLICT". Augments never replace an Apple rule.
- **Conflicts.** Native Apple target: Apple wins on platform conventions. Web: Apple's principle is the default; research may sharpen how it applies, and the conflict is shown in the finding, never resolved silently. Brand: split by surface. Apple wins in task flows (forms, lists, navigation, settings); brand may win on display-only surfaces (hero, empty states, marketing, onboarding splash) only if accessibility still passes. Accessibility: the strictest source wins.
- **Two tags per finding.**
  - Impact: Blocker (task fails, data loss, accessibility failure, App Review rejection risk, deceptive design) / Major (feels wrong, non-native, generic) / Minor / Polish.
  - Apple column: MUST / SHOULD / CONSIDER from the Apple file's tag; Research for an "Apple silent" augment check; Taste for any `[Taste]` check, whatever its label; Web for our translation of an Apple rule to the web. An "adds to Apple" check shows the tag of the Apple rule it adds to. A CONFLICT shows the Apple tag and names the resolution in Fix.
- **Unverified sources.** A check marked `(unverified)` never makes a Blocker on its own. It needs a measured result or a verified rule beside it.
- **Specific or nothing.** Every finding names the element and the screen (or route, or file and line). If a finding would fit any app, drop it. "Improve hierarchy" and "consider accessibility" are not findings.
- **Never prescribe a look.** No house style, palette, font list, or motion preset. "Make it feel like X" becomes the mechanism behind X (hierarchy discipline, speed, keyboard-first), never X's look; say so when declining the look. Font suggestions are free or open-licensed faces unless the profile lists licensed ones. Never propose a trending look as a target, including Apple's (glass everywhere is a slop pattern).
- **Waivers.** Findings that match a profile waiver are skipped and counted as `waived: N`. A waiver never covers anti-fabrication, deceptive design, or an accessibility Blocker.
- **Deployment gate.** Checks tagged `(26+)` (Liquid Glass and other 26-era rules) run only where the detected iOS, iPadOS or macOS target is 26 or later. Below that they are skipped, not downgraded.
- **Principles.** Use the current HIG principles: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight. Clarity/deference/depth and hierarchy/harmony/consistency are history only.
- **Read-only.** The review reads code and drives the running app. It does not modify files, commit, or touch the user's uncommitted work, except in step 7 for findings the user picked.

## 0. Scope and inputs

Settle two things before gathering anything:

1. **Unit**: one screen or component, one flow (name its start and end), the whole app, or a design system on its own.
2. **Input**: a running web app (URL), native source (Xcode project or Swift package), React Native/Expo source, screenshots or mockups, or design-system files (tokens, component specs, DESIGN.md, Figma variable exports). Several can combine.

If either is unclear from the request, ask once, together with the profile questions in step 1. A whole-app review of a running app plus its source is the deepest form; screenshots alone are the shallowest, and the report says so.

## 1. Profile

Look for `.hig-review.md` at the reviewed repo root. If it exists, read it and obey it. If it lacks keys that `references/profile-template.md` defines, infer them for this run and offer to add them at the end.

If it does not exist, bootstrap it:

1. Read the repo's own design sources first, in this order: `docs/design/*`, DESIGN.md, voice, tone and direction docs, design plans, token files (CSS variables, JSON tokens, Tailwind config, asset catalog colors), any existing design audit.
2. Then read manifests: `*.xcodeproj/project.pbxproj`, `Package.swift`, `Info.plist` (`UIAppFonts`), `app.json`/`app.config.*`, `package.json` (react, next, expo, @angular/core, vue, browserslist), framework configs, README.
3. Fill every key in `references/profile-template.md` that the sources answer, and note the source for each.
4. Ask every remaining gap in one batch (use AskUserQuestion when available). Typical gaps: purpose in one sentence, the feeling it should leave, audience and usage frequency, register, motion personality, humor. Do not ask for `direction`; if it is empty, the distinctiveness pass proposes options.
5. Show the drafted file. Write `.hig-review.md` only after the user confirms its contents. If they decline, run with the draft in memory and say so in the report summary.

The profile drives the rest: `platforms` picks the platform rules, `deployment_targets` gates `(26+)`, `density` picks the type scale (comfortable = iOS 17 pt body, dense = macOS 13 pt body), `audience` and `areas` resolve source conflicts, `voice` is the standard for every copy rewrite, `direction` is the yardstick for distinctiveness.

## 2. Intake

Save evidence (screenshots, measure.js output, notes) to a folder outside the reviewed repo, such as the session scratchpad, and keep the paths: findings cite them and subagents read them.

**Deployment targets.** Read `IPHONEOS_DEPLOYMENT_TARGET` and `MACOSX_DEPLOYMENT_TARGET` in `project.pbxproj`, the platforms in `Package.swift`, and `expo.ios.deploymentTarget` in `app.json`. Record them in the profile. They decide the `(26+)` gate.

**iPhone Duo.** System components adapt automatically. Run the Duo checks in `references/apple/principles-platforms.md` when an iOS app uses custom bars, fixed widths or odd-column grids, or the profile lists `iphone-duo`.

| Input | How to gather |
|---|---|
| Running web app | Use the Playwright MCP tools (named `mcp__plugin_playwright_playwright__*` or `mcp__playwright__*`, whichever exist). `browser_navigate` to each screen in the unit. At widths 390, 820 and 1440 px (`browser_resize`): screenshot in light and in dark (`browser_emulate_media` with `colorScheme`), and run measure.js (below). Repeat once with `reducedMotion: 'reduce'`. For 200% text, set the root font size to 200% in a `browser_evaluate` call and screenshot again. Walk the keyboard with `browser_press_key` Tab from the top, recording focus order and whether focus is visible at each stop. `browser_hover` the primary controls and anything that only reveals on hover. Time real interactions (open, close, submit) where motion matters. |
| Native Apple | Read SwiftUI/UIKit source: navigation containers, presentation calls, custom controls, fonts, tint, asset catalogs, SF Symbol use. Run `xcrun simctl list devices booted`. If a device is booted with the app: `xcrun simctl io booted screenshot <path>`; `xcrun simctl ui booted appearance dark` and screenshot again; `xcrun simctl ui booted content_size accessibility-extra-extra-extra-large` and screenshot again. Restore appearance and content size afterwards. If nothing is booted, ask the user to launch the app, or review source only and list what went unseen. |
| React Native / Expo | Source as above (components, StyleSheet values, `accessibilityLabel`/`accessibilityRole`, `allowFontScaling`), plus simulator screenshots the same way. Expo web builds can also go through the web row. |
| Screenshots or mockups | Review what is visible. Estimate sizes only against a known reference in the image and mark them estimated. List every state and behavior that could not be seen. |
| Design system only | Audit tokens and specs: type scale, color roles with light, dark and increased-contrast variants (compute contrast for each text/background pair), spacing scale, elevation, radii, motion tokens, component inventory and each component's states (default, hover, focus, pressed, disabled, error, loading). |

**Running measure.js.** Read `scripts/measure.js` and pass its full text, unchanged, as the `function` argument to `browser_evaluate`. It returns:

- `viewport`, `sampled` (true means it hit its 400-item cap; say the results are sampled),
- `contrast[]`: selector, text, fg, bg, ratio, size, weight, large, `status` (`ok`, `fail`, `unmeasurable`),
- `targets[]`: selector, role, width, height, `under24`, `under44`,
- `type`: families, size counts, `minSize`, `distinctSizes`, `letterSpacingBySize`,
- `motion`: `transitionAll`, `reducedMotionRule`, `animatedOnLoad`,
- `defaults[]`: detected template tells with evidence, for the slop scan.

`status: unmeasurable` (text over an image or gradient, or a color it could not parse) means check by eye. It is never a pass. Judge `targets` against `references/web-mapping.md` (44 px goal, 24 px minimum, 48 px for shared cross-platform code), `contrast` against WCAG 2 (4.5:1 body, 3:1 large and non-text) with APCA as an extra check, and `type.minSize` against 16 px body on mobile web and 12 px minimum on desktop.

If no Playwright tools are available, say so, ask the user for screenshots at those widths and modes, and mark the measured checks Unverified.

## 3. Stress states

The happy state hides most problems. Cover these for every screen in the unit:

- empty (no data)
- loading (slow network)
- error and offline
- very long strings and names
- pseudo-localized text, about 40% longer
- right-to-left
- largest text size (200% on web, AX5 on native)
- dark mode and increased contrast
- reduced motion
- narrow and very wide windows

When the skill can drive the app, generate them. Empty: clear the app's data or use a fresh account the user provides. Error and offline: block requests through Playwright's network or routing tools if available, otherwise ask the user how to trigger them. Long strings and pseudo-localization: replace text nodes in a throwaway `browser_evaluate` (pad by 40%, add accented characters) and screenshot; reload afterwards. RTL: set `dir="rtl"` on the root element. Increased contrast: `browser_emulate_media` with `contrast: 'more'`, and `forcedColors: 'active'` for Windows high contrast; on native, the system setting. On native, read source for empty, error and loading branches.

Anything not seen goes in the report's Unverified section with what would verify it.

## 4. Passes

Run the passes in this order. Each loads only its files. Reference files are long; read the headings first (`grep -n '^## '`) and then the sections that apply to the unit. On web, and on any screen with forms or dense data, also load `references/augment/ux-research.md` and `references/augment/product-gov-systems.md`.

| Pass | Load |
|---|---|
| 1. Slop scan | `references/slop-catalog.md`, `references/apple/beyond-hig.md` (App Review 4.2.6) |
| 2. Structure | `references/apple/components-structure.md`, `references/apple/components-presentation.md`, `references/apple/patterns.md` |
| 3. Visual | `references/apple/visual.md`, `references/augment/craft.md`, `references/apple/beyond-hig.md`, `references/augment/platform-systems.md` |
| 4. Interaction and motion | `references/apple/inputs-tech.md`, the Motion section of `references/apple/visual.md`, `references/augment/craft.md`, `references/apple/beyond-hig.md` |
| 5. Content | `references/writing.md`, `references/apple/beyond-hig.md` (Writing and the Apple Style Guide) |
| 6. Accessibility | `references/apple/content-a11y.md`, `references/augment/a11y-cognition-ethics-i18n.md`, `references/apple/beyond-hig.md` (Accessibility, Nutrition Label criteria) |
| 7. Platform fit | `references/apple/principles-platforms.md`, `references/apple/inputs-tech.md`, `references/web-mapping.md`, `references/augment/platform-systems.md` |
| 8. Distinctiveness | `references/augment/distinctiveness.md`, `references/apple/principles-platforms.md`, `references/augment/craft.md` |

Load `references/web-mapping.md` in every pass when the target is web.

**1. Slop scan.** Fast, before the deep work. Walk `references/slop-catalog.md` section by section (AI-template, Apple-clone, Material-clone, shadcn/Tailwind-default, praised-product clone, research-blessed patterns gone generic, AI-microcopy) against the screenshots, source and measure.js `defaults`. Count tells per section with the element each sits on; the distinctiveness verdict uses the counts. App Review 4.2.6 (template-generated apps) is Apple's own rule against cookie-cutter apps; cite it for native apps that read as templates.

**2. Structure.** Navigation architecture (tab bar, sidebar, split view, or the web equivalent for the project's breakpoints), information hierarchy, component choice (alert vs sheet vs popover vs inline), modality, action hierarchy (one prominent action per view), destructive-action placement. Check the Trust gate here too: obstruction (cancel harder than sign-up), forced action, preselection, hidden costs in flows. Gate items are in the "Trust gate" section of `references/augment/ux-research.md`.

**3. Visual.** Layout and adaptivity at each captured width, type system (few sizes, weight before size, scale chosen by `density`, minimum sizes), color roles and contrast in both appearances, materials and depth (chrome distinct from content, no glass in the content layer), iconography, imagery. Use measure.js numbers wherever they exist.

**4. Interaction and motion.** Feedback for every action, gestures, pointer and hover, keyboard access and shortcuts (the macOS shortcut table in `references/apple/inputs-tech.md`), focus order and visibility from the Tab walk, motion purpose and interruptibility, reduced-motion handling, undo. Judge motion against the profile's `register` and `motion_personality`: a serious, relaxed tool is flagged for bouncy springs, a playful one is not. Flag `transition: all`, animation on keyboard-triggered actions, and missing reduced-motion rules from measure.js.

**5. Content.** Every visible string by message type (labels, buttons, titles, errors, empty states, confirmations, success, onboarding, permissions, notifications, AI features, settings, tooltips, loading) against `references/writing.md`, judged by the profile's `voice`. Every copy finding includes a rewrite in that voice. Anti-fabrication never yields: no invented causes, counts, durations, or social proof. Humor never appears in errors, destructive confirmations, money, or permission requests, whatever the profile says. Flag mixed spelling against `voice.spelling` and inconsistent casing against `voice.casing`. Check the Trust gate here: confirmshaming, fake urgency or scarcity, fake social proof, trick questions, unlabelled ads. For long-form in-app prose (help articles, onboarding paragraphs, emails), invoke the humanizing-writing skill if it is installed; otherwise apply the long-form rules in `references/writing.md`.

**6. Accessibility.** The measured checks first (contrast, targets, text scaling to 200%, focus visibility, reduced motion), then judgment: labels that match visible text (Voice Control), VoiceOver or screen-reader order and names, meaning carried by color alone, flashing content, cognitive load, RTL and localization. The Accessibility Nutrition Label criteria in `references/apple/beyond-hig.md` are the checklist for common tasks (onboarding, login, purchase, settings). A failed measured check here is a Blocker.

**7. Platform fit.** Per-platform rules for the platforms in the profile only; a web-only profile never gets native rules. On web, never flag a missing Apple idiom (bottom tab bar, Title Case menus, trailing Done); flag the broken principle behind one, using the "Apple idioms on web" section of `references/web-mapping.md`. Flag SF Pro or SF Symbols on web (licensed for Apple platforms only). Technology rules where used: AI features, payments and paywalls, sign-in, notifications, widgets.

**8. Distinctiveness.** Runs after passes 2 to 7, following the procedure in `references/augment/distinctiveness.md`. Gate first: for any flow with an open Blocker or Major from the Apple passes, hold pleasure-tier and expression findings for that flow and list them after the fixes. Then classify the nine expressive channels (platform default, library default, trend default, authored; at least two authored), check where expression sits by surface, count signature elements and moments against the budget for the profile's `register`, trace identity to the product's subject, and run the logo-off and competitor-swap tests. Judge against the profile's `direction`. If it is empty, propose 2 or 3 directions derived from the product's subject and audience, differing from each other on at least two channels, and ask the user to pick one; save the pick to the profile once they confirm.

**Trust.** Deceptive-design hits from passes 2 and 5 are Blockers and go in the report's own Trust section, each with the element, the screen, and the honest rewrite.

## 5. Whole-app split

For a screen, a flow, or a design system, run every pass inline. For a whole app, after steps 1 to 3, dispatch four subagents in parallel:

| Subagent | Passes | Reference files |
|---|---|---|
| A | Structure, platform fit | the files for passes 2 and 7 |
| B | Visual, interaction and motion | the files for passes 3 and 4 |
| C | Content | the files for pass 5 |
| D | Accessibility, Trust gate | the files for pass 6, plus the Trust gate section of `references/augment/ux-research.md` |

Give each subagent: the confirmed profile contents, the list of screens and routes, the evidence paths (screenshots, measure.js output per viewport and mode), its reference file paths, the Rules section of this file, the web-mapping file when the target is web, and the finding format (Finding, Where, Impact, Apple, Fix, evidence path). Tell it to return findings only, specific to named elements, with no report prose, and to list what it could not verify.

The main thread runs the slop scan, then waits for all four, then runs distinctiveness with their results (it needs the open Blockers and Majors for the gate). Then merge: de-duplicate findings that share an element and cause (keep the higher impact, combine the Where), resolve tag disagreements by the Rules section, apply waivers, and cap per the report template.

## 6. Report

Follow `references/report-template.md`: Summary, Findings, Trust, Distinctiveness verdict, Elevate, Unverified, Offer.

- Sort by Impact, then Apple column in this order: MUST, SHOULD, CONSIDER, Research, Taste, Web.
- Caps: screen 15, flow 25, whole app 40, design system 30. Merge duplicates first. Group Polish beyond the cap into one row. Never drop a higher-impact finding to fit.
- Number findings; step 7 refers to them by number.
- Put `waived: N` under the findings table.

**Elevate.** 3 to 5 moves toward craft. Each one is tied to one HIG principle (Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight) and to something specific in this product: a named screen, its core action, its content. Describe the mechanism (motion that continues gesture velocity, one prominent action per view, hierarchy by weight instead of size, an empty state that teaches the core action), never a look. Before a move goes in, check it against `references/slop-catalog.md` and ask "would this fit any product?" If it matches a catalog tell or would fit anywhere, rewrite it or cut it.

**Unverified.** One line per state, platform, flow or measured check not seen, with what would verify it.

## 7. Offer fixes

List the findings fixable in code by number, grouped (for example "copy rewrites: 3, 7, 12", "contrast tokens: 2, 5", "target sizes: 4"), and say which need a design decision first. Ask which to fix.

Edit only the findings the user picks. Keep each edit to what the finding names; do not refactor around it, and leave unrelated uncommitted work untouched. After editing, re-run the checks that found the problem: measure.js at the affected widths and modes for measured findings, a fresh screenshot for visual ones, a reread of the strings for copy. Report what changed, what now passes, and anything that still fails. Do not commit unless asked.
