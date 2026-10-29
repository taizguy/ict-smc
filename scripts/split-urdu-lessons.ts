import fs from 'node:fs';
import path from 'node:path';
import { textbookChapters } from '../src/data/chaptersData';
import { chapterQuiz } from '../src/data/chapters/chapterQuizzes';
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
 }
 const common=Object.fromEntries(Object.entries(catalog).filter(([key])=>!owners.has(key)||uiKeys.has(key)||/\{\w+\}/.test(key)));
 fs.writeFileSync(path.join(output,'chapter-common.json'),JSON.stringify(common)+'\n');
 const folder=path.join(output,'lessons');fs.mkdirSync(folder,{recursive:true});
 for(const chapter of textbookChapters) {
  const selected=Object.fromEntries(Object.entries(catalog).filter(([key])=>!Object.hasOwn(common,key)&&owners.get(key)?.has(chapter.slug)));
  fs.writeFileSync(path.join(folder,chapter.slug+'.json'),JSON.stringify(selected)+'\n');
 }
 console.log(`Urdu lesson split: ${textbookChapters.length} lessons; common ${Math.round(Buffer.byteLength(JSON.stringify(common))/1024)} KB; full fallback retained.`);
}
