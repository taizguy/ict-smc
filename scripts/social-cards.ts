import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { Resvg } from '@resvg/resvg-js';
import { parse } from 'parse5';
import { textbookChapters } from '../src/data/chaptersData';
import { chapterDiagrams, type DiagramMark } from '../src/data/chapters/diagrams';
import { withoutLocale } from '../src/i18n/locale';
import {masterclassJournalForPath} from '../src/utils/masterclassJournalRoutes';

const escape = (value: unknown) => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
const tones = { ink:'#192c47', teal:'#128066', coral:'#ce5347', violet:'#7356b4' };
function mark(m: DiagramMark): string {
  const color = tones[m.tone || 'ink'];
  const common = `stroke="${color}" stroke-width="3" stroke-linecap="round" ${m.dashed ? 'stroke-dasharray="6 7"' : ''}`;
  switch (m.kind) {
    case 'line': return `<line x1="${m.x}" y1="${m.y}" x2="${m.x2}" y2="${m.y2}" ${common}/>`;
    case 'path': return `<path d="${escape(m.d)}" fill="none" ${common}/>`;
    case 'zone': return `<rect x="${m.x}" y="${m.y}" width="${m.w}" height="${m.h}" rx="5" fill="${color}" fill-opacity=".12" ${common}/>`;
    case 'dot': return `<circle cx="${m.x}" cy="${m.y}" r="5" fill="${color}"/>`;
    case 'label': return `<text x="${m.x}" y="${m.y}" font-size="15" text-anchor="middle" fill="${color}">${escape(m.text)}</text>`;
    case 'candle': return `<line x1="${m.x}" x2="${m.x}" y1="${m.high}" y2="${m.low}" ${common}/><rect x="${m.x!-9}" y="${Math.min(m.open!,m.close!)}" width="18" height="${Math.max(2,Math.abs(m.close!-m.open!))}" rx="2" fill="${color}"/>`;
  }
}
function wrap(title: string, max: number): string[] {
  const lines: string[] = [];
  let line = '';
  for (const word of title.split(/\s+/)) {
    if (line && [...`${line} ${word}`].length > max) { lines.push(line); line = word; }
    else line += `${line ? ' ' : ''}${word}`;
  }
  if (line) lines.push(line);
  if (lines.length > 5) { lines.length = 5; lines[4] = lines[4].replace(/[,:;–—-]+$/,'') + '…'; }
  return lines;
}

