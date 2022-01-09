import React from "react";
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

const ModalDialog = ({
  handleCloseDialog,
  handleRemoveProductFromCart,
  Modal,
}) => {
  const { selectedProductToRemove } = useSelector((state) => state.cartSlice);

  const handleRemove = () => {
    handleRemoveProductFromCart(selectedProductToRemove);
    handleCloseDialog();
  };

  return (
    <Modal>
      <StyledModalContainer>
        <StyledModalTitle>
          Ürünü silmek istediğinize emin misiniz?
        </StyledModalTitle>
        <StyledModalContent>
          {" "}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos ad ullam
          expedita. Ipsum illum vitae tempora, laboriosam, laborum commodi
          corporis doloremque rem sequi, veritatis odio obcaecati ipsa aliquam
          ullam repudiandae.{" "}
        </StyledModalContent>
        <StyledModalButtonContainer>
          <StyledModalButton
            data-testid="clickRemoveBtn"
            onClick={handleRemove}
            backgroundcolor="#90D659"
          >
            EVET
          </StyledModalButton>
          <StyledModalButton
            onClick={handleCloseDialog}
            backgroundcolor="#D65959"
          >
            HAYIR
          </StyledModalButton>
        </StyledModalButtonContainer>
      </StyledModalContainer>
    </Modal>
  );
};

const StyledModalContainer = styled.div`
  width: 400px;
  height: 260px;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StyledModalTitle = styled.p`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 100%;
  color: #484848;
  padding-left: 20px;
  border-bottom: 1px solid #cdcdcd;
`;

const StyledModalContent = styled(StyledModalTitle)`
  height: auto;
  font-size: 12px;
  line-height: 140%;
  max-width: 342px;
  font-weight: normal;
  border-bottom: none;
`;

const StyledModalButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row,
  align-items: center;
  justify-content: flex-end;
  padding-right:10px ;
  margin-bottom: 25px;
`;

const StyledModalButton = styled.button`
  width: 70px;
  height: 26px;
  background-color: ${(p) => p.backgroundcolor};
  color: #ffffff;
  border-radius: 4px;
  margin-right: 10px;
  cursor: pointer;
  border: none;
`;

export default React.memo(ModalDialog);
