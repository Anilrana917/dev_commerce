import React from "react";
import { Card } from "react-bootstrap";

const Product = ({ product }) => {
  return (
    <Card className='mb-4'>
      <Card.Img variant='top' src={product.image} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text>${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
