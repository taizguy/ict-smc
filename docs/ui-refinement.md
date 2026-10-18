# Light UI refinements

The supplied references informed selective sentence color, soft raised controls and restrained depth. The implementation keeps the existing white canvas, fonts and original illustrations.

- `AccentText` translates a complete sentence before emphasizing a phrase. The static HTML localizer follows the same rule, preserving Urdu word order and crawlable heading text.
- The homepage study trail links to curriculum, comparisons and chart replay. Its key-like controls use CSS borders, gradients and shadows, with no 3D engine or animation dependency.
- Homepage cards are ordinary document links with keyboard focus states. Tool icons have subtle raised edges. Article cover cards and takeaway notes gain light paper-like depth.
- Hover movement is restricted to a fine pointer and a no-reduced-motion preference. Mobile layouts stack the study trail at 600 px. Urdu accents use color without underlining connected script.
- Existing article illustrations, numerical calculators, chart direction, source citations and saved-data formats are preserved.

Reviewed locally at desktop and 320 px mobile width, including Urdu trail links and the English article headline/sidebar. TypeScript compilation and Vite/static generation are the implementation checks used; no new test suite was added.
