import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve(process.argv.includes('--dist')?'dist':'.');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.woff2':'font/woff2','.png':'image/png'};
const server=http.createServer(async(req,res)=>{try{const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=resolve(root,'.'+pathname);if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}try{if((await stat(file)).isDirectory())file=resolve(file,'index.html');}catch{file=resolve(root,'index.html');}res.writeHead(200,{'Content-Type':mime[extname(file)]??'application/octet-stream','Cache-Control':'no-cache'});res.end(await readFile(file));}catch{res.writeHead(404);res.end('Not found');}});
const port=Number(process.env.ARC_PORT||5187);
server.listen(port,'127.0.0.1',()=>console.log(`ARC preview: http://127.0.0.1:${port}`));
