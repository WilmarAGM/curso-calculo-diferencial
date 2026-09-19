export default function Slider({
  label,
  value,
  min,
  max,
  step = 0.1,
  onChange,
  color = "var(--accent)",
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  color?: string;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: "0.3em", fontSize: "0.82rem" }}>
      <span style={{ display: "flex", justifyContent: "space-between", color: "var(--text-dim)" }}>
        <span>{label}</span>
        <span className="mono" style={{ color, fontWeight: 700 }}>
          {value.toFixed(Math.abs(step) < 1 ? 2 : 0)}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ accentColor: color, width: "100%" }}
      />
    </label>
  );
}
