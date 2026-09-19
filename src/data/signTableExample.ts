import type { SignTableExample } from "../components/signchart/SignTableWalkthrough";

const signTableExample: SignTableExample = {
  title: "Un ejemplo que combina los 4 tipos de factor más comunes",
  inequalityTex: "\\dfrac{(x-3)(7-x)\\sqrt{x+1}}{\\ln(x-1)} \\ge 0",
  xRange: [-2, 9],
  criticalPoints: [
    { x: -1, label: "x=-1" },
    { x: 1, label: "x=1" },
    { x: 2, label: "x=2" },
    { x: 3, label: "x=3" },
    { x: 7, label: "x=7" },
  ],
  domainNote:
    "**Paso 1 — Dominio.** El logaritmo exige $x-1>0 \\iff x>1$. La raíz solo pide $x\\ge-1$ (menos restrictivo), así que **el logaritmo manda**: el dominio combinado empieza en $x=1$ (excluido, círculo hueco). Además, como $\\ln(x-1)$ está en el **denominador**, debe ser distinto de cero: se excluye también $x=2$ (donde $\\ln(1)=0$). Dominio: $(1,2)\\cup(2,\\infty)$.",
  domainSegments: [
    { from: -2, to: 1, inDomain: false },
    { from: 1, to: 9, inDomain: true },
  ],
  rows: [
    {
      id: "f1",
      label: "(x-3)",
      note:
        "**Factor $(x-3)$** — forma $(x-a)$: su cero está en $x=3$. Como el coeficiente de $x$ es positivo, es **negativo a la izquierda** y **positivo a la derecha** de su cero. Es el patrón más común de un factor lineal.",
      segments: [
        { from: -2, to: 3, sign: "neg" },
        { from: 3, to: 9, sign: "pos" },
      ],
    },
    {
      id: "f2",
      label: "(7-x)",
      note:
        "**Factor $(7-x)$** — forma $(a-x)$: su cero está en $x=7$. Aquí el signo se **invierte** respecto al caso anterior: es **positivo a la izquierda** y **negativo a la derecha**, porque $(7-x)=-(x-7)$.",
      segments: [
        { from: -2, to: 7, sign: "pos" },
        { from: 7, to: 9, sign: "neg" },
      ],
    },
    {
      id: "f3",
      label: "\\sqrt{x+1}",
      note:
        "**Factor $\\sqrt{x+1}$** — una raíz de índice par **nunca es negativa**. Fuera de su dominio propio ($x<-1$) no está definida (∅); dentro de él, siempre aporta signo **positivo** y nunca cambia el signo global del producto — solo restringe el dominio.",
      segments: [
        { from: -2, to: -1, sign: "undefined" },
        { from: -1, to: 9, sign: "pos" },
      ],
    },
    {
      id: "f4",
      label: "\\ln(x-1)",
      note:
        "**Factor $\\ln(x-1)$** — además de su propio dominio ($x>1$), el logaritmo tiene **su propio cero**: $x-1=1 \\iff x=2$. Es **negativo** cuando el argumento está entre 0 y 1 (es decir $1<x<2$), y **positivo** cuando el argumento supera 1 (es decir $x>2$).",
      segments: [
        { from: -2, to: 1, sign: "undefined" },
        { from: 1, to: 2, sign: "neg" },
        { from: 2, to: 9, sign: "pos" },
      ],
    },
  ],
  productNote:
    "**Paso final — Multiplicar signos por zona.** En cada intervalo se multiplican los signos de las 4 filas (dividir entre un signo negativo funciona igual que multiplicar por él, para efectos de determinar el signo total). Donde cualquier factor es ∅, el producto completo también es ∅.",
  productSegments: [
    { from: -2, to: -1, sign: "undefined" },
    { from: -1, to: 1, sign: "undefined" },
    { from: 1, to: 2, sign: "pos" },
    { from: 2, to: 3, sign: "neg" },
    { from: 3, to: 7, sign: "pos" },
    { from: 7, to: 9, sign: "neg" },
  ],
  solutionNote:
    "**Solución.** Como la desigualdad es $\\ge 0$, tomamos las zonas positivas **y también** los ceros del numerador ($x=3$ y $x=7$, donde la expresión vale exactamente 0, así que se incluyen con círculo relleno). Los puntos excluidos del dominio ($x=1$ y $x=2$) **nunca** se incluyen, sin importar que la zona vecina sea positiva.",
  solutionSegments: [
    { from: 1, to: 2, closedLeft: false, closedRight: false },
    { from: 3, to: 7, closedLeft: true, closedRight: true },
  ],
  solutionText: "(1,2)\\ \\cup\\ [3,7]",
};

export default signTableExample;
