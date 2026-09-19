import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathText from "../MathText";
import { useQuizScores } from "../../hooks/useQuizScores";
import type { QuizQuestion } from "../../data/types";

function normalize(s: string) {
  return s
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, ""); // strip accents
}

function isCorrect(q: QuizQuestion, answer: string | number | boolean | null): boolean {
  if (answer === null) return false;
  if (q.type === "mc") return answer === q.correctIndex;
  if (q.type === "tf") return answer === q.correctBool;
  if (q.type === "fill") return (q.correctText ?? []).some((t) => normalize(t) === normalize(String(answer)));
  return false;
}

export default function Quiz({ weekSlug, questions }: { weekSlug: string; questions: QuizQuestion[] }) {
  const { bestScore, submitScore } = useQuizScores();
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<(string | number | boolean | null)[]>(() => questions.map(() => null));
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);
  const [fillDraft, setFillDraft] = useState("");

  const q = questions[idx];
  const total = questions.length;
  const previousBest = bestScore(weekSlug);

  const scorePercent = useMemo(() => {
    const correct = questions.filter((qq, i) => isCorrect(qq, answers[i])).length;
    return Math.round((correct / total) * 100);
  }, [answers, questions, total]);

  function selectAnswer(val: string | number | boolean) {
    if (revealed) return;
    setAnswers((prev) => prev.map((a, i) => (i === idx ? val : a)));
  }

  function check() {
    setRevealed(true);
  }

  function next() {
    if (idx + 1 >= total) {
      const correct = questions.filter((qq, i) => isCorrect(qq, answers[i])).length;
      const pct = Math.round((correct / total) * 100);
      submitScore(weekSlug, pct);
      setFinished(true);
      return;
    }
    setIdx((i) => i + 1);
    setRevealed(false);
    setFillDraft("");
  }

  function restart() {
    setIdx(0);
    setAnswers(questions.map(() => null));
    setRevealed(false);
    setFinished(false);
    setFillDraft("");
  }

  if (finished) {
    const passed = scorePercent >= 80;
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: "2rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.2em" }}>{passed ? "🏆" : "📘"}</div>
        <h2 style={{ margin: "0 0 0.3em 0" }}>
          {passed ? "¡Dominado!" : "Sigue practicando"} — {scorePercent}%
        </h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "1.2em" }}>
          {questions.filter((qq, i) => isCorrect(qq, answers[i])).length} de {total} correctas.
          {passed
            ? " Superaste el umbral de dominio (80%)."
            : " Necesitas 80% para desbloquear la insignia de esta semana."}
        </p>
        <div style={{ display: "flex", gap: "0.6em", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={restart}>
            ↺ Reintentar
          </button>
        </div>
        {previousBest !== null && (
          <div className="mono" style={{ fontSize: "0.75rem", color: "var(--text-dim)", marginTop: "1.2em" }}>
            Mejor puntaje guardado: {Math.max(previousBest, scorePercent)}%
          </div>
        )}
      </motion.div>
    );
  }

  const answer = answers[idx];
  const correct = isCorrect(q, answer);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8em" }}>
        <div className="mono" style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
          Pregunta {idx + 1} / {total}
        </div>
        {previousBest !== null && (
          <div className="mono" style={{ fontSize: "0.72rem", color: "var(--accent-good)" }}>
            Mejor puntaje: {previousBest}%
          </div>
        )}
      </div>
      <div style={{ height: 6, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: "1.4em" }}>
        <div
          style={{
            height: "100%",
            width: `${((idx + (revealed ? 1 : 0)) / total) * 100}%`,
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
            transition: "width 0.35s ease",
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.id}
          initial={{ opacity: 0, x: 14 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -14 }}
          transition={{ duration: 0.25 }}
          className="glass-panel"
          style={{ padding: "1.5rem" }}
        >
          <div style={{ fontSize: "1.05rem", marginBottom: "1.2em", lineHeight: 1.6 }}>
            <MathText text={q.prompt} />
          </div>

          {q.type === "mc" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6em" }}>
              {q.options!.map((opt, i) => {
                const isSelected = answer === i;
                const isRight = i === q.correctIndex;
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
                    onClick={() => selectAnswer(i)}
                    disabled={revealed}
                    style={{
                      textAlign: "left",
                      padding: "0.7em 1em",
                      borderRadius: 12,
                      background: bg,
                      border: `1px solid ${border}`,
                      color: "var(--text)",
                      cursor: revealed ? "default" : "pointer",
                      fontFamily: "inherit",
                      fontSize: "0.94rem",
                    }}
                  >
                    <MathText text={opt} />
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "tf" && (
            <div style={{ display: "flex", gap: "0.8em" }}>
              {[true, false].map((v) => {
                const isSelected = answer === v;
                const isRight = v === q.correctBool;
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
                    onClick={() => selectAnswer(v)}
                    disabled={revealed}
                    style={{
                      flex: 1,
                      padding: "0.9em",
                      borderRadius: 12,
                      background: bg,
                      border: `1px solid ${border}`,
                      color: "var(--text)",
                      cursor: revealed ? "default" : "pointer",
                      fontWeight: 700,
                      fontFamily: "inherit",
                    }}
                  >
                    {v ? "Verdadero" : "Falso"}
                  </button>
                );
              })}
            </div>
          )}

          {q.type === "fill" && (
            <input
              type="text"
              value={revealed ? String(answer ?? "") : fillDraft}
              onChange={(e) => {
                setFillDraft(e.target.value);
                selectAnswer(e.target.value);
              }}
              disabled={revealed}
              placeholder="Escribe tu respuesta…"
              style={{
                width: "100%",
                padding: "0.8em 1em",
                borderRadius: 12,
                background: "rgba(255,255,255,0.04)",
                border: `1px solid ${revealed ? (correct ? "rgba(109,255,176,0.5)" : "rgba(255,95,182,0.5)") : "var(--panel-border)"}`,
                color: "var(--text)",
                fontFamily: "inherit",
                fontSize: "0.94rem",
              }}
            />
          )}

          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                style={{ overflow: "hidden" }}
              >
                <div
                  style={{
                    marginTop: "1em",
                    padding: "0.8em 1em",
                    borderRadius: 12,
                    background: correct ? "rgba(109,255,176,0.08)" : "rgba(255,95,182,0.08)",
                    border: `1px solid ${correct ? "rgba(109,255,176,0.3)" : "rgba(255,95,182,0.3)"}`,
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: "0.3em", color: correct ? "var(--accent-good)" : "var(--accent-3)" }}>
                    {correct ? "✓ Correcto" : "✗ Incorrecto"}
                    {q.type === "fill" && !correct && <span style={{ fontWeight: 400 }}> — respuesta esperada: {q.correctText?.[0]}</span>}
                  </div>
                  <div style={{ color: "var(--text-dim)", lineHeight: 1.6, fontSize: "0.9rem" }}>
                    <MathText text={q.explanation} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ marginTop: "1.2em" }}>
            {!revealed ? (
              <button className="btn btn-primary" onClick={check} disabled={answer === null || (q.type === "fill" && fillDraft === "")}>
                Comprobar
              </button>
            ) : (
              <button className="btn btn-primary" onClick={next}>
                {idx + 1 >= total ? "Ver resultado →" : "Siguiente →"}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
