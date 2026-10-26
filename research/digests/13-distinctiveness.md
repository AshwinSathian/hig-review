# 13 · Distinctiveness: how an interface earns its own identity and stays usable

Digest for the `loupe` skill. Compiled 2026-10-23.

**Ground rule (from the user, binding):** Apple HIG is the base. Everything here augments it. A distinctiveness finding never asks a product to break HIG clarity, hierarchy, consistency, platform conventions or accessibility. Identity is a layer of brand expression on top of a correct HIG base. It is not a license to replace system controls, invent navigation, or trade legibility for mood.

**Second ground rule:** most current "slop" is copied *popular* patterns, including those of praised products (Linear, Stripe, Vercel, Arc, shadcn, Notion, Apple's own keynote pages). So case studies below extract the *mechanism* that produced distinctiveness, never a look. The skill must never recommend a direction that is itself a trending default (see the catalog's "praised-product clone" section and the anti-recommendation guard in the pass).

Tag legend: [MUST] = finding is a defect; [SHOULD] = strong recommendation; [CONSIDER] = situational. "(unverified, from memory)" = recalled, not fetched this session.

---

## Part A. Evidence that design converged, and why

### A1. Goree, Doosti, Crandall, Su. "Investigating the Homogenization of Web Design: A Mixed-Methods Approach", CHI 2021

**Why it matters.** The only measured evidence I found that pre-AI web design converged. Computer vision over website images 2003-2019 found designs "significantly more similar since 2007, especially for page layouts where the average distance between sites decreased by over 30%." Interviews with 11 web professionals attributed it to shared source code and libraries, color-scheme standardization, and mobile support. So homogenization predates LLMs; LLMs inherit and amplify it.

**Principles/checks.**
- [SHOULD] Treat *layout* as the most converged channel. A product that is distinctive only in color/type but uses the median layout will still read as generic at a glance.
- [CONSIDER] Shared libraries are a named cause. Library use is fine; *unmodified* library defaults are the convergence vector.

**How the skill tests it.** Blur/squint the screenshot (or downsample to ~64px wide) and compare its block layout to the median pattern for the page type (centered hero + 3 cards + logo row; sidebar + table; large-title + inset grouped list). If the silhouette matches the median and nothing else carries identity, flag it.

### A2. Matt Ström, "Sameification" (essay)

**Why it matters.** Argues convergence is rational, not lazy: Hotelling-style competition makes rivals cluster; overloaded teams make "the minimum investment for functionality, meaning minimum risk"; Jakob's law means "Minimizing pattern variation increases task success rate"; and differentiators get copied (Stories). This is the honest counterweight. Some sameness is *correct* and the skill must not punish it.

**Principles/checks.**
- [MUST] Separate *interaction convention* (should converge: HIG navigation, controls, gestures, form patterns) from *expression* (should not: color usage, type voice, imagery, motion character, copy voice, signature moments). Only flag sameness in the second.
- [SHOULD] Assume any distinctive *feature* will be copied. Durable identity lives in the consistent execution of a system of assets, not in one novel widget.

**How the skill tests it.** For every "generic" flag, the reviewer must state which layer it is in. A flag on a standard tab bar or a standard settings list is a false positive.

### A3. Design Creativity Bench (Rusia, Bhole, Gupta, Dey; arXiv:2610.11539, Oct 2026)

**Why it matters.** Direct measurement of LLM-generated UI sameness. Abstract: LLM default output, "though generally appropriate, is substantially more repetitive than the human baseline." Reported figures (from the arXiv page): originality 0.592 for same-prompt pairs from different models vs 0.764 for human-vs-model pairs; creative range 0.581 across models vs 0.902 for human designs; appropriateness above 90% for every model (best 99.2%) vs 98.0% for humans. Models evaluated were not named on the abstract page.

**Principles/checks.**
- [MUST] "Appropriate" is not the bar. Generated UI already passes acceptance criteria; it fails on range: the same answer for a cookware brand and a dev tool.
- [SHOULD] Test *creative range*: does the product look like it belongs to its domain, or would the same screen ship for any domain?

**How the skill tests it.** Domain-swap question: "If this were a banking app / a kids' app / a dev tool, what on this screen would have to change?" If the answer is "only the copy and the logo", the expression layer is empty.

### A4. Wider LLM homogenization literature

**Why it matters.** Background for why prompting "be creative" does not fix it. Jiang et al., "Artificial Hivemind" (NeurIPS 2025) reports mode collapse within and across models; Yun et al. (Findings of EMNLP 2025) argue chat templates themselves reduce variability of form; Kosta Canatselis cites a Nature "model collapse" paper (loss of distribution tails). All found via search summaries; I did not read the full papers.

**Principles/checks.** [SHOULD] The skill should not rely on its own aesthetic taste for recommendations; its taste is the median. Recommendations must be derived from inputs specific to the product (subject matter, user, content, existing brand assets), and checked against the tells catalog before being proposed.

### A5. The Tailwind indigo story and the slop essays (2025-2026)

**Why it matters.** Gives a concrete, citable mechanism. prg.sh ("Why Your AI Keeps Building the Same Purple Gradient Website", Oct 2025): Adam Wathan apologized in August 2025 for making every Tailwind UI button `bg-indigo-500` five years earlier; the post argues training data from 2019-2024 taught models "modern web design = purple buttons." Its tells: Inter/Roboto, purple/indigo accents, centered hero with CTA, three icon boxes in a grid, white/light-gray background, rounded corners everywhere, shadows "at exactly 0.1 opacity". Canatselis ("Spot the Slop", July 2026) defines slop as "design with no author" and lists: opinionless type, decorative purple-blue gradients, headlines that fit any company, uniform padding/radius/card height, missing unhappy-path states, absent-or-identical motion, everything visible at once, and the left-edge colored accent line on panels. Several 2026 guides warn that swapping one default triggers a *second* default (warm cream + terracotta).

