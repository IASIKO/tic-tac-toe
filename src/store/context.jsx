import { createContext, useState } from "react";

export const AppContext = createContext();

const ContextProvider = (props) => {
  const [enterGame, setenterGame] = useState(null);
  const [isX, setIsX] = useState(true);

  const contextValue = {
    enterGame,
    setenterGame,
    isX,
    setIsX,
  };
  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
