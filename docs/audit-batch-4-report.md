# Audit batch 4: final review

Scope: priority metadata, all 21 unit-prefixed snippets, all 118 lecture snippets, every paired Urdu string, permanent curriculum slash handling, legacy mentorship/graph routes, FAQ documentation, measured route payloads and final whole-site verification. No tool-route consolidation, URL deletion, unrelated redirects, meta keywords or date stamping.

## Content and provenance

Home and curriculum now use topic-bearing H1s and retain their former text as visible taglines. Their title tags are preserved. Priority descriptions retain the Trader Abdullah Masood search wording, describe the actual concept distinctions and avoid performance promises. All 118 lecture prefixes are preserved; each new ending is a unique takeaway from that lecture's own visible title, summary or rules. Traceability is recorded in `audit-batch-4-lecture-evidence.json`. No description is padded to a character target. Six summaries were shortened without changing their subject after the existing 155-character editorial check flagged them.

Complete Urdu inventory: `audit-batch-4-urdu-review.md`, covering 154 description pairs, two H1 pairs, the combined retained tagline and one new study-navigation label. Terminology follows existing lesson spellings. Automated checks do not replace the author's Urdu review.

The full crawl exposed twelve Chart Lab orphan documents (six routes in EN/UR) after the earlier shared-view replacement. The same live/static Chart Lab component now contains real links to every study brief. No route was removed or redirected to repair this.

## Routing findings and changes

- `/curriculum` is normalized with a 301 in the existing Worker before the Cloudflare asset handler can emit a 307. `/ur/curriculum` follows the same policy. `wrangler.jsonc` already has `run_worker_first: true`; no host-setting expansion is needed. Worker checks cover both. The live site cannot reflect this change until an approved deployment.
- Source scanning found no production links using `?mentorship=`. The remaining source occurrences are intentional legacy-routing tests. Generated-anchor scanning is part of final verification. Existing lesson links use clean document paths plus a `#mentorship=...` reading preference; the fragment is not a separate server URL. Valid old query URLs retain the existing 301 to that equivalent clean lesson and fragment. No additional query redirects are introduced. GSC's 35 crawled query URLs are historical observations, not evidence of 35 current internal links.
- Existing `/tools/knowledge-graph/pipeline/step-1/` through `step-7/` aliases, in both languages, return 301 to the corresponding language's `/tools/knowledge-graph/`. The target is the current ICT/SMC concept tree, so it is relevant. The prior consolidation remains unchanged; no new redirect is added.

## FAQ documentation

