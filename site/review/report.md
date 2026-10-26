## 1. Summary

**What was reviewed.** The loupe project website: all eleven routes of the static export served at `localhost:4318`, plus its source in `site/`. The routes were `/`, `/method`, `/cases`, the three case pages, `/testing`, `/tools`, `/specimen`, `/faq` and the 404 page. It was a whole-app review, run with the profile the owner confirmed (no `.loupe.md` was written): web only, `release_stage: development`, an expressive-but-restrained register, and a chosen direction of lightbox, loupe and engineering redlines.

**Verdict.** The site holds up to its own review on the things that are hardest to fake:
- No text fails contrast at rest in any of the 12 width × scheme × motion combinations.
- No target is below 24 px without spacing.
- Reduced motion is honoured, and no template defaults were detected.
- The direction is carried by more than the palette.

It fails its own standard in three measured places:
- A hover state drops a redline number to 4.05:1.
- Two pages scroll sideways at 320 px.
- The 404 page wears the home page's title.

The bigger risk is a set of hand-written claims about the skill and the site that have already drifted from their sources. On a site whose argument is "shows its measurements", that drift is what a sceptic will find first.

**What to do first:**
- Fix findings 1 to 3. Each is a one-line CSS or metadata change.
- Then take Rework R1: derive or build-check every claim the site makes about the skill and itself, instead of paraphrasing it by hand.

**Assumptions.**
- The profile came from the owner's answers, not a `.loupe.md`.
- The register is expressive-but-restrained, as given.
- Voice is en-GB (`lang="en-GB"`, "licence", "colour") and sentence case, inferred from the strings.
- Content that literally read "PENDING" at the start of the review was ignored as content. The components that hold it were reviewed.

**Run notes.**
- **The artefact changed mid-review.**
  - The first measurement ran on the export from 20:58.
  - The site was rebuilt at 21:17 while the passes ran. That build filled in `/testing`, the case reports and the home specimen, and reworked the loupe into a panning window.
  - Every finding below was re-checked against the **21:17 export**, and all measurements were re-run on it. The 21:17 export is the reviewed artefact.
  - Four draft findings are gone from this report because the 21:17 build had already fixed them:
    - `/testing` returning 404 from the main nav.
    - The ring moving off screen from the finding list at 390 and 820 px.
    - An unclamped ring causing page-wide horizontal scroll.
    - The specimen screenshot specified at 1x and magnified 2.5×. The asset is now 780×3000.
  - The source kept changing after 21:17. For example, `app/globals.css` on disk now gives `.loupe-list button:hover` a `--sheet` background, which would fix finding 1. Edits made after the 21:17 export are **not** reviewed or measured here.
- **Tools.**
  - The Playwright MCP tools were unavailable, so the skill's own scripts ran in Node scripts with Playwright 1.64.1:
    - `scripts/measure-runner.js`, unchanged, on every route: 390/820/1440 × light/dark × reduced motion on and off.
    - `scripts/type-eval.js` on `/` and `/specimen`, in Chromium 1248.
  - FAQ and home screenshots were also taken in Firefox 1555 and WebKit 2370.
  - Forced colours and `prefers-contrast: more` were emulated in Chromium.
  - Text at 200% was tested by setting the root font size to 200%.
  - RTL was tested with `dir="rtl"`, and pseudo-localisation by padding text nodes by 40%.
  - Five subagents were used: landscape, four pass groups, and a fresh red team. Every item they returned was checked against the evidence before it went in.
- **Evidence.** Everything is in a session scratch folder outside the repo, `…/scratchpad/dogfood/`:
  - `measure.json` is the 21:17 build. `measure-2058.json` is the first build.
  - `stress.json` and `verify.js` hold the stress-state checks.
  - `shots/*.png` holds the screenshots.
  - The scratch folder is not committed.
- **Measurement summary (21:17 build).**
  - Contrast: 0 fails and 0 unmeasurable rows on every route, in all 12 combinations. The case pages hit the runner's 400-item cap, so their rows are sampled.
  - Targets: the only items under 24 px are inline text links with `spacingOk: true`, plus two 37.8×44 colour inputs.
  - Type: two families (Atkinson Hyperlegible Next and Mono). There are 12 distinct sizes on `/` and 14 on `/specimen`. The minimum is 12 px, except 11.7 px on `/specimen`.
  - Motion: `transitionAll` 0, `animatedOnLoad` 0, and a reduced-motion rule is present.
  - Template defaults: none. Logical properties: 4 physical, 0 logical. Iframes: none.
- **Scope limits.**
  - I deliberately did not read the content of the blind-round results on `/testing` or in the case reports, as the owner asked. Those pages were reviewed for structure, layout and accessibility only.
  - No `.playwright-mcp/` folder was created.
  - DOM edits made during the text-stress tests were undone by reloading.

## 2. Findings

