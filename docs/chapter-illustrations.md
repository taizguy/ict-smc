# Chapter illustrations

20 October 2026: 53 original SVG scenes cover the 53 published chapters. IDs and lesson URLs are unchanged. Every scene has distinct geometry and a three-step teaching sequence; no generic illustration is repeated across the catalogue.

- Curriculum cards and mentorship suggested-reading lists show lightweight thumbnails.
- Lessons have a larger illustration with play/pause/replay and individually selectable steps. All steps remain readable without playing.
- Animation is user initiated and finite. Card hover/focus animation lasts under three seconds; lesson playback stops after three stages. Leaving the browser tab pauses playback.
- Reduced-motion preferences disable CSS animation and replace lesson playback with manual steps. Controls are keyboard accessible and have at least 44-pixel targets.
- Geometry keeps time flowing left to right in either language. Titles, labels, captions and controls use the current language. Original lesson text, sources, progress and routes remain intact.
- Static English and Urdu HTML includes the SVGs and textual explanations. No external images, new dependencies or third-party scripts are needed. The SVG view box reserves layout space.

## Content conventions

The FVG example uses candle 1 high at y=112 and candle 3 low at y=82: the shaded interval is precisely between those prices, with a midpoint at y=97. Screen y increases downwards. The order-block example separates a reference down candle, upward displacement and a hypothetical revisit; it does not identify an institution's inventory or guarantee mitigation. Sweeps are observed excursions through preselected levels, not proof of stop quantities.

The Suspension Block scene uses a first body spanning y=110–137 and a second spanning y=61–85. The body gap is y=85–110, while wicks overlap at y=92–118. It is explicitly distinguished from a standard wick-to-wick FVG. It does not claim that this schematic authenticates every Reaper variation. Other scenes cover matching queues, chart structure, sessions, COT publication delay, risk ratios, top-down planning, alternative profiles and conditional model examples.

These are schematics, not quotes, historical trade records, forecasts or evidence of performance. They supplement the existing source panels; the wider content-source review remains incomplete.

## Maintenance

Scene definitions live in `src/data/chapters/diagrams.ts`, the renderer in `src/components/ChapterDiagram.tsx`, styles in `src/styles/chapter-diagrams.css`, and translations in `src/i18n/diagrams-urdu.json`. Extend the scene map explicitly when adding a chapter. Do not guess a diagram from a chapter title or randomly reuse a pattern.

The sitemap content fingerprint includes chapter SVG geometry as well as its captions. Record substantive illustration edits with the editorial date workflow in `docs/sitemap-dates.md`. Illustration modification dates are distinct from source-review dates; adding art does not imply the entire lesson was reverified.

## Checks

The production build and existing translation, crawl, schema and routing checks pass. Coverage inspection confirms 53 distinct drawings, no missing chapter IDs and valid candle high/body/low ordering. Browser inspection confirms 53 curriculum thumbnails, working FVG playback and step controls, localized Urdu content, and no horizontal overflow in the mobile lesson/mentorship views checked at 390 pixels. The reduced-motion branch was inspected in code; an OS-level preference change was not performed.
