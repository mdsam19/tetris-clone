import "./index.css";

const StartPage = ({
  startGame,
}: {
  startGame: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handlegameStart = () => {
    startGame(true);
  };
  return (
    <div className="startpage">
      <div className="title">
        <p className="word p1">T</p>
        <p className="word p2">E</p>
        <p className="word p3">T</p>
        <p className="word p4">R</p>
        <p className="word p5">I</p>
        <p className="word p6">S</p>
      </div>
      <button className="startbtn" onClick={handlegameStart}>
        START
      </button>
    </div>
  );
};

export default StartPage;
