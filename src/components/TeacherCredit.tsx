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
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`glass-panel ${className}`}
      style={{
        maxWidth: 460,
        width: "100%",
        margin: "2.8rem auto 2rem",
        padding: "0 1.6rem 1.4rem",
        borderRadius: "24px",
        border: "1px solid rgba(125, 252, 255, 0.35)",
        background: "linear-gradient(180deg, rgba(16, 26, 48, 0.75) 0%, rgba(8, 12, 24, 0.92) 100%)",
        boxShadow: "0 16px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(125, 252, 255, 0.2)",
        backdropFilter: "blur(20px)",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Floating Centered Avatar */}
      <div style={{ position: "relative", display: "inline-block", marginTop: -46, marginBottom: "0.8rem" }}>
        <img
          src="/wilmar-profile.png"
          alt="Wilmar Alberto González Medina"
          style={{
            width: 92,
            height: 92,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3.5px solid var(--accent)",
            boxShadow: "0 0 24px rgba(125, 252, 255, 0.6), 0 0 8px rgba(0, 0, 0, 0.8)",
            background: "#080c18",
          }}
        />
        <div
          title="Docente verificado"
          style={{
            position: "absolute",
            bottom: 4,
            right: 4,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "var(--accent-good)",
            color: "#05070d",
            display: "grid",
            placeItems: "center",
            fontSize: "0.75rem",
            fontWeight: 900,
            boxShadow: "0 0 10px rgba(109, 255, 176, 0.8)",
            border: "2px solid #080c18",
          }}
        >
          ✓
        </div>
      </div>

      <div>
        <div
          style={{
            fontSize: "0.72rem",
            color: "var(--text-dim)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            fontWeight: 600,
            marginBottom: "0.3rem",
          }}
        >
          Docente
        </div>
        <h3
          style={{
            margin: "0 0 0.3rem 0",
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.01em",
          }}
        >
          Wilmar Alberto González Medina
        </h3>
        <div
          style={{
            fontSize: "0.92rem",
            fontWeight: 700,
            color: "var(--accent)",
            marginBottom: "0.2rem",
          }}
        >
          Docente Ocasional | Cálculo Diferencial
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-dim)", opacity: 0.85 }}>
          Sede Medellín · Universidad Nacional de Colombia
        </div>
      </div>
    </motion.div>
  );
}
