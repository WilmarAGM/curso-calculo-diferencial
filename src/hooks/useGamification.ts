import { useMemo } from "react";
import weeks from "../data/weeks";
import { useProgress } from "./useProgress";
import { useQuizScores } from "./useQuizScores";

export interface Badge {
  id: string;
  label: string;
  icon: string;
  unlocked: boolean;
}

const XP_PER_EXERCISE = 10;
const XP_PER_QUIZ_POINT = 0.3; // 100% quiz => 30 XP

export function useGamification() {
  const { countDone } = useProgress();
  const { map: quizMap } = useQuizScores();

  return useMemo(() => {
    const weeklyWeeks = weeks.filter((w) => w.number <= 5);

    let exercisesSolved = 0;
    let exercisesTotal = 0;
    const badges: Badge[] = [];

    weeklyWeeks.forEach((w) => {
      const ids = w.exercises.map((e) => e.id);
      const done = countDone(ids);
      exercisesSolved += done;
      exercisesTotal += ids.length;

      const allExercisesDone = ids.length > 0 && done === ids.length;
      badges.push({
        id: `${w.slug}-exercises`,
        label: `Semana ${w.number}: ejercicios completos`,
        icon: "✅",
        unlocked: allExercisesDone,
      });

      const quizPct = quizMap[w.slug] ?? 0;
      if (w.quiz && w.quiz.length > 0) {
        badges.push({
          id: `${w.slug}-quiz`,
          label: `Semana ${w.number}: quiz dominado`,
          icon: "🧠",
          unlocked: quizPct >= 80,
        });
      }
    });

    const allWeeksMastered = weeklyWeeks.every((w) => {
      const ids = w.exercises.map((e) => e.id);
      const done = countDone(ids);
      const exercisesOk = ids.length === 0 || done === ids.length;
      const quizOk = !w.quiz || w.quiz.length === 0 || (quizMap[w.slug] ?? 0) >= 80;
      return exercisesOk && quizOk;
    });
    badges.push({
      id: "champion",
      label: "Primer Parcial dominado (todas las semanas)",
      icon: "🏆",
      unlocked: allWeeksMastered,
    });

    const quizXP = Object.values(quizMap).reduce((acc, pct) => acc + pct * XP_PER_QUIZ_POINT, 0);
    const totalXP = Math.round(exercisesSolved * XP_PER_EXERCISE + quizXP);
    const level = Math.floor(totalXP / 100) + 1;
    const xpIntoLevel = totalXP % 100;

    return {
      totalXP,
      level,
      xpIntoLevel,
      xpForNextLevel: 100,
      exercisesSolved,
      exercisesTotal,
      badges,
      unlockedCount: badges.filter((b) => b.unlocked).length,
    };
  }, [countDone, quizMap]);
}
