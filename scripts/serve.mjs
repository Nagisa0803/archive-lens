import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const publicRoot=fileURLToPath(new URL('../public/',import.meta.url));
const port=Number(process.env.PORT||8793);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{try{if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end('Read-only static preview');return}const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=path.resolve(publicRoot,'.'+pathname);if(file!==path.resolve(publicRoot)&&!file.startsWith(path.resolve(publicRoot)+path.sep)){res.writeHead(403);res.end();return}if((await stat(file)).isDirectory())file=path.join(file,'index.html');const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Content-Type-Options':'nosniff','X-Frame-Options':'DENY','Content-Security-Policy':"default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' blob: data:; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'; worker-src 'self' blob:"});res.end(req.method==='HEAD'?undefined:bytes)}catch{res.writeHead(404,{'Content-Type':'text/plain; charset=utf-8'});res.end('Not found')}});
server.listen(port,'127.0.0.1',()=>console.log(`Local viewer: http://127.0.0.1:${port}/ | Guide: http://127.0.0.1:${port}/guide/`));
