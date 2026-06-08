import {
  Clapperboard,
  Gamepad2,
  Music,
  PlaneTakeoff,
  SendHorizontal,
  Shuffle,
  UtensilsCrossed,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const THEMES = [
  {
    id: "cinema",
    label: "Cinema",
    icon: Clapperboard,
    color: "text-teal-400",
    bg: "bg-teal-900/40",
  },
  {
    id: "gastronomia",
    label: "Gastronomia",
    icon: UtensilsCrossed,
    color: "text-pink-400",
    bg: "bg-pink-900/40",
  },
  {
    id: "viagens",
    label: "Viagens",
    icon: PlaneTakeoff,
    color: "text-violet-400",
    bg: "bg-violet-900/40",
  },
  {
    id: "games",
    label: "Games",
    icon: Gamepad2,
    color: "text-indigo-400",
    bg: "bg-indigo-900/40",
  },
  {
    id: "musica",
    label: "Música",
    icon: Music,
    color: "text-teal-400",
    bg: "bg-teal-900/40",
  },
  {
    id: "aleatorio",
    label: "Aleatório",
    icon: Shuffle,
    color: "text-slate-400",
    bg: "bg-slate-700/40",
  },
];

export const SelectTopic = () => {
  return (
    <div className="grid grid-cols-1 w-full gap-3">
      <div className="grid grid-cols-2 w-full gap-3">
        {THEMES.map((theme) => {
          const Icon = theme.icon;

          return (
            <Card key={theme.id}>
              <CardContent className="flex gap-3">
                <Icon className={`size-5 ${theme.color}`} />
                <p className={`font-bold line-clamp-2`}>{theme.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="h-15 rounded-4xl px-5 bg-card flex flex-row items-center gap-3">
        <Input
          className="bg-transparent border-none ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Gere um novo tema"
        />
        <SendHorizontal />
      </div>
      <Button className="h-15 rounded-4xl text-lg">Confirmar</Button>
    </div>
  );
};
