# Silver Bullet visual direction: one hour, several possible outcomes

14 November 2026. Art direction and implementation specification, not finished animations. Use an original composition for this chapter; do not transplant the Workbench PO3 hero or the existing generic three-candle widget.

## The central experience

The reader should feel that they are examining a decision while it unfolds, rather than looking at a poster of a winning trade. The signature scene starts with a clock and a chart stripped of future annotations. As time advances, evidence becomes available: a prior extreme is traded through, a selected swing is crossed, C3 closes, a gap can be measured, and an order can become eligible. At that point the reader can explore several **explicitly authored alternative endings**. Every ending keeps the same past. Future paths are labelled alternatives, not probabilities or recovered historical facts.

The memorable moment: a setup can qualify and still lose; a chart can reach the target and still produce no trade. Make those ideas visible rather than burying them in a disclaimer.

## References actually inspected

- [TikTok: Crypto Trading Insights Silver Bullet post](https://www.tiktok.com/@cryptotrading_insights/video/7556277337038392631). Opened live and inspected distinct rendered frames in the 22-second player. The visible composition is a vertical sparse line chart, labelled Asia highs/lows, 03:00/04:00 boundaries and overlapping coloured FVG/breaker regions. A tilted presentation appeared in an earlier frame; no claim to frame-by-frame motion analysis or measured easing. Take away legibility, framing and limited annotation. Do not copy its chart, sequencing, music or wording. Its caption incorrectly groups the broader 02:00–05:00 London killzone among one-hour windows and makes deterministic algorithm claims; those are not factual sources for our lesson.
- [The Pudding: responsive scrollytelling](https://pudding.cool/process/responsive-scrollytelling/). Read live. Preserve meaningful spatial/time transitions, plan mobile early, avoid hover-only meaning and do not hijack normal scrolling. Its article discusses tradeoffs rather than proving that animation always improves learning.
- [Google/Chrome: NRK scroll-driven storytelling](https://developer.chrome.com/blog/nrk-casestudy). Search extract consulted: staged visual breakdowns tied to specific text explanations. Candidate implementation reference, not a trading source.
- Local `animation-systems` skill read: motion for hierarchy and comprehension, restrained easing, transforms/opacity where possible, visibility-aware work and reduced motion. Skill defaults are starting points, not usability test results.

Other search hits (stock clips, generic motion articles, AI animation galleries) were discovery leads, not a basis for claiming their animation quality was observed. No purchased assets or stock trading footage is proposed.

## Art direction

**Precision without a sci-fi dashboard.** Fine grid, readable numbers, a clear time axis and small editorial annotations. Use white/light surfaces in light mode and matte charcoal in dark mode. Directional candles remain green/red; time gets a restrained blue accent; candidate zones a pale amber. Keep literal price charts frontal and geometrically undistorted. Any shallow depth is restricted to non-data layers such as the clock card or a transition into a magnified detail.

Do not use neon bloom, spinning coins, enormous fake terminals, a shower of labels, generic up-and-right arrows, sound effects by default, or fast chart motion intended to imply profit. A tiny line of humor can belong to a missed-fill state (for example, “The market did not accept our appointment”), but never obscure the actual reason or mock a loss.

Body text remains the existing 16px Source Sans standard. Labels can use tabular numbers. The chapter retains the existing site UI; its teaching figures receive the new visual language.

## Ten distinct figures / interactions

| Figure | Composition and learner action | What it teaches | Text fallback / precision requirement |
|---|---|---|---|
| 1. The hour opens | Wide two-layer timeline: New York clock above, fixed price chart below. A narrow time curtain traverses the chart while closed candles accumulate. Play, pause, step, speed and restart. | The clock permits observation; it does not produce an entry by itself. | Ordered event list with exact event-known times; no future target/outcome annotation before it is selected. |
| 2. Same hour, different local clocks | Horizontal NY/UTC/Karachi strips and selected date. The NY hour stays fixed while local equivalents change between winter/summer. | DST and next-day conversion; NY-local versus fixed EST. | Static EDT/EST table, date and timezone names. IANA-derived values tested at transitions. |
| 3. From parent context into execution | Parent timeframe chart above an expanded M1 cutout, connected by an explicit time bracket rather than decorative arrows. | A target/context reference differs from a lower-timeframe trigger. | Two independently labelled axes; aggregation from the same bars; no fictitious extra history. |
| 4. A gap earns its outline | Close-up triptych: C1 wick, provisional live C3, confirmed or overlapping C3. Moving price cursor and measurement bracket, not a rescaled whole-chart replay. | Third-bar confirmation; outer wicks; CE; zero-width rejection. | Formula and static bounds table. Any simulated intrabar progression explicitly invented; cannot imply observed ticks from OHLC. |
| 5. Build a bullish plan | Vertical price ladder beside the bullish narrative chart; reader inspects entry, stop and target distances. | Price distance, ticks and contract-dollar exposure before outcome. | Exact values and arithmetic printed beside the chart; stop is a trigger/reference, not guaranteed fill. |
| 6. A separate bearish study | Right-to-left explanatory reading flow in layout only, with a frontal left-to-right time chart. Entry retracement appears above the post-displacement price. | Bearish geometry in a distinct sequence. | Independent ES-style authored candles, not the bullish series reflected or shifted. No time-axis mirroring in Urdu. |
| 7. Four endings at the decision | Central frozen decision frame with four labelled small-multiple future paths: modeled target, modeled stop, no return, expiry. Selecting a branch changes future only. | Qualified setup is not guaranteed success; no-fill is not a profit. | All four outcomes listed in HTML. Branch shapes differ materially, not colour-swapped clones. No probability labels. |
| 8. Two deadlines | A timeline with separate tracks for formation, order submission, fill and exit. Compare 10:58 confirmation / 11:02 return with an in-window fill held later. | Formation, fill and exit are different events. | Explicit policy labels; never blend source teaching with a separately proposed later-fill experiment. |
| 9. One candle, two possible paths | A single OHLC bar expands into two schematic intrabar paths which collapse back into the same bar. No default winner. | OHLC cannot always resolve fill/stop chronology. | State “possible paths, not observed tick data”; show O/H/L/C agreement and result uncertainty. |
| 10. The record, not the highlight reel | An event ribbon becomes rows in a small journal: eligible / skipped / unfilled / loss / unresolved. | Record the whole rule sample, not only attractive charts. | Real HTML table of authored outcomes, no sample win rate or historical claims. |

Static supporting graphics: setup anatomy key, independent long/short comparison, and a compact glossary diagram where prose needs it. Avoid adding one graphic per paragraph just to inflate the image count.

## Signature sequence storyboard (proposed timing, not observed market speed)

1. **0–3s: orient.** Show instrument, synthetic label, date, M1 and NY clock. Prior high/low and selected destination are already named. The future is blank.
2. **3–6s: event.** A candle crosses the selected reference; zoom attention with an annotation, not by stretching data axes. Caption: trading through a level does not prove resting orders.
3. **6–10s: evidence.** The selected confirmation close occurs. C1/C2/C3 are counted explicitly. A provisional FVG remains dashed until C3 closes.
4. **10–13s: measurement.** Bounds lock, CE appears and the order becomes eligible after confirmation. A tiny time label explains why an earlier entry would use future information.
5. **13–17s: decision.** Freeze the frame; label the written expiry and risk. Reveal the invitation to compare endings. Default autoplay should stop here on first viewing, not endlessly celebrate the winner.
6. **On reader choice: outcome.** Replay only the selected authored future. “Compare endings” returns to the frozen decision without altering its past. Counterexample is one click away.

Use a modest low-motion idle loop only before interaction if appropriate; full learning replay should remain controllable. Never require scrolling through a long pinned scene to reach the next chapter section.

## One data model for truth, several visual compositions

Proposed data fields: instrument label, synthetic flag, teaching date, display zone, timeframe duration, UTC bar opens, OHLC, context levels, event IDs, signal-known times, rule policy, plan, outcomes and accessible captions. Reuse existing time/math utilities and execution conventions where applicable, but do not import the entire tools workbench into a textbook page.

The rendered plot, text event table, range values, outcome classification and answer feedback must derive from the same data. No CSS-only fake price wiggles on top of a disconnected explanation. Explicitly record tick-rounded values and UTC opens; derive closes using duration helpers. Time skips need a visible break marker.

Technical approach to evaluate: semantic static SVG for explanatory diagrams; a lightweight interactive chart only for the principal replay if the existing chart library is needed. Lazy-load enhancement near visibility with reserved space. SVG lines need not become a heavy canvas. No new animation dependency merely for fades; benchmark before adding one. Do not switch createRoot/hydration strategy as part of this lesson.

## Precision gates before calling an animation finished

- OHLC inequalities hold for every bar; outright NQ/ES prices fit 0.25 increments.
- Synthetic intrabar paths, if present, start/end at O/C, touch H/L correctly and are labelled authored assumptions.
- C3 close time governs gap availability; scrubbing backwards removes evidence that was not yet known.
- A three-bar FVG cannot be confirmed by a large middle candle alone. Boundary equality is not a positive-width gap.
- Annotations use shared scale functions; resize cannot detach a label from its candle/reference. Avoid tweening between unrelated price scales.
- No late order can be filled by an earlier candle; same-bar ambiguous order remains unresolved unless an explicit simulator convention is displayed.
- Identical past across counterfactual branches; materially different future OHLC rather than a shifted clone.
- Window boundaries use declared open/close conventions. Test 09:59, 10:00, 10:59 close11:00, 11:00, January/July and DST transition dates.
- Distinguish trade outcome, chart target touch and pending-order state. Wrong action feedback explains the violated condition, not a generic “try again”.

## Accessibility, mobile and SEO

- Initial HTML includes all explanations, captions, figures or representative static states, formulas and tables. No lesson answer exists only inside canvas or after Play.
- Each illustration has a specific accessible name and figcaption. An accompanying event list is a full equivalent explanation, not “see animation”. Do not repeat the entire lesson in alt text.
- Native controls, 44px targets, visible focus, keyboard stepping, labelled scrubbing, user-triggered aria-live summaries. Do not announce every autoplay frame.
- Reduced motion shows stable final evidence states and explicit step controls; no forced pan/zoom or scroll locking. Keep normal page scrolling and a route around interactive chart gestures.
- At 390/360px, stack explanatory panels; keep axis labels readable and offer a data table instead of requiring horizontal chart swipes. Test 200% zoom and Urdu RTL with numeric/time regions isolated LTR.
- Light theme is genuinely light, including figure backgrounds; dark theme uses appropriate contrast and muted zone fills, not a dark image pasted into a white page. Text contrast >=4.5:1; meaningful diagram strokes >=3:1 against their surroundings.
- Pause when offscreen, reserve figure dimensions, avoid infinite work, and lazy-load nonessential media. Do not use an MP4/GIF for everything: it is harder to inspect precise values, step, translate and keep text accessible.
- Distinct static social image of the time-plus-evidence idea, not a chart implying a winning historical trade. No VideoObject unless a real accessible, corresponding video is actually supplied.

## Acceptance standard

A beginner can explain why the setup is or is not eligible without the outcome. An intermediate learner can identify the precise rule variant, time boundary, price distance and execution uncertainty. A reader with scripts disabled receives the same conceptual lesson. Originality means distinct scenes and useful reasoning—not a promise that animation alone will earn bookmarks, rankings or profitability.
