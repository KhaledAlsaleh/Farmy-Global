import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {
  const bundleId = match.params.id;
  const [qty, setQty] = useState(
    location.search ? Number(location.search.slice(1).split('&')[0].split('=')[1]) : 1
  );

  const [orderFrq, setOrderFrq] = useState(
    location.search ? Number(location.search.slice(1).split('&')[1].split('=')[1]) : 1
  );

  const [orderPer, setOrderPer] = useState(
    location.search ? location.search.slice(1).split('&')[2].split('=')[1] : 'Weekly'
  );

  const arrayOfTime = ['Weekly', 'Every-2-Weeks', 'Monthly'];
  const arrayOfFrequencyWeekly = [1, 2, 3];
  const arrayOfFrequencyTwoWeeks = [1, 2, 3, 4];

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (bundleId) {
      history.push(`/cart/${bundleId}?qty=${qty}&frq=${orderFrq}&orderper=${orderPer}`);
      dispatch(addToCart(bundleId, qty, orderFrq, orderPer));
    }
    history.push(`/cart/${bundleId}?qty=${qty}&frq=${orderFrq}&orderper=${orderPer}`);
  }, [dispatch, bundleId, qty, history, orderFrq, orderPer]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <Row>
      <Col md={12} className="my-3">
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={2}>
                    <Link to={`/bundles/${item.product}`} style={{ fontSize: 'large' }}>
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={1}>€{item.price}</Col>
                  <Col md={1.5}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) => setQty(e.target.value)}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                    <small>Quantity</small>
                  </Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.orderPer}
                      onChange={(e) => setOrderPer(e.target.value)}
                    >
                      {arrayOfTime.map((x, index) => (
                        <option key={index} className="signup-bundle-options" value={x}>
                          {x}
                        </option>
                      ))}
                    </Form.Control>
                    <small>How Often</small>
                  </Col>
                  <Col md={1.5}>
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
                    <small>Per {orderPer}</small>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={6} className="m-auto text-center">
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + Number(item.qty) + Number(item.orderFrq), 0)}
                ) items
              </h2>
              €
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price * item.orderFrq, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
