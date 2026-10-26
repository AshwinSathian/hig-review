# Held-out round: results

## Rule 1: preference

loupe preferred by at least 2 of 3 judges in **6 of 9** pairs (needs 6): **pass**

| Pair | Model | Fixture | Judges for loupe | for baseline | tie |
|---|---|---|---|---|---|
| pair01 | opus | web-sloppy | 3 | 0 | 0 |
| pair02 | haiku | web-sloppy | 2 | 1 | 0 |
| pair03 | haiku | native | 1 | 2 | 0 |
| pair04 | sonnet | web-good | 3 | 0 | 0 |
| pair05 | opus | web-good | 1 | 2 | 0 |
| pair06 | opus | native | 3 | 0 | 0 |
| pair07 | sonnet | native | 3 | 0 | 0 |
| pair08 | sonnet | web-sloppy | 3 | 0 | 0 |
| pair09 | haiku | web-good | 0 | 3 | 0 |

## Rule 2: no over-reporting on the control

Median, across the three judges, of findings judged wrong or inflated.

| Model | loupe | baseline |
|---|---|---|
| sonnet | 2 | 3 |
| opus | 3 | 3 |
| haiku | 1 | 3 |

**pass**

## Rule 3: recall on the sealed keys (web-sloppy + native; partly = 0.5)

| Model | loupe | baseline |
|---|---|---|
| haiku | 27 of 29 | 27.5 of 29 |
| sonnet | 27 of 29 | 26.5 of 29 |
| opus | 29 of 29 | 27 of 29 |

**fail**

## Rule 4: restraint on the control

| Model | Blockers | "No rework warranted" |
|---|---|---|
| haiku | 0 | yes |
| sonnet | 0 | yes |
| opus | 0 | yes |

3 of 3 models (needs 2): **pass**

## Round: **fail**
