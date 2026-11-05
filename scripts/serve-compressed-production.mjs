import {createServer} from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import {brotliCompressSync,gzipSync,constants} from 'node:zlib';
const root=path.resolve(process.env.PERF_DIST||'dist'),cache=new Map(),port=Number(process.env.PERF_PORT||4247),requestLog=process.env.PERF_REQUEST_LOG;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.woff2':'font/woff2','.txt':'text/plain; charset=utf-8','.csv':'text/csv; charset=utf-8'};
createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname),file=path.resolve(root,'.'+pathname+(pathname.endsWith('/')?'index.html':''));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end('Not found');return;}
 const stat=fs.statSync(file),key=file+stat.mtimeMs;let data=cache.get(key);
 if(!data){const raw=fs.readFileSync(file),compress=/\.(?:html|js|css|json|txt|svg|xml)$/.test(file);data={raw,gzip:compress?gzipSync(raw):null,br:compress?brotliCompressSync(raw,{params:{[constants.BROTLI_PARAM_QUALITY]:5}}):null};cache.set(key,data);}
 const accepted=req.headers['accept-encoding']||'',encoding=data.br&&/\bbr\b/.test(accepted)?'br':data.gzip&&/\bgzip\b/.test(accepted)?'gzip':null,body=encoding?data[encoding]:data.raw;
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('Vary','Accept-Encoding');res.setHeader('Cache-Control',pathname.startsWith('/assets/')?'public, max-age=31536000, immutable':'no-cache');res.setHeader('Content-Length',body.length);if(encoding)res.setHeader('Content-Encoding',encoding);if(requestLog&&pathname.endsWith('.js'))fs.appendFileSync(requestLog,JSON.stringify({time:Date.now(),path:pathname,referer:req.headers.referer||null,encoding,raw:data.raw.length,transferred:body.length})+'\n');res.end(req.method==='HEAD'?undefined:body);
}).listen(port,'127.0.0.1',()=>console.log('Compressed production preview: http://127.0.0.1:'+port));
