# Chapter 01 — research and implementation record

Reviewed 10 November 2026. Source brief: What Actually Moves Price.pdf, all 20 pages read; selected layout pages rendered. Source PDF unchanged.

## Search review

Queries checked: `what moves price in markets order flow liquidity news expectations`; `what moves stock prices supply demand fundamentals`; official-source queries for order types, fragmented FX, monetary-policy surprises, gamma hedging and margin risk. No search-volume or guaranteed-ranking claims.

Competitor pages opened:
- https://stockeyes.com/learn/what-moves-stock-prices — direct answer, earnings expectations, rates and a small FAQ; stock-specific intent.
- https://cfgi.io/learn/stocks/what-moves-stock-prices/ — horizon framing, fundamentals and sentiment. Used to understand competing presentation, not as factual authority or copy. The www variant failed; the canonical non-www page was read.

Editorial decision: preserve `/learn/what-actually-moves-price/` and the existing H1. Title tag: `What Moves Price in Markets? Drivers Explained | LearnSMC`. Description: `What moves price in markets? Explore order flow, liquidity, news expectations, positioning and fundamentals across stocks, forex, crypto and commodities.` The PDF suggested a new slug; it is not used because the existing permanent URL is established.

## Corrections to the supplied draft

- Matched executed quantity is equal; interested participants and unexecuted orders need not be equal.
- Separate last transaction, bid/ask, midpoint, index and mark price. Quote changes need not require a trade.
- A marketable limit order can consume liquidity; not every liquid market has one central order book.
- The three lenses have overlapping horizons. They are a teaching aid, not an additive causal model.
- Expected news can still coincide with moves. The expectation-plus-surprise phrase is not a valuation equation.
- Remove unsupported asset-class difficulty/volatility rankings and automatic directional reactions.
- Volume is activity, not proof of conviction or hidden intent. Crowding, funding, regimes and liquidation endings do not compel reversals.
- Public open interest does not establish actual dealer gamma. Hedging effects are conditional.
- All examples and numeric illustrations remain explicitly invented; no actual trade, feed, date, instrument or execution is implied.

## Primary sources actually consulted

The visible sources list contains Investor.gov order types and margin/ETF education; CME book methodology and gamma definitions; BIS FX fragmentation; Federal Reserve transmission and the Bernanke–Kuttner abstract; EIA oil supply; and the abstract/introduction of the 2025 Amaya et al. paper hosted by Cboe. The paper was not reviewed in full and its empirical estimates are not reproduced. Source URLs and review scopes are stored in `src/data/chapters/priceMovementLesson.ts` and visible on the page. Failed guessed margin and ETF URLs are not cited.

## Content and visuals

15 article sections, 14 visible FAQs, five applied quiz questions, 15 terms, six summary points and five native comparison tables. Advanced explanations use native details elements; all prose is present in static HTML. English and Urdu use paired content, with the existing reading typography, hero placement, notes, five learning tabs and bottom navigation retained.

Visuals:
- balance: Equal traded quantity, different urgency — A buyer and a seller exchange the same quantity; their urgency and the available quotes can differ. The mango analogy is not a participant-count model.
- book: Walk the fictional ask book — Invented book: 100 at 50.00, 100 at 50.05, 100 at 50.10. Buying 250 ends at 50.10 with average 50.04; a 50.05 limit fills only 200 immediately.
- layers: One market, three lenses — Orders and quotes, information, and structural conditions interact. The waves are conceptual, not measured contributions or an additive price formula.
- expectations: A beat is not a direction — Invented growth: 10% forecast, 12% reported. Change the outlook assumption; neither branch supplies a price prediction.
- markets: Four markets, different questions — Stocks: cash flows. Forex: relative currencies. Crypto: token and venue. Commodities: physical supply and delivery. These are lenses, not rankings.
- timeframes: Change the question with the horizon — Short and long horizons call for different evidence, but their drivers overlap. The ladder does not assign an exclusive cause to a time frame.
- leverage: A smaller buffer absorbs the loss — Invented arithmetic: asset 100, debt 80, equity 20. At asset value 90, equity is 10 before costs. No real margin permission, liquidation level or historical trade is implied.
- hedging: Hedging can lean against or with a move — Simplified net-gamma hedge: long gamma buys after falls and sells after rises; short gamma does the opposite. Actual exposure and hedges may be unknown.
- flow: Five questions, honest confidence — Specify the observation, catalyst, positioning evidence, liquidity evidence and related markets. Finish with explained, partly explained or unexplained; this is not a signal.
- myths: Open a claim, test its boundary — Each claim has a visible text alternative and a counterpoint. Explanations should preserve uncertainty instead of promising direction.

