import type { StaticImageData } from "next/image";

import marmolCierre from "../../public/images/marmol-cierre.jpg";
import marmolClaro from "../../public/images/marmol-claro.jpg";
import marmolHero from "../../public/images/marmol-hero.jpg";
import marmolVertical from "../../public/images/marmol-vertical.jpg";

export type SiteImage = { src: StaticImageData; alt: string };

/**
 * Texturas de mármol generadas a medida para la marca (Nero Marquina y
 * mármol hueso). Son decorativas: alt vacío.
 */
export const images = {
  marmolHero: { src: marmolHero, alt: "" },
  marmolVertical: { src: marmolVertical, alt: "" },
  marmolCierre: { src: marmolCierre, alt: "" },
  marmolClaro: { src: marmolClaro, alt: "" },
} satisfies Record<string, SiteImage>;
