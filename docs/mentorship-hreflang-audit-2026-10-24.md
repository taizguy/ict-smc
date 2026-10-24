# Mentorship query URL / return-tag audit

## Verified live before editing

Retrieved each of the four supplied query URLs, then fetched both its English and Urdu alternate targets. All twelve requests returned 200. In every case:

- The query URL canonicalized to its clean lesson URL.
- English and Urdu canonical lesson documents had identical en/ur/x-default clusters and correct reciprocal links.
- The query response copied that canonical language cluster, so neither alternate returned an annotation to the exact `?mentorship=...` URL.

The reported warning is reproducible for the parameter URLs, rather than a missing return link between the canonical translations. Adding parameter URLs to the canonical clusters would create extra versions of the same lesson.

Google's language-annotation guidance: https://developers.google.com/search/docs/specialty/international/localized-versions

## Correction

Mentorship is a reading preference, now represented by `#mentorship=2022` rather than `?mentorship=2022`. Fragments are not separate server documents. Existing shared query links receive a 301 redirect to the clean lesson plus the mentorship fragment. The redirect validates the track and lesson membership; unrelated or invalid preferences are not redirected elsewhere. Both language versions are supported.

All generated mentorship links use the fragment. The chapter reader and course navigation read it, retaining a legacy-query fallback for local previews. Original canonical URLs and reciprocal language annotations remain intact. No lesson content or translation changed. Twelve mentorship-page link fingerprints were updated with their existing editorial dates retained; the sitemap reports 755 dated URLs and zero pending revisions.

## Verification

- Full `npm run build` passed: generation, compilation, static rendering, 10,754 SEO checks, crawl checks across 783 documents and routing checks.
- Regression coverage includes the four reported redirects in English and Urdu, fragment selection, legacy fallback, fragment precedence and unchanged canonical/invalid-preference responses.
- Browser inspection of FVG with `#mentorship=2022` confirms Reading step 3 / 9 and the correct previous/next links. The canonical remains the clean FVG URL.
- Type checking was rerun sequentially after the build; the initial concurrent invocation overlapped Vite clearing generated assets.

This fix is local until pushed and deployed. The Worker redirects require deployment; a plain static Vite preview verifies the reader but does not execute edge redirects.
