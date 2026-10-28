# Market Alchemy pilot — review report

**Scope:** chapter 49 only, rebuilt on 27 October 2026. Existing URL retained: `/learn/market-alchemy-trading-all-time-highs-ath/`. English and Urdu. Other eleven 2026 lesson data records are unchanged from the pilot baseline. Publication awaits the user's review; no next chapter has been started.

## What the learner can now do

Reproduce the historical RTH opening-gap projection, check its zero/one orientation, calculate the displayed −7/−8 lines, distinguish an early touch from the stated lunch-window observation, and separate the subsequent response from an automatic entry. The worked NQ example uses checked source prices rather than invented 100/120 values.

This remains a **historical chart-reading procedure**, not a complete mechanical trading system: the lecture does not supply every protective-stop, sizing and fill rule. That limitation appears in the lesson, not just this report.

## Sources consulted

- ICT, [Market Alchemy — Trading ATH, May 14, 2026](https://www.youtube.com/watch?v=wprXVW1pW9Y). Complete available transcript read; original chart frames inspected. Main passages: 05:00–14:50 clock/context; 27:00–30:50 base range; 32:00–36:45 projections/time qualification; 37:00–41:50 overshoot/response; 42:00–47:30 exit references.
- ICT, [Turning Loss Into Gain — Market Alchemy](https://www.youtube.com/watch?v=d8du4fMvOQU), published May 13, 2026. Opening through approximately 17:00 reviewed; 03:00–04:30 invalidation and 07:30–15:00 failed expansion. This separate morning MNQ long is clearly distinguished from the following day's lunch study.
- [TradingView's official Fib drawing documentation](https://www.tradingview.com/support/solutions/43000518158-fibonacci-retracement-drawing-tool/) for drawing controls, not evidence of a trading edge.

## Search research and the gap filled

Actual live Google queries: `how to trade all time highs`, `ICT trading all time highs`, `ICT market alchemy all time highs`, `ICT Market Alchemy standard deviation RTH gap`. Primary: **how to trade all time highs**, with an explicitly ICT/historical scope. Supporting topics: Market Alchemy, RTH opening gaps, range projections, Fib settings and lunch timing. Actual relevant PAA: “How to trade in all time highs?” Other FAQs are editorial procedural questions, not falsely attributed to Google.

Five competing pages read live: Investopedia, TRADEPRO Academy and TradingSim from the broad query; ICT Archivist and BestProps for ICT-specific intent. [Full notes](market-alchemy-research.md) preserve URLs, observed ordering, real metadata and headings. No search-volume or universal ranking claim is made.

The concrete difference is a reproducible, frame-checked measurement: **0 = 29,510.00, 1 = 29,476.25, width = 33.75; −8 = 29,780.00**. It catches the one-gap origin error, distinguishes range multiples from statistical standard deviation, explains time eligibility, and retains overshoots, failures and fill uncertainty. No competitor wording was used to write the chapter.

## Eight unique teaching visuals

| Visual | What it teaches |
|---|---|
| Hand-drawn ATH fork | A record high does not by itself select continuation or reversal. |
| Two-anchor gap ruler | Exact session references and 33.75-point base; not a first-hour range. |
| Four-panel construction board + wrong-origin control | Fib coordinates, orientation, custom labels and the off-by-one error. |
| Time-by-projection matrix | Early 6.5/7 encounters versus the source's later setup-hour study. |
| Historical overshoot event map | Two-point overshoot, subsequent response, annotated rather than audited short. |
| Exit ladder | Nearer lows, their separate midpoint and the deeper low's one-tick traversal. |
| Three stepped/animated outcome strips | Early touch, response after overshoot, and continued expansion without confirmation. |
| Separate loss before/after | Failed expansion and the difference between stop reference and exit annotation. |

All are original compositions exclusive to this pilot. They replace the shared daily-candle/path player for chapter 49. Historical drawings are explicitly simplified event reconstructions, not fabricated OHLC. Hypothetical contrasts are labelled. Other chapters' older visuals await their own approved rewrites.

Each plate has an accessible SVG name/description and descriptive caption. All comparison outcomes are present without playback. Motion is opt-in, pausable and disabled by reduced-motion CSS. Wide diagrams scroll within keyboard-focusable panels on mobile. No image/video download or new dependency was added; the new artwork component is approximately 11.4 KB of source plus 5.4 KB CSS before compression.

## Explicitly unverified or unspecified

- Complete protective-stop/position-size algorithm for the May 14 short.
- Independently audited fills, exact execution timestamp, win rate or forward-tested edge.
- A universal rounding rule for half-tick arithmetic.
- A universal 7.5–8 reversal band or proof of an algorithmic cause.
- A real losing occurrence of that exact May 14 projection setup: the projection-failure contrast is hypothetical; the observed losing long is a separate source case.

## Verification

See `outputs/pilot-market-alchemy/` for browser evidence, the source-price research, data-scope hashes and screenshots. Final results:

- Production build passed; TypeScript check passed.
- 10,936 SEO/URL checks passed, zero failures; crawl passed across 787 pages.
- All 24 English/Urdu 2026 documents passed static content, title/description, canonical/hreflang, schema, breadcrumb, FAQ and source checks.
- The additional pilot check passed in both languages: all eight captioned/named visual plates are in static HTML, historical anchors and timestamped sources are present, the old shared player is absent, and no localhost/undefined internal links are embedded.
- Sitemap revision evidence recorded for the 12 actually changed documents (pilot, its hubs and affected neighbouring link labels): 759 evidenced dates, zero pending fingerprints. Existing dates preserved.
- Desktop English/Urdu reviewed in both themes; phone layouts checked. The 390px light test reports 336px figure panels and no document overflow. Dark mobile and Urdu direction/number handling were also reviewed; Urdu SVG label collision check found none after correction.
- Native browser tests verified playback/pause, the wrong-origin explanation, correct quiz scoring and incorrect-answer feedback.
- Eighty-six long pilot sentences compared with all 65 other chapters: no verbatim matches. No chapter-specific long SVG paths found in other components. This supports originality checking; it is not a claim to automatically detect every possible paraphrase.
- Other eleven 2026 lesson records unchanged in the before/after hash check. Git whitespace check passed.

The build retains existing large-bundle warnings; this pilot adds no dependency or heavy media. These checks do not constitute a field Core Web Vitals measurement. No ranking, indexing or FAQ rich-result guarantee is implied.


## 28 October revision — requested trust and usability pass

Completed the study-intent heading and immediate is/is-not box, three takeaways, verified author attribution, publication/update dates, acronym glossary, source-specific lunch note, consolidated limits, and exact futures disclosure at both ends with a full-policy link. Added an Article node to the existing graph, the requested description, first-mention contextual links, four annotated TradingView control screenshots, and two attributed source frames. Shortened eight figure captions and named the teaching SVGs. All new copy is translated into Urdu.

The nine requested values have individual verification statuses beside the sources. Only the 29,782.00 high was additionally confirmed on the available dated TradingView daily contract. The other eight values, original expiry/adjustment identity, execution timestamps and fill evidence remain unverified against an independent intraday/account record. No prices or verified arithmetic were changed. HowTo markup was optional and was not added.

Current-pass verification results are recorded separately under outputs/pilot-market-alchemy/revision-2026-10-28/. The earlier results above describe the 27 October build, not the 28 October revision. No push or deployment is included in this pass.

Final 28 October checks: production build and TypeScript passed; 10,936 SEO/URL checks and the 787-page crawl passed. All 24 bilingual 2026 lesson documents passed; additional pilot assertions cover Article provenance, exact description, nine section H2s, six images and the two strong disclosures. Recorded seven changed rendered fingerprints; all 759 sitemap dates have evidence and zero remain pending. Three incidental Urdu documents changed through corrected shared term/date labels; their English lesson content was not rewritten. The other eleven 2026 bodies and search records match the pre-edit hashes (22 records). English desktop and phone, Urdu phone, both themes, RTL, screenshot selection and playback/pause were checked. The phone document is within the 390px viewport. Existing bundle-size warnings remain; no field-performance or ranking claim is made.
