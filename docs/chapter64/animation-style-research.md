# Trading animation direction research

Date: 14 November 2026. Scope: visual research and original direction only; no chapter implementation changed.

## Queries
- trading candlestick educational animation motion design fair value gap
- financial education animation interactive explainer candlestick trading
- site.dribbble.com trading animation candlestick motion (literal query; no useful Dribbble result relied on)

## Live pages inspected
1. https://www.chartanimator.io/animate/fair-value-gaps — read its animation/format explanation. Promotional retention or audience claims were not validated or adopted.
2. https://www.chartanimator.io/ — inspected live OHLC demo; added two candles and observed its handles, chart spacing and reveal control. Useful: geometry-aware annotations and direct manipulation. Avoid: decorative glow, sales metrics and large editor controls inside every lesson.
3. https://www.behance.net/gallery/255803687/Buy-or-Sell-Trading-Motion-Graphics-Short — inspected creator description and opened its actual Adobe embedded video. Started playback and observed opening/final frames of the 19.52-second short; not a frame-by-frame review. Useful: one compact story and legible focal annotations. Avoid: BUY/SELL spectacle and promotional end frame.
4. https://www.quantum-algo.com/academy/play-and-learn/ and https://www.quantum-algo.com/academy/fair-value-gaps-complete-guide/ — followed the live FVG lesson, inspected its animated hook, gap-spotter and question controls. Useful: immediate visual task. Avoid: unsupported hidden-order explanations, timed gamification and indiscriminate neon. This was design research, not an endorsement of its financial claims.
5. https://animg.app/en/animation/trading-slippage-illustrated-with-candlestick-chart-XJGgEABM — inspected explicit seven-phase storyboard and timing. Useful: reveal a price line, then its contrasting execution line, then the difference. Its generated specification is not evidence of trading behaviour.
6. https://www.manim.community/ — inspected official examples of drawing, transforming and arranging geometry. Useful: preserve object identity as attention moves. No Manim installation or dependency is proposed.

## Diagnosis of the rejected version
It behaves as an instrument panel rather than an explanation: a wide chart has sparse candles; controls and data compete with the teaching moment; most stages retain the same camera; evidence appears with too little visual hierarchy. More chart widgets or a palette change would not address that.

## Chosen original direction: Chart Documentary
A chart is treated as a filmed object. Each scene asks one question, selects the relevant evidence, then changes scale without breaking price/time relationships. The design combines directed camera framing, mathematical diagram precision and editorial pacing. This synthesis is our proposal, not a copied reference composition or a claim of universal originality.

### Art direction
- Light: neutral white, graphite text, emerald bullish candles and muted vermilion bearish candles; cobalt for measured evidence, amber for the selected gap.
- Dark: graphite-black, off-white, brighter equivalents of the same semantic colours. No glow, beveled glass, perspective price axes or ornamental 3D.
- Large candle close-ups, few subdued guide lines, annotations placed outside bars. Labels stay horizontal and remain a constant readable size during camera movement.
- A compact scene rail replaces the stack of replay controls. Play/pause, back/next and optional scrub remain available.
- A single short sentence accompanies the active scene. Complete captions and text alternatives remain in initial HTML.

### Silver Bullet choreography (approximately 24 seconds, adjustable)
1. 0–3s: orient. Show New York time and the selected reference. No entry, filled order or known FVG yet.
2. 3–7s: sweep. Emphasise the actual reference crossing; dim unrelated bars instead of replacing them.
3. 7–12s: inspect. Smoothly reframe to C1/C2/C3. At the C3 closing timestamp, draw the two boundary projections. Before the close, label the structure unconfirmed.
4. 12–16s: measure. Introduce the amber band between 20,004 and 20,006, then CE 20,005. Draw measurement strokes rather than make the gap flash.
5. 16–20s: return. Pull back to the same authored chart; reveal the later return. Move an order-status marker only when its model condition occurs. Graphic candle reveals must not imply observed intrabar ticks.
6. 20–24s: compare. Freeze the shared confirmed past and show target, loss and unfilled futures with equal visual weight. Expiry uses its actual waiting interval and timestamp, not fabricated bars. Branches are authored alternatives, never probabilities.

### Motion rules
- Camera reframing: about 650–900ms with a gentle ease in/out; readable holds of 1.5–3 seconds. No bounce.
- Annotation strokes: 250–450ms, then hold; one new teaching object at a time.
- No page scroll lock, auto audio or endlessly looping distractors. Play once when requested; allow replay and manual steps. Pause offscreen.
- Reduced motion: fixed, selectable scene states. Captions carry the same explanation.
- Use existing exact OHLC and semantic SVG layers. Do not smooth the price path or invent ticks. A formation draw-on is a graphic reveal, not a simulated historical tick path.

## Scope and next implementation unit
Prototype only the three-candle inspection/measurement scene first. Judge it at real article width and 390px before applying it to the rest of the chapter. Distinct concepts require distinct compositions: clock bands for session timing, measured candle close-up for FVG, aligned branches for outcomes, proportional ticks for risk. Preserve all wording, dates, sources, prices and existing SEO mechanisms.

## Limits
No TikTok video was directly reviewed in this pass; a Behance-hosted vertical short and a trading animation tool’s social-format material were reviewed. No paid tools, accounts, exports or copied assets were used. Storyboard is a proposal, not a completed animation or tested chapter replacement.
