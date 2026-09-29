"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { Laurel } from "@/components/ui/Laurel";
import { EASE } from "@/components/ui/motion";

export const INTRO_DURATION = 1.5;

/**
 * Telón de entrada: la corona de laurel se dibuja y el telón se retira.
 * Solo en la primera visita de la sesión. El script en línea de layout.tsx
 * marca <html data-intro="seen"> antes del primer pintado para que las
 * visitas siguientes no vean ni un parpadeo.
 */
export function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Ya vista en esta sesión: el CSS la mantiene oculta.
    if (document.documentElement.dataset.intro === "seen") return;
    try {
      sessionStorage.setItem("imperio-intro", "1");
    } catch {
      // Navegación privada o almacenamiento bloqueado: se muestra igualmente.
    }
    const t = setTimeout(() => setDone(true), INTRO_DURATION * 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      id="intro"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80] flex items-center justify-center bg-ink text-stone-50"
      initial={false}
      animate={done ? { clipPath: "inset(0 0 100% 0)" } : { clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1, ease: EASE }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.86, rotate: -12 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
        >
          <Laurel className="size-20 text-bronze" />
        </motion.div>
        <p className="overflow-hidden">
          <motion.span
            className="text-wordmark block text-sm"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
          >
            Imperio <span className="font-light opacity-60">Club</span>
          </motion.span>
        </p>
      </div>
    </motion.div>
  );
}

/** Retraso para las animaciones del hero mientras se retira el telón. */
export function useIntroDelay() {
  const [delay] = useState(() => {
    if (typeof document === "undefined") return 0;
    if (document.documentElement.dataset.intro === "seen") return 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
    return INTRO_DURATION - 0.2;
  });
  return delay;
}
