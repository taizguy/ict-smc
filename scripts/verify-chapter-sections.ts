import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
import {activeCurriculumChapters} from '../src/data/chaptersData';
const manifest=JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8'));
const nodes=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(nodes)];
const attr=(n:any,key:string)=>n.attrs?.find((a:any)=>a.name===key)?.value;
const text=(n:any):string=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(text).join('');
const norm=(s:string)=>s.replace(/\s+/g,' ').trim();
assert.equal(activeCurriculumChapters.length,97);
const evidence=[];
for(const chapter of activeCurriculumChapters)for(const language of ['en','ur']){
 const route=(language==='ur'?'/ur':'')+'/learn/'+chapter.slug+'/';
 const record=manifest.find((r:any)=>r.path===route);assert.ok(record,route+' emitted');
 const all=nodes(parse(fs.readFileSync('dist/'+record.outputPath,'utf8')));
 const oldPanels=all.filter(n=>(attr(n,'class')||'').split(' ').some((c:string)=>['rr-visual-section','rr-terms','rr-summary','rr-section-actions'].includes(c)));
 assert.equal(oldPanels.length,0,route+' removed standalone panels and obsolete actions');
 const nav=all.find(n=>attr(n,'id')==='rr-scenes');
 if(chapter.status==='in-progress'){assert.ok(!nav,route+' no empty placeholder tabs');evidence.push({route,status:chapter.status,tabs:0});continue;}
 assert.ok(nav,route+' section nav');const buttons=nodes(nav).filter(n=>n.tagName==='button');assert.equal(buttons.length,2,route+' exactly two section buttons');
 const labels=buttons.map(n=>norm(text(n)));assert.match(labels[0],/^1[.۔]/);assert.match(labels[1],/^2[.۔]/);
 assert.ok(!labels.some(label=>/Interactive Diagram|Key Terms|Summary Briefing/.test(label)));
 assert.ok(all.some(n=>attr(n,'class')==='rr-text-content'),route+' complete static textbook');
 assert.ok(all.some(n=>attr(n,'class')==='rr-quiz'),route+' static practice quiz');
 assert.ok(all.some(n=>attr(n,'data-chapter-quiz')===String(chapter.id)),route+' correct quiz');
 const expectedFigures:Record<number,[string,number]>={1:['data-price-figure',10],4:['data-liquidity-figure',16],7:['data-swing-figure',9],9:['data-break-figure',13],10:['data-break-figure',13],1010:['data-structure-figure',11],13:['data-fvg-figure',11],1031:['data-mitigation-figure',9]};
 if(expectedFigures[chapter.id]){const [attribute,count]=expectedFigures[chapter.id];assert.equal(all.filter(n=>attr(n,attribute)!==undefined).length,count,route+' textbook illustrations preserved exactly once');}
 evidence.push({route,status:chapter.status,tabs:labels});
}
assert.equal(evidence.length,194);
fs.mkdirSync('outputs/chapter-two-tabs',{recursive:true});fs.writeFileSync('outputs/chapter-two-tabs/static-verification.json',JSON.stringify(evidence,null,2));
console.log(`Chapter sections passed: all ${2*activeCurriculumChapters.length} EN/UR lesson documents; ${2*activeCurriculumChapters.filter(c=>c.status==='published').length} published pages have only textbook + practice/quiz; ${2*activeCurriculumChapters.filter(c=>c.status==='in-progress').length} placeholders remain notice-only; removed panels/actions absent; inline illustrations retained.`);
