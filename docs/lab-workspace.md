> Superseded for the four chart tools by [shared-market-engine.md](shared-market-engine.md), 23 October 2026. Retained as an implementation history.

# Lab workspace implementation notes

This document describes the delivered extension to LearnSMC's existing tools. It is scoped to the lab workspace; the site's CSS remains the authority for fonts, colors, themes and shared controls.

## Shared workspace

The three jobs share navigation and a candlestick board while retaining separate execution models:

| Job | Existing destination | Delivered purpose |
| --- | --- | --- |
| Recognize | `/tools/chartlab/` | Observe a supplied window, identify a candle or FVG band, receive feedback, and review explanations. |
| Decide | `/tools/simulator/` | Record a reason, commit a direction and risk plan, then reveal subsequent candles and review the result. |
| Investigate | `/tools/backtest/` | Configure the implemented FVG rule, scan training data, expose a hold-out sample, and inspect or export results. |

The extension uses existing routes. The shared navigation marks the current page; it does not turn the three jobs into one continuous saved session. Navigation and compact task introductions precede the actual working chart. Study-context links in the simulator open general drills rather than complete implementations of every named model.

## Visual and interaction invariants

- Inherit LearnSMC's sans font role, surface and ink roles, blue action color, and green/red market semantics. `light-theme.css` and `typography.css` remain incumbent sources; the lab does not define a separate palette or font system. Existing site theme behavior remains inherited.
- Use compact headers, ruled navigation, restrained surface layering and rounded working panels. The workspace has a maximum width of 1400px. At widths of at least 1000px, the simulator chart and 320px plan panel share a row; smaller layouts stack them.
- Preserve translated interface text and Urdu RTL reading flow while chart chronology, OHLC values and explicit numeric groups read left to right. Use tabular numerals for price comparison.
- Keep pointer controls accompanied by exact or keyboard-operable controls: candle inspection range, candle selector buttons where selection is available, numeric zone boundaries, and simulator stop/target inputs. Chart toolbar controls carry accessible names and pressed states. Mobile chart toolbar buttons are 44px square.
- The shared board inspects OHLC values, shows all supplied candles or a 12-candle zoom, and moves the zoom window in six-candle increments. Price labels choose precision from the displayed range. FVG marking creates a horizontal price band between two boundaries; it is not a general drawing editor.
- Stop and target handles can be dragged before simulator commitment. Exact stop distance is constrained to 2–10 fictional units and target distance to 1–3R. Entry, stop and target stay fixed after commitment. Replay reveals discrete candles manually or at the selected playback rate; it does not generate intrabar ticks.
- Lab link and button transitions use short color changes (120ms), with transitions disabled for reduced-motion preference. Charts are SVG UI; no raster assets were authored for this extension.

## Data, results and persistence

Recognition exercises use authored illustrative candles and only reveal the current observation window. Completion and hint use describe the current exercise attempt, not trading proficiency or account progress. Observation JSON can be downloaded.

The simulator cycles through synthetic sequences. Results use R, with a fixed 0.05R cost deducted from modeled trades. Stop gaps use the opening price, target gaps use the target price, and candles touching both levels have unresolved outcomes. Manual closure uses the latest displayed close. A positive result does not validate the recorded reasoning. The simulator alone offers device-local save/resume through browser storage, plus a downloadable decision review. This is one saved practice slot, not a shared library.

The backtest starts with synthetic data and optionally processes a local OHLC CSV in the browser. The interface specifies ISO timestamps, unique oldest-first rows, positive prices, and a 20,000-row / 2MB limit. The first 70% is training and the remaining 30% is hold-out. The implemented rule uses a completed three-candle outer-wick gap, next-open entry and a stop at the three-candle extreme; configurable exits include target and holding limit. Costs are fixed R choices (0, 0.05 or 0.10R), not instrument execution estimates. Results expose unresolved OHLC cases separately and exclude them from resolved-result summaries. Trade inspection, experiment JSON and a CSV ledger provide reviewable evidence.

The hold-out exposure flag survives rule edits only while the current backtest component remains mounted. It is not persisted across navigation, reloads or later sessions. Exported experiment data includes the current flag; exporting does not create a resumable experiment library.

## Scope limits

There is no historical or live feed, broker connection, instrument position sizing, higher-timeframe workflow, shared saved library, or cross-tool saved progression. Imported CSV data supplies the backtest's candles; it does not add those services. No new routes or sitewide design-token specification are introduced by this extension.

## Source references

Behavior is implemented in `src/components/VisualChartLab.tsx`, `VisualTradeSimulator.tsx`, `VisualBacktestLab.tsx`, and the shared `labs/LabDesk.tsx` and `labs/CandleBoard.tsx`. Workspace styling is in `src/styles/lab-desk.css`, with incumbent styling in `light-theme.css`, `typography.css` and the site's theme layers. Existing visual review captures are under `outputs/lab-desk`.

These notes were extracted from source. This documentation pass did not run a build, tests or browser review, and does not claim independent accessibility or visual certification.
