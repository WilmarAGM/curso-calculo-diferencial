import type { QuizQuestion } from "../types";

const quizWeek4: QuizQuestion[] = [
  {
    id: "q4-1",
    type: "mc",
    prompt: "El criterio gráfico de inyectividad establece que toda recta ___ corta la gráfica a lo sumo una vez.",
    options: ["vertical", "horizontal", "diagonal", "tangente"],
    correctIndex: 1,
    explanation: "Si una horizontal corta la gráfica dos veces, hay dos valores de $x$ con la misma imagen $\\implies$ no es inyectiva.",
  },
  {
    id: "q4-2",
    type: "tf",
    prompt: "Toda función sobreyectiva es también inyectiva.",
    correctBool: false,
    explanation: "Son propiedades independientes. Sobreyectiva significa $\\text{ran}(f)=Y$; no dice nada sobre si hay elementos repetidos en el dominio.",
  },
  {
    id: "q4-3",
    type: "fill",
    prompt: "Una función $f:X\\to Y$ es ___ si $\\text{ran}(f)=Y$ (todo elemento del codominio tiene preimagen).",
    correctText: ["sobreyectiva", "sobreyectiva (sobre)"],
    explanation: "Esa es la definición de sobreyectividad.",
  },
  {
    id: "q4-4",
    type: "mc",
    prompt: "Una función es biyectiva si es inyectiva y además:",
    options: ["Continua", "Sobreyectiva", "Par", "Periódica"],
    correctIndex: 1,
    explanation: "Biyectiva = inyectiva + sobreyectiva simultáneamente.",
  },
  {
    id: "q4-5",
    type: "tf",
    prompt: "Si $X$ y $Y$ son conjuntos finitos con $|X|=|Y|$, entonces $f:X\\to Y$ es inyectiva si y solo si es sobreyectiva.",
    correctBool: true,
    explanation: "Es el principio del palomar aplicado a funciones: con tamaños iguales, una implica la otra.",
  },
  {
    id: "q4-6",
    type: "mc",
    prompt: "Al restringir una función $g:M\\to M$ no inyectiva para forzar biyectividad, el procedimiento correcto es:",
    options: [
      "Retirar un elemento del dominio y codominio simultáneamente hasta eliminar la colisión",
      "Cambiar el codominio a $\\mathbb{R}$",
      "Multiplicar $g$ por una constante",
      "Ignorar el problema",
    ],
    correctIndex: 0,
    explanation: "Se detecta la colisión (dos elementos con la misma imagen) y se retira estratégicamente un elemento de ambos lados hasta lograr biyectividad completa.",
  },
];

export default quizWeek4;
