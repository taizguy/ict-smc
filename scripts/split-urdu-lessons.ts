import {liquidityDocument} from '../src/data/chapters/liquidityDocument';
import {liquidityTranslations} from '../src/data/chapters/liquidityTranslations';
import {mitigationTranslations} from '../src/data/chapters/mitigationTranslations';
import {mitigationDocument} from '../src/data/chapters/mitigationDocument';
import fs from 'node:fs';
import path from 'node:path';
import { textbookChapters } from '../src/data/chaptersData';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';
import {fvgDocument} from '../src/data/chapters/fvgDocument';
import assert from 'node:assert/strict';
import { lessonParagraphs } from '../src/utils/lessonText';

/** Remove only proven lesson-owned copy; unknown/dynamic UI keys remain common. */
export function splitUrduLessons(output:string,uiKeys:ReadonlySet<string>) {
 const catalog=JSON.parse(fs.readFileSync(path.join(output,'chapters.json'),'utf8')) as Record<string,string>;
 const owners=new Map<string,Set<string>>();
 const normalize=(s:string)=>s.replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
 for(const chapter of textbookChapters) {
  const visit=(value:unknown)=>{
   if(typeof value==='string') for(const source of [value,...lessonParagraphs(value),value.replace(/^\d+\.\s+/,''),value.replace(/^Part\s+[IVXLCDM]+\s*-\s*/,'')]) {
    const key=normalize(source);
    if(catalog[key]) {if(!owners.has(key)) owners.set(key,new Set());owners.get(key)!.add(chapter.slug);}
   }
   else if(Array.isArray(value)) value.forEach(visit);
   else if(value&&typeof value==='object') Object.values(value).forEach(visit);
  };
  visit(chapter); visit(chapterQuiz(chapter));
  if(chapter.id===13)visit(fvgDocument);
  if(chapter.id===1031)visit(mitigationDocument);
  if(chapter.id===4)visit(liquidityDocument);
 }
 const common=Object.fromEntries(Object.entries(catalog).filter(([key])=>!owners.has(key)||uiKeys.has(key)||/\{\w+\}/.test(key)));
 fs.writeFileSync(path.join(output,'chapter-common.json'),JSON.stringify(common)+'\n');
 const folder=path.join(output,'lessons');fs.mkdirSync(folder,{recursive:true});
 const lessonParts:{slug:string;catalog:Record<string,string>;bytes:number}[]=[];
 for(const chapter of textbookChapters) {
  const selected=Object.fromEntries(Object.entries(catalog).filter(([key])=>!Object.hasOwn(common,key)&&owners.get(key)?.has(chapter.slug)));
  fs.writeFileSync(path.join(folder,chapter.slug+'.json'),JSON.stringify(selected)+'\n');
  lessonParts.push({slug:chapter.slug,catalog:selected,bytes:Buffer.byteLength(JSON.stringify(selected))});
 }
 // The fallback used by directory routes duplicated every lesson chunk. Reuse
 // its five largest existing pieces; reconstruct the exact original dictionary.
 // This changes storage only: no translation is dropped or moved behind a click.
 const pieces=lessonParts.sort((a,b)=>b.bytes-a.bytes||a.slug.localeCompare(b.slug)).slice(0,5),factoredKeys=new Set(pieces.flatMap(p=>Object.keys(p.catalog)));
 const fallback=Object.fromEntries(Object.entries(catalog).filter(([key])=>!factoredKeys.has(key)&&!Object.hasOwn(common,key)));
 const restored=Object.assign({},common,fallback,...pieces.map(p=>p.catalog));assert.deepEqual(restored,catalog,'Factored Urdu fallback must retain every original key/value');
 fs.writeFileSync(path.join(output,'chapters.json'),JSON.stringify(fallback)+'\n');
 fs.writeFileSync(path.join(output,'chapter-fallback-parts.json'),JSON.stringify(pieces.map(p=>p.slug))+'\n');
 fs.mkdirSync('outputs/urdu-localization',{recursive:true});fs.writeFileSync('outputs/urdu-localization/fallback-parity.json',JSON.stringify({passed:true,originalEntries:Object.keys(catalog).length,restoredEntries:Object.keys(restored).length,reused:pieces.map(p=>({slug:p.slug,bytes:p.bytes})),bytesRemoved:Buffer.byteLength(JSON.stringify(catalog))-Buffer.byteLength(JSON.stringify(fallback))},null,2));
 // Route-only terminology overrides must not leak through the directory fallback pieces.
 const overrides=Object.fromEntries(Object.entries(mitigationTranslations).filter(([key,value])=>catalog[key]!==value));
 fs.writeFileSync(path.join(output,'mitigation-overrides.json'),JSON.stringify(overrides)+'\n');
 const liquidityOverrides=Object.fromEntries(Object.entries(liquidityTranslations).filter(([key,value])=>catalog[key]!==value));
 fs.writeFileSync(path.join(output,'liquidity-overrides.json'),JSON.stringify(liquidityOverrides)+'\n');
 console.log(`Urdu lesson split: ${textbookChapters.length} lessons; common ${Math.round(Buffer.byteLength(JSON.stringify(common))/1024)} KB; exact fallback parity, five lesson chunks reused.`);
}
