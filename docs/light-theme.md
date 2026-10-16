# LearnSMC light theme — 16 October 2026

## Direction and references

The new theme extends Articles' quiet paper-and-ink feel across the academy: warm ivory canvas, white content surfaces, forest-green primary actions, deep readable text and limited semantic accents. Display typography is editorial; controls and numerical tools retain the existing sans-serif/monospaced hierarchy.

Research included [Mercury](https://mercury.com/), [Stripe's guide library](https://stripe.com/guides/atlas-guides), and Pinterest references for [neutral editorial composition](https://www.pinterest.com/pin/28780885111992829/) and [sage/off-white surfaces](https://www.pinterest.com/pin/317363105009196375/). These informed spacing, surface hierarchy and color restraint. No reference artwork was downloaded or reused.

## Implementation

- `src/styles/light-theme.css` defines semantic Tailwind colors for canvas, surfaces, ink, lines, brand actions and data states. Existing components now use these roles rather than the old dark literals.
- Shared CSS, named neutral utilities, older Academy panels, diagram fills/strokes, selected states, native form controls, focus rings, dialogs, cookie choices, errors, scrollbars and footer colors use the light palette.
- Semantic bullish/bearish and warning colors remain distinct. Strong accent buttons keep white labels. Pale neutral labels were replaced with deeper foregrounds.
- The default HTML declares a light color scheme and browser theme color. Startup and script-free generated documents use the same light palette; a dark first paint is not part of the new theme.
- The homepage has an original vector study illustration, lighter display typography and reduced visual noise. Curriculum and lecture-series links are available in compact native disclosures. Visible module/tool totals derive from the current content where those counters were touched.
- Favicon and the main social card use the updated identity. Articles keep their original artwork, reading layout and social cards.

## Core palette

| Role | Color |
| --- | --- |
| Canvas | `#f6f7f2` |
| Surface | `#ffffff` |
| Muted surface | `#f0f3eb` |
| Primary ink | `#223b35` |
| Secondary ink | `#52645b` |
| Muted ink | `#5f7064` |
| Primary action | `#256552` |
| Positive | `#25734f` |
| Negative | `#b44746` |
| Warning | `#94631f` |

Calculated contrast pairs: primary ink on white 12.03:1; secondary ink on white 6.30:1; muted ink on canvas 4.89:1; white on primary actions 6.86:1; positive/negative/warning on white 5.76/5.34/5.17:1. Field-outline color on white is 3.38:1. These are measurements of the listed opaque pairs, not a claim that every rendered combination or all accessibility criteria have been certified. [W3C text-contrast guidance](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) informed the choices.

## Scope and maintenance

Routes, canonical URLs, structured data, article content, calculation algorithms and browser-storage keys are retained. Changes to progress helpers are visual descriptors only. Media may retain a black video letterbox or thumbnail overlay; external video imagery is not recolored.

Use semantic colors for new interfaces. Prefer `text-ink`/`text-ink-secondary`, `bg-surface`, `border-line` and `bg-brand text-on-brand`. Use tinted semantic surfaces for notices, and keep an explicit text label for a positive, negative or warning result. Avoid reintroducing dark hard-coded panels or neon text intended for black backgrounds.

Production compilation and static generation accompany this release. Local visual review covers representative reading pages, navigation, tools, forms, charts and dialogs, including a 390px embedded viewport. This is a theme release, not a new performance or trading-content audit.
