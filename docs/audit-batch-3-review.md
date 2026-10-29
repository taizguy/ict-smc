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
