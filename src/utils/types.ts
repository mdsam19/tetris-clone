export interface boardDimension {
  boardWidth: number;
  boardHeight: number;
}

export interface cellType {
  color: string;
  occupied: boolean;
}

export type boardType = cellType[][];

export interface playerType {
  shapes: number[][][];
  color: string;
  index: number;
  position: {
    x: number;
    y: number;
  };
  collided: boolean;
  droppingFast: boolean;
}

export interface statsType {
  level: number;
  score: number;
  lines: number;
}

export interface boardHookType {
  boardWidth: number;
  boardHeight: number;
  player: playerType;
  oldPlayerRef: React.MutableRefObject<playerType | null>;
  runningSideEffect: React.MutableRefObject<boolean>;
  setStat: React.Dispatch<React.SetStateAction<statsType>>;
  tempLines: React.MutableRefObject<number>;
}

export interface boardComponentType {
  board: boardType;
  currentPlayer: playerType;
  upComingPlayer: playerType;
  currentPlayerRef: React.MutableRefObject<playerType | null>;
  setCurrentPlayer: React.Dispatch<React.SetStateAction<playerType>>;
  setUpComingPlayer: React.Dispatch<React.SetStateAction<playerType>>;
  runningSideEffect: React.MutableRefObject<boolean>;
  setGameOver: React.Dispatch<React.SetStateAction<boolean>>;
  setDropTime: React.Dispatch<React.SetStateAction<number | null>>;
  gameOver: boolean;
}
