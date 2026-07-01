import { create } from "zustand";
import { usePlayers } from "./player-store";
import { limitTimes } from "@/lib/game-constants";

export interface Game {
  impostorIndex: number[];
  impostorTip: string;
  word: string;
}

export interface GameStoreState {
  gameSetup?: Game;
  impostorQuantity: number
  gameTime: number | null;
  currentRevealUser: number;
  usedWordIds: Record<string, string[]>;
  setImpostorQuantity: (quantity: number) => void;
  setTime: (ms: number | null) => void;
  incrementCurretRevealUser: (onFinish: () => void) => void;
  createGame: (game: Game) => void;
  resetGame: () => void;
  pickUnusedWordId: (themeId: string, wordIds: string[]) => string;
}

const useGame = create<GameStoreState>()((set, get) => ({
  currentRevealUser: 0,
  impostorQuantity: 1,
  gameTime: limitTimes.find((time) => time.default)?.ms ?? 180_000,
  usedWordIds: {},
  setTime: (ms) => {
    set(() => ({ gameTime: ms }));
  },
  setImpostorQuantity: (quantity) => {
    set(() => ({ impostorQuantity: quantity }));
  },
  pickUnusedWordId: (themeId, wordIds) => {
    const usedForTheme = get().usedWordIds[themeId] ?? [];
    const available = wordIds.filter((id) => !usedForTheme.includes(id));

    // se todas as palavras do tema já foram usadas, reinicia o histórico
    const pool = available.length > 0 ? available : wordIds;
    const nextUsed = available.length > 0 ? usedForTheme : [];

    const pickedId = pool[Math.floor(Math.random() * pool.length)];

    set((state) => ({
      usedWordIds: {
        ...state.usedWordIds,
        [themeId]: [...nextUsed, pickedId],
      },
    }));

    return pickedId;
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
