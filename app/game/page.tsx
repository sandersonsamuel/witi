import { PlayersList } from "@/components/setup/player/players-list";
import { SelectTopic } from "@/components/setup/topic/select-topic";
import { WhatTopic } from "@/components/setup/topic/what-topic";

export default function ThemePage() {
  return (
    <div className="flex flex-col items-center px-4 py-5">
      <PlayersList />
      <WhatTopic />
      <SelectTopic />
    </div>
  );
}
