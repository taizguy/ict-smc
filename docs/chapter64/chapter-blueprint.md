# Original content and search blueprint — Chapter 64

Research draft, 14 November 2026. This is a proposed chapter structure and original explanatory material, not a published lesson or a reproduction of ICT's transcript. Source confidence and unresolved attribution checks are in `research-and-source-map.md`.

## Search identity

- Existing URL: `/learn/silver-bullet-model/`; keep it.
- Proposed title: **ICT Silver Bullet: Times, FVG Entries & Futures | LearnSMC**.
- Proposed H1: **ICT Silver Bullet: Time-Windowed FVG Entries**.
- Retain the course-map title as the chapter identity; adding ICT makes the primary topic clear naturally.
- Proposed description: **Learn the ICT Silver Bullet model: New York time windows, FVG entries, futures tick values, worked examples, failed setups and rules for standing aside.**
- Primary intent: comprehensive explanation and precise decision rules. Existing Chart Lab remains a practice page, Masterclass a concise visual walkthrough, glossary a definition. Do not make four near-identical competing articles.
- Secondary terms belong where useful: Silver Bullet times, New York time, Pakistan time, FVG entry, NQ/MNQ, ES/MES, market structure shift, draw on liquidity, limit order, no trade and backtest. No keyword-density target or meta keywords.

## Proposed opening answer

The ICT Silver Bullet is a time-based entry framework taught by Michael J. Huddleston. It combines a selected price objective with a fair value gap during a specified New York-local window. The commonly taught windows are 03:00–04:00, 10:00–11:00 and 14:00–15:00. The hour tells you when to look; it does not make an FVG a complete trade, guarantee a fill or establish a profitable edge.

For futures learners, the useful question is not “Can I find a gap between ten and eleven?” It is “Can I explain the context, identify a completed setup without future information, and follow a written entry and risk rule—even when the answer is no trade?”

## Complete heading hierarchy and teaching content

### H2 1. What is the ICT Silver Bullet model?

Explain the framework in ordinary language before abbreviations. A time filter narrows observation; a price framework supplies references; an entry rule defines participation; risk and order rules define what happens if the interpretation fails. None substitutes for the others.

Use a short “After this chapter” list: read the three windows; draw a wick-defined FVG; distinguish candidate, confirmed setup, pending order and fill; calculate futures point/tick exposure; identify a loss, no-fill and correct skip without changing rules afterwards.

### H2 2. What should you understand before using it?

Introduce OHLC candles, confirmed swings, inferred liquidity references, displacement, MSS, FVG and limit orders in that order. Provide contextual links to published chapters/glossary entries rather than a glossary pasted repeatedly into each paragraph. Say plainly that a one-minute chart can be harder to interpret, not inherently more accurate.

Explain futures versus spot forex versus an index CFD: symbols can track similar prices while contract value, trading venue, spread, sessions and data feed differ. Do not apply NQ's $20 multiplier to a broker's NAS100 CFD.

### H2 3. What are the Silver Bullet times?

Use New York local time, not “EST all year.” These are framework observation windows, not exchange opening hours or a statement that each window is equally suitable for each instrument.

| Window | New York local | UTC during EDT | UTC during EST | Karachi during EDT | Karachi during EST |
|---|---|---|---|---|---|
| London | 03:00–04:00 | 07:00–08:00 | 08:00–09:00 | 12:00–13:00 | 13:00–14:00 |
| New York AM | 10:00–11:00 | 14:00–15:00 | 15:00–16:00 | 19:00–20:00 | 20:00–21:00 |
| New York PM | 14:00–15:00 | 18:00–19:00 | 19:00–20:00 | 23:00–00:00 next day | 00:00–01:00 next day |

These offsets are explanatory examples; implementation must derive values for a selected date with IANA zones and include the destination date. Pakistan does not shift for US DST. Europe/US transition weeks can change the relationship to a trader's local London clock even while the New York window stays fixed. Holidays, exchange schedules and early closes require separate checking.

#### H3 Set the chart clock before marking candles

Choose `America/New_York`; confirm whether timestamps label bar opens. A 10:59 M1 bar closes at 11:00. If the written eligibility interval is `[10:00,11:00)`, an event known only at 11:00 is outside it. That half-open convention is our explicit reproducible boundary, not an invented universal ICT quotation.

