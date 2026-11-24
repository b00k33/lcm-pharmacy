/* LCM style audit: the text sizes and weights, the chip look, the colours and the coloured side lines on a page against the standards she set on 2026-11-18.
   Sister of tap-audit.js (control SIZES) and titlebar-audit.js (the top bar). Not published (GitHub Pages lists its own files).

   HOW: same as tap-audit.js. In the sandbox, with the page drawn (menus, boxes and side panels open), evaluate this file's text inside
   the app's window, then call lcmStyleAudit() -> { mode, texts, sizes: {size: n}, offSizes: [...], offColours: [...], sideLines: [...] }.
   Pass { root: "<selector>" } to audit one part (default "#pharmacyPage"). Run at 1220-1280px AND at 360px. A build is done when
   offSizes and sideLines are empty and every offColours line is on purpose (her word).

   THE STANDARDS this measures
   - TYPE SCALE (her 2026-11-18 "5 sizes"): computer 20 titles, 18 big numbers, 13 text (names, rows, buttons, boxes), 11.5 small
     notes (dates, counts), 10.5 capital labels (column names, card titles). Phone (640px and under, STYLE-LCM.md) 16 / 13 / 11.5 / 11.
     A new text takes one of these; a new size needs her word. Text inside a picture (svg) is not counted.
   - COLOURS (her 2026-11-18 on Formula refill, "keep to only black white teal and red"): ink / white / greys, teal, and red (empty,
     short, overdue only). Gold, amber, green, blue and purple fills or text are listed in offColours. The app's colour law (CLAUDE.md,
     "teal + white + gold UI") still allows the gold Update, count badges and the Plan a formula bar button: pass { palette: "app" }
     to allow gold as well and see only the strays.
   - SIDE LINES (her 2026-11-03): no coloured line down one side of anything; a dot or a tint instead.
   - THREE WEIGHTS (her 2026-11-18 pick "Three"): 400 text · 600 names, chips, buttons · 700 titles, big numbers, capital labels.
     Any other weight is listed in offWeights.
   - ONE CHIP LOOK (her 2026-11-18 "consistent chip boxes and fonts"; chip words "Semi-bold"): a chip, button, dropdown or box is
     white with a 1px line, 6px corners (tap-audit.js measures sizes and corners), its words 600 (a typed value 400); picked or the
     main action = the solid page colour (--ph-herb, the Case colour on a Case page). chipLooks lists a line over 1px, a solid fill in
     another teal, and chip words not 600; `looks` counts the distinct chip looks on the page (fewer is better). Rows, fold heads and
     the rail are not chips (the same KEEP idea as tap-audit.js).
   - ROWS LINE UP (her 2026-11-19 "the rows are disjointed" + "add to the code to ensure that for future builds"): in a table or a
     grid of rows, every box sits under its column head and on the row's one line. rowAlign lists: "wraps" (a cell's boxes sit on two
     lines, e.g. a chip dropped under a name), "spills" (a box sticks out past its cell), "off head" (a grid row's cell starts more than
     4px from its head's cell) and "centre" (boxes in one row whose middles differ by more than 4px). A box that opens under its row on
     purpose sits in its own row (a sub-row), never wrapped inside a cell.
   A build is done when offSizes, offWeights, chipLooks, sideLines and rowAlign are empty (or each line left is on purpose, with her word). */
