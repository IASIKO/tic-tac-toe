import { useState } from "react";
import GameBoardComponent from "./components/GameBoardComponent";
import Main from "./components/Main";

function App() {
  const [enterGame, setenterGame] = useState(null);
  const [isX, setIsX] = useState(true);

  return (
    <>
      {enterGame == null ? (
        <Main setenterGame={setenterGame} isX={isX} setIsX={setIsX} />
      ) : (
        <GameBoardComponent enterGame={enterGame} isX={isX} />
      )}
    </>
  );
}

export default App;
