import type { Week } from "../types";
import quizWeek2 from "../quizzes/week2";
import flashcardsWeek2 from "../flashcards/week2";

const week2: Week = {
  slug: "semana-2",
  number: 2,
  dateRange: "8/IX – 11/IX",
  title: "Funciones Especiales, Indicatrices, Redondeo, TCP y Familias Elementales",
  summary:
    "Funciones constantes, escalón, indicatrices y de redondeo (suelo/techo). Tasa de cambio promedio y funciones lineales. Funciones de potencia con su linearización log-log, funciones exponenciales con su linearización semi-log, y polinomios/racionales/algebraicas.",
  sections: ["1.2"],
  theory: [
    {
      id: "w2-t1",
      kind: "def",
      title: "Función indicatriz (o característica)",
      body:
        "Dado $A\\subseteq\\mathbb{R}$, la función indicatriz $\\mathbf{1}_A:\\mathbb{R}\\to\\{0,1\\}$ es\n" +
        "$$\\mathbf{1}_A(x) = \\begin{cases} 1, & x\\in A \\\\ 0, & x\\notin A\\end{cases}$$\n" +
        "Toda función definida \"por tramos con valores constantes\" (función escalón) puede escribirse como combinación lineal de indicatrices: $f(x) = \\sum_i c_i \\mathbf{1}_{A_i}(x)$.",
    },
    {
      id: "w2-t2",
      kind: "theorem",
      title: "Álgebra de indicatrices",
      body:
        "Para $A,B\\subseteq\\mathbb{R}$:\n\n" +
        "1. **Intersección (producto):** $\\mathbf{1}_{A\\cap B}(x) = \\mathbf{1}_A(x)\\cdot\\mathbf{1}_B(x)$.\n" +
        "2. **Complemento:** $\\mathbf{1}_{A^c}(x) = 1-\\mathbf{1}_A(x)$.\n" +
        "3. **Unión:** $\\mathbf{1}_{A\\cup B}(x) = \\mathbf{1}_A(x)+\\mathbf{1}_B(x)-\\mathbf{1}_A(x)\\mathbf{1}_B(x)$.\n" +
        "4. **Diferencia:** $\\mathbf{1}_{A\\setminus B}(x) = \\mathbf{1}_A(x)\\cdot(1-\\mathbf{1}_B(x))$.\n\n" +
        "**Regla práctica clave (para hallar dominios de cocientes con indicatrices en el denominador):** si $D(x)=c_1\\mathbf{1}_S(x)+c_2\\mathbf{1}_T(x)$ con $c_1,c_2\\ne 0$, entonces $D(x)=0$ únicamente cuando $x\\notin S\\cup T$ (fuera de ambos soportes) — dentro de $S\\cup T$, al menos un término aporta un valor no nulo y (salvo cancelación exacta $c_1=-c_2$ en $S\\cap T$) el denominador no se anula.",
    },
    {
      id: "w2-t3",
      kind: "def",
      title: "Funciones de redondeo: suelo y techo",
      body:
        "- **Suelo** (mayor entero $\\le x$): $\\lfloor x\\rfloor = \\max\\{k\\in\\mathbb{Z} : k\\le x\\}$, satisface $\\lfloor x\\rfloor \\le x < \\lfloor x\\rfloor+1$.\n" +
        "- **Techo** (menor entero $\\ge x$): $\\lceil x\\rceil = \\min\\{k\\in\\mathbb{Z} : k\\ge x\\}$, satisface $\\lceil x\\rceil-1 < x \\le \\lceil x\\rceil$.\n" +
        "- Ambas son funciones **escalonadas, constantes por tramos** de longitud 1, discontinuas en los enteros (suelo con salto \"hacia arriba\" al entrar por la derecha en $\\mathbb{Z}$; techo simétricamente).\n" +
        "- Identidad útil: si $n\\in\\mathbb{Z}$, $\\lfloor x+n\\rfloor = \\lfloor x\\rfloor+n$ y $\\lceil x+n\\rceil=\\lceil x\\rceil+n$.",
    },
    {
      id: "w2-t4",
      kind: "def",
      title: "Función distancia a un intervalo",
      body:
        "Para $I=[a,b]$ no vacío, $d_I:\\mathbb{R}\\to[0,\\infty)$, $d_I(x)=\\inf\\{|x-t| : t\\in I\\}$, se expresa por tramos:\n" +
        "$$d_{[a,b]}(x) = \\begin{cases} a-x, & x<a \\\\ 0, & a\\le x\\le b \\\\ x-b, & x>b\\end{cases}$$\n" +
        "Es una función **continua, no negativa**, nula exactamente en $I$, con pendiente $-1$ a la izquierda y $+1$ a la derecha (forma de \"V\" aplanada).",
    },
    {
      id: "w2-t5",
      kind: "def",
      title: "Tasa de cambio promedio (TCP)",
      body:
        "Dada $f$ en $[a,b]$, la TCP mide la razón de cambio promedio:\n" +
        "$$T_{a,b}[f] = \\frac{f(b)-f(a)}{b-a}$$\n" +
        "Geométricamente es la **pendiente de la recta secante** por $(a,f(a))$ y $(b,f(b))$.\n\n" +
        "**Aditividad de incrementos:** si $a<b<c$, entonces $T_{a,c}[f]\\cdot(c-a) = T_{a,b}[f]\\cdot(b-a) + T_{b,c}[f]\\cdot(c-b)$, porque ambos lados son iguales a $f(c)-f(a)$.",
    },
    {
      id: "w2-t6",
      kind: "theorem",
      title: "Funciones lineales: determinación con dos puntos",
      body:
        "Si $f(x)=mx+c$ y se conocen $f(x_1)=y_1$, $f(x_2)=y_2$ con $x_1\\ne x_2$, entonces\n" +
        "$$m = \\frac{y_2-y_1}{x_2-x_1} = T_{x_1,x_2}[f], \\qquad c = y_1 - m x_1$$\n" +
        "Una función es lineal si y solo si su TCP es **constante** en todo su dominio (esto permite verificar linealidad a partir de una tabla: si todas las razones de diferencias sucesivas coinciden, la función es lineal).",
    },
    {
      id: "w2-t7",
      kind: "def",
      title: "Funciones de potencia",
      body:
        "Una **función de potencia** tiene la forma $f(x)=x^k$ para una constante $k$. Su dominio depende del tipo de exponente:\n\n" +
        "- **$k$ entero positivo:** dominio $\\mathbb{R}$ (ej. $x^2$, $x^3$).\n" +
        "- **$k$ entero negativo:** dominio $\\mathbb{R}\\setminus\\{0\\}$ (ej. $x^{-1}=1/x$).\n" +
        "- **$k$ fraccionario, raíz de índice par:** dominio $[0,\\infty)$ (ej. $x^{1/2}=\\sqrt{x}$).\n" +
        "- **$k$ fraccionario, raíz de índice impar:** dominio $\\mathbb{R}$ (ej. $x^{1/3}=\\sqrt[3]{x}$).\n\n" +
        "Un **modelo potencial general** $y=A x^k$ (con $A$ constante de escala) describe fenómenos donde una cantidad escala como una potencia de otra: área vs. lado, intensidad vs. distancia, período orbital vs. radio, etc. Todas las variantes de $x^k$ están graficadas en la **Galería de Funciones** — busca la categoría \"Potencia\".",
    },
    {
      id: "w2-t8",
      kind: "theorem",
      title: "Modelos potenciales y linearización log-log",
      body:
        "Para **ajustar o verificar** un modelo potencial $y=Ax^k$ a partir de datos, se usa el cambio de variable $u=\\ln x$, $v=\\ln y$ (demostración completa en el Módulo de Retos):\n" +
        "$$v = ku + \\ln A \\quad \\text{(recta en el plano \\textit{log-log})}$$\n" +
        "**Ajuste del modelo a partir de dos datos** $(x_1,y_1)$, $(x_2,y_2)$: como $v$ es lineal en $u$, la pendiente $k$ es simplemente la TCP en el plano $u$–$v$:\n" +
        "$$k = \\frac{\\ln y_2 - \\ln y_1}{\\ln x_2 - \\ln x_1} = \\frac{\\ln(y_2/y_1)}{\\ln(x_2/x_1)}, \\qquad A = \\frac{y_1}{x_1^{\\,k}}$$\n" +
        "**Por qué se llama \"log-log\":** se toma logaritmo en **ambos** ejes ($x$ y $y$); por eso una curva de potencia (no lineal en escala natural) se convierte en una recta cuando se grafica en papel log-log.",
    },
    {
      id: "w2-t9",
      kind: "def",
      title: "Funciones exponenciales",
      body:
        "Una **función exponencial** tiene la forma $f(x)=a^x$ con base $a>0$, $a\\ne 1$. Dominio $\\mathbb{R}$, rango $(0,\\infty)$:\n\n" +
        "- Si $a>1$: **estrictamente creciente** (crecimiento).\n" +
        "- Si $0<a<1$: **estrictamente decreciente** (decaimiento).\n\n" +
        "La base más usada en cálculo es $e\\approx2.71828$ (constante de Euler). Un **modelo exponencial general** $y=A\\cdot a^x$ describe fenómenos que cambian por un **factor constante** cada unidad de $x$ (población, radiactividad, interés compuesto) — a diferencia del modelo potencial, aquí la variable independiente está en el **exponente**, no en la base.",
    },
    {
      id: "w2-t10",
      kind: "note",
      title: "Modelos de crecimiento y decaimiento: vida media y duplicación",
      body:
        "Un modelo $M(t)=M_0\\cdot a^{t/T}$ describe crecimiento ($a>1$) o decaimiento ($0<a<1$) donde cada $T$ unidades de tiempo la cantidad se multiplica por $a$. Casos frecuentes:\n\n" +
        "- **Vida media** $T_{1/2}$: $M(t)=M_0\\cdot 2^{-t/T_{1/2}}$ (decaimiento, la masa se reduce a la mitad cada $T_{1/2}$).\n" +
        "- **Duplicación:** $M(t)=M_0\\cdot 2^{t/T_d}$.\n" +
        "Para resolver \"¿en cuánto tiempo la cantidad llega a $M_0\\cdot 2^{k}$?\", se iguala el exponente: $t/T = k$.",
    },
    {
      id: "w2-t11",
      kind: "theorem",
      title: "Linearización semi-log de modelos exponenciales",
      body:
        "Para **ajustar o verificar** un modelo exponencial $y=A\\cdot a^{x}$ a partir de datos, se toma $\\ln$ a ambos lados:\n" +
        "$$\\ln y = \\ln A + x\\ln a$$\n" +
        "Con $v=\\ln y$ (solo el eje $y$ se transforma, **no** el eje $x$ — de ahí \"semi-log\"):\n" +
        "$$v = (\\ln a)\\, x + \\ln A \\quad \\text{(recta en el plano semi-log)}$$\n" +
        "**Ajuste a partir de dos datos** $(x_1,y_1)$, $(x_2,y_2)$:\n" +
        "$$\\ln a = \\frac{\\ln y_2 - \\ln y_1}{x_2 - x_1}, \\qquad A = \\dfrac{y_1}{a^{x_1}}$$\n" +
        "**Caso vida media / duplicación:** si el modelo se escribe como $y=A\\cdot 2^{\\pm x/T}$, el signo indica decaimiento ($-$) o crecimiento ($+$), y $T$ es el tiempo en que $y$ se multiplica por $2$ (o por $1/2$). Es el mismo modelo con $a=2^{\\pm 1/T}$.",
    },
    {
      id: "w2-t12",
      kind: "note",
      title: "Ley de enfriamiento de Newton (exponencial desplazado)",
      body:
        "Un objeto a temperatura inicial $T_0$ en un ambiente a temperatura constante $T_{amb}$ se enfría (o calienta) según:\n" +
        "$$T(t) = T_{amb} + (T_0 - T_{amb})\\cdot 2^{-t/T_{1/2}}$$\n" +
        "**Punto clave:** $T(t)$ **no** es una exponencial pura (no tiende a 0, sino a $T_{amb}$), así que no se linealiza directamente. Pero la **diferencia** $D(t)=T(t)-T_{amb}$ sí es una exponencial pura en $t$, con la misma estructura que la vida media: $D(t)=D_0\\cdot 2^{-t/T_{1/2}}$. Toda la maquinaria de vida media/duplicación se aplica a $D(t)$, y al final se suma $T_{amb}$ para volver a $T(t)$.",
    },
    {
      id: "w2-t13",
      kind: "def",
      title: "Polinomios, funciones racionales y algebraicas",
      body:
        "- **Polinomio:** $p(x)=a_nx^n+\\cdots+a_1x+a_0$, dominio $\\mathbb{R}$.\n" +
        "- **Racional:** $f(x)=\\dfrac{p(x)}{q(x)}$ con $p,q$ polinomios; dominio $\\mathbb{R}\\setminus\\{x : q(x)=0\\}$.\n" +
        "- **Algebraica:** construida con sumas, productos, cocientes y raíces de polinomios (incluye radicales); el dominio depende de las restricciones de cada radical de índice par.\n\n" +
        "A diferencia de las funciones de potencia y exponenciales, estas familias no tienen una técnica de linearización asociada — se estudian directamente por su fórmula.",
    },
  ],
  examples: [
    {
      id: "w2-e1",
      title: "Dominio de cociente con indicatrices combinadas",
      difficulty: "C",
      source: "Guía 1273.pdf",
      statement:
        "Con $S=[-31,75]$ y $T=[-10,50]$, hallar el dominio de $f(x)=\\dfrac{-31\\cdot\\mathbf{1}_S(x)+75\\cdot\\mathbf{1}_T(x)}{6\\cdot\\mathbf{1}_S(x)+5\\cdot\\mathbf{1}_T(x)}$.",
      steps: [
        { text: "El denominador $D(x)=6\\mathbf{1}_S(x)+5\\mathbf{1}_T(x)$ debe ser distinto de cero." },
        { text: "Si $x\\notin S\\cup T$: ambos indicadores son 0, $D(x)=0$ (no sirve)." },
        { text: "Si $x\\in S\\setminus T$: $D(x)=6\\ne 0$. Si $x\\in S\\cap T$: $D(x)=6+5=11\\ne 0$. En ambos casos, como los coeficientes 6 y 5 son positivos, nunca se cancelan." },
        { text: "El denominador es distinto de cero exactamente en $S\\cup T=[-31,75]$ (pues $T\\subset S$)." },
      ],
      answer: "$\\text{dom}(f) = [-31,75]$.",
    },
    {
      id: "w2-e2",
      title: "Descomposición de indicatrices combinadas en tramos",
      difficulty: "A",
      source: "Guía 1537.pdf",
      statement:
        "Con $S=(33,81]$, $T=(74,94]$: $f(x)=\\dfrac{-31\\cdot\\mathbf{1}_S(x)+75\\cdot\\mathbf{1}_T(x)}{6\\cdot\\mathbf{1}_S(x)+5\\cdot\\mathbf{1}_T(x)}$. Hallar $\\text{dom}(f)=(A,B)$, $C=f(83)$, $D=f(75)$.",
      steps: [
        { text: "El denominador se anula solo si $x\\notin S\\cup T$. Como $S=(33,81]$ y $T=(74,94]$ se solapan ($74<81$), $S\\cup T=(33,94]$." },
        { text: "$A=33$, $B=94$." },
        { text: "$f(83)$: $83\\notin S$ (pues $83>81$) pero $83\\in T$. $f(83)=\\dfrac{75}{5}=15$." },
        { text: "$f(75)$: $75\\in S$ ($33<75\\le81$) y $75\\in T$ ($74<75\\le94$). $f(75)=\\dfrac{-31+75}{6+5}=\\dfrac{44}{11}=4$." },
      ],
      answer: "$A=33$, $B=94$, $C=15$, $D=4$.",
    },
    {
      id: "w2-e3",
      title: "Función de costo por tramos (modelación lineal escalonada)",
      difficulty: "A",
      source: "Guía 1537.pdf",
      statement:
        "El azúcar cuesta $1000\\ \\$/\\text{kg}$; sobre 30 kg, los kilos adicionales cuestan $800\\ \\$/\\text{kg}$; compras de más de 60 kg suman un costo fijo de $8000\\ \\$$. Modelar $c(x)$ por tramos: $Ax$ ($0\\le x\\le 30$), $Bx+C$ ($30<x\\le60$), $Dx+E$ ($x>60$).",
      steps: [
        { text: "Tramo 1: precio base directo, $A=1000$." },
        { text: "Tramo 2: costo $= 1000(30)+800(x-30) = 30000+800x-24000 = 800x+6000$. Así $B=800$, $C=6000$." },
        { text: "Verificación de continuidad en $x=30$: $1000(30)=30000$ y $800(30)+6000=30000$ ✓." },
        { text: "Tramo 3: mismo costo marginal $800$ más el fijo adicional $8000$: $D=800$, $E=6000+8000=14000$." },
      ],
      answer: "$A=1000$, $B=800$, $C=6000$, $D=800$, $E=14000$.",
    },
    {
      id: "w2-e4",
      title: "Función distancia: descomposición por tramos",
      difficulty: "C",
      source: "Guía 1298.pdf",
      statement:
        "Con $J=[10,22]$, $f(x)=\\dfrac{1}{2}d_J(x)+29$. Escribir por tramos como $A-\\dfrac{x}{2}$ ($x<B$), $29$ ($B\\le x\\le C$), $\\dfrac{x}{2}+D$ ($x>C$).",
      steps: [
        { text: "$d_J(x) = 10-x$ si $x<10$; $0$ si $10\\le x\\le22$; $x-22$ si $x>22$." },
        { text: "Para $x<10$: $f(x)=\\frac12(10-x)+29 = 34-\\frac{x}{2}$. Luego $A=34$, $B=10$." },
        { text: "Para $10\\le x\\le22$: $f(x)=29$, es decir $C=22$." },
        { text: "Para $x>22$: $f(x)=\\frac12(x-22)+29 = \\frac{x}{2}+18$, es decir $D=18$." },
      ],
      answer: "$A=34$, $B=10$, $C=22$, $D=18$.",
    },
    {
      id: "w2-e5",
      title: "Vida media de un isótopo: hallar masa y tiempo",
      difficulty: "A",
      source: "Modelo exponencial — elaboración propia",
      statement:
        "Una muestra radiactiva tiene masa inicial $M_0=160$ mg. Después de $12$ días quedan $20$ mg. (a) Hallar la vida media $T_{1/2}$. (b) Hallar la masa restante a los $20$ días. (c) Hallar el tiempo para que queden $2.5$ mg.",
      steps: [
        { text: "Fracción restante en 12 días: $\\dfrac{20}{160}=\\dfrac{1}{8}=\\left(\\dfrac12\\right)^3$: son exactamente 3 vidas medias en 12 días." },
        { text: "(a) $T_{1/2} = 12/3 = 4$ días." },
        { text: "Modelo: $M(t) = 160\\cdot\\left(\\dfrac12\\right)^{t/4}$." },
        { text: "(b) $t=20$: $20/4=5$ vidas medias. $M(20)=160\\cdot(1/2)^5=160/32=5$ mg." },
        { text: "(c) Se busca $n$ tal que $(1/2)^n = 2.5/160 = 1/64=(1/2)^6 \\implies n=6$ vidas medias. $t=6\\times4=24$ días." },
      ],
      answer: "$T_{1/2}=4$ días; $M(20)=5$ mg; $t=24$ días para llegar a 2.5 mg.",
    },
    {
      id: "w2-e6",
      title: "Duplicación de un cultivo bacteriano: hallar población y tiempo",
      difficulty: "A",
      source: "Modelo exponencial — elaboración propia",
      statement:
        "Un cultivo de bacterias se duplica cada $5$ horas. Si inicialmente hay $P_0=300$ bacterias, (a) hallar la población a las $15$ horas. (b) Hallar el tiempo necesario para alcanzar $9600$ bacterias.",
      steps: [
        { text: "Modelo: $P(t) = 300\\cdot 2^{t/5}$." },
        { text: "(a) $t=15$: $15/5=3$ duplicaciones. $P(15)=300\\cdot2^3=300\\cdot8=2400$ bacterias." },
        { text: "(b) Se busca $n$ tal que $300\\cdot2^n=9600 \\implies 2^n = 32 = 2^5 \\implies n=5$ duplicaciones." },
        { text: "$t = 5\\times5 = 25$ horas." },
      ],
      answer: "$P(15)=2400$ bacterias; $t=25$ horas para llegar a 9600.",
    },
    {
      id: "w2-e7",
      title: "Ley de enfriamiento de Newton: hallar temperatura y tiempo",
      difficulty: "I",
      source: "Modelo exponencial desplazado — elaboración propia",
      statement:
        "Una taza de café a $100°C$ se deja en un ambiente a $T_{amb}=20°C$. A los $5$ minutos, la temperatura es $60°C$. (a) Hallar la temperatura a los $15$ minutos. (b) Hallar el tiempo para llegar a $25°C$.",
      steps: [
        { text: "Se trabaja con la diferencia $D(t)=T(t)-20$, que es exponencial pura. $D(0)=100-20=80$." },
        { text: "En $t=5$: $D(5)=60-20=40=80/2$: la diferencia se redujo a la mitad, así que la \"vida media\" de $D$ es $T_{1/2}=5$ min." },
        { text: "Modelo: $D(t) = 80\\cdot(1/2)^{t/5}$, y $T(t)=20+D(t)$." },
        { text: "(a) $t=15$: $15/5=3$ vidas medias. $D(15)=80\\cdot(1/2)^3=10$. $T(15)=20+10=30°C$." },
        { text: "(b) Se busca $D(t)=25-20=5$: $5/80=1/16=(1/2)^4 \\implies$ 4 vidas medias $\\implies t=4\\times5=20$ min." },
      ],
      answer: "$T(15)=30°C$; $t=20$ min para llegar a $25°C$.",
    },
    {
      id: "w2-e8",
      title: "Ajuste de un modelo potencial con linearización log-log",
      difficulty: "I",
      source: "Modelo potencial — elaboración propia",
      statement:
        "Un modelo potencial $I(r)=A\\cdot r^{k}$ satisface $I(2)=50$ e $I(8)=3.125$. (a) Hallar $k$ y $A$ usando la linearización log-log. (b) Predecir $I(4)$.",
      steps: [
        { text: "Pendiente en el plano log-log: $k = \\dfrac{\\ln(I_2/I_1)}{\\ln(r_2/r_1)} = \\dfrac{\\ln(3.125/50)}{\\ln(8/2)} = \\dfrac{\\ln(0.0625)}{\\ln 4} = \\dfrac{-2.7726}{1.3863} = -2$." },
        { text: "$A = \\dfrac{I_1}{r_1^{\\,k}} = \\dfrac{50}{2^{-2}} = 50\\times4 = 200$." },
        { text: "Verificación: $I(8)=200\\times8^{-2}=200/64=3.125$ ✓ (coincide con el dato)." },
        { text: "(b) $I(4) = 200\\times4^{-2} = 200/16 = 12.5$." },
      ],
      answer: "$k=-2$, $A=200$, $I(4)=12.5$.",
    },
  ],
  exercises: [
    {
      id: "w2-x1",
      title: "Función lineal a partir de una tabla",
      difficulty: "C",
      source: "Repaso Primer Parcial",
      statement:
        "Tabla: $x=1\\to4$, $x=3\\to10$, $x=7\\to22$, $x=9\\to28$. Hallar $A=g(5)$ y $B=g(4)$, sabiendo que $g$ es lineal.",
      steps: [
        { text: "Diferencias sucesivas: $(10-4)/(3-1)=3$, $(22-10)/(7-3)=3$, $(28-22)/(9-7)=3$: pendiente constante, $g$ es lineal con $m=3$." },
        { text: "$g(x)=3x+c$; usando $g(1)=4$: $3+c=4 \\implies c=1$. Verificación: $g(3)=10$, $g(7)=22$, $g(9)=28$ ✓." },
        { text: "$A=g(5)=3(5)+1=16$. $B=g(4)=3(4)+1=13$." },
      ],
      answer: "$A=16$, $B=13$.",
    },
    {
      id: "w2-x2",
      title: "Reconstrucción de función lineal con incógnita en el dominio",
      difficulty: "A",
      source: "Repaso Primer Parcial",
      statement:
        "$f$ lineal. Tabla: $x=-6\\to43$, $x=-3\\to B$, $x=A\\to-17$, $x=5\\to-23$. Hallar $A$ y $B$.",
      steps: [
        { text: "Pendiente con $(-6,43)$ y $(5,-23)$: $m=\\dfrac{-23-43}{5-(-6)}=\\dfrac{-66}{11}=-6$." },
        { text: "Intercepto: $43=-6(-6)+c \\implies 43=36+c \\implies c=7$. Entonces $f(x)=-6x+7$." },
        { text: "$f(A)=-17 \\implies -6A+7=-17 \\implies A=4$." },
        { text: "$B=f(-3)=-6(-3)+7=25$." },
      ],
      answer: "$A=4$, $B=25$.",
    },
    {
      id: "w2-x3",
      title: "Ajuste de función potencia",
      difficulty: "C",
      source: "Repaso Primer Parcial",
      statement: "$f(x)=kx^\\alpha$ con $f(1)=2$, $f(4)=32$. Hallar $A=k$, $B=\\alpha$ y $C=f(5)$.",
      steps: [
        { text: "$f(1)=k=2 \\implies A=2$." },
        { text: "$f(4)=2\\cdot4^\\alpha=32 \\implies 4^\\alpha=16=4^2 \\implies B=\\alpha=2$." },
        { text: "$f(x)=2x^2$, entonces $C=f(5)=2(25)=50$." },
      ],
      answer: "$A=2$, $B=2$, $C=50$.",
    },
    {
      id: "w2-x4",
      title: "Crecimiento exponencial: tiempo para un factor dado",
      difficulty: "A",
      source: "Repaso Primer Parcial",
      statement:
        "Una población se multiplica por $5^6$ cada $6$ días. ¿En cuántos días $t=A$ se multiplica por $25$?",
      steps: [
        { text: "El factor de crecimiento diario $r$ satisface $r^6=5^6 \\implies r=5$: cada día la población se multiplica por 5." },
        { text: "Se busca $t$ tal que $5^t = 25 = 5^2 \\implies t=2$." },
      ],
      answer: "$A=2$ días.",
    },
    {
      id: "w2-x5",
      title: "Decaimiento exponencial: vida media",
      difficulty: "A",
      source: "Repaso Primer Parcial",
      statement:
        "La vida media de una sustancia es $11$ días; la masa actual es $8$ mg. (a) ¿Cuál era la masa hace $5$ días? (b) ¿En cuántos días llegará a $1/8$ mg?",
      steps: [
        { text: "Modelo: $M(t)=8\\cdot 2^{-t/11}$ mg, con $t=0$ el instante actual." },
        { text: "(a) Hace 5 días corresponde a $t=-5$: $M(-5)=8\\cdot2^{5/11}\\approx 8(1.3703)\\approx 10.96$ mg." },
        { text: "(b) $8\\cdot2^{-t/11}=1/8=2^{-3}/1 \\implies 2^{-t/11}=2^{-6} \\implies t/11=6 \\implies t=66$ días." },
      ],
      answer: "(a) $\\approx 10.96$ mg. (b) $66$ días.",
    },
    {
      id: "w2-x6",
      title: "Tasa de cambio promedio con lectura de datos",
      difficulty: "A",
      source: "Parcial 1 (2024-02)",
      statement:
        "Con $f(2)=3$, $f(6)=-4$, $f(7)=-2$, se pide $T_{2,6}=A/4$, $T_{6,7}=2/B$, $T_{2,7}=-1/C$.",
      steps: [
        { text: "$T_{2,6}=\\dfrac{f(6)-f(2)}{6-2}=\\dfrac{-4-3}{4}=\\dfrac{-7}{4} \\implies A=-7$." },
        { text: "$T_{6,7}=\\dfrac{f(7)-f(6)}{7-6}=\\dfrac{-2-(-4)}{1}=2 = \\dfrac{2}{1} \\implies B=1$." },
        { text: "$T_{2,7}=\\dfrac{f(7)-f(2)}{7-2}=\\dfrac{-2-3}{5}=-1=\\dfrac{-1}{1} \\implies C=1$." },
        { text: "Verificación por aditividad: $[f(7)-f(2)] = [f(7)-f(6)]+[f(6)-f(2)] = 2+(-7)=-5$ ✓ (coincide con $-1\\cdot5$)." },
      ],
      answer: "$A=-7$, $B=1$, $C=1$.",
    },
    {
      id: "w2-x7",
      title: "Vida media: reconstruir el modelo y hallar masa y tiempo",
      difficulty: "A",
      source: "Modelo exponencial — práctica",
      statement:
        "Una muestra tiene masa inicial $M_0=240$ mg. A los $9$ días quedan $30$ mg. (a) Hallar la vida media. (b) Hallar la masa a los $15$ días. (c) Hallar el tiempo para llegar a $3.75$ mg.",
      steps: [
        { text: "$30/240 = 1/8 = (1/2)^3$: 9 días equivalen a 3 vidas medias, así $T_{1/2}=9/3=3$ días." },
        { text: "Modelo: $M(t)=240\\cdot(1/2)^{t/3}$." },
        { text: "(b) $t=15$: $15/3=5$ vidas medias. $M(15)=240/32=7.5$ mg." },
        { text: "(c) $3.75/240=1/64=(1/2)^6 \\implies$ 6 vidas medias $\\implies t=18$ días." },
      ],
      answer: "$T_{1/2}=3$ días; $M(15)=7.5$ mg; $t=18$ días.",
    },
    {
      id: "w2-x8",
      title: "Duplicación bacteriana: población y tiempo",
      difficulty: "A",
      source: "Modelo exponencial — práctica",
      statement:
        "Un cultivo se duplica cada $6$ horas, con $P_0=150$ bacterias. (a) Hallar la población a las $24$ horas. (b) Hallar el tiempo para llegar a $9600$ bacterias.",
      steps: [
        { text: "Modelo: $P(t)=150\\cdot2^{t/6}$." },
        { text: "(a) $t=24$: $24/6=4$ duplicaciones. $P(24)=150\\times16=2400$." },
        { text: "(b) $9600/150=64=2^6 \\implies$ 6 duplicaciones $\\implies t=6\\times6=36$ horas." },
      ],
      answer: "$P(24)=2400$ bacterias; $t=36$ horas.",
    },
    {
      id: "w2-x9",
      title: "Enfriamiento de Newton: temperatura y tiempo",
      difficulty: "I",
      source: "Modelo exponencial desplazado — práctica",
      statement:
        "Un objeto a $95°C$ se coloca en un ambiente a $15°C$. A los $8$ min, su temperatura es $55°C$. (a) Hallar la temperatura a los $24$ min. (b) Hallar el tiempo para llegar a $20°C$.",
      steps: [
        { text: "$D(t)=T(t)-15$, $D(0)=95-15=80$. En $t=8$: $D(8)=55-15=40=80/2$, así la vida media de $D$ es $8$ min." },
        { text: "(a) $t=24$: $24/8=3$ vidas medias. $D(24)=80/8=10$. $T(24)=15+10=25°C$." },
        { text: "(b) Se busca $D(t)=20-15=5$: $5/80=1/16=(1/2)^4 \\implies t=4\\times8=32$ min." },
      ],
      answer: "$T(24)=25°C$; $t=32$ min.",
    },
    {
      id: "w2-x10",
      title: "Modelo potencial desde dos datos (log-log)",
      difficulty: "I",
      source: "Modelo potencial — práctica",
      statement:
        "Un modelo $y=A\\cdot x^{k}$ satisface $y(3)=18$ e $y(12)=4.5$. (a) Hallar $k$ y $A$. (b) Hallar $y(9)$.",
      steps: [
        { text: "$k=\\dfrac{\\ln(4.5/18)}{\\ln(12/3)}=\\dfrac{\\ln(0.25)}{\\ln 4}=\\dfrac{-1.3863}{1.3863}=-1$." },
        { text: "$A=\\dfrac{18}{3^{-1}}=18\\times3=54$. Verificación: $y(12)=54/12=4.5$ ✓." },
        { text: "(b) $y(9)=54/9=6$." },
      ],
      answer: "$k=-1$, $A=54$, $y(9)=6$.",
    },
  ],
  quiz: quizWeek2,
  flashcards: flashcardsWeek2,
};

export default week2;
