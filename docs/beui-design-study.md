# Be UI live design study

Reviewed 2026-10-22. Research only: no LearnSMC interface files changed for this request.

## Evidence and scope
Live browser inspection of https://beui.dev/ in light and dark modes, homepage showcase sections, Customize theme drawer, https://beui.dev/components/motion/button, https://beui.dev/components/motion/card, https://beui.dev/components/motion/tabs, https://beui.dev/charts/candlestick-chart and https://beui.dev/docs/theme. Computed CSS and rendered DOM were read to distinguish measured tokens from visual impressions. Interactions exercised: theme tabs, customizer open/close, Outline button, Invoice selection, Week tab, chart pause and keyboard crosshair. This is a representative design-system study, not inspection of every component or a full accessibility/performance audit. No mobile or physical-device inspection in this pass.

## Visual system
| Element | Observed implementation | Lesson for LearnSMC |
| --- | --- | --- |
| Light canvas | Near-white oklch(99% 0 0); muted/card oklch(97% 0 0) | White reading canvas; distinguish panels with small luminance steps |
| Dark canvas | #151515; cards #1c1c1c; foreground oklch(96% 0 0) | Charcoal rather than tinted navy or absolute black |
| Primary action | #0285f7 in both modes, white label | One predictable action color, with accessible label contrast checked independently |
| Borders | Light dark ink at 6%, strong at12%; dark white at5%, strong at10% | Quiet structure; stronger outline only for focus, selection or interaction |
| Secondary text | Live light token lab(42% 0 0); dark lab(55.92% 0 0) | Theme-specific readable secondary text; do not indiscriminately reduce opacity |
| Blue headline mark | Light bg #d4eaf4, fg #0d3a50; dark bg rgb(126 192 222 / .2), fg #cdebf7 | Pair highlight background and text tokens separately for each theme |
| Peach headline mark | Light bg #f8dcc4, fg #4a2310; dark bg rgb(244 178 124 / .2), fg #fbdcc3 | Warm counterpoint to cool action blue on a few meaningful words |
| Text selection | Accent cyan/teal at30% opacity; foreground remains theme text. Accent oklch(72% .18 195) light / oklch(80% .18 195) dark | Explicit ::selection styling is different from permanent headline marking |
| Accent gradient | Teal/cyan to violet; localized branded accents, card banners and rim effects | Keep gradients out of lesson body backgrounds; use selectively on special assets |
| Glass | Translucent theme surface, subtle border; documented blur20px/saturate160%, variants12/16px | Useful for a floating toolbar, unnecessary on every card |

## Typography
Live computed font family: Geist with system sans fallbacks; Geist Mono for code/technical snippets. Homepage desktop h1 is60px/weight500; major section heading36px/500, Native feature heading48px/500. Hero body16px/400; feature body18px; small card descriptions12px. The effect comes from scale, generous space, controlled line length and a few highlighted words, rather than many typefaces or heavy weight everywhere. The 12px preview captions should not set the size of LearnSMC teaching prose. Urdu requires its own suitable font and line-height; Latin Geist is not a complete bilingual typography solution.

## Cards and controls
Homepage showcase cards use24px outside radius and20px inset preview radius, with8px inset spacing. Slight card/background contrast and a faint border replace heavy shadows. Card title and short muted description remain outside the visual preview. Hover strengthens border. The Card demo offers outlined and muted surfaces; selecting Invoice adds an obvious blue ring and checked control. Selection is carried by a semantic checkbox, not color alone.

Primary buttons are blue pills; secondary buttons are grey, outline buttons have fine borders, ghost buttons remove the container. Normal CTAs have very little shadow. The special metallic variant uses a reflective rim and a separate shadow; it is an accent treatment, not the default. Tabs have pill, segmented and underline alternatives, sharing a moving active indicator and clear selected state. The theme switch is a compact three-option icon control. The customizer provides11 coordinated presets rather than scattered per-component color choices.

## Layout and motion
Large clear hero, two action choices, substantial breathing space, a restrained navigation row, and repeated consistent preview cards. The interior documentation layout uses navigation left, content center, ancillary resources right. Rounded preview frames make the component itself the centerpiece. Motion largely communicates press, switch, reveal or selected state. The chart supplies compact instrument/timeframe labels, explicit Simulated badge, pause/step controls and OHLC readout. Keyboard ArrowLeft produced a candle aria-valuetext readout. This is useful inspiration for LearnSMC labs: keep the chart dominant, the dataset provenance explicit and controls nearby.

## Recommended adaptation order
1. Add semantic blue and peach highlight pairs in both themes, applied to selected heading phrases. Keep whole paragraphs unhighlighted.
2. Add a theme-aware teal/cyan text-selection tint, checked against foreground readability.
3. Define one shared primary/secondary/outline/ghost control system with clear focus, selected and disabled states. Do not assume Be UI blue plus white normal-size text passes contrast; measure and adjust our action token.
4. Refine nested cards with neutral panel steps, consistent concentric corners and restrained borders; retain black/white/grey variety where hierarchy benefits.
5. Improve tool panel tabs and compact chart readouts; reserve green/red for market meaning.
6. Use limited cyan-to-violet atmosphere on a cheat-sheet cover, feature preview or premium-looking border accent; no site-wide gradient wash.

## What not to copy literally
Tiny preview captions for teaching copy; every component demo animation; shiny chrome on every button; developer documentation density on the homepage; a new component library solely to recreate these effects. Preserve LearnSMC content, routes, chart truth, language behavior and existing stack.

## Research verdict
The site feels coherent because the same small vocabulary repeats: neutral canvas, one action blue, two warm/cool mark colors, hairline borders, rounded inset previews and clear state changes. More color by itself would not reproduce this quality. Adopt the semantic system and a few distinctive treatments, then verify light/dark, English/Urdu and mobile together before shipping.