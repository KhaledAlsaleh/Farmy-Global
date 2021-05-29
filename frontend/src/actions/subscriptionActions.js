import axios from 'axios';
import { CART_CLEAR_ITEMS } from '../constants/cartConstants';
import {
  SUBSCRIPTION_CREATE_REQUEST,
  SUBSCRIPTION_CREATE_SUCCESS,
  SUBSCRIPTION_CREATE_FAIL,
  SUBSCRIPTION_DETAILS_FAIL,
  SUBSCRIPTION_DETAILS_SUCCESS,
  SUBSCRIPTION_DETAILS_REQUEST,
  SUBSCRIPTION_PAY_FAIL,
  SUBSCRIPTION_PAY_SUCCESS,
  SUBSCRIPTION_PAY_REQUEST,
  SUBSCRIPTION_LIST_MY_REQUEST,
  SUBSCRIPTION_LIST_MY_SUCCESS,
  SUBSCRIPTION_LIST_MY_FAIL,
  SUBSCRIPTION_LIST_FAIL,
  SUBSCRIPTION_LIST_SUCCESS,
  SUBSCRIPTION_LIST_REQUEST,
  SUBSCRIPTION_DELIVER_FAIL,
  SUBSCRIPTION_DELIVER_SUCCESS,
  SUBSCRIPTION_DELIVER_REQUEST,
  SUBSCRIPTION_UPDATE_REQUEST,
  SUBSCRIPTION_UPDATE_SUCCESS,
  SUBSCRIPTION_UPDATE_FAIL,
  SUBSCRIPTION_CANCEL_SUCCESS,
  SUBSCRIPTION_CANCEL_FAIL,
  SUBSCRIPTION_CANCEL_REQUEST,
} from '../constants/subscriptionConstants';
import { logout } from './userActions';

export const createSubscription = (subscription) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/subscriptions`, subscription, config);

    dispatch({
      type: SUBSCRIPTION_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: CART_CLEAR_ITEMS,
      payload: data,
    });
    localStorage.removeItem('cartItems');
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUBSCRIPTION_CREATE_FAIL,
      payload: message,
    });
  }
};

export const getSubscriptionDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/subscriptions/${id}`, config);

    dispatch({
      type: SUBSCRIPTION_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUBSCRIPTION_DETAILS_FAIL,
      payload: message,
    });
  }
};

export const paySubscription = (subscriptionId, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/subscriptions/${subscriptionId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: SUBSCRIPTION_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUBSCRIPTION_PAY_FAIL,
      payload: message,
    });
  }
};

export const deliverSubscription = (subscription) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_DELIVER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/subscriptions/${subscription._id}/deliver`, {}, config);

    dispatch({
      type: SUBSCRIPTION_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUBSCRIPTION_DELIVER_FAIL,
      payload: message,
    });
  }
};

export const listMySubscriptions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/subscriptions/mysubscription`, config);

    dispatch({
      type: SUBSCRIPTION_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUBSCRIPTION_LIST_MY_FAIL,
      payload: message,
    });
  }
};

export const listSubscription = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/subscriptions`, config);

    dispatch({
      type: SUBSCRIPTION_LIST_SUCCESS,
      payload: data,
    });
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUBSCRIPTION_LIST_FAIL,
      payload: message,
    });
  }
};

export const updateSubscription = (subscription) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { subId } = subscription;
    const { data } = await axios.put(`/api/subscriptions/${subId}`, subscription, config);

    dispatch({
      type: SUBSCRIPTION_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: SUBSCRIPTION_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;

    dispatch({
      type: SUBSCRIPTION_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const cancelSubscription = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIPTION_CANCEL_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/subscriptions/${id}`, config);

    dispatch({ type: SUBSCRIPTION_CANCEL_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message ? error.response.data.message : error.message;
    if (message === 'Not authorized, token failed') {
      dispatch(logout());
    }
    dispatch({
      type: SUBSCRIPTION_CANCEL_FAIL,
      payload: message,
    });
  }
};
