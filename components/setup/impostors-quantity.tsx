import { Slider } from "@/components/ui/slider";
import useGame from "@/store/game-store";
import { usePlayers } from "@/store/player-store";

export const ImpostorsQuantity = () => {
  const players = usePlayers((state) => state.players);
  const impostorQuantity = useGame((state) => state.impostorQuantity);
  const setImpostorQuantity = useGame((state) => state.setImpostorQuantity);

  return (
    <div>
      <p>Quantidade de impostores: {impostorQuantity}</p>
      <div className="flex gap-2">
        <Slider
          disabled={players.length < 2}
          className="my-3"
          onValueChange={(value) => setImpostorQuantity(value[0])}
          defaultValue={[impostorQuantity]}
          max={Math.max(players.length - 1, 1)}
          min={1}
          step={1}
        />
      </div>
    </div>
  );
};
