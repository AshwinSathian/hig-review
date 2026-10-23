# hig-review Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship hig-review, a Claude Code skill and plugin that reviews UI/UX (screen, flow, whole app, or design system) on iOS, iPadOS, macOS and web, grounded in Apple's HIG and augmented by other literature, and that reports, proposes elevation moves, and offers fixes.

**Architecture:** A model-driven skill. `SKILL.md` holds the workflow (profile, intake, stress states, passes, report). Knowledge lives in reference files loaded per pass, rebuilt from the research digests. One deterministic script, `scripts/measure.js`, runs inside a page through Playwright and returns measurements (contrast, target sizes, type, motion and default-library tells) so those checks are measured, not guessed. `tools/` re-crawls the HIG and diffs it for refreshes.

**Tech Stack:** Markdown; Node 24 with `node:test` and `playwright` (dev dependency, Chromium already cached locally) for the measurement script; Python 3 stdlib for the crawl tools; Claude Code plugin manifest.

**Spec:** `docs/specs/2026-10-23-hig-review-design.md`

## Global Constraints

- Repo: `~/Documents/Personal/hig-review`, private GitHub repo `AshwinSathian/hig-review`, installable as a plugin. Layout mirrors `humanize-writing-skill`: `SKILL.md` at the repo root, `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json` with `"source": "."`, symlink `~/.claude/skills/hig-review -> ~/Documents/Personal/hig-review`. (This replaces the spec's `skills/hig-review/` layout to match the user's existing plugin.)
- Apple HIG and Apple literature are the core. Other sources only augment: each augment item is labelled "adds to Apple", "Apple silent", or "CONFLICT".
- Apple strength tags: MUST = Apple writes must/never/always/don't, or App Review enforces it; SHOULD = avoid/prefer/use/important/crucial/essential and plain imperatives; CONSIDER = consider/can/may/if appropriate. Extra tags: Taste (our anti-slop rules), Web (our translation of an Apple rule).
- Impact tags: Blocker (task fails, data loss, accessibility failure, App Review rejection risk, deceptive design) / Major / Minor / Polish.
- Conflict policy: native Apple target, Apple wins on platform conventions; web, Apple's principle is the default and research may sharpen it, with conflicts shown; brand, split by surface (Apple wins in task flows; brand may win on display-only surfaces if accessibility passes); accessibility, strictest source wins.
- Current HIG principles: Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight.
- Web mapping: targets 44 px goal / 24 px minimum; 48 for shared cross-platform code; body 16 px minimum on mobile web; WCAG 2 ratios are the pass/fail floor (4.5:1 body, 3:1 large and non-text), APCA is an extra check; min text 11 pt native iOS, 12 px desktop and web; SF Pro and SF Symbols flagged on web.
- No raw HIG text is committed. Digests (paraphrase) are.
- The skill never prescribes a house style, palette, font list, or motion preset. "Make it feel like X" translates to mechanism, never look.
- All human-facing prose in the repo (README, SKILL.md, references) follows the humanizing-writing rules.

## Review Focus

1. A single static screenshot with no code: the skill must still produce specific findings and an "Unverified" list, not demand inputs it can't get. Pinned in Task 7 (eval case B).
2. A page whose text sits on a background image or gradient: `measure.js` cannot compute contrast and must report it as `unmeasurable`, never as a pass. Pinned in Task 3.
3. A project with no brand docs and no profile: first run must ask only what it can't infer and must propose 2 to 3 directions instead of judging distinctiveness against nothing. Pinned in Task 7 (eval case C).
4. A native-only repo (SwiftUI, no browser): the skill must not try to run Playwright; it uses source plus simulator screenshots when available. Pinned in Task 6 (SKILL.md intake table) and Task 7 (eval case D).
5. Huge DOMs (data tables with thousands of cells): `measure.js` must cap work and say it sampled. Pinned in Task 3.

---

## File Structure

