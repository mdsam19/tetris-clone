import { dropPosition } from "./player";
import { boardDimension, boardType, playerType, statsType } from "./types";

export const GameBoardDimension = {
  boardWidth: 10,
  boardHeight: 20,
};
export const previewBoardDimension = {
  boardWidth: 4,
  boardHeight: 6,
};

const defaultCell = {
  color: "black",
  occupied: false,
};

export const defaultBoard = ({ boardWidth, boardHeight }: boardDimension) => {
  return Array.from({ length: boardHeight }, () =>
    Array.from({ length: boardWidth }, () => ({ ...defaultCell })),
  );
};

const boardHelper = ({
  player,
  newboard,
  operation,
  operationValue,
}: {
  player: playerType;
  newboard: boardType;
  operation: "color" | "occupied";
  operationValue: any;
}) => {
  const shape = player.shapes[player.index];
  const posX = player.position.x;
  const posY = player.position.y;
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      if (operation === "color") {
        if (shape[y][x]) {
          newboard[y + posY][x + posX][operation] = operationValue;
        }
      }
      if (operation === "occupied") {
        if (shape[y][x]) {
          newboard[y + posY][x + posX][operation] = operationValue;
        }
      }
    }
  }
};

export const newBoard = ({
  player,
  board,
  oldPlayerRef,
  setStat,
  tempLines,
}: {
  player: playerType;
  board: boardType;
  oldPlayerRef: React.MutableRefObject<playerType | null>;
  setStat: React.Dispatch<React.SetStateAction<statsType>>;
  tempLines: React.MutableRefObject<number>;
}) => {
  const newboard = [...board];
  const oldPlayer = oldPlayerRef.current;
  let numberOfLinesCleared = 0;
  if (oldPlayer) {
    if (oldPlayer.collided) {
      boardHelper({
        newboard,
        player: oldPlayer,
        operation: "occupied",
        operationValue: true,
      });
      const posY = oldPlayer.position.y;
      let startPosy = posY;
      let endPosy = posY + 3;
      if (posY < 0) {
        startPosy = 0;
        endPosy = 3;
      } else if (endPosy > 16) {
        startPosy = 16;
        endPosy = 19;
      }
      for (let y = startPosy; y <= endPosy; y++) {
        let lineCleared = true;
        for (let x = 0; x < board[0].length; x++) {
          if (!newboard[y][x].occupied) {
            lineCleared = false;
            break;
          }
        }
        if (lineCleared) {
          numberOfLinesCleared += 1;
          const newLine = Array.from(
            { length: GameBoardDimension.boardWidth },
            () => ({ ...defaultCell }),
          );
          newboard.splice(y, 1);
          newboard.unshift(newLine);
        }
      }
      if (numberOfLinesCleared) {
        setStat((prev) => {
          const newStat = { ...prev };
          newStat.lines += numberOfLinesCleared;
          tempLines.current += numberOfLinesCleared;
          if (tempLines.current >= 10) {
            newStat.level += 1;
            tempLines.current = tempLines.current % 10;
          }
          if (numberOfLinesCleared === 1) {
            newStat.score += 100;
          } else if (numberOfLinesCleared === 2) {
            newStat.score += 300;
          } else if (numberOfLinesCleared === 3) {
            newStat.score += 600;
          } else if (numberOfLinesCleared === 4) {
            newStat.score += 1200;
          }
          return newStat;
        });
      }
    }

    if (!oldPlayer.collided) {
      const oldghost = { ...oldPlayer };
      oldghost.position = { ...oldPlayer.position };
      oldghost.position.y = dropPosition({ board, player: oldghost });
      boardHelper({
        newboard,
        player: oldghost,
        operation: "color",
        operationValue: "black",
      });

      boardHelper({
        newboard,
        player: oldPlayer,
        operation: "color",
        operationValue: "black",
      });
    }
  }
  if (player) {
    const ghost = { ...player };
    ghost.position = { ...player.position };
    ghost.position.y = dropPosition({ board: newboard, player: ghost });
    ghost.position.x = player.position.x;
    console.log(ghost.position.y);
    boardHelper({
      newboard,
      player: ghost,
      operation: "color",
      operationValue: "rgba(255,255,255,0.7)",
    });
  }
  boardHelper({
    newboard,
    player,
    operation: "color",
    operationValue: player.color,
  });
  return newboard;
};
