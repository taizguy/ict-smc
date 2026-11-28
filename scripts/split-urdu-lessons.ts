import {silverLessonDocument,silverLessonSources,silverLessonScope,silverLessonInterpretation} from '../src/data/chapters/silverBulletLesson';
import {silverLessonTranslations} from '../src/data/chapters/silverLessonTranslations';
import {silverUi} from '../src/data/chapters/silverLessonVisuals';
import {cornerstoneGuides} from '../src/data/cornerstoneGuides';
import {topicJourneys} from '../src/data/topicJourneys';
import {breakDocuments,breakTopic,breakSources,breakQuizzes,breakDates,breakReviewScope,breakInterpretation} from '../src/data/chapters/breakDocuments';
import {breakTranslations} from '../src/data/chapters/breakTranslations';
import {structureDocument,structureSources,structureQuizzes,structureDates,structureReviewScope,structureInterpretation} from '../src/data/chapters/structureDocument';
import {structureTranslations} from '../src/data/chapters/structureTranslations';
import {swingDocument,swingSources,swingQuizzes,swingDates} from '../src/data/chapters/swingDocument';
import {liquidityDocument,liquiditySources,liquidityQuizzes,liquidityDates} from '../src/data/chapters/liquidityDocument';
import {liquidityTranslations} from '../src/data/chapters/liquidityTranslations';
import {orderBookDocument,orderBookSources,orderBookQuizzes,orderBookDates} from '../src/data/chapters/orderBookLesson';
import {orderBookTranslations} from '../src/data/chapters/orderBookTranslations';
import {marketMakerDocument,marketMakerSources,marketMakerQuizzes,marketMakerDates} from '../src/data/chapters/marketMakerLesson';
import {marketMakerTranslations} from '../src/data/chapters/marketMakerTranslations';
import {model2022Document,model2022Sources,model2022Quizzes,model2022Dates} from '../src/data/chapters/model2022Lesson';
import {model2022Translations} from '../src/data/chapters/model2022Translations';
import {oteDocument,oteSources,oteQuizzes,oteDates} from '../src/data/chapters/oteLesson';
import {oteTranslations} from '../src/data/chapters/oteTranslations';
import {htfLiquidityDocument,htfLiquiditySources,htfLiquidityQuizzes,htfLiquidityDates} from '../src/data/chapters/htfLiquidityLesson';
import {htfLiquidityTranslations} from '../src/data/chapters/htfLiquidityTranslations';
import {drawOnLiquidityDocument,drawOnLiquiditySources,drawOnLiquidityQuizzes,drawOnLiquidityDates} from '../src/data/chapters/drawOnLiquidityLesson';
import {drawOnLiquidityTranslations} from '../src/data/chapters/drawOnLiquidityTranslations';
import {turtleSoupDocument,turtleSoupSources,turtleSoupQuizzes,turtleSoupDates} from '../src/data/chapters/turtleSoupLesson';
import {turtleSoupTranslations} from '../src/data/chapters/turtleSoupTranslations';
import {liquidityRunDocument,liquidityRunSources,liquidityRunQuizzes,liquidityRunDates} from '../src/data/chapters/liquidityRunLesson';
import {liquidityRunTranslations} from '../src/data/chapters/liquidityRunTranslations';
import {bslSslDocument,bslSslSources,bslSslQuizzes,bslSslDates} from '../src/data/chapters/bslSslLesson';
import {bslSslTranslations} from '../src/data/chapters/bslSslTranslations';
import {eqhEqlDocument,eqhEqlSources,eqhEqlQuizzes,eqhEqlDates} from '../src/data/chapters/eqhEqlLesson';
import {eqhEqlTranslations} from '../src/data/chapters/eqhEqlTranslations';
import {sweepHuntDocument,sweepHuntSources,sweepHuntQuizzes,sweepHuntDates} from '../src/data/chapters/sweepHuntLesson';
import {sweepHuntTranslations} from '../src/data/chapters/sweepHuntTranslations';
import {trendRangeDocument,trendRangeSources,trendRangeQuizzes,trendRangeDates} from '../src/data/chapters/trendRangeLesson';
import {trendRangeTranslations} from '../src/data/chapters/trendRangeTranslations';
import {mssDocument,mssSources,mssDates} from '../src/data/chapters/mssLesson';
import {mssTranslations} from '../src/data/chapters/mssTranslations';
import {bosChochMssDocument,bosChochMssSources,bosChochMssQuizzes,bosChochMssDates} from '../src/data/chapters/bosChochMssLesson';
import {bosChochMssTranslations} from '../src/data/chapters/bosChochMssTranslations';
import {dealingRangeDocument,dealingRangeSources,dealingRangeQuizzes,dealingRangeDates} from '../src/data/chapters/dealingRangeLesson';
import {dealingRangeTranslations} from '../src/data/chapters/dealingRangeTranslations';
import {rdrbDocument,rdrbSources,rdrbQuizzes,rdrbDates} from '../src/data/chapters/rdrbLesson';
import {rdrbTranslations} from '../src/data/chapters/rdrbTranslations';
import {pdArrayDocument,pdArraySources,pdArrayQuizzes,pdArrayDates} from '../src/data/chapters/pdArrayLesson';
import {pdArrayTranslations} from '../src/data/chapters/pdArrayTranslations';
import {suspensionReaperDocument,suspensionReaperSources,suspensionReaperQuizzes,suspensionReaperDates} from '../src/data/chapters/suspensionReaperLesson';
import {suspensionReaperTranslations} from '../src/data/chapters/suspensionReaperTranslations';
import {mitigationTranslations} from '../src/data/chapters/mitigationTranslations';
import {mitigationDocument,mitigationSources,mitigationQuizzes,mitigationDates} from '../src/data/chapters/mitigationDocument';
import {priceMovementLesson,priceMovementSources,priceMovementQuizzes,priceMovementDates} from '../src/data/chapters/priceMovementLesson';
import fs from 'node:fs';
import path from 'node:path';
import { textbookChapters, originalTextbookChapters } from '../src/data/chaptersData';
import { mergedChapterIds } from '../src/utils/curriculumMigration';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';
import {fvgDocument,fvgNextReads} from '../src/data/chapters/fvgDocument';
import assert from 'node:assert/strict';
import ts from 'typescript';
import {swingTranslations} from '../src/data/chapters/swingTranslations';
import {deliverySupport} from '../src/data/chapters/deliverySupport';
import { lessonParagraphs } from '../src/utils/lessonText';

