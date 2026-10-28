import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createServer as httpServer } from 'node:http';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { parse, parseFragment, serialize } from 'parse5';
import { AuditedRouteDocument } from '../src/components/AuditedRouteDocument';
import { auditedReadingRoute } from '../src/utils/auditedReadingRoutes';
import { localizeHtml } from './localized-html';
import { urdu } from '../src/i18n/urdu';
import { essentialReading, normalizeReading } from './audit-parity-content';
import allowlist from './audit-parity-allowlist.json';
import { replaceAuditedReadingRoot } from './audited-reading-document';

const output = 'outputs/audit-batch-2'; fs.mkdirSync(output,{recursive:true});
const all = (node:any):any[] => [node,...(node.childNodes || []).flatMap(all)];
const attr = (node:any,key:string) => node.attrs?.find((a:any)=>a.name===key)?.value;
const manifest = JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8')) as {path:string;outputPath:string}[];
const routes = manifest.filter(route=>!route.path.startsWith('/ur/')&&auditedReadingRoute(route.path));
const template = fs.readFileSync('index.html','utf8');
const startup = template.match(/<script>([\s\S]*?)<\/script>/)![1];
const fixtures = new Map<string,string>();
const compareOnly=(process.argv.includes('--compare')||process.argv.includes('--serve-only'))&&!process.argv.includes('--serve');
const records:any[]=compareOnly?JSON.parse(fs.readFileSync(path.join(output,'static-essential.json'),'utf8')):[];
for(const route of compareOnly?[]:routes) {
  const source=fs.readFileSync('dist/'+route.outputPath,'utf8'), document=parse(source) as any;
  const root=all(document).find(n=>attr(n,'id')==='root');
  const heading=attr(all(document).find(n=>n.tagName==='meta'&&attr(n,'name')==='learnsmc-heading'),'content');
  const body=renderToStaticMarkup(createElement(AuditedRouteDocument,{pathname:route.path,heading}));
  root.childNodes=parseFragment(body).childNodes;root.childNodes.forEach((node:any)=>node.parentNode=root);
  const htmlNode=all(document).find(n=>n.tagName==='html');htmlNode.attrs.push({name:'data-reading-enhancement',value:'true'});
  const boot=all(document).find(n=>n.tagName==='script'&&!attr(n,'src')&&attr(n,'type')!=='application/ld+json');
  boot.childNodes=[{nodeName:'#text',value:startup,parentNode:boot}];
  const entry=all(document).find(n=>n.tagName==='script'&&attr(n,'type')==='module'&&attr(n,'src'));
  entry.attrs.find((a:any)=>a.name==='src').value='/src/main.tsx';
  // Dependencies must come from the dev server, not old production modulepreloads.
  for(const preload of all(document).filter(n=>n.tagName==='link'&&attr(n,'rel')==='modulepreload')) preload.parentNode.childNodes=preload.parentNode.childNodes.filter((n:any)=>n!==preload);
  const english=serialize(document);
  for(const [locale,html] of [['en',english],['ur',replaceAuditedReadingRoot(localizeHtml(english,route.path,urdu,{indexable:true}),'/ur'+route.path,heading)]] as const) {
    const url=(locale==='ur'?'/ur':'')+route.path;
    fixtures.set(url,html);
    const essential=essentialReading(html);
    assert.ok(essential.length>0,url);
    if(auditedReadingRoute(url)==='chartlab') {
      assert.ok(!html.includes('href="#curriculum-review-heading"')&&!html.includes('href="#chapter-quiz-13"'),`Old Chart Lab fragments: ${url}`);
      assert.ok(html.includes('data-reading-chart="true"'),`No-JS candle preview: ${url}`);
      assert.ok(html.includes('data-essential-reading="chartlab"'));
    }
    if(auditedReadingRoute(url)==='ote') assert.ok(html.includes('data-essential-reading="ote-assumptions"'));
    records.push({path:url,essential});
    const file=path.join(output,'pages',url,'index.html');fs.mkdirSync(path.dirname(file),{recursive:true});fs.writeFileSync(file,html);
  }
}
assert.equal(routes.filter(route=>auditedReadingRoute(route.path)==='chartlab').length,7);
type TabException = { path: string; text: string; tab: string; reason: string };
const tabExceptions = allowlist.tabOnly as TabException[];
for (const rule of tabExceptions) {
  assert.ok(records.some(record => record.path === rule.path), 'Exception must name an audited route');
  assert.ok(rule.text?.trim() && rule.tab?.trim() && rule.reason?.trim(), 'Exception needs exact text, owning tab and reason');
}
assert.ok(!fs.readFileSync('src/main.tsx','utf8').includes('hydrateRoot'));
if(!compareOnly) fs.writeFileSync(path.join(output,'static-essential.json'),JSON.stringify(records,null,2));
console.log(`Targeted Batch 2 generation: ${records.length} EN/UR documents; all 14 Chart Lab documents have no dead lesson fragments; shared view/model rendering; zero tab-only exemptions.`);

