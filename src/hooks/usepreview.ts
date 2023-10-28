import { useEffect, useState } from "react";
import { defaultBoard, previewBoardDimension } from "../utils/Board";
import { playerType } from "../utils/types";

export const usePreview = (upComingPlayer: playerType) => {
  const [previewBoard, setPreviewBoard] = useState(() => {
    const { boardWidth, boardHeight } = previewBoardDimension;
    return defaultBoard({ boardWidth, boardHeight });
  });
  useEffect(() => {
    setPreviewBoard(() => {
      const newBoard = defaultBoard({ boardWidth: 4, boardHeight: 6 });
      const shape = upComingPlayer.shapes[0];
      const posX = upComingPlayer.position.x;
      const posY = upComingPlayer.position.y;
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[0].length; x++) {
          if (shape[y][x]) {
            newBoard[y + posY][x + posX].color = upComingPlayer.color;
          }
        }
      }
      return newBoard;
    });
  }, [upComingPlayer]);
  return previewBoard;
};
