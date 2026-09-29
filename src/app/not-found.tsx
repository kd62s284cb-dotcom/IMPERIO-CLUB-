import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";
import { bookingHref } from "@/content/site";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="contenido" className="bg-ink text-stone-50">
        <div className="container-page flex min-h-[80svh] flex-col justify-end pb-24 pt-40">
          <p className="text-numeral text-2xl text-bronze">CDIV</p>
          <h1 className="text-headline mt-6 max-w-[14ch]">
            Esta página se perdió <span className="italic text-bronze">por el camino.</span>
          </h1>
          <p className="text-lead mt-6 max-w-[46ch] text-stone-400">
            Todos los caminos llevan a Roma, pero este no lleva a ninguna parte. Vuelve al inicio o reserva tu cita.
          </p>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/" tone="dark">
              Volver al inicio
            </ButtonLink>
            <ButtonLink href={bookingHref} tone="dark" variant="outline">
              Reservar cita
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
