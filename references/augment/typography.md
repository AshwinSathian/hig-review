Covers: typeface and typography evaluation: whether each face fits its role, measured legibility (confusable glyphs, x-height, figures, coverage, weights), Apple's custom-font duties, web font delivery, typeface distinctiveness, and how to test candidate faces before proposing them.
Loaded by: visual, accessibility (legibility and scaling), distinctiveness and theming sketches, design system only
Snapshot: 2026-10-26. Sources for every line: research/digests/17-typography-evaluation.md (section in brackets). Type composition rules (measure, leading, scale, hierarchy) stay in references/augment/craft.md and references/apple/visual.md; this file is about the faces.
Digest numbers are provenance only; do not load them during a review.
Tags: [MUST]/[SHOULD]/[CONSIDER] = the source's own strength; [Taste] = our rule. In reports, a check labelled 'adds to Apple' shows the Apple file's tag; 'Apple silent' shows 'Research'; [Taste] shows 'Taste'. `(unverified)` never backs a Blocker.

Legibility and role fit come before identity. A distinctive face that fails the confusables test at the product's working size is a finding, not a brand asset. On Apple platforms SF and New York need no justification; a custom face has to earn its place. On the web every face is a choice.

## Procedure
**Intent**: one verdict block per face the product ships, from measurements, not impressions. [E1-E5]

