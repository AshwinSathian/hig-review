// Page measurement for one viewport/media combination. The file is a single function expression:
// pass its text unchanged as browser_evaluate's `function`, or evaluate `(<text>)()` from
// page.evaluate. It defines no globals. scripts/measure-runner.js runs it for every combination.
// Colours are converted to sRGB through a canvas, so Display-P3 and other wide-gamut colours outside
// sRGB are clamped to the sRGB gamut before the ratio is computed.
() => {
  const CAP = 400;
  let sampled = false;
  const cs = (el) => getComputedStyle(el);
  const clip = (s, n = 80) => (s.length > n ? s.slice(0, n - 1) + "…" : s); // page-controlled strings

  // ---- roots: the document and every open shadow root (closed roots cannot be reached) ----
  const roots = [document];
  const coverage = { shadowRoots: 0, iframesSameOrigin: 0, iframesCrossOrigin: 0 };
  for (let i = 0; i < roots.length; i++)
    for (const el of roots[i].querySelectorAll("*")) {
      if (el.shadowRoot) { roots.push(el.shadowRoot); coverage.shadowRoots++; }
      if (el.tagName === "IFRAME" || el.tagName === "FRAME") {
        let same = false;
        try { same = !!el.contentDocument; } catch (e) { /* cross-origin */ }
        coverage[same ? "iframesSameOrigin" : "iframesCrossOrigin"]++;
      }
    }
  const qsa = (sel) => roots.flatMap((r) => [...r.querySelectorAll(sel)]);
  const all = [document.body, ...document.body.querySelectorAll("*"), ...roots.slice(1).flatMap((r) => [...r.querySelectorAll("*")])];
  // Parent in the flattened tree: slot for slotted nodes, host for a shadow root's top level.
  const up = (n) => n.assignedSlot || n.parentElement || (n.parentNode && n.parentNode.host) || null;
  const closestUp = (el, f) => { for (let n = el; n; n = up(n)) if (n.nodeType === 1 && f(n)) return n; return null; };

  // ---- helpers ----
  // Shortest child-combinator path that matches exactly one element in its root; a unique id anchors it.
  // Shadow content is written `<host selector> >>> <selector inside the root>`.
  const selCache = new Map();
  const selectorOf = (el) => {
    if (selCache.has(el)) return selCache.get(el);
    const root = el.getRootNode();
    const unique = (s) => { try { return root.querySelectorAll(s).length === 1; } catch (e) { return false; } };
    const parts = [];
    for (let n = el; n && n.nodeType === 1 && parts.length < 16; n = n.parentElement) {
      const id = n.id && `#${CSS.escape(n.id)}`;
      if (id && unique(id)) { parts.unshift(id); break; }
      const tag = n.tagName.toLowerCase();
      const same = n.parentElement ? [...n.parentElement.children].filter((c) => c.tagName === n.tagName) : [n];
      parts.unshift(same.length > 1 ? `${tag}:nth-of-type(${same.indexOf(n) + 1})` : tag);
      if (unique(parts.join(" > "))) break;
    }
    let sel = parts.join(" > ");
    if (root.host) sel = `${selectorOf(root.host)} >>> ${sel}`;
    selCache.set(el, sel);
    return sel;
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
  const isDisabled = (el) => !!closestUp(el, (n) => n.matches(':disabled,[aria-disabled="true"]'));

  // Content a user cannot see or reach: "hidden" (aria-hidden, inert, content-visibility, opacity 0,
  // visibility) or "offscreen" (outside the document horizontally or above it, or clipped away by an
  // overflow:hidden/clip ancestor, e.g. inactive carousel slides). Both are skipped and counted.
  const skipped = { hidden: 0, offscreen: 0 };
  const VIS = { contentVisibilityAuto: true, opacityProperty: true, visibilityProperty: true };
  const hiddenReason = (el, r) => {
    if (closestUp(el, (n) => n.getAttribute("aria-hidden") === "true" || n.hasAttribute("inert"))) return "hidden";
    const boxed = closestUp(el, (n) => cs(n).display !== "contents");
    if (boxed && boxed.checkVisibility && !boxed.checkVisibility(VIS)) return "hidden";
    const x0 = r.left + scrollX, x1 = r.right + scrollX;
    if (x1 <= 0 || x0 >= document.documentElement.scrollWidth || r.bottom + scrollY <= 0) return "offscreen";
    for (let n = up(el); n && n !== document.documentElement; n = up(n)) {
      const s = cs(n);
      if (!/hidden|clip/.test(s.overflowX + s.overflowY)) continue;
      const c = n.getBoundingClientRect();
      if (r.right <= c.left || r.left >= c.right || r.bottom <= c.top || r.top >= c.bottom) return "offscreen";
    }
    return null;
  };

  // ---- text nodes (shared by contrast and type) ----
  const textParents = [];
  const range = document.createRange();
  for (const root of roots) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n; (n = walker.nextNode()); ) {
      const el = n.parentElement;
      if (!n.nodeValue.trim() || !el || /^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE)$/.test(el.tagName)) continue;
      if (cs(el).visibility !== "visible") continue;
      // The text's own boxes, so display:contents parents still count.
      range.selectNodeContents(n);
      const r = range.getBoundingClientRect();
      if (!r.width || !r.height) continue;
      const why = hiddenReason(el, r);
      if (why) { skipped[why]++; continue; }
      textParents.push({ el, node: n, rect: [...range.getClientRects()].find((x) => x.width && x.height) || r, text: clip(n.nodeValue.trim(), 60) });
    }
  }

  // ---- contrast ----
  // Each element in the flattened ancestor chain is a layer: background colour, background image,
  // opacity, and effects (filter, mix-blend-mode) the model cannot follow. Elements with opacity < 1
  // form a group: their content is composited first, then blended over what lies beneath.
  const layerOf = (n) => {
    const s = cs(n);
    if (s.display === "contents") return { bg: null, img: false, o: 1, fx: false };
    return {
      bg: parseColor(s.backgroundColor), img: s.backgroundImage !== "none", o: parseFloat(s.opacity),
      fx: s.filter !== "none" || s.mixBlendMode !== "normal",
    };
  };
  // Premultiplied pixel with a `dirty` flag (depends on an unknown background image).
  const EMPTY = { r: 0, g: 0, b: 0, a: 0, dirty: false };
  const paint = (p, c) => ({ r: c.r * c.a + p.r * (1 - c.a), g: c.g * c.a + p.g * (1 - c.a), b: c.b * c.a + p.b * (1 - c.a), a: c.a + p.a * (1 - c.a), dirty: c.a < 1 && p.dirty });
  const blend = (p, grp, o) => {
    const k = grp.a * o;
    return { r: grp.r * o + p.r * (1 - k), g: grp.g * o + p.g * (1 - k), b: grp.b * o + p.b * (1 - k), a: k + p.a * (1 - k), dirty: grp.dirty || (k < 1 && p.dirty) };
  };
  // chain[0] is the text's element, chain[last] the root element; fg is null for the background pixel.
  const pixel = (chain, fg) => {
    const group = (i) => {
      const L = chain[i];
      let p = L.bg && L.bg.a > 0 ? paint(EMPTY, L.bg) : EMPTY;
      if (L.img) p = { ...p, dirty: true };
      return i === 0 ? (fg ? paint(p, fg) : p) : blend(p, group(i - 1), chain[i - 1].o);
    };
    const top = chain.length - 1;
    return blend({ r: 255, g: 255, b: 255, a: 1, dirty: false }, group(top), chain[top].o);
  };
  const isAncestor = (x, el) => { for (let n = up(el); n; n = up(n)) if (n === x) return true; return false; };
  const REPLACED = /^(IMG|VIDEO|CANVAS|SVG|IFRAME|PICTURE|OBJECT|EMBED)$/i;
  // A painted element under (or over) the text that is not one of its ancestors: the chain model
  // does not see it. elementsFromPoint skips pointer-events:none elements and text outside the viewport.
  const occluded = (el, rect) => {
    const x = rect.left + rect.width / 2, y = rect.top + rect.height / 2;
    if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) return false;
    for (const h of document.elementsFromPoint(x, y)) {
      if (h === el || el.contains(h)) continue;
      if (isAncestor(h, el)) { const L = layerOf(h); if (L.bg && L.bg.a === 1) return false; continue; }
      const L = layerOf(h);
      if ((L.bg && L.bg.a > 0) || L.img || REPLACED.test(h.tagName)) return true;
    }
    return false;
  };
  const contrast = [];
  if (textParents.length > CAP) sampled = true;
  for (const { el, text, rect } of textParents.slice(0, CAP)) {
    const s = cs(el);
    const size = parseFloat(s.fontSize);
    const weight = parseInt(s.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    // -webkit-text-fill-color paints the glyphs when it differs from color.
    const fill = s.webkitTextFillColor;
    const fgStr = fill && fill !== s.color ? fill : s.color;
    // disabled: WCAG 1.4.3 and 2.5.8 exempt inactive components.
    const row = { selector: selectorOf(el), text, fg: fgStr, bg: null, ratio: null, size, weight, large, pass: null, status: "unmeasurable", disabled: isDisabled(el) };
    const chain = [];
    for (let n = el; n; n = up(n)) if (n.nodeType === 1) chain.push(layerOf(n));
    const fgRaw = parseColor(fgStr);
    let reason = null;
    if (s.textShadow !== "none") reason = "text-shadow";
    else if (chain.some((L) => L.fx)) reason = "filter or blend mode";
    else if (!fgRaw) reason = "unparsed colour";
    else if (fgRaw.a === 0) reason = "transparent text";
    if (!reason) {
      const fp = pixel(chain, fgRaw), bp = pixel(chain, null);
      if (fp.dirty || bp.dirty) reason = "background image";
      else if (occluded(el, rect)) reason = "overlapping layer";
      else {
        const [hi, lo] = [lum(fp), lum(bp)].sort((a, b) => b - a);
        const ratio = (hi + 0.05) / (lo + 0.05);
        row.bg = hex(bp);
        row.pass = ratio >= (large ? 3 : 4.5); // WCAG 1.4.3, on the unrounded ratio
        // Shown to 2 places, rounded down when rounding would reach a threshold the text misses.
        row.ratio = Math.round(ratio * 100) / 100;
        if ([3, 4.5, 7].some((t) => row.ratio >= t && ratio < t)) row.ratio = Math.floor(ratio * 100) / 100;
        row.status = row.pass ? "ok" : "fail";
      }
    }
    if (reason) row.reason = reason;
    contrast.push(row);
  }

  // ---- targets ----
  const TARGET = 'a[href], button, input:not([type=hidden]), select, textarea, summary, [role=button], [role=link], [role=tab], [role=menuitem], [role=checkbox], [role=switch], [tabindex]:not([tabindex="-1"])';
  // sr-only / peer inputs: tiny or fully transparent; their visible label is the real target.
  const visuallyHidden = (el) => {
    const r = el.getBoundingClientRect();
    return (r.width <= 1 && r.height <= 1) || parseFloat(cs(el).opacity) === 0;
  };
  const hasOwnText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim());
  const targets = [], entries = [];
  for (const el of qsa(TARGET)) {
    if (!visible(el)) continue;
    // WCAG 2.5.8 inline exception: links within running text are exempt, but still count as
    // neighbours in the spacing test, so they are kept in entries and left out of the rows.
    const inline = el.tagName === "A" && cs(el).display === "inline" && !!el.parentElement && hasOwnText(el.parentElement);
    let box = el;
    if (!inline && visuallyHidden(el)) {
      box = [...(el.labels || [])].find(visible);
      if (!box) continue;
    }
    const r = box.getBoundingClientRect();
    const why = hiddenReason(box, r);
    if (why) { skipped[why]++; continue; }
    if (inline) { entries.push({ rects: [...el.getClientRects()] }); continue; }
    if (targets.length >= CAP) { sampled = true; continue; }
    const t = {
      selector: selectorOf(box),
      role: el.getAttribute("role") || (el.tagName === "INPUT" ? `input:${el.type}` : el.tagName.toLowerCase()),
      width: Math.round(r.width * 10) / 10,
      height: Math.round(r.height * 10) / 10,
      under24: r.width < 24 || r.height < 24,
      under44: r.width < 44 || r.height < 44,
      disabled: isDisabled(el),
    };
    targets.push(t);
    entries.push({ rects: [r], t });
  }

  // WCAG 2.5.8 spacing exception: a 24px circle centred on an undersized target must not
  // intersect another target or another undersized target's circle (touching counts).
  const centre = (r) => [r.x + r.width / 2, r.y + r.height / 2];
  for (const e of entries) {
    if (!e.t || !e.t.under24) continue;
    const [cx, cy] = centre(e.rects[0]);
    e.t.spacingOk = entries.every((o) => {
      if (o === e) return true;
      for (const r of o.rects) {
        const dx = Math.max(r.left - cx, 0, cx - r.right), dy = Math.max(r.top - cy, 0, cy - r.bottom);
        if (Math.hypot(dx, dy) <= 12) return false;
      }
      if (!o.t || !o.t.under24) return true;
      const [ox, oy] = centre(o.rects[0]);
      return Math.hypot(ox - cx, oy - cy) > 24;
    });
  }

  // ---- type ----
  const families = new Set();
  const sizes = {};
  const letterSpacingBySize = {};
  for (const { el } of textParents) {
    const s = cs(el);
    families.add(clip(s.fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "")));
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
  const MOTION_CAP = 20;
  const transitionAllEls = [], animatedEls = [];
  for (const el of all) {
    const s = cs(el);
    const live = (d) => d.split(",").some((v) => parseFloat(v) > 0);
    // Default transition-property is "all" with 0s duration; only a nonzero duration counts.
    if (s.transitionProperty.split(",").map((v) => v.trim()).includes("all") && live(s.transitionDuration)) transitionAllEls.push(el);
    if (s.animationName !== "none" && live(s.animationDuration)) animatedEls.push(el);
  }
  // One walk over every rule feeds reducedMotionRule and logicalProps (for the RTL check).
  // logicalProps counts authored inline-axis margin/padding/inset on rules that match an element
  // in the page, plus inline styles; a side counts only when its opposite side differs, so
  // symmetric values (margin: 0 auto) are ignored. ponytail: @media conditions are not evaluated.
  // reducedMotionRule false with unreadableSheets > 0 is unverified: a cross-origin sheet may hold it.
  const RM = "prefers-reduced-motion";
  let reducedMotionRule = false, unreadableSheets = 0;
  const logicalProps = { physical: 0, logical: 0 };
  const SIDES = [["margin-left", "margin-right", "physical"], ["padding-left", "padding-right", "physical"], ["left", "right", "physical"],
    ["margin-inline-start", "margin-inline-end", "logical"], ["padding-inline-start", "padding-inline-end", "logical"], ["inset-inline-start", "inset-inline-end", "logical"]];
  const countSides = (st) => {
    for (const [a, b, kind] of SIDES) {
      const va = st.getPropertyValue(a), vb = st.getPropertyValue(b);
      if (va !== vb) logicalProps[kind] += !!va + !!vb;
    }
  };
  const scanSheet = (sheet, root) => {
    if (sheet.media && sheet.media.mediaText.includes(RM)) reducedMotionRule = true; // <link media>, @import media
    let rules;
    try { rules = sheet.cssRules; } catch (e) { unreadableSheets++; return; } // cross-origin or not loaded
    const matches = (sel) => { try { return !!root.querySelector(sel); } catch (e) { return false; } };
    const scan = (list) => {
      for (const r of list) {
        if ((r instanceof CSSMediaRule && r.conditionText.includes(RM)) || (r instanceof CSSImportRule && r.media.mediaText.includes(RM))) reducedMotionRule = true;
        if (r instanceof CSSStyleRule && matches(r.selectorText)) countSides(r.style);
        if (r.cssRules) scan(r.cssRules);
        if (r.styleSheet) scanSheet(r.styleSheet, root);
      }
    };
    scan(rules);
  };
  for (const root of roots)
    for (const sheet of [...root.styleSheets, ...(root.adoptedStyleSheets || [])]) scanSheet(sheet, root);
  for (const el of all) if (el.style && el.style.length) countSides(el.style);
  const motion = {
    transitionAll: transitionAllEls.slice(0, MOTION_CAP).map(selectorOf), transitionAllCount: transitionAllEls.length,
    animatedOnLoad: animatedEls.slice(0, MOTION_CAP).map(selectorOf), animatedOnLoadCount: animatedEls.length,
    reducedMotionRule, unreadableSheets,
  };

  // ---- library / trend default tells ----
  const defaults = [];
  // next/font renames families to "__Inter_a1b2c3"; strip that before matching.
  const cleanFamily = (f) => clip(f.split(",")[0].trim().replace(/^["']|["']$/g, "").replace(/^__/, "").replace(/_[0-9a-f]{5,}$/i, "").replace(/_/g, " "));
  const topEls = [document.documentElement, document.body, ...document.body.children];
  const fontHits = topEls.filter((el) => /^(Inter|Geist)\b/i.test(cleanFamily(cs(el).fontFamily)));
  if (fontHits.length) {
    defaults.push({ tell: `Font stack starts with ${cleanFamily(cs(fontHits[0]).fontFamily)}`, evidence: fontHits.slice(0, 5).map((el) => `${selectorOf(el)}: ${clip(cs(el).fontFamily)}`).join("; ") });
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

  const glass = qsa("main *, [role=main] *").filter((el) => {
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

  // Eyebrows: a short label straight before a page or section heading (h1, h2), set apart by caps,
  // tracking or a size below body text, on 3 or more headings and at least half of them (slop
  // catalog, "Section-number and eyebrow habits"). Dates and reading times above posts are not eyebrows.
  const bodySize = parseFloat(cs(document.body).fontSize);
  const DATE_RE = /\b(19|20)\d{2}\b|^\d{1,2}[/.-]\d{1,2}|\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\.?\s+\d|\d+\s*min(ute)?s?\b/i;
  const heads = qsa("h1, h2").filter(visible);
  const eyebrows = heads.filter((h) => {
    const el = h.previousElementSibling;
    if (!el || !visible(el) || /^H[1-6]$/.test(el.tagName)) return false;
    const text = el.textContent.trim();
    if (!text || text.length > 40 || DATE_RE.test(text)) return false;
    const s = cs(el), size = parseFloat(s.fontSize);
    const caps = s.textTransform === "uppercase" || (/[A-Z]/.test(text) && text === text.toUpperCase());
    const tracked = parseFloat(s.letterSpacing) / size >= 0.05;
    return size <= parseFloat(cs(h).fontSize) * 0.6 && (caps || tracked || size < bodySize);
  }).map((h) => h.previousElementSibling);
  if (eyebrows.length >= 3 && eyebrows.length / heads.length >= 0.5) {
    defaults.push({ tell: `Eyebrow label above ${eyebrows.length} of ${heads.length} headings`, evidence: eyebrows.slice(0, 5).map((el) => `${selectorOf(el)}: "${clip(el.textContent.trim(), 30)}"`).join("; ") });
  }

  // Monospace on text that is not code: more than 2 elements (pixelslop's threshold, slop catalog
  // "Fake product theater"). Mono is detected by glyph width, not by name, so Fira Code or Iosevka
  // count and Monotype Corsiva doesn't. Code, commands, form fields and icon fonts are excluded, and
  // a page whose body text is mono (a deliberate terminal look) is not counted.
  const monoCache = new Map();
  const isMono = (s) => {
    const key = `${s.fontStyle} ${s.fontWeight} 40px ${s.fontFamily}`;
    if (!monoCache.has(key)) {
      ctx.font = key;
      monoCache.set(key, Math.abs(ctx.measureText("iiiiii").width - ctx.measureText("MMMMMM").width) < 0.5);
    }
    return monoCache.get(key);
  };
  if (!isMono(cs(document.body))) {
    const monoLabels = all.filter((el) => {
      if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return false;
      const s = cs(el);
      return isMono(s) && !/icon|symbol|awesome|glyph/i.test(s.fontFamily) &&
        !closestUp(el, (n) => n.matches("pre, code, kbd, samp, tt, var, input, textarea, select, [aria-hidden=true]")) &&
        visible(el);
    });
    if (monoLabels.length > 2) {
      defaults.push({ tell: `Monospace on ${monoLabels.length} non-code text elements`, evidence: monoLabels.slice(0, 5).map((el) => `${selectorOf(el)}: "${clip(el.textContent.trim(), 30)}"`).join("; ") });
    }
  }

  return {
    viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio },
    sampled, skipped, coverage, contrast, targets, type, motion, defaults, logicalProps,
  };
}