```
hig-review/
  .claude-plugin/plugin.json          plugin manifest
  .claude-plugin/marketplace.json     self-hosted marketplace, source "."
  SKILL.md                            the workflow (target under 500 lines)
  README.md                           what it is, install, refresh
  LICENSE                             MIT, matching the user's other plugin
  references/
    apple/principles-platforms.md     from digest 01
    apple/visual.md                   from digest 02
    apple/content-a11y.md             from digest 03 minus its Writing section
    apple/patterns.md                 from digest 04
    apple/components-structure.md     from digest 05
    apple/components-presentation.md  from digest 06
    apple/inputs-tech.md              from digest 07
    apple/beyond-hig.md               from digest 08
    augment/platform-systems.md       from beyond/09
    augment/product-gov-systems.md    from beyond/10
    augment/ux-research.md            from beyond/11
    augment/craft.md                  from beyond/12
    augment/distinctiveness.md        from beyond/13 (procedure only; catalog moves out)
    augment/a11y-cognition-ethics-i18n.md  from beyond/14
    writing.md                        beyond/15 + digest 03 Writing + humanizing-writing UI subset
    slop-catalog.md                   dated; all slop/convergence tells, one place
    web-mapping.md                    the fixed web translation rules
    profile-template.md               .hig-review.md schema with comments
    report-template.md                report layout
  scripts/measure.js                  in-page measurement, returns JSON
  test/measure.test.mjs               node:test + playwright
  test/fixtures/*.html                pages with known properties
  evals/                              eval cases and recorded results
  research/digests/                   the 15 source digests, as written by the research pass
  tools/crawl.sh                      re-crawl HIG JSON into a dated folder outside the repo
  tools/docc2md.py                    DocC JSON to markdown (existing script)
  tools/diff_snapshot.py              list pages changed between two crawls
  tools/check_numbers.py              assert numbers in a digest survive into its reference file
  tools/test_tools.py                 self-checks for the python tools
  package.json                        devDependency playwright; "test" script
  docs/specs/  docs/plans/
```

Scratch source paths (read-only inputs for Tasks 2, 4, 5):
`/private/tmp/claude-501/-Users-ashwinsathian-Documents-Personal/f2e4950e-a6cc-446d-b370-62778b00c5f4/scratchpad/hig/digest/` (01 to 08) and `.../digest/beyond/` (09 to 15), plus `.../scratchpad/tools/docc2md.py`.

---

### Task 1: Repo, plugin manifest, research digests, python tools

