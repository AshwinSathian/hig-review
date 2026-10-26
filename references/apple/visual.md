<!-- contents -->
Contents: Layout: visual hierarchy · Layout: adaptability and size classes · Typography: legibility and hierarchy · Typography: Dynamic Type layout behavior · Typography: iOS/iPadOS Dynamic Type table · Typography: macOS table · Typography: tracking values · Color: best practices · Color: Liquid Glass color (26+) · Color: management and wide color · Dark Mode · Materials: Liquid Glass (26+) · Materials: standard materials and vibrancy · Motion · Depth and spatial principles · Images · Cross-cutting principles
<!-- /contents -->


Covers: layout, typography (full type and tracking tables), color, Dark Mode, materials and Liquid Glass, motion, images, and depth/immersion principles that transfer.
Loaded by: visual, interaction and motion
Snapshot: 2026-10-23

Tags: [MUST]/[SHOULD]/[CONSIDER] follow Apple's wording (must, never, always, don't = MUST; avoid, essential, plain imperatives = SHOULD). "Web" lines are our translation, "Slop tells" are ours. `(26+)` marks Liquid Glass checks, gated on a deployment target of iOS/iPadOS/macOS 26 or later. The current layout page has no margin, safe-area or per-device dimension table, so this file never cites such numbers as HIG. visionOS, tvOS and watchOS detail is cut to what transfers to phone, desktop and web.
## Layout: visual hierarchy
**Intent**
People read top to bottom, leading to trailing. Alignment, indentation and grouping say what relates to what before a word is read.
**Checks**
- [SHOULD] Put the most important items near the top and leading edge.
- [SHOULD] Use standard components so the layout mirrors for right-to-left.
- [SHOULD] Align to shared edges. Use indentation only to mean subordination (indented = child of the item above).
- [SHOULD] Group related items with negative space, container shapes, or separators. Pick one grouping device per level; don't stack all three.
- [SHOULD] Use progressive disclosure (disclosure triangles, menus, nested views, scrollable sections) instead of showing every option at once.
- [SHOULD] (26+) Separate controls from the content scrolling beneath them with a scroll edge effect, not a solid or semi-opaque backing color, and let Liquid Glass set them apart from content.
- [SHOULD] (26+) Extend full-screen background content under sidebars, toolbars and tab bars to the window edge.
- [CONSIDER] (26+) If a sidebar or inspector would cover key parts of a full-bleed image, use a background extension effect (mirrored, blurred continuation), not a cropped image or hard edge.
**Platform deltas**
- Same on iOS, iPadOS, macOS. Background extension is `backgroundExtensionEffect()` / `UIBackgroundExtensionView`.
**Web (our translation)**
- Keep the header visually distinct from content; translucency (`backdrop-filter`, optionally a fading scroll-edge mask) is optional and needs a `prefers-reduced-transparency` fallback. Hero imagery can run under the nav. Use logical properties (`margin-inline-start`, `dir="rtl"`) so layout mirrors.
**Slop tells (ours)**
- every section in a bordered card, plus dividers, plus padding (triple grouping); indentation as decoration; everything visible at once; image boxed in a padded card instead of bleeding under chrome.

