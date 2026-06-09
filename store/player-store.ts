import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Player {
  name: string;
  color: string;
}

interface PlayersState {
  players: Player[];
  addPlayer: (player: Player) => void;
  removePlayer: (index: number) => void;
}

export const usePlayers = create<PlayersState>()(
  persist(
    (set) => ({
      players: [] as Player[],
      addPlayer: (player: Player) =>
        set((state) => ({ players: [...state.players, player] })),
      removePlayer: (index: number) =>
        set((state) => ({
          players: state.players.filter((_, i) => i !== index),
        })),
    }),
    { name: "players" },
  ),
);
