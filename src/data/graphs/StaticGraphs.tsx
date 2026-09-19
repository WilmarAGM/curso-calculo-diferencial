import FunctionPlot from "../../components/graph/FunctionPlot";
import GraphPanel from "../../components/graph/GraphPanel";
import type { PlotSegment } from "../../components/graph/plotMath";

export function ParityGraph() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "1rem" }}>
      <GraphPanel title="Función par: f(x) = x²/3 − 2">
        <FunctionPlot
          xRange={[-6, 6]}
          yRange={[-3, 6]}
          curves={[{ id: "even", color: "var(--accent)", segments: [{ fn: (x) => (x * x) / 3 - 2, domain: [-6, 6] }] }]}
          points={[
            { x: 3, y: 1, color: "var(--accent-warn)", label: "f(3)" },
            { x: -3, y: 1, color: "var(--accent-warn)", label: "f(−3)" },
          ]}
          caption="f(−x) = f(x): simétrica respecto al eje Y"
        />
      </GraphPanel>
      <GraphPanel title="Función impar: f(x) = x³/9">
        <FunctionPlot
          xRange={[-6, 6]}
          yRange={[-4, 4]}
          curves={[{ id: "odd", color: "var(--accent-3)", segments: [{ fn: (x) => (x * x * x) / 9, domain: [-6, 6] }] }]}
          points={[
            { x: 3, y: 3, color: "var(--accent-warn)", label: "f(3)" },
            { x: -3, y: -3, color: "var(--accent-warn)", label: "f(−3)" },
          ]}
          caption="f(−x) = −f(x): simétrica respecto al origen"
        />
      </GraphPanel>
    </div>
  );
}

export function PeriodicityGraph() {
  return (
    <GraphPanel title="Periodicidad: f(x) = sin(x), período T = 2π ≈ 6.28">
      <FunctionPlot
        xRange={[-9.5, 9.5]}
        yRange={[-1.6, 1.6]}
        curves={[{ id: "sin", color: "var(--accent)", segments: [{ fn: Math.sin, domain: [-9.5, 9.5] }] }]}
        regions={[{ fn: () => 1.6, domain: [0, 2 * Math.PI], color: "rgba(185,139,255,0.14)", baseline: -1.6 }]}
        asymptotes={[]}
        caption="La región sombreada [0, 2π] se repite idéntica hacia ambos lados"
      />
    </GraphPanel>
  );
}

export function FloorCeilGraph() {
  const floorSegs: PlotSegment[] = [];
  for (let n = -4; n <= 3; n++) {
    floorSegs.push({ fn: () => n, domain: [n, n + 1], openRight: true });
  }
  const ceilSegs: PlotSegment[] = [];
  for (let n = -4; n <= 3; n++) {
    ceilSegs.push({ fn: () => n + 1, domain: [n, n + 1], openLeft: true });
  }
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "1rem" }}>
      <GraphPanel title="Función suelo ⌊x⌋">
        <FunctionPlot xRange={[-4.5, 4.5]} yRange={[-4.5, 4.5]} curves={[{ id: "floor", color: "var(--accent-good)", strokeWidth: 3, segments: floorSegs }]} />
      </GraphPanel>
      <GraphPanel title="Función techo ⌈x⌉">
        <FunctionPlot xRange={[-4.5, 4.5]} yRange={[-4.5, 4.5]} curves={[{ id: "ceil", color: "var(--accent-2)", strokeWidth: 3, segments: ceilSegs }]} />
      </GraphPanel>
    </div>
  );
}

export function DistanceFunctionGraph() {
  const a = -2,
    b = 2;
  return (
    <GraphPanel title={`Función distancia a un intervalo: d_[${a},${b}](x)`}>
      <FunctionPlot
        xRange={[-6, 6]}
        yRange={[-0.5, 5]}
        curves={[
          {
            id: "dist",
            color: "var(--accent)",
            segments: [
              { fn: (x) => a - x, domain: [-6, a] },
              { fn: () => 0, domain: [a, b] },
              { fn: (x) => x - b, domain: [b, 6] },
            ],
          },
        ]}
        caption="Vale 0 dentro de [a,b], y crece con pendiente ±1 fuera de él"
      />
    </GraphPanel>
  );
}

export function MonotonicityGraph() {
  const f = (x: number) => (x * x * x) / 6 - 1.5 * x;
  return (
    <GraphPanel title="Monotonía y extremos locales: f(x) = x³/6 − 1.5x">
      <FunctionPlot
        xRange={[-4, 4]}
        yRange={[-3, 3]}
        curves={[{ id: "cubic", color: "var(--accent)", segments: [{ fn: f, domain: [-4, 4] }] }]}
        regions={[
          { fn: f, domain: [-4, -1.73], color: "rgba(109,255,176,0.1)" },
          { fn: f, domain: [1.73, 4], color: "rgba(109,255,176,0.1)" },
        ]}
        points={[
          { x: -1.73, y: f(-1.73), color: "var(--accent-warn)", label: "máx. local" },
          { x: 1.73, y: f(1.73), color: "var(--accent-3)", label: "mín. local" },
        ]}
        caption="Verde: tramos crecientes · entre los extremos, decreciente"
      />
    </GraphPanel>
  );
}

export function AreaAccumuladaGraph() {
  const f = (t: number) => (t <= 0 ? 3 : 8 * t + 10);
  return (
    <GraphPanel title="φ(x): área acumulada bajo f(t) desde x₀ = −6 hasta x = 3">
      <FunctionPlot
        xRange={[-7, 6.5]}
        yRange={[-1, 60]}
        curves={[
          {
            id: "f",
            color: "var(--accent)",
            segments: [
              { fn: () => 3, domain: [-6, 0] },
              { fn: (t) => 8 * t + 10, domain: [0, 6] },
            ],
          },
        ]}
        regions={[
          { fn: f, domain: [-6, 3], color: "auto" },
        ]}
        points={[{ x: 3, y: 0, color: "var(--accent-3)", label: "x = 3" }]}
        caption="φ(3) = área sombreada = 18 (rectángulo) + 4(3)²+10(3) (trapecio) = 64"
      />
    </GraphPanel>
  );
}

export function CompositionGraph() {
  const f = (x: number) => x * x - 2;
  const g = (x: number) => 0.6 * x + 1;
  return (
    <GraphPanel title="Composición: (g∘f)(x) = g(f(x))">
      <FunctionPlot
        xRange={[-4, 4]}
        yRange={[-3, 6]}
        curves={[
          { id: "f", color: "rgba(154,163,199,0.7)", dashed: true, strokeWidth: 1.8, segments: [{ fn: f, domain: [-4, 4] }] },
          { id: "g", color: "rgba(255,209,102,0.7)", dashed: true, strokeWidth: 1.8, segments: [{ fn: g, domain: [-4, 4] }] },
          { id: "gof", color: "var(--accent-3)", strokeWidth: 3, segments: [{ fn: (x) => g(f(x)), domain: [-4, 4] }] },
        ]}
        caption="Gris: f(x)=x²−2 · Amarillo: g(x)=0.6x+1 · Rosa: (g∘f)(x)"
      />
    </GraphPanel>
  );
}
