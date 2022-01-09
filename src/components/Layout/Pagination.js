import React from "react";
import styled from "@emotion/styled";
import ArrowLeft from "../../assets/images/arrowLeft.png";
import ArrowRight from "../../assets/images/arrowRight.png";

const Pagination = ({ currentPage, setCurrentPage, pages }) => {
  const handleClickPrevButton = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleClickNextButton = () => {
    if (currentPage === pages.length) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const handleClickPageNumber = (e) => {
    const id = Number(e.target.id);
    setCurrentPage(id);
  };

  return (
    <StyledPaginationContainer>
      <StyledPaginationItemContainer onClick={handleClickPrevButton}>
        <img src={ArrowLeft} alt="" />
      </StyledPaginationItemContainer>
      {pages.map((item) => (
        <StyledPaginationItemContainer
          id={item}
          onClick={handleClickPageNumber}
          key={item}
          bordercolor={currentPage === item && "#1BA1FB"}
        >
          {item}
        </StyledPaginationItemContainer>
      ))}
      <StyledPaginationItemContainer onClick={handleClickNextButton}>
        <img src={ArrowRight} alt="" />
      </StyledPaginationItemContainer>
    </StyledPaginationContainer>
  );
};

const StyledPaginationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 33px;
  margin-top: 24px;
`;

const StyledPaginationItemContainer = styled.div`
  cursor: pointer;
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 20px;
  color: #646464;
  padding: 5px;
  border-radius: 9px;
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-color: ${(p) => p.bordercolor};
  margin-right: 13.2px;
`;

export default React.memo(Pagination);
