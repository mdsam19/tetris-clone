import { useState, useRef } from "react";
import { randomTetromino } from "../utils/tetromino";
import { playerType } from "../utils/types";
import {
  setInitialBoardPlayerPosition,
  setInitialPreviewBoardPlayerPosition,
} from "../utils/player";

export const usePlayers = () => {
  const [currentPlayer, setCurrentPlayer] = useState(() => {
    const player = randomTetromino();
    setInitialBoardPlayerPosition(player);
    return player;
  });
  const [upComingPlayer, setUpComingPlayer] = useState(() => {
    const player = randomTetromino();
    setInitialPreviewBoardPlayerPosition(player);
    return player;
  });
  const currentPlayerRef = useRef<playerType | null>(null);
  return {
    currentPlayer,
    upComingPlayer,
    currentPlayerRef,
    setUpComingPlayer,
    setCurrentPlayer,
  };
};
