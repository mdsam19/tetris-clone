import "./index.css";
import { boardDimension } from "../../utils/types";
import { usePreview } from "../../hooks/usepreview";
import { useBoard } from "../../hooks/useboard";
import { useStats } from "../../hooks/usestats";
import { usePlayers } from "../../hooks/useplayers";
import { useInterval } from "../../hooks/useInterval";
import { useGameOver } from "../../hooks/usegameOver";
import { useEffect, useRef, useState } from "react";
import { defaultDropTime, dropPlayer } from "../../utils/player";
import Board from "../board";
import GameStat from "../gamestats";
import Preview from "../preview";
import GameOver from "../gameOver";

const Tetris = ({ boardWidth, boardHeight }: boardDimension) => {
  const runningSideEffect = useRef(false);
  const levelRef = useRef(1);
  const gameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const game = gameRef.current;
    const prevent = (e: TouchEvent) => {
      e.preventDefault();
    };
    game?.addEventListener("touchmove", prevent, { passive: false });
    return () => game?.removeEventListener("touchmove", prevent);
  }, []);
  const {
    currentPlayer,
    upComingPlayer,
    currentPlayerRef,
    setUpComingPlayer,
    setCurrentPlayer,
  } = usePlayers();
  const preview = usePreview(upComingPlayer);
  const { stats, setStats, tempLines } = useStats();
  const { board, setBoard } = useBoard({
    boardWidth,
    boardHeight,
    player: currentPlayer,
    oldPlayerRef: currentPlayerRef,
    runningSideEffect,
    setStat: setStats,
    tempLines,
  });
  const [dropTime, setDropTime] = useState<number | null>(defaultDropTime);
  const { gameOver, setGameOver } = useGameOver();
  useEffect(() => {
    if (dropTime === null) return;
    if (stats.level > levelRef.current) {
      levelRef.current += 1;
      if (dropTime! >= 150) setDropTime((prev) => prev! - 50);
    }
  }, [stats]);
  useInterval(() => {
    if (!runningSideEffect.current)
      dropPlayer({
        currentPlayerRef,
        currentPlayer,
        setCurrentPlayer,
        setUpComingPlayer,
        board,
        upComingPlayer,
        runningSideEffect,
        setGameOver,
        setDropTime,
      });
  }, dropTime);

  return (
    <div className="tetris" ref={gameRef}>
      <Preview preview={preview} />
      <Board
        board={board}
        currentPlayer={currentPlayer}
        upComingPlayer={upComingPlayer}
        currentPlayerRef={currentPlayerRef}
        setCurrentPlayer={setCurrentPlayer}
        setUpComingPlayer={setUpComingPlayer}
        runningSideEffect={runningSideEffect}
        setGameOver={setGameOver}
        gameOver={gameOver}
        setDropTime={setDropTime}
      />
      <GameStat stats={stats} />
      {gameOver && (
        <GameOver
          setGameOver={setGameOver}
          setDropTime={setDropTime}
          setStats={setStats}
          setPlayer={setCurrentPlayer}
          setUpComingPlayer={setUpComingPlayer}
          currentPlayerRef={currentPlayerRef}
          setBoard={setBoard}
          runningSideEffect={runningSideEffect}
          tempLines={tempLines}
          levelRef={levelRef}
          score={stats.score}
        />
      )}
    </div>
  );
};

export default Tetris;
