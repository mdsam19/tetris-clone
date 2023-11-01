import "./index.css";
import { boardComponentType } from "../../utils/types";
import { useEffect, useRef } from "react";
import BoardCell from "../boardcell";
import { attemptMove, attemptRotate } from "../../utils/player";

const Board = ({
  board,
  currentPlayer,
  upComingPlayer,
  currentPlayerRef,
  setCurrentPlayer,
  setUpComingPlayer,
  runningSideEffect,
  setGameOver,
  setDropTime,
  gameOver,
}: boardComponentType) => {
  const boardpx = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!localStorage.getItem("hiScore")) localStorage.setItem("hiScore", "0");
    const prevent = (e: TouchEvent) => {
      e.preventDefault();
    };
    const boardDiv = boardRef.current;
    boardDiv?.addEventListener("touchmove", prevent, {
      passive: false,
    });
    boardpx.current.x = boardDiv!.clientWidth;
    boardpx.current.y = boardDiv!.clientHeight;
    return () => boardDiv?.removeEventListener("touchmove", prevent);
  }, []);

  const boardStyle = {
    gridTemplateRows: `repeat(${board.length},1fr)`,
    gridTemplateColumns: `repeat(${board[0].length},1fr)`,
  };

  const timeRef = useRef(0);
  const rotateTimeRef = useRef(0);
  const touchPositionRef = useRef({ x: 0, y: 0 });
  const boardRef = useRef<HTMLDivElement>(null);
  const swipeDownRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    timeRef.current = Date.now();
    touchPositionRef.current.x = e.targetTouches[0].clientX;
    touchPositionRef.current.y = e.targetTouches[0].clientY;
    swipeDownRef.current = Date.now();
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!runningSideEffect.current && !gameOver) {
      const posX = e.targetTouches[0].clientX;
      const posY = e.targetTouches[0].clientY;
      attemptMove({
        posX,
        posY,
        timeRef,
        touchPositionRef,
        currentPlayer,
        currentPlayerRef,
        setCurrentPlayer,
        runningSideEffect,
        board,
        setUpComingPlayer,
        upComingPlayer,
        setGameOver,
        setDropTime,
        boardpx: boardpx.current,
        swipeDownRef,
      });
    }
  };

  const handleTouchEnd = () => {
    const dif = Date.now() - rotateTimeRef.current;
    if (!runningSideEffect.current && dif >= 150 && !gameOver) {
      {
        attemptRotate({
          board,
          timeRef,
          currentPlayer,
          currentPlayerRef,
          setCurrentPlayer,
          runningSideEffect,
        });
        rotateTimeRef.current = Date.now();
      }
    }
  };
  return (
    <div
      className="board"
      style={boardStyle}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      ref={boardRef}
    >
      {board.map((row, y) =>
        row.map((cell, x) => <BoardCell key={`${x}${y}`} cell={cell} />),
      )}
    </div>
  );
};

export default Board;
