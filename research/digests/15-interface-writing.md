# 15 — Interface writing: merged rules for the copy pass

Compiled 2026-10-23 for the `loupe` skill's writing and microcopy pass.

**Precedence (decided by the user).** Apple's writing guidance is the base layer. The `humanizing-writing` skill and the non-Apple literature add to it. When Apple and another source conflict, the conflict is flagged in §3, and Apple wins on native Apple targets (iOS, iPadOS, macOS). The humanizing-writing rules apply to all UI copy. Each product's voice is defined in its project profile (§4). The user's personal voice traits apply only when a product opts in. Spelling (en-US or en-GB) is set per product, and the skill flags any mixing.

**Provenance.**
- Apple: digests `03-content-foundations.md` (Writing, Inclusion, Privacy) and `08-beyond-hig.md` (WWDC22 10037, WWDC24 10140, WWDC25 404, WWDC26 290 and 250, Apple Style Guide). Those digests were built from fetched first-party text.
- humanizing-writing: read in full from `/Users/ashwinsathian/Documents/Personal/humanize-writing-skill/` (SKILL.md, voices/ashwin-sathian.md, examples/1–4, reference/claude-tics.md, research.md, research/*.md, README.md, scripts/measure.py).
- Fetched today: Mailchimp voice and tone; GOV.UK "clear language" and the A to Z style guide; Microsoft "Top 10 tips" and "Bias-free communication" (pages updated 2026-10-15); NN/g "Error-message guidelines" (2023-05-14) and "The AI sparkles icon problem" (Kaplan, 2024-09-20); Atlassian voice and tone and error messages; Cloudscape gen-AI output label and gen-AI loading states; VTEX's adaptation of Podmajersky's voice chart.
- From search snippets only, because the pages redirected or render client-side: Shopify Polaris (now at shopify.dev), Material 3 (read through the Chrome DevTools UX writing guide, which cites it), SAP Fiori AI notice, PatternFly and Red Hat AI iconography, PAIR Guidebook. These are tagged *(snippet)*.
- Not reachable: the text of Podmajersky's *Strategic Writing for UX* and of Yifrah's *Microcopy: The Complete Guide*. Claims about their contents are tagged **(unverified, from memory)**.

Tag legend: **[MUST]** means Apple says always/never/must, App Review enforces it, it is an accessibility failure, or it is the humanizing-writing anti-fabrication rule, which never yields. **[SHOULD]** is a source recommendation. **[CONSIDER]** depends on context or the product profile. Source tags: [Apple] [HW] = humanizing-writing [GOV.UK] [MS] = Microsoft [NNg] [Atl] = Atlassian [MC] = Mailchimp [Polaris] [M3] [Cloudscape] [Podmajersky] [Yifrah] [PAIR].

---

## Rules for UI copy

### 0. Rules that apply to every message type

- [MUST] **Never invent anything to sound specific.** No made-up causes, counts, durations, user numbers, testimonials, ratings or "trusted by" figures. If the cause of an error is unknown, say something went wrong and give a next step; don't make one up [HW, Atl]. Sample content in mocks and screenshots is plausible domain content, never lorem ipsum, and is never shipped as fact [Apple WWDC26 227, HW].
- [SHOULD] **Specific and checkable.** Name the object, the count, the file, the person, the amount, the time ("Delivery delayed 10 minutes") rather than a category ("There's an issue with your order") [HW, Apple WWDC25, NNg "concisely and precisely describe the issue"].
- [SHOULD] **Plain verb, common word.** "Use", not "utilize"; "buy", not "purchase"; "help", not "assist" or "facilitate" [HW, GOV.UK, Apple]. A precise domain term stays, and is defined on first use [HW, GOV.UK, Apple Inclusion].
- [SHOULD] **Say it once.** Remove filler adverbs and adjectives ("simply", "quickly"), interjections ("Uh oh"), pleasantries ("We're sorry") and minimizers ("10 short minutes!"). Keep a descriptor only when it carries meaning ("automatically") [Apple WWDC25, HW]. The body doesn't repeat the title [Atl, Apple WWDC25 "no repetition"].
- [SHOULD] **Lead with what matters.** Most important information first on each screen and in each string. Front-load keywords for scanning [Apple, MS]. "Lead with the why": "To get reservation updates, enter your phone number" [Apple WWDC25].
- [SHOULD] **Replace a figure of speech with the fact** ("Syncing paused: no connection", not "Your sync hit a speed bump") [HW]. No idioms, which also translate badly [Apple Inclusion, Apple WWDC22].
- [SHOULD] **No significance inflation** ("transform", "revolutionize", "the future of"), and no trailing "-ing" clause that adds unearned meaning ("Saved, ensuring your work is always safe") [HW].
- [SHOULD] **One word per concept.** Keep a word list (use / avoid / definition), and the same button name for the same action everywhere [Apple WWDC25, Apple Writing, Podmajersky voice chart "Vocabulary" row]. Repeat a term rather than cycling synonyms [Apple WWDC24 "repeat 'data' if that's clearer", HW].
- [SHOULD] **"You", not "the user."** [Apple Inclusion, MS]. **Avoid "we"** in product copy, especially in errors: "Unable to load content", not "We're having trouble loading this content" [Apple Writing Dec 2025, Apple Style Guide]. Web and other non-Apple targets may differ (§3, C1).
- [SHOULD] **Possessives sparingly.** "Favorites", not "Your Favorites". Never mix "my" and "your" [Apple]. Polaris agrees: "View shipping settings", not "View your settings" *(snippet)*.
- [SHOULD] **Tone follows the person's state; voice stays constant.** Plain and direct for errors and money. Celebrate only real achievements [Apple, MC, Atl]. Never trade usefulness for voice [Apple WWDC24]. "It's always more important to be clear than entertaining" [MC].
- [SHOULD] **Humor rarely**, and never forced; "forced humor can be worse than none at all" [MC]. Humor wears thin on repeat views [Apple Inclusion]. "Once may amuse, but a dozen times may annoy" [Atl].
- [SHOULD] **Bias-free.** No generic he/she (rewrite to "you" or a plural), no ableist or violent terms, no master/slave or whitelist/blacklist [Apple Style Guide, MS]. Don't assume shared experiences such as family structure, college or a first car [Apple Inclusion, MS].
- [SHOULD] **Device-neutral verbs.** "Tap" on iPhone and iPad, "click" for a pointer, and "choose" or "select" when the input is unknown. Never "click" in a touch build [Apple, GOV.UK, Cloudscape].
- [SHOULD] **Avoid "please"** in instructions [Apple Style Guide, GOV.UK, Atl, Cloudscape]. **No e.g., etc., i.e.** in UI strings; GOV.UK notes screen readers may read "eg" as "egg" [Apple Style Guide, GOV.UK, Cloudscape].
- [SHOULD] **Contractions:** use them on Apple targets ("part of Apple's informal voice") [Apple Style Guide, MS, Polaris *(snippet)*]. GOV.UK avoids negative contractions (§3, C2).
- [SHOULD] **Sentence length:** split sentences over 25 words [GOV.UK]. Let length follow the content, and don't write fragments for drama [HW].
- [SHOULD] **Spelling:** one variety per product, set in the profile. Flag mixing ("color" and "colour" in one build) [user decision].
- [SHOULD] **Read it aloud** [Apple, MS].
- [SHOULD] **Write for localization:** leave room for longer translations, avoid string concatenation, and use plural rules [Apple WWDC22, Apple Inclusion web translation].

### 1. Labels and buttons

- [SHOULD] Buttons and links are verbs that name the result: "Send", not "Let's do it!" [Apple]. Use verb+noun ("Activate Apple Pay"), except for common actions (Save, Close, Cancel, OK) [Polaris *(snippet)*]. Name the outcome ("Send invoice"), not the mechanism ("Submit") [Yifrah, per a secondary summary; **(unverified, from memory)** for the book itself].
- [MUST] Dialog buttons say the specific action; never Yes/No. The choice must be readable from the button labels alone ("Cancel Subscription" / "Keep Subscription") [Apple WWDC22]. Cancel buttons are titled "Cancel", and Cancel is never the default [Apple alerts].
- [SHOULD] Alert buttons are 1–2 words [Apple]. Error CTAs are 1–2 words with imperative verbs, not "OK" [Atl].
- [SHOULD] Never "Click here". Link text says where it goes, because screen readers list links out of context [Apple, Polaris *(snippet)*, GOV.UK "front-load your link text… active and specific"]. Bare "Learn more" repeated on one screen fails for the same reason [Apple, WCAG 2.4.4 via 03 digest].
- [SHOULD] Multi-step flows: "Get Started", then *either* "Continue" *or* "Next" throughout, then "Done" [Apple].
- [SHOULD] Ellipsis (… U+2026) only when the action needs more input or opens another view [Apple].
- [SHOULD] No articles in menu items. Add a verb to an ambiguous toggle ("Turn HDR On"). Segment labels are nouns [Apple]. Drop articles in labels generally [Polaris *(snippet)*].
- [SHOULD] Style Guide verbs: "turn on", not "enable", for something that starts now; switches are turned on or off, not "toggled"; checkboxes are selected or deselected; "dimmed", not "grayed" [Apple Style Guide].
- [SHOULD] Every field has a persistent visible label. Hint text shows the format ("name@example.com") [Apple, WCAG 3.3.2 via 03 digest].

### 2. Titles and headings

- [SHOULD] Every screen has one purpose, and headers and buttons must stand alone, because people don't read in order [Apple WWDC22].
- [SHOULD] Headlines carry no filler: "Test Your Hearing", not "Take a quick and simple hearing test" [Apple WWDC25].
- [SHOULD] Toolbar and window titles under 15 characters [Apple toolbars].
- [SHOULD] No ending period on titles, headings or UI titles [MS, Apple "no ending punctuation on fragments"].
- [SHOULD] Capitalization is consistent per element type. Apple component defaults apply on native targets (title-style for menus, push buttons, segments and notification titles) [Apple]. Sentence case is the default elsewhere [MS, GOV.UK, M3 *(snippet)*, Cloudscape]. See §3, C3.
- [SHOULD] Feature names: Belongs, Sets expectations, Works everywhere. Name for what it does for the person, not the technology ("Enhance Dialogue", not "Vocal Isolation"). In money and trust contexts clarity beats brand ("Balance", not "Spending Power"). Watch for names that pass judgment at edge values [Apple WWDC26 290].

### 3. Errors

- [SHOULD] Prevent the error first. If wording can't fix a common error, redesign the interaction [Apple, NNg "safeguard against likely mistakes"].
- [SHOULD] Put the message next to the problem [Apple, NNg]. Use redundant, accessible indicators, never color alone [NNg]. Don't show errors before the person has had a fair chance to act [NNg]. Apple adds: validate inline as soon as a value is entered.
- [SHOULD] Say what happened and how to fix it, without blame: "Choose a password with at least 8 characters", not "That password is too short". Never "Invalid name" [Apple]. Use a positive tone, put responsibility on the system, and skip humor [NNg].
- [MUST] No "Oops!", "Uh-oh", "Sorry, bad input" or bare error codes [Apple WWDC22]. Never "Error" or "Error 329347 occurred" as a title [Apple alerts]. Technical codes go behind a link for diagnostics only [NNg, Atl].
- [SHOULD] Alert title: what happened, where and why, two lines max, neutral tone that neither accuses nor downplays [Apple]. Error title 3–4 words, sentence case; body 1–2 sentences [Atl].
- [SHOULD] Put the fix on the primary button ("Add Payment Method") and offer "Not Now" [Apple WWDC22].
- [SHOULD] No "sorry" or "please" unless the consequences are severe and can't be undone [Atl, Apple "can sound insincere"]. For a total outage, NN/g allows an apology plus something memorable (§3, C4).
- [SHOULD] Keep what the person entered [NNg "preserve the user's input"].
- [SHOULD] Use the caution symbol only for unexpected data loss [Apple].
- [SHOULD] Match prominence to impact; modals only for serious problems [NNg].

### 4. Empty states

- [SHOULD] Every empty state gives a next step, with a button or link if possible [Apple]. Say how content will appear ("Save episodes… and they'll show up here") [Apple WWDC22].
- [SHOULD] Never put crucial information only in an empty state; it disappears once there is content [Apple].
- [SHOULD] No idioms ("Nothing strike your fancy?") [Apple WWDC22]. Voice is allowed if it stays useful [Apple].
- [CONSIDER] Write a different empty state for each cause: first use, cleared, no search results, no permission, error [Atl lists board / cleared inbox / no search results; NNg-attributed guidance *(snippet)*].

### 5. Confirmations and destructive actions

- [SHOULD] The title is a question that names the object ("Remove iPhone?") [Apple WWDC22].
- [MUST] Buttons name the action ("Delete Album" / "Cancel"), never Yes/No or OK/Cancel [Apple].
- [SHOULD] Use the destructive style only for destruction the person didn't deliberately choose [Apple alerts]. Destructive buttons are red, and Cancel dismisses without acting [Apple WWDC22].
- [SHOULD] State what is lost and whether it can be undone, using real counts ("Delete 3 photos? This can't be undone") [HW specificity; Apple "what happened, where and why" applied to the decision]. Don't explain the buttons in the body [Apple].
- [SHOULD] No confirmshaming opt-outs ("No thanks, I hate saving money") **(unverified, from memory: term from Brignull's deceptive-patterns work)**. Reject carries the same weight as Accept on consent banners [Apple Privacy web translation].

### 6. Success and feedback

- [SHOULD] Celebrate only real achievements [Apple]. For routine success, state the result ("Saved", "Invoice sent to Dana") [Apple, HW]. "Delight means little flourishes, not humor or being cheeky"; celebrate only after trust is built [Atl].
- [SHOULD] No closing kicker or aphorism after the fact ("You're unstoppable!") [HW "stop when the content stops"].
- [SHOULD] Exclamation points sparingly; they "can look silly when they're frequent" [Apple WWDC22]. Use them occasionally in promotional text and avoid them in documentation [Apple Style Guide].

### 7. Onboarding

- [SHOULD] Skippable, step-by-step teaching [Apple Inclusion]. Teach in context, at the moment it applies, rather than front-loading a tour [Apple WWDC22 "Context"; NNg-attributed *(snippet)*].
- [SHOULD] Each screen says what the product does for the person, concretely. No "Welcome to the future of…", "Your journey starts here" [HW significance inflation; Apple "simple doesn't mean minimal", WWDC26].
- [SHOULD] No permission walls on onboarding slides (see §8).
- [SHOULD] Fixed CTA labels ("Get Started", "Continue", "Done") [Apple].
- [CONSIDER] Use three slides only when there are three things; don't pad to a triad [HW].

### 8. Permissions and purpose strings

- [MUST] Purpose strings clearly describe the data use [App Review 5.1.1]. Write one active, specific sentence ending in a period. ✅ "The app records during the night to detect snoring sounds." ❌ "Microphone access is needed for a better experience." ❌ "Turn on microphone access." [Apple Privacy].
- [SHOULD] Ask at the moment the feature needs it, and explain why [Apple WWDC22]. Web: request only from a user gesture inside the feature [Apple web translation].
- [SHOULD] No pre-prompt with a big "Allow" and a tiny "Not now"; no "to improve your experience" [Apple Privacy slop tells].
- [SHOULD] Point to a setting with a direct link, not a path ("Go to Settings > Privacy > …") [Apple].

### 9. Notifications

- [SHOULD] Body text is full sentences, not self-truncated, without the app name. Drop generic titles. Hidden-preview text is a noun phrase ("Friend request", "Shipment") [Apple].
- [SHOULD] Marketing pushes need opt-in and an in-app opt-out [App Review 4.5.4].
- [SHOULD] Pick the channel by urgency (inline, notification, alert) and match the tone [Apple Writing].
- [SHOULD] Name the specific event and object ("Dana commented on Q3 budget"), not "You have a new update!" [HW specificity].

### 10. AI feature copy

- [SHOULD] Label generated output with text placed near the output. Cloudscape's label text is "Generated by AI"; if every item in a list is generated, label the group header, not each item [Cloudscape]. SAP Fiori uses "Created with AI. Verify before use" with progressive disclosure, and makes the notice mandatory when people act on high-impact results *(snippet)*.
- [SHOULD] Don't use the sparkle icon alone. In NN/g's study (n=107), no participant associated the sparkles icon with "artificial intelligence"; the top readings were "favorite or save" and "visual effects", each 16.82%. When used, the icon "should always be accompanied by a label" [NNg 2024]. Reserve it for generative output only [Cloudscape]. PatternFly and Red Hat require text with the icon *(snippet)*.
- [SHOULD] Name the feature by the task ("Summarize thread", "Draft reply"), not by the technology ("AI Assistant", "✨ Magic") [Apple WWDC26 290]. NN/g expects that "It won't matter that the features are AI-driven; it will matter only that they are present and meet user needs" [NNg 2024].
- [SHOULD] Set expectations about limits, especially when stakes are high [PAIR *(snippet)*]. Plan for wrong output with previews, confirmations and disclaimers [Apple WWDC26 250]. Never write generated content straight into user data without preview and undo [Apple 08 digest].
- [SHOULD] Loading text is "[Generating/Loading] [specific artifact]" with no end punctuation. Use "Generating" for new content and "Loading" or "Fetching" for existing content. Show no loading state under one second [Cloudscape].
- [SHOULD] Call AI replies "responses", not "answers" [Cloudscape]. Don't claim understanding or certainty the system lacks ("I understand exactly what you need") [HW anti-fabrication; PAIR calibration].
- [SHOULD] Responses inside the product don't open with "Certainly!" or "Great question!" and don't close with "I hope this helps!" or "Feel free to reach out" [HW tells #8, #9].
- [CONSIDER] Legal labeling: EU AI Act Article 50 obligations reportedly began 2 August 2026 *(snippet; verify against the official text)*.
- [CONSIDER] Drop the AI marker once the person has edited the content (Iterable's pattern) *(snippet)*.

### 11. Settings descriptions

- [SHOULD] Practical labels. The description explains the *on* state only; people infer off. ❌ "When enabled, X happens. When disabled, X does not happen." [Apple]
- [SHOULD] Start with a verb and drop "you can" [MS "Revise weak writing", Polaris *(snippet)*].
- [SHOULD] Say the concrete effect, including any cost ("Uses more battery") [HW specificity].

### 12. Tooltips and help tags

- [SHOULD] 60–75 characters max, start with a verb, don't repeat the control name, sentence case. Full-sentence tooltips skip the period unless house style says otherwise [Apple offering-help]. On Apple platforms the term is "help tag" [Apple Style Guide].
- [SHOULD] Widget descriptions start with a verb; never "This widget shows…" [Apple widgets].

### 13. Loading and progress copy

- [SHOULD] Name what is loading ("Loading invoices"), using the Cloudscape template above. Say what is happening and, if known, how long. Don't invent a duration [HW].
- [SHOULD] No rotating joke messages or false-progress theater ("Reticulating splines…", "Brewing your coffee…") [Atl delight cautions; Apple "delight isn't adding confetti", WWDC26].
- [SHOULD] Skip loading text for sub-second waits [Cloudscape].

---

## AI-microcopy tells catalog

The pattern behind these is the one `humanizing-writing` names: text reads as machine-written when every choice in it would suit any product and any user. In UI copy that shows up two ways. **Robotic** copy (2010s-era template text) and **trending-generic** copy (the 2020s "friendly startup" voice that models learned from it) are equally interchangeable between products. As the humanizing-writing skill says of its own tells table, one instance proves little and several together are the signal. These are review flags, not banned words: "simply" is fine in "Simply Piano" (a name), and "unlock" is right for a door lock.

### A. Trending-generic voice

| Tell | Example | Why it reads as template | Better pattern | Source |
|---|---|---|---|---|
| Interjection openers | "Oops!", "Uh-oh!", "Whoops!", "Yikes!" | Fits any failure in any app; sounds insincere; delays the cause | State cause + fix: "Can't upload. File is over 25 MB." | Apple WWDC22, WWDC25; 03 digest |
| Hype verbs | "Unlock the power of…", "Supercharge", "Unleash", "Level up", "Elevate", "Transform your workflow", "Empower" | Significance inflation; no checkable outcome | Name the outcome: "Export to PDF" | HW tells; GOV.UK words to avoid (empower, transform, leverage); 08 digest |
| Effortless adverbs | "Simply…", "Easily…", "Seamlessly", "Effortlessly", "in just a few clicks" | Filler; often false for the person who is stuck | Delete the adverb | Apple WWDC25 filler list |
| Minimizers | "Just 2 quick steps!", "10 short minutes!" | Minimizes the person's effort | "2 steps", "About 10 minutes" (only if measured) | Apple WWDC25 |
| Cheerleader CTAs | "Let's go! 🚀", "Let's do it!", "Let's get you set up!", "Yay!" | Cute instead of a verb; interchangeable | "Get Started", "Create Account", "Send" | Apple Writing |
| Decorative emoji | 🚀 ✨ 🎉 👋 🙌 on buttons, headers, errors | Emoji as structure or energy rather than meaning | None, or one in a brand moment the profile allows | HW tell #26; Apple branding (occasional only) |
| False-intimacy "we" | "We're so excited to have you!", "We've got you covered", "We're on it!" | Unclear who "we" is; implied relationship | Product or system as subject, or no subject | Apple Writing, Inclusion |
| Greeting tics | "Hey there 👋", "Welcome back, Alex! 👋" header with nothing else | Takes the top slot that should hold status or action | Show the thing they came for | 03/08 digest slop tells |
| Celebration inflation | "Awesome!", "You're all set! 🎉", confetti on a saved form | Celebrating the routine cheapens the real milestones | "Saved"; celebrate real achievements only | Apple Writing; Atl |
| Faux-whimsy empty states | "Nothing to see here!", "It's quiet in here…", "Crickets 🦗", "Nothing strike your fancy?" | Joke wears thin by the tenth view; no next step | How content appears + CTA | Apple WWDC22; Atl |
| Joke loading carousels | "Reticulating splines…", "Hang tight!", "Sit tight, magic is happening ✨" | Theater instead of status | "Loading invoices" | Cloudscape; Atl |
| AI-magic framing | "✨ Magic", "Ask AI", "AI-powered", "Let AI do the heavy lifting", "Your AI copilot" | Names the technology, not the task; the sparkle isn't read as AI | "Summarize thread" + text label "Generated by AI" near output | NNg 2024; Cloudscape; Apple WWDC26 290 |
| Sparkle-only button | ✨ icon with no label | 0 of 107 NN/g participants read it as AI | Icon + text label | NNg 2024 |
| Brand-pun feature names | "SmartSync Pro™", "InsightIQ" | Jargon or puns; doesn't set expectations | Name by what it does | Apple WWDC26 290; 08 digest |
| Rhetorical Q + answer | "Ready to level up? Let's go!", "Need help? We're here for you." | Q&A theater; HW "staged run-up" | State the offer: "Get help from support" | HW tells #12; Forbes via HW editorial |
| Negated-contrast tagline | "Not just a to-do app. Your second brain." | Straw contrast; HW's strongest-evidence tell | Say what it does | HW (Atlantic, Economist via 2026-update) |
| Fragment triads | "Fast. Simple. Secure." | Rule-of-three for rhythm; no specific claim | One concrete claim the product can back | HW; Forbes via HW editorial |
| Significance openers | "Welcome to the future of invoicing", "Your journey starts here" | Fits any product | First line says what the screen does | HW tells #13, #15 |
| Chat-assistant residue | "Certainly! Here's…", "Great question!", "I hope this helps!", "Feel free to reach out!", "Happy editing!" | Assistant register leaking into product text | Content only | HW tells #8, #9 |
| Faux apology | "We're sorry, something went wrong. Please try again later." | Apology + "we" + please, and still no cause or fix | Cause + fix, or "Couldn't load. Try again." with a Retry button | Apple; Atl |
| Confirmshaming | "No thanks, I don't like saving money" | Guilt as a button label | "No Thanks" / "Not Now" | **(unverified, from memory)** |
| Fabricated social proof | "Join 10,000+ happy teams" with no real figure; invented testimonials | Breaks the one rule that never yields | Real figure with source, or cut | HW anti-fabrication [MUST] |
| Exclamation stacking | Exclamation points on success, empty, onboarding and error strings alike | Flat enthusiasm everywhere | Reserve for rare promotional moments | Apple WWDC22, Style Guide |
| Playful-for-everything tone | Same jokey register on payment failure and on a streak | Tone doesn't follow the person's state | Tone map per message type (§4) | Apple (tone by situation); MC; Atl trait table |

### B. Robotic / template voice

| Tell | Example | Better pattern | Source |
|---|---|---|---|
| Content-free error | "Error", "An error occurred", "Error 329347 occurred", "Something went wrong. Please try again." | What happened, where, why, and the fix | Apple alerts; NNg |
| Robotic validation | "Invalid input", "Invalid email" | "Enter an email like name@example.com" | Apple Writing; MS ("Invalid ID" example) |
| Mechanism buttons | "Submit", "OK" on a consequential dialog, Yes/No | Verb + object naming the result | Apple; Polaris *(snippet)* |
| Context-free links | "Click here", repeated bare "Learn more" | Descriptive link text | Apple; Polaris *(snippet)*; GOV.UK |
| Self-describing UI | "This widget shows…", "This feature allows you to…", "You can…" | Start with the verb | Apple widgets; MS; Polaris *(snippet)* |
| Mirror settings text | "When enabled, X. When disabled, not X." | Describe the on state | Apple |
| Noun stacks | "Notification Preference Management", "Initiate the configuration process" | Verbs: "Choose notifications", "Set up" | HW nominalizations; GOV.UK ("-ion and -ment" make sentences longer) |
| Bureaucratic verbs | "utilize", "facilitate", "leverage", "initiate", "deliver" | use, help, start, send | GOV.UK words to avoid; HW |
| "The user" | "The user must verify their email" | "Verify your email" | Apple Inclusion; MS |
| Hedge fillers | "Please note that…", "It's important to note…" | Delete; state it | Apple Style Guide; GOV.UK; HW |
| Trailing "-ing" significance | "Backup complete, ensuring your data stays safe." | "Backup complete." | HW (Reinhart et al. via 2026-update) |
| Title/body echo | "Delete file?" / "Are you sure you want to delete this file?" | Body adds consequence, or nothing | Atl; Apple WWDC25 |
| Unfilled placeholders | "Hi {firstName}!", "Hi , welcome", "[object Object]" | Fallback copy with no name | HW editorial (Wikipedia meta tell) |
| Vague purpose strings | "for a better experience", "to improve your experience" | One sentence naming the data use | Apple Privacy |
| Path instructions | "Go to Settings > Account > Privacy" | Deep link | Apple |
| Inconsistent synonyms | "Delete" here, "Remove" there; "Next" then "Continue" | One glossary term | Apple Writing; Podmajersky vocabulary row |

Dating note: like `reference/claude-tics.md`, this catalog will go stale. Date it, keep it in its own file, and recheck it when new model releases or design-system updates change the patterns [HW design note; 03 digest open question 8].

---

## Conflicts between sources

| # | Conflict | Sources | Resolution |
|---|---|---|---|
| C1 | **"We" in errors.** Apple: avoid "we" altogether, e.g. "Unable to load content". Atlassian: "Use *we* instead of *you*", because stressing the person's link to the problem "could make them feel like they're being held responsible". Microsoft encourages "we're" and "let's" and writes "Contact us". | Apple Writing (Dec 2025), Style Guide; Atl; MS | Native Apple: Apple wins; no "we", and the subject is the system or omitted ("Couldn't save"). Web and other targets: the product profile sets `we_policy`, defaulting to Apple. Every source agrees on the underlying rule: never blame "you" ("You entered an invalid…"). |
| C2 | **Contractions.** Apple, Microsoft and Polaris use them. GOV.UK: "Avoid negative contractions like can't and don't." | Apple Style Guide; MS; Polaris *(snippet)*; GOV.UK | Native Apple: contractions. Elsewhere the profile sets `contractions: all / positive-only / none`. Suggest `positive-only` for products whose readers are mainly non-native English speakers or have low literacy, the audience GOV.UK writes for. |
| C3 | **Capitalization.** Apple: consistency per element type, with title-style defaults for menus, push buttons and segments. Microsoft ("When in doubt, don't capitalize"), GOV.UK ("Always use sentence case"), M3 and Cloudscape: sentence case. HW lists Title Case headers as an AI tell. | Apple; MS; GOV.UK; M3 *(snippet)*; Cloudscape; HW #21 | Native Apple: Apple component rules; flag inconsistency, not the case chosen. Web: the profile chooses; default sentence case. The HW title-case tell applies to prose headings in help or marketing content, not to Apple-mandated button and menu casing. |
| C4 | **Humor and apology in failure.** NN/g: skip humor in error messages, but "mitigate total failure with novelty", pairing an apology with something memorable. Apple: no "Oops", and "sorry" can sound insincere. Atlassian: no "sorry" unless the consequences are severe. Mailchimp: dry humor in the voice, but clarity first. | NNg; Apple; Atl; MC | Field-level and blocking errors: no humor, no apology. A product-caused outage, data loss or wrong charge gets one plain apology. A novelty element on a full-outage page is allowed only if the profile's humor policy allows it, and never in money, health or safety flows. |
| C5 | **"Please" and "thank you".** Apple, GOV.UK, Atlassian and Cloudscape avoid them. VTEX's own voice chart says "We say 'please' and 'thank you'." | Apple; GOV.UK; Atl; Cloudscape; VTEX | Default off; a profile may opt in with a stated rule (for example, only when asking for effort, such as a survey). Never in errors. |
| C6 | **Questions.** Apple uses question alert titles ("Remove iPhone?"). Microsoft's example rewrites a sentence as "Ready to buy? Contact us." HW lists the self-answered rhetorical question as a tell. | Apple WWDC22; MS; HW #12 | A question the person answers with a button is fine. A question the product answers itself is a tell ("Ready to buy? Contact us." gets flagged on Apple targets). |
| C7 | **Brevity vs completeness.** Microsoft: "Shorter is always better." Apple: cut every word that isn't needed, but notification bodies are full sentences. Podmajersky (via VTEX) warns that too few words can stall people nearly as badly as too many. VTEX's chart prefers complete sentences. | MS; Apple; Podmajersky via VTEX | Shortest wording that still names the object and outcome. A label that drops the object ("Delete" on a screen with three deletable kinds of thing) fails even though it is shorter. |
| C8 | **Reading level.** GOV.UK writing guidance is widely cited as targeting a reading age of 9 (confirmed via council style guides, not on the fetched GOV.UK page, which cites "1 in 6 adults in England have very poor literacy skills"). Polaris: about 7th grade *(snippet)*. HW: no invented thresholds. | GOV.UK (secondary); Polaris *(snippet)*; HW | Report the grade as a number, with no pass/fail unless the profile sets `reading_target`. Grade formulas mean little on strings under about 10 words, so compute only on sentence-length strings. |
| C9 | **Repetition.** HW: say each thing once. Apple: headers and buttons must stand alone because people don't read in order; repeat a term rather than switch synonyms. Atlassian: body doesn't repeat the title. | HW; Apple; Atl | Title and button may share the key verb or noun ("Remove iPhone?" / "Remove"); that's standalone clarity, not repetition. The body must add something (consequence, fix) or be omitted. |
| C10 | **Emoji and exclamation points.** Apple branding allows occasional exclamation points and emoji in brand voice. Cloudscape: no exclamation points. HW: emoji as structure is a tell. | Apple branding; Cloudscape; HW | Never in errors, permissions, destructive confirmations, money or AI labels. In celebration and marketing moments, follow the profile. |
| C11 | **Whether to mark AI at all.** Cloudscape and SAP mark generated output. NN/g expects the "AI" callout to matter less over time. EU AI Act Art. 50 *(snippet)* may require marking some content. Apple: disclaimers and previews for risky output. | Cloudscape; SAP *(snippet)*; NNg; Apple WWDC26 250 | Separate two things. (a) Generated *content* that people will act on or share gets a text label near the output. (b) The *feature name* describes the task, not "AI". Legal labeling is flagged for the team; the skill gives no legal advice. |
| C12 | **Rule of three.** HW flags triads as padding. Onboarding conventions often use three slides or three benefits. | HW; common practice | Three is fine when there are three distinct things. Flag triads whose items restate one idea ("Fast. Simple. Easy."). |
| C13 | **Passive voice.** GOV.UK and Mailchimp prefer active voice. Apple's own example "Unable to load content" has no agent. | GOV.UK; MC; Apple | Agentless system messages are acceptable; GOV.UK itself allows the passive when it keeps the writing user-centred. Flag the passive when it hides who must act ("Verification is required" → "Verify your email"). |

---

## Product voice method

The skill should treat voice as a per-product artifact in the project profile and check copy against it. Three sources give it working tools:

1. **Podmajersky's voice chart.** Columns are 3–4 product principles; rows are **Concepts** (ideas to emphasize at any open opportunity), **Vocabulary** (words that support or undermine a principle), **Verbosity**, **Grammar**, **Punctuation** and **Capitalization** (row names verified via VTEX's adaptation, which credits the 2019 edition). The 2025 second edition adds coverage of AI-generated UX content, per O'Reilly's description; its contents weren't read. The book also has a "conversation for content-first design" method and a chapter on UX text patterns (chapter titles from a retailer TOC). The pattern list commonly attributed to her (titles, buttons, instructions, input fields, transitional text, confirmations, notifications, errors) is **(unverified, from memory)**.
2. **Mailchimp's voice/tone split and "X but not Y" pairs.** "Weird but not inappropriate, smart but not snobbish." Each pair makes two checks: the trait should show up, and the "not" side is a failure mode the reviewer looks for.
3. **Atlassian's trait × emotional-state table.** For each trait, when to use more (the person feels confident, curious) and when to use less (confused, blocked, afraid). This is the tone map.

Apple's sessions supply the rest: voice constant, tone by situation, a ranking of qualities per moment (clarity over simplicity; friendliness turned down when someone is blocked), a word list (use / avoid / definition) and the naming criteria (Belongs, Sets expectations, Works everywhere).

### Profile schema (proposed)

```yaml
voice:
  principles:            # 3–4, Podmajersky columns + Mailchimp pairs
    - name: Direct
      means: "Says the result first; one idea per string"
      not: "curt or cold"            # failure mode the reviewer looks for
    - name: Warm
      means: "Acknowledges effort in long tasks"
      not: "cutesy, interjections, emoji"
  concepts: ["your data stays on device"]   # ideas to surface when relevant
  vocabulary:
    use:    {alias: "the name people see", Delete: "removes permanently"}
    avoid:  [handle, username, Remove]      # with the preferred term
    define: {Workspace: "a shared set of projects"}
  verbosity: "shortest wording that names object + outcome"
  grammar:
    person: you
    we_policy: never          # never | company-only | errors-only  (Apple default: never)
    contractions: all         # all | positive-only | none
    possessives: sparing      # never mix my/your
  punctuation:
    exclamation: promo-only   # never | success-only | promo-only
    emoji: never              # never | brand-moments
    serial_comma: true
  capitalization:             # per element type; native targets inherit Apple defaults
    button: title             # Apple push buttons; web default sentence
    alert_title: title
    tooltip: sentence
  spelling: en-US             # en-US | en-GB; skill flags mixing
  humor: none                 # none | success-only | brand-moments
  reading_target: null        # e.g. grade 7; null = report only
  tone_map:                   # message type × user state → dial
    error_blocking: {warmth: low, humor: none, apology: if-product-fault-and-harm}
    success_routine: {celebration: none}
    milestone: {celebration: allowed}
  ai_label: "Generated by AI"
  personal_voice_opt_in: false   # user's own voice traits (§5) off unless true
```

### How the skill checks copy against it

1. **No profile yet:** extract strings, infer a draft chart from the existing copy (dominant casing per element, contractions, pronoun use, spelling variety, recurring terms), show it to the user to confirm, and flag inconsistencies found while inferring. Don't invent principles the copy doesn't support; ask.
2. **Deterministic pass** (§7) against the profile's settings: vocabulary avoid-list, casing per element, we/contractions/spelling/exclamation/emoji policy.
3. **Judgment pass** per message type: does each string meet the tone map for its type? Does any string fall on the "not" side of a principle pair? Is the voice interchangeable with a competitor's (swap the product name; if nothing breaks, it's generic)?
4. **Usefulness over voice:** any finding where voice costs clarity is filed as a clarity failure, not a style note [Apple WWDC24].
5. **Rewrites** follow HW's editing rules: change what's flagged, add no facts. If a fix needs a fact the strings don't contain (the real cause, the real limit), the skill asks for it or leaves a marked placeholder; it never guesses [HW, Atl "don't make one up"].

---

## What transfers from the user's voice profile

User decision on record: the humanizing-writing *rules* (SKILL.md) apply to all UI copy. The *voice profile* (`voices/ashwin-sathian.md`) describes the user's essay and tutorial voice, and its traits apply only if a product sets `personal_voice_opt_in: true`. The profile says of itself that it should be used "only when drafting text that will go out under Ashwin Sathian's name".

**Transfers by default (these are SKILL.md rules the profile also reflects):**
- Anti-fabrication. The profile's "What not to copy" repeats it: no invented incident, opinion or memory. → No invented causes, counts or social proof.
- Named particulars. The profile anchors writing "in named particulars". → Name the file, the person, the amount.
- "He hedges facts, not tastes." → Don't hedge what the product knows ("This may take a moment" when the duration is known); hedge model output once, where the doubt is real.
- "His endings are plainer: the question he actually has, or a flat statement", not an aphorism or clever reversal. → No kicker lines on success or onboarding screens.
- Tutorial shape: "The first two sentences say what the post covers." → Front-loading: the first line of an onboarding or help screen says what it does.
- Plain verbs, no significance inflation, structure follows content. These come from SKILL.md rather than the profile, and apply everywhere.

**Opt-in only (a product chooses `personal_voice_opt_in`):**
- Contractions at his rates (about 31 per 1,000 words in essays, 15 in tutorials). Apple's contraction rule covers native targets anyway.
- "We" for walking through steps and "you" for the reader (tutorial habit). Conflicts with Apple's no-"we" rule; Apple wins on native targets even when opted in.
- Tutorial moves for long-form in-app help: a small scenario to set up a step, the reader's likely objection raised as a question and answered at once, an everyday analogy followed to its consequence, a preference labelled as a preference.
- Spoken-register looseness ("do not polish the looseness out").

**Does not transfer to product UI even with opt-in (flag if seen):**
- Personal motifs (chance and small causes, the road not taken, weather and water imagery).
- Self-undercutting asides and jokes about his age, his spelling or a film's quality.
- Archaic or legal words mixed with slang. Fails Apple's plain-language and localization rules.
- Untranslated Malayalam, Hindi and Tamil words. Fails localization.
- Dashes at about 6 per 1,000 words, ellipses and trailing-ellipsis endings. UI strings are too short for rates to mean anything, and a trailing ellipsis in UI signals "more input needed" on Apple platforms.
- Openings that reach the subject in the second paragraph. Contradicts front-loading.
- Cheerful sign-offs and reader-teasing ("a reveal is coming").
- Capitals for stress. Fails screen readers and localization.

Already decided: British spelling is not inherited from the profile. Spelling is set per product.

## Questions for the user

1. **Web precedence.** Apple wins on native targets. For web-only products, should Apple still be the default where the profile is silent (no "we", title-case buttons), or should the web default to the sentence-case majority (Microsoft, GOV.UK, M3, Cloudscape)? Proposed: Apple for content rules, sentence case for casing.
2. **Long-form help inside apps.** Help articles and tutorials in a product are prose, not microcopy. Should the full SKILL.md prose rules govern them, with the tutorial moves listed above allowed when opted in? Or is help content out of scope?
3. **Default humor policy** when a profile doesn't set one: `none`, or `success-only`?
4. **Reading level.** Report-only by default, or a default target (Polaris's about 7th grade, or the reading age of 9 cited for GOV.UK)?
5. **Rewrite vs flag.** Should the copy pass propose replacement strings, or only flag? Rewrites of errors often need the real cause, which the strings don't contain.
6. **How the skill uses humanizing-writing.** Load SKILL.md at review time as a dependency (it stays in sync), or copy the rules into loupe (stable, but drifts)?
7. **Tells-catalog maintenance.** Keep §2 as a dated, separately versioned file with a recheck cadence, like `claude-tics.md`?
8. **Confirmshaming and fabricated social proof.** These overlap with dark-pattern and legal review. Report them as [MUST] (fabrication) or route them to a separate "trust and ethics" section?

---

## Measurable checks

Strings can be extracted from `.xcstrings` / `Localizable.strings` / `.stringsdict`, SwiftUI `Text("…")` / `Button("…")` literals, `NSLocalizedString`, `Info.plist` purpose strings (`NS*UsageDescription`), web i18n JSON or YAML, and JSX text nodes. Element type comes from the call site (Button, alert title, menu item, `title=` tooltip, `aria-label`, placeholder). Without the element type, casing and length rules can't be applied, so extraction should record it.

### Deterministic lint (high confidence, low noise)

| Check | Rule | Source |
|---|---|---|
| Alert/dialog buttons Yes/No, or OK on a destructive dialog | flag | Apple [MUST] |
| Cancel label not "Cancel", or Cancel set as default | flag | Apple alerts [MUST] |
| Error title equals "Error" or matches `Error \d+` / "An error occurred" / "Something went wrong" with no other sentence | flag | Apple; NNg |
| "Invalid" + noun as the whole message | flag | Apple |
| Interjections: oops, uh-oh, uh oh, whoops, yikes, yay (any case, any punctuation) | flag (error strings: severity up) | Apple WWDC22/25 |
| "please", "sorry", "please note" in error/instruction strings | flag; allow if profile opts in | Apple; GOV.UK; Atl |
| "we/we're/we've/our/us" in errors (and anywhere if `we_policy: never`) | flag | Apple |
| "the user"/"users" in user-facing strings | flag | Apple; MS |
| "click" (and "hover") in iOS/iPadOS targets; "tap" in macOS | flag | Apple |
| "click here", or the same bare "Learn more" twice on one screen | flag | Apple; Polaris; WCAG 2.4.4 |
| Filler adverbs: simply, easily, quickly, just, seamlessly, effortlessly, instantly | flag as candidate | Apple WWDC25 |
| Hype lexicon: unlock the power, supercharge, unleash, level up, elevate, empower, transform, revolutionize, game-changing, next-level | flag as candidate | HW; GOV.UK; 08 digest |
| GOV.UK words-to-avoid list (agenda, deliver, deploy, empower, facilitate, foster, impact, initiate, key, leverage, robust, streamline, tackle, transform, utilise…) | flag as candidate, scoped: "deploy" and "robust" are correct in dev tools | GOV.UK |
| Style Guide verb misuse: "enable" for turn on, "toggle" in user copy, "tap on", "click on", "long press", "grayed out", "checked/unchecked" | flag | Apple Style Guide |
| e.g., i.e., etc., and/or, via in UI strings | flag | Apple; GOV.UK; Cloudscape |
| Three dots `...` instead of `…`; ellipsis on a button that neither asks for input nor opens a view (needs element context) | flag | Apple |
| Exclamation marks in error, permission, destructive or money strings; count elsewhere | flag / report | Apple; Cloudscape |
| Emoji in strings, by element type | flag outside profile-allowed moments | HW #26; profile |
| Casing consistency per element type (title vs sentence) | flag mixed; on native, check against Apple component defaults | Apple; MS; GOV.UK |
| Trailing period on fragments, titles, buttons; missing period on purpose strings | flag | Apple; MS |
| Purpose strings: missing, under about 5 words, or containing "better experience" / "improve your experience" / only "Turn on…" | flag (the word-count cutoff is a heuristic, not from Apple) | Apple Privacy; App Review 5.1.1 |
| Length: tooltip over 75 chars; toolbar/window title 15+ chars; alert button over 2 words; app name over 30 chars | flag | Apple |
| Length (web/Atlassian-style): error title over 4 words; error body over 2 sentences | flag as candidate | Atl |
| Sentence over 25 words | flag | GOV.UK |
| Widget/settings descriptions starting "This widget/feature/setting…"; "When enabled… When disabled…" pairs; "You can…" openers | flag | Apple; MS; Polaris |
| Flow label drift: both "Next" and "Continue" in one flow; first step not "Get Started"; last not "Done" (native) | flag | Apple |
| Glossary conflicts: profile `avoid` terms; known synonym pairs both present (Delete/Remove, Sign in/Log in/Login, Settings/Preferences) | flag | Apple word list; Podmajersky vocabulary |
| Possessive mixing: "My X" and "Your Y" in one product | flag | Apple |
| Spelling variety mixing (color/colour, -ize/-ise, cancelled/canceled) against profile | flag | user decision |
| Unfilled placeholders: `{…}`, `%@` with no argument, "undefined", "null", "[object Object]", double spaces where a value was removed | flag | HW editorial |
| String concatenation for plurals or sentences (code-level) | flag | Apple Inclusion; localization |
| Gendered generics (he/she, his or her, he/she), MS/Apple avoid lists (master/slave, whitelist/blacklist, sanity check, crippled, lame, hang, kill, abort) | flag | Apple Style Guide; MS |
| Placeholder used as the only label (code-level: input with placeholder, no label/aria-label) | flag | Apple; WCAG 3.3.2 |
| AI: sparkle icon without adjacent text; generated-output components without a label; loading text not "[Generating/Loading] [noun]" | flag | NNg; Cloudscape |

### Reported, not judged (signals for the reviewer)

- **Reading grade** (Flesch-Kincaid or similar) on strings of 10 or more words, reported per message type. Pass/fail only if the profile sets `reading_target` (C8).
- **Verb-first rate for buttons.** Use a first-word verb list (imperative-verb lexicon plus the profile vocabulary) rather than a POS tagger, so it runs on stdlib. Allow the common-action exceptions (OK, Done, Cancel, Close). Nouns are correct for segment labels and tabs.
- **Pronoun and contraction counts** per 100 strings, against the profile.
- **Distinct-term count per concept** (the synonym spread).
- **Tells density:** count of §2 lexicon hits per screen. Following HW, one hit proves little and a cluster is the signal.

### What `scripts/measure.py` measures and whether it applies

`measure.py` (stdlib only, English, no verdicts) reports per passage: word, sentence and paragraph counts; sentence-length mean and stdev; share of sentences ≤5 and ≥30 words; paragraph-final sentences ≤8 words; mean word length and share of words ≥10 characters; "and", commas, semicolons, colons, parentheses and dashes per 1,000 words; and regex rates per 1,000 words for negated contrast, trailing "-ing" clauses, short colon clauses, stock transitions (Moreover/Furthermore/Additionally/In conclusion/Overall/Ultimately) and nominalizations (-tion/-sion/-ment/-ness/-ity/-ance/-ence).

Fit for UI strings:
- **Doesn't fit single strings.** Rates per 1,000 words and sentence-length distributions are meaningless on a 2-word button. Its sentence splitter needs a capital after the full stop, and most labels have no terminal punctuation. Its own docstring says to compare passages written for the same prompt, which per-string UI review doesn't have.
- **Fits a concatenated corpus of the longer strings** (onboarding body, empty-state body, settings descriptions, notification bodies, AI responses, help text), joined one string per paragraph. On that corpus `negated_contrast`, `ing_tail`, `stock_transition`, `nominalization`, `dashes_per_1k` and `word_share_ge10_chars` work as comparative signals, for example between two builds, or between the product's strings and a competitor's.
- **Reuse plan:** import `PATTERNS` and `measure()` from it rather than copying (ladder rung 2), run them over the long-string corpus, and report numbers next to the lint, following the script's own no-thresholds stance. Add a UI-specific lexicon module for §2 instead of extending its prose regexes.

### Needs judgment (not lintable)

Tone fit per message type and user state; whether an error names the real cause; whether an empty state's next step is the right one; whether a feature name sets correct expectations or judges people at edge values; whether a triad is padded; whether voice is interchangeable with another product's (the swap test); whether an AI disclosure is enough for the stakes; inclusion of imagery and examples.

---

## Sources

- Apple: see digests `03-content-foundations.md` and `08-beyond-hig.md` for URLs (HIG writing, alerts, privacy and other pages; WWDC22 10037, WWDC24 10140, WWDC25 404, WWDC26 290/250/227; Apple Style Guide; App Review Guidelines, updated 2026-10-16).
- humanizing-writing: `/Users/ashwinsathian/Documents/Personal/humanize-writing-skill/SKILL.md`, `voices/ashwin-sathian.md`, `reference/claude-tics.md`, `reference/research.md`, `reference/research/{2026-update,editorial,tells-catalog,academic,oss-skills}.md`, `examples/before-after-{1..4}.md`, `scripts/measure.py`.
- Mailchimp Content Style Guide, Voice and tone: https://styleguide.mailchimp.com/voice-and-tone/
- GOV.UK, Use clear language: https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/writing-guidelines/clear-language/
- GOV.UK, A to Z style guide: https://guidance.publishing.service.gov.uk/writing-to-gov-uk-standards/style-guides/a-to-z-style-guide/
- Reading age 9 (secondary): https://stormid.com/blog/content-accessibility-part-1-speak-plainly/ ; https://playbook.somerset.gov.uk/digital-inclusion-and-accessibility/creating-accessible-documents/document-language-and-reading-age
- Microsoft Style Guide, Top 10 tips: https://learn.microsoft.com/en-us/style-guide/top-10-tips-style-voice
- Microsoft Style Guide, Bias-free communication: https://learn.microsoft.com/en-us/style-guide/bias-free-communication
- NN/g, Error-message guidelines (2023-05-14): https://www.nngroup.com/articles/error-message-guidelines/
- NN/g, The AI sparkles icon problem (Kaplan, 2024-09-20): https://nngroup.com/articles/ai-sparkles-icon-problem/
- NN/g, Empty states video (not read): https://www.nngroup.com/videos/empty-states-in-application-design-guidelines/
- Atlassian voice and tone: https://atlassian.design/foundations/content/voice-tone ; error messages: https://atlassian.design/foundations/content/designing-messages/error-messages ; messages overview: https://atlassian.design/foundations/content/designing-messages
- Cloudscape gen-AI output label: https://cloudscape.design/patterns/genai/output-label/ ; loading states: https://cloudscape.design/gen-ai/patterns/generative-ai-loading-states/
- VTEX voice chart (adapts Podmajersky): https://uxwriting.vtex.com/docs/principles/voice-chart/
- Podmajersky, *Strategic Writing for UX*, 2nd ed. (O'Reilly, 2025): https://www.oreilly.com/library/view/strategic-writing-for/9781098174323/
- Polaris *(snippets)*: https://polaris.shopify.com/components/actions/page-actions ; https://polaris-react.shopify.com/content/fundamentals (redirects to shopify.dev)
- M3 via Chrome DevTools UX writing guide *(snippet)*: https://chromium.googlesource.com/devtools/devtools-frontend/+show/main/docs/styleguide/ux/writing.md
- SAP Fiori AI notice *(snippet; 403 on fetch)*: https://www.sap.com/design-system/fiori-design-web/v1-139/foundations/best-practices/global-patterns/ai-notice-base-concept
- PatternFly AI iconography *(snippet)*: https://www.patternfly.org/ai/guidelines/iconography ; Red Hat: https://ux.redhat.com/ai-guidelines/iconography/
- PAIR Guidebook *(snippet)*: https://pair.withgoogle.com/guidebook/patterns/how-do-i-calibrate-user-trust
- EU AI Act Art. 50 (secondary, verify): https://www.dudkowiak.com/blog/ai-act-article-50-ai-content-labeling-and-code-of-practice-from-august-2-2026/
- Yifrah, *Microcopy: The Complete Guide* (book listing only): https://www.goodreads.com/book/show/34847317
