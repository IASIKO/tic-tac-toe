import React, { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "../store/context";
import xGreen from "../assets/xGreen.svg";
import oYellow from "../assets/oYellow.svg";

const ModalWindow = styled.div`
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
  z-index: 10;
`;
const ModalTextBox = styled.div`
  background-color: rgba(31, 54, 65, 0.9);
  margin-top: 35vh;
  padding: 40px;
  position: relative;
  text-align: center;
  z-index: 10;
`;

const ModalBackGround = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
  width: 100vw;
`;

const ModalRestartText = styled.p`
  color: #a8bfc9;
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 2.5px;
  margin-bottom: 30px;
  text-transform: uppercase;
`;

const GreyButton = styled.button`
  border-radius: 10px;
  color: #1a2a33;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 15px;
  background-color: #a8bfc9;
  box-shadow: inset 0 -4px 0 #6b8997;
  margin-right: 15px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #dbe8ed;
  }
  transition: all 0.2s;
`;

const YellowButton = styled.button`
  border-radius: 10px;
  color: #1a2a33;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 15px;
  background-color: #f2b137;
  box-shadow: inset 0 -4px 0 #cc8b13;
  margin-right: 15px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #ffc860;
  }
  transition: all 0.2s;
`;

const ModalResultText = styled.p`
  color: #a8bfc9;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  text-align: center;
  text-transform: uppercase;
`;

const ModalWinnerBox = styled.div`
  align-items: center;
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 15px 0 20px;
`;

const ModalTieText = styled.p`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: #a8bfc9;
`;
const ModalWinnerText = styled.p`
  font-size: 40px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: ${(props) => (props.$primary ? "#31c3bd" : "#ffc860")};
`;

const WinnerImg = styled.img`
  display: block;
`;

const Modal = () => {
  const ctx = useContext(AppContext);

  const newGameFunc = () => {
    ctx.setIsModal(false);
    ctx.setTiles(ctx.defaultArr);
    ctx.setPlayerTurn("X");
    ctx.setIsX(true);
  };

  const resetScore = () => {
    ctx.setScoreX(0);
    ctx.setScoreO(0);
    ctx.setScoreT(0);
  };

  return (
    <ModalWindow>
      <ModalTextBox>
        {ctx.restarted ? (
          <>
            <ModalRestartText>Restart game?</ModalRestartText>
            <GreyButton
              onClick={() => {
                ctx.setRestarted(false);
                ctx.setIsModal(false);
              }}
            >
              NO, CANCEL
            </GreyButton>
            <YellowButton
              onClick={() => {
                ctx.setRestarted(false);
                newGameFunc();
              }}
            >
              YES, RESTART
            </YellowButton>
          </>
        ) : (
          <>
            <ModalResultText>
              {ctx.winner !== "T" &&
                `player ${ctx.winner === "X" ? 1 : 2} wins!`}
            </ModalResultText>
            <ModalWinnerBox>
              {ctx.winner === "X" && <WinnerImg src={xGreen} />}
              {ctx.winner === "O" && <WinnerImg src={oYellow} />}
              {ctx.winner === "T" ? (
                <ModalTieText>ROUND TIED</ModalTieText>
              ) : (
                <ModalWinnerText $primary={ctx.winner === "X"}>
                  takes the round
                </ModalWinnerText>
              )}
            </ModalWinnerBox>
            <GreyButton
              onClick={() => {
                ctx.setenterGameBoard(false);
                resetScore();
                newGameFunc();
              }}
            >
              QUIT
            </GreyButton>
            <YellowButton
              onClick={() => {
                newGameFunc();
              }}
            >
              NEXT ROUND
            </YellowButton>
          </>
        )}
      </ModalTextBox>
      <ModalBackGround></ModalBackGround>
    </ModalWindow>
  );
};

export default Modal;
