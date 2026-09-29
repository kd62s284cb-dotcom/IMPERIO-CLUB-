"use client";

import { useSyncExternalStore } from "react";

/**
 * Hora actual compartida, actualizada cada 30 s. En el servidor devuelve
 * null para que la UI dependiente de la hora se pinte solo en el cliente,
 * sin errores de hidratación.
 */
let now: Date | null = null;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!timer) {
    timer = setInterval(() => {
      now = new Date();
      listeners.forEach((l) => l());
    }, 30_000);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

function getSnapshot() {
  now ??= new Date();
  return now;
}

function getServerSnapshot() {
  return null;
}

export function useNow() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
