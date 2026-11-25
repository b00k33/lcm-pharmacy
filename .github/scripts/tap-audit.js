/* LCM tap audit: every chip, button, dropdown, field and search box on the page against the one size.
   Her 2026-11-08 "audit chips on page - check the files to prevent future chip sizes to deviate from what i want".
   CLAUDE.md "TAPPABLE THINGS" is the rule; this script measures it. Not published (GitHub Pages lists its own files).

   HOW: in the sandbox, with the page drawn, evaluate this file's text inside the app's window (the harness iframe's
   contentWindow.eval(text)), then call lcmTapAudit() -> { mode, checked, ok, off: [...] }. Pass { root: "<selector>" } to
   audit one part of the page (default "#pharmacyPage"). Run it at 1220-1280px AND at 360px, in each state the build touches
   (menus and boxes open too: a closed one measures nothing; a side list open AND folded). A build is done when `off` is empty,
   or every line left in it is on the KEEP list below with her word. It measures sizes, not crowding: look at the page too
   (2026-11-08: every control was the right size while four table columns squeezed the words under them to 8px).

   THE SIZE (desktop, wider than 640px): 32px tall, 6px corners, 13px text (a search box too, her 5-size type scale 2026-11-18), icon-only = a 32px circle,
   one category's chips = one joined bar 32px tall (its segments sit inside it). THE PHONE (640px and under, STYLE-LCM.md):
   28-32px tall, 6px corners, text 12.5px or more, a field you type into 16px (less makes the phone zoom), icon-only a
   28-32px circle. Anything over 52px tall is a row or a tile, not a chip, and is not measured. */
