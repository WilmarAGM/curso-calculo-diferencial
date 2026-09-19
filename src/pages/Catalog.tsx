import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import catalog from "../data/catalog";
import FunctionPlot from "../components/graph/FunctionPlot";
import MathText from "../components/MathText";

export default function Catalog() {
  const families = useMemo(() => Array.from(new Set(catalog.map((c) => c.family))), []);
  const [params] = useSearchParams();
  const fromUrl = params.get("f");
  const [active, setActive] = useState<string | "todas">(fromUrl && families.includes(fromUrl) ? fromUrl : "todas");

  const items = active === "todas" ? catalog : catalog.filter((c) => c.family === active);

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "2.2rem 1.4rem 5rem" }}>
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", margin: "0 0 0.3em 0" }}>
          Galería de <span className="neon-text">Familias de Funciones</span>
        </h1>
        <p style={{ color: "var(--text-dim)", marginBottom: "1.4em", maxWidth: 720, lineHeight: 1.6 }}>
          Todas las familias de funciones del programa (Semanas 1–5), cada una con su gráfica, dominio y rango.
          Pasa el mouse sobre cualquier curva para leer coordenadas exactas.
        </p>
      </motion.div>

      <div style={{ display: "flex", gap: "0.5em", flexWrap: "wrap", marginBottom: "1.6em" }}>
        <button
          className="btn"
          onClick={() => setActive("todas")}
          style={{
            background: active === "todas" ? "linear-gradient(120deg, var(--accent), var(--accent-2))" : undefined,
            color: active === "todas" ? "#05070d" : undefined,
            border: active === "todas" ? "none" : undefined,
          }}
        >
          Todas ({catalog.length})
        </button>
        {families.map((f) => (
          <button
            key={f}
            className="btn"
            onClick={() => setActive(f)}
            style={{
              background: active === f ? "linear-gradient(120deg, var(--accent), var(--accent-2))" : undefined,
              color: active === f ? "#05070d" : undefined,
              border: active === f ? "none" : undefined,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "1.1rem" }}>
        {items.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.02 }}
            className="glass-panel"
            style={{ padding: "1.1rem" }}
          >
            <div className="mono" style={{ fontSize: "0.68rem", color: "var(--accent)", marginBottom: "0.3em" }}>
              {entry.family.toUpperCase()}
            </div>
            <h3 style={{ margin: "0 0 0.2em 0", fontSize: "1rem" }}>{entry.title}</h3>
            <div style={{ marginBottom: "0.6em", fontSize: "0.95rem" }}>
              <MathText text={`$${entry.tex}$`} />
            </div>
            <FunctionPlot
              xRange={entry.xRange}
              yRange={entry.yRange}
              curves={[{ id: entry.id, color: "var(--accent)", segments: entry.segments }]}
              asymptotes={entry.asymptotes}
              height={200}
            />
            <div style={{ fontSize: "0.78rem", color: "var(--text-dim)", marginTop: "0.6em", lineHeight: 1.5 }}>
              <div>
                <strong style={{ color: "var(--text)" }}>Dominio:</strong> {entry.domain}
              </div>
              <div>
                <strong style={{ color: "var(--text)" }}>Rango:</strong> {entry.range}
              </div>
              <div style={{ marginTop: "0.3em" }}>{entry.note}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
