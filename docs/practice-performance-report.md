# Practice-loop claims and performance report

Completed locally on 5 November 2026, branch `feat/practice-loop`. Implementation commits: `bd1bd8b` and `36e58be`. No push, merge or deployment. Preview: http://127.0.0.1:4247/tools/chartlab/

All four hubs exceed the 75 mobile-performance target. Accessibility, Best Practices and SEO are 100 before and after on all six primary measured routes. The production content build/prerender, 10,936 SEO checks and 787-page internal crawl pass; the sitemap still has 759 URLs. **Default `npm run build` is not release-green:** its final claims gate correctly rejects protected, out-of-scope content.

## Item status

| Item | Status | Evidence / decision |
|---|---|---|
| A1 | Done | All 12 legacy routes and Urdu mirrors retitled; topic-bearing practice H1s, OG/Twitter, labels and schema names aligned. Existing URLs retained. All requested English titles fit ≤60; no shortening needed. |
| A2 | Done | Delivery title is 57 characters. Its scoped English length exception was removed. Native Urdu/social counterparts updated; existing 90-character Urdu editorial budget is documented, not a Google requirement. |
| A3 | Partly — blocked by scope | All 12 retired taxonomy descriptions removed from emitted text, including JS/catalogues/search/llms/social source text/sitemaps. Strict context-aware global claims gate remains red for protected content outside these tools. No route/file allowlist or unrelated copy edits. |
| A4 | Done | Visible price label equals accessible name; arrow decoration hidden from AT; one-/ten-tick keyboard movement, visible instructions and live readout verified in EN/UR. Initial-navigation Lighthouse accessibility is 100 on all hubs. Post-enhancement control also tested manually by keyboard. |
| A5 | Done | Build runs native legacy metadata/H1 checks, title budgets, exact data projections, retired-output proof and bundle budgets; default build additionally runs the strict global claims scan. Classifier fixtures reject three promises and accept bounded negatives/questions/distractors/reporting. |
| A6 | Done | Only 26 changed practice content fingerprints recorded for 2026-11-05. Unchanged pages/dates retained; no blanket stamping or URL consolidation. |
| B1 | Done | Staged createRoot retained verbatim in startApp; no hydrateRoot swap or startup-gate removal. Essential text, figures, tables and links remain native HTML. |
| B2 | Done | Tiny reading boot defers enhancement to workspace visibility or user intent. Existing reading charts reserve geometry. First-click/keyboard intent, focus and edited inputs retained. Chart/sandbox modules remain lazy; no startup loader prose added. |
| B3 | Done | 35 exact per-case chunks, candle-free chooser catalogues, 19 per-route study-brief JSON chunks, generated hub artwork and fixed reading tables. Grouped case sources are build-only. EN never imports the Urdu runtime catalogue. Backtest fetches all six only on its explicit action. All 29 selectors tested in both languages; six generic cases also tested. |
| B4 | Done | Three, motion, chart and React vendor groups separated. Named icon imports/tree-shaking retained; no duplicate runtime package instance identified in dependency evidence, no new runtime dependency or unnecessary polyfill added. No package removed without evidence it was unused. |
| B5 | Done | Fixed session/result tables precomputed by original Intl/execution functions and verified byte-for-byte as data projections. User-driven execution still uses the same engine. Static reading DOM survives case switches; only selected case/workspace updates. |
| B6 | Done — existing strategy retained | LCP is text, not a raster. Existing self-hosted WOFF2, swap strategy and used font preload retained; no extra preload or image conversion without benefit. Dimensioned SVG/reading previews retained. No further glyph subsetting claimed; Urdu coverage preserved. |
| B7 | Done | These routes are excluded from AdSense eligibility. No analytics/advertising script timing was changed; no third-party script requests found in measured navigations. Consent UI remains unchanged and appears with enhancement; screenshots use Continue without advertising. |
| B8 | Partly — edge unverified | Repo immutable cache headers for hashed assets verified. Local negotiated Brotli/gzip covers HTML/JS/CSS/JSON and mimics caching. Vite preload hints retained. Actual new-build Cloudflare compression, HTTP/2/3 and geographic edge latency were not tested or deployed. |
| B9 | Done | Measured size budgets wired into build, with modest headroom. Regression fixture exits nonzero; explicit --override records failure without changing limits. No silent baseline updates. |

