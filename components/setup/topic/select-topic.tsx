"use client";

import { GameState } from "@/@types/game";
import { getWordHints } from "@/app/actions/theme/word_hints";
import { useThemeWords } from "@/app/hooks/themes/use-theme-words";
import { useThemes } from "@/app/hooks/themes/use-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/components/ui/dinamic-icon";
import { Input } from "@/components/ui/input";
import { random, randomUniqueNumbers } from "@/lib/utils";
import useGame from "@/store/game-store";
import { usePlayers } from "@/store/player-store";
import { SendHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { useState } from "react";

const MotionCard = motion.create(Card);

export const SelectTopic = () => {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const { data: themes } = useThemes();
  const { data: themeWords, isFetching: isFetchingThemeWords } =
    useThemeWords(selectedTheme);

  const [_, setGameState] = useQueryState(
    "state",
    parseAsStringEnum<GameState>(Object.values(GameState)).withDefault(
      GameState.SETUP,
    ),
  );

  const createGame = useGame((state) => state.createGame);
  const players = usePlayers((state) => state.players);
  const impostorQuantity = useGame((state) => state.impostorQuantity);
  const pickUnusedWordId = useGame((state) => state.pickUnusedWordId);

  const handleSelectTheme = (themeId: string) => {
    if (selectedTheme === themeId) {
      setSelectedTheme(null);
      return;
    }
    setSelectedTheme(themeId);
  };

  const playGame = async () => {
    if (!selectedTheme || players.length <= 1 || !themeWords) {
      return;
    }

    const themeWordId = pickUnusedWordId(
      selectedTheme,
      themeWords.map((word) => word.id),
    );
    const themeWord = themeWords.find((word) => word.id === themeWordId)!;
    const impostorTip = await getWordHints(themeWord.id);

    const newGame = {
      impostorIndex: randomUniqueNumbers(
        0,
        players.length - 1,
        impostorQuantity,
      ),
      word: themeWord.word,
      impostorTip: impostorTip[random(0, impostorTip.length - 1)].hint,
    };

    createGame(newGame);
    setGameState(GameState.REVEAL);
  };

  return (
    <div className="grid grid-cols-1 w-full gap-3">
      <div className="grid grid-cols-2 w-full gap-3">
        {themes?.map((theme) => {
          return (
            <MotionCard
              whileTap={{ scale: 0.95 }}
              initial={{ scale: 0 }}
              animate={{
                scale: [1.05, 1],
                transition: { type: "spring", stiffness: 100, damping: 15 },
              }}
              key={theme.id}
              onClick={() => handleSelectTheme(theme.id)}
              className={
                selectedTheme === theme.id
                  ? `outline-2 outline-${theme.meta.color}-400`
                  : "outline-none"
              }
            >
              <CardContent className={`flex gap-3`}>
                <DynamicIcon
                  className={`text-${theme.meta.color}-400`}
                  name={theme.meta.icon}
                />
                <p className={`font-bold line-clamp-2`}>{theme.name}</p>
              </CardContent>
            </MotionCard>
          );
        })}
      </div>
      <div className="h-15 rounded-4xl px-5 bg-card flex flex-row items-center gap-3">
        <Input
          className="bg-transparent border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Crie um novo tema"
        />
        <SendHorizontal />
      </div>
      <Button
        onClick={playGame}
        disabled={
          !selectedTheme ||
          players.length <= 1 ||
          isFetchingThemeWords ||
          !themeWords?.length
        }
        className="h-15 rounded-4xl text-lg"
      >
        Jogar
      </Button>
    </div>
  );
};
