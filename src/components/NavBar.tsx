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

      <nav style={{ display: "flex", gap: "0.5em", alignItems: "center", flexWrap: "wrap", justifyContent: "flex-end" }}>
        <XPWidget />

        <div
          title="Docente: Wilmar Alberto González Medina"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.4rem",
            padding: "0.25rem 0.6rem 0.25rem 0.3rem",
            borderRadius: "999px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(125, 252, 255, 0.25)",
          }}
        >
          <img
            src="/wilmar-profile.png"
            alt="Wilmar Alberto González Medina"
            style={{ width: 26, height: 26, borderRadius: "50%", objectFit: "cover" }}
          />
          <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--text)" }}>
            Prof. Wilmar
          </span>
        </div>

        {/* Selector Desplegable de Semanas Rápido */}
        <select
          value={location.pathname.startsWith("/semana/") ? location.pathname.split("/")[2] : ""}
          onChange={(e) => {
            if (e.target.value) {
              window.location.hash = `#/semana/${e.target.value}`;
            }
          }}
          className="btn"
          style={{
            padding: "0.45em 0.8em",
            fontSize: "0.82rem",
            background: "rgba(10, 16, 30, 0.8)",
            color: "var(--text)",
            border: "1px solid rgba(125, 252, 255, 0.3)",
            outline: "none",
            cursor: "pointer",
          }}
        >
          <option value="" disabled>
            📚 Ir a Semana...
          </option>
          <option value="semana-1">Semana 1: Funciones</option>
          <option value="semana-2">Semana 2: Límites</option>
          <option value="semana-3">Semana 3: Continuidad</option>
          <option value="semana-4">Semana 4: Derivadas</option>
          <option value="semana-5">Semana 5: Reglas</option>
          <option value="retos">🔥 Módulo de Retos</option>
        </select>

        {location.pathname !== "/" && (
          <Link to="/" className="btn" style={{ padding: "0.45em 0.9em", fontSize: "0.82rem" }}>
            ← Inicio
          </Link>
        )}
        {location.pathname !== "/temario" && (
          <Link to="/temario" className="btn" style={{ padding: "0.45em 0.9em", fontSize: "0.82rem" }}>
            🗺 Temario
          </Link>
        )}
        {location.pathname !== "/transformaciones" && (
          <Link to="/transformaciones" className="btn" style={{ padding: "0.45em 0.9em", fontSize: "0.82rem" }}>
            🎨 Transformaciones
          </Link>
        )}
        {location.pathname !== "/galeria" && (
          <Link to="/galeria" className="btn" style={{ padding: "0.45em 0.9em", fontSize: "0.82rem" }}>
            📊 Galería
          </Link>
        )}
        {canInstall && (
          <button className="btn btn-primary" style={{ fontSize: "0.82rem", padding: "0.45em 0.9em" }} onClick={promptInstall}>
            ⬇ Instalar app
          </button>
        )}
      </nav>
    </header>
  );
}