| # | Finding | Where | Impact | Apple | Fix |
|---|---|---|---|---|---|
| 1 | Hovering a row in the loupe's finding list puts the redline finding number (`.loupe-n`, #c52f0f, 17 px, weight 600) on `--measure-wash` over `--paper`. The ratio is **4.06:1 computed and 4.05:1 pixel-sampled**, below 4.5:1 (WCAG 1.4.3). Hover fills are not gated by `(hover: hover)` (finding 22), so on phones this state stays on screen after a tap. The pair is missing from the build-time contrast check (finding 16). | `/` specimen. `globals.css` `.loupe-list button:hover`, `.loupe-n` (21:17 export) | Blocker | Web | Use a hover ground that isn't red: `--sheet` gives 5.41:1. Add every hover and pressed pair to the build check. |
| 2 | At 320 px, inline `<code>` in prose doesn't wrap, so the whole page scrolls sideways (WCAG 1.4.10). `/method` has `references/augment/distinctiveness.md` in the quoted rules (scrollWidth 361). `/testing` has `runs/<model>/<fixture>/<condition>` (scrollWidth 342). | `/method`, `/testing`. `globals.css` `code`, `.quoted code` | Blocker | Web | `.prose code, .quoted code { overflow-wrap: anywhere; }`. Re-measure at 320. |
| 3 | The 404 page has no title of its own. `/nope` (and any mistyped URL) is titled "loupe: design review for Claude Code, grounded in Apple's Human Interface Guidelines". That is the home page's title on a page that is not the home page (WCAG 2.4.2, failure F25). | `app/not-found.tsx` (no `metadata` export) | Blocker | Web | `export const metadata = { title: 'Page not found' }`, which renders "Page not found \| loupe". |
| 4 | The case pages promise loupe's report "next to the review the same model wrote without the skill", but each baseline is a closed `<details>` placed after the full skill report. At 390 px, `/cases/lendwell` is 49,001 px tall. The first baseline toggle is at y≈22,243, about 25 screens below where `/testing`'s "Read both reports" link lands (`#opus-h`). There is no in-page index of the three models' sections, and no next step at the end (next case, all cases, install). | `app/cases/[slug]/page.tsx` 43-59; `/cases` lede | Major | SHOULD | Show each model as a pair: "With loupe" and "Without loupe" side by side at ≥52rem, and a two-option switch below that, with the judges' line on top. Add a three-item jump list under the header. Give each baseline an id the testing page can link to. End with "Next case · All cases · Install". |
| 5 | In forced colours, keyboard focus on the selected finding row can't be seen. `.loupe-list button[aria-pressed='true'] { outline: 2px solid Highlight }` comes later than the `:focus-visible` outline at equal specificity and replaces it, so focusing the pressed row only moves the outline offset from 0 to −2 px. | `/` loupe list. `globals.css` forced-colours block after `.loupe-list button:focus-visible` | Major | SHOULD | In forced colours, mark selection with `border-inline-start: 4px solid Highlight` and leave `outline` to `:focus-visible` (`2px solid CanvasText; outline-offset: -4px`). |
| 6 | The install commands are hard to use with assistive tech, and copy failures are hidden from sighted users:<br>• All four buttons on `/` are named "Copy", so a screen-reader or Voice Control list can't tell them apart.<br>• `aria-label` on the focusable `<pre>` isn't exposed, because names are prohibited on the generic role. Each `pre` is an unnamed tab stop.<br>• When copying fails, the only feedback is a visually hidden `role=status`, which clears after 2 s. The visible label stays "Copy" (confirmed in a headless run). | `components/Command.tsx` 14-26; `/` four instances | Major | SHOULD | `<pre role="region" aria-label={label} tabIndex={0}>`. Make the button `Copy<span class="visually-hidden"> {label}</span>`. On failure, show "Couldn't copy" on the button, select the command, and show "The command is selected. Press Ctrl+C or ⌘C." until the next action. |
| 7 | The contrast checker announces about 230 characters on every keystroke. `aria-live="polite"` wraps the ratio and all four verdicts. Typing `#575b62` passes through invalid and valid values, so the region alternates between the full verdict list and "Enter two colours…", which doesn't say which field is wrong. | `/tools`. `components/ContrastChecker.tsx` 72-96 | Major | SHOULD | Remove `aria-live` from the block. Add one visually hidden polite region that announces only "5.61 to 1, passes body text" 500 ms after typing stops, and only when both values are valid. The per-field hint already handles errors correctly. |
| 8 | At 200% text on a 390 px screen, the hero and quoted code push pages sideways. scrollWidth: `/` 565, `/method` 721, `/testing` 684, `/cases/lendwell` 445, `/specimen` 416. On `/` the h1 word "measurements." can't wrap, and the `.page-head` grid widens to fit it, taking the eyebrow, lede and command box with it. Content can still be reached by scrolling, so this is not a 1.4.4 loss. | `globals.css` h1 `clamp(2.4rem, 6.2vw, 4.6rem)`, `.page-head`, `.eyebrow`; inline code (finding 2). `shots/home-390-text200.png` | Major | SHOULD | Cap the h1 with `min(clamp(…), 11vw)` and add `hyphens: auto` (the page is `lang="en-GB"`). Give `.page-head` `grid-template-columns: minmax(0, 1fr)`. Add `overflow-wrap: anywhere` to inline code. Re-test at 200% on 390. |
| 9 | The bookmarklet can only be added by dragging. It is a 37 KB `javascript:` link styled as the site's filled primary `.button`, which invites a click. A click runs it on loupe's own page; it doesn't install anything. Phones have no bookmarks bar to drag to, and the profile expects plenty of mobile visitors. The page offers no keyboard, copy or touch route. This is not a WCAG 2.5.7 failure, because the drag target is browser chrome. | `/tools`. `components/Bookmarklet.tsx` 4-11; `app/tools/page.tsx` 45 | Major | SHOULD | Add a secondary "Copy bookmarklet" button. Steps: "Or copy it, bookmark any page, then edit that bookmark and paste this in place of its address. On a phone, do the same from the bookmarks editor." Add a hint by the link: "Click it here to measure this page." |
| 10 | `/method` quotes SKILL.md "Rules" and red-team.md "The rework bar" verbatim. That is about 1,400 words written for the agent, shown to people with no key. It includes `release_stage`, `(26+)`, `UIDesignRequiresCompatibility`, `.playwright-mcp/`, "before step 7" (the site never shows the skill's step numbers), and every check wrapped in "[Taste] … — Apple silent". It is step 3 of the sceptic journey that `/specimen` describes. | `app/method/page.tsx` 63, 73; `shots/method-1440-light.png` | Major | SHOULD | Keep the quote; it is what stops drift. Above each quote, add a two-line key: "[Taste] means reviewer judgement; 'Apple silent' means Apple has no rule on it; `release_stage` is development or release, from the project profile." Quote Apple is the core, Conflicts, Impact, Apple column, Dead controls, Specific or nothing and Proposal classes in the open, and the rest under a `<details>` labelled "The whole Rules section, as the agent reads it". |
| 11 | On the home page, the install commands are cut off inside their boxes. In the three-column `#install` grid at 1440 px, each `.cmd pre` shows 278 px of 322, 399 and 476. At 390 px every command shows 268 px. The worst case is "Clone and link": three shell lines that will be pasted into a terminal, with the target `~/.claude/skills/loupe` hidden. This audience reads a command before running it. | `/` `#install` and hero. `globals.css` `.cmd pre`, `.sheet-grid` | Major | SHOULD | Set the `#install` commands with `white-space: pre-wrap; overflow-wrap: anywhere`, or stack the three methods in one column at full width. Keep horizontal scroll only for genuinely long single tokens. |
| 12 | Case pages have **7 `<h1>`s and 53 `<h2>`s**. The embedded markdown reports keep their own `#` and `##` headings, so each report's "1. Summary … 9. Unverified" sits at the same level as the page's "loupe's report" h2s. Those three h2s are identical; the model name is only in the eyebrow. Heading navigation can't tell the models apart or find where one report ends. The same template embeds this report on `/specimen`. | `app/cases/[slug]/page.tsx` 47-57; `lib/md.ts` `html()` | Major | Web | Demote embedded headings by two levels in `html()` (a `marked` walkTokens depth offset) and wrap each report in `<article aria-labelledby>`. Make the h2 "Claude Opus: loupe's report", and the baseline summary label "Claude Opus without loupe". |
| 13 | The FAQ questions show no sign that they expand. `details summary { display: flex }` removes the `::marker` in Chromium, Firefox and WebKit (screenshots of all three). Nine bold lines with hairlines between them read as headings, not controls. | `/faq`. `globals.css` `details summary` | Major | Research | Keep `display: list-item`, or add `summary::before { content: '+' }` that becomes '–' under `[open]`, drawn in text in `--ink` so it survives forced colours. |
| 14 | The redline, "one accent, one job", is used on things that are not measurements. `/specimen` itself says "If it isn't a measurement, it isn't red." Eight uses break that rule:<br>• home step numbers 00-07 (`app/page.tsx` 109, `.m`)<br>• the loupe finding numbers (`.loupe-n`)<br>• the 404 status code (`not-found.tsx` 7)<br>• the wordmark crosshair (`RingMark.tsx` 6)<br>• the hover washes on `.loupe-list` and `.button.secondary`<br>• the pressed-row bar<br>• the ring's crosshair<br>Diluting the one rule the identity rests on weakens what the profile names as the site's distinguishing channel. | `app/page.tsx` 109; `components/Loupe.tsx`; `not-found.tsx` 7; `RingMark.tsx` 6; `globals.css` (hover, pressed, `.loupe-cross`) | Major | Taste | Set step numbers, finding numbers and 404 in `--ink` mono. Draw the pressed bar and hover in `--ink` or `--rule`. Keep the crosshair red only inside the ring, where it marks the exact measured point. Draw the wordmark cross in `currentColor`. Then a grep for `--measure` lists only measured values. |
| 15 | The home page's definition of Blocker disagrees with the skill. The home page says "Only a measured WCAG A or AA failure, or an Apple MUST whose breach stops the task … or risks App Review rejection or data loss." SKILL.md's Impact rule differs in five ways:<br>• it also accepts *source-confirmed* WCAG failures<br>• it limits the MUST basis to native Apple targets<br>• it makes data loss its own basis<br>• it adds Trust-gate items<br>• it adds tasks that can't be completed in a release build<br>`/method` quotes the real rule, so a careful reader finds two definitions that disagree. | `app/page.tsx` 63-66 | Major | Taste | Import the sentence from SKILL.md (see R1), or rewrite it as: "Needs evidence of one of these: a measured or source-confirmed WCAG A or AA failure; an Apple MUST on an iPhone, iPad or Mac app whose breach stops the task, blocks an accessibility need or risks App Review rejection; data loss; deceptive design; or a task that can't be finished in a release build." |
| 16 | `/specimen`'s table "Every pair the site uses" says "the build checks them, and it would fail if any pair dropped below its threshold". The list (`lib/tokens.ts` 28-39) has no hover, pressed or focus pairs, and one of the missing pairs fails (finding 1). The page meant to prove the site meets its own standard claims a guarantee it doesn't have. | `/specimen`. `app/specimen/page.tsx` 139-142; `lib/tokens.ts` 28-39 | Major | Taste | Add `measure` on `measure-wash` over paper and sheet, `ink` on wash, and the pressed and focus pairs, so the build fails today. Fix finding 1, then keep the claim. If the list stays hand-picked, rename it "The pairs the build checks". |
| 17 | Every route shares the home page's Open Graph and Twitter metadata, including `og:url` = the site root. Pages set `title` and `description`, but `openGraph` is inherited whole from `app/layout.tsx` 46 (checked on `out/cases/lendwell.html`, `testing.html`, `specimen.html`). The audience arrives "plenty of mobile from social links", so a shared case report or testing page previews as the home page, and platforms are pointed at the root. Reviewer judgement. | `app/layout.tsx` 46-55; each page's `metadata` | Major | Taste | Remove `url` from the root `openGraph`, and give each page and `generateMetadata` its own `openGraph: { title, description, url }`. |
| 18 | The home page has four identical filled "Copy" buttons. The hero's one intended action carries no more weight than its three repeats in `#install`. `.button.secondary` is defined and used nowhere. | `/`. `app/page.tsx` 30, 139, 143, 147; `globals.css` `.cmd button`, `.button.secondary` | Minor | SHOULD | Keep the hero Copy filled, and give the `#install` buttons the secondary style (transparent, ink border). |
| 19 | The home link "The full method, with the rules it won't bend" leads to `/method`, which never sets out the eight steps it summarises. `/method` also says "You can try both measurements … on the tools page", but `/tools` offers only measure.js, not the type script. | `app/page.tsx` 115-117; `app/method/page.tsx` 52-55 | Minor | SHOULD | Give `/method` one h2 per step, in the home page's order, or rename the link "How it reads and measures, and the rules it won't bend". Change the second sentence to "You can run the measurement script in your own browser on the tools page." |
| 20 | "Install inside Claude Code instead" jumps to `#install`, whose first card is the same `npx skills add` command as the hero. The hero never says that command runs in a terminal. | `/` hero. `app/page.tsx` 30-33, 137-140 | Minor | SHOULD | "Run it in a terminal. Free and MIT-licensed. [Other ways to install, including the Claude Code plugin]." Put the plugin card first, or drop the duplicate card. |
| 21 | The colour-field error says what is wrong but not how to fix it: "The browser can't read this as a colour." | `/tools`. `ContrastChecker.tsx` 145 | Minor | SHOULD | "Enter a colour the browser can read, such as #1a1d23, rgb(26 29 35) or oklch(0.23 0.01 260)." |
| 22 | No control has a pressed state (`grep ':active'` finds nothing), and hover fills aren't wrapped in `@media (hover: hover)`. After a tap on iOS, Copy keeps its grey `--muted` hover fill and looks disabled once its label goes back to "Copy". The same sticky hover keeps finding 1's failing pair on screen. | all routes. `globals.css` `.cmd button:hover`, `.button:hover`, `.loupe-list button:hover` | Minor | SHOULD | Wrap hover rules in `@media (hover: hover)`. Add `:active` fills: `--muted` for buttons, `--sheet` for list rows. |
| 23 | There are no increased-contrast variants. Nothing responds to `prefers-contrast: more` (screenshots identical). The frame structure rests on very low ratios:<br>• `--hair` against `--paper`: 1.30:1<br>• `--hair` against `--sheet`: 1.54:1<br>• dark `--sheet` against `--paper`: **1.08:1**<br>In the darkroom theme, the "lit frames" barely separate from the page. | `globals.css` 7-56; `shots/home-1440-dark.png`, `*-morecontrast.png` | Minor | SHOULD | Under `@media (prefers-contrast: more)`, set `--hair: var(--rule)` and `--muted: var(--ink)` in both schemes. Lift dark `--sheet` towards oklch(0.25 0.01 40) so frames read as lit. Add an "Increased contrast" column to `/specimen`'s colour roles. |
| 24 | Mono text is shrunk with `em` multipliers that compound with the parent size: `code` 0.9em, `.m` 0.92em, `.quoted code` 0.85em. That produces off-scale sizes (13.5, 15.64, 12.75) and **11.7 px** for `th code` on `/specimen`, below the 12 px floor. type-eval measures the same x-height (0.743) for Next and Mono, so the shrink compensates for nothing. | `globals.css` 155-170, 489, 812; `/specimen` colour-roles table | Minor | SHOULD | Set `code, kbd, pre, .mono, .m { font-size: 1em }`. Give the fixed mono roles (eyebrow, `th`, tag, `dt`) rem values from one short list. |
| 25 | The h1 is set at line-height 0.98 with −0.035em tracking, across three lines at 390 and at 1440. The descender of "design" nearly touches "shows". The tight tracking closes the open counters Atkinson Hyperlegible relies on. | all h1. `globals.css` 97-101; `shots/b-h1-390.png` | Minor | SHOULD | `line-height: 1.04; letter-spacing: -0.02em`. Re-check the 390 wrap. |
| 26 | Spelling and brand casing are mixed:<br>• "catalog" on `/method` and `/specimen`.<br>• "viewing-booth gray" (the Note column, read from the `globals.css` comments) two sections after "viewing-booth grey" on the same page.<br>• "color" in the quoted rules.<br>• "loupe" is lower case everywhere except "Loupe is an independent project" in the footer disclaimer, and `alternateName` "Loupe design review". | `/specimen`, `/method`, footer. `globals.css` 3, 8; `lib/site.ts` 17, 75 | Minor | SHOULD | Use "catalogue" in prose and "grey" in the token comments. Pick one rule for the brand at sentence start (the site uses "loupe") and apply it in `lib/site.ts` and SKILL.md. |
| 27 | The primary nav has six sections plus GitHub. At 390 px it wraps to two rows and takes 192 px of the first 844 px. Three destinations hold the same evidence under different names: Cases Frame 04 is `/specimen#review-h`, `/testing` and `/cases` index the same nine pairs, and GitHub is an external link mixed into section navigation. | all routes. `lib/site.ts` 23-30; `Nav.tsx` 19-21; `shots/home-390-fold.png` | Minor | Research | Drop GitHub from the nav, since the footer has it. See Enhancement 1 for merging Cases into Testing. Then five items fit one row at 390. Verify. |
| 28 | The loupe list is a single selection built from `aria-pressed` toggle buttons. Exactly one is always pressed, and pressing it again does nothing. Screen readers announce independent toggles, not one choice driving one panel. The live detail announces the impact, the Apple tag and the evidence, but not the finding's title. | `components/Loupe.tsx` 74-90 | Minor | Research | Use the tabs pattern (`tablist`, `tab` with `aria-selected` and `aria-controls`, `tabpanel` on `.loupe-detail`, arrow keys) or native radios. Put the finding title in the detail. |
| 29 | The ring moves by transitioning `left` and `top`, which are layout properties, so each frame of the 360 ms move re-lays out a 168 px circle. `background-position` eases, but `background-size` snaps, so while the window is resized the magnified area shows the wrong region for 360 ms. The new `.loupe-sheet` correctly animates `transform`. | `globals.css` `.loupe-ring`; `Loupe.tsx` 59-68 | Minor | Research | Move the ring with `transform: translate()`, and the magnified image as a transformed `<img>` inside it. Transition `transform` only, and don't animate on resize. |
| 30 | In forced colours the ring's crosshair disappears. `.loupe-cross` is drawn with `linear-gradient` backgrounds, which forced colours removes; the ring's `url()` image survives, so the ring magnifies but no longer marks the point. | `globals.css` `.loupe-cross` | Minor | Research | Draw the cross as inline SVG, as `RingMark` already is, and set `stroke: CanvasText` under `forced-colors`. |
| 31 | The bookmarklet panel takes over keyboard handling on the host page. After Escape, focus lands on `<body>`, not on what had focus before. The Escape listener sits on `window` in the capture phase, so Escape also closes the panel while focus is in the host page's own dialog or menu. | `bookmarklet/panel.js` 29, 44-49 | Minor | Research | Store `document.activeElement` before `panel.focus()` and restore it in `close()`. Handle Escape only when `e.composedPath()` includes the host. |
| 32 | The home page's "Eight steps" (00 Profile … 07 Fix) don't match the skill's own steps (0 Scope, 1 Profile, 1b Landscape, 2 Intake, 3 Stress, 4 Passes, 5 Split, 6 Report, 7 Offer):<br>• Scope is missing, so most numbers are off by one.<br>• "05 Red team" duplicates a pass inside 04.<br>• "Measure … in the running app at three widths" and "large Dynamic Type" describe only one platform each, yet the lede claims iOS, iPadOS, macOS and web. | `/`. `app/page.tsx` 8-17; `lib/llms.ts` 7 | Minor | Taste | Use the skill's numbering, or drop the numbers. "Measure: on the web, contrast, targets, type and motion at three widths, light and dark, with reduced motion on and off; on iOS and macOS, the source and the simulator in light, dark and large text." |
| 33 | `/specimen`'s "eight principles" and "Space" sections make claims the site doesn't meet:<br>• "Layouts that reflow from 320 pixels": finding 2.<br>• "The browser's own focus": the site draws its own 2 px outline.<br>• "Every claim links to the file behind it": the FAQ and the home steps have no links.<br>• "Every gap on the site is one of these nine": `.tag` uses 0.1em/0.45em, list indents use 1.25em, the colour input uses 2px. | `app/specimen/page.tsx` 35-39, 182 | Minor | Taste | Fix finding 2, then keep the first claim. "…a plain 2-pixel focus outline in the text colour…". "Every gap between elements is one of these nine; tag padding and list indents are in em so they follow the text." |
| 34 | `/specimen` makes an unsourced landscape claim: "Developer-tool sites in 2026 lean on dark gradients, glowing borders, bento grids and Inter or Geist." The skill requires a URL and date for every landscape claim. | `app/specimen/page.tsx` 95-97 | Minor | Taste | Name and link the sites checked, with the month: "Of the developer-tool sites we looked at in October 2026 ([links]), …". |
| 35 | FAQ answers contradict the skill and the home page:<br>• "Does it change my code? Not until you ask" sits beside home step 00, which says it "saves a .loupe.md". SKILL.md says the confirmed `.loupe.md` is the one file written before step 7.<br>• The rework answer says "several findings with one shared root cause"; red-team.md says three or more. | `/faq`. `lib/faqs.ts` 16, 24 | Minor | Taste | "Not until you ask. Before then the only file it writes is .loupe.md, the project profile, and only after you confirm it. It changes nothing else until you pick findings by number." "…three or more findings with one root cause that row-by-row fixes can't remove…" |
| 36 | Claims about the blind round overstate the evidence. "Written … by a separate model that never saw loupe's rules" (home specimen intro, the Lendwell case summary) is stronger than the pre-registration, which says the authors were *told not to read* the repository. The `/cases` lede says "Each case is a fixture from the blind round", but Frame 04 (this site) isn't one. | `app/page.tsx` 41; `lib/cases.ts` 22; `app/cases/page.tsx` 19-21 | Minor | Taste | "…by a separate model that was told not to read loupe's rules." "The first three cases are fixtures from the blind round … The fourth is loupe's review of this site." |
| 37 | `/tools` says "Some sites block bookmarklets with a Content Security Policy; the panel says so when that happens." No such message exists. `panel.js` has no CSP handling, and `lib/bookmarklet.ts` 18 only `alert`s when measure.js throws. If a CSP blocks the `javascript:` URL, nothing runs at all. | `/tools`. `app/tools/page.tsx` 54-55 | Minor | Taste | "Some sites block bookmarklets with a Content Security Policy. If nothing happens when you click it, that's the likely reason; the browser console will show the block." |
| 38 | +5 polish:<br>• Hovering a nav link draws the same 2 px underline as `aria-current` (`globals.css` 258-263).<br>• `font-variant-numeric: tabular-nums` is set on `body` and spreads to prose (`globals.css` 83).<br>• The loupe stage, the one thing actually under inspection, has no crop marks, while explanatory cards do.<br>• The case pages' JSON-LD breadcrumb skips the Cases level (`app/cases/[slug]/page.tsx` 63).<br>• The 404 lede "The address may have changed" blames the visitor; the 404s seen in this review came from the site's own links. | various | Polish | SHOULD / Research / Taste | Hover: 1 px `--rule` underline. Remove line 83. `.loupe-stage` gets the frame's corner marks. Breadcrumb: loupe › Cases › {title}. 404: "There's no page at this address. Go to the [home page] or the [cases]." |

waived: 0

## 3. Trust

No deceptive patterns found in what was seen. Checks that came up empty:
- There is no sign-up, paywall, consent or cookie flow, and no urgency, scarcity or confirmshaming.
- There are no testimonials, user counts or ratings.
- The counts in copy match their sources. "Ten defects … five more" and "eight … six more" match the pre-registration. "Twelve combinations" is 3 widths × 2 schemes × 2 motion settings.

The overstatements in findings 16, 36 and 37 are accuracy defects, not dark patterns. On this site they still cost trust, which is why R1 exists.

## 4. Landscape

Category: the marketing and documentation site for a Claude Code design-review skill. It uses the developer-tools seed playbook and overlaps with evidence and trust pages for AI features. All pages were checked on 2026-10-26.

| Product | Why it was studied | URL |
|---|---|---|
| Impeccable | Category leader. An open-source design and anti-slop skill, and the most direct competitor. | https://impeccable.style (+ /slop, /gallery) |
| skills.sh | The directory `npx skills add` users come from. Shows install counts and third-party audits. | https://skills.sh, https://skills.sh/audits |
| Polypane | Accessibility tool. Its contrast checker sits next to loupe's Tools page. | https://polypane.app/color-contrast/ |
| Stripe Docs | Praised developer docs that now treat agents as readers. | https://docs.stripe.com/payments/quickstart |
| Claude Code docs | The canonical skills documentation this audience reads. | https://code.claude.com/docs/en/skills |
| HAL (Princeton) | Adjacent exemplar: an evaluation site built so sceptics can check claims. | https://hal.cs.princeton.edu/ |

**Conventions to keep**
- An install command with one-click Copy in the first viewport, plus variants per method (Impeccable, skills.sh). loupe already matches this in 1 tap, against Impeccable's 2.
- Something to try without installing (Impeccable's sample interface, Polypane's checker).
- A way to run it on a live page without the agent (Impeccable's `detect` and extension; loupe's bookmarklet is the same move).
- `llms.txt` and `.md` siblings (Claude Code docs).
- A dated changelog.
- A contrast tool that handles opacity and suggests a passing colour (Polypane).

**Convergence to avoid**
- Testimonial walls and star or install counts as the main proof (Impeccable, skills.sh).
- Curated, undated before/after wins (Impeccable gallery).
- Identity collision. Impeccable ships achromatic grey "paper", a dark "instrument" surface, one saturated accent and a mono face. loupe's grey, single redline and Mono sit close. loupe's difference has to come from mechanisms: the redline only on measured values (finding 14), crop-marked frames, and the ring.
- "Anti-slop" as the headline vocabulary.

**Frontier moves**
- An interactive demo on the first screen, 1 click (Impeccable).
- Finding overlays on the element itself (Impeccable /slop).
- Cost and submitter beside every score, raw traces, and public correction notes (HAL).
- Per-skill third-party security audits (skills.sh/audits).

**Openings** (no studied peer does these)
- A pre-registration with sealed key hashes that a sceptic can check.
- Losses shown as first-class rows.
- Every rule linking to the Apple passage it rests on.
- Every number on the site measured and redlined.
- A tool's own review of its own site. (No peer was found doing this; Impeccable's self-audit was searched for and not found.)

