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
      className="w-screen h-screen px-4 py-5 flex flex-col items-center justify-between"
      style={{
        background: `linear-gradient(to bottom, ${currentPlayer.color}, ${currentPlayer.color}99)`,
      }}
    >
      <div className="flex flex-col items-center gap-1 mt-10">
        <span className="text-sm font-medium uppercase tracking-widest text-white/60">
          sua vez
        </span>
        <h1 className="text-5xl font-bold text-center text-white">
          {currentPlayer.name}
        </h1>
      </div>

      <div className="rounded-full bg-white/10 p-6">
        <img
          src="/identificacao.png"
          className="invert size-52"
          alt="icone de lupa com digital de dedo"
        />
      </div>

      <div className="flex flex-col items-center gap-3 mb-10">
        <span className="bg-black/20 rounded-full px-5 py-2 text-white text-base text-center">
          Arraste pra descobrir sua identidade.
        </span>
        <div className="rounded-full bg-white/20 p-3">
          <ArrowMotion
            className="size-10"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};
