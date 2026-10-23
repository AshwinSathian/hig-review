Covers: UI copy and microcopy by message type, product voice, conflicts between writing sources, and string checks. Apple first, then humanizing-writing and the interface-writing literature.
Loaded by: content
Snapshot: 2026-10-23

Tags: [MUST] Apple writes must/never/always/don't (in the guideline body too), or App Review enforces it; anti-fabrication is our own rule and the one unconditional MUST. [SHOULD] avoid, prefer, use, make sure, "in general" hedges and plain imperatives. [CONSIDER] depends on context or the product profile. Apple MUSTs bind on native Apple targets; on web they are the default, and a profile can waive one only through `waivers` with a reason. Anti-fabrication is the one rule that never yields, on any target, under any profile.

Source tags: [Apple] HIG writing and component pages; [Apple Style Guide]; [Apple WWDC22] Writing for interfaces (10037); [Apple WWDC24] Add personality through UX writing (10140); [Apple WWDC25] Make a big impact with small writing changes (404); [Apple WWDC26 290] Craft clear names for features and labels; [Apple WWDC26 250] and [Apple WWDC26 227] (AI output, sample content); [App Review]; [HW] the humanizing-writing skill; [GOV.UK]; [MS] Microsoft Style Guide; [NNg]; [Atl] Atlassian; [MC] Mailchimp; [Polaris]; [M3]; [Cloudscape]; [SAP]; [PAIR]; [Podmajersky]; [Yifrah]. *(snippet)* means read from a search snippet only; **(unverified)** means recalled, not read, and carries less weight.

AI-microcopy tells: see references/slop-catalog.md#ai-microcopy.

**Filing a copy finding.** Every finding has three parts: the problem (quote the string and say where it appears), the rule (tag and source from this file), and a rewrite in the product's voice from the profile's `voice` block. Rewrites change only what was flagged and add no facts. If the fix needs a fact the strings don't contain (the real cause of an error, the real limit, the real count), ask for it or leave a marked placeholder such as `[real cause]`. Never guess [HW, Atl "don't make one up"]. Where voice costs clarity, file it as a clarity failure, not a style note [Apple WWDC24].

## Every message type

Apple
- [SHOULD] Lead with what matters: the most important information first on each screen and in each string, keywords front-loaded for scanning. Lead with the why: "To get reservation updates, enter your phone number" [Apple, Apple WWDC25, MS].
- [SHOULD] One idea per screen. Split text that carries several ideas across screens and plan the flow [Apple].
- [SHOULD] Cut every word that isn't needed: filler adverbs and adjectives ("simply", "quickly"), interjections ("Uh oh"), pleasantries ("We're sorry"), minimizers ("10 short minutes!"). Keep a descriptor only when it carries meaning ("automatically"). No repetition: "Delivery delayed 10 minutes" [Apple WWDC25].
- [SHOULD] Plain language: no jargon, no gendered terms, no idioms (they also translate badly). Define a technical term on first use [Apple, Apple Inclusion, Apple WWDC22].
- [SHOULD] One word per concept. Keep a word list (use / avoid / definition), and give the same action the same button name everywhere: not "Delete" in one place and "Remove" in another. Repeat a term rather than cycling synonyms ("repeat 'data' if that's clearer") [Apple, Apple WWDC24, Apple WWDC25].
- [SHOULD] Address the reader as "you", never "the user" or "the player" [Apple Inclusion, MS].
- [SHOULD] Avoid "we" altogether (`voice.we_policy: avoid`, the default); it's unclear who "we" is, especially in errors. "Unable to load content", not "We're having trouble loading this content". The writing page (Dec 2025) supersedes the inclusion page's softer "reserve we/our for the company" [Apple, Apple Style Guide]. Web exception: see Conflicts resolved, C1.
- [SHOULD] Possessives sparingly: "Favorites", not "Your Favorites". If you use them, keep one perspective; never mix "my" and "your" [Apple Dec 2025]. Polaris agrees: "View shipping settings", not "View your settings" *(snippet)*.
- [SHOULD] Voice stays constant; tone follows the person's state. Plain and direct for errors and money; celebration only for real achievements. Rank qualities per moment (clarity can outrank simplicity; turn friendliness down when someone is blocked). Never trade usefulness for voice [Apple, Apple WWDC24].
- [SHOULD] Be careful with humor; it wears thin on repeat views [Apple Inclusion]. Humor follows `voice.humor`. When the profile is silent, the skill asks during profile bootstrap, and until it is answered there is no humor anywhere. It is never used in errors, destructive confirmations, money flows or permission requests, whatever the profile says.
- [SHOULD] Bias-free: no generic he/she (rewrite to "you" or a plural), no ableist or violent terms, no master/slave, whitelist/blacklist, sanity check, abort, kill or hang. Don't call nondisabled people "normal" or "healthy", or frame disabled people as brave or inspiring. Don't assume shared experiences such as family structure, college or a first car. Don't use color to say good or bad [Apple Style Guide, Apple Inclusion, MS].
- [SHOULD] Make sure gesture words fit the device: "tap" on iPhone and iPad, not "click"; "click" for a pointer; "choose" or "select" when the input is unknown or the copy is cross-device [Apple]. Web: "click" for pointer and "tap" for touch, or neutral verbs (Select, Choose, Open), or detect `@media (pointer: coarse)` [Apple translation, GOV.UK, Cloudscape].
- [SHOULD] Small screens (iPhone, Watch) need brevity. TV is a shared screen seen from far away: keep it brief and think about who is being addressed [Apple].
- [SHOULD] Avoid "please" in instructions. No e.g., etc., i.e., and/or, or via (except when space is tight) in UI strings [Apple Style Guide, GOV.UK, Atl, Cloudscape]. GOV.UK notes screen readers may read "eg" as "egg".
- [SHOULD] Contractions are fine and part of Apple's informal voice [Apple Style Guide, MS, Polaris *(snippet)*]. Elsewhere, follow `voice.contractions` (default `per-voice`; C2).
- [SHOULD] Numerals for counts and units; spell out one through nine in prose. Reproduce UI element names exactly [Apple Style Guide].
- [SHOULD] Write for localization: leave room for longer translations, never build sentences by concatenating strings, and use plural rules [Apple WWDC22, Apple Inclusion].
- [SHOULD] Read it aloud [Apple, MS].
- [SHOULD] Pick the channel by urgency (inline, notification, alert, action sheet), and match the tone to it [Apple].

