# LearnSMC Articles: editorial and publishing guide

## Direction

Articles sits immediately after Curriculum in desktop and mobile navigation. Its public home is `/articles/`. The working identity is **Field notes**: a quiet place for original illustrated explanations of trading, decisions and market data. The byline is Muhammad Umer Ijaz, as explicitly approved by the publisher.

The reading layout uses warm paper, dark green ink, serif body text, generous spacing and small original line figures. It keeps the existing academy navigation. It is an original visual system; no Wait But Why character, image, text or proprietary chart is reused.

## Reference observations

Reviewed on 16 October 2026:

- [Wait But Why homepage](https://waitbutwhy.com/), [Why Procrastinators Procrastinate](https://waitbutwhy.com/2013/10/why-procrastinators-procrastinate.html), and [The Tail End](https://waitbutwhy.com/2015/12/the-tail-end.html). The useful principles are narrative openings, progressive explanation, visual metaphors, plain backgrounds, comfortable text and related reading. The inspected procrastination post container had about 1,371 visible words, 57 paragraphs and 14 images when measured in the browser; that includes its surrounding post material and is not an exact editorial-body count. Article length varies; there is no reason to impose a universal length target. The reviewed drawings are images rather than a requirement for continuous animation.
- [BlockHorizon dashboard](https://charts.blockhorizon.io/dashboard). Its visible library included realized-price, MVRV, NUPL, supply and activity charts. This is useful for discovering research questions. No current readings, charts, data downloads, screenshots or API access were incorporated into LearnSMC. Free viewing does not establish republication rights.

## Initial edition

| Article | Purpose | Illustration |
| --- | --- | --- |
| A good trade can lose. Your brain would like a word. | Separate decision quality, rule adherence and outcome; use an observable journal process. | A fictional trader compares a plan with a result card. |
| The hole gets deeper faster than the ladder gets taller. | Explain recovery denominators, current-equity sizing, costs and execution assumptions. | A hole, ladder and changing account base. |
| Liquidity is not a magnet. So why does price go there? | Separate auction mechanics from stop-location and participant-intent hypotheses. | A fictional two-level auction. |
| Your Bitcoin dashboard is not a crystal ball. | Explain realized-price proxies, MVRV/NUPL overlap and data labels. | Three fictional coins with movement and market price tags. |

Reading time is calculated from the actual article text. Each essay contains a labeled example, six sections, a three-step illustration, source annotations, relevant curriculum/tools links, financial-risk disclosure and corrections link. No first-person trading history or professional qualification was invented.

## Content model and adding an article

1. Add the original essay to `src/data/articles.ts`, including stable slug, search title, description, date, topic, intro, section IDs, paragraphs, source annotations and related links.
2. Record a source only for the claims it supports. Clearly label invented examples. Separate hypotheses, definitions and measured facts. Do not claim historical performance without a reproducible dated dataset and method.
3. Add genuinely relevant artwork in `ArticleSketch.tsx` rather than repeating an unrelated illustration. Keep a text equivalent, native controls and a readable static state. Playback is opt-in and respects reduced motion; the article never depends on motion to explain its point.
4. Add an original 1200 × 630 social card under `public/images/articles/`, matching the sketch key. The initial PNGs were drawn locally from original elements, not generated from third-party artwork.
5. Build through the existing catalog → Vite → prerender pipeline. The catalog provides lightweight route/search metadata; full prose stays in the lazy article module. `scripts/article-pages.tsx` generates static article HTML, vector assets, feed and BlogPosting metadata from the same content used by the interactive page.
6. Review the prose, claims, rights, links, desktop and narrow-screen layout before publishing. A new article needs an actual publication date and a deliberate modified date when materially revised. Do not change timestamps merely because another page was rebuilt.

## Source and reuse rules

- Prefer original writing informed by primary documentation. Link sources next to the relevant section and explain the scope of their support.
- A citation is not permission to reproduce a full article, chart, photo or paid dataset. Do not import external assets until the exact license or written permission is recorded, including attribution and modification obligations.
- [Ethereum.org's website repository license](https://github.com/ethereum/ethereum-org-website/blob/dev/LICENSE) was inspected and declares MIT terms for covered software and associated documentation. This is a future research avenue, not a blanket clearance for every embedded asset or external contribution. No material from that repository is reused in this edition.
- Coin Metrics, Glassnode, BIS, Bitcoin documentation and SEC materials are linked as factual references in these original essays. Their graphics and prose are not republished. The reference site list is not an endorsement or a claim that all of those sites offer unrestricted reuse.
- For a future data article: record exact metric ID, provider, definition/version, adjustment, date range, interval, timestamp, transformations and rights. Explain revisions and missing observations. Never present an illustration as a current or historical market dataset.

## Next editorial opportunities

Build a small library around these existing articles rather than a large set of keyword variants:

- **Psychology:** hindsight in screenshot reviews; recognizing a revenge-trading objective; personal stories only from the author's confirmed experience.
- **Risk:** expected value versus geometric growth; correlated positions; spreads and slippage; a drawdown calculator with explicit assumptions.
- **Mechanics:** stop-market versus stop-limit; spread versus depth; what a candle can and cannot reveal; fragmented FX feeds.
- **On-chain:** addresses versus people; exchange-transfer labeling; why cohort definitions matter; a sourced historical study only after dataset and reuse rights are established.

Use descriptive search titles with natural language headlines, contextual links to prerequisites, concise source notes and a useful conclusion. Original diagrams and worked examples can earn references from other writers; no fabricated backlinks, bulk reposting or guaranteed ranking claims are part of this section.

## Current implementation status

Four essays, five public HTML routes, an RSS feed, original SVG sketches and PNG social cards are implemented on `feat/illustrated-articles`. Content remains readable in generated HTML without JavaScript. Core routes and utility indexing rules are retained. Production publication is a separate action.
