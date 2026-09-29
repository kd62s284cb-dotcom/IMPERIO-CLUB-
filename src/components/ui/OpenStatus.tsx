"use client";

import { getOpenStatus } from "@/lib/hours";
import { useNow } from "@/lib/now";
import { cn } from "@/lib/cn";

/**
 * Indicador en vivo «Abierto ahora · hasta las 21:00» calculado con la hora
 * de Sevilla. En el servidor se reserva el espacio y se rellena al hidratar.
 */
export function OpenStatus({ className, withDetail = true }: { className?: string; withDetail?: boolean }) {
  const now = useNow();
  const status = now ? getOpenStatus(now) : null;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 whitespace-nowrap transition-opacity duration-700",
        status ? "opacity-100" : "opacity-0",
        className,
      )}
      aria-live="polite"
    >
      <span className="relative flex size-2" aria-hidden="true">
        {status?.open ? (
          <span
            className={cn(
              "absolute inset-0 animate-ping rounded-full opacity-60 motion-reduce:animate-none",
              status.closingSoon ? "bg-bronze" : "bg-emerald-400",
            )}
          />
        ) : null}
        <span
          className={cn(
            "relative size-2 rounded-full",
            !status ? "bg-stone-500" : status.open ? (status.closingSoon ? "bg-bronze" : "bg-emerald-400") : "bg-stone-500",
          )}
        />
      </span>
      <span>
        {status?.label ?? "Horario"}
        {withDetail && status?.detail ? <span className="opacity-60"> · {status.detail}</span> : null}
      </span>
    </span>
  );
}
