import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import weeks from "../data/weeks";
import { shortcuts } from "../data/temario";
import { useProgress } from "../hooks/useProgress";
import { useQuizScores } from "../hooks/useQuizScores";
import { useGamification } from "../hooks/useGamification";
import TeacherCredit from "../components/TeacherCredit";

function plainSummary(text: string, max = 128) {
  const stripped = text.replace(/\$\$?(.+?)\$\$?/g, "$1").replace(/\*\*(.+?)\*\*/g, "$1");
  return stripped.length > max ? stripped.slice(0, max) + "…" : stripped;
}

export default function Home() {
  const { countDone } = useProgress();
  const { bestScore } = useQuizScores();
  const { totalXP, level, badges, unlockedCount } = useGamification();

  return (
    <div style={{ maxWidth: 1080, margin: "0 auto", padding: "2.5rem 1.4rem 4rem" }}>
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: "center", marginBottom: "3rem" }}
      >
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1.2rem", marginBottom: "1.2rem", flexWrap: "wrap" }}>
          <img
            src="/unal-logo.svg"
            alt="Universidad Nacional de Colombia"
            style={{ height: 56, filter: "brightness(1.15) drop-shadow(0 0 12px rgba(255,255,255,0.25))" }}
          />
          <img
            src="/course-logo.png"
            alt="Logo Circular Cálculo Diferencial"
            style={{
              height: 72,
              width: 72,
              borderRadius: "50%",
              boxShadow: "0 0 20px rgba(125, 252, 255, 0.45), 0 0 8px rgba(255, 95, 182, 0.3)",
              border: "2px solid rgba(125, 252, 255, 0.4)",
            }}
          />
        </div>

        <div
          className="mono"
          style={{ fontSize: "0.78rem", letterSpacing: "0.15em", color: "var(--accent)", marginBottom: "0.6em", fontWeight: 700 }}
        >
          UNIVERSIDAD NACIONAL DE COLOMBIA — SEDE MEDELLÍN
        </div>

        <h1 style={{ fontSize: "clamp(2rem, 5.5vw, 3.2rem)", margin: "0 0 0.3em 0", lineHeight: 1.1, fontWeight: 800 }}>
          Primer Parcial de <span className="neon-text">Cálculo Diferencial</span>
        </h1>

        <TeacherCredit variant="hero" />

        <p style={{ color: "var(--text-dim)", maxWidth: 680, margin: "0 auto", fontSize: "1.02rem", lineHeight: 1.6 }}>
          Teoría completa, ejemplos resueltos paso a paso y ejercicios de práctica con respuesta numérica,
          organizados semana a semana siguiendo el programa oficial (Semanas 1–5) — cada semana contiene
          <em> solo</em> su propio temario. Al final, un módulo de <strong>retos</strong> reúne los problemas
          que combinan varias semanas o exigen un paso extra de ingenio.
        </p>
      </motion.div>

      <div style={{ display: "flex", gap: "0.5em", flexWrap: "wrap", justifyContent: "center", marginBottom: "2rem" }}>
        <Link to="/temario" className="btn btn-primary">
          🗺 Temario del programa
        </Link>
        {shortcuts.slice(0, 5).map((s) => (
          <Link key={s.title} to={s.links[0].to} className="btn" style={{ fontSize: "0.85rem" }}>
            {s.title}
          </Link>
        ))}
        <Link to="/transformaciones" className="btn" style={{ fontSize: "0.85rem" }}>
          🎨 Transformaciones
        </Link>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))",
          gap: "1.2rem",
        }}
      >
        {weeks.map((w, i) => {
          const exIds = w.exercises.map((e) => e.id);
          const done = countDone(exIds);
          const total = exIds.length;
          const pct = total ? Math.round((done / total) * 100) : 0;

          return (
            <motion.div
              key={w.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
            >
              <Link to={`/semana/${w.slug}`}>
                <div
                  className="glass-panel"
                  style={{
                    padding: "1.4rem",
                    height: "100%",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: -40,
                      right: -40,
                      width: 140,
                      height: 140,
                      borderRadius: "50%",
                      background:
                        w.number === 6
                          ? "radial-gradient(circle, rgba(255,95,182,0.28), transparent 70%)"
                          : "radial-gradient(circle, rgba(125,252,255,0.22), transparent 70%)",
                    }}
                  />
                  <div
                    className="mono"
                    style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginBottom: "0.5em" }}
                  >
                    {w.number === 6 ? "MÓDULO DE RETOS" : `SEMANA ${w.number}`} · {w.dateRange}
                  </div>
                  <h3 style={{ margin: "0 0 0.5em 0", fontSize: "1.15rem", lineHeight: 1.3 }}>{w.title}</h3>
                  <p style={{ color: "var(--text-dim)", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "1.2em" }}>
                    {plainSummary(w.summary)}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.4em" }}>
                    <div style={{ display: "flex", gap: "0.4em", fontSize: "0.75rem", color: "var(--text-dim)" }}>
                      <span>{w.theory.length} teoría</span>·<span>{w.examples.length} ejemplos</span>·
                      <span>{total} ejercicios</span>
                    </div>
                    {w.quiz && w.quiz.length > 0 && (
                      <span
                        className="mono"
                        style={{
                          fontSize: "0.68rem",
                          padding: "0.15em 0.55em",
                          borderRadius: 999,
                          border: "1px solid",
                          borderColor: (bestScore(w.slug) ?? 0) >= 80 ? "rgba(109,255,176,0.4)" : "var(--panel-border)",
                          color: (bestScore(w.slug) ?? 0) >= 80 ? "var(--accent-good)" : "var(--text-dim)",
                        }}
                      >
                        🧠 {bestScore(w.slug) !== null ? `${bestScore(w.slug)}%` : "sin intentar"}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      marginTop: "0.8em",
                      height: 6,
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.06)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${pct}%`,
                        background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
                        transition: "width 0.4s ease",
                      }}
                    />
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "var(--text-dim)", marginTop: "0.4em" }}>
                    {done}/{total} ejercicios resueltos
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-panel"
        style={{ padding: "1.4rem 1.6rem", marginTop: "2.4rem" }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1em", flexWrap: "wrap", gap: "0.6em" }}>
          <div>
            <div className="mono" style={{ fontSize: "0.72rem", color: "var(--accent)", marginBottom: "0.2em" }}>
              TU PROGRESO
            </div>
            <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
              Nivel {level} <span style={{ color: "var(--text-dim)", fontWeight: 400, fontSize: "0.85rem" }}>· {totalXP} XP · {unlockedCount}/{badges.length} insignias</span>
            </div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(210px, 100%), 1fr))", gap: "0.6em" }}>
          {badges.map((b) => (
            <div
              key={b.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.6em",
                padding: "0.6em 0.8em",
                borderRadius: 10,
                background: b.unlocked ? "rgba(109,255,176,0.08)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${b.unlocked ? "rgba(109,255,176,0.3)" : "var(--panel-border)"}`,
                opacity: b.unlocked ? 1 : 0.5,
              }}
            >
              <span style={{ fontSize: "1.2rem", filter: b.unlocked ? "none" : "grayscale(1)" }}>{b.icon}</span>
              <span style={{ fontSize: "0.78rem", color: b.unlocked ? "var(--text)" : "var(--text-dim)" }}>{b.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <div style={{ textAlign: "center", marginTop: "2rem", display: "flex", gap: "0.8em", justifyContent: "center", flexWrap: "wrap" }}>
        <Link to="/galeria" className="btn btn-primary">
          📊 Galería interactiva de funciones
        </Link>
        <Link to="/checklist" className="btn">
          ✅ Checklist de auditoría antes del examen
        </Link>
      </div>
    </div>
  );
}
