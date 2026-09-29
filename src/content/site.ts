/**
 * Datos generales de Imperio Club.
 *
 * ─────────────────────────────────────────────────────────────────────────
 *  PENDIENTE — Revisar antes de publicar:
 *  Todos los valores marcados con «PENDIENTE» son provisionales y deben
 *  sustituirse por los datos reales de la barbería (teléfono, WhatsApp,
 *  dirección, Instagram, horario y datos legales). Es el único archivo que
 *  hay que tocar: toda la web lee de aquí.
 * ─────────────────────────────────────────────────────────────────────────
 *
 * La URL pública puede sobrescribirse con NEXT_PUBLIC_SITE_URL.
 */

export const site = {
  name: "Imperio Club",
  tagline: "Barbería de autor en Sevilla.",
  description:
    "Imperio Club es una barbería de autor en Sevilla: corte a tijera y máquina, degradados, arreglo de barba y afeitado clásico a navaja con toalla caliente. Reserva tu cita en segundos por WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.imperioclub.es", // PENDIENTE: dominio definitivo
  locale: "es_ES",
  city: "Sevilla",
  contact: {
    /** Número en formato internacional sin espacios ni «+», para wa.me. */
    whatsapp: "34600000000", // PENDIENTE
    /** Teléfono tal y como se muestra en la web. */
    phone: "+34 600 000 000", // PENDIENTE
    email: null as string | null, // PENDIENTE (null = no se muestra)
    instagram: "imperioclub", // PENDIENTE: usuario de Instagram sin @
  },
  address: {
    street: "Calle Ejemplo, 1", // PENDIENTE
    postalCode: "41001", // PENDIENTE
    locality: "Sevilla",
    region: "Andalucía",
    /** Barrio o referencia breve que aparece junto a la dirección. */
    area: "Sevilla", // PENDIENTE: p. ej. «Nervión», «Triana», «Centro»
  },
  /** Enlace «Cómo llegar». Por defecto busca la barbería en Google Maps. */
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Imperio+Club+Barber%C3%ADa+Sevilla", // PENDIENTE
  /** Enlace directo a las reseñas de Google (null = no se muestra). */
  reviewsUrl: null as string | null, // PENDIENTE
} as const;

export const instagramUrl = `https://www.instagram.com/${site.contact.instagram}/`;

/** Día de la semana según getDay(): 0 = domingo … 6 = sábado. */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;
/** Tramos de apertura en formato 24 h «HH:MM». */
export type Slot = { open: string; close: string };

/**
 * Horario semanal (hora de Sevilla). Varios tramos por día para el horario
 * partido. Un día sin tramos se muestra como «Cerrado».
 */
export const hours: Record<Weekday, Slot[]> = {
  // PENDIENTE: confirmar horario real
  1: [
    { open: "10:00", close: "14:00" },
    { open: "17:00", close: "21:00" },
  ],
  2: [
    { open: "10:00", close: "14:00" },
    { open: "17:00", close: "21:00" },
  ],
  3: [
    { open: "10:00", close: "14:00" },
    { open: "17:00", close: "21:00" },
  ],
  4: [
    { open: "10:00", close: "14:00" },
    { open: "17:00", close: "21:00" },
  ],
  5: [{ open: "10:00", close: "21:00" }],
  6: [{ open: "10:00", close: "14:30" }],
  0: [],
};

export const weekdayNames: Record<Weekday, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  0: "Domingo",
};

/** Orden de presentación: de lunes a domingo. */
export const weekOrder: Weekday[] = [1, 2, 3, 4, 5, 6, 0];

/**
 * Titular legal de la web (art. 10 LSSI-CE). Mientras quede algún valor
 * entre corchetes, las páginas legales muestran un aviso de texto provisional.
 */
export const legal = {
  owner: "[Nombre o razón social del titular]", // PENDIENTE
  nif: "[NIF / CIF]", // PENDIENTE
  address: "[Domicilio fiscal]", // PENDIENTE
  email: "[Correo de contacto legal]", // PENDIENTE
  registry: null as string | null, // Solo si es sociedad: datos del Registro Mercantil
};

export const legalDataComplete = [legal.owner, legal.nif, legal.address, legal.email].every((v) => !v.includes("["));

/** Ancla del reservador (válida desde cualquier página). */
export const bookingHref = "/#reservar";

export type NavItem = { label: string; href: string; description: string };

/** Secciones de la página principal. */
export const mainNav: NavItem[] = [
  { label: "La carta", href: "/#carta", description: "Servicios y precios." },
  { label: "El ritual", href: "/#ritual", description: "Cómo trabajamos cada cita." },
  { label: "El Club", href: "/#club", description: "Membresía para habituales." },
  { label: "Legado", href: "/#legado", description: "Sevilla, cuna de emperadores." },
  { label: "Visítanos", href: "/#visita", description: "Horario y dirección." },
  { label: "Reservar", href: bookingHref, description: "Tu cita en tres toques." },
];

export const legalNav = [
  { label: "Aviso legal", href: "/aviso-legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
];
