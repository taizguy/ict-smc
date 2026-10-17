# Screaming Frog issue verification — 17 October 2026

## Scope and evidence

Reviewed the supplied issues overview (20 categories), the earlier 360-row meta-keywords export, all 360 corresponding live page responses, 46 additional linked internal assets/pages and external references, and all 373 generated route documents. The overview reports counts, not affected URLs. Its counts therefore cannot identify the exact external-error or MIME-warning URL. Crawl coverage also differs: the generated inventory includes 13 additional deep glossary pages absent from the earlier export.

The original CSV files were read without modification. Review HTML, response records and working inventories are local artifacts under `outputs/issues-review/`; they are excluded from Tailwind's source scan and are not published.

## Findings and decisions

| Report category | Report count | Verification and action |
| --- | ---: | --- |
| Directives: Noindex | 14 | Intentional: advertising verification and device-local journal/profile/quiz utility routes. Retained, and excluded from the sitemap. No lesson or article was made non-indexable. |
| Content: Readability Difficult | 66 | A reading-grade heuristic, not an indexing failure. Reviewed the terminology and shared templates. Added plain-language publisher/learning-path guidance and reviewed concise topics for all 53 chapters and 118 video-note pages. Technical explanations and source material remain; no claim that every technical or legal passage now achieves a particular Flesch score. |
| Content: Low Content Pages | 4 | The complete generated inventory revealed five indexable documents below 200 words. Expanded About, Contact and two small curriculum paths with relevant guidance. Static Terms now shares the existing interactive Terms text, preserving its wording. All five now exceed 200 words. The short noindex AdSense utility document remains concise. Word counts are a diagnostic, not a Google minimum. |
| Meta Description: Over 985 Pixels | 148 | Reworked descriptions. None of the final route descriptions exceeds 985 px in a local Arial 14 px measurement. Search-result rendering varies; this is not a guarantee against Google rewriting/truncating snippets. |
| H2: Non-Sequential | 1 | Found additional skipped levels in the complete static inventory. Corrected the home, disclaimer and deep-glossary templates. No level skips remain inside generated main content. |
| Response Codes: Internal Redirection (3xx) | 1 | Reproduced `/tools/ict-suite/` → `/tools/delivery-suite/`. Updated OTE glossary links to the destination. Preserved legacy redirects for existing inbound links. Regression checks reject redirecting internal links. |
| Meta Description: Over 155 Characters | 237 | Final generated inventory: zero descriptions over the project's 155-character editorial budget, with unique descriptions retained. |
| Security: Bad Content Type | 1 | Not reproduced on the checked internal documents/assets: HTML, CSS, JavaScript, SVG, font, RSS and text responses use appropriate MIME types. No speculative header change applied. The affected-URL export was requested to identify the reported URL and distinguish an external response, stale crawl or a current defect. |
| Images: Missing Alt Text | 9 | Article covers now have original scene-specific alternatives. The inline teaching SVGs retain their title/description semantics. No policy requiring text on purely decorative images was introduced. |
| H2: Over 70 Characters | 11 | Advisory threshold. Retained meaningful section headings and the approved article wording. A longer descriptive heading is not inherently malformed or an indexing barrier. |
| Links: Internal Outlinks With No Anchor Text | 1 | Reproduced on the article directory's nine image-only links. Each card now has one link containing its image, title and description; all linked covers also have descriptive alternatives. No empty links remain in generated documents. |
| H2: Multiple | 346 | Expected for structured lessons, articles and guides. Retained. |
| Content: Readability Very Difficult | 1 | Same contextual review as the difficult-reading category. Legal language and necessary technical terms were not rewritten solely to manipulate a grade score. |
| H1: Duplicate | 2 | Confirmed two distinct glossary pages using the same heading. The detailed comparison now has a distinct heading and source-data name. No duplicate H1 remains across generated pages. |
| Page Titles: Over 60 Characters | 274 | All route titles now fit the 60-character editorial budget. Reviewed 171 study-topic titles rather than cutting important terms mid-phrase. Original lesson/video titles remain in source records. |
| Page Titles: Over 561 Pixels | 278 | No final title exceeds 561 px in local Arial 20 px measurement. The fitting helper uses a conservative approximate width; actual Google display can differ. |
| Response Codes: External Client Error (4xx) | 1 | Direct checks encountered access restrictions from Glassnode and CME; both source pages are available through another reader. No dead destination was established. Retained the valid primary citations. Exact attribution to the CSV warning requires its affected-URL export. A local Python certificate-store failure on CFTC was also recorded, without disabling TLS verification. |
| H1: Over 70 Characters | 144 | Concise study headings substantially reduce this advisory. Nine descriptive tool/topic headings remain above 70 characters; retained their full meaning. Every generated document still has exactly one H1. |
| H2: Duplicate | 327 | Shared section labels across different documents are normal. Checked for duplicate H2 text within each document: none. Retained useful labels such as source notes and risk notices. |
| URL: Underscores | 2 | Existing playlist and concept identifiers. Both resolve to valid canonical pages. Retained stable public URLs; changing them solely for a cosmetic audit score would require unnecessary migration redirects. |

## Additional corrections and safeguards

- Search title and description formatting is shared between static generation and the client metadata component. Metadata remains unique; the primary topic precedes the LearnSMC brand.
- Reviewed study-note titles describe the subject without presenting third-party “100% accuracy” video titles as this publisher's unqualified promise.
- About/Contact guidance is shared with the interactive view. The contact form explicitly explains that it opens an email draft; its button uses that action label. No message was sent during review.
- Corrected low contrast on the active publisher-page navigation tab found during the visual review.
- Preserved canonical URLs, article prose and artwork, source attribution, author details, financial notices, consent behavior and existing legacy redirects.
- Extended existing crawl checks for snippet budgets, sequential headings, informative article-image alternatives and direct internal links.

## Verification

- TypeScript compilation passed.
- Production Vite build and static prerender passed.
- Existing URL/SEO suite: 1,001 checks passed, zero failed.
- Crawl checks: 373 unique documents, valid schema graphs and internal links; every indexable page reachable from the homepage.
- Existing report and edge-routing regression checks passed.
- Final generated inventory: no duplicate title/description/H1, no skipped heading levels, no textless links, no public page below 200 words, and no title/description exceeding the character budgets.
- Sitemap retains 359 indexable canonical URLs; the 14 intentional noindex documents are excluded.

## Reference guidance

- [Google: title links](https://developers.google.com/search/docs/appearance/title-link) — titles should be descriptive and concise; Google has no fixed character limit and may truncate or generate a different title link.
- [Google: snippets and descriptions](https://developers.google.com/search/docs/appearance/snippet) — unique, useful summaries; displayed snippets depend on the query/device.
- [W3C: image alternatives decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) — informative and functional images need appropriate alternatives; purely decorative images may have an empty alternative.
- [Screaming Frog: tabs and issue definitions](https://www.screamingfrog.co.uk/seo-spider/user-guide/tabs/) — distinguish technical defects from configurable length/readability opportunities.
