import { useCallback, useEffect, useState } from "react";

const KEY = "calculo-cd-quiz-scores-v1";

type ScoreMap = Record<string, number>; // weekSlug -> best percent (0-100)

function load(): ScoreMap {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(map: ScoreMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* ignore quota / private mode errors */
  }
}

export function useQuizScores() {
  const [map, setMap] = useState<ScoreMap>(() => load());

  useEffect(() => {
    save(map);
  }, [map]);

  const bestScore = useCallback((slug: string) => map[slug] ?? null, [map]);

  const submitScore = useCallback((slug: string, percent: number) => {
    setMap((prev) => ({ ...prev, [slug]: Math.max(prev[slug] ?? 0, percent) }));
  }, []);

  return { map, bestScore, submitScore };
}
