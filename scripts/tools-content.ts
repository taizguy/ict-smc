import { deliverySuiteReading } from '../src/data/deliverySuiteReading';
import { AuditedRouteBody } from '../src/components/AuditedRouteDocument';
import { workbenchToolCatalog } from '../src/data/workbenchCatalog';
import { GLOSSARY_CATEGORIES, CONCEPT_SLUG_MAP, getGlossaryConceptPath } from '../src/utils/glossaryRoutes';
import { lessonAuthor, publisher } from '../src/utils/publisher';
import { labGuides } from '../src/data/labGuides';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ChapterDiagram } from '../src/components/ChapterDiagram';
import type { RouteMeta } from './prerender';
import { masterclassCollection } from '../src/data/masterclassData';
import { textbookChapters } from '../src/data/chaptersData';
import { chartScenarios } from '../src/data/chartScenarios';
import { guidedChartRevision } from '../src/utils/guidedChartDrills';
import { SIMULATOR_MODELS, BACKTEST_STRATEGIES, MASTERY_EXAMS, DELIVERY_SUITE_MODULES, getChartScenarioSlug } from '../src/utils/workbenchToolRoutes';
import { FVG_GUIDANCE, OB_GUIDANCE, INTERPRETATION_GUIDANCE } from '../src/data/tradingDefinitions';
const e=(s:unknown)=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const p=(s:string)=>`<p>${e(s)}</p>`;
const section=(title:string,items:string[])=>`<section><h2>${e(title)}</h2>${items.map(p).join('')}</section>`;
export function correctToolDocument(r:RouteMeta,path:string){
 if(!path.startsWith('/tools/'))return;
 const parts=path.split('/').filter(Boolean),tool=parts[1],slug=parts.at(-1);
 if(Object.hasOwn(labGuides,tool)&&(tool!=='delivery-suite'||parts.length===2)){
  const guide=labGuides[tool];
  const names:Record<string,string>={btc_2022_bullish_model:'BTC: Liquidity & FVG',nq_silver_bullet_short:'NQ: Silver Bullet',eurusd_failed_ob_breaker:'EUR/USD: Failed Block',xauusd_gold_legacy_model:'Gold: Sweep & Reference',eur_mmbm_propulsion_model:'EUR/USD: Price Curve',nq_2026_ath_alchemy_ndog_macro:'NQ: Opening Gap'};
  const scenario=chartScenarios.find(s=>getChartScenarioSlug(s.id)===slug);
  const context=tool==='chartlab'?(scenario?names[scenario.id]:'Chart Laboratory'):tool==='delivery-suite'?'ICT Delivery Suite':tool==='simulator'?(SIMULATOR_MODELS.find(m=>m.slug===slug)?.name||'Trade Simulator'):(BACKTEST_STRATEGIES.find(m=>m.slug===slug)?.shortName||'Backtest Lab');
  r.title=`${context}: ${tool==='delivery-suite'?'Session Preparation':tool==='backtest'?'Rule Study':tool==='simulator'?'Decision Practice':'Chart Practice'} | LearnSMC`;
  r.heading=`${context}: ${guide.title}`;
  r.description=`${context}. ${guide.description}`;
  r.bodyHtml=section(guide.title,guide.paragraphs)+(tool==='chartlab'?renderToStaticMarkup(createElement(AuditedRouteBody,{pathname:path,heading:r.heading})):renderToStaticMarkup(createElement(ChapterDiagram,{chapterId:tool==='simulator'?22:38,staticOnly:true})))+`<p><a href="/tools/chartlab/">Chart Laboratory</a> · <a href="/tools/simulator/">Trade Simulator</a> · <a href="/tools/backtest/">Backtest Lab</a> · <a href="/tools/delivery-suite/">ICT Delivery Suite</a> · <a href="/resources/ict-smc-cheat-sheet/">Free glossary and cheat sheet</a></p>`;
  r.schemaJson={'@type':'WebApplication',name:context,description:guide.description,url:r.canonical,applicationCategory:'EducationalApplication',operatingSystem:'Web browser',isAccessibleForFree:true,author:lessonAuthor,publisher,dateModified:'2026-10-23'};
  return;
 }
 const evidence=section('Definitions and evidence conventions',[INTERPRETATION_GUIDANCE,FVG_GUIDANCE,OB_GUIDANCE]);
 if(!tool){r.title='Trading Study Tools, Charts and Reference | LearnSMC';r.heading='Trading study workbench';r.description='Explore chart exercises, trade-plan arithmetic, hypothetical expectancy, a device-local journal and ICT/SMC reference lessons.';r.bodyHtml=section('Choose a study task',[
 `Browse ${masterclassCollection.length} independent masterclass/reference lessons, 41 glossary concepts and sixteen comparison pages. The tools describe their assumptions and do not award professional credentials.`,
 'Chart Laboratory explains one context-to-execution sequence at a time using separate hourly and five-minute teaching charts. The simulator asks the learner to wait, participate or stand aside before revealing the outcome. These are authored examples, not historical records.',
 'Backtest Lab first applies a complete stated checklist to six teaching cases, including skipped and unfilled orders. Its separate advanced CSV sandbox tests isolated gap geometry, not a complete ICT strategy. The journal stores user-entered records and drafts in this browser; export backups.',
 'The delivery suite provides a New York clock, tick-aware retracement arithmetic, whole-contract futures sizing, range-multiple projections and a device-local study checklist. Calculations do not independently validate a setup.'
 ]);}
 else if(tool==='simulator'){
 const m=SIMULATOR_MODELS.find(m=>m.slug===slug);r.heading=m?`${m.name}: trade-plan exercise`:'Trade-plan reasoning exercise';r.title=`${m?.name||'Trade-Plan Reasoning and Risk'} | LearnSMC`;r.description='Inspect fictional entry, stop and target assumptions. Choose an exit and calculate signed R; no historical fills or predicted outcomes.';
 r.bodyHtml=section('Scope and method',['This is a transparent educational arithmetic and reasoning exercise. All example prices refer to a fictional BTC/USD instrument. Model presets describe a thesis, not a forecast or an observed strategy win rate.',m?.description||'Choose a model and compare its direction, higher-timeframe thesis, range location, liquidity observation and confirmation assumptions. A consistent plan can still lose.', 'The structural, tight and fixed-20-point stops use 600, 200 and 20 price units respectively. These are illustrative assumptions, not recommendations. The fixed 1.5R target is exactly 1.5 times the selected initial stop distance. External/internal reference targets are fictional levels.'])+section('Result calculation',['Select a hypothetical target, stop or custom exit. Signed gross R equals (exit minus entry) times the direction sign, divided by the absolute entry-to-stop distance. Net R subtracts the selected cost in R. Entry, stop, target and assumed exit are displayed together so the arithmetic can be checked.','The exercise does not contain an exchange order book, historical candle feed, queue-priority model, slippage simulation or measured adverse/favorable excursion. Limit fills and real-world profitability are not established. Record your observations and seek counterexamples rather than treating a confluence checklist as an outcome engine.']);
 }
 else if(tool==='backtest'){
 const s=BACKTEST_STRATEGIES.find(s=>s.slug===slug);r.heading=s?`${s.shortName}: hypothetical expectancy`:'Hypothetical expectancy lab';r.title=`${s?.shortName||'Hypothetical Expectancy Lab'} — Assumptions | LearnSMC`;r.description='Explore 101 reproducible hypothetical trade paths with editable probability, reward, risk and costs. No historical strategy performance is claimed.';
 r.bodyHtml=section('Hypothetical assumptions',[s?.description||'Choose a study model, then state hypothetical win probability, gross winning R, fractional risk, cost R, trade count and seed. All model presets start with the same assumptions; names do not imply a measured edge.','This is not a historical backtest. No dated market dataset, trade-entry scan or verified strategy performance series is supplied. The generator produces 101 independent-outcome teaching paths from a seeded random generator. Each trade wins the assumed reward or loses one initial risk unit, then pays the assumed cost.'])+section('Calculations and interpretation',['Risk is a percentage of current equity, initially $10,000. The highlighted path is the median ending-equity path, selected by ranking all 101 final balances. Its realized win rate, net monetary profit factor, return and peak-to-trough drawdown are computed from its own ledger. It is not a pointwise median curve.','Net expectancy in R = probability × winning R − loss probability × losing R − cost R. Assumed expectancy is not measured strategy performance. Costs, serial dependence and changing conditions can alter results; drawdown can exceed single digits even with low risk.','Export the assumptions and generated ledgers to reproduce the result. Sample ending-equity percentiles summarize this generated sample; they are not confidence intervals for real-world trading returns. Real evaluation requires sourced dated data, explicit rules, execution costs and out-of-sample checks.']);
 }
 else if(tool==='journal'){
 r.title='Trading Journal — Device-Local Records and Review | LearnSMC';r.description='Record actual signed R, execution details and notes; keep device-local backups and review analytics from your own entries.';
 r.bodyHtml=section('Device-local trading journal',['Records and drafts remain in this browser on this device. They are not sent to LearnSMC or synchronized between devices. Clearing browser data removes them. Export backups regularly. No demo results are added to personal statistics.','Enter actual symbol, direction, model, date, time, timezone, timeframe, signed realized R and optional USD P&L. Positive results describe wins, negative results losses and zero breakeven. The form does not fabricate execution times or fixed monetary amounts.'])+section('Log, audit and analytics',['The log supports editing, deletion with session undo, JSON backup export and validated backup restore that preserves existing entries. An unreadable stored record is not silently replaced with sample data. The page reports storage failures instead of promising a successful save.','The audit view aggregates a self-reported checklist. Analytics compute trade counts, mean realized R, win/loss/breakeven counts and recorded P&L from your entries only. A checklist score is not proof of an edge. Costs should be included consistently in realized results.']);
 }
 else if(tool==='profile'){
 const exam=MASTERY_EXAMS.find(m=>m.slug===slug);r.title=`${exam?.title||'Learning Progress and Practice Quizzes'} | LearnSMC`;r.description='View saved curriculum completion and fixed practice quizzes with device-local answers, explanations and a consistent 80% practice threshold.';
 r.bodyHtml=section('Learning progress', [`The roadmap derives its groups from the current ${textbookChapters.length}-lesson curriculum. Completion reflects lessons marked complete in this browser; no levels are pre-completed or locked. Each group links to its real curriculum page.`, 'Practice quizzes contain fixed questions rather than randomized or professionally accredited assessments. A score does not establish live-trading readiness, verified simulator experience or a professional credential.'])+section(exam?.title||'Practice assessment method',[exam?.description||'Choose one of five fixed practice quizzes. Select an answer for every question before submitting. Answers use native keyboard-accessible radio controls.','The practice pass threshold is 80%. Results and answers are saved on this device; resetting a quiz clears that attempt. After submission, review correct answers and explanations. A pass is an educational milestone only. Clearing local browser data removes saved practice records.']);
 }
 else if(tool==='delivery-suite'){
 const module=DELIVERY_SUITE_MODULES.find(m=>m.slug===slug);r.title=`${module?.name||'Delivery Study Suite'} | LearnSMC`;r.description='Independent New York study clock, instrument-aware retracement calculator, range extensions and a saved personal lesson checklist.';
 r.bodyHtml=deliverySuiteReading.map(item=>section(item.title,item.paragraphs)).join('');
 }
 else if(tool==='knowledge-graph'){
 r.description='Explore an interactive 3D tree of ICT and smart money concepts. Expand topic branches, find related concepts, and open their explanations.';
 r.bodyHtml=section('See how smart money concepts fit together',['Expand a topic branch, rotate the 3D graph, or search for a concept to focus its connections. The accessible text tree provides the same concept links without requiring WebGL.','Lines show topic grouping, not causation, a guaranteed trading sequence or evidence of profitability.'])+GLOSSARY_CATEGORIES.map(category=>`<section><h2>${e(category.name)}</h2><ul>${Object.values(CONCEPT_SLUG_MAP).filter(c=>c.category===category.id).map(c=>`<li><a href="${getGlossaryConceptPath(c.slug,c.categorySlug)}">${e(c.name)}</a></li>`).join('')}</ul></section>`).join('');
 }
 else if(tool==='masterclass'&&parts.length===2){r.title=`Masterclass Hub — ${masterclassCollection.length} Study Lessons | LearnSMC`;r.heading=`Masterclass hub: ${masterclassCollection.length} lessons`;r.description=`Browse ${masterclassCollection.length} independent model and reference lessons with sequences, diagrams, invalidation checklists and risk assumptions.`;}
 else if(tool==='chartlab'){
 const scenario=chartScenarios.find(s=>getChartScenarioSlug(s.id)===slug);r.description='Study authored illustrative candles with validated marking tasks, manual replay and accessible price controls. No historical feed or outcome prediction.';
 if(scenario){r.bodyHtml=section(scenario.title,[scenario.description,`${scenario.asset}: ${scenario.timeframe}. These timestamps describe a compressed teaching illustration, not a sourced historical exchange record.`,scenario.htfContext])+section('Guided marking and replay',['The exercise starts at the first candle. Reveal bars manually or replay them; only revealed bars determine the visible price scale. Review mode deliberately reveals the full example. It is separate from assessed guided practice.','Candle answers are checked against the pre-sweep extreme, annotated sweep range, largest specified post-sweep body, structure/role-reversal area and entry-array range. Entry prices must be inside the marked array; stops must be beyond the sweep extreme and on the loss side; the target must match the opposing annotated reference.'])+section('Accessible controls and limitations',['Use a labeled candle selector or price form for keyboard marking. Pointer coordinates are converted into SVG coordinates and prices are rounded to instrument precision. Overlays wait until their defining candles are revealed.','These criteria assess the authored exercise, not universal market behavior or profitability. Annotated FVGs and blocks are supplied by the author; no real-time detection or order-book reconstruction is performed.']);}
 }
 if(!tool){
  r.heading='Workbench & Lab';r.subheading='Learn it. Observe it. Test it.';
  const cards=workbenchToolCatalog.map(item=>`<article><h3><a href="${e(item.url)}">${e(item.name)}</a></h3><p>${e(item.desc)}</p><ul>${item.features.map(feature=>`<li>${e(feature)}</li>`).join('')}</ul></article>`).join('');
  r.bodyHtml=`<section><h2>Understand the idea. Put it to work.</h2><p>Ten tools for chart practice, concept reference and honest review. New here? Start by observing a chart.</p><a href="/tools/chartlab/">Open Chart Laboratory</a></section><section><h2>Study desk</h2><p>Select a tool to open it.</p>${cards}</section>`;
 }
 r.heading=r.heading.replace(/Certification Levels/g,'Practice Progress').replace(/Certification/g,'Practice').replace(/Certified Institutional Operator/g,'Curriculum Practice Learner');
 if (parts.length > 2) {
   r.description=`${r.heading}: ${r.description}`;
   if (tool==='journal'||tool==='profile') r.title=`${r.heading} | LearnSMC`;
 }
 r.bodyHtml=evidence+r.bodyHtml;
 r.schemaJson={'@type':['masterclass','glossary','compare','knowledge-graph'].includes(tool||'')?'LearningResource':'WebPage',name:r.heading,url:r.canonical,description:r.description,inLanguage:'en',isAccessibleForFree:true,author:lessonAuthor,publisher};
}
