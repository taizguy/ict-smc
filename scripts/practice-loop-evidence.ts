import fs from 'node:fs';
import ts from 'typescript';
import {SIMULATOR_MODELS,BACKTEST_STRATEGIES,DELIVERY_SUITE_MODULES} from '../src/utils/workbenchToolRoutes';
import {legacyPracticeMetadata} from '../src/data/legacyPracticeMetadata';
import {remainingCases} from '../src/data/chartLabRemaining';
import {learningCases,evaluateCase} from '../src/data/learningCases';
import {sessionRows} from '../src/utils/practiceSessionTime';
import {practiceCaseFiles} from '../src/data/practiceCases';
import {chartLabStudies} from '../src/data/chartLabHub';
import {remainingStudies} from '../src/data/chartLabRemainingContent';
import {casesFor} from '../src/data/chartLabRemaining';
import {silverStages,silverSources} from '../src/data/silverBulletStudy';
import {breakerStages,breakerSources} from '../src/data/breakerStudy';
import {ChartHubArtwork} from '../src/data/chartHubArtwork';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
fs.mkdirSync('outputs/practice-loop',{recursive:true});
const pairs=new Map<string,string>();
for(const file of ['src/data/practiceLoopContent.ts','src/data/practiceCases.ts','src/components/practice/PracticeLoop.tsx','src/components/practice/PracticeLoopPage.tsx','src/components/practice/PracticeReading.tsx','src/components/market/MarketChart.tsx','src/components/market/CaseStudyResource.tsx','src/components/market/GuidedMarketDesk.tsx']){
 const source=ts.createSourceFile(file,fs.readFileSync(file,'utf8'),ts.ScriptTarget.Latest,true,file.endsWith('tsx')?ts.ScriptKind.TSX:ts.ScriptKind.TS);
 const literal=(n:ts.Node)=>ts.isStringLiteral(n)||ts.isNoSubstitutionTemplateLiteral(n);
 const add=(a:ts.Node,b:ts.Node)=>{if(literal(a)&&literal(b)&&/[\u0600-\u06ff]/.test(b.text))pairs.set(a.text,b.text);};
 const visit=(n:ts.Node)=>{if(ts.isCallExpression(n)&&['p','T'].includes(n.expression.getText(source))&&n.arguments.length===2)add(n.arguments[0],n.arguments[1]);if(ts.isArrayLiteralExpression(n)&&n.elements.length===2)add(n.elements[0],n.elements[1]);if(ts.isConditionalExpression(n))add(n.whenFalse,n.whenTrue);ts.forEachChild(n,visit);};visit(source);
}
const homePairs=[['Four steps. One practice loop.','چار مرحلے۔ مشق کا ایک سلسلہ۔'],['See it. Plan it. Decide it. Test it.','دیکھیں۔ منصوبہ بنائیں۔ فیصلہ کریں۔ جانچیں۔'],['Plan the risk','رسک کا منصوبہ بنائیں'],['Turn a fictional setup into a risk plan and a session time.','فرضی سیٹ اپ سے رسک کا منصوبہ اور سیشن کا وقت طے کریں۔']];
homePairs.forEach(([en,ur])=>pairs.set(en,ur));
fs.writeFileSync('src/i18n/practice-loop-urdu.json',JSON.stringify(Object.fromEntries(pairs),null,2)+'\n');
// This contextual link-label correction is reviewed here but deliberately does
// not overwrite the global glossary catalogue or alter legacy lesson wording.
const reviewPairs=[...pairs.entries(),['Sell-side liquidity','سیل سائیڈ لیکویڈیٹی (Sell-side liquidity)']];
const csv=(s:string)=>'"'+s.replaceAll('"','""')+'"';fs.writeFileSync('docs/practice-loop-urdu-review.csv','\uFEFFEnglish,Urdu\n'+reviewPairs.map(([en,ur])=>csv(en)+','+csv(ur)).join('\n')+'\n');
// A valid downloadable template copies 40 existing authored BTC context bars; no new prices/times.
const bars=remainingCases.find(c=>c.id==='b-a')!.groups[0].bars.slice(0,40);fs.mkdirSync('public/downloads',{recursive:true});fs.writeFileSync('public/downloads/practice-ohlc-template.csv','time,open,high,low,close\n'+bars.map(b=>[b.time,b.open,b.high,b.low,b.close].join(',')).join('\n')+'\n');
console.log(`${pairs.size} bilingual pairs; ${bars.length} unchanged synthetic CSV bars exported.`);
const tables={sessions:{en:sessionRows('en-GB'),ur:sessionRows('ur-PK')},backtest:learningCases.map(c=>{const r=evaluateCase(c,1.5,.05),o=r.order;return {id:c.id,reason:r.reason||null,order:o?{status:o.status,filledAt:o.filledAt??null,r:o.r??null}:null};})};
fs.writeFileSync('src/data/practiceReadingTables.generated.json',JSON.stringify(tables,null,2)+'\n');
const summaryKeys=['id','slug','title','instrument','session','timeframe','glossaryTermIds','curriculumChapterSlug','difficulty','estimatedMinutes','learningGoal','scope','toolStatus'] as const;
fs.writeFileSync('src/data/practiceCaseSummaries.generated.json',JSON.stringify(practiceCaseFiles.map(c=>Object.fromEntries(summaryKeys.map(k=>[k,c[k]]))),null,2)+'\n');
const deliveryLabels:Record<string,readonly[string,string]>={'macro-clock':['Macro clock','میکرو گھڑی'],'ote-calculator':['OTE calculator','OTE کیلکولیٹر'],'judas-planner':['Judas planner','جوڈاس پلانر'],'learning-path':['Study checklist','مطالعے کی چیک لسٹ']};
const references={simulator:SIMULATOR_MODELS.map(r=>({slug:r.slug,label:legacyPracticeMetadata['/tools/simulator/'+r.slug+'/'].topic})),backtest:BACKTEST_STRATEGIES.map(r=>({slug:r.slug,label:legacyPracticeMetadata['/tools/backtest/'+r.slug+'/'].topic})),delivery:DELIVERY_SUITE_MODULES.map(r=>({slug:r.slug,label:deliveryLabels[r.slug]}))};
fs.writeFileSync('src/data/practiceToolReferences.generated.json',JSON.stringify(references,null,2)+'\n');
const cleanupReview=[...Object.values(legacyPracticeMetadata).flatMap(m=>[m.title,m.h1,m.topic]),...Object.values(deliveryLabels)];
fs.writeFileSync('docs/practice-cleanup-urdu-review.csv','\uFEFFEnglish,Urdu\n'+cleanupReview.map(([en,ur])=>csv(en)+','+csv(ur)).join('\n')+'\n');
const hubFacts=Object.fromEntries(practiceCaseFiles.filter(c=>c.scope==='spine').map(c=>{const s=remainingStudies.find(s=>s.slug===c.slug);return [c.id,{slug:c.slug,instrument:s?.instrument.replace('-style','')|| (c.id==='silver'?'NQ':'EUR/USD'),cases:c.variants.length,stages:s?.stages.length||(c.id==='silver'?silverStages.length:breakerStages.length)}];}));
const sources=[...new Map([...remainingStudies.flatMap(s=>s.sources),...silverSources,...breakerSources].map(s=>[s.url,s])).values()];
fs.writeFileSync('src/data/chartHubFacts.generated.json',JSON.stringify({studies:hubFacts,sources},null,2)+'\n');
fs.writeFileSync('src/data/chartHubArtwork.generated.json',JSON.stringify(Object.fromEntries(chartLabStudies.map(study=>[study.slug,{en:renderToStaticMarkup(createElement(ChartHubArtwork,{study,playing:true})),ur:renderToStaticMarkup(createElement(ChartHubArtwork,{study,ur:true,playing:true}))}])),null,2)+'\n');

// Per-route briefs preserve the original model without loading other routes' prose.
const {toolRouteStudies}=await import('../src/data/toolRouteStudies');
for(const [family,studies]of Object.entries(toolRouteStudies))for(const [slug,study]of Object.entries(studies)){const dir='src/data/runtime/tool-briefs/'+family;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/'+slug+'.json',JSON.stringify(study)+'\n');}
