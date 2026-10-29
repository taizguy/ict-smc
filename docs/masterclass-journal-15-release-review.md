# Unit 15 — Standard Deviations Field Journal release review

Status: implemented English draft on `feat/masterclass-field-journal`; not published. This report does not certify the other 28 lessons.

## Dates and provenance

- First publication: **24 October 2026**, confirmed by the publisher in this task (their reply “24”, interpreted in the October 2026 context and acknowledged).
- Modified/reviewed: **29 October 2026**, for this authored draft's arithmetic, figures, example paths and referenced tool/statistical documentation. The visible review scope states those limits; it is not a new review of an ICT video archive.
- Author: Muhammad Umer Ijaz; existing verified LearnSMC author entity and external identity links reused. No credentials added.

## Search research

Queries checked on 29 October 2026:

1. `ICT standard deviation projections` — also opened in live Google, results labelled not personalised; geographical/temporal results remain variable.
2. `ICT standard deviation projections fib -2 -2.5 trading`
3. `ICT standard deviation TradingView how to use`
4. `ICT standard deviation trading what are standard deviations risk`
5. `ICT standard deviation projections guide -2 -2.5`

Competitor result titles inspected:

- Writo-Finance: **Standard Deviation Projection – ICT Trading Concept** — https://www.writofinance.com/standard-deviation-projection-in-trading/ (page opened; headings/settings/FAQ inspected).
- InnerCircleTrader.net (independent publisher, not the official ICT account): **ICT Fibonacci Settings — OTE 0.705 Entry & Standard Deviation Targets + Free PDF** — https://innercircletrader.net/tutorials/ict-fibonacci-levels/ (page opened; configuration/entry-target separation inspected).
- TradingView/FibAlgo: **ICT Standard Deviation & Targets — Indicator by FibAlgo** — https://www.tradingview.com/script/YOVDkfKm-FibAlgo-ICT-Standard-Deviation-Targets/ (live search title/snippet observed, not a verified trading-performance source).
- Backtrex: **ICT standard deviation projection: price targets explained** — https://backtrex.com/en/blog/ict-standard-deviation-projection-price-targets (live search title/snippet observed; not cited as factual evidence).
- TTrades: **Standard Deviation Projections Trading Guide** — https://ttrades.com/standard-deviation-projections/ (live search title/snippet observed, not substituted for official ICT teaching).

Live People Also Ask included **“How to use stdv in trading?”** and **“What is the 95% rule for standard deviation?”**. The two unrelated broad questions (“Which is better, SMC or ICT?” and “What is ICT in FX?”) were deliberately not used as filler. The remaining three FAQs address Fib settings, orientation and reversal guarantees, supported by observed query/result intent and the tool documentation. No search-volume or guaranteed-ranking claim.

Editorial decision: teach range-multiple arithmetic, anchor direction and realistic interpretation. Avoid “predict exact highs”, “mathematical precision” as a forecasting promise, and mechanical-profit language. Distinguish the plotting convention from statistical standard deviation.

## Final metadata in the English draft

- Title: **ICT Standard Deviation Projections: Fib Settings & Examples | LearnSMC**
- H1: **ICT standard deviation projections: settings, anchors and examples**
- Description: **Learn ICT standard deviation projections with exact Fib levels, anchor orientation, TradingView settings and worked versus failed price examples.**
- Preserved URL: `/tools/masterclass/core-masterclasses/standard-deviations/`
- Specific social image: `/images/masterclass-journal/15-standard-deviations.png`, 1200 × 630, generated from original SVG; alt text present for OG/Twitter.

## Sources used and their limits

