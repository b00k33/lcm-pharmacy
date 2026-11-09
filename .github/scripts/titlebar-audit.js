/* LCM title-bar alignment audit: every control that rides in a page's top bar sits on the bar's one centre line.
   Her 2026-11-09 "see the problem? fix it and prevent from happening in the future" (the Guide's bar: Me sat 8px lower than
   Families, the search box and the Learned pill, because the cluster beside it kept a 16px bottom margin from the days it
   was its own row). CLAUDE.md "TOP BAR" is the rule; this script measures it. Not published.

   HOW: in the sandbox, with the page drawn, evaluate this file's text inside the app's window, then call
   lcmTitlebarAudit() -> { mode, bar: [w,h], rows, checked, ok, off: [...] }. It looks at the visible
   `#pharmacyPage .ph-shell-titlebar`. Run it on every page the build touches, at 1220-1280px AND at 360px, and with any
   menu / box in the bar open. A build is done when `off` is empty. Each line in `off` says which control, how far its centre
   is from the line, and why.

   THE RULE (desktop and phone alike): the bar is one flex row (or, when it has to wrap, several rows). In a row every
   control's vertical centre is the same line, within 1px, and a single row's line is the bar's own centre, within 1.5px.
   Nothing in the bar carries a vertical margin (the bar centres its children; a margin shifts the box it centres, so the
   control inside looks off). The CSS guard `.ph-shell-titlebar > :not(h1) { margin-block: 0 }` backs this up, but a control
   that sits two levels down (inside a cluster) can still be moved by its own margin or padding: this audit catches that. */
(function (W) {
  const D = W.document;
  const CTRL = "button, select, a[href], input:not([type=hidden]), textarea, [role=button], [role=tab], .ph-gdf-prog, [data-bar-item]";
  const SKIP = ".ph-gd-tabdrop, .ph-tbm-menu, .ph-rp-menu, [hidden]";   // open menus hang below the bar: not part of its row
  const r1 = n => Math.round(n * 10) / 10;
  W.lcmTitlebarAudit = function (opts) {
    // every page keeps its own (hidden) wrapper: take the one on screen
    const bar = [...D.querySelectorAll((opts && opts.root) || "#pharmacyPage .ph-shell-titlebar")].find(b => b.getBoundingClientRect().width > 0);
    if (!bar) return { error: "no title bar on screen" };
    const bb = bar.getBoundingClientRect(), cs = W.getComputedStyle(bar);
    const padT = parseFloat(cs.paddingTop) || 0, padB = parseFloat(cs.paddingBottom) || 0;
    const mid = bb.top + padT + (bb.height - padT - padB) / 2;
    const items = [...bar.querySelectorAll(CTRL)].filter(e => {
      if (e.closest(SKIP) || e.disabled && false) return false;
      const b = e.getBoundingClientRect(), s = W.getComputedStyle(e);
      return b.width > 4 && b.height > 4 && s.visibility !== "hidden" && s.display !== "none" && s.position !== "fixed";
    }).map(e => { const b = e.getBoundingClientRect(); return { e, top: b.top, bot: b.bottom, c: (b.top + b.bottom) / 2, h: b.height, b }; });
    // a control inside another control (an icon button inside a chip) is part of it: keep the outer one
    const outer = items.filter(a => !items.some(o => o !== a && o.e.contains(a.e)));
    const nm = x => { const e = x.e, t = (e.getAttribute("aria-label") || e.getAttribute("title") || e.textContent || e.placeholder || "").trim().replace(/\s+/g, " ").slice(0, 28); return (e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\s+/)[0] : "") + (t ? ` "${t}"` : "")); };
    // rows: controls whose vertical spans overlap more than half of the shorter one
    const rows = [];
    outer.slice().sort((a, b) => a.c - b.c).forEach(x => {
      const row = rows.find(rw => rw.some(y => Math.min(x.bot, y.bot) - Math.max(x.top, y.top) > Math.min(x.h, y.h) / 2));
      if (row) row.push(x); else rows.push([x]);
    });
    const off = [];
    rows.forEach((rw, i) => {
      const line = rw.reduce((s, y) => s + y.c, 0) / rw.length;
      rw.forEach(x => { const d = x.c - line; if (Math.abs(d) > 1) off.push({ what: nm(x), off: r1(d), why: `centre ${r1(x.c)} vs its row's line ${r1(line)}` + (rows.length > 1 ? ` (row ${i + 1})` : "") }); });
      if (rows.length === 1) { const d = line - mid; if (Math.abs(d) > 1.5) off.push({ what: "the whole row", off: r1(d), why: `row line ${r1(line)} vs the bar's centre ${r1(mid)}` }); }
    });
    // a vertical margin on a control or on a wrapper that holds controls
    const wrappers = new Set();
    outer.forEach(x => { for (let p = x.e; p && p !== bar.parentElement; p = p.parentElement) wrappers.add(p); });
    wrappers.forEach(e => { const s = W.getComputedStyle(e), mt = parseFloat(s.marginTop) || 0, mb = parseFloat(s.marginBottom) || 0; if (e !== bar && (mt || mb) && s.display !== "contents") off.push({ what: nm({ e }), off: 0, why: `vertical margin ${mt}px / ${mb}px inside the bar` }); });
    return { mode: (W.innerWidth <= 640 ? "phone " : "desktop ") + W.innerWidth, bar: [Math.round(bb.width), Math.round(bb.height)], rows: rows.length, checked: outer.length, ok: outer.length - outer.filter(x => off.some(o => o.what === nm(x))).length, off };
  };
})(window);
