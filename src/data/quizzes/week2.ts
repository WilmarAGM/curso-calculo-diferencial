import type { QuizQuestion } from "../types";

const quizWeek2: QuizQuestion[] = [
  {
    id: "q2-1",
    type: "mc",
    prompt: "Si $x\\notin A$, ¿cuánto vale la función indicatriz $\\mathbf{1}_A(x)$?",
    options: ["1", "0", "$-1$", "Indefinido"],
    correctIndex: 1,
    explanation: "$\\mathbf{1}_A(x)=1$ si $x\\in A$, y $0$ si $x\\notin A$ — vale exactamente 0 fuera del conjunto.",
  },
  {
    id: "q2-2",
    type: "tf",
    prompt: "Para todo $x$ real, $\\lfloor x\\rfloor \\le x < \\lfloor x\\rfloor+1$.",
    correctBool: true,
    explanation: "Es la propiedad definitoria de la función suelo: es el mayor entero que no supera a $x$.",
  },
  {
    id: "q2-3",
    type: "fill",
    prompt: "La Tasa de Cambio Promedio $T_{a,b}[f]$ es geométricamente la pendiente de la recta ___ por $(a,f(a))$ y $(b,f(b))$.",
    correctText: ["secante"],
    explanation: "$T_{a,b}[f]=\\dfrac{f(b)-f(a)}{b-a}$ es exactamente la pendiente de la recta secante entre esos dos puntos.",
  },
  {
    id: "q2-4",
    type: "mc",
    prompt: "El dominio de una función racional $f(x)=\\dfrac{p(x)}{q(x)}$ excluye los puntos donde:",
    options: ["$p(x)=0$", "$q(x)=0$", "$p(x)=q(x)$", "$x=0$"],
    correctIndex: 1,
    explanation: "Una función racional no está definida donde el denominador se anula, sin importar el numerador.",
  },
  {
    id: "q2-5",
    type: "tf",
    prompt: "En un modelo potencial $y=Ax^k$, graficar $u=\\ln x$ contra $v=\\ln y$ produce siempre una recta.",
    correctBool: true,
    explanation: "$v=ku+\\ln A$ es lineal en $u$: por eso se llama linearización log-log, y la pendiente es exactamente $k$.",
  },
  {
    id: "q2-6",
    type: "mc",
    prompt: "En un modelo exponencial $y=A\\cdot a^x$, ¿qué transformación produce una recta (escala semi-log)?",
    options: [
      "Graficar $\\ln x$ vs $\\ln y$",
      "Graficar $x$ vs $\\ln y$",
      "Graficar $x$ vs $y^2$",
      "Graficar $\\ln x$ vs $y$",
    ],
    correctIndex: 1,
    explanation: "Solo se aplica logaritmo al eje $y$: $v=\\ln y = x\\ln a + \\ln A$ es lineal en $x$ directamente (no en $\\ln x$).",
  },
  {
    id: "q2-7",
    type: "mc",
    prompt: "Si la vida media de una sustancia es $T$, después de $3T$ unidades de tiempo queda qué fracción de la masa inicial:",
    options: ["$1/2$", "$1/4$", "$1/8$", "$1/16$"],
    correctIndex: 2,
    explanation: "Cada vida media divide la masa entre 2: después de 3 vidas medias, $M=M_0(1/2)^3=M_0/8$.",
  },
  {
    id: "q2-8",
    type: "tf",
    prompt: "La función $\\lceil x\\rceil$ (techo) satisface $\\lceil x\\rceil - 1 < x \\le \\lceil x\\rceil$.",
    correctBool: true,
    explanation: "Es la propiedad definitoria de la función techo: el menor entero que no es menor que $x$.",
  },
];

export default quizWeek2;
