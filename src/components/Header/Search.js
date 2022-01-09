import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { setSearchValue } from "../../store/searchStore";
import SearchIcon from "../../assets/images/search.png";

const Search = () => {
  const dispatch = useDispatch();

  const { searchValue } = useSelector((state) => state.searchSlice);
  const handleChangeSearchValue = (e) => {
    dispatch(setSearchValue(e.target.value));
  };

  return (
    <StyledSearchContainer>
      <img src={SearchIcon} alt="" />
      <StyledSearchInput
        data-testid="searchInput"
        value={searchValue}
        onChange={handleChangeSearchValue}
        placeholder="25 milyon'dan fazla ürün içerisinde ara"
      />
    </StyledSearchContainer>
  );
};

const StyledSearchContainer = styled.div`
  width: 695px;
  height: 48px;
  background-color: #eeeeee;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 15px;
  border-radius: 100px;
  @media (max-width: 1280px) {
    margin: 0px 8px;
  }
  @media (max-width: 876px) {
    width: 395px;
  }
`;

const StyledSearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background-color: transparent;
  margin-left: 12px;
`;

export default React.memo(Search);