Google retired FAQ rich results on **7 May 2026**; the official [Search Central changelog](https://developers.google.com/search/updates?hl=en) records that retirement in its 8 May entry. Existing visible FAQs and FAQPage markup are retained. No FAQ rich-result work or claim of eligibility is made. Earlier reports with eligibility caveats are updated to state the retirement explicitly.

## Performance method and baseline

Actual HTTP requests were recorded while a browser loaded a local production build, with `Cache-Control: no-store`, optional advertising disabled and no injected application code. Figures count requested JavaScript file bytes, uncompressed; they are not Cloudflare Brotli transfer sizes, Lighthouse scores, LCP, INP or field CLS. The request recorder and raw per-file evidence are in `scripts/audit-payload-server.mjs` and ignored `outputs/audit-batch-4/`.

The baseline is after 4a–4d metadata work and before catalog splitting. The before/after comparison measures the catalog optimization, not the total cost of every metadata change compared with the old live site.

| Route | Baseline JS bytes | Baseline JS requests |
| --- | ---: | ---: |
| `/` | 1,314,791 | 6 |
| `/learn/what-actually-moves-price/` | 2,644,123 | 15 |
| `/tools/chartlab/` | 3,264,622 | 18 |
| `/masood/lectures/masood-syn-4/` | 2,395,453 | 12 |
| `/ur/learn/what-actually-moves-price/` | 4,642,298 | 18 |

The Urdu lesson requested an additional 1,193,523-byte all-chapter catalog and an 804,006-byte shared catalog. The all-chapter request clearly exceeded that lesson's needs. The loader now requests a common chapter UI catalog plus the selected lesson's owned strings. Unknown/dynamic keys remain common; component UI literals and interpolation keys are preserved. Curriculum and unknown-route fallback retain the complete catalog. All 66 complete static lesson documents match the original full catalog byte-for-byte, including quiz, key terms, summary and static illustration content. No required source translation is intentionally removed. Final browser measurements and verification results are recorded below when complete.

### Final measured requests

| Route | Final JS bytes | Final requests | Change |
| --- | ---: | ---: | ---: |
| `/` | 1,314,791 | 6 | 0 |
| `/learn/what-actually-moves-price/` | 2,644,013 | 15 | −110 |
| `/tools/chartlab/` | 3,264,968 | 18 | +346 |
| `/masood/lectures/masood-syn-4/` | 2,395,343 | 12 | −110 |
| `/ur/learn/what-actually-moves-price/` | 3,920,627 | 19 | −721,671 (15.5%) |

The Urdu lesson's chapter dictionaries are now 446,718 bytes common + 15,120 bytes lesson-specific, versus 1,193,523 bytes previously (61.3% less chapter-dictionary JS). One additional small request replaces the monolithic import. The English routes are measured, with no unrelated bundle changes; the few hundred bytes of difference reflect the reviewed snippets and restored study navigation. The vendor and other shared bundles remain visible in the numbers above; no unmeasured Core Web Vitals claim is made. Source evidence: `payload-baseline.json`, `payload-final.json` and `urdu-catalog-parity.json` under the ignored output directory.

## Final verification

- TypeScript passed. Generated build/output artifacts are excluded from source checking; this fixes the observed compiler race with Vite replacing `dist` files and does not exclude application or test source.
- Production Vite compilation and complete prerender passed. The full suite reports **10,936 passed, zero failed**; the crawl checks **787 pages**, all indexable pages reachable from home. Routing, 2025/2026 and Masterclass checks passed.
- The final metadata scan covers 787 documents, including 759 indexable pages: no missing metadata, no duplicate indexable titles/descriptions, unchanged title tags, exact EN/UR description/OG/Twitter parity, all 154 reviewed description pairs and the two H1 pairs. Lecture LearningResource descriptions also use the reviewed summaries.
- Canonical, self/reciprocal hreflang and sitemap checks pass for **759 URLs**. The route inventory is unchanged. Generated internal mentorship-query anchors: **zero**. Fourteen EN/UR graph-step redirects lead to the relevant concept tree. The permanent curriculum slash policy passes Worker tests in both languages.
- Shared reading generation passed for all 254 Batch 2 documents. Fresh static-versus-browser essential heading/paragraph checks passed for **18 snapshots**: normal EN/UR, delayed Chart Lab enhancement, failed entry loading on the four Urdu route families in mobile dark mode, and mobile script-free fixtures. Script-free fixtures are not a browser-engine JavaScript setting. All 66 complete Urdu lesson renders match the full catalog byte-for-byte; representative runtime tab changes remain localized.
- FAQ rich-result expectations corrected, existing markup retained. No date record is stamped: optional sitemap lastmod values are emitted only where existing content evidence still matches; stale evidence is omitted rather than assigned a deployment date.

No enumerated implementation item is deferred. Human Urdu review remains the author's review step. The live `/curriculum` response cannot show the new 301 until deployment, which is explicitly prohibited in this task. This work is published only to a feature branch for review; no main push, merge, production deployment or tool-route consolidation is authorized.

## Files touched in 4e

- Runtime: `src/i18n/loadCatalog.ts`; generated `runtime/chapter-common.json`, 66 `runtime/lessons/*.json` files and refreshed shared/chapters/tools catalogs; `scripts/generate-urdu-runtime.ts`, `scripts/split-urdu-lessons.ts`.
- Routing/navigation: `src/worker.ts`, `scripts/verify-routing.ts`, `src/components/ChartLab.tsx`, `src/i18n/tools-urdu.ts`.
- Metadata/schema follow-up: six shortened values in `audit4Descriptions.json`/`audit4NumberedDescriptions.json`, the combined tagline in `audit4Headings.ts`/`urdu.ts`, and lecture summary alignment in `scripts/seo-content.ts`.
- Checks: `scripts/verify-audit4-production.ts`, `verify-audit4-browser-parity.ts`, `verify-urdu-lesson-catalogs.ts`, `audit-payload-server.mjs`, `tsconfig.json` source-check exclusions.
- Reports: this report, progress log, Urdu exporter/inventory, FAQ corrections in `ict-2025-edition.md`, `masterclass-hub-report.md`, `pilots/market-alchemy-report.md`.
- Unrelated untracked `design/` and the GSC report are excluded. No dependency, lockfile, author-identity, sitemap-date evidence or redirect-catalog changes.
