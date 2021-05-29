import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Card, Form, Container, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import Rating from '../components/Rating';
import ReactGA from 'react-ga';
import { listBundleDetails, createBundleReview } from '../actions/bundleActions';
import { listMySubscriptions } from '../actions/subscriptionActions';
import { BUNDLE_CREATE_REVIEW_RESET } from '../constants/bundleConstants';
import FarmDetails from '../components/FarmDetails';
const { REACT_APP_GUA_ID } = process.env;

const BundleDetailsScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const [orderFrq, setOrderFrq] = useState(1);
  const [orderPer, setOrderPer] = useState('Weekly');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const arrayOfTime = ['Weekly', 'Every-2-Weeks', 'Monthly'];
  const arrayOfFrequencyWeekly = [1, 2, 3];
  const arrayOfFrequencyTwoWeeks = [1, 2, 3, 4];

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const bundleDetails = useSelector((state) => state.bundleDetails);
  const { loading, error, bundle } = bundleDetails;

  const randomIndex = Math.floor(Math.random() * 2);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const subscriptionListMy = useSelector((state) => state.subscriptionListMy);
  const { loading: loadingSubscriptions, subscriptions } = subscriptionListMy;

  const bundleReviewCreate = useSelector((state) => state.bundleReviewCreate);
  const {
    success: successBundleReview,
    loading: loadingBundleReview,
    error: errorBundleReview,
  } = bundleReviewCreate;

  useEffect(() => {
    if (successBundleReview) {
      setRating(0);
      setComment('');
    }
    if (!bundle._id || bundle._id !== match.params.id) {
      dispatch(listMySubscriptions());
      dispatch(listBundleDetails(match.params.id));
      dispatch({ type: BUNDLE_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, subscriptions, bundle._id, successBundleReview]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}&frq=${orderFrq}&orderper=${orderPer}`);
    ReactGA.initialize(REACT_APP_GUA_ID);
    ReactGA.event({
      category: 'subscribe',
      action: 'click add to cart',
      label: 'Add to Cart from Bundle Details Page',
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createBundleReview(match.params.id, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Meta title={bundle.name} />
          <Row>
            <Col md={6}>
              <Image src={bundle.image} alt={bundle.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{bundle.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>Price: €{bundle.price}</ListGroup.Item>
                <ListGroup.Item>Description: {bundle.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${bundle.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{bundle.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</Col>
                    </Row>
                  </ListGroup.Item>

                  {bundle.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col md={10} className="m-1">
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(bundle.countInStock).keys()].map((x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  {bundle.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>How often</Col>
                        <Col md={10} className="m-1">
                          <Form.Control
                            as="select"
                            value={orderPer}
                            onChange={(e) => setOrderPer(e.target.value)}
                          >
                            {arrayOfTime.map((x, index) => (
                              <option key={index} className="signup-bundle-options" value={x}>
                                {x}
                              </option>
                            ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  {bundle.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>
                          Times per{' '}
                          {orderPer === 'Weekly'
                            ? 'Week'
                            : orderPer === 'Monthly'
                            ? 'Month'
                            : '2 Weeks'}
                        </Col>
                        <Col md={10} className="m-1">
                          <Form.Control
                            as="select"
                            value={orderFrq}
                            onChange={(e) => setOrderFrq(e.target.value)}
                          >
                            {(orderPer === 'Weekly' || orderPer === 'Monthly') &&
                              arrayOfFrequencyWeekly.map((x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              ))}
                            {orderPer === 'Every-2-Weeks' &&
                              arrayOfFrequencyTwoWeeks.map((x) => (
                                <option key={x} value={x}>
                                  {x}
                                </option>
                              ))}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      onClick={addToCartHandler}
                      className="btn-block"
                      type="button"
                      disabled={bundle.countInStock === 0 || cartItems.length > 0}
                    >
                      Add To Cart
                    </Button>
                    {cartItems.length > 0 && (
                      <Message variant="info">
                        You already have one bundle in your cart. <Link to="/cart">Checkout</Link>
                      </Message>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Container>
            <h3>What you will find inside this bundle:</h3>
            <Row>
              {bundle.ingredients?.map(({ origin, price, name, image, _id }) => (
                <Col xs={12} s={4} md={4} lg={3} key={_id}>
                  <Card className="my-3">
                    <Card.Img variant="top" src={image} alt={name} height="150px" />
                    <Card.Body>
                      <Card.Title>{name}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroup.Item>Price: €{price}</ListGroup.Item>
                      <ListGroup.Item>Origin: {origin}</ListGroup.Item>
                    </ListGroup>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
          <Container>
            <h3>Meet The Farmer</h3>
            {bundle.ingredients && (
              <FarmDetails farmId={bundle.ingredients[0]?.farms[randomIndex]} />
            )}
          </Container>
          <Row>
            <Col md={6}>
              <h4>Here's what our customers say about us..</h4>
              {bundle.reviews.length === 0 ? (
                <Message>No Reviews</Message>
              ) : (
                <ListGroup variant="flush">
                  {bundle.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
              <ListGroup>
                <ListGroup.Item>
                  {successBundleReview && (
                    <Message variant="success">Review submitted successfully</Message>
                  )}
                  {loadingBundleReview && <Loader />}
                  {errorBundleReview && <Message variant="danger">{errorBundleReview}</Message>}
                  {loadingSubscriptions ? (
                    <Loader />
                  ) : (
                    <>
                      {userInfo && subscriptions && subscriptions.length > 0 ? (
                        <Form onSubmit={submitHandler}>
                          <h6>
                            Enjoying Farmy? Leave us a review. Can we do something better? Let us
                            know!
                          </h6>
                          <Form.Group controlId="rating">
                            <Form.Label>Rating</Form.Label>
                            <Form.Control
                              as="select"
                              value={rating}
                              onChange={(e) => setRating(e.target.value)}
                            >
                              <option value="">Select...</option>
                              <option value="1">1 - Poor</option>
                              <option value="2">2 - Fair</option>
                              <option value="3">3 - Good</option>
                              <option value="4">4 - Very Good</option>
                              <option value="5">5 - Excellent</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group controlId="comment">
                            <Form.Label>Comment</Form.Label>
                            <Form.Control
                              as="textarea"
                              row="3"
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Button disabled={loadingBundleReview} type="submit" variant="primary">
                            Submit
                          </Button>
                        </Form>
                      ) : userInfo && subscriptions.length === 0 ? (
                        <h6>
                          subscribe to one of our <Link to={`/`}>bundles</Link>
                          to leave a review
                        </h6>
                      ) : null}
                    </>
                  )}

                  {!userInfo && (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default BundleDetailsScreen;
