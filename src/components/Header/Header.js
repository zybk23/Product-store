import React from "react";
import styled from "@emotion/styled";
import Search from "./Search";
import Cart from "./Cart";
import HepsiIcon from "../../assets/images/hepsiIcon.png";

const Header = () => {
  return (
    <HeaderContainer>
      <StyledBrandIcon src={HepsiIcon} width="auto" height="auto" alt="" />
      <Search />
      <Cart />
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  width: 100%;
  height: 96px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 80px;
  border-bottom: 1px solid #b0b0b0;
  position: relative;
  @media (max-width: 1280px) {
    padding: 0 40px;
  }
  @media (max-width: 686px) {
    padding: 0 20px;
  }
`;

const StyledBrandIcon = styled.img`
  width: auto;
  height: auto;
  @media (max-width: 686px) {
    display: none;
  }
`;

export default React.memo(Header);
