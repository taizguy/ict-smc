# Price Delivery: standalone lesson rewrite

## Editorial brief

Rewrite chapters 13–16 as independent explanations of their subjects. Source recordings inform the material; the body must not narrate a playlist. Keep primary references and the limits of the source review in the source panel. Preserve the four canonical lesson URLs.

The earlier live comparison covered accessible results from Flux Charts, TrendSpider, NinjaTrader, TradeZella, OrderBlock, Strike and Ultima Markets. Two innercircletrader.net pages could not be read and were not treated as reviewed. The comparison informed teaching structure, not the authority of factual claims or a claim of universal superiority.

## What changed

| Lesson | Main teaching sequence | Visual comparisons |
|---|---|---|
| FVG | Outer wicks → completed formation → CE → displacement/context → alternative outcomes → paper record | Bullish/bearish/overlap; reaction/failure/no return; movable depth guide |
| IFVG | Original interval → explicit breach convention → opposite-side return → response/failure | Both directions; wick/close/whole body; protective stop versus closing-based failure |
| Order blocks | Candle/run selection → opening/body/wick boundaries → context → mitigation → execution assumptions | Bullish/bearish run; full range/body range/last candle selection |
| Breakers | Saved reference → sweep → structural break → opposite approach → mitigation comparison → Unicorn intersection | Both directions; swept high versus failed swing; overlap/touch/disjoint intervals |

There are 33 explanatory sections, 10 inline interactive figures with 24 selectable variants, and six applied quiz questions per chapter. All four have matching Urdu explanations, summaries, key terms, controls and quizzes. The existing note-taking, progress, reading settings, chapter navigation and language routes remain.

## Accuracy boundaries

- Prices are invented teaching values, visibly identified as such. No chart is presented as historical evidence or a forecast.
- FVG boundaries use outer wicks and a strictly positive interval. The midpoint is arithmetic; a reaction is uncertain.
- IFVG examples state a closing convention and distinguish it from wick and whole-body variants. Qualification, retest, stop and pattern failure are separate.
- An order-block candle and a consecutive run are different selections. Body, wick, opening and midpoint references cannot silently replace each other.
- Breaker illustrations state their selected candle and swing sequence. Mitigation terminology varies. A positive-width Unicorn intersection is distinct from proximity or a single touching price.
- Participant identity, remaining institutional orders and win rates are not inferred from OHLC.
- Paper calculations distinguish planned reward-to-risk, fills, costs and ambiguous same-bar sequences. No positive expectancy is claimed.
- Source review dates describe editorial work, not a newly completed review of every recording. The Episode 39 breaker-context caption passages were consulted; source-review scope is stated below the lesson.

## Implementation

- `deliveryEdition.json` replaces the four legacy bodies; old content-review overrides for these IDs were removed.
- `deliveryFigures.json` supplies the same candle values to the SVG, stage explanation, inspection readout and semantic OHLC table.
- `deliveryQuizzes.json` supplies 24 applied multiple-choice questions with stable answer rotation and explanations.
- Figures appear with their relevant textbook sections. The diagram tab provides a workshop using the same examples. Static HTML contains completed illustrations, comparison descriptions and quizzes without requiring JavaScript.
- Animations are user-controlled; reduced-motion removes decorative movement. Each chart has an accessible title/description and numeric table. Narrow screens contain chart scrolling within the figure.
- Titles, descriptions, catalog labels and bilingual translation catalogs were updated. Canonical slugs and hreflang pairs remain unchanged. Sitemap dates are recorded against actual rendered-content changes, including affected index/related-link pages.

## Verification evidence

Build/crawl and browser evidence is retained locally under `outputs/price-delivery-comparison/` and `outputs/price-delivery-*.log`.

The numerical consistency check covers 110 OHLC rows, stage bounds, all paragraph translation pairs, the four midpoint calculations and the four 2R examples. These checks establish internal consistency, not a profitable trading strategy or superiority to every competing page.

### Completed checks

- Production build and TypeScript check passed.
- 10,468 SEO checks passed; crawl/schema/link checks passed across 761 documents. All indexable pages were reachable from home.
- Reciprocal/self-referencing hreflang, canonical paths and routing checks passed.
- The sitemap contains 733 evidenced dates, with zero pending revisions. Dates were updated for 31 actually changed rendered pages, including related/index labels; unchanged dates were preserved.
- Browser review exercised all selectable FVG, IFVG, order-block and breaker variants, and the FVG keyboard depth control. Quiz feedback and reset were checked.
- All four English and Urdu lesson layouts were checked at 390px in light mode; Urdu dark-mode mobile and English dark-mode desktop checks also passed without page overflow. Chart scrolling is intentionally contained within each chart.
- The production Urdu deck, body, takeaways and applied quizzes were checked. The localization build gate reported no unresolved prose.
- A selected-control hover contrast problem found during review was corrected before the final build.

The pre-existing large-bundle warning remains. No claim of a ranking outcome, independently demonstrated trading edge, or complete review of every source recording is made.
