# Practice loop — local implementation record

Date: 4 November 2026. Branch: `feat/practice-loop`. No push, merge or deployment authorized for this task.

## Discovery reported before edits

- Chart Lab has six dedicated studies with 29 authored contrasts. Gold, Bitcoin, MMBM and NDOG use `chartLabRemaining*`; Silver Bullet and breaker use their own datasets and evidence functions.
- Simulator, Backtest and Delivery use `GuidedMarketDesk`, `learningCases`, `casePlan`, `evaluateCase` and `marketExecution`. Their six named execution routes do not select six independent model datasets. The six generic cases are shared; route-specific study briefs supply different context.
- Routing is centralized in `workbenchToolRoutes.ts` and `TradingToolsWorkbench`. Root and sub-page URLs remain unchanged. The 12 legacy execution routes are reported in `practice-loop-legacy-routes.md`, not rewritten or redirected.
- Chart Lab already has native EN/UR static rendering through `AuditedRouteDocument`, `auditedReadingRoutes`, `audited-reading-document`, `seo-content` and `urdu-pages`. These mechanisms are reused for the three other hubs.
- Existing safeguards: `sitemap-dates.ts` / `page-revisions.json`, the normalized essential-reading collector and explicit allowlist, Urdu runtime generation, full SEO/crawl checks and Chart Lab study/uniqueness checks. Evidence lives in `outputs/practice-loop/`.

Shared-file edits were announced before implementation: tool routing/navigation and catalogue; audited document registry/renderer; SEO/prerender/social scripts; Urdu generation; verification; and the homepage practice section.

## Implementation

- **Done:** typed bilingual `CaseFile` registry with six spine records, 29 original variants and six tool-specific records. Arrays and numerical rules are reused, not regenerated. Estimated minutes/difficulty are editorial learning labels. Unknown OHLC outcomes remain unclassified; the breaker recognition study has null order prices because its source does not define an executable plan.
- **Done:** topic relationships for 2022, Silver Bullet and failed-block/breaker legacy routes. Availability links distinguish the same data from a related topic. The generic six-case dataset is related to the 2022 sequence, but is not relabelled as the Chart Lab Bitcoin data.
- **Deliberately not built:** executing every spine dataset inside the other tools or passing input/state between tools. The new hubs use separate browser session keys. Old stored sessions are not deleted. Future execution adapters must preserve each study's distinct rules; topic similarity is not sufficient.
- **Done:** RoleLine, LoopStrip, CaseCard, NextStepBar, TakeawayBlock and TrustFooter shared by the four hubs. Chart Lab study pages gain time/difficulty/prerequisites and next-step navigation. Original Chart Lab explanations, FAQ, sources, study cases and diagrams are retained.
- **Done:** three hub layouts follow the eight-block sequence, preserve the original risk/replay/checklist exercise, and provide distinct original illustrations. Named legacy links remain discoverable, with an explicit disclosure that they run the shared authored cases.
- **Done:** Delivery sizing/OTE/Judas formula examples and dated NY/UTC/Karachi session table. Times use IANA conversion and include standard/daylight examples and midnight rollover; no fixed year-round UTC offset.
- **Done:** Simulator fill assumptions, no-fill decision review, behavioural errors, and existing legitimate skip cases. Backtest table calls `evaluateCase` at 1.5R minimum and 0.05R fixed cost; no empirical performance claim. CSV guide/template and metric caveats are visible static content.
- **Done:** root metadata, native Urdu copy, schema author/breadcrumbs, social-image hooks, no startup loader text on the four hubs/Chart Lab studies; homepage four-step copy and menu order. Delivery's explicitly requested 62-character title and the three requested descriptions (up to 160 characters) have narrowly scoped editorial-budget exceptions, not site-wide relaxed checks.
- **Done:** review CSV (`practice-loop-urdu-review.csv`), generated from actual paired strings; author review is still required. A downloadable 40-bar CSV copies existing synthetic BTC context prices and UTC timestamps. No new prices or statistics were invented.

## Search and source review

Queries: “ICT backtesting checklist costs R expectancy overfitting”, “ICT trade simulator candle replay limit order fill”, and “ICT OTE calculator killzone New York Pakistan time”. Search-result positioning was reviewed, not used as evidence of volume or a ranking promise. Titles use the user's specified topics; descriptions describe actual functionality.

