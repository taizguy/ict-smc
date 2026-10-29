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
| 03 | ICT 2022 model | Not rebuilt; recorded Episode 2/4 passages available, full gate still required |
| 04 | CISD | Not rebuilt; source/variant verification required |
| 05 | IFVG | Not rebuilt; source/variant verification required |
| 06 | Silver Bullet | Not rebuilt; exact windows/source/example verification required |
| 07 | Unicorn | Not rebuilt; breaker/FVG relationship and source verification required |
| 08 | Opening range/octant grid | Not rebuilt; range convention, eight numerical levels and tool procedure required |
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

Next: finish Unit 15 native Urdu and full document/browser release checks; then Unit 03 and Unit 08 using their own independent research and drawings. Maintain per-lesson reports. No tool-URL consolidation, legacy-route deletion or date stamping.
