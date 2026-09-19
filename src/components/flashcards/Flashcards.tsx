import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MathText from "../MathText";
import type { FlashCard } from "../../data/types";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Flashcards({ cards }: { cards: FlashCard[] }) {
  const [queue, setQueue] = useState<FlashCard[]>(() => [...cards]);
  const [knownCount, setKnownCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const total = cards.length;

  const current = queue[0];
  const remaining = queue.length;
  const done = remaining === 0;

  function restart(shuffled = false) {
    setQueue(shuffled ? shuffle(cards) : [...cards]);
    setKnownCount(0);
    setReviewCount(0);
    setFlipped(false);
  }

  function markKnown() {
    setKnownCount((k) => k + 1);
    setQueue((q) => q.slice(1));
    setFlipped(false);
  }

  function markReview() {
    setReviewCount((r) => r + 1);
    setQueue((q) => [...q.slice(1), q[0]]);
    setFlipped(false);
  }

  const progressPct = useMemo(() => Math.round((knownCount / total) * 100), [knownCount, total]);

  if (total === 0) return null;

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="glass-panel" style={{ padding: "2rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "0.2em" }}>🎴✨</div>
        <h2 style={{ margin: "0 0 0.3em 0" }}>¡Repasaste todas las tarjetas!</h2>
        <p style={{ color: "var(--text-dim)", marginBottom: "1.2em" }}>
          {knownCount} de {total} marcadas como "la sé" al primer intento{reviewCount > 0 ? ` (${reviewCount} necesitaron repaso extra)` : ""}.
        </p>
        <div style={{ display: "flex", gap: "0.6em", justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn btn-primary" onClick={() => restart(false)}>
            ↺ Repasar de nuevo
          </button>
          <button className="btn" onClick={() => restart(true)}>
            🔀 Repasar mezclado
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.8em" }}>
        <div className="mono" style={{ fontSize: "0.75rem", color: "var(--text-dim)" }}>
          Quedan {remaining} de {total}
        </div>
        <button className="btn" style={{ fontSize: "0.72rem" }} onClick={() => restart(true)}>
          🔀 Mezclar
        </button>
      </div>
      <div style={{ height: 6, borderRadius: 4, background: "rgba(255,255,255,0.06)", overflow: "hidden", marginBottom: "1.6em" }}>
        <div
          style={{
            height: "100%",
            width: `${progressPct}%`,
            background: "linear-gradient(90deg, var(--accent-good), var(--accent))",
            transition: "width 0.35s ease",
          }}
        />
      </div>

      <div style={{ perspective: 1400 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id + String(flipped)}
            initial={{ rotateY: flipped ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: flipped ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setFlipped((f) => !f)}
            className="glass-panel"
            style={{
              minHeight: 220,
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              cursor: "pointer",
              border: flipped ? "1px solid rgba(109,255,176,0.35)" : "1px solid rgba(125,252,255,0.25)",
              background: flipped
                ? "linear-gradient(160deg, rgba(109,255,176,0.06), rgba(10,13,24,0.85))"
                : "linear-gradient(160deg, rgba(125,252,255,0.06), rgba(10,13,24,0.85))",
            }}
          >
            <div
              className="mono"
              style={{ fontSize: "0.68rem", color: flipped ? "var(--accent-good)" : "var(--accent)", marginBottom: "1em", letterSpacing: "0.08em" }}
            >
              {flipped ? "RESPUESTA — toca para volver" : "PREGUNTA — toca para revelar"}
            </div>
            <div style={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
              <MathText text={flipped ? current.back : current.front} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {flipped && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", gap: "0.6em", marginTop: "1.2em", justifyContent: "center" }}>
          <button
            className="btn"
            style={{ borderColor: "rgba(255,95,182,0.4)", color: "var(--accent-3)" }}
            onClick={markReview}
          >
            😕 Repasar de nuevo
          </button>
          <button className="btn btn-primary" onClick={markKnown}>
            ✅ La sé
          </button>
        </motion.div>
      )}
    </div>
  );
}
