"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

import { RevealText } from "@/components/ui/motion";
import { ritual } from "@/content/home";
import { toRoman } from "@/lib/roman";

function Step({
  index,
  total,
  progress,
  title,
  text,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  title: string;
  text: string;
}) {
  const at = index / (total - 1);
  const opacity = useTransform(progress, [Math.max(0, at - 0.2), at], [0.28, 1]);
  const fill = useTransform(progress, [Math.max(0, at - 0.05), at], [0, 1]);
  return (
    <motion.li style={{ opacity }} className="relative grid grid-cols-[2rem_1fr] gap-x-5 pb-12 last:pb-0 lg:block lg:pb-0">
      <span className="relative z-10 mt-1 flex size-4 rotate-45 items-center justify-center border border-bronze/80 bg-ink lg:mt-0">
        <motion.span style={{ scale: fill }} className="block size-2 bg-bronze" />
      </span>
      <div className="lg:mt-10 lg:pr-8">
        <p className="text-numeral text-sm text-bronze">{toRoman(index + 1)}</p>
        <h3 className="mt-2 font-serif text-[1.75rem] leading-tight text-stone-50">{title}</h3>
        <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-stone-400">{text}</p>
      </div>
    </motion.li>
  );
}

/** El ritual: cinco pasos que se iluminan al avanzar con el scroll. */
export function Ritual() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const spring = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  // Con movimiento reducido la secuencia se muestra completa y estática.
  const complete = useMotionValue(1);
  const progress = useReducedMotion() ? complete : spring;

  return (
    <section id="ritual" className="bg-ink text-stone-50">
      <div className="container-page section-y">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <p className="text-label text-bronze lg:col-span-12">El ritual</p>
          <RevealText as="h2" text="Un ritual, *no un trámite.*" className="text-headline max-w-[12ch] lg:col-span-8" />
          <p className="text-lead text-stone-400 lg:col-span-4 lg:self-end">
            Cinco tiempos que se repiten en cada cita, con la misma atención el lunes a primera hora que el sábado a
            mediodía.
          </p>
        </div>

        <div ref={ref} className="relative mt-20 lg:mt-28">
          {/* Línea de progreso: vertical en móvil, horizontal en escritorio */}
          <div aria-hidden="true" className="absolute bottom-2 left-[0.5rem] top-2 w-px bg-white/15 lg:hidden">
            <motion.div style={{ scaleY: progress }} className="h-full w-full origin-top bg-bronze" />
          </div>
          <div aria-hidden="true" className="absolute left-0 right-0 top-[0.5rem] hidden h-px bg-white/15 lg:block">
            <motion.div style={{ scaleX: progress }} className="h-full w-full origin-left bg-bronze" />
          </div>

          <ol className="relative lg:grid lg:grid-cols-5">
            {ritual.map((step, i) => (
              <Step key={step.title} index={i} total={ritual.length} progress={progress} title={step.title} text={step.text} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
