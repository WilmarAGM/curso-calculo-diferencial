import type { QuizQuestion } from "../types";

const quizWeek5: QuizQuestion[] = [
  {
    id: "q5-1",
    type: "mc",
    prompt: "$f:X\\to Y$ admite función inversa $f^{-1}$ si y solo si $f$ es:",
    options: ["Continua", "Par", "Biyectiva", "Periódica"],
    correctIndex: 2,
    explanation: "Solo las funciones biyectivas tienen inversa definida en todo el codominio.",
  },
  {
    id: "q5-2",
    type: "tf",
    prompt: "$\\text{dom}(f^{-1}) = \\text{ran}(f)$.",
    correctBool: true,
    explanation: "Correcto: el dominio de la inversa es exactamente el rango de la función original (y viceversa para el rango de $f^{-1}$).",
  },
  {
    id: "q5-3",
    type: "mc",
    prompt: "La gráfica de $y=f^{-1}(x)$ es el reflejo de $y=f(x)$ respecto a la recta:",
    options: ["$y=0$", "$x=0$", "$y=x$", "$y=-x$"],
    correctIndex: 2,
    explanation: "Como se intercambian $x$ e $y$ al invertir, la gráfica se refleja especularmente respecto a $y=x$.",
  },
  {
    id: "q5-4",
    type: "mc",
    prompt: "El rango de $\\arccos(x)$ es:",
    options: ["$[-\\pi/2,\\pi/2]$", "$[0,\\pi]$", "$(-\\pi/2,\\pi/2)$", "$[-1,1]$"],
    correctIndex: 1,
    explanation: "$\\arccos$ es la inversa de $\\cos$ restringido a $[0,\\pi]$ (donde $\\cos$ es inyectiva), así que su rango es $[0,\\pi]$.",
  },
  {
    id: "q5-5",
    type: "tf",
    prompt: "$\\ln(e^x)=x$ para todo $x\\in\\mathbb{R}$.",
    correctBool: true,
    explanation: "$\\ln$ y $\\exp$ son funciones inversas entre sí en todo $\\mathbb{R}$, así que se cancelan siempre.",
  },
  {
    id: "q5-6",
    type: "mc",
    prompt: "Al hallar $f^{-1}$ analíticamente, después de escribir $y=f(x)$, el siguiente paso es:",
    options: [
      "Despejar $x$ en términos de $y$",
      "Derivar ambos lados",
      "Sustituir $x=0$",
      "Graficar directamente",
    ],
    correctIndex: 0,
    explanation: "Se despeja $x$ en función de $y$, y luego se intercambian los nombres de las variables para escribir $f^{-1}(x)$.",
  },
  {
    id: "q5-7",
    type: "fill",
    prompt: "El rango de $\\arcsin(x)$ es $[-\\pi/2, ___]$.",
    correctText: ["pi/2", "π/2"],
    explanation: "$\\arcsin$ es la inversa de $\\sin$ restringido a $[-\\pi/2,\\pi/2]$, así que ese es exactamente su rango.",
  },
];

export default quizWeek5;