## Layout: adaptability and size classes
**Intent**
The app stays familiar when rotated, resized, mirrored or moved to another display. Layout follows available space, not device identity.
**Checks**
- [SHOULD] Base layout on size classes (compact/regular, horizontal/vertical), not device type or orientation. Apple: device-based checks "aren't useful for making layout decisions".
- [SHOULD] Design for every size-class combination in both aspect ratios (iPad landscape resized to regular height; compact portrait widened to regular width).
- [MUST] Keep functionality identical across size classes. Only change how much is visible (tab bar to sidebar, overflow menu to exposed items).
- [SHOULD] Keep the idiom when resizing: an iPad app in a narrow window still looks like an iPad app.
- [SHOULD] Handle size classes, screen sizes, orientations and aspect ratios, Dynamic Island, external displays, Display Zoom, resizable windows (iPad and Mac), text-size changes, RTL, locale formats, text length.
- [SHOULD] At large text sizes, stack horizontally adjacent views vertically, grow rows, wrap single-line rows; nothing clips or overlaps. Apple: otherwise the app is "difficult or impossible to use".
- [SHOULD] Test the smallest and largest layouts first, plus localizations and text sizes.
- [SHOULD] Don't change a background artwork's aspect ratio; scale to fill. Expect very wide/short and tall/narrow windows, so art extends past the normal visible area.
- [SHOULD] Even orientation-locked apps (landscape games) must resize well.
- [SHOULD] Respect safe areas: hardware (Dynamic Island, camera housing) and system bars (toolbar, tab bar, status bar). Apple calls this essential.
- [SHOULD] Use system layout guides for standard margins and readable-width text columns.
**Platform deltas**
- iOS/iPadOS: any size-class combination is possible (Slide Over, iPhone Mirroring on Mac, iPad multitasking).
- macOS: [SHOULD] don't put controls or critical info at the bottom of a window (people drag windows partly off-screen) or behind the camera housing at the top edge.
**Web (our translation)**
- Size classes become container queries on the actual container, not UA sniffing or `orientation` media queries. Readable width is `max-width` of about 65-75ch on prose. Safe areas are `env(safe-area-inset-*)` with `viewport-fit=cover`. "Same functionality at every width" means move features into menus on mobile, never drop them. Avoid bottom-pinned critical controls in resizable or popup windows. Peeking carousel items should be equal on both edges (a one-sided peek with a hard edge looks broken), and hover/focus scale needs spacing budgeted so growth doesn't overlap neighbors.
**Slop tells (ours)**
- `if (isMobile)` hiding features; layout that only works at 1440px and 390px; text in fixed-height cards that clip at 200% zoom; hero `object-fit: contain` letterboxing; full-width paragraphs at 1600px; bottom-fixed CTA on desktop windows; carousel peeking only on the right; hover `scale(1.05)` cards that collide with neighbors.

## Typography: legibility and hierarchy
**Intent**
Text is readable at any distance and setting. Hierarchy comes from weight, size and color, and survives the user changing text size.
**Checks**
- [SHOULD] Follow the recommended default and minimum sizes:

