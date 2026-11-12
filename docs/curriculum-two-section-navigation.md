# Curriculum: two-section chapter navigation

Implemented locally on branch `feat/curriculum-two-sections`,12 November2026. Not pushed, merged or deployed.

## Change

The shared ChapterRoom template now exposes only **1. Textbook Sections** and **2. Practice & Quiz**, in English and Urdu. Removed the standalone interactive-diagram, key-terms and summary-briefing panels, their scene-state options, component imports used only by those panels, and the obsolete “View Interactive Diagram” / “Study Key Terms” actions. These panels are absent from prerendered HTML as well as the interactive runtime; they are not merely hidden.

The textbook's own figures, definitions, glossary tables, takeaways and original document text remain unchanged. Quiz logic, notes, progress, source references, previous/next navigation, URLs, metadata and indexability are retained. The39 unwritten placeholders remain notice-only, without empty quiz tabs; newly published chapters automatically use the same two-section template. No lastmod or editorial-review dates stamped.

## Checks

- TypeScript passed: `outputs/chapter-two-tabs/typecheck.log`.
- Production Vite build and prerender completed: `outputs/chapter-two-tabs/build.log`. The first verification stopped on an obsolete assertion requiring a removed standalone diagram. Updated it to assert panel absence; verification resumed against the same generated production output.
- Full SEO suite after that update passed:11,012 checks;847-page crawl; source-copy checks for all four rebuilt chapters; metadata/schema/hreflang/sitemap checks; claims and bundle gates. Log:`outputs/chapter-two-tabs/verification.log`.
- New build-wired regression guard:`scripts/verify-chapter-sections.ts`. Checks all194 EN/UR lesson documents:116 published pages have exactly two tabs,78 placeholder pages have no empty widgets, no removed panels/actions anywhere. Evidence:`outputs/chapter-two-tabs/static-verification.json`.
- Inline figure totals retained: Chapter01=10,Chapter04=16,FVG=11,Chapter31=9. Chapter01 previously had an eleventh duplicate in the standalone tab; its guard now expects the10 original textbook figures.
- Browser: EN and UR textbook/quiz switching; Enter-key navigation; FVG11 inline figures and liquidity16; Urdu dark390px viewport, no overflow, minimum navigation target height47.59px. Evidence:`outputs/chapter-two-tabs/browser-verification.json`; screenshots:`fvg-desktop-light.png`,`fvg-urdu-mobile-dark.png` in that directory.
- Sitemap still741 URLs,116 published EN/UR lesson URLs. No URLs removed or redirected. No changes to source-document text or third-party publication settings.

## Files

- `src/components/ChapterRoom.tsx`
- `scripts/verify-chapter-sections.ts` (new)
- `scripts/verify-curriculum-phase1-static.ts` (replace obsolete standalone-diagram assertions)
- `scripts/verify-price-movement.ts` (correct original inline-figure count)
- `package.json` (wire guard into build and SEO suite)
- this report

Task-start backups under `outputs/chapter-two-tabs/` isolate this change from pre-existing drafts and the already merged Chapter04 work. No broad staging/reset performed. Not verified: deployment, assistive-technology testing or an exhaustive runtime visit to all194 pages (all194 static documents were checked).

## Isolated release verification

13 November 2026: isolated against current main ced8e7a; full production build, TypeScript, 11,012 SEO checks, 847-page crawl, all194 lesson documents, claims and bundle gates passed. Evidence: `docs/curriculum-two-section-release-verification.json`. No unrelated drafts or review-date changes included.
