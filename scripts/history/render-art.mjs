import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
// Authoring-only renderer. Uses an existing Sharp install; no runtime dependency.
const runtimeModules=process.env.CODEX_NODE_MODULES;
const require=createRequire(runtimeModules?path.join(runtimeModules,'package.json'):import.meta.url);
const sharp=require('sharp');
const manifest=JSON.parse(fs.readFileSync('docs/history/illustration-manifest.json','utf8'));
fs.mkdirSync('outputs/history',{recursive:true});
const sheets=[];
for(let n=1;n<=20;n++){
 const frames=manifest.filter(x=>x.article===n);
 const layers=[];
 for(const item of frames){
  const png=await sharp('public'+item.path).resize(480,360).png().toBuffer();
  layers.push({input:png,left:(item.frame%4)*480,top:Math.floor(item.frame/4)*360});
  if(item.frame===0){
   await sharp('public'+item.path).resize(840,630).extend({left:180,right:180,top:0,bottom:0,background:'#fff'}).png().toFile(('public'+item.path).replace('.svg','-social.png'));
   sheets.push({input:await sharp(png).resize(240,180).toBuffer(),left:((n-1)%5)*240,top:Math.floor((n-1)/5)*180});
  }
 }
 await sharp({create:{width:1920,height:720,channels:4,background:'#e3e3e3'}}).composite(layers).png().toFile(`outputs/history/article-${n}-sheet.png`);
}
await sharp({create:{width:1200,height:720,channels:4,background:'#fff'}}).composite(sheets).png().toFile('outputs/history/covers.png');
console.log('Rendered 20 social previews and 20 seven-scene review sheets.');
