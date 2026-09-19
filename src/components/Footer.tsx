import { Link } from "react-router-dom";
import TeacherCredit from "./TeacherCredit";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: "5rem",
        borderTop: "1px solid var(--panel-border)",
        background: "linear-gradient(180deg, rgba(5,7,13,0.3) 0%, rgba(3,5,10,0.95) 100%)",
        backdropFilter: "blur(16px)",
        padding: "3.5rem 1.4rem 2rem",
        color: "var(--text-dim)",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem",
            alignItems: "start",
          }}
        >
          {/* Col 1: Identity & Logos */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.2rem" }}>
              <img
                src="/unal-logo.svg"
                alt="Universidad Nacional de Colombia"
                style={{ height: 48, filter: "brightness(1.1) drop-shadow(0 0 8px rgba(255,255,255,0.2))" }}
              />
              <img
                src="/course-logo.png"
                alt="Logo Cálculo Diferencial"
                style={{
                  height: 48,
                  width: 48,
                  borderRadius: "50%",
                  boxShadow: "0 0 12px rgba(125,252,255,0.4)",
                  border: "1px solid rgba(125,252,255,0.3)",
                }}
              />
            </div>
            <h4 style={{ color: "var(--text)", margin: "0 0 0.4rem 0", fontSize: "1.1rem" }}>
              Cálculo Diferencial
            </h4>
            <p style={{ fontSize: "0.84rem", lineHeight: 1.5, margin: 0 }}>
              Universidad Nacional de Colombia — Sede Medellín.
              Plataforma interactiva de acompañamiento académico para el Primer Parcial.
            </p>
          </div>

          {/* Col 2: Docente & Créditos */}
          <div>
            <h5 style={{ color: "var(--text)", margin: "0 0 0.8rem 0", fontSize: "0.92rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Docencia & Créditos
            </h5>
            <TeacherCredit variant="compact" />
            <p style={{ fontSize: "0.8rem", marginTop: "0.8rem", lineHeight: 1.4 }}>
              Contenido pedagógico y diseño de ejercicios para la formación de estudiantes de ingeniería y ciencias.
            </p>
          </div>

          {/* Col 3: Enlaces Rápidos */}
          <div>
            <h5 style={{ color: "var(--text)", margin: "0 0 0.8rem 0", fontSize: "0.92rem", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Módulos del Curso
            </h5>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, fontSize: "0.86rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li>
                <Link to="/" style={{ color: "var(--text-dim)", textDecoration: "none", transition: "color 0.2s" }}>
                  📚 Semanas 1–5 y Retos
                </Link>
              </li>
              <li>
                <Link to="/temario" style={{ color: "var(--text-dim)", textDecoration: "none", transition: "color 0.2s" }}>
                  🗺 Temario del Programa
                </Link>
              </li>
              <li>
                <Link to="/transformaciones" style={{ color: "var(--text-dim)", textDecoration: "none", transition: "color 0.2s" }}>
                  🎨 Transformación de Funciones
                </Link>
              </li>
              <li>
                <Link to="/galeria" style={{ color: "var(--text-dim)", textDecoration: "none", transition: "color 0.2s" }}>
                  📊 Galería de Funciones
                </Link>
              </li>
              <li>
                <Link to="/checklist" style={{ color: "var(--text-dim)", textDecoration: "none", transition: "color 0.2s" }}>
                  ✅ Auditoría de Preparación
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.78rem",
          }}
        >
          <div>
            © {new Date().getFullYear()} <strong>Universidad Nacional de Colombia</strong> · Cálculo Diferencial
          </div>
          <div>
            Desarrollado para el acompañamiento docente por <strong>Wilmar Alberto González Medina</strong>
          </div>
        </div>
      </div>
    </footer>
  );
}
