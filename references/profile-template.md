# Profile template: `.loupe.md`

Lives at the reviewed repo root. The skill infers what it can on first run, asks only for the rest, writes the file, and reuses it. Edit freely; later runs obey it. Brand expression follows the profile on display-only surfaces; Apple wins in task flows.

```markdown
---
purpose: ""            # One sentence: what the product is for. Infer from README, package.json description, App Store text, docs. Ask if absent.
feeling: ""            # What a person should feel after using it. Used for Purpose and Delight judgments. Infer from voice or brand docs; else ask.
audience: occasional-public   # occasional-public | daily-professional. Infer from README, docs, pricing, login model; ask if unclear. Drives form, density and save-model conflicts.
areas:                 # Optional per-area audience override. Delete if the whole product shares one audience.
  - { path: "app/admin/**", audience: daily-professional }
  - { path: "app/(marketing)/**", audience: occasional-public }
register: utilitarian  # utilitarian | expressive. Professional tool vs consumer/expressive. Sets motion and emphasis expectations. Infer from product type (editor, dashboard, admin vs consumer, media, game), the audience, and any brand or voice docs; ask if they disagree.
motion_personality: { tone: serious, pace: relaxed }  # tone: serious..playful; pace: relaxed..fast. Apple's axes. Infer from existing motion tokens; else ask.
platforms: []          # ios, ipados, macos, iphone-duo, web, android. Infer from *.xcodeproj / project.pbxproj, Package.swift, app.json, package.json (react, next, expo, @angular/core, vue), framework configs.
deployment_targets:    # Gates Liquid Glass (26+) checks. Omit a platform not targeted. If undetected, ask in the bootstrap batch; if still unknown, (26+) checks are skipped and listed under Unverified.
  ios: ""              # Native: project.pbxproj IPHONEOS_DEPLOYMENT_TARGET, Package.swift platforms (.iOS(...)), Info.plist MinimumOSVersion. Expo: the expo-build-properties plugin (plugins: [["expo-build-properties", {"ios": {"deploymentTarget": "..."}}]]) in app.json or app.config.*. Bare React Native: ios/Podfile `platform :ios, '...'` and ios/*.xcodeproj project.pbxproj.
  macos: ""            # project.pbxproj MACOSX_DEPLOYMENT_TARGET, Package.swift platforms (.macOS(...)), Info.plist LSMinimumSystemVersion
  web: ""              # browserslist in package.json, if set
release_stage: development  # development | beta | release. Infer from git tags, CHANGELOG, App Store metadata, package version; else ask in the bootstrap batch; default development when unknown. App Review 4.2 minimum-functionality and 2.1 app-completeness checks (placeholder content, broken links or features) run only when release_stage is release (or the user says the build is going to App Review); 4.1, 4.2.6 and 4.3 run at any stage.
density: comfortable   # comfortable | dense. Comfortable = iOS scale (17 pt body); dense = macOS scale (13 pt body). Infer from base font size in tokens; ask if unclear.
brand:
  typefaces: []        # Families in use. Infer from tokens, CSS, @font-face, Info.plist UIAppFonts.
  licensed_fonts: []   # Faces the project has licensed. Font suggestions are free/open faces unless listed here.
  accents: []          # Accent colors with role. Infer from tokens, asset catalog AccentColor, CSS variables.
  signature_elements: []  # Up to two recurring authored elements or moments. Empty means the distinctiveness pass proposes candidates.
voice:
  traits: []           # 3 to 5 adjectives with a "but not" edge, e.g. "plain but not curt". Infer from voice docs, existing strings.
  personal_voice_opt_in: false  # The author's personal voice traits apply only if a product opts in.
  spelling: ""         # british | american. Inferred from the product's strings (count -our/-or, -ise/-ize, cancelled/canceled across string files, README, docs); ask only if the counts are a tie. Mixing is flagged.
  casing:              # Per element type (buttons, headings, menus, alerts, labels): sentence | title. Leave empty; the skill infers each from the product's strings. Native Apple targets use the native defaults in references/writing.md; web falls back to sentence case only when the strings show no clear pattern.
    buttons: ""
    headings: ""
    menus: ""
    alerts: ""
    labels: ""
  we_policy: avoid     # avoid | company-only | allowed. Apple avoids "we"; native Apple targets keep avoid whatever this says.
  contractions: per-voice  # per-voice | all | positive-only | none. Native Apple targets allow them; elsewhere this decides.
  humor: unset         # unset | none | light | free. unset = the skill asks during profile bootstrap; until answered, no humor anywhere. Never in errors, destructive confirmations, money or permission requests, whatever this says.
  reading_level_target: null    # e.g. grade 8. Reading level is reported, not enforced, unless set.
category: ""           # Product category in a few words, e.g. "surf forecast", "personal finance", "issue tracker". Infer from purpose and README; ask if unclear. Drives the landscape research.
peers: []              # Products the team measures itself against. Ask in the bootstrap batch; the landscape step adds the category leader and challengers.
landscape:             # Cached landscape research (step 1b). Reused for 180 days while category and peers are unchanged; then refreshed.
  date: ""
  studied: []          # - { name: "", url: "", why: "leader | challenger | peer | adjacent", identity: "accent hue, typeface, layout idiom", core_task_steps: null }
  best_peer_steps: {}  # core task -> { peer: "", steps: N, source: "" } (sourced counts only satisfy the peer-gap bar)
  capabilities: []     # Platform capabilities that fit the product's nouns and verbs
  keep: []             # Conventions users expect
  avoid: []            # Convergence every peer shares
  frontier: []         # What the best do now, with source
  openings: []         # What no peer does that this product could own
direction: ""          # Chosen distinctiveness direction (one line), or empty. If empty, the skill proposes 2 to 3 with theming sketches and saves the pick.
waivers: []            # Rules consciously broken. Skipped in later runs and counted as "waived: N".
# - { rule: "Tap targets 44 px", reason: "Pointer-only desktop tool, 28 px rows", date: 2026-10-23 }
---

Free notes below: context the skill should know, links to brand or voice docs, areas out of scope, past decisions.
```

