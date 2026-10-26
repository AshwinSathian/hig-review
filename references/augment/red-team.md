<!-- contents -->
Contents: Stance · The attack ladder · Root-cause clustering · The rework bar · Proposal classes · Softness audit · Red flags
<!-- /contents -->


Covers: the red-team pass: the adversarial stance, the attack ladder from premise down to pixels, the rework bar, the three proposal classes (fix, enhancement, rework), and the softness audit of the review itself.
Loaded by: red team (pass 9); every pass reads "Stance"
Snapshot: 2026-10-26
Tags: [MUST]/[SHOULD]/[CONSIDER] = the source's own strength; [Taste] = our rule. In reports, a check labelled 'adds to Apple' shows the Apple file's tag; 'Apple silent' shows 'Research'; [Taste] shows 'Taste'. `(unverified)` means recalled from memory or a secondary source: weight it lower and never make it a Blocker on its own.

The red team does not replace the Apple passes or change how Impact is assigned. It attacks the product and the draft review from outside, and it is the only pass allowed to propose reworks. Apple HIG stays the base: a rework that breaks platform conventions, accessibility or legibility is rejected, however bold.

## Stance
**Intent**: every pass reviews as an adversary, not a helper. The default reviewer instinct is to list fixable defects on the screen it was shown and stop. The red team asks whether the screen should exist, whether the flow is the right shape, and whether the product would lose to its best peer, then argues it with evidence.

**Checks**
- [Taste] Assume the design is wrong until the evidence says otherwise. Before accepting a screen with no findings, go up a layer on the attack ladder and record which layers were attacked. — Apple silent
- [Taste] Attack the decision, not just the execution. "The button label is vague" is a fix; "this step should not exist" is the question the red team adds. — Apple silent
- [Taste] Every attack needs evidence: a measured value, a file and line, a screenshot region, a step count, a peer comparison with a source, or a profile goal it breaks. An attack with no evidence is dropped, not softened into a "consider". — Apple silent
- [Taste] Aggressive means direct, not inflated. Impact still follows the Rules in SKILL.md: a rework argument never raises a finding to Blocker. Say "this is the wrong model" plainly when the evidence supports it; do not say it when it does not. — Apple silent
- [Taste] Restraint is part of the stance. If nothing clears the rework bar, say "No rework warranted" and why. That is the expected result for a well-built product, not a failure. Inventing an overhaul to look bold is noise, the same as a generic finding. — Apple silent

## The attack ladder
**Intent**: attack top-down. Each layer can invalidate everything below it, so a premise problem outranks a hundred pixel fixes. Stop descending a branch once a higher layer has failed: polishing a step that should be deleted is wasted work. Write each attack as: the claim, the evidence, what it would cost to change, what it would unlock.

