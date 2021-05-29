import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMySubscriptions, cancelSubscription } from '../actions/subscriptionActions';
import ProfileEditTabs from '../components/ProfileEditTabs';

const SubscriptionListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const subscriptionCancel = useSelector((state) => state.subscriptionCancel);
  const { success: cancelSuccess } = subscriptionCancel;

  const subscriptionListMy = useSelector((state) => state.subscriptionListMy);
  const {
    loading: loadingSubscriptions,
    error: errorSubscriptions,
    subscriptions,
  } = subscriptionListMy;

  const cancelHandler = (id) => {
    if (window.confirm('Are you sure')) {
      console.log('delete');
      dispatch(cancelSubscription(id));
    }
  };

  useEffect(() => {
    if (!user || !user.name || cancelSuccess) {
      dispatch(listMySubscriptions());
    } else {
      history.push('/subscriptions');
    }
  }, [dispatch, userInfo, history, success, cancelSuccess, user]);

  return (
    <>
      <ProfileEditTabs profile subscriptions preferences />

      {loadingSubscriptions ? (
        <Loader />
      ) : errorSubscriptions ? (
        <Message variant="danger">{errorSubscriptions}</Message>
      ) : (
        <>
          <h2>
            you have {subscriptions.length} active{' '}
            {subscriptions.length === 1 ? 'subscription' : 'subscriptions'}{' '}
          </h2>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th></th>
                <th>BUNDLES</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>Bundle Details</th>
                <th>CANCEL</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((subscription) => (
                <tr key={subscription._id}>
                  <td>
                    <img
                      style={{ width: '80px' }}
                      src={subscription.subscriptionItems[0].image}
                      alt={subscription.subscriptionItems[0].name}
                    />
                  </td>
                  <td>{subscription.subscriptionItems[0].name}</td>
                  <td>{subscription.createdAt.substring(0, 10)}</td>
                  <td>{subscription.totalPrice}</td>
                  <td>
                    <LinkContainer to={`/register/bundleplan`}>
                      <Button>Change</Button>
                    </LinkContainer>
                  </td>

                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => cancelHandler(subscription._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default SubscriptionListScreen;
