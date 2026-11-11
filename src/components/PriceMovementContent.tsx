import {LessonFaq} from './LessonFaq';
import {LessonExtract} from './LessonExtract';
import type {ReactNode} from 'react';
import {priceMovementLesson as lesson,priceMovementPath,priceMovementSources} from '../data/chapters/priceMovementLesson';
import {useTranslation} from '../i18n/TranslationProvider';
import {contextualFragments} from '../utils/contextualLinks';
import {PriceMovementVisual} from './PriceMovementVisual';

type Pair=string[];
type Block={kind:string;text?:Pair;items?:Pair[];headers?:Pair[];rows?:Pair[][]};
export function PriceMovementContent({staticOnly=false}:{staticOnly?:boolean}){
 const {t,href}=useTranslation();const linked=new Set<string>();const highlighted=new Set<string>();
 const accents=[['urgency moves price','فوری ضرورت قیمت کو حرکت دیتی ہے'],['Price = expectation + surprise','قیمت = توقع + غیر متوقع فرق'],['markets trade the gap','مارکیٹس جو ہوا'],['prices can change conditions','قیمتیں حالات بدل سکتی ہیں'],['a story, not an analysis','تجزیہ نہیں، ایک کہانی'],['not records of specific dates','مخصوص تاریخوں کے ریکارڈ نہیں']];
 const decorate=(text:string):ReactNode=>{const hit=accents.flat().find(s=>!highlighted.has(s)&&text.toLowerCase().includes(s.toLowerCase()));if(!hit)return text;highlighted.add(hit);const at=text.toLowerCase().indexOf(hit.toLowerCase());return <>{text.slice(0,at)}<mark className={`pm-highlight pm-highlight-${accents.findIndex(p=>p.includes(hit))%3}`}>{text.slice(at,at+hit.length)}</mark>{text.slice(at+hit.length)}</>};
 const driverLinks:[string[],string][]=[
 [['Central banks','مرکزی بینک'],'/learn/core-content-month-4-advanced-pd-arrays-and-yields/'],
 [['Inflation','مہنگائی'],'/learn/ict-news-volatility-no-trade-framework/'],
 [['Positioning','پوزیشننگ'],'/learn/ict-charter-model-3-swing-trading-cot/'],
 [['margin calls','مارجن کالز'],'/learn/core-content-month-2-growing-small-accounts/'],
 [['Market makers','مارکیٹ میکرز'],'/learn/the-order-book-in-depth/'],
 [['US dollar','امریکی ڈالر'],'/learn/smt-divergence-mechanics/']
 ];
 const fragments=(text:string)=>{const value=t(text);const found=driverLinks.find(([names,url])=>!linked.has(url)&&names.some(n=>value.includes(n)));if(found){const term=found[0].find(n=>value.includes(n))!,at=value.indexOf(term);return [{text:value.slice(0,at)},{text:term,href:found[1]},{text:value.slice(at+term.length)}];}return contextualFragments(value,priceMovementPath,2,linked);};
 const paragraph=(text:string)=>fragments(text).map((f,i)=>{if(f.href)linked.add(f.href);return f.href?<a className="pm-context-link" key={i} href={href(f.href)}>{f.text}</a>:<span key={i}>{decorate(f.text)}</span>});
 const citations:Record<number,number[]>={2:[0,1,2],4:[4],5:[3,5],8:[6],9:[7,8,9]};
 const renderBlock=(b:Block,j:number)=>b.kind==='heading'?<h3 key={j}>{t(b.text![0])}</h3>:b.kind==='list'?<ul key={j}>{b.items!.map((p,k)=><li key={k}>{paragraph(p[0])}</li>)}</ul>:b.kind==='table'?<div className="pm-table-scroll" key={j} tabIndex={0} role="region" aria-label={b.headers!.map(h=>t(h[0])).join(' / ')}><table><thead><tr>{b.headers!.map((h,k)=><th key={k} scope="col">{t(h[0])}</th>)}</tr></thead><tbody>{b.rows!.map((r,k)=><tr key={k}>{r.map((v,n)=>n===0?<th key={n} scope="row">{t(v[0])}</th>:<td key={n}>{paragraph(v[0])}</td>)}</tr>)}</tbody></table></div>:b.text![0]===lesson.sections[0].paragraphs[0][0]?<LessonExtract key={j} name={lesson.sections[0].title[0]}><p data-lesson-content="" itemProp="description">{paragraph(b.text![0])}</p></LessonExtract>:b.text![0].includes("Price = expectation + surprise")?<LessonExtract key={j} name={lesson.sections[3].title[0]} kind="heuristic"><p data-lesson-content="" itemProp="description">{paragraph(b.text![0])}</p></LessonExtract>:<p key={j} data-lesson-content="">{paragraph(b.text![0])}</p>;
 const content=(s:typeof lesson.sections[number],i:number)=><>
  {i===10?<figure className="pm-myth-table" data-price-figure="myths">{s.blocks.map((b,j)=>renderBlock(b as Block,j))}<figcaption>{t(lesson.figures.myths.caption[0])}</figcaption></figure>:s.blocks.map((b,j)=>renderBlock(b as Block,j))}
  {s.figure&&<PriceMovementVisual kind={s.figure} staticOnly={staticOnly}/>}
  {i===13&&<div className="pm-faq" id="delivery-faq">{lesson.faqs.map((q,j)=><LessonFaq key={j} id={`pm-faq-question-${j}`} group="price-movement-faq" question={t(q.question[0])} className="pm-faq-card"><p>{paragraph(q.answer[0])}</p></LessonFaq>)}</div>}
  {citations[i+1]&&<p className="pm-citations">{citations[i+1].map(n=><a key={n} href={priceMovementSources[n].url}>{t(priceMovementSources[n].title)}</a>)}</p>}
  {i===14&&<><h3>{t(lesson.headings.next[0])}</h3><ul className="pm-next-reading">{lesson.nextReads.map(([label,path],j)=><li key={j}>{j===4?t((label as string[])[0]):<a className="pm-context-link" href={href(path as string)}>{t((label as string[])[0])}</a>}</li>)}</ul></>}
 </>;
 return <div className="pm-content"><section className="pm-takeaways"><h2>{t(lesson.headings.takeaways[0])}</h2><ul>{lesson.summary.map((p,i)=><li key={i}>{t(p[0])}</li>)}</ul></section>{lesson.sections.map((s,i)=><section className="rr-text-section pm-section" id={`rr-section-${i}`} key={s.id}><h2>{t(s.title[0])}</h2>{s.advanced?<details className="pm-deeper"><summary>{t('Explore the advanced explanation')}</summary>{content(s,i)}</details>:content(s,i)}</section>)}<div className="rr-review-grid"><section><h2>{t('Chapter Review Checklist')}</h2><ol>{['Identify whether the display is a last trade, a quote or a mark.','Check the timing and the evidence for the proposed mechanism.','Record a competing explanation and what remains unknown.'].map(p=><li key={p}>{t(p)}</li>)}</ol></section><section><h2>{t('Risk Management & Sizing Protocols')}</h2><h3>{t('Before acting on an explanation')}</h3><ul>{['Explaining a move is not an entry signal or a position-sizing rule.','Include spread, slippage, fees and leverage when evaluating a proposed trade.','If the evidence or execution assumptions are unclear, standing aside remains an option.'].map(p=><li key={p}>{t(p)}</li>)}</ul></section></div></div>;
}
