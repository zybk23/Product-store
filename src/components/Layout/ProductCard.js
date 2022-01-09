import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import moment from "moment";
import Pagination from "./Pagination";
import { setAddProductToCart } from "../../store/cartStore";
import Alert from "../Header/Alert";

const ProductCard = () => {
  const dispatch = useDispatch();

  const productData = JSON.parse(localStorage.getItem("products"));
  const { selectedColor, selectedBrand, selectedSortBy } = useSelector(
    (state) => state.filterSlice
  );
  const cartProducts = useSelector((state) => state.cartSlice.cartProducts);
  const searchValue = useSelector((state) => state.searchSlice.searchValue);

  const [isHoverProduct, setIsHoverProduct] = useState("");

  let filteredProductData = productData?.length > 0 ? [...productData] : [];

  if (searchValue.length > 2) {
    filteredProductData = filteredProductData.filter((item) => {
      return item.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1;
    });
  }

  if (selectedColor.name) {
    filteredProductData = filteredProductData.filter(
      (product) => product.color === selectedColor?.name
    );
  }

  if (selectedBrand.name) {
    filteredProductData = filteredProductData.filter(
      (product) => product.brand === selectedBrand?.name
    );
  }

  if (selectedSortBy.type === "lowToHigh") {
    filteredProductData = filteredProductData.sort((a, b) => a.price - b.price);
  }

  if (selectedSortBy.type === "highToLow") {
    filteredProductData = filteredProductData.sort((a, b) => b.price - a.price);
  }

  if (selectedSortBy.type === "newToOld") {
    filteredProductData = filteredProductData.sort(
      (a, b) => moment(b.createdDate).unix() - moment(a.createdDate).unix()
    );
  }
  if (selectedSortBy.type === "oldToNew") {
    filteredProductData = filteredProductData.sort(
      (a, b) => moment(a.createdDate).unix() - moment(b.createdDate).unix()
    );
  }

  const handleAddProductToCart = (data) => {
    const modifiedData = { ...data, addedTime: moment(new Date()).format() };
    dispatch(setAddProductToCart(modifiedData));
  };

  const [currentPage, setCurrentPage] = useState(1);

  let itemsPerPage = 12;
  const pages = [];

  for (
    let i = 1;
    i <= Math.ceil(filteredProductData.length / itemsPerPage);
    i++
  ) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentData = filteredProductData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProductData.length]);

  return (
    <React.Fragment>
      {currentData.length > 0 ? (
        <StyledContentContainer>
          <StyledProductsContainer>
            {currentData.map((item) => {
              const isProductExistInCart = cartProducts.some(
                (x) => x.id === item.id
              );
              return (
                <StyledCardContainer
                  data-testid="cardContainer"
                  onMouseEnter={() => setIsHoverProduct(item.id)}
                  onMouseLeave={() => setIsHoverProduct("")}
                  key={item.id}
                >
                  <StyledImageContainer
                    height={item.id === isHoverProduct ? "465px" : "339px"}
                  >
                    <StyledImage src={item.img} />
                    {item.id === isHoverProduct && (
                      <StyledHoverContainer>
                        <StyledProductName>{item.name}</StyledProductName>
                        <StyledAddButton
                          data-testid="addProductToCartBtn"
                          disabled={isProductExistInCart}
                          backgroundcolor={
                            isProductExistInCart ? "#F1F1F1" : "#ffeee3"
                          }
                          color={isProductExistInCart ? "#B0B0B0" : "#ff6000"}
                          onClick={() => handleAddProductToCart(item)}
                        >
                          {isProductExistInCart
                            ? "Bu ürün sepetinizde mevcut."
                            : "Sepete Ekle"}
                        </StyledAddButton>
                      </StyledHoverContainer>
                    )}
                  </StyledImageContainer>
                  {!(item.id === isHoverProduct) && (
                    <StyledProductInfoContainer>
                      <StyledProductName data-testid={"product-name"}>
                        {item.name}
                      </StyledProductName>
                      <StyledContainer margintop="10px">
                        <StyledTitle>Marka : </StyledTitle>
                        <StyledName>{item.brand}</StyledName>
                      </StyledContainer>
                      <StyledContainer
                        data-testid="filteredTotalCount"
                        margintop="2px"
                      >
                        <StyledTitle>Renk : </StyledTitle>
                        <StyledName data-testid={"productColorName"}>
                          {item.color}
                        </StyledName>
                      </StyledContainer>
                      <StyledProductPrice>
                        {item.price + " TL"}
                      </StyledProductPrice>
                      <StyledContainer>
                        <StyledPreviousPrice>
                          {item.previousPrice + " TL"}
                        </StyledPreviousPrice>
                        <StyledDiscountRate>
                          {item.discountRate + "%"}
                        </StyledDiscountRate>
                      </StyledContainer>
                    </StyledProductInfoContainer>
                  )}
                </StyledCardContainer>
              );
            })}
          </StyledProductsContainer>
          {filteredProductData.length > 12 && (
            <Pagination
              productData={filteredProductData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              pages={pages}
            />
          )}
        </StyledContentContainer>
      ) : (
        <Alert text="Seçtiğiniz filtrelere ait ürün bulunmamaktadır." />
      )}
    </React.Fragment>
  );
};

const StyledProductsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`;

const StyledCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  width: 24%;
  height: 465px;
  margin-left: 1%;
  margin-bottom: 18px;
  @media (max-width: 1280px) {
    width: 32.3%;
  }
  @media (max-width: 876px) {
    width: 49%;
  }
  @media (max-width: 600px) {
    width: 99%;
  }
`;
const StyledImageContainer = styled.div`
  width: 100%;
  height: ${(p) => p.height};
  border: 1px solid #e5e5e5;
  padding: 3px 15px;
  border-radius: 8px;
`;

const StyledImage = styled.img`
  width: 100%;
  height: 324px;
`;

const StyledProductInfoContainer = styled.div`
  display: flex;
  height: 126px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 10px;
  margin-top: 9px;
`;

const StyledProductName = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  text-align: left;
  font-size: 12px;
  line-height: 18px;
  height: 32px;
  color: #484848;
  max-width: 230px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${(p) => p.margintop};
`;
const StyledTitle = styled(StyledProductName)`
  font-weight: bold;
  height: 18px;
`;

const StyledName = styled(StyledProductName)`
  max-width: normal;
  height: 18px;
`;

const StyledProductPrice = styled(StyledTitle)`
  font-size: 14px;
  color: #000000;
  margin-top: 13px;
`;

const StyledPreviousPrice = styled(StyledName)`
  color: #9b9b9b;
  text-decoration-line: line-through;
  font-size: 13px;
`;
const StyledDiscountRate = styled(StyledTitle)`
  color: #f90000;
  font-size: 12px;
  margin-left: 3px;
`;

const StyledHoverContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 126px;
`;

const StyledAddButton = styled.button`
  width: 100%;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  color: ${(p) => p.color};
  background-color: ${(p) => p.backgroundcolor};
  border: none;
  margin-bottom: 8px;
`;

const StyledContentContainer = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
`;

export default React.memo(ProductCard);