### H2 4. The complete setup: context before the gap

Describe the destination first: a selected prior high/low or other meaningful reference, why it is being watched, and what would invalidate the interpretation. These are hypotheses, not visible inventories of stops.

Then show a liquidity event, directional movement, selected swing break and a completed gap. Do not state that a sweep proves manipulation, that displacement proves institutional participation, or that a gap reveals unfilled bank orders.

### H2 5. A step-by-step Silver Bullet checklist

Use a real numbered list with a distinct illustration per step:

1. **Write the context before the window.** Record instrument/contract, date, chart timeframe, session and target reference. A blank destination is a reason to pause.
2. **Check the clock.** Confirm the chosen NY-local window and bar-close policy. A familiar pattern outside the rule is a different sample.
3. **Observe the liquidity event.** Compare price with a level selected earlier; distinguish a wick through the level from acceptance beyond it.
4. **Wait for the chosen confirmation.** If our study requires an MSS close, name the swing and wait for the close. A moving swing selected after the rally is hindsight.
5. **Confirm and measure the FVG.** Wait for C3, use the outer wicks, and reject overlap or zero-width contact.
6. **Write the order, invalidation and objective.** Choose edge or CE before the retracement; calculate stop distance and dollar exposure; set cancellation conditions.
7. **Observe the actual outcome.** Record fill, no-fill, expiry, loss or target according to the declared model. Never turn a missed limit into an imaginary market fill.

Label this an explicit learner study variant where its filters exceed verified source wording. Keep the source teaching, editorial interpretation and chosen test rules visually identifiable without overwhelming the reader with process commentary.

### H2 6. How do you draw the entry FVG?

For closed C1/C2/C3, a bullish gap is `(C1 high, C3 low)` when `C3 low > C1 high`. A bearish gap is `(C3 high, C1 low)` when `C3 high < C1 low`. The midpoint is `CE = (lower bound + upper bound) / 2`. C2 may have traded through this entire range: an FVG is not a claim that no transactions occurred there.

| Feature | Bullish FVG | Bearish FVG |
|---|---|---|
| Outer-wick comparison | C3 low > C1 high | C3 high < C1 low |
| Lower bound | C1 high | C3 high |
| Upper bound | C3 low | C1 low |
| Intended retracement | Down into the gap | Up into the gap |
| Example bounds | 20,004–20,006 | 20,004–20,008 |
| Example CE | 20,005 | 20,006 |
| Important limit | Can fail, never revisit or be too late | Can fail, never revisit or be too late |

Explain an unfinished C3 separately. Its low/high can change and remove a provisional gap. Invalidation of an existing trade is not the same as discovering that a provisional pattern never completed.

### H2 7. Which FVG, entry and stop rule are you testing?

| Decision | Possible written variants | Why the distinction matters |
|---|---|---|
| Candidate selection | First qualifying gap; later qualifying gap under explicit conditions | Choosing the eventual winner retrospectively changes the method. |
| Entry price | Near edge; CE; another predefined price | Changes fill rate, exposure and missed opportunities. |
| Confirmation | Fresh sweep plus MSS; other explicitly sourced context | Do not call one community checklist universal. |
| Stop | Beyond selected sweep; another stated structural reference | A narrower stop changes the setup and loss distribution. |
| Expiry | Fill before hour end; separately studied later-fill policy | Formation time and fill time are different events. |
| Target | Preselected reference; a declared R objective | A target is not guaranteed and should not move after seeing the result. |

Do not invent a universal wick buffer, minimum candle-body percentage, required 2R, 1% risk or rule that CE is always superior. Tick-round midpoint prices explicitly: if CE is off-grid, specify rounding or use a different valid entry.

### H2 8. Formation, entry and exit: three different clocks

Show a timeline with C3 closing at 10:58, an order submitted after that confirmation and a retracement at 11:02. Under a fill-inside-hour rule, this is a missed eligible entry. Under a separately defined later-fill experiment it is another sample; do not silently rename it the same test. A position filled at 10:59 may remain open after 11:00 if its written management permits it. The original selected ICT passage explicitly distinguishes entry within the hour from exit within the hour.

### H2 9. Bullish worked example: from sweep to planned return

**Illustrative, invented prices. Synthetic NQ-style M1 data; teaching date 12 January 2026; `America/New_York` (EST), not a historical NQ contract or real trade.** All rows label opens; closes occur one minute later. Prior selected low 19,996; selected confirmation high 20,004; objective 20,022.

