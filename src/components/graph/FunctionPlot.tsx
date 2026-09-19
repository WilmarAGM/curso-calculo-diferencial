import { useMemo, useState } from "react";
import type { PlotCurve, PlotRegion, PlotPoint, PlotAsymptote } from "./plotMath";
import { sampleFn, ticksFor } from "./plotMath";

export interface FunctionPlotProps {
  xRange: [number, number];
  yRange: [number, number];
  curves?: PlotCurve[];
  regions?: PlotRegion[];
  points?: PlotPoint[];
  asymptotes?: PlotAsymptote[];
  height?: number;
  caption?: string;
  showGrid?: boolean;
}

const W = 480;
const PAD = 30;

export default function FunctionPlot({
  xRange,
  yRange,
  curves = [],
  regions = [],
  points = [],
  asymptotes = [],
  height = 300,
  caption,
  showGrid = true,
}: FunctionPlotProps) {
  const H = height;
  const [xMin, xMax] = xRange;
  const [yMin, yMax] = yRange;
  const [hover, setHover] = useState<{ x: number; y: number } | null>(null);

  const px = (x: number) => PAD + ((x - xMin) / (xMax - xMin)) * (W - 2 * PAD);
  const py = (y: number) => H - PAD - ((y - yMin) / (yMax - yMin)) * (H - 2 * PAD);

  const xTicks = useMemo(() => ticksFor(xMin, xMax), [xMin, xMax]);
  const yTicks = useMemo(() => ticksFor(yMin, yMax), [yMin, yMax]);

  const curvePaths = useMemo(() => {
    return curves.map((curve) => {
      const segPaths = curve.segments.map((seg) => {
        const pts = sampleFn(seg.fn, seg.domain, yRange);
        let d = "";
        let drawing = false;
        for (const p of pts) {
          if (!p) {
            drawing = false;
            continue;
          }
          const cmd = drawing ? "L" : "M";
          d += `${cmd}${px(p.x).toFixed(2)},${py(p.y).toFixed(2)} `;
          drawing = true;
        }
        const first = pts.find((p) => p !== null) as { x: number; y: number } | undefined;
        const rev = [...pts].reverse();
        const last = rev.find((p) => p !== null) as { x: number; y: number } | undefined;
        return { d, first, last, seg };
      });
      return { curve, segPaths };
    });
  }, [curves, xMin, xMax, yMin, yMax]);

  const regionPaths = useMemo(() => {
    return regions.map((r) => {
      const pts = sampleFn(r.fn, r.domain, yRange).filter(Boolean) as { x: number; y: number }[];
      if (pts.length === 0) return "";
      const base = r.baseline ?? 0;
      let d = `M${px(pts[0].x).toFixed(2)},${py(base).toFixed(2)} `;
      d += pts.map((p) => `L${px(p.x).toFixed(2)},${py(p.y).toFixed(2)}`).join(" ");
      d += ` L${px(pts[pts.length - 1].x).toFixed(2)},${py(base).toFixed(2)} Z`;
      return d;
    });
  }, [regions, xMin, xMax, yMin, yMax]);

  return (
    <div style={{ width: "100%" }}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto", display: "block", overflow: "hidden" }}
        onMouseMove={(e) => {
          const svg = e.currentTarget;
          const rect = svg.getBoundingClientRect();
          const relX = ((e.clientX - rect.left) / rect.width) * W;
          const dataX = xMin + ((relX - PAD) / (W - 2 * PAD)) * (xMax - xMin);
          if (dataX < xMin || dataX > xMax) {
            setHover(null);
            return;
          }
          const first = curves[0]?.segments.find((s) => dataX >= s.domain[0] && dataX <= s.domain[1]);
          if (!first) {
            setHover(null);
            return;
          }
          try {
            setHover({ x: dataX, y: first.fn(dataX) });
          } catch {
            setHover(null);
          }
        }}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="regionGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        <rect x={0} y={0} width={W} height={H} fill="rgba(255,255,255,0.015)" rx={10} />

        {showGrid &&
          xTicks.map((t) => (
            <line
              key={`gx${t}`}
              x1={px(t)}
              x2={px(t)}
              y1={PAD}
              y2={H - PAD}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          ))}
        {showGrid &&
          yTicks.map((t) => (
            <line
              key={`gy${t}`}
              x1={PAD}
              x2={W - PAD}
              y1={py(t)}
              y2={py(t)}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          ))}

        {/* asymptotes */}
        {asymptotes.map((a, i) =>
          a.type === "v" ? (
            <line
              key={`av${i}`}
              x1={px(a.value)}
              x2={px(a.value)}
              y1={PAD}
              y2={H - PAD}
              stroke="var(--accent-3)"
              strokeWidth={1.4}
              strokeDasharray="5,4"
              opacity={0.7}
            />
          ) : (
            <line
              key={`ah${i}`}
              x1={PAD}
              x2={W - PAD}
              y1={py(a.value)}
              y2={py(a.value)}
              stroke="var(--accent-3)"
              strokeWidth={1.4}
              strokeDasharray="5,4"
              opacity={0.7}
            />
          )
        )}

        {/* axes */}
        {yMin <= 0 && yMax >= 0 && (
          <line x1={PAD} x2={W - PAD} y1={py(0)} y2={py(0)} stroke="rgba(232,236,255,0.35)" strokeWidth={1.4} />
        )}
        {xMin <= 0 && xMax >= 0 && (
          <line x1={px(0)} x2={px(0)} y1={PAD} y2={H - PAD} stroke="rgba(232,236,255,0.35)" strokeWidth={1.4} />
        )}

        {/* tick labels */}
        {xTicks.map((t) =>
          Math.abs(t) > 1e-9 ? (
            <text key={`tx${t}`} x={px(t)} y={py(0) + 13} fontSize={9} textAnchor="middle" fill="var(--text-dim)">
              {t}
            </text>
          ) : null
        )}
        {yTicks.map((t) =>
          Math.abs(t) > 1e-9 ? (
            <text key={`ty${t}`} x={px(0) - 6} y={py(t) + 3} fontSize={9} textAnchor="end" fill="var(--text-dim)">
              {t}
            </text>
          ) : null
        )}

        {/* shaded regions */}
        {regionPaths.map((d, i) => (
          <path key={i} d={d} fill={regions[i].color === "auto" ? "url(#regionGrad)" : regions[i].color} opacity={regions[i].opacity ?? 1} stroke="none" />
        ))}

        {/* curves */}
        {curvePaths.map(({ curve, segPaths }) =>
          segPaths.map((sp, i) => (
            <g key={`${curve.id}-${i}`}>
              <path
                d={sp.d}
                fill="none"
                stroke={curve.color}
                strokeWidth={curve.strokeWidth ?? 2.6}
                strokeDasharray={curve.dashed ? "6,5" : undefined}
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: `drop-shadow(0 0 4px ${curve.color}66)` }}
              />
              {sp.seg.openLeft && sp.first && (
                <circle cx={px(sp.first.x)} cy={py(sp.first.y)} r={3.6} fill="var(--bg)" stroke={curve.color} strokeWidth={2} />
              )}
              {sp.seg.openRight && sp.last && (
                <circle cx={px(sp.last.x)} cy={py(sp.last.y)} r={3.6} fill="var(--bg)" stroke={curve.color} strokeWidth={2} />
              )}
              {!sp.seg.openLeft && sp.first && sp.seg.domain[0] > xMin - 1e-9 && sp.seg.domain[0] < xMax + 1e-9 && (
                <circle cx={px(sp.first.x)} cy={py(sp.first.y)} r={3} fill={curve.color} />
              )}
              {!sp.seg.openRight && sp.last && sp.seg.domain[1] > xMin - 1e-9 && sp.seg.domain[1] < xMax + 1e-9 && (
                <circle cx={px(sp.last.x)} cy={py(sp.last.y)} r={3} fill={curve.color} />
              )}
            </g>
          ))
        )}

        {/* explicit points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={px(p.x)}
              cy={py(p.y)}
              r={4}
              fill={p.hollow ? "var(--bg)" : p.color ?? "var(--accent)"}
              stroke={p.color ?? "var(--accent)"}
              strokeWidth={2}
            />
            {p.label && (
              <text x={px(p.x) + 7} y={py(p.y) - 7} fontSize={10} fill={p.color ?? "var(--accent)"}>
                {p.label}
              </text>
            )}
          </g>
        ))}

        {/* hover crosshair */}
        {hover && (
          <g>
            <circle cx={px(hover.x)} cy={py(hover.y)} r={4} fill="#fff" stroke="var(--accent)" strokeWidth={2} />
            <text x={px(hover.x) + (px(hover.x) > W * 0.65 ? -8 : 8)} y={Math.max(py(hover.y) - 8, 12)} textAnchor={px(hover.x) > W * 0.65 ? "end" : "start"} fontSize={10} fill="var(--text)" className="mono">
              ({hover.x.toFixed(2)}, {hover.y.toFixed(2)})
            </text>
          </g>
        )}

        <rect x={PAD} y={PAD} width={W - 2 * PAD} height={H - 2 * PAD} fill="none" stroke="rgba(255,255,255,0.08)" rx={4} />
      </svg>
      {caption && (
        <div className="mono" style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.5em", textAlign: "center" }}>
          {caption}
        </div>
      )}
    </div>
  );
}

export type { PlotCurve, PlotRegion, PlotPoint, PlotAsymptote };
