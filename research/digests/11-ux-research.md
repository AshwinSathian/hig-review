# 11 — Empirical UX research beyond Apple (NN/g, Baymard, Laws of UX, forms authors, deceptive design)

Sources: Nielsen Norman Group, nngroup.com; Baymard Institute, baymard.com; Laws of UX, lawsofux.com; Luke Wroblewski, lukew.com; Adam Silver, Smashing Magazine; Jarrett and Gaffney, Forms That Work; deceptive.design; Princeton Web Transparency and Accountability Project; FTC. Fetched 2026-10-23.
Paraphrased digest for review purposes. Short quotations are attributed; consult the sources for the authoritative text.

**Framing rule (from coordinator):** Apple HIG is the base of loupe. Everything here *augments* it: it adds evidence, thresholds and numbers, or covers ground where Apple says nothing. Each section labels its relation to HIG as **Adds to Apple**, **Apple silent**, or **CONFLICT** (a real tension, flagged for a human to decide; we do not recommend overriding Apple). Each section also lists **Overused / slop tells**: patterns the research blessed for a narrow case that are now applied everywhere and look generic.

Fetched 2026-10-23. Numbers are quoted from the fetched page unless marked **(unverified, from memory)**. Statements about what Apple HIG says are from memory of the HIG and should be checked against the HIG digest in this repo.

---

## 1. NN/g: Flat UI elements attract less attention and cause uncertainty (https://www.nngroup.com/articles/flat-ui-less-attention-cause-uncertainty/, 2017)

**Finding & evidence.** Desktop eyetracking, 71 general web users, 9 live pages, each modified into a strong-signifier and a weak-signifier version (between-subjects; paired t-test, p < 0.05). On weak-signifier versions users spent **"22% more time"** and made **"25% more fixations"**. 6 of 9 page pairs showed different gaze patterns. On one page, **86% (25 of 29)** of strong-version users went from heading to target link, against **50% (12 of 24)** on the weak version (p < 0.005). Weak signifiers are defined as "links styled like static text or ghost buttons". Flat works only with low information density, a conventional layout, and high-contrast interactive elements.

**Checks**
- [MUST] Every tappable or clickable element has at least one signifier beyond position: fill, border, contrasting color, underline, or chevron. Text-styled links inside body copy must differ in color from the surrounding text.
- [MUST] No ghost buttons (outline-only, transparent) for a screen's primary action.
- [SHOULD] On content-dense screens (dashboards, settings, feeds), check that interactive text can be told apart from static text without hovering or tapping.
- [CONSIDER] For features users don't know exist yet, use strong signifiers ("discoverability" items).

**Relation to Apple: CONFLICT (partial).** Since iOS 7, and more so with the 2025 Liquid Glass material (unverified, from memory), Apple allows borderless, text-only and glass buttons in toolbars and navigation bars. Apple's mitigations are tint color and fixed bar positions, which roughly match NN/g's "traditional layout" condition. The tension is real when a team takes Apple's borderless style *out of* system bars, for example tint-colored plain text used as a button in the middle of content. Flag that case; leave system-bar usage alone.

**Overused / slop tells.** Gray ghost buttons next to a gradient primary button. Links that are only bold. Translucent "glass" cards with text actions and no affordance. Everything set in one weight and one color, so nothing reads as interactive.

---

## 2. NN/g: Response Times, the 3 important limits (https://www.nngroup.com/articles/response-times-3-important-limits/, 1993, updated 2014) + Skeleton screens (https://www.nngroup.com/articles/skeleton-screens/, 2023, reviewed 2026) + Laws of UX Doherty threshold (https://lawsofux.com/doherty-threshold/)

