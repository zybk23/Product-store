import React from "react";
import App from "../../App";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import { configureStore } from "@reduxjs/toolkit";
import createReducer from "../../store/rootReducer";

const store = configureStore({
  reducer: createReducer,
});

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

test("Search products after enter more than two characters", () => {
  const { getByTestId, getAllByTestId } = render(<AppWrapper />);
  const searchInput = getByTestId("searchInput");

  fireEvent.change(searchInput, {
    target: {
      value: "hu",
    },
  });
  const productNamesFirstFilter = getAllByTestId("product-name");
  expect(productNamesFirstFilter).toHaveLength(12);
  fireEvent.change(searchInput, {
    target: {
      value: "hua",
    },
  });
  expect(searchInput.value).toBe("hua");
  const productNamesSecondFilter = getAllByTestId("product-name");
  productNamesSecondFilter.forEach((x) => {
    expect(x.textContent.toLowerCase().includes("hua")).toBeTruthy();
  });
  expect(productNamesSecondFilter).toHaveLength(9);
  fireEvent.change(searchInput, {
    target: {
      value: "",
    },
  });
});

test("Searched text should be text that searched by user", () => {
  const { getByTestId } = render(<AppWrapper />);
  const searchedTextEL = getByTestId("searchedText");
  const searchInput = getByTestId("searchInput");
  expect(searchInput.value).toBe("");
  fireEvent.change(searchInput, {
    target: {
      value: "hua",
    },
  });
  expect(searchInput.value).toBe("hua");
  expect(searchedTextEL.textContent).toBe("hua");
  fireEvent.change(searchInput, {
    target: {
      value: "",
    },
  });
  expect(searchedTextEL.textContent).toBe("");
});

test("Product count in cart should be increased when click add button", () => {
  const { getByTestId, getAllByTestId } = render(<AppWrapper />);
  const cartCountEl = getByTestId("cartProductCount");
  const cardContainer = getAllByTestId("cardContainer")[0];
  fireEvent.mouseOver(cardContainer);
  const addBtnEl = getAllByTestId("addProductToCartBtn")[0];
  expect(cartCountEl.textContent).toBe("0");
  fireEvent.click(addBtnEl);
  expect(cartCountEl.textContent).toBe("1");
});

test("Filter products by color", () => {
  const { getByTestId, getAllByTestId } = render(<AppWrapper />);
  const colorName = getAllByTestId("colorName")[0];
  const colorCount = getAllByTestId("colorCount")[0];
  const getNumber = (value) => {
    const solve = value.split("(");
    const getNumber = solve[1].split(")");
    return getNumber[0];
  };
  const number = getNumber(colorCount.textContent);
  fireEvent.click(colorName);
  const productCardColorName = getAllByTestId("productColorName")[0];
  const colorNames = screen.getAllByTestId("filteredTotalCount");
  expect(colorName.textContent).toBe(productCardColorName.textContent);
  expect(colorNames).toHaveLength(Number(number));
});

test("Two filters should show the same text when clicking one of it", () => {
  const { getAllByTestId } = render(<AppWrapper />);
  const alignmentText = getAllByTestId("alignmentText")[0];
  expect(alignmentText.textContent).toBe("En Düşük Fiyat");
  fireEvent.click(alignmentText);

  const selectOption = screen.getByRole("option", { name: "En Düşük Fiyat" });

  expect(selectOption.selected).toBe(true);
});
