import { useEffect, useState } from "react";
import { useParams, useSearchParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import weeks from "../data/weeks";
import TheoryBlock from "../components/TheoryBlock";
import ExampleCard from "../components/ExampleCard";
import ExerciseCard from "../components/ExerciseCard";
import MathText from "../components/MathText";
import Quiz from "../components/quiz/Quiz";
import QuickCheck from "../components/QuickCheck";
import Flashcards from "../components/flashcards/Flashcards";
import theoryGraphRegistry from "../data/graphs/registry";
import exampleGraphRegistry from "../data/graphs/exampleRegistry";
import microChecks from "../data/microchecks";

type Tab = "teoria" | "ejemplos" | "ejercicios" | "quiz" | "flashcards";

export default function WeekPage() {
  const { slug } = useParams();
  const week = weeks.find((w) => w.slug === slug);
  const [tab, setTab] = useState<Tab>("teoria");
  const [params] = useSearchParams();
  const sec = params.get("sec");

  useEffect(() => {
    if (!sec) return;
    setTab("teoria");
    const t = setTimeout(() => document.getElementById(sec)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => clearTimeout(t);
  }, [sec, slug]);

  if (!week) return <Navigate to="/" replace />;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "teoria", label: "Teoría", count: week.theory.length },
    { id: "ejemplos", label: "Ejemplos resueltos", count: week.examples.length },
    { id: "ejercicios", label: "Ejercicios propuestos", count: week.exercises.length },
    ...(week.flashcards && week.flashcards.length > 0
      ? [{ id: "flashcards" as Tab, label: "🎴 Flashcards", count: week.flashcards.length }]
      : []),
    ...(week.quiz && week.quiz.length > 0 ? [{ id: "quiz" as Tab, label: "🧠 Quiz", count: week.quiz.length }] : []),
  ];

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.4rem 5rem" }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mono" style={{ fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.5em" }}>
          {week.number === 6 ? "MÓDULO DE RETOS" : `SEMANA ${week.number}`} · {week.dateRange} · {week.sections.join(", ")}
        </div>
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", margin: "0 0 0.5em 0", lineHeight: 1.15 }}>
          {week.title}
        </h1>
        <div style={{ color: "var(--text-dim)", lineHeight: 1.6, marginBottom: "1.8em" }}>
          <MathText text={week.summary} />
        </div>
      </motion.div>

      <div
        style={{
          display: "flex",
          gap: "0.5em",
          marginBottom: "2em",
          borderBottom: "1px solid var(--panel-border)",
          paddingBottom: "0.8em",
          flexWrap: "wrap",
        }}
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className="btn"
            style={{
              background: tab === t.id ? "linear-gradient(120deg, var(--accent), var(--accent-2))" : undefined,
              color: tab === t.id ? "#05070d" : undefined,
              border: tab === t.id ? "none" : undefined,
            }}
          >
            {t.label} <span style={{ opacity: 0.7 }}>({t.count})</span>
          </button>
        ))}
      </div>

      {tab === "teoria" && (
        <div>
          {week.theory.map((s) => (
            <div key={s.id} id={s.id} style={{ scrollMarginTop: 80 }}>
              <TheoryBlock section={s} />
              {theoryGraphRegistry[s.id]}
              {microChecks[s.id] && <QuickCheck question={microChecks[s.id]} />}
            </div>
          ))}
        </div>
      )}

      {tab === "ejemplos" && (
        <div>
          {week.examples.map((ex, i) => (
            <div key={ex.id}>
              <ExampleCard example={ex} index={i} />
              {exampleGraphRegistry[ex.id]}
            </div>
          ))}
        </div>
      )}

      {tab === "ejercicios" && (
        <div>
          {week.exercises.map((ex, i) => (
            <ExerciseCard key={ex.id} exercise={ex} index={i} />
          ))}
        </div>
      )}

      {tab === "flashcards" && week.flashcards && (
        <div>
          <div
            className="glass-panel"
            style={{ padding: "1rem 1.3rem", marginBottom: "1.2em", border: "1px solid rgba(125,252,255,0.25)" }}
          >
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-dim)" }}>
              🎴 Toca la tarjeta para ver la respuesta. Marca <strong style={{ color: "var(--text)" }}>"La sé"</strong> para
              sacarla del mazo, o <strong style={{ color: "var(--text)" }}>"Repasar de nuevo"</strong> para que vuelva más
              adelante en la ronda.
            </p>
          </div>
          <Flashcards key={week.slug} cards={week.flashcards} />
        </div>
      )}

      {tab === "quiz" && week.quiz && (
        <div>
          <div
            className="glass-panel"
            style={{ padding: "1rem 1.3rem", marginBottom: "1.2em", border: "1px solid rgba(255,209,102,0.3)" }}
          >
            <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--text-dim)" }}>
              🧠 Mini-evaluación conceptual — no es cálculo numérico, es para comprobar que entendiste las
              definiciones y teoremas de esta semana. Puedes reintentar cuantas veces quieras; se guarda tu
              mejor puntaje. <strong style={{ color: "var(--text)" }}>80% o más</strong> desbloquea la insignia de la semana.
            </p>
          </div>
          <Quiz weekSlug={week.slug} questions={week.quiz} />
        </div>
      )}
    </div>
  );
}
