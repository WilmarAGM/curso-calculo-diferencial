import { motion } from "framer-motion";
import { checklist } from "../data/weeks/index";
import MathText from "../components/MathText";

export default function Checklist() {
  return (
    <div style={{ maxWidth: 760, margin: "0 auto", padding: "2.5rem 1.4rem 5rem" }}>
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", marginBottom: "0.3em" }}
      >
        Checklist de <span className="neon-text">Auditoría</span> Pre-Examen
      </motion.h1>
      <p style={{ color: "var(--text-dim)", marginBottom: "2em", lineHeight: 1.6 }}>
        El sistema SiDEx invalida procedimientos incorrectos o ilegibles aunque la respuesta numérica sea correcta.
        Revisa cada punto antes de transcribir tus respuestas.
      </p>
      <div className="glass-panel" style={{ padding: "1.6rem" }}>
        {checklist.map((item, i) => (
          <motion.label
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              display: "flex",
              gap: "0.8em",
              alignItems: "flex-start",
              padding: "0.8em 0",
              borderBottom: i < checklist.length - 1 ? "1px solid var(--panel-border)" : "none",
              cursor: "pointer",
            }}
          >
            <input type="checkbox" style={{ marginTop: "0.3em", accentColor: "#7dfcff" }} />
            <span style={{ lineHeight: 1.6 }}>
              <MathText text={item} />
            </span>
          </motion.label>
        ))}
      </div>
    </div>
  );
}
