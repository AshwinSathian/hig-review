import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

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

test("defaults: two matching cards are not a pattern", async () => {
  assert.doesNotMatch(tells(await measure("shadcn-two")), /shadcn/);
});

test("targets: WCAG 2.5.8 spacing exception (4px apart fails, 30px apart passes)", async () => {
  const { targets } = await measure("spacing");
  assert.deepEqual(["#n1", "#n2", "#f1", "#f2"].map((id) => by(targets, id).spacingOk), [false, false, true, true]);
  assert.equal(by(targets, "#n1").under24, true);
});

test("runner: one browser_run_code_unsafe call covers 3 widths x 2 schemes x 2 motion prefs", async () => {
  const vm = await import("node:vm");
  const skillDir = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
  const code = read("../scripts/measure-runner.js").replaceAll("<SKILL_DIR>", skillDir);
  await page.setContent(read("./fixtures/media.html"));
  // Same evaluation path as Playwright MCP's browser_run_code_unsafe: vm context with only `page`.
  const fn = vm.runInContext("(" + code + ")", vm.createContext({ page }));
  const out = JSON.parse(JSON.stringify(await fn(page)));
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
