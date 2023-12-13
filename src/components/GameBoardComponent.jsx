import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import logo from "../assets/logo.svg";
import ScoreBoxComponent from "./UI/ScoreBoxComponent";
import oFrame from "../assets/oFrame.svg";
import oYellow from "../assets/oYellow.svg";
import xFrame from "../assets/xFrame.svg";
import xGreen from "../assets/xGreen.svg";
import { AppContext } from "../store/context";

const GameBoard = styled.div`
  grid-gap: 20px;
  align-items: center;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(3, 140px);
  justify-items: center;
`;

const PlayerTurnBox = styled.div`
  align-items: center;
  background-color: #1f3641;
  border-radius: 10px;
  box-shadow: inset 0 -4px 0 #10212a;
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 14px 0 18px;
  width: 100%;
`;

const PlayerTurnText = styled.p`
  color: #a8bfc9;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const ButtonRestart = styled.div`
  background-color: #a8bfc9;
  border-radius: 10px;
  box-shadow: inset 0 -4px 0 #6b8997;
  cursor: pointer;
  justify-self: end;
  padding: 14px;
  transition: all 0.2s;
`;

const MarkBox = styled.div`
  align-items: center;
  background-color: #1f3641;
  border-radius: 15px;
  box-shadow: inset 0 -8px 0 #10212a;
  cursor: pointer;
  display: flex;
  height: 140px;
  width: 140px;
  justify-content: center;
`;
const Thumb = styled.img`
  display: none;

  ${MarkBox}:hover & {
    display: flex;
  }
`;

const XscoreBox = styled.div`
  background-color: #31c3bd;
  border-radius: 15px;
  padding: 12px 0;
  width: 100%;
`;

const TiesScoreBox = styled.div`
  background-color: #a8bfc9;
  border-radius: 15px;
  padding: 12px 0;
  width: 100%;
`;

const OscoreBox = styled.div`
  background-color: #f2b137;
  border-radius: 15px;
  padding: 12px 0;
  width: 100%;
`;

const defaultArr = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const GameBoardComponent = () => {
  const ctx = useContext(AppContext);

  const [tiles, setTiles] = useState(defaultArr);
  const [playerTurn, setPlayerTurn] = useState("X");

  const handleTileClick = (x, y) => {
    if (tiles[x][y] !== null) {
      return;
    }

    const newArr = [...tiles];
    newArr[x][y] = playerTurn;
    setTiles(newArr);
    if (playerTurn === "X") {
      setPlayerTurn("O");
    } else {
      setPlayerTurn("X");
    }
  };

  useEffect(() => {
    const signsArr = ["X", "O"];

    signsArr.forEach((sign) => {
      tiles.forEach((tile, x) => {
        if (tile.every((memb) => memb == sign)) {
          console.log("win");
        }
      });

      let yTiles = [];

      for (let a = 0; a < tiles[0].length; a++) {
        yTiles[a] = [];
        for (let b = 0; b < tiles[0].length; b++) {
          yTiles[a][b] = tiles[b][a];
        }
      }
      yTiles.forEach((tile, x) => {
        if (tile.every((memb) => memb == sign)) {
          console.log("win y");
        }
      });
    });
  }, [tiles]);

  return (
    <GameBoard>
      <img src={logo} alt="logo" style={{ justifySelf: "start" }} />
      <PlayerTurnBox>
        <svg
          viewBox="0.27 0.27 63.46 63.46"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* {isX ? ( */}
          <path
            fill="#a8bfc9"
            d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
          ></path>
          {/* ) : (
            <path
              fill="#a8bfc9"
              d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
            ></path>
          )} */}
        </svg>
        <PlayerTurnText>turn</PlayerTurnText>
      </PlayerTurnBox>
      <ButtonRestart onClick={() => ctx.setRestarted(true)}>
        <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="#1f3641"
            d="M19.524 0h-1.88a.476.476 0 0 0-.476.499l.159 3.284A9.81 9.81 0 0 0 9.835.317C4.415.317-.004 4.743 0 10.167.004 15.597 4.406 20 9.835 20a9.796 9.796 0 0 0 6.59-2.536.476.476 0 0 0 .019-.692l-1.348-1.349a.476.476 0 0 0-.65-.022 6.976 6.976 0 0 1-9.85-.63 6.987 6.987 0 0 1 .63-9.857 6.976 6.976 0 0 1 10.403 1.348l-4.027-.193a.476.476 0 0 0-.498.476v1.881c0 .263.213.476.476.476h7.944A.476.476 0 0 0 20 8.426V.476A.476.476 0 0 0 19.524 0Z"
          ></path>
        </svg>
      </ButtonRestart>
      {tiles.map((box, x) =>
        box.map((_, y) => (
          <MarkBox onClick={() => handleTileClick(x, y)} key={y}>
            {tiles[x][y] !== null ? (
              tiles[x][y] === "X" ? (
                <img src={xGreen} alt="x sign green" />
              ) : (
                <img src={oYellow} alt="x sign green" />
              )
            ) : playerTurn == "X" ? (
              <Thumb src={xFrame} alt="x sign frame"></Thumb>
            ) : (
              <Thumb src={oFrame} alt="0 sign frame"></Thumb>
            )}
          </MarkBox>
        ))
      )}
      <XscoreBox>
        <ScoreBoxComponent>
          {ctx.enterCpuGame ? "x (you)" : "x (p1)"}
        </ScoreBoxComponent>
      </XscoreBox>
      <TiesScoreBox>
        <ScoreBoxComponent>ties</ScoreBoxComponent>
      </TiesScoreBox>
      <OscoreBox>
        <ScoreBoxComponent>
          {ctx.enterCpuGame ? "o (cpu)" : "x (p2)"}
        </ScoreBoxComponent>
      </OscoreBox>
    </GameBoard>
  );
};

export default GameBoardComponent;
