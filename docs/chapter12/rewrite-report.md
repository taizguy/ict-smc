# Chapter 12 implementation report

Chapter12, permanent ID9: **Break of Structure (BOS): Rules and Limits**. Original EN/UR URLs and published status retained. No push, merge or deployment.

## Content and source scope

Original learner-first writing, not a transcript summary or copied competitor article.16 numbered sections,4 takeaways, bullish/bearish and terminology comparisons, worked/failure OHLC tables, misconception table,5 glossary entries,6 visible native FAQs and3 applied quiz questions. Each step has a figure.13 SVG/HTML figure instances include threshold inspection, pivot recognition, fixed references, timing, replay and execution arithmetic. The existing hero placement, notes, completion and previous/next navigation are retained; only Textbook and Practice/Quiz navigation is shown.

The selected map, strict close test and three-bar pivot are explicit conventions. A wick, completed break and later outcome are distinguished. Internal/external conflicts, ranges, failed breaks, non-retests, unfilled entries, missing FVG filters, optional premium/discount selection and unknown OHLC execution order are covered. No performance, hidden-order or outcome promise is made.

Sources actually consulted and live Google/PAA observations are recorded in [the research/source map](research-and-source-map.md). Four primary references are linked with limited scopes; selected ICT automatic-caption passages are approximate, not a full-playlist review. All teaching prices are invented for an illustrative index/five-minute/America_New_York study, with no historical trading date.

## Technical implementation

- Shared typed bilingual document rendering and native Urdu whole-sentence translation, with route-scoped overrides.
- Full prose, lists, tables, captions, quizzes and FAQ answers in initial HTML; replay is progressive enhancement.
- Main/article before the heavy library; one H1 and one financial-risk notice; scoped definitions/conventions; no Official ICT accounts section.
- Article, DefinedTermSet, visible FAQ and BreadcrumbList parity; author privacy retained. Existing publication baseline15October2026, review14November2026.
- Page-specific social image/alt, English/Urdu description parity, self-canonical and reciprocal language links.
- Body16px/400/1.9; FAQ16px/400/1.85; native exclusive details, keyboard controls and reduced-motion handling.
- Source catalog retains97 entries,59 published/38 in progress; sitemap remains743 URLs,118 published EN/UR lesson URLs. No URL migration.

## Files

Chapter content: `src/data/chapters/bosDocument.json`. Paired shared implementation: `breakDocuments.ts`, `breakDocumentUrdu.json`, `breakTranslations.ts`, `src/utils/breakMath.ts`, `src/components/BreakDocumentContent.tsx`, `BreakVisual.tsx`, `src/styles/break-document.css`. Native prerender: `scripts/break-localized-document.ts`. Guards: `scripts/verify-break-documents.ts`, `verify-break-browser-evidence.ts`.

Integration edits: chapter review/quiz adapters, ChapterRoom, CurriculumReview, documentLessonIds, App/prerender risk handling, metadata/schema/social scripts, curriculum metadata/crosswalk, Urdu generator/splitter/loader/catalogues, styles entry and verification/build hooks. These changes support these two chapters; unrelated existing local edits were preserved.

The Urdu directory fallback now reuses32 existing lesson chunks instead of16. Exact dictionary reconstruction is asserted; no text is removed or put behind a click. This keeps the unchanged byte budget while adding both full bilingual chapters.

## Verification evidence

- `outputs/chapter12-13/typecheck.log`
- `outputs/chapter12-13/build.log`
- `outputs/chapter12-13/preflight.json`
- `outputs/chapter12-13/static-verification.json`
- `outputs/chapter12-13/browser-matrix.json` and `browser-parity.json`
- `outputs/chapter12-13/script-free.json`
- `outputs/urdu-localization/fallback-parity.json`
- `outputs/practice-performance/bundle-budget.json`
- `outputs/chapter12-13/` screenshots: EN/UR, light/dark,390/1440px.

Final run status and revision records are summarised in the paired [completion report](../chapter12-13-completion.md). The build includes the existing full SEO, crawl, routing, claims and bundle gates; browser evidence checks essential static/runtime wording separately.

## Limits

No live deployment/indexing/ranking verification, empirical strategy validation, complete-playlist review, historical example verification, field CWV measurement or assistive-technology certification. Urdu is authored and mechanically checked but still benefits from the user’s language review. Google FAQ rich-result eligibility is not claimed.