| NY bar open | Open | High | Low | Close | What becomes knowable at close |
|---|---:|---:|---:|---:|---|
| 10:03 | 20,000 | 20,001 | 19,994 | 19,997 | Prior low traded through; motives unknown. |
| 10:04 (C1) | 19,997 | 20,004 | 19,996 | 20,002 | First outer-wick reference fixed. |
| 10:05 (C2) | 20,002 | 20,010 | 20,001 | 20,009 | Close above selected 20,004 swing; C3 still unknown. |
| 10:06 (C3) | 20,009 | 20,012 | 20,006 | 20,011 | At 10:07, bullish gap confirmed: 20,004–20,006. |
| 10:07 | 20,011 | 20,012 | 20,007 | 20,008 | CE 20,005 not reached. |
| 10:08 | 20,008 | 20,009 | 20,004.50 | 20,006 | Trades beyond CE; a simplified eligible-fill model may activate. |
| 10:09 | 20,006 | 20,015 | 20,005.50 | 20,014 | Moves away after the modeled entry. |
| 10:10 | 20,014 | 20,023 | 20,012 | 20,022 | Objective traded in this authored path. |

Plan: entry 20,005; stop trigger 19,993.75 (one tick below the illustrative sweep extreme); target 20,022. The buffer is an example, not a recommended universal distance. Distance 11.25 points = 45 ticks. NQ pre-cost exposure per contract is $225; MNQ $22.50. Target distance 17 points; planned reward/risk about 1.51R before costs. No commissions, queue position or slippage is proved by these bars. A stop trigger is not a guaranteed stop fill.

Explain why the entry is unavailable before 10:07 and why the 10:08 candle cannot prove a broker fill. The example teaches chronology and arithmetic, not live performance.

### H2 10. Bearish worked example: the same logic in the other direction

**Illustrative, invented ES-style prices; M1, 12 January 2026, New York EST; not an actual contract trade.** Selected prior high 6,008; raid high 6,010. C1 low 6,006, C3 high 6,004 creates bearish FVG 6,004–6,006 after C3 closes. CE 6,005; stop trigger 6,010.25; selected objective 5,994. Entry distance 5.25 points = 21 ticks; ES $262.50, MES $26.25 before costs. Objective distance 11 points; planned ratio about 2.10R.

The eventual animation needs its own fully specified OHLC series, timestamps and an independent composition—not the bullish chart reflected with new labels. Do not describe this arithmetic plan as an observed market result or completed dataset.

### H2 11. A valid-looking setup that loses

Keep the bullish example's history through the modeled entry. At 10:09 in a distinct failed branch, use O 20,006 / H 20,007 / L 19,992 / C 19,993. The planned stop is crossed before the later target, producing a modeled loss under the stated assumptions. A later recovery does not erase the stop event or justify widening risk.

Explain the difference between a setup qualifying at decision time and an outcome being favorable. If rules only count winning charts as “valid,” the explanation is circular.

### H2 12. Missed entries and correct no-trade decisions

Build separate examples: (a) target trades before retracement; (b) hour ends before fill; (c) C3 overlaps C1 so no gap; (d) apparent sweep continues rather than shifting; (e) no usable target/context. Do not reuse “wait for confirmation” as the answer to every case.

| Observed situation | Honest classification | What not to do |
|---|---|---|
| No completed gap | No setup under this rule | Pretend an unfinished gap was confirmed. |
| Gap exists but no return | Unfilled | Count a paper profit from an unplaced/untouched entry. |
| Return after expiry | Expired / outside selected rule | Quietly extend the window because it won. |
| Fill followed by stop | Modeled loss | Relabel the setup invalid only after the loss. |
| Fill and stop touched in one OHLC bar | Intrabar sequence unresolved without more data | Always assume the favorable event order. |

### H2 13. Why a candle touch does not prove a fill

Separate traded-price geometry from an executable bid/ask and exchange queue. A limit price protects against a worse fill but does not guarantee execution. Stops differ by type; a stop-limit may remain unfilled. Model submission latency, tick increments, spread, commissions, slippage and partial fills honestly.

