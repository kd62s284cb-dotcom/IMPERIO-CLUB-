import { cn } from "@/lib/cn";

/**
 * Corona de laurel generada geométricamente: dos ramas simétricas de hojas
 * que crecen desde la base hacia la parte superior. viewBox 0 0 100 100.
 */

type Leaf = { x: number; y: number; rotate: number; length: number };

const CX = 50;
const CY = 52;
const R = 36;

function branch(count = 9, from = 104, to = 244): Leaf[] {
  const leaves: Leaf[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const deg = from + (to - from) * t;
    const rad = (deg * Math.PI) / 180;
    const x = CX + R * Math.cos(rad);
    const y = CY + R * Math.sin(rad);
    // Dirección tangente de crecimiento (sentido horario en coordenadas SVG).
    const tangent = deg + 90;
    const length = 13 - t * 5.5;
    leaves.push({ x, y, rotate: tangent - 30, length }); // hoja exterior
    leaves.push({ x, y, rotate: tangent + 34, length: length * 0.92 }); // hoja interior
  }
  return leaves;
}

function leafPath(l: number) {
  const w = l * 0.3;
  return `M0 0 Q${l * 0.45} ${-w} ${l} 0 Q${l * 0.45} ${w} 0 0Z`;
}

const LEAVES = branch();
const STEM_START = (104 * Math.PI) / 180;
const STEM_END = (250 * Math.PI) / 180;
const stem = `M${CX + R * Math.cos(STEM_START)} ${CY + R * Math.sin(STEM_START)} A${R} ${R} 0 0 1 ${CX + R * Math.cos(STEM_END)} ${
  CY + R * Math.sin(STEM_END)
}`;

function Branch() {
  return (
    <g>
      <path d={stem} fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" />
      {LEAVES.map((leaf, i) => (
        <path
          key={i}
          d={leafPath(leaf.length)}
          transform={`translate(${leaf.x.toFixed(2)} ${leaf.y.toFixed(2)}) rotate(${leaf.rotate.toFixed(1)})`}
          fill="currentColor"
        />
      ))}
    </g>
  );
}

/** «I» romana con remates, dibujada como trazo (no depende de fuentes). */
export function RomanI({ className }: { className?: string }) {
  return (
    <path
      className={className}
      d="M44.5 33.5h11M44.5 70.5h11M50 33.5v37"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="butt"
    />
  );
}

export function Laurel({ className, withI = true }: { className?: string; withI?: boolean }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("shrink-0", className)}>
      <Branch />
      <g transform="translate(100 0) scale(-1 1)">
        <Branch />
      </g>
      {withI ? <RomanI /> : null}
    </svg>
  );
}
