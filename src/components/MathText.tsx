import type { ReactNode } from "react";
import { InlineMath, BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

type Token = { type: "text" | "math"; content: string } | { type: "bold" };

/** Tokeniza un fragmento de texto plano en text / math($...$) / bold(**), en un solo barrido
 * para que la negrita pueda envolver matemáticas sin romperse en los bordes de $...$. */
function tokenize(plain: string): Token[] {
  const regex = /\$(.+?)\$|\*\*/gs;
  const tokens: Token[] = [];
  let lastIndex = 0;
  for (const m of plain.matchAll(regex)) {
    if (m.index! > lastIndex) tokens.push({ type: "text", content: plain.slice(lastIndex, m.index) });
    if (m[1] !== undefined) tokens.push({ type: "math", content: m[1] });
    else tokens.push({ type: "bold" });
    lastIndex = m.index! + m[0].length;
  }
  if (lastIndex < plain.length) tokens.push({ type: "text", content: plain.slice(lastIndex) });
  return tokens;
}

function renderTokens(plain: string, keyPrefix: string): ReactNode[] {
  const tokens = tokenize(plain);
  const nodes: ReactNode[] = [];
  let bold = false;
  tokens.forEach((t, i) => {
    const key = `${keyPrefix}-${i}`;
    if (t.type === "bold") {
      bold = !bold;
      return;
    }
    const content =
      t.type === "math" ? (
        <InlineMath key={key} math={t.content} errorColor="#ff4d6d" />
      ) : (
        <span key={key} style={{ whiteSpace: "pre-wrap" }}>
          {t.content}
        </span>
      );
    nodes.push(
      bold ? (
        <strong key={key} style={{ color: "var(--text)" }}>
          {content}
        </strong>
      ) : (
        content
      )
    );
  });
  return nodes;
}

/**
 * Renderiza texto mixto con LaTeX: $...$ para inline, $$...$$ para bloque,
 * y **negrita** estilo Markdown (puede envolver fórmulas inline).
 */
export default function MathText({ text, className = "" }: { text: string; className?: string }) {
  const blocks = text.split(/\$\$(.+?)\$\$/gs);

  return (
    <span className={className}>
      {blocks.map((block, i) => {
        if (i % 2 === 1) {
          return <BlockMath key={i} math={block.trim()} errorColor="#ff4d6d" />;
        }
        return <span key={i}>{renderTokens(block, `${i}`)}</span>;
      })}
    </span>
  );
}
