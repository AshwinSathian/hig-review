Covers: NN/g, Baymard, Laws of UX, form-design authors (Wroblewski, Silver, Jarrett, GOV.UK) and deceptive-design research: thresholds, form and validation data, web behavior, AI and chat UI, and the Trust gate.
Loaded by: structure, content, interaction and motion, accessibility
Snapshot: 2026-10-23
Tags: [MUST]/[SHOULD]/[CONSIDER] = the source's own strength; [Taste] = our rule. In reports, a check labelled 'adds to Apple' shows the Apple file's tag; 'Apple silent' shows 'Research'; [Taste] shows 'Taste'. [Taste] always shows 'Taste' in reports, whatever its label.

`(unverified)` marks items recalled from memory or seen only as a search snippet; the skill weights them lower and never makes them Blockers alone. Numbers are quoted from the fetched pages. Slop tells for these patterns live in references/slop-catalog.md. Apple claims below were checked against references/apple/*.md.

Conflict policy applied: on a native Apple target, Apple wins on platform conventions, so borderless or glass buttons and icon-only toolbar items are fine inside Apple system bars (toolbar, navigation bar). When an app copies that style into content areas, or on web, the research decides: visible labels and clear signifiers. Placeholder-only labels are not accepted on any target except search fields; Apple's rule (placeholder hint plus a separate persistent label) and the research agree.
Evidence tiers: topic 1 is measured (71 participants); topic 12 is an opinion piece with examples, so weigh it below measured studies.

## Signifiers: flat and ghost UI (NN/g, 2017)
**Intent**: Desktop eyetracking, 71 general web users, 9 live pages, each modified into a strong-signifier and a weak-signifier version (between-subjects; paired t-test, p < 0.05). On weak-signifier versions users spent "22% more time" and made "25% more fixations". 6 of 9 page pairs showed different gaze patterns. On one page, 86% (25 of 29) of strong-version users went from heading to target link, against 50% (12 of 24) on the weak version (p < 0.005). Weak signifiers are "links styled like static text or ghost buttons". Flat works only with low information density, a conventional layout, and high-contrast interactive elements.
**Checks**
- [MUST] Every tappable or clickable element has at least one signifier beyond position: fill, border, contrasting color, underline, or chevron. Text-styled links inside body copy differ in color from the surrounding text. — CONFLICT: Apple allows borderless, text-only and glass buttons in toolbars and navigation bars vs NN/g's signifier penalty; resolution: borderless and glass buttons are fine inside Apple system bars on native targets (tint and fixed bar position roughly meet NN/g's "traditional layout" condition); when an app copies that style into content areas, or on web, require a visible signifier.
- [MUST] No ghost buttons (outline-only, transparent) for a screen's primary action. — CONFLICT: Apple's borderless and glass button styles vs NN/g's ghost-button finding; resolution: allowed in Apple system bars on native targets; for a primary action in content or on web, use a filled or clearly bordered button.
- [SHOULD] On content-dense screens (dashboards, settings, feeds), interactive text can be told apart from static text without hovering or tapping. — adds to Apple
- [CONSIDER] For features users don't know exist yet, use strong signifiers ("discoverability" items). — adds to Apple
**Apple note**: Since iOS 7, and more so with the Liquid Glass material, Apple allows borderless, text-only and glass buttons in bars. Flag the case where tint-colored plain text is used as a button in the middle of content; leave system-bar usage alone.

## Response time and loading indicators (NN/g 1993, updated 2014; skeleton screens 2023, reviewed 2026; Laws of UX Doherty threshold)
**Intent**:
  - 0.1 s "is about the limit for having the user feel that the system is reacting instantaneously." 1.0 s "is about the limit for the user's flow of thought to stay uninterrupted." 10 s "is about the limit for keeping the user's attention focused on the dialogue."
  - Over about 10 s, use a percent-done indicator. When the total is unknown, show absolute progress (name each item as it's processed). A spinner is the last resort. For 2–10 s, a full percent-done bar can be excessive.
  - Skeleton screens: under 1 s, skeletons and spinners are "unnecessary and may feel distracting". For 2–10 s, spinners work, and skeletons work under 10 s. "Anything above 10 seconds requires an explicit estimation of duration." Use skeletons for full-page loads, spinners for a single module, progress bars for process tasks (upload, convert). Avoid "frame-display" skeletons that show only header, footer and background.
  - Doherty & Thadani (IBM Systems Journal, 1982): "Productivity soars when a computer and its users interact at a pace (<400ms)". This replaced the earlier 2,000 ms standard. Laws of UX also says "A deliberate delay can make a process seem more valuable and more trustworthy".
**Checks**
- [MUST] Direct manipulation (press states, toggles, drag) responds visually in 100 ms or less. Optimistic UI is preferred over waiting on the network. — adds to Apple
- [MUST] Any wait over 10 s shows determinate progress or a time estimate. An indefinite spinner over 10 s is a finding. — adds to Apple
- [SHOULD] No skeleton or spinner for loads under about 1 s. Delay showing the indicator (about 300–500 ms) so it doesn't flash. The delay value is our inference, not NN/g's. — adds to Apple
- [SHOULD] Skeleton layout matches the real layout: same block count and positions, no layout shift when content arrives. — adds to Apple
- [SHOULD] Use spinners per module and skeletons per page, not both stacked on one screen. — adds to Apple
- [CONSIDER] Deliberate "labor illusion" delays only where they honestly reflect work being done (for example, a security scan). Never use them to pad perceived value; see the Trust gate. — adds to Apple
**Apple note**: Apple's progress guidance prefers determinate indicators, switching to determinate once the duration is known, and honest status, but gives no numeric thresholds in the digests. These numbers give the review measurable cutoffs.

## Hidden navigation and hamburger menus (NN/g 2016; mobile navigation patterns 2015)
**Intent**: 179 participants, 6 live sites, desktop and phone (with WhatUsersDo). Desktop navigation use: hidden 27%, visible 48%, combo 50%. Mobile: hidden 57%, combo 86%. Hidden navigation lowered content discoverability by more than 20% on both devices. Difficulty (1 = easy, 7 = hard): hidden 2.6, combo 2.3, visible 2.1, so hidden was "21% harder than visible". Desktop tasks took at least 39% longer with hidden navigation. Mobile tasks took 15% longer with hidden than with combo. Recommendation: on mobile, if there are four or fewer top-level links, show them all. The 2015 article: with 4–5 main options, keep them visible; "more than 5 options" gets hard to fit at good touch-target size. "Menu" as a word slightly beat the hamburger icon (third-party data). Apple's iOS 7 edge-swipe Back makes edge-swipe drawers problematic.
**Checks**
- [MUST] Desktop or wide web layouts: primary navigation is visible, not behind a hamburger. — adds to Apple
- [MUST] iPhone and mobile web with 5 or fewer top-level destinations: a persistent tab bar, not a drawer. — adds to Apple
- [SHOULD] If a drawer is unavoidable, use a combo pattern (top 3–4 visible, the rest under "More"), and repeat key destinations as in-page links. — Apple silent
- [SHOULD] No left-edge-swipe drawer on iOS (it collides with the system Back gesture). — adds to Apple
**Apple note**: Verified in the Apple digests: switching top-level sections on iPhone uses a tab bar with labels and 5 or fewer filled icons, not a sidebar, hamburger or segmented control. NN/g adds the measured cost. Web is where Apple says nothing, and that is where this matters most.

## Reading and scanning patterns (NN/g, 2017; F-pattern first reported 2006)
**Intent**: Six patterns. Layer-cake: eyes hit headings and subheadings and skip the body, which shows as horizontal bands on a heatmap. Spotted: readers skip text and hunt for links, digits, or distinctive word shapes. Marking: eyes stay fixed while the page scrolls (more common on mobile). Bypassing: readers skip the first words of list items that all start the same way. Commitment: reading nearly everything, which happens only when the reader is highly motivated. "Good web formatting reduces the impact of F-scanning." Advice: put key points in the first two paragraphs, front-load headings with the informative words, use informative link text, bold key phrases.
**Checks**
- [MUST] Headings and list items front-load the distinctive word. Flag lists where 3 or more items start with the same word (bypassing), for example "Manage users / Manage roles / Manage billing". — Apple silent
- [SHOULD] Long text screens have scannable subheads every few paragraphs (support layer-cake). — Apple silent
- [SHOULD] Numbers, prices and dates are visually distinct (support spotted scanning). — Apple silent
- [SHOULD] No "Learn more" or "Click here" link text without a target noun. — adds to Apple
**Apple note**: HIG covers typography and hierarchy but not how users scan prose.

## Error messages (NN/g, 2023)
**Intent** (guidelines synthesized from testing, no numbers): Place the error near its source. Use bold, high-contrast red styling, but "never rely on color or animation alone". Match severity to presentation: reserve modals for serious errors. Don't show errors too early: leaving an empty field shouldn't count as an error. Use plain language and hide error codes unless they help diagnosis. Avoid "An error occurred". Offer a remedy. Avoid blaming words like "invalid" or "incorrect", and avoid humor that wears thin on repeated errors. Preserve user input. Suggest likely fixes.
**Checks**
- [MUST] The error appears adjacent to the field or object at fault, and is also summarized at the top for long forms (the summary is our addition; GOV.UK uses this pattern). — adds to Apple
- [MUST] User input is preserved after any error, including server errors. — adds to Apple
- [MUST] The error communicates by text plus icon or color, not color alone. — adds to Apple
- [SHOULD] No generic "Something went wrong" without a cause and a next step. — adds to Apple
- [SHOULD] No "invalid" or "illegal" in copy. State the format expected ("Enter a date like 23/10/2026"). — adds to Apple
- [SHOULD] No modal alert for a field-level error. — adds to Apple
- [CONSIDER] Prevention: warn before the mistake, for example "attachment mentioned but none attached". — adds to Apple
**Apple note**: HIG covers alerts and says to keep them rare. NN/g adds placement, tone and timing for inline errors, where Apple says little. Apple's digests do name specific inline errors ("Zip code doesn't match city") and lenient parsing.

## Icons and labels (NN/g icon usability 2014; sparkles icon 2024)
**Intent**: "a text label must be present alongside an icon." "Icon labels should be visible at all times." "Don't rely on hover to reveal text labels." Only home, print and magnifying glass are close to universal. Heart and star are misread. 5-second rule: if it takes more than 5 s to think of an icon for a concept, the icon will likely fail. In one study, no participant clicked a clock icon used for history. Sparkles (Kaplan, 2024): no participant linked ✨ to "artificial intelligence". 73% of users in a quantitative icon study tied a star to saving or favoriting. Of 107 associations for the sparkles icon: favorite/save 16.82%, visual effects 16.82%, important/special 11.22%, rewards 6.54%, tips/help 4.67%. Recommendation: always pair it with a label.
**Checks**
- [MUST] Icon-only controls outside system-standard positions get a visible label. Or the icon is one of search, home, share (platform glyph), close, back, and has an accessibility label. — CONFLICT: Apple's toolbars and navigation bars use icon-only SF Symbols as standard (including Back and Close symbols) vs NN/g's "labels visible at all times"; resolution: icon-only is fine for Apple-standard actions in Apple system bars on native targets (share, compose, trash); in content areas, for custom or app-specific actions, and on web, require a visible label (tab bars already carry labels in HIG, so they agree).
- [MUST] No hover-only labels on touch platforms. On web, a tooltip is a fallback, not the label. — adds to Apple
- [MUST] Any ✨ "AI" control is labeled with what it does ("Summarize", "Draft reply"), not just the sparkle. — adds to Apple
- [SHOULD] Heart and star icons are used consistently and labeled when the meaning is not save/favorite. — adds to Apple
**Apple note**: Verified in the Apple digests: the HIG does not ban the sparkle glyph but requires a named benefit and clear disclosure, so a sparkle-only AI button is filed as a missing-label finding, not an icon ban. macOS toolbars allowing icon-and-text is unverified.

## Dark mode versus light mode (NN/g)
**Intent**: For normal vision, light mode (positive polarity) generally performs better. Piepenbrock et al. 2013 (Ergonomics): light mode "won across all dimensions" for ages 18–33 and 60–85. The light advantage grows as font size shrinks (2013, Human Factors). Dobres et al. 2017: no polarity effect in simulated daytime glances, but light was faster at night for small text. Aleman et al. 2018: light mode linked to choroid thinning, with only 7 participants. Legge et al. 1985: 7 participants with cloudy ocular media read faster in dark mode. Recommendation: don't default to dark for the general population. Offer dark mode and follow the OS setting.
**Checks**
- [MUST] Appearance follows the system setting by default, with an in-app override only if needed. — adds to Apple
- [SHOULD] A dark-only default needs a domain reason (media viewing, low-light use, pro creative tools). — adds to Apple
- [SHOULD] In dark mode, small text (under 15 pt) gets extra contrast review, since the polarity penalty is largest at small sizes. — adds to Apple
**Apple note**: Agrees with Apple (respect system settings and personalization). Adds evidence against dark-first product defaults.

## Infinite scroll and carousels (NN/g 2022; carousels 2013, reviewed 2026)
**Intent**: Infinite scroll suits flat, homogeneous, goal-less content. It hurts refinding, comparison and footer access, and gives an "Illusion of completeness". Save the user's list position when they come back from a detail view. The article gives no percentages. Carousels: use 5 or fewer frames. Auto-rotate timing guide is about 3 words per second. Avoid auto-forward on mobile and for ad-like content. Animated ads get looked at 27% of the time in NN/g eyetracking. Dots are a weak cue on mobile. Important carousel content should also appear elsewhere.
**Checks**
- [MUST] Returning from a detail view restores the list's scroll position (Apple: patterns.md, Launching, "Restore previous state in detail", [SHOULD]; NN/g makes it a must for lists). — adds to Apple
- [MUST] No infinite scroll on lists users search, compare, or need to finish (orders, settings, search results with a goal). Use "Load more" or pagination. — Apple silent
- [MUST] Pages with infinite scroll keep the footer content reachable some other way. — Apple silent
- [SHOULD] Carousels: 5 or fewer frames, visible count and position, controls inside the carousel, no auto-advance on mobile, a pause control if any auto-advance (WCAG 2.2.2 also requires this). — Apple silent
- [CONSIDER] Replace a hero carousel with a single static hero. — Apple silent
**Apple note**: Apple is silent on infinite scroll vs pagination and on auto-rotating carousels. Apple's own App Store uses horizontal shelves, which are user-driven, not auto-rotating.

## Tooltips and empty states (NN/g tooltips 2019; empty states 2021)
**Intent**: Tooltips: "Don't use tooltips for information that is vital to task completion." Support keyboard as well as mouse hover. Use arrows when elements are crowded. Use tooltips consistently. Label icons rather than relying on a tooltip. Empty states: avoid totally empty states, which leave users unsure whether it's loading, failed, or found nothing. Never show "No records" before loading completes. Use the space to teach ("pull revelations"). Give a direct path to the task that fills it, for example DataDog's "Star your favorites to list them here".
**Checks**
- [MUST] No required info (password rules, field formats, pricing terms) lives only in a tooltip. — adds to Apple
- [MUST] Empty, loading and error states are visually distinct. "No results" appears only after the query has finished. — adds to Apple
- [SHOULD] Every empty state says what will appear here and gives one action to fill it. — adds to Apple
- [SHOULD] Filtered-to-empty states name the filter and offer to clear it. — adds to Apple
**Apple note**: Verified in the Apple digests: empty states should educate or celebrate and say how content will appear, and search should suggest alternatives instead of an empty "no results". Apple calls them help tags; the digests do not state a "never vital info" rule as strongly.

## Accordions, progressive disclosure and cards (NN/g 2023, 2006, 2016)
**Intent**: Accordions fit when users need only a few sections, or when sections are independent (FAQ). Avoid them when users need most of the content, when there is little content, for deep hierarchies, or for narrative reading. Use a caret or plus icon, make the whole heading clickable, allow several sections open, and consider Expand All. "Don't hide crucial information inside collapsed panels." Progressive disclosure: two disclosure levels is the practical limit. More levels get lost. The initial display should cover what most users need. Cards suit heterogeneous items and browsing. They are a poor fit for homogeneous items, search results, comparison, photo galleries, and tight screens, where a list is better.
**Checks**
- [MUST] No crucial info (price, fees, cancellation terms) inside a collapsed accordion by default. — adds to Apple
- [SHOULD] Disclosure depth is 2 or less (screen, then "Advanced", then no further nesting). — adds to Apple
- [SHOULD] Homogeneous collections (orders, files, messages, products to compare) use lists or tables, not card grids. — adds to Apple
- [SHOULD] Accordion headers are buttons with expanded/collapsed state exposed to assistive tech. — adds to Apple
**Apple note**: Apple's disclosure groups and outline views exist. HIG favors lists (inset grouped), which agrees with NN/g's cards critique. The 2-level limit is not in HIG as a number.

## AI and chatbot UX (NN/g, 2023–2026)
Sources: AI as the first new UI paradigm in 60 years (2023); articulation barrier and hybrid UI (2023); AI chat is not always the answer (2024); sycophancy in GenAI chatbots (2024); site AI chatbots, users can't tell what they're for (2026); 10 guidelines for site AI chatbots (2026); use-case prompt suggestions (seen via search snippet only, unverified).
**Intent**:
  - Nielsen estimates about half the population in rich countries is "not articulate" enough to get good results from chat-only AI. He predicts hybrid UIs: intent-based input combined with GUI controls.
  - Hybrid recommendations: prompt suggestions while typing, visual style pickers with thumbnails, "recognition over recall" GUI next to the text field. Based on 100+ Midjourney prompts. The findings are preliminary.
  - Site chatbots (2026, 9 participants, 8 chatbots including Rufus, Magic Apron, Redfin): users often didn't notice the bot, didn't know what it could do, and found it slower than search and filters. Sales-led answers eroded trust.
  - The 10 guidelines (2026, qualitative): one chat entry point. The chat persists across pages. State capabilities and give page-aware suggested prompts. Make suggestions clickable buttons, not text. Include images. Use progressive disclosure in place rather than spawning new messages. "Don't Autoscroll Users to the End of a Response": keep the scroll position at the start of the new message during streaming. Allow resizing. Allow save and share. Consider voice input.
  - Sycophancy: models flip correct answers when asked "Are you sure?". People prefer sycophantic answers.
**Checks**
- [MUST] Streaming responses don't auto-scroll past the start of the new message. The user controls the scroll. — Apple silent
- [MUST] The chat/assistant entry point is labeled with its scope ("Ask about your orders"), not a bare ✨ or "How can I help?". — Apple silent
- [MUST] Suggested prompts and follow-ups are tappable, specific to page and context, and persist after the first turn. — Apple silent
- [SHOULD] Chat is not the only path to a task that a filter, search or form already handles. Flag "chat replaces UI". — Apple silent
- [SHOULD] AI output that users act on shows sources or a verify path. A confirmation step guards destructive agent actions. — adds to Apple
- [SHOULD] Chat transcripts can be copied, saved or shared. — Apple silent
- [CONSIDER] Hybrid controls (chips, sliders, style thumbnails) next to the prompt field. — Apple silent
**Apple note**: Verified in the Apple digests: the HIG has a Generative AI section (specific value, keep people in charge, disclose AI use, degrade gracefully, refining output and collecting feedback). It does not cover streaming scroll behavior, prompt suggestions, or chat entry points, so those are new ground.

## Handmade as a trust signal (NN/g, 2026; opinion piece)
**Intent**: "Polish no longer signals quality, since AI can generate sleek images quickly." AI-made visuals read as "overly polished, gauzy", "look good from afar" but fall apart up close, with random errors. Human slips are small and consistent. The evidence is case examples (Hermès 2026 homepage, Paris 2024 posters at nearly 2,000 hours), with no user-test numbers. The article warns that warmth which hides real shortcomings erodes trust.
**Checks**
- [SHOULD] Illustration and imagery hold up at 100% zoom: no malformed hands or text, no inconsistent line weights across a set. — Apple silent
- [SHOULD] Visual style has one clear authorial intent across screens, not a mix of stock 3D blobs, AI art and flat icons. — Apple silent
- [CONSIDER] Use a deliberate, ownable visual element (custom illustration, type detail) over generic gradient polish. — Apple silent
**Apple note**: Apple's own marketing is high-polish. This is the most direct research hook for the skill's anti-slop goal. It is an opinion piece with examples, so weigh it below the measured studies.

## Inline form validation (Baymard, 2024)
**Intent**: "31% of sites don't have any inline validation at all" (the intro says 32%; the article is inconsistent). Avoid premature validation: validate on blur, or once a fixed-length field reaches its length (ZIP, card, CVV). "the error message must live update on a keystroke level", so the error clears the moment input becomes valid. Show positive validation (checkmark). Inline validation doesn't replace validation on submit.
**Checks**
- [MUST] No error shown while the user is still typing a field for the first time. — adds to Apple
- [MUST] Once shown, the error clears as soon as the input becomes valid (keystroke-level recheck). — adds to Apple
- [MUST] Submit-time validation still runs and moves focus to the first error. — adds to Apple
- [SHOULD] Fixed-length fields validate on reaching length. — adds to Apple
- [CONSIDER] Positive checkmarks for fields that are hard to get right (password, email confirmation). — adds to Apple
**Apple note**: Corrected against the Apple digests: Apple does give validation timing (email validates on leaving the field; username and password validate before leaving it; digit-only fields flag non-digits). Baymard adds the keystroke-level clearing, the fixed-length rule and the submit backstop.

## Checkout fields, abandonment, passwords and labels (Baymard)
Sources: checkout average form fields (2024); cart abandonment rate (updated 2025); password requirements and reset (2022); mobile forms, avoid inline labels (2013); mobile e-commerce benchmark (page 2026).
**Intent**:
  - The average checkout has 11.3 form fields (2024), down from 11.8 in 2021 and 12.7 in 2019. "most sites need only 8 form fields in total for a checkout flow." Average checkout is 5.1 steps.
  - 42% of participants typed their full name into "First Name" at least once. 89% of sites use more than one name field. Address Line 2: 75% of sites don't hide it, and 30% of participants stopped at it. A coupon field is shown by default on 35% of sites that have one. 84% don't delay account creation until the confirmation step.
  - Average cart abandonment is 70.22% (50 studies). Top reasons: extra costs 40%, slow delivery 20%, didn't trust the site with card info 19%, forced account creation 18%, "Too long / complicated checkout process" 17%, errors/crash 17%, couldn't see total cost up front 12%. Estimated conversion gain from fixable checkout UX: 35.26%.
  - Passwords: 82% of sites "require unnecessarily complex passwords". Suggested floor is 6–8 characters (NIST: 8). Password-reset problems caused up to 19% checkout abandonment among existing account holders (18.75% average at Amazon and ASOS). Abandonment was rare "as long as the password requirements are clearly communicated up front."
  - Labels: avoid inline (placeholder) labels for forms with three or more fields; Baymard accepted them for 1–2 field forms such as search and sign-in, which we narrow to search fields (a sign-in form still gets persistent labels). The Baymard article calls floating labels "promising" but untested (2013), while Silver argues against them (next topic).
  - Mobile benchmark: of 138 US and EU sites, 62% were "mediocre" or worse and 0% "good".
**Checks**
- [MUST] Total cost (fees, tax, shipping) is visible before the payment step. — adds to Apple
- [MUST] Guest checkout is available. Account creation is optional and offered after purchase. — adds to Apple
- [MUST] Password rules are visible before typing, not revealed one at a time on error. No composition rules beyond a length minimum unless there's a regulatory reason. — adds to Apple
- [MUST] Every form field has a persistent visible label; a placeholder is only a hint and never the sole label. Baymard's evidence (avoid inline labels in forms of 3 or more fields) adds weight to Apple's rule, which pairs a placeholder hint with a separate persistent label. Search fields are the one exception, where Apple's scoped placeholder is the norm. — adds to Apple
- [SHOULD] One full-name field unless there's a real need for split names. Collapse Address Line 2 behind "Add apartment, suite…". Collapse the coupon field behind a link. — Apple silent
- [SHOULD] Count fields in any checkout or sign-up and flag anything over about 8 that the question protocol (next topic) can't justify. — Apple silent
- [SHOULD] Support autofill, password managers and passkeys (correct `autocomplete` / `textContentType`). — adds to Apple
**Apple note**: HIG covers text fields, Apple Pay and Sign in with Apple, and the digests ask for easy cancellation and disclosed trials, but not field budgets or abandonment data. Apple Pay buttons agree with "fewer fields".

## Form design authors: labels, fields and questions (Wroblewski, Silver, Jarrett, GOV.UK, NN/g)
Sources: Wroblewski on label alignment eye tracking, citing Matteo Penzo's UXmatters study (2006, year unverified); Silver, "Material Design Text Fields Are Badly Designed" (Smashing, 2021); Jarrett & Gaffney, Forms That Work (2008), three-layer model (found via search, not fetched, unverified); GOV.UK Service Manual form structure; NN/g placeholders (2014).
**Intent**:
  - Top-aligned labels need "a single eye fixation" to take in label and field, with the shortest completion times. Left-aligned labels are slowest because of "the number of eye fixations they require". Lukew's page gives no fixation counts. The commonly cited ~50 ms vs ~500 ms saccade figures are (unverified): don't quote them.
  - Silver on Material float labels: they don't fix placeholder problems ("poor contrast and the chance of the label being mistaken for an actual answer"), use tiny label text, and truncate long labels. Google's published test compared only two float-label variants and never tested against conventional fields. Smashing's own tests found floating labels "weren't particularly effective". Silver recommends label above the field, a full border, and hint text outside the field. His evidence is qualitative (20+ years; Boots, Just Eat, GOV.UK).
  - NN/g placeholders: 7 harms. They vanish (memory strain), entries can't be reviewed, error recovery is harder, they disrupt tabbing, and "Eyetracking studies show that users' eyes are drawn to empty fields", so filled fields get overlooked. They get mistaken for data, and the gray text is low contrast.
  - Jarrett's three layers: appearance (layout), conversation (questions and answers), relationship (the task and the trust between user and organization). Her review method: don't look at the form first, choose a persona, fill it in as that persona, then assess each layer. (unverified)
  - GOV.UK: "Start by splitting the form across multiple pages with each page containing just one thing". Question protocol: ask for an item only if you can say why you need it, what you'll do with it, who must provide it, how you'll check it, and how you'll keep it current and secure. Eligibility questions go first.
**Checks**
- [MUST] Labels sit outside and above inputs, visible at all times. Placeholder is used only for an optional example, never the label (search fields excepted). — CONFLICT: iOS Settings-style rows put the label left and the value right vs top-aligned persistent labels (Wroblewski/Penzo, Baymard, NN/g); resolution: native targets accept Apple's row-label style for settings toggles and pickers; in data-entry forms, and on web, require persistent top-aligned labels, and never placeholder-only labels (on every audience).
- [MUST] Inputs have a visible full boundary (border or filled field with clear edge). Underline-only fields are flagged. — Apple silent
- [SHOULD] Each field passes a question-protocol test the review can state ("why is phone number asked?"). Unjustified fields are findings. — Apple silent
- [SHOULD] Long or branching flows use one question or topic per screen, with eligibility first. — CONFLICT: Apple's grouped, scrolling form (iOS Settings style) vs GOV.UK one question per page; resolution: a native Apple target uses Apple's grouped form by default; on web, use one question per page for branching and eligibility flows aimed at an occasional-public audience, and grouped forms for daily-professional use, settings and frequent edits; read the profile's audience before flagging either way, and show the conflict in the report.
- [SHOULD] Hint text is persistent and placed between the label and the field. — adds to Apple
- [CONSIDER] Review forms through Jarrett's layers: does the relationship (trust, reason for asking) justify the conversation? (unverified) — Apple silent
**Apple note**: Verified in the Apple digests: placeholder hints should come with a separate persistent label, and the web translation bans placeholder-only labels on every audience, so Apple's own text-field rule is close to the research. The tension is the Apple-style settings row copied into long data-entry forms. Apple is silent on question protocol and field budgets; on one-thing-per-page it differs (see the CONFLICT above).

## Laws of UX: non-obvious applications
**Intent** (fetched pages):
  - Aesthetic-usability effect: Kurosu & Kashimura 1995, 26 ATM layouts, 252 participants. Appeal correlated more strongly with perceived ease of use than with actual ease of use. Takeaway: good visuals "can hide usability problems … in usability testing."
  - Peak-end rule: Kahneman et al. 1993, 14°C water for 60 s, versus 60 s plus 30 s more as the temperature rose to 15°C. Participants chose to repeat the longer trial.
  - Goal-gradient: Hull 1932/1934, rats run faster near the food. Kivetz, Urminsky & Zheng is cited without figures. The coffee-card result (a 12-stamp card with 2 pre-filled stamps finished faster than a 10-stamp card) is (unverified).
  - Tesler's law: complexity "cannot be reduced", only moved. Tesler: better for engineers to spend an extra week than "millions of users spend an extra minute". Tognazzini's counterpoint: simplify, and users take on more complex tasks.
  - Von Restorff: 1933 isolation effect. Caveats: restraint, so emphasized items don't end up "competing with one another" or get mistaken for ads. Don't rely on color alone, and consider users with motion sensitivity.
  - Doherty: see the response-time topic. Fitts, Hick, Postel: not fetched; standard statements, (unverified).
**Checks**
- [MUST] Aesthetic-usability: the review must not score polish as usability. Pretty screens get more scrutiny on task paths, because test participants under-report problems with attractive UIs. — adds to Apple
- [SHOULD] Peak-end: identify the end of each key flow (purchase confirmation, export done, onboarding finish, cancellation). It is clear, confirms the outcome, and gives a next step, not a dead modal. The error peak (the worst moment) gets design attention too. — adds to Apple
- [SHOULD] Tesler: when a setting or step is removed, check where the complexity went (to defaults? to support? to an AI guess the user must verify?). — adds to Apple
- [SHOULD] Von Restorff: one emphasized element per view. Count the accent-colored elements; more than about 1–2 primary emphases per screen is a finding (the threshold is our inference). — adds to Apple
- [SHOULD] Fitts (unverified): destructive actions are not placed where the primary action's thumb or pointer lands. Distance and size work both ways: make Delete small and far. — adds to Apple
- [SHOULD] Hick (unverified): applies to unfamiliar choice sets. Don't use it to justify hiding a familiar menu. — adds to Apple
- [CONSIDER] Postel (unverified): accept flexible input formats (phone with spaces, dates in several forms) and normalize them, rather than rejecting them. — adds to Apple
- [CONSIDER] Goal-gradient: progress indicators for multi-step flows. Never inflate progress dishonestly; see the Trust gate. — adds to Apple
**Apple note**: HIG implies several of these (hit targets to Fitts; simplicity to Tesler) but doesn't name them or their counter-uses.

## Trust gate: deceptive design (pass/fail)
Every gate item below is Blocker impact in the report, in a Trust section. Any hit fails the gate. Apply equally to web and native.
Sources: Mathur et al., "Dark Patterns at Scale" (CSCW 2019); deceptive.design types; FTC, Bringing Dark Patterns to Light (Sept 2022; only the landing page was fetched, contents unverified); Eighth Circuit, Custom Communications, Inc. v. FTC, No. 24-3137, July 8, 2025 (per law-firm summaries via search); EU DSA Art. 25 and the planned Digital Fairness Act (seen via search snippets, unverified).
**Intent**:
  - Mathur et al.: about 11K shopping sites and about 53K product pages crawled. 1,818 dark-pattern instances on 1,254 sites (about 11.1%). 22 third-party providers sell these as plug-ins. The taxonomy has 7 categories and 15 types:
    - Sneaking: Sneak into Basket, Hidden Costs, Hidden Subscription
    - Urgency: Countdown Timer, Limited-time Message
    - Misdirection: Confirmshaming, Visual Interference, Trick Questions, Pressured Selling
    - Social proof: Activity Messages, Testimonials of Uncertain Origin
    - Scarcity: Low-stock, High-demand
    - Obstruction: Hard to Cancel
    - Forced Action: Forced Enrollment
  - deceptive.design lists 18 types. Beyond Mathur's set it adds Preselection, Nagging, Disguised ads, Comparison prevention, Addictive design, and Currency confusion.
  - Legal status, as of 2026-10-23. EU: the Commission's 2024 Digital Fairness Fitness Check found 97% of the most popular websites and apps used by EU consumers deployed at least one dark pattern (per search snippet, not fetched from the primary source; unverified). The Digital Fairness Act was announced as a Q4 2026 initiative, and no draft is confirmed as of the search. DSA Art. 25 already bans deceptive interface design for online platforms, except for practices covered by the UCPD. US: the FTC's 2024 Negative Option ("click-to-cancel") Rule was vacated on procedural (APA / §22) grounds on July 8, 2025. ROSCA, FTC Act §5, and state auto-renewal laws still apply (California's updated law took effect July 1, 2025). These rules are moving, so keep the date stamp.
**Gate items** (all Blocker)
- [MUST] Cancel is at least as easy as sign-up: same channel, a similar number of steps, no forced call or chat. ROSCA- and state-law-relevant even after the vacatur. (Hard to Cancel) — adds to Apple
- [MUST] No preselected add-ons, insurance, donations or marketing opt-ins. (Preselection, Sneak into Basket) — adds to Apple
- [MUST] No price that grows at the final step. Matches Baymard's 40% abandonment reason. (Hidden Costs) — adds to Apple
- [MUST] Trials that convert to paid state the date and amount up front and send a reminder. (Hidden Subscription) — adds to Apple
- [MUST] No confirmshaming decline copy ("No thanks, I hate saving money"). — adds to Apple
- [MUST] Countdown timers and "Only 2 left" / "12 people viewing" messages are backed by real data. Without real data they are fake urgency or social proof. — adds to Apple
- [MUST] Accept and decline (cookie, tracking, upsell) have equal visual weight. (Visual Interference) Ties to the EU consent-banner enforcement line. — adds to Apple
- [MUST] No double negatives or trick questions in opt-in/out checkboxes. — adds to Apple
- [MUST] Ads and sponsored items are labeled. (Disguised Ads) — adds to Apple
**Outside the gate** (reported at the strength shown, not as Blockers)
- [SHOULD] Permission or upgrade prompts don't reappear after a decline within a short window. (Nagging) — adds to Apple
- [SHOULD] Virtual currency shows its real-money price. (Currency confusion) — adds to Apple
- [SHOULD] Plan comparison uses the same units and features across tiers. (Comparison prevention) — adds to Apple
- [CONSIDER] Autoplay-next, streaks and infinite feeds in apps for minors are reviewed as "addictive design". — adds to Apple

**Apple note**: App Store Review Guidelines and HIG cover subscription disclosure. Verified in the Apple digests: the paywall guidance asks for honest money UI (total billed amount most prominent, trial auto-charge disclosed, cancel easy). inputs-tech.md (purchases) asks that cancel be easy and a manage-subscription link not be buried. Web flows have no such backstop.

## Validity conditions for patterns that became generic
These patterns started as valid fixes for a narrow case. references/slop-catalog.md lists their generic misuse and points back here. Accept the pattern only when its condition holds.
- Skeleton shimmer: full-page loads of about 1 to 10 s, layout matching the real content; under 1 s no indicator; a single module gets a spinner.
- Hero and content carousels: 5 or fewer frames, user-driven, important content also available elsewhere, no auto-advance on mobile, pause control if any.
- Card and bento grids: heterogeneous items and browsing; homogeneous items, comparison and search results use lists or tables.
- Floating labels: no research validates them. Baymard called them "promising" but untested (2013), and Silver and Smashing's tests argue against them. Persistent labels above the field are the baseline.
- ✨ AI button: only with a label that names what it does, and a disclosed AI role.
- Empty-state illustration: only when the state teaches what will appear and gives one action to fill it; distinct from loading, error and 404.
- Goal-gradient progress bar: multi-step flows where the progress is honest, never inflated.
- Peak moments such as confetti: the end of a key flow that confirms a real outcome and gives a next step, not a manufactured peak.
- Chat bubble and assistant: one persistent entry point, scope stated, page-aware tappable suggestions, and a task that filters, search or forms don't already handle.
- Accordions: independent sections of which users need only a few (FAQ), never crucial info collapsed.
- Infinite scroll: flat, homogeneous, goal-less content only, with position restore and a reachable footer.
- Dark-only or dark-first default: a domain reason (media viewing, low-light use, pro creative tools), plus system-setting support.
- Tooltips: supplementary info only, keyboard reachable, never the sole label or vital info.
- Hamburger or drawer: only when navigation cannot fit; combo pattern with the top 3–4 destinations visible.
- Placeholder-as-label: only in search fields, where a scoped placeholder is the norm; every other field keeps a persistent label.

## Sources not reached (treat related claims as unverified)
- FTC Bringing Dark Patterns to Light (2022): only the landing page was fetched; PDF findings and categories were not read.
- EU 2024 Digital Fairness Fitness Check primary document: the 97% figure comes from a law-firm search snippet. DSA Art. 25 guidelines text was not fetched. DFA status (Q4 2026) comes from a news snippet.
- Matteo Penzo's UXmatters eye-tracking article was not fetched; only Lukew's summary was, and it has no fixation numbers.
- Adam Silver, "Floating labels are problematic" (2017) and the Form Design Patterns book: not fetched.
- Caroline Jarrett, Forms That Work text: the model is known only via search snippets and slides.
- NN/g "Prompt Suggestions", "Prompt Controls in GenAI", "Explainable AI in Chat", "GenUI buttons and checkboxes", "Less Chat, More Answer": titles seen, not fetched.
- Laws of UX pages for Fitts, Hick and Postel: not fetched.
- Baymard's per-issue mobile percentages are behind the paywall; the public page gives only the 62%/38%/0% split.

## Thresholds the review can test
100 ms / 400 ms / 1 s / 10 s response; 5 or fewer carousel frames; 5 or fewer visible top-level nav items; 2 or fewer disclosure levels; about 8 checkout fields; persistent labels on every field. The inferred numbers (1–2 accent emphases per view, 300–500 ms indicator delay, about 8 field budget outside checkout) are our inference and should be validated on real apps before any is made a [MUST].
