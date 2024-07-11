import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchAndPagination from "./SearchAndPagination";

describe("SearchAndPagination", () => {
  test("renders search input and pagination", () => {
    render(
      <SearchAndPagination
        onSearch={() => {}}
        onPageChange={() => {}}
        currentPage={1}
        totalPages={5}
      />
    );

    expect(
      screen.getByPlaceholderText("Search products...")
    ).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("calls onSearch when typing in search input", () => {
    const onSearch = jest.fn();
    render(
      <SearchAndPagination
        onSearch={onSearch}
        onPageChange={() => {}}
        currentPage={1}
        totalPages={5}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Search products..."), {
      target: { value: "Test" },
    });

    expect(onSearch).toHaveBeenCalledWith("Test");
  });

  test("calls onPageChange when clicking pagination buttons", () => {
    const onPageChange = jest.fn();
    render(
      <SearchAndPagination
        onSearch={() => {}}
        onPageChange={onPageChange}
        currentPage={1}
        totalPages={5}
      />
    );

    fireEvent.click(screen.getByText("2"));

    expect(onPageChange).toHaveBeenCalledWith(2);
  });
});
