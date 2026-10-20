import { useTranslation } from '../i18n/TranslationProvider';
import { PricePlayground } from './PricePlayground';
import { FinancialDisclaimer } from './FinancialDisclaimer';
import { StudioSketch } from './StudioSketch';
import type { MainTabType } from './Header';

export function WelcomeScreen(_props:{onEnterAcademy:(targetTab?:MainTabType)=>void;onOpenMentorSpotlight:()=>void}) {
  const {t,href} = useTranslation();
  return <div className="new-home studio-home">
    <PricePlayground/>
    <div className="studio-divider" aria-hidden="true"><span>ICT / SMC</span><span>✳</span><span>LearnSMC</span></div>
    <section className="home-practice">
      <div className="studio-section-heading"><div><span className="lab-eyebrow">{t('LESS READING ABOUT PRACTICE. MORE PRACTICE.')}</span><h2>{t('Three labs.')}<em>{t('Three different skills.')}</em></h2></div><p>{t('See it. Decide. Then check the evidence.')}</p></div>
      <div className="home-lab-grid">{([
        ['01','recognize','See the pattern','Identify sweeps, displacement and gaps directly on a chart.','/tools/chartlab/','Open Chart Laboratory'],
        ['02','decide','Make a decision','Lock your plan, reveal candles and experience the outcome.','/tools/simulator/','Open Trade Simulator'],
        ['03','evaluate','Check the evidence','Test a defined rule on candles and compare a separate sample.','/tools/backtest/','Open Backtest Lab'],
      ] as const).map(([n,kind,title,copy,url,action]) => <a key={n} className={`home-lab-card studio-lab-card studio-lab-card--${kind}`} href={href(url)}>
        <div className="studio-card-top"><span className="home-lab-number">{n}</span><span className="studio-card-arrow" aria-hidden="true">↗</span></div>
        <StudioSketch kind={kind}/><h3>{t(title)}</h3><p>{t(copy)}</p><strong>{t(action)} <span aria-hidden="true">→</span></strong>
      </a>)}</div>
    </section>
    <section className="studio-paths">
      <div className="studio-section-heading"><div><span className="lab-eyebrow">{t('YOUR PACE. YOUR PATH.')}</span><h2>{t('Choose your own')}<em>{t('starting point.')}</em></h2></div></div>
      <div className="studio-path-grid">
        <a className="studio-path-card studio-path-card--learn" href={href('/curriculum/mentorships/')}><span className="studio-chip">{t('THE LEARNING LIBRARY')}</span><div><h3>{t('Follow a mentorship.')}</h3><p>{t('Explore the series, compare their focus and follow a clear study order.')}</p></div><StudioSketch kind="path"/><span className="studio-path-link">{t('Explore mentorship learning paths')} <span aria-hidden="true">↗</span></span></a>
        <a className="studio-path-card studio-path-card--read" href={href('/articles/')}><span className="studio-chip">{t('THE READING ROOM')}</span><div><h3>{t('A little perspective.')}<br/><em>{t('A few stick figures.')}</em></h3><p>{t('Read illustrated articles')}</p></div><StudioSketch kind="read"/><span className="studio-path-link">{t('Articles')} <span aria-hidden="true">↗</span></span></a>
      </div>
    </section>
    <section className="home-reference studio-reference"><div><span className="lab-eyebrow">{t('SAVE IT. SHARE IT. KEEP IT BESIDE YOUR CHART.')}</span><h2>{t('Your pocket guide')}<em>{t('to ICT & SMC.')}</em></h2><p>{t('Original definitions, small diagrams and a practical observation checklist. Free PDF editions in English and Urdu, with source links and clear limitations.')}</p><a className="lab-primary" href={href('/resources/ict-smc-cheat-sheet/')}>{t('Download the free cheat sheet')} <span aria-hidden="true">↓</span></a></div>
      <div className="studio-book-stack" aria-hidden="true"><div className="reference-cover"><span>LearnSMC <span>↗</span></span><strong>ICT / SMC</strong><p>{t('Glossary & Cheat Sheet')}</p><div className="cover-line"/><small>{t('Definitions. Diagrams. Questions worth asking.')}</small><span className="studio-book-footer">EN / اردو <span>✳</span></span></div><span className="studio-book-note">{t('Free. No signup.')}</span></div>
    </section>
    <section className="home-editorial studio-editorial"><span className="studio-spark" aria-hidden="true">✳</span><h2>{t('Learn the framework.')}<em>{t('Question the certainty.')}</em></h2><p>{t('ICT and Smart Money Concepts are chart-study frameworks. A pattern does not prove institutional intent or guarantee the next move. Our notes distinguish measurable definitions from interpretation and link to reviewed sources.')}</p><p><a href={href('/about/#author')}>{t('Author and editorial policy')} <span aria-hidden="true">↗</span></a></p></section>
    <FinancialDisclaimer/>
  </div>;
}
