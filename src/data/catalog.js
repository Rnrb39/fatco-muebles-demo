// Propuestas ilustrativas: no representan disponibilidad ni productos confirmados.
export const categories = [
  { id: 'todos', label: 'Todos los muebles' }, { id: 'living', label: 'Living' },
  { id: 'comedor', label: 'Comedor' }, { id: 'oficina', label: 'Home office' }, { id: 'dormitorio', label: 'Dormitorio' },
];
export const products = [
  { id:'mesa-comedor', name:'Mesa de comedor', category:'comedor', image:'comedor-referencial.jpg', description:'Una mesa como punto de encuentro. Consulta por alternativas de diseño para tu comedor.' },
  { id:'sillon', name:'Silla de lectura', category:'living', image:'sillon-referencial.jpg', description:'Una propuesta para crear un rincón de pausa. Modelo ilustrativo para explorar el catálogo.' },
  { id:'escritorio', name:'Escritorio de trabajo', category:'oficina', image:'escritorio-referencial.jpg', description:'Un espacio para concentrarte. Cuéntanos qué necesitas para tu zona de trabajo.' },
  { id:'mesa-centro', name:'Mesa de centro', category:'living', image:'ambiente-referencial.jpg', description:'Un punto central para tu living. Comparte tus preferencias de forma, tamaño y terminación.' },
  { id:'velador', name:'Velador de dormitorio', category:'dormitorio', image:'dormitorio-referencial.jpg', description:'Una propuesta para acompañar tus espacios de descanso. Consulta por opciones con FATCO.' },
  { id:'arrimo', name:'Mesa auxiliar', category:'living', image:'arrimo-referencial.jpg', description:'Un mueble de apoyo para ordenar y dar carácter a tu espacio. Referencia de estilo, sujeta a confirmación.' },
].map(p => ({ ...p, images:[p.image], dimensions:null, materials:null, price:null, currency:'CLP', illustrative:true }));

