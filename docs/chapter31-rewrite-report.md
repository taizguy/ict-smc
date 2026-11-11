# Chapter 31 — Mitigation Blocks and Rejection Blocks

Status: implemented locally; full production verification passed. Release publication is recorded by the associated GitHub pull request.

## Source fidelity

Read the supplied 35-page PDF. Part 2 is the learner article; Parts 1 and 3 are research/implementation instructions. Preserved its 20 sections, 20 tables, six takeaways, 24 glossary entries and 20 FAQ answers. Removed only PDF extraction artifacts (null table cells, line-wrap hyphens and lost pseudocode indentation). No research labels, authoring prompts or duplicate myths prose are published. Source-copy fixture: `docs/chapter31-source-copy.json`.

The user approved distinguishing the two repeated worked-example H3s as “Mitigation block worked example (invented prices, bearish)” and “Rejection block worked example (invented prices, bearish)”, with matching Urdu. All content below those headings is unchanged. This exception is recorded in the source fixture.

The user approved separate mitigation and rejection formations on the shared chart, rather than the contradictory same-final-push visual instruction. All prices are illustrative, invented teaching data. Nine original schematic figures cover the block family, mitigation formation, six checks, sweep comparison, wick anatomy, rejection outcomes, wick calculator, separate formations and block-selection questions. Captions/text remain available without motion or JavaScript. Three applied multiple-choice questions use the document's arithmetic and distinctions.

## Search and references

Queries consulted: “mitigation block rejection block ICT breaker difference wick 50 percent”; official-channel searches for Month 04 Mitigation Blocks and ICT Rejection Block; Investor.gov stop-order search. Competitor pages checked: FundedEnigma (What Is a Mitigation Block in ICT Trading?), ICTKillzone (ICT Rejection Block — Trading the Wick, Not the Body), Orion indicator library. Definition-first explanations, construction variants and mitigation-versus-breaker questions informed presentation, not changes to supplied article wording. No search-volume or PAA-box claims are made.

