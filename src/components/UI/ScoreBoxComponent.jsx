import React from "react";
import styled from "styled-components";

const ScoreText = styled.p`
  color: #1a2a33;
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.88px;
`;

const Score = styled.p`
  color: #1a2a33;
  text-align: center;
  text-transform: uppercase;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 1.5px;
`;

const ScoreBoxComponent = ({ children }) => {
  return (
    <>
      <ScoreText>{children}</ScoreText>
      <Score>0</Score>
    </>
  );
};

export default ScoreBoxComponent;
