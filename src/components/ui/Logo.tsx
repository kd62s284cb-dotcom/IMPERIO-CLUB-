import Link from "next/link";

import { Laurel } from "@/components/ui/Laurel";
import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  withMark?: boolean;
  href?: string;
  onClick?: () => void;
};

/**
 * Logotipo: corona de laurel con la «I» romana y wordmark tipográfico.
 * Sustituir por el logotipo definitivo en SVG si la barbería ya tiene uno.
 */
export function Logo({ className, withMark = true, href = "/", onClick }: LogoProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-label="Imperio Club, inicio"
      className={cn("group inline-flex items-center gap-3 text-[0.8125rem] leading-none", className)}
    >
      {withMark ? (
        <Laurel className="size-9 text-bronze transition-transform duration-700 ease-premium group-hover:rotate-[8deg]" />
      ) : null}
      <span className="text-wordmark whitespace-nowrap">
        Imperio <span className="font-light opacity-60">Club</span>
      </span>
    </Link>
  );
}
