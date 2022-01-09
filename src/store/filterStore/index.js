import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filter",
  initialState: {
    colors: [],
    brands: [],
    sortBy: [
      {
        id: 1,
        name: "En Düşük Fiyat",
        type: "lowToHigh",
      },
      {
        id: 2,
        name: "En Yüksek Fiyat",
        type: "highToLow",
      },
      {
        id: 3,
        name: "En Yeniler(A>Z)",
        type: "newToOld",
      },
      {
        id: 4,
        name: "En Yeniler(Z>A)",
        type: "oldToNew",
      },
    ],
    selectedColor: {},
    selectedBrand: {},
    selectedSortBy: {},
  },
  reducers: {
    setColorsAndBrands: (state, action) => {
      const data = JSON.parse(localStorage.getItem("products"));
      const colors = [];
      const brands = [];
      data &&
        data.map((item) => {
          colors.push(item.color);
          brands.push(item.brand);
        });
      const uniqueColors = [...new Set(colors.sort())];
      const uniqueBrands = [...new Set(brands.sort())];

      function CountSameElementInArray(arr) {
        const countElement = [];
        arr.sort();

        var current = null;
        var cnt = 0;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== current) {
            if (cnt > 0) {
              countElement.push(cnt);
            }
            current = arr[i];
            cnt = 1;
          } else {
            cnt++;
          }
        }
        if (cnt > 0) {
          countElement.push(cnt);
        }
        return countElement;
      }

      const countColors = CountSameElementInArray(colors);
      const countBrands = CountSameElementInArray(brands);

      const modifiedColors = [];
      const modifiedBrands = [];

      for (let i = 0; i < uniqueColors.length; i++) {
        modifiedColors.push({
          id: i + 1,
          name: uniqueColors[i],
          count: countColors[i],
        });
      }
      for (let i = 0; i < uniqueBrands.length; i++) {
        modifiedBrands.push({
          id: i + 1,
          name: uniqueBrands[i],
          count: countBrands[i],
        });
      }

      state.colors = modifiedColors;
      state.brands = modifiedBrands;
    },
    setSelectedColor: (state, action) => {
      const previousSelectedColor = JSON.parse(
        JSON.stringify(state.selectedColor)
      );
      if (previousSelectedColor.id === action.payload.id) {
        state.selectedColor = {};
      } else {
        state.selectedColor = action.payload;
      }
    },
    setSelectedBrand: (state, action) => {
      const previousSelectedBrand = JSON.parse(
        JSON.stringify(state.selectedBrand)
      );
      if (previousSelectedBrand.id === action.payload.id) {
        state.selectedBrand = {};
      } else {
        state.selectedBrand = action.payload;
      }
    },
    setSelectedSortBy: (state, action) => {
      const previousSelectedSortedBy = JSON.parse(
        JSON.stringify(state.selectedSortBy)
      );
      if (previousSelectedSortedBy.id === action.payload.id) {
        state.selectedSortBy = {};
      } else {
        state.selectedSortBy = action.payload;
      }
    },
  },
  extraReducers: {},
});

export const {
  setColorsAndBrands,
  setSelectedColor,
  setSelectedBrand,
  setSelectedSortBy,
} = filterSlice.actions;

export default filterSlice.reducer;
