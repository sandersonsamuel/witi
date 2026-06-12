"use client";

import { cn } from "@/lib/utils";
import useGame from "@/store/game-store";

export const limitTimes = [
  { label: "2 min", ms: 120_000 },
  { label: "3 min", ms: 180_000, default: true },
  { label: "5 min", ms: 300_000 },
  { label: "Sem limite", ms: null },
];

export const SelectTime = () => {
  const gameTime = useGame((state) => state.gameTime);
  const setTime = useGame((state) => state.setTime);

  return (
    <div className="flex flex-col gap-3">
      <h3>Tempo de jogo: </h3>
      <div className="flex gap-3">
        {limitTimes.map((limit) => (
          <span
            onClick={() => setTime(limit.ms)}
            key={limit.label}
            className={cn(
              "border p-3 rounded-full",
              gameTime === limit.ms && "border-2 border-white/50",
            )}
          >
            {limit.label}
          </span>
        ))}
      </div>
    </div>
  );
};
