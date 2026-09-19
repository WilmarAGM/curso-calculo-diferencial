import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { shortcuts, temario } from "../data/temario";

const chip: React.CSSProperties = {
  fontSize: "0.76rem",
  padding: "0.3em 0.75em",
  borderRadius: 999,
  border: "1px solid var(--panel-border)",
  background: "rgba(255,255,255,0.04)",
  color: "var(--accent)",
  whiteSpace: "nowrap",
};

export default function Temario() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2.2rem 1.4rem 5rem" }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", margin: "0 0 0.3em 0" }}>
          Mapa del <span className="neon-text">Temario</span>
        </h1>
        <p style={{ color: "var(--text-dim)", maxWidth: 720, lineHeight: 1.6, marginBottom: "1.8em" }}>
          Contenido del programa oficial (Semestre 2026-02) — <strong style={{ color: "var(--text)" }}>Parcial 1: semanas 1–5, sábado 3 de octubre</strong>.
          Cada renglón es un tema tal como aparece en el programa; los botones te llevan directo a su teoría o gráfica.
        </p>
      </motion.div>

      <div className="mono" style={{ fontSize: "0.72rem", color: "var(--accent)", marginBottom: "0.7em" }}>
        ATAJOS POR TEMA
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(230px, 100%), 1fr))", gap: "0.9rem", marginBottom: "2.4rem" }}>
        {shortcuts.map((s) => (
          <div key={s.title} className="glass-panel" style={{ padding: "1rem 1.1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6em", marginBottom: "0.3em" }}>
              <span className="mono neon-text" style={{ fontSize: "1.05rem", fontWeight: 700, minWidth: "2.2em" }}>
                {s.icon}
              </span>
              <strong>{s.title}</strong>
            </div>
            <div style={{ fontSize: "0.76rem", color: "var(--text-dim)", marginBottom: "0.7em" }}>{s.hint}</div>
            <div style={{ display: "flex", gap: "0.4em", flexWrap: "wrap" }}>
              {s.links.map((l) => (
                <Link key={l.text} to={l.to} style={chip}>
                  {l.text}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mono" style={{ fontSize: "0.72rem", color: "var(--accent)", marginBottom: "0.7em" }}>
        PROGRAMA SEMANA A SEMANA
      </div>
      <div style={{ display: "grid", gap: "1rem" }}>
        {temario.map((w) => (
          <motion.div key={w.number} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass-panel" style={{ padding: "1.1rem 1.3rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5em", marginBottom: "0.7em" }}>
              <Link to={`/semana/${w.slug}`} style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                Semana {w.number} →
              </Link>
              <span className="mono" style={{ fontSize: "0.72rem", color: "var(--text-dim)" }}>
                {w.dates} · Stewart {w.stewart}
              </span>
            </div>
            <div style={{ display: "grid", gap: "0.55em" }}>
              {w.topics.map((t) => (
                <div key={t.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "0.8em", flexWrap: "wrap", borderTop: "1px solid var(--panel-border)", paddingTop: "0.55em" }}>
                  <span style={{ fontSize: "0.88rem", flex: "1 1 260px" }}>{t.label}</span>
                  <span style={{ display: "flex", gap: "0.4em", flexWrap: "wrap" }}>
                    {t.links.map((l) => (
                      <Link key={l.text} to={l.to} style={chip}>
                        {l.text}
                      </Link>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
        <div className="glass-panel" style={{ padding: "1rem 1.3rem", borderColor: "rgba(255,95,182,0.3)" }}>
          <Link to="/semana/modulo-ingenio" style={{ fontWeight: 700 }}>
            Módulo de Retos →
          </Link>
          <span style={{ color: "var(--text-dim)", fontSize: "0.85rem", marginLeft: "0.8em" }}>
            Fuera del programa semanal: problemas que combinan temas de varias semanas.
          </span>
        </div>
      </div>
    </div>
  );
}
