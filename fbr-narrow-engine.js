/* Narrow-down engine for Fang Bing Ren questions.
   Pure functions (no DOM). Reads window.NQ_DATA = the app's real weight tables.

   Idea in one line: every family has a "how likely is this sign if the patient IS this family" number
   (her 0-5 weights; a negative weight = it counts AGAINST the family). Each Yes/No she gets multiplies every
   family's chance up or down. The next question is always the one that will move the chances apart the most. */
(function () {
  const D = window.NQ_DATA, FAMS = Object.keys(D.F);
  const parse = s => { const o = {}; s.split(";").forEach(t => { if (!t) return; const i = t.lastIndexOf(":"); o[t.slice(0, i)] = +t.slice(i + 1); }); return o; };
  const W = {}; FAMS.forEach(f => { W[f] = { d: parse(D.F[f].b), p: parse(D.F[f].r) }; });
  const KEYS = { d: Object.keys(D.lab.d), p: Object.keys(D.lab.p) };
  const LABEL = (kind, key) => D.lab[kind][key] || key;
  const kindOf = key => (D.lab.p[key] != null ? "p" : "d");

  // ---- cancel-outs between SIGNS (one answer settles another, so it is never asked) ----
  const BASE_OPP = D.opp;
  // proposed additions (tongue coat, temperature, pulse, stool, muscle): same question answered two ways
  const EXTRA_OPP = {
    body_hot_tend: ["cold_sens", "cold_lower_body_tend"], cold_sens: ["body_hot_tend"], cold_lower_body_tend: ["body_hot_tend"],
    white_coat: ["coat_yellow", "coat_thick_dry"], coat_yellow: ["white_coat", "coat_white_slippery"], coat_thick_dry: ["white_coat", "coat_white_slippery"],
    coat_white_slippery: ["coat_dry_yellow_tend", "coat_yellow", "coat_thick_dry"], coat_dry_yellow_tend: ["coat_white_slippery", "white_coat"],
    tongue_very_dry_tend: ["coat_moist_slippery_greasy", "tongue_pale_flabby_wet"], coat_moist_slippery_greasy: ["tongue_very_dry_tend"], tongue_pale_flabby_wet: ["tongue_very_dry_tend"],
    soft_loose_muscle: ["muscle_hard_tend", "robust_firm_build"], muscle_hard_tend: ["soft_loose_muscle"],
    diarrhea: ["constipation_now"], constipation_now: ["diarrhea"],
    pulse_float_large: ["pulse_faint_sinking_weak_tend"], pulse_faint_sinking_weak_tend: ["pulse_float_large"],
    complexion_pale_lusterless: ["complexion_red_oily"], complexion_red_oily: ["complexion_pale_lusterless"]
  };
  const EXTRA_LIST = Object.keys(EXTRA_OPP);
  function oppOf(key, useExtra) {
    const a = (BASE_OPP[key] || []).slice();
    if (useExtra && EXTRA_OPP[key]) EXTRA_OPP[key].forEach(k => { if (!a.includes(k)) a.push(k); });
    return a;
  }

  // ---- the likelihood: how likely is a YES to this sign if the patient is family f ----
  // 5 -> 0.90, 4 -> 0.74, 3 -> 0.58, 2 -> 0.42, 1 -> 0.26, not in its table -> 0.10 (anyone can have it), negative -> 0.05 (counts against)
  const yp = w => { w = w || 0; return w < 0 ? 0.05 : Math.min(0.90, 0.10 + 0.16 * w); };
  const wOf = (f, kind, key) => W[f][kind][key] || 0;

  function posterior(ans, only) {
    const lp = FAMS.map(() => 0);
    for (const a of ans) {
      if (a.auto || a.val == null) continue;
      if (only && a.kind !== only) continue;
      FAMS.forEach((f, i) => { const y = yp(W[f][a.kind][a.key]); lp[i] += Math.log(a.val ? y : 1 - y); });
    }
    const m = Math.max(...lp), e = lp.map(x => Math.exp(x - m)), s = e.reduce((a, b) => a + b, 0);
    return e.map(x => x / s);
  }
  const H = p => p.reduce((s, x) => (x > 0 ? s - x * Math.log2(x) : s), 0);

  function renSettled(ans, p) {
    const n = ans.filter(a => a.kind === "p" && !a.auto && a.val != null).length;
    const pr = posterior(ans, "p");
    return n >= 6 || Math.max(...pr) >= 0.6;
  }

  // ---- THE QUESTION PICKER: biggest expected drop in uncertainty ----
  function nextQuestion(ans, opts) {
    opts = opts || {};
    const asked = new Set(ans.map(a => a.kind + ":" + a.key));
    const p = posterior(ans), H0 = H(p);
    const renOnly = opts.order === "ren-first" && !renSettled(ans, p);
    let best = null;
    for (const kind of ["p", "d"]) {
      if (renOnly && kind === "d") continue;
      for (const key of KEYS[kind]) {
        if (asked.has(kind + ":" + key)) continue;
        let q = 0; const ys = FAMS.map((f, i) => { const y = yp(W[f][kind][key]); q += p[i] * y; return y; });
        if (q < 1e-4 || q > 1 - 1e-4) continue;
        let hy = 0, hn = 0;
        FAMS.forEach((f, i) => { const py = p[i] * ys[i] / q, pn = p[i] * (1 - ys[i]) / (1 - q); if (py > 0) hy -= py * Math.log2(py); if (pn > 0) hn -= pn * Math.log2(pn); });
        const ig = H0 - q * hy - (1 - q) * hn + (kind === "p" ? 0.003 : 0);   // a lifelong (Ren) answer wins an exact tie: it never goes stale
        if (!best || ig > best.ig + 1e-9) best = { kind, key, ig, q };
      }
    }
    if (best) best.why = whyText(best, p);
    return best && best.ig > 0.005 ? best : null;
  }
  function whyText(q, p) {
    const alive = FAMS.map((f, i) => ({ f, i, p: p[i], w: wOf(f, q.kind, q.key) })).filter(x => x.p >= 0.04).sort((a, b) => b.p - a.p);
    if (alive.length < 2) return "";
    const hi = alive.slice().sort((a, b) => b.w - a.w || b.p - a.p)[0], lo = alive.slice().sort((a, b) => a.w - b.w || b.p - a.p)[0];
    if (hi.f === lo.f || hi.w === lo.w) return "";
    const name = f => D.F[f].n;
    return hi.w >= 3
      ? `Separates <b>${name(hi.f)}</b> (key sign, ${hi.w}) from <b>${name(lo.f)}</b> (${lo.w < 0 ? "counts against it" : lo.w === 0 ? "not typical" : "weak, " + lo.w}).`
      : `Helps tell <b>${name(hi.f)}</b> and <b>${name(lo.f)}</b> apart.`;
  }

  // ---- what her old Quick assess does today, for the benchmark only (highest-weight unanswered sign of the top 3 by points, Ren first) ----
  function nextQuestionOld(ans) {
    const asked = new Set(ans.map(a => a.kind + ":" + a.key));
    const pts = FAMS.map(f => ans.reduce((s, a) => s + (a.val && !a.auto ? Math.max(0, wOf(f, a.kind, a.key)) : 0), 0));
    const order = FAMS.map((f, i) => i).sort((a, b) => pts[b] - pts[a] || a - b).slice(0, 3);
    for (const kind of ["p", "d"]) for (const i of order) {
      const f = FAMS[i], cand = Object.keys(W[f][kind]).filter(k => !asked.has(kind + ":" + k) && W[f][kind][k] > 0).sort((a, b) => W[f][kind][b] - W[f][kind][a]);
      if (cand.length) return { kind, key: cand[0] };
    }
    return null;
  }

  // ---- apply an answer (+ the cancel-outs it triggers) ----
  function applyAnswer(ans, kind, key, val, useExtra) {
    const out = ans.slice(), events = [];
    out.push({ kind, key, val });
    if (val === true) {
      oppOf(key, useExtra).forEach(o => {
        const ok = kindOf(o);
        if (!out.some(a => a.key === o && a.kind === ok)) { out.push({ kind: ok, key: o, val: false, auto: true, from: key }); events.push({ t: "auto", text: `Also marked <b>No</b>, not asked: “${LABEL(ok, o)}”`, because: `you said Yes to “${LABEL(kind, key)}”` }); }
      });
    }
    return { ans: out, events };
  }
  function dropEvents(before, after, kind, key, val) {
    const ev = [];
    FAMS.forEach((f, i) => {
      const b = before[i], a = after[i];
      if (b < 0.04 || a >= b / 2.5) return;
      const w = wOf(f, kind, key);
      const why = val && w < 0 ? `a Yes to “${LABEL(kind, key)}” counts against it`
        : !val && w >= 4 ? `“${LABEL(kind, key)}” is one of its key signs and you said No`
        : val && w === 0 ? `“${LABEL(kind, key)}” isn't typical of it`
        : !val && w >= 2 ? `you said No to “${LABEL(kind, key)}” which it usually has` : `the answer fits it less`;
      ev.push({ t: "drop", fam: f, from: b, to: a, text: `<b>${D.F[f].n}</b> ${Math.round(b * 100)}% → ${Math.round(a * 100)}%`, because: why });
    });
    // many families falling for the same reason read as ONE line, not a wall
    const by = {};
    ev.forEach(e => { (by[e.because] = by[e.because] || []).push(e); });
    const out = [];
    Object.keys(by).forEach(k => {
      const g = by[k].sort((x, y) => y.from - x.from);
      if (g.length <= 2) { g.forEach(e => out.push(e)); return; }
      const names = g.slice(0, 3).map(e => D.F[e.fam].n).join(", ");
      out.push({ t: "drop", text: `<b>${g.length} families fell</b> (${names}${g.length > 3 ? `, +${g.length - 3} more` : ""})`, because: k });
    });
    return out;
  }
  // why is family f out? the single answer that hurt it most compared with the leader
  function ruledOutReason(ans, fi, li) {
    let worst = null;
    for (const a of ans) {
      if (a.auto || a.val == null) continue;
      const f = FAMS[fi], l = FAMS[li], yf = yp(W[f][a.kind][a.key]), yl = yp(W[l][a.kind][a.key]);
      const d = Math.log(a.val ? yf : 1 - yf) - Math.log(a.val ? yl : 1 - yl);
      if (!worst || d < worst.d) worst = { d, a };
    }
    if (!worst) return "";
    const a = worst.a, w = wOf(FAMS[fi], a.kind, a.key);
    return a.val ? (w < 0 ? `Yes to “${LABEL(a.kind, a.key)}” counts against it` : `“${LABEL(a.kind, a.key)}” isn't typical of it`) : `No to “${LABEL(a.kind, a.key)}”, one of its key signs`;
  }
  function status(p) {
    const idx = p.map((x, i) => i).sort((a, b) => p[b] - p[a]);
    const lead = p[idx[0]], second = p[idx[1]];
    return { idx, lead, second, clear: lead >= 0.85, alive: p.filter(x => x >= 0.03).length };
  }

  // ---- benchmark: a pretend patient of each family answers until the engine is 85% sure ----
  function rng(seed) { let s = seed >>> 0; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }
  function simulate(trueFam, picker, mode, seed, useExtra) {
    const r = rng(seed || 1); let ans = [], n = 0;
    for (; n < 60;) {
      const nq = picker === "old" ? nextQuestionOld(ans) : nextQuestion(ans, { order: picker === "ren" ? "ren-first" : "best" });
      if (!nq) break;
      const w = wOf(trueFam, nq.kind, nq.key);
      const val = mode === "textbook" ? w >= 3 : r() < yp(w);
      ans = applyAnswer(ans, nq.kind, nq.key, val, useExtra).ans; n++;
      const st = status(posterior(ans));
      if (st.clear) return { n, correct: FAMS[st.idx[0]] === trueFam, final: st.lead };
    }
    const st = status(posterior(ans));
    return { n, correct: FAMS[st.idx[0]] === trueFam, final: st.lead, unsure: true };
  }

  window.NQ = { FAMS, W, D, KEYS, LABEL, kindOf, yp, wOf, posterior, H, nextQuestion, nextQuestionOld, applyAnswer, dropEvents, ruledOutReason, status, simulate, oppOf, EXTRA_LIST, BASE_OPP, EXTRA_OPP, renSettled };
})();
