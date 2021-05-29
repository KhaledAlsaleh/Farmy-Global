import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMySubscriptions, updateSubscription } from '../actions/subscriptionActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import ProfileEditTabs from '../components/ProfileEditTabs';
import FormContainer from '../components/FormContainer';
import axios from 'axios';

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [subId, setSubId] = useState();

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const subscriptionListMy = useSelector((state) => state.subscriptionListMy);
  const {
    loading: loadingSubscriptions,
    error: errorSubscriptions,
    subscriptions,
  } = subscriptionListMy;

  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();

  const timeInHours = new Date().getHours();

  // console.log(success);

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!user || !user.name || !subscriptions) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });

        dispatch(getUserDetails('profile'));
        dispatch(listMySubscriptions());
      } else {
        const chosenSubscription = async () => {
          const config = {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          };
          const {
            data: { shippingAddress },
          } = await axios.get(`/api/subscriptions/${subId}`, config);
          setAddress(shippingAddress.address);
          setCity(shippingAddress.city);
          setPostalCode(shippingAddress.postalCode);
          setCountry(shippingAddress.country);
        };
        chosenSubscription();
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, subscriptions, subId, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }));
      dispatch(
        updateSubscription({
          subId,
          address,
          city,
          postalCode,
          country,
        })
      );
    }
  };

  return (
    <FormContainer>
      <ProfileEditTabs profile subscriptions preferences />

      <h2>
        {timeInHours > 0 && timeInHours < 12
          ? 'Good Morning'
          : timeInHours >= 12 && timeInHours <= 15
          ? 'Good Afternoon'
          : timeInHours >= 16 && timeInHours <= 24
          ? 'Good Evening'
          : 'Hello'}
        , {user.name}!
      </h2>
      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              className="inputBG"
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              className="inputBG"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              className="inputBG"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              className="inputBG"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {loadingSubscriptions ? (
            <Loader />
          ) : errorSubscriptions ? (
            <Message variant="danger">{errorSubscriptions}</Message>
          ) : (
            <>
              <Form.Group>
                <h6>Change subscription address </h6>
                <Form.Control
                  className="inputBG"
                  as="select"
                  // defaultValue={'defaultSub'}
                  onChange={(e) => setSubId(e.target.value)}
                >
                  <option>choose a subscription</option>
                  {subscriptions.map((x) => (
                    <option key={x._id} value={x._id}>
                      {x.subscriptionItems[0].name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  className="inputBG"
                  type="text"
                  placeholder="Enter address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="">
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="inputBG"
                  type="text"
                  placeholder="Enter city"
                  value={city || ''}
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
                  onChange={(e) => setPostalCode(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  className="inputBG"
                  type="text"
                  placeholder="Enter country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </>
          )}
          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default ProfileScreen;