(function (W) {
  const D = W.document;
  const SCALE_PC = [20, 18, 13, 11.5, 10.5], SCALE_PH = [16, 13, 11.5, 11];
  const rgb = s => { const m = /rgba?\(([^)]+)\)/.exec(s); if (!m) return null; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  // the colour's family: ink / white / grey, teal, red, gold, or other
  function family(c) {
    if (!c || c.a < 0.25) return "";
    const r = c.r / 255, g = c.g / 255, b = c.b / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    if (d < 0.07 || l > 0.96 || l < 0.1) return "neutral";
    const s = d / (1 - Math.abs(2 * l - 1));
    let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h = (h * 60 + 360) % 360;
    if (s < 0.1) return "neutral";
    if (h >= 165 && h <= 210) return "teal";
    if (h <= 14 || h >= 345) return "red";
    if (h >= 30 && h <= 60) return "gold";
    return "other:" + Math.round(h / 10) * 10;
  }
  const label = el => (el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".") : "")).slice(0, 60);
  W.lcmStyleAudit = function (opts) {
    opts = opts || {};
    const root = typeof opts.root === "string" ? D.querySelector(opts.root) : (opts.root || D.getElementById("pharmacyPage") || D.body);
    if (!root) return { error: "no root" };
    const phone = W.innerWidth <= 640, scale = phone ? SCALE_PH : SCALE_PC, allow = opts.palette === "app" ? ["neutral", "teal", "red", "gold"] : ["neutral", "teal", "red"];
    const cs = el => W.getComputedStyle(el), sizes = {}, offS = new Map(), offC = new Map(), side = new Map(), offW = new Map(), chipL = new Map(), looks = new Set();
    const WEIGHTS = ["400", "600", "700"];
    const DATA_MARK = ".ph-fbr-bar";   // a formula's own colour on the Fang Bing Ren Table view (a data mark by THE LOOK: "formula / pattern family colours"; her 2026-11-24 "A bars")
    const NOT_CHIP = "[class*='fold'], [class*='head'], [class*='hd'], .ph-flow-rail *, tr, td, th, .ph-tl-row, .ph-tb-i, .ph-appt-block, .ph-cal-day, .ph-cp-day, .ph-pulse-cell, .gf-row, .sg, .gf-pr, .tcd-pg, .gf-t, .ph-inv-compact-tap, .ph-hx-qrow, .ph-cx-row, .ph-fbr-row, .ph-diet-cell, .ph-rx-card, .ph-fu-summary, .ph-dose-step-main, button.item[class*='cat-'], .ph-fbr-t, .ph-shell-cell, .zl, .ph-pat-lg, .gf-ani-th, .ph-log-row, .ph-pat-cl, .ph-dash-srow, .ph-tgz-zl, .ph-cx-gl, .ph-rfc-wt, .ph-apptcal-daylabel, .ph-dp-row, .ph-sec-toggle, .ph-band-name, .ph-mc-grp > .gl, .ph-vsum-ln, .ph-sg-row";   // + the 2026-11-19 sweep: sign rows, log rows, day labels, the name band
    const TAPS = "button, select, summary, a[href], [role=button], input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=hidden]):not([type=color]):not([type=file])";
    const hexRgb = h => { h = String(h || "").trim(); const m = /^#([0-9a-f]{6})$/i.exec(h); return m ? { r: parseInt(m[1].slice(0, 2), 16), g: parseInt(m[1].slice(2, 4), 16), b: parseInt(m[1].slice(4, 6), 16) } : rgb(h); };
    let texts = 0;
    const note = (map, key, el, extra) => { const hit = map.get(key); if (hit) hit.n++; else map.set(key, { what: key, n: 1, eg: (el.textContent || "").trim().slice(0, 24), sel: label(el), extra }); };
    root.querySelectorAll("*").forEach(el => {
      if (el.closest("svg") || /^(script|style)$/i.test(el.tagName)) return;
      const st = cs(el), r = el.getBoundingClientRect();
      if (st.display === "none" || st.visibility === "hidden" || !(r.width > 0 && r.height > 0)) return;
      if ([...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) {
        texts++;
        const px = Math.round(parseFloat(st.fontSize) * 100) / 100;
        if (px === 0) return;   // words hidden on purpose (a dot-only chip keeps them for screen readers)
        sizes[px] = (sizes[px] || 0) + 1;
        if (!scale.some(v => Math.abs(v - px) < 0.06)) note(offS, px + "px", el);
        if (!WEIGHTS.includes(st.fontWeight)) note(offW, "weight " + st.fontWeight, el);
        const f = family(rgb(st.color)); if (f && !allow.includes(f)) note(offC, "text " + f, el);
      }
      const bg = family(rgb(st.backgroundColor)); if (bg && !allow.includes(bg) && !el.matches(DATA_MARK)) note(offC, "fill " + bg, el);
      // one chip look: a tappable 18-52px tall that is not a row, a head or the rail
      if (el.matches(TAPS) && r.height >= 18 && r.height <= 52 && !el.matches(NOT_CHIP)) {
        const typed = /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName), words = (el.innerText || "").trim(), bw = parseFloat(st.borderTopWidth) || 0;
        if (bw > 1.05 && st.borderTopStyle !== "none") note(chipL, "line " + st.borderTopWidth + " (want 1px)", el);
        const fc = rgb(st.backgroundColor), herb = hexRgb(st.getPropertyValue("--ph-herb"));
        if (fc && fc.a > 0.9 && family(fc) === "teal" && !el.matches(DATA_MARK) && herb && Math.abs(fc.r - herb.r) + Math.abs(fc.g - herb.g) + Math.abs(fc.b - herb.b) > 24 && (fc.r + fc.g + fc.b) / 3 < 140) note(chipL, "solid fill " + st.backgroundColor + " (want the page colour)", el);
        if (!typed && words && /\w/.test(words) && st.fontWeight !== "600") note(chipL, "words " + st.fontWeight + " (want 600)", el);
        looks.add([Math.round(r.height), st.borderTopLeftRadius, bw ? "1line" : "noline", st.fontSize, st.fontWeight].join(" "));
      }
      // a coloured line down ONE side: a 2px+ border on a single edge in a colour that is not a hairline grey
      const sides = ["Top", "Right", "Bottom", "Left"].map(s => ({ s, w: parseFloat(st["border" + s + "Width"]) || 0, st: st["border" + s + "Style"], f: family(rgb(st["border" + s + "Color"])) }));
      const thick = sides.filter(x => x.w >= 2 && x.st !== "none" && x.f && x.f !== "neutral");
      if ((el.textContent || "").trim() === "" && r.height < 30) return;   // a short empty connector (a dashed joining line) is a drawing, not a side line on a card
      if (thick.length === 1 && sides.filter(x => x.w > 0 && x.st !== "none").length === 1 && (thick[0].s === "Left" || thick[0].s === "Right")) note(side, thick[0].s.toLowerCase() + " " + thick[0].f, el);
    });
    // ROWS LINE UP: tables with a head row, and CSS-grid rows that share their column template with a head row before them
    const rowA = new Map(), BOX = "button, select, input:not([type=hidden]):not([type=checkbox]):not([type=radio]), textarea, summary, [role=button]";
    const shown = el => { const st = cs(el), r = el.getBoundingClientRect(); return st.display !== "none" && st.visibility !== "hidden" && r.width > 0 && r.height > 0; };
    const boxesIn = cell => [...cell.querySelectorAll(BOX)].filter(b => shown(b) && !b.closest("[hidden], details:not([open]) > :not(summary)") && b.closest("td, th, [data-row-cell]") === cell.closest("td, th, [data-row-cell]"));
    const cellCheck = (cell, rowEl) => {
      const bs = boxesIn(cell); if (!bs.length) return [];
      const cr = cell.getBoundingClientRect();
      bs.forEach(b => { const r = b.getBoundingClientRect(); if (r.right > cr.right + 2 || r.left < cr.left - 2) note(rowA, "spills", b, label(rowEl)); });
      const outer = bs.filter(b => !bs.some(o => o !== b && o.contains(b))), tops = outer.map(b => b.getBoundingClientRect()), mids = tops.map(r => r.top + r.height / 2);
      // a wrapped row = boxes on more than one line AND some line holding two or more (a list that stacks one box a line is fine)
      const lines = []; tops.forEach(r => { const l = lines.find(x => Math.abs(x.mid - (r.top + r.height / 2)) < r.height / 2); if (l) l.n++; else lines.push({ mid: r.top + r.height / 2, n: 1 }); });
      if (lines.length > 1 && lines.some(l => l.n > 1)) note(rowA, "wraps", cell, label(rowEl));
      return mids;
    };
    root.querySelectorAll("table").forEach(t => {
      if (!shown(t) || !t.querySelector("thead th, tr > th")) return;
      t.querySelectorAll("tbody > tr").forEach(tr => {
        if (!shown(tr) || tr.cells.length < 2) return;   // a sub-row (one cell across) opens under its row on purpose
        const mids = [...tr.cells].flatMap(td => cellCheck(td, tr));
        const ctops = [...tr.cells].filter(shown).map(td => td.getBoundingClientRect().top), sideBySide = ctops.length > 1 && Math.max(...ctops) - Math.min(...ctops) <= 4;   // a phone card (cells stacked) has no one line to share
        if (sideBySide && mids.length > 1 && tr.cells.length > 1 && Math.max(...mids) - Math.min(...mids) > 4 && ![...tr.cells].some(td => boxesIn(td).length > 1)) note(rowA, "centre", tr, label(t));
      });
    });
    root.querySelectorAll("*").forEach(head => {
      const st = cs(head); if (st.display !== "grid" || !shown(head) || head.children.length < 2) return;
      const tpl = st.gridTemplateColumns, sib = head.parentElement; if (!sib) return;
      // a column head: three or more short labels (2+ with words), no boxes; a lone label row (one text beside an empty cell) is not a head
      const hk = [...head.children], said = hk.filter(c => /[A-Za-z]/.test(c.textContent || ""));
      const isHead = hk.length >= 3 && said.length >= 2 && hk.every(c => !c.matches(BOX) && !c.querySelector(BOX) && (c.textContent || "").trim().length <= 30);
      if (!isHead) return;
      let n = head.nextElementSibling, rows = 0;
      while (n && rows < 60) {
        const ns = cs(n);
        if (ns.display === "grid" && ns.gridTemplateColumns === tpl && shown(n)) {
          rows++;
          const hc = [...head.children].filter(shown), rc = [...n.children].filter(shown);
          rc.slice(0, hc.length).forEach((c, i) => { if (Math.abs(c.getBoundingClientRect().left - hc[i].getBoundingClientRect().left) > 4) note(rowA, "off head", c, label(n)); cellCheck(c, n); });
        }
        n = n.nextElementSibling;
      }
    });
    const out = m => [...m.values()].sort((a, b) => b.n - a.n);
    return { mode: (phone ? "phone " : "desktop ") + W.innerWidth, scale, texts, sizes, offSizes: out(offS), offWeights: out(offW), chipLooks: out(chipL), looks: looks.size, offColours: out(offC), sideLines: out(side), rowAlign: out(rowA) };
  };
})(window);
