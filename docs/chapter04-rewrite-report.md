# Chapter 04 — Liquidity in trading

Completed locally on 12 November 2026, branch `feat/chapter04-liquidity`. Not pushed, merged or deployed.

## Document fidelity

Source: `C:/Users/umri/Downloads/What Is Liquidity in Trading A Precise Definition.pdf` (44 pages). Part 2 learner article retained in order: 24 numbered sections, 34 tables, six bulleted takeaways, 29 glossary entries and 20 FAQs. Research/implementation instructions from Parts 1 and 3 are not reader copy. Native Urdu equivalents are supplied. Source fixture: `docs/chapter04-source-copy.json`; extraction and page inspection evidence: `outputs/chapter04/`.

Only the three approved corrections were applied: “best pr jobices” → “best prices”; the deep-book animation consumes three ask levels (100 + 100 + 50); the Section 3 trigger sentence specifies stop-market orders. Line-wrap artifacts are joined; duplicated continuation table headers and invisible PDF frame rectangles are not treated as article content. Heading wording, hierarchy, tables, paragraph order and lists remain as supplied. References and clearly labelled teaching visuals/tools are additions authorized by the brief.

Permanent ID 4 and URL `/learn/liquidity-the-most-misunderstood-word-in-trading/` are unchanged. Published date 15 October 2026; revised 12 November 2026. Hero placement, personal notes, progress and previous/next navigation retained. No Official ICT accounts block; one financial education risk notice. Body 16px/400/1.9; FAQ answers 16px/1.85. Article/main precedes the heavy library sidebar. Native exclusive details FAQs work without script. Definitions/formulas have scoped semantic description markup; Person schema excludes contact/address.

## Search and metadata

Queries checked: “what is liquidity in trading”; “what is liquidity in trading definition market depth volume”; “liquidity trading market liquidity funding liquidity BIS tightness depth resiliency”; “liquidity in trading liquidity vs volume Pepperstone IG CMC Markets”; SEC stop/stop-limit queries.

Competitors consulted: Fidelity, https://www.fidelity.com/learning-center/trading-investing/liquidity ; CMC Markets, https://www.cmcmarkets.com/en-gb/trading-strategy/what-is-market-liquidity ; TradingView, https://www.tradingview.com/support/solutions/43000784778-what-is-liquidity/ . Search-result snippets also surfaced terminology confusion. No search-volume estimates, PAA-box observation or first-page/rich-result guarantees are claimed. Cash conversion, spread and volume dominate these explanations; this document adds numerical execution examples and explicitly separates available liquidity from inferred chart stops.

Title: **What Is Liquidity in Trading? Definition | LearnSMC**. The document’s longer title with brand would be 61 characters; only metadata is shortened. H1: **What Is Liquidity in Trading? A Precise Definition** (exact document heading).

Description: **Liquidity in trading is how easily an order can execute near the current price. Learn spreads, depth and slippage, and how chart liquidity differs.**

Matching native Urdu metadata, OG/Twitter description parity, distinct EN/UR social images and alt text, self-canonicals and reciprocal en/ur/x-default verified. Article, BreadcrumbList, visible 20-question FAQ and 29-term DefinedTermSet match content. FAQ markup is not a promise of a Google FAQ rich result. Selective contextual links lead to existing published order-book, session and liquidity content; related navigation includes glossary, Chart Lab and the part hub. No links to unfinished lessons added.

## Primary sources actually consulted

- SEC Investor.gov, Liquidity (or Marketability): https://www.investor.gov/introduction-investing/investing-basics/glossary/liquidity-or-marketability — definition and price-impact risk.
- Federal Reserve Bank of New York, William Dudley, 1 May 2016: https://www.newyorkfed.org/newsevents/speeches/2016/dud160501 — trading expense/time, funding liquidity and stress interactions.
- ECB, May 2023: https://www.ecb.europa.eu/press/financial-stability-publications/fsr/special/html/ecb.fsrart202305_01~830184261b.en.html — dimensions and market/funding feedback.
- ESRB, February 2025: https://www.esrb.europa.eu/pub/pdf/reports/esrb.report202501_systemicliquidityrisk~90f2044791.en.pdf — conceptual section, printed pages 8–9, plus introduction; not the entire 120-page report.
- SEC stop/stop-limit bulletin: https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15 — stop-market execution-price uncertainty versus stop-limit execution constraints.

CME and SEC order-type background were also read. Inaccessible IMF paper not claimed as reviewed or cited. None of these sources establishes candle-based hidden orders or trader motives; the page retains that distinction.

## Original visuals and tools

16 in-body figures: (1) lake/puddle impact analogy; (2) executable vs inferred chart liquidity; (3) ten-statement classification exercise; (4) bid/ask book and spread; (5) five dimensions; (6) depth consumption/refill animation; (7) matched 250-unit deep/thin walk animation; (8) editable book walker; (9) six-point checklist; (10) equal volume/different depth; (11) schematic session clock; (12) stop trigger versus fill; (13) funding spiral; (14) observable sweep/inferred stops animation; (15) spread/cost-in-R calculator; (16) tool-to-question map. Diagram tab also provides the walker. Figures have textual captions/fallbacks; synthetic data explicitly labelled. Light surfaces are white; dark figures use matte navy with teal bids, coral/hatching asks and amber emphasis. No copied frames, new runtime library or autoplay.

