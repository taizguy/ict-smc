# Chart Lab hub and study-page UI review — 3 November 2026

Local implementation only. No push, merge or deployment. Scope: /tools/chartlab/ and its six named studies, EN/UR, light/dark and responsive layouts. React/Vite/TypeScript, existing plain CSS, Source Sans 3 and Noto Naskh Arabic; no new font or frontend dependency. Full skill review mode. The user requested a usable study hub and consistent reading/wayfinding, not a new visual identity for the whole website.

The Impeccable context launcher failed because engine 0.1.5 could not create its cache. Existing PRODUCT.md, DESIGN.md and Chart Lab surface notes were read directly. The global DESIGN describes a historical Masterclass prototype; the established Chart Lab tokens and the user's current instruction govern this surface. No detector, concept-seed, image-generation or independent-agent review is claimed. Both skill references were consulted; no outside-page redesign was performed.

## Product and layout

The root now selects a study instead of repeating the old generic exercise. Six real linked studies, with 29 contrasting cases, are derived from the existing models. There is a recommended Gold starting point (four stages), an annotated synthetic preview with an optional play/pause emphasis, introductory explanation, beginner foundations link, search, learning-goal filters, grid/list view, a practical three-step guide, five visible-in-HTML FAQ answers, author/review/source/correction links and honest limits. All six cards exist in raw HTML before interaction. No carousel or fetched-only lesson links.

Leaf exercises preserve their questions, answers, prices, selection logic and chart engine. Rules use a two-column numbered reading layout rather than one narrow text column inside a wide card; mobile uses one column. Case readings use two columns on desktop and one on phones. Heading scale, section rhythm, card padding, context-assumption bullets, related-reading bullets and answer-list spacing are explicit. Previous/next study cards and a hub backlink provide real navigation. Nothing changes the underlying definitions or turns synthetic examples into historical data.

Contextual links scan plain explanatory copy only. They skip headings, question buttons and price controls; at most two different destinations per block. Links use one theme-aware blue accent, a light tint and underline rather than a different arbitrary colour for each word. They resolve to actual lessons, glossary definitions or relevant Masterclasses, including FVG, IFVG, CE, blocks, liquidity, propulsion, 2022, NDOG and foundations. The chosen Urdu text and English technical abbreviations are preserved inside links, with correctly localised hrefs. The original global linker and other tools are unchanged.

## Coverage

| Category | Evidence inspected | Result |
| --- | --- | --- |
| Typography | Hub, all six study bodies, English/Urdu at 1440/390px; existing font tokens | Explicit hierarchy, reading measures, tabular counts, balanced headings; no new fonts |
| Surfaces | Hero, study cards, rule columns, lists, search, focus, navigation; light/dark captures | Scoped borders/tints/padding; inherited all-card highlighting and double search borders corrected |
| Animations | Optional candle opacity emphasis; native exclusive FAQ disclosure with progressive CSS height transition; reduced-motion CSS | No reading hidden by motion; controls and static captions remain present. Physical-device motion quality is not certified |
| Icons | Existing Lucide outline set in controls/navigation | currentColor, consistent stroke, RTL arrows; no emoji icon substitution |
| Performance | No live chart instance on the hub; fixed SVG dimensions; six cards rendered initially; production build | No new heavy dependency; shared pre-existing large chunks remain. No new Lighthouse or field-CWV score claimed |

## Changes by principle

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| High | src/components/market/ChartLabHub.tsx:11 | Generic six-case desk at the collection URL | Searchable, linked six-study directory with an explicit starting point | Task clarity and information architecture |
| High | src/styles/chartlab-analysis.css, scoped hub search | Global input border and focus competed with wrapper | One input container, no inner border/outline, visible wrapper focus | Prevent repeated double-box interaction defect |
| Medium | src/components/market/RouteChartStudy.tsx:47; Silver rules | Long list occupied a small part of a wide card | Numbered two-column reading with responsive single-column fallback | Reading measure and useful space |
| Medium | src/components/market/ChartStudyLinks.tsx:21 | Related concepts were mostly plain text | Selective, highlighted native anchors with localised destinations | Contextual wayfinding and crawlable links |
| Medium | src/components/market/ChartLabHub.tsx:35 | Users relied mainly on the hub/library footer | Previous/next cards and explicit hub return | Navigation continuity |
| Medium | src/styles/chartlab-analysis.css, study reading | Inconsistent heading sizes, dense prose/list spacing | 22px section headings, 18px case headings, consistent gaps, styled true lists | Typography and scanability |
| Medium | ChartLab hub cards and header | Generic link rule tinted whole cards; H1 floated into controls column | Neutral cards, title-only link emphasis, explicit header grid | Hierarchy and surface consistency |
| Low | Hub SVG and controls | No distinct hub preview/layout states | Synthetic case-based SVGs, labelled CE, grid/list, empty/reset and play/pause states | Honest visual examples and complete states |

