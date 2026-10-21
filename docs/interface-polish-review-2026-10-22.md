# LearnSMC interface polish — 22 October 2026

## Scope and coverage

**Mode: full.** React 19 / Vite, Tailwind 4 utilities and the established plain-CSS theme system, Lucide icons, existing Motion package and locally hosted Source Sans 3 / Lora / Noto Naskh Arabic fonts. No dependency or font family was added.

Scope: the shared interface used by the entire website, with navigation, homepage, curriculum, chapter reader, mentorship directory, articles/index and reader, Masood Academy, downloadable reference, all ten workbench entry pages, publisher/legal pages, search, theme and language controls, and footer. The common detail layer is imported last in `src/main.tsx:46`.

Boundary: this is an interface review and implementation, not a new content/source audit, a review of every lesson recording, or an exhaustive exercise of every deep route. Layout observations cover 51 page/theme/viewport combinations across 34 actual URLs. Desktop and responsive viewport checks used the local compiled site; they are not physical-device checks. Geometry observations are not a claim of a screenshot-by-screenshot visual audit of all 734 canonical URLs.

| Category | Evidence inspected | Result |
| --- | --- | --- |
| Typography | `typography.css`, `urdu.css`, article styles, chapter/ToolUI components, desktop reading pages and 390px Urdu/English layouts | Pretty wrapping, stable dynamic numerals, consistent lab heading family, local-font brand lock and font smoothing implemented |
| Surfaces | Existing palette/studio/playground/card/button styles; rendered cards, search, menus, labs and footer | Shared neutral depth, coherent action hierarchy, concentric card/menu corners, touch targets and focus rings implemented |
| Animations | All source `transition-all` / `transition: all` occurrences, hover keyframes, ThemePicker, existing reduced-motion rules and natural-speed browser theme changes | Explicit transition properties, quieter routine interactions and stateful theme-icon transition implemented; 10% DevTools playback not available in the browser control surface |
| Icons | Lucide controls in header/theme, search results, tool switcher and action/footer controls; Urdu directional checks | Shared control stroke/state consistency, switcher chevron, inherited theme colours and scoped directional arrow flipping implemented |
| Performance | `package.json`, imports, transition/will-change source search, before/after Vite builds | No new dependency/font, no will-change hints; no all-property transitions remain; approximately 2.16KB additional gzip CSS relative to the initial build |

## Findings and fixes

### Typography and stable values

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| LOW | `src/styles/interface-polish.css:17` | Body copy used ordinary wrapping; several changing scores/counts relied on proportional numerals; lab headings used a serif while surrounding controls were sans | Pretty body wrapping, balanced headings, tabular dynamic values, consistent sans lab headings, root font smoothing and article section rhythm | Text wrapping and tabular numbers reduce orphaned lines and shifting values; hierarchy is consistent without replacing the reading fonts |
| LOW | `src/styles/interface-polish.css:97` | English logo lettering inherited the Urdu font on Urdu pages | Brand alone explicitly uses the already loaded Source Sans 3 | Optical consistency keeps the same brand across language changes |