An OHLC bar stores four extrema/values, not the entire path. Two intrabar sequences can have the same OHLC and different entry/stop ordering. Show uncertainty directly; a beautiful animation must not invent a favorable hidden path and present it as market evidence.

### H2 14. Futures point, tick and risk calculations

| Contract | Dollars per point | Outright tick | Dollars per tick | 8-point exposure / contract before costs |
|---|---:|---:|---:|---:|
| NQ | $20 | 0.25 | $5 | $160 |
| MNQ | $2 | 0.25 | $0.50 | $16 |
| ES | $50 | 0.25 | $12.50 | $400 |
| MES | $5 | 0.25 | $1.25 | $40 |

`price distance = abs(entry - stop reference)`; `ticks = distance / tick size`; `planned dollar exposure = points × point value × contracts`. Include costs separately and explain that stop slippage can exceed the planned price distance. Margin is collateral, not maximum loss. Ten micros are not fee-equivalent to one mini automatically. Continuous-contract roll/back-adjustment can move historical references; record the actual feed/contract settings.

### H2 15. What timeframe and market should you study?

Explain a parent/execution timeframe pair as a chosen study design, not a universally optimal setting. M1 offers more detail and more noise; M5 can hide event order; seconds/ticks add detail but require suitable data. Index futures, forex and gold are not interchangeable. No reliable comparison in this research establishes the most profitable instrument or timeframe.

### H2 16. News, holidays and changing conditions

Separate scheduled releases from guaranteed direction. A 10:00 release can coincide with the window but does not ensure an FVG or safe fill. Thin conditions, holidays, early closes, unusual volatility, contract roll and spread changes can undermine the chosen execution assumptions. Define exclusions before testing; do not remove losing news days after inspection.

### H2 17. Silver Bullet versus related ICT concepts

| Concept | Main question | Difference from Silver Bullet |
|---|---|---|
| General FVG | Is there an outer-wick gap? | Geometry alone has no session or complete entry plan. |
| 2022 model | How do context, liquidity, confirmation and FVG combine? | Broader framework; Silver Bullet adds a named hourly focus. |
| Killzone | When should I observe? | Broader session convention, not a complete entry by itself. |
| Macro | Which shorter timing interval is being discussed? | Not synonymous with the full Silver Bullet hour. |
| Judas swing | Is an early move being interpreted as a false move? | Possible context; not every Silver Bullet is the same session-open narrative. |
| Power of Three | How might a range, excursion and expansion relate? | Higher-level interpretation, not proof that a qualifying entry must appear. |

### H2 18. Common mistakes and myths

Table: fixed EST offset → date-aware NY clock; big candle = FVG → compare outer wicks; sweep = reversal → require chosen evidence and accept continuation; all gaps traded → context/selection rule; target reach = profit → establish entry first; 11:00 = forced exit → distinguish entry and management; named model = proven edge → test a frozen rule; best-looking gap = first qualifying gap → retain chronology.

### H2 19. How to backtest without teaching yourself hindsight

Freeze instrument, dates, window, swing rule, confirmation, gap geometry, expiry, entry, stop, target, costs and ambiguity treatment. Record every watched window, including no setup, skips and non-fills. Use chronological holdout data; changing filters creates a new version requiring new testing. Explain expectancy, sample size, drawdown and fill rate without inventing a dataset or percentage. Link to the real Backtest tool with its present limitations; do not imply its generic cases are a verified historical Silver Bullet backtest.

Suggested journal columns: date, contract/feed, timezone, window, rule version, context, prior level, sweep time, confirmation time, C1/C3 bounds, signal-known time, order time, expiry, entry/stop/target, fill status, outcome, costs, uncertainty and screenshot. A printable rule card would be a useful future asset; do not publish a dummy download button.

### H2 20. Practice: explain the evidence before seeing the ending

Three applied questions: identify when a gap becomes knowable; classify a late retracement under a stated policy; compute MNQ exposure from a tick-valid stop. Add a fourth OHLC-ambiguity question. Give explanatory feedback, not only red/green correctness. Link to `/tools/chartlab/nq-silver-bullet-short/` for existing five-path practice, explicitly identifying its stricter authored conventions.

### H2 21. Frequently asked questions

Use native exclusive details/summary; answers in initial HTML. The following are proposed original answers, informed by actual PAA, Reddit and guide comments. They are not copied quotations.

