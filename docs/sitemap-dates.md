# Sitemap modification dates

Implemented 20 October 2026. Dates describe significant page-content changes, not deployments, crawl dates or a promise of indexing.

## Evidence and baseline

`src/data/page-revisions.json` stores separate fingerprints and optional dates for every indexable English and Urdu page. The initial fingerprints were captured from the previous production build before this review's edits. Historical dates were seeded only for English articles with explicit editorial metadata, lessons corrected in the documented 19 October source review, and the bilingual mentorship pages introduced in PR #16. Other historical dates remain unknown and are omitted.

The 20 October swing-chapter revision changed 18 rendered pages: the English/Urdu lesson, curriculum/path listings and related-lesson links. Recording that revision produces 67 evidenced dates among 732 sitemap URLs. An omitted optional `lastmod` is preferable to an invented timestamp. Language editions have independent records; an English article's original date is not automatically assigned to a later Urdu translation.

The subsequent chapter-illustration addition substantively changes 142 English/Urdu lesson and curriculum/path pages, yielding 153 evidenced dates in total. The other 579 historical dates remain unknown. Chapter SVG geometry is fingerprinted as well as the explanatory text. Source-review dates remain separate from illustration modification dates.

## Editorial workflow

1. Complete and review the content, citations and both language editions.
2. Run `npm run build`. This creates the final HTML and reports changed/new paths in `outputs/seo/pending-page-revisions.json`. A stale fingerprint causes the date to be omitted, never silently refreshed.
3. Review that path list. Run `npm run seo:record -- --date=YYYY-MM-DD` using the actual editorial date. This records only changed/new rendered pages; unchanged records retain their dates.
4. Build again and review the diff, committing the ledger with the content. Repeated builds must leave the ledger unchanged and report zero pending revisions.

The recorder requires an explicit valid date, rejects future dates and backwards changes, and removes obsolete paths. Normal builds do not write the ledger. Unknown historical dates remain unknown until there is a substantive content update or documented historical evidence.

Fingerprints cover main text, content links, image URLs/alt text, search titles/descriptions, language/canonical links and JSON-LD. CSS, site navigation/footer text and bundle filenames are excluded. Replacing image bytes at an unchanged URL is not detected; such an editorial image revision should use a versioned image URL before recording the change. A purely visual style adjustment should not reset every page's date.

## References

- [Google's sitemap modification guidance](https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping): use the last significant update, not every rebuild.
- [Google sitemap documentation](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap): `lastmod` is optional and useful when consistently accurate.
