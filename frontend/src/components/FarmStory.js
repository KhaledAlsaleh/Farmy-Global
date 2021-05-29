import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

const FarmStory = () => {
  const farmsData = useSelector((state) => state.farmList);

  const { farm } = farmsData;

  const getTwoRandomStories = farm.sort(() => Math.random() - Math.random()).slice(0, 2);

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {getTwoRandomStories.map((item) => (
        <Card
          key={item._id}
          className="rounded m-3"
          style={{ border: '2px solid rgb(108,188,122)' }}
        >
          <Card.Header as="div" style={{ backgroundColor: 'transparent' }}>
            {item.name}
          </Card.Header>
          <Card.Body as="div" style={{ color: 'rgb(108,188,122)' }}>
            {item.story}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FarmStory;
