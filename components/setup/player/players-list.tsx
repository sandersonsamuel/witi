"use client";

import { usePlayers } from "@/store/player-store";
import { X } from "lucide-react";
import { AddPlayer } from "./add-player";

export const PlayersList = () => {
  const players = usePlayers((state) => state.players);
  const removePlayer = usePlayers((state) => state.removePlayer);

  return (
    <div>
      <p>Jogadores:</p>
      <div className="flex flex-nowrap gap-3 py-3 w-full overflow-x-auto">
        {players.map((user, index) => (
          <div
            key={index}
            className="p-5 border rounded-full size-18 shrink-0 flex items-center justify-center relative font-bold"
            style={{ borderColor: user.color }}
          >
            <X
              onClick={() => removePlayer(index)}
              className="absolute -top-1 -right-2.5 text-destructive"
            />
            <p>{user.name.slice(0, 3)}</p>
          </div>
        ))}
        <AddPlayer />
      </div>
    </div>
  );
};
