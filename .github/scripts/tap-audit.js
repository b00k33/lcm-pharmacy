/* LCM tap audit: every chip, button, dropdown, field and search box on the page against the one size.
   Her 2026-11-08 "audit chips on page - check the files to prevent future chip sizes to deviate from what i want".
   CLAUDE.md "TAPPABLE THINGS" is the rule; this script measures it. Not published (GitHub Pages lists its own files).

   HOW: in the sandbox, with the page drawn, evaluate this file's text inside the app's window (the harness iframe's
   contentWindow.eval(text)), then call lcmTapAudit() -> { mode, checked, ok, off: [...] }. Pass { root: "<selector>" } to
   audit one part of the page (default "#pharmacyPage"). Run it at 1220-1280px AND at 360px, in each state the build touches
   (menus and boxes open too: a closed one measures nothing; a side list open AND folded). A build is done when `off` is empty,
   or every line left in it is on the KEEP list below with her word. It measures sizes, not crowding: look at the page too
   (2026-11-08: every control was the right size while four table columns squeezed the words under them to 8px).

   THE SIZE (desktop, wider than 640px): 32px tall, 6px corners, 13px text (a search box 12px), icon-only = a 32px circle,
   one category's chips = one joined bar 32px tall (its segments sit inside it). THE PHONE (640px and under, STYLE-LCM.md):
   28-32px tall, 6px corners, text 12.5px or more, a field you type into 16px (less makes the phone zoom), icon-only a
   28-32px circle. Anything over 52px tall is a row or a tile, not a chip, and is not measured. */
