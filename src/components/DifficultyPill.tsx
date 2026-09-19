import type { Difficulty } from "../data/types";

const LABEL: Record<Difficulty, string> = {
  C: "Contenido",
  A: "Análisis",
  I: "Ingenio",
};

export default function DifficultyPill({ d }: { d: Difficulty }) {
  return <span className={`pill pill-${d}`}>{`[${d}] ${LABEL[d]}`}</span>;
}
