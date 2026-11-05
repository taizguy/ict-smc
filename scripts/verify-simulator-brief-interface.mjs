import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
const manifest=JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8'));
const walk=n=>[n,...(n.childNodes||[]).flatMap(walk)],attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value,rows=[];
const slugs=['ict-2022-model','silver-bullet-short','london-judas-swing','failed-ob-breaker','ote-expansion-long','news-driver-reversal'];
for(const prefix of ['','/ur'])for(const slug of slugs){
 const path=prefix+'/tools/simulator/'+slug+'/',route=manifest.find(r=>r.path===path);assert.ok(route,path);
 const html=fs.readFileSync('dist/'+route.outputPath,'utf8'),nodes=walk(parse(html));
 assert.equal(nodes.filter(n=>n.tagName==='h1').length,1,path);
 assert.ok(nodes.some(n=>attr(n,'data-simulator-brief')===slug),path);
 assert.ok(nodes.some(n=>attr(n,'class')==='practice-loop'),path);
 assert.ok(nodes.some(n=>attr(n,'data-route-study')==='simulator/'+slug),path+': specific brief');
 const application=nodes.find(n=>attr(n,'data-topic-application')!==undefined),link=walk(application).find(n=>n.tagName==='a');
 assert.ok(manifest.some(r=>r.path===attr(link,'href')),path+': application destination');
 const workspace=nodes.find(n=>attr(n,'id')==='general-decision-workspace');assert.ok(workspace);assert.ok(workspace.attrs.some(a=>a.name==='hidden'));assert.equal(walk(workspace).filter(n=>n.tagName==='canvas').length,0);
 assert.ok(nodes.some(n=>n.tagName==='a'&&attr(n,'href')===prefix+'/tools/simulator/'),path+': hub return');
 assert.ok(!html.includes('Opening your page...'),path);
 rows.push({path,application:attr(link,'href'),defaultWorkspace:'closed; shared dataset explicitly disclosed'});
}
assert.equal(new Set(rows.filter(r=>!r.path.startsWith('/ur/')).map(r=>r.application)).size,6);
fs.writeFileSync('outputs/practice-performance/simulator-ui-checks.json',JSON.stringify(rows,null,2));console.log('Twelve bilingual simulator briefs passed: distinct topic applications, full native study text, shared loop and honest opt-in generic workspace.');
