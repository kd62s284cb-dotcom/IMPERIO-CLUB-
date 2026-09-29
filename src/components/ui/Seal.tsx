import { Laurel } from "@/components/ui/Laurel";
import { cn } from "@/lib/cn";

type SealProps = {
  className?: string;
  /** Texto que recorre el canto de la moneda. */
  text?: string;
  spin?: boolean;
};

/**
 * Sello circular a modo de moneda romana: leyenda en el canto que gira
 * lentamente alrededor de la corona de laurel.
 */
export function Seal({
  className,
  text = "Imperio Club · Barbería · Hispalis · Sevilla · ",
  spin = true,
}: SealProps) {
  return (
    <div className={cn("relative aspect-square", className)} aria-hidden="true">
      <svg viewBox="0 0 200 200" className={cn("absolute inset-0 size-full", spin && "animate-spin-slow motion-reduce:animate-none")}>
        <defs>
          <path id="seal-ring" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
        </defs>
        <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.75" />
        <circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="0.75" />
        <text className="fill-current font-sans text-[12px] font-medium uppercase">
          <textPath href="#seal-ring" textLength="486" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <Laurel className="absolute inset-[27%] text-bronze" />
    </div>
  );
}
