# Prepared PR: Audit batches 1–3 — metadata, reading parity and distinct tool-route guidance

Publication status: local preparation only. The user prohibits push/deploy. GitHub has no `fix/audit-batch-3` branch, so a PR containing its commits cannot yet be opened. Do not substitute an incomplete PR or upload commits through another API.

Proposed base: `main`. Proposed head: `fix/audit-batch-3`. Draft; never merge automatically.

## Description

Batch 1 corrected two Urdu snippets, derived Workbench facts from the shared catalog and added the Market Alchemy Article image. It is already merged via PR #29 (`463e56f`, merge `87df40d`), and is included here as provenance, not repeated in the diff.

Batch 2 shares actual reading views for Chart Lab, FVG glossary, OTE and Masood lectures; retains initial reading content during verified progressive enhancement; removes 28 dead Chart Lab fragment links; and fixes native Urdu generation validation. Commits `b3de1e7`, `08e3d65`.

Batch 3 reviews all 19 named tool routes individually and supplies original EN/UR instructions, invented worked examples, assumptions and limitations from a shared model. Commits: Chart Lab `c36ef0f`, Delivery `dde7fff`, Backtest `1274cfc`, Simulator `7ec9c96`. The named Chart Lab/Backtest/Simulator routes reuse one exercise per tool; differences and product decisions are explicitly recorded in `docs/audit-fix-progress.md`. No consolidation is performed.

## Validation and review limits

TypeScript and targeted shared-content/similarity checks passed. Production compilation and prerender completed; all 19 routes generate in EN/UR (38 pages) with matching study sections, language, canonical and en/ur/x-default annotations. All 342 production-page comparisons are below 0.90, maximum 0.654 (component fixtures previously measured 0.574). Generated Urdu catalog changes are retained with the verification commit. The earlier Batch 2 browser evidence covers 42 normal/delayed/failed/script-free snapshots; its script-free fixtures are not browser-engine JavaScript disabling.

Full suite/crawl remain Batch 6. Urdu needs author review. No URL removals, redirects, date stamping, meta keywords or FAQ rich-result work. Batch 4 waits for GSC priorities. Nothing merged or deployed by this work.
