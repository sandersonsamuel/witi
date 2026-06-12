"use client";

import { Suspense } from "react";

import { GameState } from "@/@types/game";
import { RevealGame } from "@/components/reveal";
import { SetupGame } from "@/components/setup";
import { TimeResultGame } from "@/components/time";
import { parseAsStringEnum, useQueryState } from "nuqs";

function GameContent() {
  const [gameState, _] = useQueryState(
    "state",
    parseAsStringEnum<GameState>(Object.values(GameState)).withDefault(
      GameState.SETUP,
    ),
  );

  return (
    <div className="flex flex-col items-center w-full overflow-x-hidden">
      {gameState === GameState.SETUP && <SetupGame />}
      {gameState === GameState.REVEAL && <RevealGame />}
      {gameState === GameState.RESULT && <TimeResultGame />}
    </div>
  );
}

export default function ThemePage() {
  return (
    <Suspense>
      <GameContent />
    </Suspense>
  );
}
