/** Normalize common Urdu/Arabic keyboard variants without changing stored content. */
export function normalizeSearch(value: string): string {
  return value.normalize('NFKC').toLowerCase().replace(/[يى]/g, 'ی').replace(/ك/g, 'ک')
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '').replace(/\s+/g, ' ').trim();
}

export function matchesSearch(query: string, values: readonly string[], translate: (value: string) => string): boolean {
  const needle = normalizeSearch(query);
  return !needle || values.some(value => normalizeSearch(`${value} ${translate(value)}`).includes(needle));
}
