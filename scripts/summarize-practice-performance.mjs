import fs from 'node:fs';
import path from 'node:path';
import {brotliCompressSync,gzipSync,constants} from 'node:zlib';
const phase=process.argv[2]||'baseline',dir='outputs/practice-performance/'+phase;
const median=a=>{const s=a.filter(Number.isFinite).sort((a,b)=>a-b);return s.length?s[Math.floor(s.length/2)]:null;};
const summary=[],assetCache=new Map();
for(const page of ['chartlab','delivery','simulator','backtest','study','legacy']){
 const runs=[1,2,3].map(i=>JSON.parse(fs.readFileSync(`${dir}/${page}-${i}.json`,'utf8')));
 const details=runs.map(r=>{
  const requests=r.audits['network-requests'].details.items.filter(n=>n.resourceType==='Script');
  const js=requests.map(n=>{let asset;try{const file=path.resolve('dist','.'+new URL(n.url).pathname);asset=assetCache.get(file);if(!asset){const raw=fs.readFileSync(file);asset={raw:raw.length,gzip:gzipSync(raw).length,brotli:brotliCompressSync(raw,{params:{[constants.BROTLI_PARAM_QUALITY]:5}}).length};assetCache.set(file,asset);}}catch{}return {url:n.url,startTime:n.rendererStartTime,endTime:n.networkEndTime,resourceSize:n.resourceSize,transferSize:n.transferSize,...asset};});
  const lcpAudit=r.audits['largest-contentful-paint-element']||r.audits['lcp-breakdown-insight'];
  const findNodes=x=>!x||typeof x!=='object'?[]:[...(x.type==='node'?[{selector:x.selector,snippet:x.snippet,nodeLabel:x.nodeLabel}]:[]),...Object.values(x).flatMap(v=>Array.isArray(v)?v.flatMap(findNodes):findNodes(v))];
  return {fetchTime:r.fetchTime,throttling:r.configSettings.throttling,formFactor:r.configSettings.formFactor,scores:Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,Math.round(v.score*100)])),lcp:r.audits['largest-contentful-paint'].numericValue,tbt:r.audits['total-blocking-time'].numericValue,cls:r.audits['cumulative-layout-shift'].numericValue,lcpElement:findNodes(lcpAudit?.details),js,rawJs:js.reduce((n,v)=>n+v.resourceSize,0),transferJs:js.reduce((n,v)=>n+v.transferSize,0),initialBeforeLcp:js.filter(v=>v.startTime<r.audits['largest-contentful-paint'].numericValue).reduce((n,v)=>n+v.resourceSize,0),longTasks:r.audits['long-tasks']?.details?.items||[],unusedJs:r.audits['unused-javascript']?.details?.items||[]};
 });
 const result={page,runs:details,median:{scores:Object.fromEntries(['performance','accessibility','best-practices','seo'].map(k=>[k,median(details.map(r=>r.scores[k]))])),lcp:median(details.map(r=>r.lcp)),tbt:median(details.map(r=>r.tbt)),cls:median(details.map(r=>r.cls)),rawJs:median(details.map(r=>r.rawJs)),transferJs:median(details.map(r=>r.transferJs))}};summary.push(result);
}
fs.writeFileSync(dir+'/summary.json',JSON.stringify(summary,null,2));
const table=['| Page | Perf | A11y | BP | SEO | LCP ms | TBT ms | CLS | JS raw kB | JS transfer kB |','|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|',...summary.map(({page,median:m})=>`| ${page} | ${m.scores.performance} | ${m.scores.accessibility} | ${m.scores['best-practices']} | ${m.scores.seo} | ${m.lcp.toFixed(0)} | ${m.tbt.toFixed(0)} | ${m.cls.toFixed(4)} | ${(m.rawJs/1000).toFixed(1)} | ${(m.transferJs/1000).toFixed(1)} |`)];
fs.writeFileSync(dir+'/table.md',table.join('\n')+'\n');console.log(table.join('\n'));