Search-result titles/snippets consulted for intent: [ICT backtesting guide](https://www.ictkillzone.com/ict-backtesting), [backtest validation checklist](https://www.tesseratrades.com/learn/backtest-validation-checklist), [killzone clock](https://www.ictkillzone.com/tools-killzone-clock), [Pakistan killzone conversion tool](https://proea.app/en/tools/ict-killzone-times/pakistan), [Liquidity Sweeps tools](https://liquiditysweeps.com/tools/). These are not authorities for the site's execution rules.

Primary references opened: [NIST DST rules](https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst) and [CME NQ specifications](https://www.cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.contractSpecs.html). Synthetic prices/rules come from the existing repository. The fictional $1/point instrument is not represented as an NQ contract.

## Verification and evidence

- **Done:** TypeScript, production build/prerender, 10,936 SEO checks and the 787-page internal crawl passed. All 759 sitemap URLs remain; canonical, reciprocal hreflang and schema checks passed. Final output: `outputs/practice-loop/contrast-build.log`, following `release-build.log`. No new redirects or removed URLs.
- **Done:** `verify-practice-loop.ts` checks eight native EN/UR hubs: exact metadata, one H1, role/loop/cards/next/trust, loader absence, original candle/rule integrity, valid availability links/fragments, DST conversion and usable CSV input. See `static-checks.json`.
- **Done:** normalized essential paragraphs/headings and internal links match all eight runtime documents without blanket exemptions (`browser-reading.json`, `browser-parity-result.json`).
- **Done:** 32 screenshots: four hubs × EN/UR × light/dark × 390/1440px (`screenshots/`). All eight hydrated pages fit at 360px (`360-overflow.json`). A transient pre-ready measurement was retested after the explicit startup-ready condition.
- **Done:** script-free production fixtures retain readable content, real links, one H1 and four loop links on all eight pages (`script-free-reading.json`). Scripts are removed and blocked by CSP using the existing audit approach; this does not claim that a global browser setting was toggled. Execution needs JavaScript; explanations do not.
- **Done:** keyboard navigation reaches the next loop step, Enter opens/closes FAQ, and Case F opens the stand-aside exercise (`keyboard.json`). Urdu case letters A–F remain literal in the chooser, table and illustration. Citation titles retain official names.
- **Done:** 24 materially changed scoped routes receive evidence-backed 2026-11-04 revisions: homepage, Workbench, four hubs and six Chart Lab studies, EN/UR (`revision-evidence.json`). Unrelated pending historical fingerprints are not stamped; unknown dates remain omitted.
- **Done:** new source-link checks: NIST returns 200; CME rejects automated HEAD with 403, so its availability is not asserted by the crawler (`outbound-links.json`). Internal links are covered by the full crawl; this is not an exhaustive test of old external sites.
- **Done:** 194 review pairs in `practice-loop-urdu-review.csv`, including the contextual sell-side label; 193 generated runtime keys. Human Urdu review remains required.

### Performance: measured, not optimized

`performance-summary.json` records Lighthouse mobile scores and requested script bytes. The first final-production run scored Chart Lab 49/100/100/100, Delivery 44/97/100/100, Simulator 50/100/100/100, Backtest 51/100/100/100 (performance/accessibility/best practices/SEO). Delivery's remaining Stop-handle contrast was corrected with scoped CSS: its focused retest scores **100 accessibility**, with the contrast audit passing (`lighthouse-delivery-accessibility-final.json`). Performance was not remeasured during the concurrent image-generation build. These are lab measurements, not ranking guarantees. Large existing bundles remain a limitation.

Compared with the saved previous main-build log, all emitted JS artifacts total 9,567.22 → 9,653.79 kB (+86.57 kB); summed gzip estimates 2,921.70 → 2,950.02 kB (+28.32 kB). This includes lazy chunks, not just initial payload. Lighthouse requested approximately 3.66 MB JS for Chart Lab and 3.87 MB for the other hubs on the uncompressed local preview. Cloudflare transfer differs. No new runtime dependency.

### Partly / deliberately outside this pass

- **Partly:** shared case identity and availability work; the Chart Lab spine datasets are not executed in other tools yet. Named Simulator/Backtest routes map by genuine topic overlap only. Their existing six-case runner and legacy content remain. The 12-route report gives individual recommendations; no consolidation occurred.
- **Partly:** Delivery worked examples and the computed DST table are on the hub, linking to preserved calculator modules. The sizing exercise remains. This does not claim every calculator sub-page was redesigned.
- **Skipped by scope:** cross-tool input transfers, execution adapters for all 29 spine variants, legacy rewrites/deletion/redirects and site-wide performance refactoring. No prefilled handoffs.
- **Unverified:** assistive-technology hardware, field Core Web Vitals, exhaustive manual keyboard testing of every existing drawing/sandbox control, all old outbound links and human Urdu editorial approval. Lighthouse also flags the existing chart drag-arrow/accessibility-name relationship; no claim of perfect accessibility.

## Files changed

- Data/utilities: `practiceCases.ts`, `practiceLoopContent.ts`, `practiceSessionTime.ts`, `practiceSchema.ts`.
- Shared UI: `src/components/practice/`, `practice-loop.css`, `main.tsx`.
- Integrations: `TradingToolsWorkbench`, `ChartLab`, `market/ChartLabHub`, `market/GuidedMarketDesk`, `LearningFirstHome`, Workbench catalogue, Chart Lab hub data, homepage CSS, audited registry/renderer.
- Build/SEO: package scripts; prerender, SEO content, social cards, Urdu generation, crawl/Chart Lab scanners; new evidence, legacy-report, fixture and practice verification scripts.
- Language: `urdu.ts`, `practice-loop-urdu.json`, generated `runtime/shared.json`, review CSV.
- Evidence: scoped `page-revisions.json`, this report, legacy report and unchanged-price CSV template.

## Local review

Preview: http://127.0.0.1:4245/tools/chartlab/ (other hubs retain their paths).
Branch: `feat/practice-loop`. No push, merge or deployment. Unrelated untracked design/audit files are excluded.