(function (W) {
  const D = W.document;
  // the agreed exceptions (CLAUDE.md TAPPABLE THINGS "Kept", BUILD-NOTES "Chip audit sweep"): data marks, pictures, rows, cells
  const KEEP = [
    ".apo-d", ".apo-selw select",                  // the apothecary band's drawers (50px), specimen jars (58px), moss Add button and brass knob (38px): her 2026-11-26 "make it more realistic with animated interactive elements", Herbs & stock from 641px only
    ".ph-apo-vt",                                   // a stock filter tile on Inventory with its plant in a test tube (her 2026-11-26 apothecary): a stat tile, 76px, 10px corners
    "#phGuideWrap > .ph-shell-topblock .ph-place-bar button", ".ph-gd-room .gd-tabs button",   // the Guide's folder index tabs (her 2026-11-25 "library inspired" tabs, pick A of mock-guide-tabs.html): a tab keeps its top corners and its two heights, closed / open: 34 / 42 on the top bar, 30 / 34 on the sheet, 26 / 29 above a table
    ".gf-dots button", ".gf-dots i",                 // importance dots (the Guide, Compare)
    ".gf-pc",                                       // a Key sign Polaroid on a Guide formula card: a photo of the sign with its words under it, 118px wide (her 2026-11-25 "polaroid pictures", pick B Pinned)
    ".tc-half",                                     // a half of a day file's label on the Guide's Cases Shelf (AM / PM, 34px, a picture of her real lever-arch files; her 2026-11-25 "Day files in the room")
    ".gf-bk",                                       // a book on the Guide's stack: a picture of her real books, spine 32px, the family's colour, capitals (her 2026-11-25 "as if the books stack on each other")
    ".gf-mcell",                                    // a value in the Guide's table (its number is data; a tap opens its box)
    ".gf-row", ".sg", ".gf-pr",                     // list rows, sign rows, search results (a row may wrap to two lines)
    ".tcd-pg",                                      // a case row (Guide > Cases list, Timetable): its picture beside the name and formula, two lines (her 2026-11-13 vertical space audit)
    ".zl.ln",                                       // a case's sign line: a row that opens its sign choices (her 2026-11-16 mock "tap any line to change its sign")
    ".gf-fam-fold", ".gf-picfold-head", ".ph-ftg-foldbar", ".ph-cs-gfold",   // fold heads: a section's capitals label that folds it (a heading); the Cycle page's Period fold (her 2026-11-21)
    ".gf-ks-t", ".fs-scrub", ".gf-ani-th",                        // key-sign picture tiles; the film's scrubber (a slider); the Animation pane's picture buttons (2026-11-10)
    ".ph-tbm-ic",                                   // the top bar's circles (audited 2026-10-24; the phone's bar stays 31px)
    ".ph-flow-rail button.nm",                      // the patient's name heading the rail: a title, 18px (her 5-size type scale, 2026-11-18)
    "input[type=checkbox]", "input[type=radio]", "input[type=range]", "input[type=color]", "input[type=file]",
    "img", "video", "canvas", "svg", "label",
    ".ph-cal-day", ".ph-cp-day", ".ph-pulse-cell", ".ph-tp-sq", ".ph-cp .ffgrid .c",   // calendar days, pulse chart cells, session grid squares (the Cycle page's month: 44px days, her 2026-11-21 pick)
    ".ph-appt-block", ".ph-apptcal-daylabel", ".ph-atb-today", ".ph-c22-life",     // Appointments' calendar: a booking's block (its height is its time), her own block (pictures only since her 2026-11-21 pick A), a day's head, Today's date in a circle (2026-11-17)
    ".ph-tb-i",                                     // the Appointments toolbar's tiles: an icon over its word (her 2026-11-05 toolbar)
    "td", ".ph-cmp-ovl .bar button",                // a table cell that taps (its row is the target); Compare's overlap bar (a chart)
    ".ph-tl-row", "tr", ".ph-th-sort", ".ph-ost-hb", ".ph-inv-compact-tap",   // list and table rows, a column's sort head, a herb block's head row (rows, not chips; 2026-11-18)
    ".ph-shell-strip", ".ph-shell-cell",            // the head's stat tiles (number over its word)
    ".ph-settings-card", ".ph-settings-cardhead", ".ph-reloc-list-head", "summary.ph-hf-label", ".ph-ivf-foldhd",   // fold rows: a section's name that opens it
    ".field-bare", ".ph-qty-lock",                  // a bare box inside its own bordered box (the box is the measured one); a value she taps to edit (empty shows "—")
    ".ph-hx-qrow", ".ph-cx-row", ".ph-fbr-row", ".ph-diet-cell", ".ph-rx-card", ".ph-fu-summary", ".ph-tp-fm", ".ph-dose-step-main",   // question rows, tiles and cards that tap
    ".ph-cx.b .pills.w .ph-cx-pill",                 // Today's visit: a sign's four answer cells, a 56x32 target with its dot drawn inside (her 2026-11-18 "i like b")
    ".ph-cx .nm[data-cx-rn]",                      // Better / worse on a phone: a complaint's name is a title row that wraps whole and opens its details (her 2026-11-19 "a long name still wraps whole, never cut"; found 2026-11-24)
    ".ph-pick-row",                                // a herb / formula search result in the add box: a row that may wrap to two lines and picks (a result list, not a chip; found 2026-11-24 on the Herbs page)
    ".ph-vsum-ln",                                  // the visit summary card's fact lines: a row that opens its page (her 2026-11-20 "build all three")
    ".ph-sg-row",                                   // a surgery: the row opens its form to change it (her 2026-11-21 "how to edit the surgeries?")
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
      // a bare field inside a filled box with corners (the tinted field look: an icon, then the words she types) -> the box is the field
      const own = cs(el), bare = /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName);
      const filled = (p, ps) => bare && !/^(transparent|rgba\(0, 0, 0, 0\))$/.test(ps.backgroundColor) && p.getBoundingClientRect().height <= 52;
      let bar = null;
      if (parseFloat(own.borderTopLeftRadius) < 2 && parseFloat(own.borderTopWidth) < 1) {
        for (let p = el.parentElement, k = 0; p && k < 2 && !bar; p = p.parentElement, k++) {
          const ps = cs(p);
          if (parseFloat(ps.borderTopLeftRadius) >= 4 && (ps.overflow.indexOf("hidden") >= 0 || parseFloat(ps.borderTopWidth) >= 1 || filled(p, ps))) bar = p;
        }
      }
      const inBar = !!bar, unit = bar || el, s = cs(unit), r = unit.getBoundingClientRect(), h = r1(r.height), w = r1(r.width);
      if (h > 52) return;                                              // a row or a tile
      const es = cs(el), fs = parseFloat(es.fontSize), rad = parseFloat(s.borderTopLeftRadius);
      // words drawn at 0px are hidden (a Button that becomes a circle keeps its word for the screen reader): it is icon-only
      const txt = (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT") ? "x" : fs < 1 ? "" : (el.textContent || "").trim();
      const icon = !/[\p{L}\p{N}]/u.test(txt);
      const field = /^(INPUT|TEXTAREA)$/.test(el.tagName), search = field && (el.type === "search" || /search/i.test(el.className + " " + (el.placeholder || "")));
      const why = [];
      if (!seen.has(unit)) {
        seen.add(unit);
        if (el.tagName !== "TEXTAREA") {
          if (h < H[0] || h > H[1]) why.push("h " + h + " (want " + (phone ? "28-32" : "32") + ")");
          if (icon && !inBar) { if (Math.abs(w - h) > 1.5 || rad < h / 2 - 1) why.push("icon " + w + "x" + h + " r" + rad + " (want a circle)"); }
          else if (rad < R[0] || (rad > R[1] && !inBar)) why.push("corners " + rad + " (want 6)");
          else if (inBar && (rad < R[0] || rad > R[1])) why.push("bar corners " + rad + " (want 6)");
        } else if (rad < R[0] || rad > R[1]) why.push("corners " + rad + " (want 6)");
      }
      if (!icon) {
        if (phone) { if (field && fs < 16) why.push("text " + fs + " (a field wants 16 on the phone)"); else if (fs < 12.5) why.push("text " + fs + " (want 12.5+)"); }
        else if (fs !== 13) why.push("text " + fs + " (want 13)");
      }
      checked++;
      if (why.length) add(el, unit, why, w + "x" + h + " r" + rad + " " + fs + "px"); else ok++;
    });
    return { mode: phone ? "phone " + W.innerWidth : "desktop " + W.innerWidth, checked, ok, off: Array.from(off.values()).sort((a, b) => b.n - a.n) };
  };
})(window);
