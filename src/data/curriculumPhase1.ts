import entries from './curriculumPhase1.json';
import {mergedChapterIds,canonicalChapterId,curriculumRedirects,curriculumTarget} from '../utils/curriculumMigration';
export {mergedChapterIds,canonicalChapterId,curriculumRedirects,curriculumTarget};
import type {TextbookChapter} from '../types';
export const phase1Entries=entries;
export const phase1ReviewedAt='2026-11-10';
const mergedOpenings:Record<number,readonly[string,string]>={
 61:['New York opening, lunch and afternoon studies use different observation windows. Read the session conditions first, then compare the retained tape-reading examples without treating a later move as inevitable.','نیویارک اوپن، لنچ اور دوپہر کے مطالعے مختلف ونڈوز استعمال کرتے ہیں۔ پہلے سیشن کی شرائط سمجھیں، پھر برقرار ٹیپ ریڈنگ کی مثالوں کا موازنہ کریں؛ بعد کی حرکت کو لازمی نہ سمجھیں۔'],
 25:['A first presented FVG is a qualified price reference; the first-hour range is a time-defined measurement. Study how they relate while keeping recognition times, unfinished ranges and entry rules separate.','فرسٹ پریزنٹڈ FVG موزونیت پر پورا اترنے والا قیمت کا حوالہ ہے؛ پہلے گھنٹے کی رینج وقت کی مقررہ پیمائش ہے۔ دونوں کا تعلق سمجھیں مگر پہچان کے وقت، نامکمل رینج اور انٹری کے اصول الگ رکھیں۔'],
 50:['Opening gaps compare two selected prices, while a midnight open identifies one opening reference. The combined studies keep daily, weekly and RTH measurements distinct and compare partial returns, full traversals and failures.','اوپننگ گیپ دو منتخب قیمتوں کا فرق ہے، جبکہ مڈنائٹ اوپن ایک اوپننگ حوالہ ہے۔ ان مشترکہ مطالعات میں روزانہ، ہفتہ وار اور RTH پیمائش الگ رکھ کر جزوی واپسی، مکمل عبور اور ناکامی کا موازنہ کیا گیا ہے۔'],
 21:['Daily-range anatomy and Power of Three describe related ways to organise a session. Compare the phases with the retained profile examples, but do not require every day to follow the same path or confuse a narrative with an entry trigger.','روزانہ رینج کی ساخت اور پاور آف تھری سیشن ترتیب دینے کے متعلق طریقے ہیں۔ مراحل اور پروفائل مثالوں کا موازنہ کریں، مگر ہر دن پر ایک راستہ لازم نہ کریں اور نیریٹو کو انٹری ٹرگر نہ سمجھیں۔'],
 33:['Market-maker buy and sell models organise proposed price paths through selected ranges. The short-term studies add local examples; together they help compare phases, boundaries and failed interpretations without claiming to identify actual market makers.','مارکیٹ میکر بائے اور سیل ماڈل منتخب رینجز میں ممکنہ قیمت کے راستے ترتیب دیتے ہیں۔ مختصر مدتی مطالعات مقامی مثالیں شامل کرتے ہیں؛ مراحل، حدود اور ناکام تشریحات کا موازنہ کریں، اصل مارکیٹ میکر کی شناخت کا دعویٰ نہ کریں۔'],
 28:['Intraday scalping and session day trading share a short horizon but can use different session, entry and management conventions. Compare those rules explicitly; the separate 20-day IPDA lookback study now belongs with the broader lookback lesson.','انٹراڈے اسکیلپنگ اور سیشن ڈے ٹریڈنگ کی مدت مختصر ہے مگر سیشن، انٹری اور مینجمنٹ کے اصول مختلف ہو سکتے ہیں۔ انہیں الگ واضح کریں؛ 20 دن کا IPDA مطالعہ اب بڑے لک بیک والے سبق میں ہے۔'],
 30:['Swing and position studies combine wider context with different holding periods and management rules. Keep seasonal, COT and shorter-horizon source variants distinct rather than mixing their stops, targets or entry assumptions into one universal model.','سوئنگ اور پوزیشن مطالعات بڑے تناظر کو مختلف مدت اور مینجمنٹ کے اصولوں سے جوڑتے ہیں۔ سیزنیلٹی، COT اور مختصر مدت کی ماخذ والی صورتیں الگ رکھیں؛ ان کے اسٹاپ، ہدف اور انٹری کو ایک عالمگیر ماڈل میں نہ ملائیں۔'],
 62:['News studies combine release timing, participation restrictions and possible price paths. Compare CPI, NFP and FOMC context with high-resistance runs and contract-risk examples; a visible setup cannot guarantee a fill or bound the realised loss.','خبر کے مطالعات وقت، حصہ لینے کی پابندیوں اور ممکنہ راستوں کو جوڑتے ہیں۔ CPI، NFP اور FOMC کا تناظر، زیادہ مزاحمت والے رنز اور کنٹریکٹ رسک دیکھیں؛ نمایاں سیٹ اپ فِل یا حقیقی نقصان کی حد یقینی نہیں بناتا۔']
};
export const phase1Entry=(id:number)=>entries.find(r=>r.id===canonicalChapterId(id));
export const displayChapterNumber=(id:number)=>phase1Entry(id)?.position||0;
export const isPublishedChapter=(id:number)=>phase1Entry(id)?.status==='published';
export function curriculumMetadata(path:string,locale:'en'|'ur'='en'){
 const clean=path.replace(/^\/ur(?=\/)/,'');const hub=phase1Parts.find(p=>clean===`/curriculum/${p.slug}/`);if(hub){const title=locale==='ur'?curriculumPhase1Urdu[hub.title]:hub.title;const description=hubDescriptions[hub.slug][locale==='ur'?1:0];return {title:title+' | LearnSMC',heading:title,description};}const r=entries.find(r=>clean===`/learn/${r.slug}/`);if(!r)return null;
 const i=locale==='ur'?1:0;return {title:(i===0&&'seoTitle' in r&&r.seoTitle?r.seoTitle:r.title[i])+' | LearnSMC',heading:r.title[i],description:r.description[i]};
}
const romans=['I','II','III','IV','V','VI','VII','VIII','IX','X'];
export const phase1Parts=[['Market Foundations','market-foundations'],['Market Structure','price-structure'],['Liquidity','liquidity'],['Price Delivery','price-delivery'],['Time and Sessions','time-and-sessions'],['Narrative and Bias','narrative-and-bias'],['Entry Models','entry-models'],['Risk Management','risk-management'],['Process and Psychology','process-and-psychology'],['Markets and Instruments','markets-and-instruments']].map(([title,slug],i)=>({id:i+1,title,slug,part:`Part ${romans[i]} - ${title}`}));
export function organiseCurriculum(source:TextbookChapter[]):TextbookChapter[]{
 const placeholders:TextbookChapter[]=entries.filter(r=>!source.some(c=>c.id===r.id)).map(r=>({id:r.id,slug:r.slug,title:r.title[0],part:phase1Parts[r.part-1].part,status:r.status as TextbookChapter['status'],quote:'',sections:[],summary:[],keyTerms:[],practiceQuestions:[],level:1}));
 return [...source,...placeholders].map(ch=>{const r=entries.find(r=>r.id===ch.id);if(!r)return ch;
 const sections=ch.sections.filter(s=>!(ch.id===28&&s.id==='28.2'));
 // Keep source paragraph text byte-for-byte. Stable section IDs remain independent of display numbering.
 for(const [absorbed,survivor] of Object.entries(mergedChapterIds))if(survivor===ch.id){const old=source.find(c=>c.id===+absorbed)!;sections.push(...old.sections.map((s,i)=>({...s,sourceChapterId:old.id,sourceSectionIndex:i,stableAnchor:i===0?`merged-${old.id}`:`merged-${old.id}-section-${i}`})));}
 if(ch.id===41){const moved=source.find(c=>c.id===28)!.sections.find(s=>s.id==='28.2')!;sections.push({...moved,sourceChapterId:28,sourceSectionIndex:1,stableAnchor:'ipda-20-day-lookback'});}
 const sources=source.filter(c=>mergedChapterIds[c.id]===ch.id);
 const unique=<T,>(list:T[],key:(x:T)=>string)=>list.filter((x,i,a)=>a.findIndex(y=>key(x)===key(y))===i);
 const movedTerms=ch.id===41?source.find(c=>c.id===28)!.keyTerms.filter(t=>/IPDA|20.Day/i.test(t.term)):[];const movedSummary=ch.id===41?source.find(c=>c.id===28)!.summary.filter(t=>/20.day|IPDA/i.test(t)):[];
 return {...ch,status:r.status as TextbookChapter['status'],title:r.title[0],quote:mergedOpenings[ch.id]?.[0]||ch.quote,part:phase1Parts[r.part-1].part,sections,keyTerms:unique([...([ch,...sources].flatMap(c=>c.keyTerms)).filter(t=>ch.id!==28||!/IPDA|20.Day/i.test(t.term)),...movedTerms],t=>t.term),summary:unique([...([ch,...sources].flatMap(c=>c.summary)).filter(t=>ch.id!==28||!/20.day|IPDA/i.test(t)),...movedSummary],s=>s),practiceQuestions:unique([ch,...sources].flatMap(c=>c.practiceQuestions),s=>s)};
 });
}
export const curriculumPhase1Urdu:Record<string,string>={};
for(const [en,ur] of Object.values(mergedOpenings))curriculumPhase1Urdu[en]=ur;
for(const r of entries){curriculumPhase1Urdu[r.title[0]]=r.title[1];curriculumPhase1Urdu[r.title[0]+' | LearnSMC']=r.title[1]+' | LearnSMC';curriculumPhase1Urdu[r.description[0]]=r.description[1];if('seoTitle' in r&&r.seoTitle)curriculumPhase1Urdu[r.seoTitle+' | LearnSMC']=r.title[1]+' | LearnSMC';}

