import fs from 'node:fs';
import {Resvg} from '@resvg/resvg-js';
import {masterclassThumbnailSpecs} from '../src/data/masterclassHub';
fs.mkdirSync('public/images/masterclass-journal',{recursive:true});
for(const [number,spec] of Object.entries(masterclassThumbnailSpecs)){
 const svg=fs.readFileSync(`public/images/masterclass/${spec.file}.svg`,'utf8');
 const png=new Resvg(svg,{fitTo:{mode:'width',value:1200},font:{fontFiles:['scripts/assets/social-fonts/source-sans-3.ttf'],loadSystemFonts:false,defaultFontFamily:'Source Sans 3'}}).render().asPng();
 fs.writeFileSync(`public/images/masterclass-journal/catalogue-${number.padStart(2,'0')}.png`,png);
}
console.log('Generated 29 topic-specific social images from the existing hub artwork.');
