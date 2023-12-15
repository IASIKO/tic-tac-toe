import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const defaultArr = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [enterGameBoard, setenterGameBoard] = useState(false);
  const [isX, setIsX] = useState(true);
  const [enterCpuGame, setEnterCpuGame] = useState(false);
  const [enterPlayerGame, setEnterPlayerGame] = useState(false);
  const [tiles, setTiles] = useState(defaultArr);
  const [playerTurn, setPlayerTurn] = useState("X");
  const [isModal, setIsModal] = useState(false);
  const [restarted, setRestarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [scoreT, setScoreT] = useState(0);
  const [winComb, setWinComb] = useState(null);

  const contextValue = {
    enterGameBoard,
    setenterGameBoard,
    isX,
    setIsX,
    enterCpuGame,
    setEnterCpuGame,
    enterPlayerGame,
    setEnterPlayerGame,
    tiles,
    setTiles,
    playerTurn,
    setPlayerTurn,
    defaultArr,
    restarted,
    setRestarted,
    isModal,
    setIsModal,
    winner,
    setWinner,
    scoreX,
    setScoreX,
    scoreO,
    setScoreO,
    scoreT,
    setScoreT,
    winComb,
    setWinComb,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
