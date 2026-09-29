const numerals: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

/** Convierte un entero positivo a numeración romana (1 → I, 2026 → MMXXVI). */
export function toRoman(value: number) {
  let n = Math.floor(value);
  let out = "";
  for (const [v, s] of numerals) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}
