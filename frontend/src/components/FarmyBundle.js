import React from 'react';
import { Card } from 'react-bootstrap';

const FarmyBundle = ({ name, image }) => {
  return (
    <Card className="rounded">
      <Card.Img src={image} variant="top" />
      <Card.Body>
        <Card.Title as="div">
          <strong>{name}</strong>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default FarmyBundle;
