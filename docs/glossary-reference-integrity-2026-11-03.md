# Glossary integration: discovery and execution log

Date: 3 November 2026 (Asia/Karachi). Branch: fix/glossary-reference-integrity. No push, merge or deployment authorized for this task.

## Discovery before edits

- Prototype UI in design/glossary-concepts is separate from production ConceptExplorer and separate prerender templates.
- 41 concepts, seven categories, ten additional deep-reference pages. Preserve all 59 EN URLs and mirrors; scope's 49 primary pages receive shared rendering.
- Current runtime conditionally mounts modules; static templates contain partial content. The FVG route alone already uses staged reading enhancement.
- Language alternates and content-fingerprint-based revision ledger exist. Reuse them; never stamp unchanged pages.
- User's required hub title, H1 and description accepted with count derived from data. No keyword-volume claims; the requested quick-reference table uses 'ICT terms at a glance'.
- Verify the reported white bar with actual DOM/screenshot evidence; don't assume its origin.

## Research

Queries: ICT glossary smart money concepts glossary FVG order blocks terms (3 November 2026). Consulted search results for ICT Flow glossary, Oyamori SMC glossary, SmartMoneyTrader glossary and OrderBlock.net ICT reference. Their titles favour glossary, ICT/SMC and named definitions. This is intent research, not measured search volume. Existing user wording is retained for the hub metadata.

Primary technical references consulted: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/ ; https://schema.org/DefinedTermSet ; https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data . DefinedTerm/DefinedTermSet describe a glossary but do not promise a Google rich result. External validator results must be reported separately from local schema checks.

## Planned shared-file edits (announced before editing)

Glossary component/data/scoped styles and route models; prerender and native Urdu rendering integration; runtime Urdu catalogue registration; SiteFooter adds ICT Glossary. No unrelated page layout changes, URL deletions or redirects.

## Progress

Implemented: shared bilingual model, route UI, native prerendering, metadata/schema, accessible navigation and scoped styles. Verification evidence and release status are recorded below.

## Metadata intent review

Additional cluster queries checked on 3 November 2026: ICT glossary buy side sell side liquidity inducement LRLR HRLR meaning; ICT glossary order block breaker propulsion reclaimed suspension hangman definition; ICT fair value gap IFVG consequent encroachment Reaper Enigma RDRB glossary; ICT 2022 model Silver Bullet Venom CRT SMT Sick Sister definitions; ICT BOS MSS CHoCH CISD changing state delivery difference glossary; ICT Power of Three killzones macro windows quarterly shifts IPDA glossary; ICT Market Alchemy all time high NDOG NWOG opening gap glossary; ICT interest rate triad institutional pricing mega trades daily bias Gold Legacy NQ open.

Consulted search-result titles and snippets: https://hadalinstruments.com/glossary/buy-side-and-sell-side-liquidity/ ; https://hadalinstruments.com/glossary/propulsion-block/ ; https://hadalinstruments.com/glossary/consequent-encroachment/ ; https://hadalinstruments.com/glossary/ict-2022-model/ ; https://www.ictkillzone.com/ict-concepts ; https://www.equiti.com/sc-en/news/trading-ideas/ndog-nwog-ict-trading-new-day-new-week-opening-gaps/ ; https://hadalinstruments.com/glossary/ict-macro-times/ . These are competitor/terminology observations, not authoritative proof of trading claims, source-video verification, search volume or a claimed Google ranking. Retain recognisable concept names and explicit definition intent; avoid borrowing unsupported 'must fill', institutional-intent, accuracy or win-rate assertions.

## Implemented

- One production GlossaryReference component renders the hub, seven category pages and 41 term pages; the same route view is used by native EN/UR prerendering and the runtime. All eight panels are real DOM, not tab-created content. The script-failure reading view uses the established staged createRoot mechanism; no hydrateRoot swap or global startup-gate removal.
- Category/term destinations are genuine links. Client navigation pushes history, back/forward works, query state canonicalises to the clean path, module state uses fragments, and category/term state is derived from the route. No parameter links are emitted. Hub preview content uses data-nosnippet; the hub remains a collection, while each term has its own canonical reference URL and Article/DefinedTerm nodes.
- Hub title/count/H1/description updated as requested from the catalogue. Unique term/category metadata and stable per-page social images are shared between static and runtime metadata, including native Urdu. Exactly one H1 and logical H2/H3 structure; formation ordered lists and Rules & Matrix HTML tables.
- Shared Schema.org CollectionPage/DefinedTermSet/BreadcrumbList for collections; DefinedTerm/Article/BreadcrumbList for terms, real author, actual editorial dateModified. No publication date or credentials invented.
- Dedicated index nav/ul, full definitions retained under CSS line-clamp, short display labels, selected aria-current and scroll alignment. Category and module keyboard support, live debounced search results, clear/empty states, shortcut safety and reduced-motion fallback. With scripting off, every category link remains tabbable and all eight panels become readable; mobile has no nested index scroller.
- All 41 terms have individual bilingual definition, formation, numerical example and limitation records. These are the current glossary's reviewed copy; the legacy concept dataset remains as identity/diagram inputs and for unrelated tools. Institutional-intent claims are not silently presented as fact. The 65% wick cutoff is explicitly a LearnSMC convention. The IFVG far-boundary error is corrected. Source-specific uncertainty for RDRB, Reaper, Enigma, Suspension, Venom and Sick Sister remains visible. Diagrams are schematic; numerical cases are explicitly separate invented examples.
- Unrelated default Masterclass fallback removed from the new glossary. Where an exact mapping exists it links to that lesson; otherwise the module offers the real relevant curriculum page rather than process/placeholder copy.
- Each term links to three real related terms, its relevant curriculum chapter, and a Chart Lab study where mapped. Added ICT Glossary to the shared footer. Existing ten deep-reference URLs and their Urdu mirrors remain accessible via contextual parent links; those additional legacy pages were preserved, not redesigned, and no URL was deleted or redirected.
- Added a quick-reference table titled 'ICT terms at a glance' and a short ICT vs SMC explanation. No unverified search-volume or popularity claim is used.
- Recorded only changed primary glossary fingerprints in page-revisions.json with 3 November 2026 editorial evidence. All 98 requested documents have evidenced lastmod; unchanged/unrelated dates were not stamped. Existing 419 pending unrelated revision records remain outside this task.

