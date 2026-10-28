import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {parse} from 'parse5';
import {masterclassHubLessons,masterclassHubFaqs} from '../src/data/masterclassHub';
import {masterclassHubPath,masterclassHubH1,masterclassHubTitle,masterclassHubDescription} from '../src/data/masterclassHubMeta';
import {getMasterclassUrl} from '../src/utils/workbenchToolRoutes';
import {urdu} from '../src/i18n/urdu';
import {t} from '../src/i18n/translate';
type Node={tagName?:string;value?:string;attrs?:{name:string;value:string}[];childNodes?:Node[]};
const attr=(n:Node,k:string)=>n.attrs?.find(a=>a.name===k)?.value;
const all=(n:Node,p:(n:Node)=>boolean):Node[]=>[...(p(n)?[n]:[]),...(n.childNodes||[]).flatMap(c=>all(c,p))];
const text=(n:Node):string=>(n.value||'')+(n.childNodes||[]).map(text).join('');
const has=(n:Node,c:string)=>(attr(n,'class')||'').split(/\s+/).includes(c);
const origin='https://learnsmc.xyz',count=masterclassHubLessons.length;
for(const locale of ['en','ur'] as const){
 const prefix=locale==='ur'?'/ur':'',pathname=prefix+masterclassHubPath,translate=(s:string)=>t(s,locale,urdu);
 const html=fs.readFileSync(`dist${pathname}index.html`,'utf8'),doc=parse(html) as Node;
 const head=all(doc,n=>n.tagName==='head')[0],body=all(doc,n=>n.tagName==='body')[0];
 const meta=(key:string)=>attr(all(head,n=>n.tagName==='meta'&&(attr(n,'name')===key||attr(n,'property')===key))[0]||{},'content');
 assert.equal(all(body,n=>n.tagName==='h1').length,1);assert.equal(text(all(body,n=>n.tagName==='h1')[0]),translate(masterclassHubH1));
 assert.equal(text(all(head,n=>n.tagName==='title')[0]),translate(masterclassHubTitle+' | LearnSMC'));
 assert.equal(meta('description'),translate(masterclassHubDescription));
 assert.equal(meta('og:title'),text(all(head,n=>n.tagName==='title')[0]));assert.equal(meta('twitter:title'),meta('og:title'));
 assert.equal(meta('og:description'),meta('description'));assert.equal(meta('twitter:description'),meta('description'));
 assert.equal(attr(all(head,n=>n.tagName==='link'&&attr(n,'rel')==='canonical')[0],'href'),origin+pathname);
 for(const [language,target] of [['en',masterclassHubPath],['ur','/ur'+masterclassHubPath],['x-default',masterclassHubPath]])assert.ok(all(head,n=>n.tagName==='link'&&attr(n,'hreflang')===language&&attr(n,'href')===origin+target).length);
 const image=meta('og:image');assert.ok(image?.startsWith(origin+'/images/social/'));assert.equal(meta('twitter:image'),image);assert.ok(meta('og:image:alt')&&meta('twitter:image:alt'));assert.ok(fs.existsSync(path.join('dist',new URL(image!).pathname)));
 const cards=all(body,n=>attr(n,'data-lesson-card')!==undefined);assert.equal(cards.length,count);assert.equal(new Set(cards.map(c=>attr(c,'data-lesson-card'))).size,count);
 for(const lesson of masterclassHubLessons){
  const card=cards.find(c=>attr(c,'data-lesson-card')===lesson.id)!;assert.ok(card);assert.equal(attr(card,'hidden'),undefined);
  const links=all(card,n=>n.tagName==='a');assert.equal(links.length,1);assert.equal(attr(links[0],'href'),prefix+getMasterclassUrl(lesson));assert.equal(text(links[0]),translate(lesson.title));
  const img=all(card,n=>n.tagName==='img')[0];assert.equal(attr(img,'alt'),translate(lesson.thumbnail.alt));assert.equal(attr(img,'loading'),'lazy');assert.equal(attr(img,'width'),'640');assert.equal(attr(img,'height'),'360');assert.ok(!attr(img,'src')?.includes('neutral-study'));
  assert.ok(fs.existsSync(path.join('dist',attr(img,'src')!)));
  const leaf=fs.readFileSync(`dist${prefix}${getMasterclassUrl(lesson)}index.html`,'utf8');assert.ok(all(parse(leaf) as Node,n=>n.tagName==='a'&&attr(n,'href')===pathname).length,`${locale}: lesson lacks hub backlink: ${lesson.id}`);
 }
 const rows=all(body,n=>attr(n,'data-lesson-row')!==undefined);assert.equal(rows.length,count);
 for(const lesson of masterclassHubLessons){const row=rows.find(r=>attr(r,'data-lesson-row')===lesson.id)!;const links=all(row,n=>n.tagName==='a');assert.equal(links.length,1);assert.equal(attr(links[0],'href'),prefix+getMasterclassUrl(lesson));assert.equal(text(links[0]),translate(lesson.title));}
 const stage=all(body,n=>has(n,'mc-motion-stage'))[0];assert.ok(stage);assert.equal(all(stage,n=>n.tagName==='a').length,0,'Hero stage must not be a link card');assert.ok(all(stage,n=>n.tagName==='button').length===3);
 const grid=all(body,n=>attr(n,'data-lesson-grid')!==undefined)[0];assert.equal(attr(grid,'hidden'),undefined);
 const graphs=all(head,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').flatMap(n=>JSON.parse(text(n))['@graph']||[]);
 const list=graphs.find(n=>n['@type']==='ItemList');assert.equal(list.numberOfItems,count);assert.equal(list.itemListElement.length,count);
 list.itemListElement.forEach((entry:{name:string;url:string;position:number},i:number)=>{assert.equal(entry.position,i+1);assert.equal(entry.name,translate(masterclassHubLessons[i].title));assert.equal(entry.url,origin+prefix+getMasterclassUrl(masterclassHubLessons[i]));});
 const crumbs=graphs.find(n=>n['@type']==='BreadcrumbList');assert.equal(crumbs.itemListElement.length,3);
 const faq=graphs.find(n=>n['@type']==='FAQPage');assert.equal(faq.mainEntity.length,masterclassHubFaqs.length);for(const f of masterclassHubFaqs){assert.ok(text(body).includes(translate(f.question)));assert.ok(text(body).includes(translate(f.answer)));}
 if(locale==='en'){const intro=text(all(body,n=>attr(n,'data-hub-intro')!==undefined)[0]).trim().split(/\s+/).length;assert.ok(intro>=80&&intro<=150,`${intro} intro words`);}
 assert.ok(!/(?:https?:\/\/(?:localhost|127\.0\.0\.1)|placeholder text)/i.test(html));
 console.log(`${locale}: ${count} prerendered, linked, titled and illustrated cards; matching ItemList; reciprocal language tags; unique metadata; all lesson backlinks.`);
}
const drawings=new Set<string>();
for(const lesson of masterclassHubLessons){
 const svg=fs.readFileSync(`public/images/masterclass/${lesson.thumbnail.file}.svg`,'utf8');
 assert.equal(fs.readFileSync(`dist/images/masterclass/${lesson.thumbnail.file}.svg`,'utf8'),svg,'Built thumbnail differs from source');
 const geometry=svg.replace(/<(title|desc|style|text)\b[^>]*>[\s\S]*?<\/\1>/g,'').replace(/\s+/g,' ');
 const hash=createHash('sha256').update(geometry).digest('hex');assert.ok(!drawings.has(hash),`Repeated thumbnail geometry: ${lesson.number}`);drawings.add(hash);
 assert.ok(svg.includes('width="640"')&&svg.includes('height="360"'));assert.ok(!/<script|<image|<foreignObject/i.test(svg));
}
console.log(`${drawings.size} distinct SVG compositions after all labels/styles are removed; no embedded scripts or remote media.`);
