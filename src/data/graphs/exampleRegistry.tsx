import type { ReactNode } from "react";
import { PowerLogLogGraph, ExponentialSemiLogGraph } from "./ModelGraphs";

/** Mapa: id de ejemplo -> ilustración a insertar justo después de la tarjeta. */
const exampleGraphRegistry: Record<string, ReactNode> = {
  "w2-e5": (
    <ExponentialSemiLogGraph
      A={160}
      T={4}
      xMax={24}
      decay
      yLabel="M"
      points={[
        { x: 0, y: 160, label: "M₀" },
        { x: 12, y: 20, label: "(12, 20)" },
        { x: 20, y: 5, label: "M(20)" },
      ]}
    />
  ),
  "w2-e6": (
    <ExponentialSemiLogGraph
      A={300}
      T={5}
      xMax={25}
      yLabel="P"
      points={[
        { x: 0, y: 300, label: "P₀" },
        { x: 15, y: 2400, label: "P(15)" },
        { x: 25, y: 9600, label: "P(25)" },
      ]}
    />
  ),
  "w2-e7": (
    <ExponentialSemiLogGraph
      A={80}
      T={5}
      xMax={15}
      decay
      yLabel="T−20 (diferencia con el ambiente)"
      points={[
        { x: 0, y: 80, label: "D₀=80" },
        { x: 5, y: 40, label: "D(5)=40" },
        { x: 15, y: 10, label: "D(15)=10" },
      ]}
    />
  ),
  "w2-e8": <PowerLogLogGraph A={200} k={-2} xMax={9} points={[{ x: 2, y: 50, label: "(2, 50)" }, { x: 4, y: 12.5, label: "I(4)" }, { x: 8, y: 3.125, label: "(8, 3.125)" }]} />,
};

export default exampleGraphRegistry;
