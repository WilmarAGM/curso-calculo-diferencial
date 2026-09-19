import type { ReactNode } from "react";
import {
  ParityGraph,
  PeriodicityGraph,
  FloorCeilGraph,
  DistanceFunctionGraph,
  MonotonicityGraph,
  AreaAccumuladaGraph,
  CompositionGraph,
} from "./StaticGraphs";
import TransformSimulator from "../../components/graph/TransformSimulator";
import TransformLab from "../../components/graph/TransformLab";
import CatalogTeaser from "../../components/CatalogTeaser";
import { PowerLogLogGraph, ExponentialSemiLogGraph } from "./ModelGraphs";
import SignTableWalkthrough from "../../components/signchart/SignTableWalkthrough";
import signTableExample from "../signTableExample";

/** Mapa: id de sección de teoría -> ilustración/simulador a insertar justo después. */
const theoryGraphRegistry: Record<string, ReactNode> = {
  "w1-t8": <SignTableWalkthrough example={signTableExample} />,
  "w1-t10": <ParityGraph />,
  "w1-t13": <MonotonicityGraph />,
  "w1-t14": <PeriodicityGraph />,
  "w2-t3": <FloorCeilGraph />,
  "w2-t4": <DistanceFunctionGraph />,
  "w2-t8": (
    <PowerLogLogGraph
      A={200}
      k={-2}
      xMax={9}
      points={[
        { x: 2, y: 50, label: "(2, 50)" },
        { x: 8, y: 3.125, label: "(8, 3.125)" },
      ]}
    />
  ),
  "w2-t11": (
    <ExponentialSemiLogGraph
      A={300}
      T={5}
      xMax={20}
      yLabel="P"
      points={[
        { x: 0, y: 300, label: "P₀" },
        { x: 15, y: 2400, label: "P(15)" },
      ]}
    />
  ),
  "w2-t13": <CatalogTeaser />,
  "w3-t5": <TransformLab />,
  "w3-t6": <TransformSimulator />,
  "w3-t9": <CompositionGraph />,
  "b-t1": <AreaAccumuladaGraph />,
};

export default theoryGraphRegistry;
