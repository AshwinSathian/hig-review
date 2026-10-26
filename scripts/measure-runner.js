async (page, opts = {}) => {
  // Default (compact): per combination only counts plus type, motion, defaults and logicalProps;
  // contrast rows with status fail or unmeasurable and targets under 24 or 44, each listed once
  // with `in` naming the combinations it appeared in. opts.full returns every row per combination.
  // vp is null when the browser runs without a fixed viewport; the size then cannot be restored
  // and the page is left at the last measured width (1440).
  const vp = page.viewportSize();
  await page.addScriptTag({ path: "<SKILL_DIR>/scripts/measure.js" });
  if (!(await page.evaluate(() => typeof window.__loupeMeasure === "function")))
    throw new Error("measure.js did not load (strict CSP?); use browser_evaluate with the measure.js text instead");
  const out = [];
  try {
    for (const width of [390, 820, 1440])
      for (const colorScheme of ["light", "dark"])
        for (const reducedMotion of ["no-preference", "reduce"]) {
          await page.setViewportSize({ width, height: vp ? vp.height : 900 });
          await page.emulateMedia({ colorScheme, reducedMotion });
          const r = await page.evaluate(() => {
            // Jump colour/layout transitions triggered by the media change to their end state.
            for (const a of document.getAnimations()) if (a instanceof CSSTransition) a.finish();
            return window.__loupeMeasure();
          });
          out.push({ width, colorScheme, reducedMotion, ...r });
        }
  } finally {
    if (vp) await page.setViewportSize(vp);
    // null drops the emulation and returns to the browser's own media settings, which may differ
    // from any emulation set before this run.
    await page.emulateMedia({ colorScheme: null, reducedMotion: null });
  }
  if (opts.full) return out;

  const rows = { contrast: new Map(), targets: new Map() };
  const keep = { contrast: (r) => r.status !== "ok", targets: (t) => t.under24 || t.under44 };
  const combinations = out.map(({ contrast, targets, ...rest }) => {
    const combo = `${rest.width}/${rest.colorScheme}/${rest.reducedMotion}`;
    for (const [kind, list] of [["contrast", contrast], ["targets", targets]])
      for (const row of list.filter(keep[kind])) {
        const key = JSON.stringify(row);
        if (!rows[kind].has(key)) rows[kind].set(key, { ...row, in: [] });
        rows[kind].get(key).in.push(combo);
      }
    const count = (list, f) => list.filter(f).length;
    rest.counts = {
      contrast: { total: contrast.length, fail: count(contrast, (r) => r.status === "fail"), unmeasurable: count(contrast, (r) => r.status === "unmeasurable") },
      targets: { total: targets.length, under24: count(targets, (t) => t.under24), under44: count(targets, (t) => t.under44) },
    };
    return rest;
  });
  return { combinations, contrast: [...rows.contrast.values()], targets: [...rows.targets.values()] };
}
