# Chapter 10 implementation report

Chapter: Internal vs External Market Structure. Permanent ID1010, display number10. Existing EN and UR URLs retained. No push, merge or deployment.

## Delivered content

The user approved the concept brief before drafting. This chapter is original educational writing, not a supplied manuscript or transcript summary. It contains16 numbered sections, five takeaways, four comparison/glossary tables plus two OHLC data tables, six glossary definitions, five native FAQs and three applied quiz questions. Three isolated table sentences were clarified so their caveats remain explicit when extracted without the column heading; the claims gate was not weakened.

The selected range and close-based test are labelled LearnSMC conventions. The chapter distinguishes local pivot geometry, swing significance, structure, inferred liquidity and actual execution. It includes fixed-anchor worked/failure paths, a ranging contrast, timestamped recognition, uncertainty and no-hindsight instructions. All prices are invented and labelled as an illustrative index, five-minute detail, America/New_York, without a historical trading date. No strategy performance, institutional-intent or guaranteed-outcome claim is made.

## Sources actually reviewed

- ICT2022 Episode3: existing local machine transcript at approximately34:49–35:47; official-channel public metadata checked. Discusses shorter-term highs/lows and imbalances within a retraced leg. No fresh full-video review claimed.
- ICT2022 Episode12: existing original-channel automatic captions at approximately10:00–12:38 and the local11:00 chart frame. Supports parent context, subordinate swings and reassessment when an expected reference fails.
- TradingView Williams Fractal official support: configurable lookbacks and the difference from a strict three-bar pivot.
- Investor.gov stop-order bulletin: stock-order execution caveats; explicitly not presented as futures venue rules or proof of particular hidden orders.

Source links, search queries, three opened competitor URLs, differences and limits are in research-and-source-map.md. Direct YouTube watch-page fetching returned shell content, so local transcript/caption evidence—not successful live playback—is the basis for the specific source pointers. No complete playlist or continuous full-video review is asserted. No source frames or transcript text are published.

## Visual inventory

Eleven original SVG/HTML figures, with captions and text fallbacks:
1. Two-map nesting with separate larger/smaller toggles.
2. Step1: fixed100–140 range bracket.
3. Step2: three-bar local-high comparison.
4. Step3: internal132/136/124 turns within the map.
5. Step4: distance from136 to137 versus140.
6. Step5: an evidence-note artifact, not an order ticket.
7. Wick/internal-break/external-break comparison.
8. One level in two nested maps.
9. Worked candle replay using the visible OHLC table.
10. Separate failure replay: first seven bars shared, then99/97 closes below100.
11. Range/chop contrast.

Replay controls are manual buttons, keyboard operable, with a polite live readout; the next bar is revealed only as completed. Numeric data and explanations remain in initial HTML. The initial internal-high label says unconfirmed until the right-hand bar closes. Small candle-entry motion respects reduced motion. No heavy animation library, new runtime dependency, autoplay or scroll interception was added.

## Metadata and publication

H1: Internal vs External Market Structure

Title: Internal vs External Market Structure | LearnSMC

Description: Learn internal vs external market structure: mark major and minor swings, distinguish a pullback from a larger break, and practise with annotated examples.

Native Urdu strings are in bilingual-review.csv. The existing UI is retained with content-first main/article,16px/1.9 body,16px/1.85 FAQ, restrained highlights, descriptive contextual links, one risk notice, personal notes and normal chapter pagination. Official ICT account promotion is not shown.

The new chapter changes from in-progress to published in the shared catalog. Directory:97 chapters,59 published,38 in progress. Expected sitemap:743 total URLs,118 published EN/UR lesson URLs. Placeholder noindex is removed only for this chapter. New Article, DefinedTermSet and visible FAQPage join the existing graph and breadcrumbs; the page has its own social image. The actual review date is13 November2026. datePublished is omitted because this new chapter has not been published live; the established course-origin date is not fabricated into a first-publication date for a new lesson.

## Files touched