const partUrdu=['مارکیٹ کی بنیادیں','مارکیٹ اسٹرکچر','لیکویڈیٹی','پرائس ڈیلیوری','وقت اور سیشنز','نیریٹو اور بائس','انٹری ماڈلز','رسک مینجمنٹ','طریقۂ کار اور نفسیات','مارکیٹس اور انسٹرومنٹس'];
phase1Parts.forEach((p,i)=>{curriculumPhase1Urdu[p.title]=partUrdu[i];curriculumPhase1Urdu[p.part]=partUrdu[i];});
Object.assign(curriculumPhase1Urdu,{'10 November 2026':'10 نومبر 2026','Additional studies and exercises':'مزید مطالعات اور مشقیں','Independent study notes; not endorsed by or affiliated with Michael Huddleston or any course provider.':'آزاد مطالعاتی نوٹس؛ مائیکل ہڈلسٹن یا کسی کورس فراہم کنندہ سے وابستہ نہیں اور ان کی توثیق حاصل نہیں۔'});
export const hubDescriptions:Record<string,readonly[string,string]>={
 'market-foundations':['Understand market auctions, order matching, order-book depth, liquidity and candle formation before studying structure, price patterns and execution.', 'اسٹرکچر، پرائس پیٹرن اور انٹری سے پہلے مارکیٹ نیلامی، آرڈر میچنگ، آرڈر بک کی ڈیپتھ، لیکویڈیٹی اور کینڈل کی تشکیل سمجھیں۔'],
 'price-structure':['Learn swing confirmation, break of structure, CHoCH and MSS through chart studies that distinguish reference selection, recognition time and failed breaks.', 'چارٹ مطالعات سے سوئنگ کی تصدیق، بریک آف اسٹرکچر، CHoCH اور MSS سیکھیں؛ حوالے کا انتخاب، پہچان کا وقت اور ناکام بریک الگ سمجھیں۔'],
 'liquidity':['Study liquidity runs, sweeps, Turtle Soup and failed breakouts while distinguishing visible price references from assumptions about hidden orders.', 'لیکویڈیٹی رنز، سویپس، ٹرٹل سوپ اور ناکام بریک آؤٹ سمجھیں، اور نمایاں قیمت کے حوالوں کو پوشیدہ آرڈرز سے متعلق مفروضوں سے الگ رکھیں۔'],
 'price-delivery':['Compare FVGs, inverse gaps, order blocks, breakers and premium-discount references using stated boundaries, contrasting examples and explicit limitations.', 'مقررہ حدود، متضاد مثالوں اور واضح حدودِ علم سے FVG، انورس گیپ، آرڈر بلاک، بریکر اور پریمیم و ڈسکاؤنٹ حوالوں کا موازنہ کریں۔'],
 'time-and-sessions':['Study trading sessions, opening ranges, first-hour FVGs, NDOG, NWOG and daily or weekly profiles with clear timezone and recognition-time conventions.', 'واضح ٹائم زون اور پہچان کے وقت کے اصولوں کے ساتھ ٹریڈنگ سیشن، اوپننگ رینج، پہلے گھنٹے کے FVG، NDOG، NWOG اور پروفائلز سمجھیں۔'],
 'narrative-and-bias':['Connect top-down context, IPDA lookbacks, SMT, COT, yields and range studies while keeping a directional view separate from entry and execution rules.', 'ٹاپ ڈاؤن تناظر، IPDA لک بیک، SMT، COT، ییلڈ اور رینج مطالعے کو جوڑیں، مگر سمت کی رائے کو انٹری اور آرڈر کے اصولوں سے الگ رکھیں۔'],
 'entry-models':['Compare ICT entry-model sequences, session and swing frameworks, news studies and options risk without treating a named setup as a complete trading plan.', 'ICT انٹری ماڈل، سیشن و سوئنگ فریم ورک، خبر کے مطالعے اور آپشن رسک کا موازنہ کریں؛ نام والے سیٹ اپ کو مکمل ٹریڈنگ پلان نہ سمجھیں۔'],
 'risk-management':['Study account-risk arithmetic, position constraints and market conditions, and recognise when a proposed setup or unclear context calls for standing aside.', 'اکاؤنٹ رسک کا حساب، پوزیشن کی پابندیاں اور مارکیٹ کے حالات سمجھیں، اور پہچانیں کہ سیٹ اپ یا غیر واضح تناظر میں کب الگ رہنا چاہیے۔'],
 'process-and-psychology':['Build a beginner study routine, keep a replay journal and examine backtesting limits while separating observations, decisions and later rule changes.', 'ابتدائی مطالعہ ترتیب دیں، ری پلے جرنل رکھیں اور بیک ٹیسٹنگ کی حدود سمجھیں؛ مشاہدات، فیصلے اور بعد کی اصولی تبدیلیاں الگ رکھیں۔'],
 'markets-and-instruments':['Compare gold and multi-asset studies with explicit feeds, session times, contract values and execution limits instead of transferring chart rules blindly.', 'واضح فیڈ، سیشن اوقات، کنٹریکٹ ویلیو اور عملی حدود کے ساتھ گولڈ و ملٹی ایسیٹ مطالعے کا موازنہ کریں؛ اصول بلا تحقیق منتقل نہ کریں۔']
};
for(const pair of Object.values(hubDescriptions))curriculumPhase1Urdu[pair[0]]=pair[1];
for(const part of phase1Parts){curriculumPhase1Urdu[part.title+' | LearnSMC']=curriculumPhase1Urdu[part.title]+' | LearnSMC';}

