import React from "react";
import { render, screen } from "@testing-library/react";
import Product from "./Product";

const product = {
  id: 1,
  title: "Product 1",
  description: "Description 1",
  price: 100,
  image: "https://via.placeholder.com/150",
};

test("renders product details", () => {
  render(<Product product={product} />);
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.getByText("Description 1")).toBeInTheDocument();
  expect(screen.getByText("$100")).toBeInTheDocument();
});
