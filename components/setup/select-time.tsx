"use client";

import { cn } from "@/lib/utils";
import { limitTimes } from "@/lib/game-constants";
import useGame from "@/store/game-store";

export { limitTimes };

export const SelectTime = () => {
  const gameTime = useGame((state) => state.gameTime);
  const setTime = useGame((state) => state.setTime);

  return (
    <div className="flex flex-col gap-3">
      <h3>Tempo de jogo: </h3>
      <div className="flex gap-2">
        {limitTimes.map((limit) => (
          <span
            onClick={() => setTime(limit.ms)}
            key={limit.label}
            className={cn(
              "border p-1 rounded-full px-2 text-sm",
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
