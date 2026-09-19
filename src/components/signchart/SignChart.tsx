import { Fragment } from "react";
import MathText from "../MathText";

export interface SignSegment {
  from: number;
  to: number;
  sign: "pos" | "neg" | "undefined";
}
export interface DomainSegment {
  from: number;
  to: number;
  inDomain: boolean;
}
export interface SolutionSegment {
  from: number;
  to: number;
  closedLeft: boolean;
  closedRight: boolean;
}
export interface CriticalPoint {
  x: number;
  label: string;
  excluded?: boolean;
}

type XRange = [number, number];

const SIGN_STYLE = {
  pos: { bg: "rgba(109,255,176,0.16)", border: "rgba(109,255,176,0.55)", text: "var(--accent-good)", symbol: "+" },
  neg: { bg: "rgba(255,95,182,0.16)", border: "rgba(255,95,182,0.55)", text: "var(--accent-3)", symbol: "−" },
  undefined: { bg: "rgba(255,255,255,0.025)", border: "rgba(255,255,255,0.08)", text: "var(--text-dim)", symbol: "∅" },
};

function pct(x: number, [min, max]: XRange) {
  return Math.max(0, Math.min(100, ((x - min) / (max - min)) * 100));
}

export function AxisRow({ xRange, criticalPoints }: { xRange: XRange; criticalPoints: CriticalPoint[] }) {
  return (
    <div style={{ position: "relative", height: 34, marginBottom: 2 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: 4, height: 1, background: "rgba(255,255,255,0.18)" }} />
      {criticalPoints.map((cp) => (
        <div
          key={cp.x}
          style={{
            position: "absolute",
            left: `${pct(cp.x, xRange)}%`,
            top: -2,
            transform: "translateX(-50%)",
            textAlign: "center",
            width: 60,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              margin: "0 auto",
              borderRadius: "50%",
              background: cp.excluded ? "var(--bg)" : "var(--text-dim)",
              border: "1.5px solid var(--text-dim)",
            }}
          />
          <div className="mono" style={{ fontSize: "0.65rem", color: "var(--text-dim)", marginTop: 2, whiteSpace: "nowrap" }}>
            {cp.label}
          </div>
        </div>
      ))}
    </div>
  );
}

export function SegmentRow({ xRange, segments, height = 30 }: { xRange: XRange; segments: SignSegment[]; height?: number }) {
  return (
    <div style={{ position: "relative", height, borderRadius: 6, overflow: "hidden" }}>
      {segments.map((seg, i) => {
        const s = SIGN_STYLE[seg.sign];
        const left = pct(seg.from, xRange);
        const width = pct(seg.to, xRange) - left;
        if (width <= 0) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              width: `${width}%`,
              top: 0,
              bottom: 0,
              background: s.bg,
              borderLeft: `1px solid ${s.border}`,
              borderRight: i === segments.length - 1 ? `1px solid ${s.border}` : undefined,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: s.text,
              fontWeight: 800,
              fontSize: "0.95rem",
            }}
          >
            {s.symbol}
          </div>
        );
      })}
    </div>
  );
}

export function DomainRow({ xRange, segments }: { xRange: XRange; segments: DomainSegment[] }) {
  return (
    <div style={{ position: "relative", height: 26, borderRadius: 6, overflow: "hidden" }}>
      {segments.map((seg, i) => {
        const left = pct(seg.from, xRange);
        const width = pct(seg.to, xRange) - left;
        if (width <= 0) return null;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              width: `${width}%`,
              top: 0,
              bottom: 0,
              background: seg.inDomain ? "rgba(125,252,255,0.14)" : "repeating-linear-gradient(45deg, rgba(255,255,255,0.03), rgba(255,255,255,0.03) 4px, transparent 4px, transparent 8px)",
              borderLeft: "1px solid rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.68rem",
              color: seg.inDomain ? "var(--accent)" : "var(--text-dim)",
            }}
            className="mono"
          >
            {seg.inDomain ? "dominio" : "—"}
          </div>
        );
      })}
    </div>
  );
}

export function SolutionRow({ xRange, segments }: { xRange: XRange; segments: SolutionSegment[] }) {
  return (
    <div style={{ position: "relative", height: 34 }}>
      <div style={{ position: "absolute", left: 0, right: 0, top: "50%", height: 1, background: "rgba(255,255,255,0.1)" }} />
      {segments.map((seg, i) => {
        const left = pct(seg.from, xRange);
        const width = pct(seg.to, xRange) - left;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              width: `${width}%`,
              top: "50%",
              height: 8,
              transform: "translateY(-50%)",
              background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
              borderRadius: 4,
              boxShadow: "0 0 12px rgba(125,252,255,0.5)",
            }}
          />
        );
      })}
      {segments.map((seg, i) => (
        <Fragment key={i}>
          <div
            style={{
              position: "absolute",
              left: `${pct(seg.from, xRange)}%`,
              top: "50%",
              width: 11,
              height: 11,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: seg.closedLeft ? "var(--accent)" : "var(--bg)",
              border: "2px solid var(--accent)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${pct(seg.to, xRange)}%`,
              top: "50%",
              width: 11,
              height: 11,
              transform: "translate(-50%, -50%)",
              borderRadius: "50%",
              background: seg.closedRight ? "var(--accent)" : "var(--bg)",
              border: "2px solid var(--accent)",
            }}
          />
        </Fragment>
      ))}
    </div>
  );
}

export function RowLabel({ tex }: { tex: string }) {
  return (
    <div style={{ minWidth: 96, fontSize: "0.85rem", color: "var(--text-dim)", display: "flex", alignItems: "center" }}>
      {tex && <MathText text={`$${tex}$`} />}
    </div>
  );
}
