import week1 from "./week1";
import week2 from "./week2";
import week3 from "./week3";
import week4 from "./week4";
import week5 from "./week5";
import bonus from "./bonus";
import type { Week } from "../types";

const weeks: Week[] = [week1, week2, week3, week4, week5, bonus];

export default weeks;

export const checklist: string[] = [
  "¿Verificaste las restricciones implícitas de denominadores (≠0), raíces pares (≥0) y logaritmos (>0)?",
  "¿Revisaste que los intervalos de las indicatrices no se solapen incorrectamente y que la función valga exactamente 0 fuera de su soporte?",
  "¿Comprobaste la paridad sustituyendo explícitamente (−x) en el álgebra, no solo \"a ojo\"?",
  "¿Multiplicaste o dividiste correctamente los límites del dominio al hacer escalamientos f(ax−b)?",
  "¿Tu respuesta final es un número entero dentro del rango [−100, 100], como exige el sistema SiDEx?",
];
