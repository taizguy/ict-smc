# Two rewritten lessons: semantic HTML follow-up

Reviewed and implemented 11 November 2026. Scope: Chapter 01 and permanent lesson ID 13 / display Chapter 26, including their Urdu mirrors. Release approved by the user for push and merge; production deployment status must be checked separately.

## Verified findings

- Live HTML already contained a main landmark and FAQ answers. However, the full learning-library tree preceded the lesson heading and article. These were not blank or unindexable documents.
- Both FAQs depended on JavaScript buttons for disclosure interaction.
- Shared Person JSON-LD included email, telephone and postal address.
- Chapter 01's glossary heading exposed the research parenthetical “Quick Definitions for AI and Skimmers”. No additional research-only headings were identified in these two supplied lesson documents. Ordinary references to geopolitics are genuine content, not GEO authoring labels.

## Implemented

- One `main#main-content` containing an article, before the learning-library aside; right-hand contents follows the article. Explicit CSS grid placement retains the visual columns. Other lessons retain their existing rendering branch.
- Scoped `DefinedTerm` microdata for primary answers/definitions and the CE formula, with visible `itemprop="description"` paragraphs and an explicit name. The Chapter 01 expectation/surprise expression remains its original rule-of-thumb wording and is scoped as CreativeWork rather than a mathematical law.
- Native details/summary disclosures: 14 Chapter 01 questions and 21 FVG questions. All answers remain in the initial HTML. Native name groups keep one answer open; progressive CSS animation, focus indicators and reduced-motion handling retained.
- Shared Person identity retains name, identifier, author URL and confirmed sameAs links; contact/address properties removed. Public contact-page copy was not changed.
- Glossary heading now reads “13. Glossary” / “13. لغت”. Source-copy fixture records this explicit user-approved exception. Other supplied wording preserved.
- Durable requirements added to AGENTS.md and curriculum chapter rewrite rules; build guard checks all four documents plus Person privacy across emitted routes.

## Typography follow-up

User confirmed the FVG typography as the future chapter standard: Source Sans 3, 16px, regular 400; body/list line-height 1.9 (30.4px), FAQ answers 1.85 (29.6px). Shared tokens and scoped Chapter 01/FVG prose rules implement it without changing headings, tables or figure captions. Chapter 01 computed paragraph/FAQ values verified in the browser on port 4254. The standard is recorded in AGENTS.md and the curriculum rewrite rules.

## Files

New: `src/components/LessonExtract.tsx`, `src/components/LessonFaq.tsx`, `src/utils/documentLessons.ts`, `src/styles/lesson-semantics.css`, `scripts/verify-lesson-semantics.ts`.

Updated: `src/App.tsx`, `src/main.tsx`, `src/components/{ReadingRoomLayout,ChapterRoom,PriceMovementContent,FvgDocumentContent}.tsx`, `src/utils/publisher.ts`, `src/styles/reading-room.css`, `src/data/chapters/priceMovementLesson.json`, `src/data/page-revisions.json`, `scripts/prerender.ts`, `scripts/verify-price-movement.ts`, `package.json`, `docs/chapter01-source-copy.json`, `docs/chapter01-bilingual-review.csv`, AGENTS.md and rewrite rules. Existing unrelated working-tree drafts were not reverted or staged.

## Release verification

A clean source copy was assembled against the previously merged release, excluding the unrelated Chapter 36 draft and other working-tree drafts. Production build/prerender, 10,986 SEO checks, the 847-page crawl, native EN/UR semantic checks, strict claims gate and bundle budgets passed. TypeScript passed. Git whitespace checks passed.

## Evidence

- `outputs/lesson-semantics/live-before.json`: live source-order/contact/FAQ findings.
- `outputs/lesson-semantics/release-build.log`: production build/prerender passed; 10,986 SEO checks, 847-page internal crawl, source fidelity, language/routing/schema checks, strict claims and bundle budgets passed.
- `outputs/lesson-semantics/release-typecheck.log`: TypeScript passed.
- `outputs/lesson-semantics/static-verification.json`: four documents, one content-first main each, 14/21 native FAQs, valid scoped extraction containers; 1,615 emitted Person objects checked.
- `outputs/lesson-semantics/browser-checks.json`: English/Urdu FAQ keyboard interaction with page scripts blocked by CSP, exclusive opening, visible static content; runtime mobile library Escape restores trigger focus; mobile overflow checks and dark-theme checks.
- `outputs/lesson-semantics/chapter01-native-faq-desktop.png`, `chapter01-light-mobile.png`, `fvg-urdu-nojs-mobile.png`: browser captures.
- `outputs/semantic-release/outputs/lesson-semantics/revision-evidence.json`: four edited lesson records dated 11 November; 326 privacy-only fingerprint migrations preserve their original dates. The 409 previously pending revision records remain pending, without blanket stamping. The clean release retains all 330 evidenced sitemap dates.

Browser checks covered desktop and 390px mobile, English/Urdu, light/dark and page-script-blocked disclosure operation. No external rich-result validation, assistive-technology user test or new ranking/AI-citation measurement was performed. These semantics do not guarantee snippets, rankings or citations.

References consulted: [MDN details element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details), including exclusive name groups; [Google structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies), including visible-content consistency.

Local preview: http://127.0.0.1:4252/learn/what-actually-moves-price/ and http://127.0.0.1:4252/learn/fair-value-gaps-fvg-and-consequent-encroachment/ . Port 4253 serves the same build with page JavaScript blocked for fallback testing only.