New: src/data/chapters/structureDocument.json, structureDocument.ts, structureDocumentUrdu.json, structureUiUrdu.json, structureTranslations.ts; src/utils/structureMath.ts; src/components/StructureDocumentContent.tsx, StructureVisual.tsx; src/styles/structure-document.css; scripts/structure-localized-document.ts, verify-structure-document.ts; generated src/i18n/runtime/structure-overrides.json; docs/chapter10/*.

Scoped shared integration: src/data/chaptersData.ts, chapters/chapterQuizzes.ts, curriculumPhase1.json, curriculumReview.ts, page-revisions.json; src/utils/documentLessons.ts; src/components/ChapterRoom.tsx, CurriculumReview.tsx; src/App.tsx, src/main.tsx; src/i18n/urdu.ts, loadCatalog.ts; scripts/prerender.ts, seo-content.ts, social-cards.ts, urdu-pages.tsx, split-urdu-lessons.ts, generate-urdu-runtime.ts, verify-chapter-sections.ts, verify-lesson-semantics.ts, verify-mitigation-document.ts, verify-liquidity-document.ts; package.json; docs/curriculum-phase1-route-map.csv; generated catalog files.

The older document sitemap guards now derive counts from published lessons. Urdu directory fallback factoring reuses16 existing lesson chunks instead of12, with exact key/value reconstruction assertions; chapter overrides contain only differences. No translation is removed and the bundle limits stay unchanged. No unrelated dirty checkout work was reverted or staged.

## Verification

- Production build/prerender passed: outputs/chapter10/build.log.
- TypeScript passed: outputs/chapter10/typecheck.log (empty success log).
- SEO suite:11,038 passed, zero failed; full internal crawl:847 emitted pages passed.
- Chapter10 data/timing/translation/static verification passed: outputs/chapter10/preflight.json and static-verification.json. Previous rebuilt-chapter, status, routing, claims and semantic guards also passed.
- Stable runtime matrix passed in all eight EN/UR × light/dark ×1440/390 combinations: outputs/chapter10/browser-matrix.json and matching PNGs. Each has one H1,16 sections,11 figures, six tables, one risk notice, eight contextual links,44px replay controls and no horizontal page overflow. Body16px/1.9; FAQ16px/1.85; native Urdu RTL/font preserved.
- Script-free browser passed in both languages, including native exclusive FAQ: outputs/chapter10/script-free-browser.json. Served with script-src 'none'.
- Quiz completed3/3 correct: outputs/chapter10/quiz-check.json. Keyboard and replay outcome checks are in interaction-checks.json.
- Static versus actual React runtime manuscript comparison:139 checked blocks per language, zero missing; outputs/chapter10/runtime-wording-parity.json. Runtime presence is explicitly checked rather than accepting the static fallback as an interactive render.
- Sitemap/status/ledger:743 URLs,118 published lesson URLs,59 published chapters and38 placeholders; chapter10 EN/UR added with reciprocal alternates and evidenced13November revision date. Only these two ledger entries were recorded: outputs/chapter10/sitemap-evidence.json. Unrelated pending historical revisions were not stamped.
- Unchanged strict claims gate passed:446 bounded caveats reviewed, no route/file allowlist. The bundle gate passed with total emitted JS10,576,591 bytes below the unchanged10,621,000 ceiling; initial JS12,330 raw /5,195 gzip bytes. Exact Urdu fallback/override reconstruction assertions pass.

## Remaining verification limits

Human Urdu review remains pending; all draft translations are exported in bilingual-review.csv. Source pointers rely on selected automatic captions/local transcription and one chart frame, not continuous video review or fresh successful YouTube playback. No Lighthouse, live Google indexing/ranking, field Core Web Vitals, external Rich Results Test or assistive-technology certification is claimed. Reduced-motion CSS was inspected; an OS-level reduced-motion emulation was not run. The pages remain local and have not been pushed or deployed.

Local preview: http://127.0.0.1:4264/learn/internal-vs-external-structure/