humanizing-writing and others
- [MUST] **Never invent anything to sound specific.** No made-up causes, counts, durations, user numbers, testimonials, ratings or "trusted by" figures ("Join 10,000+ happy teams" with no real figure behind it). If an error's cause is unknown, say something went wrong and give a next step; don't make a cause up [HW, Atl]. Sample content in mocks and screenshots is plausible domain content, never lorem ipsum, and never shipped as fact [Apple WWDC26 227, HW].
- [SHOULD] Specific and checkable. Name the object, count, file, person, amount or time ("Delivery delayed 10 minutes"), not a category ("There's an issue with your order") [HW, Apple WWDC25, NNg].
- [SHOULD] Plain verb, common word: "use", not "utilize"; "buy", not "purchase"; "help", not "assist" or "facilitate". A precise domain term stays [HW, GOV.UK].
- [SHOULD] Replace a figure of speech with the fact: "Syncing paused: no connection", not "Your sync hit a speed bump" [HW].
- [SHOULD] No significance inflation ("transform", "revolutionize", "the future of"), and no trailing "-ing" clause that adds meaning the fact didn't earn ("Saved, ensuring your work is always safe") [HW].
- [SHOULD] Say it once. The body doesn't repeat the title [HW, Atl].
- [SHOULD] Hedge only what is uncertain, once, at the claim. Don't hedge what the product knows ("This may take a moment" when the duration is known) [HW].
- [SHOULD] Split sentences over 25 words [GOV.UK]. Otherwise let length follow the content, and don't write fragments for drama [HW].
- [SHOULD] Spelling: one variety per product, set in the profile. Flag mixing ("color" and "colour" in one build).
- [SHOULD] Passive voice is fine for agentless system messages; flag it when it hides who must act (C13) [GOV.UK, MC].

Long-form in-app prose (help articles, onboarding paragraphs, emails, release notes in the product): invoke the humanizing-writing skill if it is installed. If it isn't, apply the rules above plus these, adapted from it [HW]:
- Stop when the content stops. Delete a closing line that only restates the paragraph as a saying.
- Don't announce a point before making it ("Here's the thing", "The result?").
- Deny X only when this reader is likely to believe X. Otherwise skip "it's not X, it's Y" and "not only X but also Y", and state Y.
- No stock transitions or recap endings ("Moreover", "Furthermore", "In conclusion").
- Noun-built phrases become verbs ("the implementation of" → "implementing"; "Initiate the configuration process" → "Set up").
- Asides go in commas or parentheses; an em dash only for a break a comma would hide.
- Lists for items a reader scans or follows in order, headers for sections a reader jumps to, three items only when there are three things. Don't open every bullet with a bold phrase.
- Reread before finishing: every claim supported? any repeat? a sentence running on "and"? a fix that swapped one pattern for another?
- When editing the product team's own text, fix what was flagged and leave their voice alone.

## Labels and buttons

