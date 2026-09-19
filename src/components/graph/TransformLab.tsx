import { useMemo, useState } from "react";
import bases from "../../data/transformBases";
import type { BasePiece } from "../../data/transformBases";
import { ticksFor } from "./plotMath";
import { fmtNum, formatSet, mapInterval, unionIntervals } from "./intervals";
import type { Interval } from "./intervals";
import GraphPanel from "./GraphPanel";
import Slider from "./Slider";
import MathText from "../MathText";

const CX = "#7dfcff"; // color del eje x (dominio)
const CY = "#ff5fb6"; // color del eje y (rango)
const GOOD = "var(--accent-good)";

type ModeId = "shiftX" | "shiftY" | "reflY" | "reflX" | "scaleX" | "scaleY";

interface Mode {
  id: ModeId;
  label: string;
  axis: "x" | "y";
  param?: { label: string; min: number; max: number; step: number; def: number };
}

const MODES: Mode[] = [
  { id: "shiftX", label: "Traslación horizontal", axis: "x", param: { label: "h (derecha si h>0)", min: -5, max: 5, step: 0.5, def: 3 } },
  { id: "shiftY", label: "Traslación vertical", axis: "y", param: { label: "k (arriba si k>0)", min: -4, max: 4, step: 0.5, def: 2 } },
  { id: "reflY", label: "Reflexión en eje Y", axis: "x" },
  { id: "reflX", label: "Reflexión en eje X", axis: "y" },
  { id: "scaleX", label: "Escala horizontal", axis: "x", param: { label: "a (a>1 comprime)", min: 0.25, max: 3, step: 0.25, def: 2 } },
  { id: "scaleY", label: "Escala vertical", axis: "y", param: { label: "c (c>1 estira)", min: 0.25, max: 3, step: 0.25, def: 2 } },
];

interface Tf {
  X: (x: number) => number;
  Y: (y: number) => number;
  tex: string;
  xRule: string;
  yRule: string;
  xWhy: string;
  yWhy: string;
}

function buildTransform(mode: ModeId, v: number): Tf {
  const id = (t: number) => t;
  const none = "No cambia: la transformación actúa solo sobre el otro eje.";
  const signed = (n: number) => (n >= 0 ? `- ${fmtNum(n)}` : `+ ${fmtNum(-n)}`);
  switch (mode) {
    case "shiftX":
      return {
        X: (x) => x + v,
        Y: id,
        tex: `g(x)=f(x ${signed(v)})`,
        xRule: `x ↦ x + ${fmtNum(v)}`,
        yRule: "y ↦ y",
        xWhy: `Cada punto se mueve ${fmtNum(Math.abs(v))} unidades hacia la ${v >= 0 ? "derecha" : "izquierda"}.`,
        yWhy: none,
      };
    case "shiftY":
      return {
        X: id,
        Y: (y) => y + v,
        tex: `g(x)=f(x) ${v >= 0 ? "+" : "-"} ${fmtNum(Math.abs(v))}`,
        xRule: "x ↦ x",
        yRule: `y ↦ y + ${fmtNum(v)}`,
        xWhy: none,
        yWhy: `Cada punto se mueve ${fmtNum(Math.abs(v))} unidades hacia ${v >= 0 ? "arriba" : "abajo"}.`,
      };
    case "reflY":
      return {
        X: (x) => -x,
        Y: id,
        tex: "g(x)=f(-x)",
        xRule: "x ↦ −x",
        yRule: "y ↦ y",
        xWhy: "Se invierte el signo de las entradas: el dominio se refleja respecto a x = 0.",
        yWhy: none,
      };
    case "reflX":
      return {
        X: id,
        Y: (y) => -y,
        tex: "g(x)=-f(x)",
        xRule: "x ↦ x",
        yRule: "y ↦ −y",
        xWhy: none,
        yWhy: "Se invierte el signo de las salidas: el rango se refleja respecto a y = 0.",
      };
    case "scaleX":
      return {
        X: (x) => x / v,
        Y: id,
        tex: `g(x)=f(${fmtNum(v)}x)`,
        xRule: `x ↦ x / ${fmtNum(v)}`,
        yRule: "y ↦ y",
        xWhy: `La gráfica se ${v > 1 ? "comprime hacia" : v < 1 ? "expande desde" : "queda igual respecto a"} el eje Y; el dominio se divide entre ${fmtNum(v)}.`,
        yWhy: none,
      };
    case "scaleY":
      return {
        X: id,
        Y: (y) => v * y,
        tex: `g(x)=${fmtNum(v)}\\cdot f(x)`,
        xRule: "x ↦ x",
        yRule: `y ↦ ${fmtNum(v)}·y`,
        xWhy: none,
        yWhy: `La gráfica se ${v > 1 ? "estira desde" : v < 1 ? "aplasta hacia" : "queda igual respecto a"} el eje X; el rango se multiplica por ${fmtNum(v)}.`,
      };
  }
}

