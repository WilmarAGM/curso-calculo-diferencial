import type { Week } from "../types";
import quizWeek4 from "../quizzes/week4";
import flashcardsWeek4 from "../flashcards/week4";

const week4: Week = {
  slug: "semana-4",
  number: 4,
  dateRange: "22/IX – 25/IX",
  title: "Inyectividad, Sobreyectividad y Biyectividad",
  summary:
    "Criterios analíticos y gráficos para clasificar funciones según su comportamiento de correspondencia, y técnicas de restricción de dominio/codominio para forzar biyectividad.",
  sections: ["1.5"],
  theory: [
    {
      id: "w4-t1",
      kind: "def",
      title: "Inyectividad, sobreyectividad y biyectividad",
      body:
        "Sea $f:X\\to Y$:\n\n" +
        "- **Inyectiva (uno a uno):** $\\forall x_1,x_2\\in X,\\ f(x_1)=f(x_2)\\implies x_1=x_2$. Equivalente: elementos distintos tienen imágenes distintas. **Criterio gráfico:** toda recta horizontal corta la gráfica **a lo sumo** una vez.\n" +
        "- **Sobreyectiva (sobre):** $\\text{ran}(f)=Y$, es decir todo elemento del codominio tiene preimagen.\n" +
        "- **Biyectiva:** inyectiva y sobreyectiva simultáneamente. Solo las funciones biyectivas admiten inversa $f^{-1}:Y\\to X$ definida en **todo** $Y$.",
    },
    {
      id: "w4-t2",
      kind: "note",
      title: "Criterios prácticos de inyectividad",
      body:
        "- **Analítico directo:** suponer $f(x_1)=f(x_2)$ y despejar; si se llega forzosamente a $x_1=x_2$, es inyectiva.\n" +
        "- **Monotonía:** toda función **estrictamente creciente o decreciente** en un intervalo es automáticamente inyectiva ahí (si $x_1<x_2$, la desigualdad estricta impide $f(x_1)=f(x_2)$).\n" +
        "- **En tablas/conjuntos finitos:** $f$ es inyectiva si y solo si **no hay dos filas con la misma imagen** (todos los valores de $f(x)$ son distintos).\n" +
        "- **Contraejemplo:** basta hallar $x_1\\ne x_2$ con $f(x_1)=f(x_2)$ para refutar inyectividad.",
    },
    {
      id: "w4-t3",
      kind: "note",
      title: "Criterios prácticos de sobreyectividad",
      body:
        "- Comparar el **rango calculado** de $f$ contra el **codominio declarado** $Y$: son sobreyectivas si y solo si coinciden.\n" +
        "- **En tablas/conjuntos finitos:** $f:X\\to Y$ es sobreyectiva si y solo si **cada elemento de $Y$ aparece al menos una vez** como imagen.\n" +
        "- Truco práctico: si $|X|=|Y|<\\infty$ (conjuntos finitos del mismo tamaño), entonces $f$ es inyectiva $\\iff$ $f$ es sobreyectiva $\\iff$ $f$ es biyectiva (principio del palomar aplicado a funciones).",
    },
    {
      id: "w4-t4",
      kind: "theorem",
      title: "Restricción estratégica para forzar biyectividad",
      body:
        "Si $g:M\\to M$ (con $M$ finito) **no** es inyectiva porque dos elementos distintos $p\\ne q$ comparten imagen ($g(p)=g(q)$), se puede intentar **retirar un único elemento** $D\\in M$ del dominio y codominio simultáneamente, de modo que $h:M\\setminus\\{D\\}\\to M\\setminus\\{D\\}$ sea biyectiva.\n\n" +
        "**Procedimiento:**\n" +
        "1. Detecta la colisión: valores $p\\ne q$ con $g(p)=g(q)=v$.\n" +
        "2. El candidato natural a retirar es uno de $\\{p,q\\}$ o el propio $v$ si eso resuelve la colisión sin crear una nueva.\n" +
        "3. Verifica que, tras retirar $D$, **todas** las imágenes restantes sean distintas entre sí y que el rango de $h$ coincida exactamente con $M\\setminus\\{D\\}$ (biyectividad completa, no solo inyectividad).",
    },
  ],
  examples: [
    {
      id: "w4-e1",
      title: "Remoción estratégica para garantizar biyectividad",
      difficulty: "A",
      source: "Guía 1273.pdf",
      statement:
        "$M=\\{13,27,45,69,81\\}$, $g:M\\to M$ con $g(13)=45,g(27)=13,g(45)=27,g(69)=69,g(81)=69$. Hallar $D\\in M$ a retirar para que $h:M\\setminus\\{D\\}\\to M\\setminus\\{D\\}$ sea biyectiva.",
      steps: [
        { text: "$g(69)=69$ y $g(81)=69$: dos elementos distintos comparten imagen, $g$ no es inyectiva." },
        { text: "Retiramos $D=81$: nuevo conjunto $N=\\{13,27,45,69\\}$." },
        { text: "$h(13)=45,h(27)=13,h(45)=27,h(69)=69$: todas las imágenes son distintas y cubren exactamente $N$." },
        { text: "$h$ es biyectiva." },
      ],
      answer: "$D=81$.",
    },
    {
      id: "w4-e2",
      title: "Inyectividad, inversa puntual y sobreyectividad en tablas",
      difficulty: "C",
      source: "Guía 1273.pdf",
      statement:
        "$X=\\{2,6,9,12,14,16\\}$, $Y=\\{20,21,23,27,30,38\\}$. $f:X\\to Y$ con $f(6)=38,f(9)=27,f(12)=30,f(14)=20,f(16)=21$ y $f(2)=A$ desconocido (debe ser inyectiva). Hallar $A$.",
      steps: [
        { text: "Los 5 valores conocidos de $f$ cubren $\\{38,27,30,20,21\\}\\subset Y$." },
        { text: "El único valor de $Y$ no usado es $23$; para que $f$ sea inyectiva (y por tamaños iguales, biyectiva), $f(2)$ debe ser ese valor." },
      ],
      answer: "$A=23$.",
    },
    {
      id: "w4-e3",
      title: "Inversa puntual y composición sobre biyecciones finitas",
      difficulty: "A",
      source: "Guía 1273.pdf",
      statement:
        "$M=\\{14,24,26,37,48,51,69,81\\}$. $f$: $14\\to26,24\\to24,26\\to81,37\\to51,48\\to48,51\\to69,69\\to14,81\\to37$. Calcular $A=f^{-1}(69)$, $B=f^{-1}(26)$, $C=f^{-1}(f(81))$.",
      steps: [
        { text: "$A=f^{-1}(69)$: buscar $x$ con $f(x)=69$; es $x=51$. $A=51$." },
        { text: "$B=f^{-1}(26)$: buscar $x$ con $f(x)=26$; es $x=14$. $B=14$." },
        { text: "$f(81)=37$, luego $C=f^{-1}(37)$: buscar $x$ con $f(x)=37$; es $x=69$. $C=69$." },
      ],
      answer: "$A=51$, $B=14$, $C=69$.",
    },
  ],
  exercises: [
    {
      id: "w4-x1",
      title: "Determinación de valores para inyectividad y sobreyectividad simultáneas",
      difficulty: "C",
      source: "Guía 1273.pdf",
      statement:
        "$X=\\{2,6,9,12,14,16\\}\\to Y=\\{20,21,23,27,30,38\\}$ (inyectiva $f$, ya resuelto $A=23$). $g:X\\to Y$ biyectiva con $g(2)=23,g(6)=38,g(9)=30,g(12)=21,g(14)=20,g(16)=27$: hallar $B=g^{-1}(20)$ y $C=g^{-1}(27)$. Además $h:X\\to Z=\\{20,21,23,27,30\\}$ con $h(2)=30,h(6)=30,h(9)=20,h(12)=21,h(14)=23$ y $h(16)=D$ para que $h$ sea sobreyectiva.",
      steps: [
        { text: "$g^{-1}(20)$: buscar $x$ con $g(x)=20$; es $x=14$. $B=14$." },
        { text: "$g^{-1}(27)$: buscar $x$ con $g(x)=27$; es $x=16$. $C=16$." },
        { text: "Para $h$ sobreyectiva sobre $Z$, los 5 valores de $Z=\\{20,21,23,27,30\\}$ deben aparecer. Con los 5 primeros ya cubren $\\{30,20,21,23\\}$; falta $27$, así $D=27$." },
      ],
      answer: "$B=14$, $C=16$, $D=27$.",
    },
    {
      id: "w4-x2",
      title: "Inyectividad de función racional en un intervalo",
      difficulty: "A",
      source: "Aplicación de criterios (elaboración propia)",
      statement:
        "Determinar si $f(x)=\\dfrac{1}{x-3}$ es inyectiva en $\\text{dom}(f)=\\mathbb{R}\\setminus\\{3\\}$, usando el método analítico directo.",
      steps: [
        { text: "Suponemos $f(x_1)=f(x_2)$: $\\dfrac{1}{x_1-3}=\\dfrac{1}{x_2-3}$." },
        { text: "Como ambos denominadores son no nulos, se puede invertir la igualdad: $x_1-3=x_2-3 \\implies x_1=x_2$." },
        { text: "Por tanto $f$ es inyectiva en todo su dominio." },
      ],
      answer: "$f$ es inyectiva en $\\mathbb{R}\\setminus\\{3\\}$.",
    },
  ],
  quiz: quizWeek4,
  flashcards: flashcardsWeek4,
};

export default week4;
