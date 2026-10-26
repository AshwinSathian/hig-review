# 02 — Visual Foundations digest

Sources: Apple Human Interface Guidelines, developer.apple.com/design/human-interface-guidelines, snapshot 2026-10-23 (layout, typography, color, dark mode, materials, motion, spatial layout, images, immersive experiences).
Paraphrased digest for review purposes. Short quotations are attributed; consult the sources for the authoritative text.

Pages covered: layout, typography, color, dark-mode, materials, motion, spatial-layout, images, immersive-experiences. All read in full.
Severity key: [MUST] = Apple says "must/essential/always/don't" or an error results; [SHOULD] = "prefer/avoid/use/make sure"; [CONSIDER] = "consider/if necessary/in rare cases".
"Web translation" and "Slop tells" are **our inference**, not Apple text.

> Crawl note: the current `layout` page (updated Sept 9, 2026) has **no device-dimension / margin / safe-area numeric table** (no 16/20 pt margins, no per-device point sizes). Do not have the skill cite those numbers as HIG. The only layout numbers left are tvOS (60/80 pt safe area, grid tables) and visionOS (60 pt centers, 16 pt gaps).

---

## Layout: visual hierarchy (source: layout)
- **Intent**: People read top→bottom, leading→trailing; alignment, indentation and grouping tell them what relates to what before they read a word.
- **Checks**:
  - Put the most important items near the top and leading edge. [SHOULD]
  - Use standard components so the layout mirrors for RTL. [SHOULD]
  - Align elements to shared edges; use indentation *only* to mean subordination (indented = child of the item above). [SHOULD]
  - Group related items with negative space, container shapes, or separators. Pick one grouping device per level; don't stack all three. [SHOULD]
  - Use progressive disclosure (disclosure triangles, menus, nested views, scrollable sections) instead of showing every option at once. [SHOULD]
  - Make controls visually distinct from content using Liquid Glass. **Don't put a solid or semi-opaque background color under controls**; use a scroll edge effect to lift them above content instead. [SHOULD]
  - Full-screen background content extends *under* sidebars, toolbars and tab bars to the window edge. [SHOULD]
  - If a sidebar/inspector would cover key parts of a full-bleed image, use a background extension effect (mirrored + blurred continuation), not a cropped image or a hard edge. [CONSIDER]
- **Platform deltas**: Same across iOS/iPadOS/macOS. Background extension = `backgroundExtensionEffect()` / `UIBackgroundExtensionView`.
- **Web translation (inference)**: Sticky headers/toolbars should be translucent with `backdrop-filter` and a fading scroll-edge mask (`mask-image: linear-gradient`) rather than an opaque white bar with a bottom border. Hero imagery should run under the nav (`position: fixed` nav over `inset: 0` media). Use logical properties (`margin-inline-start`, `dir="rtl"`) so the layout mirrors.
- **Slop tells (inference)**: Opaque white top bar + 1px gray border-bottom; every section in its own bordered card *and* separated by dividers *and* padded (triple grouping); indentation used for decoration; everything visible at once (no disclosure); image boxed inside a padded card instead of bleeding under chrome.

## Layout: adaptability & size classes (source: layout)
- **Intent**: The app must stay familiar when rotated, resized, mirrored, or moved to another display. Layout decisions follow available space, not device identity.
- **Checks**:
  - Base layout on size classes (compact/regular × horizontal/vertical), **not** device type or orientation. [SHOULD — Apple: "aren't useful for making layout decisions"]
  - Design for *every* combination of size classes in both aspect ratios (e.g. iPad landscape resized to regular height; compact portrait widened to regular width). [SHOULD]
  - Keep functionality identical across size classes; only change how much is visible (e.g. tab bar → sidebar, overflow menu → exposed items). [MUST — "Don't change your app's functionality"]
  - Keep the idiom (platform look) when resizing: an iPad app in a narrow window still looks like an iPad app. [SHOULD]
  - Handle: size classes, screen sizes, orientations/aspect ratios, Dynamic Island, external displays, Display Zoom, resizable windows (iPad + Mac), text-size changes, RTL, locale formats, text length. [SHOULD]
  - At large text sizes: horizontally adjacent views stack vertically; rows grow in height; single-line rows wrap to multiple lines; nothing clips or overlaps. [MUST in effect — "difficult or impossible to use" otherwise]
  - Test the smallest and largest layouts first, plus localizations and text sizes. [SHOULD]
  - Background artwork: never change its aspect ratio; scale to fill. Expect very wide/short and tall/narrow windows, so art must extend past the "normal" visible area. [SHOULD]
  - Even orientation-locked apps (e.g. landscape games) must resize well. [SHOULD]
  - Respect safe areas (hardware like Dynamic Island, camera housing, and system bars: toolbar, tab bar, status bar). [MUST — "essential"]
  - Use system layout guides for standard margins and **readable-width** text columns. [SHOULD]
- **Platform deltas**:
  - iOS/iPadOS: any size-class combination is possible (Slide Over, iPhone Mirroring on Mac, iPad multitasking).
  - macOS: **don't put controls or critical info at the bottom of a window** (people drag windows partly off-screen); don't put content behind the camera housing at the top edge. [SHOULD]
  - Web translation (inference): size classes ≈ container queries on the actual container, not UA sniffing or `orientation` media queries. Readable-width guide ≈ `max-width: ~65–75ch` on prose. Safe areas ≈ `env(safe-area-inset-*)` + `viewport-fit=cover`. "Same functionality at every width" = don't drop features on mobile, move them into menus. For desktop-style web apps, avoid bottom-pinned critical controls in resizable/popup windows.
