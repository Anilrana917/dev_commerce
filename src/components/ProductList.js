import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import Product from "./Product";
import { Container, Row, Col } from "react-bootstrap";
import SearchAndPagination from "./SearchAndPagination";

const ProductList = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const productsPerPage = 10;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  return (
    <Container>
      {productStatus === "loading" && <div>Loading...</div>}
      {productStatus === "failed" && <div>{error}</div>}

      <Row>
        {currentProducts.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
      <SearchAndPagination
        onSearch={() => {}}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Container>
  );
};

export default ProductList;
