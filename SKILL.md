---
name: hig-review
description: Use when asked for a UI or UX review, design review, design pass, or design critique; to audit a screen, component, flow, whole app, or design system (tokens, components, DESIGN.md); to check work against Apple's Human Interface Guidelines; when someone asks whether an interface looks generic, templated, or AI-made; when someone wants redesign, rework, branding or theming ideas, a competitive UX teardown, or to make UI best-in-class; or before shipping UI. Covers iOS, iPadOS, macOS, iPhone Duo and web, in SwiftUI, UIKit, React, Next.js, React Native, Expo, Angular, Vue, or plain HTML/CSS/JS. Not for building new UI from scratch unless a review is also asked, and not for visionOS, watchOS, tvOS, visual regression, or pixel diffing.
---

# hig-review

Review an interface against Apple's Human Interface Guidelines and Apple's other design literature, find what is wrong or generic, research what the best products in its category do now, and propose how to raise it: fixes, enhancements, and reworks where the evidence demands them. Other literature only augments Apple. The skill applies Apple's reasoning to the product's own brand; it never makes the product look like Apple's, a peer's, or anything else.

The review works as a red team: it assumes the design is wrong until the evidence says otherwise, attacks the premise and the flows as well as the pixels, and attacks its own draft before reporting. It is aggressive, not inflated: Impact rules do not change, and "no rework warranted" is a valid result.

Report first. Edit nothing until the user picks findings to fix (step 7).

## Rules

