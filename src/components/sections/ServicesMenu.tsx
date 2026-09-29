"use client";

import { ArrowRight, Clock } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Laurel } from "@/components/ui/Laurel";
import { EASE, Reveal, RevealText } from "@/components/ui/motion";
import { images } from "@/content/images";
import { formatPrice, services } from "@/content/services";
import { bookService } from "@/lib/booking";
import { toRoman } from "@/lib/roman";

/** La carta: servicios numerados en romano, con panel de detalle al pasar el cursor. */
export function ServicesMenu() {
  const [active, setActive] = useState(0);
  const current = services[active];

  return (
    <section id="carta" className="bg-stone-50 text-ink">
      <div className="container-page section-y">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <p className="text-label text-bronze-deep lg:col-span-12">La carta</p>
          <RevealText as="h2" text="Servicios con *nombre propio.*" className="text-headline max-w-[14ch] lg:col-span-8" emClassName="italic text-bronze-deep" />
          <Reveal className="lg:col-span-4 lg:self-end">
            <p className="text-lead text-stone-600">
              Precios cerrados, tiempos reales y cero sorpresas. Elige tu servicio y te lo dejamos listo en la reserva.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <ol className="border-t border-ink/15 lg:col-span-7">
            {services.map((service, i) => (
              <Reveal as="li" key={service.slug} delay={i * 0.03} className="border-b border-ink/15">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => bookService(service.slug)}
                  className="group grid w-full grid-cols-[2.75rem_1fr] gap-x-4 py-7 text-left sm:grid-cols-[4rem_1fr] lg:py-8"
                >
                  <span className="text-numeral pt-1.5 text-sm text-bronze-deep transition-transform duration-700 ease-premium group-hover:translate-x-1">
                    {toRoman(i + 1)}
                  </span>
                  <span className="block">
                    <span className="flex items-baseline gap-4">
                      <span className="flex items-center gap-3 font-serif text-[clamp(1.6rem,1.3rem+1vw,2.25rem)] leading-tight transition-transform duration-700 ease-premium group-hover:translate-x-2">
                        {service.name}
                        {service.signature ? <Laurel className="size-8 text-bronze-deep" withI={false} /> : null}
                      </span>
                      <span className="leader hidden sm:block" aria-hidden="true" />
                      <span className="ml-auto whitespace-nowrap font-serif text-[clamp(1.5rem,1.3rem+0.8vw,2rem)] sm:ml-0">
                        {formatPrice(service.price)}
                      </span>
                    </span>
                    <span className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
                      <span className="max-w-[48ch] text-stone-600">{service.summary}</span>
                      <span className="inline-flex shrink-0 items-center gap-2 text-sm text-stone-500">
                        <Clock aria-hidden="true" weight="light" className="size-4" />
                        {service.minutes} min
                        <span className="sr-only">. Reservar este servicio</span>
                        <ArrowRight
                          aria-hidden="true"
                          weight="light"
                          className="ml-2 size-4 -translate-x-2 opacity-0 transition-all duration-500 ease-premium group-hover:translate-x-0 group-hover:opacity-100"
                        />
                      </span>
                    </span>
                    {service.signature ? (
                      <span className="text-label mt-4 inline-block bg-ink px-3 py-2 text-[0.625rem] text-bronze-light">
                        Firma de la casa
                      </span>
                    ) : null}
                  </span>
                </button>
              </Reveal>
            ))}
          </ol>

          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-28">
              <div className="grain relative aspect-[4/5] overflow-hidden bg-ink text-stone-50">
                <Image src={images.marmolVertical.src} alt="" fill placeholder="blur" sizes="33vw" className="object-cover opacity-80" />
                <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/30 to-transparent" />
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={current.slug}
                    className="absolute inset-0 flex flex-col justify-between p-8"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.6, ease: EASE }}
                  >
                    <p className="text-numeral text-[7.5rem] font-light leading-none text-bronze-light/90">{toRoman(active + 1)}</p>
                    <div>
                      <p className="font-serif text-4xl leading-tight">{current.name}</p>
                      <p className="mt-3 text-sm leading-relaxed text-stone-300">{current.summary}</p>
                      <p className="mt-6 flex items-center justify-between border-t border-white/15 pt-5 text-sm text-stone-300">
                        <span>{current.minutes} minutos</span>
                        <span className="font-serif text-3xl text-stone-50">{formatPrice(current.price)}</span>
                      </p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              <Button onClick={() => bookService(current.slug)} className="mt-4 w-full">
                Reservar {current.name.toLowerCase()}
              </Button>
              <p className="mt-4 text-xs leading-relaxed text-stone-500">Precios con IVA incluido.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
