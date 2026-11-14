# Chapter 64 — Silver Bullet implementation

14 November 2026. Feature branch `codex/chapter-64-silver-bullet`. Local implementation; no push, merge or deployment requested in this turn.

## Content and publication

Existing `/learn/silver-bullet-model/` and `/ur/learn/silver-bullet-model/` preserved. Permanent ID 1064 / display 64 moves from in-progress to published through the existing status model. Directory: 97 planned, 60 published, 37 in progress. Sitemap: 745 indexable URLs, including 120 published EN/UR lesson URLs. No route deleted or redirected.

Original lesson has 22 sections: definition, prerequisites, date-aware windows, context, a seven-step study checklist, wick-defined FVG/CE, explicit variants, separate formation/fill/exit clocks, independent bullish NQ-style and bearish ES-style examples, a loss, no-fill/expiry/skip cases, OHLC execution ambiguity, contract arithmetic, conditions/news, comparisons, myths, backtesting, practice, glossary, eight native FAQs and next reading. Four applied quiz questions use the existing quiz system.

All prices are explicitly invented teaching data. Replay qualifies on C3 close, never on its unfinished wick. A selected study version requires the stated sweep/close confirmation and CE return; it is not silently attributed as a universal ICT checklist. Pending orders expire at 11:00 in this study; already-filled positions are a distinct state. No win-rate or profitability promise.

The hero location, learning notes, prior/next navigation, study progress and chapter UI remain. Main/article precedes heavy library rails. Sources and interpretation are chapter-specific. Official-account promotional section suppressed for this rebuilt chapter. Exactly one financial-education risk notice in static and runtime views.

## Search and source evidence

Primary query, actual Google PAA, related searches, competing titles, consulted URLs and limits are in `research-and-source-map.md`; assisted research is preserved separately. Proposed metadata was implemented:

- Title: `ICT Silver Bullet: Times, FVG Entries & Futures | LearnSMC` (58 characters).
- H1: `ICT Silver Bullet: Time-Windowed FVG Entries`.
- Description: `Learn the ICT Silver Bullet model: New York time windows, FVG entries, futures tick values, worked examples, failed setups and rules for standing aside.` (152 characters).
- Native Urdu equivalents; self-canonicals and reciprocal en/ur/x-default; localized, original per-lesson social image; Article, LearningResource, visible BreadcrumbList, DefinedTermSet and visible FAQ schema via the existing graph.

Additional original-source checks during implementation: local recording `2023 ICT Mentorship - ICT Silver Bullet Time Based Trading Model.mp4`, machine-assisted selected passages 00:00–07:30 and 13:00–17:20, alongside the previously verified 07:30–13:00 selection. Source frames inspected at 00:40 and 14:20. The 00:40 slide confirms 10 points/40 ticks and 15 forex pips, explicitly distinguishing framework range from entry-to-exit capture; the 14:20 slide confirms 14:00–15:00 NY local. Original explanations attribute those conventions without adopting source performance claims. No entire-playlist or entire-video viewing claim. Private reference frames/transcriptions remain under ignored `outputs/chapter64/source-review/`, never shipped as learner illustrations.

CME contract/order references and NIST clock guidance are retained. Sources establish concepts, clock and contract mechanics; none verifies the invented paths as historical executions.

## Figures and interaction

19 figure instances: a clock/close-path overview; date-aware NY/UTC/Karachi clock; context cutout; seven distinct procedure illustrations; completed-versus-overlapping FVG comparison; formation/fill/exit timeline; bullish replay with four endings; independent bearish replay; loss replay; no-trade ledger; two possible intrabar paths sharing OHLC; contract-value comparison; and journal classifications. Overview composition is distinct from the candle-based worked example.

Every figure has descriptive SVG title and caption; explanations, formulas, static tables, complete candle data and native FAQ answers remain in initial HTML. Pause/play, back/next, speed and range controls; viewport/document visibility pause; reduced-motion disables autoplay. No new dependencies, automatic scroll lock, copied video frames or repeated chart-as-a-different-lesson trick.

## Changed mechanisms

- New chapter data/translation pairs, OHLC/time helpers, content renderer, visuals and scoped stylesheet.
- Registration in chapter data, phase-1 entry/crosswalk and quiz model.
- Scoped additions to ChapterRoom, source review, minimal risk-footer selection, native Urdu rendering and locale catalogue generation/factoring.
- Existing prerender/schema/social-card pipeline and lesson-semantic verification extended for this route.
- `verify-silver-lesson.ts` added to build and SEO scripts; existing strict claims gate and bundle limits preserved.
- Revision ledger changes limited to the new lesson pair and affected curriculum/entry-model collection pairs, only where fingerprints change. No blanket date update.

