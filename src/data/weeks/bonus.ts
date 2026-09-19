import type { Week } from "../types";

const bonus: Week = {
  slug: "modulo-ingenio",
  number: 6,
  dateRange: "Retos — fuera del temario de una sola semana",
  title: "Módulo de Retos [I]: Área Acumulada, Linearización Logarítmica y Síntesis",
  summary:
    "Ejercicios de reto que **no pertenecen a una semana específica**: combinan a propósito temas de varias semanas (1–5) o exigen un paso extra de ingenio — geometría del área bajo curvas por tramos, cambio de variable logarítmico, reconstrucción de funciones por paridad, y dominios que mezclan varias familias a la vez. Resuélvelos después de dominar el contenido semanal.",
  sections: ["Síntesis / Ingenio [I]"],
  theory: [
    {
      id: "b-t1",
      kind: "theorem",
      title: "Función de área acumulada φ(x) por geometría plana",
      body:
        "Dada $f(t)$ definida por tramos rectilíneos en $[x_0,\\ldots]$, la función de área acumulada $\\phi(x)$ desde $x_0$ mide la superficie neta bajo la curva entre $x_0$ y $x$:\n\n" +
        "**Tramo rectangular** ($f(t)=c$ constante): la región entre $x_1$ y $x$ es un rectángulo de base $(x-x_1)$ y altura $c$:\n" +
        "$$\\Delta\\phi(x) = c(x-x_1) \\implies \\phi(x) = Dx+E \\quad (\\text{lineal})$$\n" +
        "**Tramo trapezoidal** ($f(t)=mt+b$ lineal): la región es un trapecio de base $(x-x_1)$, altura izquierda $f(x_1)$ y altura derecha $f(x)$:\n" +
        "$$\\Delta\\phi(x) = \\frac{(x-x_1)[f(x_1)+f(x)]}{2} \\implies \\phi(x) = Fx^2+Gx+E \\quad (\\text{cuadrático})$$\n" +
        "**Regla de continuidad:** el valor de $\\phi$ al final de un tramo es el punto de partida (constante aditiva) del tramo siguiente — así $\\phi$ es siempre continua aunque $f$ tenga saltos.",
    },
    {
      id: "b-t2",
      kind: "theorem",
      title: "Linearización logarítmica de curvas de potencia",
      body:
        "Toda relación de potencia $y=Ax^k$ ($A>0$) se vuelve **lineal** con el cambio $u=\\ln x$, $v=\\ln y$:\n" +
        "$$v = ku + \\ln A$$",
    },
    {
      id: "b-t3",
      kind: "proof",
      title: "Demostración de la linearización logarítmica",
      body:
        "Tomando $\\ln$ a ambos lados de $y=Ax^k$: $\\ln y = \\ln A + \\ln(x^k) = \\ln A + k\\ln x$. Sustituyendo $v=\\ln y$, $u=\\ln x$: $v = ku+\\ln A$, ecuación de una recta en el plano $u\\times v$ con pendiente $m=k$ e intercepto $c=\\ln A$. $\\blacksquare$",
    },
  ],
  examples: [
    {
      id: "b-e1",
      title: "Área acumulada por geometría plana",
      difficulty: "I",
      source: "Parcial 2025-01",
      statement:
        "$f(t)=3$ en $[-6,0]$; $f(t)=8t+10$ en $(0,6]$. Hallar $\\phi(x)$ desde $x_0=-6$: $Dx+E$ en $[-6,0]$, $Fx^2+Gx+E$ en $(0,6]$.",
      steps: [
        { text: "Tramo 1: base $=x-(-6)=x+6$, altura $=3$: $\\phi(x)=3(x+6)=3x+18$. $D=3$, $E=18$." },
        { text: "Tramo 2: $\\phi(0)=18$. Para $x>0$, trapecio con base $x$, altura izq. $f(0)=10$, altura der. $f(x)=8x+10$: área $=\\dfrac{x[10+(8x+10)]}{2}=4x^2+10x$." },
        { text: "Sumando el acumulado inicial: $\\phi(x)=4x^2+10x+18$. $F=4$, $G=10$." },
      ],
      answer: "$D=3$, $E=18$, $F=4$, $G=10$.",
    },
    {
      id: "b-e2",
      title: "Linearización logarítmica en el plano u×v",
      difficulty: "I",
      source: "Parcial 2025-01",
      statement:
        "$y(x)=e^{7/2}x^{-5/2}$. Con $u=\\ln x$, $v=\\ln y$, hallar $A=v(1)$ y $B=v(3)$.",
      steps: [
        { text: "$v=\\ln y = \\ln(e^{7/2}) + \\ln(x^{-5/2}) = \\dfrac{7}{2} - \\dfrac{5}{2}\\ln x$." },
        { text: "Con $u=\\ln x$: $v(u) = -\\dfrac{5}{2}u+\\dfrac{7}{2}$." },
        { text: "$A=v(1)=-\\dfrac52(1)+\\dfrac72 = 1$." },
        { text: "$B=v(3)=-\\dfrac52(3)+\\dfrac72 = -\\dfrac{15}{2}+\\dfrac72 = -4$." },
      ],
      answer: "$A=1$, $B=-4$.",
    },
    {
      id: "b-e3",
      title: "Reconstrucción de la mitad positiva de una función impar por tramos",
      difficulty: "I",
      source: "Solucionario 2025-02",
      statement:
        "$F:\\mathbb{R}\\to\\mathbb{R}$ impar. $g=F|_{(-\\infty,0]}$ satisface $g(x)=3\\cdot\\mathbf{1}_{(-9,-7]}(x) - 5\\cdot\\mathbf{1}_{(-4,-1]}(x)$. Con $f=F|_{[0,\\infty)}$, hallar $A=F(3)$ y $B=f(8)$.",
      steps: [
        { text: "Como $F$ es impar, para $x\\ge0$: $f(x)=F(x)=-F(-x)=-g(-x)$." },
        { text: "$A=F(3)=f(3)=-g(-3)$. ¿$-3$ en qué tramo? $-3\\in(-4,-1] \\implies g(-3)=-5$. $A=-(-5)=5$." },
        { text: "$B=f(8)=-g(-8)$. ¿$-8$ en qué tramo? $-8\\in(-9,-7] \\implies g(-8)=3$. $B=-3$." },
      ],
      answer: "$A=5$, $B=-3$.",
    },
  ],
  exercises: [
    {
      id: "b-x1",
      title: "Función de área acumulada: literales adicionales",
      difficulty: "A",
      source: "Solucionario 2025-01",
      statement:
        "Con $f$ como en el ejemplo anterior ($f(t)=3$ en $[-6,0]$, $f(t)=8t+10$ en $(0,6]$): (a) $A=f(4)+f(-4)$. (b) $B=2\\phi(-5)$. (c) $C=2\\phi(1)$.",
      steps: [
        { text: "(a) $f(4)=8(4)+10=42$; $f(-4)=3$. $A=42+3=45$." },
        { text: "(b) $\\phi(-5)$: rectángulo de base $-5-(-6)=1$, altura 3: $\\phi(-5)=3$. $B=2(3)=6$." },
        { text: "(c) $\\phi(1)=18+4(1)^2+10(1)=18+4+10=32$. $C=2(32)=64$." },
      ],
      answer: "$A=45$, $B=6$, $C=64$.",
    },
    {
      id: "b-x2",
      title: "Interpolación de Lagrange como polinomio cuadrático",
      difficulty: "A",
      source: "Guía 1298.pdf",
      statement:
        "$f(x)=15L_{67}(x)+15L_{77}(x)+\\dfrac{B}{3}L_{59}(x)$ en la base de Lagrange con nodos $67,77,59$. (a) $A=f(77)$. (b) Si $f(59)=9$, hallar $B$. (c) Existen $C<D$ con $f(C)=f(D)=15$; hallarlos.",
      steps: [
        { text: "Por construcción, cada $L_k(x)$ vale 1 en el nodo $k$ y 0 en los otros: $f(67)=15$, $f(77)=15$, $f(59)=B/3$." },
        { text: "(a) $A=f(77)=15$ (lectura directa)." },
        { text: "(b) $f(59)=B/3=9 \\implies B=27$." },
        { text: "(c) $f$ es cuadrática con $f(67)=f(77)=15$ y $f(59)=9\\ne15$ (no es constante), así $f(x)-15=0$ tiene a lo sumo 2 raíces, que ya son $x=67$ y $x=77$." },
      ],
      answer: "$A=15$, $B=27$, $C=67$, $D=77$.",
    },
    {
      id: "b-x3",
      title: "Composición reconstruyendo funciones tabuladas biyectivas",
      difficulty: "I",
      source: "Guía 1298.pdf",
      statement:
        "$D=\\{12,14,21,23,24,30,33,34\\}$; $f$ es biyección tabulada de $D$ en $D$: $f(12)=34,f(14)=12,f(21)=21,f(23)=33,f(24)=30,f(30)=24,f(33)=14,f(34)=23$. Con $(f\\circ g)(12)=24$ hallar $A=(f\\circ g\\circ f)(14)$; con $(g\\circ f)(23)=34$ hallar $B=g(33)$.",
      steps: [
        { text: "$A=(f\\circ g\\circ f)(14)=f(g(f(14)))$. Como $f(14)=12$, se reduce a $f(g(12))=(f\\circ g)(12)=24$." },
        { text: "$B=g(33)$: usamos $(g\\circ f)(x)=g(f(x))$. Buscamos $x$ con $f(x)=33$: $x=23$. Entonces $g(33)=g(f(23))=(g\\circ f)(23)=34$." },
      ],
      answer: "$A=24$, $B=34$.",
    },
    {
      id: "b-x4",
      title: "Soporte de producto de indicatrices",
      difficulty: "C",
      source: "Guía 1311.pdf",
      statement:
        "$f(x)=7\\cdot\\mathbf{1}_{(37,77]}(x)\\cdot\\mathbf{1}_{(20,87]}(x)$. Hallar $\\text{sop}(f)=(A,B]$.",
      steps: [
        { text: "El producto de indicatrices es no nulo solo donde ambas valen 1, es decir en la intersección de los intervalos." },
        { text: "$(37,77]\\cap(20,87] = (37,77]$." },
      ],
      answer: "$A=37$, $B=77$.",
    },
    {
      id: "b-x5",
      title: "Dominio de raíz de índice par con funciones suelo y techo",
      difficulty: "I",
      source: "Guía 1311.pdf",
      statement:
        "$f(x) = \\sqrt[22]{(11.2-\\lfloor x/2\\rfloor)(\\lceil x/15\\rceil-6.8)}$. Hallar $\\text{dom}(f)=[A,B]$.",
      steps: [
        { text: "Índice par (22): se requiere el radicando $\\ge0$: $(11.2-u)(v-6.8)\\ge0$ con $u=\\lfloor x/2\\rfloor$, $v=\\lceil x/15\\rceil$ enteros." },
        { text: "Como $u,v\\in\\mathbb{Z}$, ni $(11.2-u)$ ni $(v-6.8)$ son nunca exactamente 0; basta estudiar cuándo el producto es positivo." },
        { text: "$11.2-u\\ge0 \\iff u\\le11 \\iff \\lfloor x/2\\rfloor\\le11 \\iff x<24$. Y $11.2-u\\le0 \\iff x\\ge24$." },
        { text: "$v-6.8\\ge0 \\iff v\\ge7 \\iff \\lceil x/15\\rceil\\ge7 \\iff x>90$. Y $v-6.8\\le0 \\iff x\\le90$." },
        { text: "Caso ambos factores $\\ge0$: $x<24$ y $x>90$ — imposible. Caso ambos $\\le0$: $x\\ge24$ y $x\\le90$, es decir $x\\in[24,90]$." },
      ],
      answer: "$A=24$, $B=90$.",
    },
    {
      id: "b-x6",
      title: "Imagen de función suelo compuesta con indicatriz trasladada",
      difficulty: "I",
      source: "Guía 1311.pdf",
      statement:
        "$f(x)=3\\lfloor x\\rfloor\\cdot\\mathbf{1}_{[8.8,10.9]}(x-20)$. Hallar $\\text{Im}(f)=\\{A,B,C,D\\}$.",
      steps: [
        { text: "El indicador exige $x-20\\in[8.8,10.9] \\iff x\\in[28.8,30.9]$; fuera de ahí, $f(x)=0$." },
        { text: "En $[28.8,29)$: $\\lfloor x\\rfloor=28$. En $[29,30)$: $\\lfloor x\\rfloor=29$. En $[30,30.9]$: $\\lfloor x\\rfloor=30$." },
        { text: "$f(x)=3\\lfloor x\\rfloor$ toma los valores $84,87,90$ respectivamente, además de $0$ fuera del rango." },
      ],
      answer: "$\\{A,B,C,D\\}=\\{0,84,87,90\\}$.",
    },
    {
      id: "b-x7",
      title: "Dominio con raíz y logaritmo combinados (síntesis multi-tema)",
      difficulty: "I",
      source: "Solucionario 2025-01",
      statement:
        "$f(x)=\\sqrt{(79-x)\\cdot\\ln\\!\\left(\\dfrac{x-40}{50}\\right)}$. Hallar $\\text{dom}(f)=[A,B]$.",
      steps: [
        { text: "Primero, argumento del logaritmo positivo: $\\dfrac{x-40}{50}>0 \\iff x>40$." },
        { text: "Dentro de $x>40$, se necesita $(79-x)\\cdot\\ln\\left(\\frac{x-40}{50}\\right)\\ge0$." },
        { text: "El logaritmo se anula en $x=90$ (cuando $\\frac{x-40}{50}=1$); es negativo en $(40,90)$, positivo en $(90,\\infty)$." },
        { text: "$(79-x)$ es positivo si $x<79$, negativo si $x>79$." },
        { text: "Tabla de signos: en $(40,79)$ el producto es $(+)(-)=-$ (no sirve); en $(79,90)$ es $(-)(-)=+$ (sirve); en $(90,\\infty)$ es $(-)(+)=-$ (no sirve)." },
        { text: "Incluyendo los ceros $x=79$ y $x=90$ (donde el radicando es exactamente 0), la solución es $[79,90]$." },
      ],
      answer: "$A=79$, $B=90$.",
    },
  ],
};

export default bonus;
