import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import ProductList from "./ProductList";
import { fetchProducts } from "../redux/slices/productsSlice";

const mockStore = configureStore([]);

describe("ProductList Component", () => {
  let store;
  let history;

  beforeEach(() => {
    store = mockStore({
      products: {
        products: [],
        status: "idle",
        error: null,
      },
    });

    history = createMemoryHistory();
  });

  test("renders loading state initially", () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductList searchTerm='' />
        </Router>
      </Provider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("renders products when fetched successfully", async () => {
    const products = [
      {
        id: 1,
        title: "Product 1",
        description: "Description 1",
        price: 100,
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        title: "Product 2",
        description: "Description 2",
        price: 200,
        image: "https://via.placeholder.com/150",
      },
    ];

    store = mockStore({
      products: {
        products: products,
        status: "succeeded",
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <ProductList searchTerm='' />
        </Router>
      </Provider>
    );

    await waitFor(() => {
      products.forEach((product) => {
        expect(screen.getByText(product.title)).toBeInTheDocument();
        expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
        expect(screen.getByAltText(product.title)).toBeInTheDocument();
      });
    });
  });
});