**Finding & evidence.**
- **0.1 s** "is about the limit for having the user feel that the system is reacting instantaneously." **1.0 s** "is about the limit for the user's flow of thought to stay uninterrupted." **10 s** "is about the limit for keeping the user's attention focused on the dialogue."
- Over about 10 s, use a percent-done indicator. When the total is unknown, show absolute progress (name each item as it's processed). A spinner is the last resort. For 2–10 s, a full percent-done bar can be excessive.
- Skeleton screens: under 1 s, skeletons and spinners are "unnecessary and may feel distracting". For 2–10 s, spinners work, and skeletons work under 10 s. "Anything above 10 seconds requires an explicit estimation of duration." Use skeletons for full-page loads, spinners for a single module, progress bars for process tasks (upload, convert). Avoid "frame-display" skeletons that show only header, footer and background.
- Doherty & Thadani (IBM Systems Journal, 1982): "Productivity soars when a computer and its users interact at a pace (<400ms)". This replaced the earlier 2,000 ms standard. Laws of UX also says "A deliberate delay can make a process seem more valuable and more trustworthy".

**Checks**
- [MUST] Direct manipulation (press states, toggles, drag) responds visually in ≤100 ms. Optimistic UI is preferred over waiting on the network.
- [MUST] Any wait over 10 s shows determinate progress or a time estimate. An indefinite spinner over 10 s is a finding.
- [SHOULD] No skeleton or spinner for loads under ~1 s. Delay showing the indicator (~300–500 ms) so it doesn't flash. The delay value is our inference, not NN/g's.
- [SHOULD] Skeleton layout matches the real layout: same block count and positions, no layout shift when content arrives.
- [SHOULD] Use spinners per module and skeletons per page, not both stacked on one screen.
- [CONSIDER] Deliberate "labor illusion" delays only where they honestly reflect work being done (e.g., a security scan). Never use them to pad perceived value. See §17 (deceptive design).

**Relation to Apple: Adds to Apple.** Apple's HIG covers determinate vs. indeterminate progress indicators and says to show content as soon as possible, but gives no numeric thresholds (unverified, from memory). These numbers give the review measurable cutoffs.

**Overused / slop tells.** Shimmer skeletons on every component, including ones that load in 50 ms. Skeletons whose shape doesn't match the real content. Fake "Thinking…" steps on AI features. Spinners centered in an otherwise blank page.

---

## 3. NN/g: Hamburger menus and hidden navigation hurt UX metrics (https://www.nngroup.com/articles/hamburger-menus/, 2016) + Mobile navigation patterns (https://www.nngroup.com/articles/mobile-navigation-patterns/, 2015)

**Finding & evidence.** 179 participants, 6 live sites, desktop and phone (with WhatUsersDo). Desktop navigation use: hidden **27%**, visible **48%**, combo **50%**. Mobile: hidden **57%**, combo **86%**. Hidden navigation lowered content discoverability by **more than 20%** on both devices. Difficulty (1 = easy, 7 = hard): hidden **2.6**, combo **2.3**, visible **2.1**, so hidden was "21% harder than visible". Desktop tasks took **at least 39% longer** with hidden navigation. Mobile tasks took **15% longer** with hidden than with combo. Recommendation: on mobile, if there are **four or fewer** top-level links, show them all. The 2015 article: with **4–5** main options, keep them visible; **"more than 5 options"** gets hard to fit at good touch-target size. "Menu" as a word slightly beat the hamburger icon (third-party data). Apple's iOS 7 edge-swipe Back makes edge-swipe drawers problematic.

**Checks**
- [MUST] Desktop or wide web layouts: primary navigation is visible, not behind a hamburger.
- [MUST] iPhone and mobile web with ≤5 top-level destinations: a persistent tab bar, not a drawer.
- [SHOULD] If a drawer is unavoidable, use a combo pattern (top 3–4 visible, the rest under "More"), and repeat key destinations as in-page links.
- [SHOULD] No left-edge-swipe drawer on iOS (it collides with the system Back gesture).

**Relation to Apple: Adds to Apple.** HIG already prefers tab bars and sidebars over hamburger menus and suggests a small number of tabs (unverified, from memory: roughly 3–5 on iPhone). NN/g adds the measured cost. Web is where Apple says nothing, and that's where this check matters most.

**Overused / slop tells.** A hamburger on a desktop site with 4 nav items. A hamburger *plus* a bottom tab bar. A sidebar drawer on an iPad app that has 3 sections.

---

## 4. NN/g: Text scanning patterns: F-shape, layer-cake, spotted, marking, bypassing, commitment (https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/, 2017; F-pattern first reported 2006)

**Finding & evidence.** Six patterns. **Layer-cake:** eyes hit headings and subheadings and skip the body, which shows as horizontal bands on a heatmap. **Spotted:** readers skip text and hunt for links, digits, or distinctive word shapes. **Marking:** eyes stay fixed while the page scrolls (more common on mobile). **Bypassing:** readers skip the first words of list items that all start the same way. **Commitment:** reading nearly everything, which happens only when the reader is highly motivated. "Good web formatting reduces the impact of F-scanning." Advice: put key points in the first two paragraphs, front-load headings with the informative words, use informative link text, bold key phrases.

**Checks**
- [MUST] Headings and list items front-load the distinctive word. Flag lists where 3 or more items start with the same word (bypassing), e.g. "Manage users / Manage roles / Manage billing".
- [SHOULD] Long text screens have scannable subheads every few paragraphs (support layer-cake).
- [SHOULD] Numbers, prices and dates are visually distinct (support spotted scanning).
- [SHOULD] No "Learn more" or "Click here" link text without a target noun.

**Relation to Apple: Apple silent** on reading behavior. HIG covers typography and hierarchy but not how users scan prose.

**Overused / slop tells.** Feature grids where every card starts "Seamlessly…" or "Effortlessly…". Section titles that are clever rather than informative ("Magic, meet workflow"). Three-column icon+title+blurb rows with identical blurb length.

---

## 5. NN/g: Error-message guidelines (https://www.nngroup.com/articles/error-message-guidelines/, 2023)

**Finding & evidence (guidelines; synthesized from testing, no numbers).** Place the error near its source. Use bold, high-contrast red styling, but "never rely on color or animation alone". Match severity to presentation: reserve modals for serious errors. Don't show errors too early: leaving an empty field shouldn't count as an error. Use plain language and hide error codes unless they help diagnosis. Avoid "An error occurred". Offer a remedy. Avoid blaming words like "invalid" or "incorrect", and avoid humor that wears thin on repeated errors. Preserve user input. Suggest likely fixes.

**Checks**
- [MUST] The error appears adjacent to the field or object at fault, and is also summarized at the top for long forms (summary is our addition; GOV.UK uses this pattern).
- [MUST] User input is preserved after any error, including server errors.
- [MUST] The error communicates by text plus icon or color, not color alone.
- [SHOULD] No generic "Something went wrong" without a cause and a next step.
- [SHOULD] No "invalid" or "illegal" in copy. State the format expected ("Enter a date like 23/10/2026").
- [SHOULD] No modal alert for a field-level error.
- [CONSIDER] Prevention: warn before the mistake, e.g. "attachment mentioned but none attached".

**Relation to Apple: Adds to Apple.** HIG covers alerts and says to keep them rare. NN/g adds placement, tone and timing for *inline* errors, where Apple says little.

**Overused / slop tells.** Toast "Oops! Something went wrong 😅". Playful 404 illustrations on error states that block a task. Errors shown on blur before the user has typed anything.

---

## 6. NN/g: Icon usability (https://www.nngroup.com/articles/icon-usability/, 2014) + Sparkles icon (https://www.nngroup.com/articles/ai-sparkles-icon-problem/, 2024)

**Finding & evidence.** "a text label must be present alongside an icon." "Icon labels should be visible at all times." "Don't rely on hover to reveal text labels." Only home, print and magnifying glass are close to universal. Heart and star are misread. **5-second rule:** if it takes more than 5 s to think of an icon for a concept, the icon will likely fail. In one study, no participant clicked a clock icon used for history.
Sparkles (Kaplan, 2024): no participant linked ✨ to "artificial intelligence". **73%** of users in a quantitative icon study tied a star to saving or favoriting. Of 107 associations for the sparkles icon: favorite/save **16.82%**, visual effects **16.82%**, important/special **11.22%**, rewards **6.54%**, tips/help **4.67%**. Recommendation: always pair it with a label.

**Checks**
- [MUST] Icon-only controls outside system-standard positions get a visible label. Or the icon is one of: search, home, share (platform glyph), close, back, and has an accessibility label.
- [MUST] No hover-only labels on touch platforms. On web, a tooltip is a fallback, not the label.
- [MUST] Any ✨ "AI" control is labeled with what it does ("Summarize", "Draft reply"), not just the sparkle.
- [SHOULD] Heart and star icons are used consistently and labeled when the meaning is not save/favorite.

**Relation to Apple: CONFLICT (partial).** Apple's toolbars and navigation bars use icon-only SF Symbols as standard (unverified, from memory; macOS toolbars allow icon-and-text). Apple's mitigation is a shared, learned symbol vocabulary plus accessibility labels. Suggested reconciliation: accept icon-only for Apple-standard actions in standard places (share, compose, trash in the toolbar). Flag icon-only for *custom* or app-specific actions. Tab bars already carry labels in HIG, so they agree.

**Overused / slop tells.** ✨ on every AI button. A row of 6 unlabeled custom line icons in a header. Emoji used as section icons. Lucide/Feather icons picked for looks rather than meaning (e.g., a "Layers" icon for "Projects").

---

## 7. NN/g: Dark mode vs. light mode (https://www.nngroup.com/articles/dark-mode/)

**Finding & evidence.** For normal vision, light mode (positive polarity) generally performs better. Piepenbrock et al. 2013 (*Ergonomics*): light mode "won across all dimensions" for ages **18–33** and **60–85**. The light advantage grows as font size shrinks (2013, *Human Factors*). Dobres et al. 2017: no polarity effect in simulated daytime glances, but light was faster at night for small text. Aleman et al. 2018: light mode linked to choroid thinning, with only **7** participants. Legge et al. 1985: **7** participants with cloudy ocular media read faster in dark mode. Recommendation: don't default to dark for the general population. Offer dark mode and follow the OS setting.

**Checks**
- [MUST] Appearance follows the system setting by default, with an in-app override only if needed.
- [SHOULD] A dark-only default needs a domain reason (media viewing, low-light use, pro creative tools).
- [SHOULD] In dark mode, small text (<15 pt) gets extra contrast review, since the polarity penalty is largest at small sizes.

**Relation to Apple: Adds to Apple** (agrees: Apple says respect the system appearance). Adds evidence against dark-first product defaults.

**Overused / slop tells.** A dark-only SaaS landing page with a neon gradient. Pure #000 backgrounds with low-contrast gray (#666) body text. "Dark mode = premium" as an aesthetic choice.

---

## 8. NN/g: Infinite scrolling (https://www.nngroup.com/articles/infinite-scrolling-tips/, 2022) + Carousels (https://www.nngroup.com/articles/designing-effective-carousels/, 2013, reviewed 2026)

**Finding & evidence.** Infinite scroll suits flat, homogeneous, goal-less content. It hurts refinding, comparison and footer access, and gives an "Illusion of completeness". Save the user's list position when they come back from a detail view. The article gives no percentages.
Carousels: use **5 or fewer frames**. Auto-rotate timing guide is about **3 words per second**. Avoid auto-forward on mobile and for ad-like content. Animated ads get looked at **27%** of the time in NN/g eyetracking. Dots are a weak cue on mobile. Important carousel content should also appear elsewhere.

**Checks**
- [MUST] Returning from a detail view restores the list's scroll position.
- [MUST] No infinite scroll on lists users search, compare, or need to finish (orders, settings, search results with a goal). Use "Load more" or pagination.
- [MUST] Pages with infinite scroll keep the footer content reachable some other way.
- [SHOULD] Carousels: ≤5 frames, visible count and position, controls inside the carousel, no auto-advance on mobile, pause control if any auto-advance (WCAG 2.2.2 also requires this).
- [CONSIDER] Replace a hero carousel with a single static hero.

**Relation to Apple: Apple silent** on infinite scroll vs. pagination and on auto-rotating carousels. Apple's own App Store uses horizontal shelves, which are user-driven, not auto-rotating.

**Overused / slop tells.** Auto-rotating hero carousel with 3 stock-photo slides. A "logo marquee" infinitely scrolling customer logos. Testimonial carousels with dots only.

---

## 9. NN/g: Tooltips (https://www.nngroup.com/articles/tooltip-guidelines/, 2019) + Empty states (https://www.nngroup.com/articles/empty-state-interface-design/, 2021)

**Finding & evidence.** Tooltips: "Don't use tooltips for information that is vital to task completion." Support keyboard as well as mouse hover. Use arrows when elements are crowded. Use tooltips consistently. Label icons rather than relying on a tooltip.
Empty states: avoid totally empty states, which leave users unsure whether it's loading, failed, or found nothing. Never show "No records" before loading completes. Use the space to teach ("pull revelations"). Give a direct path to the task that fills it, e.g. DataDog's "Star your favorites to list them here".

**Checks**
- [MUST] No required info (password rules, field formats, pricing terms) lives only in a tooltip.
- [MUST] Empty, loading and error states are visually distinct. "No results" appears only after the query has finished.
- [SHOULD] Every empty state says what will appear here and gives one action to fill it.
- [SHOULD] Filtered-to-empty states name the filter and offer to clear it.

**Relation to Apple: Adds to Apple.** Recent HIG versions have some empty-state guidance (ContentUnavailableView in SwiftUI exists; unverified, from memory, whether HIG has a dedicated page). Tooltips (macOS help tags) are covered by Apple, but not the "never vital info" rule as strongly.

**Overused / slop tells.** A generic empty-state illustration (person with a magnifying glass, floating boxes) plus "Nothing here yet!" plus a CTA that just says "Get started". The same illustration reused for empty, error and 404.

---

## 10. NN/g: Accordions (https://www.nngroup.com/articles/accordions-on-desktop/, 2023) + Progressive disclosure (https://www.nngroup.com/articles/progressive-disclosure/, 2006) + Cards (https://www.nngroup.com/articles/cards-component/, 2016)

**Finding & evidence.** Accordions fit when users need only a few sections, or when sections are independent (FAQ). Avoid them when users need most of the content, when there is little content, for deep hierarchies, or for narrative reading. Use a caret or plus icon, make the whole heading clickable, allow several sections open, and consider Expand All. "Don't hide crucial information inside collapsed panels."
Progressive disclosure: **two disclosure levels** is the practical limit. More levels get lost. The initial display should cover what most users need.
Cards suit heterogeneous items and browsing. They are a poor fit for homogeneous items, search results, comparison, photo galleries, and tight screens, where a list is better.

**Checks**
- [MUST] No crucial info (price, fees, cancellation terms) inside a collapsed accordion by default.
- [SHOULD] Disclosure depth ≤2 (screen → "Advanced" → no further nesting).
- [SHOULD] Homogeneous collections (orders, files, messages, products to compare) use lists or tables, not card grids.
- [SHOULD] Accordion headers are buttons with expanded/collapsed state exposed to assistive tech.

**Relation to Apple: Adds to Apple.** Apple's disclosure groups and outline views exist. HIG favors lists (inset grouped), which agrees with NN/g's cards critique. The 2-level limit is not in HIG as a number.

**Overused / slop tells.** Bento-grid cards for uniform data. Cards nested inside cards. Every FAQ collapsed on a page that has only 4 FAQs. "Show more" truncation on two-line descriptions.

---

## 11. NN/g: AI and chatbot UX research (2023–2026)

Sources:
- AI: First new UI paradigm in 60 years (https://www.nngroup.com/articles/ai-paradigm/, 2023)
- Articulation barrier / hybrid UI (https://www.nngroup.com/articles/ai-articulation-barrier/, 2023)
- AI Chat Is Not (Always) the Answer (https://www.nngroup.com/articles/ai-chat-not-the-answer/, 2024)
- Sycophancy in GenAI chatbots (https://www.nngroup.com/articles/sycophancy-generative-ai-chatbots/, 2024)
- What Is Your Site's AI Chatbot for? Users Can't Tell (https://www.nngroup.com/articles/site-ai-chatbot/, 2026)
- 10 Guidelines for Designing Your Site's AI Chatbots (https://www.nngroup.com/articles/ai-chatbots-design-guidelines/, 2026)
- Designing Use-Case Prompt Suggestions (https://www.nngroup.com/articles/designing-use-case-prompt-suggestions/; seen via search snippet only)

**Finding & evidence.**
- Nielsen estimates about **half** the population in rich countries is "not articulate" enough to get good results from chat-only AI. He predicts hybrid UIs: intent-based input combined with GUI controls.
- Hybrid recommendations: prompt suggestions while typing, visual style pickers with thumbnails, "recognition over recall" GUI next to the text field. Based on 100+ Midjourney prompts. The findings are preliminary.
- Site chatbots (2026, **9** participants, **8** chatbots including Rufus, Magic Apron, Redfin): users often didn't notice the bot, didn't know what it could do, and found it slower than search and filters. Sales-led answers eroded trust.
- The 10 guidelines (2026, qualitative): one chat entry point. The chat persists across pages. State capabilities and give page-aware suggested prompts. Make suggestions clickable buttons, not text. Include images. Use progressive disclosure in place rather than spawning new messages. **"Don't Autoscroll Users to the End of a Response"**: keep the scroll position at the start of the new message during streaming. Allow resizing. Allow save and share. Consider voice input.
- Sycophancy: models flip correct answers when asked "Are you sure?". People prefer sycophantic answers.

**Checks**
- [MUST] Streaming responses don't auto-scroll past the start of the new message. The user controls the scroll.
- [MUST] The chat/assistant entry point is labeled with its scope ("Ask about your orders"), not a bare ✨ or "How can I help?".
- [MUST] Suggested prompts and follow-ups are tappable, specific to page and context, and persist after the first turn.
- [SHOULD] Chat is not the only path to a task that a filter, search or form already handles. Flag "chat replaces UI".
- [SHOULD] AI output that users act on shows sources or a verify path. A confirmation step guards destructive agent actions.
- [SHOULD] Chat transcripts can be copied, saved or shared.
- [CONSIDER] Hybrid controls (chips, sliders, style thumbnails) next to the prompt field.

**Relation to Apple: Apple largely silent.** HIG has generative-AI guidance (unverified, from memory: a "Generative AI" / machine learning section about setting expectations and attribution), but not streaming scroll behavior, prompt suggestions, or chat entry points. This whole section is new ground.

**Overused / slop tells.** A floating chat bubble bottom-right on every page. A ✨ "Ask AI" button that opens a blank chat. A fake typewriter effect on static text. Three generic suggestion chips ("Summarize", "Explain", "Brainstorm") regardless of context. A chat window that can't be resized and cramps tables.

---

## 12. NN/g: Handmade designs as the new trust signal (https://www.nngroup.com/articles/handmade-designs/, 2026)

**Finding & evidence.** "Polish no longer signals quality, since AI can generate sleek images quickly." AI-made visuals read as "overly polished, gauzy", "look good from afar" but fall apart up close, with random errors. Human slips are small and consistent. The evidence is case examples (Hermès 2026 homepage, Paris 2024 posters at nearly 2,000 hours), with no user-test numbers. The article warns that warmth which hides real shortcomings erodes trust.

**Checks**
- [SHOULD] Illustration and imagery hold up at 100% zoom: no malformed hands or text, no inconsistent line weights across a set.
- [SHOULD] Visual style has one clear authorial intent across screens, not a mix of stock 3D blobs, AI art and flat icons.
- [CONSIDER] Use a deliberate, ownable visual element (custom illustration, type detail) over generic gradient polish.

**Relation to Apple: Apple silent** (Apple's own marketing is high-polish). This is the most direct research hook for the skill's anti-slop goal. It is an opinion piece with examples, so weigh it below the measured studies.

**Overused / slop tells.** Mesh gradients, glassmorphism, 3D clay icons, AI hero images with dreamy blur. Uniform 16 px radius on everything.

---

## 13. Baymard: Inline form validation (https://baymard.com/blog/inline-form-validation, 2024)

**Finding & evidence.** "31% of sites don't have any inline validation at all" (the intro says 32%; the article is inconsistent). Avoid premature validation: validate on blur, or once a fixed-length field reaches its length (ZIP, card, CVV). "the error message must live update on a keystroke level", so the error clears the moment input becomes valid. Show positive validation (checkmark). Inline validation doesn't replace validation on submit.

**Checks**
- [MUST] No error shown while the user is still typing a field for the first time.
- [MUST] Once shown, the error clears as soon as the input becomes valid (keystroke-level recheck).
- [MUST] Submit-time validation still runs and moves focus to the first error.
- [SHOULD] Fixed-length fields validate on reaching length.
- [CONSIDER] Positive checkmarks for fields that are hard to get right (password, email confirmation).

**Relation to Apple: Adds to Apple.** HIG text-field guidance doesn't specify validation timing (unverified, from memory).

**Overused / slop tells.** Red borders on every field the instant the form loads or on first focus. Green checkmarks on trivial fields like "First name".

---

## 14. Baymard: Checkout field count, abandonment, passwords, labels

Sources:
- Checkout optimization: average form fields (https://baymard.com/blog/checkout-flow-average-form-fields, 2024)
- Cart abandonment rate (https://baymard.com/lists/cart-abandonment-rate, updated 2025)
- Password requirements and reset (https://baymard.com/blog/password-requirements-and-password-reset, 2022)
- Mobile forms: avoid inline labels (https://baymard.com/blog/mobile-forms-avoid-inline-labels, 2013)
- Mobile e-commerce benchmark (https://baymard.com/research/mcommerce-usability, page ©2026)

**Finding & evidence.**
- The average checkout has **11.3** form fields (2024), down from 11.8 in 2021 and 12.7 in 2019. "most sites need only 8 form fields in total for a checkout flow." Average checkout is 5.1 steps.
- **42%** of participants typed their full name into "First Name" at least once. **89%** of sites use more than one name field. Address Line 2: **75%** of sites don't hide it, and **30%** of participants stopped at it. A coupon field is shown by default on **35%** of sites that have one. **84%** don't delay account creation until the confirmation step.
- Average cart abandonment is **70.22%** (50 studies). Top reasons: extra costs **40%**, slow delivery **20%**, didn't trust the site with card info **19%**, forced account creation **18%**, "Too long / complicated checkout process" **17%**, errors/crash **17%**, couldn't see total cost up front **12%**. Estimated conversion gain from fixable checkout UX: **35.26%**.
- Passwords: **82%** of sites "require unnecessarily complex passwords". Suggested floor is 6–8 characters (NIST: 8). Password-reset problems caused up to **19%** checkout abandonment among existing account holders (18.75% average at Amazon and ASOS). Abandonment was rare "as long as the password requirements are clearly communicated up front."
- Labels: avoid inline (placeholder) labels for forms with **three or more fields**. They are acceptable only for 1–2 field forms (search, sign-in). The Baymard article calls floating labels "promising" but untested (2013), while Silver argues against them (§15).
- Mobile benchmark: of 138 US and EU sites, **62%** were "mediocre" or worse and **0%** "good".

**Checks**
- [MUST] Total cost (fees, tax, shipping) is visible before the payment step.
- [MUST] Guest checkout is available. Account creation is optional and offered after purchase.
- [MUST] Password rules are visible before typing, not revealed one at a time on error. No composition rules beyond a length minimum unless there's a regulatory reason.
- [MUST] Forms with ≥3 fields have persistent visible labels (not placeholder-only).
- [SHOULD] One full-name field unless there's a real need for split names. Collapse Address Line 2 behind "Add apartment, suite…". Collapse the coupon field behind a link.
- [SHOULD] Count fields in any checkout or sign-up and flag anything over ~8 that the question protocol (§15) can't justify.
- [SHOULD] Support autofill, password managers and passkeys (correct `autocomplete` / `textContentType`).

**Relation to Apple: Adds to Apple.** HIG covers text fields, Apple Pay and Sign in with Apple, but not field budgets or abandonment data. Apple Pay buttons agree with "fewer fields".

**Overused / slop tells.** Split first/last name plus middle name. Password meters with five checklist rules that turn green one at a time. "Create an account to continue" walls. Promo-code fields shown prominently, which send users off hunting for codes.

---

## 15. Form design authors: Wroblewski, Adam Silver, Caroline Jarrett, GOV.UK

Sources:
- Wroblewski, label alignment eye tracking (https://www.lukew.com/ff/entry.asp?504), citing Matteo Penzo's UXmatters study (2006, unverified, from memory for the year)
- Silver, "Material Design Text Fields Are Badly Designed" (https://www.smashingmagazine.com/2021/02/material-design-text-fields/, 2021)
- Jarrett & Gaffney, *Forms That Work* (2008), three-layer model (https://effortmark.co.uk/?p=1216; found via search, not fetched)
- GOV.UK Service Manual, form structure (https://www.gov.uk/service-manual/design/form-structure)
- NN/g, placeholders (https://www.nngroup.com/articles/form-design-placeholders/, 2014)

**Finding & evidence.**
- Top-aligned labels need "a single eye fixation" to take in label and field, with the shortest completion times. Left-aligned labels are slowest because of "the number of eye fixations they require". Lukew's page gives no fixation counts. The commonly cited ~50 ms vs ~500 ms saccade figures are **(unverified, from memory)**: don't quote them.
- Silver on Material float labels: they don't fix placeholder problems ("poor contrast and the chance of the label being mistaken for an actual answer"), use tiny label text, and truncate long labels. Google's published test compared only two float-label variants and never tested against conventional fields. Smashing's own tests found floating labels "weren't particularly effective". Silver recommends label above the field, a full border, and hint text outside the field. His evidence is qualitative (20+ years; Boots, Just Eat, GOV.UK).
- NN/g placeholders: 7 harms. They vanish (memory strain), entries can't be reviewed, error recovery is harder, they disrupt tabbing, and "Eyetracking studies show that users' eyes are drawn to empty fields", so filled fields get overlooked. They get mistaken for data, and the gray text is low contrast.
- Jarrett's three layers: **appearance** (layout), **conversation** (questions and answers), **relationship** (the task and the trust between user and organization). Her review method: don't look at the form first, choose a persona, fill it in as that persona, then assess each layer.
- GOV.UK: "Start by splitting the form across multiple pages with each page containing just one thing". **Question protocol:** ask for an item only if you can say why you need it, what you'll do with it, who must provide it, how you'll check it, and how you'll keep it current and secure. Eligibility questions go first.

**Checks**
- [MUST] Labels sit outside and above inputs, visible at all times. Placeholder is used only for an optional example, never the label.
- [MUST] Inputs have a visible full boundary (border or filled field with clear edge). Underline-only fields are flagged.
- [SHOULD] Each field passes a question-protocol test the review can state ("why is phone number asked?"). Unjustified fields are findings.
- [SHOULD] Long or branching flows use one question or topic per screen, with eligibility first.
- [SHOULD] Hint text is persistent and placed between the label and the field.
- [CONSIDER] Review forms through Jarrett's layers: does the *relationship* (trust, reason for asking) justify the *conversation*?

**Relation to Apple: CONFLICT (partial) + Adds to Apple.**
- iOS Settings-style forms put the label left and the value or field right in a row, and Apple text fields commonly use placeholder as the only label in short forms (unverified, from memory). For 1–2 field forms (sign-in, search) this matches Baymard's exception. For long data-entry forms it conflicts with Wroblewski/Penzo, Baymard and NN/g. Suggestion: accept Apple's row-label style for settings toggles and pickers; flag placeholder-only labels in ≥3-field data-entry forms.
- Apple is silent on question protocol, field budgets, and one-thing-per-page.

**Overused / slop tells.** Material floating labels on iOS. Underline-only inputs. Placeholder "John Doe". Gigantic single-page sign-up forms with 12 fields in a two-column grid.

---

## 16. Laws of UX: non-obvious applications (https://lawsofux.com)

**Finding & evidence (fetched pages).**
- **Aesthetic-usability effect** (https://lawsofux.com/aesthetic-usability-effect/): Kurosu & Kashimura 1995, **26** ATM layouts, **252** participants. Appeal correlated more strongly with *perceived* ease of use than with actual ease of use. Takeaway: good visuals "can hide usability problems … in usability testing."
- **Peak-end rule** (https://lawsofux.com/peak-end-rule/): Kahneman et al. 1993, **14°C** water for **60 s**, versus 60 s plus **30 s** more as the temperature rose to **15°C**. Participants chose to repeat the longer trial.
- **Goal-gradient** (https://lawsofux.com/goal-gradient-effect/): Hull 1932/1934, rats run faster near the food. Kivetz, Urminsky & Zheng is cited without figures. The coffee-card result (a 12-stamp card with 2 pre-filled stamps finished faster than a 10-stamp card) is **(unverified, from memory)**.
- **Tesler's law** (https://lawsofux.com/teslers-law/): complexity "cannot be reduced", only moved. Tesler: better for engineers to spend an extra week than "millions of users spend an extra minute". Tognazzini's counterpoint: simplify, and users take on more complex tasks.
- **Von Restorff** (https://lawsofux.com/von-restorff-effect/): 1933 isolation effect. Caveats: restraint, so emphasized items don't end up "competing with one another" or get mistaken for ads. Don't rely on color alone, and consider users with motion sensitivity.
- **Doherty**: see §2. **Fitts, Hick, Postel**: not fetched. Standard statements, **(unverified, from memory)**.

**Checks (non-obvious applications)**
- [MUST] Aesthetic-usability: the review must not score polish as usability. Pretty screens get *more* scrutiny on task paths, because test participants under-report problems with attractive UIs.
- [SHOULD] Peak-end: identify the end of each key flow (purchase confirmation, export done, onboarding finish, cancellation). It should be clear, confirm the outcome, and give a next step, not a dead modal. The error peak (the worst moment) gets design attention too.
- [SHOULD] Tesler: when a setting or step is removed, check where the complexity went (to defaults? to support? to an AI guess the user must verify?).
- [SHOULD] Von Restorff: one emphasized element per view. Count the accent-colored elements; more than ~1–2 primary emphases per screen is a finding (the threshold is our inference).
- [SHOULD] Fitts (memory): destructive actions are *not* placed where the primary action's thumb or pointer lands. Distance and size work both ways: make Delete small and far.
- [SHOULD] Hick (memory): applies to *unfamiliar* choice sets. Don't use it to justify hiding a familiar menu.
- [CONSIDER] Postel (memory): accept flexible input formats (phone with spaces, dates in several forms) and normalize them, rather than rejecting them.
- [CONSIDER] Goal-gradient: progress indicators for multi-step flows. Never inflate progress dishonestly (see §17).

**Relation to Apple: Adds to Apple.** HIG implies several of these (hit targets → Fitts; simplicity → Tesler) but doesn't name them or their counter-uses.

**Overused / slop tells.** "Laws of UX" posters cited to justify decisions after the fact. A fake "You're 80% done!" bar. Confetti on every completion as a manufactured "peak". Pulsing accent badges on multiple elements at once (Von Restorff overload).

---

## 17. Deceptive design / dark patterns: checks the review must flag

Sources:
- Mathur et al., "Dark Patterns at Scale" (https://webtransparency.cs.princeton.edu/dark-patterns/, CSCW 2019)
- deceptive.design types (https://www.deceptive.design/types)
- FTC, *Bringing Dark Patterns to Light* (https://www.ftc.gov/reports/bringing-dark-patterns-light, Sept 2022). Only the landing page was fetched; contents **(unverified, from memory)**
- FTC Click-to-Cancel vacated: Eighth Circuit, *Custom Communications, Inc. v. FTC*, No. 24-3137, July 8, 2025 (per law-firm summaries via search, e.g. https://www.fenwick.com/insights/publications/eighth-circuit-vacates-ftcs-click-to-cancel-rule)
- EU: DSA Art. 25 and the planned Digital Fairness Act (https://cms.law/en/aut/legal-updates/inside-the-eu-s-planned-digital-fairness-act-digital-design-subscription-traps-and-influencer-marketing; https://www.pinmeto.com/news/eu-digital-fairness-act-scope-split-2026/; seen via search snippets)

**Finding & evidence.**
- Mathur et al.: ~**11K** shopping sites and ~**53K** product pages crawled. **1,818** dark-pattern instances on **1,254** sites (~11.1%). **22** third-party providers sell these as plug-ins. The taxonomy has 7 categories and 15 types:
  - Sneaking: Sneak into Basket, Hidden Costs, Hidden Subscription
  - Urgency: Countdown Timer, Limited-time Message
  - Misdirection: Confirmshaming, Visual Interference, Trick Questions, Pressured Selling
  - Social proof: Activity Messages, Testimonials of Uncertain Origin
  - Scarcity: Low-stock, High-demand
  - Obstruction: Hard to Cancel
  - Forced Action: Forced Enrollment
- deceptive.design lists 18 types. Beyond Mathur's set it adds Preselection, Nagging, Disguised ads, Comparison prevention, Addictive design, and Currency confusion.
- The EU Commission's 2024 Digital Fairness Fitness Check found **97%** of the most popular websites and apps used by EU consumers deployed at least one dark pattern (per search snippet, not fetched from the primary source). The DFA was announced as a Q4 2026 initiative, and no draft is confirmed as of the search. DSA Art. 25 already bans deceptive interface design for online platforms, except for practices covered by the UCPD.
- US: the FTC's 2024 Negative Option ("click-to-cancel") Rule was **vacated** on procedural (APA / §22) grounds on July 8, 2025. ROSCA, FTC Act §5, and state auto-renewal laws still apply (California's updated law took effect July 1, 2025).

**Checks (all [MUST] unless noted; any hit is a blocking finding)**
- [MUST] Cancel is at least as easy as sign-up: same channel, a similar number of steps, no forced call or chat. This is ROSCA- and state-law-relevant even after the vacatur.
- [MUST] No preselected add-ons, insurance, donations or marketing opt-ins (Preselection, Sneak into Basket).
- [MUST] No price that grows at the final step (Hidden Costs). Matches Baymard's 40% abandonment reason.
- [MUST] Trials that convert to paid state the date and amount up front and send a reminder (Hidden Subscription).
- [MUST] No confirmshaming decline copy ("No thanks, I hate saving money").
- [MUST] Countdown timers and "Only 2 left" / "12 people viewing" messages are backed by real data. Without real data they are fake urgency or social proof.
- [MUST] Accept and decline (cookie, tracking, upsell) have equal visual weight (Visual Interference). Ties to the EU consent-banner enforcement line.
- [MUST] No double negatives or trick questions in opt-in/out checkboxes.
- [MUST] Ads and sponsored items are labeled (Disguised Ads).
- [SHOULD] Permission or upgrade prompts don't reappear after a decline within a short window (Nagging).
- [SHOULD] Virtual currency shows its real-money price (Currency confusion).
- [SHOULD] Plan comparison uses the same units and features across tiers (Comparison prevention).
- [CONSIDER] Autoplay-next, streaks and infinite feeds in apps for minors are reviewed as "addictive design".

**Relation to Apple: Adds to Apple.** App Store Review Guidelines and HIG cover subscription disclosure, and Apple's native subscription management helps cancellation (unverified, from memory). Web flows have no such backstop. Our skill should apply these checks equally to web.

**Overused / slop tells.** Pricing pages with a "Most popular" badge on the middle tier plus a toggle defaulting to annual with a "Save 20%" flag. Exit-intent modals with confirmshaming. Fake "Join 10,000+ teams" social proof on new products.

---

## Synthesis: what Apple misses

1. **Thresholds, not just principles.** Apple says "be responsive" and "show progress". The research supplies cutoffs a review can test: 100 ms / 400 ms / 1 s / 10 s, ≤5 carousel frames, ≤5 visible top-level nav items, ≤2 disclosure levels, ~8 checkout fields, labels persistent at ≥3 fields.
2. **Forms as conversation.** HIG covers controls, not *which questions to ask*. Jarrett's layers, GOV.UK's question protocol and Baymard's field data let the review challenge the existence of fields, not only their styling.
3. **Validation timing and error tone.** Baymard (validate on blur, clear on keystroke) and NN/g (no blame, preserve input) fill a gap in Apple's text-field guidance.
4. **Web-specific behavior.** Infinite scroll, footers, hamburger on desktop, hover-only tooltips, scanning patterns. Apple's platforms make these moot; our web targets don't.
5. **AI and chat UI.** Streaming scroll, prompt suggestions, scope labeling, "chat replaces UI", the sparkles ambiguity. HIG barely covers these.
6. **Ethics as a pass/fail gate.** The deceptive-pattern taxonomy turns "respect the user" into named, checkable violations with legal exposure (ROSCA, DSA Art. 25, state laws).
7. **Polish isn't evidence.** Aesthetic-usability and NN/g's 2026 handmade-trust piece both warn that polish hides problems and now signals "AI-made". This is the research basis for the skill's anti-slop stance, and it applies to Apple-style glass polish too.
8. **Genuine conflicts to surface, not resolve:** (a) borderless/glass buttons outside system bars vs. the 22%/25% signifier penalty; (b) icon-only toolbar items vs. "labels visible at all times"; (c) placeholder-as-label and left-label rows in data-entry forms vs. top-aligned persistent labels. In all three, Apple's usage *inside its own system chrome* is defensible. Flag when apps copy the style elsewhere.
9. **Research-blessed patterns that became slop:** skeleton shimmer, hero carousels, card/bento grids, floating labels, ✨ AI buttons, empty-state illustrations, progress "goal-gradient" bars, confetti peaks, chat bubbles. Each started as a valid fix for a narrow case. The review should check that the *condition* holds (e.g., load >1 s, heterogeneous content) before accepting the pattern.

## Sources not reachable

- FTC *Bringing Dark Patterns to Light* (2022): only the landing page was fetched. The PDF findings and categories were not read.
- EU 2024 Digital Fairness Fitness Check primary document: the 97% figure comes from a law-firm search snippet. DSA Art. 25 guidelines text was not fetched. DFA status (Q4 2026) comes from a news snippet.
- Matteo Penzo's UXmatters eye-tracking article (primary for label alignment) was not fetched. Only Lukew's summary was, and it has no fixation numbers.
- Adam Silver, "Floating labels are problematic" (2017) and the *Form Design Patterns* book: not fetched. Book excerpts were seen via search only.
- Caroline Jarrett, *Forms That Work* text: the model is known only via search snippets and slides.
- NN/g "Prompt Suggestions", "Prompt Controls in GenAI", "Explainable AI in Chat", "GenUI buttons and checkboxes", "Less Chat, More Answer": titles seen, not fetched.
- Laws of UX pages for Fitts, Hick and Postel: not fetched (statements marked from memory).
- Baymard's per-issue mobile percentages are behind the paywall. The public page gives only the 62%/38%/0% split.

## Open questions for skill design

1. **Conflict policy:** when an app copies Apple chrome styling (glass buttons, icon-only, placeholder labels) into content areas, is that [SHOULD] or [MUST]? Proposal: [SHOULD], with an explicit "Apple-convention vs. research" note in the finding.
2. **Platform split:** should web reviews weight NN/g and Baymard above HIG, since HIG doesn't target the web, while iOS and macOS reviews keep HIG primary?
3. **Evidence grading:** tag each check with an evidence tier (measured study with n / benchmark / expert guideline / opinion piece) so the skill can rank findings. For example, §1 is measured (n=71) while §12 is opinion with examples.
4. **Measuring without running the app:** many checks (100 ms response, skeleton under 1 s, scroll restoration) need runtime observation. Does loupe drive the app (Playwright / simulator) or only read code and screenshots?
5. **Legal checks:** should deceptive-pattern hits carry a jurisdiction note (US ROSCA/state law, EU DSA/UCPD), or stay purely UX? These rules are moving (DFA pending, FTC rule vacated), so they need a dated "as of" stamp.
6. **Slop detection thresholds:** the inferred numbers (≤1–2 accent emphases per view, ~300–500 ms indicator delay, ~8 field budget outside checkout) are our inference. Validate them on real apps before making them [MUST].
