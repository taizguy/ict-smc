# Neutral reading palette and linked tool browsing

Reviewed 28 October 2026. UI-only changes; no lesson, tool URL or search metadata changes.

- Reading Room shared palette now uses white (#ffffff) and charcoal (#151515), including its panels, chapter/topic/mentorship views and book preview. Blue controls use #086ac4 with white text in light mode, and #55b7ff with #071421 text in dark mode. Educational chart direction/annotation colors remain meaningful.
- Workbench rows are genuine anchors opening their tool directly. The former inspector's descriptive content is available in grid cards; no tool catalogue data was rewritten.
- Grid/list views share search/category filters and all 10 tools. Both sets of links remain in the browser DOM. The mobile grid is one column with no horizontal overflow. Urdu controls are translated and the layout follows RTL.

Verification: TypeScript and the production build passed, including 10,936 SEO/URL checks and a 787-page crawl. Browser checks covered curriculum overview, Price Delivery topic and FVG lesson theme inheritance; blue lesson links; full-row unit-number navigation to Backtest Lab; filtered search in both tool views; 390px mobile and Urdu grid. Screenshots are in outputs/workbench-reading-update/. Existing sitemap dates remain evidenced; no URLs were introduced and there were zero pending content fingerprints. No Lighthouse/field-performance score or live deployment verification was performed.
