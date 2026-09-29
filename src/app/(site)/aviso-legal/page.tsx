import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { legal, site } from "@/content/site";

export const metadata: Metadata = {
  title: "Aviso legal",
  alternates: { canonical: "/aviso-legal" },
  robots: { index: false },
};

export default function AvisoLegalPage() {
  return (
    <LegalPage title="Aviso legal" updated="septiembre de 2026">
      <h2>Titular del sitio web</h2>
      <p>
        En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio
        Electrónico (LSSI-CE), se informa de que este sitio web es titularidad de:
      </p>
      <ul>
        <li>Titular: {legal.owner}</li>
        <li>Nombre comercial: {site.name}</li>
        <li>NIF: {legal.nif}</li>
        <li>Domicilio: {legal.address}</li>
        <li>Correo electrónico: {legal.email}</li>
        {legal.registry ? <li>{legal.registry}</li> : null}
      </ul>

      <h2>Objeto</h2>
      <p>
        Este sitio web tiene carácter informativo: presenta los servicios de barbería de {site.name} en {site.city} y
        facilita el contacto para reservar cita. Las reservas se confirman siempre de forma personal por teléfono o
        WhatsApp.
      </p>

      <h2>Precios</h2>
      <p>
        Los precios publicados incluyen IVA y son orientativos. El precio aplicable es el vigente en la barbería en el
        momento de prestar el servicio.
      </p>

      <h2>Propiedad intelectual</h2>
      <p>
        Los textos, el diseño, el logotipo, las ilustraciones y el resto de contenidos de este sitio pertenecen a su
        titular o se utilizan con autorización. Queda prohibida su reproducción total o parcial sin permiso expreso.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        El titular no se hace responsable del uso indebido de la información publicada ni de los contenidos de sitios de
        terceros enlazados desde esta web (WhatsApp, Instagram o Google Maps, entre otros).
      </p>

      <h2>Legislación aplicable</h2>
      <p>
        Este aviso legal se rige por la legislación española. Para cualquier controversia, las partes se someten a los
        juzgados y tribunales de Sevilla, salvo que la normativa de consumidores disponga otro fuero.
      </p>
    </LegalPage>
  );
}
