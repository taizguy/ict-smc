import data from './fvgDocument.json';
import type {TextbookChapter} from '../../types';
export type FvgDocumentBlock={type:string;text?:string;rows?:(string|null)[][];ordered?:boolean;items?:string[]};
export const fvgDocument:{h1:string;quickAnswer:string;takeaways:string[];sections:{number:number;title:string;blocks:FvgDocumentBlock[];nextReads?:string}[];faqs:{question:string;answer:string}[]}=data;
export const fvgDocumentPath='/learn/fair-value-gaps-fvg-and-consequent-encroachment/';
export const fvgDocumentDates={published:{iso:'2026-10-15',label:'15 October 2026'},updated:{iso:'2026-11-11',label:'11 November 2026'}};
const glossary=fvgDocument.sections.find(s=>s.number===23)!.blocks.find(b=>b.type==='table')!.rows!.slice(1);
export const fvgDocumentChapter:TextbookChapter={id:13,slug:'fair-value-gaps-fvg-and-consequent-encroachment',part:'Part IV - Price Delivery',title:data.h1,quote:data.quickAnswer,level:1,summary:data.takeaways,keyTerms:glossary.map(r=>({term:r[0]!,definition:r[1]!})),practiceQuestions:data.faqs.slice(0,5).map(q=>q.question),sections:fvgDocument.sections.map(s=>({id:`13.document.${s.number}`,title:s.title,content:s.blocks.filter(b=>b.type==='paragraph').map(b=>b.text).join('\n\n')}))};
export const fvgNextReads=[
 ['What is market structure?','مارکیٹ اسٹرکچر کیا ہے؟','/learn/what-is-a-swing-the-atom-of-structure/'],
 ['Order blocks explained','آرڈر بلاکس کی وضاحت','/learn/order-blocks-ob-and-mitigation/'],
 ['Liquidity sweeps','لیکویڈیٹی سویپس','/learn/liquidity-engineering-and-liquidity-runs/'],
 ['Premium and discount zones','پریمیم اور ڈسکاؤنٹ زونز','/learn/ict-pd-array-selection-price-delivery-continuum/'],
 ['Candlestick basics','کینڈل اسٹک کی بنیادیں','/learn/why-candles-form-and-how-displacement-arises/'],
 ['Risk management and position sizing','رسک مینجمنٹ اور پوزیشن سائز','/tools/delivery-suite/'],
 ['How to backtest a strategy','حکمت عملی کا بیک ٹیسٹ کیسے کریں','/tools/backtest/'],
 ['What moves price in markets','مارکیٹس میں قیمت کو کیا حرکت دیتا ہے','/learn/what-actually-moves-price/']
];