## How the skill uses each key

- `purpose`, `feeling`: the yardstick for Purpose and Delight findings and for judging whether enhancements and reworks fit. No findings invent a different purpose.
- `audience`, `areas`: resolve source conflicts (one question per page vs grouped form, compact vs comfortable rows, autosave vs explicit save, toast vs inline confirmation). A finding in an area uses that area's audience.
- `register`, `motion_personality`: set motion and emphasis expectations. A serious, relaxed tool is flagged for bouncy springs; a playful one is not flagged for personality, only for broken basics.
- `platforms`: decides which platform-fit rules and which reference files load. Web-only profiles never get native rules.
- `deployment_targets`: Liquid Glass (26+) checks run only where the target is 26 or later; below, they are skipped, not downgraded.
- `release_stage`: App Review 4.2 minimum-functionality and 2.1 app-completeness checks (placeholder content, broken links or features) run only when it is `release` (or the user says the build is going to App Review). Otherwise placeholders are notes under Unverified, not Blockers. 4.1 Copycats, 4.2.6 template apps and 4.3 Spam are not gated.
- `density`: picks the type scale for web and native measurement (iOS 17 pt vs macOS 13 pt body) and row-height expectations.
- `brand`: brand wins on display-only surfaces if accessibility passes; Apple wins in task flows. `licensed_fonts` limits font suggestions; `signature_elements` feed the distinctiveness verdict.
- `voice`: the standard for every copy finding and rewrite. Rewrites are in this voice. `spelling` and `casing` drive consistency flags; `we_policy` and `contractions` drive pronoun and contraction flags; `humor: unset` means no humor until the user answers. `personal_voice_opt_in` stays false unless the product opts in.
- `category`, `peers`, `landscape`: drive the landscape step; landscape claims are evidence for enhancements, reworks and directions, never for Blockers.
- `direction`: the distinctiveness pass judges against it. Empty triggers proposals.
- `waivers`: matching findings are dropped from the table and counted on the "waived: N" line. A waiver never covers anti-fabrication, deceptive design, or an accessibility Blocker.
