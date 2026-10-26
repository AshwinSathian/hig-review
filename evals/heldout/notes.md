# Held-out round: notes on the result

Written 26 October 2026, after the tally. `result.md` is the output of `tally.py` and is not edited by hand.

## What the result says

The round failed one of its four pre-registered rules, so by its own terms it failed.

- **Preference: passed, at the threshold.** Judges preferred loupe's report in 6 of 9 pairs (2 or more of 3 judges). The 3 losses were Haiku on the native app, Opus on the control, and Haiku on the control, which all three judges gave to the review written without the skill.
- **Over-reporting on the control: passed.** On the well-built split-the-check app, the median judge flagged 2, 3 and 1 of loupe's findings as wrong or inflated (Sonnet, Opus, Haiku), against 3, 3 and 3 for the reviews without it.
- **Recall: failed.** Summed over the flawed web page and the SwiftUI app, loupe's reports found 27, 27 and 29 of the 29 key items (Haiku, Sonnet, Opus); the reviews without it found 27.5, 26.5 and 27. Haiku with loupe missed by half an item, one "partly" found. Every report, with or without the skill, found all 10 planted defects on the flawed page, so this fixture measured almost nothing about recall.
- **Restraint: passed.** On the control, loupe reported no Blocker and "no rework warranted" with all three models. The reviews without it put 10 findings in their top severity tier across the three models on the same app.

Across all 9 pairs and 3 judges, findings judged wrong numbered 24 for loupe and 38 without it, inflated 40 and 52, and top-severity findings judged unbacked 29 and 44.

The plain reading: on these fixtures, loupe did not help Claude find more problems. Claude already finds most of them. It changed how the problems were rated and argued: fewer findings judges called wrong or inflated, no invented Blockers on a good app, measured numbers where the other reviews estimated. Judges preferred that in two thirds of pairs, not in all of them.

## Deviations from the pre-registration

- **Rule 2 counting.** The pre-registration counts loupe's findings "judged wrong or inflated by at least 2 judges". Judges described findings in their own words, so the same finding could not be matched reliably across judges. `tally.py` instead takes the median, across the three judges, of each judge's count. `tally.py` was committed with the results, so git history cannot show when this choice was made; treat it as a deviation.
- **Scorer prompt for the control.** The scorer for `web-good` was told to test two behaviours in a browser (invalid tax counted as zero, and tax spread over assigned items only), because reports of both conditions claimed them and the key did not list them. It applied to every report on that fixture. Both turned out to be real defects that the fixture's author and checker had missed.
- **Report files.** The harness did not let some reviewers write files, so their reports were taken from their final messages, verbatim. Local paths, and the run folder name (which named the condition), were redacted from every report before judging.
- **Judge rubric and data loss.** The judges' Blocker test (a measured WCAG A/AA failure, a task that cannot be completed, or a likely App Store rejection) left out data loss, which loupe's own Blocker rule includes. Several of loupe's Blockers that judges called unbacked were data-loss findings. The rubric was pre-registered and was not changed.

## What changed in loupe afterwards

Recurring criticisms from the judges, fixed after this round in 1.0.0 (they were not re-tested):

- A glyph-only button whose glyph gives it an accessible name ("☆" reads as "white star") was rated a 4.1.2 Blocker. 4.1.2 needs a missing name; a poor name is now Major.
- Placeholder figures in a development build were rated a Trust-gate Blocker. They now go to Unverified, as the release-stage rule already said for other placeholders.
- Four of the nine skill runs (Haiku and Sonnet on both web fixtures) skipped the landscape research without saying why. The skill now requires the reason in Run notes.
- One run missed the build SDK stated in a `project.pbxproj` comment and fell back to the deployment target. The SDK detection now lists toolchain comments as a source.
