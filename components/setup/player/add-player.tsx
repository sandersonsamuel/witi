"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Player, usePlayers } from "@/store/player-store";
import { useEffect, useState } from "react";

const PLAYER_COLORS = [
  "#EF4444", // vermelho
  "#F97316", // laranja
  "#EAB308", // amarelo
  "#22C55E", // verde
  "#06B6D4", // ciano
  "#3B82F6", // azul
  "#8B5CF6", // violeta
  "#EC4899", // rosa
  "#14B8A6", // teal
  "#65A30D", // verde-limão
  "#F43F5E", // rose
  "#B45309", // marrom
  "#4F46E5", // índigo
  "#84CC16", // lima
  "#E879F9", // fúcsia
  "#78716C", // cinza
];

export const AddPlayer = () => {
  const [playerName, setPlayerName] = useState<string | null>();
  const [playerSelectedColor, playerSetSelectedColor] = useState<
    string | null
  >();

  const addStorePlayer = usePlayers((state) => state.addPlayer);
  const players = usePlayers((state) => state.players);

  const filledPlayer = !!playerName && !!playerSelectedColor;

  const handleSelectColor = (color: string) => {
    if (color === playerSelectedColor) return playerSetSelectedColor(null);
    playerSetSelectedColor(color);
  };

  useEffect(() => {
    console.log(players);
  }, [players]);

  const formAction = () => {
    if (!playerName || !playerSelectedColor) {
      return;
    }

    const newPlayer: Player = {
      name: playerName,
      color: playerSelectedColor,
    };

    addStorePlayer(newPlayer);
    playerSetSelectedColor(null);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-5 border rounded-full min-h-18 min-w-18 flex items-center justify-center">
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar jogador</DialogTitle>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-3">
          <Input
            onChange={(e) => setPlayerName(e.target.value)}
            name="playerName"
            placeholder="Nome do jogador"
          />
          <p>Selecione um cor para o jogador: </p>
          <div className="grid grid-cols-8 gap-2 justify-items-center w-full">
            {PLAYER_COLORS.map((c) => (
              <span
                onClick={() => handleSelectColor(c)}
                key={c}
                className={cn(
                  "size-7 rounded-full hover:cursor-pointer",
                  c === playerSelectedColor ? "border-2 border-white" : "",
                )}
                style={{ backgroundColor: c }}
              ></span>
            ))}
          </div>
          <DialogFooter className="flex items-end">
            <Button disabled={!filledPlayer} className="w-fit">
              Adicionar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
