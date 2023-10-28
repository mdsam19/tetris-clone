import "./index.css";
import { boardType, playerType, statsType } from "../../utils/types";
import { reset } from "../../utils/reset";

const GameOver = ({
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
  score,
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
  score: number;
}) => {
  const handleReset = () => {
    reset({
      setBoard,
      setPlayer,
      setUpComingPlayer,
      setStats,
      setDropTime,
      currentPlayerRef,
      setGameOver,
      runningSideEffect,
      tempLines,
      levelRef,
    });
  };
  if (score > parseInt(localStorage.getItem("hiScore")!))
    localStorage.setItem("hiScore", score.toString());
  const hiScore = localStorage.getItem("hiScore");
  return (
    <div className="gameOver">
      <div>GameOver</div>
      <div className="scorebox">
        <div className="score">
          <div>Score</div>
          <div className="text">{score}</div>
        </div>
        <div className="score">
          <div>Hi-Score</div>
          <div className="text">{hiScore}</div>
        </div>
      </div>
      <button className="gameOverbtn" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default GameOver;
