import React, { useContext } from "react";
import logo from "../assets/logo.svg";
import styled from "styled-components";
import SignBoxComponent from "./UI/SignBoxComponent";
import { AppContext } from "../store/context";

const ManuBox = styled.div`
  width: 460px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PickPlayerBox = styled.div`
  background-color: #1f3641;
  border-radius: 15px;
  box-shadow: inset 0 -8px 0 #10212a;
  margin: 30px 0;
  padding: 25px 25px 30px;
  text-align: center;
  width: 100%;
`;

const PickPlayerText = styled.p`
  color: #a8bfc9;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const PlayerSignBox = styled.div`
  background-color: #1a2a33;
  border-radius: 1rem;
  display: flex;
  margin: 20px 0;
  padding: 10px;
`;

const RememberText = styled.p`
  color: #a8bfc9;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.8px;
  opacity: 0.5;
  text-transform: uppercase;
`;

const ButtonGameCPU = styled.button`
  background-color: #f2b137;
  box-shadow: inset 0 -8px 0 #cc8b13;
  margin-bottom: 18px;
  color: #1a2a33;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1.25px;
  padding: 20px 0 25px;
  text-align: center;
  width: 100%;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #ffc860;
  }
  transition: all 0.2s;
`;

const ButtonGamePlayer = styled.button`
  background-color: #31c3bd;
  box-shadow: inset 0 -8px 0 #118c87;
  margin-bottom: 18px;
  color: #1a2a33;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 1.25px;
  padding: 20px 0 25px;
  text-align: center;
  width: 100%;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  &:hover {
    background-color: #65e9e4;
  }
  transition: all 0.2s;
`;

const Main = () => {
  const ctx = useContext(AppContext);

  return (
    <ManuBox>
      <img src={logo} alt="logo" />
      <PickPlayerBox>
        <PickPlayerText>pick player 1's mark</PickPlayerText>
        <PlayerSignBox>
          <SignBoxComponent />
        </PlayerSignBox>
        <RememberText>Remembr: x goes first</RememberText>
      </PickPlayerBox>
      <ButtonGameCPU
        onClick={() => {
          ctx.setEnterCpuGame(true);
          ctx.setenterGameBoard(true);
        }}
      >
        NEW GAME (VS CPU)
      </ButtonGameCPU>
      <ButtonGamePlayer
        onClick={() => {
          ctx.setEnterPlayerGame(true)
          ctx.setenterGameBoard(true);
        }}
      >
        NEW GAME (VS PLAYER)
      </ButtonGamePlayer>
    </ManuBox>
  );
};

export default Main;
