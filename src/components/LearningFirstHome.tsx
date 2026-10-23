import { LearningFAQ } from './LearningFAQ';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { useTranslation } from '../i18n/TranslationProvider';
import { chapterCount } from '../utils/catalogCounts';
import { ConceptMotion, type MotionConcept } from './ConceptMotion';
import { PlaygroundChart } from './PlaygroundChart';

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
 return <div className="learning-home playground-home" data-motion-paused={paused}>
  <section className="playground-hero"><div className="playground-hero-inner"><div className="learning-hero-copy"><h1>{t('Less guessing.')}<br/>{' '}{t('More')} <span>{t('“oh, I see it.”')}</span></h1><p>{t('Free ICT and Smart Money Concepts education, with clear explanations, moving diagrams and room to think for yourself.')}</p><div className="learning-actions"><a className="learning-primary" href={href('/curriculum/')}>{t('Start learning')}<ArrowRight size={18}/></a><a className="learning-text-link" href={href('/tools/')}>{t('Explore the tools')}<ArrowUpRight size={17}/></a></div><small>{message('{count} chapters. Free access. English and Urdu.',{count:chapterCount})}</small></div>
   <div className="playground-scene"><span className="playground-scene-note">{t('The chart has layers. Try one')} ↓</span><div className="learning-demo"><div className="learning-demo-top"><strong>{t('Read the idea in the chart')}</strong><span>{t('Illustrative prices')}</span></div><PlaygroundChart active={active}/><div className="learning-demo-tabs" role="group" aria-label={t('Choose a chart concept')}>{concepts.slice(0,3).map(([kind,title])=><button key={kind} aria-pressed={active===kind} onClick={()=>setActive(kind)}>{t(title)}</button>)}</div><div className="learning-demo-caption" aria-live="polite"><h2>{t(current[1])}</h2><p>{t(current[2])}</p><a href={href(current[3])}>{t('Read the full explanation')}<ArrowRight size={16}/></a></div></div><span className="playground-sticker">{t('A pattern ≠ a promise.')}</span></div>
  </div><div className="playground-trail">{[['See it.','Moving diagrams'],['Question it.','Context & limitations'],['Try it.','Guided practice'],['Keep it.','Free cheat sheet']].map(([title,copy])=><div key={title}><strong>{t(title)}</strong><span>{t(copy)}</span></div>)}</div>
  </section>
  <section className="learning-concepts playground-section"><div className="playground-mission"><p>{t('Learn to read the chart.')} {t('Then question it.')}</p><span>{t('Sources, context and limitations')}</span></div><div className="learning-section-heading"><div><h2>{t('Concepts you can see move')}</h2><p>{t('Every lesson starts from a picture of the idea, then explains what makes it valid or invalid.')}</p></div><button className="motion-toggle" aria-pressed={paused} onClick={()=>setPaused(v=>!v)}>{paused?<Play size={16}/>:<Pause size={16}/>}<span>{t(paused?'Play illustrations':'Pause illustrations')}</span></button></div><div className="learning-concept-grid">{concepts.map(([kind,title,copy,path])=><a className={`learning-concept-card concept-card--${kind}`} key={kind} href={href(path)}><div className="learning-concept-art"><ConceptMotion kind={kind}/><ArrowUpRight size={18} className="concept-card-arrow"/></div><div className="learning-concept-copy"><h3>{t(title)}</h3><p>{t(copy)}</p></div></a>)}</div></section>
  <section className="playground-practice"><div className="playground-section"><div className="learning-section-heading"><div><h2>{t('Three labs. Three different skills.')}</h2><p>{t('See it. Decide. Then check the evidence.')}</p></div></div><div className="learning-practice-grid">{([
   ['See the pattern','Identify sweeps, displacement and gaps directly on a chart.','/tools/chartlab/','Chart Laboratory'],
   ['Make a decision','Lock your plan, reveal candles and experience the outcome.','/tools/simulator/','Trade Simulator'],
   ['Check the evidence','Test a defined rule on candles and compare a separate sample.','/tools/backtest/','Backtest Lab'],
  ]).map(([title,copy,path,label],i)=><a className="learning-practice-card" href={href(path)} key={path}><span className="practice-number">0{i+1}</span><div><h3>{t(title)}</h3><p>{t(copy)}</p></div><strong>{t(label)}<ArrowUpRight size={18}/></strong></a>)}</div></div></section>
  <section className="playground-reading playground-section"><div className="learning-section-heading"><h2>{t('A little perspective between the candles.')}</h2><a className="learning-text-link" href={href('/articles/')}>{t('Explore the illustrated articles')}<ArrowRight size={17}/></a></div><div className="playground-articles">{[
   ['/articles/liquidity-is-not-a-magnet/','auction-social.png','Liquidity is not a magnet.'],
   ['/articles/a-good-trade-can-lose/','decision-social.png','A good trade can lose.'],
  ].map(([path,image,title])=><a className="playground-article" key={path} href={href(path)}><img src={`/images/articles/${image}`} alt={t(title)} loading="lazy" width="1200" height="630"/><div><h3>{t(title)}</h3><ArrowUpRight size={21}/></div></a>)}</div></section>
  <section className="playground-resource"><div className="playground-section"><div className="playground-sheet" aria-hidden="true"><span translate="no">LearnSMC</span><strong>ICT / SMC<br/>{t('Glossary & Cheat Sheet')}</strong><ConceptMotion kind="fvg"/><small>{t('Definitions. Diagrams. Limitations.')}</small></div><div className="playground-resource-copy"><h2>{t('Keep the essentials beside your chart.')}</h2><p>{t('Free ICT/SMC glossary and cheat sheet, with definitions, diagrams and limitations.')}</p><a className="learning-primary" href={href('/resources/ict-smc-cheat-sheet/')}>{t('Download the free cheat sheet')}<ArrowRight size={18}/></a><a className="learning-text-link" href={href('/curriculum/mentorships/')}>{t('Explore mentorship learning paths')}<ArrowUpRight size={18}/></a></div></div></section>
  <div className="playground-faq playground-section"><LearningFAQ items={faq}/></div>
 </div>;
}
