import type { FlashCard } from "../types";

const flashcardsWeek2: FlashCard[] = [
  { id: "fc2-1", front: "¿Qué es $\\mathbf{1}_A(x)$?", back: "Vale $1$ si $x\\in A$, y $0$ si $x\\notin A$." },
  { id: "fc2-2", front: "¿Qué satisface $\\lfloor x\\rfloor$?", back: "$\\lfloor x\\rfloor \\le x < \\lfloor x\\rfloor+1$." },
  { id: "fc2-3", front: "Fórmula de la Tasa de Cambio Promedio $T_{a,b}[f]$.", back: "$T_{a,b}[f]=\\dfrac{f(b)-f(a)}{b-a}$, la pendiente de la recta secante." },
  { id: "fc2-4", front: "¿Qué cambio de variable convierte $y=Ax^k$ en una recta?", back: "$u=\\ln x$, $v=\\ln y$ (escala log-log): $v=ku+\\ln A$." },
  { id: "fc2-5", front: "¿Qué cambio de variable convierte $y=A\\cdot a^x$ en una recta?", back: "Solo $v=\\ln y$ (escala semi-log): $v=x\\ln a+\\ln A$." },
  { id: "fc2-6", front: "Modelo de decaimiento por vida media.", back: "$M(t)=M_0\\cdot 2^{-t/T_{1/2}}$." },
  { id: "fc2-7", front: "Dominio de una función racional $p(x)/q(x)$.", back: "Todo $\\mathbb{R}$ excepto los puntos donde $q(x)=0$." },
];

export default flashcardsWeek2;