### Surfaces, actions and hit areas

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/styles/interface-polish.css:26` | Card styles combined flat borders, coloured offset shadows and vertical hover lifts; static panels also moved | Browsing cards share neutral layered depth and colour/ring feedback; static panels stay still; chart/table/state boundaries remain structural | Shadows express elevation while borders express structure; repeated movement no longer competes with learning |
| LOW | `src/styles/interface-polish.css:42`, `:105`, `:153` | Rounded illustrations nested inside similarly rounded cards, and variable menu padding/radii | Homepage cards use 24px outer / 20px padding / 4px inner radius; theme panel uses 18px outer / 8px padding / 10px inner; tool switcher uses 20 / 8 / 12 | Concentric radius removes pinched inner corners; selected/focus borders are retained |
| MEDIUM | `src/styles/interface-polish.css:48`; press utilities in `OpeningScreen.tsx:112`, `SheryiansHome.tsx:60,69,77` | Primary buttons used different pill/rectangular shapes and coloured offset shadows; press feedback varied between .95 and .98; some disabled primaries still lifted on hover | Consistent 12px main actions, semantic theme foreground/background, quiet depth, .96 press feedback with `data-static` opt-out, restrained disabled appearance; frequent chart/tab controls remain static | Scale on press should be subtle and consistent; hierarchy and disabled state must remain clear |
| MEDIUM | `src/styles/interface-polish.css:95`, `:171` | Language options and small icon controls were shorter/narrower than preferred touch targets | Desktop utility controls are at least 40px wide; mobile search/theme are 44×44px; language options measure 55×44px; chapter tabs, mobile buttons and standalone footer links have 44px minimum targets | Minimum hit area improves touch accuracy without overlapping pseudo-elements |
| MEDIUM | `src/styles/interface-polish.css:80`, `:141` | Focus outlines used different fixed palette colours; input hover borders and some dynamic metrics did not share the final theme roles | A theme-aware visible focus ring; input border feedback; matching scrollbars; consistent lab metric and workspace surfaces; themed footer action/icon states | Static focus and state cues remain readable in both themes without layout movement |

### Motion and transition specificity

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/index.css:206,228,250`; all transition locations in the appendix | `transition: all` / `transition-all` observed every property across 20 component files | Enumerated colour, background, border, shadow, opacity and transform properties at the original utility sites; named primary-action transitions | Transition specificity avoids unintended geometry animation and reduces property watching; no will-change layers were added |
| LOW | `src/styles/studio.css:19`, `src/styles/navigation.css:9,11`; `src/styles/interface-polish.css:26,130` | Routine card hovers replayed draw/nudge keyframes, lifted images and rotated arrows; menu/icon keyframes restarted on activation | Frequent browsing interactions use brief colour/depth feedback; no repeated drawing sequence; menus change immediately; old interactive entry keyframes removed from their rules | Motion restraint keeps attention on the content and avoids uninterruptible repeated effects |
| LOW | `src/components/ThemePicker.tsx:8,24`; `src/styles/interface-polish.css:111` | A keyed SVG replayed a one-sided icon entrance | Existing `motion/react` AnimatePresence uses `initial={false}`, opacity 0–1, scale .25–1, blur 4–0, spring .3s and bounce 0; reduced motion uses duration 0; active theme remains labeled/selected | Contextual icon changes have a contained enter/exit transition, no mount entrance, and an independent static cue |

### Navigation and search

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | `src/components/Header.tsx:72` | Focusing a desktop disclosure opened it, so returning focus on Escape could reopen it; click always forced it open | Native keyboard/click activation toggles the disclosure; focus alone does not open it; Escape closes and returns focus; pointer exploration retained | Static and keyboard state cues must be reliable, and routine focus should not trigger distracting disclosure changes |
| HIGH | `src/components/SearchModal.tsx:27,77`; `src/styles/interface-polish.css:114` | Search overlay z-index 50 was below header z-index 60; no focus containment/restoration; tiny close target and a crowded input outline | Overlay z-index 80, contained and restored focus, ArrowUp/Down result traversal, accessible input/close labels, announced empty state, 40px desktop/44px touch close control, clear focus-within input boundary, coherent search surface | A modal must remain above the interface and keep keyboard users in the current interaction; controls must have readable and reachable states |

### Media, icons and RTL

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| LOW | `src/styles/interface-polish.css:130` | Article media had tinted borders/offset shadows, and hover transforms competed with the surrounding reading surface | Neutral pure-black 10% inset outline in light mode / pure-white 10% in dark; quiet image edges; article title hover remains an independent cue; sidebar stays structurally flat | Image outlines should be neutral and must not alter dimensions; text supplies a stable link cue |
| MEDIUM | `src/components/TradingToolsWorkbench.tsx:213,217`; `src/styles/interface-polish.css:149,165` | The tool menu used physical right alignment; small link targets; a native marker disappeared under flex layout; action arrows did not adapt consistently to RTL | Logical `end-0` anchoring, explicit Lucide chevron/expanded orientation, 44px menu targets and selected accent, scoped RTL navigation-arrow flipping; icon-only shared controls use 1.5px Lucide strokes and inherited colour | Icon state, optical weight and RTL direction should communicate the action; market diagrams, logos and playback controls must not be mirrored |

All 14 systemic findings above are implemented. The shared stylesheet also retains forced-colour structural borders and print fallbacks, and respects existing reduced-motion rules.

## Considered but rejected

| Location | Candidate | Rejected because |
| --- | --- | --- |
| `src/components/PricePlayground.tsx` | Rebuild the 3D hero and add pointer-following camera motion | This would introduce behaviour changes and repeated movement into an existing learning illustration; the current request is better served by polishing shared controls |
| `src/styles/typography.css` | Replace the font families | The existing locally hosted fonts already cover English/Urdu and editorial reading; another family would add downloads and change text measures across the site |
| `src/components/ChapterRoom.tsx` | Stagger chapter tab content on every change | High-frequency learning interactions need immediate feedback; delayed entrances would slow navigation |
| `src/styles/interface-polish.css` | Use shadow rings for every boundary | Charts, inputs, tables, selected states and dividers need structural borders, including in forced-colour mode |

## Verification

Commands actually run (not a claim that the unrelated full test suite was rerun):

