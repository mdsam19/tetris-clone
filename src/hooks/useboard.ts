import { useEffect, useState } from "react";
import { boardHookType } from "../utils/types";
import { defaultBoard, newBoard } from "../utils/Board";

export const useBoard = ({
  boardWidth,
  boardHeight,
  player,
  oldPlayerRef,
  runningSideEffect,
  setStat,
  tempLines,
}: boardHookType) => {
  const [board, setBoard] = useState(() =>
    defaultBoard({ boardHeight, boardWidth }),
  );
  useEffect(() => {
    setBoard((prevBoard) => {
      const board = newBoard({
        player,
        board: prevBoard,
        oldPlayerRef,
        setStat,
        tempLines,
      });
      runningSideEffect.current = false;
      return board;
    });
  }, [player]);
  return { board, setBoard };
};
