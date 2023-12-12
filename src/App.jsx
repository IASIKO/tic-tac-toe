import { useContext } from "react";
import GameBoardComponent from "./components/GameBoardComponent";
import Main from "./components/Main";
import { AppContext } from "./store/context";

function App() {
  const ctx = useContext(AppContext);

  return <>{ctx.enterGame == null ? <Main /> : <GameBoardComponent />}</>;
}

export default App;