1. **Inventory.** List every family, weight and style actually loaded and map each to a role: UI text, reading, data and numbers, code and wire, display. Web: `scripts/type-eval.js` returns the families in use with their roles, sizes and weights, plus the font files and their bytes. Native: `Font.custom(`, `UIFont(name:`, `UIAppFonts` in Info.plist.
2. **Measure.** Web: read `${CLAUDE_SKILL_DIR}/scripts/type-eval.js` and pass its text to `browser_evaluate` as `(<text>)({ sizes: [<working sizes>] })` (async; it awaits font loading). It returns per family: whether it loaded, its faces and whether it is variable, x-height ratio, script coverage, tabular figures (by default and with `tabular-nums`), and confusable-pair distances at each size. Run it in Chromium, Firefox and WebKit where Playwright offers them; rendering differs. Native, screenshots or a design system without a running page: build a one-file specimen page that loads the same font files (the project's `@font-face` CSS or font packages) and run the script there, or render the specimen strings below and judge by eye at 1× and magnified.
3. **Look.** Render the specimen strings at the working sizes at 1× (not only on a Retina screen), magnify the screenshot, and check every pair the script flagged. The script finds candidates; the eye confirms.
4. **Judge** each face against the checks below and write its verdict block.
5. **Candidates.** When a face fails or a theming sketch proposes one, shortlist 2 to 3 per role, run the same measurement on each, and give the reason tied to the product's job. Load candidates on a specimen page (`page.goto` a local HTML file whose `@font-face` rules point at the font files, or a Google Fonts stylesheet when the network is allowed) and run the script there. Candidate blocks use the short form (Legibility, Figures, Coverage, Verdict); at most six candidate blocks per report. Never swap names alone (references/augment/distinctiveness.md, "Don't fix slop by substitution").

**Specimen strings** [E2]: confusables `Il1| O0o rn m cl d vv w 5S 8B 2Z 6b 9gq` and `Illegal1 O0O0 l1Il|`; codes `INV-0O81-IlL1`, `sk_live_0Ol1I`, `041 170`; numbers `$1,111.10  −$48.07  +12.5%  00:01:11  11:11 AM` and a 4-row table of changing values; the product's three longest real labels, a button, an error, an empty state and a timestamp in each shipped locale; `Zażółć gęślą jaźń`, `Tiếng Việt có dấu`, `İstanbul ılık`; caps `ACCOUNT SETTINGS (BETA) — 2FA`; quotes `'"‘’“”` and dashes `- – — −`; a code line `if (a != b && c <= 0x0O1l) { return "I|l1"; }` with ligatures on and off.

**Reading `type-eval.js`**: per size, each pair has `d` (pixel distance 0 to 1) and `px` (device pixels that differ). `px` 0 means the pair renders identically: FAIL for that size. `d` under about 0.25 with `px` above 0 means a small mark (a zero's dot or slash, a serif) separates them: judge by eye at that size and density. Coverage says `unicode-range` when it read the loaded faces' declared subsets (reliable), or `local (Latin only)` for local fonts and single all-range files, where a browser cannot tell which characters the font draws: Latin proves the font exists and the other scripts are null, to check by eye. `loaded: false` means every measurement describes the fallback named in `renderedWith`. Figures: `tabularAvailable` false means `tabular-nums` does nothing in this build.

## Legibility
**Intent**: what makes a face work at UI sizes, with proxies a reviewer can measure. [A1-A4]

- [MUST] Apple minimum and default sizes apply to custom and system fonts alike: iOS and iPadOS 11 pt minimum, 17 pt default; macOS 10 pt and 13 pt. — adds to Apple
- [MUST] No Ultralight, Thin or Light weights for small text; a custom face with a thin weight needs larger than the recommended sizes. — adds to Apple
- [Taste] Confusables: in any role that shows codes, IDs, hosts, tokens, keys, passwords, one-time codes or user-typed names, `I/l/1` and `0/O` must differ at the working size on a 1× display. A pair with `px` 0 there is a finding (Minor, Major when the role is codes or credentials a person must copy or compare). Fix by the face's own alternates (`cv`, `ss`, `zero`) if the shipped build keeps them (measure again: subsetted builds often drop features), or by another face in that role. — Apple silent
- [SHOULD] x-height ratio (x-height ÷ cap height from the script, or OS/2 `sxHeight` ÷ units per em): two faces at the same nominal size can differ by 10 to 15% in apparent size. Compare candidates at the same size; a low x-height face reads small at 11 to 14 px (the bands are heuristics, unverified). — Apple silent
- [SHOULD] Weight ladder: at least Regular, Semibold and Bold for HIG's emphasised styles, and on Apple a heavier step for every weight used so Bold Text works. A custom face that cannot follow Bold Text breaks an Apple rule ("If you use a custom font, make sure it implements the same behaviors"). — adds to Apple
- [SHOULD] Figures: tabular lining figures wherever values change in place or align (tables, prices, timers, durations, status codes); a distinct zero in codes and IDs; a true minus (U+2212). SF digits are proportional by default: `.monospacedDigit()` in SwiftUI, `font-variant-numeric: tabular-nums` on the web. — adds to Apple
- [SHOULD] Coverage matches the product's locales and the data people type: no tofu, no visible jump to a fallback face of another weight or x-height mid-line (Vietnamese stacked marks, Turkish dotless ı, Polish ogonek, mixed CJK or Arabic with Latin). — Apple silent
- [SHOULD] Spacing survives WCAG 1.4.12 overrides (line height 1.5, letter 0.12 em, word 0.16 em) with no clipping. — adds to Apple
- [CONSIDER] Low stroke contrast and open apertures survive small sizes and low-density screens; a high-contrast display serif in body or controls is a finding. Test on a 1× display: macOS has drawn greyscale antialiasing since 10.14, and Windows ClearType is the hardest case. — Apple silent
- [Taste] Never recommend a "dyslexia font" as an accessibility fix (no measured benefit); recommend respecting user spacing, size and font overrides instead. — Apple silent

## Roles and pairing
**Intent**: few faces, each with a job. [B1-B4]

- [SHOULD] Minimise typefaces (HIG). Default to one family plus one mono; add a second family only for a named role (a reading serif for long-form, a display face for brand moments). — adds to Apple
- [SHOULD] A pairing contrasts on one axis (serif and sans, or a large width or weight gap) and agrees on the others (similar x-height and proportions). Two similar grotesques side by side add noise. — adds to Apple
- [SHOULD] Display and brand faces stay in display roles; body, controls and dense data use the system face or a legible text face (references/augment/distinctiveness.md, step 4). — adds to Apple
- [SHOULD] Code and wire faces: distinct zero, distinct `1 l I |`, distinct quotes and backtick, wide punctuation at 12 to 13 px, standard widths. Ligatures off by default in anything a person copies or edits. — Apple silent
- [MUST] Native Apple: don't embed system fonts; custom faces scale with Dynamic Type through `Font.custom(_:size:relativeTo:)` on the right text-style curve (captions on the caption curve) or `UIFontMetrics`; macOS uses the dynamic system font variants instead of Dynamic Type. — adds to Apple
- [MUST] Web: never serve SF Pro or New York as web fonts (Apple's licence allows mock-ups only); `system-ui` and `-apple-system` render SF from the OS on Apple devices. — adds to Apple
- [SHOULD] 26 and later: alert and onboarding text is bolder and left-aligned (WWDC25 session 356); centred light-weight alert or onboarding text reads dated. No typography change for 27 is confirmed; do not cite one. (26+) — adds to Apple

## Web delivery
**Intent**: the face arrives fast, without layout shift, respecting the user. [C1-C6]

- [SHOULD] Text sizes in `rem` or `em`, never `html { font-size: <px> }`, so the user's text size applies. Rate it as SKILL.md's accessibility pass says: px text that still zooms passes WCAG 1.4.4 and is Major, not Blocker. — adds to Apple
- [SHOULD] WOFF2, subset with `unicode-range`, at most two critical preloads, self-hosted where privacy law is a concern (one German court ruling, LG München I, 2022, on Google-hosted fonts; check with counsel). — Apple silent
- [SHOULD] `font-display` is `swap` or `optional`, never `block` for text faces; a metric-matched fallback (`size-adjust`, and `ascent-override` and friends where supported: not in Safari) or `font-size-adjust` (Baseline 2024) keeps the swap from shifting layout. — Apple silent
- [SHOULD] `font-variant-numeric` and `font-optical-sizing: auto` over low-level `font-feature-settings` and `font-variation-settings`, which reset each other and override optical sizing. — Apple silent
- [CONSIDER] `text-wrap: balance` for headings (Baseline); `pretty` and `text-box` are progressive enhancement only (no Firefox). — Apple silent
- [CONSIDER] `ui-monospace` and the other `ui-*` generics resolve only in Safari; give stacks explicit fallbacks. On Windows, `system-ui` can map to a locale font with poor Latin. — Apple silent

## Distinctiveness
**Intent**: popularity is a fact about identity, not quality. [D1-D3]

- [Taste] Flag a default-tier face (Inter, Roboto, Poppins, Montserrat, Open Sans, and the second-layer defaults in references/slop-catalog.md: Geist, Satoshi, General Sans, Instrument Serif, Fraunces, Space Grotesk, Bricolage Grotesque) only when it is the sole identity carrier, used with its default settings (no optical size, alternates, tracking or weight decisions), or swapped in by name for another default. — Apple silent
- [Taste] Identity can come from treatment inside one family (optical sizes, widths, alternates, an off-grid weight, a display cut limited to display roles: Linear's Inter Display; Gentler Streak's SF widths and SF Rounded) as well as from a new face. — Apple silent
- [Taste] Every credible custom face started from a named product constraint (one rendering across operating systems, dense UI, brand and UI in one face, licence control: Atlassian, Airbnb Cereal, GitHub Mona Sans, Figma Sans). A proposal for a custom or different face names its constraint and its measurements. — Apple silent
- [Taste] Candidate faces are free or open-licensed unless the profile lists licensed ones. Check the licence file: Satoshi and most Fontshare faces are not OFL (no redistribution). — Apple silent

## Verdict block
One per face, in the report's Type section:

```
Face: <family> <weights/axes>. Roles: <UI | reading | data | code | display>
Legibility: PASS | CONCERN | FAIL. x-height ratio <0.xx>; confusables failing <pairs @ size, engine>; weights <list>; Bold Text <yes | no | n/a> (native: turn Bold Text on in the simulator and screenshot; web: n/a)
Figures and features: tabular <by default | available | none>; distinct zero <yes | no>; alternates used <list>
Coverage: <scripts, method> ; locale issues <none | list>
Scaling: Dynamic Type or rem <ok | issue>; 1.4.12 <ok | clips at …>
Delivery (web): <format, subset, display, fallback, hosting>; font bytes <n KB>
Distinctiveness: default tier <yes | no>; identity carried by <treatment | nothing>
Verdict: Keep | Tune (<settings, measured>) | Restrict to <role> | Replace (constraint: <named>; candidates: <2-3, each measured>)
Evidence: <type-eval output path, specimen screenshots>
```
