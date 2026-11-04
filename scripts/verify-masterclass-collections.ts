import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
import {masterclassCollectionPaths,masterclassCollectionPage} from '../src/data/masterclassCategoryPages';
import {getMasterclassUrl} from '../src/utils/workbenchToolRoutes';
import {t} from '../src/i18n/translate';
import {urdu} from '../src/i18n/urdu';

type Node={tagName?:string;value?:string;attrs?:{name:string;value:string}[];childNodes?:Node[]};
const attr=(n:Node,k:string)=>n.attrs?.find(a=>a.name===k)?.value;
const all=(n:Node,p:(n:Node)=>boolean):Node[]=>[...(p(n)?[n]:[]),...(n.childNodes||[]).flatMap(c=>all(c,p))];
const text=(n:Node):string=>(n.value||'')+(n.childNodes||[]).map(text).join('');
for(const path of masterclassCollectionPaths)for(const locale of ['en','ur'] as const){
 const page=masterclassCollectionPage(path)!,prefix=locale==='ur'?'/ur':'',url='https://learnsmc.xyz'+prefix+path,tr=(s:string)=>t(s,locale,urdu);
 const doc=parse(fs.readFileSync(`dist${prefix}${path}index.html`,'utf8')) as Node;
 const head=all(doc,n=>n.tagName==='head')[0],body=all(doc,n=>n.tagName==='body')[0];
 const meta=(key:string)=>attr(all(head,n=>n.tagName==='meta'&&(attr(n,'name')===key||attr(n,'property')===key))[0]||{},'content');
 const headings=all(body,n=>n.tagName==='h1');assert.equal(headings.length,1);assert.equal(text(headings[0]),tr(page.h1));
 assert.equal(text(all(head,n=>n.tagName==='title')[0]),tr(page.title+' | LearnSMC'));
 assert.equal(meta('description'),tr(page.description));assert.equal(meta('og:description'),meta('description'));assert.equal(meta('twitter:description'),meta('description'));
 assert.equal(attr(all(head,n=>n.tagName==='link'&&attr(n,'rel')==='canonical')[0],'href'),url);
 for(const [lang,target]of [['en',path],['ur','/ur'+path],['x-default',path]])assert.ok(all(head,n=>n.tagName==='link'&&attr(n,'hreflang')===lang&&attr(n,'href')==='https://learnsmc.xyz'+target).length);
 const cards=all(body,n=>attr(n,'data-lesson-card')!==undefined),rows=all(body,n=>attr(n,'data-lesson-row')!==undefined);assert.equal(cards.length,page.lessons.length);assert.equal(rows.length,page.lessons.length);
 for(const lesson of page.lessons)for(const [items,key]of [[cards,'data-lesson-card'],[rows,'data-lesson-row']] as const){const item=items.find(n=>attr(n,key)===lesson.id)!;assert.ok(item);assert.ok(all(item,n=>n.tagName==='a'&&attr(n,'href')===prefix+getMasterclassUrl(lesson)).length);}
 const graph=all(head,n=>n.tagName==='script'&&attr(n,'type')==='application/ld+json').flatMap(n=>JSON.parse(text(n))['@graph']||[]);
 const list=graph.find(n=>n['@type']==='ItemList');assert.equal(list.numberOfItems,page.lessons.length);assert.deepEqual(list.itemListElement.map((n:any)=>n.url),page.lessons.map(l=>'https://learnsmc.xyz'+prefix+getMasterclassUrl(l)));
 assert.equal(graph.find(n=>n['@type']==='BreadcrumbList').itemListElement.length,page.id==='all'?3:4);
 assert.ok(!all(body,n=>(attr(n,'class')||'').split(/\s+/).includes('wb-suite')).length,'Legacy workbench must not wrap collection');
 assert.ok(!all(body,n=>attr(n,'class')?.includes('mc-journal')).length,'A category must not auto-open a lesson');
 console.log(`${locale} ${path}: ${cards.length} cards, metadata, links and schema passed`);
}
