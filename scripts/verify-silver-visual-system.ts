import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
const walk=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(walk)],a=(n:any,k:string)=>n.attrs?.find((v:any)=>v.name===k)?.value,cls=(n:any,c:string)=>(a(n,'class')||'').split(' ').includes(c);
const report=[];
for(const prefix of ['','/ur']){
 const route=prefix+'/learn/silver-bullet-model/',html=fs.readFileSync('dist'+route+'index.html','utf8'),all=walk(parse(html)),figures=all.filter(n=>a(n,'data-silver-figure')!==undefined);
 assert.equal(figures.length,19);assert.equal(figures.filter(n=>a(n,'data-visual-system')==='cinema').length,4);assert.equal(figures.filter(n=>a(n,'data-visual-system')==='atlas').length,15);
 assert.equal(all.filter(n=>cls(n,'sl-cinema-fallback')).length,4);assert.equal(all.filter(n=>cls(n,'sl-atlas')).length,18);assert.equal(all.filter(n=>n.tagName==='canvas').length,0,'Static content must not depend on WebGL');assert.equal(all.filter(n=>n.tagName==='figcaption'&&a(n,'id')?.endsWith('-caption')).length,19);
 const ids=walk(all.find(n=>cls(n,'silver-lesson-document'))).map(n=>a(n,'id')).filter(Boolean);assert.equal(ids.length,new Set(ids).size);
 for(const figure of figures){assert.ok(walk(figure).some(n=>n.tagName==='figcaption'));assert.ok(a(figure,'data-visual-system'));}
 assert.ok(!html.includes('127.0.0.1:4250'));assert.ok(!html.includes('127.0.0.1:4251'));report.push({route,cinematicScenes:4,atlasFigures:15,rawAtlasSvg:18,allCaptions:true,noCanvasDependency:true});
}
fs.writeFileSync('outputs/chapter64/visual-system-static.json',JSON.stringify({passed:true,pages:report},null,2));console.log('Silver Bullet visual system passed: four cinematic fallbacks + fifteen Atlas figures per locale, static captions, unique IDs, no prototype links or WebGL dependency.');
