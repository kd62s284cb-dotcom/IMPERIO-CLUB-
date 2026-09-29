import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "solid" | "outline" | "ghost" | "bronze";
type Tone = "light" | "dark";

const base =
  "group/btn relative inline-flex min-h-12 items-center justify-center gap-3 whitespace-nowrap px-6 text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-[background-color,color,border-color,transform] duration-500 ease-premium active:translate-y-px";

const styles: Record<Tone, Record<Variant, string>> = {
  dark: {
    solid: "bg-stone-50 text-ink hover:bg-white",
    outline: "border border-white/30 text-stone-50 hover:border-white/80",
    ghost: "px-0 text-stone-50",
    bronze: "bg-bronze text-ink hover:bg-bronze-light",
  },
  light: {
    solid: "bg-ink text-stone-50 hover:bg-graphite-2",
    outline: "border border-ink/25 text-ink hover:border-ink/80",
    ghost: "px-0 text-ink",
    bronze: "bg-bronze text-ink hover:bg-bronze-light",
  },
};

export function buttonClass({ variant = "solid", tone = "light", className }: { variant?: Variant; tone?: Tone; className?: string }) {
  return cn(base, styles[tone][variant], className);
}

function Arrow({ icon }: { icon: "arrow" | "external" | "none" }) {
  if (icon === "none") return null;
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <Icon
      aria-hidden="true"
      weight="light"
      className="size-4 transition-transform duration-500 ease-premium group-hover/btn:translate-x-1"
    />
  );
}

function GhostLine({ variant }: { variant: Variant }) {
  if (variant !== "ghost") return null;
  return (
    <span
      aria-hidden="true"
      className="absolute inset-x-0 bottom-2 h-px origin-left scale-x-100 bg-current opacity-40 transition-transform duration-700 ease-premium group-hover/btn:scale-x-0"
    />
  );
}

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  /** Tono del fondo sobre el que se muestra el botón. */
  tone?: Tone;
  icon?: "arrow" | "external" | "none";
  className?: string;
};

type ButtonLinkProps = CommonProps & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({ href, children, variant = "solid", tone = "light", icon = "arrow", className, ...rest }: ButtonLinkProps) {
  // Anclas y enlaces externos como <a> nativo (el scroll fluido gestiona las anclas).
  const native = href.startsWith("#") || href.startsWith("/#") || /^(https?:|tel:|mailto:)/.test(href);
  const content = (
    <>
      <span>{children}</span>
      <Arrow icon={icon} />
      <GhostLine variant={variant} />
    </>
  );
  if (native) {
    const external = /^https?:/.test(href);
    return (
      <a
        href={href}
        className={buttonClass({ variant, tone, className })}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={buttonClass({ variant, tone, className })} {...rest}>
      {content}
    </Link>
  );
}

type ButtonProps = CommonProps & Omit<ComponentProps<"button">, "className" | "children">;

export function Button({ children, variant = "solid", tone = "light", icon = "arrow", className, type = "button", ...rest }: ButtonProps) {
  return (
    <button type={type} className={buttonClass({ variant, tone, className })} {...rest}>
      <span>{children}</span>
      <Arrow icon={icon} />
      <GhostLine variant={variant} />
    </button>
  );
}
