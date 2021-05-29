import React from 'react';
import { Card } from 'react-bootstrap';
import Rating from './Rating';
const FeedBack = ({ text, name }) => {
  return (
    <>
      <Card className="rounded p-3" style={{ minHeight: '15rem' }}>
        <Rating value={5} style={{ color: '#f8e825' }} />
        <Card.Body as="div">{text}</Card.Body>
        <Card.Subtitle as="div" style={{ textAlign: 'center' }}>
          {name}
        </Card.Subtitle>
      </Card>
    </>
  );
};

export default FeedBack;
