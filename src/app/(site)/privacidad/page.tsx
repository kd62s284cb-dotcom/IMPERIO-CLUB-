import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";
import { legal } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/privacidad" },
  robots: { index: false },
};

export default function PrivacidadPage() {
  return (
    <LegalPage title="Política de privacidad" updated="septiembre de 2026">
      <h2>Responsable del tratamiento</h2>
      <p>
        {legal.owner}, con NIF {legal.nif} y domicilio en {legal.address}. Contacto: {legal.email}.
      </p>

      <h2>Qué datos tratamos</h2>
      <p>
        Esta web no tiene formularios que envíen datos a nuestros servidores ni exige registro. Cuando reservas a través del
        botón de WhatsApp, el mensaje se prepara en tu propio navegador y lo envías tú desde tu cuenta: tratamos tu nombre,
        tu número de teléfono y los datos de la cita que nos facilites en esa conversación.
      </p>

      <h2>Finalidad y base jurídica</h2>
      <ul>
        <li>Gestionar tu cita y comunicarnos contigo sobre ella (ejecución de un servicio solicitado por ti).</li>
        <li>Si te haces socio del Club, gestionar tu membresía (relación contractual).</li>
      </ul>

      <h2>Conservación</h2>
      <p>
        Conservamos los datos mientras mantengas relación con la barbería y, después, durante los plazos legales que
        resulten aplicables.
      </p>

      <h2>Destinatarios</h2>
      <p>
        No cedemos tus datos a terceros salvo obligación legal. Las comunicaciones por WhatsApp se rigen además por las
        condiciones y la política de privacidad de WhatsApp (Meta).
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a{" "}
        {legal.email}. Si consideras que no hemos atendido correctamente tu solicitud, puedes reclamar ante la Agencia
        Española de Protección de Datos (www.aepd.es).
      </p>
    </LegalPage>
  );
}
