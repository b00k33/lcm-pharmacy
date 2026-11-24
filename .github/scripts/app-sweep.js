/* LCM whole-app sweep: runs tap-audit, style-audit and voice-audit on EVERY sidebar page and on every patient page (all three kinds of visit),
   at whatever width the window is, and returns what is left plus a count of the distinct chip looks. Added 2026-11-24 (her "do an audit of the
   whole app because i keep finding inconsistent chips and fonts and font sizes"): a page-by-page audit misses the pages nobody opened, so this one
   opens them all. Not published (GitHub Pages lists its own files).

   HOW (sandbox copy of the app served from a folder that also holds .github/scripts/, a made-up patient, the window at 1240 wide, then again at 360):
     1. Make a patient:  const rec = phPatientRec("Zz Audit Patient"); PRESC.items.push({ id: uid(), name: "Zz Audit Patient", kind: "patient", items: [] });
        Object.assign(rec, { sex: "F", dob: "1984-03-12", phone: "0400 000 000" }); savePharmacy();      (add a plan, a cycle, visits for a fuller page)
     2. Evaluate this file's text in the page, then:  await lcmAppSweep({ patient: "Zz Audit Patient" })
        It returns { width, pages: { "<page>": { tap, sz, w, chip, sl, row, vo } }, left: [ "<finding> <= <pages>" ], looks: [ "<n>x <height size weight corners line fill ink> [pages] eg" ] }.
        Takes about 3 minutes; run it in the background (not awaited) and read window.__appSweep when window.__appSweepDone is true.
   A build is done when `left` has no line that is not named in the build note (a calendar tile, the End of day prompt text and a joined bar's inner
   buttons are known false flags). `looks` is the list to read by eye: the dominant look is 32 / 13 / 600 / 6 / 1px / white / ink; a line far from it on
   a few pages is the next straggler. */
