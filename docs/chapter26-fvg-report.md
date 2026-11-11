# Chapter 26 — Fair Value Gaps

Local implementation of the supplied 29-page **Fair Value Gaps.pdf**. Permanent ID 13, plan position 26 and `/learn/fair-value-gaps-fvg-and-consequent-encroachment/` are retained. No new routes, redirects or deployment.

## Copy and presentation

The learner article is Parts 2 / pages 4–26; the search strategy and optimisation playbook are authoring instructions, not reader copy. All 25 exact numbered headings, six takeaways, 22 native tables, 21 FAQ answers, 14 glossary rows, lists, pseudocode and worked prices are retained. The code's spacing was reconstructed from PDF character positions. English source-copy fixture: `docs/chapter26-source-copy.json`. Urdu follows the same structure and meaning; review CSV: `docs/chapter26-bilingual-review.csv`.

The user explicitly chose to retain wording after the accuracy conflicts were raised. In particular, the BISI/SIBI table's statements about who traded and the single-candle crypto illustration remain verbatim. Passing copy/technical checks is not independent factual validation of those claims. No new performance statistics or historical executions were invented.

The existing hero placement, notes, terms, applied quiz, summary, completion and previous/next navigation remain. The old extra delivery comparison/FAQ/walkthrough is replaced by the supplied document body, preventing a second competing article. The official-accounts block is removed for this chapter. The entire page has one financial-risk notice. The user-confirmed original date is 15 October 2026; the chapter-specific update is 11 November 2026.

## Visual inventory

Matte navy/charcoal, fine cyan-white construction lines, restrained amber accents; no external animation package or heavy dependency. The blueprint treatment makes no claim that markets are designed or predictable.

1. Skipped shelf — three candles, outer-wick bounds 100–102 and CE 101.
2. Three-candle builder — range control and keyboard arrows change C3 low; positive width, zero width and overlap are distinguished.
3. CE outcomes — pausable/manual reveal contrasts a hold, a wick through with a close back, and a close through the far edge.
4. Gap life cycle — state-flow branches and selectable states.
5. Related patterns — four separate compositions for session gap, FVG, multi-candle void and body-only imbalance with overlapping wicks.
6. Inversion — three formation candles, a close through and a subsequent retest from below.
7. Nested timeframes — three stacked views at distinct scales.
8. Nine-step map — numbered observations tied to the supplied nine-step sequence.
9. Sizing — 10,000 account, 1% risk, entry 101, stop 99.60, target 106.50; whole-unit sizing, validation and costs/contract limitations.
10. Quality scorecard — the document's eleven conditions; no invented success probability or threshold.
11. Confluence layers — nine checks, with the independent-information limitation retained.

Each visual has a descriptive accessible title/caption and text alternative. Motion starts only on request, has pause/manual controls and respects reduced motion. FAQ buttons use one-open-at-a-time disclosures; answers remain in static HTML. All 25 contents links are accessible in a bounded rail; the FVG route uses the existing scroll controller for direct anchor jumps.

## Search and sources

Queries checked: `fair value gap FVG formation consequent encroachment inversion TradingView Flux Charts NinjaTrader`; official ICT FVG / CE searches; Investor.gov limit/market/stop order definitions. No search-volume or current Google-rank claim is made.

- Flux Charts, `https://www.fluxcharts.com/articles/fair-value-gaps-fvg-explained`: consulted the definition/identification sections, outer-candle comparison and invalidation discussion. Its wording and profitability implications were not copied.
- NinjaTrader, `https://vendor-support.ninjatrader.com/s/article/Fair-Value-Gap-Indicator-NinjaTrader-Desktop?language=en_US`: search result exposed formation and mitigation features; full page failed to render beyond its loading shell. Not claimed as a fully reviewed source.
- Official ICT Episode 6 `https://www.youtube.com/watch?v=Bkt8B3kLATQ`, Episode 4 `https://www.youtube.com/watch?v=L-ReMHiavPM` and Episode 24 `https://www.youtube.com/watch?v=nv0ey5UyOmY`: retained the repository's previously reviewed, narrowly scoped timestamp notes. Watch URLs/title identities were rechecked; no new full-recording review is claimed. YouTube's fetched body did not expose the recording or transcript.
- Investor.gov, `https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order` and `https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders`: read the primary definitions, limit-price conditions and stop execution-price limitation. The existing Stop Order reference remains; these pages do not support claims about hidden institutional orders or verify invented example prices.

Final English title: **Fair Value Gap (FVG): Formation, CE and Examples | LearnSMC**.

H1: **Fair Value Gaps (FVG): Formation, CE and Examples**.

Description, as supplied: **Learn what a fair value gap is, how FVGs form, how to use CE and inversion, plus bullish and bearish examples, rules and mistakes.**

