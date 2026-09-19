import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useInstallPrompt } from "../hooks/useInstallPrompt";
import XPWidget from "./XPWidget";

export default function NavBar() {
  const location = useLocation();
  const { canInstall, promptInstall } = useInstallPrompt();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.6em",
        padding: "0.7rem 1rem",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: "rgba(5,7,13,0.55)",
        borderBottom: "1px solid var(--panel-border)",
      }}
    >
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: "0.8em", textDecoration: "none" }}>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
        >
          <img
            src="/unal-logo.svg"
            alt="UNAL"
            style={{ height: 32, filter: "brightness(1.1)" }}
          />
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "1.2rem" }}>|</span>
          <img
            src="/course-logo.png"
            alt="Cálculo Diferencial Logo"
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              boxShadow: "0 0 10px rgba(125,252,255,0.4)",
              border: "1px solid rgba(125,252,255,0.3)",
            }}
          />
        </motion.div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 700, letterSpacing: "-0.01em", fontSize: "1rem", color: "#ffffff" }}>
            Cálculo<span className="neon-text">Diferencial</span>
          </span>
          <span style={{ fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.08em", fontWeight: 600 }}>
            UNAL MEDELLÍN
          </span>
        </div>
      </Link>

      <nav style={{ display: "flex", gap: "0.4em", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
        <XPWidget />
        {location.pathname !== "/" && (
          <Link to="/" className="btn" style={{ padding: "0.5em 1em", fontSize: "0.85rem" }}>
            ← Semanas
          </Link>
        )}
        {location.pathname !== "/temario" && (
          <Link to="/temario" className="btn" style={{ padding: "0.5em 1em", fontSize: "0.85rem" }}>
            🗺 Temario
          </Link>
        )}
        {location.pathname !== "/transformaciones" && (
          <Link to="/transformaciones" className="btn" style={{ padding: "0.5em 1em", fontSize: "0.85rem" }}>
            🎨 Transformaciones
          </Link>
        )}
        {location.pathname !== "/galeria" && (
          <Link to="/galeria" className="btn" style={{ padding: "0.5em 1em", fontSize: "0.85rem" }}>
            📊 Galería
          </Link>
        )}
        {canInstall && (
          <button className="btn btn-primary" style={{ fontSize: "0.85rem" }} onClick={promptInstall}>
            ⬇ Instalar app
          </button>
        )}
      </nav>
    </header>
  );
}
