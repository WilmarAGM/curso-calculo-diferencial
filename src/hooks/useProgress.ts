import { useCallback, useEffect, useState } from "react";

const KEY = "calculo-cd-progress-v1";

type ProgressMap = Record<string, boolean>;

function load(): ProgressMap {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function save(map: ProgressMap) {
  try {
    localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    /* ignore quota / private mode errors */
  }
}

export function useProgress() {
  const [map, setMap] = useState<ProgressMap>(() => load());

  useEffect(() => {
    save(map);
  }, [map]);

  const isDone = useCallback((id: string) => !!map[id], [map]);

  const toggle = useCallback((id: string) => {
    setMap((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const countDone = useCallback(
    (ids: string[]) => ids.filter((id) => map[id]).length,
    [map]
  );

  return { isDone, toggle, countDone, map };
}
