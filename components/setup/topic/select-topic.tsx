"use client";

import { useThemes } from "@/app/hooks/themes/use-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DynamicIcon } from "@/components/ui/dinamic-icon";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { usePlayers } from "@/store/player-store";

const MotionCard = motion.create(Card);

export const SelectTopic = () => {
  const { data } = useThemes();
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  const players = usePlayers((state) => state.players);

  const handleSelectTheme = (themeId: string) => {
    if (selectedTheme === themeId) {
      setSelectedTheme(null);
      return;
    }
    setSelectedTheme(themeId);
  };

  return (
    <div className="grid grid-cols-1 w-full gap-3">
      <div className="grid grid-cols-2 w-full gap-3">
        {data?.map((theme) => {
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
        disabled={!selectedTheme || players.length === 0}
        className="h-15 rounded-4xl text-lg"
      >
        Confirmar
      </Button>
    </div>
  );
};
