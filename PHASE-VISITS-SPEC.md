# Matching appointments to plan phases — her spec, 2026-09-10

Captured the turn she answered, before building, per her standing rule. **Her
words are the source of truth.** Nothing below is paraphrase except where marked
`[note]`.

Prompted by Phoebe Saul's screen — an "Immune support — acute" plan whose
`What happened · Visits` cell read `—`.

---

## Her asks, verbatim

> allow me to select appointment date for each of these phases and visits. I
> want to be able to track appointment x as 1 treatment for x phase etc

> i want to be able to match phase visits to appointments

> can you add an option where both can happen? within the phase i added acute
> illness treatment?

---

## What already existed (audited before building, not assumed)

- `phTpPhaseRecord` (index.html) already gathers **appointments** per phase —
  `visits: of("appt")` — windowed on `ph.sinceKey … ph.doneKey || today`.
- `phTpRecordCellHtml(kind:"visits")` already renders `N visits · dates`.
- `phTpPhaseVisits` already counts them for the phase line's `· N visits`.
- Phoebe's cell read `—` because that phase became current **that same day** and
  nothing was booked in a one-day window. Not a missing feature — an empty one.
- **`phApptImport` deleted appointments older than 60 days**, so any phase older
  than two months silently reported zero. That was destroying the evidence.

`[note]` The record's stated principle (her spec 2026-09-09) is *"It GATHERS; it
does not store… A typed second copy would eventually disagree with the log it was
copied from."* Every decision below was checked against that. Excluding a visit
stores an exception, not a copy — the gather still runs.

---

## Her 14 decisions

| # | Question | Her answer |
|---|---|---|
| 1 | How does an appointment become a phase visit? | **Counts itself, I can exclude** — ✕ per visit |
| 2 | Show appointments booked but not yet happened? | **Yes, marked as booked** (gold) |
| 3 | Where does the target ("of 6") come from? | **Worked out from the Visits plan** |
| 4 | Which appointments count? | **Every appointment in the book** |
| 5 | Paused plan keeps counting sick visits | **"stop counting the day it pauses. make a preset acute illness phase i can choose"** |
| 6 | Appointment before the phase became current | **No — phase dates are the truth.** Fix by moving the phase start |
| 7 | Not-yet-started phase | **Leave it as it is** |
| 8 | Where else should the count show? | **Progress bar · the appointment itself · the collapsed Treatment row** |
| 9 | The 60-day prune | **"Stop pruning — keep everything"** |
| 10 | What the acute preset gives | **Two phases — acute, then recovery** |
| 11 | What happens to the phase she was on | **"both. last phase ended, and continues after acute phase"** |
| 12 | Acute *inside* a phase as well | **Ask me each time** — both placements offered |
| 13 | Do sick visits count for the phase? | **Yes, counted and marked** 🤧 |
| 14 | Illness rhythm vs phase rhythm | **Yes, the illness raises the expected count** |

---

## What that means in build terms

**Decision 6 implies work she did not name.** "Fix by moving the phase start"
is impossible today — `sinceKey`/`doneKey` are stamped from `TODAY` by
`phTpSetPhaseStatus` and the comment at that function says *"set automatically,
never typed"*. Her answer only makes sense if the phase start becomes editable,
so that is being built. **It reverses a 2026-09-08 decision of hers**, so it is
flagged here rather than done quietly.

**Decision 11 is better than either option offered.** Ending the stretch and
continuing it after keeps each run separately dated and separately counted,
instead of one long phase whose visit total spans an unrelated illness.

**Decision 5 has two halves** — stop counting on pause (needs a `pausedOn` stamp,
which nothing records today), and a preset acute phase, which is decision 10.

**Decision 9 was taken against a stated cost.** She was shown the shared ~5MB
localStorage budget and a slim-stub alternative and chose to keep everything.
Recorded in the code at the prune site: if the quota is ever hit, that is the
first place to look, and the fix is the stub — never a new cutoff.

## Status

**Built and exercised, 2026-09-10.** Every decision above is in the app.

What was tested against a real phase (Recovery — weeks 2 to 8, `1×/wk`, four
appointments in the book plus one before it started), not just "it boots":

| Her decision | What the app did |
|---|---|
| 1 · counts itself, I can exclude | 3 → 2 on a click, chip struck through, target unchanged, **survives a reload** |
| 2 · booked, marked | 13 Sep renders gold, `booked`, and is not counted |
| 3 · target from the Visits plan | `1×/wk` over 21 days → 3 |
| 4 · every appointment in the book | all four in-window appointments appear |
| 5 · stop counting the day it pauses | held stretch drops its visits *and* lowers the target |
| 6 · phase dates are the truth | start moved 20 → 15 Aug pulled the 16 Aug visit in; half-typed year `0002-…` refused |
| 10 · two phases, acute then recovery | preset inserts both |
| 11 · "both. last phase ended, and continues after acute phase" | phase closed today, acute + recovery inserted, a `(continued)` clone follows — **and the closed phase keeps all 3 of its visits** |
| 12 · ask me each time | both placements offered, each naming the real phase |
| 13 · counted and marked | sick visits count, 🤧 on every appointment inside the window |
| 14 · the illness raises it | expected 3 → 4 |

Also added, because the wording read badly once it was on screen:
- **"5 of 3 visits" → "5 visits · 2 more than planned."** Past the plan's number
  is good news and should read as good news.
- **"0 visits" → "None yet · 1 booked"** on a phase that starts today.
- **A phase that starts after it ended is refused**, with a plain reason.
- The Acute illness blurb no longer says *"while she's unwell"* — it now reads
  *"while the illness lasts"*, so it fits every patient. `[note]` The built-in
  `acute_immune` template itself still says "she"/"her" throughout its clinical
  text ("send her to a GP"). **Left alone deliberately** — that is her authored
  clinical wording, not mine to rewrite. Worth asking her about.

**One thing she has not been asked.** Editing `sinceKey` on an *upcoming* phase is
impossible (it has no dates yet, by design), and marking a phase Upcoming still
clears both dates via the existing cascade. That is unchanged behaviour, but it
means a typed date can be lost by a status change she makes later. Not guarded,
because guarding it was not asked for and would change the cascade she already
approved on 2026-09-08.

See `CLAUDE.md`, `project_pharmacy_tp_grid`, `project_pharmacy_plan_interrupt`,
`project_pharmacy_appointments`, `project_shared_origin_quota`.
