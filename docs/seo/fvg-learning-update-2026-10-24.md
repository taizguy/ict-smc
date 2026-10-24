# FVG learning and snippet update — 24 October 2026

## Changes

- Glossary leaf pages render the selected explanation before the topic index. The index remains crawlable and visible, but its unrelated descriptions are inside `data-nosnippet`. Main definitions remain eligible for snippets. This reduces ambiguity; Google still selects snippets and must recrawl before changes appear.
- The curriculum title is **Fair Value Gap (FVG): Examples & Rules**. Five question-led section headings distinguish definition, boundary/CE arithmetic, outcomes, context and no-setup observations. The glossary title separately identifies its definition intent. Existing canonical URLs are unchanged.
- Chapter 13's existing Interactive Diagram tab now compares bullish, bearish, overlapping, failed-retest and no-revisit scenes. First-two-candles, formation and outcome controls hide later bars until requested. Exact OHLC tables match each visible stage. Failure uses an explicitly chosen close-beyond-boundary convention; formation does not guarantee a trade or future revisit.
- Diagram links lead to the chapter quiz, an existing fictional guided chart case and the bilingual cheat sheet. Five downloadable SVGs are generated from the same React geometry as the interactive diagrams. Static HTML includes standard image elements, captions and exact-value tables for all five scenes.
- New explanatory content, controls, headings and metadata have Urdu translations. Previously removed FVG and OB preface exercises were not restored.

## Verification

| Area | Evidence and limits |
| --- | --- |
| Interaction | Browser confirmed scene changes, sequential reveal and the diagram-to-quiz handoff. Native buttons provide keyboard activation and visible focus; playback pauses on hidden documents and respects reduced motion. |
| Typography | Site fonts, balanced headings, tabular numeric prices and LTR chart coordinates within Urdu RTL layout. |
| Layout | Desktop English and Urdu inspected. Wrapping controls and a narrow-screen media query are present. The first viewport request was delayed; the subsequent animated revision was verified at 390px with no horizontal overflow. |
| Colour | Light and dark diagrams inspected; chart and control colours use the existing theme tokens. |
| Performance | No new packages or chart libraries. Five SVG exports share scene data. Existing large Urdu bundle warning remains; no Core Web Vitals measurement claimed. |

TypeScript passed. The production build passed 1,002 SEO checks, crawl validation for 783 pages, schema/link validation, and routing regressions. The 13 remaining Urdu unmatched segments are existing brand/contact/reference strings, not new diagram copy. The search-intent inventory was regenerated. Revision recording identified 18 changed pages; 755 evidenced sitemap dates are present with no pending changed pages. Other modification dates were preserved.

## Research basis

The implementation follows the preceding live comparison of Flux Charts, TradingView, Equiti and NinjaTrader: clearer search intent, contrasting examples, chart labels and useful paths into practice. It does not reproduce competitor prose or adopt unsupported claims about institutions, revisit frequency or profitability. Existing ICT source references and their stated review limits remain in place.

- [Google snippet controls](https://developers.google.com/search/docs/appearance/snippet)
- [Google title links](https://developers.google.com/search/docs/appearance/title-link)
- [Google image guidance](https://developers.google.com/search/docs/appearance/google-images)

These changes are local and ready for review; publishing requires a later push/deployment.

## Animated-story revision

Following the user's live Petar reference review, the interactive tab was rebuilt as an original 48-second, seven-stage story. It introduces earlier context candles, reveals the three-candle formation, draws wick-boundary guides, expands the interval, draws CE, and then reveals the later observations. The invented prices and failure convention remain unchanged. Outcome-specific text waits until the later bars complete. Static exports and crawlable fallback explanations remain available.

Controls include play/pause, replay, previous/next stage, seven direct stage selectors, a native keyboard-accessible timeline and playback speed. Changing scenarios resets playback. Playback ends after one run and pauses when the document becomes hidden. Reduced-motion users can select still frames. Price tables disclose only completed numbered candles. The supporting earlier candles are visibly separated from the numbered formation.

Full implementation review: React, existing Motion/Lucide packages, and the site's scoped CSS. The scope is the FVG Interactive Diagram, its five variants and English/Urdu layouts; other chapters' diagrams were not redesigned.

| Category | Evidence inspected | Result |
| --- | --- | --- |
| Typography | Short narrative stages, chart labels, exact-value strip, Urdu direction and arithmetic | Explicit LTR arithmetic; condensed chart layout and larger labels for phones |
| Surfaces | Light paper and dark drafting palettes, comparison cards, nested chapter wrapper | Theme-specific colours and an uncluttered story surface |
| Animations | In-browser playback to completion, timeline, direct stage changes; source review of cleanup and reduced motion | Candle interpolation, line/zone reveals and short caption transitions; no infinite autoplay |
| Icons | Existing Lucide playback controls and directional navigation | Consistent icon family, named controls and 44px targets |
| Performance | TypeScript/build output and animation lifecycle code | Single bounded animation loop, updates capped near 25 fps, cleanup and no new dependencies; no measured CWV claim |

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| MEDIUM | FVG diagram and narrative | Static scene changes with long captions | Timed chart construction and one explanation per stage | Motion explains sequence and directs attention |
| MEDIUM | Timeline and frame data | Three coarse steps | Scrubbing, seven stages, replay and completed-candle tables | Learners can inspect cause and effect without future values appearing early |
| MEDIUM | Narrow chart | Desktop SVG shrunk with tiny labels | Compact coordinates, larger reference labels and readable exact-value strip | Phone users retain useful measurements |
| LOW | Diagram framing and controls | Several nested generic surfaces | Paper/drafting surface, selected-stage strip, original scenario previews | Clearer hierarchy and state cues |

Final browser checks confirmed the compact layout at 390px (document width 384px), the overlap case with no zone/CE, mirrored bearish wick labels and a complete failed-retest ending at 48 seconds. English and Urdu, light and dark, were visually inspected. The final build again passed 1,002 SEO checks and the 783-page crawl. Sitemap recording preserved all existing dates and recorded the single additional changed document; all 755 eligible dates have evidence.

The referenced author's historical performance statistics and trading claims were not incorporated. The animation is educational and does not add a standalone FVG trade signal.