**Principles/checks.**
- [MUST] Do not fix slop by substitution (Inter → Geist, indigo → terracotta, Lucide → Phosphor). The second-layer default is already catalogued as a tell.
- [SHOULD] Canatselis's closing test is good and cheap: does it "feel like it came from somewhere," and would anyone miss it if removed?

**How the skill tests it.** See catalog. Key code signals: `bg-indigo-500|600`, `from-purple-* to-blue-*`, `shadow` at `rgba(0,0,0,.1)`, one `rounded-*` value on everything, `font-family: Inter`.

### A6. pixelslop pattern catalog (npm `pixelslop@0.3.8`, ai-slop-patterns.md)

**Why it matters.** The most operational detector I found: 26 visual patterns with DOM/CSS heuristics, 16 source greps, severity bands (CLEAN 0-1, MILD 2-3, SLOPPY 4-6, TERMINAL 7+). Examples: gradient text via `background-clip:text`; 3+ `backdrop-filter` elements; dark body plus >2 saturated glow shadows; "hero metric layout" (2+ numeric-only nodes ≥24px); 3+ sibling cards with identical dimensions; >2 non-code text elements in monospace; cubic-bezier y ≥1.3; one-sided accent borders ≥3px; >70% of headings/paragraphs centered; icon above each of 3+ headings; spacing collapsing to ≤2 unique values; uniform image hover-zoom.

**Principles/checks.**
- [SHOULD] Its false-positive rule is the right one: single patterns are legitimate; flag *combinations* and scale confidence to page size. "Core test: did a human make this choice, or did the AI fall back to a default?"
- [CONSIDER] Borrow the heuristics for web targets; they don't apply to native SwiftUI/AppKit.

**How the skill tests it.** Run its heuristics (or a port) on web builds via Playwright; count; report band. Note: the catalog's own pattern 4 code has a bug (`isDark` referenced without being called), per the fetch summary.

---

## Part B. Brand science, translated to interface

### B1. Jenni Romaniuk, *Building Distinctive Brand Assets* (2018) and the Ehrenberg-Bass asset grid

**Why it matters.** Gives the skill a vocabulary that is not "taste". An element is a distinctive asset only if it is both **famous** (share of category buyers who think of the brand when shown the element without the name) and **unique** (share of all brand links to that element that point to this brand). Grid quadrants, as summarized from WARC-based sources: *use or lose* (famous + unique), *investment potential* (unique, not yet famous), *avoid solo use* (famous, not unique: it evokes competitors, so it must appear with the brand name), *ignore or test* (neither). One summary claims assets above 50% uniqueness make the brand dominant recall; unverified. Romaniuk's Marketing Week column title "Leaning on meaning could undermine your distinctive assets" signals her view that an asset's job is to identify, not to explain (article returned 403; argument inferred from title and from memory, unverified).

**Translation to UI.** Interface elements that can become assets: a specific color *used a specific way* (not just a hex), a typeface or type treatment, a shape language (corner geometry, a recurring motif), icon drawing style, illustration style, a character, a motion signature (curve, timing, a recurring transition), sound and haptics, a layout idiom, microcopy voice, and a signature interaction.

**Principles/checks.**
- [MUST] An element that is common in the category (indigo accent, Inter, glass cards, bento grid, rocket-for-launch icon) is at best "avoid solo use". It cannot carry identity alone. Flag products whose *only* identity carriers are category-shared.
- [SHOULD] Meaningful-but-generic metaphors (shield = security, rocket = launch, sparkle = AI) are category cues, not assets. They aid comprehension; credit them for usability, not for identity.
- [SHOULD] Fame comes from consistent repetition. An asset used on one screen is not an asset. Check that the chosen elements recur across onboarding, empty states, notifications, icon, website and App Store screenshots.
- [CONSIDER] Prefer *investing* in an element with uniqueness that already exists in the product over inventing new ones each redesign.

**How the skill tests it.** (1) Logo-off test: remove the wordmark/app icon from 3 screenshots; ask what still identifies the product. (2) Logo-swap test: put a competitor's name on it; does anything look wrong? (3) Asset inventory table: element, unique-in-category? (yes/no/shared with X), repeated across N of M surfaces. The reviewer can't measure fame; repetition and consistency are the proxy.

### B2. Byron Sharp, *How Brands Grow* (2010)

**Why it matters.** Sharp argues (per secondary summaries; book not read this session) that *differentiation* matters less than marketers think and that growth comes from mental and physical availability, built by distinctive assets used consistently across touchpoints. For UI this reframes the goal: the product doesn't need to be *different in kind*; it needs to be *recognizable* and easy to recall. That is compatible with HIG conventions: you can use standard navigation and still be instantly recognizable.

