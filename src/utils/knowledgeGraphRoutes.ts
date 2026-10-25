/** Retired graph views consolidate into the single concept-tree document. */
export const retiredGraphPaths = [
  ...Array.from({ length: 10 }, (_, i) => `/tools/knowledge-graph/pipeline/step-${i + 1}/`),
  ...Array.from({ length: 10 }, (_, i) => `/tools/knowledge-graph/step-${i + 1}/`),
  '/tools/knowledge-graph/pipeline/',
  '/tools/knowledge-graph/network/',
  '/tools/knowledge-graph/network/fair_value_gap/',
];
export const retiredGraphAliases: Record<string, string> = Object.fromEntries(
  retiredGraphPaths.map(path => [path, '/tools/knowledge-graph/'])
);
export function retiredGraphTarget(path: string): string | undefined {
  const normalized = path.endsWith('/') ? path : `${path}/`;
  return retiredGraphAliases[normalized];
}
