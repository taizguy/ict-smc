# Hreflang self-reference audit — 24 October 2026

## Live verification

Fetched all 755 canonical URLs in the live XML sitemap over HTTPS. All returned successfully. Parsed the original response HTML head, its canonical URL, document language and hreflang links. Found 21 missing HTML self-references, rather than the reported 19: the History category and all 20 History articles. The remaining 734 pages contained the correct self-reference.

The live sitemap already contained correct language entries for these pages, including the English self-reference and x-default. This was an HTML/sitemap inconsistency, not evidence that Google cannot index the affected pages. Google treats HTML and sitemap hreflang as equivalent methods: https://developers.google.com/search/docs/specialty/international/localized-versions

## Root cause and correction

`generateUrduPages` skipped English-only History documents before applying HTML alternates. It now adds the English self-reference and x-default before skipping Urdu generation. A shared head-only helper avoids inserting a new language switcher or claiming nonexistent Urdu translations.

Example corrected head:

```html
<link rel="alternate" hreflang="en" href="https://learnsmc.xyz/articles/history/" />
<link rel="alternate" hreflang="x-default" href="https://learnsmc.xyz/articles/history/" />
```

All existing English/Urdu pairs retain their reciprocal en/ur/x-default annotations. No routes or content were added, removed or translated. History metadata fingerprints were updated while retaining their existing editorial dates; sitemap reports 755 evidenced dates and zero pending revisions.

## Affected paths

- /articles/history/
- /articles/before-money-gifts-sharing-and-trust/
- /articles/barter-direct-exchange-and-its-limits/
- /articles/stone-age-long-distance-trade-networks/
- /articles/commodity-money-cattle-grain-salt-shells-beads/
- /articles/mesopotamia-tokens-temples-first-accounting/
- /articles/egypt-indus-grain-weights-seals/
- /articles/silver-gold-by-weight-before-coins/
- /articles/lydia-first-coins-electrum-croesus/
- /articles/greek-city-states-coins-agora-bankers/
- /articles/persia-alexander-empire-wide-currency/
- /articles/ancient-china-knife-spade-round-coins/
- /articles/rome-denarius-debasement-inflation/
- /articles/ancient-credit-contracts-loans-interest-banking/
- /articles/silk-road-indian-ocean-trade/
- /articles/medieval-money-islamic-coins-hawala-bills/
- /articles/paper-money-tang-song-china-flying-money/
- /articles/first-stock-markets-venice-voc-amsterdam/
- /articles/banknotes-central-banks-stockholm-bank-england/
- /articles/gold-standard-bretton-woods-1971/
- /articles/trading-floors-order-books-electronic-markets/

## Verification

Static generation passed, including the existing Urdu publication gate. Extended the existing SEO validator to check every indexable document's self-canonical, matching language self-reference, expected language set, published/indexable alternate targets, duplicate counts and sitemap parity. All 10,754 SEO checks passed with zero failures. No UI changes were made.

## Previous build failure reproduced and fixed

The complete `npm run build` reproduced 53 crawl failures after the preceding Reading Room push. The checker searched for the exact substring `class="ymyl-disclaimer"`; the actual chapter disclaimer had that class plus its existing styling classes. The disclaimer content was present. Replaced the brittle substring check with parsed HTML validation of a complete class token inside main content, the risk-notice text, and its disclosure link. Regression cases reject a footer-only notice, missing disclosure link and a partial class-name match.

The complete production pipeline then passed: catalog generation, runtime translation generation, Vite compilation, static rendering, 10,754 SEO checks, crawl checks across 783 documents, publisher regressions, and routing checks. The existing large-chunk warning is non-fatal. Deployment confirmation is recorded separately after pushing.