Object.assign(curriculumPhase1Urdu,{
 'Free ICT & Smart Money Concepts course: 57 chapters, interactive chart labs, FVG, order blocks and liquidity. English & Urdu.':'مفت ICT اور اسمارٹ منی کانسیپٹس کورس: 57 اسباق، انٹرایکٹو چارٹ لیبز، FVG، آرڈر بلاکس اور لیکویڈیٹی۔ انگریزی اور اردو میں۔',
 'Learn ICT and Smart Money Concepts through 57 concept-led lessons in ten parts, with chart studies, risk education and practice.':'دس حصوں میں 57 تصور پر مبنی اسباق سے ICT اور اسمارٹ منی کانسیپٹس سیکھیں؛ چارٹ مطالعات، رسک کی تعلیم اور عملی مشق کے ساتھ۔'
});

curriculumPhase1Urdu['Study the 20-day IPDA lookback separately']='20 دن کے IPDA لک بیک کا الگ مطالعہ کریں';

Object.assign(curriculumPhase1Urdu,{'Chapter navigation':'ابواب میں آمد و رفت','In progress':'تیاری جاری ہے',"We're working on this chapter.":'ہم اس باب پر کام کر رہے ہیں۔'});

curriculumPhase1Urdu['The roadmap derives its groups from the current 57-lesson curriculum. Completion reflects lessons marked complete in this browser; no levels are pre-completed or locked. Each group links to its real curriculum page.']='یہ روڈ میپ موجودہ 57 شائع شدہ اسباق کے نصاب سے اپنے گروپ بناتا ہے۔ تکمیل اسی براؤزر میں پڑھا ہوا نشان زد اسباق کی بنیاد پر ہے؛ کوئی درجہ پہلے سے مکمل یا بند نہیں۔ ہر گروپ اصل نصاب کے صفحے سے جڑا ہے۔';

