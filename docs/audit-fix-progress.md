# Audit fix progress

Branch: `fix/audit-batch-1`. One commit per batch. PR review required. No merge, main push or production deployment authorized.

## Batch 1 — Quick fixes

- **Done:** genuine Urdu Rejection Block/Hangman descriptions with static/client and description/OG/Twitter parity; shared Workbench catalog facts (66 chapters and current graph); visible representative Market Alchemy Article image for EN/UR.
- **In progress:** review handoff only. Author review of Urdu drafts is pending; see `docs/audit-batch-1-review.md`. No Batch 2 work started.
- **Files touched:** `src/data/workbenchCatalog.ts`; `src/components/TradingToolsOverview.tsx`; `scripts/tools-content.ts`; `src/data/searchDescriptions.json`; `src/i18n/tools-urdu.ts`; `scripts/generate-urdu-runtime.ts`; `src/i18n/runtime/shared.json`; `src/i18n/runtime/tools.json`; `scripts/seo-content.ts`; `scripts/verify-audit-batch-1.ts`; `docs/audit-batch-1-review.md`; this log.
- **Verification passed:** `npm run lint` and `npx tsx scripts/verify-audit-batch-1.ts`. Checks cover unchanged English snippets, static/client Urdu parity, all 10 shared tool links/features, current count/graph and visible EN/UR Article image. No full build, suite or crawl run; those remain Batch 6. No sitemap dates stamped, startup gates changed, URLs deleted or redirects added.
- **Next:** one Batch 1 commit and review PR; stop for review. Batch 2 begins only in the next authorized work session. Existing untracked GSC report/design prototypes are excluded. Main and production stay untouched.

## Remaining batches

2. Rendering/parity, one route at a time; Chart Lab fragments and essential-content regression checks.
3. Individually review the 19 similar routes; distinct EN/UR explanations. Propose consolidation only.
4. Scoped metadata work; Masood pages require supplied GSC priorities.
5. Measured performance/routing; no redirect changes without explicit approval.
6. Full suite/crawl, canonical/hreflang/sitemap and final diff review. Stop for approval.