**Files:**
- Create: `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `README.md` (stub: one paragraph + install), `LICENSE`, `.gitignore` (`node_modules/`, `.hig-snapshots/`), `research/digests/*.md` (copies of 01–08 and beyond/09–15, same names), `tools/docc2md.py` (copy of scratch script), `tools/crawl.sh`, `tools/diff_snapshot.py`, `tools/check_numbers.py`, `tools/test_tools.py`

**Interfaces:**
- Produces: `python3 tools/check_numbers.py <digest.md> <reference.md> [--allow <file>]` exits 0 when every number-with-unit token in the digest appears in the reference (or in the allow file), else exits 1 and prints the missing tokens. Token regex: `\d+(?:[.,]\d+)?(?:\s?(?:pt|px|dp|ms|s|%|:1|em|ch|rem|x|×|Hz|fps|characters|chars))?` normalised by stripping spaces; bare integers under 10 are ignored.
- Produces: `bash tools/crawl.sh <out_dir>` fetches the HIG index and every page JSON into `<out_dir>/raw` and converts into `<out_dir>/md`.
- Produces: `python3 tools/diff_snapshot.py <old_md_dir> <new_md_dir>` prints `added`, `removed`, `changed` slugs.

- [ ] **Step 1: Write failing self-checks in `tools/test_tools.py`**

```python
def test_check_numbers_flags_missing(tmp): # digest "44x44 pt and 4.5:1", reference "44x44 pt" -> exit 1, prints "4.5:1"
def test_check_numbers_passes_when_present(tmp): # same numbers in both -> exit 0
def test_check_numbers_ignores_small_bare_ints(tmp): # digest "step 3" -> exit 0 against empty reference
def test_docc2md_paragraph_and_list(tmp): # minimal DocC JSON with abstract, heading, paragraph, unorderedList -> md contains "# Title", "## H", "- item"
def test_diff_snapshot(tmp): # old {a,b}, new {b',c} -> added [c], removed [a], changed [b]
```
Run with `python3 -I tools/test_tools.py` using a tiny `if __name__ == "__main__"` runner and `tempfile`, no framework.

- [ ] **Step 2: Run, expect failures (modules missing)**

Run: `python3 -I tools/test_tools.py` → Expected: errors on import/missing files.

- [ ] **Step 3: Implement `check_numbers.py`, `diff_snapshot.py`; copy `docc2md.py`; write `crawl.sh`**

`crawl.sh` reproduces the session's crawl: GET `https://developer.apple.com/tutorials/data/index/design--human-interface-guidelines`, walk all `path` values containing `human-interface-guidelines`, fetch `https://developer.apple.com/tutorials/data<path>.json` with retry (3 tries; the original crawl silently lost `writing`), then `python3 -I tools/docc2md.py raw md`. Fail loudly if any page has no JSON after retries.

- [ ] **Step 4: Run self-checks, expect PASS**

Run: `python3 -I tools/test_tools.py` → Expected: `5 passed`.

- [ ] **Step 5: Manifests, README stub, LICENSE, digests; git init; symlink**

plugin.json: name `hig-review`, displayName `HIG Review`, version `0.1.0`, author and repository fields as in humanize-writing-skill's manifest (repository `https://github.com/AshwinSathian/hig-review`), license MIT. marketplace.json mirrors humanize-writing-skill's with this plugin. Then `ln -s ~/Documents/Personal/hig-review ~/.claude/skills/hig-review`.
Verify: `jq . .claude-plugin/*.json` succeeds; `ls ~/.claude/skills/hig-review/docs` lists `specs plans`.

- [ ] **Step 6: Commit**

```bash
git init && git add -A && git commit -m "chore: plugin skeleton, research digests, HIG crawl tools"
```

---

### Task 2: Apple reference files

**Files:**
- Create: `references/apple/*.md` (8 files, mapping in File Structure)
- Create: `tools/allow/<name>.txt` only where a number is dropped on purpose (one line per token with reason)

**Interfaces:**
- Consumes: `tools/check_numbers.py` (Task 1).
- Produces: each file starts with a 3-line header: what it covers, which passes load it, snapshot date `2026-10-23`. Sections keep the digest's per-topic shape: Intent, Checks (each prefixed `[MUST]`/`[SHOULD]`/`[CONSIDER]`), Platform deltas, Web (labelled our translation), Slop tells (labelled ours). Later tasks link to topics by heading text, so headings stay `## <Topic>`.

Reshape rules for each file (this is the decision content of the task):
- Re-tag every check with the Global Constraints strength rule. The digests disagree (01–07 used different thresholds); this task makes them uniform.
- Delete each digest's "Open questions for skill design": the spec settled them. Where an answer changes a check, apply it (for example, web disabled-until-valid becomes the Web line from web-mapping; "we/our" resolved toward writing.md).
- Drop visionOS, watchOS, tvOS detail except principles that transfer to phone, desktop and web (the digests marked these).
- Move digest 03's Writing section out (it goes to `writing.md` in Task 5).
- Mark Liquid Glass checks `(26+)` so the skill can gate them by deployment target.
- Keep every number. Merge duplicates across files into the most specific home and leave a one-line pointer elsewhere.

- [ ] **Step 1: For each of the 8 files, run the number check against its digest; expect FAIL before the file exists**

Run: `python3 -I tools/check_numbers.py research/digests/01-fundamentals-platforms.md references/apple/principles-platforms.md` → Expected: exit 1 (file missing).

- [ ] **Step 2: Write the 8 reference files per the reshape rules**

These files are independent; dispatch one subagent per file with the reshape rules, the Global Constraints, and its digest path.

- [ ] **Step 3: Verify**

Run for each pair: `python3 -I tools/check_numbers.py research/digests/<digest> references/apple/<file> --allow tools/allow/<file>.txt` → Expected: exit 0 for all 8.
Run: `grep -L "Open questions" references/apple/*.md | wc -l` → Expected: `8`.
Run: `grep -c "^\- \[\(MUST\|SHOULD\|CONSIDER\)\]" references/apple/*.md` → Expected: every file > 0; and `grep -rn "^\- \[" references/apple | grep -v "\[\(MUST\|SHOULD\|CONSIDER\)\]" | wc -l` → `0` for check lines.
Run: `grep -c "(26+)" references/apple/visual.md references/apple/components-structure.md` → Expected: > 0 each.

- [ ] **Step 4: Commit**

```bash
git add references/apple tools/allow && git commit -m "feat: Apple reference files, uniform strength tags"
```

---

### Task 3: measure.js

**Files:**
- Create: `scripts/measure.js`, `test/measure.test.mjs`, `test/fixtures/{contrast,targets,type,motion,defaults,image-bg,huge-table}.html`, `package.json`

**Interfaces:**
- Produces: `scripts/measure.js` is a single expression usable by Playwright MCP `browser_evaluate` (its text is `() => { ... return report; }`). It also exports nothing and has no dependencies. Return shape:

```js
{
  viewport: { width, height, dpr },
  sampled: boolean,                 // true when caps hit
  contrast: [{ selector, text, fg, bg, ratio, size, weight, large, pass, status }], // status: "ok"|"fail"|"unmeasurable"
  targets:  [{ selector, role, width, height, under24, under44 }],                   // interactive elements only
  type:     { families: [string], sizes: { "<px>": count }, minSize, distinctSizes, letterSpacingBySize: { "<px>": [values] } },
  motion:   { transitionAll: [selector], reducedMotionRule: boolean, animatedOnLoad: [selector] },
  defaults: [{ tell, evidence }]   // library/trend default tells, see below
}
```

Decisions the implementer can't make alone:
- Contrast: walk ancestors to the first non-transparent `background-color`, alpha-composite over white; if any ancestor on the way has `background-image` not `none`, or the element has `text-shadow`, status `unmeasurable`. Large text = ≥ 24 px, or ≥ 18.66 px and weight ≥ 700. Pass thresholds 4.5 and 3.0. WCAG 2 relative luminance.
- Targets: elements matching `a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=tab], [role=menuitem], [role=checkbox], [role=switch], [tabindex]:not([tabindex="-1"])`, visible, using `getBoundingClientRect()`. Inline links inside a paragraph are skipped (WCAG 2.5.8 inline exception).
- Caps: at most 400 text nodes for contrast and 400 targets; set `sampled: true` when hit.
- `reducedMotionRule`: any `CSSMediaRule` whose `conditionText` contains `prefers-reduced-motion` across readable stylesheets (cross-origin sheets skipped silently).
- `defaults` tells (each `{tell, evidence}`): font stack starts with `Inter` or `Geist`; ≥ 3 computed colors equal to Tailwind's default `slate`/`gray`/`zinc` ramp values (embed the 3 ramps' 500–900 hex values); `cubic-bezier(0.32, 0.72, 0, 1)` in any transition; ≥ 60% of cards (elements with border-radius and box-shadow) sharing `border-radius: 8px` with shadcn's default shadow; `backdrop-filter` on elements inside `main` (glass in the content layer); indigo/violet gradient backgrounds (`linear-gradient` containing hues 230–290°).

- [ ] **Step 1: Write failing tests in `test/measure.test.mjs`**

Each test loads a fixture with `page.setContent`, evaluates the script text, asserts:
```js
test("contrast: #777 on #fff 16px fails, #595959 passes")        // ratios 4.48 -> fail, 7.0 -> pass
test("contrast: text over background-image is unmeasurable")      // status === "unmeasurable"
test("targets: 20x20 button under24, 30x30 under44 only, inline link skipped")
test("type: reports families, minSize 11, distinctSizes 4")
test("motion: transition all flagged; reduced-motion rule detected")
test("defaults: Inter stack and backdrop-filter in main flagged")
test("huge table: 5000 cells -> sampled true, contrast.length <= 400")
```

- [ ] **Step 2: Run tests, expect FAIL**

Run: `npm i && npm test` (`"test": "node --test test/"`) → Expected: failures, script missing.

- [ ] **Step 3: Implement `scripts/measure.js`**

- [ ] **Step 4: Run tests, expect PASS**

Run: `npm test` → Expected: 7 passing.

- [ ] **Step 5: Commit**

```bash
git add scripts test package.json package-lock.json && git commit -m "feat: in-page measurement script with fixtures"
```

---

### Task 4: Augment reference files

**Files:**
- Create: `references/augment/*.md` (6 files, mapping in File Structure)

**Interfaces:**
- Consumes: `tools/check_numbers.py`; heading style from Task 2.
- Produces: same header and per-topic shape as Task 2, plus each check carries one of `adds to Apple` / `Apple silent` / `CONFLICT: <Apple rule> vs <this source>; resolution: <per Global Constraints policy>`.

Reshape rules:
- Every CONFLICT gets its resolution written in, using the conflict policy (the research left them open).
- Mark anything the research marked "(unverified, from memory)" or "(snippet)" as `(unverified)`; the skill weights these lower and never makes them Blockers on their own.
- Move all slop/convergence tells out to Task 5's catalog; leave a pointer line.
- `distinctiveness.md` keeps the procedure and the brand tests; it includes the decisions from the spec (at least two authored channels; one or two signature moments; split by surface; translate "make it feel like X" to mechanism; never ship a style).
- Exclude the installed taste skills' look prescriptions; keep only their process rules as listed in the spec.

- [ ] **Step 1: Number check, expect FAIL before files exist** (as Task 2 Step 1, per pair)
- [ ] **Step 2: Write the 6 files (one subagent per file)**
- [ ] **Step 3: Verify**

Run each pair through `check_numbers.py` → exit 0.
Run: `grep -c "CONFLICT:" references/augment/*.md` and `grep -c "resolution:" references/augment/*.md` → Expected: equal counts per file.
Run: `grep -rn "Open questions" references/augment | wc -l` → `0`.

- [ ] **Step 4: Commit**

```bash
git add references/augment && git commit -m "feat: augment reference files with conflict resolutions"
```

---

### Task 5: Writing, slop catalog, web mapping, templates

**Files:**
- Create: `references/writing.md`, `references/slop-catalog.md`, `references/web-mapping.md`, `references/profile-template.md`, `references/report-template.md`

**Interfaces:**
- Produces: `profile-template.md` defines the `.hig-review.md` front-matter keys the SKILL.md reads: `purpose`, `feeling`, `audience` (`occasional-public` | `daily-professional`, optionally per area), `register` (`utilitarian` | `expressive`), `motion_personality` (`serious..playful`, `relaxed..fast`), `platforms`, `deployment_targets`, `density` (`comfortable` | `dense`), `brand` (typefaces, licensed_fonts, accents, signature_elements), `voice` (traits, `personal_voice_opt_in: false`, spelling `british` | `american`, casing per element type, humor policy, reading_level_target), `direction` (chosen distinctiveness direction or empty), `waivers` (list of `{rule, reason, date}`). Body: free notes.
- Produces: `report-template.md` defines sections in order: Summary (3 lines), Findings table (`# | Finding | Where | Impact | Apple | Fix`), Trust (deceptive design, Blockers only), Distinctiveness verdict (authored / partly authored / default-assembled + evidence), Elevate (3 to 5), Unverified, Offer. Caps: screen 15 findings, flow 25, whole app 40, design system 30; Polish beyond the cap grouped into one row.
- Produces: `slop-catalog.md` header carries `catalog-date: 2026-10-23` and `review-by: 2027-04-23`; sections: AI-template, Apple-clone, Material-clone, shadcn/Tailwind-default, praised-product clone, research-blessed patterns gone generic (with the condition under which each is still fine), AI-microcopy (trendy-generic and robotic). Each entry: tell, how to detect (DOM signal from `measure.js` where one exists, else what to look for), better pattern, source.

Writing.md rules (decisions): merge per beyond/15's message-type grouping; Apple's rules first in each group, then humanizing-writing and others with source tags; resolve conflicts per policy (Apple for native; web defaults to sentence case when the profile is silent); anti-fabrication is the only unconditional MUST; every copy finding must carry a rewrite; long-form in-app prose defers to the humanizing-writing skill if installed. Adapt, don't copy, humanizing-writing's text (keep its rule substance and its tells table at UI scale).

- [ ] **Step 1: Number checks for writing.md (against beyond/15 and digest 03's Writing section), expect FAIL**
- [ ] **Step 2: Write the 5 files**
- [ ] **Step 3: Verify**

Number checks → exit 0.
Run: `grep -c "^catalog-date: 2026-10-23" references/slop-catalog.md` → `1`.
Run: `grep -o "^## [A-Za-z/ -]*" references/slop-catalog.md` → lists the 7 sections above.
Run: every key named in the profile Interfaces block appears in `profile-template.md` (`for k in purpose feeling audience register motion_personality platforms deployment_targets density brand voice direction waivers; do grep -q "^$k:" references/profile-template.md || echo MISSING $k; done` → no output).

- [ ] **Step 4: Commit**

```bash
git add references && git commit -m "feat: writing rules, slop catalog, web mapping, profile and report templates"
```

---

### Task 6: SKILL.md

**Files:**
- Create: `SKILL.md`; Modify: `README.md` (full: what, install via marketplace or symlink, how to run, refresh procedure using tools/)

**Interfaces:**
- Consumes: all reference file paths (Tasks 2, 4, 5); `scripts/measure.js` return shape (Task 3); profile keys (Task 5).

Content decisions:
- Front matter `description` triggers on: UI/UX review, design review, design pass, audit a screen/flow/app/design system, "does this look generic/AI-made", HIG check, before shipping UI. Does not trigger on building new UI from scratch (other skills cover that) unless review is asked.
- Workflow sections, in order: 0 Scope and inputs; 1 Profile (read `.hig-review.md` or bootstrap: infer from repo docs, tokens, manifests; ask only the gaps, in one batch; write the file only after the user confirms); 2 Intake table by input type (web running app: Playwright MCP navigate, screenshots at 390, 820, 1440 px, light and dark via `browser_emulate_media`, reduced motion, 200% text via CSS zoom on root font size, keyboard Tab walk, hover key controls, run `measure.js` via `browser_evaluate` per viewport; native: read source, and if `xcrun simctl list devices booted` shows a device, `simctl io booted screenshot`, `simctl ui booted appearance dark`, `simctl ui booted content_size accessibility-extra-extra-extra-large`; RN/Expo same; screenshots only; design system only); deployment-target detection (Info.plist / project.pbxproj `IPHONEOS_DEPLOYMENT_TARGET`, `MACOSX_DEPLOYMENT_TARGET`, app.json `ios.deploymentTarget`) gating `(26+)` checks; 3 Stress states list; 4 Passes with the reference files each loads (slop scan → slop-catalog; distinctiveness → augment/distinctiveness; structure → apple/components-structure, apple/components-presentation, apple/patterns; visual → apple/visual, augment/craft; interaction and motion → apple/inputs-tech, apple/visual Motion, augment/craft; content → writing.md; accessibility → apple/content-a11y, augment/a11y-cognition-ethics-i18n; platform fit → apple/principles-platforms, apple/inputs-tech, web-mapping; augment/ux-research and augment/product-gov-systems are loaded by any pass on web or forms/data screens); 5 Whole-app split (4 subagents: structure + platform fit; visual + motion; content; accessibility + trust; main thread runs slop scan, distinctiveness, merge, de-dupe, cap); 6 Report per template; 7 Offer fixes, edit only after the user picks findings.
- Rules block: Apple is core; conflict policy; strength and impact tags; every finding names the element and the screen (no finding that would fit any app); unverified sources never make Blockers alone; never prescribe a look; waivers in the profile are skipped and listed as "waived" count.
- Under 500 lines; anything longer lives in references.

- [ ] **Step 1: Write SKILL.md and README.md**
- [ ] **Step 2: Verify**

Run: `wc -l SKILL.md` → under 500.
Run: every `references/...` and `scripts/...` path mentioned in SKILL.md exists: `grep -o "references/[a-z/-]*\.md\|scripts/[a-z.]*" SKILL.md | sort -u | xargs -I{} test -f {} && echo ok` → `ok`, no errors.
Run: humanizing-writing pass over README.md and SKILL.md prose (invoke the skill, apply its edits).

- [ ] **Step 3: Commit**

```bash
git add SKILL.md README.md && git commit -m "feat: hig-review workflow"
```

---

### Task 7: Evals (skill TDD) and fixes

**Files:**
- Create: `evals/fixtures/sloppy-app/index.html` (a deliberately generic page: centered hero with indigo gradient, three feature cards, Inter, glass cards in content, "Oops! Something went wrong", ✨ "Generate" button, Submit button, placeholder-only labels, 20px icon buttons, toast on save, skeleton for an instant load), `evals/cases.md`, `evals/results/2026-10-23.md`

**Interfaces:**
- Consumes: the finished skill.

Cases (each run in a fresh subagent; baseline first without the skill, then with it):
- A: whole-page review of `sloppy-app` served with `python3 -m http.server`, via Playwright. Pass: catches ≥ 80% of the 10 planted problems with specific locations; distinctiveness verdict "default-assembled"; zero findings a reviewer would call generic; Elevate ideas tied to the page's subject, none matching the slop catalog.
- B: one screenshot of `sloppy-app` only. Pass: findings plus an Unverified list naming states and behaviours it could not check; no request for code.
- C: no profile, no brand docs. Pass: asks only the gaps in one batch; proposes 2 to 3 directions that differ on ≥ 2 channels.
- D: a 2-file SwiftUI snippet set in `evals/fixtures/swiftui/` with a hard-coded `.foregroundColor(.gray)` on `.background(.ultraThinMaterial)` list rows and a custom tab bar with a "+" tab. Pass: no Playwright attempt; flags glass in content, the action tab, and the hard-coded color; gates Liquid Glass checks on the target read from the fixture.

- [ ] **Step 1: Run baselines (without skill), record in results**
- [ ] **Step 2: Run with skill, record**
- [ ] **Step 3: Fix the skill for every failed pass condition; rerun the failed cases**
- [ ] **Step 4: Commit**

```bash
git add evals SKILL.md references && git commit -m "test: eval cases and fixes"
```

---

### Task 8: Publish

- [ ] **Step 1:** `gh repo create AshwinSathian/hig-review --private --source . --push`
- [ ] **Step 2:** Verify: `gh repo view AshwinSathian/hig-review --json visibility -q .visibility` → `PRIVATE`.
- [ ] **Step 3:** In a fresh Claude Code session, confirm the skill lists as `hig-review` (via the symlink).

---

## After this plan: Wayfarer

Not part of this build. Starts only when the user says the Wayfarer repo is clean and in-flight work is merged. It will get its own short plan: profile bootstrap from Wayfarer's docs, whole-app plus design-system review, then amendments rolled into PLAN-design.md (section 14 rows, binary acceptance criteria), and skill fixes from what the review teaches.
