# Four dedicated Chart Lab studies — 3 November 2026

Status: implemented locally on feature branch; no push, merge or deployment. User authorised the remaining four after the Silver Bullet review stop. Silver Bullet and the dedicated EUR/USD breaker are preserved. The main Chart Lab introductory desk is outside this change.

## What changed

- XAUUSD session sweep: test the FVG midpoint: /tools/chartlab/xauusd-gold-legacy-model/ — 5 cases, 4 stages per case.
  - Title: XAUUSD FVG: Session Sweep & Midpoint Tests | LearnSMC
  - Description: Study synthetic XAUUSD session sweeps and FVG midpoint tests. Compare a wick touch, a close below CE, failed formations and missed entries.
  - Urdu H1: XAUUSD سیشن سویپ: FVG کے وسط کی جانچ کریں
  - Urdu description: فرضی XAUUSD سیشن سویپ اور FVG کے وسط کو جانچیں۔ وِک، CE سے نیچے بندش، نامکمل تشکیل اور انٹری نہ ملنے کا فرق سمجھیں۔
- ICT 2022 model on BTC/USDT: Asian low sweep practice: /tools/chartlab/btc-2022-bullish-model/ — 4 cases, 7 stages per case.
  - Title: ICT 2022 Model: BTC Asian Low Sweep Lab | LearnSMC
  - Description: Explore the ICT 2022 model on synthetic BTC/USDT charts: Asian low sweep, MSS, displacement, FVG returns, failed setups and no fills.
  - Urdu H1: BTC/USDT پر ICT 2022 ماڈل: ایشیائی لو سویپ کی مشق
  - Urdu description: فرضی BTC/USDT چارٹس پر ICT 2022 ماڈل سمجھیں: ایشیائی لو سویپ، MSS، ڈسپلیسمنٹ، FVG کی واپسی، ناکامی اور انٹری نہ ملنا۔
- EUR/USD market maker buy model and propulsion block: /tools/chartlab/eur-mmbm-propulsion-model/ — 5 cases, 8 stages per case.
  - Title: EUR/USD MMBM & Propulsion Block Practice | LearnSMC
  - Description: Trace a synthetic EUR/USD market maker buy model. Compare parent order blocks, propulsion candles, body midpoints, failed holds and missed returns.
  - Urdu H1: EUR/USD مارکیٹ میکر بائے ماڈل اور پروپلشن بلاک
  - Urdu description: فرضی EUR/USD بائے ماڈل سمجھیں۔ اصل آرڈر بلاک، پروپلشن کینڈل، باڈی کے وسط، ناکام ردِعمل اور واپسی نہ ہونے کا موازنہ کریں۔
- NQ NDOG, 09:50 macro IFVG and ATH measurement: /tools/chartlab/nq-ath-alchemy-ndog-macro/ — 6 cases, 9 stages per case.
  - Title: NQ NDOG, Macro IFVG & ATH Measurement Lab | LearnSMC
  - Description: Use synthetic NQ charts to measure NDOG CE, test 09:50 macro IFVGs and separate RTH-based ATH projections from observed price references.
  - Urdu H1: NQ NDOG، 09:50 میکرو IFVG اور ATH کی پیمائش
  - Urdu description: فرضی NQ چارٹس پر NDOG کا CE ناپیں، 09:50 میکرو IFVG جانچیں اور RTH پر مبنی ATH تخمینوں کو مشاہدہ شدہ قیمتوں سے الگ سمجھیں۔

All twenty paths are explicit original synthetic OHLC rows, not copied prices, a real exchange replay, a claimed broker fill, or a performance sample. Each route shares its model across charts, questions, rules, native EN/UR reading, tables, exports, catalog previews and schema. There are 142 case-specific stage/answer pairs. Wrong answers block Continue; stage navigation permits reference study, so this is NOT a blind backtest. No drawing or live-order claims.

