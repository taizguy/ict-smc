# Curriculum diagram stories — 24 October 2026

## Scope

All 53 active chapter diagrams were reviewed against their existing titles, explanatory steps and mark geometry. Chapter 13 retains its seven-stage FVG player. The other 52 now use a 30-second, three-act story player with independently authored chapter-specific headings, animated marks, scrubbing, replay, speed selection, direct stage selection and a complete-view control.

The existing chapter-specific geometry and qualified explanations were retained. Candle bodies/wicks interpolate, zones reveal, lines extend and polylines trace their actual route. Future stages are absent from the drawing until requested; previous references remain visible. Dashed hypothetical paths keep their dashed treatment. These are schematics, not historical market measurements or executable trades.

Subject families distinguish orders/queues, time windows, frameworks/risk and price structure. Chapter 43 adds recovery/continuation/both controls from its existing turning-area schematic; the continuation label follows the chosen path. Other chapters preserve the distinctions already present in their illustrations, including suspension body gaps with overlapping wicks, publication lag, stop execution uncertainty and model-specific qualification.

English/Urdu headings and interface copy are supplied. Canonical URLs and curriculum membership are unchanged. Static HTML retains the complete schematic and includes the new story headings, so playback is not required to read the explanation. The illustration revision date is 24 October 2026; this does not claim a new review of source recordings.

## Verification coverage

- Browser checks opened all **53 English chapter routes** and their Interactive Diagram tabs. Each had the correct unique chapter ID. Every new player hid future stages initially and exposed its full mark set through the complete-view control at 30 seconds. Chapter 13's existing player remained present.
- Urdu browser checks covered chapters **1, 19, 38, 43, 55 and 57**: translated story headings, RTL layout and no document overflow.
- Chapter 55's Urdu phone layout was inspected at **390px**, with no horizontal overflow. The playback control uses its own row on narrow screens.
- Chapter 43's recovery and continuation selectors each displayed one hypothetical path; the combined view displayed two. The continuation label moved to its corresponding endpoint. Live playback showed a tracing endpoint at 0.4 seconds and no stage-3 marks.
- Reduced-motion and hidden-document pause behavior were reviewed in source; an OS-level reduced-motion emulation was not performed.
- Production build: **1,002 SEO checks passed**, and crawl/schema/link verification passed across **783 pages**. Urdu generation retained the same 13 approved brand/reference unmatched segments. TypeScript and whitespace checks passed.
- Sitemap recording identified **170 affected documents** (including chapter and reused illustration content/revision metadata). These were recorded for 24 October; unchanged revision dates were preserved. All 755 eligible sitemap dates have evidence, with no pending changed pages.

Browser evidence is saved in `outputs/petar-animation-reference/chapter-browser-audit.json`. This verifies rendering and controls, not trading effectiveness or an exhaustive frame-by-frame visual review of every animation.

## Full interface review

React, existing Motion and Lucide packages, and the site's scoped CSS were used. No new dependency, font service or external media was added.

| Category | Evidence inspected | Result |
| --- | --- | --- |
| Typography | 52 heading sets, existing explanatory steps, English/Urdu browser examples | Chapter-specific short headings; numeric SVG labels stay readable on phones |
| Surfaces | Paper/drafting themes, four subject families, mobile player layout | Shared hierarchy with restrained subject accents; duplicate chapter framing removed |
| Animations | All initial/complete states; chapter 43 tracing and branches; source lifecycle review | Future stages hidden, interruptible playback, bounded loop and cleanup |
| Icons | Replay, transport, complete-view and quiz controls | Consistent Lucide icons, named controls and 44px targets |
| Performance | Bundle output and animation loop | Existing libraries, approximately 25 display updates per second and no infinite autoplay; existing large Urdu bundle warning remains |

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | ChapterDiagram / ChapterStory | Three coarse static states, with faint future marks | Timed geometry construction with no future-stage marks | Attention follows the actual explanation |
| MEDIUM | All 52 new stories | Generic presentation of each original step | Independently authored stage headings plus retained qualified explanations | Specific concepts remain distinguishable |
| MEDIUM | Chapter 43 | Both possible endings overlaid with no comparison control | Recovery, continuation and combined views | Learners can inspect alternative hypotheses separately |
| MEDIUM | Mobile controls | Transport row wrapped unevenly | Full-width play control with secondary controls below | Predictable touch layout |
| LOW | Static HTML / illustration revision | Old step presentation and illustration revision | New headings in HTML and an accurate revision date | Readability and provenance remain available without playback |

Changes are local pending the user's publishing instruction.
