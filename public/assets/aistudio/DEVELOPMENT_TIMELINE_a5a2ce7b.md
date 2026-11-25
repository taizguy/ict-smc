# Development timeline
Snapshot: **15 November 2026, Asia/Karachi**. Evidence labels: **V** = inspected current source/state; **H** = dated historical report/test; **C** = accessible conversation decision/outcome; **P** = proposed, not approved; **U** = unknown. Source keys resolve in [SOURCES.md](SOURCES.md). Do not treat old chat approvals as standing release authorization. [A01](SOURCES.md#a01) [C03](SOURCES.md#c03) [S01](SOURCES.md#s01)


This is a continuity narrative derived from available commits, project reports and visible conversation messages. It is not a fabricated full transcript. Original available user/assistant message text is exported separately in the delivered migration package. Dates below are commit/report dates unless marked as conversation-only; user-confirmed chapter publication dates are a separate concept. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)

## September foundations (commit evidence)

- `5061b1c` / `7ab6702` (2 September 2026): initial repository and ICT & SMC Academy application. [S04](SOURCES.md#s04)
- `18c1905` (3 September): light theme and opening screen; `f297c23`: Charter models/concepts. [S04](SOURCES.md#s04)
- `dde4ad3` / `2287792` (4 September): expanded educational content and Masood Academy. [S04](SOURCES.md#s04)
- `b3395c6` (7 September): visual/architecture overhaul; later smooth scrolling and diagram expansion. [S04](SOURCES.md#s04)

These dates establish repository activity, not proof that each lesson was public then. The user later confirmed **15 October 2026** as the chapter publication baseline. [S04](SOURCES.md#s04)

## October: visual library, bilingual curriculum and SEO operations

Available conversation records show repeated iterations on navigation, backgrounds/themes, layout, accessibility, chapter content and technical SEO. The user wanted a site that explains concepts in depth through original examples and visuals rather than narrating source videos. ICT playlists were research material, not permission to copy videos/transcripts. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)

- Price-delivery topics (FVG, inverse FVG, order blocks, breaker blocks) received content/search packaging, examples, comparisons, FAQs, breadcrumbs and contextual links. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)
- 2025 and 2026 mentorship sections expanded beyond the former few sparse subchapters, with native Urdu, metadata and interactive study material. Google query terms, titles/H1s and language-specific snippets were revised after feedback; translations in search results were not treated as proof of a hreflang bug. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)
- Knowledge graph evolved from dropdown/text and pipeline sequence experiments into a spatial/tree concept map. Earlier routes were consolidated under an approved migration; see graph consolidation docs, not a new guess about redirects. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)
- Workbench & Lab design studies led to an editorial orientation plus dense tool selection and PO3 illustration, later grid/list view. Temporary dark-color experiments were explicitly rejected/undone. The current approved state must be read from code, not recreated from those tests. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)
- Masterclass hub adopted the editorial grid, 29 distinct topic thumbnails, real initial-HTML links, grid/list, search/filter, real counts and local theme support. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)
- Author/contact/legal/advertising and crawlability work accompanied AdSense/GSC concerns. No approval or ranking was guaranteed. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)

## 28–29 October: technical audit batches

The user imposed batch-by-batch development, feature branches, evidence logs, source/runtime parity and no uncontrolled redirects. Core decisions included retaining staged `createRoot`, not hiding essential copy behind JavaScript and not removing startup visibility gates without route parity. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)

1. Batch 1: genuine Urdu snippet parity, catalog-derived Workbench facts/counts, Market Alchemy Article image. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)
2. Batch 2: route-family content-model/parity work for Chart Lab, FVG glossary, OTE calculator and Masood lectures; dead fragments addressed; static/runtime essential-content checks. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)
3. Batch 3: individually reviewed 19 near-duplicate tool routes, distinct reading purposes and examples. Duplicate runtime functionality was reported; consolidation stayed an owner decision. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)
4. Batch 4: priority H1/metadata improvements, 21 unit-prefixed English descriptions, unique takeaways for 118 lecture descriptions and native Urdu, routing/query-state checks, docs and measured payload work. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)
5. Urdu corrections followed review: patience wording, standard sweep/swing/bias/liquidity terms, volume imbalance, stop, transliterated Seek & Destroy, duplicate punctuation/Study and glossary-vs-masterclass ICT 2022 intent. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)

PR #32 merged (`c28c2f0`); subsequent conversation requested verifying/merging earlier batch work too. The audit log retains per-batch evidence. Do not assume every later GSC exclusion disappeared because these batches passed. [S04](SOURCES.md#s04) [C01](SOURCES.md#c01) [S50](SOURCES.md#s50) [S51](SOURCES.md#s51) [S54](SOURCES.md#s54)

