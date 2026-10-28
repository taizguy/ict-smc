# Whole-site technical SEO audit — 28 October 2026

Status: COMPLETED technical inventory, source review and targeted live verification. Audit only; no production fixes, commits or deployment performed. This is not a ranking guarantee.

Scope: latest local generated build, rendering/routing source, and targeted production requests. The latest curriculum/theme/tools changes are local and have not been pushed; distinguish local findings from live deployment.

The last existing project suite passed 10,936 checks and a 787-page crawl. Those are useful baseline checks, not proof of complete editorial/schema/rendered-content correctness.

Evidence and affected-URL inventories are saved under outputs/technical-audit-2026-10-28/. Confirmed findings and Google documentation references will be appended below.

## Confirmed findings

### P1 — Pre-rendered reading HTML is hidden and replaced during startup
`index.html:24–30` sets `#root { visibility: hidden }` as soon as JavaScript runs. `src/main.tsx:20–37` then calls `createRoot` rather than hydrating the reading HTML, saving the old markup only for an eight-second failure fallback. All generated documents inherit this startup gate. This is an avoidable rendering/LCP/resilience risk, not proof that Google rejects the pages. Prefer progressive enhancement or route-aligned SSR/hydration with readable content remaining visible. Google explicitly indexes rendered HTML as well as extracting initial HTML links: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics

### P1 — Two Urdu lesson descriptions are essentially untranslated
`/ur/tools/masterclass/pd-arrays/rejection-block/` and `/ur/tools/masterclass/pd-arrays/hangman-pd-array/` retain the English lesson description with only an Urdu full stop. The first was also verified in production HTML. Their titles are Urdu, so the metadata language is inconsistent; this does not prove a broken hreflang implementation. The normalized English/Urdu Rejection Block descriptions duplicate one another. Evidence: `urdu-english-descriptions.json`, `static-findings.json`, `live-http.json`. Source: the description fallback/translation entries in `src/data/searchDescriptions.json`, `src/i18n/urdu.ts` and `src/utils/searchMetadata.ts`. Write genuine Urdu descriptions and verify description/OG/Twitter parity. Google guidance: https://developers.google.com/search/docs/appearance/snippet

### P2 — Market Alchemy Article markup omits a representative image
The `Article` node on `/learn/market-alchemy-trading-all-time-highs-ath/` and its Urdu version has no `image` property, although the page has authored visuals and a social image. Add a crawlable representative image only after checking it reflects visible content. Google calls Article image a recommended enhancement, not an indexing requirement; Article has no universally required properties. Source: `scripts/seo-content.ts` around the conditional Article node. Guidance: https://developers.google.com/search/docs/appearance/structured-data/article

### P2 — FAQ rich-result expectations are obsolete
58 generated documents contain FAQPage nodes. They are not malformed simply for existing, and visible learner FAQs remain useful. However Google retired FAQ rich results starting 7 May 2026 and removed the documentation in June. Do not prioritize this markup as a way to capture FAQ SERP real estate. Source: Google's current changelog https://developers.google.com/search/updates (8 May and 17 June 2026 entries). This is an optimization-priority correction, not a site penalty or an urgent schema removal task.

## Verified healthy baseline (checkpoint)
- 787 generated route documents, 759 indexable; unique normalized titles; no missing title, H1, description, canonical or social tags found in the static scan.
- JSON-LD parses on all scanned documents; no missing @type on top-level graph entities. An @graph wrapper without @type is valid and is not an error.
- All declared hreflang targets in the local manifest are indexable and return-link correctly. This does not by itself prove full translation quality.
- Production samples return Brotli compression; missing compression warnings are not reproduced. Live robots.txt allows general crawling and names the sitemap. A random nonexistent URL returns a real 404 plus X-Robots-Tag: noindex.
- No meta-keywords tag is required. Google explicitly ignores it: https://developers.google.com/search/docs/crawling-indexing/special-tags
- Google has no fixed 60-character title or 155-character description requirement. Those are project editorial budgets, not indexing rules. See the title-link and snippet documentation.

## Additional confirmed findings and priorities

### P1 — Useful initial content disappears after JavaScript

Confirmed locally and on production browser samples. Exact normalized paragraph comparisons found:

| Route | Substantial static paragraphs checked | Absent after rendering | Significant difference |
|---|---:|---:|---|
| `/tools/chartlab/` | 24 | 19 | Contrasting FVG outcomes and related-topic section disappear |
| `/tools/glossary/imbalances/fair-value-gap/` | 13 | 5 | Definition/evidence explanations disappear |
| `/masood/lectures/masood-syn-4/` | 3 | 1 | Source attribution paragraph and rules heading disappear |
| `/tools/delivery-suite/ote-calculator/` | 14 | 9 | Scope/method and assumptions sections disappear |
| `/curriculum/` | 11 | 0 | Healthy comparison sample |

Counts measure paragraph presence, not a percentage of educational value lost. Two paragraphs and a summary heading absent on the sampled FVG lesson may reflect its tabbed interface; they are not independently classified as substantive loss without that context.

