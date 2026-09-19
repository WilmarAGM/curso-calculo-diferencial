import type { ReactNode } from "react";
import { motion } from "framer-motion";
import MathText from "./MathText";
import type { TheorySection } from "../data/types";

const KIND_LABEL: Record<TheorySection["kind"], string> = {
  def: "Definición",
  theorem: "Teorema / Proposición",
  proof: "Demostración",
  note: "Nota metodológica",
};

const KIND_COLOR: Record<TheorySection["kind"], string> = {
  def: "var(--accent)",
  theorem: "var(--accent-good)",
  proof: "var(--accent-2)",
  note: "var(--accent-warn)",
};

function parseTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

function renderBody(body: string) {
  const lines = body.split(/\n+/).filter(Boolean);
  const blocks: ReactNode[] = [];
  let i = 0;
  let key = 0;
  while (i < lines.length) {
    const line = lines[i];
    const isTableRow = line.trim().startsWith("|");
    if (isTableRow) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const rows = tableLines.map(parseTableRow).filter((r) => !r.every((c) => /^-+$/.test(c)));
      const [header, ...body_] = rows;
      blocks.push(
        <div key={key++} style={{ overflowX: "auto", margin: "0.8em 0" }}>
          <table style={{ borderCollapse: "collapse", width: "100%", fontSize: "0.88rem" }}>
            <thead>
              <tr>
                {header.map((h, hi) => (
                  <th
                    key={hi}
                    style={{
                      textAlign: "left",
                      padding: "0.5em 0.8em",
                      borderBottom: "1px solid var(--panel-border)",
                      color: "var(--accent)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <MathText text={h} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body_.map((row, ri) => (
                <tr key={ri}>
                  {row.map((c, ci) => (
                    <td
                      key={ci}
                      style={{
                        padding: "0.5em 0.8em",
                        borderBottom: "1px solid rgba(255,255,255,0.05)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <MathText text={c} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }
    const isListItem = /^\d+\.\s/.test(line.trim());
    blocks.push(
      <div key={key++} style={{ margin: isListItem ? "0.4em 0 0.4em 0.2em" : "0.6em 0", lineHeight: 1.65 }}>
        <MathText text={line} />
      </div>
    );
    i++;
  }
  return blocks;
}

export default function TheoryBlock({ section }: { section: TheorySection }) {
  const color = KIND_COLOR[section.kind];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="glass-panel"
      style={{
        padding: "1.4rem 1.6rem",
        marginBottom: "1.1rem",
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.6em", marginBottom: "0.3em" }}>
        <span
          className="mono"
          style={{
            fontSize: "0.7rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color,
            fontWeight: 700,
          }}
        >
          {KIND_LABEL[section.kind]}
        </span>
      </div>
      <h3 style={{ margin: "0 0 0.5em 0", fontSize: "1.08rem", color: "var(--text)" }}>
        <MathText text={section.title} />
      </h3>
      <div style={{ color: "var(--text-dim)", fontSize: "0.96rem" }}>{renderBody(section.body)}</div>
    </motion.div>
  );
}
