import { hours, weekdayNames, type Slot, type Weekday } from "@/content/site";

const TIME_ZONE = "Europe/Madrid";

const partsFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const shortDays: Record<Weekday, string> = { 0: "Dom", 1: "Lun", 2: "Mar", 3: "Mié", 4: "Jue", 5: "Vie", 6: "Sáb" };

/** Fecha y hora actuales en Sevilla, independientemente de la zona del visitante. */
export function madridNow(date: Date) {
  const parts = Object.fromEntries(partsFormatter.formatToParts(date).map((p) => [p.type, p.value]));
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const weekday = new Date(Date.UTC(year, month - 1, day)).getUTCDay() as Weekday;
  return { year, month, day, weekday, minutes: Number(parts.hour) * 60 + Number(parts.minute) };
}

export function toMinutes(time: string) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** «09:30» → «9:30». */
export function formatTime(time: string) {
  return time.replace(/^0/, "");
}

/** Un texto por tramo («10:00–14:00»), o «Cerrado». */
export function slotLabels(slots: Slot[]) {
  if (slots.length === 0) return ["Cerrado"];
  return slots.map((s) => `${formatTime(s.open)}–${formatTime(s.close)}`);
}

export type OpenStatus = {
  open: boolean;
  /** Cierra en menos de 30 minutos. */
  closingSoon: boolean;
  label: string;
  detail: string;
};

/** Estado de apertura en tiempo real según el horario de la barbería. */
export function getOpenStatus(date: Date): OpenStatus {
  const now = madridNow(date);
  const today = hours[now.weekday];

  const current = today.find((s) => now.minutes >= toMinutes(s.open) && now.minutes < toMinutes(s.close));
  if (current) {
    const left = toMinutes(current.close) - now.minutes;
    return {
      open: true,
      closingSoon: left <= 30,
      label: "Abierto ahora",
      detail: left <= 30 ? `Cierra en ${left} min` : `Hasta las ${formatTime(current.close)}`,
    };
  }

  const laterToday = today.find((s) => toMinutes(s.open) > now.minutes);
  if (laterToday) {
    return { open: false, closingSoon: false, label: "Cerrado ahora", detail: `Abrimos hoy a las ${formatTime(laterToday.open)}` };
  }

  for (let i = 1; i <= 7; i++) {
    const wd = ((now.weekday + i) % 7) as Weekday;
    const first = hours[wd][0];
    if (first) {
      const when = i === 1 ? "mañana" : `el ${weekdayNames[wd].toLowerCase()}`;
      return { open: false, closingSoon: false, label: "Cerrado ahora", detail: `Abrimos ${when} a las ${formatTime(first.open)}` };
    }
  }
  return { open: false, closingSoon: false, label: "Cerrado", detail: "" };
}

export type Period = "mañana" | "tarde";

export type BookingDay = {
  /** AAAA-MM-DD en hora de Sevilla. */
  key: string;
  weekday: Weekday;
  /** «Hoy», «Mañana» o «Jue 2». */
  label: string;
  /** «hoy, lunes 29 de septiembre» o «el jueves 2 de octubre», para el mensaje de reserva. */
  long: string;
  periods: Period[];
};

const periodWindows: Record<Period, [number, number]> = {
  mañana: [0, 15 * 60],
  tarde: [15 * 60, 24 * 60],
};

/** Franjas con al menos 30 minutos de hueco a partir de «fromMinutes». */
function periodsFor(slots: Slot[], fromMinutes = 0): Period[] {
  return (Object.keys(periodWindows) as Period[]).filter((period) => {
    const [ps, pe] = periodWindows[period];
    return slots.some((s) => {
      const start = Math.max(toMinutes(s.open), ps, fromMinutes);
      const end = Math.min(toMinutes(s.close), pe);
      return end - start >= 30;
    });
  });
}

/** Próximos días con hueco (se excluyen los días cerrados). */
export function upcomingDays(date: Date, count = 8): BookingDay[] {
  const now = madridNow(date);
  const days: BookingDay[] = [];
  for (let i = 0; days.length < count && i < 21; i++) {
    const d = new Date(Date.UTC(now.year, now.month - 1, now.day + i));
    const weekday = d.getUTCDay() as Weekday;
    const periods = periodsFor(hours[weekday], i === 0 ? now.minutes : 0);
    if (periods.length === 0) continue;
    const dayNum = d.getUTCDate();
    const month = d.getUTCMonth();
    days.push({
      key: d.toISOString().slice(0, 10),
      weekday,
      label: i === 0 ? "Hoy" : i === 1 ? "Mañana" : `${shortDays[weekday]} ${dayNum}`,
      long: `${i === 0 ? "hoy, " : i === 1 ? "mañana, " : "el "}${weekdayNames[weekday].toLowerCase()} ${dayNum} de ${monthNames[month]}`,
      periods,
    });
  }
  return days;
}
