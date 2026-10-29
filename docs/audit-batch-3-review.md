# Batch 3: individual tool-route review

The 19 affected paths are preserved. Word-trigram Jaccard is a regression heuristic, not a Google penalty threshold. Notes explain actual behavior rather than implying a route-specific engine that does not exist. EN/UR pairs are in the same source model; Urdu is pending author review.

## Chart Lab — completed locally

All six named URLs currently use the same six-case guided desk. The scenario label does not select the old instrument-specific replay. Each now has its own visible and prerendered study brief, invented worked example, assumptions and limitations. No new replay, historical-data claim or trading recommendation was added.

| Route suffix | Distinct purpose and boundary | Decision |
| --- | --- | --- |
| btc-2022-bullish-model | Separate lower sweep, recovery, confirmation and later gap return; no BTC historical execution | Preserve as topic-specific study brief |
| eur-mmbm-propulsion-model | Compare descending/reversal/ascending legs and define propulsion conventions without participant-identity claims | Preserve as topic-specific study brief |
| eurusd-failed-ob-breaker | Distinguish touch, close-through failure and bearish retest; separate pip arithmetic from the fictional desk | Preserve as topic-specific study brief |
| nq-ath-alchemy-ndog-macro | Separate session gap endpoints/midpoint from untraded ATH extension projections | Preserve as topic-specific study brief |
| nq-silver-bullet-short | Separate time eligibility, bearish confirmation and unfilled/invalidated outcomes | Preserve as topic-specific study brief |
| xauusd-gold-legacy-model | Compare midpoint touch, midpoint-close rule and sweep-extreme invalidation | Preserve as topic-specific study brief |

Targeted check: six routes in both languages, all four note sections present in shared runtime and initial HTML; maximum complete-document word-trigram Jaccard 0.574. TypeScript check recorded separately in ignored `outputs/audit-batch-3/`. No consolidation performed. A later product decision could replace shared exercises with genuinely distinct replays; that is outside this content batch.

Files: `src/data/chartRouteStudies.ts`, `toolRouteStudies.ts`; `src/components/ToolRouteStudy.tsx`, `ChartLab.tsx`; `src/i18n/urdu.ts`; `scripts/generate-urdu-runtime.ts`; `scripts/verify-audit-batch-3.ts`; this review and progress log.

## Delivery Suite — completed locally

| Route suffix | Actual module and distinct explanation | Decision |
| --- | --- | --- |
| macro-clock | Recurring New York reference windows; EDT/EST conversion example; no holiday/news feed or direction signal | Preserve |
| ote-calculator | Instrument-aware retracement and whole-unit sizing; default NQ example explains why a $250 budget produces zero contracts | Preserve |
| judas-planner | Actual control is range-multiple arithmetic, not a detected Judas setup; 100–110 range gives 125/85 at 1.5× beyond extremes | Preserve; misleading legacy name disclosed, no rename/redirect |
| learning-path | Device-local personal selections, independent from lesson completion and quizzes; export/storage limitations | Preserve |

All four receive EN/UR instructions, examples, assumptions and limitations from the shared model. Targeted checks pass with maximum complete-document word-trigram Jaccard 0.571. No clock schedules, calculator formulas, stored-data keys or checklist behavior changed. TypeScript runs per family. Files: `src/data/deliveryRouteStudies.ts`, registry `toolRouteStudies.ts`, `src/components/InstitutionalToolsSuite.tsx`, `scripts/tools-content.ts`, review/progress docs.

## Backtest — completed locally

The six names select a study focus, not six different strategy engines. Each now discloses that limitation and teaches a distinct protocol around the existing synthetic six-case checklist. No new profitability claims or fabricated historical measurements.

| Route suffix | Distinct study protocol | Decision |
| --- | --- | --- |
| 2022-mentorship-model | Qualification before outcome, frozen confirmation rules, filled versus unfilled denominator; invented net-R ledger | Preserve |
| charter-model-1 | Intraday cutoff, per-session sampling and higher-timeframe/lookback data requirements | Preserve |
| charter-model-8 | Pip objective versus actual net outcome, fixed weekly attempts and cash-risk distinction | Preserve |
| charter-model-9 | Weekly hypothesis without hindsight, holding-period/gap exposure and planned versus realized R | Preserve |
| silver-bullet | Formation/placement/fill cutoffs distinguished; date-aware timezone and boundary treatment | Preserve |
| breaker-reversal | Original block, defined failure, subsequent retest and all missing/invalid outcomes retained | Preserve |

Targeted EN/UR shared-note checks pass; maximum complete-document word-trigram Jaccard 0.335. TypeScript runs per family. The interactive engine, ledger rules and data storage are unchanged. Files: `src/data/backtestRouteStudies.ts`, registry `toolRouteStudies.ts`, `src/components/BacktestLab.tsx`, `scripts/tools-content.ts`, review/progress docs.

## Simulator — completed locally

| Route suffix | Distinct decision study | Decision |
| --- | --- | --- |
| ict-2022-model | Waiting versus chasing, no-fill versus a paper win, prior knowledge on replay | Preserve |
| failed-ob-breaker | Define failure before retest; invented short-risk arithmetic; explicitly disclose that the desk still uses gap-based conditions | Preserve |
| ote-expansion-long | Freeze swing anchors before the retracement; distinguish theoretical ratio from setup qualification and tick rounding | Preserve |

Targeted EN/UR checks pass; maximum complete-document word-trigram Jaccard 0.344. The execution engine, order rules and stored attempts are unchanged. Files: `src/data/simulatorRouteStudies.ts`, registry `toolRouteStudies.ts`, `src/components/TradeSimulator.tsx`, targeted scanner cross-family mode, review/progress docs.

## Family completion and limits

All 19 paths have instructions, a labeled invented worked example, assumptions and limitations in both languages. Shared notes are present in runtime components and generated reading content. The final targeted run checks 342 within- and cross-family EN/UR pairs; none reaches 0.90 (maximum 0.574). The scanner documents word-trigram Jaccard explicitly. TypeScript passed for every family. No full build/suite/crawl was run during Batch 3. Its generated production integration will be verified in Batch 6, not implied by targeted component rendering.

No consolidation is performed or proposed as necessary in this pass: the URLs now have distinct study purposes. The shared interactive cases remain a product limitation, prominently disclosed in the notes. Genuinely different named replays would require a separate product task. All Urdu pairs are directly reviewable beside English in the four `src/data/*RouteStudies.ts` files. No keyword/meta-keyword edits, FAQ schema work, date stamping, URL deletion, redirects, push, merge or deployment.

## Authorized production follow-up

After acceptance, the user authorized one production compilation/prerender. It completed successfully. `verify-audit-batch-3.ts <family> --production` checks the actual built files for all 19 routes in EN/UR (38 pages), not replacement component fixtures. Each has the correct study marker, heading, instructions, example, assumptions, limitations, language, canonical and en/ur/x-default annotations. All 342 production-page pairs remain below 0.90; maximum 0.654 (the wrapper contributes extra shared text). Family maxima: Chart Lab 0.572; Delivery Suite 0.654; Backtest 0.432; Simulator 0.416. Generated Urdu shared/tools catalogs are retained. Full suite/crawl are still deferred.

`docs/audit-fix-progress.md` now includes a per-route “Product decisions pending” inventory based on prop/data/storage flow. The no-push instruction prevents publishing the local review branch, so a complete Batches 1–3 PR is prepared in `docs/audit-batches-1-3-pr.md` but cannot be opened yet. GitHub branch lookup confirmed no remote `fix/audit-batch-3` branch. No alternate API is used to upload commits. Batch 4 remains stopped pending GSC priorities.
