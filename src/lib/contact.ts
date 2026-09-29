import { site } from "@/content/site";

/** Enlace a WhatsApp con el mensaje ya escrito. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${site.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const telUrl = `tel:${site.contact.phone.replace(/\s/g, "")}`;