Each illustration has a textual caption; SVG figures have accessible titles. Myths are native disclosure cards. Playback is optional, pausable, and disabled under reduced motion; manual stepping remains available. Order quantity and the limit-order contrast support keyboard interaction. No charting library or runtime dependency added.

## Reader and trust requirements

Official ICT accounts removed from this rewritten lesson; the bottom review uses only the verified primary sources. One in-content financial-risk notice remains, and the duplicate footer notice is suppressed only for this chapter. Other lessons retain their existing content and footer behaviour until their own rewrite. Shared changes were announced before editing.

LearningResource and BreadcrumbList remain. The visible 14-question FAQ is represented in the same graph, plus an Article node with actual author and dateModified. First publication is unverified, so datePublished is not invented. No HowTo rich-result work, fake credentials or ratings. Existing lesson-specific social-image generation and reciprocal language metadata remain.

## Files and evidence

Content: new priceMovementLesson.json/ts, the chapter-01 override in applyContentReview, current metadata in curriculumPhase1.json, custom applied-quiz hook, native Urdu map/runtime generation.
UI: new PriceMovementContent.tsx, PriceMovementVisual.tsx and price-movement.css; scoped branches in ChapterRoom, ChapterDiagram, CurriculumReview, SiteFooter, App and prerender. CSS uses the existing main stylesheet entry so node prerender can import the React components.
Schema and guards: seo-content.ts; new verify-price-movement.ts, wired into build and test:seo; other existing gates remain unchanged.

Evidence directory: outputs/chapter01-review/. It contains extracted source text/layout review, production build logs, TypeScript output, arithmetic/static validation, browser screenshots, native parity results and scoped revision evidence.

Not verified: first-publication date, human Urdu review, assistive-technology user testing, field Core Web Vitals, live Google indexing/ranking or real-trade performance. No deployment is authorised or performed.

Local preview: http://127.0.0.1:4249/learn/what-actually-moves-price/ .

## Verification results

TypeScript passed. Production build includes the full existing SEO, routing, native Urdu, claims and bundle gates; see final-build.log for the final run. Browser evidence covers EN/UR, light/dark, 1440px/390px: one H1, 15 article sections, 14 FAQ answers, ten inline figures, one financial-risk notice and no document overflow. All source-model paragraphs are present in the runtime text in all eight combinations (runtime-parity.json). Static-verification.json records five native tables, the diagram-tab fallback, official source links and matching schema. Keyboard checks covered the quantity slider, limit switch, playback controls and a translated quiz response. The Urdu calculation is isolated as left-to-right mathematics with bdi.

Evidence: browser.json, runtime-parity.json, static-verification.json, typecheck-complete.log, final-build.log, the eight language/theme/viewport PNGs, and revision-evidence.json under outputs/chapter01-review/. Revision recording is scoped to changed Chapter 01 content, its directory/hub summaries and the native shared foundation-review translation; unrelated pending revisions are not stamped.

Final run completed successfully: 10,986 SEO checks (zero failures), 847-page crawl, 216 EN/UR chapter/hub documents, 739 sitemap URLs including 114 published lesson URLs, and unchanged claims/bundle budgets. After scoped recording, the chapter and directory checks passed again. Twelve changed fingerprints were recorded for 10 November 2026; 399 other pending revisions from the existing working tree remain unrecorded by this task. Initial JS: 12,330 bytes raw / 5,196 gzip; no new runtime dependency. All new Urdu pairs are exported in docs/chapter01-bilingual-review.csv for human review.
