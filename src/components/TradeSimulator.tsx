import {useState} from 'react';
import {GuidedMarketDesk} from './market/GuidedMarketDesk';
import {ToolRouteStudy} from './ToolRouteStudy';
import {useTranslation} from '../i18n/TranslationProvider';
import references from '../data/practiceToolReferences.generated.json';
import {legacyPracticeMetadata} from '../data/legacyPracticeMetadata';
import {RoleLine,LoopStrip,NextStepBar,TakeawayBlock,TrustFooter} from './practice/PracticeLoop';
export interface TradeSimulatorProps {initialModelSlug?:string;onNavigateUrl?:(url:string)=>void}
const applications:Record<string,{path:string;label:readonly[string,string];reason:readonly[string,string]}>={
 'ict-2022-model':{path:'/tools/chartlab/btc-2022-bullish-model/',label:['Study the 2022 sequence on the chart','چارٹ پر 2022 ترتیب کا مطالعہ کریں'],reason:['Use its own authored candles and checks to connect context, sweep, displacement and retracement.','اس کی اپنی فرضی کینڈلز اور شرائط سے سیاق، سویپ، ڈسپلیسمنٹ اور واپسی کا تعلق سمجھیں۔']},
 'silver-bullet-short':{path:'/tools/chartlab/nq-silver-bullet-short/',label:['Open Silver Bullet chart practice','سلور بُلٹ کی چارٹ مشق کھولیں'],reason:['Compare the dated New York time window, confirmation, return and contrasting cases.','تاریخ کے مطابق نیویارک کی وقت ونڈو، تصدیق، واپسی اور مختلف کیسز کا تقابل کریں۔']},
 'failed-ob-breaker':{path:'/tools/chartlab/eurusd-failed-ob-breaker/',label:['Inspect a failed block and breaker','ناکام بلاک اور بریکر جانچیں'],reason:['Follow the original zone, its failure boundary and the later role-reversal evidence.','اصل زون، اس کی ناکامی کی حد اور بعد میں کردار بدلنے کے شواہد دیکھیں۔']},
 'ote-expansion-long':{path:'/tools/delivery-suite/ote-calculator/',label:['Measure an OTE retracement','OTE ریٹریسمنٹ ناپیں'],reason:['Change anchors and direction; separate ratio arithmetic from setup qualification.','اینکر اور سمت بدلیں؛ ریشو کے حساب کو سیٹ اپ کی اہلیت سے الگ رکھیں۔']},
 'london-judas-swing':{path:'/tools/delivery-suite/judas-planner/',label:['Measure the reference range','حوالہ رینج ناپیں'],reason:['Calculate range extensions. This calculator does not detect a Judas swing or confirm a reversal.','رینج کی ایکسٹینشن نکالیں۔ یہ کیلکولیٹر جوڈاس سوئنگ یا پلٹاؤ کی تصدیق نہیں کرتا۔']},
 'news-driver-reversal':{path:'/learn/ict-news-volatility-no-trade-framework/',label:['Study news risk and the no-trade decision','خبر کے رسک اور ٹریڈ نہ کرنے کے فیصلے کو سمجھیں'],reason:['Read the limits of candle-only evidence around releases; no news feed or event-specific replay is supplied.','خبر کے وقت صرف کینڈلز کے شواہد کی حدود پڑھیں؛ نیوز فیڈ یا مخصوص خبر کا ری پلے دستیاب نہیں۔']}
};
export function TradeSimulator({initialModelSlug}:TradeSimulatorProps){
 const {locale,href}=useTranslation(),n=locale==='ur'?1:0,T=(en:string,ur:string)=>n?ur:en;
 const [practiceOpen,setPracticeOpen]=useState(false);
 if(!initialModelSlug)return <GuidedMarketDesk mode="simulator"/>;
 const path='/tools/simulator/'+initialModelSlug+'/',meta=legacyPracticeMetadata[path],application=applications[initialModelSlug];
 const index=references.simulator.findIndex(r=>r.slug===initialModelSlug),previous=references.simulator[index-1],next=references.simulator[index+1];
 const sources=[{title:T('LearnSMC: relevant study and its disclosed sources','LearnSMC: متعلقہ مطالعہ اور اس کے درج ذرائع'),url:'https://learnsmc.xyz'+application.path}];
 return <article className="practice-page simulator-brief" data-simulator-brief={initialModelSlug}>
 <header><nav className="breaker-breadcrumbs" aria-label={T('Breadcrumbs','رہنمائی کا راستہ')}><a href={href('/tools/')}>{T('Workbench & Lab','ورک بینچ اور لیب')}</a> / <a href={href('/tools/simulator/')}>{T('Trade Simulator','ٹریڈ سمیولیٹر')}</a></nav><h1>{meta.h1[n]}</h1><RoleLine tool="simulator"/><LoopStrip tool="simulator"/></header>
 <aside className="practice-takeaway"><h2>{T('Study this topic, then practise the decision','موضوع سمجھیں، پھر فیصلے کی مشق کریں')}</h2><p>{T('This is a topic study brief, not a dedicated model replay. Its written price examples are illustrative and are not the candles in the optional general simulator below.','یہ موضوع کی مطالعاتی رہنمائی ہے، مخصوص ماڈل کا ری پلے نہیں۔ تحریری قیمتوں کی مثالیں فرضی ہیں اور نیچے اختیاری عمومی سمیولیٹر کی کینڈلز سے مختلف ہیں۔')}</p></aside>
 <ToolRouteStudy family="simulator" slug={initialModelSlug}/>
 <section className="practice-takeaway" data-topic-application><h2>{T('Apply this topic','اس موضوع کو عملی طور پر سمجھیں')}</h2><a href={href(application.path)}>{application.label[n]}</a><p>{application.reason[n]}</p></section>
 <section className="simulator-general"><h2>{T('Optional: general decision practice','اختیاری: عمومی فیصلے کی مشق')}</h2><p>{T('All six study briefs share this same six-case exercise. It is not a Silver Bullet, Judas, breaker, OTE or news-specific dataset. Opening a different brief does not change the exercise rules or its candle series.','چھ کی چھ مطالعاتی رہنمائی میں یہی چھ کیسز کی مشق مشترک ہے۔ یہ سلور بُلٹ، جوڈاس، بریکر، OTE یا خبر کا مخصوص ڈیٹا نہیں۔ دوسری رہنمائی کھولنے سے مشق کی شرائط یا کینڈلز نہیں بدلتیں۔')}</p>
 <button className="practice-open-case" aria-expanded={practiceOpen} aria-controls="general-decision-workspace" onClick={()=>setPracticeOpen(!practiceOpen)}>{practiceOpen?T('Close general practice','عمومی مشق بند کریں'):T('Open the shared six-case exercise','چھ مشترک کیسز کی مشق کھولیں')}</button>
 <div id="general-decision-workspace" hidden={!practiceOpen}>{practiceOpen&&<GuidedMarketDesk mode="simulator" storageKey="learnsmc-practice-simulator-v1" hideNextTools/>}</div><p><a href={href('/tools/simulator/#practice-chooser')}>{T('Browse all six general cases','چھ کے چھ عمومی کیسز دیکھیں')}</a></p></section>
 <TakeawayBlock tool="simulator"/><NextStepBar tool="simulator"/>
 <nav className="delivery-module-nav" aria-label={T('Study brief navigation','مطالعاتی رہنمائی کی نیویگیشن')}>{previous&&<a href={href('/tools/simulator/'+previous.slug+'/')}>{T('Previous: ','پچھلا: ')}{previous.label[n]}</a>}<a href={href('/tools/simulator/')}>{T('All simulator scenarios','سمیولیٹر کے تمام منظرنامے')}</a>{next&&<a href={href('/tools/simulator/'+next.slug+'/')}>{T('Next: ','اگلا: ')}{next.label[n]}</a>}</nav>
 <section id="brief-sources"><h2>{T('Sources and limits','ذرائع اور حدود')}</h2><p>{T('The linked study states its own conventions, evidence and limitations. These briefs do not supply historical market data or establish that a named trading method is profitable.','متعلقہ مطالعے میں اس کی روایات، شواہد اور حدود درج ہیں۔ یہ رہنمائی تاریخی مارکیٹ ڈیٹا فراہم نہیں کرتی اور کسی نام زد طریقے کے منافع بخش ہونے کا ثبوت نہیں۔')}</p><ul>{sources.map(s=><li key={s.url}><a href={s.url}>{s.title}</a></li>)}</ul></section>
 <TrustFooter reviewedAt="2026-11-05" sources={sources} sourceId="brief-sources"/>
 </article>;
}
