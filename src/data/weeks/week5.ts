import type { Week } from "../types";
import quizWeek5 from "../quizzes/week5";
import flashcardsWeek5 from "../flashcards/week5";

const week5: Week = {
  slug: "semana-5",
  number: 5,
  dateRange: "29/IX – 2/X",
  title: "Funciones Inversas, Logaritmos, Trigonométricas Inversas y Repaso General",
  summary:
    "Existencia y propiedades de la función inversa. Funciones logarítmicas como inversas de las exponenciales. Funciones trigonométricas inversas. Repaso integrador del Primer Parcial.",
  sections: ["1.5", "Repaso"],
  theory: [
    {
      id: "w5-t1",
      kind: "theorem",
      title: "Existencia y propiedades de la función inversa",
      body:
        "$f:X\\to Y$ admite inversa $f^{-1}:Y\\to X$ **si y solo si** $f$ es biyectiva. Se cumple:\n\n" +
        "1. $(f^{-1}\\circ f)(x)=x$ para todo $x\\in\\text{dom}(f)$.\n" +
        "2. $(f\\circ f^{-1})(y)=y$ para todo $y\\in\\text{ran}(f)$.\n" +
        "3. $\\text{dom}(f^{-1})=\\text{ran}(f)$ y $\\text{ran}(f^{-1})=\\text{dom}(f)$.\n" +
        "4. La gráfica de $y=f^{-1}(x)$ es el **reflejo especular** de $y=f(x)$ respecto a la recta $y=x$.",
    },
    {
      id: "w5-t2",
      kind: "note",
      title: "Algoritmo para hallar la inversa analíticamente",
      body:
        "1. Escribe $y=f(x)$.\n" +
        "2. **Despeja $x$ en términos de $y$** (aquí se usa toda el álgebra disponible: elevar al cuadrado con cuidado del signo, aplicar $\\ln$/$\\exp$, etc.).\n" +
        "3. Intercambia los nombres $x \\leftrightarrow y$ para escribir $f^{-1}(x)$ en la variable estándar.\n" +
        "4. **Verifica el dominio:** $\\text{dom}(f^{-1})=\\text{ran}(f)$, no necesariamente todo $\\mathbb{R}$.\n" +
        "5. Cuando $f$ no es inyectiva en todo su dominio natural (por ejemplo $f(x)=x^2$), se debe **restringir** el dominio de partida (p. ej. $x\\ge0$) antes de invertir.",
    },
    {
      id: "w5-t3",
      kind: "def",
      title: "Funciones logarítmicas",
      body:
        "El logaritmo en base $a$ ($a>0,a\\ne1$) es la función inversa de la exponencial $a^x$:\n" +
        "$$y=\\log_a x \\iff a^y = x, \\qquad x>0$$\n" +
        "Dominio $(0,\\infty)$, rango $\\mathbb{R}$. Propiedades: $\\log_a(uv)=\\log_a u+\\log_a v$; $\\log_a(u/v)=\\log_a u-\\log_a v$; $\\log_a(u^k)=k\\log_a u$; $\\log_a a = 1$; $\\log_a 1=0$. El logaritmo natural $\\ln x=\\log_e x$ es el inverso de $e^x$: $\\ln(e^x)=x$ y $e^{\\ln x}=x$ (para $x>0$).",
    },
    {
      id: "w5-t4",
      kind: "def",
      title: "Funciones trigonométricas inversas",
      body:
        "Como $\\sin$, $\\cos$, $\\tan$ no son inyectivas en todo su dominio, se restringen a intervalos donde sí lo son:\n\n" +
        "- $\\arcsin:[-1,1]\\to\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]$, inversa de $\\sin$ restringida a $\\left[-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right]$.\n" +
        "- $\\arccos:[-1,1]\\to[0,\\pi]$, inversa de $\\cos$ restringida a $[0,\\pi]$.\n" +
        "- $\\arctan:\\mathbb{R}\\to\\left(-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right)$, inversa de $\\tan$ restringida a $\\left(-\\frac{\\pi}{2},\\frac{\\pi}{2}\\right)$.\n\n" +
        "Para hallar el dominio de $\\arcsin(g(x))$ o $\\arccos(g(x))$: se exige $g(x)\\in[-1,1]$.",
    },
  ],
  examples: [
    {
      id: "w5-e1",
      title: "Inversa de una función radical",
      difficulty: "C",
      source: "Solucionario 2025-01",
      statement: "Hallar $f^{-1}(x)$ para $f(x)=\\sqrt{33+3x}$, $x\\ge-11$.",
      steps: [
        { text: "$\\text{dom}(f)=[-11,\\infty)$, $\\text{ran}(f)=[0,\\infty)$." },
        { text: "$y=\\sqrt{33+3x}$, $y\\ge0$. Elevamos al cuadrado: $y^2=33+3x$." },
        { text: "Despejamos: $3x=y^2-33 \\implies x=\\dfrac{y^2-33}{3}$." },
        { text: "Intercambiando variables: $f^{-1}(x)=\\dfrac{x^2-33}{3}$, con $\\text{dom}(f^{-1})=[0,\\infty)$." },
      ],
      answer: "$f^{-1}(x)=\\dfrac{x^2-33}{3}$.",
    },
    {
      id: "w5-e2",
      title: "Inversa de función radical en el denominador (forma racional)",
      difficulty: "A",
      source: "Solucionario 2025-02",
      statement:
        "Hallar $f^{-1}(x)$ para $f(x)=\\dfrac{6}{\\sqrt{33+3x}}$ en la forma $A+\\dfrac{B}{x^2}$, e indicar $\\text{dom}(f)=(C,\\infty)$.",
      steps: [
        { text: "$y=\\dfrac{6}{\\sqrt{33+3x}} \\implies \\sqrt{33+3x}=\\dfrac{6}{y} \\implies 33+3x=\\dfrac{36}{y^2}$." },
        { text: "$3x=\\dfrac{36}{y^2}-33 \\implies x=\\dfrac{12}{y^2}-11$." },
        { text: "$f^{-1}(x)=-11+\\dfrac{12}{x^2}$: $A=-11$, $B=12$." },
        { text: "Dominio de $f$: se requiere $33+3x>0$ estrictamente (denominador bajo raíz) $\\iff x>-11$. $C=-11$." },
      ],
      answer: "$f^{-1}(x)=-11+\\dfrac{12}{x^2}$, $\\text{dom}(f)=(-11,\\infty)$.",
    },
    {
      id: "w5-e3",
      title: "Inversa de diferencia de logaritmos",
      difficulty: "I",
      source: "Solucionario 2025-01",
      statement:
        "$f(x)=\\ln(x+45)-\\ln(49x+17)$, $x\\in(0,\\infty)$. Expresar $f^{-1}(x)=\\dfrac{A+B\\cdot e^x}{1+C\\cdot e^x}$.",
      steps: [
        { text: "$y=\\ln(x+45)-\\ln(49x+17)=\\ln\\!\\left(\\dfrac{x+45}{49x+17}\\right)$." },
        { text: "Aplicando exponencial: $e^y = \\dfrac{x+45}{49x+17}$." },
        { text: "$e^y(49x+17)=x+45 \\implies 49x\\,e^y+17e^y = x+45 \\implies x(49e^y-1)=45-17e^y$." },
        { text: "$x=\\dfrac{45-17e^y}{49e^y-1}$. Multiplicando numerador y denominador por $-1$: $x=\\dfrac{-45+17e^y}{1-49e^y}$." },
        { text: "Identificando: $A=-45$, $B=17$, $C=-49$." },
      ],
      answer: "$f^{-1}(x)=\\dfrac{-45+17e^x}{1-49e^x}$.",
    },
    {
      id: "w5-e4",
      title: "Dominio de arcocoseno compuesto",
      difficulty: "C",
      source: "Repaso Primer Parcial",
      statement: "Hallar el dominio de $m(x)=\\arccos(2x-3)$.",
      steps: [
        { text: "Se requiere $2x-3\\in[-1,1]$." },
        { text: "$-1\\le2x-3\\le1 \\implies 2\\le2x\\le4 \\implies 1\\le x\\le2$." },
      ],
      answer: "$\\text{dom}(m)=[1,2]$.",
    },
  ],
  exercises: [
    {
      id: "w5-x1",
      title: "Completación de cuadrado, inversa restringida y transformación",
      difficulty: "I",
      source: "Repaso Primer Parcial",
      statement:
        "$f(x)=x^2-16x+48$. (a) Escribir como $(x-A)^2+B$. (b) Sabiendo que $0\\in f([0,A])$, hallar $f^{-1}(0)$ en esa rama restringida.",
      steps: [
        { text: "$x^2-16x+48 = (x^2-16x+64)-64+48 = (x-8)^2-16$. $A=8$, $B=-16$." },
        { text: "$f(x)=0 \\implies (x-8)^2=16 \\implies x=12$ o $x=4$." },
        { text: "Restringiendo a $[0,8]$ (rama decreciente donde $f$ es inyectiva), el único valor válido es $x=4$." },
      ],
      answer: "$A=8$, $B=-16$, $f^{-1}(0)=4$.",
    },
    {
      id: "w5-x3",
      title: "Función inversa (radical), segunda variante para contraste",
      difficulty: "C",
      source: "Examen tipo",
      statement: "$f(x)=\\dfrac{6}{\\sqrt{45+3x}}$. Expresar $f^{-1}(x)=A+\\dfrac{B}{x^2}$ y hallar $\\text{dom}(f)=(C,\\infty)$.",
      steps: [
        { text: "$C=-15$ (se requiere $45+3x>0$)." },
        { text: "$y=6/\\sqrt{45+3x} \\implies 45+3x=36/y^2 \\implies x=12/y^2-15$." },
      ],
      answer: "$A=-15$, $B=12$, $C=-15$.",
    },
  ],
  quiz: quizWeek5,
  flashcards: flashcardsWeek5,
};

export default week5;
