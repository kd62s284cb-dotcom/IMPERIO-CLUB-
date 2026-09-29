import { ButtonLink } from "@/components/ui/Button";
import { ParallaxImage, Reveal, RevealText } from "@/components/ui/motion";
import { images } from "@/content/images";
import { bookingHref } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";

/** Cierre de página sobre mármol negro con llamada a reservar. */
export function ClosingCta() {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink text-stone-50">
      <div className="absolute inset-0 -z-10">
        <ParallaxImage image={images.marmolCierre} fill strength={10} />
        <div className="absolute inset-0 bg-ink/35" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-linear-to-b from-ink to-transparent" />
      </div>
      <div className="container-page flex min-h-[80svh] flex-col justify-center py-32">
        <RevealText as="h2" text="Siéntate. *Del resto nos encargamos.*" className="text-display max-w-[11ch]" />
        <Reveal delay={0.2} className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
          <p className="text-lead max-w-[44ch] text-stone-300 lg:col-span-6">
            Reserva en segundos, llega a tu hora y olvídate de esperas. Tu próximo corte empieza aquí.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <ButtonLink href={bookingHref} tone="dark" variant="bronze">
              Reservar cita
            </ButtonLink>
            <ButtonLink
              href={whatsappUrl("Hola Imperio Club, me gustaría reservar una cita.")}
              tone="dark"
              variant="outline"
              icon="external"
            >
              WhatsApp directo
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
