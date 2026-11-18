/* LCM style audit: the text sizes, the colours and the coloured side lines on a page against the standards she set on 2026-11-18.
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
   - SIDE LINES (her 2026-11-03): no coloured line down one side of anything; a dot or a tint instead. */
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
    const cs = el => W.getComputedStyle(el), sizes = {}, offS = new Map(), offC = new Map(), side = new Map();
    let texts = 0;
    const note = (map, key, el, extra) => { const hit = map.get(key); if (hit) hit.n++; else map.set(key, { what: key, n: 1, eg: (el.textContent || "").trim().slice(0, 24), sel: label(el), extra }); };
    root.querySelectorAll("*").forEach(el => {
      if (el.closest("svg") || /^(script|style)$/i.test(el.tagName)) return;
      const st = cs(el), r = el.getBoundingClientRect();
      if (st.display === "none" || st.visibility === "hidden" || !(r.width > 0 && r.height > 0)) return;
      if ([...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim())) {
        texts++;
        const px = Math.round(parseFloat(st.fontSize) * 100) / 100;
        sizes[px] = (sizes[px] || 0) + 1;
        if (!scale.some(v => Math.abs(v - px) < 0.06)) note(offS, px + "px", el);
        const f = family(rgb(st.color)); if (f && !allow.includes(f)) note(offC, "text " + f, el);
      }
      const bg = family(rgb(st.backgroundColor)); if (bg && !allow.includes(bg)) note(offC, "fill " + bg, el);
      // a coloured line down ONE side: a 2px+ border on a single edge in a colour that is not a hairline grey
      const sides = ["Top", "Right", "Bottom", "Left"].map(s => ({ s, w: parseFloat(st["border" + s + "Width"]) || 0, st: st["border" + s + "Style"], f: family(rgb(st["border" + s + "Color"])) }));
      const thick = sides.filter(x => x.w >= 2 && x.st !== "none" && x.f && x.f !== "neutral");
      if (thick.length === 1 && sides.filter(x => x.w > 0 && x.st !== "none").length === 1 && (thick[0].s === "Left" || thick[0].s === "Right")) note(side, thick[0].s.toLowerCase() + " " + thick[0].f, el);
    });
    const out = m => [...m.values()].sort((a, b) => b.n - a.n);
    return { mode: (phone ? "phone " : "desktop ") + W.innerWidth, scale, texts, sizes, offSizes: out(offS), offColours: out(offC), sideLines: out(side) };
  };
})(window);
