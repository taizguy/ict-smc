# Tools audit remediation — 16 October 2026

Scope: all 163 published `/tools/` routes and the 29 findings in the Tools audit. Changes are on `fix/tools-audit-remediation`; production deployment is separate.

## Finding-to-change record

| Findings | Changes |
| --- | --- |
| J-01 | Journal records and per-entry drafts persist in versioned, validated browser storage. Read failures, quota failures and conflicting writes are reported; unreadable records are not silently overwritten. Export, validated merge restore and session undo are available. |
| J-02 | Execution date/time/timezone, signed R, optional monetary P&L, model, timeframe, observations and checklist reflect actual form inputs. No fabricated trades or automatic positive checklist answers. |
| J-03 | Log, execution audit, analytics and entry form have distinct functions and real destination URLs. Save returns to the log. |
| S-01, S-02 | Target distance derives from selected stop distance. Signed gross R derives from entry/stop/exit; costs are subtracted consistently. |
| S-03 | Simulator is explicitly a fictional trade-plan reasoning exercise. Removed claims of fills, order-book simulation and measured MAE/MFE; outcomes are chosen assumptions. |
| B-01, B-02 | Replaced hard-coded performance with 101 seeded hypothetical paths. Median ending-equity path and its statistics share one ledger. Inputs, method, limitations and export are available. No historical backtest is claimed. Numerical overflow and ruin-inducing input combinations are rejected. |
| C-01 | Each guided task grades its relevant candle, range, direction or price constraint. Entry, structural stop and target have separate rules. |
| C-02 | Chart pointer prices use the SVG coordinate transform and instrument ticks. Native candle and price controls support keyboard use. |
| C-03 | Starts at candle one; guided replay reveals only past bars and eligible overlays. Full example is an explicit review choice. All four overlay switches affect rendering. |
| C-04 | Timeframe labels and scenario descriptions identify compressed/illustrative timestamps and absent nested feeds. Unreconciled example R/fill claims removed. |
| D-01 | Keeps the real instant and formats New York once; clock uses EDT/EST correctly. Header uses year-round ET. |
| D-02 | Instrument-specific ticks, point values and minimum increments; stops round outward and size rounds down. NQ/ES and micro contracts require whole contracts. Too-small budgets produce zero size. |
| D-03 | Rejects invalid anchors and nonfinite inputs. Asian projections are explicitly range multiples, not statistical standard deviations. |
| M-01 | Category hubs initialize an item in that category; algorithmic signature details select the Core category correctly. |
| M-02 | Masterclass count derives from the 29-item collection. Category names are readable; Core includes signature lessons. Learning progress derives from the actual curriculum. |
| M-03 | Diagram steps stop at four; static references do not offer a meaningless advance control. |
| G-01 | Added the missing structure-sequence diagram renderer. |
| G-02 | Shared FVG/OB definition guidance distinguishes midpoint references, full-zone failure and trade-specific invalidation. Removed contradictory duplicated reference-document blocks. |
| G-03, E-01 | Qualified market-intent, numerical-performance, settlement and affiliation assertions. Independent notes are distinguished from sourced material and framework hypotheses. Quiz explanations follow the same distinction. |
| P-01 | Read Modules links use real curriculum cluster routes. |
| P-02 | No default completed lesson, fake locks or credential award. Actual lesson completion and five fixed practice quizzes; one 80% threshold, complete answers required, persisted feedback. |
| N-01 | Named pages use native links, matching destination headings and existing static URLs. Graph topic hash survives reload. Secondary explanation tabs remain temporary presentation state. |
| N-02 | Compact All Tools / Switch Tool header replaces repeated ten-card navigation. Delivery module selection is collapsible. Long method notes use expandable detail. |
| N-03 | Native quiz radios, labeled inputs, graph link alternatives, chart keyboard controls, visible focus and selected states. Entry form replaces the problematic modal. Reduced motion respected. |
| N-04 | Chart and comparison content have contained, labeled scroll regions and text/control alternatives. Responsive spacing and minimum touch targets improved. |
| N-05 | Removed outgoing selection changes before navigation. Journal drafts, review checklists and quiz answers persist; temporary simulator calculations explicitly reset when leaving. Retained coherent document navigation and existing crawlable URLs. |

## Search and content preservation

- Existing public route structure, canonical rules, redirects and utility-page indexing policy retained.
- Static tool documents describe the updated interactive behavior; metadata remains unique.
- Tool schemas include confirmed author Muhammad Umer Ijaz and LearnSMC as publisher.
- Privacy copy accurately lists locally stored journal drafts, practice answers and study checklists.
- No invented professional credentials, social profiles, measured win rates or external backlinks.

## Verification

- Production build and TypeScript check.
- 1,001 URL/canonical/sitemap/redirect checks; 363-page crawl/schema/link checks; routing and previous report regressions.
- 424 calculation and chart-exercise assertions, covering all six scenarios, both trade directions, instrument sizing, invalid inputs, seeded results and New York seasonal time.
- All 163 Tools routes checked in the rendered browser for title agreement, one H1, nonempty main content and desktop document overflow.
- Browser interactions: signed journal result, exact execution time, edit draft reload, save, delete and undo; simulator target/stop and costs; risk-sensitive generated outcomes and overflow rejection; complete quiz grading and reload; graph address/heading/Back/hash reload; whole micro-contract sizing and invalid anchors.
- Representative 390 × 844 embedded viewport inspection for chart controls and delivery calculator. This is not a physical-device accessibility or Core Web Vitals certification.

## Limits

Chart data is authored illustration. Expectancy paths are hypothetical independent outcomes. Neither supplies historical performance evidence or predicts live results. Trading interpretations still require external evidence and properly defined evaluation before being presented as proven facts. Local data is device/browser specific; export backups. No production deployment or live-user storage was modified during verification.
