# Script name review — 3 September 2026

Your rule: *"if the names are not typical names of people first and last, they may be a formula name."*

Every one of the **748 scripts currently typed as a patient script** was read. Three independent
reviewers classified all of them from different angles (name plausibility, Chinese-medicine naming,
and the data signals). Every name any reviewer flagged was then challenged by up to three more
reviewers whose job was to argue the opposite. A final sweep re-read the whole list looking for
anything missed.

**Result: 58 are formulas, products, condition templates or admin rows — not people.**
Nothing else in the list is questionable. 42 of the 58 are the reason you see Draft chips.

After re-typing, your patient list goes from 748 to 690 scripts.

---

## 1 · Duplicates of a jar you already stock (10)

These have the **same name as a formula jar in your inventory**, so the same formula exists twice:
once as a jar, once as a "patient".

| Script | Also an inventory jar |
|---|---|
| 3 Yellows | ✓ |
| Astringents | ✓ |
| Clear Skin | ✓ |
| Cold Breakers | ✓ |
| Dizziness | ✓ |
| Early Pregnancy | ✓ |
| Hair Growth | ✓ |
| SPASM | ✓ |
| Yi Guan Jian | ✓ |
| Zhe Chong Yin | ✓ |

## 2 · Formula names and abbreviations (18)

| Script | Reads as |
|---|---|
| BWJYT | a Tang abbreviation |
| CHGZGJT | Chai Hu Gui Zhi Gan Jiang Tang (7 herbs — the script has 7) |
| DGBXT | Dang Gui Bu Xue Tang (2 herbs — the script has 2) |
| DGYZ | Dang Gui Yin Zi (10 herbs — the script has 10) |
| GCXXT | Gan Cao Xie Xin Tang |
| GGQLT | Ge Gen Qin Lian Tang (empty — no ingredients) |
| SYGCT | Shao Yao Gan Cao Tang (2 herbs, Bai Shao first — the script has 2) |
| THSWT | Tao Hong Si Wu Tang (6 herbs — the script has 6) |
| WBLXS | a San abbreviation |
| XGJAT | a Tang abbreviation |
| XCHT　BXHPT | Xiao Chai Hu Tang + Ban Xia Hou Po Tang |
| Clear Skin 2 | second version of the Clear Skin blend |
| Fu Fang Hong Teng | Fu Fang Hong Teng Jian |
| Jin Shui Huan Xian | a Lung–Kidney tonic blend |
| GSDHT Egg Quality Mo | Gui Shao Di Huang Tang (Egg Quality mod) — the jar exists |
| GSDHT EQ Linh | your own version of the same |
| XCHT Mick | Xiao Chai Hu Tang, Mick's version |
| Refill CHQGT | a refill batch of Chai Hu Qing Gan Tang |

**Three of these carry a person's name** — `XCHT Mick`, `GSDHT EQ Linh`, and arguably
`Refill CHQGT`. They are named formula-first, so they were called formulas. **Your call**:
if Mick is a patient and this is his script, leave it as a patient script.

## 3 · The "D" house-blend series (16)

A whole numbered series. None of them is a person named D.

D Allergy Blood Stas · D Allergy Chronic · D Bugs · D Chronic Stress · D Clear Heat ·
D Diuretic · D Dizziness · D Happy · D Happy Liver · D HBS 1 · D HBS2 · D Hemmorhoids ·
D Liver Detox 204 · D Lung PH · D Resolve EM · D Vitality

14 of the 16 have never been dispensed to anyone.

## 4 · Condition and treatment templates (13)

Cerebral Circulation · Endo 1 · GallStone · Large Intestine · Migraines ·
Miscarriage Prevent · Nasal Congestion · Phlegm, Bloating · Post Ovu ET · Post Surgery ·
Reynauds · Uterine Prolapse · WarmBreakers/Softene

Note `Post Surgery` is the template; `Serena Post Surgery` is a real patient using it —
dispensed a week later as "Post Surgery Recovery". Keep Serena as she is.

## 5 · Admin (1)

`Inventory Correction` — a stock true-up, one ingredient. Not a patient.

---

## Three names that looked odd but ARE people

| Name | Why it stays a patient |
|---|---|
| Jennifer Jennifer | **She is in your Cliniko patient export.** The first name was entered twice. |
| David Linh | Sits in a run of seven Davids. "Linh" is a real surname. |
| Astrid Husband | Astrid's husband, or the English surname Husband. Either way, a person. |

Two more were double-checked and cleared: **Xin Yi Ng** and **Nian Ci Liong**. Both are real
names. ("Ng" and "Liong" are not valid pinyin syllables, so neither can be a formula name.)

---

## Why this matters

- **The Draft chips.** 42 of these 58 have never been dispensed, so the Prescriptions table
  marks them "Draft". That is most of your draft chips.
- **Patient counts are inflated** by 58 across the app.
- **Formula refill can't see them.** A recipe stored as a patient script is not linked to
  its jar, so it does not appear where you make the formula up.
- **Ten formulas exist twice** — once as a jar, once as a "patient" — which is a genuine
  risk of editing the wrong copy.

## How to fix one

Open the script, then in **Name & type** set **Type** to **Formula**. It moves out of the
patient list immediately. Doing all 58 by hand is about 58 trips through that screen.

*Reviewed with 128 independent checks. Nothing was changed in your data.*
