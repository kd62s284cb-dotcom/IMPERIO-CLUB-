"use client";

import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import { Coin } from "@/components/ui/Coin";
import { Reveal, RevealText } from "@/components/ui/motion";
import { legacyFacts } from "@/content/home";

/** Sevilla, cuna de emperadores: Itálica, Trajano y Adriano, el emperador de la barba. */
export function Legacy() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const spring = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.6 });
  const rotateY = useTransform(spring, [0, 1], [-38, 38]);
  const rotateZ = useTransform(spring, [0, 1], [-10, 6]);
  const sheen = useTransform(spring, [0, 1], ["-60%", "160%"]);
  const zero = useMotionValue(0);
  const sheenStill = useMotionValue("50%");

  return (
    <section id="legado" className="relative overflow-hidden bg-ink text-stone-50">
      <div className="container-page section-y">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center lg:gap-8">
          <div className="lg:col-span-6">
            <p className="text-label text-bronze">Legado · Hispalis</p>
            <RevealText as="h2" text="Sevilla ya dio a Roma *sus emperadores.*" className="text-headline mt-8 max-w-[12ch]" />
            <Reveal delay={0.1} className="mt-10 grid max-w-[52ch] grid-cols-1 gap-6 text-lead text-stone-400">
              <p>
                A un paseo de Sevilla está Itálica, la ciudad donde nació Trajano. De familia italicense era también Adriano,
                el primer emperador que se dejó barba y la puso de moda en todo el Imperio.
              </p>
              <p>
                Imperio Club nace de esa herencia: el oficio clásico del barbero, tratado con el rigor y la ambición de una
                ciudad que ya gobernó el mundo.
              </p>
            </Reveal>
          </div>

          <figure ref={ref} className="relative lg:col-span-5 lg:col-start-8">
            <div className="mx-auto w-[min(100%,26rem)] [perspective:1200px]">
              <motion.div
                className="relative"
                style={{ rotateY: reduce ? zero : rotateY, rotateZ: reduce ? zero : rotateZ, transformStyle: "preserve-3d" }}
              >
                <Coin className="w-full" />
                {/* Brillo que barre la moneda al hacer scroll. */}
                <div className="pointer-events-none absolute inset-[2%] overflow-hidden rounded-full mix-blend-soft-light">
                  <motion.div
                    className="absolute inset-y-0 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/70 to-transparent"
                    style={{ left: reduce ? sheenStill : sheen }}
                  />
                </div>
              </motion.div>
            </div>
            <figcaption className="mt-10 flex items-start gap-4 text-sm text-stone-500">
              <span aria-hidden="true" className="mt-2.5 h-px w-8 shrink-0 bg-bronze" />
              Adriano, siglo II d.&nbsp;C. El primer emperador con barba. Ilustración inspirada en sus denarios.
            </figcaption>
          </figure>
        </div>

        <ul className="mt-24 grid grid-cols-1 border-t border-white/10 sm:grid-cols-3 lg:mt-32">
          {legacyFacts.map((fact, i) => (
            <Reveal
              as="li"
              key={fact.figure}
              delay={i * 0.08}
              className="border-b border-white/10 py-10 sm:border-b-0 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
            >
              <p className="font-serif text-[clamp(2.75rem,2rem+2.4vw,4.5rem)] font-light leading-none text-bronze-light">
                {fact.figure}
              </p>
              <p className="mt-4 max-w-[30ch] text-stone-400">{fact.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
