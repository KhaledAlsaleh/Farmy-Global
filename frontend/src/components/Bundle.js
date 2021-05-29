import React from 'react';
import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Rating from './Rating';

const Bundle = ({ bundle }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <LinkContainer to={`/bundles/${bundle._id}`} style={{ cursor: 'pointer' }}>
        <Card.Img src={bundle.image} variant="top" height="200px" width="200px" />
      </LinkContainer>

      <Card.Body>
        <LinkContainer to={`/bundles/${bundle._id}`}>
          <Card.Title as="div">
            <strong>{bundle.name}</strong>
          </Card.Title>
        </LinkContainer>

        <Card.Text as="div">
          <Rating value={bundle.rating} text={`${bundle.numReviews} reviews`} />
        </Card.Text>

        <Card.Text as="h3">€{bundle.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Bundle;
