import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import moment from "moment";
import { useModal } from "react-hooks-use-modal";
import {
  setRemoveProductFromCart,
  setSelectedProductToRemove,
} from "../../store/cartStore";
import ModalDialog from "./ModalDialog";
import Alert from "./Alert";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartProducts } = useSelector((state) => state.cartSlice);

  const [Modal, open, close] = useModal("root", {
    preventScroll: true,
    closeOnOverlayClick: false,
  });
  const [isCartContentOpen, setIsCartContentOpen] = useState(false);

  let modifiedCartProducts = [...cartProducts];

  modifiedCartProducts = modifiedCartProducts.sort(
    (a, b) => moment(b.addedTime).unix() - moment(a.addedTime).unix()
  );
  const handleChangeIsCartContentOpen = () => {
    setIsCartContentOpen(!isCartContentOpen);
  };

  const handleRemoveProductFromCart = (id) => {
    dispatch(setRemoveProductFromCart(id));
  };

  const handleOpenModal = (id) => {
    dispatch(setSelectedProductToRemove(id));
    open();
  };

  return (
    <>
      <StyledCartContainer
        borderbottom={isCartContentOpen && "none"}
        data-testid="cart"
        onClick={handleChangeIsCartContentOpen}
      >
        <StyledCartText>Sepetim</StyledCartText>
        <StyledProductCount data-testid="cartProductCount">
          {cartProducts.length}
        </StyledProductCount>
      </StyledCartContainer>

      {isCartContentOpen && (
        <CartContentContainer>
          {modifiedCartProducts.length > 0 ? (
            modifiedCartProducts.map((product) => (
              <CartItemContainer key={product.id}>
                <CartImageContainer>
                  <CartProductImage src={product.img}></CartProductImage>
                </CartImageContainer>
                <CartInfoContainer>
                  <CartProductName>{product.name.slice(0, 60)}</CartProductName>
                  <CartRemoveButton
                    data-testid={"removeProductFromCartBtn" + product.id}
                    onClick={() => handleOpenModal(product.id)}
                  >
                    Kaldır
                  </CartRemoveButton>
                </CartInfoContainer>
              </CartItemContainer>
            ))
          ) : (
            <Alert text="Sepetinizde ürün bulunmamaktadır." />
          )}
        </CartContentContainer>
      )}
      <ModalDialog
        handleCloseDialog={close}
        handleRemoveProductFromCart={handleRemoveProductFromCart}
        Modal={Modal}
      />
    </>
  );
};

const StyledCartContainer = styled.div`
  width: 120px;
  height: 48px;
  display: flex;
  cursor: pointer;
  background-color: white;
  align-items: center;
  justify-content: center;
  border-radius: 4px 4px 0 4px;
  position: relative;
  z-index: 1;
  border: 1px solid #b0b0b0;
  border-bottom: ${(p) => p.borderbottom};
`;

const StyledCartText = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 143%;
  color: #b0b0b0;
`;

const StyledProductCount = styled(StyledCartContainer)`
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #ff6000;
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 100%;
  color: #ffffff;
  top: -8px;
  right: -5px;
  z-index: 1;
  border: none;
`;

const CartContentContainer = styled.div`
  width: 360px;
  height: 360px;
  right: 80px;
  top: 70px;
  background-color: #ffffff;
  border: 1px solid #b0b0b0;
  position: absolute;
  border-radius: 4px 0px 4px 4px;
  padding: 21px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  @media (max-width: 1280px) {
    right: 40px;
  }
  @media (max-width: 686px) {
    right: 20px;
  }
`;

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 72px;
  border: none;
  margin-bottom: 20px;
`;
const CartImageContainer = styled(CartItemContainer)`
  width: 54px;
  align-items: center;
  justify-content: center;
  padding: 6px;
  border: 0.4px solid #e5e5e5;
`;
const CartProductImage = styled.img`
  width: 100%;
  height: 100%;
`;

const CartInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
`;

const CartProductName = styled.p`
  font-family: Roboto;
  max-width: 170px;
  text-align: left;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  color: #484848;
`;
const CartRemoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 49px;
  height: 18px;
  background: #ffffff;
  border: 1px solid #f90000;
  border-radius: 4px;
  color: #f90000;
`;

export default React.memo(Cart);
