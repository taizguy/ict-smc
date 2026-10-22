import { useState } from 'react';
import { ArrowRight, ArrowUpRight, BookOpen, Languages, Pause, Play, ShieldCheck } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { chapterCount } from '../utils/catalogCounts';
import { ConceptMotion, type MotionConcept } from './ConceptMotion';

const concepts:[MotionConcept,string,string,string][]=[
 ['fvg','Fair value gaps','Three-candle imbalances, their boundaries and uncertain revisits.','/learn/fair-value-gaps-fvg-and-consequent-encroachment/'],
 ['ob','Order blocks','Study an opposing candle as a reference, then question whether it holds.','/tools/glossary/order-blocks/'],
 ['sweep','Liquidity sweeps','What a move beyond a reference looks like, and why it is not a guarantee.','/learn/liquidity-engineering-and-liquidity-runs/'],
 ['sessions','Killzones','Explore New York session timing and the limits of time-based setups.','/tools/delivery-suite/'],
 ['po3','Power of 3','Accumulation, manipulation and distribution as an illustrative path.','/tools/glossary/time-and-sessions/power-of-three-amd/'],
 ['simulator','Trade simulator','Practise on synthetic candles and record the reasoning behind your decisions.','/tools/simulator/'],
];
const faq=[
 ['What are ICT and Smart Money Concepts?','ICT is a trading education framework associated with Michael J. Huddleston. Smart Money Concepts is a broader set of chart-reading ideas about structure, liquidity and price imbalances. These are study frameworks, not proof of institutional intent.'],
 ['Is LearnSMC really free?','Yes. The curriculum, independent video study notes, articles and learning tools are free to access. Trading itself carries financial risk.'],
 ['Where should a beginner start?','Start with the first curriculum chapter, then work through market structure and liquidity before practising entries. Use the glossary when a term is unfamiliar.'],
 ['Is this financial advice?','No. LearnSMC provides general education, not personal investment advice, trading signals or a promise of returns. Examples and simulations cannot predict future results.'],
];
export function LearningFirstHome(){
 const {t,href,message}=useTranslation();const [active,setActive]=useState<MotionConcept>('fvg'),[paused,setPaused]=useState(false);
 const current=concepts.find(c=>c[0]===active)!;
 return <div className="learning-home" data-motion-paused={paused}>
  <section className="learning-hero"><div className="learning-hero-copy"><h1>{t('Learn to read the chart.')} <span><mark className="ui-mark ui-mark--blue">{t('Then question it.')}</mark></span></h1><p>{t('Free ICT and Smart Money Concepts education, with clear explanations, moving diagrams and room to think for yourself.')}</p><div className="learning-actions"><a className="learning-primary" href={href('/curriculum/')}>{t('Start learning')}<ArrowRight size={18}/></a><a className="learning-text-link" href={href('/tools/')}>{t('Explore the tools')}<ArrowUpRight size={17}/></a></div><small>{message('{count} chapters. Free access. English and Urdu.',{count:chapterCount})}</small></div>
   <div className="learning-demo"><div className="learning-demo-top"><strong>{t('Read the idea in the chart')}</strong><span>{t('Illustrative prices')}</span></div><div className="learning-demo-tabs" role="group" aria-label={t('Choose a chart concept')}>{concepts.slice(0,3).map(([kind,title])=><button key={kind} aria-pressed={active===kind} onClick={()=>setActive(kind)}>{t(title)}</button>)}</div><ConceptMotion kind={active}/><div className="learning-demo-caption" aria-live="polite"><h2>{t(current[1])}</h2><p>{t(current[2])}</p><a href={href(current[3])}>{t('Read the full explanation')}<ArrowRight size={16}/></a></div></div>
  </section>
  <div className="learning-trust"><span><BookOpen size={17}/>{t('A structured learning path')}</span><span><Languages size={17}/>{t('English and Urdu')}</span><span><ShieldCheck size={17}/>{t('Sources, context and limitations')}</span></div>
  <section className="learning-concepts"><div className="learning-section-heading"><div><h2><mark className="ui-mark ui-mark--peach">{t('Concepts you can see move')}</mark></h2><p>{t('Every lesson starts from a picture of the idea, then explains what makes it valid or invalid.')}</p></div><button className="motion-toggle" aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?<Play size={16}/>:<Pause size={16}/>}<span>{t(paused?'Play illustrations':'Pause illustrations')}</span></button></div><div className="learning-concept-grid">{concepts.map(([kind,title,copy,path])=><a className={`learning-concept-card concept-card--${kind}`} key={kind} href={href(path)}><div className="learning-concept-art"><ConceptMotion kind={kind}/><ArrowUpRight size={18} className="concept-card-arrow"/></div><div className="learning-concept-copy"><h3>{t(title)}</h3><p>{t(copy)}</p></div></a>)}</div></section>
  <section className="learning-practice"><div className="learning-section-heading"><div><h2>{t('Three labs. Three different skills.')}</h2><p>{t('See it. Decide. Then check the evidence.')}</p></div></div><div className="learning-practice-grid">{([
   ['See the pattern','Identify sweeps, displacement and gaps directly on a chart.','/tools/chartlab/','Chart Laboratory'],
   ['Make a decision','Lock your plan, reveal candles and experience the outcome.','/tools/simulator/','Trade Simulator'],
   ['Check the evidence','Test a defined rule on candles and compare a separate sample.','/tools/backtest/','Backtest Lab'],
  ]).map(([title,copy,path,label],i)=><a className={`learning-practice-card practice-tone-${i}`} href={href(path)} key={path}><span className="practice-number">0{i+1}</span><h3>{t(title)}</h3><p>{t(copy)}</p><strong>{t(label)}<ArrowUpRight size={18}/></strong></a>)}</div></section>
  <section className="learning-perspective"><div><h2>{t('A little perspective between the candles.')}</h2><a className="learning-essay" href={href('/articles/liquidity-is-not-a-magnet/')}>{t('Liquidity is not a magnet.')}<ArrowUpRight size={19}/></a><a className="learning-essay" href={href('/articles/a-good-trade-can-lose/')}>{t('A good trade can lose.')}<ArrowUpRight size={19}/></a><a className="learning-text-link" href={href('/articles/')}>{t('Explore the illustrated articles')}<ArrowRight size={17}/></a></div><aside className="learning-pocket"><BookOpen size={30} strokeWidth={1.5}/><h3>{t('Keep the essentials beside your chart.')}</h3><p>{t('Free ICT/SMC glossary and cheat sheet, with definitions, diagrams and limitations.')}</p><a href={href('/resources/ict-smc-cheat-sheet/')}>{t('Download the free cheat sheet')}<ArrowRight size={17}/></a><a href={href('/curriculum/mentorships/')}>{t('Explore mentorship learning paths')}<ArrowUpRight size={17}/></a></aside></section>
  <section className="learning-faq"><h2>{t('Questions people ask first')}</h2>{faq.map(([question,answer])=><details key={question}><summary>{t(question)}</summary><p>{t(answer)}</p>{question==='Where should a beginner start?'&&<a href={href('/curriculum/')}>{t('Start learning')}<ArrowRight size={16}/></a>}</details>)}</section>
 </div>;
}