Apple
- [SHOULD] Buttons and links are verbs that name the result. Don't be cute: "Send", not "Let's do it!" [Apple].
- [SHOULD] Dialog buttons say the specific action; avoid "Yes" and "No". The choice must be readable from the labels alone ("Cancel Subscription" / "Keep Subscription") [Apple alerts, Apple WWDC22]. "OK" in informational alerts only, and avoid OK as the default title elsewhere; write OK, not "okay" [Apple alerts, Apple Style Guide].
- [MUST] Always title a button that cancels an alert's action "Cancel" [Apple alerts].
- [SHOULD] Don't make Cancel the default button. If a single button is also the default, use "Done", not "Cancel" [Apple alerts].
- [SHOULD] Alert buttons are 1–2 words naming the result ("View All", "Reply", "Erase") [Apple alerts].
- [SHOULD] Avoid "Click here". Link text says where it goes ("Learn more about UX Writing"), because screen readers list links out of context. A bare "Learn more" repeated on one screen fails for the same reason (WCAG 2.4.4) [Apple].
- [SHOULD] Multi-step flows: start with "Get Started", then use *either* "Continue" *or* "Next" (or a label hinting at the next step) throughout, and end with "Done" [Apple].
- [SHOULD] Ellipsis (…, U+2026) only when the action needs more input or opens another view, window or app [Apple menus, buttons]. Use the single character, not three dots [Apple Style Guide].
- [SHOULD] No articles in menu items. Add a verb to an ambiguous toggle ("Turn HDR On"). Segment labels are nouns [Apple menus, segmented-controls].
- [SHOULD] Style Guide verbs: choose for menu items; select for objects, checkboxes and radio buttons; "tap", not "tap on"; "click", not "click on"; "touch and hold", not "tap and hold" or "long press" (fine in developer docs); "press" for physical keys, not "hit". Checkboxes are selected or deselected ("selected/unselected", not "checked/unchecked"). Switches are turned on or off; don't say "slide", and "toggle" is developer-only. "Turn on", not "enable", for something that starts now. "Dimmed", not "grayed" or "hollow". "Enter" for input, "type" for keystrokes [Apple Style Guide] (wording unverified).
- [SHOULD] Style Guide terms: users see an alert or message (error message is developer-only); "dialog", not "dialog box"; "help tag", not "tooltip"; "pointer", not "cursor"; "hold the pointer over", not "hover over"; log in (Mac account) vs sign in; "turn on Dark Mode"; "light appearance", not "Light Mode" [Apple Style Guide].
- [SHOULD] Every field has a persistent visible label; placeholders disappear. Hint text shows the format ("name@example.com") or describes the content ("Your name") [Apple text-fields, WCAG 3.3.2]. Web: a visible `<label>` in addition to the placeholder.

Others
- [SHOULD] Verb + noun ("Activate Apple Pay"), except common actions (Save, Close, Cancel, OK). Drop articles in labels generally [Polaris *(snippet)*].
- [SHOULD] Name the outcome ("Send invoice"), not the mechanism ("Submit") [Yifrah via a secondary summary; the book itself **(unverified)**].
- [SHOULD] Front-load link text and keep it active and specific [GOV.UK].
- [SHOULD] The shortest label that still names the object and the outcome. "Delete" on a screen with three kinds of deletable thing fails even though it is shorter (C7) [Podmajersky via VTEX].

## Titles and headings

Apple
- [SHOULD] Every screen has one purpose. Headers and buttons must stand alone, because people don't read in order [Apple WWDC22].
- [SHOULD] Headlines carry no filler: "Test Your Hearing", not "Take a quick and simple hearing test" [Apple WWDC25].
- [SHOULD] Toolbar and window titles under 15 characters. macOS menu bar titles are one word [Apple toolbars, the-menu-bar].
- [SHOULD] No ending punctuation on fragments, so none on titles and headings. Full sentences are punctuated [Apple, MS].
- [SHOULD] Capitalization is a house choice per element type, applied everywhere ("title case for all alerts", "sentence case for all headlines"). Component pages with specific rules take precedence [Apple]. Native defaults:
  - Title-style: menu items and menu bar titles, push-button labels ("Add to Cart"), segment labels, notification titles, alert titles that are fragments.
  - Sentence-style: alert titles that are full sentences, alert body text, notification body, hidden-preview text, widget descriptions, help tags.
  - Title-style means every word capitalized except articles, coordinating conjunctions and short prepositions; the last word is always capitalized.
  - Alert buttons: the alerts page's sentence-style is a default, not a hard rule. Check that alert buttons share one case across the app and match the other buttons. Flag mixed casing, not the choice of case.
- [SHOULD] Feature names: Belongs, Sets expectations, Works everywhere. Name for what it does for the person, not the technology ("Enhance Dialogue", not "Vocal Isolation"); a verb for things you do. In money and trust contexts clarity beats brand ("Balance", not "Spending Power"). Watch for names that pass judgment at edge values, and run the out-loud test [Apple WWDC26 290].

Others
- [SHOULD] Sentence case is the default outside native Apple targets [MS, GOV.UK, M3 *(snippet)*, Cloudscape]. See C3.

## Errors

