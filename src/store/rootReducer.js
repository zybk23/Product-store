import { combineReducers } from "@reduxjs/toolkit";
import filterSlice from "./filterStore";
import searchSlice from "./searchStore";
import cartSlice from "./cartStore";

const createReducer = combineReducers({
  filterSlice,
  searchSlice,
  cartSlice,
});

export default createReducer;
