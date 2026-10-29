# Unit 03 — ICT 2022 model release review

Status: authored English Field Journal draft, not published. Shared implementation is on `feat/masterclass-field-journal`.

## Metadata and dates

- Title: **ICT 2022 Model: Steps, FVG Entry & Examples | LearnSMC**
- H1: **ICT 2022 model: from liquidity sweep to FVG entry**
- Description: **Understand the ICT 2022 model: liquidity sweep, displacement, MSS and FVG return. Follow exact-price examples, entry variants and a failed setup.**
- Existing URL preserved: `/tools/masterclass/core-masterclasses/2022-model/`.
- Original social image: `/images/masterclass-journal/03-ict-2022-model.png`, 1200 × 630. Its sequence/candle composition differs from the Standard Deviations ladder card.
- Publication: 24 October 2026, publisher-confirmed in this task. Editorial modification/review: 29 October 2026. Review scope is this explanation, arithmetic and existing source-passage records, not a new full-playlist screening.
- Author: existing Muhammad Umer Ijaz Person entity; no invented credentials.

## Search intent and competitor review

Queries on 29 October 2026:

1. `ICT 2022 model liquidity sweep displacement market structure shift FVG explained`
2. `ICT 2022 model entry rules stop loss fair value gap`
3. `ICT 2022 model explained` — live Google browser page inspected.

Competitors:

- **ICT 2022 model**, Hadal Instruments: https://hadalinstruments.com/glossary/ict-2022-model/ . Page opened. Observed definition, four-event sequence, parameter choices and worked scenarios; none of its examples or wording copied.
- **ICT 2022 Model Explained: Steps, Checklist and Example**, ICTKillzone: https://www.ictkillzone.com/ict-2022-model . Page opened. Observed step list and execution-context packaging. Its confident claims are not adopted as verified market facts.
- **ICT 2022 Model: Rules, Steps and What We Measured**, ProEA: https://proea.app/en/blog/ict-2022-model . Search title/snippet observed; its measurements are not represented as LearnSMC findings.
- **JSONFX - ICT 2022 Model**, TradingView: https://www.tradingview.com/script/WPpilwER-JSONFX-ICT-2022-Model/ . Search title/snippet observed, not a source certification.

Live PAA included “What is an ICT model?”, “Can you explain ICT in a simple way?”, “What are ICT models in trading?” and a request for 2022 mentorship notes. The FAQ directly handles definition/simple explanation and adds the closely relevant missing-gap, entry-variant and losing-setup questions. No keyword volume or ranking claim.

Editorial decision: teach one explicit bearish gap-return variant; avoid claiming every ICT entry requires a limit order or every named PD array. The body is a learner explanation with sources below, not a narration of the recordings.

## Sources used

Existing source records in `src/data/ict2022Sources.ts`:

1. ICT Episode 2: https://www.youtube.com/watch?v=tmeCWULSTHc — recorded approximately **43:00**, retracement and sell-stop entry alternatives: https://www.youtube.com/watch?v=tmeCWULSTHc&t=2580s .
2. ICT Episode 4: https://www.youtube.com/watch?v=L-ReMHiavPM — recorded approximately **01:00**, break without a qualifying FVG: https://www.youtube.com/watch?v=L-ReMHiavPM&t=60s .
3. ICT Episode 5: https://www.youtube.com/watch?v=N29ZJ-o31xs — recorded approximately **07:00**, context before additional patterns: https://www.youtube.com/watch?v=N29ZJ-o31xs&t=420s .
4. TradingView Rectangle drawing tool: https://www.tradingview.com/support/solutions/43000516984-rectangle-drawing-tool/ . Opened this task; verified Coordinates, borders, middle line, background and extension controls.

The ICT passage evidence is reused from the earlier reviewed captions/frame records; no fresh full-recording review or exact verbatim quotation is claimed. No real-market example is used. All new figures are original redrawings, never recording frames. Video timestamps identify source context, not the origin of the invented trade.

## Numerical example and figures

Fictional SYNTH-USD; five-minute bars; America/New_York UTC−04:00 on illustrative 14 October 2026. All example prices are invented and labelled.

| Figure | Unique composition | Teaching point |
| --- | --- | --- |
| model22-reference-raid | Single full-size candle against two preselected references | High 111 exceeds reference 110, separate from swing low 106 |
| model22-three-candle-boundary | Three individually measured candles with an outer-wick bracket | Candle 1 low 108 and candle 3 high 105 form a 3-point bearish gap |
| model22-event-timeline | Four alternating time nodes and a connecting chronological path | Confirmation 09:45 must precede the selected return at 09:50 |
| model22-risk-distance | Three price references and two different distance brackets | Entry 106.5, stop 111.5 and objective 100 give 5 points risk / 6.5 reward |
| model22-worked-path | Mini source candles alongside annotated later event-price path | Complete illustrative sequence reaches 100 under explicitly stipulated fills |
| model22-failed-path | Same stated prerequisites, distinct upward event-price path to stop | Correctly formed gap can precede a hypothetical −1 gross R outcome |

The OHLC table lists all three source bars. Both examples separately list all six selected event prices and times; event observations are explicitly not a complete OHLC feed. The drawn segments/fill assumptions are stated rather than inferred from missing data. Worked outcome +1.3 gross R and failed −1 gross R are invented arithmetic, not verified performance or recommendations.

## Schema, links and checks

- Prepared Article, BreadcrumbList and visible-answer FAQPage graph. Author, dates, image and five questions match the visible document.
- Body links: full FVG lesson, FVG glossary, actual MSS canonical lesson, Chart Laboratory. Related items each explain their connection. Previous/next actual catalogue neighbours and hub backlink retained.
- All internal links use the same accent and underline; type labels supplement sidebar links.
- TypeScript and targeted source/static checks passed: one H1, four numbered numerical steps, six accessible captioned figures, five visible answers, exact example prices, valid fragments, no known placeholders/overclaims, and draft production guard.
- Static review: `outputs/masterclass-journal/3.html`; interactive local route: `http://127.0.0.1:4231/tools/masterclass/core-masterclasses/2022-model/?journal=1`.
- Live route title, one H1, six figures and the exact Related destination URLs checked.

## Still unverified / not publishable yet

Native Urdu, full production prerender/canonical/hreflang/sitemap crawl with the edition activated, complete static/runtime browser parity and mobile/dark visual review for this edition remain outstanding. No historical dataset is supplied; no performance/real-fill claim is made. The other 27 lessons are not certified by this report.

### Continuation verification
Static/runtime parity: 66 normalized h1/h2/h3/p nodes, hash 1291617545. Mobile app viewport 390px, document 384px in both light and dark. Contents navigation tested with the journal-specific Lenis handler; native anchors remain in static HTML. Required lesson-specific risk note removes unrelated projection prose; risk figure uses the same linear price scale for stop 111.5, entry 106.5 and objective 100. Targeted check confirms 12 distinct label-free compositions across the two authored editions. Native Urdu and activated production crawl remain pending.