1. TradingView official Fib drawing documentation — https://www.tradingview.com/support/solutions/43000518158-fibonacci-retracement-drawing-tool/ . Read: custom/negative ratios, Reverse, price labels, Coordinates, Background and log-based settings. Supports tool mechanics, not profitability.
2. NIST, Measures of Scale — https://www.itl.nist.gov/div898/handbook/eda/section3/eda356.htm . Read: the difference among range, variance and standard deviation.
3. NIST, Normal Distribution — https://www.itl.nist.gov/div898/handbook/eda/section3/eda3661.htm . Read: the defined mean/scale and distribution assumptions. No probability is inferred from the range ladder.
4. Official ICT archive — https://www.youtube.com/innercircletrader . Identified as original educator's archive only; **no passage-specific ICT claim or quotation is asserted from this link**. All concrete calculations are independent arithmetic, not an authenticated ICT trade.

No real-market data was verified or used. Therefore no example is presented as a real trade and no video timestamp is fabricated. All examples specify fictional SYNTH-USD, five-minute observations, America/New_York, a clearly illustrative 14 October 2026 calendar date, and every observation price.

## Figures (all original, all in initial HTML)

| ID | Composition | What it teaches |
| --- | --- | --- |
| sd-anchor-bracket | Diagonal two-endpoint measurement and separate side bracket | 110 − 100 = 10; endpoints determine the unit |
| sd-price-ladder | Vertical ratio/price ladder with eight levels | 100 + 10r; every exact price |
| sd-orientation-check | Two side-by-side orientation checks | Reversed anchors change projection direction; verify labels |
| sd-response-comparison | Two response paths at a common 80 reference | A touch and a continuation below are different observations |
| sd-worked-response | Complete timestamped six-observation path plus exact-price table | 110, 100, 90, 84, 80, 83; last observation above 80 |
| sd-failed-continuation | Distinct dashed continuation path plus exact-price table | 110, 100, 90, 84, 79, 76; reversal assumption fails |

Each of four procedure steps contains concrete numbers and its own figure. Worked/failed cases have separate sections/charts and are not duplicates of the procedure bullets. Captions and always-visible price tables provide the text-only alternative. Replay changes only the drawn path; no prose, links, answers or data are click-created.

## Schema and internal links

Prepared Article, BreadcrumbList and FAQPage graph. Author/date/image values match the visible document. Five FAQ answers are visible paragraphs in the static HTML. No rating, credential, review-count or FAQ rich-result promise. Breadcrumb graph and visible trail both use Home → Workbench & Lab → Masterclass → lesson.

Body links: OTE model, FVG glossary, OTE calculator. Right-side Related: OTE model, opening range/octant grid, OTE calculator, each with its own reason. Previous/next use actual catalogue neighbours. Hub backlink retained. Every internal anchor uses one contrast-tested accent plus underline; sidebar link types are also written as labels.

## Evidence

- `npm run lint`: passed.
- `npx vite build`: production compilation passed (existing large-bundle warning; not a performance certification).
- `npx tsx scripts/verify-masterclass-journal.ts`: one H1; six captioned accessible figures; five visible FAQs; numerical steps; working fragment targets; confirmed publication date; no reader-facing placeholders/known overclaims; draft guard.
- `npx tsx scripts/render-masterclass-journal-review.ts`: complete no-JavaScript document at `outputs/masterclass-journal/15.html`; body and schema evidence alongside it.
- Live English runtime heading/paragraph parity: **63 normalized elements; hash 634266105**, identical to static markup. This is exact essential-text parity, not full hydration identity.
- Live title, description, one H1 and six figures checked; replay advanced to 1/6. Desktop layout inspected. Dark theme and 390px mobile also checked: zero filled lesson section/figure surfaces and no horizontal page overflow (scrollWidth 384, viewport 390).
- Local interactive route: `http://127.0.0.1:4231/tools/masterclass/core-masterclasses/standard-deviations/?journal=1`.
- No startup visibility/hydration mechanism changed. No URL removed/redirected. Draft not included in production routing or metadata overrides unless explicitly marked approved.

## Remaining release checks

Urdu edition, native bilingual schema/metadata parity, full production prerender/crawl with the edition enabled, full-document mobile/dark visual review and review of the other 28 lessons are not yet passed. These are release blockers, recorded here rather than exposed as placeholders to readers. Production remains unchanged; this is not an all-29 completion report.
