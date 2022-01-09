import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchValue: "",
  },
  reducers: {
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
  },
  extraReducers: {},
});

export const { setSearchValue } = searchSlice.actions;

export default searchSlice.reducer;
