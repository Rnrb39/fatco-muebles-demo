// Fotografías entregadas por FATCO. Clasificación confirmada por el cliente.
// Denominaciones descriptivas, no nombres comerciales de modelos.
export const categories = [
 {id:'todos',label:'Todos los muebles'},
 {id:'estandar',label:'Línea estándar'},
 {id:'a-medida',label:'A medida'},
];
export const products = [
 {id:'sillones-estructura-metalica',name:'Sillones de estructura metálica',category:'estandar',kind:'Mueble estándar',image:'conjunto-terraza.webp',alt:'Conjunto de sillones de madera y estructura metálica junto a una mesa, en fotografía entregada por FATCO',description:'La calidez de la madera y la presencia del metal en una línea de asientos de FATCO. Consulta los formatos y la composición disponibles.',materials:'Madera y metal. Especificaciones y terminaciones por confirmar.'},
 {id:'mobiliario-quincho',name:'Mobiliario para quinchos',category:'a-medida',kind:'Mueble a medida',image:'mueble-quincho.webp',alt:'Mobiliario de FATCO bajo un mesón con lavaplatos, junto a un quincho',description:'Una propuesta de mobiliario a medida para organizar el espacio de preparación y encuentro. Consulta el diseño y las terminaciones para tu proyecto.'},
 {id:'closet-organizacion',name:'Clóset con organización interior',category:'a-medida',kind:'Mueble a medida',image:'closet-cerrado.webp',alt:'Clóset blanco de FATCO con puertas y cajonera, realizado a medida',description:'Puertas, cajones y espacios de guardado en una solución diseñada a medida. Conversa con FATCO sobre la distribución que necesitas.',images:['closet-cerrado.webp','closet-interior.webp']},
].map(p=>({dimensions:null,materials:null,price:null,currency:'CLP',...p,images:p.images||[p.image],illustrative:false}));
