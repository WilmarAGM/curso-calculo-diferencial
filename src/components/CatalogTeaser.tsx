import { Link } from "react-router-dom";
import catalog from "../data/catalog";
import FunctionPlot from "./graph/FunctionPlot";

export default function CatalogTeaser() {
  const sample = catalog.filter((c) => ["power-even", "rational", "exp-grow", "sin"].includes(c.id));
  return (
    <div className="glass-panel" style={{ padding: "1.1rem", margin: "0.6rem 0 1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8em", flexWrap: "wrap", gap: "0.6em" }}>
        <div className="mono" style={{ fontSize: "0.72rem", color: "var(--accent)" }}>
          📊 VE TODAS LAS FAMILIAS GRAFICADAS
        </div>
        <Link to="/galeria" className="btn btn-primary" style={{ fontSize: "0.8rem" }}>
          Abrir galería completa (22 funciones) →
        </Link>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))", gap: "0.8em" }}>
        {sample.map((c) => (
          <div key={c.id}>
            <FunctionPlot xRange={c.xRange} yRange={c.yRange} curves={[{ id: c.id, color: "var(--accent)", segments: c.segments }]} asymptotes={c.asymptotes} height={120} showGrid={false} />
            <div style={{ textAlign: "center", fontSize: "0.72rem", color: "var(--text-dim)" }}>{c.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
