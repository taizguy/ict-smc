# Visual learning update — 20 October 2026

## What changed

- Curriculum cards derive their ordinal and total from the 53 published lessons. Underlying chapter IDs, slugs and saved progress are preserved.
- The homepage has an original synthetic candlestick hero, a first-lesson CTA, visual-exercise CTA and free-resource link. Animation is finite, pausable and respects reduced motion.
- Light, dark and device theme choices persist locally. A small early script applies the chosen theme before the app paints. Shared palettes cover reading views, tools, navigation and Urdu pages.
- Chart Laboratory teaches recognition through three tasks on six authored examples. Candle selection, visual hints and 12-candle zoom work with keyboard controls. FVG boundaries are calculated from outer-candle non-overlap; the fallback exercise uses an annotated reference area.
- Trade Simulator locks a long/short/wait decision before revealing future candles. Four fictional sequences illustrate favorable moves, adverse moves, sideways action and gaps. These are general execution drills, not complete implementations of each named ICT model.
- Backtest Lab scans an explicit teaching rule on synthetic candles or a local OHLC CSV. It enters at the next open, uses the three-candle extreme as a stop, allows one position at a time and separates chronological 70/30 samples. Result tiles open individual trade charts; a CSV ledger supports independent review.
- The new `/resources/ict-smc-cheat-sheet/` page and Urdu equivalent contain twenty original definitions, three diagrams, a checklist, attribution instructions and source links. Four-page PDF editions are free without registration.

## Interpretation and execution limits

The demos are synthetic, with no live prices or brokerage connection. A named route is study context, not verified model performance. Both-barrier candles have an unknown intrabar sequence and are excluded from resolved net R. Stop gaps fill at the open; target gaps use an idealized target fill. Fixed R costs do not model position sizing, actual spreads, liquidity or all slippage. Repeated inspection contaminates a hold-out sample.

CSV processing happens in the browser, with no upload service. Inputs require 30–20,000 chronological candles, valid positive OHLC values and a 2 MB limit. The downloadable CSV is explicitly synthetic.

## Search and accessibility

The resource is prerendered in both languages, linked from home and the labs, included in the sitemap and described with DigitalDocument/MediaObject schema. Each PDF has an HTTP canonical pointing to its language's resource page. The CSV template is a noindex utility asset. English and Urdu PDF encoding languages remain distinct in localized schema.

Content fingerprints record real page changes; unrelated lastmod dates remain unchanged. Theme controls, chart selectors and result tiles are keyboard accessible. Chart time and signed R values remain left to right within Urdu layouts.

## PDF maintenance

The checked-in production files are under `public/downloads/`. Local delivery copies are ignored under `output/pdf/`.

1. Update definitions in `src/data/cheatSheet.ts` and the Urdu translations in `src/i18n/learning-update-urdu.json`.
2. Export their data: `node --import tsx scripts/export-cheat-sheet.ts`.
3. Install optional local authoring dependencies: `python -m pip install reportlab pypdf arabic-reshaper python-bidi`.
4. Set `LEARNSMC_URDU_FONT` to an appropriate TTF font when Arial is not available at the Windows default path.
5. Run `python scripts/generate-cheat-sheet.py`. Update the explicit review date in the page, schema and PDF source when reviewing content.
6. Render and visually inspect all eight PDF pages, especially Urdu shaping and signed arithmetic. Run the site build, record changed-page dates with `npm run seo:record -- --date=YYYY-MM-DD`, then rebuild.

## Checks performed

- TypeScript passed. Production build passed 1001 URL/canonical/sitemap/redirect checks; 762 rendered documents passed crawl, schema, link and routing checks.
- Desktop light/dark home, chart hints/zoom/completion, simulator target and stop outcomes, training/hold-out locking, trade inspection, and Urdu mobile flows were checked in the browser.
- CSV template parsing and ambiguous/gap-loss arithmetic were inspected directly. The PDFs have four pages each and all pages were visually reviewed.
- The browser download-verification operation stalled; the generated and production PDF copies were instead confirmed to have identical SHA-256 hashes. A full cross-device/browser compatibility audit has not been performed.
