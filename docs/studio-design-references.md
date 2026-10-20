# LearnSMC study studio — reference review

Live review: 20 October 2026. These websites were visited individually in the browser; no source artwork, brand assets or site code was copied.

| Reference | Observed approach | LearnSMC application |
| --- | --- | --- |
| [ParentSquare](https://www.parentsquare.com/) | Clear heading hierarchy, spacious sections, direct primary/secondary actions, rounded imagery, colorful labels | Clear first-lesson/practice actions, generous section rhythm, lightly colored learning pathways |
| [EzeraTech](https://ezeratech.ae/) | Oversized serif type, asymmetric composition, soft color forms, floating navigation, translucent cards | Mixed sans/italic editorial headings, floating top navigation, subtle chart-stage color and layered book treatment |
| [Shelby Kho](https://shelbykho.com/) | Original hand-drawn desk, colorful personal details, small interactive controls, tactile objects | Original decorative SVG drawings and an interactive educational chart, without copying the artist's drawings or desk composition |
| [Onlines](https://onlines.com.ar/) | Large type, restraint, strong whitespace, grid texture and scroll-linked text changes | Larger visual hierarchy, quiet diagram textures and simpler sections; essential content remains readable immediately |

## Implementation principles

The base canvas stays white in light mode, with bounded mint, lavender, blue and warm-yellow panels. Dark mode has separate panel colors. The existing local Source Sans 3, Lora and Urdu fonts are reused; no new font services or animation libraries are introduced.

The homepage hero keeps the existing synthetic OHLC data and finite animation. Three keyboard-accessible controls select a sweep reference, displacement candle or measured three-candle FVG. Their explanations avoid promising a reaction or inferring institutional intent.

Header, footer, curriculum cards, tools overview, lab controls and article-library surfaces share the new shapes and spacing. Long lesson and article text stays focused on reading. Urdu uses natural line spacing and retains left-to-right chart time.

No scroll hijacking, content-obscuring entrance sequences, autoplay sound or endless ambient motion is added. Hover effects have keyboard equivalents where interactive and are disabled for reduced-motion preferences. Decorative drawings are excluded from the accessibility tree; teaching diagrams retain their text alternatives.

## Review and release checks

- Production build passed the existing 1001 URL/canonical/sitemap/redirect checks and crawl/schema/link checks for 762 rendered documents. TypeScript passed.
- English desktop home and tools overview, English phone home, Urdu phone home/curriculum, and the dark article library were visually reviewed. Header stickiness and the hero's keyboard-operated observation controls were checked.
- The outer app container now clips horizontal overflow without creating the intermediate scrolling container that prevented the header from sticking.
- Dark-mode accent text, mentorship labels and older card shadows were adjusted after visual review. The tools overview now describes the actual three-drill recognition flow and CSV backtest instead of the replaced replay/Monte Carlo interface.
- All new copy has Urdu translations. The publication guard passed. Original lesson content, saved-progress identifiers, route paths and lab execution logic were not edited.
- Two changed prerendered homepage documents received revised content fingerprints. The sitemap remains at 734 URLs and modification dates for other pages were preserved. No new canonical routes were introduced.

This is a local implementation ready for review; no release was pushed as part of this design pass. A full device/browser compatibility or measured Core Web Vitals audit was not performed.
