import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import Message from '../components/Message';
import CheckoutSteps from '../components/CheckoutSteps';
import { saveShippingAddress } from '../actions/cartActions';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { error, shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);
  const [name, setName] = useState(shippingAddress.name);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(null);
  const [message, setMessage] = useState(null);

  const validatePhoneNumber = () => {
    if (isValidPhoneNumber(phoneNumber)) {
      setIsValidNumber(true);
    } else {
      setIsValidNumber(false);
    }
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (phoneNumber === '') {
      setMessage('Please Fill Phone Number ');
    } else {
      dispatch(saveShippingAddress({ name, phoneNumber, address, city, postalCode, country }));
      history.push('/payment');
    }
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="inputBG"
            type="text"
            placeholder="Enter your name"
            value={name || ''}
            required
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phoneNumber" onBlur={validatePhoneNumber}>
          <Form.Label>Phone Number</Form.Label>
          <PhoneInput
            international
            defaultCountry="NL"
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
            error={
              phoneNumber
                ? isValidPhoneNumber(phoneNumber)
                  ? undefined
                  : 'Invalid phone number'
                : 'Phone number required'
            }
          />
          {isValidNumber === true ? (
            <Message variant="info">It is valid number</Message>
          ) : isValidNumber === false ? (
            <Message variant="danger">Phone Number is not valid</Message>
          ) : null}
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            className="inputBG"
            type="text"
            placeholder="Enter address"
            value={address || ''}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            className="inputBG"
            type="text"
            placeholder="Enter city"
            value={city || ''}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            className="inputBG"
            type="text"
            placeholder="Enter postal code"
            value={postalCode || ''}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            className="inputBG"
            type="text"
            placeholder="Enter country"
            value={country || ''}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
