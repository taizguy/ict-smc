import fs from 'node:fs';
import {journalEditions} from '../src/data/masterclassJournal';
import {masterclassCollection} from '../src/data/masterclassData';
import {masterclassThumbnailSpecs} from '../src/data/masterclassHub';
import {getMasterclassUrl} from '../src/utils/workbenchToolRoutes';
const replaced=new Set([2,3,6,9,16,19,20,21,22,23,24,25,26,27,28,29]);
const rows=masterclassCollection.map(m=>`| ${m.number} | [${m.title}](${getMasterclassUrl(m)}) | ${replaced.has(m.number)?'Animated hub artwork':'Existing specialized diagram'} | ${masterclassThumbnailSpecs[m.number].composition} |`);
fs.writeFileSync('docs/masterclass-catalogue-layout-review.md',`# Masterclass catalogue migration — 29 October 2026

## Latest approved content direction

Use the original Masterclass catalogue body, not the expanded curriculum-style journal prose. All 29 English lessons now have the Field Journal shell: top payoff, author/date/source/correction details, contents rail, original lesson sections, visible FAQ, related reading and previous/next/hub links. Existing top sections and FAQ topics on Units 3, 8 and 15 are retained; references to removed example sections are made self-contained. Other FAQ answers derive from that lesson's own catalogue fields; they are not claimed as newly researched PAA. The original catalogue data is unchanged.

Local lesson URLs now show the new shell without a query parameter. Production remains gated as draft: the full migration introduces Urdu strings which have not yet cleared native translation review. No push, merge or deploy. Existing public English/Urdu documents remain the production fallback. This distinction is deliberate; a passing fallback production crawl does not certify the new bilingual layout.

## Animation decisions

Sixteen replacements reuse the exact topic-specific artwork already on the Masterclass hub, with local play/pause, reduced-motion handling, offscreen pausing, accessible descriptions and static captions. The base geometry stays visible while an overlaid trace draws or selected elements pulse. No historical chart, live price feed or trading outcome is implied.

Reasons: Unit 2's matrix is less direct than its liquidity-destination map; Unit 3's old first-presentation FVG is a different named variation; Unit 6's generic session timeline lacks its clock-plus-gap relationship; Unit 9 benefits from a clearer two-stage schematic; Unit 20's nested structure is not a paired-market SMT comparison. Units 16 and 19 reused the five-opening-ranges geometry and are replaced with their own decision-tree and calendar artwork. Units 21–29 use hub-specific geometry in place of generic/reused formations or to make their own named studies clearer. The other 13 retain their specialized diagrams. This is a visual/content-fit review, not a new authentication of every legacy trading claim.

| Unit | Lesson / existing URL | Diagram | Composition |
| --- | --- | --- | --- |
${rows.join('\n')}

## SEO, content and verification scope

- All canonical lesson URLs retained. No deleted routes, consolidations or redirects; no new sitemap URLs needed.
- Existing audited title/description helpers reused for catalogue lessons. No new keyword-volume or ranking claims. Each lesson has a topic-bearing H1 and its own PNG social artwork generated from its hub illustration.
- Prepared visible-content Article, BreadcrumbList and FAQPage graph. Publication date 24 October was confirmed by the owner. Review dates describe presentation/catalogue consistency; no fresh complete-recording review is claimed.
- Sources reuse existing reviewed-source records where available. Otherwise the official teaching archive is labelled background attribution, not precise passage verification. No credentials, specific sources, market examples or performance statistics invented.
- Targeted static scanner checks all 29: one H1; exact original core rule, operations, step details, mistakes, invalidation and risk prose; 4–5 visible FAQ answers; valid section targets; draft publication guard. Sixteen replacement figures have distinct label-free SVG compositions. All 29 PNG files generated successfully.
- Static review files: outputs/masterclass-journal/1.html through 29.html. These independent review documents contain full content without JavaScript.
- Pre-existing claim wording on Unit 19 is flagged by the scanner and retained under the requested content-preservation scope; the layout work does not substantiate it. No blanket accuracy claim is made.

## Pending publication gate

Native Urdu for the redesigned shell and newly composed FAQ strings, matching runtime/prerender translations, and an activated bilingual production metadata/canonical/hreflang/crawl review. Full current production build evidence is recorded separately in outputs/masterclass-catalogue-build.log. Do not publish this draft merely because the fallback site builds.
`);
fs.writeFileSync('outputs/masterclass-journal/routes.json',JSON.stringify(masterclassCollection.map(m=>({number:m.number,path:getMasterclassUrl(m),h1:journalEditions[m.number].h1})),null,2));
console.log('Wrote all-29 layout/animation register and local route review list.');
