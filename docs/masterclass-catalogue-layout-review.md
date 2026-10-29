# Masterclass catalogue migration — 29 October 2026

## Latest approved content direction

Use the original Masterclass catalogue body, not the expanded curriculum-style journal prose. All 29 English lessons now have the Field Journal shell: top payoff, author/date/source/correction details, contents rail, original lesson sections, visible FAQ, related reading and previous/next/hub links. Existing top sections and FAQ topics on Units 3, 8 and 15 are retained; references to removed example sections are made self-contained. Other FAQ answers derive from that lesson's own catalogue fields; they are not claimed as newly researched PAA. The original catalogue data is unchanged.

Local lesson URLs now show the new shell without a query parameter. Production remains gated as draft: the full migration introduces Urdu strings which have not yet cleared native translation review. No push, merge or deploy. Existing public English/Urdu documents remain the production fallback. This distinction is deliberate; a passing fallback production crawl does not certify the new bilingual layout.

## Animation decisions

Sixteen replacements reuse the exact topic-specific artwork already on the Masterclass hub, with local play/pause, reduced-motion handling, offscreen pausing, accessible descriptions and static captions. The base geometry stays visible while an overlaid trace draws or selected elements pulse. No historical chart, live price feed or trading outcome is implied.

Reasons: Unit 2's matrix is less direct than its liquidity-destination map; Unit 3's old first-presentation FVG is a different named variation; Unit 6's generic session timeline lacks its clock-plus-gap relationship; Unit 9 benefits from a clearer two-stage schematic; Unit 20's nested structure is not a paired-market SMT comparison. Units 16 and 19 reused the five-opening-ranges geometry and are replaced with their own decision-tree and calendar artwork. Units 21–29 use hub-specific geometry in place of generic/reused formations or to make their own named studies clearer. The other 13 retain their specialized diagrams. This is a visual/content-fit review, not a new authentication of every legacy trading claim.

