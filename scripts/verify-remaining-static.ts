import fs from 'node:fs';import assert from 'node:assert/strict';import {parse} from 'parse5';
import {remainingStudies,instrumentLabel} from '../src/data/chartLabRemainingContent';
import {casesFor,price} from '../src/data/chartLabRemaining';
const text=(n:any):string=>n.value||(n.childNodes||[]).map(text).join(''),attr=(n:any,k:string)=>n?.attrs?.find((a:any)=>a.name===k)?.value;
const manifest=JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8')),report=[];
for(const s of remainingStudies)for(const [n,locale] of ['en','ur'].entries()){
 const route=(n?'/ur':'')+'/tools/chartlab/'+s.slug+'/',html=fs.readFileSync('dist'+route+'index.html','utf8'),nodes:any[]=[];function walk(v:any){nodes.push(v);for(const c of v.childNodes||[])walk(c)}walk(parse(html));
 const head=nodes.find(v=>v.tagName==='head'),meta=(key:string)=>head.childNodes.find((v:any)=>v.tagName==='meta'&&(attr(v,'name')===key||attr(v,'property')===key))?.attrs.find((a:any)=>a.name==='content')?.value;
 assert.equal(text(head.childNodes.find((v:any)=>v.tagName==='title')),s.title[n]);assert.equal(meta('description'),s.description[n]);
 assert.equal(meta('og:description'),s.description[n]);assert.equal(meta('twitter:description'),s.description[n]);assert.equal(meta('og:title'),s.title[n]);assert.equal(meta('twitter:title'),s.title[n]);assert.ok(!/noindex/.test(meta('robots')||''));
 const h1=nodes.filter(v=>v.tagName==='h1');assert.equal(h1.length,1);assert.equal(text(h1[0]),s.h1[n]);
 const canonical=head.childNodes.find((v:any)=>v.tagName==='link'&&attr(v,'rel')==='canonical');assert.equal(attr(canonical,'href'),'https://learnsmc.xyz'+route);
 for(const lang of ['en','ur','x-default']){const a=head.childNodes.find((v:any)=>v.tagName==='link'&&attr(v,'hreflang')===lang);assert.equal(attr(a,'href'),'https://learnsmc.xyz'+(lang==='ur'?'/ur':'')+'/tools/chartlab/'+s.slug+'/');}
 const scripts=nodes.filter(v=>v.tagName==='script'&&attr(v,'type')==='application/ld+json');assert.equal(scripts.length,1);const graph=JSON.parse(text(scripts[0]))['@graph'];assert.deepEqual(graph.map((v:any)=>v['@type']).sort(),['BreadcrumbList','LearningResource','WebPage']);
 for(const v of graph.filter((v:any)=>v['@type']!=='BreadcrumbList')){assert.equal(v.inLanguage,locale);assert.equal(v.author.name,'Muhammad Umer Ijaz');assert.equal(v.dateModified,'2026-11-03');assert.ok(!v.datePublished);}
 const crumbs=nodes.find(v=>v.tagName==='nav'&&['Breadcrumbs','رہنمائی کا راستہ'].includes(attr(v,'aria-label')));for(const item of graph.find((v:any)=>v['@type']==='BreadcrumbList').itemListElement)assert.ok(text(crumbs).includes(item.name),'Visible breadcrumb/schema mismatch '+route);
 assert.ok(text(crumbs).includes(instrumentLabel(s,!!n)));
 const image=`https://learnsmc.xyz/images/social/${s.slug}-${locale}.png`;assert.equal(meta('og:image'),image);assert.equal(meta('twitter:image'),image);assert.equal(meta('og:image:alt'),s.h1[n]);assert.equal(meta('twitter:image:alt'),s.h1[n]);assert.ok(fs.existsSync('dist'+new URL(image).pathname));
 const png=fs.readFileSync('dist'+new URL(image).pathname);assert.equal(png.readUInt32BE(16),1200);assert.equal(png.readUInt32BE(20),630);
 for(const rule of s.rules)assert.ok(text(nodes.find(v=>v.tagName==='body')).includes(rule[n]),'Static rule missing');for(const faq of s.faqs)assert.ok(text(nodes.find(v=>v.tagName==='body')).includes(faq.a[n]),'Static FAQ missing');
 for(const c of casesFor(s))for(const b of [...c.bars,...c.groups.flatMap(g=>g.bars)]){assert.ok(html.includes(b.time),'Missing UTC open '+route);for(const v of [b.open,b.high,b.low,b.close])assert.ok(html.includes(price(c,v)),'Missing OHLC value');}
 const ids=new Set(nodes.map(v=>attr(v,'id')).filter(Boolean));for(const a of nodes.filter(v=>v.tagName==='a')){const href=attr(a,'href');if(!href)continue;if(href.startsWith('#'))assert.ok(ids.has(href.slice(1)),'Dead fragment '+href);if(href.startsWith('/')&&!href.startsWith('//')){const path=href.split(/[?#]/)[0];assert.ok(fs.existsSync('dist'+path+(path.endsWith('/')?'index.html':'')),'Broken link '+href);}}
 assert.equal(manifest.filter((v:any)=>v.title===s.title[n]).length,1);assert.equal(manifest.filter((v:any)=>v.description===s.description[n]).length,1);
 assert.ok(fs.readFileSync('dist/sitemap.xml','utf8').includes('https://learnsmc.xyz'+route));report.push({route,title:s.title[n],descriptionLength:[...s.description[n]].length,h1:1,cases:casesFor(s).length,tables:nodes.filter(v=>v.tagName==='table').length,faq:5,brokenLinks:0});
}
assert.equal((fs.readFileSync('dist/sitemap.xml','utf8').match(/<loc>/g)||[]).length,759);
fs.writeFileSync('outputs/chartlab-five/remaining-static-checks.json',JSON.stringify(report,null,2));console.log('Eight EN/UR documents passed: static candles/answers/rules, unique head metadata, schema/breadcrumb parity, canonical/hreflang/social, no dead links and 759 sitemap URLs.');
