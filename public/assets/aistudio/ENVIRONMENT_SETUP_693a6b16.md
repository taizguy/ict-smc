# Environment setup
Snapshot: **15 November 2026, Asia/Karachi**. Evidence labels: **V** = inspected current source/state; **H** = dated historical report/test; **C** = accessible conversation decision/outcome; **P** = proposed, not approved; **U** = unknown. Source keys resolve in [SOURCES.md](SOURCES.md). Do not treat old chat approvals as standing release authorization. [A01](SOURCES.md#a01) [C03](SOURCES.md#c03) [S01](SOURCES.md#s01)

## Fresh checkout
**V/H:** CI uses Node 22; old local history export uses Node 24 Zstandard support. Application dependencies are lockfile-managed. Do not copy node_modules links, the worktree's .git pointer or account credential directories. Python 3 serves the standalone preview; no Python production backend is established. [S66](SOURCES.md#s66) [S02](SOURCES.md#s02) [S03](SOURCES.md#s03) [P01](SOURCES.md#p01) [A01](SOURCES.md#a01)

```sh
git clone https://github.com/taizguy/ict-smc.git
cd ict-smc
git fetch origin
git log -5 --oneline
npm ci
npm run lint
npx vite --host 127.0.0.1 --port 4260 --strictPort
```
These are setup instructions, not commands executed by this documentation task. Check remote state/owner access before work. [S02](SOURCES.md#s02) [S19](SOURCES.md#s19) [S31](SOURCES.md#s31) [C03](SOURCES.md#c03)

## Verification commands
| Command | Meaning / boundary | Source |
|---|---|---|
| `npm run lint` | TypeScript (`tsc --noEmit`), not ESLint. | [S02](SOURCES.md#s02) |
| `npm run build` | Full release generation/prerender/checks plus strict emitted claims. | [S02](SOURCES.md#s02) [S13](SOURCES.md#s13) [S53](SOURCES.md#s53) |
| `npm run test:seo` | Current dist-based SEO/crawl and route/chapter guards; requires current generated output. | [S02](SOURCES.md#s02) |
| `npm run verify:claims` | Context-aware strict emitted-output scan. | [S02](SOURCES.md#s02) [S53](SOURCES.md#s53) |
| `npm run verify:bundle` | Maintained measured budgets, no casual override. | [S02](SOURCES.md#s02) [S20](SOURCES.md#s20) |
| `npm run preview -- --host 127.0.0.1 --port 4252` | Local production preview after build, not deployment. | [S02](SOURCES.md#s02) |
| `npx tsx scripts/verify-silver-lesson.ts` | Chapter 64 geometry/timing/static/head/schema checks. | [S22](SOURCES.md#s22) [S02](SOURCES.md#s02) |
| `npx tsx scripts/verify-silver-browser-evidence.ts` | Validates saved recordings; does not collect a fresh browser test. | [S22](SOURCES.md#s22) |

**C/H:** During focused work run TypeScript plus targeted checks; use the full suite at a final release checkpoint. Avoid concurrent generation/watchers writing the same files. The old Windows-only `outputs/chartlab-five/node-runner.cjs` workaround is environment-specific, not a universal build dependency or test bypass. Try normal fresh Node commands first. [S01](SOURCES.md#s01) [S22](SOURCES.md#s22) [A01](SOURCES.md#a01)

## Environment names — no values migrated
`VITE_ADSENSE_ENABLED` is a public build gate, default off in documented setup; `GOOGLE_SITE_VERIFICATION` is an optional public verification mechanism; `VITE_URDU_PREVIEW` is a review switch while the inspected release flag is currently true; `DISABLE_HMR` is dev watcher configuration. AI Studio-era example names do not prove an active AI backend. Never put secrets in VITE variables or copy actual .env/auth files. [S35](SOURCES.md#s35) [S63](SOURCES.md#s63) [S19](SOURCES.md#s19) [S02](SOURCES.md#s02) [C03](SOURCES.md#c03)

## Hosting
Cloudflare: project ict-smc, entry src/worker.ts, dist ASSETS, run_worker_first; preserve real 404 and canonical normalization. GitHub Actions are a subset of the local suite. Dashboard/account settings, integration credentials and deployment state require owner reconnection/verification. Do not deploy as part of migration. [S18](SOURCES.md#s18) [S17](SOURCES.md#s17) [S49](SOURCES.md#s49) [S66](SOURCES.md#s66) [S31](SOURCES.md#s31) [S35](SOURCES.md#s35) [C03](SOURCES.md#c03)

## Translation/content preservation
Use the authoritative plan/status, native data models, generated catalogues, route-aware Urdu loader and static renderers together. Do not hand-edit only generated JSON, stamp revisions from every build or assume source/runtime trees match. [S05](SOURCES.md#s05) [S06](SOURCES.md#s06) [S08](SOURCES.md#s08) [S13](SOURCES.md#s13) [S15](SOURCES.md#s15) [S16](SOURCES.md#s16) [S10](SOURCES.md#s10) [S01](SOURCES.md#s01)

## Restore paused preview only
Copy PRIVATE/paused-homepage to ignored outputs/home-apple if needed, then serve locally with `python -m http.server 4256 --bind 127.0.0.1` from that folder. Existing generated files work standalone; build.py expects repo-relative plan and dist manifest. Never move it into public/dist or enable production release without approval. [P01](SOURCES.md#p01) [P02](SOURCES.md#p02) [C01](SOURCES.md#c01) [S01](SOURCES.md#s01)
