/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listFarmDetails } from '../actions/farmActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { Card } from 'react-bootstrap';

const FarmDetails = ({ farmId }) => {
  const dispatch = useDispatch();

  const farmDetails = useSelector((state) => state.farmDetails);

  const { loading, error, farm } = farmDetails;

  useEffect(() => {
    dispatch(listFarmDetails(farmId));
  }, [dispatch]);
  return (
    <>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {farm && (
        <Card className="rounded m-4" style={{ minHeight: '5rem', fontSize: 'large' }}>
          <Card.Header as="div" style={{ backgroundColor: 'transparent' }}>
            <h5>{farm.name}</h5>
          </Card.Header>
          <div className="farm-details">
            <div style={{ padding: '0.5rem' }}>"{farm.story}"</div>
            <img alt="farm" src={farm.image} />
          </div>
        </Card>
      )}
    </>
  );
};

export default FarmDetails;