Gold: a completed close strictly below CE after an eligible upper-edge return is our chosen comparison rule; wick-only and whole-gap geometry are separate. Case D has overlapping wicks: no FVG, no FVG CE and no active plan. BTC: PDH comes from all 96 prior New York-day M15 rows; its 20:00–00:00 range is a selected study subset, not an official crypto opening session. EUR/USD: parent range, returning down-close candle, its OWN body midpoint, full-high return, closing failure and protective extreme are separate. NQ: maintenance-gap endpoints, original bearish FVG, timed inversion, later return and independent RTH projection remain separate panels; this is not an official combined ICT system. N-E closes through the whole NDOG; N-F first retests at 10:11, too late.

The twenty new execution paths range from 21 to 92 candles; the preserved Silver cases include an 18-bar example. Authored turning points, event spacing, gap widths, failed attempts, return depths and waiting paths differ; exact datasets supersede planning-only timing sketches. Stored bar times are UTC OPENS only; New York labels and closes derive through chartStudyTime. OHLC source rows include all fixed reference highs and target evidence. The NQ tick is 0.25; the 0.01 XAU/BTC and 0.0001 EUR grids are teaching conventions, not universal venue specifications.

## Sources and search research

Keyword/intent/competitor research was already completed for these exact four routes on 2 November, recorded in docs/research/chartlab-five-spec-research-2026-11-02.md and the local approved specifications. Queries included ICT Gold Legacy / XAUUSD 50% FVG, ICT 2022 model BTC Asian low sweep, ICT propulsion block mean threshold MMBM, NDOG 17:00 18:00, and Market Alchemy 16:14 RTH opening gap. This pass implements the researched topic-bearing snippets, not a claim of new Google rank/PAA/volume measurement.

- ICT 2022 Episode 6: https://www.youtube.com/watch?v=Bkt8B3kLATQ — context, completed gap and structure teaching. Existing repository selected-source review; not newly watched in full here.
- ICT Month 04 Propulsion Block: https://www.youtube.com/watch?v=glu98jAH8vE&t=27s — 3 November machine-assisted local source recheck and frame review recorded in the Silver report. 00:27–01:36 own returning-candle body midpoint; 01:36–02:03 later return near its high; 05:14–05:28 midpoint loss. Does not establish a compulsory parent-midpoint gate or universal close-only definition. Local evidence: outputs/chartlab-five/propulsion.txt/.json and propulsion-01m28.jpg. No source frame shipped.
- ICT NDOG Part 1: https://www.youtube.com/watch?v=Sh-bDHWNpsk — conceptual source pointer; no fresh full-video audit claimed. Exact session endpoints are an explicitly selected teaching convention and not official settlement.
- ICT Market Alchemy: https://www.youtube.com/watch?v=wprXVW1pW9Y&t=1620s — inherited repository review of selected 27:00–36:45 measurement/settings passages. Prior 16:14-open M1 close and next 09:30 OPEN; F(x)=O+x(P−O). Not an arbitrary swing ×1.618. True historical ATH not established by a short synthetic context.
- CME contract specifications: https://www.cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.contractSpecs.html — NQ minimum tick, not a data source for these examples.
- NIST: https://www.nist.gov/pml/time-and-frequency-division/popular-links/daylight-saving-time-dst — date-aware EST/EDT conversion, not fixed year-round EST.

No source establishes an official Gold Legacy method or one NDOG+IFVG+ATH composite system. No new performance percentage, lot multiplier, quote, credential, ATR threshold or account-risk advice is invented.

## Originality and model checks

The unchanged shape threshold is 0.055: min-max normalised OHLC, 64 resampled observations, minimum direct/mirrored RMSE. Across all 29 implemented cases (20 new, five Silver, four breaker), the nearest distance is 0.0997. Affine, reflected, duplicate-bar padding and 1% noise controls still fail. All implemented cases are checked against legacy generic geometry. This checks the primary execution series, not semantic originality or uniqueness of every context grouping. No exemptions or reduced threshold were introduced. The temporary --allow-pending flag is removed from build/CI; all six named routes are registered.

Data checks cover 20 computed outcomes; 142 stage answers; monotonic reveals; valid OHLC/ticks; contiguous UTC intervals within each strip; actual fixed-swing and target reference rows; NDOG gap-failure/no-touch/late-return contrasts; conservative full-bar expiry; DST and duration boundary arithmetic; entry-bar target/stop ambiguity; CSV equality. Early BTC and EUR stages show their prior context rather than unrelated execution candles. Every complete case, answer and timestamp is in the raw static document, with labelled figures and native Urdu reading. No new URLs, redirects or crawler-policy changes.

