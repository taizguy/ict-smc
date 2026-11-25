# Architecture
Snapshot: **15 November 2026, Asia/Karachi**. Evidence labels: **V** = inspected current source/state; **H** = dated historical report/test; **C** = accessible conversation decision/outcome; **P** = proposed, not approved; **U** = unknown. Source keys resolve in [SOURCES.md](SOURCES.md). Do not treat old chat approvals as standing release authorization. [A01](SOURCES.md#a01) [C03](SOURCES.md#c03) [S01](SOURCES.md#s01)

## Stack and entry points
**V:** React 19 + TypeScript, Vite 6 and Tailwind 4, with substantial scoped CSS. Lightweight Charts, Three.js, Motion, Lenis and Lucide support charts/3D/motion/icons; parse5, tsx and resvg support generation/checks/social art. Express and Google GenAI are declared dependencies, but an active application backend or Gemini call is not established by inspected entry/worker code. [S02](SOURCES.md#s02) [S19](SOURCES.md#s19) [S10](SOURCES.md#s10) [S17](SOURCES.md#s17)

```text
TS/JSON content + publication plan
  -> catalog/case/Urdu generation -> Vite assets
  -> prerender + localized documents + social/sitemap/host files
  -> generated HTML served by Cloudflare ASSETS
  -> optional staged React enhancement / deferred practice modules
```
This is an architectural description of inspected sources, not a new execution trace. [S02](SOURCES.md#s02) [S11](SOURCES.md#s11) [S13](SOURCES.md#s13) [S15](SOURCES.md#s15) [S17](SOURCES.md#s17) [S18](SOURCES.md#s18)

**V:** `main.tsx` imports style layers then loads `startApp`; selected practice enhancement is deferred. `App.tsx` parses route state and selects lazy views; do not assume React Router. Locale detection, custom i18n JSX runtime, TranslationProvider and route-aware Urdu chunks provide native EN/UR. [S11](SOURCES.md#s11) [S12](SOURCES.md#s12) [S16](SOURCES.md#s16) [S19](SOURCES.md#s19) [S63](SOURCES.md#s63)

## Rendering contract
**V/C:** Static and runtime trees are not universally identical. `startApp.tsx` deliberately stages `createRoot`: preserve reading HTML, mount an audited enhancement offscreen/inert, then promote that mounted container on readiness so event delegation remains intact. Failure paths retain/restore readable content. Do not swap to `hydrateRoot` or remove startup gates without proving parity. [S10](SOURCES.md#s10) [S61](SOURCES.md#s61) [S01](SOURCES.md#s01)

**V:** The prerender pipeline writes full content/links, native Urdu, heads/schema, social images, manifest, sitemaps, redirects and genuine 404 output. `build:content` is followed by the final strict emitted-claims scan in `npm run build`; do not treat the former alone as the release gate. [S02](SOURCES.md#s02) [S13](SOURCES.md#s13) [S14](SOURCES.md#s14) [S15](SOURCES.md#s15) [S53](SOURCES.md#s53)

## Content and state schemas
| Domain | Source of truth / relationships | Evidence |
|---|---|---|
| Curriculum plan | Permanent id, display position, part, slug, bilingual title/description, keyword/status and optional SEO variants. 01–97 display positions are not permanent IDs. | [S05](SOURCES.md#s05) [S06](SOURCES.md#s06) |
| Chapter content | Typed chapters + bespoke rebuilt document renderers. Current document IDs are 1,4,7,9,10,13,1010,1031,1064. | [S07](SOURCES.md#s07) [S40](SOURCES.md#s40) |
| Publication | Plan status controls placeholder noindex/schema/sitemap/progress exclusions; content must exist before publishing. | [S05](SOURCES.md#s05) [S06](SOURCES.md#s06) [S30](SOURCES.md#s30) [S36](SOURCES.md#s36) |
| Shared practice | CaseFile: bilingual identity/session/timeframe; term/chapter references; conventions; OHLC; levels; nullable plan; variants/outcomes; difficulty/minutes; goals/limits/sources/review; tool availability. | [S24](SOURCES.md#s24) |
| Bars and execution | Explicit UTC opens in new studies; helper closes, tick/geometry/DST checks; unresolved OHLC order is not a unique fill path. | [S22](SOURCES.md#s22) [S24](SOURCES.md#s24) [S62](SOURCES.md#s62) |
| Glossary/masterclass | Native source collections with canonical route helpers and generated catalogues; preserve identities/URLs. | [S27](SOURCES.md#s27) [S41](SOURCES.md#s41) [S42](SOURCES.md#s42) [S54](SOURCES.md#s54) |
| Articles | Original structured intro/sections/source/link/visual-series data; saved /articles route count includes hubs. | [S43](SOURCES.md#s43) [S09](SOURCES.md#s09) |
| Revision ledger | Changed content fingerprint, actual lastmod and evidence; no blanket date stamping. | [S01](SOURCES.md#s01) [S13](SOURCES.md#s13) [S14](SOURCES.md#s14) [S22](SOURCES.md#s22) |
| Personal state | Browser localStorage, progress keys and per-tool serialized values. No cloud synchronization is established. | [S36](SOURCES.md#s36) [S37](SOURCES.md#s37) [S33](SOURCES.md#s33) |

**V/U:** No relational DB, ORM migrations, user-account server or broker execution API is established by inspected runtime/worker/configuration. Current Worker Env declares ASSETS only. This is a bounded observation, not proof that no historical experiment ever existed. [S17](SOURCES.md#s17) [S18](SOURCES.md#s18) [S02](SOURCES.md#s02) [A01](SOURCES.md#a01)

## Hosting and integration
**V:** Canonical host is `https://learnsmc.xyz`. Worker project `ict-smc` uses `dist`, ASSETS, run-worker-first and real 404 handling; normalizes host/HTTPS and approved curriculum/graph migrations. `vercel.json` is alternate hosting configuration, not proof of a current Vercel deployment. Hashed assets have immutable cache rules. [S17](SOURCES.md#s17) [S18](SOURCES.md#s18) [S49](SOURCES.md#s49) [S35](SOURCES.md#s35)

**V/H:** GitHub CI uses Node 22 and Chart Lab data/originality + TypeScript checks, a subset of the full release suite. Cloudflare dashboard credentials/settings and current deployment health are UNKNOWN here. AdSense activation is gated; GSC/ads require separate owner account checks. [S66](SOURCES.md#s66) [S02](SOURCES.md#s02) [S31](SOURCES.md#s31) [S35](SOURCES.md#s35) [S52](SOURCES.md#s52)

## Preserve boundaries
Private migration history/prototypes are not app assets. The Apple homepage is vanilla HTML/CSS/JS under ignored outputs, not integrated with React, native Urdu or production SEO/parity/claims checks. Account-local skill/browser/plugin state is not part of npm setup. [P01](SOURCES.md#p01) [P02](SOURCES.md#p02) [C02](SOURCES.md#c02) [S01](SOURCES.md#s01)
