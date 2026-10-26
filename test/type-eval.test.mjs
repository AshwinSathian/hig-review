import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { chromium } from "playwright";

const read = (p) => readFileSync(new URL(p, import.meta.url), "utf8");
const src = () => read("../scripts/type-eval.js");
let browser, page;
before(async () => { browser = await chromium.launch(); page = await browser.newPage(); });
after(() => browser.close());
const run = async (opts) => { await page.setContent(read("./fixtures/type.eval.html")); return page.evaluate(`(${src()})(${JSON.stringify(opts ?? {})})`); };

test("usage: families in use are found with their roles", async () => {
  const r = await run();
  const names = r.families.map((f) => f.family);
  assert.ok(names.includes("sans-serif") && names.includes("monospace"));
  const mono = r.families.find((f) => f.family === "monospace");
  assert.equal(mono.usage.roles.code, 1);
  assert.deepEqual(r.families.find((f) => f.family === "sans-serif").usage.numericInTables, ["tabular-nums"]);
});

test("figures: a monospace face has tabular digits by default", async () => {
  const [mono] = (await run({ families: ["monospace"] })).families;
  assert.equal(mono.figures.tabularByDefault, true);
  assert.equal(mono.figures.tabularAvailable, true);
});

test("confusables: distances are in 0..1, identical strings are 0, different glyphs are not", async () => {
  const [mono] = (await run({ families: ["monospace"], sizes: [16] })).families;
  const d = mono.confusables[16];
  for (const v of Object.values(d)) assert.ok(v.d >= 0 && v.d <= 1 && v.px >= 0);
  assert.ok(d["8/B"].d > 0 && d["8/B"].px > 0);
});

test("a family that is not installed is reported as not loaded and covering nothing", async () => {
  const [f] = (await run({ families: ["No Such Face 9z"] })).families;
  assert.equal(f.loaded, false);
  assert.equal(f.coverage.method, "local (Latin only)");
  assert.equal(f.coverage.latin, false);
  assert.equal(f.coverage.cjk, null);
});

const runFile = async (opts) => {
  await page.goto(new URL("./fixtures/type-font.html", import.meta.url).href);
  return page.evaluate(`(${src()})(${JSON.stringify(opts ?? {})})`);
};

test("a real web font: loaded, case-insensitive match, unicode-range coverage with a wildcard range", async () => {
  const r = await runFile();
  const jb = r.families.find((f) => f.family.toLowerCase() === "jb test");
  assert.equal(jb.loaded, true);
  assert.ok(jb.faces.length >= 1 && jb.faces.every((f) => f.status === "loaded"));
  assert.equal(jb.coverage.method, "unicode-range");
  assert.equal(jb.coverage.latin, true);
  assert.equal(jb.coverage.cyrillic, false);
  assert.equal(jb.coverage.cjk, false);
  assert.equal(jb.figures.tabularByDefault, true);
});

test("system stacks stay unquoted; hidden subtrees are not counted; a missing first family says what rendered", async () => {
  const r = await runFile();
  const names = r.families.map((f) => f.family);
  const sys = r.families.find((f) => f.family === "-apple-system");
  assert.equal(sys.loaded, true);
  assert.equal(sys.coverage.method, null);
  assert.ok(!names.includes("Hidden Only"));
  const missing = r.families.find((f) => f.family === "Missing Face");
  assert.equal(missing.loaded, false);
  assert.match(missing.renderedWith, /Georgia, serif$/);
  assert.ok(missing.warning);
});
