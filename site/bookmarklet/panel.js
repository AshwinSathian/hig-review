// Results panel for the bookmarklet. A function expression taking measure.js's
// result. Renders into a closed shadow root so page styles can't reach it.
(r) => {
  const old = document.getElementById('loupe-panel-host');
  if (old) (old.__loupeClose || (() => old.remove()))();
  const host = document.createElement('div');
  host.id = 'loupe-panel-host';
  host.style.cssText = 'position:fixed;inset:auto 16px 16px auto;z-index:2147483647;';
  const root = host.attachShadow({ mode: 'closed' });
  const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
  const fails = (r.contrast || []).filter((c) => c.status === 'fail');
  const small = (r.targets || []).filter((t) => t.under24 && !t.spacingOk && !t.disabled);
  const motion = r.motion || {};
  const rows = (items, f) => items.slice(0, 12).map(f).join('') + (items.length > 12 ? `<li class="more">and ${items.length - 12} more</li>` : '');
  root.innerHTML = `<style>
    :host{all:initial}
    .p{font:14px/1.45 system-ui,sans-serif;color:#1a1d23;background:#fdfcfb;border:1px solid #82807b;width:min(380px,calc(100vw - 32px));max-height:min(70vh,640px);overflow:auto;box-shadow:0 8px 32px #0003}
    @media (prefers-color-scheme:dark){.p{color:#ede7df;background:#211b19;border-color:#6e6765}.m{color:#fd8453!important}}
    header{display:flex;justify-content:space-between;align-items:center;padding:8px 8px 8px 16px;border-bottom:1px solid #82807b;position:sticky;top:0;background:inherit}
    h2{font-size:15px;margin:0}h3{font-size:13px;margin:16px 16px 4px}
    button{font:inherit;font-weight:700;min-width:44px;min-height:44px;border:1px solid currentColor;background:transparent;color:inherit;cursor:pointer}
    button:focus-visible,.p:focus-visible{outline:2px solid currentColor;outline-offset:2px}.p:focus:not(:focus-visible){outline:none}
    ul{list-style:none;margin:0;padding:0 16px}li{padding:4px 0;border-bottom:1px solid #8884;word-break:break-word}
    .m{color:#c52f0f;font-family:ui-monospace,Menlo,monospace;font-weight:700}
    code{font-family:ui-monospace,Menlo,monospace;font-size:12px}
    .more,.note{color:inherit;opacity:.8}.note{padding:8px 16px 16px;font-size:12px}
    dl{display:grid;grid-template-columns:1fr auto;gap:2px 12px;margin:12px 16px}dd{margin:0;text-align:right}
  </style>
  <section class="p" role="dialog" aria-label="loupe measurements" tabindex="-1">
    <header><h2>loupe · ${r.viewport?.width ?? innerWidth} px</h2><button type="button" aria-label="Close">×</button></header>
    <dl>
      <dt>Text failing contrast</dt><dd class="m">${fails.length}</dd>
      <dt>Targets under 24 px</dt><dd class="m">${small.length}</dd>
      <dt>Type sizes in use</dt><dd class="m">${r.type?.distinctSizes ?? '?'}</dd>
      <dt>Smallest text</dt><dd class="m">${r.type?.minSize ?? '?'} px</dd>
      <dt>Reduced-motion rule</dt><dd class="m">${motion.reducedMotionRule ? 'yes' : motion.unreadableSheets ? 'unknown' : 'none'}</dd>
    </dl>
    ${fails.length ? `<h3>Contrast</h3><ul>${rows(fails, (c) => `<li><span class="m">${esc(c.ratio)}</span> “${esc(c.text)}” <code>${esc(c.selector)}</code></li>`)}</ul>` : ''}
    ${small.length ? `<h3>Small targets</h3><ul>${rows(small, (t) => `<li><span class="m">${esc(t.width)}×${esc(t.height)}</span> <code>${esc(t.selector)}</code></li>`)}</ul>` : ''}
    ${(r.defaults || []).length ? `<h3>Template defaults</h3><ul>${rows(r.defaults, (d) => `<li>${esc(d.tell)}</li>`)}</ul>` : ''}
    <p class="note">One width, one colour scheme, one motion setting. A loupe review measures twelve combinations and judges what the numbers mean.</p>
  </section>`;
  const panel = root.querySelector('.p');
  const before = document.activeElement;
  const close = () => {
    host.remove();
    removeEventListener('keydown', onKey, true);
    if (before && before.focus) before.focus();
  };
  // Escape closes the panel only while focus is inside it, not the page's own dialogs.
  const onKey = (e) => { if (e.key === 'Escape' && e.composedPath().includes(host)) close(); };
  host.__loupeClose = close;
  root.querySelector('button').addEventListener('click', close);
  addEventListener('keydown', onKey, true);
  document.documentElement.appendChild(host);
  panel.focus();
}