**Cause:** `scripts/seo-content.ts` and `scripts/tools-content.ts` construct reading HTML separately from runtime views. Static Chart Lab embeds chapter 13's FVG explanation while the runtime lab presents a different activity. Static Masood lists include `coreRules` and attribution that the sampled runtime output does not reproduce.

**Fix:** share route-specific content models and rendering components. Preserve useful explanations, sources and contextual links in the final DOM. Do not retain irrelevant FVG text on unrelated tools simply to increase word count. Add essential-content parity checks. No intentional cloaking is alleged; the verified problem is inconsistent delivery. [Google JavaScript guidance](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), [structured-data visibility policy](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

Evidence: `rendered-samples.json`, `rendered-parity.json`. Twelve browser samples were saved across local and production pages; this was not an exhaustive live rendering crawl.

### P1 review — Near-identical static explanations on distinct tool routes

An English main-text trigram comparison found 94 pairs with similarity ≥0.65. Nineteen distinct URLs occur in groups with pairs ≥0.90:

- `/tools/chartlab/`: `btc-2022-bullish-model/`, `eur-mmbm-propulsion-model/`, `eurusd-failed-ob-breaker/`, `nq-ath-alchemy-ndog-macro/`, `nq-silver-bullet-short/`, `xauusd-gold-legacy-model/`.
- `/tools/delivery-suite/`: `judas-planner/`, `learning-path/`, `macro-clock/`, `ote-calculator/`.
- `/tools/backtest/`: `2022-mentorship-model/`, `breaker-reversal/`, `charter-model-1/`, `charter-model-8/`, `charter-model-9/`, `silver-bullet/`.
- `/tools/simulator/`: `failed-ob-breaker/`, `ict-2022-model/`, `ote-expansion-long/`.

For example, EURUSD failed-OB and EUR MMBM Chart Lab static text scores about 0.99. Shared generator explanations dominate the route-specific copy.

This score is an audit heuristic, **not a Google threshold or duplicate-content penalty**. Runtime parameters do select different activities. Do not automatically remove these URLs. Urdu uses the same generator, but the quoted similarity measurement was English-only.

**Fix:** render each useful activity's own instructions, example, assumptions and limitations. Consolidate only genuinely duplicate experiences after reviewing them individually. Align redirects, canonicals, hreflang and sitemap if URLs change. Source: `scripts/tools-content.ts`. Evidence: `near-duplicate-families.json`, `similar-static-content.json`. [Google canonicalization guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

### P2 — Broken fragment links in initial Chart Lab HTML

All seven English Chart Lab documents (root plus six cases) and their Urdu counterparts contain links to `#curriculum-review-heading` and `#chapter-quiz-13`, but neither target exists there: **28 links on 14 documents**.

`src/components/FvgLessonDiagram.tsx:65–67` contains lesson-local links; `scripts/tools-content.ts` reuses the component outside that lesson. On live Chart Lab, both links and targets disappear after startup. This is specifically an initial/no-JavaScript HTML defect, not a confirmed broken control in the final runtime UI.

**Fix:** pass context-aware destinations to the real lesson/source/quiz or provide corresponding sections when appropriate. Validate fragment targets in generated HTML and representative rendered pages. Evidence: `static-findings.json`. [Google crawlable-link guidance](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).

### P2 — Stale Workbench facts in generated HTML

`scripts/tools-content.ts:68` hardcodes a **60-lesson completion overview**, while the catalog and runtime contain **66 chapters**. It also advertises the old **10-step institutional pipeline**, despite the graph redesign and retirement of old step URLs. Confirmed in local generated `/tools/` HTML.

**Fix:** derive counts and features from the shared catalog/current tool definitions. The generated homepage description already correctly says 66; do not mistake an obsolete source fallback for the current homepage tag.

### P2 editorial — Template-heavy snippets and vague primary headings

- 21 English descriptions begin with unit numbering such as `#13:` and largely repeat a title/subtitle rather than a useful learner-oriented summary.
- 118 English Masood descriptions use the same suffix: “Independent Abdullah Masood video notes, with key points, practice and source links.” Unique lesson prefixes prevent exact duplication, but specificity could improve.
- Homepage H1: “Less guessing. More ‘oh, I see it.’” Curriculum H1: “A quieter place to understand price.” Their title tags identify ICT/SMC; the primary headings communicate mood more clearly than topic.

**Fix:** map each page family to a distinct search intent, then write accurate, specific snippets and topic-bearing primary headings. Expressive lines can remain taglines. This is editorial refinement, not a missing-tag or indexing violation. Do not stuff variants or invent descriptions to fill a character quota.

All page metadata is exported to `page-metadata.csv`. This audit does not claim fresh competitor/search-volume research for every one of 759 pages. Prioritize with current GSC query data. [Google title-link guidance](https://developers.google.com/search/docs/appearance/title-link), [snippet guidance](https://developers.google.com/search/docs/appearance/snippet).

### P2 — Large script payload exposure needs measurement

Largest emitted local JavaScript files include vendor (~1.17 MB uncompressed), chapter data (~680 KB), and Urdu chapter/shared/tools catalogs (~1.19 MB/~803 KB/~747 KB). Heavy views are lazy loaded, which is a positive safeguard. `src/i18n/loadCatalog.ts` loads a shared Urdu catalog plus an entire route-family catalog; one lesson can require a large section dictionary. These files are **not all necessarily downloaded by every English page**.

**Fix:** measure actual mobile route requests and LCP/INP/CLS first; split locale data more narrowly where worthwhile, reduce critical data dependencies and remove the startup visibility gate. Production Brotli works. No Lighthouse/CrUX measurement was obtained, so this is payload exposure, **not a demonstrated Core Web Vitals failure**. [Google Core Web Vitals guidance](https://developers.google.com/search/docs/appearance/core-web-vitals).

### P2 — Permanent slash normalization uses temporary status

Live `/curriculum` returns **307** to `/curriculum/`. Prefer 301/308 for a permanent normalization policy where the hosting configuration permits. Existing self-canonicals and consistent slash internal links reduce ambiguity; this is lower priority.

Checked HTTP→HTTPS, www→apex, uppercase→lowercase, mentorship-query cleanup and retired graph-step redirects return healthy 301s. Evidence: `redirect-statuses.json`. [Google redirect guidance](https://developers.google.com/search/docs/crawling-indexing/301-redirects).

## Completed checks and important non-issues

- **Live and local sitemaps:** 759 URLs each, identical sets, all local indexable routes included, no unexpected entries. No missing, malformed or future local `lastmod` values. Historical truth of every date was not independently established. Google ignores sitemap priority/changefreq; significant-update dates should be accurate. [Sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
- **Canonical/hreflang:** no generated canonical mismatch or nonreciprocal declared alternate found. Missing return-tag warnings were not reproduced in this pass. [Localized-version guidance](https://developers.google.com/search/docs/specialty/international/localized-versions).
- **Structured data:** all JSON parsed; no missing top-level entity type. `@graph` wrappers do not require `@type`. Existing local schema image/document asset references all resolve. Market Alchemy's omitted Article image is the separate enhancement above.
- **FAQ visibility:** no FAQ question/answer text mismatch found in initial HTML; sampled browser FAQ questions remained present. This does not restore the retired Google FAQ rich-result feature.
- **Social tags:** expected OG/Twitter tags, including image alt text, appear once per indexable document.
- **Images:** no missing `alt`, width or height attributes on scanned static image elements. Presence does not establish the quality of every description/diagram.
- **HTTP:** 18 production samples saved. Normal sampled canonical routes returned 200. A random nonexistent route returned a genuine 404 with `X-Robots-Tag: noindex`. Sampled EN/UR responses have appropriate `Content-Language`.
- **Delivery/security:** sampled production responses serve Brotli and advertise HTTP/3 via `alt-svc`. HTTPS, HSTS, CSP, nosniff, frame and referrer protections exist. HSTS preload/includeSubDomains are not Search indexing requirements.
- **Keywords:** Google ignores `meta keywords`. Actual query intent, accurate content and clear headings matter; adding a keywords tag will not fix rankings.
- **Schema scope:** LearningResource can describe lessons without guaranteeing a Google rich-result feature. Do not invent credentials, ratings, quotations or trust badges for an audit score.

## Recommended repair order

1. **Rendering and parity:** define the real content for each route; keep it readable through loading and after mount. Do not simply change `createRoot` to `hydrateRoot` while the trees differ. Verify slow/failed JavaScript and no-JavaScript behavior.
2. **Tool-route specificity:** review the 19 high-similarity English routes individually. Improve distinct activities; consolidate only genuine duplicates.
3. **Small verified corrections:** translate two Urdu descriptions, correct context-dependent fragment links, derive Workbench facts from current data.
4. **Editorial metadata:** use the saved inventory and fresh GSC queries to improve priority descriptions/H1s without stuffing or unnecessary URL changes.
5. **Measured performance/schema polish:** establish mobile metrics, reduce critical payloads where justified, add representative Article imagery.
6. Run TypeScript, a fresh production build, metadata/crawl/routing suites and essential-content parity checks. Test representative mobile, light/dark and Urdu routes. Recheck canonical/hreflang/sitemap after content/routing edits; do not stamp every date with deployment time.

## Limitations and handoff

**No P0/site-wide indexing blocker was confirmed.** P1 means prioritize repair, not proof of a Google penalty. No fixes were made during this audit, and the existing UI edits were preserved.

This was a whole-generated-site technical scan plus source review and sampled production rendering, not a complete factual/Urdu editorial review of every page. It did not obtain fresh GSC coverage/URL Inspection data, Google's selected canonicals or screenshots, rankings/backlink metrics, a complete external-link status crawl, Lighthouse/CrUX, exhaustive mobile testing or exhaustive Schema.org vocabulary/rich-result validation. Static syntax/presence checks cannot establish those results.

Re-run evidence scanners after the next build. Saved route inventory: `outputs/technical-audit-2026-10-28/page-metadata.csv`. Saved summary: `final-evidence-summary.json`. Compact affected-route list: `docs/technical-seo-audit-2026-10-28-affected-urls.csv`.
