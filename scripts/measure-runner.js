async (page, opts = {}) => {
  // HOW TO RUN (Playwright MCP, one browser_run_code_unsafe call):
  //   Read this file, then pass as `code`, with this file's text pasted unchanged in place of <RUNNER>:
  //     async (page) => (<RUNNER>)(page, { skillDir: "<SKILL_DIR as a JSON string>" })
  //   skillDir is ${CLAUDE_SKILL_DIR}, the skill's directory, written as a JSON string literal:
  //   escape every backslash and double quote, e.g. { skillDir: "C:\\Users\\me\\.claude\\skills\\loupe" }.
  //   Add full: true for every row of every combination: { skillDir: "...", full: true }.
  // The runner reads <skillDir>/scripts/measure.js through a detached file input (the code runs in a
  // vm context holding only `page`, with no require or fs) and evaluates it with page.evaluate, which
  // strict CSP and Trusted Types do not block. It injects no <script> and leaves no globals or nodes.
  //
  // It measures widths 390, 820, 1440 x colorScheme light, dark x reducedMotion no-preference, reduce,
  // waiting two animation frames after each media/viewport change so matchMedia and resize listeners
  // (JS-applied themes, responsive classes) have run, and finishing CSS transitions they started.
  //
  // Default (compact) result, kept small for large pages:
  //   type, motion, defaults, logicalProps, skipped {hidden, offscreen}, coverage {shadowRoots,
  //     iframesSameOrigin, iframesCrossOrigin}: each an array of { in, value }, one entry per distinct
  //     value (usually one, with in: "all"). iframes are not measured: mark their content Unverified.
  //   combinations[]: width, colorScheme, reducedMotion, viewport, sampled (hit the 400-item cap: say
  //     results are sampled), counts {contrast {total, fail, unmeasurable}, targets {total, under24, under44}}.
  //   contrast[]: fail and unmeasurable rows grouped by fg, bg, ratio, large, status, reason, disabled,
  //     with sizes (px), count (distinct elements), examples [{selector, text}] (up to 2), in.
  //   targets[]: under24 or under44 targets grouped by role, under24, under44, spacingOk (WCAG 2.5.8
  //     spacing exception, for under24), disabled, with minWidth, minHeight, count,
  //     examples [{selector, width, height}] (up to 2), in.
  //   in: the combinations ("width/colorScheme/reducedMotion") an entry appeared in, or "all".
  // { full: true } returns one measure.js result per combination instead: every row, ungrouped.
  // Notes: motion lists hold the first 20 selectors; transitionAllCount / animatedOnLoadCount are
  // totals. reducedMotionRule false with unreadableSheets > 0 is unverified (cross-origin CSS).
  // Colours outside sRGB (Display-P3) are clamped to sRGB. Contrast `reason` says why a row is
  // unmeasurable (background image, text-shadow, filter or blend mode, overlapping layer, ...).
  // Selectors match one element; `>>>` separates a shadow host from the selector inside its root.
  // vp is null when the browser runs without a fixed viewport; the size then cannot be restored
  // and the page is left at the last measured width (1440).
  if (typeof opts.skillDir !== "string") throw new Error("pass { skillDir: <the skill directory as a JSON string> }");
  const input = await page.evaluateHandle(() => Object.assign(document.createElement("input"), { type: "file" }));
  let src;
  try {
    await input.setInputFiles(`${opts.skillDir.replace(/[\\/]$/, "")}/scripts/measure.js`);
    src = await input.evaluate((i) => i.files[0].text());
  } finally {
    await input.dispose();
  }
  const settle = () => page.evaluate(() => new Promise((done) => {
    const t = setTimeout(done, 200); // rAF does not fire in hidden tabs
    requestAnimationFrame(() => requestAnimationFrame(() => { clearTimeout(t); done(); }));
  }));
  const vp = page.viewportSize();
  const out = [];
  try {
    for (const width of [390, 820, 1440])
      for (const colorScheme of ["light", "dark"])
        for (const reducedMotion of ["no-preference", "reduce"]) {
          await page.setViewportSize({ width, height: vp ? vp.height : 900 });
          await page.emulateMedia({ colorScheme, reducedMotion });
          await settle();
          // Jump colour/layout transitions triggered by the media change to their end state.
          await page.evaluate(() => { for (const a of document.getAnimations()) if (a instanceof CSSTransition) a.finish(); });
          out.push({ width, colorScheme, reducedMotion, ...(await page.evaluate(`(${src})()`)) });
        }
  } finally {
    if (vp) await page.setViewportSize(vp);
    // null drops the emulation and returns to the browser's own media settings, which may differ
    // from any emulation set before this run.
    await page.emulateMedia({ colorScheme: null, reducedMotion: null });
  }
  if (opts.full) return out;

  const comboOf = (r) => `${r.width}/${r.colorScheme}/${r.reducedMotion}`;
  const inOf = (list) => (list.length === out.length ? "all" : list);
  const clip = (t) => (t.length > 40 ? t.slice(0, 39) + "…" : t);
  const groups = { contrast: new Map(), targets: new Map() };
  const spec = {
    contrast: {
      keep: (r) => r.status !== "ok",
      key: ({ fg, bg, ratio, large, status, reason, disabled }) => ({ fg, bg, ratio, large, status, reason, disabled }),
      add: (g, r) => { if (!g.sizes.includes(r.size)) g.sizes.push(r.size); },
      example: (r) => ({ selector: r.selector, text: clip(r.text) }),
    },
    targets: {
      keep: (t) => t.under24 || t.under44,
      key: ({ role, under24, under44, spacingOk, disabled }) => ({ role, under24, under44, spacingOk, disabled }),
      add: (g, t) => { g.minWidth = Math.min(g.minWidth ?? Infinity, t.width); g.minHeight = Math.min(g.minHeight ?? Infinity, t.height); },
      example: (t) => ({ selector: t.selector, width: t.width, height: t.height }),
    },
  };
  for (const r of out)
    for (const kind of ["contrast", "targets"])
      for (const row of r[kind].filter(spec[kind].keep)) {
        const k = spec[kind].key(row), key = JSON.stringify(k);
        if (!groups[kind].has(key)) groups[kind].set(key, { ...k, ...(kind === "contrast" ? { sizes: [] } : {}), count: 0, examples: [], seen: new Set(), in: [] });
        const g = groups[kind].get(key);
        spec[kind].add(g, row);
        if (!g.seen.has(row.selector)) { g.seen.add(row.selector); g.count++; if (g.examples.length < 2) g.examples.push(spec[kind].example(row)); }
        if (!g.in.includes(comboOf(r))) g.in.push(comboOf(r));
      }
  const finish = (map) => [...map.values()].map(({ seen, ...g }) => ({ ...g, in: inOf(g.in) }));

  // Per-page summaries, each listed once per distinct value with the combinations it came from.
  const result = {};
  for (const k of ["type", "motion", "defaults", "logicalProps", "skipped", "coverage"]) {
    const variants = new Map();
    for (const r of out) {
      const key = JSON.stringify(r[k]);
      if (!variants.has(key)) variants.set(key, { in: [], value: r[k] });
      variants.get(key).in.push(comboOf(r));
    }
    result[k] = [...variants.values()].map((v) => ({ in: inOf(v.in), value: v.value }));
  }
  const count = (list, f) => list.filter(f).length;
  result.combinations = out.map(({ width, colorScheme, reducedMotion, viewport, sampled, contrast, targets }) => ({
    width, colorScheme, reducedMotion, viewport, sampled,
    counts: {
      contrast: { total: contrast.length, fail: count(contrast, (x) => x.status === "fail"), unmeasurable: count(contrast, (x) => x.status === "unmeasurable") },
      targets: { total: targets.length, under24: count(targets, (t) => t.under24), under44: count(targets, (t) => t.under44) },
    },
  }));
  result.contrast = finish(groups.contrast);
  result.targets = finish(groups.targets);
  return result;
}
