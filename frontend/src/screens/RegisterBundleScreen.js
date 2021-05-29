import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Form, ButtonGroup, Image, Button, ListGroup } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listBundlesNewUser } from '../actions/bundleActions';
import { SUBSCRIPTION_CREATE_RESET } from '../constants/subscriptionConstants';
import ReactGA from 'react-ga';
const { REACT_APP_GUA_ID } = process.env;

const RegisterBundleScreen = ({ history }) => {
  const [orderPer, setOrderPer] = useState('Weekly');
  const [orderFrequency, setOrderFrequency] = useState(1);
  const [selectedBundleId, setSelectedBundleId] = useState('');
  const [houseHold, setHouseHold] = useState(1);

  const arrayOfNumbers = [1, 2, 3, 4, 5];
  const arrayOfFrequencyWeekly = [1, 2, 3];
  const arrayOfFrequencyTwoWeeks = [1, 2, 3, 4];
  const arrayOfTime = ['Weekly', 'Every-2-Weeks', 'Monthly'];

  const dispatch = useDispatch();

  const bundleSignupNewUser = useSelector((state) => state.bundleSignupNewUser);
  const { loading, error, bundles } = bundleSignupNewUser;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const selectedBundle = bundles.find((o) => o._id === selectedBundleId);

  useEffect(() => {
    if (userInfo) {
      dispatch(listBundlesNewUser());
      dispatch({ type: SUBSCRIPTION_CREATE_RESET });
    } else {
      history.push(`login`);
    }
  }, [dispatch, userInfo, history]);

  const addToCartHandler = () => {
    history.push(
      `/cart/${selectedBundleId}?qty=${houseHold}&frq=${orderFrequency}&orderper=${orderPer}`
    );
    ReactGA.initialize(REACT_APP_GUA_ID);
    ReactGA.event({
      category: 'subscribe',
      action: 'click add to cart',
      label: 'Add to Cart from Register Bundle Page',
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row className="border-bottom py-3 my-2">
            <Col className="border-right " md={6}>
              <h2>Select your First Bundle</h2>

              <ButtonGroup vertical className="pr-5">
                {bundles.map((bundle) => (
                  <Link
                    value={bundle.id}
                    key={bundle._id}
                    to={`/register/bundleplan/${bundle._id}`}
                  >
                    <Button
                      onClick={(e) => setSelectedBundleId(e.currentTarget.value)}
                      value={bundle._id}
                      variant="dark"
                      className="rounded my-2"
                    >
                      <Row>
                        <Col md={3}>
                          <Image src={bundle.image} alt={bundle.name} fluid rounded />
                        </Col>
                        <Col md={7}>{bundle.name}</Col>
                        <Col md={2}>€{bundle.price}</Col>
                      </Row>
                    </Button>
                  </Link>
                ))}
              </ButtonGroup>
            </Col>
            <Col md={6}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row className="pl-5 pb-5">
                    <h3>Select quantity of bundles </h3>
                    <Form.Control
                      as="select"
                      className="signup-bundle-options rounded pl-4"
                      value={houseHold}
                      onChange={(e) => setHouseHold(e.target.value)}
                    >
                      {arrayOfNumbers.map((x, index) => (
                        <option key={index} className="signup-bundle-options" value={x}>
                          {x}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="pl-5 pb-5">
                    <h3>How often would like to receive the bundle?</h3>
                    <Form.Control
                      as="select"
                      className="signup-bundle-options rounded pl-4"
                      value={orderPer}
                      onChange={(e) => setOrderPer(e.target.value)}
                    >
                      {arrayOfTime.map((x, index) => (
                        <option key={index} className="signup-bundle-options" value={x}>
                          {x}
                        </option>
                      ))}
                    </Form.Control>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row className="pl-5 pb-5">
                    <h3>How many times {orderPer}?</h3>
                    <Form.Control
                      as="select"
                      value={orderFrequency}
                      onChange={(e) => setOrderFrequency(e.target.value)}
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
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="d-flex align-items-center justify-content-center py-3 my-2 ">
            {selectedBundleId !== '' && (
              <Message variant="info">
                You will receive <em className="font-weight-bold">{selectedBundle.name}</em> bundle{' '}
                <em className="font-weight-bold">{orderFrequency}</em> times{' '}
                <em className="font-weight-bold">{orderPer}</em> and for{' '}
                <em className="font-weight-bold">{houseHold}</em> people
              </Message>
            )}
          </Row>
          <Row className="border-bottom py-3 my-2">
            <Col className="d-flex align-items-center justify-content-center">
              <Link
                to={`/cart/${selectedBundleId}?qty=${houseHold}&frq=${orderFrequency}&orderper=${orderPer}`}
              >
                <Button
                  onClick={addToCartHandler}
                  variant="dark"
                  className="rounded  signup-bundle-button"
                  disabled={!selectedBundleId}
                >
                  To CArt
                </Button>
              </Link>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default RegisterBundleScreen;
