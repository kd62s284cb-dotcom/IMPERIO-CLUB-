import { Reveal, ScrollHighlight } from "@/components/ui/motion";

/** CORTE. BARBA. RITUAL. Declaración de marca a gran formato. */
export function TriadStatement() {
  return (
    <section aria-label="Corte. Barba. Ritual." className="relative bg-stone-50 text-ink">
      <div className="container-page section-y grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-end">
        <ScrollHighlight words={["Corte.", "Barba.", "Ritual."]} className="text-display uppercase lg:col-span-8" />
        <Reveal className="lg:col-span-4 lg:pb-4">
          <p className="text-lead text-stone-600">
            Tres oficios que dominamos y un solo criterio: que salgas de aquí mejor de lo que entraste. Técnica clásica de
            barbero, tendencias actuales y el tiempo que cada cabeza necesita.
          </p>
          <p className="text-label mt-10 text-bronze-deep">Cada cliente, un emperador.</p>
        </Reveal>
      </div>
    </section>
  );
}
