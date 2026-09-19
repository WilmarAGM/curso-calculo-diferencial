import { motion } from "framer-motion";

interface TeacherCreditProps {
  variant?: "hero" | "compact" | "footer";
  className?: string;
}

export default function TeacherCredit({ variant = "hero", className = "" }: TeacherCreditProps) {
  if (variant === "compact") {
    return (
      <div
        className={`glass-panel ${className}`}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.6rem",
          padding: "0.45rem 0.9rem",
          borderRadius: "999px",
          border: "1px solid rgba(125, 252, 255, 0.25)",
          background: "rgba(10, 16, 30, 0.65)",
          backdropFilter: "blur(12px)",
          fontSize: "0.84rem",
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: "50%",
            background: "linear-gradient(135deg, var(--accent), var(--accent-2))",
            display: "grid",
            placeItems: "center",
            color: "#05070d",
            fontWeight: 800,
            fontSize: "0.75rem",
          }}
        >
          👨‍🏫
        </span>
        <span>
          <strong style={{ color: "var(--text)" }}>Wilmar Alberto González Medina</strong>
          <span style={{ color: "var(--text-dim)", marginLeft: "0.4em" }}>
            · Docente ocasional, Cálculo Diferencial
          </span>
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className={`glass-panel ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.8rem",
        padding: "0.65rem 1.3rem",
        borderRadius: "999px",
        border: "1px solid rgba(125, 252, 255, 0.3)",
        background: "linear-gradient(135deg, rgba(125, 252, 255, 0.08), rgba(255, 95, 182, 0.04))",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37), 0 0 16px rgba(125, 252, 255, 0.15)",
        backdropFilter: "blur(16px)",
        margin: "0.5rem 0 1.5rem",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--accent), #ff5fb6)",
          display: "grid",
          placeItems: "center",
          boxShadow: "0 0 12px rgba(125, 252, 255, 0.5)",
          fontSize: "1.1rem",
        }}
      >
        🎓
      </div>
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            fontSize: "0.94rem",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "0.4em",
          }}
        >
          Wilmar Alberto González Medina
          <span
            style={{
              fontSize: "0.68rem",
              padding: "0.15em 0.5em",
              borderRadius: "999px",
              background: "rgba(125, 252, 255, 0.15)",
              color: "var(--accent)",
              border: "1px solid rgba(125, 252, 255, 0.3)",
              fontWeight: 600,
              letterSpacing: "0.03em",
            }}
          >
            DOCENTE
          </span>
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", marginTop: "0.1em" }}>
          Docente ocasional — Cálculo Diferencial · UNAL Medellín
        </div>
      </div>
    </motion.div>
  );
}
