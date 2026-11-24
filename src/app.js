import { business } from './data/config.js';
import { projects } from './data/gallery.js';
import { testimonials } from './data/testimonials.js';
import { whatsappUrl, quoteMessage } from './services/contact.js';
import { initCatalog, escapeHtml as esc } from './components/catalog.js';

const dialog = document.querySelector('#detail-dialog');
const dialogContent = document.querySelector('#dialog-content');
let lastFocus;
function showDialog(html, label) { lastFocus=document.activeElement; dialogContent.innerHTML=html; dialog.setAttribute('aria-label',label); dialog.showModal(); document.body.classList.add('modal-open'); }
dialog.addEventListener('close',()=>{ document.body.classList.remove('modal-open'); lastFocus?.focus(); });
document.querySelector('#close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
document.querySelectorAll('[data-instagram]').forEach(a=>{ a.href=business.instagram; });
document.querySelectorAll('[data-whatsapp]').forEach(a=>{ const url=whatsappUrl(); if(url)a.href=url; else {a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.title='Contacto pendiente de confirmar';} });
document.querySelector('[data-phone]').textContent=business.phoneDisplay;
document.querySelectorAll('[data-coverage]').forEach(e=>e.textContent=business.coverage);

const menu=document.querySelector('#menu-toggle'), nav=document.querySelector('#main-nav');
function closeMenu(){menu.setAttribute('aria-expanded','false');nav.classList.remove('open');}
menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
nav.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});

initCatalog((p, inquire)=>{
  const link=whatsappUrl(`Hola, FATCO. Vi la propuesta ilustrativa «${p.name}» (${p.id}) en el prototipo. Quisiera consultar si cuentan con una alternativa similar y conocer medidas, materiales y valor.`);
  showDialog(`<div class="product-detail"><img src="./assets/${p.image}" alt="Fotografía referencial de ${esc(p.name)}"><div><p class="eyebrow">Catálogo de demostración</p><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p><dl><div><dt>Dimensiones</dt><dd>${p.dimensions ? esc(p.dimensions) : 'Por confirmar con FATCO'}</dd></div><div><dt>Materiales</dt><dd>${p.materials ? esc(p.materials) : 'Por confirmar con FATCO'}</dd></div><div><dt>Precio</dt><dd>${p.price == null ? 'Consultar con FATCO' : esc(new Intl.NumberFormat('es-CL',{style:'currency',currency:p.currency}).format(p.price))}</dd></div></dl><p class="small">Fotografía referencial. Esta propuesta no acredita stock ni fabricación de este modelo por FATCO.</p>${link?`<a class="button primary" href="${link}" target="_blank" rel="noopener noreferrer">Consultar este mueble por WhatsApp</a>`:'<p>Contacto pendiente de confirmar.</p>'}<button class="text-link quote-this" data-name="${esc(p.name)}">Incluir en mi cotización</button></div></div>`,p.name);
  dialogContent.querySelector('.quote-this').addEventListener('click',()=>{dialog.close(); document.querySelector('#quote-type').value='Mueble estándar'; document.querySelector('#quote-message').value=`Me interesa una alternativa similar a la propuesta «${p.name}». `; document.querySelector('#cotizar').scrollIntoView({behavior:'smooth'}); document.querySelector('#quote-name').focus({preventScroll:true});});
});

document.querySelector('#gallery-grid').innerHTML=projects.map((p,i)=>`<article class="project-card ${i===0?'featured':''}"><button class="project-image" data-gallery="${p.id}" aria-label="Ampliar ${esc(p.title)}"><img src="./assets/${p.image}" alt="${esc(p.alt)}" loading="lazy" width="640" height="640"><span class="gallery-plus" aria-hidden="true">＋</span></button><div class="project-caption"><div><span class="eyebrow">${p.type}</span><h3>${p.title}</h3></div><a class="icon-link" href="${p.source}" target="_blank" rel="noopener noreferrer" aria-label="${p.format}: ${p.title}">↗</a></div></article>`).join('');
document.querySelector('#gallery-grid').addEventListener('click',e=>{const b=e.target.closest('[data-gallery]');if(!b)return;const p=projects.find(x=>x.id===b.dataset.gallery);showDialog(`<figure class="lightbox"><img src="./assets/${p.image}" alt="${esc(p.alt)}"><figcaption><h2>${p.title}</h2><p>Imagen publicada por @fatcomuebles. El título es descriptivo para este prototipo.</p><a class="text-link" href="${p.source}" target="_blank" rel="noopener noreferrer">${p.format}</a></figcaption></figure>`,p.title);});

const approved=testimonials.filter(t=>t.consent?.approved===true&&t.consent.evidenceRef&&t.sourceUrl?.startsWith('https://www.instagram.com/'));
if(approved.length) document.querySelector('#testimonials-content').innerHTML=approved.map(t=>`<blockquote><p>“${esc(t.quote)}”</p><footer>${esc(t.authorDisplay)} · <a href="${esc(t.sourceUrl)}" target="_blank" rel="noopener noreferrer">Ver comentario original</a></footer></blockquote>`).join('');

const form=document.querySelector('#quote-form');
form.addEventListener('submit',e=>{
  e.preventDefault(); if(!form.reportValidity())return;
  const data=Object.fromEntries(new FormData(form));
  for(const key of ['name','email','city','message'])data[key]=data[key].trim();
  const status=document.querySelector('#form-status');
  if(data.name.length<2||data.city.length<2||data.message.length<15){status.textContent='Revisa tu nombre, comuna y descripción. La descripción necesita al menos 15 caracteres.';return;}
  const dims=['width','height','depth'].map(k=>data[k]);
  if(dims.some(Boolean)&&!dims.every(Boolean)){status.textContent='Completa las tres medidas o déjalas todas vacías si aún no las conoces.';document.querySelector('#quote-width').focus();return;}
  status.textContent=''; const message=quoteMessage(data); const url=whatsappUrl(message);
  showDialog(`<div class="quote-review"><p class="eyebrow">Tu idea, lista para conversar</p><h2>Revisa tu consulta.</h2><p>Aún no se ha enviado. Al continuar, se abrirá WhatsApp con este texto; tú decides cuándo enviarlo.</p><label for="quote-summary">Resumen de tu solicitud</label><textarea id="quote-summary" readonly rows="12">${esc(message)}</textarea><div class="review-actions">${url?`<a class="button primary" href="${url}" target="_blank" rel="noopener noreferrer">Continuar en WhatsApp</a>`:'<p>WhatsApp pendiente de configurar.</p>'}<button class="button secondary" id="copy-quote">Copiar consulta</button></div><p id="copy-status" role="status"></p><p class="small">Los datos de este formulario no se guardan en el sitio. Puedes cerrar esta ventana para seguir editando.</p></div>`,'Revisar consulta');
  document.querySelector('#copy-quote').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(message);document.querySelector('#copy-status').textContent='Consulta copiada.';}catch{document.querySelector('#quote-summary').select();document.querySelector('#copy-status').textContent='Seleccionamos el texto. Puedes copiarlo manualmente.';}});
});

const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}});},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(e=>observer.observe(e));