- **Slop tells (inference)**: `if (isMobile)` hiding features; layout that only works at 1440px and 390px; text in fixed-height cards that clip at 200% zoom; hero image with `object-fit: contain` letterboxing; full-width paragraphs at 1600px; bottom-fixed CTA on desktop windows.

## Layout: tvOS & visionOS numbers (source: layout)
- **Checks**:
  - tvOS safe area: inset primary content **60 pt top/bottom, 80 pt sides**. [SHOULD]
  - tvOS grids (all: horizontal spacing **40 pt**, min vertical spacing **100 pt**). Unfocused item widths: [SHOULD]

    | Columns | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 |
    |---|---|---|---|---|---|---|---|---|
    | Width (pt) | 860 | 560 | 410 | 320 | 260 | 217 | 184 | 160 |
  - tvOS: extra vertical space above/below row titles; consistent spacing; partially offscreen items equal width on both sides (symmetry). [SHOULD]
  - visionOS: support resizing; keep content horizontally centered at very large sizes; min/max sizes are for preventing overlap, **not** for blocking resize. [SHOULD]
  - visionOS: button centers ≥ **60 pt** apart. 3D content in windows only for meaningful moments, inset from edges. Supplemental content goes in an adjacent window, not an ornament. [SHOULD]
  - watchOS: max 3 glyph buttons or 2 text buttons per row. [SHOULD]
- **Web translation (inference)**: The tvOS "symmetrical partial overflow" rule applies to horizontal carousels: peeking items should be equal on both edges, or the carousel looks broken. Focus-scale needs spacing budgeted so hover/focus growth doesn't overlap neighbors.
- **Slop tells (inference)**: Carousel that peeks only on the right with a hard left edge; hover `scale(1.05)` cards that collide with neighbors.

---

