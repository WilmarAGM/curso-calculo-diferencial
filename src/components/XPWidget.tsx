import { useGamification } from "../hooks/useGamification";

export default function XPWidget() {
  const { level, xpIntoLevel, xpForNextLevel, unlockedCount, badges } = useGamification();

  return (
    <div
      className="mono"
      title={`${unlockedCount}/${badges.length} insignias desbloqueadas`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5em",
        padding: "0.4em 0.8em",
        borderRadius: 999,
        border: "1px solid var(--panel-border)",
        background: "rgba(255,255,255,0.03)",
        fontSize: "0.75rem",
      }}
    >
      <span style={{ color: "var(--accent-warn)" }}>Nv.{level}</span>
      <div style={{ width: 56, height: 5, borderRadius: 4, background: "rgba(255,255,255,0.08)", overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: `${(xpIntoLevel / xpForNextLevel) * 100}%`,
            background: "linear-gradient(90deg, var(--accent), var(--accent-2))",
          }}
        />
      </div>
      <span style={{ color: "var(--text-dim)" }}>{unlockedCount}🏅</span>
    </div>
  );
}