## Verification and evidence

- Production build/prerender and 10,936 existing SEO checks passed. Full 787-page crawl found all indexable pages reachable, with no new orphaned deep-reference pages. Sitemap remains 759 URLs.
- scripts/verify-glossary-reference.ts is included in build/test:seo. It checks 98 primary EN/UR documents, all 41 index links, eight panels, one H1, metadata/social parity, canonical, head and sitemap language alternates, schema types, related/curriculum mappings, social-image files and evidenced lastmod.
- Static/runtime normalized paragraphs and H1-H3 parity passed for hub, Hangman, FVG and Urdu FVG. Normal SPA navigation/back/forward, keyboard Home/End and slash, disabled-JS full reading and failed/delayed-script visible fallback passed. No fallback allowlist was added to hide mismatches.
- Browser snapshots cover desktop/mobile, EN/UR and both themes. No horizontal page overflow; the three inherited diagram controls below 44px were corrected. Reduced motion checked. Sampled visible HTML text contrast minimum 5.71:1 light and 7.39:1 dark. Diagram text uses theme ink. This is not a claim of full assistive-technology certification or a physical-device audit.
- Schema.org online code validator: submitted hub and Urdu FVG graphs returned 0 errors and 0 warnings. Evidence: outputs/glossary-integrity/schema-validator-results.json and schema-validator-*.png. This is schema validation, not a promise of Google rich results or indexing.
- No stray white top-centre fixed element reproduced in final browser captures; no unrelated element removed on speculation. Horizontal module scrollers were replaced by wrapping tabs.
- Bilingual editorial review export: docs/glossary-urdu-review-2026-11-03.csv (205 content string pairs). Additional interface strings: src/i18n/glossary-ui-urdu.ts.
- Evidence directory: outputs/glossary-integrity/ (static-verification.json, runtime-verification.json, parity-and-fallback.json, contrast-and-slow-js.json, touch-targets.json, revision-evidence.json and build logs).

## Release status

Local feature branch only. No push, merge or deployment. Integrated preview: http://127.0.0.1:4242/tools/glossary/ and http://127.0.0.1:4242/ur/tools/glossary/ . The earlier port 4240 is the standalone design comparison, not the integrated production renderer.

Final follow-up: removed SEO implementation jargon and repeated empty-masterclass messages from reader copy. A final parity check caught the newly used Curriculum chapter label missing from the browser catalogue; regenerating the runtime catalogue resolves it without changing the genuine Urdu wording. The full build includes that generation step.

Final verification complete: catalog-complete-build.log is the latest complete npm build (including fresh runtime-catalogue generation). The corrected runtime label now passes native Urdu essential-content parity; all eight panels are readable with scripting disabled. Local HTTP checks returned 200 for every one of the 98 primary glossary documents, with no X-Robots noindex header; robots allows public paths. No pending implementation work in the requested 49-page-per-language scope. White-bar origin remains unverified, with no stray element reproduced in final captures; ten additional legacy deep-reference pages remain outside the redesign and retain their URLs and incoming links.

## Collection-hub follow-up
The user superseded the earlier hub-with-open-pane requirement: the hub and category landing pages now present a dedicated editorial hero and a grid/list catalogue, with no selected concept or module pane. All 41 term links remain in their static DOM (category/search filtering hides entries); the 41 term pages retain the eight-module reader. Grid/list uses one set of anchors instead of duplicate hidden catalogues. Existing term URLs, clean canonicals, glossary metadata and schema remain unchanged. Added native Urdu hero, orientation, layout controls and category breadcrumb. The static verifier now checks zero reader panels on collection routes and eight on term routes. The earlier local-only link/card/index styling changes are retained.
Verification for this follow-up: TypeScript, production build and native prerender passed; targeted static verification passed for all 98 primary documents. Sixteen changed hub/category fingerprints were recorded with the actual 2026-11-03 edit date. Browser checks passed for English/Urdu at 1440px and 390px in light/dark themes: 41 catalogue links, one H1, zero opened reader panels, no horizontal overflow, list/grid switching and navigation to eight-panel term readers. Evidence: outputs/glossary-integrity/catalogue-hub-{build,prerender,dates,static}.log and catalogue-browser-check.json; screenshots catalogue-*.png. A final scoped pressed-button CSS override was additionally checked in the local production preview. No push, merge or deployment.