/** Generate real raster share cards at build time, never in a visitor's browser. */
export function generateSocialCards(dist: string) {
  const manifest = JSON.parse(fs.readFileSync(path.join(dist,'seo-manifest.json'),'utf8')) as Array<{path:string;outputPath:string;indexable:boolean}>;
  const fontFiles = ['source-sans-3.ttf','source-sans-3-semibold.ttf','noto-naskh-arabic.ttf'].map(file=>path.resolve('scripts/assets/social-fonts',file));
  const fontDigest = createHash('sha256');
  fontFiles.forEach(file=>fontDigest.update(fs.readFileSync(file)));
  const fontVersion = fontDigest.digest('hex');
  const out = path.join(dist,'images/social');
  fs.mkdirSync(out,{recursive:true});
  let count = 0;
  for (const page of manifest.filter(p=>p.indexable)) {
    const file = path.join(dist,page.outputPath);
    const source = fs.readFileSync(file,'utf8');
    const document = parse(source) as any;
    const nodes: any[] = [];
    const visit = (node:any) => { nodes.push(node); (node.childNodes || []).forEach(visit); };
    visit(document);
    const attr = (node:any,key:string) => node.attrs?.find((a:any)=>a.name===key)?.value;
    const meta = (key:string) => nodes.find(n=>n.tagName==='meta'&&(attr(n,'property')===key||attr(n,'name')===key));
    const title = (attr(meta('og:title'),'content') || 'LearnSMC').replace(/\s*\|\s*LearnSMC\s*$/,'');
    const urdu = page.path.startsWith('/ur/');
    const englishPath = withoutLocale(page.path);
    const chapter = textbookChapters.find(c=>englishPath===`/learn/${c.slug}/`);
    const spec = chapter && chapterDiagrams[chapter.id];
    const label = chapter ? `CHAPTER ${String(chapter.id).padStart(2,'0')}` : englishPath.startsWith('/articles/') ? 'ARTICLES' : englishPath.startsWith('/tools/') ? 'WORKBENCH & LAB' : 'ICT & SMART MONEY CONCEPTS';
    const lines = wrap(title, urdu ? 33 : 29);
    const text = lines.map((line,i)=>`<text x="${urdu?700:60}" y="${205+i*61}" ${urdu?'direction="rtl" text-anchor="end"':''} font-size="${urdu?46:50}" font-weight="600" fill="#192c47">${escape(line)}</text>`).join('');
    let art = spec ? spec.marks.map(mark).join('') : `<path d="M35 145 H105 V85 H180 V120 H255 V50 H350" stroke="#2453ef" stroke-width="5" fill="none"/><circle cx="350" cy="50" r="9" fill="#ce5347"/><path d="M35 185 H350" stroke="#d6ddee" stroke-width="2"/>`;
    if(englishPath==='/tools/masterclass/')art='<rect x="20" y="14" width="150" height="108" rx="4" fill="#e3eaf4"/><rect x="191" y="14" width="150" height="108" rx="4" fill="#efe2d3"/><rect x="20" y="144" width="321" height="83" rx="4" fill="#e5ebdc"/><g fill="none" stroke="#315f7c" stroke-width="3"><path d="M35 99L58 92L81 107L103 53L128 70L154 37"/><path d="M207 90H326M207 50H326M251 35V105M291 40V105"/><path d="M42 193L91 178L140 205L189 161L238 182L313 157"/></g><g fill="#344c52" font-size="16"><text x="35" y="42">FVG studies</text><text x="207" y="111">Range references</text><text x="42" y="251">ICT masterclass collection</text></g>';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#fff"/><rect x="0" y="0" width="1200" height="10" fill="#2453ef"/><g font-family="Source Sans 3, Noto Naskh Arabic"><text x="60" y="75" font-size="36" font-weight="600" fill="#192c47">LearnSMC<tspan fill="#ce5347">.</tspan></text><text x="60" y="127" font-size="21" letter-spacing="2" fill="#2453ef">${escape(label)}</text>${text}<rect x="750" y="160" width="390" height="320" rx="24" fill="#f1f4ff"/><g transform="translate(765 205) scale(.9)">${art}</g><text x="945" y="453" text-anchor="middle" font-size="18" fill="#56647c">${chapter?'Concept illustration · not a signal':'Learn · explore · practice'}</text><path d="M60 544 H1140" stroke="#d6ddee"/><text x="60" y="585" font-size="23" fill="#56647c">${escape(('learnsmc.xyz'+page.path).length>95?('learnsmc.xyz'+page.path).slice(0,92)+'…':'learnsmc.xyz'+page.path)}</text><text x="1140" y="76" text-anchor="end" font-size="23" fill="#56647c">${urdu?'اردو':'ENGLISH'}</text></g></svg>`;
    const hash = createHash('sha256').update(page.path+'\n'+fontVersion+'\n'+svg).digest('hex').slice(0,20);
    const name = `${chapter?'lesson-'+chapter.id:'page'}-${urdu?'ur':'en'}-${hash}.png`;
    fs.writeFileSync(path.join(out,name),new Resvg(svg,{font:{fontFiles,loadSystemFonts:false,defaultFontFamily:'Source Sans 3'}}).render().asPng());
    const journal=masterclassJournalForPath(page.path);
    const image = journal ? `https://learnsmc.xyz${journal.socialImage}` : `https://learnsmc.xyz/images/social/${name}`;
    const alt = `LearnSMC — ${title}`;
    const tags = new Map<string,string>();
    for (const [attribute,key,value] of [
      ['property','og:site_name','LearnSMC'],['property','og:image',image],['property','og:image:alt',alt],
      ['property','og:image:width','1200'],['property','og:image:height','630'],['property','og:image:type','image/png'],
      ['name','twitter:image',image],['name','twitter:image:alt',alt],
    ]) {
      tags.set(key,`<meta ${attribute}="${key}" content="${escape(value)}" />`);
    }
    // Preserve the surrounding document, including existing canonical/language
    // tags and script contents. Only social meta elements are replaced.
    let updated = source.replace(/<meta\b[^>]*>/gi,tag=>{
      const key = tag.match(/\b(?:property|name)="([^"]+)"/)?.[1];
      if (!key || !tags.has(key)) return tag;
      const replacement = tags.get(key)!;
      tags.delete(key);
      return replacement;
    });
    updated = updated.replace('</head>',[...tags.values()].join('')+'</head>');
    fs.writeFileSync(file,updated);
    count++;
  }
  console.log(`Social cards generated: ${count} unique localized 1200×630 PNGs with OG and Twitter alternative text.`);
}
