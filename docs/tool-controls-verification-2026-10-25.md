# Workbench control fixes — 25 October 2026

## Confirmed causes and changes

- The animated workspace creates a stacking context. The tool menu's large z-index could not lift it above content in that context. The shared header and content now have explicit, ordered sibling contexts; the menu remains under the global site header and above all workspace content.
- The case selector's open details previously acquired a high z-index. It now expands as an in-flow, full-row panel, with an inset, border and space for all six cases.
- The shared tool switcher closes on outside pointer interaction or Escape. Escape returns focus to its summary; links remain native navigable links.
- Guided secondary actions previously had zero inline padding and inherited raised-button styling. They now have 12px/16px insets, at least 48px height, normal wrapping and quiet surfaces. The plan-edit toggle exposes its expanded state and controls relationship, with a decorative chevron.
- Entry/Stop/Target now share one padded, bordered group; the flush individual divider lines were removed.
- The coach panel uses a neutral surface with a restrained accent. General tool button shadows are lighter. Expandable headings across the workbench have consistent padding and native open/closed markers.

No scenario data, trading condition, fill logic, link destination, source text or indexing directive was changed.

## Browser verification

The following ten root tools were checked in light and dark themes at desktop and 390px mobile widths: Masterclass, Chart Lab, Trade Simulator, Backtest Lab, Trading Journal, Knowledge Graph, Glossary, Compare Matrix, Mastery Profile and ICT Delivery Suite.

Checks covered tool-menu opening, topmost hit-testing, viewport width, textual-control padding/minimum height and document overflow. Outside-click dismissal was checked on all ten desktop light pages; Escape dismissal was exercised throughout menu checks. The exact overlapping Case B selector/menu state was reproduced and passed topmost hit-testing after the correction.

All ten Urdu root tool pages also passed mobile-width menu and control checks, including RTL alignment.

One representative subpage in each section was additionally checked in both desktop themes: core-masterclasses, btc-2022-bullish-model, ict-2022-model, 2022-mentorship-model, log-book, pipeline/step-1, glossary/foundations, fvg-vs-ifvg, profile/roadmap and macro-clock.

Simulator Case B: plan editing opens the Entry/Stop fields, exposes `aria-expanded=true`, and closes through “Finish adjusting.” The question action still produces explanatory feedback. Final production-build captures are under ignored `outputs/tool-ui/`. This is focused UI regression coverage, not a revalidation of every possible trading workflow or every nested URL.

## Build

Production build, canonical/hreflang, schema, reachability and routing checks passed: 10,754 SEO checks; 783 generated pages crawled. Sitemap contains 755 evidenced dates with no changed/new editorial snapshots pending. TypeScript validation passed. No URL or sitemap change was needed for these UI fixes.
