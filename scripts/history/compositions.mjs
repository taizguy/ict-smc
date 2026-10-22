import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';
import {pathToFileURL} from 'node:url';
const root=process.env.CODEX_SKILLS_DIR||path.join(os.homedir(),'.codex/skills');
const kit=async(name,file)=>import(pathToFileURL(path.join(root,name,'scripts',file)).href);
const [F,I,G,V,K,B,P,O,L,Q]=await Promise.all([
 kit('illustration-flat','flat-kit.mjs'),kit('illustration-isometric-mono','iso.mjs'),kit('illustration-grainy-gouache','gouache.mjs'),kit('illustration-vintage-emblem','emblem-kit.mjs'),kit('illustration-ink-sketch','ink-kit.mjs'),kit('illustration-two-colour-brush','brush.mjs'),kit('illustration-bold-pop','pop.mjs'),kit('illustration-one-line','oneline.mjs'),kit('illustration-line-interior','interior.mjs'),kit('illustration-flat-with-black','parts.mjs')]);
const temp='outputs/history/authoring.svg';fs.mkdirSync('outputs/history',{recursive:true});
const wrap=(p,body,defs='')=>`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 360"><defs>${defs}</defs>${body}</svg>`;
const pl=(d,fill,ink='#172032',w=2)=>`<path d="${d}" fill="${fill}" stroke="${ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"/>`;
const group=(s,tf)=>`<g transform="${tf}">${s}</g>`;
const deco=(ink,x,y)=>pl(`M${x-7} ${y}h14M${x} ${y-7}v14`,'none',ink,1.7);
// A present-day museum visitor is a storytelling device, not a reconstructed ancient person.
function flatGuide(f){
 const W=F.frame([145,214],(f%3-1)*4),h=[151,102],sh=W([17,-69]),el=[185,178-f*3],wr=[213,168-f*3];
 return F.leg({hip:W([-11,3]),knee:[127,260],heel:[121,310],trouser:F.PAL.ind,hipW:25,kneeW:18,hemW:15})+F.leg({hip:W([11,3]),knee:[157,259],heel:[164,310],trouser:F.PAL.ind,hipW:25,kneeW:18,hemW:15})+F.arm(W([-17,-69]),[108,182],[104,212],{top:F.PAL.lav})+F.openHand([104,212],85,{hand:'L',side:'back',s:.9})+F.torso(W,{top:F.PAL.lav})+F.neck(W([-7,-83]),W([7,-84]),h,-5,{flip:true})+F.head(h,-5,{hair:f%2?'bun':'quiff',flip:true})+F.arm(sh,el,wr,{top:F.PAL.lav})+F.openHand(wr,-20,{hand:'R',side:'back',s:.9});
}
function isoScene(prefix,frame){
 I.init(prefix);I.floorDefs();I.platform();
 const places=[[-75,-62,24],[65,-62,34],[-68,65,21],[68,58,16],[0,5,28]];
 places.forEach(([x,y,h])=>I.castShadow(I.rectFoot(x-18,x+18,y-18,y+18),h,.62,.24));I.glow(0,0,100,40,I.MG,.19);I.flushFloor();
 I.box(-95,-55,-82,-42,0,24,I.M.pale);I.box(45,86,-82,-42,0,34,I.M.mid);
 for(let j=0;j<4;j++)I.strokeP(I.D([[-90+j*8,-41,7],[-90+j*8,-41,19]],false));
 // Hero changes from ingots to scales, ledger, shells, tool money and stamp.
 const z=frame===1?92:42;
 if(frame===1){I.box(-5,5,-5,5,0,z,I.M.dark);I.box(-63,63,-4,4,84,90,I.M.light);for(const x of [-53,53]){I.strokeP(I.D([[x,0,85],[x,0,34]],false));I.prismZ(I.circle(x,0,23,16),29,33,I.M.mid);}}
 else if(frame===3){I.box(-40,40,-30,30,0,12,I.M.light);for(let j=0;j<6;j++)I.strokeP(I.D([[-29,-20+j*8,13],[27,-20+j*8,13]],false),I.OUT,.8);}
 else if(frame===4){I.prismZ(I.circle(0,0,37,24),0,20,I.M.pale);for(let j=-2;j<=2;j++)I.strokeP(I.D([[j*8,-22,21],[j*7,23,21]],false),I.DG,.8);}
 else if(frame===5){I.prismZ([[-65,-7],[-32,-26],[52,-15],[60,0],[27,12],[-47,16]],0,9,I.M.mid);I.dot([-44,0,10],4,I.OW);}
 else if(frame===6){I.box(-28,28,-24,24,0,12,I.M.mid);I.prismZ(I.circle(0,0,13,16),12,49,I.M.light);I.prismZ(I.circle(0,0,24,20),49,58,I.M.mid);}
 else if(frame===2){for(let j=0;j<3;j++)I.prismZ([[-43+j*13,-28+j*12],[25+j*10,-28+j*12],[43+j*5,3+j*12],[-43+j*13,3+j*12]],j*10,j*10+10,I.M.mid);}
 else {I.prismZ([[-43,-28],[25,-28],[43,23],[-43,23]],0,z,I.M.mid);I.strokeP(I.D([[-32,-12,z+1],[13,-12,z+1]],false),I.MG,1.2);}
 // Counting weights, blank discs and a small storage tray, all in the same projection.
 I.box(-92,-44,42,86,0,10,I.M.pale);for(let j=0;j<3;j++)I.prismZ(I.circle(-80+j*12,61,6,12),11,21+j*2,I.M.mid);
 for(let j=0;j<3;j++)I.prismZ(I.circle(66,59,21,24),j*6,j*6+5,I.M.light);
 I.writeSVG(temp,'An invented weighing and accounting workspace');return fs.readFileSync(temp,'utf8').replace(/(<\/defs>)/,'$1<g data-history-motion="lift">').replace('</svg>','</g></svg>');
}
function gouache(prefix,frame,art){
 const p=prefix,tilt=(frame%3-1)*5;
 const owl=G.grained(p,`<ellipse cx="150" cy="230" rx="61" ry="74" fill="url(#${p}gOchre)"/><path d="M98 177L94 96L133 119Q160 107 184 121L211 96L207 179Q202 218 152 220Q103 213 98 177Z" fill="url(#${p}gOchre)"/><ellipse cx="133" cy="164" rx="29" ry="35" fill="url(#${p}gCream)"/><ellipse cx="179" cy="164" rx="29" ry="35" fill="url(#${p}gCream)"/>`)+G.eye(p,133,161,14,[1,.2])+G.eye(p,179,161,14,[1,.2])+`<path d="M150 179L160 179L155 193Z" fill="#7A2207"/>`+G.blush(115,183)+G.blush(197,183)+G.grained(p,`<path d="M109 221Q63 211 80 262Q106 285 125 275Z" fill="url(#${p}gOchre)"/><path d="M191 219Q218 197 248 208L252 225Q216 250 188 264Z" fill="url(#${p}gOchre)"/><ellipse cx="126" cy="302" rx="22" ry="9" fill="#4A0901"/><ellipse cx="178" cy="302" rx="22" ry="9" fill="#4A0901"/>`);
 const props=art.replace(/stroke="[^"]+"/g,'stroke="#4A0901"').replace(/fill="#[^"]+"/g,`fill="url(#${p}gCream)"`);
 return G.card(p,G.defs(p),G.background(p,{seed:frame+4})+G.leaves(p,[['ivy',54,98,-20,1],['oak',414,82,18,1.1],['olv',423,238,-21,1.2],['oak',69,284,-42,.8],['ivy',368,316,40,.8],['olv',49,199,20,.75]])+G.shadow(p,70,412,313)+group(owl,`rotate(${tilt} 150 300)`)+`<g data-history-motion="sail">${group(G.grained(p,props),`translate(175 88) scale(.56)`)}</g>`,'A fictional owl studies trade; an illustrative metaphor');
}
function inkScene(prefix,frame,kind,art){
 K.reset();K.setPrefix(prefix);const cx=220+frame%3*14,cy=183;
 const pts=kind==='grain'?[[cx-68,cy-65],[cx+55,cy-72],[cx+76,cy+71],[cx-77,cy+74]]:[[cx-76,cy-78],[cx+69,cy-68],[cx+75,cy+74],[cx-78,cy+70]];
 const lp=K.fillShape('record',pts,frame%2?'#FFC83D':'#F0563D',{off:[-3,2],j:1.6});K.mottle(lp,'#8C4A1C',.22);K.stroke('outline',lp,{...K.OUT([cx,cy]),dense:true});
 K.stroke('arm-left',[[cx-74,cy+5],[cx-109,cy-18],[cx-125,cy-53]],{w:4.4});K.stroke('arm-right',[[cx+73,cy+5],[cx+102,cy-18],[cx+126,cy-30]],{w:4.4});
 K.stroke('leg-left',[[cx-35,cy+74],[cx-42,291],[cx-67,298]],{w:5});K.stroke('leg-right',[[cx+30,cy+74],[cx+38,291],[cx+62,297]],{w:5});
 K.eye('left-eye',[cx-25,cy-20],18,[cx-19,cy-20],6);K.eye('right-eye',[cx+23,cy-21],20,[cx+28,cy-22],7);K.blush('cheek',cx-47,cy+8);K.stroke('mouth',[[cx-15,cy+22],[cx,cy+30],[cx+16,cy+21]],{w:2.3});
 for(let j=0;j<4;j++)K.stroke('marks'+j,[[cx-39,cy+43+j*6],[cx+26-j*9,cy+43+j*6]],{w:1.3});
 K.el.splice(0,0,'<g transform="translate(-12 45) scale(.8)">');K.add('</g>');K.add(group(art,'translate(213 104) scale(.43)'));
 K.stroke('ground',[[92,309],[150,307],[240,311],[347,307],[388,310]],{w:1.2});K.svgOut(temp,{label:'A fictional living record worries about keeping accounts'});return fs.readFileSync(temp,'utf8').replace(/(<g filter=)/,'<g data-history-motion="balance"></g>$1').replace('<g transform="translate(0 0)">','<g data-history-motion="balance" transform="translate(0 0)">');
}
function brush(prefix,frame,art){
 const b=B.createBrush({prefix,seed:frame+21});const P=[];const add=s=>P.push(s);
 add(b.fillShape([[86,295],[100,203],[142,193],[166,292]],b.MINT,4,3));
 add(b.stroke([[105,229],[99,266],[95,310]],{w:20}));add(b.stroke([[141,229],[152,266],[162,309]],{w:20}));
 add(b.fillShape([[102,156],[141,155],[152,225],[94,225]],b.INK));
 add(b.profileHead(119,128,{scale:1.15,hair:frame%2?'bun':'curly',eye:'open',mouth:'smile',deg:(frame%3-1)*4}));
 add(b.stroke([[139,169],[174,191],[206,174-frame*3]],{w:14}));add(b.fist(207,174-frame*3,-35));add(b.stroke([[103,166],[76,197],[83,234]],{w:12}));add(b.fist(84,234,75));
 add(b.shoe([95,313],0,.8));add(b.shoe([162,313],0,.8));
 const props=art.replace(/stroke="[^"]+"/g,`stroke="${b.INK}"`).replace(/fill="#[^"]+"/g,`fill="${b.MINT}"`);
 add(group(props,'translate(165 95) scale(.58)'));
 // All mark-making below is filled brush ribbon geometry; no live stroke effects.
 add(b.stroke([[230,281],[347,281]],{w:4}));for(let j=0;j<5;j++)add(b.stroke([[248+j*20,110],[255+j*20,100]],{w:2}));
 return wrap(prefix,`<rect width="480" height="360" fill="${b.PAPER}"/><g data-history-motion="balance">${P.join('')}</g>`);
}
export function composeHistory({prefix,name,frame,n,art,kind,paper,ink,a,b,c,motion}){
 const prop=group(`<g data-history-motion="${motion}">${art}</g>`,'translate(172 84) scale(.56)');
 if(name==='isometric-mono')return isoScene(prefix,frame);
 if(name==='grainy-gouache')return gouache(prefix,frame,art);
 if(name==='ink-sketch')return inkScene(prefix,frame,kind,art);
 if(name==='two-colour-brush')return brush(prefix,frame,art);
 if(name==='flat')return wrap(prefix,`<rect width="480" height="360" fill="white"/>${flatGuide(frame)}${prop.replace(/stroke-width="[\d.]+"/g,'stroke-width="1.1"')}${deco(a,355,74)}${deco(c,81,75)}`);
 if(name==='vintage-emblem'){
  const titles=['COINAGE','METAL','STAMP','REFORM','WEIGH','SEAL','RECORD'];
  const emblem=group(art.replaceAll('stroke="#1f2b25"','stroke="#192923"').replaceAll('fill="#d9a873"',`fill="${V.CREAM}"`).replaceAll('fill="#c8693f"',`fill="${V.INK}"`),'translate(89 2) scale(.63)');
  const cuts=Array.from({length:10},(_,j)=>pl(`M${180+j*12} 230l26 -43`,'none',V.CREAM,1.4)).join('');
  return V.card({prefix,label:'An original emblem about '+kind,word:titles[frame],tag:'TRUST • RECORD • EXCHANGE',keyline:'',emblem:`<g data-history-motion="coin">${emblem}</g>${cuts}`,scale:.93});
 }
 if(name==='one-line'){
  const C=O.makeCard(prefix);const dy=frame%3*4;
  C.patch('shirt',[[109,155],[151,153],[161,223],[100,223]],O.WHITE,2,frame+1);C.patch('pants',[[101,223],[160,223],[175,300],[149,300],[131,247],[116,302],[91,302]],O.PERI,2,frame+2);
  C.line('visitor',[[111,142],[103,157],[101,191],[94,220],[104,225],[96,287],[88,303],[111,309],[121,298],[129,254],[147,287],[152,305],[180,308],[177,298],[164,282],[152,225],[160,220],[156,185],[180,203],[209,172-dy],[215,169-dy],[220,172-dy],[212,180-dy],[183,217],[153,200]]);
  const H=p=>O.place(p,[129,121],-6,1.15);C.line('profile',H([...O.EAR_R,[-4.6,11.8],[0,14.6],...O.FACE_R,[13.5,-10.5],[9,-15],[3,-18.5],[-5,-19],[-13,-15],[-19,-8],[-21,0],[-19,7],[-15,11],[-10,12.5]]));C.line('eye',H(O.EYE_R));C.patch('hair',H([[-20,-6],[-10,-18],[6,-19],[12,-12],[-2,-10],[-10,-2],[-18,8]]),O.PERI,1,8);C.patch('cheek',H([[6,-12],[16,-8],[22,2],[19,13],[9,15]]),O.CORAL,1,5);
  C.line('ground',[[70,316],[90,314],[114,317],[138,314],[158,317],[192,316]]);C.L.line.push(prop);return C.svg(false,'A present-day reader considers an exchange');
 }
 if(name==='bold-pop'){
  const p=P.pop(prefix),D='M96 155Q121 141 146 155L152 223H91Z';let v=p.limb([[105,222],[90,263],[95,304]],[13,10,6],p.VIO,'hatch')+p.sneaker(95,313)+p.limb([[139,222],[160,262],[163,304]],[13,10,6],p.VIO)+p.sneaker(163,313)+p.F(D,p.PINK)+p.F(D,p.url('dots2'))+p.S(D)+p.neck(121,147)+p.head([123,121],{tilt:(frame%3-1)*5,hairFront:p.P('M-20 1Q-27-28 3-29Q28-23 22-3L7-15L-6-5Z',p.YEL)});
  v+=p.arm([143,164],[177,190],[213,169-frame*2],{sleeve:p.PINK})+group(p.openHand(),`translate(213 ${169-frame*2}) rotate(-30)`)+p.arm([100,163],[80,193],[87,224],{sleeve:p.PINK})+group(p.looseFist(),'translate(87 224)');
  v+=prop+p.plus(363,76)+p.stripedRing([75,84],13,6.5)+p.slashes(392,273);return p.card(v,{scale:1,ox:240,oy:180,cy:180,label:'A present-day visitor explores '+kind});
 }
 if(name==='teal-spot'){
  // A small museum display: real oblique thickness, majority-white faces, hard shadows.
  const body=pl('M113 143L290 97L370 151L194 200Z','#ffffff',ink,1.2)+pl('M113 143L194 200V274L113 217Z','#ffffff',ink,1.2)+pl('M194 200L370 151V225L194 274Z','#36c3b0',ink,1.2);
  const shadow=pl('M135 232L210 295L400 242L318 187Z','#0e4a48','#0e4a48',.6);
  const face=group(art,'translate(130 10) scale(.45)');
  const extra=pl('M70 84L131 68L145 98L84 114Z','#ffffff',ink,1.2)+pl('M84 114L145 98V106L84 122Z','#7fd8ca',ink,1.2)+pl('M329 61L370 48L381 75L341 88Z','#ffffff',ink,1.2);
  const spark=(x,y,s)=>pl(`M${x} ${y-s}Q${x+1} ${y-1} ${x+s} ${y}Q${x+1} ${y+1} ${x} ${y+s}Q${x-1} ${y+1} ${x-s} ${y}Q${x-1} ${y-1} ${x} ${y-s}Z`,'#0e4a48','#0e4a48',0);
  return wrap(prefix,`<rect width="480" height="360" fill="#ebebeb"/>${shadow}${body}<g data-history-motion="lift">${face}${extra}</g>${spark(62,148,7)}${spark(77,139,4)}${spark(405,103,5)}`);
 }
 if(name==='line-interior'){
  const h=L.head(139,109,(frame%3-1)*3,{hair:'side',facing:'right',skin:L.SKIN.light,glasses:frame%2===0});
  const room=pl('M50 300H433M62 64H412V300M68 126H405M299 64V126','none',ink,1.3)+pl('M82 281V205H113V281M78 205H118','none',ink,1.2)+pl('M268 242H402V251H268Z','#ab9ee6',ink,1.2)+pl('M280 251V300M389 251V300','none',ink,1.2);
  const body=h.behind+L.torso(139,139,{style:'tee',fill:'#ab9ee6',skin:L.SKIN.light})+pl('M117 205L115 256L104 297H120L137 250L145 209Z','#3a2d66',ink,1.3)+pl('M142 207L154 250L157 297H172L174 246L161 203Z','#3a2d66',ink,1.3)+pl(`M155 153L181 180L210 ${170-frame*2}`,'none','#f9c99a',10)+pl('M123 153L101 181L105 214','none','#f9c99a',9)+h.front+L.sneaker('translate(103 301)','#ffffff')+L.sneaker('translate(156 301)','#ffffff');
  return wrap(prefix,`<rect width="480" height="360" fill="white"/><g stroke="${ink}" stroke-width="1.3" stroke-linejoin="round">${room}${body}${prop}</g>`);
 }
 // Panel, black-flat, outlined and halftone share no imported finished scene: each
 // is a new visitor/prop composition with its own line, face, fill and framing rules.
 const panel=name==='framed-panel',black=name==='flat-with-black',half=name==='halftone-line';
 let defs=half?`<pattern id="${prefix}dots" width="3" height="3" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".65" fill="#111"/></pattern>`:'';
 const shirt=half?`url(#${prefix}dots)`:black?'#111111':a;
 let visitor=pl('M106 226L89 300L110 308L131 254L154 304L177 304L151 223Z',black?'#111111':half?paper:b,ink,half?1.5:2.5)+pl('M104 155Q129 143 153 155L161 227H96Z',shirt,ink,half?1.6:2.5)+pl(`M149 167L180 193L212 ${175-frame*3}`,'none',half?'#111':black?'#111111':a,half?7:14)+pl('M108 167L82 197L91 223','none',half?'#111':black?'#111111':a,half?7:13);
 if(black)visitor+=Q.head({x:132,y:125,hair:frame%2?'bun':'curly',s:1.1,flip:false,id:prefix+'head'});
 else {visitor+=pl('M118 145V156H138V143','#edb0a2',ink,1.6)+pl('M105 105Q108 83 131 84Q159 85 159 112L161 125Q153 150 134 149Q108 143 105 105Z',half?paper:'#edb0a2',ink,2)+pl('M106 113Q94 78 131 78Q163 80 160 105L145 95L130 103L118 93L112 116Z',ink,ink,1.4)+pl('M144 124Q151 129 155 121','none',ink,1.3)+`<circle cx="134" cy="112" r="${half?1.5:3}" fill="${ink}"/><circle cx="153" cy="112" r="${half?1.5:2.5}" fill="${ink}"/>`;}
 visitor+=pl('M84 306H113V312H80ZM151 305H179V312H151Z',black?'white':paper,ink,1.8);
 const bg=panel?pl('M110 46H372V312H110Z','#d7cff3',ink,1.3)+pl('M110 258H372V312H110Z','#b9acd9',ink,1.3):'';
 const cluster=group(visitor+prop,panel?'translate(10 13) scale(.94)':'translate(0 0)');
 return wrap(prefix,`<rect width="480" height="360" fill="${panel?'#f7d8b5':half?'#f4f1ea':'white'}"/>${bg}${cluster}${deco(ink,365,72)}${panel?'':pl('M64 316H410','none',ink,half?1.2:1.6)}`,defs);
}

