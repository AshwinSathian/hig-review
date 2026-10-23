() => {
  const CAP = 400;
  let sampled = false;
  const cs = (el) => getComputedStyle(el);

  // ---- helpers ----
  const selectorOf = (el) => {
    const parts = [];
    for (let n = el; n && n.nodeType === 1 && parts.length < 4; n = n.parentElement) {
      if (n.id) { parts.unshift(`#${n.id}`); break; }
      const tag = n.tagName.toLowerCase();
      const same = n.parentElement ? [...n.parentElement.children].filter((c) => c.tagName === n.tagName) : [n];
      parts.unshift(same.length > 1 ? `${tag}:nth-of-type(${same.indexOf(n) + 1})` : tag);
    }
    return parts.join(" > ");
  };
  const parseColor = (s) => {
    const m = /^rgba?\(([^)]+)\)$/.exec(s.trim());
    if (!m) return null;
    const p = m[1].split(/[\s,/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 };
  };
  const over = (top, under) => ({ // alpha-composite top over opaque under
    r: top.r * top.a + under.r * (1 - top.a),
    g: top.g * top.a + under.g * (1 - top.a),
    b: top.b * top.a + under.b * (1 - top.a),
    a: 1,
  });
  const lum = (c) => {
    const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };
  const hex = (c) => "#" + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("");
  const visible = (el) => {
    const r = el.getBoundingClientRect();
    const s = cs(el);
    return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none";
  };
  const all = [...document.querySelectorAll("body, body *")];

  // ---- text nodes (shared by contrast and type) ----
  const textParents = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = walker.nextNode()); ) {
    const el = n.parentElement;
    if (!n.nodeValue.trim() || !el || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(el.tagName) || !visible(el)) continue;
    textParents.push({ el, text: n.nodeValue.trim().slice(0, 60) });
  }

  // ---- contrast ----
  const contrast = [];
  if (textParents.length > CAP) sampled = true;
  for (const { el, text } of textParents.slice(0, CAP)) {
    const s = cs(el);
    const size = parseFloat(s.fontSize);
    const weight = parseInt(s.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const row = { selector: selectorOf(el), text, fg: s.color, bg: null, ratio: null, size, weight, large, pass: null, status: "unmeasurable" };
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
      const fg = over(fgRaw, bg);
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
  const hasOwnText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim());
  const targets = [];
  for (const el of document.querySelectorAll(TARGET)) {
    if (!visible(el)) continue;
    // WCAG 2.5.8 inline exception: links within running text are exempt.
    if (el.tagName === "A" && cs(el).display === "inline" && el.parentElement && hasOwnText(el.parentElement)) continue;
    if (targets.length >= CAP) { sampled = true; break; }
    const r = el.getBoundingClientRect();
    targets.push({
      selector: selectorOf(el),
      role: el.getAttribute("role") || (el.tagName === "INPUT" ? `input:${el.type}` : el.tagName.toLowerCase()),
      width: Math.round(r.width * 10) / 10,
      height: Math.round(r.height * 10) / 10,
      under24: r.width < 24 || r.height < 24,
      under44: r.width < 44 || r.height < 44,
    });
  }

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
  let reducedMotionRule = false;
  const scan = (rules) => {
    for (const r of rules) {
      if (r instanceof CSSMediaRule && r.conditionText.includes("prefers-reduced-motion")) reducedMotionRule = true;
      if (r.cssRules) scan(r.cssRules);
    }
  };
  for (const sheet of document.styleSheets) {
    try { scan(sheet.cssRules); } catch (e) { /* cross-origin sheet */ }
  }
  const motion = { transitionAll, reducedMotionRule, animatedOnLoad };

  // ---- library / trend default tells ----
  const defaults = [];
  const stack = [...families].find((f) => /^(Inter|Geist)$/i.test(f));
  if (stack) defaults.push({ tell: `Font stack starts with ${stack}`, evidence: stack });

  const RAMPS = {
    slate: ["#64748b", "#475569", "#334155", "#1e293b", "#0f172a"],
    gray: ["#6b7280", "#4b5563", "#374151", "#1f2937", "#111827"],
    zinc: ["#71717a", "#52525b", "#3f3f46", "#27272a", "#18181b"],
  };
  const seen = new Set();
  for (const el of all) {
    const s = cs(el);
    for (const v of [s.color, s.backgroundColor, s.borderTopColor]) {
      const c = parseColor(v);
      if (c && c.a === 1) seen.add(hex(c));
    }
  }
  for (const [name, ramp] of Object.entries(RAMPS)) {
    const hit = ramp.filter((h) => seen.has(h));
    if (hit.length >= 3) defaults.push({ tell: `Tailwind default ${name} ramp`, evidence: hit.join(", ") });
  }

  const timing = all.flatMap((el) => [cs(el).transitionTimingFunction, cs(el).animationTimingFunction]);
  if (timing.some((t) => t.includes("cubic-bezier(0.32, 0.72, 0, 1)"))) {
    defaults.push({ tell: "cubic-bezier(0.32, 0.72, 0, 1) easing", evidence: "found in a transition or animation" });
  }

  const SHADCN_SHADOW = "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px"; // Tailwind shadow-sm
  const cards = all.filter((el) => parseFloat(cs(el).borderTopLeftRadius) > 0 && cs(el).boxShadow !== "none");
  const shadcn = cards.filter((el) => cs(el).borderTopLeftRadius === "8px" && cs(el).boxShadow === SHADCN_SHADOW);
  if (cards.length && shadcn.length / cards.length >= 0.6) {
    defaults.push({ tell: "shadcn default card (8px radius + shadow-sm)", evidence: `${shadcn.length} of ${cards.length} cards` });
  }

  const glass = [...document.querySelectorAll("main *")].filter((el) => {
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
    return (bi.match(/rgba?\([^)]+\)/g) || []).some((v) => { const h = hue(parseColor(v)); return h !== null && h >= 230 && h <= 290; });
  });
  if (grads.length) defaults.push({ tell: "indigo/violet gradient background", evidence: grads.slice(0, 5).map(selectorOf).join(", ") });

  return {
    viewport: { width: innerWidth, height: innerHeight, dpr: devicePixelRatio },
    sampled, contrast, targets, type, motion, defaults,
  };
}
