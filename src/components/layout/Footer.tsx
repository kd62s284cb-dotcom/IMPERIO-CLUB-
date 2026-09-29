import Link from "next/link";

import { Laurel } from "@/components/ui/Laurel";
import { Logo } from "@/components/ui/Logo";
import { hours, instagramUrl, legalNav, mainNav, site, weekOrder, weekdayNames } from "@/content/site";
import { telUrl, whatsappUrl } from "@/lib/contact";
import { slotLabels } from "@/lib/hours";
import { toRoman } from "@/lib/roman";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-stone-300">
      <div className="container-page pb-10 pt-24 lg:pt-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo className="text-stone-50" />
            <p className="mt-8 max-w-xs font-serif text-[1.75rem] font-light leading-tight text-stone-50">
              Cada cliente, <span className="italic text-bronze">un emperador.</span>
            </p>
            <div className="mt-10 grid grid-cols-1 gap-3 text-sm">
              <a href={telUrl} className="w-fit transition-colors hover:text-stone-50">
                {site.contact.phone}
              </a>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-fit transition-colors hover:text-stone-50"
              >
                WhatsApp
              </a>
              <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="w-fit transition-colors hover:text-stone-50">
                Instagram · @{site.contact.instagram}
              </a>
              {site.contact.email ? (
                <a href={`mailto:${site.contact.email}`} className="w-fit transition-colors hover:text-stone-50">
                  {site.contact.email}
                </a>
              ) : null}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 lg:col-span-8">
            <nav aria-label="Pie de página">
              <p className="text-label text-stone-500">La casa</p>
              <ul className="mt-6 grid grid-cols-1 gap-3 text-sm">
                {mainNav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="transition-colors duration-300 hover:text-stone-50">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-label text-stone-500">Horario</p>
              <dl className="mt-6 grid grid-cols-1 gap-2 text-sm">
                {weekOrder.map((d) => (
                  <div key={d} className="flex justify-between gap-4">
                    <dt className="text-stone-400">{weekdayNames[d]}</dt>
                    <dd className="flex flex-col items-end tabular-nums">
                      {slotLabels(hours[d]).map((label) => (
                        <span key={label} className="whitespace-nowrap">
                          {label}
                        </span>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="text-label text-stone-500">Dónde</p>
              <address className="mt-6 text-sm not-italic leading-relaxed">
                {site.address.street}
                <br />
                {site.address.postalCode} {site.address.locality}
              </address>
              <a
                href={site.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm text-bronze transition-colors hover:text-bronze-light"
              >
                Cómo llegar →
              </a>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap gap-y-1 text-xs leading-relaxed text-stone-500 [&>li:not(:last-child)]:after:mx-2 [&>li:not(:last-child)]:after:content-['·']">
            <li>
              © {toRoman(year)} {site.name}
            </li>
            <li>Barbería en {site.city}</li>
            {legalNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-stone-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-2 text-xs text-stone-500">
            <Laurel className="size-5 text-bronze/70" withI={false} />
            Hecho en Hispalis
          </p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="pointer-events-none select-none whitespace-nowrap px-4 pb-2 text-center font-serif text-[23vw] font-light leading-[0.78] tracking-[-0.01em] text-white/[0.04]"
      >
        IMPERIO
      </p>
    </footer>
  );
}
