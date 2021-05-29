import React, { useState, useEffect } from 'react';
import { Form, Button, InputGroup, FormControl, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { listBundles } from '../actions/bundleActions';

const Filter = ({ keyword }) => {
  const dispatch = useDispatch();

  const initialValue = '';

  const [minPrice, setMinPrice] = useState(initialValue);
  const [maxPrice, setMaxPrice] = useState(initialValue);
  const [rating, setRating] = useState(initialValue);
  const [category, setCategory] = useState(initialValue);
  const [sortBy, setSortBy] = useState(initialValue);
  const [formSubmit, setFormSubmit] = useState(false);

  useEffect(() => {
    dispatch(listBundles(keyword, minPrice, maxPrice, rating, category, sortBy));
    // eslint-disable-next-line
  }, [dispatch, keyword, formSubmit]);

  const categoriesArray = ['All', 'Vegan', 'Vegetarian', 'Low-carb', 'Mediterranean'];
  const ratingsArray = ['Any', 1, 2, 3, 4, 5];

  const submitHandler = (e) => {
    e.preventDefault();
    setFormSubmit((currentState) => !currentState);
  };

  const clearFilterHandler = () => {
    setMinPrice(initialValue);
    setMaxPrice(initialValue);
    setRating(initialValue);
    setCategory(initialValue);
    setSortBy(initialValue);
  };

  return (
    <>
      <Form onSubmit={submitHandler} className="justify-content-md-center">
        {/*select menus */}
        <Row>
          <Col sm={12} md={6} lg={6} xl={3}>
            <Form.Group controlId="category">
              <Form.Control
                className="inputBG"
                as="select"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                {categoriesArray.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col sm={12} md={6} lg={6} xl={3}>
            <Form.Group controlId="rating">
              <Form.Control
                className="inputBG"
                as="select"
                onChange={(e) => setRating(e.target.value)}
                value={rating}
              >
                {ratingsArray.map((ratingOption) => (
                  <option key={ratingOption} value={ratingOption}>
                    Rating: {ratingOption}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          {/* price inputs */}
          <Col sm={12} md={6} lg={6} xl={3}>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text id="min-price" className="inputBG">
                  Min price
                </InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                placeholder="Min price"
                type="number"
                min="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col sm={12} md={6} lg={6} xl={3}>
            <InputGroup>
              <InputGroup.Append>
                <InputGroup.Text id="max-price" className="inputBG">
                  Max price
                </InputGroup.Text>
              </InputGroup.Append>
              <FormControl
                placeholder="Max price"
                type="number"
                min="0"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        {/* checkboxes for sorting */}
        <Row className="mx-auto my-2">
          <Col xs={6} sm={6} md={6} lg={6} xl={3}>
            <Form.Group controlId="high-price-order">
              <Form.Check
                onChange={() => setSortBy('highestPrice')}
                // boxes will be checked only when statement is true, needed for filter clearing
                checked={sortBy === 'highestPrice'}
                type="radio"
                name="sort"
                label="Highest Price"
              />
            </Form.Group>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={3}>
            <Form.Group controlId="low-price-order">
              <Form.Check
                onChange={() => setSortBy('lowestPrice')}
                checked={sortBy === 'lowestPrice'}
                type="radio"
                name="sort"
                label="Lowest Price"
              />
            </Form.Group>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={3}>
            <Form.Group controlId="order-by-rating">
              <Form.Check
                onChange={() => setSortBy('rating')}
                checked={sortBy === 'rating'}
                type="radio"
                name="sort"
                label="Highest Rating"
              />
            </Form.Group>
          </Col>
          <Col xs={6} sm={6} md={6} lg={6} xl={3}>
            <Form.Group controlId="order-by-newest">
              <Form.Check
                onChange={() => setSortBy('newest')}
                checked={sortBy === 'newest'}
                type="radio"
                name="sort"
                label="Newest"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          {/* for pushing buttons to the right side */}
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
          <Col>
            <Button type="submit" className="p-2 btn btn-outline-success">
              Filter Bundles
            </Button>
          </Col>
          <Col>
            <Button
              onClick={clearFilterHandler}
              type="submit"
              className="p-2 btn btn-outline-success"
            >
              Clear Filter
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Filter;