## Typography: legibility & hierarchy (source: typography)
- **Intent**: Text must be readable at any distance and setting; hierarchy comes from weight, size and color, and must survive the user changing text size.
- **Checks**:
  - Default / minimum sizes: [SHOULD — "Follow the recommended"]

    | Platform | Default | Minimum |
    |---|---|---|
    | iOS, iPadOS | 17 pt | 11 pt |
    | macOS | 13 pt | 10 pt |
    | tvOS | 29 pt | 23 pt |
    | visionOS | 17 pt | 12 pt |
    | watchOS | 16 pt | 12 pt |
  - Thin custom fonts: go *above* the recommended sizes. [SHOULD]
  - Avoid Ultralight, Thin, Light weights; prefer Regular, Medium, Semibold, Bold. Especially at small sizes. [SHOULD]
  - Minimize typeface count, even in a heavily branded UI. [SHOULD]
  - Keep the relative hierarchy intact when text size changes. [SHOULD]
  - Prioritize what scales: content scales, chrome may not (tab titles needn't grow; dialog matters more than transient damage numbers). [SHOULD]
  - Prefer built-in text styles (they bring Dynamic Type for free). Modify via symbolic traits (bold, leading) rather than arbitrary sizes. [CONSIDER → effectively SHOULD]
  - Loose leading for wide columns/long passages; tight leading allowed in height-constrained rows, **but never tight leading for 3+ lines**. [SHOULD]
  - Emphasized weights available: medium, semibold, bold, heavy (via `.bold()` / `traitBold`). [reference]
  - Don't embed system fonts; access via `Font.Design` (`.default` = SF, `.serif` = New York). [MUST for native]
  - In mockups, adjust tracking per size (system does it automatically at runtime). [CONSIDER]
- **Platform deltas**:
  - iOS/iPadOS: SF Pro; NY allowed. Dynamic Type supported.
  - macOS: SF Pro; NY only via Mac Catalyst. **No Dynamic Type.** Use dynamic system font variants to match standard controls: control content, label, menu, menu bar, message, palette, title bar, tool tips, user (document), user fixed pitch, bold system, system.
  - visionOS: bolder body and title styles; adds Extra Large Title 1 / 2 for editorial layouts.
  - watchOS: SF Compact; complications use SF Compact Rounded.
  - SF has rounded variants (Pro, Compact, Arabic, Armenian, Georgian, Hebrew) and widths (Condensed, Expanded); NY is the companion serif. SF Symbols weights match font weights.
  - Variable fonts with **dynamic optical sizes**: one continuous design interpolated per point size, no need to pick Text vs Display.
  - **Web translation (inference)**: Use `font-family: system-ui, -apple-system` (or a deliberate brand face) with `font-optical-sizing: auto`; use `rem` units so browser text-size settings scale content; body ≥ 17px on mobile-first apps, ≥ 13px floor only for dense desktop tools, 11px absolute floor. Implement per-size letter-spacing (negative around 14–22px, positive at 24px+ for SF; see tracking table). `-apple-system-body` etc. map to Dynamic Type in Safari via `font: -apple-system-body`.
- **Slop tells (inference)**: 14px body text on mobile; Inter Light / 300 weight for "elegance"; three or four font families (display + body + mono + accent); every heading `font-weight: 700` with no size step; `letter-spacing: -0.02em` applied uniformly to all sizes; tight `line-height: 1.1` on multi-line paragraphs; px-locked type that ignores user zoom.

## Typography: Dynamic Type layout behavior (source: typography)
- **Checks**:
  - Layout adapts to **all** sizes, including AX sizes (Settings > Accessibility > Display & Text Size > Larger Text). [SHOULD — Apple: "Make sure"]
  - Meaningful icons grow with text (SF Symbols do this automatically). [SHOULD]
  - Show as much useful text at the largest AX size as at the largest standard size; avoid truncation in scrollable regions unless a detail view shows the rest; use unlimited line counts. [SHOULD]
  - At large sizes, switch inline items (glyphs, timestamps) to a stacked layout below the text; reduce column count. (`isAccessibilityCategory`) [CONSIDER]
  - Keep primary elements toward the top even at huge sizes. [SHOULD]
  - Custom fonts must implement Dynamic Type and Bold Text. [SHOULD — Apple: "make sure it implements the same behaviors"]
- **Web translation (inference)**: Test at 200% browser zoom and with OS text scaling; rows with `[icon][title][timestamp]` should wrap to stacked at large `rem`; avoid `text-overflow: ellipsis` on primary content in scrolling lists; grids drop columns via container queries tied to font size (`em`-based breakpoints).
- **Slop tells (inference)**: Single-line ellipsized list titles everywhere; fixed `height: 64px` rows; icons in px that stay tiny while text grows.

## Typography: iOS/iPadOS Dynamic Type table (source: typography)
Cells = size/leading (pt). Weights: all Regular except **Headline = Semibold**. Emphasized weight: Large Title/Title 1/Title 2 → Bold; others → Semibold. **L = default.**

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

Non-obvious: Headline and Body are the **same size**; only weight differs. Body at AX5 is 53 pt (≈3.1× default); Large Title only grows 1.76×, so the hierarchy *compresses* at AX sizes. Small sizes floor at 11 pt.

## Typography: macOS / tvOS / watchOS tables (source: typography)
**macOS built-in styles** (size/line height pt; weight; emphasized):
| Style | Spec | Weight → Emph. |
|---|---|---|
| Large Title | 26/32 | Regular → Bold |
| Title 1 | 22/26 | Regular → Bold |
| Title 2 | 17/22 | Regular → Bold |
| Title 3 | 15/20 | Regular → Semibold |
| Headline | 13/16 | **Bold → Heavy** |
| Body | 13/16 | Regular → Semibold |
| Callout | 12/15 | Regular → Semibold |
| Subheadline | 11/14 | Regular → Semibold |
| Footnote | 10/13 | Regular → Semibold |
| Caption 1 | 10/13 | Regular → **Medium** |
| Caption 2 | 10/13 | **Medium** → Semibold |

**tvOS** (size/leading): Title 1 76/96, Title 2 57/66, Title 3 48/56, Headline 38/46, Subtitle 1 38/46 (Regular→Medium), Callout 31/38, Body 29/36, Caption 1 25/32, Caption 2 23/30. All others Medium→Bold.

**watchOS** (size/leading; Headline Semibold, rest Regular; Large Title emph Bold, rest Semibold). Defaults: Small = 38mm, Large = 40/41/42mm, xLarge = 44/45/49mm.
| Style | xS | S | L | xL | xxL | xxxL | AX1 | AX2 | AX3 |
|---|---|---|---|---|---|---|---|---|---|
| Large Title | 30/32.5 | 32/34.5 | 36/38.5 | 40/42.5 | 41/43.5 | 42/44.5 | 44/46.5 | 45/47.5 | 46/48.5 |
| Title 1 | 28/30.5 | 30/32.5 | 34/36.5 | 38/40.5 | 39/41.5 | 40/42.5 | 42/44.5 | 43/46 | 44/47 |
| Title 2 | 24/26.5 | 26/28.5 | 28/30.5 | 30/32.5 | 31/33.5 | 32/34.5 | 34/41 | 35/37.5 | 36/38.5 |
| Title 3 | 17/19.5 | 18/20.5 | 19/21.5 | 20/22.5 | 21/23.5 | 22/24.5 | 24/26.5 | 25/27.5 | 26/28.5 |
| Headline / Body | 14/16.5 | 15/17.5 | 16/18.5 | 17/19.5 | 18/20.5 | 19/21.5 | 21/23.5 | 22/24.5 | 23/25.5 |
| Caption 1 | 13/15.5 | 14/16.5 | 15/17.5 | 16/18.5 | 17/19.5 | 18/20.5 | 18/20.5 | 19/21.5 | 20/22.5 |
| Caption 2 | 12/14.5 | 13/15.5 | 14/16.5 | 15/17.5 | 16/18.5 | 17/19.5 | 17/19.5 | 18/20.5 | 19/21.5 |
| Footnote 1 | 11/13.5 | 12/14.5 | 13/15.5 | 14/16.5 | 15/17.5 | 16/18.5 | 16/18.5 | 17/19.5 | 18/20.5 |
| Footnote 2 | 10/12.5 | 11/13.5 | 12/14.5 | 13/15.5 | 14/16.5 | 15/17.5 | 15/17.5 | 16/17.5 | 17/19.5 |
(watchOS leading is consistently size + 2.5; AX1 Title 2 "34/41" and AX2 Footnote 2 "16/17.5" are outliers as published.)

- **Web translation (inference)**: A desktop web app that imitates Mac density should use 13px body / 16px line height, *not* the 16px web default. iOS-like mobile web: 17/22 body. These are concrete line-height ratios: iOS body 1.29, macOS body 1.23. Most web templates use 1.5 everywhere.

## Typography: tracking values (source: typography)
Units: 1/1000 em (points in brackets where useful). Compact rows `size:tracking`.

**SF Pro (iOS, iPadOS, visionOS; macOS and tvOS identical except macOS/tvOS 52 pt = +6/+0.31, 53 pt = +6/+0.33)**
6:+41 · 7:+34 · 8:+26 · 9:+19 · 10:+12 · 11:+6 · 12:0 · 13:−6 · 14:−11 · 15:−16 · 16:−20 · **17:−26 (−0.43pt)** · 18:−25 · 19:−24 · 20:−23 · 21:−18 · 22:−12 · 23:−4 · 24:+3 · 25:+6 · 26:+8 · 27:+11 · 28–30:+14 · 31–32:+13 · 33–34:+12 · 35:+11 · 36–40:+10 · 41–43:+9 · 44–48:+8 · 49–51:+7 · 52–56:+6 · 58:+5 · 60–64:+4 · 66:+3 · 68–72:+2 · 76:+1 · 80–96:0

**SF Pro Rounded**: 6:+87 · 7:+80 · 8:+72 · 9:+65 · 10:+58 · 11:+52 · 12:+46 · 13:+40 · 14:+35 · 15:+30 · 16:+26 · 17:+22 · 18:+21 · 19:+20 · 20:+18 · 21:+17 · 22–23:+16 · 24:+15 · 25–27:+14 · 28–29:+13 · 30–34:+12 · 35–36:+11 · 37–42:+10 · 43:+9 · 44–49:+8 · 50:+7 · 51–56:+6 · 58–62:+4 · 64:+3 · 66–72:+2 · 76:+1 · 80–96:0 (always positive).

**New York**: 6:+40 · 7:+32 · 8:+25 · 9:+20 · 10:+16 · 11:+11 · 12:+6 · 13:+4 · 14:+2 · 15:0 · 16:−2 · 17:−4 · 18:−6 · 19:−8 · 20–22:−10 · 23–25:−11 · 26–30:−12 · 31–33:−13 · 34–52:−14 · 54–66:−15 · 70–160:−16 · 180–200:−17 · 220–260:−18 (monotonic, tighter as size grows).

**SF Compact (watchOS)**: 6:+50 · 7–10:+30 · 11:+24 · 12:+20 · 13:+16 · 14:+14 · 15:+4 · 16:0 · 17:−4 · 18:−8 · 19:−12 · 20:0 · 21:−2 · 22:−4 · 23:−6 · 24:−8 · 25:−10 · 26:−11 · 27–28:−12 · 29–30:−14 · 31:−15 · 32:−16 · 33:−17 · 34–35:−18 · 36–48:−20 · 49–52:−21 · 53–62:−22 · 64:−23 · 66–72:−24 · 76:−25 · 80–88:−26 · 92–96:−28.
**SF Compact Rounded**: 6:+28 then −2 per pt to 20:0 (7:+26 … 19:+2); from 21 pt up identical to SF Compact.

- **Non-obvious**: SF Pro tracking is **not monotonic**: tightest at 17–20 pt (−26 to −23), back to *positive* from 24 pt up to ~76 pt, 0 at 80+. So "tight display headings" (negative tracking on 32–48 px) is the opposite of what SF does. New York does tighten with size.
- **Web translation (inference)**: `letter-spacing` in `em` = value/1000 (e.g. 17px → `-0.026em`; 34px → `+0.012em`). If using `system-ui` on Apple devices, Safari applies this automatically; don't add your own on top.
- **Slop tells (inference)**: Blanket `tracking-tight` on all headings; `tracking-widest` uppercase eyebrow labels at 11px (SF already adds +6 at 11 pt; adding 0.1em more is a template tell).

## Typography: visionOS text (source: typography)
- **Checks**: Prefer 2D text; avoid depth on readable text [SHOULD]. Test text legibility at different scales [SHOULD]. Maximize text/background contrast; default white text on glass [SHOULD]. Text not on a background → bold it, **don't add shadows** [SHOULD]. Billboard spatial labels so they face the viewer (baseline perpendicular to line of sight) [SHOULD].
- **Web translation (inference)**: Text over imagery: increase weight or add a material/scrim, not `text-shadow`.
- **Slop tells (inference)**: White text with `text-shadow: 0 2px 4px rgba(0,0,0,.5)` over hero photos.

---

## Color: best practices (source: color)
- **Intent**: Color communicates (status, interactivity, brand). It must be consistent in meaning and survive light/dark/high-contrast, ambient light and display gamut.
- **Checks**:
  - One color = one meaning. If brand color marks interactive text, don't use it on non-interactive text. [SHOULD]
  - Every color has light, dark, **and increased-contrast** variants for each (4 values per color). Even single-appearance apps supply light *and* dark colors, because Liquid Glass adapts. [SHOULD — "make sure"]
  - Test under bright sun (colors look darker/muted) and dim light (brighter/saturated). [SHOULD]
  - Test on True Tone, P3 vs sRGB profiles; reading/photo/video/game apps may set white-point adaptivity. [SHOULD]
  - Adjust nearby UI colors when artwork changes (Maps: light scheme for map, dark for satellite); colors shift behind translucent toolbars. [CONSIDER]
  - User-chosen colors → system color picker. [SHOULD]
  - Never rely only on color for differentiation, interactivity, or essential info; add labels or glyph shapes. [SHOULD — "Avoid relying solely"]
  - Consider cultural meaning (red = danger vs. positive). [CONSIDER]
  - **Don't hard-code system color values**; they change between releases. Use the API. [SHOULD]
  - Don't repurpose semantic colors (separator color as text, secondary label as background). [SHOULD]
- **Platform deltas**:
  - iOS/iPadOS backgrounds: two sets, *system* and *grouped*, each primary / secondary / tertiary. Grouped set only for grouped tables. Primary = whole view; secondary = groups within; tertiary = groups within secondary.
  - iOS foreground semantics: label, secondaryLabel, tertiaryLabel, quaternaryLabel, placeholderText, separator (lets content show through), opaqueSeparator, link.
  - macOS: ~35 semantic colors (control, selected/unemphasized selected for key vs non-key window, alternating row backgrounds, keyboardFocusIndicator, findHighlight, underPageBackground, windowFrameText, etc.). Key distinction: **selected content in a non-key window uses an "unemphasized" color** (gray, not accent).
  - macOS accent: your app accent only applies when user's accent = multicolor; otherwise the user's color replaces yours (except fixed-color sidebar icons).
  - visionOS: system colors use dark values; use color sparingly on glass; color in bold text and large areas, not light text/small areas; balance brightness in immersive (no bright flashing object on black).
  - tvOS: limited palette tied to logo; never color-only focus. watchOS: background color only when it communicates; no full-screen background color in long-lived views.
  - System color names: red, orange, yellow, green, mint, teal, cyan, blue, indigo, purple, pink, brown; grays systemGray–systemGray6 (values are images in crawl; not available).
  - **Web translation (inference)**: CSS custom properties per *role* (`--label`, `--label-2`, `--bg`, `--bg-grouped`, `--separator`), defined for `prefers-color-scheme` × `prefers-contrast: more` (4 combos). Web equivalent of macOS "unemphasized selection": dim selection highlight when the pane/window loses focus (`:focus-within` off → gray). Respect user accent via `accent-color` / `AccentColor` system keyword.
- **Slop tells (inference)**: Brand purple used for links, headings, icons, badges and decorative blobs simultaneously; gray-400 placeholder text reused as secondary body; only a light palette with `filter: invert()` dark mode; no high-contrast variant; status shown by a 6px colored dot only; hex values copied from Apple's palette.

## Color: Liquid Glass color (source: color)
- **Intent**: Glass has no color of its own; it borrows from content. Color on glass is reserved emphasis.
- **Checks**:
  - Apply color to glass, and to symbols/text on glass, sparingly: status indicators and primary actions only. [SHOULD]
  - Emphasize a primary action by tinting the **background** of the control (like the Done button), not the symbol/text. [SHOULD]
  - **Don't tint the backgrounds of multiple controls.** [SHOULD — "Refrain"]
  - Colorful app background → monochrome toolbars/tab bars, or an accent with strong differentiation. Monochrome content → brand color as accent works well. [SHOULD]
  - Avoid similar colors between content and overlapping controls; ensure the **resting state** (top of scroll) is legible even if colorful content later scrolls under. [SHOULD]
  - Small glass (toolbars, tab bars) flips light/dark with the content beneath; symbols/text go monochrome (dark on light content, light on dark). Large glass (sidebars) is more opaque. [reference — design for it]
- **Web translation (inference)**: In a frosted header, keep icons `currentColor` monochrome; at most one filled accent button per bar. Compute header foreground from the content under it at rest (or use a scrim) rather than fixed white text.
- **Slop tells (inference)**: Gradient-filled pill buttons in every toolbar slot; colored icons + colored labels + colored backgrounds on the same control; brand-colored nav bar over a brand-colored hero.

## Color: management / wide color (source: color)
- **Checks**: Embed color profiles in images (sRGB is accurate on most displays) [SHOULD]. Use Display P3 at 16 bits/channel, PNG, where it adds meaning (photos, data viz, status) — must design on a wide-gamut display [CONSIDER]. Provide sRGB-specific variants if similar P3 colors collapse or P3 gradients clip on sRGB [CONSIDER].
- **Web translation (inference)**: `color(display-p3 …)` inside `@media (color-gamut: p3)` with sRGB fallback; check gradients for banding/clipping on sRGB.
- **Slop tells (inference)**: Neon gradients authored in P3 that band or flatten on sRGB monitors.

---

## Dark Mode (source: dark-mode)
- **Intent**: Dark Mode is a systemwide user choice; apps must honor it and stay legible and layered, not just inverted.
- **Checks**:
  - **No app-specific appearance toggle**; follow the system. [SHOULD — "Avoid"] (Rare exception: immersive media apps may be permanently dark. [CONSIDER])
  - Look good in both modes; Auto may switch *while the app is running*. [SHOULD]
  - Test dark mode with Increase Contrast and Reduce Transparency, separately and together; Increase Contrast in dark can *reduce* contrast between dark text and dark bg. [SHOULD]
  - Dark palette = dimmer backgrounds, brighter foregrounds; **not a straight inversion**. [reference]
  - Use semantic/adaptive colors; custom colors as Color Sets with both variants; no hard-coded values. [SHOULD]
  - Contrast: **minimum 4.5:1**; for custom fg/bg **strive for 7:1**, especially small text. [SHOULD]
  - Content images with white backgrounds: darken slightly in dark mode so they don't glow. [CONSIDER]
  - Prefer SF Symbols; design separate light/dark icons where edges vanish (moon needs outline on light; oil drop needs border on dark). [SHOULD/CONSIDER]
  - Use system label colors and system text views. [SHOULD]
- **Platform deltas**:
  - iOS/iPadOS: **base vs elevated** dark backgrounds: elevated (brighter) for foreground layers (popovers, sheets, multitasking, multiple windows). Custom backgrounds break this, so prefer system backgrounds. [SHOULD]
  - macOS: graphite accent → desktop tinting of window backgrounds. Give custom components with a visible bezel some transparency **only in neutral (uncolored) state**; never on colored states (color would fluctuate). [CONSIDER]
  - visionOS/watchOS: no Dark Mode (visionOS glass adapts to surroundings).
  - **Web translation (inference)**: `prefers-color-scheme` only, no in-app toggle unless the site is a content tool with strong reason (debatable for web; see open questions). Elevated surfaces = *lighter* gray in dark mode (`--bg-elevated` > `--bg`), not shadows. `img { filter: brightness(.9) }` in dark for white-background product shots. Test `prefers-contrast: more` + `prefers-reduced-transparency`.
- **Slop tells (inference)**: Sun/moon toggle in the header; pure `#000` backgrounds with pure `#fff` text; dark modals the same color as the page with a drop shadow that is invisible; white-background logos glowing on dark cards; dark mode via `invert(1)`.

---

## Materials: Liquid Glass (source: materials)
- **Intent**: Liquid Glass is a separate **functional layer** (controls, navigation) floating over content, letting content show through while keeping controls legible. Standard materials structure the content layer beneath.
- **Checks**:
  - **Don't use Liquid Glass in the content layer.** Content backgrounds use standard materials. Exception: transient interactive parts of content controls (slider thumb, toggle) go glassy *while being activated*. [MUST-strength "Don't"]
  - Use Liquid Glass on custom controls sparingly, only the most important functional elements. System components adopt it automatically. [SHOULD]
  - **Regular** variant: blurs + adjusts luminosity; default for most components and for text-heavy components (alerts, sidebars, popovers) or busy backgrounds. [SHOULD]
  - **Clear** variant: only over visually rich media (photos, video). [SHOULD — "Only use"]
  - Clear over bright content: add a **35% opacity dark dimming layer**. Over dark content, or with AVKit controls (own dimming), no dimming needed. [CONSIDER]
  - Both variants change with user settings (preferred glass look, Reduce Transparency, Increase Contrast). Design must hold up in all. [SHOULD]
  - Scroll edge effects blur and fade content under glass bars. [reference]
- **Platform deltas**: iOS/iPadOS/macOS share Liquid Glass. tvOS: glass on nav + Top Shelf/Control Center; image views/buttons go glass on focus. visionOS uses its own unmodifiable window "glass" (adapts to surroundings; no Dark Mode). APIs: `glassEffect(_:in:)`.
  - **Web translation (inference)**: Glass = `backdrop-filter: blur() saturate()` + subtle luminosity layer, used **only** for floating chrome (nav bar, tab bar, toolbar, floating action cluster, popovers). Clear variant over media: lower blur, add `rgba(0,0,0,.35)` scrim on bright imagery. Provide `@media (prefers-reduced-transparency: reduce)` solid fallback and `prefers-contrast: more` stronger borders.
- **Slop tells (inference)**: "Glassmorphism" cards in the content grid (frosted pricing cards, frosted stat tiles) — the canonical violation; glass panels on a flat solid background (nothing to refract, so it reads as muddy gray); every button glassy; white text on clear glass over a bright photo with no scrim.

## Materials: standard materials & vibrancy (source: materials)
- **Checks**:
  - Pick materials by **semantic purpose**, not by the color they appear to give (settings change appearance). [SHOULD]
  - Always put **vibrant** (system) colors on materials. [SHOULD]
  - Thicker = more opaque = better for text/fine detail; thinner = more context. [CONSIDER]
  - iOS/iPadOS: ultraThin, thin, regular (default), thick. Vibrancy levels: labels (label, secondary, tertiary, quaternary), fills (fill, secondary, tertiary), separator (one). **Don't use quaternary label on thin/ultraThin** (too low contrast). [SHOULD]
- **Platform deltas**: macOS: purpose-named materials (`NSVisualEffectView.Material`); choose when to allow vibrancy; blending modes *behind window* vs *within window*. tvOS: ultraThin = full-screen light; thin = overlay light; regular = overlay; thick = overlay dark. visionOS: thin = interactive/selected; regular = section separation (sidebar, grouped table); thick = dark element over regular; vibrancy label/secondary (footnotes, subtitles)/tertiary (inactive only). Prefer translucency over opaque color in windows. watchOS: keep default material backgrounds on modal sheets.
- **Web translation (inference)**: Define 4 material tokens (ultra-thin…thick) as blur+alpha pairs, and text-on-material colors that are *mixed* with the backdrop (e.g. `color-mix` / `mix-blend-mode: plus-lighter` approximations) rather than flat gray hex.
- **Slop tells (inference)**: `bg-white/10 backdrop-blur` everywhere with `text-gray-400` on top (fails contrast on thin material); material chosen because "it looks nice blue-ish".

---

## Motion (source: motion)
- **Intent**: Motion conveys status, feedback and instruction. It must be purposeful, brief, cancelable, optional, and physically plausible.
- **Checks**:
  - No motion for its own sake; gratuitous motion distracts and can cause physical discomfort. [SHOULD — "Don't"]
  - **Motion must be optional**: never the only carrier of important info; pair with haptics/audio/text. [MUST — "essential"]
  - Feedback motion follows the gesture: a view revealed by sliding down dismisses by sliding up, not sideways. [SHOULD]
  - Feedback animations brief and precise. [SHOULD]
  - **Avoid adding custom motion to frequent interactions** (system already animates standard ones). [SHOULD]
  - Let people interrupt/cancel; don't block input until an animation ends, especially repeated ones. [SHOULD]
  - Use SF Symbol animations where meaningful (SF Symbols 5+). [CONSIDER]
  - Games: 30–60 fps steady by default; offer performance/battery modes. [SHOULD]
  - Liquid Glass motion: stronger response to direct touch, subdued for trackpad. Input method changes motion intensity. [reference]
- **Platform deltas**: iOS/iPadOS/macOS/tvOS: no extras. visionOS: no motion at FOV edges (match periphery brightness to scene); large moving objects → raise translucency / lower contrast, keep windows fairly small; relocate objects via fade-out/fade-in; **don't rotate the virtual world** (use instant direction changes during a quick fade); give a stationary frame of reference; **avoid sustained oscillation, especially ~0.2 Hz**, keep amplitude low. watchOS: easing on layout animations is built in and not customizable.
  - **Web translation (inference)**: Honor `prefers-reduced-motion` with a non-motion alternative (cross-fade or instant), not just shorter durations. Transitions should be interruptible (CSS transitions or WAAPI, not chained `setTimeout`s that lock UI). Directional consistency: a drawer from the right closes to the right. No entrance animations on list items that re-render often. Avoid slow (≈5 s period) looping float/bob animations — that is the 0.2 Hz frequency Apple flags.
- **Slop tells (inference)**: Every section fades-up on scroll; staggered card entrances on each tab switch; perpetual floating blobs / "breathing" gradients (often ~0.2 Hz); hover lift + shadow + scale on every card; page transitions that block clicks for 600 ms; parallax on everything; loading info conveyed only by an animation.

---

## Spatial layout (source: spatial-layout) — visionOS only
- **Intent**: Comfort first: content stays in the field of view but is anchored in the world; depth is used for hierarchy and in small doses.
- **Checks**:
  - Center important content in FOV; no distracting motion or bright high-contrast objects in periphery. [SHOULD] (System gives no FOV info.)
  - **Don't head-lock content**; anchor in space. [SHOULD]
  - Depth cues must be accurate; conflicting cues cause discomfort. [SHOULD]
  - Use depth for hierarchy (sheet comes forward, window recedes on z). [SHOULD]
  - **No depth on text.** [SHOULD]
  - Depth must add value: good for separating large elements (tab bar/toolbar off a window), bad for small (button glyph lifted off its background). Limit the number of distinct depths — every change forces eye refocus. [SHOULD]
  - Scale: dynamic scale (windows keep apparent size with distance) vs fixed scale (real-world size). Fixed scale only for non-interactive objects that need real size. Points are angular in visionOS. [CONSIDER]
  - Don't open too many windows. [SHOULD]
  - Prefer indirect gestures; direct touch only for close, short manipulation. [SHOULD]
  - Interactive targets: centers ≥ **60 pt** apart, ≥ **16 pt** gap; never overlap interactive elements. [SHOULD]
  - Usable with minimal or no physical movement; place large immersive content on a floor-aligned plane. [SHOULD]
- **Web translation (inference)**: Mostly N/A. Transferable: depth (shadow/elevation levels) should mark hierarchy at a few discrete levels; don't elevate small glyphs inside buttons; don't give text drop shadows to fake depth; hit-target spacing so hover effects don't crowd neighbors.
- **Slop tells (inference)**: 5+ shadow elevations on one screen; icons with their own drop shadows inside shadowed buttons; 3D-extruded headline text.

## Images (source: images)
- **Intent**: Ship crisp art at the right scale factors, formats and color profiles; test on real hardware.
- **Checks**:
  - Provide high-res assets for every bitmap: iOS @2x + @3x; iPadOS, watchOS @2x; macOS, tvOS @1x + @2x; visionOS @2x or higher. [SHOULD — "Provide"]
  - Design at lowest resolution and scale up; put vector control points on whole values so 2x/3x stay pixel-aligned. [SHOULD]
  - Formats: de-interlaced PNG for bitmaps; 8-bit palette PNG when 24-bit not needed; JPEG (optimized) or HEIC for photos; stereo HEIC for spatial photos; **PDF or SVG for flat/interface icons**. [SHOULD]
  - Include a color profile with every image. [SHOULD]
  - Always test on a range of actual devices (pixelation, stretching, compression). [MUST-strength "Always"]
- **Platform deltas**: tvOS: layered images (2–5 layers) required for app icon parallax; background layer **must be opaque** (error otherwise); text in foreground layer; keep parallax subtle; keep a safe zone; runtime `.lcr` from server, not embedded. visionOS: prefer vector; raster above @2x needs high-quality filtering and costs performance (esp. > @6x); spatial photos via stereo HEIC with spatial metadata, displayed in standalone views (sheet/window), not inline; text over spatial photos uses feathered glass background; spatial scenes take seconds to generate, so use them for specific moments, large and centered, minimal UI. watchOS: avoid transparency unless template image; autoscaling PDFs designed at 40/42mm @2x; scale 38mm 90%, 40mm 100%, 41mm 106%, 42mm 100%, 44mm 110%, 45mm 119%, 49mm 119%.
  - **Web translation (inference)**: `srcset` with 1x/2x/3x (`x` descriptors) or `w` + `sizes`; SVG for UI icons (never PNG icons); AVIF/WebP/JPEG for photos with embedded sRGB profile; snap SVG paths to integer coordinates at the 1x viewBox to avoid blurry 1px strokes.
- **Slop tells (inference)**: Blurry 1x PNG icons on retina; emoji or icon-font icons with mismatched optical weight; stock photos with no `srcset`; SVG icons with half-pixel strokes.

## Immersive experiences (source: immersive-experiences) — visionOS only
- **Intent**: Immersion is a user-controlled, escalating choice for specific moments; comfort and grounding come first.
- **Checks**:
  - Launch in Shared Space or `mixed`; let people choose to go deeper. [SHOULD]
  - Reserve immersion for meaningful moments (Photos: browse in window, immerse for one photo). [SHOULD]
  - Draw attention with subtle cues first (dimming, tint, motion, scale); escalate only with reason. [SHOULD]
  - Passthrough tint: subtle, not bright/dramatic. [SHOULD]
  - `progressive`/`full` define a ~**1.5 m** boundary; don't use them if people may move beyond it. Progressive immersion range default **120°–360°** (Digital Crown), custom range allowed, portrait or landscape. [SHOULD]
  - Don't encourage movement; bring objects to the person. [SHOULD]
  - `mixed`: don't obscure passthrough too much; switch to progressive/full if you must. [SHOULD]
  - ARKit scene/hand data requires permission. [MUST]
  - Transitions between immersion levels smooth and trackable; user chooses when to enter/exit; clear Exit button (don't rely on system controls); label whether exit returns or quits; offer save/pause before quitting. [SHOULD]
  - Virtual hands: match real hand pose; caution with oversized hands; on tracking loss, fade out and reveal real hands (never freeze). [SHOULD]
  - Environments: minimize distracting motion/high-contrast detail; proximity signals interactivity; subtle animation (drifting clouds); expansive, not claustrophobic; Spatial Audio, non-repetitive, ducked during playback; avoid flat 360° images (no scale), prefer lit meshes + shaders; **always a ground plane**; minimize repeated assets. [SHOULD]
- **Web translation (inference)**: Analogs for full-screen/"immersive" web modes (lightboxes, presentation mode, video theater): enter only on explicit user action, always a visible labeled exit (not just Esc), dim surroundings subtly rather than hard black cut, and say whether "Close" returns or ends the session.
- **Slop tells (inference)**: Auto-launching full-screen intros; lightbox with only an unlabeled ×; hard cut to black.

---

## Cross-cutting principles
1. **Two layers, never mixed.** Functional chrome (Liquid Glass, monochrome, floating) sits over content (standard materials, solid semantic backgrounds). Glass in the content layer, or opaque fills under chrome, both break the model. This is the biggest single anti-slop rule for 2025+ Apple-style UI.
2. **Semantic, not literal.** Colors, materials, fonts and backgrounds are chosen by *role* (label/secondary/separator; base/elevated; regular/clear; Body/Headline). Hard-coded hex values, hard-coded system color values, embedded system fonts and "looks-nice" material choice are all flagged.
3. **Every token needs 4+ states.** Light, dark, increased contrast (each), plus reduced transparency and Bold Text. Dark is not an inversion; elevated surfaces get *lighter*.
4. **Emphasis is scarce.** One tinted primary action per bar; color only for status or primary action; Liquid Glass on few custom controls; depth on few, large elements; immersion for few moments; motion not on frequent interactions. Restraint is the actual Apple signature.
5. **Space, not device, decides layout.** Size classes / available space drive layout; functionality never changes with size, only its visibility. Text size is a layout input (stacking, column reduction, row growth).
6. **Typography is calibrated per size.** Optical sizing and per-size tracking (SF goes negative 13–23 pt, *positive* 24–76 pt); tight leading never for 3+ lines; no light weights; few typefaces. Headline = Body size, different weight.
7. **Motion is optional, brief, interruptible, gesture-consistent.** Never sole carrier of information; avoid ~0.2 Hz oscillation and peripheral motion.
8. **Legibility at rest.** The resting state (top of scroll, default text size, default appearance) must be legible without relying on scrolling, scrims added later, or motion.
9. **Contrast numbers to enforce**: 4.5:1 minimum, 7:1 target for custom colors and small text; 35% dark dim under clear glass on bright media.

## Open questions for skill design
- Web lacks Liquid Glass primitives. Should the skill *recommend* emulating glass on web (backdrop-filter, performance cost, Firefox/Android quality) or only enforce the layering principle (chrome distinct from content, no glass in content)? Proposal: enforce the principle; treat glass emulation as [CONSIDER] with reduced-transparency fallback required.
- Dark-mode toggle: HIG says no app-specific setting. On the web, a toggle is common and sometimes expected. Default to [SHOULD] follow `prefers-color-scheme`, allow a toggle only if it includes "System" as default?
- Which type scale should web reviews target: iOS (17/22 body) for mobile-first, macOS (13/16) for dense desktop tools? Needs a rule picking the scale by product type and viewport.
- The crawled layout page lacks margin/safe-area/device dimension tables. Do we need another source (Apple Design Resources) for 16/20 pt margins, or deliberately avoid citing numbers not in the HIG?
- How to make "sparingly" checkable? Candidate heuristics: ≤1 tinted control per toolbar; ≤1 accent meaning; ≤2 typefaces; ≤3 elevation levels; no entrance animation on elements shown more than once per session.
- Tracking: should the skill flag uniform negative letter-spacing on display sizes as a violation (it contradicts SF Pro) or only when the font is SF/system-ui? Custom brand faces have their own metrics.
- Severity mapping: Apple uses "avoid/prefer" for most things. Should the skill escalate accessibility-linked SHOULDs (contrast, Dynamic Type, motion optional, color-not-sole-signal) to MUST, since WCAG makes them hard requirements on web?
- visionOS/tvOS content (spatial, immersive, tvOS grids): keep in skill as an optional module or drop for an iOS/iPadOS/macOS/web scope?
- Can the skill verify things automatically (contrast ratios, rem vs px, `prefers-reduced-motion` presence, backdrop-filter on content cards, srcset presence) vs. needing screenshots for judgment checks (hierarchy, restraint)?
