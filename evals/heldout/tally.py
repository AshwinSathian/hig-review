"""Unblind the judges and scorer and apply the four rules in preregistration.md.

Usage: python3 -I tally.py
Reads pairs.json, judge-<judge>.json ({pair: {prefer, wrong, inflated, unbacked_blockers}})
and scores/<model>-<fixture>-<condition>.json ({items, extra}).
"""
import json
from collections import Counter
from pathlib import Path

HERE = Path(__file__).parent
MODELS = ("haiku", "sonnet", "opus")
JUDGES = ("opus", "sonnet", "haiku")


def load(p):
    return json.loads((HERE / p).read_text(encoding="utf-8"))


def main():
    pairs = load("pairs.json")["pairs"]
    judges = {j: load(f"judge-{j}.json") for j in JUDGES}
    for j, ans in judges.items():
        assert set(ans) == set(pairs), f"judge {j}: pairs do not match"

    out = ["# Held-out round: results", ""]
    # Rule 1: preference
    wins, per_pair = 0, []
    for name, k in sorted(pairs.items()):
        votes = Counter()
        for j in JUDGES:
            p = judges[j][name]["prefer"]
            votes["tie" if p == "tie" else k[p]] += 1
        skill_win = votes["skill"] >= 2
        wins += skill_win
        per_pair.append(f"| {name} | {k['model']} | {k['fixture']} | {votes['skill']} | {votes['baseline']} | {votes['tie']} |")
    r1 = wins >= 6
    out += ["## Rule 1: preference", "", f"loupe preferred by at least 2 of 3 judges in **{wins} of 9** pairs (needs 6): **{'pass' if r1 else 'fail'}**", "",
            "| Pair | Model | Fixture | Judges for loupe | for baseline | tie |", "|---|---|---|---|---|---|", *per_pair, ""]

    # Rule 2: findings judged wrong or inflated on the control. Judges word findings
    # differently, so findings can't be matched across judges; take the median of
    # each judge's count (a deviation from the pre-registration, see notes.md).
    def flagged(name, side):
        counts = sorted(len(judges[j][name]["wrong"][side]) + len(judges[j][name]["inflated"][side]) for j in JUDGES)
        return counts[1]

    r2_rows, r2 = [], True
    for name, k in sorted(pairs.items()):
        if k["fixture"] != "web-good":
            continue
        side = {k["A"]: "A", k["B"]: "B"}
        s, b = flagged(name, side["skill"]), flagged(name, side["baseline"])
        r2 &= s <= b
        r2_rows.append(f"| {k['model']} | {s} | {b} |")
    out += ["## Rule 2: no over-reporting on the control", "",
            "Median, across the three judges, of findings judged wrong or inflated.", "",
            "| Model | loupe | baseline |", "|---|---|---|", *r2_rows, "", f"**{'pass' if r2 else 'fail'}**", ""]

    # Rule 3: recall on keys
    def recall(model, fixture, cond):
        items = load(f"scores/{model}-{fixture}-{cond}.json")["items"]
        return sum({"found": 1, "partly": 0.5}.get(v, 0) for v in items.values()), len(items)

    r3_rows, r3 = [], True
    for m in MODELS:
        s = [recall(m, f, "skill") for f in ("web-sloppy", "native")]
        b = [recall(m, f, "baseline") for f in ("web-sloppy", "native")]
        ss, bs, total = sum(x for x, _ in s), sum(x for x, _ in b), sum(n for _, n in s)
        r3 &= ss >= bs
        r3_rows.append(f"| {m} | {ss:g} of {total} | {bs:g} of {total} |")
    out += ["## Rule 3: recall on the sealed keys (web-sloppy + native; partly = 0.5)", "",
            "| Model | loupe | baseline |", "|---|---|---|", *r3_rows, "", f"**{'pass' if r3 else 'fail'}**", ""]

    # Rule 4: restraint on the control
    r4_rows, ok = [], 0
    for m in MODELS:
        md = (HERE / "runs" / m / "web-good" / "skill.md").read_text(encoding="utf-8")
        sc = load(f"scores/{m}-web-good-skill.json")
        blockers = sc.get("blockers", None)
        norework = "no rework warranted" in md.lower()
        good = blockers == 0 and norework
        ok += good
        r4_rows.append(f"| {m} | {blockers} | {'yes' if norework else 'no'} |")
    r4 = ok >= 2
    out += ["## Rule 4: restraint on the control", "", "| Model | Blockers | \"No rework warranted\" |", "|---|---|---|", *r4_rows, "",
            f"{ok} of 3 models (needs 2): **{'pass' if r4 else 'fail'}**", ""]

    out += [f"## Round: **{'pass' if all((r1, r2, r3, r4)) else 'fail'}**", ""]
    (HERE / "result.md").write_text("\n".join(out), encoding="utf-8")
    print("\n".join(out))


if __name__ == "__main__":
    main()