## Comparable before/after measurements

Lighthouse 13.6.0, default mobile simulated throttling, three fresh runs per route, production output served with negotiated compression. Medians below; all raw reports/configuration are in `outputs/practice-performance/{baseline,final}/`. These are local lab readings, not field Core Web Vitals.

| Page | Performance before → after | LCP ms | TBT ms | CLS | Initial-navigation JS raw kB | Compressed JS transfer kB |
|---|---:|---:|---:|---:|---:|---:|
| Chart Lab | 51 → 98 | 8094 → 1567 | 1183 → 17 | 0 → 0 | 3659.2 → 11.6 | 947.5 → 5.5 |
| ICT Delivery Suite | 49 → 100 | 8573 → 1206 | 1190 → 5 | 0 → 0 | 3866.5 → 11.6 | 1012.3 → 5.5 |
| Trade Simulator | 54 → 100 | 8614 → 1208 | 931 → 3 | 0 → 0 | 3866.5 → 11.6 | 1012.3 → 5.5 |
| Backtest Lab | 52 → 100 | 8400 → 1355 | 921 → 0 | 0 → 0 | 3866.5 → 11.6 | 1012.3 → 5.5 |
| Silver Bullet study | 48 → 97 | 8451 → 1571 | 1662 → 135 | 0 → 0 | 3866.5 → 11.6 | 1012.3 → 5.5 |
| ICT 2022 Simulator legacy route | 52 → 100 | 8483 → 1357 | 991 → 2 | 0 → 0 | 3866.5 → 11.6 | 1012.3 → 5.5 |

JS transfer includes HTTP overhead and is the authoritative compressed network measurement. Historical baseline files are no longer all present for recomputing gzip/Brotli variants, so missing baseline compression variants are not invented. Per-request raw/transfer values remain in every baseline report. Final static entry is **11,603 raw / 5,043 gzip / 4,699 Brotli bytes**; `final/chunk-sizes.csv` lists raw/gzip/Brotli sizes for every emitted chunk. Initial navigation does not include later user-triggered enhancement payloads.

| Page | Long tasks >50 ms, median before → after | Lighthouse-reported unused JS kB, before → after |
|---|---:|---:|
| Chart Lab | 11 → 5 | 284.3 → 0.0 |
| ICT Delivery Suite | 11 → 3 | 301.9 → 0.0 |
| Trade Simulator | 10 → 2 | 303.0 → 0.0 |
| Backtest Lab | 9 → 2 | 302.3 → 0.0 |
| Silver Bullet study | 16 → 6 | 311.8 → 0.0 |
| ICT 2022 Simulator legacy route | 10 → 3 | 309.1 → 0.0 |

Zero unused-JS opportunities means none above Lighthouse's reporting threshold during initial navigation, not zero unused code across optional workspaces. Per-run long tasks, unused bytes and all requests are preserved in the summaries.

### LCP elements

All final LCP elements are native text. Example selectors from run 1 (each run retained separately):

- Chart Lab: `div.chartlab-hub > section.chartlab-hub-hero > div > p` — Chart Lab is a place to practise reading ICT and Smart Money Concepts, one obse…
- ICT Delivery Suite: `div.practice-page > section.practice-hero > div > h2` — Turn a fictional setup into a risk plan: stop distance, units and session time.
- Trade Simulator: `div.practice-page > section.practice-hero > div > h2` — Practise waiting, entering or skipping a fictional setup, one candle at a time.
- Backtest Lab: `div.practice-page > section.practice-hero > div > h2` — Apply one written checklist across six fictional cases and see what the record …
- Silver Bullet study: `div.predikt-workbench-body > div.chartlab-analysis > aside.practice-case-note > p` — Prerequisites: Silver Bullet · Fair Value Gap · Related curriculum lesson
- ICT 2022 Simulator legacy route: `div.space-y-6 > section.rounded-xl > div.space-y-2 > p.text-sm` — Read the supplied higher-timeframe context, sweep and confirmation before consi…

