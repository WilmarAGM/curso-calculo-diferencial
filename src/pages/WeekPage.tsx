import { useEffect, useState } from "react";
import { useParams, useSearchParams, Navigate, Link, useNavigate } from "react-router-dom";
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

type Tab = "teoria" | "ejemplos" | "ejercicios" | "flashcards" | "quiz";

export default function WeekPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const weekIndex = weeks.findIndex((w) => w.slug === slug);
  const week = weeks[weekIndex];

  const [tab, setTab] = useState<Tab>("teoria");
  const [params] = useSearchParams();
  const sec = params.get("sec");

  useEffect(() => {
    // Al cambiar de semana, reseteamos a la pestaña de teoría
    setTab("teoria");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  useEffect(() => {
    if (!sec) return;
    setTab("teoria");
    const t = setTimeout(() => document.getElementById(sec)?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    return () => clearTimeout(t);
  }, [sec, slug]);

  if (!week) return <Navigate to="/" replace />;

  const prevWeek = weekIndex > 0 ? weeks[weekIndex - 1] : null;
  const nextWeek = weekIndex < weeks.length - 1 ? weeks[weekIndex + 1] : null;

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "teoria", label: "Teoría", count: week.theory.length },
    { id: "ejemplos", label: "Ejemplos resueltos", count: week.examples.length },
    { id: "ejercicios", label: "Ejercicios propuestos", count: week.exercises.length },
    ...(week.flashcards && week.flashcards.length > 0
      ? [{ id: "flashcards" as Tab, label: "🎴 Flashcards", count: week.flashcards.length }]
      : []),
    ...(week.quiz && week.quiz.length > 0 ? [{ id: "quiz" as Tab, label: "🧠 Quiz", count: week.quiz.length }] : []),
  ];

  // Función para cambiar de pestaña y hacer scroll suave hacia los controles
  const changeTab = (newTab: Tab) => {
    setTab(newTab);
    const tabsElem = document.getElementById("week-tabs-bar");
    if (tabsElem) {
      tabsElem.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div style={{ maxWidth: 920, margin: "0 auto", padding: "1.8rem 1.4rem 6rem" }}>
      {/* 🚀 BARRA DE NAVEGACIÓN RÁPIDA DE SEMANAS (Selector superior) */}
      <div
        className="glass-panel"
        style={{
          padding: "0.6rem 1rem",
          marginBottom: "1.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "0.6rem",
          borderRadius: "14px",
          border: "1px solid rgba(125, 252, 255, 0.25)",
          background: "rgba(10, 16, 30, 0.7)",
        }}
      >
        <button
          onClick={() => prevWeek && navigate(`/semana/${prevWeek.slug}`)}
          disabled={!prevWeek}
          className="btn"
          style={{
            padding: "0.35em 0.8em",
            fontSize: "0.8rem",
            opacity: prevWeek ? 1 : 0.3,
            cursor: prevWeek ? "pointer" : "default",
          }}
        >
          ← {prevWeek ? (prevWeek.number === 6 ? "Retos" : `Sem ${prevWeek.number}`) : "Inicio"}
        </button>

        {/* Listado de accesos directos a cada semana */}
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", justifyContent: "center" }}>
          {weeks.map((w) => {
            const isActive = w.slug === week.slug;
            return (
              <Link
                key={w.slug}
                to={`/semana/${w.slug}`}
                style={{
                  padding: "0.3em 0.7em",
                  borderRadius: "999px",
                  fontSize: "0.78rem",
                  fontWeight: isActive ? 700 : 500,
                  textDecoration: "none",
                  background: isActive
                    ? "linear-gradient(120deg, var(--accent), var(--accent-2))"
                    : "rgba(255, 255, 255, 0.04)",
                  color: isActive ? "#05070d" : "var(--text-dim)",
                  border: isActive ? "none" : "1px solid rgba(255,255,255,0.08)",
                  transition: "all 0.2s ease",
                }}
              >
                {w.number === 6 ? "🔥 Retos" : `Sem ${w.number}`}
              </Link>
            );
          })}
        </div>

        <button
          onClick={() => nextWeek && navigate(`/semana/${nextWeek.slug}`)}
          disabled={!nextWeek}
          className="btn"
          style={{
            padding: "0.35em 0.8em",
            fontSize: "0.8rem",
            opacity: nextWeek ? 1 : 0.3,
            cursor: nextWeek ? "pointer" : "default",
          }}
        >
          {nextWeek ? (nextWeek.number === 6 ? "Retos" : `Sem ${nextWeek.number}`) : "Fin"} →
        </button>
      </div>

      {/* Encabezado de la Semana */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="mono" style={{ fontSize: "0.78rem", color: "var(--accent)", marginBottom: "0.4em", fontWeight: 700 }}>
          {week.number === 6 ? "MÓDULO DE RETOS" : `SEMANA ${week.number}`} · {week.dateRange} · {week.sections.join(", ")}
        </div>
        <h1 style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.4rem)", margin: "0 0 0.5em 0", lineHeight: 1.15, fontWeight: 800 }}>
          {week.title}
        </h1>
        <div style={{ color: "var(--text-dim)", lineHeight: 1.6, marginBottom: "1.8em" }}>
          <MathText text={week.summary} />
        </div>
      </motion.div>

      {/* Pestañas de la Semana */}
      <div
        id="week-tabs-bar"
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
              fontWeight: tab === t.id ? 700 : 500,
            }}
          >
            {t.label} <span style={{ opacity: 0.75 }}>({t.count})</span>
          </button>
        ))}
      </div>

      {/* Pestaña: TEORÍA */}
      {tab === "teoria" && (
        <div>
          {week.theory.map((s) => (
            <div key={s.id} id={s.id} style={{ scrollMarginTop: 80 }}>
              <TheoryBlock section={s} />
              {theoryGraphRegistry[s.id]}
              {microChecks[s.id] && <QuickCheck question={microChecks[s.id]} />}
            </div>
          ))}

          {/* Botón al final de Teoría para pasar a Ejemplos */}
          <div
            className="glass-panel"
            style={{
              marginTop: "2.5rem",
              padding: "1.2rem 1.6rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              border: "1px solid rgba(125,252,255,0.3)",
              background: "linear-gradient(135deg, rgba(125,252,255,0.08), rgba(10,16,30,0.8))",
            }}
          >
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--accent)", fontWeight: 700 }}>¿Listo para practicar?</div>
              <div style={{ fontSize: "0.95rem", color: "#ffffff", fontWeight: 600 }}>Siguiente paso: Ejemplos resueltos paso a paso</div>
            </div>
            <button className="btn btn-primary" onClick={() => changeTab("ejemplos")}>
              Continuar a Ejemplos resueltos ({week.examples.length}) →
            </button>
          </div>
        </div>
      )}

      {/* Pestaña: EJEMPLOS */}
      {tab === "ejemplos" && (
        <div>
          {week.examples.map((ex, i) => (
            <div key={ex.id}>
              <ExampleCard example={ex} index={i} />
              {exampleGraphRegistry[ex.id]}
            </div>
          ))}

          {/* Navegación al final de Ejemplos */}
          <div
            className="glass-panel"
            style={{
              marginTop: "2.5rem",
              padding: "1.2rem 1.6rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              border: "1px solid rgba(125,252,255,0.3)",
              background: "linear-gradient(135deg, rgba(125,252,255,0.08), rgba(10,16,30,0.8))",
            }}
          >
            <button className="btn" onClick={() => changeTab("teoria")}>
              ← Volver a Teoría
            </button>
            <button className="btn btn-primary" onClick={() => changeTab("ejercicios")}>
              Continuar a Ejercicios propuestos ({week.exercises.length}) →
            </button>
          </div>
        </div>
      )}

      {/* Pestaña: EJERCICIOS */}
      {tab === "ejercicios" && (
        <div>
          {week.exercises.map((ex, i) => (
            <ExerciseCard key={ex.id} exercise={ex} index={i} />
          ))}

          {/* Navegación al final de Ejercicios */}
          <div
            className="glass-panel"
            style={{
              marginTop: "2.5rem",
              padding: "1.2rem 1.6rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              border: "1px solid rgba(125,252,255,0.3)",
              background: "linear-gradient(135deg, rgba(125,252,255,0.08), rgba(10,16,30,0.8))",
            }}
          >
            <button className="btn" onClick={() => changeTab("ejemplos")}>
              ← Volver a Ejemplos
            </button>
            {week.flashcards && week.flashcards.length > 0 ? (
              <button className="btn btn-primary" onClick={() => changeTab("flashcards")}>
                Continuar a Flashcards ({week.flashcards.length}) →
              </button>
            ) : week.quiz && week.quiz.length > 0 ? (
              <button className="btn btn-primary" onClick={() => changeTab("quiz")}>
                Continuar a Quiz ({week.quiz.length}) →
              </button>
            ) : nextWeek ? (
              <Link to={`/semana/${nextWeek.slug}`} className="btn btn-primary">
                Ir a {nextWeek.number === 6 ? "Retos" : `Semana ${nextWeek.number}`} →
              </Link>
            ) : null}
          </div>
        </div>
      )}

      {/* Pestaña: FLASHCARDS */}
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

          {/* Navegación al final de Flashcards */}
          <div
            className="glass-panel"
            style={{
              marginTop: "2.5rem",
              padding: "1.2rem 1.6rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
              border: "1px solid rgba(125,252,255,0.3)",
              background: "linear-gradient(135deg, rgba(125,252,255,0.08), rgba(10,16,30,0.8))",
            }}
          >
            <button className="btn" onClick={() => changeTab("ejercicios")}>
              ← Volver a Ejercicios
            </button>
            {week.quiz && week.quiz.length > 0 ? (
              <button className="btn btn-primary" onClick={() => changeTab("quiz")}>
                Continuar a Quiz ({week.quiz.length}) →
              </button>
            ) : nextWeek ? (
              <Link to={`/semana/${nextWeek.slug}`} className="btn btn-primary">
                Ir a {nextWeek.number === 6 ? "Retos" : `Semana ${nextWeek.number}`} →
              </Link>
            ) : null}
          </div>
        </div>
      )}

      {/* Pestaña: QUIZ */}
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

          {/* 🚀 BANNER FINAL DE FIN DE SEMANA Y PASO A LA SIGUIENTE SEMANA */}
          <div
            className="glass-panel"
            style={{
              marginTop: "3rem",
              padding: "1.6rem 1.8rem",
              borderRadius: "20px",
              border: "1.5px solid rgba(125, 252, 255, 0.4)",
              background: "linear-gradient(135deg, rgba(125,252,255,0.12), rgba(8,12,24,0.95))",
              boxShadow: "0 12px 36px rgba(0,0,0,0.5), 0 0 20px rgba(125,252,255,0.15)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1.2rem",
            }}
          >
            <div>
              <div style={{ fontSize: "0.78rem", color: "var(--accent)", fontWeight: 700, letterSpacing: "0.08em" }}>
                ¡SEMANA {week.number} COMPLETADA!
              </div>
              <h3 style={{ margin: "0.2rem 0", fontSize: "1.2rem", fontWeight: 800, color: "#ffffff" }}>
                {nextWeek ? `Continuar con ${nextWeek.title}` : "¡Has terminado todo el temario oficial!"}
              </h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--text-dim)" }}>
                Avanza a la siguiente semana sin necesidad de regresar al menú principal.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {prevWeek && (
                <Link to={`/semana/${prevWeek.slug}`} className="btn">
                  ← {prevWeek.number === 6 ? "Retos" : `Semana ${prevWeek.number}`}
                </Link>
              )}
              {nextWeek ? (
                <Link to={`/semana/${nextWeek.slug}`} className="btn btn-primary" style={{ padding: "0.75em 1.4em" }}>
                  Siguiente: {nextWeek.number === 6 ? "MÓDULO DE RETOS 🔥" : `Semana ${nextWeek.number} →`}
                </Link>
              ) : (
                <Link to="/" className="btn btn-primary">
                  Ver resumen de tu progreso 🏆
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
