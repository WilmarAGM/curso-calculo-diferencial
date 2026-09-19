import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathText from "./MathText";
import DifficultyPill from "./DifficultyPill";
import type { WorkedExample } from "../data/types";

export default function ExampleCard({ example, index }: { example: WorkedExample; index: number }) {
  const [step, setStep] = useState(0); // -1 = hidden, 0..n = steps shown

  const total = example.steps.length;
  const showing = Math.min(step, total);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.03 }}
      className="glass-panel"
      style={{ padding: "1.5rem", marginBottom: "1.2rem", position: "relative", overflow: "hidden" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 160,
          height: 160,
          background: "radial-gradient(circle, rgba(185,139,255,0.18), transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1em" }}>
        <h3 style={{ margin: "0 0 0.3em 0", fontSize: "1.1rem" }}>
          <span className="neon-text" style={{ fontWeight: 700 }}>
            Ejemplo —{" "}
          </span>
          {example.title}
        </h3>
        <DifficultyPill d={example.difficulty} />
      </div>
      {example.source && (
        <div className="mono" style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginBottom: "0.6em" }}>
          Fuente: {example.source}
        </div>
      )}
      <div style={{ marginBottom: "1em", fontSize: "0.98rem", lineHeight: 1.6 }}>
        <MathText text={example.statement} />
      </div>

      <div style={{ display: "flex", gap: "0.6em", marginBottom: "1em", flexWrap: "wrap" }}>
        <button className="btn" onClick={() => setStep((s) => Math.min(s + 1, total))} disabled={showing >= total}>
          ▶ Siguiente paso ({showing}/{total})
        </button>
        <button className="btn" onClick={() => setStep(total)} disabled={showing >= total}>
          Ver solución completa
        </button>
        {step > 0 && (
          <button className="btn" onClick={() => setStep(0)}>
            ↺ Reiniciar
          </button>
        )}
      </div>

      <AnimatePresence>
        {showing > 0 && (
          <ol style={{ paddingLeft: "1.3em", margin: 0, color: "var(--text-dim)" }}>
            {example.steps.slice(0, showing).map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                style={{ marginBottom: "0.55em", lineHeight: 1.6 }}
              >
                <MathText text={s.text} />
              </motion.li>
            ))}
          </ol>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showing >= total && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              marginTop: "1em",
              padding: "0.9em 1.1em",
              borderRadius: "12px",
              background: "linear-gradient(120deg, rgba(125,252,255,0.1), rgba(185,139,255,0.1))",
              border: "1px solid rgba(125,252,255,0.3)",
              fontWeight: 600,
            }}
          >
            <span style={{ color: "var(--accent)" }}>Respuesta final: </span>
            <MathText text={example.answer} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
