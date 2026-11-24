# Evolución del prototipo a una tienda

## Base actual

HTML semántico y CSS independiente de la capa de datos. Los módulos ES separan configuración, catálogo, galería, testimonios y contacto. Los identificadores de productos y categorías son estables. El despliegue estático puede conservarse mientras se agrega una API externa; GitHub Pages no ejecuta bases de datos, secretos, pagos ni lógica de servidor.

## 1. Catálogo y administración

Crear un repositorio de datos `src/services/catalog-repository.js` con `listProducts(filters)` y `getProduct(id)`. Primero envolver los datos actuales y después sustituir su implementación por `fetch('/api/products')` o la URL de una API configurada. El catálogo visual consumirá ese contrato, manteniendo su estructura y CSS. Añadir estados de carga, error y paginación cuando el volumen lo requiera.

Modelo propuesto: `products(id, slug, name, description, category_id, price_nullable, currency, status)`, `product_variants(id, product_id, sku, dimensions_json, materials_json, price_nullable)`, `categories(id, name, position)`, `product_images(id, product_id, storage_key, alt, position, source, rights_status)`.

Crear un panel separado con autenticación y roles para productos, categorías, medios y orden visual. Guardar imágenes en almacenamiento de objetos; servir versiones optimizadas por CDN. La interfaz pública solo consulta contenido publicado. La administración nunca debe confiar en validaciones del navegador. Los modelos ilustrativos se reemplazan por datos reales, sin convertirlos automáticamente en stock vendible.

## 2. Consultas y muebles personalizados

Conservar el formulario, reemplazar o complementar el adaptador de WhatsApp con `POST /api/quotes`. Validar y limitar peticiones en servidor, agregar protección contra abuso, consentimiento y retención de datos. Las fotografías de referencia requieren límites, validación MIME, almacenamiento privado y autorización de lectura. No guardar información personal en el repositorio ni en URLs públicas propias.

Modelo: `quotes`, `quote_items`, `quote_attachments`, `quote_status_history`. El cotizador personalizado puede combinar dimensiones, materiales, herrajes y mano de obra en reglas versionadas. Todo importe es estimativo hasta revisión comercial. El servidor calcula y valida los valores.

## 3. Inventario y carrito

Añadir movimientos de inventario por SKU, reservas con vencimiento y control transaccional para evitar sobreventa. El carrito guarda IDs y cantidades; las variantes, disponibilidad e importes se recalculan en servidor. Mantener los muebles a medida en un flujo de cotización y los productos vendibles en un flujo de compra claramente diferenciado.

Modelo: `inventory_movements`, `inventory_reservations`, `carts`, `cart_items`, `orders`, `order_items`. Los ítems de pedidos conservan una copia del nombre, precio e impuestos aplicados al comprar para que los cambios de catálogo no alteren pedidos anteriores.

## 4. Pagos y pedidos

Seleccionar proveedor de pagos al confirmar condiciones y costos con el negocio. Crear sesiones de pago desde servidor, guardar secretos únicamente en variables de entorno y verificar webhooks firmados, idempotentes y conciliables. Un retorno de navegador exitoso no acredita un pago. Añadir gestión de pedidos y estados operativos separados del estado de pago.

## 5. Despachos y testimonios

Agregar zonas, tarifas, comunas, condiciones de instalación y seguimiento, con información comercial aprobada. Modelo: `shipping_zones`, `shipping_rates`, `shipments`, `shipment_events`.

Para testimonios: almacenar texto original, nombre de presentación autorizado, URL de origen, estado de moderación y evidencia de consentimiento. Publicar solo aprobados y permitir retirar autorizaciones. El esquema actual de `testimonials.js` ya exige aprobación y evidencia.

## Despliegue gradual

La interfaz puede seguir en Pages y consumir una API separada; también puede trasladarse a Cloudflare Pages/Workers u otro servidor conservando HTML, CSS y módulos. Incorporar un framework solo cuando el tamaño de la aplicación o la navegación lo justifique. Antes de hacerla comercial, sustituir contenido ilustrativo, revisar accesibilidad y requisitos comerciales, configurar respaldos y monitoreo operativo, acordar políticas de privacidad y recién entonces retirar noindex y publicar un sitemap. No activar rastreadores automáticamente.
