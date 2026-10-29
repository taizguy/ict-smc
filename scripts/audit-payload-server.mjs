// Local production-only request recorder. No code is injected into the application.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve('dist'),output='outputs/audit-batch-4';
fs.mkdirSync(output,{recursive:true});
const measurements={}; let active;
const mime={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png','.webp':'image/webp','.xml':'application/xml'};
http.createServer((req,res)=>{
 const url=new URL(req.url,'http://127.0.0.1');
 if(url.pathname==='/__audit_failed__.js'){res.writeHead(503,{'Content-Type':'application/javascript'});res.end('/* intentional failure fixture */');return;}
 if(url.pathname==='/__audit/start') {active=url.searchParams.get('name');measurements[active]={path:url.searchParams.get('path'),requests:[]};res.end('ready');return;}
 if(url.pathname==='/__audit/results') {res.setHeader('Content-Type','application/json');res.end(JSON.stringify(measurements));return;}
 let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);res.end();return;}
 const bytes=fs.statSync(file).size;
 if(active&&file.endsWith('.js')) {
   measurements[active].requests.push({url:url.pathname,bytes,referer:req.headers.referer||''});
   fs.writeFileSync(path.join(output,'payload-http.json'),JSON.stringify(measurements,null,2));
 }
 res.setHeader('Cache-Control','no-store');
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');
 if(file.endsWith('.html')&&url.searchParams.has('audit-js')) {
   let html=fs.readFileSync(file,'utf8');const mode=url.searchParams.get('audit-js');
   if(mode==='off')html=html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'');
   if(mode==='failed')html=html.replace(/(<script\b[^>]*type="module"[^>]*src=")[^"]+/, '$1/__audit_failed__.js');
   if(mode==='slow')html=html.replace(/<script\b[^>]*type="module"[^>]*src="([^"]+)"[^>]*><\/script>/,(_all,src)=>`<script>setTimeout(function(){var s=document.createElement('script');s.type='module';s.src=${JSON.stringify(src)};document.head.appendChild(s)},3500)</script>`);
   res.end(html);return;
 }
 fs.createReadStream(file).pipe(res);
}).listen(Number(process.env.AUDIT_PORT||4218),'127.0.0.1',()=>console.log('Production recorder/reading preview on port '+(process.env.AUDIT_PORT||4218)));
