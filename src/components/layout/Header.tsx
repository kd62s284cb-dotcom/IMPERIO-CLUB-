"use client";

import { ArrowUpRight, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react";

import { Logo } from "@/components/ui/Logo";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { EASE } from "@/components/ui/motion";
import { bookingHref, instagramUrl, mainNav, site } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { getLenis } from "@/lib/lenis";
import { toRoman } from "@/lib/roman";

const primaryNav = mainNav.filter((item) => item.href !== bookingHref);

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 240 && y > prev && !open);
  });

  const close = useCallback(() => setOpen(false), []);
  // Sección a la que desplazarse en cuanto se cierre el menú.
  const pending = useRef<HTMLElement | null>(null);

  const goTo = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    const id = event.currentTarget.hash.slice(1);
    const target = id ? document.getElementById(id) : null;
    if (!target) return; // Otra página: navegación normal.
    event.preventDefault();
    pending.current = target;
    setOpen(false);
  }, []);

  // Bloqueo del scroll y tecla Escape mientras el menú está abierto.
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      const target = pending.current;
      pending.current = null;
      if (target) {
        if (lenis) lenis.scrollTo(target, { force: true });
        else target.scrollIntoView({ behavior: "smooth" });
      }
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-stone-50 focus:px-4 focus:py-3 focus:text-sm focus:text-ink"
      >
        Saltar al contenido
      </a>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-stone-50 transition-colors duration-700 ease-premium",
          solid ? "bg-ink/85 backdrop-blur-xl" : "bg-transparent",
        )}
        animate={{ y: hidden ? "-100%" : "0%" }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <div className="container-page flex h-[72px] items-center justify-between gap-8 lg:h-20">
          <Logo onClick={close} />

          <nav aria-label="Principal" className="hidden xl:block">
            <ul className="flex items-center gap-9">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="group relative py-2 text-[0.8125rem] tracking-[0.04em] text-stone-300 transition-colors duration-500 hover:text-stone-50"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-bronze transition-transform duration-700 ease-premium group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <span className="hidden xl:block">
              <OpenStatus withDetail={false} className="text-[0.75rem] tracking-[0.04em] text-stone-300" />
            </span>
            <a
              href={bookingHref}
              onClick={close}
              className="hidden items-center gap-2 border border-bronze/50 px-4 py-2.5 text-[0.6875rem] font-medium uppercase tracking-[0.18em] text-stone-100 transition-colors duration-500 hover:border-bronze hover:bg-bronze hover:text-ink sm:inline-flex"
            >
              Reservar cita
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-principal"
              className="group flex h-11 items-center gap-3 text-[0.75rem] font-medium uppercase tracking-[0.2em]"
            >
              <span className="hidden sm:inline">{open ? "Cerrar" : "Menú"}</span>
              <span className="relative block h-3 w-7" aria-hidden="true">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-500 ease-premium",
                    open && "translate-y-[5.5px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 right-0 h-px bg-current transition-all duration-500 ease-premium",
                    open ? "w-full -translate-y-[5.5px] -rotate-45" : "w-4 group-hover:w-full",
                  )}
                />
              </span>
              <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="menu-principal"
            role="dialog"
            aria-modal="true"
            aria-label="Menú"
            data-lenis-prevent
            className="fixed inset-0 z-40 overflow-y-auto bg-ink text-stone-50"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="container-page grid min-h-full grid-cols-1 gap-16 pb-12 pt-32 lg:grid-cols-12 lg:pt-40">
              <nav aria-label="Menú completo" className="lg:col-span-7">
                <ul className="grid grid-cols-1">
                  {mainNav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: EASE, delay: 0.25 + i * 0.05 }}
                      className="border-b border-white/10"
                    >
                      <a
                        href={item.href}
                        onClick={goTo}
                        className="group grid grid-cols-[3rem_1fr] items-baseline gap-x-4 py-4 sm:grid-cols-[4rem_1fr_auto]"
                      >
                        <span className="text-numeral text-sm text-bronze">{toRoman(i + 1)}</span>
                        <span className="font-serif text-[clamp(2rem,1.3rem+2.4vw,3.4rem)] font-light leading-none text-stone-200 transition-[color,transform] duration-700 ease-premium group-hover:translate-x-3 group-hover:text-stone-50">
                          {item.label}
                        </span>
                        <span className="hidden text-sm text-stone-500 sm:block">{item.description}</span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="flex flex-col gap-10 lg:col-span-4 lg:col-start-9"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: EASE, delay: 0.5 }}
              >
                <div>
                  <p className="text-label text-stone-500">Ahora mismo</p>
                  <OpenStatus className="mt-4 text-stone-200" />
                </div>
                <div>
                  <p className="text-label text-stone-500">Dónde</p>
                  <p className="mt-4 text-stone-300">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.locality}
                  </p>
                </div>
                <div className="mt-auto grid grid-cols-1 gap-3 border-t border-white/10 pt-8">
                  <a
                    href={whatsappUrl("Hola Imperio Club, me gustaría reservar una cita.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between gap-4 bg-bronze px-5 py-4 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-bronze-light"
                  >
                    <span className="inline-flex items-center gap-3">
                      <WhatsappLogo aria-hidden="true" weight="light" className="size-5" />
                      Reservar por WhatsApp
                    </span>
                    <ArrowUpRight aria-hidden="true" weight="light" className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-between gap-4 border border-white/20 px-5 py-4 text-[0.75rem] font-medium uppercase tracking-[0.18em] transition-colors hover:border-white/60"
                  >
                    <span className="inline-flex items-center gap-3">
                      <InstagramLogo aria-hidden="true" weight="light" className="size-5" />@{site.contact.instagram}
                    </span>
                    <ArrowUpRight aria-hidden="true" weight="light" className="size-4" />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
