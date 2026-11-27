import { mkdir, cp, readFile, writeFile, readdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
await cp('src', 'dist/src', { recursive: true });
const styleHash = createHash('sha256').update(await readFile('src/styles.css')).digest('hex').slice(0,12);
// Version the complete module graph, including data imports. A returning browser
// must not mix new HTML with an old cached catalog or contact configuration.
const modules=(await readdir('src',{recursive:true})).filter(p=>p.endsWith('.js')).sort();
const moduleHash=createHash('sha256');
for(const p of modules)moduleHash.update(p).update(await readFile(`src/${p}`));
const version=moduleHash.digest('hex').slice(0,12);
for(const p of modules){
 const source=await readFile(`src/${p}`,'utf8');
 await writeFile(`dist/src/${p}`,source.replace(/from\s+(['"])(\.[^'"]+\.js)\1/g,(_,q,url)=>`from ${q}${url}?v=${version}${q}`));
}
const html = (await readFile('index.html','utf8')).replace('./src/styles.css', `./src/styles.css?v=${styleHash}`).replace('./src/app.js',`./src/app.js?v=${version}`);
await writeFile('dist/index.html', html);
console.log('Sitio estático construido en dist/');
