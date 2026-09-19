import type { Interval } from "../components/graph/intervals";

/** Un tramo de una función definida por partes, con su dominio y rango exactos (declarados a mano). */
export interface BasePiece {
  label: string;
  tex: string;
  color: string;
  fn: (x: number) => number;
  dom: Interval;
  ran: Interval;
}

export interface BaseGraph {
  id: string;
  title: string;
  pieces: BasePiece[];
}

export const PIECE_COLORS = ["#b98bff", "#ffd166", "#6dffb0"];

const bases: BaseGraph[] = [
  {
    id: "mixta",
    title: "Recta + parábola + raíz",
    pieces: [
      {
        label: "Tramo 1 (recta)",
        tex: "x+2,\\ x\\in[-4,-1)",
        color: PIECE_COLORS[0],
        fn: (x) => x + 2,
        dom: { lo: -4, hi: -1, hiOpen: true },
        ran: { lo: -2, hi: 1, hiOpen: true },
      },
      {
        label: "Tramo 2 (parábola)",
        tex: "1.5-0.5x^2,\\ x\\in[-1,2]",
        color: PIECE_COLORS[1],
        fn: (x) => 1.5 - 0.5 * x * x,
        dom: { lo: -1, hi: 2 },
        ran: { lo: -0.5, hi: 1.5 },
      },
      {
        label: "Tramo 3 (raíz)",
        tex: "\\sqrt{x-2}-0.5,\\ x\\in(2,6]",
        color: PIECE_COLORS[2],
        fn: (x) => Math.sqrt(Math.max(x - 2, 0)) - 0.5,
        dom: { lo: 2, hi: 6, loOpen: true },
        ran: { lo: -0.5, hi: 1.5, loOpen: true },
      },
    ],
  },
  {
    id: "hueco",
    title: "Con hueco en el dominio y punto aislado",
    pieces: [
      {
        label: "Tramo 1 (recta)",
        tex: "0.5x+3,\\ x\\in[-5,-2]",
        color: PIECE_COLORS[0],
        fn: (x) => 0.5 * x + 3,
        dom: { lo: -5, hi: -2 },
        ran: { lo: 0.5, hi: 2 },
      },
      {
        label: "Tramo 2 (recta)",
        tex: "4-x,\\ x\\in(1,4]",
        color: PIECE_COLORS[1],
        fn: (x) => 4 - x,
        dom: { lo: 1, hi: 4, loOpen: true },
        ran: { lo: 0, hi: 3, hiOpen: true },
      },
      {
        label: "Tramo 3 (punto)",
        tex: "-1,\\ x=5",
        color: PIECE_COLORS[2],
        fn: () => -1,
        dom: { lo: 5, hi: 5 },
        ran: { lo: -1, hi: -1 },
      },
    ],
  },
  {
    id: "escalones",
    title: "Escalones (indicatrices)",
    pieces: [
      {
        label: "Tramo 1",
        tex: "2\\cdot\\mathbf 1_{[-4,-1)}",
        color: PIECE_COLORS[0],
        fn: () => 2,
        dom: { lo: -4, hi: -1, hiOpen: true },
        ran: { lo: 2, hi: 2 },
      },
      {
        label: "Tramo 2",
        tex: "-1\\cdot\\mathbf 1_{[-1,2)}",
        color: PIECE_COLORS[1],
        fn: () => -1,
        dom: { lo: -1, hi: 2, hiOpen: true },
        ran: { lo: -1, hi: -1 },
      },
      {
        label: "Tramo 3",
        tex: "1\\cdot\\mathbf 1_{[2,5]}",
        color: PIECE_COLORS[2],
        fn: () => 1,
        dom: { lo: 2, hi: 5 },
        ran: { lo: 1, hi: 1 },
      },
    ],
  },
];

export default bases;