The exact Quick Answer is longer than the playbook's recommended 40–60 words; the established URL is retained. No copy was shortened just to meet a search-character target. Existing localized share-card generation provides page-specific images and OG/Twitter alternative text. Article, FAQPage, DefinedTermSet and BreadcrumbList describe visible content; FAQ markup does not promise rich results. No VideoObject or HowTo rich-result claim is fabricated for an inline interactive diagram.

## Build and integration

New data: `src/data/chapters/fvgDocument.json`, `fvgDocument.ts`, `fvgDocumentUrdu.json`, `fvgDocumentTranslations.ts`. New rendering: `src/components/FvgDocumentContent.tsx`, `FvgBlueprint.tsx`, `src/styles/fvg-document.css`. New native static Urdu hook: `scripts/fvg-localized-document.ts`. Verification: `scripts/verify-fvg-document.ts` and its package build/SEO-suite entries.

Scoped shared integration: ChapterRoom / ChapterDiagram; applyContentReview; curriculumPhase1 metadata and searchTopics; curriculumReview / CurriculumReview; App and prerender footer suppression; seo-content graph; urdu-pages; urdu catalogue generation. Existing quiz data and URLs remain.

The claims scanner recognizes a **quoted win-rate myth** only when it has a visible, immediate conditional reply in an actual Myth/Reality table or explicitly captioned myth disclosure. It has no file/route allowlist. Positive and adversarial fixture tests still reject unqualified promises and unrebutted quoted myths.

The new long-form Urdu copy exposed duplicated dictionary storage. The generator now reuses the five largest existing lesson catalogues when reconstructing the directory fallback. A build assertion proves exact equality of all original translation keys and values. Normal lesson routes still load their own catalogue. Existing bundle limits are unchanged. Evidence: `outputs/urdu-localization/fallback-parity.json` and `outputs/practice-performance/bundle-budget.json`.

## Verification evidence

Evidence directory: `outputs/fvg-document-review/`. Source reconstruction and user decisions are saved there; `static-verification.json`, `typecheck.log`, `build.log`, browser checks and screenshots are added as verification completes. Revision recording must be scoped to this chapter; unrelated pending draft fingerprints must not be stamped.

Human Urdu review, a fresh assistive-technology user session, field Core Web Vitals, live Google indexing and a complete new viewing of all source recordings are not established by local validation.

Preview: `http://127.0.0.1:4250/learn/fair-value-gaps-fvg-and-consequent-encroachment/`.

### Completed verification

- TypeScript passed. `build.log` records the full production/prerender suite, 10,986 passing SEO checks, an 847-page crawl, all existing regression guards, the new FVG guard, claims guard and unchanged bundle budgets.
- `static-verification.json` confirms the 641 supplied text units in both languages, all 25 section headings, 22 tables, 21 FAQs, 11 figures, 14 terms, one risk notice, source links, arithmetic, Article dates/author, canonical and social/language metadata.
- `browser-checks.json` covers EN/UR at 1440px and 390px in light/dark: one H1, every supplied text unit present, no overflow. Additional 360px verification found no overflow and all new button/range/number controls at least 44px tall. The eight viewport screenshots and `blueprint-desktop.png` provide visual evidence.
- `interactions.json` records exclusive keyboard FAQ operation, overlap/zero-width/positive-width builder states, invalid sizing input, the document's 71-unit result, the quality counter and play/pause/manual stepping. Runtime schema retains 21 FAQ entries and the same publication/update dates.
- Only the two EN/UR FVG revision fingerprints were recorded: `revisions.json`. Sitemap remains 739 URLs / 114 published lesson URLs. No unrelated pending draft dates were stamped.
- The full Urdu fallback reconstructs all 4,353 entries exactly. Final all-JS bytes: 10,592,726; largest chunk: 1,167,581; initial JS: 12,330. Limits unchanged. These are build metrics, not field speed measurements.
- Native static HTML was parsed and checked directly; a dedicated disabled-JS browser run and fresh external Rich Results Test were not performed. No push, merge or deployment. Local feature branch: `feat/chapter-26-fvg-document`.

User-requested presentation corrections (11 November 2026): explicit native bullet markers; white diagram/calculator surfaces with green/red candles and dark annotation text in light mode, original navy/cyan/amber style retained in dark mode; removed the duplicate myth disclosure presentation (the exact document table stays); removed the appended Next reads block. Existing contextual and previous/next links remain.

Release snapshot verification passed after the requested presentation changes: TypeScript; full production build/prerender; 10,986 SEO checks; 847-page crawl; 11-figure FVG source/metadata/schema/arithmetic checks; claims scan and unchanged bundle budget. EN desktop light/dark and UR 390px light/dark were rechecked: native bullets, one myths table, no duplicate cards or Next reads, no mobile overflow. Release bundle: initial JS 11,739 bytes; total JS 10,496,385 bytes; largest chunk 1,154,360 bytes. Only the FVG EN/UR fingerprints were recorded. Release evidence: outputs/chapter26-release/outputs/.
