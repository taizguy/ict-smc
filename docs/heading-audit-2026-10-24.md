# Duplicate heading audit — 24 October 2026

## Scope and live findings

Fetched all 755 indexable URLs and inspected their served h1–h6 text. All requests succeeded. Repeated heading text appeared on 216 URLs: 108 English and 108 Urdu. Detection normalizes case, Unicode compatibility forms, punctuation and spacing. The generated HTML audit independently found the same affected pages.

| Template family | English URLs | Repetition |
| --- | ---: | --- |
| Homepage | 1 | Chart caption repeats a concept-card heading |
| Lab hubs and exercises | 22 | Same guidance block appended twice |
| Concept comparisons | 16 | Page h1 repeated as table-section h2 |
| Delivery modules | 4 | Page h1 repeated as introductory h2 |
| Chapter readers | 53 | Quiz section heading rendered twice; two vocabulary questions promoted to identical h3s |
| Article index | 1 | Featured article also appears in the default card grid |
| Curriculum topic indexes | 11 | Topic h1 repeated as its list-section h2 |

Each family has a corresponding Urdu version. The scan compares headings within each document, not generic section labels on unrelated pages. Reusing labels such as “Sources” on different articles is normal and was not rewritten merely to make wording site-wide unique.

Google's duplicate-content guidance concerns duplicate content/URLs, not an automatic penalty for repeated heading labels. Clear main titles and helpful section structure remain useful:

- https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- https://developers.google.com/search/docs/appearance/title-link

## Corrections

- Quiz: the reader owns the single section heading. Static questions use fieldsets and legends, matching interactive questions; original questions, choices and explanations remain intact.
- Labs: append a study-guide block only if the same guide has not already been rendered, removing repeated paragraphs as well as the heading.
- Comparison: table section is “Definitions and study conditions,” including in the interactive component and Urdu catalog.
- Delivery module: introductory section uses “Scope and method.”
- Curriculum topics: list subsection uses “Chapters”; topic title remains the h1.
- Homepage: chart caption identifies its role before the selected concept.
- Article list: show the featured article once in the default view; filtered/search views include it in their matching results instead. The count reflects the displayed grid. No article was deleted.

## Verification and dates

After the corrections, generated indexable documents have zero repeated normalized h1–h6 labels. The full production build passes, including the Urdu publication gate, 10,754 SEO checks, crawl checks across 783 documents, and routing checks. A permanent per-document heading-duplication check now runs within the crawl validator.

The 216 reviewed heading/content changes are recorded for 2026-10-24. The History index only received a number/label markup adjustment in its counter, so its existing editorial date is retained. Other editorial dates are unchanged. Sitemap reports 755 evidenced dates and zero pending revisions.

The preceding mentorship-query fix remains part of the pending local changes. Neither change is deployed until pushed. Live baseline data is saved locally in `outputs/live-heading-duplicates.json`; generated before/after audit evidence is under `outputs/`.
