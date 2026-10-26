import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { chromium } from "playwright";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import { mkdtempSync, mkdirSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
// Same text the MCP receives as browser_evaluate `function`.
const src = () => read("../scripts/measure.js");
let browser, page;
before(async () => { browser = await chromium.launch(); page = await browser.newPage(); });
after(() => browser.close());

async function measure(fixture) {
  await page.setContent(read(`./fixtures/${fixture}.html`));
  return page.evaluate(`(${src()})()`);
}
const by = (list, id) => list.find((x) => x.selector.includes(id));

test("contrast: #777 on #fff 16px fails, #595959 passes", async () => {
  const r = await measure("contrast");
  const low = by(r.contrast, "#low"), high = by(r.contrast, "#high");
  assert.equal(low.ratio.toFixed(2), "4.48");
  assert.equal(low.status, "fail");
  assert.equal(low.pass, false);
  assert.equal(high.ratio.toFixed(2), "7.00");
  assert.equal(high.status, "ok");
});

test("contrast: text over background-image is unmeasurable", async () => {
  const r = await measure("image-bg");
  assert.equal(by(r.contrast, "#over").status, "unmeasurable");
});

test("targets: 20x20 button under24, 30x30 under44 only, inline link skipped", async () => {
  const { targets } = await measure("targets");
  assert.deepEqual([by(targets, "#b20").under24, by(targets, "#b20").under44], [true, true]);
  assert.deepEqual([by(targets, "#b30").under24, by(targets, "#b30").under44], [false, true]);
  assert.deepEqual([by(targets, "#b48").under24, by(targets, "#b48").under44], [false, false]);
  assert.equal(by(targets, "#inline"), undefined);
});

test("type: reports families, minSize 11, distinctSizes 4", async () => {
  const { type } = await measure("type");
  assert.deepEqual(type.families, ["Georgia"]);
  assert.equal(type.minSize, 11);
  assert.equal(type.distinctSizes, 4);
  assert.deepEqual(type.letterSpacingBySize["11"], ["0.5px"]);
});

test("motion: transition all flagged; reduced-motion rule detected", async () => {
  const { motion } = await measure("motion");
  assert.equal(motion.transitionAll.length, 1);
  assert.match(motion.transitionAll[0], /#t/);
  assert.equal(motion.reducedMotionRule, true);
  assert.match(motion.animatedOnLoad.join(), /#a/);
});

test("defaults: Inter stack and backdrop-filter in main flagged", async () => {
  const { defaults } = await measure("defaults");
  const tells = defaults.map((d) => d.tell).join("|");
  assert.match(tells, /Inter/);
  assert.match(tells, /backdrop-filter/);
});

test("huge table: 5000 cells -> sampled true, contrast.length <= 400", async () => {
  const r = await measure("huge-table");
  assert.equal(r.sampled, true);
  assert.ok(r.contrast.length <= 400);
});

const tells = (r) => r.defaults.map((d) => `${d.tell} :: ${d.evidence}`).join("\n");

test("contrast: alpha foreground and background composite", async () => {
  const r = await measure("alpha");
  assert.equal(by(r.contrast, "#fga").ratio, 3.98);
  const bg = by(r.contrast, "#bga");
  assert.equal(bg.ratio, 3.98);
  assert.equal(bg.bg, "#808080");
});

test("contrast: large-text threshold (24px, or 18.66px bold)", async () => {
  const { contrast: c } = await measure("large");
  const flags = ["#l24", "#l19b", "#l19r", "#l18b"].map((id) => [by(c, id).large, by(c, id).status]);
  assert.deepEqual(flags, [[true, "ok"], [true, "ok"], [false, "fail"], [false, "fail"]]);
});

test("contrast: text-shadow is unmeasurable", async () => {
  assert.equal(by((await measure("text-shadow")).contrast, "#ts").status, "unmeasurable");
});

test("contrast: oklch and color-mix colours are measured", async () => {
  const { contrast: c } = await measure("oklch");
  for (const id of ["#ok", "#okbg", "#mix"]) {
    assert.equal(by(c, id).status, "ok", id);
    assert.equal(typeof by(c, id).ratio, "number");
  }
});

test("contrast: ancestor opacity reduces contrast; opacity 0 skipped", async () => {
  const { contrast: c } = await measure("opacity");
  assert.equal(by(c, "#half").status, "fail");
  assert.equal(by(c, "#gone"), undefined);
});

test("defaults: Tailwind v3 and v4 ramps", async () => {
  assert.match(tells(await measure("ramp-v3")), /slate \(v3\) ramp/);
  assert.match(tells(await measure("ramp-v4")), /gray \(v4\) ramp/);
  assert.doesNotMatch(tells(await measure("contrast")), /ramp/);
});

test("defaults: cubic-bezier(0.32, 0.72, 0, 1) tell", async () => {
  assert.match(tells(await measure("easing")), /cubic-bezier/);
});

test("defaults: shadcn card with Tailwind's composed shadow list", async () => {
  assert.match(tells(await measure("shadcn-card")), /shadcn.*3 of 3/);
});

test("defaults: indigo/violet gradient in rgb and oklch", async () => {
  const t = tells(await measure("gradient"));
  assert.match(t, /#g1/);
  assert.match(t, /#g2/);
});

test("defaults: next/font hashed Inter family name", async () => {
  assert.match(tells(await measure("nextfont")), /Inter/);
});

test("targets: sr-only peer checkbox is replaced by its label", async () => {
  const { targets } = await measure("sr-peer");
  assert.equal(by(targets, "#cb"), undefined);
  assert.equal(by(targets, "#lab").width, 48);
  assert.equal(by(targets, "#lab").under44, false);
});

test("defaults: shadcn v4 card (12px + v4 shadow-sm); transparent ring-only boxes ignored", async () => {
  assert.match(tells(await measure("shadcn-v4")), /shadcn.*3 of 3/);
});

test("defaults: tracked caps eyebrow above 3 of 4 headings", async () => {
  const t = tells(await measure("eyebrows"));
  assert.match(t, /Eyebrow label above 3 of 4 headings/);
  assert.match(t, /"Features"/);
});

test("defaults: sentence-case eyebrows smaller than body text still count", async () => {
  assert.match(tells(await measure("eyebrows-sentence")), /Eyebrow label above 3 of 3 headings/);
});

test("defaults: 2 eyebrows, and dates or reading times above posts, are not a pattern", async () => {
  assert.doesNotMatch(tells(await measure("eyebrows-clean")), /Eyebrow/);
});

const measureFile = async (fixture) => {
  await page.goto(new URL(`./fixtures/${fixture}.html`, import.meta.url).href);
  await page.evaluate(() => document.fonts.ready);
  return page.evaluate(`(${src()})()`);
};

test("defaults: mono found by glyph width, not name; code, fields, hidden and non-mono names excluded", async () => {
  const t = tells(await measureFile("mono-labels"));
  assert.match(t, /Monospace on 3 non-code text elements/);
  assert.match(t, /#m1/);
  assert.doesNotMatch(t, /corsiva|#c1|#p1|#i1|#h1/);
});

test("defaults: a mono body, or exactly 2 mono labels, is not the tell", async () => {
  assert.doesNotMatch(tells(await measure("mono-body")), /Monospace/);
  assert.doesNotMatch(tells(await measure("mono-two")), /Monospace/);
});

test("defaults: two matching cards are not a pattern", async () => {
  assert.doesNotMatch(tells(await measure("shadcn-two")), /shadcn/);
});

test("targets: WCAG 2.5.8 spacing exception (4px apart fails, 30px apart passes)", async () => {
  const { targets } = await measure("spacing");
  assert.deepEqual(["#n1", "#n2", "#f1", "#f2"].map((id) => by(targets, id).spacingOk), [false, false, true, true]);
  assert.equal(by(targets, "#n1").under24, true);
});

// The exact invocation documented in the runner's header, run the way Playwright MCP's
// browser_run_code_unsafe runs `code`: a vm context holding only `page`, called with (page).
const skillDir = fileURLToPath(new URL("..", import.meta.url)).replace(/[\\/]$/, "");
async function runRunner(opts = {}, dir = skillDir) {
  const code = `async (page) => (${read("../scripts/measure-runner.js")})(page, ${JSON.stringify({ skillDir: dir, ...opts })})`;
  const ctx = vm.createContext({ page });
  const fn = vm.runInContext("(" + code + ")", ctx);
  return JSON.parse(JSON.stringify(await fn(page)));
}
async function runner(fixture, opts) {
  await page.setContent(read(`./fixtures/${fixture}.html`));
  return runRunner(opts);
}
// Compact rows are grouped: the selector lives in examples[].
const sel = (x) => x.selector || x.examples.map((e) => e.selector || e).join(" ");
const byC = (list, id) => list.find((x) => sel(x).includes(id));

test("runner: { full: true } covers 3 widths x 2 schemes x 2 motion prefs", async () => {
  const before = page.viewportSize();
  const out = await runner("media", { full: true });
  assert.deepEqual(page.viewportSize(), before);
  assert.equal(out.length, 12);
  const combos = out.map((r) => `${r.width}/${r.colorScheme}/${r.reducedMotion}`);
  assert.equal(new Set(combos).size, 12);
  for (const r of out) assert.equal(r.viewport.width, r.width);
  const pick = (cs, rm) => out.find((r) => r.width === 390 && r.colorScheme === cs && r.reducedMotion === rm);
  assert.equal(by(pick("light", "no-preference").contrast, "#t").ratio, 4.48);
  assert.equal(by(pick("dark", "no-preference").contrast, "#t").ratio, 21);
  assert.match(pick("light", "no-preference").motion.animatedOnLoad.join(), /#a/);
  assert.equal(pick("light", "reduce").motion.animatedOnLoad.length, 0);
});

test("runner: compact default keeps only failing rows, deduped, under 20 KB", async () => {
  const media = await runner("media");
  assert.equal(media.combinations.length, 12);
  const t = byC(media.contrast, "#t");
  assert.equal(t.status, "fail");
  assert.equal(t.in.length, 6); // light runs only; dark #t passes and is dropped
  assert.ok(media.combinations.every((c) => c.counts && !c.motion && !c.type));
  // motion differs between reduce and no-preference: two variants; type is the same everywhere.
  assert.equal(media.motion.length, 2);
  assert.deepEqual(media.motion.map((v) => v.in.length).sort(), [6, 6]);
  assert.deepEqual(media.type.map((v) => v.in), ["all"]);
  for (const [fixture, id] of [["contrast", "#low"], ["targets", "#b20"], ["huge-table", null], ["opacity", "#half"]]) {
    const out = await runner(fixture);
    assert.ok(JSON.stringify(out).length < 20000, fixture);
    assert.ok(out.contrast.every((r) => r.status !== "ok"), fixture);
    assert.ok(out.targets.every((r) => r.under24 || r.under44), fixture);
    if (id) assert.ok(byC([...out.contrast, ...out.targets], id), `${fixture} ${id}`);
  }
});

test("disabled: rows inside :disabled or aria-disabled are flagged", async () => {
  const { contrast: c, targets: t } = await measure("disabled");
  assert.deepEqual(["#off", "#aria", "#fs", "#on"].map((id) => by(c, id).disabled), [true, true, true, false]);
  assert.deepEqual(["#off", "#aria", "#on"].map((id) => by(t, id).disabled), [true, true, false]);
});

test("motion: reduced-motion rule found via @import and adoptedStyleSheets", async () => {
  // Negative first: setContent reuses the document, so adoptedStyleSheets would leak into later fixtures.
  assert.equal((await measure("contrast")).motion.reducedMotionRule, false);
  assert.equal((await measure("motion-import")).motion.reducedMotionRule, true);
  assert.equal((await measure("motion-adopted")).motion.reducedMotionRule, true);
  await page.evaluate(() => { document.adoptedStyleSheets = []; });
});

test("logicalProps: asymmetric physical vs logical inline props on present elements", async () => {
  assert.deepEqual((await measure("logical")).logicalProps, { physical: 2, logical: 1 });
});

// ---- audit fixes ----

test("runner: waits for matchMedia and resize listeners before measuring", async () => {
  const out = await runner("theme-js", { full: true });
  const pick = (w, cs) => out.find((r) => r.width === w && r.colorScheme === cs && r.reducedMotion === "no-preference");
  assert.equal(by(pick(1440, "light").contrast, "#t").bg, "#ffffff");
  assert.equal(by(pick(1440, "dark").contrast, "#t").bg, "#111111");
  assert.equal(by(pick(390, "light").contrast, "#r").fg, "rgb(204, 204, 204)");
  assert.equal(by(pick(1440, "light").contrast, "#r").fg, "rgb(0, 0, 0)");
});

test("runner: works under strict CSP and Trusted Types, leaves no globals or nodes behind", async () => {
  await page.route("http://csp.test/", (r) => r.fulfill({ contentType: "text/html", headers: { "content-security-policy": "script-src 'self'; require-trusted-types-for 'script'" }, body: "<!doctype html><body style='background:#fff'><p id='c' style='color:#777'>hi</p>" }));
  await page.goto("http://csp.test/");
  const out = await runRunner();
  assert.equal(byC(out.contrast, "#c").status, "fail");
  assert.deepEqual(await page.evaluate(() => [typeof window.__loupeMeasure, document.querySelectorAll("script,input").length]), ["undefined", 0]);
  await page.unroute("http://csp.test/");
  await page.goto("about:blank");
});

test("runner: skill dir with backslashes and quotes is passed as data, not code", async () => {
  const dir = join(mkdtempSync(join(tmpdir(), "loupe-")), 'we"ird\\\\dir');
  mkdirSync(join(dir, "scripts"), { recursive: true });
  copyFileSync(new URL("../scripts/measure.js", import.meta.url), join(dir, "scripts", "measure.js"));
  await page.setContent(read("./fixtures/contrast.html"));
  const out = await runRunner({}, dir);
  assert.ok(byC(out.contrast, "#low"));
});

test("runner: compact output of a large page stays under 40 KB", async () => {
  const block = (i) => `<section style="transition:all .2s;animation:spin 1s infinite"><h2 style="color:#999;font-size:${12 + (i % 3)}px">Heading ${i}</h2>
    <p style="color:#aaa">Body copy number ${i} with low contrast</p><button style="width:16px;height:16px;padding:0;margin:${i % 5}px">${i}</button>
    <a href="#" style="display:inline-block;width:30px;height:30px">L</a></section>`;
  const html = `<!doctype html><style>@keyframes spin{to{opacity:.5}}</style><body style="background:#fff">${Array.from({ length: 300 }, (_, i) => block(i)).join("")}`;
  await page.setContent(html);
  const out = await runRunner();
  const kb = JSON.stringify(out).length / 1024;
  assert.ok(kb < 40, `${kb.toFixed(1)} KB`);
  const m = out.motion[0].value;
  assert.ok(m.transitionAll.length <= 20 && m.transitionAllCount >= 300);
  assert.ok(m.animatedOnLoad.length <= 20);
  for (const r of [...out.contrast, ...out.targets]) if (r.in !== "all") assert.equal(new Set(r.in).size, r.in.length);
});

test("contrast: group opacity blends the composited group over what is beneath", async () => {
  const { contrast: c } = await measure("group-opacity");
  const g = by(c, "#g");
  assert.equal(g.bg, "#808080");
  assert.equal(g.ratio, 3.98);
  assert.equal(g.status, "fail");
  assert.equal(by(c, "#inner").ratio, 3.98);
});

test("contrast/targets: off-screen, aria-hidden and inert content is skipped and counted", async () => {
  const r = await measure("offscreen");
  assert.equal(by(r.contrast, "#on").status, "fail");
  for (const id of ["#slide", "#ah", "#in", "#vh"]) assert.equal(by(r.contrast, id), undefined, id);
  for (const id of ["#slidebtn", "#inbtn"]) assert.equal(by(r.targets, id), undefined, id);
  assert.ok(r.skipped.offscreen >= 1 && r.skipped.hidden >= 2, JSON.stringify(r.skipped));
});

test("shadow DOM: open roots measured; roots and iframes counted", async () => {
  await page.setContent(read("./fixtures/shadow.html"));
  await page.waitForFunction(() => document.querySelectorAll("iframe").length === 2);
  const r = await page.evaluate(`(${src()})()`);
  assert.equal(by(r.contrast, "#sp").status, "fail");
  assert.equal(by(r.targets, "#sb").under24, true);
  assert.equal(r.motion.reducedMotionRule, true);
  assert.deepEqual(r.coverage, { shadowRoots: 1, iframesSameOrigin: 1, iframesCrossOrigin: 1 });
});

test("motion: <link media> and @import media for reduced motion; unreadable sheets counted", async () => {
  await page.route("http://x.test/**", (r) => r.fulfill({ contentType: "text/css", body: "p{color:red}" }));
  const link = await measure("motion-link");
  assert.equal(link.motion.reducedMotionRule, true);
  assert.equal(link.motion.unreadableSheets, 2);
  assert.equal((await measure("motion-import-media")).motion.reducedMotionRule, true);
  await page.unroute("http://x.test/**");
});

test("targets: an inline link is a neighbour for the 2.5.8 spacing test but not an output row", async () => {
  const { targets } = await measure("spacing-inline");
  assert.equal(by(targets, "#il"), undefined);
  assert.equal(by(targets, "#x").spacingOk, false);
  assert.equal(by(targets, "#alone").spacingOk, true);
});

test("contrast: text-fill-color, display:contents, occluding sibling, filter, blend, transparent", async () => {
  const r = await measure("minor");
  const c = r.contrast;
  assert.equal(by(c, "#tf").fg, "rgb(204, 204, 204)");
  assert.equal(by(c, "#tf").status, "fail");
  assert.equal(by(c, "#dc").status, "fail");
  for (const id of ["#abs", "#inv", "#blend", "#tt"]) assert.equal(by(c, id).status, "unmeasurable", id);
  assert.equal(by(c, "#tt").ratio, null);
  assert.ok(by(r.targets, "#cp"), "clip-path rounded button is a visible target");
  for (const row of [...c, ...r.targets]) assert.equal(await page.evaluate((s) => document.querySelectorAll(s).length, row.selector), 1, row.selector);
});

test("defaults: page-controlled font names are truncated in evidence", async () => {
  const d = (await measure("fontname")).defaults.find((x) => /Inter/.test(x.tell));
  assert.ok(d.tell.length <= 120 && d.evidence.split("; ").every((e) => e.length <= 200), JSON.stringify(d));
});

test("contrast: thresholds use the unrounded ratio (4.496:1 fails and shows 4.49)", async () => {
  const e = by((await measure("threshold")).contrast, "#edge");
  assert.equal(e.status, "fail");
  assert.equal(e.ratio, 4.49);
});
