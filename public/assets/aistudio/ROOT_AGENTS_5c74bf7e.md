# LearnSMC publishing requirements

## Chapter visual direction — confirmed 14 November 2026
- Default animation direction across all 97 curriculum chapters is the approved local Motion Study 02 (`outputs/silver-cinema/`): physical 3D candles, directed camera transitions, readable straight-on measurement views, projected annotations, time as part of the scene, and distinct authored outcome branches. Adapt composition, timing and objects to the concept; do not force every topic into the same candle scene.
- This approval is a future-work standard, not an instruction to bulk-replace existing chapter animations. Preserve accurate prices, OHLC/time geometry, explicit synthetic-example labels, captions/text fallbacks, keyboard controls, pause/replay and reduced-motion support. Never imply that graphic reveals are observed intrabar ticks.
- Default static-illustration direction across all 97 chapters is the approved Colour-block Atlas (`outputs/static-style-study/`, direction 02): flat colour fields, bold numerical typography, precise 2D diagrams, explicit labels and units, and purposeful split compositions. It is separate from the 3D animation language; do not reuse animation stills as the static style.
- Both approved directions are adaptable systems, not repeated templates. Change composition, layout, scale, palette balance and diagram type to suit each chapter/image. Preserve the overall visual identity without forcing every image into the same layout. Approval does not authorize a bulk replacement of all existing chapter visuals.
- Text/table presentation studies must preserve the existing chapter page layout: hero placement, article column, library rail, contents rail and responsive structure. Preview proposed treatments inside the actual page shell; a request to restyle prose or tables is not permission to reorganise the page.

- Default prose/table presentation across all 97 chapters is the approved iOS Clarity treatment: restrained sans-serif hierarchy, open prose, softly grouped definition/formula panels, rounded semantic tables, subtle separators and readable numeric alignment. Adapt it to each chapter without changing the page layout or body/FAQ typography tokens. This is a future-work standard; do not bulk-restyle existing chapters without authorization.

## Chapter typography standard — confirmed 11 November 2026
- New or revised chapter body paragraphs and ordinary lists use Source Sans 3 (`var(--font-sans)`), 16px, weight 400, line-height 1.9 (30.4px). FAQ answers use the same family, 16px and weight 400, line-height 1.85 (29.6px). Apply consistently on mobile/desktop and light/dark themes; retain browser zoom and accessible text scaling.
- Reuse the shared `--lesson-body-size`, `--lesson-body-leading`, and `--lesson-faq-leading` tokens in `src/styles/lesson-semantics.css`. Do not introduce page-specific serif/21px overrides for ordinary prose or FAQ answers. Headings, tables, captions and interface labels keep their own hierarchy. Verify computed styles before reporting completion.

- Before creating a page or materially revising its search metadata, research its primary query, natural query variants, intended learner and competing search results. Record the queries, consulted URLs, date, intent and editorial decision in `docs/`. Search-result observations do not establish keyword volume or a guaranteed ranking.
- Write a specific title, H1 and meta description that name the actual topic naturally. A motivational deck or hook is not automatically a useful search description. Keep established URLs unless a verified migration need exists. Do not add meta keywords for Google.
- Keep English and Urdu metadata language-specific, with self-canonicals and reciprocal `en`, `ur` and `x-default` annotations. Verify the actual document head, not SVG `<title>` elements. A translated search result alone does not prove a localization bug.
- Check generated static HTML, social metadata, structured data, contextual links and sitemap revision evidence. Distinguish technical validation from keyword/editorial review, live deployment and actual Google indexing. Do not describe pages as fully SEO-verified based only on tag-presence tests.
- Keep the root project instruction that `sources/` is read-only. Do not publish research outputs or unrelated design prototypes.

## Supplied chapter documents — mandatory content fidelity
- Ask the user BEFORE adding, removing, condensing, correcting or rewording any supplied chapter content. Do not silently treat the supplied article as a research brief to rewrite.
- Preserve exact English headings, hierarchy, wording, order, lists and table structures. Urdu must preserve the same meaning and structure naturally.
- Keep supplied learner copy distinct from authoring instructions; implement the playbook without publishing process notes. Flag conflicts or factual concerns for approval, never silently resolve them by changing copy.
- Chapter publication baseline confirmed by the user: 15 October 2026. Show the genuine chapter-specific last-update date beside the author when that chapter is rewritten; never blanket-stamp other chapters.
- Keep authorised verified references. Restrained text highlights and accessible animated FAQ disclosure cards are authorised presentation changes.

## Semantic HTML and author privacy — confirmed 11 November 2026
- Rebuilt chapters place their semantic main/article before the heavy library and contents rails in source order; keep the existing visual columns and exactly one main landmark. Preserve keyboard order, skip-link targets and mobile drawer behaviour.
- Primary definitions and formulas use scoped semantic extraction containers. Use itemprop="description" only within a valid itemscope/itemtype, with a matching name; never present a heuristic as an empirical formula. Preserve representative JSON-LD. These attributes do not guarantee AI citations or rankings.
- FAQs use native details/summary with all answers in initial HTML and name-based exclusive groups. Add motion progressively with reduced-motion support; opening/closing must work without JavaScript.
- Person schema contains public identity fields (name, URL, confirmed profiles), not email, telephone, street address or other unnecessary contact details. Public contact-page content is a separate decision.
- Check reader-facing headings, captions and copy for research/authoring labels before release. Do not publish labels such as "Quick Definitions for AI and Skimmers". Keep other supplied copy verbatim; get approval before further editorial changes.
- Verify these conventions in EN/UR, raw HTML, both themes and mobile. Keep actual content-review dates; a technical schema cleanup is not a blanket content refresh.


## Continuity and migration guardrails — 15 November 2026
- Read PROJECT_CONTINUITY/HANDOVER_INSTRUCTIONS.md and PROJECT_CONTINUITY/CURRENT_STATUS.md before continuing; its source-cited ten-document package and SOURCES.md are the current handoff. Earlier root continuity documents are preserved as historical context. Current user instructions override historical chats; distinguish verified implementation, saved evidence, merge state, deployment and Google decisions.
- The homepage at outputs/home-apple/ is a paused standalone prototype. Do not push, merge, deploy, integrate it or move it into public/dist without new explicit approval. Preserve it and its evidence; a Git clone alone omits outputs/. The migration delivery contains a private backup.
- Keep new work on a suitable feature branch (normally codex/). Earlier approvals to merge/deploy were release-specific, not standing authorization. No URL deletion/consolidation or unrelated redesign without approval.
- Apply iOS Clarity beyond tables to hierarchy, spacing, grouping, controls, disclosures and restrained feedback/motion; preserve the chapter shell and shared body/FAQ typography. Adapt per topic; do not bulk-change existing chapters under a future-work standard.
- Announce shared-component edits before making them. Batch independent inspection and use targeted checks during work; run full release checks at an appropriate final checkpoint. Do not weaken claims/parity/bundle guards or invent review dates to pass.
- Migration archives and original conversation/resource exports are private handoff material, never public site assets. Do not copy account credentials, real environment files, raw tool/session logs, passwords or private keys. Reauthenticate external services through the owner.

## Source-cited continuity maintenance
- For significant continuity claims, cite actual source files, commit evidence, dated verification or specifically accessible conversations. Mark unknowns explicitly; do not infer another account/thread is accessible. PROJECT_CONTINUITY/PRIVATE is a private, Git-ignored preservation area, not a production source or release authorization.
