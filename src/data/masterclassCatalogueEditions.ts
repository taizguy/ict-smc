import type {JournalLesson} from './masterclassJournal';
import {masterclassCollection} from './masterclassData';
import {masterclassThumbnailSpecs} from './masterclassHub';
import {reviewedModelSources} from './reviewedModelSources';
import {getMasterclassUrl} from '../utils/workbenchToolRoutes';
import {searchTitle,searchDescription} from '../utils/searchMetadata';

/** Keep published catalogue wording; this migration changes presentation, not the syllabus. */
export function catalogueEditions(previous:Record<number,JournalLesson>):Record<number,JournalLesson>{
 return Object.fromEntries(masterclassCollection.map(item=>{
  const retained=previous[item.number],thumb=masterclassThumbnailSpecs[item.number],path=getMasterclassUrl(item);
  const reviewed=reviewedModelSources(item.id);
  const sources=reviewed?.sources.length?reviewed.sources.map(s=>({title:s.title,url:s.url,scope:s.scope})):[{title:'ICT: original teaching archive',url:'https://www.youtube.com/innercircletrader',scope:'Original educator’s archive. LearnSMC is an independent study collection; this archive link is background attribution, not verification of every model rule or evidence of trading performance.'}];
  const related=masterclassCollection.filter(m=>m.number!==item.number&&m.category===item.category).sort((a,b)=>Math.abs(a.number-item.number)-Math.abs(b.number-item.number)).slice(0,3).map(m=>({title:m.title,href:getMasterclassUrl(m),kind:'lesson' as const,reason:masterclassThumbnailSpecs[m.number].description}));
  const edition:JournalLesson={...previous[3],...retained,number:item.number,catalogueBody:true,release:'approved',modified:'2026-10-30',reviewed:'2026-10-30',
   title:retained?.title||searchTitle(item.title,path),description:retained?.description||searchDescription(thumb.description,item.title,path),h1:retained?.h1||item.title,subtitle:retained?.subtitle||item.subtitle,
   socialImage:`/images/masterclass-journal/catalogue-${String(item.number).padStart(2,'0')}.png`,
   coreHeading:retained?.coreHeading||item.title,reviewScope:retained?.reviewScope||'Presentation and catalogue consistency reviewed. These are independent model-study notes, not a claim of verified market performance.',
   outcomes:retained?.outcomes||item.stepByStepBreakdown.slice(0,3).map(s=>s.detail),
   faq:retained?.faq||[
    {question:`What does ${item.title} study?`,answer:thumb.description},
    {question:'Where does the sequence start?',answer:item.orderOfOperations[0]},
    {question:'What invalidates the idea?',answer:item.invalidationChecklist[0]},
    {question:'Which mistakes should I watch for?',answer:item.keyMistakes[0]}
   ],sources:retained?.sources||sources,related:retained?.related||related,
  };
  // Restored catalogue bodies do not contain the expanded journal examples.
  if(item.number===8||item.number===15){edition.title=searchTitle(item.title,path);edition.description=searchDescription(thumb.description,item.title,path);}
  edition.faq=edition.faq.map(f=>({...f,answer:f.answer.replace('The failed example visits only 170 after opening at 180, then rises to 200 without reaching midpoint 140.','For example, an invented path may open at 180, visit 170 and rise to 200 without reaching midpoint 140.').replace('In the failed example, price crosses 80 and continues to 76.','An invented path can cross 80 and continue to 76.')}));
  return [item.number,edition];
 }));
}
