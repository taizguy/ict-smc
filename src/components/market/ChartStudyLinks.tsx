import {useTranslation} from '../../i18n/TranslationProvider';
/** Link plain copy only. Never rewrite headings, markup, question buttons or prices. */
const targets:[string[],string][]=[
 [['Smart Money Concepts','curriculum','نصاب'],'/curriculum/'],
 [['Gold','گولڈ'],'/tools/chartlab/xauusd-gold-legacy-model/'],
 [['inverse fair value gap','inverse fair value gaps','IFVG','انورس فیئر ویلیو گیپ'],'/learn/inverse-fair-value-gaps-ifvg-role-reversal-imbalances/'],
 [['fair value gap','fair value gaps','FVG','FVGs','فیئر ویلیو گیپ'],'/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
 [['order block','order blocks','parent block','آرڈر بلاک','آرڈر بلاکس'],'/learn/order-blocks-ob-and-mitigation/'],
 [['breaker','breaker block','breaker blocks','بریکر','بریکر بلاک'],'/learn/breaker-blocks-trading-failed-order-blocks/'],
 [['liquidity sweep','liquidity sweeps','liquidity','لیکویڈیٹی'],'/learn/liquidity-engineering-and-liquidity-runs/'],
 [['market structure shift','MSS'],'/learn/market-structure-shift-mss-verified-directional-shift/'],
 [['consequent encroachment','CE'],'/tools/glossary/imbalances/consequent-encroachment/'],
 [['Silver Bullet','سلور بُلٹ'],'/tools/masterclass/core-masterclasses/silver-bullet/'],
 [['2022 model','2022-model','2022 ماڈل'],'/tools/masterclass/core-masterclasses/2022-model/'],
 [['propulsion block','propulsion','پروپلشن'],'/learn/core-content-month-4-advanced-pd-arrays-and-yields/'],
 [['market maker buy model','MMBM'],'/learn/core-content-month-7-short-term-trading-and-market-maker-templates/'],
 [['NDOG','NWOG','RTH opening gap'],'/learn/opening-gap-matrices-ndog-nwog-csod/'],
 [['Market Alchemy','مارکیٹ الکیمی'],'/learn/market-alchemy-trading-all-time-highs-ath/'],
 [['Market Foundations','مارکیٹ کی بنیادیں'],'/curriculum/market-foundations/']
];
export function ChartStudyLinks({text,max=2}:{text:string;max?:number}){const {href}=useTranslation();const matches=targets.flatMap(([terms,url])=>terms.flatMap(term=>{const escaped=term.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),re=new RegExp(`(?<![\\p{L}\\p{N}])${escaped}(?![\\p{L}\\p{N}])`,'giu');return [...text.matchAll(re)].map(m=>({start:m.index!,end:m.index!+m[0].length,url}));})).sort((a,b)=>a.start-b.start||b.end-a.end);const chosen:typeof matches=[];const urls=new Set<string>();for(const m of matches)if(chosen.length<max&&!urls.has(m.url)&&(!chosen.length||m.start>=chosen.at(-1)!.end)){chosen.push(m);urls.add(m.url);}let offset=0;const nodes=[];for(const m of chosen){nodes.push(text.slice(offset,m.start),<a translate="no" className="chartlab-inline-link" href={href(m.url)} key={m.start}>{text.slice(m.start,m.end)}</a>);offset=m.end;}nodes.push(text.slice(offset));return <>{nodes}</>;}
