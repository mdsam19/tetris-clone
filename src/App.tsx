import { useState } from "react";
import Tetris from "./components/tetris";
import StartPage from "./components/startPage";
import { GameBoardDimension } from "./utils/Board";

const App = () => {
  const [startGame, setStartGame] = useState(false);
  const { boardWidth, boardHeight } = GameBoardDimension;
  return (
    <>
      {startGame ? (
        <Tetris boardWidth={boardWidth} boardHeight={boardHeight} />
      ) : (
        <StartPage startGame={setStartGame} />
      )}
    </>
  );
};

export default App;
