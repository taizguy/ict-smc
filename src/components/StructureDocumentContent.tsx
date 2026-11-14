import type{ReactNode}from'react';
import{useTranslation}from'../i18n/TranslationProvider';
import{LessonExtract}from'./LessonExtract';import{LessonFaq}from'./LessonFaq';
import{StructureVisual,type StructureVisualKind}from'./StructureVisual';
import{structureDocument as d,structureSources,type StructureBlock}from'../data/chapters/structureDocument';
import{structureCases,structureClock}from'../utils/structureMath';
const links:Array<[string[],string]>=[
 [['Chapter 09','باب 09','Swing Highs and Lows','سوئنگ ہائیز اور لوز'],'/learn/what-is-a-swing-the-atom-of-structure/'],
 [['Break of Structure','بریک آف اسٹرکچر'],'/learn/break-of-structure-bos-trend-continuation/'],
 [['Buy-side liquidity','بائی سائیڈ لیکویڈیٹی'],'/tools/glossary/liquidity/buy-side-liquidity/'],
 [['sell-side liquidity','سیل سائیڈ لیکویڈیٹی'],'/tools/glossary/liquidity/sell-side-liquidity/'],
 [['fair value gap','FVG','فیئر ویلیو گیپ'],'/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
 [['Liquidity in Trading','لیکویڈیٹی اِن ٹریڈنگ'],'/learn/liquidity-the-most-misunderstood-word-in-trading/'],
 [['market-structure glossary','مارکیٹ اسٹرکچر کی لغت'],'/tools/glossary/structure/market-structure-bos-mss-choch/'],
 [['Chart Lab','چارٹ لیب'],'/tools/chartlab/'],
 [['Trends, Ranges and Transitions','ٹرینڈز، رینجز اور تبدیلیاں'],'/learn/trend-range-transition/']
];
const figures:Record<number,StructureVisualKind>={1:'nested',6:'contrast',7:'scale',8:'worked',9:'failed',10:'chop'};
const stepFigures:StructureVisualKind[]=['range','pivots','internal','break','note'];
const sectionSources:Record<number,number[]>={3:[1],4:[2],7:[1],11:[0],12:[3]};
export function StructureDocumentContent({staticOnly=false}:{staticOnly?:boolean}){
 const{t,href}=useTranslation(),used=new Set<string>();
 const linkTail=(value:string,budget=2):ReactNode=>{if(!budget)return value;const hits=links.flatMap(([names,url])=>used.has(url)?[]:names.flatMap(name=>{const i=value.toLowerCase().indexOf(name.toLowerCase());return i<0?[]:[{i,name,url}]})).sort((a,b)=>a.i-b.i||b.name.length-a.name.length);const hit=hits[0];if(!hit)return value;used.add(hit.url);return <>{value.slice(0,hit.i)}<a className="fvg-context-link" href={href(hit.url)}>{value.slice(hit.i,hit.i+hit.name.length)}</a>{linkTail(value.slice(hit.i+hit.name.length),budget-1)}</>};
 const inline=(source:string,context=true):ReactNode=>{const value=t(source),linked=context?linkTail(value):value;if(typeof linked!=='string')return <span translate="no">{linked}</span>;const mark=context?['relative labels','not a complete trade plan','later outcome','not a prediction','نسبتی نام','بعد کا نتیجہ'].find(m=>value.includes(m)):null;if(mark){const i=value.indexOf(mark);return <span translate="no">{value.slice(0,i)}<mark className="fvg-mark fvg-mark-1">{mark}</mark>{value.slice(i+mark.length)}</span>};return <span translate="no">{value}</span>};
 const table=(rows:string[][],key:number|string)=><div className="fvg-table-scroll" role="region" tabIndex={0} aria-label={rows[0].map(v=>t(v)).join(' / ')} key={key}><table><thead><tr>{rows[0].map((v,j)=><th scope="col" key={j}>{inline(v,false)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,j)=><tr key={j}>{row.map((v,k)=>k===0?<th scope="row" key={k}>{inline(v,false)}</th>:<td key={k}>{inline(v)}</td>)}</tr>)}</tbody></table></div>;
 const caseTable=(fail:boolean,key:number)=>table([['Bar open (NY)','Open','High','Low','Close'],...(fail?structureCases.fail.slice(-2):structureCases.hold).map(b=>[structureClock(b.openMinute),b.open.toFixed(2),b.high.toFixed(2),b.low.toFixed(2),b.close.toFixed(2)])],key);
 const block=(b:StructureBlock,j:number)=>b.type==='paragraph'?<p data-lesson-content="" key={j}>{inline(b.text!)}</p>:b.type==='h3'?<h3 key={j}>{inline(b.text!,false)}</h3>:b.type==='list'?b.ordered?<ol key={j}>{b.items!.map(v=><li key={v}>{inline(v)}</li>)}</ol>:<ul key={j}>{b.items!.map(v=><li key={v}>{inline(v)}</li>)}</ul>:b.type==='case-table'?caseTable(false,j):b.type==='failure-table'?caseTable(true,j):table(b.rows!,j);
 return <div className="fvg-document structure-document"><section className="fvg-takeaways"><h2>{t('Key Takeaways')}</h2><ul>{d.takeaways.map(v=><li key={v}>{inline(v)}</li>)}</ul></section><nav className="liquidity-toc" aria-label={t('Table of Contents')}><details><summary>{t('Table of Contents')}</summary><ol>{d.sections.map((s,i)=><li key={s.number}><a href={`#rr-section-${i}`}>{t(s.title)}</a></li>)}</ol></details></nav>{d.sections.map((s,i)=><section key={s.number} id={`rr-section-${i}`} className="rr-text-section fvg-document-section"><h2>{inline(s.title,false)}</h2>{s.blocks.map((b,j)=><div className="st-block" key={j}>{s.number===1&&b.type==='paragraph'&&j===1?<LessonExtract name="Internal and external structure"><p itemProp="description">{inline(b.text!)}</p></LessonExtract>:block(b,j)}{s.number===4&&b.type==='paragraph'&&<StructureVisual kind={stepFigures[Math.floor(j/2)]} staticOnly={staticOnly}/>}</div>)}{figures[s.number]&&<StructureVisual kind={figures[s.number]} staticOnly={staticOnly}/>} {sectionSources[s.number]&&<aside className="st-sources" aria-label={t('Related primary sources')}><strong>{t('Related primary sources')}</strong><ul>{sectionSources[s.number].map(n=><li key={n}><a href={structureSources[n].url}>{t(structureSources[n].title)}</a></li>)}</ul></aside>}{s.number===15&&<div className="fvg-faq" id="structure-faq">{d.faqs.map((q,j)=><LessonFaq id={`structure-faq-${j}`} group="structure-faq" key={q.question} question={t(q.question)} className="fvg-faq-card"><p>{inline(q.answer)}</p></LessonFaq>)}</div>}</section>)}</div>;
}