1. **Premise and job.** What job does the person hire this product for (Christensen's jobs-to-be-done framing, *Competing Against Luck*, 2016)? Does the primary screen answer that job, or does it answer the team's org chart, a marketing template, or a feature list?
- [Taste] The first screen a returning user sees answers their most frequent question or starts their most frequent action. If it shows a marketing hero, a feature grid, a greeting or a dashboard of everything, that is a premise attack. — Apple silent
- [SHOULD] Apple's Purpose principle: the product's purpose fits in one sentence, and every screen visibly serves it. Cite the Purpose section of references/apple/principles-platforms.md. — adds to Apple
- [Taste] Name the core object (a route, a task, a forecast, an invoice). If the UI is organised around something else (pages, tabs named after features, a generic "Home"), argue for reorganising around the object. — Apple silent

2. **Model and information architecture.** Is the mental model right? Count top-level destinations, nesting depth, and places where the same object appears under two names.
- [Taste] Two or more navigation destinations that show the same object filtered differently (Home, Recent, Feed) should usually be one destination with a filter or sort. — Apple silent
- [Taste] A destination users visit rarely does not earn a tab or a sidebar slot; frequency decides placement. — Apple silent
- [Taste] If a peer in the landscape has a measurably simpler model for the same job (fewer destinations, fewer object types), name it and say what this product would gain by adopting the mechanism. Never the look. — Apple silent

3. **Flows.** Walk the core task, first run, and any money, sign-up or destructive flow. Count steps, decisions, waits, text entries and context switches. Compare against the best peer found in the landscape step.
- [Taste] Time to first value: count the steps from first launch to the first moment the product does its job for this person. Every step that asks before it gives (account, permissions, preferences, tour) is a candidate for deferral. — Apple silent
- [CONSIDER] Apple's onboarding guidance: ask for a permission during onboarding only if the app cannot work without it, otherwise at first use of the feature. Cite the onboarding section of references/apple/patterns.md. — adds to Apple
- [Taste] Apply the cognitive walkthrough's four questions at each step of the core task (Wharton, Rieman, Lewis and Polson, 1994): will the user try to achieve the right effect, notice the correct action is available, associate it with the effect, and see progress after acting? A "no" is a finding at that step. — Apple silent
- [Taste] A flow with more steps than the best peer's for the same job, with no reason the product needs them, is a flow rework candidate. Show both step lists side by side. — Apple silent

4. **Screens.** The Apple passes already cover this layer. The red team adds two tests.
- [Taste] Delete test: for each element, ask what breaks if it is removed. If nothing, it is noise; list it for deletion. Deletion is a valid enhancement. — Apple silent
- [Taste] Squint test at primary screens: the one thing the eye lands on first should be the core object or the core action. — Apple silent

5. **System.** Tokens, theming, component coverage, states.
- [Taste] Theming: can the product produce light, dark and increased-contrast appearances from a small set of inputs, or is each theme hand-maintained? Hand-maintained themes drift; a parametric system (few inputs deriving many roles, as in Linear's 2024 move to three theme variables, references/augment/distinctiveness.md) is the enhancement to propose when themes already drift. — Apple silent
- [Taste] Every component in the inventory has its full state set (default, hover, focus, pressed, disabled, error, loading). Missing states recur on every screen that uses the component; report them once at system level. — Apple silent
- [Taste] Literal values scattered through components instead of tokens mean any rework will be slow. Say so in the rework's cost. — Apple silent

6. **Brand and identity.** The distinctiveness pass gives the verdict. The red team asks the harder question: if this product's nearest peer copied its whole UI tomorrow, what would this product still own?
- [Taste] Nothing owned plus a `default-assembled` verdict means swapping individual tells will only produce the next default (references/augment/distinctiveness.md, "Don't fix slop by substitution"). Propose an identity rework from the chosen or proposed direction instead of a list of swaps. — Apple silent

7. **Edges and trust.** Failure, recovery, multi-device, long-term use.
- [Taste] Pre-mortem: imagine it is a year after launch and the product failed with its users. Write the three most likely reasons rooted in the UI (Klein, "Performing a Project Premortem", HBR, 2007). Each reason that the evidence supports becomes a finding or a rework argument. — Apple silent
- [Taste] Extreme users: walk the core task as someone on a slow network, someone using VoiceOver or Voice Control, someone with the largest text size, someone using the product daily for a year, and someone opening it once a quarter. The person the design forgot is a finding. — Apple silent
- [Taste] Data loss: where can a person lose work (no autosave, destructive action without undo, form cleared on error, session timeout)? Rate each under the Rules in SKILL.md: a confirmed loss of work in a release-stage build or a Trust-gate item can be a Blocker; otherwise judged, at most Major. — Apple silent

8. **The review itself.** See "Softness audit" below.

## Root-cause clustering
**Intent**: a long list of related fixes usually hides one wrong decision. Grouping findings by cause is how the red team finds reworks with evidence rather than taste.

**Checks**
- [Taste] Group all findings by cause, asking "why" until two or more findings share an answer (a missing token layer, a marketing template reused as the app shell, no state model for async data, forms built without a field component). — Apple silent
- [Taste] A cluster of three or more findings with one cause, where fixing each row leaves the cause in place, is a rework candidate. Name the finding numbers in the rework. — Apple silent

## The rework bar
**Intent**: keeps the red team aggressive without inventing overhauls. A rework is proposed only when at least one condition holds, and the report states which one.

A rework clears the bar when at least one of these holds:
1. **Cluster**: three or more findings share one stated root cause that per-row fixes cannot remove, and every cited finding has that same cause. Findings that only sit on the same screen, or share a cause loosely, do not count.
2. **Premise**: the primary screen or core flow does not serve the product's purpose or core job (attack ladder layers 1 and 2). A missing feature does not meet this condition; propose it as an enhancement.
3. **Peer gap**: the core task takes at least two more inputs, or 25% more, whichever is larger, than a named peer from the landscape, shown as side-by-side step lists, with the peer's count sourced (an `(unverified)` count cannot satisfy this), and nothing in the profile explains the extra cost.
4. **Identity**: the distinctiveness verdict is `default-assembled` and fixing the listed tells one by one would only swap them for other defaults.
5. **System**: three or more findings, cited by number, whose fixes each touch literal values or untokenised components in three or more files, so the fixes cannot be applied consistently without the token, theming or component layer.

**Checks**
- [Taste] A rework that clears none of the five is downgraded to an enhancement or dropped. — Apple silent
- [Taste] A rework that adds a feature and costs one screen or less is an Enhancement, not a Rework, whatever condition it cites. — Apple silent
- [Taste] Every rework states: what changes, the bar condition it clears, the evidence (finding numbers, step counts, peer source), what it would cost (screens and components touched, migration risk), what it unlocks, and the smallest experiment that would test it before committing (a prototype of one flow, a five-user test, an A/B on the first screen). — Apple silent
- [Taste] Reworks stay buildable on HIG-conformant components and keep task flows conventional. A rework that replaces standard navigation with a novel scheme must argue why the learnability cost is worth it (references/augment/distinctiveness.md, Arc's sidebar check). — Apple silent
- [Taste] Cap: at most three reworks per report, ranked by what they unlock. More than three means the red team has not prioritised. — Apple silent

## Proposal classes
**Intent**: three different kinds of output, kept apart so a reader can see what is a defect, what is an opportunity, and what is a structural bet.

| Class | What it is | Where it goes | Needs |
|---|---|---|---|
| Fix | A defect against a rule or measurement | Findings table | Element, screen, Impact, Apple tag, Fix |
| Enhancement | An improvement with no defect behind it: a better flow, a platform capability the product should use, a theming or identity move, a deletion | Enhancements section | Area, the trace to this product (subject, audience, core job, a landscape gap), the mechanism, what it unlocks |
| Rework | A structural change that clears the rework bar | Reworks section | The fields in "The rework bar" |

**Checks**
- [Taste] An enhancement is never a fix in disguise. If a rule is broken, it is a finding. — Apple silent
- [Taste] Every enhancement names something only this product has (its subject, its core object, its users, a gap in its landscape). "Add dark mode", "add micro-interactions", "add a command palette" with no trace is generic; rewrite it until it names the product or drop it. — Apple silent
- [Taste] Enhancements cover the areas where the evidence points, chosen from: experience and flows, information architecture, visual design and theming, brand and identity, motion and feedback, content and voice, platform capabilities. Do not fill every area for completeness. — Apple silent

## Softness audit
**Intent**: before the report goes out, the red team attacks the draft. Reviews go soft in predictable ways.

**Checks**
- [Taste] Hedged findings: "consider", "you may want to", "could be improved" with no claim. Rewrite each as a claim with evidence, or drop it. — Apple silent
- [Taste] Findings that would fit any app: run "would this fit any product?" on every row and every enhancement. — Apple silent
- [Taste] Unexamined ground: list the flows, states, screens and attack-ladder layers the review never touched. Attack the most important one now, or put it in Unverified with what would verify it. — Apple silent
- [Taste] Rating drift: a report of only Minor and Polish rows on a product with a `default-assembled` verdict, or on a core flow the red team could not walk cleanly, is suspect. Recheck the top rows against the Impact rules; raise only what the rules support. — Apple silent
- [Taste] Missing structural answer: if the rework bar is met and the report proposes no rework, add one. If the report proposes a rework that does not clear the bar, cut it. — Apple silent
- [Taste] Self-consistency: every rewrite, voice sample and enhancement obeys the profile's `voice` (we_policy, contractions, casing, spelling) and every rule the report itself flags. A rewrite that commits the error its own finding names is fixed before the report goes out. — Apple silent
- [Taste] Praise padding: no "great job", no strengths list unless the user asked for one. One line naming what to keep is allowed when a rework would otherwise destroy it. — Apple silent

## Red flags
These thoughts mean the red team is going soft, or going overboard:

| Thought | Reality |
|---|---|
| "The screen is fine, just a few nits" | Go up a layer. Was the premise or the flow attacked? |
| "A rework is too much to suggest" | If it clears the bar, propose it with its cost and smallest experiment. The team decides. |
| "Bold reworks show ambition" | A rework without a bar condition is noise. Downgrade or drop it. |
| "I'll suggest a command palette / dark mode / AI feature" | Only if it traces to this product's job and landscape. Otherwise it is a trend default. |
| "The peer does it, so this product should too" | Peers show the mechanism and the convention. Copying the look adds the product to the clone group. |
| "I should balance criticism with praise" | No praise padding. Name what to keep only when a rework would lose it. |
