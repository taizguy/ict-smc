# Chapter 01 document restoration

Updated 11 November 2026. This supersedes the earlier rewrite's content decisions in chapter01-rewrite-report.md.

## Content fidelity

Restored the supplied Part 2 English copy, rather than rewriting it: the original Quick Answer, six takeaways, 15 exact numbered H2 headings, all H3 subheadings, paragraphs, lists, nine tables, five worked scenarios, 15 glossary entries and 14 FAQ answers. The common-myths and glossary sections are native two-column tables, as in the PDF. The next-reading labels are retained; no duplicate lesson or new URL is created.

The PDF extraction was checked against 371 English content units (headings, paragraphs, bullets, cells and FAQ entries). Two paragraphs span PDF tables/page boundaries; their original text spans were checked on either side of the extraction interruption. docs/chapter01-source-copy.json preserves those approved units, and verify-price-movement.ts checks they appear in the emitted English HTML. Urdu translates the same units and keeps their structure. The PDF and sources/ remain unchanged.

Document-only SEO strategy, image instructions, page footers and audience-planning notes are not learner copy. The existing notes, practice, summary, references, correction/report functions and one financial-risk notice are retained. No silently corrected wording is substituted for the supplied article. Any future factual or editorial adjustment requires user approval.

## Presentation

A small allowlist of key phrases receives restrained blue, violet or green highlights; headings are not automatically linked or highlighted. Internal links retain underlines. FAQs are individual lightly graded cards with keyboard-operable buttons, exclusive open state and reversible CSS grid/opacity motion; reduced-motion disables transitions. All answers remain in HTML, and the script-free prerender opens them for reading. Advanced sections remain native disclosures with content in HTML.

## Dates and source references

The user supplied 15 October as the original date in this 2026 project. The hero and Article schema now use datePublished 2026-10-15 and dateModified 2026-11-11. Other chapters are not stamped. The verified SEC/Investor.gov, CME, BIS, Federal Reserve, EIA and Cboe-hosted research references remain with their review scopes. Those references support particular mechanisms; they are not represented as verification of every absolute statement in the supplied copy.

## Part 3 implementation and conflicts

- One topic H1; exact document H2/H3 hierarchy; definition sentences, native tables, glossary and a visible 14-answer FAQ. Main keyword remains in title, description, opening copy and an image description. Existing canonical URL retained.
- Metadata stays topic-specific with social parity, reciprocal EN/UR/x-default, breadcrumbs, author and matching FAQ/Article schema. DefinedTermSet now describes the actual glossary table. Existing lesson-specific social-image generation retained.
- Relevant contextual links and official citations retained. Dedicated deeper articles do not yet exist for every driver (notably company earnings, physical supply and ETF flows), so unrelated destinations are not forced and new content is not invented. The crypto next-read label stays plain text because no equivalent published dedicated guide exists.
- Lightweight SVGs, pausable motion, reserved viewboxes, scrolling table regions and text captions retained. No heavy dependency added.
- The exact Quick Answer is longer than the playbook's 40–60-word recommendation. The exact H2s do not contain the complete primary search phrase. Preserve the supplied wording rather than shorten it or invent another heading. The suggested new slug is not applied to an established URL.
- No invented author credentials, statistics, historical trades, ranking/AI-citation promises or rich-result eligibility claims. The optional HowTo schema is not added. Review dates do not schedule or pretend a future quarterly review.
- The ten existing topic illustrations are retained, with the myth explanation displayed as the requested table. Their captions are existing supplemental visual explanations, not replacements for the restored body copy.

## Evidence and limits

Evidence: outputs/chapter01-restoration/ (PDF fidelity, typecheck, build, browser and revision evidence). Human Urdu review, assistive-technology user testing, field Core Web Vitals and live Google indexing are not established by local checks. No push, merge or deploy is authorised in this task.

## Final verification

Production build/prerender passed: 10,986 SEO checks, 847-page crawl, 739 sitemap URLs, 114 published EN/UR lesson URLs, strict claims scan and unchanged bundle budgets. Chapter guard confirms all 371 supplied English units in the actual HTML; nine native tables, 14 FAQ answers, 15 glossary terms, correct dates/schema and one risk notice. TypeScript passed. After scoped revision recording the chapter and Phase 1 static checks passed again.

Browser evidence covers eight combinations (EN/UR, 390px/1440px, light/dark): one H1, nine tables, 14 FAQ cards, correct publication/update dates and no document overflow. runtime-parity.json confirms every restored heading, paragraph, list item, table cell and FAQ question/answer in both runtime languages. Keyboard Enter opened the next FAQ and closed the previous card; closing the same card worked. Screenshot evidence includes the full myths table, mobile dark FAQ and final light FAQ. Reduced motion is respected in CSS; a fresh assistive-technology user session was not run.

Eight changed chapter/directory/hub fingerprints were recorded for 11 November 2026, with this report as evidence. Other pending working-tree revisions were not stamped. The chapter publication date is user-supplied; it was not inferred from a Git commit.

Files touched in this correction: AGENTS.md; docs/curriculum-chapter-rewrite-rules.md; docs/chapter01-source-copy.json; docs/chapter01-bilingual-review.csv; docs/chapter01-restoration-report.md; src/data/chapters/priceMovementLesson.json/.ts; src/components/PriceMovementContent.tsx; src/styles/price-movement.css; src/components/ChapterRoom.tsx (Chapter 01 hero only); src/data/curriculumReview.ts (Chapter 01 revision); src/data/curriculumPhase1.json (Chapter 01 description); scripts/seo-content.ts (Chapter 01 schema); scripts/price-movement-localized-document.ts; scripts/urdu-pages.tsx (Chapter 01 native body hook); scripts/verify-price-movement.ts; generated Urdu catalogs and src/data/page-revisions.json. Earlier pending changes are preserved.

No new routes, redirects, author credentials or performance claims. No deployment. Local review: http://127.0.0.1:4249/learn/what-actually-moves-price/ .