const readJson = (p: string) => JSON.parse(fs.readFileSync(path.join('src/data/chapters', p), 'utf8'));
const deliveryEdition = readJson('deliveryEdition.json') as { id: number }[];
const deliveryQuizzes = readJson('deliveryQuizzes.json') as Record<string, unknown>;
const deliveryFigures = readJson('deliveryFigures.json') as { chapter: number }[];
const m25Edition = readJson('mentorship2025Edition.json') as { id: number }[];
const m25Support = readJson('mentorship2025Support.json') as Record<string, unknown>;
const m25Quizzes = readJson('mentorship2025Quizzes.json') as Record<string, unknown>;
const m25Sources = readJson('mentorship2025Sources.json') as Record<string, unknown>;
const m25Replays = readJson('mentorship2025Replays.json') as { chapter: number }[];
const m26Edition = readJson('mentorship2026Edition.json') as { id: number }[];
const m26Support = readJson('mentorship2026Support.json') as Record<string, unknown>;
const m26Quizzes = readJson('mentorship2026Quizzes.json') as Record<string, unknown>;
const m26Sources = readJson('mentorship2026Sources.json') as Record<string, unknown>;
const m26Visuals = readJson('mentorship2026Visuals.json') as Record<string, unknown>;

const CHAPTER_COMPONENT_FILES: Record<number, string[]> = {
  1: ['src/components/PriceMovementContent.tsx', 'src/components/PriceMovementVisual.tsx'],
  3: ['src/components/OrderBookContent.tsx', 'src/components/OrderBookVisual.tsx'],
  4: ['src/components/LiquidityDocumentContent.tsx', 'src/components/LiquidityVisual.tsx'],
  7: ['src/components/SwingDocumentContent.tsx', 'src/components/SwingVisual.tsx'],
  9: ['src/components/BreakDocumentContent.tsx', 'src/components/BreakVisual.tsx'],
  10: ['src/components/BreakDocumentContent.tsx', 'src/components/BreakVisual.tsx'],
  13: ['src/components/FvgDocumentContent.tsx', 'src/components/FvgBlueprint.tsx', 'src/components/FvgLessonDiagram.tsx', 'src/components/FvgStoryDiagram.tsx', 'src/components/FvgStory.tsx'],
  18: ['src/components/LiquidityRunContent.tsx', 'src/components/LiquidityRunVisual.tsx', 'src/components/LiquidityRunScene.tsx'],
  1017: ['src/components/BslSslContent.tsx', 'src/components/BslSslVisual.tsx', 'src/components/BslSslScene.tsx'],
  1018: ['src/components/EqhEqlContent.tsx', 'src/components/EqhEqlVisual.tsx', 'src/components/EqhEqlScene.tsx'],
  1019: ['src/components/SweepHuntContent.tsx', 'src/components/SweepHuntVisual.tsx', 'src/components/SweepHuntScene.tsx'],
  1011: ['src/components/TrendRangeContent.tsx', 'src/components/TrendRangeVisual.tsx', 'src/components/TrendRangeScene.tsx'],
  11: ['src/components/MssContent.tsx', 'src/components/MssVisual.tsx', 'src/components/MssScene.tsx'],
  1015: ['src/components/BosChochMssContent.tsx', 'src/components/BosChochMssVisual.tsx', 'src/components/BosChochMssScene.tsx'],
  1016: ['src/components/DealingRangeContent.tsx', 'src/components/DealingRangeVisual.tsx', 'src/components/DealingRangeScene.tsx'],
  33: ['src/components/MarketMakerContent.tsx', 'src/components/MarketMakerVisual.tsx'],
  36: ['src/components/Model2022Content.tsx', 'src/components/Model2022Visual.tsx'],
  55: ['src/components/SuspensionReaperContent.tsx', 'src/components/SuspensionReaperVisual.tsx', 'src/components/SuspensionReaperScene.tsx', 'src/utils/suspensionReaperSceneRenderer.ts'],
  56: ['src/components/RdrbContent.tsx', 'src/components/RdrbVisual.tsx', 'src/components/RdrbScene.tsx', 'src/components/rdrbSceneRenderer.ts'],
  59: ['src/components/PdArrayContent.tsx', 'src/components/PdArrayVisual.tsx', 'src/components/PdArrayScene.tsx', 'src/utils/pdArraySceneRenderer.ts'],
  1010: ['src/components/StructureDocumentContent.tsx', 'src/components/StructureVisual.tsx'],
  60: ['src/components/TurtleSoupContent.tsx', 'src/components/TurtleSoupVisual.tsx', 'src/components/TurtleSoupScene.tsx'],
  1023: ['src/components/DolContent.tsx', 'src/components/DolVisual.tsx', 'src/components/DolScene.tsx'],
  1024: ['src/components/HtfLiquidityContent.tsx', 'src/components/HtfLiquidityVisual.tsx', 'src/components/HtfLiquidityScene.tsx'],
  1031: ['src/components/MitigationDocumentContent.tsx', 'src/components/MitigationVisual.tsx'],
  1034: ['src/components/OteContent.tsx', 'src/components/OteVisual.tsx', 'src/components/OteScene.tsx', 'src/components/oteSceneRenderer.ts'],
  1064: ['src/components/SilverLessonContent.tsx', 'src/components/SilverLessonVisual.tsx', 'src/components/SilverLessonScene.tsx', 'src/components/SilverLessonAtlas.tsx', 'src/components/silverSceneRenderer.ts'],
};

