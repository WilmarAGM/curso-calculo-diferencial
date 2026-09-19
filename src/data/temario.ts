/** Temario oficial (Programa_Calendario 2026-02) contrastado con las secciones de la app. */

export interface TopicLink {
  text: string;
  to: string; // ruta interna de HashRouter
}

export interface TemarioTopic {
  label: string; // texto tal como aparece en el programa
  links: TopicLink[];
}

export interface TemarioWeek {
  number: number;
  slug: string;
  dates: string;
  stewart: string;
  topics: TemarioTopic[];
}

const sec = (slug: string, id: string) => `/semana/${slug}?sec=${id}`;
const gal = (family: string) => `/galeria?f=${encodeURIComponent(family)}`;

export const temario: TemarioWeek[] = [
  {
    number: 1,
    slug: "semana-1",
    dates: "1/IX – 4/IX",
    stewart: "Apéndice A, 1.1",
    topics: [
      { label: "Números reales, intervalos, valor absoluto", links: [{ text: "Números reales", to: sec("semana-1", "w1-t1") }, { text: "Intervalos", to: sec("semana-1", "w1-t2") }, { text: "Valor absoluto", to: sec("semana-1", "w1-t3") }] },
      { label: "Desigualdades: método de tabla de signos", links: [{ text: "Tabla de signos", to: sec("semana-1", "w1-t8") }] },
      { label: "Funciones: fórmulas, tablas, gráficas; dominio y rango", links: [{ text: "Concepto de función", to: sec("semana-1", "w1-t9") }] },
      { label: "Simetría (par/impar), crecimiento, periodicidad", links: [{ text: "Paridad", to: sec("semana-1", "w1-t10") }, { text: "Monotonía y extremos", to: sec("semana-1", "w1-t13") }, { text: "Periodicidad", to: sec("semana-1", "w1-t14") }] },
      { label: "Extremos locales y globales", links: [{ text: "Monotonía y extremos", to: sec("semana-1", "w1-t13") }] },
    ],
  },
  {
    number: 2,
    slug: "semana-2",
    dates: "8/IX – 11/IX",
    stewart: "1.2",
    topics: [
      { label: "Funciones constante, escalón, indicatrices, redondeo (suelo/techo)", links: [{ text: "Indicatriz", to: sec("semana-2", "w2-t1") }, { text: "Suelo y techo", to: sec("semana-2", "w2-t3") }, { text: "Distancia a un intervalo", to: sec("semana-2", "w2-t4") }] },
      { label: "Tasa de cambio promedio; funciones lineales", links: [{ text: "TCP", to: sec("semana-2", "w2-t5") }, { text: "Lineales", to: sec("semana-2", "w2-t6") }] },
      { label: "Funciones de potencia", links: [{ text: "Teoría de potencia", to: sec("semana-2", "w2-t7") }, { text: "Gráficas de potencia", to: gal("Potencia") }] },
      { label: "Modelos potenciales y escala log-log", links: [{ text: "Linearización log-log", to: sec("semana-2", "w2-t8") }, { text: "Demostración", to: sec("modulo-ingenio", "b-t3") }, { text: "Ver en la galería", to: gal("Escalas log") }] },
      { label: "Polinomios, racionales, algebraicas", links: [{ text: "Polinomios y racionales", to: sec("semana-2", "w2-t13") }, { text: "Gráficas", to: gal("Polinomio/Racional") }] },
      { label: "Funciones exponenciales, crecimiento y decaimiento", links: [{ text: "Exponencial", to: sec("semana-2", "w2-t9") }, { text: "Vida media / duplicación", to: sec("semana-2", "w2-t10") }, { text: "Newton", to: sec("semana-2", "w2-t12") }] },
      { label: "Escala semi-log (linearización exponencial)", links: [{ text: "Linearización semi-log", to: sec("semana-2", "w2-t11") }, { text: "Ver en la galería", to: gal("Escalas log") }] },
    ],
  },
  {
    number: 3,
    slug: "semana-3",
    dates: "15/IX – 18/IX",
    stewart: "1.2, 1.3",
    topics: [
      { label: "Funciones trigonométricas", links: [{ text: "Repaso trigonométrico", to: sec("semana-3", "w3-t1") }, { text: "Gráficas", to: gal("Trigonométrica") }] },
      { label: "Combinación por tramos, operaciones aritméticas", links: [{ text: "Tramos y operaciones", to: sec("semana-3", "w3-t2") }] },
      { label: "Transformaciones elementales", links: [{ text: "Traslaciones", to: sec("semana-3", "w3-t3") }, { text: "Reflexiones", to: sec("semana-3", "w3-t4") }, { text: "Escalamientos", to: sec("semana-3", "w3-t5") }, { text: "🎨 Laboratorio visual", to: "/transformaciones" }] },
      { label: "Composición de funciones", links: [{ text: "Composición", to: sec("semana-3", "w3-t9") }] },
    ],
  },
  {
    number: 4,
    slug: "semana-4",
    dates: "22/IX – 25/IX (semana universitaria)",
    stewart: "1.5",
    topics: [
      { label: "Inyectivas, sobreyectivas, biyectivas", links: [{ text: "Definiciones", to: sec("semana-4", "w4-t1") }, { text: "Criterios de inyectividad", to: sec("semana-4", "w4-t2") }, { text: "Criterios de sobreyectividad", to: sec("semana-4", "w4-t3") }] },
    ],
  },
  {
    number: 5,
    slug: "semana-5",
    dates: "29/IX – 2/X",
    stewart: "1.5",
    topics: [
      { label: "Funciones inversas", links: [{ text: "Existencia y propiedades", to: sec("semana-5", "w5-t1") }, { text: "Algoritmo para hallarla", to: sec("semana-5", "w5-t2") }] },
      { label: "Funciones logarítmicas", links: [{ text: "Logaritmos", to: sec("semana-5", "w5-t3") }, { text: "Gráfica", to: gal("Exponencial/Log") }] },
      { label: "Trigonométricas inversas", links: [{ text: "Arcoseno, arcocoseno, arcotangente", to: sec("semana-5", "w5-t4") }, { text: "Gráficas", to: gal("Trigonométrica inversa") }] },
    ],
  },
];

