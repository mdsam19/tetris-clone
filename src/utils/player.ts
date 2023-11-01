import { GameBoardDimension, previewBoardDimension } from "./Board";
import { randomTetromino } from "./tetromino";
import { boardType, playerType } from "./types";

export const setInitialPreviewBoardPlayerPosition = (player: playerType) => {
  const { boardWidth, boardHeight } = previewBoardDimension;
  const shape = player.shapes[0];
  player.position.x = Math.floor((boardWidth - shape[0].length) / 2);
  player.position.y = Math.floor((boardHeight - shape.length) / 2);
};

export const setInitialBoardPlayerPosition = (player: playerType) => {
  const shape = player.shapes[0];
  const { boardWidth } = GameBoardDimension;
  player.position.y = 0;
  player.position.x = Math.floor((boardWidth - shape[0].length) / 2);
  if (shape.length === 4) player.position.y = -1;
};

export const defaultDropTime = 500;

export const dropPosition = ({
  board,
  player,
}: {
  board: boardType;
  player: playerType;
}) => {
  const shape = player.shapes[player.index];
  const pos = { x: player.position.x, y: player.position.y };
  for (let ver = pos.y; ver < board.length; ver++) {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        const block = shape[y][x];
        const boardY = ver + y;
        const boardX = x + pos.x;
        if (block && board[boardY][boardX].occupied) return ver - 1;
        else if (block && boardY === board.length - 1) return ver;
      }
    }
  }
  return pos.y;
};

export const dropPlayer = ({
  currentPlayer,
  setCurrentPlayer,
  currentPlayerRef,
  board,
  runningSideEffect,
  upComingPlayer,
  setUpComingPlayer,
  setGameOver,
  setDropTime,
}: {
  currentPlayer: playerType;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<playerType>>;
  currentPlayerRef: React.MutableRefObject<playerType | null>;
  board: boardType;
  runningSideEffect: React.MutableRefObject<boolean>;
  setUpComingPlayer: React.Dispatch<React.SetStateAction<playerType>>;
  upComingPlayer: playerType;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setDropTime: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  runningSideEffect.current = true;
  const shape = currentPlayer.shapes[currentPlayer.index];
  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[0].length; x++) {
      const blockPosY = currentPlayer.position.y + y + 1;
      const blockPosX = currentPlayer.position.x + x;
      const block = shape[y][x];
      if (
        block &&
        (blockPosY >= board.length || board[blockPosY][blockPosX].occupied)
      ) {
        setCurrentPlayer((prev) => {
          currentPlayerRef.current = { ...prev };
          currentPlayerRef.current.collided = true;
          const nextplayer = { ...upComingPlayer };
          nextplayer.position = { ...nextplayer.position };
          setInitialBoardPlayerPosition(nextplayer);
          const shape = nextplayer.shapes[nextplayer.index];
          for (let y = 0; y < shape.length; y++) {
            for (let x = 0; x < shape[0].length; x++) {
              const blockPosX = nextplayer.position.x + x;
              const blockPosY = nextplayer.position.y + y;
              const block = shape[y][x];
              if (block && board[blockPosY][blockPosX].occupied) {
                setGameOver(true);
                setDropTime(null);
              }
            }
          }
          return nextplayer;
        });
        setUpComingPlayer(() => {
          const player = randomTetromino();
          setInitialPreviewBoardPlayerPosition(player);
          return player;
        });
        return;
      }
    }
  }
  setCurrentPlayer((prev) => {
    currentPlayerRef.current = prev;
    const player = { ...prev };
    player.position = { ...prev.position };
    player.position.y += 1;
    return player;
  });
};

export const attemptRotate = ({
  timeRef,
  currentPlayer,
  setCurrentPlayer,
  currentPlayerRef,
  board,
  runningSideEffect,
}: {
  timeRef: React.MutableRefObject<number>;
  currentPlayer: playerType;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<playerType>>;
  currentPlayerRef: React.MutableRefObject<playerType | null>;
  board: boardType;
  runningSideEffect: React.MutableRefObject<boolean>;
}) => {
  if (!(Date.now() - timeRef.current <= 500)) return;
  timeRef.current = Date.now();
  let newIndex = currentPlayer.index + 1;
  if (newIndex >= currentPlayer.shapes.length) newIndex = 0;
  const newShape = currentPlayer.shapes[newIndex];
  for (let y = 0; y < newShape.length; y++) {
    for (let x = 0; x < newShape[0].length; x++) {
      const blockPosY = currentPlayer.position.y + y;
      const blockPosX = currentPlayer.position.x + x;
      const block = newShape[y][x];
      if (
        block &&
        (blockPosX >= board[0].length ||
          blockPosY >= board.length ||
          blockPosX < 0 ||
          blockPosY < 0)
      )
        return;
      if (block && board[blockPosY][blockPosX].occupied) return;
    }
  }
  runningSideEffect.current = true;
  setCurrentPlayer((prev) => {
    currentPlayerRef.current = prev;
    const newPlayer = { ...prev };
    newPlayer.index = newIndex;
    return newPlayer;
  });
};

export const attemptMove = ({
  timeRef,
  currentPlayer,
  setCurrentPlayer,
  currentPlayerRef,
  board,
  runningSideEffect,
  touchPositionRef,
  posX,
  posY,
  upComingPlayer,
  setUpComingPlayer,
  setGameOver,
  setDropTime,
  boardpx,
}: {
  timeRef: React.MutableRefObject<number>;
  currentPlayer: playerType;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<playerType>>;
  currentPlayerRef: React.MutableRefObject<playerType | null>;
  board: boardType;
  runningSideEffect: React.MutableRefObject<boolean>;
  touchPositionRef: React.MutableRefObject<{ x: number; y: number }>;
  posX: number;
  posY: number;
  setUpComingPlayer: React.Dispatch<React.SetStateAction<playerType>>;
  upComingPlayer: playerType;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setDropTime: React.Dispatch<React.SetStateAction<number | null>>;
  boardpx: { x: number; y: number };
  swipeDownRef: React.MutableRefObject<number>;
}) => {
  const difX = posX - touchPositionRef.current.x;
  const difY = posY - touchPositionRef.current.y;
  const dy = boardpx.y / board.length;
  const dx = boardpx.x / board[0].length;
  if (Math.abs(difX) >= dx) {
    timeRef.current = 0;
    touchPositionRef.current.x = posX;
    touchPositionRef.current.y = posY;
    const shape = currentPlayer.shapes[currentPlayer.index];
    let inc = 1;
    if (difX < 0) inc = -1;
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[0].length; x++) {
        const blockPosY = currentPlayer.position.y + y;
        const blockPosX = currentPlayer.position.x + x + inc;
        const block = shape[y][x];
        if (block && (blockPosX >= board[0].length || blockPosX < 0)) return;
        if (block && board[blockPosY][blockPosX].occupied) return;
      }
    }
    runningSideEffect.current = true;
    setCurrentPlayer((prev) => {
      currentPlayerRef.current = prev;
      const newPlayer = { ...prev };
      newPlayer.position = { ...newPlayer.position };
      newPlayer.position.x += inc;
      return newPlayer;
    });
  } else if (difY >= dy) {
    timeRef.current = 0;
    touchPositionRef.current.x = posX;
    touchPositionRef.current.y = posY;
    dropPlayer({
      currentPlayer,
      currentPlayerRef,
      setCurrentPlayer,
      board,
      upComingPlayer,
      setUpComingPlayer,
      runningSideEffect,
      setGameOver,
      setDropTime,
    });
  } else if (difY >= dy * 4) {
  }
};
