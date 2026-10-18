# Urdu edition

## Coverage and URLs

The English edition retains its existing URLs. The Urdu edition uses `/ur/` and includes 373 matching documents: 359 indexable pages and 14 excluded utilities. The combined sitemap contains 718 indexable URLs. Each indexable pair has reciprocal English, Urdu and English x-default alternates, plus its own canonical URL. Urdu HTML has `lang="ur"`, `dir="rtl"`, translated metadata and structured-data descriptions. Publisher/person identity IDs stay consistent across languages. RSS, error documents, article covers and the AI-readable directory include Urdu equivalents.

The redirect generator places all 256 exact aliases before the 12 wildcard fallbacks. Cloudflare's redirect classification is order-sensitive; appending the translated exact aliases after an earlier wildcard exceeded its dynamic-rule budget. Build-time ordering now keeps both language editions within the limits without changing destinations.

The visible language switch opens the equivalent document and preserves its query and anchor. It also appears in static HTML. Navigation, contextual lesson links, related articles, search and tool subpages retain the selected language. No IP or browser-language redirect is used.

## Translation sources and review

The full catalog is committed locally. Initial longer drafts were prepared through Google's free public translation interface, without a paid Cloud API or key. Two offline models were evaluated and rejected. Their outputs are not used. Visitors never call a translation service.

Handwritten overrides cover the homepage, shared notices, publisher guidance, article headlines, all 53 chapter headings, tool wording, terminology and 52 exception passages. Trading terms remain recognizable alongside Urdu. Numerical/placeholder checks and source alignment were used during draft preparation. These checks do not certify linguistic or financial accuracy; ongoing editorial corrections remain appropriate for this educational library.

Generated static copy has no unresolved prose. The thirteen unchanged references are the brand, email, two external URLs, acronyms and two equations. Publication stops if the static build encounters other unresolved text.

## Implementation

The JSX adapter translates visible native text and accessible labels without extra DOM wrappers. It preserves values, callbacks, cloned input IDs, storage keys and private notes. Paragraph translation precedes contextual linking. Chart coordinates retain their original direction. Noto Naskh Arabic is locally hosted as an 81 KB WOFF2 subset under the OFL license.

The complete catalog is used for static generation. Browser catalogs are split into shared, lessons, Masood, articles, tools and publisher sections; English visits load no Urdu catalog. `generate-urdu-runtime.ts` recreates these catalogs before the production build.

## Maintenance

After changing public English copy, run `scripts/translation-corpus.ts` against generated English documents, translate the new keys, review numerical and terminology exceptions, and regenerate browser catalogs. `prepare-urdu-drafts.py` is an optional editorial helper, never a deployment or visitor dependency. It stops on rate limits and writes resumable local drafts atomically. Do not upload private notes or credentials to translation services.

`PRERENDER_OUT_DIR` supports an isolated local artifact directory. Keep `outputs/` out of Git and deployment. The standard build generates the public bilingual edition in `dist/`.

## Review record

TypeScript compilation and Vite/static builds were used during implementation. Static coverage spans all 373 Urdu documents. Browser review sampled the homepage, curriculum, lessons, masterclass, article library/detail, and calculator, including language links, translated contextual links and narrow 320/390 px layouts. This is a representative interaction review, not a claim that every possible tool state or paragraph received independent professional review. Calculation formulas and saved-data formats were not changed.

References: [Google localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions), [multilingual sites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites), [Noto font source](https://github.com/google/fonts/tree/main/ofl/notonaskharabic).
