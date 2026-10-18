/** Cloudflare counts every rule after the first pattern as dynamic. Keep exact aliases first. */
export function orderRedirectRules(content: string): string {
  const comments: string[] = [], exact: string[] = [], patterns: string[] = [];
  for (const line of content.split(/\r?\n/)) {
    const parts = line.trim().split(/\s+/);
    if (!line.trim()) continue;
    if (line.trim().startsWith('#')) { comments.push(line); continue; }
    if (parts.length !== 3) throw new Error(`Malformed redirect rule: ${line}`);
    const isPattern = parts[0].includes('*') || /(?:^|\/)\:[A-Za-z]/.test(parts[0]);
    (isPattern ? patterns : exact).push(line);
  }
  if (exact.length > 2000 || patterns.length > 100) throw new Error(`Cloudflare redirect budget exceeded: ${exact.length} exact, ${patterns.length} patterns.`);
  return [...comments, '', '# Exact aliases precede every wildcard fallback', ...exact, '', '# Pattern fallbacks', ...patterns, ''].join('\n');
}
