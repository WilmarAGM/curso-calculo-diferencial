import type { FlashCard } from "../types";

const flashcardsWeek4: FlashCard[] = [
  { id: "fc4-1", front: "Define función inyectiva.", back: "$f(x_1)=f(x_2)\\implies x_1=x_2$: entradas distintas dan salidas distintas." },
  { id: "fc4-2", front: "Define función sobreyectiva.", back: "$\\text{ran}(f)=Y$: todo elemento del codominio tiene preimagen." },
  { id: "fc4-3", front: "Define función biyectiva.", back: "Inyectiva y sobreyectiva simultáneamente." },
  { id: "fc4-4", front: "Criterio gráfico de inyectividad.", back: "Toda recta horizontal corta la gráfica a lo sumo una vez." },
  { id: "fc4-5", front: "Con $|X|=|Y|$ finitos, ¿inyectiva implica sobreyectiva?", back: "Sí: en conjuntos finitos del mismo tamaño, inyectiva ⟺ sobreyectiva ⟺ biyectiva." },
];

export default flashcardsWeek4;
