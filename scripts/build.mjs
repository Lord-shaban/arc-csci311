import {cp,mkdir,readFile,writeFile} from 'node:fs/promises';
await mkdir('dist',{recursive:true});
await cp('src','dist/src',{recursive:true});
await cp('public','dist',{recursive:true});
await writeFile('dist/index.html',await readFile('index.html'));
console.log('Built static site in dist/');
