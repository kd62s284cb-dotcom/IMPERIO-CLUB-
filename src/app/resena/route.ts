import { site } from "@/content/site";

/**
 * Enlace corto impreso en el QR del cartel de reseñas: si cambia el enlace de
 * Google no hay que reimprimir nada. Mientras falte `reviewsUrl`, abre la ficha
 * en Google Maps. Temporal (307) para que el navegador no lo memorice.
 */
export function GET() {
  return Response.redirect(site.reviewsUrl ?? site.mapsUrl, 307);
}
