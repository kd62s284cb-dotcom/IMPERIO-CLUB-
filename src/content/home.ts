/** Textos de las secciones de la página principal. */

export const ritual = [
  {
    title: "Diagnóstico",
    text: "Forma de la cara, remolinos, tipo de barba y cómo te peinas cada mañana. Diseñamos el corte antes de tocar la tijera.",
  },
  {
    title: "Lavado",
    text: "Champú y masaje para preparar el cabello y la piel. Aquí empieza la calma.",
  },
  {
    title: "Toalla caliente",
    text: "Abre el poro y suaviza la barba. El gesto que convierte un afeitado en un ritual.",
  },
  {
    title: "Oficio",
    text: "Tijera, máquina y navaja. Precisión milimétrica, sin atajos y sin mirar el reloj.",
  },
  {
    title: "Acabado",
    text: "Producto, peinado y consejo para mantenerlo en casa. Sales listo para conquistar.",
  },
];

/**
 * El Club: membresía para clientes habituales.
 * PROPUESTA: niveles, ventajas y cuotas son una sugerencia comercial.
 * Ajustar o eliminar la sección (<ClubSection /> en la portada) según el negocio.
 */
export const clubTiers = [
  {
    rank: "Legionario",
    price: 15,
    perks: ["Un corte al mes", "Reserva prioritaria", "Precio de socio en productos"],
  },
  {
    rank: "Centurión",
    price: 24,
    perks: ["Corte y barba cada mes", "Reserva prioritaria", "Toalla caliente de cortesía"],
    featured: true,
  },
  {
    rank: "César",
    price: 39,
    perks: ["Cortes ilimitados", "Barba cada quince días", "Ritual Imperio en tu cumpleaños"],
  },
];

export const clubPerks = [
  "Tu hueco reservado antes que nadie, también en fechas señaladas.",
  "Cuota mensual sin permanencia: te das de baja cuando quieras.",
  "Tarjeta de socio numerada y precio especial en productos.",
];

/** Datos del bloque «Legado» (Itálica y los emperadores hispanos). */
export const legacyFacts = [
  { figure: "9 km", text: "separan Itálica, la ciudad natal de Trajano, de nuestro sillón." },
  { figure: "117 d. C.", text: "Adriano llega al trono y la barba se convierte en símbolo de poder." },
  { figure: "0 prisas", text: "Cada cita tiene el tiempo que necesita. Ni un minuto menos." },
];

export const marqueeItems = [
  "Corte a tijera",
  "Degradado",
  "Barba",
  "Afeitado a navaja",
  "Toalla caliente",
  "Ritual Imperio",
];
