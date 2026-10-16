# Responsive typography

## Decisions

- Source Sans 3 variable (400–700) for navigation, controls, cards and lessons.
- Lora variable (400–700, normal and italic) for editorial display headings and essays.
- System monospace for actual code; interface labels now use Source Sans 3 with tabular numbers.
- Three locally hosted Latin WOFF2 files total 107,432 bytes. Other writing systems use system fallback. SIL OFL licenses are alongside the files.
- Removed the external Geist, Inter and IBM Plex Mono stylesheet requests, their connection hints, old family declarations, duplicate hero overrides and tiny fixed-pixel HTML text utilities. No font package dependencies were installed or required removal. Tailwind still provides layout and responsive utilities.
- Keep the root at 100% to respect browser font preferences. UI text uses rem, generally 16px body, 15px secondary and 13px metadata at the default browser setting. Lesson prose is 16–18px; essays scale approximately 17–19px. Headings use bounded rem + viewport scales, with the homepage display heading 44–92px. Form fields are at least 16px. These are design choices, not Google ranking requirements.
- Unitless leading, balanced headings and roughly 68ch essay width improve sustained reading. SVG chart coordinates retain their own diagram scaling.
- All local fonts use font-display: swap. Only the interface face is preloaded; Lora loads when used. Keep text visible on slow font downloads.

## Primary guidance

- Google web.dev: https://web.dev/learn/design/typography — relative units, clamp bounds, unitless line height, readable measures and WOFF2.
- Google web.dev: https://web.dev/articles/font-best-practices — font delivery and layout shift considerations.
- Material Design: https://m3.material.io/styles/typography/applying-type — distinguish display, heading, body and label roles.
- Google Search Central: https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing — maintain equivalent mobile content and usability.

Google does not mandate a universal website typeface or a single SEO font size. This implementation applies the documented principles to LearnSMC's editorial and tool interfaces.
