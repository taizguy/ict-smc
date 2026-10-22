# History series — editorial and release notes

Reviewed: **22 October 2026**. English-first release, as approved by Muhammad Umer Ijaz. Urdu article translations remain future work.

## Scope

Twenty original educational articles follow the requested order. Each has an opening connection, five explanatory sections, a closing transition, seven different illustrations, and a final **Sources and further reading** list. The last article links to `/learn/what-actually-moves-price/` as the start of Part I — Market Foundations.

This is an accessible introduction, not an exhaustive academic history. The order deliberately revisits earlier periods in Parts 11, 13 and 16. The articles explain those overlaps rather than claiming a single worldwide chronological ladder.

## Editorial checks

- No direct historical quotations, invented coin weights, exchange rates or named eyewitness scenes.
- Imagined examples and modern guide characters are explicitly fictional. The owl and living tablet are visual metaphors.
- Early dates are qualified where attribution is uncertain. Object movement is not automatically a commercial sale, and ornaments are not automatically money.
- Parts 1 and 2 correct the universal barter-origin story, while allowing barter to coexist with gifts, debt, credit and monetary exchange.
- Counting, a unit of account, a payment asset and a record of a transaction remain separate concepts.
- Indus signs are not presented as deciphered; standardization does not establish a specific political regime.
- Lydia’s early electrum issues are separated from Croesus’s later reform. No exact global first coin is asserted.
- Greek and Roman banking are not equated with modern reserve systems or deposit guarantees.
- Roman debasement and price inflation are distinct; neither is made the sole cause of Rome’s political history.
- Tang flying-money remittances are distinguished from Song circulating jiaozi.
- Venetian debt claims are distinguished from VOC company shares. VOC financing is discussed alongside colonial coercion.
- European banknote priority is distinguished from the earlier Chinese experience.
- August 1971 concerns official dollar-gold convertibility; the later exchange-rate transition is not collapsed into one event.
- Globex’s June 1992 launch is a futures-market milestone, not a claim to have invented all electronic markets.
- Digital deposits, stablecoins, cryptoassets and potential CBDCs are not treated as equivalent claims.
- No investment recommendations, profit guarantees or price forecasts.

## Source access and limits

`src/data/history-sources.ts` records the actual consulted URLs and the scope they support. Each published article selects 3–6 sources. Public abstracts and previews are identified as such:

- Humphrey/Hugh-Jones: publisher preview and introduction, not the whole book.
- Bennison-Chapman: published abstract, not the paywalled full paper.
- Cambridge ancient finance chapters: accessible summaries, not full paywalled chapters.
- IMF hawala: public overview; no precise medieval founding date inferred.
- Nature obsidian item: research highlight, not a claim to have reviewed the full underlying excavation dataset.
- Yale’s Hammurabi introduction and Logeion’s Harper entry are older references, read alongside museum or modern scholarly context.
- Central banks, archives and exchanges supply institutional primary accounts. Their promotional first-market language is qualified in the text.

No unread book is listed as though it had been consulted. No museum image or historical inscription was copied into the illustrations.

## Illustrations

`docs/history/illustration-manifest.json` identifies all 140 scenes: seven per article. Fourteen requested illustration grammars are adapted to the historical subjects. Original modern visitors, explanatory artifacts and metaphors replace the skills’ example coding scenes. Revisited grammars reverse the stage and use different topic objects.

Authoring commands:

```powershell
node scripts/history/generate-art.mjs
# Set CODEX_NODE_MODULES to an existing node_modules directory containing Sharp.
node scripts/history/render-art.mjs
```

The generators use local skill kits via `CODEX_SKILLS_DIR`, falling back to the author’s `.codex/skills` directory. These kits and Sharp are authoring dependencies only. Generated SVG and social-preview files are committed; a normal site build does not require the skill installation.

Every SVG has a 480×360 viewBox, prefixed IDs, no external references, and no embedded scripts, CSS or raster images. Artwork is schematic and does not claim archaeological accuracy. The contact sheets support visual review; SVG contract checks do not certify artistic style or historical reconstruction.

Runtime behavior: statically rendered images work without JavaScript; only visible figures load inline SVG for motion. Each figure has a pause control. Offscreen motion stops, and reduced-motion preferences disable it. Images have dimensions, accessible descriptions and lazy loading. SVG markup is trusted local generated content, never remote or user-provided markup.

## Publishing and search integration

- Category: `/articles/history/`; twenty descriptive, stable article URLs.
- Normal Articles index, topic filtering, site search, nearby related articles and previous/next links.
- Full static HTML, canonical URLs, BlogPosting author/citations/dates and an ordered CollectionPage/ItemList.
- Original SVG covers and 1200×630 social previews.
- English RSS, sitemap and English AI-readable directory include the series.
- Urdu index can discover English cards, labeled `lang="en"` and excluded from automatic body translation.
- No untranslated `/ur/` article copies or Urdu hreflang claims. The Urdu switch leads to the Urdu Articles index. Explicit `/ur/` history requests temporarily redirect to English until translated pages exist.
- Urdu RSS and Urdu AI-readable directory exclude untranslated History articles.
- Accurate lastmod values are recorded from final rendered content; unchanged historical dates are preserved.

## Verification evidence

The existing production build runs canonical, schema, crawl, redirect and routing checks. SVG checks use each requested style’s bundled linter. Rendered image hashes check for exact duplicates, and contact sheets are visually reviewed. Browser review covers the category, article navigation, sources, animation pause, light/dark themes and a mobile viewport. The final completion message reports actual results; this note is not a claim that external search engines have indexed or ranked unpublished work.

### Completed checks (22 October 2026)

- `npm run lint`: passed.
- `npm run build`: passed; 1,002 canonical/SEO assertions, crawl and routing audits passed.
- Targeted rendered-content audit: 20 articles, 10,267 article-body words, seven figures per article, 3–6 listed sources each; no failures.
- SVG contract audit: 140 passed; no exact duplicate raster renderings across the 140 scenes.
- Sitemap: 755 total canonical URLs, including the 21 new English History URLs. All 23 changed/new pages were recorded for 2026-10-22; no pending revision fingerprints remain. Existing dates were preserved.
- Feeds: 29 English articles and nine translated Urdu articles. English-only History entries are excluded from the Urdu feed.
- Browser: category search and reading order, Part 1 pause/resume, desktop light/dark, 390px mobile layout, the final chapter’s six sources and curriculum link. A mobile SVG/button sizing regression was found and corrected before completion.
- Remaining editorial work: Urdu translations of the History series. No duplicate Urdu article pages are represented as translated or indexable.
