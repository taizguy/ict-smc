import type {CurriculumSource} from '../curriculumReview';
import type {TextbookChapter} from '../../types';
import type {FvgDocumentBlock} from './fvgDocument';
import data from './liquidityDocument.json';
export type LiquidityBlock=Omit<FvgDocumentBlock,'type'>&{type:FvgDocumentBlock['type']|'label'};
export const liquidityDocument:{h1:string;quickAnswer:string;takeaways:string[];sections:{number:number;title:string;blocks:LiquidityBlock[]}[];faqs:{question:string;answer:string}[]}=data as typeof liquidityDocument;
export const liquidityPath='/learn/liquidity-the-most-misunderstood-word-in-trading/';
export const liquidityDates={published:{iso:'2026-10-15',label:'15 October 2026'},updated:{iso:'2026-11-12',label:'12 November 2026'}};
const glossary=data.sections[21].blocks.find(b=>b.type==='table')!.rows!.slice(1);
export const liquidityChapter:TextbookChapter={id:4,slug:'liquidity-the-most-misunderstood-word-in-trading',title:data.h1,part:'Part I - Market Foundations',status:'published',level:1,quote:data.quickAnswer,summary:data.takeaways,keyTerms:glossary.map(r=>({term:r[0],definition:r[1]})),practiceQuestions:data.faqs.slice(0,5).map(q=>q.question),sections:data.sections.map(s=>({id:`4.document.${s.number}`,title:s.title,content:s.blocks.filter(b=>b.type==='paragraph').map(b=>b.text).join('\n\n')}))};
export const liquiditySources:CurriculumSource[]=[
 {title:'Investor.gov — Liquidity (or Marketability)',url:'https://www.investor.gov/introduction-investing/investing-basics/glossary/liquidity-or-marketability',scope:'The SEC investor glossary defines trading liquidity, price impact and liquidity risk. It does not verify inferred stop clusters on a chart.'},
 {title:'Federal Reserve Bank of New York — Market and Funding Liquidity: An Overview',url:'https://www.newyorkfed.org/newsevents/speeches/2016/dud160501',scope:'William Dudley’s 2016 speech distinguishes the expense and time of trading from the ability to raise cash, and explains their interaction during stress.'},
 {title:'European Central Bank — Gauging the interplay between market liquidity and funding liquidity',url:'https://www.ecb.europa.eu/press/financial-stability-publications/fsr/special/html/ecb.fsrart202305_01~830184261b.en.html',scope:'The May 2023 feature discusses market-liquidity dimensions, funding conditions and adverse feedback loops. Its historical analysis is not a forecast for the illustrative examples.'},
 {title:'European Systemic Risk Board — Systemic liquidity risk: a monitoring framework',url:'https://www.esrb.europa.eu/pub/pdf/reports/esrb.report202501_systemicliquidityrisk~90f2044791.en.pdf',scope:'The February 2025 report’s conceptual section distinguishes tightness, depth, breadth, immediacy and resilience; its systemic-risk discussion is not a trading signal.'},
 {title:'Investor.gov — Stop, Stop-Limit, and Trailing Stop Orders',url:'https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15',scope:'The SEC bulletin distinguishes stock stop orders from stop-limit orders and explains execution-price uncertainty. Product, broker and venue rules can differ.'}
];
export const liquidityQuizzes=[
 {question:'How do you measure liquidity?',context:'The invented deep book fills a 250-unit buy at an average price of 50.04. The thin book averages 50.896.',options:['Compare spread, depth and actual execution costs.','Assume identical volume means identical fills.','Treat the best ask as a promised fill for all 250 units.'],correctIndex:0,explanation:data.faqs[4].answer},
 {question:'Is liquidity the same as volume?',context:'Two markets have identical past volume. One currently has much less displayed depth.',options:['No. Past activity does not establish available size now.','Yes. Equal volume always means equal depth.','Yes. A tight spread proves there is unlimited size.'],correctIndex:0,explanation:data.faqs[5].answer},
 {question:'Can you see stop losses in the order book?',context:'A candle trades above an old high and closes back below it.',options:['The price excursion is visible; the resting stops and motives are inferred.','The candle identifies every trader’s resting stop order.','The return proves the next trade will succeed.'],correctIndex:0,explanation:data.faqs[14].answer}
];
