# Price Playground UI rollout — 2026-10-21

## Implementation

- Shared palette and control styles apply through the application entry point to all routes. White, dark ink, vivid blue and restrained orange replace the previous green interface palette. Market direction colours remain separate.
- Shared header uses a keyboard-accessible library disclosure, language/theme selectors and search. Escape and outside clicks close the library.
- Homepage uses an original interactive Three.js scene, loaded only on that route. Its vendor code is local, licensed under MIT, and has no CDN dependency.
- Scene supports rotation, zoom, replay and concept disassembly. English and Urdu explanations distinguish measurable chart relationships from subjective interpretations.
- Urdu uses translated interface copy and an adjusted RTL composition. Reading surfaces, articles, chapter diagrams, tools, forms and shared buttons inherit the same system.
- GPU drawing occurs when the scene changes; off-screen/hidden scenes do not draw. Unmount disposes the scene. Reduced-motion users receive an immediate chart without its build animation. The static SVG and explanatory copy remain available when WebGL cannot initialize.

## SEO

- Existing canonical routes remain unchanged. No redirects or new indexable scene URLs are necessary.
- Static English and Urdu documents were regenerated, including the homepage's readable fallback.
- Sitemap contains 734 unique URLs with English/Urdu alternates. Only the two homepages received a 2026-10-21 content revision date. Other dates remain unchanged. No pending page revisions remain.

## Review performed

- TypeScript compilation and production Vite compilation succeeded; static prerendering completed for both languages.
- Browser review covered the homepage and scene controls, shared library, curriculum, a lesson, workbench overview, article overview, Urdu homepage, mobile Urdu layout and dark/light switching.
- Fixed RTL heading overlap and canvas clearing after resize during review.
- This is template-level visual review, not an assertion that every individual route or tool workflow was exercised. No automated test suite was added or run.
- Changes are local and have not been pushed, merged or deployed.
