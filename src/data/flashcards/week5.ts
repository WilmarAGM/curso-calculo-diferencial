import type { FlashCard } from "../types";

const flashcardsWeek5: FlashCard[] = [
  { id: "fc5-1", front: "¿Cuándo existe $f^{-1}$?", back: "Si y solo si $f$ es biyectiva." },
  { id: "fc5-2", front: "Relación entre dom/ran de $f$ y de $f^{-1}$.", back: "$\\text{dom}(f^{-1})=\\text{ran}(f)$ y $\\text{ran}(f^{-1})=\\text{dom}(f)$." },
  { id: "fc5-3", front: "¿Respecto a qué recta se refleja la gráfica de $f^{-1}$?", back: "Respecto a la recta $y=x$." },
  { id: "fc5-4", front: "Rango de $\\arccos(x)$.", back: "$[0,\\pi]$." },
  { id: "fc5-5", front: "Rango de $\\arcsin(x)$.", back: "$[-\\pi/2,\\pi/2]$." },
  { id: "fc5-6", front: "Rango de $\\arctan(x)$.", back: "$(-\\pi/2,\\pi/2)$." },
  { id: "fc5-7", front: "Pasos para hallar $f^{-1}$ analíticamente.", back: "1) Escribe $y=f(x)$. 2) Despeja $x$ en función de $y$. 3) Intercambia $x\\leftrightarrow y$." },
];

export default flashcardsWeek5;
