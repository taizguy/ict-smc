# Chapters 12 and 13 completion record

Implemented: BOS (permanent9/display12) and CHoCH (permanent10/display13), EN/UR, with existing URLs and the approved chapter shell. Local-only work; not pushed, merged or deployed.

Status: **complete locally**. Final production build/prerender exited0, including11,038 SEO checks,847-page crawl, routing/native-language/content guards, strict emitted-claims gate and the unchanged bundle budget. TypeScript exited0. The final build includes the topic-specific clock/range corrections and namespaced outer figure classes; the clock, record, risk and terminology cards no longer inherit inner grid layouts.

Browser evidence:16 checks at1440px and390px, EN/UR and both themes; exact essential static/runtime content parity, body16px/400/30.4px, FAQ16px/400/29.6px, replay targets≥44px and no document overflow. Native FAQ exclusivity and keyboard replay/branch controls tested. Four CSP-script-blocked pages retain full static reading and usable native FAQs. Final asset reload and revision evidence are recorded below.

Final asset reload verified both topic clocks (BOS10:10→10:15; CHoCH10:05→10:10), CHoCH’s separate range replay, all13 outer figures as block layouts with full-width captions, exclusive native FAQs and keyboard interactions. Four additional360px checks passed in EN/UR with no page overflow. CHoCH applied-quiz feedback and score updates were exercised and the test attempt reset. A fresh final preview loaded interactively without console errors. A transient local CSS preload failure during rapid rebuild/navigation was resolved by a fresh reload; it is not represented as a production-network test.

Evidence: `outputs/chapter12-13/final-widget-verification.json`, `360px-checks.json`, `keyboard-and-quiz.json`, `script-free.json`, `browser-parity.json`, final desktop screenshots and the full build log. Both local previews are left open at port4264.

The unchanged bundle budget is retained. Reusing32 Urdu lesson chunks reconstructs the original catalogue exactly while avoiding duplicated fallback copy. No dependency added and no budget override used.

Final measured bundle: initial JS12,330 raw bytes /5,196 gzip; all JS10,523,757 bytes (limit10,621,000); largest chunk1,048,368 bytes; initial CSS623,658 bytes (limit650,000). Evidence: `outputs/practice-performance/bundle-budget.json`. These are build sizes, not Lighthouse/field Core Web Vitals measurements.

Sitemap remains743 URLs, including118 published EN/UR lesson URLs. Only eight changed fingerprints were recorded for the two lessons and their directory/part hubs in both languages; date14November2026. `outputs/chapter12-13/revision-evidence.json` lists them. The existing unrelated520-page revision backlog was not blanket-stamped; unknown dates remain omitted. No URL, permanent ID, status or course-map position changed.

Final metadata:

| Lesson | Title | H1 |
|---|---|---|
|12|Break of Structure (BOS): Rules and Examples \| LearnSMC|Break of Structure (BOS): Rules and Limits|
|13|Change of Character (CHoCH): Rules and Examples \| LearnSMC|Change of Character (CHoCH): The First Warning|

Descriptions, native Urdu counterparts and generated-page checks are recorded in `outputs/chapter12-13/static-verification.json`. Bilingual review exports alongside each chapter report contain336 reviewed translation pairs shared by the two implementations.

Research limits: selected primary passages and live search pages were checked, not the entire playlist or every possible teaching. Parallel deep-research authentication failed; direct research continued. No search-volume estimates, historical price claims or ranking/AI-citation guarantees were invented.

Still unverified: human Urdu sign-off, assistive-technology certification, historical trade outcomes (examples are invented), field CWV and actual Google indexing/ranking. No deployment was requested or performed.