Primary references: ICT Month 04 Mitigation Blocks (https://www.youtube.com/watch?v=FOUzW0QmsfI), ICT Month 04 ICT Rejection Block (https://www.youtube.com/watch?v=oALYX0HCSYw), SEC Investor.gov Stop Order (https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order). Video identity/title/channel were checked; this task did not review entire recordings or verify timestamps. No historical example or performance claim is attributed to them. SEC scope is stock stop-market orders.

## Metadata and release behaviour

H1: Mitigation Blocks and Rejection Blocks.
Title: Mitigation Blocks and Rejection Blocks: ICT Guide | LearnSMC.
Description: Learn what mitigation blocks and rejection blocks are, how they differ from breaker and order blocks, how to mark them, and where each one fails.
Native Urdu title, descriptions, complete article, visual controls, quiz and references are supplied. Review CSV: `docs/chapter31-bilingual-review.csv` (643 strings).

Permanent ID 1031 and existing slug are preserved; display number 31. Status changed from in-progress to published. Expected directory counts: 58 published / 39 in progress / 97 total; 116 English/Urdu lesson sitemap entries, 741 total indexable URLs. Original publication baseline: 15 October 2026, supplied by user; reviewed/updated: 11 November 2026. One risk notice. No Official ICT account block. Main content precedes the heavy library sidebar. Definitions/formula use scoped semantic descriptions; FAQs are native exclusive details/summary, not click-injected answers. Body text is 16px, line-height 1.9; FAQ answers 16px, line-height 1.85.

## Implementation files

New: mitigationDocument.json, mitigationDocument.ts, mitigationDocumentUrdu.json, mitigationTranslations.ts; MitigationDocumentContent.tsx, MitigationVisual.tsx; mitigation-document.css; mitigation-localized-document.ts; verify-mitigation-document.ts; source fixture and bilingual review CSV.
Shared hooks: chapter data/status/quizzes/diagrams/reviews, ChapterRoom, documentLessons, App/footer risk suppression, SEO content/social cards, prerender, Urdu renderer/catalogue generation/splitting, main stylesheet import, package verification chain and dynamic count assertion. Existing unrelated drafts were preserved.

The claims scanner now recognizes the exact break-even probability identity only when accompanied by its costs caveat, and still rejects performance promises. Regression fixtures cover this contextual distinction; no page-wide allowlist was added.

## Verification evidence

- `outputs/chapter31/typecheck-final.log`
- `outputs/chapter31/build-release-check.log`
- `outputs/chapter31/static-verification.json`
- `outputs/chapter31/` browser evidence and screenshots

Production verification: TypeScript passed; 11,012 SEO checks passed; 847-page internal crawl passed; source-fidelity, native Urdu, existing Chapter 01/FVG regressions, routing, claims and unchanged bundle budget passed. Static/runtime paragraph, heading and table parity passed for 113 blocks in each language. External Google rich-result validation, field Core Web Vitals and assistive-technology testing are not claimed. Human Urdu review remains necessary. Preview: http://127.0.0.1:4256/learn/mitigation-and-rejection-blocks/

## Translation isolation and unchanged performance budget

Regression testing caught a collision with the existing FVG translation of “Practice task”. New Chapter 31 translations now fill missing global keys only; differing terminology is in a route-only overlay. Static Chapter 31 uses the same scoped overlay. Existing lesson translations are preserved. The Urdu directory fallback previously duplicated common catalogue data; common strings are now loaded once, and the generator asserts exact reconstruction of the original catalogue before writing the route-only overlay. No translation was removed. Shared file announced before editing: `src/i18n/loadCatalog.ts`.

The unchanged bundle budget passes: total JS 10,241,380 bytes (limit 10,621,000); initial JS 12,330 bytes / gzip 5,198; largest chunk 975,741 bytes. No budget override or new dependency. These are build bytes, not field performance measurements.

## Browser checks and revision evidence

At 1440px and 390px, EN/UR light and dark views had no document horizontal overflow. Verified 16px body and FAQ text, keyboard-operated animation Play/Pause/Step, valid/invalid OHLC inputs, bearish midpoint 98.60 and bullish midpoint 97.90, exclusive keyboard-operated FAQs, three applied quiz answers scoring 3/3, and mobile chapter drawer Escape dismissal. With scripts blocked by CSP, EN/UR main content stayed visible, all 20 tables and 20 FAQs existed, and the native EN FAQ still opened and closed exclusively. Formula/code text is deliberately LTR.

Evidence: `outputs/chapter31/runtime-parity.json`, `static-verification.json`, `browser-checks.json`, theme screenshots and script-free screenshots. The bilingual review CSV includes article, controls, metadata, sources and quiz strings. Human Urdu review is still required; a browser check is not an assistive-technology audit.

Only six changed route fingerprints were recorded: Chapter 31, curriculum directory and Price Delivery hub, each in EN/UR. Evidence: `outputs/chapter31/revision-evidence.json`. Sitemap lastmod is 2026-11-11 for these verified changed routes. Unrelated stale/unknown fingerprints were not stamped. Post-ledger SEO and chapter checks passed.

## Clean release verification — 12 November 2026

Prepared on main dc26f79864cc18acf4fa67da7a0573d95e4dc9a1, applying only Chapter 31 changes; unrelated working-folder drafts excluded. TypeScript, full production build/prerender, 11,012 SEO checks, 847-page crawl, chapter/source/language regressions, claims gate and unchanged bundle budget passed. Recomputed the six route fingerprints against this exact release snapshot and reran SEO/chapter checks. Tracked evidence: `docs/chapter31-release-verification.json`. Local full log: `outputs/chapter31/release-clean-build-final.log`. Release bundle: total JS 10,152,190 bytes; initial JS 11,739 bytes / gzip 5,103; largest chunk 959,230 bytes.