**What is a Silver Bullet in ICT trading?** It is a time-based framework combining a selected price objective with an FVG entry during a named New York-local window. The time filter alone is not a complete setup or evidence of profitability.

**What are the ICT Silver Bullet times in Pakistan?** New York AM 10:00–11:00 corresponds to 19:00–20:00 Karachi during US daylight time and 20:00–21:00 during US standard time. Choose the actual date; the PM conversion can fall on the next Karachi calendar day.

**Does the Silver Bullet have a proven win rate?** This research did not establish a universal independently verified rate. A percentage depends on the rule set, instrument, dates, costs and fill assumptions. Personal reports and promotional claims do not establish the result a reader will obtain.

**Is a liquidity sweep or MSS always required?** Many teaching checklists require them, but specific filters and swing choices vary. This chapter should state its learner study variant and distinguish it from the exact source passages rather than treating every later checklist as identical.

**Must I enter and exit before the hour ends?** The selected original ICT passage distinguishes an entry inside the hour from a position held beyond it. Pending-order expiry and later fills still require an explicit rule; holding an existing position and opening a new one are different events.

**Should I enter at the edge or 50% of the FVG?** Those are different entry conventions. The midpoint can improve the quoted entry price while missing a shallow retracement. Neither is proven universally superior here; choose before replay and record non-fills.

**What if two FVGs form?** Apply the selection rule written before the outcome, such as first qualifying completed gap after the required evidence. Do not retrospectively choose the one that worked. Alternative filters belong in separately labelled tests.

**Can I take a setup outside the Silver Bullet window?** It may fit another entry framework, but it is outside a strict Silver Bullet time sample. Keep it separate instead of changing the model's boundaries after the fact.

**Is the Silver Bullet the same as the 2022 model?** They share concepts such as liquidity, displacement and FVGs. Silver Bullet has a named hourly focus; the wider 2022 framework should not be reduced to that single clock filter.

**Does a gap or setup occur every day?** A fixed observation window does not guarantee a qualifying opportunity on the instrument and rule set you chose. No setup and no fill must remain legitimate recorded outcomes.

Use the most helpful 5–8 visible FAQs, with other answers integrated into their relevant sections; do not reproduce all body explanations as a second long FAQ article.

### H2 22. Glossary and related primary sources

A compact real table: FVG, CE, MSS, DOL, tick, point, limit order, expiry and no-fill, with precise definitions and a few contextual links. Sources below the learner explanation, timestamped only where verified. Preserve one financial-education risk notice, genuine byline/date and correction link; no repeated official-account promotional block.

## Publication and extraction checklist

- Main/article precedes heavy library rails in source order. Existing hero placement and Personal Learning Notes/lower chapter sections retained.
- Topic-bearing H1 once; logical H2/H3; no publishing research labels or keyword cluster lists as learner content.
- Short definition immediately after the relevant heading, genuine lists and static comparison/specification tables.
- Scope microdata correctly (`itemscope`, matching name/type, `itemprop=description`); no unsupported scientific formula claims.
- Article/learning schema only where visible facts match; BreadcrumbList equals visible breadcrumbs; public author identity only. FAQ markup never promises a search feature.
- All text, answers, captions and links in prerendered HTML; scripts only enhance visuals. Canonical and reciprocal en/ur/x-default; original per-locale OG image and image alt parity.
- When genuinely ready, publish via existing status flag; add only this EN/UR pair to sitemap through existing mechanism and record actual changed fingerprints/review evidence. Research alone does not flip the placeholder to published or stamp lastmod.
- EN body Source Sans 3 16px/400/1.9; FAQ 16px/400/1.85; natural equivalent Urdu, accessible scaling. Tables/captions retain own hierarchy.
- Restrained concept-link highlights; no rainbow navigation. Native FAQs with very light theme-specific gradient and reduced-motion fallback.
- Test formula arithmetic, OHLC validity, quarter-point grid, open/close times, DST, boundary cases, long Urdu labels, 390/360px layouts, both themes, keyboard and disabled JS.

## Scope boundary

This chapter should be comprehensive about **Silver Bullet and the futures mechanics needed to understand it**, with links to deeper futures chapters. It cannot honestly promise to contain every fact about futures or every discretionary Silver Bullet variation. The quality standard is a traceable answer to each important learner decision, not an unbounded word count or a claim that no other resource can teach anything new.
