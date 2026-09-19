export interface PlotSegment {
  fn: (x: number) => number;
  domain: [number, number];
  /** dibuja círculo hueco (punto excluido) en el extremo izquierdo/derecho del tramo */
  openLeft?: boolean;
  openRight?: boolean;
}

export interface PlotCurve {
  id: string;
  segments: PlotSegment[];
  color: string;
  strokeWidth?: number;
  dashed?: boolean;
}

export interface PlotRegion {
  fn: (x: number) => number;
  domain: [number, number];
  color: string;
  baseline?: number;
  opacity?: number;
}

export interface PlotPoint {
  x: number;
  y: number;
  color?: string;
  label?: string;
  hollow?: boolean;
}

export interface PlotAsymptote {
  type: "v" | "h";
  value: number;
  label?: string;
}

export function niceStep(range: number, targetTicks = 6): number {
  const raw = range / targetTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  let step: number;
  if (norm < 1.5) step = 1;
  else if (norm < 3) step = 2;
  else if (norm < 7) step = 5;
  else step = 10;
  return step * mag;
}

export function ticksFor(min: number, max: number, targetTicks = 6): number[] {
  const step = niceStep(max - min, targetTicks);
  const start = Math.ceil(min / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= max + 1e-9; v += step) {
    ticks.push(Math.round(v / step) * step);
  }
  return ticks;
}

/** Muestrea una función en un dominio, produciendo puntos válidos (o null para marcar un corte). */
export function sampleFn(
  fn: (x: number) => number,
  domain: [number, number],
  yBounds: [number, number],
  steps = 240
): ({ x: number; y: number } | null)[] {
  const [a, b] = domain;
  const [yMin, yMax] = yBounds;
  const pad = (yMax - yMin) * 1.5;
  const out: ({ x: number; y: number } | null)[] = [];
  for (let i = 0; i <= steps; i++) {
    const x = a + ((b - a) * i) / steps;
    let y: number;
    try {
      y = fn(x);
    } catch {
      y = NaN;
    }
    if (!Number.isFinite(y) || y < yMin - pad || y > yMax + pad) {
      out.push(null);
    } else {
      out.push({ x, y });
    }
  }
  return out;
}
