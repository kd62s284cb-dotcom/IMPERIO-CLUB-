import { Laurel } from "@/components/ui/Laurel";
import { marqueeItems } from "@/content/home";

/** Cinta continua con los servicios, en serif cursiva. */
export function Marquee() {
  const row = (
    <ul className="flex shrink-0 items-center" aria-hidden="true">
      {marqueeItems.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-8 font-serif text-[clamp(1.75rem,1.2rem+2vw,3.25rem)] font-light italic leading-none sm:px-12">
            {item}
          </span>
          <Laurel className="size-7 text-bronze" withI={false} />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label="Servicios" className="overflow-hidden border-b border-ink/10 bg-stone-100 py-8 text-ink sm:py-10">
      <p className="sr-only">{marqueeItems.join(", ")}.</p>
      <div className="flex w-max animate-marquee motion-reduce:animate-none">
        {row}
        {row}
      </div>
    </section>
  );
}
