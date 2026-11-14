# Chapter 09 — Swing highs and lows: implementation and verification

Completed locally on 13 November 2026. Not pushed, merged or deployed.

## Content and scope

Preserved the supplied manuscript's H1, 21 numbered sections, heading order, five takeaways, 12 tables, glossary, seven FAQs and worked prices. Applied only the approved corrections recorded in proposed-corrections.md and the exact source-copy.json fixture (66 replacement records). Authoring directions and the optimisation playbook are not reader content. The existing hero placement, two-section navigation, personal notes and normal chapter controls remain. There is one financial risk notice and no Official ICT accounts block.

The published chapter keeps permanent ID 7, display number 09 and its existing URL, /learn/what-is-a-swing-the-atom-of-structure/. Native Urdu uses /ur/ plus the same path. Neither publication status nor other routes changed. The original publication baseline is 15 October 2026; this content revision is 13 November 2026. Only these two page-revision ledger entries were recorded.

## Visuals and practice

Nine original responsive SVG figures have their own captions and text fallbacks:

1. Atom of structure: raw synthetic candles and the corresponding computed pivot skeleton.
2. Three-candle validator: invented NQ OHLC prices; drag or keyboard-edit highs/lows, reject ties, and distinguish C2's pivot time from C3's closing confirmation time.
3. Auction sequence: a hypothetical buying/absorption/selling explanation, explicitly not observed orders.
4. Wick/body strip: marking a wick, a trade-through-and-return, and a close-based break.
5. Hierarchy: nine short-term lows, neighboring intermediate lows, then the long-term low; selectable or paused animation.
6. Protected reference: the manuscript's invented ES levels, with no guarantee of defense or a safe stop.
7. Three states: bullish, bearish and ranging structures.
8. Fractal comparison: the same candles under one-bar-right and two-bars-right rules.
9. Session map: the stated US cash-equity window, distinguished from Globex/platform templates.

Three applied quizzes cover confirmation timing, tied highs and the limits of protected-low labels. The Urdu quiz was completed in-browser with 3/3 correct answers. No animation autoplays; reduced motion disables playback and retains manual stepping. Slider targets measure 46px at 390px and 58px at 1440px. All prices are labelled invented/illustrative; no historical execution is claimed.

## Search, sources and metadata

Search queries and pages actually checked are recorded in search-and-source-review.md. There are no search-volume or ranking claims. Five primary references are published, from CME, TradingView and Investor.gov, with contextual source links and a complete source list. They substantiate contract/indicator/order conventions, not profitability or hidden institutional motives.

The supplied Williams Fractal YouTube URL could not be independently verified and is not presented as a verified source. No playlist-review claim is made.

- H1: What Is a Swing? The Atom of Structure
- Title: Swing Highs and Lows: 3-Candle Rule | LearnSMC
- Description: Learn swing highs and lows with the strict 3-candle rule, wick examples, confirmation timing, protected swings and interactive NQ and ES practice.
- Urdu metadata: recorded in outputs/chapter09/static-verification.json and bilingual-ui-review.csv.

Self-canonical, reciprocal en/ur/x-default, matching OG/Twitter descriptions, lesson-specific social image/alt, visible breadcrumbs and BreadcrumbList are checked. Article includes author, real publication baseline, modified date and image. DefinedTermSet matches nine visible glossary entries. FAQPage matches the seven native details/summary answers; no FAQ rich-result eligibility is promised. Definition/formula containers are semantically scoped, and main/article precedes the heavy chapter library in raw HTML. Person schema remains free of private contacts/address.

## Verification and evidence

- TypeScript: passed; outputs/chapter09/typecheck.log (empty success log).
- Full production build/prerender: passed; outputs/chapter09/build.log.
- SEO suite: 11,012 passed, zero failed.
- Full internal crawl: 847 unique emitted pages passed, valid schemas/links and indexable routes reachable from home.
- Curriculum/status/routing, strict claims, document semantics and existing document regressions: passed in the build.
- Chapter-specific approved-copy/math/static checks: outputs/chapter09/preflight.json and static-verification.json.
- Runtime manuscript parity: all 324 checked blocks/cells/headings/questions/answers present in each language, zero missing; outputs/chapter09/runtime-wording-parity.json.
- Script-free browser: CSP script-src 'none'; both languages show all 21 sections/nine figures and exclusive native FAQ works; outputs/chapter09/script-free-browser.json. This simulates script failure/disabled execution; it is not a separate assistive-technology audit.
- EN/UR, light/dark, 390px/1440px: one H1, 21 sections, nine figures, one risk notice, no page overflow. Body16px/1.9 and FAQ16px/1.85; outputs/chapter09/browser-matrix.json and eight matching PNG files.
- Keyboard, pointer drag, tied-high, C3-open, low-mode and hierarchy-step checks: outputs/chapter09/interaction-checks.json. FAQ and Urdu quiz screenshots are also saved.
- Sitemap: 741 URLs, including 116 published EN/UR lesson URLs; reciprocal alternates and Chapter09-only evidenced lastmod entries; outputs/chapter09/sitemap-evidence.json. The directory remains 97 lessons (58 published, 39 in progress).

The unchanged bundle gate initially caught duplicated Urdu dictionaries. Route overrides now contain only differences, and the directory fallback reuses twelve existing lesson chunks instead of five. Exact reconstruction assertions prove no translation key/value is lost. EN initial JS is 12,330 raw bytes; all emitted JS is 10,543,986 bytes versus the unchanged 10,621,000-byte ceiling (the failed intermediate build was 10,884,900). No dependency, content removal or budget increase was used. Evidence: outputs/practice-performance/bundle-budget.json and outputs/urdu-localization/fallback-parity.json.

## Files changed for this chapter

New content/data: src/data/chapters/swingDocument.json, swingDocument.ts, swingDocumentUrdu.json, swingTranslations.ts; src/utils/swingMath.ts.

New presentation: src/components/SwingDocumentContent.tsx, SwingVisual.tsx; src/styles/swing-document.css.

New verification/localisation: scripts/verify-swing-document.ts, scripts/swing-localized-document.ts; docs/chapter09/*; generated src/i18n/runtime/swing-overrides.json.

Scoped integrations: src/components/ChapterRoom.tsx, CurriculumReview.tsx; src/data/chapters/applyContentReview.ts, chapterQuizzes.ts; src/data/curriculumReview.ts, curriculumPhase1.json, curriculumPhase1.ts, page-revisions.json; src/utils/documentLessons.ts; src/App.tsx, src/main.tsx; scripts/prerender.ts, seo-content.ts, social-cards.ts, urdu-pages.tsx, split-urdu-lessons.ts, generate-urdu-runtime.ts, verify-chapter-sections.ts, verify-lesson-semantics.ts, verify-crawl.ts; src/i18n/urdu.ts, loadCatalog.ts, curriculum-review-urdu.ts; package.json; generated runtime catalogs. The existing shared interpretation translation remains available to the unchanged BOS/CHoCH/MSS pages.

No unrelated dirty checkout changes were reverted or staged.

## Review limits

Human Urdu review remains pending; reader strings are in bilingual-review.csv and additional UI/source/schema strings in bilingual-ui-review.csv. The supplied video remains unverified. No live Google indexing/ranking, field Core Web Vitals, Lighthouse run, screen-reader certification or production deployment is claimed.

Preview: http://127.0.0.1:4264/learn/what-is-a-swing-the-atom-of-structure/