(function (W) {
  const D = W.document, wait = ms => new Promise(r => setTimeout(r, ms));
  const TABS = ["appointments", "prescriptions", "communications", "intake", "photos", "inventory", "refill", "restock", "stats", "stocktake", "pricereview", "dashboard", "suppliers", "log", "dispenses", "directory", "alltemplates", "endofday", "guide", "relocation", "journey", "settings"];
  const fam = s => { const m = /rgba?\(([^)]+)\)/.exec(s || ""); if (!m) return "-"; const p = m[1].split(/[ ,\/]+/).filter(Boolean).map(Number); if (p.length > 3 && p[3] < 0.25) return "none"; const [r, g, b] = p; const mx = Math.max(r, g, b), mn = Math.min(r, g, b); if (mx - mn < 18) return mx > 235 ? "white" : mx < 70 ? "ink" : "grey"; if (g > r && b > r) return "teal" + (mx < 130 ? "-deep" : mx > 200 ? "-pale" : ""); if (r > g && r > b && g < 120) return "red"; return "c" + [r, g, b].map(x => x >> 5).join(""); };
  const LK = {};
  function looks(label) {
    const root = D.querySelector("#pharmacyPage"); if (!root) return;
    const sel = "button, select, summary, [role=button], input:not([type=checkbox]):not([type=radio]):not([type=range]):not([type=hidden]):not([type=color]):not([type=file])";
    const SKIP = ".ph-sb *, #phSidebar *, .ph-flow-rail *, tr *, td *, th *, .ph-cal-day *, .ph-appt-block *, [class*='fold'] *, [data-keep-size]";
    root.querySelectorAll(sel).forEach(el => {
      const r = el.getBoundingClientRect(); if (r.width < 2 || r.height < 2 || el.closest(SKIP) || el.matches("[data-keep-size]")) return;
      const cs = W.getComputedStyle(el); if (cs.visibility === "hidden" || cs.display === "none") return;
      const txt = (/^(INPUT|SELECT)$/.test(el.tagName) ? el.getAttribute("placeholder") || el.getAttribute("aria-label") || "" : el.textContent).trim().slice(0, 18);
      const bw = Math.max(parseFloat(cs.borderTopWidth) || 0, parseFloat(cs.borderLeftWidth) || 0);
      const key = [Math.round(r.height), parseFloat(cs.fontSize), cs.fontWeight, parseFloat(cs.borderTopLeftRadius) >= 99 ? "pill" : Math.round(parseFloat(cs.borderTopLeftRadius)), bw ? bw + "px" : "0", fam(cs.backgroundColor), fam(cs.color)].join(" ");
      const o = LK[key] || (LK[key] = { n: 0, pg: {}, eg: [] }); o.n++; o.pg[label] = 1; if (o.eg.length < 3) o.eg.push((typeof el.className === "string" && el.className.split(" ")[0] || el.tagName) + ":" + txt);
    });
  }
  async function loadAudits() {
    for (const n of ["tap", "style", "voice"]) (0, eval)(await fetch("/.github/scripts/" + n + "-audit.js?" + Date.now()).then(r => r.text()));
  }
  function audit() {
    const root = "#pharmacyPage", o = {};
    const hid = [...D.querySelectorAll("#pharmacyPage details:not([open]) .ddl")].map(e => (e.style.display = "none", e));
    const t = W.lcmTapAudit({ root }), s = W.lcmStyleAudit({ root }), v = W.lcmVoiceAudit({ root });
    o.tap = t.off.map(x => x.what + " x" + x.n + " eg:" + x.eg);
    o.sz = s.offSizes.map(x => x.what + " " + x.sel); o.w = (s.offWeights || []).map(x => x.what + " " + x.sel);
    o.chip = (s.chipLooks || []).map(x => x.what + " " + x.sel); o.sl = s.sideLines.map(x => x.what + " " + x.sel);
    o.row = (s.rowAlign || []).map(x => x.what + " " + x.sel).slice(0, 6); o.vo = v.off.map(x => x.kind + ":" + x.what);
    hid.forEach(e => (e.style.display = ""));
    Object.keys(o).forEach(k => { if (!o[k].length) delete o[k]; });
    return o;
  }
  // the app's own state (PHARMACY, PRESC, presStage ...) is declared with let / const: reach it by its bare name, never through window
  W.lcmAppSweep = async function (opts) {
    opts = opts || {}; W.__appSweepDone = false; const pages = W.__appSweep = {};
    if (!D.getElementById("__noanim")) { const c = D.createElement("style"); c.id = "__noanim"; c.textContent = "*,*::before,*::after{animation:none!important;transition:none!important}"; D.head.appendChild(c); }
    await loadAudits();
    const one = async label => { pages[label] = audit(); looks(label); };
    for (const t of TABS) { try { PHARMACY.activeTab = t; presOpenId = null; presEditId = null; presDraft = null; renderPharmacy(); await wait(700); await one(t); } catch (e) { pages[t] = { err: String(e).slice(0, 100) }; } }
    const item = opts.patient && PRESC.items.find(x => x.name === opts.patient);
    if (item) {
      const open = async () => { PHARMACY.activeTab = "prescriptions"; renderPharmacy(); presOpenScript(item.id); presStage = "profile"; presStageForId = item.id; presAssessTab = null; presVkMenu = false; renderPresPanel(); await wait(700); };
      for (const kind of ["acumsk", "herb", "acuint"]) {
        item.visitKind = kind; await open();
        const seen = new Set(), list = [];
        D.querySelectorAll("#presPanel [data-flow-go],#presPanel [data-flow-prof],#presPanel [data-pres-stage]").forEach(b => { const a = b.dataset.flowGo ? ["data-flow-go", b.dataset.flowGo] : b.dataset.flowProf ? ["data-flow-prof", b.dataset.flowProf] : ["data-pres-stage", b.dataset.presStage]; if (!seen.has(a.join("="))) { seen.add(a.join("=")); list.push(a); } });
        for (const [a, v] of list) { try { await open(); const b = D.querySelector(`#presPanel [${a}="${v}"]`); if (!b) continue; b.click(); await wait(900); await one(kind + " " + v); } catch (e) { pages[kind + " " + v] = { err: String(e).slice(0, 100) }; } }
      }
      delete item.visitKind;
    }
    const left = {};
    for (const k in pages) for (const f of ["tap", "sz", "w", "chip", "sl", "row", "vo"]) (pages[k][f] || []).forEach(s => { const key = f + " " + s.replace(/ x\d+/, "").slice(0, 170); (left[key] = left[key] || new Set()).add(k.replace(/^(acumsk|herb|acuint) /, "")); });
    W.__appSweepDone = true;
    return { width: W.innerWidth, pages, left: Object.entries(left).map(([s, ks]) => s + "  <= " + [...ks].join(", ")), looks: Object.entries(LK).sort((a, b) => b[1].n - a[1].n).map(([k, o]) => o.n + "x " + k + " [" + Object.keys(o.pg).length + "] " + o.eg.slice(0, 2).join(" ; ")) };
  };
  return "lcmAppSweep ready";
})(window)
