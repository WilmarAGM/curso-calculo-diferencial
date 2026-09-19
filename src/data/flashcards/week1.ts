import type { FlashCard } from "../types";

const flashcardsWeek1: FlashCard[] = [
  { id: "fc1-1", front: "¿Qué es un entorno $V_\\epsilon(a)$?", back: "$V_\\epsilon(a)=\\{x: |x-a|<\\epsilon\\}=(a-\\epsilon,a+\\epsilon)$: puntos a distancia menor que $\\epsilon$ de $a$." },
  { id: "fc1-2", front: "Enuncia la desigualdad triangular.", back: "$|x+y|\\le|x|+|y|$ para todo $x,y\\in\\mathbb{R}$." },
  { id: "fc1-3", front: "¿Cómo se convierte $[a,b]$ a la forma $|x-A|\\le B$?", back: "$A=\\dfrac{a+b}{2}$ (punto medio), $B=\\dfrac{b-a}{2}$ (semilongitud)." },
  { id: "fc1-4", front: "Define función par.", back: "$f(-x)=f(x)$ para todo $x$: simetría respecto al eje $Y$." },
  { id: "fc1-5", front: "Define función impar.", back: "$f(-x)=-f(x)$ para todo $x$: simetría respecto al origen." },
  { id: "fc1-6", front: "¿Qué es el período fundamental?", back: "El menor $T>0$ tal que $f(x+T)=f(x)$ para todo $x$ del dominio." },
  { id: "fc1-7", front: "¿Qué dice el axioma del supremo?", back: "Todo subconjunto no vacío de $\\mathbb{R}$ acotado superiormente tiene una mínima cota superior (supremo) en $\\mathbb{R}$." },
  { id: "fc1-8", front: "¿Cuál es el criterio de la recta vertical?", back: "Una curva es la gráfica de una función si y solo si ninguna recta vertical la corta más de una vez." },
];

export default flashcardsWeek1;
