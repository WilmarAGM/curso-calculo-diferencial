export interface Interval {
  lo: number;
  hi: number;
  loOpen?: boolean;
  hiOpen?: boolean;
}

const EPS = 1e-9;

/** Aplica una función monótona a los extremos de un intervalo (intercambia extremos si decrece). */
export function mapInterval(iv: Interval, f: (v: number) => number): Interval {
  const a = f(iv.lo);
  const b = f(iv.hi);
  if (a <= b) return { lo: a, hi: b, loOpen: iv.loOpen, hiOpen: iv.hiOpen };
  return { lo: b, hi: a, loOpen: iv.hiOpen, hiOpen: iv.loOpen };
}

/** Unión de intervalos: ordena y fusiona los que se solapan o se tocan en un extremo cerrado. */
export function unionIntervals(list: Interval[]): Interval[] {
  const sorted = [...list].sort((p, q) => p.lo - q.lo || Number(!!p.loOpen) - Number(!!q.loOpen));
  const out: Interval[] = [];
  for (const iv of sorted) {
    const last = out[out.length - 1];
    const touches = last && Math.abs(iv.lo - last.hi) < EPS && !(iv.loOpen && last.hiOpen);
    if (last && (iv.lo < last.hi - EPS || touches)) {
      if (iv.hi > last.hi + EPS) {
        last.hi = iv.hi;
        last.hiOpen = iv.hiOpen;
      } else if (Math.abs(iv.hi - last.hi) < EPS) {
        last.hiOpen = !!last.hiOpen && !!iv.hiOpen;
      }
    } else {
      out.push({ ...iv });
    }
  }
  return out;
}

export function fmtNum(v: number): string {
  let r = Math.round(v * 100) / 100;
  if (Object.is(r, -0)) r = 0;
  return String(r).replace("-", "−");
}

const isPoint = (iv: Interval) => Math.abs(iv.hi - iv.lo) < EPS;

/** Notación de conjuntos: [a, b) ∪ {c} ... (varios puntos aislados se agrupan: {a, b, c}). */
export function formatSet(list: Interval[]): string {
  if (list.length === 0) return "∅";
  if (list.every(isPoint)) return `{${list.map((iv) => fmtNum(iv.lo)).join(", ")}}`;
  return list
    .map((iv) =>
      isPoint(iv)
        ? `{${fmtNum(iv.lo)}}`
        : `${iv.loOpen ? "(" : "["}${fmtNum(iv.lo)}, ${fmtNum(iv.hi)}${iv.hiOpen ? ")" : "]"}`
    )
    .join(" ∪ ");
}
