# Audit fix progress

Branch: `fix/audit-batch-4`, based on the reviewed Batches 1–3 feature branch. One commit per sub-batch 4a–4e. Feature-branch pushes and a review PR are authorized; pushing to main, merging and production deployment remain prohibited.

## Batch 4 — All remaining audit items

- **4a done:** topic-bearing home/curriculum H1s, retained visible taglines, unchanged title logic; light brand-aligned Masood hub/rules/six-series descriptions and eight priority concept descriptions (16 pairs). Genuine Urdu is authored with English, then catalog/report verification completes in 4d. Mitigation's actual canonical route is `/tools/glossary/order-blocks/mitigation-and-breakers/`.
- **Checks:** targeted description resolution/Urdu dictionary and EN/UR server-rendered single-H1/tagline checks pass. Production parity and title invariance are checked at the end.
- **4b done:** all 21 CSV-listed unit-prefixed descriptions rewritten as specific learner summaries, with genuine Urdu pairs. No numbering remains in the resolved snippets; OTE overlaps the priority list, giving 36 distinct changed description paths so far. Targeted scanner asserts the exact CSV route set and all paired values. Files: `src/data/audit4NumberedDescriptions.json`, `searchMetadata.ts`, `urdu.ts`, targeted scanner and this log.
- **4c done:** all 118 lecture descriptions preserve their exact existing English prefix and end with a unique, lecture-specific takeaway. Paired Urdu uses existing topic translations and the established terminology normalizer. Each takeaway was written from that lecture's title/summary/rules without repeating performance claims. `docs/audit-batch-4-lecture-evidence.json` records the source data and preserved prefix; targeted checks confirm 118 unique endings in both languages, source-data agreement and visible summaries/rules. Files: `audit4LectureDescriptions.json`, `audit4LectureTakeaways.json`, evidence, metadata/Urdu resolution, scanner and log. Total changed description paths: 154.
- **4d done:** genuine Urdu authored alongside every changed snippet/H1; runtime catalogs regenerated with route-family placement for derived metadata. Complete author-review inventory: `docs/audit-batch-4-urdu-review.md` (154 descriptions and two H1s). Metadata source resolution and exact dictionary checks pass; generated description/OG/Twitter parity will be scanned in the final 4e build. Files: catalog generator, review exporter/inventory, generated shared/chapters/Masood/tools catalogs and log. Human Urdu review remains the user's review step, not a missing implementation.
- **Files touched:** `src/data/audit4Descriptions.json`, `audit4Headings.ts`, `src/utils/searchMetadata.ts`, `src/i18n/urdu.ts`, `LearningFirstHome.tsx`, `CurriculumView.tsx`, `scripts/seo-content.ts`, `scripts/verify-audit-batch-4.ts`, this log.
- **In progress / next:** 4e routing, documentation, measured payloads and final verification. No items intentionally deferred from the current request.

## Batch 3 — Route specificity

- **Done:** Chart Lab (`c36ef0f`): six routes; Delivery Suite (`dde7fff`): four routes; Backtest (`1274cfc`): six routes; Simulator (`7ec9c96`): three routes. Each individually reviewed with distinct EN/UR instructions, worked example, assumptions and limitations. Shared exercise behavior and actual module capabilities are explicitly disclosed. All URLs preserved.
- **Verification:** targeted static/runtime note checks pass; maximum complete-document word-trigram Jaccard 0.574 (Chart Lab), 0.571 (Delivery Suite), 0.335 (Backtest), 0.344 (Simulator), both languages. All 342 within-/cross-family pairs are below 0.90, maximum 0.574. TypeScript passed per family. Evidence and individual decisions: `docs/audit-batch-3-review.md`.
- **Production follow-up:** subsequently authorized production compilation and prerender completed for the current Batch 3 source. The 19 routes generate in EN and UR (38 pages): all shared-study sections, HTML language, canonical and en/ur/x-default annotations passed targeted output checks. Production-page Jaccard maxima: Chart Lab 0.572, Delivery 0.654, Backtest 0.432, Simulator 0.416; all 342 pairs below 0.90. These include production wrapper text and are separate from the earlier component-fixture measurements. Generated shared/tools Urdu catalogs are retained with this follow-up. Bundle-size warnings remain for Batch 5. Full suite/crawl not run.
- **Files touched:** exact family inventory in the review. No shared startup/gate expansion, dates or metadata changes.
- **Status:** accepted by the user; production follow-up verified locally. Feature-branch publication and a combined review PR are now authorized. No merge or production deployment.
- **Next:** review PR and author review of Urdu; Batch 4 waits for the user's GSC priorities. Full suite/crawl remain Batch 6. Batch 1 is already merged (PR #29), so its work is referenced in the combined handoff rather than duplicated in the diff. PR text: `docs/audit-batches-1-3-pr.md`.