if(process.argv.includes('--compare')) {
  const samples=JSON.parse(fs.readFileSync(path.join(output,'browser-final-samples.json'),'utf8'));
  const failures=[];
  for(const sample of samples) {
    const record=records.find(item=>item.path===new URL(sample.url).pathname)!;
    const present=new Set(sample.essential.map((item:any)=>item.normalized));
    const missing=record.essential.filter((item:any)=>!present.has(item.normalized)&&!tabExceptions.some(rule=>rule.path===record.path&&normalizeReading(rule.text)===item.normalized));
    if(missing.length) failures.push({url:sample.url,mode:sample.mode,missing});
    assert.equal(sample.rootVisible,true,`Visible reading root: ${sample.url}`);
    assert.equal(sample.overflow,false,`Horizontal overflow: ${sample.url}`);
    if(sample.mode.endsWith('ready')) {
      assert.equal(sample.startup,'ready',`Enhancement completed: ${sample.url}`);
      assert.equal(sample.stage,false,`Staging container removed: ${sample.url}`);
    }
    if(sample.mode.includes('script-free')) assert.equal(sample.startup,undefined,`No startup script: ${sample.url}`);
    if(sample.mode.includes('failed-entry')) assert.equal(sample.stage,false,`Failed entry leaves original document: ${sample.url}`);
  }
  const layoutPairs=samples.filter((sample:any)=>sample.mode==='slow-ready').map((after:any)=>{
    const before=samples.find((sample:any)=>sample.mode==='slow-reading'&&sample.url===after.url);
    assert.ok(before,`Missing pre-enhancement measurement: ${after.url}`);
    const delta=Object.fromEntries(['x','y','width','height'].map(key=>[key,after.rect[key]-before.rect[key]]));
    for(const value of Object.values(delta)) assert.ok(Math.abs(value as number)<=1,`Reading layout changed: ${after.url} ${JSON.stringify(delta)}`);
    return {url:after.url,delta};
  });
  assert.equal(layoutPairs.length,4,'One delayed before/after geometry pair per route family');
  fs.writeFileSync(path.join(output,'parity-results.json'),JSON.stringify({samples:samples.length,layoutPairs,failures},null,2));
  assert.deepEqual(failures,[],'Essential paragraph/heading parity; see parity-results.json');
  console.log(`Browser essential-content parity passed for ${samples.length} saved samples.`);
}

if(process.argv.includes('--serve')||process.argv.includes('--serve-only')) {
  if(compareOnly) for(const record of records) fixtures.set(record.path,fs.readFileSync(path.join(output,'pages',record.path,'index.html'),'utf8'));
  const {createServer}=await import('vite');
  // Keep the localization context single-instance in this middleware preview.
  // Prebundling the local JSX adapter otherwise creates a separate default-English context.
  const vite=await createServer({configFile:'vite.config.ts',cacheDir:path.join(output,'vite-cache-single-context'),server:{middlewareMode:true,hmr:false},appType:'custom',plugins:[{name:'audit-local-jsx-context',enforce:'post',configResolved(config){config.optimizeDeps.include=config.optimizeDeps.include?.filter(id=>!id.startsWith('@learnsmc/i18n'));}}],optimizeDeps:{noDiscovery:true,include:['react','react-dom/client','react/jsx-runtime','react/jsx-dev-runtime'],exclude:['@learnsmc/i18n/jsx-runtime','@learnsmc/i18n/jsx-dev-runtime']}});
  const server=httpServer(async(req,res)=>{
    const url=new URL(req.url!,'http://127.0.0.1:4213');
    if(url.pathname==='/__audit_failed_entry__.js'){res.writeHead(503,{'Content-Type':'application/javascript'});res.end('/* intentional failure fixture */');return;}
    if(url.pathname.startsWith('/assets/')) {
      const file=path.resolve('dist','.'+url.pathname);
      if(file.startsWith(path.resolve('dist/assets')+path.sep)&&fs.existsSync(file)){res.setHeader('Content-Type',file.endsWith('.css')?'text/css':'application/javascript');res.end(fs.readFileSync(file));return;}
    }
    const source=fixtures.has(url.pathname)?fs.readFileSync(path.join(output,'pages',url.pathname,'index.html'),'utf8'):undefined;
    if(source) {
      let html=source;const mode=url.searchParams.get('audit-js') || 'normal';
      if(mode==='off') html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
      if(mode==='failed') html=html.replace('/src/main.tsx','/__audit_failed_entry__.js');
      if(mode==='slow') html=html.replace(/<script\b[^>]*type="module"[^>]*src="\/src\/main\.tsx"[^>]*><\/script>/,'<script>setTimeout(function(){var entry=document.createElement("script");entry.type="module";entry.src="/src/main.tsx";document.body.appendChild(entry)},3500)</script>');
      const theme=url.searchParams.get('audit-theme');
      if(theme&&mode!=='off') html=html.replace('<head>','<head><script>localStorage.setItem("learnsmc-theme",'+JSON.stringify(theme)+')</script>');
      if(theme&&mode==='off') html=html.replace('data-theme="light"','data-theme="'+theme+'"');
      if(mode!=='off') html=await vite.transformIndexHtml(req.url!,html);
      res.setHeader('Content-Type','text/html; charset=utf-8');res.setHeader('Cache-Control','no-store');res.end(html);return;
    }
    vite.middlewares(req,res,()=>{res.statusCode=404;res.end('Not a Batch 2 fixture');});
  });
  server.listen(0,'127.0.0.1',()=>console.log(`Targeted parity preview: http://127.0.0.1:${(server.address() as {port:number}).port}/tools/chartlab/`));
}
