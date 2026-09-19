import type { Week } from "../types";
import quizWeek1 from "../quizzes/week1";
import flashcardsWeek1 from "../flashcards/week1";

const week1: Week = {
  slug: "semana-1",
  number: 1,
  dateRange: "1/IX – 4/IX",
  title: "Números Reales, Valor Absoluto y Fundamentos de Funciones",
  summary:
    "Estructura axiomática de $\\mathbb{R}$, valor absoluto, intervalos y desigualdades. Concepto riguroso de función, dominio, rango, simetría, monotonía, periodicidad y extremos.",
  sections: ["Apéndice A (Stewart)", "1.1"],
  theory: [
    {
      id: "w1-t1",
      kind: "def",
      title: "El sistema de los números reales",
      body:
        "El conjunto $\\mathbb{R}$ es un **cuerpo ordenado y completo**:\n\n" +
        "1. **Axiomas de cuerpo:** suma y producto asociativos, conmutativos, con neutros $0$ y $1$, e inversos (aditivo para todo real, multiplicativo para todo real distinto de cero).\n" +
        "2. **Axiomas de orden:** existe $\\mathbb{R}^+$ cerrado bajo suma y producto, y se cumple la tricotomía: para todo $x$, exactamente una de $x>0$, $x=0$, $x<0$ es verdadera.\n" +
        "3. **Axioma de completitud (del supremo):** todo subconjunto no vacío de $\\mathbb{R}$ acotado superiormente tiene una mínima cota superior (supremo) en $\\mathbb{R}$. Este axioma es lo que distingue a $\\mathbb{R}$ de $\\mathbb{Q}$ (por ejemplo, $\\{x \\in \\mathbb{Q} : x^2 < 2\\}$ no tiene supremo racional).",
    },
    {
      id: "w1-t2",
      kind: "def",
      title: "Intervalos",
      body:
        "Dados $a<b$ en $\\mathbb{R}$, los **intervalos acotados** son:\n" +
        "$$(a,b) = \\{x : a<x<b\\}, \\quad [a,b] = \\{x : a \\le x \\le b\\}, \\quad [a,b) = \\{x : a \\le x < b\\}, \\quad (a,b] = \\{x : a < x \\le b\\}$$\n" +
        "Los **intervalos no acotados** usan $\\pm\\infty$ como símbolos (no números): $(a,\\infty)$, $[a,\\infty)$, $(-\\infty,b)$, $(-\\infty,b]$, $(-\\infty,\\infty)=\\mathbb{R}$.",
    },
    {
      id: "w1-t3",
      kind: "def",
      title: "Valor absoluto y entornos",
      body:
        "$$|x| = \\begin{cases} x, & x \\ge 0 \\\\ -x, & x < 0 \\end{cases}$$\n" +
        "Geométricamente $|x-a|$ es la distancia entre $x$ y $a$ en la recta real. Un **entorno** de centro $a$ y radio $\\epsilon>0$ es $V_\\epsilon(a) = \\{x : |x-a|<\\epsilon\\} = (a-\\epsilon, a+\\epsilon)$.",
    },
    {
      id: "w1-t4",
      kind: "theorem",
      title: "Propiedades del valor absoluto",
      body:
        "Para todo $x,y \\in \\mathbb{R}$ y $r>0$:\n\n" +
        "1. $|x|\\ge 0$ y $|x|=\\sqrt{x^2}$.\n" +
        "2. $|-x|=|x|$ y $|xy|=|x||y|$.\n" +
        "3. $\\left|\\frac{x}{y}\\right|=\\frac{|x|}{|y|}$, $y\\ne 0$.\n" +
        "4. **Acotación:** $|x|\\le r \\iff -r\\le x\\le r$. Análogamente $|x|<r \\iff -r<x<r$.\n" +
        "5. **Exclusión:** $|x|\\ge r \\iff x\\ge r \\ \\text{o}\\ x\\le -r$.\n" +
        "6. **Desigualdad triangular:** $|x+y|\\le |x|+|y|$.\n" +
        "7. **Triangular inversa:** $\\big||x|-|y|\\big|\\le |x-y|$.\n" +
        "8. **Ecuación:** $|x|=|y| \\iff x=y \\ \\text{o}\\ x=-y$.",
    },
    {
      id: "w1-t5",
      kind: "proof",
      title: "Demostración de la desigualdad triangular",
      body:
        "Queremos probar $|x+y|\\le |x|+|y|$.\n\n" +
        "Por la propiedad de acotación aplicada a $z=x$ y $z=y$: $-|x|\\le x\\le |x|$ y $-|y|\\le y\\le |y|$. Sumando miembro a miembro:\n" +
        "$$-(|x|+|y|) \\le x+y \\le |x|+|y|$$\n" +
        "Aplicando la equivalencia $|z|\\le r \\iff -r\\le z\\le r$ con $z=x+y$, $r=|x|+|y|$, se concluye $|x+y|\\le|x|+|y|$. $\\blacksquare$",
    },
    {
      id: "w1-t6",
      kind: "theorem",
      title: "Intervalo cerrado ⟷ valor absoluto",
      body:
        "Todo intervalo $[a,b]$ es equivalente a $|x-A|\\le B$ con centro y radio:\n" +
        "$$A = \\frac{a+b}{2} \\quad (\\text{punto medio}), \\qquad B = \\frac{b-a}{2} \\quad (\\text{semilongitud})$$\n" +
        "En general, resolver $|x-A|\\le B$ da $[A-B, A+B]$; resolver $|x-A|\\ge B$ (con $B>0$) da $(-\\infty, A-B]\\cup[A+B,\\infty)$.",
    },
    {
      id: "w1-t7",
      kind: "theorem",
      title: "Desigualdad triangular geométrica",
      body:
        "En todo triángulo no degenerado de lados $\\ell_1,\\ell_2,\\ell_3$, cada lado es estrictamente menor que la suma de los otros dos y mayor que su diferencia absoluta:\n" +
        "$$|\\ell_j - \\ell_k| < \\ell_i < \\ell_j+\\ell_k$$\n" +
        "para todo $i,j,k$ distintos. Es la traducción geométrica directa de la desigualdad triangular algebraica.",
    },
    {
      id: "w1-t8",
      kind: "note",
      title: "Método de la tabla de signos (para desigualdades con producto/cociente)",
      body:
        "Para resolver $\\prod_i f_i(x) \\lessgtr 0$ o cocientes:\n\n" +
        "1. **Dominio primero:** identifica restricciones (denominadores $\\ne 0$, radicandos pares $\\ge 0$, logaritmos con argumento $>0$).\n" +
        "2. Encuentra los **ceros** de cada factor (puntos donde cada $f_i(x)=0$ o cambia de signo).\n" +
        "3. Ordena todos los puntos críticos (ceros y bordes del dominio) en la recta real, formando subintervalos.\n" +
        "4. Evalúa el **signo de cada factor** en un punto representativo de cada subintervalo (no hace falta evaluar el producto completo, solo multiplicar signos $+/-$).\n" +
        "5. Determina en qué subintervalos se cumple la desigualdad, decidiendo con cuidado si los extremos (ceros) se incluyen (desigualdad no estricta $\\le,\\ge$) o se excluyen (estricta $<,>$, o fuera del dominio).",
    },
    {
      id: "w1-t9",
      kind: "def",
      title: "Concepto riguroso de función, dominio, rango",
      body:
        "Una **función** $f: X \\to Y$ asigna a cada $x\\in X$ un **único** $y=f(x)\\in Y$.\n\n" +
        "- **Dominio** $\\text{dom}(f)$: subconjunto de $X$ donde $f(x)$ está bien definida en $\\mathbb{R}$ (existen restricciones implícitas: denominadores $\\ne 0$, raíces de índice par $\\ge 0$, logaritmos con argumento $>0$, funciones trigonométricas inversas con argumento en su dominio propio).\n" +
        "- **Codominio** $\\text{cod}(f)=Y$: conjunto de llegada declarado.\n" +
        "- **Rango o imagen** $\\text{ran}(f) = \\{y\\in Y : \\exists x, f(x)=y\\} \\subseteq Y$.\n" +
        "- **Gráfica** $G_f=\\{(x,f(x)) : x\\in\\text{dom}(f)\\}\\subset\\mathbb{R}^2$. **Criterio de la recta vertical:** una curva en el plano es la gráfica de una función si y solo si ninguna recta vertical la corta más de una vez.",
    },
    {
      id: "w1-t10",
      kind: "def",
      title: "Simetría: funciones pares e impares",
      body:
        "Sea $f$ con dominio simétrico respecto al origen ($x\\in\\text{dom}(f)\\implies -x\\in\\text{dom}(f)$):\n\n" +
        "- $f$ es **par** si $f(-x)=f(x)$ para todo $x$ (simetría respecto al eje $Y$).\n" +
        "- $f$ es **impar** si $f(-x)=-f(x)$ para todo $x$ (simetría respecto al origen).\n" +
        "- La mayoría de funciones **no son ni par ni impar**. La única función simultáneamente par e impar es $f\\equiv 0$.\n\n" +
        "**Álgebra de paridades:** par $\\times$ par = par; impar $\\times$ impar = par; par $\\times$ impar = impar; la suma de dos pares es par y de dos impares es impar (pero par + impar generalmente no tiene paridad definida).",
    },
    {
      id: "w1-t11",
      kind: "theorem",
      title: "Descomposición única par/impar",
      body:
        "Toda función $f:[-a,a]\\to\\mathbb{R}$ se descompone de forma **única** como $f(x)=E(x)+O(x)$ con\n" +
        "$$E(x) = \\frac{f(x)+f(-x)}{2} \\ (\\text{parte par}), \\qquad O(x) = \\frac{f(x)-f(-x)}{2} \\ (\\text{parte impar})$$",
    },
    {
      id: "w1-t12",
      kind: "proof",
      title: "Demostración de la descomposición única",
      body:
        "**Existencia:** con $E,O$ como arriba, $E(x)+O(x) = \\frac{2f(x)}{2}=f(x)$. Además $E(-x)=\\frac{f(-x)+f(x)}{2}=E(x)$ (par) y $O(-x)=\\frac{f(-x)-f(x)}{2}=-O(x)$ (impar).\n\n" +
        "**Unicidad:** si $f=E_2+O_2$ con $E_2$ par y $O_2$ impar, entonces $E-E_2 = O_2-O$. El lado izquierdo es par, el derecho es impar; la única función par e impar a la vez es $0$, luego $E=E_2$, $O=O_2$. $\\blacksquare$\n\n" +
        "**Aplicación práctica:** si conocemos $H=F+G$ con $F$ par y $G$ impar (aunque no conozcamos $F$ y $G$ por separado), podemos recuperarlas: $F(x)=\\frac{H(x)+H(-x)}{2}$, $G(x)=\\frac{H(x)-H(-x)}{2}$.",
    },
    {
      id: "w1-t13",
      kind: "def",
      title: "Monotonía y extremos",
      body:
        "Sea $f$ definida en un intervalo $I$:\n\n" +
        "- **Estrictamente creciente** en $I$: $x_1<x_2 \\implies f(x_1)<f(x_2)$.\n" +
        "- **Estrictamente decreciente** en $I$: $x_1<x_2 \\implies f(x_1)>f(x_2)$.\n" +
        "- $f$ tiene un **máximo global** en $c$ si $f(c)\\ge f(x)$ para todo $x\\in\\text{dom}(f)$; **mínimo global** si $f(c)\\le f(x)$ para todo $x$.\n" +
        "- $f$ tiene un **máximo (o mínimo) local** en $c$ si la desigualdad correspondiente se cumple solo para $x$ cerca de $c$ (en algún entorno de $c$).",
    },
    {
      id: "w1-t14",
      kind: "def",
      title: "Periodicidad",
      body:
        "$f$ es **periódica** si existe $T>0$ tal que $f(x+T)=f(x)$ para todo $x\\in\\text{dom}(f)$. El menor $T>0$ con esta propiedad es el **período fundamental**. Funciones periódicas clásicas: $\\sin x$, $\\cos x$ (período $2\\pi$); $\\tan x$ (período $\\pi$); la función $x-\\lfloor x\\rfloor$ (\"parte fraccionaria\", período $1$).",
    },
  ],
  examples: [
    {
      id: "w1-e1",
      title: "Conversión de intervalo a valor absoluto",
      difficulty: "C",
      source: "Parcial 2024-02 / Parcial 1 (examen en blanco)",
      statement: "Expresar $25 \\le x \\le 93$ en la forma $|x-A|\\le B$ y hallar $A$ y $B$.",
      steps: [
        { text: "Identificamos $[a,b]=[25,93]$." },
        { text: "Centro: $A = \\dfrac{a+b}{2} = \\dfrac{25+93}{2} = 59$." },
        { text: "Radio: $B = \\dfrac{b-a}{2} = \\dfrac{93-25}{2} = 34$." },
        { text: "Verificación: $|x-59|\\le 34 \\iff -34\\le x-59\\le 34 \\iff 25\\le x\\le 93$. ✓" },
      ],
      answer: "$A=59$, $B=34$.",
    },
    {
      id: "w1-e2",
      title: "Desigualdad trascendente con restricción logarítmica",
      difficulty: "A",
      source: "Guía de entrenamiento / examen tipo",
      statement:
        "Resolver $(x-82)\\cdot\\ln(x-56)\\cdot(x-40) \\le 0$ y expresar la solución como $[A,B]$.",
      steps: [
        { text: "Dominio: $x-56>0 \\iff x>56$." },
        { text: "En $x>56$: $(x-40) > 16 > 0$ siempre, no afecta el signo." },
        { text: "$\\ln(x-56)=0 \\iff x=57$; negativo en $(56,57)$, positivo en $(57,\\infty)$." },
        { text: "$(x-82)$ negativo si $x<82$, positivo si $x>82$." },
        {
          text:
            "Tabla de signos en $(56,\\infty)$: en $(56,57)$ el producto es $(-)(-)(+)=+$; en $[57,82]$ es $(-)(+)(+)=-$ (cumple $\\le 0$); en $(82,\\infty)$ es $(+)(+)(+)=+$.",
        },
        { text: "La solución dentro del dominio es $x\\in[57,82]$." },
      ],
      answer: "$A=57$, $B=82$.",
    },
    {
      id: "w1-e3",
      title: "Desigualdad triangular en geometría",
      difficulty: "I",
      source: "Guía de entrenamiento",
      statement:
        "Un triángulo tiene lados $42$, $13$ y $18\\alpha$ con $\\alpha\\in\\mathbb{Z}^+$. Hallar el máximo $A$ y el mínimo $B$ valor posible de $\\alpha$.",
      steps: [
        { text: "Por la desigualdad triangular: $|42-13| < 18\\alpha < 42+13 \\iff 29 < 18\\alpha < 55$." },
        { text: "Dividiendo entre 18: $1.6111\\ldots < \\alpha < 3.0555\\ldots$" },
        { text: "Los enteros positivos en ese rango son $\\{2,3\\}$." },
      ],
      answer: "$A=3$ (máximo), $B=2$ (mínimo).",
    },
    {
      id: "w1-e4",
      title: "Descomposición par/impar aplicada (sin conocer F y G explícitamente)",
      difficulty: "I",
      source: "Solucionario 2025-02 / técnica de reconstrucción",
      statement:
        "Sea $H=F+G$ con $F$ par y $G$ impar. Si $H(7)=9$ y $H(-7)=-1$, hallar $F(7)$ y $G(7)$.",
      steps: [
        { text: "Por el teorema de descomposición: $F(7)=\\dfrac{H(7)+H(-7)}{2} = \\dfrac{9+(-1)}{2} = 4$." },
        { text: "Y $G(7) = \\dfrac{H(7)-H(-7)}{2} = \\dfrac{9-(-1)}{2} = 5$." },
        { text: "Verificación: $F(7)+G(7) = 4+5 = 9 = H(7)$ ✓." },
      ],
      answer: "$F(7)=4$, $G(7)=5$.",
    },
  ],
  exercises: [
    {
      id: "w1-x1",
      title: "Valor absoluto y logaritmo combinados",
      difficulty: "A",
      source: "Repaso Primer Parcial",
      statement: "Sea $h(t)=\\ln(|t-3|-3)$. El dominio es $\\{t : t<A \\ \\text{o}\\ t>B\\}$. Hallar $A$ y $B$.",
      steps: [
        { text: "Se requiere $|t-3|-3>0 \\iff |t-3|>3$." },
        { text: "Por la propiedad de exclusión: $t-3>3$ o $t-3<-3$, es decir $t>6$ o $t<0$." },
      ],
      answer: "$A=0$, $B=6$.",
    },
    {
      id: "w1-x2",
      title: "Ecuación con dos valores absolutos",
      difficulty: "C",
      source: "Aplicación de la propiedad |x| = |y| ⟺ x = y o x = −y",
      statement: "Resolver $|x-7|=|2x+1|$ y dar las dos soluciones $A<B$.",
      steps: [
        { text: "Caso 1 ($x-7=2x+1$): $-x=8 \\implies x=-8$." },
        { text: "Caso 2 ($x-7=-(2x+1)$): $x-7=-2x-1 \\implies 3x=6 \\implies x=2$." },
        { text: "Verificación: en $x=-8$, $|-15|=|-15|=15$ ✓. En $x=2$, $|-5|=|5|=5$ ✓." },
      ],
      answer: "$A=-8$, $B=2$.",
    },
    {
      id: "w1-x3",
      title: "Desigualdad racional con factor cuadrático siempre positivo",
      difficulty: "A",
      source: "Entrenamiento 1/2 (1311.pdf)",
      statement:
        "Resolver $\\dfrac{x^2(x-68)}{(1+27x^2)(x-57)} < 0$. La solución es $(A,B)$.",
      steps: [
        { text: "$(1+27x^2)$ es siempre $>0$ (suma de 1 más un cuadrado), no afecta el signo." },
        { text: "$x^2\\ge 0$, con igualdad solo en $x=0$; en $x=0$ la expresión vale $0$, no cumple $<0$, se excluye." },
        { text: "Para $x\\ne 0$, $x^2>0$, así la desigualdad equivale a $\\dfrac{x-68}{x-57}<0$, cuya solución es $57<x<68$." },
        { text: "$x=0$ no pertenece a $(57,68)$, no afecta el resultado." },
      ],
      answer: "$A=57$, $B=68$.",
    },
    {
      id: "w1-x4",
      title: "Desigualdad cuadrática con traslación de variable",
      difficulty: "I",
      source: "Entrenamiento (1539.pdf)",
      statement:
        "$x^2+Ax+B<0$ tiene como solución $(-10,-2)$. Hallar $A,B$. Luego $(x-C)^2+A(x-C)+B<0$ tiene solución $(-5,3)$; hallar $C$.",
      steps: [
        { text: "Las raíces de $x^2+Ax+B=0$ son los extremos $-10$ y $-2$ (parábola cóncava hacia arriba, negativa entre sus raíces)." },
        { text: "Suma de raíces $=-A$: $-10+(-2)=-12=-A \\implies A=12$." },
        { text: "Producto de raíces $=B$: $(-10)(-2)=20=B$." },
        { text: "Sustituyendo $u=x-C$: la desigualdad en $u$ tiene solución $u\\in(-10,-2)$, es decir $x\\in(C-10,C-2)$." },
        { text: "Igualando a $(-5,3)$: $C-10=-5 \\implies C=5$ (se verifica $C-2=3$ ✓)." },
      ],
      answer: "$A=12$, $B=20$, $C=5$.",
    },
    {
      id: "w1-x5",
      title: "Dominio: intersección de dos dominios abstractos",
      difficulty: "C",
      source: "Parcial 1 (2024-02)",
      statement:
        "Sean $f:[-6,\\infty)\\to\\mathbb{R}$ y $g:(-\\infty,38]\\to\\mathbb{R}$. Hallar $\\text{dom}(f+g)=[A,B]$.",
      steps: [
        { text: "$\\text{dom}(f+g) = \\text{dom}(f)\\cap\\text{dom}(g) = [-6,\\infty)\\cap(-\\infty,38] = [-6,38]$." },
      ],
      answer: "$A=-6$, $B=38$.",
    },
    {
      id: "w1-x6",
      title: "Dominio de función compuesta con traslación",
      difficulty: "A",
      source: "Parcial 1 (2024-02)",
      statement:
        "Con $f:[-6,\\infty)\\to\\mathbb{R}$, sea $F(x)=f(16-x)$. Hallar el dominio $(-\\infty,C]$.",
      steps: [
        { text: "$F(x)$ existe sii $16-x\\in\\text{dom}(f)=[-6,\\infty)$." },
        { text: "$16-x\\ge -6 \\iff -x\\ge -22 \\iff x\\le 22$." },
      ],
      answer: "$C=22$.",
    },
  ],
  quiz: quizWeek1,
  flashcards: flashcardsWeek1,
};

export default week1;
