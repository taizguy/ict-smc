# Shared chart workspace — 23 October 2026

This replaces the separate SVG chart workspaces described in `lab-workspace.md`. The existing four tool URLs remain unchanged.

## Guided learning revision

The first shared-engine interface exposed a pattern palette without explaining a useful task. User review correctly identified that isolated FVG/OB markings do not supply a complete trading setup. The default interface is now `GuidedMarketDesk.tsx`, with no freehand pattern toolbar.

| View | Learner task |
| --- | --- |
| Chart Laboratory | Follow six gated questions: earlier hourly context, later five-minute sweep, confirmation, completed entry area, invalidation, outcome. Click candles or their numbered buttons. Wrong answers explain the missing evidence. |
| Trade Simulator | Read the full supplied checklist, choose a planned limit or skip, then reveal candles and distinguish pending, filled, invalidated, target and unresolved outcomes. Optional entry/stop changes remain constrained to the stated example. |
| Backtest Lab | Apply the same full checklist to six authored cases. Keep failed, skipped and unfilled cases visible and inspect before/fill/outcome. This teaches a method; it is not historical performance research. |
| ICT Delivery Suite | Move the stop or edit exact prices and observe cash risk, distance and whole-unit sizing for an explicitly fictional $1-per-point instrument. Existing instrument-specific calculators remain below. |

`learningCases.ts` supplies separate earlier hourly context and later five-minute examples. Selected swings and directional interpretation are subjective. The sweep/confirmation/gap sequence, 1.5R filter and stop convention are explicitly this exercise's assumptions, not universal ICT rules. Cases include a loss, no return to entry, missing confirmation and opposing context. No win-rate or edge claim is made from this authored set.

The default session uses `learnsmc-guided-desk-v1`. Earlier workspace data and annotations remain under their original key. The earlier `MarketWorkspace` remains available only through the advanced Backtest disclosure, clearly labeled **isolated FVG geometry**, without claiming to implement the full checklist. The advanced implementation details below apply to that sandbox where indicated.

`marketEngine.ts` owns candles, replay position, previously viewed extent, annotations, draft plan, locked order, completed-order history and notes. `marketExecution.ts` owns the execution semantics used by both simulator and backtest. The chart is an adapter, not a separate source of truth. `useMarketSession.ts` restores and saves the device-local session; navigation flushes pending state. Import/export allows a session to be moved manually. Imported files reset orders rather than trusting supplied execution outcomes.

## Data and execution boundaries

- Initial candles are deterministic synthetic teaching data. Authored scenarios are illustrative, with nominal times anchored to a clearly labeled synthetic UTC date. No exchange feed or historical-record claim is introduced.
- Local CSV accepts 30–20,000 positive-price OHLC rows, oldest-first unique parseable timestamps, within 5 MB. Missing columns, malformed values and duplicate times are rejected. Irregular intervals produce a warning. JSON import is bounded to 8 MB and checked before replacing state.
- Only revealed candles enter the chart and pattern detectors. Grouping combines revealed rows by 1, 3 or 12; it does not claim an exchange-aligned timeframe. Previously seen extent survives rewind/reset. Research intentionally exposes the dataset.
- Limit fills use a favorable opening price or the touched limit. Stops can gap at the open; targets use idealized limit fills. Unknown same-candle ordering remains unresolved. Fixed round-trip R costs are assumptions, not broker estimates. No tick path, margin, partial fills or live trading is modeled.
- Breakeven changes only affect subsequent candles and retain the original planned-risk denominator. Plans cannot be started at the final candle or edited after commitment. A journal transfer creates a clearly labeled draft, not an automatically saved trade.
- The research worker splits the sequence 70/30 and runs each sample independently. A changed rule marks existing results stale. Holdout inspection/tuning is explicitly exploratory. The 100 deterministic shuffled trade-order paths change drawdown/path, not the sum of fixed-R returns; the percentile envelope is neither a confidence interval nor a significance test.
- Pattern references are simplified geometry: completed FVG wick non-overlap, close beyond the prior eight-bar range for BOS, a wick outside and close inside for sweeps, and an opposing candle before a body greater than 1.5× the preceding eight-body mean for OB. They do not identify institutional intent or authenticate a complete ICT model. Matching is one-to-one, within a stated geometry tolerance.

## Rendering and accessibility

Lightweight Charts 5.2.1 supplies native canvas candles, pan/zoom, crosshair, price lines, event markers and equity lines. DOM overlays use public coordinate-conversion APIs. Exact OHLC/price controls, keyboard price adjustment, labeled replay controls and annotation lists supplement pointer interactions. Chart chronology remains left-to-right within the Urdu interface. Site theme tokens, reduced-motion preference and responsive layouts remain authoritative.

The chart package and canvas adapter are separate lazy chunks, so unrelated pages do not load the chart renderer. Worker runs are terminated on replacement/unmount; stale responses are ignored. Theme/resize observers and chart instances are disposed. A canvas failure retains exact-value controls. Browser storage failure offers file export.

Search-facing guides describe the implemented controls and their limits. Existing routes, canonicals and language alternates are preserved; meaningful guide changes receive an explicitly recorded sitemap date rather than a build-clock date.

## Dependency references consulted

- [TradingView documentation](https://tradingview.github.io/lightweight-charts/docs/5.0)
- [Series markers](https://tradingview.github.io/lightweight-charts/tutorials/how_to/series-markers)
- [Official repository and attribution requirements](https://github.com/tradingview/lightweight-charts)
- [Official NOTICE](https://raw.githubusercontent.com/tradingview/lightweight-charts/master/NOTICE)

Apache license and NOTICE are served under `/licenses/`; the native attribution link and a visible credit are retained.

## Further product work

The proposal's optional social challenges, real market feed, volume feed, arbitrary node-based strategy programming, historical scenario batches, statistical inference and instrument-specific fractional sizing are not part of this shared-engine implementation. They require separate data and behavior decisions. No fabricated volume, predictive zones or statistical confidence claims substitute for those features.

## Guided revision review

- Walked through the six Chart Laboratory stages in the browser, including incorrect-context feedback, numbered sweep/confirmation selection, gap interval and invalidation question.
- Verified a paper limit stays pending at a 102.1 low, fills when the later low reaches 101.8, and ends at 1.95R after the stated 0.05R cost.
- Applied the same checklist to all six cases: two target outcomes, one invalidation (-1.05R), one no fill, missing confirmation and opposing-context skips. These counts describe the authored fixtures only.
- Selected the missing-confirmation case and verified no FVG zone or confirmation marker is displayed as valid evidence.
- Verified a $100 planned budget gives 25 whole fictional units at a four-point stop and 20 at five points.
- Inspected English desktop, Urdu dark mode and a 390px phone viewport. Fixed the mobile coach percentage-height expansion; no horizontal overflow in the inspected lesson. Browser error log was empty.
- Production build and existing 1,002 SEO assertions, crawl and routing checks passed. Recorded only changed rendered page fingerprints for 2026-10-23; no pending sitemap dates remained. Existing 13 unmatched Urdu static segments are brand/technical exceptions, with no added guide segments.

This is a guided teaching revision, not a complete historical backtesting platform or a library of every ICT model. Further historical datasets and individually sourced model lessons require separate work.
