import {MasterclassLessonArt} from './MasterclassLessonArt';
import {masterclassCollection} from '../data/masterclassData';
import {InteractiveDiagram} from './InteractiveDiagram';

/** Original Masterclass content in the Field Journal shell; no curriculum expansion. */
export function MasterclassCatalogueBody({number}:{number:number}){
 const item=masterclassCollection.find(m=>m.number===number)!;
 return <>
  <section id="core-idea" className="mj-section"><h2>{number===3?'What is the ICT 2022 model?':'The core idea'}</h2><p>{item.coreRule}</p></section>
  <section id="visual-blueprint" className="mj-section"><h2>Visual blueprint</h2>{[2,3,6,9,16,19,20,21,22,23,24,25,26,27,28,29].includes(number)?<MasterclassLessonArt number={number}/>:<figure className="mj-lesson-art" aria-label={item.visualAnatomy}><InteractiveDiagram type={item.diagramType} title={item.title} isInteractive/><figcaption>{item.visualAnatomy}</figcaption></figure>}</section>
  <section id="procedure" className="mj-section"><h2>Step-by-step breakdown</h2>{item.stepByStepBreakdown.map(s=><section className="mj-step" key={s.step}><p className="mj-label">Step {s.step}</p><h3>{s.title}</h3><p>{s.detail}</p></section>)}</section>
  <section id="sequence" className="mj-section"><h2>Order of operations</h2><ol>{item.orderOfOperations.map(s=><li key={s}>{s}</li>)}</ol></section>
  <section id="mistakes" className="mj-section"><h2>Common mistakes</h2><ul>{item.keyMistakes.map(s=><li key={s}>{s}</li>)}</ul></section>
  <section id="invalidation" className="mj-section"><h2>Invalidation checklist</h2><ul>{item.invalidationChecklist.map(s=><li key={s}>{s}</li>)}</ul></section>
  <section id="limitations" className="mj-section"><h2>Risk rules</h2><ul>{item.riskRules.map(s=><li key={s}>{s}</li>)}</ul><p>These are the original Masterclass study rules, not a recommendation for personal risk allocation or a guarantee that a setup will work. <a href="/disclaimer/">Read the financial-education risk disclosure</a>.</p></section>
  <section id="related-concepts" className="mj-section"><h2>Related PD arrays</h2><ul>{item.relatedPdArrays.map(s=><li key={s}>{s}</li>)}</ul></section>
 </>;
}
