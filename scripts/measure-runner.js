async (page) => {
  // vp is null when the browser runs without a fixed viewport; the size then cannot be restored
  // and the page is left at the last measured width (1440).
  const vp = page.viewportSize();
  await page.addScriptTag({ path: "<SKILL_DIR>/scripts/measure.js" });
  if (!(await page.evaluate(() => typeof window.__higMeasure === "function")))
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
            return window.__higMeasure();
          });
          out.push({ width, colorScheme, reducedMotion, ...r });
        }
  } finally {
    if (vp) await page.setViewportSize(vp);
    // null drops the emulation and returns to the browser's own media settings, which may differ
    // from any emulation set before this run.
    await page.emulateMedia({ colorScheme: null, reducedMotion: null });
  }
  return out;
}
