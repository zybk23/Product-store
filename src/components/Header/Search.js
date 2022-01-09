import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { setSearchValue } from "../../store/searchStore";

const Search = () => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");

  const { searchValue } = useSelector((state) => state.searchSlice);
  const handleChangeSearchValue = (e) => {
    // dispatch(setSearchValue(e.target.value));
    setSearch(e.target.value);
  };
  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      dispatch(setSearchValue(search));
    }
  };

  return (
    <StyledSearchContainer>
      <img src={require("../../assets/images/search.png")} alt="" />
      <StyledSearchInput
        data-testid="searchInput"
        value={search}
        onChange={handleChangeSearchValue}
        onKeyPress={handleEnterSearch}
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
