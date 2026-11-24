import { mkdir, cp, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
await cp('src', 'dist/src', { recursive: true });
const styleHash = createHash('sha256').update(await readFile('src/styles.css')).digest('hex').slice(0,12);
const html = (await readFile('index.html','utf8')).replace('./src/styles.css', `./src/styles.css?v=${styleHash}`);
await writeFile('dist/index.html', html);
console.log('Sitio estático construido en dist/');