## Evidence and current verification

- Data and shape: outputs/chartlab-five/remaining-data-checks.json, shape-report.json; scripts/verify-remaining-studies.ts and verify-chartlab-uniqueness.ts.
- Eight EN/UR static documents: outputs/chartlab-five/remaining-static-checks.json; scripts/verify-remaining-static.ts. Unique head title/description, one H1, reciprocal en/ur/x-default, self-canonical, OG/Twitter image and alt, 1200×630 images, visible breadcrumb/graph match, real author/review date, complete source data, real links, and unchanged 759 sitemap URL membership.
- Browser evidence: outputs/chartlab-five/remaining-browser-checks.json plus route/locale/width/theme PNGs. Final checks passed 20 case flows / 142 stages, 12 width/locale/theme views, 12 wheel-containment checks and 16 disabled/failed-JavaScript views. Normal static/runtime parity matched 71 Gold, 84 BTC, 111 EUR and 160 NQ essential headings/paragraphs in both languages. The final EUR descending-low correction was followed by another five-case / 40-stage browser pass. Eight cold-cache slow-loading views (180ms latency, 350,000 bytes/sec) kept static reading visible before the interactive canvas appeared and passed final EN/UR head/schema/content parity. No runtime exceptions. Evidence: remaining-final-followup.json and remaining-final-followup.log. This is emulated desktop/mobile browser testing, not physical-device certification. Headless Chrome is isolated from the signed-in browser. A real existing privacy choice is made through its button. No privacy overlay is silently removed.
- Final production build/full crawl: outputs/chartlab-five/remaining-final-build.log — passed 10,936 checks, 787-page crawl, canonical host/HTTPS/redirect/asset checks, 2025/2026 and Masterclass regressions. The initial crawl correctly failed eight duplicate intro/coach headings; they were changed, not allowlisted. The final build includes the corrected actual EUR descending-low reference. Breaker and Silver data/static regressions also pass.
- TypeScript passed: outputs/chartlab-five/remaining-typescript.log (exit 0). git diff --check passed. No new frontend dependencies.

Local runner limitation: sandboxed Vite cannot traverse parent configuration directories. The authorised local build runs outside that filesystem restriction. Windows os.userInfo() also fails in the runner; a local output-only Node preloader supplies the temporary-directory key required by tsx. It does not modify application dependencies or test assertions. Browser CUA cannot initialise (kernel asset path missing), so isolated headless Chrome supplies local interaction/screenshots. Neither this runner workaround nor browser profiles are shipped.

## Files and release boundary

Core additions: src/data/chartLabRemainingCases.json, chartLabRemaining.ts, chartLabRemainingContent.ts, chartLabRemainingQuestions.ts, chartLabRemainingSchema.ts; src/components/market/RouteChartStudy.tsx and StudyEvidenceChart.tsx; generate-remaining-study-assets.ts, verify-remaining-studies.ts, verify-remaining-static.ts. Scoped integration touches ChartLab, TradingToolsWorkbench, catalog/route briefs, prerender/Urdu/social handling, Urdu runtime catalog, Chart Lab CSS, CSV headers, build and guard workflow. No shared MarketChart/ReadingChart API change in this pass. Earlier unrelated pending work remains untouched.

No invented datePublished. dateModified=2026-11-03 reflects this actual review. After the final build, review fingerprints were recorded only for the eight genuinely changed documents, with this report as evidence; outputs/chartlab-five/remaining-sitemap-revisions.json. Sitemap membership remains 759. Other pending historical review fingerprints were not stamped or altered.

Out of scope, retained for a later source pass: Masterclass propulsion confidence/tiny-stop/higher-sizing wording; Silver fixed-risk and unconditional target-range claims; macro institutional-injection certainty; Month04 guaranteed no-retrace wording. None is imported into these exercises. No fresh Lighthouse/field-CWV or real-device result is claimed; shared heavy bundles remain a performance limitation. Technical passing checks do not guarantee indexing, rankings, profit or AI citations.
