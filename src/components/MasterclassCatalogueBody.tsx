import {masterclassStepHeadings} from '../data/masterclassStepHeadings';
import {MasterclassLessonArt} from './MasterclassLessonArt';
import {masterclassCollection} from '../data/masterclassData';
import {InteractiveDiagram} from './InteractiveDiagram';
import {useTranslation} from '../i18n/TranslationProvider';

/** Original Masterclass content in the Field Journal shell; no curriculum expansion. */
export function MasterclassCatalogueBody({number}:{number:number}){
 const item=masterclassCollection.find(m=>m.number===number)!;
 const {t,href}=useTranslation();
 return <>
  <section id="core-idea" className="mj-section"><h2>{t(number===3?'What is the ICT 2022 model?':'The core idea')}</h2><p>{t(item.coreRule)}</p></section>
  <section id="visual-blueprint" className="mj-section"><h2>{t('Visual blueprint')}</h2>{[2,3,6,9,16,19,20,21,22,23,24,25,26,27,28,29].includes(number)?<MasterclassLessonArt number={number}/>:<figure className="mj-lesson-art" aria-label={t(item.visualAnatomy)}><InteractiveDiagram type={item.diagramType} title={t(item.title)} isInteractive/><figcaption>{t(item.visualAnatomy)}</figcaption></figure>}</section>
  <section id="procedure" className="mj-section"><h2>{t('Step-by-step breakdown')}</h2>{item.stepByStepBreakdown.map(s=><section className="mj-step" key={s.step}><p className="mj-label">{t('Step')} {s.step}</p><h3>{t(masterclassStepHeadings[number]?.[s.step-1]||s.title)}</h3><p>{t(s.detail)}</p></section>)}</section>
  <section id="sequence" className="mj-section"><h2>{t('Order of operations')}</h2><ol>{item.orderOfOperations.map(s=><li key={s}>{t(s)}</li>)}</ol></section>
  <section id="mistakes" className="mj-section"><h2>{t('Common mistakes')}</h2><ul>{item.keyMistakes.map(s=><li key={s}>{t(s)}</li>)}</ul></section>
  <section id="invalidation" className="mj-section"><h2>{t('Invalidation checklist')}</h2><ul>{item.invalidationChecklist.map(s=><li key={s}>{t(s)}</li>)}</ul></section>
  <section id="limitations" className="mj-section"><h2>{t('Risk rules')}</h2><ul>{item.riskRules.map(s=><li key={s}>{t(s)}</li>)}</ul><p>{t('These are the original Masterclass study rules, not a recommendation for personal risk allocation or a guarantee that a setup will work.')} <a href={href('/disclaimer/')}>{t('Read the financial-education risk disclosure')}</a>.</p></section>
  <section id="related-concepts" className="mj-section"><h2>{t('Related PD arrays')}</h2><ul>{item.relatedPdArrays.map(s=><li key={s}>{t(s)}</li>)}</ul></section>
 </>;
}