Baseline Backtest and Silver Bullet LCP was the privacy-choice paragraph in their first runs. Final initial navigations defer that existing App UI alongside enhancement; the native lesson/hero is already readable. This is explicitly part of the measurement change, not an image optimization claim. No ad script is eligible on these pages.

## Incremental implementation evidence

| Change / saved build | Static entry graph, raw bytes | All emitted JS, raw bytes |
|---|---:|---:|
| claim-cleanup | 1,302,421 | 9,652,162 |
| vendor-split | 502,172 | 9,651,436 |
| deferred-entry | 11,222 | 9,655,412 |
| reading-data | 11,222 | 9,663,947 |
| catalog-hub | 11,222 | 9,757,908 |
| pre-case-split | 11,279 | 9,825,941 |
| final | 11,279 | 9,833,931 |

The static entry graph differs from all immediately requested dynamic chunks: use the navigation table for actual initial network totals. Vendor isolation's diagnostic Chart Lab run moved 51 → 56 and 3,659,208 → 2,879,750 raw navigation JS bytes; it was a single diagnostic, not a median. Deferral diagnostics reached 100 on all four hubs. Later data/catalogue splits principally reduce activation work; no causal three-run score is claimed for each small change separately. Fixed-table Node computation was measured at 19.83 ms median in a 50-iteration diagnostic; this is not a browser-time claim. Per-phase manifests preserve byte evidence.

Bundle visualizations: `claim-cleanup/bundle-map.html` and `final/bundle-map.html`. Baseline's 15 largest initial modules/importers are in `claim-cleanup/largest-initial-modules.json`; final remaining optional modules/importers are in `final/largest-remaining-modules.json`. Module rendered lengths are before final chunk minification; they are not per-module compressed bytes.

## Data and interaction integrity

- All 35 chunks exactly match canonical pre-split data from commit `bd1bd8b`; baseline hashes are maintained separately from the existing shape-based uniqueness guard. The 29-case shape guard, UTC/DST/off-by-one tests, outcomes and CSV comparisons still pass.
- Four grouped case-source modules are absent from the browser bundle. Only metadata/names appear in chooser catalogues. Eight static evidence-section templates retain complete native reading (17 EN study instances plus Urdu mirrors); only interactive data is fetched per case.
- Request log proves first Silver Bullet fetch was `silver/s-a`. Backtest initially fetched only `guided/a`; its explicit six-case action fetched `guided/b`–`guided/f`. Sources: `case-loading-proof.json`, `case-requests.jsonl`. No cross-tool handoff or prefilled URL state was added.
- All 29 Chart Lab selectors exercised in EN and UR, with focus retained. Six generic cases exercised in both languages. C/F correctly withhold sizing for unmet conditions rather than inventing an entry.
- Keyboard Stop: 98 → 98.01 → 97.91 for Up then Shift+Down; live value verified in EN/UR, including after data splitting. Keyboard Simulator entry and six-case Backtest action work.

## Verification and screenshots

