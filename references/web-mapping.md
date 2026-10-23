Covers: how Apple rules translate to web: targets, text, color and contrast, safe areas and viewport, materials and glass, forms and interaction, Apple idioms.
Loaded by: platform fit, visual, interaction and motion, accessibility
Snapshot: 2026-10-23

How Apple rules translate to web, fixed once and applied everywhere. Every rule here is tagged Web (our translation of an Apple rule, not Apple's words) plus a strength. Apple's principle is the default on web; research may sharpen it, and any conflict is shown. Accessibility: the strictest source wins. [MUST] is reserved for WCAG AA success criteria and for strictest-source resolutions labelled CONFLICT; everything else is [SHOULD] or [CONSIDER].

Points to pixels: treat 1 pt as about 1 CSS px. Apple point values carry over as CSS px at the same number, then convert to `rem` in code (see Text).

## Targets

- [MUST] Web: hit targets reach 24 CSS px at minimum (WCAG 2.2 SC 2.5.8, AA). It covers all pointer input (mouse, pen and touch), not only touch. An `under24` target with `spacingOk` true passes WCAG 2.5.8: report it as Major or Minor against Apple's 44 pt goal, never Blocker. `spacingOk` false is a Blocker.
- [SHOULD] Web: aim for 44 px on touch-first surfaces. Spacing follows Apple's guidance: about 12 pt of padding around elements with a bezel, about 24 pt around elements without one (borderless).
- [SHOULD] Web: use 48 px when the component is shared cross-platform (React Native Web, one codebase for web and Android), so one size serves every platform.
- [CONSIDER] Web: dense desktop tools may sit between 24 and 44 px if pointer-only and spacing holds; say so in the finding.

## Text

- [SHOULD] Web: body text is 16 px minimum on mobile web.
- [SHOULD] Web: minimum text is 12 px on desktop and web (11 pt on native iOS). Smaller needs a waiver.
- [MUST] Web: size text in `rem` (or `em`), not `px`, so user font-size settings and browser text scaling work. Text must scale to 200% without loss of content. Text sized in px that ignores the root font size while browser zoom still works passes WCAG 1.4.4: Major (respect the user's font size and Dynamic Type), not Blocker.
- [SHOULD] Web: type scale follows the profile `density`. Comfortable apps measure against the iOS scale (17 pt body, mapped to 16-17 px). Dense tools measure against the macOS scale (13 pt body, mapped to 13-14 px). Hierarchy rules (weight before size, few sizes) apply to both.
- [SHOULD] Web: Apple-targeted UIs use `font-family: system-ui` (plus `ui-rounded`, `ui-serif`, `ui-monospace`); otherwise a deliberate brand font with a `system-ui` fallback. Source: beyond-hig, Web (WebKit).
- [SHOULD] Web: `font: -apple-system-body` (and -headline, -subheadline, -caption1, -caption2, -footnote) follows the iOS text-size setting; pair with `rem` sizing. Community pattern, unverified; the keyword list is verified.
- [SHOULD] Web: SF Pro and SF Symbols are licensed for Apple platforms only. Flag any bundled or hot-linked use on web. Suggest `system-ui` or an open-licensed face, unless the profile lists licensed fonts.

## Color, contrast, preferences

- [MUST] Web: WCAG 2 ratios are the pass/fail floor: 4.5:1 body text, 3:1 large text and non-text (icons, borders, focus rings, control boundaries).
- [SHOULD] Web: APCA is an extra check, run for dark mode and thin weights (300 and below) and small text. WCAG 2 stays the compliance floor and APCA never replaces it; when WCAG passes but the text sits below the APCA row for its size and weight, it is a finding (accessibility: the stricter source wins). 
- [SHOULD] Web: respect `prefers-color-scheme`, `prefers-reduced-motion` and `prefers-contrast`. Reduced motion removes parallax, large translations and auto-play; keep opacity changes.
- [SHOULD] Web: declare `color-scheme: light dark` on `:root` (or the meta tag). WebKit never auto-darkens; without it controls and scrollbars stay light. Do not hard-code system default colors; they change under high contrast. Source: beyond-hig, Web (WebKit), Dark Mode in WebKit 2019.
- [SHOULD] Web: dark palettes via CSS variables; imagery via `<picture><source media="(prefers-color-scheme: dark)">`; icons on `currentColor`; no broad `filter: invert()` over sections.
- [SHOULD] Web: an in-app theme toggle is allowed only with "System" as its default and as a selectable option.
- [SHOULD] Web: `<meta name="theme-color" content="..." media="(prefers-color-scheme: light|dark)">` so Safari's tab bar blends with the page. Source: WebKit.

## Safe areas and viewport (WebKit)

- [SHOULD] Web: with `viewport-fit=cover` (`<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`), pad content with `max(pad, env(safe-area-inset-*))`, for example `padding-left: max(12px, env(safe-area-inset-left))`. Insets are not a substitute for margins. Bottom-fixed UI clears `env(safe-area-inset-bottom)`, which changes as Safari's bar minimizes. Inset areas fill with the html/body background, so set it deliberately. Source: Designing Websites for iPhone X, WebKit 2017.
- [SHOULD] Web: do not size app shells with `100vh`; use `dvh` or `svh`. Our inference from Safari's toolbar behavior.
- [SHOULD] Web: Home Screen sites need a manifest (`display: standalone`), `apple-touch-icon`, a visible back affordance, safe-area handling and a theme color, because iOS/iPadOS 26 opens every Home Screen site as a web app by default (secondary coverage quoting WebKit, post not fetched).
- [SHOULD] Web: native controls first: `<select>` (customizable in Safari 27 via `appearance: base-select`), `<input type="date|time|color">`, `<search>`. No div-based dropdowns.

## Materials and glass

- [SHOULD] Web: the layering principle holds: chrome (nav, toolbars, floating controls) is visually distinct from content, and no glass or translucency inside content. Never stack translucent panels.
- [CONSIDER] Web: emulating Liquid Glass is optional. `backdrop-filter: blur()` is scattering, not lensing; do not claim it is the real material. If used, frosted floating nav only, with fallbacks for `prefers-reduced-transparency` and `prefers-contrast: more` (opaque bars).
- [MUST] Web: reduced transparency, CONFLICT: Apple trusts the OS Reduce Transparency setting, but Safari does not expose `prefers-reduced-transparency` to web content (unverified; recheck per Safari release); resolution: the strictest source wins, so the design must stay legible at full translucency with the fallback absent. Test text over the busiest content behind the bar.
- [SHOULD] Web: Liquid Glass checks (26+) never run against web; they run only on native targets whose profile deployment target is 26+.

## Forms and interaction

- [SHOULD] Web: disabled-until-valid submit buttons become enabled buttons with inline errors on submit. Disabled buttons cannot take focus or explain themselves. (Apple's modal "inactive until input" is the native idiom; this is the web translation.)
- [SHOULD] Web: form dialogs use Cancel plus a verb, never a lone X; confirm before discarding a dirty form; destructive confirm button not under the click point.
- [SHOULD] Web: drags use Pointer Events with `setPointerCapture`, 1:1 `transform`, springs seeded with release velocity; no `transition: all`; never wait for `transitionend` before accepting input. Source: beyond-hig, Motion.
- [SHOULD] Web: container queries over viewport breakpoints; no layout from `screen.orientation`.

## Apple idioms on web

- [SHOULD] Web: web is never flagged for lacking an Apple-specific pattern (bottom tab bar, Title Case menus, trailing Done, sheets, SF Symbols). It is flagged when it breaks the principle behind the pattern. Examples: primary navigation out of thumb reach on a phone (Flexibility, Familiarity); inconsistent casing within one element type; a popover-style overlay on a narrow phone screen where a full sheet works better; a custom control that drops keyboard or screen reader support.
- [SHOULD] Web: popover vs sheet is decided by the project's own breakpoints, not Apple's device classes. Read them from the CSS or the framework config; do not impose 600/768/1024.
- [SHOULD] Web: casing defaults to sentence case when the profile is silent. Prefer `navigator.share` over a custom share-network menu on Apple devices.
