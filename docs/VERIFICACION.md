# Verificación del prototipo

Fecha: 24 de noviembre de 2026. Sitio: https://rnrb39.github.io/fatco-muebles-demo/

## Publicación

GitHub Pages configurado con `gh-pages` y raíz `/`, estado `built`. Repositorio independiente: https://github.com/Rnrb39/fatco-muebles-demo

`node scripts/verify-public.mjs` verificó HTTP 200 y contenido coincidente en 21 archivos publicados: los dos HTML, robots.txt, CSS, módulos JS, favicon y las nueve fotografías usadas. Los archivos de texto normalizan CRLF/LF para comparar el contenido; las imágenes se comparan por SHA-256 binario. No se contrató ningún servicio de pago.

## Navegador

Se revisó la interfaz en el navegador integrado de Codex, con tamaños de viewport 1440×1000, 768×1024, 390×844 y 320×740. Se inspeccionaron capturas de escritorio, tablet y móvil. El ancho desplazable no excedió el viewport en los tamaños comprobados. Esto es simulación de tamaños, no una prueba sobre dispositivos físicos o todos los navegadores.

Comprobaciones realizadas:

- Las cinco categorías devolvieron los conteos esperados: Living 3, Comedor 1, Home office 1, Dormitorio 1 y Todos 6.
- Búsqueda por nombre, búsqueda sin resultados y restablecimiento de filtros.
- Apertura de ficha y enlace individual con ID/nombre de la propuesta y destinatario centralizado.
- Precarga de una propuesta en el formulario, con tipo Mueble estándar.
- Menú móvil abre, muestra enlaces y se cierra al navegar a catálogo y cotización.
- Anclas internas existentes y enlace del pie a Fuentes y alcance; retorno al prototipo.
- Modal de galería con imagen y fuente original; cierre de modales por botón y Escape.
- Formulario vacío rechazado, correo inválido rechazado, medidas parciales rechazadas y consulta completa aceptada.
- Resumen incluye datos ingresados y las tres medidas. Enlace a WhatsApp conserva acentos y contenido codificado.
- Botón Copiar consulta mostró Consulta copiada.
- La página pública renderizó seis tarjetas, ejecutó el filtro Comedor y expuso las instrucciones noindex/nofollow/noarchive.
- Apertura del enlace general wa.me: WhatsApp mostró el contacto Fatco Spa y el mensaje preparado. No se envió ningún mensaje.
- Consulta de errores de consola del prototipo sin errores capturados durante las revisiones realizadas.

Se corrigió la reserva de espacio del pie de página para impedir que el contacto flotante cubriera el enlace de fuentes. Se mantuvieron animaciones de entrada y se usó navegación de anclas sin desplazamiento animado para evitar movimientos del destino durante interacciones.

## Comprobación de fuentes y límites

Se leyó la biografía pública de @fatcomuebles y se observaron sus miniaturas públicas. Se conservaron tres imágenes con enlace a su publicación original. Instagram exigió iniciar sesión para acceder al contenido completo de los reels y a sus comentarios; no se declara revisado ese contenido ni se agregaron testimonios.

Los modelos estándar son ilustrativos y no acreditan stock ni fabricación por FATCO. No se han validado precios, materiales, dimensiones, garantías ni plazos. La autorización de imágenes para el lanzamiento comercial y los testimonios siguen pendientes. La revisión previa al envío funciona en el navegador y no persiste datos en el sitio.

No se realizaron compras, pagos, envíos reales de consultas ni pruebas de backend: esas funciones no existen en este prototipo. Las reglas de no indexación no impiden el acceso público ni garantizan que todos los motores de búsqueda las respeten.

## Reproducir comprobaciones técnicas

```powershell
npm run build
npm run check
node scripts/verify-public.mjs
node scripts/publish-github.mjs --status
```

Las capturas de esta sesión se guardan localmente en `docs/qa/`, excluidas del repositorio. La prueba de navegador fue una revisión guiada, no una suite de automatización persistida.