const W = 560;
const H = 410;
const PL = 52;
const PR = 14;
const PT = 14;
const PB = 52;
const XR: [number, number] = [-10, 10];
const YR: [number, number] = [-7, 7];

const px = (x: number) => PL + ((x - XR[0]) / (XR[1] - XR[0])) * (W - PL - PR);
const py = (y: number) => H - PB - ((y - YR[0]) / (YR[1] - YR[0])) * (H - PT - PB);
const clampX = (x: number) => Math.max(XR[0], Math.min(XR[1], x));
const clampY = (y: number) => Math.max(YR[0], Math.min(YR[1], y));

function pathOf(p: BasePiece, X: (x: number) => number, Y: (y: number) => number): string {
  const { lo, hi } = p.dom;
  const n = hi - lo < 1e-9 ? 0 : 90;
  let d = "";
  for (let i = 0; i <= n; i++) {
    const x = n === 0 ? lo : lo + ((hi - lo) * i) / n;
    d += `${i === 0 ? "M" : "L"}${px(X(x)).toFixed(2)},${py(Y(p.fn(x))).toFixed(2)} `;
  }
  return d;
}

function Arrow({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  if (len < 4) return null;
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth={1.6}
      strokeDasharray="4,3"
      markerEnd={color === CX ? "url(#arrX)" : "url(#arrY)"}
      opacity={0.9}
    />
  );
}

/** Barra de intervalos junto a un eje: gris = original, coloreada = transformada. */
function IntervalBars({ set, axis, offset, color, thick }: { set: Interval[]; axis: "x" | "y"; offset: number; color: string; thick: boolean }) {
  const sw = thick ? 6 : 3;
  return (
    <g>
      {set.map((iv, i) => {
        if (axis === "x") {
          const a = px(clampX(iv.lo));
          const b = px(clampX(iv.hi));
          const y = H - PB + offset;
          return (
            <g key={i}>
              {b - a > 0.5 && <line x1={a} x2={b} y1={y} y2={y} stroke={color} strokeWidth={sw} strokeLinecap="round" opacity={thick ? 1 : 0.55} />}
              <circle cx={a} cy={y} r={thick ? 4 : 2.6} fill={iv.loOpen ? "var(--bg)" : color} stroke={color} strokeWidth={1.6} />
              <circle cx={b} cy={y} r={thick ? 4 : 2.6} fill={iv.hiOpen ? "var(--bg)" : color} stroke={color} strokeWidth={1.6} />
            </g>
          );
        }
        const a = py(clampY(iv.lo));
        const b = py(clampY(iv.hi));
        const x = PL - offset;
        return (
          <g key={i}>
            {a - b > 0.5 && <line x1={x} x2={x} y1={a} y2={b} stroke={color} strokeWidth={sw} strokeLinecap="round" opacity={thick ? 1 : 0.55} />}
            <circle cx={x} cy={a} r={thick ? 4 : 2.6} fill={iv.loOpen ? "var(--bg)" : color} stroke={color} strokeWidth={1.6} />
            <circle cx={x} cy={b} r={thick ? 4 : 2.6} fill={iv.hiOpen ? "var(--bg)" : color} stroke={color} strokeWidth={1.6} />
          </g>
        );
      })}
    </g>
  );
}

function ChangeBadge({ changed, color }: { changed: boolean; color: string }) {
  return changed ? (
    <span className="mono" style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.15em 0.6em", borderRadius: 999, color: "#05070d", background: color }}>
      CAMBIA
    </span>
  ) : (
    <span
      className="mono"
      style={{ fontSize: "0.7rem", fontWeight: 700, padding: "0.15em 0.6em", borderRadius: 999, color: GOOD, border: `1px solid ${GOOD}`, background: "rgba(109,255,176,0.12)" }}
    >
      NO CAMBIA ✓
    </span>
  );
}

