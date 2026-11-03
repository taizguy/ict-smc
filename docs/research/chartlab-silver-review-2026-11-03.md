# Silver Bullet review stop — 3 November 2026

Follow-up: the owner subsequently authorised the other four studies. Their completed implementation and verification are recorded in [the four-route review](chartlab-four-review-2026-11-03.md). The review-stop statements below describe the earlier Silver-only milestone.
Branch `fix/chartlab-five-route-studies`. User approved revised specifications but explicitly required building **Silver Bullet first and stopping**. Four other routes remain generic/pending; their revised blueprints are local artifacts in outputs/chartlab-five/spec-revision-2026-11-03.md. No push/deploy and no claim the full migration is complete.

## Exercise and originality

Dedicated /tools/chartlab/nq-silver-bullet-short/ and Urdu counterpart. Five independently authored synthetic NQ-style M1 paths, with original M5 prior-context rows,0.25-point price grid and UTC opens only. Bar counts18/24/21/66/20; gap widths4/10/2.5/7/3.5; sweep depths4/16/3.25/5/4. Varying attempts, delays, retest depth and outcome. No real market data, venue feed, fills, costs or win rates implied. Exact CSV and native Urdu reading derive from the same explicit JSON data.

Five stages: AM clock, high raid, in-hour gap, short plan, outcome. Stage1 questions vary by case, including winter/summer conversion, open/close arithmetic, expiry and time-versus-price logic. Near-misses fail exactly their named clock or swing rule. Stops/targets and outcome chronology are computed. The entry-hour expiry is not a universal exit-at11 rule. Qualitative displacement has no invented numerical size threshold.

Shape guard normalises price/scale, resamples64 OHLC observations, and compares direct/reflected RMSE. Reject threshold0.055 (5.5% of full span), fixed before the observed pair distances. Controls reject affine/mirrored clones, duplicated-bar padding and1%-span perturbations. Nearest implemented pair0.1093. Hash/range and question/stage checks complement the shape metric; it is not a proof of semantic originality. Build/CI use explicit --allow-pending while four routes wait for review. Default invocation fails incomplete migration; there is no claim all six route families now pass.

## Source checks and current search intent

Queries, competing titles, intent and draft metadata research remain in chartlab-five-spec-research-2026-11-02.md and the local spec. Primary target is ICT Silver Bullet NQ10AM chart practice, not a duplicate general definition. No search-volume estimate, exact-PAA-copy claim or ranking guarantee.

Original local videos were re-transcribed with the existing local small.en model and selected frames inspected; no frame was published. The Silver Bullet note was previously timestamped09:00. The actual selected passage at approximately11:28–11:55 distinguishes entry inside the London hour from forced exit inside the same hour;12:40–12:46 introduces AM10–11. Corrected only that source-note timestamp in curriculumReview.ts. New exercise's stricter all-three-bars and retest completion conditions are explicitly declared choices, not attributed as universal ICT rules.

- https://www.youtube.com/watch?v=tRq1hyGGtl4&t=688s — The Inner Circle Trader, 2023 ICT Mentorship - ICT Silver Bullet Time Based Trading Model.
- https://www.youtube.com/watch?v=glu98jAH8vE&t=85s — Month04 Propulsion Block:00:27–01:36 returning down-close candle and its own body midpoint;01:36–02:03 high-of-candle return;05:14–05:28 midpoint loss. Parent MT is not established as a compulsory universal gate; close-only versus wick-only is not resolved universally. Future MMBM blueprint revised accordingly; not implemented now.
- https://www.cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.contractSpecs.html — NQ grid0.25, not our price-data source.
- https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst — New York clock conversion by date.

Evidence is in outputs/chartlab-five/propulsion.txt/.json, silver-note.txt/.json and source frame JPGs. Machine-assisted selected-passage verification is not a claim of fresh continuous viewing of every recording or independently audited trades. Source material is not a redistribution licence; all shipped prices and graphics are original synthetic data.

## Metadata and schema

EN title: ICT Silver Bullet: NQ 10 AM Chart Practice | LearnSMC

EN H1: ICT Silver Bullet short: NQ 10–11 AM practice

EN description: Practise the ICT Silver Bullet short on synthetic NQ charts: check New York timing, sweeps, FVGs, stops and no-entry cases.

UR H1: ICT سلور بُلٹ شارٹ: NQ پر صبح 10 سے 11 بجے کی مشق

UR title: ICT سلور بُلٹ: NQ صبح 10 بجے کی چارٹ مشق | LearnSMC

UR description: فرضی NQ چارٹس پر ICT سلور بُلٹ شارٹ کی مشق کریں: نیویارک کا وقت، سویپ، FVG، اسٹاپ اور انٹری نہ بننے کے کیسز جانچیں۔

Single graph: WebPage, LearningResource, WebApplication, BreadcrumbList; genuine author/review date, synthetic labels and consulted conceptual sources. No publication date, ratings, credentials, performance statistics or FAQ rich-result work. Exact locale metadata/OG/Twitter, original per-locale social image, self-canonical and reciprocal en/ur/x-default. Full rules, five FAQs, five paths and eleven context/case/comparison tables in raw HTML. Existing URLs unchanged; sitemap remains759. Only actual reviewed Silver EN/UR dates recorded.

