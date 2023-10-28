import "./index.css";
import { boardType } from "../../utils/types";
import BoardCell from "../boardcell";
import { memo } from "react";

const Preview = ({ preview }: { preview: boardType }) => {
  return (
    <div className="preview">
      {preview.map((row, y) =>
        row.map((cell, x) => <BoardCell key={`${x}${y}prev`} cell={cell} />),
      )}
    </div>
  );
};

export default memo(Preview);
