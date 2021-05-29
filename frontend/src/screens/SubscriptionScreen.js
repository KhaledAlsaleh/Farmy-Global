import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getSubscriptionDetails,
  paySubscription,
  deliverSubscription,
} from '../actions/subscriptionActions';
import {
  SUBSCRIPTION_PAY_RESET,
  SUBSCRIPTION_DELIVER_RESET,
} from '../constants/subscriptionConstants';
import ReactGA from 'react-ga';
const { REACT_APP_GUA_ID } = process.env;

const SubscriptionScreen = ({ match, history, location }) => {
  const subscriptionId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const subscriptionDetails = useSelector((state) => state.subscriptionDetails);
  const { subscription, loading, error } = subscriptionDetails;

  const subscriptionPay = useSelector((state) => state.subscriptionPay);
  const { loading: loadingPay, success: successPay } = subscriptionPay;

  const subscriptionDeliver = useSelector((state) => state.subscriptionDeliver);
  const { loading: loadingDeliver, success: successDeliver } = subscriptionDeliver;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    //   Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    subscription.itemsPrice = addDecimals(
      subscription.subscriptionItems.reduce(
        (acc, item) => acc + item.price * item.qty * item.orderFrq,
        0
      )
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }

    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!subscription || successPay || successDeliver || subscription._id !== subscriptionId) {
      dispatch({ type: SUBSCRIPTION_PAY_RESET });
      dispatch({ type: SUBSCRIPTION_DELIVER_RESET });
      dispatch(getSubscriptionDetails(subscriptionId));
    } else if (!subscription.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, subscriptionId, successPay, successDeliver, subscription, userInfo, history]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(paySubscription(subscriptionId, paymentResult));
    ReactGA.initialize(REACT_APP_GUA_ID);
    ReactGA.event({
      category: 'subscribe',
      action: 'subscription paid',
      label: 'Payment Successful',
    });
    const pagePath = location.search ? location.pathname + location.search : location.pathname;
    history.push(`${pagePath}?isPaid=true`);
  };

  const deliverHandler = () => {
    dispatch(deliverSubscription(subscription));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {subscription._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Name: </strong> {subscription.user.name}
              </p>
              <p>
                <strong>Email: </strong>{' '}
                <a href={`mailto:${subscription.user.email}`}>{subscription.user.email}</a>
              </p>
              <p>
                <strong>Address:</strong>
                {subscription.shippingAddress.address}, {subscription.shippingAddress.city}{' '}
                {subscription.shippingAddress.postalCode}, {subscription.shippingAddress.country}
              </p>
              {subscription.isDelivered ? (
                <Message variant="success">Delivered on {subscription.deliveredAt}</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {subscription.paymentMethod}
              </p>
              {subscription.isPaid ? (
                <Message variant="success">Paid on {subscription.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>subscription Items</h2>
              {subscription.subscriptionItems.length === 0 ? (
                <Message>Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {subscription.subscriptionItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/bundles/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={6}>
                          {item.qty} bundles x €{item.price} x {item.orderFrq} every {item.orderPer}
                          = €{item.qty * item.price * item.orderFrq}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>€{subscription.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>€{subscription.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>€{subscription.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>€{subscription.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!subscription.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <Loader />}
                  {!sdkReady ? (
                    <Loader />
                  ) : (
                    <PayPalButton
                      amount={subscription.totalPrice}
                      onSuccess={successPaymentHandler}
                    />
                  )}
                </ListGroup.Item>
              )}
              {loadingDeliver && <Loader />}
              {userInfo && userInfo.isAdmin && subscription.isPaid && !subscription.isDelivered && (
                <ListGroup.Item>
                  <Button type="button" className="btn btn-block" onClick={deliverHandler}>
                    Mark As Delivered
                  </Button>
                </ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SubscriptionScreen;