## Product decisions pending

Scope: the current local review build, not a claim that these changes are deployed. Chart Lab, Backtest and Simulator named routes share one exercise **per tool**. The tools themselves use different modes of `GuidedMarketDesk` (chart questions, checklist review and paper decisions), with the same six authored cases. Every named route starts from the same default Case A, unless the existing device-local session restores another case. The common `learnsmc-guided-desk-v1` storage key also means case/plan state is shared across the desk modes; there is no route-specific session key.

Today the slug changes the route heading/title, the EN/UR study brief (instructions, invented example, assumptions and limitations), and the text in “About this study link”. `studyFocus` is displayed there; it does not select bars, parameters, model logic or a market feed. No consolidation, deletion or redirect is approved. The user must decide whether each route should retain a distinct reading purpose, receive a genuinely distinct exercise, or be consolidated later.

| Route | What differs at runtime today | What does not differ within its tool |
| --- | --- | --- |
| `/tools/chartlab/btc-2022-bullish-model/` | BTC-focused heading/brief and BTC scenario focus label | Same case pool, candle questions, default data and evaluation; no BTC replay selected |
| `/tools/chartlab/eur-mmbm-propulsion-model/` | EUR MMBM/propulsion heading/brief and scenario focus label | Same chart exercise; no MMBM or propulsion engine selected |
| `/tools/chartlab/eurusd-failed-ob-breaker/` | EURUSD failed-block/retest heading/brief and scenario focus label | Same chart exercise; no EURUSD breaker replay selected |
| `/tools/chartlab/nq-ath-alchemy-ndog-macro/` | NQ NDOG/ATH projection heading/brief and scenario focus label | Same chart exercise; no NQ feed, gap matrix or macro filter selected |
| `/tools/chartlab/nq-silver-bullet-short/` | NQ bearish/time-window heading/brief and scenario focus label | Same chart exercise; no NQ short or clock-filtered exercise selected |
| `/tools/chartlab/xauusd-gold-legacy-model/` | Gold midpoint/invalidation heading/brief and scenario focus label | Same chart exercise; no gold replay or midpoint rule engine selected |
| `/tools/backtest/2022-mentorship-model/` | 2022-model qualification/net-R heading/brief and strategy focus label | Same checklist, six-case dataset and execution function; no separate strategy selected |
| `/tools/backtest/charter-model-1/` | Intraday sampling/lookback heading/brief and Charter 1 focus label | Same checklist; no 20-day lookback or Charter 1 implementation selected |
| `/tools/backtest/charter-model-8/` | Weekly pip-objective/cost heading/brief and Charter 8 focus label | Same checklist; no weekly pip-target strategy selected |
| `/tools/backtest/charter-model-9/` | Weekly hypothesis/gap-risk heading/brief and Charter 9 focus label | Same checklist; no daily/four-hour swing dataset or Charter 9 logic selected |
| `/tools/backtest/silver-bullet/` | Timestamp-eligibility heading/brief and Silver Bullet focus label | Same checklist; no Silver Bullet timestamp filter selected |
| `/tools/backtest/breaker-reversal/` | Failed-block/failure/retest heading/brief and breaker focus label | Same checklist; no historical breaker detector selected |
| `/tools/simulator/ict-2022-model/` | Waiting/no-fill heading/brief and 2022-model focus label | Same paper order/entry rules and cases; no separate 2022 model selected |
| `/tools/simulator/failed-ob-breaker/` | Breaker failure/short-risk heading/brief and breaker focus label | Same gap-based order checks; no breaker-only entry mode selected |
| `/tools/simulator/ote-expansion-long/` | Frozen swing/70.5% heading/brief and OTE focus label | Same gap-based order checks; no Fibonacci-anchored or OTE-only entry mode selected |

Delivery Suite is different: its slug really selects a reference module below the shared fictional risk desk. All four still use that common risk desk, but their module controls differ:

| Route | Actual runtime difference |
| --- | --- |
| `/tools/delivery-suite/macro-clock/` | Current New York clock, recurring-window table and next-window status; reference details initially collapsed |
| `/tools/delivery-suite/ote-calculator/` | Instrument, direction, anchors, budget inputs and retracement/size outputs; shared OTE assumption notes |
| `/tools/delivery-suite/judas-planner/` | Asian-range high/low inputs, width/midpoint and range-extension table; no Judas detector |
| `/tools/delivery-suite/learning-path/` | Curriculum checkboxes, local reviewed count and JSON export; independent of curriculum completion |

Evidence: route props in `ChartLab.tsx`, `BacktestLab.tsx`, `TradeSimulator.tsx`; `GuidedMarketDesk.tsx` uses `studyFocus` only in the study-link disclosure and always initializes `learningCases[0]`; `useMarketSession.ts` restores shared storage. Delivery selection is conditional on `initialModuleSlug` in `InstitutionalToolsSuite.tsx`. No product decision implemented during this verification.

## Batch 2 — Rendering and parity

- **Done:** shared actual route views for Chart Lab, FVG glossary, OTE calculator and Masood lectures; native Urdu document rendering; preserved reading HTML during staged enhancement with createRoot. Removed the irrelevant Chart Lab lesson diagram and its 28 dead fragment links. Shared assumptions/guides and deterministic initial case state prevent content drift.
- **Status:** accepted by the user; no merge or deployment by the agent. Urdu author review remains pending.
- **Files touched:** complete grouped inventory in `docs/audit-batch-2-review.md`. Changes cover the four route views, shared reading models, scoped startup, EN/UR generators and targeted parity checks.
- **Verification passed:** TypeScript; 254 targeted EN/UR documents; normalized essential headings/paragraphs in 42 browser snapshots covering normal, delayed, failed-entry and script-free documents, mobile, dark mode and Urdu. Four delayed before/after main-content geometry pairs had zero measured changes; four interactive smoke checks passed. Script-free fixtures are not a browser-level JavaScript-disable test. Full production build, suite and crawl remain Batch 6.
- **Committed:** `b3de1e7` on review PR #30; production follow-up `08e3d65` is included on the combined feature branch. Feature-branch push now authorized; no production deployment.
- **Production follow-up:** Vite production compilation and prerender completed. The Urdu gate initially checked discarded English body fragments; it now validates the head while the verified reading bodies use native Urdu rendering. Targeted production checks confirm 7 Chart Lab documents, one FVG entry, one OTE calculator and 118 lectures in each language. Home, the FVG curriculum lesson and `/tools/` screenshots match the live baseline (apart from theme preference icon/animation timing). Urdu strings are listed in `docs/audit-batch-2-urdu-review.md`. Full suite/crawl remain Batch 6.
- **Next:** Batch 3 authorized in order Chart Lab, Delivery Suite, Backtest, Simulator, with one local commit per family. No push/deploy; no URL/redirect changes.

## Batch 1 — Quick fixes

- **Done:** genuine Urdu Rejection Block/Hangman descriptions with static/client and description/OG/Twitter parity; shared Workbench catalog facts (66 chapters and current graph); visible representative Market Alchemy Article image for EN/UR.
- **Status:** merged by the user as `87df40d`. Author review of Urdu drafts remains pending; see `docs/audit-batch-1-review.md`.
- **Files touched:** `src/data/workbenchCatalog.ts`; `src/components/TradingToolsOverview.tsx`; `scripts/tools-content.ts`; `src/data/searchDescriptions.json`; `src/i18n/tools-urdu.ts`; `scripts/generate-urdu-runtime.ts`; `src/i18n/runtime/shared.json`; `src/i18n/runtime/tools.json`; `scripts/seo-content.ts`; `scripts/verify-audit-batch-1.ts`; `docs/audit-batch-1-review.md`; this log.
- **Verification passed:** `npm run lint` and `npx tsx scripts/verify-audit-batch-1.ts`. Checks cover unchanged English snippets, static/client Urdu parity, all 10 shared tool links/features, current count/graph and visible EN/UR Article image. No full build, suite or crawl run; those remain Batch 6. No sitemap dates stamped, startup gates changed, URLs deleted or redirects added.
- **Handoff:** Batch 2 separately authorized. Existing untracked GSC report/design prototypes remain excluded. Main and production stay untouched by this batch.

## Remaining batches

4. Scoped metadata work; Masood pages require supplied GSC priorities.
5. Measured performance/routing; no redirect changes without explicit approval.
6. Full suite/crawl, canonical/hreflang/sitemap and final diff review. Stop for approval.
