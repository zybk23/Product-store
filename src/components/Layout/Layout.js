import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import FilterMenu from "./FilterMenu";
import ProductCard from "./ProductCard";
import { setSelectedSortBy } from "../../store/filterStore";

const Layout = () => {
  const dispatch = useDispatch();
  const { sortBy, selectedSortBy } = useSelector((state) => state.filterSlice);
  const searchValue = useSelector((state) => state.searchSlice.searchValue);

  const handleChangeSelected = (e) => {
    const findObj = sortBy.find((item) => item.id === Number(e.target.value));
    dispatch(setSelectedSortBy(findObj));
  };

  return (
    <StyledLayoutContainer>
      <StyledLayoutTopBarContainer>
        <StyledTopBarInfoContainer>
          <StyledInfoProductName>İPhone İOS cep telefonu</StyledInfoProductName>
          <StyledInfoKeyContainer>
            <StyledKeyText>Aranan Kelime : </StyledKeyText>
            <StyledSearchText data-testid="searchedText">
              {searchValue}
            </StyledSearchText>
          </StyledInfoKeyContainer>
        </StyledTopBarInfoContainer>
        <StyledSelectBox
          value={selectedSortBy.id ? selectedSortBy.id : 0}
          onChange={handleChangeSelected}
        >
          <StyledOption value={0} disabled hidden>
            Sıralama
          </StyledOption>
          {sortBy.map((item) => (
            <StyledOption
              data-testid={"selectOptionText"}
              key={item.id}
              value={item.id}
            >
              {item.name}
            </StyledOption>
          ))}
        </StyledSelectBox>
      </StyledLayoutTopBarContainer>
      <StyledLayoutContentContainer>
        <FilterMenu />
        <ProductCard />
      </StyledLayoutContentContainer>
    </StyledLayoutContainer>
  );
};

const StyledLayoutContainer = styled.div`
  width: 100%;
  padding: 0 80px;
  display: flex;
  flex-direction: column;
  margin-bottom: 300px;
  @media (max-width: 1280px) {
    padding: 0 40px;
  }
  @media (max-width: 686px) {
    padding: 0 20px;
  }
`;

const StyledLayoutTopBarContainer = styled.div`
  width: 100%;
  height: 88px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const StyledTopBarInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledInfoProductName = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 100%;
  color: #484848;
  @media (max-width: 468px) {
    font-size: 20px;
  }
`;

const StyledInfoKeyContainer = styled(StyledTopBarInfoContainer)`
  flex-direction: row;
`;

const StyledKeyText = styled(StyledInfoProductName)`
  font-size: 15px;
  font-weight: normal;
  margin-bottom: 4px;
  color: #b0b0b0;
`;
const StyledSearchText = styled(StyledInfoProductName)`
  font-size: 15px;
`;

const StyledSelectBox = styled.select`
  width: 120px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b4b4bb;
  border-radius: 4px;
  padding: 4px;
  outline: none;
`;
const StyledOption = styled.option`
  width: 274px;
  height: 152px;
  background-color: #484848;
`;

const StyledLayoutContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export default Layout;
