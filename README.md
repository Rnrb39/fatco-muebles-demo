# FATCO Muebles — prototipo

Proyecto independiente en `C:\xampp\htdocs\proyecto-fatco`. Sitio estático modular, sin dependencias de ejecución, rastreadores ni servicios de pago. Node.js 20 o superior para las herramientas locales. No necesita PHP ni modificar otras webs de XAMPP.

## Uso local

```powershell
npm run build
npm run check
npm run dev
```

Abrir http://127.0.0.1:4173. El servidor sirve `dist/`. Después de editar, reconstruir y recargar el navegador. No abrir index.html directamente desde el explorador: los módulos ES requieren HTTP.

## Estructura

- `index.html`: estructura semántica de las secciones.
- `src/styles.css`: identidad, estados, animaciones y diseño adaptable.
- `src/app.js`: navegación, galería, modales y formulario.
- `src/components/catalog.js`: tarjetas, búsqueda y filtros.
- `src/data/config.js`: configuración comercial y único número de WhatsApp usado por los enlaces.
- `src/data/catalog.js`: productos, categorías, fotos, descripción, dimensiones, materiales y precio opcional.
- `src/data/gallery.js`: trabajos con enlaces a publicaciones originales.
- `src/data/testimonials.js`: comentarios autorizados; vacío de forma deliberada.
- `src/services/contact.js`: construcción de mensajes y URL de WhatsApp.
- `public/assets/`: imágenes locales y favicon.
- `public/fuentes.html`: procedencia, privacidad y límites de la demostración.
- `scripts/`: construcción, comprobación, servidor y publicación.
- `docs/ARQUITECTURA.md`: evolución sin reconstruir la interfaz.

## Alcance funcional

Inicio, muebles a medida, catálogo ilustrativo de seis propuestas, filtros por ambiente, búsqueda combinada sin distinción de tildes, estado vacío y restablecimiento, fichas con consulta individual, galería ampliable, proceso propuesto, presentación, espacio de testimonios, cotización validada con resumen editable mediante regreso al formulario, copia de consulta, enlaces a Instagram y botón flotante de WhatsApp. Navegación móvil, enfoque visible, cierre de modales por Escape, reducción de movimiento y carga diferida de imágenes.

No hay envío de formulario a un backend. El usuario revisa el mensaje y decide continuar y enviarlo desde WhatsApp. No se almacenan datos en localStorage, cookies ni base de datos.

## Datos comerciales

El teléfono se leyó el 24/11/2026 en la biografía pública de @fatcomuebles: `+56 990 59 9959`, normalizado como `56990599959`. Se centraliza en `src/data/config.js`; confirmar vigencia con el propietario. La misma fuente indica La Cruz, Quillota, La Calera y la quinta región.

No se han inventado precios, stock, materiales, dimensiones, antigüedad, garantías, infraestructura del taller ni testimonios. Los modelos del catálogo son propuestas ilustrativas. Sus campos técnicos están preparados y se muestran pendientes de confirmar. Las imágenes de Instagram son portadas públicas; la reproducción completa de los reels y los comentarios requiere sesión de Instagram y no fue verificada.

Antes de lanzamiento comercial: confirmar catálogo y precios, fichas técnicas, derechos de las imágenes, fotografías definitivas, identidad gráfica, datos de empresa, cobertura, despacho, instalación, plazos, garantías y condiciones. Incorporar testimonios únicamente con comentario original, fuente y evidencia de autorización.

## Publicación gratuita

Destino: GitHub Pages, repositorio independiente `fatco-muebles-demo`. El script usa Git Credential Manager, no imprime credenciales ni las escribe en archivos. Crea un repositorio público nuevo; si el nombre ya existe y no hay estado local de publicación, se detiene sin modificarlo.

```powershell
npm run build
npm run check
node scripts/publish-github.mjs
node scripts/publish-github.mjs --status
```

`main` conserva las fuentes y `gh-pages` publica únicamente `dist/`. Los cambios requieren reconstrucción y una nueva ejecución del script. `.publication.json` conserva el repositorio y la URL, sin secretos. No se ha contratado dominio, hosting de pago ni suscripciones.

Cloudflare Pages también admite `dist/` con Direct Upload. Se prefirió GitHub Pages porque la sesión local de Cloudflare estaba vencida. `public/_headers` se incluye por compatibilidad con Cloudflare; GitHub Pages no aplica ese archivo. En GitHub se utilizan los metadatos noindex/nofollow/noarchive en ambos documentos HTML y `robots.txt` con Disallow. Estas indicaciones desalientan la indexación; no son un control de acceso.

## Fuentes

- https://www.instagram.com/fatcomuebles/
- https://espaciohogar.cl/categoria/muebles-a-medida/
- https://arcamuebles.cl/pages/profesionales
- Fotografías de inspiración: Unsplash, detalle en `public/fuentes.html`.

Las referencias informaron el uso de fotografías protagonistas, proyectos y recorrido de cotización. No se copiaron sus diseños, condiciones comerciales ni textos. El monograma, la composición y la combinación de terracota, grafito, madera y blanco cálido constituyen una propuesta gráfica para revisión.
