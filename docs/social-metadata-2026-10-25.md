# Homepage, language annotations and social metadata

## Verified production findings

Live HTML was fetched for the homepage and the English/Urdu FVG lesson on 25 October 2026.

- All three already contained `en`, `ur` and `x-default` alternate links. The FVG pair reciprocated. These tags were retained, not duplicated.
- `twitter:image:alt` already existed but used a generic site description.
- `og:site_name` incorrectly used “ICT & SMC Academy”. The visible header, Organization and WebSite already used LearnSMC.
- Most lessons used the generic site image; some article images were already distinct.

## Changes

- Homepage description now uses the requested topic-first free-course wording, with the matching Urdu description.
- Base OpenGraph site name is LearnSMC. Fallback social titles also use LearnSMC.
- Every indexable canonical document receives its own build-generated 1200×630 PNG social card. English/Urdu cards have localized titles and distinct URLs.
- Lesson cards incorporate the existing original chapter-specific diagram marks. Other page cards identify the page's section and title.
- Both `og:image:alt` and `twitter:image:alt` identify the actual page. OG image dimensions and MIME type are explicit.
- Card filenames hash their content and fonts, allowing social crawlers to fetch a new image after meaningful card changes.
- Existing language rules remain: paired documents advertise both languages, while the English-first History series does not advertise nonexistent Urdu copies. Noindex pages do not enter the public image-card set.

## Build assets

`scripts/social-cards.ts` runs after localization and before HTML minification. It uses the build-only `@resvg/resvg-js` renderer; visitors load no renderer or extra font resources. Generated PNGs live in `dist/images/social/` and are not tracked as source files or added as standalone HTML sitemap URLs.

Official font sources, vendored with existing OFL licenses:

- https://github.com/adobe-fonts/source-sans/tree/release/TTF
- https://github.com/google/fonts/tree/main/ofl/notonaskharabic

The TTFs are build assets for consistent text rendering across Windows and Linux; the site's existing WOFF2 browser fonts remain unchanged.

## Verification completed

- Production build, TypeScript and the existing 10,468 SEO checks passed.
- All 733 indexable documents have distinct PNG URLs, valid 1200×630 files, matching OG/Twitter alternative text and LearnSMC site-name metadata.
- All 712 paired-language documents have the expected English, Urdu and x-default annotations. The remaining 21 English-only documents retain their valid English/default annotations.
- The requested English homepage description is exactly 125 characters.
- English and Urdu FVG cards were visually inspected.
- Only the two homepage editions required new modification dates on 26 October; other content dates and the 733-URL sitemap were preserved.
