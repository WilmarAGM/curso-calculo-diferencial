import { Link } from "react-router-dom";
import TransformLab from "../components/graph/TransformLab";
import TransformSimulator from "../components/graph/TransformSimulator";

export default function Transformaciones() {
  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: "2.2rem 1.4rem 5rem" }}>
      <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", margin: "0 0 0.3em 0" }}>
        Transformaciones <span className="neon-text">paso a paso</span>
      </h1>
      <p style={{ color: "var(--text-dim)", maxWidth: 760, lineHeight: 1.6, marginBottom: "1.2em" }}>
        Aplica <strong style={{ color: "var(--text)" }}>una sola</strong> transformación a una gráfica por tramos y mira qué
        pasa en cada eje: lo que ocurre en <span style={{ color: "#7dfcff" }}>x (dominio)</span> va en cian y lo que ocurre en{" "}
        <span style={{ color: "#ff5fb6" }}>y (rango)</span> va en rosa. Si un eje no se ve afectado, se marca{" "}
        <strong style={{ color: "var(--accent-good)" }}>No cambia</strong>. Teoría en{" "}
        <Link to="/semana/semana-3?sec=w3-t3" style={{ color: "var(--accent)" }}>
          Semana 3
        </Link>
        .
      </p>
      <TransformLab />
      <h2 style={{ fontSize: "1.1rem", marginTop: "2rem" }}>¿Y cuando se combinan? g(x) = c·f(ax − b) + d</h2>
      <TransformSimulator />
    </div>
  );
}