function AxisCard({
  title,
  color,
  before,
  after,
  rule,
  why,
}: {
  title: string;
  color: string;
  before: string;
  after: string;
  rule: string;
  why: string;
}) {
  const changed = before !== after;
  return (
    <div
      style={{
        borderRadius: 12,
        padding: "0.8rem 0.9rem",
        border: `1px solid ${changed ? color : "rgba(109,255,176,0.35)"}`,
        background: changed ? `${color}14` : "rgba(109,255,176,0.05)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5em", gap: "0.5em" }}>
        <div className="mono" style={{ fontSize: "0.72rem", letterSpacing: "0.06em", color }}>
          {title}
        </div>
        <ChangeBadge changed={changed} color={color} />
      </div>
      <div className="mono" style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
        Antes: <span style={{ color: "var(--text)" }}>{before}</span>
      </div>
      <div className="mono" style={{ fontSize: "0.85rem", marginTop: "0.2em", color: changed ? color : GOOD, fontWeight: 700, wordBreak: "break-word" }}>
        Ahora: {after}
      </div>
      <div className="mono" style={{ fontSize: "0.72rem", marginTop: "0.5em", color: changed ? color : "var(--text-dim)" }}>
        {rule}
      </div>
      <div style={{ fontSize: "0.76rem", color: "var(--text-dim)", marginTop: "0.25em", lineHeight: 1.45 }}>{why}</div>
    </div>
  );
}

