# Three-topic learning and search improvement — 21 October 2026

## Evidence and scope

The saved GSC review identified curriculum, the masterclass hub and the FVG lesson as content URLs in the supplied crawled/currently-not-indexed validation export. Those pages already received the earlier search-focus improvements. Order Blocks and Liquidity Sweeps are adjacent teaching priorities, not newly proven GSC winners. The historical 44-impression / 3-click sample is too small for reliable CTR experiments. No fresh GSC account data was retrieved in this task.

The channel research suggested better intent separation, existing-page improvements and relevant internal links. Its unsupported ranking formulas and retired-tool recommendations were not adopted. There are no new page URLs, redirects, paid tools, ranking promises or externally published outreach messages.

## Intent map

| Existing destination | Intended reader need | Change |
|---|---|---|
| `/curriculum/` | Choose a structured learning path | Three topic cards with distinct descriptions |
| `/learn/fair-value-gaps-fvg-and-consequent-encroachment/` | Measure and recognise FVGs | Two visual classification exercises, numerical reasoning and limitations |
| `/learn/order-blocks-ob-and-mitigation/` | Understand selected runs, opening references and MT | Worked run example and two measurement exercises |
| `/learn/liquidity-engineering-and-liquidity-runs/` | Distinguish a price excursion from its subsequent response | Two contrasting completed-candle exercises using one prior high |
| `/tools/glossary/imbalances/fair-value-gap/` | Obtain a concise reference | Removed unsupported outcomes and aligned with the lesson convention; links to detailed practice and source notes |
| `/tools/glossary/order-blocks/order-block/` | Obtain a concise reference | Removed invented probabilities and institutional-inventory claims; links to the lesson and source notes |
| `/articles/pd-arrays-fvg-order-blocks-and-inversions/` | Compare related chart concepts through storytelling | Added links to the FVG and OB exercises |
| `/articles/liquidity-is-not-a-magnet/` | Understand liquidity mechanics and interpretation | Added a link to the sweep exercise |
| `/resources/ict-smc-cheat-sheet/` | Download or share a compact reference | Added routes into the three full learning journeys |
| `/tools/chartlab/` | Practise on a longer illustrative sequence | Receives links from each topic guide; its existing drill behavior is unchanged |

Every destination also has its corresponding `/ur/` edition. No harmful cannibalisation was established merely from shared words. These destinations have different purposes and were retained.

## Teaching and content decisions

- Six authored recognition cases; prices are synthetic and explicitly labeled.
- FVG: distinguish a positive-width wick gap from overlapping ranges. CE is arithmetic, not proof of support.
- OB: retain the supplied two-candle-run convention, distinguish the first opening price from MT, and state body/full-range choices.
- Sweep: price above a preselected high and a close below/above that high are separate observations. Some educators reserve the term for rejection; the exercise states its own convention.
- Wrong answers explain the specific measurement error. Revealing the answer adds annotations; the next example clears selection and feedback.
- No trading results, personal experience, statistical edge, institutional identity or newly watched recordings are claimed.
- Existing lesson source references remain. Glossary citations use the same scoped curriculum references rather than the removed unverified lecture metadata.

## Rendering, accessibility and translation

The new guide is shared between React and static HTML. Without JavaScript, both examples have SVG charts, numerical tables and native disclosure answers. With JavaScript, visitors get choice-specific feedback and progression. All lesson text and next-step links are present in initial HTML. Static and interactive presentations cover the same authored examples.

Paired editorial Urdu copy is included in the existing translation catalog and runtime generation. Urdu paths preserve the locale. Native buttons, fieldsets, status announcements, focus outlines and optional OHLC tables support keyboard and nonvisual use. Styling uses the existing theme tokens and responsive wrapping; diagrams can scroll within their own container on narrow layouts. No animation or new external dependency was introduced.

## Dates and metadata

The new examples carry an editorial date of 2026-10-21, explicitly distinct from source-video review coverage. Lesson, affected glossary and article-page structured data use the current content revision where appropriate. Adding practice links to an article does not pretend its external sources were reviewed again. PDFs retain their actual existing edition/review date; the landing page can have a later modification date.

Record lastmod through the existing content-fingerprint ledger after the final render. Preserve historical dates for unchanged pages. Sitemap inclusion and canonical/hreflang conventions remain unchanged; expect the existing 734 canonical URL entries after both editions are generated.

## Distribution preparation — publish only when requested

Suggested audience: learners confusing FVGs, OBs and sweep reversals. Lead with an educational question and a screenshot of the exercise, then link to the relevant lesson or free cheat sheet. Explain what the resource contains without promising income or results. Existing sharing permissions on the cheat-sheet landing page remain the reuse policy. No backlink purchasing, link exchanges, exact-anchor demands or community spam.

Possible post copy:

A large candle is not automatically an FVG. A run of candles is not always one last red candle. And a break of a high is not a guaranteed reversal.

Learn the differences with original visual exercises, explanations and a free English/Urdu ICT & SMC cheat sheet:
https://learnsmc.xyz/resources/ict-smc-cheat-sheet/

Educational examples, not trading signals.

## Measurement after publication

Record the deployment date, then review the three lessons and related pages together in GSC as data accumulates. Compare relevant non-brand queries, canonical indexing, crawl failures and longer-period impressions/clicks. Inspect a representative English and Urdu URL with URL Inspection after deployment. Repeatedly requesting indexing or changing dates is not the strategy. User engagement should assess whether learners can explain a failed example and reach a useful next step, not merely button clicks. No new analytics tracker was installed.

## Review record

See the final task summary for completed compilation, crawl and browser observations. Local preview is not proof of production deployment, live Google indexing or Core Web Vitals field performance. Further work on other glossary/model claims remains outside this three-topic scope.

### Completed verification

- TypeScript compilation completed without errors.
- Final production build and bilingual publication gate passed. The remaining unmatched references are the existing approved names/abbreviations/URLs, not untranslated new exercise copy.
- Existing SEO suite: 1,001 checks passed, zero failed.
- Generated crawl: 762 unique pages, valid links and schemas; all indexable pages reachable from home.
- Existing routing and report regression checks passed.
- Sitemap: 734 URL entries. Recorded 22 changed pages through the existing ledger; 213 evidenced dates in total and zero pending revisions.
- Browser: wrong-answer explanations, correct answers and next-example state reset; both cases in each of the three topic exercises; source-fidelity and ladder panels in the corrected OB glossary; Urdu OB wording, feedback and all five next-step links retaining `/ur/`.
- Desktop English and RTL Urdu previews inspected. Narrow-layout behavior was reviewed in CSS; this does not claim a physical-device test or field CWV result.
- Whitespace/diff checks passed. No changes have been pushed or deployed as part of this task.
