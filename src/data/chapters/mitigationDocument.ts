import type {CurriculumSource} from '../curriculumReview';
import data from './mitigationDocument.json';
import type {TextbookChapter} from '../../types';
import type {FvgDocumentBlock} from './fvgDocument';
export const mitigationDocument:{h1:string;quickAnswer:string;takeaways:string[];sections:{number:number;title:string;blocks:FvgDocumentBlock[]}[];faqs:{question:string;answer:string}[]}=data;
export const mitigationPath='/learn/mitigation-and-rejection-blocks/';
export const mitigationDates={published:{iso:'2026-10-15',label:'15 October 2026'},updated:{iso:'2026-11-11',label:'11 November 2026'}};
const glossary=data.sections[17].blocks.find(b=>b.type==='table')!.rows!.slice(1);
export const mitigationChapter:TextbookChapter={id:1031,slug:'mitigation-and-rejection-blocks',title:data.h1,part:'Part IV - Price Delivery',status:'published',level:1,quote:data.quickAnswer,summary:data.takeaways,keyTerms:glossary.map(r=>({term:r[0]!,definition:r[1]!})),practiceQuestions:data.faqs.slice(0,5).map(q=>q.question),sections:data.sections.map(s=>({id:`1031.document.${s.number}`,title:s.title,content:s.blocks.filter(b=>b.type==='paragraph').map(b=>b.text).join('\n\n')}))};
export const mitigationSources:CurriculumSource[]=[
 {title:'ICT Mentorship Core Content — Month 04 — Mitigation Blocks',url:'https://www.youtube.com/watch?v=FOUzW0QmsfI',scope:'Primary lecture for comparing mitigation-block terminology and drawing choices. This chapter’s invented prices are not historical examples from the recording.'},
 {title:'ICT Mentorship Core Content — Month 04 — ICT Rejection Block',url:'https://www.youtube.com/watch?v=oALYX0HCSYw',scope:'Primary lecture for comparing rejection-block terminology. Distinguish the chapter’s stated wick-zone and alternative constructions; the reference does not establish performance.'},
 {title:'Investor.gov — Stop Order',url:'https://www.investor.gov/introduction-investing/investing-basics/glossary/stop-order',scope:'The SEC investor glossary explains stock stop orders becoming market orders and why execution can differ from the stop price. Other products and stop-limit orders have different rules.'}
];
export const mitigationQuizzes=[
 {question:'What is the difference between a mitigation block and a breaker block?',context:'Prior high 110.00; the next rally ends at 108.50 before a close below 104.00.',options:['Mitigation block: the final push fell short.','Breaker block: any downward close is enough.','Rejection block: every lower high is a wick zone.'],correctIndex:0,explanation:data.faqs[2].answer},
 {question:'What is the 50% level of a rejection block?',context:'Body top 98.20; wick high 99.00.',options:['98.60','98.20','99.10'],correctIndex:0,explanation:'Rejection block = 98.20 to 99.00. Width 0.80. Midpoint = 98.60.'},
 {question:'How do you mark a rejection block?',context:'The wick zone was 98.20 to 99.00. A later candle closes above 99.00.',options:['A close beyond the wick extreme invalidates it.','Redraw the wick higher so the zone still holds.','Assume the midpoint must hold.'],correctIndex:0,explanation:data.faqs[9].answer}
];
