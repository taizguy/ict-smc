import assert from 'node:assert/strict';
import fs from 'node:fs';
import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {parse} from 'parse5';
import {journalEditions} from '../src/data/masterclassJournal';
import {masterclassCollection} from '../src/data/masterclassData';
import {getMasterclassUrl} from '../src/utils/workbenchToolRoutes';
import {MasterclassJournal} from '../src/components/MasterclassJournal';
import {TranslationProvider} from '../src/i18n/TranslationProvider';
import {urdu} from '../src/i18n/urdu';
import {localizeHtml} from './localized-html';
const walk=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(walk)];
const attr=(n:any,k:string)=>n.attrs?.find((a:any)=>a.name===k)?.value;
const content=(n:any):string=>n.nodeName==='#text'?n.value:(n.childNodes||[]).map(content).join('');
const reading=(html:string)=>{const all=walk(parse(html));const root=all.find(n=>attr(n,'class')?.split(' ').includes('mc-journal'));return walk(root).filter(n=>['h1','h2','h3','p','figcaption','text','title','li'].includes(n.tagName)).map(n=>content(n).replace(/\s+/g,' ').trim());};
const built=process.argv.includes('--built');
const runtimeUr=built?{...JSON.parse(fs.readFileSync('src/i18n/runtime/shared.json','utf8')),...JSON.parse(fs.readFileSync('src/i18n/runtime/tools.json','utf8'))}:urdu;
const differences:any[]=[];
for(const lesson of Object.values(journalEditions)){
 const path=getMasterclassUrl(masterclassCollection.find(m=>m.number===lesson.number)!);
 const en=renderToStaticMarkup(createElement(MasterclassJournal,{lesson}));
 const ur=renderToStaticMarkup(createElement(TranslationProvider,{locale:'ur',catalog:runtimeUr,children:createElement(MasterclassJournal,{lesson})}));
 const staticUr=built?fs.readFileSync(`dist/ur${path}index.html`,'utf8'):localizeHtml(en,path,urdu);
 const a=reading(staticUr),b=reading(ur);
 if(JSON.stringify(a)!==JSON.stringify(b))differences.push({unit:lesson.number,staticCount:a.length,runtimeCount:b.length,rows:a.flatMap((s,i)=>s===b[i]?[]:[{index:i,static:s,runtime:b[i]}])});
 const nodes=walk(parse(ur));assert.equal(nodes.filter(n=>n.tagName==='h1').length,1);
 assert.ok(/[\u0600-\u06ff]/.test(content(nodes.find(n=>n.tagName==='h1'))));
 for(const anchor of nodes.filter(n=>n.tagName==='a')){const href=attr(anchor,'href');if(href?.startsWith('/')&&!href.startsWith('//'))assert.ok(href.startsWith('/ur/'),`${lesson.number}: English link in Urdu: ${href}`);}
 assert.equal(nodes.filter(n=>n.tagName==='section'&&attr(n,'class')==='mj-faq').length,lesson.faq.length);
 if(built)for(const locale of ['en','ur']){
  const route=locale==='en'?path:'/ur'+path;
  const doc=walk(parse(fs.readFileSync(`dist${route}index.html`,'utf8')));
  const meta=(key:string)=>attr(doc.find(n=>n.tagName==='meta'&&(attr(n,'name')===key||attr(n,'property')===key)),'content');
  assert.equal(attr(doc.find(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'),'href'),'https://learnsmc.xyz'+route);
  for(const [lang,url] of [['en',path],['ur','/ur'+path],['x-default',path]])assert.equal(attr(doc.find(n=>n.tagName==='link'&&attr(n,'hreflang')===lang),'href'),'https://learnsmc.xyz'+url);
  assert.equal(meta('description'),meta('og:description'));assert.equal(meta('description'),meta('twitter:description'));
  assert.ok(fs.existsSync('dist'+new URL(meta('og:image')).pathname));assert.equal(meta('og:image'),meta('twitter:image'));assert.equal(meta('og:image:alt'),meta('twitter:image:alt'));
  const schema=doc.filter(n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').flatMap(n=>{const s=JSON.parse(content(n));return s['@graph']||[s];});
  const article=schema.find(s=>s['@type']==='Article');assert.ok(article);assert.equal(article.inLanguage,locale);assert.equal(article.datePublished,'2026-10-24');assert.equal(article.mainEntityOfPage,'https://learnsmc.xyz'+route);
  const crumb=schema.find(s=>s['@type']==='BreadcrumbList');assert.equal(crumb.itemListElement.length,5);assert.equal(crumb.itemListElement.at(-1).item,'https://learnsmc.xyz'+route);
  assert.ok(!doc.some(n=>n.tagName==='meta'&&attr(n,'name')==='robots'&&/noindex/.test(attr(n,'content'))));
 }
}
fs.writeFileSync('outputs/masterclass-journal/bilingual-parity-differences.json',JSON.stringify(differences,null,2));
assert.equal(differences.length,0,'Static/native Urdu reading content differs; inspect bilingual-parity-differences.json');
console.log('29 EN/UR lesson pairs: native Urdu headings, localized internal links, FAQ counts and exact static/runtime reading parity passed.');
