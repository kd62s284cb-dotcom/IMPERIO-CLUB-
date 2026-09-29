"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, type PointerEvent } from "react";

import { useIntroDelay } from "@/components/layout/Intro";
import { ButtonLink } from "@/components/ui/Button";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { Seal } from "@/components/ui/Seal";
import { EASE } from "@/components/ui/motion";
import { images } from "@/content/images";
import { bookingHref, site } from "@/content/site";

const WORD = "IMPERIO";

export function HomeHero() {
  const ref = useRef<HTMLElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const introDelay = useIntroDelay();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const liftY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const sealRotate = useTransform(scrollYProgress, [0, 1], [0, 140]);
  // Con movimiento reducido el hero permanece estático.
  const still = useMotionValue("0%");
  const opaque = useMotionValue(1);
  const zero = useMotionValue(0);
  const imageY = reduce ? still : parallaxY;
  const contentY = reduce ? still : liftY;
  const fade = reduce ? opaque : fadeOut;

  // El foco de luz sigue al cursor sin re-renderizar: se actualizan variables CSS.
  function onPointerMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || !lightRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    lightRef.current.style.setProperty("--x", `${e.clientX - rect.left}px`);
    lightRef.current.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  const d = (s: number) => introDelay + s;

  return (
    <section
      ref={ref}
      onPointerMove={onPointerMove}
      className="grain relative isolate min-h-[100svh] overflow-hidden bg-ink text-stone-50"
    >
      <motion.div className="absolute inset-0 -z-10" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.14, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2.8, ease: EASE, delay: d(0) }}
        >
          <Image
            src={images.marmolHero.src}
            alt=""
            fill
            priority
            placeholder="blur"
            sizes="100vw"
            className="object-cover opacity-70"
          />
          {/* Segunda capa del mismo mármol, más luminosa, revelada por el foco. */}
          <div ref={lightRef} className="spotlight absolute inset-0 hidden md:block">
            <Image
              src={images.marmolHero.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover brightness-[2.2] contrast-[1.15] sepia-[0.35]"
            />
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-linear-to-r from-ink/80 via-ink/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-ink via-ink/70 to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-page relative flex min-h-[100svh] flex-col justify-end pb-10 pt-28 sm:pb-16 lg:pb-20"
      >
        <motion.div
          className="absolute right-[clamp(1.25rem,0.5rem+3.2vw,4rem)] top-28 w-36 text-stone-200 sm:top-32 sm:w-40 lg:top-[22%] lg:w-48"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, ease: EASE, delay: d(0.9) }}
        >
          <motion.div style={{ rotate: reduce ? zero : sealRotate }}>
            <Seal />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8125rem]"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: d(0.2) }}
        >
          <span className="text-wordmark text-stone-300">Barbería de autor · {site.city}</span>
          <OpenStatus className="text-stone-400" />
        </motion.div>

        <h1 className="mt-4 sm:mt-6">
          <span className="sr-only">
            {site.name}, barbería de autor en {site.city}
          </span>
          <span
            aria-hidden="true"
            className="-ml-[0.04em] flex font-serif text-[23.4vw] font-light leading-[0.8] tracking-[-0.01em] 2xl:text-[21rem]"
          >
            {WORD.split("").map((letter, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.02em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.4, ease: EASE, delay: d(0.35 + i * 0.07) }}
                >
                  {letter}
                </motion.span>
              </span>
            ))}
          </span>
        </h1>

        <motion.span
          aria-hidden="true"
          className="mt-4 block h-px origin-left bg-white/20 sm:mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.8, ease: EASE, delay: d(0.8) }}
        />

        <motion.div
          className="mt-7 grid grid-cols-1 gap-7 sm:mt-10 lg:grid-cols-12 lg:items-end"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: d(1.1) }}
        >
          <p className="text-lead max-w-[44ch] text-stone-300 lg:col-span-6">
            Corte, barba y afeitado clásico a navaja con toalla caliente. Sin prisas, con técnica y con el detalle de quien
            trata cada cabeza como una obra.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
            <ButtonLink href={bookingHref} tone="dark" variant="bronze">
              Reservar cita
            </ButtonLink>
            <ButtonLink href="/#carta" tone="dark" variant="outline">
              Ver la carta
            </ButtonLink>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
