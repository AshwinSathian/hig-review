| # | Finding | Status | What changed |
|---|---|---|---|
| 1 | Hovered finding number 4.05:1 | Fixed | Hover ground is `--sheet`; finding numbers are no longer red. Hover and selected pairs are in the build check. |
| 2 | Inline code scrolls the page at 320 px | Fixed | Inline code and links wrap. Every route measures 320 px wide at 320 px. |
| 3 | 404 page has the home page's title | Fixed | "Page not found \| loupe", and the page is not indexed. |
| 4 | Case pages: baselines hard to find | Partly | Jump list to each model's report and baseline, linkable baselines, next steps at the end. Reports stay one above the other: each runs to thousands of words, too long to read side by side. |
| 5 | Forced colours hides focus on the selected row | Fixed | Selection is a border; focus keeps its outline. |
| 6 | Copy buttons all named "Copy"; failures hidden | Fixed | Each button names its command; a failed copy selects the text and says how to copy it. |
| 7 | Contrast checker announces the whole panel | Fixed | One short announcement after typing pauses. |
| 8 | Pages scroll sideways at 200% text | Fixed | Heading size capped, grids allowed to shrink, code and links wrap. Every route measures 390 px wide at 390 px with 200% text. |
| 9 | Bookmarklet only installable by dragging | Fixed | "Copy bookmarklet" with steps that work on a phone. |
| 10 | Rules quoted with no key | Fixed | A key above the quote; the agent-facing text sits in a disclosure. |
| 11 | Install commands cut off | Fixed | One column, commands wrap and show whole. |
| 12 | Seven `h1`s per case page | Fixed | Embedded report headings are demoted two levels; each report is an `article` headed with its model. |
| 13 | FAQ questions show no disclosure marker | Fixed | A + / – marker drawn in text. |
| 14 | Redline used on things that aren't measurements | Fixed | Step numbers, finding numbers, the 404 code, the wordmark and hover states use ink or grey. Red stays on measured values and the cross inside the ring. |
| 15 | Home page's Blocker definition disagrees with the skill | Fixed | Rewritten to match SKILL.md's Impact rule; /method quotes the rule itself. |
| 16 | Contrast table claims a guarantee it lacks | Fixed | Renamed "The pairs the build checks"; hover, selected, pressed and focus pairs added. |
| 17 | Every page shares the home page's social metadata | Fixed | Each page has its own Open Graph title, description and URL. |
| 18 | Four identical filled Copy buttons | Fixed | Only the hero's is filled. |
| 19 | Method link and tools claim don't match | Fixed | Link and sentence reworded. |
| 20 | Hero doesn't say the command runs in a terminal | Fixed | It does now; the plugin route is first under Install. |
| 21 | Colour error says what's wrong, not how to fix it | Fixed | It gives three formats that work. |
| 22 | No pressed states; sticky hover on touch | Fixed | `:active` states, and hover fills only where hovering exists. |
| 23 | No increased-contrast variant; dark frames barely lift | Partly | `prefers-contrast: more` turns hairlines into rules and grey text into ink; the dark frame is lighter (still ≥3:1 for borders). The colour table has no increased-contrast column yet. |
| 24 | Mono shrunk to off-scale sizes | Fixed | Mono is set at 1em. |
| 25 | Tight h1 leading and tracking | Fixed | Line height 1.04, tracking −0.02em. |
| 26 | Mixed spelling and brand casing | Fixed | "catalogue", "grey", and "loupe" in lower case everywhere, including the skill. |
| 27 | Nav wraps to two rows | Partly | GitHub left the nav (it's in the footer). Cases was not folded into Testing. |
| 28 | Finding list announced as toggles | Fixed | A tab list with arrow keys; the panel names the finding. |
| 29 | Ring moved by `left`/`top`; misregisters on resize | Fixed | Moved by `transform`; no animation while the window is resized. |
| 30 | Crosshair vanishes in forced colours | Fixed | Drawn as SVG, `CanvasText` in forced colours. |
| 31 | Bookmarklet panel takes over Escape and drops focus | Fixed | Escape only while focus is in the panel; focus returns where it was. |
| 32 | Home steps don't match the skill's | Fixed | Names and numbers are read from SKILL.md at build time; the build fails if they drift. |
| 33 | Specimen principles overclaim | Fixed | Reworded to what the site does. |
| 34 | Unsourced landscape claim | Fixed | Names and links the closest peer, with the month checked. |
| 35 | FAQ answers contradict the skill | Fixed | Both answers match SKILL.md and red-team.md. |
| 36 | "Never saw loupe's rules" overstates | Fixed | "Was told not to read"; the cases lede says the fourth case is this site. |
| 37 | Tools page promises a CSP message that doesn't exist | Fixed | It says what actually happens. |
| 38 | Five polish items | Fixed | Lighter nav hover, tabular figures only on numbers, crop marks on the loupe stage, three-level breadcrumb, 404 wording. |
| R1 | Hand-written claims drift from their sources | Partly | The step list and the testing headline are now read from or checked against the repo at build time, and the contrast check covers interaction states. The Blocker definition, FAQ and Specimen text were fixed by hand and are not checked. |
| E3 | Check the seal in the browser | Done | /testing hashes the published keys against the hashes committed before any run. |
| E1, E2, E4–E6 | Other enhancements | Not taken | Cases stays its own section; no hosted demo, per-finding status, colour suggestions or per-page share images yet. |

After the fixes, the skill's measurement runner was run again on all eleven routes: no text fails contrast in any of its 12 width, scheme and motion combinations, and every route reflows at 320 px and at 390 px with 200% text.
