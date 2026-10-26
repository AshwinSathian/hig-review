"""Pair each model's two reports of a fixture as A and B, sides shuffled with a fixed seed.

Usage: python3 -I make_pairs.py
Reads runs/<model>/<fixture>/{baseline,skill}.md. Writes pairs.json (the key:
which side is which) and pairs/<pair>.md (what a judge sees).
"""
import json
import random
from pathlib import Path

HERE = Path(__file__).parent
SEED = 20261026
MODELS = ("haiku", "sonnet", "opus")
FIXTURES = ("web-sloppy", "web-good", "native")


def main():
    rng = random.Random(SEED)
    cells = [(m, f) for m in MODELS for f in FIXTURES]
    rng.shuffle(cells)
    key = {"seed": SEED, "pairs": {}}
    (HERE / "pairs").mkdir(exist_ok=True)
    for n, (model, fixture) in enumerate(cells, 1):
        sides = ["baseline", "skill"]
        rng.shuffle(sides)
        name = f"pair{n:02d}"
        key["pairs"][name] = {"model": model, "fixture": fixture, "A": sides[0], "B": sides[1]}
        text = lambda c: (HERE / "runs" / model / fixture / f"{c}.md").read_text(encoding="utf-8").strip()
        (HERE / "pairs" / f"{name}.md").write_text(
            f"# {name}\n\n## Report A\n\n{text(sides[0])}\n\n---\n\n## Report B\n\n{text(sides[1])}\n", encoding="utf-8"
        )
    (HERE / "pairs.json").write_text(json.dumps(key, indent=1) + "\n", encoding="utf-8")
    print(f"wrote {len(cells)} pairs")


if __name__ == "__main__":
    main()