| Unit | Lesson / existing URL | Diagram | Composition |
| --- | --- | --- | --- |
| 1 | [How Smart Money Engineers a Weekly Move](/tools/masterclass/core-masterclasses/weekly-move/) | Existing specialized diagram | Five-column weekly profile with a continuous price path. |
| 2 | [The Draw on Liquidity (DOL) Masterclass](/tools/masterclass/core-masterclasses/draw-on-liquidity/) | Animated hub artwork | Central price node with two opposing liquidity destinations. |
| 3 | [ICT 2022 Mentorship Model Framework](/tools/masterclass/core-masterclasses/2022-model/) | Animated hub artwork | Four numbered observation panels with distinct marks. |
| 4 | [Change In State of Delivery (C.I.S.D) Masterclass](/tools/masterclass/core-masterclasses/cisd-masterclass/) | Existing specialized diagram | Opposing candle run crossed by one enlarged confirmation candle. |
| 5 | [Inversion Fair Value Gap (I.F.V.G) Masterclass](/tools/masterclass/core-masterclasses/ifvg-masterclass/) | Existing specialized diagram | Before-and-after role-reversal panes joined by an arrow. |
| 6 | [ICT Silver Bullet Model Masterclass](/tools/masterclass/core-masterclasses/silver-bullet/) | Animated hub artwork | Large clock and narrow session-study card. |
| 7 | [The ICT Unicorn Model (Breaker and FVG Confluence)](/tools/masterclass/core-masterclasses/unicorn-model/) | Existing specialized diagram | Crossing reference bands and a circular overlap enlargement. |
| 8 | [The Opening Range Gap (ORG) & Octant Grid](/tools/masterclass/core-masterclasses/org-octant-grid/) | Existing specialized diagram | Octant ruler with paired endpoint brackets. |
| 9 | [MMXM Second Stage Distribution / Reaccumulation](/tools/masterclass/core-masterclasses/mmxm-stage2/) | Animated hub artwork | Two-stage terraced profile with a midpoint bridge. |
| 10 | [The 5 Algorithmic Opening Ranges](/tools/masterclass/opening-ranges/five-opening-ranges/) | Existing specialized diagram | Five offset horizontal session lanes. |
| 11 | [ICT Propulsion Block Masterclass](/tools/masterclass/pd-arrays/propulsion-block/) | Existing specialized diagram | Two offset block rectangles connected by a returning price path. |
| 12 | [ICT Implied Fair Value Gap Masterclass](/tools/masterclass/pd-arrays/implied-fvg/) | Existing specialized diagram | Three wick-heavy candles with midpoint brackets. |
| 13 | [ICT Rejection Block Masterclass](/tools/masterclass/pd-arrays/rejection-block/) | Existing specialized diagram | Enlarged wick and body-close measurement with side bracket. |
| 14 | [ICT Mitigation Block Masterclass](/tools/masterclass/pd-arrays/mitigation-block/) | Existing specialized diagram | Failure-swing arch, lower break and return loop. |
| 15 | [ICT Standard Deviations for Algorithmic Projections](/tools/masterclass/core-masterclasses/standard-deviations/) | Existing specialized diagram | Small base ruler linked to a descending projection ladder. |
| 16 | [The New York Session: Continuation vs Reversal Framework](/tools/masterclass/core-masterclasses/ny-continuation-reversal/) | Animated hub artwork | Three-level decision tree with two equal study branches. |
| 17 | [The 1st Presentation FVG Model](/tools/masterclass/entry-models/first-presentation-fvg/) | Existing specialized diagram | Time gate followed by an ordered pair of gap candidates. |
| 18 | [ICT Optimal Trade Entry (OTE) Model](/tools/masterclass/entry-models/ote-model/) | Existing specialized diagram | Diagonal impulse and retracement across a three-level band. |
| 19 | [The ICT 3-Day Rule Masterclass](/tools/masterclass/mentorship-frameworks/three-day-rule/) | Animated hub artwork | Three calendar sheets enclosed by a rolling-window brace. |
| 20 | [Smart Money Technique (SMT) Masterclass](/tools/masterclass/core-masterclasses/smt-masterclass/) | Animated hub artwork | Aligned dual-market comparison with a vertical correspondence guide. |
| 21 | [ICT Venom Model: The 2025 Opening-Session Example](/tools/masterclass/entry-models/venom-model/) | Animated hub artwork | Shaded pre-open box with a 09:30 boundary and later excursion. |
| 22 | [Reaper FVG: A Sourced Nested-Gap Variant](/tools/masterclass/pd-arrays/reaper-ifvg/) | Animated hub artwork | Nested-zone zoom with three vertically stacked event markers. |
| 23 | [Suspension Block: Body Gaps and Contract Context](/tools/masterclass/pd-arrays/suspension-block/) | Animated hub artwork | Paired enlarged bodies, shared wick area and circular body-gap inset. |
| 24 | [RDRB: A Later Balanced-Range Visit](/tools/masterclass/pd-arrays/rdrb-balanced-price-range/) | Animated hub artwork | Wide balanced band crossed by two separated return arcs. |
| 25 | [Candle Range Theory (CRT) Strategy Masterclass](/tools/masterclass/core-masterclasses/crt-candle-range-theory/) | Animated hub artwork | Oversized anchor candle beside two smaller range-test candles. |
| 26 | [Sick Sister: Contextual Relative Performance](/tools/masterclass/entry-models/sick-sister-strategy/) | Animated hub artwork | Three-market small multiples with ranked swing markers. |
| 27 | [The ICT Double Purge Masterclass](/tools/masterclass/entry-models/double-purge/) | Animated hub artwork | Two-sided range excursion with numbered high and low crossings. |
| 28 | [The ICT Hangman PD Array Masterclass](/tools/masterclass/pd-arrays/hangman-pd-array/) | Animated hub artwork | Wick-focused plate with midpoint magnification and a separate response inset. |
| 29 | [The 8 Institutional Macro Windows Masterclass](/tools/masterclass/mentorship-frameworks/algorithmic-macros-schedule/) | Animated hub artwork | Full-width session ruler with eight alternating window blocks. |

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