export default function TransformLab() {
  const [baseId, setBaseId] = useState(bases[0].id);
  const [modeId, setModeId] = useState<ModeId>("shiftX");
  const [vals, setVals] = useState<Record<string, number>>(() =>
    Object.fromEntries(MODES.filter((m) => m.param).map((m) => [m.id, m.param!.def]))
  );
  const [focus, setFocus] = useState<number | "all">("all");

  const base = bases.find((b) => b.id === baseId)!;
  const mode = MODES.find((m) => m.id === modeId)!;
  const v = vals[modeId] ?? 1;
  const tf = useMemo(() => buildTransform(modeId, v), [modeId, v]);

  const active = base.pieces.map((_, i) => focus === "all" || focus === i);
  const shown = base.pieces.filter((_, i) => active[i]);

  const domBefore = unionIntervals(shown.map((p) => p.dom));
  const ranBefore = unionIntervals(shown.map((p) => p.ran));
  const domAfter = unionIntervals(shown.map((p) => mapInterval(p.dom, tf.X)));
  const ranAfter = unionIntervals(shown.map((p) => mapInterval(p.ran, tf.Y)));

  const xTicks = ticksFor(XR[0], XR[1], 10);
  const yTicks = ticksFor(YR[0], YR[1], 7);
  const scope = focus === "all" ? "de toda la función" : `del ${base.pieces[focus].label.toLowerCase()}`;

  return (
    <GraphPanel title="Laboratorio de transformaciones — una a la vez">
      {/* controles: función base y tramo */}
      <div style={{ display: "flex", gap: "0.6em", flexWrap: "wrap", alignItems: "center", marginBottom: "0.8em" }}>
        <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>Gráfica base:</span>
        {bases.map((b) => (
          <button
            key={b.id}
            className="btn"
            onClick={() => {
              setBaseId(b.id);
              setFocus("all");
            }}
            style={{
              fontSize: "0.78rem",
              padding: "0.35em 0.8em",
              background: baseId === b.id ? "linear-gradient(120deg, var(--accent), var(--accent-2))" : undefined,
              color: baseId === b.id ? "#05070d" : undefined,
              border: baseId === b.id ? "none" : undefined,
            }}
          >
            {b.title}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5em", flexWrap: "wrap", alignItems: "center", marginBottom: "0.8em" }}>
        <span style={{ fontSize: "0.78rem", color: "var(--text-dim)" }}>Ver:</span>
        <button
          className="btn"
          onClick={() => setFocus("all")}
          style={{ fontSize: "0.76rem", padding: "0.3em 0.75em", borderColor: focus === "all" ? "var(--text)" : undefined }}
        >
          Toda la gráfica
        </button>
        {base.pieces.map((p, i) => (
          <button
            key={i}
            className="btn"
            onClick={() => setFocus(i)}
            style={{
              fontSize: "0.76rem",
              padding: "0.3em 0.75em",
              borderColor: p.color,
              color: focus === i ? "#05070d" : p.color,
              background: focus === i ? p.color : undefined,
            }}
          >
            Solo {p.label.split(" ")[0].toLowerCase()} {p.label.split(" ")[1]}
          </button>
        ))}
      </div>

      {/* selector de transformación */}
      <div style={{ display: "flex", gap: "0.45em", flexWrap: "wrap", marginBottom: "0.9em" }}>
        {MODES.map((m) => {
          const c = m.axis === "x" ? CX : CY;
          const on = modeId === m.id;
          return (
            <button
              key={m.id}
              className="btn"
              onClick={() => setModeId(m.id)}
              style={{
                fontSize: "0.78rem",
                padding: "0.4em 0.85em",
                borderColor: c,
                color: on ? "#05070d" : c,
                background: on ? c : undefined,
                fontWeight: on ? 700 : 500,
              }}
            >
              {m.label}
            </button>
          );
        })}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "1.1rem", alignItems: "start" }}>
        {/* gráfica */}
        <div>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
            <defs>
              <marker id="arrX" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill={CX} />
              </marker>
              <marker id="arrY" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M0,0 L10,5 L0,10 z" fill={CY} />
              </marker>
              <clipPath id="plotClip">
                <rect x={PL} y={PT} width={W - PL - PR} height={H - PT - PB} />
              </clipPath>
            </defs>
            <rect x={0} y={0} width={W} height={H} fill="rgba(255,255,255,0.015)" rx={10} />

            {xTicks.map((t) => (
              <line key={`gx${t}`} x1={px(t)} x2={px(t)} y1={PT} y2={H - PB} stroke="rgba(255,255,255,0.06)" />
            ))}
            {yTicks.map((t) => (
              <line key={`gy${t}`} x1={PL} x2={W - PR} y1={py(t)} y2={py(t)} stroke="rgba(255,255,255,0.06)" />
            ))}
            <line x1={PL} x2={W - PR} y1={py(0)} y2={py(0)} stroke="rgba(232,236,255,0.4)" strokeWidth={1.4} />
            <line x1={px(0)} x2={px(0)} y1={PT} y2={H - PB} stroke="rgba(232,236,255,0.4)" strokeWidth={1.4} />
            {xTicks.map((t) =>
              t !== 0 ? (
                <text key={`tx${t}`} x={px(t)} y={py(0) + 12} fontSize={9} textAnchor="middle" fill={CX} opacity={0.8}>
                  {t}
                </text>
              ) : null
            )}
            {yTicks.map((t) =>
              t !== 0 ? (
                <text key={`ty${t}`} x={px(0) - 5} y={py(t) + 3} fontSize={9} textAnchor="end" fill={CY} opacity={0.8}>
                  {t}
                </text>
              ) : null
            )}
            <text x={W - PR - 2} y={py(0) - 5} fontSize={11} textAnchor="end" fill={CX} fontWeight={700}>
              x
            </text>
            <text x={px(0) + 6} y={PT + 10} fontSize={11} fill={CY} fontWeight={700}>
              y
            </text>

            <g clipPath="url(#plotClip)">
              {base.pieces.map((p, i) => (
                <g key={i}>
                  {/* original: fantasma punteado */}
                  <path
                    d={pathOf(p, (x) => x, (y) => y)}
                    fill="none"
                    stroke={p.color}
                    strokeWidth={2}
                    strokeDasharray="5,5"
                    opacity={active[i] ? 0.4 : 0.1}
                  />
                  {active[i] && (
                    <>
                      {/* flechas de movimiento (extremos + punto medio del tramo) */}
                      {[p.dom.lo, (p.dom.lo + p.dom.hi) / 2, p.dom.hi].map((x, k) => {
                        if (k === 1 && p.dom.hi - p.dom.lo < 1e-9) return null;
                        const y = p.fn(x);
                        const c = mode.axis === "x" ? CX : CY;
                        return <Arrow key={k} x1={px(x)} y1={py(y)} x2={px(tf.X(x))} y2={py(tf.Y(y))} color={c} />;
                      })}
                      {/* transformada: sólida */}
                      <path
                        d={pathOf(p, tf.X, tf.Y)}
                        fill="none"
                        stroke={p.color}
                        strokeWidth={3.4}
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 5px ${p.color}99)` }}
                      />
                      {[
                        { x: p.dom.lo, open: p.dom.loOpen },
                        { x: p.dom.hi, open: p.dom.hiOpen },
                      ].map((e, k) => (
                        <circle
                          key={k}
                          cx={px(tf.X(e.x))}
                          cy={py(tf.Y(p.fn(e.x)))}
                          r={4.2}
                          fill={e.open ? "var(--bg)" : p.color}
                          stroke={p.color}
                          strokeWidth={2.2}
                        />
                      ))}
                    </>
                  )}
                </g>
              ))}
            </g>

            {/* barras de dominio (abajo) y rango (izquierda) */}
            <IntervalBars set={domBefore} axis="x" offset={16} color="#9aa3c7" thick={false} />
            <IntervalBars set={domAfter} axis="x" offset={30} color={CX} thick />
            <IntervalBars set={ranBefore} axis="y" offset={16} color="#9aa3c7" thick={false} />
            <IntervalBars set={ranAfter} axis="y" offset={30} color={CY} thick />
            <text x={W - PR} y={H - 4} fontSize={10} textAnchor="end" fill={CX}>
              dominio (eje x)
            </text>
            <text x={PL - 42} y={PT + 4} fontSize={10} textAnchor="start" fill={CY}>
              rango
            </text>
          </svg>
          <div className="mono" style={{ display: "flex", gap: "1em", flexWrap: "wrap", justifyContent: "center", fontSize: "0.68rem", color: "var(--text-dim)", marginTop: "0.5em" }}>
            <span>┅ original (fantasma)</span>
            <span>━ transformada</span>
            <span style={{ color: CX }}>⟶ movimiento en x</span>
            <span style={{ color: CY }}>⟶ movimiento en y</span>
            <span>○ extremo excluido</span>
          </div>
        </div>

        {/* panel de dominio / rango */}
        <div style={{ display: "grid", gap: "0.8em" }}>
          <div
            style={{
              textAlign: "center",
              padding: "0.55em",
              borderRadius: 10,
              background: `${mode.axis === "x" ? CX : CY}12`,
              border: `1px solid ${mode.axis === "x" ? CX : CY}55`,
              fontSize: "0.95rem",
            }}
          >
            <MathText text={`$${tf.tex}$`} />
          </div>
          <AxisCard title={`DOMINIO — eje x ${scope}`} color={CX} before={formatSet(domBefore)} after={formatSet(domAfter)} rule={tf.xRule} why={tf.xWhy} />
          <AxisCard title={`RANGO — eje y ${scope}`} color={CY} before={formatSet(ranBefore)} after={formatSet(ranAfter)} rule={tf.yRule} why={tf.yWhy} />
        </div>
      </div>

      {/* control del parámetro */}
      {mode.param && (
        <div style={{ marginTop: "1em", maxWidth: 420 }}>
          <Slider
            label={mode.param.label}
            value={v}
            min={mode.param.min}
            max={mode.param.max}
            step={mode.param.step}
            onChange={(nv) => setVals((prev) => ({ ...prev, [modeId]: nv }))}
            color={mode.axis === "x" ? CX : CY}
          />
        </div>
      )}

      {/* tabla por tramo */}
      <div style={{ marginTop: "1.1em", overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.76rem" }}>
          <thead>
            <tr style={{ color: "var(--text-dim)", textAlign: "left" }}>
              <th style={{ padding: "0.4em 0.5em" }}>Tramo</th>
              <th style={{ padding: "0.4em 0.5em", color: CX }}>Dominio</th>
              <th style={{ padding: "0.4em 0.5em", color: CY }}>Rango</th>
            </tr>
          </thead>
          <tbody>
            {base.pieces.map((p, i) => {
              const d0 = formatSet([p.dom]);
              const d1 = formatSet([mapInterval(p.dom, tf.X)]);
              const r0 = formatSet([p.ran]);
              const r1 = formatSet([mapInterval(p.ran, tf.Y)]);
              return (
                <tr key={i} style={{ borderTop: "1px solid var(--panel-border)", opacity: active[i] ? 1 : 0.35 }}>
                  <td style={{ padding: "0.5em", verticalAlign: "top" }}>
                    <span style={{ color: p.color, fontWeight: 700 }}>● {p.label}</span>
                    <div style={{ fontSize: "0.72rem" }}>
                      <MathText text={`$${p.tex}$`} />
                    </div>
                  </td>
                  <td className="mono" style={{ padding: "0.5em", verticalAlign: "top" }}>
                    {d0 === d1 ? (
                      <span style={{ color: GOOD }}>{d0} · No cambia</span>
                    ) : (
                      <span>
                        <span style={{ color: "var(--text-dim)" }}>{d0} →</span> <span style={{ color: CX, fontWeight: 700 }}>{d1}</span>
                      </span>
                    )}
                  </td>
                  <td className="mono" style={{ padding: "0.5em", verticalAlign: "top" }}>
                    {r0 === r1 ? (
                      <span style={{ color: GOOD }}>{r0} · No cambia</span>
                    ) : (
                      <span>
                        <span style={{ color: "var(--text-dim)" }}>{r0} →</span> <span style={{ color: CY, fontWeight: 700 }}>{r1}</span>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </GraphPanel>
  );
}
