# Guided Chart Laboratory update — 21 October 2026

## Why this update

The previous lab displayed the complete authored sequence at every stage and used one generic wrong-answer message. This update improves the lesson-to-practice journey without claiming to measure trading ability.

## Implemented

- Reveal a bounded observation window for the sweep, displacement and gap/reference tasks; future target/outcome candles are not supplied to the chart or its selectors.
- Select a sweep reference from earlier candles and require an actual excursion beyond it within the stated authored window.
- Compare open-to-close bodies only in the stated post-sweep comparison window; equal largest bodies are accepted.
- Search for completed wick-based FVGs only within the authored study window. Preserve candles already revealed in earlier tasks. Use the supplied reference-area task when no gap qualifies.
- Give feedback using the selected candle's high/low or body measurement. Explain middle-versus-outer candle mistakes.
- Track whether the visual hint was used for each completed observation in the current attempt. Direct sub-step entry leaves earlier tasks explicitly not completed.
- Reset state when changing scenarios or restarting; do not save or transmit progress.
- Finish with a three-part review, relevant lesson links and a clear transition to the simulator.
- Original Urdu translations, normal localized links, keyboard-selectable candles and status announcements.

## Rendering and SEO

Existing URLs remain. Static Chart Laboratory pages describe the method and limits, while the browser provides interactive examples. The schema date override now preserves the updated Chart Laboratory content revision instead of reverting to an older illustration date. Fourteen English/Urdu chartlab pages have updated content fingerprints and modification dates. Sitemap count remains 734; no new URLs, redirects or search claims.

## Local review

Production asset compilation and English/Urdu static generation completed. Existing publication translation gate passed. Browser review of the BTC exercise covered bounded candle selectors, selected-price feedback, hint-assisted completion, unassisted completion, progression without reducing visible context, and the final lesson/simulator links. These are preview observations, not an independent trading assessment. No automated test suite was added or run. Changes are local and have not been pushed or deployed.
