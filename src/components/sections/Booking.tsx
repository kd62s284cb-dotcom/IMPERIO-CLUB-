"use client";

import { Phone, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { useId, useMemo, useState, type ReactNode } from "react";

import { Reveal, RevealText } from "@/components/ui/motion";
import { formatPrice, services } from "@/content/services";
import { site } from "@/content/site";
import { setSelectedService, useSelectedService } from "@/lib/booking";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { upcomingDays, type Period } from "@/lib/hours";
import { useNow } from "@/lib/now";
import { toRoman } from "@/lib/roman";

function Chip({
  selected,
  disabled,
  onClick,
  children,
}: {
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "min-h-11 border px-4 py-2 text-sm transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-30",
        selected ? "border-ink bg-ink text-stone-50" : "border-ink/15 bg-stone-50 text-ink hover:border-ink/50",
      )}
    >
      {children}
    </button>
  );
}

function Step({ index, title, children }: { index: number; title: string; children: ReactNode }) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id} className="grid grid-cols-[2.5rem_1fr] gap-x-4 border-t border-ink/15 py-8 sm:grid-cols-[3.5rem_1fr]">
      <span className="text-numeral pt-1 text-sm text-bronze-deep">{toRoman(index)}</span>
      <div>
        <p id={id} className="font-serif text-2xl">
          {title}
        </p>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

/**
 * Reservador «en tres toques»: compone un mensaje de WhatsApp con servicio,
 * día y franja. Sin formularios ni registros: la barbería confirma el hueco.
 */
export function Booking() {
  const now = useNow();
  const days = useMemo(() => (now ? upcomingDays(now, 8) : []), [now]);
  const serviceSlug = useSelectedService();
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period | null>(null);
  const [name, setName] = useState("");

  const service = services.find((s) => s.slug === serviceSlug) ?? null;
  const day = days.find((d) => d.key === dayKey) ?? null;
  const validPeriod = day && period && day.periods.includes(period) ? period : null;

  const message = [
    `Hola Imperio Club${name.trim() ? `, soy ${name.trim()}` : ""}. `,
    `Me gustaría reservar ${service ? `«${service.name}»` : "una cita"}`,
    day ? ` para ${day.long}` : "",
    validPeriod ? `, por la ${validPeriod}` : "",
    ". ¿Tenéis hueco?",
  ].join("");

  return (
    <section id="reservar" className="bg-stone-100 text-ink">
      <div className="container-page section-y grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <p className="text-label text-bronze-deep">Reservar</p>
            <RevealText as="h2" text="Tu cita en *tres toques.*" className="text-headline mt-8 max-w-[10ch]" emClassName="italic text-bronze-deep" />
            <Reveal delay={0.1}>
              <p className="text-lead mt-8 max-w-[38ch] text-stone-600">
                Elige servicio, día y franja. Te preparamos el mensaje y lo envías por WhatsApp: te confirmamos la hora exacta
                en minutos.
              </p>
              <a href={telUrl} className="mt-10 inline-flex items-center gap-3 text-stone-700 transition-colors hover:text-ink">
                <Phone aria-hidden="true" weight="light" className="size-5" />
                ¿Prefieres llamar? {site.contact.phone}
              </a>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Step index={1} title="Servicio">
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <Chip key={s.slug} selected={s.slug === serviceSlug} onClick={() => setSelectedService(s.slug === serviceSlug ? null : s.slug)}>
                  {s.name} <span className="opacity-50">· {formatPrice(s.price)}</span>
                </Chip>
              ))}
            </div>
          </Step>

          <Step index={2} title="Día">
            <div className="flex min-h-11 flex-wrap gap-2">
              {days.length === 0
                ? Array.from({ length: 6 }, (_, i) => <span key={i} className="h-11 w-20 animate-pulse bg-ink/5" aria-hidden="true" />)
                : days.map((d) => (
                    <Chip key={d.key} selected={d.key === dayKey} onClick={() => setDayKey(d.key === dayKey ? null : d.key)}>
                      {d.label}
                    </Chip>
                  ))}
            </div>
          </Step>

          <Step index={3} title="Franja y nombre">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex gap-2">
                {(["mañana", "tarde"] as const).map((p) => (
                  <Chip
                    key={p}
                    selected={validPeriod === p}
                    disabled={day ? !day.periods.includes(p) : false}
                    onClick={() => setPeriod(validPeriod === p ? null : p)}
                  >
                    {p === "mañana" ? "Mañana" : "Tarde"}
                  </Chip>
                ))}
              </div>
              <label className="flex-1">
                <span className="sr-only">Tu nombre (opcional)</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre (opcional)"
                  autoComplete="given-name"
                  maxLength={40}
                  className="min-h-11 w-full border-b border-ink/25 bg-transparent px-1 py-2 text-base outline-none transition-colors placeholder:text-stone-500 focus:border-ink"
                />
              </label>
            </div>
          </Step>

          <div className="border-t border-ink/15 pt-8">
            <p className="text-label text-stone-500">Tu mensaje</p>
            <div className="relative mt-5 bg-ink p-6 text-stone-100 sm:p-8">
              <span aria-hidden="true" className="absolute -top-3 left-6 font-serif text-6xl leading-none text-bronze">
                “
              </span>
              <p className="font-serif text-[clamp(1.25rem,1.1rem+0.6vw,1.6rem)] italic leading-snug" aria-live="polite">
                {message}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <a
                href={whatsappUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-14 items-center justify-center gap-3 bg-bronze px-7 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-ink transition-colors duration-500 hover:bg-bronze-light"
              >
                <WhatsappLogo aria-hidden="true" weight="light" className="size-5" />
                Enviar por WhatsApp
              </a>
              <p className="text-sm text-stone-500">Te respondemos en horario de apertura.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
