import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [enterGameBoard, setenterGameBoard] = useState(false);
  const [isX, setIsX] = useState(true);
  const [enterCpuGame, setEnterCpuGame] = useState(false);
  const [enterPlayerGame, setEnterPlayerGame] = useState(false);
  const [restarted, setRestarted] = useState(false)

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
    setRestarted
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
