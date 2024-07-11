import React from "react";
import { Container, Row, Pagination } from "react-bootstrap";

const SearchAndPagination = ({
  onSearch,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  return (
    <Container>
      <Row>
        <Pagination className='justify-content-center'>
          <Pagination.Prev
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages).keys()].map((number) => (
            <Pagination.Item
              key={number + 1}
              active={number + 1 === currentPage}
              onClick={() => onPageChange(number + 1)}
            >
              {number + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </Row>
    </Container>
  );
};

export default SearchAndPagination;
