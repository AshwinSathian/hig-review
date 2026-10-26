// Typeface evaluation, run in the page. Also loadable as a <script>: the assignment defines window.__higTypeEval.
// Usage (browser_evaluate / page.evaluate): `(<this file's text>)({ families?, sizes? })`. Async: await the result.
// Run it once per page load: it loads font subsets for its coverage test, which a second run would count as the page's.
// families: names to test (default: the first family of every font-family stack in use on the page).
// sizes: px sizes for the confusable-glyph test (default [12, 13, 16]).
window.__higTypeEval = async (opts = {}) => {
  // Keywords that name a system or generic font and must stay unquoted.
  const GENERIC = new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-sans-serif", "ui-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong", "-apple-system", "blinkmacsystemfont"]);
  const isGeneric = (f) => GENERIC.has(f.toLowerCase());
  const q = (f) => (isGeneric(f) ? f : `"${f.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
  // A stack split into its first family and the rest, respecting commas inside quoted names.
  const split = (stack) => {
    const m = stack.match(/^\s*("[^"]*"|'[^']*'|[^,]+)\s*(?:,\s*(.*))?$/s);
    return m ? [m[1].trim().replace(/^["']|["']$/g, ""), (m[2] || "").trim()] : [stack.trim(), ""];
  };
  const first = (stack) => split(stack)[0];
  const key = (f) => f.toLowerCase(); // CSS matches family names case-insensitively
  const cs = (el) => getComputedStyle(el);
  // Font files the page itself loaded, read before this script loads subsets for the coverage test.
  // transferSize is 0 for cache hits and cross-origin files without Timing-Allow-Origin: reported as unknown.
  const fontFiles = performance.getEntriesByType("resource").filter((r) => /\.(woff2?|ttf|otf)([?#]|$)/i.test(r.name));

  // ---- where each family is used, by role ----
  const ROLE = (el) => {
    const t = el.tagName.toLowerCase();
    if (/^(code|pre|kbd|samp)$/.test(t) || el.closest("code,pre,kbd,samp")) return "code";
    if (/^(input|textarea|select)$/.test(t)) return "input";
    if (/^(td|th)$/.test(t) || el.closest("td,th")) return "table";
    if (/^h[1-6]$/.test(t) || el.closest("[role=heading]")) return "heading";
    if (t === "button" || el.closest("button,[role=button]")) return "control";
    if (el.closest("a[href],[role=link]")) return "link";
    return "text";
  };
  const visible = (el) => (el.checkVisibility ? el.checkVisibility({ visibilityProperty: true }) : el.getClientRects().length > 0);
  const usage = new Map();
  const els = [...document.querySelectorAll("body *")].filter((el) => {
    if (/^(script|style|option|template)$/i.test(el.tagName)) return false;
    const hasText = /^(input|textarea|select)$/i.test(el.tagName) || [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    return hasText && visible(el);
  }).slice(0, 2000);
  for (const el of els) {
    const s = cs(el);
    const [fam, rest] = split(s.fontFamily);
    if (!usage.has(key(fam))) usage.set(key(fam), { name: fam, fallback: rest, roles: {}, sizes: {}, weights: {}, numericInTables: new Set() });
    const u = usage.get(key(fam)), role = ROLE(el), size = Math.round(parseFloat(s.fontSize));
    u.roles[role] = (u.roles[role] || 0) + 1;
    u.sizes[size] = (u.sizes[size] || 0) + 1;
    u.weights[s.fontWeight] = (u.weights[s.fontWeight] || 0) + 1;
    if (role === "table") u.numericInTables.add(s.fontVariantNumeric);
  }
  const families = opts.families || [...usage.values()].map((u) => u.name);
  const sizes = opts.sizes || [12, 13, 16];

  // ---- canvas helpers ----
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  const font = (px, fam, fallback) => `${px}px ${q(fam)}${fallback ? `, ${fallback}` : ""}`;
  const widthOf = (str, px, fam, fallback) => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.font = font(px, fam, fallback); return ctx.measureText(str).width; };
  const bare = (str, fb) => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.font = `32px ${fb}`; return ctx.measureText(str).width; };
  // Binary ink mask of a string at a px size, drawn at device-pixel resolution.
  const mask = (str, px, fam, fallback) => {
    const dpr = window.devicePixelRatio || 1, w = Math.ceil(px * 4 * dpr), h = Math.ceil(px * 2 * dpr);
    cv.width = w; cv.height = h;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.font = font(px, fam, fallback);
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#000";
    ctx.fillText(str, px * 0.5, px * 1.4);
    const d = ctx.getImageData(0, 0, w, h).data, m = new Uint8Array(w * h);
    for (let i = 0; i < m.length; i++) m[i] = d[i * 4 + 3] > 96 ? 1 : 0;
    return m;
  };
  // d: share of differing ink pixels, 0 = identical ink, 1 = nothing in common (glyphs on the same origin).
  // px: device pixels that differ. A small distinct mark (a zero's dot or slash) gives a low d but px > 0.
  const distance = (a, b, size, fam, fallback) => {
    const A = mask(a, size, fam, fallback), B = mask(b, size, fam, fallback);
    let x = 0, u = 0;
    for (let i = 0; i < A.length; i++) { if (A[i] | B[i]) u++; if (A[i] ^ B[i]) x++; }
    return { d: u ? +(x / u).toFixed(2) : 0, px: x };
  };
  const parseRanges = (range) => range.split(",").map((r) => {
    const [lo, hi] = r.trim().replace(/^U\+/i, "").split("-");
    return [parseInt(lo.replace(/\?/g, "0"), 16), hi ? parseInt(hi, 16) : parseInt(lo.replace(/\?/g, "F"), 16)];
  });

  const SCRIPTS = { latin: "Hamburgefonstiv", latinExt: "ŁłŞşĞğŐőŰű", vietnamese: "ỆệỮữẶặ", greek: "ΑΩΣαωσ", cyrillic: "ЖЯЩжящ", arabic: "عربية", hebrew: "עברית", devanagari: "हिन्दी", cjk: "漢字かなカナ" };
  const PAIRS = [["I", "l"], ["l", "1"], ["I", "1"], ["0", "O"], ["rn", "m"], ["5", "S"], ["8", "B"], ["cl", "d"]];
  const host = document.body || document.documentElement;
  const span = document.createElement("span");
  span.style.cssText = "all:initial;position:absolute;left:-9999px;top:0;white-space:pre;font-size:32px";
  host.appendChild(span);
  const digitWidths = (fam, fallback, numeric) => {
    span.style.setProperty("font-family", `${q(fam)}${fallback ? `, ${fallback}` : ""}`, "important");
    span.style.setProperty("font-variant-numeric", numeric, "important");
    return [..."0123456789"].map((d) => { span.textContent = d; return +span.getBoundingClientRect().width.toFixed(2); });
  };
  const allEqual = (xs) => xs.every((x) => Math.abs(x - xs[0]) < 0.05);

  const out = [];
  try {
    for (const fam of families) {
      const u = usage.get(key(fam));
      const generic = isGeneric(fam);
      // The page's own fallback for this family, so measurements describe what actually renders.
      const fallback = (u && u.fallback) || "monospace";
      // Load every subset the samples touch (unicode-range faces load lazily), at every weight in use.
      if (!generic) {
        const weights = u ? Object.keys(u.weights) : ["400"];
        await Promise.all(weights.flatMap((w) => Object.values(SCRIPTS).concat("0123456789Il1O").map((t) => document.fonts.load(`${w} ${font(32, fam)}`, t).catch(() => null))));
      }
      const faces = [...document.fonts].filter((f) => key(first(f.family)) === key(fam));
      const loadedFaces = faces.filter((f) => f.status === "loaded");
      // Coverage. Web fonts with declared subsets: the loaded faces' unicode-range. Local fonts and all-range
      // files: a browser cannot tell which characters the font draws (engines go to system fallback fonts per
      // character, whatever the stack says), so only Latin is tested, as proof the font exists: naming the
      // family changes the width against a bare fallback. Other scripts are null: check them by eye.
      // (document.fonts.check is true for a family with no faces at all, so it is not used.)
      const byRange = loadedFaces.length > 0 && !loadedFaces.some((f) => f.unicodeRange === "U+0-10FFFF");
      const ranges = byRange ? loadedFaces.flatMap((f) => parseRanges(f.unicodeRange)) : [];
      const inRange = (t) => [...t].every((ch) => ranges.some(([a, b]) => ch.codePointAt(0) >= a && ch.codePointAt(0) <= b));
      const exists = (t) => ["serif", "monospace"].some((fb) => Math.abs(widthOf(t, 32, fam, fb) - bare(t, fb)) > 0.5);
      const coverage = { method: generic ? null : byRange ? "unicode-range" : "local (Latin only)" };
      for (const [k, t] of Object.entries(SCRIPTS)) coverage[k] = generic ? null : byRange ? inRange(t) : k === "latin" ? exists(t) : null;
      const loaded = generic || byRange || coverage.latin;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.font = font(100, fam, fallback);
      const xH = ctx.measureText("x").actualBoundingBoxAscent, capH = ctx.measureText("H").actualBoundingBoxAscent;
      const proportional = digitWidths(fam, fallback, "normal"), tabular = digitWidths(fam, fallback, "tabular-nums");
      const confusables = {};
      for (const px of sizes) confusables[px] = Object.fromEntries(PAIRS.map(([a, b]) => [`${a}/${b}`, distance(a, b, px, fam, fallback)]));
      out.push({
        family: fam, loaded,
        renderedWith: `${q(fam)}, ${fallback}`,
        ...(loaded ? {} : { warning: "the family did not load: the measurements below describe its fallback, renderedWith" }),
        faces: faces.map((f) => ({ weight: f.weight, style: f.style, stretch: f.stretch, display: f.display, status: f.status, unicodeRange: f.unicodeRange === "U+0-10FFFF" ? "all" : f.unicodeRange.slice(0, 60) })),
        variable: faces.some((f) => /\d+\s+\d+/.test(f.weight)),
        xHeightRatio: capH ? +(xH / capH).toFixed(3) : null,
        xHeightEm: +(xH / 100).toFixed(3),
        coverage,
        figures: { tabularByDefault: allEqual(proportional), tabularAvailable: allEqual(tabular) },
        confusables,
        usage: u ? { roles: u.roles, sizes: u.sizes, weights: u.weights, numericInTables: [...u.numericInTables] } : null,
      });
    }
  } finally { span.remove(); }

  const kb = (field) => (fontFiles.some((r) => r[field] > 0) ? Math.round(fontFiles.reduce((s, r) => s + (r[field] || 0), 0) / 1024) : null);
  return {
    families: out,
    files: { count: fontFiles.length, transferKB: kb("transferSize"), decodedKB: kb("decodedBodySize"), list: fontFiles.slice(0, 30).map((r) => r.name.split("/").pop()) },
    note: "confusables per size: d = share of differing ink pixels 0..1, px = device pixels that differ. px 0 = the pair renders identically (fail). d under about 0.25 with px > 0: a small mark separates them; judge it by eye on a magnified screenshot at that size. loaded false: the measurements describe the fallback named in renderedWith. coverage null for generic families, and for scripts other than Latin in a local font (check by eye). KB null = unknown (cache hit or cross-origin without Timing-Allow-Origin).",
  };
}
