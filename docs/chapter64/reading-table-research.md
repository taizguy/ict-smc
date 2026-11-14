# Reading and table presentation research

14 November 2026. Design exploration only; no chapter copy, production components, heading levels or data changed. English-only local prototype to limit scope.

## Live sources reviewed

- [Stripe payment guide](https://stripe.com/guides/introduction-to-online-payments): inspected its long article and the payment-fundamentals section, including persistent contents navigation, heading spacing, open prose, and labelled lists. Its business claims and payments copy are not reused.
- [IBM typography basics](https://www.ibm.com/design/language/typography/type-basics/): inspected alignment, comfortable reading, container padding, line lengths and heading hierarchy. Retain LearnSMC’s fonts and confirmed 16px/400/1.9 body standard; do not adopt IBM's font or scale blindly.
- [Carbon data tables](https://www.carbondesignsystem.com/components/data-table/usage/): inspected live guidance and rendered example table. Useful principles: clear headers, coherent spacing, data alignment, sensible density, and optional interactions only when the task calls for them. Dashboard toolbars, pagination and selection are unnecessary for a short educational comparison.
- [NN/G comparison tables](https://www.nngroup.com/articles/comparison-tables/): read the opening explanation and summary: consistent content, scannability and simple layout support comparison. Educational data and prose remain actual HTML, not screenshots or click-generated content.

Queries covered editorial article layouts, IBM type basics, Carbon table usage, Stripe guides and NN/G comparison-table guidance. No ranking, learning-outcome or universal usability improvement is claimed from these observations.

## Proposed system

- Prose: keep the existing type standard; use a controlled measure, strong section landmarks, deliberate paragraph/section spacing, and a small number of precise highlights. Preserve long explanations as readable prose. Do not put every paragraph in a card.
- Definitions/formulas: a restrained rail or band distinguishes an important statement without duplicating it as a pull quote. Preserve original wording, order and semantic extraction containers when applied to the chapter.
- Lists: real lists, with clear spacing and alignment. Procedures can use a numbered rail; ordinary prose must not be arbitrarily converted into bullets.
- Comparison tables: native caption, column/row headers, coherent padding, restrained row rules, and limited column tinting where it aids comparison. Keep labels as well as colour.
- Numerical tables: tabular numerals, right-aligned numeric fields, explicit units and a visually identifiable output column. No fake sorting, filters or calculator controls on a four-row reference table.
- Mobile: preserve comparison relationships in a labelled, focusable scroll region, with a pinned row-label column. Keep browser zoom/text scaling. Do not flatten a meaningful matrix into unrelated cards or hide columns.

## Three CSS-only directions

1. Editorial flow: heading in a calm margin, prose alongside it, table spanning the wider grid.
2. Atlas reading: strong cobalt section landmarks and subtle blue/peach comparison columns, paired with open, normally sized prose.
3. Study journal: continuous ruled reading sheet, quiet formula treatment and ledger-style numeric table.

Prototype: http://127.0.0.1:4254/ (`outputs/reading-study/`). All three directions use the same complete manuscript blocks from sections 6 and 14. Headings, paragraphs and table data are generated directly from `silverLessonDocument`; emphasis adds markup, not rewritten words. No content is fetched or injected when a design is selected. Theme and optional highlights are controls for review, not new lesson features.

## Recommendation for discussion

Combine Editorial flow's prose rhythm with Atlas reading's comparison tables, using the latter's bolder section bands selectively. This is a proposed direction, not an approved site-wide standard. Urdu implementation, a full assistive-technology audit and integration with the actual chapter are not claimed for this isolated study.
