import useGame from "@/store/game-store";
import { usePlayers } from "@/store/player-store";
import { ArrowBigUpDash } from "lucide-react";
import { motion } from "motion/react";

const ArrowMotion = motion(ArrowBigUpDash);

export const RevealGame = () => {
  const game = useGame((state) => state.gameSetup);
  const currentUser = useGame((state) => state.currentRevealUser);
  const incrementCurretRevealUser = useGame(
    (state) => state.incrementCurretRevealUser,
  );
  const players = usePlayers((state) => state.players);
  const currentPlayer = players[currentUser];

  return (
    <div
      className="w-screen h-screen px-4 py-5 flex flex-col items-center gap-10"
      style={{ backgroundColor: currentPlayer.color }}
    >
      <h1 className="text-7xl font-bold text-center mt-10">
        {currentPlayer.name}
      </h1>

      <img
        src="/identificacao.png"
        className="invert size-72"
        alt="icone de lupa com digital de dedo"
      />

      <h3 className="text-2xl text-center">
        Arraste pra descobrir sua identidade.
      </h3>

      <ArrowMotion
        className="size-14"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
};
