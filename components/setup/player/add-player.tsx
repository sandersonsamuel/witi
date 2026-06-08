import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const AddPlayer = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-5 border rounded-full size-18 flex items-center justify-center">
          <Plus />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar jogador</DialogTitle>
        </DialogHeader>
        <form action="" className="flex flex-col gap-3">
          <Input placeholder="Nome do jogador" />
          <DialogFooter className="flex items-end">
            <Button className="w-fit">Adicionar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