Deep buy 250: total 12,510, average 50.04, slippage 10. Thin buy: total 12,724, average 50.896, slippage 224. Thin sell: 40 filled, 210 unfilled, average 49.35. Book levels are editable; zero quantity, invalid inputs, duplicate prices, sorting, partial fills and input immutability tested. Cost calculator explicitly assumes unchanged entry/exit quotes, one spread plus two per-side fees, no slippage. With bid49.95/ask50/stop1/fee0.01 it returns 0.07R round-trip cost. It is not a broker execution simulator.

## Verification and evidence

- TypeScript: `outputs/chapter04/typecheck-final.log` (no errors).
- Production build/prerender/full checks: `outputs/chapter04/build.log`; **11,012 SEO checks, zero failures**, **847-page internal crawl passed**, routing, claims and unchanged bundle-budget gates passed.
- Dedicated source/copy/math/metadata/schema/indexing checks: `scripts/verify-liquidity-document.ts`, output `outputs/chapter04/static-verification.json`; now wired into build and SEO suite.
- Browser static/runtime comparison: `outputs/chapter04/browser-parity.json`, **888 paragraph/list/heading/table nodes identical in each language**, excluding interactive figure controls/navigation.
- Browser verified EN/UR, light/dark, 1440px desktop and390px mobile, no page overflow; table regions scroll internally. Body and FAQ16px; English body line-height30.4px. Native FAQs tested with Enter, single-open behavior; script-blocked EN page remained readable and FAQ worked. Script-blocked Urdu content matched runtime. Walker buy/sell and thin partial-fill calculations, fees, checklist, classifier and animation Step keyboard activation exercised.
- Source HTML contains full article, tables, FAQ answers, glossary, diagrams and applied quiz explanations without JavaScript. Interactive inputs are disabled in the fallback, with worked values retained.
- Screenshots: `outputs/chapter04/{en,ur}-{desktop,mobile}-{light,dark}.png`.
- Urdu review: `outputs/chapter04/bilingual-review.csv`, **996 strings**. Human Urdu review still required.
- Targeted revision ledger: only six changed EN/UR chapter/directory/Market Foundations hub fingerprints recorded; `outputs/chapter04/revision-evidence.json`. Sitemap counts unchanged: **741 canonical entries,116 published EN/UR lessons**. No blanket date stamping.
- New/shared file inventory: `outputs/chapter04/files-changed.json`. Existing unrelated drafts preserved; generated catalog/runtime files regenerated.

Not verified: production deployment, field Core Web Vitals, external Rich Results Test, screen-reader assistive-technology testing, exhaustive interaction permutations, and human Urdu editorial review. Reduced-motion guard inspected in implementation; OS-level reduced-motion emulation not performed. No live historical trade or statistically measured liquidity curve is claimed. Preview: http://127.0.0.1:4258/learn/liquidity-the-most-misunderstood-word-in-trading/ .

## Visual and section-citation follow-up — 12 November 2026

User screenshots exposed a missed regression: outer figure modifiers reused inner classes (`lq-clock`, `lq-dimensions`, `lq-checklist`, also `lq-spiral` and `lq-tools-map`). Clock stroke inherited into text; grid styles applied to entire figures; checklist reset removed outer padding. Changed outer modifiers to isolated `lq-visual--*` names, scoped SVG text to stroke:none, and added properly padded checklist rows and responsive dimension cells. All 16 figure wrappers checked; no content or calculation changes.

The existing five primary references remain below Personal Learning Notes. Added 15 direct source links across eight relevant sections (1,3,4,5,6,11,14,18), in EN/UR. No source is presented as evidence for invented prices, inferred stop locations or fixed intraday liquidity windows. These are citation asides, not edits to the supplied article. No additional translation strings needed.

Checks: `outputs/chapter04/build-layout-fix.log` (full production build, 11,012 SEO checks, 847-page crawl, claims and bundle gates passed); `typecheck-layout-fix.log` (clean); `verify-layout-fix.log`; `layout-regression.json` (EN dark desktop/mobile; UR both themes desktop/mobile; no figure/page overflow, clock text stroke:none, six padded checklist targets,15 source links). EN light desktop visually reviewed and captured. Not every permutation was captured; prior browser parity evidence describes the initial chapter before citation asides were added. The source-copy guard still verifies the complete approved EN/UR text in current output.

New regression assertions reject inner/outer class-name reuse and require eight citation asides in both languages. Screenshots: `clock-fixed-light.png`, `dimensions-fixed-light.png`, `checklist-fixed-light.png`, `checklist-fixed-dark.png`, `dimensions-fixed-mobile-dark.png`, `clock-fixed-ur-mobile-dark.png`, `dimensions-fixed-ur-desktop-light.png`, `checklist-fixed-ur-mobile-light.png` under `outputs/chapter04/`. Checklist keyboard Space updated count to1/6. Revised fingerprints recorded only where content changed, no blanket timestamp. No push, merge or deployment.

Follow-up changed files: `src/components/LiquidityVisual.tsx`, `src/components/LiquidityDocumentContent.tsx`, `src/styles/liquidity-document.css`, `scripts/verify-liquidity-document.ts`, `src/data/page-revisions.json`, this report. Source document and all unrelated drafts untouched.

## Isolated release verification

Chapter 04 isolated against current main40e1da9, excluding other local drafts. Release build, TypeScript,11,012 SEO checks,847-page crawl, source fidelity, native Urdu, claims and bundle gates passed. Evidence summary: `docs/chapter04-release-verification.json`. Release branch: `release/chapter04-liquidity`. Production status must be checked separately after merge.
