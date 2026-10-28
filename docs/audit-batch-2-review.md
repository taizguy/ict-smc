# Batch 2 review: rendering and essential-content parity

Scope: Chart Lab and its six scenarios, the FVG glossary entry, OTE calculator, and 118 Masood lectures, in English and Urdu (254 documents). Only the relevant audit sections and affected-URL inventory were consulted. No URL consolidation, redirect, metadata rewrite or sitemap-date changes.

## What changed

- Initial HTML now uses the actual route components and shared content models. Native Urdu rendering avoids differences caused by translating serialized English markup.
- Only these generated routes retain visible reading content while React prepares an inert off-screen view. The mounted container is promoted when ready, preserving React event delegation. Slow or failed entry loading keeps the original content visible. This uses createRoot, not hydration. Other routes retain their previous startup policy.
- Chart Lab no longer includes an unrelated FVG lesson diagram with 28 dead lesson-local fragment links across 14 EN/UR documents. Guides remain available in both initial HTML and runtime.
- OTE assumptions and lecture attribution are shared with the visible route; initial guided case data is identical on server and client. A static SVG preview uses only currently revealed candles while the interactive chart loads.
- A normalized heading/paragraph parity scanner has an exact-route, exact-text tab exception format. There are currently no tab-only exceptions. Explicit exclusions cover clock updates and chart UI, not educational prose.

## Evidence

- `npm run lint`: TypeScript passed.
- `npx tsx scripts/verify-audit-batch-2.ts`: generated 254 targeted documents using existing metadata fixtures; no full production build.
- `npx tsx scripts/verify-audit-batch-2.ts --compare`: 42 saved browser snapshots passed essential-content, visible-root and no-horizontal-overflow checks. Normal EN desktop/light, UR desktop/dark, EN mobile/light and UR mobile/dark were checked for all four route families. Delayed enhancement, failed entry loading and script-free fixtures were also checked.
- All four delayed pre/post main-content measurements had zero position/size deltas. This is a targeted geometry check, not a Lighthouse or field CLS measurement.
- Interactive smoke checks: Chart Lab answer/continue; OTE anchor recalculation; FVG glossary tab selection; lecture source-video activation.
- Local evidence is in ignored `outputs/audit-batch-2/`: static-essential.json, browser-final-samples.json, parity-results.json, interaction-checks.json, TypeScript log and screenshots.

## Limits and review

The script-free fixtures remove scripts; browser JavaScript was not disabled at the browser-engine setting. The preview serves targeted generated reading documents with current source modules, not a new production bundle. Full build, 10,936-check suite, 787-page crawl and canonical/hreflang/sitemap verification remain Batch 6. Preview HMR websocket warnings were development-only. Urdu needs the author's review. No production deployment or merge is authorized.

## Files touched

- Startup: `index.html`, `src/main.tsx`; moved the existing Workbench stylesheet import from `TradingToolsOverview.tsx` to the entry to support server rendering.
- Route sharing: `src/components/AuditedRouteDocument.tsx`, `src/utils/auditedReadingRoutes.ts`, `scripts/audited-reading-document.ts`, `scripts/prerender.ts`, `scripts/seo-content.ts`, `scripts/tools-content.ts`, `scripts/urdu-pages.tsx`.
- Reading content: `ChartLab.tsx`, `InstitutionalToolsSuite.tsx`, `MasoodLecturePage.tsx`, `TradingToolsWorkbench.tsx`, `StudyReadingNotes.tsx`, `DeliveryReferenceNotes.tsx` under `src/components/`; `src/data/deliverySuiteReading.ts`.
- Market preview/state: `src/components/market/ReadingChart.tsx`, `GuidedMarketDesk.tsx`, `useMarketSession.ts`.
- Urdu: `scripts/generate-urdu-runtime.ts`, `src/i18n/tools-urdu.ts`, `editorial-urdu.ts`, generated runtime shared/tools/masood JSON catalogs.
- Checks/docs: `scripts/audit-parity-content.ts`, `audit-parity-allowlist.json`, `verify-audit-batch-2.ts`, this review and `docs/audit-fix-progress.md`.
