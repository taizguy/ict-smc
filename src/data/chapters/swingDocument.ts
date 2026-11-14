import type{TextbookChapter}from'../../types';
import type{CurriculumSource}from'../curriculumReview';
import data from'./swingDocument.json';
export type SwingBlock={type:'paragraph'|'h3'|'list'|'table'|'code';text?:string;ordered?:boolean;start?:number;items?:string[];rows?:string[][];language?:string};
export const swingDocument=data as{h1:string;quickAnswer:string;takeaways:string[];sections:{number:number;title:string;blocks:SwingBlock[]}[];faqs:{question:string;answer:string}[]};
export const swingPath='/learn/what-is-a-swing-the-atom-of-structure/';
export const swingDates={published:{iso:'2026-10-15',label:'15 October 2026'},updated:{iso:'2026-11-13',label:'13 November 2026'}};
export const swingPlain=(s:string)=>s.replace(/\*\*|`|\$/g,'').replace(/\*([^*]+)\*/g,'$1').trim();
const terms=data.sections[18].blocks.find(b=>b.type==='list')!.items!;
export const swingChapter:TextbookChapter={id:7,slug:'what-is-a-swing-the-atom-of-structure',part:'Part II - Price Structure',title:data.h1,status:'published',level:1,quote:data.quickAnswer,summary:data.takeaways.map(swingPlain),keyTerms:terms.map(s=>{const at=s.indexOf(':');return{term:swingPlain(s.slice(0,at)),definition:swingPlain(s.slice(at+1).trim())}}),practiceQuestions:data.faqs.slice(0,3).map(q=>q.question),sections:data.sections.map(s=>({id:`7.document.${s.number}`,title:s.title,content:s.blocks.filter(b=>b.type==='paragraph').map(b=>swingPlain(b.text!)).join('\n\n')}))};
export const swingSources:CurriculumSource[]=[
 {title:'CME Group — E-mini Nasdaq-100 contract specifications',url:'https://www.cmegroup.com/markets/equities/nasdaq/e-mini-nasdaq-100.contractSpecs.html',scope:'Contract reference for NQ. The illustrative prices in this lesson are invented, not a historical NQ execution.'},
 {title:'CME Group — S&P 500 and Nasdaq-100 futures',url:'https://www.cmegroup.com/markets/equities/sp-500-and-nasdaq-100-futures.html',scope:'Contract sizes, tick increments and extended electronic trading. Session labels do not establish the quality of a particular swing.'},
 {title:'TradingView — Williams fractal indicator',url:'https://www.tradingview.com/support/solutions/43000591663-williams-fractal-indicator/',scope:'The standard five-bar fractal and configurable lookback. This differs from the strict three-bar convention used in this chapter.'},
 {title:'TradingView — Back-adjustment for continuous futures',url:'https://www.tradingview.com/support/solutions/43000685266-how-can-i-enable-backadjustment-for-continuous-futures/',scope:'B-ADJ removes roll gaps by adjusting earlier contract prices. Adjusted prices are not identical to the originally traded historical contract levels.'},
 {title:'Investor.gov — Stop, Stop-Limit, and Trailing Stop Orders',url:'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15',scope:'Stop-order activation and execution uncertainty. It does not identify hidden orders or motives from candlestick patterns.'},
];
export const swingQuizzes=[
 {question:'When is the NQ swing high confirmed?',context:'C2 reaches 20,468.75. C3 opens at 10:15 NY and closes at 10:30 with a lower high.',options:['At 10:30, after C3 closes.','At 10:00, when C2 opens.','At 10:15, before C3 has finished.'],correctIndex:0,explanation:'The pivot belongs to C2, but the right-hand comparison is only known after C3 closes. The confirmation timestamp is 10:30.'},
 {question:'Does a tied high qualify under this chapter’s strict rule?',context:'C1 high = 20,468.75; C2 high = 20,468.75; C3 high = 20,442.00.',options:['No. C2 is not strictly higher than C1.','Yes, because C3 closed lower.','Yes, if the next candle closes lower.'],correctIndex:0,explanation:'Equality fails the strict greater-than test. A later close cannot remove the original tie.'},
 {question:'What does a protected-low label establish?',context:'ES rallies from 5,880.25 and closes above the selected prior high. Later price revisits that area.',options:['A selected structural reference; it can still fail.','A guaranteed institutional defense.','A universally safe three-tick stop.'],correctIndex:0,explanation:'The label describes a role within the framework. It does not reveal institutional orders, predict a hold, or establish a universally safe stop.'},
];
