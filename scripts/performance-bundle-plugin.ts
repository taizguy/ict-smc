import fs from 'node:fs';
import type {Plugin} from 'vite';
/** Local build evidence only; does not inject runtime code or change chunking. */
export function performanceBundlePlugin():Plugin{
 return {name:'practice-bundle-evidence',generateBundle(_,bundle){
  const chunkValues=Object.values(bundle).filter(v=>v.type==='chunk');
  const chunks=chunkValues.map(c=>({file:c.fileName,entry:c.isEntry,imports:c.imports,dynamicImports:c.dynamicImports,bytes:Buffer.byteLength(c.code),modules:Object.entries(c.modules).map(([id,m])=>({id,renderedLength:m.renderedLength,importers:this.getModuleInfo(id)?.importers||[],dynamicImporters:this.getModuleInfo(id)?.dynamicImporters||[]}))}));
  const routeCss=chunkValues.map(c=>({file:c.fileName,entry:c.isEntry,imports:c.imports,css:[...(c.viteMetadata?.importedCss||[])],modules:Object.keys(c.modules)}));
  for(const phase of new Set(['latest',process.env.PERF_ANALYZE||'latest'])){
   const dir='outputs/practice-performance/'+phase;
   fs.mkdirSync(dir,{recursive:true});
   fs.writeFileSync(dir+'/bundle.json',JSON.stringify(chunks,null,2));
   fs.writeFileSync(dir+'/route-css.json',JSON.stringify(routeCss,null,2));
  }
 }};
}
