import fs from 'node:fs';
import path from 'node:path';
import {composeHistory} from './compositions.mjs';
import {captions} from './captions.mjs';

// Original schematic artifacts, not facsimiles or reconstructions. Seven different
// compositions per article; no borrowed museum images or invented ancient writing.
// Original scenes use the fourteen requested illustration grammars and their local authoring kits.
const styles=[
 ['flat','#ffffff','#011b5c','#9e91e1','#fec600','#93d7d5'],
 ['one-line','#ece7da','#1d1b1a','#8790f4','#f2846e','#ffffff'],
 ['halftone-line','#f4f1ea','#111111','#f4f1ea','#111111','#f4f1ea'],
 ['teal-spot','#ebebeb','#0e3f3d','#36c3b0','#ffffff','#d8f2ed'],
 ['framed-panel','#f7d8b5','#2e2a5c','#8a80ea','#edb24f','#95d1b3'],
 ['line-interior','#ffffff','#3a2d66','#ab9ee6','#f9c99a','#3fa58a'],
 ['isometric-mono','#ffffff','#0f3d30','#8de8a6','#fbf8f1','#5cc58a'],
 ['vintage-emblem','#f8f0e3','#1f2b25','#c8693f','#d9a873','#3f8273'],
 ['outlined-cartoon','#ffffff','#1e1b1b','#6b7fd4','#f6c343','#4ea54a'],
 ['bold-pop','#ffffff','#1f1c4d','#ff5fa8','#ffe36e','#4fe3ec'],
 ['flat-with-black','#ffffff','#15202f','#65aacb','#f9db74','#a6cf6e'],
 ['two-colour-brush','#f1ede3','#141412','#4fd592','#f7f4ec','#4fd592'],
 ['ink-sketch','#ffffff','#1d1a18','#f0563d','#ffc83d','#2fb5a7'],
 ['grainy-gouache','#ff81be','#1a0e0f','#e7a13a','#fdd5a8','#7a7318'],
];
const boards=[
 ['bowl','hands','gift','rope','book','circle','letter'],
 ['net','pot','hands','rope','scale','circle','gift'],
 ['obsidian','route','flint','shell','boat','beads','circle'],
 ['cow','grain','salt','shell','beads','scale','tablet'],
 ['tokens','seal','tablet','store','book','stamp','grain'],
 ['store','grain','scale','seal','tokens','book','route'],
 ['silver','scale','gold','book','shell','knife','stamp'],
 ['coin','silver','stamp','gold','scale','seal','book'],
 ['coin','store','scale','book','hands','route','letter'],
 ['route','coin','seal','boat','gold','book','scale'],
 ['shell','knife','spade','coin-hole','beads','stamp','store'],
 ['coin','scale','silver','coin-layers','book','store','gold'],
 ['tablet','grain','book','seal','store','hands','letter'],
 ['route','boat','silk','shell','letter','store','scale'],
 ['coin','seal','letter','route','book','hands','paper'],
 ['letter','coin-hole','boat','paper','stamp','book','scale'],
 ['book','boat','paper','hands','store','route','letter'],
 ['vault','paper','gold','book','store','letter','scale'],
 ['gold','vault','letter','window','route','book','scale'],
 ['store','grain','screen','orderbook','paper','book','hands'],
];
const descriptions={bowl:'A shared bowl is offered between two places at a table.',hands:'Two schematic hands meet around an object; the gesture is invented.',gift:'A wrapped gift travels toward another person; no price is assigned.',rope:'A loose loop connects two households, representing a continuing relationship.',book:'An open record book separates a claim from the thing it records.',circle:'Different forms of exchange coexist around an open circle.',net:'A fishing net waits beside a possible exchange partner.',pot:'A ceramic vessel sits beside an exchange arrow.',scale:'A balance compares two quantities; equality of weight is not equality of composition.',obsidian:'A faceted volcanic-glass fragment is connected to a distant source.',route:'Several linked stops form a network, not one proven historical itinerary.',flint:'A schematic flaked cutting stone; not a replica of an excavated tool.',shell:'A stylized cowrie shell; its monetary role depends on context.',boat:'An invented trading vessel moves between ports; not an archaeological reconstruction.',beads:'A string of beads raises the question of ornament versus payment.',cow:'A schematic animal stands for livestock wealth, not a fixed price.',grain:'Grain is counted and stored rather than treated as an automatic currency.',salt:'A salt block illustrates a useful commodity, not a universal ancient wage.',tokens:'Several clay-like counters organize quantities without an alphabet.',seal:'An abstract seal identifies responsibility without inventing a readable inscription.',tablet:'A clay-like tablet bears abstract counting marks, not a translation of ancient writing.',store:'Storage compartments organize goods and the work of keeping accounts.',stamp:'A stamp approaches a blank metal disc; no exact historical design is claimed.',silver:'Unstamped pieces of metal require assessment.',gold:'A metal ingot illustrates a reserve or payment asset; no weight is specified.',knife:'A tool-shaped monetary form is shown schematically.',spade:'A spade-shaped monetary object differs from an ordinary working tool.','coin-hole':'A round coin with a central hole illustrates a monetary form, not a specific issue.',coin:'A generic stamped disc is distinguished from weighed metal.','coin-layers':'Two schematic coin layers illustrate composition, not measured Roman fineness.',letter:'A written instruction connects a payer and a distant recipient.',silk:'A folded textile travels through connected trading networks.',paper:'A transferable note is shown as an abstract claim, not a reproduced banknote.',vault:'A vault and a claim are different objects; a note is not a picture of its issuer’s balance sheet.',window:'A gold link opens or closes as a change in redemption rules.',screen:'A screen displays an invented sequence of orders, not market data.',orderbook:'Two sides of an invented order book illustrate bids and offers.'};
const metadata=fs.readFileSync('src/data/articles-history.ts','utf8');
const slugs=[...metadata.matchAll(/slug:'([^']+)'/g)].map(m=>m[1]);
const out='public/images/articles/history';fs.mkdirSync(out,{recursive:true});
const registry={}; const manifest=[];
function card(n,frame){
 const style=styles[(n-1)%14], [name,paper,ink,a,b,c]=style,prefix=`h${n}f${frame}-`,kind=boards[n-1][frame];
 const width=name==='bold-pop'?3:name==='outlined-cartoon'?2.5:name==='line-interior'?1.4:name==='teal-spot'?1.2:name==='vintage-emblem'?3.6:2.3;
 const line=(d,color=ink,w=width)=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
 const shape=(d,fill=b)=>`<path d="${d}" fill="${fill}" stroke="${ink}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
 const rect=(x,y,w,h,fill=b,r=5)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${ink}" stroke-width="${width}"/>`;
 const ellipse=(x,y,rx,ry,fill=b)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${ink}" stroke-width="${width}"/>`;
 let art='',motion='lift';
 switch(kind){
 case 'bowl':art=shape('M140 167Q240 330 340 167Z',a)+ellipse(240,167,100,25,b)+[195,220,247,274].map((x,i)=>ellipse(x,160+i%2*10,9,7,c)).join('');break;
 case 'hands':art=shape('M65 222L115 187L166 195L211 180Q225 183 217 193L190 211L219 216Q230 227 216 231L171 232L122 216L81 250',a)+shape('M415 118L365 153L314 145L269 160Q255 157 263 147L290 129L261 124Q250 113 264 109L309 108L358 124L399 90',c)+ellipse(240,170,27,27,b);motion='exchange';break;
 case 'gift':art=rect(155,130,170,130,b)+rect(148,115,184,28,a)+rect(228,115,25,145,c)+line('M239 115C154 109 176 57 212 81L239 115C321 108 299 55 269 83Z');break;
 case 'rope':art=line('M90 210C70 100 178 88 214 170S324 263 372 167',a,12)+line('M90 210C70 100 178 88 214 170S324 263 372 167',ink,2)+ellipse(85,222,22,16,b)+ellipse(378,154,22,16,c);motion='trace';break;
 case 'book':art=shape('M90 115Q165 87 240 127Q315 87 390 115V270Q315 241 240 278Q165 241 90 270Z',b)+line('M240 127V278')+[0,1,2,3].map(i=>line(`M114 ${150+i*24}Q160 ${139+i*24} 211 ${159+i*24}`,a)+line(`M268 ${159+i*24}Q315 ${139+i*24} 367 ${150+i*24}`,c)).join('');break;
 case 'circle':art=line('M120 170A120 90 0 1 1 240 280',a,6)+shape('M239 264L268 280L239 296',c)+ellipse(130,95,21,21,b)+rect(324,160,32,32,c)+shape('M140 253L171 277L135 285Z',a);motion='orbit';break;
 case 'net':art=line('M140 95L333 104L317 273L159 267Z')+[0,1,2,3,4].map(i=>line(`M${150+i*34} 101L${166+i*30} 268`,a,1.5)+line(`M148 ${124+i*28}L326 ${130+i*28}`,ink,1.5)).join('');break;
 case 'pot':art=shape('M191 85H289V128Q354 168 331 250Q320 282 240 284Q160 282 149 250Q126 168 191 128Z',a)+ellipse(240,85,49,12,b)+line('M153 210Q240 244 330 211',c,12);break;
 case 'scale':art=rect(231,95,18,160,c)+shape('M175 278Q240 243 305 278Z',a)+line('M121 126L359 126',ink,5)+line('M151 128L120 215M151 128L183 215M329 128L297 215M329 128L361 215')+shape('M105 216H198Q151 274 105 216Z',b)+shape('M282 216H376Q329 274 282 216Z',b)+ellipse(152,207,19,8,c)+rect(312,192,31,22,a);motion='balance';break;
 case 'obsidian':case 'flint':art=shape('M183 267L144 204L193 101L267 72L328 145L302 247L241 286Z',kind==='obsidian'?ink:a)+line('M193 101L238 161L267 72M144 204L238 161L302 247M238 161L241 286',b,3)+line('M191 237L207 194M263 119L291 150',c,4);break;
 case 'route':art=line('M82 243Q116 81 205 139T395 91',a,4)+[82,160,238,316,395].map((x,i)=>ellipse(x,[243,137,154,155,91][i],12,12,i%2?b:c)).join('');motion='trace';break;
 case 'shell':art=shape('M173 106C210 62 298 82 319 147C350 235 278 292 216 276C151 258 134 162 173 106Z',b)+shape('M221 119Q267 130 261 232Q246 252 233 229Q249 175 221 119Z',a)+[0,1,2,3,4].map(i=>line(`M${212+i*3} ${140+i*19}l22 9`,ink,1.5)).join('');break;
 case 'boat':art=shape('M99 227Q240 249 381 227L330 285H150Z',a)+line('M240 75V236',ink,5)+shape('M230 89L230 215L124 215Z',b)+shape('M251 110L251 215L344 215Z',c)+line('M89 296Q120 284 150 296T210 296T270 296T330 296T390 296',a,3);motion='sail';break;
 case 'beads':art=line('M119 114Q70 296 240 291Q410 296 361 114',ink,2)+Array.from({length:13},(_,i)=>{const t=i/12*Math.PI;return ellipse(240-Math.cos(t)*123,126+Math.sin(t)*145,12,14,[a,b,c][i%3])}).join('');motion='exchange';break;
 case 'cow':art=shape('M139 149Q189 126 286 143L319 170L303 226L295 277H277L272 231H182L174 277H155L153 223L139 186Z',b)+shape('M306 133L354 137L366 187L336 207L306 177Z',a)+line('M325 139L315 116M348 139L363 120M140 157Q105 161 113 206')+ellipse(344,168,3,4,ink);break;
 case 'grain':art=shape('M158 113Q240 140 322 113L350 261Q240 302 130 261Z',a)+ellipse(240,113,82,18,b)+Array.from({length:16},(_,i)=>ellipse(189+(i%4)*32,158+Math.floor(i/4)*25,6,10,c)).join('');break;
 case 'salt':art=shape('M142 154L266 112L339 163L324 255L195 279L136 232Z',b)+line('M142 154L205 199L339 163M205 199L195 279',a,3)+line('M165 186L182 196M229 235L268 225',ink,2);break;
 case 'silver':art=shape('M104 228L144 169L204 186L219 240L169 264Z',c)+shape('M210 159L249 106L295 129L284 191L241 208Z',b)+shape('M270 232L300 190L355 210L361 253L316 279Z',a)+line('M144 169L164 220L204 186M249 106L253 164L284 191M300 190L319 236L361 253',ink,2);break;
 case 'gold':art=shape('M123 208L181 126H308L355 208L325 257H143Z',kind==='silver'?c:b)+line('M123 208H355M181 126L196 208L179 257M308 126L286 208L302 257',a,3)+line('M207 147H271',ink,2);break;
 case 'tokens':art=[[-70,25,'M-15 14L0 -15L15 14Z'],[0,-20,'M-15 -15H15V15H-15Z'],[75,20,'M-17 0A17 17 0 1 1 17 0A17 17 0 1 1-17 0Z']].map(([x,y,d],i)=>`<g transform="translate(${240+x} ${170+y})">${shape(d,[a,b,c][i])}</g>`).join('')+ellipse(240,246,122,16,b);motion='exchange';break;
 case 'seal':art=rect(149,100,182,172,b)+rect(176,124,130,116,a)+line('M196 187L221 158L245 191L271 163M195 216H285',ink,4)+ellipse(240,81,27,12,c);motion='stamp';break;
 case 'tablet':art=shape('M139 108Q240 81 341 108L333 267Q240 286 147 267Z',b)+Array.from({length:15},(_,i)=>line(`M${177+i%5*25} ${145+Math.floor(i/5)*43}l9 0-5 12Z`,ink,2)).join('');break;
 case 'store':art=rect(109,124,262,149,b)+shape('M93 124L240 66L387 124Z',a)+[0,1,2].map(i=>rect(130+i*80,153,60,95,c)+line(`M${141+i*80} 179h37M${141+i*80} 194h37M${141+i*80} 209h37`,ink,1.5)).join('');break;
 case 'stamp':art=ellipse(240,264,75,21,b)+rect(198,170,84,26,a)+rect(221,112,38,60,c)+ellipse(240,109,36,14,a)+line('M185 229L196 218M295 229L284 218');motion='stamp';break;
 case 'knife':art=shape('M102 190Q160 108 306 115L330 135L300 165L200 180L154 221L125 231Z',a)+ellipse(119,209,9,9,b)+line('M176 179L283 133',ink,1.5);break;
 case 'spade':art=shape('M217 81H263V139L314 164L302 276L241 256L178 276L166 164L217 139Z',a)+line('M240 104V220M190 181L216 190M265 190L290 181',ink,2);break;
 case 'coin-hole':art=ellipse(240,181,102,102,a)+ellipse(240,181,86,86,b)+rect(219,160,42,42,paper,0)+line('M240 112V135M240 229V251M171 181H194M286 181H309',ink,3);motion='coin';break;
 case 'coin':art=ellipse(249,190,100,100,ink)+ellipse(240,180,100,100,b)+ellipse(240,180,80,80,a)+shape('M202 203L218 158L250 139L273 165L263 213Z',b)+line('M216 220H267',ink,2);motion='coin';break;
 case 'coin-layers':art=ellipse(185,180,74,74,b)+shape('M185 106A74 74 0 0 1 185 254Z',a)+ellipse(310,180,44,74,c)+line('M270 104L234 124M270 256L234 236',ink,2);motion='exchange';break;
 case 'letter':case 'paper':art=rect(134,98,212,171,b)+line(kind==='letter'?'M134 100L240 191L346 100M134 269L205 189M346 269L275 189':'M163 135H317M163 158H285M163 181H304',a,3)+ellipse(267,219,22,22,c);motion='exchange';break;
 case 'silk':art=shape('M122 127L286 95L354 224L187 267Z',a)+line('M152 135L210 246M182 129L241 240M213 121L270 232M244 116L302 226',b,6)+shape('M187 267L354 224L354 247L189 288Z',c);break;
 case 'vault':art=rect(136,93,208,194,a)+rect(155,111,170,158,b)+ellipse(240,189,51,51,c)+line('M240 149V229M200 189H280M212 161L268 217M212 217L268 161',ink,5)+[132,250].map(y=>rect(145,y,17,10,c)).join('');motion='balance';break;
 case 'window':art=rect(120,98,240,168,b)+line('M240 98V266M120 181H360',ink,4)+shape('M246 106L345 126V245L246 260Z',a)+ellipse(192,224,22,12,c)+line('M275 179L302 179',ink,3);motion='door';break;
 case 'screen':art=rect(95,87,290,188,ink)+rect(108,101,264,153,b)+rect(220,275,40,23,a)+rect(173,298,134,10,c)+line('M126 224L168 191L196 208L240 149L272 177L319 130L355 143',a,4)+[0,1,2,3].map((i)=>line(`M${152+i*55} ${144-i*9}v70`,ink,1.5)+rect(144+i*55,164-i*9,16,28,i%2?a:c,0)).join('');motion='orders';break;
 case 'orderbook':art=rect(95,87,290,188,ink)+rect(108,101,264,153,b)+rect(220,275,40,23,a)+rect(173,298,134,10,c)+Array.from({length:5},(_,i)=>rect(128,117+i*24,82-i*9,10,a,2)+rect(264-i*8,117+i*24,85+i*8,10,c,2)).join('')+line('M240 111V242',ink,1.5);motion='orders';break;
 }
 if(name==='halftone-line') art=art.replaceAll('stroke="#f4f1ea"','stroke="#111111"');
 let svg=composeHistory({prefix,name,frame,n,art,kind,paper,ink,a,b,c,motion});
 // Revisited visual grammars reverse the stage: the guide and artifact exchange sides.
 // This keeps both the composition and the scene distinct across all twenty articles.
 if(n>14) svg=svg.replace(/(<svg[^>]*>)/,'$1<g transform="translate(480 0) scale(-1 1)">').replace('</svg>','</g></svg>');
 return {svg,kind,style:name,caption:captions[n-1][frame],motion};
}
for(let n=1;n<=20;n++)for(let frame=0;frame<7;frame++){
 const item=card(n,frame),key=`${slugs[n-1]}-${frame}`;
 fs.writeFileSync(path.join(out,key+'.svg'),item.svg);
 registry[key]={kind:item.kind,style:item.style,caption:item.caption,motion:item.motion};manifest.push({article:n,frame,...item,svg:undefined,path:`/images/articles/history/${key}.svg`});
}
fs.writeFileSync('src/data/history-art.generated.ts','// Generated by scripts/history/generate-art.mjs; trusted local SVG only.\nexport const historyArt = '+JSON.stringify(registry)+';\n');
fs.writeFileSync('docs/history/illustration-manifest.json',JSON.stringify(manifest,null,2)+'\n');
console.log(`Generated ${manifest.length} original history illustrations in ${styles.length} visual grammars.`);
