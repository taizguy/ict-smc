# Batch 1 review

Scope: two Urdu descriptions; shared Workbench facts; representative Market Alchemy Article image. No startup, hydration, URL, canonical, hreflang, sitemap-date, FAQ or unrelated metadata changes.

## Urdu copy for author review

Rejection Block (`/ur/tools/masterclass/pd-arrays/rejection-block/`):

> ICT ریجیکشن بلاک میں وِک کی آخری حد اور کینڈل باڈی کے درمیان زون پہچانیں؛ چارٹ کی مثالوں سے حدود، واپسی اور ناکامی سمجھیں۔

Hangman (`/ur/tools/masterclass/pd-arrays/hangman-pd-array/`):

> ICT ہینگ مین PD اَرے میں وِک سے قیمت کا ردِعمل اور درمیانی سطح (CE) دیکھیں؛ تصدیق، حدود اور ناکام صورتوں کا موازنہ کریں۔

These are genuine Urdu drafts with familiar trading terms retained. Author language review is pending. The English descriptions remain byte-for-byte unchanged; their numbered wording belongs to Batch 4. Static description, Open Graph and Twitter description use the same translated pair; the two derived English source keys are included in the client tools catalog so runtime translation agrees.

## Workbench facts

Moved the existing ten directory entries to `src/data/workbenchCatalog.ts`. Runtime presentation attaches its existing icons to that data; the static generator renders the same names, URLs, descriptions and features. No links or entries removed. Mastery Profile's lesson count now comes from `chapterCatalog.length` in both outputs (currently 66).

Replaced the obsolete graph badge/pipeline features with its current interactive 3D concept tree, expandable topic branches and accessible text-tree links. Added corresponding Urdu translations. Other tool descriptions/features were retained. The catalog stays in the Urdu tools bundle rather than moving its prose into the shared bundle.

## Article image

Added `image` to Market Alchemy's existing Article node: `https://learnsmc.xyz/images/lessons/market-alchemy/ict-may14-overshoot-source.jpg`. This existing source chart is visibly embedded in the lesson, with source attribution already present. The Urdu schema retains the same public image URL while localizing the Article URL/language normally. No artwork, dates or schema types changed.

## Metadata research scope

Queries checked on 28 October 2026: `ICT rejection block wick highest body close explained` and `ICT hangman PD array consequent encroachment explained`. Rejection-block result wording emphasized body/wick boundaries and identification. URLs observed included https://daqverse.com/concepts/rejection-block and https://www.ictkillzone.com/ict-rejection-block. These are competitor wording observations, not evidence of search volume or authoritative trading definitions. No reliable distinct Hangman competitor comparison was established in that search pass.

Decision: this batch translates the existing page intent rather than changing English keyword targeting or lesson definitions. Urdu drafts are grounded in the existing lesson subjects; no ranking or trading-performance claim is added. Broader query research/English rewriting remains Batch 4.

## Verification

- Targeted command: `npx tsx scripts/verify-audit-batch-1.ts`.
- Checks actual existing EN route fixtures plus updated localization: unchanged English snippets, Urdu meta/OG/Twitter parity, runtime dictionary parity, 10 shared links/features, current chapter count/graph features, Article image existence and visible usage, localized Article URL/language.
- TypeScript: `npm run lint`.
- No full production build, 10,936-check suite, crawl or sitemap recording in this batch. Final full verification remains Batch 6. Targeted HTML/schema evidence is retained under `outputs/audit-batch-1/`, not published with the source changes.
