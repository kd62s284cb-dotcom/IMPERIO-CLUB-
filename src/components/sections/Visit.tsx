"use client";

import { ArrowUpRight, InstagramLogo, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";

import { OpenStatus } from "@/components/ui/OpenStatus";
import { Reveal, RevealText } from "@/components/ui/motion";
import { hours, instagramUrl, site, weekOrder, weekdayNames } from "@/content/site";
import { telUrl } from "@/lib/contact";
import { cn } from "@/lib/cn";
import { madridNow, slotLabels } from "@/lib/hours";
import { useNow } from "@/lib/now";

/** Dirección, horario con el día de hoy resaltado y estado de apertura en vivo. */
export function Visit() {
  const now = useNow();
  const today = now ? madridNow(now).weekday : null;

  const links = [
    { href: site.mapsUrl, label: "Cómo llegar", detail: `${site.address.street}, ${site.address.locality}`, Icon: MapPin, external: true },
    { href: telUrl, label: "Llamar", detail: site.contact.phone, Icon: Phone, external: false },
    { href: instagramUrl, label: "Instagram", detail: `@${site.contact.instagram}`, Icon: InstagramLogo, external: true },
  ];

  return (
    <section id="visita" className="border-t border-ink/10 bg-stone-50 text-ink">
      <div className="container-page section-y grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <p className="text-label text-bronze-deep">Visítanos</p>
          <RevealText as="h2" text="El sillón *te espera.*" className="text-headline mt-8 max-w-[9ch]" emClassName="italic text-bronze-deep" />
          <Reveal delay={0.1}>
            <address className="text-lead mt-10 not-italic text-stone-600">
              {site.address.street}
              <br />
              {site.address.postalCode} {site.address.locality} · {site.address.area}
            </address>
          </Reveal>
          <ul className="mt-12 border-t border-ink/15">
            {links.map(({ href, label, detail, Icon, external }) => (
              <li key={label} className="border-b border-ink/15">
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 py-5"
                >
                  <Icon aria-hidden="true" weight="light" className="size-5 text-bronze-deep" />
                  <span className="flex-1">
                    <span className="block font-serif text-2xl transition-transform duration-700 ease-premium group-hover:translate-x-2">
                      {label}
                    </span>
                    <span className="block text-sm text-stone-500">{detail}</span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    weight="light"
                    className="size-5 text-stone-400 transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="bg-ink p-8 text-stone-50 sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-8">
              <p className="font-serif text-3xl">Horario</p>
              <OpenStatus className="text-sm text-stone-300" />
            </div>
            <dl className="mt-4">
              {weekOrder.map((d) => {
                const isToday = d === today;
                return (
                  <div
                    key={d}
                    className={cn(
                      "flex items-baseline justify-between gap-6 border-b border-white/5 py-4 last:border-b-0",
                      isToday ? "text-stone-50" : "text-stone-400",
                    )}
                  >
                    <dt className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className={cn("size-1.5 rotate-45 transition-colors", isToday ? "bg-bronze" : "bg-transparent")}
                      />
                      {weekdayNames[d]}
                      {isToday ? <span className="text-label text-[0.625rem] text-bronze">Hoy</span> : null}
                    </dt>
                    <dd className="flex flex-col items-end gap-1 tabular-nums sm:flex-row sm:gap-4">
                      {slotLabels(hours[d]).map((label) => (
                        <span key={label} className="whitespace-nowrap">
                          {label}
                        </span>
                      ))}
                    </dd>
                  </div>
                );
              })}
            </dl>
            <p className="mt-8 text-xs leading-relaxed text-stone-500">
              Horario de Sevilla. En festivos locales puede variar: consúltanos por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