**Principles/checks.**
- [SHOULD] Judge distinctiveness as recognizability, not novelty. A conventional layout with a consistent, owned color usage, type voice and motion signature beats a novel layout that is executed differently on every screen.
- [SHOULD] Consistency over time: flag redesigns that discard existing recognized assets without reason (Linear's "evolve, don't replace" is the product-side version of this; see C1).

**How the skill tests it.** For redesign reviews, diff old vs new for which recognized assets survived. Ask whether the team has a list of its assets at all.

---

## Part C. Emotional design

### C1. Don Norman, *Emotional Design* (2004) (unverified, from memory)

**Why it matters.** Three levels: **visceral** (immediate appearance and feel), **behavioral** (the pleasure and effectiveness of use), **reflective** (meaning, self-image, memory, what the product says about the user). Generic UI usually fails at reflective: nobody is proud of, or remembers, the median interface. Behavioral pleasure is where HIG lives (responsiveness, feedback, direct manipulation), so it is the safe place to put identity on Apple platforms.

**Principles/checks.**
- [SHOULD] Review each level separately. Visceral identity (color, type, imagery) without behavioral quality reads as a skin. Behavioral quality without visceral identity reads as "nice but anonymous".
- [CONSIDER] Reflective identity often lives outside the main screen: the app icon, the share card, the year-in-review, the sound of completion, the tone of a milestone.

**How the skill tests it.** Ask three questions: "What does the first screenshot make you feel, and is it on-brief?" (visceral) "Which interaction is a pleasure to repeat?" (behavioral) "What would a user tell a friend about it, or show them?" (reflective). Missing answers are findings.

### C2. Aarron Walter, *Designing for Emotion* (A Book Apart, 2011)

**Why it matters.** Remaps Maslow onto a hierarchy of user needs: **functional → reliable → usable → pleasurable** (sources confirm the order). Pleasure only counts once the lower tiers hold, which is exactly the ordering the user wants: HIG first, identity on top. Walter also proposes a **design persona**: a written personality for the product (he built Mailchimp's Freddie-era voice; that attribution is from memory, unverified). Mailchimp's published voice shows the shape: "We are plainspoken... genuine... translators... Our humor is dry"; "weird but not inappropriate, smart but not snobbish"; "You have the same voice all the time, but your tone changes"; tone "changes depending on the emotional state of the person you're addressing."

**Principles/checks.**
- [MUST] No pleasure-tier finding may be raised while a functional/reliable/usable defect exists on the same flow. Report order follows the pyramid.
- [SHOULD] The product has a written personality with "X but not Y" boundaries. Without it, every expressive decision is arbitrary and drifts to defaults.
- [SHOULD] Voice is constant; tone flexes by user state. Errors and destructive confirmations get the least playful tone.

**How the skill tests it.** Ask for (or infer and propose) the persona. Then grep user-facing strings: is the voice consistent across onboarding, errors, empty states, notifications? Flag jokes in error or payment states.

### C3. Aesthetic-usability effect: what the evidence actually says

**Why it matters.** Teams use "attractive things work better" to justify decoration. The evidence is narrower.
- Kurosu & Kashimura (1995): 26 ATM layouts, 252 participants; apparent usability correlated with apparent beauty (r = 0.589 per secondary summary), more than with functional layout factors. This is *perceived*, pre-use.
- Tractinsky (CHI '97) replicated in Israel with very high correlations between perceived aesthetics and a priori perceived ease of use.
- Tractinsky, Shoval-Katz & Ikar (2000), "What is beautiful is usable", *Interacting with Computers* 13(2): the effect persisted after use (as I recall; secondary summaries vary, unverified).
- Tuch, Roth, Hornbæk, Opwis, Bargas-Avila (2012), *Computers in Human Behavior* 28(5), 80 participants, 2×2 aesthetics × usability online shop: aesthetics did **not** affect perceived usability; **usability affected post-use perceived aesthetics**, mediated by affect (frustration lowers beauty ratings).
- Mixed cross-cultural replications (e.g., Cyr et al. 2006 found no significant link in Canada, per a review summary).

**Principles/checks.**
- [MUST] Never accept aesthetics as compensation for a usability defect. The stronger, more recent finding runs the other way: bad usability makes the product look worse.
- [SHOULD] Aesthetics earns first-impression trust and tolerance; it is legitimately part of quality, but its effect is strongest on static, pre-use judgments.

**How the skill tests it.** When a team defends an expressive choice that costs legibility, target size, or contrast, cite Tuch 2012 and require the HIG fix first.

### C4. Google, Material 3 Expressive research (design.google, 2025)

**Why it matters.** The largest public study linking expression to both preference and speed. Google reports **46 studies, hundreds of designs, more than 18,000 participants**, over about three years. Tactics: **color, shape, size, motion, containment**. Findings as stated on the page: expressive designs "strongly preferred by people of all ages," up to **87%** among 18-24-year-olds; participants spotted key UI elements "up to four times faster" (eye tracking, 10 apps); in the email case study, a larger prominent Send button was found 4× faster; users 45+ matched younger users' fixation times; desirability measures (Warren et al. 2019) rose: subculture perception +32%, modernity +34%, rebelliousness +30%. Caveats on the page: "not a one-size-fits-all solution"; banking may need established patterns; a scattered album-art playlist looked modern but scored lower on usability; removing text labels from email actions hurt usability; unfamiliarity reduced benefits; "a strong minority preferred calmer designs"; "No amount of emotion can compensate for a lack of clarity." Business Insider reported Google comparing against non-expressive designs following iOS HIG (secondary, unverified). This is first-party research by a system vendor, not peer-reviewed.

**Principles/checks.**
- [SHOULD] The speed gains came from expression used *for hierarchy*: making the key action bigger, higher-contrast, contained. That is fully HIG-compatible (HIG hierarchy). Expression aimed at the primary action is the safest, best-evidenced kind.
- [MUST] Expression must not remove labels or scatter familiar list structures (both measured as harmful).
- [SHOULD] The M3 Expressive *look* (shape-morphing "cookie" shapes, springy oversized buttons) is now itself a vendor default. Take the mechanism, not the shapes.

**How the skill tests it.** Ask: "Where does expression land?" If it is on the primary action and key state changes, good. If it is on chrome and decoration while the primary action is a default button, flag misplaced expression.

---

## Part D. Case studies: the repeatable mechanism, not the look

For each: what's distinctive, the principle to extract, and what copying the look produces (now a tell).

### D1. Linear
- **Distinctive:** product-wide restraint and alignment; dense but calm; one coherent theme system. Its 2024 redesign moved themes from HSL to **LCH** and derived light/dark themes from **three variables (base, accent, contrast)** instead of 98, which also enabled high-contrast themes. "A redesign should not completely disassemble the product to its atomic parts." 2026 refresh: "Don't compete for attention you haven't earned"; "Structure should be felt not seen"; sidebar dimmed so content leads; fewer separators; palette moved warmer and less saturated; "most of what makes software feel good is what you aren't likely to see."
- **Principle:** identity from *systematic consistency and hierarchy discipline*, generated from a small set of parameters, plus evolution rather than reinvention. This maps directly onto HIG hierarchy and deference to content.
- **Copying the look gives:** the Linear clone (dark, blurred indigo glow, animated glowing artifacts, glass). Daryl Ginn's "The Linear effect" (Rectangle, Jan 2023) reduced it to "Dark, your website has to be dark", blurred gradients, glowing animated artefacts, and a squint test where four sites are indistinguishable ("I'm not sure I can"). He also notes Stripe's earlier gradients/diagonals as "the old 'Linear'".
- [SHOULD] Check whether the color system is parametric (few inputs, derived tokens) and whether chrome recedes relative to content.

### D2. Things 3 (Cultured Code)
- **Distinctive:** the **Magic Plus** button: tap to create, or *drag* it to the exact place (a position in Today, a project list, a day in Upcoming, the Inbox) to create there. MacStories noted it sounds like a Material FAB "but it doesn't feel that way." Calm type-led layout, careful animation, a tiny palette.
- **Principle:** a *signature interaction* that is a better answer to the product's core verb (capture a to-do, in context), using standard platform mechanics (drag and drop). Distinctive and HIG-native.
- **Copying the look gives:** another white, airy checklist app with a blue accent.
- [SHOULD] Ask: what is this product's core verb, and is there one interaction that makes it better than the platform default? (The ADA year for Things 3 was not confirmed in search; Apple lists it as an ADA winner.)

### D3. Teenage Engineering (OP-1 and others)
- **Distinctive:** constraints as aesthetic and as workflow (the OP-1 shipped with four tracks, limited recording time, no undo, per a retailer blog; the company frames constraints as forces for focus). Color-coded encoders that map to on-screen parameter colors (unverified, from memory).
- **Principle:** *a strict mapping system* (color = control, everywhere) plus a deliberate limit that shapes behavior. Color as a functional language, not decoration. HIG-compatible when color is redundant with labels/position.
- **Copying the look gives:** "industrial" UIs with orange accents, mono labels and grid lines that encode nothing. (Our `industrial-brutalist-ui` skill sits close to this risk.)
- [CONSIDER] Ask whether any color in the product has a single consistent meaning.

### D4. Playdate (Panic with Teenage Engineering)
- **Distinctive:** a 1-bit Sharp Memory LCD, no backlight, and a crank used as analog input. Georgia Tech talk summary: "old tech... new design... and some just-plain-weird ideas."
- **Principle:** *a committed constraint applied across the whole system* (1-bit imagery, dithering, crank-native games) so every piece of content inherits identity. Panic also first tried an ID firm that "absolutely did not understand Playdate" (Domus), a reminder that identity needs a partner who shares the premise.
- **Copying the look gives:** dithered "retro" illustrations sprinkled on a modern SaaS page.
- [CONSIDER] Is there a constraint the product commits to everywhere, or only in the hero?

### D5. Panic apps (Nova, Transmit, etc.) (unverified, from memory)
- **Distinctive:** native Mac conventions followed closely, with character in app icons, illustrations, release notes voice and small delights.
- **Principle:** *platform-native first, personality in the margins* (icon, empty states, copy, about box). This is the model closest to the user's ground rule.
- [SHOULD] For Mac apps, check that personality appears in icon, empty states, onboarding and copy while controls stay native.

### D6. Nothing OS
- **Distinctive:** monochrome, the Ndot dot-matrix typeface, Glyph lights carrying information off-screen, widgets as controls. Reported: Nothing OS 1.0 stayed close to Android; with 4.0, Geist became the system typeface and Nothing said the dot-matrix style would be used "more intentionally, where it can define character rather than compromise readability" (quote via search summary; the community page didn't load).
- **Principle:** *ration the signature asset to where it defines character; give readability to a neutral face.* This is exactly the HIG-compatible move: system/neutral text for reading, a signature face for display moments.
- **Copying the look gives:** dot-matrix fonts and red dots on random dashboards.
- [SHOULD] Check that any display/brand typeface is limited to display roles and never used for body, controls, or dense data.

### D7. Airbnb 2025 redesign
- **Distinctive:** dimensional, animated 3D iconography built in-house over a couple of years; softer curved forms; "a smooth animated interface with subtle intensities"; aim "Fun, alive, and simple" while still Airbnb; design VP Teo Connor: icons are "a universal language, and they're playful," and the design must enhance booking, "not get in the way of it" (It's Nice That).
- **Principle:** *own an asset class* (an icon/illustration family made in-house, used consistently) while keeping the booking flow conventional. Expression in browse and delight surfaces; convention in the transaction.
- **Copying the look gives:** clay-3D emoji-style icons, now a stock asset genre.
- [SHOULD] Check that expressive assets are in-house or customized and stop at transactional steps.

### D8. Notion illustration
- **Distinctive:** brand illustration by Roman Muradov (confirmed); a loose, hand-drawn ink style with characters (style description from memory, unverified).
- **Principle:** *one human author's hand* applied consistently is hard to replicate and reads as authored.
- **Copying the look gives:** the Notion clone: warm off-white, gray text, line-sketch people, pastel tag chips. Our `minimalist-ui` skill prescribes nearly this exact palette and illustration style, which means following it produces a clone.
- [SHOULD] If the product uses illustration, is it commissioned or customized, or is it a recognizable stock/AI style?

### D9. Duolingo character system
- **Distinctive:** a cast of characters animated with Rive state machines that turn a limited set of assets into many combinations (Duolingo blog, via search); Lily as a video-call partner that "listens, reacts, and... feels alive" (Rive blog).
- **Principle:** *characters as a stateful system* that reacts to the user's progress, not mascots pasted on screens. Expression is tied to feedback (correct, wrong, streak), which is also a behavioral-level usability gain.
- **Copying the look gives:** a mascot in the empty state that never appears again.
- [CONSIDER] If a mascot exists, does it respond to state, and does it appear across the journey?

### D10. Stripe
- **Distinctive:** Söhne type (Klim), a particular violet, an animated multi-stop gradient used behind heroes; long-running editorial craft. Details come from third-party reverse-engineered "design system" pages, so treat values as unverified.
- **Principle:** consistent typographic voice and one well-executed signature surface, applied for years.
- **Copying the look gives:** the Stripe clone (animated gradient mesh hero, skewed diagonal sections, light-weight display type). Many sites now sell "Stripe DESIGN.md" files, which is direct evidence that praised looks are being mass-distributed to agents.

### D11. Arc (The Browser Company)
- **Distinctive:** a structural idea (vertical sidebar of tabs/spaces, Boosts to restyle sites, Easels), colorful per-space theming. Reviews call the sidebar odd at first but distinctive, with a learning curve.
- **Principle:** identity from a *different model of the core object* (tabs as a persistent workspace), which is a product decision before it is a visual one. Note the cost: learnability. On Apple platforms, a novel model must still meet HIG expectations for discoverability and standard shortcuts.
- **Copying the look gives:** gradient window chrome and soft pastel UI.

### D12. Apple Design Award winners (2025)
- Categories: Delight and Fun, Innovation, Interaction, Inclusivity, Social Impact, Visuals and Graphics; 36 finalists. Winners include CapWords (photos of objects become interactive stickers for language learning), Balatro, Feather: Draw in 3D, Infinity Nikki, Play, PBJ – The Musical.
- **Principle:** Apple itself rewards character inside its platform rules. Winners tend to have one idea that is native to their content (CapWords' sticker-from-photo). This is the strongest argument for the user's framing: HIG and identity are not in tension.

### Cross-case mechanisms (what actually repeats)
1. **Derived from the subject.** Identity comes from the product's content, material, or core verb (Things: capture-in-place; CapWords: photo-to-sticker; Playdate: crank).
2. **One committed constraint or signature, rationed.** (Nothing's dot-matrix limited to display; Linear's restraint.)
3. **A system, not a skin.** Parametric color (Linear), state-driven characters (Duolingo), color = control mapping (TE).
4. **Consistency over time.** Assets repeated across every surface and kept across redesigns.
5. **Convention where the task is.** Transactions and dense task flows stay conventional (Airbnb booking, Panic's native controls); expression lives in browse, empty, success, onboarding and brand surfaces.
6. **Authored by a person.** In-house icons (Airbnb), one illustrator (Notion), a founder's concept (Linear). Stock and library assets carry no authorship.

---

## Part E. Methods

### E1. Design principles workshop
- Matt Ström's procedure: invite the people accountable for outcomes ("pigs") and keep advisors as consultants ("chickens"); roles: facilitator, scribe; ~60 minutes: check-in 5, align 10, diverge and write 15 (one principle per note), converge and theme 15, dot vote 10, check-out 5; then publish and make principles highly visible. Core claim: "Good design principles are written as a team." Miro templates suggest 5-8 people, 3-5 principles. A Better health team retrospective: settle first whether principles are about end users or about how you build; draft as "Our design should..." sentences.
- [SHOULD] Good principles are opinionated: each should rule something out and resolve a real tradeoff (e.g., "dense over spacious", "calm over exciting"). A principle any competitor would also sign ("simple", "intuitive", "delightful") is not a principle. (This criterion is my synthesis; Ström's article defers it to a footnote.)
- **Skill test:** ask for the principles. If none exist, the skill infers 3 candidate principles from the product and flags "no authored point of view". If principles exist, check each against the "would a competitor sign this?" test and check whether the UI actually obeys them.

### E2. Brand-to-UI translation
A practical chain the skill can walk (synthesis):
1. Brand attributes (persona, "X but not Y").
2. Which channels carry each attribute: color usage, type, shape, icon style, illustration, motion, sound/haptics, copy voice, layout idiom, signature interaction.
3. Where each channel is allowed to be loud (expressive zones) and where it must defer (productive zones).
4. Tokens that encode it (see E3), so it survives implementation.
- [SHOULD] Each brand attribute maps to at least one channel and one token. Attributes without a channel are slogans.

### E3. Productive vs expressive tokens (IBM Carbon)
- Carbon splits motion into **productive** ("efficiency and responsiveness, while remaining subtle and out of the way") and **expressive** (for "significant moments such as opening a new page, clicking the primary action button, or when the movement itself conveys a meaning"), with separate easing tokens per mode (`standard`, `entrance`, `exit` × `productive`, `expressive`); productive standard easing quoted as `cubic-bezier(0.2, 0, 0.38, 0.9)` (via a secondary source quoting Carbon). Duration values seen online conflict; unverified. Carbon also has productive vs expressive type sets (unverified, from memory).
- [SHOULD] Products should have two registers. If every transition uses the same easing and duration, the product has no hierarchy in motion. If everything is expressive, it fights HIG deference.
- **Skill test:** grep motion definitions (`withAnimation(.spring...)`, `.animation(`, CSS `transition`, `cubic-bezier`). Count distinct curves/durations and map each to a register. Flag one-curve-everywhere and bounce on productive actions. Always check Reduce Motion handling.

### E4. Signature moments (Dan Saffer, *Microinteractions*, 2013)
- A signature moment is a microinteraction "elevated to be part of the brand," often because it works surprisingly well; examples cited: Facebook Like, Windows Start, Google "I'm Feeling Lucky" (Smart Design excerpt). Microinteraction structure: trigger, rules, feedback, loops and modes.
- [SHOULD] A product should have 1-3 signature moments, placed on its core verb or its key milestones, built from standard triggers so they stay discoverable and accessible.
- [MUST] A signature moment must not block or slow a repeated task (respect HIG feedback and Reduce Motion; keep it skippable/brief on repeats).
- **Skill test:** "Name the moment a user would describe to a friend." If the reviewer can't, flag it. If one exists, check its trigger is standard, its feedback is informative, and it degrades under Reduce Motion / VoiceOver.

---

## Part F. Installed taste skills: distinct rules and how well-founded they are

Read: `~/.claude/plugins/marketplaces/claude-plugins-official/plugins/frontend-design/skills/frontend-design/SKILL.md`, `~/.claude/skills/design-taste-frontend/SKILL.md` (87 KB; read sections 0, 4.1-4.4, 9), `~/.claude/skills/high-end-visual-design/SKILL.md`, `~/.claude/skills/minimalist-ui/SKILL.md`, `~/.claude/skills/redesign-existing-projects/SKILL.md`, `~/.claude/skills/industrial-brutalist-ui/SKILL.md` (grepped).

**Well-founded (adopt the idea):**
- *frontend-design:* ground every choice in the subject's industry, materials and vernacular; plan tokens first, then "work through a similar prompt" to see if you'd arrive at the same place and revise anything generic; "Spend your boldness in one place"; "Visual structure is information" (numbering only for real sequences); non-triggered motion sparingly, one orchestrated moment, motion that answers user action is welcome; its 5 calibration clusters of AI output (cream + serif + terracotta; near-black + acid accent; broadsheet hairlines; SaaS card kit with `rgba(0,0,0,.1)`; template chrome: tracked caps eyebrows, middle-dot meta strings, "WORD — fragment" labels, mono for small labels, "→" on links). Also its copy rules (action names persist: "Publish" → "Published"; errors don't apologize). These agree with the external evidence (subject grounding = creative range; one moment = signature moment).
- *design-taste-frontend:* "Design Read" one-liner before work; Anti-Default Discipline; quiet constraints (accessibility, public sector, kids) override aesthetics; cards only when elevation means hierarchy; one accent locked page-wide; ban on div-built fake product screenshots; scroll cues, decorative status dots, section-number eyebrows, version labels in heroes as tells; palette-rotation idea (don't reuse the same "premium" palette).
- *redesign-existing-projects:* audit-before-fix, work with the existing stack, don't break function; missing states (loading, empty, error) as first-class; generic CTA labels; uniform radius as a tell; pinned card CTAs and aligned rows.
- *pixelslop (external, same family):* combination rule and false-positive guidance.

**Weakly founded or harmful for this skill:**
- *Name-based font/icon bans and swaps* (Inter, Roboto, Helvetica, Lucide → Geist, Satoshi, Phosphor). This just moves the mode. Geist is already a default (Nothing OS adopted it system-wide; our own skills recommend it in three places). On Apple platforms SF Pro and SF Symbols are the HIG-correct choice; identity comes from how type and symbols are *used* (weight, scale, rendering mode, custom symbols, a display face rationed to display roles), not from avoiding the system.
- *Pure black ban* (`#000000`). Conflicts with Apple dark mode, where the base system background is true black on OLED (unverified, from memory; check against the HIG digest). Not a distinctiveness issue.
- *high-end-visual-design's prescriptions:* floating glass pill nav, pill eyebrow tags with `tracking-[0.2em]` uppercase, double-bezel cards everywhere, button-in-button arrow icons, every element fading up on scroll over 800ms+, `py-24`+ on every section, "Apple-esque / Linear-tier" as the target. Several are now catalogued tells (frontend-design calls tracked caps eyebrows and fade-up-on-every-section generic; Canatselis flags identical motion). Treat this skill's output as a *tells source*, not guidance. It also aims at praised-product looks, which the user ruled out.
- *minimalist-ui's fixed palette* (`#F7F6F3`, `#EAEAEA`, pastel chips, ink-line sketches, faux macOS window chrome). This is a Notion clone recipe. Same for "staggered reveals on all lists".
- *redesign-existing-projects:* "Dashboard always has a left sidebar → try top nav or floating command menu" conflicts with HIG on iPadOS/macOS where sidebars are the convention; "add grain/noise", "double the spacing", "squircle avatars", "colored shadows", "spotlight borders", glassmorphism upgrades are trend moves, not derived from the product. "Messy realistic numbers (47.2%)" is a mock-content trick, irrelevant to reviewing a real app.
- *design-taste-frontend's absolute em-dash ban* is a copy-style preference presented as a UI rule. Its rotating font/palette "pools" are another way of picking from a list rather than from the subject.

**Summary judgment:** keep the *process* rules (derive from subject, check plan against the default you'd produce anyway, one bold move, structure means information, two registers of motion, combination-based detection). Drop the *substitution* rules (ban X, use Y). Substitution lists age into the next set of defaults.

---

## Proposed distinctiveness pass

Runs **after** the HIG pass. It cannot override any HIG finding, and its recommendations must be achievable with HIG-conformant components.

**Step 0. Gate.** If the HIG pass has unresolved [MUST] issues on a flow, skip pleasure-tier findings for that flow (Walter's hierarchy; Tuch 2012). Report them later.

**Step 1. Find the authored point of view.** Look for: design principles, brand guidelines, a voice/tone doc, a DESIGN.md, a token file with named brand tokens, an Asset Catalog with a custom AccentColor, custom fonts, custom SF Symbols, custom app icon variants, sound files, Rive/Lottie files. Ask the user if nothing is found.
- If nothing exists: finding [SHOULD] "No authored point of view". Infer 3 candidate principles from the subject, audience, and content, phrased so a competitor wouldn't sign them.
- If a DESIGN.md exists, check whether it is a reverse-engineered clone of a famous brand (names like linear/stripe/vercel, or token values matching them). If so, [MUST] flag as borrowed identity.

**Step 2. Classify every expressive channel.** For each of: accent color usage, neutrals, typeface and type treatment, shape/radius language, icon style, illustration/imagery, motion (curves, durations, choreography), sound/haptics, copy voice, layout idiom, signature interaction. Assign one source:
- `platform-default` (unchanged SwiftUI/UIKit/AppKit or Material defaults),
- `library-default` (unchanged shadcn/Tailwind/Radix/Chakra/MUI),
- `trend-default` (matches the catalog below, including praised-product clones),
- `authored` (traceable to the subject, brand, or a stated principle).
Code signals: `.accentColor`/`.tint` absent or `.blue`; no custom `Font` registration; default `Image(systemName:)` at default weight/scale everywhere; `components.json` + untouched `globals.css` CSS variables; `--radius: 0.5rem`; Tailwind `zinc/slate` neutrals with `indigo-500`; `lucide-react` at `size-4` everywhere; one `transition-all duration-300` everywhere.
- [MUST] At least two channels must be `authored`, and at least one of them must be visible on the primary screen. Platform-default is acceptable and often correct for controls; it just doesn't count toward identity.

**Step 3. Logo-off and swap tests.** Take 3 key screenshots (primary screen, an empty state, a success/completion state). Remove the name and icon. Ask: what identifies it? Then imagine a competitor's name on it. Then the domain-swap question (A3). Record the answers verbatim in the report.

**Step 4. Asset grid (Romaniuk proxy).** List candidate assets. For each: unique in category? (yes / shared with whom) and repeated across how many surfaces (app, icon, onboarding, empty, notifications, widgets, website, App Store screenshots)? Place in quadrant using repetition as the fame proxy. Recommend investing in 1-2 unique-but-underused assets rather than inventing new ones.

**Step 5. Placement check (productive vs expressive zones).** Map where expression appears.
- [MUST] No expression that reduces legibility, contrast, target size, label presence, or standard control behavior in task flows (M3 Expressive caveats; HIG).
- [SHOULD] Expression concentrated on: the primary action (size/contrast/containment, which M3 research ties to faster finding), key state changes, onboarding, empty states, success moments, the app icon, widgets, and share surfaces.
- [SHOULD] Brand typefaces limited to display roles; body and controls in the system face or a highly legible text face (Nothing OS lesson; HIG Dynamic Type support required either way).
- [SHOULD] Two motion registers, both honoring Reduce Motion.

**Step 6. Signature moment.** Identify 1-3. Check each is on the core verb or a milestone, uses standard triggers, gives informative feedback, is brief on repeat, and is accessible. If none: [CONSIDER] propose one derived from the core verb (Things pattern), never from the trend list.

**Step 7. Voice.** Sample 20+ user-facing strings across states. Check one voice, tone flexing by user state, no AI copy clichés, action names stable through a flow.

**Step 8. Tells scan.** Run the catalog below for the target platform. Count per section. Use combination logic: one tell is noise; three or more in one section, or any praised-product clone signature, is a finding.

**Step 9. Anti-recommendation guard (applies to every suggestion the skill makes).**
- Every recommendation must cite its source in the product: the subject/material, the user, the content, an existing asset, or a stated principle. "It looks premium/modern" is not a source.
- Before emitting a recommendation, check it against the tells catalog (all sections, including praised-product clones and the second-layer defaults). If it matches, discard it.
- Prefer recommendations phrased as mechanisms ("use your existing green only for completion states, everywhere, including the icon and notifications") over looks ("add a gradient mesh").
- Never recommend a named font, palette, or library as the fix for genericness. Recommend the decision process and constraints; let the team choose the asset.

**Step 10. Report.** Per channel: source classification, evidence (screenshot region or file:line), finding with tag, and the mechanism-based fix. Close with the logo-off answers and a one-line verdict: *authored*, *partly authored*, or *default-assembled*.

---

## Convergence tells catalog

Single items are often legitimate. Flag clusters, and always check whether the product's subject justifies the choice. Platform conventions (tab bars, nav stacks, sidebars on iPad/Mac, standard controls) are never tells by themselves.

### Apple-clone tells (when Apple's look is used as a brand instead of a platform)
- System blue as the only accent, no custom `AccentColor` in the asset catalog, on an app that has a brand color elsewhere (website, icon).
- Every screen is a large title over an inset grouped list, including screens whose content isn't a list (dashboards, media, creation tools).
- SF Symbols used at default weight and scale everywhere, never matched to the type weight, no custom symbols for product-specific concepts.
- App icon is a gradient squircle with a centered white SF Symbol.
- Liquid Glass / blur materials applied to content cards and backgrounds, not just to the controls layer (contradicts WWDC25 hierarchy: glass is the functional layer floating above content).
- On the web: iOS-style toggles, segmented controls and frosted sheets transplanted into a browser; SF Pro via `-apple-system` as the brand face; "keynote" landing pages (black hero, gradient-text product name, giant product render rotating on scroll, bento grid of features).
- Onboarding as a "What's New" sheet of three SF-Symbol rows for an app whose first run needs something else.
- No sound, haptic, or motion character beyond system defaults on an app whose core moment would benefit from one.

### Material-clone tells
- M3 baseline primary purple (`#6750A4`, unverified, from memory) or untouched dynamic color tonal palette as the brand.
- Roboto/Google Sans-like type on non-Android platforms.
- FAB bottom-right on iOS or web where HIG would put the action in a toolbar or nav bar.
- Ripple effects on web/iOS; outlined/filled Material text fields on iOS.
- Elevated cards with uniform dp-style shadows for every grouping.
- M3 Expressive shape motifs (scalloped/cookie shapes, shape-morphing loaders, oversized springy pills) used as decoration on non-Android products.
- Navigation rail / pill-shaped active indicator copied into iPad or Mac apps.

### shadcn / Tailwind-default tells
- `components.json` present and `globals.css` CSS variables untouched (`--background`, `--muted-foreground`, `--radius: 0.5rem`), zinc/slate neutrals.
- `Card > CardHeader > CardTitle + CardDescription` structure for every section; `text-sm text-muted-foreground` for all secondary text.
- `lucide-react` icons at `size-4` everywhere; Inter or Geist.
- One radius everywhere; `shadow-sm` + `border` on every container; `ring-offset` focus rings unmodified.
- `bg-indigo-500/600` primary (Tailwind UI legacy per Wathan's August 2025 apology); `from-purple-* to-blue-*` gradients.
- Sonner toasts bottom-right, sun/moon theme toggle in the header, the stock sidebar+data-table dashboard block, `Badge variant="secondary"` pills for status.
- `transition-all duration-300` on everything.

### AI-template tells (generated-page signatures)
- Centered hero, gradient or two-tone headline with one accented word, two CTAs (filled + ghost), logo strip, three equal icon-topped feature cards, testimonial carousel, three-tier pricing, accordion FAQ, four-column footer.
- Hero metric row (big number, small label, gradient accent).
- Tracked-out ALL-CAPS eyebrow above every heading, often in a pill; section-number eyebrows (`01 / Capabilities`); `01 / 02 / 03` on non-sequences; "Step 1 / Step 2".
- Middle-dot meta strings (`A · B · C`), "WORD — fragment" labels, `→` appended to every link.
- Monospace for non-code labels; decorative status dots; version labels/`BETA` pills in heroes; fake version footers; locale/time/weather strips; scroll cues.
- Div-built fake product screenshots/terminals/dashboards.
- Same fade-and-slide-up on every section; uniform hover-zoom on every image; bounce easing.
- Glassmorphism on 3+ surfaces; dark background with glowing saturated shadows; cyan-on-dark; neon accents.
- Uniform spacing (≤2 unique values); identical card dimensions; nested cards; one-sided thick accent borders; everything centered.
- Second-layer defaults (what appears when the first defaults are banned): warm cream `#F4F1EA`-ish + high-contrast serif + terracotta/clay accent `#D97757`-ish; near-black `#0B0B0B/#111` + one acid-green or vermilion; broadsheet hairlines + zero radius; beige + brass/oxblood "premium consumer" palette; Fraunces/Instrument Serif display; Geist everywhere.
- Copy: "Elevate", "Seamless", "Unleash", "Next-gen", headlines that fit any company, "Oops!" errors, "Quietly trusted by", "Field notes".

### Praised-product clone tells
- **Linear clone:** near-black UI, soft pools of indigo/violet light behind product shots, animated glowing border beams, glass panels, tilted 3D product screenshot, thin gray hairlines, keyboard-shortcut chips in marketing. (Ginn's squint test.)
- **Stripe clone:** animated multi-stop gradient mesh hero, skewed/diagonal section edges, light-weight large display type, duotone icons.
- **Vercel clone:** pure black/white monochrome, Geist + Geist Mono, visible grid lines with crosshair marks at intersections, dotted globe or triangle motifs, mono labels.
- **Arc clone:** saturated gradient window/sidebar chrome, pastel per-space theming, vertical tab sidebar on products that aren't browsers.
- **Raycast/command-palette clone:** command palette as the hero, keycap glyphs everywhere, `⌘K` promoted on products with no real command surface.
- **Notion clone:** warm off-white, gray text, emoji page icons, hand-drawn line people, pastel tag chips, faux macOS window chrome around screenshots (prescribed by our `minimalist-ui` skill).
- **Apple keynote clone:** bento grid of rounded feature tiles, gradient-text product names, scroll-scrubbed product renders.
- **Teenage Engineering / industrial clone:** orange accent, mono caps labels, grid lines and spec-sheet tables that encode nothing.
- **M3 Expressive clone:** shape-morph loaders and scalloped shapes as decoration.
- **Duolingo clone:** a mascot in the empty state that never appears again and doesn't react to state.
- Detection: a DESIGN.md or token file named after or matching a famous brand; marketing copy like "Linear-style"; token values matching known brand palettes. Commercial "style reference" sites for Stripe/Linear (refero, kombai, shadcn.io/design, awesome-design-md) show these looks are being distributed to agents as presets.

---

## Sources not reachable
- Goree et al. CHI 2021 PDF and project page (vision.soic.indiana.edu redirects to vision.luddy.iu.edu; not followed). Figures above come from the abstract via search results.
- Marketing Week, Romaniuk "Leaning on meaning could undermine your distinctive assets": HTTP 403.
- marketingscience.info "Brands need distinctive assets": redirect not followed.
- Anthony Hobday, "A critique of the Linear website": HTTP 404.
- nothing.community "Nothing OS evolution": page body failed to load; quote taken from search summary.
- Romaniuk and Sharp books, Norman *Emotional Design*, Walter *Designing for Emotion*, Saffer *Microinteractions*: not read; content via secondary summaries or memory as marked.
- Carbon official motion/type docs: not fetched; token values via secondary sources.
- Duolingo's own design-principles writing on its character system: not found.
- Teenage Engineering primary interviews on color coding: not found.
- Apple's ADA archive for Things 3's award year: not fetched.
- Artificial Hivemind (NeurIPS 2025), Yun et al. EMNLP 2025, Nature model-collapse paper: known only via search summaries.

## Open questions for skill design
1. **Input for intent.** Should the skill require a brief (principles, persona, brand assets) before the distinctiveness pass, or always infer and flag? Inference risks the skill imposing its own median taste.
2. **Scoring.** Use a pixelslop-style count band per catalog section, or a qualitative verdict (*authored / partly / default-assembled*)? Counts are reproducible but invite gaming.
3. **Native detection.** The tells heuristics are web/DOM-based. For SwiftUI/AppKit, what's the equivalent: asset catalog inspection, grep of `.tint`/`Font.custom`/`Image(systemName:)`, snapshot tests? Needs a native detector design.
4. **Where HIG and expression conflict.** Example: brand display face vs Dynamic Type; brand color vs contrast in both appearances; Liquid Glass vs a brand surface color. Proposed rule: HIG wins in task flows, brand may win on display-only surfaces if accessibility holds. Confirm with the user.
5. **Trend list maintenance.** The catalog will age (today's authored choice is next year's tell). Dated catalog file with a review cadence? Version stamp in findings?
6. **Praised-product references in user briefs.** If a user says "make it feel like Linear", should the skill translate to the mechanism (hierarchy discipline, parametric themes) and refuse the look, or follow the brief as frontend-design does ("the brief's own words always win")?
7. **Fame proxy.** Repetition across surfaces is the only fame proxy a reviewer has. Is it worth asking teams for real recognition data (e.g., a quick logo-off survey) on big products?
8. **Which installed taste skills to reference.** Recommend that loupe cite frontend-design's process and pixelslop's combination rule, and explicitly not invoke high-end-visual-design or minimalist-ui, since they generate catalogued looks.
9. **Apple principle names.** The coordinator lists clarity, deference, hierarchy, consistency; WWDC25 framed Liquid Glass around hierarchy, harmony, consistency. The skill should use whichever the HIG digest established as current and cite it consistently.
