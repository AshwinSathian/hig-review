# 17 — Typography and font-face evaluation: fit, roles, web delivery, distinctiveness, a test procedure

Scope: how hig-review judges whether a product's typefaces fit their roles (UI text, reading, data, code, display) and how it evaluates candidate faces when it proposes a theme. Covers measurable legibility proxies, Apple's system type and custom-font rules, 2025–2026 web font delivery and Baseline status, which faces now read as defaults, how respected products chose custom faces (the mechanism, not the look), and a step-by-step specimen test with a verdict format. Compiled 2026-10-26.

**Framing rule:** On Apple platforms the system fonts (SF, New York) are the HIG-correct default and need no justification. A custom face has to earn its place: it must match system legibility at the platform minimum sizes and support Dynamic Type and Bold Text. On the web there is no neutral default. Every face is a choice, and "everyone uses it" is a fact about distinctiveness, not about quality. Legibility and role fit come before identity. A distinctive face that fails the confusables test at 12 px is a finding, not a brand asset.

**Provenance:** [F] = I read the page during this session (fetched, or its live JSON/API). [S] = seen only in a search-result snippet or a secondary write-up. "(unverified)" = could not be confirmed from either, or comes from general type knowledge without a source fetched today; treat it as a lead. "(inference)" = my reasoning from the cited facts, not a source claim. Dates are the page's date; where a page is undated, the access date 2026-10-26 is given. Primary pages [F] include: the Apple HIG Typography page (via its JSON), Apple Fonts page and licence, WWDC25 session 356 transcript, the MacRumors iOS 27 change list, webstatus.dev API, Web Almanac 2024 and 2025 Fonts chapters, MDN font-size-adjust, web.dev font best practices, Chrome framework-fallback post, WCAG 2.2 Understanding 1.4.12, Butterick's *Practical Typography*, Braille Institute Atkinson page, Atlassian typography post, Linear redesign post.

Tags: [MUST] = HIG/WCAG rule or hard failure; [SHOULD] = strong practice; [CHECK] = a measurable test step; [AVOID] = convergence or a known pitfall.

---

## 0. How the skill should use this file

- **Review mode:** run Section E on each face the product ships. Report role fit (B), legibility proxies (A), delivery hygiene (C, web only) and distinctiveness (D) as separate lines. Don't let a distinctiveness concern hide a legibility failure, or the other way round.
- **Theme-proposal mode:** shortlist 2–3 candidate faces per role, run the same specimen test on each, and give a reason tied to the product's job (dense data, long reading, a brand voice). Never swap names alone (Inter → Geist); see digest 13 §"second-layer defaults".
- **Apple-native apps:** the default verdict is "keep SF/NY, express identity through weight, size, width and a display face limited to display roles". Propose a custom text face only with evidence that the system face fails a product need.

---

## A. What makes a UI text face fit (with measurable proxies)

### A1. Size, weight and platform minimums (Apple)
- HIG default/minimum text sizes: iOS/iPadOS 17 pt / 11 pt; macOS 13 pt / 10 pt; tvOS 29/23; visionOS 17/12; watchOS 16/12. These apply "for both custom and system fonts" — https://developer.apple.com/design/human-interface-guidelines/typography (change log latest 2025-12-16) [F]. [MUST]
- "If you use a custom font with a thin weight, aim for larger than the recommended sizes" and "avoid Ultralight, Thin, and Light font weights" for small text; prefer Regular, Medium, Semibold, Bold — same page [F]. [MUST for small text]
- "If you need to display three or more lines of text, avoid tight leading even in areas where height is limited" — same page [F].
- iOS Large (default) Dynamic Type: Body 17/22 pt, Headline 17/22 Semibold, Subhead 15/20, Footnote 13/18, Caption 1 12/16, Caption 2 11/13; AX5 Body reaches 53/62 — same page, specification tables [F]. A custom face must survive the range from xSmall (Body 14) to AX5 (Body 53).
- The HIG tracking tables show SF tracking is positive at small sizes (for example +24/1000 em at 11 pt, +16 at 13 pt on iOS) and negative at display sizes (−20 at 36–48 pt) — same page [F]. Lesson for custom faces: one global `letter-spacing` value is wrong; small text usually wants neutral or slightly open tracking, large text tighter (inference).
- Web body size: Butterick recommends 15–25 px for websites; print body 10–12 pt — https://practicaltypography.com/point-size.html (accessed 2026-10-26) [F]. Line length 45–90 characters including spaces — https://practicaltypography.com/line-length.html [F].
- Vision science: fluent reading holds over x-heights of roughly 0.2°–2° of visual angle (about 1.4–14 mm x-height at 40 cm); below the critical print size, speed falls — Legge & Bigelow, *J. Vision* 2011, https://pmc.ncbi.nlm.nih.gov/articles/PMC3428264 [S]. This is why x-height matters more than nominal font size.

