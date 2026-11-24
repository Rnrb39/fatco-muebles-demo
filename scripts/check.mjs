import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { products } from '../src/data/catalog.js';
import { projects } from '../src/data/gallery.js';
import { testimonials } from '../src/data/testimonials.js';
import { business } from '../src/data/config.js';
import { whatsappUrl, quoteMessage } from '../src/services/contact.js';
const html=await readFile('dist/index.html','utf8');
assert.match(html,/noindex, nofollow, noarchive/);
assert.match(await readFile('dist/robots.txt','utf8'),/Disallow: \//);
assert.equal(new Set(products.map(p=>p.id)).size,products.length);
for(const p of products){assert(p.illustrative);assert.equal(p.price,null);for(const image of p.images) await access(`dist/assets/${image}`);}
for(const p of projects){await access(`dist/assets/${p.image}`);assert.match(p.source,/^https:\/\/www.instagram.com\/fatcomuebles\//);}
for(const t of testimonials){assert(t.consent?.approved&&t.consent.evidenceRef&&t.sourceUrl);}
const url=new URL(whatsappUrl('Prueba: ñ & + 50%'));
assert.equal(url.pathname,`/${business.whatsapp}`);assert.equal(url.searchParams.get('text'),'Prueba: ñ & + 50%');
assert.match(quoteMessage({name:'Prueba',email:'demo@example.com',city:'Quillota',type:'Mueble a medida',message:'Consulta de demostración'}),/Comuna: Quillota/);
for(const [,path] of html.matchAll(/(?:src|href)="\.\/([^"#?]+)"/g))await access(`dist/${path}`);
console.log('OK: archivos enlazados, datos de catálogo/galería, testimonios, robots y codificación WhatsApp.');
