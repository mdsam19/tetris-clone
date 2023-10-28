import { GameBoardDimension, defaultBoard } from "./Board";
import {
  defaultDropTime,
  setInitialBoardPlayerPosition,
  setInitialPreviewBoardPlayerPosition,
} from "./player";
import { initialStats } from "./stats";
import { randomTetromino } from "./tetromino";
import { boardType, playerType, statsType } from "./types";

export const reset = ({
  setPlayer,
  setBoard,
  setStats,
  setUpComingPlayer,
  currentPlayerRef,
  setDropTime,
  setGameOver,
  runningSideEffect,
  tempLines,
  levelRef,
}: {
  setPlayer: React.Dispatch<React.SetStateAction<playerType>>;
  setBoard: React.Dispatch<React.SetStateAction<boardType>>;
  setStats: React.Dispatch<React.SetStateAction<statsType>>;
  setUpComingPlayer: React.Dispatch<React.SetStateAction<playerType>>;
  currentPlayerRef: React.MutableRefObject<playerType | null>;
  setDropTime: React.Dispatch<React.SetStateAction<number | null>>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  runningSideEffect: React.MutableRefObject<boolean>;
  tempLines: React.MutableRefObject<number>;
  levelRef: React.MutableRefObject<number>;
}) => {
  setPlayer(() => {
    const player = randomTetromino();
    setInitialBoardPlayerPosition(player);
    return player;
  });
  setUpComingPlayer(() => {
    const player = randomTetromino();
    setInitialPreviewBoardPlayerPosition(player);
    return player;
  });
  currentPlayerRef.current = null;
  setStats(initialStats());
  setDropTime(defaultDropTime);
  setBoard(
    defaultBoard({
      boardWidth: GameBoardDimension.boardWidth,
      boardHeight: GameBoardDimension.boardHeight,
    }),
  );
  tempLines.current = 0;
  runningSideEffect.current = false;
  levelRef.current = 1;
  setGameOver(false);
};
