import fs from 'node:fs';
import path from 'node:path';
import {createServer} from 'node:http';
// Reuse the audit's script-free fixture method, against production documents.
// Nothing here changes the real document, host policy or published routing.
const root=path.resolve('dist');
createServer((req,res)=>{
 const url=new URL(req.url!,'http://127.0.0.1:4246'),name=decodeURIComponent(url.pathname);
 const file=path.resolve(root,'.'+name+(name.endsWith('/')?'index.html':''));
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end('Fixture not found');return;}
 const html=file.endsWith('.html');
 res.setHeader('Content-Type',html?'text/html; charset=utf-8':file.endsWith('.css')?'text/css':file.endsWith('.svg')?'image/svg+xml':file.endsWith('.png')?'image/png':file.endsWith('.woff2')?'font/woff2':file.endsWith('.csv')?'text/csv':'application/octet-stream');
 res.setHeader('Cache-Control','no-store');res.setHeader('Content-Security-Policy',"script-src 'none'");
 res.end(html?fs.readFileSync(file,'utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,''):fs.readFileSync(file));
}).listen(4246,'127.0.0.1',()=>console.log('Script-free production fixtures: http://127.0.0.1:4246/tools/chartlab/'));
