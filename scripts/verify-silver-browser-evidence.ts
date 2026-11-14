import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
import {silverLessonPath} from '../src/data/chapters/silverBulletLesson';
const rows=JSON.parse(fs.readFileSync('outputs/chapter64/browser/layout-evidence.json','utf8'));
const walk=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(walk)],attr=(n:any,k:string)=>n.attrs?.find((a:any)=>a.name===k)?.value,text=(n:any):string=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join(''),norm=(s:string)=>s.replace(/\s+/g,' ').trim();
const report=[];
for(const lang of ['en','ur'])for(const device of ['desktop','mobile'])for(const theme of ['light','dark']){
 const label=`${lang}-${device}-${theme}`,row=rows.filter((r:any)=>r.label===label).at(-1);assert.ok(row,label);assert.equal(row.lang,lang);assert.equal(row.theme,theme);assert.equal(row.h1,1);assert.equal(row.figures,19);assert.equal(row.risk,1);assert.equal(row.overflow,false);assert.equal(row.width,device==='mobile'?390:1440);assert.equal(row.dir,lang==='ur'?'rtl':'ltr');for(const s of row.bodyStyle){assert.equal(s.size,'16px');assert.equal(s.weight,'400');assert.equal(s.leading,'30.4px');}for(const s of row.faqStyle){assert.equal(s.size,'16px');assert.equal(s.weight,'400');assert.equal(s.leading,'29.6px');}
 const html=fs.readFileSync('dist'+(lang==='ur'?'/ur':'')+silverLessonPath+'index.html','utf8'),all=walk(parse(html)),doc=all.find(n=>attr(n,'class')?.split(' ').includes('silver-lesson-document')),expected=walk(doc).filter(n=>attr(n,'data-lesson-content')!==undefined).map(n=>norm(text(n)));assert.deepEqual(row.paragraphs.map(norm),expected,label+' essential static/runtime paragraph parity');assert.ok(fs.statSync(`outputs/chapter64/browser/${label}.jpg`).size>1000);report.push({label,paragraphs:expected.length,exactEssentialParity:true,noOverflow:true,typography:true});
}
fs.writeFileSync('outputs/chapter64/browser/parity-verification.json',JSON.stringify({passed:true,pages:report},null,2));console.log('Chapter 64 browser evidence: 8 locale/theme/size views, exact essential text parity, typography, one risk notice and no page overflow.');
