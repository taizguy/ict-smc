# Workbench & Lab: three independent UI studies

Research and previews: 27 October 2026. Production styling remains the last pushed version. The earlier white-background, blue-action and palette experiments were reverted and are not part of these studies.

## Brief and preserved material

The user requested live Web3/Pinterest/Dribbble research and three different Workbench designs, including different colour systems, content alignment and navigation. They previously rejected oversized controls, heavy headings, repeated rounded boxes and generic palette-swap mockups.

The source material is the ten-item `WORKBENCH_TOOL_CATALOG` in `TradingToolsOverview.tsx`. The previews preserve the names, descriptions, features and destinations. No fake balances, win rates, popularity metrics, user history, wallet functionality or trading results were added. Artwork is explicitly illustrative. Display headings and explanatory interface copy are proposal copy, not changes to published educational text.

## Live references actually inspected

| Reference | Observation / decision |
|---|---|
| [Pinterest Web3 website search](https://www.pinterest.com/search/pins/?q=web3%20website%20design) | Public results initially showed a sign-in overlay, then loaded. Inspected the visible reference wall: sharp editorial layouts, strong colour blocking and alternative composition. No pins were saved or source images copied. |
| [Dribbble Web3 dashboard search](https://dribbble.com/search/web3-dashboard) | Inspected dashboard previews for information density, navigation and relationships between panels. The mockups were not treated as proof of working usability. |
| [Behance Orderflow branding](https://www.behance.net/gallery/249388707/Orderflow-Crypto-Trading-UIUX-Branding) | Inspected cover, typography/identity and later branding panels. Learned restrained dark branding; did not claim to have verified a working trading product. |
| [Behance Crypto Exchange App case study](https://www.behance.net/gallery/242415307/Crypto-Exchange-App-Platform-Web3-UIUX-Case-Study) | Inspected actual screen compositions, compact controls and contextual panels. Did not borrow its visual assets or oversized promotional headlines. |
| [Hyperliquid trading app](https://app.hyperliquid.xyz/trade) | Inspected the loaded market/chart/order-book interface read-only. Used the principle of compact task navigation and contextual inspection. No connection, order or financial interaction. |
| [Morpho public site](https://morpho.org/) | Inspected its public hero and product sections: restrained text, deliberate technical drawing and controlled motion. The app required acceptance of terms; those were not accepted and its gated interface was not audited. |
| [Base](https://www.base.org/) | Inspected hero and product sections: strong blue/white identity and concise sections. Rejected nonessential cookies. No logo walls, claims or branded diagrams copied. |
| [Privy](https://www.privy.io/) | Inspected the split hero and product presentation: a deliberate separation of explanation and product context. |
| [LayerZero](https://layerzero.network/) | Inspected visible mid-page editorial/product alignment, whitespace and restrained controls. Its animated first screen was not fully evaluated. |

## Original directions

1. **Study Terminal** — a graphite/green-grey app screen with a left category rail, central directory rows and right inspector. Search and category filtering update a contextual selection; keyboard selection works. Source Sans 3, compact headings and mostly flat surfaces. No decorative dashboard metrics.
2. **Field Index** — a white editorial directory with Lora headings, Source Sans 3 interface text and vermilion actions. Asymmetric featured material leads into grouped, unboxed tool entries. Native expandable feature lists; sticky filter/index on desktop. The structure is deliberately different from the terminal.
3. **Workshop Canvas** — a cobalt workspace, lime/white/rose category planes and a straight readable tool inspector. Bounded perspective movement is confined to a real tool selector, with reduced-motion fallback. Phone layout uses flat readable category lanes. A complete conventional list remains below the spatial selector.

The previews are isolated under ignored `outputs/workbench-ui-study`, served at localhost port 4206. Production HTML, internal URLs and sitemap entries are unchanged. English preview copy only; Urdu integration and complete light/dark treatment belong to the selected production direction.

## Verification

- All three contain all ten catalogue items and original tool destinations. Static checks matched links against the built route manifest and checked local assets, one H1/main and prototype noindex directives.
- Browser checks: category count 3 for Practice, journal search 1 result, no-result empty state, keyboard tool selection, correct inspector destinations and expandable features.
- All three inspected at 1440px desktop and 390px phone width with no horizontal page overflow. Mobile selection updates the inspector. Canvas flattens to category lanes on phones.
- Source Sans 3 and Lora use the existing local font files, with their OFL license copies. No external font request or new site dependency.
- Actual screenshots and interaction results are saved under the ignored preview output directory. No production build was necessary because the application source was not changed.

These are proposals for choosing a direction, not a claim that the tool internals have been redesigned or that every production state has already been integrated.
## Approved hybrid implementation — 2026-10-27

Applied the selected charcoal/blue editorial welcome and dense study directory to `/tools/` and its Urdu counterpart. Kept tool URLs and existing metadata, and limited style rules to `.study-workbench`. No prototype routes are published. Search, purpose filters, selection and native links remain keyboard accessible. All ten tools have static HTML links; the prerendered directory uses the same descriptions as the visible catalog. The PO3 animation is an illustrative scenario, supports pause/reduced motion, and disposes its animation frame, media listener and observer on unmount.

Browser checks: Practice 3, Reference 4, Review 3, All 10; journal search 1; Backtest opens `/tools/backtest/`; 390px mobile layout has no horizontal overflow; English/Urdu rendering checked; light and dark surrounding themes checked. Existing large-bundle build warnings remain outside this page's scope.
