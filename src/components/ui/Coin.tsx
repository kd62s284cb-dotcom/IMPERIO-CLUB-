import { useId } from "react";

import { cn } from "@/lib/cn";

/**
 * Moneda de bronce inspirada en un denario de Adriano: canto irregular,
 * gráfila de perlas, leyenda grabada y la corona de laurel de la casa.
 * Es una ilustración, no la reproducción de una pieza real.
 */

const LEGEND = "HADRIANVS · AVGVSTVS · HISPANIA · IMPERIO ·";

/** Canto ligeramente irregular, como una moneda acuñada a mano. */
function edgePath() {
  const points: string[] = [];
  const steps = 72;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const r = 96 + Math.sin(a * 3 + 0.6) * 1.4 + Math.sin(a * 7 + 1.3) * 0.8 + Math.sin(a * 13) * 0.35;
    points.push(`${(100 + r * Math.cos(a)).toFixed(2)} ${(100 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${points.join(" L")}Z`;
}

const EDGE = edgePath();
const BEADS = Array.from({ length: 64 }, (_, i) => {
  const a = (i / 64) * Math.PI * 2;
  return { x: 100 + 86 * Math.cos(a), y: 100 + 86 * Math.sin(a) };
});

function LeafRing({ id }: { id: string }) {
  // Laurel propio de la moneda (más denso que el del logotipo).
  const leaves = [];
  for (let side = 0; side < 2; side++) {
    for (let i = 0; i < 11; i++) {
      const t = i / 10;
      const deg = 100 + 150 * t;
      const rad = (deg * Math.PI) / 180;
      const x = 100 + 44 * Math.cos(rad);
      const y = 104 + 44 * Math.sin(rad);
      const len = 15 - t * 6;
      const tangent = deg + 90;
      for (const tilt of [-28, 32]) {
        leaves.push(
          <path
            key={`${side}-${i}-${tilt}`}
            d={`M0 0 Q${len * 0.45} ${-len * 0.3} ${len} 0 Q${len * 0.45} ${len * 0.3} 0 0Z`}
            transform={`${side ? "translate(200 0) scale(-1 1) " : ""}translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${(tangent + tilt).toFixed(1)})`}
            fill={`url(#${id}-relief)`}
          />,
        );
      }
    }
  }
  return <g>{leaves}</g>;
}

export function Coin({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 200 200" className={cn("drop-shadow-[0_40px_60px_rgb(0_0_0/0.55)]", className)} aria-hidden="true">
      <defs>
        <radialGradient id={`${id}-metal`} cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor="#e6cfa4" />
          <stop offset="35%" stopColor="#bf9a66" />
          <stop offset="75%" stopColor="#8a6a45" />
          <stop offset="100%" stopColor="#5a4229" />
        </radialGradient>
        <linearGradient id={`${id}-relief`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0dcb4" />
          <stop offset="100%" stopColor="#8f6f48" />
        </linearGradient>
        <filter id={`${id}-patina`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.25  0 0 0 0 0.19  0 0 0 0 0.12  0 0 0 0.55 -0.1"
            result="spots"
          />
          <feComposite in="spots" in2="SourceGraphic" operator="in" result="patina" />
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="patina" />
          </feMerge>
        </filter>
        <path id={`${id}-legend`} d="M100 100 m-70 0 a70 70 0 1 1 140 0 a70 70 0 1 1 -140 0" />
      </defs>

      <path d={EDGE} fill={`url(#${id}-metal)`} filter={`url(#${id}-patina)`} />
      <path d={EDGE} fill="none" stroke="#3d2c1a" strokeOpacity="0.5" strokeWidth="1" />
      <circle cx="100" cy="100" r="90" fill="none" stroke="#3d2c1a" strokeOpacity="0.35" strokeWidth="0.8" />
      {BEADS.map((b, i) => (
        <circle key={i} cx={b.x.toFixed(2)} cy={b.y.toFixed(2)} r="1.25" fill="#f0dcb4" fillOpacity="0.7" />
      ))}

      {/* Leyenda grabada: sombra + luz desplazadas para dar relieve. */}
      <g className="font-serif" fontSize="14" fontWeight="600">
        <text fill="#3d2c1a" fillOpacity="0.55" transform="translate(0.6 0.8)">
          <textPath href={`#${id}-legend`} textLength="436" lengthAdjust="spacing">
            {LEGEND}
          </textPath>
        </text>
        <text fill="#f3e2bf">
          <textPath href={`#${id}-legend`} textLength="436" lengthAdjust="spacing">
            {LEGEND}
          </textPath>
        </text>
      </g>

      <circle cx="100" cy="100" r="56" fill="none" stroke="#3d2c1a" strokeOpacity="0.3" strokeWidth="0.8" />
      <LeafRing id={id} />
      <g transform="translate(0 2)">
        <path d="M89 76h22M89 128h22M100 76v52" fill="none" stroke="#3d2c1a" strokeOpacity="0.5" strokeWidth="6.5" transform="translate(0.8 1)" />
        <path d="M89 76h22M89 128h22M100 76v52" fill="none" stroke={`url(#${id}-relief)`} strokeWidth="6.5" />
      </g>
    </svg>
  );
}
