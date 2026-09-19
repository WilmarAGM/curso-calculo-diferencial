import type { ReactNode } from "react";
import { motion } from "framer-motion";

export default function GraphPanel({
  title,
  children,
  right,
}: {
  title?: string;
  children: ReactNode;
  right?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4 }}
      className="glass-panel"
      style={{
        padding: "1.1rem 1.2rem 0.9rem",
        margin: "1rem 0 1.4rem",
        border: "1px solid rgba(125,252,255,0.18)",
        background: "linear-gradient(160deg, rgba(18,22,38,0.85), rgba(10,13,24,0.85))",
      }}
    >
      {(title || right) && (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.6em" }}>
          {title && (
            <div className="mono" style={{ fontSize: "0.7rem", letterSpacing: "0.08em", color: "var(--accent)", textTransform: "uppercase" }}>
              📈 {title}
            </div>
          )}
          {right}
        </div>
      )}
      {children}
    </motion.div>
  );
}
