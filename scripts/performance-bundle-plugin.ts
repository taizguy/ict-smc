import fs from 'node:fs';
import type {Plugin} from 'vite';
/** Local build evidence only; does not inject runtime code or change chunking. */
export function performanceBundlePlugin():Plugin{
 return {name:'practice-bundle-evidence',generateBundle(_,bundle){
  const chunks=Object.values(bundle).filter(v=>v.type==='chunk').map(c=>({file:c.fileName,entry:c.isEntry,imports:c.imports,dynamicImports:c.dynamicImports,bytes:Buffer.byteLength(c.code),modules:Object.entries(c.modules).map(([id,m])=>({id,renderedLength:m.renderedLength,importers:this.getModuleInfo(id)?.importers||[],dynamicImporters:this.getModuleInfo(id)?.dynamicImporters||[]}))}));
  for(const phase of new Set(['latest',process.env.PERF_ANALYZE||'latest'])){const dir='outputs/practice-performance/'+phase;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(dir+'/bundle.json',JSON.stringify(chunks,null,2));}
 }};
}
