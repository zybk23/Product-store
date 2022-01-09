import React from "react";
import styled from "@emotion/styled";

const Alert = ({ text }) => {
  return (
    <StyledAlertContainer>
      <StyledAlertText>{text}</StyledAlertText>
    </StyledAlertContainer>
  );
};

const StyledAlertContainer = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff4e5;
  border-radius: 16px;
`;

const StyledAlertText = styled.p`
  font-family: "Inter var", Roboto, Helvetica, Arial, sans-serif;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #484848;
  padding-left: 16px;
`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  margin-left: 12px;
`;

export default React.memo(Alert);
