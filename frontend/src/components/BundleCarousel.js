import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { listTopBundles } from '../actions/bundleActions';

const BundleCarousel = () => {
  const dispatch = useDispatch();

  const bundleTopRated = useSelector((state) => state.bundleTopRated);
  const { loading, error, bundles } = bundleTopRated;

  useEffect(() => {
    dispatch(listTopBundles());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <Carousel pause="hover" className="bg-dark">
      {bundles.map((bundle) => (
        <Carousel.Item key={bundle._id}>
          <Link to={`/bundle/${bundle._id}`}>
            <Image src={bundle.image} alt={bundle.name} fluid />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {bundle.name} (${bundle.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default BundleCarousel;