| Platform | Default | Minimum |
|---|---|---|
| iOS, iPadOS | 17 pt | 11 pt |
| macOS | 13 pt | 10 pt |
- [SHOULD] Go above the recommended sizes for thin custom fonts.
- [SHOULD] Avoid Ultralight, Thin and Light weights; prefer Regular, Medium, Semibold, Bold, especially at small sizes.
- [SHOULD] Minimize typeface count, even in a heavily branded UI.
- [SHOULD] Keep the relative hierarchy intact when text size changes.
- [SHOULD] Prioritize what scales: content scales, chrome may not (tab titles needn't grow; dialog matters more than transient damage numbers).
- [SHOULD] Prefer built-in text styles (Dynamic Type comes free). Modify via symbolic traits (bold, leading), not arbitrary sizes.
- [SHOULD] Use loose leading for wide columns and long passages; tight leading is allowed in height-constrained rows.
- [SHOULD] Avoid tight leading for 3+ lines, even in height-limited areas.
- [MUST] Don't embed system fonts on native; access them via `Font.Design` (`.default` = SF, `.serif` = New York).
- [CONSIDER] In mockups, adjust tracking per size (the system does it at runtime).
- Reference: emphasized weights are medium, semibold, bold, heavy (`.bold()` / `traitBold`).
**Platform deltas**
- iOS/iPadOS: SF Pro; New York allowed. Dynamic Type supported.
- macOS: SF Pro; New York only via Mac Catalyst. No Dynamic Type. Use dynamic system font variants to match standard controls: control content, label, menu, menu bar, message, palette, title bar, tool tips, user (document), user fixed pitch, bold system, system.
- SF has rounded variants (Pro, Compact, Arabic, Armenian, Georgian, Hebrew) and widths (Condensed, Expanded); NY is the companion serif. SF Symbols weights match font weights.
- Variable fonts with dynamic optical sizes interpolate one continuous design per point size; no need to pick Text vs Display.
**Web (our translation)**
- `font-family: system-ui, -apple-system` (or a deliberate brand face) with `font-optical-sizing: auto`; `rem` units so browser text-size settings scale content; 11px absolute floor on native iOS, 12 px on desktop and web. Pick the scale by the profile's density: comfortable apps measure against the iOS scale (17 pt body, mapped to 16-17 px; mobile web body 16 px minimum), dense tools against the macOS scale (13 pt body, mapped to 13-14 px). Hierarchy rules (weight before size, few sizes) apply to both. `font: -apple-system-body` maps to Dynamic Type in Safari. Line-height ratios: iOS body 1.29, macOS body 1.23; most web templates use 1.5 everywhere. A desktop web app imitating Mac density uses 13px body / 16px line height. SF Pro is licensed for Apple platforms only; flag it on web.
**Slop tells (ours)**
- 14px body on mobile; Inter Light / 300 for "elegance"; three or four font families (display, body, mono, accent); every heading `font-weight: 700` with no size step; uniform `letter-spacing: -0.02em` at all sizes; `line-height: 1.1` on multi-line paragraphs; px-locked type that ignores user zoom.

## Typography: Dynamic Type layout behavior
**Checks**
- [SHOULD] Make sure layout adapts to all sizes, including accessibility sizes (Settings > Accessibility > Display & Text Size > Larger Text).
- [SHOULD] Let meaningful icons grow with text (SF Symbols do this automatically).
- [SHOULD] Show as much useful text at the largest accessibility size as at the largest standard size; avoid truncation in scrollable regions unless a detail view shows the rest; use unlimited line counts.
- [CONSIDER] At large sizes, switch inline items (glyphs, timestamps) to a stacked layout below the text and reduce column count (`isAccessibilityCategory`).
- [SHOULD] Keep primary elements toward the top even at huge sizes.
- [SHOULD] Make sure custom fonts implement Dynamic Type and Bold Text.
**Web (our translation)**
- Test at 200% browser zoom and with OS text scaling. `[icon][title][timestamp]` rows wrap to stacked at large `rem`. Avoid `text-overflow: ellipsis` on primary content in scrolling lists. Grids drop columns via container queries tied to font size (`em`-based breakpoints).
**Slop tells (ours)**
- Single-line ellipsized list titles everywhere; fixed `height: 64px` rows; px icons that stay tiny while text grows.

## Typography: iOS/iPadOS Dynamic Type table
Cells are size/leading in pt. Weights: all Regular except Headline = Semibold. Emphasized weight: Large Title, Title 1, Title 2 go Bold; others go Semibold. L is the default.

| Style | xS | S | M | **L** | xL | xxL | xxxL | AX1 | AX2 | AX3 | AX4 | AX5 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Large Title | 31/38 | 32/39 | 33/40 | **34/41** | 36/43 | 38/46 | 40/48 | 44/52 | 48/57 | 52/61 | 56/66 | 60/70 |
| Title 1 | 25/31 | 26/32 | 27/33 | **28/34** | 30/37 | 32/39 | 34/41 | 38/46 | 43/51 | 48/57 | 53/62 | 58/68 |
| Title 2 | 19/24 | 20/25 | 21/26 | **22/28** | 24/30 | 26/32 | 28/34 | 34/41 | 39/47 | 44/52 | 50/59 | 56/66 |
| Title 3 | 17/22 | 18/23 | 19/24 | **20/25** | 22/28 | 24/30 | 26/32 | 31/38 | 37/44 | 43/51 | 49/58 | 55/65 |
| Headline | 14/19 | 15/20 | 16/21 | **17/22** | 19/24 | 21/26 | 23/29 | 28/34 | 33/40 | 40/48 | 47/56 | 53/62 |
| Body | 14/19 | 15/20 | 16/21 | **17/22** | 19/24 | 21/26 | 23/29 | 28/34 | 33/40 | 40/48 | 47/56 | 53/62 |
| Callout | 13/18 | 14/19 | 15/20 | **16/21** | 18/23 | 20/25 | 22/28 | 26/32 | 32/39 | 38/46 | 44/52 | 51/60 |
| Subhead | 12/16 | 13/18 | 14/19 | **15/20** | 17/22 | 19/24 | 21/28 | 25/31 | 30/37 | 36/43 | 42/50 | 49/58 |
| Footnote | 12/16 | 12/16 | 12/16 | **13/18** | 15/20 | 17/22 | 19/24 | 23/29 | 27/33 | 33/40 | 38/46 | 44/52 |
| Caption 1 | 11/13 | 11/13 | 11/13 | **12/16** | 14/19 | 16/21 | 18/23 | 22/28 | 26/32 | 32/39 | 37/44 | 43/51 |
| Caption 2 | 11/13 | 11/13 | 11/13 | **11/13** | 13/18 | 15/20 | 17/22 | 20/25 | 24/30 | 29/35 | 34/41 | 40/48 |

Non-obvious: Headline and Body are the same size; only weight differs. Body at AX5 is 53 pt (about 3.1× default) while Large Title grows only 1.76×, so the hierarchy compresses at accessibility sizes. Small sizes floor at 11 pt.

## Typography: macOS table
Size/line height in pt; weight, then emphasized weight.

| Style | Spec | Weight to Emph. |
|---|---|---|
| Large Title | 26/32 | Regular to Bold |
| Title 1 | 22/26 | Regular to Bold |
| Title 2 | 17/22 | Regular to Bold |
| Title 3 | 15/20 | Regular to Semibold |
| Headline | 13/16 | Bold to Heavy |
| Body | 13/16 | Regular to Semibold |
| Callout | 12/15 | Regular to Semibold |
| Subheadline | 11/14 | Regular to Semibold |
| Footnote | 10/13 | Regular to Semibold |
| Caption 1 | 10/13 | Regular to Medium |
| Caption 2 | 10/13 | Medium to Semibold |

**Web (our translation)**
- A desktop web app imitating Mac density uses 13px body / 16px line height; iOS-like mobile web uses 17/22 body (see the legibility topic for the density rule).

## Typography: tracking values
Units are 1/1000 em, written `size:tracking`. These apply to SF and the system font only; custom brand faces have their own metrics, so judge them by their own spec, not this table.

**SF Pro (iOS, iPadOS; macOS identical except 52 pt = +6/+0.31 and 53 pt = +6/+0.33)**
6:+41 · 7:+34 · 8:+26 · 9:+19 · 10:+12 · 11:+6 · 12:0 · 13:-6 · 14:-11 · 15:-16 · 16:-20 · **17:-26 (-0.43pt)** · 18:-25 · 19:-24 · 20:-23 · 21:-18 · 22:-12 · 23:-4 · 24:+3 · 25:+6 · 26:+8 · 27:+11 · 28-30:+14 · 31-32:+13 · 33-34:+12 · 35:+11 · 36-40:+10 · 41-43:+9 · 44-48:+8 · 49-51:+7 · 52-56:+6 · 58:+5 · 60-64:+4 · 66:+3 · 68-72:+2 · 76:+1 · 80-96:0

**SF Pro Rounded** (always positive): 6:+87 · 7:+80 · 8:+72 · 9:+65 · 10:+58 · 11:+52 · 12:+46 · 13:+40 · 14:+35 · 15:+30 · 16:+26 · 17:+22 · 18:+21 · 19:+20 · 20:+18 · 21:+17 · 22-23:+16 · 24:+15 · 25-27:+14 · 28-29:+13 · 30-34:+12 · 35-36:+11 · 37-42:+10 · 43:+9 · 44-49:+8 · 50:+7 · 51-56:+6 · 58-62:+4 · 64:+3 · 66-72:+2 · 76:+1 · 80-96:0

**New York** (monotonic, tighter as size grows): 6:+40 · 7:+32 · 8:+25 · 9:+20 · 10:+16 · 11:+11 · 12:+6 · 13:+4 · 14:+2 · 15:0 · 16:-2 · 17:-4 · 18:-6 · 19:-8 · 20-22:-10 · 23-25:-11 · 26-30:-12 · 31-33:-13 · 34-52:-14 · 54-66:-15 · 70-160:-16 · 180-200:-17 · 220-260:-18

**Checks**
- [CONSIDER] Flag uniform negative letter-spacing on display sizes (such as 32-48 px) only when the face is SF or the system font: SF Pro tracking is not monotonic. It is tightest at 17-20 pt (-26 to -23), turns positive from 24 pt up to about 76 pt, and is 0 at 80+. "Tight display headings" is the opposite of what SF does. New York does tighten with size.
**Web (our translation)**
- `letter-spacing` in `em` is value/1000 (17px is `-0.026em`; 34px is `+0.012em`). With `system-ui` on Apple devices Safari applies this automatically; don't add your own on top. When setting it yourself for SF, use negative tracking around 14-22px and positive at 24px+.
**Slop tells (ours)**
- Blanket `tracking-tight` on all headings; `tracking-widest` uppercase eyebrow labels at 11px (SF already adds +6 at 11 pt; adding 0.1em more is a template tell).

## Color: best practices
**Intent**
Color communicates (status, interactivity, brand). It stays consistent in meaning and survives light, dark, high contrast, ambient light and display gamut.
**Checks**
- [SHOULD] One color, one meaning. If brand color marks interactive text, don't use it on non-interactive text.
- [SHOULD] Make sure every color has light, dark and increased-contrast variants (4 values per color). Even single-appearance apps supply light and dark, because Liquid Glass adapts.
- [SHOULD] Test under bright sun (colors look darker, muted) and dim light (brighter, saturated).
- [SHOULD] Test on True Tone and P3 vs sRGB; reading, photo, video and game apps may set white-point adaptivity.
- [CONSIDER] Adjust nearby UI colors when artwork changes (Maps: light scheme for map, dark for satellite); colors shift behind translucent toolbars.
- [SHOULD] Use the system color picker for user-chosen colors.
- [SHOULD] Avoid relying solely on color for differentiation, interactivity or essential info; add labels or glyph shapes. Accessibility: the strictest source wins, and WCAG makes this a hard requirement on web.
- [CONSIDER] Consider cultural meaning (red = danger vs positive).
- [SHOULD] Avoid hard-coding system color values; they change between releases. Use the API.
- [SHOULD] Avoid redefining the semantic meaning of dynamic system colors (separator color as text, secondary label as background).
**Platform deltas**
- iOS/iPadOS backgrounds: two sets, system and grouped, each primary/secondary/tertiary. Use the grouped set only for grouped tables. Primary = whole view; secondary = groups within; tertiary = groups within secondary.
- iOS foreground semantics: label, secondaryLabel, tertiaryLabel, quaternaryLabel, placeholderText, separator (lets content show through), opaqueSeparator, link.
- macOS: about 35 semantic colors (control, selected/unemphasized selected for key vs non-key window, alternating row backgrounds, keyboardFocusIndicator, findHighlight, underPageBackground, windowFrameText, etc.). Selected content in a non-key window uses an "unemphasized" color (gray, not accent).
- macOS accent: the app accent applies only when the user's accent is multicolor; otherwise the user's color replaces yours (except fixed-color sidebar icons).
- System color names: red, orange, yellow, green, mint, teal, cyan, blue, indigo, purple, pink, brown; grays systemGray through systemGray6.
**Web (our translation)**
- CSS custom properties per role (`--label`, `--label-2`, `--bg`, `--bg-grouped`, `--separator`), defined for `prefers-color-scheme` x `prefers-contrast: more` (4 combos). The macOS "unemphasized selection" becomes a dimmed selection highlight when the pane loses focus (`:focus-within` off, gray). Respect user accent via `accent-color` / `AccentColor`.
**Slop tells (ours)**
- Brand purple on links, headings, icons, badges and decorative blobs at once; gray-400 placeholder reused as secondary body; light-only palette with `filter: invert()` dark mode; no high-contrast variant; status shown by a 6px colored dot only; hex values copied from Apple's palette.

## Color: Liquid Glass color (26+)
**Intent**
Glass has no color of its own; it borrows from content. Color on glass is reserved emphasis.
**Checks**
- [SHOULD] (26+) Apply color to glass, and to symbols/text on glass, sparingly: status indicators and primary actions only.
- [SHOULD] (26+) Emphasize a primary action by tinting the control's background (like the Done button), not the symbol or text.
- [SHOULD] (26+) Refrain from tinting the backgrounds of multiple controls.
- [SHOULD] (26+) Colorful app background: monochrome toolbars and tab bars, or an accent with strong differentiation. Monochrome content: brand color as accent works well.
- [SHOULD] (26+) Avoid similar colors between content and overlapping controls; make the resting state (top of scroll) legible even if colorful content later scrolls under.
- Reference: small glass (toolbars, tab bars) flips light/dark with the content beneath and its symbols/text go monochrome. Large glass (sidebars) is more opaque. Design for it.
**Web (our translation)**
- In a frosted header keep icons `currentColor` monochrome and use at most one filled accent button per bar. Compute header foreground from the content under it at rest, or use a scrim, not fixed white text.
**Slop tells (ours)**
- Gradient-filled pill buttons in every toolbar slot; colored icon, label and background on one control; brand-colored nav bar over a brand-colored hero.

## Color: management and wide color
**Checks**
- [SHOULD] Embed color profiles in images (sRGB is accurate on most displays).
- [CONSIDER] Use Display P3 at 16 bits per channel, PNG, where it adds meaning (photos, data viz, status); design on a wide-gamut display.
- [CONSIDER] Provide sRGB-specific variants if similar P3 colors collapse or P3 gradients clip on sRGB.
**Web (our translation)**
- `color(display-p3 ...)` inside `@media (color-gamut: p3)` with sRGB fallback; check gradients for banding and clipping on sRGB.
**Slop tells (ours)**
- Neon gradients authored in P3 that band or flatten on sRGB monitors.

## Dark Mode
**Intent**
Dark Mode is a systemwide user choice. Apps honor it and stay legible and layered, not merely inverted.
**Checks**
- [SHOULD] Avoid an app-specific appearance toggle; follow the system. [CONSIDER] Immersive media apps may be permanently dark.
- [SHOULD] Look good in both modes; Auto may switch while the app is running.
- [SHOULD] Test dark mode with Increase Contrast and Reduce Transparency, separately and together; Increase Contrast in dark can reduce contrast between dark text and dark background.
- Reference: a dark palette is dimmer backgrounds and brighter foregrounds, not a straight inversion.
- [SHOULD] Use semantic/adaptive colors; custom colors as Color Sets with both variants; no hard-coded values.
- [SHOULD] Contrast: minimum 4.5:1; for custom foreground/background strive for 7:1, especially small text. On web, WCAG 2 ratios (4.5:1 body, 3:1 large and non-text) are the pass/fail floor and APCA is an extra check for dark mode and thin weights.
- [CONSIDER] Darken content images with white backgrounds slightly in dark mode so they don't glow.
- [SHOULD] Prefer SF Symbols. [CONSIDER] Design separate light/dark icons where edges vanish (a moon needs an outline on light; an oil drop needs a border on dark).
- [SHOULD] Use system label colors and system text views.
**Platform deltas**
- iOS/iPadOS: [SHOULD] prefer system backgrounds. Base vs elevated dark backgrounds: elevated (brighter) for foreground layers (popovers, sheets, multitasking, multiple windows); custom backgrounds break this.
- macOS: [CONSIDER] graphite accent tints window backgrounds on the desktop. Give custom components with a visible bezel some transparency only in neutral (uncolored) state, never on colored states (color would fluctuate).
**Web (our translation)**
- Follow `prefers-color-scheme`. An in-app theme toggle is allowed only with "System" as its default. Elevated surfaces are lighter gray in dark mode (`--bg-elevated` > `--bg`), not shadows. `img { filter: brightness(.9) }` in dark for white-background product shots. Test `prefers-contrast: more` and `prefers-reduced-transparency`.
**Slop tells (ours)**
- Sun/moon toggle with no System option; pure `#000` backgrounds with pure `#fff` text; dark modals the same color as the page with an invisible drop shadow; white-background logos glowing on dark cards; dark mode via `invert(1)`.

## Materials: Liquid Glass (26+)
**Intent**
Liquid Glass is a separate functional layer (controls, navigation) floating over content, letting content show through while controls stay legible. Standard materials structure the content layer beneath.
**Checks**
- [MUST] (26+) Don't use Liquid Glass in the content layer; content backgrounds use standard materials. Exception: transient interactive parts of content controls (slider thumb, toggle) go glassy while being activated.
- [SHOULD] (26+) Use Liquid Glass on custom controls sparingly, only the most important functional elements. System components adopt it automatically.
- [SHOULD] (26+) Use the Regular variant (blurs, adjusts luminosity) as the default, and for text-heavy components (alerts, sidebars, popovers) or busy backgrounds.
- [SHOULD] (26+) Use the Clear variant only over visually rich media (photos, video).
- [CONSIDER] (26+) Clear over bright content: add a 35% opacity dark dimming layer. Over dark content, or with AVKit controls (own dimming), no dimming is needed.
- [SHOULD] (26+) Hold up under user settings: preferred glass look, Reduce Transparency, Increase Contrast.
- Reference: scroll edge effects blur and fade content under glass bars.
**Platform deltas**
- iOS, iPadOS, macOS share Liquid Glass. API: `glassEffect(_:in:)`. Stronger response to direct touch, subdued for trackpad.
**Web (our translation)**
- Enforce the layering principle: chrome is distinct from content, and there is no glass in content. Emulating Liquid Glass is optional and needs a reduced-transparency fallback. If emulated: `backdrop-filter: blur() saturate()` plus a subtle luminosity layer, only on floating chrome (nav bar, tab bar, toolbar, floating action cluster, popovers). Clear variant over media: lower blur and an `rgba(0,0,0,.35)` scrim on bright imagery. Provide an `@media (prefers-reduced-transparency: reduce)` solid fallback and stronger borders under `prefers-contrast: more`.
**Slop tells (ours)**
- "Glassmorphism" cards in the content grid (frosted pricing cards, frosted stat tiles), the canonical violation; glass panels on a flat solid background (nothing to refract, reads as muddy gray); every button glassy; white text on clear glass over a bright photo with no scrim.

## Materials: standard materials and vibrancy
**Checks**
- [SHOULD] Pick materials by semantic purpose, not by the color they appear to give (settings change appearance).
- [SHOULD] Always put vibrant (system) colors on materials.
- [CONSIDER] Thicker = more opaque = better for text and fine detail; thinner = more context.
- [SHOULD] iOS/iPadOS materials: ultraThin, thin, regular (default), thick. Vibrancy levels: labels (label, secondary, tertiary, quaternary), fills (fill, secondary, tertiary), separator (one).
- [SHOULD] In general, avoid quaternary label on thin or ultraThin materials (too low contrast).
- Reference: standard materials (`.ultraThinMaterial`, `.thinMaterial`, `.regularMaterial`, `.thickMaterial`) are allowed in the content layer. The (26+) MUST against Liquid Glass in content covers Liquid Glass only (`glassEffect`, glass button styles), not standard materials.
**Platform deltas**
- macOS has purpose-named materials (`NSVisualEffectView.Material`), a choice of when to allow vibrancy, and blending modes behind window vs within window.
**Web (our translation)**
- Define 4 material tokens (ultra-thin to thick) as blur+alpha pairs, and text-on-material colors mixed with the backdrop (`color-mix`, `mix-blend-mode: plus-lighter` approximations), not flat gray hex.
**Slop tells (ours)**
- `bg-white/10 backdrop-blur` everywhere with `text-gray-400` on top (fails contrast on thin material); a material chosen because it looks nice and blue-ish.

## Motion
**Intent**
Motion conveys status, feedback and instruction. It is purposeful, brief, cancelable, optional and physically plausible.
**Checks**
- [MUST] Don't add motion for its own sake; gratuitous motion distracts and can cause physical discomfort.
- [SHOULD] Make motion optional: never let it be the only carrier of important information; pair it with haptics, audio or text.
- [SHOULD] Make feedback motion follow the gesture: a view revealed by sliding down dismisses by sliding up, not sideways.
- [SHOULD] Keep feedback animations brief and precise.
- [SHOULD] Avoid adding custom motion to frequent interactions (the system already animates standard ones).
- [SHOULD] Let people interrupt or cancel; don't block input until an animation ends, especially repeated ones.
- [CONSIDER] Use SF Symbol animations where meaningful (SF Symbols 5+).
- [SHOULD] Games: 30-60 fps steady by default; offer performance and battery modes.
- Reference: Liquid Glass motion responds more strongly to direct touch and is subdued for trackpad; input method changes motion intensity.
**Platform deltas**
- Transferable from visionOS comfort rules: avoid sustained oscillation, especially around 0.2 Hz, keep amplitude low; avoid large moving objects at the edge of view; give a stationary frame of reference; relocate objects with fade-out/fade-in rather than sliding the world.
**Web (our translation)**
- Honor `prefers-reduced-motion` with a non-motion alternative (cross-fade or instant), not just shorter durations. Keep transitions interruptible (CSS transitions or WAAPI, not chained `setTimeout`s that lock the UI). Stay directionally consistent: a drawer from the right closes to the right. No entrance animations on list items that re-render often. Avoid slow looping float/bob animations of about 5 s period (the 0.2 Hz Apple flags).
**Slop tells (ours)**
- Every section fades up on scroll; staggered card entrances on each tab switch; perpetual floating blobs or "breathing" gradients (often about 0.2 Hz); hover lift + shadow + scale on every card; page transitions that block clicks for 600 ms; parallax on everything; loading info conveyed only by an animation.

## Depth and spatial principles
**Intent**
Depth marks hierarchy in small doses. Only the principles that transfer from spatial platforms are kept.
**Checks**
- [SHOULD] Use depth for hierarchy (a sheet comes forward, the window recedes), with accurate cues; conflicting cues cause discomfort.
- [SHOULD] In general, avoid adding depth to text.
- [SHOULD] Depth must add value: good for separating large elements (a toolbar off a window), bad for small ones (a button glyph lifted off its background). Limit the number of distinct depths.
- [SHOULD] Avoid displaying too many windows.
- [SHOULD] Make interactive targets large and spaced so they never overlap; use immersion or full-screen modes only for meaningful moments, entered by the user, with a clear labeled exit.
**Web (our translation)**
- Shadow/elevation levels mark hierarchy at a few discrete levels; don't elevate small glyphs inside buttons; don't give text drop shadows to fake depth; keep hit-target spacing so hover effects don't crowd neighbors. Text over imagery: increase weight or add a material or scrim, not `text-shadow`. For lightboxes, presentation mode and video theater: enter only on explicit user action, always a visible labeled exit (not just Esc), dim surroundings subtly rather than a hard cut to black, and say whether "Close" returns or ends the session.
**Slop tells (ours)**
- 5+ shadow elevations on one screen; icons with their own drop shadows inside shadowed buttons; 3D-extruded headline text; white text with `text-shadow: 0 2px 4px rgba(0,0,0,.5)` over hero photos; auto-launching full-screen intros; lightbox with only an unlabeled x.

## Images
**Intent**
Ship crisp art at the right scale factors, formats and color profiles; test on real hardware.
**Checks**
- [SHOULD] Provide high-res assets for every bitmap: iOS @2x + @3x; iPadOS @2x; macOS @1x + @2x.
- [SHOULD] Design at the lowest resolution and scale up; put vector control points on whole values so 2x/3x stay pixel-aligned.
- [SHOULD] Formats: de-interlaced PNG for bitmaps; 8-bit palette PNG when 24-bit isn't needed; optimized JPEG or HEIC for photos; PDF or SVG for flat/interface icons.
- [SHOULD] Include a color profile with every image.
- [MUST] Always test on a range of actual devices (pixelation, stretching, compression).
**Web (our translation)**
- `srcset` with 1x/2x/3x (`x` descriptors) or `w` + `sizes`; SVG for UI icons (never PNG icons); AVIF/WebP/JPEG for photos with embedded sRGB profile; snap SVG paths to integer coordinates at the 1x viewBox to avoid blurry 1px strokes.
**Slop tells (ours)**
- Blurry 1x PNG icons on retina; emoji or icon-font icons with mismatched optical weight; stock photos with no `srcset`; SVG icons with half-pixel strokes.

## Cross-cutting principles
1. **Two layers, never mixed.** Functional chrome (Liquid Glass, monochrome, floating) sits over content (standard materials, solid semantic backgrounds). Glass in the content layer, or opaque fills under chrome, both break the model. The biggest single anti-slop rule for 2025+ Apple-style UI.
2. **Semantic, not literal.** Colors, materials, fonts and backgrounds are chosen by role (label/secondary/separator; base/elevated; regular/clear; Body/Headline). Hard-coded hex, hard-coded system color values, embedded system fonts and "looks-nice" material choice are all flagged.
3. **Every token needs 4+ states.** Light, dark, increased contrast (each), plus reduced transparency and Bold Text. Dark is not an inversion; elevated surfaces get lighter.
4. **Emphasis is scarce.** Checkable heuristics (ours): at most 1 tinted control per toolbar; 1 accent meaning; 2 typefaces; 3 elevation levels; no entrance animation on elements shown more than once per session. Restraint is the actual Apple signature.
5. **Space, not device, decides layout.** Size classes and available space drive layout; functionality never changes with size, only its visibility. Text size is a layout input.
6. **Typography is calibrated per size.** For SF: negative tracking from 13-23 pt, positive from 24-76 pt; avoid tight leading for 3+ lines; no light weights; few typefaces. Headline = Body size, different weight.
7. **Motion is optional, brief, interruptible, gesture-consistent.** Avoid making it the sole carrier of information.
8. **Legibility at rest.** The resting state (top of scroll, default text size, default appearance) is legible without scrolling, later scrims, or motion.
9. **Contrast numbers to enforce**: 4.5:1 minimum, 7:1 target for custom colors and small text; 35% dark dim under clear glass on bright media.
