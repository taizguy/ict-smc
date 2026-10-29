import { parse } from 'parse5';

export const normalizeReading = (value: string) => value.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
export type ReadingText = { kind: string; text: string; normalized: string };
const attribute = (n: any, key: string) => n.attrs?.find((a: any) => a.name === key)?.value;
const text = (n: any): string => n.value || (n.childNodes || []).map(text).join(' ');
/** Keep this explicit list identical in the browser collector. No blanket tab exclusions. */
export function essentialReading(source: string): ReadingText[] {
  const result: ReadingText[] = [];
  const visit = (node: any, main = false, excluded = false) => {
    main ||= node.tagName === 'main';
    const classes = (attribute(node, 'class') || '').split(/\s+/);
    excluded ||= ['svg','nav','footer','script','style'].includes(node.tagName) || ['market-credit','market-ohlc'].some(c=>classes.includes(c)) || attribute(node,'data-live-reading') === 'clock';
    if(main && !excluded && /^(?:p|h[1-3])$/.test(node.tagName || '')) {
      const value = text(node).replace(/\s+/g,' ').trim();
      if(value) result.push({kind:node.tagName,text:value,normalized:normalizeReading(value)});
    }
    for(const child of node.childNodes || []) visit(child,main,excluded);
  };
  visit(parse(source));
  return result;
}
