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

const ScoreBoxComponent = ({ children }) => {
  return <ScoreText>{children}</ScoreText>;
};

export default ScoreBoxComponent;
