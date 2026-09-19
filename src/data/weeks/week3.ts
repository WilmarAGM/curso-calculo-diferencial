import type { Week } from "../types";
import quizWeek3 from "../quizzes/week3";
import flashcardsWeek3 from "../flashcards/week3";

const week3: Week = {
  slug: "semana-3",
  number: 3,
  dateRange: "15/IX – 18/IX",
  title: "Funciones Trigonométricas, Transformaciones Elementales y Composición",
  summary:
    "Funciones trigonométricas básicas, combinación de funciones por tramos, transformaciones elementales de gráficas (traslaciones, reflexiones, escalamientos) y composición de funciones.",
  sections: ["1.2", "1.3"],
  theory: [
    {
      id: "w3-t1",
      kind: "def",
      title: "Funciones trigonométricas: repaso esencial",
      body:
        "$\\sin x$ y $\\cos x$ tienen dominio $\\mathbb{R}$, rango $[-1,1]$, período $2\\pi$. $\\tan x=\\sin x/\\cos x$ tiene dominio $\\mathbb{R}\\setminus\\{\\pi/2+k\\pi\\}$, rango $\\mathbb{R}$, período $\\pi$.\n\n" +
        "**Identidades de cofunción:** $\\cos\\!\\left(\\frac{\\pi}{2}-\\theta\\right)=\\sin\\theta$, $\\sin\\!\\left(\\frac{\\pi}{2}-\\theta\\right)=\\cos\\theta$, $\\sin\\!\\left(\\frac{\\pi}{2}+\\theta\\right)=\\cos\\theta$.\n\n" +
        "**Identidades suplementarias:** $\\cos(\\pi-\\theta)=-\\cos\\theta$, $\\sin(\\pi-\\theta)=\\sin\\theta$.\n\n" +
        "**Triángulo de referencia:** si $\\theta=\\arcsin(o/h)$ con $o,h>0$ catetos e hipotenusa, entonces el cateto adyacente es $a=\\sqrt{h^2-o^2}$, y $\\cos\\theta=a/h$, $\\tan\\theta=o/a$.",
    },
    {
      id: "w3-t2",
      kind: "note",
      title: "Combinación de funciones por tramos y operaciones aritméticas",
      body:
        "Dadas $f,g$, las funciones $f+g$, $f-g$, $f\\cdot g$, $f/g$ se definen puntualmente. Regla de oro para el dominio:\n" +
        "$$\\text{dom}(f\\pm g)=\\text{dom}(f\\cdot g)=\\text{dom}(f)\\cap\\text{dom}(g), \\qquad \\text{dom}(f/g) = \\big(\\text{dom}(f)\\cap\\text{dom}(g)\\big)\\setminus\\{x : g(x)=0\\}$$\n" +
        "Cuando $f$ y $g$ están definidas por tramos, conviene **superponer las particiones** de ambas sobre la recta real antes de operar: el resultado tiene como puntos de quiebre la unión de los puntos de quiebre de $f$ y de $g$.",
    },
    {
      id: "w3-t3",
      kind: "def",
      title: "Transformación 1: traslaciones (desplazamientos)",
      body:
        "Sea $y=f(x)$ la gráfica base y $d>0$ una constante:\n\n" +
        "- $y=f(x)+d$: desplaza la gráfica $d$ unidades **hacia arriba**. $y=f(x)-d$: $d$ unidades **hacia abajo**.\n" +
        "- $y=f(x+d)$: desplaza la gráfica $d$ unidades **hacia la izquierda**. $y=f(x-d)$: $d$ unidades **hacia la derecha**.\n\n" +
        "**Efecto en dominio/rango:** si $\\text{dom}(f)=[x_1,x_2]$, entonces $\\text{dom}(f(x-d)) = [x_1+d, x_2+d]$ (el dominio se traslada en la misma dirección que el signo indica, porque hay que despejar el argumento). Si $\\text{ran}(f)=[y_1,y_2]$, entonces $\\text{ran}(f(x)+d)=[y_1+d,y_2+d]$.\n\n" +
        "**Punto de cuidado didáctico:** el desplazamiento horizontal es *contraintuitivo*: $f(x-d)$ mueve la gráfica hacia la **derecha** (no hacia la izquierda), porque para obtener el mismo valor de salida hay que evaluar en un $x$ mayor.",
    },
    {
      id: "w3-t4",
      kind: "def",
      title: "Transformación 2: reflexiones",
      body:
        "- $y=-f(x)$: refleja la gráfica respecto al **eje $X$** (invierte el signo de las salidas). Si $\\text{ran}(f)=[y_1,y_2]$, entonces $\\text{ran}(-f)=[-y_2,-y_1]$.\n" +
        "- $y=f(-x)$: refleja la gráfica respecto al **eje $Y$** (invierte el signo de las entradas). Si $\\text{dom}(f)=[x_1,x_2]$, entonces $\\text{dom}(f(-x))=[-x_2,-x_1]$.\n" +
        "- $y=-f(-x)$: reflexión respecto al **origen** (composición de ambas reflexiones). Esta es precisamente la transformación que convierte una función en su \"opuesta impar\"; si $f$ ya es impar, $-f(-x)=f(x)$.",
    },
    {
      id: "w3-t5",
      kind: "def",
      title: "Transformación 3: escalamientos (compresión y expansión)",
      body:
        "Sea $c>1$:\n\n" +
        "- $y=c\\cdot f(x)$: **expande verticalmente** por factor $c$ (estira la gráfica alejándola del eje $X$). $y=\\frac{1}{c}f(x)$: **comprime verticalmente**.\n" +
        "- $y=f(cx)$: **comprime horizontalmente** por factor $c$ (la gráfica se \"encoge\" hacia el eje $Y$, ocurre $c$ veces más rápido). $y=f(x/c)$: **expande horizontalmente**.\n\n" +
        "**Efecto en dominio/rango con $a\\ne 0$ general (incluye escalamiento y posible reflexión si $a<0$):** si $\\text{dom}(f)=[x_1,x_2]$, el dominio de $f(ax)$ es $\\left[\\min\\!\\left(\\frac{x_1}{a},\\frac{x_2}{a}\\right), \\max\\!\\left(\\frac{x_1}{a},\\frac{x_2}{a}\\right)\\right]$. Si $a>0$ el orden se preserva; si $a<0$ los extremos se intercambian.",
    },
    {
      id: "w3-t6",
      kind: "theorem",
      title: "Transformación general combinada $g(x)=c\\cdot f(ax-b)+d$",
      body:
        "Esta es la forma general que combina las cuatro transformaciones anteriores. El **orden riguroso de lectura** (de adentro hacia afuera, sobre el argumento $ax-b$) es:\n\n" +
        "1. Se parte de $u = ax - b = a\\left(x - \\frac{b}{a}\\right)$: escalamiento horizontal por $a$ y traslación horizontal de $\\frac{b}{a}$.\n" +
        "2. Se evalúa $f(u)$.\n" +
        "3. Se escala verticalmente por $c$ y se traslada verticalmente por $d$: $c\\cdot f(u) + d$.\n\n" +
        "**Fórmulas de dominio y rango** (deducidas despejando $x$ y $y$ directamente de la definición, válidas para $a>0$, $c>0$):\n" +
        "$$\\text{dom}(f)=[x_1,x_2] \\implies \\text{dom}(g) = \\left[\\frac{x_1+b}{a}, \\frac{x_2+b}{a}\\right]$$\n" +
        "$$\\text{ran}(f)=[y_1,y_2] \\implies \\text{ran}(g) = [cy_1+d,\\ cy_2+d]$$\n" +
        "**Deducción del dominio:** $g(x)$ existe sii $ax-b\\in[x_1,x_2] \\iff x_1\\le ax-b\\le x_2 \\iff x_1+b\\le ax\\le x_2+b \\iff \\frac{x_1+b}{a}\\le x\\le\\frac{x_2+b}{a}$ (dividiendo entre $a>0$, que preserva el sentido de las desigualdades).\n\n" +
        "**Si $a<0$ o $c<0$:** se invierte el orden de los extremos correspondientes (dominio o rango), porque dividir/multiplicar por un número negativo invierte las desigualdades. En general: $\\text{dom}(g)=\\left[\\min\\left(\\tfrac{x_1+b}{a},\\tfrac{x_2+b}{a}\\right), \\max\\left(\\tfrac{x_1+b}{a},\\tfrac{x_2+b}{a}\\right)\\right]$, y análogo para el rango con $c$.",
    },
    {
      id: "w3-t7",
      kind: "note",
      title: "Tabla resumen de transformaciones",
      body:
        "| Transformación | Fórmula | Efecto geométrico |\n|---|---|---|\n" +
        "| Traslación vertical | $f(x)+d$ | sube ($d>0$) o baja ($d<0$) |\n" +
        "| Traslación horizontal | $f(x-h)$ | derecha ($h>0$) o izquierda ($h<0$) |\n" +
        "| Reflexión en eje $X$ | $-f(x)$ | invierte signo de salidas |\n" +
        "| Reflexión en eje $Y$ | $f(-x)$ | invierte signo de entradas |\n" +
        "| Expansión vertical | $cf(x)$, $c>1$ | estira verticalmente |\n" +
        "| Compresión vertical | $cf(x)$, $0<c<1$ | aplana verticalmente |\n" +
        "| Compresión horizontal | $f(cx)$, $c>1$ | comprime hacia el eje $Y$ |\n" +
        "| Expansión horizontal | $f(cx)$, $0<c<1$ | estira alejando del eje $Y$ |\n\n" +
        "**Regla mnemotécnica:** transformaciones que afectan a *$y$ directamente* (fuera de $f$) actúan de forma \"intuitiva\" (suma sube, multiplica estira); transformaciones que afectan a *$x$ dentro de $f$* actúan de forma \"invertida\" (suma mueve a la izquierda, multiplicar por $c>1$ comprime).",
    },
    {
      id: "w3-t8",
      kind: "theorem",
      title: "Escalamiento del período",
      body:
        "Si $f$ es periódica con período fundamental $T_f$, entonces $F(x)=f(ax+b)$ ($a\\ne0$) es periódica con período fundamental\n" +
        "$$T_F = \\frac{T_f}{|a|}$$\n" +
        "**Deducción:** $F(x+T_F)=f(a(x+T_F)+b) = f(ax+b+aT_F)$. Para que esto sea igual a $f(ax+b)=F(x)$ para todo $x$, basta que $aT_F$ sea un período de $f$, y el menor positivo es $aT_F=T_f$ (tomando $a>0$; en general $|a|T_F=T_f$).",
    },
    {
      id: "w3-t9",
      kind: "def",
      title: "Composición de funciones",
      body:
        "Dadas $f:X\\to Y$ y $g:Y\\to Z$, la composición $(g\\circ f)(x) = g(f(x))$ se lee \"$g$ compuesta con $f$\", aplicando primero $f$.\n\n" +
        "$$\\text{dom}(g\\circ f) = \\{x\\in\\text{dom}(f) : f(x)\\in\\text{dom}(g)\\}$$\n" +
        "**Importante:** en general $f\\circ g \\ne g\\circ f$ (la composición no es conmutativa). Sí es **asociativa**: $(h\\circ g)\\circ f = h\\circ(g\\circ f)$, por lo que $(f\\circ g\\circ h)(x)$ está bien definido sin ambigüedad de agrupación.\n\n" +
        "**Estrategia con tablas/gráficas:** evalúa siempre de adentro hacia afuera. Si $f$ es biyectiva y se conoce $g\\circ f$, se puede recuperar $g$ mediante $g = (g\\circ f)\\circ f^{-1}$, es decir $g(y) = (g\\circ f)(f^{-1}(y))$.",
    },
  ],
  examples: [
    {
      id: "w3-e1",
      title: "Composición tabular triplemente iterada",
      difficulty: "C",
      source: "Parcial 2024-02",
      statement:
        "Con $f(13)=33,f(22)=15,f(27)=22$ y $g(13)=40,g(22)=13,g(27)=8$, calcular $A=(f\\circ g\\circ f)(27)$.",
      steps: [
        { text: "Interior: $f(27)=22$." },
        { text: "Intermedio: $g(f(27))=g(22)=13$." },
        { text: "Exterior: $f(g(f(27)))=f(13)=33$." },
      ],
      answer: "$A=33$.",
    },
    {
      id: "w3-e2",
      title: "Transformación formal de dominio y rango",
      difficulty: "A",
      source: "Examen 2025-02",
      statement:
        "$f:[38,53]\\to[9,15]$ sobreyectiva. $g(x)=3f(5x-17)-21$. Hallar $\\text{ran}(g)=[A,B]$ y $\\text{dom}(g)=[C,D]$.",
      steps: [
        { text: "Dominio: $38\\le 5x-17\\le53 \\iff 55\\le5x\\le70 \\iff 11\\le x\\le14$. $C=11$, $D=14$." },
        { text: "Rango: $f(u)\\in[9,15]$, y $c=3>0$ preserva el orden: mínimo $3(9)-21=6$, máximo $3(15)-21=24$." },
      ],
      answer: "$A=6$, $B=24$, $C=11$, $D=14$.",
    },
    {
      id: "w3-e3",
      title: "Periodicidad y escalamiento en ambos sentidos",
      difficulty: "A",
      source: "Guía 1539.pdf",
      statement:
        "$f$ periódica de período 6, $F(x)=f(2x+14)$: hallar el período $A$ de $F$. $g$ periódica (período desconocido), $G(x)=g(8x+23)$ tiene período 4: hallar el período $B$ de $g$.",
      steps: [
        { text: "Caso directo: $T_F = T_f/|a| = 6/2 = 3$. $A=3$." },
        { text: "Caso inverso: aquí conocemos $T_G=4$ y $G(x)=g(8x+23)$, así que $T_G = T_g/|8| \\implies 4 = T_g/8 \\implies T_g=32$." },
      ],
      answer: "$A=3$, $B=32$.",
    },
    {
      id: "w3-e4",
      title: "Composición con funciones dadas por fórmula, gráfica y tabla",
      difficulty: "I",
      source: "Repaso Primer Parcial",
      statement:
        "$f(x)=2x+3$. $g$: $g(-2)=1,g(-1)=4,g(0)=2,g(1)=5,g(2)=3$. $h$ escalonada: $h(x)=1$ si $x<0$; $h(x)=3$ si $0\\le x<2$; $h(x)=-2$ si $x\\ge2$. Calcular (a) $(f\\circ g)(1)$, (b) $(f\\circ h)(0)$, (c) $(h\\circ f)(-1/2)$, (d) $(f\\circ h\\circ g^{-1})(2)$.",
      steps: [
        { text: "(a) $(f\\circ g)(1)=f(g(1))=f(5)=2(5)+3=13$." },
        { text: "(b) $(f\\circ h)(0)=f(h(0))$. Como $0\\le0<2$, $h(0)=3$; $f(3)=9$." },
        { text: "(c) $(h\\circ f)(-1/2)=h(f(-1/2))$. $f(-1/2)=2(-1/2)+3=2$. Como $x=2$ cae en la rama $x\\ge2$, $h(2)=-2$." },
        { text: "(d) $(f\\circ h\\circ g^{-1})(2)$: primero $g^{-1}(2)$; de la tabla $g(0)=2 \\implies g^{-1}(2)=0$. Luego $h(0)=3$ (rama $0\\le x<2$). Luego $f(3)=9$." },
      ],
      answer: "(a) $13$, (b) $9$, (c) $-2$, (d) $9$.",
    },
  ],
  exercises: [
    {
      id: "w3-x1",
      title: "Transformación de dominio y rango vía composición trigonométrica",
      difficulty: "A",
      source: "Repaso Primer Parcial",
      statement:
        "$f(t)=\\cos t$, $t\\in[0,\\pi]$. $A(t)=3\\cos\\!\\left(\\frac{2\\pi}{3}(t-3)\\right)+4$. Hallar $\\text{dom}(A)=[A,B]$, $\\text{ran}(A)=[C,D]$.",
      steps: [
        { text: "Se requiere $u=\\frac{2\\pi}{3}(t-3)\\in[0,\\pi]$: $0\\le\\frac{2\\pi}{3}(t-3)\\le\\pi$." },
        { text: "Multiplicando por $\\frac{3}{2\\pi}$: $0\\le t-3\\le\\frac32 \\implies 3\\le t\\le4.5$." },
        { text: "$\\text{ran}(f)=[-1,1]$, factor $3>0$ preserva orden: $\\text{ran}(A)=[3(-1)+4,3(1)+4]=[1,7]$." },
      ],
      answer: "$A=3$, $B=4.5$, $C=1$, $D=7$.",
    },
    {
      id: "w3-x2",
      title: "Transformación coseno a seno con desfase incógnito",
      difficulty: "I",
      source: "Parcial 1 (2024-02)",
      statement:
        "$f(x)=-1+2\\cos\\!\\left(\\frac{2\\pi}{4}(x-7)\\right)$. Hallar $A=f(9)$, $B=$ máximo de $f$, y $C$ tal que $f(x)=-1+2\\sin\\!\\left(\\frac{2\\pi}{4}\\left(x-\\frac{C}{4}\\right)\\right)$ con $12\\le C\\le28$.",
      steps: [
        { text: "$A=f(9)$: $\\frac{\\pi}{2}(9-7)=\\pi$, $\\cos\\pi=-1$, $f(9)=-1+2(-1)=-3$." },
        { text: "$B$: el máximo de $\\cos$ es 1, así $B=-1+2(1)=1$." },
        { text: "Para $C$: usamos $\\cos\\theta=\\sin(\\theta+\\pi/2)$ con $\\theta=\\frac{\\pi}{2}(x-7)$: $f(x)=-1+2\\sin\\left(\\frac{\\pi}{2}(x-7)+\\frac{\\pi}{2}\\right)$." },
        { text: "Igualando a $-1+2\\sin\\left(\\frac{\\pi}{2}(x-C/4)\\right)$: $(x-7)+1 = x-C/4 \\implies -6=-C/4 \\implies C=24$." },
      ],
      answer: "$A=-3$, $B=1$, $C=24$.",
    },
    {
      id: "w3-x3",
      title: "Composición con f fórmula, g poligonal y h tabla",
      difficulty: "I",
      source: "Solucionario 2025-01",
      statement:
        "$f(x)=x^2+1$; $h(0)=3,h(1)=1,h(3)=0,h(4)=2$; $g$ es poligonal con $g(1)=2$ (salto), $g(x)=x-1$ en $[2,4]$, $g(x)=11-2x$ en $[4,5]$, $g(x)=1$ en $(1,2)$. Calcular (a) $(h\\circ g\\circ f)(-1)$, (b) $(g\\circ f\\circ h)(1)$, (c) $(f\\circ g\\circ h)(0)$.",
      steps: [
        { text: "(a) $f(-1)=1+1=2$. $g(2)=2-1=1$ (tramo $[2,4]$). $h(1)=1$." },
        { text: "(b) $h(1)=1$. $f(1)=1+1=2$. $g(2)=1$." },
        { text: "(c) $h(0)=3$. $g(3)=3-1=2$ (tramo $[2,4]$). $f(2)=4+1=5$." },
      ],
      answer: "(a) $1$, (b) $1$, (c) $5$.",
    },
    {
      id: "w3-x4",
      title: "Composición reconstruyendo g a partir de f∘g y g∘f",
      difficulty: "I",
      source: "Guía 1298.pdf / Parcial 1 (2024-02)",
      statement:
        "$f$ es biyección tabulada. Con $(f\\circ g)(12)=24$ y $(g\\circ f)(23)=34$ (además $f(23)=33$), calcular $A=(f\\circ g\\circ f)(14)$ sabiendo que $g(12)=24$... (usa la tabla de $f$: $f(14)=12$).",
      steps: [
        { text: "$(f\\circ g\\circ f)(14) = f(g(f(14)))$. Con $f(14)=12$: se reduce a $f(g(12))=(f\\circ g)(12)$." },
        { text: "De la tabla dada, $(f\\circ g)(12)=24$." },
        { text: "Técnica general: si $f$ es biyectiva, $g(y)=(g\\circ f)(f^{-1}(y))$, útil para reconstruir $g$ punto a punto a partir de $g\\circ f$ y la inversa de $f$." },
      ],
      answer: "$A=24$.",
    },
  ],
  quiz: quizWeek3,
  flashcards: flashcardsWeek3,
};

export default week3;