**Step counts**
- Land → copy the install command: loupe 1 tap, Impeccable 2.
- Land → try without installing: loupe 2 (Home → Tools; on phones only the contrast checker works), Impeccable 1.
- Sceptic compares one pair of reports: loupe 3 taps plus about 25 screens at 390 px (finding 4). No studied peer has a sourced count for this task.

## 5. Distinctiveness verdict

**Authored.** Two weaknesses: finding 14 erodes the redline rule, and the palette sits close to the category leader's.

**Channels**

| Channel | Classification | Evidence |
|---|---|---|
| Type | Authored | Atkinson Hyperlegible, traced to "a tool that measures legibility is set in a face drawn for it" (`layout.tsx` 10-11). type-eval confirms the confusable pairs it claims separate. |
| Layout idiom | Authored | Lit frames with crop marks, and case cards labelled "Frame 01–04" as on a contact sheet. |
| Motion | Authored | The ring and the panning sheet are the one 360 ms expressive move; everything else is 120 ms. |
| Colour use | Authored rule, leaking | The redline is reserved for measured values, but breaks that rule in eight places (finding 14). |
| Shape | Partly trend | Zero radius and hairlines match the "broadsheet hairlines" second-layer default. The crop marks are the authored part. |
| Iconography | Minimal | One drawn mark, RingMark. |
| Imagery | Authored | Real screenshots under the loupe. |
| Sound and haptics | n/a | Web. |
| Voice | Authored | Plain, measured, en-GB. "Nothing under the loupe here" is the one voiced moment, and it sits on an error page. |

