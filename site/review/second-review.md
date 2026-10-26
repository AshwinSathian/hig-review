## Second review, for template tells

Run on the live site on 26 October 2026, after launch, to answer whether loupe's own slop catalogue would call the site template-made. Screenshots at 390 and 1440 px, light and dark, every route. The measurements come from `scripts/measure.js`, including two checks added in this round.

**Verdict before the changes: default-assembled.** The catalogue's cluster threshold is 6 or more tells across 3 or more channels, counting one tell per catalogue row. Recounted that way, the site had 6 tells across 5 channels:

- Eyebrows above every heading, and "Frame 01" numbering on cases that aren't a sequence (layout idiom; row "Section-number and eyebrow habits").
- Monospace on non-code labels, and a version label in the hero (type; row "Fake product theater").
- A near-black ground with one vermilion accent in dark mode, with zero-radius hairlines (colour and shape; row "Second-layer defaults").
- Crop marks on frames that weren't under inspection, beside mono labels (layout idiom; the grid-and-crosshair clone row).
- An orange accent with mono caps labels and spec-sheet tables (colour; the orange-accent clone row).
- Clever section titles that pass the swap test for any product (voice; row "Significance openers and any-company headlines").

The first review listed five tells across four channels, one short of the threshold. It missed the section titles. It counted the crop marks as the authored part of the look. It split the mono labels and the version label into two tells, though the catalogue puts them in one row. And it kept the orange-accent tell but wrote that it was "excused only while the accent's mapping holds". The skill now forbids excusing a tell and recounts voice and layout when a count is one short (see "What changed in loupe").

**After the changes: one tell left, in two channels,** the dark-mode palette (finding 7). No eyebrows, no mono outside code, crop marks only on the screenshot under the ring, plain headings. `measure.js` reports no template tells on any route. That is below the threshold. The first viewport now shows the site's signature, the redline on a live measurement.

### Findings

| # | Finding | Where | Impact | Apple |
|---|---|---|---|---|
| 1 | A tracked, upper-case mono eyebrow sat above every page and section heading: 6 of 6 on `/`, one on every page head. Most repeated the nav ("TESTING" over the Testing page) or the heading below it ("INSTALL" over "Three ways in"). | All routes, `.eyebrow` | Major | Taste |
| 2 | Monospace on text that isn't code: 36 elements on `/`, 145 on `/testing`, 82 on `/specimen` (eyebrows, frame labels, table headers, tags, step numbers, measured values). The catalogue's threshold is more than 2. | `globals.css` `.eyebrow`, `.frame-label`, `th`, `.tag`, `.m`, `.step-n` | Major | Taste |
| 3 | The hero promised measurements and showed none. "A design review that shows its measurements" had no measured value in the first viewport at 390 or 1440 px. The redline first appeared about 1,100 px down, inside the specimen. At 1440 px the half of the hero beside the headline was empty. | `/` hero | Major | Taste |
| 4 | Crop marks on every white frame, and "Frame 01" to "Frame 04" on the case list. The cases aren't a sequence, and most frames weren't under inspection, so the marks were decoration. That's the grid-and-crosshair look the catalogue lists, with nothing behind it. | `/cases`, `/` tag cards, `/specimen` journeys | Major | Taste |
| 5 | Headings in the same clever comma shape, and each would fit any product: "One page, under the loupe", "Reports, unedited", "Apple first, evidence always", "Three ways in", "The steps of a review, report before edits", "Nothing under the loupe here", "Every pair, every judge", "Who comes here, and the path each takes". | `/`, `/cases`, `/method`, `/testing`, `/specimen`, 404 | Major | Taste |
| 6 | The test result headline could be read two ways. "No more defects found." reads as "no further defects were found". It means loupe didn't find more defects than the review written without it. | `/testing` h1, `/` h2 | Major | Taste |
| 7 | The palette matched the closest peer. The site's own landscape note says Impeccable also uses a grey paper ground, one saturated accent and a mono face. Dark mode is the catalogue's "near-black ground with one vermilion accent". The difference was meant to come from what the red marks, but no red was visible until the specimen. | `globals.css` tokens; `/specimen` "Against the landscape" | Minor | Taste |
| 8 | At 390 px the six-item nav wrapped to two rows above the hero. | Masthead | Minor | Web |
| 9 | At 390 px the hero's install command was cut off at "AshwinSathia". The install section's commands already wrapped. | `/` hero `.cmd pre` | Minor | Web |

### What changed

| # | Status | Change |
|---|---|---|
| 1 | Fixed | Eyebrows are gone from every heading. The case pages keep one label, the case's kind, because the heading doesn't say it. It is set in sentence case in the text face. "Claude Code skill" moved into the lede. |
| 2 | Fixed | Mono is only for code and commands: things you might type. Measured values, tags and labels use the text face, with tabular figures where they are numbers. The version label left the hero. `measure.js` now finds no non-code mono elements on any route. |
| 3 | Fixed | The hero headline is measured in your browser and judged the way a finding is: its height as a dimension line just past the last letter, its size and whether WCAG counts it as large text, and its contrast against the page with the 1.4.3 verdict. The numbers are computed live and change with the window, zoom, fonts and colour scheme. The space is held empty until they are real, so nothing shifts and nothing is invented. In forced colours the contrast line is left out, because the system palette is drawn, not the page's. |
| 4 | Fixed | Crop marks stay only on the screenshot under the ring. Frame numbers are gone, and each case's kind sits under its title instead of above it. |
| 5 | Fixed | The headings now say what's under them, for example "5 findings from a blind run", "Every finding has two tags", "Install", "Unedited reports", "How loupe reviews", "All nine pairs and each judge's vote", "No page at this address". |
| 6 | Fixed | "Blind judges preferred loupe's review in 6 of 9 pairs". The build still checks the number against the judges' files. |
| 7 | Not changed | The palette stays. The catalogue's own remedy is to give each colour one job, and the red now has one: in the first viewport it marks only live measurements. If a later review still confuses the site with its peer, the palette is the next thing to change. |
| 8 | Fixed | Specimen left the main nav; the footer links to it. The nav fits on one row at 390 px. |
| 9 | Fixed | Every command box wraps. |

### What changed in loupe

- **Two new tells in `measure.js`.** "Eyebrow label above N of M headings" fires when 3 or more h1 and h2 headings, and at least half of them, have a short label straight above set apart by capitals, tracking or a size below body text. Dates and reading times don't count. "Monospace on N non-code text elements" fires above 2. It finds mono by glyph width rather than by font name, so Fira Code counts and Monotype Corsiva doesn't. It ignores code, form fields, icon fonts and hidden text, and it stays quiet on a page whose body text is mono on purpose. The catalogue listed both patterns but `measure.js` didn't check them, so the first review counted them by eye. On the live site before these changes the new checks fired on every route but the FAQ. After the changes they find nothing. The sharper eyebrow check also caught the case kinds this round had first put above each case title.
- **No excused tells.** The distinctiveness verdict now counts every matched tell. A direction, a mapping that only partly holds or an owner's deliberate choice goes beside the count, not into it. A direction a visitor can see only in code comments or on a style page traces nothing.
- **Recount near the threshold.** When the count is one short of the threshold, voice (section titles under the swap test) and layout idiom (labels above headings, numbering on things that aren't sequences) are recounted before the verdict.
- **Logo-off answers come from the first viewport.** An owned element that only appears after scrolling no longer counts. The first review's answer named crop marks, red numerals and the ring, and none of them was visible before scrolling.
