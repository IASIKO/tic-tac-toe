import { useContext } from "react";
import GameBoardComponent from "./components/GameBoardComponent";
import Main from "./components/Main";
import { AppContext } from "./store/context";
import Modal from "./components/Modal";

function App() {
  const ctx = useContext(AppContext);

  return (
    <>
      {ctx.enterGameBoard ? <GameBoardComponent /> : <Main />}
      {ctx.restarted && <Modal />}
    </>
  );
}

export default App;
