import fs from 'node:fs';
import assert from 'node:assert/strict';
import {parse} from 'parse5';
const manifest=JSON.parse(fs.readFileSync('dist/seo-manifest.json','utf8'));
const rows=[];
function nodes(n){return [n,...(n.childNodes||[]).flatMap(nodes)]}
const attr=(n,k)=>n.attrs?.find(a=>a.name===k)?.value;
for(const route of manifest){const html=fs.readFileSync('dist/'+route.outputPath,'utf8'),all=nodes(parse(html));
 const switches=all.filter(n=>(attr(n,'class')||'').split(' ').includes('language-toggle'));
 const paired=route.path.startsWith('/ur/')||manifest.some(r=>r.path==='/ur'+route.path);
 if(paired)assert.equal(switches.length,1,route.path+': one main language switch');else assert.ok(switches.length<=1,route.path+': no duplicate language switch');
 assert.ok(!html.includes('data-language-switcher'),route.path+': duplicate removed');
 const match=route.path.match(/^(\/ur)?\/tools\/delivery-suite\/(macro-clock|ote-calculator|judas-planner|learning-path)\/$/);if(!match)continue;
 assert.equal(all.filter(n=>n.tagName==='h1').length,1,route.path);
 assert.ok(all.some(n=>attr(n,'data-delivery-module')===match[2]),route.path);
 assert.ok(all.some(n=>attr(n,'class')==='practice-loop'),route.path);
 const nav=all.find(n=>attr(n,'class')==='delivery-module-nav');assert.ok(nav,route.path);
 const links=nodes(nav).filter(n=>n.tagName==='a');assert.equal(links.length,4);assert.equal(links.filter(n=>attr(n,'aria-current')==='page').length,1);
 for(const link of links)assert.ok(manifest.some(r=>r.path===attr(link,'href')),route.path+': real module destination');
 assert.ok(!html.includes('Opening your page...'),route.path);
 rows.push({path:route.path,module:match[2],languageSwitches:switches.length});
}
assert.equal(rows.length,8);fs.writeFileSync('outputs/practice-performance/delivery-ui-checks.json',JSON.stringify({pages:manifest.length,routes:rows},null,2));console.log('No duplicate header switches verified on '+manifest.length+' pages; all 8 EN/UR module pages use the shared layout.');
