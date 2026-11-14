import type {ReactNode} from 'react';
import {useTranslation} from '../i18n/TranslationProvider';
import {LessonExtract} from './LessonExtract';
import {LessonFaq} from './LessonFaq';
import {SilverLessonVisual} from './SilverLessonVisual';
import {silverLessonDocument as d,silverLessonSources,type SilverLessonBlock} from '../data/chapters/silverBulletLesson';
const links:Array<[string[],string]>=[
 [['fair value gaps','fair value gap','فیئر ویلیو گیپس','فیئر ویلیو گیپ'],'/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
 [['swing highs and lows','سوئنگ ہائی اور لو'],'/learn/what-is-a-swing-the-atom-of-structure/'],
 [['market structure shift','مارکیٹ اسٹرکچر شفٹ'],'/learn/market-structure-shift-mss-verified-directional-shift/'],
 [['liquidity references','لیکویڈیٹی کے حوالوں'],'/learn/liquidity-the-most-misunderstood-word-in-trading/'],
 [['displacement','ڈسپلیسمنٹ'],'/tools/glossary/imbalances/displacement/'],
 [['ICT 2022 model','ICT 2022 ماڈل'],'/tools/masterclass/core-masterclasses/2022-model/'],
 [['Silver Bullet Chart Lab','سلور بُلٹ چارٹ لیب'],'/tools/chartlab/nq-silver-bullet-short/'],
 [['Backtest Lab','بیک ٹیسٹ لیب'],'/tools/backtest/'],
 [['killzone','کِل زون'],'/tools/glossary/time-and-sessions/sessions-killzones/'],
 ];
const kinds:Partial<Record<number,Parameters<typeof SilverLessonVisual>[0]['kind']>>={1:'overview',3:'clock',4:'context',6:'geometry',8:'deadlines',9:'bullish',10:'bearish',11:'outcomes',12:'no-trade',13:'ambiguity',14:'risk',18:'journal'};
export function SilverLessonContent({staticOnly=false}:{staticOnly?:boolean}){
 const{t,href}=useTranslation(),used=new Set<string>();
 const linked=(s:string,budget=2):ReactNode=>{if(!budget)return s;const hits=links.flatMap(([names,url])=>used.has(url)?[]:names.flatMap(name=>{const i=s.toLowerCase().indexOf(name.toLowerCase());return i<0?[]:[{i,name,url}]})).sort((a,b)=>a.i-b.i||b.name.length-a.name.length),hit=hits[0];if(!hit)return s;used.add(hit.url);return <>{s.slice(0,hit.i)}<a className="sl-concept-link" href={href(hit.url)}>{s.slice(hit.i,hit.i+hit.name.length)}</a>{linked(s.slice(hit.i+hit.name.length),budget-1)}</>};
 const inline=(s:string,context=true):ReactNode=><span translate="no">{context?linked(t(s)):t(s)}</span>;
 const renderTable=(rows:string[][],label:string)=><div className="fvg-table-scroll sl-table-scroll" role="region" tabIndex={0} aria-label={t(label)}><table><thead><tr>{rows[0].map((v,i)=><th key={i} scope="col">{inline(v,false)}</th>)}</tr></thead><tbody>{rows.slice(1).map((row,i)=><tr key={i}>{row.map((v,j)=>j===0?<th key={j} scope="row">{inline(v,false)}</th>:<td key={j}>{inline(v)}</td>)}</tr>)}</tbody></table></div>;
 const renderBlock=(b:SilverLessonBlock,j:number,s:number):ReactNode=>b.type==='h3'?<h3 key={j}>{inline(b.text!,false)}</h3>:b.type==='paragraph'?s===1&&j===0?<LessonExtract key={j} name={d.h1}><p itemProp="description" data-lesson-content="">{inline(b.text!)}</p></LessonExtract>:s===6&&j===1?<LessonExtract key={j} name="CE" kind="formula"><p itemProp="description" data-lesson-content="">{inline(b.text!)}</p></LessonExtract>:<p data-lesson-content="" key={j}>{inline(b.text!)}</p>:b.type==='table'?<div key={j}>{renderTable(b.rows!,d.sections[s-1].title)}</div>:b.type==='steps'?<ol className="sl-step-list" key={j}>{b.items!.map((v,k)=><li key={k}><p data-lesson-content="">{inline(v)}</p><SilverLessonVisual kind="overview" step={k} staticOnly={staticOnly}/></li>)}</ol>:<ul key={j}>{b.items!.map(v=><li key={v}>{inline(v)}</li>)}</ul>;
 return <div className="fvg-document silver-lesson-document"><section className="fvg-takeaways"><h2>{t('Key Takeaways')}</h2><ul>{d.takeaways.map(v=><li key={v}>{inline(v)}</li>)}</ul></section><nav className="liquidity-toc" aria-label={t('Table of Contents')}><details><summary>{t('Table of Contents')}</summary><ol>{d.sections.map((s,i)=><li key={s.number}><a href={`#rr-section-${i}`}>{t(s.title)}</a></li>)}</ol></details></nav>{d.sections.map((s,i)=><section id={`rr-section-${i}`} className="rr-text-section fvg-document-section sl-section" key={s.number}><h2>{inline(s.title,false)}</h2>{s.blocks.map((b,j)=>renderBlock(b,j,s.number))}{kinds[s.number]&&<SilverLessonVisual kind={kinds[s.number]!} staticOnly={staticOnly}/>} {s.number===20&&renderTable([['Term','Definition'],...d.terms.map(q=>[q.term,q.definition])],s.title)}{s.number===21&&<div className="fvg-faq" id="silver-lesson-faq">{d.faqs.map((q,j)=><LessonFaq group="silver-lesson-faq" id={`silver-lesson-faq-${j}`} question={t(q.question)} key={q.question} className="fvg-faq-card"><p>{inline(q.answer)}</p></LessonFaq>)}</div>}{[3,8,13,14].includes(s.number)&&<aside className="sl-citations" aria-label={t('Related primary sources')}><strong>{t('Related primary sources')}</strong><a href={silverLessonSources[s.number===3?3:s.number===8?0:s.number===13?2:1].url}>{t(silverLessonSources[s.number===3?3:s.number===8?0:s.number===13?2:1].title)}</a></aside>}</section>)}</div>
}
