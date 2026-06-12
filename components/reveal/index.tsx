import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useGame from "@/store/game-store";
import { usePlayers } from "@/store/player-store";
import { Button } from "../ui/button";
import { redirect } from "next/navigation";
import { parseAsStringEnum, useQueryState } from "nuqs";
import { GameState } from "@/@types/game";

export const RevealGame = () => {
  const [hover, setHover] = useState(false);

  const [_, setGameState] = useQueryState(
    "state",
    parseAsStringEnum<GameState>(Object.values(GameState)).withDefault(
      GameState.SETUP,
    ),
  );

  const game = useGame((state) => state.gameSetup);
  const currentUser = useGame((state) => state.currentRevealUser);
  const incrementCurretRevealUser = useGame(
    (state) => state.incrementCurretRevealUser,
  );
  const players = usePlayers((state) => state.players);
  const currentPlayer = players[currentUser];

  useEffect(() => {
    setHover(false);
  }, [currentUser]);

  if (!currentPlayer) return null;
  if (!game) return redirect("/game");

  const isImpostor = currentUser === game?.impostorIndex;

  const onFinishReveal = () => {
    setGameState(GameState.RESULT);
  };

  return (
    <div
      className="w-screen h-screen px-4 py-5 flex flex-col items-center justify-between relative"
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

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {!hover && (
            <motion.div
              key="image"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.3 }}
              className="rounded-full bg-white/10 p-6"
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{
                  x: [0, 15, 0, -15, 0],
                  y: [0, 15, 0, -15, 0],
                  opacity: 1,
                }}
                transition={{
                  x: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.3 },
                }}
                src="/identificacao.png"
                className="invert size-52"
                alt="icone de lupa com digital de dedo"
              />
            </motion.div>
          )}

          {hover && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="flex flex-col items-center gap-3 text-center px-4"
            >
              {isImpostor ? (
                <>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
                    sua identidade
                  </span>
                  <p className="text-4xl font-black text-white leading-tight">
                    Você é o{"\n"}
                    <span className="text-red-300">Impostor</span>
                  </p>
                  <div className="mt-2">
                    <span className="text-xs uppercase tracking-widest text-white/50 block mb-1">
                      sua dica
                    </span>
                    <p className="text-3xl font-bold text-white">
                      "{game?.impostorTip}"
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-white/50">
                    sua identidade
                  </span>
                  <p className="text-4xl font-black text-white leading-tight">
                    Você é um{"\n"}
                    <span className="text-green-300">Agente</span>
                  </p>
                  <div className="mt-2">
                    <span className="text-xs uppercase tracking-widest text-white/50 block mb-1">
                      palavra secreta
                    </span>
                    <p className="text-2xl font-bold text-white">
                      "{game?.word}"
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex flex-col items-center gap-5 mb-10">
        <span className="bg-black/20 rounded-full px-5 py-2 text-white text-base text-center">
          Coloque a digital pra descobrir sua identidade.
        </span>

        <motion.div
          onTapStart={() => setHover(true)}
          onTapCancel={() => setHover(false)}
          onTap={() => setHover(false)}
          whileTap={{ scale: 1.3 }}
          transition={{ duration: 0.3 }}
          className="rounded-full bg-white/20 size-20 border-4"
        ></motion.div>

        <Button
          onClick={() => incrementCurretRevealUser(onFinishReveal)}
          size={"lg"}
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};