## Implementation scope

New: silverBulletCases.json, silverBulletStudy.ts, silverBulletSchema.ts, SilverBulletStudy.tsx, chartStudyTime.ts, chartStudyShape.ts; generate-silver-assets.ts, verify-silver-study.ts, verify-silver-static.ts, verify-chartlab-uniqueness.ts; dedicated CSV/social assets and chartlab-guards.yml.

Integration: ChartLab routes only Silver into the new view; TradingToolsWorkbench uses the native Silver heading and suppresses duplicated generic reading; tools-content/seo-content/urdu-pages/social-cards consume its own document graph/metadata; Urdu catalogs regenerated. Silver legacy scenario and route brief now describe the same dataset. Glossary and Silver Masterclass receive focused exercise referrals; existing Masterclass claims unchanged. MarketChart gets optional displayTimezone and priceStep; defaults retained for breaker/other tools. Scoped Silver CSS fixes mobile header wrapping and isolates RTL numeric ranges. No shared-root hydration, URL deletion/redirect or bot-policy changes.

## Verification evidence and limits

- TypeScript and production build/prerender passed. Full existing suite:10,936 SEO checks,787-page crawl, routing,2025/2026 and Masterclass checks passed. Final static checks and breaker regressions recorded separately. The first build correctly stopped for one missing Urdu schema translation; the actual Urdu equivalent was added, not allowlisted away.
- verify-silver-study validates explicit OHLC, ticks, context continuity, no look-ahead swing, five computed outcomes, isolated near-misses, gap/CE/stop sides, exact CSV, native questions, EST/EDT and DST-transition/off-by-one boundaries.
- verify-chartlab-uniqueness checks nine implemented cases plus comparison with legacy geometry, clone/padding/noise controls and dedicated Silver routing. Four known generic routes remain pending, reported explicitly.
- Production browser: all five English five-stage answer flows passed, including wrong-answer blocking (silver-browser-flows.json). Urdu wrong-answer gating and progression passed. Native Urdu RTL/dark mode inspected. EN/UR static/runtime essential-content snapshots are in silver-runtime-parity.json.
- Chrome Lighthouse13.6 actual device emulation at390×844,768×1024 and1280×900; screenshot/config evidence saved in Lighthouse JSON and exported captures. First mobile screenshot exposed inherited no-wrap H1/overlapping controls; fixed for Silver only. Urdu visual review exposed bidi range reversal; numeric ranges isolated and Urdu H1 rewritten naturally. No silent viewport-override claim.
- Initial mobile Lighthouse: performance51, accessibility100, best-practices100, SEO100; throttled LCP7.615s,TBT1219ms,CLS0. These are local synthetic audit results, not field CWV or an SEO-quality score. Shared vendor/chapter/workbench bundles remain large. No baseline performance comparison was measured, so no performance-regression claim. A global EN/English accessible-name diagnostic and missing sourcemaps were also reported; they are outside the Silver content redesign. Later screenshots/checks follow the scoped layout correction.
- Lighthouse's fresh-profile capture includes the existing first-visit privacy choice card. It was not removed or bypassed to improve a score. It can obscure content until a choice; consent UX is a separate shared-site concern. Touch answer flows at every emulated size are not independently completed; do not substitute data tests or static screenshots for that claim.
- Not verified: deployed host, GSC, earned backlinks, field CWV, historical performance or real broker fills. No other route built after Silver; stop for owner review.

## Masterclass claims reserved for a later pass

- Propulsion: “extreme confidence”, “razor-thin stops”, higher sizing and “must not be breached”.
- Silver Bullet: unconditional fixed account-risk percentages and target-range instructions.
- Macro teaching: algorithm/institutional-injection certainty tied to precise windows.
- Core Month04: guaranteed no-retrace wording.

These remain out of scope and were not adopted as rules or promises in the new exercise. No self-assigned SEO score.

Final review evidence: final-seo-checks.log confirms 10,936 checks and the 787-page crawl. silver-static-checks.json and silver-runtime-parity.json confirm final EN/UR metadata/reading parity; silver-browser-flows.json records all five production answer flows. Final inline labels have one wrapping span, with numeric bdi isolation; the inherited mobile no-wrap header is corrected only for Silver.

Lighthouse mobile measurements varied: initial performance51; later performance44, accessibility100, best-practices100, SEO100. Latest throttled LCP7.769s, TBT2867ms, CLS0. These local, variable audit measurements do not establish field performance or a baseline regression comparison. Shared bundle performance remains unresolved at this review stop. Final 390px heading-wrap screenshot: lighthouse-390-final-viewport.jpg; complete Urdu mobile dark capture: lighthouse-urdu-390-final-full.webp. Native final English chart view: silver-desktop-final.png. No touch-flow certification at every emulated size is claimed.