- `node node_modules/typescript/bin/tsc --noEmit` — passed, no diagnostics.
- `node node_modules/vite/bin/vite.js build` — passed. Existing large translation/data chunk warning remains; no new library was installed. CSS gzip changed from 38.01KB to 40.17KB; vendor gzip from 121.27KB to 122.73KB using the existing Motion package.
- `node --import tsx scripts/prerender.ts` — passed, generated normal static documents, images, redirects and Urdu pages. Its 13 pre-existing untranslated brand/URL/abbreviation reference segments remain; this task adds no translation strings.
- `git -c core.whitespace=cr-at-eol diff --check` — passed.
- Source scan for `transition-all`, `transition: all` and `will-change` — no matches remaining.
- Read generated sitemap: 734 URLs, 734 unique URLs, 367 Urdu URLs. Date ledger: 218 evidenced dates, zero pending changed/new pages. No route/content date was invented for CSS changes.

Browser interactions and observations:

- Layout sample: 25 distinct English desktop routes covering the home/learning/reading/tools/publisher templates; five dark desktop views; seven dark and five light Urdu mobile views; nine English mobile views. 51 observations across 34 unique paths. All measured document widths fit their 1280px or 390px viewport and showed no completed broken images. A separate 320px header measurement also fit.
- Mobile controls measured: language options 55×44px, theme/search 44×44px, with disjoint rectangles.
- Search: opened above the header, empty query, unmatched query, FVG results, ArrowDown to result, Shift+Tab/Tab wrapping with an empty result list, Escape close and focus restoration to Search. Mobile empty state visually checked.
- Desktop navigation: Enter opens Curriculum; Escape closes and leaves focus on its trigger. Mobile Library opened in Urdu; links stayed inside the viewport; Escape closed it.
- Theme: light/dark selection, selected labels and focus returned to trigger; natural-speed icon transition observed. Screenshot proof includes dark lab and light shared cards.
- Chapter: Interactive Diagram and Practice & Quiz switches, keyboard answer submission and incorrect feedback presentation; light/dark visual samples. This is a representative chapter UI check; the earlier all-53 content review is not being claimed again.
- Chart Laboratory: visual hint and disabled Next observation state checked; hint and selected/control colours remained readable.
- Initial preview startup/loading state observed while the development server was compiling; final checks use the compiled production-style preview, with normal static generation.

**Not verified:** DevTools Animations-panel playback at 10% (not exposed by this browser control surface); OS-level reduced-motion / forced-colour emulation (stylesheet and hook paths inspected only); physical iOS/Android/Safari devices; every deep-route/quiz/lab outcome; production deployment. A pre-existing Vite data/translation chunk-size warning remains outside this visual-polish scope.

## Verdict

**Approve — for the implemented shared-interface scope and inspected states.** No actionable HIGH/MEDIUM/LOW finding from this review remains unfixed. Unverified checks: 10% DevTools playback, OS media-preference emulation, physical devices, exhaustive deep routes and production deployment as stated above. Changes are local, uncommitted and not deployed.

## Transition specificity appendix

Every existing all-property transition utility was replaced at the following locations (including legacy components still present in the repository):

- `src/components/AcademyWorldMap.tsx:154,199,215,239,251,263,275,287,299,311,323,339,350,361,372,383,394,405,479,558`
- `src/components/BauhausNavScroller.tsx:71,99`
- `src/components/ChapterRoom.tsx:331`
- `src/components/CompareView.tsx:95`
- `src/components/ConceptExplorer.tsx:267,298,338,521,627,685`
- `src/components/CurriculumView.tsx:116,192,210`
- `src/components/ErrorBoundary.tsx:54`
- `src/components/InteractiveDiagram.tsx:55`
- `src/components/LegalModal.tsx:108,120,132,144,156`
- `src/components/LegalPageView.tsx:110`
- `src/components/MasterclassWorkbench.tsx:194,244,302,480`
- `src/components/MentorSpotlight.tsx:218,228,238,441`
- `src/components/NotFoundView.tsx:71,86,92,106,121,136,151`
- `src/components/OpeningScreen.tsx:104,112,210,266,310,322`
- `src/components/SearchModal.tsx:139,154,182,197`
- `src/components/SheryiansHome.tsx:60,69,77,140,183,227,270,313,356,518,541,569,577`
- `src/components/TextbookReader.tsx:159,170,199,214,233,272,308,359,412,424,561,574`
- `src/components/TradingToolsOverview.tsx:278,349`
- `src/components/masood/MasoodAcademyView.tsx:173,182,190,198,226,271,289,340,373,486,515,544,572,707,820`
- `src/components/masood/MasoodAnimatedExplainer.tsx:142,150,163,200,216,266,687,833,912,949,960,1044,1117,1180`
