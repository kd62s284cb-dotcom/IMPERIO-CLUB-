/**
 * La carta de servicios.
 *
 * PENDIENTE: precios y duraciones de referencia. Sustituir por los reales.
 */

export type Service = {
  slug: string;
  name: string;
  summary: string;
  /** Duración aproximada en minutos. */
  minutes: number;
  /** Precio en euros (IVA incluido). */
  price: number;
  /** Destacado en la carta (se marca con la corona de laurel). */
  signature?: boolean;
};

export const services: Service[] = [
  {
    slug: "corte-clasico",
    name: "Corte clásico",
    summary: "Tijera y máquina, lavado y peinado. El corte de siempre, hecho como nunca.",
    minutes: 30,
    price: 16,
  },
  {
    slug: "degradado",
    name: "Degradado",
    summary: "Fade a medida —skin, low o mid— con transición limpia y perfilado a navaja.",
    minutes: 40,
    price: 18,
  },
  {
    slug: "barba",
    name: "Arreglo de barba",
    summary: "Diseño, rebaje y perfilado a navaja. Acabado con aceite y bálsamo.",
    minutes: 20,
    price: 12,
  },
  {
    slug: "corte-y-barba",
    name: "Corte y barba",
    summary: "El servicio completo para salir impecable de arriba abajo.",
    minutes: 50,
    price: 25,
  },
  {
    slug: "afeitado-imperial",
    name: "Afeitado imperial",
    summary: "Afeitado clásico a navaja con toalla caliente, pre-shave y bálsamo frío.",
    minutes: 30,
    price: 18,
  },
  {
    slug: "ritual-imperio",
    name: "Ritual Imperio",
    summary: "Corte, barba, doble toalla caliente, mascarilla facial y masaje craneal. Nuestra firma.",
    minutes: 75,
    price: 38,
    signature: true,
  },
  {
    slug: "corte-infantil",
    name: "Corte infantil",
    summary: "Para los herederos del imperio, hasta 12 años.",
    minutes: 25,
    price: 12,
  },
  {
    slug: "cejas-y-detalles",
    name: "Cejas y detalles",
    summary: "Perfilado de cejas, líneas y diseños a navaja.",
    minutes: 10,
    price: 5,
  },
];

export function formatPrice(price: number) {
  return `${price} €`;
}