function collectComponentStrings(filePath: string): string[] {
  if (!fs.existsSync(filePath)) return [];
  const source = ts.createSourceFile(filePath, fs.readFileSync(filePath, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const strings: string[] = [];
  function walk(node: ts.Node) {
    if (ts.isJsxText(node) || ts.isStringLiteralLike(node)) strings.push(node.text);
    else if (ts.isTemplateExpression(node)) strings.push(node.head.text + node.templateSpans.map((span, index) => `{${index}}${span.literal.text}`).join(''));
    ts.forEachChild(node, walk);
  }
  walk(source);
  return strings;
}

/** Remove only proven lesson-owned copy; unknown/dynamic UI keys remain common. */
export function splitUrduLessons(output:string,uiKeys:ReadonlySet<string>) {
 const catalog=JSON.parse(fs.readFileSync(path.join(output,'chapters.json'),'utf8')) as Record<string,string>;
 const catalogByLower=new Map<string,string[]>();
 for(const k of Object.keys(catalog)){const l=k.toLowerCase();if(!catalogByLower.has(l))catalogByLower.set(l,[]);catalogByLower.get(l)!.push(k);}
 const owners=new Map<string,Set<string>>();
 const normalize=(s:string)=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
 for(const chapter of textbookChapters) {
  const addOwner=(key:string)=>{if(!owners.has(key))owners.set(key,new Set());owners.get(key)!.add(chapter.slug);};
  const visit=(value:unknown)=>{
   if(typeof value==='string') for(const source of [value,...lessonParagraphs(value),value.replace(/^\d+\.\s+/,''),value.replace(/^Part\s+[IVXLCDM]+\s*-\s*/,'')]) {
    const key=normalize(source);
    if(catalog[key]) addOwner(key);
    else if(key.length<=30){const matches=catalogByLower.get(key.toLowerCase());if(matches)matches.forEach(addOwner);}
   }
   else if(Array.isArray(value)) value.forEach(visit);
   else if(value&&typeof value==='object') Object.values(value).forEach(visit);
  };
  visit(chapter); visit(chapterQuiz(chapter));
  if(chapter.id===1064){visit(silverLessonDocument);visit(silverUi);visit(silverLessonSources);visit(silverLessonScope);visit(silverLessonInterpretation);}
  if(chapter.id===1){visit(priceMovementLesson);visit(priceMovementSources);visit(priceMovementQuizzes);visit(priceMovementDates);}
  if(chapter.id===13){visit(fvgDocument);visit(fvgNextReads);}
  if(chapter.id===1031){visit(mitigationDocument);visit(mitigationSources);visit(mitigationQuizzes);visit(mitigationDates);}
  if(chapter.id===4){visit(liquidityDocument);visit(liquiditySources);visit(liquidityQuizzes);visit(liquidityDates);}
  if(chapter.id===3){visit(orderBookDocument);visit(orderBookSources);visit(orderBookQuizzes);visit(orderBookDates);}
  if(chapter.id===33){visit(marketMakerDocument);visit(marketMakerSources);visit(marketMakerQuizzes);visit(marketMakerDates);}
  if(chapter.id===36){visit(model2022Document);visit(model2022Sources);visit(model2022Quizzes);visit(model2022Dates);}
  if(chapter.id===1034){visit(oteDocument);visit(oteSources);visit(oteQuizzes);visit(oteDates);}
  if(chapter.id===1024){visit(htfLiquidityDocument);visit(htfLiquiditySources);visit(htfLiquidityQuizzes);visit(htfLiquidityDates);}
  if(chapter.id===1023){visit(drawOnLiquidityDocument);visit(drawOnLiquiditySources);visit(drawOnLiquidityQuizzes);visit(drawOnLiquidityDates);}
  if(chapter.id===60){visit(turtleSoupDocument);visit(turtleSoupSources);visit(turtleSoupQuizzes);visit(turtleSoupDates);}
  if(chapter.id===18){visit(liquidityRunDocument);visit(liquidityRunSources);visit(liquidityRunQuizzes);visit(liquidityRunDates);}
  if(chapter.id===1017){visit(bslSslDocument);visit(bslSslSources);visit(bslSslQuizzes);visit(bslSslDates);}
  if(chapter.id===1018){visit(eqhEqlDocument);visit(eqhEqlSources);visit(eqhEqlQuizzes);visit(eqhEqlDates);}
  if(chapter.id===1019){visit(sweepHuntDocument);visit(sweepHuntSources);visit(sweepHuntQuizzes);visit(sweepHuntDates);}
  if(chapter.id===1011){visit(trendRangeDocument);visit(trendRangeSources);visit(trendRangeQuizzes);visit(trendRangeDates);}
  if(chapter.id===11){visit(mssDocument);visit(mssSources);visit(mssDates);}
  if(chapter.id===1015){visit(bosChochMssDocument);visit(bosChochMssSources);visit(bosChochMssQuizzes);visit(bosChochMssDates);}
  if(chapter.id===1016){visit(dealingRangeDocument);visit(dealingRangeSources);visit(dealingRangeQuizzes);visit(dealingRangeDates);}
  if(chapter.id===55){visit(suspensionReaperDocument);visit(suspensionReaperSources);visit(suspensionReaperQuizzes);visit(suspensionReaperDates);}
  if(chapter.id===56){visit(rdrbDocument);visit(rdrbSources);visit(rdrbQuizzes);visit(rdrbDates);}
  if(chapter.id===59){visit(pdArrayDocument);visit(pdArraySources);visit(pdArrayQuizzes);visit(pdArrayDates);}
  if(chapter.id===7){visit(swingDocument);visit(swingSources);visit(swingQuizzes);visit(swingDates);}
  if(chapter.id===1010){visit(structureDocument);visit(structureSources);visit(structureQuizzes);visit(structureDates);visit(structureReviewScope);visit(structureInterpretation);}
  const ownedIds=[chapter.id,...Object.entries(mergedChapterIds).filter(([,host])=>host===chapter.id).map(([id])=>Number(id))];
  for(const oid of ownedIds){
   if(oid!==chapter.id){const merged=originalTextbookChapters.find(c=>c.id===oid);if(merged){visit(merged);visit(chapterQuiz(merged));}}
   const cid=String(oid);
   visit(deliveryEdition.find(e=>e.id===oid));
   visit(deliverySupport[oid]);
   visit(deliveryQuizzes[cid]);
   visit(deliveryFigures.filter(f=>f.chapter===oid));
   visit(m25Edition.find(e=>e.id===oid));
   visit(m25Support[cid]);visit(m25Quizzes[cid]);visit(m25Sources[cid]);
   visit(m25Replays.filter(r=>r.chapter===oid));
   visit(m26Edition.find(e=>e.id===oid));
   visit(m26Support[cid]);visit(m26Quizzes[cid]);visit(m26Sources[cid]);visit(m26Visuals[cid]);
  }
  const bt=breakTopic(chapter.id);if(bt){visit(breakDocuments[bt]);visit(breakSources);visit(breakQuizzes[bt]);visit(breakDates);visit(breakReviewScope);visit(breakInterpretation);}
  const compFiles=CHAPTER_COMPONENT_FILES[chapter.id];
  if(compFiles) compFiles.forEach(f=>visit(collectComponentStrings(f)));
 }
 const common=Object.fromEntries(Object.entries(catalog).filter(([key])=>!owners.has(key)||(owners.get(key)?.size||0)>=2||uiKeys.has(key)||/\{\w+\}/.test(key)));
 fs.writeFileSync(path.join(output,'chapter-common.json'),JSON.stringify(common)+'\n');
 const folder=path.join(output,'lessons');fs.mkdirSync(folder,{recursive:true});
 const lessonParts:{slug:string;catalog:Record<string,string>;bytes:number}[]=[];
 for(const chapter of textbookChapters) {
  const selected=Object.fromEntries(Object.entries(catalog).filter(([key])=>!Object.hasOwn(common,key)&&owners.get(key)?.has(chapter.slug)));
  fs.writeFileSync(path.join(folder,chapter.slug+'.json'),JSON.stringify(selected)+'\n');
  lessonParts.push({slug:chapter.slug,catalog:selected,bytes:Buffer.byteLength(JSON.stringify(selected))});
 }
 // Reuse all substantial per-lesson chunks so directory fallback routes keep
 // chapters.json free of duplicate per-lesson copy.
 const pieces=lessonParts.filter(p=>p.bytes>500).sort((a,b)=>b.bytes-a.bytes||a.slug.localeCompare(b.slug)),factoredKeys=new Set(pieces.flatMap(p=>Object.keys(p.catalog)));
 const fallback=Object.fromEntries(Object.entries(catalog).filter(([key])=>!factoredKeys.has(key)&&!Object.hasOwn(common,key)));
 const restored=Object.assign({},common,fallback,...pieces.map(p=>p.catalog));assert.deepEqual(restored,catalog,'Factored Urdu fallback must retain every original key/value');
 fs.writeFileSync(path.join(output,'chapters.json'),JSON.stringify(fallback)+'\n');
 fs.writeFileSync(path.join(output,'chapter-fallback-parts.json'),JSON.stringify(pieces.map(p=>p.slug))+'\n');
 fs.mkdirSync('outputs/urdu-localization',{recursive:true});fs.writeFileSync('outputs/urdu-localization/fallback-parity.json',JSON.stringify({passed:true,originalEntries:Object.keys(catalog).length,restoredEntries:Object.keys(restored).length,reused:pieces.map(p=>({slug:p.slug,bytes:p.bytes})),bytesRemoved:Buffer.byteLength(JSON.stringify(catalog))-Buffer.byteLength(JSON.stringify(fallback))},null,2));
 // Route-only terminology overrides must not leak through the directory fallback pieces.
 const sharedCatalog = JSON.parse(fs.readFileSync(path.join(output,'shared.json'),'utf8')) as Record<string,string>;
 const writeDedupedOverrides = (slug: string, filename: string, translations: Record<string, string>) => {
   const lessonPart = lessonParts.find(p => p.slug === slug);
   const base = Object.assign({}, sharedCatalog, common, lessonPart ? lessonPart.catalog : {});
   const delta = Object.fromEntries(Object.entries(translations).filter(([key, value]) => base[key] !== value));
   assert.deepEqual({ ...base, ...delta }, { ...base, ...translations }, `${slug} route override factoring must preserve every translation`);
   fs.writeFileSync(path.join(output, filename), JSON.stringify(delta) + '\n');
 };
 writeDedupedOverrides('mitigation-and-rejection-blocks', 'mitigation-overrides.json', mitigationTranslations);
 writeDedupedOverrides('liquidity-the-most-misunderstood-word-in-trading', 'liquidity-overrides.json', liquidityTranslations);
 writeDedupedOverrides('the-order-book-in-depth', 'order-book-overrides.json', orderBookTranslations);
 writeDedupedOverrides('ict-charter-models-6-and-7-universal-models', 'market-maker-overrides.json', marketMakerTranslations);
 writeDedupedOverrides('ict-charter-model-13-2022-youtube-model', 'model-2022-overrides.json', model2022Translations);
 writeDedupedOverrides('optimal-trade-entry-ote', 'ote-overrides.json', oteTranslations);
 writeDedupedOverrides('htf-liquidity-maps', 'htf-liquidity-overrides.json', htfLiquidityTranslations);
 writeDedupedOverrides('draw-on-liquidity', 'draw-on-liquidity-overrides.json', drawOnLiquidityTranslations);
 writeDedupedOverrides('ict-liquidity-turtle-soup-rejection-blocks', 'turtle-soup-overrides.json', turtleSoupTranslations);
 writeDedupedOverrides('liquidity-engineering-and-liquidity-runs', 'liquidity-run-overrides.json', liquidityRunTranslations);
 writeDedupedOverrides('buyside-sellside-liquidity', 'bsl-ssl-overrides.json', bslSslTranslations);
 writeDedupedOverrides('equal-highs-equal-lows', 'eqh-eql-overrides.json', eqhEqlTranslations);
 writeDedupedOverrides('liquidity-sweep-vs-stop-hunt', 'sweep-hunt-overrides.json', sweepHuntTranslations);
 writeDedupedOverrides('trend-range-transition', 'trend-range-overrides.json', trendRangeTranslations);
 writeDedupedOverrides('market-structure-shift-mss-verified-directional-shift', 'mss-overrides.json', mssTranslations);
 writeDedupedOverrides('bos-vs-choch-vs-mss', 'bos-choch-mss-overrides.json', bosChochMssTranslations);
 writeDedupedOverrides('dealing-range-marking', 'dealing-range-overrides.json', dealingRangeTranslations);
 writeDedupedOverrides('rdrb-balanced-price-range-and-enigma-fvg', 'rdrb-overrides.json', rdrbTranslations);
 writeDedupedOverrides('ict-pd-array-selection-price-delivery-continuum', 'pd-array-overrides.json', pdArrayTranslations);
 writeDedupedOverrides('reaper-ifvg-and-suspension-block-advancements', 'suspension-reaper-overrides.json', suspensionReaperTranslations);
 writeDedupedOverrides('what-is-a-swing-the-atom-of-structure', 'swing-overrides.json', swingTranslations);
 const silverBase=Object.assign({},JSON.parse(fs.readFileSync(path.join(output,'shared.json'),'utf8')),common,lessonParts.find(p=>p.slug==='silver-bullet-model')!.catalog);
 fs.writeFileSync(path.join(output,'silver-lesson-overrides.json'),JSON.stringify(Object.fromEntries(Object.entries(silverLessonTranslations).filter(([key,value])=>silverBase[key]!==value)))+'\n');
 const structureBase=Object.assign({},JSON.parse(fs.readFileSync(path.join(output,'shared.json'),'utf8')),common,lessonParts.find(p=>p.slug==='internal-vs-external-structure')!.catalog);
 const structureOverrides=Object.fromEntries(Object.entries(structureTranslations).filter(([key,value])=>structureBase[key]!==value));
 assert.deepEqual({...structureBase,...structureOverrides},{...structureBase,...structureTranslations},'Structure route factoring must retain every translation');
 fs.writeFileSync(path.join(output,'structure-overrides.json'),JSON.stringify(structureOverrides)+'\n');
 const documentKeys=(d:unknown):string[]=>typeof d==='string'?[d]:Array.isArray(d)?d.flatMap(documentKeys):d&&typeof d==='object'?Object.values(d).flatMap(documentKeys):[];
 for(const slug of ['break-of-structure-bos-trend-continuation','change-of-character-choch-the-first-warning']){
  const base=Object.assign({},JSON.parse(fs.readFileSync(path.join(output,'shared.json'),'utf8')),common,lessonParts.find(p=>p.slug===slug)!.catalog);
  const own=slug.startsWith('break-')?'bos':'choch',other=own==='bos'?'choch':'bos',otherKeys=new Set(documentKeys(breakDocuments[other])),ownKeys=new Set(documentKeys(breakDocuments[own]));
  const scoped=Object.fromEntries(Object.entries(breakTranslations).filter(([key])=>!otherKeys.has(key)||ownKeys.has(key)));
  const delta=Object.fromEntries(Object.entries(scoped).filter(([key,value])=>base[key]!==value));
  assert.deepEqual({...base,...delta},{...base,...scoped});
  fs.writeFileSync(path.join(output,slug+'-overrides.json'),JSON.stringify(delta)+'\n');
 }
 console.log(`Urdu lesson split: ${textbookChapters.length} lessons; common ${Math.round(Buffer.byteLength(JSON.stringify(common))/1024)} KB; exact fallback parity, thirty-two lesson chunks reused.`);
}
