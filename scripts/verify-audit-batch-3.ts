import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parse } from 'parse5';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { toolRouteStudies } from '../src/data/toolRouteStudies';
import { ToolRouteStudy } from '../src/components/ToolRouteStudy';
import { TranslationProvider } from '../src/i18n/TranslationProvider';
import { urdu } from '../src/i18n/urdu';
import { localizeHtml } from './localized-html';
import { renderAuditedReading } from './audited-reading-document';
import { correctToolDocument } from './tools-content';
import type { RouteMeta } from './prerender';

const family=process.argv[2]||'chartlab';
const production=process.argv.includes('--production');
const manifest=production?JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8')):[];
const studies=toolRouteStudies[family];
assert.ok(studies,`Unknown family: ${family}`);
const affected=fs.readFileSync('docs/technical-seo-audit-2026-10-28-affected-urls.csv','utf8').split(/\r?\n/).filter(line=>line.startsWith('P1 review,Near-identical static content,')&&line.includes(`/tools/${family}/`)).map(line=>new URL(line.split(',')[2]).pathname);
assert.equal(Object.keys(studies).length,affected.length,'Each flagged route reviewed individually');
const text=(node:any):string=>node.nodeName==='#text'?node.value:['script','style','svg','nav','footer'].includes(node.tagName)?'':(node.childNodes||[]).map(text).join(' ');
const normalized=(s:string)=>s.normalize('NFKC').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const trigrams=(s:string)=>{const w=normalized(s).split(' ');return new Set(w.slice(2).map((_,i)=>w.slice(i,i+3).join(' ')));};
const similarity=(a:Set<string>,b:Set<string>)=>[...a].filter(t=>b.has(t)).length/new Set([...a,...b]).size;
const reports:any[]=[];
fs.mkdirSync('outputs/audit-batch-3',{recursive:true});
for(const locale of ['en','ur'] as const) {
  const documents: {path:string;grams:Set<string>}[]=[];
  for(const pathname of affected) {
    const slug=pathname.split('/').filter(Boolean).at(-1)!,study=studies[slug];
    assert.ok(study,pathname);
    for(const pair of Object.values(study)) {assert.notEqual(pair[0],pair[1]);assert.match(pair[1],/[\u0600-\u06ff]/);assert.equal(urdu[pair[0]],pair[1]);}
    const routePath=locale==='ur'?'/ur'+pathname:pathname;
    const note=renderToStaticMarkup(createElement(TranslationProvider,{locale,catalog:urdu,children:createElement(ToolRouteStudy,{family,slug})}));
    let html:string;
    if(production) {
      const route=manifest.find((entry:any)=>entry.path===routePath);
      assert.ok(route,`Production manifest missing ${routePath}`);
      html=fs.readFileSync('dist/'+route.outputPath,'utf8');
      const nodes=(n:any):any[]=>[n,...(n.childNodes||[]).flatMap(nodes)];
      const tree=nodes(parse(html));
      const attr=(n:any,k:string)=>n.attrs?.find((a:any)=>a.name===k)?.value;
      assert.equal(attr(tree.find(n=>n.tagName==='html'),'lang'),locale);
      assert.ok(tree.some(n=>n.tagName==='link'&&attr(n,'rel')==='canonical'&&attr(n,'href')==='https://learnsmc.xyz'+routePath));
      for(const language of ['en','ur','x-default']) assert.ok(tree.some(n=>n.tagName==='link'&&attr(n,'rel')==='alternate'&&attr(n,'hreflang')===language),`${routePath}: ${language}`);
    }
    else if(family==='chartlab'||(family==='delivery-suite'&&slug==='ote-calculator')) html=renderAuditedReading(routePath,study.heading[locale==='ur'?1:0]);
    else {
      const meta={canonical:'https://learnsmc.xyz'+pathname,heading:study.heading[0],bodyHtml:'',title:'',description:''} as RouteMeta;
      correctToolDocument(meta,pathname);
      html=locale==='ur'?localizeHtml(`<main>${meta.bodyHtml}</main>`,pathname,urdu):`<main>${meta.bodyHtml}</main>`;
    }
    assert.ok(html.includes(`data-route-study="${family}/${slug}"`),`Static note missing: ${routePath}`);
    const plain=normalized(text(parse(html)));
    for(const key of ['heading','instructions','example','assumptions','limitations'] as const) assert.ok(plain.includes(normalized(study[key][locale==='ur'?1:0])),`${routePath}: ${key}`);
    assert.ok(normalized(text(parse(note))).includes(normalized(study.example[locale==='ur'?1:0])),'Runtime uses same model');
    fs.writeFileSync(`outputs/audit-batch-3/${family}-${slug}-${locale}.html`,html);
    documents.push({path:routePath,grams:trigrams(text(parse(html)))});
  }
  for(let i=0;i<documents.length;i++) for(let j=i+1;j<documents.length;j++) {
    const a=documents[i],b=documents[j],score=similarity(a.grams,b.grams);
    reports.push({locale,a:a.path,b:b.path,jaccard_3gram:score});
    assert.ok(score<.90,`${a.path} / ${b.path}: ${score.toFixed(3)} >= .90`);
  }
}
fs.writeFileSync(`outputs/audit-batch-3/${family}-similarity.json`,JSON.stringify(reports,null,2));
console.log(`${production?'Production output: ':''}${family}: ${affected.length} routes × EN/UR, shared static/runtime notes; max word-trigram Jaccard ${Math.max(...reports.map(r=>r.jaccard_3gram)).toFixed(3)} < .90.`);

if(process.argv.includes('--all-pairs')) {
  const allReports:any[]=[];
  for(const locale of ['en','ur']) {
    const documents=Object.entries(toolRouteStudies).flatMap(([name,entries])=>Object.keys(entries).map(slug=>({
      path:`${locale==='ur'?'/ur':''}/tools/${name}/${slug}/`,
      grams:trigrams(text(parse(fs.readFileSync(`outputs/audit-batch-3/${name}-${slug}-${locale}.html`,'utf8')))),
    })));
    assert.equal(documents.length,19);
    for(let i=0;i<documents.length;i++) for(let j=i+1;j<documents.length;j++) {
      const a=documents[i],b=documents[j],score=similarity(a.grams,b.grams);
      allReports.push({locale,a:a.path,b:b.path,jaccard_3gram:score});
      assert.ok(score<.90,`Cross-family similarity: ${a.path} / ${b.path}: ${score}`);
    }
  }
  fs.writeFileSync('outputs/audit-batch-3/all-pairs.json',JSON.stringify(allReports,null,2));
  console.log(`All 19 routes, EN/UR: ${allReports.length} pairs; maximum ${Math.max(...allReports.map(r=>r.jaccard_3gram)).toFixed(3)} < .90.`);
}
