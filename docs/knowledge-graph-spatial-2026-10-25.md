# Knowledge graph: spatial tree redesign — 2026-10-25

## Live research consulted
- https://vasturiano.github.io/3d-force-graph/example/expandable-nodes/ — opened and clicked a node; observed spatial expansion, orbit and pan instructions.
- https://vasturiano.github.io/3d-force-graph/example/click-to-focus/ — opened and inspected the spatial network.
- https://github.com/vasturiano/3d-force-graph — reviewed public API examples through web research.

## Implementation
Real Three.js scene with lit geometric nodes and animated hierarchy edges, OrbitControls, HTML labels projected into 3D, search-to-focus, branch expansion, zoom/recenter/collapse controls. The hierarchy reuses existing glossary category membership, concept paths and deep-concept parent IDs. It is a teaching taxonomy, not an asserted causal model or complete catalogue of all ICT terminology.

Three.js and addons load on demand. Device pixel ratio capped at 1.6. Renderer skips rendering offscreen/hidden. GPU resources, labels, controls, observers and pointer handlers are cleaned up. Reduced motion makes node and camera transitions immediate. The main graph URL is retained. Retired step/network URLs now permanently redirect to the same-language main graph; see the consolidation report.

Text tree remains available as an accessible fallback with real links. Urdu introduction is included; trading node labels retain their existing English names. Additional interface translations remain a follow-up.

## Browser evidence
Observed: root with seven branches; expand Imbalances (8 → 16 visible nodes); expand Fair Value Gap (16 → 17); search Order Block and select result (ancestors expand, selected inspector and explanation link correct); recenter; dark theme contrast. Duplicate label cleanup found and repaired, then rechecked in accessibility tree and screenshot. Keyboard focus preservation and cancelling camera-flight on manual zoom added.

## Boundaries
390px viewport checked: branch expansion works, no horizontal document overflow (390px viewport / 384px document). Keyboard Enter activation retains focus after expansion. Reduced-motion emulation has not been visually checked in this pass. Not pushed or deployed. The earlier pipeline and reference network have been removed from the interface and canonical route collection.
