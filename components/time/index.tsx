"use client";

import { useEffect, useState } from "react";

import { motion } from "motion/react";

import { parseAsStringEnum, useQueryState } from "nuqs";

import { GameState } from "@/@types/game";
import useGame from "@/store/game-store";
import { usePlayers } from "@/store/player-store";

import { Button } from "../ui/button";

export const TimeResultGame = () => {
  const gameTime = useGame((state) => state.gameTime);
  const game = useGame((state) => state.gameSetup);
  const resetGame = useGame((state) => state.resetGame);
  const players = usePlayers((state) => state.players);

  const [_, setGameState] = useQueryState(
    "state",
    parseAsStringEnum<GameState>(Object.values(GameState)).withDefault(
      GameState.SETUP,
    ),
  );

  const [timeLeft, setTimeLeft] = useState<number | null>(gameTime);
  const [ended, setEnded] = useState(false);

  useEffect(() => {
    if (timeLeft === null) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 1000) {
          clearInterval(interval);
          setEnded(true);
          return 0;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = timeLeft !== null ? Math.floor(timeLeft / 60_000) : null;
  const seconds =
    timeLeft !== null ? Math.floor((timeLeft % 60_000) / 1000) : null;

  const impostors = (game?.impostorIndex ?? [])
    .map((index) => players[index])
    .filter(Boolean);

  return (
    <div className="w-screen h-screen px-4 py-5 flex flex-col items-center justify-around">
      <div className="flex flex-col items-center gap-1 mt-10">
        <span className="text-sm font-medium uppercase tracking-widest text-white/60">
          tempo de jogo
        </span>

        {timeLeft !== null ? (
          <motion.h1
            key={timeLeft}
            initial={{ scale: 1.15, opacity: 0.6 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-7xl font-black text-white tabular-nums"
          >
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </motion.h1>
        ) : (
          <h1 className="text-5xl font-black text-white">Sem limite</h1>
        )}
      </div>

      <div className="flex flex-col items-center gap-2 text-center px-6">
        <span className="text-white/40 uppercase tracking-widest">
          {players.length} jogadores
        </span>
        <p className="text-white/70 text-lg">
          Discutam e tentem descobrir quem é o impostor.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 mb-10 w-full px-4">
        {ended && impostors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="w-full bg-white/10 rounded-2xl px-6 py-4 text-center"
          >
            <span className="text-xs uppercase tracking-widest text-white/50 block mb-1">
              {impostors.length > 1 ? "os impostores eram" : "o impostor era"}
            </span>
            <p className="text-3xl font-black text-red-300">
              {impostors.map((impostor) => impostor.name).join(", ")}
            </p>
            <p className="text-sm text-white/50 mt-1">
              A dica era: "{game?.impostorTip}"
            </p>
          </motion.div>
        )}

        {!ended && (
          <Button size={"lg"} className="w-full" onClick={() => setEnded(true)}>
            Revelar impostor
          </Button>
        )}

        {ended && (
          <Button
            size={"lg"}
            className="w-full"
            onClick={() => {
              resetGame();
              setGameState(GameState.SETUP);
            }}
          >
            Reiniciar
          </Button>
        )}
      </div>
    </div>
  );
};
