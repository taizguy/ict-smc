# Masterclass hub redesign report

Implemented 28 October 2026. Scope: /tools/masterclass/ and its Urdu counterpart. Prepared for release; deployment status must be verified separately.

## Final search copy

- Title: **ICT Masterclass: Visual Smart Money Concepts | LearnSMC**
- H1: **ICT Masterclass: Visual Lessons on Smart Money Concepts**
- Description (153 characters): **Explore ICT and Smart Money Concepts lessons on PD arrays, entry models and opening ranges. Compare visual study notes, sequences and invalidation rules.**
- Tagline: Less memorising. More understanding.
- Canonical: https://learnsmc.xyz/tools/masterclass/
- Intro: 117 English words explaining audience, prerequisites, collections and the curriculum relationship.

SERP observations, consulted pages and editorial reasoning are in [masterclass-hub-serp.md](masterclass-hub-serp.md). No keyword-volume or ranking claim is made.

## Implemented behaviour

Editorial hero and a Motion Theatre-style layered preview stage; beginner link to Market Foundations; data-derived counts; search and keyboard category tabs; grid/list switch; four short FAQs. All 29 cards are present in static HTML and remain in the DOM when filtered. Each card has a real link whose text is its existing lesson title. The list is a semantic table with one genuine title anchor stretched over each whole row. The hero stage has previous/next controls across the 29 studies, a visible pause control, and motion that stops out of view or under reduced-motion preferences. It reuses the new lesson-specific SVG geometry; a moving stroke overlays the complete underlying reference so motion never removes the explanation. The stage has no lesson link card. All lesson links remain in the complete grid/table below. Hover feedback is disabled under reduced motion. Search uses one continuous wrapper focus border; the input has no competing focus outline.

Both languages retain their own canonical and reciprocal en/ur/x-default tags. The existing graph now includes a matching CollectionPage, BreadcrumbList, 29-entry ItemList and the four visible FAQ questions. Build-generated page-specific 1200×630 PNG share artwork uses a collection composition, with OG/Twitter descriptions and image alt text. No ratings, reviews or new credentials are added. Existing lesson pages already link back to the hub.

## Files changed

New: src/components/MasterclassStage.tsx, src/data/masterclassStageArt.ts (trusted local SVG geometry reused for motion), src/components/MasterclassHub.tsx, src/data/masterclassHub.ts, src/data/masterclassHubMeta.ts, src/styles/masterclass-hub.css, src/i18n/masterclass-hub-urdu.json, scripts/verify-masterclass-hub.ts and 29 illustrated SVGs under public/images/masterclass/. A separate neutral-study.svg is a future fallback only; no current lesson uses it.

Shared changes announced before editing: TradingToolsWorkbench.tsx gets a root-only branch; main.tsx loads scoped styles; prerender.ts and seo-content.ts render the same root component and its graph; searchMetadata.ts preserves the reviewed hub title; social-cards.ts supplies hub-only share artwork; urdu.ts imports translations without overriding older entries. package.json includes the new regression check. searchDescriptions.json and generated Urdu runtime catalogues carry the new copy. page-revisions.json records actual rendered-content changes.

Preserved: masterclassData.ts, theinnercircletradersMasterclasses.ts, workbenchToolRoutes.ts and MasterclassWorkbench.tsx. No original lesson data, lesson URL or category routing is rewritten. No new dependency is installed.

## Thumbnail uniqueness review

All current 29 thumbnails are unique compositions, not label swaps. They were reviewed together in a browser contact sheet, and their SVG geometry hashes are distinct after labels, titles, descriptions and styles are stripped. Each has a specific translated alt description, width 640/height 360 and an SVG source; below-fold images load lazily. Average size is about 2.7 KB before HTTP compression. No current neutral placeholder is needed. These schematics are reference illustrations, not historical market data or complete entry instructions.

