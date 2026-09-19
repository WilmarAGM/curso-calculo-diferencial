import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathText from "./MathText";
import DifficultyPill from "./DifficultyPill";
import type { Exercise } from "../data/types";
import { useProgress } from "../hooks/useProgress";

export default function ExerciseCard({ exercise, index }: { exercise: Exercise; index: number }) {
  const [revealed, setRevealed] = useState(false);
  const { isDone, toggle } = useProgress();
  const done = isDone(exercise.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.03 }}
      className="glass-panel"
      style={{
        padding: "1.4rem",
        marginBottom: "1rem",
        border: done ? "1px solid rgba(109,255,176,0.45)" : undefined,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1em" }}>
        <h4 style={{ margin: "0 0 0.3em 0", fontSize: "1.02rem" }}>
          Ejercicio {index + 1} — {exercise.title}
        </h4>
        <DifficultyPill d={exercise.difficulty} />
      </div>
      {exercise.source && (
        <div className="mono" style={{ fontSize: "0.7rem", color: "var(--text-dim)", marginBottom: "0.5em" }}>
          Fuente: {exercise.source}
        </div>
      )}
      <div style={{ marginBottom: "0.9em", lineHeight: 1.6 }}>
        <MathText text={exercise.statement} />
      </div>

      <div style={{ display: "flex", gap: "0.6em", flexWrap: "wrap", alignItems: "center" }}>
        <button className="btn btn-primary" onClick={() => setRevealed((r) => !r)}>
          {revealed ? "Ocultar solución" : "Ver solución paso a paso"}
        </button>
        <label
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5em",
            fontSize: "0.85rem",
            color: done ? "var(--accent-good)" : "var(--text-dim)",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <input type="checkbox" checked={done} onChange={() => toggle(exercise.id)} style={{ accentColor: "#6dffb0" }} />
          {done ? "Resuelto ✓" : "Marcar como resuelto"}
        </label>
      </div>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: "hidden" }}
          >
            <ol style={{ paddingLeft: "1.3em", margin: "1em 0 0 0", color: "var(--text-dim)" }}>
              {exercise.steps.map((s, i) => (
                <li key={i} style={{ marginBottom: "0.5em", lineHeight: 1.6 }}>
                  <MathText text={s.text} />
                </li>
              ))}
            </ol>
            <div
              style={{
                marginTop: "0.8em",
                padding: "0.8em 1em",
                borderRadius: "12px",
                background: "rgba(109,255,176,0.08)",
                border: "1px solid rgba(109,255,176,0.3)",
                fontWeight: 600,
              }}
            >
              <span style={{ color: "var(--accent-good)" }}>Respuesta: </span>
              <MathText text={exercise.answer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
