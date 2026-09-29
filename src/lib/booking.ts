"use client";

import { useSyncExternalStore } from "react";

import { getLenis } from "@/lib/lenis";

/**
 * Servicio preseleccionado en el reservador. La carta y el Club lo fijan
 * al pulsar «Reservar» para que el cliente llegue con el formulario listo.
 */
let selected: string | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useSelectedService() {
  return useSyncExternalStore(
    subscribe,
    () => selected,
    () => null,
  );
}

export function setSelectedService(slug: string | null) {
  selected = slug;
  listeners.forEach((l) => l());
}

/** Preselecciona un servicio y desplaza la vista hasta el reservador. */
export function bookService(slug: string) {
  setSelectedService(slug);
  const target = document.getElementById("reservar");
  if (!target) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(target);
  else target.scrollIntoView({ behavior: "smooth" });
}
