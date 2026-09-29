import type Lenis from "lenis";

/** Referencia compartida a la instancia de scroll fluido (si está activa). */
let instance: Lenis | null = null;

export function setLenis(lenis: Lenis | null) {
  instance = lenis;
}

export function getLenis() {
  return instance;
}
