import { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../../store/context";

const SignBox = styled.div`
  background-color: ${(props) => (props.$primary ? "#a8bfc9" : "")};
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  padding: 10px;
  transition: all 0.2s;
  width: 50%;
  &:hover {
    background-color: ${(props) =>
      props.$primary ? "" : "rgba(168,191,201,.05)"};
  }
  &:active {
    scale: 0.96;
  }
`;

const SignBoxComponent = () => {
  const ctx = useContext(AppContext);

  return (
    <>
      <SignBox $primary={ctx.isX} onClick={() => ctx.setIsX(true)}>
        <svg
          viewBox="0.27 0.27 63.46 63.46"
          width="36"
          height="36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={ctx.isX ? "#1a2a33" : "#a8bfc9"}
            d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
          ></path>
        </svg>
      </SignBox>
      <SignBox $primary={!ctx.isX} onClick={() => ctx.setIsX(false)}>
        <svg
          viewBox="0.27 0.27 63.46 63.46"
          width="36"
          height="36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={!ctx.isX ? "#1a2a33" : "#a8bfc9"}
            d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
          ></path>
        </svg>
      </SignBox>
    </>
  );
};

export default SignBoxComponent;
