# Personalización con material FATCO — 27 de noviembre de 2026

Versión pública: https://rnrb39.github.io/fatco-muebles-demo/
Despliegue comprobado: https://github.com/Rnrb39/fatco-muebles-demo/actions/runs/46005422448
Commit desplegado en gh-pages: 4b084c7fbbffbbbbad9f21a6b274db5b329eb226 (estado built, trabajo deploy success).

## Material incorporado

Se usaron todas las fotografías recibidas: conjunto de asientos en el taller, conjunto de asientos en un patio, mobiliario para quincho y dos vistas de un clóset. Se distribuyeron en portada, muebles a medida, catálogo y galería. La repetición de la portada en su ficha permite consultar esa misma pieza; los demás recursos se aprovechan según su contenido. No quedaron fotografías genéricas ni portadas anteriores de Instagram en la publicación. Las categorías sin material real se reemplazaron por Línea estándar y A medida; las tres fichas son descriptivas, no un listado de stock confirmado.

Clasificación confirmada durante el encargo: sillones de madera y metal como estándar; clósets y mobiliario para quincho como a medida. Nombres publicados: Sillones de estructura metálica, Mobiliario para quinchos y Clóset con organización interior. No se inventaron fichas técnicas ni precios.

El logotipo oficial reemplaza el monograma provisional en encabezado y pie. Se retiraron únicamente márgenes exteriores vacíos del JPEG; se mantuvieron el símbolo, letras, lema y colores. El favicon extrae el símbolo del mismo archivo. La imagen social también usa el logotipo oficial.

El video de presentación es WhatsApp Video 2026-11-25 at 16.15.58.mp4: 720 × 1280, aproximadamente 29 segundos. Se incorporó en Somos FATCO, con el encabezado Conoce FATCO Muebles. La copia web pesa 3.650.905 bytes (original: 4.861.631).

El segundo video es WhatsApp Video 2026-11-25 at 16.23.23.mp4: recorrido de clóset de 478 × 850, aproximadamente 2 min 16 s. Se abre desde la galería y pesa 11.422.823 bytes (original: 30.318.303).

No quedó material entregado sin utilizar. Los originales completos permanecen en imagenes-fatco/ y videos-fatco/, ignorados por Git; la publicación contiene únicamente las copias preparadas. Los SHA-256 y tamaños constan en MATERIAL-FATCO.json y se comprobó que los originales permanecen intactos. Las cinco fotos suman 727.600 bytes en WebP, frente a 880.963 bytes originales; las proporciones se conservaron. Los MP4 usan H.264/AAC, yuv420p y faststart. Todas las copias publicadas están por debajo de 50 MiB. Las portadas provienen de los propios videos.

El icono WhatsApp se reemplazó por Bootstrap Icons (MIT, licencia incluida), con el símbolo reconocible en ambos lugares donde había un icono provisional, y verde característico en el botón flotante. Se conservó 56990599959 en la configuración central. Se agregó Fatcospa@gmail.com con mailto en contacto y pie.

## Comprobaciones agrupadas sobre la URL pública

- 24 archivos públicos respondieron HTTP 200 y coincidieron con el build local mediante SHA-256, incluidos fotos, logo, favicon, SVG, videos, scripts y estilos.
- Los selectores mostraron 1 alternativa estándar y 2 a medida. La consulta individual del clóset conservó la clasificación correcta, el teléfono y un mensaje específico, sin enviar mensajes.
- Dos enlaces mailto usan exactamente Fatcospa@gmail.com. Los enlaces generales de WhatsApp conservan el número; los dos iconos provisionales fueron reemplazados. No se envió correo ni un mensaje de WhatsApp real.
- La presentación reprodujo hasta más de 6,75 s, readyState 4, videoWidth 720 y videoHeight 1280, sin error de video. Se comprobó pausa por el control nativo.
- El recorrido reprodujo hasta más de 6,74 s, readyState 4, videoWidth 478 y videoHeight 850. Al cerrar el modal se pausa el video.
- Los reproductores usan controls, playsinline y preload=none, sin autoplay. Antes de reproducir, la presentación permanecía en readyState 0; no se precargó el contenido completo al abrir la página.
- Revisión visual de escritorio a 1280 px y viewport móvil de 390 × 844 px, con contenido de 375 px sin desbordamiento horizontal. El video móvil midió aproximadamente 328 × 584 px, conservando su proporción. El acceso flotante tiene 54 × 54 px en móvil, separado del borde inferior. Se revisaron portada, catálogo, presentación, logotipo y contactos; no se observó error en consola.
- Se mantuvieron noindex/nofollow/noarchive, robots.txt, avisos de prototipo y ausencia de analítica, pagos y servicios contratados.

Se corrigió dentro del ciclo una mezcla de HTML nuevo y módulos antiguos en caché: el build ahora versiona el grafo completo de módulos y sus importaciones. La primera consulta pública se hizo mientras GitHub aún construía y devolvió un 404 transitorio; la comprobación final posterior al despliegue aprobó los 24 archivos. No se declaró ese estado intermedio como versión terminada.

Capturas locales (fuera de Git): docs/qa/fatco-escritorio.jpg, fatco-presentacion.jpg, fatco-movil.jpg, fatco-catalogo-movil.jpg y fatco-video-movil.jpg.

## Límites y pendientes

La prueba móvil fue una emulación de viewport, no una revisión en un teléfono físico. Los videos se reprodujeron parcialmente para verificar decodificación, controles y proporciones; no se registró su reproducción completa ni un ensayo auditivo independiente. No se verificó entrega efectiva de un correo o mensaje al destinatario. Antes del lanzamiento comercial se deben confirmar precios, disponibilidad, medidas, especificaciones, plazos y condiciones. GitHub Pages se mantiene como demostración; el alojamiento definitivo debe revisarse antes de operar comercialmente. No se añadieron servicios ni costos.