Apple
- [SHOULD] Prevent the error first. If wording can't fix a common error, redesign the interaction [Apple].
- [SHOULD] Put the message next to the problem, beside the field, and validate inline as soon as a value is entered [Apple, Apple entering-data].
- [SHOULD] Say what happened and how to fix it, without blame: "Choose a password with at least 8 characters", not "That password is too short"; "Use only letters for your name", not "Don't use numbers or symbols" [Apple].
- [SHOULD] Skip "Oops!" and "Uh-oh" (typically unnecessary, and they can sound insincere), "Sorry, bad input" and bare error codes. Avoid a title like "Error" or "Error 329347 occurred". Avoid robotic messages such as "Invalid name" [Apple, Apple WWDC22, Apple alerts].
- [SHOULD] Alert title: what happened, where and why, in two lines at most. Neutral tone: not oblique, not accusing, not downplaying the severity [Apple alerts].
- [SHOULD] Put the fix on the primary button ("Add Payment Method") and offer "Not Now" [Apple WWDC22].
- [SHOULD] "Sorry" can sound insincere; leave it out [Apple].
- [SHOULD] Use the caution symbol only for unexpected data loss [Apple alerts].
- [SHOULD] Web (our translation): tie errors to fields with `aria-describedby` plus `aria-invalid`, announce through `aria-live="polite"`, and name the fix (WCAG 3.3.1/3.3.3).

Others
- [SHOULD] Use redundant, accessible indicators, never color alone. Don't show an error before the person has had a fair chance to act. Use a positive tone, put responsibility on the system, and skip humor [NNg].
- [SHOULD] Technical codes go behind a link, for diagnostics only [NNg, Atl].
- [SHOULD] Error title 3–4 words, body 1–2 sentences; CTAs are 1–2 words with imperative verbs, not "OK" [Atl].
- [SHOULD] No "sorry" or "please" unless the consequences are severe and can't be undone [Atl]. A total outage may get an apology (C4) [NNg].
- [SHOULD] Keep what the person entered [NNg].
- [SHOULD] Match prominence to impact; modals only for serious problems [NNg].
- [CONSIDER] Web only, and only if `voice.we_policy` allows "we": Atlassian's "we" for blame-free errors (C1).

## Empty states

Apple
- [SHOULD] Every empty state gives a next step, with a button or link to take it if possible. Say how content will appear ("Save episodes… and they'll show up here"). Empty states educate or celebrate [Apple, Apple WWDC22].
- [MUST] Don't show crucial information only in an empty state; it disappears once there is content [Apple].
- [SHOULD] No idioms ("Nothing strike your fancy?"). Voice is allowed if it stays useful [Apple WWDC22, Apple].

Others
- [CONSIDER] A different empty state for each cause: first use, cleared, no search results, no permission, error [Atl; NNg-attributed *(snippet)*].

## Confirmations and destructive actions

Apple
- [SHOULD] The title is a question that names the object ("Remove iPhone?") [Apple WWDC22].
- [SHOULD] Buttons name the action ("Delete Album" / "Cancel"); avoid Yes/No and OK as the default title [Apple alerts].
- [SHOULD] Use the destructive style only for destruction the person didn't deliberately choose. Destructive buttons are red; Cancel dismisses without acting [Apple alerts, Apple WWDC22].
- [SHOULD] Don't explain the buttons in the body. If you must, say "choose" and use the button's exact title without quotes [Apple alerts].

