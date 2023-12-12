import { useContext } from "react";
import GameBoardComponent from "./components/GameBoardComponent";
import Main from "./components/Main";
import { AppContext } from "./store/context";

function App() {
  const ctx = useContext(AppContext);

  return <>{ctx.enterGameBoard ? <GameBoardComponent /> : <Main />}</>;
}

export default App;
