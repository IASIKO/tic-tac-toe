import React from "react";
import styled from "styled-components";

const AttrBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const AttrText = styled.p`
  color: #31c3bd;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.8px;
`;

const AttrLink = styled.a`
  color: #f2b137;
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.8px;
  text-decoration: none;
`;

const Attribution = () => {
  return (
    <AttrBox>
      <AttrText>
        Coded by
        <AttrLink
          href="https://www.linkedin.com/in/giorgi-iaseshvili/"
          target="_blank"
          className="text-primary-key-bg3-toggle"
        >
          {" "}
          Giorgi Iaseshvili
        </AttrLink>
      </AttrText>
    </AttrBox>
  );
};

export default Attribution;
