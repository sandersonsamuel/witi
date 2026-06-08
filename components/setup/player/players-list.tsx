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

import { Pen, X } from "lucide-react";
import { AddPlayer } from "./add-player";

const users = [
  {
    name: "John Doe",
  },
  {
    name: "Jane Smith",
  },
  {
    name: "Alice Johnson",
  },
];

export const PlayersList = () => {
  return (
    <div className="flex flex-nowrap gap-3 py-3 w-full">
      {users.map((user, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <div className="p-5 border rounded-full size-18 flex items-center justify-center relative font-bold">
              <X className="absolute -top-1 -right-2.5 text-destructive" />
              <p>{user.name.slice(0, 3)}</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar jogador</DialogTitle>
            </DialogHeader>
            <form action="" className="flex flex-col gap-3">
              <Input placeholder="Nome do jogador" />
              <DialogFooter className="flex items-end">
                <Button className="w-fit">
                  <Pen /> Editar{" "}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      ))}
      <AddPlayer />
    </div>
  );
};
