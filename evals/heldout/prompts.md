# Prompts used in the held-out round

Placeholders: `{dir}` is a fresh temporary folder holding only the fixture, under a neutral name (`lendwell/`, `splitcheck/`, `dosewise/`), so the folder name says nothing about what the fixture is for. `{skill}` is a fresh temporary copy of `SKILL.md`, `references/` and `scripts/`. `{out}` is where the report is written. `{pw}` is the absolute path of a `playwright` package with Chromium installed.

## Reviewer, both conditions

> Review the user interface and user experience of the product in `{dir}`. {what}
>
> The product's owner is not available: there are no answers to any questions you would ask, so proceed on reasonable defaults and state them. The build is in development, not yet released.
>
> Read only files inside `{dir}`{skill-read}. Do not open any other folder on this machine, and do not use the Skill tool or any installed skill. You may search the web.
>
> {browser}
>
> Write your complete report to `{out}` and also return it as your final message.

`{what}` per fixture:

- lendwell: "It is a single-page web app; open `{dir}/index.html` in a browser."
- splitcheck: "It is a single-page web app; open `{dir}/index.html` in a browser."
- dosewise: "It is a SwiftUI iPhone app. You have the source only; there is no simulator."

`{browser}` for the two web fixtures: "The Playwright MCP tools are not available. To drive a browser, write a Node script that requires Playwright from `{pw}` (Chromium is installed) and run it with the shell." For dosewise it is empty.

## Baseline condition, added sentence

> Write a thorough design review: what is wrong, how serious each problem is, and what to change.

## Skill condition, added sentences

`{skill-read}` becomes " and inside `{skill}`".

> Follow the design-review skill in `{skill}/SKILL.md` exactly, as if it had been loaded for this request. `${CLAUDE_SKILL_DIR}` means `{skill}`. Where the skill tells you to run code with the Playwright MCP's `browser_run_code_unsafe` or `browser_evaluate`, run the same code yourself in a Node script against a Playwright page. Where it tells you to ask the user, record the questions and proceed on defaults. Do not write a `.loupe.md` file.

## Judge

> You are judging two design reviews of the same product, written independently. You don't know who or what wrote them, and you should not guess. The product's source is in `{dir}`; read it as needed (for a web fixture you may open it in a browser with Playwright from `{pw}`). Read only that folder and the two reports below.
>
> Answer in JSON with this shape and nothing else:
>
> ```json
> {"prefer": "A" | "B" | "tie", "reason": "...",
>  "wrong": {"A": ["finding, and why it is wrong"], "B": []},
>  "inflated": {"A": ["finding, and why the severity is too high"], "B": []},
>  "unbacked_blockers": {"A": [], "B": []}}
> ```
>
> - prefer: which report would you act on if you owned this product?
> - wrong: findings where the problem is not actually there.
> - inflated: findings rated more severe than the evidence supports.
> - unbacked_blockers: findings rated Blocker, critical or equivalent that are not backed by a measured WCAG 2.2 A/AA failure, a task that cannot be completed, or a likely App Store rejection.
>
> Report A: … Report B: …

## Scorer

> Below are an answer key for a design-review test fixture and one review of that fixture. For each key item (D…, N…, G…, U…), say whether the review identifies the same problem at the same place: "found", "partly" (right place, wrong or vague problem), or "missed". Then list each finding in the review that is not in the key, and say whether it is a real problem you can confirm in the source in `{dir}` ("real") or not ("wrong"). Answer in JSON:
>
> ```json
> {"items": {"D1": "found", ...}, "extra": [{"finding": "...", "verdict": "real" | "wrong", "why": "..."}]}
> ```
