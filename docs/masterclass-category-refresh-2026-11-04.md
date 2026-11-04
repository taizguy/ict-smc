# Masterclass category refresh — 4 November 2026

## Verified problem and scope

The live Core Masterclasses category still rendered the legacy workbench, automatically selected unit 01 and used a daily PO3 diagram for a weekly lesson. The five category URLs now share the collection hub component and static content model. Lesson URLs and memberships are preserved. No redirects or new indexable routes were introduced. This is a local review, not a publication authorization.

Catalogue inventory: Core frameworks 13; PD arrays 8; Entry models 5; Opening ranges 1; Mentorship frameworks 2. Counts, cards, list rows and ItemList entries come from the same catalogue. Category navigation uses ordinary links. Each category has its own introduction and metadata, with native Urdu counterparts. Search and view switching enhance the complete static catalogue.

## Search intent research

Queries checked on 4 November: “ICT core concepts masterclass weekly profiles liquidity 2022 model”, “ICT PD arrays explained order blocks fair value gaps”, “ICT entry models OTE model explained”, “ICT opening range gap opening range studies”, exact “ICT entry models” with OTE, exact “ICT opening range” with gap/midnight, and “ICT 2026 mentorship” with framework/Smart Money Concepts. Some acronym results were unrelated or noisy; no search-volume or ranking inference is made.

Consulted search-result titles and snippets, for terminology and page positioning rather than verification of trading claims:

- [Price Action Lover: PD arrays topic guide](https://priceactionlover.com/learn/pd-arrays)
- [Hadal Instruments: PD array](https://hadalinstruments.com/glossary/pd-array/)
- [Smart Money Trader: ICT PD arrays explained](https://www.smartmoneytrader.co/blog/ict-pd-arrays-explained)
- [Alchemy Markets: premium and discount arrays](https://alchemymarkets.com/education/strategies/premium-discount-pd-arrays/)
- [LuxAlgo: PD arrays](https://www.luxalgo.com/library/concept/pd-arrays/)
- [TradingView: ICT Opening Range Gap](https://www.tradingview.com/script/C1G95phi-ICT-Opening-Range-Gap/)
- [ICT Traders: opening range gaps](https://icttraders.net/ict-opening-range-gaps-how-to-draw-and-trade-the-org-repricing-macro/)
- [Hadal Instruments: opening range gap](https://hadalinstruments.com/glossary/opening-range-gap/)
- [Inner Circle Trader: first presented FVG tutorial](https://innercircletrader.net/tutorials/master-ict-1st-presented-fvg/)

Decisions: target recognizable collection topics, not every model keyword in a title. Describe the actual inventory. Opening Ranges contains one lesson comparing five references, not five lessons. Mentorship Frameworks contains two focused time studies, not a complete official course. Keep the main hub title unchanged. No performance promises, new factual rules or copied explanations were taken from these results.

## Weekly lesson correction

Unit 01 now uses its existing five-weekday illustration in the lesson itself. Wording distinguishes an observed excursion from an inevitable reversal and removes claims that every week follows a weekday schedule, every institution obeys an opening filter or Friday retraces at a fixed time. Practice risk wording refers to a written cap, costs and invalidation rather than prescribing personal percentages. Only this lesson's review/modified date advances to 4 November, with the limited review scope stated. This was not a new statistical or source-video review. All changed sentences have explicit Urdu translations in `src/i18n/masterclass-weekly-review-urdu.json`; category translations are paired in `src/data/masterclassCategoryPages.ts`.

## Verification evidence

Local build/prerender logs: `outputs/masterclass-category-build.log`, `outputs/masterclass-category-prerender.log`.
Targeted scanner: `scripts/verify-masterclass-collections.ts` checks all six collections in EN and UR, category membership, real links, one H1, metadata parity, canonical/hreflang, ItemList and breadcrumbs, and absence of the legacy workbench or an automatically opened lesson.
Root hub regression scanner: `scripts/verify-masterclass-hub.ts`.
Full metadata/crawl logs: `outputs/masterclass-category-seo.log`, `outputs/masterclass-category-crawl.log`.
Browser evidence and final outcomes are recorded below after verification.

### Outcome

- TypeScript passed. Vite production build and prerender completed, including 759 localized social images.
- All 12 collection documents passed the targeted scanner. Root hub regression passed in EN/UR, including 29 distinct thumbnail compositions and lesson backlinks.
- Full SEO suite: 10,936 checks passed, zero failed. Crawl: 787 unique pages passed; all indexable pages reachable from home. Existing sitemap membership remains 759 URLs.
- Recorded content revision evidence only for the root hub, five category pages and weekly lesson, in both languages (14 pages). Other historical pending fingerprints were not assigned new dates.
- Browser: checked all five English collections, category navigation, Core search/list, lesson navigation/back, and disabled previous/next controls for the single Opening Ranges item. Light/dark desktop and 390px mobile EN/UR were checked; sampled mobile document widths stayed within the viewport. Urdu PD Arrays showed native RTL copy and eight cards. Weekly EN/UR output contains the topic-specific lesson art, no daily-candle diagram, and dateModified 2026-11-04.
- Screenshots: `outputs/masterclass-category-desktop.jpg` and `outputs/masterclass-category-grid.jpg`. Preview: port 4244, Core Masterclasses category.
- Not performed: formal Lighthouse, external schema-validator submission, exhaustive assistive-technology testing, or a new source-video/statistical review. Existing stage artwork retains its technical English labels; translated descriptions and captions are present. No production publication, merge or push.