- **Apple is the core.** Every augment check in `references/augment/` is labelled "adds to Apple", "Apple silent", or "CONFLICT". Augments never replace an Apple rule.
- **Conflicts.** Native Apple target: Apple wins on platform conventions. Web: Apple's principle is the default; research may sharpen how it applies, and the conflict is shown in the finding, never resolved silently. Brand: split by surface. Apple wins in task flows (forms, lists, navigation, settings); brand may win on display-only surfaces (hero, empty states, marketing, onboarding splash) only if accessibility still passes. Accessibility: the strictest source wins.
- **Two tags per finding.**
  - Impact: Blocker / Major (feels wrong, non-native, generic) / Minor / Polish. Blocker needs one of: a measured or source-confirmed WCAG A/AA failure (1.4.3 text contrast; 1.4.11 non-text contrast 3:1 for component boundaries, counted only when the boundary is the component's sole visual identifier, with no fill, visible label or other cue marking the field; 2.5.8 targets after the spacing exception; 4.1.2 name/role/value, such as an icon button with no accessible name), an Apple MUST on a native Apple target whose breach makes the task fail, blocks an accessibility need, or risks App Review rejection, data loss, a Trust-gate item, or a task that cannot be completed in a release-stage build. Every other MUST caps at Major. On web, a native Apple rule with no WCAG criterion behind it shows Web in the Apple column and caps at Major. Judged issues (such as placeholder-only labels where an accessible name still exists) cap at Major.
  - Apple column: MUST / SHOULD / CONSIDER from the Apple file's tag; Research for an "Apple silent" augment check; Taste for any `[Taste]` check, whatever its label; Web for our translation of an Apple rule to the web. An "adds to Apple" check shows the tag of the Apple line you cite from `references/apple/`; if you cannot cite one, it shows Research. An augment line's own [MUST] never counts as an Apple MUST (Trust-gate Blockers keep their own basis). A WCAG-backed web rule shows Web. A CONFLICT resolved toward Apple shows the Apple tag; resolved toward the outside source, Research; either way Fix names the resolution. A slop-cluster finding shows Taste with impact Major and sorts with the rest. A finding no rule covers shows Taste and says "reviewer judgement" in the Finding text.
  - Copy the Apple tag verbatim from the cited reference line. Never upgrade it.
- **Release-bound only.** App Review 4.2 minimum-functionality and 2.1 app-completeness checks (placeholder content, broken links or features) apply only when the profile's `release_stage` is `release` or the user says the build is going to App Review. For in-development code, report placeholders as notes in Unverified, not Blockers. 4.1 Copycats, 4.2.6 template apps and 4.3 Spam are not gated: report them at any stage.
- **Dead controls.** With `release_stage: development` (the default), a control with no handler or no visible effect is Major, plus an Unverified line saying it may be unfinished. It is a Blocker only when `release_stage` is `release`.
- **Unverified sources.** A check marked `(unverified)` never makes a Blocker on its own. It needs a measured result or a verified rule beside it.
- **Specific or nothing.** Every finding names the element and the screen (or route, or file and line). If a finding would fit any app, drop it. "Improve hierarchy" and "consider accessibility" are not findings.
- **Red-team stance.** Every pass reads "Stance" in `references/augment/red-team.md` first. Attack top-down (premise, model, flows, screens, system, brand, edges). Every attack needs evidence (a measurement, file and line, screenshot region, step count, a sourced peer comparison, or a profile goal it breaks); an attack without evidence is dropped, never softened into "consider".
- **Proposals come from the product, never from taste.** No house style reused across products. Concrete branding and theming proposals (color roles with values, type candidates, motion tokens) are allowed only as theming sketches that follow "Theming and identity proposals" in `references/augment/distinctiveness.md`: every value traced to a brand asset, the subject's material, a landscape gap or the audience, then checked against the model's own default, the researched peers and `references/slop-catalog.md`. "Make it feel like X" becomes the mechanism behind X (hierarchy discipline, speed, keyboard-first), never X's look; say so when declining the look. Font candidates are free or open-licensed unless the profile lists licensed ones. Never propose a trending look as a target, including Apple's (glass everywhere is a slop pattern).
- **Three proposal classes.** Fix (a defect: Findings table), Enhancement (an improvement with no defect behind it: Enhancements), Rework (a structural change that clears the rework bar in `references/augment/red-team.md`: Reworks, at most three). An enhancement is never a fix in disguise, and a rework that clears no bar condition is downgraded or dropped.
- **Waivers.** Findings that match a profile waiver are skipped and counted as `waived: N`. A waiver never covers anti-fabrication, deceptive design, or an accessibility Blocker.
- **Deployment gate.** Checks tagged `(26+)` (Liquid Glass and other 26-era rules) run only where the detected iOS, iPadOS or macOS target is 26 or later. Below that they are skipped, not downgraded.
- **Principles.** Use the current HIG principles: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight. Clarity/deference/depth and hierarchy/harmony/consistency are history only.
- **Read-only.** The review reads code and drives the running app. It does not modify files, commit, or touch the user's uncommitted work, except step 7 and writing the confirmed profile.

## 0. Scope and inputs

Settle two things before gathering anything:

1. **Unit**: one screen or component, one flow (name its start and end), the whole app, or a design system on its own.
2. **Input**: a running web app (URL), native source (Xcode project or Swift package), React Native/Expo source, screenshots or mockups, or design-system files (tokens, component specs, DESIGN.md, Figma variable exports). Several can combine.

If either is unclear from the request, ask once, together with the profile questions in step 1. A whole-app review of a running app plus its source is the deepest form; screenshots alone are the shallowest, and the report says so.

**Large apps.** If the app has more screens than one review can cover well, propose a scope: the core flows (the product's main task, sign-up or first run, purchase or settings where they exist) and the most-used screens. Confirm it in the step 1 batch. Everything left out goes in Unverified as "not reviewed".

## 1. Profile

Look for `.hig-review.md` at the reviewed repo root. If it exists, read it and obey it. If it lacks keys that `references/profile-template.md` defines, infer them for this run and offer to add them at the end.

If it does not exist, bootstrap it:

1. Read the repo's own design sources first, in this order: `docs/design/*`, DESIGN.md, voice, tone and direction docs, design plans, token files (CSS variables, JSON tokens, Tailwind config, asset catalog colors), any existing design audit.
2. Then read manifests: `*.xcodeproj/project.pbxproj`, `Package.swift`, `Info.plist` (`UIAppFonts`), `app.json`/`app.config.*`, `package.json` (react, next, expo, @angular/core, vue, browserslist), framework configs, README.
3. Detect deployment targets (they decide the `(26+)` gate):
   - Native: `IPHONEOS_DEPLOYMENT_TARGET` and `MACOSX_DEPLOYMENT_TARGET` in `project.pbxproj`; `platforms:` in `Package.swift`; `MinimumOSVersion` or `LSMinimumSystemVersion` in `Info.plist`.
   - Expo: the `expo-build-properties` plugin entry in `app.json` or `app.config.*` (`plugins: [["expo-build-properties", {"ios": {"deploymentTarget": "…"}}]]`).
   - Bare React Native: `platform :ios, '…'` in `ios/Podfile`, and `project.pbxproj` under `ios/`.
4. Fill every key in `references/profile-template.md` that the sources answer, and note the source for each.
5. Ask every remaining gap in one batch (use AskUserQuestion when available), including any deployment target not found and the scope proposal for large apps. Typical gaps: purpose in one sentence, the feeling it should leave, audience and usage frequency, register, motion personality, humor, the product category and the competitors or products the team measures itself against (`category`, `peers`). Do not ask for `direction`; if it is empty, the distinctiveness pass proposes options. If a deployment target is still unknown after asking, skip the `(26+)` checks and add an Unverified line naming them.
6. Show the drafted file. Write `.hig-review.md` only after the user confirms its contents. If they decline, run with the draft in memory and say so in the report summary.

**Existing design audit.** If the repo has one, cite the prior finding IDs a new finding overlaps, flag regressions of items it marks fixed, and do not re-file items it lists as fixed or open. Report new findings separately from confirmations of prior ones.

**No answers.** If the user is unavailable or does not answer, run from the inferred draft with safe defaults: `humor: none`; casing as inferred from existing strings, else sentence case on web and Apple's rules on native; no `direction` picked, so distinctiveness gives the verdict only and offers directions. List every assumption in the report Summary and do not write the file.

The profile drives the rest: `platforms` picks the platform rules, `deployment_targets` gates `(26+)`, `release_stage` gates App Review checks, `density` picks the type scale (comfortable = iOS 17 pt body, dense = macOS 13 pt body), `audience` and `areas` resolve source conflicts, `voice` is the standard for every copy rewrite, `direction` is the yardstick for distinctiveness.

**Register.** If the profile is silent on `register`, infer it from the core task: a frequent check-and-act task (forecasts, banking, dashboards, developer tools) is utilitarian; leisure, creative, social or marketing is expressive. State the inference in the Summary assumptions.

## 1b. Landscape

Research the product's category before judging it, so the review knows what best-in-class looks like now, which conventions users expect, and where every peer has converged. Follow `references/augment/landscape.md`.

- Reuse the profile's `landscape` block if its date is under 180 days old and `category` and `peers` are unchanged; otherwise research again.
- Scale it to the unit: a whole app or a flow gets the full study; a single screen gets a short one (2 or 3 products, focused on that screen's job); a component or a design system with no named peers uses the seed playbooks only, noted in Run notes.
- Use WebSearch and WebFetch when available. Study 3 to 6 products: the category leader, one or two challengers praised for UX, the profile's `peers`, and one exemplar from an adjacent domain that solves the same job differently. Cite a URL and date for every claim. Without web tools, work from `references/augment/landscape.md` and memory, mark every claim `(unverified)`, and say so in Run notes.
- Output, kept for the report and the passes: conventions to keep, convergence to avoid, frontier moves with their source, the best peer's step count for the core task, relevant platform capabilities, and openings (what no peer does that this product's subject or audience would justify).
- Landscape claims are evidence for enhancements, reworks and directions. They never create a Blocker, and they never justify copying a peer's look.
- Offer to save the block to the profile's `landscape` key with today's date, together with the profile confirmation.

## 2. Intake

Playwright MCP saves screenshots under its own output folder (`.playwright-mcp/` in the directory Claude Code was launched from); cite them from there, never commit them, and suggest the user add `.playwright-mcp/` to `.gitignore`. The measurement runner returns its results as text; summarise them in the report's Run notes. If the harness saved the output to a file, cite and pass that path. Save other evidence (simulator screenshots, notes) to a folder outside the reviewed repo, such as the session scratchpad. Keep every path: findings cite them and subagents read them.

`<SKILL_DIR>` below means the absolute path of this skill's directory.

**App not reachable.** If the URL does not load or the app is not running, ask the user to start it, quoting the start command if the repo shows one (`package.json` scripts, README). If it still cannot be reached, review source and any screenshots, and mark every measured check Unverified.

**iPhone Duo.** System components adapt automatically. Run the Duo checks in `references/apple/principles-platforms.md` when an iOS app uses custom bars, fixed widths or odd-column grids, or the profile lists `iphone-duo`.

| Input | How to gather |
|---|---|
| Running web app | Use the Playwright MCP tools (named `mcp__plugin_playwright_playwright__*` or `mcp__playwright__*`, whichever exist). `browser_navigate` to each screen in the unit. At widths 390, 820 and 1440 px (`browser_resize`): screenshot in light and in dark (`browser_emulate_media` with `colorScheme`). Measure every width, color scheme and reduced-motion combination in one call (below). For 200% text, set the root font size to 200% in a `browser_evaluate` call and screenshot again. Walk the keyboard with `browser_press_key` Tab from the top, recording focus order and whether focus is visible at each stop. `browser_hover` the primary controls and anything that only reveals on hover. Time real interactions (open, close, submit) where motion matters. |
| Native Apple | Read SwiftUI/UIKit source: navigation containers, presentation calls, custom controls, fonts, tint, asset catalogs, SF Symbol use; check text/background pairs from asset catalogs and `Color(red:…)` values with `scripts/contrast.py` (Design system only row). Run `xcrun simctl list devices booted`. If a device is booted with the app, first read the current values (`xcrun simctl ui booted appearance` and `xcrun simctl ui booted content_size` with no value print them), then: `xcrun simctl io booted screenshot <path>`; `xcrun simctl ui booted appearance dark` and screenshot again; `xcrun simctl ui booted content_size accessibility-extra-extra-extra-large` and screenshot again. Restore the values you read afterwards. If nothing is booted, ask the user to launch the app, or review source only and list what went unseen. |
| React Native / Expo | Source as above (components, StyleSheet values, `accessibilityLabel`/`accessibilityRole`, `allowFontScaling`), plus simulator screenshots the same way. Expo web builds can also go through the web row. |
| Screenshots or mockups | Review what is visible. Estimate sizes only against a known reference in the image and mark them estimated. For contrast, run `python3 -I <SKILL_DIR>/scripts/png_contrast.py <png> <x1> <y1> <x2> <y2>` on a box around the text (coordinates in image pixels; screenshots may be device-pixel scaled). The script names the most common color `bg`; when text fills most of the box the roles swap but the ratio is still correct. Crop tightly around a single run of glyphs with background around it. List every state and behavior that could not be seen. |
| Design system only | Audit tokens and specs: type scale and the faces themselves (`scripts/type-eval.js` on a specimen page that loads the token files' fonts), color roles with light, dark and increased-contrast variants (compute contrast for each text/background pair with `python3 -I <SKILL_DIR>/scripts/contrast.py <fg> <bg> [<fg> <bg> …]`, which reads hex and `rgb()`; for oklch or other CSS colours, render them and use the browser path), spacing scale, elevation, radii, motion tokens, component inventory and each component's states (default, hover, focus, pressed, disabled, error, loading). |

**Measuring.** Read `<SKILL_DIR>/scripts/measure-runner.js` and pass its text, with `<SKILL_DIR>` replaced, as the `code` argument to one `browser_run_code_unsafe` call. It loads `scripts/measure.js`, measures every combination of widths 390, 820, 1440 × `colorScheme` light, dark × `reducedMotion` no-preference, reduce, and returns a compact result:

- `combinations[]`: per combination, `width`, `colorScheme`, `reducedMotion`, `viewport`, `sampled` (true means it hit its 400-item cap; say the results are sampled), `counts` of contrast rows (total, fail, unmeasurable) and targets (total, under24, under44), and in full `type` (families, size counts, `minSize`, `distinctSizes`, `letterSpacingBySize`), `motion` (`transitionAll`, `reducedMotionRule`, `animatedOnLoad`), `defaults[]` (template tells with evidence, for the slop scan) and `logicalProps` (`physical` vs `logical` inline-axis margin, padding and inset declarations, for the RTL check),
- `contrast[]`: only rows with `status` `fail` or `unmeasurable`: selector, text, fg, bg, ratio, size, weight, large, status, `disabled`, and `in` (the combinations it appeared in; identical rows are listed once),
- `targets[]`: only `under24` or `under44` targets: selector, role, width, height, `under24`, `under44`, `spacingOk` (WCAG 2.5.8 spacing exception, set for `under24` targets), `disabled`, `in`.

For every row of every combination, change `opts = {}` to `opts = { full: true }` in the runner text. **Type.** The main thread runs this during intake and keeps the output path for the passes. Read `<SKILL_DIR>/scripts/type-eval.js` and pass its text to `browser_evaluate` as `(<text>)({ sizes: [<working sizes>] })`, once per page load, in the engine the Playwright MCP runs; for Firefox and WebKit, launch them through `browser_run_code_unsafe` if it is available, else list them in Unverified. If the page's CSP blocks evaluation, run it on a specimen page that loads the same font files; it measures every face in use (roles, x-height, coverage, figures, confusable glyphs). Follow the procedure in `references/augment/typography.md`. For native or screenshot input, run it on a specimen page that loads the project's font files.

If `browser_run_code_unsafe` is unavailable, pass the full text of `scripts/measure.js`, unchanged, as the `function` argument to `browser_evaluate` once per combination (one result each, every row), with its `filename` parameter set so the output lands in a file. Skip the dark runs only after confirming the page has no `prefers-color-scheme` rule and renders identically in dark, and say so in Unverified.

Drop rows with `disabled: true` from contrast and target findings (WCAG exempts inactive components).

`status: unmeasurable` (text over an image or gradient, or a color it could not parse) means check by eye. It is never a pass.

**Measured vs by eye.** Contrast computed from known source colors over an opaque background counts as measured. Over a material, gradient or image it is check by eye: at most Major unless pixel sampling (`scripts/png_contrast.py` on a screenshot) confirms a fail. A fact confirmed directly in source code (a missing selected trait, a missing label, a hard-coded value) counts as verified evidence, the same as a measurement.

Judge `targets` against `references/web-mapping.md` (44 px goal, 24 px minimum, 48 px for shared cross-platform code). An `under24` target with `spacingOk` true passes WCAG 2.5.8: report it as Major or Minor against Apple's 44 pt goal, never Blocker. `spacingOk` false is a Blocker. Judge `contrast` against WCAG 2 (4.5:1 body, 3:1 large and non-text) with APCA as an extra check, and `type.minSize` against 16 px body on mobile web and 12 px minimum on desktop.

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

When the skill can drive the app, generate them. Empty: clear the app's data or use a fresh account the user provides. Error and offline: if `browser_run_code_unsafe` exists, use it to run `page.route('**/api/**', r => r.abort())` (adjust the pattern to the app's API, or in Next.js to the app's fetch origin or server actions) or `page.context().setOffline(true)`, then undo it; this tool may need the user's approval. Otherwise ask the user how to trigger these states. Long strings and pseudo-localization: replace text nodes in a throwaway `browser_evaluate` (pad by 40%, add accented characters) and screenshot; reload afterwards. RTL: read `logicalProps` first (physical above logical means the layout likely will not mirror), then set `dir="rtl"` on the root element. Increased contrast: `browser_emulate_media` with `contrast: 'more'`, and `forcedColors: 'active'` for Windows high contrast; on native, the system setting. On native, read source for empty, error and loading branches.

Anything not seen goes in the report's Unverified section with what would verify it.

## 4. Passes

Run the passes in this order. Each loads only its files, plus the "Stance" section of `references/augment/red-team.md`. Reference files are long: read the headings first (`grep -n '^## '`), then load only the sections that apply to the unit, never whole files.

| Pass | Load |
|---|---|
| 1. Slop scan | `references/slop-catalog.md`, `references/apple/beyond-hig.md` (App Review 4.2.6) |
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

**Design system only.** The distinctiveness brand tests (logo-off, competitor swap) need rendered screens; with tokens only, put them in Unverified. The landscape step is optional (seed playbooks unless the profile names peers), and the red team attacks the system layer only (ladder layer 5, plus root-cause clustering). Run the slop scan, visual, accessibility and distinctiveness passes, plus content for component specs and their copy. Skip structure, interaction and platform fit, except the component choice rules in `references/apple/components-structure.md` and `references/apple/components-presentation.md`, applied to the component inventory.

**1. Slop scan.** Fast, before the deep work. Walk `references/slop-catalog.md` section by section (AI-template, Apple-clone, Material-clone, shadcn/Tailwind-default, praised-product clone, research-blessed patterns gone generic, AI-microcopy) against the screenshots, source and measure.js `defaults`. Count tells per section and per channel, with the element each sits on. The distinctiveness procedure (`references/augment/distinctiveness.md` step 10) sets the verdict; the slop-catalog cluster threshold (tells across 3 or more of the nine channels, or 5 or more tells in total) is an input that forces `default-assembled` when met. App Review 4.2.6 (template-generated apps) is Apple's own rule against cookie-cutter apps; cite it for native apps that read as templates.

**2. Structure.** Navigation architecture (tab bar, sidebar, split view, or the web equivalent for the project's breakpoints), information hierarchy, component choice (alert vs sheet vs popover vs inline), modality, action hierarchy (one prominent action per view), destructive-action placement. Check the Trust gate here too: obstruction (cancel harder than sign-up), forced action, preselection, hidden costs in flows. Gate items are in the "Trust gate" section of `references/augment/ux-research.md`.

**3. Visual.** Layout and adaptivity at each captured width, type system (few sizes, weight before size, scale chosen by `density`, minimum sizes) and each typeface's fit for its role (one verdict block per face, `references/augment/typography.md`), color roles and contrast in both appearances, materials and depth (chrome distinct from content), iconography, imagery. Use measure.js numbers wherever they exist. On native targets, standard materials (`.ultraThinMaterial` and the rest) are allowed in content per Apple; the (26+) "no Liquid Glass in the content layer" MUST covers Liquid Glass (`glassEffect`, glass button styles), not standard materials. On web, see "Materials and glass" in `references/web-mapping.md` (translucency in content is flagged). A dark-mode issue takes the same Impact as its light-mode equivalent. A literal color (hex, RGB, `Color(red:…)`) used for text or UI with no dark-mode and increased-contrast variant is Major, whatever its current contrast ratio (Color: best practices in `references/apple/visual.md`).

**4. Interaction and motion.** Feedback for every action, gestures, pointer and hover, keyboard access and shortcuts (the macOS shortcut table in `references/apple/inputs-tech.md`), focus order and visibility from the Tab walk, motion purpose and interruptibility, reduced-motion handling, undo. Judge motion against the profile's `register` and `motion_personality`: a serious, relaxed tool is flagged for bouncy springs, a playful one is not. Flag `transition: all`, animation on keyboard-triggered actions, and missing reduced-motion rules from measure.js.

**5. Content.** Every visible string by message type (labels, buttons, titles, errors, empty states, confirmations, success, onboarding, permissions, notifications, AI features, settings, tooltips, loading) against `references/writing.md`, judged by the profile's `voice`. Every copy finding includes a rewrite in that voice. Anti-fabrication never yields: no invented causes, counts, durations, or social proof. Humor never appears in errors, destructive confirmations, money, or permission requests, whatever the profile says. Flag mixed spelling against `voice.spelling` and inconsistent casing against `voice.casing`. Check the Trust gate here: confirmshaming, fake urgency or scarcity, fake social proof, trick questions, unlabelled ads. For long-form in-app prose (help articles, onboarding paragraphs, emails), invoke the humanizing-writing skill if it is installed; otherwise apply the long-form rules in `references/writing.md`.

**6. Accessibility.** The measured checks first (contrast, targets, text scaling to 200%, focus visibility, reduced motion), then judgment: labels that match visible text (Voice Control), VoiceOver or screen-reader order and names, meaning carried by color alone, flashing content, cognitive load, RTL and localization. The Accessibility Nutrition Label criteria in `references/apple/beyond-hig.md` are the checklist for common tasks (onboarding, login, purchase, settings). A measured or source-confirmed check that fails a WCAG A/AA criterion, or an Apple MUST that meets the Blocker bar in Rules, is a Blocker; judged issues cap at Major (Rules). Text sized in px that ignores the root font size while browser zoom still works passes WCAG 1.4.4: Major (respect the user's font size and Dynamic Type), not Blocker.

**7. Platform fit.** Per-platform rules for the platforms in the profile only; a web-only profile never gets native rules. On web, never flag a missing Apple idiom (bottom tab bar, Title Case menus, trailing Done); flag the broken principle behind one, using the "Apple idioms on web" section of `references/web-mapping.md`. Flag SF Pro or SF Symbols on web (licensed for Apple platforms only). Technology rules where used: AI features, payments and paywalls, sign-in, notifications, widgets. A speculative finding for a platform or pose the profile does not target (iPhone Duo with no `iphone-duo` in `platforms`) is at most Minor, or goes to Unverified.

**8. Distinctiveness.** Runs after passes 2 to 7, following the procedure in `references/augment/distinctiveness.md`. Gate first: for any flow with an open Blocker or Major from the Apple passes, hold pleasure-tier and expression findings for that flow and list them after the fixes. Then classify the nine expressive channels (platform default, library default, trend default, authored; at least two authored), check where expression sits by surface, count signature elements and moments against the budget for the profile's `register`, trace identity to the product's subject, and run the logo-off and competitor-swap tests. The distinctiveness procedure (`references/augment/distinctiveness.md` step 10) sets the verdict; the slop-catalog cluster threshold (tells across 3 or more of the nine channels, or 5 or more tells in total) is an input that forces `default-assembled` when met. Judge against the profile's `direction`. If it is empty, propose 2 or 3 directions derived from the product's subject, audience and landscape, differing from each other on at least two channels, each with a theming sketch and a landscape position ("Theming and identity proposals" in `references/augment/distinctiveness.md`), and ask the user to pick one; save the pick to the profile once they confirm. If a direction is set, check the current theme against it and propose a theming sketch only where the product drifts from it.

**9. Red team.** Runs last, after the findings are drafted. Follow `references/augment/red-team.md`: walk the attack ladder from premise down, counting steps on the core task and first run against the best peer's from the landscape; cluster all findings by root cause; test each candidate rework against the rework bar; write the enhancements (each traced to this product and to the landscape, covering only the areas where the evidence points: flows, information architecture, visual design and theming, brand and identity, motion and feedback, content and voice, platform capabilities); then run the softness audit on the whole draft and revise it. New defects found here go into the Findings table under the normal Impact rules. The pass may conclude "No rework warranted", with the reason.

**Trust.** Deceptive-design hits from passes 2 and 5 are Blockers and go in the report's own Trust section, each with the element, the screen, and the honest rewrite. In a whole-app split, subagent D owns them (step 5).

## 5. Whole-app split

For a screen, a flow, a design system, or a whole app with 5 or fewer screens (or 10 or fewer view files), run the passes inline. The landscape research (step 1b) may still go to one subagent running alongside intake, given the profile and `references/augment/landscape.md`. For a larger whole app, dispatch the landscape subagent as soon as the profile is settled, and after steps 1 to 3, dispatch four subagents in parallel:

| Subagent | Passes | Reference files |
|---|---|---|
| A | Structure, platform fit | the files for passes 2 and 7 |
| B | Visual, interaction and motion | the files for passes 3 and 4 |
| C | Content | the files for pass 5 |
| D | Accessibility, Trust gate | the files for pass 6, plus the Trust gate section of `references/augment/ux-research.md` |

Give each subagent:

- the confirmed profile contents (or the draft and its assumptions),
- the list of screens and routes in scope, and the evidence paths: screenshots, and the measurement results (the path the harness saved the runner output to, or else a scratch file the main thread writes the returned JSON to),
- its reference file paths, the conditional loads from step 4 that apply (web-mapping, ux-research, product-gov-systems), and the instruction to read headings first and load only the sections that apply,
- the Rules section of this file, including the Apple-column mapping, and the "Stance" section of `references/augment/red-team.md`,
- the type-eval output path, to subagent B (which writes the Type section) and D (legibility),
- the finding format (Finding, Where, Impact, Apple, Fix, evidence path) and the report cap for the unit, so it ranks and returns its strongest findings rather than every nit.

Tell it to return findings only, specific to named elements, with no report prose, and to list what it could not verify. D owns Trust: A and C put any suspected deceptive-design item in a separate "for D" list with element, screen and evidence, and do not report it themselves; the main thread hands those to D, or checks them against the gate if D has already returned.

The main thread runs the slop scan, then waits for all four and the landscape result, then runs distinctiveness with their results (it needs the open Blockers and Majors for the gate). Then merge: de-duplicate findings that share an element and cause (keep the higher impact, combine the Where), split rows whose causes differ in Impact, resolve tag disagreements by the Rules section, apply waivers, cap per the report template, and number the findings so reworks can cite them. Then dispatch one fresh red-team subagent that has not seen the passes' reasoning: give it the profile, the landscape result, the evidence paths, the merged draft, and `references/augment/red-team.md`, and tell it to attack the product and the draft, returning new findings, rework candidates with their bar condition, enhancements, and the softness-audit list. The main thread verifies each item against the evidence before it enters the report; unverifiable attacks are dropped. Then merge, de-duplicate, cap and renumber again, keeping the reworks' finding numbers in step.

## 6. Report

Follow `references/report-template.md`: Summary (with Run notes), Findings, Trust, Landscape, Distinctiveness verdict, Type, Reworks, Enhancements, Unverified, Offer.

- Sort by Impact, then Apple column in this order: MUST, SHOULD, CONSIDER, Web, Research, Taste (as in the report template).
- Caps: screen 15, flow 25, whole app 40, design system 30. Merge duplicates first. Group Polish beyond the cap into one row. Never drop a higher-impact finding to fit.
- Number findings; step 7 refers to them by number.
- Put `waived: N` under the findings table.

**Reworks.** Up to three, from the red-team pass, each with the fields "The rework bar" in `references/augment/red-team.md` requires: what changes, the bar condition, the evidence (finding numbers, step counts, peer source), cost, what it unlocks, and the smallest experiment. If none clears the bar, write "No rework warranted" and the reason.

**Enhancements.** Up to 8 improvements with no defect behind them (fewer when the evidence is thin; say so), grouped by area. Each is tied to one HIG principle (Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight) and to something specific in this product: a named screen, its core action, its content, or a landscape gap. Describe the mechanism (motion that continues gesture velocity, one prominent action per view, hierarchy by weight instead of size, an empty state that teaches the core action, a platform capability that serves the core job); a theming or identity enhancement may carry a theming sketch. Before an enhancement goes in, check it against `references/slop-catalog.md` and ask "would this fit any product?" If it matches a catalog tell or would fit anywhere, rewrite it or cut it.

**Unverified.** One line per state, platform, flow or measured check not seen, with what would verify it. For screenshot-only input, name transient feedback and timing states by kind (toasts, loading and skeleton states, hover, focus, animation, error states), never one generic line. A state observed on screen even once (a skeleton or loader flash) gets a finding, not an Unverified line.

## 7. Offer fixes

List the findings fixable in code by number, grouped (for example "copy rewrites: 3, 7, 12", "contrast tokens: 2, 5", "target sizes: 4"), and say which need a design decision first. Enhancements and reworks need the user's decision: offer to build an enhancement, or a throwaway prototype of a rework's smallest experiment, on request. Ask which to do. Never ask for code: list, as optional, what more input (source, a running URL, a booted simulator) would let the skill verify.

Edit only the findings the user picks. Keep each edit to what the finding names; do not refactor around it, and leave unrelated uncommitted work untouched. After editing, re-run the checks that found the problem: the measurement at the affected widths and modes for measured findings, a fresh screenshot for visual ones, a reread of the strings for copy. Report what changed, what now passes, and anything that still fails. Do not commit unless asked.
