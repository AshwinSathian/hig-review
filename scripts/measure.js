// Also loadable as a <script> (page.addScriptTag): the assignment defines window.__higMeasure.
window.__higMeasure = () => {
  const CAP = 400;
  let sampled = false;
  const cs = (el) => getComputedStyle(el);

  // ---- helpers ----
  const selectorOf = (el) => {
    const parts = [];
    for (let n = el; n && n.nodeType === 1 && parts.length < 4; n = n.parentElement) {
      if (n.id) { parts.unshift(`#${CSS.escape(n.id)}`); break; }
      const tag = n.tagName.toLowerCase();
      const same = n.parentElement ? [...n.parentElement.children].filter((c) => c.tagName === n.tagName) : [n];
      parts.unshift(same.length > 1 ? `${tag}:nth-of-type(${same.indexOf(n) + 1})` : tag);
    }
    return parts.join(" > ");
  };
  // Any CSS colour (rgb, oklch, lab, color(), color-mix...) -> sRGB via a 1x1 canvas.
  // rgb()/rgba() strings are parsed directly so they stay exact.
  const ctx = document.createElement("canvas").getContext("2d", { willReadFrequently: true });
  ctx.canvas.width = ctx.canvas.height = 1;
  const colorCache = new Map();
  const parseColor = (str) => {
    str = str.trim();
    if (colorCache.has(str)) return colorCache.get(str);
    let out = null;
    const m = /^rgba?\(([^)]+)\)$/.exec(str);
    if (m) {
      const p = m[1].split(/[\s,/]+/).filter(Boolean).map((v) => (v.endsWith("%") ? parseFloat(v) / 100 : Number(v)));
      out = { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
    } else {
      ctx.clearRect(0, 0, 1, 1);
      ctx.fillStyle = "#010203"; // sentinel: an unparseable value leaves this in place
      ctx.fillStyle = str;
      if (ctx.fillStyle !== "#010203") {
        ctx.fillRect(0, 0, 1, 1);
        const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data;
        out = { r, g, b, a: a / 255 };
      }
    }
    colorCache.set(str, out);
    return out;
  };
  const over = (top, under) => ({ // alpha-composite top over opaque under
    r: top.r * top.a + under.r * (1 - top.a),
    g: top.g * top.a + under.g * (1 - top.a),
    b: top.b * top.a + under.b * (1 - top.a),
    a: 1,
  });
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const hex = (c) => "#" + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = cs(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
  };
  const all = [...document.querySelectorAll("body, body *")];
  const isDisabled = (el) => !!el.closest(':disabled,[aria-disabled="true"]');

  // ---- text nodes (shared by contrast and type) ----
  const textParents = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walker.nextNode()); ) {
    const el = n.parentElement;
    if (!n.nodeValue.trim() || !el || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(el.tagName) || !visible(el)) continue;
    let opacity = 1;
    for (let a = el; a; a = a.parentElement) opacity *= parseFloat(cs(a).opacity);
    if (opacity === 0) continue;
    textParents.push({ opacity, el, text: n.nodeValue.trim().slice(0, 60) });
  }

  // ---- contrast ----
  const contrast = [];
  if (textParents.length > CAP) sampled = true;
  for (const { el, text, opacity } of textParents.slice(0, CAP)) {
    const s = cs(el);
    const size = parseFloat(s.fontSize);
    const weight = parseInt(s.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    // disabled: WCAG 1.4.3 and 2.5.8 exempt inactive components.
    const row = { selector: selectorOf(el), text, fg: s.color, bg: null, ratio: null, size, weight, large, pass: null, status: "unmeasurable", disabled: isDisabled(el) };
    // Layers from the element up to the first opaque background, then white.
    const layers = [];
    let blocked = s.textShadow !== "none";
    for (let n = el; n && !blocked; n = n.parentElement) {
      const ns = cs(n);
      if (ns.backgroundImage !== "none") { blocked = true; break; }
      const bg = parseColor(ns.backgroundColor);
      if (!bg) { blocked = true; break; }
      if (bg.a > 0) layers.push(bg);
      if (bg.a === 1) break;
    }
    const fgRaw = parseColor(s.color);
    if (!blocked && fgRaw) {
      let bg = { r: 255, g: 255, b: 255, a: 1 };
      for (const l of layers.reverse()) bg = over(l, bg);
      const fg = over({ ...fgRaw, a: fgRaw.a * opacity }, bg);
      const [hi, lo] = [lum(fg), lum(bg)].sort((a, b) => b - a);
      const ratio = (hi + 0.05) / (lo + 0.05);
      row.bg = hex(bg);
      row.ratio = Math.round(ratio * 100) / 100;
      row.pass = ratio >= (large ? 3 : 4.5); // WCAG 1.4.3
      row.status = row.pass ? "ok" : "fail";
    }
    contrast.push(row);
  }

  // ---- targets ----
  const TARGET = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=tab], [role=menuitem], [role=checkbox], [role=switch], [tabindex]:not([tabindex="-1"])';
  const visuallyHidden = (el) => {
    const r = el.getBoundingClientRect(), s = cs(el);
    const out = s.position === "absolute" || s.position === "fixed";
    return (r.width <= 1 && r.height <= 1) || (out && (s.clip !== "auto" || s.clipPath !== "none" || parseFloat(s.opacity) === 0));
  };
  const hasOwnText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim());
  const targets = [], rects = [];
  for (const el of document.querySelectorAll(TARGET)) {
    if (!visible(el)) continue;
    // WCAG 2.5.8 inline exception: links within running text are exempt.
    if (el.tagName === "A" && cs(el).display === "inline" && el.parentElement && hasOwnText(el.parentElement)) continue;
    let box = el;
    if (visuallyHidden(el)) {
      // sr-only / peer inputs: the visible label is the real target.
      box = [...(el.labels || [])].find(visible);
      if (!box) continue;
    }
    if (targets.length >= CAP) { sampled = true; break; }
    const r = box.getBoundingClientRect();
    rects.push(r);
    targets.push({
      selector: selectorOf(box),
      role: el.getAttribute("role") || (el.tagName === "INPUT" ? `input:${el.type}` : el.tagName.toLowerCase()),
      width: Math.round(r.width * 10) / 10,
      height: Math.round(r.height * 10) / 10,
      under24: r.width < 24 || r.height < 24,
      under44: r.width < 44 || r.height < 44,
      disabled: isDisabled(el),
    });
  }

  // WCAG 2.5.8 spacing exception: a 24px circle centred on an undersized target must not
  // intersect another target or another undersized target's circle (touching counts).
  const centre = (r) => [r.x + r.width / 2, r.y + r.height / 2];
  targets.forEach((t, i) => {
    if (!t.under24) return;
    const [cx, cy] = centre(rects[i]);
    t.spacingOk = rects.every((r, j) => {
      if (j === i) return true;
      const dx = Math.max(r.left - cx, 0, cx - r.right), dy = Math.max(r.top - cy, 0, cy - r.bottom);
      if (Math.hypot(dx, dy) <= 12) return false;
      const [ox, oy] = centre(r);
      return !targets[j].under24 || Math.hypot(ox - cx, oy - cy) > 24;
    });
  });

  // ---- type ----
  const families = new Set();
  const sizes = {};
  const letterSpacingBySize = {};
  for (const { el } of textParents) {
    const s = cs(el);
    families.add(s.fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, ""));
    const px = String(parseFloat(s.fontSize));
    sizes[px] = (sizes[px] || 0) + 1;
    const ls = (letterSpacingBySize[px] ||= []);
    if (!ls.includes(s.letterSpacing)) ls.push(s.letterSpacing);
  }
  const sizeKeys = Object.keys(sizes).map(Number);
  const type = {
    families: [...families], sizes,
    minSize: sizeKeys.length ? Math.min(...sizeKeys) : null,
    distinctSizes: sizeKeys.length, letterSpacingBySize,
  };

  // ---- motion ----
  const transitionAll = [], animatedOnLoad = [];
  for (const el of all) {
    const s = cs(el);
    const live = (d) => d.split(",").some((v) => parseFloat(v) > 0);
    // Default transition-property is "all" with 0s duration; only a nonzero duration counts.
    if (s.transitionProperty.split(",").map((v) => v.trim()).includes("all") && live(s.transitionDuration)) transitionAll.push(selectorOf(el));
    if (s.animationName !== "none" && live(s.animationDuration)) animatedOnLoad.push(selectorOf(el));
  }
  // One walk over every rule feeds reducedMotionRule and logicalProps (for the RTL check).
  // logicalProps counts authored inline-axis margin/padding/inset on rules that match an element
  // in the page, plus inline styles; a side counts only when its opposite side differs, so
  // symmetric values (margin: 0 auto) are ignored. ponytail: @media conditions are not evaluated.
  let reducedMotionRule = false;
  const logicalProps = { physical: 0, logical: 0 };
  const SIDES = [["margin-left", "margin-right", "physical"], ["padding-left", "padding-right", "physical"], ["left", "right", "physical"],
    ["margin-inline-start", "margin-inline-end", "logical"], ["padding-inline-start", "padding-inline-end", "logical"], ["inset-inline-start", "inset-inline-end", "logical"]];
  const countSides = (st) => {
    for (const [a, b, kind] of SIDES) {
      const va = st.getPropertyValue(a), vb = st.getPropertyValue(b);
      if (va !== vb) logicalProps[kind] += !!va + !!vb;
    }
  };
  const matches = (sel) => { try { return !!document.querySelector(sel); } catch (e) { return false; } };
  const scan = (rules) => {
    for (const r of rules) {
      if (r instanceof CSSMediaRule && r.conditionText.includes("prefers-reduced-motion")) reducedMotionRule = true;
      if (r instanceof CSSStyleRule && matches(r.selectorText)) countSides(r.style);
      if (r.cssRules) scan(r.cssRules);
      try { if (r.styleSheet) scan(r.styleSheet.cssRules); } catch (e) { /* cross-origin @import */ }
    }
  };
  for (const sheet of [...document.styleSheets, ...(document.adoptedStyleSheets || [])]) {
    try { scan(sheet.cssRules); } catch (e) { /* cross-origin sheet */ }
  }
  for (const el of all) if (el.style && el.style.length) countSides(el.style);
  const motion = { transitionAll, reducedMotionRule, animatedOnLoad };

  // ---- library / trend default tells ----
  const defaults = [];
  // next/font renames families to "__Inter_a1b2c3"; strip that before matching.
  const cleanFamily = (f) => f.split(",")[0].trim().replace(/^["']|["']$/g, "").replace(/^__/, "").replace(/_[0-9a-f]{5,}$/i, "").replace(/_/g, " ");
  const roots = [document.documentElement, document.body, ...document.body.children];
  const fontHits = roots.filter((el) => /^(Inter|Geist)\b/i.test(cleanFamily(cs(el).fontFamily)));
  if (fontHits.length) {
    defaults.push({ tell: `Font stack starts with ${cleanFamily(cs(fontHits[0]).fontFamily)}`, evidence: fontHits.map((el) => `${selectorOf(el)}: ${cs(el).fontFamily}`).join("; ") });
  }

  // Tailwind default ramps, steps 500-900. v3 values are hex, v4 (tailwindcss 4.3.3 theme.css) oklch;
  // both are normalised to sRGB at runtime and matched with a small tolerance.
  const RAMPS = {
    "slate (v3)": ["#64748b", "#475569", "#334155", "#1e293b", "#0f172a"],
    "gray (v3)": ["#6b7280", "#4b5563", "#374151", "#1f2937", "#111827"],
    "zinc (v3)": ["#71717a", "#52525b", "#3f3f46", "#27272a", "#18181b"],
    "slate (v4)": ["oklch(55.4% 0.046 257.417)", "oklch(44.6% 0.043 257.281)", "oklch(37.2% 0.044 257.287)", "oklch(27.9% 0.041 260.031)", "oklch(20.8% 0.042 265.755)"],
    "gray (v4)": ["oklch(55.1% 0.027 264.364)", "oklch(44.6% 0.03 256.802)", "oklch(37.3% 0.034 259.733)", "oklch(27.8% 0.033 256.848)", "oklch(21% 0.034 264.665)"],
    "zinc (v4)": ["oklch(55.2% 0.016 285.938)", "oklch(44.2% 0.017 285.786)", "oklch(37% 0.013 285.805)", "oklch(27.4% 0.006 286.033)", "oklch(21% 0.006 285.885)"],
  };
  const seenStr = new Set();
  for (const el of all) {
    const s = cs(el);
    for (const v of [s.color, s.backgroundColor, s.borderTopColor]) seenStr.add(v);
  }
  const seen = [...seenStr].map(parseColor).filter((c) => c && c.a === 1);
  const near = (a, b) => Math.abs(a.r - b.r) <= 2 && Math.abs(a.g - b.g) <= 2 && Math.abs(a.b - b.b) <= 2;
  for (const [name, ramp] of Object.entries(RAMPS)) {
    const hit = ramp.map((v, i) => [(i + 5) * 100, parseColor(v)]).filter(([, c]) => seen.some((x) => near(x, c)));
    if (hit.length >= 3) defaults.push({ tell: `Tailwind default ${name} ramp`, evidence: hit.map(([k]) => k).join(", ") });
  }

  const timing = all.flatMap((el) => [cs(el).transitionTimingFunction, cs(el).animationTimingFunction]);
  if (timing.some((t) => t.includes("cubic-bezier(0.32, 0.72, 0, 1)"))) {
    defaults.push({ tell: "cubic-bezier(0.32, 0.72, 0, 1) easing", evidence: "found in a transition or animation" });
  }

  // Tailwind composes box-shadow as a list (transparent ring layers + the real shadow), so parse layers.
  // Verified against tailwindcss 4.3.3 theme.css and shadcn's new-york-v4 card.tsx (rounded-xl shadow-sm):
  //   v3 shadow-sm = v4 shadow-xs: 0 1px 2px 0 /.05
  //   v4 shadow-sm: 0 1px 3px 0 /.1, 0 1px 2px -1px /.1;  radius-lg 8px, radius-xl 12px
  const COLOR_RE = /(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^)]*\)|#[0-9a-f]{3,8}\b/gi;
  const shadowLayers = (bs) => bs.split(/,(?![^(]*\))/).map((layer) => {
    const color = layer.match(COLOR_RE)?.[0];
    const c = color && parseColor(color);
    return { c, len: layer.replace(COLOR_RE, "").trim().split(/\s+/).map(parseFloat).join() };
  }).filter((l) => l.c && l.c.a > 0); // drop transparent ring layers
  const isBlack = (l, a) => l.c.r + l.c.g + l.c.b === 0 && Math.abs(l.c.a - a) < 0.01;
  const isShadcnShadow = (layers) =>
    layers.some((l) => l.len === "0,1,2,0" && isBlack(l, 0.05)) ||
    (layers.some((l) => l.len === "0,1,3,0" && isBlack(l, 0.1)) && layers.some((l) => l.len === "0,1,2,-1" && isBlack(l, 0.1)));
  const cards = all.map((el) => ({ el, layers: shadowLayers(cs(el).boxShadow) }))
    .filter(({ el, layers }) => parseFloat(cs(el).borderTopLeftRadius) > 0 && layers.length);
  const shadcn = cards.filter(({ el, layers }) => ["8px", "12px"].includes(cs(el).borderTopLeftRadius) && isShadcnShadow(layers));
  if (shadcn.length >= 3 && shadcn.length / cards.length >= 0.6) {
    defaults.push({ tell: "shadcn default card (8px/12px radius + default shadow)", evidence: `${shadcn.length} of ${cards.length} cards` });
  }

  const glass = [...document.querySelectorAll("main *, [role=main] *")].filter((el) => {
    const s = cs(el);
    return (s.backdropFilter || s.webkitBackdropFilter || "none") !== "none";
  });
  if (glass.length) defaults.push({ tell: "backdrop-filter in the content layer (main)", evidence: glass.slice(0, 5).map(selectorOf).join(", ") });

  const hue = (c) => {
    const r = c.r / 255, g = c.g / 255, b = c.b / 255;
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
    if (d < 0.15) return null; // too grey to have a meaningful hue
    const h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
    return (h * 60 + 360) % 360;
  };
  const grads = all.filter((el) => {
    const bi = cs(el).backgroundImage;
    if (!bi.includes("linear-gradient")) return false;
    return (bi.match(COLOR_RE) || []).some((v) => { const c = parseColor(v); const h = c && hue(c); return h !== null && h !== undefined && h >= 230 && h <= 290; });
  });
  if (grads.length) defaults.push({ tell: "indigo/violet gradient background", evidence: grads.slice(0, 5).map(selectorOf).join(", ") });

  return {
    viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio },
    sampled, contrast, targets, type, motion, defaults, logicalProps,
  };
}