## 29 October–1 November: Masterclass content and Field Journal

The user chose a Field Journal lesson layout with trust information, outcomes, inline figures, separate worked/failed examples, risk, FAQs, sources/corrections and adjacent navigation. Some draft rewrites became too much like curriculum; the user rejected that content direction and asked to retain the old Masterclass content inside the new shell. [S28](SOURCES.md#s28) [S54](SOURCES.md#s54) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)

- `cb0dc59`: restore original ICT 2022 content in journal layout. [S28](SOURCES.md#s28) [S54](SOURCES.md#s54) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- `3e12270` / PR #33 (`e8c384c`): catalogue-preserving layout across previews. [S28](SOURCES.md#s28) [S54](SOURCES.md#s54) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- PR #34 (`e8e2e84`): bilingual release after parity checks. [S28](SOURCES.md#s28) [S54](SOURCES.md#s54) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- PR #35 (`c4eb341`): later lesson styling/interactions and search-metadata review. [S28](SOURCES.md#s28) [S54](SOURCES.md#s54) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- Approved details included a lightly tinted learning-payoff card, separate gradient step cards, side-by-side mistakes/invalidation/risk, related links at right, exclusive animated FAQs and a progressively revealed order-of-operations section with static content intact. [S28](SOURCES.md#s28) [S54](SOURCES.md#s54) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- PR #36 (`2894527`): Workbench defaults to grid. PR #37 (`9183dbe`): Academy tribute restored and fixed-tab modal navigation. [S28](SOURCES.md#s28) [S54](SOURCES.md#s54) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)

Later broad Masterclass redesign experiments were rejected. A new account must not revive rejected alternatives simply because their files or screenshots exist. [S28](SOURCES.md#s28) [S54](SOURCES.md#s54) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)

## 1–3 November: Chart Lab and glossary differentiation

The user discovered mismatches between study briefs and actual shared charts, and cases that were shifted copies. Six Chart Lab routes were rebuilt into genuinely differentiated authored studies. [S27](SOURCES.md#s27) [S44](SOURCES.md#s44) [S62](SOURCES.md#s62) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)

- Silver Bullet was built first for review, then the other studies. Cases varied gap/sweep/retest depth, timing, failed attempts and candle count. [S27](SOURCES.md#s27) [S44](SOURCES.md#s44) [S62](SOURCES.md#s62) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- Shape-based normalization/uniqueness guard rejects copied/noise/padding variants; UTC opens and derived closes prevent off-by-one errors. Primary-source passage confidence/limits were documented before attribution. [S27](SOURCES.md#s27) [S44](SOURCES.md#s44) [S62](SOURCES.md#s62) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- Six named routes now have 29 authored cases; earlier audit statements that all Chart Lab routes load the same generic exercise are historical. [S27](SOURCES.md#s27) [S44](SOURCES.md#s44) [S62](SOURCES.md#s62) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- PR #38 (`7979d2c`) merged the route-specific studies and hub; PR #39 (`f9489dc`) merged glossary integrity/collection work. [S27](SOURCES.md#s27) [S44](SOURCES.md#s44) [S62](SOURCES.md#s62) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- Glossary iterations removed the selected-term pane from the hub, added proper catalogue browsing, contextual links and related/previous/next navigation, removed Source Fidelity from concept UI, and repaired legacy BOS references/canonical destinations. [S27](SOURCES.md#s27) [S44](SOURCES.md#s44) [S62](SOURCES.md#s62) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)
- PR #40 (`0051723`): Masterclass category collections refreshed instead of leaving stale UI on category routes. [S27](SOURCES.md#s27) [S44](SOURCES.md#s44) [S62](SOURCES.md#s62) [S04](SOURCES.md#s04) [C01](SOURCES.md#c01)

## 4–5 November: practice loop, performance and truthful claims

- `b03670f`: bilingual shared case registry and coherent four-tool hubs. [S23](SOURCES.md#s23) [S26](SOURCES.md#s26) [S45](SOURCES.md#s45) [S04](SOURCES.md#s04)
- `bd1bd8b`, `36e58be`: deferred enhancement and case data, preserved reading HTML, measured budgets. [S23](SOURCES.md#s23) [S26](SOURCES.md#s26) [S45](SOURCES.md#s45) [S04](SOURCES.md#s04)
- Delivery and simulator module/brief pages were aligned after the user reported old UI and duplicate language controls (`3e67860`, `cef6d0c`). [S23](SOURCES.md#s23) [S26](SOURCES.md#s26) [S45](SOURCES.md#s45) [S04](SOURCES.md#s04)
- Legacy labels/promises were removed from title/H1/social/catalog output; calculators/metrics/fills/methodology got explicit assumptions. [S23](SOURCES.md#s23) [S26](SOURCES.md#s26) [S45](SOURCES.md#s45) [S04](SOURCES.md#s04)
- A strict global claims scan initially blocked release because protected copy elsewhere still contained promises. The owner first prohibited unrelated edits, then later authorized narrow corrections. Fourteen source statements were corrected in EN/UR, not blanket-exempted (`679620c`). [S23](SOURCES.md#s23) [S26](SOURCES.md#s26) [S45](SOURCES.md#s45) [S04](SOURCES.md#s04)
- PR #41 (`b5fe696`) merged the loop/performance work. Older reports saying 26 findings/17 files or expected claims failure were superseded by `docs/claims-release-resolution.md`. [S23](SOURCES.md#s23) [S26](SOURCES.md#s26) [S45](SOURCES.md#s45) [S04](SOURCES.md#s04)

Historical compressed-preview Lighthouse medians, 44-route parity/script-free checks and 32 before/after captures are in the performance report/evidence. They are not current site-wide field CWV results. [S23](SOURCES.md#s23) [S26](SOURCES.md#s26) [S45](SOURCES.md#s45) [S04](SOURCES.md#s04)

## 5–10 November: reset and 97-chapter course map

The user supplied an ICT 2022 archive and initially requested a source-mapped rebuild, then explicitly asked to ignore and undo that attempt and start fresh. It is not the current content mandate. [S29](SOURCES.md#s29) [S30](SOURCES.md#s30) [C01](SOURCES.md#c01) [C02](SOURCES.md#c02) [S04](SOURCES.md#s04)

The 97-chapter map replaced the older 66-chapter organization. User approval included content-preserving merges in Phase 1; established IDs/slugs were preserved or migrated only through the approved crosswalk. Phase 1b introduced 40 placeholders beside 57 published lessons, in plan order. New permanent IDs use 1000 + map position where allocated; display numbering is 01–97 and does not replace permanent identity. [S29](SOURCES.md#s29) [S30](SOURCES.md#s30) [C01](SOURCES.md#c01) [C02](SOURCES.md#c02) [S04](SOURCES.md#s04)

Placeholder status drives completion eligibility, noindex/schema/sitemap exclusions and future publication. The old 57/40 and 114 lesson URLs are correct for that checkpoint, not the latest snapshot. [S29](SOURCES.md#s29) [S30](SOURCES.md#s30) [C01](SOURCES.md#c01) [C02](SOURCES.md#c02) [S04](SOURCES.md#s04)

## 10–14 November: document-faithful chapter rebuilding

1. Chapter 01, What Actually Moves Price? User supplied a PDF; an initial condensed/reworded implementation was rejected. The correction preserved wording/headings/list/table order, kept verified references and fixed FAQ/typography. PR #42 (`9e5d525`). This feedback created the mandatory ask-before-copy-change policy. [S56](SOURCES.md#s56) [S57](SOURCES.md#s57) [S58](SOURCES.md#s58) [S59](SOURCES.md#s59) [S39](SOURCES.md#s39) [S22](SOURCES.md#s22) [S31](SOURCES.md#s31) [C01](SOURCES.md#c01) [S04](SOURCES.md#s04)
2. Chapter 26 FVG: supplied wording preserved even where accuracy concerns were raised; references retained/verified. User requested bullet takeaways, light/dark illustrations, removal of duplicate myths and unwanted “next reads”. Merge `2d49f52`. [S56](SOURCES.md#s56) [S57](SOURCES.md#s57) [S58](SOURCES.md#s58) [S59](SOURCES.md#s59) [S39](SOURCES.md#s39) [S22](SOURCES.md#s22) [S31](SOURCES.md#s31) [C01](SOURCES.md#c01) [S04](SOURCES.md#s04)
3. Semantic cleanup: main before rails, scoped extraction, native FAQ details/summary, minimal Person schema and body/FAQ tokens. PR #44 (`dc26f79`). [S56](SOURCES.md#s56) [S57](SOURCES.md#s57) [S58](SOURCES.md#s58) [S59](SOURCES.md#s59) [S39](SOURCES.md#s39) [S22](SOURCES.md#s22) [S31](SOURCES.md#s31) [C01](SOURCES.md#c01) [S04](SOURCES.md#s04)
4. Chapter 31 mitigation/rejection: supplied document, separately correct formations, approved specific duplicate-subheading changes and verified references. PR #45 (`40e1da9`). [S56](SOURCES.md#s56) [S57](SOURCES.md#s57) [S58](SOURCES.md#s58) [S59](SOURCES.md#s59) [S39](SOURCES.md#s39) [S22](SOURCES.md#s22) [S31](SOURCES.md#s31) [C01](SOURCES.md#c01) [S04](SOURCES.md#s04)
5. Chapter 04 liquidity: approved typo/stop-market/depth-example corrections, verified sources; fixed distorted SVG text, five-dimensions layout and checklist spacing. Merge `ced8e7a`. [S56](SOURCES.md#s56) [S57](SOURCES.md#s57) [S58](SOURCES.md#s58) [S59](SOURCES.md#s59) [S39](SOURCES.md#s39) [S22](SOURCES.md#s22) [S31](SOURCES.md#s31) [C01](SOURCES.md#c01) [S04](SOURCES.md#s04)
6. Across curriculum, removed duplicate hero panels for interactive diagram/key terms/summary briefing; retain textbook and practice/quiz only. Merge `56f7333`. [S56](SOURCES.md#s56) [S57](SOURCES.md#s57) [S58](SOURCES.md#s58) [S59](SOURCES.md#s59) [S39](SOURCES.md#s39) [S22](SOURCES.md#s22) [S31](SOURCES.md#s31) [C01](SOURCES.md#c01) [S04](SOURCES.md#s04)
7. Chapters 09/10/12/13: researched/sourced, bilingual, topic-specific visuals and preserved shell, with arithmetic/timing/parity/keyboard/script-free checks. PR #48 (`0947b8b`). Permanent IDs for display 09/10/12/13 are 7/1010/9/10. [S56](SOURCES.md#s56) [S57](SOURCES.md#s57) [S58](SOURCES.md#s58) [S59](SOURCES.md#s59) [S39](SOURCES.md#s39) [S22](SOURCES.md#s22) [S31](SOURCES.md#s31) [C01](SOURCES.md#c01) [S04](SOURCES.md#s04)
8. Chapter 64 Silver Bullet: original research plus authored outcomes, initially rejected generic/instrument-panel visual treatments; approved physical 3D candle Motion Study 02, Colour-block Atlas static art and iOS Clarity reading treatment. All are adaptable future standards, not a bulk redesign permission. PR #49 merged as `7c4ada950a6c3029ab59786c8d4e74410f0a8ef8` on 14 November (GitHub verified). [S56](SOURCES.md#s56) [S57](SOURCES.md#s57) [S58](SOURCES.md#s58) [S59](SOURCES.md#s59) [S39](SOURCES.md#s39) [S22](SOURCES.md#s22) [S31](SOURCES.md#s31) [C01](SOURCES.md#c01) [S04](SOURCES.md#s04)

## 15 November: standalone homepage experiment — PAUSED

The user supplied an Apple-style full-page image/spec. A complete local HTML/CSS/JS preview was built under ignored `outputs/home-apple/`. User corrections restored exact reference sections, original navigation/footer links, site-wide search, theme choice, a four-column/five-links course preview, and terminology typography (ultimately 25px/300). [P01](SOURCES.md#p01) [P02](SOURCES.md#p02) [C01](SOURCES.md#c01)

Several mistakes were explicitly identified and fixed: wrong candle colors, curriculum-only search instead of global search, an oversized square input focus ring, oversized/heavy terminology headings, altered reference headings/copy, misaligned ribbon, excessive course rows and mismatched footer. The prototype README preserves the iteration sequence; earlier screenshots do not all represent the final version. [P01](SOURCES.md#p01) [P02](SOURCES.md#p02) [C01](SOURCES.md#c01)

The final user instruction was to **keep it safe and not publish**. It remains outside application source. Literal comparison/terminology/concept claims restored for visual fidelity have not passed production editorial review. Migration preservation is not approval to integrate or ship them. [P01](SOURCES.md#p01) [P02](SOURCES.md#p02) [C01](SOURCES.md#c01)

## Earlier eight-document handoff (historical)

Eight requested documents and a separate migration archive preserve the checkpoint, code inventory, git-log evidence, selected verification/design artifacts and available visible conversation messages. No application behaviour changed. No inaccessible conversations, missing source-video reviews, deployments, rankings or test runs have been invented. [A01](SOURCES.md#a01) [C03](SOURCES.md#c03)
## Additional actually accessible project chat
On 30 October the related social task reported stopping on a 404 without drafts/posts; on 5 November the mentorship expansion was rejected; on 12 November the sliding homepage tab bar was reverted. These are source-conversation outcomes, not new production verification. [C02](SOURCES.md#c02) [C01](SOURCES.md#c01)
This second package adds explicit source links, private exports from the verified related chat and a new source/inventory register. It does not modify app functionality or claim access to other accounts. [C03](SOURCES.md#c03) [A01](SOURCES.md#a01) [P04](SOURCES.md#p04)
