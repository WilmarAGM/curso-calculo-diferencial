import { useState } from "react";
import FunctionPlot from "./FunctionPlot";
import GraphPanel from "./GraphPanel";
import Slider from "./Slider";
import MathText from "../MathText";

interface BaseFn {
  id: string;
  label: string;
  tex: string;
  fn: (x: number) => number;
  domain: [number, number];
}

const BASES: BaseFn[] = [
  { id: "sin", label: "sin(x)", tex: "\\sin x", fn: Math.sin, domain: [-50, 50] },
  { id: "x2", label: "x²", tex: "x^2", fn: (x) => x * x, domain: [-50, 50] },
  { id: "abs", label: "|x|", tex: "|x|", fn: (x) => Math.abs(x), domain: [-50, 50] },
  { id: "sqrt", label: "√x", tex: "\\sqrt{x}", fn: (x) => (x >= 0 ? Math.sqrt(x) : NaN), domain: [0, 50] },
  { id: "inv", label: "1/x", tex: "\\dfrac{1}{x}", fn: (x) => (x !== 0 ? 1 / x : NaN), domain: [-50, 50] },
];

export default function TransformSimulator() {
  const [baseId, setBaseId] = useState("sin");
  const [a, setA] = useState(1);
  const [b, setB] = useState(0);
  const [c, setC] = useState(1);
  const [d, setD] = useState(0);

  const base = BASES.find((x) => x.id === baseId)!;

  const gFn = (x: number) => {
    const u = a * x - b;
    if (u < base.domain[0] || u > base.domain[1]) return NaN;
    return c * base.fn(u) + d;
  };

  return (
    <GraphPanel
      title="Simulador interactivo: g(x) = c·f(ax − b) + d"
      right={
        <select
          value={baseId}
          onChange={(e) => setBaseId(e.target.value)}
          className="mono"
          style={{
            background: "rgba(255,255,255,0.05)",
            color: "var(--text)",
            border: "1px solid var(--panel-border)",
            borderRadius: 8,
            padding: "0.3em 0.6em",
            fontSize: "0.78rem",
          }}
        >
          {BASES.map((b2) => (
            <option key={b2.id} value={b2.id} style={{ background: "#0b0f1c" }}>
              f(x) = {b2.label}
            </option>
          ))}
        </select>
      }
    >
      <FunctionPlot
        xRange={[-8, 8]}
        yRange={[-8, 8]}
        curves={[
          {
            id: "base",
            color: "rgba(154,163,199,0.55)",
            strokeWidth: 1.8,
            dashed: true,
            segments: [{ fn: base.fn, domain: [Math.max(base.domain[0], -8), Math.min(base.domain[1], 8)] }],
          },
          {
            id: "g",
            color: "var(--accent-3)",
            strokeWidth: 3,
            segments: [{ fn: gFn, domain: [-8, 8] }],
          },
        ]}
      />
      <div
        style={{
          textAlign: "center",
          margin: "0.4em 0 1em",
          fontSize: "0.95rem",
          padding: "0.5em",
          borderRadius: 10,
          background: "rgba(255,95,182,0.08)",
          border: "1px solid rgba(255,95,182,0.25)",
        }}
      >
        <span style={{ color: "var(--text-dim)" }}>g(x) = </span>
        <MathText text={`$${c}\\cdot ${base.tex.replace("x", `(${a}x - (${b}))`)} + ${d}$`} />
        <span style={{ color: "var(--text-dim)", marginLeft: "0.8em", fontSize: "0.8em" }}>
          (línea punteada gris: f(x) = {base.label} sin transformar)
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: "0.9em" }}>
        <Slider label="a — escala/refleja horiz." value={a} min={-3} max={3} step={0.1} onChange={setA} color="#7dfcff" />
        <Slider label="b — traslada (b/a) horiz." value={b} min={-8} max={8} step={0.5} onChange={setB} color="#b98bff" />
        <Slider label="c — escala/refleja vert." value={c} min={-3} max={3} step={0.1} onChange={setC} color="#ff5fb6" />
        <Slider label="d — traslada vert." value={d} min={-8} max={8} step={0.5} onChange={setD} color="#ffd166" />
      </div>
      <div style={{ marginTop: "0.8em" }}>
        <button
          className="btn"
          style={{ fontSize: "0.78rem" }}
          onClick={() => {
            setA(1);
            setB(0);
            setC(1);
            setD(0);
          }}
        >
          ↺ Restablecer (a=1, b=0, c=1, d=0)
        </button>
      </div>
    </GraphPanel>
  );
}
