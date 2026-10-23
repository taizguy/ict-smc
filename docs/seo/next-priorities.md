# Search-intent and cornerstone work — 24 October 2026

## Scope

Keep existing URLs, self-canonicals, navigation, diagrams and calculation behavior. Shared vocabulary is not proof of keyword cannibalization. Do not merge pages, add noindex or change canonicals without reviewing their actual purpose and query evidence.

`npm run seo:intent-map` inventories indexable English routes from the latest production manifest. The CSV records titles, descriptions, suggested topical groups, page purposes and a proposed full-lesson destination. It labels automated suggestions as pending semantic review. Multiple matching topics remain visible. These are editorial targets, not measured search keywords. Urdu routes serve the same reader purposes in another language; English keyword demand must not be assumed for Urdu.

## Distinct jobs for related pages

| Page family | Reader task | Editorial requirement |
| --- | --- | --- |
| Curriculum lesson | Understand the concept in depth | Definition, worked example, counterexample, limitations, sources and next step |
| Glossary | Look up a term | Concise definition and onward link to the full lesson |
| Comparison | Distinguish two concepts | Explicit differences and non-interchangeable conditions |
| Masterclass | Study a particular model | Prerequisites, component sequence, provenance and model-specific limits |
| Chart / simulator / backtest | Practise or investigate | Explain the interaction and data assumptions; shared controls alone do not make every scenario unique |
| Article | Read an original explanation | An identifiable question or narrative beyond a rewritten definition |
| Lecture notes | Follow a specific source video | Preserve attribution and distinguish the video's content from original notes |

## Implemented content work

Nine foundation lessons now add original bilingual examples, counterexamples, a reasoning check, uncertainty and a relevant next lesson: price formation (1), matching (2), order book (3), liquidity (4), swings (7), BOS (9), CHoCH (10), MSS (11) and session timing (19). Together with the existing FVG (13), order-block (15) and sweep (18) guides, this strengthens a set of twelve core learning pages. The examples are invented teaching values, not historical evidence or a performance study.

The nine revised pages have specific English/Urdu descriptions. Glossary entries for book mechanics, buy/sell-side liquidity, market structure and sessions link to the appropriate full examples. Existing diagrams and quizzes remain. The changes render in both static HTML and React. Editorial dates change only for revised content; no new full-recording review is claimed.

## Evidence consulted

- [Google: helpful, reliable content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): usefulness and original value guide this work, not page-count targets.
- [Google: crawlable links and descriptive anchor text](https://developers.google.com/search/docs/crawling-indexing/links-crawlable): actual anchor links connect relevant learning tasks.
- [Investor.gov: types of orders](https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders): limit-price constraints and stop-market distinctions; stock examples must not be generalized to every product.
- [CME: supported matching algorithms](https://cmegroupclientsite.atlassian.net/wiki/spaces/EPICSANDBOX/pages/457218479/Supported+Matching+Algorithms): price-time and pro-rata allocation differ by product.
- Earlier, scoped ICT and clock references remain in each lesson's Sources and interpretation section. New examples clarify those notes; they do not add an attribution to an unreviewed ICT video.

## Next measurement and authority work

Use query-by-page GSC evidence to decide whether Google alternates genuinely competing URLs for the same intent. An aggregate Queries sheet and a separate Pages sheet cannot establish that relationship. Compare equal periods after deployment and allow for reporting delay. Low impression counts do not support firm CTR or position conclusions.

Review production CrUX/Core Web Vitals when sufficient field data exists. A successful build is not evidence of real-user LCP, INP or CLS. No analytics service, paid monitoring or tracking script is added by this change.

Prioritize earned references to the existing bilingual cheat sheet and original diagrams. Identify relevant educators and resource directories and assess fit before outreach. Do not purchase links or send messages without the publisher's authorization. No acquired backlink is claimed here.
