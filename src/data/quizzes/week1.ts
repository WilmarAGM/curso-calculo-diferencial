import type { QuizQuestion } from "../types";

const quizWeek1: QuizQuestion[] = [
  {
    id: "q1-1",
    type: "tf",
    prompt: "La desigualdad triangular establece que $|x+y| \\le |x|+|y|$ para todo $x,y\\in\\mathbb{R}$.",
    correctBool: true,
    explanation: "Es el Teorema de la Desigualdad Triangular, demostrado a partir de $-|z|\\le z\\le |z|$ aplicado a $x$ e $y$ y sumando.",
  },
  {
    id: "q1-2",
    type: "mc",
    prompt: "Al escribir $[a,b]$ como $|x-A|\\le B$, el valor de $A$ es:",
    options: ["$\\dfrac{a+b}{2}$ (punto medio)", "$\\dfrac{b-a}{2}$ (semilongitud)", "$a\\cdot b$", "$b-a$"],
    correctIndex: 0,
    explanation: "$A$ es el punto medio del intervalo; $B=\\dfrac{b-a}{2}$ es la semilongitud (el radio).",
  },
  {
    id: "q1-3",
    type: "mc",
    prompt: "Si $f(-x) = -f(x)$ para todo $x$ en el dominio, $f$ es:",
    options: ["Par", "Impar", "Creciente", "Periódica"],
    correctIndex: 1,
    explanation: "Esa es exactamente la definición de función impar (simetría respecto al origen).",
  },
  {
    id: "q1-4",
    type: "tf",
    prompt: "La función $f(x)=x^2-5$ es impar.",
    correctBool: false,
    explanation: "$f(-x)=(-x)^2-5=x^2-5=f(x)$, así que es **par**, no impar.",
  },
  {
    id: "q1-5",
    type: "fill",
    prompt: "Completa: el Axioma de Completitud dice que todo subconjunto no vacío de $\\mathbb{R}$ acotado superiormente tiene un ___ en $\\mathbb{R}$.",
    correctText: ["supremo", "supremo (mínima cota superior)"],
    explanation: "Es el axioma del supremo: existe la mínima cota superior, y es lo que distingue a $\\mathbb{R}$ de $\\mathbb{Q}$.",
  },
  {
    id: "q1-6",
    type: "mc",
    prompt: "Si $f(x)=E(x)+O(x)$ es la descomposición par/impar de $f$, entonces $E(x)$ es igual a:",
    options: ["$\\dfrac{f(x)+f(-x)}{2}$", "$\\dfrac{f(x)-f(-x)}{2}$", "$f(x)\\cdot f(-x)$", "$f(x)-f(-x)$"],
    correctIndex: 0,
    explanation: "La parte par es $E(x)=\\dfrac{f(x)+f(-x)}{2}$; la parte impar es $O(x)=\\dfrac{f(x)-f(-x)}{2}$.",
  },
  {
    id: "q1-7",
    type: "tf",
    prompt: "El período fundamental de una función periódica es el MAYOR valor $T>0$ tal que $f(x+T)=f(x)$.",
    correctBool: false,
    explanation: "Es al revés: el período fundamental es el **menor** valor positivo $T$ que cumple $f(x+T)=f(x)$.",
  },
  {
    id: "q1-8",
    type: "mc",
    prompt: "El criterio gráfico para que una curva sea la gráfica de una función es que toda recta ___ la corte a lo sumo una vez.",
    options: ["horizontal", "vertical", "diagonal", "tangente"],
    correctIndex: 1,
    explanation: "Es el criterio de la recta vertical: si alguna vertical corta la curva más de una vez, no es función (un $x$ tendría dos imágenes).",
  },
  {
    id: "q1-9",
    type: "mc",
    prompt: "Si $f$ es estrictamente creciente en un intervalo $I$, y $x_1<x_2$ en $I$, entonces:",
    options: ["$f(x_1) < f(x_2)$", "$f(x_1) > f(x_2)$", "$f(x_1) = f(x_2)$", "No se puede saber"],
    correctIndex: 0,
    explanation: "Esa es la definición de estrictamente creciente: el orden de las entradas se preserva en las salidas.",
  },
];

export default quizWeek1;