/** Atajos por tema: lo que suele costar encontrar, agrupado por familia. */
export interface Shortcut {
  icon: string;
  title: string;
  hint: string;
  links: TopicLink[];
}

export const shortcuts: Shortcut[] = [
  {
    icon: "xⁿ",
    title: "Potencias",
    hint: "y = A·x^k",
    links: [
      { text: "Teoría", to: sec("semana-2", "w2-t7") },
      { text: "Log-log", to: sec("semana-2", "w2-t8") },
      { text: "Gráficas", to: gal("Potencia") },
    ],
  },
  {
    icon: "aˣ",
    title: "Exponenciales",
    hint: "y = A·aˣ",
    links: [
      { text: "Teoría", to: sec("semana-2", "w2-t9") },
      { text: "Vida media", to: sec("semana-2", "w2-t10") },
      { text: "Semi-log", to: sec("semana-2", "w2-t11") },
      { text: "Gráficas", to: gal("Exponencial/Log") },
    ],
  },
  {
    icon: "ln",
    title: "Logarítmicas",
    hint: "inversa de la exponencial",
    links: [
      { text: "Teoría", to: sec("semana-5", "w5-t3") },
      { text: "Gráfica", to: gal("Exponencial/Log") },
    ],
  },
  {
    icon: "log–log",
    title: "Escala log-log",
    hint: "u = ln x, v = ln y → recta de pendiente k",
    links: [
      { text: "Teoría", to: sec("semana-2", "w2-t8") },
      { text: "Demostración", to: sec("modulo-ingenio", "b-t3") },
      { text: "Gráficas", to: gal("Escalas log") },
    ],
  },
  {
    icon: "semi-log",
    title: "Escala semi-log",
    hint: "v = ln y contra x → recta de pendiente ln a",
    links: [
      { text: "Teoría", to: sec("semana-2", "w2-t11") },
      { text: "Gráficas", to: gal("Escalas log") },
    ],
  },
  {
    icon: "🎨",
    title: "Transformaciones",
    hint: "traslación, reflexión, escala",
    links: [
      { text: "Laboratorio visual", to: "/transformaciones" },
      { text: "Teoría", to: sec("semana-3", "w3-t3") },
      { text: "Combinada", to: sec("semana-3", "w3-t6") },
    ],
  },
  {
    icon: "sin",
    title: "Trigonométricas",
    hint: "directas e inversas",
    links: [
      { text: "Repaso", to: sec("semana-3", "w3-t1") },
      { text: "Inversas", to: sec("semana-5", "w5-t4") },
      { text: "Gráficas", to: gal("Trigonométrica") },
    ],
  },
  {
    icon: "f⁻¹",
    title: "Inyectiva / Inversa",
    hint: "biyectividad y función inversa",
    links: [
      { text: "Biyectividad", to: sec("semana-4", "w4-t1") },
      { text: "Inversa", to: sec("semana-5", "w5-t1") },
    ],
  },
];
