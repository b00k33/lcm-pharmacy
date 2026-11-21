/* LCM voice audit: the WORDS and tap shapes on a page against the rules she set. Sister of tap-audit.js (control sizes),
   style-audit.js (text sizes, colours, side lines) and titlebar-audit.js (the top bar). Not published (GitHub Pages lists its own files).
   Her 2026-11-21 "audit lcm codes ... embed my personality into the design of the app for current and future builds" (her design
   profile: ABOUT-ME.md "HER DESIGN PROFILE", rules Exact · Simple · Efficient); she picked "a build is not done until the list is empty".

   HOW: in the sandbox, with the page drawn (menus and boxes open too), evaluate this file's text inside the app's window, then call
   lcmVoiceAudit() -> { mode, checked, ok, off: [{ kind, what, eg, n }] }. Pass { root: "<selector>" } to audit one part (default
   "#pharmacyPage"). Run it on every page the build touches, at 1220-1280px AND at 360px. A build is done when `off` is empty,
   or every line left in it is on the KEEP list below with her word.

   THE RULES this measures (CLAUDE.md top, ABOUT-ME.md "What I dislike", her notes 2026-10-13 / 10-14 / 11-18)
   - example   "e.g.", "for example", "such as" in shown words or a placeholder (her 2026-10-13: no "e.g." example text).
   - suggest   "suggested", "recommended", "best fit", "consider", "you may / might want" (no suggestions, no recommended options).
   - hint      a line that starts "Tip", "Hint", "Note:", "How to" (no hints, notes, legends, why-lines on patient pages, 2026-11-18).
   - tell      a line that tells her how to use the page: starts Tap / Click / Press / Use / Select / Choose / Enter / Drag / Swipe and runs
               5 words or more, or says "tap here" / "click here" (no how-to sentences on screen).
   - long      a sentence of 9 words or more ending in a full stop, in the app's own words (not her data): explaining lines.
   - link      an <a href> that is not drawn as a chip (a border or a fill), or a tap target drawn as underlined text
               (her 2026-10-14: no text links, every tap is a chip or a button).
   NOT audited: text she or a patient typed (inputs, textareas), svg pictures, the Guide's study sentences (#phGuideWrap: its
   placeholders, links and buttons ARE audited) and anything marked data-voice-skip (a letter, a clinical quote, a patient message she wrote). Hover text (title) is not audited. */
(function (W) {
  const D = W.document;
  const SKIP = "script, style, textarea, input, select, option, svg, noscript, [contenteditable], [hidden], [data-voice-skip], .ph-voice-skip";   // never audited
  const PROSE = "#phGuideWrap";   // the Guide's study text is content, not the app's own words: its sentences are skipped, but its placeholders, links and buttons are still audited
  // her word on each line left in `off` (kind + a regex on the words); empty = nothing excused
  const KEEP = [];
  const RX = {
    example: /\be\.g\.|\bfor example\b|\bsuch as\b/i,
    suggest: /\bsuggest(?:ed|ion|ions)?\b|\brecommend(?:ed|ation|ations)?\b|\bbest fit\b|\bconsider\b|\byou (?:may|might) (?:want|like)\b/i,
    hint: /^\s*(?:tip|hint|pro tip|how to)\b|^\s*note\s*:/i,
    tellStart: /^\s*(?:tap|click|press|use|select|choose|enter|drag|swipe)\b/i,
    tellHere: /\b(?:tap|click) here\b/i
  };
  const words = s => (s.match(/\S+/g) || []).length;
  const clip = s => s.replace(/\s+/g, " ").trim().slice(0, 60);
  const shown = e => { if (!e || !e.getClientRects || !e.getClientRects().length) return false; const s = W.getComputedStyle(e); return s.visibility !== "hidden" && s.display !== "none"; };
  W.lcmVoiceAudit = function (opts) {
    const root = D.querySelector((opts && opts.root) || "#pharmacyPage");
    if (!root) return { error: "root not on screen" };
    const found = new Map(), add = (kind, what, el) => {
      if (KEEP.some(k => k.kind === kind && k.re.test(what))) return;
      const key = kind + "|" + what, o = found.get(key);
      if (o) o.n++; else found.set(key, { kind, what: clip(what), eg: el ? (el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/)[0] : "")) : "", n: 1 });
    };
    let checked = 0;
    const lineChecks = (t, el, isControl) => {
      checked++;
      if (RX.example.test(t)) add("example", t, el);
      if (RX.suggest.test(t)) add("suggest", t, el);
      if (RX.hint.test(t)) add("hint", t, el);
      if (RX.tellHere.test(t) || (RX.tellStart.test(t) && words(t) >= 5 && !isControl)) add("tell", t, el);
      if (!isControl && words(t) >= 9 && /[.](?:["')\]]*)\s*$/.test(t)) add("long", t, el);
    };
    const tw = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: n => !n.textContent.trim() || n.parentElement.closest(SKIP + ", " + PROSE) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT });
    let n;
    while ((n = tw.nextNode())) {
      const el = n.parentElement; if (!shown(el)) continue;
      lineChecks(n.textContent.replace(/\s+/g, " ").trim(), el, !!el.closest("button, [role=button], a, label, th, option, summary"));
    }
    root.querySelectorAll("[placeholder]").forEach(e => { if (e.closest("[data-voice-skip], .ph-voice-skip") || !shown(e)) return; const p = e.getAttribute("placeholder") || ""; if (p) lineChecks(p, e, true); });
    root.querySelectorAll("a[href]").forEach(e => {
      if (!shown(e) || e.closest(SKIP)) return; checked++;
      const s = W.getComputedStyle(e), box = (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== "none") || (s.backgroundColor && !/rgba?\(0, 0, 0, 0\)|transparent/.test(s.backgroundColor));
      if (!box) add("link", e.textContent || e.getAttribute("href") || "a link", e);
    });
    root.querySelectorAll("button, [role=button]").forEach(e => {
      if (!shown(e) || e.closest(SKIP)) return;
      const s = W.getComputedStyle(e), ul = (s.textDecorationLine || "").includes("underline"), box = (parseFloat(s.borderTopWidth) > 0 && s.borderTopStyle !== "none") || !/rgba?\(0, 0, 0, 0\)|transparent/.test(s.backgroundColor);
      if (ul && !box) add("link", (e.textContent || e.getAttribute("aria-label") || "a button").trim(), e);
    });
    const off = [...found.values()].sort((a, b) => a.kind.localeCompare(b.kind) || b.n - a.n);
    return { mode: (W.innerWidth <= 640 ? "phone " : "desktop ") + W.innerWidth, checked, ok: checked - off.reduce((s, o) => s + o.n, 0), off };
  };
})(window);
