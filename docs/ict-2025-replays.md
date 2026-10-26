# 2025 mentorship — historical chart replay revision

Reviewed 26 October 2026.

## What changed

Abstract line/rectangle teaching widgets were replaced by 15 source-labelled historical candlestick examples across all 12 lessons. The renderer is TradingView Lightweight Charts (the existing Apache 2.0 dependency); the price source is Yahoo Finance, not TradingView’s hosted feed. The attribution logo and source links remain visible. These are 2026 market examples illustrating concepts in the 2025 learning path, not reconstructed ICT executions.

The midpoint/gap chapter now places a separate chart under each matching explanation: midnight timed range, declared RTH reopening gap and daily weekly-opening reference. The workshop tab switches among these views. Lunch also separates post-10:00 swing confirmation from the afternoon range. NQ/ES comparisons share timestamps. Venom uses actual one-minute closes. Options distinguish underlying index prices from a separately labelled hypothetical payoff calculator.

## Provenance and limitations

Public Yahoo Finance chart endpoints supplied NQ=F and ES=F historical minute candles, NQ daily candles, S&P 500 index daily candles (^GSPC), and five-minute NQ candles for 16 September 2026. Raw downloads are private research artefacts under outputs/ict-2025-replay. The public snapshots contain only the selected OHLC observations, in ascending Unix UTC timestamps, with no interpolation of missing prices and no invented volume. SPX prices follow the feed’s two-decimal display precision; calculated range references retain fractional precision. Each metadata record carries a SHA-256 for its associated JSON snapshot.

NQ=F and ES=F are provider-labelled futures series, not a promise of the identical contract adjustment/session used by every platform. New York labels use America/New_York. Daily bars carry the provider’s trading-date labels and must not be read as exact intraday opening timestamps. The weekly gap example explicitly uses Friday-close/next-daily-open references; incomplete Sunday-minute data was not presented as the actual first reopening tick. The RTH example declares 09:30–16:15 and uses the 16:14 bar close; it is not labelled exchange settlement.

The Federal Reserve’s September 2026 calendar and meeting page independently confirm the 14:00 statement and 14:30 press conference. The chart does not claim those events alone caused every movement. No hypothetical premium, simulation fill or performance rate is represented as a historical execution.

## Learning and rendering safeguards

- Full candle data is fetched from same-origin static assets only when a player approaches the viewport. No browser API key or live external market-data request is required.
- Replay sends only revealed candles to the chart series. Final ranges and zones appear after their declared recognition count. Loading/error previews also hide later candles and unknown price references.
- Calculated midpoints may lie between valid futures ticks; the interface says a reference is not automatically an executable order price.
- The loading placeholder reserves the chart footprint; controls wait for data. Timers stop on pause, unmount or hidden document.
- Text explanations, source information, comparison tables, FAQs and SVG previews remain in static HTML. Revealed OHLC tables provide an accessible alternative to canvas inspection.
- JSON snapshots use application/json and X-Robots-Tag:noindex. They are assets rather than additional indexable lesson URLs.
- Sitemap fingerprints now include market-data hashes and replay preview geometry so changed datasets can receive evidenced revision dates.

## Internal links

Each lesson now contains selective in-body prerequisite/model/practice links, alongside the existing next-reading block, glossary links and model workshops. A source-level bilingual audit checks 5–11 unique contextual destinations per English chapter and at least 5 per Urdu chapter. Full anchor phrases receive an underline and destination-specific background/text treatment: blue curriculum, teal glossary, purple tools. Dark palettes retain readable contrast. Options premium is explicitly excluded from premium/discount-range matching.

## Cases

| Chapter ID | Case | Provider symbol | Interval | New York date range | Candles |
|---|---|---|---|---|---|
| 24 | The 09:30–10:00 range, candle by candle | NQ=F | 1m | 2026-10-19 to 2026-10-19 | 61 |
| 58 | Midnight range: measure 00:00–00:30 | NQ=F | 1m | 2026-10-18 to 2026-10-19 | 90 |
| 58 | RTH gap: yesterday’s close versus the next open | NQ=F | 1m | 2026-10-19 to 2026-10-20 | 58 |
| 58 | Weekly gap reference on daily candles | NQ=F | 1D | 2026-10-13 to 2026-10-21 | 7 |
| 25 | Three real candles: measure before qualifying | NQ=F | 1m | 2026-10-20 to 2026-10-20 | 51 |
| 59 | Twenty completed sessions, one fixed range | NQ=F | 1D | 2026-09-21 to 2026-10-21 | 23 |
| 26 | ES breaks its high first; NQ catches up | NQ=F | 1m | 2026-10-19 to 2026-10-19 | 31 |
| 60 | Old high, excursion and response | NQ=F | 1m | 2026-10-19 to 2026-10-19 | 46 |
| 53 | Venom context: range before response | NQ=F | 1m | 2026-10-19 to 2026-10-19 | 136 |
| 61 | A post-10:00 swing needs confirmation | NQ=F | 1m | 2026-10-19 to 2026-10-19 | 26 |
| 61 | The afternoon has its own range | NQ=F | 5m | 2026-10-19 to 2026-10-19 | 19 |
| 62 | FOMC: two scheduled information events | NQ=F | 5m | 2026-09-16 to 2026-09-16 | 25 |
| 27 | Reveal the week one completed day at a time | NQ=F | 1D | 2026-10-16 to 2026-10-23 | 6 |
| 63 | Index movement is not an option payoff | ^GSPC | 1D | 2026-10-19 to 2026-10-23 | 5 |
| 64 | Write your decision before revealing the next candles | NQ=F | 1m | 2026-10-20 to 2026-10-20 | 51 |

## Reproducible validation

Run `npx tsx scripts/verify-2025-replays.ts` for source hashes, OHLC validity, time ordering, recognition boundaries, complete thirty-minute ranges, aligned SMT observations, the Venom closing sequence and all-chapter coverage. Standard `npm run build`, `npm run lint` and `npm run test:seo` remain the site-wide checks. Browser evidence is saved under outputs/ict-2025-replay.
