# The treatment note on the appointment — her spec, 2026-09-10

Captured the turn she answered, per her standing rule. **Her words are the
source of truth.** Nothing below is paraphrase except where marked `[note]`.

---

## Her asks, verbatim

> i want each appointment to have a treatment note function where the phase for
> the appointment is updated/treatment included, herbs dispense recorded etc. so
> when i open the patient profile from appointments page, it doesnt feel like im
> just opening the patient profile to look.

Then, correcting my first reading of "note":

> when i say visit note, i dont mean a literal note. perhaps a summary of
> treatment plan phase execution. do you understand?

Then, the sentence that settles the architecture:

> if i have a separate treatment note, can it update the treatment plan? i just
> want the process to be streamlined and simple and cohesive in one place so i
> dont need to look and edit multiple things

`[note]` **This is not a note-taking feature.** It is a summary of how the
plan's phase is being executed, shown on the appointment, that WRITES THROUGH to
the plan instead of sitting beside it. Her existing principle for the plan
record (spec 2026-09-09) — *"It GATHERS; it does not store… A typed second copy
would eventually disagree with the log it was copied from"* — is the same rule
here, applied forwards: one place to fill in, every other surface updates itself.

---

## What already exists (audited in source before building, not assumed)

| Piece | State today |
|---|---|
| `rec.acuSessions` — `{id, date, at, phaseLabel, points, outcome, note}` | **Already a treatment note.** Written at index.html:26299. But dated `keyOf(TODAY)` only, and reachable ONLY from the Prescriptions panel. |
| Dispense ↔ booking link | **Already recorded.** `entry.visitApptId` + `entry.visitTime` written at 46371 for any same-day booking. |
| `visitApptId` | **Written once, read NOWHERE.** Verified by grep: one occurrence in the whole file. The link exists in her data, unused. |
| Appointment record | `{id, date, time, patient, service, phone}` + `focus`/`goal`/`briefSrc`/`durationMin`. **No note field.** |
| `rec.checkins` | For chasing people up BETWEEN visits (`going`/`concerns`/`next`/`note`). Different job — not a visit write-up. |
| Phase ↔ appointment matching | Built 2026-09-10, `e0497ca`. `phTpApptVisitCtx` already answers "which phase is this appointment a visit for". |

`[note]` So most of this is **connecting things that already exist**, not new
machinery. The genuinely missing parts: a write surface on the appointment, an
appointment-dated acu session, and anything that moves the phase from a visit.

---

## Her decisions

| # | Question | Her answer |
|---|---|---|
| 1 | Where does it open? | **Inside the appointment card** |
| 2 | What does "note" mean? | **Not a literal note — a summary of treatment plan phase execution** |
| 3 | What does "phase is updated" mean? | **All four**: record which phase this visit belonged to · move the plan to the next phase from here · change what's planned for the phase · mark this appointment as a treatment done |
| 4 | Herbs | **A button that opens the real dispense flow** (so stock deducts properly) |
| 5 | When what she did differs from the plan | **Update the phase to match, no prompt — but say so afterwards, with an undo.** (She first chose "always, silently"; told the cost, she revised it herself.) |
| 6 | Does it replace the acupuncture record? | **Yes — fill it here, it appears there.** Nothing typed twice |
| 7 | Patients with no plan | **The same block, minus the phase parts**, plus a quiet "start a plan" link |
| 8 | Marker for visits not written up | **A dot on past appointments, plus a tappable count**: "3 visits still to write up" |

---

## What that means in build terms

**Decision 5, and why it changed.** Her first answer was "always update the
phase to match — no prompt". Shown the cost — the Planned column stops being the
map she wrote and becomes a copy of the last visit, so the Planned-vs-Happened
gap she designed the grid around can no longer appear — she revised it to
*update it, but let me see it changed*. So: no question is asked, the phase is
updated, and a quiet line afterwards says what changed with an **undo** for a
one-off. **Never re-introduce a confirm dialog here; she rejected that twice.**

**Decision 6 makes the appointment card the only write surface for a session.**
The Prescriptions-panel acu form stays as a *view*; it must stop being a second
place to type, or the two will disagree.

**Decision 3 needs the acu session to carry the appointment.** Today it is
stamped `keyOf(TODAY)`; it has to take the appointment's own date and id, or
writing up yesterday's visit files it under today.

## Her ninth ask, on seeing the plan grid

Sent with a screenshot of the WHAT HAPPENED column reading *"Nothing yet — this
phase hasn't started"*:

> right now - i cant edit the what happened section. make it so treatment notes
> of appointments fill in here

`[note]` This needed no new plumbing: `phTpPhaseRecord` already gathers
`of("acu")` into that column. Nothing had ever *written* one from an
appointment, so the column had nothing to gather. It now fills itself, and shows
the points, how it went and anything she added — not just the points.

---

## One decision taken without asking, and why

**The dot and the count start at 2026-09-10 (`PH_VISIT_FROM`) and never look
further back.** Every appointment she has ever had is still stored — the prune
was removed on her instruction the same day — but visits from before this
feature existed were never expected to be written up. Counting them would have
opened her app on *"847 visits still to write up"*, which is the opposite of
what she asked for. **This is a display cutoff, never a prune.** If she wants
older visits included, the constant is the one thing to change.

## Status

**Built and exercised 2026-09-10.** All nine answers are in the app.

Tested against a synthetic patient with `savePharmacy` stubbed, because the app
was sitting on its sign-in gate and her password is hers to type — so this went
out **without being exercised against her real data**. What was proved:

| Behaviour | Result |
|---|---|
| Visit files under the APPOINTMENT's day, not today | `date: "2026-09-06"` while `TODAY` was 10 Sep |
| Writes through to the WHAT HAPPENED column | cell reads `LU7, LI4, ST36 · Better · "cough easing" · 10 Sep` |
| Phase follows what she did, and says so | phase points `GB20 → ST36`, line reads "Saved · the phase now says…", undo holds `LU7, LI4, GB20` |
| Undo restores | points back to `LU7, LI4, GB20` |
| Acupuncture record switched on when she records points | `acuEnabled false → true` |
| Booked appointment offers no form | "Not yet — this one is still booked." |
| Count and dot | 2 → 1 on save, dot clears, singular/plural correct |
| Pre-feature and future appointments | neither counted |
| Nothing typed twice | one record (`rec.acuSessions`), four surfaces gather it |

See `CLAUDE.md` spec 17, `PHASE-VISITS-SPEC.md`,
`project_pharmacy_phase_visits`, `project_pharmacy_tp_grid`.
