# Audit fix progress

Branch: `fix/audit-batch-3`, based on the Batch 2 review branch and its local production follow-up. One local commit per Batch 3 family, as subsequently requested. No push, merge or deployment authorized.

## Batch 3 — Route specificity

- **Done:** Chart Lab (`c36ef0f`): six routes; Delivery Suite: four routes. Each individually reviewed with distinct EN/UR instructions, worked example, assumptions and limitations. Shared exercise behavior and actual module capabilities are explicitly disclosed. All URLs preserved.
- **Verification:** targeted static/runtime note checks pass; maximum complete-document word-trigram Jaccard 0.574 (Chart Lab), 0.571 (Delivery Suite), both languages. TypeScript checked per family. Evidence and individual decisions: `docs/audit-batch-3-review.md`.
- **Files touched:** exact family inventory in the review. No shared startup/gate expansion, dates or metadata changes.
- **In progress / next:** finish Delivery Suite local commit, then Backtest and Simulator. Full suite/crawl remain Batch 6; Urdu author review pending.

## Batch 2 — Rendering and parity

- **Done:** shared actual route views for Chart Lab, FVG glossary, OTE calculator and Masood lectures; native Urdu document rendering; preserved reading HTML during staged enhancement with createRoot. Removed the irrelevant Chart Lab lesson diagram and its 28 dead fragment links. Shared assumptions/guides and deterministic initial case state prevent content drift.
- **In progress:** review handoff only; no merge or deployment. Urdu author review remains pending.
- **Files touched:** complete grouped inventory in `docs/audit-batch-2-review.md`. Changes cover the four route views, shared reading models, scoped startup, EN/UR generators and targeted parity checks.
- **Verification passed:** TypeScript; 254 targeted EN/UR documents; normalized essential headings/paragraphs in 42 browser snapshots covering normal, delayed, failed-entry and script-free documents, mobile, dark mode and Urdu. Four delayed before/after main-content geometry pairs had zero measured changes; four interactive smoke checks passed. Script-free fixtures are not a browser-level JavaScript-disable test. Full production build, suite and crawl remain Batch 6.
- **Committed:** `b3de1e7` on review PR #30. Follow-up production verification is committed separately; no push/deploy authorized for that follow-up.
- **Production follow-up:** Vite production compilation and prerender completed. The Urdu gate initially checked discarded English body fragments; it now validates the head while the verified reading bodies use native Urdu rendering. Targeted production checks confirm 7 Chart Lab documents, one FVG entry, one OTE calculator and 118 lectures in each language. Home, the FVG curriculum lesson and `/tools/` screenshots match the live baseline (apart from theme preference icon/animation timing). Urdu strings are listed in `docs/audit-batch-2-urdu-review.md`. Full suite/crawl remain Batch 6.
- **Next:** Batch 3 authorized in order Chart Lab, Delivery Suite, Backtest, Simulator, with one local commit per family. No push/deploy; no URL/redirect changes.

## Batch 1 — Quick fixes

- **Done:** genuine Urdu Rejection Block/Hangman descriptions with static/client and description/OG/Twitter parity; shared Workbench catalog facts (66 chapters and current graph); visible representative Market Alchemy Article image for EN/UR.
- **Status:** merged by the user as `87df40d`. Author review of Urdu drafts remains pending; see `docs/audit-batch-1-review.md`.
- **Files touched:** `src/data/workbenchCatalog.ts`; `src/components/TradingToolsOverview.tsx`; `scripts/tools-content.ts`; `src/data/searchDescriptions.json`; `src/i18n/tools-urdu.ts`; `scripts/generate-urdu-runtime.ts`; `src/i18n/runtime/shared.json`; `src/i18n/runtime/tools.json`; `scripts/seo-content.ts`; `scripts/verify-audit-batch-1.ts`; `docs/audit-batch-1-review.md`; this log.
- **Verification passed:** `npm run lint` and `npx tsx scripts/verify-audit-batch-1.ts`. Checks cover unchanged English snippets, static/client Urdu parity, all 10 shared tool links/features, current count/graph and visible EN/UR Article image. No full build, suite or crawl run; those remain Batch 6. No sitemap dates stamped, startup gates changed, URLs deleted or redirects added.
- **Handoff:** Batch 2 separately authorized. Existing untracked GSC report/design prototypes remain excluded. Main and production stay untouched by this batch.

## Remaining batches

2. Rendering/parity, one route at a time; Chart Lab fragments and essential-content regression checks.
3. Individually review the 19 similar routes; distinct EN/UR explanations. Propose consolidation only.
4. Scoped metadata work; Masood pages require supplied GSC priorities.
5. Measured performance/routing; no redirect changes without explicit approval.
6. Full suite/crawl, canonical/hreflang/sitemap and final diff review. Stop for approval.
