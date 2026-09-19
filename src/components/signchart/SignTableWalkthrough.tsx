import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathText from "../MathText";
import { AxisRow, DomainRow, SegmentRow, SolutionRow, RowLabel } from "./SignChart";
import type { SignSegment, DomainSegment, SolutionSegment, CriticalPoint } from "./SignChart";

export interface SignFactorRow {
  id: string;
  label: string; // KaTeX label for the factor
  note: string; // explanation shown when revealed
  segments: SignSegment[];
}

export interface SignTableExample {
  title: string;
  inequalityTex: string;
  xRange: [number, number];
  criticalPoints: CriticalPoint[];
  domainNote: string;
  domainSegments: DomainSegment[];
  rows: SignFactorRow[];
  productNote: string;
  productSegments: SignSegment[];
  solutionNote: string;
  solutionSegments: SolutionSegment[];
  solutionText: string;
}

export default function SignTableWalkthrough({ example }: { example: SignTableExample }) {
  // step 0 = only domain shown; step 1..rows.length = rows revealed one by one;
  // step rows.length+1 = product row; step rows.length+2 = solution
  const [step, setStep] = useState(0);
  const maxStep = example.rows.length + 2;

  const currentNote =
    step === 0
      ? example.domainNote
      : step <= example.rows.length
      ? example.rows[step - 1].note
      : step === example.rows.length + 1
      ? example.productNote
      : example.solutionNote;

  return (
    <div className="glass-panel" style={{ padding: "1.4rem", margin: "0.6rem 0 1.4rem", border: "1px solid rgba(125,252,255,0.2)" }}>
      <div className="mono" style={{ fontSize: "0.7rem", color: "var(--accent)", marginBottom: "0.4em", letterSpacing: "0.05em" }}>
        📏 RECORRIDO INTERACTIVO — MÉTODO DE LA TABLA DE SIGNOS
      </div>
      <h4 style={{ margin: "0 0 0.5em 0", fontSize: "1rem" }}>{example.title}</h4>
      <div style={{ textAlign: "center", fontSize: "1.05rem", margin: "0.8em 0 1.4em" }}>
        <MathText text={`$${example.inequalityTex}$`} />
      </div>

      <div style={{ overflowX: "auto", paddingBottom: "0.4em" }}>
        <div style={{ minWidth: 480 }}>
          <div style={{ display: "flex", gap: "0.8em" }}>
            <RowLabel tex="" />
            <div style={{ flex: 1 }}>
              <AxisRow xRange={example.xRange} criticalPoints={example.criticalPoints} />
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.8em", alignItems: "center", marginBottom: "0.5em" }}>
            <RowLabel tex="\text{dominio}" />
            <div style={{ flex: 1 }}>
              <DomainRow xRange={example.xRange} segments={example.domainSegments} />
            </div>
          </div>

          <AnimatePresence>
            {example.rows.slice(0, step).map((row) => (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.3 }}
                style={{ display: "flex", gap: "0.8em", alignItems: "center", marginBottom: "0.5em", overflow: "hidden" }}
              >
                <RowLabel tex={row.label} />
                <div style={{ flex: 1 }}>
                  <SegmentRow xRange={example.xRange} segments={row.segments} />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <AnimatePresence>
            {step > example.rows.length && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{ display: "flex", gap: "0.8em", alignItems: "center", marginTop: "0.6em", marginBottom: "0.5em", overflow: "hidden", borderTop: "1px dashed var(--panel-border)", paddingTop: "0.6em" }}
              >
                <RowLabel tex="\text{producto}" />
                <div style={{ flex: 1 }}>
                  <SegmentRow xRange={example.xRange} segments={example.productSegments} height={34} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {step >= maxStep && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{ display: "flex", gap: "0.8em", alignItems: "center", overflow: "hidden" }}
              >
                <RowLabel tex="\text{solución}" />
                <div style={{ flex: 1 }}>
                  <SolutionRow xRange={example.xRange} segments={example.solutionSegments} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          style={{
            marginTop: "1.2em",
            padding: "0.8em 1em",
            borderRadius: 12,
            background: "rgba(125,252,255,0.05)",
            border: "1px solid rgba(125,252,255,0.18)",
            fontSize: "0.88rem",
            lineHeight: 1.6,
            color: "var(--text-dim)",
          }}
        >
          <MathText text={currentNote} />
        </motion.div>
      </AnimatePresence>

      {step >= maxStep && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            marginTop: "0.8em",
            padding: "0.7em 1em",
            borderRadius: 12,
            background: "linear-gradient(120deg, rgba(125,252,255,0.1), rgba(185,139,255,0.1))",
            border: "1px solid rgba(125,252,255,0.3)",
            fontWeight: 600,
          }}
        >
          <span style={{ color: "var(--accent)" }}>Solución: </span>
          <MathText text={`$${example.solutionText}$`} />
        </motion.div>
      )}

      <div style={{ display: "flex", gap: "0.6em", marginTop: "1.1em" }}>
        <button className="btn btn-primary" onClick={() => setStep((s) => Math.min(s + 1, maxStep))} disabled={step >= maxStep}>
          {step === 0
            ? "▶ Mostrar primer factor"
            : step < example.rows.length
            ? "▶ Siguiente factor"
            : step === example.rows.length
            ? "▶ Multiplicar signos"
            : step === example.rows.length + 1
            ? "▶ Sombrear solución"
            : "✓ Completo"}
        </button>
        {step > 0 && (
          <button className="btn" onClick={() => setStep(0)}>
            ↺ Reiniciar
          </button>
        )}
      </div>
    </div>
  );
}