Others
- [SHOULD] State what is lost and whether it can be undone, with real counts: "Delete 3 photos? This can't be undone" [HW; Apple's "what happened, where and why" applied to the decision].
- [SHOULD] Title and button may share the key word ("Remove iPhone?" / "Remove"). The body adds a consequence or is left out; "Are you sure you want to delete this file?" under "Delete file?" adds nothing (C9) [Atl, Apple WWDC25].
- [SHOULD] No confirmshaming opt-outs ("No thanks, I hate saving money") [term from Brignull's deceptive-design work, **(unverified)**]. Reject carries the same weight as Accept on consent banners [Apple Privacy, web translation]. Route both to the report's Trust section.

## Success and feedback

Apple
- [SHOULD] Celebrate only real achievements. For routine success, state the result ("Saved", "Invoice sent to Dana") [Apple, HW].
- [SHOULD] Exclamation points sparingly; they can look silly when frequent. Occasionally in promotional text, avoided in documentation [Apple WWDC22, Apple Style Guide]. Brand voice may use occasional exclamation points and emoji [Apple branding].

Others
- [SHOULD] No closing kicker or aphorism after the fact ("You're unstoppable!") [HW].
- [SHOULD] Delight means little flourishes, not humor or cheekiness, and celebration comes only after trust is built [Atl].

## Onboarding

Apple
- [SHOULD] Skippable, step-by-step teaching [Apple Inclusion]. Teach in context, at the moment it applies, rather than front-loading a tour [Apple WWDC22; NNg-attributed *(snippet)*].
- [SHOULD] Fixed CTA labels: "Get Started", "Continue", "Done" [Apple].
- [SHOULD] No permission walls on onboarding slides; ask in context (see Permissions).
- [SHOULD] Simple doesn't mean minimal: each screen says concretely what the product does for the person [Apple WWDC26].

Others
- [SHOULD] No "Welcome to the future of…" or "Your journey starts here". The first line says what the screen does [HW].
- [CONSIDER] Three slides only when there are three things; don't pad to a triad (C12) [HW].

## Permissions

Apple
- [MUST] Purpose strings clearly describe how the app uses the data [App Review 5.1.1].
- [SHOULD] A purpose string is one active, specific sentence ending in a period [Apple Privacy]. Good: "The app records during the night to detect snoring sounds." Bad: "Microphone access is needed for a better experience." Bad: "Turn on microphone access."
- [SHOULD] Ask at the moment the feature needs it, and explain why [Apple WWDC22]. Web: request only from a user gesture inside the feature [Apple, web translation].
- [SHOULD] No pre-prompt with a big "Allow" and a tiny "Not now"; no "to improve your experience" [Apple Privacy].
- [SHOULD] Point to a setting with a direct link or button, not a path ("Go to Settings > Privacy > …"). Web: deep-link to the settings route [Apple].

Others
- [SHOULD] No humor, exclamation points or emoji in permission requests (C10) [Apple Privacy, Cloudscape].

## Notifications

Apple
- [SHOULD] Body text is full sentences, not self-truncated, without the app name. Drop generic titles. Hidden-preview text is a noun phrase ("Friend request", "Shipment") [Apple notifications].
- [SHOULD] Marketing pushes need opt-in and an in-app opt-out [App Review 4.5.4].
- [SHOULD] Pick the channel by urgency and match the tone [Apple].

Others
- [SHOULD] Name the event and the object ("Dana commented on Q3 budget"), not "You have a new update!" [HW].

## AI feature copy

Apple
- [SHOULD] Name the feature by the task ("Summarize thread", "Draft reply"), not the technology ("AI Assistant", "✨ Magic") [Apple WWDC26 290].
- [SHOULD] Plan for wrong output with previews, confirmations and disclaimers. Never write generated content straight into user data without preview and undo [Apple WWDC26 250].

Others
- [SHOULD] Label generated output with text placed near it. Cloudscape's label is "Generated by AI"; if every item in a list is generated, label the group header, not each item [Cloudscape]. SAP Fiori uses "Created with AI. Verify before use" with progressive disclosure, and makes the notice mandatory when people act on high-impact results [SAP *(snippet)*].
- [SHOULD] Don't use the sparkle icon alone. In NN/g's study (n=107), no participant associated it with "artificial intelligence"; the top readings were "favorite or save" and "visual effects", each 16.82%. Used at all, it "should always be accompanied by a label" [NNg 2024]. Reserve it for generative output [Cloudscape]. PatternFly and Red Hat require text with the icon *(snippet)*.
- [SHOULD] NN/g expects the AI callout to matter less over time: what matters is that the feature is present and meets the need [NNg 2024].
- [SHOULD] Set expectations about limits, especially when stakes are high [PAIR *(snippet)*].
- [SHOULD] Loading text is "[Generating/Loading] [specific artifact]" with no end punctuation: "Generating" for new content, "Loading" or "Fetching" for existing content. No loading state under one second [Cloudscape].
- [SHOULD] Call AI replies "responses", not "answers" [Cloudscape]. Don't claim understanding or certainty the system lacks ("I understand exactly what you need") [HW anti-fabrication, PAIR calibration]. Hedge model output once, where the doubt is real [HW].
- [SHOULD] In-product responses don't open with "Certainly!" or "Great question!" and don't close with "I hope this helps!" or "Feel free to reach out" [HW].
- [CONSIDER] Legal labeling: EU AI Act Article 50 obligations reportedly began 2 August 2026 *(snippet; verify against the official text)*. Flag it for the team; the skill gives no legal advice.
- [CONSIDER] Drop the AI marker once the person has edited the content (Iterable's pattern) *(snippet)*.

## Settings descriptions

Apple
- [SHOULD] Practical labels. The description explains the *on* state only; people infer off. Not "When enabled, X happens. When disabled, X does not happen." [Apple].
- [SHOULD] Point to a setting with a direct link, not a menu path [Apple].

Others
- [SHOULD] Start with a verb and drop "you can" [MS, Polaris *(snippet)*].
- [SHOULD] Say the concrete effect, including any cost ("Uses more battery") [HW].

## Tooltips

Apple
- [SHOULD] 60–75 characters max, start with a verb, don't repeat the control name, sentence case. A full-sentence help tag skips the period unless house style says otherwise [Apple offering-help]. On Apple platforms the term is "help tag" [Apple Style Guide].
- [SHOULD] Widget descriptions begin with an action verb; avoid "This widget shows…" and similar self-reference [Apple widgets].

## Loading copy

Apple
- [SHOULD] Delight isn't adding confetti: no rotating joke messages or false-progress theater ("Reticulating splines…", "Brewing your coffee…") [Apple WWDC26, Atl].

Others
- [SHOULD] Name what is loading ("Loading invoices") with the Cloudscape template above. Say what is happening and, if known, how long. Never invent a duration [HW, MUST under anti-fabrication].
- [SHOULD] Skip loading text for sub-second waits [Cloudscape].

## Voice

The product's voice lives in the profile's `voice` block: `voice.traits`, `voice.personal_voice_opt_in` (default false), `voice.spelling` (`british` or `american`), `voice.casing` per element type, `voice.we_policy` (`avoid` default, `company-only`, `allowed`), `voice.contractions` (`per-voice` default, `all`, `positive-only`, `none`), `voice.humor` (`unset` default, `none`, `light`, `free`), and `voice.reading_level_target`. Rewrites use that voice. The user's personal voice applies only when `personal_voice_opt_in: true`. Spelling follows the profile; any mixing is flagged.

**How the `voice` block is filled.** Three methods, combined:
1. **Podmajersky's voice chart.** Columns are 3–4 product principles. Rows are Concepts (ideas to bring up whenever there's an opening), Vocabulary (words that support or undermine a principle), Verbosity, Grammar, Punctuation and Capitalization. Row names are verified through VTEX's adaptation, which credits the 2019 edition. The 2025 second edition adds AI-generated UX content (per O'Reilly's description; not read). The pattern list often attributed to her (titles, buttons, instructions, input fields, transitional text, confirmations, notifications, errors) is **(unverified)**.
2. **Mailchimp's "X but not Y" pairs.** "Weird but not inappropriate, smart but not snobbish." Each pair gives two checks: the trait shows up, and the "not" side is a failure mode the reviewer looks for.
3. **Atlassian's trait × emotional-state table.** For each trait, when to use more (the person feels confident or curious) and when to use less (confused, blocked, afraid). That is the tone map.

Apple supplies the rest: voice constant and tone by situation, a ranking of qualities per moment, a word list (use / avoid / definition), and the naming criteria (Belongs, Sets expectations, Works everywhere).

A filled block covers: 3–4 principles, each with what it means and its "not" side; concepts to surface; vocabulary (use, avoid with the preferred term, define); verbosity; grammar (person, `we_policy`, `contractions`, possessives); punctuation (exclamation points, emoji, serial comma); capitalization per element type; spelling; humor; reading level target; a tone map by message type and user state (for example, blocking error: low warmth, no humor, apology only when the product is at fault and caused harm; routine success: no celebration; milestone: celebration allowed); the AI output label.

**How copy is checked against it.**
1. No profile yet: extract strings, infer a draft chart from the existing copy (dominant casing per element, contractions, pronoun use, spelling variety, recurring terms), show it to the user to confirm, and flag inconsistencies found on the way. Don't invent principles the copy doesn't support; ask.
2. Deterministic pass (Measurable checks) against the profile settings.
3. Judgment pass per message type: does each string fit the tone map? Does any fall on the "not" side of a pair? Swap test: replace the product name with a competitor's; if nothing breaks, the voice is generic.
4. Usefulness over voice: voice that costs clarity is a clarity failure [Apple WWDC24].
5. Rewrites follow the "Filing a copy finding" rules at the top.

**Personal voice (`voices/ashwin-sathian.md`).** It describes the user's essay and tutorial voice and says it is for text going out under his name.
- Applies by default, because these are humanizing-writing rules the voice also reflects: anti-fabrication; named particulars; hedge facts, not tastes; plain endings (no kicker lines on success or onboarding screens); first lines that say what the screen covers.
- Opt-in only: contractions at his rates (about 31 per 1,000 words in essays, 15 in tutorials; Apple's contraction rule covers native targets anyway); "we" for walking through steps (Apple wins on native targets even when opted in); tutorial moves for long-form help (a small scenario to set up a step, the likely objection asked and answered at once, an everyday analogy followed to its consequence, a preference labelled as a preference); spoken-register looseness.
- Never in product UI, even opted in (flag if seen): personal motifs (chance and small causes, the road not taken, weather and water imagery); self-undercutting asides; archaic or legal words mixed with slang; untranslated Malayalam, Hindi or Tamil words; dashes at about 6 per 1,000 words, ellipses and trailing-ellipsis endings (rates mean nothing on short strings, and a trailing ellipsis signals "more input needed" on Apple platforms); openings that reach the subject late; cheerful sign-offs and reader-teasing; capitals for stress.
- British spelling is not inherited from the personal voice. Spelling is set per product.

## Conflicts resolved

Policy: native Apple targets, Apple wins on platform conventions. Web, Apple's rule is the default, other sources may sharpen it, and the conflict is shown.

| # | Conflict | Resolution |
|---|---|---|
| C1 | "We" in errors. Apple: avoid "we" ("Unable to load content") [Apple Dec 2025, Style Guide]. Atlassian: use "we", so the person doesn't feel blamed. Microsoft uses "we're", "let's", "Contact us". | Native: no "we"; the system is the subject, or there is none ("Couldn't save"). Web: `voice.we_policy` defaults to `avoid`; [CONSIDER] Atlassian's "we" for blame-free errors only if `voice.we_policy` allows it. All sources agree: never blame "you" ("You entered an invalid…"). |
| C2 | Contractions. Apple, MS and Polaris use them; GOV.UK avoids negative ones (can't, don't). | Native: contractions. Elsewhere, `voice.contractions` decides (`per-voice`, `all`, `positive-only`, `none`). Suggest positive-only for readers who are mainly non-native English speakers or have low literacy, GOV.UK's audience. |
| C3 | Casing. Apple: consistent per element type, title-style for menus, push buttons, segments. MS, GOV.UK, M3, Cloudscape: sentence case. HW lists Title Case headers as a tell. | Native: Apple component defaults (menus title case); flag inconsistency, not the case chosen. Web: profile chooses per element type; sentence case when it is silent. The HW title-case tell applies to prose headings in help or marketing, not to Apple-mandated button and menu casing. |
| C4 | Humor and apology in failure. NN/g: no humor in errors, but a total failure may get an apology plus something memorable. Apple: no "Oops", "sorry" can sound insincere. Atlassian: no "sorry" unless consequences are severe. Mailchimp: clarity first. | Field-level and blocking errors: no humor, no apology. A product-caused outage, data loss or wrong charge gets one plain apology. A novelty element on a full-outage page only if `voice.humor` allows, never in money, health or safety flows. |
| C5 | "Please" and "thank you". Apple, GOV.UK, Atl, Cloudscape avoid them; VTEX's voice chart uses them. | Off by default. A profile may opt in with a stated rule (for example, only when asking for effort, such as a survey). Never in errors. |
| C6 | Questions. Apple uses question alert titles; MS rewrites to "Ready to buy? Contact us."; HW flags the self-answered question. | A question the person answers with a button is fine. One the product answers itself is a tell ("Ready to buy? Contact us." is flagged on Apple targets). |
| C7 | Brevity vs completeness. MS: shorter is always better. Apple: cut every unneeded word, but notification bodies are full sentences. Podmajersky via VTEX: too few words stall people nearly as badly as too many. | Shortest wording that still names the object and outcome. |
| C8 | Reading level. GOV.UK is widely cited as targeting a reading age of 9 (via council style guides; the fetched GOV.UK page cites "1 in 6 adults in England have very poor literacy skills"). Polaris: about 7th grade *(snippet)*. HW: no invented thresholds. | Reported, not enforced: give the grade as a number, pass/fail only if the profile sets `reading_level_target`. Compute only on strings of 10 or more words. |
| C9 | Repetition. HW: say it once. Apple: headers and buttons stand alone; repeat a term rather than switch synonyms. Atl: body doesn't repeat the title. | Title and button may share the key word; the body must add a consequence or fix, or be left out. |
| C10 | Emoji and exclamation points. Apple branding allows them occasionally; Cloudscape: no exclamation points; HW: emoji as structure is a tell. | Never in errors, permissions, destructive confirmations, money or AI labels. In celebration and marketing moments, per profile. |
| C11 | Whether to mark AI. Cloudscape and SAP mark output; NN/g expects the callout to fade; EU AI Act Art. 50 may require it; Apple: disclaimers and previews for risky output. | Generated content people act on or share gets a text label near it. The feature name describes the task, not "AI". Legal labeling is flagged for the team. |
| C12 | Rule of three. HW flags triads as padding; onboarding often uses three slides. | Fine when there are three distinct things. Flag triads that restate one idea ("Fast. Simple. Easy."). |
| C13 | Passive voice. GOV.UK and Mailchimp prefer active; Apple's "Unable to load content" has no agent. | Agentless system messages are fine (GOV.UK allows the passive when it keeps writing user-centred). Flag the passive when it hides who must act ("Verification is required" → "Verify your email"). |

Humor: follows `voice.humor`, never in errors, destructive confirmations, money or permission requests. If the profile is silent (`unset`), the skill asks during profile bootstrap; until answered, no humor anywhere.

## Measurable checks

The skill applies these by hand to extracted strings. Sources of strings: `.xcstrings`, `Localizable.strings`, `.stringsdict`, SwiftUI `Text("…")` and `Button("…")` literals, `NSLocalizedString`, `Info.plist` purpose strings (`NS*UsageDescription`), web i18n JSON or YAML, JSX text nodes. Record each string's element type from its call site (button, alert title, menu item, `title=` tooltip, `aria-label`, placeholder); casing and length rules can't be applied without it.

**Length limits**
- Tooltip or help tag over 75 chars (target 60–75 characters max) [Apple].
- Toolbar or window title at 15 characters or more [Apple].
- Alert button over 2 words [Apple].
- App name over 30 chars [Apple].
- Web or Atlassian-style: error title over 4 words; error body over 2 sentences (candidate) [Atl].
- Any sentence over 25 words [GOV.UK].
- Purpose string missing or under about 5 words (a heuristic, not from Apple) [Apple Privacy, App Review 5.1.1].

**Buttons and links**
- Verb-first rate for buttons: check the first word against an imperative-verb list plus the profile vocabulary, allowing OK, Done, Cancel, Close. Nouns are right for segment labels and tabs.
- Yes/No on any dialog, or OK on a destructive one [Apple, SHOULD].
- A cancelling button not titled "Cancel" [Apple, MUST]; Cancel set as the default [Apple, SHOULD].
- "click here", or the same bare "Learn more" twice on one screen [Apple, Polaris, WCAG 2.4.4].
- Flow label drift: "Next" and "Continue" in one flow; first step not "Get Started"; last not "Done" (native) [Apple].

**Banned and candidate words** (flag; a name or a literal meaning is fine: "Simply Piano", "unlock" for a door lock)
- Interjections: oops, uh-oh, uh oh, whoops, yikes, yay (severity up in errors) [Apple WWDC22, WWDC25].
- Error title "Error", `Error \d+`, "An error occurred" or "Something went wrong" with no other sentence; "Invalid" + noun as the whole message [Apple, NNg].
- "please", "sorry", "please note" in error and instruction strings, unless the profile opts in [Apple, GOV.UK, Atl].
- we / we're / we've / our / us in errors, and anywhere if `voice.we_policy` is `avoid` [Apple].
- "the user" / "users" in user-facing strings [Apple, MS].
- "click" or "hover" in iOS and iPadOS builds; "tap" in macOS [Apple].
- Filler adverbs (candidate): simply, easily, quickly, just, seamlessly, effortlessly, instantly [Apple WWDC25].
- Hype (candidate): unlock the power, supercharge, unleash, level up, elevate, empower, transform, revolutionize, game-changing, next-level [HW, GOV.UK].
- GOV.UK words to avoid (candidate): agenda, deliver, deploy, empower, facilitate, foster, impact, initiate, key, leverage, robust, streamline, tackle, transform, utilise. Scope it: "deploy" and "robust" are correct in developer tools.
- Style Guide misuse: "enable" for turn on, "toggle" in user copy, "tap on", "click on", "long press", "grayed out", "checked/unchecked" [Apple Style Guide].
- e.g., i.e., etc., and/or, via [Apple, GOV.UK, Cloudscape].
- Gendered generics (he/she, his or her) and the avoid list: master/slave, whitelist/blacklist, sanity check, crippled, lame, hang, kill, abort [Apple Style Guide, MS].
- Profile `avoid` terms, and known synonym pairs both present: Delete/Remove, Sign in/Log in/Login, Settings/Preferences [Apple word list, Podmajersky].
- Purpose strings with "better experience", "improve your experience", or only "Turn on…" [Apple Privacy].
- "This widget/feature/setting…" openers, "When enabled… When disabled…" pairs, "You can…" openers [Apple, MS, Polaris].

**Casing and punctuation**
- Casing consistency per element type; on native, against Apple component defaults; on web with a silent profile, sentence case [Apple, MS, GOV.UK].
- Ellipsis: three dots `...` instead of `…`; an ellipsis on a button that neither asks for input nor opens a view [Apple].
- Trailing period on fragments, titles and buttons; missing period on purpose strings [Apple, MS].
- Exclamation marks in error, permission, destructive or money strings (flag); count them elsewhere [Apple, Cloudscape].
- Emoji by element type, outside the moments the profile allows [HW, profile].

**Possessives and spelling**
- "My X" and "Your Y" in one product [Apple].
- Spelling variety mixing against the profile (color/colour, -ize/-ise, cancelled/canceled).

**Code-level**
- Unfilled placeholders: `{…}`, `%@` with no argument, "undefined", "null", "[object Object]", double spaces where a value dropped out [HW].
- String concatenation for plurals or sentences [Apple Inclusion].
- Placeholder as the only label: an input with a placeholder and no label or `aria-label` [Apple, WCAG 3.3.2].
- AI: sparkle icon with no adjacent text; generated-output components with no label; loading text not "[Generating/Loading] [noun]" [NNg, Cloudscape].

**Reported, not judged**
- Reading grade (Flesch-Kincaid or similar) on strings of 10 or more words, per message type; pass/fail only with `reading_level_target` (C8).
- Pronoun and contraction counts per 100 strings, against the profile.
- Distinct terms per concept (synonym spread).
- Tells density per screen, using the slop catalog. One hit proves little; a cluster is the signal [HW].

**Needs judgment** (not lintable): tone fit per message type and user state; whether an error names the real cause; whether an empty state's next step is the right one; whether a feature name sets correct expectations or judges people at edge values; whether a triad is padded; the swap test; whether an AI disclosure is enough for the stakes; inclusion in imagery and examples.

**`measure.py` from humanizing-writing.** Use it only on joined longer strings, compared across builds (or against a competitor's strings), never on single labels. It reports per passage: word, sentence and paragraph counts; sentence-length mean and stdev; share of sentences ≤5 and ≥30 words; paragraph-final sentences ≤8 words; mean word length and share of words ≥10 characters; "and", commas, semicolons, colons, parentheses and dashes per 1,000 words; and rates of negated contrast, trailing "-ing" clauses, short colon clauses, stock transitions and nominalizations. Per-1,000-word rates mean nothing on a 2-word button, its sentence splitter needs a capital after a full stop, and its own docstring says to compare passages written for the same prompt. Build the corpus from onboarding bodies, empty-state bodies, settings descriptions, notification bodies, AI responses and help text, one string per paragraph. There, `negated_contrast`, `ing_tail`, `stock_transition`, `nominalization`, `dashes_per_1k` and `word_share_ge10_chars` work as comparative signals. Import its `PATTERNS` and `measure()` rather than copying them, report the numbers beside the lint, and set no thresholds, as the script doesn't.
