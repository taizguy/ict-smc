# Entity and citability claim review — 24 October 2026

## Method and limits

Inspected source generators and the generated HTML for all 388 indexable English routes. Parsed JSON-LD objects inside their graphs rather than assuming only a top-level `author` property counts. A browser spot-check of the live FVG page also confirmed Muhammad Umer Ijaz as author, the author-page URL, dateModified 2026-10-24, four citation entries and seven lists. Urdu uses the same entity data and its generated output is checked during the bilingual build. This is a markup/content-structure review, not a factual review of every source, a live Google Rich Results result, or a measurement of AI citations.

## Findings before this change

| Supplied claim | Finding | Action |
| --- | --- | --- |
| No sameAs anywhere | Incorrect globally: 118 pages identify a cited video's creator with sameAs. LearnSMC's own author had no external identity profiles. | Add the two personal profiles confirmed by the author on 24 October. Keep them off the LearnSMC Organization entity. |
| Dates but no author / visible byline absent from schema | Incorrect for the substantive learning/article templates. All 294 LearningResource pages and 29 BlogPosting pages declare Muhammad Umer Ijaz as author. In total 351 page-level document objects have that author, including other document types. | Preserve the existing Person identity, author URL and dates. Collection/navigation/contact pages need not pretend to be authored articles. |
| No lists or tables | Incorrect globally: 366 routes have HTML ul/ol elements within main, and 19 have tables. Some lists are navigation; this count alone does not establish good editorial structure. | Preserve existing explanatory lists, comparison tables and source lists. Add tables only where they convey an actual comparison. |
| No citations | Incorrect globally: 211 page-level document objects have citation markup. Articles and curriculum lessons also render source references. | Preserve source scope and attribution. No fabricated references or decorative quotations. |
| Citing sources guarantees up to 115% more AI visibility | Unsupported as a general promise. The original GEO paper reports a rank-specific result under its experimental metrics; it is not a prediction for LearnSMC. | Do not publish a visibility promise or optimize to an unexplained scanner score. |

Some navigation pages and tool interfaces appropriately differ from articles. A page without a table, quotation or author field is not automatically defective. Source lists also require editorial checking: the presence of a citation does not verify every claim on the page.

## Implemented

The shared Muhammad Umer Ijaz Person entity now includes `https://github.com/taizguy` and `https://x.com/ChiefAnt_`. The publisher explicitly supplied these as personal identity profiles. Direct automated retrieval of those profile pages was unavailable during this review, so no external verification of account control, biography or credentials is claimed. Visible About-page links use the same destinations in English and Urdu. No Wikipedia/Wikidata identity or professional qualification is invented. Existing article publication and lesson source-review dates are preserved.

## References consulted

- [Google Article structured-data guidance](https://developers.google.com/search/docs/appearance/structured-data/article): Person/Organization authors; a profile URL or sameAs helps author identification.
- [Schema.org sameAs](https://schema.org/sameAs): a reference page must unambiguously identify the same entity.
- [Google AI features and your website](https://developers.google.com/search/docs/appearance/ai-features): no special schema is required for AI features.
- [Aggarwal et al., GEO, version 3](https://arxiv.org/html/2311.09735v3): experimental visibility metrics, domain-dependent effects and limitations. The 115.1% result concerns the fifth-ranked source in that study, not a universal traffic or citation uplift.
