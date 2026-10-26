# ICT 2025 search-intent and metadata review

Reviewed 26 October 2026. Audience: English-speaking beginner/intermediate ICT learners, with complete Urdu counterparts retaining familiar English trading terms. This is an editorial query review, not a keyword-volume study or a ranking forecast.

## Verified findings

The production first-presented lesson omitted ICT and the ordinal variant "1st" from its title and H1. Its meta description was a generic selection hook. Similar hook-only descriptions occurred throughout the twelve-lesson edition. Technical tag-presence tests had not caught that editorial gap.

The live English documents did not reproduce the reported Urdu-title fault. All twelve English and twelve Urdu URLs returned 200, their own language metadata, self-canonicals and matching en/ur/x-default alternates. The first-presented English URL stayed English with either English or Urdu Accept-Language. The reported Urdu wording is not the current English title; without the audit's exact result URL and Google's indexed copy, its origin cannot be established. Google may choose the Urdu URL, retain older information or generate a translated title. Do not disable the valid Urdu pages to hide that observation.

## Queries and decisions

Each row is an informational lesson intent. Search terms were researched in groups and then specific results opened. Existing lesson URLs remain unchanged. Exact final title/H1 expectations and required topic terms are recorded in `src/data/chapters/mentorship2025Search.json`; final bilingual summaries are in `src/data/searchDescriptions.json`.

The two 2025 landing pages also have distinct metadata: the curriculum hub targets free ICT 2025 lessons and charts; the mentorship study-path page targets preparation, official source links and prerequisites. Their English and Urdu summaries no longer rely on the generic year-only learning-path template.

| Chapter | Primary query / useful variants | Editorial decision |
|---|---|---|
| 24 | ICT opening range; opening range theory; 9:30–10:00 AM | Name the measured morning window; avoid equating it to every ORB/initial-balance method. |
| 58 | ICT midnight opening range; RTH opening gap; NWOG | Name all three references and explain their different measurements. |
| 25 | ICT 1st presented FVG; first presented fair value gap; opening range FVG | Use ICT and 1st in title/H1/description; spell out the natural-language variant in the introduction. Keep qualification separate from geometric detection. |
| 59 | ICT PD array matrix; premium discount; dealing range | Identify the matrix and range context rather than a rectangle metaphor. |
| 26 | ICT SMT divergence; bullish bearish SMT; NQ ES comparison | Name correlated-market comparison and non-confirmation without promising reversal. |
| 60 | ICT Turtle Soup; rejection blocks; liquidity sweep | Distinguish false breakouts, wick references and continuing breakouts. |
| 53 | ICT Venom model; opening range; two fangs | Name the opening-session variant, its declared window and no-entry cases. |
| 61 | ICT New York lunch; afternoon session; PM opening range | Name the session and measured afternoon window without claiming an automatic reversal. |
| 62 | ICT news trading; CPI; NFP; FOMC; no-trade rules | Match event-risk questions, not an implied profitable news strategy. |
| 27 | ICT weekly profiles; weekly highs lows; developing week | Identify the templates and their prospective limits; avoid competing solely on an unexplained count of twelve. |
| 63 | ICT weekly options; SPX; premium; payoff | Identify instrument and payoff mechanics; do not market an income guarantee. |
| 64 | ICT trading journal; chart replay; one-model review | Focus on the repeatable record/replay/review task, not generic motivation. |

## Search results consulted

These pages were consulted for visible terminology, titles, headings and search intent, not adopted as authoritative trading instructions. Several disagree on timing or make strong performance claims; no such claims or rules were imported. TradingView script descriptions are their creators' own primary descriptions of their indicators, not official ICT definitions.

- [TradingView: ICT 1st Presented FVGs](https://www.tradingview.com/script/At8x8KFR-ICT-1st-Presented-FVGs/) — exact query terminology, spelled-out fair value gap and session settings.
- [TradingView: CandelaCharts 1st Presented FVG](https://www.tradingview.com/script/0bWY1jNF-CandelaCharts-1st-Presented-FVG/) — first/1st variants and opening-window presentation.
- [TradingView: ICT Opening Range](https://www.tradingview.com/script/PFTQliLp-itradesize-ICT-Opening-range/) — AM/PM range query vocabulary (search-result description consulted).
- [ICTTraders: Midnight Opening Range](https://icttraders.net/ict-midnight-opening-range/) — standalone range guide and 2025 context.
- [LSG Club: ICT PD Arrays](https://lsgclub.trade/blog/ict-pd-arrays-explained) — matrix/premium/discount headings and range examples.
- [DT Academy: SMT Divergence](https://www.thedtterminal.com/academy/ict-smt-divergence) — pair comparison, swing alignment and no-trigger caveat.
- [ICTTraders: Turtle Soup](https://icttraders.net/ict-turtle-soup-concept/) — false-breakout/rejection-block query relationship.
- [ICTKillzone: Venom Model](https://www.ictkillzone.com/ict-venom-model) — model naming; its asserted timing rules were not substituted for our primary-source scope.
- [ICTKillzone: New York Lunch](https://www.ictkillzone.com/ict-new-york-lunch) — lunch/afternoon query vocabulary and differing window conventions.
- [Hadal Instruments: Weekly Profiles](https://hadalinstruments.com/glossary/ict-weekly-profiles/) — high/low template framing.
- [Does It Repeat: News-pattern research](https://doesitrepeat.com/blog/ict-nfp-fade-backtest) — CPI/NFP/FOMC question framing; their results were not independently reproduced or imported.
- [x10hop: Weekly Option Strategy](https://x10hop.com/concepts/weekly-option-strategy/) — SPX/premium-writing query language, not a recommendation or source of payoff claims.
- [Liquidity Lab](https://liquiditylab.app/) — replay/journaling/no-hindsight task intent.
- [Official ICT opening-range/FVG video](https://www.youtube.com/watch?v=Zm9Q0NDRxoY) — title reference; the web fetch did not expose playable content or a transcript. Existing checked primary-source passages remain the basis for our lesson rules.

## Google guidance and verification

[Title links](https://developers.google.com/search/docs/appearance/title-link), [meta descriptions](https://developers.google.com/search/docs/appearance/snippet), [localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), and [supported meta tags](https://developers.google.com/search/docs/crawling-indexing/special-tags) support descriptive titles, accurate page-specific summaries and correct reciprocal localization. Google can rewrite titles and snippets; meta keywords do not affect Google indexing/ranking. Our character budgets are editorial checks, not Google indexing limits.

`verify2025Search` runs during the existing build/crawl checks. It checks all 24 static lesson pages against the reviewed title/H1/description, topic terms, social metadata parity, head-only language isolation, visible/schema topic agreement, self-canonicals, reciprocal alternates and indexing directives. Four localized landing-page documents also receive explicit title/description checks. It does not claim search volume, a Google position or indexing. Build, TypeScript, static HTML, browser language-switching and sitemap revision evidence are checked separately.
