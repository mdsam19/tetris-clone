import { useState } from "react";

export const useGameOver = () => {
  const [gameOver, setGameOver] = useState(false);
  return { gameOver, setGameOver };
};
