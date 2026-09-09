# Facial paralysis — her spec, 2026-09-09

Captured verbatim the moment she sent it, before any building, per her standing
rule that confirmed wording goes to a file that turn. **Her words are the source
of truth.** Nothing below is my paraphrase except where marked `[note]`.

Prompted by a real patient — Nadia Joud, a facial paralysis case.

---

## 1. Photo tags

> i need photo tags for
> Smile
> eyes closed
> blow up cheeks
> raise eyebrows
> frown

These are the five facial-nerve movements a palsy is assessed on, so a photo set
is a before/after record of function, not appearance.

Current photo types live in `PH_REN_PHOTO_TYPES` (index.html ~36710): tongue,
eyelid, eyes, faceshape, skin, nails, bbt, full, other. Emoji in
`PH_CAP_TYPE_EMOJI` (~36418).

---

## 2. Treatment plan category

> i need treatment plan category facial paralysis
> bells palsy
> ramsay hunt syndrome
> Post Stroke

So: a new **category** called *Facial paralysis*, holding three plans — **Bell's
palsy**, **Ramsay Hunt syndrome**, **Post stroke**. Existing categories are
MSK / Gynae / Stress / Weight (see `project_pharmacy_tp_categories`).

---

## 3. Bell's Palsy Checklist

> **Bells Palsy Checklist**
>
> **Eyebrow Elevation (Eyebrow Raise)**:
> **Eyebrow furrow/frown**:
> **Lagophthalmos (Eyelid unable to close)**:
> **Epiphora (Watering Eye)**:
> **Bell's Phenomenon:  Eyeball turns up and out**:
> **Hyperacusis (Sound Sensitivity)**:
> **Nasolabial Fold Absence**:
> **Drooping of Saliva**:
> **Impaired Articulation, lip compression**:
> **Mastication**:
> **Taste Sensation Loss**:
> **Headaches/Pain**:
> **Whistle**:

Thirteen items. Every one was left with a trailing colon and no value — they are
fields to be filled in per visit, not tick boxes.

And then, separately:

> bells palsy checklist can work on a scoring system

So the checklist is **scored**, and the score is presumably tracked across visits
to show recovery.

`[note]` Not yet settled with her: what the scale is (0–5 per item? present /
partial / absent?), whether every item scores or only the movement ones, whether
there is a total, and whether the score is per-visit with a trend. **Ask, do not
invent** — this is a clinical measure she will act on.

---

## 4. Bell's Palsy Acupuncture Protocol

> **Bell's Palsy Acupuncture Protocol: **
> Facial Nerve (VII)
> 1. **Temporal Branch** GB2 GB3
> 	GB14.15 *Frontalis (Epicranius)*
> 	SJ23 Yu Yao *orbicularis oculi upper*
> 	GB1 Tai Yang *Orbicularis oculi lower*
> 	BL2 *Currugator Supercilli*
> 2. **Zygomatic Branch** GB2
> 	ST2.3 SI18 *Orbicularis Oculi*
> 3. **Buccal Branch**	ST6.7
> 	ST4 *Orbicularis Oris*
> 	LI20 *Levator Labii Superioris Aleque nasi*
> 	Bi Tong extra point *Levator Labii Superioris Aleque nasi*
> 	Inferior to SI18 *Buccinator*
> 	SI18 *Zygomaticus Major*
> 	SI18 *Zygomaticus Minor*
> 4. **Marginal Branch** ST5
> 	Jia Cheng Jiang Mentalis
> 	Jia Cheng Jiang Depressor labii inferioris
> 	Jia Cheng Jiang Depressor Anguli Oris
> 	Orbicularis oris Upper
> 	Orbicularis oris Lower

Structure: the four motor branches of the facial nerve, each with its points and
the muscle each point targets. Points include named extras (Yu Yao, Tai Yang, Bi
Tong, Jia Cheng Jiang) and one positional instruction ("Inferior to SI18").

`[note]` Spellings to raise with her rather than silently change, since her rule
is to keep proper clinical language and I will not overwrite her words:
"Currugator Supercilli" is standardly *Corrugator Supercilii*; "Aleque nasi" is
standardly *Alaeque Nasi*. Her meaning is unambiguous either way.

`[note]` `GB14.15` and `ST2.3`, `ST6.7` read as "GB14 and GB15" etc. Confirm
before expanding them in any UI.

---

---

## 5. Her answers — 8 questions, 2026-09-10

1. **Visibility.** `PH_CASE_CATEGORY` (index.html:31031) maps `neurological → msk`, and the
   plan picker shows ONLY the mapped category (plus any `always: true`). So a new column
   would have been invisible on exactly the scripts that need it. Her pick: **point
   Neurological at the new category.** A neurological script now offers Bell's palsy /
   Ramsay Hunt / Post stroke instead of low back and neck.
2. **Scale: none / partial / normal.** Three states, not 0–4. She took the simpler scale
   over the finer one — do not "upgrade" it later without asking.
3. **Split the items.** Movements get the scale; symptoms are present / absent. The split
   itself is mine to draw (she picked the Recommended option, which said I would).
