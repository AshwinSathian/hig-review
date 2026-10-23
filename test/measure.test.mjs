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
