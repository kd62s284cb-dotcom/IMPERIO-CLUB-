"use client";

import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";

import { OpenStatus } from "@/components/ui/OpenStatus";
import { EASE } from "@/components/ui/motion";
import { bookingHref } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";

/**
 * Barra de reserva fija en móvil. Aparece al dejar atrás la portada y se
 * oculta cuando el reservador o el pie de página están en pantalla.
 */
export function MobileBookingBar() {
  const [pastHero, setPastHero] = useState(false);
  const [covered, setCovered] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setPastHero(y > window.innerHeight * 0.8));

  useEffect(() => {
    const targets = [document.getElementById("reservar"), document.querySelector("footer")].filter(
      (el): el is HTMLElement => el !== null,
    );
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setCovered(visible.size > 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  const show = pastHero && !covered;

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          className="fixed inset-x-3 bottom-3 z-30 lg:hidden"
          initial={{ y: "140%" }}
          animate={{ y: "0%" }}
          exit={{ y: "140%" }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <div className="flex items-stretch gap-px overflow-hidden border border-white/10 bg-ink/90 text-stone-50 shadow-[0_20px_60px_-20px_rgb(0_0_0/0.6)] backdrop-blur-xl">
            <a href={bookingHref} className="flex min-h-14 flex-1 flex-col justify-center px-4">
              <span className="text-[0.6875rem] font-medium uppercase tracking-[0.18em]">Reservar cita</span>
              <OpenStatus className="mt-1 text-[0.6875rem] text-stone-400" />
            </a>
            <a
              href={whatsappUrl("Hola Imperio Club, me gustaría reservar una cita.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Reservar por WhatsApp"
              className="flex w-14 items-center justify-center bg-bronze text-ink"
            >
              <WhatsappLogo aria-hidden="true" weight="light" className="size-6" />
            </a>
            <a href={telUrl} aria-label="Llamar a la barbería" className="flex w-14 items-center justify-center bg-graphite">
              <Phone aria-hidden="true" weight="light" className="size-5" />
            </a>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