### A2. Measurable proxies a reviewer can compute
- **x-height ratio** = OS/2 `sxHeight` ÷ `unitsPerEm` (or rendered x-height ÷ font-size). Two faces at "14 px" can differ by 10–15% in apparent size. Working bands: about 0.50–0.56 suits dense UI text; below about 0.48 reads small at 11–14 px; above about 0.58 risks crowding ascenders and hurting word shape (inference; ranges are type-design common knowledge, unverified). One-liner: `python3 -c "from fontTools.ttLib import TTFont as T;f=T('face.woff2');print(f['OS/2'].sxHeight/f['head'].unitsPerEm)"` (needs `fonttools` + `brotli`).
- **Cap-height ratio** (`sCapHeight`/UPM): it sets how loud labels and all-caps read, and it is the metric `text-box-edge: cap` trims to (C4).
- **Width / average advance:** compare the advance width of a lowercase alphabet string at the same size. Narrow faces save space but lose small-size legibility. Beier & Larson found narrow letters benefited from being widened — https://www.microsoft.com/en-us/research/uploads/prod/2021/06/Beier-Larson-2010-Design-Improvements-for-Frequently-Misrecognized-Letters.pdf (2010) [S].
- **Apertures:** how open c, e, a, s and 3 are. Open apertures resist blur at small sizes and on low-DPI screens. Proxy: in a 12 px render, check whether c/e/o and a/o stay distinct when you squint or blur by 1 px (inference). Airbnb named "taller x-height and slightly open apertures" as Cereal's UI features — https://www.dezeen.com/2018/05/16/airbnb-new-scaleable-typeface-dalton-maag-design/ (2018-05-16) [S].
- **Stroke contrast:** low contrast (monoline) survives small sizes and low DPI. High-contrast serifs (Didone, many "editorial" display serifs) lose hairlines below about 18–20 px (inference). Flag a high-contrast face used for body or controls.
- **Spacing:** test with WCAG 1.4.12 overrides (line-height 1.5, paragraph 2×, letter 0.12 em, word 0.16 em). Content must not clip or overlap — https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html [F]. A face with tight default spacing plus fixed-height containers is the usual failure.
- **Hinting and rendering:** macOS dropped subpixel antialiasing in 10.14 Mojave, so text is greyscale-AA and thinner on non-Retina displays — https://mjtsai.com/blog/2018/06/07/removed-in-macos-10-14-mojave/ (2018-06-07) [S]. Windows (DirectWrite/ClearType) still snaps to the pixel grid and shows poorly hinted web fonts as uneven stems at 11–14 px; Linux results depend on FreeType settings (unverified, general knowledge). [CHECK] on Windows at 100% scaling, not only on a Retina Mac.
- `-webkit-font-smoothing: antialiased` affects macOS only and mainly thins text; don't use it to "fix" a heavy-looking face in light mode (unverified).

### A3. Confusable glyphs (the core legibility test)
- Test pairs: `I l 1 |`, `0 O o`, `rn m`, `cl d`, `vv w`, `5 S`, `8 B`, `2 Z`, `6 b`, `9 g q`, `u n` (rotation confusion for low vision), `' ‘ ’ "`, `- – — −`, `. ,` at small sizes.
- DIN 1450 (lettering legibility) explicitly targets character differentiation, and its 2013 revision moved the reference measure from cap height to x-height and added books/press and visually impaired readers. DIN lists DIN 1450:2013-04 as withdrawn — https://www.dinmedia.de/en/standard/din-1450/170093157 [S]. Its numeric criteria are behind a paywall and I could not confirm them (unverified). Faces cited as designed to it: Vialog 1450 (added a marked zero), Go fonts (distinguish 0/O, 1/I/l, 5/S, 8/B) — https://ctan.math.illinois.edu/fonts/gofonts/doc/gofonts.pdf [S].
- Atkinson Hyperlegible principles (Braille Institute): unambiguous letterforms, "clear uprights" made distinct, distinct mirror pairs (b/d, p/q), open counters, angled spurs and longer tails — https://www.brailleinstitute.org/freefont/ (accessed 2026-10-26) [F]. These make a good checklist even for faces that aren't "hyperlegible".
- [SHOULD] Any UI that shows codes, IDs, coupons, passwords, serial numbers or 2FA codes needs I/l/1 and 0/O separation in that role. If the brand face lacks it, use a mono or alternate face (or turn on a `zero`/`cv` feature) for those fields.
- Low-vision reading and individual difference: reading speed varied about 35% between a reader's fastest and slowest fonts, with no font best for everyone — Wallace et al., ACM TOCHI 2022, https://research.adobe.com/publication/towards-individuated-reading-experiences-different-fonts-increase-reading-speed-for-different-individuals (2022-03-31) [S]. Implication: respect user font overrides and Dynamic Type rather than betting on one "most legible" face.
- Dyslexia fonts: OpenDyslexic showed no gain in rate or accuracy — Wery & Diliberto, *Annals of Dyslexia* 2017, https://pmc.ncbi.nlm.nih.gov/articles/PMC5629233/ [S]. Extra letter spacing helped accuracy (not speed) in some replications of Zorzi et al. 2012 (Hakvoort 2017; Duranovic 2018) [S]. [AVOID] recommending a "dyslexia font" as an accessibility fix; recommend respecting spacing overrides (1.4.12) and good default spacing instead.

