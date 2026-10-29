# Masterclass Field Journal implementation

Branch: `feat/masterclass-field-journal`. Approved design: unfilled Field Journal with byline/review/source/correction blocks, individual figures, worked/failed cases, FAQ, related reading and previous/next links. Feature work only; no merge/deployment performed.

First-publication date for all 29 lessons: **2026-10-24**, confirmed by the publisher. It does not substitute for an individual modification or review date.

## Current implementation

- Shared component and scoped stylesheet are implemented. No coloured panels or quote sidebar; one accent/underline internal-link style.
- Draft/approved edition resolver prevents local editorial drafts silently replacing live pages.
- Runtime and static rendering share the same component. Optional exact reviewed metadata/image support added to SEO without changing existing defaults. Prerender and social-image integration accept approved editions only.
- Unit 15 authored English draft, SERP/PAA notes, original six-figure set, numerical steps, worked/failed series, sources and schema are complete for review. Full report: `docs/masterclass-journal-15-release-review.md`.
- No new page has cleared the full bilingual production release gate. Do not describe this as 29 completed lessons.

## Per-lesson release register

| Unit | Lesson | Status / next evidence |
| --- | --- | --- |
| 01 | Weekly move | Not rebuilt; topic/source research and individual numerical figures required |
| 02 | Draw on liquidity | Not rebuilt; topic/source research and individual numerical figures required |
| 03 | ICT 2022 model | English authored draft complete; six original figures, source passages, metadata and browser/static parity checked; native Urdu and activated production gate pending |
| 04 | CISD | Not rebuilt; source/variant verification required |
| 05 | IFVG | Not rebuilt; source/variant verification required |
| 06 | Silver Bullet | Not rebuilt; exact windows/source/example verification required |
| 07 | Unicorn | Not rebuilt; breaker/FVG relationship and source verification required |
| 08 | Opening range/octant grid | English authored draft: exact anchors, full boundary table, six original figures, two contrasting paths and metadata/source research; native Urdu and activated production checks pending |
| 09 | MMXM stage two | Not rebuilt; named variation/source verification required |
| 10 | Five opening ranges | Not rebuilt; session/window conventions and examples required |
| 11 | Propulsion block | Not rebuilt; source/definition verification required |
| 12 | Implied FVG | Not rebuilt; geometry/source verification required |
| 13 | Rejection block | Not rebuilt; source/boundary verification required |
| 14 | Mitigation block | Not rebuilt; source/boundary verification required |
| 15 | Standard deviation projections | English implementation/research/static checks complete; Urdu and remaining release checks pending |
| 16 | NY continuation/reversal | Not rebuilt; session decision rules/source verification required |
| 17 | First presentation FVG | Not rebuilt; precise named variation/source verification required |
| 18 | OTE | Not rebuilt; orientation/arithmetic/entry-variant verification required |
| 19 | Three-day rule | Not rebuilt; exact rule scope/source verification required |
| 20 | SMT | Not rebuilt; paired-instrument alignment and source verification required |
| 21 | Venom | Not rebuilt; existing source record available, full gate required |
| 22 | Reaper | Not rebuilt; existing source record available, preserve verified scope |
| 23 | Suspension block | Not rebuilt; existing source record available, preserve contract/body context |
| 24 | RDRB | Not rebuilt; precise originating source not verified in existing register; cannot silently certify |
| 25 | CRT | Not rebuilt; attribution/variant source research required |
| 26 | Sick sister | Not rebuilt; existing source record available, no fixed-leader claim |
| 27 | Double purge | Not rebuilt; source/definition verification required |
| 28 | Hangman | Not rebuilt; source/definition verification required |
| 29 | Macro windows | Not rebuilt; exact windows, timezone and attribution verification required |

## Files touched

New: `src/data/masterclassJournal.ts`, `src/components/MasterclassJournal.tsx`, `src/styles/masterclass-journal.css`, `src/utils/masterclassJournalRoutes.ts`, targeted verification/review-render/social scripts, original Unit 15 social assets and the two review documents.

Connections: `TradingToolsWorkbench.tsx`, `SEO.tsx`, `src/index.css`, `scripts/seo-content.ts`, `scripts/prerender.ts`, `scripts/social-cards.ts`. Existing style/helper behaviour remains the default outside approved editions or the local draft query.

Next: Unit 18 OTE using independent research and drawings; finish native Urdu and activated production release checks for all authored editions. Maintain per-lesson reports. No tool-URL consolidation, legacy-route deletion or date stamping.

## 29 October continuation checkpoint

- Unit 03 English draft completed: recorded primary-source passages, exact OHLC/chronology, worked and losing cases, specific related links, five visible FAQs and original social image.
- Browser parity: 66 normalized heading/paragraph nodes, hash 1291617545, identical static and runtime. Mobile 390px viewport / 384px page in both app themes; neutral sections retained.
- Fixed local journal contents navigation through Lenis; native fragment anchors remain for no-JS use. Replaced projection-specific shared risk prose with a required per-lesson risk note and corrected the Unit 03 risk chart to a proportional scale.
- Targeted verification passed for 12 distinct label-free figure compositions across Units 03 and 15. No activation, push, merge or deployment.


## Unit 08 continuation checkpoint

- Complete authored English ORG/octant draft, source and SERP/PAA report: docs/masterclass-journal-08-release-review.md.
- Static/runtime text parity: 64 normalized heading/paragraph nodes, hash 428611568. Local desktop light and mobile dark rendering checked; mobile viewport 390 / document 384. Mobile light app also checked: all six figure/SVG containers measure 352px within the viewport.
- Exact custom Fib ratios, nine boundaries/eight bands, explicit chart-close-versus-settlement distinction, and a midpoint deadline with both met/unmet invented outcomes.
- All authored drafts pass targeted checks: three one-H1 documents, 18 distinct labelled/captioned SVG compositions, 15 visible FAQ answers, valid local fragments and production draft guards.
- Added estimated reading time computed from authored prose and moved the sticky contents below the main navigation. No production activation or URL change.
- Remaining: 26 English editions, genuine Urdu counterparts and the complete activated production release gate. No push, merge or deployment.

Production compiler passed after Unit 08; existing 800kB chunk advisory remains. TypeScript passed. Draft activation/Urdu/full production crawl remain explicit pending work.

## Latest user direction — 29 October 2026

The expanded journal content feels too much like the curriculum. For Unit 03, retain the Field Journal UI, everything above the core-idea heading, and the FAQ, but use the original Masterclass catalogue content for the body. Implemented via MasterclassCatalogueBody using the shared original catalogue directly, without changing legacy catalogue data or the other lessons. Original core rule, diagram, breakdown, sequence, mistakes, invalidation, risk rules and related PD arrays restored. Expanded numeric worked/failed sections removed from the rendered Unit 03 draft. FAQ retained with minimal wording changes so it no longer points at removed examples. Metadata no longer promises worked/failed examples. Navigation targets and estimated reading time follow the actual body. Earlier Unit 03 six-figure evidence describes the superseded draft, not this revision. Draft-only; no push or deployment.