(function (W) {
  const D = W.document;
  // the agreed exceptions (CLAUDE.md TAPPABLE THINGS "Kept", BUILD-NOTES "Chip audit sweep"): data marks, pictures, rows, cells
  const KEEP = [
    ".gf-dots button", ".gf-dots i",                 // importance dots (the Guide, Compare)
    ".gf-mcell",                                    // a value in the Guide's table (its number is data; a tap opens its box)
    ".gf-row", ".sg", ".gf-pr",                     // list rows, sign rows, search results (a row may wrap to two lines)
    ".gf-fam-fold", ".gf-picfold-head", ".ph-ftg-foldbar",   // fold heads: a section's capitals label that folds it (a heading)
    ".gf-ks-t", ".fs-scrub",                        // key-sign picture tiles; the film's scrubber (a slider)
    ".ph-tbm-ic",                                   // the top bar's circles (audited 2026-10-24; the phone's bar stays 31px)
    "input[type=checkbox]", "input[type=radio]", "input[type=range]", "input[type=color]", "input[type=file]",
    "img", "video", "canvas", "svg", "label",
    ".ph-cal-day", ".ph-cp-day", ".ph-pulse-cell", ".ph-tp-sq",   // calendar days, pulse chart cells, session grid squares
    "td", ".ph-cmp-ovl .bar button",                // a table cell that taps (its row is the target); Compare's overlap bar (a chart)
    "[data-keep-size]"                              // a control she agreed to keep at its own size: say which in the build note
  ].join(", ");
  const TAP = "button, select, a[href], input:not([type=hidden]), textarea, [role=button], [role=tab], [role=option]";
  const r1 = n => Math.round(n * 10) / 10;

  W.lcmTapAudit = function (opts) {
    opts = opts || {};
    const root = typeof opts.root === "string" ? D.querySelector(opts.root) : (opts.root || D.getElementById("pharmacyPage") || D.body);
    if (!root) return { error: "no root" };
    const phone = W.innerWidth <= 640, H = phone ? [28, 32] : [31, 33], R = [5, 7];
    const cs = el => W.getComputedStyle(el);
    const seen = new Set(), off = new Map(); let checked = 0, ok = 0;
    const vis = el => { const r = el.getBoundingClientRect(), s = cs(el); return r.width > 0 && r.height > 0 && s.visibility !== "hidden" && s.display !== "none" && +s.opacity !== 0; };
    // the tappables: real controls, plus the topmost element whose cursor is a hand (a div or span that taps)
    let list = Array.from(root.querySelectorAll(TAP));
    root.querySelectorAll("*").forEach(el => {
      if (el.closest("svg") || el.matches(TAP) || el.closest(TAP) || el.querySelector(TAP)) return;
      if (cs(el).cursor !== "pointer") return;
      const p = el.parentElement; if (p && cs(p).cursor === "pointer") return;   // the hand is inherited: count its top only
      list.push(el);
    });
    list = list.filter(el => !el.closest("svg") && !el.matches(KEEP) && !el.closest("[data-keep-size]") && vis(el));
    const add = (el, unit, why, m) => {
      const cls = Array.from(unit.classList).slice(0, 3).join(".");
      const key = unit.tagName.toLowerCase() + (cls ? "." + cls : "") + " · " + why.join(", ");
      const g = off.get(key) || { what: key, n: 0, eg: "", size: m };
      g.n++; if (!g.eg) g.eg = (el.textContent || el.value || el.placeholder || el.getAttribute("aria-label") || el.title || "").trim().replace(/\s+/g, " ").slice(0, 40);
      off.set(key, g);
    };
    list.forEach(el => {
      // a joined bar: a segment (square, no line of its own) inside a box with corners that draws the line or clips -> measure the
      // bar once (its height and corners), the segment's text only. The bar is the nearest such box, its parent or the one above.
      const own = cs(el);
      let bar = null;
      if (parseFloat(own.borderTopLeftRadius) < 2 && parseFloat(own.borderTopWidth) < 1) {
        for (let p = el.parentElement, k = 0; p && k < 2 && !bar; p = p.parentElement, k++) {
          const ps = cs(p);
          if (parseFloat(ps.borderTopLeftRadius) >= 4 && (ps.overflow.indexOf("hidden") >= 0 || parseFloat(ps.borderTopWidth) >= 1)) bar = p;
        }
      }
      const inBar = !!bar, unit = bar || el, s = cs(unit), r = unit.getBoundingClientRect(), h = r1(r.height), w = r1(r.width);
      if (h > 52) return;                                              // a row or a tile
      const es = cs(el), fs = parseFloat(es.fontSize), rad = parseFloat(s.borderTopLeftRadius);
      const txt = (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") ? "x" : (el.textContent || "").trim();
      const icon = !/[\p{L}\p{N}]/u.test(txt);
      const field = /^(INPUT|TEXTAREA)$/.test(el.tagName), search = field && (el.type === "search" || /search/i.test(el.className + " " + (el.placeholder || "")));
      const why = [];
      if (!seen.has(unit)) {
        seen.add(unit);
        if (el.tagName !== "TEXTAREA") {
          if (h < H[0] || h > H[1]) why.push("h " + h + " (want " + (phone ? "28-32" : "32") + ")");
          if (icon) { if (Math.abs(w - h) > 1.5 || rad < h / 2 - 1) why.push("icon " + w + "x" + h + " r" + rad + " (want a circle)"); }
          else if (rad < R[0] || (rad > R[1] && !inBar)) why.push("corners " + rad + " (want 6)");
          else if (inBar && (rad < R[0] || rad > R[1])) why.push("bar corners " + rad + " (want 6)");
        } else if (rad < R[0] || rad > R[1]) why.push("corners " + rad + " (want 6)");
      }
      if (!icon) {
        if (phone) { if (field && fs < 16) why.push("text " + fs + " (a field wants 16 on the phone)"); else if (fs < 12.5) why.push("text " + fs + " (want 12.5+)"); }
        else if (search ? (fs < 12 || fs > 13) : (fs < 12.5 || fs > 13.5)) why.push("text " + fs + " (want " + (search ? "12" : "13") + ")");
      }
      checked++;
      if (why.length) add(el, unit, why, w + "x" + h + " r" + rad + " " + fs + "px"); else ok++;
    });
    return { mode: phone ? "phone " + W.innerWidth : "desktop " + W.innerWidth, checked, ok, off: Array.from(off.values()).sort((a, b) => b.n - a.n) };
  };
})(window);