4. **Where: BOTH — "assessment, treatment plan"**, in her words, plus the cadence:
   *"usually use it start of treament, after 4 visits, and review every 4 visits"*.
5. **Count the visits and prompt.** The app counts visits since the last score and shows a
   quiet "due now" at four. A reminder, never a block — she can score any time.
6. **Photo tags only on facial cases.** The other nine stay as they are for everyone else;
   the five new ones appear only where they mean something.
7. **Keep the branch structure** for the point protocol — four branches, points, and the
   muscle beside each. Not flattened into the plain `points` line.
8. **Colour: I pick one**, distinct from the existing category colours, checked for
   contrast and shown to her before it ships — the same way the home-visit violet was done.

`[note]` Spelling decision, flagged to her rather than done silently: the app UI uses the
standard anatomical spellings *Corrugator Supercilii* and *Levator Labii Superioris Alaeque
Nasi*, because her standing rule is accuracy and proper clinical language. **This file keeps
her originals verbatim above.** If she wants her spellings in the UI too, it is a one-line
change per term.

---

## 6. The split I drew — built 2026-09-10

She left this to me (answer 3, the Recommended option said I would). Seven of her
thirteen are things you **ask her to do**, so they carry the none/partial/normal
scale; six are **observed or reported**, so they are present/absent. A headache
moving the movement score would make the score lie about the nerve.

| # | Her item, verbatim | Kind | What is actually scored |
|---|---|---|---|
| 1 | Eyebrow Elevation (Eyebrow Raise) | movement | brow raise — frontalis |
| 2 | Eyebrow furrow/frown | movement | brow furrow — corrugator supercilii |
| 3 | Lagophthalmos (Eyelid unable to close) | movement | **how far the lid closes** |
| 4 | Epiphora (Watering Eye) | symptom | |
| 5 | Bell's Phenomenon: Eyeball turns up and out | **observation** | recorded, never counted |
| 6 | Hyperacusis (Sound Sensitivity) | symptom | |
| 7 | Nasolabial Fold Absence | movement | **how much of the fold is there** |
| 8 | Drooping of Saliva | symptom | |
| 9 | Impaired Articulation, lip compression | movement | **how well the lips seal** |
| 10 | Mastication | movement | cheek — buccinator |
| 11 | Taste Sensation Loss | symptom | |
| 12 | Headaches/Pain | symptom | |
| 13 | Whistle | movement | orbicularis oris |

**Direction is always the same: more is better.** Four of her labels name the
DEFICIT rather than the function, so scoring the label itself would read
backwards. Her wording is kept exactly; a short "ask" line beside each says what
is being scored. Five of the seven movements are the five photo tags.

**Bell's phenomenon is recorded but not counted as a problem** — it is a NORMAL
protective reflex, visible only because the lid is not closing over it. Counting
it as a deficit would score a protected eye as worse than an unprotected one. Its
ABSENCE alongside lagophthalmos is the dangerous combination. Its row is styled
neutral for the same reason. **Flagged for her to overrule if she disagrees.**

**Scoring.** Movement score is out of what was actually answered, never a fixed
14 — a half-finished score must not read as a collapse. Symptoms are a count of
those present, excluding the observation. Both shown live as she taps.

**Cadence**, her words: "start of treament, after 4 visits, and review every 4
visits". No score = due. Otherwise the app counts `rec.acuSessions` dated AFTER
the last score and says "due now" at four. A prompt, never a block.

**Where it lives.** The thirteen-item form is on the Assessment stage only. The
treatment plan gets a read-only strip — score, movement delta vs last, weakest
branch, due state, the protocol — and a button back to the Assessment stage. One
score entered in two places is a score that can disagree with itself.

**The delta only shows when both scores covered the same number of items** — a
jump caused by scoring three last time and seven this time is not improvement.

**Storage:** `rec.facialScores[] = { id, date, at, m:{key:"none|partial|normal"},
s:{key:true|false}, note }`. Re-scoring on a day already scored REPLACES it, so
the trend keeps one point per visit.

**Branch weakness** is the mean movement value across the items each branch
drives, ignoring unscored ones; the weakest is marked in the protocol and named
on the plan strip. Note that single-item branches (zygomatic) are noisier than
three-item ones — say the word if you want it weighted differently.

## Status

Her 8 answers are settled. **Stage 1 and the scored checklist are BUILT** —
palette, `.cat-facial`, `neurological → facial`, the category, the three plans,
the five photo tags, the thirteen-item scored checklist, the four-branch protocol
(`phFacialProtocolHtml`), and the plan strip. Verified in the DOM against a real
neurological script: 13 items in her order, scoring, untap-to-clear, save,
same-day replace, the 4-visit due count, the trend, and the weakest-branch mark.
Not verified by eye — the local app sits behind the sign-in gate.

See `CLAUDE.md` spec numbering, `project_pharmacy_tp_categories`,
`project_pharmacy_photos_section_2026_09`, `project_chapter7_tcm_acupuncture`
(her 361-point reference).
