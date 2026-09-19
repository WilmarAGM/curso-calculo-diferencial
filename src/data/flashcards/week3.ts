import type { FlashCard } from "../types";

const flashcardsWeek3: FlashCard[] = [
  { id: "fc3-1", front: "¿Cómo se traslada $f(x-h)$ con $h>0$?", back: "$h$ unidades hacia la derecha (contraintuitivo, pero así es)." },
  { id: "fc3-2", front: "¿Qué hace $-f(x)$?", back: "Refleja la gráfica respecto al eje $X$ (invierte el signo de salidas)." },
  { id: "fc3-3", front: "¿Qué hace $f(-x)$?", back: "Refleja la gráfica respecto al eje $Y$ (invierte el signo de entradas)." },
  { id: "fc3-4", front: "¿Qué hace $f(cx)$ con $c>1$?", back: "Comprime horizontalmente la gráfica hacia el eje $Y$." },
  { id: "fc3-5", front: "Si $f$ tiene período $T_f$, ¿cuál es el período de $F(x)=f(ax+b)$?", back: "$T_F=T_f/|a|$." },
  { id: "fc3-6", front: "¿Qué significa $(g\\circ f)(x)$?", back: "$g(f(x))$: se aplica primero $f$, y el resultado entra a $g$." },
  { id: "fc3-7", front: "Dominio de $g\\circ f$.", back: "$\\{x\\in\\text{dom}(f) : f(x)\\in\\text{dom}(g)\\}$." },
];

export default flashcardsWeek3;
