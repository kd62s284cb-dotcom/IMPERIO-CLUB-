import type { ReactNode } from "react";

import { legalDataComplete } from "@/content/site";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

/** Plantilla de las páginas legales: cabecera oscura y texto a una columna. */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <section className="bg-ink text-stone-50">
        <div className="container-page pb-16 pt-40 lg:pb-24 lg:pt-48">
          <p className="text-label text-bronze">Información legal</p>
          <h1 className="text-headline mt-6">{title}</h1>
          <p className="mt-6 text-sm text-stone-500">Última actualización: {updated}</p>
        </div>
      </section>
      <section className="bg-stone-50">
        <div className="container-page py-20 lg:py-28">
          {!legalDataComplete ? (
            <p className="mb-12 max-w-[68ch] border-l-2 border-bronze bg-stone-100 px-5 py-4 text-sm text-stone-700">
              Texto provisional: faltan por completar los datos identificativos del titular (marcados entre corchetes).
            </p>
          ) : null}
          <div className="max-w-[68ch] text-stone-700 [&_a]:text-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-14 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-5 [&_p]:leading-relaxed [&_ul]:mt-5 [&_ul]:list-disc [&_ul]:pl-5">
            {children}
          </div>
        </div>
      </section>
    </>
  );
}
