import { cellType } from "../../utils/types";
import "./index.css";

const BoardCell = ({ cell }: { cell: cellType }) => {
  const cellStyle = {
    backgroundColor: cell.color,
  };
  return <div className="cell" style={cellStyle}></div>;
};

export default BoardCell;
