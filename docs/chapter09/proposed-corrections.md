# Chapter 09 — approval before editorial changes

The manuscript has been read in full. No production article content has been changed. Existing URL and permanent ID 7 will remain; its course display number is 09.

Please approve the following narrowly scoped corrections, or instruct me to preserve the original. Exact headings, section order, table structures and other wording will stay. Matching occurrences in takeaways, glossary, FAQs and visual captions will use the same approved correction so the page does not contradict itself.

## 1. A convention, not a universal institutional rule
Original: “In Smart Money Concepts (SMC) and institutional price action, a swing point is defined by an exact three-candle sequence (`C1`, `C2`, `C3`). There are no trendlines, moving averages, or subjective guesses involved.”
Proposed: “This chapter uses a strict three-candle swing convention (`C1`, `C2`, `C3`). Once the timeframe, closed-bar rule and treatment of ties are fixed, the comparison is mechanical. Choosing which swing matters still requires context; other swing definitions use different lookbacks.”

## 2. Equal highs do not later become a strict three-bar pivot
Original: “If two adjacent candles share the exact same high tick, wait for a candle that breaks higher or closes lower to confirm which bar holds the pivot.”
Proposed: “If two adjacent candles share the exact same high tick, neither qualifies at that point under this strict greater-than rule. A later lower close does not retrospectively remove that tie. An equal-high zone requires a separately stated convention.”

## 3. Keep observed prices separate from inferred orders and motives
Apply to the definite stop-cluster, absorption, algorithm-targeting and institutional-defense claims in takeaways and Sections 3, 4, 7, 9, 10, 13, 16, 17, 19 and 20.
Proposed wording standard: “In ICT/SMC teaching, traders infer that stop and breakout orders may cluster beyond prominent swings. Candles show the traded extremes and later price path; they do not reveal the orders, participant identities or motives. A protected swing is a selected structural invalidation reference, not a guarantee of defense or a safe stop.”
Example B ending proposed: “…forms a new Higher Low (`HL`). An illustrative stop reference of `5,879.50` is 3 ticks below the protected low; it is not a safe or universally appropriate buffer.”
Example A ending proposed: “In the chart-liquidity convention, `20,469.00` is one tick above the swing and can be marked as a hypothetical stop reference; actual resting orders are not known from these invented candles.”
The worked prices, arithmetic and formation examples remain unchanged.

## 4. Hierarchy requires neighboring pivots, not an FVG shortcut
Original shortcut: “…that pivot almost always matures into an Intermediate-Term Low (ITL).”
Proposed: “An FVG rebalance or sweep can supply context, but it does not promote an STL to an ITL. Under the hierarchy above, the pivot becomes an ITL only after higher neighboring STLs on both sides are confirmed; an LTL requires the corresponding neighboring ITLs.”
For the illustration: reveal enough additional confirmed neighboring pivots during zoom-out; do not imply that nine candles establish every tier.

## 5. Maintenance closure and session definitions
Original Section 5 example: a swing forms during the “5:00 PM to 6:00 PM CME futures maintenance break.”
Proposed: use “a quiet trading period before the daily maintenance closure” and explicitly state that no new traded candles form during the closure.
Original RTH rule applies “9:30 AM to 4:15 PM NY time” across equity, gold and oil futures.
Proposed: “For the ES/NQ examples, distinguish the US cash-equity window (09:30–16:00 America/New_York) from the contract’s Globex trading schedule and your platform’s RTH template. The cash window is a chart convention here, not the trading schedule of every futures contract. Confirm the selected contract, holiday schedule and session template.”
Retain the verified ES/NQ 0.25-point tick examples. Remove claims that a session label alone establishes depth or institutional quality.

## 6. Unsourced fixed buffers and near-certainties
Original examples: “almost always fail,” “rarely hold on a third approach,” “routinely sweep … 2 to 8 ticks,” and “Place stops at least 3 to 8 ticks.”
Proposed: “These are possible outcomes or illustrative settings, not measured probabilities or universal risk rules. Define any equal-price tolerance and stop buffer in advance for the selected instrument; show both holds and breaks, account for volatility, spread and slippage, and do not infer an edge from the pattern alone.”
Keep any retained numeric tolerance explicitly labelled an illustrative study convention, rather than an empirically verified rule.

## 7. Back-adjustment changes historical levels
Original: “Always enable Back-Adjustment …”
Proposed: “State whether the continuous chart is back-adjusted. B-ADJ removes roll gaps by shifting earlier contract prices, so adjusted historical swing levels may differ from the original traded contract. Use a consistent setting and check the actual contract before applying exact prices.”

## 8. Code must record the confirmation close
Original detector stores `confirmed_at: c3.time` without defining whether time is the bar open or close; its warning also treats a retrospective drawing as a trade.
Proposed code convention: inputs have explicit `open_time`, `close_time` and `is_closed`; exclude unfinished bars; store `pivot_time: c2.open_time` and `confirmed_at: c3.close_time`.
Proposed warning: “A confirmed marker can be drawn retrospectively at C2 if its later confirmation time is retained. A backtest must not act on it before C3 closes.”

## 9. Fractal contrast and closed-bar validator
Keep the three-versus-five-bar comparison, but label the early three-bar pivot and the later higher candle separately. Do not say a five-bar filter universally ‘misses’ a true reversal or that a live drag alone confirms a pivot. The widget must distinguish C3 open from C3 closed and include ties, lows and outside-bar cases.

## 10. Link only to a real practice tool
Repository search found no “Swing Markup Drill (NQ 15M)” or corresponding automated hierarchy validator.
Proposed Section 21 tool text: “Open LearnSMC Chart Lab to practise chart observation. For this chapter’s exact three-candle check, use the Swing Validator above.”
No new Chart Lab scenario is implied or added. Chapter prerequisite and next-reading links keep their actual current destinations and publication status.

## References to retain/verify or add with permission
The brief names one Williams Fractal video. I can retain it only with an accurately verified title and scope; I will not claim it is an official ICT source.
Proposed additional sources:
- CME ES and NQ contract specifications: ticks and contract schedules.
- TradingView Williams Fractal documentation: standard five-bar lookback.
- TradingView back-adjustment documentation: earlier prices are shifted to remove roll gaps.
- Investor.gov stop-order bulletin: stop orders and uncertain execution; it does not establish hidden stop locations from candles.

Official documentation consulted so far:
https://www.cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.contractSpecs.html
https://www.cmegroup.com/markets/equities/sp/e-mini-sandp500.contractSpecs.html
https://www.tradingview.com/support/solutions/43000591663-williams-fractal-indicator/
https://www.tradingview.com/support/solutions/43000685266-how-can-i-enable-backadjustment-for-continuous-futures/

No claim that technical schema guarantees AI citations or rankings will be published. Part 3 is implementation guidance, not reader copy.
