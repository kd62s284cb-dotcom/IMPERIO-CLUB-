import type { Metadata } from "next";

import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Política de cookies",
  alternates: { canonical: "/cookies" },
  robots: { index: false },
};

export default function CookiesPage() {
  return (
    <LegalPage title="Política de cookies" updated="septiembre de 2026">
      <h2>Esta web no usa cookies de seguimiento</h2>
      <p>
        No utilizamos cookies publicitarias, de analítica ni de redes sociales, por lo que no necesitamos pedirte
        consentimiento para navegar por ella.
      </p>

      <h2>Almacenamiento técnico</h2>
      <p>
        La web guarda un único indicador en el almacenamiento de sesión de tu navegador (<em>sessionStorage</em>) para no
        repetir la animación de entrada mientras navegas. No contiene datos personales y se borra al cerrar la pestaña.
      </p>

      <h2>Enlaces a terceros</h2>
      <p>
        Los botones de WhatsApp, Instagram y Google Maps te llevan a servicios de terceros, que aplican sus propias
        políticas de cookies una vez que accedes a ellos.
      </p>
    </LegalPage>
  );
}
