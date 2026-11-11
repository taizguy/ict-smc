# Curriculum Phase 1b — placeholder lessons

Implemented locally on 10 November 2026. Nothing pushed, merged or deployed.

## Result

- 97 directory entries in course-map order: 57 published lessons, 40 in-progress placeholders; the UI and ten hub introductions remain unchanged.
- Existing permanent IDs, slugs, titles, descriptions and lesson bodies are preserved. Display numbers now equal the map positions, 01–97. The original eight content-preserving merge groups remain intact.
- Each placeholder has the existing Reading Room hero/layout, site header/footer, a part-hub link and previous/next links. Its content area contains only “We're working on this chapter.” / “ہم اس باب پر کام کر رہے ہیں۔”. No lesson widgets, sources, completion button or JSON-LD are added.
- All forty proposed slugs were checked against the PDF extraction. New permanent IDs are allocated as 1000 + map position (1006–1096, with gaps); these are immutable identifiers, not display numbers. This avoids collisions with existing IDs and retired aliases.
- The PDF table provides a title, keyword, slug and status, but no separate description column. The short directory/meta descriptions therefore restate only the mapped topic scope; they are not lesson copy or invented claims. The H1 uses the mapped title. A few title tags use concise variants to retain the existing 60-character budget; every variant is listed in the review CSV.
- No new lesson bodies or competitor-derived content were written. The map's keywords are planned intent labels, not search-volume claims. Full SERP/editorial research remains necessary when each actual chapter is authored.

## Publication, progress and search

`src/data/curriculumPhase1.json` is the single publication-status source. Once real lesson content is authored with the same permanent ID, change only `status` from `in-progress` to `published` and rebuild. Routing, directory labels, completion eligibility, indexability, sitemap inclusion, hreflang and Course membership derive from that status. There is no second per-route publishing list.

In-progress pages have `noindex, follow`, a language-specific self-canonical, no schema and no sitemap entry. All emitted sitemap files and schema blocks are scanned for placeholder references. Published pages retain reciprocal en/ur/x-default annotations. Noindex placeholders are not advertised as indexable language alternatives.

Published lesson counts remain 57, including progress denominators, global available-lesson counts and the learning-profile roadmap. A completion write for a placeholder is rejected without changing stored progress. Existing browser storage is not cleared. Directory/hub counts include all planned entries. Search lists use plan numbers and explicitly label in-progress results.

Mentorship reading guides retain their own reading-step order and now show the plan chapter number in each lesson link. The standard lesson previous/next navigation follows the 97-position plan; an explicitly selected mentorship path retains its path navigation.

## Files changed in this phase

- Model: `src/data/curriculumPhase1.json`, `curriculumPhase1.ts`, `chaptersData.ts`, `src/types.ts`.
- Reader and navigation: `CurriculumPlaceholder.tsx` (new), `ChapterRoom.tsx`, `CurriculumView.tsx`, `ReadingRoomLayout.tsx`, `MentorshipsView.tsx`, `SearchModal.tsx`, scoped `reading-room.css` status/layout rules.
- Progress/count consumers: `src/App.tsx`, `src/utils/academyProgress.ts`, `catalogCounts.ts`, `searchMetadata.ts`, `AcademyWorldMap.tsx`, `TextbookReader.tsx`, `NotFoundView.tsx`, `MasteryDashboard.tsx`, and the placeholder guard in `src/data/chapters/chapterQuizzes.ts`.
- Static/generation: `scripts/seo-content.ts`, `prerender.ts`, `tools-content.ts`, `generate-catalog.ts`, `generate-urdu-runtime.ts` and generated catalog/Urdu runtime files.
- Guards: `scripts/verify-curriculum-phase1.ts`, `verify-curriculum-phase1-static.ts`, `validate-seo.ts`, `verify-crawl.ts`, `verify-2026-edition.ts`.
- Review/evidence: updated Phase 1 crosswalk/bilingual CSV; new `docs/curriculum-phase1b-placeholder-review.csv`, this report and scoped revision evidence.

## Evidence

The completed production verification reports 10,986 SEO checks, an 847-page internal crawl, 216 chapter/hub static documents and 739 sitemap URLs (114 lesson URLs). TypeScript passed. Startup JS is 12,330 bytes raw / 5,195 bytes gzip; existing budget limits were not changed. The ledger records 140 changed published/hub/guide fingerprints, with zero placeholder or unrelated entries stamped. See outputs/curriculum-phase1b/summary.json.

- `outputs/curriculum-phase1b/final-build.log`: final full production build, prerender and integrated SEO/routing/claims/bundle gates.
- `outputs/curriculum-phase1b/typecheck.log`: TypeScript.
- `outputs/curriculum-phase1b/state-verification.json`: existing metadata/IDs/slugs preserved, status transition and rejected placeholder completion.
- `outputs/curriculum-phase1b/new-map-rows.json`: forty source-map rows; the extraction/verification script checks each proposed slug against the supplied map.
- `outputs/curriculum-rollout/static-verification.json`: 216 EN/UR chapter/hub documents; placeholders excluded from every emitted schema and sitemap; 97 numbered directory links, 40 labels, previous/next navigation and 114 indexable lesson URLs.
- `outputs/curriculum-phase1b/seo.log`, `claims.log`, `bundle.log`: targeted final regression runs in addition to the full build pipeline. Claims policy and budget limits are unchanged.
- `outputs/curriculum-phase1b/browser.json` and eight `{en,ur}-{1440,390}-{light,dark}.png` screenshots: exact notice, one H1, no schema, correct canonical/robots, no completion button, previous/next links and no horizontal overflow after runtime startup. The site search label and 97 directory entries were also checked interactively.
- `outputs/curriculum-phase1b/revisions.json`: changed published/hub/reading-guide fingerprints only, with placeholders excluded from the editorial ledger update.

The two earlier failed build attempts identified untranslated composed reading-guide labels and test assumptions that all directory entries were indexable. These were fixed; no translation, claims or bundle checks were disabled.

## Limits and preview

Native Urdu was authored and machine checks passed; human Urdu and assistive-technology review remain unverified. There was no deployment, GSC submission or live indexing validation. `noindex` is an instruction to crawlers, not a promise about the timing of Google's response. No ranking or future lesson-quality claims are made.

Preview: http://127.0.0.1:4249/learn/candlestick-basics-for-smc/ and its /ur/ mirror. Directory: http://127.0.0.1:4249/curriculum/ .
