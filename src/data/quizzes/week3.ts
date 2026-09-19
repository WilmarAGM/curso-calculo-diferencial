import type { QuizQuestion } from "../types";

const quizWeek3: QuizQuestion[] = [
  {
    id: "q3-1",
    type: "mc",
    prompt: "La gráfica de $y=f(x-h)$ con $h>0$ se obtiene desplazando $y=f(x)$:",
    options: ["$h$ unidades a la izquierda", "$h$ unidades a la derecha", "$h$ unidades hacia arriba", "$h$ unidades hacia abajo"],
    correctIndex: 1,
    explanation: "Es contraintuitivo pero así es: $f(x-h)$ mueve la gráfica hacia la **derecha**, porque hay que evaluar en un $x$ mayor para obtener el mismo valor.",
  },
  {
    id: "q3-2",
    type: "tf",
    prompt: "La gráfica de $y=f(cx)$ con $c>1$ se comprime horizontalmente.",
    correctBool: true,
    explanation: "Multiplicar el argumento por $c>1$ hace que la función 'ocurra más rápido', comprimiendo la gráfica hacia el eje $Y$.",
  },
  {
    id: "q3-3",
    type: "mc",
    prompt: "La reflexión de $y=f(x)$ respecto al eje $X$ es:",
    options: ["$y=-f(x)$", "$y=f(-x)$", "$y=f(x)^{-1}$", "$y=-f(-x)$"],
    correctIndex: 0,
    explanation: "$-f(x)$ invierte el signo de las salidas (eje $X$); $f(-x)$ invierte el signo de las entradas (eje $Y$).",
  },
  {
    id: "q3-4",
    type: "fill",
    prompt: "En la composición $(g\\circ f)(x)=g(f(x))$, la función que se aplica primero es ___.",
    correctText: ["f", "f(x)"],
    explanation: "Se lee de derecha a izquierda: primero se evalúa $f$, y el resultado se le aplica a $g$.",
  },
  {
    id: "q3-5",
    type: "tf",
    prompt: "La composición de funciones es conmutativa: en general $f\\circ g = g\\circ f$.",
    correctBool: false,
    explanation: "En general $f\\circ g \\ne g\\circ f$. Sí es asociativa: $(h\\circ g)\\circ f = h\\circ(g\\circ f)$.",
  },
  {
    id: "q3-6",
    type: "mc",
    prompt: "Si $f$ tiene período fundamental $T_f$, el período de $F(x)=f(ax+b)$ es:",
    options: ["$T_f \\cdot |a|$", "$T_f / |a|$", "$T_f + a$", "$T_f - b$"],
    correctIndex: 1,
    explanation: "El teorema de escalamiento del período: $T_F = T_f/|a|$. Un $a$ grande comprime el período (se repite más rápido).",
  },
  {
    id: "q3-7",
    type: "mc",
    prompt: "El dominio de $g\\circ f$ es:",
    options: [
      "$\\{x\\in\\text{dom}(f) : f(x)\\in\\text{dom}(g)\\}$",
      "$\\text{dom}(f)\\cup\\text{dom}(g)$",
      "$\\text{dom}(g)$ solamente",
      "$\\{x : g(x)\\in\\text{dom}(f)\\}$",
    ],
    correctIndex: 0,
    explanation: "Se necesita que $x$ esté en el dominio de $f$, y que el resultado $f(x)$ caiga dentro del dominio de $g$ para poder aplicarla.",
  },
  {
    id: "q3-8",
    type: "tf",
    prompt: "Si $\\text{ran}(f)=[y_1,y_2]$ y $c>0$, entonces $\\text{ran}(c\\cdot f(x))=[cy_1, cy_2]$.",
    correctBool: true,
    explanation: "Multiplicar por $c>0$ preserva el orden, así que el mínimo y máximo del rango simplemente se multiplican por $c$.",
  },
];

export default quizWeek3;
