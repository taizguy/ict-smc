import type {ReactNode} from 'react';
import {useTranslation} from '../i18n/TranslationProvider';
import {LessonExtract} from './LessonExtract';
import {LessonFaq} from './LessonFaq';
import {BreakVisual,type BreakVisualKind} from './BreakVisual';
import {breakDocuments,breakSources} from '../data/chapters/breakDocuments';
import {breakCases,breakClock,type BreakTopic} from '../utils/breakMath';
import type {StructureBlock} from '../data/chapters/structureDocument';
const destinations:Array<[string[],string]>=[
 [['Swing Highs and Lows','سوئنگ ہائیز اور لوز'],'/learn/what-is-a-swing-the-atom-of-structure/'],
 [['Internal vs External Market Structure','اندرونی و بیرونی مارکیٹ اسٹرکچر'],'/learn/internal-vs-external-structure/'],
 [['break of structure','بریک آف اسٹرکچر'],'/learn/break-of-structure-bos-trend-continuation/'],
 [['Change of Character','چینج آف کریکٹر'],'/learn/change-of-character-choch-the-first-warning/'],
 [['Market Structure Shift','مارکیٹ اسٹرکچر شفٹ'],'/learn/market-structure-shift-mss-verified-directional-shift/'],
 [['market-structure glossary','مارکیٹ اسٹرکچر کی لغت'],'/tools/glossary/structure/market-structure-bos-mss-choch/'],
 [['premium/discount','پریمیم/ڈسکاؤنٹ'],'/learn/ict-pd-array-selection-price-delivery-continuum/'],
 [['order block','آرڈر بلاک'],'/learn/order-blocks-ob-and-mitigation/'],
 [['fair value gap','فیئر ویلیو گیپ'],'/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
 [['Chart Lab','چارٹ لیب'],'/tools/chartlab/'],
 [['Backtest Lab','بیک ٹیسٹ لیب'],'/tools/backtest/'],
 [['Trade Simulator','ٹریڈ سمیولیٹر'],'/tools/simulator/']
];
const figures:Partial<Record<number,BreakVisualKind>>={1:'overview',3:'pivot',5:'wick',6:'worked',7:'failed',8:'scale',9:'labels',10:'risk'};
const steps:BreakVisualKind[]=['map','reference','test','clock','record'];
export function BreakDocumentContent({topic,staticOnly=false}:{topic:BreakTopic;staticOnly?:boolean}){
 const {t,href}=useTranslation(),d=breakDocuments[topic],used=new Set<string>(),self=topic==='bos'?destinations[2][1]:destinations[3][1];
 const link=(value:string,budget=2):ReactNode=>{if(!budget)return value;const hits=destinations.flatMap(([terms,url])=>url===self||used.has(url)?[]:terms.flatMap(term=>{const i=value.toLowerCase().indexOf(term.toLowerCase());return i<0?[]:[{i,term,url}]})).sort((a,b)=>a.i-b.i||b.term.length-a.term.length),hit=hits[0];if(!hit)return value;used.add(hit.url);return <>{value.slice(0,hit.i)}<a className="fvg-context-link" href={href(hit.url)}>{value.slice(hit.i,hit.i+hit.term.length)}</a>{link(value.slice(hit.i+hit.term.length),budget-1)}</>};
 const inline=(source:string,links=true)=><span translate="no">{links?link(t(source)):t(source)}</span>;
 const renderTable=(rows:string[][])=><div className="fvg-table-scroll" role="region" tabIndex={0} aria-label={t('Comparison and example data')}><table><thead><tr>{rows[0].map((s,i)=><th scope="col" key={i}>{inline(s,false)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,i)=><tr key={i}>{row.map((s,j)=>j===0?<th scope="row" key={j}>{inline(s,false)}</th>:<td key={j}>{inline(s)}</td>)}</tr>)}</tbody></table></div>;
 const renderBlock=(b:StructureBlock,j:number,section:number)=>b.type==='paragraph'?<p data-lesson-content="" key={j}>{inline(b.text!)}</p>:b.type==='h3'?<h3 key={j}>{inline(b.text!,false)}</h3>:b.type==='list'?b.ordered?<ol className={section===4?'br-procedure':undefined} key={j}>{b.items!.map((s,k)=><li key={s}>{inline(s)}{section===4&&<BreakVisual topic={topic} kind={steps[k]} staticOnly={staticOnly}/>}</li>)}</ol>:<ul key={j}>{b.items!.map(s=><li key={s}>{inline(s)}</li>)}</ul>:b.type==='case-table'||b.type==='failure-table'?renderTable([['Bar open (NY)','Open','High','Low','Close'],...(b.type==='case-table'?breakCases[topic].hold:breakCases[topic].fail.slice(2)).map(v=>[breakClock(v.openMinute),v.open.toFixed(2),v.high.toFixed(2),v.low.toFixed(2),v.close.toFixed(2)])]):renderTable(b.rows!);
 return <div className={`fvg-document break-document break-document-${topic}`}><section className="fvg-takeaways"><h2>{t('Key Takeaways')}</h2><ul>{d.takeaways.map(s=><li key={s}>{inline(s)}</li>)}</ul></section><nav className="liquidity-toc" aria-label={t('Table of Contents')}><details><summary>{t('Table of Contents')}</summary><ol>{d.sections.map((s,i)=><li key={s.number}><a href={`#rr-section-${i}`}>{t(s.title)}</a></li>)}</ol></details></nav>{d.sections.map((s,i)=><section className="rr-text-section fvg-document-section" id={`rr-section-${i}`} key={s.number}><h2>{inline(s.title,false)}</h2>{s.blocks.map((b,j)=>((s.number===1||s.number===5)&&j===0)||(s.number===10&&j===1)?<LessonExtract key={j} name={d.h1} kind={s.number===1?'definition':'heuristic'}><p itemProp="description" data-lesson-content="">{inline(b.text!)}</p></LessonExtract>:<div className="br-block" key={j}>{renderBlock(b,j,s.number)}</div>)}{figures[s.number]&&<BreakVisual topic={topic} kind={topic==='choch'&&s.number===8?'ranging':figures[s.number]!} staticOnly={staticOnly}/>} {s.number===14&&renderTable([['Term','Definition'],...d.terms.map(q=>[q.term,q.definition])])}{s.number===15&&<div className="fvg-faq" id={`${topic}-faq`}>{d.faqs.map((q,j)=><LessonFaq id={`${topic}-faq-${j}`} group={`${topic}-faq`} question={t(q.question)} className="fvg-faq-card" key={q.question}><p>{inline(q.answer)}</p></LessonFaq>)}</div>}{[3,5,10].includes(s.number)&&<aside className="br-citations" aria-label={t('Related primary sources')}><strong>{t('Related primary sources')}</strong><ul>{(s.number===3?[2]:s.number===5?[0,1]:[3]).map(n=><li key={n}><a href={breakSources[n].url}>{t(breakSources[n].title)}</a></li>)}</ul></aside>}</section>)}</div>;
}
