import { InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";

import { Reveal, RevealText } from "@/components/ui/motion";
import { instagramUrl, site } from "@/content/site";

const DIR = join(process.cwd(), "public", "galeria");
const IMAGE = /\.(jpe?g|png|webp|avif)$/i;

/** Fotos de /public/galeria, ordenadas por nombre de archivo. */
function galleryPhotos() {
  try {
    return readdirSync(DIR)
      .filter((f) => IMAGE.test(f))
      .sort((a, b) => a.localeCompare(b, "es", { numeric: true }))
      .slice(0, 9);
  } catch {
    return [];
  }
}

/**
 * Galería de trabajos. Aparece sola en cuanto haya fotos en public/galeria
 * (basta con subirlas: 01.jpg, 02.jpg…). Sin fotos, la sección no se muestra.
 */
export function Gallery() {
  const photos = galleryPhotos();
  if (photos.length === 0) return null;

  return (
    <section id="galeria" className="bg-ink text-stone-50">
      <div className="container-page section-y">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-label text-bronze">La obra</p>
            <RevealText as="h2" text="Cortes que *hablan solos.*" className="text-headline mt-8 max-w-[12ch]" />
          </div>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 text-stone-300 transition-colors hover:text-stone-50"
          >
            <InstagramLogo aria-hidden="true" weight="light" className="size-5" />
            Más en @{site.contact.instagram}
          </a>
        </div>
        <ul className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {photos.map((file, i) => (
            <Reveal as="li" key={file} delay={(i % 3) * 0.08} className={i % 5 === 0 ? "row-span-2" : undefined}>
              <div className={`relative overflow-hidden bg-graphite ${i % 5 === 0 ? "h-full min-h-full" : "aspect-[4/5]"}`}>
                <Image
                  src={`/galeria/${file}`}
                  alt={`Trabajo de ${site.name} (${i + 1})`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover transition-transform duration-[1.4s] ease-premium hover:scale-105"
                />
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