| Unit | Existing lesson | Distinct composition | Unique |
|---|---|---|---|
| 01 | How Smart Money Engineers a Weekly Move | Five-column weekly profile with a continuous price path. | Yes |
| 02 | The Draw on Liquidity (DOL) Masterclass | Central price node with two opposing liquidity destinations. | Yes |
| 03 | ICT 2022 Mentorship Model Framework | Four numbered observation panels with distinct marks. | Yes |
| 04 | Change In State of Delivery (C.I.S.D) Masterclass | Opposing candle run crossed by one enlarged confirmation candle. | Yes |
| 05 | Inversion Fair Value Gap (I.F.V.G) Masterclass | Before-and-after role-reversal panes joined by an arrow. | Yes |
| 06 | ICT Silver Bullet Model Masterclass | Large clock and narrow session-study card. | Yes |
| 07 | The ICT Unicorn Model (Breaker and FVG Confluence) | Crossing reference bands and a circular overlap enlargement. | Yes |
| 08 | The Opening Range Gap (ORG) & Octant Grid | Octant ruler with paired endpoint brackets. | Yes |
| 09 | MMXM Second Stage Distribution / Reaccumulation | Two-stage terraced profile with a midpoint bridge. | Yes |
| 10 | The 5 Algorithmic Opening Ranges | Five offset horizontal session lanes. | Yes |
| 11 | ICT Propulsion Block Masterclass | Two offset block rectangles connected by a returning price path. | Yes |
| 12 | ICT Implied Fair Value Gap Masterclass | Three wick-heavy candles with midpoint brackets. | Yes |
| 13 | ICT Rejection Block Masterclass | Enlarged wick and body-close measurement with side bracket. | Yes |
| 14 | ICT Mitigation Block Masterclass | Failure-swing arch, lower break and return loop. | Yes |
| 15 | ICT Standard Deviations for Algorithmic Projections | Small base ruler linked to a descending projection ladder. | Yes |
| 16 | The New York Session: Continuation vs Reversal Framework | Three-level decision tree with two equal study branches. | Yes |
| 17 | The 1st Presentation FVG Model | Time gate followed by an ordered pair of gap candidates. | Yes |
| 18 | ICT Optimal Trade Entry (OTE) Model | Diagonal impulse and retracement across a three-level band. | Yes |
| 19 | The ICT 3-Day Rule Masterclass | Three calendar sheets enclosed by a rolling-window brace. | Yes |
| 20 | Smart Money Technique (SMT) Masterclass | Aligned dual-market comparison with a vertical correspondence guide. | Yes |
| 21 | ICT Venom Model: The 2025 Opening-Session Example | Shaded pre-open box with a 09:30 boundary and later excursion. | Yes |
| 22 | Reaper FVG: A Sourced Nested-Gap Variant | Nested-zone zoom with three vertically stacked event markers. | Yes |
| 23 | Suspension Block: Body Gaps and Contract Context | Paired enlarged bodies, shared wick area and circular body-gap inset. | Yes |
| 24 | RDRB: A Later Balanced-Range Visit | Wide balanced band crossed by two separated return arcs. | Yes |
| 25 | Candle Range Theory (CRT) Strategy Masterclass | Oversized anchor candle beside two smaller range-test candles. | Yes |
| 26 | Sick Sister: Contextual Relative Performance | Three-market small multiples with ranked swing markers. | Yes |
| 27 | The ICT Double Purge Masterclass | Two-sided range excursion with numbered high and low crossings. | Yes |
| 28 | The ICT Hangman PD Array Masterclass | Wick-focused plate with midpoint magnification and a separate response inset. | Yes |
| 29 | The 8 Institutional Macro Windows Masterclass | Full-width session ruler with eight alternating window blocks. | Yes |

## Verification and limits

Production build and TypeScript lint passed. The SEO suite passed 10,936 checks; the crawl checked 787 unique pages. Both English and Urdu static HTML contain all 29 genuine lesson card links and 29 table rows. Matching ItemList entries, all 29 lesson backlinks per language, canonicals, reciprocal language annotations, social metadata and the SVG/source copies passed the regression checks. Only the two root collection pages changed editorial fingerprints; their evidenced lastmod is 2026-10-28.

Real browser checks covered desktop at 1280×900 and mobile at 390×844, both themes, single-column cards, wrapped filters, semantic mobile table, search, grid/list and category filtering, keyboard arrows and the slash shortcut. Urdu has lang=ur and dir=rtl, 29 cards, no horizontal overflow and correct RTL arrow behaviour. Mobile search is 46px high, view controls 44px and category tabs at least 48px. Body text/accent contrast was measured above 4.5:1 for the hub in both themes. This is scoped verification, not a whole-site accessibility certification.

The local hero CTA refreshes the existing Lenis measurements and jumps to the catalogue without an animation delay; the native fallback also respects reduced motion. Its real href remains available without JavaScript. No shared scrolling hook was modified.

Screenshots in outputs/masterclass-hub/: desktop-light.png, desktop-dark.png, mobile-light.png, mobile-dark.png, mobile-grid.png and urdu-mobile.png. These are local preview evidence, not a live deployment. These checks do not establish Google indexing, rankings, a trading edge or FAQ rich-result eligibility. No Lighthouse or field Core Web Vitals measurement has been performed.

Build limitation: Vite still reports pre-existing large shared/vendor/translation chunks (over 800 KB). This task adds no dependency; bundle splitting of unrelated sections is outside this hub redesign. Lighthouse, field Core Web Vitals and live deployment verification were not run.

## Follow-up: search, linked rows and Motion Theatre hero

The collection search now has one continuous focus border in both themes; browser computed styles confirm no input outline or input shadow. All 29 semantic table rows have one genuine title link whose hit area covers the row. Clicking the first row's unit-number cell opened the correct weekly-move lesson in the live local browser.

The hero now uses the original Motion Theatre's layered-card composition and previous/next controls across all 29 lessons. Its SVG geometry comes from the new unique thumbnails, with an animated overlay on a fully visible reference, plus restrained emphasis and card depth. A visible pause button freezes the animation; off-screen and reduced-motion states stop it. The stage itself has no lesson link card. The existing full grid and table remain crawlable. English chart annotations are explicitly marked lang=en/translate=no, matching the thumbnail artwork; stage labels, controls and accessible descriptions are localized in Urdu.

Browser checks include 1280px desktop and 390px mobile widths, light/dark search focus, full-row navigation, stage navigation, animation pause, Urdu controls and RTL keyboard direction. Mobile stage buttons measure 44×44px; no horizontal overflow was present. New screenshots: motion-stage-desktop.png, motion-stage-mobile.png, motion-stage-mobile-detail.png, search-single-focus.png, search-mobile-dark.png and linked-list.png under outputs/masterclass-hub/.

Additional new files: scripts/generate-masterclass-stage-art.ts, src/data/masterclassStageArt.ts and src/components/MasterclassStage.tsx. Regenerate stage geometry with npx tsx scripts/generate-masterclass-stage-art.ts when source illustrations change. No external assets or new dependencies were added.

Workbench root follow-up: the dark-theme .study-workbench background now uses the existing --color-canvas token instead of a separate #111214 fill. This makes its container match the surrounding page; the light-theme rule is unchanged. No content or URL changes were needed.
