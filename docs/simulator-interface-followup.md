# Simulator brief follow-up — 2026-11-05

Scope: six existing /tools/simulator/<slug>/ study briefs and six Urdu mirrors. No URLs, execution rules, candle series, prices or existing titles/H1s changed. No push/deployment.

The old wrapper displayed the same generic Case A immediately under differently named topics. Three routes (Silver Bullet, London Judas and Macro News) had no dedicated ToolRouteStudy entry. Breaker and OTE written examples described different numbers from the generic displayed chart.

Changes:
- Each brief now uses the practice-page reading layout, breadcrumbs back to the simulator hub, RoleLine, LoopStrip, TakeawayBlock, NextStepBar, author/review/source/correction footer and previous/next brief navigation.
- Added native bilingual briefs for the three missing topics, with instructions, contrasting examples, explicit conventions and limits.
- Topic application links are distinct and point to existing real pages: 2022 -> BTC Chart Lab; Silver Bullet -> NQ Silver Bullet Chart Lab; breaker -> EUR/USD failed-block Chart Lab; OTE -> OTE calculator; Judas -> range planner (explicitly arithmetic, not a detector); news -> news/no-trade curriculum chapter.
- The unchanged six-case simulator remains available through an explicit open/close button and a hub link. It is clearly labelled general practice using the same data across all six briefs. No default chart is presented as an illustration of a written breaker/OTE example. No historical or dedicated-model replay is invented.
- All topic reading, limitations and links are present in native EN/UR HTML. Only the optional interactive exercise mounts on request; essential content is not behind that control.

Shared-file edits: TradingToolsWorkbench early dispatch and scoped practice-loop CSS selectors. Other tools retain their existing behavior. Generated runtime tool catalog includes the added bilingual study text. Review dates and revision recording apply only to the twelve changed documents.

Evidence: outputs/practice-performance/simulator-ui-build.log, simulator-ui-typecheck.log, simulator-ui-checks.json, simulator-ui-revisions.json and simulator-ui-preview.png. Targeted regression script: scripts/verify-simulator-brief-interface.mjs. The existing protected unrelated claims remain untouched; build:content is distinct from the separate strict claims release gate.

Verified: TypeScript, build:content, 10,936 SEO checks, 787-page crawl, existing bundle budgets and the twelve-document targeted scanner passed. Browser checks covered all twelve briefs: static/runtime study-text parity, one language control, no desktop overflow, and keyboard activation of the deferred shared exercise. Urdu dark at 390px had no horizontal overflow. Twelve changed fingerprints were recorded through the ledger. Bilingual review: docs/simulator-brief-urdu-review.csv (60 rows). Human Urdu review, assistive-technology testing and field Core Web Vitals remain unverified.
