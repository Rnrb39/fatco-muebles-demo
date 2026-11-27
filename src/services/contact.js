import { business } from '../data/config.js?v=d39c15d9b3ee';
export function whatsappUrl(message = 'Hola, FATCO. Vengo desde el prototipo web y quisiera consultar por un mueble.') {
  if (!/^\d{10,15}$/.test(business.whatsapp)) return null;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function quoteMessage(data) {
  return ['Hola, FATCO. Quisiera consultar por un proyecto.', '', `Nombre: ${data.name}`, `Correo: ${data.email}`, data.phone && `Teléfono: ${data.phone}`, `Interés: ${data.type}`, `Comuna: ${data.city}`, data.width && `Medidas aproximadas (ancho × alto × fondo): ${data.width} × ${data.height} × ${data.depth} cm`, '', data.message, '', 'Consulta preparada desde el prototipo web. Solicito confirmar factibilidad, materiales, precio y plazos.'].filter(Boolean).join('\n');
}
