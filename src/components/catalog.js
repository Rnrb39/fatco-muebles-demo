import { products, categories } from '../data/catalog.js?v=d39c15d9b3ee';
export const escapeHtml = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function initCatalog(openProduct) {
  const filters = document.querySelector('#category-filters');
  const grid = document.querySelector('#product-grid');
  const search = document.querySelector('#catalog-search');
  let active = 'todos';
  filters.innerHTML = categories.map(c => `<button type="button" class="filter ${c.id === active ? 'active' : ''}" data-category="${c.id}" aria-pressed="${c.id === active}">${c.label}</button>`).join('');
  const draw = () => {
    const query = search.value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().trim();
    const selected = products.filter(p => (active === 'todos' || p.category === active) && `${p.name} ${p.description}`.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().includes(query));
    document.querySelector('#result-count').textContent = `${selected.length} ${selected.length === 1 ? 'alternativa' : 'alternativas'}`;
    grid.innerHTML = selected.length ? selected.map(p => `<article class="product-card"><button class="product-photo" data-product="${p.id}" aria-label="Ver detalles de ${escapeHtml(p.name)}"><img src="./assets/${p.image}" alt="${escapeHtml(p.alt)}" loading="lazy" width="600" height="650"><span class="photo-label">FATCO</span><span class="quick-view">Ver detalle <span aria-hidden="true">＋</span></span></button><div class="product-meta"><span>${categories.find(c=>c.id===p.category).label}</span><span>Material de FATCO</span></div><h3><button data-product="${p.id}">${p.name}</button></h3><div class="product-bottom"><span>${p.price == null ? 'Valor a consultar' : new Intl.NumberFormat('es-CL',{style:'currency',currency:p.currency}).format(p.price)}</span><button class="text-link" data-inquire="${p.id}">Consultar</button></div></article>`).join('') : '<div class="empty-state"><h3>No encontramos esa combinación.</h3><p>Prueba otra búsqueda o vuelve a todos los muebles.</p><button class="button secondary" id="reset-search">Restablecer filtros</button></div>';
  };
  filters.addEventListener('click', e => { const button = e.target.closest('[data-category]'); if (!button) return; active = button.dataset.category; filters.querySelectorAll('button').forEach(b => { b.classList.toggle('active', b === button); b.setAttribute('aria-pressed', String(b === button)); }); draw(); });
  search.addEventListener('input', draw);
  grid.addEventListener('click', e => {
    if (e.target.closest('#reset-search')) { search.value=''; filters.querySelector('[data-category="todos"]').click(); return; }
    const b=e.target.closest('[data-product], [data-inquire]'); if(b) openProduct(products.find(p=>p.id===(b.dataset.product||b.dataset.inquire)), Boolean(b.dataset.inquire));
  });
  draw();
}
