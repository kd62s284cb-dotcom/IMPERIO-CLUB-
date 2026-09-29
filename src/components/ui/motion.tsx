"use client";

import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image from "next/image";
import { useRef, type ElementType, type ReactNode } from "react";

import type { SiteImage } from "@/content/images";
import { cn } from "@/lib/cn";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Respeta la preferencia de movimiento reducido del sistema en todo el sitio. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "p" | "span" | "figure";
};

/** Aparición suave al entrar en pantalla (una sola vez). */
export function Reveal({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const Comp = motion[as] as typeof motion.div;
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/**
 * Divide un texto en palabras. Las palabras entre asteriscos (*así*) se
 * marcan como énfasis: cursiva serif en bronce.
 */
export function parseEmphasis(text: string) {
  let emphasis = false;
  return text.split(" ").map((raw) => {
    const opens = raw.startsWith("*");
    const closes = raw.endsWith("*");
    if (opens) emphasis = true;
    const word = { text: raw.replace(/\*/g, ""), em: emphasis };
    if (closes) emphasis = false;
    return word;
  });
}

export function plainText(text: string) {
  return text.replace(/\*/g, "");
}

type RevealTextProps = {
  text: string;
  as?: ElementType;
  className?: string;
  emClassName?: string;
  delay?: number;
  /** Animar al cargar (hero) en lugar de al entrar en pantalla. */
  onMount?: boolean;
};

/** Texto que aparece palabra a palabra desde una máscara. */
export function RevealText({
  text,
  as: Tag = "p",
  className,
  emClassName = "italic text-bronze",
  delay = 0,
  onMount = false,
}: RevealTextProps) {
  const words = parseEmphasis(text);
  const trigger = onMount
    ? { animate: "visible" as const }
    : { whileInView: "visible" as const, viewport: { once: true, amount: 0.4 } };
  return (
    <Tag className={className}>
      <span className="sr-only">{plainText(text)}</span>
      <motion.span className="block" initial="hidden" {...trigger} aria-hidden="true">
        {words.map((word, i) => (
          <span key={`${word.text}-${i}`} className="inline-block overflow-hidden pb-[0.14em] align-top">
            <motion.span
              className={cn("inline-block will-change-transform", word.em && emClassName)}
              variants={{
                hidden: { y: "110%" },
                visible: { y: "0%", transition: { duration: 1.1, ease: EASE, delay: delay + i * 0.055 } },
              }}
            >
              {word.text}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

function ScrollWord({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children}</motion.span>;
}

/** Palabras que se iluminan de forma progresiva con el scroll. */
export function ScrollHighlight({ words, className }: { words: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  // Con movimiento reducido todas las palabras se muestran iluminadas.
  const complete = useMotionValue(1);
  const progress = reduce ? complete : scrollYProgress;
  return (
    <div ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <span key={w} className="block">
            <ScrollWord progress={progress} range={[start, end]}>
              {w}
            </ScrollWord>
          </span>
        );
      })}
    </div>
  );
}

type ParallaxImageProps = {
  image: SiteImage;
  className?: string;
  /** Desplazamiento máximo en porcentaje. Muy sutil por defecto. */
  strength?: number;
  priority?: boolean;
  sizes?: string;
  imgClassName?: string;
  /** Ocupa todo el contenedor posicionado más cercano (fondo de sección). */
  fill?: boolean;
};

/** Imagen con parallax vertical muy sutil ligado al scroll. */
export function ParallaxImage({
  image,
  className,
  strength = 8,
  priority = false,
  sizes = "100vw",
  imgClassName,
  fill = false,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);
  const still = useMotionValue("0%");
  const y = reduce ? still : parallax;
  return (
    <div ref={ref} className={cn(fill ? "absolute inset-0" : "relative", "overflow-hidden", className)}>
      <motion.div style={{ y }} className="absolute -inset-y-[10%] inset-x-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          priority={priority}
          placeholder="blur"
          sizes={sizes}
          className={cn("object-cover", imgClassName)}
        />
      </motion.div>
    </div>
  );
}

/** Línea que se dibuja al entrar en pantalla. */
export function DrawLine({ className, vertical = false, delay = 0 }: { className?: string; vertical?: boolean; delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      className={cn("block bg-current", vertical ? "w-px origin-top" : "h-px origin-left", className)}
      initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
      whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 1.6, ease: EASE, delay }}
    />
  );
}
