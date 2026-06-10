import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Game {
  impostorIndex: number;
  impostorTip: string;
  word: string;
}

export interface GameStoreState {
  gameSetup?: Game;
  currentRevealUser: number;
  incrementCurretRevealUser: () => void;
  createGame: (game: Game) => void;
}

const useGame = create<GameStoreState>()(
  persist(
    (set) => ({
      currentRevealUser: 0,
      incrementCurretRevealUser: () => {
        set((state) => ({ currentRevealUser: state.currentRevealUser + 1 }));
      },
      createGame: (game: Game) => {
        set({ gameSetup: game });
      },
    }),
    { name: "game" },
  ),
);

export default useGame;
