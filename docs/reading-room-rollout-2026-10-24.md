# Reading Room + Atlas curriculum rollout

Approved direction: the combined preview, not the three initial alternatives.

## Scope

- Curriculum overview and every topic index.
- All 53 chapter readers and their five existing study sections.
- Mentorship library and six mentorship detail pages, retaining original recording inventories/checklists.
- English and published Urdu, including RTL, dark mode and mobile chapter navigation.

## Preserved behaviour and content

Lesson data, canonical route slugs, metadata and JSON-LD sources were not edited. Existing contextual linking, original chapter diagrams, source review notes, quiz questions, summaries, risk guidance, related links and mentorship paths remain connected. Bookmarks and personal notes keep their original storage keys; completion remains the existing personal checklist.

The new shared library uses ordinary links and a localized search. Focus mode, comfortable/wide reading and adjustable text are presentation controls. Preferences are stored separately from learning progress. The mobile drawer closes on Escape or navigation, contains keyboard focus and restores focus to its opener.

## Static rendering and translation

The static generator now renders the same reading components rather than a generic route card. Static chapters expose all five study sections; interactive readers start with the textbook. No essential lesson text depends on starting an animation.

Original source strings are retained on shortened headings for reliable Urdu translation. Static lesson paragraphs are localized as complete paragraphs before contextual links are inserted, avoiding fragment-level translations. The published Urdu build gate remains active; it is not bypassed. Its remaining 13 unmatched entries are the generator's existing allowed brand/reference values, not unresolved prose.

## Sitemap dates

No canonical routes were added or removed. The layout replaces rendered wrappers/navigation; chapter source data and editorial review dates are unchanged. Reading-route fingerprints are rebaselined against the new renderer while retaining their existing evidenced `lastmod` values. This is explicitly recorded in each affected ledger entry. A complete build resolved the intermediate history-series fingerprint differences without changing those ledger entries. The completed sitemap has 755 evidenced dates and no pending fingerprints.

## Verification boundary

TypeScript checking and the production compile completed successfully. The static pipeline generated 388 English sitemap entries plus published Urdu alternates/documents. Live browser inspection covers the curriculum, a chapter, a mentorship detail and the new navigation. Final handoff records additional mobile/Urdu/diagram/quiz checks below. No automated test suite was added or run for this task.

### Interface-polish review

| Category | Implementation / evidence |
| --- | --- |
| Typography | Existing local Lora, Source Sans 3 and Naskh; bounded reading size; narrow-screen and RTL rules. |
| Surfaces | Scoped ivory/oxblood and warm dark palettes; flatter reading surfaces; shared variables keep controls consistent. |
| Animation | Existing chapter story players retained. New drawer motion is restrained and disabled for reduced motion. Detailed 10% timeline inspection was not repeated. |
| Icons | Existing Lucide icons at explicit sizes, current-color states, 44px reading controls. |
| Performance | Shared lazy-loaded reading shell; no added dependencies or font downloads. Prototypes excluded from Tailwind scanning. No field CWV measurement. |

Rejected: replacing the existing teaching diagrams with decorative artwork; scroll hijacking; changing editorial dates merely for a new visual theme.

### Final browser checks

- Production curriculum, FVG reader, and 2022 mentorship inventory inspected in the browser.
- Existing FVG quiz accepts an answer and updates its score; interactive diagram playback starts.
- Dark palette inspected; final preview restored to light.
- Urdu reader reports `lang="ur"` and `dir="rtl"`, with the translated FVG title and no horizontal overflow.
- At a confirmed 390px viewport, the chapter drawer opens, expands a part, and navigates to a chapter. The destination has no horizontal overflow and the drawer is closed.
- Static header language links preserve the current reading route.
- Final TypeScript check and production/static builds pass; sitemap reports 755 evidenced dates and zero pending fingerprints.

Production deployment/push is a separate user action; this change is prepared locally.
