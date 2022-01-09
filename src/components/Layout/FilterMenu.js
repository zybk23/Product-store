import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import {
  setColorsAndBrands,
  setSelectedBrand,
  setSelectedColor,
  setSelectedSortBy,
} from "../../store/filterStore";

const FilterMenu = () => {
  const dispatch = useDispatch();

  const {
    colors,
    brands,
    sortBy,
    selectedColor,
    selectedBrand,
    selectedSortBy,
  } = useSelector((state) => state.filterSlice);

  const handleChangeSelectedColor = (data) => {
    dispatch(setSelectedColor(data));
  };

  const handleChangeSelectedBrand = (data) => {
    dispatch(setSelectedBrand(data));
  };

  const handleChangeSelectedSortBy = (data) => {
    dispatch(setSelectedSortBy(data));
  };

  useEffect(() => {
    dispatch(setColorsAndBrands());
  }, []);

  return (
    <StyledFilterMenuContainer>
      <StyledTitle margintop={"24px"}>Renk</StyledTitle>
      {colors.map((x, index) => (
        <StyledTextContainer
          onClick={() => handleChangeSelectedColor(x)}
          key={index}
        >
          <StyledText
            data-testid="colorName"
            color={selectedColor.id === x.id ? "#ff6000" : "#646464"}
          >
            {x.name}
          </StyledText>
          <StyledCount
            data-testid="colorCount"
            color={selectedColor.id === x.id ? "#ff6000" : "#646464"}
          >
            ({x.count})
          </StyledCount>
        </StyledTextContainer>
      ))}
      <StyledTitle margintop={"24px"}>Sıralama</StyledTitle>
      {sortBy.map((x, index) => (
        <StyledText
          data-testid="alignmentText"
          onClick={() => handleChangeSelectedSortBy(x)}
          key={index}
          color={selectedSortBy.id === x.id ? "#ff6000" : "#646464"}
        >
          {x.name}
        </StyledText>
      ))}
      <StyledTitle margintop={"24px"}>Marka</StyledTitle>
      {brands.map((x, index) => (
        <StyledText
          onClick={() => handleChangeSelectedBrand(x)}
          key={index}
          color={selectedBrand.id === x.id ? "#ff6000" : "#646464"}
        >
          {x.name + ` (${x.count})`}
        </StyledText>
      ))}
    </StyledFilterMenuContainer>
  );
};

const StyledFilterMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 20%;
  height: 400px;
  @media (max-width: 600px) {
    width: 50%;
  }
`;

const StyledTitle = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  color: #484848;
  margin-top: ${(p) => p.margintop};
  margin-bottom: 20px;
`;

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  &:hover {
    color: #ff6000;
  }
`;

const StyledText = styled(StyledTitle)`
  font-size: 14px;
  font-weight: 300;
  color: ${(p) => p.color};
  margin-bottom: 0;
  cursor: pointer;
`;

const StyledCount = styled(StyledText)`
  margin-left: 2px;
`;

export default React.memo(FilterMenu);