// These availability counts must follow status without a second translation edit.
const publishedCount=entries.filter(r=>r.status==='published').length;
Object.assign(curriculumPhase1Urdu,{
 [`Free ICT & Smart Money Concepts course: ${publishedCount} chapters, interactive chart labs, FVG, order blocks and liquidity. English & Urdu.`]:`مفت ICT اور اسمارٹ منی کانسیپٹس کورس: ${publishedCount} اسباق، انٹرایکٹو چارٹ لیبز، FVG، آرڈر بلاکس اور لیکویڈیٹی۔ انگریزی اور اردو میں۔`,
 [`Learn ICT and Smart Money Concepts through ${publishedCount} concept-led lessons in ten parts, with chart studies, risk education and practice.`]:`دس حصوں میں ${publishedCount} تصور پر مبنی اسباق سے ICT اور اسمارٹ منی کانسیپٹس سیکھیں؛ چارٹ مطالعات، رسک کی تعلیم اور عملی مشق کے ساتھ۔`,
 [`The roadmap derives its groups from the current ${publishedCount}-lesson curriculum. Completion reflects lessons marked complete in this browser; no levels are pre-completed or locked. Each group links to its real curriculum page.`]:`یہ روڈ میپ موجودہ ${publishedCount} شائع شدہ اسباق کے نصاب سے اپنے گروپ بناتا ہے۔ تکمیل اسی براؤزر میں پڑھا ہوا نشان زد اسباق کی بنیاد پر ہے؛ کوئی درجہ پہلے سے مکمل یا بند نہیں۔ ہر گروپ اصل نصاب کے صفحے سے جڑا ہے۔`
});