**Signature and moments**
- Signature element: the loupe ring. It repeats in the wordmark, the favicon (`app/icon.svg`) and the home specimen.
- Signature moments: one, the ring settling on a finding. Under reduced motion it jumps.

**Slop-catalog tells** (5 tells across 4 channels, under the cluster threshold)
- AI-template: a tracked uppercase mono eyebrow above every section heading (layout idiom).
- AI-template: mono used for non-code labels such as eyebrows, frame labels, `th`, `dt` and tags (type).
- AI-template: a version string with a middle dot in the hero, "A Claude Code skill · v1.0.0" (voice).
- Second-layer default: a near-black ground with one vermilion or orange accent (dark mode), plus zero-radius hairlines (colour, shape).
- Praised-product clone: orange accent, mono caps labels, spec-sheet tables. This one is excused only while the accent's mapping holds, and finding 14 shows it does not hold fully.

**Brand tests**
- Logo-off: "crop-marked white frames on grey, red mono numerals that are measurements, a magnifier ring over a screenshot". Something is owned.
- Competitor swap (Impeccable's name on the home page): the crop marks and ring look wrong on it. The grey, the single accent and the mono labels would not.

## 6. Type

**Atkinson Hyperlegible Next** (variable 200–800). Roles: UI, reading and display.
- **Legibility: pass.**
  - x-height ratio 0.743.
  - No confusable pair fails at 12, 13, 15 or 17 px. The lowest is 5/S at d 0.27, 7 px, at 12 px. I/l is ≥0.62 and 0/O ≥0.36.
  - The zero is slashed.
- **Weights in use:** 400, 600, 700, 800.
- **Figures:** tabular figures are available and forced on site-wide by `body` (finding 38).
- **Coverage:** Latin and Latin Extended, enough for en-GB.
- **Delivery:** next/font, self-hosted WOFF2 subsets, `font-display: swap`. Three files, 51 KB decoded.
- **Scaling:** rem plus clamp. It overflows at 200% only through the h1 (finding 8).
- **Distinctiveness:** not a default-tier face. The choice is traced to the subject.
- **Verdict: Tune.**
  - Ease the h1 to line-height 1.04 and −0.02em tracking (finding 25).
  - Remove the body-wide `tabular-nums`.

**Atkinson Hyperlegible Mono** (variable 200–800). Roles: code, measured values, eyebrows, table headers, tags.
- **Legibility: pass.** type-eval flagged three pairs, and each was checked by eye at 1x and magnified:
  - 0/O: d 0.23 at 12 and 15 px.
  - 5/S: d 0.22 at 12 px.
  - Result: the zero's inner stroke and the flat top of 5 separate them at 12 px. I/l/1 are distinct at every size.
- **Figures:** tabular by default. Distinct zero: yes.
- **Coverage:** `layout.tsx` requests the `latin` subset only. A code path with diacritics would fall back to `ui-monospace`.
- **Scaling:** em multipliers of 0.85–0.92 create off-scale sizes, including 11.7 px (finding 24).
- **Verdict: Tune.**
  - Set Mono at 1em; the x-heights already match.
  - Add `latin-ext` if code samples can carry names.

## 7. Reworks

**R1. Derive or build-check every claim the site makes about the skill and about itself, instead of paraphrasing it by hand.**

- **What changes.**
  - *Before:* the home Blocker definition, the step list, the FAQ answers, the `/specimen` principles and the "every pair" list are hand-written paraphrases of SKILL.md, red-team.md, the pre-registration and `globals.css`. Nothing checks them.
  - *After:*
    - The Blocker definition and step list are read from SKILL.md through the existing `readRepo` and `section()` in `lib/md.ts`, which `/method` already uses.
    - The contrast pairs are generated from the CSS rules that pair a text colour with a background, hover and pressed states included.
    - Each factual or behavioural claim on `/specimen`, `/faq` and `/tools` either gets a build assertion or is cut.
- **Bar: Cluster.** Rows 15, 16, 32, 33, 35, 36 and 37 share one stated root cause: a hand-written restatement of a source the repo already holds, with nothing checking it against that source. Fixing each row corrects today's text but leaves the cause, so the drift returns with the next SKILL.md, token or eval change. Seven rows have drifted already, before launch.
- **Evidence.**
  - Rows 15, 16, 32, 33, 35, 36 and 37.
  - Finding 1 is the cost when a check is missing: the uncovered pair is the one that fails.
- **Cost.**
  - Files: `app/page.tsx`, `lib/faqs.ts`, `app/specimen/page.tsx`, `lib/tokens.ts`, the `/cases` lede, and one build-time check script.
  - Low migration risk. There is no visual change.
- **Unlocks.**
  - The site's thesis, "shows its measurements", cannot drift from the tool it sells. That is the exhibition goal in the profile.
  - Later copy edits get cheaper, because a wrong claim fails the build instead of waiting for a reader to find it.
- **Smallest experiment.**
  - List every factual sentence on `/`, `/specimen`, `/faq` and `/tools` beside its source, and count the disagreements after rows 15, 16, 33 and 35 are fixed by hand.
  - If two or fewer remain, downgrade R1 to per-row fixes plus a single contrast-pairs generator.

No other rework is warranted:
- **Premise:** holds. The first viewport says what loupe is and gives the install command in 1 tap.
- **Peer gap:** has no sourced peer count.
- **Identity:** the verdict is not `default-assembled`.
- **Mobile overflow rows** (2, 8, 11): each has its own cause and its own one-line fix.

## 8. Enhancements

**Information architecture**
1. **Fold Cases into Testing.** *(Simplicity)*
   - `/testing` already lists every pair and links to the reports.
   - Make `/cases/[slug]` the detail pages under it, drop Cases from the nav, and remove Cases Frame 04, which duplicates `/specimen#review-h`.
   - Each object (a pair, a report, the site's own review) then has one name and one place.
   - Together with removing GitHub (finding 27), the nav fits one row at 390.

**Experience and flows**

2. **Try it in one tap from the home specimen.** *(Agency)*
   - The landscape gap is Impeccable's 1-click demo against loupe's 2 steps, and the bookmarklet can't be used on phones.
   - Serve the Lendwell fixture as a static page with the measurement panel already open, linked under the specimen: "Run the checks on this page yourself".
3. **Check the seal in the browser.** *(Responsibility)*
   - Today a sceptic has to clone the repository and run `shasum` to check the pre-registered key hashes.
   - Add a button on `/testing` that fetches each published key file, computes SHA-256 with Web Crypto, and shows the hash and the match per fixture.
   - This uses an opening no studied peer has.
4. **Status on the dogfood review.** *(Responsibility)*
   - Each finding in `/specimen#review-h` carries fixed, open or waived, with the commit that fixed it.
   - Open ones stay visible, as the losses do on `/testing`.
   - This is the exhibition goal made checkable, and no studied peer was found publishing a review of its own site.

**Content and voice**

5. **The contrast checker proposes the nearest passing colour.** *(Agency)*
   - Polypane does this (landscape). loupe's own Fix lines already speak in that form.
   - Search OKLCH lightness at fixed hue and chroma until the pair passes, then print "#4f535a passes body text at 6.21 to 1" with the value in the redline, because it is measured.

**Brand and identity**

6. **Share images that carry a measured value.** *(Purpose)*
   - Visitors arrive from social links, and every number the site shows is a measurement.
   - Generate a build-time `opengraph-image` per case and for `/testing`, showing one measured finding with its redlined ratio inside the ring, instead of the single site-wide `og.png`.
   - Do this after finding 17.

Six, not eight. Each one is tied to a specific gap in the landscape or the profile; I dropped two candidates that would fit any docs site.

## 9. Unverified

- **Screen readers:** no real screen reader (VoiceOver, NVDA, JAWS) or Voice Control was run. Announcements in findings 6, 7, 12 and 28 are inferred from the Playwright aria snapshot and the ARIA spec.
- **Forced colours:** Chromium emulation only, not Windows High Contrast (findings 5, 30).
- **Sticky hover on touch** (finding 22): inferred from CSS and known iOS behaviour, not seen on a device.
- **Bookmarklet acceptance:** whether a 37 KB `javascript:` bookmark is accepted and editable in Safari, iOS Safari and Firefox was not tested.
- **CSP behaviour:** what a CSP-protected page actually does when the bookmarklet runs was not tested (finding 37).
- **Case pages, horizontal scroll:** at 390, `.report-frame` scrolls sideways (356 px of 2,060) and reports `tabIndex -1`. Whether Chromium's keyboard-focusable scrollers make it reachable by keyboard was not checked. Reaching it with Tab and the arrow keys would settle it.
- **Sampled runs:** the case pages hit the measurement runner's 400-item cap, so their contrast and target results are sampled.
- **Blind-round content:** the results on `/testing` and in the case reports were deliberately not read, at the owner's request. Their copy, tables and accuracy are unreviewed; only structure, layout and measurements were checked.
- **Loupe misregistration on resize** (finding 29): from source, not recorded frame by frame.
- **Text spacing (WCAG 1.4.12):** not run on `/testing` or the case pages. It was run on `/`, `/faq` and `/tools`, and nothing clipped.
- **Reflow on new pages:** `/testing` and the filled case pages were measured at 320 and at 200% text, but not in dark mode with forced colours.
- **Fonts:** whether next/font emits metric-matched fallbacks (`size-adjust`) was not checked, so layout shift on font swap is unmeasured.
- **Source after the reviewed export:** edits after the 21:17 export (for example, `globals.css` now uses `--sheet` for the loupe-list hover) are not reviewed. Re-run the measurement on the next export.
- **Error, offline and loading states:** a static export with no API. The only runtime network action is the clipboard, which was tested (finding 6). The bookmarklet's failure `alert` was read in source, not triggered.

## 10. Offer

Fixable in code now, no design decision needed:
- **One-line CSS:** 2 and 8 (wrap inline code; page-head grid; h1 cap), 13 (FAQ marker), 22 (hover gating and `:active`), 24 (mono at 1em), 25 (h1 leading), 30 (crosshair as SVG).
- **Contrast and tokens:** 1, 16 (hover ground, plus pairs added to the build check), 23 (`prefers-contrast` variants).
- **Metadata:** 3 (404 title), 17 (per-route Open Graph), and the breadcrumb in 38.
- **Component fixes:**
  - 5: forced-colours focus.
  - 6: Copy names and failure state.
  - 7: live region.
  - 12: heading demotion in `lib/md.ts`.
  - 28: tabs semantics.
  - 29: ring on `transform`.
  - 31: panel focus and Escape.
- **Copy rewrites:** 15, 19, 20, 21, 26, 32, 33, 34, 35, 36, 37, and the 404 line in 38.

These need a design decision first:
- 4: pair layout on case pages.
- 9: copy path for the bookmarklet.
- 10: how much of the rules to quote in the open.
- 11: stacked or wrapped install commands.
- 14: where the redline may appear.
- 18: secondary button style.
- 27: nav membership.

Enhancements and the rework need your call. I can build any enhancement, or a throwaway prototype of R1's smallest experiment: a claims-versus-sources table for `/`, `/specimen`, `/faq` and `/tools`.

Which findings should I fix?

Optional input that would let the review verify more:
- a run with VoiceOver or NVDA on `/` and `/tools`
- a Windows machine with High Contrast on
- an iPhone to check the sticky-hover and bookmarklet claims
- the next export, so edits made after 21:17 can be measured
