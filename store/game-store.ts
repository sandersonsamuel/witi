import { create } from "zustand";
import { usePlayers } from "./player-store";
import { limitTimes } from "@/lib/game-constants";

export interface Game {
  impostorIndex: number;
  impostorTip: string;
  word: string;
}

export interface GameStoreState {
  gameSetup?: Game;
  gameTime: number | null;
  currentRevealUser: number;
  setTime: (ms: number | null) => void;
  incrementCurretRevealUser: (onFinish: () => void) => void;
  createGame: (game: Game) => void;
  resetGame: () => void;
}

const useGame = create<GameStoreState>()((set, get) => ({
  currentRevealUser: 0,
  gameTime: limitTimes.find((time) => time.default)?.ms ?? 180_000,
  setTime: (ms) => {
    set(() => ({ gameTime: ms }));
  },
  incrementCurretRevealUser: (onFinish) => {
    const current = get().currentRevealUser;
    const players = usePlayers.getState().players;

    if (current + 1 >= players.length) {
      return onFinish();
    }

    set((state) => ({
      currentRevealUser: state.currentRevealUser + 1,
    }));
  },
  createGame: (game: Game) => {
    set({ gameSetup: game });
  },
  resetGame: () => {
    set({
      gameSetup: undefined,
      currentRevealUser: 0,
      gameTime: limitTimes.find((time) => time.default)?.ms ?? 180_000,
    });
  },
}));

export default useGame;
