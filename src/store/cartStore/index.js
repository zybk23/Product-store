import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    selectedProductToRemove: null,
  },
  reducers: {
    setAddProductToCart: (state, action) => {
      let modifiedCartProducts = [...state.cartProducts];
      modifiedCartProducts.push(action.payload);
      state.cartProducts = modifiedCartProducts;
    },
    setRemoveProductFromCart: (state, action) => {
      const filteredCartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload
      );
      state.cartProducts = filteredCartProducts;
    },
    setSelectedProductToRemove: (state, action) => {
      state.selectedProductToRemove = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setAddProductToCart,
  setRemoveProductFromCart,
  setSelectedProductToRemove,
} = cartSlice.actions;

export default cartSlice.reducer;
