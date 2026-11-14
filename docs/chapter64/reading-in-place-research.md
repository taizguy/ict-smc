# Second reading/table research pass — existing layout retained

14 November 2026. The previous standalone layouts were rejected. This pass serves the actual built chapter, its existing JavaScript and assets, with a separate local stylesheet. No chapter manuscript, application component, production stylesheet or layout definition is changed. All prototype outputs are ignored and local-only.

## Research and editorial decisions

### 1. iOS clarity

Sources inspected live:
- https://developer.apple.com/design/human-interface-guidelines/layout — visual hierarchy, alignment, grouping, adaptability, readable content versus controls, and RTL/text-size considerations.
- https://support.apple.com/guide/iphone/create-and-format-notes-iph1ac0b3a2/ios — actual Apple Notes guidance page and its iPhone imagery.

Apply: quiet grouped table surfaces, rounded containment, subtle separators, softer secondary column headers, strong but normally sized section headings, and a restrained definition/formula surface. Keep text clear and avoid decorative glass beneath long paragraphs. Do not import Apple fonts, icons, logos or an iPhone shell. This is iOS-inspired web presentation, not a verified native iOS component or a clone. Keep LearnSMC's Source Sans 3 at 16px/400/1.9 even though native platform defaults may differ.

### 2. Linear precision

Sources inspected live:
- https://linear.app/now/design-is-more-than-code — actual long-form page, typography, paragraph cadence and hierarchy, not just a marketing thumbnail.
- https://www.carbondesignsystem.com/components/data-table/usage/ — retained earlier research on table anatomy, alignment, spacing and appropriate interaction density.

Apply: sharper type hierarchy inside existing section positions, narrow accent rule, open paragraphs, a fine-lined formula panel and technical comparison tables. Numeric exposure remains aligned and tabular. Short educational tables do not need dashboard search, selection, pagination or fake sorting. The table is our design synthesis; it is not presented as a copied Linear component.

### 3. Reader focus

Sources inspected live:
- https://docs.readwise.io/reader/docs/faqs/appearance — reading appearance, themes, line width/spacing and direction options.
- https://www.nngroup.com/articles/comparison-tables/ — retained comparison research: consistent content and scannable attributes.

Apply: preserve the site's serif section-heading identity, calmer paragraph spacing, a single warm extraction rail, and a ledger-like table with alternating restrained rows. Keep the original page rails: the user's layout constraint overrides a reading app's option to hide/rearrange panels. Native Readwise defaults are not adopted. No logged-in/native Reader app test was performed.

## Scope and proof

Preview: http://127.0.0.1:4255/learn/silver-bullet-model/ . Review controls offer three treatments; the controls can be hidden. The preview adds noindex headers and robots blocking and reads production artifacts without writing them.

Source: outputs/reading-in-place/server.py and study.css. The stylesheet targets only chapter text, extraction containers and manuscript tables. No header, hero, library, contents, grid-template or article-width selectors are overridden.

At 1440px, browser measurements match the original exactly for the reading-room grid, article x/width, library x/width, local contents x/width and hero-heading x/width in all three modes. Every essential paragraph, manuscript table cell and section heading is identical. Body remains Source Sans 3, 16px, 400, 30.4px. At 390px in dark theme, all three modes have no page overflow; all eight manuscript table regions are contained and keyboard-focusable.

Evidence: outputs/reading-in-place/baseline.json; ios-check.json; precision-check.json; reader-check.json; screenshots for each desktop/light and mobile/dark treatment. Native table semantics, initial HTML and existing images/animations are retained.

## Limits

These are English review treatments, not a site-wide selection or release. They are not applied to the application. No full accessibility audit, human Urdu review, performance certification or deployment is claimed. Source observations establish design guidance, not a guaranteed learning outcome.