## Verification evidence

Local evidence (ignored outputs):

- `outputs/chapter64/preflight.json`: OHLC inequalities, quarter-point ticks, UTC opens/derived closes, common past and contrasting futures, gap/CE arithmetic, no look-ahead, expiry, January/July and DST-transition tests, complete EN/UR text rendering.
- `outputs/chapter64/static-verification.json`: raw HTML, one H1/main, primary content source order, all figures/FAQs/text, head/social parity, Article image/author/review date, canonicals/hreflang, internal destinations, one risk notice and sitemap counts.
- `outputs/chapter64-build.log`: final build/prerender, SEO, full crawl, route/chapter regressions, strict emitted claims and unchanged bundle budget.
- `outputs/chapter64-typecheck.log`: TypeScript.
- `outputs/chapter64/browser/`: browser screenshots, layout/computed typography, runtime text/branch evidence and parity report.
- `outputs/chapter64/revision-evidence.json`: scoped fingerprint/date changes.
- `bilingual-review.csv`: native EN/UR review pairs for user review.

English body typography: Source Sans 3, 16px/400/30.4px. FAQ: 16px/400/29.6px. Urdu uses the existing native Arabic font stack through the same size/leading tokens. Preserve browser zoom and text scaling.

## Limits

## Final local results — 14 November 2026

- TypeScript passed. Production build/prerender passed; 11,064 SEO checks and the 847-page internal crawl passed. The interrupted command's remaining checks were resumed successfully in `outputs/chapter64-final-checks.log`, including the strict emitted-claims scan and unchanged bundle budget.
- Production output contains 745 sitemap entries, including 120 published EN/UR lesson URLs. Only six changed lesson/collection fingerprints were recorded; the existing unrelated revision backlog was not stamped.
- Eight production-browser captures cover EN/UR, light/dark, 1440px/390px. All have one H1, 19 figures, one risk notice, no page overflow, the agreed computed typography, and exact parity of all 42 essential paragraph/checklist strings against static HTML. Evidence: `outputs/chapter64/browser/layout-evidence.json` and `parity-verification.json`.
- Browser replay verified target, loss, no-fill and expiry endings. The expiry branch includes 60 contiguous minute bars and does not reach CE before the 11:00 expiry; its first return is 11:02. ArrowRight changed the focused replay slider from one revealed candle to two. Clicking a second native FAQ closed the first.
- Final JS budget: initial 11,739 bytes raw / 5,105 gzip; all JS 10,606,282 raw; largest chunk 1,108,033 raw. Existing limits passed without adjustment. These are build-size measurements, not Lighthouse or field performance results.
- Preview: `http://127.0.0.1:4249/learn/silver-bullet-model/` and its `/ur/` mirror. No push, merge or deployment.

### Remaining verification limits

No deployed-host, Google indexing/rank, AI citation, earned-backlink, field Core Web Vitals, real fills, statistical edge, screen-reader or human Urdu sign-off is claimed. Raw HTML/native disclosure checks establish script-free content availability; browser tests do not establish behaviour on every device. Research artifacts are documentation, not public page assets.

## Final iOS Clarity release

User approval on 14 November 2026 authorizes feature-branch push and PR merge. The iOS Clarity reading treatment is applied only to this chapter, with the reusable future-work direction recorded in AGENTS.md. Hero, columns and rails are unchanged. Final browser evidence confirms eight EN/UR/theme/size combinations, exact 42-block essential text parity, no page overflow, one risk notice, 16px/400 body and FAQ text, and 14px table corner radii.

Final commands/evidence: `outputs/chapter64/release-build.log`, `release-typecheck.log`, `release-browser-check.log`, `release-revisions.log`, and `browser/ios-release-checks.json`. Production build/prerender, 11,064 SEO checks, the 847-page internal crawl and unchanged budgets passed. Final budget: initial JS 11,739 bytes raw / 5,103 gzip; all JS 10,614,382 raw; largest chunk 1,108,095; CSS 635,107 raw / 109,364 gzip. No budget was relaxed. Local preview: http://127.0.0.1:4252/learn/silver-bullet-model/ . Earlier review-only statements describe prior checkpoints; deployment must be checked separately after merge.
