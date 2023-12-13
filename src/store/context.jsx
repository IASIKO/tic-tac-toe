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
  const [restarted, setRestarted] = useState(false);
  const [tiles, setTiles] = useState(defaultArr);
  const [playerTurn, setPlayerTurn] = useState("X");

  const contextValue = {
    enterGameBoard,
    setenterGameBoard,
    isX,
    setIsX,
    enterCpuGame,
    setEnterCpuGame,
    enterPlayerGame,
    setEnterPlayerGame,
    restarted,
    setRestarted,
    tiles,
    setTiles,
    playerTurn,
    setPlayerTurn,
    defaultArr,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