Considered but rejected: a carousel (hides study choices); multiple live charts in the directory (unnecessary runtime/interaction load); a global theme/link overhaul (outside scope); removing static evidence to shorten pages (would harm accessible no-JS reading). No invented reviews, ratings, credentials, publication dates or performance promises.

## Search and Google guidance

Research on 3 November: query “ICT chart practice interactive smart money concepts chart lab”. Search-result excerpts from ICC Chart Challenge and ICC Charts learn/indicator pages use chart practice, FVG/order-block/liquidity identification and real-chart language. These were wording/intent observations, not verified Google positions, search volume, full competitor-page audits or source facts. LearnSMC's title deliberately names chart practice and its description explicitly identifies synthetic data rather than implying the competitor's real feed. No competitor wording, charts or price data copied.

Consulted Google primary guidance:
- https://developers.google.com/search/docs/crawling-indexing/links-crawlable — native anchors with href and useful contextual anchor text.
- https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing — equivalent accessible content and indexing directives across devices.
- https://developers.google.com/search/docs/fundamentals/seo-starter-guide — descriptive titles/headings and useful page structure.

Hub title: Chart Lab: ICT & SMC Chart Practice | LearnSMC
Hub H1: Chart Lab: ICT & SMC chart practice
Hub description: Practise ICT and Smart Money Concepts with 6 guided chart studies. Compare FVGs, sweeps, breakers and failed setups using labelled synthetic prices.

Urdu title/H1/description are native parallel strings in src/data/chartLabHub.ts. Counts derive from the real shared models. One H1; self-canonical and reciprocal en/ur/x-default; specific OG/Twitter image and alt; CollectionPage, visible BreadcrumbList and matching six-entry ItemList. Five FAQs are ordinary visible content, with no new FAQ rich-result work. Existing lesson metadata and source-review dates are retained. No new URLs or redirects and no meta keywords. Sitemap membership remains 759.

## Evidence and verification

- outputs/chartlab-five/hub-final-build.log: final production/prerender/full SEO/crawl checks — exited 0: 10,936 checks and 787-page crawl passed, with routing and existing curriculum/Masterclass regressions.
- outputs/chartlab-five/hub-typescript.log: TypeScript passed after using SVG-compatible direction styling.
- outputs/chartlab-five/hub-static-checks.json: new hub metadata, all six static cards, FAQ text, matching schema/social/canonicals/hreflang and real backlinks.
- scripts/verify-remaining-static.ts, verify-silver-static.ts, verify-breaker-static.ts: full original prose verified through decoded DOM text so anchors may split nodes without weakening content parity.
- outputs/chartlab-five/hub-browser-round1.json: first study-layout inspection across six routes, desktop English and mobile Urdu dark.
- outputs/chartlab-five/hub-browser-confirmation.json/.log: completed hub controls, single search focus, card -> study -> next navigation, and twelve study views; four earlier hub theme/width variants were inspected. Real-device testing not claimed. The browser runs isolated from the signed-in browser and uses existing privacy preferences.
- PNGs named chartlab-hub-final-*, chartlab-directory-final-*, chartlab-rules-* show the actual local preview. Source illustrations and hover/pause/empty states are not substitute stock artwork.

Initial checks caught the too-long 156-character project description budget, inherited card/focus styling and a TypeScript SVG attribute mismatch. They were corrected in code, not allowlisted. A text-link test also caught the global Urdu wrapper expanding NDOG inside an already-localised sentence; the link now preserves the original selected wording. Tests must inspect completed build output, after social-card generation, rather than an intermediate Urdu document.

Final verification: production build + prerender exited 0; TypeScript passed; all fourteen static Chart Lab documents passed canonical/hreflang/OG/Twitter/schema/prose/link checks; all six original exercise models remain covered by the data and 29-case shape guards. The 787-page crawl and 10,936-check suite passed. Browser confirmation passed hub search/filter/empty/reset/grid-list/FAQ/play/navigation, twelve study-route locale/width checks, and two corrected hub layouts; earlier four hub theme/width variants were also inspected. Search has one 2px wrapper focus and a 0px inner outline/border. Native internal-link contrast measured at least 5.11:1 across 139 inspected text/background pairs. No horizontal overflow or runtime exceptions were found.

Keyboard / shortcut, 10% animation playback, pause and prefers-reduced-motion were verified. Four real browser root views with disabled/failed JS retained all six links and five FAQ answers visibly. Evidence: hub-accessibility-fallbacks.json/.log. The static test compares decoded DOM text when links divide text nodes, preserving the exact original bilingual prose; it does not allowlist missing content.

Sitemap membership remains 759; only the fourteen genuinely revised EN/UR Chart Lab fingerprints were recorded for 3 November, with this document as evidence. Existing source-review dates remain unchanged. No blanket lastmod stamping, deleted URLs or redirects. Other pending historical fingerprints were left alone.

Verdict: Approve for local design review in the tested scope. Unverified: physical devices, field Core Web Vitals and a fresh Lighthouse score. Pre-existing large shared bundles remain a performance limitation. Technical passing checks are not a guarantee of Google indexing, first-page rankings, AdSense approval or AI citations. No push, merge or deployment.
