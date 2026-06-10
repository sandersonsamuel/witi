import { PlayersList } from "@/components/setup/player/players-list";
import { SelectTopic } from "@/components/setup/topic/select-topic";
import { WhatTopic } from "@/components/setup/topic/what-topic";

export const SetupGame = () => {
  return (
    <div className="px-4 py-5 w-full">
      <PlayersList />
      <WhatTopic />
      <SelectTopic />
    </div>
  );
};
