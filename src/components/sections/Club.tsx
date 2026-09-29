"use client";

import { Check } from "@phosphor-icons/react/dist/ssr";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useState, type PointerEvent } from "react";

import { ButtonLink } from "@/components/ui/Button";
import { Laurel } from "@/components/ui/Laurel";
import { Reveal, RevealText } from "@/components/ui/motion";
import { clubPerks, clubTiers } from "@/content/home";
import { images } from "@/content/images";
import { whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { toRoman } from "@/lib/roman";

const tierStyles = [
  { card: "bg-ink", accent: "text-bronze", glow: "from-bronze/25" },
  { card: "bg-graphite", accent: "text-bronze-light", glow: "from-bronze-light/30" },
  { card: "bg-purpura", accent: "text-bronze-light", glow: "from-bronze-light/35" },
];

/** Tarjeta de socio con inclinación 3D y reflejo que sigue al cursor. */
function MemberCard({ tier }: { tier: number }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 150, damping: 18 });
  const sy = useSpring(py, { stiffness: 150, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-14, 14]);
  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const gx = useTransform(sx, [0, 1], ["0%", "100%"]);
  const gy = useTransform(sy, [0, 1], ["0%", "100%"]);
  const glare = useMotionTemplate`radial-gradient(22rem circle at ${gx} ${gy}, rgb(255 255 255 / 0.11), transparent 50%)`;
  const zero = useMotionValue(0);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  const style = tierStyles[tier];
  const rank = clubTiers[tier].rank;

  return (
    <div className="[perspective:1400px]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <motion.div
        style={{ rotateX: reduce ? zero : rotateX, rotateY: reduce ? zero : rotateY, transformStyle: "preserve-3d" }}
        className={cn(
          "relative aspect-[1.586] w-full overflow-hidden rounded-[1.1rem] text-stone-50 shadow-[0_50px_90px_-30px_rgb(12_11_10/0.65)] transition-colors duration-700",
          style.card,
        )}
      >
        <Image src={images.marmolVertical.src} alt="" fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover opacity-35 mix-blend-screen" />
        <div className={cn("absolute inset-0 bg-linear-to-br to-transparent to-60% transition-colors duration-700", style.glow)} />
        <motion.div className="absolute inset-0" style={{ background: glare }} />
        <div className="absolute inset-[5%] rounded-[0.7rem] border border-white/10" />

        <div className="relative flex h-full flex-col justify-between p-[7%]">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-wordmark text-[clamp(0.7rem,0.55rem+0.5vw,0.9rem)]">
                Imperio <span className="font-light opacity-60">Club</span>
              </p>
              <p className="mt-2 text-[0.625rem] uppercase tracking-[0.3em] text-stone-400">Socio · Hispalis</p>
            </div>
            <Laurel className={cn("h-auto w-[17%] transition-colors duration-700", style.accent)} />
          </div>
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[0.625rem] uppercase tracking-[0.3em] text-stone-400">Rango</p>
              <motion.p
                key={rank}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-1 font-serif text-[clamp(1.75rem,1.2rem+2vw,2.75rem)] italic leading-none"
              >
                {rank}
              </motion.p>
            </div>
            <p className="text-numeral text-sm tracking-[0.3em] text-stone-300">Nº {toRoman(147)}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function Club() {
  const [tier, setTier] = useState(clubTiers.findIndex((t) => t.featured));
  const selected = clubTiers[tier];

  return (
    <section id="club" className="relative isolate overflow-hidden bg-stone-100 text-ink">
      <Image src={images.marmolClaro.src} alt="" fill placeholder="blur" sizes="100vw" className="-z-10 object-cover opacity-70" />
      <div className="container-page section-y">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <p className="text-label text-bronze-deep">El Club</p>
            <RevealText
              as="h2"
              text="No es una barbería. *Es un club.*"
              className="text-headline mt-8 max-w-[11ch]"
              emClassName="italic text-bronze-deep"
            />
            <Reveal delay={0.1}>
              <p className="text-lead mt-8 max-w-[44ch] text-stone-600">
                Para los que vienen cada mes y quieren su hueco garantizado. Una cuota, tu barbero de confianza y
                ventajas que solo tienen los socios.
              </p>
              <ul className="mt-10 grid grid-cols-1 gap-4">
                {clubPerks.map((perk) => (
                  <li key={perk} className="flex gap-4 text-stone-700">
                    <Check aria-hidden="true" weight="light" className="mt-1 size-4 shrink-0 text-bronze-deep" />
                    {perk}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <MemberCard tier={tier} />
            </Reveal>

            <fieldset className="mt-12">
              <legend className="text-label text-stone-500">Elige tu rango</legend>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {clubTiers.map((t, i) => (
                  <label
                    key={t.rank}
                    className={cn(
                      "group relative cursor-pointer border p-5 transition-colors duration-500 has-[:focus-visible]:outline has-[:focus-visible]:outline-1 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-bronze",
                      i === tier ? "border-ink bg-ink text-stone-50" : "border-ink/15 bg-stone-50/70 hover:border-ink/50",
                    )}
                  >
                    <input
                      type="radio"
                      name="rango"
                      value={t.rank}
                      checked={i === tier}
                      onChange={() => setTier(i)}
                      className="sr-only"
                    />
                    <span className="flex items-baseline justify-between gap-2">
                      <span className="font-serif text-2xl italic">{t.rank}</span>
                      <span className="text-numeral text-xs opacity-60">{toRoman(i + 1)}</span>
                    </span>
                    <span className="mt-3 block font-serif text-3xl">
                      {t.price}&nbsp;€<span className="font-sans text-sm opacity-60"> /mes</span>
                    </span>
                    <ul className={cn("mt-4 grid gap-1.5 text-sm", i === tier ? "text-stone-300" : "text-stone-600")}>
                      {t.perks.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <ButtonLink href={whatsappUrl(`Hola Imperio Club, me interesa hacerme socio del Club con el rango ${selected.rank}.`)}>
                Quiero ser {selected.rank.toLowerCase()}
              </ButtonLink>
              <p className="text-sm text-stone-500">Sin permanencia. Plazas limitadas por barbero.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
