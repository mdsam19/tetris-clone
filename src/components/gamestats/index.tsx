import { statsType } from "../../utils/types";
import "./index.css";

const GameStat = ({ stats }: { stats: statsType }) => {
  return (
    <div className="stats">
      <div className="box">
        <div>LEVEL</div>
        <div className="value">{stats.level}</div>
      </div>
      <div className="box">
        <div>SCORE</div>
        <div className="value">{stats.score}</div>
      </div>
      <div className="box">
        <div>LINES</div>
        <div className="value">{stats.lines}</div>
      </div>
    </div>
  );
};

export default GameStat;