### A4. Feature set a UI text face needs
- **Weights:** at least Regular, Medium/Semibold and Bold to cover HIG emphasised weights (Body → Semibold, Titles → Bold) — HIG specification tables [F]. A variable `wght` axis is ideal. A face whose only weights are Light/Regular/Bold forces faux or jumpy hierarchy (inference).
- **Bold Text support:** Apple: "System fonts automatically support Dynamic Type … and respond when people turn on accessibility features, such as Bold Text. If you use a custom font, make sure it implements the same behaviors" — HIG [F]. So the custom face needs a heavier weight one step up for every weight used. [MUST]
- **Italics:** needed for reading content and citations, not for UI chrome. Inter 4 split italic into its own variable font because browsers were unreliable with a `slnt` axis — https://github.com/rsms/inter/releases (v4.0, tagged 20 Nov; 2023 per general knowledge, unverified) [S]. [CHECK] that `font-style: italic` gets a true italic, not a synthesised oblique (`font-synthesis: none` reveals it; Baseline widely available 2024-07-06 — webstatus.dev `font-synthesis` [F]).
- **Figures:** tabular lining (`tnum`) for tables, prices, timers and anything that updates in place. Proportional figures for prose. Oldstyle only in editorial reading. Slashed or dotted zero (`zero`) for codes and IDs. SF numbers "have proportional widths by default" — https://developer.apple.com/fonts/ [F], so use `.monospacedDigit()` (SwiftUI) or `font-variant-numeric: tabular-nums` for changing values. `tabular-nums` appears on only about 3.2% of pages — Web Almanac 2025 [F] — so missing tabular figures is a common, cheap finding.
- **Case-sensitive forms** (`case`): brackets, hyphens and @ re-centred for all-caps labels. Also small caps (`smcp`/`c2sc`) if the design uses caps labels heavily (unverified which popular faces ship `case`; check the GSUB table).
- **Stylistic sets / character variants** (`ssXX`, `cvXX`): Inter, for example, offers alternates such as a tailed `l` and a flat-top `1`. Atlassian says its Inter derivative was adjusted "to include more or fewer type features" to improve letter disambiguation — https://atlassian.design/whats-new/implementing-typography-at-scale (2025-04-10) [F].
- **Script and language coverage:** SF Pro covers 150+ languages across Latin, Greek and Cyrillic, with SF Arabic, Armenian, Georgian and Hebrew extensions — https://developer.apple.com/fonts/ [F]. Noto Sans JP is the #3 family on desktop in Web Almanac 2024 (6.1%) — https://almanac.httparchive.org/en/2024/fonts [F], so CJK fallback is a mainstream concern. [CHECK] Vietnamese (stacked diacritics), Polish/Czech (ogonek, háček), Turkish dotless ı/İ, and that fallback CJK/Arabic faces match weight and x-height.

---

## B. Roles and pairing

### B1. Roles
- **UI text** (controls, labels, lists, 11–17 px/pt): high x-height, open apertures, low contrast, clear confusables, tabular figures available. System face or a dedicated UI face.
- **Reading** (articles, docs, long-form, 16–20 px): comfortable spacing and rhythm, true italics, oldstyle figures optional; serif or humanist sans. New York is Apple's reading/companion serif: "a traditional reading face at small sizes and a graphic display face at larger sizes" — https://developer.apple.com/fonts/ [F].
- **Data/numbers** (tables, dashboards, prices, timers): tabular lining figures, clear 0/O and 1/l, a minus sign (U+2212) that matches the plus in width, often a condensed width for dense columns (SF Pro has Condensed/Compressed/Expanded widths — HIG [F]).
- **Code/wire** (code, logs, IDs, API keys): monospaced; see B3.
- **Display** (heroes, marketing, onboarding titles, ≥ 28 px): where personality lives. Can be lower x-height, higher contrast or tighter spacing. [SHOULD] keep display/brand faces in display roles only (digest 13; Nothing OS lesson).

