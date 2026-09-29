"use client";

import Lenis from "lenis";
import { useEffect } from "react";

import { setLenis } from "@/lib/lenis";

/**
 * Scroll fluido con Lenis. Se desactiva automáticamente si el usuario
 * prefiere movimiento reducido.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({
      autoRaf: true,
      anchors: true,
      lerp: 0.1,
      smoothWheel: true,
      allowNestedScroll: true,
    });
    setLenis(lenis);
    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
