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
          gap: "0.65rem",
          padding: "0.45rem 0.95rem",
          borderRadius: "999px",
          border: "1px solid rgba(125, 252, 255, 0.3)",
          background: "rgba(10, 16, 30, 0.75)",
          backdropFilter: "blur(12px)",
          fontSize: "0.85rem",
        }}
      >
        <img
          src="/wilmar-profile.png"
          alt="Wilmar Alberto González Medina"
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            objectFit: "cover",
            border: "1.5px solid var(--accent)",
            boxShadow: "0 0 8px rgba(125, 252, 255, 0.4)",
          }}
        />
        <span>
          <strong style={{ color: "var(--text)", fontWeight: 700 }}>Wilmar Alberto González Medina</strong>
          <span style={{ color: "var(--text-dim)", marginLeft: "0.4em" }}>
            — Docente ocasional, Cálculo Diferencial
          </span>
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`glass-panel ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.9rem",
        padding: "0.55rem 1.4rem",
        borderRadius: "999px",
        border: "1px solid rgba(125, 252, 255, 0.35)",
        background: "linear-gradient(135deg, rgba(125, 252, 255, 0.12), rgba(10, 16, 30, 0.85))",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 20px rgba(125, 252, 255, 0.2)",
        backdropFilter: "blur(16px)",
        margin: "0.6rem 0 1.8rem",
      }}
    >
      <img
        src="/wilmar-profile.png"
        alt="Wilmar Alberto González Medina"
        style={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid var(--accent)",
          boxShadow: "0 0 14px rgba(125, 252, 255, 0.5)",
        }}
      />
      <div style={{ textAlign: "left" }}>
        <div
          style={{
            fontSize: "0.98rem",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.01em",
            display: "flex",
            alignItems: "center",
            gap: "0.5em",
          }}
        >
          Wilmar Alberto González Medina
          <span
            style={{
              fontSize: "0.68rem",
              padding: "0.15em 0.55em",
              borderRadius: "999px",
              background: "rgba(125, 252, 255, 0.2)",
              color: "var(--accent)",
              border: "1px solid rgba(125, 252, 255, 0.4)",
              fontWeight: 700,
              letterSpacing: "0.04em",
            }}
          >
            DOCENTE
          </span>
        </div>
        <div style={{ fontSize: "0.82rem", color: "var(--text-dim)", marginTop: "0.1em" }}>
          Docente ocasional, Cálculo Diferencial · Universidad Nacional de Colombia
        </div>
      </div>
    </motion.div>
  );
}
