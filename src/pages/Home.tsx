import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";
import weeks from "../data/weeks";
import { shortcuts } from "../data/temario";
import { useProgress } from "../hooks/useProgress";
import { useQuizScores } from "../hooks/useQuizScores";
import { useGamification } from "../hooks/useGamification";
import TeacherCredit from "../components/TeacherCredit";

export default function Home() {
  const { countDone } = useProgress();
  const { bestScore } = useQuizScores();
  const { totalXP, level, badges, unlockedCount } = useGamification();

  // Fórmulas matemáticas insignes para cada semana (exactas de la maqueta)
  const weekFormulas = [
    "\\lim_{x \\to a} f(x)",
    "f'(x) = \\frac{dy}{dx}",
    "\\frac{d}{dx}(u \\cdot v)",
    "\\frac{dy}{dx} \\cdot \\frac{dx}{dt}",
    "f''(x) = \\frac{d^2y}{dx^2}",
    "\\int f(x)dx + \\mathcal{R}",
  ];

  return (
    <div style={{ maxWidth: 1140, margin: "0 auto", padding: "2.5rem 1.4rem 5rem" }}>
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.2rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <img
            src="/unal-logo.svg"
            alt="Universidad Nacional de Colombia"
            style={{ height: 58, filter: "brightness(1.15) drop-shadow(0 0 12px rgba(255,255,255,0.25))" }}
          />
          <img
            src="/course-logo.png"
            alt="Emblema Circular de Cálculo Diferencial"
            style={{
              height: 76,
              width: 76,
              borderRadius: "50%",
              boxShadow: "0 0 24px rgba(125, 252, 255, 0.5), 0 0 10px rgba(255, 209, 102, 0.3)",
              border: "2.5px solid rgba(125, 252, 255, 0.5)",
            }}
          />
        </div>

        <div
          className="mono"
          style={{ fontSize: "0.8rem", letterSpacing: "0.16em", color: "var(--accent)", marginBottom: "0.6em", fontWeight: 700 }}
        >
          UNIVERSIDAD NACIONAL DE COLOMBIA — SEDE MEDELLÍN
        </div>

        <h1
          style={{
            fontSize: "clamp(2.2rem, 6vw, 3.6rem)",
            margin: "0 0 0.2em 0",
            lineHeight: 1.1,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          Primer Parcial de <span className="neon-text">Cálculo Diferencial</span>
        </h1>

        {/* Tarjeta Flotante del Docente Wilmar Alberto González Medina */}
        <TeacherCredit variant="hero" />

        <p style={{ color: "var(--text-dim)", maxWidth: 720, margin: "0 auto", fontSize: "1.04rem", lineHeight: 1.65 }}>
          Notas completas de clase, fórmulas de límites y derivadas, ejemplos resueltos paso a paso y ejercicios prácticos
          con respuesta numérica, organizados semana a semana siguiendo el programa oficial.
        </p>
      </motion.div>

      {/* Botones de Acceso Rápido */}
      <div style={{ display: "flex", gap: "0.6em", flexWrap: "wrap", justifyContent: "center", marginBottom: "2.8rem" }}>
        <Link to="/temario" className="btn btn-primary" style={{ padding: "0.7em 1.4em", fontSize: "0.92rem" }}>
          🗺 Temario del programa
        </Link>
        {shortcuts.slice(0, 5).map((s) => (
          <Link key={s.title} to={s.links[0].to} className="btn" style={{ fontSize: "0.86rem", padding: "0.6em 1.1em" }}>
            {s.title}
          </Link>
        ))}
        <Link to="/transformaciones" className="btn" style={{ fontSize: "0.86rem", padding: "0.6em 1.1em" }}>
          🎨 Transformaciones
        </Link>
      </div>

      {/* Cuadrícula de Tarjetas de Semanas 1:1 con la Maqueta */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(320px, 100%), 1fr))",
          gap: "1.6rem",
        }}
      >
        {weeks.map((w, i) => {
          const exIds = w.exercises.map((e) => e.id);
          const done = countDone(exIds);
          const total = exIds.length;
          const pct = total ? Math.round((done / total) * 100) : 0;
          const isComplete = pct === 100;
          const isStarted = pct > 0;
          const formula = weekFormulas[i % weekFormulas.length];

          return (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.01 }}
            >
              <Link to={`/semana/${w.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <div
                  className="glass-panel mockup-card"
                  style={{
                    padding: "1.6rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "20px",
                    border: w.number === 6
                      ? "1.5px solid rgba(255, 95, 182, 0.4)"
                      : "1.5px solid rgba(125, 252, 255, 0.35)",
                    background: "linear-gradient(180deg, rgba(14, 20, 36, 0.8) 0%, rgba(8, 12, 24, 0.95) 100%)",
                    boxShadow: w.number === 6
                      ? "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 95, 182, 0.15)"
                      : "0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(125, 252, 255, 0.15)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Glowing corner glow */}
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      height: "3px",
                      background: w.number === 6
                        ? "linear-gradient(90deg, #ff5fb6, #b98bff)"
                        : "linear-gradient(90deg, #7dfcff, #6dffb0)",
                      boxShadow: w.number === 6
                        ? "0 0 12px #ff5fb6"
                        : "0 0 12px #7dfcff",
                    }}
                  />

                  <div>
                    {/* Header line: Title */}
                    <div style={{ marginBottom: "1.2rem" }}>
                      <div
                        className="mono"
                        style={{
                          fontSize: "0.72rem",
                          color: "var(--accent)",
                          letterSpacing: "0.08em",
                          marginBottom: "0.3em",
                          fontWeight: 700,
                        }}
                      >
                        {w.number === 6 ? "MÓDULO DE RETOS" : `SEMANA ${w.number}`} · {w.dateRange}
                      </div>

                      <h3
                        style={{
                          margin: 0,
                          fontSize: "1.3rem",
                          lineHeight: 1.3,
                          fontWeight: 800,
                          color: "#ffffff",
                        }}
                      >
                        {w.title}
                      </h3>
                    </div>

                    {/* Central Glowing Math Formula Display (Exact to Mockup) */}
                    <div
                      style={{
                        margin: "1rem 0 1.4rem",
                        padding: "1.1rem 0.8rem",
                        borderRadius: "14px",
                        background: "rgba(5, 10, 20, 0.65)",
                        border: "1px solid rgba(125, 252, 255, 0.2)",
                        boxShadow: "inset 0 0 15px rgba(0,0,0,0.5), 0 0 12px rgba(125,252,255,0.08)",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minHeight: 74,
                        color: "var(--accent)",
                        fontSize: "1.25rem",
                      }}
                    >
                      <BlockMath math={formula} />
                    </div>
                  </div>

                  {/* Progress & Bottom Bar */}
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontSize: "0.82rem",
                        marginBottom: "0.6em",
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ color: "var(--text)" }}>
                        {pct}% Completo
                      </span>
                      <span style={{ color: "var(--text-dim)", fontSize: "0.78rem" }}>
                        {pct}%
                        {bestScore(w.slug) !== null && ` · 🧠 ${bestScore(w.slug)}%`}
                      </span>
                    </div>

                    {/* Neon Glowing Progress Bar */}
                    <div
                      style={{
                        height: 8,
                        borderRadius: 999,
                        background: "rgba(255,255,255,0.07)",
                        overflow: "hidden",
                        marginBottom: "1.2rem",
                        border: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${Math.max(pct, 4)}%`,
                          borderRadius: 999,
                          background: w.number === 6
                            ? "linear-gradient(90deg, var(--accent-3), var(--accent-2))"
                            : "linear-gradient(90deg, var(--accent), var(--accent-good))",
                          boxShadow: w.number === 6
                            ? "0 0 10px rgba(255,95,182,0.6)"
                            : "0 0 10px rgba(125,252,255,0.6)",
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>

                    {/* Bottom Status Pill Bar */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span
                        className="mono"
                        style={{
                          fontSize: "0.72rem",
                          padding: "0.3em 0.8em",
                          borderRadius: 999,
                          fontWeight: 700,
                          letterSpacing: "0.05em",
                          background: isComplete
                            ? "rgba(109,255,176,0.14)"
                            : isStarted
                            ? "rgba(125,252,255,0.14)"
                            : "rgba(255,255,255,0.05)",
                          color: isComplete
                            ? "var(--accent-good)"
                            : isStarted
                            ? "var(--accent)"
                            : "var(--text-dim)",
                          border: `1px solid ${
                            isComplete
                              ? "rgba(109,255,176,0.4)"
                              : isStarted
                              ? "rgba(125,252,255,0.4)"
                              : "rgba(255,255,255,0.1)"
                          }`,
                        }}
                      >
                        {isComplete ? "COMPLETADO" : isStarted ? "EN PROCESO" : "EMPEZANDO"}
                      </span>

                      <span style={{ fontSize: "0.8rem", color: "var(--accent)", opacity: 0.8 }}>
                        Siguiente →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Gamification Progress Panel */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-panel"
        style={{ padding: "1.6rem 1.8rem", marginTop: "3rem", borderRadius: "20px" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2em", flexWrap: "wrap", gap: "0.6em" }}>
          <div>
            <div className="mono" style={{ fontSize: "0.75rem", color: "var(--accent)", marginBottom: "0.2em", fontWeight: 700 }}>
              TU PROGRESO ACADÉMICO
            </div>
            <div style={{ fontSize: "1.2rem", fontWeight: 800 }}>
              Nivel {level} <span style={{ color: "var(--text-dim)", fontWeight: 400, fontSize: "0.9rem" }}>· {totalXP} XP · {unlockedCount}/{badges.length} insignias</span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(220px, 100%), 1fr))", gap: "0.7em" }}>
          {badges.map((b) => (
            <div
              key={b.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7em",
                padding: "0.7em 0.9em",
                borderRadius: 12,
                background: b.unlocked ? "rgba(109,255,176,0.08)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${b.unlocked ? "rgba(109,255,176,0.3)" : "var(--panel-border)"}`,
                opacity: b.unlocked ? 1 : 0.5,
              }}
            >
              <span style={{ fontSize: "1.3rem", filter: b.unlocked ? "none" : "grayscale(1)" }}>{b.icon}</span>
              <span style={{ fontSize: "0.8rem", color: b.unlocked ? "var(--text)" : "var(--text-dim)", fontWeight: 600 }}>{b.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Action Links */}
      <div style={{ textAlign: "center", marginTop: "2.5rem", display: "flex", gap: "1em", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/galeria" className="btn btn-primary" style={{ padding: "0.7em 1.4em" }}>
          📊 Galería interactiva de funciones
        </Link>
        <Link to="/checklist" className="btn" style={{ padding: "0.7em 1.4em" }}>
          ✅ Checklist de auditoría antes del examen
        </Link>
      </div>
    </div>
  );
}