- TypeScript: `typecheck-final.log`. Production/prerender/full checks: `case-split-final-build.log`; supplementary cleanup/claims-fixture/budget checks also pass.
- 44 actual runtime documents and 44 script-blocked documents match normalized essential paragraphs/headings and internal links, without broad allowlists. Each script-blocked page has one visible H1. `runtime-parity.json`, `script-free-parity.json`, `runtime-parity.log`.
- Browser capture strings over 200 kB were collected in smaller pieces; truncated artifacts are explicitly rejected. No content exemption was introduced to make parity pass.
- No horizontal overflow at 360 px on all 44 runtime pages. 32 final screenshots: 390/1440 px × EN/UR × light/dark × four hubs in `after/`; 32 baseline screenshots in `before/`. Original final preview: `preview-final.png`.
- New Urdu review: [targeted metadata/labels](practice-cleanup-urdu-review.csv), [practice/interaction strings](practice-loop-urdu-review.csv). Native strings are implemented; human Urdu review remains pending.
- Legacy page findings/recommendations: [legacy route report](practice-loop-legacy-routes.md). No route was consolidated, removed or redirected.

## Release blockers and unverified areas

The strict global scan reports **26 emitted occurrences across 17 files**, none in Chart Lab, Delivery, Simulator or Backtest routes. Occurrences are not necessarily distinct issues; some need semantic review (for example a comparison-column label). Complete evidence: [claims CSV](practice-claims-blockers.csv) and `claims-scan.json`. Confirmed promises left untouched under the user's instruction include:

- `src/data/masoodNewPlaylists.ts:365`: 40% win rate / 1:3 R:R makes you consistently wealthy.
- `src/data/masoodData.ts:740`: guaranteed Thursday Seek & Destroy before NFP.
- `src/data/masterclassData.ts:259`: highest statistical win-rate claim.
- `src/data/masoodData.ts:527`: surgical precision in lecture summary.

No blanket route/file exemption was added. Normal `npm run build` runs the entire content suite and then this strict scan, so the branch must not be presented as deploy-ready until these protected-content blockers are decided. `npm run build:content` is the explicit content/performance verification command, not a claims bypass for release.

Remaining optional payloads include the shared chapter chunk (1,193,511 minified bytes), optional Three chunk (about 768 kB), Urdu catalogues and Workbench branches. They are not in the 11.6 kB reading boot. Global initial CSS remains 572,324 raw / 97,146 gzip bytes. Features/content were not removed to hit the target. Further activation-payload or route-CSS work should be profiled separately.

Additional shared-entry smoke checks (single runs): home 83 performance/96 accessibility, FVG lesson 62/100, /tools/ 61/100; all Best Practices/SEO 100, with no runtime or console errors. These are not before/after comparisons, and no unrelated content/design corrections were made. The revision helper also reports 392 other pending fingerprints outside the scoped operation; their lastmod dates were omitted rather than invented.

Not verified: real Cloudflare edge delivery of this unshipped build, field CWV/CrUX, physical assistive-technology testing, human Urdu review, or performance of every unrelated route. Lighthouse 100 does not establish complete accessibility or guarantee indexing/rankings.

## Files and reproduction

Changes are concentrated in scoped metadata/catalogues, shared startup/vendor splitting, the existing Workbench header, practice/market components, build-derived case/reading projections and verification scripts. The [full changed-file CSV](practice-performance-files.csv) lists 136 files, including generated projections. No unrelated curriculum/Masood/Masterclass content source was edited.

Reproduce with TypeScript, `npm run build:content`, `npm run verify:claims` (expected protected-content failure), `npm run verify:bundle`, and the browser collector/parity verification. Compressed preview: `node scripts/serve-compressed-production.mjs`; size override: `node scripts/verify-bundle-budget.mjs --override` (failure remains recorded). Raw evidence is local under `outputs/practice-performance/`, excluded from Git; this report/CSVs and reproducible checks are committed.

![Final Chart Lab desktop preview](../outputs/practice-performance/after/chartlab-en-1440-light.png)

## Release-blocker resolution — 2026-11-05
The earlier protected-copy blocker is resolved with owner authorization. Fourteen source statements were corrected in EN/UR; the full default build now passes the unmodified strict claims scanner with zero findings. Details and review CSV: docs/claims-release-resolution.md and docs/claims-wording-review.csv. Earlier blocker counts above describe the historical pre-correction snapshot.