### B2. When one family is enough, and how to pair
- HIG: "Minimize the number of typefaces you use, even in a highly customized interface" — HIG Typography [F]. One family with optical sizes and widths (SF; Inter with `opsz`) covers UI, reading and display for most products. [SHOULD] default to one family plus one mono.
- Add a second family only for a clear role: a reading serif for long-form, or a display face for brand moments. Linear: "We started using Inter Display to add more expression to our headings" while keeping regular Inter elsewhere — https://linear.app/now/how-we-redesigned-the-linear-ui (2024-03-28) [F]. That is an optical-size split inside one family, not a new family.
- Pairing rule: contrast on one axis (serif vs sans, or a large width/weight gap), harmony on the others (similar x-height and proportions so mixed lines don't jump). Two similar grotesques together is the classic weak pairing (inference; consistent with HIG "mixing too many different typefaces can obscure your information hierarchy" [F]).
- Normalise mixed faces: on the web, `font-size-adjust: ex-height from-font` or matched `size-adjust` keeps fallback and inline faces optically equal (C3).

### B3. Code fonts
- What separates good code fonts: dotted or slashed zero; distinct `1 l I |`; distinct `' "` and backtick; wide punctuation (`.` vs `,`, `:` vs `;`) at 12–13 px; high x-height with standard widths so line lengths stay predictable. JetBrains Mono: taller x-height while keeping standard widths, dotted zero, 9° italic — https://jetbrains.com/mono/ [S]. Atlassian Mono is derived from JetBrains Mono and "maximizes lowercase height" for small-size rendering — Atlassian post [F].
- Ligatures debate: Butterick argues programming ligatures can "misrepresent the meaning of the code" and conflict with Unicode — https://practicaltypography.com/ligatures-in-programming-fonts-hell-no.html [S]. [SHOULD] keep ligatures off by default in code a user copies or edits (docs, terminals, inputs). Allow them as a user preference.
- Apple: SF Mono (six weights; Latin, Greek, Cyrillic; used in Xcode) — https://developer.apple.com/fonts/ [F]. On the web, `ui-monospace` resolves to SF Mono only in Safari (webstatus.dev `font-family-ui`: Safari 13.1/iOS 13.4 only, "limited" [F]), so stacks need explicit fallbacks: `ui-monospace, "SF Mono", "Cascadia Code", "JetBrains Mono", Menlo, Consolas, monospace` (stack is inference).
- Open options with good credentials: JetBrains Mono, IBM Plex Mono, Fira Code/Fira Mono, Source Code Pro, Geist Mono, Commit Mono, Iosevka, Atkinson Hyperlegible Mono (2025) (licences mostly OFL; check each, unverified). Commercial: Berkeley Mono (US Graphics), Söhne Mono, SF Mono (Apple platforms only).

### B4. Apple specifics
- Families: SF Pro (system font; nine weights, variable optical sizes, four widths, rounded variant), SF Compact (watchOS; small sizes, narrow columns), SF Mono, SF Rounded variants, New York (six weights, optical sizes) — https://developer.apple.com/fonts/ [F]; HIG: "The system provides the SF and NY fonts in the variable font format … dynamic optical sizes" so discrete Text/Display cuts aren't needed in code — HIG [F].
- "Don't embed system fonts in your app"; access them via system font APIs — HIG [F].
- Custom fonts with Dynamic Type: SwiftUI `Font.custom(_:size:relativeTo:)` ties scaling to a text style; UIKit `UIFontMetrics(forTextStyle:).scaledFont(for:)`; `@ScaledMetric` for spacing — WWDC20 10175 "The details of UI typography" https://developer.apple.com/videos/play/wwdc2020/10175/ [S]. Since iOS 14 SwiftUI custom fonts scale relative to `.body` by default, so `relativeTo:` is about matching the right style curve — https://wwdcnotes.com/documentation/wwdc20-10175-the-details-of-ui-typography/ [S]. [CHECK] Captions should scale on the caption curve, not the body curve.
- macOS: "macOS doesn't support Dynamic Type"; use dynamic system font variants (label, menu, title, tool tips, user fixed-pitch) to match standard controls — HIG [F].
- HIG on text-size changes: "Prioritize important content when responding to text-size changes"; avoid truncation at accessibility sizes; switch to stacked layouts — HIG [F].
- WWDC25 (26 design): "Typography has been refined to strengthen clarity and structure, now bolder and left-aligned to improve readability in key moments like alerts and onboarding" — WWDC25 session 356 transcript, https://developer.apple.com/videos/play/wwdc2025/356/ (2025-06) [F]. [SHOULD] On 26+ apps, centred light-weight alert or onboarding text now looks dated.
- WWDC26 / 27: I found no typography change. The HIG Typography change log has no 2026 entry (latest 2025-12-16, "Added emphasized weights to the Dynamic Type style specifications") [F], and the MacRumors list of 250+ changes for 27 mentions only "Larger text sizes in tvOS" — https://www.macrumors.com/2026/06/10/apple-lists-250-changes-ios-27-and-more/ (2026-06-10) [F]. Claims of "refined typography in 27" or "title-case section headers" are (unverified). Don't cite them until a primary source appears.
- **SF licensing on the web:** the Apple licence allows SF only "for creating mock-ups of user interfaces to be used in software products running on Apple's iOS, OS X or tvOS", forbids embedding, and forbids using it to "display or otherwise distribute any … website content" — https://developer.apple.com/fonts/ (licence text) [F]. [MUST] never self-host SF/NY as a web font. Use `system-ui`/`-apple-system` (which renders SF on Apple devices from the OS) or `ui-serif` for New York in Safari.

---

## C. Web delivery 2025–2026

### C1. Baseline status (webstatus.dev API, read 2026-10-26) [F]
- `font-size-adjust`: Baseline newly available 2024-07-25 (Chrome 127, Firefox 118, Safari 17). Safe to use.
- `font-optical-sizing`: widely available (2022-09-24). `font-variation-settings`: widely (2021). `font-variant-numeric`: widely (2022). `font-feature-settings`: widely (2018). `font-display`: widely (2022). `font-palette`: widely (2025-05-15). `font-variant-alternates`: widely (2025-09-13). `font-synthesis-*`: widely (2025-09-27).
- `text-wrap: balance`: newly available 2024-05-13. `text-wrap: pretty`: limited (Chrome 117, Safari 26; Firefox missing). Treat as progressive enhancement.
- `text-box` (trim/edge): limited (Chrome 133, Safari 18.2; Firefox missing). Progressive enhancement; layout must not depend on it.
- Font metric overrides (`ascent-override`, `descent-override`, `line-gap-override`): limited (Chrome 87, Firefox 89; Safari missing). So metric-matched fallbacks only partly work in Safari (inference: `size-adjust` itself works in Safari 17+, unverified).
- `system-ui` generic: widely available (2024-03-07). `ui-serif`/`ui-sans-serif`/`ui-monospace`/`ui-rounded`: limited, Safari only.
- `font-family: math`: newly available 2026-03-24.

### C2. Variable fonts and axes
- Variable fonts on about 39% (desktop) / 41% (mobile) of sites in 2025, up from 33/34% in 2024; Google Fonts serves most of them — https://almanac.httparchive.org/en/2025/fonts (published 2026-01-15) [F]; 2024 chapter [F].
- Registered axes: `wght`, `wdth`, `opsz`, `ital`, `slnt`. Custom axes include `GRAD` (grade: weight change without width change, so text doesn't reflow; useful for dark mode or hover) (unverified which UI faces ship GRAD; Roboto Flex does).
- `opsz`: with `font-optical-sizing: auto` (the default) the browser maps `opsz` to font-size. [AVOID] hard-coding `font-variation-settings: "opsz" …` globally; it overrides auto sizing and cascades badly. Prefer `font-weight`/`font-stretch`/`font-optical-sizing` over low-level `font-variation-settings`. About 75–78% of variable-font pages set `wght` through `font-variation-settings` — Web Almanac 2024 [F], which is the pitfall in action (inference).
- Inter 4 moved Inter Display into an `opsz` axis and ships roman and italic variable files with `wght`+`opsz` — Inter releases [S]; Wikipedia lists 4.1 as latest (2024-11-16) [S].

### C3. Fallback metrics and CLS
- `font-display: swap` causes layout shift when the web font arrives. Fix it by tuning a local fallback with `size-adjust`, `ascent-override`, `descent-override` and `line-gap-override`. Next.js `next/font` does this automatically (`adjustFontFallback`); Nuxt/Vite/Webpack use `fontaine`; Capsize offers `createFontStack` — https://developer.chrome.com/blog/framework-tools-font-fallback (updated 2023-02-27) [F].
- `font-size-adjust` (`ex-height` default; also `cap-height`, `ch-width`, `ic-width`, `ic-height`, `from-font`) scales fallbacks to the primary face's x-height. Note: each face in a family is adjusted on its own — MDN https://developer.mozilla.org/en-US/docs/Web/CSS/font-size-adjust [F].
- web.dev: `optional` is the most performance-first choice (≤100 ms block, never swaps late); `swap` needs early delivery; a mixed strategy of `swap` for brand display and `optional` for body is acceptable — https://web.dev/articles/font-best-practices (2022-10-04) [F].
- Real-world use (2025): `swap` about 50%, `block` about 25% (mostly icon fonts), `auto` about 9%, `fallback` about 5%, `optional` about 0.5% — Web Almanac 2025 [F]. [AVOID] `block` on text faces (invisible text for up to 3 s).

### C4. Files, subsetting, hosting
- WOFF2 only: "Use only WOFF2 and forget about everything else" (Bram Stein, quoted by web.dev [F]). WOFF2 was 65% of font files in 2025 — Web Almanac 2025 [F] (the 2024 chapter counted 81% desktop by a different measure [F]).
- Subset and split with `unicode-range`. Check the licence allows subsetting and self-hosting — web.dev [F]. [CHECK] Total font bytes on first load. Typical budget for a Latin UI is roughly 1–2 variable WOFF2 files of about 30–100 KB each after Latin subsetting (unverified heuristic).
- `preconnect` (with `crossorigin`) for third-party font origins; `preload` only the one or two critical faces — web.dev [F].
- Self-hosting is now the majority path: about 72% of sites self-host something, and 31.5% (desktop) / 36.4% (mobile) self-host only; Google Fonts is used by 54% desktop / 47% mobile — Web Almanac 2025 [F].
- **GDPR:** LG München I (3 O 17493/20, 2022-01-20) awarded €100 damages because embedding Google-hosted fonts sent the visitor's IP to Google without consent, and noted self-hosting avoids it — https://thehackernews.com/2022/01/german-court-rules-websites-embedding.html [S]. [SHOULD] For EU-facing products, self-host (Google Fonts files are OFL, so self-hosting is allowed).
- Replace icon fonts with SVG — web.dev [F]. Icon fonts are still about 18% of web fonts (2024) [F].

### C5. System font stacks in 2026
- `system-ui` is used on about 10% of pages (2025) [F]. Caveats: on Windows, Chrome maps `system-ui` to a locale font (Microsoft YaHei, Yu Gothic UI or Meiryo) for all text, which can render Latin poorly; Bootstrap removed it and later re-added it; Segoe UI Variable (Windows 11) is not what `system-ui` returns — https://code.djangoproject.com/ticket/33878, https://tigeroakes.com/posts/segoe-ui-variable/ (2022) [S]. Current Windows 11 behaviour is (unverified).
- Workable 2026 stack (inference): `system-ui, -apple-system, "Segoe UI Variable Text", "Segoe UI", Roboto, "Noto Sans", "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`. Put an explicit `"Segoe UI"` before `system-ui` if Windows CJK-locale Latin rendering matters.
- Atlassian dropped system fonts in product UI because "SF Pro on Mac sits higher on the baseline than Segoe UI on Windows", which changed icon–text alignment — Atlassian post (2025-04-10) [F]. That is a legitimate, testable reason to ship a web font.

### C6. Respecting the user
- [MUST] Size text in `rem`/`em`, and never set `html { font-size: <px> }`; use `100%` or leave it, so browser and OS text-size settings apply (WCAG 1.4.4; inference from standard practice). Check by setting the browser default to 20 px: everything should scale.
- [MUST] WCAG 1.4.12 overrides must not clip (A2).
- `text-wrap: balance` for headings (≤ about 6 lines); `pretty` for paragraphs as an enhancement. Only 2.7% / 1.7% of pages use them (2025) [F], so their absence is not a finding; a ragged two-line hero headline may be.
- `font-variant-numeric: tabular-nums` / `slashed-zero` instead of `font-feature-settings: "tnum"`. [AVOID] `font-feature-settings`: it is low-level, doesn't inherit additively (a later rule resets all features), and turning off `kern`/`liga` by accident is common. Its use fell from 13% to 10% of pages 2022→2024 [F].

---

## D. Typeface distinctiveness 2025–2026

### D1. What now reads as default (evidence)
- Web-wide top families 2025: Roboto ~10–11%, Font Awesome ~9%, Poppins ~6%, Open Sans ~5–6%, Montserrat ~3–4%, Inter ~1.4–1.5% — Web Almanac 2025 [F]. In 2024 Inter was about 1.0% and ranked 13th (9th among self-hosted), and the authors expected it to reach the top 10 — Web Almanac 2024 [F]. Inter on Google Fonts: about 414 billion views in the year to May 2025, +57% year on year [S].
- Third-party gallery survey: Inter on 13% of curated sites and 24% of Framer sites (2026) [S, via search summary, unverified].
- AI-default fingerprint: Inter (also Plus Jakarta Sans, Geist) with indigo/purple gradients and three rounded cards — https://prg.sh/ramblings/Why-Your-AI-Keeps-Building-the-Same-Purple-Gradient-Website (2025-10) [S]; noqta.tn, 925studios (2026) [S]. Most commentators say Inter is fine and the problem is no deliberate choice. No systematic study exists (search summary) [S].
- Second-layer defaults (when Inter is banned): Geist and Geist Mono (the "Vercel look"), Satoshi and General Sans (Fontshare), Instrument Serif and other condensed serif display faces, Fraunces, Space Grotesk, Bricolage Grotesque, PP Neue Montreal / Söhne-like grotesques, IBM Plex, JetBrains Mono as UI accent. Already catalogued in digest 13 §second-layer [F, internal]. Condensed serifs (Instrument Serif) named a brand trend, with Perplexity among adopters — WSJ via letsdatascience.com (2025) [S]. Geist became Nothing OS 4.0's system face (digest 13) [S].
- Poppins/Montserrat remain the "template/WordPress" tell (top 5 on the web) (inference from Almanac [F]).
- Reviewer rule: popularity alone isn't a defect. Flag it when (a) the face is the only identity carrier, (b) it is used with its default settings (no `opsz`, `cv`/`ss`, tracking or weight decisions), or (c) it was swapped by name for another default (digest 13 [MUST]).

### D2. How respected products chose faces (mechanism)
- **Airbnb Cereal (2018, Dalton Maag):** no existing face gave "a unique and consistent voice across their mediums and platforms". Faces were "good for brand and print but not UI, or vice versa". Spec: taller x-height and open apertures, six weights; Latin first, other scripts planned — https://www.dezeen.com/2018/05/16/airbnb-new-scaleable-typeface-dalton-maag-design/ [S]. Mechanism: one face for both brand and UI, built to UI legibility specs.
- **Figma Sans (Grilli Type):** commissioned with the brand refresh as "a crucial counterpart" to the visual language; had to work for display and reading (Help Center), for designers and non-designers — https://figma.com/blog/the-story-of-creating-figma-sans/ [S]. Earlier, Figma had left Roboto because it was "difficult to read when it was small", which fed into Inter — https://www.figma.com/blog/the-birth-of-inter/ [S].
- **Atlassian Sans / Mono (2025):** derivatives of Inter Variable and JetBrains Mono. Reasons: one cross-OS rendering (system fonts differ in baseline and spacing), information-dense screens, legibility and accessibility; rolled out through tokens first (no visual change), then enhancements, then the font swap; smallest sizes went from 11→12 px. Charlie Sans stays the brand face — https://atlassian.design/whats-new/implementing-typography-at-scale (2025-04-10) [F]. Mechanism: own a derivative of an open face, so you can tune features without designing from scratch, and stage it through tokens.
- **GitHub Mona Sans / Hubot Sans (2022-12, with Degarism, OFL):** variable weight, width and slant. Mona for product, web and print; Hubot (more geometric) for headers and pull quotes. Open-sourced because GitHub "didn't need to be the only one with access" — https://github.blog/news-insights/company-news/introducing-mona-sans-and-hubot-sans/ [S]. Mechanism: a width axis gives range from one family; open licence builds goodwill.
- **Vercel Geist (2023, with Basement Studio, OFL):** Vercel asked for a custom face that included a mono and would be open source, based on Swiss principles; later Geist Pixel display variants — https://basement.studio/post/the-birth-of-geist-a-typeface-crafted-for-the-web (2024-11-14) [S]; https://vercel.com/font [S]. Mechanism: sans plus mono designed together for a developer audience, distributed through next/font. That distribution is also why it became a default.
- **Linear (2024):** Inter Display for headings, Inter for the rest — Linear post (2024-03-28) [F]. Third-party teardowns report weight 510, `cv01`/`ss03` and Berkeley Mono [S, unverified]. Mechanism: distinctiveness from tuning (optical size, off-grid weight, alternates), not a new family.
- **Stripe:** Söhne (Klim) on marketing; product UI reported to use a system stack; no stated rationale found [S]. **Cash App:** Cash Sans, reportedly a custom Söhne cut (single forum post) (unverified).
- **Duolingo:** Feather Bold (2019, Johnson Banks + Fontsmith), shapes from the owl's feathers; in-app text reportedly DIN Next Rounded — https://creativebloq.com/news/feather-bold [S]. Mechanism: display face carries the mascot personality; a rounded workhorse handles UI.
- **IBM Plex (2017):** replaced Helvetica Neue to own the brand voice and avoid licensing costs; open-sourced (unverified, general knowledge).
- **Notion:** public sources give no stated rationale; Inter/system-based UI (unverified).
- Pattern (inference): every credible custom face came from a stated product constraint (cross-platform consistency, dense UI, brand-plus-UI unity, licence control), with UI legibility specs written first. A reviewer proposing a custom face should name the constraint.

### D3. Open-licensed faces with strong UI credentials (check each licence file)
- Sans for UI: Inter (opsz, many `cv`), IBM Plex Sans, Source Sans 3, Public Sans (USWDS), Noto Sans (script coverage), Mona Sans / Hubot Sans, Geist, Atkinson Hyperlegible Next (seven weights, variable, 150+ languages, Feb 2025 — Braille Institute [F]), Figtree, Onest, Instrument Sans, Schibsted Grotesk, Hanken Grotesk, Manrope, Recursive (unverified licences beyond those cited; most are OFL on Google Fonts).
- Serif for reading: Source Serif 4 (opsz), Literata (opsz, built for e-reading), Newsreader (opsz), Fraunces (opsz, `SOFT`, `WONK`; display-leaning), IBM Plex Serif, Noto Serif (unverified).
- Not OFL: Satoshi and most Fontshare faces use the ITF Free Font License (free commercial use, but no redistribution or modification; don't commit files to public repos) [S]. SF/NY are Apple-only (B4). Atkinson Hyperlegible is free for commercial use under Braille Institute's EULA; the Google Fonts release is OFL (unverified).

---

## E. Practical evaluation procedure

### E1. Inventory (5 min)
- [CHECK] List every face, weight and style actually loaded (web: DevTools Network → Font, or `document.fonts`; iOS: `UIFont.familyNames` against the Info.plist `UIAppFonts`). Map each to a role (B1). Flag: >2 families plus mono; light weights at ≤14 px; display face in body/controls; SF/NY files served on the web.
- [CHECK] Read the font tables: `sxHeight`/UPM, `sCapHeight`/UPM, weights present, GSUB features (`tnum`, `zero`, `case`, `ss*`, `cv*`, `smcp`), cmap coverage for the product's locales. Script idea (fontTools): print `sorted({f.FeatureTag for f in font['GSUB'].table.FeatureList.FeatureRecord})`.

### E2. Specimen strings (render each at every test size)
- Confusables: `Il1| O0o rn m cl d vv w 5S 8B 2Z 6b 9gq` and `Illegal1 O0O0 l1Il|`.
- Real codes: `INV-0O81-IlL1`, `SKU 5S8B-2Z0O`, an API key style `sk_live_0Ol1I…`, a 6-digit OTP `041 170`.
- Numbers: `$1,111.10  −$48.07  +12.5%  00:01:11  1/11/2026  11:11 AM`; a 4-row table with changing values (must not jitter: tabular test).
- Product strings: the three longest real labels, a button, a nav item, an error message, a timestamp and an empty state, in each shipped locale. German compound (`Datenschutzeinstellungen`), French with `« »`, Polish `Zażółć gęślą jaźń`, Vietnamese `Tiếng Việt có dấu`, Turkish `İstanbul ılık`, plus CJK/Arabic/Hebrew if supported (mixed with Latin in one line).
- Caps and punctuation: `ACCOUNT SETTINGS (BETA) — 2FA @HOME`, quotes `'"‘’“”`, dashes `- – — −`.
- Reading paragraph: 3–4 lines of real body copy with an italic phrase and a link.
- Code block (if any): `if (a != b && c <= 0x0O1l) { return "I|l1"; } // ;:.,` with ligatures on and off.

### E3. Sizes, engines, conditions
- Sizes: platform minimum (iOS 11 pt, macOS 10 pt, web 12 px), common UI (13/14/15/16), body (17 pt iOS; 16–18 px web), and display (28/34/48+). iOS: also xSmall, AX3 and AX5. Web: browser default font set to 20 px, and 200% zoom.
- Engines: Safari/WebKit on a Retina Mac and on iOS; Chrome on Windows at 100% scaling (ClearType/DirectWrite, the hardest case); Firefox (gets no `text-box`/`pretty`); one Android/Linux render if the audience warrants. Apple-native: device plus Simulator at @2x and @3x.
- Conditions: light and dark mode (thin strokes bloom or vanish), Increase Contrast / Bold Text on Apple, WCAG 1.4.12 spacing bookmarklet, 1 px blur or squint check, over materials/glass (digest 16).
- Load: throttled "Slow 4G" with cache off. Watch FOIT/FOUT and measure CLS from the font swap; check fallback metric overrides exist.

### E4. What to measure / judge
- Confusable pairs distinguishable at minimum size on Windows Chrome and iOS (pass/fail per pair).
- x-height ratio and its band; apparent size against the system face at the same nominal size (screenshot overlay).
- Weight ladder: Regular → Semibold → Bold exist; Bold Text has a step up; no weight below Regular at ≤14 px.
- Figures: tabular where values change or align; `zero` or a distinct 0 in code/ID fields; true minus.
- Coverage: no tofu (□) and no fallback-face jumps in the locale strings; matching weight in fallbacks.
- Scaling: Dynamic Type or rem scaling works with no truncation at AX sizes / 200%; 1.4.12 no clipping.
- Delivery (web): WOFF2, subset, ≤2 critical preloads, `font-display` not `block`, metric-matched fallback, self-hosted for EU, no SF on the web, no `html{font-size:px}`.
- Role fit and distinctiveness: each face sits in its role; identity comes from treatment (opsz, widths, alternates, a display face limited to display roles), not from a name swap.

### E5. Verdict format (one block per face)
```
Face: <family> <weights/axes> — Role(s): <UI | reading | data | code | display>
Legibility: PASS | CONCERN | FAIL — x-height <0.xx>, confusables <n/total failing @ size/engine>, weights <list>, Bold Text <yes/no>
Figures/features: tnum <y/n>, zero <y/n>, case <y/n>, alternates used <list>
Coverage: <locales tested> — tofu/fallback issues <none|list>
Scaling: Dynamic Type/rem <ok|issue @ size>, 1.4.12 <ok|clips at …>
Delivery (web): format/subset/display/fallback/hosting <ok|issues>; CLS from fonts <value>
Distinctiveness: default-tier <yes/no>; identity carried by <treatment|nothing>
Verdict: Keep | Tune (<specific settings>) | Restrict to <role> | Replace (constraint: <named>; candidates: <2–3 faces, each tested>)
Evidence: <screenshot refs, sources>
```
- Severity mapping (inference, align with report template): FAIL on confusables in codes/OTP fields, light weights below platform minimum, no Dynamic Type/Bold Text for a custom face on iOS, SF served on the web, or text clipping at 1.4.12 = Blocker/High. Missing tabular figures in changing numbers, `block` display, no fallback metrics = Medium. Default-tier face with no treatment = distinctiveness note, not a defect.

---

## F. Reference snippets (for fixes the reviewer proposes)

Web: a metric-matched fallback, user-size-respecting root, and numeric features (values are placeholders; generate real ones with Capsize or fontaine):
```css
@font-face {
  font-family: "Brand Sans";
  src: url("/fonts/brand-sans-latin.var.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;            /* or optional for body text */
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+2000-206F, U+20AC, U+2212;
}
@font-face {                     /* tuned local fallback to cut CLS */
  font-family: "Brand Sans Fallback";
  src: local("Arial");
  size-adjust: 107%;             /* placeholder */
  ascent-override: 90%;          /* not applied in Safari (C1) */
  descent-override: 22%;
  line-gap-override: 0%;
}
html { font-size: 100%; }        /* never px: keep the user's setting */
body {
  font-family: "Brand Sans", "Brand Sans Fallback", system-ui, sans-serif;
  font-size: 1rem;
  font-size-adjust: ex-height from-font;   /* Baseline 2024 */
}
.num, td.amount, time { font-variant-numeric: tabular-nums lining-nums; }
.code-id { font-variant-numeric: slashed-zero; }
h1, h2 { text-wrap: balance; }
p { text-wrap: pretty; }          /* enhancement; no Firefox */
code, pre, kbd { font-family: ui-monospace, "SF Mono", "JetBrains Mono", Menlo, Consolas, monospace;
                 font-variant-ligatures: none; }
```

SwiftUI: custom face on the right Dynamic Type curve, with Bold Text and tabular figures (sketch; check names against the shipped font):
```swift
@Environment(\.legibilityWeight) private var legibilityWeight   // .bold when Bold Text is on
var bodyFont: Font {
    .custom(legibilityWeight == .bold ? "BrandSans-Semibold" : "BrandSans-Regular",
            size: 17, relativeTo: .body)
}
Text(price).font(.custom("BrandSans-Regular", size: 12, relativeTo: .caption)).monospacedDigit()
```
- `legibilityWeight` is the SwiftUI environment value for Bold Text (unverified that every custom-font path needs it; system fonts handle it automatically per HIG [F]).
- UIKit: `UIFontMetrics(forTextStyle: .body).scaledFont(for: base)` and set `adjustsFontForContentSizeCategory = true` [S, WWDC20 10175].

## G. Open questions and items to re-check before citing

- WWDC26 / 27 typography: no primary source found for "refined typography in 27" or "title-case section headers". Re-check the HIG Typography change log and the WWDC26 design sessions before stating anything (B4).
- DIN 1450 numeric criteria (stroke width to x-height ratios, spacing, size by viewing angle): need the standard's text. Only scope and the differentiation intent are confirmed [S]. The 2013 edition is listed as withdrawn.
- Safari support for `size-adjust` vs the other metric overrides: webstatus groups `ascent/descent/line-gap-override` as Safari-missing; confirm `size-adjust` separately on MDN/BCD before relying on it.
- Current Windows 11 behaviour of `system-ui` (Segoe UI vs Segoe UI Variable; CJK locales) — sources are from 2022.
- Web Almanac 2025 doesn't report `size-adjust`/`font-size-adjust`/`font-optical-sizing` usage; adoption is unknown.
- Inter's exact 2025 rank (the Almanac gives 1.4–1.5% but no rank); Google Fonts' own analytics weren't fetched (third-party figures only).
- Custom-face rationales for Stripe, Cash App, Notion and Duolingo's UI face are not in primary sources; treat them as leads.
- The x-height bands in A2 are working heuristics, not research thresholds. Calibrate them against SF Pro, Inter, Roboto, Segoe UI and Noto Sans by running the E1 script on each and recording the values in this file.
