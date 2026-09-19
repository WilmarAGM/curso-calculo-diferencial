import FunctionPlot from "../../components/graph/FunctionPlot";
import GraphPanel from "../../components/graph/GraphPanel";

interface DataPt {
  x: number;
  y: number;
  label?: string;
}

/** Modelo potencial y = A·x^k mostrado en escala natural y en escala log-log (linearizada). */
export function PowerLogLogGraph({
  A,
  k,
  xMax,
  points,
}: {
  A: number;
  k: number;
  xMax: number;
  points: DataPt[];
}) {
  const f = (x: number) => A * Math.pow(x, k);
  const yVals = points.map((p) => p.y).concat([f(xMax * 0.98), f(Math.min(...points.map((p) => p.x)) * 0.9)]);
  const yMax = Math.max(...yVals) * 1.25;
  const linF = (u: number) => k * u + Math.log(A);
  const xMin = Math.min(...points.map((p) => p.x)) * 0.6;
  const uMin = Math.log(xMin);
  const uMax = Math.log(xMax * 1.1);
  const vPoints = points.map((p) => ({ x: Math.log(p.x), y: Math.log(p.y), label: p.label, color: "var(--accent-warn)" }));
  const vAll = vPoints.map((p) => p.y);
  const vMin = Math.min(...vAll, linF(uMin)) - 0.6;
  const vMax = Math.max(...vAll, linF(uMax)) + 0.6;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "1rem" }}>
      <GraphPanel title={`Escala natural: y = ${A}·x^(${k})`}>
        <FunctionPlot
          xRange={[0, xMax * 1.1]}
          yRange={[0, yMax]}
          curves={[{ id: "power", color: "var(--accent)", segments: [{ fn: f, domain: [xMin * 0.3 || 0.01, xMax * 1.1] }] }]}
          points={points.map((p) => ({ x: p.x, y: p.y, color: "var(--accent-warn)", label: p.label }))}
          caption="Curva de potencia (no lineal)"
        />
      </GraphPanel>
      <GraphPanel title="Escala log-log: v = k·u + ln A">
        <FunctionPlot
          xRange={[uMin, uMax]}
          yRange={[vMin, vMax]}
          curves={[{ id: "lin", color: "var(--accent-3)", segments: [{ fn: linF, domain: [uMin, uMax] }] }]}
          points={vPoints}
          caption={`u = ln x, v = ln y — pendiente k = ${k}`}
        />
      </GraphPanel>
    </div>
  );
}

/** Modelo exponencial y = A·2^(x/T) (o decaimiento) en escala natural y semi-log (linearizada). */
export function ExponentialSemiLogGraph({
  A,
  T,
  xMax,
  decay = false,
  points,
  yLabel = "y",
}: {
  A: number;
  T: number;
  xMax: number;
  decay?: boolean;
  points: DataPt[];
  yLabel?: string;
}) {
  const sign = decay ? -1 : 1;
  const f = (x: number) => A * Math.pow(2, (sign * x) / T);
  const yMax = Math.max(...points.map((p) => p.y), f(0)) * 1.3;
  const lnA = Math.log(A);
  const slope = (sign * Math.LN2) / T;
  const linF = (x: number) => slope * x + lnA;
  const vPoints = points.map((p) => ({ x: p.x, y: Math.log(p.y), label: p.label, color: "var(--accent-warn)" }));
  const vAll = vPoints.map((p) => p.y).concat([linF(0), linF(xMax)]);
  const vMin = Math.min(...vAll) - 0.6;
  const vMax = Math.max(...vAll) + 0.6;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: "1rem" }}>
      <GraphPanel title={`Escala natural: ${yLabel}(x) = ${A}·2^(${decay ? "−" : ""}x/${T})`}>
        <FunctionPlot
          xRange={[0, xMax * 1.05]}
          yRange={[0, yMax]}
          curves={[{ id: "exp", color: "var(--accent)", segments: [{ fn: f, domain: [0, xMax * 1.05] }] }]}
          points={points.map((p) => ({ x: p.x, y: p.y, color: "var(--accent-warn)", label: p.label }))}
          caption={decay ? "Decaimiento exponencial" : "Crecimiento exponencial"}
        />
      </GraphPanel>
      <GraphPanel title="Escala semi-log: v = ln(y) lineal en x">
        <FunctionPlot
          xRange={[0, xMax * 1.05]}
          yRange={[vMin, vMax]}
          curves={[{ id: "lin", color: "var(--accent-3)", segments: [{ fn: linF, domain: [0, xMax * 1.05] }] }]}
          points={vPoints}
          caption={`v = ln y — pendiente = ${decay ? "−" : ""}ln 2 / T`}
        />
      </GraphPanel>
    </div>
  );
}
