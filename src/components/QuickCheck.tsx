import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathText from "./MathText";
import type { QuizQuestion } from "../data/types";

function normalize(s: string) {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

/** Micro-chequeo inline de una sola pregunta, insertado dentro de la teoría como pausa activa. */
export default function QuickCheck({ question }: { question: QuizQuestion }) {
  const [answer, setAnswer] = useState<number | boolean | string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [fillDraft, setFillDraft] = useState("");

  const correct =
    question.type === "mc"
      ? answer === question.correctIndex
      : question.type === "tf"
      ? answer === question.correctBool
      : question.type === "fill"
      ? (question.correctText ?? []).some((t) => normalize(t) === normalize(String(answer ?? "")))
      : false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.35 }}
      style={{
        margin: "0.4rem 0 1.4rem",
        padding: "1.1rem 1.3rem",
        borderRadius: 16,
        background: "linear-gradient(135deg, rgba(255,209,102,0.06), rgba(255,95,182,0.05))",
        border: "1px dashed rgba(255,209,102,0.35)",
      }}
    >
      <div className="mono" style={{ fontSize: "0.68rem", color: "var(--accent-warn)", marginBottom: "0.6em", letterSpacing: "0.05em" }}>
        ⚡ CHEQUEO RÁPIDO — ¿ENTENDISTE?
      </div>
      <div style={{ fontSize: "0.94rem", marginBottom: "0.9em", lineHeight: 1.55 }}>
        <MathText text={question.prompt} />
      </div>

      {question.type === "mc" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}>
          {question.options!.map((opt, i) => {
            const isSelected = answer === i;
            const isRight = i === question.correctIndex;
            let bg = "rgba(255,255,255,0.03)";
            let border = "var(--panel-border)";
            if (revealed && isRight) {
              bg = "rgba(109,255,176,0.12)";
              border = "rgba(109,255,176,0.5)";
            } else if (revealed && isSelected && !isRight) {
              bg = "rgba(255,95,182,0.12)";
              border = "rgba(255,95,182,0.5)";
            } else if (!revealed && isSelected) {
              bg = "rgba(125,252,255,0.1)";
              border = "var(--accent)";
            }
            return (
              <button
                key={i}
                disabled={revealed}
                onClick={() => setAnswer(i)}
                style={{
                  textAlign: "left",
                  padding: "0.55em 0.85em",
                  borderRadius: 10,
                  background: bg,
                  border: `1px solid ${border}`,
                  color: "var(--text)",
                  cursor: revealed ? "default" : "pointer",
                  fontFamily: "inherit",
                  fontSize: "0.86rem",
                }}
              >
                <MathText text={opt} />
              </button>
            );
          })}
        </div>
      )}

      {question.type === "tf" && (
        <div style={{ display: "flex", gap: "0.6em" }}>
          {[true, false].map((v) => {
            const isSelected = answer === v;
            const isRight = v === question.correctBool;
            let bg = "rgba(255,255,255,0.03)";
            let border = "var(--panel-border)";
            if (revealed && isRight) {
              bg = "rgba(109,255,176,0.12)";
              border = "rgba(109,255,176,0.5)";
            } else if (revealed && isSelected && !isRight) {
              bg = "rgba(255,95,182,0.12)";
              border = "rgba(255,95,182,0.5)";
            } else if (!revealed && isSelected) {
              bg = "rgba(125,252,255,0.1)";
              border = "var(--accent)";
            }
            return (
              <button
                key={String(v)}
                disabled={revealed}
                onClick={() => setAnswer(v)}
                style={{
                  flex: 1,
                  padding: "0.55em",
                  borderRadius: 10,
                  background: bg,
                  border: `1px solid ${border}`,
                  color: "var(--text)",
                  cursor: revealed ? "default" : "pointer",
                  fontWeight: 700,
                  fontFamily: "inherit",
                  fontSize: "0.86rem",
                }}
              >
                {v ? "Verdadero" : "Falso"}
              </button>
            );
          })}
        </div>
      )}

      {question.type === "fill" && (
        <input
          type="text"
          value={revealed ? String(answer ?? "") : fillDraft}
          onChange={(e) => {
            setFillDraft(e.target.value);
            setAnswer(e.target.value);
          }}
          disabled={revealed}
          placeholder="Escribe tu respuesta…"
          style={{
            width: "100%",
            padding: "0.6em 0.85em",
            borderRadius: 10,
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${revealed ? (correct ? "rgba(109,255,176,0.5)" : "rgba(255,95,182,0.5)") : "var(--panel-border)"}`,
            color: "var(--text)",
            fontFamily: "inherit",
            fontSize: "0.86rem",
          }}
        />
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} style={{ overflow: "hidden" }}>
            <div
              style={{
                marginTop: "0.8em",
                padding: "0.6em 0.9em",
                borderRadius: 10,
                background: correct ? "rgba(109,255,176,0.08)" : "rgba(255,95,182,0.08)",
                fontSize: "0.84rem",
                color: "var(--text-dim)",
              }}
            >
              <span style={{ fontWeight: 700, color: correct ? "var(--accent-good)" : "var(--accent-3)" }}>
                {correct ? "✓ Correcto — " : "✗ No exactamente — "}
                {question.type === "fill" && !correct && `(era "${question.correctText?.[0]}") `}
              </span>
              <MathText text={question.explanation} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!revealed && (
        <button
          className="btn"
          style={{ marginTop: "0.9em", fontSize: "0.78rem" }}
          onClick={() => setRevealed(true)}
          disabled={answer === null || (question.type === "fill" && fillDraft === "")}
        >
          Comprobar
        </button>
      )}
    </motion.div>
  );
}
