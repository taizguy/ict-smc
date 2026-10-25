> Superseded: graph step/network documents were consolidated into the main 3D graph on 2026-10-25. The progressive-navigation implementation described below was removed with those views.

# Knowledge-graph navigation — 25 October 2026

## Scope

Enhanced ordinary link activation inside the Knowledge Graph only: its root, ten pipeline steps and dependency map, within the current language. Other page navigation is unchanged. All links retain real, localized hrefs, and every destination retains its generated HTML document.

## Behaviour

- Fetch and validate the destination HTML before changing the address or view. Keep the existing application and styles mounted.
- Synchronize title, description, robots, canonical, hreflang, OpenGraph/X metadata, structured data and the generated heading. Do not execute fetched scripts.
- Push one history entry and update the existing graph view without routing through the loading fallback. Back/forward synchronizes the destination metadata and state too.
- Cancel superseded requests. Cached graph documents support repeated visits. A failed or unexpected document falls back to normal navigation.
- Preserve browser behaviour for modified clicks, new-tab targets, downloads, other origins, other tools, query variants and language changes.
- Focus the updated content heading without forcing a scroll reset. Browser history retains its native scroll handling.

## Verified

- All ten English pipeline steps: matching path, canonical, title, active marker and destination content.
- Previous/advance links, Enter activation, dependency-map switching, back/forward, reload and direct access.
- Urdu step changes/history and matching localized canonicals/hreflang. Language switch retains the current step.
- Ctrl-click opens a separate, normal document tab while the source step stays unchanged.
- Urdu mobile dark-mode transition at 390px, without horizontal overflow; desktop English light-mode transitions.
- Regression fixtures: route whitelist, external/cross-language/query exclusion, failed-fetch fallback and superseded-request cancellation.
- Production build and full SEO/crawl/routing checks: 10,754 SEO checks and 783 generated documents. Existing sitemap/lastmod policy remains unchanged.

Browser verification used the production preview. Local evidence is in ignored `outputs/graph-navigation-*` logs and captures. No public deployment is implied by these local checks.
