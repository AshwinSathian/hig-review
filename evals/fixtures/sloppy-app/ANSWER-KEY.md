# sloppy-app answer key

DO NOT SHOW THIS FILE TO THE REVIEWER during eval runs. The server in evals/cases.md serves this folder, so the file is reachable by URL; never mention it in the reviewer prompt, and score the review only after it is done.

Product: "Swell", a tide-and-surf forecast page. Subject anchors for Elevate: tide curve, swell period, wind direction, break-by-break ratings, dawn patrol timing, NOAA buoy provenance.

Impact and Apple values follow references/report-template.md. A finding counts only if it names the element and the screen (page section).

| # | Selector | Expected finding | Impact | Apple | Reference |
|---|---|---|---|---|---|
| 1 | `#hero` | Centered hero on an indigo-to-violet gradient (template page, convergence tell); measure.js `defaults`: "indigo/violet gradient background" | Major | Taste | references/slop-catalog.md (AI-template, composition) |
| 2 | `#features .card` (3) | Three identical feature cards with emoji icons and generic "Get ..." blurbs that say nothing about surf | Major | Taste | references/slop-catalog.md (identical sibling cards); references/apple/content-a11y.md (icons) |
| 3 | `body` font-family | Font stack starts with Inter; measure.js `defaults`: "Font stack starts with Inter" | Minor | Taste | references/slop-catalog.md (typeface defaults) |
| 4 | `#conditions` (`.glass`, inside `main`) | backdrop-filter glass in the content layer; web has no Liquid Glass (26+) checks, so this is the web layering rule | Major | Web | references/web-mapping.md (Materials and glass); references/apple/visual.md |
| 5 | `#live-error` | "Oops! Something went wrong." names no cause, no state of the data, no fix or retry | Major | SHOULD | references/writing.md (errors, Oops); references/apple/content-a11y.md |
| 6 | `#gen` | "✨ Generate" states no benefit or object (generate what?); sparkle is a slop tell; name the task | Major | SHOULD | references/writing.md (name the feature by the task, "✨ Magic"); references/slop-catalog.md (AI output) |
| 7 | `#signup button[type=submit]` | "Submit" names the mechanism, not the outcome (e.g. "Watch Ocean Beach") | Minor | SHOULD | references/writing.md (button labels) |
| 8 | `#signup input` (3) | Placeholder-only labels: Name, Email, Home break vanish on input; no visible `<label>` | Major | SHOULD | references/apple/components-presentation.md (text fields); references/web-mapping.md (Forms) |
| 9 | `.spots .ib` (6) | 20x20 px icon-only buttons, no accessible name (`aria-label`), under the 24 px minimum; measure.js `targets` under24 | Blocker | MUST | references/web-mapping.md (Targets); references/apple/content-a11y.md (icon-only buttons) |
| 10 | `#toast` and `#tide-skel` | "Saved!" toast confirms an expected action (inline state change beats a toast); skeleton shimmer for an 80 ms load flashes with no benefit (valid only for loads of about 1 to 10 s) | Minor | Taste | references/slop-catalog.md (skeleton, toast rows); references/apple/patterns.md (loading, feedback) |

Notes on 10: the toast appears only after clicking a star button in `.spots`; the skeleton exists for about 80 ms after load, so it is visible only by reading the code or a throttled run. Credit either source. A screenshot-only run (case B) is not expected to find it and should list it under Unverified.

## Bonus (not counted toward recall)

| Selector | Finding | Reference |
|---|---|---|
| whole stylesheet | No `prefers-color-scheme` rule; no dark mode | references/web-mapping.md (Color, contrast, preferences) |
| `.card` | `transition: all .3s` (measure.js `motion.transitionAll`) | references/augment/craft.md |
| neutrals | Tailwind default gray ramp (500, 600, 900) detected by measure.js `defaults` (incidental) | references/slop-catalog.md |
| whole stylesheet | No `prefers-reduced-motion` rule; shimmer and hover lift ignore it | references/web-mapping.md |

## Not planted

Body text contrast, nav link and button target sizes (all at or above 44 px except the icon buttons), landmarks, `lang`, table markup, heading order. Reporting these is noise unless backed by a measured value.

## Expected distinctiveness verdict

default-assembled: indigo gradient, centered hero, 3 equal cards, Inter, glass, emoji, sparkle and "Oops" copy are 5+ tells across layout, accent, typeface, icon and copy voice.
